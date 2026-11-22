import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Bubble, Burst, C, Camera, Check, clamp, Closing, Cross, FiveIntro, Glow, IconPill, interpolate, KIcon, LEAF, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, Txt, useCurrentFrame, Who,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const AINA: AvatarPreset = {
  id: 'aina', skin: '#D49C74', skinShade: '#B9805A', hair: 'hijab', hairColor: '#2A1C24', top: 'scrubs', topColor: '#2BB3A3', topShade: '#1F8A7E',
  hijabColor: '#1F8A7E', hijabShade: '#16665D', accessory: null,
};

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/** Bateri besar yang menyusut ikut masa. */
const Drain: React.FC<{f: number; from: number; to: number; a: number; b: number; size: number}> = ({f, from, to, a, b, size}) => (
  <KIcon name="battery" size={size} f={f} text={String(Math.round(interpolate(f, [a, b], [from, to], clamp)))} />
);

/* ================= 0 — Hook ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTidur = at(p, 'tidur', 1.9);
  const aKosong = at(p, 'kosong', 5.6);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={211} glow={C.violet[3]} />
      <Glow x={540} y={1050} r={460} color={C.labelPink} opacity={0.18} />
      <div style={{position: 'absolute', left: 340, top: 640}}><Drain f={f} from={80} to={5} a={0} b={60} size={400} /></div>
      <Pop at={aTidur} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="bed" size={56} />} text="Penat walaupun sudah tidur" size={40} /></Pop>
      <Who preset={AINA} x={300} y={1060} w={480} mood="tired" pose="down" seed={14} />
      <Pop at={aKosong} style={{left: 0, width: 1080, top: 960, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Kerja terasa kosong" bg={RED} size={54} />
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Aina, jururawat, syif panjang ================= */
export const Aina: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aBulan = at(p, 'berbulanbulan', 3.0);
  const aSyif = at(p, 'syif', 4.4);
  const aRakan = at(p, 'menggantikan', 5.3);
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: BG(C.violet[0], C.pink[0])}} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: '#DDE3F0'}} />
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Aina, 34 tahun, jururawat" bg={C.navy} color={C.yellow} size={48} /></Pop>
      <Pop at={aBulan} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="calendar" size={56} />} text="Berbulan-bulan" size={40} /></Pop>
      <Pop at={aSyif} style={{left: 450, top: 680}}><IconPill icon={<KIcon name="clock" size={56} f={f * 4} />} text="Syif panjang" size={40} bg={RED} color="#fff" /></Pop>
      <Pop at={aRakan} style={{left: 60, top: 800}}><IconPill icon={<KIcon name="person" size={56} />} text="Ganti rakan yang cuti" size={38} /></Pop>
      <Who preset={AINA} x={60} y={960} w={460} mood="neutral" pose="clasp" seed={14} />
      <div style={{position: 'absolute', left: 600, top: 1000}}><KIcon name="hospital" size={360} /></div>
    </Camera>
  );
};

