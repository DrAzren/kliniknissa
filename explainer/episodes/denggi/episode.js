// KLINIK NISSA explainer: "Nyamuk Aedes & denggi" (Dr Aminah).
// Every shot is a pure function of time t, timed from timeline.json (segment
// and word times of the narration), so a new voice take re-times everything.
import * as THREE from 'three';
import { makeRenderer, loadEnvelope, toScreen, clamp, lerp, inv, smooth, easeOut, easeInOut, keys, W, H } from '../../shared/core.js';
import { blinkAt } from '../../shared/people.js';
import { Overlay, pop, ICONS } from '../../shared/overlay.js';
import { buildEstate, buildBedroom, buildClinic, buildHolo, buildYard, buildBite, LOGO_READY } from './worlds.js';

const FPS = 30;
const stage = document.getElementById('stage');
const canvas = document.createElement('canvas');
stage.appendChild(canvas);
const renderer = makeRenderer(canvas);
const ov = new Overlay(stage);
const estate = buildEstate();
const bedroom = buildBedroom();
const clinic = buildClinic();
const holo = buildHolo();
const yard = buildYard();
const bite = buildBite();
const cam = new THREE.PerspectiveCamera(45, W / H, 0.02, 3000);
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const scr = (p) => toScreen(p, cam);

let TL = null, SEG = {}, env = null;
const bare = (s) => s.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
// start time of the n-th occurrence of `word` in segment `id`
function w(id, word, n = 0, end = false) {
  const ws = TL.words.filter((x) => x.seg === id && bare(x.text) === word);
  const x = ws[Math.min(n, ws.length - 1)];
  if (!x) return SEG[id].start;
  return end ? x.end : x.start;
}
// mouth: narration loudness if available, else a syllable-ish pulse on words
function talk(t, id) {
  if (id && SEG[id] && !(t >= SEG[id].start && t < SEG[id].end)) return 0;
  if (env) return clamp(env.at(t) * 1.25);
  const x = TL.words.find((q) => t >= q.start && t < q.end);
  if (!x) return 0;
  const k = (t - x.start) / (x.end - x.start);
  const syl = Math.max(1, Math.round(bare(x.text).length / 2.6));
  return 0.35 + 0.55 * Math.abs(Math.sin(k * syl * Math.PI));
}
function lookCam(pos, look, fov = 45) {
  cam.position.copy(pos);
  cam.up.set(0, 1, 0);
  cam.fov = fov;
  cam.updateProjectionMatrix();
  cam.lookAt(look);
  cam.updateMatrixWorld(true);
}

