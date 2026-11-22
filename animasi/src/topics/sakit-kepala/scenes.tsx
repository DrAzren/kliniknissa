import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Burst, C, Camera, Check, clamp, Closing, Cross, FiveIntro, Glow, IconPill, interpolate, KIcon, LEAF, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, Txt, useCurrentFrame, Who,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const ZARINA: AvatarPreset = {
  id: 'zarina', skin: '#E0AE88', skinShade: '#C69270', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#7FA36B', topShade: '#5E8450',
  hijabColor: '#6157C5', hijabShade: '#4B3C9B', accessory: null,
};
export const SUAMI: AvatarPreset = {
  id: 'suami-zarina', skin: '#C9926A', skinShade: '#AD774F', hair: 'short', hairColor: '#1E1A24', top: 'shirt', topColor: '#4F79C7', topShade: '#3A5FA0',
  accessory: null,
};

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/** Kilauan merah "berdenyut" sekitar kepala. */
const Throb: React.FC<{f: number; x: number; y: number; r: number; on: boolean}> = ({f, x, y, r, on}) =>
  on ? (
    <div style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: r, border: `10px solid ${RED}`, opacity: 0.25 + 0.5 * Math.abs(Math.sin(f / 4)), transform: `scale(${1 + 0.08 * Math.sin(f / 4)})`}} />
  ) : null;

/* ================= 0 — Hook ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aBiasa = at(p, 'biasa', 0.8);
  const aKec = at(p, 'kecemasan', 2.4);
  const aBeza = at(p, 'membezakannya', 4.3);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={201} glow={f >= aKec ? RED : C.violet[2]} />
      <Glow x={540} y={1050} r={460} color={RED} opacity={f >= aKec ? 0.3 : 0.1} />
      <div style={{position: 'absolute', left: 340, top: 820}}><KIcon name="headache" size={400} f={f} /></div>
      <Pop at={aBiasa} style={{left: 60, top: 600}}><IconPill icon={<KIcon name="pill" size={56} />} text="Sakit kepala biasa?" size={42} /></Pop>
      <Pop at={aKec} style={{left: 520, top: 700}}><IconPill icon={<KIcon name="ambulance" size={60} f={f} />} text="Kecemasan?" size={42} bg={RED} color="#fff" /></Pop>
      <Pop at={aBeza} style={{left: 0, width: 1080, top: 1500, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Cara membezakannya" bg={C.yellow} color={C.navy} size={56} />
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Zarina menyidai kain → tiba-tiba sakit teruk ================= */
export const Zarina: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTiba = at(p, 'tibatiba', 3.4);
  const aTeruk = at(p, 'paling', 6.3);
  const hit = f >= aTiba;
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: hit ? BG(C.night[1], '#5A1F3A') : BG('#7FC4F2', '#F6D6A8')}} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: hit ? C.night[3] : LEAF}} />
      {/* ampaian */}
      <div style={{position: 'absolute', left: 520, top: 900, width: 500, height: 6, background: '#55516A'}} />
      {[0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', left: 560 + i * 150, top: 906, width: 110, height: 140, background: [C.labelPink, C.yellow, '#9FD6F7'][i], borderRadius: '0 0 16px 16px'}} />)}
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Puan Zarina, 42 tahun" bg={C.navy} color={C.yellow} size={50} /></Pop>
      <Pop at={aTiba} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="bolt" size={56} f={f} />} text="Tiba-tiba, seperti dihentak!" size={38} bg={RED} color="#fff" /></Pop>
      <Pop at={aTeruk} style={{left: 60, top: 790}}><Pill text="Paling teruk dalam hidupnya" bg={C.labelPink} size={40} /></Pop>
      <div style={{position: 'absolute', left: 80, top: 960, transform: hit ? `translateX(${Math.sin(f * 1.5) * 4}px)` : undefined}}>
        <Who preset={ZARINA} x={0} y={0} w={460} mood={hit ? 'shock' : 'happy'} pose={hit ? 'chin' : 'wave'} seed={12} />
      </div>
      <Throb f={f} x={310} y={1080} r={170} on={hit} />
    </Camera>
  );
};

