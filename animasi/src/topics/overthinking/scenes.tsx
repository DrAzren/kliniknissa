import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Bubble, Burst, C, Camera, Check, clamp, Closing, Cross, FiveIntro, Glow, IconPill, interpolate, KIcon, LEAF, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, Txt, useCurrentFrame, Who,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const FARAH: AvatarPreset = {
  id: 'farah', skin: '#D9A47C', skinShade: '#BE8860', hair: 'hijab', hairColor: '#2A1C24', top: 'shirt', topColor: '#6157C5', topShade: '#4B3C9B',
  hijabColor: '#2BB3A3', hijabShade: '#1F8A7E', accessory: null,
};

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/** Awan fikiran berpusing di atas kepala. */
const Loop: React.FC<{f: number; x: number; y: number; items: string[]; r?: number}> = ({f, x, y, items, r = 170}) => (
  <>
    {items.map((t, i) => {
      const ang = f / 22 + (i * Math.PI * 2) / items.length;
      return (
        <div key={i} style={{position: 'absolute', left: x + Math.cos(ang) * r - 110, top: y + Math.sin(ang) * r * 0.45 - 28, width: 220, display: 'flex', justifyContent: 'center', opacity: 0.6 + 0.4 * Math.sin(ang)}}>
          <div style={{background: '#fff', borderRadius: 30, padding: '8px 18px', boxShadow: '0 10px 24px rgba(18,11,51,.4)'}}><Txt size={26} color={C.navy}>{t}</Txt></div>
        </div>
      );
    })}
  </>
);

/* ================= 0 — Hook: otak tak boleh berhenti ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTidur = at(p, 'tidur', 2.9);
  const aOver = at(p, 'overthinking', 4.5);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={261} glow={C.violet[3]} />
      <Glow x={540} y={1050} r={460} color={C.labelPink} opacity={0.18} />
      <Pop at={0.1} style={{left: 0, width: 1080, top: 560, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<MIcon name="brain" size={60} f={f} />} text="Otak tak boleh berhenti…" size={46} />
      </Pop>
      <Pop at={aTidur} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="moon" size={56} f={f} />} text="Terutama bila nak tidur" size={38} /></Pop>
      <div style={{position: 'absolute', left: 760, top: 800}}><KIcon name="spiral" size={220} f={f} /></div>
      <Who preset={FARAH} x={300} y={1000} w={480} mood="tired" pose="chin" seed={51} />
      <Pop at={aOver} style={{left: 0, width: 1080, top: 1500, display: 'flex', justifyContent: 'center'}}>
        <Pill text="OVERTHINKING" bg={C.labelPink} size={64} />
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Farah, 29: ulang perbualan, bayang semua salah ================= */
export const Farah: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aMalam = at(p, 'setiap malam', 3.4);
  const aSalah = at(p, 'salah', 8.7);
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: f >= aMalam ? BG(C.night[1], C.violet[1]) : BG(C.violet[0], C.pink[0])}} />
      {f >= aMalam ? <NightSky seed={77} top="transparent" bottom="transparent" stars={50} glow={C.violet[3]} /> : null}
      <Pop at={0} style={{left: 60, top: 560}}><Pill text="Farah, 29 tahun" bg={C.navy} color={C.yellow} size={48} /></Pop>
      <Pop at={1.5} style={{left: 520, top: 560}}><IconPill icon={<KIcon name="laptop" size={52} f={f} />} text="Eksekutif pemasaran" size={30} /></Pop>
      {f >= aMalam ? (
        <>
          <Pop at={aMalam} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="moon" size={52} f={f} />} text="Setiap malam…" size={38} /></Pop>
          <Loop f={f - aMalam} x={540} y={900} items={['"Kenapa aku cakap macam tu?"', '"Bos marah ke?"', '"Kalau gagal…"']} />
        </>
      ) : null}
      <Who preset={FARAH} x={300} y={1040} w={460} mood={f >= aMalam ? 'sad' : 'neutral'} pose={f >= aMalam ? 'chin' : 'clasp'} seed={51} />
      <Pop at={aSalah} style={{left: 0, width: 1080, top: 1520, display: 'flex', justifyContent: 'center'}}><Pill text="Bayangkan semua jadi salah" bg={RED} size={40} /></Pop>
    </Camera>
  );
};

