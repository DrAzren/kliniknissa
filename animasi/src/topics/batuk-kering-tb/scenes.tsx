import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Burst, C, Camera, Check, ClinicSign, clamp, Closing, Cross, FiveIntro, Glow, Icon, IconPill, interpolate, KIcon, LEAF, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, Txt, useCurrentFrame, Who,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const HAKIM: AvatarPreset = {
  id: 'hakim', skin: '#B9825A', skinShade: '#9C6844', hair: 'short', hairColor: '#1E1A24', top: 'tee', topColor: '#E08A3E', topShade: '#B86A28',
  accessory: null, stubble: true,
};
export const ISTERI: AvatarPreset = {
  id: 'isteri-hakim', skin: '#D49C74', skinShade: '#B9805A', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#2BB3A3', topShade: '#1F8A7E',
  hijabColor: '#6157C5', hijabShade: '#4B3C9B', accessory: null,
};
export const ANAK: AvatarPreset = {
  id: 'anak-hakim', skin: '#D9A47C', skinShade: '#BE8860', hair: 'short', hairColor: '#231B28', top: 'tee', topColor: '#F6C945', topShade: '#D9AA2A',
  accessory: null,
};

/** Getaran batuk (gelombang) di sebelah mulut. */
const Cough: React.FC<{f: number; x: number; y: number}> = ({f, x, y}) => (
  <svg width={160} height={120} viewBox="0 0 160 120" style={{position: 'absolute', left: x, top: y}}>
    {[0, 1, 2].map((i) => {
      const t = ((f + i * 6) % 18) / 18;
      return <path key={i} d={`M ${20 + t * 80} ${30 + i * 4} q 14 30 0 60`} stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" opacity={1 - t} />;
    })}
  </svg>
);

/* ================= 0 — Hook: batuk > 2 minggu, >1 juta kematian/tahun ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aBia = at(p, 'biasa', 2.9);
  const aMem = at(p, 'membunuh', 5.2);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={5} glow={f >= aMem ? RED : C.violet[2]} />
      <Pop at={2} style={{left: 0, width: 1080, top: 540, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="calendar" size={80} f={f} />} text="Batuk lebih 2 minggu?" size={52} />
      </Pop>
      <div style={{position: 'absolute', left: 540 - 200, top: 700, opacity: interpolate(f, [0, 10], [0, 1], clamp)}}>
        <KIcon name="lungs" size={400} f={f} />
        <Cough f={f} x={300} y={60} />
      </div>
      <Pop at={aBia} style={{left: 0, width: 1080, top: 1120, display: 'flex', justifyContent: 'center'}}>
        <div style={{position: 'relative'}}>
          <Pill text="Batuk biasa?" bg={C.navy} size={56} />
          <div style={{position: 'absolute', left: 120, top: -40}}>{f >= aBia + 8 ? <Cross f={f - aBia - 8} size={160} /> : null}</div>
        </div>
      </Pop>
      <Pop at={aMem} style={{left: 0, width: 1080, top: 1300, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, background: '#fff', padding: '14px 34px 14px 18px', borderRadius: 50}}>
          <MIcon name="skull" size={80} />
          <Txt size={44} color={C.navy}>&gt; 1 juta kematian / tahun</Txt>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Hakim, pekerja kilang: batuk 3 minggu, 2 botol ubat ================= */
