import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Bubble, Burst, C, Camera, Check, clamp, Closing, Easing, FiveIntro, Glow, Icon, IconPill, interpolate, KIcon, LEAF, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, Txt, useCurrentFrame, Who,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const SALMAH: AvatarPreset = {
  id: 'salmah', skin: '#C99270', skinShade: '#AE7856', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#8E5BB5', topShade: '#704396',
  hijabColor: '#B43A5E', hijabShade: '#8F2C4A', accessory: null,
};
export const CUCU: AvatarPreset = {
  id: 'cucu', skin: '#D9A47C', skinShade: '#BE8860', hair: 'short', hairColor: '#231B28', top: 'tee', topColor: '#2BB3A3', topShade: '#1F8A7E',
  accessory: null,
};

/* ================= 0 — Hook: setiap minit, ~2 juta sel otak mati ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aJuta = at(p, 'dua juta', 2.5);
  const aMati = at(p, 'mati', 3.7);
  const aPel = at(p, 'peluang', 6.5);
  const count = Math.round(interpolate(f, [aJuta, aMati + 20], [0, 1.9], {...clamp, easing: Easing.out(Easing.cubic)}) * 10) / 10;
  const bar = interpolate(f, [aPel, aPel + 50], [1, 0.15], clamp);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={5} glow={f >= aMati ? RED : C.violet[2]} />
      <Glow x={540} y={950} r={520} color={RED} opacity={f >= aMati ? 0.3 : 0.1} />
      <Pop at={2} style={{left: 0, width: 1080, top: 540, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<KIcon name="clock" size={80} f={f} />} text="Setiap minit semasa strok…" size={46} />
      </Pop>
      <div style={{position: 'absolute', left: 540 - 220, top: 680, opacity: interpolate(f, [0, 10], [0, 1], clamp)}}>
        <MIcon name="brain" size={440} f={f} />
      </div>
      <Pop at={aJuta} style={{left: 0, width: 1080, top: 1110, display: 'flex', justifyContent: 'center'}}>
        <div style={{textAlign: 'center'}}>
          <Txt size={150} color={C.yellow} style={{textShadow: '0 8px 0 rgba(18,11,51,.6)'}}>{`~${count.toFixed(1)} juta`}</Txt>
          <Txt size={52}>sel otak mati / minit</Txt>
        </div>
      </Pop>
      <Pop at={aPel} style={{left: 140, top: 1440}}>
        <div style={{width: 800}}>
          <Txt size={40} style={{marginBottom: 10}}>Peluang untuk pulih</Txt>
          <div style={{width: 800, height: 46, borderRadius: 23, background: 'rgba(255,255,255,.15)'}}>
            <div style={{width: 800 * bar, height: 46, borderRadius: 23, background: bar > 0.5 ? C.green : RED}} />
          </div>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Makan malam: sudu jatuh, mulut senget, pelat ================= */
export const Makan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aUmur = at(p, 'lima puluh', 0.9);
  const aCucu = at(p, 'cucunya', 3.2);
  const aSudu = at(p, 'sudu', 4.9);
  const aSen = at(p, 'senget', 7.1);
  const aPel = at(p, 'pelat', 9.9);
  const fall = interpolate(f, [aSudu, aSudu + 14], [0, 1], {...clamp, easing: Easing.in(Easing.quad)});
  const shake = f >= aSen ? Math.sin(f * 1.3) * 3 : 0;
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[2]} 0%, #6B4A7A 100%)`}} />
      <div style={{position: 'absolute', left: 880, top: 480, width: 140, height: 200, borderRadius: 16, background: '#FFD27A', opacity: 0.85, boxShadow: '0 0 60px #FFD27A'}} />
      <Pop at={aUmur} style={{left: 60, top: 540}}>
        <Pill text="Puan Salmah, 58" bg={C.navy} color={C.yellow} size={52} />
      </Pop>
      <Who preset={SALMAH} x={40} y={900} w={460} mood={f >= aSen ? 'shock' : 'happy'} pose={f >= aSudu ? 'down' : 'clasp'} seed={2} style={{transform: `translateX(${shake}px)`}} />
      {f >= aCucu - 6 ? <Who preset={CUCU} x={640} y={1030} w={360} mood={f >= aSen ? 'shock' : 'happy'} pose={f >= aSen ? 'point' : 'down'} seed={3} /> : null}
      {/* meja */}
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: '#7A5236'}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 40, background: '#A0704A'}} />
      <div style={{position: 'absolute', left: 380, top: 1350, width: 260, height: 70, borderRadius: '0 0 130px 130px', background: '#fff'}} />
      {/* sudu jatuh */}
      <div style={{position: 'absolute', left: 300 + fall * 40, top: 1180 + fall * 230, transform: `rotate(${fall * 160}deg)`}}>
        <KIcon name="spoon" size={110} />
      </div>
      <Pop at={aSen} style={{left: 380, top: 670}}>
        <IconPill icon={<KIcon name="droop" size={70} />} text="Mulut senget sebelah" size={40} bg={RED} color="#fff" />
      </Pop>
      <Pop at={aPel - 2} style={{left: 360, top: 800}}>
        <Bubble tail="left" size={46}>"Sa… ya… o… ke…"</Bubble>
      </Pop>
    </Camera>
  );
};

