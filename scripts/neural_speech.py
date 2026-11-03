"""Generate the user's preferred ByteVerseToon narration locally."""
import json
import os
from pathlib import Path
import sys
import wave


def main():
    story_path, output_path = map(Path, sys.argv[1:3])
    import ctypes
    documents_buffer = ctypes.create_unicode_buffer(32768)
    if os.name == 'nt':
        result = ctypes.windll.shell32.SHGetFolderPathW(None, 5, None, 0, documents_buffer)
        if result != 0:
            raise RuntimeError('Cannot resolve the current Windows Documents folder')
        documents = Path(documents_buffer.value)
    else:
        documents = Path.home() / 'Documents'
    runtime = Path(os.environ.get('BVT_VOICE_RUNTIME', str(documents / 'Codex/ByteVerseToon/runtime/neural-voice')))
    for name in ['python', 'kokoro-v1.0.int8.onnx', 'voices-v1.0.bin']:
        if not (runtime / name).exists():
            raise RuntimeError(f'Missing neural voice dependency: {runtime / name}. See voice-setup.md; do not substitute another voice.')
    sys.path.insert(0, str(runtime / 'python'))
    import numpy as np
    import onnxruntime as ort
    from kokoro_onnx import Kokoro
    options = ort.SessionOptions()
    options.intra_op_num_threads = 4
    options.inter_op_num_threads = 1
    session = ort.InferenceSession(str(runtime / 'kokoro-v1.0.int8.onnx'), sess_options=options, providers=['CPUExecutionProvider'])
    narrator = Kokoro.from_session(session, str(runtime / 'voices-v1.0.bin'))
    story = json.loads(story_path.read_text(encoding='utf-8-sig'))
    output_path.mkdir(parents=True, exist_ok=True)
    records = []
    for scene in story['scenes']:
        sentences = scene['narration']
        if isinstance(sentences, str):
            sentences = [sentences]
        for text in sentences:
            target = output_path / f'voice{len(records)}.wav'
            if target.exists():
                raise FileExistsError(f'Choose an empty narration directory: {target}')
            samples, rate = narrator.create(text, voice='af_heart', speed=0.98, lang='en-us')
            samples = np.concatenate([np.zeros(int(rate * .05)), samples, np.zeros(int(rate * .1))]).astype(np.float32)
            rms = float(np.sqrt(np.mean(samples ** 2)))
            if rms < .001:
                raise RuntimeError('Silent narration track')
            peak = float(np.max(np.abs(samples)))
            if peak > .92:
                samples *= .92 / peak
            with wave.open(str(target), 'wb') as audio:
                audio.setnchannels(1)
                audio.setsampwidth(2)
                audio.setframerate(rate)
                audio.writeframes((np.clip(samples, -1, 1) * 32767).astype('<i2').tobytes())
            records.append({'file': target.name, 'seconds': len(samples) / rate, 'rms': rms})
    details = {'engine': 'Kokoro ONNX v1.0 int8', 'voice': 'af_heart', 'language': 'en-us', 'speed': .98, 'tracks': records}
    (output_path / 'voice-details.json').write_text(json.dumps(details, indent=2), encoding='utf-8')
    print(json.dumps({'success': True, 'voice': 'af_heart', 'tracks': len(records)}))


if __name__ == '__main__':
    main()
