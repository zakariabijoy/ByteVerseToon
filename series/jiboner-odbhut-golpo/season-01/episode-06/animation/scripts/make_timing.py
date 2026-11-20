import json,sys,math,os
from pathlib import Path
BASE=Path(__file__).resolve().parents[1]
WORKSPACE=Path(os.environ.get('BVT_WORKSPACE',str(BASE.parents[5])))
MEDIA=WORKSPACE/'production/storytelling/jiboner-odbhut-golpo/season-01/episode-06'
raw=MEDIA/'analysis/forced-alignment.json'
refs=json.loads((MEDIA/'analysis/reference-segments.json').read_text(encoding='utf-8'))
aligned=json.loads(raw.read_text(encoding='utf-8')) if raw.exists() else {'segments':[]}
out=[];words=[];cues=[];pages=[];fixes=[]
for s in refs:
 found=next((x for x in aligned['segments'] if x['id']==s['id']),None)
 tokens=s['text'].split(); ws=[]
 if found:
  stream=[]
  for w in found['words']:
   for ch in w['text'].replace(' ',''):stream.append((ch,w['start'],w['end']))
  target=''.join(tokens)
  if ''.join(x[0] for x in stream)==target:
   pos=0
   for token in tokens:
    sub=stream[pos:pos+len(token)];pos+=len(token)
    ws.append(dict(text=token,start=sub[0][1],end=max(sub[-1][2],sub[0][1]+.03),who=s['who'],segment=s['id']))
 # Fallback: explicit reference interval, never misrepresented as ASR timing.
 if not ws or any(w['end']-w['start']>2.4 for w in ws) or len(set(w['start'] for w in ws))<len(ws)*.65:
  sizes=[max(2,len(x)) for x in tokens];total=sum(sizes);cursor=s['start'];ws=[]
  for token,size in zip(tokens,sizes):
   end=cursor+(s['end']-s['start'])*size/total
   ws.append(dict(text=token,start=round(cursor,3),end=round(end,3),who=s['who'],segment=s['id']));cursor=end
  fixes.append(s['id'])
 prev=s['start']
 for i,w in enumerate(ws):
  w['start']=max(prev,min(s['end']-.02,w['start']));w['end']=min(s['end'],max(w['start']+.02,w['end']));prev=w['start']
 out.append({**s,'words':ws});words+=ws
 if s['who']!='narrator':cues.append({k:s[k] for k in ['who','start','end','text']})
 group=[]
 def emit():
  if group:pages.append(dict(who=s['who'],start=group[0]['start'],end=group[-1]['end'],words=group.copy()))
  group.clear()
 for w in ws:
  if group and (len(group)>=4 or len(' '.join(x['text'] for x in group)+' '+w['text'])>30):emit()
  group.append(w)
  if w['text'].endswith(('।','?','!','…')):emit()
 emit()
for i,p in enumerate(pages):p['end']=max(p['start']+.08,min(p['end']+.10,pages[i+1]['start'] if i+1<len(pages) else 105.52))
def save(path,d):path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
save(BASE/'src/dialogue-timing.json',dict(segments=out,words=words,cues=cues,method='local cross-attention with disclosed reference-interval fallback',intervalFallbackSegments=fixes,phonemes='not verified'))
save(BASE/'src/caption-pages.json',pages)
save(BASE/'src/caption-data.json',[dict(text=w['text'],startMs=round(w['start']*1000),endMs=round(w['end']*1000),timestampMs=None,confidence=None) for w in words])
def ts(t):
 m=int(round(t*1000));return f'{m//3600000:02d}:{m//60000%60:02d}:{m//1000%60:02d},{m%1000:03d}'
srt='\n\n'.join(f"{i+1}\n{ts(p['start'])} --> {ts(p['end'])}\n{' '.join(w['text'] for w in p['words'])}" for i,p in enumerate(pages))+'\n'
(BASE.parent/'captions.bn.srt').write_text(srt,encoding='utf-8')
print(len(pages),'caption pages;',len(fixes),'reference timing fallbacks')
