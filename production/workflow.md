# ByteVerseToon production workflow

Updated 2026-11-02: approved flowing real 3D camera animation, isometric glass mechanisms, and Microsoft Edge publication to YouTube, Facebook and Instagram.

## Coverage

Original technology Shorts and regular videos; topic and publication-history checks; primary-source research; scripts and measured female narration; character cartoons and phone/interface explainers; channel artwork and colors; optional captions, music and action sounds; editable previews; H.264/AAC exports; factual, visual, listening and technical review; prepared YouTube metadata; explicitly requested publishing; separately approved cleanup.

## Recurring storytelling series (2026-11-09)

Nila's user-directed order is: one episode story draft -> user review/revisions and explicit final story approval -> user supplies voiceover -> measured storyboard/animation -> user video review. The existing umbrella video remains an unpublished design pilot. Do not synthesize narration or begin a new story's animation before story approval and supplied audio. No release is authorized by approving a script or delivering voiceover.

Named story series also use this repository. Follow [storytelling-series-workflow.md](storytelling-series-workflow.md) and the series manifest/bible. The current Nila series is explicitly requested in Bangla, with Bengali character styling, colorful actual 3D, and user-supplied Ananya narration. Keep the warm story world; apply ByteVerseToon's navy/cyan/lime wordmark and real avatar in brand elements and the held subscribe ending. Do not replace this story with a technology explainer or a glass interface template.

Curated source, scripts, exact package versions, lockfile, storyboard, voice directions, asset checksums and review state live under series/nilas-little-world. Media remains outside Git in a separate bundle. Test restore and setup before claiming a cross-PC handoff works. Supplied Cartesia recordings need no API key or new synthesis. No paid service use is authorized by this exception. This episode is still a review-stage animatic with character maquettes; preserve the user's request to review before export. YouTube publication is separate from GitHub synchronization.

## Current phone/interface direction

Use an original concrete example and show its mechanism. A phone action causes the next visual: tap a setting, change a charge threshold, expand an explanation, compare behavior, then return to the phone with the answer. Change framing at meaningful beats, usually every 2–4 seconds within a longer narrated scene. Avoid replacing scene progression with one tilted phone, a floating percentage and decorative motion.

References: https://www.youtube.com/shorts/awdfQCKs67Y (AI answer generation) and https://www.youtube.com/shorts/er4bN1m0Yic (social-media recommendations). Inspected opening and multiple later visual scenes; full audio was not reviewed. Borrow principles—progressive cards, phone interactions, causal lines, selective keyword emphasis—not scripts, artwork, creator branding, soundtrack or exact layouts. Keep ByteVerseToon's navy/blue/cyan/lime/white theme and real avatar. These references establish a motion direction, not a required duration or a gold palette.

For reference-style phone explainers, use concise burned-in phrase captions with a selective lime keyword, plus an SRT. Use measured phrase timing; do not claim word-level synchronization without alignment. Other modes retain their existing caption defaults. English Kokoro af_heart at 0.98 remains the voice unless requested otherwise.

## Glassmorphism visual style (2026-10-31)

Glassmorphism is the preferred surface treatment for phone/interface and system-design explainers, in both regular and Short formats. Follow [glassmorphism-style.md](glassmorphism-style.md): layered navy/blue translucent panels, restrained frost behind the panel, thin cyan edges, soft shadows/highlights, lime selected states and crisp white text. Primary references are the user-supplied Message Queues Episode 5 regular video https://www.youtube.com/watch?v=CXkK7SKj-zc and Short https://www.youtube.com/shorts/3evj4WvbbYU: rounded translucent robots and panels, glossy cool-white rims, teal/violet ambient light and a navy stage. Continue these series accents without replacing the channel palette. Recompose for portrait; keep labels readable. The earlier CDN pair is secondary. Sampled published frames establish the appearance, not the native/simulated blur technique. This style does not change caption defaults.

Declare the style and material values in each episode's DESIGN.md/SPEC.md. Choose HyperFrames, Remotion or a hybrid by scene needs; match glass materials at scene handoffs. Inspect final decoded frames at delivery size and 360 px phone width, with text/diagram contrast and motion checked. Record native blur, layered simulation or a glass-inspired fallback honestly. Keep character cartoons available and follow the current brief.

## Approved 3D motion graphics (2026-11-02)

Follow [3d-motion-workflow.md](3d-motion-workflow.md) for the user-approved technology explainer direction: actual 3D glass props, flowing camera travel from phone to processor to server space, and active isometric machinery when a mechanism benefits from that view. Preserve translucent navy, glossy cyan edges, clear pipes and teal/violet lighting. Adapt each scene to the narration rather than repeating a sample loop or changing titles over static layouts. Keep the other modes available. The full approved example is videos/2026-11-02-ai-behind-chatbox-3d; no further prop-style approval is needed merely to reuse it.

## Framework choice

