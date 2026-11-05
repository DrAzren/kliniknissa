// Procedural chibi-3D cast for Klinik Nissa explainers (same build language as
// The Curious Affan): Dr Aminah (hijab, white coat, stethoscope), a mother in
// baju kurung and tudung, and a child (Adam). Feet at y = 0, faces +z.
// Pose API matches affan.js: pose({ yaw, lean, headYaw, talk, smile, blink,
// armL/armR: { reach:[x,y,z] torso-local, pole } | { x, y, z, el } ... }).
import * as THREE from 'three';
import { clamp, lerp } from './core.js';

const std = (color, rough = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });

function mesh(geo, mat, parent, pos = [0, 0, 0], scale = [1, 1, 1], rot = [0, 0, 0], shadow = true) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(...pos);
  m.scale.set(...scale);
  m.rotation.set(...rot);
  m.castShadow = shadow;
  m.receiveShadow = shadow;
  parent.add(m);
  return m;
}

function textTex(lines, { w = 512, h = 160, bg = '#ffffff', fg = '#052751', sub = '#0f8f8a', font = 'Fredoka' } = {}) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d');
  g.fillStyle = bg;
  g.beginPath();
  g.roundRect(0, 0, w, h, 26);
  g.fill();
  g.fillStyle = '#4CDFDA';
  g.fillRect(0, 0, 26, h);
  g.textAlign = 'center';
  g.fillStyle = fg;
  g.font = `700 ${h * 0.4}px ${font}`;
  g.fillText(lines[0], w / 2 + 12, h * 0.48);
  if (lines[1]) {
    g.fillStyle = sub;
    g.font = `600 ${h * 0.26}px ${font}`;
    g.fillText(lines[1], w / 2 + 12, h * 0.82);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export const CAST = {
  aminah: {
    adult: true, skin: 0xeab38e, skinShade: 0xd99a74, hijab: 0x3fb6b0, hijabDark: 0x2a8f8a, top: 0x1d5f8a,
    bottom: 0x24324f, coat: true, iris: 0x3b2314, lip: 0xc9646a, shoe: 0x2b2f3a, badge: ['Dr Aminah', 'Klinik Nissa'],
  },
  ibu: {
    adult: true, skin: 0xe2a47d, skinShade: 0xcf8d68, hijab: 0x8f72c4, hijabDark: 0x6c519f, top: 0xf08aa6,
    bottom: 0xe7799a, kurung: true, iris: 0x3b2314, lip: 0xb85a62, shoe: 0x7a4e3a, motif: 0xffd36b,
  },
  adam: {
    adult: false, skin: 0xe6a47c, skinShade: 0xd48e69, hair: 0x1d140e, top: 0x7cc4ff, bottom: 0x2f4f8a,
    iris: 0x3b2314, lip: 0xa8524a, shoe: 0xf3f3f3, stars: true,
  },
};

export function makePerson(spec) {
  const S = typeof spec === 'string' ? CAST[spec] : spec;
  const A = S.adult;
  const female = !!S.hijab;
  const M = {
    skin: std(S.skin, 0.55, { emissive: 0x3a1608, emissiveIntensity: 0.18 }),
    skinShade: std(S.skinShade, 0.55, { emissive: 0x3a1608, emissiveIntensity: 0.15 }),
    top: std(S.top, 0.75, { emissive: 0x081020, emissiveIntensity: 0.12 }),
    bottom: std(S.bottom, 0.8),
    shoe: std(S.shoe, 0.5),
    sclera: std(0xffffff, 0.3, { emissive: 0xffffff, emissiveIntensity: 0.12 }),
    iris: std(S.iris, 0.3),
    pupil: std(0x0a0605, 0.2),
    shine: new THREE.MeshBasicMaterial({ color: 0xffffff }),
    mouth: std(0x5e1f24, 0.5),
    tongue: std(0xe57c7c, 0.5),
    lip: std(S.lip, 0.5),
    dark: std(0x1a1210, 0.45),
    blush: new THREE.MeshBasicMaterial({ color: 0xf3887e, transparent: true, opacity: female ? 0.36 : 0.3, depthWrite: false }),
  };
  if (S.hijab) {
    M.hijab = std(S.hijab, 0.78, { emissive: S.hijabDark, emissiveIntensity: 0.12 });
    M.hijabDark = std(S.hijabDark, 0.8);
  }
  if (S.coat) {
    M.coat = std(0xf7f8fa, 0.62, { emissive: 0x9aa6b8, emissiveIntensity: 0.06 });
    M.steth = std(0x30343f, 0.35);
    M.metal = std(0xc9d1dc, 0.25, { metalness: 0.7 });
  }
  if (S.hair) M.hair = std(S.hair, 0.42, { emissive: 0x0d0805, emissiveIntensity: 0.2 });

  // proportions
  const P = A
    ? { hipY: 1.55, thigh: 0.72, shin: 0.72, legR: 0.19, torsoY: 1.5, torsoH: 1.2, rTop: 0.5, rBot: 0.47, shY: 1.08, shX: 0.62, L1: 0.62, L2: 0.62, neckY: 1.42, headY: 0.62, headS: 0.74 }
    : { hipY: 1.02, thigh: 0.5, shin: 0.5, legR: 0.19, torsoY: 1.0, torsoH: 0.95, rTop: 0.47, rBot: 0.5, shY: 0.86, shX: 0.6, L1: 0.47, L2: 0.49, neckY: 1.2, headY: 0.68, headS: 0.92 };

  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);

  // ---------- legs ----------
  const legs = {};
  for (const side of [-1, 1]) {
    const hip = new THREE.Group();
    hip.position.set(0.22 * side, P.hipY, 0);
    body.add(hip);
    mesh(new THREE.CapsuleGeometry(P.legR + 0.01, P.thigh - 0.2, 6, 16), M.bottom, hip, [0, -P.thigh / 2, 0]);
    const knee = new THREE.Group();
    knee.position.set(0, -P.thigh, 0);
    hip.add(knee);
    mesh(new THREE.CapsuleGeometry(P.legR - 0.01, P.shin - 0.22, 6, 16), S.kurung ? M.bottom : A ? M.bottom : M.skin, knee, [0, -P.shin / 2 + 0.03, 0]);
    mesh(new THREE.SphereGeometry(0.2, 20, 14), M.shoe, knee, [0, -P.shin + 0.03, 0.07], [0.95, 0.6, 1.45]);
    legs[side < 0 ? 'R' : 'L'] = { hip, knee };
  }

  // ---------- torso ----------
  const torso = new THREE.Group();
  torso.position.set(0, P.torsoY, 0);
  body.add(torso);
  const TH = P.torsoH;
  mesh(new THREE.CylinderGeometry(P.rTop, P.rBot, TH, 28), M.top, torso, [0, TH / 2 - 0.05, 0]);
  mesh(new THREE.SphereGeometry(P.rTop, 28, 16, 0, Math.PI * 2, 0, Math.PI / 2), M.top, torso, [0, TH - 0.05, 0], [1.2, 0.45, 0.95]);
  if (!A) {
    // child: shorts + T-shirt hem; little stars on the pyjama top
    mesh(new THREE.CylinderGeometry(0.55, 0.57, 0.34, 28), M.bottom, torso, [0, -0.02, 0]);
    if (S.stars) {
      const st = std(0xfff3a6, 0.5, { emissive: 0xffe08a, emissiveIntensity: 0.25 });
      [[0.2, 0.55, 0.47], [-0.25, 0.3, 0.48], [0.05, 0.15, 0.5], [-0.12, 0.7, 0.45], [0.32, 0.22, 0.42]].forEach(([x, y, z]) => {
        const m = mesh(new THREE.OctahedronGeometry(0.05, 0), st, torso, [x, y, z], [1, 1, 0.3]);
        m.castShadow = false;
      });
    }
  }
  if (S.kurung) {
    // baju kurung: long tunic over a long skirt down to the ankles
    mesh(new THREE.CylinderGeometry(0.53, 0.68, 1.3, 30), M.top, torso, [0, -0.08, 0]);
    mesh(new THREE.CylinderGeometry(0.52, 0.7, 1.5, 30), M.bottom, body, [0, 0.76, 0]);
    const mo = std(S.motif, 0.7);
    for (const y of [-0.66]) mesh(new THREE.TorusGeometry(0.675, 0.035, 8, 40), mo, torso, [0, y, 0], [1, 1, 1], [Math.PI / 2, 0, 0]).castShadow = false;
    mesh(new THREE.TorusGeometry(0.695, 0.035, 8, 40), mo, body, [0, 0.06, 0], [1, 1, 1], [Math.PI / 2, 0, 0]).castShadow = false;
  }
  if (S.coat) {
    // long white doctor's coat, open at the front
    const gap = 0.36;
    const coat = mesh(new THREE.CylinderGeometry(P.rTop + 0.05, 0.64, TH + 0.95, 34, 1, true, gap, Math.PI * 2 - gap * 2), M.coat, torso, [0, (TH + 0.95) / 2 - 1.0, 0]);
    coat.material = M.coat.clone();
    coat.material.side = THREE.DoubleSide;
    mesh(new THREE.SphereGeometry(P.rTop + 0.05, 32, 12, Math.PI / 2 + gap, Math.PI * 2 - gap * 2, 0, Math.PI / 2), M.coat, torso, [0, TH - 0.06, 0], [1.2, 0.45, 0.95]);
    // lapels
    for (const side of [-1, 1]) {
      // pocket
      mesh(new THREE.BoxGeometry(0.26, 0.2, 0.03), std(0xe9edf2, 0.7), torso, [0.4 * side, -0.35, 0.6], [1, 1, 1], [0, 0.55 * side, 0]).castShadow = false;
    }
    // stethoscope: tube around the neck, two drops, chest piece
    mesh(new THREE.TorusGeometry(0.33, 0.028, 8, 32, Math.PI * 1.15), M.steth, torso, [0, TH - 0.14, 0.05], [1, 1, 0.9], [Math.PI / 2 + 0.55, 0, Math.PI * 0.92]).castShadow = false;
    for (const side of [-1, 1]) mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.46, 8), M.steth, torso, [0.25 * side, TH - 0.5, 0.44], [1, 1, 1], [0.12, 0, 0.12 * side]).castShadow = false;
    mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.04, 20), M.metal, torso, [0.22, TH - 0.78, 0.5], [1, 1, 1], [Math.PI / 2 - 0.15, 0, 0]);
    // name badge
    const bm = new THREE.MeshBasicMaterial({ map: textTex(S.badge) });
    mesh(new THREE.PlaneGeometry(0.36, 0.115), bm, torso, [-0.3, TH - 0.42, 0.56], [1, 1, 1], [-0.05, -0.32, 0], false);
  }
  // neck
  mesh(new THREE.CylinderGeometry(0.15, 0.16, 0.3, 16), M.skin, torso, [0, TH + 0.08, 0.02]);

  // ---------- arms ----------
  const sleeve = S.coat ? M.coat : M.top;
  const arms = {};
  for (const side of [-1, 1]) {
    const shoulder = new THREE.Group();
    shoulder.position.set(P.shX * side, P.shY, 0);
    torso.add(shoulder);
    mesh(new THREE.SphereGeometry(0.17, 16, 12), sleeve, shoulder);
    mesh(new THREE.CapsuleGeometry(0.15, P.L1 - 0.17, 6, 16), A || S.coat ? sleeve : M.top, shoulder, [0, -P.L1 / 2, 0]);
    const elbow = new THREE.Group();
    elbow.position.set(0, -P.L1, 0);
    shoulder.add(elbow);
    mesh(new THREE.CapsuleGeometry(0.135, P.L2 - 0.2, 6, 16), A ? sleeve : M.skin, elbow, [0, -P.L2 / 2 + 0.06, 0]);
    if (S.coat) mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.08, 18), std(0xe1e6ec, 0.6), elbow, [0, -P.L2 + 0.13, 0]);
    const hand = new THREE.Group();
    hand.position.set(0, -P.L2, 0);
    elbow.add(hand);
    mesh(new THREE.SphereGeometry(0.13, 18, 14), M.skin, hand, [0, -0.02, 0], [1, 1.1, 0.9]);
    const index = new THREE.Group();
    index.position.set(0, -0.1, 0.05);
    hand.add(index);
    mesh(new THREE.CapsuleGeometry(0.04, 0.13, 4, 10), M.skin, index, [0, -0.08, 0]);
    const thumb = new THREE.Group();
    thumb.position.set(-0.06 * side, -0.02, 0.07);
    hand.add(thumb);
    mesh(new THREE.CapsuleGeometry(0.045, 0.1, 4, 10), M.skin, thumb, [0, 0, 0.07], [1, 1, 1], [Math.PI / 2, 0, 0]);
    const hold = new THREE.Group(); // attach props here
    hold.position.set(0, -0.12, 0.12);
    hand.add(hold);
    arms[side < 0 ? 'R' : 'L'] = { shoulder, elbow, hand, index, thumb, hold };
  }

  // ---------- head ----------
  const neck = new THREE.Group();
  neck.position.set(0, P.neckY, 0);
  torso.add(neck);
  const head = new THREE.Group();
  head.position.set(0, P.headY, 0.02);
  head.scale.setScalar(P.headS);
  neck.add(head);
  const headGeo = new THREE.SphereGeometry(0.85, 64, 48);
  const hp = headGeo.attributes.position;
  for (let i = 0; i < hp.count; i++) {
    const x = hp.getX(i), y = hp.getY(i), z = hp.getZ(i);
    const k = Math.exp(-(((y + 0.3) / 0.28) ** 2));
    const front = Math.max(0, z / 0.85);
    const chin = A ? Math.exp(-(((y + 0.75) / 0.2) ** 2)) * 0.12 : 0; // slightly narrower adult jaw
    hp.setXYZ(i, x * (1 + 0.07 * k - chin), y * (y < 0 ? (A ? 1.02 : 0.97) : 1), z * (1 + 0.1 * k * front));
  }
  headGeo.computeVertexNormals();
  mesh(headGeo, M.skin, head, [0, 0, 0], [A ? 0.95 : 1, 0.98, 0.93]);
  if (!female) {
    for (const side of [-1, 1]) mesh(new THREE.SphereGeometry(0.17, 16, 12), M.skin, head, [0.83 * side, -0.06, -0.02], [0.5, 1, 0.75]);
  }

  if (S.hijab) {
    // tudung: a shell around the head with an oval face opening, wrapped under
    // the chin and draped over the shoulders and chest
    const hm = M.hijab.clone();
    hm.side = THREE.DoubleSide;
    hm.onBeforeCompile = (sh) => {
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vH;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvH = position;');
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vH;').replace('void main() {', `void main() {
        float fx = vH.x / 0.6; float fy = (vH.y + 0.12) / 0.66;
        if (vH.z > 0.15 && fx * fx + fy * fy < 1.0) discard;`);
    };
    hm.customProgramCacheKey = () => 'hijab-shell';
    mesh(new THREE.SphereGeometry(1, 56, 40), hm, head, [0, 0.04, -0.03], [0.93, 0.95, 0.9]);
    // soft fold framing the face
    const rim = mesh(new THREE.TorusGeometry(0.64, 0.06, 10, 48), M.hijabDark, head, [0, -0.08, 0.66], [0.93, 0.98, 0.6]);
    rim.castShadow = false;
    // under-chin wrap and drape (lathe profile)
    const prof = [[0.0, 0.05], [0.42, 0.0], [0.6, -0.22], [0.74, -0.55], [0.86, -0.9], [0.9, -1.02]].map(([r, y]) => new THREE.Vector2(r, y));
    const drape = mesh(new THREE.LatheGeometry(prof, 40), M.hijab, head, [0, -0.62, -0.04], [1.0, 1, 0.92]);
    drape.material = M.hijab.clone();
    drape.material.side = THREE.DoubleSide;
    mesh(new THREE.SphereGeometry(0.5, 24, 16), M.hijab, head, [0, -0.72, 0.18], [1.05, 0.5, 0.9]);
  } else if (S.hair) {
    // short boy's hair: cap + a soft fringe
    const capMat = M.hair.clone();
    capMat.side = THREE.DoubleSide;
    capMat.onBeforeCompile = (sh) => {
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vHair;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvHair = position;');
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vHair;').replace('void main() {', `void main() {
        float az = atan(vHair.x, vHair.z); float c = cos(az);
        float h = c > 0.0 ? mix(0.18, 0.5, c * c) : mix(0.18, -0.65, pow(-c, 1.3));
        if (vHair.y < h) discard;`);
    };
    capMat.customProgramCacheKey = () => 'boy-hair-cap';
    mesh(new THREE.SphereGeometry(1, 56, 40), capMat, head, [0, 0.03, -0.02], [0.9, 0.92, 0.86]).castShadow = false;
    for (const [x, y, z, s] of [[0.0, 0.76, 0.22, 0.34], [0.3, 0.7, 0.1, 0.3], [-0.31, 0.7, 0.1, 0.3], [0.1, 0.77, -0.25, 0.34], [-0.28, 0.52, 0.5, 0.2], [0.0, 0.56, 0.55, 0.22], [0.27, 0.53, 0.5, 0.2]]) {
      mesh(new THREE.SphereGeometry(s, 20, 14), M.hair, head, [x, y, z], [1.15, 0.45, 1.05]);
    }
  }

  // eyes
  const eyes = [];
  const eyeY = A ? 0.0 : -0.02;
  for (const side of [-1, 1]) {
    const eye = new THREE.Group();
    eye.position.set(0.27 * side, eyeY, 0.68);
    head.add(eye);
    const ball = new THREE.Group();
    eye.add(ball);
    mesh(new THREE.SphereGeometry(0.145, 24, 18), M.sclera, ball, [0, 0, 0], [1, 1.12, 1], [0, 0, 0], false);
    const iris = new THREE.Group();
    ball.add(iris);
    mesh(new THREE.SphereGeometry(0.105, 24, 16), M.iris, iris, [0, 0, 0.105], [1, 1.08, 0.35], [0, 0, 0], false);
    mesh(new THREE.SphereGeometry(0.058, 18, 12), M.pupil, iris, [0, 0, 0.135], [1, 1.05, 0.3], [0, 0, 0], false);
    mesh(new THREE.SphereGeometry(0.028, 10, 8), M.shine, iris, [0.033, 0.048, 0.15], [1, 1, 1], [0, 0, 0], false);
    const lid = new THREE.Group();
    eye.add(lid);
    mesh(new THREE.SphereGeometry(0.157, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), M.skin, lid, [0, 0, 0], [1.02, 1.15, 1.02], [0, 0, 0], false);
    if (female) {
      // lashes along the lid edge
      const lash = mesh(new THREE.TorusGeometry(0.15, 0.016, 6, 20, Math.PI * 0.9), M.dark, lid, [0, 0.0, 0.0], [1.05, 1.0, 1.05], [Math.PI / 2, 0, Math.PI * 0.05], false);
      lash.rotation.set(-0.05, 0, Math.PI * 0.05);
      lash.position.set(0, 0.02, 0.03);
    }
    eyes.push({ eye, ball, iris, lid });
  }
  // brows
  const brows = [];
  for (const side of [-1, 1]) {
    const b = new THREE.Group();
    b.position.set(0.28 * side, 0.27, 0.72);
    head.add(b);
    mesh(new THREE.CapsuleGeometry(female ? 0.022 : 0.03, 0.17, 4, 10), S.hair ? M.hair : M.dark, b, [0, 0, 0], [1, 1, 0.7], [0, 0, Math.PI / 2 + 0.12 * side]);
    b.rotation.y = 0.35 * side;
    brows.push(b);
  }
  // nose
  mesh(new THREE.SphereGeometry(A ? 0.065 : 0.075, 16, 12), M.skinShade, head, [0, -0.17, 0.79], [1.1, 0.85, 0.9]);
  // mouth
  const mouth = new THREE.Group();
  mouth.position.set(0, -0.38, 0.72);
  mouth.rotation.x = -0.22;
  head.add(mouth);
  const smile = mesh(new THREE.TorusGeometry(0.095, 0.022, 8, 24, Math.PI), M.lip, mouth, [0, 0.03, 0.02], [1, 0.7, 1], [0, 0, Math.PI], false);
  const frown = mesh(new THREE.TorusGeometry(0.08, 0.02, 8, 24, Math.PI), M.lip, mouth, [0, -0.03, 0.02], [1, 0.5, 1], [0, 0, 0], false);
  const open = new THREE.Group();
  mouth.add(open);
  mesh(new THREE.SphereGeometry(0.115, 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), M.mouth, open, [0, 0, 0], [1.1, 1, 0.42], [0, 0, 0], false);
  mesh(new THREE.SphereGeometry(0.058, 12, 8), M.tongue, open, [0, -0.07, 0.03], [1.2, 0.6, 0.5], [0, 0, 0], false);
  mesh(new THREE.BoxGeometry(0.15, 0.03, 0.02), std(0xffffff, 0.4), open, [0, -0.005, 0.045], [1, 1, 1], [0, 0, 0], false);
  const oMouth = mesh(new THREE.SphereGeometry(0.075, 20, 14), M.mouth, mouth, [0, -0.03, 0], [1, 1.25, 0.4], [0, 0, 0], false);
  for (const side of [-1, 1]) {
    const b = new THREE.Mesh(new THREE.CircleGeometry(0.1, 24), M.blush);
    b.position.set(0.45 * side, -0.24, 0.62);
    b.lookAt(b.position.clone().multiply(new THREE.Vector3(2.2, 0.6, 2.2)));
    head.add(b);
  }
  // tears (for sad moments), hidden by default
  const tears = [];
  const tearMat = new THREE.MeshPhysicalMaterial({ color: 0xbfe9ff, roughness: 0.05, transmission: 0.3, transparent: true, opacity: 0.85, emissive: 0x9fdcff, emissiveIntensity: 0.4 });
  for (const side of [-1, 1]) {
    const tr = mesh(new THREE.SphereGeometry(0.045, 12, 10), tearMat, head, [0.33 * side, -0.16, 0.72], [0.8, 1.2, 0.6], [0, 0, 0], false);
    tr.visible = false;
    tears.push(tr);
  }
  // fever flush overlay (child)
  const flushMat = new THREE.MeshBasicMaterial({ color: 0xff4d4d, transparent: true, opacity: 0, depthWrite: false });
  const flush = [];
  for (const side of [-1, 1]) {
    const f = new THREE.Mesh(new THREE.CircleGeometry(0.17, 24), flushMat);
    f.position.set(0.42 * side, -0.2, 0.64);
    f.lookAt(f.position.clone().multiply(new THREE.Vector3(2.2, 0.6, 2.2)));
    head.add(f);
    flush.push(f);
  }

  const parts = { root, body, torso, neck, head, legs, arms, eyes, brows, mouth };
  const DEF = {
    yaw: 0, lean: 0, tilt: 0, bob: 0, headYaw: 0, headPitch: 0, headRoll: 0, lookX: 0, lookY: 0, blink: 0,
    talk: 0, smile: 0.6, sad: 0, wow: 0, brow: 0, tear: 0, fever: 0,
    armL: { x: 0, y: 0, z: 0.12, el: -0.15, point: 0, thumb: 0 },
    armR: { x: 0, y: 0, z: -0.12, el: -0.15, point: 0, thumb: 0 },
    legL: { x: 0, knee: 0 }, legR: { x: 0, knee: 0 },
  };
  const _S = new THREE.Vector3(), _T = new THREE.Vector3(), _d = new THREE.Vector3(), _n = new THREE.Vector3();
  const _u = new THREE.Vector3(), _f = new THREE.Vector3(), _x = new THREE.Vector3(), _y = new THREE.Vector3(), _z = new THREE.Vector3();
  const _m = new THREE.Matrix4(), _q = new THREE.Quaternion();
  function solveArm(a, reach, pole) {
    const L1 = P.L1, L2 = P.L2;
    _S.copy(a.shoulder.position);
    _T.fromArray(reach);
    _d.subVectors(_T, _S);
    const dist = clamp(_d.length(), 0.15, L1 + L2 - 0.005);
    _d.normalize();
    const ang = Math.acos(clamp((L1 * L1 + dist * dist - L2 * L2) / (2 * L1 * dist), -1, 1));
    _n.fromArray(pole).normalize();
    _n.sub(_x.copy(_d).multiplyScalar(_n.dot(_d))).normalize();
    _u.copy(_d).multiplyScalar(Math.cos(ang)).addScaledVector(_n, Math.sin(ang)).normalize();
    const elbowPos = _x.copy(_S).addScaledVector(_u, L1);
    _f.copy(_T).sub(elbowPos).normalize();
    _y.copy(_u).negate();
    _z.copy(_f).addScaledVector(_u, -_f.dot(_u));
    if (_z.lengthSq() < 1e-6) _z.set(0, 0, 1).addScaledVector(_u, -_u.z);
    _z.normalize();
    _x.crossVectors(_y, _z).normalize();
    _m.makeBasis(_x, _y, _z);
    _q.setFromRotationMatrix(_m);
    a.shoulder.quaternion.copy(_q);
    a.elbow.rotation.set(-Math.acos(clamp(_u.dot(_f), -1, 1)), 0, 0);
  }
  function setArm(a, p, side) {
    if (p.reach) solveArm(a, p.reach, p.pole || [0.3 * side, -1, -0.6]);
    else {
      a.shoulder.rotation.set(p.x ?? 0, p.y ?? 0, p.z ?? 0, 'XZY');
      a.elbow.rotation.set(p.el ?? 0, 0, 0);
    }
    a.hand.rotation.set(p.wx ?? 0, p.wy ?? 0, p.wz ?? 0);
    const pt = clamp(p.point ?? 0);
    a.index.scale.setScalar(lerp(0.35, 1, pt));
    a.index.rotation.x = lerp(1.6, 0, pt);
    const th = clamp(p.thumb ?? 0);
    a.thumb.scale.setScalar(lerp(0.7, 1.45, th));
    a.thumb.rotation.set(lerp(0.6, 0, th), 0, 0);
  }
  function pose(p = {}) {
    const q = { ...DEF, ...p, armL: { ...DEF.armL, ...(p.armL || {}) }, armR: { ...DEF.armR, ...(p.armR || {}) } };
    root.rotation.y = q.yaw;
    body.position.y = q.bob;
    body.rotation.set(q.lean, 0, q.tilt);
    head.rotation.set(q.headPitch, q.headYaw, q.headRoll, 'YXZ');
    for (const e of eyes) {
      e.iris.rotation.set(-q.lookY * 0.45, q.lookX * 0.5, 0);
      const bl = clamp(Math.max(q.blink, q.sad * 0.35, q.fever * 0.45));
      e.lid.rotation.x = lerp(-1.75, -0.05, bl) - 0.25 * clamp(q.wow) * (1 - bl);
      e.ball.scale.y = lerp(1, 0.25, clamp(q.blink) ** 2);
    }
    brows.forEach((b, i) => {
      const s = i === 0 ? -1 : 1;
      b.position.y = 0.27 + 0.07 * q.brow + 0.05 * q.wow + 0.03 * q.sad;
      b.rotation.z = s * (0.12 * q.brow - 0.32 * q.sad);
    });
    const talk = clamp(q.talk), wow = clamp(q.wow), sad = clamp(q.sad);
    open.scale.set(lerp(0.95, 1.1, talk) * (1 - wow), lerp(0.08, 0.95, talk) * (1 - wow) + 0.001, 1);
    open.visible = talk > 0.04 && wow < 0.95;
    smile.visible = talk < 0.25 && wow < 0.3 && sad < 0.5;
    frown.visible = talk < 0.25 && wow < 0.3 && sad >= 0.5;
    smile.scale.set(lerp(0.6, 1.1, q.smile), lerp(0.25, 0.9, q.smile), 1);
    oMouth.visible = wow > 0.05;
    oMouth.scale.set(wow, wow * 1.25, 0.4);
    tears.forEach((tr, i) => {
      tr.visible = q.tear > 0.02;
      tr.position.y = -0.14 - 0.3 * ((q.tear + i * 0.37) % 1);
      tr.scale.setScalar(0.6 + 0.4 * Math.sin(Math.PI * ((q.tear + i * 0.37) % 1)));
    });
    flushMat.opacity = 0.45 * clamp(q.fever);
    setArm(arms.L, q.armL, 1);
    setArm(arms.R, q.armR, -1);
    for (const [k, leg] of [['L', legs.L], ['R', legs.R]]) {
      const l = q['leg' + k] || {};
      leg.hip.rotation.set(l.x ?? 0, 0, l.z ?? 0);
      leg.knee.rotation.set(l.knee ?? 0, 0, 0);
    }
  }
  pose();
  const toTorso = (v) => {
    root.updateMatrixWorld(true);
    return torso.worldToLocal(v.clone()).toArray();
  };
  const headPos = () => {
    root.updateMatrixWorld(true);
    return head.getWorldPosition(new THREE.Vector3());
  };
  return { root, parts, pose, toTorso, headPos, P };
}

export function blinkAt(t, seed = 0) {
  const period = 3.1 + (seed % 3) * 0.4;
  const ph = (t + seed * 0.77) % period;
  return ph < 0.16 ? Math.sin((ph / 0.16) * Math.PI) : 0;
}
