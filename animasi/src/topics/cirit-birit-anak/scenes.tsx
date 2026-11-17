import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Burst, C, Camera, Check, clamp, Closing, Cross, FiveIntro, Glow, IconPill, interpolate, KIcon, LEAF, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, Txt, useCurrentFrame, Who,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const AISYAH: AvatarPreset = {
  id: 'aisyah', skin: '#E6B892', skinShade: '#CC9C76', hair: 'short', hairColor: '#3A2418', top: 'tee', topColor: '#F29CBC', topShade: '#D97A9E',
  accessory: null,
};
export const IBU: AvatarPreset = {
  id: 'ibu-aisyah', skin: '#D49C74', skinShade: '#B9805A', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#2BB3A3', topShade: '#1F8A7E',
  hijabColor: '#F6C945', hijabShade: '#D9AA2A', accessory: null,
};

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

const Crossed: React.FC<{name: 'soda' | 'pill' | 'cup'; size: number; f: number}> = ({name, size, f}) => (
  <div style={{position: 'relative', width: size, height: size}}>
    <KIcon name={name} size={size} f={f} />
    <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={30} size={size} /></div>
  </div>
);

/** Jus: cawan oren. */
const Juice: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 120 120">
    <path d="M 26 20 L 94 20 L 86 110 L 34 110 Z" fill="rgba(255,255,255,.85)" />
    <path d="M 30 44 L 90 44 L 86 106 L 34 106 Z" fill="#F7A23B" />
    <rect x={70} y={2} width={8} height={50} rx={4} fill={C.labelPink} transform="rotate(15 74 26)" />
    <circle cx={30} cy={24} r={14} fill="#F7C23B" stroke="#fff" strokeWidth={4} />
  </svg>
);

/* ================= 0 — Hook ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aCir = at(p, 'ciritbirit', 0.3);
  const aMun = at(p, 'muntah', 0.9);
  const aBah = at(p, 'bahaya', 2.2);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={71} glow={f >= aBah ? RED : C.violet[2]} />
      <Glow x={540} y={1100} r={460} color={RED} opacity={f >= aBah ? 0.3 : 0.1} />
      <Pop at={aCir} style={{left: 60, top: 600}}><IconPill icon={<KIcon name="poop" size={60} />} text="Cirit-birit" size={44} /></Pop>
      <Pop at={aMun} style={{left: 600, top: 600}}><IconPill icon={<KIcon name="vomit" size={60} />} text="Muntah" size={44} /></Pop>
      <div style={{position: 'absolute', left: 340, top: 900}}><Who preset={AISYAH} bow="#E2457A" x={0} y={0} w={400} mood="sad" pose="down" seed={7} /></div>
      <Pop at={aBah} style={{left: 0, width: 1080, top: 1500, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="warning" size={60} />} text="Bila jadi bahaya?" size={56} bg={C.yellow} />
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Aisyah, 2 tahun; ibu beri minuman bergas & jus (SALAH) ================= */
export const Aisyah: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aCir = at(p, 'ciritbirit', 1.6);
  const aMun = at(p, 'muntah', 3.3);
  const aBer = at(p, 'bergas', 5.7);
  const aJus = at(p, 'jus', 6.4);
  const aKos = at(p, 'kosong', 8.5);
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: BG(C.violet[0], C.pink[0])}} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: '#C98C64'}} />
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Aisyah, 2 tahun" bg={C.navy} color={C.yellow} size={52} /></Pop>
      <Pop at={aCir} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="poop" size={56} />} text="Cirit-birit sejak pagi" size={38} /></Pop>
      <Pop at={aMun} style={{left: 60, top: 790}}><IconPill icon={<KIcon name="vomit" size={56} />} text="Muntah 2 kali" size={38} /></Pop>
      <Who preset={IBU} x={40} y={940} w={460} mood="neutral" pose="point" seed={8} />
      <div style={{position: 'absolute', left: 300, top: 1170}}><Who preset={AISYAH} bow="#E2457A" x={0} y={0} w={240} mood="sad" pose="down" seed={7} /></div>
      <Pop at={aBer} style={{left: 600, top: 900}}><KIcon name="soda" size={200} f={f} /></Pop>
      <Pop at={aJus} style={{left: 810, top: 920}}><Juice size={180} /></Pop>
      {f >= aKos ? <div style={{position: 'absolute', left: 640, top: 900}}><Cross f={f - aKos} size={320} /></div> : null}
      <Pop at={aKos + 6} style={{left: 560, top: 1240}}><Pill text="SALAH! Jangan beri" bg={RED} size={38} /></Pop>
    </Camera>
  );
};

