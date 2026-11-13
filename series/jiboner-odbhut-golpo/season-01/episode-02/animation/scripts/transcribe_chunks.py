"""Diagnostic local-only short-window ASR; approved text remains authoritative."""
import argparse,json,pathlib,sys
p=argparse.ArgumentParser();p.add_argument('--tools-root',required=True);p.add_argument('--audio',required=True);p.add_argument('--output',required=True);a=p.parse_args()
root=pathlib.Path(a.tools_root);sys.path.insert(0,str(root/'python'));sys.path.insert(0,str(root/'compat-av'));sys.stdout.reconfigure(encoding='utf-8')
from faster_whisper import WhisperModel
from faster_whisper.audio import decode_audio
audio=decode_audio(a.audio,sampling_rate=16000)
model=WhisperModel(str(root/'models/faster-whisper-turbo'),device='cpu',compute_type='int8',cpu_threads=8,local_files_only=True)
result=[]
for start in range(0,107,8):
    clip=audio[start*16000:(start+8)*16000]
    if not len(clip):break
    segments,_=model.transcribe(clip,language='bn',beam_size=3,word_timestamps=True,condition_on_previous_text=False,initial_prompt='রাফি, সাজিদ, করিম চাচা, প্রেজেন্টেশন, ম্যানেজার।')
    for s in segments:
        row={'start':round(start+s.start,3),'end':round(start+s.end,3),'text':s.text,'words':[{'text':w.word,'start':round(start+w.start,3),'end':round(start+w.end,3)} for w in s.words or []]}
        result.append(row);print(row['start'],row['end'],row['text'],flush=True)
    pathlib.Path(a.output).write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
