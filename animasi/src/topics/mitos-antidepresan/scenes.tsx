import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Bubble, Burst, C, Camera, Check, clamp, Closing, Cross, FiveIntro, Glow, IconPill, interpolate, KIcon, LEAF, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, Txt, useCurrentFrame, Who,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const KAMAL: AvatarPreset = {
  id: 'kamal', skin: '#C9926A', skinShade: '#AD774F', hair: 'short', hairColor: '#1E1A24', top: 'shirt', topColor: '#4F79C7', topShade: '#3A5E9E',
  accessory: null, stubble: true,
};
export const KAWAN: AvatarPreset = {
  id: 'kawan-kamal', skin: '#E0AE88', skinShade: '#C69270', hair: 'short', hairColor: '#2A1C24', top: 'tee', topColor: '#F7A23B', topShade: '#E0812A',
  accessory: null,
};

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/** Kad "MITOS" / "FAKTA". */
const Tag: React.FC<{fact?: boolean; size?: number}> = ({fact, size = 46}) => (
  <div style={{background: fact ? C.green : RED, borderRadius: 18, padding: '8px 26px', boxShadow: '0 10px 24px rgba(18,11,51,.45)', transform: 'rotate(-4deg)'}}>
    <Txt size={size} color="#fff" style={{letterSpacing: 3}}>{fact ? 'FAKTA' : 'MITOS'}</Txt>
  </div>
);

/* ================= 0 — Hook: ketagih? seumur hidup? ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKet = at(p, 'ketagih', 0.9);
  const aSeumur = at(p, 'seumur', 2.2);
  const aBetul = at(p, 'betulkan', 3.6);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={311} glow={C.violet[3]} />
      <Glow x={540} y={1050} r={460} color={C.labelPink} opacity={0.18} />
      <Pop at={0.1} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="pillbottle" size={60} />} text="Ubat kemurungan…" size={44} /></Pop>
      <Pop at={aKet} style={{left: 60, top: 690}}><Pill text="Buat ketagih?" bg={RED} size={44} /></Pop>
      <Pop at={aSeumur} style={{left: 540, top: 690}}><Pill text="Seumur hidup?" bg={RED} size={44} /></Pop>
      <Who preset={KAMAL} x={300} y={1000} w={480} mood="curious" pose="chin" seed={31} />
      <Pop at={aBetul} style={{left: 140, top: 840}}><Tag /></Pop>
      {f >= aBetul + 8 ? <div style={{position: 'absolute', left: 140, top: 820, width: 220, height: 120}}><Cross f={f - aBetul - 8} size={150} /></div> : null}
      <Pop at={aBetul + 14} style={{left: 640, top: 840}}><Tag fact /></Pop>
    </Camera>
  );
};

/* ================= 1 — Kamal, 40, juruteknik; didiagnosis kemurungan, diberi antidepresan ================= */
export const Kamal: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aJuru = at(p, 'juruteknik', 1.8);
  const aSah = at(p, 'kemurungan', 4.3);
  const aUbat = at(p, 'antidepresan', 6.2);
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: BG(C.violet[0], C.pink[0])}} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: '#DDE3F0'}} />
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Encik Kamal, 40 tahun" bg={C.navy} color={C.yellow} size={48} /></Pop>
      <Pop at={aJuru} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="keys" size={52} />} text="Juruteknik" size={40} /></Pop>
      <Pop at={aSah} style={{left: 60, top: 790}}><IconPill icon={<MIcon name="brain" size={56} f={f} />} text="Disahkan: kemurungan" size={38} bg={C.labelPink} color="#fff" /></Pop>
      <Who preset={KAMAL} x={60} y={980} w={460} mood="sad" pose="clasp" seed={31} />
      <Who preset={p.preset} x={600} y={1020} w={420} mood="neutral" pose="point" />
      <Pop at={aUbat} style={{left: 520, top: 900}}><IconPill icon={<KIcon name="pillbottle" size={56} />} text="Antidepresan" size={38} /></Pop>
    </Camera>
  );
};

