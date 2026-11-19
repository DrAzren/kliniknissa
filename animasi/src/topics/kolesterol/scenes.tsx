import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Burst, C, Camera, Check, clamp, Closing, Cross, FiveIntro, Glow, IconPill, interpolate, KIcon, LEAF, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, useCurrentFrame, Who, ClinicSign,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const ROSNAH: AvatarPreset = {
  id: 'rosnah', skin: '#D49C74', skinShade: '#B9805A', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#F29CBC', topShade: '#D97A9E',
  hijabColor: '#2BB3A3', hijabShade: '#1F8A7E', accessory: null,
};

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/** Salur darah besar: plak kuning bertambah ikut `k` (0–1), aliran sel darah. */
const Vessel: React.FC<{f: number; w: number; k: number}> = ({f, w, k}) => {
  const h = w * 0.42;
  return (
    <svg width={w} height={h} viewBox="0 0 400 168" style={{overflow: 'visible'}}>
      <rect x={0} y={10} width={400} height={148} rx={74} fill="#E07A93" />
      <rect x={0} y={34} width={400} height={100} rx={50} fill="#7A1631" />
      <path d={`M 120 34 Q 200 ${34 + 70 * k} 280 34 Z`} fill={C.yellow} />
      <path d={`M 150 134 Q 210 ${134 - 46 * k} 270 134 Z`} fill={C.yellow} />
      {Array.from({length: 6}).map((_, i) => {
        const x = (f * (4 - 2.5 * k) + i * 70) % 420 - 10;
        return <ellipse key={i} cx={x} cy={84 + Math.sin(i) * 14} rx={14} ry={9} fill="#E8475F" />;
      })}
    </svg>
  );
};

/* ================= 0 — Hook ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSihat = at(p, 'sihat', 0.8);
  const aSakit = at(p, 'sakit', 1.8);
  const aSalur = at(p, 'salur', 3.5);
  const aKenapa = at(p, 'kenapa', 5.8);
  const k = interpolate(f, [aSalur, aSalur + 50], [0, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={141} glow={f >= aSalur ? RED : C.green} />
      <Glow x={540} y={1050} r={460} color={f >= aSalur ? RED : C.green} opacity={0.22} />
      <Pop at={aSihat} style={{left: 60, top: 560}}><IconPill icon={<Check size={52} />} text="Nampak sihat" size={42} /></Pop>
      <Pop at={aSakit} style={{left: 560, top: 560}}><IconPill icon={<Check size={52} />} text="Tiada sakit" size={42} /></Pop>
      <Pop at={aSalur - 4} style={{left: 140, top: 820}}><Vessel f={f} w={800} k={k} /></Pop>
      <Pop at={aSalur + 20} style={{left: 0, width: 1080, top: 1220, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Salur darah tersumbat?" bg={RED} size={54} />
      </Pop>
      <Pop at={aKenapa} style={{left: 0, width: 1080, top: 1480, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="question" size={56} />} text="Kenapa?" size={52} bg={C.yellow} />
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Puan Rosnah: bergoreng, bersantan, tak pernah periksa ================= */
export const Rosnah: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aGor = at(p, 'bergoreng', 4.9);
  const aSan = at(p, 'bersantan', 5.7);
  const aTak = at(p, 'pernah', 7.0);
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: BG(C.violet[0], C.pink[0])}} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: '#C98C64'}} />
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Puan Rosnah, 45 tahun, kerani" bg={C.navy} color={C.yellow} size={46} /></Pop>
      <Pop at={aGor} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="wok" size={60} f={f} />} text="Bergoreng" size={40} /></Pop>
      <Pop at={aSan} style={{left: 440, top: 680}}><IconPill icon={<KIcon name="bowl" size={60} f={f} />} text="Bersantan" size={40} /></Pop>
      <Pop at={aTak} style={{left: 60, top: 800}}><IconPill icon={<div style={{position: 'relative'}}><KIcon name="drop" size={56} /><div style={{position: 'absolute', left: 0, top: 0}}><Cross f={30} size={56} /></div></div>} text="Tak pernah periksa darah" size={38} bg={RED} color="#fff" /></Pop>
      <Who preset={ROSNAH} x={40} y={960} w={480} mood="happy" pose="clasp" seed={6} />
      <div style={{position: 'absolute', left: 600, top: 1060}}><KIcon name="wok" size={340} f={f} /></div>
    </Camera>
  );
};

