// node thumbnail/render.js -> thumbnail.png + thumbnail.jpg (1080x1920)
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await p.goto('file://' + path.join(__dirname, 'thumbnail.html'));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(__dirname, 'thumbnail.png') });
  await p.screenshot({ path: path.join(__dirname, 'thumbnail.jpg'), type: 'jpeg', quality: 92 });
  await b.close();
})();