// ------------------------------------------------------------------ overlay UI
const css = document.createElement('style');
css.textContent = `
@font-face { font-family: 'Baloo 2'; font-weight: 800; src: url(/node_modules/@fontsource/baloo-2/files/baloo-2-latin-800-normal.woff2) format('woff2'); }
.chip { display:flex; align-items:center; gap:18px; padding:14px 34px 16px 16px; border-radius:999px; background:#052751; color:#fff;
  font-family:'Baloo 2'; font-weight:800; font-size:50px; letter-spacing:1px; white-space:nowrap; box-shadow:0 8px 0 rgba(0,0,0,.25), 0 0 0 6px #fff; }
.chip .n { width:74px; height:74px; border-radius:50%; background:#FAE24E; color:#052751; display:flex; align-items:center; justify-content:center; font-size:48px; }
.chip.red { background:#e53950; } .chip.red .n { background:#fff; color:#e53950; }
.card { width:840px; padding:30px 38px 34px; border-radius:40px; background:rgba(5,39,81,.92); color:#fff; font-family:Fredoka; font-weight:600;
  box-shadow:0 14px 40px rgba(0,0,0,.35), inset 0 0 0 5px rgba(76,223,218,.6); }
.card.red { box-shadow:0 14px 40px rgba(0,0,0,.35), inset 0 0 0 6px #ff4d5e; }
.card h3 { margin:0 0 14px; font-family:'Baloo 2'; font-weight:800; font-size:52px; color:#FAE24E; line-height:1.05; }
.row { display:flex; align-items:center; gap:22px; font-size:46px; line-height:1.15; margin:14px 0; transition:none; }
.row .ic { flex:0 0 66px; height:66px; border-radius:20px; background:#4CDFDA; color:#052751; display:flex; align-items:center; justify-content:center; font-family:'Baloo 2'; font-weight:800; font-size:44px; }
.row.bad .ic { background:#ff4d5e; color:#fff; }
.row.off { opacity:.18; }
.mcard { width:300px; padding:18px 10px 22px; border-radius:30px; background:rgba(5,39,81,.9); text-align:center; color:#fff; font-family:Fredoka; font-weight:600; font-size:34px;
  box-shadow:0 10px 30px rgba(0,0,0,.3), inset 0 0 0 5px #4CDFDA; }
.mcard b { display:block; font-family:'Baloo 2'; font-weight:800; font-size:44px; color:#FAE24E; letter-spacing:1px; }
.mcard.red { box-shadow:0 10px 30px rgba(0,0,0,.3), inset 0 0 0 6px #ff4d5e; } .mcard.red b { color:#fff; } .mcard.red { background:#e53950; }
.name { padding:16px 34px 18px; border-radius:28px; background:#fff; color:#052751; font-family:'Baloo 2'; font-weight:800; font-size:52px; line-height:1; box-shadow:0 10px 0 rgba(0,0,0,.2); border-left:18px solid #4CDFDA; }
.name small { display:block; font-family:Fredoka; font-weight:600; font-size:32px; color:#0f8f8a; margin-top:6px; }
.cta { width:900px; padding:26px 20px; border-radius:36px; background:#FAE24E; color:#052751; text-align:center; font-family:'Baloo 2'; font-weight:800; font-size:56px; line-height:1.08; box-shadow:0 12px 0 rgba(0,0,0,.25), 0 0 0 7px #fff; }
.badge img { width:132px; height:142px; border-radius:26px; box-shadow:0 6px 18px rgba(0,0,0,.35), 0 0 0 5px #fff; display:block; }
.timer { width:330px; height:330px; border-radius:50%; background:#052751; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center;
  font-family:'Baloo 2'; font-weight:800; box-shadow:0 0 0 10px #FAE24E, 0 14px 30px rgba(0,0,0,.35); }
.timer b { font-size:150px; line-height:.85; color:#FAE24E; } .timer span { font-size:40px; line-height:1.1; text-align:center; }
.fbc { width:860px; padding:30px 40px 36px; border-radius:40px; background:rgba(5,39,81,.93); color:#fff; font-family:Fredoka; font-weight:600; box-shadow:0 14px 40px rgba(0,0,0,.35), inset 0 0 0 5px #4CDFDA; }
.fbc h3 { margin:0 0 6px; font-family:'Baloo 2'; font-weight:800; font-size:56px; color:#FAE24E; }
.fbc .sub { font-size:32px; color:#9fe8ff; margin-bottom:12px; }
.fbc .r { display:flex; align-items:center; justify-content:space-between; font-size:44px; margin:16px 0 6px; }
.fbc .bar { height:22px; border-radius:11px; background:rgba(255,255,255,.15); overflow:hidden; }
.fbc .bar i { display:block; height:100%; border-radius:11px; background:linear-gradient(90deg,#4CDFDA,#FAE24E); }
.end { position:relative; width:${W}px; height:${H}px; background:linear-gradient(180deg,#052751 0%,#0a3a73 60%,#052751 100%); text-align:center; color:#fff; font-family:Fredoka; }
.end img { width:430px; margin-top:250px; border-radius:40px; box-shadow:0 0 0 8px rgba(255,255,255,.12); }
.end .a { margin-top:40px; font-family:'Baloo 2'; font-weight:800; font-size:44px; letter-spacing:4px; color:#4CDFDA; }
.end .b { margin:10px 60px 0; font-family:'Baloo 2'; font-weight:800; font-size:76px; line-height:1.0; }
.end .b span { color:#FAE24E; }
.end .wa { margin:44px auto 0; width:820px; padding:24px 0; border-radius:80px; background:#FAE24E; color:#052751; font-family:'Baloo 2'; font-weight:800; font-size:74px; line-height:1; }
.end .wa small { display:block; font-size:32px; letter-spacing:4px; margin-bottom:6px; }
.end .ad { margin-top:40px; font-size:36px; line-height:1.4; color:#dfe9f5; } .end .ad b { color:#fff; }
.end .ft { margin-top:36px; font-size:28px; line-height:1.4; color:#b9cbe0; }
`;
document.head.appendChild(css);

const RED = '#ff4d5e', YEL = '#FAE24E', TEALc = '#4CDFDA';
const chip = (id, n, text, t, a, b, { red = false, y = 330 } = {}) => {
  const p = pop(t, a, b);
  ov.html(id, `<div class="chip${red ? ' red' : ''}"><span class="n">${n}</span>${text}</div>`, { x: W / 2 - 40, y, o: p.o, s: p.s });
};
// list card: rows [{ t: time it appears, txt, ic, bad }]
function listCard(id, t, a, b, title, rows, { y = 820, red = false, x = W / 2 } = {}) {
  const p = pop(t, a, b, { from: 0.85 });
  const html = `<div class="card${red ? ' red' : ''}">${title ? `<h3>${title}</h3>` : ''}${rows
    .map((r, i) => `<div class="row${r.bad ? ' bad' : ''}${t < r.t ? ' off' : ''}"><span class="ic">${r.ic || '✓'}</span><span>${r.txt}</span></div>`)
    .join('')}</div>`;
  ov.html(id, html, { x, y, o: p.o, s: p.s });
}
const logoBadge = (t, o = 1) => {
  const p = pop(t, 3.0, TL.voice_end);
  ov.html('badge', `<div class="badge"><img src="/shared/brand/logo_crop.png"></div>`, { x: 965, y: 300, o: p.o * o, s: p.s });
};
const tag = (id, text, t, a, b, x, y, bg = '#ff8a3d', small = false, r = 0) => {
  const p = pop(t, a, b);
  ov.tag(id, text, { x, y, o: p.o, s: p.s, r }, { bg, small });
};

// ------------------------------------------------------------------ captions
let CHUNKS = [];
const KEY = {};
for (const k of ['aedes', 'denggi', 'nyamuk', 'malaria', 'je', 'gajah', 'anopheles', 'culex', 'hitam', 'putih', 'siang', 'pagi', 'petang', 'bertakung', 'jernih', 'botol', 'tayar', 'pasu',
  'demam', 'kepala', 'mata', 'otot', 'sendi', 'ruam', 'air', 'kritikal', 'perut', 'muntah', 'berdarah', 'lemah', 'sepuluh', 'minit', 'musnahkan', 'tutup', 'longkang', 'penghalau', 'panjang',
  'fbc', 'platelet', 'hematokrit', 'nissa', 'nilai', 'aminah', 'keluarga', 'gigitan', 'berdoa'])
  KEY[k] = YEL;
