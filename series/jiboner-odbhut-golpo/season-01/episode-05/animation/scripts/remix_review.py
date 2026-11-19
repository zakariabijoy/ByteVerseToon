"""Remix supplied speech and local stems; copy the verified video stream intact."""
import argparse,json,pathlib,re,subprocess
p=argparse.ArgumentParser();p.add_argument('ffmpeg');p.add_argument('base',type=pathlib.Path);p.add_argument('assets',type=pathlib.Path);p.add_argument('output',type=pathlib.Path);a=p.parse_args()
a.output.mkdir(parents=True,exist_ok=True)
def run(args):
 r=subprocess.run([a.ffmpeg,'-hide_banner',*args],capture_output=True,text=True)
 if r.returncode:raise RuntimeError(r.stderr)
 return r
mixed=a.output/'mix-unmastered.wav';target=a.output/'preview-safe.mp4'
if mixed.exists() or target.exists():raise SystemExit('Existing mix preserved; choose a fresh output folder.')
run(['-n','-i',str(a.assets/'voiceover-original.wav'),'-i',str(a.assets/'drama-score.wav'),'-i',str(a.assets/'clear-effects-v2.wav'),'-filter_complex','[0:a]volume=1[v];[1:a]volume=3.2[s];[2:a]volume=1[e];[v][s][e]amix=inputs=3:duration=longest:normalize=0,apad,atrim=duration=84.166666667[a]','-map','[a]','-c:a','pcm_f32le','-ar','48000','-ac','2',str(mixed)])
measurement=run(['-i',str(mixed),'-af','loudnorm=I=-16:TP=-1.6:LRA=11:print_format=json','-f','null','-']).stderr
stats=json.loads(re.findall(r'\{[^{}]*\}',measurement)[-1])
filters='loudnorm=I=-16:TP=-1.6:LRA=11:'+f"measured_I={stats['input_i']}:measured_TP={stats['input_tp']}:measured_LRA={stats['input_lra']}:measured_thresh={stats['input_thresh']}:offset={stats['target_offset']}:linear=true,apad,atrim=duration=84.166666667"
run(['-n','-i',str(a.base/'preview-safe.mp4'),'-i',str(mixed),'-map','0:v:0','-map','1:a:0','-c:v','copy','-af',filters,'-c:a','aac','-b:a','192k','-ar','48000','-ac','2','-movflags','+faststart',str(target)])
final=json.loads(re.findall(r'\{[^{}]*\}',run(['-i',str(target),'-vn','-af','loudnorm=I=-16:TP=-1:LRA=11:print_format=json','-f','null','-']).stderr)[-1])
hashes=[]
for video in [a.base/'preview-safe.mp4',target]:hashes.append(run(['-v','error','-i',str(video),'-map','0:v:0','-c:v','copy','-f','hash','-hash','sha256','-']).stdout.strip())
assert hashes[0]==hashes[1], 'Video changed during sound-only revision'
(a.output/'audio-mastering.json').write_text(json.dumps({'targetLufs':-16,'sourceMeasurement':stats,'finalMeasurement':final,'picture':'original verified H264 stream copied intact','sourceWav':'unchanged','videoStreamHash':hashes[0]},indent=2))
print(json.dumps({'lufs':final['input_i'],'truePeakDb':final['input_tp'],'videoStreamUnchanged':True}))
