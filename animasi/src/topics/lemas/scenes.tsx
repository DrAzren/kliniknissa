import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Burst, C, Camera, Check, clamp, Closing, Cross, FiveIntro, Glow, IconPill, interpolate, KIcon, LEAF, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, Txt, useCurrentFrame, Who, WATER,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const IRFAN: AvatarPreset = {
  id: 'irfan', skin: '#E0AE88', skinShade: '#C69270', hair: 'short', hairColor: '#2A1C24', top: 'tee', topColor: '#F7A23B', topShade: '#E0812A',
  accessory: null,
};
export const AYAH: AvatarPreset = {
  id: 'ayah-irfan', skin: '#C9926A', skinShade: '#AD774F', hair: 'side-part', hairColor: '#1E1A24', top: 'shirt', topColor: '#6157C5', topShade: '#4B3C9B',
  accessory: null,
};
export const PENYELAMAT: AvatarPreset = {
  id: 'penyelamat', skin: '#B9805A', skinShade: '#9C6A48', hair: 'short', hairColor: '#1E1A24', top: 'tee', topColor: RED, topShade: '#B83A4F',
  accessory: null,
};

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/** Kolam: air dari y ke bawah, dengan ombak di permukaan. */
const Pool: React.FC<{f: number; y: number; dark?: boolean}> = ({f, y, dark}) => (
  <>
    <div style={{position: 'absolute', left: 0, top: y, width: 1080, height: 1920 - y, background: dark ? 'linear-gradient(180deg, #2E5EA8 0%, #142A5C 100%)' : 'linear-gradient(180deg, #5BB8F0 0%, #2E6FC0 100%)'}} />
    <svg width={1080} height={40} style={{position: 'absolute', left: 0, top: y - 18}} viewBox="0 0 1080 40">
      <path d={`M ${-((f * 3) % 120)} 20 ${Array.from({length: 12}).map((_, i) => `q 30 -16 60 0 t 60 0`).join(' ')}`} stroke="#BFE6FF" strokeWidth={8} fill="none" />
    </svg>
  </>
);

