import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Bubble, Burst, C, Camera, Check, ClinicSign, clamp, Closing, Cross, FiveIntro, Glow, Icon, IconPill, interpolate, KIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, Txt, useCurrentFrame, Who,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const DANIAL: AvatarPreset = {
  id: 'danial', skin: '#D9A47C', skinShade: '#BE8860', hair: 'short', hairColor: '#231B28', top: 'tee', topColor: '#2BB3A3', topShade: '#1F8A7E',
  accessory: null,
};
export const DANIAL_KECIL: AvatarPreset = {...DANIAL, id: 'danial-kecil', topColor: '#F6C945', topShade: '#D9AA2A'};
export const KETUA: AvatarPreset = {
  id: 'ketua', skin: '#C9926A', skinShade: '#AD774F', hair: 'short-grey', hairColor: '#8A8798', top: 'shirt', topColor: '#1E1A4A', topShade: '#141036',
  accessory: 'glasses', stubble: true, moustache: true,
};

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/* ================= 0 — Hook: hilang kunci, kerja bertimbun, tangguh → bukan malas, ADHD? ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKun = at(p, 'kunci', 0.7);
  const aTim = at(p, 'bertimbun', 2.0);
  const aTan = at(p, 'tangguh', 3.7);
  const aMal = at(p, 'malas', 5.2);
  const aAd = at(p, 'ADHD', 6.8);
  const fall = interpolate(f, [aKun, aKun + 14], [0, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={7} glow={C.violet[3]} />
      <div style={{position: 'absolute', left: 120, top: 560 + fall * 260, transform: `rotate(${fall * 120}deg)`, opacity: f >= aKun ? 1 : 0}}>
        <KIcon name="keys" size={170} f={f} />
      </div>
      <Pop at={aKun} style={{left: 60, top: 1000}}><Pill text="Hilang kunci?" bg={C.navy} size={42} /></Pop>
      <Pop at={aTim} style={{left: 600, top: 560}}>
        <div style={{position: 'relative', width: 300, height: 300}}>
          {[0, 1, 2, 3].map((i) => <div key={i} style={{position: 'absolute', left: i * 14, top: 120 - i * 36, transform: `rotate(${(i % 2 ? 4 : -4)}deg)`}}><KIcon name="checklist" size={200} /></div>)}
        </div>
      </Pop>
      <Pop at={aTim + 4} style={{left: 600, top: 900}}><Pill text="Kerja bertimbun" bg={C.labelPink} size={42} /></Pop>
      <Pop at={aTan} style={{left: 600, top: 1010}}><IconPill icon={<KIcon name="clock" size={56} f={f} />} text="Asyik tangguh" size={40} /></Pop>
      <Pop at={aMal} style={{left: 0, width: 1080, top: 1180, display: 'flex', justifyContent: 'center'}}>
        <div style={{position: 'relative'}}>
          <Pill text="Malas?" bg={C.violet[1]} size={60} />
          <div style={{position: 'absolute', left: 20, top: -40}}>{f >= aMal + 6 ? <Cross f={f - aMal - 6} size={170} /> : null}</div>
        </div>
      </Pop>
      <Pop at={aAd} style={{left: 0, width: 1080, top: 1340, display: 'flex', justifyContent: 'center'}}>
        <Txt size={170} color={C.yellow} style={{textShadow: '0 10px 0 rgba(18,11,51,.6)'}}>ADHD?</Txt>
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Danial, 27, pereka grafik: kreatif tapi terlepas tarikh akhir ================= */
export const Danial: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aUmur = at(p, 'dua puluh', 0.6);
  const aPer = at(p, 'pereka', 1.6);
  const aPan = at(p, 'pandai', 2.8);
  const aTer = at(p, 'terlepas', 5.3);
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: BG(C.night[1], C.violet[0])}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[3]}} />
      <Pop at={aUmur} style={{left: 60, top: 540}}><Pill text="Danial, 27" bg={C.navy} color={C.yellow} size={54} /></Pop>
      <Pop at={aPer} style={{left: 60, top: 660}}><IconPill icon={<KIcon name="laptop" size={60} f={f} />} text="Pereka grafik" size={42} /></Pop>
      <Pop at={aPan} style={{left: 560, top: 800}}><IconPill icon={<KIcon name="smile" size={56} />} text="Pandai & kreatif" size={40} bg={C.green} color="#fff" /></Pop>
      <Pop at={aTer} style={{left: 440, top: 930}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: RED, padding: '10px 30px 10px 14px', borderRadius: 44}}>
          <div style={{position: 'relative', width: 70, height: 70}}><KIcon name="calendar" size={70} f={f} /><div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - aTer} size={70} color="#fff" /></div></div>
          <Txt size={38}>Terlepas tarikh akhir</Txt>
        </div>
      </Pop>
      <Who preset={DANIAL} x={60} y={960} w={460} mood={f >= aTer ? 'sad' : 'happy'} pose={f >= aTer ? 'down' : 'wave'} seed={1} />
      <div style={{position: 'absolute', left: 620, top: 1120}}><KIcon name="laptop" size={300} f={f} /></div>
    </Camera>
  );
};

