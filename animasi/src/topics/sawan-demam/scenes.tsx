import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Burst, C, Camera, Check, clamp, Closing, Cross, FiveIntro, Glow, IconPill, interpolate, KIcon, LEAF, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, Txt, useCurrentFrame, Who,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const ADAM: AvatarPreset = {
  id: 'adam', skin: '#E0AE88', skinShade: '#C69270', hair: 'short', hairColor: '#2A1C24', top: 'tee', topColor: '#F6C945', topShade: '#D9AA2A',
  accessory: null,
};
export const IBU: AvatarPreset = {
  id: 'ibu-adam', skin: '#D49C74', skinShade: '#B9805A', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#6157C5', topShade: '#4B3C9B',
  hijabColor: '#2BB3A3', hijabShade: '#1F8A7E', accessory: null,
};

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/** Adam (kecil) dengan gegaran kejang. */
const Toddler: React.FC<{x: number; y: number; w: number; f: number; seize?: boolean; mood?: 'sad' | 'happy' | 'tired' | 'shock' | 'neutral'}> = ({x, y, w, f, seize, mood = 'tired'}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: seize ? `translate(${Math.sin(f * 2.3) * 7}px, ${Math.cos(f * 2.9) * 5}px) rotate(${Math.sin(f * 1.7) * 3}deg)` : undefined}}>
    <Who preset={ADAM} x={0} y={0} w={w} mood={mood} pose="down" seed={3} />
  </div>
);

/* ================= 0 — Hook: anak demam, tiba-tiba kejang ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKej = at(p, 'kejang', 1.8);
  const aMata = at(p, 'mata', 2.5);
  const aSed = at(p, 'sedar', 3.4);
  const aApa = at(p, 'apa', 4.3);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={5} glow={f >= aKej ? RED : C.violet[2]} />
      <Glow x={540} y={1100} r={460} color={RED} opacity={f >= aKej ? 0.3 + 0.1 * Math.sin(f / 2) : 0.1} />
      <Pop at={1} style={{left: 60, top: 560}}><IconPill icon={<MIcon name="thermo" size={60} f={f} />} text="Anak demam…" size={44} /></Pop>
      <Toddler x={330} y={980} w={420} f={f} seize={f >= aKej} mood={f >= aKej ? 'shock' : 'tired'} />
      {[{t: 'Kejang', a: aKej, x: 60, y: 700}, {t: 'Mata ke atas', a: aMata, x: 560, y: 700}, {t: 'Tak sedar', a: aSed, x: 60, y: 820}].map((c) => (
        <Pop key={c.t} at={c.a} style={{left: c.x, top: c.y}}>
          <IconPill icon={<KIcon name="bolt" size={56} f={f} />} text={c.t} size={42} bg={RED} color="#fff" />
        </Pop>
      ))}
      <Pop at={aApa} style={{left: 0, width: 1080, top: 1500, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Apa perlu buat?" bg={C.yellow} color={C.navy} size={64} />
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Adam, 18 bulan, demam → tiba-tiba keras & tersentak ================= */
export const Adam: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aUmur = at(p, 'lapan', 0.4);
  const aDem = at(p, 'demam', 1.5);
  const aKer = at(p, 'keras', 6.4);
  const seize = f >= aKer;
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: seize ? BG(C.night[1], '#5A1F3A') : BG(C.violet[0], C.pink[0])}} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: seize ? C.night[3] : '#C98C64'}} />
      <Pop at={aUmur} style={{left: 60, top: 600}}><Pill text="Adam, 18 bulan" bg={C.navy} color={C.yellow} size={52} /></Pop>
      <Pop at={aDem} style={{left: 60, top: 710}}><IconPill icon={<MIcon name="thermo" size={60} f={f - aDem} />} text="Demam panas sejak pagi" size={40} bg={RED} color="#fff" /></Pop>
      <Who preset={IBU} x={360} y={900} w={480} mood={seize ? 'shock' : 'neutral'} pose="clasp" seed={4} />
      <Toddler x={520} y={1180} w={250} f={f} seize={seize} mood={seize ? 'shock' : 'tired'} />
      {seize ? [0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', left: 480 + i * 140, top: 1120 - (i % 2) * 40, opacity: Math.abs(Math.sin(f / 3 + i))}}><KIcon name="bolt" size={80} f={f} /></div>) : null}
      <Pop at={aKer} style={{left: 60, top: 820}}><Pill text="Badan keras, tersentak-sentak" bg={RED} size={40} /></Pop>
    </Camera>
  );
};

