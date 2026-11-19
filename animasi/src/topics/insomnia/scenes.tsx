import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Burst, C, Camera, Check, clamp, Closing, Cross, FiveIntro, Glow, IconPill, interpolate, KIcon, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, Txt, useCurrentFrame, Who,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const HAFIZ: AvatarPreset = {
  id: 'hafiz', skin: '#C9926A', skinShade: '#AD774F', hair: 'side-part', hairColor: '#1E1A24', top: 'shirt', topColor: '#4F79C7', topShade: '#3A5FA0',
  accessory: null,
};

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/** Jam digital yang berganti waktu malam. */
const Digital: React.FC<{f: number; from: number; size?: number}> = ({f, from, size = 64}) => {
  const mins = from + Math.floor(f / 4) * 7;
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return (
    <div style={{background: '#14112B', border: '4px solid #3A3460', borderRadius: 18, padding: '6px 22px'}}>
      <Txt size={size} color="#FF5C7A" style={{letterSpacing: 4}}>{`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`}</Txt>
    </div>
  );
};

/** Katil dengan Hafiz berbaring (separuh badan) dan mata terbuka. */
const Bed: React.FC<{f: number; x: number; y: number; w: number; awake?: boolean}> = ({f, x, y, w, awake = true}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: w * 0.62}}>
    <div style={{position: 'absolute', left: w * 0.08, top: -w * 0.08, transform: `rotate(-8deg)`}}>
      <Who preset={HAFIZ} x={0} y={0} w={w * 0.5} mood={awake ? 'tired' : 'happy'} pose="down" seed={9} />
    </div>
    <div style={{position: 'absolute', left: 0, top: w * 0.36, width: w, height: w * 0.2, background: '#6157C5', borderRadius: 24}} />
    <div style={{position: 'absolute', left: w * 0.06, top: w * 0.33, width: w * 0.94, height: w * 0.2, background: '#8DB8E8', borderRadius: 20}} />
    <div style={{position: 'absolute', left: -10, top: w * 0.05, width: 26, height: w * 0.52, background: '#3A3460', borderRadius: 10}} />
    {!awake ? <div style={{position: 'absolute', left: w * 0.55, top: -w * 0.05}}><KIcon name="zzz" size={w * 0.25} f={f} /></div> : null}
  </div>
);

/* ================= 0 — Hook: berjam-jam di katil, mata segar ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aJam = at(p, 'berjamjam', 1.0);
  const aSegar = at(p, 'segar', 3.6);
  const aAnda = at(p, 'adakah', 4.7);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={151} glow={C.violet[3]} />
      <div style={{position: 'absolute', left: 760, top: 560}}><KIcon name="moon" size={220} f={f} /></div>
      <Pop at={aJam} style={{left: 60, top: 600}}><Digital f={f - aJam} from={23 * 60 + 10} size={80} /></Pop>
      <Bed f={f} x={180} y={960} w={720} />
      <Pop at={aSegar} style={{left: 60, top: 760}}><IconPill icon={<MIcon name="eye" size={56} f={f} />} text="Mata tetap segar" size={44} bg={RED} color="#fff" /></Pop>
      <Pop at={aAnda} style={{left: 0, width: 1080, top: 1500, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Anda juga begini?" bg={C.yellow} color={C.navy} size={60} />
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Hafiz: sukar tidur, terjaga, bangun awal; kopi + telefon ================= */
export const Hafiz: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const list = [
    {a: at(p, 'sukar', 3.9), t: 'Sukar tidur', i: <KIcon name="bed" size={52} />},
    {a: at(p, 'terjaga', 5.1), t: 'Kerap terjaga', i: <MIcon name="eye" size={52} f={f} />},
    {a: at(p, 'bangun', 6.1), t: 'Bangun terlalu awal', i: <KIcon name="clock" size={52} f={f} />},
  ];
  const aKopi = at(p, 'kopi', 8.9);
  const aTel = at(p, 'telefon', 9.8);
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: BG(C.night[1], C.violet[1])}} />
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Hafiz, 38 tahun, penyelia kilang" bg={C.navy} color={C.yellow} size={42} /></Pop>
      {list.map((l, i) => <Pop key={i} at={l.a} style={{left: 60, top: 670 + i * 105}} origin="left center"><IconPill icon={l.i} text={l.t} size={36} /></Pop>)}
      <Bed f={f} x={60} y={1060} w={620} />
      <Pop at={aKopi} style={{left: 720, top: 800}}><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><KIcon name="coffee" size={180} f={f} /><Pill text="Kopi" bg={RED} size={34} /></div></Pop>
      <Pop at={aTel} style={{left: 760, top: 1120}}><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><KIcon name="phone" size={170} f={f} /><Pill text="Telefon di katil" bg={RED} size={32} /></div></Pop>
    </Camera>
  );
};

