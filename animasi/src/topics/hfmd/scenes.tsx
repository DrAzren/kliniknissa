import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Burst, C, Camera, Check, ClinicSign, clamp, Closing, Cross, FiveIntro, Glow, Icon, IconPill, interpolate, KIcon, LEAF, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, Txt, useCurrentFrame, Who,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const AISYAH: AvatarPreset = {
  id: 'aisyah', skin: '#E0AE88', skinShade: '#C69270', hair: 'short', hairColor: '#2A1C24', top: 'tee', topColor: '#F29CBC', topShade: '#D2638E',
  accessory: null,
};
export const BOW = '#E23D78';
export const MAK: AvatarPreset = {
  id: 'mak-aisyah', skin: '#D49C74', skinShade: '#B9805A', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#2BB3A3', topShade: '#1F8A7E',
  hijabColor: '#9C8EE1', hijabShade: '#7A6BC8', accessory: null,
};

/** Bintik merah pada watak (ditindih atas Avatar, koordinat viewBox 600×760). */
const Spots: React.FC<{w: number; n?: number; o?: number}> = ({w, n = 6, o = 1}) => (
  <svg viewBox="0 0 600 760" width={w} height={(w * 760) / 600} style={{position: 'absolute', left: 0, top: 0, opacity: o}}>
    {[[132, 745], [468, 745], [120, 728], [480, 728], [300, 372], [270, 380]].slice(0, n).map(([x, y], i) => (
      <circle key={i} cx={x + (i % 2 ? 8 : -8)} cy={y} r={11} fill={RED} />
    ))}
  </svg>
);

