# ByteVerseToon 3D production

Current status, 2026-11-02: real 3D prop/motion graphics are approved and active. Read [3d-motion-graphics.md](3d-motion-graphics.md) for that route. The character-specific guidance below applies to new character work; it does not reinstate approval gates for the already-approved prop animation.

The user rejected the geometric Three.js USB-C pilot. Treat it as an engineering experiment, not the approved visual standard. The desired direction is polished, feature-animation-inspired original 3D: appealing character design, expressive eyes and face, deliberate poses, soft lighting, rich materials, and convincing movement. Do not promise studio-level quality.

## New character review stages

The old USB-C character pilot was rejected and deleted. The separate November 2 3D glass motion-graphics episode and its samples are approved. For a new rigged character design, follow the review stages below; a prop-based 3D phone, processor or machine does not trigger character acting approval.

First develop one polished character/look still and ask for visual review. A generated concept still may communicate the target appearance, but it is not proof that an editable 3D asset or equivalent animation exists. After approval of the look, produce an approximately five-second acting test with the intended character assets and lighting. After that test is approved, produce the full video at the requested duration. Reuse approved assets for later episodes when appropriate, without requiring renewed character approval for every topic. Stop for review if a later episode materially changes the character or visual direction.

Do not request another review when an approval is already recorded in the current conversation or production records. Preserve pending previews and report them once; do not create duplicates or repeat unchanged review requests every scheduled run.

## Actual animation

Prefer a well-modeled, rigged character and authored animation clips, for example assets prepared in Blender and exported to glTF for Three.js. Three.js can render real 3D, but primitive-only geometry and procedural limb oscillation do not establish the desired quality. Choose tools based on the desired result and available assets. Do not silently substitute slides, 2D motion, or an image montage for 3D character animation.

## Free local toolchain

The user explicitly requires a free workflow. Use the installed Remotion/Three.js stack for approved prop motion graphics, or local Blender for character modeling, rigging, lighting and animation; the existing Kokoro runtime for optional English female narration; and local FFmpeg for encoding and verification. No Higgsfield, Runway, other credit-based generation service, paid API, paid asset, subscription, trial or cloud rendering is required or authorized. Do not suggest those as prerequisites. Built-in ChatGPT concept images can remain existing references, but recurring production must not depend on purchasing image/video generation.

Microsoft Store Blender **5.2.3 LTS** is verified on 2026-10-24. The supported execution alias is `${LOCALAPPDATA}/Microsoft/WindowsApps/blender-launcher.exe`. Invoke it with `--background --factory-startup --python ABSOLUTE_SCRIPT_PATH` for local automation. The launcher returns before background work necessarily finishes: verify the script's output report and expected artifacts. Direct execution from the protected WindowsApps install folder was denied; use the registered Store alias. A 320x180 Cycles CPU render succeeded; this does not measure GPU rendering speed or animation quality. The old runtime check is historical evidence, not proof of an active production project. Do not recreate the removed portable Blender download.

The rejected USB-C project and its assets remain removed. The current approved prop-based project is ${BVT_WORKSPACE}/videos/2026-11-02-ai-behind-chatbox-3d; do not reconstruct the rejected pilot.

CapCut is detected in the Windows application registry as `Bytedance.CapCut`; its editor operation and automation have not been tested. It is optional for manual finishing using free features only. Existing Kokoro and FFmpeg remain available. Do not require CapCut Pro, paid video services, or another app just to begin asset construction.
No approved programmer or robot assets remain for reuse. Do not reconstruct the deleted project from old instructions.

Use EEVEE and modest preview resolution for the five-second test, then assess quality and rendering before a full video. No arbitrary render-time promises. Report genuine dependency or implementation blockers, not a requirement to connect a paid video service. Continue useful modeling/rigging work autonomously within authorization. Do not replace acting with a panning still, parallax image or slideshow.

## Existing experimental renderer

The former `${BVT_WORKSPACE}/pilot-3d` project was rejected and removed. It is historical provenance, not an available source project or an instruction to recreate it. It may supply rendering mechanics, not an approved character/look. `render.cjs` prepares previews and timing; `prepare-mix.py` prepares audio; `export-frames.cjs` encodes deterministic frames; `verify-media.cjs` checks media. These scripts are topic-specific and must be adapted in a fresh output directory; do not run them unchanged for a new topic or overwrite the pilot. The previous real-time browser recorder failed video timing; prefer the validated deterministic frame export if using this rendering approach.

Retain Kokoro af_heart English narration at speed 0.98, the current channel palette and actual branding, per-brief caption settings from SKILL.md, full media checks, decoded-frame inspection and final review. Default to separate SRT when the brief is silent; an explicit on-screen caption request overrides that default. Inspect acting and motion as well as technical playback. Record the limits of audio review accurately.
