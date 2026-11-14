import React from 'react';
import {
  AbsoluteFill, at, AvatarPreset, Bubble, Burst, C, Camera, Check, ClinicSign, clamp, Closing, Cross, FiveIntro, Glow, IconPill, interpolate, KIcon, LEAF, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, Txt, useCurrentFrame, Who, Icon,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const FAIZ: AvatarPreset = {
  id: 'faiz', skin: '#C9926A', skinShade: '#AD774F', hair: 'short', hairColor: '#1E1A24', top: 'shirt', topColor: '#5B6B8C', topShade: '#46536E',
  accessory: null, stubble: true,
};
export const ISTERI: AvatarPreset = {
  id: 'isteri-faiz', skin: '#D49C74', skinShade: '#B9805A', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#E4629F', topShade: '#C24A82',
  hijabColor: '#F6C945', hijabShade: '#D9AA2A', accessory: null,
};
export const ANAK: AvatarPreset = {
  id: 'anak-faiz', skin: '#D9A47C', skinShade: '#BE8860', hair: 'short', hairColor: '#231B28', top: 'tee', topColor: '#2BB3A3', topShade: '#1F8A7E',
  accessory: null,
};

/** Air mata dengan pangkah. */
const Tear: React.FC<{f: number; a: number}> = ({f, a}) => (
  <div style={{position: 'relative', width: 200, height: 200}}>
    <KIcon name="drop" size={200} />
    {f >= a + 6 ? <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - a - 6} size={200} /></div> : null}
  </div>
);

/* ================= 0 — Hook: lelaki murung tak menangis; marah, diam, kerja ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTak = at(p, 'tak menangis', 2.1);
  const aMar = at(p, 'marah', 3.6);
  const aDiam = at(p, 'diam', 4.6);
  const aKer = at(p, 'kerja', 6.0);
  const mood = f >= aKer ? 'tired' : f >= aDiam ? 'sad' : f >= aMar ? 'angry' : 'neutral';
  const cards = [
    {a: aMar, icon: <KIcon name="storm" size={130} f={f} />, t: 'Marah'},
    {a: aDiam, icon: <Txt size={110} color={C.violet[4]}>…</Txt>, t: 'Diam'},
    {a: aKer, icon: <KIcon name="laptop" size={130} f={f} />, t: 'Kerja larut'},
  ];
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={9} glow={f >= aMar ? C.pink[2] : C.violet[2]} />
      <Glow x={540} y={1300} r={520} color={C.violet[3]} opacity={0.3} />
      <div style={{position: 'absolute', top: 470, width: 1080, textAlign: 'center', opacity: interpolate(f, [0, 8], [0, 1], clamp)}}>
        <Txt size={110} color={C.yellow} style={{textShadow: '0 8px 0 rgba(18,11,51,.6)'}}>LELAKI MURUNG</Txt>
      </div>
      <Pop at={aTak} style={{left: 80, top: 640}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
          <Tear f={f} a={aTak} />
          <Txt size={64}>Tak menangis</Txt>
        </div>
      </Pop>
      {cards.map((c, i) => (
        <Pop key={c.t} at={c.a} style={{left: 40 + i * 340, top: 880}}>
          <div style={{width: 320, height: 260, borderRadius: 36, background: i === 0 ? RED : i === 1 ? C.navy : C.violet[1], display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 16px 40px rgba(18,11,51,.5)'}}>
            {c.icon}
            <Txt size={44}>{c.t}</Txt>
          </div>
        </Pop>
      ))}
      <Who preset={FAIZ} x={300} y={1180} w={480} mood={mood} anger={interpolate(f, [aMar, aMar + 12, aDiam], [0, 0.9, 0.2], clamp)} pose="down" seed={1} />
    </Camera>
  );
};

/* ================= 1 — Faiz, 34, jurutera: dulu ceria, kini naik angin ================= */
export const Faiz: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aUmur = at(p, 'tiga puluh', 0.5);
  const aJur = at(p, 'jurutera', 1.7);
  const aCer = at(p, 'ceria', 2.9);
  const aTapi = at(p, 'tapi sejak', 4.7);
  const aAng = at(p, 'naik angin', 6.8);
  const aIst = at(p, 'isteri', 7.5);
  const now = f >= aTapi;
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: now ? `linear-gradient(180deg, ${C.night[1]} 0%, ${C.night[3]} 100%)` : `linear-gradient(180deg, #7FC4F2 0%, #BDE6C8 100%)`}} />
      {!now ? <div style={{position: 'absolute', left: 0, top: 1360, width: 1080, height: 560, background: LEAF}} /> : <div style={{position: 'absolute', left: 0, top: 1360, width: 1080, height: 560, background: C.night[0]}} />}
      <Pop at={aUmur} style={{left: 60, top: 470}}>
        <Pill text="Faiz, 34" bg={C.navy} color={C.yellow} size={54} />
      </Pop>
      <Pop at={aJur} style={{left: 60, top: 590}}>
        <IconPill icon={<KIcon name="laptop" size={60} f={f} />} text="Jurutera" size={42} />
      </Pop>
      {!now ? (
        <Pop at={aCer} style={{left: 0, width: 1080, top: 700, display: 'flex', justifyContent: 'center'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
            <KIcon name="ball" size={200} f={f} />
            <Pill text="Dulu ceria, kaki futsal" bg={C.green} size={40} />
          </div>
        </Pop>
      ) : (
        <>
          <div style={{position: 'absolute', left: 720, top: 600, transform: `scale(${interpolate(f - aAng, [0, 8], [0, 1], clamp)})`}}><KIcon name="storm" size={260} f={f} /></div>
          <Pop at={aTapi} style={{left: 60, top: 710}}>
            <Pill text="Sejak beberapa bulan…" bg={C.labelPink} size={40} />
          </Pop>
          <Pop at={aAng} style={{left: 470, top: 900}}>
            <Bubble tail="left" size={46} bg={RED} color="#fff">Mudah naik angin!</Bubble>
          </Pop>
        </>
      )}
      <Who preset={FAIZ} x={now ? 20 : 120} y={940} w={now ? 500 : 520} mood={now ? (f >= aAng ? 'angry' : 'tired') : 'happy'} anger={interpolate(f, [aAng, aAng + 12], [0, 1], clamp)} pose={now ? 'point' : 'wave'} seed={1} />
      {now ? (
        <>
          <Pop at={aIst} style={{left: 560, top: 1080}}><Who preset={ISTERI} x={0} y={0} w={330} mood="sad" pose="clasp" seed={4} /></Pop>
          <Pop at={aIst + 6} style={{left: 820, top: 1260}}><Who preset={ANAK} x={0} y={0} w={240} mood="sad" pose="down" seed={3} /></Pop>
        </>
      ) : null}
    </Camera>
  );
};

