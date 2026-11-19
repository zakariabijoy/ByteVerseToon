import hashlib,json,sys
from pathlib import Path
sys.stdout.reconfigure(encoding='utf-8')
media=Path(sys.argv[1]);root=Path.cwd().parent
def read(p):return json.loads(p.read_text(encoding='utf-8'))
def save(p,x):p.write_text(json.dumps(x,ensure_ascii=False,indent=2),encoding='utf-8')
state={'episode':5,'title':'প্রমোশন পেল অন্যজন','updatedOn':'2026-11-18','story':'new_corporate_payment_release_story_approved_with_recording','script':'animation-v4/recorded-script-v4.bn.txt','recording':'user_final_2026-11-17T18_06_39Z','originalVoiceSha256':'500a653fc8790c7cc9e5f62a45e8b45a7b9cfd1e0325a4efea34c50e88d5be3d','originalSeconds':108.4,'voiceEdit':read(media/'voice-edit-v4.json'),'voicePlaybackRate':1,'durationFrames':3094,'fps':30,'sourceVersion':'animation-v4','previewVersion':'review-v4-new-story','animation':'current_review_render_in_progress','videoApproval':'pending_current_preview','finalDeliveryRender':'awaiting_current_preview_approval','publication':'not_requested','gitPush':'not_attempted_prior_review_requires_explicit_authorization','technicalChecks':{'typescript':'passed','retainedPcm':'sample_identical','completeDecode':'pending_render'},'visualReview':{'frames':[15,75,180,390,600,840,970,1140,1415,1730,2010,2130,2515,2700,2820,3025],'scope':'16 representative frames inspected; manager subsequently changed to stern intact pose','representation':'intact illustrated surfaces and native prop inserts; approximate word-timed mouths','motion':'Studio opening/evidence advanced unmuted without error; exported motion review pending'},'fullListeningReview':'pending_not_inferred_from_playback_or_meters','preservation':'all prior scripts, recordings, source and rejected reviews retained'}
export=media/'exports/review-v4-new-story'
if (export/'verification.json').exists():
 state['animation']='current_preview_ready';state['verification']=read(export/'verification.json');state['technicalChecks']['completeDecode']='passed';state['preview']=str(export/'preview-safe.mp4')
save(root/'review-state.json',state)
manifest={'version':'story-v4','assets':[]}
for f in sorted((media/'assets-v4').iterdir()):
 if f.is_file():manifest['assets'].append({'path':f.name,'bytes':f.stat().st_size,'sha256':hashlib.sha256(f.read_bytes()).hexdigest()})
save(root/'media-manifest-v4.json',manifest)
package=read(Path('package.json'));package['scripts']['dev']=package['scripts']['dev'].replace('3119','3122');save(Path('package.json'),package)
print('Review state and declared media saved locally.')
