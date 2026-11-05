#!/usr/bin/env python3
"""Soundtrack for the Aedes/denggi explainer, synthesised from scratch (no
samples, no licensed music) and timed from timeline.json.

Layers: an emotional minor piano + pad for the hook, a warm hopeful pluck
groove for the explainer, a tense pulse under the warning signs, an uplifting
resolve for the CTA; mosquito buzz (swarm and single), whooshes on cuts, pops
on graphic reveals. Music is side-chain ducked under the narration (if
audio/narration.mp3 exists) and the mix is normalised to -14 LUFS.

    python3 episodes/denggi/build_audio.py      # -> output/mix.wav
"""
import json, os, re, subprocess
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'output')
os.makedirs(OUT, exist_ok=True)
SR = 44100
TL = json.load(open(os.path.join(HERE, 'timeline.json')))
DUR = TL['total'] + 0.5
N = int(SR * DUR)
SEG = {s['id']: s for s in TL['segments']}
rs = np.random.default_rng(7)
bare = lambda s: re.sub(r'[^\w]', '', s.lower())


def w(seg, word, n=0):
    ws = [x for x in TL['words'] if x['seg'] == seg and bare(x['text']) == word]
    return ws[min(n, len(ws) - 1)]['start'] if ws else SEG[seg]['start']


def T(sec):
    return np.arange(int(sec * SR)) / SR


def place(buf, sig, at, gain=1.0, pan=0.0):
    i = int(max(0, at) * SR)
    if i >= len(buf):
        return
    sig = sig[: len(buf) - i]
    l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    buf[i:i + len(sig), 0] += sig * gain * l * 1.414
    buf[i:i + len(sig), 1] += sig * gain * r * 1.414


def env(n, a=0.01, r=0.3, curve=3.0):
    e = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    if na: e[:na] = np.linspace(0, 1, na)
    tail = np.exp(-curve * np.linspace(0, 1, n - na))
    e[na:] *= tail
    if nr: e[-nr:] *= np.linspace(1, 0, nr)
    return e


try:
    from scipy.signal import lfilter

    def onepole(x, a):
        return lfilter([a], [1, a - 1], x)
except ImportError:  # slow fallback
    def onepole(x, a):
        y = np.empty_like(x)
        s = 0.0
        for i in range(len(x)):
            s += a * (x[i] - s)
            y[i] = s
        return y


def lowpass(x, fc):
    a = 1 - np.exp(-2 * np.pi * fc / SR)
    return onepole(onepole(x, a), a)


def mtof(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def piano(f, dur, vel=0.5):
    t = T(dur)
    s = sum(np.sin(2 * np.pi * f * k * t + k) * (0.6 / k ** 1.4) * np.exp(-t * (1.2 + k * 0.9)) for k in range(1, 7))
    return s * vel * env(len(t), 0.004, 0.08, 0.5)


def pad(f, dur, vel=0.2):
    t = T(dur)
    s = sum(np.sin(2 * np.pi * f * (1 + d) * t) for d in (-0.004, 0, 0.0045)) / 3
    s += 0.3 * np.sin(2 * np.pi * f * 2 * t)
    e = np.minimum(1, t / 0.8) * np.minimum(1, (dur - t) / 0.8)
    return s * e * vel


def pluck(f, dur=0.6, vel=0.4):
    t = T(dur)
    s = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(4 * np.pi * f * t) * np.exp(-t * 8) + 0.15 * np.sin(6 * np.pi * f * t) * np.exp(-t * 12)
    return s * vel * np.exp(-t * 5.5) * np.minimum(1, t / 0.003)


def kick(vel=0.6):
    t = T(0.35)
    f = 50 + 90 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) * vel


def shaker(vel=0.15):
    t = T(0.08)
    return rs.standard_normal(len(t)) * np.exp(-t * 60) * vel


def heartbeat(vel=0.5):
    out = np.zeros(int(0.7 * SR))
    for d, g in ((0, 1.0), (0.22, 0.7)):
        k = kick(vel * g)
        i = int(d * SR)
        out[i:i + len(k)] += lowpass(k, 180)
    return out


music = np.zeros((N, 2))
tB = SEG['B']['start']
tG, tH, tK = SEG['G']['start'], SEG['H']['start'], SEG['K']['start']
END = TL['voice_end']