/* ================= 2 — Malam: telefon sampai 3 pagi, badan sakit, ujian normal, "Aku okey" ================= */
export const Malam: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTel = at(p, 'telefon', 1.5);
  const aPuk = at(p, 'pukul', 2.0);
  const aBad = at(p, 'badan', 3.5);
  const aUji = at(p, 'ujian', 5.3);
  const aOk = at(p, 'aku okey', 6.4);
  const phoneGlow = f >= aTel ? 0.35 + 0.1 * Math.sin(f / 3) : 0;
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, #0B0824 0%, ${C.night[1]} 100%)`}} />
      <div style={{position: 'absolute', left: 90, top: 620}}><Icon name="moon" size={120} /></div>
      <Glow x={380} y={1100} r={420} color="#7FC4F2" opacity={phoneGlow} />
      <Pop at={aPuk} style={{left: 60, top: 480}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, background: C.navy, padding: '12px 30px 12px 14px', borderRadius: 44}}>
          <KIcon name="clock" size={80} f={f} />
          <Txt size={60} color={C.yellow}>3:00 pagi</Txt>
        </div>
      </Pop>
      {/* katil */}
      <div style={{position: 'absolute', left: 20, top: 1360, width: 700, height: 150, borderRadius: 30, background: C.violet[2]}} />
      <Who preset={FAIZ} x={110} y={900} w={460} mood={f >= aOk ? 'fake-smile' : 'tired'} pose="clasp" seed={1} />
      <div style={{position: 'absolute', left: 40, top: 1420, width: 660, height: 200, borderRadius: '70px 70px 24px 24px', background: WATER_D}} />
      {f >= aTel ? <div style={{position: 'absolute', left: 290, top: 1170, transform: `scale(${interpolate(f - aTel, [0, 8], [0.6, 1], clamp)})`}}><KIcon name="phone" size={110} f={f} /></div> : null}
      <Pop at={aBad} style={{left: 600, top: 520}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          <IconPill icon={<KIcon name="back" size={64} f={f} />} text="Badan sakit" size={40} />
          <IconPill icon={<KIcon name="stomach" size={64} f={f} />} text="Perut tak selesa" size={36} />
        </div>
      </Pop>
      <Pop at={aUji} style={{left: 620, top: 740}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, background: C.green, padding: '12px 26px', borderRadius: 40}}>
          <Check size={48} bg={C.navy} /><Txt size={40}>Ujian: normal</Txt>
        </div>
      </Pop>
      <Pop at={aOk - 2} style={{left: 300, top: 850}}>
        <Bubble tail="left" size={44}>"Aku okey. Penat kerja je."</Bubble>
      </Pop>
    </Camera>
  );
};
const WATER_D = '#3E5FA8';

