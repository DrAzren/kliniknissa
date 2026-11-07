// Tukar words.json + script.json kepada: sempadan babak, frasa kapsyen.
export type Word = {text: string; start: number; end: number};
export type WordsFile = {source: string; duration: number; words: Word[]};

export type SceneDef = {id: string; marker: string | null; n?: number; label?: string};
export type ScriptFile = {
  id: string;
  title: string;
  scenes: SceneDef[];
  numberWords: string[];
  keywords: string[];
  corrections: Record<string, string>;
  cover: {
    kicker: string;
    headline: string[];
    highlight: string;
    sub: string;
    tags: string[];
  };
};

export type SceneTiming = SceneDef & {start: number; end: number; firstWord: number};
export type Token = {text: string; start: number; end: number; key: boolean; number: boolean};
export type Phrase = {tokens: Token[]; start: number; end: number; number: boolean};

export const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[“”"'‘’]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .trim();

// Buang tag emosi ([deadpan] dsb.) kalau transkripsi tersalah masukkan.
export const cleanWords = (w: Word[]) =>
  w.filter((x) => !/^\[.*\]$/.test(x.text.trim()) && norm(x.text) !== '');

export function sceneTimings(script: ScriptFile, wf: WordsFile): SceneTiming[] {
  const words = cleanWords(wf.words);
  const n = words.map((w) => norm(w.text));
  const out: SceneTiming[] = [];
  let from = 0;
  for (const sc of script.scenes) {
    if (!sc.marker) {
      out.push({...sc, start: 0, end: 0, firstWord: 0});
      continue;
    }
    const target = norm(sc.marker).split(/\s+/);
    let found = -1;
    for (let i = from; i < n.length && found < 0; i++) {
      if (target.every((t, k) => n[i + k] === t)) found = i;
    }
    if (found < 0) throw new Error(`Penanda babak "${sc.marker}" tidak dijumpai dalam words.json`);
    out.push({...sc, start: Math.max(0, words[found].start - 0.1), end: 0, firstWord: found});
    from = found + target.length;
  }
  for (let i = 0; i < out.length; i++) out[i].end = i + 1 < out.length ? out[i + 1].start : wf.duration;
  return out;
}

export function tokens(script: ScriptFile, wf: WordsFile): Token[] {
  const words = cleanWords(wf.words);
  const corr = Object.entries(script.corrections).map(([k, v]) => ({from: norm(k).split(/\s+/), to: v}));
  const nums = new Set(script.numberWords.map(norm));
  const toks: Token[] = [];
  for (let i = 0; i < words.length; ) {
    let matched = false;
    for (const c of corr) {
      if (c.from.every((t, k) => words[i + k] && norm(words[i + k].text) === t)) {
        const last = words[i + c.from.length - 1];
        const trail = (last.text.match(/[?!…]+$|\.\.\.$/) || [''])[0];
        const sentenceEnd = /[.,?!…]$/.test(last.text);
        toks.push({text: c.to + trail + (sentenceEnd && !trail ? '​' : ''), start: words[i].start, end: last.end, key: false, number: false});
        i += c.from.length;
        matched = true;
        break;
      }
    }
    if (matched) continue;
    const w = words[i];
    const isNum = nums.has(norm(w.text)) && /[.!]$/.test(w.text.trim()); // nombor berdiri sendiri ("Dua."), bukan "satu bandar"
    toks.push({text: isNum ? w.text.replace(/[^\p{L}]/gu, '') : w.text, start: w.start, end: w.end, key: false, number: isNum});
    i++;
  }
  // Kata kunci (boleh berbilang perkataan) -> kuning
  const kws = script.keywords.map(norm);
  for (let i = 0; i < toks.length; i++) {
    let acc = '';
    for (let j = i; j < Math.min(toks.length, i + 5); j++) {
      acc = (acc ? acc + ' ' : '') + norm(toks[j].text);
      if (kws.includes(acc)) for (let k = i; k <= j; k++) toks[k].key = true;
    }
  }
  return toks;
}

const endsSentence = (t: string) => /[.,?!…​]$/.test(t) || t.endsWith('...');

export function phrases(script: ScriptFile, wf: WordsFile): Phrase[] {
  const toks = tokens(script, wf);
  const out: Phrase[] = [];
  let cur: Token[] = [];
  const flush = () => {
    if (cur.length) out.push({tokens: cur, start: cur[0].start, end: cur[cur.length - 1].end, number: false});
    cur = [];
  };
  for (let i = 0; i < toks.length; i++) {
    const t = toks[i];
    if (t.number) {
      flush();
      out.push({tokens: [t], start: t.start, end: t.end, number: true});
      continue;
    }
    cur.push(t);
    const next = toks[i + 1];
    const nextEnds = next && endsSentence(next.text);
    const comma = /,$/.test(t.text) && !/[.?!…]$/.test(t.text);
    const nextIsLast = next && /[.?!…]$/.test(next.text) && !/,$/.test(next.text);
    const hardEnd = endsSentence(t.text) && !comma;
    const softEnd = comma && cur.length >= 2 && !(nextIsLast && cur.length < 4);
    if (hardEnd || softEnd || cur.length >= 5 || (cur.length >= 4 && !nextEnds)) flush();
  }
  flush();
  // Frasa kekal di skrin sehingga frasa seterusnya (kalau jeda pendek)
  for (let i = 0; i < out.length; i++) {
    const nx = out[i + 1];
    const tail = out[i].end + 0.6;
    out[i].end = nx ? (nx.start - out[i].end < 1.0 ? nx.start : tail) : Math.min(wf.duration, tail + 0.6);
  }
  return out;
}

// Paparan: buang titik/koma di hujung, kekalkan ? ! ...
export const displayText = (t: string) => t.replace(/​/g, '').replace(/(?<!\.)[.,]$/, '');

// Cari masa perkataan pertama yang sepadan (untuk animasi yang perlu "tepat pada perkataan")
export function wordTime(wf: WordsFile, phrase: string, after = 0, fallback = 0): number {
  const words = cleanWords(wf.words);
  const t = norm(phrase).split(/\s+/);
  for (let i = 0; i < words.length; i++) {
    if (words[i].start < after) continue;
    if (t.every((x, k) => words[i + k] && norm(words[i + k].text) === x)) return words[i].start;
  }
  return fallback;
}