/* ================= 2 — Mesyuarat: fikiran melayang, mencelah, beli tanpa fikir ================= */
export const Mesyuarat: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aMin = at(p, 'lima minit', 0.6);
  const aMel = at(p, 'melayang', 2.4);
  const aCel = at(p, 'mencelah', 3.7);
  const aBel = at(p, 'beli', 5.1);
  const aKen = at(p, 'kenapa', 7.2);
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: BG(C.night[1], C.violet[2])}} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: '#7A5236'}} />
      <Pop at={aMin} style={{left: 60, top: 540}}><IconPill icon={<KIcon name="clock" size={56} f={f} />} text="Mesyuarat: 5 minit" size={40} /></Pop>
      {f >= aMel && f < aKen - 2 ? (
        <div style={{position: 'absolute', left: 60, top: 660 - Math.sin(f / 8) * 14}}>
          <div style={{background: '#fff', borderRadius: 60, padding: '18px 34px', display: 'flex', gap: 14, alignItems: 'center'}}>
            <KIcon name="ball" size={60} f={f} /><KIcon name="phone" size={60} f={f} /><KIcon name="bowl" size={60} f={f} />
            <Txt size={34} color={C.navy}>Fikiran melayang…</Txt>
          </div>
        </div>
      ) : null}
      <Pop at={aCel} style={{left: 560, top: 920}}><IconPill icon={<KIcon name="talk" size={56} f={f} />} text="Mencelah" size={40} /></Pop>
      <Pop at={aBel} style={{left: 560, top: 1040}}><IconPill icon={<KIcon name="cart" size={56} />} text="Beli tanpa fikir" size={40} bg={C.labelPink} color="#fff" /></Pop>
      <Who preset={DANIAL} x={60} y={960} w={440} mood={f >= aKen ? 'sad' : 'curious'} pose={f >= aKen ? 'clasp' : 'chin'} seed={1} />
      <Pop at={aKen - 2} style={{left: 60, top: 700}}>
        <Bubble tail="left" size={38}>"Kenapa aku tak macam orang lain?"</Bubble>
      </Pop>
    </Camera>
  );
};

/* ================= 3 — Ditegur ketua kali ketiga → jumpa doktor ================= */
export const Ketua: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKet = at(p, 'ketiga', 1.4);
  const aDok = at(p, 'doktor', 2.6);
  return (
    <Camera dur={p.dur} to={1.08} panY={-10}>
      <AbsoluteFill style={{background: BG(C.night[1], C.violet[0])}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[3]}} />
      <Pop at={2} style={{left: 60, top: 560}}><Pill text="Ditegur ketua" bg={RED} size={46} /></Pop>
      <Pop at={aKet} style={{left: 60, top: 680}}><Pill text="Kali ke-3" bg={C.navy} color={C.yellow} size={46} /></Pop>
      {f >= aDok - 4 ? <ClinicSign x={560} y={620} w={420} /> : null}
      <Who preset={KETUA} x={40} y={980} w={420} mood="angry" anger={0.4} pose="point" seed={4} />
      <Who preset={DANIAL} x={560} y={1020} w={420} mood="sad" pose="down" seed={1} />
    </Camera>
  );
};

