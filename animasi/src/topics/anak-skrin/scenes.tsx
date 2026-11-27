import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Burst, C, Camera, Check, Closing, Cross, FiveIntro, Glow, IconPill, KIcon, LEAF,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, Txt, useCurrentFrame, Who,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const AQIL: AvatarPreset = {
  id: 'aqil', skin: '#E6B892', skinShade: '#CC9C76', hair: 'short', hairColor: '#2A1C24', top: 'tee', topColor: '#F6C945', topShade: '#D9AA2A',
  accessory: null,
};
export const IBU: AvatarPreset = {
  id: 'ibu-aqil', skin: '#D9A47C', skinShade: '#BE8860', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#2BB3A3', topShade: '#1F8A7E',
  hijabColor: '#E4629F', hijabShade: '#C24A82', accessory: null,
};

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/** Telefon besar bercahaya di depan muka Aqil. */
const Glare: React.FC<{x: number; y: number; f: number; size?: number}> = ({x, y, f, size = 160}) => (
  <div style={{position: 'absolute', left: x, top: y}}>
    <div style={{position: 'absolute', left: -size * 0.4, top: -size * 0.3, width: size * 1.8, height: size * 1.6, borderRadius: '50%', background: '#4FA3FF', opacity: 0.18 + 0.08 * Math.sin(f / 3), filter: 'blur(20px)'}} />
    <KIcon name="phone" size={size} f={f} />
  </div>
);

/* ================= 0 — Hook ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aBerapa = at(p, 'berapa', 3.3);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={301} glow={'#4FA3FF'} />
      <Pop at={0.1} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="phone" size={56} f={f} />} text="Asyik dengan telefon…" size={42} /></Pop>
      <Pop at={1.9} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="talk" size={56} />} text="Tak mahu bercakap?" size={40} bg={RED} color="#fff" /></Pop>
      <Who preset={AQIL} x={380} y={1060} w={330} mood="neutral" pose="clasp" seed={8} />
      <Glare x={470} y={1140} f={f} size={140} />
      <Pop at={aBerapa} style={{left: 0, width: 1080, top: 1500, display: 'flex', justifyContent: 'center'}}><Pill text="Berapa lama yang sesuai?" bg={C.yellow} color={C.navy} size={52} /></Pop>
    </Camera>
  );
};

/* ================= 1 — Aqil, 2 tahun: menangis → diberi telefon → berjam-jam ================= */
export const Aqil: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aNangis = at(p, 'menangis', 2.4);
  const aPhone = at(p, 'telefon', 3.8);
  const aJam = at(p, 'berjamjam', 6.7);
  const hasPhone = f >= aPhone;
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: BG(C.violet[0], C.pink[0])}} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: '#C98C64'}} />
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Adik Aqil, 2 tahun" bg={C.navy} color={C.yellow} size={50} /></Pop>
      <Pop at={aNangis} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="baby" size={52} />} text="Setiap kali menangis…" size={36} /></Pop>
      <Pop at={aPhone} style={{left: 60, top: 790}}><IconPill icon={<KIcon name="phone" size={52} f={f} />} text="…diberi telefon supaya diam" size={34} /></Pop>
      <Pop at={aJam} style={{left: 60, top: 900}}><IconPill icon={<KIcon name="clock" size={52} f={f * 4} />} text="Berjam-jam setiap hari" size={38} bg={RED} color="#fff" /></Pop>
      <Who preset={IBU} x={40} y={1000} w={420} mood="tired" pose="point" seed={9} />
      <Who preset={AQIL} x={560} y={1140} w={300} mood={hasPhone ? 'neutral' : 'sad'} pose="clasp" seed={8} />
      {hasPhone ? <Glare x={640} y={1220} f={f} size={120} /> : null}
    </Camera>
  );
};

