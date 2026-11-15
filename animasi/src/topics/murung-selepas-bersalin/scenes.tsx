import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Bubble, Burst, C, Camera, Check, ClinicSign, clamp, Closing, FiveIntro, Glow, Icon, IconPill, interpolate, KIcon, LEAF,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, Txt, useCurrentFrame, Who,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const NURUL: AvatarPreset = {
  id: 'nurul', skin: '#DDA882', skinShade: '#C28C66', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#9C8EE1', topShade: '#7A6BC8',
  hijabColor: '#F29CBC', hijabShade: '#D2638E', accessory: null,
};
export const SUAMI: AvatarPreset = {
  id: 'suami-nurul', skin: '#C9926A', skinShade: '#AD774F', hair: 'short', hairColor: '#1E1A24', top: 'tee', topColor: '#3E7CC9', topShade: '#2E5F9E',
  accessory: null, stubble: true,
};

/** Bayi dalam dukungan (diletak di atas tangan avatar pose 'clasp'). */
const Held: React.FC<{w: number}> = ({w}) => (
  <div style={{position: 'absolute', left: w * 0.3, top: w * 0.9}}>
    <KIcon name="baby" size={w * 0.42} />
  </div>
);

const Tears: React.FC<{f: number; x: number; y: number}> = ({f, x, y}) => (
  <>
    {[0, 1].map((i) => {
      const t = (f + i * 14) % 28;
      return <div key={i} style={{position: 'absolute', left: x + i * 100, top: y + t * 3, width: 16, height: 24, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: '#9FD6F7', opacity: interpolate(t, [0, 4, 22, 28], [0, 1, 1, 0])}} />;
    })}
  </>
);

/* ================= 0 — Hook: sepatutnya bahagia… tapi kesedihan tak hilang ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aBah = at(p, 'bahagia', 2.9);
  const aTapi = at(p, 'tapi', 4.2);
  const aSed = at(p, 'kesedihan', 7.4);
  const dark = interpolate(f, [aTapi, aSed + 10], [0, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.pink[0]} 0%, #F6C9A8 100%)`}} />
      <AbsoluteFill style={{opacity: dark}}><NightSky seed={9} glow={C.violet[3]} /></AbsoluteFill>
      <div style={{position: 'absolute', left: 540 - 200, top: 600, opacity: interpolate(f, [0, 8], [0, 1], clamp), filter: `grayscale(${dark})`}}>
        <KIcon name="baby" size={400} />
      </div>
      {f >= aBah && f < aSed
        ? [0, 1, 2].map((i) => (
            <div key={i} style={{position: 'absolute', left: 300 + i * 200, top: 560 - ((f - aBah + i * 8) % 40) * 3, opacity: 1 - dark}}>
              <KIcon name="heart" size={80} />
            </div>
          ))
        : null}
      <Pop at={aBah - 4} style={{left: 0, width: 1080, top: 1060, display: 'flex', justifyContent: 'center'}}>
        <Txt size={90} color={f >= aTapi ? C.violet[4] : C.navy} style={{textDecoration: f >= aTapi ? 'line-through' : 'none'}}>Bahagia?</Txt>
      </Pop>
      <Pop at={aSed} style={{left: 0, width: 1080, top: 1220, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, background: C.navy, padding: '14px 36px 14px 18px', borderRadius: 50}}>
          <KIcon name="drop" size={80} />
          <Txt size={48}>Kesedihan yang tak hilang</Txt>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Nurul, 3 minggu selepas bersalin: menangis, tak boleh tidur ================= */