/* ================= 3 — Isteri pujuk jumpa doktor, saringan & temu bual ================= */
export const Doktor: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aDok = at(p, 'doktor', 1.2);
  const aSar = at(p, 'saringan', 2.3);
  const aTem = at(p, 'temu', 3.0);
  return (
    <Camera dur={p.dur} to={1.08} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[3]}} />
      <Pop at={aDok - 4} style={{left: 330, top: 520}}><ClinicSign x={0} y={0} /></Pop>
      <Who preset={ISTERI} x={10} y={1000} w={380} mood="sad" pose="point" seed={4} />
      <Who preset={FAIZ} x={330} y={1040} w={380} mood="tired" pose="down" seed={1} />
      {f >= aSar ? <Who preset={p.preset} x={680} y={960} w={400} mood="neutral" pose="clasp" /> : null}
      <Pop at={aSar} style={{left: 60, top: 700}}>
        <IconPill icon={<KIcon name="calendar" size={64} f={f - aSar} />} text="Saringan" size={44} />
      </Pop>
      <Pop at={aTem} style={{left: 480, top: 820}}>
        <IconPill icon={<KIcon name="talk" size={64} f={f} />} text="Temu bual" size={44} />
      </Pop>
    </Camera>
  );
};

/* ================= 4 — Diagnosis: kemurungan major ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKem = at(p, 'kemurungan', 1.0);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[3]} 0%, ${C.violet[2]} 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      <Who preset={p.preset} x={20} y={880} w={540} mood="neutral" pose={f >= aKem ? 'point' : 'chin'} />
      <Who preset={FAIZ} x={630} y={1050} w={400} mood="sad" pose="down" seed={1} />
      <Stamp f={f} a={aKem} top="DIAGNOSIS" big="KEMURUNGAN" sub="MAJOR" bigSize={116} y={500} />
    </Camera>
  );
};

/* ================= 5 — Tak nampak macam sedih: 5 tanda ================= */
export const Lima: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSed = at(p, 'sedih', 2.3);
  return (
    <FiveIntro
      p={p}
      aFive={at(p, 'lima', 3.5)}
      sub="tanda sering terlepas"
      glow={C.pink[2]}
      head={
        <>
          <Pop at={4} style={{left: 0, width: 1080, top: 470, display: 'flex', justifyContent: 'center'}}>
            <Pill text="Kemurungan pada lelaki" bg={C.navy} size={48} />
          </Pop>
          <Pop at={aSed - 8} style={{left: 0, width: 1080, top: 610, display: 'flex', justifyContent: 'center'}}>
            <div style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 20, background: '#fff', padding: '14px 40px 14px 20px', borderRadius: 50}}>
              <KIcon name="drop" size={90} />
              <Txt size={52} color={C.navy}>Tak nampak macam SEDIH</Txt>
            </div>
          </Pop>
          <div style={{position: 'absolute', left: 820, top: 1230, opacity: interpolate(f, [aSed, aSed + 8], [0, 1], clamp)}}>
            <Who preset={FAIZ} x={0} y={0} w={240} mood="fake-smile" pose="down" seed={1} />
          </div>
        </>
      }
    />
  );
};

/* ================= 6 — #1 Cepat marah ================= */
export const Marah: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aPan = at(p, 'panas', 1.7);
  return (
    <PointScene
      p={p}
      title="CEPAT MARAH"
      bg={`linear-gradient(180deg, ${C.night[0]} 0%, #5A1F3A 100%)`}
      glow={RED}
      hero={<Who preset={FAIZ} x={60} y={-20} w={290} mood="angry" anger={interpolate(f, [aPan, aPan + 12], [0.3, 1], clamp)} pose="point" seed={1} />}
      items={[
        {a: aPan, icon: <KIcon name="bolt" size={76} f={f} />, text: 'Panas baran', bg: RED},
        {a: at(p, 'tersinggung', 2.9), icon: <KIcon name="storm" size={76} f={f} />, text: 'Mudah tersinggung'},
        {a: at(p, 'bertengkar', 3.7), icon: <KIcon name="talk" size={76} f={f} />, text: 'Bertengkar hal kecil'},
      ]}
    />
  );
};

