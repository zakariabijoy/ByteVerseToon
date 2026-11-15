# Episode 03 — ১০০ টাকার বন্ধুত্ব

On 2026-11-15 the user explicitly approved the supplied recording as final and
asked to begin animation. The story and original recording are preserved.
This episode uses the approved series cast and Episode 01 V3 continuous-pose
motion, with Karim's approved Episode 02 atlas and tea-stall setting.

Delivery is portrait 1080×1920 at 30 fps: 2516 frames / 83.8667 seconds.
The 83.84-second PCM16 mono 48 kHz source plays at its original speed, followed
by a 26.7 ms final-picture hold. No replacement narration is synthesized.

`animation/` contains the editable Remotion source and exact dependency lock.
`script.bn.md`, `storyboard.md`, full optional `captions.bn.srt`, and
`review-state.json` document the approved words, timing and actual review scope.
Selected direct speech and lesson text are burned in without a bottom bar.
Lip animation uses local reference-text word alignment and audio energy;
grapheme mouth shapes are approximations, not verified phoneme timing.

## Local media

Restore the allowlisted hashes in `media-manifest.json` separately from Git.
The media directory is `${BVT_WORKSPACE}/production/storytelling/
jiboner-odbhut-golpo/season-01/episode-03/assets`. Point ignored
`animation/public` at that directory, and restore pinned dependencies or connect
an existing matching installation through ignored `animation/node_modules`.
A Git pull does not restore media, models, fonts or runtimes.

Rafi, Sajid, Karim, office backgrounds, tea stall, reference lineup and the
actual channel avatar are reused unchanged. No new raster image was generated.
The hands/currency exchange is an original editable SVG cutaway with connected
sleeves and hands, not a scan of real currency or detached atlas limbs.
The tea counter and glasses are code-native props. Original music, paper
rustles, cup sounds and transition swishes are deterministic local synthesis.

## Reproduction

From `animation/`, with compatible installed Node/Python and existing tools:

```powershell
node node_modules/typescript/bin/tsc --noEmit
node scripts/inspect-frames.cjs new-review Episode03 80,510,1220,1455,1860,2110,2430
node scripts/render_episode.cjs <fresh-output-directory> <fresh-bundle-tag>
python scripts/master_audio.py <ffmpeg> <fresh-output-directory>
python scripts/verify_export.py <ffmpeg> <ffprobe> <fresh-output-directory> public/voiceover-original.wav
```

Keep prior outputs; the render/master scripts refuse existing final files.
Local preview servers bind only to 127.0.0.1. The source envelope is regenerated
with `analyze_voice.py`. `align_recording.py` accepts curated approved-text
chunks; `finalize_alignment.py` merges local initial/refined diagnostics before
`make_captions.py`. Canonical wording comes from the approved script, never raw
ASR. Model provenance and exact transcription requirements are recorded.

Local `exports/v1/` contains the actual MP4, cover, mastering measurements,
decoded mobile review frames and technical verification. Full listening and
user creative approval are separate from successful decode/frame inspection.
The user explicitly requested publication on 2026-11-15. Version 1 is published
on YouTube, Facebook and Instagram; public URLs and proof references are in
`publication.json`. Full listening remains pending. Cleanup requires an exact-file
plan and explicit user approval.