/* ================= 2 — Malam: tanda dehidrasi ================= */
export const Malam: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const items = [
    {a: at(p, 'lemah', 1.4), icon: <KIcon name="zzz" size={60} f={f} />, t: 'Lemah'},
    {a: at(p, 'cengkung', 2.5), icon: <MIcon name="eye" size={60} f={f} />, t: 'Mata cengkung'},
    {a: at(p, 'mulutnya', 3.6), icon: <KIcon name="mouth" size={60} />, t: 'Mulut kering'},
    {a: at(p, 'lampinnya', 4.8), icon: <KIcon name="diaper" size={60} />, t: 'Lampin kering sejak tengah hari'},
  ];
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: BG(C.night[1], '#5A1F3A')}} />
      <NightSky seed={23} top="transparent" bottom="transparent" stars={40} glow={RED} />
      {items.map((it, i) => (
        <Pop key={i} at={it.a} style={{left: 60, top: 560 + i * 115}} origin="left center">
          <IconPill icon={it.icon} text={it.t} size={38} bg={i === 3 ? RED : '#fff'} color={i === 3 ? '#fff' : C.navy} />
        </Pop>
      ))}
      <Who preset={IBU} x={480} y={1000} w={460} mood="shock" pose="clasp" seed={8} />
      <div style={{position: 'absolute', left: 140, top: 1160}}><Who preset={AISYAH} bow="#E2457A" x={0} y={0} w={280} mood="tired" pose="down" seed={7} /></div>
    </Camera>
  );
};

