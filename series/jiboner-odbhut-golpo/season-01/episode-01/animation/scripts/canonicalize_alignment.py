"""Preserve script spelling/word joins while retaining cross-attention timing."""
import json
import pathlib
import statistics
import sys

def canonicalize(data):
    all_words=[]
    for segment in data['segments']:
        raw=segment['words']
        expected=segment['text'].split()
        stream=''.join(w['text'].replace(' ','') for w in raw)
        target=''.join(expected)
        if stream!=target:
            # Punctuation-only tokens can be omitted from the timing model.
            def letters(text):return ''.join(c for c in text if c.isalnum())
            if letters(stream)!=letters(target):
                raise ValueError('Reference token text differs: '+segment['id'])
        spans=[];cursor=0
        for w in raw:
            size=len(w['text'].replace(' ',''))
            spans.append((cursor,cursor+size,w));cursor+=size
        result=[];cursor=0
        for text in expected:
            a,b=cursor,cursor+len(text)
            matches=[w for start,end,w in spans if end>a and start<b]
            if not matches:matches=[raw[-1]]
            result.append({'text':text,'start':matches[0]['start'],'end':max(matches[0]['start']+.02,matches[-1]['end']),
                           'probability':round(statistics.mean(w['probability'] for w in matches),4),
                           'who':segment['who'],'segment':segment['id']})
            cursor=b
        segment['words']=result
        all_words.extend(result)
    data['words']=all_words
    data['orthography']='canonical_user_script_and_spoken_title'
    return data

if __name__=='__main__':
    p=pathlib.Path(sys.argv[1])
    data=canonicalize(json.loads(p.read_text(encoding='utf-8')))
    p.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
    print(len(data['words']),'script words retain original spelling')
