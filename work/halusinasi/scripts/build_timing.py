"""Compress long pauses in narration, apply tempo, and emit a timing map (timeline.json)."""
import json, re, subprocess
AUD = 'audio/takeA.mp3'
TEMPO = 1.05
MAXGAP = 0.32
out = subprocess.run(['ffmpeg','-hide_banner','-i',AUD,'-af','silencedetect=noise=-38dB:d=0.3','-f','null','-'],capture_output=True,text=True).stderr
starts=[float(x) for x in re.findall(r'silence_start: ([0-9.]+)',out)]
ends=[float(x) for x in re.findall(r'silence_end: ([0-9.]+)',out)]
dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',AUD]))
cuts=[]  # (cut_start, cut_end) removed from middle of gap
for s,e in zip(starts,ends):
    g=e-s
    if g>MAXGAP:
        mid=(s+e)/2; half=MAXGAP/2
        cuts.append((s+half, e-half))
def m(t):
    shift=0
    for a,b in cuts:
        if t>=b: shift+=b-a
        elif t>a: shift+=t-a
    return (t-shift)/TEMPO
keep=[]; prev=0
for a,b in cuts: keep.append((prev,a)); prev=b
keep.append((prev,dur))
words=[w for w in json.load(open('audio/words.json'))['words'] if w['type']=='word' and not w['text'].startswith('[') and not w['text'].endswith(']')]
W=[{'text':w['text'],'start':round(m(w['start']),3),'end':round(m(w['end']),3)} for w in words]
voice_end=m(dur)
json.dump({'tempo':TEMPO,'cuts':cuts,'keep':keep,'voice_end':voice_end,'words':W},open('timeline_audio.json','w'),indent=1)
# build compressed narration
parts=''.join(f'[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS[k{i}];' for i,(a,b) in enumerate(keep))
cat=''.join(f'[k{i}]' for i in range(len(keep)))+f'concat=n={len(keep)}:v=0:a=1,atempo={TEMPO}[out]'
subprocess.run(['ffmpeg','-y','-v','error','-i',AUD,'-filter_complex',parts+cat,'-map','[out]','-ar','48000','-ac','2','audio/narration_final.wav'],check=True)
print('cuts',len(cuts),'saved',round(sum(b-a for a,b in cuts),2),'voice_end',round(voice_end,2))

