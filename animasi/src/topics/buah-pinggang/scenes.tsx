import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Burst, C, Camera, Check, clamp, Closing, Cross, FiveIntro, Glow, IconPill, interpolate, KIcon, LEAF, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, Txt, useCurrentFrame, Who, ClinicSign,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const RAHIM: AvatarPreset = {
  id: 'rahim', skin: '#C9926A', skinShade: '#AD774F', hair: 'short-grey', hairColor: '#6E6A78', top: 'shirt', topColor: '#5E9C8F', topShade: '#467A6F',
  accessory: 'glasses',
};

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/** Buah pinggang besar: berdenyut, pudar bila "rosak". */
const Kidney: React.FC<{f: number; size: number; damage?: number}> = ({f, size, damage = 0}) => (
  <div style={{position: 'relative', width: size, height: size, filter: `saturate(${1 - damage * 0.7}) brightness(${1 - damage * 0.25})`, transform: `scale(${1 + 0.03 * Math.sin(f / 8)})`}}>
    <KIcon name="kidney" size={size} />
    {damage > 0
      ? [0, 1, 2].map((i) => (
          <div key={i} style={{position: 'absolute', left: size * (0.3 + i * 0.18), top: size * (0.25 + (i % 2) * 0.3), width: size * 0.05, height: size * 0.28 * damage, background: '#3A1530', transform: `rotate(${20 - i * 25}deg)`, borderRadius: 4}} />
        ))
      : null}
  </div>
);

/* ================= 0 — Hook: tiada sakit, tapi rosak ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSakit = at(p, 'sakit', 0.4);
  const aTanda = at(p, 'tanda', 1.5);
  const aRosak = at(p, 'rosak', 4.8);
  const aKenapa = at(p, 'kenapa', 5.6);
  const dmg = interpolate(f, [aRosak - 20, aRosak + 10], [0, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={41} glow={f >= aRosak ? RED : C.violet[2]} />
      <Glow x={540} y={1050} r={460} color={f >= aRosak ? RED : C.green} opacity={0.25} />
      <Pop at={aSakit} style={{left: 60, top: 560}}><IconPill icon={<Check size={52} />} text="Tiada sakit" size={44} /></Pop>
      <Pop at={aTanda} style={{left: 560, top: 560}}><IconPill icon={<Check size={52} />} text="Tiada tanda" size={44} /></Pop>
      <div style={{position: 'absolute', left: 290, top: 760}}><Kidney f={f} size={500} damage={dmg} /></div>
      <Pop at={aRosak} style={{left: 0, width: 1080, top: 1290, display: 'flex', justifyContent: 'center'}}>
        <Pill text="…tapi sudah lama rosak" bg={RED} size={54} />
      </Pop>
      <Pop at={aKenapa} style={{left: 0, width: 1080, top: 1500, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="question" size={56} />} text="Kenapa ramai tak sedar?" size={46} bg={C.yellow} />
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Encik Rahim: diabetes + darah tinggi, ubat bila ingat, beli ubat tahan sakit ================= */
export const Rahim: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKm = at(p, 'kencing', 2.0);
  const aDt = at(p, 'darah', 3.0);
  const aUbat = at(p, 'ubat', 5.7);
  const aLutut = at(p, 'lutut', 7.8);
  const aBeli = at(p, 'beli', 8.8);
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: BG(C.violet[0], C.pink[0])}} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: '#C98C64'}} />
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Encik Rahim, 52 tahun" bg={C.navy} color={C.yellow} size={50} /></Pop>
      <Pop at={aKm} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="drop" size={56} />} text="Kencing manis" size={40} /></Pop>
      <Pop at={aDt} style={{left: 520, top: 680}}><IconPill icon={<KIcon name="bp" size={56} text="160/95" />} text="Darah tinggi" size={40} /></Pop>
      <Who preset={RAHIM} x={40} y={900} w={500} mood={f >= aLutut ? 'tired' : 'neutral'} pose={f >= aBeli ? 'point' : 'clasp'} seed={2} />
      <Pop at={aUbat} style={{left: 560, top: 820}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <KIcon name="pill" size={130} />
          <Txt size={40} color={C.navy} style={{width: 300}}>Ubat… bila ingat sahaja</Txt>
        </div>
      </Pop>
      <Pop at={aLutut} style={{left: 580, top: 1040}}><Pill text="Lutut sakit?" bg={C.labelPink} size={44} /></Pop>
      <Pop at={aBeli} style={{left: 600, top: 1160}}>
        <div style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 10}}>
          <KIcon name="cart" size={150} />
          <KIcon name="pill" size={120} />
        </div>
      </Pop>
      <Pop at={aBeli + 10} style={{left: 470, top: 1330}}><Pill text="Ubat tahan sakit sendiri" bg={RED} size={34} /></Pop>
    </Camera>
  );
};

