// npm run voice [-- --topic=<id>]
// Jana suara SEKALI sahaja melalui ElevenLabs API (/with-timestamps). Kalau voice.mp3 dah wujud: langkau (jimat kredit).
// Kalau voice.mp3 diletak sendiri tanpa words.json: jalankan faster-whisper (model small, language=ms).
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {charsToWords, duration, readJson, ROOT, topicDir, voicePath, writeJson} from './util';

const loadEnv = () => {
  const f = path.join(ROOT, '.env');
  if (!fs.existsSync(f)) return;
  for (const line of fs.readFileSync(f, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
};

(async () => {
  loadEnv();
  const dir = topicDir();
  const script = readJson(path.join(dir, 'script.json'));
  const vp = voicePath();
  const wordsFile = path.join(dir, 'words.json');
  fs.mkdirSync(path.dirname(vp), {recursive: true});

  if (fs.existsSync(vp)) {
    const w = fs.existsSync(wordsFile) ? readJson(wordsFile) : null;
    if (w && w.source !== 'estimate') {
      console.log(`voice.mp3 sudah ada (${duration(vp).toFixed(2)} s) dan words.json (${w.source}). Tiada kredit digunakan.`);
      return;
    }
    console.log('voice.mp3 sudah ada tetapi tiada masa perkataan -> faster-whisper');
    const out = path.join(dir, 'whisper.json');
    execFileSync('python3', [path.join(ROOT, 'scripts/whisper_words.py'), vp, out], {stdio: 'inherit'});
    execFileSync('npx', ['tsx', path.join(ROOT, 'scripts/words.ts'), `--topic=${script.id}`, `--from-scribe=${out}`], {stdio: 'inherit'});
    return;
  }

  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) throw new Error('ELEVENLABS_API_KEY tiada dalam .env');
  const {voice_id, model_id, fallback_model_id, text} = script.voice;
  const call = async (model: string) =>
    fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id}/with-timestamps?output_format=mp3_44100_192`, {
      method: 'POST',
      headers: {'xi-api-key': key, 'Content-Type': 'application/json'},
      body: JSON.stringify({text, model_id: model}),
    });
  let res = await call(model_id);
  if (!res.ok && fallback_model_id) {
    console.warn(`Model ${model_id} ditolak (${res.status}: ${(await res.text()).slice(0, 200)}). Cuba ${fallback_model_id}.`);
    res = await call(fallback_model_id);
  }
  if (!res.ok) throw new Error(`ElevenLabs gagal: ${res.status} ${await res.text()}`);
  const j: any = await res.json();
  fs.writeFileSync(vp, Buffer.from(j.audio_base64, 'base64'));
  const a = j.alignment ?? j.normalized_alignment;
  const words = charsToWords(a.characters, a.character_start_times_seconds, a.character_end_times_seconds);
  writeJson(wordsFile, {source: 'elevenlabs-with-timestamps', duration: +duration(vp).toFixed(3), words});
  console.log(`Siap: ${vp} (${duration(vp).toFixed(2)} s, ${words.length} perkataan). Semak transkrip sebelum render.`);
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