/* ================= 0 — Hook: ulser kecil dalam mulut → tadika ditutup ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aMul = at(p, 'mulut', 1.2);
  const aTad = at(p, 'tadika', 4.7);
  const zoom = interpolate(f, [0, aMul + 10], [0.5, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={5} glow={f >= aTad ? RED : C.pink[0]} />
      <Glow x={540} y={900} r={520} color={C.pink[0]} opacity={0.3} />
      <div style={{position: 'absolute', left: 540 - 260, top: 470, transform: `scale(${zoom})`, opacity: interpolate(f, [0, 6], [0, 1], clamp)}}>
        <KIcon name="mouth" size={520} />
      </div>
      <Pop at={aMul} style={{left: 0, width: 1080, top: 980, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Ulser kecil dalam mulut…" bg={C.navy} color={C.yellow} size={50} />
      </Pop>
      <Pop at={aTad - 6} style={{left: 0, width: 1080, top: 1140, display: 'flex', justifyContent: 'center'}}>
        <div style={{position: 'relative', width: 420, height: 420}}>
          <KIcon name="school" size={420} />
          {f >= aTad ? (
            <div style={{position: 'absolute', left: -40, top: 200, width: 500, transform: `rotate(-12deg) scale(${interpolate(f - aTad, [0, 6, 10], [1.8, 0.95, 1], clamp)})`, background: RED, borderRadius: 20, padding: '12px 0', textAlign: 'center', boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
              <Txt size={70}>DITUTUP</Txt>
            </div>
          ) : null}
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Aisyah, 3 tahun: demam, menangis bila minum susu ================= */
export const Aisyah: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTas = at(p, 'taska', 2.1);
  const aPan = at(p, 'panas', 3.1);
  const aNan = at(p, 'menangis', 4.7);
  const aSus = at(p, 'susu', 5.9);
  const night = f >= aNan - 10;
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: night ? `linear-gradient(180deg, #0B0824 0%, ${C.night[2]} 100%)` : `linear-gradient(180deg, ${C.violet[0]} 0%, ${C.pink[0]} 60%, #F6A86B 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: night ? C.night[3] : '#C98C64'}} />
      <Pop at={2} style={{left: 60, top: 480}}>
        <Pill text="Aisyah, 3 tahun" bg={C.navy} color={C.yellow} size={54} />
      </Pop>
      <Pop at={aTas} style={{left: 60, top: 600}}>
        <IconPill icon={<KIcon name="school" size={60} />} text="Balik dari taska" size={40} />
      </Pop>
      <Pop at={aPan} style={{left: 600, top: 700}}>
        <IconPill icon={<MIcon name="thermo" size={70} f={f - aPan} />} text="Badan panas" size={44} bg={RED} color="#fff" />
      </Pop>
      {night ? <div style={{position: 'absolute', left: 860, top: 480}}><Icon name="moon" size={140} /></div> : null}
      <Who preset={MAK} x={560} y={960} w={440} mood={night ? 'sad' : 'neutral'} pose="clasp" seed={4} />
      <Who preset={AISYAH} x={150} y={1080} w={360} mood={f >= aNan ? 'sad' : 'tired'} pose="down" seed={2} bow={BOW} />
      {f >= aNan
        ? [0, 1].map((i) => {
            const t = (f + i * 14) % 28;
            return <div key={i} style={{position: 'absolute', left: 255 + i * 110, top: 1250 + t * 3, width: 18, height: 26, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: '#9FD6F7', opacity: interpolate(t, [0, 4, 22, 28], [0, 1, 1, 0])}} />;
          })
        : null}
      <Pop at={aSus - 4} style={{left: 140, top: 820}}>
        <div style={{position: 'relative', width: 200, height: 200}}>
          <KIcon name="bottle" size={200} />
          <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - aSus} size={200} /></div>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 2 — Esok pagi: bintik merah & lepuh di tapak tangan/kaki → klinik ================= */
export const Lepuh: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aMak = at(p, 'mak', 1.0);
  const aBin = at(p, 'bintik', 1.5);
  const aTan = at(p, 'tapak tangan', 3.3);
  const aKak = at(p, 'tapak kaki', 4.1);
  const aKli = at(p, 'klinik', 6.3);
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, #7FC4F2 0%, #F6D6A8 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: '#C98C64'}} />
      <Pop at={2} style={{left: 60, top: 530}}>
        <Pill text="Esok paginya…" bg={C.navy} color={C.yellow} size={50} />
      </Pop>
      <Pop at={aBin} style={{left: 60, top: 650}}>
        <Pill text="Bintik merah & lepuh kecil" bg={RED} size={44} />
      </Pop>
      <Pop at={aTan} style={{left: 520, top: 760}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', background: C.navy, borderRadius: 34, padding: 16}}>
          <KIcon name="palm" size={170} />
          <Txt size={34}>Tapak tangan</Txt>
        </div>
      </Pop>
      <Pop at={aKak} style={{left: 790, top: 760}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', background: C.violet[1], borderRadius: 34, padding: 16}}>
          <KIcon name="sole" size={170} />
          <Txt size={34}>Tapak kaki</Txt>
        </div>
      </Pop>
      <div style={{position: 'absolute', left: 60, top: 980}}>
        <Who preset={MAK} x={0} y={0} w={420} mood={f >= aMak ? 'shock' : 'neutral'} pose={f >= aKli ? 'point' : 'clasp'} seed={4} />
      </div>
      <div style={{position: 'absolute', left: 520, top: 1110}}>
        <Who preset={AISYAH} x={0} y={0} w={330} mood="sad" pose="down" seed={2} bow={BOW} />
        <Spots w={330} o={interpolate(f, [aTan, aTan + 10], [0, 1], clamp)} />
      </div>
      <Pop at={aKli} style={{left: 540, top: 1020}}>
        <ClinicSign x={0} y={0} w={400} />
      </Pop>
    </Camera>
  );
};

/* ================= 3 — Doktor periksa mulut → HFMD ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aMul = at(p, 'mulut', 0.8);
  const aTan = at(p, 'tangan', 2.1);
  const aKak = at(p, 'kaki', 2.8);
  const aMul2 = at(p, 'mulut atau', 3.4);
  const aHf = at(p, 'hfmd', 4.4);
  const icons = [{n: 'palm' as const, a: aTan, t: 'Tangan'}, {n: 'sole' as const, a: aKak, t: 'Kaki'}, {n: 'mouth' as const, a: aMul2, t: 'Mulut'}];
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[3]} 0%, ${C.violet[2]} 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      {f < aHf - 6
        ? icons.map((x, i) => (
            <Pop key={x.t} at={x.a} style={{left: 60 + i * 330, top: 520}}>
              <div style={{width: 300, height: 290, borderRadius: 34, background: i === 1 ? C.violet[1] : C.navy, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8}}>
                <KIcon name={x.n} size={180} />
                <Txt size={40}>{x.t}</Txt>
              </div>
            </Pop>
          ))
        : null}
      <Pop at={aMul - 4} style={{left: 640, top: 860}}>
        <div style={{width: 200, height: 200, borderRadius: 100, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <KIcon name="mouth" size={150} />
        </div>
      </Pop>
      <Who preset={p.preset} x={0} y={900} w={520} mood={f >= aHf ? 'neutral' : 'curious'} pose={f >= aHf ? 'point' : 'chin'} />
      <div style={{position: 'absolute', left: 620, top: 1100}}>
        <Who preset={AISYAH} x={0} y={0} w={330} mood="sad" pose="down" seed={2} bow={BOW} />
        <Spots w={330} />
      </div>
      <Stamp f={f} a={aHf} top="PENYAKIT TANGAN, KAKI & MULUT" big="HFMD" bigSize={170} y={500} />
    </Camera>
  );
};

/* ================= 4 — Mudah berjangkit + 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aBer = at(p, 'berjangkit', 1.5);
  const aKan = at(p, 'kanak-kanak', 3.4);
  return (
    <FiveIntro
      p={p}
      aFive={at(p, 'lima', 4.6)}
      sub="perkara ibu bapa perlu tahu"
      glow={C.pink[0]}
      head={
        <>
          <Pop at={aBer} style={{left: 0, width: 1080, top: 560, display: 'flex', justifyContent: 'center'}}>
            <IconPill icon={<KIcon name="virus" size={80} f={f} />} text="Sangat mudah berjangkit" size={46} />
          </Pop>
          <Pop at={aKan} style={{left: 0, width: 1080, top: 710, display: 'flex', justifyContent: 'center'}}>
            <IconPill icon={<KIcon name="toy" size={70} />} text="Terutama kanak-kanak kecil" size={42} bg={C.labelPink} color="#fff" />
          </Pop>
        </>
      }
    />
  );
};

/* ================= 5 — #1 Punca: enterovirus, EV71 ================= */
export const Punca: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="PUNCA"
      titleSize={110}
      bg={`linear-gradient(180deg, ${C.night[1]} 0%, #1F4A3A 100%)`}
      glow={C.green}
      hero={<KIcon name="virus" size={300} f={f} />}
      items={[
        {a: at(p, 'enterovirus', 2.9), icon: <KIcon name="virus" size={76} f={f} />, text: 'Virus: enterovirus'},
        {a: at(p, 'ringan', 4.7), icon: <KIcon name="smile" size={76} />, text: 'Kebanyakan kes ringan', bg: C.green},
        {a: at(p, 'jenis', 5.8), icon: <KIcon name="warning" size={76} />, text: 'EV71: boleh serius', bg: RED},
        {a: at(p, 'otak', 9.7), icon: <div style={{display: 'flex'}}><MIcon name="brain" size={46} f={f} /><KIcon name="heart" size={46} f={f} /></div>, text: 'Komplikasi otak & jantung', size: 36},
      ]}
      mood="neutral"
    />
  );
};

