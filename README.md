# ByteVerseToon: shared skills and workflow

GitHub is the central history for authored workflow files. Each Windows PC has
its own checkout, media workspace, tools and credentials. Work on one PC at a
time: pull before editing, commit and push when finished, then pull on the other.
Git does not automatically synchronize unsaved edits or uncommitted files.

## Existing checkout

The repository is populated. For an existing checkout, use the everyday
pull/edit/push procedure below; the initial setup/import steps are historical
bootstrap instructions. Read the repo-scoped skill for current production
defaults. Configure each PC separately in ignored `config/local.json`.
The older desktop media layout may keep `preferences.json`, `published.json`
and `runtime/` directly under its workspace. Preserve those files; use this
checkout's shared preferences as maintained defaults, retaining local-only
cast/assets and publication history. A global skill can be a small local router
to the canonical skill here instead of keeping a second edited workflow.

## Initial setup assessment (2026-11-04, Asia/Dhaka)

`E:\ByteVerseToon` contains production guides, shared preferences/publication
history, local runtimes and existing video projects. It was not a Git repository.
There was no root AGENTS.md or CLAUDE.md. Some episode dependencies use ranges
or junctions to another episode; production configuration includes absolute
user-specific paths. The installed skill also contains historical PC paths.

This setup was prepared separately in `E:\ByteVerseToon\sync-repository-setup`.
Existing videos, settings and installed skills were not overwritten or migrated.
GitHub initially returned **Repository not found**. A later retry succeeded and
cloning confirmed that the remote was empty. The implementation checkout on this
PC is `E:\ByteVerseToon\workflow-repository`; it is separate from production.
The prepared setup folder remains available for additive imports. Repository
visibility and branch protection settings have not been changed.

## What belongs here

| Path | Purpose |
| --- | --- |
| AGENTS.md / CLAUDE.md | Shared agent guidance; Claude reads the same rules |
| .agents/skills/byteversetoon-video/ | Canonical skill and its production references |
| production/ | Curated guides, brand tokens and quality profile |
| shared/preferences.json | Portable approved preferences |
| templates/remotion-three/ | Pinned Remotion + Three.js + R3F starter and lockfile |
| templates/python/ | Standard-library export probe/full decode |
| templates/ffmpeg/ | Non-overwriting frame/audio encoder |
| scripts/ | Safe pull, runtime checks and additive migration |
| config/local.example.json | Per-PC configuration example |
| versions.json | Known local baseline and pinning limitations |

Keep exports, voice models, caches, tools, browser profiles, personal/employer
files and credentials outside Git. `.gitignore` is a guard for untracked files;
it does not remove files already tracked or erase secrets from history. Review
every staged diff. The local `shared/published.json` was deliberately not copied:
it contains machine-specific provenance. Before producing topics, consult the
active local publication record. To synchronize topic history later, curate a
small public-URL/topic register without local paths and merge both PCs' records;
do not overwrite either existing publication log.

## First PC: connect and populate the repository

Use Git for Windows and an approved GitHub sign-in through Git Credential Manager.
If you already use GitHub CLI, `gh auth login --hostname github.com --git-protocol
https --web` is another option. Repository access through an app connector may
not sign the local Git client in. Never paste tokens into chat or remote URLs.
Verify the owner/name and account permissions if access still fails.

