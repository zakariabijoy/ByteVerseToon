"""Two-pass loudness mastering and compatible limited-range H.264 delivery."""
import argparse
import json
import re
import subprocess
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument("ffmpeg")
parser.add_argument("directory", type=Path)
args = parser.parse_args()
source = args.directory / "video-unmastered.mp4"
target = args.directory / "video.mp4"
if target.exists():
    raise SystemExit("Existing master preserved; choose a new version directory.")

def run(arguments):
    result = subprocess.run([args.ffmpeg, "-hide_banner", *arguments], capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError(result.stderr)
    return result.stderr

measurement = run(["-i", str(source), "-vn", "-af", "loudnorm=I=-16:TP=-1.2:LRA=11:print_format=json", "-f", "null", "-"])
stats = json.loads(re.findall(r"\{[^{}]*\}", measurement)[-1])
filters = (
    "loudnorm=I=-16:TP=-1.2:LRA=11:"
    f"measured_I={stats['input_i']}:measured_TP={stats['input_tp']}:"
    f"measured_LRA={stats['input_lra']}:measured_thresh={stats['input_thresh']}:"
    f"offset={stats['target_offset']}:linear=true:print_format=json,"
    "apad,atrim=duration=92.966666667"
)
mastering = run(["-n", "-i", str(source), "-map", "0:v:0", "-map", "0:a:0", "-vf", "scale=in_range=auto:out_range=tv,format=yuv420p", "-c:v", "libx264", "-crf", "18", "-preset", "veryfast", "-color_range", "tv", "-af", filters, "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2", "-movflags", "+faststart", str(target)])
verification = run(["-i", str(target), "-vn", "-af", "loudnorm=I=-16:TP=-1:LRA=11:print_format=json", "-f", "null", "-"])
final = json.loads(re.findall(r"\{[^{}]*\}", verification)[-1])
report = {"targetLufs": -16, "limiterTruePeakDb": -1.2, "deliveryTruePeakCeilingDb": -1, "sourceMeasurement": stats, "finalMeasurement": final, "picture": "limited_range_yuv420p_h264_crf18", "sourceWav": "unchanged"}
(args.directory / "audio-mastering.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
print(json.dumps({"output": str(target), "lufs": final["input_i"], "truePeakDb": final["input_tp"]}))
