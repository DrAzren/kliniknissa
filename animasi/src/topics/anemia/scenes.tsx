import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Burst, C, Camera, Check, clamp, Closing, Cross, FiveIntro, Glow, IconPill, interpolate, KIcon, LEAF, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, useCurrentFrame, Who,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const NURUL: AvatarPreset = {
  id: 'nurul', skin: '#E6B892', skinShade: '#CC9C76', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#2BB3A3', topShade: '#1F8A7E',
  hijabColor: '#E4629F', hijabShade: '#C24A82', accessory: 'glasses',
};

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/** Nurul pucat: lapisan putih lut sinar atas wajah. */
const Pale: React.FC<{x: number; y: number; w: number; o: number}> = ({x, y, w, o}) => (
  <div style={{position: 'absolute', left: x + w * 0.3, top: y + w * 0.12, width: w * 0.4, height: w * 0.42, borderRadius: '50%', background: '#fff', opacity: o, mixBlendMode: 'screen', filter: 'blur(8px)'}} />
);

/* ================= 0 — Hook: letih, pucat, semput ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const items = [
    {a: at(p, 'letih', 0.4), t: 'Letih', i: <KIcon name="battery" size={56} f={f} text="10" />},
    {a: at(p, 'pucat', 1.2), t: 'Pucat', i: <KIcon name="smile" size={56} />},
    {a: at(p, 'semput', 2.5), t: 'Cepat semput', i: <KIcon name="lungs" size={56} f={f} />},
  ];
  const aDarah = at(p, 'kurang darah', 4.3);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={251} glow={RED} />
      <Glow x={540} y={1050} r={460} color={RED} opacity={0.18} />
      {items.map((it, i) => <Pop key={i} at={it.a} style={{left: 60, top: 560 + i * 115}} origin="left center"><IconPill icon={it.i} text={it.t} size={42} /></Pop>)}
      <Pop at={aDarah - 6} style={{left: 640, top: 600}}><KIcon name="rbc" size={300} f={f} text="2" /></Pop>
      <Who preset={NURUL} x={300} y={1000} w={480} mood="tired" pose="down" seed={41} />
      <Pale x={300} y={1000} w={480} o={0.25} />
      <Pop at={aDarah} style={{left: 0, width: 1080, top: 920, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Kurang darah?" bg={RED} size={60} />
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Cikgu Nurul, 32: penat, pening, semput naik tangga ================= */
export const Nurul: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aPenat = at(p, 'penat', 3.9);
  const aPening = at(p, 'pening', 4.9);
  const aTangga = at(p, 'termengahmengah', 5.8);
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: BG(C.violet[0], C.pink[0])}} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: '#DDE3F0'}} />
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Cikgu Nurul, 32 tahun" bg={C.navy} color={C.yellow} size={48} /></Pop>
      <Pop at={aPenat} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="battery" size={52} f={f} text="15" />} text="Cepat penat" size={38} /></Pop>
      <Pop at={aPening} style={{left: 520, top: 680}}><IconPill icon={<KIcon name="dizzy" size={52} f={f} />} text="Pening" size={38} /></Pop>
      <Pop at={aTangga} style={{left: 60, top: 800}}><IconPill icon={<KIcon name="lungs" size={52} f={f} />} text="Semput naik tangga" size={38} bg={RED} color="#fff" /></Pop>
      <div style={{position: 'absolute', left: 560, top: 960}}><KIcon name="stairs" size={440} f={f} /></div>
      <Who preset={NURUL} x={60} y={980} w={460} mood="tired" pose="clasp" seed={41} />
      <Pale x={60} y={980} w={460} o={0.2} />
    </Camera>
  );
};

/* ================= 2 — Sangka kurang tidur; haid banyak ================= */
export const Haid: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTidur = at(p, 'kurang tidur', 0.6);
  const aHaid = at(p, 'haidnya', 2.6);
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: BG(C.night[1], C.violet[1])}} />
      <NightSky seed={53} top="transparent" bottom="transparent" stars={40} glow={C.violet[3]} />
      <Pop at={aTidur} style={{left: 60, top: 560}}>
        <div style={{position: 'relative'}}>
          <IconPill icon={<KIcon name="bed" size={56} />} text="Sangka kurang tidur…" size={40} />
        </div>
      </Pop>
      {f >= aHaid + 6 ? <div style={{position: 'absolute', left: 60, top: 540, width: 200, height: 120}}><Cross f={f - aHaid - 6} size={120} /></div> : null}
      <Pop at={aHaid} style={{left: 60, top: 700}}><IconPill icon={<KIcon name="drop" size={56} f={f} />} text="Haid banyak setiap bulan" size={38} bg={RED} color="#fff" /></Pop>
      <Pop at={aHaid + 6} style={{left: 620, top: 860}}><KIcon name="calendar" size={300} f={f} /></Pop>
      <Who preset={NURUL} x={60} y={980} w={460} mood="curious" pose="chin" seed={41} />
    </Camera>
  );
};