/* ================= 2 — 4 bulan: letih, marah, hampir terlelap memandu ================= */
export const Letih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aMandu = at(p, 'terlelap', 4.8);
  const items = [
    {a: at(p, 'letih', 2.6), t: 'Letih', i: <KIcon name="zzz" size={56} f={f} />},
    {a: at(p, 'marah', 3.6), t: 'Cepat marah', i: <KIcon name="bolt" size={56} f={f} />},
  ];
  const nod = f >= aMandu ? Math.max(0, Math.sin((f - aMandu) / 8)) * 14 : 0;
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: BG('#7FC4F2', '#F6D6A8')}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: '#55516A'}} />
      {[0, 1, 2, 3].map((i) => <div key={i} style={{position: 'absolute', left: ((i * 300 - f * 8) % 1200 + 1200) % 1200 - 120, top: 1640, width: 140, height: 18, background: '#fff', borderRadius: 9}} />)}
      <Pop at={0} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="calendar" size={56} />} text="Sudah 4 bulan" size={42} /></Pop>
      {items.map((it, i) => <Pop key={i} at={it.a} style={{left: 60 + i * 300, top: 680}}><IconPill icon={it.i} text={it.t} size={38} bg={C.navy} color="#fff" /></Pop>)}
      <div style={{position: 'absolute', left: 300, top: 1000, transform: `rotate(${nod}deg)`}}><Who preset={HAFIZ} x={0} y={0} w={420} mood="tired" pose="down" seed={9} /></div>
      <div style={{position: 'absolute', left: 200, top: 1220}}><KIcon name="car" size={620} /></div>
      <Pop at={aMandu} style={{left: 0, width: 1080, top: 820, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="warning" size={56} />} text="Hampir terlelap semasa memandu!" size={38} bg={RED} color="#fff" />
      </Pop>
    </Camera>
  );
};

/* ================= 3 — Diagnosis ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aStamp = at(p, 'insomnia', 3.1);
  const before = f < aStamp;
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: BG(C.night[3], C.violet[2])}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      {before ? <Pop at={2} style={{left: 0, width: 1080, top: 720, display: 'flex', justifyContent: 'center'}}><IconPill icon={<KIcon name="checklist" size={56} />} text="Penilaian tidur" size={44} /></Pop> : null}
      <Who preset={p.preset} x={20} y={1040} w={460} mood="neutral" pose={before ? 'chin' : 'point'} />
      <Who preset={HAFIZ} x={600} y={1060} w={420} mood={before ? 'tired' : 'sad'} pose="clasp" seed={9} />
      <Stamp f={f} a={aStamp} top="DIAGNOSIS" big="INSOMNIA" sub="Kronik" bigSize={110} y={580} />
    </Camera>
  );
};

/* ================= 4 — Boleh dirawat + 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => (
  <FiveIntro
    p={p}
    aFive={at(p, 'lima perkara', 1.9)}
    sub="perkara perlu anda tahu"
    glow={C.green}
    head={
      <Pop at={0} style={{left: 0, width: 1080, top: 580, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<Check size={52} />} text="Insomnia boleh dirawat" size={46} />
      </Pop>
    }
  />
);

/* ================= 5–9 — #1–#5 ================= */
export const Kenali: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="KENALI INSOMNIA"
      titleSize={84}
      bg={BG(C.night[1], C.violet[0])}
      hero={<KIcon name="moon" size={260} f={f} />}
      items={[
        {a: at(p, 'sukar', 2.1), icon: <KIcon name="bed" size={76} />, text: 'Sukar tidur / kerap terjaga', size: 34},
        {a: at(p, 'bangun', 4.3), icon: <KIcon name="clock" size={76} f={f} />, text: 'Bangun terlalu awal'},
        {a: at(p, 'tiga', 6.5), icon: <KIcon name="calendar" size={76} />, text: '≥ 3 malam seminggu, 3 bulan', bg: RED, size: 32},
      ]}
    />
  );
};

export const Waktu: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="TETAPKAN WAKTU"
      titleSize={86}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<KIcon name="clock" size={260} f={f} />}
      items={[
        {a: at(p, 'tidur', 2.0), icon: <KIcon name="bed" size={76} />, text: 'Tidur waktu sama', bg: C.green},
        {a: at(p, 'bangun', 2.5), icon: <KIcon name="clock" size={76} f={f} />, text: 'Bangun waktu sama', bg: C.green},
        {a: at(p, 'hujung', 5.4), icon: <KIcon name="calendar" size={76} />, text: 'Termasuk hujung minggu', size: 38},
      ]}
      mood="happy"
    />
  );
};