/** Kanak-kanak yang tenggelam: bahagian bawah permukaan ditutup lapisan air separa lutsinar. */
const Sinking: React.FC<{f: number; x: number; surface: number; depth: number; w: number}> = ({f, x, surface, depth, w}) => (
  <>
    <div style={{position: 'absolute', left: x, top: surface - w * 0.55 + depth}}>
      <Who preset={IRFAN} x={0} y={0} w={w} mood="shock" pose="down" seed={15} />
    </div>
    <div style={{position: 'absolute', left: 0, top: surface, width: 1080, height: 1920 - surface, background: 'rgba(20,50,120,0.72)'}} />
    {depth > 20 ? [0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', left: x + w * 0.45 + i * 22, top: surface + 40 + depth * 0.3 - ((f * 2 + i * 25) % 80), width: 14, height: 14, borderRadius: 7, border: '3px solid #BFE6FF'}} />) : null}
  </>
);

/* ================= 0 — Hook: lemas senyap ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aJerit = at(p, 'jeritan', 1.6);
  const aLamb = at(p, 'lambaian', 2.8);
  const aSaat = at(p, 'saat', 5.5);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={221} glow={WATER} />
      <Pool f={f} y={1080} dark />
      <Pop at={aJerit} style={{left: 60, top: 600}}><IconPill icon={<div style={{position: 'relative'}}><KIcon name="talk" size={56} f={f} /><div style={{position: 'absolute', left: 0, top: 0}}><Cross f={30} size={56} /></div></div>} text="Tiada jeritan" size={42} /></Pop>
      <Pop at={aLamb} style={{left: 520, top: 600}}><IconPill icon={<div style={{position: 'relative'}}><KIcon name="palm" size={56} /><div style={{position: 'absolute', left: 0, top: 0}}><Cross f={30} size={56} /></div></div>} text="Tiada lambaian" size={42} /></Pop>
      <Pop at={aSaat} style={{left: 0, width: 1080, top: 760, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="clock" size={60} f={f * 6} />} text="Berlaku dalam beberapa saat" size={44} bg={RED} color="#fff" />
      </Pop>
      <div style={{position: 'absolute', left: 0, width: 1080, top: 1260, textAlign: 'center'}}><Txt size={120} color="#BFE6FF" style={{opacity: 0.85}}>LEMAS</Txt></div>
    </Camera>
  );
};

/* ================= 1 — Cuti sekolah, Irfan di tepi kolam, ayah leka dengan telefon ================= */
export const Irfan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKolam = at(p, 'kolam', 3.4);
  const aTel = at(p, 'telefon', 6.0);
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: BG('#7FC4F2', '#F6D6A8')}} />
      <Pool f={f} y={1380} />
      <div style={{position: 'absolute', left: 0, top: 1300, width: 1080, height: 90, background: '#E8D3B0'}} />
      <Pop at={0} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="school" size={56} />} text="Cuti sekolah" size={42} /></Pop>
      <Pop at={1.2 * p.fps} style={{left: 60, top: 680}}><Pill text="Irfan, 4 tahun" bg={C.navy} color={C.yellow} size={48} /></Pop>
      <Pop at={aKolam} style={{left: 520, top: 680}}><IconPill icon={<KIcon name="waves" size={56} f={f} />} text="Tepi kolam renang" size={38} /></Pop>
      <div style={{position: 'absolute', left: 660, top: 1080}}><Who preset={IRFAN} x={0} y={0} w={260} mood="happy" pose="wave" seed={15} /></div>
      <Who preset={AYAH} x={40} y={900} w={460} mood="happy" pose="point" seed={16} />
      <Pop at={aTel} style={{left: 360, top: 930}}><KIcon name="phone" size={150} f={f} /></Pop>
      <Pop at={aTel + 8} style={{left: 60, top: 800}}><Pill text="SALAH! Ayah leka dengan telefon" bg={RED} size={36} /></Pop>
    </Camera>
  );
};

/* ================= 2 — Tergelincir, tenggelam senyap, penyelamat tarik keluar ================= */
export const Tenggelam: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aGel = at(p, 'tergelincir', 0.4);
  const aSuara = at(p, 'suara', 3.3);
  const aPeny = at(p, 'penyelamat', 4.8);
  const aTarik = at(p, 'menariknya', 6.4);
  const depth = f < aTarik ? interpolate(f, [aGel + 6, aGel + 50], [0, 140], clamp) : interpolate(f, [aTarik, aTarik + 15], [140, -60], clamp);
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: BG(C.night[1], '#2E5EA8')}} />
      <Pool f={f} y={1100} dark />
      <Sinking f={f} x={400} surface={1100} depth={depth} w={280} />
      <Pop at={aGel} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="waves" size={56} f={f} />} text="Tergelincir ke bahagian dalam" size={36} bg={RED} color="#fff" /></Pop>
      <Pop at={aSuara} style={{left: 60, top: 670}}><IconPill icon={<div style={{position: 'relative'}}><KIcon name="talk" size={56} f={f} /><div style={{position: 'absolute', left: 0, top: 0}}><Cross f={30} size={56} /></div></div>} text="Tenggelam tanpa suara" size={38} /></Pop>
      <Pop at={aPeny} style={{left: 640, top: 880}}><Who preset={PENYELAMAT} x={0} y={0} w={380} mood="shock" pose="point" seed={17} /></Pop>
      <Pop at={aPeny + 6} style={{left: 680, top: 790}}><Pill text="Penyelamat!" bg={C.green} size={40} /></Pop>
    </Camera>
  );
};