/* ================= 2 — Cucu terus telefon 999 ================= */
export const Telefon: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const a999 = at(p, 'sembilan', 1.8);
  const drive = interpolate(f, [a999 + 6, p.dur], [1200, 560], clamp);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, #5A1F3A 100%)`}} />
      <Glow x={540} y={900} r={520} color={f >= a999 ? RED : C.violet[3]} opacity={0.3 + 0.1 * Math.sin(f / 3)} />
      <Who preset={CUCU} x={40} y={880} w={460} mood="shock" pose="wave" seed={3} />
      <div style={{position: 'absolute', left: 470, top: 1060}}><KIcon name="phone" size={150} f={f} /></div>
      <Pop at={a999} style={{left: 0, width: 1080, top: 520, display: 'flex', justifyContent: 'center'}}>
        <div style={{background: RED, borderRadius: 60, padding: '10px 70px', boxShadow: '0 20px 50px rgba(18,11,51,.5)'}}>
          <Txt size={180} style={{letterSpacing: 10}}>999</Txt>
        </div>
      </Pop>
      <div style={{position: 'absolute', left: drive, top: 1250}}><KIcon name="ambulance" size={420} f={f} /></div>
    </Camera>
  );
};

/* ================= 3 — Imbasan otak → STROK ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aIm = at(p, 'imbasan', 0.9);
  const aStr = at(p, 'strok', 2.6);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[3]} 0%, ${C.violet[2]} 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      <Pop at={aIm} style={{left: 640, top: 900}}>
        <div style={{background: '#fff', borderRadius: 30, padding: 14}}><KIcon name="scan" size={260} f={f} /></div>
      </Pop>
      <Who preset={p.preset} x={20} y={900} w={520} mood={f >= aStr ? 'neutral' : 'curious'} pose={f >= aStr ? 'point' : 'chin'} />
      <Stamp f={f} a={aStr} top="IMBASAN OTAK" big="STROK" sub="Salur darah ke otak tersumbat" bigSize={170} y={530} />
    </Camera>
  );
};

/* ================= 4 — Boleh berlaku kepada sesiapa + 5 tanda ================= */
export const Lima: React.FC<SceneProps> = (p) => (
  <FiveIntro
    p={p}
    aFive={at(p, 'lima', 2.4)}
    sub="tanda: kenal & cepat bertindak"
    glow={RED}
    head={
      <Pop at={at(p, 'sesiapa', 1.2)} style={{left: 0, width: 1080, top: 560, display: 'flex', justifyContent: 'center'}}>
        <IconPill icon={<Icon name="family" size={80} />} text="Boleh berlaku kepada sesiapa" size={44} />
      </Pop>
    }
  />
);

const BG = (a: string, b: string) => `linear-gradient(180deg, ${a} 0%, ${b} 100%)`;

/* ================= 5–9 — #1–#5 ================= */
export const Muka: React.FC<SceneProps> = (p) => (
  <PointScene
    p={p}
    title="MUKA"
    titleSize={120}
    bg={BG(C.night[1], C.violet[0])}
    hero={<KIcon name="droop" size={300} />}
    items={[
      {a: at(p, 'senyum', 1.8), icon: <KIcon name="smile" size={76} />, text: 'Minta dia senyum'},
      {a: at(p, 'jatuh', 3.0), icon: <KIcon name="droop" size={76} />, text: 'Sebelah muka jatuh / senget', bg: RED, size: 36},
    ]}
  />
);

export const Lengan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="LENGAN"
      titleSize={110}
      bg={BG('#0F0C2E', C.night[3])}
      hero={<KIcon name="arms" size={300} f={f} />}
      items={[
        {a: at(p, 'angkat', 1.7), icon: <KIcon name="arms" size={76} f={f} />, text: 'Angkat kedua-dua tangan', size: 38},
        {a: at(p, 'lemah', 3.6), icon: <KIcon name="warning" size={76} />, text: 'Sebelah lemah / jatuh', bg: RED},
      ]}
    />
  );
};

export const Cakap: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="PERTUTURAN"
      titleSize={86}
      bg={BG(C.night[1], C.violet[0])}
      hero={<KIcon name="talk" size={300} f={f} />}
      items={[
        {a: at(p, 'pelat', 1.8), icon: <KIcon name="talk" size={76} f={f} />, text: 'Cakap pelat / tak jelas'},
        {a: at(p, 'tak faham', 3.8), icon: <KIcon name="question" size={76} />, text: 'Tiba-tiba tak faham', bg: RED},
      ]}
    />
  );
};

