import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Burst, C, Camera, Check, clamp, Closing, Cross, FiveIntro, Glow, IconPill, interpolate, KIcon, LEAF, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, useCurrentFrame, Who,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const IBU: AvatarPreset = {
  id: 'ibu-danish', skin: '#E0AE88', skinShade: '#C69270', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#6157C5', topShade: '#4B3C9B',
  hijabColor: '#F29CBC', hijabShade: '#D97A9E', accessory: null,
};
export const NENEK: AvatarPreset = {
  id: 'nenek-danish', skin: '#C9926A', skinShade: '#AD774F', hair: 'hijab', hairColor: '#6E6A78', top: 'kurung', topColor: '#7FA36B', topShade: '#5E8450',
  hijabColor: '#F3F0E8', hijabShade: '#D6D1C4', accessory: 'glasses-round',
};

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;
const SKIN_B = '#EDBFA6';
const JAUN = '#F2CF3A';

/**
 * Bayi baru lahir (berbaring, menghadap penonton). `level` 0–3: 1 = muka, 2 = badan & tangan, 3 = kaki.
 * `sleepy` = mata tertutup.
 */
export const Newborn: React.FC<{w: number; level?: number; sleepy?: boolean; f?: number; mood?: 'happy' | 'sad'}> = ({w, level = 0, sleepy = true, f = 0, mood = 'sad'}) => {
  const c = (n: number) => (level >= n ? JAUN : SKIN_B);
  const breathe = 1 + 0.015 * Math.sin(f / 6);
  return (
    <svg width={w} height={w * 1.3} viewBox="0 0 200 260" style={{overflow: 'visible'}}>
      <g transform={`translate(100 130) scale(${breathe}) translate(-100 -130)`}>
        {/* kaki */}
        <rect x={70} y={180} width={26} height={62} rx={13} fill={c(3)} />
        <rect x={104} y={180} width={26} height={62} rx={13} fill={c(3)} />
        {/* badan */}
        <rect x={56} y={94} width={88} height={96} rx={34} fill={c(2)} />
        <path d="M 58 160 L 142 160 L 136 196 Q 100 214 64 196 Z" fill="#fff" />
        {/* tangan */}
        <rect x={28} y={104} width={30} height={64} rx={15} fill={c(2)} transform="rotate(14 43 104)" />
        <rect x={142} y={104} width={30} height={64} rx={15} fill={c(2)} transform="rotate(-14 157 104)" />
        {/* kepala */}
        <circle cx={100} cy={58} r={46} fill={c(1)} />
        <path d="M 70 26 Q 100 6 130 26" stroke="#3A2418" strokeWidth={6} fill="none" strokeLinecap="round" />
        {sleepy ? (
          <>
            <path d="M 78 60 Q 86 66 94 60" stroke="#3A2418" strokeWidth={4} fill="none" strokeLinecap="round" />
            <path d="M 106 60 Q 114 66 122 60" stroke="#3A2418" strokeWidth={4} fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx={86} cy={58} r={6} fill="#3A2418" /><circle cx={114} cy={58} r={6} fill="#3A2418" />
          </>
        )}
        <path d={mood === 'happy' ? 'M 90 78 Q 100 88 110 78' : 'M 92 82 Q 100 78 108 82'} stroke="#8C3A3A" strokeWidth={4} fill="none" strokeLinecap="round" />
        <circle cx={76} cy={74} r={7} fill="#F29CBC" opacity={0.5} /><circle cx={124} cy={74} r={7} fill="#F29CBC" opacity={0.5} />
      </g>
    </svg>
  );
};

