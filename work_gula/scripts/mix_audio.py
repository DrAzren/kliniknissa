"""Mix narration + reused music bed (ducked) + reused whoosh/pop SFX. Run from work_gula/."""
import subprocess
TOTAL=60.6
whoosh=[6.55,11.86,17.55,22.2,28.75,31.84,34.08,35.76,38.2,46.1,49.95]           # scene changes
pops=[0.72,0.92,3.25,3.5,4.75,6.7,9.6,10.7,11.95,14.3,16.6,18.8,20.9,21.5,25.6,26.3,27.25,27.6,
      28.9,32.6,32.75,34.2,36.62,38.35,40.48,41.6,43.12,44.56,47.25,48.45,50.0,51.68,53.12,53.4,55.6,57.35]
inputs=['-i','audio/take1.mp3','-i','audio/music.mp3'];fc=[]
for i,t in enumerate(whoosh):
    ms=int(max(0,t-0.3)*1000);inputs+=['-i','audio/whoosh.mp3'];fc.append(f'[{2+i}:a]adelay={ms}|{ms},volume=0.30[w{i}]')
b=2+len(whoosh)
for j,t in enumerate(pops):
    ms=int(t*1000);inputs+=['-i','audio/pop.mp3'];fc.append(f'[{b+j}:a]adelay={ms}|{ms},volume={0.6 if abs(t-36.62)<.01 else 0.32}[p{j}]')
fc.append(f'[1:a]atrim=0:{TOTAL},asetpts=PTS-STARTPTS,volume=0.32,afade=t=in:st=0:d=0.6,afade=t=out:st={TOTAL-2.4}:d=2.4[mus]')
fc.append('[0:a]aresample=48000,asplit=2[vo][sc]')
fc.append('[mus][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=400[duck]')
mix='[vo][duck]'+''.join(f'[w{i}]' for i in range(len(whoosh)))+''.join(f'[p{j}]' for j in range(len(pops)))
fc.append(f'{mix}amix=inputs={2+len(whoosh)+len(pops)}:normalize=0:duration=longest,apad=whole_dur={TOTAL},atrim=0:{TOTAL},loudnorm=I=-14:TP=-1.5:LRA=11[out]')
subprocess.run(['ffmpeg','-y','-v','error',*inputs,'-filter_complex',';'.join(fc),'-map','[out]','-ar','48000','-ac','2','audio/final_mix.wav'],check=True)
print('mix ok',subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','audio/final_mix.wav']).decode().strip())
