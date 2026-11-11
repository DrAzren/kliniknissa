// usage: node snap.js out_prefix t1,t2,...   -> contact sheet via ffmpeg
const { chromium } = require('playwright');const path=require('path');
(async()=>{const [out,ts]=process.argv.slice(2);const b=await chromium.launch();
 const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:0.4});
 p.on('pageerror',e=>console.log('PAGEERROR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('ERR',m.text())});
 await p.goto('file://'+path.resolve(__dirname,'../render/index.html')+'?clean=1');await p.evaluate(()=>window.__ready);
 let i=0;for(const t of ts.split(',').map(Number)){await p.evaluate(t=>window.__seek(t),t);await p.screenshot({path:`${out}_${String(i++).padStart(2,'0')}.png`});}
 await b.close();})();
