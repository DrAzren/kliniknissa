"""Chunk aligned words into 1–2 line subtitles; write render/subs.json for the overlay."""
import json, re
d = json.load(open('timeline.json'))
W = d['words']
KEY = {'gout', 'bengkak', 'merah', 'sakit', 'asid', 'urik', 'kristal', 'tajam', 'jarum', 'sendi', 'penceroboh', 'imun',
       'panas', 'berisiko', 'berat', 'manis', 'alkohol', 'daging', 'organ', 'laut', 'diuretik', 'rehatkan', 'ais',
       'doktor', '360', 'µmoll', 'berulang', 'darah', 'tinggi', 'kencing', 'kolesterol', 'buah', 'pinggang', 'saringan',
       'nissa', 'nilai', 'ringan', 'aminah', 'konsultasi', 'pemeriksaan', 'penurun', 'teruskan'}
chunks, cur = [], []
def flush():
    global cur
    if cur: chunks.append(cur); cur = []
for i, w in enumerate(W):
    if cur and cur[-1]['seg'] != w['seg']: flush()
    cur.append(w)
    txt = ' '.join(x['text'] for x in cur)
    if re.search(r'[.?!]$', w['text']) or len(txt) >= 28 or (re.search(r',$', w['text']) and len(txt) >= 15):
        flush()
flush()
merged = []
for c in chunks:
    if merged and len(c) == 1 and merged[-1][-1]['seg'] == c[0]['seg'] and len(' '.join(x['text'] for x in merged[-1] + c)) <= 36:
        merged[-1] = merged[-1] + c
    else:
        merged.append(c)
out = []
for i, c in enumerate(merged):
    s = max(0.0, c[0]['start'] - 0.04); e = c[-1]['end'] + 0.25
    if i + 1 < len(merged): e = min(e, merged[i + 1][0]['start'] - 0.04)
    e = min(e, d['voice_end'])
    out.append({'s': round(s, 3), 'e': round(e, 3),
                'w': [{'t': x['text'], 'k': 1 if re.sub(r'[^\w]', '', x['text']).lower() in KEY else 0} for x in c]})
json.dump({'subs': out, 'words': W, 'segments': d['segments'], 'voice_end': d['voice_end'], 'total': d['total']},
          open('render/subs.json', 'w'), ensure_ascii=False)
print(len(out), 'chunks')
for o in out: print(f"{o['s']:6.2f}-{o['e']:6.2f}  " + ' '.join(w['t'] for w in o['w']))