/* ================= 3 — Bantuan pernafasan, hospital ================= */
export const Hospital: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aNafas = at(p, 'pernafasan', 1.0);
  const aHos = at(p, 'hospital', 2.7);
  const aSaat = at(p, 'saat', 4.9);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: BG(C.night[3], C.violet[2])}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      <Pop at={aNafas} style={{left: 60, top: 600}}><IconPill icon={<KIcon name="cpr" size={60} f={f} />} text="Bantuan pernafasan" size={42} /></Pop>
      <Pop at={aHos - 4} style={{left: 600, top: 760}}><KIcon name="ambulance" size={320} f={f} /></Pop>
      <Who preset={p.preset} x={20} y={1040} w={460} mood="neutral" pose="point" />
      <Pop at={aSaat} style={{left: 0, width: 1080, top: 720, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Beberapa saat lagi... lebih teruk" bg={RED} size={42} />
      </Pop>
    </Camera>
  );
};

/* ================= 4 — Punca utama kematian + 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => (
  <FiveIntro
    p={p}
    aFive={at(p, 'lima perkara', 3.6)}
    sub="perkara ibu bapa perlu tahu"
    glow={WATER}
    head={
      <Pop at={at(p, 'punca', 1.0)} style={{left: 0, width: 1080, top: 580, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="warning" size={56} />} text="Antara punca utama kematian kanak-kanak" size={34} bg={RED} color="#fff" />
      </Pop>
    }
  />
);

/* ================= 5–9 — #1–#5 ================= */
export const Awasi: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="AWASI SENTIASA"
      titleSize={88}
      bg={BG(C.night[1], '#1F4A6E')}
      glow={WATER}
      hero={<MIcon name="eye" size={240} f={f} />}
      items={[
        {a: at(p, 'jangkauan', 3.8), icon: <KIcon name="palm" size={76} />, text: 'Dalam jangkauan tangan', bg: C.green},
        {a: at(p, 'simpan', 5.3), icon: <div style={{position: 'relative'}}><KIcon name="phone" size={76} f={f} /><div style={{position: 'absolute', left: 0, top: 0}}><Cross f={30} size={76} /></div></div>, text: 'Simpan telefon', bg: RED},
      ]}
      mood="happy"
    />
  );
};

export const Senyap: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="LEMAS BERLAKU SENYAP"
      titleSize={74}
      bg={BG(C.night[0], '#1F3A6E')}
      glow={RED}
      hero={<KIcon name="waves" size={260} f={f} />}
      items={[
        {a: at(p, 'menjerit', 2.3), icon: <KIcon name="talk" size={76} f={f} />, text: 'Mungkin tidak menjerit'},
        {a: at(p, 'melambai', 3.1), icon: <KIcon name="palm" size={76} />, text: 'Mungkin tidak melambai'},
        {a: at(p, 'bunyi', 4.8), icon: <KIcon name="warning" size={76} />, text: 'Jangan tunggu bunyi', bg: RED},
      ]}
    />
  );
};

export const Pagar: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="TUTUP & PAGAR"
      titleSize={92}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      grid
      items={[
        {a: at(p, 'pagar kolam', 2.0), icon: <KIcon name="fence" size={90} />, text: 'Pagar kolam', bg: C.green},
        {a: at(p, 'tong', 3.0), icon: <MIcon name="pot" size={90} f={f} />, text: 'Tutup tong air'},
        {a: at(p, 'baldi', 4.4), icon: <MIcon name="bucket" size={90} f={f} />, text: 'Kosongkan baldi & besen', bg: C.green, size: 28},
      ]}
      mood="happy"
    />
  );
};

export const Jauhi: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="JAUHI AIR BAHAYA"
      titleSize={82}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      grid
      items={[
        {a: at(p, 'banjir', 3.4), icon: <KIcon name="storm" size={90} f={f} />, text: 'Air banjir', bg: RED},
        {a: at(p, 'sungai', 4.1), icon: <KIcon name="waves" size={90} f={f} />, text: 'Sungai'},
        {a: at(p, 'pantai', 4.8), icon: <KIcon name="sun" size={90} f={f} />, text: 'Pantai', bg: RED},
        {a: at(p, 'jaket', 7.0), icon: <KIcon name="lifejacket" size={90} />, text: 'Pakai jaket keselamatan', bg: C.green, size: 28},
      ]}
    />
  );
};