Run in PowerShell. The clone destination must be new; do not clone into the
existing production folder. Stop if a command fails.

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\Projects" | Out-Null
git clone https://github.com/zakariabijoy/ByteVerseToon.git "$env:USERPROFILE\Projects\ByteVerseToon-workflow"
Set-Location "$env:USERPROFILE\Projects\ByteVerseToon-workflow"
git remote -v
git status --short --branch
```

If GitHub already contains any files, create an integration branch:

```powershell
git switch -c setup/shared-workflow
```

For a truly empty repository with no commits, choose the initial branch instead:

```powershell
git switch --orphan main
```

Preview the setup import, then apply it. If any file says CONFLICT, compare and
merge that file manually first. The script refuses the entire copy when differing
files exist and never overwrites them. Do not replace an existing README or
AGENTS.md wholesale. These commands use this PC's prepared setup path:

```powershell
& 'E:\ByteVerseToon\sync-repository-setup\scripts\Apply-Setup.ps1' -Target (Get-Location).Path
& 'E:\ByteVerseToon\sync-repository-setup\scripts\Apply-Setup.ps1' -Target (Get-Location).Path -Apply
```

Set repository-local identity using your own approved GitHub identity (replace
the examples). Do not reuse a company email for personal work unless permitted:

```powershell
git config user.name 'Your Name'
git config user.email 'YOUR_VERIFIED_OR_GITHUB_NOREPLY_EMAIL'
git config pull.ff only
git config push.default simple
git add -- AGENTS.md CLAUDE.md README.md .gitignore .gitattributes .npmrc .node-version .python-version versions.json setup-manifest.json VALIDATION.md .agents production shared templates scripts config/local.example.json
git diff --cached --stat
git diff --cached
git commit -m 'Set up shared ByteVerseToon workflow and pinned templates'
git push -u origin HEAD
```

On an integration branch, review and merge it through GitHub into the existing
default branch. Do not push an unrelated new main branch over existing history.
On an empty repo, the initial main push establishes the shared starting point.
Do not run `git add .` from the old production directory.

## Second PC: clone after the first push/merge

After company approval where applicable, run:

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\Projects" | Out-Null
git clone https://github.com/zakariabijoy/ByteVerseToon.git "$env:USERPROFILE\Projects\ByteVerseToon-workflow"
Set-Location "$env:USERPROFILE\Projects\ByteVerseToon-workflow"
git config pull.ff only
git config push.default simple
Copy-Item config/local.example.json config/local.json
notepad config/local.json
```

Configure this PC's workspace and actual executables; `config/local.json` stays
ignored. Set the current shell's media/voice paths if using the legacy narration
helper. These are examples, not a requirement to use drive E on both PCs:

```powershell
$env:BVT_WORKSPACE = 'D:\ByteVerseToon-media'
$env:BVT_VOICE_RUNTIME = 'D:\ByteVerseToon-media\shared\runtime\neural-voice'
& .\scripts\Check-Environment.ps1
```

