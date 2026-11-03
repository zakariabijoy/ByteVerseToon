# ByteVerseToon shared workflow

Read `README.md`, `shared/preferences.json`, `production/workflow.md` and
`production/quality-profile.json` before production. Use
`.agents/skills/byteversetoon-video/SKILL.md` and its relevant references.

This checkout is the source of truth for maintained instructions, templates and
shared preferences. Edit those here and review a Git diff before committing.
Do not replace existing episode sources or global agent settings during setup.
Machine paths belong in ignored `config/local.json`; use `BVT_WORKSPACE` for the
local media workspace. Historical example paths identify provenance, not files
to delete, prerequisites to recreate, or portable runtime locations.

Keep ByteVerseToon branding and approved English Heart voice. Create Bangla only
when requested. Keep cartoon, interface and real 3D prop modes available; adapt
the visual mechanism to the narration. Templates demonstrate plumbing, not a
finished episode. Never describe a technical check as full creative/listening QA.

Use exact dependency versions and committed lockfiles. Preserve versions in
existing episodes. Do not upgrade tools or install paid/cloud services silently.
Keep media, credentials, browser profiles, employer material and downloaded
runtime/model files out of Git. Never copy a whole home or agent-settings folder.

Publishing requires an explicit request for the current version/destination.
Cleanup always requires a read-only exact-file plan and explicit approval of that
current plan, including test files and caches. Never use reset --hard, clean,
force push, automatic stashing or recursive deletion to make sync succeed.

Before work: pull with `scripts/Sync-Workflow.ps1`. After edits: inspect the diff,
stage specific files, commit and push. On conflicts or divergence, stop and
preserve both versions for a deliberate merge. Do not change schedules as part
of repository maintenance.
