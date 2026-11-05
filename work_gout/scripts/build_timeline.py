"""Assemble narration + picture timeline for the gout explainer.

Each segment keeps its own ElevenLabs take. Lip-synced segments trim the same window from
audio and video so the mouth stays in sync. The whole programme is sped up by TEMPO
(pitch preserved) and words are aligned to the script for subtitles.
Outputs: audio/narration_final.wav, base.mp4, timeline.json
"""
import json, re, subprocess, difflib, os

TEMPO = 1.06
GAP = 0.14            # silence between segments (pre-tempo)
END_HOLD = 4.6        # end card length (post-tempo seconds)
W, H, FPS = 1080, 1920, 30

SEG = [  # id, kind, take, visual clip, src offset for cutaways
 ('A', 'cut', 'A2', 'clips/vidA.mp4', 0.2),
 ('B', 'lip', 'B2', 'clips/lipB.mp4', 0),
 ('C', 'lip', 'C1', 'clips/lipC.mp4', 0),
 ('D', 'cut', 'D2', 'clips/vidD.mp4', 0.2),
 ('E', 'lip', 'E2', 'clips/lipE.mp4', 0),
 ('F', 'cut', 'F1', 'clips/vidF.mp4', 0.2),
 ('G', 'lip', 'G1', 'clips/lipG.mp4', 0),
 ('H', 'cut', 'H1', 'clips/vidH.mp4', 0.2),
 ('I', 'lip', 'I2', 'clips/lipI.mp4', 0),
]
TEXT = {
 'A': "Pernah tak... tengah malam, tiba-tiba ibu jari kaki bengkak, merah, dan sakit sangat? Sampai kena selimut pun, tak tahan!",
 'B': "Assalamualaikum! Saya Dr Aminah, dari Klinik Nissa. Sakit macam tu, mungkin... gout. Jom kita tengok, apa yang berlaku dalam sendi.",
 'C': "Bila asid urik dalam darah terlalu tinggi, ia boleh membentuk kristal tajam, macam jarum, dalam sendi.",
 'D': "Badan kita anggap kristal ni penceroboh. Sel imun pun menyerang, dan sendi jadi merah, panas, dan bengkak.",
 'E': "Siapa yang berisiko? Berat badan berlebihan. Minuman manis, dan alkohol. Terlebih makan daging merah, organ dalaman, dan makanan laut. Juga, sesetengah ubat, seperti ubat diuretik.",
 'F': "Bila serangan datang, rehatkan sendi, tuam dengan ais, dan jumpa doktor cepat. Jangan ambil ubat sendiri, ya.",
 'G': "Kalau serangan berulang, doktor boleh mulakan ubat penurun asid urik. Sasarannya, bawah 360 µmol/L. Teruskan makan ubat, walaupun dah tak sakit.",
 'H': "Gout juga selalu datang bersama darah tinggi, kencing manis, kolesterol, dan masalah buah pinggang. Jadi, saringan sangat penting.",
 'I': "Klinik Nissa, Nilai, sedia membantu, untuk pemeriksaan asid urik dan konsultasi gout. Jaga sendi, langkah pun ringan!",
}
STT = json.load(open('audio/tts_words.json'))
stt = {os.path.basename(k)[:-4]: v for k, v in STT.items()}

def dur(p):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p]))

norm = lambda s: re.sub(r'[^\w]', '', s.lower())

def align(take, text):
    """Give each script word a (start, end) from Whisper word times."""
    ref = stt[take]
    toks = text.split()
    a = [norm(t) for t in toks]; b = [norm(w[0]) for w in ref]
    T = [None] * len(toks)
    for blk in difflib.SequenceMatcher(None, a, b, autojunk=False).get_matching_blocks():
        for k in range(blk.size):
            T[blk.a + k] = (ref[blk.b + k][1], ref[blk.b + k][2])
    # interpolate gaps by character weight
    first, last = ref[0][1], ref[-1][2]
    i = 0
    while i < len(T):
        if T[i] is None:
            j = i
            while j < len(T) and T[j] is None: j += 1
            s = T[i - 1][1] if i > 0 else first
            e = T[j][0] if j < len(T) else last
            ws = [max(1, len(a[k])) for k in range(i, j)]; tot = sum(ws); acc = s
            for k, wgt in zip(range(i, j), ws):
                d = (e - s) * wgt / tot; T[k] = (acc, acc + d); acc += d
            i = j
        else:
            i += 1
    return [{'text': t, 'start': s, 'end': e} for t, (s, e) in zip(toks, T)]

