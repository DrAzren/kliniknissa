import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Bubble, Burst, C, Camera, Check, clamp, Closing, Cross, FiveIntro, Glow, IconPill, interpolate, KIcon, LEAF, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, Txt, useCurrentFrame, Who,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const FARAH: AvatarPreset = {
  id: 'farah', skin: '#E0AE88', skinShade: '#C69270', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#E58FB0', topShade: '#C76F92',
  hijabColor: '#6157C5', hijabShade: '#4B3C9B', accessory: null,
};

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/** Jam berdetik laju. */
const Clock: React.FC<{f: number; size: number; speed?: number}> = ({f, size, speed = 6}) => (
  <svg width={size} height={size} viewBox="0 0 120 120">
    <circle cx={60} cy={60} r={52} fill="#fff" stroke={C.navy} strokeWidth={8} />
    {Array.from({length: 12}).map((_, i) => <rect key={i} x={58} y={12} width={4} height={10} fill={C.navy} transform={`rotate(${i * 30} 60 60)`} />)}
    <rect x={57} y={28} width={6} height={34} rx={3} fill={C.navy} transform={`rotate(${f * speed} 60 60)`} />
    <rect x={58} y={40} width={4} height={22} rx={2} fill={RED} transform={`rotate(${f * speed / 12} 60 60)`} />
    <circle cx={60} cy={60} r={6} fill={RED} />
  </svg>
);

/** Awan risau berpusing di atas kepala. */
const WorryOrbit: React.FC<{f: number; cx: number; cy: number; r: number; icons: {node: React.ReactNode; a: number}[]}> = ({f, cx, cy, r, icons}) => (
  <>
    {icons.map((it, i) => {
      const ang = f / 30 + (i / icons.length) * Math.PI * 2;
      const s = interpolate(f, [it.a, it.a + 10], [0, 1], clamp);
      return (
        <div key={i} style={{position: 'absolute', left: cx + Math.cos(ang) * r - 60, top: cy + Math.sin(ang) * r * 0.45 - 60, transform: `scale(${s})`, width: 120, height: 120, borderRadius: 60, background: 'rgba(255,255,255,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {it.node}
        </div>
      );
    })}
  </>
);

const Duit: React.FC<{size: number}> = ({size}) => (
  <div style={{width: size, height: size * 0.6, background: C.green, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid #fff'}}>
    <Txt size={size * 0.32}>RM</Txt>
  </div>
);

/* ================= 0 — Hook: risau semua perkara, tak boleh tidur ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSemua = at(p, 'semua', 0.9);
  const aTidur = at(p, 'tidur', 3.8);
  const aNormal = at(p, 'normal', 5.3);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={61} glow={C.violet[3]} />
      <Glow x={540} y={1100} r={460} color={C.labelPink} opacity={0.15 + 0.08 * Math.sin(f / 3)} />
      <WorryOrbit f={f} cx={540} cy={820} r={360} icons={[
        {node: <KIcon name="laptop" size={80} f={f} />, a: aSemua},
        {node: <Duit size={80} />, a: aSemua + 5},
        {node: <KIcon name="heart" size={80} f={f} />, a: aSemua + 10},
        {node: <Clock f={f} size={80} />, a: aSemua + 15},
        {node: <KIcon name="question" size={80} />, a: aSemua + 20},
      ]} />
      <div style={{position: 'absolute', left: 340, top: 1000}}><Who preset={FARAH} x={0} y={0} w={400} mood="tired" pose="clasp" seed={5} /></div>
      <Pop at={aTidur} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="bed" size={56} />} text="Tak boleh tidur" size={42} bg={RED} color="#fff" /></Pop>
      <Pop at={aNormal} style={{left: 0, width: 1080, top: 1500, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Adakah ini normal?" bg={C.yellow} color={C.navy} size={60} />
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Farah, guru: risau kerja, duit, ibu, terlewat 5 minit ================= */
export const Farah: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const list = [
    {a: at(p, 'kerja', 3.6), node: <IconPill icon={<KIcon name="laptop" size={56} f={f} />} text="Kerja" size={40} />, x: 60, y: 700},
    {a: at(p, 'duit', 4.4), node: <IconPill icon={<Duit size={60} />} text="Duit" size={40} />, x: 320, y: 700},
    {a: at(p, 'kesihatan', 5.0), node: <IconPill icon={<KIcon name="heart" size={56} f={f} />} text="Kesihatan ibu" size={38} />, x: 565, y: 700},
    {a: at(p, 'terlewat', 7.6), node: <IconPill icon={<Clock f={f} size={60} speed={14} />} text="Terlewat 5 minit!" size={40} bg={RED} color="#fff" />, x: 60, y: 830},
  ];
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: BG(C.violet[0], C.pink[0])}} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: '#7FA36B'}} />
      <Pop at={0} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="school" size={56} />} text="Farah, 31 tahun, guru" size={44} bg={C.navy} color={C.yellow} /></Pop>
      {list.map((l, i) => <Pop key={i} at={l.a} style={{left: l.x, top: l.y}}>{l.node}</Pop>)}
      <Who preset={FARAH} x={60} y={980} w={460} mood="sad" pose="chin" seed={5} />
      <div style={{position: 'absolute', left: 600, top: 1060}}><KIcon name="school" size={340} /></div>
    </Camera>
  );
};

