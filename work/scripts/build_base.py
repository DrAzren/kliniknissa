"""Assemble the 3D animation clips into a 1080x1920 30fps base track timed to the narration."""
import subprocess, json
VE = json.load(open('timeline_audio.json'))['voice_end']
TOTAL = round(VE + 2.2, 3)
# (clip, src_in, src_out, start, end, label)
S = [
 ('c00',0.0,5.04, 0.00, 5.95,'A hook city'),
 ('c01',0.0,6.04, 5.95,12.66,'B brain greys'),
 ('c02',0.0,4.04,12.66,16.69,'C crossroads'),
 ('c03',0.0,7.04,16.69,24.18,'D decision study'),
 ('c04',0.0,5.04,24.18,29.59,'E family'),
 ('c05',0.0,4.04,29.59,33.96,'F office'),
 ('c06',0.0,6.04,33.96,40.17,'G flood'),
 ('c07',0.0,5.04,40.17,45.23,'H earth'),
 ('c08',0.0,5.04,45.23,50.26,'I brain-heart'),
 ('c09',0.0,5.50,50.26,57.67,'J numbness'),
 ('c10',0.3,3.11,57.67,60.48,'K consultation'),
 ('c08',0.0,5.04,60.48,TOTAL,'END bg'),
]
segs=[]
for i,(c,a,b,s,e,l) in enumerate(S):
    f=(e-s)/(b-a)
    vf=f"trim={a}:{b},setpts=(PTS-STARTPTS)*{f:.5f},"
    vf+= "minterpolate=fps=30:mi_mode=blend," if f>1.25 else "fps=30,"
    vf+= "scale=1080:-2:flags=lanczos,crop=1080:1920,setsar=1"
    if l=='END bg': vf+=",gblur=sigma=28,eq=brightness=-0.18:saturation=0.8"
    vf+=f",trim=duration={e-s:.4f}"
    out=f'clips/seg{i:02d}.mp4'
    subprocess.run(['ffmpeg','-y','-v','error','-i',f'clips/{c}.mp4','-vf',vf,'-an','-c:v','libx264','-preset','veryfast','-crf','14','-pix_fmt','yuv420p',out],check=True)
    segs.append(out); print(l, f'{s:.2f}-{e:.2f} stretch {f:.2f}')
open('clips/list.txt','w').write(''.join(f"file '{p.split('/')[1]}'\n" for p in segs))
subprocess.run(['ffmpeg','-y','-v','error','-f','concat','-safe','0','-i','clips/list.txt','-c:v','libx264','-preset','veryfast','-crf','14','-pix_fmt','yuv420p','-r','30','base.mp4'],check=True)
json.dump({'total':TOTAL,'scenes':[{'clip':c,'start':s,'end':e,'label':l} for c,a,b,s,e,l in S]},open('timeline_scenes.json','w'),indent=1)
print('TOTAL',TOTAL, subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','base.mp4']).decode().strip())
