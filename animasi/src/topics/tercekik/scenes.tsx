import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Burst, C, Camera, Check, Closing, Cross, FiveIntro, Glow, IconPill, KIcon, LEAF,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, useCurrentFrame, Who,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const DANISH: AvatarPreset = {
  id: 'danish', skin: '#E0AE88', skinShade: '#C69270', hair: 'short', hairColor: '#2A1C24', top: 'tee', topColor: '#4FA3FF', topShade: '#2F7FD6',
  accessory: null,
};
export const IBU: AvatarPreset = {
  id: 'ibu-danish', skin: '#D49C74', skinShade: '#B9805A', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#F7A23B', topShade: '#E0812A',
  hijabColor: '#6157C5', hijabShade: '#4B3C9B', accessory: null,
};
export const AYAH: AvatarPreset = {
  id: 'ayah-danish', skin: '#C9926A', skinShade: '#AD774F', hair: 'short', hairColor: '#1E1A24', top: 'tee', topColor: '#2BB3A3', topShade: '#1F8A7E',
  accessory: null, stubble: true,
};

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/** Danish (kecil) dengan kesan biru pada bibir & gegaran bila tercekik. */
const Kid: React.FC<{x: number; y: number; w: number; f: number; choke?: boolean; mood?: 'sad' | 'happy' | 'shock' | 'neutral'; pose?: 'down' | 'wave' | 'clasp'}> = ({x, y, w, f, choke, mood = 'neutral', pose = 'clasp'}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: choke ? `translate(${Math.sin(f * 1.7) * 4}px, 0)` : undefined}}>
    <Who preset={DANISH} x={0} y={0} w={w} mood={choke ? 'shock' : mood} pose={choke ? 'clasp' : pose} seed={6} />
    {choke ? <div style={{position: 'absolute', left: w * 0.36, top: w * 0.3, width: w * 0.28, height: w * 0.22, borderRadius: '50%', background: '#4F79C7', opacity: 0.35, filter: 'blur(10px)'}} /> : null}
  </div>
);

/* ================= 0 — Hook: tak boleh bercakap, batuk, bernafas ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const items = [
    {a: at(p, 'bercakap', 1.0), t: 'Tak boleh bercakap'},
    {a: at(p, 'batuk', 2.0), t: 'Tak boleh batuk'},
    {a: at(p, 'bernafas', 3.0), t: 'Tak boleh bernafas'},
  ];
  const aTer = at(p, 'tercekik', 4.9);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={271} glow={RED} />
      <Glow x={540} y={1100} r={460} color={RED} opacity={0.2 + 0.05 * Math.sin(f / 4)} />
      {items.map((it, i) => <Pop key={i} at={it.a} style={{left: 60, top: 560 + i * 115}} origin="left center"><IconPill icon={<KIcon name="warning" size={56} />} text={it.t} size={40} bg={RED} color="#fff" /></Pop>)}
      <Kid x={380} y={1040} w={330} f={f} choke />
      <Pop at={aTer} style={{left: 0, width: 1080, top: 1500, display: 'flex', justifyContent: 'center'}}><Pill text="Mungkin tercekik!" bg={C.yellow} color={C.navy} size={64} /></Pop>
    </Camera>
  );
};

/* ================= 1 — Danish, 2 tahun: makan anggur sambil berlari → tercekik ================= */
export const Danish: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aAnggur = at(p, 'anggur', 1.8);
  const aStop = at(p, 'terhenti', 4.6);
  const aBiru = at(p, 'kebiruan', 7.5);
  const choke = f >= aStop;
  const run = choke ? 0 : Math.sin(f / 4) * 30;
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: choke ? BG(C.night[1], '#5A1F3A') : BG(C.violet[0], C.pink[0])}} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: choke ? C.night[3] : '#C98C64'}} />
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Danish, 2 tahun" bg={C.navy} color={C.yellow} size={52} /></Pop>
      <Pop at={aAnggur} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="grape" size={56} />} text="Makan anggur sambil berlari" size={36} /></Pop>
      <Pop at={aStop} style={{left: 60, top: 800}}><Pill text="Terhenti, pegang leher" bg={RED} size={42} /></Pop>
      <Pop at={aBiru} style={{left: 60, top: 910}}><Pill text="Bibir kebiruan" bg={RED} size={42} /></Pop>
      <div style={{position: 'absolute', left: 700, top: 1000}}><KIcon name="grape" size={200} /></div>
      <Kid x={300 + run} y={1080} w={340} f={f} choke={choke} mood="happy" pose="wave" />
    </Camera>
  );
};