/* ================= 0 — Hook ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKun = at(p, 'kuning', 1.3);
  const aNor = at(p, 'normal', 2.2);
  const aBah = at(p, 'bahaya', 3.3);
  const lvl = interpolate(f, [aKun, aKun + 20], [0, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={161} glow={C.yellow} />
      <Glow x={540} y={1080} r={460} color={C.yellow} opacity={0.18} />
      <div style={{position: 'absolute', left: 340, top: 860}}><Newborn w={400} level={lvl >= 1 ? 1 : 0} f={f} /></div>
      <Pop at={aNor} style={{left: 60, top: 600}}><IconPill icon={<Check size={52} />} text="Normal?" size={48} /></Pop>
      <Pop at={aBah} style={{left: 600, top: 600}}><IconPill icon={<KIcon name="warning" size={56} />} text="Bahaya?" size={48} bg={RED} color="#fff" /></Pop>
      <Pop at={aBah + 10} style={{left: 0, width: 1080, top: 1500, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Bayi kuning: bila perlu risau?" bg={C.yellow} color={C.navy} size={50} />
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Danish, 4 hari; nenek: jemur bawah matahari (SALAH) ================= */
export const Danish: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKun = at(p, 'kuning', 2.6);
  const aJem = at(p, 'jemur', 4.6);
  const aPagi = at(p, 'pagi', 6.0);
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: BG(C.violet[0], C.pink[0])}} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: '#C98C64'}} />
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Bayi Danish, 4 hari" bg={C.navy} color={C.yellow} size={50} /></Pop>
      <Pop at={aKun} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="warning" size={52} />} text="Semakin kuning" size={40} /></Pop>
      <Who preset={IBU} x={20} y={940} w={430} mood="sad" pose="clasp" seed={10} />
      <div style={{position: 'absolute', left: 300, top: 1150}}><Newborn w={200} level={1} f={f} /></div>
      <Who preset={NENEK} x={580} y={960} w={420} mood="happy" pose="point" seed={11} />
      <Pop at={aJem} style={{left: 700, top: 640}}><KIcon name="sun" size={200} f={f} /></Pop>
      {f >= aPagi + 10 ? <div style={{position: 'absolute', left: 690, top: 630}}><Cross f={f - aPagi - 10} size={220} /></div> : null}
      <Pop at={aPagi + 14} style={{left: 560, top: 870}}><Pill text="SALAH! Jangan jemur" bg={RED} size={40} /></Pop>
    </Camera>
  );
};

/* ================= 2 — Hari kelima: kuning ke kaki, asyik tidur, tak menyusu ================= */
export const Hari5: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKaki = at(p, 'kaki', 2.2);
  const aTidur = at(p, 'tidur', 3.7);
  const aSusu = at(p, 'menyusu', 4.7);
  const lvl = f >= aKaki ? 3 : 2;
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: BG(C.night[1], '#5A1F3A')}} />
      <NightSky seed={37} top="transparent" bottom="transparent" stars={40} glow={RED} />
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Hari kelima" bg={C.navy} color={C.yellow} size={50} /></Pop>
      <Pop at={aKaki} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="warning" size={52} />} text="Kuning sampai ke kaki" size={38} bg={RED} color="#fff" /></Pop>
      <Pop at={aTidur} style={{left: 60, top: 790}}><IconPill icon={<KIcon name="zzz" size={52} f={f} />} text="Asyik tidur" size={38} /></Pop>
      <Pop at={aSusu} style={{left: 500, top: 790}}><IconPill icon={<KIcon name="nocup" size={52} />} text="Tak mahu menyusu" size={38} /></Pop>
      <div style={{position: 'absolute', left: 120, top: 960}}><Newborn w={340} level={lvl} f={f} /></div>
      <Who preset={IBU} x={560} y={1000} w={440} mood="shock" pose="clasp" seed={10} />
    </Camera>
  );
};