/* ================= 6 — #2 Cara merebak (grid 6) ================= */
export const Merebak: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="CARA MEREBAK"
      titleSize={80}
      grid
      bg={`linear-gradient(180deg, #0F0C2E 0%, ${C.night[3]} 100%)`}
      hero={<KIcon name="sneeze" size={300} f={f} />}
      items={[
        {a: at(p, 'air liur', 2.2), icon: <KIcon name="saliva" size={110} />, text: 'Air liur'},
        {a: at(p, 'bersin', 3.0), icon: <KIcon name="sneeze" size={110} f={f} />, text: 'Bersin'},
        {a: at(p, 'cecair', 3.7), icon: <KIcon name="palm" size={110} />, text: 'Cecair lepuh'},
        {a: at(p, 'najis', 4.9), icon: <KIcon name="poop" size={110} />, text: 'Najis'},
        {a: at(p, 'tangan dan mainan', 5.7), icon: <Icon name="soap" size={110} f={f} />, text: 'Tangan kotor'},
        {a: at(p, 'mainan', 6.3), icon: <KIcon name="toy" size={110} />, text: 'Mainan'},
      ]}
    />
  );
};

/* ================= 7 — #3 Tanda biasa ================= */
export const Tanda: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="TANDA BIASA"
      titleSize={84}
      bg={`linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 100%)`}
      hero={
        <div style={{position: 'relative', width: 300, height: 380}}>
          <Who preset={AISYAH} x={0} y={0} w={300} mood="sad" pose="down" seed={2} bow={BOW} />
          <Spots w={300} />
        </div>
      }
      items={[
        {a: at(p, 'demam', 1.8), icon: <MIcon name="thermo" size={76} f={f} />, text: 'Demam & sakit tekak', bg: RED},
        {a: at(p, 'ulser', 3.2), icon: <KIcon name="mouth" size={76} />, text: 'Ulser dalam mulut'},
        {a: at(p, 'lepuh', 4.4), icon: <KIcon name="palm" size={76} />, text: 'Lepuh: tangan, kaki, punggung', size: 34},
        {a: at(p, 'sembuh sendiri', 7.8), icon: <Check size={70} />, text: 'Sembuh sendiri: 7–10 hari', bg: C.green, size: 38},
      ]}
      mood="curious"
    />
  );
};