/* ================= 2 — Ibu korek mulut dengan jari (SALAH) ================= */
export const Panik: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aJari = at(p, 'mengorek', 1.4);
  const aDalam = at(p, 'menolak', 3.8);
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: BG(C.night[1], '#5A1F3A')}} />
      <Who preset={IBU} x={40} y={940} w={460} mood="shock" pose="point" seed={4} />
      <Kid x={500} y={1140} w={300} f={f} choke />
      <Pop at={0.1} style={{left: 60, top: 560}}><Pill text="Ibu panik" bg={RED} size={50} /></Pop>
      <Pop at={aJari} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="palm" size={56} />} text="Korek mulut dengan jari" size={38} /></Pop>
      {f >= aJari + 10 ? <div style={{position: 'absolute', left: 40, top: 660, width: 640, height: 110}}><Cross f={f - aJari - 10} size={110} /></div> : null}
      <Pop at={aJari + 12} style={{left: 700, top: 660}}><Pill text="SALAH!" bg={RED} size={52} /></Pop>
      <Pop at={aDalam} style={{left: 60, top: 800}}><IconPill icon={<KIcon name="warning" size={56} />} text="Boleh tolak objek lebih dalam" size={34} bg={C.yellow} color={C.navy} /></Pop>
    </Camera>
  );
};

/* ================= 3 — Ayah: tepukan belakang + tekanan perut → keluar → hospital ================= */
export const Tolong: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTep = at(p, 'tepukan', 1.0);
  const aTek = at(p, 'tekanan', 2.3);
  const aKeluar = at(p, 'tercampak', 4.0);
  const aHos = at(p, 'hospital', 6.4);
  const out = f >= aKeluar;
  return (
    <Camera dur={p.dur} to={1.08} panY={-12}>
      <AbsoluteFill style={{background: out ? BG(C.violet[0], C.pink[0]) : BG(C.night[1], C.violet[1])}} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: out ? '#C98C64' : C.night[3]}} />
      <Pop at={aTep} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="backblow" size={64} f={f} />} text="Tepukan di belakang" size={40} /></Pop>
      <Pop at={aTek} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="thrust" size={64} f={f} />} text="Tekanan perut" size={40} /></Pop>
      <Who preset={AYAH} x={40} y={960} w={460} mood={out ? 'happy' : 'shock'} pose={out ? 'wave' : 'point'} seed={7} />
      <Kid x={480} y={1130} w={300} f={f} choke={!out} mood="sad" />
      {out ? (
        <div style={{position: 'absolute', left: 760 + Math.min(1, (f - aKeluar) / 12) * 160, top: 1080 - Math.sin(Math.min(1, (f - aKeluar) / 12) * Math.PI) * 160}}>
          <svg width={60} height={60} viewBox="0 0 60 60"><circle cx={30} cy={30} r={24} fill="#8E5BC6" /><circle cx={24} cy={22} r={6} fill="#fff" opacity={0.5} /></svg>
        </div>
      ) : null}
      <Pop at={aKeluar} style={{left: 60, top: 800}}><IconPill icon={<Check size={52} />} text="Anggur tercampak keluar" size={38} bg={C.green} color="#fff" /></Pop>
      <Pop at={aHos} style={{left: 60, top: 910}}><IconPill icon={<KIcon name="hospital" size={56} />} text="Ke hospital untuk diperiksa" size={36} /></Pop>
    </Camera>
  );
};

/* ================= 4 — Dalam beberapa saat + 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => (
  <FiveIntro
    p={p}
    aFive={at(p, 'lima perkara', 2.9)}
    sub="perkara ibu bapa perlu tahu"
    glow={C.pink[0]}
    head={
      <Pop at={at(p, 'beberapa saat', 1.4)} style={{left: 0, width: 1080, top: 580, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="clock" size={56} />} text="Berlaku dalam beberapa saat" size={42} />
      </Pop>
    }
  />
);

/* ================= 5–9 — #1–#5 ================= */
export const Batuk: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="MASIH BATUK KUAT?"
      titleSize={80}
      bg={BG(C.night[1], C.violet[0])}
      hero={<KIcon name="sneeze" size={240} f={f} />}
      items={[
        {a: at(p, 'galakkan', 2.8), icon: <KIcon name="talk" size={76} f={f} />, text: 'Galakkan terus batuk', bg: C.green},
        {a: at(p, 'perhatikan', 4.4), icon: <KIcon name="checklist" size={76} />, text: 'Perhatikan anak'},
      ]}
    />
  );
};

export const Besar: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="ANAK LEBIH 1 TAHUN"
      titleSize={80}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<KIcon name="thrust" size={250} f={f} />}
      items={[
        {a: at(p, 'tidak berkesan', 1.4), icon: <KIcon name="warning" size={76} />, text: 'Batuk tidak berkesan', bg: RED},
        {a: at(p, 'lima tepukan', 4.2), icon: <KIcon name="backblow" size={76} f={f} />, text: '5 tepukan di belakang'},
        {a: at(p, 'lima tekanan', 6.2), icon: <KIcon name="thrust" size={76} f={f} />, text: '5 tekanan perut'},
        {a: at(p, 'ulang', 7.4), icon: <KIcon name="recovery" size={76} />, text: 'Ulang', bg: C.labelPink},
      ]}
    />
  );
};