export const Hakim: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aUmur = at(p, 'tiga puluh', 0.7);
  const aKil = at(p, 'kilang', 2.3);
  const aMing = at(p, 'tiga minggu', 3.4);
  const aBot = at(p, 'botol', 6.2);
  const aBaik = at(p, 'tak juga', 7.1);
  const shake = Math.sin(f * 1.4) * (f % 40 < 10 ? 6 : 0);
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, #5B5770 0%, #3B3F52 100%)`}} />
      {[0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', left: 60 + i * 340, top: 740, width: 260, height: 160, borderRadius: 12, background: '#46435A'}} />)}
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: '#2E2C3E'}} />
      <Pop at={aUmur} style={{left: 60, top: 540}}><Pill text="Hakim, 38" bg={C.navy} color={C.yellow} size={54} /></Pop>
      <Pop at={aKil} style={{left: 60, top: 650}}><Pill text="Pekerja kilang" bg={C.labelPink} size={42} /></Pop>
      <div style={{position: 'absolute', left: 60, top: 920, transform: `translateX(${shake}px)`}}>
        <Who preset={HAKIM} x={0} y={0} w={480} mood="tired" pose="clasp" seed={1} />
        <Cough f={f} x={330} y={300} />
      </div>
      <Pop at={aMing} style={{left: 520, top: 780}}><IconPill icon={<KIcon name="calendar" size={60} f={f} />} text="3 minggu batuk" size={40} /></Pop>
      {[0, 1].map((i) => (
        <Pop key={i} at={aBot + i * 4} style={{left: 600 + i * 200, top: 940}}>
          <div style={{position: 'relative', width: 170, height: 170}}>
            <KIcon name="bottle" size={170} />
            {f >= aBaik ? <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - aBaik} size={170} /></div> : null}
          </div>
        </Pop>
      ))}
      <Pop at={aBaik} style={{left: 640, top: 1150}}><Pill text="Tak juga baik" bg={RED} size={44} /></Pop>
    </Camera>
  );
};

/* ================= 2 — Peluh malam, selera hilang, berat turun 5 kg ================= */
export const Malam: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aPel = at(p, 'berpeluh', 0.8);
  const aSel = at(p, 'selera', 2.9);
  const aBer = at(p, 'berat', 4.0);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, #0B0824 0%, ${C.night[2]} 100%)`}} />
      <div style={{position: 'absolute', left: 860, top: 480}}><Icon name="moon" size={140} /></div>
      <div style={{position: 'absolute', left: 20, top: 1360, width: 700, height: 150, borderRadius: 30, background: C.violet[2]}} />
      <Who preset={HAKIM} x={110} y={900} w={460} mood="tired" pose="clasp" seed={1} />
      <div style={{position: 'absolute', left: 40, top: 1420, width: 660, height: 200, borderRadius: '70px 70px 24px 24px', background: '#3E5FA8'}} />
      {f >= aPel
        ? [0, 1, 2, 3].map((i) => {
            const t = (f + i * 11) % 40;
            return <div key={i} style={{position: 'absolute', left: 190 + i * 80, top: 940 + t * 3, width: 18, height: 26, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: '#9FD6F7', opacity: interpolate(t, [0, 6, 32, 40], [0, 1, 1, 0])}} />;
          })
        : null}
      <Pop at={aPel} style={{left: 600, top: 640}}><IconPill icon={<KIcon name="drop" size={60} />} text="Peluh malam" size={42} /></Pop>
      <Pop at={aSel} style={{left: 600, top: 770}}><IconPill icon={<KIcon name="bowl" size={60} f={f} />} text="Selera hilang" size={42} /></Pop>
      <Pop at={aBer} style={{left: 600, top: 900}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, background: RED, padding: '10px 30px 10px 14px', borderRadius: 44}}>
          <KIcon name="scale" size={70} f={f} /><Txt size={52}>−5 kg</Txt>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 3 — Isteri bawa ke klinik ================= */
export const Klinik: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKli = at(p, 'klinik', 2.3);
  return (
    <Camera dur={p.dur} to={1.08} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[3]}} />
      <Pop at={Math.max(0, aKli - 10)} style={{left: 330, top: 560}}><ClinicSign x={0} y={0} /></Pop>
      <Who preset={ISTERI} x={60} y={980} w={420} mood="sad" pose="point" seed={4} />
      <Who preset={HAKIM} x={560} y={1000} w={420} mood="tired" pose="down" seed={1} />
      <Cough f={f} x={840} y={1260} />
    </Camera>
  );
};

