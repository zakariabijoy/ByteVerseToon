"""Generate a non-destructive frame-level speech envelope; no ASR or lip sync."""
import array
import json
import math
import pathlib
import sys
import wave

source, target = map(pathlib.Path, sys.argv[1:3])
with wave.open(str(source), 'rb') as audio:
    assert audio.getsampwidth() == 2 and audio.getnchannels() == 1
    rate = audio.getframerate()
    samples = array.array('h', audio.readframes(audio.getnframes()))
values = []
for frame in range(math.ceil(len(samples) / rate * 30)):
    block = samples[int(frame * rate / 30):int((frame + 1) * rate / 30)]
    rms = math.sqrt(sum(x*x for x in block) / max(1, len(block))) / 32768
    values.append(round(min(1, rms * 8), 3))
target.write_text(json.dumps(values), encoding='utf-8')
print(f'{len(values)} frames at 30 fps; source unchanged')