/* ================= 2 — Lebih setahun: tegang, marah, sukar fokus, tidur terganggu ================= */
export const Setahun: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aMarah = at(p, 'marah', 3.2);
  const aStres = at(p, 'stres', 7.4);
  const items = [
    {a: at(p, 'bahunya', 1.8), t: 'Bahu tegang', i: <KIcon name="back" size={56} />},
    {a: aMarah, t: 'Cepat marah', i: <KIcon name="bolt" size={56} f={f} />},
    {a: at(p, 'fokus', 4.2), t: 'Sukar fokus', i: <MIcon name="brain" size={56} f={f} />},
    {a: at(p, 'tidurnya', 5.1), t: 'Tidur terganggu', i: <KIcon name="zzz" size={56} f={f} />},
  ];
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: BG(C.night[1], C.violet[1])}} />
      <NightSky seed={19} top="transparent" bottom="transparent" stars={40} glow={C.violet[3]} />
      <Pop at={0} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="calendar" size={56} />} text="Lebih setahun begini" size={42} /></Pop>
      {items.map((it, i) => (
        <Pop key={i} at={it.a} style={{left: 60 + (i % 2) * 480, top: 690 + Math.floor(i / 2) * 115}}>
          <IconPill icon={it.i} text={it.t} size={38} bg={C.navy} color="#fff" />
        </Pop>
      ))}
      <Who preset={FARAH} x={300} y={980} w={480} mood={f >= aMarah && f < aStres ? 'angry' : 'tired'} pose="down" seed={5} />
      <Pop at={aStres} style={{left: 600, top: 1000}}><Bubble tail="left" size={40}>"Stres biasa je…"</Bubble></Pop>
    </Camera>
  );
};