/* ================= 8 — #4 Tanda bahaya (grid 6) → hospital ================= */
export const Bahaya: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aHos = at(p, 'hospital', 11.0);
  return (
    <PointScene
      p={p}
      title="TANDA BAHAYA"
      titleSize={80}
      grid
      bg={`linear-gradient(180deg, ${C.night[0]} 0%, #5A1F3A 100%)`}
      glow={RED}
      hero={
        f >= aHos - 4 ? (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, transform: `scale(${interpolate(f - aHos + 4, [0, 8], [0.6, 1], clamp)})`}}>
            <KIcon name="hospital" size={220} />
            <Pill text="Hospital segera!" bg={RED} size={40} />
          </div>
        ) : (
          <KIcon name="warning" size={280} />
        )
      }
      items={[
        {a: at(p, 'demam tinggi', 1.6), icon: <MIcon name="thermo" size={110} f={f} />, text: 'Demam tinggi', bg: RED},
        {a: at(p, 'mengantuk', 3.4), icon: <KIcon name="zzz" size={110} f={f} />, text: 'Mengantuk / lemah'},
        {a: at(p, 'terkejut-kejut', 4.8), icon: <KIcon name="bolt" size={110} f={f} />, text: 'Terkejut-kejut', bg: RED},
        {a: at(p, 'muntah', 6.4), icon: <KIcon name="vomit" size={110} />, text: 'Muntah berulang'},
        {a: at(p, 'sesak', 7.6), icon: <KIcon name="lungs" size={110} f={f} />, text: 'Sesak nafas', bg: RED},
        {a: at(p, 'tak mahu minum', 8.9), icon: <KIcon name="nocup" size={110} />, text: 'Tak mahu minum'},
      ]}
      mood="sad"
      pose="point"
    />
  );
};