/* ================= 2 — Tanda lewat: penat, kaki bengkak, kencing malam ================= */
export const Tanda: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const items = [
    {a: at(p, 'penat', 1.6), icon: <KIcon name="zzz" size={70} f={f} />, t: 'Cepat penat'},
    {a: at(p, 'bengkak', 2.6), icon: <KIcon name="swell" size={70} f={f} />, t: 'Kaki bengkak'},
    {a: at(p, 'malam', 4.8), icon: <KIcon name="bed" size={70} f={f} />, t: 'Kerap kencing waktu malam'},
  ];
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: BG(C.night[1], C.violet[1])}} />
      <NightSky seed={17} top="transparent" bottom="transparent" stars={40} glow={C.violet[3]} />
      {items.map((it, i) => (
        <Pop key={i} at={it.a} style={{left: 60, top: 560 + i * 120}} origin="left center">
          <IconPill icon={it.icon} text={it.t} size={42} bg={i === 1 ? RED : '#fff'} color={i === 1 ? '#fff' : C.navy} />
        </Pop>
      ))}
      <Who preset={RAHIM} x={300} y={980} w={480} mood="tired" pose="down" seed={2} />
      <div style={{position: 'absolute', left: 760, top: 1260}}><KIcon name="swell" size={200} f={f} /></div>
    </Camera>
  );
};

/* ================= 3 — Diagnosis ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aAir = at(p, 'air', 0.8);
  const aDarah = at(p, 'darah', 1.8);
  const aStamp = at(p, 'penyakit', 4.6);
  const before = f < aStamp;
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: BG(C.night[3], C.violet[2])}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      {before ? (
        <>
          <ClinicSign x={330} y={560} w={420} />
          <Pop at={aAir} style={{left: 120, top: 760}}><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><KIcon name="urine" size={200} /><Pill text="Ujian air kencing" bg={C.navy} size={34} /></div></Pop>
          <Pop at={aDarah} style={{left: 620, top: 760}}><div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><svg width={200} height={200} viewBox="0 0 120 120"><path d="M 60 10 Q 98 60 92 80 Q 86 110 60 110 Q 34 110 28 80 Q 22 60 60 10 Z" fill={RED} /></svg><Pill text="Ujian darah" bg={C.navy} size={34} /></div></Pop>
        </>
      ) : null}
      <Who preset={p.preset} x={20} y={1040} w={460} mood="neutral" pose={before ? 'chin' : 'point'} />
      <Who preset={RAHIM} x={600} y={1060} w={420} mood={before ? 'neutral' : 'sad'} pose="clasp" seed={2} />
      <Stamp f={f} a={aStamp} top="DIAGNOSIS" big="BUAH PINGGANG" sub="Penyakit kronik" bigSize={84} y={580} />
    </Camera>
  );
};

/* ================= 4 — Punca utama dialisis + 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aDial = at(p, 'dialisis', 3.8);
  return (
    <FiveIntro
      p={p}
      aFive={at(p, 'lima perkara', 5.5)}
      sub="perkara perlu anda tahu"
      glow={C.pink[0]}
      head={
        <>
          <Pop at={at(p, 'kencing', 0.8)} style={{left: 0, width: 1080, top: 560, display: 'flex', justifyContent: 'center'}}>
            <IconPill icon={<KIcon name="drop" size={60} />} text="Kencing manis = punca utama" size={44} />
          </Pop>
          <Pop at={aDial} style={{left: 0, width: 1080, top: 690, display: 'flex', justifyContent: 'center'}}>
            <IconPill icon={<KIcon name="hospital" size={60} f={f} />} text="pesakit baharu dialisis" size={42} bg={RED} color="#fff" />
          </Pop>
        </>
      }
    />
  );
};

/* ================= 5–9 — #1–#5 ================= */
export const Senyap: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="PENYAKIT SENYAP"
      titleSize={86}
      bg={BG(C.night[1], C.violet[0])}
      hero={<Kidney f={f} size={280} damage={interpolate(f, [60, 180], [0, 0.8], clamp)} />}
      items={[
        {a: at(p, 'peringkat', 1.4), icon: <KIcon name="empty" size={76} f={f} />, text: 'Peringkat awal: tiada tanda'},
        {a: at(p, 'kaki', 3.9), icon: <KIcon name="swell" size={76} f={f} />, text: 'Kaki bengkak, sesak nafas', bg: RED},
        {a: at(p, 'kerosakan', 5.9), icon: <KIcon name="warning" size={76} />, text: 'Kerosakan mungkin teruk', size: 38},
      ]}
    />
  );
};

export const Risiko: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="KENALI RISIKO"
      titleSize={92}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      grid
      hero={<KIcon name="warning" size={260} />}
      items={[
        {a: at(p, 'kencing', 1.4), icon: <KIcon name="drop" size={90} />, text: 'Kencing manis'},
        {a: at(p, 'darah', 2.4), icon: <KIcon name="bp" size={90} text="160/95" />, text: 'Darah tinggi'},
        {a: at(p, 'jantung', 3.8), icon: <KIcon name="heart" size={90} f={f} />, text: 'Penyakit jantung'},
        {a: at(p, 'keluarga', 5.0), icon: <KIcon name="person" size={90} />, text: 'Keluarga ada sakit buah pinggang', size: 28},
      ]}
    />
  );
};