/* ================= 2 — Kamal takut; kawan kata ketagih → ubat disimpan dalam laci ================= */
export const Takut: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKawan = at(p, 'kawannya', 1.4);
  const aLaci = at(p, 'simpan', 5.4);
  const shut = interpolate(f, [aLaci + 20, aLaci + 34], [1, 0], clamp);
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: BG(C.night[1], C.violet[1])}} />
      <NightSky seed={53} top="transparent" bottom="transparent" stars={40} glow={C.violet[3]} />
      <Pop at={0.1} style={{left: 60, top: 560}}><Pill text="Kamal takut" bg={RED} size={50} /></Pop>
      {f < aLaci ? (
        <>
          <Who preset={KAWAN} x={600} y={1020} w={420} mood="curious" pose="point" seed={9} />
          <Pop at={aKawan} style={{left: 440, top: 700}}>
            <Bubble tail="right" size={40}>“Ubat tu buat ketagih,<br />tak boleh berhenti!”</Bubble>
          </Pop>
        </>
      ) : (
        <>
          <Pop at={aLaci} style={{left: 600, top: 1000}}><KIcon name="drawer" size={340} text={String(shut)} /></Pop>
          <Pop at={aLaci + 4} style={{left: 520, top: 760}}><IconPill icon={<KIcon name="pillbottle" size={56} />} text="Disimpan dalam laci" size={36} /></Pop>
        </>
      )}
      <Who preset={KAMAL} x={60} y={980} w={460} mood={f >= aKawan ? 'shock' : 'sad'} pose="clasp" seed={31} />
    </Camera>
  );
};

/* ================= 3 — 2 bulan kemudian, bertambah teruk → kembali, bincang terbuka ================= */
export const Teruk: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTeruk = at(p, 'bertambah', 1.9);
  const aKembali = at(p, 'kembali', 3.3);
  const back = f >= aKembali;
  return (
    <Camera dur={p.dur} to={1.08} panY={-12}>
      <AbsoluteFill style={{background: back ? BG(C.violet[0], C.pink[0]) : BG(C.night[3], '#5A1F3A')}} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: back ? '#DDE3F0' : C.night[1]}} />
      <Pop at={0} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="calendar" size={56} f={f} />} text="2 bulan kemudian" size={44} /></Pop>
      {!back ? (
        <>
          <Pop at={aTeruk} style={{left: 0, width: 1080, top: 700, display: 'flex', justifyContent: 'center'}}><Pill text="Kemurungan bertambah teruk" bg={RED} size={46} /></Pop>
          <Who preset={KAMAL} x={300} y={960} w={480} mood="sad" pose="down" seed={31} />
          <div style={{position: 'absolute', left: 760, top: 900}}><KIcon name="storm" size={240} f={f} /></div>
        </>
      ) : (
        <>
          <Pop at={aKembali} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="hospital" size={56} />} text="Kembali jumpa doktor" size={40} /></Pop>
          <Pop at={at(p, 'berbincang', 4.8)} style={{left: 60, top: 800}}><IconPill icon={<KIcon name="talk" size={56} f={f} />} text="Bincang secara terbuka" size={40} bg={C.green} color="#fff" /></Pop>
          <Who preset={KAMAL} x={40} y={1000} w={440} mood="neutral" pose="clasp" seed={31} />
          <Who preset={p.preset} x={580} y={1000} w={440} mood="happy" pose="point" />
        </>
      )}
    </Camera>
  );
};

/* ================= 4 — Ramai takut + 5 fakta ================= */
export const Lima: React.FC<SceneProps> = (p) => (
  <FiveIntro
    p={p}
    aFive={at(p, 'lima fakta', 2.5)}
    sub="fakta tentang ubat kemurungan"
    glow={C.pink[0]}
    head={
      <Pop at={at(p, 'ramai', 0.1)} style={{left: 0, width: 1080, top: 580, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="person" size={56} />} text="Ramai takut seperti Kamal" size={42} />
      </Pop>
    }
  />
);

/* ================= 5–9 — #1–#5 ================= */
export const Ketagih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="BUKAN UBAT KETAGIHAN"
      titleSize={72}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}><KIcon name="pillbottle" size={220} /><Tag fact /></div>}
      items={[
        {a: at(p, 'khayal', 3.9), icon: <KIcon name="dizzy" size={76} f={f} />, text: 'Tidak buat khayal', bg: C.green},
        {a: at(p, 'keinginan', 5.7), icon: <KIcon name="pill" size={76} />, text: 'Tiada keinginan tambah dos', size: 34},
      ]}
      mood="happy"
    />
  );
};

export const Masa: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="IA MENGAMBIL MASA"
      titleSize={78}
      bg={BG(C.night[1], C.violet[0])}
      hero={<KIcon name="hourglass" size={250} f={f} />}
      items={[
        {a: at(p, 'beberapa minggu', 3.8), icon: <KIcon name="calendar" size={76} f={f} />, text: 'Kesan selepas beberapa minggu', size: 32},
        {a: at(p, 'teruskan', 5.4), icon: <Check size={70} />, text: 'Teruskan seperti diarahkan', size: 34, bg: C.green},
      ]}
    />
  );
};