/* ================= 2 — Letih, sinis, tak mampu; cuti tak membantu ================= */
export const Letih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const items = [
    {a: at(p, 'letih', 0.7), t: 'Letih sepanjang masa', i: <KIcon name="battery" size={56} f={f} text="10" />},
    {a: at(p, 'sinis', 2.1), t: 'Sinis terhadap kerja', i: <KIcon name="bolt" size={56} f={f} />},
    {a: at(p, 'mampu', 4.5), t: 'Rasa tak mampu lagi', i: <KIcon name="question" size={56} />},
  ];
  const aCuti = at(p, 'bercuti', 5.5);
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: BG(C.night[1], C.violet[1])}} />
      <NightSky seed={53} top="transparent" bottom="transparent" stars={40} glow={C.violet[3]} />
      {items.map((it, i) => <Pop key={i} at={it.a} style={{left: 60, top: 560 + i * 115}} origin="left center"><IconPill icon={it.i} text={it.t} size={38} bg={C.navy} color="#fff" /></Pop>)}
      <Who preset={AINA} x={60} y={980} w={460} mood="tired" pose="down" seed={14} />
      <Pop at={aCuti} style={{left: 560, top: 960}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
          <div style={{position: 'relative'}}><KIcon name="sun" size={200} f={f} /><div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - aCuti} size={200} /></div></div>
          <Pill text="Cuti seminggu tak membantu" bg={RED} size={32} />
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 3 — Diagnosis: BURNOUT ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aStamp = at(p, 'burnout', 2.9);
  const before = f < aStamp;
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: BG(C.night[3], C.violet[2])}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      {before ? <Pop at={0.5} style={{left: 0, width: 1080, top: 720, display: 'flex', justifyContent: 'center'}}><IconPill icon={<KIcon name="checklist" size={56} />} text="Penilaian doktor" size={44} /></Pop> : null}
      <Who preset={p.preset} x={20} y={1040} w={460} mood="neutral" pose={before ? 'chin' : 'point'} />
      <Who preset={AINA} x={600} y={1060} w={420} mood="sad" pose="clasp" seed={14} />
      <Stamp f={f} a={aStamp} top="DIAGNOSIS" big="BURNOUT" sub="Akibat tekanan kerja" bigSize={140} y={560} />
    </Camera>
  );
};

/* ================= 4 — Sesiapa sahaja + 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => (
  <FiveIntro
    p={p}
    aFive={at(p, 'lima perkara', 3.0)}
    sub="perkara perlu anda tahu"
    glow={C.pink[0]}
    head={
      <Pop at={at(p, 'sesiapa', 1.2)} style={{left: 0, width: 1080, top: 580, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="person" size={56} />} text="Boleh berlaku kepada sesiapa" size={42} />
      </Pop>
    }
  />
);

/* ================= 5–9 — #1–#5 ================= */
export const Habis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="KELETIHAN MELAMPAU"
      titleSize={76}
      bg={BG(C.night[1], C.violet[0])}
      hero={<Drain f={f} from={60} to={3} a={10} b={90} size={260} />}
      items={[
        {a: at(p, 'tenaga', 2.1), icon: <KIcon name="battery" size={76} f={f} text="5" />, text: 'Tenaga terasa habis', bg: RED},
        {a: at(p, 'berehat', 4.0), icon: <KIcon name="bed" size={76} />, text: 'Walaupun selepas berehat', size: 36},
      ]}
    />
  );
};

export const Jauh: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="MENJAUH DARI KERJA"
      titleSize={76}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<KIcon name="heartbreak" size={240} f={f} />}
      items={[
        {a: at(p, 'sinis', 2.0), icon: <KIcon name="bolt" size={76} f={f} />, text: 'Sinis', bg: RED},
        {a: at(p, 'negatif', 2.8), icon: <KIcon name="warning" size={76} />, text: 'Negatif'},
        {a: at(p, 'peduli', 4.0), icon: <KIcon name="empty" size={76} f={f} />, text: 'Tidak peduli lagi'},
      ]}
    />
  );
};

export const Mampu: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="RASA TIDAK MAMPU"
      titleSize={80}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<KIcon name="question" size={240} />}
      items={[
        {a: at(p, 'prestasi', 2.0), icon: <KIcon name="checklist" size={76} />, text: 'Prestasi kerja menurun', bg: RED},
        {a: at(p, 'keyakinan', 3.4), icon: <MIcon name="brain" size={76} f={f} />, text: 'Keyakinan diri hilang'},
      ]}
    />
  );
};

