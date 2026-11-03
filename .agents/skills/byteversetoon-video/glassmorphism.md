# ByteVerseToon glassmorphism

Saved 2026-10-31 at the user's request. Preferred surface treatment for phone/interface explainers and system-design diagrams, in both independently composed regular videos and Shorts. Use it in character scenes when a device/interface needs it; character scenes may use the Episode 5 glass robot treatment when continuing that series, while other cartoon styles remain available. Current brief can override the treatment.

## Channel reference and inspection limit

Primary references explicitly supplied by the user on 2026-10-31:

- Regular: Your Order Is Placed. Why Is Everything Still Waiting? | System Design Ep. 5 — https://www.youtube.com/watch?v=CXkK7SKj-zc (4:06).
- Companion Short: Why Is Checkout Waiting for an Email? Message Queues #Shorts — https://www.youtube.com/shorts/3evj4WvbbYU (about 44 seconds).

Visually inspected the actual published players: Short opening, approximately 17 seconds and ending; regular queue/worker scenes around 1:13–1:52 and retry/idempotency scenes around 2:57. This was a sampled visual review, not a full viewing or listening review. Screenshots are retained in production/style-references/2026-10-31-glassmorphism/message-queues-*-review.jpg.

Match this pair's dark navy stage, teal/cyan and violet ambient light, translucent rounded device shells and diagram cards, thin cool-white rims, glossy upper-edge reflections, inner shading, soft shadows and restrained floor perspective. Byte and Katherine have rounded glass-like robot bodies, expressive dark face screens and teal/violet identity colors. Carry this character treatment forward when continuing this series; other cartoon modes remain available. Recompose the regular layout into a clear vertical sequence for Shorts rather than cropping the wide scene. Keep small labels and state text legible at phone size.

The rendered pair visibly establishes glassmorphism. The pixels alone do not identify whether its frost was made with native backdrop filtering, layered blur or gradients. Preserve the appearance without claiming unverified implementation details. Teal/violet lighting is an observed series accent, not a replacement for the channel palette; lime remains available for meaningful emphasis. Glass styling does not require burned-in captions; retain each video's caption brief.

Earlier secondary references: CDN regular https://youtu.be/lJm6xInMQ10 and Short https://www.youtube.com/shorts/KWZEO1jW-0k were reviewed through retained file samples, contact sheets and source. Their mostly opaque navy canvas panels establish an earlier glass-inspired direction. Battery Short https://www.youtube.com/shorts/UxSK6at4NTU was checked through its cover/source only. These are historical references, not the latest pair the user identified.

## Material and starting values

Use the saved palette: background #050b20, structural blue #1269e8, cyan #27dcef, emphasis #a6f51c, text #f4fbff. The actual channel avatar remains the brand asset.

- Glass surfaces: navy/blue translucent fill, starting at rgba(16,36,62,0.65); tune roughly 0.55–0.80 to the actual background so the card has visible depth and text remains readable.
- Frost: a softly blurred background behind the surface, starting at 16 px with a 12–20 px range at 1080 px canvas width. Blur the background layer only. Text, icons, captions, data paths and selection outlines stay sharp.
- Edge: a thin cyan border, starting at rgba(39,220,239,0.35), 1–2 px at 1080 px width, with a restrained cool-white upper-edge highlight. Scale widths and blur with canvas design scale.
- Shape: rounded corners around 20–28 px for ordinary 1080 px-wide design cards; device shells use their own larger radii.
- Separation: a soft dark shadow, starting near 0 16px 48px rgba(0,0,0,0.25), plus low-opacity cyan/blue light behind the hero when it helps separate the layers. Avoid broad bloom that reduces legibility.
- Active meaning: lime marks a selected setting, successful cache hit, charged section, important keyword or result. Keep most glass surfaces navy/cyan so emphasis has a purpose.

These are starting values, not fixed per-scene requirements or numbers measured from the old videos. Adjust opacity and background detail for the format. Use fewer surface layers when a diagram becomes busy. Glass treatment supplements the explanation; progressive phone actions, clear causal lines, purposeful framing and selective captions remain the story tools.

## Framework implementation

- HyperFrames: declare this treatment in DESIGN.md/SPEC.md and the scene variables. Use a translucent surface over an intentional visible background. Use supported backdrop filtering only after checking native capture and export; place the effect on its background/surface layer rather than on a content container holding text.
- Remotion: drive any material/lighting changes from frame time. Background frost or preblurred background layers may sit behind the glass; text and interface content are separate crisp layers. Match the HyperFrames scene's fill, edges and shadow at a hybrid handoff.
- Canvas/legacy exporter: use a clipped translucent panel over a separately softened background layer, edge highlight and shadow. A native CSS backdrop-filter is not required. If only gradients/opaque panels are available, describe the fallback as glass-inspired, not verified true frosted blur.
- Do not rely on a live preview alone. Check the actual renderer and decoded final frames for lost blur, opaque fallback, black patches, text blur and flicker. Keep imported scene dimensions/fps consistent in a hybrid.

## Visual QA

Inspect one quiet frame and one moving interaction at delivery resolution and phone width (360 px). Text contrast and reading time must hold even when motion changes what is behind a panel. Keep all text and diagram strokes sharp; remove background detail or increase surface opacity when needed. Review regular and portrait compositions independently, including platform-safe margins, panel overlap, and seam continuity. Record whether frost is native backdrop blur, layered/preblurred simulation or a glass-inspired fallback. Technical checks do not establish that glass appearance survived export.

No remakes, uploads, cleanup or voice changes are authorized by this style preference. Follow existing publishing and cleanup rules.

## Approved real 3D extension (2026-11-02)

For the approved 3D glass motion route, follow production/3d-motion-workflow.md (installed skill: 3d-motion-graphics.md). Preserve glassmorphism through real geometry, physical transmission/reflections, cool glossy rims, clear pipes and active mechanisms. The approved flowing camera sample and full AI episode supplement the Episode 5 references; they do not make glass blur mandatory on every mesh. Review decoded exports and keep text sharp.
