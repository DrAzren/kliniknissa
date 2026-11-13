"""Assemble the 3D animation clips into a 1080x1920 30fps base track timed to the narration."""
import subprocess, json
VE = json.load(open('timeline_audio.json'))['voice_end']
TOTAL = round(VE + 2.2, 3)
def dur(c): return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f'clips/{c}.mp4']))
# (clip, start, end, label) — source clip is used from 0 and retimed to fit the slot
S = [
 ('c00', 0.00, 3.75,'A hook tidy desk'),
 ('c01', 3.75, 8.77,'B question mark'),
 ('c02', 8.77,16.58,'C brain loop'),
 ('c03',16.58,24.77,'D obsession germs'),
 ('c04',24.77,27.21,'E door thought'),
 ('c05',27.21,34.51,'F hand washing'),
 ('c06',34.51,37.00,'G lock checking'),
 ('c07',37.00,40.39,'H loop ring'),
 ('c08',40.39,46.77,'I split contrast'),
 ('c09',46.77,51.65,'J family waiting'),
 ('c10',51.65,60.90,'K therapy'),
 ('c11',60.90,66.29,'L doctor'),
 ('c02',66.29,TOTAL,'END bg'),
]
segs=[]
for i,(c,s,e,l) in enumerate(S):
    b=dur(c)-0.05; f=(e-s)/b
    vf=f"setpts=PTS*{f:.5f},"
    vf+= "minterpolate=fps=30:mi_mode=blend," if f>1.25 else "fps=30,"
    vf+= "scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,crop=1080:1920,setsar=1"
    if l=='END bg': vf+=",gblur=sigma=28,eq=brightness=-0.18:saturation=0.8"
    vf+=f",tpad=stop_mode=clone:stop_duration=1,trim=duration={e-s:.4f}"
    out=f'clips/seg{i:02d}.mp4'
    subprocess.run(['ffmpeg','-y','-v','error','-i',f'clips/{c}.mp4','-vf',vf,'-an','-c:v','libx264','-preset','veryfast','-crf','14','-pix_fmt','yuv420p',out],check=True)
    segs.append(out); print(l, f'{s:.2f}-{e:.2f} stretch {f:.2f}')
open('clips/list.txt','w').write(''.join(f"file '{p.split('/')[1]}'\n" for p in segs))
subprocess.run(['ffmpeg','-y','-v','error','-f','concat','-safe','0','-i','clips/list.txt','-c:v','libx264','-preset','veryfast','-crf','14','-pix_fmt','yuv420p','-r','30','base.mp4'],check=True)
json.dump({'total':TOTAL,'scenes':[{'clip':c,'start':s,'end':e,'label':l} for c,s,e,l in S]},open('timeline_scenes.json','w'),indent=1)
print('TOTAL',TOTAL, subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','base.mp4']).decode().strip())
