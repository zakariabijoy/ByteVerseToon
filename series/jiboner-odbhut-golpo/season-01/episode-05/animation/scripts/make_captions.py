"""Create optional full Bangla SRT from reference-aligned words."""
import json
import pathlib
import sys

source=pathlib.Path('src/dialogue-timing.json')
data=json.loads(source.read_text(encoding='utf-8'))
groups=[]
for segment in data['segments']:
    group=[]
    for word in segment['words']:
        if group and (len(' '.join(w['text'] for w in group+[word]))>46 or word['start']-group[-1]['end']>.45):
            groups.append(group);group=[]
        group.append(word)
        if word['text'].endswith(('।','!','?')):
            groups.append(group);group=[]
    if group:groups.append(group)

def stamp(seconds):
    ms=round(seconds*1000)
    return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}'

blocks=[]
captions=[]
for i,group in enumerate(groups):
    start=group[0]['start'];end=max(start+.1,group[-1]['end'])
    text=' '.join(w['text'] for w in group)
    blocks.append(f'{i+1}\n{stamp(start)} --> {stamp(end)}\n{text}\n')
    captions.append({'text':text,'startMs':round(start*1000),'endMs':round(end*1000),'timestampMs':None,'confidence':None})
pathlib.Path(sys.argv[1]).write_text('\n'.join(blocks),encoding='utf-8')
pathlib.Path('src/caption-data.json').write_text(json.dumps(captions,ensure_ascii=False,indent=2),encoding='utf-8')
print(len(captions),'optional phrase subtitles saved')