export const Punca: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="PUNCA: TEKANAN KERJA"
      titleSize={72}
      bg={BG(C.night[1], C.violet[1])}
      hero={<KIcon name="laptop" size={240} f={f} />}
      items={[
        {a: at(p, 'berpanjangan', 2.5), icon: <KIcon name="hourglass" size={76} f={f} />, text: 'Berpanjangan & tidak diurus', size: 34},
        {a: at(p, 'pertubuhan', 4.5), icon: <KIcon name="checklist" size={76} />, text: 'WHO: fenomena pekerjaan', size: 36},
        {a: at(p, 'kelemahan', 8.3), icon: <Check size={70} />, text: 'Bukan kelemahan diri', bg: C.green},
      ]}
    />
  );
};

export const Tindak: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="BERTINDAK AWAL"
      titleSize={88}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      grid
      items={[
        {a: at(p, 'bincang', 1.8), icon: <KIcon name="talk" size={90} f={f} />, text: 'Bincang beban kerja', bg: C.green, size: 28},
        {a: at(p, 'had', 3.9), icon: <KIcon name="clock" size={90} f={f} />, text: 'Had waktu kerja', size: 30},
        {a: at(p, 'cukupkan', 5.4), icon: <KIcon name="bed" size={90} />, text: 'Cukupkan tidur', bg: C.green},
        {a: at(p, 'bersenam', 6.6), icon: <KIcon name="shoe" size={90} />, text: 'Bersenam'},
        {a: at(p, 'sokongan', 8.0), icon: <KIcon name="person" size={90} />, text: 'Dapatkan sokongan', bg: C.green, size: 28},
      ]}
      mood="happy"
    />
  );
};

/* ================= 10 — Bila jumpa doktor ================= */
export const Doktor: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="JUMPA DOKTOR JIKA"
      titleSize={80}
      bg={BG(C.night[1], C.violet[0])}
      hero={<KIcon name="hospital" size={240} />}
      items={[
        {a: at(p, 'berterusan', 0.6), icon: <KIcon name="calendar" size={76} />, text: 'Tanda berterusan'},
        {a: at(p, 'murung', 2.1), icon: <KIcon name="heartbreak" size={76} f={f} />, text: 'Murung & hilang minat', bg: RED, size: 36},
        {a: at(p, 'bertindih', 6.6), icon: <MIcon name="brain" size={76} f={f} />, text: 'Boleh bertindih dengan kemurungan', size: 30},
      ]}
    />
  );
};

/* ================= 11 — Aina pulih ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTenaga = at(p, 'bertenaga', 2.9);
  const aSenyum = at(p, 'tersenyum', 3.8);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG('#7FC4F2', '#F6D6A8')}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: LEAF}} />
      <Pop at={0} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="checklist" size={56} />} text="Beban kerja diubah suai" size={42} /></Pop>
      <div style={{position: 'absolute', left: 620, top: 700}}><Drain f={f} from={10} to={100} a={aTenaga - 10} b={aTenaga + 30} size={300} /></div>
      <Pop at={aTenaga} style={{left: 60, top: 680}}><Pill text="Kembali bertenaga!" bg={C.green} size={52} /></Pop>
      <Who preset={AINA} x={200} y={960} w={480} mood="happy" pose="wave" seed={14} />
      <Burst f={f} a={aSenyum} x={440} y={1060} />
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
        {a: at(p, 'penat', 0.1), node: <IconPill icon={<KIcon name="battery" size={60} f={f} text="10" />} text="Penat yang tak hilang-hilang?" size={40} />},
        {a: at(p, 'jangan tunggu', 1.3), node: <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />},
        {a: at(p, 'dapatkan', 2.4), node: <IconPill icon={<KIcon name="talk" size={60} f={f} />} text="Dapatkan bantuan" size={44} bg={C.green} color="#fff" />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, aina: Aina, letih: Letih, diagnosis: Diagnosis, lima: Lima,
  habis: Habis, jauh: Jauh, mampu: Mampu, punca: Punca, tindak: Tindak,
  doktor: Doktor, pulih: Pulih, penutup: Penutup,
};

void Bubble; void Txt;
