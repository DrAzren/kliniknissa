import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Burst, C, Camera, Check, ClinicSign, clamp, Closing, FiveIntro, Glow, Icon, IconPill, interpolate, KIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, Txt, useCurrentFrame, Who,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const AMIR: AvatarPreset = {
  id: 'amir', skin: '#C9926A', skinShade: '#AD774F', hair: 'side-part', hairColor: '#1E1A24', top: 'shirt', topColor: '#8DB8E8', topShade: '#6A98CC',
  accessory: null,
};

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/* ================= 0 — Hook: dada panas terbakar — jantung? gastrik? ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aBak = at(p, 'terbakar', 1.1);
  const aJan = at(p, 'jantung', 4.1);
  const aGas = at(p, 'gastrik', 7.5);
  const heat = interpolate(f, [aBak, aBak + 15], [0, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={5} glow={RED} />
      <Glow x={540} y={900} r={460} color="#FF7A3D" opacity={0.15 + 0.3 * heat + 0.06 * Math.sin(f / 3)} />
      <div style={{position: 'absolute', left: 540 - 230, top: 580, opacity: interpolate(f, [0, 8], [0, 1], clamp)}}>
        <KIcon name="reflux" size={460} f={f} />
      </div>
      <Pop at={aBak} style={{left: 0, width: 1080, top: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Panas terbakar lepas makan" bg={RED} size={50} />
      </Pop>
      <Pop at={aJan - 2} style={{left: 60, top: 1240}}>
        <IconPill icon={<KIcon name="heart" size={60} f={f} />} text="Sakit jantung?" size={42} />
      </Pop>
      <Pop at={aGas - 2} style={{left: 560, top: 1240}}>
        <IconPill icon={<KIcon name="stomach" size={60} f={f} />} text="Gastrik biasa?" size={42} />
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Amir: makan lewat, kopi, terus baring ================= */
export const Amir: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aUmur = at(p, 'tiga puluh', 0.4);
  const aBank = at(p, 'pegawai', 1.6);
  const aLew = at(p, 'lewat', 3.8);
  const aKopi = at(p, 'kopi', 4.6);
  const aBar = at(p, 'baring', 5.8);
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: BG('#0B0824', C.night[2])}} />
      <div style={{position: 'absolute', left: 700, top: 880, width: 330, height: 220, borderRadius: 18, background: '#2A2733', border: '10px solid #55516A'}}>
        <div style={{position: 'absolute', inset: 10, borderRadius: 8, background: `hsl(${(f * 4) % 360} 50% 55%)`, opacity: 0.7}} />
      </div>
      <Glow x={860} y={990} r={300} color="#7FC4F2" opacity={0.25} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: C.night[3]}} />
      <Pop at={aUmur} style={{left: 60, top: 540}}><Pill text="Amir, 36" bg={C.navy} color={C.yellow} size={54} /></Pop>
      <Pop at={aBank} style={{left: 60, top: 660}}><Pill text="Pegawai bank" bg={C.labelPink} size={42} /></Pop>
      <Who preset={AMIR} x={60} y={940} w={460} mood="happy" pose="clasp" seed={1} />
      {[{t: 'Makan lewat', a: aLew, i: <KIcon name="clock" size={60} f={f} />}, {t: 'Kopi', a: aKopi, i: <KIcon name="coffee" size={60} f={f} />}, {t: 'Terus baring', a: aBar, i: <KIcon name="couch" size={60} />}].map((x, i) => (
        <Pop key={x.t} at={x.a} style={{left: 560, top: 560 + i * 105}} origin="left center">
          <IconPill icon={x.i} text={x.t} size={40} />
        </Pop>
      ))}
    </Camera>
  );
};

/* ================= 2 — Pedih, masam ke tekak, batuk malam → klinik ================= */
export const Pedih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aPed = at(p, 'pedih', 0.8);
  const aMas = at(p, 'masam', 2.0);
  const aBat = at(p, 'batuk', 3.5);
  const aMing = at(p, 'tiga minggu', 6.0);
  const aKli = at(p, 'klinik', 7.8);
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: BG(C.night[1], '#4A1F3A')}} />
      <Glow x={290} y={1300} r={300} color="#FF7A3D" opacity={0.3 + 0.1 * Math.sin(f / 3)} />
      <Who preset={AMIR} x={60} y={960} w={460} mood={f >= aBat ? 'sad' : 'tired'} pose="clasp" seed={1} />
      {[{t: 'Dada pedih', a: aPed, i: <KIcon name="reflux" size={64} f={f} />}, {t: 'Masam naik ke tekak', a: aMas, i: <KIcon name="drop" size={60} />}, {t: 'Batuk waktu malam', a: aBat, i: <Icon name="moon" size={60} />}].map((x, i) => (
        <Pop key={x.t} at={x.a} style={{left: 480, top: 560 + i * 115}} origin="left center">
          <IconPill icon={x.i} text={x.t} size={38} bg={i === 0 ? RED : '#fff'} color={i === 0 ? '#fff' : C.navy} />
        </Pop>
      ))}
      <Pop at={aMing} style={{left: 560, top: 920}}><Pill text="3 minggu kemudian" bg={C.navy} color={C.yellow} size={40} /></Pop>
      {f >= aKli - 4 ? <ClinicSign x={560} y={1050} w={420} /> : null}
    </Camera>
  );
};

