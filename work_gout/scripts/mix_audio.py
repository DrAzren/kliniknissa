"""Mix narration + ElevenLabs music bed (side-chain ducked) + whoosh on cuts + pops on graphic reveals."""
import json, re, subprocess
d = json.load(open('timeline.json'))
TOTAL, END = d['total'], d['voice_end']
W = d['words']; S = {s['id']: s for s in d['segments']}
bare = lambda s: re.sub(r'[^\w]', '', s.lower())
def at(seg, word):
    for w in W:
        if w['seg'] == seg and bare(w['text']) == word: return w['start']
    return S[seg]['start']
whoosh = [s['start'] for s in d['segments'][1:]] + [END]
pops = [at('E', w) - 0.12 for w in ['berat', 'minuman', 'daging', 'makanan', 'diuretik']] + \
       [at('F', w) - 0.12 for w in ['rehatkan', 'tuam', 'jumpa']] + \
       [at('H', w) - 0.1 for w in ['darah', 'kencing', 'kolesterol', 'buah']] + \
       [at('G', 'sasarannya') - 0.15, at('I', 'pemeriksaan') - 0.15, END + 1.0]
inputs = ['-i', 'audio/narration_final.wav', '-i', 'audio/music.mp3']
fc = []
for i, t in enumerate(whoosh):
    ms = int(max(0, t - 0.35) * 1000)
    inputs += ['-i', 'audio/whoosh.mp3']; fc.append(f'[{2 + i}:a]adelay={ms}|{ms},volume=0.28[w{i}]')
b = 2 + len(whoosh)
for j, t in enumerate(pops):
    ms = int(max(0, t) * 1000)
    inputs += ['-i', 'audio/pop.mp3']; fc.append(f'[{b + j}:a]adelay={ms}|{ms},volume=0.32[p{j}]')
fc.append(f'[1:a]atrim=0:{TOTAL},asetpts=PTS-STARTPTS,volume=0.30,afade=t=in:st=0:d=0.6,afade=t=out:st={TOTAL - 2.0}:d=2.0[mus]')
fc.append('[0:a]apad=whole_dur=%s,asplit=2[vo][sc]' % TOTAL)
fc.append('[mus][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=400[duck]')
mix = '[vo][duck]' + ''.join(f'[w{i}]' for i in range(len(whoosh))) + ''.join(f'[p{j}]' for j in range(len(pops)))
fc.append(f'{mix}amix=inputs={2 + len(whoosh) + len(pops)}:normalize=0:duration=first,atrim=0:{TOTAL},loudnorm=I=-14:TP=-1.5:LRA=11[out]')
subprocess.run(['ffmpeg', '-y', '-v', 'error', *inputs, '-filter_complex', ';'.join(fc), '-map', '[out]', '-ar', '48000', '-ac', '2',
                'audio/final_mix.wav'], check=True)
print('mix ok', subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0',
                                         'audio/final_mix.wav']).decode().strip())