export const Saringan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="SARINGAN SETIAP TAHUN"
      titleSize={70}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<KIcon name="calendar" size={260} />}
      items={[
        {a: at(p, 'berisiko', 2.0), icon: <KIcon name="warning" size={76} />, text: 'Jika berisiko'},
        {a: at(p, 'air', 3.3), icon: <KIcon name="urine" size={76} />, text: 'Ujian air kencing', bg: C.green},
        {a: at(p, 'darah', 4.3), icon: <KIcon name="drop" size={76} f={f} />, text: 'Ujian darah', bg: C.green},
        {a: at(p, 'setahun', 5.8), icon: <KIcon name="calendar" size={76} />, text: 'Sekurang-kurangnya setahun sekali', size: 32},
      ]}
      mood="happy"
    />
  );
};

export const Kawal: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="KAWAL GULA & TEKANAN DARAH"
      titleSize={62}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<KIcon name="bp" size={260} text="128/80" />}
      items={[
        {a: at(p, 'makan', 2.5), icon: <KIcon name="pill" size={76} />, text: 'Ubat setiap hari', bg: C.green},
        {a: at(p, 'dipreskripsi', 4.0), icon: <KIcon name="checklist" size={76} />, text: 'Seperti yang dipreskripsi', size: 38},
        {a: at(p, 'garam', 5.7), icon: <div style={{position: 'relative'}}><KIcon name="salt" size={76} f={f} /><div style={{position: 'absolute', left: 0, top: 0}}><Cross f={30} size={76} /></div></div>, text: 'Kurangkan garam'},
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
      title="HATI-HATI UBAT TAHAN SAKIT"
      titleSize={62}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<div style={{position: 'relative', width: 240, height: 240}}><KIcon name="pill" size={240} /><div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f} size={240} /></div></div>}
      items={[
        {a: at(p, 'antiradang', 3.0), icon: <KIcon name="pill" size={76} />, text: 'Anti-radang jangka panjang', bg: RED, size: 36},
        {a: at(p, 'nasihat', 5.3), icon: <KIcon name="talk" size={76} f={f} />, text: 'Tanya doktor dahulu'},
        {a: at(p, 'produk', 6.5), icon: <KIcon name="question" size={76} />, text: 'Produk tak jelas kandungan', size: 36},
      ]}
    />
  );
};

/* ================= 10 — Dikesan awal ================= */
export const Awal: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="DIKESAN AWAL"
      titleSize={90}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<Kidney f={f} size={260} />}
      items={[
        {a: at(p, 'diperlahankan', 2.0), icon: <KIcon name="hourglass" size={76} f={f} />, text: 'Kerosakan diperlahankan', bg: C.green, size: 38},
        {a: at(p, 'dilewatkan', 4.7), icon: <KIcon name="hospital" size={76} />, text: 'Dialisis dilewatkan / dielakkan', size: 34},
      ]}
      mood="happy"
    />
  );
};

/* ================= 11 — Rahim kini ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aUbat = at(p, 'ubat', 1.0);
  const aGaram = at(p, 'garam', 2.6);
  const aBerkala = at(p, 'berkala', 4.3);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG('#7FC4F2', '#F6D6A8')}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: LEAF}} />
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Encik Rahim kini" bg={C.green} size={56} /></Pop>
      {[{a: aUbat, i: <KIcon name="pill" size={64} />, t: 'Ubat setiap hari'}, {a: aGaram, i: <KIcon name="salt" size={64} f={f} />, t: 'Kurang garam'}, {a: aBerkala, i: <KIcon name="calendar" size={64} />, t: 'Pemeriksaan berkala'}].map((x, k) => (
        <Pop key={k} at={x.a} style={{left: 60, top: 690 + k * 115}} origin="left center"><IconPill icon={x.i} text={x.t} size={40} /></Pop>
      ))}
      <Who preset={RAHIM} x={520} y={1000} w={480} mood="happy" pose="wave" seed={2} />
      <div style={{position: 'absolute', left: 140, top: 1080}}><Kidney f={f} size={260} /></div>
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
      aSaya={at(p, 'saya doktor', 4.8)}
      lines={[
        {a: at(p, 'ada', 0.1), node: <IconPill icon={<KIcon name="drop" size={60} />} text="Kencing manis / darah tinggi?" size={40} />},
        {a: at(p, 'jangan tunggu', 1.9), node: <Pill text="Jangan tunggu bengkak" bg={C.labelPink} size={54} />},
        {a: at(p, 'buat saringan', 3.2), node: <IconPill icon={<KIcon name="kidney" size={64} f={f} />} text="Buat saringan buah pinggang" size={40} bg={C.green} color="#fff" />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, rahim: Rahim, tanda: Tanda, diagnosis: Diagnosis, lima: Lima,
  senyap: Senyap, risiko: Risiko, saringan: Saringan, kawal: Kawal, ubat: Ubat,
  awal: Awal, pulih: Pulih, penutup: Penutup,
};

// elak amaran import tidak digunakan
void MIcon;
