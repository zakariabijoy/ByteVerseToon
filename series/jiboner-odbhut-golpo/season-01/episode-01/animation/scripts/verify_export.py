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
parser.add_argument("--version", type=int, default=2)
parser.add_argument("--frames", default="80,1400,2788")
args = parser.parse_args()
video = args.directory / "video.mp4"

def run(command):
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError(result.stderr)
    return result

probe = json.loads(run([args.ffprobe, "-v", "error", "-show_streams", "-show_format", "-of", "json", str(video)]).stdout)
picture = next(s for s in probe["streams"] if s["codec_type"] == "video")
audio = next(s for s in probe["streams"] if s["codec_type"] == "audio")
assert (picture["width"], picture["height"]) == (1080, 1920)
assert picture["codec_name"] == "h264" and picture["pix_fmt"] == "yuv420p"
assert picture["avg_frame_rate"] == "30/1" and int(picture["nb_frames"]) == 2789
assert audio["codec_name"] == "aac" and int(audio["sample_rate"]) == 48000
assert int(audio["channels"]) == 2
assert abs(float(probe["format"]["duration"]) - 2789 / 30) < 0.05
decoded = run([args.ffmpeg, "-v", "error", "-xerror", "-i", str(video), "-f", "null", "-"])
assert not decoded.stderr.strip(), decoded.stderr
sha = hashlib.sha256(args.voice.read_bytes()).hexdigest().upper()
assert sha == "351ABDFB58CEC2D772C32326F1DCEA6F0429A4FC9E8F41A2708C14115125A236"
frames = sorted(set(int(value) for value in args.frames.split(",")))
assert frames and all(0 <= frame < 2789 for frame in frames)
selection = "+".join(f"eq(n\\,{frame})" for frame in frames)
run([args.ffmpeg, "-v", "error", "-n", "-i", str(video), "-vf", f"select={selection},scale=360:640", "-fps_mode", "vfr", "-frames:v", str(len(frames)), str(args.directory / "decoded-mobile-%02d.png")])
mastering = json.loads((args.directory / "audio-mastering.json").read_text())
report = {
    "version": args.version, "composition": "Episode01", "dimensions": [1080, 1920],
    "fps": 30, "durationFrames": 2789, "durationSeconds": float(probe["format"]["duration"]),
    "videoCodec": picture["codec_name"], "pixelFormat": picture["pix_fmt"],
    "audioCodec": audio["codec_name"], "audioSampleRate": 48000, "audioChannels": 2,
    "completeAudioVideoDecode": "passed", "sourceVoiceSha256": sha,
    "sourceVoiceUnchanged": True, "voicePlaybackRate": 1,
    "loudnessLufs": float(mastering["finalMeasurement"]["input_i"]),
    "truePeakDb": float(mastering["finalMeasurement"]["input_tp"]),
    "mp4Sha256": hashlib.sha256(video.read_bytes()).hexdigest().upper(),
    "mp4Bytes": video.stat().st_size,
    "decodedMobileFrames": frames,
    "fullListeningReview": "pending", "creativeApproval": "pending_user_review",
    "mouthTiming": "approximate_word_timed_grapheme_shapes_not_verified_phonemes",
    "publication": "not_requested",
}
(args.directory / "verification.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
print(json.dumps(report, indent=2))
