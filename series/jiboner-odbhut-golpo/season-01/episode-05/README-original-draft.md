# Superseded Episode 05 original-draft workflow

Historical record only; current source and authorization are in README.md.

# Episode 05 — প্রমোশন পেল অন্যজন

The user approved the supplied 84.16-second recording for animation on 2026-11-17. A local ASR check found it follows draft 1 rather than the subsequently revised text. After being told about the discrepancy, the user explicitly selected this recording as final. `recorded-script.bn.txt` and the 29 chunks in `animation/src/recording-segments.json` follow that recording; revision-2 text remains preserved for history. Do not replace words, regenerate speech or time-stretch the recording.

The series uses the Episode 01 intact cast and Episode 04 approved dramatic edit direction. Episode 05 independently authors office staging, a sweet box stopping in Rafi's hand, laptop work, a phone conversation, work-file evidence and a final pen/responsibility-sheet close-up. This is illustrated 2D deformation with SVG prop/contact cutaways, not full skeletal character animation or verified phoneme sync.

The composition is 1080×1920 at 30 fps, 2525 frames (84.1667 seconds). New original local synthesized music/effects use score dips, phone/key/paper contact, selected impacts and a warm resolution. Bengali captions are aligned to canonical recording text, with selective large contrast blocks. Do not copy this cue schedule into later episodes.

## Local setup and review

Restore only `media-manifest.json` assets under `${BVT_WORKSPACE}/production/storytelling/jiboner-odbhut-golpo/season-01/episode-05/assets`. Connect ignored animation/public to that folder; install exact package-lock dependencies on a new PC. This PC reuses existing pinned Remotion 4.0.539 / React 19.2.3 tools through an ignored node_modules junction. Original recordings, artwork, exports and runtime models stay outside Git.

Scripts: analyze_voice.py -> align_recording.py -> canonicalize_alignment.py -> make_captions.py -> make_episode_audio.py. Local pinned Whisper turbo is declared in transcription-provenance.json. Never download or substitute a different narrator. The sound generator preserves existing stems rather than overwriting them. Stage/Puppet preserve measured pose bounds and continuous neck/arm surfaces.

For preview use Node with `--require ./scripts/loopback-only.cjs node_modules/@remotion/cli/remotion-cli.js studio src/index.tsx --no-open --port=3119`. `render_review.cjs <fresh-output-directory> <bundle-tag> 1` exports a review and cover; then master_audio.py and verify_export.py check the current Episode 05 duration and original voice hash. The initial fractional-scale export was incompatible with renderer dimension rounding; it is preserved locally and superseded by the full-resolution review-v1b export. Do not silently mark that failed attempt successful.

Full listening, user creative review and publication are distinct from technical checks. Return the animated current preview for user review before final delivery. No publishing or cleanup has been requested. Episode 05 GitHub synchronization remains pending: an earlier automatic approval review rejected pushing the new draft to main without explicit permission. Preserve these local sources and do not bypass that rejection.

Current review: review-v2-sound (1080×1920, 84.1667 seconds). The user reported the first sound effects might be missing. The new mix uses clear-effects-v2.wav with brighter action transients instead of merely raising bass pulses. remix_review.py copies the verified H264 stream intact and mixes original narration, score and effects; identical video-stream hashes were checked. Full decode/source-voice hash/loudness checks passed at -16.12 LUFS / -1.38 dBTP. Native sample playback is checked separately; full listening and creative approval remain pending. No publication requested.
