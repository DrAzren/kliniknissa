#!/usr/bin/env python3
"""Estimated timeline (no audio yet): words timed by character weight at a
typical Dr Aminah speaking rate. Replaced by build_timeline.py once the real
narration exists. Usage: python3 tools/placeholder_timeline.py episodes/denggi"""
import json, re, sys, os
ep = sys.argv[1]
segs = json.load(open(os.path.join(ep, 'segments.json')))
RATE = 13.5      # characters per second (spoken text, tags removed)
GAP = 0.35
END_HOLD = 4.6
t, out_s, out_w = 0.25, [], []
for s in segs:
    txt = re.sub(r'\[[^\]]+\]\s*', '', s['text'])
    toks = txt.split()
    st = t
    for w in toks:
        d = max(0.18, len(re.sub(r'[^\w]', '', w)) / RATE)
        pause = 0.28 if re.search(r'[.?!]$', w) else 0.16 if re.search(r'[,:]$', w) or w.endswith('...') else 0.03
        out_w.append({'seg': s['id'], 'text': w, 'start': round(t, 3), 'end': round(t + d, 3)})
        t += d + pause
    out_s.append({'id': s['id'], 'kind': s['kind'], 'start': round(st - (0.25 if not out_s else GAP / 2), 3), 'end': round(t + GAP / 2, 3)})
    t += GAP
out_s[0]['start'] = 0.0
for a, b in zip(out_s, out_s[1:]): a['end'] = b['start']
voice_end = out_s[-1]['end']
json.dump({'placeholder': True, 'voice_end': round(voice_end, 3), 'total': round(voice_end + END_HOLD, 3), 'segments': out_s, 'words': out_w},
          open(os.path.join(ep, 'timeline.json'), 'w'), indent=1, ensure_ascii=False)
for s in out_s: print(s['id'], s['kind'], s['start'], s['end'], round(s['end'] - s['start'], 2))
print('voice_end', round(voice_end, 2), 'total', round(voice_end + END_HOLD, 2))
