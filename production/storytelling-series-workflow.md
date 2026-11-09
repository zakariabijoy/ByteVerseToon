# ByteVerseToon storytelling series workflow

## Scope and continuity

Named series supplement the existing technology routes. Choose the series from `series/<slug>/series.json`; read its bible before production. The current `nilas-little-world` series is user-requested Bangla storytelling for teens/adults, colorful 3D, Bengali character styling and a warm emotional tone. The supplied Ananya recording is a series-level choice, not a change to the channel's English Heart default or authorization for paid TTS.

Start with a short original outline, visual guide, character reference requirements and storyboard with emotional purpose, framing, action, sound and timing. Assemble the animatic around measured narration. Develop a representative acting scene before extending finish when the user asks for staged review. The Nila sources already contain a 60-second animatic and a 10-second umbrella scene; continue them instead of making another starter. Record maquette/final-model status honestly.

Use ByteVerseToon wordmark, actual avatar, navy/cyan/lime brand treatment and a held ending. Story settings/wardrobes retain the selected series colors. Keep no-burned-caption default unless the brief changes. Prepared YouTube metadata must identify fictional stories accurately and preserve audience review; animation alone does not decide platform audience settings. Syncing code never publishes a video.

## Portable layout

- `series/<slug>/series.json`: audience, language, voice input, visual identity, status, episode index.
- `series/<slug>/SERIES-BIBLE.md`: recurring cast, props, tone, story variety and continuity.
- `series/<slug>/episodes/<id>/`: curated authored code, exact package versions/lockfile, scripts, production documents and metadata.
- Episode `production/media-manifest.json`: required source assets, SHA-256, size and target paths.
- Separate `nila-e01-media.zip`: episode 01 original narration and verified avatar only. Exclude credentials, personal files, tools and generated previews. Do not put this ZIP or its contents into Git.

The episode's `CONTINUE-ON-ANOTHER-PC.md` has the actual commands. After source checkout and media restore, run `npm ci`, `npm run prepare-media`, `npm run check`, and `npm run studio`. A source-only clone is deliberately incomplete until its media bundle is restored. Package and restore scripts verify assets; they refuse to replace differing files. Keep the user-supplied original. The current Node helper cuts clips and creates temporary rain without Python dependencies.

Resolve browser/media paths from environment or ignored local config. Preserve current dependencies; the Nila project uses Remotion 4.0.541, separately from older 4.0.539 examples. Do not upgrade existing templates to match it. Windows Nirmala UI supplies Bangla glyphs locally; use a licensed equivalent and review shaping on another OS.

## Switching PCs

On the sending PC, run the existing sync script before editing. Inspect the final diff, stage specific authored paths, commit and push. Transfer the separate media ZIP using the user's approved file route or GitHub attachment when separately appropriate. Do not claim the media was uploaded if only source was pushed. Record delivery location and source commit in the handoff. Do not add recordings to Git just to avoid a media handoff.

On the receiving PC, pull before editing, restore the media bundle, verify hashes and preview. Keep machine-specific config ignored. No whole-home or agent-settings copy is needed; open this repo as the project so its canonical skill is available. A global discovery entry can continue routing to this checkout on its own PC. Never hard-code the sending PC's checkout in the portable skill.

If Git authentication is missing, preserve the prepared commit and ask the user to sign in through the normal GitHub CLI/Git Credential Manager flow. Do not ask for secrets in chat. Resolve divergence deliberately without reset, clean, forced push or automatic stashing. Leave media and unrelated local production untouched.

## Review and delivery

Verify file restore, locked dependency install, TypeScript/lint, scene starts/seams, mobile framing, final held channel ending, actual audio duration and natural playback rate. Render stills for composition checks and inspect acting in motion. Technical checks are not full listening or creative QA. Preserve pending review states. Export H.264/AAC only when within the current requested scope; YouTube publishing and cleanup follow their existing separate authorization rules.
