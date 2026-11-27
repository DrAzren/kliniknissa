import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Burst, C, Camera, Check, clamp, Closing, Cross, FiveIntro, Glow, IconPill, interpolate, KIcon, LEAF, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, Txt, useCurrentFrame, Who,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const RIZAL: AvatarPreset = {
  id: 'rizal', skin: '#D9A47C', skinShade: '#BE8860', hair: 'side-part', hairColor: '#1E1A24', top: 'shirt', topColor: '#2BB3A3', topShade: '#1F8A7E',
  accessory: null,
};

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/** Bar mood (rendah → tinggi). */
const MoodBar: React.FC<{v: number; x: number; y: number}> = ({v, x, y}) => {
  const col = v < 0.35 ? RED : v < 0.65 ? C.yellow : C.green;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: 300}}>
      <Txt size={30} color="#fff">MOOD</Txt>
      <div style={{marginTop: 8, width: 300, height: 34, borderRadius: 17, background: 'rgba(255,255,255,.25)', overflow: 'hidden'}}>
        <div style={{width: 300 * v, height: 34, background: col, borderRadius: 17}} />
      </div>
    </div>
  );
};

/* ================= 0 — Hook ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aGerak = at(p, 'bergerak', 3.4);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={291} glow={C.violet[3]} />
      <Glow x={540} y={1050} r={460} color={C.green} opacity={0.15} />
      <Pop at={0.1} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="battery" size={56} f={f} text="10" />} text="Murung & tak bermaya?" size={42} /></Pop>
      <Who preset={RIZAL} x={300} y={1000} w={480} mood={f >= aGerak ? 'curious' : 'tired'} pose={f >= aGerak ? 'point' : 'down'} seed={22} />
      <Pop at={aGerak} style={{left: 0, width: 1080, top: 720, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="shoe" size={60} />} text="Badan perlu bergerak" size={48} bg={C.green} color="#fff" />
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Rizal, 36: lepas kerja duduk di sofa & telefon ================= */
export const Rizal: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSofa = at(p, 'sofa', 5.7);
  const aPhone = at(p, 'telefon', 6.9);
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: BG(C.violet[0], C.pink[0])}} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: '#C98C64'}} />
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Encik Rizal, 36 tahun" bg={C.navy} color={C.yellow} size={48} /></Pop>
      <Pop at={1.9} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="laptop" size={52} f={f} />} text="Pegawai bank" size={38} /></Pop>
      <Pop at={aSofa} style={{left: 60, top: 800}}><IconPill icon={<KIcon name="couch" size={56} />} text="Lepas kerja: duduk di sofa" size={36} /></Pop>
      <Pop at={aPhone} style={{left: 60, top: 910}}><IconPill icon={<KIcon name="phone" size={52} f={f} />} text="Menatap telefon" size={38} bg={RED} color="#fff" /></Pop>
      <div style={{position: 'absolute', left: 520, top: 1180}}><KIcon name="couch" size={460} /></div>
      <Who preset={RIZAL} x={560} y={960} w={420} mood="tired" pose="down" seed={22} />
    </Camera>
  );
};

/* ================= 2 — Mood merosot, mudah marah, sukar tidur ================= */
export const Merosot: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const items = [
    {a: at(p, 'merosot', 1.5), t: 'Mood merosot', i: <KIcon name="heartbreak" size={56} f={f} />},
    {a: at(p, 'marah', 2.8), t: 'Mudah marah', i: <KIcon name="bolt" size={56} f={f} />},
    {a: at(p, 'tidur', 4.2), t: 'Sukar tidur', i: <KIcon name="moon" size={56} f={f} />},
  ];
  const v = interpolate(f, [0, 90], [0.55, 0.15], clamp);
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: BG(C.night[1], C.violet[1])}} />
      <NightSky seed={63} top="transparent" bottom="transparent" stars={40} glow={C.violet[3]} />
      {items.map((it, i) => <Pop key={i} at={it.a} style={{left: 60, top: 560 + i * 115}} origin="left center"><IconPill icon={it.i} text={it.t} size={40} bg={C.navy} color="#fff" /></Pop>)}
      <MoodBar v={v} x={680} y={900} />
      <Who preset={RIZAL} x={60} y={980} w={460} mood="sad" pose="down" seed={22} />
    </Camera>
  );
};

