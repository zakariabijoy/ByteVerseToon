"""Decode the complete deliverable, assert format and save mobile QA frames."""
import argparse
import hashlib
import json
import subprocess
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument("ffmpeg")
parser.add_argument("ffprobe")
parser.add_argument("directory", type=Path)
parser.add_argument("voice", type=Path)
parser.add_argument("--version", type=int, default=1)
parser.add_argument("--frames", default="20,225,330,580,745,1190,1295,1530,1850,2050,2250,2520,2730,2890,3030,3130")
args = parser.parse_args()
video = args.directory / "preview-safe.mp4"

def run(command):
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError(result.stderr)
    return result

probe = json.loads(run([args.ffprobe, "-v", "error", "-show_streams", "-show_format", "-of", "json", str(video)]).stdout)
picture = next(s for s in probe["streams"] if s["codec_type"] == "video")
audio = next(s for s in probe["streams"] if s["codec_type"] == "audio")
assert (picture["width"], picture["height"]) == (540, 960)
assert picture["codec_name"] == "h264" and picture["pix_fmt"] == "yuv420p"
assert picture["color_range"] == "tv"
assert picture["avg_frame_rate"] == "30/1" and int(picture["nb_frames"]) == 3166
assert audio["codec_name"] == "aac" and int(audio["sample_rate"]) == 48000
assert int(audio["channels"]) == 2
assert abs(float(probe["format"]["duration"]) - 3166 / 30) < 0.05
decoded = run([args.ffmpeg, "-v", "error", "-xerror", "-i", str(video), "-f", "null", "-"])
assert not decoded.stderr.strip(), decoded.stderr
sha = hashlib.sha256(args.voice.read_bytes()).hexdigest().upper()
assert sha == "B949FFD68CBFE429FF070C842F39CA92BF4536D010D8D27F2478BAD47C964FDE"
frames = sorted(set(int(value) for value in args.frames.split(",")))
assert frames and all(0 <= frame < 3166 for frame in frames)
selection = "+".join(f"eq(n\\,{frame})" for frame in frames)
run([args.ffmpeg, "-v", "error", "-n", "-i", str(video), "-vf", f"select={selection},scale=360:640", "-fps_mode", "vfr", "-frames:v", str(len(frames)), str(args.directory / "decoded-safe-mobile-%02d.png")])
mastering = json.loads((args.directory / "audio-mastering.json").read_text())
assert abs(float(mastering["finalMeasurement"]["input_i"]) + 16) <= .6
assert float(mastering["finalMeasurement"]["input_tp"]) <= -1
report = {
    "version": args.version, "composition": "Episode06", "dimensions": [540, 960],
    "fps": 30, "durationFrames": 3166, "durationSeconds": float(probe["format"]["duration"]),
    "videoCodec": picture["codec_name"], "pixelFormat": picture["pix_fmt"], "colorRange": picture["color_range"],
    "audioCodec": audio["codec_name"], "audioSampleRate": 48000, "audioChannels": 2,
    "completeAudioVideoDecode": "passed", "sourceVoiceSha256": sha,
    "sourceOriginalPreserved": True, "voiceEditsApplied": False, "originalRecordingBitIdentical": True, "voicePlaybackRate": 1,
    "loudnessLufs": float(mastering["finalMeasurement"]["input_i"]),
    "truePeakDb": float(mastering["finalMeasurement"]["input_tp"]),
    "mp4Sha256": hashlib.sha256(video.read_bytes()).hexdigest().upper(),
    "mp4Bytes": video.stat().st_size,
    "decodedMobileFrames": frames,
    "fullListeningReview": "pending", "creativeApproval": "pending_user_review",
    "mouthTiming": "Rafi_and_Sajid_approximate_word_timed;mother_intact_expression_no_uncalibrated_overlay;not_verified_phonemes",
    "publication": "not_requested", "purpose": "540p_animated_review_not_final_delivery",
}
(args.directory / "verification.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
print(json.dumps(report, indent=2))
