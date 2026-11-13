# Episode 02 — measured story and animation plan

Season: ছোট সিদ্ধান্ত, বড় পরিণতি. Theme: kindness with clear boundaries.
The story ends warmly: Sajid accepts a reasonable limit. His response avoids
repeating a simple villain portrayal. Maya has no scripted appearance here;
Karim Chacha provides a question, while Rafi makes his own decision.

| Frames inclusive | Time seconds | Scene and action |
|---|---|---|
| 0–398 | 0–13.30 | Spoken title, then Rafi's worried reaction; everyone else's work versus his own |
| 399–614 | 13.30–20.50 | Rafi typing; small requests appear around the workstation |
| 615–830 | 20.50–27.70 | Sajid asks for presentation help; Rafi agrees |
| 831–1090 | 27.70–36.37 | Computer/report requests accumulate; Rafi says he will look |
| 1091–1367 | 36.37–45.60 | Clock advances, presentation completed, Rafi's work remains unfinished |
| 1368–1802 | 45.60–60.10 | Manager asks about the deadline; Rafi listens and explains |
| 1803–2288 | 60.10–76.30 | Dusk tea stall, Rafi's admission, cup pose, Karim's practical question and reflective pause |
| 2289–2732 | 76.30–91.10 | Next day Rafi gives a clear time/effort limit; Sajid accepts responsibility |
| 2733–2858 | 91.10–95.30 | Relief: the friendship continues |
| 2859–3196 | 95.30–106.57 | Rooftop reflection; hold the final message through the last audio sample |

## Motion and sound

Rafi, Sajid and manager reuse the approved V3 intact-pose deformation: bounded
atlas crops, smooth localized displacement, breathing, blinks, subtle gestures
and camera reframing. No separately rotated neck, wrist or elbow cutouts.
The new Karim atlas follows the same mechanism with measured crop bounds and
face calibration. The cup is held within the continuous illustration; it is
not a physically simulated handoff. Mouth shapes use original-audio energy and
heuristic graphemes inside local cross-attention word intervals.

29 curated short speech chunks, with seven boundary refinements, align 247
canonical script/title words. Direct quotations use these intervals; narration
does not cause listeners to speak. The raw local ASR diagnostic was not used as
caption text. Selected quotes and lesson overlays are burned in, with full
optional Bengali SRT. Text stays inside 68 px left / 108 px right / 280 px
bottom margins. Bengali font rendering and line wrapping are reviewed in stills.

Original low-volume music shifts from office tension to a warm resolution.
Typing, small request notifications, scene swishes and cup taps support actions.
Audio-energy ducking keeps narration prominent. Final export receives two-pass
loudness mastering; measured results are saved alongside the actual MP4.

## Review scope

TypeScript check, representative full-resolution frame inspection and opening /
tea-stall browser playback precede export. Browser preview may run below real
time on this machine; delivery is deterministic 30 fps. Decode the whole final
MP4, assert its streams/frame count, inspect decoded mobile frames and cover.
Full perceptual listening and the user's creative approval remain separate
review states, never inferred from successful decode or audio meters.