/* ================= 2 — Tidur lewat, bangun penat, sukar buat keputusan ================= */
export const Lewat: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const items = [
    {a: at(p, 'lewat', 0.3), t: 'Tidur lewat', i: <KIcon name="clock" size={56} f={f * 3} />},
    {a: at(p, 'bangun', 1.2), t: 'Bangun penat', i: <KIcon name="battery" size={56} f={f} text="15" />},
    {a: at(p, 'keputusan', 2.4), t: 'Sukar buat keputusan', i: <KIcon name="question" size={56} />},
  ];
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: BG(C.night[1], C.violet[1])}} />
      <NightSky seed={58} top="transparent" bottom="transparent" stars={40} glow={C.violet[3]} />
      {items.map((it, i) => <Pop key={i} at={it.a} style={{left: 60, top: 560 + i * 115}} origin="left center"><IconPill icon={it.i} text={it.t} size={40} bg={C.navy} color="#fff" /></Pop>)}
      <Who preset={FARAH} x={60} y={980} w={460} mood="tired" pose="down" seed={51} />
      <div style={{position: 'absolute', left: 620, top: 980}}><KIcon name="bed" size={320} /></div>
    </Camera>
  );
};

/* ================= 3 — Doktor menilai: fikiran berulang, berkait kebimbangan ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aStamp = at(p, 'terperangkap', 2.6);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: BG(C.night[3], C.violet[2])}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      {f < aStamp - 6 ? <Pop at={0.3} style={{left: 0, width: 1080, top: 720, display: 'flex', justifyContent: 'center'}}><IconPill icon={<KIcon name="talk" size={56} f={f} />} text="Doktor menilai" size={46} /></Pop> : null}
      <Who preset={p.preset} x={20} y={1040} w={460} mood="neutral" pose={f < aStamp ? 'chin' : 'point'} />
      <Who preset={FARAH} x={600} y={1060} w={420} mood={f >= aStamp ? 'curious' : 'sad'} pose="clasp" seed={51} />
      <Stamp f={f} a={aStamp} top="FIKIRAN BERULANG" big="OVERTHINKING" sub="Berkait kebimbangan" bigSize={96} y={560} />
    </Camera>
  );
};

/* ================= 4 — Ramai mengalaminya + 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => (
  <FiveIntro
    p={p}
    aFive={at(p, 'lima perkara', 1.7)}
    sub="perkara perlu anda tahu"
    glow={C.pink[0]}
    head={
      <Pop at={at(p, 'ramai', 0.1)} style={{left: 0, width: 1080, top: 580, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="person" size={56} />} text="Ramai yang mengalaminya" size={42} />
      </Pop>
    }
  />
);

/* ================= 5–9 — #1–#5 ================= */
export const Normal: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="MERANCANG vs FIKIR BERLEBIHAN"
      titleSize={60}
      bg={BG(C.night[1], C.violet[0])}
      hero={<KIcon name="spiral" size={240} f={f} />}
      items={[
        {a: at(p, 'normal', 1.3), icon: <MIcon name="brain" size={76} f={f} />, text: 'Berfikir itu normal'},
        {a: at(p, 'merancang', 2.4), icon: <KIcon name="checklist" size={76} />, text: 'Merancang → tindakan', bg: C.green},
        {a: at(p, 'berlebihan', 4.9), icon: <KIcon name="spiral" size={76} f={f} />, text: 'Fikir berlebihan → berpusing', size: 34, bg: RED},
      ]}
    />
  );
};

export const Kesan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="KESANNYA"
      titleSize={96}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={<KIcon name="storm" size={240} f={f} />}
      items={[
        {a: at(p, 'tidur', 1.4), icon: <KIcon name="bed" size={76} />, text: 'Ganggu tidur', bg: RED},
        {a: at(p, 'kebimbangan', 2.9), icon: <KIcon name="heart" size={76} f={f} />, text: 'Berkait kebimbangan'},
        {a: at(p, 'kemurungan', 4.1), icon: <KIcon name="heartbreak" size={76} f={f} />, text: 'Berkait kemurungan'},
      ]}
    />
  );
};

export const Masa: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="TETAPKAN MASA RISAU"
      titleSize={76}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<KIcon name="notebook" size={250} f={f} />}
      items={[
        {a: at(p, 'minit', 2.6), icon: <KIcon name="clock" size={76} f={f * 2} />, text: '15 minit sehari', bg: C.green},
        {a: at(p, 'menulis', 3.6), icon: <KIcon name="notebook" size={76} f={f} />, text: 'Tulis kerisauan anda'},
        {a: at(p, 'tangguhkan', 6.3), icon: <KIcon name="hourglass" size={76} f={f} />, text: 'Di luar masa itu, tangguh', size: 34},
      ]}
      mood="happy"
    />
  );
};