Open the checkout as the Codex project. Repo-scoped skills live in
`.agents/skills`; no global skill installation is needed. See the
[official skill discovery guide](https://learn.chatgpt.com/docs/build-skills).
The old installed byteversetoon-video skill remains untouched. Duplicate names
can both appear: explicitly select the checkout's skill path; optionally disable
the legacy global entry in Codex settings after comparing it. Restart if needed.
For Claude, the root CLAUDE.md points to AGENTS.md and the canonical skill path;
read that skill explicitly if automatic discovery is unavailable. No second
edited copy or admin-required symlink is necessary.

Existing media projects remain in their original workspace. When working there,
explicitly provide this checkout's AGENTS.md and skill paths; a sibling checkout
does not automatically supply instructions to another project. New projects can
live in ignored `work/` under this checkout, keeping shared guidance in scope.

## Reusing the approved tech explainer style

Use `.agents/skills/byteversetoon-video/SKILL.md` for new technology topics and ask for the style of the approved battery revision 03. It covers regular videos, Reels and Shorts with independent aspect-ratio composition. The [style guide](.agents/skills/byteversetoon-video/approved-navy-explainer.md) and [authored source snapshot](templates/tech-explainer/approved-battery-reference/README.md) travel with Git; recordings and rendered media do not. Existing storytelling series keep their separate workflow and style.

## Everyday pull / edit / push

```powershell
Set-Location "$env:USERPROFILE\Projects\ByteVerseToon-workflow"
& .\scripts\Sync-Workflow.ps1
# Edit shared files, then inspect and stage only the intended paths:
git diff
git add -- production/workflow.md shared/preferences.json
git diff --cached
git commit -m 'Describe the workflow change'
git push
```

On the other PC, run `scripts/Sync-Workflow.ps1` before work. It refuses local
changes, detached HEAD, missing upstream and divergent history. It never commits,
stashes, resets or force-pushes. The pull uses
[`--ff-only`](https://git-scm.com/docs/git-pull) to stop when a deliberate merge
is needed. If push is rejected because the other PC pushed first, preserve your
commit, run `git fetch origin`, inspect `git log --oneline --graph --all -15`,
then deliberately merge the upstream branch (`git merge '@{upstream}'`). Resolve
conflicts in an editor, `git add -- <resolved-paths>`, `git commit`, and push.
Do not choose an entire side of preferences/publication records blindly.

## Templates and version pinning

Use Node 24.22.1 and Python 3.12.14 as the observed baseline, not a claim that they
are the newest or company-approved versions. Dot-version files document the
baseline; they do not install tools. FFmpeg baseline is 7.1; FFprobe's installed
build is recorded separately. Use the same approved builds on both PCs when
reproducible output matters. Runtime binaries/models are not shipped here.

Copy the Remotion starter into a fresh ignored work folder, preserving its
package-lock.json. The recorded npm baseline is 11.19.1; use the approved matching installation:

```powershell
New-Item -ItemType Directory -Force work | Out-Null
Copy-Item -Recurse templates/remotion-three work/my-new-episode
Set-Location work/my-new-episode
npm ci
npm run check
npm run studio
# When ready to export the starter's silent demonstration:
npm run render
```

Use a new episode folder name every time; do not copy over an existing project.
The starter combines Remotion and Three.js intentionally. All animation derives
from the frame number. It has no narration, avatar or factual story; those must
be authored for the episode. Inspect rendering on each GPU/browser. See
[ThreeCanvas documentation](https://www.remotion.dev/docs/three-canvas).
Recompose regular videos separately at 1920x1080.

The lockfile is adapted from the existing approved 3D sample's resolved versions;
exact top-level Three.js/R3F versions are now explicit. It pins transitive
dependencies and integrity values. Do not run `npm update` or use `@latest` as
part of routine sync. Upgrade in a branch, regenerate the lockfile, validate a
sample and review the diff before merging. Preserve existing episode versions.
Python's probe needs no pip packages. Kokoro optional direct pins remain in the
voice reference; its full transitive environment/model hashes are not yet locked.
HyperFrames 0.8.216 is an observed legacy pin, not included as a complete portable
template here. No arbitrary npm/FFmpeg install or license entitlement is implied.

Encode numbered PNGs and the final soundtrack with
`templates/ffmpeg/Encode-Frames.ps1`; choose a fresh output filename. It refuses
overwriting. Supply matching frame/audio durations; it does not silently trim
either to the shortest input. Then check the result:

```powershell
python templates/python/probe_video.py 'work/my-new-episode/out/video.mp4' --ffmpeg ffmpeg --ffprobe ffprobe
```

Technical decoding does not certify factual accuracy, framing or a full listen.
Keep storyboards, source links, review evidence and publication details with each
episode. Keep the approved avatar available locally at
`production/assets/brand/byteversetoon-profile.jpg` in the media workspace; the
asset was not uploaded in this setup. No new cleanup or publication is authorized
by repository synchronization.

## Company-policy considerations

Before using a work PC, check your employer's acceptable-use, personal-project,
software-installation, external-GitHub and AI-tool rules with IT or the relevant
policy owner. Use only permitted accounts, folders, tools and network routes.
Do not bypass blocked services, execution policies, device management or DLP.
If personal repositories are prohibited, keep production on the personal PC or
use an explicitly approved alternative.

Never sync employer code, internal documents, client data, company credentials,
browser sessions or company-owned licensed assets to this personal repository.
Confirm personal-project ownership/IP and permitted equipment/time before using
company resources. A private GitHub repository is not a substitute for approval;
work-device administrators may still have access under company policy. Keep
personal and company identities/credentials separate and review local Git author
settings. Check licenses for tools, models, fonts, music and assets, including
whether commercial/team use changes licensing requirements.

No company policy was available to inspect, so this setup makes no legal or
policy determination. Use your employer's actual policy and approved workflow.

## Storytelling series

Follow [production/storytelling-series-workflow.md](production/storytelling-series-workflow.md)
and the canonical skill's [storytelling-series.md](.agents/skills/byteversetoon-video/storytelling-series.md).
The next series and recurring cast are to be established with the user. Draft
one episode at a time, incorporate story revisions, wait for final story approval
and user-supplied voiceover, then animate and deliver for video review.
Keep source portable and separate media from Git. No automatic speech generation,
platform publication or cleanup is authorized by this production workflow.
