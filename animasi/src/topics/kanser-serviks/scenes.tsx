import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Burst, C, Camera, Check, ClinicSign, Closing, Cross, FiveIntro, Glow, IconPill, KIcon, LEAF, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, useCurrentFrame, Who,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const HIDAYAH: AvatarPreset = {
  id: 'hidayah', skin: '#D9A47C', skinShade: '#BE8860', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#E4629F', topShade: '#C24A82',
  hijabColor: '#6157C5', hijabShade: '#4B3C9B', accessory: null,
};
export const KAWAN: AvatarPreset = {
  id: 'kawan-hidayah', skin: '#E6B892', skinShade: '#CC9C76', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#2BB3A3', topShade: '#1F8A7E',
  hijabColor: '#F6C945', hijabShade: '#D9AA2A', accessory: null,
};

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/** Gulungan kain di gerai. */
const Fabric: React.FC<{x: number; y: number; color: string; shade: string}> = ({x, y, color, shade}) => (
  <svg width={150} height={150} viewBox="0 0 150 150" style={{position: 'absolute', left: x, top: y}}>
    <rect x={20} y={30} width={110} height={100} rx={14} fill={color} />
    <ellipse cx={130} cy={80} rx={16} ry={50} fill={shade} />
    <ellipse cx={130} cy={80} rx={6} ry={18} fill="#fff" opacity={0.6} />
    {[50, 75, 100].map((yy) => <path key={yy} d={`M 28 ${yy} L 112 ${yy}`} stroke="#fff" strokeWidth={4} opacity={0.35} />)}
  </svg>
);

/* ================= 0 — Hook ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aCegah = at(p, 'dicegah', 1.0);
  const aTak = at(p, 'tak pernah', 3.1);
  const aKen = at(p, 'kenapa', 4.6);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={241} glow={C.labelPink} />
      <Glow x={540} y={1000} r={460} color={C.labelPink} opacity={0.2} />
      <Pop at={0.1} style={{left: 0, width: 1080, top: 560, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="uterus" size={64} f={f} />} text="Kanser serviks" size={50} />
      </Pop>
      <Pop at={aCegah} style={{left: 0, width: 1080, top: 680, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<Check size={56} />} text="Boleh dicegah" size={46} bg={C.green} color="#fff" />
      </Pop>
      <Pop at={aTak} style={{left: 0, width: 1080, top: 800, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="testkit" size={60} f={f} />} text="Ramai tak pernah buat saringan" size={38} bg={RED} color="#fff" />
      </Pop>
      <Who preset={HIDAYAH} x={290} y={960} w={500} mood={f >= aKen ? 'curious' : 'neutral'} pose={f >= aKen ? 'chin' : 'clasp'} seed={21} />
      <Pop at={aKen} style={{left: 780, top: 1000}}><KIcon name="question" size={200} /></Pop>
    </Camera>
  );
};

/* ================= 1 — Puan Hidayah, 38, peniaga kain; tak pernah saringan ================= */
export const Hidayah: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKain = at(p, 'peniaga', 2.2);
  const aTak = at(p, 'tak pernah', 3.5);
  const aSakit = at(p, 'tiada sakit', 5.0);
  const aMalu = at(p, 'malu', 6.4);
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: BG(C.violet[0], C.pink[0])}} />
      <div style={{position: 'absolute', left: 0, top: 1440, width: 1080, height: 480, background: '#C98C64'}} />
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Puan Hidayah, 38 tahun" bg={C.navy} color={C.yellow} size={48} /></Pop>
      <Pop at={aKain} style={{left: 60, top: 680}}><Pill text="Peniaga kain" bg={C.labelPink} size={42} /></Pop>
      <Pop at={aTak} style={{left: 60, top: 790}}>
        <div style={{position: 'relative'}}>
          <IconPill icon={<KIcon name="testkit" size={56} f={f} />} text="Tak pernah buat saringan" size={36} />
        </div>
      </Pop>
      <Pop at={aSakit} style={{left: 60, top: 900}}><IconPill icon={<Check size={52} />} text="Tiada sakit" size={36} /></Pop>
      <Pop at={aMalu} style={{left: 420, top: 900}}><Pill text="Rasa malu" bg={RED} size={40} /></Pop>
      {/* gerai kain */}
      <div style={{position: 'absolute', left: 560, top: 1220, width: 480, height: 40, background: '#8A5A3A', borderRadius: 10}} />
      <Fabric x={570} y={1080} color="#F6C945" shade="#D9AA2A" />
      <Fabric x={720} y={1080} color="#4FA3FF" shade="#2F7FD6" />
      <Fabric x={870} y={1080} color="#2BB3A3" shade="#1F8A7E" />
      <Who preset={HIDAYAH} x={60} y={1000} w={470} mood={f >= aMalu ? 'sad' : 'neutral'} pose="clasp" seed={21} />
    </Camera>
  );
};

