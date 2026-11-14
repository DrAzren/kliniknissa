import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import {C} from '../../theme';
import {AvatarPreset} from '../../components/Avatar';
import {Camera, clamp, Glow, NightSky, Pill, Pop} from '../../components/common';
import {at, TopShade, ChipList, ClinicBg, Closing, Confetti, Cross, KIcon, LimaScene, ORANGE, RED, SceneProps, Stamp, Sweat, Tick, Txt, Who} from '../kit';

export type {SceneProps};

/* ---------- watak cerita (rekaan) ---------- */
export const DANIAL: AvatarPreset = {
  id: 'danial', skin: '#B9835B', skinShade: '#9C6A45', hair: 'short', hairColor: '#231B28', top: 'tee', topColor: '#F08A24', topShade: '#C96E16',
  accessory: null, stubble: true,
};

/* Sistem kencing: buah pinggang → ureter → pundi. stone = 0..1 kedudukan batu di ureter kanan (-1 = tiada) */
export const UrinaryTract: React.FC<{w?: number; stone?: number; stoneSize?: number; pain?: boolean; glowKidney?: boolean}> = ({w = 600, stone = -1, stoneSize = 16, pain, glowKidney}) => {
  const f = useCurrentFrame();
  // ureter kanan (sisi kanan skrin): dari (420,250) ke (330,560)
  const P0 = [420, 250], P1 = [450, 420], P2 = [330, 560];
  const bez = (t: number) => [
    (1 - t) * (1 - t) * P0[0] + 2 * (1 - t) * t * P1[0] + t * t * P2[0],
    (1 - t) * (1 - t) * P0[1] + 2 * (1 - t) * t * P1[1] + t * t * P2[1],
  ];
  const sp = stone >= 0 ? bez(Math.min(1, stone)) : null;
  const pulse = 0.5 + 0.5 * Math.abs(Math.sin(f / 4));
  return (
    <svg width={w} height={(w * 700) / 600} viewBox="0 0 600 700" style={{overflow: 'visible'}}>
      {/* ureter */}
      <path d="M 180 250 Q 150 420 270 560" stroke="#E7A6B3" strokeWidth={22} fill="none" strokeLinecap="round" />
      <path d={`M ${P0[0]} ${P0[1]} Q ${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}`} stroke="#E7A6B3" strokeWidth={22} fill="none" strokeLinecap="round" />
      {/* buah pinggang */}
      <g transform="translate(70 70) scale(1.6)"><path d="M 66 12 Q 104 12 108 54 Q 110 96 72 106 Q 46 112 40 92 Q 36 80 50 70 Q 60 62 50 52 Q 38 42 42 28 Q 48 12 66 12 Z" fill="#C9576A" transform="scale(-1 1) translate(-140 0)" /></g>
      <g transform="translate(330 70) scale(1.6)"><path d="M 66 12 Q 104 12 108 54 Q 110 96 72 106 Q 46 112 40 92 Q 36 80 50 70 Q 60 62 50 52 Q 38 42 42 28 Q 48 12 66 12 Z" fill="#C9576A" /></g>
      {glowKidney ? <circle cx={470} cy={170} r={110} fill={RED} opacity={0.25 * pulse} /> : null}
      {/* pundi kencing */}
      <path d="M 220 560 Q 200 680 300 680 Q 400 680 380 560 Q 300 520 220 560 Z" fill="#E7A6B3" />
      <rect x={290} y={672} width={20} height={26} rx={8} fill="#E7A6B3" />
      {sp ? (
        <g>
          {pain ? <circle cx={sp[0]} cy={sp[1]} r={stoneSize + 30} fill={RED} opacity={0.45 * pulse} /> : null}
          <path d={`M ${sp[0] - stoneSize} ${sp[1]} L ${sp[0] - stoneSize * 0.5} ${sp[1] - stoneSize} L ${sp[0] + stoneSize * 0.6} ${sp[1] - stoneSize * 0.8} L ${sp[0] + stoneSize} ${sp[1] + stoneSize * 0.2} L ${sp[0] + stoneSize * 0.3} ${sp[1] + stoneSize} L ${sp[0] - stoneSize * 0.7} ${sp[1] + stoneSize * 0.7} Z`} fill="#C9B48A" stroke="#8C7648" strokeWidth={3} />
        </g>
      ) : null}
    </svg>
  );
};

