---
name: byteversetoon-video
description: Create, revise, review and publish ByteVerseToon videos and Shorts. Use channel branding, local female narration, 3D glass motion graphics or 2D explainers, HyperFrames or Remotion, and MP4 export. Publish to YouTube or, when requested, the Facebook Page and Instagram through the Microsoft Edge extension. Always plan and ask before cleanup.
---

# ByteVerseToon Video

## Portable repository edition

Resolve `${BVT_WORKSPACE}` to `BVT_WORKSPACE` or the workspace in
`config/local.json`, never as a literal path. The shared checkout owns the
maintained guides and preferences; the media workspace owns assets, publication
records, runtimes and episode sources. Read shared guides from this checkout
when they are absent in the media workspace. Historical absolute paths in
references are provenance only. Resolve this PC tools before invoking them.
The portable narration helper is `scripts/neural_speech.py` in this checkout;
set `BVT_VOICE_RUNTIME` before using it. No installed global skill was replaced.


## Current channel workflow (2026-11-02)

Use free local tools and the actual ByteVerseToon identity. The published mind-reading Short established an additional phone/interface explainer option; it did not replace every cartoon, make every video 67 seconds, or make burned-in captions mandatory. User instructions for the current video override defaults.

Read the local project `production/brand-theme.json`, `production/quality-profile.json`, and shared `${BVT_WORKSPACE}/shared/preferences.json` and `${BVT_WORKSPACE}/shared/published.json` before production. The project on this PC is `${BVT_WORKSPACE}`.

## Brand and production defaults

- Channel: **ByteVerseToon**, **@ByteVerseToon**, https://www.youtube.com/@ByteVerseToon. Do not carry another channel's name or ending over from a reference.
- Palette: dark navy `#050b20`, electric blue `#1269e8`, cyan `#27dcef`, lime green `#a6f51c`, cool white `#f4fbff`. Use cyan lighting and lime emphasis with legible contrast. The saved channel theme supersedes older mint/violet and black/gold defaults unless the user requests an exception.
- Actual avatar: `production/assets/brand/byteversetoon-profile.jpg`. Use it in the subscribe ending rather than recreating the robot or substituting a letter B. Preserve this shared source asset during cleanup. Channel artwork is branding, not a rigged character asset.
- Voice: local Kokoro **af_heart**, **en-us**, speed **0.98**. Read [voice-setup.md](voice-setup.md) when generating narration or resolving setup failures. Never silently substitute Windows speech or a paid service. Spoken "Byte Verse Toon" may improve pronunciation; on-screen text uses ByteVerseToon.
- Language versions: English Heart (`af_heart`) stays the default for Shorts and regular videos. Only when the user explicitly requests a Bangla version, use approved female Bangladesh Nabanita (`bn-BD-NabanitaNeural`) through Microsoft online neural TTS; retain the English version. See [voice-setup.md](voice-setup.md). This preference does not authorize automatic Bangla duplicates or publication.
- Shorts: independently composed 9:16, normally **1080 x 1920 at 30 fps**. Regular videos: independently composed 16:9, normally 1920 x 1080. Fit scenes to measured speech, not identical five-second slots. Follow the requested duration; otherwise choose a concise length that explains the question naturally. Do not stretch speech or pad scenes merely to hit a target.
- Captions are configurable per brief. Preserve the earlier no-burned-caption default when unspecified; provide optional separate SRT. When the user asks for on-screen captions, burn in short readable phrases with safe margins, without a heavy bottom bar. Record the actual mode in the storyboard and verification. Approximate phrase timing is not word-level alignment.
- Use subtle original or licensed music, clear speech, and action-synchronized sound effects. No paid generators, credits, subscriptions, free trials, cloud rendering, paid assets or external API keys are required.

## Glassmorphism visual treatment

