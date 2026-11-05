import * as THREE from 'three';
import { makeRenderer, W, H } from '../../shared/core.js';
import { makeMosquito } from '../../shared/mosquito.js';
const canvas = document.createElement('canvas'); document.getElementById('stage').appendChild(canvas);
const r = makeRenderer(canvas);
const scene = new THREE.Scene(); scene.background = new THREE.Color(0xeaf1f8);
scene.add(new THREE.HemisphereLight(0xffffff, 0x8899aa, 1.5));
const sun = new THREE.DirectionalLight(0xffffff, 2.2); sun.position.set(3, 8, 6); scene.add(sun);
const ms = ['anopheles', 'culex', 'aedes'].map((k, i) => { const m = makeMosquito(k); m.root.position.set(0, 2.6 - i * 2.2, 0); m.root.scale.setScalar(1.6); m.root.rotation.y = -Math.PI / 2 - 0.5; scene.add(m.root); return m; });
const cam = new THREE.PerspectiveCamera(35, W / H, 0.1, 200);
window.CAM = { p: [0, 2.5, 9], l: [0, 0.4, 0] };
function frame(t) { ms.forEach((m) => m.update(t, { flap: 0 })); cam.position.set(...CAM.p); cam.lookAt(new THREE.Vector3(...CAM.l)); r.render(scene, cam); }
window.EP = { fps: 30, duration: 2, frame, ready: Promise.resolve(true) };