/* ================= 4 — Ujian kahak & x-ray → BATUK KERING (TB) ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKah = at(p, 'kahak', 0.3);
  const aX = at(p, 'x-ray', 1.0);
  const aBat = at(p, 'batuk kering', 3.2);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[3]} 0%, ${C.violet[2]} 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      {f < aBat - 6 ? (
        <>
          <Pop at={aKah} style={{left: 120, top: 520}}><div style={{background: '#fff', borderRadius: 30, padding: 16}}><KIcon name="sputum" size={220} /></div></Pop>
          <Pop at={aX} style={{left: 560, top: 520}}><div style={{background: '#fff', borderRadius: 30, padding: 16}}><KIcon name="xray" size={260} f={f} /></div></Pop>
        </>
      ) : null}
      <Who preset={p.preset} x={20} y={900} w={520} mood="neutral" pose={f >= aBat ? 'point' : 'chin'} />
      <Who preset={HAKIM} x={630} y={1060} w={380} mood={f >= aBat ? 'shock' : 'tired'} pose="down" seed={1} />
      <Stamp f={f} a={aBat} top="DIAGNOSIS" big="BATUK KERING" sub="Tuberkulosis (TB)" bigSize={110} y={500} />
    </Camera>
  );
};

/* ================= 5 — Boleh dirawat sampai sembuh + 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => (
  <FiveIntro
    p={p}
    aFive={at(p, 'lima', 2.7)}
    sub="perkara anda perlu tahu"
    head={
      <Pop at={at(p, 'dirawat', 0.8)} style={{left: 0, width: 1080, top: 560, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<Check size={60} />} text="Boleh dirawat sampai sembuh" size={46} bg={C.green} color="#fff" />
      </Pop>
    }
  />
);

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/* ================= 6–10 — #1–#5 ================= */
export const Tanda: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="TANDA"
      titleSize={120}
      grid
      bg={BG(C.night[1], C.violet[0])}
      hero={<div style={{position: 'relative'}}><KIcon name="lungs" size={280} f={f} /><Cough f={f} x={200} y={40} /></div>}
      items={[
        {a: at(p, 'batuk lebih', 1.6), icon: <KIcon name="calendar" size={110} f={f} />, text: 'Batuk > 2 minggu', size: 32},
        {a: at(p, 'kahak', 3.1), icon: <KIcon name="sputum" size={110} />, text: 'Kahak / darah'},
        {a: at(p, 'demam', 4.7), icon: <MIcon name="thermo" size={110} f={f} />, text: 'Demam petang', bg: RED},
        {a: at(p, 'peluh', 6.0), icon: <KIcon name="drop" size={110} />, text: 'Peluh malam'},
        {a: at(p, 'berat', 7.1), icon: <KIcon name="scale" size={110} f={f} />, text: 'Berat turun'},
      ]}
    />
  );
};

export const Merebak: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="CARA MEREBAK"
      titleSize={84}
      bg={BG('#0F0C2E', C.night[3])}
      hero={<KIcon name="sneeze" size={300} f={f} />}
      items={[
        {a: at(p, 'udara', 2.8), icon: <KIcon name="virus" size={76} f={f} />, text: 'Melalui udara'},
        {a: at(p, 'batuk atau', 3.8), icon: <KIcon name="sneeze" size={76} f={f} />, text: 'Bila pesakit batuk / bersin', size: 36},
        {a: at(p, 'sesak', 6.2), icon: <MIcon name="house" size={76} />, text: 'Tempat sesak & tertutup', bg: RED, size: 38},
      ]}
    />
  );
};

export const Risiko: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="SIAPA BERISIKO"
      titleSize={84}
      bg={BG(C.night[1], C.violet[0])}
      hero={<KIcon name="warning" size={260} />}
      items={[
        {a: at(p, 'serumah', 2.7), icon: <Icon name="family" size={76} />, text: 'Serumah dengan pesakit', size: 38},
        {a: at(p, 'perokok', 4.0), icon: <KIcon name="cigarette" size={76} f={f} />, text: 'Perokok'},
        {a: at(p, 'kencing', 5.1), icon: <KIcon name="drop" size={76} />, text: 'Kencing manis'},
        {a: at(p, 'imunnya', 6.7), icon: <KIcon name="virus" size={76} f={f} />, text: 'Imun lemah'},
      ]}
    />
  );
};

