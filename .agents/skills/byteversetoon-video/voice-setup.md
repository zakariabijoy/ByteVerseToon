# Preferred female narration

The user approved Kokoro `af_heart`, American English, speed `0.98`, on 2026-10-23. Use it for Shorts and regular videos unless the user asks to change it. Never silently fall back to Windows System.Speech.

Runtime directory on this PC: `${BVT_WORKSPACE}/shared/runtime/neural-voice`, or `BVT_VOICE_RUNTIME`. Keep this shared runtime during per-video cleanup. It is approximately 249 MB, separate from disposable output media.

For a new PC, use the bundled Python runtime. Install the following into the runtime's `python` directory using Python's pip with `--target` and `--no-cache-dir`: `kokoro-onnx==0.6.1`, `onnxruntime==1.31.0`, and `espeakng-loader==0.2.4` (with their dependencies). Fetch these model files from the official project's release:

- https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.int8.onnx
- https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin

The wrapper is MIT licensed; the Kokoro model is Apache 2.0. Voice documentation: https://huggingface.co/hexgrad/Kokoro-82M/blob/main/VOICES.md . No paid speech service or account is required.

Run `scripts/neural_speech.py STORYBOARD_JSON EMPTY_NARRATION_DIRECTORY`. It accepts narration strings or sentence arrays. If the Windows pronunciation DLL is blocked by sandbox permissions, request approved execution of the same command; do not change system policy or silently choose an inferior voice. Report a concrete dependency failure if setup cannot finish.

For Shorts, write concise narration and check actual clip durations. Shorten text that exceeds the renderer's scene budget. Preserve the approved voice's natural pace.

## Bangla version only on explicit request

User confirmed 2026-11-02: keep Heart for English for channel consistency; use Nabanita when they also request a Bangla version. Applies to Shorts and regular videos. Do not make every episode bilingual automatically.

Approved voice: Microsoft `bn-BD-NabanitaNeural`, female, Bangla (Bangladesh). Four Bangla previews were generated successfully; user selected Nabanita. Start at normal rate (`+0%`) and pitch (`+0Hz`), adapting text and pauses before forcing a duration. This voice uses an online service, unlike local Kokoro. The user selected it after this distinction was disclosed; it is a speech-specific exception, not authorization for paid services or cloud rendering. The offline shhossain/BanglaTTS male/female voices are separate and have not been selected or tested here. Never substitute them silently.

A historical preview used edge-tts 7.3.1. That PC-specific preview is not bundled; configure and verify an approved local environment before generating Bangla. It generated synthetic narration without a paid API key. Check availability before production; report a concrete failure rather than changing voices. Preserve this setup and the selected preview unless cleanup specifically includes them.

For a requested Bangla version, retain the English original, adapt the script naturally in Bangla, verify technical-name pronunciation, generate and measure scene audio, retime the animation, and check Bengali font shaping for any translated labels or captions. Record language and voice in episode metadata. Review before publication; choosing a voice does not publish a version.
