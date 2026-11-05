#!/usr/bin/env python3
"""Transcribe both ElevenLabs takes per segment with local faster-whisper and
keep the one closest to the script (copies it to audio/tts/<ID>.mp3)."""
import difflib, json, os, re, shutil
from faster_whisper import WhisperModel

import subprocess as _sp, numpy as _np
def load16k(path):
    raw = _sp.run(['ffmpeg', '-v', 'error', '-i', path, '-f', 'f32le', '-ac', '1', '-ar', '16000', '-'], capture_output=True, check=True).stdout
    return _np.frombuffer(raw, dtype=_np.float32).copy()
HERE = os.path.dirname(os.path.abspath(__file__))
segs = json.load(open(os.path.join(HERE, 'segments.json')))
m = WhisperModel('small', device='cpu', compute_type='int8')
norm = lambda s: [re.sub(r'[^\w]', '', w.lower()) for w in s.split() if re.sub(r'[^\w]', '', w)]
os.makedirs(os.path.join(HERE, 'audio', 'tts'), exist_ok=True)
rep = {}
for s in segs:
    text = re.sub(r'\[[^\]]+\]\s*', '', s['text'])
    best = None
    for k in (1, 2):
        p = os.path.join(HERE, 'audio', 'takes', f"{s['id']}_{k}.mp3")
        res, _ = m.transcribe(load16k(p), language='ms', initial_prompt=text)
        heard = ' '.join(x.text.strip() for x in res)
        sc = difflib.SequenceMatcher(None, norm(text), norm(heard)).ratio()
        rep[f"{s['id']}_{k}"] = {'score': round(sc, 3), 'heard': heard}
        if best is None or sc > best[0] + 1e-9:
            best = (sc, k)
    shutil.copy(os.path.join(HERE, 'audio', 'takes', f"{s['id']}_{best[1]}.mp3"), os.path.join(HERE, 'audio', 'tts', f"{s['id']}.mp3"))
    rep[s['id'] + '_chosen'] = best[1]
    print(s['id'], 'take', best[1], f"{best[0]:.2f}", '|', rep[f"{s['id']}_{best[1]}"]['heard'])
json.dump(rep, open(os.path.join(HERE, 'audio', 'take_check.json'), 'w'), indent=1, ensure_ascii=False)
