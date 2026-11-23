import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Burst, C, Camera, Check, clamp, Closing, Cross, FiveIntro, Glow, IconPill, interpolate, KIcon, LEAF, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, useCurrentFrame, Who,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const HANA: AvatarPreset = {
  id: 'hana', skin: '#E6B892', skinShade: '#CC9C76', hair: 'short', hairColor: '#3A2418', top: 'tee', topColor: '#F29CBC', topShade: '#D97A9E',
  accessory: null,
};
export const IBU: AvatarPreset = {
  id: 'ibu-hana', skin: '#D49C74', skinShade: '#B9805A', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#4F79C7', topShade: '#3A5E9E',
  hijabColor: '#F29CBC', hijabShade: '#D97A9E', accessory: null,
};

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/** Hana (kecil) dengan reben + gelombang haba bila demam. */
const Hana: React.FC<{x: number; y: number; w: number; f: number; hot?: boolean; mood?: 'sad' | 'happy' | 'tired' | 'neutral' | 'curious'; pose?: 'down' | 'wave' | 'clasp'}> = ({x, y, w, f, hot, mood = 'tired', pose = 'down'}) => (
  <>
    {hot
      ? [0, 1, 2].map((i) => (
          <svg key={i} width={60} height={120} viewBox="0 0 60 120" style={{position: 'absolute', left: x + w * 0.25 + i * w * 0.22, top: y - 70 - ((f * 1.2 + i * 20) % 40), opacity: 0.7}}>
            <path d="M 30 110 q -16 -18 0 -36 t 0 -36 t 0 -30" stroke={RED} strokeWidth={8} fill="none" strokeLinecap="round" />
          </svg>
        ))
      : null}
    <Who preset={HANA} x={x} y={y} w={w} mood={mood} pose={pose} seed={3} bow={C.labelPink} />
  </>
);

/** Termometer digital dengan bacaan. */
const Thermo: React.FC<{x: number; y: number; size: number; t: string}> = ({x, y, size, t}) => (
  <div style={{position: 'absolute', left: x, top: y}}><KIcon name="dthermo" size={size} text={t} /></div>
);

/* ================= 0 — Hook: hospital atau rumah? ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aHos = at(p, 'hospital', 2.2);
  const aRumah = at(p, 'rumah', 3.8);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={97} glow={RED} />
      <Glow x={540} y={1100} r={460} color={RED} opacity={0.2 + 0.05 * Math.sin(f / 6)} />
      <Pop at={0.1} style={{left: 0, width: 1080, top: 560, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="dthermo" size={64} text="39.0" />} text="Anak demam tinggi…" size={48} />
      </Pop>
      <Pop at={aHos} style={{left: 60, top: 720}}><IconPill icon={<KIcon name="hospital" size={60} />} text="Ke hospital?" size={44} bg={RED} color="#fff" /></Pop>
      <Pop at={aRumah} style={{left: 560, top: 720}}><IconPill icon={<KIcon name="bed" size={60} />} text="Rawat di rumah?" size={40} /></Pop>
      <Hana x={380} y={1080} w={330} f={f} hot />
    </Camera>
  );
};

/* ================= 1 — Hana, 3 tahun, demam 39°C; ibu panik, mahu antibiotik ================= */
export const HanaScene: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSuhu = at(p, 'suhu', 2.9);
  const aPanik = at(p, 'panik', 5.2);
  const aAnti = at(p, 'antibiotik', 6.9);
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: BG(C.violet[0], C.pink[0])}} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: '#C98C64'}} />
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Hana, 3 tahun" bg={C.navy} color={C.yellow} size={52} /></Pop>
      <Pop at={1.4} style={{left: 480, top: 560}}><IconPill icon={<KIcon name="calendar" size={52} f={f} />} text="Demam sejak semalam" size={32} /></Pop>
      <Pop at={aSuhu} style={{left: 640, top: 700}}><KIcon name="dthermo" size={260} text="39.0" /></Pop>
      <Pop at={aSuhu + 6} style={{left: 640, top: 960}}><Pill text="39°C" bg={RED} size={60} /></Pop>
      <Pop at={aPanik} style={{left: 60, top: 680}}><Pill text="Ibu panik" bg={RED} size={46} /></Pop>
      <Pop at={aAnti} style={{left: 60, top: 790}}><IconPill icon={<KIcon name="pill" size={56} />} text="Mahu antibiotik" size={38} /></Pop>
      <Who preset={IBU} x={40} y={960} w={460} mood={f >= aPanik ? 'shock' : 'neutral'} pose="clasp" seed={4} />
      <Hana x={480} y={1170} w={260} f={f} hot />
    </Camera>
  );
};

