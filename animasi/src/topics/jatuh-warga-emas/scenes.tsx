import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Burst, C, Camera, Check, clamp, Closing, Cross, FiveIntro, Glow, IconPill, interpolate, KIcon, LEAF, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, useCurrentFrame, Who, WATER,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const HAMID: AvatarPreset = {
  id: 'hamid', skin: '#C9926A', skinShade: '#AD774F', hair: 'short-grey', hairColor: '#B8B8C4', top: 'shirt', topColor: '#5B6B8C', topShade: '#46536E',
  accessory: 'glasses-round',
};
export const ISTERI: AvatarPreset = {
  id: 'isteri-hamid', skin: '#D49C74', skinShade: '#B9805A', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#8E5BC6', topShade: '#6E44A0',
  hijabColor: '#C9D4E5', hijabShade: '#9AA8BF', accessory: null,
};

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/** Hamid terbaring di lantai (avatar diputar). */
const Fallen: React.FC<{x: number; y: number; w: number; f: number}> = ({x, y, w, f}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: `rotate(-80deg) translateX(${Math.sin(f / 10) * 2}px)`, transformOrigin: 'center center'}}>
    <Who preset={HAMID} x={0} y={0} w={w} mood="sad" pose="down" seed={12} />
  </div>
);

/** Lantai bilik air berjubin. */
const Tiles: React.FC<{top: number; wet?: boolean}> = ({top, wet}) => (
  <div style={{position: 'absolute', left: 0, top, width: 1080, height: 1920 - top, background: '#DFF3FF', backgroundImage: 'linear-gradient(#B8D8EE 3px, transparent 3px), linear-gradient(90deg, #B8D8EE 3px, transparent 3px)', backgroundSize: '120px 120px'}}>
    {wet ? [0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', left: 160 + i * 300, top: 60 + (i % 2) * 90, width: 200, height: 50, borderRadius: '50%', background: WATER, opacity: 0.35}} />) : null}
  </div>
);

/* ================= 0 — Hook ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aCegah = at(p, 'dicegah', 5.3);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={281} glow={C.labelPink} />
      <Glow x={540} y={1050} r={460} color={C.labelPink} opacity={0.2} />
      <Pop at={0.1} style={{left: 0, width: 1080, top: 560, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="cane" size={64} />} text="Satu jatuh boleh ubah hidup" size={44} bg={RED} color="#fff" />
      </Pop>
      <Who preset={HAMID} x={200} y={980} w={460} mood="neutral" pose="clasp" seed={12} />
      <div style={{position: 'absolute', left: 620, top: 1080}}><KIcon name="cane" size={300} /></div>
      <Pop at={aCegah} style={{left: 0, width: 1080, top: 700, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<Check size={56} />} text="Kebanyakannya boleh dicegah" size={44} bg={C.green} color="#fff" />
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Pak Hamid, 72: malam, ke tandas, lantai basah, lampu gelap ================= */
export const Hamid: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aMalam = at(p, 'malam', 3.1);
  const aBasah = at(p, 'basah', 5.1);
  const aGelap = at(p, 'gelap', 6.1);
  const night = f >= aMalam;
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: night ? BG(C.night[1], C.violet[1]) : BG(C.violet[0], C.pink[0])}} />
      {night ? <Tiles top={1380} wet={f >= aBasah} /> : <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: '#C98C64'}} />}
      {night ? <AbsoluteFill style={{background: 'rgba(10,6,30,0.35)'}} /> : null}
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Pak Hamid, 72 tahun" bg={C.navy} color={C.yellow} size={48} /></Pop>
      <Pop at={1.6} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="school" size={52} />} text="Pesara guru" size={38} /></Pop>
      <Pop at={aMalam} style={{left: 520, top: 680}}><IconPill icon={<KIcon name="moon" size={52} f={f} />} text="Bangun ke tandas" size={34} /></Pop>
      <Pop at={aBasah} style={{left: 60, top: 800}}><IconPill icon={<KIcon name="drop" size={52} f={f} />} text="Lantai basah" size={38} bg={RED} color="#fff" /></Pop>
      <Pop at={aGelap} style={{left: 480, top: 800}}><IconPill icon={<KIcon name="warning" size={52} />} text="Lampu gelap" size={38} bg={RED} color="#fff" /></Pop>
      <Who preset={HAMID} x={300} y={980} w={460} mood={night ? 'tired' : 'happy'} pose="down" seed={12} />
    </Camera>
  );
};

