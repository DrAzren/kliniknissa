import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C} from '../../theme';
import {Avatar, AvatarPreset} from '../../components/Avatar';
import {Camera, clamp, Glow, NightSky, Pill, Pop} from '../../components/common';
import {Icon} from '../kenali-eczema/scenes';
import {at, TopShade, Bubble, ChipList, ClinicBg, Closing, Confetti, Cross, KIcon, LimaScene, ORANGE, RED, SceneProps, Stamp, Sweat, Tick, Txt, Who} from '../kit';

export type {SceneProps};

/* ---------- watak cerita (rekaan) ---------- */
export const AINA: AvatarPreset = {
  id: 'aina-panik', skin: '#D9A47C', skinShade: '#BE8860', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#6157C5', topShade: '#4B3C9B',
  hijabColor: '#F6C945', hijabShade: '#D9AA2A', accessory: null,
};
export const KAWAN: AvatarPreset = {
  id: 'kawan-aina', skin: '#C9926A', skinShade: '#AD774F', hair: 'hijab', hairColor: '#1E1A24', top: 'kurung', topColor: '#2BB3A3', topShade: '#1F8A7E',
  hijabColor: '#E4629F', hijabShade: '#C24A82', accessory: null,
};

/* Latar dalam LRT */
const TrainBg: React.FC<{shake?: number}> = ({shake = 0}) => {
  const f = useCurrentFrame();
  return (
    <>
      <AbsoluteFill style={{background: `linear-gradient(180deg, #DCE3F2 0%, #B9C3DE 100%)`}} />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{position: 'absolute', left: 40 + i * 350, top: 520, width: 300, height: 240, borderRadius: 30, background: '#3B4A6B', overflow: 'hidden'}}>
          {[0, 1, 2].map((k) => (
            <div key={k} style={{position: 'absolute', left: ((k * 140 - f * 22 + i * 50) % 420 + 420) % 420 - 60, top: 120 + k * 20, width: 80, height: 120, background: '#5C6F96'}} />
          ))}
        </div>
      ))}
      <div style={{position: 'absolute', left: 0, top: 500, width: 1080, height: 16, background: '#8A93AE'}} />
      {[160, 540, 920].map((x) => (
        <div key={x} style={{position: 'absolute', left: x, top: 500, width: 16, height: 1100, background: '#A8B0C8', transform: `translateX(${shake}px)`}} />
      ))}
      <div style={{position: 'absolute', left: 0, top: 1560, width: 1080, height: 360, background: '#6B7390'}} />
      <TopShade />
    </>
  );
};

/* Lengkung serangan panik: naik mendadak, puncak, kemudian reda */
const PanicCurve: React.FC<{prog: number; w?: number; h?: number}> = ({prog, w = 920, h = 420}) => {
  const pts: string[] = [];
  const N = 60;
  for (let i = 0; i <= Math.round(N * prog); i++) {
    const x = i / N;
    const yv = x < 0.35 ? Math.pow(x / 0.35, 1.6) : Math.exp(-(x - 0.35) * 3.2);
    pts.push(`${(40 + x * (w - 80)).toFixed(1)},${(h - 40 - yv * (h - 100)).toFixed(1)}`);
  }
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{overflow: 'visible'}}>
      <rect x={0} y={0} width={w} height={h} rx={30} fill={C.navy} />
      <path d={`M 40 ${h - 40} L ${w - 40} ${h - 40} M 40 ${h - 40} L 40 40`} stroke={C.violet[3]} strokeWidth={5} />
      <polyline points={pts.join(' ')} stroke={RED} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x={w - 50} y={h - 56} textAnchor="end" fontFamily="Montserrat" fontWeight={800} fontSize={28} fill={C.violet[4]}>masa →</text>
    </svg>
  );
};