/* ================= 2 — Muntah, tengkuk keras, mahu ubat sahaja → suami bawa ke hospital ================= */
export const Muntah: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aMun = at(p, 'muntah', 0.2);
  const aTeng = at(p, 'tengkuknya', 1.1);
  const aUbat = at(p, 'ubat', 3.2);
  const aSuami = at(p, 'suaminya', 4.9);
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: BG(C.night[1], '#5A1F3A')}} />
      <NightSky seed={43} top="transparent" bottom="transparent" stars={40} glow={RED} />
      <Pop at={aMun} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="vomit" size={56} />} text="Muntah" size={40} /></Pop>
      <Pop at={aTeng} style={{left: 380, top: 560}}><IconPill icon={<KIcon name="warning" size={56} />} text="Tengkuk keras" size={40} bg={RED} color="#fff" /></Pop>
      <Pop at={aUbat} style={{left: 60, top: 680}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <div style={{position: 'relative'}}><KIcon name="pill" size={110} />{f >= aSuami ? <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - aSuami} size={110} /></div> : null}</div>
          <Pill text="Ubat tahan sakit sahaja?" bg={C.navy} size={36} />
        </div>
      </Pop>
      <Who preset={ZARINA} x={40} y={980} w={440} mood="sad" pose="chin" seed={12} />
      <Pop at={aSuami} style={{left: 520, top: 960}}><Who preset={SUAMI} x={0} y={0} w={440} mood="shock" pose="point" seed={13} /></Pop>
      <Pop at={aSuami + 12} style={{left: 540, top: 840}}><IconPill icon={<KIcon name="hospital" size={56} />} text="Terus ke hospital" size={34} bg={C.green} color="#fff" /></Pop>
    </Camera>
  );
};

/* ================= 3 — Diagnosis: pendarahan dalam otak ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aScan = at(p, 'imbasan', 0.2);
  const aStamp = at(p, 'pendarahan', 3.0);
  const before = f < aStamp;
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: BG(C.night[3], C.violet[2])}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      {before ? <Pop at={aScan} style={{left: 0, width: 1080, top: 640, display: 'flex', justifyContent: 'center'}}><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><KIcon name="scan" size={260} f={f} /><Pill text="Imbasan otak" bg={C.navy} size={40} /></div></Pop> : null}
      <Who preset={p.preset} x={20} y={1040} w={460} mood="neutral" pose={before ? 'chin' : 'point'} />
      <Who preset={ZARINA} x={600} y={1060} w={420} mood="sad" pose="clasp" seed={12} />
      <Stamp f={f} a={aStamp} top="DIAGNOSIS" big="PENDARAHAN" sub="Dalam otak" bigSize={96} y={600} />
    </Camera>
  );
};

/* ================= 4 — Kebanyakan tidak bahaya + 5 tanda ================= */
export const Lima: React.FC<SceneProps> = (p) => (
  <FiveIntro
    p={p}
    aFive={at(p, 'lima tanda', 3.2)}
    sub="tanda bahaya perlu tahu"
    glow={RED}
    head={
      <Pop at={at(p, 'berbahaya', 1.6)} style={{left: 0, width: 1080, top: 580, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<Check size={52} />} text="Kebanyakannya tidak berbahaya" size={42} />
      </Pop>
    }
  />
);

/* ================= 5–9 — #1–#5 ================= */
export const Tiba: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="TIBA-TIBA & SANGAT TERUK"
      titleSize={66}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<KIcon name="headache" size={260} f={f} />}
      items={[
        {a: at(p, 'tibatiba', 1.9), icon: <KIcon name="bolt" size={76} f={f} />, text: 'Datang tiba-tiba', bg: RED},
        {a: at(p, 'teruk', 3.2), icon: <KIcon name="warning" size={76} />, text: 'Sangat teruk'},
        {a: at(p, 'memuncak', 3.7), icon: <KIcon name="clock" size={76} f={f * 4} />, text: 'Memuncak dalam beberapa minit', size: 32},
      ]}
    />
  );
};

export const Demam: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="DENGAN DEMAM"
      titleSize={92}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<MIcon name="thermo" size={260} f={f} />}
      items={[
        {a: at(p, 'demam', 1.4), icon: <MIcon name="thermo" size={76} f={f} />, text: 'Demam', bg: RED},
        {a: at(p, 'tengkuk', 2.2), icon: <KIcon name="back" size={76} />, text: 'Tengkuk keras'},
        {a: at(p, 'ruam', 3.3), icon: <KIcon name="virus" size={76} f={f} />, text: 'Ruam pada kulit'},
      ]}
    />
  );
};

export const Saraf: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="TANDA SARAF"
      titleSize={96}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      grid
      items={[
        {a: at(p, 'lemah', 1.6), icon: <KIcon name="arms" size={90} f={f} />, text: 'Lemah sebelah badan', bg: RED, size: 28},
        {a: at(p, 'pelat', 3.1), icon: <KIcon name="mouth" size={90} />, text: 'Pelat'},
        {a: at(p, 'penglihatan', 3.7), icon: <MIcon name="eye" size={90} f={f} />, text: 'Penglihatan kabur', size: 30},
        {a: at(p, 'keliru', 4.9), icon: <KIcon name="dizzy" size={90} f={f} />, text: 'Keliru', bg: RED},
        {a: at(p, 'pengsan', 5.8), icon: <KIcon name="zzz" size={90} f={f} />, text: 'Pengsan'},
      ]}
    />
  );
};

