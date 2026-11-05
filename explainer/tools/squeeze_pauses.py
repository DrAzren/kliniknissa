#!/usr/bin/env python3
"""Shorten silent pauses inside a narration take (free, no re-generation).
Finds runs of low energy between t0 and t1 seconds and shrinks each to `keep`
seconds with short crossfades.

    python3 tools/squeeze_pauses.py in.mp3 out.mp3 --from 0.7 --to 2.0 --keep 0.04
"""
import argparse, subprocess
import numpy as np
ap = argparse.ArgumentParser()
ap.add_argument('src'); ap.add_argument('dst')
ap.add_argument('--from', dest='t0', type=float, default=0.0)
ap.add_argument('--to', dest='t1', type=float, default=1e9)
ap.add_argument('--keep', type=float, default=0.04)
ap.add_argument('--db', type=float, default=-40.0)
ap.add_argument('--min', dest='mn', type=float, default=0.07)
a = ap.parse_args()
SR = 44100
x = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', a.src, '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True, check=True).stdout, np.float32).copy()
f = int(SR * 0.01)
db = np.array([10 * np.log10(np.mean(x[i * f:(i + 1) * f] ** 2) + 1e-12) for i in range(len(x) // f)])
runs, i = [], 0
while i < len(db):
    if db[i] < a.db and a.t0 <= i / 100 <= a.t1:
        j = i
        while j < len(db) and db[j] < a.db:
            j += 1
        if (j - i) / 100 >= a.mn and i > 0 and j < len(db):
            runs.append((i * f, j * f))
        i = j
    else:
        i += 1
out, pos, fade = [], 0, int(0.008 * SR)
for s, e in runs:
    k = int(a.keep * SR)
    m = s + k // 2
    n = e - k // 2
    seg = x[pos:m].copy()
    nxt = x[n:n + fade].copy()
    if len(seg) > fade:
        seg[-fade:] = seg[-fade:] * np.linspace(1, 0, fade) + nxt[:fade] * np.linspace(0, 1, fade)
    out.append(seg)
    pos = n + fade
    print(f'pause {s / SR:.2f}-{e / SR:.2f}s ({(e - s) / SR:.2f}s) -> {a.keep:.2f}s')
out.append(x[pos:])
y = np.concatenate(out)
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', '-c:a', 'libmp3lame', '-b:a', '192k', a.dst], input=y.astype(np.float32).tobytes(), check=True)
print('wrote', a.dst, f'{len(x) / SR:.2f}s -> {len(y) / SR:.2f}s')