/* ================= 3 — Diagnosis: JAUNDIS BAYI → fototerapi ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aBil = at(p, 'bilirubin', 1.0);
  const aStamp = at(p, 'jaundis', 3.9);
  const aFoto = at(p, 'fototerapi', 6.0);
  const before = f < aStamp;
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: BG(C.night[3], C.violet[2])}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      {before ? <Pop at={aBil} style={{left: 0, width: 1080, top: 720, display: 'flex', justifyContent: 'center'}}><IconPill icon={<KIcon name="drop" size={56} />} text="Paras bilirubin" size={44} /></Pop> : null}
      <Who preset={p.preset} x={20} y={1040} w={460} mood="neutral" pose={before ? 'chin' : 'point'} />
      <div style={{position: 'absolute', left: 640, top: 1040}}><KIcon name="photolamp" size={340} f={f} /></div>
      <div style={{position: 'absolute', left: 740, top: 1150}}><Newborn w={150} level={3} f={f} /></div>
      <Stamp f={f} a={aStamp} top="DIAGNOSIS" big="JAUNDIS BAYI" sub={f >= aFoto ? 'Rawatan: fototerapi' : undefined} bigSize={110} y={560} />
    </Camera>
  );
};

/* ================= 4 — Kebanyakan tidak bahaya + 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => (
  <FiveIntro
    p={p}
    aFive={at(p, 'lima perkara', 4.7)}
    sub="perkara ibu bapa perlu tahu"
    glow={C.yellow}
    head={
      <>
        <Pop at={at(p, 'berbahaya', 1.2)} style={{left: 0, width: 1080, top: 560, display: 'flex', justifyContent: 'center'}}>
          <IconPill icon={<Check size={52} />} text="Kebanyakannya tidak berbahaya" size={40} />
        </Pop>
        <Pop at={at(p, 'segera', 3.6)} style={{left: 0, width: 1080, top: 690, display: 'flex', justifyContent: 'center'}}>
          <IconPill icon={<KIcon name="warning" size={56} />} text="Ada yang perlu rawatan segera" size={40} bg={RED} color="#fff" />
        </Pop>
      </>
    }
  />
);

/* ================= 5–9 — #1–#5 ================= */
export const Awal: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="KUNING DALAM 24 JAM"
      titleSize={74}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<KIcon name="clock" size={260} f={f} />}
      items={[
        {a: at(p, 'pertama', 1.3), icon: <KIcon name="baby" size={76} />, text: '24 jam pertama selepas lahir', size: 34},
        {a: at(p, 'normal', 3.0), icon: <KIcon name="warning" size={76} />, text: 'Tidak normal', bg: RED},
        {a: at(p, 'segera', 3.8), icon: <KIcon name="hospital" size={76} />, text: 'Segera jumpa doktor', bg: C.green},
      ]}
    />
  );
};

export const Lihat: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aMuka = at(p, 'muka', 3.0);
  const aPerut = at(p, 'perut', 3.9);
  const aKaki = at(p, 'kaki', 5.1);
  const lvl = f >= aKaki ? 3 : f >= aPerut ? 2 : f >= aMuka ? 1 : 0;
  return (
    <PointScene
      p={p}
      title="LIHAT DI MANA KUNING"
      titleSize={72}
      bg={BG(C.night[1], C.violet[0])}
      hero={<Newborn w={230} level={lvl} f={f} />}
      items={[
        {a: aMuka, icon: <KIcon name="person" size={76} />, text: 'Muka'},
        {a: aPerut, icon: <KIcon name="stomach" size={76} />, text: 'Perut & tangan'},
        {a: aKaki, icon: <KIcon name="sole" size={76} />, text: 'Kaki = paras tinggi', bg: RED},
      ]}
    />
  );
};

export const Bahaya: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="TANDA BAHAYA"
      titleSize={92}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      grid
      items={[
        {a: at(p, 'mengantuk', 2.2), icon: <KIcon name="zzz" size={90} f={f} />, text: 'Terlalu mengantuk', bg: RED, size: 28},
        {a: at(p, 'menyusu', 3.5), icon: <KIcon name="nocup" size={90} />, text: 'Tak mahu menyusu', size: 28},
        {a: at(p, 'nyaring', 4.6), icon: <KIcon name="baby" size={90} />, text: 'Menangis nyaring', bg: RED, size: 28},
        {a: at(p, 'kejang', 5.6), icon: <KIcon name="bolt" size={90} f={f} />, text: 'Kejang / melengkung', size: 28},
      ]}
    />
  );
};