/* ================= 3 — Diagnosis: tiroid diperiksa, GAD ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTir = at(p, 'tiroid', 2.0);
  const aStamp = at(p, 'gangguan', 4.7);
  const before = f < aStamp;
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: BG(C.night[3], C.violet[2])}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      {before ? (
        <Pop at={aTir} style={{left: 0, width: 1080, top: 640, display: 'flex', justifyContent: 'center'}}>
          <IconPill icon={<MIcon name="search" size={60} f={f} />} text="Punca lain? Tiroid…" size={44} />
        </Pop>
      ) : null}
      {before && f >= aTir + 25 ? <div style={{position: 'absolute', left: 820, top: 760}}><Check size={90} /></div> : null}
      <Who preset={p.preset} x={20} y={1040} w={460} mood="neutral" pose={before ? 'chin' : 'point'} />
      <Who preset={FARAH} x={600} y={1060} w={420} mood={before ? 'neutral' : 'sad'} pose="clasp" seed={5} />
      <Stamp f={f} a={aStamp} top="DIAGNOSIS" big="KEBIMBANGAN" sub="Gangguan kebimbangan menyeluruh" bigSize={80} y={660} />
    </Camera>
  );
};

/* ================= 4 — Risau normal vs penyakit + 5 tanda ================= */
export const Lima: React.FC<SceneProps> = (p) => {
  const aBerl = at(p, 'berlebihan', 2.1);
  return (
    <FiveIntro
      p={p}
      aFive={at(p, 'lima tanda', 5.6)}
      sub="tanda & fakta perlu tahu"
      glow={C.pink[0]}
      head={
        <>
          <Pop at={0} style={{left: 0, width: 1080, top: 560, display: 'flex', justifyContent: 'center'}}>
            <IconPill icon={<Check size={52} />} text="Risau itu normal" size={44} />
          </Pop>
          <Pop at={aBerl} style={{left: 0, width: 1080, top: 690, display: 'flex', justifyContent: 'center'}}>
            <IconPill icon={<KIcon name="warning" size={56} />} text="Berlebihan & sukar dikawal" size={42} bg={RED} color="#fff" />
          </Pop>
        </>
      }
    />
  );
};

/* ================= 5–9 — #1–#5 ================= */
export const Berlebihan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="RISAU BERLEBIHAN"
      titleSize={82}
      bg={BG(C.night[1], C.violet[0])}
      hero={<Clock f={f} size={260} speed={10} />}
      items={[
        {a: at(p, 'banyak', 1.3), icon: <KIcon name="question" size={76} />, text: 'Tentang banyak perkara'},
        {a: at(p, 'hampir', 2.3), icon: <KIcon name="calendar" size={76} />, text: 'Hampir setiap hari'},
        {a: at(p, 'enam', 4.4), icon: <KIcon name="hourglass" size={76} f={f} />, text: 'Sekurang-kurangnya 6 bulan', bg: RED, size: 36},
      ]}
    />
  );
};

export const Kawal: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="SUKAR DIKAWAL"
      titleSize={92}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<div style={{transform: `rotate(${Math.sin(f / 4) * 6}deg)`}}><MIcon name="brain" size={260} f={f} /></div>}
      items={[
        {a: at(p, 'keterlaluan', 2.0), icon: <Check size={70} />, text: 'Tahu ia keterlaluan'},
        {a: at(p, 'berhenti', 3.6), icon: <div style={{position: 'relative'}}><KIcon name="bolt" size={76} f={f} /></div>, text: 'Tapi tak boleh berhenti', bg: RED},
      ]}
    />
  );
};

export const Badan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="TANDA PADA BADAN"
      titleSize={80}
      bg={BG(C.night[1], C.violet[1])}
      grid
      items={[
        {a: at(p, 'gelisah', 1.0), icon: <KIcon name="bolt" size={90} f={f} />, text: 'Gelisah'},
        {a: at(p, 'penat', 2.2), icon: <KIcon name="zzz" size={90} f={f} />, text: 'Cepat penat'},
        {a: at(p, 'otot', 2.8), icon: <KIcon name="back" size={90} />, text: 'Otot tegang'},
        {a: at(p, 'fokus', 3.9), icon: <MIcon name="brain" size={90} f={f} />, text: 'Sukar fokus'},
        {a: at(p, 'susah', 4.8), icon: <KIcon name="bed" size={90} />, text: 'Susah tidur'},
      ]}
    />
  );
};