export const Ujian: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="UJIAN"
      titleSize={120}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<KIcon name="xray" size={280} f={f} />}
      items={[
        {a: at(p, 'kahak', 1.8), icon: <KIcon name="sputum" size={76} />, text: 'Ujian kahak'},
        {a: at(p, 'x-ray', 2.5), icon: <KIcon name="xray" size={76} f={f} />, text: 'X-ray dada'},
        {a: at(p, 'mudah', 3.6), icon: <KIcon name="hospital" size={76} />, text: 'Mudah & cepat, klinik kesihatan', bg: C.green, size: 34},
      ]}
      mood="happy"
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
      bg={BG(C.night[1], C.violet[2])}
      hero={<div style={{display: 'flex', alignItems: 'center'}}><KIcon name="pill" size={200} /><KIcon name="calendar" size={160} f={f} /></div>}
      items={[
        {a: at(p, 'setiap hari', 1.5), icon: <KIcon name="pill" size={76} />, text: 'Makan ubat setiap hari', size: 38},
        {a: at(p, 'enam', 3.8), icon: <KIcon name="calendar" size={76} f={f} />, text: 'Sekurang-kurangnya 6 bulan', size: 36},
        {a: at(p, 'jangan berhenti', 4.7), icon: <KIcon name="warning" size={76} />, text: 'Jangan berhenti walau sihat', bg: RED, size: 36},
        {a: at(p, 'kebal', 7.8), icon: <KIcon name="virus" size={76} f={f} />, text: 'Kuman boleh jadi kebal'},
      ]}
    />
  );
};

/* ================= 11 — Keluarga disaring ================= */
export const Keluarga: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSar = at(p, 'disaring', 1.3);
  const aAwal = at(p, 'dikesan', 2.7);
  return (
    <Camera dur={p.dur} to={1.08} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, #1F4A4A 100%)`}} />
      <Glow x={540} y={1000} r={520} color={C.green} opacity={0.25} />
      <Pop at={2} style={{left: 60, top: 560}}><IconPill icon={<Icon name="family" size={64} />} text="Ahli keluarga" size={46} /></Pop>
      <Pop at={aSar} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="xray" size={64} f={f} />} text="Turut disaring" size={46} bg={C.green} color="#fff" /></Pop>
      <Pop at={aAwal} style={{left: 60, top: 800}}><IconPill icon={<Check size={56} />} text="Jangkitan dikesan awal" size={42} /></Pop>
      <Who preset={HAKIM} x={20} y={1000} w={380} mood="neutral" pose="down" seed={1} />
      <Who preset={ISTERI} x={380} y={1040} w={360} mood="neutral" pose="clasp" seed={4} />
      <Who preset={ANAK} x={740} y={1180} w={280} mood="happy" pose="down" seed={3} />
    </Camera>
  );
};

/* ================= 12 — 6 bulan kemudian: sembuh ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aHab = at(p, 'habiskan', 1.7);
  const aSem = at(p, 'sembuh', 3.7);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, #7FC4F2 0%, #F6D6A8 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: LEAF}} />
      <Pop at={2} style={{left: 60, top: 560}}><Pill text="6 bulan kemudian" bg={C.navy} color={C.yellow} size={50} /></Pop>
      <Pop at={aHab} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="calendar" size={60} f={30} />} text="Ubat dihabiskan" size={42} /></Pop>
      <Pop at={aSem} style={{left: 60, top: 800}}><Pill text="Disahkan SEMBUH!" bg={C.green} size={56} /></Pop>
      <Who preset={HAKIM} x={120} y={940} w={460} mood="happy" pose={f >= aSem ? 'wave' : 'down'} seed={1} />
      <Who preset={ISTERI} x={600} y={1000} w={400} mood="happy" pose="clasp" seed={4} />
      <Burst f={f} a={aSem} x={360} y={1100} />
    </Camera>
  );
};

/* ================= 13 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Closing
      p={p}
      aSaya={at(p, 'saya doktor', 4.0)}
      lines={[
        {a: at(p, 'batuk', 0.1), node: <IconPill icon={<KIcon name="lungs" size={64} f={f} />} text="Batuk lebih 2 minggu?" size={46} />},
        {a: at(p, 'jangan tunggu', 1.4), node: <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />},
        {a: at(p, 'dapatkan', 2.3), node: <IconPill icon={<KIcon name="hospital" size={64} />} text="Dapatkan pemeriksaan segera" size={42} bg={C.green} color="#fff" />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, hakim: Hakim, malam: Malam, klinik: Klinik, diagnosis: Diagnosis, lima: Lima,
  tanda: Tanda, merebak: Merebak, risiko: Risiko, ujian: Ujian, rawatan: Rawatan,
  keluarga: Keluarga, pulih: Pulih, penutup: Penutup,
};
