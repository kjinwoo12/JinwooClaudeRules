"""AudioGen으로 효과음 생성. AudioGen 폴더의 .venv python으로 실행.

사용: <AudioGen 폴더>\\.venv\\Scripts\\python.exe gen_sfx.py <list.json> <출력 폴더> [변형 수]
list.json: [{"name": "row87_pipe_swing", "seconds": 1.5, "prompt": "metal pipe swing whoosh"}, ...]
"""
import json
import os
import sys
from pathlib import Path

ROOT = Path(sys.prefix).parent  # .venv의 부모 = AudioGen 폴더
os.environ.setdefault("AUDIOCRAFT_CACHE_DIR", str(ROOT / "weights" / "audiocraft"))
os.environ.setdefault("HF_HOME", str(ROOT / "weights" / "hf"))

from audiocraft.data.audio import audio_write
from audiocraft.models import AudioGen

items = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
out = Path(sys.argv[2])
variants = int(sys.argv[3]) if len(sys.argv) > 3 else 2
out.mkdir(parents=True, exist_ok=True)

model = AudioGen.get_pretrained("facebook/audiogen-medium")
for item in items:
    model.set_generation_params(duration=item["seconds"])
    for i, wav in enumerate(model.generate([item["prompt"]] * variants), 1):
        path = audio_write(str(out / f"{item['name']}_{i}"), wav.cpu(), model.sample_rate)  # 피크 -1 dB
        print(path, flush=True)