export const Cedera: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="SELEPAS KECEDERAAN KEPALA"
      titleSize={64}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<KIcon name="headache" size={260} f={f} />}
      items={[
        {a: at(p, 'kecederaan', 1.9), icon: <KIcon name="bolt" size={76} f={f} />, text: 'Terhantuk / jatuh / kemalangan', bg: RED, size: 32},
      ]}
    />
  );
};

export const Baharu: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="BAHARU & MAKIN TERUK"
      titleSize={72}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<KIcon name="calendar" size={240} />}
      items={[
        {a: at(p, 'makin', 2.0), icon: <KIcon name="warning" size={76} />, text: 'Sakit kepala baharu, makin teruk', size: 32, bg: RED},
        {a: at(p, 'umur', 3.9), icon: <KIcon name="person" size={76} />, text: 'Terutama selepas umur 50', size: 36},
        {a: at(p, 'bangun', 5.8), icon: <KIcon name="bed" size={76} />, text: 'Bangun tidur sakit + muntah', size: 34},
      ]}
    />
  );
};

/* ================= 10 — Segera ke hospital / 999 ================= */
export const Segera: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const a999 = at(p, 'sembilan', 3.2);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG(C.night[0], '#5A1F3A')}} />
      <Glow x={540} y={1000} r={520} color={RED} opacity={0.3 + 0.1 * Math.sin(f / 3)} />
      <Pop at={0} style={{left: 0, width: 1080, top: 560, display: 'flex', justifyContent: 'center'}}><Pill text="Ada tanda ini?" bg={C.yellow} color={C.navy} size={60} /></Pop>
      <Pop at={at(p, 'hospital', 1.8)} style={{left: 140, top: 760}}><KIcon name="hospital" size={300} /></Pop>
      <Pop at={a999 - 6} style={{left: 600, top: 780}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <KIcon name="ambulance" size={280} f={f} />
          <div style={{background: RED, borderRadius: 30, padding: '4px 34px'}}><Txt size={86}>999</Txt></div>
        </div>
      </Pop>
      <Who preset={p.preset} x={300} y={1260} w={480} mood="neutral" pose="point" />
    </Camera>
  );
};

/* ================= 11 — Sakit kepala biasa ================= */
export const Biasa: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="SAKIT KEPALA BIASA"
      titleSize={78}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<KIcon name="bed" size={240} />}
      items={[
        {a: at(p, 'rehat', 1.7), icon: <KIcon name="bed" size={76} />, text: 'Rehat', bg: C.green},
        {a: at(p, 'minum', 2.4), icon: <KIcon name="cup" size={76} />, text: 'Minum air', bg: C.green},
        {a: at(p, 'jangan', 3.5), icon: <div style={{position: 'relative'}}><KIcon name="pill" size={76} /><div style={{position: 'absolute', left: 0, top: 0}}><Cross f={30} size={76} /></div></div>, text: 'Jangan kerap ubat tahan sakit', size: 32},
        {a: at(p, 'berulang', 7.6), icon: <KIcon name="headache" size={76} f={f} />, text: 'Boleh jadi sakit kepala berulang', size: 30, bg: RED},
      ]}
      mood="happy"
    />
  );
};

/* ================= 12 — Zarina pulih ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aPulih = at(p, 'pulih', 2.4);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG('#7FC4F2', '#F6D6A8')}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: LEAF}} />
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Dirawat segera" bg={C.green} size={54} /></Pop>
      <Pop at={aPulih} style={{left: 60, top: 680}}><Pill text="Kini sudah pulih!" bg={C.yellow} color={C.navy} size={52} /></Pop>
      <Who preset={ZARINA} x={80} y={960} w={460} mood="happy" pose="wave" seed={12} />
      <Who preset={SUAMI} x={540} y={980} w={440} mood="happy" pose="clasp" seed={13} />
      <Burst f={f} a={aPulih} x={540} y={1060} />
    </Camera>
  );
};

/* ================= 13 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Closing
      p={p}
      aSaya={at(p, 'saya doktor', 4.1)}
      lines={[
        {a: at(p, 'sakit', 0.1), node: <IconPill icon={<KIcon name="headache" size={60} f={f} />} text="Sakit kepala luar biasa?" size={42} />},
        {a: at(p, 'jangan tunggu', 1.6), node: <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />},
        {a: at(p, 'dapatkan', 2.5), node: <IconPill icon={<KIcon name="hospital" size={64} />} text="Dapatkan rawatan segera" size={44} bg={C.green} color="#fff" />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, zarina: Zarina, muntah: Muntah, diagnosis: Diagnosis, lima: Lima,
  tiba: Tiba, demam: Demam, saraf: Saraf, cedera: Cedera, baharu: Baharu,
  segera: Segera, biasa: Biasa, pulih: Pulih, penutup: Penutup,
};

void interpolate; void clamp;
