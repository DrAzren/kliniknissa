// Sets for "Nyamuk Aedes & denggi": dusk housing estate (hook swarm), Adam's
// bedroom, Klinik Nissa consultation room + reception, hologram lab, and the
// sunny yard with breeding sites. All procedural.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { rng } from '../../shared/core.js';
import { makePerson } from '../../shared/people.js';
import { makeMosquito, makeSwarm, makeLarva } from '../../shared/mosquito.js';
import { add, makeSky, makeTree, makeBush, makeHouse, makeLamp, glow } from '../../shared/props.js';

const std = (color, rough = 0.7, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });
export const NAVY = 0x052751, TEAL = 0x4cdfda, YELLOW = 0xfae24e;

function shadowCfg(light, size, map = 2048) {
  light.castShadow = true;
  light.shadow.mapSize.set(map, map);
  const c = light.shadow.camera;
  c.left = -size; c.right = size; c.top = size; c.bottom = -size; c.near = 0.5; c.far = 200;
  light.shadow.bias = -0.0005;
  light.shadow.normalBias = 0.03;
}

function tex(size, draw, repeat = 1, h = size) {
  const c = document.createElement('canvas');
  c.width = size;
  c.height = h;
  draw(c.getContext('2d'), size, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  t.anisotropy = 8;
  return t;
}

const grassTex = (base, light, dark, seed, rep) => tex(512, (g, s) => {
  g.fillStyle = base;
  g.fillRect(0, 0, s, s);
  const R = rng(seed);
  for (let i = 0; i < 2600; i++) {
    const x = R() * s, y = R() * s, l = 6 + R() * 14;
    g.strokeStyle = R() < 0.5 ? light : dark;
    g.globalAlpha = 0.25 + R() * 0.35;
    g.lineWidth = 2;
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + (R() - 0.5) * 6, y - l); g.stroke();
  }
  g.globalAlpha = 1;
}, rep);

const tileTex = (a, b, rep) => tex(256, (g, s) => {
  g.fillStyle = a; g.fillRect(0, 0, s, s);
  g.strokeStyle = b; g.lineWidth = 6;
  g.strokeRect(0, 0, s, s);
}, rep);

const woodTex = (rep) => tex(512, (g, s) => {
  g.fillStyle = '#c99a6b'; g.fillRect(0, 0, s, s);
  const R = rng(4);
  for (let i = 0; i < 8; i++) { g.fillStyle = i % 2 ? '#bf8f60' : '#d3a678'; g.fillRect(0, i * 64, s, 62); }
  g.strokeStyle = 'rgba(120,80,45,0.35)'; g.lineWidth = 2;
  for (let i = 0; i < 60; i++) { const y = R() * s; g.beginPath(); g.moveTo(0, y); g.bezierCurveTo(s * 0.3, y + 6, s * 0.6, y - 6, s, y + 3); g.stroke(); }
}, rep);

const loader = new THREE.TextureLoader();
export const LOGO = new THREE.Texture();
LOGO.colorSpace = THREE.SRGBColorSpace;
export const LOGO_READY = new Promise((res) => loader.load('/shared/brand/logo_crop.png', (tx) => { LOGO.image = tx.image; LOGO.needsUpdate = true; res(); }, undefined, () => res()));

