import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

export const ROOT = path.resolve(__dirname, '..');
export const arg = (name: string, def?: string) => {
  const hit = process.argv.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return def;
  return hit.includes('=') ? hit.slice(hit.indexOf('=') + 1) : 'true';
};
export const topicId = () => arg('topic', 'dunia-tanpa-kesihatan-mental')!;
export const topicDir = (t = topicId()) => path.join(ROOT, 'topics', t);
export const voicePath = (t = topicId()) => path.join(ROOT, 'public', 'topics', t, 'voice.mp3');
export const readJson = (p: string) => JSON.parse(fs.readFileSync(p, 'utf8'));
export const writeJson = (p: string, d: unknown) => fs.writeFileSync(p, JSON.stringify(d, null, 1) + '\n');
export const duration = (file: string) =>
  parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString());
export type Word = {text: string; start: number; end: number};

// Masa setiap aksara (ElevenLabs /with-timestamps) -> masa setiap perkataan
export function charsToWords(chars: string[], st: number[], en: number[]): Word[] {
  const words: Word[] = [];
  let cur = '', s = 0, e = 0, inTag = false;
  const push = () => {
    if (cur.trim()) words.push({text: cur.trim(), start: +s.toFixed(3), end: +e.toFixed(3)});
    cur = '';
  };
  chars.forEach((ch, i) => {
    if (ch === '[') inTag = true;
    if (inTag) {
      if (ch === ']') inTag = false;
      return;
    }
    if (/\s/.test(ch)) return push();
    if (!cur) s = st[i];
    cur += ch;
    e = en[i];
  });
  push();
  return words;
}