export const Bilik: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="JAGA BILIK TIDUR"
      titleSize={84}
      bg={BG('#0F0C2E', C.night[3])}
      grid
      items={[
        {a: at(p, 'gelap', 2.1), icon: <KIcon name="moon" size={90} f={f} />, text: 'Gelap'},
        {a: at(p, 'senyap', 2.8), icon: <KIcon name="bell" size={90} f={0} />, text: 'Senyap'},
        {a: at(p, 'sejuk', 3.6), icon: <KIcon name="drop" size={90} />, text: 'Sejuk'},
        {a: at(p, 'jauhkan', 4.3), icon: <div style={{position: 'relative'}}><KIcon name="phone" size={90} f={f} /><div style={{position: 'absolute', left: 0, top: 0}}><Cross f={30} size={90} /></div></div>, text: 'Tiada telefon sejam sebelum tidur', bg: RED, size: 22},
      ]}
      mood="happy"
    />
  );
};

export const Elak: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="ELAKKAN"
      titleSize={110}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      grid
      items={[
        {a: at(p, 'kafein', 1.1), icon: <KIcon name="coffee" size={90} f={f} />, text: 'Kafein', bg: RED},
        {a: at(p, 'rokok', 1.8), icon: <KIcon name="cigarette" size={90} f={f} />, text: 'Rokok', bg: RED},
        {a: at(p, 'berat', 2.7), icon: <KIcon name="burger" size={90} />, text: 'Makan berat waktu malam', bg: RED, size: 26},
        {a: at(p, 'dua', 5.2), icon: <KIcon name="clock" size={90} f={f} />, text: '20 minit tak lena? Bangun', size: 26},
        {a: at(p, 'tenang', 7.9), icon: <KIcon name="smile" size={90} />, text: 'Buat aktiviti tenang', bg: C.green, size: 28},
      ]}
    />
  );
};

export const Rawat: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="RAWATAN UTAMA"
      titleSize={86}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<KIcon name="talk" size={260} f={f} />}
      items={[
        {a: at(p, 'terapi', 0.6), icon: <KIcon name="talk" size={76} f={f} />, text: 'Terapi CBT untuk insomnia', bg: C.green, size: 34},
        {a: at(p, 'ubat', 4.5), icon: <KIcon name="pill" size={76} />, text: 'Ubat tidur: jangka pendek', size: 36},
        {a: at(p, 'preskripsi', 6.9), icon: <KIcon name="checklist" size={76} />, text: 'Dengan preskripsi doktor', size: 36},
      ]}
      mood="happy"
    />
  );
};

/* ================= 10 — Punca lain ================= */
export const Punca: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="CARI PUNCANYA"
      titleSize={88}
      bg={BG(C.night[1], C.violet[1])}
      hero={<MIcon name="search" size={260} f={f} />}
      items={[
        {a: at(p, 'kemurungan', 1.5), icon: <KIcon name="heartbreak" size={76} f={f} />, text: 'Kemurungan'},
        {a: at(p, 'kebimbangan', 2.4), icon: <MIcon name="brain" size={76} f={f} />, text: 'Kebimbangan'},
        {a: at(p, 'masalah', 3.5), icon: <KIcon name="question" size={76} />, text: 'Masalah kesihatan lain', size: 36},
      ]}
    />
  );
};

/* ================= 11 — Hafiz tidur lena ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSegar = at(p, 'segar', 2.6);
  const morning = f >= aSegar;
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: morning ? BG('#7FC4F2', '#F6D6A8') : BG(C.night[1], C.violet[1])}} />
      {morning ? <div style={{position: 'absolute', left: 760, top: 560}}><KIcon name="sun" size={220} f={f} /></div> : <div style={{position: 'absolute', left: 760, top: 560}}><KIcon name="moon" size={200} f={f} /></div>}
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Tidur lebih lena" bg={C.green} size={54} /></Pop>
      {morning ? (
        <>
          <Pop at={aSegar} style={{left: 60, top: 680}}><Pill text="Bangun segar!" bg={C.yellow} color={C.navy} size={54} /></Pop>
          <Who preset={HAFIZ} x={300} y={980} w={480} mood="happy" pose="wave" seed={9} />
          <Burst f={f} a={aSegar} x={540} y={1100} />
        </>
      ) : (
        <Bed f={f} x={180} y={1000} w={720} awake={false} />
      )}
    </Camera>
  );
};

/* ================= 12 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Closing
      p={p}
      aSaya={at(p, 'saya doktor', 4.1)}
      lines={[
        {a: at(p, 'susah', 0.1), node: <IconPill icon={<KIcon name="moon" size={60} f={f} />} text="Susah tidur, ganggu hidup?" size={40} />},
        {a: at(p, 'jangan tunggu', 1.8), node: <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />},
        {a: at(p, 'dapatkan', 2.8), node: <IconPill icon={<KIcon name="talk" size={60} f={f} />} text="Dapatkan bantuan" size={44} bg={C.green} color="#fff" />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, hafiz: Hafiz, letih: Letih, diagnosis: Diagnosis, lima: Lima,
  kenali: Kenali, waktu: Waktu, bilik: Bilik, elak: Elak, rawat: Rawat,
  punca: Punca, pulih: Pulih, penutup: Penutup,
};

void interpolate; void clamp;
