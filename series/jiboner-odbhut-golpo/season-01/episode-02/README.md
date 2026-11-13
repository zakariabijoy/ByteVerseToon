# Episode 02 — ভালো মানুষ হওয়াটাই কি ভুল?

The user explicitly approved the supplied final recording and animation on
2026-11-13 (Asia/Dhaka). This episode adapts the approved boundaries/kindness
story, using the approved Episode 01 V3 continuous illustration deformation.
Episode 01 sources and exports remain intact.

Delivery: portrait 1080×1920, 30 fps, 3197 frames (106.5667 seconds).
The original 106.56-second recording plays at its original speed. The remaining
6.7 ms holds the ending. No replacement narration was synthesized.

The editable Remotion project is in `animation/`. `script.bn.md` preserves the
approved words. `storyboard.md` describes the measured scenes. Selected dialogue
and lesson text are burned in; `captions.bn.srt` contains the full narration as
optional external captions. Lip shapes are approximated from aligned words and
audio energy, not verified phoneme or performance capture.

## Media and restoration

Media is local-only under `${BVT_WORKSPACE}/production/storytelling/
jiboner-odbhut-golpo/season-01/episode-02/assets`. Consult `media-manifest.json`.
Restore the exact assets separately from Git, then point the ignored
`animation/public` junction at that episode's assets. Restore dependencies from
the exact lockfile, or connect an existing matching local installation.
Neither media nor a dependency junction is restored by Git pull.

New raster assets are Karim Chacha's transparent four-pose atlas and a dusk tea
stall, generated against the approved series reference. Prompts are recorded in
`asset-prompts.json`. Office, Rafi, Sajid, manager, typing illustration and actual
channel avatar are reused unchanged. Music and Foley are original local
synthesis from `scripts/make_soundtrack.py`; no stock samples or paid service.

## Local production

From `animation/`, use a compatible installed Node executable:

```powershell
node node_modules/typescript/bin/tsc --noEmit
node scripts/inspect-frames.cjs review-new Episode02 80,660,1650,2140,2660,3100
node scripts/render_episode.cjs <new-export-directory> <new-bundle-tag>
python scripts/master_audio.py <ffmpeg> <new-export-directory>
python scripts/verify_export.py <ffmpeg> <ffprobe> <new-export-directory> public/voiceover-original.wav
```

The renderer uses loopback-only serving. Keep existing exports; use a new
directory for revisions. Source timing records are committed; local alignment
diagnostics/model weights are not. To regenerate timing, `align_recording.py`
accepts short approved-text chunks, followed by `canonicalize_alignment.py` and
`make_captions.py`. `finalize_alignment.py` merges the local initial/refined
alignment diagnostics used for this version. Never substitute raw ASR text for
the approved script.

`exports/v1/video.mp4` is the local review delivery, accompanied by `cover.png`,
mastering measurements, decoded mobile frames and technical verification.
Technical validation does not establish full listening or creative approval;
their actual status is recorded in `review-state.json`.

No Episode 02 publication is authorized yet. `youtube.txt` is prepared copy only.
Cleanup requires a separate exact-file plan and user approval.