/* ================= 7 — #2 Lari ke kerja / skrin ================= */
export const Skrin: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="LARI KE KERJA / SKRIN"
      titleSize={70}
      bg={`linear-gradient(180deg, #0F0C2E 0%, ${C.night[3]} 100%)`}
      glow="#7FC4F2"
      hero={
        <div style={{position: 'relative', width: 360, height: 300}}>
          <div style={{position: 'absolute', left: 0, top: 40}}><KIcon name="laptop" size={260} f={f} /></div>
          <div style={{position: 'absolute', left: 230, top: 120}}><KIcon name="phone" size={150} f={f} /></div>
        </div>
      }
      items={[
        {a: at(p, 'kerja tanpa', 2.4), icon: <KIcon name="laptop" size={76} f={f} />, text: 'Kerja tanpa henti'},
        {a: at(p, 'telefon', 4.6), icon: <KIcon name="phone" size={76} f={f} />, text: 'Tenggelam dalam telefon', size: 38},
        {a: at(p, 'rasa kosong', 5.8), icon: <KIcon name="empty" size={76} f={f} />, text: 'Untuk elak rasa kosong', bg: C.labelPink, size: 38},
      ]}
      mood="curious"
    />
  );
};

/* ================= 8 — #3 Sakit badan tanpa punca ================= */
export const Sakit: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="SAKIT BADAN TANPA PUNCA"
      titleSize={66}
      bg={`linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 100%)`}
      hero={<Who preset={FAIZ} x={60} y={-20} w={290} mood="tired" pose="clasp" seed={1} />}
      items={[
        {a: at(p, 'sakit kepala', 2.4), icon: <MIcon name="head" size={76} f={f} />, text: 'Sakit kepala'},
        {a: at(p, 'belakang', 3.6), icon: <KIcon name="back" size={76} f={f} />, text: 'Sakit belakang'},
        {a: at(p, 'perut', 4.4), icon: <KIcon name="stomach" size={76} f={f} />, text: 'Perut tak selesa'},
        {a: at(p, 'baik-baik', 5.7), icon: <KIcon name="question" size={76} />, text: 'Tak baik-baik', bg: C.labelPink},
      ]}
      mood="curious"
      pose="chin"
    />
  );
};

/* ================= 9 — #4 Tidur terganggu ================= */
export const Tidur: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="TIDUR TERGANGGU"
      titleSize={74}
      bg={`linear-gradient(180deg, #0B0824 0%, ${C.night[3]} 100%)`}
      hero={
        <div style={{position: 'relative', width: 360, height: 300}}>
          <div style={{position: 'absolute', left: 0, top: 80}}><KIcon name="bed" size={280} /></div>
          <div style={{position: 'absolute', left: 230, top: 0}}><KIcon name="zzz" size={130} f={f} /></div>
        </div>
      }
      items={[
        {a: at(p, 'susah tidur', 1.8), icon: <Icon name="moon" size={76} />, text: 'Susah tidur'},
        {a: at(p, 'terlalu lama', 3.3), icon: <KIcon name="bed" size={76} />, text: 'Atau tidur terlalu lama', size: 38},
        {a: at(p, 'letih', 5.2), icon: <KIcon name="zzz" size={76} f={f} />, text: 'Bangun tetap letih', bg: C.labelPink},
      ]}
      mood="tired"
      pose="down"
    />
  );
};

/* ================= 10 — #5 Hilang minat & menarik diri ================= */
export const Minat: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aHob = at(p, 'hobi', 2.4);
  return (
    <PointScene
      p={p}
      title="HILANG MINAT"
      titleSize={80}
      bg={`linear-gradient(180deg, ${C.night[0]} 0%, ${C.night[3]} 100%)`}
      hero={
        <div style={{position: 'relative', width: 260, height: 260, opacity: interpolate(f, [aHob, aHob + 20], [1, 0.45], clamp)}}>
          <KIcon name="ball" size={260} />
          {f >= aHob ? <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={f - aHob} size={260} /></div> : null}
        </div>
      }
      items={[
        {a: aHob, icon: <KIcon name="ball" size={76} />, text: 'Hobi ditinggalkan'},
        {a: at(p, 'kawan', 3.7), icon: <Icon name="family" size={76} />, text: 'Kawan dijauhi'},
        {a: at(p, 'merokok', 5.2), icon: <KIcon name="cigarette" size={76} f={f} />, text: 'Lebih banyak merokok', size: 38},
        {a: at(p, 'risiko', 6.9), icon: <KIcon name="warning" size={76} />, text: 'Ambil risiko bahaya', bg: RED},
      ]}
      mood="sad"
      pose="clasp"
    />
  );
};

