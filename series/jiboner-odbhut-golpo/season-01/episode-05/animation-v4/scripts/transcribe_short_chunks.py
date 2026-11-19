import sys,json
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8")
root=Path(r"E:\ByteVerseToon\production\tools\story-audio")
sys.path.insert(0,str(root/"python"));sys.path.insert(0,str(root/"compat-av"))
from faster_whisper import WhisperModel
from faster_whisper.audio import decode_audio
a=decode_audio(sys.argv[1],sampling_rate=16000)
m=WhisperModel(str(root/"models/faster-whisper-turbo"),device="cpu",compute_type="int8",cpu_threads=8,local_files_only=True)
out=[]
for start in range(0,110,12):
 segs,info=m.transcribe(a[start*16000:(start+12)*16000],language="bn",beam_size=3,word_timestamps=True,condition_on_previous_text=False,vad_filter=False)
 for s in segs:
  row={"start":s.start+start,"end":s.end+start,"text":s.text,"words":[{"text":w.word,"start":w.start+start,"end":w.end+start} for w in s.words]}
  out.append(row);print(round(row["start"],2),round(row["end"],2),row["text"],flush=True)
 Path(sys.argv[2]).write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding="utf-8")
