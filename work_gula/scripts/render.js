// Render render/index.html frame-by-frame (deterministic) to video_noaudio.mp4
const { chromium } = require('playwright');const { spawn } = require('child_process');const path=require('path');
const FPS=30;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
 await p.goto('file://'+path.resolve(__dirname,'../render/index.html')+'?clean=1');const info=await p.evaluate(()=>window.__ready);
 const n=Math.round(info.duration*FPS);
 const ff=spawn('ffmpeg',['-y','-v','error','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','slow','-crf','18','-maxrate','9M','-bufsize','18M','-pix_fmt','yuv420p','-r','30',process.argv[2]],{stdio:['pipe','inherit','inherit']});
 for(let i=0;i<n;i++){await p.evaluate(t=>window.__seek(t),i/FPS);const buf=await p.screenshot({type:'jpeg',quality:96});
  if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));if(i%300===0)console.log(`frame ${i}/${n}`);}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();})();