/* ================= 4 — Penilaian + sejarah sejak kecil → ADHD DEWASA ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aPen = at(p, 'penilaian', 0.3);
  const aKec = at(p, 'sejarah', 1.6);
  const aAd = at(p, 'ADHD', 4.0);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: BG(C.night[3], C.violet[2])}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      {f < aAd - 6 ? (
        <>
          <Pop at={aPen} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="checklist" size={60} f={f} />} text="Penilaian" size={44} /></Pop>
          <Pop at={aKec} style={{left: 520, top: 560}}><IconPill icon={<KIcon name="toy" size={60} />} text="Sejarah sejak kecil" size={38} /></Pop>
        </>
      ) : null}
      <Who preset={p.preset} x={20} y={900} w={520} mood="neutral" pose={f >= aAd ? 'point' : 'chin'} />
      <Who preset={DANIAL} x={630} y={1060} w={380} mood={f >= aAd ? 'shock' : 'sad'} pose="down" seed={1} />
      <Stamp f={f} a={aAd} top="DIAGNOSIS" big="ADHD DEWASA" bigSize={118} y={530} />
    </Camera>
  );
};

/* ================= 5 — Bukan hanya kanak-kanak, bukan malas + 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => (
  <FiveIntro
    p={p}
    aFive={at(p, 'lima', 4.1)}
    sub="perkara anda perlu tahu"
    head={
      <>
        <Pop at={at(p, 'kanak-kanak', 1.5)} style={{left: 0, width: 1080, top: 560, display: 'flex', justifyContent: 'center'}}>
          <IconPill icon={<KIcon name="toy" size={60} />} text="Bukan hanya kanak-kanak" size={44} />
        </Pop>
        <Pop at={at(p, 'malas', 3.0)} style={{left: 0, width: 1080, top: 700, display: 'flex', justifyContent: 'center'}}>
          <IconPill icon={<Check size={56} />} text="Bukan tanda malas" size={44} bg={C.labelPink} color="#fff" />
        </Pop>
      </>
    }
  />
);

/* ================= 6–10 — #1–#5 ================= */
export const Fokus: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="SUKAR FOKUS"
      titleSize={90}
      bg={BG(C.night[1], C.violet[0])}
      hero={<div style={{position: 'relative', width: 300, height: 380}}><Who preset={DANIAL} x={0} y={0} w={300} mood="curious" pose="chin" seed={1} /><div style={{position: 'absolute', left: 190, top: -20}}><KIcon name="bell" size={110} f={f} /></div></div>}
      items={[
        {a: at(p, 'terganggu', 1.9), icon: <KIcon name="bell" size={76} f={f} />, text: 'Mudah terganggu'},
        {a: at(p, 'cuai', 2.9), icon: <KIcon name="laptop" size={76} f={f} />, text: 'Cuai dalam kerja'},
        {a: at(p, 'hilang barang', 4.2), icon: <KIcon name="keys" size={76} f={f} />, text: 'Kerap hilang barang'},
        {a: at(p, 'lupa', 5.3), icon: <KIcon name="calendar" size={76} f={f} />, text: 'Lupa janji', bg: C.labelPink},
      ]}
    />
  );
};

export const Gelisah: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const shake = Math.sin(f * 1.2) * 6;
  return (
    <PointScene
      p={p}
      title="GELISAH"
      titleSize={110}
      bg={BG('#0F0C2E', C.night[3])}
      hero={<div style={{position: 'relative', width: 300, height: 380, transform: `translateX(${shake}px)`}}><Who preset={DANIAL} x={0} y={0} w={300} mood="tired" pose="clasp" seed={1} /></div>}
      items={[
        {a: at(p, 'resah', 3.8), icon: <KIcon name="storm" size={76} f={f} />, text: 'Resah di dalam'},
        {a: at(p, 'duduk diam', 5.3), icon: <KIcon name="couch" size={76} />, text: 'Susah duduk diam'},
        {a: at(p, 'bergerak', 6.6), icon: <KIcon name="shoe" size={76} />, text: 'Asyik bergerak'},
      ]}
    />
  );
};