/* ================= 3 — Ujian darah → anemia kekurangan zat besi ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aStamp = at(p, 'anemia', 3.1);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: BG(C.night[3], C.violet[2])}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      {f < aStamp - 6 ? (
        <>
          <Pop at={0.2} style={{left: 60, top: 600}}><IconPill icon={<MIcon name="tube" size={60} f={f} />} text="Ujian darah" size={48} /></Pop>
          <Pop at={1.0} style={{left: 640, top: 640}}><KIcon name="rbc" size={280} f={f} text="2" /></Pop>
        </>
      ) : null}
      <Who preset={p.preset} x={20} y={1040} w={460} mood="neutral" pose={f < aStamp ? 'chin' : 'point'} />
      <Who preset={NURUL} x={600} y={1060} w={420} mood={f >= aStamp ? 'shock' : 'neutral'} pose="clasp" seed={41} />
      <Stamp f={f} a={aStamp} top="DIAGNOSIS" big="ANEMIA" sub="Kekurangan zat besi" bigSize={140} y={560} />
    </Camera>
  );
};

/* ================= 4 — Ujian darah mudah + 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => (
  <FiveIntro
    p={p}
    aFive={at(p, 'lima perkara', 3.3)}
    sub="perkara perlu anda tahu"
    glow={C.pink[0]}
    head={
      <Pop at={at(p, 'dikesan', 0.7)} style={{left: 0, width: 1080, top: 580, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<MIcon name="tube" size={56} />} text="Dikesan dengan ujian darah mudah" size={38} />
      </Pop>
    }
  />
);

/* ================= 5–9 — #1–#5 ================= */
export const Tanda: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="KENALI TANDA"
      titleSize={88}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      grid
      items={[
        {a: at(p, 'letih', 1.9), icon: <KIcon name="battery" size={90} f={f} text="10" />, text: 'Letih', bg: RED, size: 32},
        {a: at(p, 'pucat', 2.7), icon: <KIcon name="smile" size={90} />, text: 'Pucat', size: 32},
        {a: at(p, 'sesak', 3.4), icon: <KIcon name="lungs" size={90} f={f} />, text: 'Sesak nafas', bg: RED, size: 30},
        {a: at(p, 'jantung', 4.4), icon: <KIcon name="heart" size={90} f={f} />, text: 'Jantung berdebar', size: 28},
        {a: at(p, 'pening', 5.5), icon: <KIcon name="dizzy" size={90} f={f} />, text: 'Pening', bg: RED, size: 32},
      ]}
    />
  );
};

export const Punca: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="PUNCA BIASA"
      titleSize={88}
      bg={BG(C.night[1], C.violet[0])}
      hero={<KIcon name="drop" size={240} f={f} />}
      items={[
        {a: at(p, 'haid', 2.8), icon: <KIcon name="calendar" size={76} f={f} />, text: 'Haid yang banyak', bg: RED},
        {a: at(p, 'hamil', 4.6), icon: <KIcon name="baby" size={76} />, text: 'Keperluan lebih semasa hamil', size: 32},
        {a: at(p, 'makanan', 5.9), icon: <KIcon name="bowl" size={76} />, text: 'Makanan kurang zat besi', size: 34},
      ]}
    />
  );
};

export const Ujian: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="JANGAN TEKA SENDIRI"
      titleSize={76}
      bg={BG(C.night[1], C.violet[1])}
      hero={<MIcon name="tube" size={250} f={f} />}
      items={[
        {a: at(p, 'buat ujian', 2.1), icon: <MIcon name="tube" size={76} f={f} />, text: 'Ujian darah untuk sahkan', size: 34, bg: C.green},
        {a: at(p, 'puncanya', 4.4), icon: <MIcon name="search" size={76} />, text: 'Cari puncanya'},
        {a: at(p, 'lelaki', 5.3), icon: <KIcon name="person" size={76} />, text: 'Lelaki & selepas putus haid: siasat lanjut', size: 26, bg: RED},
      ]}
    />
  );
};