/* ================= 3 — Bukan jantung → REFLUKS ASID ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aBuk = at(p, 'bukan masalah', 1.0);
  const aRef = at(p, 'refluks', 4.8);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: BG(C.night[3], C.violet[2])}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      {f < aRef - 6 ? (
        <Pop at={aBuk} style={{left: 0, width: 1080, top: 600, display: 'flex', justifyContent: 'center'}}>
          <IconPill icon={<KIcon name="heart" size={70} f={f} />} text="Bukan masalah jantung ✓" size={48} bg={C.green} color="#fff" />
        </Pop>
      ) : null}
      <Who preset={p.preset} x={20} y={900} w={520} mood="neutral" pose={f >= aRef ? 'point' : 'chin'} />
      <Who preset={AMIR} x={630} y={1060} w={380} mood={f >= aRef ? 'shock' : 'tired'} pose="down" seed={1} />
      <Stamp f={f} a={aRef} top="DIAGNOSIS" big="REFLUKS ASID" bigSize={118} y={530} />
    </Camera>
  );
};

/* ================= 4 — Apa itu + 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <FiveIntro
      p={p}
      aFive={at(p, 'lima', 4.7)}
      sub="perkara anda perlu tahu"
      glow="#FF7A3D"
      head={
        <>
          <div style={{position: 'absolute', left: 60, top: 560, opacity: interpolate(f, [0, 8], [0, 1], clamp)}}><KIcon name="reflux" size={300} f={f} /></div>
          <Pop at={at(p, 'asid perut', 1.6)} style={{left: 400, top: 600}}>
            <div style={{width: 600, background: C.navy, borderRadius: 30, padding: '18px 26px'}}>
              <Txt size={40}>Asid perut naik semula ke <span style={{color: C.yellow}}>saluran makanan</span></Txt>
            </div>
          </Pop>
        </>
      }
    />
  );
};

/* ================= 5–9 — #1–#5 ================= */
export const Tanda: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="TANDA"
      titleSize={120}
      grid
      bg={BG(C.night[1], '#4A1F3A')}
      glow="#FF7A3D"
      hero={<KIcon name="reflux" size={280} f={f} />}
      items={[
        {a: at(p, 'pedih', 1.4), icon: <KIcon name="reflux" size={110} f={f} />, text: 'Pedih ulu hati', bg: RED},
        {a: at(p, 'dada', 2.7), icon: <KIcon name="heart" size={110} f={f} />, text: 'Dada panas'},
        {a: at(p, 'masam', 4.0), icon: <KIcon name="drop" size={110} />, text: 'Masam / pahit'},
        {a: at(p, 'sendawa', 6.2), icon: <KIcon name="talk" size={110} f={f} />, text: 'Kerap sendawa'},
        {a: at(p, 'batuk', 7.1), icon: <Icon name="moon" size={110} />, text: 'Batuk malam'},
      ]}
    />
  );
};

export const Pencetus: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="PENCETUS"
      titleSize={100}
      grid
      bg={BG('#0F0C2E', C.night[3])}
      hero={<KIcon name="warning" size={260} />}
      items={[
        {a: at(p, 'berlebihan', 2.0), icon: <KIcon name="bowl" size={110} f={f} />, text: 'Makan banyak'},
        {a: at(p, 'lewat', 3.1), icon: <KIcon name="clock" size={110} f={f} />, text: 'Lewat malam'},
        {a: at(p, 'berlemak', 4.4), icon: <KIcon name="burger" size={110} />, text: 'Berlemak / pedas', size: 30},
        {a: at(p, 'kopi', 5.9), icon: <KIcon name="coffee" size={110} f={f} />, text: 'Kopi'},
        {a: at(p, 'merokok', 6.5), icon: <KIcon name="cigarette" size={110} f={f} />, text: 'Merokok'},
        {a: at(p, 'berat', 7.4), icon: <KIcon name="scale" size={110} f={f} />, text: 'Berat badan'},
      ]}
    />
  );
};

