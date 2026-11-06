// Render PNG pada pertengahan setiap babak + helaian kenalan (semakan visual sebelum render penuh)
//   npm run stills -- --avatar=dr-azren [--topic=...]
import path from 'node:path';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {renderStill} from '@remotion/renderer';
import {arg, readJson, ROOT, topicDir, topicId} from './util';
import {browserExecutable, getBundle, getComp} from './remotion';
import {sceneTimings} from '../src/lib/timeline';

(async () => {
  const topic = topicId();
  const avatar = arg('avatar', 'dr-azren')!;
  const script = readJson(path.join(topicDir(), 'script.json'));
  const words = readJson(path.join(topicDir(), 'words.json'));
  const props = {topic, avatar, coverIntro: false, silent: true};
  const comp = await getComp('Video', props);
  const outDir = path.join(ROOT, 'out', 'stills', topic);
  fs.mkdirSync(outDir, {recursive: true});
  const extra = (arg('at') ?? '').split(',').filter(Boolean).map(Number);
  const scenes = sceneTimings(script, words);
  const points: [string, number][] = scenes.map((s, i) => [`${String(i).padStart(2, '0')}-${s.id}`, (s.start + s.end) / 2]);
  if (arg('late')) scenes.forEach((s, i) => points.push([`${String(i).padStart(2, '0')}-${s.id}-late`, s.end - 0.25]));
  extra.forEach((t) => points.push([`t${t.toFixed(2)}`, t]));
  const files: string[] = [];
  for (const [name, t] of points) {
    const file = path.join(outDir, `${name}.png`);
    await renderStill({serveUrl: await getBundle(), composition: comp, output: file, frame: Math.min(comp.durationInFrames - 1, Math.round(t * 30)), inputProps: props, browserExecutable});
    files.push(file);
    console.log('✓', name, t.toFixed(2) + 's');
  }
  const sheet = path.join(outDir, 'contact.jpg');
  const cols = 4;
  const inputs = files.flatMap((f) => ['-i', f]);
  const n = files.length;
  const rows = Math.ceil(n / cols);
  const filt = files.map((_, i) => `[${i}:v]scale=360:640[v${i}]`).join(';') + ';' + files.map((_, i) => `[v${i}]`).join('') + `xstack=inputs=${n}:layout=` + files.map((_, i) => `${(i % cols) * 360}_${Math.floor(i / cols) * 640}`).join('|') + `:fill=black[o]`;
  if (n > 1) execFileSync('ffmpeg', ['-y', '-v', 'error', ...inputs, '-filter_complex', filt, '-map', '[o]', '-q:v', '3', sheet]);
  console.log('Helaian:', sheet, `(${rows} baris)`);
})();
