"""Create editable narration blocks at pauses, without resampling or changing speed.

Pause-based paragraph boundaries are a draft editorial alignment, pending listening
review in Studio. Original recording is preserved alongside these clips.
"""
from pathlib import Path
import json
import wave
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
AUDIO = ROOT / 'public' / 'audio'
with wave.open(str(AUDIO / 'E01-Ananya-original.wav')) as source:
    params = source.getparams()
    original = source.readframes(source.getnframes())
    duration = params.nframes / params.framerate

boundaries = [0, 4.9, 11.56, 17.66, 26.06, 31.6, 37.81, 41.99, duration]
slots = [6, 8, 8, 10, 8, 8, 7, 5]
manifest = []
cursor = 0
for i, (start, end, slot) in enumerate(zip(boundaries, boundaries[1:], slots), 1):
    a, b = round(start * params.framerate), round(end * params.framerate)
    data = original[a * params.sampwidth * params.nchannels:b * params.sampwidth * params.nchannels]
    name = f'E01-{i:02d}.wav'
    with wave.open(str(AUDIO / name), 'wb') as out:
        out.setparams(params)
        out.writeframes(data)
    manifest.append(dict(file=name, source_start=start, source_end=end,
                         timeline_start=cursor, slot_seconds=slot,
                         audio_seconds=round((b-a)/params.framerate, 4),
                         playback_rate=1, alignment='draft-pause-based'))
    cursor += slot

# Quiet original synthesized rain bed, deliberately below the narrator.
# Fixed RNG makes the asset reproducible. This is sound design, not a field recording.
rate = 22050
rng = np.random.default_rng(17)
noise = rng.normal(0, 1, int(42 * rate))
rain = (noise + np.roll(noise, 1) * .6 + np.roll(noise, 2) * .3) * .014
envelope = np.minimum(np.arange(len(rain)) / rate, 1) * np.minimum((len(rain)-np.arange(len(rain))) / rate, 1)
with wave.open(str(AUDIO / 'rain-bed.wav'), 'wb') as out:
    out.setnchannels(1)
    out.setsampwidth(2)
    out.setframerate(rate)
    out.writeframes((np.clip(rain * envelope, -1, 1) * 32767).astype('<i2').tobytes())

(ROOT / 'production' / 'audio-edit.json').write_text(json.dumps({
    'original_seconds': duration, 'timeline_seconds': cursor,
    'speech_speed_changed': False, 'clips': manifest,
    'review_note': 'Cuts fall in detected silences. Confirm paragraph/shot correspondence by listening in Studio.'
}, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'Prepared {len(manifest)} clips; original {duration:.2f}s; timeline {cursor}s; rate unchanged.')