export const Jemur: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="JANGAN JEMUR BAYI"
      titleSize={78}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<div style={{position: 'relative', width: 240, height: 240}}><KIcon name="sun" size={240} f={f} /><div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f} size={240} /></div></div>}
      items={[
        {a: at(p, 'terlecur', 3.6), icon: <KIcon name="warning" size={76} />, text: 'Boleh terlecur / kepanasan', bg: RED, size: 34},
        {a: at(p, 'tertangguh', 6.0), icon: <KIcon name="hourglass" size={76} f={f} />, text: 'Rawatan tertangguh'},
        {a: at(p, 'fototerapi', 8.2), icon: <KIcon name="photolamp" size={76} f={f} />, text: 'Rawatan betul: fototerapi', bg: C.green, size: 34},
      ]}
    />
  );
};

export const Lama: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="PERLU DIPERIKSA"
      titleSize={86}
      bg={BG(C.night[1], C.violet[1])}
      hero={<KIcon name="calendar" size={240} />}
      items={[
        {a: at(p, 'minggu', 1.3), icon: <KIcon name="calendar" size={76} />, text: 'Kuning > 2 minggu'},
        {a: at(p, 'najis', 2.3), icon: <KIcon name="diaper" size={76} />, text: 'Najis pucat', bg: RED},
        {a: at(p, 'gelap', 3.8), icon: <KIcon name="urine" size={76} />, text: 'Air kencing gelap', bg: RED},
      ]}
    />
  );
};

/* ================= 10 — Susukan kerap, pemeriksaan ================= */
export const Susu: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="SUSUKAN KERAP"
      titleSize={92}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<KIcon name="baby" size={260} />}
      items={[
        {a: at(p, 'susukan', 0.2), icon: <KIcon name="bottle" size={76} />, text: 'Susukan bayi dengan kerap', bg: C.green, size: 34},
        {a: at(p, 'pemeriksaan', 2.0), icon: <KIcon name="calendar" size={76} />, text: 'Hadir pemeriksaan bayi', size: 36},
        {a: at(p, 'pulih', 5.7), icon: <Check size={70} />, text: 'Kebanyakan pulih sepenuhnya', bg: C.green, size: 32},
      ]}
      mood="happy"
    />
  );
};

/* ================= 11 — Danish pulih ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKuat = at(p, 'kuat', 3.4);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG('#7FC4F2', '#F6D6A8')}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: LEAF}} />
      <Pop at={0} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="photolamp" size={56} f={f} />} text="2 hari fototerapi" size={44} /></Pop>
      <Pop at={aKuat} style={{left: 60, top: 680}}><Pill text="Menyusu dengan kuat!" bg={C.green} size={52} /></Pop>
      <Who preset={IBU} x={480} y={940} w={480} mood="happy" pose="clasp" seed={10} />
      <div style={{position: 'absolute', left: 160, top: 1080}}><Newborn w={280} level={0} sleepy={false} mood="happy" f={f} /></div>
      <Burst f={f} a={aKuat} x={300} y={1120} />
    </Camera>
  );
};

/* ================= 12 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Closing
      p={p}
      aSaya={at(p, 'saya doktor', 3.7)}
      lines={[
        {a: at(p, 'bayi', 0.1), node: <IconPill icon={<KIcon name="baby" size={60} />} text="Bayi kuning & lemah?" size={44} />},
        {a: at(p, 'jangan tunggu', 1.3), node: <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />},
        {a: at(p, 'dapatkan', 2.3), node: <IconPill icon={<KIcon name="hospital" size={64} />} text="Dapatkan rawatan segera" size={44} bg={C.green} color="#fff" />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, danish: Danish, hari5: Hari5, diagnosis: Diagnosis, lima: Lima,
  awal: Awal, lihat: Lihat, bahaya: Bahaya, jemur: Jemur, lama: Lama,
  susu: Susu, pulih: Pulih, penutup: Penutup,
};

void MIcon;
