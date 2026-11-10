// Bina topics/<topic>/words.json
//   npm run words -- --estimate               (anggaran, untuk reka bentuk sebelum suara siap)
//   npm run words -- --from-scribe=fail.json  (transkrip ElevenLabs Scribe / faster-whisper: {words:[{text,start,end}]})
//   npm run words -- --from-alignment=fail.json (respons /with-timestamps ElevenLabs)
import fs from 'node:fs';
import path from 'node:path';
import {arg, charsToWords, duration, readJson, topicDir, voicePath, writeJson, Word} from './util';

const dir = topicDir();
const script = readJson(path.join(dir, 'script.json'));
let words: Word[] = [];
let source = '';

if (arg('estimate')) {
  source = 'estimate';
  const text: string = script.voice.text.replace(/\[[^\]]*\]/g, ' ');
  let t = 0.3;
  for (const raw of text.split(/\s+/).filter(Boolean)) {
    const len = raw.replace(/[^\p{L}\p{N}]/gu, '').length;
    const d = 0.1 + len * 0.042;
    words.push({text: raw, start: +t.toFixed(3), end: +(t + d).toFixed(3)});
    t += d + 0.06;
    if (raw.endsWith('...')) t += 0.55;
    else if (/[.?!]$/.test(raw)) t += 0.38;
    else if (raw.endsWith(',')) t += 0.18;
  }
} else if (arg('from-scribe')) {
  source = 'scribe';
  const j = readJson(arg('from-scribe')!);
  const list = Array.isArray(j) ? j : j.words;
  words = list
    .filter((w: any) => (w.type ?? 'word') === 'word')
    .map((w: any) => ({text: String(w.text ?? w.word).trim(), start: +w.start, end: +w.end}))
    .filter((w: Word) => w.text);
  // buang tag emosi berbilang perkataan: "[warm," ... "pace]"
  let inTag = false;
  words = words.filter((w) => {
    if (w.text.startsWith('[')) inTag = true;
    const drop = inTag;
    if (w.text.endsWith(']')) inTag = false;
    return !drop;
  });
} else if (arg('from-alignment')) {
  source = 'elevenlabs-with-timestamps';
  const j = readJson(arg('from-alignment')!);
  const a = j.alignment ?? j.normalized_alignment ?? j;
  words = charsToWords(a.characters, a.character_start_times_seconds, a.character_end_times_seconds);
} else {
  console.error('Guna --estimate, --from-scribe=<fail> atau --from-alignment=<fail>');
  process.exit(1);
}

const vp = voicePath();
const dur = fs.existsSync(vp) && source !== 'estimate' ? duration(vp) : +(words[words.length - 1].end + 0.6).toFixed(3);
writeJson(path.join(dir, 'words.json'), {source, duration: +dur.toFixed(3), words});
console.log(`words.json: ${words.length} perkataan, ${dur.toFixed(2)} s (${source})`);
