#!/usr/bin/env python3
"""Real narration -> timeline.json + audio/narration.mp3.

Input: one ElevenLabs take per segment in <ep>/audio/tts/<ID>.mp3 (choose the
take by naming it so). Each take is trimmed to its speech, words are timed
with local faster-whisper (no credit cost) and aligned to the script in
segments.json, the takes are joined with a short gap, and the whole programme
is optionally sped up (pitch preserved).

    python3 tools/build_timeline.py episodes/denggi [--tempo 1.04] [--model small]
"""
import argparse, difflib, json, os, re, subprocess

ap = argparse.ArgumentParser()
ap.add_argument('ep')
ap.add_argument('--tempo', type=float, default=1.0)
ap.add_argument('--gap', type=float, default=0.32)
ap.add_argument('--end-hold', type=float, default=4.6)
ap.add_argument('--model', default='small')
a = ap.parse_args()
EP = a.ep
segs = json.load(open(os.path.join(EP, 'segments.json')))
norm = lambda s: re.sub(r'[^\w]', '', s.lower())


def dur(p):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p]))


from faster_whisper import WhisperModel
model = WhisperModel(a.model, device='cpu', compute_type='int8')


def stt(path, prompt):
    res, _ = model.transcribe(path, language='ms', word_timestamps=True, initial_prompt=prompt, vad_filter=False)
    return [(x.word.strip(), x.start, x.end) for s in res for x in s.words]


def align(ref, text):
    toks = text.split()
    A = [norm(t) for t in toks]
    B = [norm(w[0]) for w in ref]
    T = [None] * len(toks)
    for blk in difflib.SequenceMatcher(None, A, B, autojunk=False).get_matching_blocks():
        for k in range(blk.size):
            T[blk.a + k] = (ref[blk.b + k][1], ref[blk.b + k][2])
    first, last = ref[0][1], ref[-1][2]
    i = 0
    while i < len(T):
        if T[i] is None:
            j = i
            while j < len(T) and T[j] is None:
                j += 1
            s = T[i - 1][1] if i > 0 else first
            e = T[j][0] if j < len(T) else last
            ws = [max(1, len(A[k])) for k in range(i, j)]
            tot, acc = sum(ws), s
            for k, wg in zip(range(i, j), ws):
                d = (e - s) * wg / tot
                T[k] = (acc, acc + d)
                acc += d
            i = j
        else:
            i += 1
    return [{'text': t, 'start': s, 'end': e} for t, (s, e) in zip(toks, T)], difflib.SequenceMatcher(None, A, B).ratio()


os.makedirs(os.path.join(EP, 'audio', 'parts'), exist_ok=True)
t = 0.0
parts, out_s, out_w, report = [], [], [], {}
for n, s in enumerate(segs):
    src = os.path.join(EP, 'audio', 'tts', f"{s['id']}.mp3")
    text = re.sub(r'\[[^\]]+\]\s*', '', s['text'])
    ref = stt(src, text)
    words, score = align(ref, text)
    report[s['id']] = {'match': round(score, 3), 'heard': ' '.join(w[0] for w in ref)}
    a0 = max(0.0, ref[0][1] - 0.08)
    a1 = min(dur(src), ref[-1][2] + 0.25)
    span = a1 - a0 + a.gap
    p = os.path.join(EP, 'audio', 'parts', f'{n:02d}.wav')
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', src, '-af', f'atrim={a0}:{a1},asetpts=PTS-STARTPTS,apad=pad_dur={a.gap},atrim=0:{span}', '-ar', '44100', '-ac', '1', p], check=True)
    parts.append(p)
    L = span / a.tempo
    for x in words:
        out_w.append({'seg': s['id'], 'text': x['text'], 'start': round(t + (x['start'] - a0) / a.tempo, 3), 'end': round(t + (x['end'] - a0) / a.tempo, 3)})
    out_s.append({'id': s['id'], 'kind': s['kind'], 'start': round(t, 3), 'end': round(t + L, 3)})
    print(f"{s['id']:3s} {t:6.2f}-{t + L:6.2f}  match {score:.2f}")
    t += L

fc = ''.join(f'[{i}:a]' for i in range(len(parts))) + f'concat=n={len(parts)}:v=0:a=1,atempo={a.tempo}[o]'
ins = sum([['-i', p] for p in parts], [])
subprocess.run(['ffmpeg', '-y', '-v', 'error', *ins, '-filter_complex', fc, '-map', '[o]', '-ar', '44100', '-ac', '1', '-c:a', 'libmp3lame', '-b:a', '192k',
                os.path.join(EP, 'audio', 'narration.mp3')], check=True)
json.dump({'tempo': a.tempo, 'voice_end': round(t, 3), 'total': round(t + a.end_hold, 3), 'segments': out_s, 'words': out_w},
          open(os.path.join(EP, 'timeline.json'), 'w'), indent=1, ensure_ascii=False)
json.dump(report, open(os.path.join(EP, 'audio', 'stt_check.json'), 'w'), indent=1, ensure_ascii=False)
print('voice_end', round(t, 2), 'total', round(t + a.end_hold, 2))
