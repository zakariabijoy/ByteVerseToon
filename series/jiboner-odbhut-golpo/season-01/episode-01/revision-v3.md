# Version 3 — continuous character motion

User feedback, 2026-11-13: the hands and head looked cut apart throughout the
video, particularly Rafi's neck/collar and raised arm during the secret scene.

The version 2 rig rotated independently cut heads and body/arm pieces. Their
painted outlines and collar boundaries did not stay aligned in motion. Several
original atlas poses also extend beyond equal-width cells: blind cell cropping
could sever a raised hand or show a fragment of the neighboring pose.

The active version 3 Puppet composites the intact original pose, blink and
word-timed mouth overlay first, then deforms that single continuous surface.
Head motion blends smoothly down through the neck into the upper torso; arm
motion uses a smooth local field. Measured alpha-connected pose bounds keep the
complete painted hand while excluding neighboring poses. Expression changes
crossfade complete poses. The typing shot also uses continuous deformation,
with no separately rotated wrist patches.

Motion is intentionally subtle. This is illustrated 2D deformation with
approximate word-timed mouth shapes, not a newly modeled skeletal character.
The experimental version 2 rig and its artwork remain available for history.

Review evidence: full-size secret, Sajid reply, manager and Maya samples;
typing contact samples; Studio playback through secret, reply and manager
scenes. Final MP4 decode and decoded-frame checks are recorded separately in
verification-v3.json. Full listening and final user creative approval remain
pending. The script, recording, scene schedule, music and captions are unchanged.