/* ================= 3 — Doktor menilai → tambah senaman berkala ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aStamp = at(p, 'senaman', 4.4);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: BG(C.night[3], C.violet[2])}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.green} opacity={0.3} />
      {f < aStamp - 6 ? <Pop at={0.3} style={{left: 0, width: 1080, top: 720, display: 'flex', justifyContent: 'center'}}><IconPill icon={<KIcon name="checklist" size={56} />} text="Menilai mood & tidur" size={44} /></Pop> : null}
      <Who preset={p.preset} x={20} y={1040} w={460} mood="happy" pose={f < aStamp ? 'chin' : 'point'} />
      <Who preset={RIZAL} x={600} y={1060} w={420} mood={f >= aStamp ? 'curious' : 'sad'} pose="clasp" seed={22} />
      <Stamp f={f} a={aStamp} top="LANGKAH TAMBAHAN" big="SENAMAN" sub="Secara berkala" bigSize={130} y={560} />
    </Camera>
  );
};

/* ================= 4 — Bukan hanya untuk badan + 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => (
  <FiveIntro
    p={p}
    aFive={at(p, 'lima perkara', 2.4)}
    sub="perkara perlu anda tahu"
    glow={C.green}
    head={
      <Pop at={at(p, 'bukan', 0.4)} style={{left: 0, width: 1080, top: 580, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<MIcon name="brain" size={56} />} text="Senaman bukan hanya untuk badan" size={38} />
      </Pop>
    }
  />
);

/* ================= 5–9 — #1–#5 ================= */
export const Kurang: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="BAIK UNTUK MINDA"
      titleSize={84}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<MIcon name="brain" size={250} f={f} />}
      items={[
        {a: at(p, 'kemurungan', 2.9), icon: <KIcon name="heartbreak" size={76} f={f} />, text: 'Kurangkan simptom murung', size: 34},
        {a: at(p, 'kebimbangan', 3.7), icon: <KIcon name="heart" size={76} f={f} />, text: 'Kurangkan kebimbangan', size: 36},
        {a: at(p, 'tidur', 5.3), icon: <KIcon name="bed" size={76} />, text: 'Memperbaiki tidur', bg: C.green},
      ]}
      mood="happy"
    />
  );
};

export const Minit: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTiga = at(p, 'kirakira', 6.7);
  return (
    <PointScene
      p={p}
      title="150 MINIT SEMINGGU"
      titleSize={78}
      bg={BG(C.night[1], C.violet[0])}
      hero={<KIcon name="calendar" size={240} f={f} />}
      items={[
        {a: at(p, 'seratus', 2.1), icon: <KIcon name="clock" size={76} f={f} />, text: '≥ 150 minit seminggu', bg: C.green},
        {a: at(p, 'jalan', 5.6), icon: <KIcon name="shoe" size={76} />, text: 'Aktiviti sederhana: jalan laju', size: 32},
        {a: aTiga, icon: <KIcon name="checklist" size={76} />, text: '30 minit × 5 hari', bg: C.labelPink},
      ]}
      mood="happy"
    />
  );
};

export const Kecil: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="MULAKAN KECIL"
      titleSize={88}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<KIcon name="hourglass" size={240} f={f} />}
      items={[
        {a: at(p, 'sepuluh', 1.9), icon: <KIcon name="clock" size={76} f={f} />, text: '10 minit pun baik', bg: C.green},
        {a: at(p, 'konsisten', 4.3), icon: <KIcon name="calendar" size={76} f={f} />, text: 'Yang penting, konsisten', size: 36},
      ]}
      mood="happy"
    />
  );
};

