"""Mix narration + ElevenLabs music bed (looped, ducked) + whoosh/pop SFX."""
import json, re, subprocess
sc=json.load(open('timeline_scenes.json')); TOTAL=sc['total']
W=json.load(open('timeline_audio.json'))['words']
def at(word, after=0):
    for w in W:
        if re.sub(r'[^\w]','',w['text']).lower()==word and w['start']>=after: return w['start']
S={s['label'][0]:s for s in sc['scenes']}
MUSIC_DUR=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','audio/music.mp3']))  # bed is slowed slightly to fit, no loop seam
whoosh=[s['start'] for s in sc['scenes'][1:]]
pops=[at('eh',3)-0.15, at('belum',6)-0.15, at('bukan',10)-0.1, at('penyakit',12)-0.1, at('dua',14)-0.1, at('dua',14)+0.15,
      at('tangan',22)-0.15, at('pintu',24)-0.15, at('basuh',31)-0.15, at('periksa',33)-0.15,
      S['H']['start']+0.1, S['H']['start']+0.42, S['H']['start']+0.74, S['H']['start']+1.06,
      at('puas',42)-0.3, at('terseksa',44)-0.3, at('kerja',48)-0.1, at('pelajaran',48)-0.1, at('keluarga',48)-0.1,
      at('cbt',54)-0.15, at('ubat',58)-0.15, sc['scenes'][-1]['start']+1.0]
inputs=['-i','audio/narration_final.wav','-i','audio/music.mp3']
fc=[]
for i,t in enumerate(whoosh):
    d=int(max(0,t-0.35)*1000); inputs+=['-i','audio/whoosh.mp3']; fc.append(f'[{2+i}:a]adelay={d}|{d},volume=0.30[w{i}]')
base=2+len(whoosh)
for j,t in enumerate(pops):
    d=int(t*1000); inputs+=['-i','audio/pop.mp3']; fc.append(f'[{base+j}:a]adelay={d}|{d},volume=0.35[p{j}]')
fc.append(f'[1:a]atempo={MUSIC_DUR/(TOTAL+0.3):.4f},atrim=0:{TOTAL},asetpts=PTS-STARTPTS,volume=0.32,afade=t=in:st=0:d=0.8,afade=t=out:st={TOTAL-2.2}:d=2.2[mus]')
fc.append('[0:a]asplit=2[vo][sc]')
fc.append('[mus][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=400[duck]')
mix='[vo][duck]'+''.join(f'[w{i}]' for i in range(len(whoosh)))+''.join(f'[p{j}]' for j in range(len(pops)))
fc.append(f'{mix}amix=inputs={2+len(whoosh)+len(pops)}:normalize=0:duration=first,apad=whole_dur={TOTAL},atrim=0:{TOTAL},loudnorm=I=-14:TP=-1.5:LRA=11[out]')
subprocess.run(['ffmpeg','-y','-v','error',*inputs,'-filter_complex',';'.join(fc),'-map','[out]','-ar','48000','-ac','2','audio/final_mix.wav'],check=True)
print('mix ok', subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','audio/final_mix.wav']).decode().strip())
