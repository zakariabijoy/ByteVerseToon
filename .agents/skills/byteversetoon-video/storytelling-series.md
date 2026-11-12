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