/* ================= 2 — Bercakap sedikit, mengamuk, sukar tidur ================= */
export const Amuk: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const items = [
    {a: at(p, 'sedikit', 0.8), t: 'Bercakap sedikit sahaja', i: <KIcon name="talk" size={56} />},
    {a: at(p, 'mengamuk', 2.3), t: 'Mengamuk bila telefon diambil', i: <KIcon name="bolt" size={56} f={f} />},
    {a: at(p, 'tidur', 4.8), t: 'Sukar tidur', i: <KIcon name="moon" size={56} f={f} />},
  ];
  const tantrum = f >= items[1].a;
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: BG(C.night[1], '#5A1F3A')}} />
      <NightSky seed={64} top="transparent" bottom="transparent" stars={30} glow={RED} />
      {items.map((it, i) => <Pop key={i} at={it.a} style={{left: 60, top: 560 + i * 115}} origin="left center"><IconPill icon={it.i} text={it.t} size={36} bg={C.navy} color="#fff" /></Pop>)}
      <div style={{position: 'absolute', left: 400, top: 1080, transform: tantrum ? `translate(${Math.sin(f * 1.5) * 6}px, 0)` : undefined}}>
        <Who preset={AQIL} x={0} y={0} w={320} mood={tantrum ? 'angry' : 'neutral'} pose="clasp" seed={8} />
      </div>
      {tantrum ? [0, 1].map((i) => <div key={i} style={{position: 'absolute', left: 360 + i * 300, top: 1040, opacity: Math.abs(Math.sin(f / 3 + i))}}><KIcon name="bolt" size={90} f={f} /></div>) : null}
    </Camera>
  );
};

/* ================= 3 — Doktor menilai: lebih banyak bercakap & bermain ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aStamp = at(p, 'bercakap', 3.4);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: BG(C.night[3], C.violet[2])}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.green} opacity={0.3} />
      {f < aStamp - 6 ? <Pop at={0.3} style={{left: 0, width: 1080, top: 720, display: 'flex', justifyContent: 'center'}}><IconPill icon={<KIcon name="checklist" size={56} />} text="Menilai perkembangan" size={44} /></Pop> : null}
      <Who preset={p.preset} x={20} y={1040} w={460} mood="neutral" pose={f < aStamp ? 'chin' : 'point'} />
      <Who preset={IBU} x={560} y={1020} w={400} mood="curious" pose="clasp" seed={9} />
      <Who preset={AQIL} x={790} y={1250} w={220} mood="neutral" pose="clasp" seed={8} />
      <Stamp f={f} a={aStamp} top="NASIHAT DOKTOR" big="BERCAKAP & BERMAIN" sub="Bukan skrin" bigSize={76} y={560} />
    </Camera>
  );
};

/* ================= 4 — Otak berkembang melalui interaksi + 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => (
  <FiveIntro
    p={p}
    aFive={at(p, 'lima perkara', 3.2)}
    sub="perkara ibu bapa perlu tahu"
    glow={C.pink[0]}
    head={
      <Pop at={at(p, 'interaksi', 1.9)} style={{left: 0, width: 1080, top: 580, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="talk" size={56} />} text="Otak berkembang melalui interaksi" size={38} />
      </Pop>
    }
  />
);

/* ================= 5–9 — #1–#5 ================= */
export const Bawah2: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aNo = at(p, 'tidak', 2.4);
  return (
    <PointScene
      p={p}
      title="BAWAH 2 TAHUN"
      titleSize={88}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={
        <div style={{position: 'relative', width: 240, height: 240}}>
          <KIcon name="phone" size={240} f={f} />
          <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - aNo} size={240} /></div>
        </div>
      }
      items={[
        {a: aNo, icon: <KIcon name="baby" size={76} />, text: 'Skrin tidak disyorkan', bg: RED},
      ]}
    />
  );
};

export const Dua4: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="UMUR 2–4 TAHUN"
      titleSize={88}
      bg={BG(C.night[1], C.violet[0])}
      hero={<KIcon name="clock" size={240} f={f} />}
      items={[
        {a: at(p, 'satu jam', 2.3), icon: <KIcon name="clock" size={76} f={f} />, text: 'Maksimum 1 jam sehari', bg: C.labelPink},
        {a: at(p, 'lebih kurang', 4.2), icon: <Check size={70} />, text: 'Lebih kurang, lebih baik', bg: C.green},
      ]}
    />
  );
};

export const Bersama: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="TONTON BERSAMA"
      titleSize={86}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<KIcon name="tv" size={250} f={f} />}
      items={[
        {a: at(p, 'tonton', 0.7), icon: <KIcon name="person" size={76} />, text: 'Tonton bersama anak', bg: C.green},
        {a: at(p, 'kandungan', 2.3), icon: <KIcon name="checklist" size={76} />, text: 'Kandungan yang sesuai'},
        {a: at(p, 'berbual', 3.6), icon: <KIcon name="talk" size={76} f={f} />, text: 'Berbual tentangnya', bg: C.green},
      ]}
      mood="happy"
    />
  );
};