for (const k of ['hati-hati', 'segera', 'jangan']) KEY[k] = RED;
function buildChunks() {
  const out = [];
  let cur = [];
  const flush = () => { if (cur.length) out.push(cur); cur = []; };
  for (const x of TL.words) {
    if (cur.length && cur[cur.length - 1].seg !== x.seg) flush();
    cur.push(x);
    const txt = cur.map((q) => q.text).join(' ');
    if (/[.?!]$/.test(x.text) || txt.length >= 24 || (/[,:]$/.test(x.text) && txt.length >= 13)) flush();
  }
  flush();
  CHUNKS = out.map((c, i) => {
    let end = c[c.length - 1].end + 0.3;
    if (i + 1 < out.length) end = Math.min(end, out[i + 1][0].start - 0.02);
    return [Math.min(end, TL.voice_end), ...c.map((q) => [q.text, q.start])];
  });
}

// ====================================================================== SHOTS
const SC = {};

// A1: dusk, a swarm rises from stagnant water and drifts to Adam's window
SC.A1 = (t, s) => {
  const u = t - s.start, D = s.end - s.start;
  const E = estate;
  const k = easeInOut(clamp(u / D));
  const its = E.items;
  E.swarm.update(t, {
    size: 0.09,
    count: Math.round(lerp(250, 1100, clamp(u / 2.2))),
    spread: [lerp(1.5, 6, k), lerp(0.8, 2.8, k), lerp(1.5, 5, k)],
    centre: (out, i, p) => {
      const it = its[i % its.length].position;
      const kk = smooth(clamp((u - p.h * 1.2) / (D * 0.95)));
      out.set(lerp(it.x, E.win.x, kk), lerp(0.5, E.win.y + 0.6, kk) + Math.sin(kk * Math.PI) * 2.2, lerp(it.z, E.win.z + 1.2, kk));
    },
  });
  lookCam(V(lerp(-1.2, 1.4, k), lerp(0.7, 3.2, k), lerp(5.2, 9.5, k)), V(lerp(-0.6, 1.2, k), lerp(0.6, 2.2, k), lerp(1.0, -2.0, k)), lerp(50, 46, k));
  const p = pop(t, 0, w('A1', 'nyamuk', 0, true) + 0.6, { fin: 0.01 });
  const fl = Math.sin(t * 3) * 6;
  ov.bubble('hook', 'SATU GIGITAN...', { x: W / 2, y: 440 + fl, o: p.o, s: p.s }, { size: 118, top: '#ffffff', bot: '#ffd2d2', stroke: '#7a0f1f' });
  const q = pop(t, 0, w('A1', 'nyamuk', 0, true) + 0.6, { fin: 0.01 });
  ov.tag('hook2', 'BOLEH UBAH SEGALANYA', { x: W / 2, y: 610, o: q.o, s: q.s }, { bg: '#e53950' });
  ov.vignette(0.45);
  return E;
};

// A2: the bite (macro), then Adam feverish in bed, mother holding his hand
SC.A2 = (t, s) => {
  const tAdam = w('A2', 'adam') - 0.35;
  if (t < tAdam) {
    const u = t - s.start;
    const B = bite;
    const land = easeOut(clamp(u / 1.1));
    B.m.root.position.set(lerp(-2.2, 0, land), lerp(2.2, 0.72, land), lerp(1.5, 0, land));
    B.m.root.rotation.set(0, lerp(2.2, Math.PI / 2, land), 0);
    B.m.update(t, { flap: 1 - clamp((u - 0.9) / 0.25), bite: clamp((u - 1.3) / 0.6) });
    B.m.body.rotation.x = 0.05 + 0.25 * clamp((u - 1.2) / 0.5);
    B.bump.visible = u > 1.9;
    const kk = easeInOut(clamp(u / (tAdam - s.start)));
    lookCam(V(lerp(0.6, 0.25, kk), lerp(1.25, 0.95, kk), lerp(3.4, 2.5, kk)), V(0.1, 0.6, 0), 40);
    ov.vignette(0.5);
    return bite;
  }
  const u = t - tAdam;
  const R = bedroom;
  R.adam.pose({ fever: 1, blink: 0.75, smile: 0.1, sad: 0.6, headYaw: 0.15, armL: { x: -0.2, z: 0.9, el: -0.3 } });
  R.cloth.visible = true;
  R.glass.visible = false;
  // mother seated, leaning in, holding his hand
  R.ibu.root.position.set(2.15, 0, 0.0);
  const hand = new THREE.Vector3();
  R.adam.parts.arms.L.hand.getWorldPosition(hand);
  R.ibu.pose({ yaw: -Math.PI / 2, bob: -0.67, lean: 0.25, legL: { x: -1.5, knee: 1.5 }, legR: { x: -1.5, knee: 1.5 } });
  const pray = smooth(clamp((t - w('A2', 'berdoa') + 0.2) / 0.6));
  R.ibu.pose({
    yaw: -Math.PI / 2, bob: -0.67, lean: 0.25 + 0.1 * pray, legL: { x: -1.5, knee: 1.5 }, legR: { x: -1.5, knee: 1.5 },
    sad: 1, tear: (t * 0.35) % 1, blink: Math.max(blinkAt(t, 4), 0.6 * pray), headPitch: 0.12 + 0.2 * pray, headYaw: 0.35, lookY: -0.3,
    armR: { reach: R.ibu.toTorso(hand), pole: [-1, -1, -0.3] },
    armL: { reach: R.ibu.toTorso(hand.clone().add(V(0.05, 0.15, 0.25))), pole: [1, -1, -0.3] },
  });
  const kk = easeInOut(clamp(u / (s.end - tAdam)));
  lookCam(V(lerp(-2.4, -1.9, kk), lerp(3.9, 3.5, kk), lerp(3.6, 2.8, kk)), V(0.8, 1.6, -1.4), 44);
  ov.flash((1 - clamp(u / 0.35)) * 0.8);
  const th = pop(t, w('A2', 'panas') - 0.2, s.end - 0.1);
  ov.html('therm', `<div class="mcard red" style="width:250px"><b>39°C</b>DEMAM PANAS</div>`, { x: 250, y: 620, o: th.o, s: th.s, r: -4 });
  ov.vignette(0.4);
  return bedroom;
};