export const Bayi: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aJangan = at(p, 'jangan', 5.3);
  return (
    <PointScene
      p={p}
      title="BAYI BAWAH 1 TAHUN"
      titleSize={80}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<KIcon name="chest2" size={250} f={f} />}
      items={[
        {a: at(p, 'lima tepukan', 1.9), icon: <KIcon name="backblow" size={76} f={f} />, text: '5 tepukan belakang'},
        {a: at(p, 'tekanan dada', 3.9), icon: <KIcon name="chest2" size={76} f={f} />, text: '5 tekanan dada', bg: C.green},
        {
          a: aJangan,
          icon: (
            <div style={{position: 'relative', width: 76, height: 76}}>
              <KIcon name="thrust" size={76} f={f} />
              <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - aJangan - 6} size={76} /></div>
            </div>
          ),
          text: 'Jangan tekanan perut',
          bg: RED,
        },
      ]}
    />
  );
};

export const Pengsan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="TIDAK SEDAR"
      titleSize={92}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<KIcon name="ambulance" size={250} f={f} />}
      items={[
        {a: at(p, 'hubungi', 2.0), icon: <KIcon name="phone" size={76} f={f} />, text: 'Hubungi 999', bg: RED},
        {a: at(p, 'mulakan', 4.0), icon: <KIcon name="cpr" size={76} f={f} />, text: 'Mulakan CPR'},
      ]}
    />
  );
};

export const Cegah: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKacang = at(p, 'kacang', 3.4);
  return (
    <PointScene
      p={p}
      title="CEGAH"
      titleSize={100}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      grid
      items={[
        {a: at(p, 'potong', 1.4), icon: <KIcon name="grape" size={90} />, text: 'Potong anggur memanjang', bg: C.green, size: 26},
        {
          a: aKacang,
          icon: (
            <div style={{position: 'relative', width: 90, height: 90}}>
              <KIcon name="nuts" size={90} />
              <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - aKacang - 6} size={90} /></div>
            </div>
          ),
          text: 'Tiada kacang untuk anak kecil',
          size: 24,
        },
        {a: at(p, 'mainan', 5.2), icon: <KIcon name="toy" size={90} f={f} />, text: 'Simpan mainan kecil', bg: C.green, size: 28},
        {a: at(p, 'duduk', 7.4), icon: <KIcon name="bowl" size={90} />, text: 'Duduk semasa makan', size: 28},
      ]}
      mood="happy"
    />
  );
};

/* ================= 10 — Tetap jumpa doktor ================= */
export const Periksa: React.FC<SceneProps> = (p) => (
  <PointScene
    p={p}
    title="SUDAH KELUAR?"
    titleSize={88}
    bg={BG(C.night[1], C.violet[0])}
    hero={<KIcon name="hospital" size={240} />}
    items={[
      {a: at(p, 'bawa', 1.5), icon: <KIcon name="hospital" size={76} />, text: 'Tetap bawa anak ke doktor', bg: C.labelPink, size: 34},
    ]}
  />
);

/* ================= 11 — Danish sihat, makan sambil duduk ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSihat = at(p, 'sihat', 0.6);
  const aDuduk = at(p, 'duduk', 2.1);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG('#7FC4F2', '#F6D6A8')}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: LEAF}} />
      <Pop at={aSihat} style={{left: 60, top: 560}}><Pill text="Danish kini sihat!" bg={C.green} size={54} /></Pop>
      <Pop at={aDuduk} style={{left: 60, top: 690}}><IconPill icon={<KIcon name="bowl" size={56} />} text="Makan sambil duduk di meja" size={38} /></Pop>
      <Who preset={IBU} x={20} y={960} w={400} mood="happy" pose="clasp" seed={4} />
      <Who preset={AYAH} x={640} y={940} w={400} mood="happy" pose="wave" seed={7} />
      <div style={{position: 'absolute', left: 330, top: 1300, width: 440, height: 40, background: '#8A5A3A', borderRadius: 12}} />
      <Kid x={400} y={1110} w={280} f={f} mood="happy" pose="wave" />
      <Burst f={f} a={aSihat} x={540} y={1100} />
    </Camera>
  );
};

/* ================= 12 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Closing
      p={p}
      aSaya={at(p, 'saya doktor', 3.6)}
      lines={[
        {a: at(p, 'ibu bapa', 0.1), node: <IconPill icon={<KIcon name="person" size={60} />} text="Ibu bapa," size={46} />},
        {a: at(p, 'pertolongan', 1.4), node: <IconPill icon={<KIcon name="cpr" size={60} f={f} />} text="Belajar pertolongan cemas" size={40} bg={C.green} color="#fff" />},
        {a: at(p, 'jangan tunggu', 2.5), node: <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, danish: Danish, panik: Panik, tolong: Tolong, lima: Lima,
  batuk: Batuk, besar: Besar, bayi: Bayi, pengsan: Pengsan, cegah: Cegah,
  periksa: Periksa, pulih: Pulih, penutup: Penutup,
};

void Stamp;