/* ================= 3 — Diagnosis: DEHIDRASI ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aStamp = at(p, 'dehidrasi', 2.6);
  const aUsus = at(p, 'usus', 6.0);
  const level = interpolate(f, [0, aStamp + 20], [1, 0.25], clamp);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: BG(C.night[3], C.violet[2])}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      <div style={{position: 'absolute', left: 820, top: 900, width: 160, height: 260, borderRadius: 30, border: '8px solid #fff', overflow: 'hidden', background: 'rgba(255,255,255,.1)'}}>
        <div style={{position: 'absolute', left: 0, bottom: 0, width: '100%', height: `${level * 100}%`, background: '#7CC6F2'}} />
      </div>
      <Who preset={p.preset} x={20} y={1040} w={460} mood="neutral" pose={f < aStamp ? 'chin' : 'point'} />
      <div style={{position: 'absolute', left: 480, top: 1180}}><Who preset={AISYAH} bow="#E2457A" x={0} y={0} w={280} mood="tired" pose="down" seed={7} /></div>
      <Stamp f={f} a={aStamp} top="DIAGNOSIS" big="DEHIDRASI" sub="Kekurangan air" bigSize={130} y={540} />
      <Pop at={aUsus} style={{left: 0, width: 1080, top: 900, display: 'flex', justifyContent: 'flex-start', paddingLeft: 60}}>
        <IconPill icon={<KIcon name="virus" size={56} f={f} />} text="Jangkitan usus" size={40} />
      </Pop>
    </Camera>
  );
};

/* ================= 4 — Kebanyakan sembuh sendiri + 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <FiveIntro
      p={p}
      aFive={at(p, 'lima perkara', 5.5)}
      sub="perkara ibu bapa perlu tahu"
      glow={C.pink[0]}
      head={
        <>
          <Pop at={at(p, 'sembuh', 1.4)} style={{left: 0, width: 1080, top: 560, display: 'flex', justifyContent: 'center'}}>
            <IconPill icon={<Check size={52} />} text="Kebanyakan sembuh sendiri" size={42} />
          </Pop>
          <Pop at={at(p, 'kekurangan', 2.9)} style={{left: 0, width: 1080, top: 690, display: 'flex', justifyContent: 'center'}}>
            <IconPill icon={<KIcon name="drop" size={56} f={f} />} text="Kekurangan air = bahaya" size={42} bg={RED} color="#fff" />
          </Pop>
        </>
      }
    />
  );
};

/* ================= 5–9 — #1–#5 ================= */
export const Ors: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="BERI ORS"
      titleSize={110}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<div style={{display: 'flex', alignItems: 'flex-end', gap: 10}}><KIcon name="sachet" size={200} /><KIcon name="cup" size={150} /></div>}
      items={[
        {a: at(p, 'larutan', 0.8), icon: <KIcon name="sachet" size={76} />, text: 'Larutan garam rehidrasi oral', size: 34, bg: C.green},
        {a: at(p, 'sedikitsedikit', 4.0), icon: <KIcon name="clock" size={76} f={f} />, text: 'Sedikit-sedikit tapi kerap', size: 36},
        {a: at(p, 'sudu', 5.9), icon: <KIcon name="spoon" size={76} />, text: 'Guna sudu atau cawan'},
      ]}
      mood="happy"
    />
  );
};

export const Susu: React.FC<SceneProps> = (p) => (
  <PointScene
    p={p}
    title="TERUSKAN SUSU & MAKANAN"
    titleSize={64}
    bg={BG(C.night[1], '#1F4A4A')}
    glow={C.green}
    hero={<KIcon name="bowl" size={260} />}
    items={[
      {a: at(p, 'susu', 1.0), icon: <KIcon name="baby" size={76} />, text: 'Teruskan susu ibu', bg: C.green},
      {a: at(p, 'makanan', 1.7), icon: <KIcon name="bowl" size={76} />, text: 'Makanan biasa'},
      {a: at(p, 'berlapar', 3.8), icon: <Check size={70} />, text: 'Jangan biarkan berlapar', size: 38},
    ]}
    mood="happy"
  />
);

export const Elak: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="ELAKKAN"
      titleSize={110}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<div style={{display: 'flex'}}><Crossed name="soda" size={180} f={f} /><div style={{position: 'relative', width: 160, height: 160, marginTop: 20}}><Juice size={160} /><div style={{position: 'absolute', left: 0, top: 0}}><Cross f={30} size={160} /></div></div></div>}
      items={[
        {a: at(p, 'bergas', 1.2), icon: <KIcon name="soda" size={76} f={f} />, text: 'Minuman bergas', bg: RED},
        {a: at(p, 'jus', 2.0), icon: <Juice size={76} />, text: 'Jus manis', bg: RED},
        {a: at(p, 'memburukkan', 3.5), icon: <KIcon name="poop" size={76} />, text: 'Boleh burukkan cirit-birit', size: 36},
      ]}
    />
  );
};

export const Ubat: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="JANGAN UBAT CIRIT-BIRIT"
      titleSize={70}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<Crossed name="pill" size={240} f={f} />}
      items={[
        {a: at(p, 'ubat', 0.8), icon: <KIcon name="pill" size={76} />, text: 'Bukan untuk kanak-kanak', bg: RED},
        {a: at(p, 'nasihat', 3.6), icon: <KIcon name="talk" size={76} f={f} />, text: 'Tanya doktor dahulu'},
      ]}
    />
  );
};