export const Tanya: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="BOLEH SAYA BUAT SESUATU?"
      titleSize={66}
      bg={BG(C.night[1], C.violet[1])}
      hero={<KIcon name="question" size={240} />}
      items={[
        {a: at(p, 'jika boleh', 2.8), icon: <Check size={70} />, text: 'Ya → rancang 1 langkah kecil', bg: C.green, size: 34},
        {a: at(p, 'jika tidak', 5.4), icon: <KIcon name="ball" size={76} f={f} />, text: 'Tidak → alih kepada aktiviti', size: 34},
      ]}
      mood="happy"
    />
  );
};

export const Badan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKafein = at(p, 'kafein', 2.9);
  const aPhone = at(p, 'telefon', 4.1);
  return (
    <PointScene
      p={p}
      title="JAGA BADAN"
      titleSize={92}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      grid
      items={[
        {a: at(p, 'bersenam', 1.7), icon: <KIcon name="shoe" size={90} />, text: 'Bersenam', bg: C.green, size: 32},
        {
          a: aKafein,
          icon: (
            <div style={{position: 'relative', width: 90, height: 90}}>
              <KIcon name="coffee" size={90} f={f} />
              <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - aKafein - 6} size={90} /></div>
            </div>
          ),
          text: 'Kurangkan kafein',
          size: 28,
        },
        {
          a: aPhone,
          icon: (
            <div style={{position: 'relative', width: 90, height: 90}}>
              <KIcon name="phone" size={90} f={f} />
              <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - aPhone - 6} size={90} /></div>
            </div>
          ),
          text: 'Letak telefon sebelum tidur',
          bg: C.green,
          size: 24,
        },
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
        {a: at(p, 'berterusan', 1.2), icon: <KIcon name="calendar" size={76} f={f} />, text: 'Berterusan'},
        {a: at(p, 'kerja', 2.5), icon: <KIcon name="laptop" size={76} f={f} />, text: 'Mengganggu kerja'},
        {a: at(p, 'putus asa', 4.0), icon: <KIcon name="heartbreak" size={76} f={f} />, text: 'Rasa putus asa', bg: RED},
        {a: at(p, 'terapi', 5.9), icon: <KIcon name="talk" size={76} f={f} />, text: 'Terapi bercakap membantu', bg: C.green, size: 34},
      ]}
    />
  );
};

/* ================= 11 — Farah pulih ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aLena = at(p, 'lena', 2.4);
  const aTenang = at(p, 'tenang', 3.2);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG('#7FC4F2', '#F6D6A8')}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: LEAF}} />
      <Pop at={0} style={{left: 60, top: 560}}><IconPill icon={<KIcon name="calendar" size={56} f={f} />} text="Selepas beberapa minggu" size={40} /></Pop>
      <Pop at={aLena} style={{left: 60, top: 680}}><IconPill icon={<KIcon name="bed" size={56} />} text="Tidur lebih lena" size={42} bg={C.green} color="#fff" /></Pop>
      <Pop at={aTenang} style={{left: 60, top: 800}}><IconPill icon={<Check size={52} />} text="Lebih tenang buat keputusan" size={36} /></Pop>
      <Who preset={FARAH} x={300} y={960} w={480} mood="happy" pose="wave" seed={51} />
      <div style={{position: 'absolute', left: 800, top: 940}}><KIcon name="sun" size={220} f={f} /></div>
      <Burst f={f} a={aLena} x={540} y={1060} />
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
        {a: at(p, 'fikiran', 0.1), node: <IconPill icon={<KIcon name="spiral" size={60} f={f} />} text="Fikiran tak berhenti?" size={44} />},
        {a: at(p, 'jangan pendam', 1.3), node: <Pill text="Jangan pendam sendiri" bg={C.labelPink} size={52} />},
        {a: at(p, 'dapatkan', 2.6), node: <IconPill icon={<KIcon name="talk" size={60} f={f} />} text="Dapatkan bantuan" size={46} bg={C.green} color="#fff" />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, farah: Farah, lewat: Lewat, diagnosis: Diagnosis, lima: Lima,
  normal: Normal, kesan: Kesan, masa: Masa, tanya: Tanya, badan: Badan,
  doktor: Doktor, pulih: Pulih, penutup: Penutup,
};

void Bubble; void clamp; void interpolate;
