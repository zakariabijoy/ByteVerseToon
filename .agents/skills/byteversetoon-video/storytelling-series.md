# Recurring ByteVerseToon storytelling series

Use for character-led episodic stories and continuity work. Read the selected series' `series.json`, `SERIES-BIBLE.md`, episode director packet and review notes before editing. Keep existing frameworks and pinned dependencies; do not rebuild a working episode solely to follow a newer template.

## Nila / নীলার ছোট্ট পৃথিবী

Source: `series/nilas-little-world/episodes/01-umbrella`. Audience: teens/adults. Format: 1080×1920, 30 fps, 60 seconds for episode 01. Language: explicitly Bangla. Narrator: user-supplied female Cartesia Ananya WAV, not the English Heart or Bangla Nabanita defaults. Do not spend credits or call Cartesia, clone a voice, or regenerate speech merely to continue the project. Future voice generation needs the user's chosen route; existing clean supplied recordings can be reused.

Nila is an aspiring artist. Preserve her teal salwar kameez, cream salwar and orna, long side braid, small earrings, coral satchel, sketchbook and yellow umbrella. Seller/daughter designs are documented in the bible. Cultural styling comes from individual clothing, hair and context. Preserve readable acting and prop contact. Current procedural models are development maquettes; user-requested edits do not by themselves certify final character quality.

Keep the warm colorful story-world palette. Brand overlays and ending use ByteVerseToon's navy/blue/cyan/lime/cool white and verified real avatar. No invented robot/logo. The series name is a sub-brand. Avoid a long spoken channel intro. Preserve natural speech, scene-specific acting, purposeful holds and exact duration; pause-based audio cuts are draft alignment until listened to.

## Cross-PC handoff

Read `production/storytelling-series-workflow.md`. Git carries curated authored source, lockfiles, cast/series bible, scripts, metadata and review state. Keep recordings, avatars, previews, exports, tools and credentials out of Git. Prepare a separate allowlisted media ZIP and a source-controlled SHA-256 manifest. Restore only declared assets, verify hashes, refuse differing existing files, then regenerate derived audio using `npm run prepare-media`. Run `npm ci`, `npm run check` and preview on the receiving PC. No absolute author-PC paths in portable scripts; use environment/ignored local config.

Before syncing, use the existing safe pull workflow and inspect the Git diff. Stage only intended files, commit and push without forced history changes. GitHub sign-in may need the user; never request a token in chat or extract browser credentials. A GitHub push is not a YouTube publication. Keep any unpushed commit and media bundle available if authentication is missing.

## Continue the series

Create a new episode folder when the user requests the next story. Reuse cast and style deliberately while preserving the earlier episode snapshot. Record new story, actual audio, shot timing, assets, review evidence and publication state. Each story needs its own goal, obstacle, choice, practical kindness and earned consequence; do not automatically repeat the umbrella rescue or add a reward for Nila. Keep channel-wide English/technology defaults for other productions.

Preview review precedes final finish/export when requested. Keep factual, creative, technical and listening checks distinct. Never mark a full listen as passed from audio meters or successful renders. No cleanup or platform publication is implied by workflow maintenance.
