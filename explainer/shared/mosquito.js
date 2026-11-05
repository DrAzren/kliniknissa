// Procedural mosquitoes: Aedes (black with white bands and a white lyre on
// the thorax), Culex (plain brown, body level) and Anopheles (spotted wings,
// long palps, rests head-down at an angle). Plus an instanced swarm and
// wriggling larvae. Body faces +z, length ~1 unit; scale the group to taste.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { rng, clamp } from './core.js';

const std = (color, rough = 0.5, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0, ...extra });

function mesh(geo, mat, parent, pos = [0, 0, 0], scale = [1, 1, 1], rot = [0, 0, 0]) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(...pos);
  m.scale.set(...scale);
  m.rotation.set(...rot);
  m.castShadow = true;
  parent.add(m);
  return m;
}

// Cylinder between two points.
function rod(parent, a, b, r, mat) {
  const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b);
  const d = B.clone().sub(A);
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.85, d.length(), 6), mat);
  m.position.copy(A).addScaledVector(d, 0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
  m.castShadow = true;
  parent.add(m);
  return m;
}

function wingTex(spots) {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 64;
  const g = c.getContext('2d');
  g.fillStyle = 'rgba(220,235,255,0.42)';
  g.beginPath();
  g.ellipse(128, 32, 126, 28, 0, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = 'rgba(80,90,110,0.55)';
  g.lineWidth = 2;
  for (let i = 0; i < 6; i++) {
    g.beginPath();
    g.moveTo(4, 32);
    g.quadraticCurveTo(128, 14 + i * 7, 250, 20 + i * 5);
    g.stroke();
  }
  if (spots) {
    g.fillStyle = 'rgba(40,30,25,0.8)';
    for (const x of [60, 100, 140, 180, 220]) {
      g.beginPath();
      g.ellipse(x, 18, 9, 6, 0, 0, Math.PI * 2);
      g.fill();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export const KINDS = {
  aedes: { body: 0x16181d, band: 0xf4f6f8, wing: false, palps: false, tilt: 0.05 },
  culex: { body: 0x8a6a45, band: 0xc9b089, wing: false, palps: false, tilt: 0.12 },
  anopheles: { body: 0x5b4c3e, band: 0x9c8c78, wing: true, palps: true, tilt: -0.75 },
};

export function makeMosquito(kind = 'aedes') {
  const K = KINDS[kind];
  const root = new THREE.Group();
  const body = new THREE.Group(); // tilted resting posture lives here
  root.add(body);
  const dark = std(K.body, 0.42, { emissive: K.body, emissiveIntensity: 0.1 });
  const pale = std(K.band, 0.4, { emissive: K.band, emissiveIntensity: kind === 'aedes' ? 0.35 : 0.1 });
  const eye = std(0x0b0b10, 0.15, { metalness: 0.3 });

  // thorax with hump
  const thorax = mesh(new THREE.SphereGeometry(0.15, 28, 20), dark, body, [0, 0.02, 0.18], [0.95, 0.9, 1.25]);
  // head, eyes, proboscis, antennae, palps
  const head = new THREE.Group();
  head.position.set(0, -0.02, 0.4);
  body.add(head);
  mesh(new THREE.SphereGeometry(0.075, 20, 16), dark, head);
  for (const s of [-1, 1]) mesh(new THREE.SphereGeometry(0.05, 16, 12), eye, head, [0.045 * s, 0.015, 0.03]);
  rod(head, [0, -0.02, 0.06], [0, -0.16, 0.42], 0.012, dark);
  if (kind === 'aedes') rod(head, [0, -0.1, 0.24], [0, -0.115, 0.27], 0.016, pale);
  for (const s of [-1, 1]) {
    rod(head, [0.025 * s, 0.03, 0.06], [0.1 * s, 0.1, 0.3], 0.006, dark);
    if (K.palps) rod(head, [0.015 * s, -0.02, 0.07], [0.03 * s, -0.15, 0.4], 0.009, dark);
  }
  // abdomen: segments tapering backwards
  const abd = new THREE.Group();
  abd.position.set(0, -0.01, 0.06);
  body.add(abd);
  for (let i = 0; i < 7; i++) {
    const z = -i * 0.092;
    const r = 0.085 - i * 0.006;
    mesh(new THREE.SphereGeometry(r, 18, 12), dark, abd, [0, -i * 0.012, z], [1, 0.85, 1.25]);
    if (kind !== 'anopheles') {
      // pale basal band (Aedes: bright white lateral patches)
      const ring = mesh(new THREE.TorusGeometry(r * 0.92, r * 0.16, 6, 20), pale, abd, [0, -i * 0.012, z + r * 0.7], [1, 0.85, 1], [0, 0, 0]);
      ring.castShadow = false;
    }
  }
  // Aedes lyre: white curved stripes on the thorax top
  if (kind === 'aedes') {
    for (const s of [-1, 1]) {
      const ly = mesh(new THREE.TorusGeometry(0.1, 0.011, 6, 24, Math.PI * 0.8), pale, thorax, [0.05 * s, 0.1, 0.0], [1, 1, 1], [Math.PI / 2, 0, s > 0 ? Math.PI * 0.6 : Math.PI * -0.4 + Math.PI]);
      ly.castShadow = false;
    }
    mesh(new THREE.BoxGeometry(0.012, 0.01, 0.16), pale, thorax, [0, 0.142, 0.0], [1, 1, 1], [0.2, 0, 0]).castShadow = false;
  }
  // legs: three pairs, each femur / tibia / tarsus; Aedes has white bands
  const legs = [];
  const bandsOn = kind === 'aedes';
  [[0.26, 0.9, 0.7], [0.18, 0.1, 0.85], [0.1, -0.9, 1.0]].forEach(([z, ang, len], pi) => {
    for (const s of [-1, 1]) {
      const g = new THREE.Group();
      g.position.set(0.06 * s, -0.08, z);
      body.add(g);
      const a = [0, 0, 0];
      const k1 = [0.32 * s * len, 0.16, 0.3 * Math.sin(ang) * len];
      const k2 = [0.6 * s * len, -0.25, 0.55 * Math.sin(ang) * len];
      const k3 = [0.8 * s * len, -0.42, 0.78 * Math.sin(ang) * len + (pi === 2 ? -0.2 : 0)];
      rod(g, a, k1, 0.014, dark);
      // tibia + tarsus in bands
      const seg = (p, q, n) => {
        for (let i = 0; i < n; i++) {
          const u0 = i / n, u1 = (i + 1) / n;
          const P0 = p.map((v, j) => v + (q[j] - v) * u0), P1 = p.map((v, j) => v + (q[j] - v) * u1);
          rod(g, P0, P1, 0.011, bandsOn && i % 2 === 1 ? pale : dark);
        }
      };
      seg(k1, k2, bandsOn ? 4 : 1);
      seg(k2, k3, bandsOn ? 5 : 1);
      legs.push(g);
    }
  });
  // wings: pivot at the thorax top, lie back over the abdomen
  const wmat = new THREE.MeshBasicMaterial({ map: wingTex(K.wing), transparent: true, side: THREE.DoubleSide, depthWrite: false });
  const wings = [];
  for (const s of [-1, 1]) {
    const piv = new THREE.Group();
    piv.position.set(0.05 * s, 0.1, 0.18);
    body.add(piv);
    const w = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.16), wmat);
    w.position.set(0, 0, -0.33);
    w.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
    w.renderOrder = 2;
    piv.add(w);
    wings.push({ piv, s });
  }
  body.rotation.x = K.tilt;

  // flap: 0 = folded over the back, 1 = fully beating (blur by speed)
  function update(t, { flap = 0, bite = 0 } = {}) {
    for (const { piv, s } of wings) {
      const beat = Math.sin(t * 95) * 0.9 * flap;
      piv.rotation.set(0, s * (0.12 + 0.35 * flap), s * (0.1 + beat + 0.5 * flap));
    }
    head.rotation.x = 0.35 * bite;
    abd.scale.set(1 + 0.25 * bite, 1 + 0.25 * bite, 1);
    abd.children.forEach((c) => {
      if (c.material === dark && bite > 0) c.material = c.material;
    });
  }
  update(0);
  return { root, body, head, wings, legs, update, kind };
}

// ----------------------------------------------------------------- swarm
// Many tiny mosquitoes as two instanced meshes (bodies + wings). Positions
// are a pure function of t: each one orbits a drifting centre with noise.
export function makeSwarm(n = 900, seed = 11) {
  const parts = [];
  const add = (g, p, r = [0, 0, 0], s = [1, 1, 1]) => {
    g.rotateX(r[0]).rotateY(r[1]).rotateZ(r[2]);
    g.scale(...s);
    g.translate(...p);
    parts.push(g);
  };
  add(new THREE.SphereGeometry(0.15, 8, 6), [0, 0, 0.18], [0, 0, 0], [1, 0.9, 1.25]);
  add(new THREE.SphereGeometry(0.08, 8, 6), [0, -0.02, 0.4]);
  add(new THREE.CapsuleGeometry(0.07, 0.45, 3, 6), [0, -0.03, -0.2], [Math.PI / 2, 0, 0]);
  add(new THREE.CylinderGeometry(0.012, 0.012, 0.4, 3), [0, -0.12, 0.6], [Math.PI / 2 + 0.4, 0, 0]);
  for (const s of [-1, 1]) for (const z of [0.25, 0.15, 0.05]) add(new THREE.CylinderGeometry(0.012, 0.012, 0.9, 3), [0.35 * s, -0.25, z], [0, 0, s * 1.0]);
  const bodyGeo = mergeGeometries(parts);
  const bodyMat = std(0x101218, 0.5);
  const bodies = new THREE.InstancedMesh(bodyGeo, bodyMat, n);
  const wingGeo = new THREE.PlaneGeometry(0.75, 0.2);
  wingGeo.translate(0.4, 0, 0);
  const wingMat = new THREE.MeshBasicMaterial({ color: 0xdfe8f5, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false });
  const wings = new THREE.InstancedMesh(wingGeo, wingMat, n * 2);
  bodies.frustumCulled = wings.frustumCulled = false;
  const R = rng(seed);
  const P = Array.from({ length: n }, () => ({ a: R() * 6.283, b: R() * 6.283, r: 0.3 + R() ** 0.6, sp: 0.6 + R() * 1.4, ph: R() * 50, sz: 0.7 + R() * 0.6, h: R() }));
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), sc = new THREE.Vector3(), d = new THREE.Vector3();
  const group = new THREE.Group();
  group.add(bodies, wings);
  // centre(t, i) -> Vector3 path of the swarm; spread scales the cloud
  function update(t, { centre = (out) => out.set(0, 0, 0), spread = [4, 2.5, 4], count = n, size = 0.12, rise = 0 } = {}) {
    for (let i = 0; i < n; i++) {
      const p = P[i];
      if (i >= count) {
        m.makeScale(0, 0, 0);
        bodies.setMatrixAt(i, m);
        wings.setMatrixAt(2 * i, m);
        wings.setMatrixAt(2 * i + 1, m);
        continue;
      }
      const tt = t * p.sp + p.ph;
      centre(v, i, p);
      v.x += Math.sin(tt * 0.9 + p.a) * spread[0] * p.r * 0.5 + Math.sin(tt * 2.3 + p.b) * 0.15;
      v.y += Math.sin(tt * 1.3 + p.b) * spread[1] * p.r * 0.5 + rise * p.h;
      v.z += Math.cos(tt * 0.8 + p.a) * spread[2] * p.r * 0.5;
      d.set(Math.cos(tt * 0.9 + p.a), 0.2 * Math.cos(tt * 1.3 + p.b), -Math.sin(tt * 0.8 + p.a));
      const yaw = Math.atan2(d.x, d.z);
      e.set(-0.2, yaw, Math.sin(tt * 3) * 0.2);
      q.setFromEuler(e);
      const s = size * p.sz;
      sc.set(s, s, s);
      m.compose(v, q, sc);
      bodies.setMatrixAt(i, m);
      for (const side of [0, 1]) {
        const beat = Math.sin(t * 80 + i) * 0.8;
        const qq = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, side ? Math.PI : 0, beat));
        const mm = new THREE.Matrix4().compose(new THREE.Vector3(0, 0.1 * s, 0.15 * s).applyQuaternion(q).add(v), q.clone().multiply(qq), sc);
        wings.setMatrixAt(2 * i + side, mm);
      }
    }
    bodies.instanceMatrix.needsUpdate = true;
    wings.instanceMatrix.needsUpdate = true;
  }
  return { group, update };
}

// ----------------------------------------------------------------- larvae
// "Jentik-jentik": a short chain of segments that wriggles; hangs from the
// water surface by its siphon (tail up).
export function makeLarva(seed = 1) {
  const g = new THREE.Group();
  const mat = std(0x5a4a3a, 0.5, { transparent: true, opacity: 0.92 });
  const segs = [];
  for (let i = 0; i < 8; i++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(i === 0 ? 0.07 : 0.05 - i * 0.003, 10, 8), mat);
    g.add(s);
    segs.push(s);
  }
  const siphon = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.018, 0.12, 6), mat);
  g.add(siphon);
  const R = rng(seed);
  const ph = R() * 10, sp = 6 + R() * 4;
  function update(t, k = 1) {
    let x = 0, y = 0;
    for (let i = 0; i < segs.length; i++) {
      const a = Math.sin(t * sp + ph - i * 0.7) * 0.5 * k;
      x += Math.sin(a) * 0.07;
      y += Math.cos(a) * 0.07;
      segs[i].position.set(x, y, 0);
    }
    siphon.position.set(x, y + 0.06, 0);
    siphon.rotation.z = -Math.sin(t * sp + ph - 6) * 0.3 * k;
  }
  update(0);
  return { root: g, update };
}

export { clamp };
