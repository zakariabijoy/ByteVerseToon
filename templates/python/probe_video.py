"""Inspect and fully decode an export. Standard library only; no creative QA claim."""
import argparse
import json
import subprocess
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('video', type=Path)
    parser.add_argument('--ffprobe', default='ffprobe')
    parser.add_argument('--ffmpeg', default='ffmpeg')
    args = parser.parse_args()
    if not args.video.is_file():
        parser.error('Video does not exist')
    info = subprocess.run([args.ffprobe, '-v', 'error', '-show_streams', '-show_format',
                           '-of', 'json', str(args.video)], check=True, capture_output=True, text=True)
    subprocess.run([args.ffmpeg, '-v', 'error', '-xerror', '-i', str(args.video),
                    '-map', '0:v:0', '-map', '0:a?', '-f', 'null', '-'], check=True)
    result = json.loads(info.stdout)
    result['full_decode'] = 'passed'
    result['creative_review'] = 'pending'
    result['full_listening_review'] = 'pending'
    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()