/* ================= 2 — Ibu panik, sudu dalam mulut (SALAH), berhenti 2 minit → hospital ================= */
export const Panik: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSud = at(p, 'sudu', 1.8);
  const aMin = at(p, 'dua minit', 4.3);
  const aHos = at(p, 'hospital', 6.0);
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: BG(C.night[1], '#5A1F3A')}} />
      <Who preset={IBU} x={40} y={920} w={460} mood="shock" pose="point" seed={4} />
      <Pop at={aSud - 4} style={{left: 560, top: 600}}>
        <div style={{position: 'relative', width: 260, height: 260}}>
          <KIcon name="spoon" size={260} />
          {f >= aSud + 6 ? <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - aSud - 6} size={260} /></div> : null}
        </div>
      </Pop>
      <Pop at={aSud + 8} style={{left: 470, top: 880}}><Pill text="SALAH! Jangan buat" bg={RED} size={44} /></Pop>
      <Pop at={aMin} style={{left: 470, top: 1000}}><IconPill icon={<KIcon name="clock" size={56} f={f} />} text="Berhenti dalam 2 minit" size={38} /></Pop>
      <Pop at={aHos - 2} style={{left: 600, top: 1140}}><KIcon name="ambulance" size={300} f={f} /></Pop>
    </Camera>
  );
};

/* ================= 3 — Diagnosis: SAWAN DEMAM ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSaw = at(p, 'sawan', 3.0);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: BG(C.night[3], C.violet[2])}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      <Who preset={p.preset} x={20} y={900} w={520} mood="neutral" pose={f >= aSaw ? 'point' : 'chin'} />
      <Who preset={IBU} x={600} y={980} w={420} mood="sad" pose="clasp" seed={4} />
      <Toddler x={700} y={1220} w={220} f={f} mood="tired" />
      <Stamp f={f} a={aSaw} top="DIAGNOSIS" big="SAWAN DEMAM" bigSize={118} y={540} />
    </Camera>
  );
};

/* ================= 4 — Umur 6 bulan – 5 tahun + 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => (
  <FiveIntro
    p={p}
    aFive={at(p, 'lima perkara', 4.9)}
    sub="perkara ibu bapa perlu tahu"
    glow={C.pink[0]}
    head={
      <Pop at={at(p, 'enam', 2.5)} style={{left: 0, width: 1080, top: 580, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="toy" size={64} />} text="Umur 6 bulan – 5 tahun" size={48} />
      </Pop>
    }
  />
);

/* ================= 5–9 — #1–#5 ================= */
export const Selamat: React.FC<SceneProps> = (p) => (
  <PointScene
    p={p}
    title="TEMPAT SELAMAT"
    titleSize={82}
    bg={BG(C.night[1], C.violet[0])}
    hero={<KIcon name="recovery" size={320} />}
    items={[
      {a: at(p, 'jauhkan', 1.8), icon: <KIcon name="warning" size={76} />, text: 'Jauhkan benda keras'},
      {a: at(p, 'baringkan', 3.8), icon: <KIcon name="recovery" size={76} />, text: 'Baringkan mengiring', bg: C.green},
    ]}
  />
);

export const Mulut: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="JANGAN MASUKKAN APA-APA"
      titleSize={66}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<div style={{position: 'relative', width: 260, height: 260}}><KIcon name="mouth" size={260} /><div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f} size={260} /></div></div>}
      items={[
        {a: at(p, 'masukkan', 0.8), icon: <KIcon name="mouth" size={76} />, text: 'Tiada apa-apa dalam mulut', bg: RED, size: 36},
        {a: at(p, 'bukan sudu', 2.9), icon: <KIcon name="spoon" size={76} />, text: 'Bukan sudu, bukan jari'},
        {a: at(p, 'tahan', 5.2), icon: <KIcon name="arms" size={76} f={30} />, text: 'Jangan tahan pergerakan', size: 38},
      ]}
      mood="neutral"
    />
  );
};

export const Jam: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="LIHAT JAM"
      titleSize={100}
      bg={BG('#0F0C2E', C.night[3])}
      hero={<KIcon name="clock" size={280} f={f} />}
      items={[
        {a: at(p, 'catat', 1.7), icon: <KIcon name="clock" size={76} f={f} />, text: 'Catat tempoh kejang'},
        {a: at(p, 'rakam', 4.2), icon: <KIcon name="camera" size={76} f={f} />, text: 'Rakam video untuk doktor', size: 38, bg: C.green},
      ]}
    />
  );
};