export const Imbang: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="IMBANGAN & PENGLIHATAN"
      titleSize={66}
      bg={BG('#0F0C2E', C.night[3])}
      hero={<KIcon name="dizzy" size={300} f={f} />}
      items={[
        {a: at(p, 'pening', 2.3), icon: <KIcon name="dizzy" size={76} f={f} />, text: 'Pening, hilang imbangan', size: 38},
        {a: at(p, 'kabur', 4.6), icon: <MIcon name="eye" size={76} />, text: 'Penglihatan kabur tiba-tiba', bg: RED, size: 36},
      ]}
    />
  );
};

export const Masa: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="MASA"
      titleSize={120}
      bg={BG(C.night[0], '#5A1F3A')}
      glow={RED}
      hero={
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <KIcon name="ambulance" size={260} f={f} />
          <div style={{background: RED, borderRadius: 30, padding: '4px 30px'}}><Txt size={80}>999</Txt></div>
        </div>
      }
      items={[
        {a: at(p, 'telefon', 1.4), icon: <KIcon name="phone" size={76} f={f} />, text: 'Telefon 999 segera', bg: RED},
        {a: at(p, 'jangan tunggu', 3.8), icon: <KIcon name="clock" size={76} f={f} />, text: 'Jangan tunggu ia hilang', size: 38},
        {a: at(p, 'urut', 5.9), icon: <KIcon name="warning" size={76} />, text: 'Jangan urut'},
        {a: at(p, 'makan', 7.2), icon: <KIcon name="nocup" size={76} />, text: 'Jangan beri makan / minum', size: 36},
      ]}
      mood="neutral"
    />
  );
};

/* ================= 10 — Rawatan awal + pencegahan ================= */
export const Rawatan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="BEBERAPA JAM PERTAMA"
      titleSize={70}
      bg={BG(C.night[1], '#1F4A4A')}
      glow={C.green}
      hero={<KIcon name="clock" size={280} f={f} />}
      items={[
        {a: at(p, 'membuka', 0.7), icon: <KIcon name="scan" size={76} f={f} />, text: 'Buka salur tersumbat', bg: C.green},
        {a: at(p, 'darah tinggi', 5.9), icon: <KIcon name="bp" size={76} text="120/80" />, text: 'Kawal darah tinggi'},
        {a: at(p, 'kencing', 6.9), icon: <KIcon name="drop" size={76} />, text: 'Kencing manis & kolesterol', size: 36},
        {a: at(p, 'berhenti', 8.6), icon: <KIcon name="nosmoke" size={76} />, text: 'Berhenti merokok'},
      ]}
      mood="happy"
    />
  );
};

/* ================= 11 — Sampai dalam sejam, kembali berjalan ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSej = at(p, 'sejam', 2.0);
  const aFis = at(p, 'fisioterapi', 3.6);
  const aJal = at(p, 'berjalan', 5.2);
  const walk = f >= aJal ? Math.sin(f / 4) * 8 : 0;
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, #7FC4F2 0%, #F6D6A8 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1360, width: 1080, height: 560, background: LEAF}} />
      {[{t: 'Sampai dalam 1 jam', a: aSej, i: <KIcon name="clock" size={56} f={f} />}, {t: 'Rawatan + fisioterapi', a: aFis, i: <Icon name="doctor" size={56} />}, {t: 'Kembali berjalan!', a: aJal, i: <KIcon name="shoe" size={56} />}].map((x, i) => (
        <Pop key={x.t} at={x.a} style={{left: 60, top: 520 + i * 110}} origin="left center">
          <div style={{display: 'flex', alignItems: 'center', gap: 14, background: i === 2 ? C.green : C.navy, borderRadius: 40, padding: '10px 30px 10px 14px'}}>
            <Check size={44} bg={i === 2 ? C.navy : C.green} />{x.i}<Txt size={40}>{x.t}</Txt>
          </div>
        </Pop>
      ))}
      <Who preset={SALMAH} x={80} y={920 + walk} w={460} mood="happy" pose={f >= aJal ? 'wave' : 'down'} seed={2} />
      <Who preset={CUCU} x={600} y={1040} w={360} mood="happy" pose="wave" seed={3} />
      <Burst f={f} a={aJal} x={540} y={1100} />
    </Camera>
  );
};

/* ================= 12 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Closing
      p={p}
      aSaya={at(p, 'saya doktor', 4.3)}
      lines={[
        {a: at(p, 'nampak', 0.1), node: <IconPill icon={<KIcon name="droop" size={64} />} text="Nampak tanda strok?" size={46} />},
        {a: at(p, 'jangan tunggu', 1.1), node: <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />},
        {a: at(p, 'telefon', 2.1), node: <IconPill icon={<KIcon name="ambulance" size={70} f={f} />} text="Telefon 999 segera" size={48} bg={RED} color="#fff" />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro, makan: Makan, telefon: Telefon, diagnosis: Diagnosis, lima: Lima,
  muka: Muka, lengan: Lengan, cakap: Cakap, imbang: Imbang, masa: Masa,
  rawatan: Rawatan, pulih: Pulih, penutup: Penutup,
};