// B: Dr Aminah in the clinic introduces herself
function clinicDefault(show = { ibu: false, adam: false, rec: false }) {
  const C = clinic;
  C.ibu.root.visible = show.ibu;
  C.adam.root.visible = show.adam;
  C.rec.visible = show.rec;
  C.exam.visible = !show.rec;
  C.desk.visible = !show.rec;
  C.alarm.intensity = 0;
}
SC.B = (t, s) => {
  const u = t - s.start, D = s.end - s.start;
  clinicDefault();
  const A = clinic.aminah;
  A.root.position.set(0, 0, 0);
  const wave = clamp(1 - Math.abs((t - (s.start + 0.9)) / 1.1));
  const gest = smooth(clamp((t - w('B', 'puncanya') + 0.2) / 0.4)) * (1 - smooth(clamp((t - w('B', 'jom') - 0.2) / 0.4)));
  A.pose({
    talk: talk(t, 'B'), blink: blinkAt(t, 1), smile: 0.9, brow: 0.3 * gest, headYaw: 0.05 * Math.sin(t * 1.3), headRoll: 0.04 * Math.sin(t * 0.9),
    armR: wave > 0 ? { reach: [-0.95, 1.85 + Math.sin(t * 9) * 0.06, 0.35], pole: [-1, -0.4, -0.4] } : { reach: [-0.55, 0.15, 0.45], pole: [-1, -0.6, -0.4] },
    armL: { reach: [lerp(0.6, 0.55, gest), lerp(0.2, 0.95, gest), lerp(0.4, 0.75, gest)], pole: [1, -0.6, -0.4], point: gest },
  });
  const k = easeInOut(clamp(u / D));
  lookCam(V(lerp(0.5, 0.2, k), 3.9, lerp(8.6, 7.2, k)), V(0, 4.1, 0), 40);
  const n = pop(t, s.start + 0.5, w('B', 'puncanya') - 0.2);
  ov.html('nameB', `<div class="name">Dr Aminah<small>Klinik Nissa, Nilai</small></div>`, { x: 330, y: 1180, o: n.o, s: n.s });
  tag('aedesB', 'NYAMUK AEDES', t, w('B', 'aedes') - 0.1, s.end - 0.1, W / 2, 720, RED);
  return clinic;
};

// C: three kinds of mosquito on hologram pads
SC.C = (t, s) => {
  const u = t - s.start, D = s.end - s.start;
  const Ho = holo;
  Ho.big.root.visible = false;
  Ho.aminah.root.visible = true;
  const tA = w('C', 'anopheles'), tC = w('C', 'culex'), tE = w('C', 'aedes');
  Ho.pads.forEach(({ pad, ring, beam, k }, i) => {
    const on = k === 'anopheles' ? tA : k === 'culex' ? tC : tE;
    const lit = smooth(clamp((t - on + 0.2) / 0.4));
    Ho.ms[k].root.position.y = 0.95 + Math.sin(t * 1.6 + i) * 0.1;
    Ho.ms[k].root.rotation.y = Math.PI / 2 + Math.sin(t * 0.6 + i) * 0.5;
    Ho.ms[k].update(t, { flap: 0 });
    beam.material.opacity = 0.06 + 0.18 * lit;
    ring.scale.setScalar(1 + 0.06 * lit * Math.sin(t * 6));
  });
  const A = Ho.aminah;
  A.root.position.set(-1.9, 0, 1.6);
  const focus = t < tA - 0.3 ? -1 : t < tC - 0.2 ? 0 : t < tE - 0.2 ? 1 : 2;
  const target = focus < 0 ? null : Ho.pads[focus].pad.position.clone().add(V(0, 1.0, 0));
  A.pose({
    yaw: 0.35, talk: talk(t, 'C'), blink: blinkAt(t, 2), smile: 0.8,
    armL: target ? { reach: A.toTorso(target), pole: [1, -0.5, -0.5], point: 1 } : { reach: [0.6, 0.2, 0.45], pole: [1, -0.6, -0.4] },
  });
  const ky = keys(t, [[s.start, 3.6], [tA - 0.2, 3.9], [tC + 0.4, 3.7], [tE + 0.4, 3.0], [s.end, 3.0]]);
  const z = keys(t, [[s.start, 13.5], [tE - 0.2, 12.2], [tE + 0.5, 10.8], [s.end, 10.6]]);
  lookCam(V(0.1, ky + 0.4, z), V(0.1, ky, -1), 44);
  chip('chipC', 1, 'JENIS NYAMUK', t, s.start + 0.2, s.end - 0.05);
  const cards = [['ANOPHELES', 'Malaria', tA, -1], ['CULEX', 'Radang otak JE<br>& kaki gajah', tC, 0], ['AEDES', 'DENGGI', tE, 1]];
  cards.forEach(([nm, dz, at, i], j) => {
    const p = pop(t, at - 0.1, s.end - 0.05);
    const pos = scr(Ho.pads[j].pad.position.clone().add(V(2.0, 1.0, 0)));
    ov.html('mc' + j, `<div class="mcard${nm === 'AEDES' ? ' red' : ''}"><b>${nm}</b>${dz}</div>`, { x: clamp(pos.x + 60, 170, 900), y: clamp(pos.y, 450, 1330), o: p.o, s: p.s * (nm === 'AEDES' ? 1.12 : 1) });
  });
  return holo;
};

