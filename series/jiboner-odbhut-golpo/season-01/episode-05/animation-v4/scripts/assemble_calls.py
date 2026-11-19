"""Replace the revised picture interval while copying approved narration/mix."""
import hashlib,json,re,shutil,subprocess,sys
from pathlib import Path
ffmpeg,ffprobe,base,destination=sys.argv[1:5];base=Path(base);dest=Path(destination)
def run(cmd):
 r=subprocess.run(cmd,capture_output=True,text=True)
 if r.returncode:raise RuntimeError(r.stderr)
 return r
old=base/'preview-safe.mp4';new=dest/'preview-safe.mp4'
if new.exists():raise SystemExit('Preserving previous output; choose a fresh directory.')
graph='[0:v]trim=start_frame=0:end_frame=1624,setpts=PTS-STARTPTS[a];[1:v]trim=start_frame=0:end_frame=784,setpts=PTS-STARTPTS[b];[0:v]trim=start_frame=2408:end_frame=3094,setpts=PTS-STARTPTS[c];[a][b][c]concat=n=3:v=1:a=0,scale=in_range=auto:out_range=tv,format=yuv420p[v]'
run([ffmpeg,'-hide_banner','-v','error','-n','-i',str(old),'-i',str(dest/'calls-picture.mp4'),'-filter_complex',graph,'-map','[v]','-map','0:a:0','-c:v','libx264','-crf','18','-preset','veryfast','-r','30','-fps_mode','cfr','-video_track_timescale','15360','-pix_fmt','yuv420p','-color_range','tv','-c:a','copy','-movflags','+faststart',str(new)])
def audio_hash(p):return run([ffmpeg,'-v','error','-i',str(p),'-map','0:a:0','-c:a','copy','-f','hash','-hash','sha256','-']).stdout.strip()
assert audio_hash(old)==audio_hash(new),'Audio packets must be unchanged'
info=json.loads(run([ffprobe,'-v','error','-show_streams','-show_format','-of','json',str(new)]).stdout)
v=next(s for s in info['streams'] if s['codec_type']=='video');a=next(s for s in info['streams'] if s['codec_type']=='audio')
assert (v['width'],v['height'],int(v['nb_frames']))==(540,960,3094)
assert v['pix_fmt']=='yuv420p' and v['codec_name']=='h264' and v['color_range']=='tv' and v['avg_frame_rate']=='30/1'
assert a['codec_name']=='aac' and int(a['channels'])==2 and int(a['sample_rate'])==48000
assert abs(float(info['format']['duration'])-3094/30)<.05
check=run([ffmpeg,'-v','error','-xerror','-i',str(new),'-f','null','-']);assert not check.stderr.strip()
report={'version':5,'revision':'phone_call_continuity','frames':3094,'duration':float(info['format']['duration']),'dimensions':[540,960],'fps':30,'fullDecode':'passed','audioPacketsUnchanged':True,'audioPacketHash':audio_hash(new),'base':'review-v4-new-story','replacedFrames':[1624,2407],'sha256':hashlib.sha256(new.read_bytes()).hexdigest(),'creativeApproval':'pending_current_preview','fullListeningReview':'pending','finalDelivery':'not_rendered','publication':'not_requested'}
(dest/'verification.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
for name,start,length in [('phone-calls-26s.mp4',1624/30,784/30),('incoming-call.mp4',54.14,6.46),('call-reply.mp4',71.3,8.96)]:
 run([ffmpeg,'-hide_banner','-v','error','-n','-ss',str(start),'-i',str(new),'-t',str(length),'-c:v','libx264','-crf','19','-preset','veryfast','-r','30','-fps_mode','cfr','-video_track_timescale','15360','-pix_fmt','yuv420p','-color_range','tv','-c:a','aac','-b:a','160k','-movflags','+faststart',str(dest/name)])
for name in ['cover.png','captions.bn.srt','recorded-script.bn.txt','voice-edit.json','youtube.txt','opening-12s.mp4','payment-twist.mp4','closing.mp4','audio-mastering.json']:
 shutil.copy2(base/name,dest/name)
html=(base/'review.html').read_text(encoding='utf-8').replace('প্রথম ১২ সেকেন্ড · সাউন্ড চালু করে দেখুন','সংশোধিত ফোনকল · সাউন্ড চালু করে দেখুন').replace('src="opening-12s.mp4"','src="phone-calls-26s.mp4"').replace('<button class="active" data-src="opening-12s.mp4">','<button data-src="opening-12s.mp4">').replace('<button data-src="decision.mp4">চাপ ও সিদ্ধান্ত · ১৭ সেকেন্ড</button>','<button class="active" data-src="phone-calls-26s.mp4">সংশোধিত ফোনকল · ২৬ সেকেন্ড</button>').replace('পর্ব ৫ — নতুন গল্পের প্রিভিউ','পর্ব ৫ — সংশোধিত ফোনকল')
(dest/'review.html').write_text(html,encoding='utf-8')
print(json.dumps(report))