export const Suka: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="PILIH YANG ANDA SUKA"
      titleSize={74}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      grid
      items={[
        {a: at(p, 'pilih', 0.6), icon: <KIcon name="shoe" size={90} />, text: 'Jalan / lari', bg: C.green, size: 30},
        {a: at(p, 'suka', 1.7), icon: <KIcon name="ball" size={90} f={f} />, text: 'Sukan', size: 30},
        {a: at(p, 'suka', 2.0), icon: <KIcon name="dumbbell" size={90} f={f} />, text: 'Senaman beban', bg: C.green, size: 28},
        {a: at(p, 'kawan', 3.4), icon: <KIcon name="person" size={90} />, text: 'Bersama kawan', size: 30},
        {a: at(p, 'kumpulan', 4.1), icon: <KIcon name="talk" size={90} f={f} />, text: 'Kumpulan', bg: C.green, size: 30},
      ]}
      mood="happy"
    />
  );
};

export const Lengkap: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aJangan = at(p, 'jangan', 4.0);
  return (
    <PointScene
      p={p}
      title="LENGKAPKAN RAWATAN"
      titleSize={76}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<div style={{display: 'flex', alignItems: 'center', gap: 6}}><KIcon name="shoe" size={150} /><Txt size={90}>+</Txt><KIcon name="pillbottle" size={150} /></div>}
      items={[
        {a: at(p, 'melengkapkan', 1.2), icon: <Check size={70} />, text: 'Melengkapkan rawatan', bg: C.green},
        {
          a: aJangan,
          icon: (
            <div style={{position: 'relative', width: 76, height: 76}}>
              <KIcon name="pillbottle" size={76} />
              <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - aJangan - 6} size={76} /></div>
            </div>
          ),
          text: 'Jangan henti ubat/terapi sendiri',
          size: 32,
          bg: RED,
        },
      ]}
    />
  );
};

/* ================= 10 — Bila jumpa doktor ================= */
export const Doktor: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="JUMPA DOKTOR JIKA"
      titleSize={80}
      bg={BG(C.night[1], C.violet[0])}
      hero={<KIcon name="hospital" size={240} />}
      items={[
        {a: at(p, 'berterusan', 0.8), icon: <KIcon name="calendar" size={76} f={f} />, text: 'Mood rendah > 2 minggu', size: 36, bg: RED},
        {a: at(p, 'hilang minat', 3.0), icon: <KIcon name="empty" size={76} f={f} />, text: 'Hilang minat dalam semua', size: 34},
      ]}
    />
  );
};

/* ================= 11 — Rizal pulih ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aLena = at(p, 'lena', 3.3);
  const aTenaga = at(p, 'bertenaga', 4.5);
  const v = interpolate(f, [0, 90], [0.3, 0.9], clamp);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG('#F6B27A', '#F6D6A8')}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: LEAF}} />
      <Pop at={0} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="shoe" size={56} />} text="2 bulan jalan laju setiap petang" size={34} /></Pop>
      <Pop at={aLena} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="bed" size={56} />} text="Tidur lebih lena" size={42} bg={C.green} color="#fff" /></Pop>
      <Pop at={aTenaga} style={{left: 60, top: 800}}><Pill text="Lebih bertenaga!" bg={C.yellow} color={C.navy} size={48} /></Pop>
      <MoodBar v={v} x={680} y={700} />
      <Who preset={RIZAL} x={300} y={960} w={480} mood="happy" pose="wave" seed={22} />
      <div style={{position: 'absolute', left: 820, top: 1000}}><KIcon name="sun" size={200} f={f} /></div>
      <Burst f={f} a={aLena} x={540} y={1060} />
    </Camera>
  );
};

/* ================= 12 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Closing
      p={p}
      aSaya={at(p, 'saya doktor', 3.3)}
      lines={[
        {a: at(p, 'rasa', 0.1), node: <IconPill icon={<KIcon name="battery" size={60} f={f} text="15" />} text="Rasa tak bermaya?" size={44} />},
        {a: at(p, 'mulakan', 1.2), node: <IconPill icon={<KIcon name="shoe" size={60} />} text="Mulakan 10 minit" size={46} bg={C.green} color="#fff" />},
        {a: at(p, 'hari ini', 2.4), node: <Pill text="Hari ini!" bg={C.labelPink} size={58} />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, rizal: Rizal, merosot: Merosot, diagnosis: Diagnosis, lima: Lima,
  kurang: Kurang, minit: Minit, kecil: Kecil, suka: Suka, lengkap: Lengkap,
  doktor: Doktor, pulih: Pulih, penutup: Penutup,
};
