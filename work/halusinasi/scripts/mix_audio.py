"""Mix narration + licensed ElevenLabs music bed (reused from the 2026-11-04 batch, extended with a crossfade loop, ducked) + whoosh/pop SFX."""
import json, subprocess, re
sc=json.load(open('timeline_scenes.json')); TOTAL=sc['total']; END=sc['end']
W=json.load(open('timeline_audio.json'))['words']
def at(word, after=0):
    for w in W:
        if re.sub(r'[^\w]','',w['text']).lower()==word and w['start']>=after: return w['start']
whoosh=[s['start'] for s in sc['scenes'][1:]]
pops=[at('berpenunggu',6)-0.2, at('bukan',10), at('mata',12)-0.2, at('otaknya',15)-0.1, at('ini',19)-0.1,
      at('halusinasi',21)-0.2, at('lima',26)-0.15,
      at('satu',27)-0.15, at('dua',31)-0.15, at('tiga',35)-0.15, at('empat',39)-0.15, at('lima',43)-0.15,
      at('puncanya',47)-0.2, at('kurang',48)-0.1, at('demam',48)-0.1, at('ubat',48)-0.1, at('epilepsi',48)-0.1, at('demensia',48)-0.1, at('skizofrenia',48)-0.1,
      at('normal',55)-0.2, at('kerap',59)-0.1, at('menakutkan',59)-0.1, at('demam',62)-0.1, at('jangan',63)-0.1, END+1.0]
inputs=['-i','audio/narration_final.wav','-i','audio/music.mp3','-i','audio/music.mp3']
fc=['[1:a]atrim=0:60,asetpts=PTS-STARTPTS[m1]','[2:a]atrim=8,asetpts=PTS-STARTPTS[m2]','[m1][m2]acrossfade=d=3:c1=tri:c2=tri[mx]']
for i,t in enumerate(whoosh):
    inputs+=['-i','audio/whoosh.mp3']; d=int(max(0,t-0.35)*1000); fc.append(f'[{3+i}:a]adelay={d}|{d},volume=0.30[w{i}]')
base=3+len(whoosh)
for j,t in enumerate(pops):
    inputs+=['-i','audio/pop.mp3']; d=int(t*1000); fc.append(f'[{base+j}:a]adelay={d}|{d},volume=0.32[p{j}]')
fc.append(f'[mx]atrim=0:{TOTAL},asetpts=PTS-STARTPTS,volume=0.30,afade=t=in:st=0:d=0.8,afade=t=out:st={TOTAL-2.2}:d=2.2[mus]')
fc.append('[0:a]asplit=2[vo][sc]')
fc.append('[mus][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=400[duck]')
mix='[vo][duck]'+''.join(f'[w{i}]' for i in range(len(whoosh)))+''.join(f'[p{j}]' for j in range(len(pops)))
fc.append(f'{mix}amix=inputs={2+len(whoosh)+len(pops)}:normalize=0:duration=first,apad=whole_dur={TOTAL},atrim=0:{TOTAL},loudnorm=I=-14:TP=-1.5:LRA=11[out]')
subprocess.run(['ffmpeg','-y','-v','error',*inputs,'-filter_complex',';'.join(fc),'-map','[out]','-ar','48000','-ac','2','audio/final_mix.wav'],check=True)
print('mix ok', subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','audio/final_mix.wav']).decode().strip())
