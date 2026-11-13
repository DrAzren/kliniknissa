"""Subtitle chunks: fixed line breaks (one per '/' in LINES) matched word-by-word to the timed transcript."""
import json,re
d=json.load(open('timeline_audio.json'))
W=d['words']
KEY={'warna','kemas','ocd','tentu','obsesifkompulsif','penyakit','mental','obsesi','mengganggu','berulang','kotor','berkunci','kompulsi','diulang','cemas','merekah','berkalikali','lega','kitaran','puas','terseksa','sejam','kerja','pelajaran','keluarga','dirawat','cbt','pendedahan','pencegahan','ubat','membantu','profesional'}
LINES="""Awak suka susun barang ikut warna? / Meja mesti sentiasa kemas? / Ramai cakap, / "Eh, saya ni OCD." / Sebenarnya... belum tentu. /
OCD atau gangguan / obsesif-kompulsif / bukan sifat suka kemas. / Ia penyakit mental / dan ia ada dua bahagian. /
Pertama, obsesi. / Fikiran yang mengganggu / datang berulang kali / walaupun kita tak mahu. / Contohnya, / takut sangat tangan kotor / atau risau pintu rumah / belum berkunci. /
Kedua, kompulsi. / Perbuatan yang terpaksa diulang / untuk redakan rasa cemas itu. / Basuh tangan / sampai kulit merekah. / Periksa kunci pintu / berkali-kali. /
Lega sekejap, / tapi kemudian / kitaran itu berulang. / Jadi apa bezanya? / Orang yang suka kemas / rasa puas. / Penghidap OCD / rasa terseksa. /
Ia boleh makan masa / lebih sejam sehari / dan ganggu kerja, / pelajaran dan keluarga. / Berita baiknya, / OCD boleh dirawat. /
Terapi CBT, / khususnya teknik pendedahan / dan pencegahan tindak balas, / serta ubat, / terbukti membantu. /
Kalau anda, atau orang tersayang, / terperangkap dalam kitaran ini, / dapatkan penilaian profesional."""
lines=[l.split() for l in LINES.replace('\n',' ').split('/') if l.strip()]
bare=lambda s:re.sub(r'[^\w]','',s).lower()
chunks=[];i=0
for l in lines:
    c=[]
    for tok in l:
        assert bare(W[i]['text'])==bare(tok),(W[i]['text'],tok)
        c.append({**W[i],'text':tok}); i+=1
    chunks.append(c)
END_CARD=json.load(open('timeline_scenes.json'))['scenes'][-1]['start']
out=[]
for k,c in enumerate(chunks):
    s=c[0]['start']; e=c[-1]['end']+0.25
    if k+1<len(chunks): e=min(e,chunks[k+1][0]['start'])
    e=min(e,END_CARD)
    out.append({'s':round(s,3),'e':round(e,3),'w':[{'t':x['text'],'k':1 if bare(x['text']) in KEY else 0,'s':x['start']} for x in c]})
json.dump({'subs':out,'words':W},open('render/subs.json','w'))
print(len(out),'subtitle chunks')
for o in out: print(f"{o['s']:6.2f}-{o['e']:6.2f}  "+' '.join(w['t'] for w in o['w']))