Use [glassmorphism.md](glassmorphism.md) for the user's preferred navy/cyan glass surfaces in phone/interface explainers and system-design diagrams, for both regular videos and Shorts. Use the user-supplied Message Queues Episode 5 pair as the primary visual reference: translucent rounded robots, glossy device/diagram cards, cool-white edge highlights and teal/violet lighting on navy. Preserve sharp text and causal graphics; retain channel colors and meaningful state accents. Keep the existing cartoon mode available. The project `production/glassmorphism-style.md` mirrors this reference; `production/brand-theme.json` stores the starting material tokens. Verify native or simulated frost in the decoded export and record a glass-inspired fallback honestly.

## Approved 3D motion direction (2026-11-02)

For technology Shorts matching the approved AI explainer direction, prefer [3d-motion-graphics.md](3d-motion-graphics.md): real 3D glass surfaces, a flowing phone-to-chip-to-server camera journey and active isometric mechanisms when they explain a step. The user explicitly approved these looks; do not substitute slide-like layouts or repeat a sample loop for an entire script. Keep other modes available and let the current brief override defaults. This prop-based motion route does not require new character approval.

## Motion framework and reference-style direction

Read [motion-frameworks.md](motion-frameworks.md) for reference-style phone explainers or Remotion/HyperFrames work, and the project `production/workflow.md` for the maintained production route. HyperFrames is preferred for the current phone/interface direction; Remotion is available for custom frame-driven scenes, and a hybrid is supported when each tool has a concrete role. The two frameworks are not fixed visual styles. Use the existing cartoon route when suited to the story.

For the requested reference-style mode, use meaningful phone interactions, progressive causal diagrams, varied framing, concise highlighted phrase captions, measured female narration, and restrained action sound. Preserve no-burned-caption defaults for other modes unless requested. Do not copy the reference creator's branding or infer a full listening review from visual inspection.

## Select the visual mode

- **2D character cartoon:** retain the preferred character-led option for stories, experiments, reactions and prop interaction. Read [cartoon-production.md](cartoon-production.md). Adapt artwork and framing to the topic; do not change only the narration of the Wi-Fi example.
- **Phone/interface explainer:** use when the brief calls for animated phones, feeds, apps, data flow, rankings or simple diagrams. Read [phone-interface-production.md](phone-interface-production.md). This is an authored 2D motion workflow with depth-inspired lighting and mockups; do not describe it as rigged or photorealistic 3D. No 3D character approval stages are required for this mode.
- **3D prop/motion graphics:** use the approved [3d-motion-graphics.md](3d-motion-graphics.md) route for spatial technology explanations. Preserve glassmorphism and animate the causal mechanism.
- **Actual 3D character animation:** use only for an explicit request, with [3d-production.md](3d-production.md). The rejected USB-C pilot was removed; do not resume or reconstruct it. Verify modeling/rendering capability and follow applicable look/acting review stages without repeating approvals already recorded.

## Produce and review

1. Verify technical claims using current primary sources. Record which source supports each claim. Clearly identify analogies, illustrative UI, and fictional examples; do not imply a particular signal certainly caused a particular recommendation. Inspect supplied references when accessible, and state limits rather than claiming a full viewing/listening review.
2. Write an original hook within the first three seconds, a relatable example, causal steps, and a brief payoff and subscribe invitation. Record narration, scene purpose, visual actions, framing, sound cues, transitions and source links. Clarify only real missing inputs or conflicting branding that cannot be resolved from context.
3. Discover installed runtimes with `load_workspace_dependencies`. Use a fresh episode folder; preserve finished videos. Generate narration with the approved voice and derive scene timing from the WAV files. Adapt the chosen visuals, palette, avatar and caption mode before rendering previews.
4. Inspect the opening and a representative interaction in motion, plus preview frames at mobile size. Correct misleading symbols, clipped text and unexplained decorative motion. Animate the mechanism: swipes, progress, ranking, signal flow or physical interaction must correspond to the narration.
5. Export a real H.264/AAC MP4. Prefer deterministic frame export and FFmpeg where available. Keep the final subscribe scene through any padded timeline tail; never fall back to the opening. Decode the entire export, check duration/dimensions/frame count, narration fit, audio presence and levels, captions and final frame. `verification.json` success confirms technical checks only.
6. Review facts, story/pacing, visual explanation, composition, thumbnail readability, applicable character interaction, and listening separately. Listen to the full final export when supported. Otherwise leave full listening review explicitly pending; audio meters and non-silence are not a listening review.
7. Deliver the actual `video.mp4`, `cover.png` or `thumbnail.png`, optional `captions.srt`, and `youtube.txt`, with relevant limits. Keep the storyboard, source links and verification. Do not claim a finished video if only a storyboard or still exists.