// --------------------------------------------------------------- props
export function makeWaterMat(color = 0x3d6f8a, opacity = 0.55) {
  return new THREE.MeshPhysicalMaterial({ color, roughness: 0.05, metalness: 0.1, transparent: true, opacity, clearcoat: 1, depthWrite: false });
}
function pot(R, { r = 0.6, h = 0.7, color = 0xb5603a, water = true } = {}) {
  const g = new THREE.Group();
  const m = add(g, new THREE.CylinderGeometry(r, r * 0.75, h, 24, 1, true), std(color, 0.85), [0, h / 2, 0]);
  m.material.side = THREE.DoubleSide;
  add(g, new THREE.CircleGeometry(r * 0.75, 24), std(0x3b2a20), [0, 0.02, 0], [-Math.PI / 2, 0, 0]);
  add(g, new THREE.TorusGeometry(r, 0.06, 8, 28), std(color, 0.8), [0, h, 0], [Math.PI / 2, 0, 0]);
  if (water) {
    const w = add(g, new THREE.CircleGeometry(r * 0.97, 28), makeWaterMat(), [0, h - 0.1, 0], [-Math.PI / 2, 0, 0], [1, 1, 1], false);
    w.renderOrder = 3;
    g.userData.water = h - 0.1;
  }
  g.userData.r = r;
  return g;
}
function tyre({ r = 0.75 } = {}) {
  const g = new THREE.Group();
  add(g, new THREE.TorusGeometry(r, r * 0.38, 18, 36), std(0x1d1e22, 0.9), [0, r * 0.38, 0], [Math.PI / 2, 0, 0]);
  const w = add(g, new THREE.RingGeometry(r * 0.55, r * 1.05, 32), makeWaterMat(0x4a6a55, 0.7), [0, r * 0.3, 0], [-Math.PI / 2, 0, 0], [1, 1, 1], false);
  w.renderOrder = 3;
  g.userData.water = r * 0.3;
  return g;
}
function tub({ w = 1.2, h = 0.6, color = 0x4aa3e0 } = {}) {
  const g = new THREE.Group();
  const m = add(g, new THREE.CylinderGeometry(w * 0.5, w * 0.42, h, 4, 1, true), std(color, 0.5), [0, h / 2, 0], [0, Math.PI / 4, 0]);
  m.material.side = THREE.DoubleSide;
  add(g, new THREE.PlaneGeometry(w * 0.6, w * 0.6), std(color, 0.6), [0, 0.02, 0], [-Math.PI / 2, 0, 0]);
  const wa = add(g, new THREE.PlaneGeometry(w * 0.68, w * 0.68), makeWaterMat(0x5c8fa8, 0.5), [0, h - 0.12, 0], [-Math.PI / 2, 0, 0], [1, 1, 1], false);
  wa.renderOrder = 3;
  g.userData.water = h - 0.12;
  return g;
}
function bottleCap() {
  const g = new THREE.Group();
  const m = add(g, new THREE.CylinderGeometry(0.16, 0.16, 0.1, 20, 1, true), std(0xe53935, 0.4), [0, 0.05, 0]);
  m.material.side = THREE.DoubleSide;
  add(g, new THREE.CircleGeometry(0.16, 20), std(0xe53935, 0.4), [0, 0.005, 0], [-Math.PI / 2, 0, 0]);
  const w = add(g, new THREE.CircleGeometry(0.155, 20), makeWaterMat(0x7fb3c8, 0.6), [0, 0.085, 0], [-Math.PI / 2, 0, 0], [1, 1, 1], false);
  w.renderOrder = 3;
  return g;
}
export function makePail(color = 0x2f9bff) {
  const g = new THREE.Group();
  const m = add(g, new THREE.CylinderGeometry(0.36, 0.28, 0.6, 22, 1, true), std(color, 0.45), [0, -0.3, 0]);
  m.material.side = THREE.DoubleSide;
  add(g, new THREE.CircleGeometry(0.28, 22), std(color, 0.5), [0, -0.6, 0], [Math.PI / 2, 0, 0]);
  add(g, new THREE.TorusGeometry(0.36, 0.02, 6, 24, Math.PI), std(0x666a75, 0.4, { metalness: 0.5 }), [0, 0, 0], [0, 0, 0]);
  return g;
}
export function makeSpray() {
  const g = new THREE.Group();
  add(g, new RoundedBoxGeometry(0.22, 0.5, 0.14, 3, 0.05), std(0x2fbf5a, 0.4), [0, 0.08, 0]);
  add(g, new THREE.CylinderGeometry(0.05, 0.06, 0.12, 12), std(0xffffff, 0.4), [0, 0.38, 0]);
  add(g, new THREE.BoxGeometry(0.16, 0.12, 0.02), std(0xffffff, 0.4), [0, 0.1, 0.075]);
  return g;
}
function makeGlass() {
  const g = new THREE.Group();
  add(g, new THREE.CylinderGeometry(0.11, 0.09, 0.3, 18, 1, true), new THREE.MeshPhysicalMaterial({ color: 0xdff2ff, roughness: 0.05, transparent: true, opacity: 0.45, side: THREE.DoubleSide }), [0, 0, 0]);
  add(g, new THREE.CylinderGeometry(0.1, 0.085, 0.22, 18), makeWaterMat(0x9fd8ff, 0.5), [0, -0.03, 0]);
  return g;
}
function drum({ lid = 1 } = {}) {
  const g = new THREE.Group();
  add(g, new THREE.CylinderGeometry(0.7, 0.7, 1.5, 28), std(0x1f7ad1, 0.5), [0, 0.75, 0]);
  for (const y of [0.35, 1.15]) add(g, new THREE.TorusGeometry(0.71, 0.04, 6, 28), std(0x1a69b5, 0.5), [0, y, 0], [Math.PI / 2, 0, 0]);
  const L = new THREE.Group();
  L.position.set(0, 1.52, 0);
  g.add(L);
  add(L, new THREE.CylinderGeometry(0.76, 0.76, 0.08, 28), std(0x175aa0, 0.5));
  add(L, new THREE.CylinderGeometry(0.12, 0.12, 0.08, 12), std(0x175aa0, 0.5), [0, 0.07, 0]);
  g.userData.lid = L;
  return g;
}
function plant(R, s = 1) {
  const g = new THREE.Group();
  add(g, new THREE.CylinderGeometry(0.35 * s, 0.28 * s, 0.6 * s, 18), std(0xe9e2d6, 0.6), [0, 0.3 * s, 0]);
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2;
    const l = add(g, new THREE.SphereGeometry(0.42 * s, 12, 8), std(i % 2 ? 0x3fa35a : 0x2f8a4a, 0.8), [Math.cos(a) * 0.25 * s, (0.95 + R() * 0.4) * s, Math.sin(a) * 0.25 * s], [a, 0, 0.5], [0.35, 1, 0.2]);
    l.rotation.set(Math.sin(a) * 0.5, a, Math.cos(a) * 0.5);
  }
  return g;
}
function picture(texture, w, h) {
  const g = new THREE.Group();
  add(g, new RoundedBoxGeometry(w + 0.2, h + 0.2, 0.08, 3, 0.04), std(0xffffff, 0.5));
  add(g, new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: texture }), [0, 0, 0.045], [0, 0, 0], [1, 1, 1], false);
  return g;
}
function label(text, { w = 1024, h = 256, bg = '#052751', fg = '#FAE24E', font = 120 } = {}) {
  return tex(w, (g) => {
    g.fillStyle = bg; g.fillRect(0, 0, w, h);
    g.fillStyle = fg; g.font = `800 ${font}px "Baloo 2", Fredoka, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(text, w / 2, h / 2 + 6);
  }, 1, h);
}

function baseLights(scene, { hemi = [0xfff4e0, 0x6b7a90, 1.2], sun = [0xffffff, 2.4, [6, 12, 8]], size = 14 } = {}) {
  const h = new THREE.HemisphereLight(...hemi);
  scene.add(h);
  const s = new THREE.DirectionalLight(sun[0], sun[1]);
  s.position.set(...sun[2]);
  shadowCfg(s, size);
  scene.add(s);
  scene.add(s.target);
  return { hemi: h, sun: s };
}

// ============================================================ dusk estate
export function buildEstate() {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x4a3560, 25, 90);
  const sky = makeSky({ top: 0x1b1747, mid: 0x6a3e6e, horizon: 0xf08a4b, bottom: 0x2a1c34 });
  scene.add(sky);
  const L = baseLights(scene, { hemi: [0xffb98a, 0x2e2648, 0.9], sun: [0xff9b5c, 1.6, [-14, 6, -10]], size: 18 });
  const R = rng(21);
  add(scene, new THREE.PlaneGeometry(200, 200), std(0x3a4a34, 0.95, { map: grassTex('#3d5a35', '#4f6e42', '#2c4527', 3, 30) }), [0, 0, 0], [-Math.PI / 2, 0, 0]);
  // road + drain in front of a row of terrace houses
  add(scene, new THREE.PlaneGeometry(200, 6), std(0x3b3d46, 0.9), [0, 0.02, 7], [-Math.PI / 2, 0, 0]);
  add(scene, new THREE.BoxGeometry(200, 0.12, 0.9), std(0x8d8a86, 0.9), [0, 0.06, 3.6]);
  add(scene, new THREE.BoxGeometry(200, 0.05, 0.7), std(0x2b2a26, 0.8), [0, 0.0, 2.9]);
  const drainW = add(scene, new THREE.PlaneGeometry(200, 0.62), makeWaterMat(0x2f3d2c, 0.85), [0, 0.035, 2.9], [-Math.PI / 2, 0, 0], [1, 1, 1], false);
  drainW.renderOrder = 3;
  const houses = [];
  for (let i = -4; i <= 4; i++) {
    const hs = makeHouse(R, { scale: 1.4, lit: 0xffc477 });
    hs.position.set(i * 8.5, 0, -6);
    hs.rotation.y = Math.PI;
    scene.add(hs);
    houses.push(hs);
  }
  // Adam's house window glow (target of the swarm): a lit front window of the middle house
  const win = new THREE.Vector3(1.5, 2.3, -3.0);
  const mid = houses[4];
  mid.updateMatrixWorld(true);
  let best = null;
  mid.traverse((o) => {
    if (o.isMesh && o.material.isMeshBasicMaterial && o.position.z < 0) {
      const p = o.getWorldPosition(new THREE.Vector3());
      if (!best || Math.abs(p.x - 1.5) < Math.abs(best.x - 1.5)) best = p;
    }
  });
  if (best) win.copy(best);
  const wg = glow(0xffc477, 3.5, 0.6);
  wg.position.copy(win);
  scene.add(wg);
  for (let i = -3; i <= 3; i++) {
    const lp = makeLamp({ scale: 1, armDir: -1, light: 0.8 });
    lp.position.set(i * 11 + 5, 0, 4.4);
    scene.add(lp);
  }
  for (let i = 0; i < 16; i++) {
    const t = makeTree(R, { scale: 1.6 });
    t.position.set((R() - 0.5) * 90, 0, -16 - R() * 20);
    scene.add(t);
  }
  // breeding junk in the front yard: tyres, pots, tubs, a bottle cap
  const junk = new THREE.Group();
  scene.add(junk);
  const items = [];
  const place = (o, x, z, ry = 0) => { o.position.set(x, 0, z); o.rotation.y = ry; junk.add(o); items.push(o); return o; };
  place(tyre({ r: 0.75 }), -2.6, 1.2);
  place(tyre({ r: 0.7 }), -1.2, 0.3).position.y = 0.0;
  place(pot(R, { r: 0.55, h: 0.75 }), 1.4, 1.0);
  place(pot(R, { r: 0.4, h: 0.55, color: 0x9e5434 }), 2.4, 0.2);
  place(tub({ w: 1.1, color: 0xf2a23a }), 0.2, 1.8, 0.4);
  place(bottleCap(), -0.3, 2.4);
  const swarm = makeSwarm(1100, 7);
  scene.add(swarm.group);
  return { scene, sky, L, swarm, items, win };
}

// ============================================================ bedroom
export function buildBedroom() {
  const scene = new THREE.Scene();
  const L = baseLights(scene, { hemi: [0x9fb4e6, 0x3a2e40, 0.75], sun: [0xffc58a, 0.9, [5, 9, 4]], size: 10 });
  const lamp = new THREE.PointLight(0xffb469, 18, 14, 1.6);
  lamp.position.set(3.2, 3.0, -2.2);
  lamp.castShadow = true;
  lamp.shadow.bias = -0.002;
  scene.add(lamp);
  const fill = new THREE.PointLight(0xffd9b0, 10, 16, 1.4);
  fill.position.set(-1.2, 3.8, 3.2);
  scene.add(fill);
  const moon = new THREE.DirectionalLight(0x8fb3ff, 0.6);
  moon.position.set(-6, 6, -2);
  scene.add(moon);
  add(scene, new THREE.PlaneGeometry(30, 30), std(0xb98b62, 0.8, { map: woodTex(4) }), [0, 0, 0], [-Math.PI / 2, 0, 0]);
  add(scene, new THREE.PlaneGeometry(30, 12), std(0xa8c3d8, 0.95), [0, 6, -4.5]);
  add(scene, new THREE.PlaneGeometry(30, 12), std(0x9fbad0, 0.95), [-6, 6, 0], [0, Math.PI / 2, 0]);
  // window with night sky and curtains
  add(scene, new THREE.PlaneGeometry(2.6, 2.2), new THREE.MeshBasicMaterial({ color: 0x1a2350 }), [-1.6, 4.0, -4.48]);
  for (const [x, y] of [[-2.3, 4.6], [-1.0, 3.4], [-2.0, 3.2], [-1.3, 4.9]]) {
    const s = add(scene, new THREE.CircleGeometry(0.03, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }), [x, y, -4.47], [0, 0, 0], [1, 1, 1], false);
    s.castShadow = false;
  }
  add(scene, new THREE.BoxGeometry(2.9, 0.12, 0.2), std(0xffffff, 0.6), [-1.6, 2.85, -4.4]);
  for (const s of [-1, 1]) add(scene, new THREE.BoxGeometry(0.6, 2.8, 0.08), std(0xf0b8c8, 0.9), [-1.6 + s * 1.45, 4.0, -4.35]);
  // bed: head at -z, along z
  const bed = new THREE.Group();
  bed.position.set(0, 0, -0.5);
  scene.add(bed);
  add(bed, new RoundedBoxGeometry(2.8, 0.7, 5.2, 3, 0.1), std(0x9a6a45, 0.7), [0, 0.35, 0]);
  add(bed, new RoundedBoxGeometry(2.7, 0.4, 5.0, 3, 0.15), std(0xf4f1ea, 0.9), [0, 0.88, 0]);
  add(bed, new RoundedBoxGeometry(2.9, 1.9, 0.25, 3, 0.1), std(0x8a5c3a, 0.7), [0, 1.2, -2.65]);
  add(bed, new RoundedBoxGeometry(1.5, 0.35, 0.9, 4, 0.16), std(0xffffff, 0.9), [0, 1.22, -1.95]);
  const blanket = add(bed, new RoundedBoxGeometry(2.75, 0.5, 3.2, 3, 0.2), std(0x6fa8dc, 0.9), [0, 1.3, 0.85]);
  // bedside table, lamp, teddy
  add(scene, new RoundedBoxGeometry(1.0, 1.1, 0.9, 3, 0.06), std(0xd9c3a0, 0.7), [2.6, 0.55, -2.4]);
  add(scene, new THREE.CylinderGeometry(0.1, 0.15, 0.7, 12), std(0xe8d9b5, 0.5), [2.6, 1.45, -2.4]);
  add(scene, new THREE.ConeGeometry(0.45, 0.45, 18, 1, true), std(0xfff0c8, 0.6, { emissive: 0xffc070, emissiveIntensity: 0.8, side: THREE.DoubleSide }), [2.6, 2.0, -2.4]);
  const lg = glow(0xffc070, 3.4, 0.55);
  lg.position.set(2.6, 1.95, -2.4);
  scene.add(lg);
  const ted = new THREE.Group();
  ted.position.set(-0.95, 1.3, -1.5);
  bed.add(ted);
  add(ted, new THREE.SphereGeometry(0.28, 16, 12), std(0xb07a4f, 0.9));
  add(ted, new THREE.SphereGeometry(0.2, 16, 12), std(0xb07a4f, 0.9), [0, 0.36, 0]);
  for (const s of [-1, 1]) add(ted, new THREE.SphereGeometry(0.08, 10, 8), std(0xb07a4f, 0.9), [0.14 * s, 0.52, 0]);
  // chair for the mother
  const chair = new THREE.Group();
  chair.position.set(2.3, 0, 0.2);
  scene.add(chair);
  add(chair, new RoundedBoxGeometry(1.1, 0.12, 1.0, 2, 0.04), std(0x7b5a3c, 0.7), [0, 0.85, 0]);
  for (const [x, z] of [[-0.45, -0.4], [0.45, -0.4], [-0.45, 0.4], [0.45, 0.4]]) add(chair, new THREE.CylinderGeometry(0.05, 0.05, 0.85, 8), std(0x6b4a30, 0.7), [x, 0.42, z]);
  add(chair, new RoundedBoxGeometry(0.12, 1.2, 1.0, 2, 0.04), std(0x7b5a3c, 0.7), [0.5, 1.45, 0]);

  const adam = makePerson('adam');
  const adamHold = new THREE.Group(); // lying on his back, head on the pillow (-z)
  adamHold.position.set(0, 1.36, 0.45);
  adamHold.rotation.x = -Math.PI / 2;
  adamHold.scale.setScalar(0.62);
  bed.add(adamHold);
  adamHold.add(adam.root);
  // cool cloth on his forehead
  const cloth = add(adam.parts.head, new RoundedBoxGeometry(0.75, 0.12, 0.35, 2, 0.05), std(0xffffff, 0.9), [0, 0.42, 0.62], [0.9, 0, 0]);
  cloth.visible = false;
  const ibu = makePerson('ibu');
  ibu.root.position.set(2.2, 0, 0.2);
  scene.add(ibu.root);
  const glass = makeGlass();
  ibu.parts.arms.L.hold.add(glass);
  glass.visible = false;
  return { scene, L, lamp, bed, blanket, adam, adamHold, ibu, cloth, glass };
}

// ============================================================ clinic
export function buildClinic() {
  const scene = new THREE.Scene();
  const L = baseLights(scene, { hemi: [0xffffff, 0x8796a8, 1.35], sun: [0xfff4e6, 1.9, [4, 10, 9]], size: 12 });
  const alarm = new THREE.PointLight(0xff3344, 0, 16, 1.5);
  alarm.position.set(-2.5, 4.5, 1.5);
  scene.add(alarm);
  add(scene, new THREE.PlaneGeometry(40, 40), std(0xdfe6ee, 0.6, { map: tileTex('#e6ecf2', '#cfd8e2', 14) }), [0, 0, 0], [-Math.PI / 2, 0, 0]);
  add(scene, new THREE.PlaneGeometry(40, 14), std(0xf4f7fa, 0.95), [0, 7, -4]);
  add(scene, new THREE.PlaneGeometry(40, 1.3), std(TEAL, 0.8), [0, 0.65, -3.98]);
  add(scene, new THREE.PlaneGeometry(40, 0.18), std(NAVY, 0.8), [0, 1.36, -3.97]);
  // logo poster + name sign
  const poster = picture(LOGO, 1.9, 2.04);
  poster.position.set(1.7, 4.6, -3.93);
  scene.add(poster);
  const sign = add(scene, new THREE.PlaneGeometry(4.4, 1.1), new THREE.MeshBasicMaterial({ map: label('KLINIK NISSA, NILAI', { font: 104 }) }), [-4.6, 5.6, -3.95], [0, 0, 0], [1, 1, 1], false);
  // window with blinds
  add(scene, new THREE.PlaneGeometry(3, 2.4), new THREE.MeshBasicMaterial({ color: 0xbfe6ff }), [-3.4, 3.4, -3.96]);
  for (let i = 0; i < 9; i++) add(scene, new THREE.BoxGeometry(3.1, 0.05, 0.05), std(0xffffff, 0.5), [-3.4, 2.3 + i * 0.27, -3.9]);
  // desk + monitor + plant
  const desk = new THREE.Group();
  desk.position.set(-2.9, 0, -1.6);
  scene.add(desk);
  add(desk, new RoundedBoxGeometry(3.2, 0.14, 1.6, 2, 0.05), std(0xe9e3d8, 0.5), [0, 1.6, 0]);
  add(desk, new RoundedBoxGeometry(3.0, 1.5, 0.1, 2, 0.04), std(0xd8d0c2, 0.6), [0, 0.8, -0.7]);
  add(desk, new RoundedBoxGeometry(1.1, 0.7, 0.06, 2, 0.03), std(0x20242c, 0.4), [0.5, 2.15, -0.35]);
  add(desk, new THREE.PlaneGeometry(1.0, 0.6), new THREE.MeshBasicMaterial({ color: 0x6fd6ff }), [0.5, 2.15, -0.31]);
  const R = rng(9);
  const pl = plant(R, 1.2);
  pl.position.set(4.3, 0, -3.0);
  scene.add(pl);
  // exam bed / chair for J
  const exam = new THREE.Group();
  exam.position.set(2.4, 0, -0.6);
  scene.add(exam);
  add(exam, new RoundedBoxGeometry(1.6, 0.25, 1.4, 2, 0.08), std(TEAL, 0.6), [0, 1.0, 0]);
  add(exam, new THREE.CylinderGeometry(0.12, 0.12, 1.0, 10), std(0xb8c2cc, 0.4, { metalness: 0.4 }), [0, 0.5, 0]);
  // reception counter (K) with logo front
  const rec = new THREE.Group();
  rec.position.set(0, 0, -2.3);
  rec.visible = false;
  scene.add(rec);
  add(rec, new RoundedBoxGeometry(5.2, 1.9, 1.0, 3, 0.1), std(NAVY, 0.6), [0, 0.95, 0]);
  add(rec, new RoundedBoxGeometry(5.4, 0.14, 1.2, 2, 0.05), std(0xf2f2f2, 0.4), [0, 1.95, 0]);
  add(rec, new THREE.PlaneGeometry(0.9, 0.96), new THREE.MeshBasicMaterial({ map: LOGO }), [-1.6, 1.0, 0.51], [0, 0, 0], [1, 1, 1], false);
  add(rec, new THREE.PlaneGeometry(2.6, 0.62), new THREE.MeshBasicMaterial({ map: label('KLINIK NISSA', { font: 130 }) }), [0.6, 1.0, 0.51], [0, 0, 0], [1, 1, 1], false);
  const aminah = makePerson('aminah');
  scene.add(aminah.root);
  const ibu = makePerson('ibu');
  ibu.root.visible = false;
  scene.add(ibu.root);
  const adam = makePerson('adam');
  adam.root.scale.setScalar(0.62);
  adam.root.visible = false;
  scene.add(adam.root);
  // plaster on Adam's arm
  const plaster = add(adam.parts.arms.L.elbow, new RoundedBoxGeometry(0.3, 0.12, 0.05, 2, 0.02), std(0xf2c79a, 0.7), [0, -0.05, 0.13]);
  return { scene, L, alarm, aminah, ibu, adam, rec, exam, desk, plaster, sign };
}

// ============================================================ hologram lab
export function buildHolo() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x061638);
  scene.fog = new THREE.Fog(0x061638, 18, 60);
  const L = baseLights(scene, { hemi: [0x9fd8ff, 0x0a1430, 1.0], sun: [0xffffff, 1.6, [3, 10, 8]], size: 12 });
  const floorTex = tex(512, (g, s) => {
    g.fillStyle = '#0a2152'; g.fillRect(0, 0, s, s);
    g.strokeStyle = 'rgba(76,223,218,0.55)'; g.lineWidth = 3;
    for (let i = 0; i <= 8; i++) { g.beginPath(); g.moveTo(i * 64, 0); g.lineTo(i * 64, s); g.stroke(); g.beginPath(); g.moveTo(0, i * 64); g.lineTo(s, i * 64); g.stroke(); }
  }, 12);
  add(scene, new THREE.PlaneGeometry(120, 120), new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.4, emissive: 0x0a2a5a, emissiveIntensity: 0.4 }), [0, 0, 0], [-Math.PI / 2, 0, 0]);
  const pads = [];
  const ms = {};
  ['anopheles', 'culex', 'aedes'].forEach((k, i) => {
    const pad = new THREE.Group();
    pad.position.set(1.2, 5.9 - i * 2.45, -1.0);
    scene.add(pad);
    const col = k === 'aedes' ? 0xff4d5e : TEAL;
    add(pad, new THREE.CylinderGeometry(1.15, 1.25, 0.18, 40), std(0x10295e, 0.4, { metalness: 0.4, emissive: 0x0a2a5a, emissiveIntensity: 0.5 }), [0, 0, 0]);
    const ring = add(pad, new THREE.TorusGeometry(1.2, 0.045, 8, 48), new THREE.MeshBasicMaterial({ color: col }), [0, 0.1, 0], [Math.PI / 2, 0, 0], [1, 1, 1], false);
    const beam = add(pad, new THREE.CylinderGeometry(0.85, 1.15, 1.6, 36, 1, true), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.1, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }), [0, 0.9, 0], [0, 0, 0], [1, 1, 1], false);
    const m = makeMosquito(k);
    m.root.scale.setScalar(1.7);
    m.root.position.set(0, 0.95, 0);
    pad.add(m.root);
    ms[k] = m;
    pads.push({ pad, ring, beam, k });
  });
  // giant Aedes for the macro "kenali" moment
  const big = makeMosquito('aedes');
  big.root.scale.setScalar(5.5);
  big.root.visible = false;
  scene.add(big.root);
  const aminah = makePerson('aminah');
  aminah.root.position.set(2.0, 0, 2.6);
  scene.add(aminah.root);
  return { scene, L, pads, ms, big, aminah };
}

// ============================================================ yard
export function buildYard() {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xcfe8ff, 30, 110);
  const sky = makeSky({ top: 0x5aa8f0, mid: 0x8cc6f5, horizon: 0xe4f3ff, bottom: 0x6aa0d8 });
  scene.add(sky);
  const L = baseLights(scene, { hemi: [0xfff6e0, 0x6a8a5a, 1.25], sun: [0xfff1d6, 2.6, [8, 14, 10]], size: 14 });
  const R = rng(33);
  add(scene, new THREE.PlaneGeometry(200, 200), std(0x5aa648, 0.95, { map: grassTex('#5aa648', '#74bf58', '#468a3a', 5, 40) }), [0, 0, 0], [-Math.PI / 2, 0, 0]);
  // house wall + fence behind
  add(scene, new THREE.BoxGeometry(18, 6, 0.4), std(0xf3e4c4, 0.85), [-2, 3, -6]);
  add(scene, new THREE.PlaneGeometry(1.8, 2.8), std(0x7a4e33, 0.8), [-4, 1.4, -5.78]);
  add(scene, new THREE.PlaneGeometry(2.2, 1.6), new THREE.MeshBasicMaterial({ color: 0xbfe6ff }), [0.5, 3.4, -5.78]);
  add(scene, new THREE.PlaneGeometry(2.3, 1.7), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 }), [0.5, 3.4, -5.77]);
  for (let i = -12; i <= 12; i++) add(scene, new THREE.BoxGeometry(0.18, 1.6, 0.1), std(0xffffff, 0.7), [i * 0.55 + 8, 0.8, -4.5]);
  for (let i = 0; i < 10; i++) {
    const t = makeTree(R, { scale: 1.5, leaf: [0x3c8f45, 0x4fa652, 0x2f7a3c] });
    t.position.set(-30 + R() * 60, 0, -14 - R() * 16);
    scene.add(t);
  }
  for (let i = 0; i < 6; i++) {
    const b = makeBush(R, { scale: 1.2, color: 0x3f8f45 });
    b.position.set(-9 + i * 3.2, 0, -5.2);
    scene.add(b);
  }
  // drain at the front edge
  add(scene, new THREE.BoxGeometry(60, 0.1, 0.8), std(0x9a968f, 0.9), [0, 0.04, 4.2]);
  // breeding sites in a row along x (camera glides along them)
  const sites = [];
  const put = (o, x, z, name) => { o.position.set(x, 0, z); scene.add(o); sites.push({ o, x, z, name }); return o; };
  put(pot(R, { r: 0.6, h: 0.8 }), -6, 0.5, 'pot');
  put(tyre({ r: 0.8 }), -3, 0.8, 'tyre');
  put(tub({ w: 1.2, color: 0x4aa3e0 }), 0, 0.6, 'tub');
  put(bottleCap(), 2.2, 1.4, 'cap');
  const dr = drum();
  put(dr, 5.0, -0.8, 'drum');
  const lid = dr.userData.lid;
  // larvae under each water surface (not the drum)
  const larvae = [];
  for (const s of sites) {
    if (s.name === 'drum') continue;
    const n = s.name === 'cap' ? 2 : 6;
    const wy = s.o.userData.water ?? 0.08;
    for (let i = 0; i < n; i++) {
      const l = makeLarva(i + s.x * 10);
      const r = s.name === 'cap' ? 0.06 : 0.35;
      l.root.position.set(s.x + (R() - 0.5) * r * 2, wy - 0.42 * (s.name === 'cap' ? 0.15 : 1), s.z + (R() - 0.5) * r * 2);
      l.root.scale.setScalar(s.name === 'cap' ? 0.28 : 0.9);
      l.root.rotation.set(0, R() * 6, 0.4 * (R() - 0.5));
      scene.add(l.root);
      larvae.push(l);
    }
  }
  // macro Aedes resting on the tub rim (for D)
  const aedes = makeMosquito('aedes');
  aedes.root.scale.setScalar(0.5);
  aedes.root.position.set(0.25, 0.62, 1.12);
  aedes.root.rotation.y = Math.PI / 2;
  scene.add(aedes.root);
  const aminah = makePerson('aminah');
  aminah.root.position.set(0, 0, 2.2);
  scene.add(aminah.root);
  const pail = makePail();
  aminah.parts.arms.R.hold.add(pail);
  pail.visible = false;
  const spray = makeSpray();
  aminah.parts.arms.L.hold.add(spray);
  spray.visible = false;
  return { scene, sky, L, sites, larvae, aedes, aminah, pail, spray, lid };
}

// skin macro for the bite moment: a big soft "arm" surface
export function buildBite() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x2a3550);
  const L = baseLights(scene, { hemi: [0xfff0dd, 0x3a3048, 1.1], sun: [0xffe0c0, 2.0, [3, 6, 4]], size: 4 });
  const arm = add(scene, new THREE.CylinderGeometry(2.2, 2.2, 14, 64), std(0xe6a47c, 0.55, { emissive: 0x3a1608, emissiveIntensity: 0.15 }), [0, -1.9, 0], [0, 0, Math.PI / 2]);
  add(scene, new THREE.PlaneGeometry(30, 20), std(0x7cc4ff, 0.9), [0, -1, -4]);
  const m = makeMosquito('aedes');
  m.root.scale.setScalar(1.0);
  scene.add(m.root);
  const bump = add(scene, new THREE.SphereGeometry(0.25, 20, 14), std(0xe9877a, 0.5), [0.35, 0.28, 0.0], [0, 0, 0], [1, 0.35, 1]);
  bump.visible = false;
  return { scene, L, arm, m, bump };
}
