import subprocess,sys,os
from PIL import Image
files=sys.argv[2:]; out=sys.argv[1]
rows=[]
for f in files:
    d=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]).strip())
    fr=[]
    for k,t in enumerate([0.1,d/2,d-0.15]):
        o=f'/tmp/_qa_{os.path.basename(f)}_{k}.jpg'
        subprocess.run(['ffmpeg','-y','-v','error','-ss',str(t),'-i',f,'-frames:v','1','-vf','scale=180:320',o])
        fr.append(Image.open(o))
    rows.append(fr)
cols=min(5,len(rows)); nr=(len(rows)+cols-1)//cols
sheet=Image.new('RGB',(540*cols,320*nr),'black')
for i,fr in enumerate(rows):
    x=(i%cols)*540; y=(i//cols)*320
    for j,im in enumerate(fr): sheet.paste(im,(x+j*180,y))
sheet.save(out)