export const Impulsif: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="IMPULSIF"
      titleSize={110}
      bg={BG(C.night[1], '#4A1F3A')}
      glow={C.pink[2]}
      hero={<KIcon name="cart" size={280} />}
      items={[
        {a: at(p, 'mencelah', 1.5), icon: <KIcon name="talk" size={76} f={f} />, text: 'Mencelah perbualan'},
        {a: at(p, 'terburu-buru', 3.2), icon: <KIcon name="bolt" size={76} f={f} />, text: 'Keputusan terburu-buru', size: 38},
        {a: at(p, 'menunggu', 4.8), icon: <KIcon name="clock" size={76} f={f} />, text: 'Sukar menunggu giliran', size: 38},
      ]}
    />
  );
};

export const Kecil: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="BERMULA SEJAK KECIL"
      titleSize={74}
      bg={BG(C.night[1], C.violet[0])}
      hero={<div style={{position: 'relative', width: 300, height: 380}}><Who preset={DANIAL_KECIL} x={30} y={40} w={240} mood="happy" pose="wave" seed={3} /><div style={{position: 'absolute', left: 200, top: 0}}><KIcon name="toy" size={110} /></div></div>}
      items={[
        {a: at(p, 'semua orang', 2.2), icon: <KIcon name="question" size={76} />, text: 'Semua orang sesekali lupa', size: 36},
        {a: at(p, 'sudah ada', 5.4), icon: <KIcon name="toy" size={76} />, text: 'ADHD: tanda sejak kecil'},
        {a: at(p, 'mengganggu', 7.1), icon: <KIcon name="warning" size={76} />, text: 'Ganggu kerja, belajar, hubungan', bg: RED, size: 32},
      ]}
      mood="curious"
    />
  );
};

export const Rawatan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="RAWATAN"
      titleSize={110}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<KIcon name="checklist" size={280} f={f} />}
      items={[
        {a: at(p, 'ubat', 1.4), icon: <KIcon name="pill" size={76} />, text: 'Ubat'},
        {a: at(p, 'terapi', 1.9), icon: <KIcon name="talk" size={76} f={f} />, text: 'Terapi'},
        {a: at(p, 'senarai', 3.8), icon: <KIcon name="checklist" size={76} f={f} />, text: 'Senarai tugas', bg: C.green},
        {a: at(p, 'peringatan', 4.9), icon: <KIcon name="bell" size={76} f={f} />, text: 'Peringatan telefon', bg: C.green},
      ]}
      mood="happy"
    />
  );
};

/* ================= 11 — Danial siapkan projek sebelum tarikh akhir ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aJad = at(p, 'jadual', 1.0);
  const aSiap = at(p, 'siapkan', 2.6);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG(C.violet[0], C.pink[0])}} />
      <Glow x={540} y={1050} r={560} color={C.yellow} opacity={0.35} />
      <Pop at={aJad} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="checklist" size={56} f={f} />} text="Jadual & peringatan" size={42} /></Pop>
      <Pop at={aSiap} style={{left: 60, top: 680}}><Pill text="Projek siap sebelum tarikh akhir!" bg={C.green} size={40} /></Pop>
      <Who preset={DANIAL} x={60} y={940} w={460} mood="happy" pose="wave" seed={1} />
      <div style={{position: 'absolute', left: 600, top: 1060}}><KIcon name="laptop" size={320} f={f} /></div>
      <Burst f={f} a={aSiap} x={540} y={1100} />
    </Camera>
  );
};

/* ================= 12 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => (
  <Closing
    p={p}
    aSaya={at(p, 'saya doktor', 4.6)}
    lines={[
      {a: at(p, 'kalau', 0.1), node: <IconPill icon={<KIcon name="warning" size={60} />} text="Berlarutan & ganggu hidup?" size={44} />},
      {a: at(p, 'jangan tunggu', 2.3), node: <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />},
      {a: at(p, 'dapatkan', 3.4), node: <IconPill icon={<Icon name="doctor" size={64} />} text="Dapatkan penilaian" size={48} bg={C.green} color="#fff" />},
    ]}
  />
);

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, danial: Danial, mesyuarat: Mesyuarat, ketua: Ketua, diagnosis: Diagnosis, lima: Lima,
  fokus: Fokus, gelisah: Gelisah, impulsif: Impulsif, kecil: Kecil, rawatan: Rawatan,
  pulih: Pulih, penutup: Penutup,
};
