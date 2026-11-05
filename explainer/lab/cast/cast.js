import * as THREE from 'three';
import { makeRenderer, W, H } from '../../shared/core.js';
import { makePerson } from '../../shared/people.js';
const stage = document.getElementById('stage');
const canvas = document.createElement('canvas'); stage.appendChild(canvas);
const r = makeRenderer(canvas);
const scene = new THREE.Scene(); scene.background = new THREE.Color(0xdfe9f5);
scene.add(new THREE.HemisphereLight(0xffffff, 0x8899aa, 1.4));
const sun = new THREE.DirectionalLight(0xffffff, 2.2); sun.position.set(3, 8, 6); sun.castShadow = true; scene.add(sun);
const fl = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshStandardMaterial({ color: 0xcfd8e3 })); fl.rotation.x = -Math.PI / 2; fl.receiveShadow = true; scene.add(fl);
const am = makePerson('aminah'), ibu = makePerson('ibu'), adam = makePerson('adam');
am.root.position.set(-1.6, 0, 0); ibu.root.position.set(1.6, 0, 0); adam.root.position.set(0, 0, 0.8);
scene.add(am.root, ibu.root, adam.root);
const cam = new THREE.PerspectiveCamera(40, W / H, 0.1, 200);
window.CAM = { p: [0, 2.6, 11], l: [0, 2.2, 0] };
function frame(t) {
  am.pose({ talk: t > 1 ? 0.6 : 0, smile: 1, armR: { reach: [-0.9, 1.4, 0.5], pole: [-1, -0.5, -0.4], point: 1 } });
  ibu.pose({ sad: t > 1 ? 1 : 0, tear: t > 1 ? 0.4 : 0 });
  adam.pose({ fever: t > 1 ? 1 : 0, smile: 0.8 });
  cam.position.set(...CAM.p); cam.lookAt(new THREE.Vector3(...CAM.l));
  r.render(scene, cam);
}
window.EP = { fps: 30, duration: 2, frame, ready: Promise.resolve(true) };
