"""Original quiet tonal underscore and scene cues; no external samples."""
import array
import math
import pathlib
import sys
import wave

rate, duration = 22050, 92.96
folder = pathlib.Path(sys.argv[1])
chords = [(220, 261.626, 329.628), (174.614, 220, 261.626),
          (130.813, 164.814, 195.998), (195.998, 246.942, 293.665)]
cuts = [7.2333, 17.5, 29.9667, 39.9, 55.7667, 61.5, 71.3, 80.8667]
music, effects = array.array('h'), array.array('h')
for n in range(round(rate * duration)):
    t = n / rate
    block = t / 7.5
    index = int(block) % len(chords)
    phase = block % 1
    attack = min(1, phase * 12)
    release = min(1, (1-phase)*8)
    fade = min(1, t/2, (duration-t)/2)
    value = 0
    for k, hz in enumerate(chords[index]):
        value += (math.sin(math.tau*hz*t) + .15*math.sin(math.tau*hz*2*t)) / 3
    music.append(round(32767 * .013 * attack * release * fade * value))
    cue = 0
    for mark in cuts:
        local = t-mark
        if 0 <= local < .6:
            cue += .026*math.exp(-local*9)*math.sin(math.tau*(440*local+90*local*local))
    effects.append(round(32767*cue))
for name, samples in [('original-underscore.wav', music), ('scene-cues.wav', effects)]:
    with wave.open(str(folder/name), 'wb') as out:
        out.setnchannels(1)
        out.setsampwidth(2)
        out.setframerate(rate)
        out.writeframes(samples.tobytes())
    print(name)