| Route | When to choose it | Output ownership |
| --- | --- | --- |
| HyperFrames | Phone/interface explanations, cards, connectors and typography; current preferred route for this mode | Editable HTML/GSAP scenes and local master assembly |
| Remotion | Approved real 3D glass motion graphics with Three.js/R3F, flowing cameras, custom frame-driven interactions and reusable React scenes | Editable React composition and rendered scene asset |
| Hybrid | Different parts concretely benefit from each tool | Render only the needed Remotion scene as a silent local asset, then assemble in HyperFrames with one master soundtrack and caption track |
| Existing local canvas/cartoon exporter | A proven project or mode benefits from it | Continue the established project rather than converting it unnecessarily |

Both frameworks can create either visual style. They do not automatically improve creative quality. Avoid reimplementing the same scene in both. For hybrid work, record each scene's owner, dimensions, frame rate, frame count and location on the master timeline. Use 1080×1920/30 fps for Shorts, recompose regular video at 1920×1080. Avoid duplicated audio, captions, black seams or accidental frame-rate changes. Validate imported video decoding in HyperFrames before a full render.

## Production sequence

1. Read maintained preferences and production guides from this checkout. Resolve the media workspace from `BVT_WORKSPACE` or ignored `config/local.json`. Check saved published and pending topics there: use `shared/published.json`, or `published.json` on the older desktop layout. Keep local-only cast/assets and episode records; do not overwrite them during sync. Research claims using current primary sources and map claims to sources.
2. Create a fresh episode/version folder, storyboard and SPEC with a first-three-second hook, one question, mechanism, tradeoff and payoff. Choose scene ownership and caption mode before rendering.
3. Generate approved local narration, measure WAV files, and derive timing. Use natural speech; edit wording instead of time stretching.
4. Build topic-specific phone interactions and diagrams. Keep every graphic that must be read inside platform-safe space, check at 360 px width, and favor short labels over tiny interface copy. Use fictional/mock interfaces only when clearly identified.
5. Open editable previews, inspect motion and frames, run framework checks, and fix material visual issues. A request to generate the Short authorizes completion and export; no extra style-approval checkpoint is added.
6. Render native scene assets and assemble the local master with one narration/music/effects mix and one caption track. Keep ending visible through the exact final frame.
7. Export H.264/AAC MP4, cover, SRT and YouTube text. Fully decode the final file; verify dimensions, timing, audio, scene seams, captions and final frame. Keep technical verification distinct from factual/visual/listening review. Full listening is pending unless actually performed.
8. Deliver for review. Publish only on explicit instruction for that version. Cleanup always needs a read-only enumerated plan and the user's approval of that current plan. Never change schedules as a side effect.

## Free local tools

Use existing Kokoro, FFmpeg, Remotion and HyperFrames installations. No paid generation, account credits, cloud render or API keys. Runtime locations are discovered from the desktop dependency tool and project configuration. The October 30 samples pin Remotion 4.0.539 and HyperFrames 0.8.216; preserve exact compatible versions within each episode.

Some PCs have an inactive system Node launcher. Discover the actual executable and configure it locally. An existing media workspace may provide `production/scripts/hyperframes.ps1`, which uses its configured Node and FFmpeg/ffprobe paths; this wrapper is not shipped here. Inspect it before use and run it from the intended native project. Otherwise use the installed CLI with the verified runtime and that version's supported commands. Do not copy another PC's absolute paths.

See [phone-interface-workflow.md](phone-interface-workflow.md), [quality-standard.md](quality-standard.md) and [quality-profile.json](quality-profile.json). The canonical [byteversetoon-video skill](../.agents/skills/byteversetoon-video/SKILL.md) routes to its motion-frameworks.md reference.

## Cross-platform publication through Microsoft Edge

On explicit authorization, publish the current reviewed version to the requested YouTube channel, Facebook Page and/or Instagram account through the signed-in Microsoft Edge extension. Verify ByteVerseToon identity and the selected destination in each composer, preserve 9:16 playback, use prepared captions/disclosures and required credits, inspect processing/copyright feedback, and confirm the public result separately on every platform. Record platform URLs, settings, source hash and proof before cleanup. Do not create duplicates after slow uploads or claim processing is publication. A restriction on one platform does not justify retrying around the limit; continue unaffected authorized destinations.

Cleanup still requires a read-only exact-file plan and approval of that plan. Keep all authored sources, cover/subtitles/metadata, publication records and shared installed tools. In particular, the new full episode links its dependencies to the approved 3D sample node_modules; preserve that target and never follow a directory junction recursively during media cleanup.

## Language and voice selection (approved 2026-11-02)

English is the default for Shorts and regular videos: local Kokoro Heart (`af_heart`, en-us, speed 0.98). Create an additional Bangla version only when the user explicitly requests it. For that version, use the approved female Bangladesh voice Nabanita (`bn-BD-NabanitaNeural`), Microsoft online neural TTS, starting at normal rate and pitch as sampled. This is an explicit online speech exception to the local production preference; no paid API or cloud rendering is authorized. Keep the English version. Adapt Bangla narration naturally, measure its actual duration and retime visuals and any requested captions. Do not automatically duplicate every release in Bangla or infer publication permission from this voice preference. Read the installed skill voice-setup.md for setup and review details.
