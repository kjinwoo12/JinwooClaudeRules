---
name: "audio-gen"
description: "Making sound effects with AI on the PC (Meta AudioGen) when the user asks: setup, English prompts, one batch run, level check, where the output may go"
---

# Audio generation (AudioGen)

(user 11/27 「이걸로 오디오 생성하는 스킬 만들어」, 「효과음 만들어야하는거 이걸로 만들어보자」)

## When
- The user asks to make sound with AI or AudioGen. Any other sound need: asset-sourcing first.
- Weights are CC-BY-NC 4.0 (non-commercial). Output is a draft to listen to; it goes into the team repo only when the user says so for that sound, since asset-sourcing bars AI generators there.

## Setup
- AudioGen folder: project info PC. It holds `.venv` (Python 3.10), `weights/` (6.4 GB, fetched on the first run), output in `samples/`; all three are in its `.git/info/exclude`.
- Rebuilding it: clone facebookresearch/audiocraft; `uv venv .venv --python 3.10`; torch 2.1.0, torchaudio 2.1.0, torchvision 0.16.0 from the PyTorch cu121 index; `requirements.txt` with `av` unpinned (11.0.0 has no Windows wheel) and without `pesq`, `gradio`; then `transformers==4.44.2` (5.x needs torch 2.6); then `pip install --no-deps -e .`.
- Needs a 16 GB GPU (medium model).

## Run
- Write the sounds as a JSON list: `name` (sheet row number and short English), `seconds`, `prompt`. For the project's needed sounds, take the art sheet rows (project info) whose 상태 is 「없음」.
- Prompt: plain English naming the event, source, and material ("a heavy body falling and hitting a concrete floor"). No Korean, no game terms; one event per clip.
- Run in the background with the folder's python: `<folder>\.venv\Scripts\python.exe scripts/gen_sfx.py <list.json> <out dir> [variants, default 2]`. The model loads once; each file is peak-normalized to -1 dB.

## Check and report
- You cannot hear it. Check each file's length, peak, and loudness (ffmpeg, as in asset-sourcing); tone stays unchecked.
- Send the files to the user with a table (row, file, prompt) and say they need a listen; the user picks the variant or asks for a new prompt.
- Leave the art sheet 상태 as is while a draft stays out of the repo.