export const Ganggu: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="MENGGANGGU HIDUP"
      titleSize={80}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<KIcon name="heartbreak" size={260} f={f} />}
      items={[
        {a: at(p, 'kerja', 1.4), icon: <KIcon name="laptop" size={76} f={f} />, text: 'Kerja'},
        {a: at(p, 'pelajaran', 2.0), icon: <KIcon name="school" size={76} />, text: 'Pelajaran'},
        {a: at(p, 'hubungan', 2.8), icon: <KIcon name="heartbreak" size={76} f={f} />, text: 'Hubungan terjejas', bg: RED},
      ]}
    />
  );
};

export const Rawat: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="BOLEH DIRAWAT"
      titleSize={92}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      grid
      items={[
        {a: at(p, 'terapi', 1.8), icon: <KIcon name="talk" size={90} f={f} />, text: 'Terapi CBT', bg: C.green},
        {a: at(p, 'ubat', 3.4), icon: <KIcon name="pill" size={90} />, text: 'Ubat jika perlu'},
        {a: at(p, 'senaman', 4.5), icon: <KIcon name="shoe" size={90} />, text: 'Senaman', bg: C.green},
        {a: at(p, 'relaksasi', 5.8), icon: <KIcon name="smile" size={90} />, text: 'Latihan relaksasi'},
        {a: at(p, 'penenang', 7.2), icon: <div style={{position: 'relative'}}><KIcon name="pill" size={90} /><div style={{position: 'absolute', left: 0, top: 0}}><Cross f={30} size={90} /></div></div>, text: 'Tiada ubat penenang tanpa preskripsi', bg: RED, size: 24},
      ]}
      mood="happy"
    />
  );
};

/* ================= 10 — Bukan lemah ================= */
export const Lemah: React.FC<SceneProps> = (p) => (
  <PointScene
    p={p}
    title="BUKAN TANDA ANDA LEMAH"
    titleSize={70}
    bg={BG(C.night[1], '#1F4A4A')}
    glow={C.green}
    hero={<KIcon name="smile" size={260} />}
    items={[
      {a: at(p, 'lemah', 1.8), icon: <Check size={70} />, text: 'Ia penyakit, bukan kelemahan', bg: C.green, size: 36},
      {a: at(p, 'ramai', 2.6), icon: <KIcon name="person" size={76} />, text: 'Ramai pulih dengan rawatan', size: 36},
    ]}
    mood="happy"
  />
);

/* ================= 11 — Farah pulih ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aLena = at(p, 'lena', 3.0);
  const aTenang = at(p, 'tenang', 3.9);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG('#7FC4F2', '#F6D6A8')}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: LEAF}} />
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Beberapa bulan terapi" bg={C.green} size={50} /></Pop>
      <Pop at={aLena} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="bed" size={56} />} text="Tidur lena" size={42} /></Pop>
      <Pop at={aTenang} style={{left: 60, top: 790}}><IconPill icon={<KIcon name="school" size={56} />} text="Lebih tenang di sekolah" size={42} /></Pop>
      <Who preset={FARAH} x={500} y={960} w={480} mood="happy" pose="wave" seed={5} />
      <div style={{position: 'absolute', left: 120, top: 1100}}><KIcon name="school" size={300} /></div>
      <Burst f={f} a={aTenang} x={740} y={1040} />
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
        {a: at(p, 'risau', 0.1), node: <IconPill icon={<Clock f={f} size={60} speed={10} />} text="Risau sampai ganggu hidup?" size={40} />},
        {a: at(p, 'jangan tunggu', 2.0), node: <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />},
        {a: at(p, 'dapatkan', 2.9), node: <IconPill icon={<KIcon name="talk" size={60} f={f} />} text="Dapatkan bantuan" size={44} bg={C.green} color="#fff" />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, farah: Farah, setahun: Setahun, diagnosis: Diagnosis, lima: Lima,
  berlebihan: Berlebihan, kawal: Kawal, badan: Badan, ganggu: Ganggu, rawat: Rawat,
  lemah: Lemah, pulih: Pulih, penutup: Penutup,
};