export const Elak: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aMakan = at(p, 'makan', 1.8);
  const aTidur = at(p, 'sebelum', 2.5);
  return (
    <PointScene
      p={p}
      title="WAKTU MAKAN & TIDUR"
      titleSize={74}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      grid
      items={[
        {
          a: aMakan,
          icon: (
            <div style={{position: 'relative', width: 90, height: 90}}>
              <KIcon name="bowl" size={90} />
              <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - aMakan - 6} size={90} /></div>
            </div>
          ),
          text: 'Tiada skrin semasa makan',
          bg: RED,
          size: 24,
        },
        {
          a: aTidur,
          icon: (
            <div style={{position: 'relative', width: 90, height: 90}}>
              <KIcon name="bed" size={90} />
              <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - aTidur - 6} size={90} /></div>
            </div>
          ),
          text: 'Tiada skrin sebelum tidur',
          size: 24,
        },
        {a: at(p, 'simpan', 3.6), icon: <KIcon name="phone" size={90} f={f} />, text: 'Telefon di luar bilik tidur', bg: C.green, size: 24},
      ]}
    />
  );
};

export const Ganti: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="GANTIKAN DENGAN"
      titleSize={84}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      grid
      items={[
        {a: at(p, 'bermain', 1.4), icon: <KIcon name="toy" size={90} f={f} />, text: 'Bermain', bg: C.green, size: 32},
        {a: at(p, 'membaca', 2.2), icon: <KIcon name="book" size={90} />, text: 'Membaca buku', size: 30},
        {a: at(p, 'menyanyi', 3.2), icon: <KIcon name="music" size={90} f={f} />, text: 'Menyanyi', bg: C.green, size: 32},
        {a: at(p, 'berbual', 4.1), icon: <KIcon name="talk" size={90} f={f} />, text: 'Berbual', size: 32},
        {a: at(p, 'contoh', 6.3), icon: <KIcon name="person" size={90} />, text: 'Ibu bapa jadi contoh', bg: C.labelPink, size: 26},
      ]}
      mood="happy"
    />
  );
};

/* ================= 10 — Lambat bercakap? Jumpa doktor ================= */
export const Nilai: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="JUMPA DOKTOR JIKA"
      titleSize={80}
      bg={BG(C.night[1], C.violet[0])}
      hero={<KIcon name="hospital" size={240} />}
      items={[
        {a: at(p, 'lambat', 0.7), icon: <KIcon name="talk" size={76} f={f} />, text: 'Lambat bercakap', bg: RED},
        {a: at(p, 'berinteraksi', 2.3), icon: <KIcon name="person" size={76} />, text: 'Kurang berinteraksi'},
        {a: at(p, 'penilaian', 4.2), icon: <KIcon name="checklist" size={76} />, text: 'Penilaian awal', bg: C.green},
      ]}
    />
  );
};

/* ================= 11 — Aqil lebih bercakap, membaca bersama ibu ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aCakap = at(p, 'bercakap', 2.2);
  const aBuku = at(p, 'membaca', 3.4);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG('#7FC4F2', '#F6D6A8')}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: LEAF}} />
      <Pop at={0} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="calendar" size={56} f={f} />} text="Selepas beberapa bulan" size={40} /></Pop>
      <Pop at={aCakap} style={{left: 60, top: 680}}><Pill text="Lebih banyak bercakap!" bg={C.green} size={48} /></Pop>
      <Pop at={aBuku} style={{left: 60, top: 800}}><IconPill icon={<KIcon name="book" size={56} />} text="Suka membaca bersama ibu" size={36} /></Pop>
      <Who preset={IBU} x={120} y={960} w={440} mood="happy" pose="clasp" seed={9} />
      <Who preset={AQIL} x={560} y={1120} w={300} mood="happy" pose="wave" seed={8} />
      <div style={{position: 'absolute', left: 430, top: 1260}}><KIcon name="book" size={200} /></div>
      <Burst f={f} a={aCakap} x={600} y={1100} />
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
        {a: at(p, 'kurangkan', 0.1), node: <IconPill icon={<KIcon name="phone" size={60} f={f} />} text="Kurangkan skrin" size={46} />},
        {a: at(p, 'tambah', 1.2), node: <IconPill icon={<KIcon name="heart" size={60} f={f} />} text="Tambah masa bersama" size={44} bg={C.green} color="#fff" />},
        {a: at(p, 'jangan tunggu', 2.5), node: <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, aqil: Aqil, amuk: Amuk, diagnosis: Diagnosis, lima: Lima,
  bawah2: Bawah2, dua4: Dua4, bersama: Bersama, elak: Elak, ganti: Ganti,
  nilai: Nilai, pulih: Pulih, penutup: Penutup,
};

void Txt;
