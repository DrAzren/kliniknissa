// npm run render -- --avatar=dr-azren [--topic=<id>] [--cover-intro]
// npm run render:all            -> semua avatar dalam config/avatars.json
// npm run cover -- --avatar=<id> -> thumbnail PNG 1080×1920 sahaja
import path from 'node:path';
import fs from 'node:fs';
import {execFileSync, spawnSync} from 'node:child_process';
import {renderMedia, renderStill} from '@remotion/renderer';
import {arg, readJson, ROOT, topicDir, topicId} from './util';
import {browserExecutable, getBundle, getComp} from './remotion';

const TARGET_LUFS = -14;
const MAX_TP = -1.05;

const loudness = (file: string) => {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', file, '-af', 'ebur128=peak=true', '-f', 'null', '-'], {encoding: 'utf8'});
  const txt = r.stderr;
  const I = parseFloat(txt.match(/I:\s+(-?[\d.]+) LUFS/g)!.pop()!.match(/-?[\d.]+/)![0]);
  const tp = parseFloat(txt.match(/Peak:\s+(-?[\d.]+) dBFS/g)!.pop()!.match(/-?[\d.]+/)![0]);
  return {I, tp};
};

const probe = (file: string) =>
  JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration,bit_rate:stream=codec_type,codec_name,width,height,r_frame_rate,sample_rate', '-of', 'json', file]).toString());

async function renderOne(topic: string, avatar: string, coverIntro: boolean) {
  const outDir = path.join(ROOT, 'out', topic);
  fs.mkdirSync(outDir, {recursive: true});
  const name = avatar + (coverIntro ? '-cover-intro' : '');
  const raw = path.join(outDir, `${name}.raw.mp4`);
  const final = path.join(outDir, `${name}.mp4`);
  const props = {topic, avatar, coverIntro, silent: false};
  const comp = await getComp('Video', props);
  console.log(`Render ${name}: ${comp.durationInFrames} frame (${(comp.durationInFrames / comp.fps).toFixed(2)} s)`);
  let last = -1;
  await renderMedia({
    serveUrl: await getBundle(), composition: comp, inputProps: props, outputLocation: raw, codec: 'h264',
    videoBitrate: '8M', audioCodec: 'aac', audioBitrate: '192k', pixelFormat: 'yuv420p', browserExecutable, concurrency: 4,
    onProgress: ({progress}) => {
      const p = Math.floor(progress * 10);
      if (p !== last) { last = p; process.stdout.write(`${p * 10}% `); }
    },
  });
  console.log();
  // Kelantangan: gain biasa sahaja ke ~-14 LUFS, true peak kekal bawah -1 dB (tiada compressor/limiter)
  const m = loudness(raw);
  const gain = Math.min(TARGET_LUFS - m.I, MAX_TP - m.tp);
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', raw, '-c:v', 'copy', '-af', `volume=${gain.toFixed(2)}dB`, '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', final]);
  fs.unlinkSync(raw);
  const after = loudness(final);
  const pr = probe(final);
  const v = pr.streams.find((s: any) => s.codec_type === 'video');
  const a = pr.streams.find((s: any) => s.codec_type === 'audio');
  const words = readJson(path.join(topicDir(topic), 'words.json'));
  const expect = words.duration + 0.5;
  const dur = parseFloat(pr.format.duration);
  console.log(`  Audio: ${m.I.toFixed(1)} LUFS / TP ${m.tp.toFixed(1)} dB -> gain ${gain.toFixed(2)} dB -> ${after.I.toFixed(1)} LUFS / TP ${after.tp.toFixed(1)} dB`);
  if (gain < TARGET_LUFS - m.I - 0.05) console.log(`  Nota: -14 LUFS tidak dicapai tanpa limiter (true peak dihadkan ${MAX_TP} dB).`);
  console.log(`  ffprobe: ${v.width}×${v.height} ${v.codec_name} ${v.r_frame_rate} fps, audio ${a ? a.codec_name + ' ' + a.sample_rate + ' Hz' : 'TIADA!'}, ${dur.toFixed(2)} s (jangkaan ${expect.toFixed(2)} s), ${(pr.format.bit_rate / 1e6).toFixed(1)} Mbps`);
  if (!a || v.width !== 1080 || v.height !== 1920 || Math.abs(dur - expect) > 0.1) throw new Error('Semakan ffprobe GAGAL');
  console.log('  ✓', final);
}

async function cover(topic: string, avatar: string) {
  const outDir = path.join(ROOT, 'out', topic);
  fs.mkdirSync(outDir, {recursive: true});
  const props = {topic, avatar};
  const comp = await getComp('Cover', props);
  const file = path.join(outDir, `${avatar}-cover.png`);
  await renderStill({serveUrl: await getBundle(), composition: comp, output: file, inputProps: props, browserExecutable});
  console.log('  ✓', file);
}

(async () => {
  const topic = topicId();
  const all = arg('all');
  const avatars: string[] = all ? readJson(path.join(ROOT, 'config/avatars.json')).map((a: any) => a.id) : [arg('avatar', 'dr-azren')!];
  for (const av of avatars) {
    await cover(topic, av);
    if (arg('cover-only')) continue;
    await renderOne(topic, av, !!arg('cover-intro'));
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