segments, words, parts = [], [], []
t = 0.0  # post-tempo timeline
os.makedirs('clips/seg', exist_ok=True)
for n, (sid, kind, take, clip, off) in enumerate(SEG):
    aud = f'audio/tts/{take}.mp3'
    ad = dur(aud)
    ws = stt[take]
    a0 = max(0.0, ws[0][1] - 0.06)
    a1 = min(ad, ws[-1][2] + 0.22)
    if kind == 'lip':
        a1 = min(a1, dur(clip) - 0.02)
    span = (a1 - a0 + GAP)                 # pre-tempo length incl. gap
    out_len = span / TEMPO
    # audio part
    p = f'clips/seg/a{n}.wav'
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', aud, '-af',
                    f'atrim={a0}:{a1},asetpts=PTS-STARTPTS,apad=pad_dur={GAP},atrim=0:{span}',
                    '-ar', '48000', '-ac', '2', p], check=True)
    parts.append(p)
    # video part (scale 768x1344 -> cover 1080x1920)
    vf_scale = f'scale={W}:{H}:force_original_aspect_ratio=increase:flags=lanczos,crop={W}:{H},setsar=1'
    v = f'clips/seg/v{n}.mp4'
    if kind == 'lip':
        vf = f'trim={a0}:{a1 + GAP},setpts=(PTS-STARTPTS)/{TEMPO},tpad=stop_mode=clone:stop_duration=1,fps={FPS},{vf_scale},trim=duration={out_len:.4f}'
    else:
        cd = dur(clip) - off
        f = max(1.0, out_len / cd)          # only slow down if the clip is too short
        vf = f'trim={off}:{dur(clip)},setpts=(PTS-STARTPTS)*{f:.5f},fps={FPS},{vf_scale},trim=duration={out_len:.4f}'
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', clip, '-vf', vf, '-an', '-c:v', 'libx264', '-preset', 'veryfast',
                    '-crf', '14', '-pix_fmt', 'yuv420p', v], check=True)
    for w in align(take, TEXT[sid]):
        words.append({'seg': sid, 'text': w['text'], 'start': round(t + (w['start'] - a0) / TEMPO, 3),
                      'end': round(t + (w['end'] - a0) / TEMPO, 3)})
    segments.append({'id': sid, 'kind': kind, 'take': take, 'start': round(t, 3), 'end': round(t + out_len, 3)})
    print(f'{sid} {kind} {take} {t:6.2f}-{t + out_len:6.2f} ({out_len:.2f}s)')
    t += out_len

VOICE_END = t
TOTAL = round(VOICE_END + END_HOLD, 3)
# end-card background: last frame region of I, blurred (overlay covers most of it)
v_end = 'clips/seg/vEnd.mp4'
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-loop', '1', '-i', 'img/sI.png', '-t', f'{END_HOLD}', '-vf',
                f'scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},gblur=sigma=30,eq=brightness=-0.2,fps={FPS},setsar=1',
                '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '16', '-pix_fmt', 'yuv420p', v_end], check=True)
open('clips/seg/list.txt', 'w').write(''.join(f"file 'v{n}.mp4'\n" for n in range(len(SEG))) + "file 'vEnd.mp4'\n")
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', 'clips/seg/list.txt', '-c:v', 'libx264',
                '-preset', 'veryfast', '-crf', '14', '-pix_fmt', 'yuv420p', '-r', str(FPS), 'base.mp4'], check=True)
# narration: concat + tempo
fc = ''.join(f'[{i}:a]' for i in range(len(parts))) + f'concat=n={len(parts)}:v=0:a=1,atempo={TEMPO}[o]'
ins = sum([['-i', p] for p in parts], [])
subprocess.run(['ffmpeg', '-y', '-v', 'error', *ins, '-filter_complex', fc, '-map', '[o]', '-ar', '48000', '-ac', '2',
                'audio/narration_final.wav'], check=True)
json.dump({'tempo': TEMPO, 'voice_end': round(VOICE_END, 3), 'total': TOTAL, 'segments': segments, 'words': words},
          open('timeline.json', 'w'), indent=1)
print('voice_end', round(VOICE_END, 2), 'total', TOTAL, 'base', dur('base.mp4'), 'narr', dur('audio/narration_final.wav'))
