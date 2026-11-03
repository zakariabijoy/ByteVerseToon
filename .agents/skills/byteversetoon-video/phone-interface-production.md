# Phone/interface explainers

This mode was used for the published Short https://www.youtube.com/shorts/eUFFjWhUgEQ. The retained source project is `videos/2026-10-29-mind-reading-channel-theme` inside the local ByteVerseToon workspace. Its generated video/audio/previews were cleaned after publication; missing media is expected. Do not promise that it can be replayed locally without regenerating the media.

## Current framework route

For new reference-style productions, read [motion-frameworks.md](motion-frameworks.md) and project `production/workflow.md`. HyperFrames, Remotion and hybrid native projects supplement the retained canvas exporter below; they do not need to expose `window.draw` or `#c`. The canvas contract applies only when using that exporter. Reference-style caption defaults are mode-specific; retain optional captions for other briefs.

## Retained canvas workflow

Read `production/phone-interface-workflow.md` for the project contract and export commands. The reusable exporter is `production/scripts/render-explainer.cjs`. The topic-specific source is retained as an adaptation reference, not a universal artwork generator. New topics need new scene actions, labels and mechanisms; replacing narration alone is insufficient.

- Stage a fresh `videos/<date>-<topic>` directory with authored `film.html`, measured `timeline.json`, full-length `mix.wav`, and relevant source assets. Use the shared avatar fallback when no episode `profile.jpg` is present.
- The HTML exposes `window.ready` (a promise or ready flag), `window.draw(seconds)` (deterministic), and a canvas `#c`. Draw at the timeline's final render dimensions. Keep the final scene selected through the timeline end.
- Default final render is 1080 x 1920 at 30 fps. Place key visuals/captions approximately within x=90..920 and y=180..1600; check the actual composition and platform overlays at mobile size. Do not assume these margins prove readability.
- Use navy backgrounds, cyan/blue lighting, lime accents, cool-white text and the actual channel avatar. Vary framing and interactions; avoid long static text panels. Decorative particles alone do not explain a mechanism.
- Store `burnedInCaptions` as an explicit boolean. Caption drawing must obey it; SRT can be delivered separately either way. Keep phrase captions concise and distinguish approximate phrase timing from forced alignment.
- Generate af_heart narration locally, measure WAV durations, and mix the narration well above music/effects. Do not regenerate speech unnecessarily for a palette-only revision. Current free runtime setup is in voice-setup.md.
- Run preview, inspect motion and mobile composition, then export. Inspect decoded samples and the exact last frame; review audio as available. Export reports do not establish creative or listening approval.

The exporter validates narration/caption bounds, rejects an existing final video rather than silently overwriting it, writes deterministic H.264 frames, mixes AAC audio with normalization, and fully decodes the result. Its `verification.json` leaves factual, visual and listening review pending. For a revision, use a fresh output project/version.

## What this mode is not

Dimensional phone mockups are not a validated rigged 3D character pipeline. The last Short's 67-second runtime, headphone example and burned-in captions are episode choices, not fixed channel requirements. Publishing uses the authorization boundaries in SKILL.md. Every cleanup requires a file plan, an explicit question to the user, and approval of that current plan before deletion, including disposable diagnostic media.
