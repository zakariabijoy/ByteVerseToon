# Continue this ByteVerseToon Short on another PC

The GitHub source belongs at `series/nilas-little-world/episodes/01-umbrella` in the ByteVerseToon repository. Recordings and brand artwork travel in a separate media ZIP; Git intentionally excludes them. A Git pull alone does not restore audio.

## First use

1. Clone `https://github.com/zakariabijoy/ByteVerseToon.git`, or run the repository's `scripts/Sync-Workflow.ps1` in an existing clean checkout. Select the series branch if the update has not yet been merged into main. No global skill installation is needed: the maintained skill is `.agents/skills/byteversetoon-video/SKILL.md`.
2. Install/use a compatible Node version (the existing baseline is Node 24.22.x, npm 11.19.1). Preserve this episode's exact package versions and package-lock.json; do not upgrade during setup.
3. Obtain `nila-e01-media.zip` from the handoff alongside the source. Unzip it to a local folder. It contains only the original supplied Ananya WAV and the verified ByteVerseToon channel avatar. No credentials or runtime files are included.
4. In this episode folder, run:

```powershell
npm ci
node scripts/restore-media.mjs 'D:\Transfer\nila-e01-media'
npm run prepare-media
npm run check
npm run studio
```

Replace the example media path with your unzipped folder. Restore verifies SHA-256 hashes and refuses to replace differing existing assets. `prepare-media` uses Node's standard library: Python/numpy, Cartesia login, paid synthesis and API keys are not needed. Your supplied recording is reused at its original speed.

Select `Episode01-Animatic` (60 seconds) or `Umbrella-Lookdev-10s` (10 seconds). The character models remain development maquettes. Review exact narration/shot alignment by listening before locking the edit. A technical pass is not final creative approval.

## Local paths and rendering

Keep machine paths in ignored `config/local.json` or environment variables. `BVT_BROWSER` overrides the browser executable; review/export scripts otherwise discover installed Chrome, then Edge on Windows, or let Remotion resolve its supported headless browser. Chrome was used for the latest review because this PC's Edge headless launch failed; this does not change the preferred Edge route for channel publication. `BVT_WORKSPACE` and the repository configuration still resolve the broader media workspace. Nirmala UI is an installed Windows font; on another OS supply an appropriately licensed Bengali font and verify text shaping. Do not copy proprietary Windows fonts into Git.

```powershell
npm run review:stills
# After the requested preview review, when an MP4 is wanted:
npm run render
```

Export targets H.264/AAC, 1080×1920, 30 fps. It does not upload to YouTube. Decode and inspect the full export and listen end to end before publishing. Keep source hash and review status with the episode.

## Next episode

Read the series bible and `series.json` two folders above. Reuse Nila's approved design, palette, narrator identity and Bengali styling. Start a new episode directory rather than overwriting episode 01. Keep the series in Bangla unless the user changes it; do not regenerate an English duplicate merely because that is the channel-wide default. User-provided Cartesia audio is an accepted series input, not authorization to spend credits or call a paid API.

Before switching PCs, commit and push authored changes from this repository. Keep media in the separate handoff/bundle. On the other PC, sync before editing. Preserve both versions on conflicts; do not force push, reset, clean or auto-stash. Cleanup and YouTube publication remain separate actions requiring their applicable authorization.
