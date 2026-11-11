"""Mix narration + reused music bed (ducked) + reused whoosh/pop SFX. Run from the work folder."""
import subprocess
TOTAL=59.0
whoosh=[8.8,12.9,19.55,25.6,34.2,41.5,48.2]
pops=[0.5,2.95,3.15,3.95,6.16,7.65,9.76,10.66,11.76,12.96,14.15,15.68,16.72,17.92,18.72,21.3,22.08,23.16,24.64,
      25.84,27.6,28.8,30.08,30.8,32.0,34.32,35.92,37.16,38.28,39.36,41.6,42.56,44.96,46.24,48.37,49.28,50.48,50.75,52.88,54.08,55.75]
inputs=['-i','audio/take1.mp3','-i','audio/music.mp3'];fc=[]
for i,t in enumerate(whoosh):
    ms=int(max(0,t-0.3)*1000);inputs+=['-i','audio/whoosh.mp3'];fc.append(f'[{2+i}:a]adelay={ms}|{ms},volume=0.30[w{i}]')
b=2+len(whoosh)
for j,t in enumerate(pops):
    ms=int(t*1000);inputs+=['-i','audio/pop.mp3'];fc.append(f'[{b+j}:a]adelay={ms}|{ms},volume={0.6 if abs(t-32.0)<.01 else 0.32}[p{j}]')
fc.append(f'[1:a]atrim=0:{TOTAL},asetpts=PTS-STARTPTS,volume=0.32,afade=t=in:st=0:d=0.6,afade=t=out:st={TOTAL-2.4}:d=2.4[mus]')
fc.append('[0:a]aresample=48000,asplit=2[vo][sc]')
fc.append('[mus][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=400[duck]')
mix='[vo][duck]'+''.join(f'[w{i}]' for i in range(len(whoosh)))+''.join(f'[p{j}]' for j in range(len(pops)))
fc.append(f'{mix}amix=inputs={2+len(whoosh)+len(pops)}:normalize=0:duration=longest,apad=whole_dur={TOTAL},atrim=0:{TOTAL},loudnorm=I=-14:TP=-1.5:LRA=11[out]')
subprocess.run(['ffmpeg','-y','-v','error',*inputs,'-filter_complex',';'.join(fc),'-map','[out]','-ar','48000','-ac','2','audio/final_mix.wav'],check=True)
print('mix ok',subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','audio/final_mix.wav']).decode().strip())
