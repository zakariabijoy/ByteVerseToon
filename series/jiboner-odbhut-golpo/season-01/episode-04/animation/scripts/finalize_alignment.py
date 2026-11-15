"""Merge reference-text refinements; retain each original speaker assignment."""
import json,pathlib,sys
from canonicalize_alignment import canonicalize
base=pathlib.Path(sys.argv[1])
data=canonicalize(json.loads((base/'alignment-v1.json').read_text(encoding='utf-8')))
refined=canonicalize(json.loads((base/'alignment-refined.json').read_text(encoding='utf-8')))
groups=json.loads(pathlib.Path('src/alignment-refinements.json').read_text(encoding='utf-8'))
byid={s['id']:s for s in data['segments']}
for group,ref in zip(groups,refined['segments']):
 cursor=0
 for sid in group['sourceSegments']:
  s=byid[sid];size=len(s['text'].split());words=ref['words'][cursor:cursor+size]
  assert [w['text'] for w in words]==s['text'].split(),sid
  for w in words:w.update(who=s['who'],segment=sid)
  s.update(words=words,start=words[0]['start'],end=words[-1]['end']);cursor+=size
 assert cursor==len(ref['words'])
data['words']=[w for s in data['segments'] for w in s['words']]
data['cues']=[dict(who=s['who'],start=s['words'][0]['start'],end=s['words'][-1]['end'],text=s['text']) for s in data['segments'] if s['who']!='narrator']
pathlib.Path('src/dialogue-timing.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
phrases=[]
for s in data['segments']:
 if s['who']=='narrator':continue
 group=[]
 def emit():
  if group:phrases.append(dict(who=s['who'],start=group[0]['start'],end=group[-1]['end'],text=' '.join(w['text'] for w in group)))
 for w in s['words']:
  if group and len(' '.join(x['text'] for x in group+[w]))>54:emit();group=[]
  group.append(w)
  if w['text'].endswith(('।','?','!')):emit();group=[]
 emit()
pathlib.Path('src/dialogue-phrases.json').write_text(json.dumps(phrases,ensure_ascii=False,indent=2),encoding='utf-8')
print(len(data['words']),'canonical words;',len(phrases),'direct-speech phrases')
