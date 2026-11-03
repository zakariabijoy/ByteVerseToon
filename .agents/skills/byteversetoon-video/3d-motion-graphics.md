# Approved 3D glass motion graphics

Approved 2026-11-02 for technology explainers. The user rejected a slide-like first AI Short, approved the actual 3D samples, requested glassmorphism, and explicitly preferred the flowing animation at the AI3DMotion composition. Use this direction for similar technology Shorts when the current brief fits; retain cartoon and phone/interface modes for other briefs.

## Appearance and motion

Use real 3D geometry, depth, occlusion, lighting and materials. The preferred flow travels from a glass phone, past a processor and into a server space: purposeful camera travel, parallax, close passes, controlled reveals and pullbacks. Keep the mechanism active, rather than relying on changed titles or camera movement over motionless props. Show a request travelling, memory feeding computation, generation progressing, or a cooling path moving heat. Keep the explanation causal and topic-specific.

The user-supplied Dribbble reference https://cdn.dribbble.com/userupload/13489392/file/original-c547e06444065022d77178a6bf03fc06.mp4 informs complementary isometric machine shots: mainly stable camera, conveyor/object motion, animated charts, clear pipes and coordinated mechanisms. Use those views where they make a step clearer. Do not copy the exact model/layout or use the reference footage/soundtrack. Its 4:3 framing is not the Short ratio.

Maintain glassmorphism: translucent navy surfaces, glossy cool-white/cyan rims, restrained teal/violet illumination, clear pipes, soft shadows and legible sharp labels. Keep channel colors and the real avatar. Physical transmission/clearcoat/reflections may implement 3D glass; HTML backdrop blur is not required for a mesh. Judge the exported appearance, not the material name or a live preview alone. Avoid bright lighting that washes out form or text.

## Local implementation

Use Remotion with Three.js, React Three Fiber and @remotion/three for this route. The verified installed Remotion version is 4.0.539. Wrap the 3D scene in ThreeCanvas with explicit dimensions and proper lights. Drive camera, shader values and object motion from frame/fps; no useFrame or wall-clock animation. A frame-valued context can keep a camera journey continuous across narrated scenes. Use independent editable scenes and recorded frame boundaries. HyperFrames remains available for other modes or a concrete hybrid need; using both is not a requirement.

Keep the approved local Kokoro af_heart voice at 0.98, measured narration timing, 1080x1920/30fps, optional separate SRT and a held branded ending. No burned-in narration captions unless requested; short explanatory labels are allowed. Do not stretch an eight-second sample loop across a full script. Build a visible progression with varied useful framing.

This approval covers prop-based 3D motion graphics, not a new rigged character design. Do not repeat character still/acting approval gates for this already-approved prop style. New character work follows 3d-production.md. The rejected USB-C pilot remains retired.

## Verified assets and review

- Approved samples and installed runtime: ${BVT_WORKSPACE}/videos/2026-11-01-ai-3d-motion-sample. AI3DMotion is the preferred camera flow; AIIsometric is the complementary glass machine direction.
- Full authored example: ${BVT_WORKSPACE}/videos/2026-11-02-ai-behind-chatbox-3d. The final video.mp4 is 1453 frames, 48.433 seconds. See storyboard.json, DESIGN.md, timing.json, verification.json and src/ for actual implementation; this duration is an example, not a new fixed default.
- The full episode's node_modules is a junction to the sample's node_modules. Preserve the target installed dependencies during cleanup. Never recursively follow a junction when enumerating or deleting media.

Inspect the opening and a representative interaction in motion; inspect decoded final frames at phone width, every scene boundary and the last frame. Watch for blank WebGL scene starts, material differences across shots, clipped labels, excessive foreground occlusion and a missing end tail. A tight cinematic pass can intentionally crop an object; required explanatory text must remain readable. Full decoding and audio meters do not establish a full listening review. Preserve pending listening status honestly.

## Publishing and cleanup

When explicitly requested, publish the reviewed current version to the requested ByteVerseToon destinations through the signed-in Microsoft Edge extension. See social-publishing-edge.md. Verify each platform independently, save public URLs and proof, and preserve pending items if a platform blocks publication. A cleanup request starts the exact-file plan; SKILL.md still requires approval of that plan before deletion. Preserve authored sources, cover, subtitles, metadata, publication records, screenshots and shared tools.
