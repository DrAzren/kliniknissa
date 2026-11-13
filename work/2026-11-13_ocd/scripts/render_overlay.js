// Render the GSAP overlay composition frame-by-frame (transparent PNG) and composite over base.mp4.
// usage: node render_overlay.js <out.mp4> [--preview t1,t2,...]
const { chromium } = require('playwright');
const { spawn, execSync } = require('child_process');
const path = require('path');
const FPS = 30;
(async () => {
  const out = process.argv[2];
  const prevIdx = process.argv.indexOf('--preview');
  const preview = prevIdx > 0 ? process.argv[prevIdx + 1].split(',').map(Number) : null;
  const server = spawn('python3', ['-m', 'http.server', '8765', '--bind', '127.0.0.1'], { cwd: path.join(__dirname, "../render"), stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 800));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto('http://127.0.0.1:8765/overlay.html');
  const info = await page.evaluate(() => window.__ready);
  await page.evaluate(() => document.fonts.ready);
  if (preview) {
    for (const t of preview) {
      await page.evaluate(t => window.__seek(t), t);
      await page.screenshot({ path: `${out}_${t}.png`, omitBackground: true });
    }
  } else {
    const n = Math.round(info.duration * FPS);
    const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-i', 'base.mp4', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-',
      '-filter_complex', '[0:v]fps=30,tpad=stop_mode=clone:stop_duration=1[b];[b][1:v]overlay=0:0:shortest=1,format=yuv420p[v]',
      '-map', '[v]', '-c:v', 'libx264', '-preset', 'slow', '-crf', '21', '-maxrate', '9M', '-bufsize', '18M', '-r', '30', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let i = 0; i < n; i++) {
      await page.evaluate(t => window.__seek(t), i / FPS);
      const buf = await page.screenshot({ omitBackground: true });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % 300 === 0) console.log(`frame ${i}/${n}`);
    }
    ff.stdin.end();
    await new Promise(r => ff.on('close', r));
  }
  await browser.close(); server.kill();
})();