/* ================= 2 — Kawan baik disahkan kanser → Hidayah risau, ke klinik ================= */
export const Risau: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSah = at(p, 'disahkan', 1.5);
  const aRisau = at(p, 'risau', 4.4);
  const aKlinik = at(p, 'klinik', 5.8);
  const go = f >= aKlinik - 10;
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG(C.night[1], C.violet[1])}} />
      <NightSky seed={77} top="transparent" bottom="transparent" stars={35} glow={C.violet[3]} />
      <Pop at={0.1} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="phone" size={56} f={f} />} text="Bulan lalu…" size={40} /></Pop>
      <Pop at={aSah} style={{left: 60, top: 680}}><Pill text="Kawan baik: kanser serviks" bg={RED} size={42} /></Pop>
      {!go ? (
        <>
          <Who preset={KAWAN} x={560} y={980} w={440} mood="sad" pose="down" seed={8} />
          <Who preset={HIDAYAH} x={60} y={980} w={460} mood={f >= aRisau ? 'sad' : 'shock'} pose="clasp" seed={21} />
        </>
      ) : (
        <>
          <ClinicSign x={560} y={900} w={420} />
          <div style={{position: 'absolute', left: 620, top: 1040}}><KIcon name="hospital" size={320} /></div>
          <Who preset={HIDAYAH} x={60} y={980} w={460} mood="neutral" pose="point" seed={21} />
        </>
      )}
      <Pop at={aRisau} style={{left: 60, top: 800}}><IconPill icon={<KIcon name="question" size={52} />} text="Hidayah mula risau" size={38} /></Pop>
    </Camera>
  );
};

/* ================= 3 — Ujian HPV → perubahan sel pra-kanser ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSel = at(p, 'perubahan', 3.0);
  const aStamp = at(p, 'prakanser', 5.5);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: BG(C.night[3], C.violet[2])}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      {f < aStamp - 6 ? (
        <>
          <Pop at={0.2} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="testkit" size={60} f={f} />} text="Ujian HPV" size={48} /></Pop>
          <Pop at={aSel} style={{left: 580, top: 650}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
              <KIcon name="cells" size={260} f={f} />
              <Pill text="Perubahan sel" bg={RED} size={34} />
            </div>
          </Pop>
        </>
      ) : null}
      <Who preset={p.preset} x={20} y={1040} w={460} mood="neutral" pose={f < aSel ? 'chin' : 'point'} />
      <Who preset={HIDAYAH} x={600} y={1060} w={420} mood={f >= aStamp ? 'shock' : 'neutral'} pose="clasp" seed={21} />
      <Stamp f={f} a={aStamp} top="PANGKAL RAHIM" big="PRA-KANSER" sub="Perubahan sel awal" bigSize={128} y={560} />
    </Camera>
  );
};

/* ================= 4 — Dikesan awal → boleh dirawat + 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => (
  <FiveIntro
    p={p}
    aFive={at(p, 'lima perkara', 4.1)}
    sub="perkara perlu anda tahu"
    glow={C.pink[0]}
    head={
      <>
        <Pop at={at(p, 'dikesan', 0.3)} style={{left: 0, width: 1080, top: 560, display: 'flex', justifyContent: 'center'}}>
          <IconPill icon={<MIcon name="search" size={56} />} text="Dikesan awal" size={44} />
        </Pop>
        <Pop at={at(p, 'dirawat', 1.7)} style={{left: 0, width: 1080, top: 690, display: 'flex', justifyContent: 'center'}}>
          <IconPill icon={<Check size={52} />} text="Dirawat sebelum jadi kanser" size={40} bg={C.green} color="#fff" />
        </Pop>
      </>
    }
  />
);

/* ================= 5–9 — #1–#5 ================= */
export const Punca: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="PUNCA UTAMA: HPV"
      titleSize={80}
      bg={BG(C.night[1], C.violet[0])}
      glow={C.labelPink}
      hero={<KIcon name="virus" size={250} f={f} />}
      items={[
        {a: at(p, 'hampir semua', 1.9), icon: <KIcon name="uterus" size={76} f={f} />, text: 'Hampir semua kanser serviks', size: 34},
        {a: at(p, 'jangkitan', 4.4), icon: <KIcon name="virus" size={76} f={f} />, text: 'Jangkitan HPV', bg: RED},
        {a: at(p, 'berpanjangan', 5.7), icon: <KIcon name="hourglass" size={76} f={f} />, text: 'Yang berpanjangan'},
      ]}
    />
  );
};

export const Senyap: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aJangan = at(p, 'jangan tunggu', 2.9);
  return (
    <PointScene
      p={p}
      title="AWAL TIADA TANDA"
      titleSize={80}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={
        <div style={{position: 'relative', width: 240, height: 240}}>
          <KIcon name="warning" size={240} />
          <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - 20} size={240} /></div>
        </div>
      }
      items={[
        {a: at(p, 'tiada tanda', 1.9), icon: <KIcon name="smile" size={76} />, text: 'Rasa sihat seperti biasa', size: 36},
        {a: aJangan, icon: <KIcon name="clock" size={76} f={f} />, text: 'Jangan tunggu sakit', bg: RED},
        {a: at(p, 'saringan', 4.3), icon: <KIcon name="testkit" size={76} f={f} />, text: 'Buat saringan', bg: C.green},
      ]}
    />
  );
};

