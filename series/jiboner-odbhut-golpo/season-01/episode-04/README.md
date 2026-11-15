# Episode 04 — যাকে সবাই গরিব ভাবত

The user approved the supplied final recording and asked to begin animation on 2026-11-15. The original words and voice are preserved. The first 3 seconds implement the newly approved direct-conflict opening preference.

The editable Remotion project reuses the approved series cast and intact-pose motion. A new guest teacher is drawn in four intact poses. Tea contact, notebooks and the final connected sleeve/hand-chair cutaway are original SVG staging. Physical contact is illustrated rather than simulated.

This is an animated review preview, not an approved final delivery. See `review-state.json` for exact review scope. Full listening and user review remain separate from decode checks. Publishing and cleanup require their own explicit instructions.

## Local reproduction

Restore the allowlisted assets in `media-manifest.json` to `${BVT_WORKSPACE}/production/storytelling/jiboner-odbhut-golpo/season-01/episode-04/assets`. Connect ignored `animation/public` to those assets and restore exact pinned dependencies using `animation/package-lock.json`. Git does not contain recordings, images, runtime weights, preview exports or browser data.

From `animation/`: prepare_episode.py -> analyze_voice.py -> align_recording.py -> canonicalize_alignment.py -> make_captions.py -> make_soundtrack.py. Existing local pinned transcription weights are required; see transcription-provenance.json. Use `node --require ./scripts/loopback-only.cjs node_modules/@remotion/cli/remotion-cli.js studio src/index.tsx --no-open --port=3115` for loopback-only preview.

`render_episode.cjs <fresh-output-directory> <fresh-bundle-tag>` generates a review render and cover. The mastering and verification scripts write/check `preview-safe.mp4` for this review stage. Preserve earlier outputs. Guest atlas bounds and mouth coordinates are authored in Scenes.tsx; measured original cast bounds remain in pose-bounds.ts. No detached heads or wrists are reintroduced.

Current preview: `local_episode_04/exports/review-v2/preview-safe.mp4` (69.0667 seconds, 1080×1920 at 30 fps). Complete decode, original voice hash, limited-range video and measured audio checks passed. See technical-verification.json. Superseded local drafts are preserved.