/* ================= 2 — Abang sakit jantung umur 50 ================= */
export const Abang: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aJan = at(p, 'jantung', 1.8);
  const aUmur = at(p, 'umur', 2.7);
  const aRisau = at(p, 'risau', 4.8);
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: BG(C.night[1], '#5A1F3A')}} />
      <NightSky seed={31} top="transparent" bottom="transparent" stars={40} glow={RED} />
      <Pop at={aJan} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="heartbreak" size={60} f={f} />} text="Abang: serangan jantung" size={42} bg={RED} color="#fff" /></Pop>
      <Pop at={aUmur} style={{left: 60, top: 680}}><Pill text="Pada umur 50 tahun" bg={C.navy} color={C.yellow} size={44} /></Pop>
      <div style={{position: 'absolute', left: 640, top: 820}}><KIcon name="heart" size={300} f={f * 2} /></div>
      <Who preset={ROSNAH} x={80} y={960} w={480} mood={f >= aRisau ? 'shock' : 'sad'} pose="clasp" seed={6} />
      <Pop at={aRisau} style={{left: 520, top: 1200}}><Pill text="Rosnah mula risau" bg={C.labelPink} size={38} /></Pop>
    </Camera>
  );
};

/* ================= 3 — Diagnosis ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aUji = at(p, 'ujian', 0.6);
  const aStamp = at(p, 'kolesterol', 3.5);
  const before = f < aStamp;
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: BG(C.night[3], C.violet[2])}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      {before ? (
        <>
          <ClinicSign x={330} y={560} w={420} />
          <Pop at={aUji} style={{left: 0, width: 1080, top: 780, display: 'flex', justifyContent: 'center'}}>
            <IconPill icon={<svg width={60} height={60} viewBox="0 0 120 120"><path d="M 60 10 Q 98 60 92 80 Q 86 110 60 110 Q 34 110 28 80 Q 22 60 60 10 Z" fill={RED} /></svg>} text="Ujian darah" size={44} />
          </Pop>
        </>
      ) : null}
      <Who preset={p.preset} x={20} y={1040} w={460} mood="neutral" pose={before ? 'chin' : 'point'} />
      <Who preset={ROSNAH} x={600} y={1060} w={420} mood={before ? 'neutral' : 'sad'} pose="clasp" seed={6} />
      <Stamp f={f} a={aStamp} top="DIAGNOSIS" big="KOLESTEROL" sub="Tinggi" bigSize={100} y={580} />
    </Camera>
  );
};

/* ================= 4 — Tiada tanda + 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => (
  <FiveIntro
    p={p}
    aFive={at(p, 'lima perkara', 2.8)}
    sub="perkara perlu anda tahu"
    glow={C.pink[0]}
    head={
      <Pop at={at(p, 'tiada', 1.2)} style={{left: 0, width: 1080, top: 580, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="empty" size={60} f={30} />} text="Biasanya tiada tanda" size={46} bg={RED} color="#fff" />
      </Pop>
    }
  />
);

/* ================= 5–9 — #1–#5 ================= */
export const Ldl: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="KOLESTEROL JAHAT"
      titleSize={82}
      bg={BG(C.night[1], C.violet[0])}
      hero={<Vessel f={f} w={330} k={interpolate(f, [40, 160], [0.2, 1], clamp)} />}
      items={[
        {a: at(p, 'ldl', 2.3), icon: <KIcon name="drop" size={76} />, text: 'LDL tinggi', bg: RED},
        {a: at(p, 'melekat', 3.6), icon: <KIcon name="artery" size={76} f={f} />, text: 'Melekat pada salur darah', size: 36},
        {a: at(p, 'plak', 6.0), icon: <KIcon name="warning" size={76} />, text: 'Membentuk plak'},
      ]}
    />
  );
};

export const Risiko: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="RISIKO SERIUS"
      titleSize={92}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<KIcon name="heartbreak" size={260} f={f} />}
      items={[
        {a: at(p, 'jantung', 3.3), icon: <KIcon name="heart" size={76} f={f} />, text: 'Serangan jantung', bg: RED},
        {a: at(p, 'strok', 4.2), icon: <MIcon name="brain" size={76} f={f} />, text: 'Strok', bg: RED},
      ]}
    />
  );
};

export const Ujian: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="BUAT UJIAN DARAH"
      titleSize={80}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      grid
      items={[
        {a: at(p, 'kencing', 2.3), icon: <KIcon name="drop" size={90} />, text: 'Kencing manis'},
        {a: at(p, 'darah', 3.3), icon: <KIcon name="bp" size={90} text="150/95" />, text: 'Darah tinggi'},
        {a: at(p, 'berat', 4.3), icon: <KIcon name="scale" size={90} f={f} />, text: 'Berat berlebihan'},
        {a: at(p, 'merokok', 5.3), icon: <KIcon name="cigarette" size={90} f={f} />, text: 'Merokok'},
        {a: at(p, 'keluarga', 6.6), icon: <KIcon name="heart" size={90} f={f} />, text: 'Keluarga sakit jantung awal', size: 26},
      ]}
      mood="happy"
    />
  );
};