/* ================= 2 — Tapi Hana masih minum, bermain, ketawa ================= */
export const Main: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const items = [
    {a: at(p, 'minum', 0.8), t: 'Masih mahu minum', i: <KIcon name="cup" size={56} f={f} />},
    {a: at(p, 'bermain', 1.8), t: 'Masih bermain', i: <KIcon name="toy" size={56} f={f} />},
    {a: at(p, 'ketawa', 2.6), t: 'Ketawa bila suhu turun', i: <KIcon name="smile" size={56} />},
  ];
  const happy = f >= items[2].a;
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: BG('#7FC4F2', '#F6D6A8')}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: LEAF}} />
      {items.map((it, i) => <Pop key={i} at={it.a} style={{left: 60, top: 560 + i * 115}} origin="left center"><IconPill icon={it.i} text={it.t} size={40} bg={C.green} color="#fff" /></Pop>)}
      <div style={{position: 'absolute', left: 560, top: 1110}}><KIcon name="ball" size={160} f={f} /></div>
      <Hana x={260} y={1020} w={340} f={f} mood={happy ? 'happy' : 'neutral'} pose={happy ? 'wave' : 'clasp'} />
      <Burst f={f} a={items[2].a} x={430} y={1080} />
    </Camera>
  );
};

/* ================= 3 — Diagnosis: jangkitan virus, tak perlu antibiotik ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aStamp = at(p, 'virus', 3.3);
  const aAnti = at(p, 'antibiotik', 5.1);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: BG(C.night[3], C.violet[2])}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      {f < aStamp - 6 ? <Pop at={0.3} style={{left: 0, width: 1080, top: 720, display: 'flex', justifyContent: 'center'}}><IconPill icon={<MIcon name="search" size={56} />} text="Doktor periksa" size={46} /></Pop> : null}
      <Who preset={p.preset} x={20} y={1040} w={460} mood="neutral" pose={f < aStamp ? 'chin' : 'point'} />
      <Who preset={IBU} x={560} y={1020} w={420} mood={f >= aAnti ? 'happy' : 'neutral'} pose="clasp" seed={4} />
      <Hana x={760} y={1250} w={220} f={f} mood="neutral" />
      <Stamp f={f} a={aStamp} top="DIAGNOSIS" big="JANGKITAN VIRUS" sub="Tak perlu antibiotik" bigSize={92} y={560} />
    </Camera>
  );
};

/* ================= 4 — Demam = badan melawan + 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => (
  <FiveIntro
    p={p}
    aFive={at(p, 'lima perkara', 3.0)}
    sub="perkara ibu bapa perlu tahu"
    glow={C.pink[0]}
    head={
      <Pop at={at(p, 'melawan', 1.2)} style={{left: 0, width: 1080, top: 580, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="virus" size={56} />} text="Demam: badan melawan jangkitan" size={38} />
      </Pop>
    }
  />
);

/* ================= 5–9 — #1–#5 ================= */
export const Keadaan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="LIHAT KEADAAN ANAK"
      titleSize={78}
      bg={BG(C.night[1], C.violet[0])}
      hero={<div style={{position: 'relative', width: 260, height: 260}}><Hana x={10} y={0} w={240} f={f} mood="happy" pose="wave" /></div>}
      items={[
        {a: at(p, 'angka', 1.6), icon: <KIcon name="dthermo" size={76} text="39.0" />, text: 'Bukan angka suhu sahaja', size: 36},
        {a: at(p, 'aktif', 4.4), icon: <KIcon name="toy" size={76} f={f} />, text: 'Masih aktif', bg: C.green},
        {a: at(p, 'mahu minum', 4.9), icon: <KIcon name="cup" size={76} f={f} />, text: 'Mahu minum', bg: C.green},
        {a: at(p, 'tidak membimbangkan', 6.3), icon: <Check size={70} />, text: 'Biasanya tidak membimbangkan', size: 30},
      ]}
      mood="happy"
    />
  );
};

export const Bayi: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="BAYI BAWAH 3 BULAN"
      titleSize={78}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<div style={{display: 'flex', alignItems: 'center'}}><KIcon name="baby" size={220} /><KIcon name="dthermo" size={150} text="38.0" /></div>}
      items={[
        {a: at(p, 'suhu', 2.0), icon: <KIcon name="dthermo" size={76} text="38.0" />, text: 'Suhu 38°C atau lebih', bg: RED},
        {a: at(p, 'segera', 4.5), icon: <KIcon name="ambulance" size={76} f={f} />, text: 'Segera ke hospital', bg: RED},
      ]}
      mood="neutral"
    />
  );
};

export const Bahaya: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="TANDA BAHAYA"
      titleSize={88}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      grid
      items={[
        {a: at(p, 'lemah', 2.4), icon: <KIcon name="droop" size={90} f={f} />, text: 'Sangat lemah / sukar dikejut', bg: RED, size: 24},
        {a: at(p, 'sesak', 4.5), icon: <KIcon name="lungs" size={90} f={f} />, text: 'Sesak nafas', size: 30},
        {a: at(p, 'ruam', 5.5), icon: <KIcon name="rash" size={90} f={f} />, text: 'Ruam tak hilang bila ditekan', bg: RED, size: 24},
        {a: at(p, 'kejang', 7.5), icon: <KIcon name="bolt" size={90} f={f} />, text: 'Kejang', size: 32},
        {a: at(p, 'kencing', 8.7), icon: <KIcon name="diaper" size={90} f={f} />, text: 'Kurang kencing', bg: RED, size: 28},
      ]}
      mood="neutral"
    />
  );
};