export const Baring: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTing = at(p, 'tinggikan', 5.4);
  const tilt = interpolate(f, [aTing, aTing + 15], [0, -12], clamp);
  return (
    <PointScene
      p={p}
      title="JANGAN TERUS BARING"
      titleSize={74}
      bg={BG(C.night[1], C.violet[0])}
      hero={<div style={{transform: `rotate(${tilt}deg)`}}><KIcon name="bed" size={300} /></div>}
      items={[
        {a: at(p, 'jangan terus', 0.8), icon: <KIcon name="couch" size={76} />, text: 'Jangan baring lepas makan', bg: RED, size: 36},
        {a: at(p, 'jangan makan', 2.2), icon: <KIcon name="clock" size={76} f={f} />, text: '2–3 jam tanpa makan sebelum tidur', size: 32},
        {a: aTing, icon: <KIcon name="bed" size={76} />, text: 'Tinggikan kepala katil', bg: C.green},
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
      title="UBAT"
      titleSize={120}
      bg={BG(C.night[1], C.violet[2])}
      hero={<KIcon name="pill" size={260} />}
      items={[
        {a: at(p, 'doktor', 1.0), icon: <Icon name="doctor" size={76} />, text: 'Ubat kurangkan asid (ikut doktor)', size: 32, bg: C.green},
        {a: at(p, 'tahan sakit', 4.4), icon: <KIcon name="warning" size={76} />, text: 'Jangan sesuka hati ubat tahan sakit', size: 30, bg: RED},
        {a: at(p, 'memburukkan', 6.6), icon: <KIcon name="stomach" size={76} f={f} />, text: 'Boleh memburukkan perut', size: 36},
      ]}
    />
  );
};

export const Bahaya: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSeg = at(p, 'segera', 7.9);
  return (
    <PointScene
      p={p}
      title="TANDA BAHAYA"
      titleSize={84}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={
        f >= aSeg - 4 ? (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
            <KIcon name="hospital" size={220} />
            <Pill text="Rawatan segera!" bg={RED} size={38} />
          </div>
        ) : (
          <KIcon name="warning" size={260} />
        )
      }
      items={[
        {a: at(p, 'sukar menelan', 1.7), icon: <KIcon name="nocup" size={76} />, text: 'Sukar menelan', bg: RED},
        {a: at(p, 'muntah', 2.9), icon: <KIcon name="vomit" size={76} />, text: 'Muntah darah'},
        {a: at(p, 'najis', 3.8), icon: <KIcon name="poop" size={76} />, text: 'Najis hitam', bg: RED},
        {a: at(p, 'berat', 5.1), icon: <KIcon name="scale" size={76} f={f} />, text: 'Berat turun tanpa sebab', size: 36},
      ]}
      mood="sad"
    />
  );
};

/* ================= 10 — Ingat: tanda serangan jantung → 999 ================= */
export const Jantung: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="INGAT!"
      titleSize={130}
      bg={BG('#2A0B1E', '#5A1F3A')}
      glow={RED}
      hero={<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><KIcon name="heart" size={220} f={f * 2} /><div style={{background: RED, borderRadius: 30, padding: '2px 30px'}}><Txt size={70}>999</Txt></div></div>}
      items={[
        {a: at(p, 'menjalar', 1.4), icon: <KIcon name="arms" size={76} f={30} />, text: 'Sakit menjalar ke lengan / rahang', size: 32},
        {a: at(p, 'sesak', 3.4), icon: <KIcon name="lungs" size={76} f={f} />, text: 'Sesak nafas & berpeluh', size: 38},
        {a: at(p, 'serangan', 5.5), icon: <KIcon name="heart" size={76} f={f} />, text: 'Mungkin serangan jantung', bg: RED, size: 36},
        {a: at(p, 'telefon', 6.6), icon: <KIcon name="ambulance" size={76} f={f} />, text: 'Telefon 999', bg: RED},
      ]}
      mood="neutral"
    />
  );
};

/* ================= 11 — Amir tidur lena ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aAwal = at(p, 'awal', 0.9);
  const aTab = at(p, 'tabiat', 1.8);
  const aLena = at(p, 'lena', 3.6);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: BG(C.violet[0], C.pink[0])}} />
      <Glow x={540} y={1050} r={560} color={C.yellow} opacity={0.35} />
      {[{t: 'Makan lebih awal', a: aAwal, i: <KIcon name="clock" size={56} f={f} />}, {t: 'Ubah tabiat', a: aTab, i: <KIcon name="checklist" size={56} f={f} />}, {t: 'Tidur lena!', a: aLena, i: <KIcon name="zzz" size={56} f={f} />}].map((x, i) => (
        <Pop key={x.t} at={x.a} style={{left: 60, top: 560 + i * 110}} origin="left center">
          <div style={{display: 'flex', alignItems: 'center', gap: 14, background: i === 2 ? C.green : C.navy, borderRadius: 40, padding: '10px 30px 10px 14px'}}>
            <Check size={44} bg={i === 2 ? C.navy : C.green} />{x.i}<Txt size={40}>{x.t}</Txt>
          </div>
        </Pop>
      ))}
      <Who preset={AMIR} x={300} y={960} w={480} mood="happy" pose="wave" seed={1} />
      <Burst f={f} a={aLena} x={540} y={1100} />
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
        {a: at(p, 'pedih', 0.1), node: <IconPill icon={<KIcon name="reflux" size={64} f={f} />} text="Pedih ulu hati berulang?" size={44} />},
        {a: at(p, 'jangan tunggu', 1.3), node: <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />},
        {a: at(p, 'dapatkan', 2.2), node: <IconPill icon={<KIcon name="hospital" size={64} />} text="Dapatkan pemeriksaan" size={46} bg={C.green} color="#fff" />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, amir: Amir, pedih: Pedih, diagnosis: Diagnosis, lima: Lima,
  tanda: Tanda, pencetus: Pencetus, baring: Baring, ubat: Ubat, bahaya: Bahaya,
  jantung: Jantung, pulih: Pulih, penutup: Penutup,
};
