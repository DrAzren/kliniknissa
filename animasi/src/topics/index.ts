import React from 'react';
import {ScriptFile, WordsFile} from '../lib/timeline';
import {AvatarPreset} from '../components/Avatar';
import {SceneProps, SCENES as S1} from './dunia-tanpa-kesihatan-mental/scenes';
import {Cover as Cover1} from './dunia-tanpa-kesihatan-mental/Cover';
import script1 from '../../topics/dunia-tanpa-kesihatan-mental/script.json';
import words1 from '../../topics/dunia-tanpa-kesihatan-mental/words.json';
import {SCENES as S2} from './kenali-bipolar/scenes';
import {Cover as Cover2} from './kenali-bipolar/Cover';
import script2 from '../../topics/kenali-bipolar/script.json';
import words2 from '../../topics/kenali-bipolar/words.json';
import {SCENES as S3} from './kenali-eczema/scenes';
import {Cover as Cover3} from './kenali-eczema/Cover';
import script3 from '../../topics/kenali-eczema/script.json';
import words3 from '../../topics/kenali-eczema/words.json';
import {SCENES as S4} from './jenis-nyamuk/scenes';
import {Cover as Cover4} from './jenis-nyamuk/Cover';
import script4 from '../../topics/jenis-nyamuk/script.json';
import words4 from '../../topics/jenis-nyamuk/words.json';
import {SCENES as S5} from './kenali-bpd/scenes';
import {Cover as Cover5} from './kenali-bpd/Cover';
import script5 from '../../topics/kenali-bpd/script.json';
import words5 from '../../topics/kenali-bpd/words.json';

export type Topic = {
  script: ScriptFile;
  words: WordsFile;
  scenes: Record<string, React.FC<SceneProps>>;
  Cover: React.FC<{preset: AvatarPreset; script: ScriptFile}>;
};

// Daftar topik baharu di sini (salin folder topik sedia ada sebagai templat)
export const TOPICS: Record<string, Topic> = {
  'dunia-tanpa-kesihatan-mental': {script: script1 as ScriptFile, words: words1 as WordsFile, scenes: S1, Cover: Cover1},
  'kenali-bipolar': {script: script2 as ScriptFile, words: words2 as WordsFile, scenes: S2, Cover: Cover2},
  'kenali-eczema': {script: script3 as ScriptFile, words: words3 as WordsFile, scenes: S3, Cover: Cover3},
  'jenis-nyamuk': {script: script4 as ScriptFile, words: words4 as WordsFile, scenes: S4, Cover: Cover4},
  'kenali-bpd': {script: script5 as ScriptFile, words: words5 as WordsFile, scenes: S5, Cover: Cover5},
};