/* ================= 9 — #5 Rawatan & pencegahan ================= */
export const Rawatan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTia = at(p, 'tiada ubat', 2.3);
  return (
    <PointScene
      p={p}
      title="RAWATAN & PENCEGAHAN"
      titleSize={66}
      grid
      bg={`linear-gradient(180deg, ${C.night[1]} 0%, #1F4A4A 100%)`}
      glow={C.green}
      hero={
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
          <div style={{position: 'relative', width: 220, height: 220}}>
            <KIcon name="pill" size={220} />
            {f >= aTia + 4 ? <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - aTia - 4} size={220} /></div> : null}
          </div>
          <Pop at={aTia} style={{position: 'relative'}}>
            <Pill text="Tiada ubat khusus" bg={C.navy} color={C.yellow} size={34} />
          </Pop>
        </div>
      }
      items={[
        {a: at(p, 'banyak air', 4.5), icon: <KIcon name="cup" size={110} />, text: 'Banyak air'},
        {a: at(p, 'makanan lembut', 5.4), icon: <KIcon name="bowl" size={110} f={f} />, text: 'Makanan lembut'},
        {a: at(p, 'ubat demam', 6.5), icon: <MIcon name="thermo" size={110} f={f} />, text: 'Ubat demam'},
        {a: at(p, 'basuh tangan', 7.4), icon: <Icon name="soap" size={110} f={f} />, text: 'Basuh + sabun', bg: C.green},
        {a: at(p, 'cuci mainan', 8.7), icon: <KIcon name="toy" size={110} />, text: 'Cuci mainan', bg: C.green},
        {a: at(p, 'berehat', 10.5), icon: <MIcon name="house" size={110} />, text: 'Rehat di rumah', bg: C.green},
      ]}
      mood="happy"
    />
  );
};

/* ================= 10 — Seminggu kemudian: sembuh, ceria ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aUl = at(p, 'ulser', 1.2);
  const aLep = at(p, 'lepuh', 2.7);
  const aCer = at(p, 'ceria', 5.0);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.violet[0]} 0%, ${C.pink[0]} 60%, #F6A86B 100%)`}} />
      <Glow x={540} y={1050} r={560} color={C.yellow} opacity={0.35} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: LEAF}} />
      <Pop at={2} style={{left: 60, top: 500}}>
        <Pill text="Seminggu kemudian" bg={C.navy} color={C.yellow} size={50} />
      </Pop>
      {[{t: 'Ulser sembuh', a: aUl}, {t: 'Lepuh mula kering', a: aLep}, {t: 'Kembali ceria!', a: aCer}].map((x, i) => (
        <Pop key={x.t} at={x.a} style={{left: 60, top: 630 + i * 110}} origin="left center">
          <div style={{display: 'flex', alignItems: 'center', gap: 14, background: i === 2 ? C.green : C.navy, borderRadius: 40, padding: '10px 30px 10px 14px'}}>
            <Check size={48} bg={i === 2 ? C.navy : C.green} /><Txt size={42}>{x.t}</Txt>
          </div>
        </Pop>
      ))}
      <Who preset={MAK} x={560} y={960} w={440} mood="happy" pose="clasp" seed={4} />
      <Who preset={AISYAH} x={170} y={1060 - (f >= aCer ? Math.abs(Math.sin(f / 5)) * 30 : 0)} w={360} mood="happy" pose={f >= aCer ? 'wave' : 'down'} seed={2} bow={BOW} />
      <Burst f={f} a={aCer} x={360} y={1150} />
    </Camera>
  );
};

/* ================= 11 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => (
  <Closing
    p={p}
    aSaya={at(p, 'saya doktor', 4.3)}
    lines={[
      {a: at(p, 'tanda bahaya', 0.9), node: <IconPill icon={<KIcon name="warning" size={64} />} text="Anak ada tanda bahaya?" size={44} />},
      {a: at(p, 'jangan tunggu', 1.8), node: <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />},
      {a: at(p, 'dapatkan', 2.9), node: <IconPill icon={<KIcon name="hospital" size={64} />} text="Dapatkan rawatan segera" size={44} bg={C.green} color="#fff" />},
    ]}
  />
);

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro,
  aisyah: Aisyah,
  lepuh: Lepuh,
  diagnosis: Diagnosis,
  lima: Lima,
  punca: Punca,
  merebak: Merebak,
  tanda: Tanda,
  bahaya: Bahaya,
  rawatan: Rawatan,
  pulih: Pulih,
  penutup: Penutup,
};