// D: macro Aedes on the rim of a water tub, morning light
SC.D = (t, s) => {
  const u = t - s.start, D = s.end - s.start;
  const Y = yard;
  Y.aminah.root.visible = false;
  Y.aedes.root.visible = true;
  Y.aedes.update(t, { flap: 0 });
  Y.larvae.forEach((l) => l.update(t));
  const P = Y.aedes.root.position;
  const a = lerp(-0.35, 0.35, easeInOut(clamp(u / D)));
  const r = lerp(1.75, 1.4, easeInOut(clamp(u / D)));
  lookCam(V(P.x + Math.sin(a) * r, P.y + 0.5, P.z + Math.cos(a) * r), V(P.x, P.y - 0.02, P.z), 38);
  chip('chipD', 2, 'KENALI AEDES', t, s.start + 0.1, s.end - 0.05);
  tag('dBlack', 'HITAM + BELANG PUTIH', t, w('D', 'hitam') - 0.1, w('D', 'siang') - 0.2, W / 2, 560, '#16181d');
  const sun = pop(t, w('D', 'siang') - 0.15, s.end - 0.05);
  ov.html('dSun', `<div class="mcard" style="width:360px"><b>☀ SIANG</b>waktu menggigit</div>`, { x: W / 2, y: 560, o: sun.o, s: sun.s });
  tag('dPagi', 'AWAL PAGI', t, w('D', 'pagi') - 0.1, s.end - 0.05, 290, 760, '#ff8a3d');
  tag('dPetang', 'LEWAT PETANG', t, w('D', 'petang') - 0.1, s.end - 0.05, 780, 760, '#ff8a3d');
  return yard;
};

// E: low glide over breeding sites with wriggling larvae
SC.E = (t, s) => {
  const Y = yard;
  Y.aminah.root.visible = false;
  Y.aedes.root.visible = false;
  Y.larvae.forEach((l) => l.update(t));
  const tP = w('E', 'pasu'), tT = w('E', 'tayar'), tB = w('E', 'penutup');
  const x = keys(t, [[s.start, -7.2], [tP, -6.2], [tT + 0.2, -3.2], [tB - 0.5, -0.2], [tB + 0.2, 2.2], [s.end, 2.25]]);
  const site = (n) => Y.sites.find((q) => q.name === n);
  const cap = site('cap');
  const isCap = t > tB;
  const camPos = isCap ? V(cap.x + 0.35, 0.55, cap.z + 0.8) : V(x, 2.5, 4.2);
  const look = isCap ? V(cap.x, 0.05, cap.z) : V(x, 0.45, 0.6);
  lookCam(camPos, look, isCap ? 36 : 44);
  ov.flash(isCap ? (1 - clamp((t - tB) / 0.3)) * 0.5 : 0);
  tag('ePot', 'PASU BUNGA', t, tP - 0.1, tT - 0.15, W / 2, 760, '#2f9bff');
  tag('eTyre', 'TAYAR BURUK', t, tT - 0.1, tB - 0.15, W / 2, 760, '#2f9bff');
  const p = pop(t, tB - 0.05, s.end);
  ov.bubble('eCap', 'PENUTUP BOTOL\nPUN CUKUP!', { x: W / 2, y: 520, o: p.o, s: p.s }, { size: 96 });
  const j = pop(t, s.start + 0.4, s.end);
  ov.tag('eJentik', 'JENTIK-JENTIK', { x: W / 2, y: 1210, o: j.o, s: j.s }, { bg: '#16181d', small: true });
  return yard;
};

