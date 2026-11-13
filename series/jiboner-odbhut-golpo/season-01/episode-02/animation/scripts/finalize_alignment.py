"""Merge reviewed short-chunk alignments and build canonical quote captions."""
import json
import pathlib
import sys
from canonicalize_alignment import canonicalize

base = pathlib.Path(sys.argv[1])
data = json.loads((base / 'alignment-v1.json').read_text(encoding='utf-8'))
refined = json.loads((base / 'alignment-refined.json').read_text(encoding='utf-8'))
replacements = {s['id']: s for s in refined['segments']}
data['segments'] = [replacements.get(s['id'], s) for s in data['segments']]
data = canonicalize(data)
data['cues'] = [dict(who=s['who'], start=s['words'][0]['start'],
                     end=s['words'][-1]['end'], text=s['text'])
                for s in data['segments'] if s['who'] != 'narrator']
pathlib.Path('src/dialogue-timing.json').write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
phrases = []
for segment in data['segments']:
    if segment['who'] == 'narrator':
        continue
    group = []
    def emit():
        if group:
            phrases.append(dict(who=segment['who'], start=group[0]['start'],
                                end=group[-1]['end'], text=' '.join(w['text'] for w in group)))
    for word in segment['words']:
        if group and (len(' '.join(w['text'] for w in group + [word])) > 58
                      or word['start'] - group[-1]['end'] > .45):
            emit()
            group = []
        group.append(word)
        if word['text'].endswith(('।', '?', '!')):
            emit()
            group = []
    emit()
pathlib.Path('src/dialogue-phrases.json').write_text(json.dumps(phrases, ensure_ascii=False, indent=2), encoding='utf-8')
print(len(data['words']), 'canonical words;', len(phrases), 'direct-speech phrases')