export const Saringan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="BUAT SARINGAN"
      titleSize={86}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<KIcon name="testkit" size={260} f={f} />}
      items={[
        {a: at(p, 'wanita', 1.9), icon: <KIcon name="person" size={76} />, text: 'Wanita 30–65 tahun', bg: C.green},
        {a: at(p, 'ujian', 5.6), icon: <KIcon name="virus" size={76} f={f} />, text: 'Ujian HPV'},
        {a: at(p, 'sampel sendiri', 7.0), icon: <KIcon name="testkit" size={76} f={f} />, text: 'Pilihan ambil sampel sendiri', size: 32},
      ]}
      mood="happy"
    />
  );
};

export const Amaran: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="TANDA AMARAN"
      titleSize={88}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      grid
      items={[
        {a: at(p, 'hubungan', 2.9), icon: <KIcon name="drop" size={90} f={f} />, text: 'Darah selepas hubungan', bg: RED, size: 28},
        {a: at(p, 'antara haid', 4.2), icon: <KIcon name="calendar" size={90} f={f} />, text: 'Darah antara haid', size: 30},
        {a: at(p, 'putus haid', 5.7), icon: <KIcon name="hourglass" size={90} f={f} />, text: 'Darah selepas putus haid', bg: RED, size: 26},
        {a: at(p, 'keputihan', 6.8), icon: <KIcon name="drop" size={90} f={f} />, text: 'Keputihan luar biasa', size: 28},
      ]}
      mood="neutral"
    />
  );
};

export const Vaksin: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="VAKSIN HPV MELINDUNGI"
      titleSize={72}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<KIcon name="syringe" size={250} />}
      items={[
        {a: at(p, 'pelajar', 3.6), icon: <KIcon name="school" size={76} />, text: 'Pelajar perempuan di sekolah', size: 32, bg: C.green},
        {a: at(p, 'dewasa', 5.0), icon: <KIcon name="person" size={76} />, text: 'Wanita dewasa: tanya doktor', size: 32},
      ]}
      mood="happy"
    />
  );
};

/* ================= 10 — Keputusan positif: jangan panik ================= */
export const Positif: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="UJIAN POSITIF?"
      titleSize={86}
      bg={BG(C.night[1], C.violet[0])}
      hero={<KIcon name="checklist" size={240} />}
      items={[
        {a: at(p, 'jangan panik', 2.1), icon: <KIcon name="smile" size={76} />, text: 'Jangan panik', bg: C.green},
        {a: at(p, 'bukan bermaksud', 3.2), icon: <KIcon name="uterus" size={76} f={f} />, text: 'Bukan bermaksud kanser', size: 36},
        {a: at(p, 'pemeriksaan', 5.3), icon: <MIcon name="search" size={76} />, text: 'Perlu pemeriksaan lanjut', size: 36, bg: C.labelPink},
      ]}
    />
  );
};

/* ================= 11 — Hidayah pulih, ingatkan kawan-kawan ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKawan = at(p, 'mengingatkan', 2.1);
  const aSar = at(p, 'saringan', 4.3);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG('#7FC4F2', '#F6D6A8')}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: LEAF}} />
      <Pop at={0} style={{left: 60, top: 560}}><IconPill icon={<Check size={52} />} text="Dirawat awal" size={46} bg={C.green} color="#fff" /></Pop>
      <Pop at={aKawan} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="talk" size={56} f={f} />} text="Ingatkan kawan-kawan" size={40} /></Pop>
      <Pop at={aSar} style={{left: 60, top: 800}}><IconPill icon={<KIcon name="testkit" size={56} f={f} />} text="Buat saringan!" size={42} bg={C.labelPink} color="#fff" /></Pop>
      <Who preset={HIDAYAH} x={60} y={960} w={470} mood="happy" pose="wave" seed={21} />
      <Who preset={KAWAN} x={560} y={1020} w={420} mood="happy" pose="clasp" seed={8} />
      <Burst f={f} a={0} x={300} y={1080} />
    </Camera>
  );
};

/* ================= 12 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Closing
      p={p}
      aSaya={at(p, 'saya doktor', 3.8)}
      lines={[
        {a: at(p, 'sudah lama', 0.1), node: <IconPill icon={<KIcon name="calendar" size={60} f={f} />} text="Lama tak buat saringan?" size={42} />},
        {a: at(p, 'jangan tunggu', 1.4), node: <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />},
        {a: at(p, 'buat ujian', 2.4), node: <IconPill icon={<KIcon name="testkit" size={60} f={f} />} text="Buat ujian HPV" size={46} bg={C.green} color="#fff" />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, hidayah: Hidayah, risau: Risau, diagnosis: Diagnosis, lima: Lima,
  punca: Punca, senyap: Senyap, saringan: Saringan, amaran: Amaran, vaksin: Vaksin,
  positif: Positif, pulih: Pulih, penutup: Penutup,
};