export const Nurul: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aUmur = at(p, 'dua puluh', 0.7);
  const aMing = at(p, 'tiga minggu', 2.1);
  const aNan = at(p, 'menangis', 5.2);
  const aBayi = at(p, 'bayi tidur', 6.0);
  const aTak = at(p, 'tak boleh', 7.7);
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, #0B0824 0%, ${C.night[2]} 100%)`}} />
      <div style={{position: 'absolute', left: 860, top: 640}}><Icon name="moon" size={140} /></div>
      <Pop at={aUmur} style={{left: 60, top: 540}}><Pill text="Nurul, 29" bg={C.navy} color={C.yellow} size={54} /></Pop>
      <Pop at={aMing} style={{left: 60, top: 650}}><Pill text="3 minggu selepas bersalin" bg={C.labelPink} size={42} /></Pop>
      <div style={{position: 'absolute', left: 40, top: 900}}>
        <Who preset={NURUL} x={0} y={0} w={460} mood={f >= aTak ? 'tired' : 'sad'} pose="clasp" seed={2} />
        {f >= aNan ? <Tears f={f} x={150} y={300} /> : null}
      </div>
      {/* buaian */}
      <div style={{position: 'absolute', left: 600, top: 1180, width: 380, height: 220, borderRadius: '30px 30px 120px 120px', background: C.violet[2]}} />
      <div style={{position: 'absolute', left: 690, top: 1080}}><KIcon name="baby" size={200} /></div>
      {f >= aBayi ? <div style={{position: 'absolute', left: 860, top: 960}}><KIcon name="zzz" size={130} f={f} /></div> : null}
      <Pop at={aTak} style={{left: 420, top: 780}}>
        <IconPill icon={<KIcon name="clock" size={64} f={f} />} text="Ibu tetap tak boleh tidur" size={38} />
      </Pop>
    </Camera>
  );
};

/* ================= 2 — "Aku ibu yang gagal" ================= */
export const Gagal: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aAnak = at(p, 'anak aku', 1.7);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <NightSky seed={13} glow={C.pink[2]} />
      <Glow x={540} y={1000} r={480} color={C.pink[2]} opacity={0.3} />
      <div style={{position: 'absolute', left: 300, top: 980}}>
        <Who preset={NURUL} x={0} y={0} w={480} mood="sad" pose="clasp" seed={2} />
        <Tears f={f} x={160} y={310} />
      </div>
      <Pop at={2} style={{left: 140, top: 580}}>
        <Bubble tail="right" size={48} bg="#fff">"Aku ibu yang gagal…"</Bubble>
      </Pop>
      <Pop at={aAnak} style={{left: 30, top: 760}}>
        <Bubble tail="right" size={31} bg={C.navy} color="#fff">"Anak aku layak dapat ibu yang lebih baik."</Bubble>
      </Pop>
      <div style={{position: 'absolute', left: 820, top: 900, opacity: interpolate(f, [4, 14], [0, 1], clamp)}}><KIcon name="heartbreak" size={160} f={f} /></div>
    </Camera>
  );
};

/* ================= 3 — Suami perasan → klinik ================= */
export const Suami: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aDiam = at(p, 'diam', 1.5);
  const aDuk = at(p, 'dukung', 2.9);
  const aKli = at(p, 'klinik', 4.6);
  return (
    <Camera dur={p.dur} to={1.08} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[3]}} />
      <Pop at={aDiam} style={{left: 60, top: 570}}><IconPill icon={<Txt size={60} color={C.violet[1]}>…</Txt>} text="Makin diam" size={42} /></Pop>
      <Pop at={aDuk} style={{left: 60, top: 690}}><IconPill icon={<KIcon name="baby" size={64} />} text="Jarang mahu dukung bayi" size={40} /></Pop>
      {f >= aKli - 4 ? <ClinicSign x={560} y={780} w={420} /> : null}
      <Who preset={SUAMI} x={40} y={980} w={420} mood="curious" pose={f >= aKli ? 'point' : 'chin'} seed={4} />
      <Who preset={NURUL} x={520} y={1040} w={400} mood="sad" pose="down" seed={2} />
    </Camera>
  );
};

