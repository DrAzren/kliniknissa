import path from 'node:path';
import fs from 'node:fs';
import {bundle} from '@remotion/bundler';
import {selectComposition} from '@remotion/renderer';
import {ROOT} from './util';

// Guna Chromium sedia ada kalau ditetapkan (REMOTION_BROWSER) — kalau tidak Remotion muat turun sendiri.
export const browserExecutable = (() => {
  if (process.env.REMOTION_BROWSER) return process.env.REMOTION_BROWSER;
  const pw = '/opt/pw-browsers';
  if (fs.existsSync(pw)) {
    for (const d of fs.readdirSync(pw).filter((x) => x.startsWith('chromium_headless_shell'))) {
      for (const sub of fs.readdirSync(path.join(pw, d))) {
        const p = path.join(pw, d, sub, 'chrome-headless-shell');
        if (fs.existsSync(p)) return p;
      }
    }
  }
  return null;
})();

let cached: string | null = null;
export const getBundle = async () => {
  if (!cached) cached = await bundle({entryPoint: path.join(ROOT, 'src/index.ts'), publicDir: path.join(ROOT, 'public')});
  return cached;
};
export const getComp = async (id: string, inputProps: Record<string, unknown>) =>
  selectComposition({serveUrl: await getBundle(), id, inputProps, browserExecutable});