# ---- hook: A minor, slow piano + pad + heartbeat (emotional)
prog_hook = [(57, [57, 60, 64]), (53, [53, 57, 60]), (48, [55, 60, 64]), (55, [55, 59, 62])]
bar = 2.2
t = 0.0
i = 0
while t < tB:
    root, ch = prog_hook[i % 4]
    place(music, pad(mtof(root - 12), bar + 0.8, 0.14), t)
    for j, m in enumerate(ch):
        place(music, piano(mtof(m + 12), 2.4, 0.16), t + j * 0.36, pan=(j - 1) * 0.3)
    place(music, piano(mtof(ch[-1] + 24), 1.8, 0.08), t + 1.4, pan=0.4)
    t += bar
    i += 1
for hb in np.arange(SEG['A2']['start'], tB - 0.3, 1.1):
    place(music, heartbeat(0.35), hb)

# ---- explainer groove: C major, 100 bpm, plucks + soft kick + shaker
beat = 60 / 100
prog = [(48, [60, 64, 67]), (45, [57, 60, 64]), (41, [57, 60, 65]), (43, [55, 59, 62])]


def groove(t0, t1, minor=False, vel=1.0):
    p = [(45, [57, 60, 64]), (41, [53, 57, 60]), (43, [55, 59, 62]), (40, [52, 55, 59])] if minor else prog
    t = t0
    b = 0
    while t < t1:
        root, ch = p[(b // 4) % 4]
        if b % 4 == 0:
            place(music, pad(mtof(root), beat * 4 + 0.5, 0.07 * vel), t)
            place(music, lowpass(pluck(mtof(root - 12), 0.9, 0.5 * vel), 400), t)
        arp = ch[(b * 3) % 3] + (12 if b % 2 else 0)
        place(music, pluck(mtof(arp + 12), 0.5, 0.11 * vel), t, pan=0.25 * np.sin(b))
        place(music, pluck(mtof(ch[(b + 1) % 3] + 12), 0.4, 0.07 * vel), t + beat / 2, pan=-0.25)
        if not minor or b % 2 == 0:
            place(music, kick(0.25 * vel), t)
        place(music, shaker(0.05 * vel), t + beat / 2, pan=0.3)
        t += beat
        b += 1


groove(tB, tG)
groove(tG, tH, minor=True, vel=0.8)
groove(tH, tK)
groove(tK, END + 0.2, vel=1.1)
# final resolve chord under the end card
for j, m in enumerate([60, 64, 67, 72]):
    place(music, piano(mtof(m), 4.0, 0.2), END + 0.1 + j * 0.08)
place(music, pad(mtof(48), 4.4, 0.16), END)
# fade the whole bed in/out
fade = np.ones(N)
fade[:int(0.3 * SR)] = np.linspace(0, 1, int(0.3 * SR))
fade[-int(2.2 * SR):] *= np.linspace(1, 0, int(2.2 * SR))
music *= fade[:, None]

# ---- sfx
sfx = np.zeros((N, 2))


def buzz(dur, f0=560, n=1, vel=0.2, seed=1):
    r = np.random.default_rng(seed)
    t = T(dur)
    s = np.zeros(len(t))
    for k in range(n):
        f = f0 * (0.85 + 0.3 * r.random())
        vib = 1 + 0.03 * np.sin(2 * np.pi * (5 + 4 * r.random()) * t + r.random() * 6)
        ph = 2 * np.pi * np.cumsum(f * vib) / SR
        saw = 2 * ((ph / (2 * np.pi)) % 1) - 1
        am = 0.6 + 0.4 * np.sin(2 * np.pi * (0.7 + r.random()) * t + r.random() * 6)
        s += saw * am
    s = s / np.sqrt(n)
    s = s - lowpass(s, 300)          # thin, whiny
    s = lowpass(s, 3500)
    return s * vel


def whoosh(vel=0.25):
    t = T(0.6)
    n = rs.standard_normal(len(t))
    e = np.sin(np.pi * np.minimum(1, t / 0.6)) ** 2
    return lowpass(n, 900) * e * vel * 3


def pop(vel=0.25):
    t = T(0.12)
    f = 900 + 600 * np.exp(-t * 40)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 35) * vel


def chime(vel=0.2):
    s = np.zeros(int(1.2 * SR))
    for j, m in enumerate([84, 88, 91]):
        p = piano(mtof(m), 0.9, vel)
        i = int(j * 0.07 * SR)
        s[i:i + len(p)] += p
    return s


def alarm(dur, vel=0.08):
    t = T(dur)
    return np.sin(2 * np.pi * (660 + 120 * np.sign(np.sin(2 * np.pi * 1.2 * t))) * t) * vel * np.minimum(1, t / 0.2) * np.minimum(1, (dur - t) / 0.3)


# swarm: rises with the cloud during A1, fades into A2
a1 = SEG['A1']
sw = buzz(a1['end'] - a1['start'] + 1.2, 520, n=14, vel=0.32, seed=3)
e = np.minimum(1, T(len(sw) / SR) / 1.5) * np.minimum(1, (len(sw) / SR - T(len(sw) / SR)) / 1.0)
place(sfx, sw * e, 0.0, pan=0.0)
# single mosquito approaching, then silence on landing (bite)
a2 = SEG['A2']['start']
single = buzz(1.15, 620, n=1, vel=0.5, seed=9) * np.linspace(0.2, 1, int(1.15 * SR))
place(sfx, single, a2, pan=-0.3)
# whooshes on cuts
for s in TL['segments'][1:]:
    place(sfx, whoosh(0.22), s['start'] - 0.3)
place(sfx, whoosh(0.25), END - 0.3)
# pops on reveals (chips and list rows)
pops = [SEG[k]['start'] + 0.15 for k in ['C', 'D', 'F', 'G', 'H', 'J']]
pops += [w('C', x) for x in ['anopheles', 'culex', 'aedes']]
pops += [w('D', x) for x in ['hitam', 'siang', 'pagi', 'petang']]
pops += [w('E', x) for x in ['pasu', 'tayar']]
pops += [w('F', x) for x in ['demam', 'kepala', 'mata', 'otot', 'ruam', 'minum', 'jangan']]
pops += [w('G', x) for x in ['perut', 'muntah', 'berdarah', 'lemah']]
pops += [w('H', x) for x in ['musnahkan', 'tutup', 'bersihkan', 'penghalau', 'baju']]
pops += [w('J', x) for x in ['platelet', 'sel', 'hematokrit']]
for p in pops:
    place(sfx, pop(0.22), p - 0.08, pan=0.1)
for p in [w('E', 'penutup'), w('K', 'ujian'), END + 0.3]:
    place(sfx, chime(0.18), p - 0.1)
place(sfx, alarm(SEG['G']['end'] - SEG['G']['start'] - 0.4, 0.035), SEG['G']['start'] + 0.2)

# ---- narration + ducking
narr = np.zeros((N, 2))
npath = os.path.join(HERE, 'audio', 'narration.mp3')
if os.path.exists(npath) and not TL.get('placeholder'):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', npath, '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
    v = np.frombuffer(raw, dtype=np.float32)[:N]
    narr[:len(v), 0] = narr[:len(v), 1] = v
    lvl = lowpass(np.abs(narr[:, 0]), 6)
    duck = 1 - 0.6 * np.clip(lvl / (lvl.max() * 0.15 + 1e-9), 0, 1)
    duck = lowpass(duck, 3)
    music *= duck[:, None]
    gm = 0.55
else:
    gm = 0.9  # no voice yet: music a little louder for the preview

mix = narr * 1.0 + music * gm + sfx * 0.9
wav = os.path.join(OUT, 'mix_raw.wav')
pcm = (np.clip(mix, -1, 1) * 32767).astype(np.int16)
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 's16le', '-ar', str(SR), '-ac', '2', '-i', '-', wav], input=pcm.tobytes(), check=True)
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', wav, '-af', f'atrim=0:{TL["total"]},loudnorm=I=-14:TP=-1.5:LRA=11,alimiter=limit=0.84:level=false', '-ar', '48000', '-c:a', 'pcm_s16le', os.path.join(OUT, 'mix.wav')], check=True)
os.remove(wav)
print('wrote', os.path.join(OUT, 'mix.wav'), round(TL['total'], 2), 's')
