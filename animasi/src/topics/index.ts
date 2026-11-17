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
import {SCENES as S5} from './darah-tinggi/scenes';
import {Cover as Cover5} from './darah-tinggi/Cover';
import script5 from '../../topics/darah-tinggi/script.json';
import words5 from '../../topics/darah-tinggi/words.json';
import {SCENES as S6} from './kemurungan-lelaki/scenes';
import {Cover as Cover6} from './kemurungan-lelaki/Cover';
import script6 from '../../topics/kemurungan-lelaki/script.json';
import words6 from '../../topics/kemurungan-lelaki/words.json';
import {SCENES as S7} from './hfmd/scenes';
import {Cover as Cover7} from './hfmd/Cover';
import script7 from '../../topics/hfmd/script.json';
import words7 from '../../topics/hfmd/words.json';
import {SCENES as S8} from './strok/scenes';
import {Cover as Cover8} from './strok/Cover';
import script8 from '../../topics/strok/script.json';
import words8 from '../../topics/strok/words.json';
import {SCENES as S9} from './murung-selepas-bersalin/scenes';
import {Cover as Cover9} from './murung-selepas-bersalin/Cover';
import script9 from '../../topics/murung-selepas-bersalin/script.json';
import words9 from '../../topics/murung-selepas-bersalin/words.json';
import {SCENES as S10} from './batuk-kering-tb/scenes';
import {Cover as Cover10} from './batuk-kering-tb/Cover';
import script10 from '../../topics/batuk-kering-tb/script.json';
import words10 from '../../topics/batuk-kering-tb/words.json';
import {SCENES as S11} from './refluks-asid/scenes';
import {Cover as Cover11} from './refluks-asid/Cover';
import script11 from '../../topics/refluks-asid/script.json';
import words11 from '../../topics/refluks-asid/words.json';
import {SCENES as S12} from './adhd-dewasa/scenes';
import {Cover as Cover12} from './adhd-dewasa/Cover';
import script12 from '../../topics/adhd-dewasa/script.json';
import words12 from '../../topics/adhd-dewasa/words.json';
import {SCENES as S13} from './sawan-demam/scenes';
import {Cover as Cover13} from './sawan-demam/Cover';
import script13 from '../../topics/sawan-demam/script.json';
import words13 from '../../topics/sawan-demam/words.json';
import {SCENES as S14} from './buah-pinggang/scenes';
import {Cover as Cover14} from './buah-pinggang/Cover';
import script14 from '../../topics/buah-pinggang/script.json';
import words14 from '../../topics/buah-pinggang/words.json';
import {SCENES as S15} from './kebimbangan-gad/scenes';
import {Cover as Cover15} from './kebimbangan-gad/Cover';
import script15 from '../../topics/kebimbangan-gad/script.json';
import words15 from '../../topics/kebimbangan-gad/words.json';
import {SCENES as S16} from './cirit-birit-anak/scenes';
import {Cover as Cover16} from './cirit-birit-anak/Cover';
import script16 from '../../topics/cirit-birit-anak/script.json';
import words16 from '../../topics/cirit-birit-anak/words.json';

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
  'darah-tinggi': {script: script5 as ScriptFile, words: words5 as WordsFile, scenes: S5, Cover: Cover5},
  'kemurungan-lelaki': {script: script6 as ScriptFile, words: words6 as WordsFile, scenes: S6, Cover: Cover6},
  'strok': {script: script8 as ScriptFile, words: words8 as WordsFile, scenes: S8, Cover: Cover8},
  'murung-selepas-bersalin': {script: script9 as ScriptFile, words: words9 as WordsFile, scenes: S9, Cover: Cover9},
  'batuk-kering-tb': {script: script10 as ScriptFile, words: words10 as WordsFile, scenes: S10, Cover: Cover10},
  'refluks-asid': {script: script11 as ScriptFile, words: words11 as WordsFile, scenes: S11, Cover: Cover11},
  'adhd-dewasa': {script: script12 as ScriptFile, words: words12 as WordsFile, scenes: S12, Cover: Cover12},
  'sawan-demam': {script: script13 as ScriptFile, words: words13 as WordsFile, scenes: S13, Cover: Cover13},
  'buah-pinggang': {script: script14 as ScriptFile, words: words14 as WordsFile, scenes: S14, Cover: Cover14},
  'kebimbangan-gad': {script: script15 as ScriptFile, words: words15 as WordsFile, scenes: S15, Cover: Cover15},
  'cirit-birit-anak': {script: script16 as ScriptFile, words: words16 as WordsFile, scenes: S16, Cover: Cover16},
  'hfmd': {script: script7 as ScriptFile, words: words7 as WordsFile, scenes: S7, Cover: Cover7},
};