/* ================= 0 — Hook ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aDada = at(p, 'dada', 1.8);
  const aTangan = at(p, 'tangan', 3.0);
  const aMati = at(p, 'mati', 5.6);
  const aTapi = at(p, 'tapi', 6.7);
  const aSihat = at(p, 'sihat', 8.9);
  const ok = f >= aSihat;
  const shake = !ok && f >= aMati ? Math.sin(f * 2.2) * 8 : 0;
  return (
    <Camera dur={p.dur} to={1.1} panY={-20}>
      <NightSky seed={7} glow={ok ? C.green : C.labelPink} />
      <Glow x={540} y={760} r={460} color={ok ? C.green : RED} opacity={0.3} />
      <div style={{position: 'absolute', left: 340, top: 500, transform: `translateX(${shake}px)`}}>
        <KIcon name={ok ? 'heart-ok' : 'heart'} size={400} f={f * (ok ? 1 : 2)} />
      </div>
      <ChipList
        top={960}
        gap={140}
        w={560}
        left={60}
        items={[
          {icon: <KIcon name="heart" size={76} f={f} />, text: 'Berdebar laju', a: 2, bg: RED},
          {icon: <KIcon name="chest" size={76} f={f} />, text: 'Dada ketat', a: aDada},
          {icon: <KIcon name="hand" size={76} f={f} />, text: 'Tangan kebas', a: aTangan},
        ]}
      />
      <Pop at={aMati - 4} style={{left: 640, top: 1000}}>
        <Bubble tail="right" size={44}>"Nak mati…"</Bubble>
      </Pop>
      <Who preset={AINA} x={640} y={1150} w={380} mood={ok ? 'curious' : 'shock'} pose="clasp" seed={2} style={{transform: `translateX(${shake}px)`}} />
      <Pop at={aTapi} style={{left: 0, width: 1080, top: 1420, display: 'flex', justifyContent: 'center'}}>
        <Pill text={ok ? 'Jantung SIHAT ✓' : 'Tapi bila diperiksa…'} bg={ok ? C.green : C.navy} color={ok ? '#fff' : C.yellow} size={56} />
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Dalam LRT ================= */
export const Lrt: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aIsnin = at(p, 'pagi', 3.4);
  const aSesak = at(p, 'tiba-tiba', 5.9);
  const aGigil = at(p, 'menggigil', 7.8);
  const aPeluh = at(p, 'berpeluh', 8.7);
  const aPening = at(p, 'pening', 9.7);
  const aYakin = at(p, 'yakin', 10.7);
  const panic = f >= aSesak;
  const shake = panic ? Math.sin(f * 2.4) * 6 : 0;
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <TrainBg shake={Math.sin(f / 5) * 2} />
      <Pop at={2} style={{left: 60, top: 560}}>
        <Pill text="Aina, 24 • 3 bulan bekerja" bg={C.navy} color={C.yellow} size={42} />
      </Pop>
      <Pop at={aIsnin} style={{left: 60, top: 670}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, background: C.violet[1], padding: '8px 26px 8px 12px', borderRadius: 40}}>
          <KIcon name="train" size={70} f={f} />
          <Txt size={42}>Isnin pagi, LRT sesak</Txt>
        </div>
      </Pop>
      {/* penumpang (bayang) */}
      {[[20, 920, 360], [740, 900, 380], [860, 1060, 300]].map(([x, y, w], i) => (
        <div key={i} style={{position: 'absolute', left: x, top: y + Math.sin(f / 9 + i) * 3, opacity: 0.55}}>
          <Avatar preset={i % 2 ? KAWAN : AINA} silhouette width={w} pose="down" />
        </div>
      ))}
      {panic ? <AbsoluteFill style={{background: `radial-gradient(circle at 50% 60%, ${RED}00 30%, ${RED}55 100%)`, opacity: 0.6 + 0.3 * Math.sin(f / 4)}} /> : null}
      <Who preset={AINA} x={300} y={960} w={460} mood={panic ? 'shock' : 'neutral'} pose={panic ? 'clasp' : 'down'} seed={2} style={{transform: `translateX(${shake}px)`}} />
      <Sweat x={430} y={1020} on={f >= aPeluh} />
      {panic ? (
        <Pop at={aSesak} style={{left: 640, top: 780}}>
          <Pill text="Sesak nafas!" bg={RED} size={46} />
        </Pop>
      ) : null}
      {[
        {t: 'Menggigil', a: aGigil, x: 40},
        {t: 'Berpeluh', a: aPeluh, x: 380},
        {t: 'Pening', a: aPening, x: 700},
      ].map((c) => (
        <Pop key={c.t} at={c.a} style={{left: c.x, top: 1600}}>
          <Pill text={c.t} bg={C.navy} color={C.yellow} size={44} />
        </Pop>
      ))}
      <Pop at={aYakin} style={{left: 60, top: 870}}>
        <Bubble size={46}>"Serangan jantung?!"</Bubble>
      </Pop>
    </Camera>
  );
};

