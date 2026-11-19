"""Preserve the supplied recording and remove only the authorized spoken note.

Usage: python scripts/prepare_v4.py MEDIA_EPISODE
No voice generation, speech resampling, or playback-speed changes.
"""
import array,hashlib,json,math,sys,unicodedata,wave
from pathlib import Path
sys.stdout.reconfigure(encoding='utf-8')
media=Path(sys.argv[1]);assets=media/'assets-v4';src=Path('src')
def read(p):return json.loads(p.read_text(encoding='utf-8'))
def save(p,x):p.write_text(json.dumps(x,ensure_ascii=False,indent=2),encoding='utf-8')
original=assets/'voiceover-original.wav';edited=assets/'voiceover-edited.wav'
with wave.open(str(original),'rb') as w:
 params=w.getparams();raw=w.readframes(w.getnframes());rate=w.getframerate()
assert params.nchannels==1 and params.sampwidth==2 and rate==48000
cut_a,cut_b=98.72,104.00
i,j=round(cut_a*rate)*2,round(cut_b*rate)*2
output=raw[:i]+raw[j:]
if edited.exists():
 with wave.open(str(edited),'rb') as w:assert w.readframes(w.getnframes())==output
else:
 with wave.open(str(edited),'wb') as w:w.setparams(params);w.writeframes(output)
assert output[:i]==raw[:i] and output[i:]==raw[j:]
duration=len(output)/2/rate;offset=cut_b-cut_a
save(media/'voice-edit-v4.json',{'approval':'User explicitly approved removing spoken directions only on 2026-11-18','removedSourceSeconds':[cut_a,cut_b],'removedText':'ছোট বিরতি। মায়া মৃদু হাসি একটু দুষ্টুমি খুব স্বাভাবিক।','sourceSha256':hashlib.sha256(original.read_bytes()).hexdigest(),'editedSha256':hashlib.sha256(edited.read_bytes()).hexdigest(),'retainedPcmSamplesIdentical':True,'duration':duration,'speedChanged':False,'narrationRegenerated':False})
lines=read(Path('scripts/story_lines.json'))
alignment=read(media/'forced-alignment-v4.json')
fix=read(media/'forced-fix-v4.json')
alignment['segments']=[fix['segments'][0] if s['id']=='36' else s for s in alignment['segments']]
def norm(s):return ''.join(c for c in s if unicodedata.category(c)[0] in 'LMN')
def at(words,pos,end=False):
 cursor=0
 for w in words:
  n=len(norm(w['text']))
  if pos<=cursor+n:
   return w['start']+(w['end']-w['start'])*max(0,min(1,(pos-cursor)/max(1,n)))
  cursor+=n
 return words[-1]['end']
segments=[]
for group in alignment['segments']:
 startidx=int(group['id']);cursor=0;k=startidx
 grouptext=norm(group['text'])
 while k<len(lines) and cursor<len(grouptext):
  who,a,b,text,kind=lines[k];canonical=text.split();words=[]
  assert grouptext[cursor:cursor+len(norm(text))]==norm(text),(k,'text mismatch')
  for token in canonical:
   count=len(norm(token));s=at(group['words'],cursor);e=at(group['words'],cursor+count,True);cursor+=count
   if who!='instruction':
    if s>=cut_b:s-=offset;e-=offset
    words.append(dict(text=token,start=round(s,3),end=round(max(e,s+.025),3),who=who,segment=str(k)))
  if who!='instruction':segments.append(dict(id=str(k),who=who,start=words[0]['start'],end=words[-1]['end'],text=text,kind=kind,words=words))
  k+=1
segments.sort(key=lambda s:int(s['id']))
# Keep full speech-free reaction intervals within the previous shot.
timeline=[]
for k,s in enumerate(segments):timeline.append(dict(id=s['id'],start=0 if k==0 else s['start'],end=segments[k+1]['start'] if k+1<len(segments) else math.ceil(duration*30)/30,kind=s['kind']))
data=dict(method='local_cross_attention_reference_alignment',phonemeTiming='approximate_not_verified',segments=segments,words=[w for s in segments for w in s['words']],cues=[{k:s[k] for k in ['who','start','end','text']} for s in segments if s['who']!='narrator'])
save(src/'dialogue-timing.json',data);save(src/'story-timeline.json',timeline)
save(src/'episode-config.json',dict(frames=math.ceil(duration*30),fps=30,duration=duration,version='story-rewrite-v4',voice='voiceover-edited.wav'))
samples=array.array('h',output);env=[]
for f in range(math.ceil(duration*30)):
 block=samples[round(f*rate/30):round((f+1)*rate/30)]
 env.append(round(min(1,math.sqrt(sum(v*v for v in block)/max(1,len(block)))/32768*8),3))
save(src/'voice-envelope.json',env)
def span(k):return next(s for s in segments if s['id']==str(k))
settings=[(0,'সই করিস না।','না।','#ffcf48'),(3,'চালটা আমার না।','আমার','#ffcf48'),(11,'একবার পেমেন্ট। দুবার টাকা কাটা।','দুবার','#ffb653'),(14,'আমার রিপোর্টে লালই ছিল।','লালই','#ffb653'),(20,'আমি সই করিনি।','করিনি।','#ffcf48'),(25,'দায়িত্ব নিতে না পারলে…','দায়িত্ব','#ffcf48'),(29,'পেমেন্ট টেস্ট ব্যর্থ।','ব্যর্থ।','#ffb653'),(35,'প্রমোশন স্থগিত!','স্থগিত!','#ffb653'),(39,'প্রমোশন রোলব্যাক হয়েছে।','রোলব্যাক','#ffcf48'),(42,'চিনি ছাড়া? মনে রেখেছিস?','মনে','#ffcf48')]
punch=[]
for k,text,key,color in settings:
 s=span(k);start=s['start'];end=s['end']
 if k==0:end=next(w['end'] for w in s['words'] if w['text']=='না।')
 if k==20:start=next(w['start'] for w in s['words'] if w['text']=='আমি')
 if k==25:start=next(w['start'] for w in s['words'] if w['text']=='দায়িত্ব')
 if k==29:end=next(w['end'] for w in s['words'] if w['text']=='ব্যর্থ।')
 if k==39:end=next(w['end'] for w in s['words'] if w['text']=='হয়েছে।')
 punch.append(dict(start=start,end=end,text=text,key=key,color=color))
save(src/'punches.json',punch)
Path('recorded-script-v4.bn.txt').write_text('\n\n'.join(s['text'] for s in segments),encoding='utf-8')
save(media/'timeline-v4.json',timeline)
print('Prepared:',duration,'seconds,',len(segments),'lines,',len(data['words']),'words; retained PCM identical')
