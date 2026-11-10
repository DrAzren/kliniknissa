// Render render/thumbnail.html to thumbnail.png (1080x1920) + thumbnail.jpg
const { chromium } = require('playwright'); const { spawn, execSync } = require('child_process'); const path = require('path');
(async () => {
  const dir = path.join(__dirname, '../render');
  const server = spawn('python3', ['-m', 'http.server', '8766', '--bind', '127.0.0.1'], { cwd: dir, stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 800));
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('http://127.0.0.1:8766/thumbnail.html'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(dir, 'thumbnail.png') }); await b.close(); server.kill();
  execSync(`ffmpeg -y -v error -i ${dir}/thumbnail.png -q:v 2 ${dir}/thumbnail.jpg`);
})();