export const LimaHari: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="DEMAM 5 HARI ATAU LEBIH"
      titleSize={68}
      bg={BG(C.night[1], C.violet[1])}
      hero={<KIcon name="calendar" size={250} f={f} />}
      items={[
        {a: at(p, 'diperiksa', 2.5), icon: <KIcon name="hospital" size={76} />, text: 'Perlu diperiksa doktor', bg: C.labelPink},
      ]}
    />
  );
};

export const Rumah: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTuam = at(p, 'tuam', 8.3);
  return (
    <PointScene
      p={p}
      title="DI RUMAH"
      titleSize={96}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      grid
      items={[
        {a: at(p, 'banyak minum', 1.6), icon: <KIcon name="cup" size={90} f={f} />, text: 'Banyak minum', bg: C.green, size: 30},
        {a: at(p, 'baju', 3.0), icon: <KIcon name="shirt" size={90} />, text: 'Baju nipis', size: 30},
        {a: at(p, 'parasetamol', 4.4), icon: <KIcon name="bottle" size={90} />, text: 'Parasetamol ikut berat badan', bg: C.green, size: 24},
        {
          a: aTuam,
          icon: (
            <div style={{position: 'relative', width: 90, height: 90}}>
              <KIcon name="bowl" size={90} />
              <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - aTuam - 6} size={90} /></div>
            </div>
          ),
          text: 'Tak perlu tuam air sejuk',
          size: 26,
        },
      ]}
      mood="happy"
    />
  );
};

/* ================= 10 — Kebanyakan virus, sembuh sendiri; antibiotik tak bantu ================= */
export const Virus: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aAnti = at(p, 'antibiotik', 4.9);
  return (
    <PointScene
      p={p}
      title="KEBANYAKAN VIRUS"
      titleSize={80}
      bg={BG(C.night[1], C.violet[0])}
      hero={<KIcon name="virus" size={250} f={f} />}
      items={[
        {a: at(p, 'sembuh', 2.8), icon: <Check size={70} />, text: 'Sembuh sendiri dalam beberapa hari', size: 30, bg: C.green},
        {
          a: aAnti,
          icon: (
            <div style={{position: 'relative', width: 76, height: 76}}>
              <KIcon name="pill" size={76} />
              <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - aAnti - 6} size={76} /></div>
            </div>
          ),
          text: 'Antibiotik tak bantu virus',
          size: 34,
          bg: RED,
        },
      ]}
    />
  );
};

/* ================= 11 — Hana pulih ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKebah = at(p, 'kebah', 1.6);
  const aCeria = at(p, 'ceria', 3.2);
  const temp = interpolate(f, [aKebah - 10, aKebah + 20], [38.6, 36.8], clamp).toFixed(1);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG('#7FC4F2', '#F6D6A8')}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: LEAF}} />
      <Pop at={0} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="calendar" size={56} f={f} />} text="Selepas 3 hari" size={44} /></Pop>
      <Pop at={aKebah} style={{left: 60, top: 680}}><Pill text="Demam kebah" bg={C.green} size={52} /></Pop>
      <Thermo x={720} y={640} size={240} t={temp} />
      <Who preset={IBU} x={40} y={980} w={440} mood="happy" pose="clasp" seed={4} />
      <Hana x={500} y={1100} w={330} f={f} mood="happy" pose="wave" />
      <Pop at={aCeria} style={{left: 520, top: 960}}><Pill text="Kembali ceria!" bg={C.yellow} color={C.navy} size={44} /></Pop>
      <Burst f={f} a={aCeria} x={660} y={1160} />
    </Camera>
  );
};

/* ================= 12 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Closing
      p={p}
      aSaya={at(p, 'saya doktor', 4.2)}
      lines={[
        {a: at(p, 'tanda bahaya', 0.9), node: <IconPill icon={<KIcon name="warning" size={60} />} text="Demam + tanda bahaya?" size={42} />},
        {a: at(p, 'jangan tunggu', 1.8), node: <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />},
        {a: at(p, 'dapatkan', 2.7), node: <IconPill icon={<KIcon name="hospital" size={60} />} text="Dapatkan rawatan segera" size={42} bg={C.green} color="#fff" />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, hana: HanaScene, main: Main, diagnosis: Diagnosis, lima: Lima,
  keadaan: Keadaan, bayi: Bayi, bahaya: Bahaya, limahari: LimaHari, rumah: Rumah,
  virus: Virus, pulih: Pulih, penutup: Penutup,
};

void NightSky;
