"""Mix narration + licensed ElevenLabs music bed (ducked) + whoosh/pop SFX."""
import json, subprocess
sc=json.load(open('timeline_scenes.json')); TOTAL=sc['total']
W=json.load(open('timeline_audio.json'))['words']
def at(word, after=0):
    import re
    for w in W:
        if re.sub(r'[^\w]','',w['text']).lower()==word and w['start']>=after: return w['start']
whoosh=[s['start'] for s in sc['scenes'][1:]]  # every cut
pops=[at('gembira',5)-0.25,at('sedih',5)-0.25,at('takut',5)-0.25, 12.71,24.23,29.64,34.01,40.22, 16.95,
      at('kosong',50)-0.1,at('minat',50)-0.1,at('perasaan',50)-0.1,at('minggu',50)-0.1, 61.5]
inputs=['-i','audio/narration_final.wav','-i','audio/music.mp3']
fc=[]
for i,t in enumerate(whoosh):
    inputs+=['-i','audio/whoosh.mp3']; fc.append(f'[{2+i}:a]adelay={int(max(0,t-0.35)*1000)}|{int(max(0,t-0.35)*1000)},volume=0.30[w{i}]')
base=2+len(whoosh)
for j,t in enumerate(pops):
    inputs+=['-i','audio/pop.mp3']; fc.append(f'[{base+j}:a]adelay={int(t*1000)}|{int(t*1000)},volume=0.35[p{j}]')
fc.append(f'[1:a]atrim=0:{TOTAL},asetpts=PTS-STARTPTS,volume=0.32,afade=t=in:st=0:d=0.8,afade=t=out:st={TOTAL-2.2}:d=2.2[mus]')
fc.append('[0:a]asplit=2[vo][sc]')
fc.append('[mus][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=400[duck]')
mix='[vo][duck]'+''.join(f'[w{i}]' for i in range(len(whoosh)))+''.join(f'[p{j}]' for j in range(len(pops)))
fc.append(f'{mix}amix=inputs={2+len(whoosh)+len(pops)}:normalize=0:duration=first,apad=whole_dur={TOTAL},atrim=0:{TOTAL},loudnorm=I=-14:TP=-1.5:LRA=11[out]')
subprocess.run(['ffmpeg','-y','-v','error',*inputs,'-filter_complex',';'.join(fc),'-map','[out]','-ar','48000','-ac','2','audio/final_mix.wav'],check=True)
print('mix ok', subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','audio/final_mix.wav']).decode().strip())
