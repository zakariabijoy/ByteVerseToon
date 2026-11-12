# Episode 01 animated review render — version 2

User-approved Bangla story and supplied final voiceover. Source voiceover is
92.96 s, unaltered; composition is 2789 frames / 30 fps (92.9667 s). Last frame
holds the closing scene. No speech replacement or time stretching.

## Preview

Use Node 24.22.1 and the exact dependency lockfile. Run `npm ci` on a new PC;
this PC reuses the existing 4.0.539 Remotion dependency tree via an ignored
node_modules junction. Existing episode dependencies have not been upgraded.

Restore the declared assets into ignored `public/` using `scripts/Restore-Media.ps1`.
The source recordings, generated artwork, avatar and soundtracks stay out of Git.
This PC's ignored public junction points to the local episode asset folder.

```powershell
node --require ./scripts/loopback-only.cjs node_modules/@remotion/cli/remotion-cli.js studio src/index.tsx --no-open --port=3110
```

Open http://127.0.0.1:3110/Episode01. The loopback launcher restricts every
listening socket to 127.0.0.1; Remotion's printed Network URL is not accessible.
Use the locally installed Nirmala UI font for Bengali. No proprietary font is
bundled; another PC must have a suitable Bengali font installed.

## Version 2 treatment and review limits

- Nine editable scenes, warm illustrated Dhaka office/corridor/rooftop settings.
- Four recurring characters based on user-supplied series reference sheets.
- Separate torso, upper-arm, forearm/hand and talking-head artwork. Two-joint
  arm gestures, eye blinks, listener reactions, breathing, head motion and shot
  changes supplement the four-pose atlases. Rafi's workstation has hand contact.
- Local Whisper cross-attention forced alignment of the approved text over
  25 curated speech chunks supplies 210 word intervals. Approximate mouth shapes
  use Bengali graphemes and recording amplitude only during quoted dialogue.
  These are not verified phoneme-level lip-sync timings.
- Selected dialogue overlays are burned in. A separate complete Bengali SRT
  accompanies the export; punctuation and wording retain the supplied script.
- Original stereo score, room tone, keyboard taps and transition/prop cues.
  The NumPy generator uses no external music samples; music follows voice energy.
- The approved recording is preserved exactly. Complete listening/creative
  approval remains pending. No publication is authorized.
- H.264/AAC MP4 and PNG cover are rendered locally. Delivery uses limited-range
  yuv420p H.264 and two-pass audio mastering toward -16 LUFS / -1 dBTP. Technical results
  are recorded separately from user creative approval.

## Export

Use a fresh version directory; the scripts refuse to overwrite existing exports.

```powershell
node scripts/render_episode.cjs <absolute-output-directory> <unique-bundle-tag>
python scripts/master_audio.py <absolute-ffmpeg-path> <absolute-output-directory>
```

The export contains `video.mp4`, preserved `video-unmastered.mp4`, `cover.png`,
`captions.bn.srt`, render metadata, mastering measurements and verification.
Media and generated output stay outside Git. `media-manifest.json` declares the
16 local assets, including retained version 1 soundtracks. Nothing is deleted.

## Optional local alignment regeneration

Rendering uses committed timing data and needs no transcription model. To
regenerate alignment, install the exact `requirements-transcription.lock.txt`
in an isolated tools directory and place pinned model files under its `models/`
folder. The original machine keeps compatible PyAV 15.1.0 in `compat-av/` ahead
of `python/` on the search path. All paths are command-line arguments.
Model provenance is in `transcription-provenance.json`; no recording is uploaded.
`transcribe_local.py` produces diagnostic ASR only; its imperfect output never
replaces the approved text. The final pipeline is `align_recording.py`,
`canonicalize_alignment.py`, then `make_captions.py`. The first accepts named
arguments; the latter scripts run from the animation directory using committed
timing data (the caption script takes the output SRT path as its first argument).

## Local checks

```powershell
node node_modules/typescript/bin/tsc --noEmit
python scripts/analyze_voice.py public/voiceover-original.wav src/voice-envelope.json
node scripts/inspect-frames.cjs qa-new-version
```

The still inspector makes a fresh versioned bundle and eight local half-size QA
PNGs without deleting earlier outputs. Do not remove caches or generated media
without the separate exact-file cleanup plan and user approval.
