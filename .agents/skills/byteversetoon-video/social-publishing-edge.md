# YouTube, Facebook and Instagram publishing through Edge

Use this workflow when the user asks to publish ByteVerseToon content to Facebook, Instagram, or both. Do not infer social posting authorization from video creation or YouTube publishing alone. Use the current session's browser tools and documentation; do not hard-code tab IDs, element IDs, coordinates, or an old composer layout.

## Destinations and preferences

- Facebook Page: **Byte Verse Toon**, **@ByteVerseToon**, https://www.facebook.com/ByteVerseToon/ (profile ID 61595689487119).
- Instagram: **@byteversetoon**, https://www.instagram.com/byteversetoon/.
- YouTube: https://www.youtube.com/@ByteVerseToon.
- The user reported connecting the Page and Instagram on November 1, 2026. Verify the actual selected destinations on every composer; connection alone does not select both.
- Prefer the user's signed-in **Microsoft Edge extension** for this workflow. Reuse the selected Edge binding. Use available CUA/browser APIs for browser interaction and upload via the documented file chooser. Never use browser-profile files, cookies, private endpoints, or shell-driven browser automation.
- Instagram Reels use **9:16**. Preserve the entire frame for a source already in 9:16; otherwise select the explicit 9:16 crop and inspect text, faces, diagrams and endings for clipping. Profile-grid thumbnail framing is separate from Reel playback framing.

## Prepare and avoid duplicates

1. Determine the requested videos from the publication history, local exports and YouTube Shorts list. “All Shorts” means all distinct Shorts in the requested scope, not regular videos. Match source IDs and titles before posting.
2. Inspect existing Facebook and Instagram posts and saved manifests first. Skip matching published copies. An attempt or processing record is not proof of publication; resolve it before re-uploading.
3. Prefer reviewed local H.264/AAC MP4 exports. If absent, use the channel owner's official YouTube Studio download. Keep source files and pending uploads; cleanup requires the separate approved cleanup plan.
4. Use an informative opening caption, consistent ByteVerseToon branding, relevant hashtags and a clear invitation to watch more on YouTube. Include the channel and original Short URLs. Preserve required music attribution, sources and truthful synthetic-content disclosures. For Instagram, prefer a concise hook and “YouTube link in bio” once an actual bio link is verified; raw caption URLs do not replace the profile link.

## Upload and publish

- Verify the Page/account identity in the visible UI before uploading. Meta Business Suite can publish through the connected accounts. Its bulk uploader is useful when available; check the selected platforms and per-item captions. Native Instagram web is an alternative when Business Suite lacks a needed option.
- If publishing only to Instagram, deselect the Facebook Page. Never enable sharing to the user's personal Facebook profile as a substitute for the Page. Do not save a new global destination preference unless requested.
- Upload the correct file and caption, inspect the 9:16 preview, check processing/copyright feedback, and answer AI or sponsorship questions accurately. Keep required credits. Do not add paid boosts or change unrelated account settings.
- Publish within the user's explicit scope. Verify an authoritative success state and then the actual public Reel/profile listing. “Reel processing; will be published” is pending, not published. Do not click Share again merely because processing takes time.
- File chooser transfers in this environment have sometimes been very slow. Inspect the current composer state after a delay/error before retrying; a slow call may already have attached the file. Keep uploads sequential to avoid duplicates.
- If a platform displays a posting limit, restriction, CAPTCHA, verification or copyright block, stop dependent posting on that platform. Record the exact pending items and the visible reason. Do not bypass limits, switch identities to evade them, or repeatedly retry. Continue independent work on an unaffected authorized platform. Ask the user to complete verification when needed; do not request their code in chat.

## Record and report

Maintain a per-video manifest under `production/social-setup/` with source YouTube ID, local file, captions, target account, crop, actual publication status/date, public Reel URL and any blocker. Append social publication entries to the shared publication history when writable, preserving existing records. Verify the current history schema before writing.

Save a small screenshot showing the confirmed result and report actual counts separately for each platform. Explicitly list any pending videos; do not claim the batch is complete while any requested destination is blocked. Preserve public profile tabs as deliverables where supported.

For continuation of the initial November 1, 2026 batch, inspect `${BVT_WORKSPACE}/production/social-setup/all-shorts-2026-11-01/inventory.json` and `status.md`: the last verified state was Instagram 18/18 and Facebook 15/18. Touchscreen (`dL8QddlxvHs`), n8n (`CqjdGo8V_30`) and QR code (`Z_FvNtN_UVU`) were pending on Facebook because of a posting limit. Recheck live state before continuing; these are historical facts, not permanent account restrictions.

## YouTube publication

Use the same signed-in Edge extension when the user requests it. Verify the ByteVerseToon channel, upload the current final file once, fill prepared title/description, audience, language and truthful AI/sponsorship disclosures, and add the cover and timed SRT when available. Inspect checks and choose the requested visibility. Confirm the published URL and authoritative success state. Keep the source for Meta until both requested social posts are verified. A separately requested cleanup still needs the exact-file plan approval in SKILL.md.