## Publishing when requested

For Facebook or Instagram publishing, read [social-publishing-edge.md](social-publishing-edge.md). The user's preferred route is the signed-in Microsoft Edge browser extension; Instagram uses vertical 9:16 framing. A request to publish to both services authorizes those destinations, without a second routine confirmation.

Creating a video does not authorize publishing. An explicit request such as "publish" authorizes publishing the current reviewed version to ByteVerseToon; do not ask again merely to reconfirm that request. Follow applicable tool confirmation requirements if a specific action requires them.

Use the user-preferred signed-in Microsoft Edge extension for YouTube, Facebook and Instagram when publishing this channel. Read [social-publishing-edge.md](social-publishing-edge.md) and verify each requested destination. Verify the destination channel before uploading, select the current channel-themed file, set the prepared title/description and thumbnail where supported, and review audience, language, sponsorship and AI-use disclosures accurately against the actual content and current platform questions. Do not infer "made for kids" from animation alone. Preserve unrelated channel settings and schedules.

Check processing/copyright status, publish with the requested visibility, and wait for an authoritative success message. Save the public URL, video ID, actual date, source version, settings and publication confirmation. Never claim success merely because Publish was clicked. Do not post comments or share to other services without authorization. Save publication history before cleanup so the topic is not repeated accidentally.

## Cleanup after publication

Always ask the user before cleanup. Publication confirmation, a shared published URL or a general request such as "clean all unwanted things" starts planning only; it does not bypass the user's separate confirmation requirement. This rule also covers disposable test media, caches and installation leftovers. Approval for an earlier cleanup does not authorize a future cleanup.

1. Match the topic/version to its publication record. Prepare a read-only plan with exact folders and an enumerated file list, file categories/counts, estimated storage savings and the items to preserve. Explain that local download links to removed media will stop working.
2. Show a concise summary and ask whether to delete the listed files. Wait for explicit approval of that current plan. No reply or elapsed time is not approval. If the plan expands beyond the approved scope, ask again before deleting the additional files.
3. Only after approval, verify resolved paths stay inside the planned episode or temporary-production folders and delete the approved generated media: superseded exports, narration WAVs, mixes, disposable frames/previews and approved test/cache/staging leftovers. Never delete the online video. Record actual removed filenames and bytes freed.

The workspace cleanup script defaults to planning. Use its deletion switches only after the user has approved the current plan; a tool's ability to delete is not approval. Never run a legacy cleanup helper to bypass confirmation.

Keep scripts and authored animation sources, storyboard, captions, sources, upload text, technical/creative verification, publication record and a small confirmation screenshot. Preserve supplied originals, shared channel avatar, voice models, render tools, installed skills, unrelated videos, videos awaiting review, pending thumbnails, rollback backups and all scheduling configuration. Record removed filenames and total bytes; tell the user local download links to removed files will stop working.

On this PC, append the publication record to `${BVT_WORKSPACE}/shared/published.json`, preserving existing entries. Historical paths from another PC are provenance, not deletion targets. This skill does not create background jobs, new chats, delegate work or change automation schedules merely because production or cleanup was requested.
