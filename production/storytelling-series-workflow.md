# ByteVerseToon storytelling series workflow

## New series and consistent cast

Establish the new series name, premise and recurring characters with the user. Do not reuse retired casts or assign a protagonist by default. Record accepted character reference designs, proportions, clothing, colors, props and narrator choice in a series bible before extending continuity across episodes. Keep ByteVerseToon channel branding; select the story-world visual style to fit the user's brief.

## Episode order

1. Draft one episode's story for review, with emotional beats and visual actions.
2. Apply the user's revisions until they explicitly approve the final story.
3. Supply recording-ready script/timing/emotion notes when useful. The user provides the voiceover; do not synthesize it or require a paid provider.
4. Measure that recording and build a storyboard/animation to its natural pace. Do not start a new draft's animation before story approval and supplied audio.
5. Return the video for user review. Story approval and voiceover delivery do not authorize publishing. Publish only on a later explicit request for that reviewed version.

Preserve a consistent cast while varying the conflict, actions, staging and emotional consequence. Develop an acting sample before extending finish when requested. Keep unfinished model, alignment, creative and listening states honest. Technical checks do not establish full creative or listening approval.

## Portable source and media

Curate authored sources, exact dependency versions/lockfiles, scripts, series bible, episode storyboards, metadata and review state in Git. Keep supplied recordings, artwork, exports, previews, dependencies, credentials and tools outside Git. A source-only clone is incomplete until required media is restored.

For a cross-PC media handoff, create an allowlisted bundle and source-controlled manifest with SHA-256 hashes, sizes and target paths. Verify hashes before copying, refuse to overwrite differing existing assets, and preserve supplied originals. Resolve per-PC runtime/media/browser paths from environment or ignored local configuration. Do not copy proprietary fonts or whole agent settings. Test locked dependency setup, media restore and preview on the receiving PC.

Before editing, use scripts/Sync-Workflow.ps1. Review diffs, stage specific authored paths, commit and push. On the other PC, pull before work. Preserve both versions on conflict; no forced push, reset, clean or automatic stashing. GitHub source synchronization does not publish a video. Cleanup always follows the separate exact-file plan and approval rules.
