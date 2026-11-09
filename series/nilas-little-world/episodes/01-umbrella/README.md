# ByteVerseToon — নীলার ছোট্ট পৃথিবী — Episode 01

**Design pilot only — do not publish.** The user will review each new episode story, approve revisions, and supply its voiceover before animation. Existing composition IDs are retained for source compatibility; they do not make this pilot an approved episode release.

60-second vertical 3D storytelling animatic with the supplied Ananya Bangla narration, plus a separate 10-second umbrella scene for review.

For another PC, start with [CONTINUE-ON-ANOTHER-PC.md](CONTINUE-ON-ANOTHER-PC.md): restore the separate media bundle, use `npm ci`, then run `npm run prepare-media` and `npm run check`. Run `npm run studio` to open Remotion Studio. Select `Episode01-Animatic` for the whole edit or `Umbrella-Lookdev-10s` for the representative scene. No video export is required to review them.

Production documents:
- `production/DIRECTORS-PACKET.md`: outline, style, character references, 8-shot storyboard.
- `production/CARTESIA-RECORDING-SCRIPT.md`: Bangla script, timings, emotion directions and continuity notes.
- `production/REVIEW-NOTES.md`: current scope, audio measurements and review limitations.
- `production/audio-edit.json`: source audio cuts and timeline slots.

`npm run prepare-media` rebuilds editable WAV clips using Node alone. The older Python/numpy helper is retained for provenance but is not the setup route. `npm run check` verifies media, TypeScript and lint. `npm run review:stills` creates storyboard review stills using a locally resolved browser. `scripts/Pack-Media.ps1` packages only the manifest's approved original assets, separate from Git.

The characters are reusable procedural 3D maquettes. Other shots remain animatic staging; review the umbrella scene before commissioning final models or extending the finish. Narration cuts follow detected silences and need listening review for exact word-to-shot alignment.