export const Sampingan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="KESAN SAMPINGAN"
      titleSize={80}
      bg={BG(C.night[1], C.violet[1])}
      hero={<KIcon name="pill" size={240} />}
      items={[
        {a: at(p, 'ringan', 1.9), icon: <KIcon name="smile" size={76} />, text: 'Biasanya ringan'},
        {a: at(p, 'berkurang', 2.9), icon: <KIcon name="hourglass" size={76} f={f} />, text: 'Sering berkurang', bg: C.green},
        {a: at(p, 'beritahu', 3.9), icon: <KIcon name="talk" size={76} f={f} />, text: 'Beritahu doktor jika ada masalah', size: 30},
      ]}
    />
  );
};

export const Henti: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKurang = at(p, 'kurangkan', 6.0);
  return (
    <PointScene
      p={p}
      title="JANGAN BERHENTI MENDADAK"
      titleSize={66}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={
        <div style={{position: 'relative', width: 240, height: 240}}>
          <KIcon name="pillbottle" size={240} />
          {f < aKurang ? <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - 20} size={240} /></div> : null}
        </div>
      }
      items={[
        {a: at(p, 'tibatiba', 2.6), icon: <KIcon name="dizzy" size={76} f={f} />, text: 'Simptom tidak selesa', bg: RED},
        {a: aKurang, icon: <KIcon name="checklist" size={76} />, text: 'Kurangkan dos berperingkat', size: 34, bg: C.green},
        {a: at(p, 'bersama doktor', 7.6), icon: <KIcon name="hospital" size={76} />, text: 'Bersama doktor'},
      ]}
    />
  );
};

export const Penenang: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="UBAT PENENANG BERBEZA"
      titleSize={70}
      bg={BG(C.night[1], C.violet[0])}
      glow={C.labelPink}
      hero={<div style={{display: 'flex', gap: 10, alignItems: 'center'}}><KIcon name="pill" size={170} /><KIcon name="moon" size={150} f={f} /></div>}
      items={[
        {a: at(p, 'sesetengah', 2.4), icon: <KIcon name="moon" size={76} f={f} />, text: 'Penenang & ubat tidur', size: 36},
        {a: at(p, 'kebergantungan', 5.3), icon: <KIcon name="warning" size={76} />, text: 'Boleh sebabkan kebergantungan', size: 30, bg: RED},
        {a: at(p, 'jangka pendek', 7.7), icon: <KIcon name="clock" size={76} f={f} />, text: 'Hanya jangka pendek'},
      ]}
    />
  );
};

/* ================= 10 — Ubat bukan satu-satunya rawatan ================= */
export const Terapi: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="BUKAN UBAT SAHAJA"
      titleSize={80}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<KIcon name="talk" size={240} f={f} />}
      items={[
        {a: at(p, 'terapi', 2.3), icon: <KIcon name="talk" size={76} f={f} />, text: 'Terapi bercakap', bg: C.green},
        {a: at(p, 'sokongan', 3.4), icon: <KIcon name="person" size={76} />, text: 'Sokongan keluarga'},
      ]}
      mood="happy"
    />
  );
};

/* ================= 11 — Kamal pulih ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTerapi = at(p, 'sesi', 2.5);
  const aPulih = at(p, 'pulih', 4.4);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG('#7FC4F2', '#F6D6A8')}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: LEAF}} />
      <Pop at={0} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="pillbottle" size={56} />} text="Ambil ubat dengan betul" size={40} /></Pop>
      <Pop at={aTerapi} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="talk" size={56} f={f} />} text="Ikuti sesi terapi" size={40} /></Pop>
      <Pop at={aPulih - 4} style={{left: 60, top: 800}}><Pill text="Semakin pulih!" bg={C.green} size={54} /></Pop>
      <Who preset={KAMAL} x={300} y={960} w={480} mood="happy" pose="wave" seed={31} />
      <div style={{position: 'absolute', left: 800, top: 940}}><KIcon name="sun" size={220} f={f} /></div>
      <Burst f={f} a={aPulih} x={820} y={1000} />
    </Camera>
  );
};

/* ================= 12 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Closing
      p={p}
      aSaya={at(p, 'saya doktor', 4.7)}
      lines={[
        {a: at(p, 'keraguan', 0.3), node: <IconPill icon={<KIcon name="question" size={60} />} text="Ragu tentang ubat anda?" size={42} />},
        {a: at(p, 'jangan berhenti', 1.9), node: <Pill text="Jangan berhenti sendiri" bg={C.labelPink} size={52} />},
        {a: at(p, 'bincang', 3.4), node: <IconPill icon={<KIcon name="talk" size={60} f={f} />} text="Bincang dengan doktor" size={44} bg={C.green} color="#fff" />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, kamal: Kamal, takut: Takut, teruk: Teruk, lima: Lima,
  ketagih: Ketagih, masa: Masa, sampingan: Sampingan, henti: Henti, penenang: Penenang,
  terapi: Terapi, pulih: Pulih, penutup: Penutup,
};

void Stamp;