/* ================= 2 — Tergelincir, tak boleh bangun; isteri menjumpainya ================= */
export const Tergelincir: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aBangun = at(p, 'bangun', 1.3);
  const aIsteri = at(p, 'isterinya', 2.4);
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: BG(C.night[1], '#5A1F3A')}} />
      <Tiles top={1300} wet />
      <Pop at={0.1} style={{left: 60, top: 560}}><Pill text="Tergelincir!" bg={RED} size={56} /></Pop>
      <Pop at={aBangun} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="warning" size={56} />} text="Tak boleh bangun" size={40} /></Pop>
      <Fallen x={120} y={1220} w={360} f={f} />
      {f >= aIsteri ? <Who preset={ISTERI} x={600} y={960} w={420} mood="shock" pose="point" seed={5} /> : null}
      <Pop at={aIsteri} style={{left: 60, top: 800}}><IconPill icon={<KIcon name="person" size={52} />} text="Isteri menjumpainya" size={36} bg={C.navy} color="#fff" /></Pop>
    </Camera>
  );
};

/* ================= 3 — Hospital: patah tulang pinggul ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aStamp = at(p, 'patah', 2.9);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: BG(C.night[3], C.violet[2])}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      {f < aStamp - 6 ? (
        <>
          <Pop at={0.1} style={{left: 60, top: 600}}><IconPill icon={<KIcon name="hospital" size={56} />} text="Di hospital" size={46} /></Pop>
          <Pop at={0.8} style={{left: 640, top: 640}}><KIcon name="xray" size={280} f={f} /></Pop>
        </>
      ) : null}
      <Who preset={p.preset} x={20} y={1040} w={460} mood="neutral" pose={f < aStamp ? 'chin' : 'point'} />
      <Who preset={HAMID} x={600} y={1060} w={420} mood="sad" pose="down" seed={12} />
      <Stamp f={f} a={aStamp} top="DIAGNOSIS" big="PATAH PINGGUL" sub="Akibat jatuh" bigSize={100} y={560} />
    </Camera>
  );
};

/* ================= 4 — Bukan perkara biasa + 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => (
  <FiveIntro
    p={p}
    aFive={at(p, 'lima perkara', 2.7)}
    sub="perkara perlu anda tahu"
    glow={C.pink[0]}
    head={
      <Pop at={at(p, 'bukan', 0.6)} style={{left: 0, width: 1080, top: 580, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="cane" size={56} />} text="Jatuh bukan perkara biasa bila tua" size={36} />
      </Pop>
    }
  />
);

/* ================= 5–9 — #1–#5 ================= */
export const Risiko: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="KENALI RISIKO"
      titleSize={88}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      grid
      items={[
        {a: at(p, 'kaki', 2.1), icon: <KIcon name="sole" size={90} />, text: 'Kaki lemah', bg: RED, size: 30},
        {a: at(p, 'imbangan', 3.0), icon: <KIcon name="cane" size={90} />, text: 'Imbangan kurang baik', size: 26},
        {a: at(p, 'pening', 4.3), icon: <KIcon name="dizzy" size={90} f={f} />, text: 'Pening', bg: RED, size: 30},
        {a: at(p, 'penglihatan', 4.9), icon: <MIcon name="eye" size={90} f={f} />, text: 'Penglihatan kabur', size: 28},
        {a: at(p, 'pernah', 6.1), icon: <KIcon name="warning" size={90} />, text: 'Pernah jatuh', bg: RED, size: 30},
      ]}
    />
  );
};

export const Ubat: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="SEMAK UBAT"
      titleSize={92}
      bg={BG(C.night[1], C.violet[0])}
      hero={<KIcon name="pillbottle" size={240} />}
      items={[
        {a: at(p, 'ubat tidur', 1.8), icon: <KIcon name="moon" size={76} f={f} />, text: 'Ubat tidur & penenang', size: 36},
        {a: at(p, 'darah tinggi', 4.1), icon: <KIcon name="bp" size={76} f={f} />, text: 'Ubat darah tinggi'},
        {a: at(p, 'menyebabkan', 5.2), icon: <KIcon name="dizzy" size={76} f={f} />, text: 'Boleh sebabkan pening', bg: RED},
        {a: at(p, 'minta', 6.5), icon: <KIcon name="checklist" size={76} />, text: 'Minta doktor semak', bg: C.green},
      ]}
    />
  );
};

export const Senam: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="KEKUATAN & IMBANGAN"
      titleSize={74}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<KIcon name="dumbbell" size={250} f={f} />}
      items={[
        {a: at(p, 'kekuatan', 1.4), icon: <KIcon name="dumbbell" size={76} f={f} />, text: 'Senaman kekuatan', bg: C.green},
        {a: at(p, 'imbangan', 2.2), icon: <KIcon name="arms" size={76} f={f} />, text: 'Latihan imbangan'},
        {a: at(p, 'berkala', 3.1), icon: <KIcon name="calendar" size={76} f={f} />, text: 'Berkala & berperingkat', size: 36},
      ]}
      mood="happy"
    />
  );
};