// F: symptoms around Adam, mother brings water
SC.F = (t, s) => {
  const u = t - s.start, D = s.end - s.start;
  const R = bedroom;
  R.cloth.visible = true;
  R.adam.pose({ fever: 1, blink: 0.55 + 0.3 * blinkAt(t, 3), smile: 0.1, sad: 0.5, headYaw: 0.25, armL: { x: -0.2, z: 0.9, el: -0.3 } });
  const tM = w('F', 'minum');
  const give = smooth(clamp((t - tM + 0.6) / 0.8));
  R.glass.visible = true;
  R.ibu.root.position.set(2.15, 0, 0.0);
  const head = R.adam.headPos();
  R.ibu.pose({ yaw: -Math.PI / 2, bob: -0.67, lean: 0.2, legL: { x: -1.5, knee: 1.5 }, legR: { x: -1.5, knee: 1.5 }, sad: 0.7 });
  R.ibu.pose({
    yaw: -Math.PI / 2, bob: -0.67, lean: 0.2 + 0.15 * give, legL: { x: -1.5, knee: 1.5 }, legR: { x: -1.5, knee: 1.5 }, sad: 0.7, smile: 0.4, blink: blinkAt(t, 6),
    headPitch: 0.3, lookY: -0.3,
    armL: { reach: R.ibu.toTorso(head.clone().lerp(V(1.6, 1.8, 0.6), 1 - give).add(V(0.25, 0.1, 0.45))), pole: [1, -1, -0.3], wx: -0.3 },
    armR: { reach: [-0.45, 0.25, 0.55], pole: [-1, -1, -0.3] },
  });
  const k = easeInOut(clamp(u / D));
  lookCam(V(lerp(-2.6, -2.1, k), lerp(4.3, 4.0, k), lerp(4.2, 3.6, k)), V(0.6, 2.8, -1.4), 46);
  chip('chipF', 3, 'TANDA DENGGI', t, s.start + 0.1, s.end - 0.05);
  listCard('fList', t, w('F', 'demam') - 0.3, tM - 0.25, null, [
    { t: w('F', 'demam') - 0.1, txt: 'Demam panas mengejut', ic: '🌡' },
    { t: w('F', 'kepala') - 0.1, txt: 'Sakit kepala', ic: '✓' },
    { t: w('F', 'mata') - 0.1, txt: 'Sakit belakang mata', ic: '✓' },
    { t: w('F', 'otot') - 0.1, txt: 'Sakit otot & sendi', ic: '✓' },
    { t: w('F', 'ruam') - 0.1, txt: 'Ruam', ic: '✓' },
  ], { y: 700 });
  listCard('fCare', t, tM - 0.15, s.end - 0.05, null, [
    { t: tM - 0.1, txt: 'Minum banyak air', ic: '💧' },
    { t: w('F', 'jangan') - 0.1, txt: 'Jangan makan ubat tahan sakit sendiri', ic: '✕', bad: true },
  ], { y: 660 });
  return bedroom;
};

// G: warning signs; red alarm light in the clinic
SC.G = (t, s) => {
  const u = t - s.start, D = s.end - s.start;
  clinicDefault();
  clinic.alarm.intensity = 14 * (0.55 + 0.45 * Math.sin(t * 5));
  const A = clinic.aminah;
  A.root.position.set(0, 0, 0);
  const hh = smooth(clamp((t - s.start) / 0.4)) * (1 - smooth(clamp((t - w('G', 'bila') + 0.1) / 0.4)));
  A.pose({
    talk: talk(t, 'G'), blink: blinkAt(t, 5), smile: 0.15, brow: 0.6, headYaw: 0.04 * Math.sin(t * 1.1),
    armR: { reach: [-0.6, lerp(0.2, 1.5, hh), lerp(0.45, 0.7, hh)], pole: [-1, -0.5, -0.4], point: hh },
    armL: { reach: [0.55, 0.2, 0.45], pole: [1, -0.6, -0.4] },
  });
  const k = easeInOut(clamp(u / D));
  lookCam(V(lerp(-0.6, -0.2, k), 3.9, lerp(8.4, 7.6, k)), V(0, 4.3, 0), 40);
  chip('chipG', '⚠', 'HATI-HATI', t, s.start + 0.05, s.end - 0.05, { red: true });
  const tk = w('G', 'kritikal');
  const c = pop(t, w('G', 'bila') - 0.15, w('G', 'segera') - 0.2);
  ov.html('gCrit', `<div class="card red" style="width:820px;text-align:center"><h3 style="margin:0">DEMAM MULA TURUN</h3><div style="font-size:44px">= <b style="color:#ff8a9a">FASA KRITIKAL</b> (hari 3–7)</div></div>`, { x: W / 2, y: 640, o: c.o, s: c.s });
  listCard('gList', t, w('G', 'segera') - 0.2, s.end - 0.05, 'SEGERA KE KLINIK / HOSPITAL', [
    { t: w('G', 'perut') - 0.1, txt: 'Sakit perut teruk', ic: '!', bad: true },
    { t: w('G', 'muntah') - 0.1, txt: 'Muntah berterusan', ic: '!', bad: true },
    { t: w('G', 'berdarah') - 0.1, txt: 'Berdarah (gusi, hidung)', ic: '!', bad: true },
    { t: w('G', 'lemah') - 0.1, txt: 'Terlalu lemah', ic: '!', bad: true },
  ], { y: 660, red: true });
  void tk;
  return clinic;
};

