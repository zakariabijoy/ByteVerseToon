# Episode 01 animation preview

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

## Treatment and review limits

- Nine editable scenes, warm illustrated Dhaka office/corridor/rooftop settings.
- Four recurring characters based on user-supplied series reference sheets.
- Four-pose transparent character atlases; limited cutout performance with
  expression/gesture changes, head nods, breathing and changing camera crops.
  This is not full skeletal animation or phoneme-aligned lip sync.
- Selected Bengali dialogue overlays, not a complete subtitle transcript.
  Phrasing and scene boundaries are estimated from script and detected pauses;
  dialogue synchronization needs a listening review. No word-level ASR claim.
- Original quiet synthesized tonal underscore and transition cues. See the
  reproducible standard-library soundtrack generator; no external music samples.
- The approved recording is preserved exactly. Complete listening/creative
  approval remains pending. No publication is authorized.
- This deliverable is an interactive preview. No final MP4 has been exported.

## Local checks

```powershell
node node_modules/typescript/bin/tsc --noEmit
python scripts/analyze_voice.py public/voiceover-original.wav src/voice-envelope.json
node scripts/inspect-frames.cjs qa-new-version
```

The still inspector makes a fresh versioned bundle and eight local half-size QA
PNGs without deleting earlier outputs. Do not remove caches or generated media
without the separate exact-file cleanup plan and user approval.