export const Pil: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="PIL ZAT BESI"
      titleSize={88}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<KIcon name="pillbottle" size={240} />}
      items={[
        {a: at(p, 'diarahkan', 1.5), icon: <KIcon name="checklist" size={76} />, text: 'Ambil seperti diarahkan', size: 36, bg: C.green},
        {a: at(p, 'hitam', 3.6), icon: <KIcon name="poop" size={76} />, text: 'Najis hitam · sembelit', size: 36},
        {a: at(p, 'teruskan', 6.3), icon: <KIcon name="calendar" size={76} f={f} />, text: 'Teruskan walaupun rasa baik', size: 32, bg: C.labelPink},
      ]}
      mood="happy"
    />
  );
};

export const Makan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTeh = at(p, 'teh', 6.7);
  return (
    <PointScene
      p={p}
      title="SUMBER ZAT BESI"
      titleSize={80}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      grid
      items={[
        {a: at(p, 'daging', 2.2), icon: <KIcon name="steak" size={90} />, text: 'Daging merah & hati', bg: C.green, size: 28},
        {a: at(p, 'ikan', 3.9), icon: <KIcon name="bowl" size={90} />, text: 'Ikan', size: 32},
        {a: at(p, 'kekacang', 4.6), icon: <KIcon name="nuts" size={90} />, text: 'Kekacang', bg: C.green, size: 30},
        {a: at(p, 'sayur', 5.4), icon: <KIcon name="veg" size={90} />, text: 'Sayur hijau', size: 30},
        {
          a: aTeh,
          icon: (
            <div style={{position: 'relative', width: 90, height: 90}}>
              <KIcon name="coffee" size={90} f={f} />
              <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - aTeh - 6} size={90} /></div>
            </div>
          ),
          text: 'Elak teh/kopi semasa makan',
          bg: RED,
          size: 24,
        },
      ]}
      mood="happy"
    />
  );
};

/* ================= 10 — Boleh dirawat bila punca diketahui ================= */
export const Rawat: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="BOLEH DIRAWAT"
      titleSize={88}
      bg={BG(C.night[1], C.violet[0])}
      hero={<KIcon name="rbc" size={250} f={f} text={String(Math.round(interpolate(f, [0, 60], [2, 5], clamp)))} />}
      items={[
        {a: at(p, 'dirawat', 2.2), icon: <Check size={70} />, text: 'Kebanyakan boleh dirawat', bg: C.green, size: 34},
        {a: at(p, 'diketahui', 3.3), icon: <MIcon name="search" size={76} />, text: 'Bila puncanya diketahui', size: 36},
      ]}
      mood="happy"
    />
  );
};

/* ================= 11 — Nurul pulih ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTenaga = at(p, 'bertenaga', 2.0);
  const aTangga = at(p, 'tangga', 3.0);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG('#7FC4F2', '#F6D6A8')}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: LEAF}} />
      <Pop at={0} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="calendar" size={56} f={f} />} text="Selepas 3 bulan" size={44} /></Pop>
      <Pop at={aTenaga} style={{left: 60, top: 680}}><Pill text="Kembali bertenaga!" bg={C.green} size={52} /></Pop>
      <Pop at={aTangga} style={{left: 60, top: 800}}><IconPill icon={<KIcon name="stairs" size={56} f={f} />} text="Naik tangga tanpa semput" size={38} /></Pop>
      <div style={{position: 'absolute', left: 580, top: 980}}><KIcon name="stairs" size={420} f={f} /></div>
      <Who preset={NURUL} x={200} y={960} w={480} mood="happy" pose="wave" seed={41} />
      <Burst f={f} a={aTenaga} x={440} y={1060} />
    </Camera>
  );
};

/* ================= 12 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Closing
      p={p}
      aSaya={at(p, 'saya doktor', 3.6)}
      lines={[
        {a: at(p, 'selalu', 0.1), node: <IconPill icon={<KIcon name="battery" size={60} f={f} text="10" />} text="Selalu letih & pucat?" size={44} />},
        {a: at(p, 'jangan tunggu', 1.5), node: <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />},
        {a: at(p, 'buat ujian', 2.4), node: <IconPill icon={<MIcon name="tube" size={60} f={f} />} text="Buat ujian darah" size={46} bg={C.green} color="#fff" />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, nurul: Nurul, haid: Haid, diagnosis: Diagnosis, lima: Lima,
  tanda: Tanda, punca: Punca, ujian: Ujian, pil: Pil, makan: Makan,
  rawat: Rawat, pulih: Pulih, penutup: Penutup,
};