// H: prevention in the yard: tip out water, close the drum, repellent
SC.H = (t, s) => {
  const u = t - s.start, D = s.end - s.start;
  const Y = yard;
  Y.aedes.root.visible = false;
  Y.aminah.root.visible = true;
  Y.larvae.forEach((l) => l.update(t));
  const A = Y.aminah;
  A.root.position.set(-0.6, 0, 2.6);
  const tMus = w('H', 'musnahkan'), tTut = w('H', 'tutup'), tPen = w('H', 'penghalau'), tBaju = w('H', 'baju');
  const hasPail = t < tTut + 0.4;
  Y.pail.visible = hasPail;
  Y.spray.visible = t > tPen - 0.4;
  const tip = smooth(clamp((t - tMus + 0.1) / 0.5)) * (1 - smooth(clamp((t - tTut) / 0.4)));
  Y.lid.position.y = lerp(2.4, 1.52, smooth(clamp((t - tTut) / 0.5)));
  Y.lid.rotation.z = lerp(0.6, 0, smooth(clamp((t - tTut) / 0.5)));
  const spray = smooth(clamp((t - tPen + 0.3) / 0.4)) * (1 - smooth(clamp((t - tBaju) / 0.4)));
  A.pose({
    yaw: 0.25, talk: talk(t, 'H'), blink: blinkAt(t, 7), smile: 0.9,
    armR: hasPail ? { reach: [-0.75, lerp(0.35, 0.85, tip), lerp(0.55, 0.85, tip)], pole: [-1, -0.6, -0.4], wz: lerp(0, -1.9, tip) } : { reach: [-0.55, 0.2, 0.45], pole: [-1, -0.6, -0.4] },
    armL: t > tPen - 0.4 ? { reach: [0.5, lerp(0.6, 1.1, spray), 0.75], pole: [1, -0.6, -0.4], wx: -0.2 } : { reach: [0.55, 0.2, 0.45], pole: [1, -0.6, -0.4] },
  });
  const k = easeInOut(clamp(u / D));
  lookCam(V(lerp(-0.2, 0.4, k), 3.6, lerp(11.6, 10.6, k)), V(lerp(-0.3, 0.1, k), 4.0, 0.8), 44);
  // water pouring out of the pail
  if (tip > 0.6 && hasPail) {
    const pp = new THREE.Vector3();
    Y.pail.getWorldPosition(pp);
    const sp = scr(pp);
    for (let i = 0; i < 14; i++) {
      const ph = (t * 3 + i / 14) % 1;
      ov.dot(sp.x - 40 - ph * 40, sp.y + ph * 420, 9 * (1 - ph * 0.5), '#7cc4ff', (tip - 0.6) * 2.5 * (1 - ph));
    }
  }
  if (spray > 0.3) ov.sparkles(t, { n: 18, seed: 77, x: 560, y: 600, w: 380, h: 300, a: spray, size: 16, colors: ['#e8fff0', '#bff5d2', '#ffffff'] });
  chip('chipH', 4, 'PENCEGAHAN', t, s.start + 0.05, s.end - 0.05);
  const tm = pop(t, w('H', 'sepuluh') - 0.15, tMus - 0.2);
  ov.html('timer', `<div class="timer"><b>10</b><span>MINIT<br>SEMINGGU</span></div>`, { x: W / 2, y: 640, o: tm.o, s: tm.s });
  listCard('hList', t, tMus - 0.15, s.end - 0.05, '10 MINIT SEMINGGU', [
    { t: tMus - 0.1, txt: 'Cari & musnahkan air bertakung', ic: '✓' },
    { t: tTut - 0.1, txt: 'Tutup bekas air', ic: '✓' },
    { t: w('H', 'bersihkan') - 0.1, txt: 'Bersihkan longkang', ic: '✓' },
    { t: tPen - 0.1, txt: 'Guna penghalau nyamuk', ic: '✓' },
    { t: tBaju - 0.1, txt: 'Baju lengan panjang', ic: '✓' },
  ], { y: 680 });
  return yard;
};

// J: FBC at Klinik Nissa: Dr Aminah explains the report to mother and Adam
SC.J = (t, s) => {
  const u = t - s.start, D = s.end - s.start;
  clinicDefault({ ibu: true, adam: true });
  const C = clinic;
  const A = C.aminah;
  A.root.position.set(0.1, 0, 0.9);
  C.ibu.root.position.set(3.9, 0, 0.6);
  C.adam.root.position.set(2.35, 0.45, -0.35);
  C.adam.pose({ yaw: -0.5, smile: 1, blink: blinkAt(t, 8), legL: { x: -1.5, knee: 1.5 }, legR: { x: -1.5, knee: 1.5 }, armL: { x: -0.3, z: 0.25, el: -0.9 }, lookX: -0.4 });
  C.ibu.pose({ yaw: -0.7, smile: 0.8, blink: blinkAt(t, 9), armR: { reach: [-0.5, 0.6, 0.6], pole: [-1, -0.6, -0.3] }, lookX: -0.3 });
  const tF = w('J', 'fbc');
  A.pose({
    yaw: 0.45, talk: talk(t), blink: blinkAt(t, 10), smile: 0.85,
    armL: { reach: [0.75, lerp(0.3, 1.2, smooth(clamp((t - tF + 0.4) / 0.5))), 0.7], pole: [1, -0.6, -0.4], point: 1 },
  });
  const k = easeInOut(clamp(u / D));
  lookCam(V(lerp(1.2, 1.6, k), 3.8, lerp(12.6, 11.6, k)), V(1.4, 3.4, 0), 44);
  const q = pop(t, s.start + 0.2, tF - 0.2);
  ov.bubble('jQ', 'DEMAM TIBA-TIBA?\nJANGAN TUNGGU!', { x: W / 2, y: 600, o: q.o, s: q.s }, { size: 88 });
  chip('chipJ', 5, 'UJIAN DARAH (FBC)', t, s.start + 0.1, s.end - 0.05);
  const fb = pop(t, tF - 0.2, s.end - 0.05, { from: 0.85 });
  const bar = (word, v) => Math.round(100 * v * smooth(clamp((t - w('J', word) + 0.1) / 0.6)));
  ov.html('fbc', `<div class="fbc"><h3>FULL BLOOD COUNT</h3><div class="sub">Ujian darah penuh · Klinik Nissa</div>
    <div class="r"><span>Platelet</span><span>✓</span></div><div class="bar"><i style="width:${bar('platelet', 0.72)}%"></i></div>
    <div class="r"><span>Sel darah putih</span><span>✓</span></div><div class="bar"><i style="width:${bar('sel', 0.55)}%"></i></div>
    <div class="r"><span>Hematokrit</span><span>✓</span></div><div class="bar"><i style="width:${bar('hematokrit', 0.64)}%"></i></div></div>`, { x: W / 2, y: 640, o: fb.o, s: fb.s });
  return clinic;
};

