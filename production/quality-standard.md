# ByteVerseToon production quality standard

Initial quality standard approved October 25, 2026; channel branding and optional phone/interface workflow updated October 29, 2026.

## Creative direction

Use the preferred 2D character cartoon mode or the phone/interface motion mode suited to the brief. Keep Kokoro af_heart female English narration at speed 0.98 and free local tools. Follow brand-theme.json: navy, electric blue, cyan, lime and cool white, with the actual channel avatar. Compose regular video for 1920×1080 and Shorts independently for 1080×1920, normally 30 fps. Fit the requested duration to measured narration. Default to optional separate SRT; when on-screen captions are requested, use concise readable phrases inside the mobile-safe area. The last 67-second video does not establish a fixed duration or universal caption requirement.

Read phone-interface-workflow.md for the reusable deterministic phone/interface exporter. It produces authored 2D motion with depth-inspired lighting, not rigged 3D characters.

## Story and explanation

- Open with a visible problem or surprising result, establishing the character's goal or the viewer's question. Avoid a logo introduction or a long setup before the question.
- Give the regular video a problem, investigation, discovery, and payoff. Let each scene contribute a new fact or advance the story.
- Explain one causal step at a time. Show the action that produces the result while the narration explains it. Use topic-specific objects and environments.
- Verify technical claims against dated primary sources. Record a claim-to-source mapping. Mark analogies and fictional demonstrations as illustrative; do not present them as measurements.
- The Short answers one question with a visual experiment, clear result, and brief explanation. Write it for the format rather than cutting a section out of the regular video.
- Cut repeated explanations and pauses that do not help comprehension. Derive timing from the measured narration; do not pad every scene equally to meet a duration target.
- Keep the closing invitation brief and place it after the answer or payoff.

## Animation and staging

- In character cartoon scenes, give Byte a goal, expressive reactions, and purposeful actions: picking up, plugging in, pressing, carrying, testing, or comparing relevant objects.
- Plan the regular video with multiple framings, such as a wide establishing shot, a close-up during an interaction, and a view inside the device. Use different locations or purposeful cutaways when the explanation benefits.
- For the Short, plan a distinct setup, demonstration, and result. Change framing to direct attention without interrupting the action.
- Avoid consecutive scenes with the same room, character position, and floating-object layout. Reuse a setting only when the story calls for it.
- Keep props attached to the relevant hand or surface during interaction. Distinguish an enlarged explanatory cutaway from the real prop so duplicated devices do not confuse the viewer.
- Animate the mechanism itself. Moving a packet, vibrating a speaker, or changing a device state should correspond to what the narration describes. Idle bobbing and blinking do not establish an adequate animated explanation.
- In cartoons, prefer short prop labels and occasional thought bubbles. In phone/interface explainers, short headings and requested phrase captions are allowed, but animate the mechanism and vary framing so the result does not become static slides. Avoid heavy bottom bars.
- Phone/interface scenes may mark character interaction not applicable. Review purposeful swipes, progress, ranking, settings changes and data flow instead. Keep the final subscribe frame through any padded timeline tail.

## Sound

- Keep narration clear and consistent. Check pronunciation, sentence endings, unintended pauses, and natural pacing.
- Keep background music below speech. Place sound effects at the matching visible action, using original or appropriately licensed sound.
- Listen to the complete final export, including scene joins and the ending. Record whether the listening reviewer is the assistant or the user and list any fixes.
- If no listening tool is available, provide the exported video or audio for the user's listening review and explicitly mark audio review pending. Do not equate non-silence, peak measurements, or successful decoding with a completed listening review.

## Thumbnail and review

- Design the thumbnail around one clear subject and a readable expression, with two to four main words. Check it at a small preview size.
- Before committing to a full export, inspect the opening and a representative interaction in motion. This is an internal quality check; it does not create an extra user approval requirement.
- Inspect final decoded frames from the opening, middle, and payoff. Check composition, text, prop contact, and factual meaning.
- Verify dimensions, aspect ratio, complete decoding, narration timing, and audio presence. Keep these technical results separate from creative, factual, and listening review.
- Deliver for user review. Publishing requires authorization for the current video/version; an explicit publish request provides it. Earlier publication instructions do not authorize future videos. Verify the destination channel, actual publication success and public URL.

## Required storyboard details

Each shot records its purpose, narration, claim/source, setting, framing, character goal and action, object interaction, mechanism shown, sound cue, and transition. Record actual timing after voice generation. Use quality-profile.json as the compact planning reference.

## Review record

Record each category separately as passed, needs_revision, or pending: factual accuracy, story and pacing, visual explanation, character interaction, composition, thumbnail readability, full listening review, and technical playback. Include evidence or reviewer notes. A renderer success flag alone must never mark all categories passed.

## After publication

Save the actual public URL, ID and publication record. Always ask the user before deleting files, including after publication or a general cleanup request. First prepare a read-only file plan showing the episode folders, file categories/counts, estimated storage savings, preserved items, and which local download links will stop working. Wait for explicit approval of that current plan. Publishing, sharing a URL, a previous cleanup approval, or no reply is not deletion permission. After approval, remove only the enumerated generated files for that episode and its superseded versions. If the plan expands, ask again. Keep authored animation source, scripts, storyboards, captions, sources, verification, publication evidence, shared channel/voice assets, pending thumbnails, rollback backups and videos awaiting review. Report actual freed storage.


## Reference-style update (2026-10-30)

Follow workflow.md for progressive phone interactions and causal diagrams, framing changes, and concise highlighted phrase captions in this mode. Use HyperFrames, Remotion or a scene-owned hybrid when suited to the brief; native framework checks supplement final exported-file review. Keep one master audio/caption timeline, verify imported clip seams, and preserve other modes and the existing publishing/cleanup boundaries.


## Glassmorphism review (2026-10-31)

Use glassmorphism-style.md for the preferred phone/interface and system-design surface treatment in regular and portrait compositions. Review translucent navy surfaces, restrained background frost, thin cyan edges and soft layer separation while keeping text, captions and diagram strokes sharp. Check contrast during motion and inspect decoded exports at mobile size. Record whether the material uses native blur, layered simulation or a glass-inspired fallback; retain the existing cartoon and current-brief choices.

## Real 3D motion review

For the approved 3D glass route, inspect actual camera travel, object/causal motion, physical material appearance and readability across lighting changes. Check native exported frames at every scene start and the held ending; live WebGL preview alone is insufficient. Inspect a phone-size contact sheet and representative movement. Do not label a panning still, image montage or repeated sample loop as the completed 3D explanation. Full decode and meters remain separate from full listening review.