export const Bahaya: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="SEGERA DAPATKAN RAWATAN"
      titleSize={66}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      grid
      items={[
        {a: at(p, 'lemah', 2.6), icon: <KIcon name="zzz" size={90} f={f} />, text: 'Sangat lemah / mengantuk', bg: RED, size: 28},
        {a: at(p, 'minum', 4.2), icon: <KIcon name="nocup" size={90} />, text: 'Tak mahu minum', size: 30},
        {a: at(p, 'berterusan', 5.3), icon: <KIcon name="vomit" size={90} />, text: 'Muntah berterusan', bg: RED, size: 30},
        {a: at(p, 'najis', 6.2), icon: <KIcon name="poop" size={90} />, text: 'Najis berdarah', size: 30},
        {a: at(p, 'kurang', 7.4), icon: <KIcon name="diaper" size={90} />, text: 'Kurang kencing', bg: RED, size: 30},
      ]}
    />
  );
};

/* ================= 10 — Pulih + cuci tangan ================= */
export const Cuci: React.FC<SceneProps> = (p) => (
  <PointScene
    p={p}
    title="CUCI TANGAN DENGAN SABUN"
    titleSize={64}
    bg={BG(C.night[1], '#1F4A4A')}
    glow={C.green}
    hero={<KIcon name="soap" size={260} f={useCurrentFrame()} />}
    items={[
      {a: at(p, 'pulih', 1.8), icon: <Check size={70} />, text: 'Pulih dalam beberapa hari', bg: C.green, size: 36},
      {a: at(p, 'lampin', 5.2), icon: <KIcon name="diaper" size={76} />, text: 'Selepas tukar lampin'},
      {a: at(p, 'menyediakan', 6.6), icon: <KIcon name="bowl" size={76} />, text: 'Sebelum sediakan makanan', size: 36},
    ]}
    mood="happy"
  />
);

/* ================= 11 — Aisyah ceria ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aCer = at(p, 'ceria', 2.4);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG('#7FC4F2', '#F6D6A8')}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: LEAF}} />
      <Pop at={0} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="sachet" size={56} />} text="Rawatan cecair" size={44} /></Pop>
      <Pop at={aCer} style={{left: 60, top: 680}}><Pill text="Ceria selepas 2 hari!" bg={C.green} size={52} /></Pop>
      <Who preset={IBU} x={560} y={940} w={440} mood="happy" pose="clasp" seed={8} />
      <div style={{position: 'absolute', left: 140, top: 1120 - (f >= aCer ? Math.abs(Math.sin(f / 5)) * 40 : 0)}}>
        <Who preset={AISYAH} bow="#E2457A" x={0} y={0} w={300} mood="happy" pose="wave" seed={7} />
      </div>
      <div style={{position: 'absolute', left: 420 + Math.sin(f / 7) * 60, top: 1300 - Math.abs(Math.sin(f / 5)) * 120}}><KIcon name="ball" size={100} f={f} /></div>
      <Burst f={f} a={aCer} x={300} y={1150} />
    </Camera>
  );
};

/* ================= 12 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Closing
      p={p}
      aSaya={at(p, 'saya doktor', 4.0)}
      lines={[
        {a: at(p, 'anak', 0.1), node: <IconPill icon={<KIcon name="drop" size={60} f={f} />} text="Anak cirit-birit & lemah?" size={42} />},
        {a: at(p, 'jangan tunggu', 1.4), node: <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />},
        {a: at(p, 'dapatkan', 2.4), node: <IconPill icon={<KIcon name="hospital" size={64} />} text="Dapatkan rawatan segera" size={44} bg={C.green} color="#fff" />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, aisyah: Aisyah, malam: Malam, diagnosis: Diagnosis, lima: Lima,
  ors: Ors, susu: Susu, elak: Elak, ubat: Ubat, bahaya: Bahaya,
  cuci: Cuci, pulih: Pulih, penutup: Penutup,
};

void Txt;