/* ================= 4 — Diagnosis ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKem = at(p, 'kemurungan', 2.6);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[3]} 0%, ${C.violet[2]} 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      <Pop at={1} style={{left: 640, top: 920}}><IconPill icon={<KIcon name="calendar" size={60} f={f} />} text="Saringan" size={42} /></Pop>
      <Who preset={p.preset} x={20} y={880} w={540} mood="neutral" pose={f >= aKem ? 'point' : 'chin'} />
      <Who preset={NURUL} x={640} y={1060} w={380} mood="sad" pose="clasp" seed={2} />
      <Stamp f={f} a={aKem} top="DIAGNOSIS" big="KEMURUNGAN" sub="selepas bersalin" bigSize={116} y={500} />
    </Camera>
  );
};

/* ================= 5 — Bukan kelemahan, bukan salah ibu + 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => (
  <FiveIntro
    p={p}
    aFive={at(p, 'lima', 3.1)}
    sub="perkara keluarga perlu tahu"
    glow={C.pink[0]}
    head={
      <>
        <Pop at={at(p, 'kelemahan', 0.3)} style={{left: 0, width: 1080, top: 540, display: 'flex', justifyContent: 'center'}}>
          <IconPill icon={<Check size={56} />} text="Bukan kelemahan" size={48} />
        </Pop>
        <Pop at={at(p, 'salah', 1.9)} style={{left: 0, width: 1080, top: 680, display: 'flex', justifyContent: 'center'}}>
          <IconPill icon={<Check size={56} />} text="Bukan salah ibu" size={48} bg={C.labelPink} color="#fff" />
        </Pop>
      </>
    }
  />
);

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/* ================= 6–10 — #1–#5 ================= */
export const Blues: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="BABY BLUES"
      titleSize={96}
      bg={BG(C.night[1], C.violet[0])}
      hero={<div style={{position: 'relative'}}><KIcon name="baby" size={260} /><div style={{position: 'absolute', left: 190, top: 0}}><KIcon name="drop" size={90} /></div></div>}
      items={[
        {a: at(p, 'sedih', 3.6), icon: <KIcon name="drop" size={76} />, text: 'Sedih, mudah menangis'},
        {a: at(p, 'minggu pertama', 5.0), icon: <KIcon name="calendar" size={76} f={f} />, text: 'Minggu pertama'},
        {a: at(p, 'hilang sendiri', 6.3), icon: <Check size={70} />, text: 'Hilang sendiri ≤ 2 minggu', bg: C.green, size: 38},
      ]}
      mood="curious"
    />
  );
};

export const Tanda: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="TANDA KEMURUNGAN"
      titleSize={74}
      bg={BG(C.night[0], '#3A1F4A')}
      glow={C.pink[2]}
      hero={<div style={{position: 'relative', width: 300, height: 380}}><Who preset={NURUL} x={0} y={0} w={300} mood="sad" pose="clasp" seed={2} /></div>}
      items={[
        {a: at(p, 'sedih atau', 1.9), icon: <KIcon name="empty" size={76} f={f} />, text: 'Sedih / kosong > 2 minggu', size: 38},
        {a: at(p, 'hilang minat', 4.3), icon: <KIcon name="heartbreak" size={76} f={f} />, text: 'Hilang minat'},
        {a: at(p, 'bersalah', 5.4), icon: <KIcon name="storm" size={76} f={f} />, text: 'Rasa bersalah'},
        {a: at(p, 'rapat', 6.6), icon: <KIcon name="baby" size={76} />, text: 'Sukar rapat dengan bayi', bg: RED, size: 38},
      ]}
      mood="sad"
      pose="clasp"
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
      bg={BG('#0F0C2E', C.night[3])}
      hero={<KIcon name="warning" size={260} />}
      items={[
        {a: at(p, 'pernah', 2.4), icon: <KIcon name="storm" size={76} f={f} />, text: 'Pernah murung'},
        {a: at(p, 'sokongan', 3.3), icon: <Icon name="family" size={76} />, text: 'Kurang sokongan'},
        {a: at(p, 'tekanan', 4.3), icon: <KIcon name="bolt" size={76} f={f} />, text: 'Tekanan hidup'},
        {a: at(p, 'kelahiran', 5.5), icon: <KIcon name="hospital" size={76} />, text: 'Kelahiran yang sukar'},
      ]}
    />
  );
};