export const Telefon: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="TELEFON 999 JIKA"
      titleSize={78}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><KIcon name="ambulance" size={250} f={f} /><div style={{background: RED, borderRadius: 30, padding: '2px 30px'}}><Txt size={70}>999</Txt></div></div>}
      items={[
        {a: at(p, 'lebih', 2.8), icon: <KIcon name="clock" size={76} f={f} />, text: 'Kejang > 5 minit', bg: RED},
        {a: at(p, 'susah', 4.2), icon: <KIcon name="lungs" size={76} f={f} />, text: 'Susah bernafas'},
        {a: at(p, 'tidak sedar', 5.5), icon: <KIcon name="zzz" size={76} f={f} />, text: 'Tak sedar selepas kejang', size: 36},
      ]}
    />
  );
};

export const Hospital: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="KE HOSPITAL"
      titleSize={94}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<KIcon name="hospital" size={280} />}
      items={[
        {a: at(p, 'pertama', 1.4), icon: <KIcon name="bolt" size={76} f={f} />, text: 'Selepas kejang pertama'},
        {a: at(p, 'punca', 3.8), icon: <MIcon name="thermo" size={76} f={f} />, text: 'Periksa punca demam', bg: C.green},
      ]}
      mood="happy"
    />
  );
};

/* ================= 10 — Jangan panik: kebanyakannya tidak berbahaya ================= */
export const Tenang: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="JANGAN PANIK"
      titleSize={90}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<KIcon name="smile" size={260} />}
      items={[
        {a: at(p, 'berhenti sendiri', 1.1), icon: <KIcon name="clock" size={76} f={f} />, text: 'Berhenti sendiri dalam minit', bg: C.green, size: 34},
        {a: at(p, 'merosakkan', 3.4), icon: <MIcon name="brain" size={76} f={f} />, text: 'Tidak merosakkan otak', bg: C.green, size: 38},
        {a: at(p, 'epilepsi', 5.0), icon: <Check size={70} />, text: 'Bukan epilepsi', bg: C.green},
        {a: at(p, 'sesetengah', 5.9), icon: <MIcon name="thermo" size={76} f={f} />, text: 'Boleh berulang bila demam', size: 36},
      ]}
      mood="happy"
    />
  );
};

/* ================= 11 — Adam pulih, aktif bermain ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aAkt = at(p, 'aktif', 2.6);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG('#7FC4F2', '#F6D6A8')}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: LEAF}} />
      <Pop at={2} style={{left: 60, top: 560}}><Pill text="Adam pulih!" bg={C.green} size={60} /></Pop>
      <Who preset={IBU} x={560} y={940} w={440} mood="happy" pose="clasp" seed={4} />
      <div style={{position: 'absolute', left: 140, top: 1120 - (f >= aAkt ? Math.abs(Math.sin(f / 5)) * 40 : 0)}}>
        <Who preset={ADAM} x={0} y={0} w={300} mood="happy" pose="wave" seed={3} />
      </div>
      <div style={{position: 'absolute', left: 420 + Math.sin(f / 7) * 60, top: 1300 - Math.abs(Math.sin(f / 5)) * 120}}><KIcon name="ball" size={100} f={f} /></div>
      <Burst f={f} a={aAkt} x={300} y={1150} />
    </Camera>
  );
};

/* ================= 12 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Closing
      p={p}
      aSaya={at(p, 'saya doktor', 3.9)}
      lines={[
        {a: at(p, 'anak', 0.1), node: <IconPill icon={<KIcon name="bolt" size={60} f={f} />} text="Anak kejang ketika demam?" size={42} />},
        {a: at(p, 'jangan tunggu', 1.4), node: <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />},
        {a: at(p, 'dapatkan', 2.6), node: <IconPill icon={<KIcon name="hospital" size={64} />} text="Dapatkan rawatan segera" size={44} bg={C.green} color="#fff" />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, adam: Adam, panik: Panik, diagnosis: Diagnosis, lima: Lima,
  selamat: Selamat, mulut: Mulut, jam: Jam, telefon: Telefon, hospital: Hospital,
  tenang: Tenang, pulih: Pulih, penutup: Penutup,
};
