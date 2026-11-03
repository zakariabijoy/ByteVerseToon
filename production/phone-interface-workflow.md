# Channel-themed phone/interface workflow

Use this production route for original technology explainers with animated phones, application interfaces, signal flow or simple diagrams. It supplements the character cartoon mode. It uses authored 2D motion with dimensional lighting; it is not a rigged 3D character system.

## Native framework routes (2026-10-30)

Read [workflow.md](workflow.md) for the current Remotion, HyperFrames and hybrid routes and the reference-style direction. Native projects use their own scene contracts; the `film.html`/`window.draw` canvas contract below applies only to the retained canvas exporter. Reference-style phone explainers use concise highlighted phrase captions plus SRT, while other briefs retain optional caption defaults. Match scene dimensions/fps and give the master sole ownership of narration, music and captions.

## Brand and episode choices

Read `brand-theme.json` and `quality-profile.json`. Shared actual avatar: `assets/brand/byteversetoon-profile.jpg`. Use navy, electric blue, cyan, lime and cool white. Do not recreate the avatar or carry another channel's ending over from a reference.

Choose the duration, scene count and captions for the brief. No exact 67-second default. Default captions remain separate unless on-screen captions are requested. Standard final Shorts are 1080 x 1920 at 30 fps; compose regular 1920 x 1080 videos independently.

## Project contract

Create a fresh version folder, normally `../videos/<date>-<topic>/`:

- `storyboard.json`: researched claims and sources, original script, planned visual actions, sound and caption mode.
- `timeline.json`: measured scene timing and export settings. Set `duration`, `render` (`width`, `height`, `fps`), `burnedInCaptions` (boolean), `sources`, `scenes` and optional `captions`. Each scene has `start`, `duration`, `speechDuration`, narration and purpose. Captions have `start`, `end`, `text`. Do not overlap narration accidentally or let speech outlast a scene.
- `film.html`: complete topic-specific animation source. Expose `window.ready` and deterministic `window.draw(seconds)` and canvas `#c`. Use local assets. Respect `timeline.burnedInCaptions` in caption drawing; the exporter cannot prove that your authored graphics follow the flag.
- `mix.wav`: full narration/music/effects mix. Generate af_heart locally at 0.98, measure its clips, then mix below clipping with music well below speech. The exporter rejects missing/clipped narration audio and normalizes the final audio.
- `profile.jpg`: optional episode copy. Otherwise the local server serves the shared avatar for this filename.
- `captions.srt`, `youtube.txt`: caption and upload deliverables; author these from the actual narration and source list.

The retained `../videos/2026-10-29-mind-reading-channel-theme/film.html` is a topic-specific adaptation reference. The original `../videos/2026-10-28-mind-reading/prepare.py` demonstrates measured speech scheduling and original audio synthesis but is also topic-specific. Neither should be run unchanged for a different topic. Old generated media was cleaned after publication; regenerate media only for a requested remake.

## Export

Use the real Node path in config.json, from this production directory:

```powershell
$NodeExe = (Get-Content .\config.json -Raw | ConvertFrom-Json).tools.node
& $NodeExe .\scripts\render-explainer.cjs FULL_EPISODE_PATH --validate-only
& $NodeExe .\scripts\render-explainer.cjs FULL_EPISODE_PATH --preview-only
& $NodeExe .\scripts\render-explainer.cjs FULL_EPISODE_PATH
```

Inspect the previews and a representative motion sequence before full export. The exporter refuses to overwrite video.mp4; make a fresh revision directory when changing a finished version. Browser access to localhost may require execution approval in this desktop environment. It does not publish, create a schedule or require a paid service.

The output includes scene samples, cover, MP4, complete-decode verification, a decoded middle frame and exact final-frame image. Keep the subscribe scene selected through any padded timeline tail. Verify facts, mobile text, motion, narration joins and music balance independently. Full listening review is pending unless someone actually listens to the complete final export.

When explicitly asked to publish, use the current channel-themed version and verify YouTube Studio's destination channel, disclosures, processing and actual success. Save published.json and the public URL.

## Cleanup requires asking first

After publication or a cleanup request, prepare a read-only plan listing the exact episode folders, file categories/counts and estimated storage savings. Explain what will be kept and that deleted local media links will stop working. Ask the user to approve that plan and wait for an explicit answer before deleting anything. Publication, a shared link, a general cleanup request and approval from a previous cleanup do not bypass this separate confirmation. If the proposed scope expands, ask again.

Keep authored sources, scripts, shared channel/voice assets, publication records/proof, pending thumbnails, rollback backups and videos awaiting review. Remove only the approved generated files, check resolved paths, and report actual freed storage. `scripts/cleanup-workspace.ps1` plans without `-Apply`; deletion requires both `-Apply` and `-UserApproved`, which the assistant may supply only after the user approves the current plan. The legacy episode cleaner also requires `-UserApproved` and must not be used to bypass planning or confirmation.
