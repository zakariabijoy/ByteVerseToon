"""Episode 06 approved reference text and curated speech intervals. No audio edits."""
import json, hashlib, os
from pathlib import Path
BASE = Path(__file__).resolve().parents[1]
WORKSPACE=Path(os.environ.get('BVT_WORKSPACE',str(BASE.parents[5])))
MEDIA=WORKSPACE/'production/storytelling/jiboner-odbhut-golpo/season-01/episode-06'
lines = [
 (0,4.46,'guard','স্যার, আপনার মা নিচে এসেছিলেন। বলে গেছেন—আপনাকে যেন না ডাকি।'),
 (4.46,6.70,'narrator','রাফি ল্যাপটপ থেকে চোখ তুলল।'),
 (6.70,8.35,'rafi','মা? কখন?'),
 (8.35,13.34,'narrator','ঘণ্টাখানেক আগেও ফোনে মায়ের তিনটা মিসড কল দেখে বিরক্ত হয়েছিল সে।'),
 (13.34,15.78,'narrator','আজ তার প্রথম বড় ক্লায়েন্ট মিটিং।'),
 (15.78,17.90,'narrator','ফোন করতেই মা বলেছিলেন,'),
 (17.90,19.78,'mother','বাবা, দুপুরে একটু—'),
 (19.78,22.24,'narrator','রাফি মাঝখানে থামিয়ে দিয়েছিল।'),
 (22.24,26.60,'rafi','মা, দরকারটা মেসেজ করো। একই কথা বলার জন্য বারবার ফোন দিয়ো না।'),
 (26.60,28.12,'narrator','ওপাশে একটু নীরবতা।'),
 (28.12,30.26,'mother','আচ্ছা। কাজ কর।'),
 (30.26,33.20,'narrator','এখন গার্ডের হাতে একটা কাপড়ের ব্যাগ।'),
 (33.20,38.40,'guard','টিফিনটা রেখে গেছেন। করিম ভাইয়ের দোকানে বসেছিলেন। বাসের সময় হয়ে গেছে বোধহয়।'),
 (38.40,44.38,'narrator','রাফি ব্যাগটা খুলল। দুটো টিফিন… দুটো চামচ। ওপরের ছোট বাটিতে আলুভর্তা।'),
 (44.38,46.02,'narrator','সকালের কথাটা মনে পড়ল তার।'),
 (46.02,47.76,'narrator','মা জিজ্ঞেস করেছিলেন,'),
 (47.76,48.64,'mother','আজ কী খাবি?'),
 (48.64,50.96,'narrator','জুতো পরতে পরতে সে বলেছিল,'),
 (50.96,54.74,'rafi','তোমার হাতের আলুভর্তা। অফিসের খাবার আর ভালো লাগে না।'),
 (54.74,56.14,'narrator','বলেই ভুলে গিয়েছিল।'),
 (56.14,57.22,'narrator','মা ভোলেননি।'),
 (57.22,58.65,'narrator','রাফি ফোন করল।'),
 (58.65,60.90,'rafi','মা, তুমি এসেছ বলোনি কেন?'),
 (60.90,63.20,'mother','তুই তো দরকারটা মেসেজ করতে বললি।'),
 (63.20,65.18,'narrator','রাফি কথা খুঁজে পেল না।'),
 (65.18,66.54,'narrator','মা আস্তে বললেন,'),
 (66.54,71.40,'mother','তোর কাছে কিছু চাইতে আসিনি রে… ভাবলাম, আজ একসঙ্গে খাই।'),
 (71.40,73.78,'narrator','ল্যাপটপে মিটিং শুরুর সংকেত বাজল।'),
 (73.78,75.38,'narrator','রাফি সাজিদকে বলল,'),
 (75.38,79.96,'rafi','শুরুর আপডেটটা তুই দিবি? দশ মিনিট লাগবে। বাকিটা ফিরে এসে আমি নেব।'),
 (79.96,82.56,'narrator','সাজিদ ব্যাগের দুটো চামচ দেখল।'),
 (82.56,83.44,'narrator','তারপর বলল,'),
 (83.44,85.68,'sajid','যা। এবার ফোনটা ধরিস।'),
 (85.68,87.92,'narrator','বাসস্ট্যান্ডে মাকে পেল রাফি।'),
 (87.92,90.32,'narrator','পাশে বসে টিফিন খুলতেই মা বললেন,'),
 (90.32,91.50,'mother','হাত ধুয়েছিস?'),
 (91.50,92.98,'narrator','রাফি হেসে ফেলল।'),
 (92.98,96.00,'rafi','এত বড় টিম লিড হলাম। এই প্রশ্নটা বদলাবে না?'),
 (96.00,98.44,'narrator','মা পানির বোতলটা এগিয়ে দিলেন।'),
 (98.44,100.36,'mother','টিম লিড হলে হাত ধুতে হয় না?'),
 (100.36,102.54,'narrator','এবার রাফি ফোনটা সাইলেন্ট করল।'),
 (102.54,105.52,'narrator','তারপর দুটো চামচের একটা মায়ের হাতে দিল।'),
]
segments=[dict(id=str(i),start=a,end=b,who=w,text=t) for i,(a,b,w,t) in enumerate(lines)]
def save(path,data):path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
save(MEDIA/'analysis/reference-segments.json',segments)
save(BASE/'src/episode-config.json',dict(episode=6,title='মায়ের তিনটা মিসড কল',frames=3166,fps=30,narrationSeconds=105.52,narrationUnchanged=True))
(BASE.parent/'recorded-script.bn.txt').write_text('\n\n'.join(s['text'] for s in segments)+'\n',encoding='utf-8')
save(MEDIA/'recording.json',dict(originalFile='C:/Users/zakar/Downloads/cartesia_2026-11-20T17_17_00Z_zakaria-bijoy-bangla_sonic-3.6_bn.wav',sha256=hashlib.sha256((MEDIA/'assets/voiceover-original.wav').read_bytes()).hexdigest(),duration=105.52,sampleRate=44100,channels=1,approval='User explicitly approved final recording and animation start',voiceEdits=[],timing='Curated reference intervals with local cross-attention refinement; not verified phoneme alignment',fullListeningReview='pending'))
print('Saved 42 approved reference segments; original audio untouched.')
