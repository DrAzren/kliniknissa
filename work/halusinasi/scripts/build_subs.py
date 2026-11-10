import json,re
d=json.load(open('timeline_audio.json'))
W=d['words']
KEY={'halusinasi','mata','kabur','otaknya','charles','bonnet','nyata','tiada','lima','jenis','pendengaran','suara','penglihatan','bayang','sentuhan','serangga','kulit','bau','terbakar','rasa','pahit','besi','tidur','demam','ubat','dadah','epilepsi','demensia','skizofrenia','normal','terlelap','terjaga','kerap','menakutkan','keliru','doktor','berpenunggu','panik'}
END_CARD=65.85
chunks=[];cur=[]
def flush():
    global cur
    if cur: chunks.append(cur); cur=[]
for w in W:
    if w['start']>=END_CARD-0.05: break
    cur.append(w)
    txt=' '.join(x['text'] for x in cur)
    if re.search(r'[.?!]$',w['text']) or len(txt)>=30 or (re.search(r',$',w['text']) and len(txt)>=16):
        flush()
flush()
merged=[]
for c in chunks:
    if merged and len(c)==1 and len(merged)>1 and len(' '.join(x['text'] for x in merged[-1]+c))<=44:
        merged[-1]=merged[-1]+c
    else: merged.append(c)
chunks=merged
out=[]
for i,c in enumerate(chunks):
    s=c[0]['start']; e=c[-1]['end']+0.25
    if i+1<len(chunks): e=min(e,chunks[i+1][0]['start'])
    e=min(e,END_CARD)
    words=[]
    for x in c:
        bare=re.sub(r'[^\w]','',x['text']).lower()
        words.append({'t':x['text'],'k':1 if bare in KEY else 0,'s':x['start']})
    out.append({'s':round(s,3),'e':round(e,3),'w':words})
WT={re.sub(r'[^\w]','',w['text']).lower()+'@'+str(i):w['start'] for i,w in enumerate(W)}
json.dump({'subs':out,'words':W},open('render/subs.json','w'))
print(len(out),'subtitle chunks'); 
for o in out: print(f"{o['s']:6.2f}-{o['e']:6.2f}  "+' '.join(w['t'] for w in o['w']))
