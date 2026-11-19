"""Make versioned review excerpts and a simple local player; never publish."""
import json,shutil,subprocess,sys
from pathlib import Path
ffmpeg,folder=sys.argv[1:3];dest=Path(folder)
def run(cmd):
 r=subprocess.run(cmd,capture_output=True,text=True)
 if r.returncode:raise RuntimeError(r.stderr)
for name,start,length in [('opening-12s.mp4',0,12),('payment-twist.mp4',24.6,9),('decision.mp4',54.14,17.2),('closing.mp4',91.98,11.153333)]:
 p=dest/name
 if p.exists():raise SystemExit('Existing excerpt preserved: '+str(p))
 run([ffmpeg,'-hide_banner','-v','error','-n','-ss',str(start),'-i',str(dest/'preview-safe.mp4'),'-t',str(length),'-c:v','libx264','-crf','19','-preset','veryfast','-pix_fmt','yuv420p','-color_range','tv','-c:a','aac','-b:a','160k','-movflags','+faststart',str(p)])
source=Path.cwd();media=dest.parent.parent
shutil.copy2(media/'captions-v4.bn.srt',dest/'captions.bn.srt')
shutil.copy2(source/'recorded-script-v4.bn.txt',dest/'recorded-script.bn.txt')
shutil.copy2(media/'voice-edit-v4.json',dest/'voice-edit.json')
(dest/'youtube.txt').write_text('''প্রমোশন, নাকি ফাঁদ? | জীবনের অদ্ভুত গল্প — পর্ব ৫

মায়া সই করেনি। প্রমোশন পেল রাফি। কিন্তু অনুমোদনের শেষ পাতায় কী লেখা ছিল?
সফটওয়্যার অফিসের চাপ, বিশ্বাস আর একটি কঠিন সিদ্ধান্তের গল্প।

আপনি রাফির জায়গায় থাকলে কী করতেন?

#জীবনেরঅদ্ভুতগল্প #ByteVerseToon #BanglaStory #OfficePolitics #Shorts

খসড়া প্রকাশনা লেখা — এই সংস্করণ প্রকাশ করা হয়নি।
''',encoding='utf-8')
html='''<!doctype html><html lang="bn"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>পর্ব ৫ — নতুন গল্পের প্রিভিউ</title><style>*{box-sizing:border-box}body{margin:0;background:#0d1928;color:#fff6df;font-family:"Nirmala UI",sans-serif}main{max-width:1080px;margin:auto;display:flex;gap:38px;padding:25px;align-items:flex-start}video{height:90vh;max-width:53vw;background:#071323;border:1px solid #536c7e;border-radius:15px}aside{padding-top:30px;max-width:430px}h1{font-size:29px;line-height:1.7;color:#ffcf48}p{line-height:1.9}button,a{font:inherit;display:block;text-align:left;background:#213950;color:#fff5df;border:1px solid #688395;border-radius:9px;padding:13px 17px;margin:12px 0;text-decoration:none;cursor:pointer;width:100%}button:hover,a:hover{background:#36556e}.active{border-color:#ffcf48;color:#ffcf48}small{color:#b8c8cf}@media(max-width:700px){main{display:block;padding:15px}video{width:100%;height:auto;max-width:100%;max-height:77vh}aside{padding-top:8px}}</style><main><video id="player" controls playsinline preload="metadata" poster="cover.png" src="opening-12s.mp4"></video><aside><small>জীবনের অদ্ভুত গল্প · পর্ব ০৫</small><h1>প্রমোশন পেল অন্যজন</h1><p id="now">প্রথম ১২ সেকেন্ড · সাউন্ড চালু করে দেখুন</p><button class="active" data-src="opening-12s.mp4">শুরুর হুক · ১২ সেকেন্ড</button><button data-src="payment-twist.mp4">পেমেন্টের টুইস্ট · ৯ সেকেন্ড</button><button data-src="decision.mp4">চাপ ও সিদ্ধান্ত · ১৭ সেকেন্ড</button><button data-src="closing.mp4">শেষের কথোপকথন · ১১ সেকেন্ড</button><button data-src="preview-safe.mp4">পুরো প্রিভিউ · ১ মিনিট ৪৩ সেকেন্ড</button><a href="preview-safe.mp4" download>প্রিভিউ ডাউনলোড</a><p><small>অডিওর উচ্চারিত অভিনয়ের নির্দেশগুলো অনুমতি অনুযায়ী বাদ দেওয়া হয়েছে। গল্পের সংলাপ অক্ষত।</small></p></aside></main><script>const p=document.querySelector('video');document.querySelectorAll('button[data-src]').forEach(b=>b.onclick=()=>{p.pause();p.src=b.dataset.src;p.load();p.play();document.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelector('#now').textContent=b.textContent;});</script></html>'''
(dest/'review.html').write_text(html,encoding='utf-8')
story=json.loads(Path('src/story-timeline.json').read_text(encoding='utf-8'))
lines=['# Episode 05 — new story storyboard\n','Voice: approved user recording; authorized spoken-note cut only.','Current animation source: animation-v4. Review output 540x960; source 1080x1920.','Mouth animation approximate; full listening and user creative approval remain pending.\n','| Time | Scene action |','| --- | --- |']
for s in story:lines.append(f"| {s['start']:.2f}–{s['end']:.2f} | {s['kind']} |")
lines+=['\nSound: original local synthesis; ledger in sound-cues-v4.json.','Preserve cast illustrations intact; no synthetic detached hands on devices or props.','Fictional test UI illustrates one payment request producing two debit entries; not a claim about a real service.']
(source.parent/'storyboard-v4.md').write_text('\n'.join(lines),encoding='utf-8')
print('Review excerpts, player, script, captions and storyboard saved.')