/* ================= 0 — Hook: sakit paling teruk ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSakit = at(p, 'sakit', 1.6);
  const aTeruk = at(p, 'teruk', 2.4);
  const level = interpolate(f, [aSakit, aTeruk + 10], [0, 10], clamp);
  const shake = level >= 9.5 ? Math.sin(f * 2.5) * 8 : 0;
  return (
    <Camera dur={p.dur} to={1.1} panY={-20}>
      <NightSky seed={9} glow={level > 7 ? RED : C.violet[2]} />
      <Glow x={540} y={900} r={500} color={RED} opacity={0.08 * level / 2} />
      <Pop at={2} style={{left: 0, width: 1080, top: 520, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Skala sakit" bg={C.navy} color={C.yellow} size={50} />
      </Pop>
      <div style={{position: 'absolute', left: 90, top: 640, display: 'flex', alignItems: 'flex-end', gap: 12, transform: `translateX(${shake}px)`}}>
        {new Array(10).fill(0).map((_, i) => {
          const on = level > i;
          const col = `hsl(${120 - i * 13}, 70%, 52%)`;
          return <div key={i} style={{width: 78, height: 80 + i * 30, borderRadius: 16, background: on ? col : 'rgba(255,255,255,0.12)'}} />;
        })}
      </div>
      <Pop at={aTeruk} style={{left: 0, width: 1080, top: 1050, display: 'flex', justifyContent: 'center'}}>
        <Txt size={150} color={RED} style={{textShadow: '0 10px 0 rgba(18,11,51,.6)'}}>10/10!</Txt>
      </Pop>
      <Pop at={aTeruk + 6} style={{left: 0, width: 1080, top: 1240, display: 'flex', justifyContent: 'center'}}>
        <div style={{background: '#fff', padding: '14px 36px', borderRadius: 44}}>
          <Txt size={44} color={C.navy}>"Paling teruk pernah rasa"</Txt>
        </div>
      </Pop>
      <div style={{position: 'absolute', left: 820, top: 1360, transform: `scale(${level / 10})`}}>
        <KIcon name="bolt" size={200} />
      </div>
    </Camera>
  );
};

/* ================= 1 — Danial: bumbung panas, jarang minum ================= */
export const Danial: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aJuru = at(p, 'juruteknik', 1.7);
  const aPanas = at(p, 'panas', 4.6);
  const aJarang = at(p, 'jarang', 5.5);
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, #7FC4F2 0%, #F6D9A8 100%)`}} />
      <Glow x={850} y={620} r={360} color={ORANGE} opacity={interpolate(f, [aPanas, aPanas + 10], [0.2, 0.6], clamp)} />
      <TopShade />
      <div style={{position: 'absolute', left: 760, top: 500}}><KIcon name="sun" size={240} f={f} /></div>
      {/* bumbung */}
      <div style={{position: 'absolute', left: -40, top: 1380, width: 1160, height: 600, background: '#B5543F', transform: 'skewY(-6deg)'}} />
      {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{position: 'absolute', left: i * 200 - 20, top: 1380 - i * 21, width: 8, height: 600, background: '#8E3F2E', transform: 'skewY(-6deg)'}} />)}
      <Pop at={2} style={{left: 60, top: 520}}>
        <Pill text="Danial, 35" bg={C.navy} color={C.yellow} size={48} />
      </Pop>
      <Pop at={aJuru} style={{left: 60, top: 630}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, background: C.violet[1], padding: '8px 26px 8px 12px', borderRadius: 40}}>
          <KIcon name="ac" size={70} f={f} />
          <Txt size={40}>Juruteknik penghawa dingin</Txt>
        </div>
      </Pop>
      <div style={{position: 'absolute', left: 620, top: 1170}}><KIcon name="ac" size={300} f={f} /></div>
      <Who preset={DANIAL} x={160} y={920} w={460} mood={f >= aPanas ? 'tired' : 'happy'} pose={f >= aPanas ? 'down' : 'wave'} seed={1} />
      <Sweat x={300} y={980} on={f >= aPanas} />
      <Pop at={aJarang} style={{left: 640, top: 760}}>
        <div style={{position: 'relative', width: 300, height: 300, borderRadius: 40, background: C.navy, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <svg width={150} height={150} viewBox="0 0 120 120">
            <rect x={46} y={4} width={28} height={14} rx={4} fill={C.green} />
            <path d="M 40 18 L 80 18 L 84 34 L 84 108 Q 84 116 76 116 L 44 116 Q 36 116 36 108 L 36 34 Z" fill="rgba(255,255,255,0.35)" stroke="#fff" strokeWidth={4} />
            <rect x={40} y={104} width={40} height={8} rx={3} fill="#6FC3F2" />
          </svg>
          <Txt size={36}>Jarang minum</Txt>
          <div style={{position: 'absolute', left: 90, top: 30}}>{f >= aJarang + 6 ? <Cross f={f - aJarang - 6} size={120} /> : null}</div>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 2 — Sakit mencucuk berombak ================= */
export const Sakit: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aPing = at(p, 'pinggang', 1.0);
  const aCucuk = at(p, 'mencucuk', 2.2);
  const aOmbak = at(p, 'berombak', 3.8);
  const aPerut = at(p, 'perut', 5.2);
  const aDiam = at(p, 'duduk', 6.4);
  const aMuntah = at(p, 'muntah', 8.0);
  const hit = f >= aCucuk;
  const wave = Math.max(0, Math.sin((f - aOmbak) / 6));
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[0]} 0%, ${C.pink[2]} 100%)`}} />
      <Glow x={420} y={1150} r={460} color={RED} opacity={hit ? 0.25 + 0.2 * wave : 0.05} />
      <Pop at={1} style={{left: 60, top: 520}}>
        <Pill text="Satu petang…" bg={C.labelPink} size={48} />
      </Pop>
      <Who preset={DANIAL} x={140} y={880} w={500} mood={hit ? 'shock' : 'neutral'} pose={hit ? 'clasp' : 'down'} seed={1} style={{transform: `translateX(${hit ? Math.sin(f * 1.8) * 5 : 0}px)`}} />
      {hit ? (
        <div style={{position: 'absolute', left: 470, top: 1170, transform: `scale(${0.8 + 0.3 * wave})`}}>
          <KIcon name="bolt" size={150} />
        </div>
      ) : null}
      {f >= aPerut ? (
        <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
          <path d="M 540 1230 Q 520 1330 420 1400" stroke={C.yellow} strokeWidth={10} fill="none" strokeDasharray="22 16" strokeDashoffset={-f * 4} markerEnd="url(#ah)" />
          <defs><marker id="ah" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M 0 0 L 8 4 L 0 8 Z" fill={C.yellow} /></marker></defs>
        </svg>
      ) : null}
      <ChipList
        top={640}
        gap={130}
        left={600}
        w={440}
        size={38}
        items={[
          {icon: <KIcon name="bolt" size={70} />, text: 'Mencucuk', a: aCucuk, bg: RED},
          {text: 'Berombak ∿', a: aOmbak},
          {text: '→ perut bawah', a: aPerut},
          {text: 'Tak boleh duduk diam', a: aDiam},
          {icon: <KIcon name="vomit" size={70} f={f} />, text: 'Berpeluh & muntah', a: aMuntah},
        ]}
      />
      <Sweat x={300} y={930} on={f >= aMuntah - 20} />
    </Camera>
  );
};

/* ================= 3 — Kencing kemerahan → klinik ================= */
export const Klinik: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aMerah = at(p, 'kemerahan', 1.3);
  const aKli = at(p, 'klinik', 3.2);
  return (
    <Camera dur={p.dur} to={1.08} panY={-10}>
      <ClinicBg />
      <Pop at={aMerah - 6} style={{left: 600, top: 650}}>
        <div style={{width: 380, height: 420, borderRadius: 40, background: C.navy, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}>
          <KIcon name="cup" size={240} />
          <Txt size={40} color="#FF9AA8">Kemerahan</Txt>
        </div>
      </Pop>
      <Who preset={DANIAL} x={80} y={920} w={460} mood="sad" pose="clasp" seed={1} />
      <Pop at={aKli} style={{left: 600, top: 1120}}>
        <Pill text="Terus ke klinik" bg={C.green} size={48} />
      </Pop>
    </Camera>
  );
};

/* ================= 4 — Ujian air kencing + imbasan → BATU KARANG ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aDarah = at(p, 'darah', 1.1);
  const aImb = at(p, 'imbasan', 1.9);
  const aBatu = at(p, 'batu', 3.4);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <NightSky seed={19} glow={C.labelPink} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      <Pop at={aDarah - 4} style={{left: 60, top: 530}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, background: C.navy, padding: '10px 28px 10px 12px', borderRadius: 40}}>
          <KIcon name="cup" size={80} />
          <Txt size={42}>Ujian: <span style={{color: '#FF7A8A'}}>DARAH +</span></Txt>
        </div>
      </Pop>
      <Pop at={aImb} style={{left: 560, top: 660}}>
        <div style={{width: 460, height: 460, borderRadius: 40, background: '#10203A', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
          <UrinaryTract w={380} stone={f >= aBatu ? 0.55 : -1} stoneSize={20} pain />
        </div>
        <div style={{position: 'absolute', left: 20, top: 16}}><Txt size={30} color="#4BE38A">IMBASAN</Txt></div>
      </Pop>
      <Who preset={p.preset} x={20} y={940} w={480} mood={f >= aBatu ? 'neutral' : 'curious'} pose="point" />
      <Who preset={DANIAL} x={640} y={1200} w={320} mood={f >= aBatu ? 'shock' : 'sad'} pose="clasp" seed={1} />
      <Stamp a={aBatu + 4} kicker="DIAGNOSIS" lines={['BATU KARANG']} top={1120} size={110} />
    </Camera>
  );
};

/* ================= 5 — 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => <LimaScene p={p} word="lima" title="perkara" glow={ORANGE} />;

/* ================= 6 — #1 Terbentuk: bahan pekat → kristal ================= */
export const B1: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKal = at(p, 'kalsium', 3.4);
  const aUrik = at(p, 'asid', 4.1);
  const aPekat = at(p, 'pekat', 5.2);
  const aKris = at(p, 'kristal', 6.4);
  const gather = interpolate(f, [aPekat, aKris + 6], [0, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.06} panY={-10}>
      <NightSky seed={61} glow={ORANGE} />
      <div style={{position: 'absolute', left: 140, top: 500, width: 800, height: 640, borderRadius: 60, background: '#2A1F5C', overflow: 'hidden'}}>
        <AbsoluteFill style={{background: `linear-gradient(180deg, #F6D06A ${(1 - gather) * 30}%, #D9A034 100%)`, opacity: 0.35 + 0.35 * gather}} />
        {new Array(26).fill(0).map((_, i) => {
          const kind = i % 2 ? 'k' : 'u';
          const show = kind === 'k' ? f >= aKal : f >= aUrik;
          if (!show) return null;
          const x0 = 60 + random(`px${i}`) * 680;
          const y0 = 60 + random(`py${i}`) * 520;
          const x = x0 + (400 - x0) * gather + Math.sin(f / 8 + i) * 16 * (1 - gather);
          const y = y0 + (320 - y0) * gather + Math.cos(f / 9 + i) * 16 * (1 - gather);
          return <div key={i} style={{position: 'absolute', left: x - 16, top: y - 16, width: 32, height: 32, borderRadius: kind === 'k' ? 16 : 6, background: kind === 'k' ? '#fff' : '#F6C945', opacity: 1 - gather * 0.8, transform: `rotate(${kind === 'u' ? 45 : 0}deg)`}} />;
        })}
        {f >= aKris ? (
          <div style={{position: 'absolute', left: 400 - 120, top: 320 - 120, transform: `scale(${interpolate(f - aKris, [0, 8], [0.3, 1], clamp)})`}}>
            <KIcon name="stone" size={240} f={f} />
          </div>
        ) : null}
      </div>
      <div style={{position: 'absolute', left: 140, top: 1170, display: 'flex', gap: 20, flexWrap: 'wrap', width: 820}}>
        {f >= aKal ? <Pill text="● Kalsium" bg={C.navy} size={40} /> : null}
        {f >= aUrik ? <Pill text="◆ Asid urik" bg={C.navy} color={C.yellow} size={40} /> : null}
        {f >= aPekat ? <Pill text="Terlalu pekat" bg={ORANGE} size={40} /> : null}
        {f >= aKris ? <Pill text="→ Kristal keras" bg={RED} size={40} /> : null}
      </div>
    </Camera>
  );
};

