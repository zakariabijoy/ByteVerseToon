# Recurring ByteVerseToon storytelling series

Use for episodic character-led stories and continuity work. Establish the new series identity and recurring cast with the user before assigning a title, protagonist, wardrobe or narrator. Do not carry over characters or stories from retired projects. Read the selected series bible/manifest when one exists; channel-wide defaults remain for unrelated work.

## Story-first collaboration

Draft one requested episode story at a time. Give enough scene and emotional direction for the user to review. Revise from feedback until explicit final story approval. Silence, editing requests and old audio are not approval of a changed story. Provide recording-ready copy with timing/emotion notes when needed, then wait for the user to supply its voiceover. Do not generate or commission speech, require a paid provider, clone a voice or assume API access.

After approved story and audio arrive, measure the recording and build the storyboard/animation around natural speech. Preserve the chosen cast's appearance, proportions, wardrobe, props and acting conventions. Document accepted cast changes deliberately. Keep consistent identity while varying actions, framing and story conflicts. Do not produce additional episodes automatically.

## Animation and review

Use the selected framework and exact pinned dependencies. ByteVerseToon wordmark, real avatar and navy/blue/cyan/lime identity belong in brand elements; the story-world treatment follows the approved series style. Do not call maquettes final characters or claim listening approval from technical checks. Return the video for user review. Story approval, voiceover delivery and GitHub sync do not authorize publication.

## Cross-PC handoff

Follow production/storytelling-series-workflow.md. Git carries curated authored code, lockfiles, bible, scripts and review state; recordings, avatars, exports, dependencies and credentials stay separate. Use an allowlisted media bundle and SHA-256 manifest where useful. Restore declared assets only, refuse differing existing files, verify setup and preserve original recordings. Resolve machine paths from environment/ignored local config, not another PC's absolute paths.

Use the repository's safe pull/edit/commit/push workflow. Preserve divergent work without reset, clean, forced push or automatic stashing. A GitHub push is not platform publication. Cleanup follows the canonical skill's exact-file plan and approval process; explicit removal of a retired project does not authorize deleting unrelated material.

## জীবনের অদ্ভুত গল্প — approved reusable baseline

For this established series, Episode 01 V3 was visually accepted by the user on
2026-11-13. Preserve its cast, outfits and story-world treatment. Read the
[season bible](../../../series/jiboner-odbhut-golpo/season-01/story-bible.md),
[animation setup](../../../series/jiboner-odbhut-golpo/season-01/episode-01/animation/README.md)
and [V3 correction notes](../../../series/jiboner-odbhut-golpo/season-01/episode-01/revision-v3.md)
before continuing this series. These are series-specific references, not a
required style for unrelated ByteVerseToon work.

Start each requested episode in its own folder using the approved authored
components, scripts and exact dependency lock as the starting point. Preserve
earlier episodes. Reuse the declared character/background assets through the
media manifest; restore media separately from Git. Resolve local tools and media
paths on each PC instead of copying junctions, dependencies or generated output.

The active `Puppet.tsx`, `ContinuousMotion.ts`, `pose-bounds.ts` and
`Workstation.tsx` preserve intact illustrations during motion. Use this approach
for the existing artwork. The separate-head `SkeletonBody` experiments remain
historical; they produced visible neck/arm cuts and are not the approved rig.
Raised hands cross equal-width atlas cells: keep measured per-pose bounds, and
remeasure them if artwork changes, rather than blindly cropping four cells.

For each newly approved story and supplied recording, rebuild scene timings,
voice envelope, reference-text alignment, subtitles and action sound cues.
Episode 01's 92.96-second timing and sound schedule are specific to that episode.
Mouth shapes are approximate word-timed animation, not verified phoneme sync.
Adapt framing and gestures to the new story rather than repeating its shots.

Inspect neck, collar, shoulder, elbow and wrist continuity in motion, including
typing and expression changes. Sample the exported video at those moments;
still-frame and technical checks alone missed the V2 failure. Reuse the render,
audio-mastering and export-verification scripts with a fresh version directory;
deliver limited-range H.264/yuv420p with AAC. Record new technical results and
return each episode for user review. Episode 01's visual acceptance does not
approve future stories, recordings, videos, publication or a full listening QA.

## Approved dramatic edit baseline — Episode 04 review-v4 (2026-11-17)

The user accepted review-v4 with “ok continue” after rejecting review-v2 as static and review-v3 as lacking sound effects, boldness, highlights and suspense. Preserve Episode 01's intact cast/wardrobe and continuous-surface motion; use Episode 04 review-v4 as the current editorial emphasis and sound baseline for this series. This scope does not replace the technology explainer style.

