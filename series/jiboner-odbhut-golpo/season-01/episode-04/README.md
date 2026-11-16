# Episode 04 — যাকে সবাই গরিব ভাবত

The user approved the supplied final recording and asked to begin animation on 2026-11-15. The original words and voice are preserved. The first 3 seconds implement the newly approved direct-conflict opening preference.

The editable Remotion project reuses the approved series cast and intact-pose motion. A new guest teacher is drawn in four intact poses. Tea contact, notebooks and the final connected sleeve/hand-chair cutaway are original SVG staging. Physical contact is illustrated rather than simulated.

This is an animated review preview, not an approved final delivery. See `review-state.json` for exact review scope. Full listening and user review remain separate from decode checks. Publishing and cleanup require their own explicit instructions.

## Local reproduction

Restore the allowlisted assets in `media-manifest.json` to `${BVT_WORKSPACE}/production/storytelling/jiboner-odbhut-golpo/season-01/episode-04/assets`. Connect ignored `animation/public` to those assets and restore exact pinned dependencies using `animation/package-lock.json`. Git does not contain recordings, images, runtime weights, preview exports or browser data.

From `animation/`: prepare_episode.py -> analyze_voice.py -> align_recording.py -> canonicalize_alignment.py -> make_captions.py -> make_soundtrack.py. Existing local pinned transcription weights are required; see transcription-provenance.json. Use `node --require ./scripts/loopback-only.cjs node_modules/@remotion/cli/remotion-cli.js studio src/index.tsx --no-open --port=3115` for loopback-only preview.

`render_episode.cjs <fresh-output-directory> <fresh-bundle-tag>` generates a review render and cover. The mastering and verification scripts write/check `preview-safe.mp4` for this review stage. Preserve earlier outputs. Guest atlas bounds and mouth coordinates are authored in Scenes.tsx; measured original cast bounds remain in pose-bounds.ts. No detached heads or wrists are reintroduced.

Previous preview revision: review-v3, exported and technically verified across the complete 69.0667-second timeline after the user rejected review-v2 as static on 2026-11-16. Native opening playback and representative decoded frames were sampled. Full listening and user creative approval remain pending. Superseded previews remain local.

## Motion revision 3

`MotionScenes.tsx` now directs tighter reaction shots and full-frame SVG prop actions: glass lowers and hand releases, notebooks fall and bounce, a blue sleeve/hand grasps and lifts them, a held page reveals corrections/encouragement, a hand draws coins from a pocket, and a navy sleeve grips/pushes/releases the chair. Planned cuts and in-shot beats are in motion-shot-plan.json.

The recurring cast uses the same intact illustrations with larger continuous head/arm deformation and selected speech poses. `GuestMotion.ts` deforms the complete guest surface and face overlay together. Original pose bounds remain in use. This is illustrated 2D motion with editable contact actions, not full skeletal or frame-by-frame body animation. Retention improvement has not been measured or guaranteed.

Short word-aligned captions now cover narration and dialogue. `make_motion_foley.py` writes a new non-destructive Foley asset for these actions; the source recording, 162 approved words, original score, 69.04-second narration and 2072-frame timeline remain unchanged. Keep the exact pinned dependency versions.

## Drama revision 4

The user rejected review-v3 as insufficiently bold, suspenseful and audible. Current sources use `DramaDirection.tsx`, revised caption emphasis in `MotionScenes.tsx`, and `make_drama_audio.py`. Restore the two new allowlisted stems from media-manifest.json, retaining original narration and earlier assets. Original action effects are more prominent, impacts and risers mark story beats, the music dips before answers/reveals, and selected spoken lines use large contrast blocks and animated underlines. The evidence ring begins only once the page message becomes visible. Closing captions keep the final clause together.

The render is a review preview; technical validation is not a full listening review or user creative approval. A bounded notebook timing correction can be reproduced with `render_frame_patch.cjs`; its frameRange is inclusive and it produces no audio. Reassemble video at exact frame boundaries while retaining the complete base audio, or simply render current sources in a fresh folder. No approved narration changes, publication or cleanup are part of this revision.

Current preview: review-v4, local exports/review-v4-refined/preview-safe.mp4. Full decode, 1080×1920 / 2072 frames / 30 fps, unchanged voice hash and mastered -16.11 LUFS / -1.39 dBTP passed. Native opening and evidence sample playback were sampled, and selected decoded frames inspected. Full listening and user creative review remain pending.
