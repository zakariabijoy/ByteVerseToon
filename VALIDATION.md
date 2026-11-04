# Setup validation — 2026-11-04

## Desktop workflow update — 2026-11-04, Asia/Dhaka

Validated the canonical skill and local discovery entry with the bundled
skill-creator validator. Parsed shared preferences and ignored local configuration;
verified every setup-manifest file exists and `git diff --check` passes.
The local entry routes to this checkout, retaining legacy render assets and
scripts. Maintained defaults now resolve separately from older desktop media,
cast and publication records. These instruction changes did not render a video,
regenerate narration, verify a missing avatar, or certify runtime readiness.

## Original setup checks

Passed on the personal Windows PC:

- Shared skill validated by the bundled skill-creator validator.
- All PowerShell scripts parsed successfully.
- Migration preview made no changes; a differing README blocked the entire
  import; a fresh import succeeded and a second import was harmless.
- Local Git fixtures demonstrated fast-forward updates, refusal of uncommitted
  changes, and refusal of divergence without changing the local commit.
- Runtime checker matched the recorded Node, Python, FFmpeg and FFprobe builds.
- `npm ci --dry-run --offline --ignore-scripts --no-audit --no-fund` accepted
  the starter lockfile (278 packages planned, no packages installed).
- Starter TypeScript compiled using the existing sample's matching dependencies
  through an isolated validation config. A fresh network dependency installation
  and full 3D render on the second PC remain to be checked.
- The FFmpeg helper encoded three synthetic frames and a short audio fixture;
  the Python helper probed both streams and decoded the full file. A second
  encode to the same output filename was refused.

These checks validate the repository helpers and starter wiring. They do not
certify creative quality, factual claims, full listening, model availability,
company-policy approval, or identical GPU rendering on another PC. Optional
narration was not regenerated. No publishing, schedule changes or cleanup ran.
Temporary validation fixtures and dependencies remain local and ignored; cleanup
still requires the user's current-plan approval.