export const Gaya: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="UBAH GAYA HIDUP"
      titleSize={84}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      grid
      items={[
        {a: at(p, 'bergoreng', 1.8), icon: <div style={{position: 'relative'}}><KIcon name="wok" size={90} f={f} /><div style={{position: 'absolute', left: 0, top: 0}}><Cross f={30} size={90} /></div></div>, text: 'Kurang goreng & santan', bg: RED, size: 26},
        {a: at(p, 'sayur', 4.6), icon: <KIcon name="veg" size={90} />, text: 'Lebih sayur', bg: C.green},
        {a: at(p, 'bersenam', 5.2), icon: <KIcon name="shoe" size={90} />, text: 'Bersenam', bg: C.green},
        {a: at(p, 'berhenti', 6.2), icon: <KIcon name="nosmoke" size={90} />, text: 'Berhenti merokok', bg: C.green},
      ]}
      mood="happy"
    />
  );
};

export const Ubat: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="UBAT JIKA PERLU"
      titleSize={86}
      bg={BG(C.night[1], C.violet[1])}
      hero={<KIcon name="pill" size={240} />}
      items={[
        {a: at(p, 'penurun', 2.6), icon: <KIcon name="pill" size={76} />, text: 'Ubat penurun kolesterol', size: 36},
        {a: at(p, 'risiko', 4.1), icon: <KIcon name="checklist" size={76} />, text: 'Ikut tahap risiko anda'},
        {a: at(p, 'jangan', 5.0), icon: <KIcon name="talk" size={76} f={f} />, text: 'Jangan berhenti sendiri', bg: RED, size: 38},
      ]}
    />
  );
};

/* ================= 10 — Risiko dikurangkan ================= */
export const Kurang: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="RISIKO BERKURANG"
      titleSize={82}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<Vessel f={f} w={330} k={0.15} />}
      items={[
        {a: at(p, 'rawatan', 0.5), icon: <Check size={70} />, text: 'Rawatan yang betul', bg: C.green},
        {a: at(p, 'dikurangkan', 3.4), icon: <KIcon name="heart" size={76} f={f} />, text: 'Jantung & strok: risiko turun', size: 34},
      ]}
      mood="happy"
    />
  );
};

/* ================= 11 — Rosnah kini ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aMasak = at(p, 'masak', 1.0);
  const aJalan = at(p, 'berjalan', 2.1);
  const aBerkala = at(p, 'berkala', 4.6);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG('#7FC4F2', '#F6D6A8')}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: LEAF}} />
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Puan Rosnah kini" bg={C.green} size={56} /></Pop>
      {[{a: aMasak, i: <KIcon name="veg" size={60} />, t: 'Masak lebih sihat'}, {a: aJalan, i: <KIcon name="shoe" size={60} />, t: 'Jalan pantas setiap petang'}, {a: aBerkala, i: <KIcon name="calendar" size={60} />, t: 'Pemeriksaan berkala'}].map((x, k) => (
        <Pop key={k} at={x.a} style={{left: 60, top: 680 + k * 112}} origin="left center"><IconPill icon={x.i} text={x.t} size={38} /></Pop>
      ))}
      <div style={{position: 'absolute', left: 470 + Math.sin(f / 10) * 30, top: 1000}}><Who preset={ROSNAH} x={0} y={0} w={460} mood="happy" pose="wave" seed={6} /></div>
      <div style={{position: 'absolute', left: 120, top: 1150}}><KIcon name="veg" size={220} /></div>
      <Burst f={f} a={aBerkala} x={760} y={1060} />
    </Camera>
  );
};

/* ================= 12 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Closing
      p={p}
      aSaya={at(p, 'saya doktor', 4.9)}
      lines={[
        {a: at(p, 'rasa', 0.1), node: <IconPill icon={<Check size={52} />} text="Rasa sihat ≠ kolesterol normal" size={38} />},
        {a: at(p, 'jangan tunggu', 2.8), node: <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />},
        {a: at(p, 'buat ujian', 3.6), node: <IconPill icon={<KIcon name="drop" size={60} f={f} />} text="Buat ujian darah" size={44} bg={C.green} color="#fff" />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, rosnah: Rosnah, abang: Abang, diagnosis: Diagnosis, lima: Lima,
  ldl: Ldl, risiko: Risiko, ujian: Ujian, gaya: Gaya, ubat: Ubat,
  kurang: Kurang, pulih: Pulih, penutup: Penutup,
};
