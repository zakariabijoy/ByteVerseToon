"""Local Bengali ASR with word timing. Downloads public model files only.

Audio is opened locally by faster-whisper and never submitted to a service.
All model/runtime paths are supplied per PC; the original recording is untouched.
"""
import argparse
import json
import pathlib
import sys
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

parser = argparse.ArgumentParser()
parser.add_argument('--tools-root', required=True)
parser.add_argument('--audio', required=True)
parser.add_argument('--output', required=True)
parser.add_argument('--script', required=True)
parser.add_argument('--model', choices=['small','turbo'], default='small')
args = parser.parse_args()
root = pathlib.Path(args.tools_root)
sys.path.insert(0, str(root / 'python'))
sys.path.insert(0, str(root / 'compat-av'))

from huggingface_hub import snapshot_download
from faster_whisper import WhisperModel

repo = 'Systran/faster-whisper-small' if args.model == 'small' else 'mobiuslabsgmbh/faster-whisper-large-v3-turbo'
revision = '536b0662742c02347bc0e980a01041f333bce120' if args.model == 'small' else '0a363e9161cbc7ed1431c9597a8ceaf0c4f78fcf'
model_folder = root / 'models' / ('faster-whisper-' + args.model)
revision_record = root / 'models' / (args.model + '-revision.json')
if not (model_folder / 'model.bin').exists():
    print('Downloading pinned public multilingual model:', repo, revision, flush=True)
    snapshot_download(
        repo_id=repo, revision=revision,
        token=False, local_dir=str(model_folder),
        allow_patterns=['config.json', 'model.bin', 'tokenizer.json',
                        'vocabulary.*', 'preprocessor_config.json'],
    )
    revision_record.parent.mkdir(parents=True, exist_ok=True)
    revision_record.write_text(json.dumps({'repository': repo, 'revision': revision}), encoding='utf-8')

script = pathlib.Path(args.script).read_text(encoding='utf-8')
prompt = 'রাফি আহমেদ, সাজিদ, মায়া, সফটওয়্যার কোম্পানি, প্রজেক্ট, ম্যানেজার।'
model = WhisperModel(str(model_folder), device='cpu', compute_type='int8', cpu_threads=8, local_files_only=True)
segments, info = model.transcribe(
    args.audio, language='bn', task='transcribe', beam_size=5,
    word_timestamps=True, condition_on_previous_text=False,
    initial_prompt=prompt, vad_filter=False,
)
result = {'language': info.language, 'duration': info.duration,
          'model': json.loads(revision_record.read_text(encoding='utf-8')),
          'segments': [], 'processing': 'local_only'}
for segment in segments:
    item = {'start': segment.start, 'end': segment.end, 'text': segment.text,
            'words': [{'text': w.word, 'start': w.start, 'end': w.end,
                       'probability': w.probability} for w in segment.words or []]}
    result['segments'].append(item)
    pathlib.Path(args.output).write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'{segment.start:6.2f}-{segment.end:6.2f} {segment.text}', flush=True)
pathlib.Path(args.output).write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
print('Local transcription saved:', args.output, flush=True)