/* ================= 7 — #2 Tanda utama ================= */
export const B2: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSakit = at(p, 'sakit', 1.7);
  const t = interpolate(f, [aSakit, aSakit + 60], [0.05, 0.85], clamp);
  return (
    <Camera dur={p.dur} to={1.05} panY={-10}>
      <NightSky seed={67} glow={C.labelPink} />
      <div style={{position: 'absolute', left: 560, top: 520}}>
        <UrinaryTract w={460} stone={t} pain glowKidney={f >= aSakit} />
      </div>
      <ChipList
        top={560}
        gap={150}
        w={500}
        left={40}
        size={38}
        items={[
          {icon: <KIcon name="bolt" size={74} />, text: 'Sakit pinggang berombak → perut bawah', a: aSakit, bg: RED},
          {icon: <KIcon name="cup" size={74} />, text: 'Kencing berdarah', a: at(p, 'kencing', 4.5)},
          {icon: <KIcon name="vomit" size={74} f={f} />, text: 'Loya & muntah', a: at(p, 'loya', 5.6)},
        ]}
      />
    </Camera>
  );
};

/* ================= 8 — #3 Tanda bahaya → kecemasan ================= */
export const B3: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKec = at(p, 'kecemasan', 7.9);
  return (
    <Camera dur={p.dur} to={1.05} panY={-10}>
      <NightSky seed={71} glow={RED} />
      <Glow x={540} y={900} r={520} color={RED} opacity={0.18 + 0.08 * Math.sin(f / 4)} />
      <ChipList
        top={540}
        gap={140}
        w={860}
        size={40}
        items={[
          {icon: <KIcon name="thermo" size={74} f={f} />, text: 'Demam / menggigil + sakit pinggang', a: at(p, 'demam', 1.7), bg: RED},
          {icon: <KIcon name="nopee" size={74} />, text: 'Tak boleh kencing', a: at(p, 'tak boleh', 4.2), bg: RED},
          {icon: <KIcon name="pill" size={74} />, text: 'Sakit tak reda dengan ubat', a: at(p, 'reda', 5.5), bg: RED},
        ]}
      />
      <Pop at={aKec} style={{left: 0, width: 1080, top: 960, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, background: '#fff', padding: '16px 40px 16px 18px', borderRadius: 50, boxShadow: '0 20px 50px rgba(18,11,51,.5)'}}>
          <KIcon name="hospital" size={120} />
          <div>
            <Txt size={50} color={RED}>UNIT KECEMASAN</Txt>
            <Txt size={40} color={C.navy}>Segera!</Txt>
          </div>
        </div>
      </Pop>
      {f >= aKec ? <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, border: `24px solid ${RED}`, opacity: Math.abs(Math.sin(f / 5)) * 0.7}} /> : null}
    </Camera>
  );
};