/* ================= 2 — Klinik: ECG normal ================= */
export const Klinik: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aEcg = at(p, 'e-c-g', 3.1);
  const aNorm = at(p, 'normal', 4.6);
  return (
    <Camera dur={p.dur} to={1.08} panY={-10}>
      <ClinicBg />
      <Glow x={540} y={1000} r={480} color={C.green} opacity={0.2} />
      <Pop at={aEcg - 4} style={{left: 560, top: 640}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
          <KIcon name="ecg" size={400} f={f} />
          <Pill text="ECG" bg={C.navy} color={C.yellow} size={44} />
        </div>
      </Pop>
      <Pop at={aNorm} style={{left: 600, top: 1140}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: C.green, padding: '12px 32px 12px 14px', borderRadius: 40}}>
          <Tick bg="#1F8A7E" size={60} />
          <Txt size={56}>NORMAL</Txt>
        </div>
      </Pop>
      <Who preset={p.preset} x={20} y={880} w={520} mood={f >= aNorm ? 'happy' : 'curious'} pose={f >= aEcg ? 'point' : 'chin'} />
      <Who preset={KAWAN} x={820} y={1260} w={260} mood="sad" pose="clasp" seed={5} />
      <Who preset={AINA} x={560} y={1260} w={300} mood={f >= aNorm ? 'curious' : 'sad'} pose="clasp" seed={2} />
    </Camera>
  );
};

/* ================= 3 — Diagnosis: SERANGAN PANIK ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aPan = at(p, 'serangan', 1.3);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <NightSky seed={17} glow={C.labelPink} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      <Who preset={p.preset} x={40} y={1000} w={500} mood="neutral" pose="point" />
      <Who preset={AINA} x={600} y={1080} w={400} mood={f >= aPan ? 'shock' : 'curious'} pose="clasp" seed={2} />
      <Stamp a={aPan} kicker="DIAGNOSIS" lines={['SERANGAN', 'PANIK']} top={560} size={120} />
    </Camera>
  );
};

/* ================= 4 — 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => <LimaScene p={p} word="lima" title="perkara penting" glow={C.labelPink} />;

/* ================= 5 — #1 Tanda: mengejut, memuncak dalam beberapa minit ================= */
export const P1: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aMenge = at(p, 'mengejut', 1.2);
  const aPuncak = at(p, 'memuncak', 2.1);
  const prog = interpolate(f, [aMenge, aPuncak + 30], [0, 1], clamp);
  const sym = [
    {k: 'heart' as const, t: 'Berdebar', a: at(p, 'jantung', 3.7)},
    {k: 'chest' as const, t: 'Sesak nafas', a: at(p, 'sesak', 4.8)},
    {k: 'chest' as const, t: 'Sakit dada', a: at(p, 'sakit', 5.8)},
    {k: 'hand' as const, t: 'Menggigil, kebas', a: at(p, 'menggigil', 6.7)},
    {k: 'brain' as const, t: 'Takut hilang kawalan', a: at(p, 'takut', 8.8)},
  ];
  return (
    <Camera dur={p.dur} to={1.05} panY={-10}>
      <NightSky seed={23} glow={RED} />
      <div style={{position: 'absolute', left: 80, top: 560}}>
        <PanicCurve prog={prog} />
      </div>
      <Pop at={aPuncak} style={{left: 300, top: 520}}>
        <Pill text="Puncak dalam beberapa minit" bg={C.yellow} color={C.navy} size={36} />
      </Pop>
      {sym.map((s, i) => (
        <Pop key={i} at={s.a} style={{left: i % 2 ? 560 : 60, top: 960 + Math.floor(i / 2) * 140}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, background: i % 2 ? C.violet[1] : C.navy, padding: '8px 24px 8px 10px', borderRadius: 34, width: i === 4 ? 620 : 440}}>
            <KIcon name={s.k} size={70} f={f} />
            <Txt size={38}>{s.t}</Txt>
          </div>
        </Pop>
      ))}
    </Camera>
  );
};