// K: CTA at the Klinik Nissa reception
SC.K = (t, s) => {
  const u = t - s.start, D = s.end - s.start;
  clinicDefault({ rec: true });
  const A = clinic.aminah;
  A.root.position.set(0.9, 0, -0.9);
  const wave = clamp(1 - Math.abs((t - (s.end - 1.0)) / 1.0)) + clamp(1 - Math.abs((t - (s.start + 0.6)) / 0.7));
  A.pose({
    talk: talk(t, 'K'), blink: blinkAt(t, 11), smile: 1, headRoll: 0.05 * Math.sin(t * 1.2),
    armR: wave > 0.05 ? { reach: [-0.95, 1.85 + Math.sin(t * 10) * 0.07, 0.35], pole: [-1, -0.4, -0.4] } : { reach: [-0.55, 0.2, 0.45], pole: [-1, -0.6, -0.4] },
    armL: { reach: [0.6, 0.6, 0.6], pole: [1, -0.6, -0.4], thumb: 1, wy: 1.2 },
  });
  const k = easeInOut(clamp(u / D));
  lookCam(V(lerp(0.2, 0.6, k), 3.6, lerp(9.2, 8.2, k)), V(0.5, 2.9, -1), 42);
  const c = pop(t, w('K', 'ujian') - 0.2, s.end);
  ov.html('cta', `<div class="cta">Ujian Darah Penuh (FBC)<br>&amp; Pemeriksaan Demam</div>`, { x: W / 2, y: 1150, o: c.o, s: c.s });
  const b = pop(t, w('K', 'hapuskan') - 0.15, s.end);
  ov.bubble('kSlogan', 'HAPUSKAN AEDES,\nSELAMATKAN KELUARGA!', { x: W / 2, y: 560, o: b.o, s: b.s }, { size: 82 });
  return clinic;
};

function endCard(t) {
  const k = clamp((t - TL.voice_end) / 0.5);
  ov.html('end', `<div class="end"><img src="/shared/brand/logo_crop.png"><div class="a">KLINIK NISSA, NILAI</div>
    <div class="b">Ujian Darah Penuh <span>(FBC)</span><br>&amp; Pemeriksaan Demam</div>
    <div class="wa"><small>WHATSAPP</small>012-608 1411</div>
    <div class="ad"><b>Klinik Nissa</b><br>9697, Jalan BBN 1/3C, Pusat Bandar Putra Point,<br>71800 Nilai, Negeri Sembilan</div>
    <div class="ft">Video ini untuk pendidikan kesihatan, bukan diagnosis.<br>Dapatkan nasihat doktor untuk rawatan.</div></div>`, { x: W / 2, y: H / 2, o: k, s: 0.96 + 0.04 * easeOut(k) });
}

function frame(t) {
  ov.begin();
  cam.aspect = W / H;
  cam.updateProjectionMatrix();
  let world;
  if (t >= TL.voice_end) {
    world = SC.K(Math.min(t, TL.voice_end - 0.01), SEG.K);
  } else {
    const s = TL.segments.find((q) => t >= q.start && t < q.end) || TL.segments[TL.segments.length - 1];
    world = SC[s.id](t, s);
  }
  if (world.sky) world.sky.position.copy(cam.position);
  renderer.render(world.scene, cam);
  ov.vignette(0.18);
  if (t < TL.voice_end) {
    logoBadge(t);
    ov.captions(t, CHUNKS, KEY);
  } else endCard(t);
  ov.end();
}

// Thumbnail: worried mother by Adam's bed, a swarm silhouette, big title
function thumbnail() {
  ov.begin();
  const t = SEG.A2.end - 1.0;
  const world = SC.A2(t, SEG.A2);
  lookCam(V(3.9, 3.9, 4.2), V(0.6, 1.6, -1.0), 44);
  renderer.render(world.scene, cam);
  ov.begin();
  const g = ov.g;
  const top = g.createLinearGradient(0, 0, 0, 900);
  top.addColorStop(0, 'rgba(5,39,81,0.85)');
  top.addColorStop(1, 'rgba(5,39,81,0)');
  g.fillStyle = top;
  g.fillRect(0, 0, W, 900);
  ov.vignette(0.35);
  ov.bubble('thT', 'AWAS\nNYAMUK AEDES!', { x: W / 2, y: 470, r: -2 }, { size: 120, top: '#ffffff', bot: '#ffd2d2', stroke: '#7a0f1f' });
  ov.tag('thS', 'TANDA DENGGI & CARA CEGAH', { x: W / 2, y: 720 }, { bg: '#e53950' });
  ov.html('thLogo', `<div class="badge"><img src="/shared/brand/logo_crop.png" style="width:190px;height:204px"></div>`, { x: W / 2, y: 1500 });
  ov.end();
}

window.EP = {
  fps: FPS,
  get duration() { return TL ? TL.total : 1; },
  frame,
  thumbnail,
  ready: (async () => {
    TL = await (await fetch('./timeline.json')).json();
    for (const s of TL.segments) SEG[s.id] = s;
    buildChunks();
    if (!TL.placeholder) env = await loadEnvelope('./audio/narration.mp3', FPS);
    await Promise.all(['800 60px "Baloo 2"', '700 60px "Baloo 2"', '700 60px Fredoka', '600 60px Fredoka'].map((f) => document.fonts.load(f)));
    await LOGO_READY;
    await new Promise((r) => { const im = new Image(); im.onload = r; im.onerror = r; im.src = '/shared/brand/logo_crop.png'; });
    frame(0);
    return true;
  })(),
};
