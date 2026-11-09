# Episode 01 review state

User direction (2026-11-09): do not publish this video. Preserve it as the design pilot. New episodes follow story draft -> user review/revisions and explicit final story approval -> user supplies voiceover -> animation -> user video review. Do not generate narration or automatically reuse the pilot recording for changed stories.

## Available previews
- Episode01-Animatic: 1080 × 1920, 30 fps, exactly 1800 frames / 60 seconds.
- Umbrella-Lookdev-10s: the same umbrella shot used in the film, 300 frames / 10 seconds.
- Storyboard-Shots folder: eight independently registered, editable shots.

## Narration
User-supplied complete recording: Cartesia Ananya, sonic-3.6-2026-08-27 (from filename).
Measured source duration 46.4 seconds; mono PCM, 44.1 kHz, 16-bit. Peak -0.8 dBFS, no full-scale clipped samples. This measurement does not assess pronunciation or performance quality.

Original audio is preserved under public/audio/E01-Ananya-original.wav. Eight derived clips cut at detected pauses retain the source PCM samples and playback rate 1. About 13.6 seconds of space is distributed between scenes for reactions and visual action. Clip/paragraph correspondence is a draft based on pauses and needs listening review; no forced-alignment transcription was performed. The original recording can be restored at any time.

## Visual status
ByteVerseToon adaptation (2026-11-09): navy/cyan/lime channel mark, verified real channel avatar and a held subscribe ending; Bengali cast styling is retained throughout. Source and instructions are prepared for cross-PC GitHub handoff; recordings and avatar use a separate checksum-verified media bundle. See CONTINUE-ON-ANOTHER-PC.md.

All geometry is true 3D, with reusable procedural characters, soft matte materials, shadows, a segmented umbrella and deterministic rain. These are stylized maquettes for animation development, not final sculpted / skinned characters. The 10-second scene has extra acting keys for anticipation, gaze, grip, handoff, release and a held reaction. Other shots establish the edit and rough staging. Preserve the character palette and proportions across episodes.

Temporary synthesized rain ambience is included quietly under narration. No final score, Foley recording, lip sync, or final character rig is included. No MP4 has been exported. Review composition, pacing and the umbrella scene before extending its finish across the remaining film.

## Series reuse
Character components and palette: src/film/Characters.tsx and primitives.tsx.
World / cart / rain: src/film/World.tsx.
Camera / narration helpers: src/film/Stage.tsx.
Each shot is authored separately in src/scenes; master edit and registrations are in src/Root.tsx.

Next episode should keep the narrator identity, character proportions, outfit and tone while changing the dilemma and consequence. Do not repeat the exact umbrella rescue or assume kindness always produces a reward.

## Verification performed
TypeScript and ESLint pass. All eight standalone shot compositions rendered to PNG successfully. A contact sheet is at out/storyboard-review.jpg; the representative umbrella frame is at out/umbrella-review.png. Studio playback observed at approximately 30 fps with the narration waveform visible. Both master and 10-second composition load. Studio is left paused on the handoff frame for review. No video has been exported.

## ByteVerseToon handoff verification — 2026-11-09
The updated skill passes its validator. A fresh isolated npm ci from the lockfile succeeded (359 packages). The separate two-asset ZIP restored successfully with SHA-256 checks, and the Node-only audio helper rebuilt all eight clips. TypeScript, lint and media checks pass in the handoff copy. All eight branded shot stills rendered with installed Chrome, including the actual channel avatar and held ending; Edge headless failed on this PC. This is not a full listening or creative approval. The source and workflow are prepared for a Git commit; remote delivery remains pending authentication until a verified push succeeds.