export const Ajar: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="BERENANG & CPR"
      titleSize={92}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<KIcon name="lifejacket" size={240} />}
      items={[
        {a: at(p, 'berenang', 1.3), icon: <KIcon name="waves" size={76} f={f} />, text: 'Ajar anak berenang', bg: C.green},
        {a: at(p, 'keselamatan', 1.9), icon: <KIcon name="checklist" size={76} />, text: 'Keselamatan air'},
        {a: at(p, 'cpr', 4.6), icon: <KIcon name="cpr" size={76} f={f} />, text: 'Ibu bapa belajar CPR', bg: C.green},
      ]}
      mood="happy"
    />
  );
};

/* ================= 10 — Jika anak lemas: 3 langkah ================= */
export const Cpr: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="JIKA ANAK LEMAS"
      titleSize={86}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<KIcon name="cpr" size={260} f={f} />}
      items={[
        {a: at(p, 'keluarkan', 1.2), icon: <KIcon name="waves" size={76} f={f} />, text: '1. Keluarkan dari air'},
        {a: at(p, 'telefon', 2.5), icon: <KIcon name="phone" size={76} f={f} />, text: '2. Telefon 999', bg: RED},
        {a: at(p, 'mulakan', 4.3), icon: <KIcon name="cpr" size={76} f={f} />, text: '3. CPR jika tidak bernafas', size: 34},
        {a: at(p, 'walaupun', 7.2), icon: <KIcon name="hospital" size={76} />, text: 'Tetap bawa ke hospital', bg: C.green, size: 36},
      ]}
    />
  );
};

/* ================= 11 — Irfan pulih, ayah di sisi ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSisi = at(p, 'sisinya', 3.6);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG('#7FC4F2', '#F6D6A8')}} />
      <Pool f={f} y={1440} />
      <div style={{position: 'absolute', left: 0, top: 1360, width: 1080, height: 90, background: '#E8D3B0'}} />
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Irfan pulih sepenuhnya" bg={C.green} size={52} /></Pop>
      <Pop at={aSisi} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="lifejacket" size={56} />} text="Ayah sentiasa di sisi" size={42} /></Pop>
      <Who preset={AYAH} x={160} y={920} w={460} mood="happy" pose="clasp" seed={16} />
      <div style={{position: 'absolute', left: 580, top: 1080}}><Who preset={IRFAN} x={0} y={0} w={280} mood="happy" pose="wave" seed={15} /></div>
      <div style={{position: 'absolute', left: 650, top: 1270}}><KIcon name="lifejacket" size={140} /></div>
      <Burst f={f} a={aSisi} x={600} y={1100} />
    </Camera>
  );
};

/* ================= 12 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Closing
      p={p}
      aSaya={at(p, 'saya doktor', 4.5)}
      lines={[
        {a: at(p, 'cuti', 0.1), node: <IconPill icon={<KIcon name="waves" size={60} f={f} />} text="Cuti sekolah, aktiviti air" size={42} />},
        {a: at(p, 'jangan leka', 2.4), node: <Pill text="Jangan leka" bg={C.labelPink} size={58} />},
        {a: at(p, 'awasi', 3.2), node: <IconPill icon={<MIcon name="eye" size={60} f={f} />} text="Awasi anak anda" size={44} bg={C.green} color="#fff" />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, irfan: Irfan, tenggelam: Tenggelam, hospital: Hospital, lima: Lima,
  awasi: Awasi, senyap: Senyap, pagar: Pagar, jauhi: Jauhi, ajar: Ajar,
  cpr: Cpr, pulih: Pulih, penutup: Penutup,
};

void Check; void Stamp; void LEAF;
