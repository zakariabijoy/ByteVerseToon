# Character cartoon production

Use this mode for character goals, problems, experiments and payoffs. Keep the approved Kokoro af_heart female voice at speed 0.98 and apply the current channel palette and actual branding from SKILL.md. Earlier Wi-Fi and phone-heat cartoons remain useful style references. The phone/interface mode is a separate valid option, described in phone-interface-production.md.

Animate expression, body/limbs, purposeful motion, props and camera composition. Do not substitute static illustrations between title cards. Keep short labels on props or brief story bubbles. Default to no burned-in subtitles and optional separate SRT when the brief is silent; an explicit request for on-screen captions overrides that default. Do not add a heavy bottom bar.

The legacy installed skill may contain `assets/cartoon.html`, `assets/cartoon-storyboard.json` and `scripts/render-cartoon.cjs`; they are not bundled in this repository. Discover and inspect that installation before choosing this route. If absent, use a verified local Remotion/HyperFrames project instead and report the choice. The legacy assets are a topic-specific Wi-Fi example featuring the proposed robot Byte, not the supplied channel avatar. Extend a working copy for each topic and apply current branding; do not use the Wi-Fi story for unrelated topics or repeat published topics without a request.

`scripts/render-cartoon.cjs STORYBOARD_JSON NEW_OUTPUT_DIRECTORY [--template HTML_FILE] [--preview-only]` is the retained horizontal 1920 x 1080 example renderer. It expects two narration strings per scene, schedules measured clips, and exports optional SRT, upload text, contact sheet and thumbnail. Its existing source is not automatically upgraded to vertical or burned-caption support by this documentation. Adapt a working copy when those are requested and verify actual output.

Compose 1080 x 1920 Shorts independently; update the canvas, viewport, layout, previews and verification together. Do not stretch, crop or letterbox the horizontal composition and call it a vertical cartoon. Use the requested duration and actual speech timing, not a fixed scene count.

Inspect previews and motion, export, inspect decoded frames, and record full listening review separately. Preserve reusable models, channel assets and authored source during cleanup. If verification blocks a thumbnail, preserve it and report that it was not applied; do not bypass verification.
