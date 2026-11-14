# Tech explainers: approved battery revision 03 style

Approved 2026-11-14. The user called the final battery revision 03 “perfect video” and explicitly asked to reuse its style for other technology topics in regular videos, Reels and Shorts. This is the current starting direction for ByteVerseToon tech explainers unless the current brief chooses another look. It does not change recurring storytelling series, cast, default voices or unrelated cartoon/3D work.

## When and how to reuse it

Use for “same style as the perfect battery video”, technology explainers, animated system explanations and their short-form versions. Keep the visual grammar; author a new explanation. Do not merely replace headings or narration over the battery animation. Do not make every topic a city, every film six minutes, or every script use a phone.

Build a hook, a visible problem, a causal demonstration and a payoff. A long video can investigate several causes; each Short/Reel should answer one clear question. Match scene boundaries, important words and actions to the actual voiceover. Preserve supplied narration and language over voice-generation defaults. This approval is not a request for automatic language duplicates or new narration.

For each narrated point, identify what the viewer will see change and why: request -> work -> response, input -> processing -> output, or action -> resource use -> consequence. Use an analogy only when it explains that mechanism; label illustrative UI and analogies honestly. Adapt content to the topic: a queue receives/completes jobs, packets retry on a connection, a cache hit bypasses a server, or permission changes affect a data path. Avoid implying that the illustrative example proves a real product's internal implementation.

## Look and typography

- Dark navy gradient stage, restrained perspective floor grid, dimensional illustrated devices/icons, layered glass-inspired panels and cyan/blue lighting. These are illustrated depth cues, not proof of actual 3D or native glass blur.
- Palette: navy `#050b20`, electric blue `#1269e8`, cyan `#27dcef`, lime `#a6f51c`, cool white `#f4fbff`. Purple may support depth and state separation. Use white primary headings, lime key emphasis and cyan secondary labels.
- Avoid the red/pink headings and warm-colored large text the user rejected against this background. Reserve warm colors for functional graphic states such as heat, low battery or a failure that actually needs that signal.
- Keep text sharp; subtle glow only. The approved 1080p source reduced emphasis shadow blur from 22px to 4px. Put most depth on objects and panels.
- Keep one active scene heading. A reached heading cue replaces the previous one; a future cue must not erase the current heading. Inspect both sides of every title change.
- Use distinct heading, subject and caption zones. At 1920x1080, the approved reference starts with heading baseline y105, type up to 58px and maximum width 1490px. Its requested caption backing was y924–1024. These are starting measurements, not coordinates to copy into a vertical composition.
- Allow at least 32px clearance at 1080p between external text and a phone body, including glyph overhang, glow and badge backing. Check moving entrance frames, not just settled poses. Text intentionally on the device screen is a separate case.
- Put app-card icons above labels, measure the longest label, and inspect at mobile size. Give external badges their own space; shrink or move the device when necessary rather than pressing text against it.
- In this reference-style mode, use short readable caption phrases with lime emphasis following the spoken word when timing is available; provide a separate SRT. An explicit caption preference overrides this mode default. Never call approximate phrase timing or reused estimated timestamps new word-level forced alignment.

## Responsive visual motion

“Interactive” means a visible animated response in the exported video, not clickable controls. State changes should carry the explanation, rather than ambient particles or an unrelated repeating loop.

The approved city scene demonstrates the principle: traffic moves, most buildings dim when the screen sleeps, a requested service lights its building, energy travels from the station, and completion changes the state. Scheduled jobs rotate so not every app appears permanently active. Abnormal activity isolates one repeated job, increases energy flow and reduces station charge. Essential services remain awake. Reuse this cause-and-effect logic in topic-appropriate objects; the city itself is an example, not a mandatory set.

Use purposeful framing and progressive reveals, and allow a readable hold after an important result. Sync restrained action sounds to requests, state changes, impacts or reveals; keep them under narration. Retain the real ByteVerseToon avatar in the ending. Do not copy another creator's identity.

## Regular videos, Shorts and Reels

| Format | Starting delivery | Composition |
|---|---|---|
| Main YouTube video | 1920x1080, 16:9, 30fps | Wider comparisons and diagrams; duration follows the approved story and measured speech. |
| YouTube Short | 1080x1920, 9:16, 30fps | One question; reorganize the mechanism into a vertical progression with concise labels. |
| Instagram/Facebook Reel | 1080x1920, 9:16, 30fps | Independently composed vertical framing; adapt to requested platform and duration. |

Recompose rather than center-crop or stretch the main film. For vertical scenes, reduce simultaneous side-by-side detail, stack cards or reveal one at a time, and place captions in space left clear by the actual subject and platform controls. Keep important text away from right-side controls and lower metadata; inspect at 360px width. Adapt type, line breaks, object scale and timing to the aspect ratio. Do not reuse the 16:9 caption y-coordinate. Make only the formats the user requests; mentioning platforms does not authorize extra exports or publication.

## Production and full-timeline review

Use existing free local HyperFrames, Remotion or the proven deterministic Canvas/GSAP route as appropriate. Read the selected framework's current skill. Do not rebuild a working scene in two frameworks for its own sake. Record narration, caption and soundtrack ownership; preserve a final ending hold. Canvas sources remain editable code, but their objects are not independently draggable native editor layers.

Check the whole timeline, not just a reported timestamp. Native framework checks cannot see all text/motion inside Canvas. Combine real-font geometry checks for moving text/phone contacts with decoded visual samples throughout the film, detailed affected frames, frames around chapter cuts, and mobile-size review. Every-frame browser metrics were used successfully at 30fps for this reference. The optional native Canvas font parser mismeasured weights 650/750; browser metrics were authoritative. Exempt intentional screen UI from external phone/text collisions. Geometry checks do not prove every graphic is well composed, and a DOM static-stretch warning does not prove a Canvas film is static.

Inspect all produced review sheets; use approximately 2-second visual samples for a comparable long film and denser samples around short or fast actions. Review the mechanism in motion, not only its still poses. Fully decode the final H.264/AAC export and check dimensions, fps, duration, frame count, narration fit, captions, seams and last frame. Keep measured checks, visual sampling, real-time playback and full listening as distinct recorded states. Full listening remains pending unless actually heard.

For visual-only revisions, preserve supplied narration content, speed and sync. Reuse the mastered audio without re-encoding when suitable and verify identity. The reference used the user's supplied Rakib recording; this does not replace the channel's voice defaults. Preserve prior exports and supplied assets. No paid services, installation, publishing, cleanup or scheduling changes follow automatically from style approval.

## Approved source and cross-PC reuse

The stronger visual reference is the user's approved battery revision 03: 362 seconds, 1920x1080, 30fps. A curated authored-code reference and its requirements are retained in [the shared source snapshot](../../../templates/tech-explainer/approved-battery-reference/README.md). It is an example to study and adapt, not a generic ready-made episode.

The original inspiration was https://www.youtube.com/watch?v=-9LkYvTGu4A&t=3s . Only its opening was visually sampled; do not claim a complete viewing or listening review.

Git carries the style instructions, authored reference code and a media manifest. The approved MP4, supplied recording, SFX, font and avatar remain in a separate media workspace; Git pull does not restore them. Resolve any local approved-reference location through ignored `config/local.json`, or locate the retained episode in the active media workspace. Check availability before promising playback. Keep machine paths and recordings out of commits. If the exact media is unavailable, state that limit and use the retained design/source reference; do not silently substitute a different approved film.