export const Rumah: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="SELAMATKAN RUMAH"
      titleSize={80}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      grid
      items={[
        {a: at(p, 'lampu', 1.7), icon: <KIcon name="sun" size={90} f={f} />, text: 'Lampu malam', bg: C.green, size: 30},
        {a: at(p, 'tikar', 2.8), icon: <KIcon name="mat" size={90} />, text: 'Tikar tidak licin', size: 28},
        {a: at(p, 'pemegang', 4.0), icon: <KIcon name="grabbar" size={90} />, text: 'Pemegang bilik air', bg: C.green, size: 28},
        {a: at(p, 'alihkan', 5.4), icon: <KIcon name="toy" size={90} f={f} />, text: 'Alihkan barang di lantai', size: 26},
      ]}
      mood="happy"
    />
  );
};

export const Mata: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="MATA & KASUT"
      titleSize={88}
      bg={BG(C.night[1], C.violet[1])}
      hero={<MIcon name="eye" size={240} f={f} />}
      items={[
        {a: at(p, 'periksa', 0.7), icon: <MIcon name="eye" size={76} f={f} />, text: 'Periksa mata', bg: C.green},
        {a: at(p, 'kasut', 2.0), icon: <KIcon name="slipper" size={76} />, text: 'Kasut/selipar tidak licin', size: 34},
        {a: at(p, 'muat', 4.3), icon: <Check size={70} />, text: 'Muat dengan baik'},
      ]}
      mood="happy"
    />
  );
};

/* ================= 10 — Pernah jatuh? Beritahu doktor ================= */
export const Nilai: React.FC<SceneProps> = (p) => (
  <PointScene
    p={p}
    title="PERNAH JATUH?"
    titleSize={88}
    bg={BG(C.night[1], C.violet[0])}
    hero={<KIcon name="hospital" size={240} />}
    items={[
      {a: at(p, 'cedera', 2.6), icon: <Check size={70} />, text: 'Walaupun tidak cedera', size: 36},
      {a: at(p, 'beritahu', 3.2), icon: <KIcon name="talk" size={76} />, text: 'Beritahu doktor', bg: C.labelPink},
      {a: at(p, 'dinilai', 5.3), icon: <KIcon name="checklist" size={76} />, text: 'Perlu dinilai'},
    ]}
  />
);

/* ================= 11 — Hamid pulih, rumah selamat ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aJalan = at(p, 'berjalan', 2.8);
  const aSelamat = at(p, 'selamat', 4.7);
  const walk = interpolate(f, [aJalan, aJalan + 60], [0, 120], clamp);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG('#7FC4F2', '#F6D6A8')}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: LEAF}} />
      <Pop at={0} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="recovery" size={56} />} text="Pembedahan & fisioterapi" size={38} /></Pop>
      <Pop at={aJalan} style={{left: 60, top: 680}}><Pill text="Kembali berjalan!" bg={C.green} size={52} /></Pop>
      <Pop at={aSelamat} style={{left: 60, top: 800}}><IconPill icon={<KIcon name="grabbar" size={56} />} text="Rumah lebih selamat" size={40} /></Pop>
      <Who preset={ISTERI} x={640} y={980} w={400} mood="happy" pose="clasp" seed={5} />
      <Who preset={HAMID} x={140 + walk} y={960} w={440} mood="happy" pose="wave" seed={12} />
      <Burst f={f} a={aJalan} x={400} y={1060} />
    </Camera>
  );
};

/* ================= 12 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Closing
      p={p}
      aSaya={at(p, 'saya doktor', 3.3)}
      lines={[
        {a: at(p, 'sayangi', 0.1), node: <IconPill icon={<KIcon name="heart" size={60} f={f} />} text="Sayangi ibu bapa anda" size={44} />},
        {a: at(p, 'jangan tunggu', 1.5), node: <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />},
        {a: at(p, 'jatuh', 2.4), node: <IconPill icon={<KIcon name="cane" size={60} />} text="Cegah sebelum jatuh" size={46} bg={C.green} color="#fff" />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, hamid: Hamid, tergelincir: Tergelincir, diagnosis: Diagnosis, lima: Lima,
  risiko: Risiko, ubat: Ubat, senam: Senam, rumah: Rumah, mata: Mata,
  nilai: Nilai, pulih: Pulih, penutup: Penutup,
};

void Cross;