/* ================= 9 — #4 Rawatan ikut saiz ================= */
export const B4: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKecil = at(p, 'kecil', 0.8);
  const aKeluar = at(p, 'keluar', 3.5);
  const aUbat = at(p, 'ubat', 4.4);
  const aBesar = at(p, 'besar', 5.8);
  const aPecah = at(p, 'dipecahkan', 6.9);
  const aPakar = at(p, 'pakar', 9.0);
  const drop = interpolate(f, [aKeluar, aKeluar + 30], [0, 1], clamp);
  const broken = f >= aPecah + 8;
  return (
    <Camera dur={p.dur} to={1.05} panY={-10}>
      <NightSky seed={73} glow={C.green} />
      {/* batu kecil */}
      <Pop at={aKecil} style={{left: 50, top: 500}}>
        <div style={{width: 470, height: 760, borderRadius: 44, background: C.navy, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30, gap: 14, overflow: 'hidden', position: 'relative'}}>
          <Txt size={46} color={C.yellow}>Batu kecil</Txt>
          <Pill text="< 5 mm" bg={C.green} size={40} />
          <div style={{position: 'absolute', left: 205, top: 270 + drop * 300}}><KIcon name="stone" size={60} /></div>
          <div style={{position: 'absolute', left: 230, top: 260, width: 12, height: 340, borderRadius: 6, background: '#E7A6B3', opacity: 0.4}} />
          {f >= aKeluar ? <div style={{position: 'absolute', bottom: 120}}><Pill text="Keluar sendiri ✓" bg={C.green} size={36} /></div> : null}
          {f >= aUbat ? <div style={{position: 'absolute', bottom: 30, display: 'flex', alignItems: 'center', gap: 8}}><KIcon name="pill" size={60} /><Txt size={32}>ubat tahan sakit</Txt></div> : null}
        </div>
      </Pop>
      {/* batu besar */}
      <Pop at={aBesar} style={{left: 560, top: 500}}>
        <div style={{width: 470, height: 760, borderRadius: 44, background: C.violet[0], display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 30, gap: 14, position: 'relative'}}>
          <Txt size={46} color={C.yellow}>Batu besar</Txt>
          <div style={{position: 'relative', height: 300, width: 300, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {broken
              ? [0, 1, 2, 3].map((i) => (
                  <div key={i} style={{position: 'absolute', left: 100 + Math.cos(i * 1.6) * 80, top: 100 + Math.sin(i * 1.6) * 80}}><KIcon name="stone" size={80} /></div>
                ))
              : <KIcon name="stone" size={240} f={f} />}
            {f >= aPecah && !broken ? <div style={{position: 'absolute', left: 170, top: -10}}><KIcon name="hammer" size={150} f={f} /></div> : null}
          </div>
          {f >= aPecah ? <Pill text="Dipecahkan / dikeluarkan" bg={ORANGE} size={32} /> : null}
          {f >= aPakar ? <div style={{position: 'absolute', bottom: 40}}><Pill text="Pakar urologi" bg={C.labelPink} size={38} /></div> : null}
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 10 — #5 Pencegahan ================= */
export const B5: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aMinum = at(p, 'minum', 1.7);
  const aJernih = at(p, 'jernih', 3.1);
  const aLiter = at(p, 'dua setengah', 4.2);
  const clear = interpolate(f, [aMinum, aJernih + 8], [0, 1], clamp);
  const urine = (k: number) => `hsl(${45 - k * 5}, ${85 - k * 18}%, ${42 + k * 12}%)`;
  return (
    <Camera dur={p.dur} to={1.05} panY={-10}>
      <NightSky seed={79} glow={'#6FC3F2'} />
      <div style={{position: 'absolute', left: 70, top: 500}}>
        <KIcon name="bottle" size={360} f={Math.max(0, f - aMinum)} />
      </div>
      <div style={{position: 'absolute', left: 470, top: 540, display: 'flex', gap: 14}}>
        {[0, 1, 2, 3].map((k) => (
          <div key={k} style={{width: 110, height: 200, borderRadius: '10px 10px 40px 40px', background: urine(k), opacity: f >= aMinum ? 1 : 0.3, border: clear * 3 >= k && clear * 3 < k + 1 ? `8px solid ${C.yellow}` : '8px solid transparent'}} />
        ))}
      </div>
      <Pop at={aJernih} style={{left: 520, top: 790}}>
        <Pill text="Sasaran: kencing jernih ✓" bg={C.green} size={38} />
      </Pop>
      <Pop at={aLiter} style={{left: 470, top: 870}}>
        <Txt size={96} color={C.yellow} style={{textShadow: '0 8px 0 rgba(18,11,51,.6)'}}>2.5–3 L</Txt>
        <Txt size={40}>sehari</Txt>
      </Pop>
      {[
        {k: 'salt' as const, t: 'Garam', a: at(p, 'garam', 6.9), x: 60},
        {k: 'meat' as const, t: 'Daging merah', a: at(p, 'daging', 7.5), x: 400},
        {k: 'soda' as const, t: 'Minuman manis', a: at(p, 'minuman', 8.4), x: 740},
      ].map((c) => (
        <Pop key={c.t} at={c.a} style={{left: c.x, top: 1090}}>
          <div style={{width: 290, height: 260, borderRadius: 40, background: C.navy, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6}}>
            <KIcon name={c.k} size={130} f={f} />
            <Txt size={32} style={{textAlign: 'center'}}>{`${c.t} ↓`}</Txt>
          </div>
        </Pop>
      ))}
    </Camera>
  );
};

/* ================= 11 — Danial pulih ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKeluar = at(p, 'keluar', 1.9);
  const aBotol = at(p, 'botol', 3.6);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, #7FC4F2 0%, #F6D9A8 100%)`}} />
      <Glow x={540} y={1050} r={560} color={C.yellow} opacity={0.35} />
      <TopShade />
      <Pop at={1} style={{left: 60, top: 520}}>
        <Pill text="3 hari kemudian…" bg={C.navy} color={C.yellow} size={46} />
      </Pop>
      <Pop at={aKeluar} style={{left: 60, top: 640}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, background: C.green, padding: '8px 28px 8px 10px', borderRadius: 40}}>
          <Tick bg="#1F8A7E" size={56} />
          <Txt size={44}>Batu keluar sendiri</Txt>
        </div>
      </Pop>
      <Confetti a={aKeluar} y={980} />
      <Who preset={DANIAL} x={200} y={900} w={500} mood="happy" pose={f >= aKeluar ? 'wave' : 'down'} seed={1} />
      <Pop at={aBotol} style={{left: 700, top: 1000}}>
        <KIcon name="bottle" size={300} f={60} />
      </Pop>
    </Camera>
  );
};

/* ================= 12 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return <Closing p={p} firstWord="kalau" question="Sakit pinggang yang luar biasa?" qIcon={<KIcon name="bolt" size={70} f={f} />} action="Dapatkan rawatan" actionWord="dapatkan" />;
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro,
  danial: Danial,
  sakit: Sakit,
  klinik: Klinik,
  diagnosis: Diagnosis,
  lima: Lima,
  b1: B1,
  b2: B2,
  b3: B3,
  b4: B4,
  b5: B5,
  pulih: Pulih,
  penutup: Penutup,
};