Read Episode 04's storyboard.md, reference-direction.md, review-state.json and animation/src/MotionScenes.tsx, DramaDirection.tsx and animation/scripts/make_drama_audio.py when adapting the approach. The master is local media, declared separately; Git contains portable authored sources. The reference was visually sampled, not fully listened to, and no causal viral-performance claim is supported.

- Write visible conflict and purposeful acting alongside the script before the user records. Enter the incident immediately, vary reactions and information, and earn the ending through a character action. Zooms and floating poses alone do not create drama.
- Use large mobile-readable Bengali phrases with a strong navy outline, selective yellow/amber/cyan/lime keyword blocks, quick entrances and timed underlines. Episode 04 used 76px regular captions and 80–96px dramatic phrases at 1080×1920; adapt size and wrapping to each shot. Keep faces, action and platform controls clear. Highlights should match spoken emphasis; avoid orphan final words.
- Build an audible sound arc: action-contact sounds, selected short impacts, anticipation risers, score dips before questions/reveals, then an earned reveal or warm resolution. Preserve intelligible narration at original playback speed. Re-author cues for each recording rather than copying Episode 04's timestamps or stem gains.
- Make evidence highlights appear only when the evidence is visible. Use contrast/vignette sparingly and avoid decorative effects that obscure acting. Preserve continuous necks, shoulders, arms and wrists.
- Show a sound-enabled opening sample and a representative suspense/reveal sample, plus the full current review preview. Still frames, audio meters and a successful decode do not prove compelling sound or acting. Record actual motion/listening scope honestly. Each new episode still requires its own current preview approval.

Reuse the principles and editable components, not the exact plot, action schedule or soundtrack. Keep the user-supplied approved narration. Measure retention against the series own baseline when data exists; no guaranteed virality or universal numeric targets.

## Approved story and call direction — Episode 05 review-v5 (2026-11-19)

The user accepted the new story and corrected phone-call preview with “perfect”.
Read Episode 05's `animation-v4/README.md`, `storyboard-v4.md`,
`animation-v4/src/PhoneCall.tsx` and `phone-call-revision-v5.json` for this example.
The active composition is `animation-v4/src/NewEpisode.tsx`; `animation/` and
older scripts are preserved superseded work. Media remains separate from Git.
This acceptance is a reusable series reference, not approval of future episodes.

### Story craft

The user wants stronger twists, character clashes, corporate politics and real
software-engineering stakes, mixed with suspense, emotion, situational comedy,
psychological reversals, moral choices and light romantic subtext. Vary their
weight across episodes instead of forcing every device into every story or
turning neighborhood/family episodes into office plots. Make evidence change a
character's understanding, give competing choices a believable cost, and earn
the payoff through action rather than a closing moral lecture. Maya acts on her
own convictions; romance does not replace her goals. Sajid can surprise the
audience without erasing his earlier mistakes. Memorable dialogue is a craft
goal, not a promise of viral reach.

### Phone calls and prop contact

Author a call as one continuous state: incoming ring, answer, connected
conversation, then end. An “opposite end replied” narration is not a second
incoming call. Keep connection cues consistent through document or reaction
cutaways, and synchronize speaking/listening reactions to the actual dialogue.
Keep office geography clear when callers are apart. The approved example uses
two office panels and supported speakerphones; adapt the staging rather than
requiring split screen for every call.

Use a plausible contact pose when artwork supports it. With the established
intact cast, a supported speakerphone is preferable to attaching a detached
hand or floating phone to the illustration. Check device support, shoulders,
wrists and head continuity in motion. Avoid happy pose changes during coercion
or anxious dialogue. Connection labels, timers and speaker indicators support
the acting; they do not substitute for it.

### Supplied narration and revision verification

Check that performance notes have not accidentally been spoken. Preserve the
original; obtain a concrete edit decision before cutting approved narration.
For Episode 05 the user authorized removing only the spoken directions; all
retained PCM samples were identical and playback speed stayed unchanged.
Rebuild timing after an authorized cut. Never generalize that permission to
future recordings.

For a picture-only revision, retain the approved mix and verify copied audio
when practical. After joining rendered intervals, verify constant frame rate,
frame count, duration and the join in motion; the first Episode 05 join exposed
a fractional average frame rate until CFR was explicitly set. Deliver a current
sound-enabled changed-section preview plus the full updated review. Playback,
technical validation, user creative approval and full subjective listening are
distinct records.
