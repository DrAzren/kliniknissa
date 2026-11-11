"""Caption chunks (clause-aware) from audio/words.json -> render/subs.js. Run from the work folder."""
import json,re,sys
KEY=set(sys.argv[1].split(',')) if len(sys.argv)>1 else set()
d=json.load(open('audio/words.json'))['words']
W=[w for w in d if w.get('type','word')=='word' and '[' not in w['text'] and ']' not in w['text']]
L=lambda c:len(' '.join(x['text'] for x in c))
cl=[];cur=[]
for w in W:
    cur.append(w)
    if re.search(r'[.?!,]$',w['text']): cl.append(cur);cur=[]
if cur: cl.append(cur)
ch=[]
for c in cl:
    if L(c)<=31: parts=[c]
    else:
        n=-(-L(c)//28); parts=[];cur=[];target=L(c)/n
        for w in c:
            cur.append(w)
            if L(cur)>=target-3 and len(parts)<n-1: parts.append(cur);cur=[]
        if cur: parts.append(cur)
    ch+=parts
m=[]
for c in ch:
    pe = m and re.search(r'[.?!]$',m[-1][-1]['text'])
    if m and not pe and (L(c)<9 or L(m[-1])<9) and L(m[-1]+c)<=31: m[-1]=m[-1]+c
    else: m.append(c)
out=[]
for i,c in enumerate(m):
    e=c[-1]['end']+0.35
    if i+1<len(m): e=min(e,m[i+1][0]['start'])
    ws=[]
    for j,x in enumerate(c):
        t=x['text'] if j<len(c)-1 else re.sub(r'[.,]+$','',x['text'])
        t=re.sub(r'\.$','',t)
        ws.append({'t':t,'s':x['start'],'k':int(re.sub(r'[^\w-]','',x['text']).lower() in KEY)})
    out.append({'s':c[0]['start'],'e':round(e,3),'w':ws})
json.dump(out,open('render/subs.json','w'));open('render/subs.js','w').write('window.SUBS='+json.dumps(out)+';')
for o in out: print(f"{o['s']:6.2f}-{o['e']:6.2f} "+' '.join(w['t'] for w in o['w']))
