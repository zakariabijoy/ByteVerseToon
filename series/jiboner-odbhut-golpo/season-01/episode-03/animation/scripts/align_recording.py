"""Align the supplied script to local audio, rather than replacing it with ASR.

Uses faster-whisper's cross-attention alignment over curated speech-pause chunks.
Visemes in the renderer are approximations inside these word intervals.
"""
import argparse
import json
import pathlib
import sys
import unicodedata
sys.stdout.reconfigure(encoding='utf-8')
parser=argparse.ArgumentParser()
parser.add_argument('--tools-root',required=True)
parser.add_argument('--audio',required=True)
parser.add_argument('--segments',required=True)
parser.add_argument('--output',required=True)
parser.add_argument('--limit',type=int,default=0)
args=parser.parse_args()
root=pathlib.Path(args.tools_root)
sys.path.insert(0,str(root/'python'))
sys.path.insert(0,str(root/'compat-av'))
from faster_whisper import WhisperModel
from faster_whisper.audio import decode_audio,pad_or_trim
from faster_whisper.tokenizer import Tokenizer

model=WhisperModel(str(root/'models'/'faster-whisper-turbo'),device='cpu',compute_type='int8',cpu_threads=8,local_files_only=True)
tokenizer=Tokenizer(model.hf_tokenizer,model.model.is_multilingual,task='transcribe',language='bn')
audio=decode_audio(args.audio,sampling_rate=16000)
segments=json.loads(pathlib.Path(args.segments).read_text(encoding='utf-8'))
result={'method':'local_whisper_cross_attention_forced_alignment_with_curated_speech_pause_chunks',
        'model':json.loads((root/'models'/'turbo-revision.json').read_text(encoding='utf-8')),
        'phonemeTiming':'heuristic_inside_word_intervals_not_verified_phoneme_alignment',
        'words':[],'cues':[],'segments':[]}
for segment in segments[:args.limit or None]:
    start,end=segment['start'],segment['end']
    clip=audio[int(start*16000):int(end*16000)]
    features=model.feature_extractor(clip)
    encoded=model.encode(pad_or_trim(features))
    aligned=model.find_alignment(tokenizer,[tokenizer.encode(' '+segment['text'])],encoded,features.shape[-1])[0]
    words=[]
    for word in aligned:
        a=max(start,min(end,start+float(word['start'])))
        b=max(a,min(end,start+float(word['end'])))
        item={'text':word['word'].strip(),'start':round(a,3),'end':round(b,3),
              'probability':round(float(word['probability']),4),'who':segment['who'],'segment':segment['id']}
        if item['text'] and not any(unicodedata.category(c).startswith(('L','N')) for c in item['text']):
            if words:
                words[-1]['text']+=item['text']
            continue
        if item['text']:
            words.append(item)
            result['words'].append(item)
    result['segments'].append({**segment,'words':words})
    if segment['who']!='narrator':
        result['cues'].append({k:segment[k] for k in ['who','start','end','text']})
    pathlib.Path(args.output).write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
    print(segment['id'],len(words),'words aligned',flush=True)
print('Saved local reference alignment:',args.output,flush=True)