/* ================= 6 — #2 Kenapa: penggera tersalah bunyi, adrenalin ================= */
export const P2: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aGera = at(p, 'penggera', 2.1);
  const aSalah = at(p, 'tersalah', 3.0);
  const aAdr = at(p, 'adrenalin', 3.9);
  const aBahaya = at(p, 'bahaya', 6.3);
  const aSelamat = at(p, 'selamat', 8.3);
  return (
    <Camera dur={p.dur} to={1.06} panY={-10}>
      <NightSky seed={29} glow={ORANGE} />
      <Pop at={aGera} style={{left: 90, top: 520}}>
        <div style={{width: 420, height: 420, borderRadius: 50, background: C.navy, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}>
          <KIcon name="alarm" size={240} f={f} />
          <Txt size={40} color={C.yellow}>Penggera badan</Txt>
        </div>
      </Pop>
      <Pop at={aSalah} style={{left: 140, top: 960}}>
        <Pill text="Tersalah bunyi!" bg={RED} size={46} />
      </Pop>
      <Pop at={aAdr} style={{left: 580, top: 520}}>
        <div style={{width: 420, height: 420, borderRadius: 50, background: C.violet[1], display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}>
          <KIcon name="adrenaline" size={240} f={f} />
          <Txt size={44}>Adrenalin</Txt>
        </div>
      </Pop>
      <div style={{position: 'absolute', left: 0, width: 1080, top: 1100, display: 'flex', justifyContent: 'center', gap: 30}}>
        {f >= aBahaya ? (
          <div style={{position: 'relative'}}>
            <Pill text="Bahaya?" bg={RED} size={44} />
            {f >= aSelamat ? <div style={{position: 'absolute', left: 60, top: -20}}><Cross f={f - aSelamat} size={110} color="#fff" /></div> : null}
          </div>
        ) : null}
        {f >= aSelamat ? <Pill text="SELAMAT ✓" bg={C.green} size={44} /> : null}
      </div>
    </Camera>
  );
};

/* ================= 7 — #3 Sakit dada kali pertama: periksa dahulu ================= */
export const P3: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSakit = at(p, 'sakit dada', 1.5);
  const aPeriksa = at(p, 'diperiksa', 3.2);
  const aAnggap = at(p, 'anggap', 5.3);
  return (
    <Camera dur={p.dur} to={1.06} panY={-10}>
      <NightSky seed={33} glow={C.yellow} />
      <Pop at={1} style={{left: 0, width: 1080, top: 590, display: 'flex', justifyContent: 'center'}}>
        <Pill text="⚠ PENTING" bg={C.yellow} color={C.navy} size={56} />
      </Pop>
      <Pop at={aSakit} style={{left: 90, top: 700}}>
        <div style={{width: 400, height: 400, borderRadius: 50, background: C.navy, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}>
          <KIcon name="chest" size={230} f={f} />
          <Txt size={34} style={{textAlign: 'center'}}>Sakit dada kali pertama</Txt>
        </div>
      </Pop>
      <Pop at={aSakit + 8} style={{left: 520, top: 850}}>
        <Txt size={120} color={C.yellow}>→</Txt>
      </Pop>
      <Pop at={aPeriksa} style={{left: 680, top: 700}}>
        <div style={{width: 330, height: 400, borderRadius: 50, background: C.green, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}>
          <Icon name="doctor" size={200} />
          <Txt size={36} style={{textAlign: 'center'}}>Jumpa doktor dahulu</Txt>
        </div>
      </Pop>
      <Pop at={aAnggap} style={{left: 0, width: 1080, top: 1170, display: 'flex', justifyContent: 'center'}}>
        <div style={{position: 'relative'}}>
          <Bubble size={48}>"Ah, panik je…"</Bubble>
          {f >= aAnggap + 6 ? <div style={{position: 'absolute', left: 150, top: -14}}><Cross f={f - aAnggap - 6} size={110} /></div> : null}
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 8 — #4 Teknik: nafas perlahan + 5-4-3 ================= */
export const P4: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTarik = at(p, 'tarik', 1.5);
  const aHembus = at(p, 'hembus', 3.7);
  const aKemudian = at(p, 'kemudian', 5.1);
  const aLima = at(p, 'lima benda', 6.0);
  const aEmpat = at(p, 'empat yang', 7.7);
  const aTiga = at(p, 'tiga yang', 9.0);
  const aReda = at(p, 'reda', 11.1);
  const breath = f < aTarik ? 0.6 : f < aHembus ? interpolate(f, [aTarik, aHembus], [0.6, 1], clamp) : interpolate(f, [aHembus, aKemudian + 10], [1, 0.6], clamp);
  const counting = f >= aLima - 4;
  const cards = [
    {n: 5, k: 'eye' as const, t: 'nampak', a: aLima},
    {n: 4, k: 'hand' as const, t: 'sentuh', a: aEmpat},
    {n: 3, k: 'ear' as const, t: 'dengar', a: aTiga},
  ];
  return (
    <Camera dur={p.dur} to={1.05} panY={-10}>
      <NightSky seed={43} glow={C.green} />
      <Glow x={540} y={820} r={420} color={C.green} opacity={0.25} />
      <div style={{position: 'absolute', left: 540 - 220, top: 560, width: 440, height: 440, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: counting ? 0.35 : 1}}>
        <div style={{width: 440 * breath, height: 440 * breath, borderRadius: '50%', background: `radial-gradient(circle, ${C.green} 0%, #1F8A7E 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 80px rgba(43,179,163,.6)'}}>
          <Txt size={48}>{f < aHembus ? 'Tarik…' : 'Hembus…'}</Txt>
        </div>
      </div>
      <Pop at={aTarik} style={{left: 60, top: 1040}}>
        <Pill text="Tarik nafas perlahan (hidung)" bg={C.navy} color={C.yellow} size={38} />
      </Pop>
      <Pop at={aHembus} style={{left: 60, top: 1140}}>
        <Pill text="Hembus lebih panjang" bg={C.violet[1]} size={38} />
      </Pop>
      {counting
        ? cards.map((c, i) => (
            <Pop key={c.n} at={c.a} style={{left: 60 + i * 330, top: 600}}>
              <div style={{width: 300, height: 380, borderRadius: 40, background: i % 2 ? C.violet[1] : C.navy, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 16px 40px rgba(18,11,51,.5)'}}>
                <Txt size={130} color={C.yellow}>{c.n}</Txt>
                <KIcon name={c.k} size={110} f={f} />
                <Txt size={40}>{c.t}</Txt>
              </div>
            </Pop>
          ))
        : null}
      <Pop at={aReda} style={{left: 0, width: 1080, top: 1260, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Serangan akan reda ✓" bg={C.green} size={50} />
      </Pop>
    </Camera>
  );
};

/* ================= 9 — #5 Berulang → gangguan panik → rawatan ================= */
export const P5: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aGang = at(p, 'gangguan', 4.5);
  return (
    <Camera dur={p.dur} to={1.05} panY={-10}>
      <NightSky seed={59} glow={C.violet[3]} />
      <ChipList
        top={540}
        gap={140}
        w={700}
        items={[
          {icon: <KIcon name="repeat" size={76} f={f} />, text: 'Serangan berulang', a: at(p, 'berulang', 1.4)},
          {icon: <KIcon name="house" size={76} f={f} />, text: 'Takut keluar rumah', a: at(p, 'takut', 2.5)},
        ]}
      />
      <Pop at={aGang} style={{left: 0, width: 1080, top: 820, display: 'flex', justifyContent: 'center'}}>
        <Pill text="= Gangguan panik" bg={RED} size={56} />
      </Pop>
      <Pop at={at(p, 'dirawat', 5.8)} style={{left: 0, width: 1080, top: 960, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Boleh dirawat ✓" bg={C.green} size={50} />
      </Pop>
      <ChipList
        top={1090}
        gap={140}
        w={760}
        left={160}
        items={[
          {icon: <KIcon name="therapy" size={76} f={f} />, text: 'Terapi kognitif tingkah laku (CBT)', a: at(p, 'terapi', 6.4)},
          {icon: <KIcon name="pill" size={76} f={f} />, text: 'Ubat jika perlu', a: at(p, 'ubat', 8.3)},
        ]}
        size={36}
      />
    </Camera>
  );
};

/* ================= 10 — Aina kembali tenang ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKembali = at(p, 'kembali', 2.2);
  const aTenang = at(p, 'tenang', 3.5);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <TrainBg shake={Math.sin(f / 5) * 2} />
      <AbsoluteFill style={{background: `radial-gradient(circle at 50% 60%, ${C.yellow}55 0%, ${C.yellow}00 60%)`}} />
      <Pop at={1} style={{left: 60, top: 560}}>
        <Pill text="Selepas beberapa sesi terapi" bg={C.navy} color={C.yellow} size={42} />
      </Pop>
      <Who preset={AINA} x={300} y={900} w={480} mood="happy" pose={f >= aKembali ? 'wave' : 'down'} seed={2} />
      <Confetti a={aKembali} y={960} />
      <Pop at={aTenang} style={{left: 0, width: 1080, top: 1560, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Naik LRT dengan tenang ✓" bg={C.green} size={52} />
      </Pop>
    </Camera>
  );
};

/* ================= 11 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return <Closing p={p} firstWord="kalau" question="Serangan panik ganggu hidup anda?" qIcon={<KIcon name="heart" size={70} f={f} />} action="Dapatkan rawatan" actionWord="dapatkan" />;
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro,
  lrt: Lrt,
  klinik: Klinik,
  diagnosis: Diagnosis,
  lima: Lima,
  p1: P1,
  p2: P2,
  p3: P3,
  p4: P4,
  p5: P5,
  pulih: Pulih,
  penutup: Penutup,
};
