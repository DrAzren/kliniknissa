const { chromium } = require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
 await p.goto('file://'+path.resolve(__dirname,'../render/index.html')+'?clean=1');await p.evaluate(()=>window.__ready);
 await p.evaluate(()=>{window.__seek(1.28);document.getElementById('cap').style.display='none';document.getElementById('tag').style.display='none';
  const t=document.getElementById('title');t.style.transform='translate(0,-150px) scale(1.12)';
  const d=document.createElement('div');d.style.cssText='position:absolute;left:465px;top:1560px;width:150px;height:150px;border-radius:34px;overflow:hidden;border:4px solid #2ED3B7;box-shadow:0 10px 30px rgba(0,0,0,.5)';
  d.innerHTML='<img src="logo_crop.png" style="width:100%;height:100%;object-fit:cover">';document.getElementById('stage').appendChild(d);});
 await p.screenshot({path:process.argv[2]});await b.close();})();
