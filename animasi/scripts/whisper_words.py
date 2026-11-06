"""Masa setiap perkataan dengan faster-whisper (sandaran). pip install faster-whisper"""
import json, sys
from faster_whisper import WhisperModel
src, out = sys.argv[1], sys.argv[2]
model = WhisperModel("small", device="auto", compute_type="int8")
segs, _ = model.transcribe(src, language="ms", word_timestamps=True)
words = [{"text": w.word.strip(), "start": round(w.start, 3), "end": round(w.end, 3)} for s in segs for w in s.words]
json.dump({"words": words}, open(out, "w"), ensure_ascii=False, indent=1)
print(len(words), "perkataan")
