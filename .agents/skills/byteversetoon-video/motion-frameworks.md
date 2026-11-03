# Motion frameworks and reference-style explainers

Updated 2026-10-30. The user selected the direction of https://www.youtube.com/shorts/awdfQCKs67Y and https://www.youtube.com/shorts/er4bN1m0Yic. Openings and several later visual scenes were inspected, not full audio. Use their progressive explanations and phone interactions as principles, with original scripts/assets and ByteVerseToon colors, avatar and English female narration. Neither their gold palette nor runtime is a channel requirement.

## Route by task

- HyperFrames: preferred for current phone/interface motion explainers, progressively revealed cards/connectors, phrase captions and master assembly. Load its current installed skills; keep editable scene files and paused registered timelines.
- Remotion: custom frame-driven phone/character interactions, reusable React scenes and data-driven timelines. Load its installed skills; keep frame/fps-driven deterministic animation and open Studio during authoring.
- Hybrid: render selected Remotion scenes as silent local H.264 clips (or a supported transparent format only when needed) and place them on a HyperFrames master. One framework owns each scene; one master owns the soundtrack and captions. Match dimensions/fps and frame-boundary timing, keep an ownership manifest, test that imported clips decode and seek correctly, and review every seam. Do not build a second implementation merely to claim both tools were used.
- Existing canvas/cartoon routes remain supported; no blanket migration or 3D conversion.

## Direct the scene

Build a concrete example with a hook, visible action, mechanism, tradeoff and payoff. Show a tap changing a setting, a device responding, and a diagram growing when the explanation needs it. Shift framing around causal beats; avoid a mostly static phone or changing narration over unrelated animations. Use short labels, controlled emphasis, depth-inspired lighting and only motion that directs attention or explains.

Reference-style phone explainers use mobile-safe short phrase captions with selective lime emphasis and a separate SRT. Timing can be measured phrase timing; describe it honestly. Other modes retain earlier optional-caption defaults. No heavy caption bar. Keep important content away from the Shorts right rail and lower metadata area, and inspect the actual 360 px view.

## Production and handoff

The maintained project workflow is `production/workflow.md`. Read `production/brand-theme.json`, `quality-profile.json` and shared preferences/history. Stage a fresh episode folder; record claim sources, storyboard, measured narration timeline, caption mode, music/effects and ownership. Generate af_heart locally at 0.98. Use local versions already pinned when suitable, no paid tools or cloud rendering. For a sample/view request deliver previews; for a complete Short request proceed to MP4 without adding an approval gate already covered by the request.

Run native checks, inspect mobile frames and representative motion, then export H.264/AAC, cover, SRT and YouTube metadata. Fully decode the final export and inspect its opening, seams, payoff and last frame. Check actual voice/music balance numerically but leave full listening pending unless heard. Preserve authored scene sources and project manifests. Publishing and cleanup follow SKILL.md; framework helpers must not bypass those rules.


## Glass surface treatment

Read [glassmorphism.md](glassmorphism.md) for the saved channel material direction. Match navy translucent fills, frost, cyan edges, soft depth and lime state emphasis across HyperFrames and Remotion; keep text and diagrams sharp. Review decoded export appearance and seams. Match the user-supplied Message Queues Episode 5 regular/Short pair, including glass robot bodies and teal/violet lighting. The published pixels establish the look, not the underlying blur implementation; the older CDN pair is a secondary reference.

## Approved 3D glass motion route

Read [3d-motion-graphics.md](3d-motion-graphics.md) for the November 2 approved prop-based 3D workflow. Remotion + Three.js / React Three Fiber owns real 3D camera flow and geometry; use active isometric machinery as complementary explanation shots. Keep glassmorphism throughout. This is a separate preferred route for suitable technology Shorts, not a mandate to replace every existing mode or to use both video frameworks.