/* ================= 11 — Lebih 2 minggu → nilai; boleh dirawat ================= */
export const Rawat: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aBol = at(p, 'boleh dirawat', 3.6);
  return (
    <PointScene
      p={p}
      title="BOLEH DIRAWAT"
      titleSize={84}
      titleTop={580}
      bg={`linear-gradient(180deg, ${C.night[1]} 0%, #1F4A4A 100%)`}
      glow={C.green}
      hero={<div style={{transform: `scale(${interpolate(f, [aBol, aBol + 10], [0.6, 1], clamp)})`}}><KIcon name="smile" size={260} /></div>}
      items={[
        {a: at(p, 'dua minggu', 1.5), icon: <KIcon name="calendar" size={76} f={f} />, text: 'Lebih 2 minggu? Perlu dinilai', size: 34},
        {a: at(p, 'terapi', 5.4), icon: <KIcon name="talk" size={76} f={f} />, text: 'Terapi bercakap', bg: C.green},
        {a: at(p, 'ubat jika', 6.6), icon: <KIcon name="pill" size={76} />, text: 'Ubat jika perlu'},
        {a: at(p, 'tidak menyebabkan', 8.8), icon: <Check size={70} />, text: 'Antidepresan: tidak menyebabkan ketagihan', size: 30},
      ]}
      mood="happy"
    />
  );
};

/* ================= 12 — Faiz kembali ke padang futsal bersama anak ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aPad = at(p, 'padang', 2.8);
  const aAnak = at(p, 'anaknya', 4.7);
  const bx = 520 + Math.sin(f / 8) * 160;
  const by = 1300 - Math.abs(Math.sin(f / 6)) * 180;
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, #7FC4F2 0%, #F6D6A8 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1300, width: 1080, height: 620, background: LEAF}} />
      <div style={{position: 'absolute', left: 0, top: 1300, width: 1080, height: 10, background: '#fff', opacity: 0.8}} />
      <div style={{position: 'absolute', left: 840, top: 940, width: 200, height: 360, border: '12px solid #fff', borderBottom: 'none', borderRadius: '10px 10px 0 0'}} />
      <Pop at={2} style={{left: 60, top: 520}}>
        <Pill text="Beberapa bulan rawatan…" bg={C.navy} color={C.yellow} size={44} />
      </Pop>
      <Pop at={aPad} style={{left: 60, top: 640}}>
        <Pill text="Kembali ke padang futsal" bg={C.green} size={46} />
      </Pop>
      <Who preset={FAIZ} x={40} y={860} w={460} mood="happy" pose="wave" seed={1} />
      <Pop at={aAnak - 6} style={{left: 560, top: 1040}}><Who preset={ANAK} x={0} y={0} w={300} mood="happy" pose="wave" seed={3} /></Pop>
      <div style={{position: 'absolute', left: bx, top: by}}><KIcon name="ball" size={110} f={f} /></div>
      <Burst f={f} a={aPad} x={540} y={900} />
    </Camera>
  );
};

/* ================= 13 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Closing
      p={p}
      aSaya={at(p, 'saya doktor', 9.3)}
      lines={[
        {a: at(p, 'bercakap', 0.1), node: <IconPill icon={<KIcon name="talk" size={64} f={f} />} text="Bercakap bukan tanda lemah" size={42} />},
        {a: at(p, 'jangan tunggu', 2.0), node: <Pill text="Jangan tunggu, dapatkan rawatan" bg={C.labelPink} size={46} />},
        {
          a: at(p, 'kalau ada fikiran', 5.0),
          node: (
            <div style={{display: 'flex', alignItems: 'center', gap: 16, background: RED, padding: '12px 30px 12px 16px', borderRadius: 40, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
              <KIcon name="warning" size={70} />
              <div>
                <Txt size={32}>Fikiran mencederakan diri?</Txt>
                <Txt size={36} color={C.yellow}>Dapatkan bantuan kecemasan segera</Txt>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro,
  faiz: Faiz,
  malam: Malam,
  doktor: Doktor,
  diagnosis: Diagnosis,
  lima: Lima,
  marah: Marah,
  skrin: Skrin,
  sakit: Sakit,
  tidur: Tidur,
  minat: Minat,
  rawat: Rawat,
  pulih: Pulih,
  penutup: Penutup,
};