export const Keluarga: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="PERANAN KELUARGA"
      titleSize={76}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={
        <div style={{position: 'relative', width: 300, height: 380}}>
          <Who preset={SUAMI} x={0} y={0} w={300} mood="happy" pose="clasp" seed={4} />
          <Held w={300} />
        </div>
      }
      items={[
        {a: at(p, 'dengar', 1.9), icon: <KIcon name="talk" size={76} f={f} />, text: 'Dengar tanpa menghakimi', size: 38},
        {a: at(p, 'bantu', 3.7), icon: <KIcon name="baby" size={76} />, text: 'Bantu jaga bayi'},
        {a: at(p, 'rehat', 5.7), icon: <KIcon name="bed" size={76} />, text: 'Ibu dapat rehat & tidur', bg: C.green},
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
      titleSize={100}
      bg={BG(C.night[1], C.violet[2])}
      hero={<KIcon name="talk" size={260} f={f} />}
      items={[
        {a: at(p, 'terapi', 1.5), icon: <KIcon name="talk" size={76} f={f} />, text: 'Terapi bercakap', bg: C.green},
        {a: at(p, 'ubat jika', 2.7), icon: <KIcon name="pill" size={76} />, text: 'Ubat jika perlu'},
        {a: at(p, 'menyusu', 5.9), icon: <KIcon name="bottle" size={76} />, text: 'Ada ubat selamat semasa menyusu', size: 32},
        {a: at(p, 'nasihat', 7.0), icon: <Icon name="doctor" size={76} />, text: 'Ikut nasihat doktor'},
      ]}
      mood="happy"
    />
  );
};

/* ================= 11 — Nurul kembali tersenyum ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSen = at(p, 'tersenyum', 2.7);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.violet[0]} 0%, ${C.pink[0]} 60%, #F6A86B 100%)`}} />
      <Glow x={540} y={1050} r={560} color={C.yellow} opacity={0.35} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: LEAF}} />
      <Pop at={2} style={{left: 60, top: 520}}><Pill text="Beberapa bulan rawatan…" bg={C.navy} color={C.yellow} size={46} /></Pop>
      <Pop at={aSen} style={{left: 60, top: 640}}><Pill text="Nurul kembali tersenyum" bg={C.green} size={48} /></Pop>
      <div style={{position: 'absolute', left: 120, top: 900}}>
        <Who preset={NURUL} x={0} y={0} w={460} mood="happy" pose="clasp" seed={2} />
        <Held w={460} />
      </div>
      <Who preset={SUAMI} x={600} y={980} w={400} mood="happy" pose="wave" seed={4} />
      <Burst f={f} a={aSen} x={360} y={1100} />
    </Camera>
  );
};

/* ================= 12 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => (
  <Closing
    p={p}
    aSaya={at(p, 'saya doktor', 9.8)}
    lines={[
      {a: at(p, 'kalau anda', 0.1), node: <IconPill icon={<Icon name="family" size={64} />} text="Anda atau isteri rasa begini?" size={40} />},
      {a: at(p, 'jangan tunggu', 2.4), node: <Pill text="Jangan tunggu, dapatkan rawatan" bg={C.labelPink} size={46} />},
      {
        a: at(p, 'kalau ada fikiran', 4.7),
        node: (
          <div style={{display: 'flex', alignItems: 'center', gap: 16, background: RED, padding: '12px 30px 12px 16px', borderRadius: 40, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
            <KIcon name="warning" size={70} />
            <div>
              <Txt size={30}>Fikiran mencederakan diri atau bayi?</Txt>
              <Txt size={36} color={C.yellow}>Dapatkan bantuan kecemasan segera</Txt>
            </div>
          </div>
        ),
      },
    ]}
  />
);

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, nurul: Nurul, gagal: Gagal, suami: Suami, diagnosis: Diagnosis, lima: Lima,
  blues: Blues, tanda: Tanda, risiko: Risiko, keluarga: Keluarga, rawatan: Rawatan,
  pulih: Pulih, penutup: Penutup,
};
