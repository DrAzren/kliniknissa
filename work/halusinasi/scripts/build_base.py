"""Assemble animated clips + Ken Burns stills into a 1080x1920 30fps base track timed to the narration."""
import subprocess, json
VE = json.load(open('timeline_audio.json'))['voice_end']
TOTAL = round(VE + 2.2, 3)
END = 65.85
# (source, kind, start, end, motion, label)   kind: clip (src_in,src_out) | still (zoom from->to, pan)
S = [
 ('clips/v00_hook.mp4', ('clip',0.0,6.04),       0.00,  5.55, None,          'A hook: Pakcik Hamid sees children'),
 ('img/s01.png',        ('still',1.00,1.12,'c'), 5.55,  8.85, None,          'B family panics'),
 ('img/s02.png',        ('still',1.12,1.00,'r'), 8.85, 13.95, None,          'C doctor examines eye'),
 ('clips/v01_eye.mp4',  ('clip',0.0,4.04),      13.95, 19.60, None,          'D eye -> brain fills gaps'),
 ('img/s00.png',        ('still',1.20,1.02,'c'),19.60, 21.80, None,          'D2 Charles Bonnet callback'),
 ('img/s04.png',        ('still',1.00,1.15,'u'),21.80, 28.20, None,          'E what is hallucination'),
 ('img/s05.png',        ('still',1.00,1.14,'l'),28.20, 31.80, None,          'F1 auditory'),
 ('img/s06.png',        ('still',1.00,1.18,'c'),31.80, 35.50, None,          'F2 visual'),
 ('img/s07.png',        ('still',1.14,1.00,'r'),35.50, 39.35, None,          'F3 tactile'),
 ('img/s08.png',        ('still',1.00,1.14,'c'),39.35, 43.20, None,          'F4 smell'),
 ('img/s09.png',        ('still',1.14,1.00,'l'),43.20, 47.20, None,          'F5 taste'),
 ('img/s10.png',        ('still',1.00,1.18,'u'),47.20, 55.60, None,          'G causes'),
 ('img/s11.png',        ('still',1.15,1.00,'c'),55.60, 59.65, None,          'H normal (hypnagogic)'),
 ('clips/c10_consult.mp4',('clip',0.0,4.04),    59.65, END,   None,          'I red flags / see doctor'),
 ('img/s04.png',        ('still',1.10,1.00,'c'),END,   TOTAL, 'blur',        'END bg'),
]
segs=[]
import sys
ONLY=set(map(int,sys.argv[1:]))
for i,(src,k,s,e,fx,l) in enumerate(S):
    d=e-s; nf=round(e*30)-round(s*30); n=nf+1
    if k[0]=='clip':
        a,b=k[1],k[2]; f=d/(b-a)
        vf=f"trim={a}:{b},setpts=(PTS-STARTPTS)*{f:.5f},"
        vf+="minterpolate=fps=30:mi_mode=mci:mc_mode=aobmc:vsbmc=1," if f>1.25 else "fps=30,"
        vf+="scale=1080:-2:flags=lanczos,crop=1080:1920,setsar=1,tpad=stop_mode=clone:stop_duration=1"
        inp=['-i',src]
    else:
        z0,z1,pan=k[1],k[2],k[3]
        z=f"({z0}+({z1}-{z0})*on/{n-1})"
        # ease-in-out progress for pans
        p=f"(0.5-0.5*cos(PI*on/{n-1}))"
        cx={'c':"(iw-iw/zoom)/2",'l':f"(iw-iw/zoom)*(0.15+0.5*{p})",'r':f"(iw-iw/zoom)*(0.85-0.5*{p})",'u':"(iw-iw/zoom)/2"}[pan]
        cy={'u':f"(ih-ih/zoom)*(0.7-0.4*{p})"}.get(pan,"(ih-ih/zoom)/2")
        vf=(f"scale=2160:3860:flags=lanczos,crop=2160:3840,zoompan=z='{z}':x='{cx}':y='{cy}':d={n}:s=1080x1920:fps=30,setsar=1")
        inp=['-loop','1','-i',src]
    if fx=='blur': vf+=",gblur=sigma=28,eq=brightness=-0.18:saturation=0.8"
    out=f'clips/seg{i:02d}.mp4'
    if ONLY and i not in ONLY: segs.append(out); continue
    subprocess.run(['ffmpeg','-y','-v','error',*inp,'-vf',vf,'-an','-frames:v',str(nf),'-c:v','libx264','-preset','veryfast','-crf','14','-pix_fmt','yuv420p','-r','30',out],check=True)
    segs.append(out); print(f'{l:40s} {s:6.2f}-{e:6.2f}')
open('clips/list.txt','w').write(''.join(f"file '{p.split('/')[1]}'\n" for p in segs))
subprocess.run(['ffmpeg','-y','-v','error','-f','concat','-safe','0','-i','clips/list.txt','-c:v','libx264','-preset','veryfast','-crf','14','-pix_fmt','yuv420p','-r','30','base.mp4'],check=True)
json.dump({'total':TOTAL,'end':END,'scenes':[{'src':src,'start':s,'end':e,'label':l} for src,k,s,e,fx,l in S]},open('timeline_scenes.json','w'),indent=1)
print('TOTAL',TOTAL, subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','base.mp4']).decode().strip())
