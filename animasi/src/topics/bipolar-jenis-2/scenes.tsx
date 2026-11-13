import React from 'react';
import {AbsoluteFill, Easing, interpolate, random, useCurrentFrame} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset, Mood, Pose} from '../../components/Avatar';
import {Camera, clamp, Glow, NightSky, Pill, Pop} from '../../components/common';
import {WordsFile, wordTime} from '../../lib/timeline';
import {Icon} from '../kenali-bipolar/scenes';
import {HIcon} from '../hipoglisemia/scenes';

export type SceneProps = {preset: AvatarPreset; dur: number; wf: WordsFile; start: number; fps: number};

/* ---------- watak cerita (rekaan, khas topik ini) ---------- */
export const HAKIM: AvatarPreset = {
  id: 'hakim', skin: '#C99772', skinShade: '#AD7B55', hair: 'short', hairColor: '#231B28', top: 'hoodie', topColor: '#5C6BC0', topShade: '#45529E',
  accessory: null, stubble: true,
};
export const ISTERI: AvatarPreset = {
  id: 'isteri-hakim', skin: '#D9A47C', skinShade: '#BE8860', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#E4629F', topShade: '#C24A82',
  hijabColor: '#2BB3A3', hijabShade: '#1F8A7E', accessory: null,
};

const HIGH = '#F6C945';
const LOW = '#4F8FE0';
const NORM = '#3FBF7F';
const RED = '#D9485F';
const BLUE_BG = ['#0E1B3D', '#1B2E5E'];

const at = (p: SceneProps, phrase: string, fallbackSec: number) => {
  const t = wordTime(p.wf, phrase, p.start, p.start + fallbackSec);
  return Math.max(0, Math.round((t - p.start) * p.fps));
};

const Txt: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 44, color = '#fff', style}) => (
  <div style={{fontFamily: FONT, fontWeight: 800, fontSize: size, color, lineHeight: 1.12, ...style}}>{children}</div>
);

const Who: React.FC<{preset: AvatarPreset; x: number; y: number; w: number; style?: React.CSSProperties; mood?: Mood; pose?: Pose; seed?: number}> = ({preset, x, y, w, style, ...rest}) => (
  <div style={{position: 'absolute', left: x, top: y, ...style}}>
    <Avatar preset={preset} width={w} {...rest} />
  </div>
);

const Bubble: React.FC<{children: React.ReactNode; bg?: string; color?: string; size?: number}> = ({children, bg = '#fff', color = C.navy, size = 46}) => (
  <div style={{background: bg, color, borderRadius: 40, padding: `${size * 0.45}px ${size * 0.7}px`, fontFamily: FONT, fontWeight: 800, fontSize: size, lineHeight: 1.12, boxShadow: '0 14px 34px rgba(18,11,51,.45)', whiteSpace: 'nowrap'}}>
    {children}
  </div>
);

const Cross: React.FC<{f: number; size?: number}> = ({f, size = 220}) => {
  const p = interpolate(f, [0, 8], [0, 1], clamp);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
      <path d="M 14 14 L 86 86" stroke={C.labelPink} strokeWidth={12} strokeLinecap="round" strokeDasharray={102} strokeDashoffset={102 * (1 - Math.min(1, p * 2))} />
      <path d="M 86 14 L 14 86" stroke={C.labelPink} strokeWidth={12} strokeLinecap="round" strokeDasharray={102} strokeDashoffset={102 * (1 - Math.max(0, p * 2 - 1))} />
    </svg>
  );
};

/* ---------- bateri dengan paras ---------- */
const Battery: React.FC<{level: number; size?: number}> = ({level, size = 120}) => {
  const col = level > 0.6 ? NORM : level > 0.3 ? HIGH : RED;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <rect x={8} y={34} width={96} height={52} rx={10} fill="rgba(255,255,255,0.1)" stroke="#fff" strokeWidth={7} />
      <rect x={104} y={50} width={10} height={20} rx={3} fill="#fff" />
      <rect x={18} y={44} width={Math.max(4, 76 * level)} height={32} rx={5} fill={col} />
    </svg>
  );
};

/* ---------- graf mood: zon hipomania / normal / kemurungan ---------- */
type GPoint = [number, number]; // [x 0..1, mood -1..1]
const MoodGraph: React.FC<{points: GPoint[]; progress: number; w?: number; h?: number; labels?: {hipo?: number; norm?: number; low?: number}; maniaPeak?: boolean; title?: string}> = ({points, progress, w = 960, h = 520, labels = {}, maniaPeak, title}) => {
  const f = useCurrentFrame();
  const pad = 30;
  const yOf = (m: number) => h / 2 - m * (h / 2 - pad);
  const xOf = (x: number) => pad + x * (w - pad * 2);
  // lengkung licin (Catmull-Rom → Bezier)
  const P = points.map(([x, m]) => [xOf(x), yOf(m)] as [number, number]);
  let d = `M ${P[0][0]} ${P[0][1]}`;
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(P.length - 1, i + 2)];
    d += ` C ${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`;
  }
  const L = 4000;
  const op = (a?: number) => (a === undefined ? 0 : interpolate(f - a, [0, 8], [0, 1], clamp));
  const band = (y0: number, y1: number, col: string, o: number) => <rect x={0} y={yOf(y0)} width={w} height={yOf(y1) - yOf(y0)} fill={col} opacity={o} />;
  return (
    <div style={{width: w, background: 'rgba(18,11,51,0.72)', borderRadius: 40, padding: '22px 0', boxShadow: '0 20px 50px rgba(18,11,51,.5)'}}>
      {title ? <Txt size={36} color={C.violet[4]} style={{textAlign: 'center', marginBottom: 10}}>{title}</Txt> : null}
      <svg width={w} height={h} style={{overflow: 'visible', display: 'block'}}>
        {band(1, 0.35, HIGH, 0.16)}
        {band(0.35, -0.35, NORM, 0.14)}
        {band(-0.35, -1, LOW, 0.18)}
        {maniaPeak ? band(1.25, 1, RED, 0.18) : null}
        <path d={`M ${pad} ${yOf(0)} L ${w - pad} ${yOf(0)}`} stroke="#fff" strokeWidth={2} strokeDasharray="8 10" opacity={0.35} />
        <path d={d} stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * (1 - progress)} opacity={0.25} transform="translate(0 6)" />
        <path d={d} stroke={C.labelPink} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={L} strokeDashoffset={L * (1 - progress)} />
        <text x={w - pad - 6} y={yOf(0.72)} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={34} fill={HIGH} opacity={op(labels.hipo)}>HIPOMANIA ▲</text>
        <text x={w - pad - 6} y={yOf(0.05)} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={30} fill={NORM} opacity={op(labels.norm)}>NORMAL</text>
        <text x={w - pad - 6} y={yOf(-0.82)} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={34} fill={LOW} opacity={op(labels.low)}>KEMURUNGAN ▼</text>
      </svg>
    </div>
  );
};

/* pola Hakim: lama di bawah, sekejap di atas */
const HAKIM_PATTERN: GPoint[] = [
  [0, -0.1], [0.08, -0.7], [0.2, -0.75], [0.28, -0.6], [0.34, 0.75], [0.4, 0.7], [0.46, -0.65], [0.6, -0.8], [0.7, -0.6], [0.76, 0.72], [0.81, 0.68], [0.87, -0.6], [1, -0.72],
];

/* chip ikon + teks */
type AnyIcon = {b?: React.ComponentProps<typeof Icon>['name']; h?: React.ComponentProps<typeof HIcon>['name']; battery?: number};
const Chip: React.FC<{icon: AnyIcon; text: React.ReactNode; bg?: string; color?: string; w?: number; f?: number; size?: number}> = ({icon, text, bg = C.navy, color = '#fff', w = 520, f = 0, size = 42}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 20, width: w, background: bg, borderRadius: 34, padding: '14px 26px 14px 16px', boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
    <div style={{width: 92, height: 92, borderRadius: 26, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
      {icon.b ? <Icon name={icon.b} size={76} f={f} /> : icon.h ? <HIcon name={icon.h} size={76} f={f} /> : icon.battery !== undefined ? <Battery level={icon.battery} size={76} /> : null}
    </div>
    <Txt size={size} color={color}>{text}</Txt>
  </div>
);

const Check: React.FC<{no?: boolean}> = ({no}) => (
  <div style={{width: 48, height: 48, borderRadius: 14, background: no ? RED : NORM, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
    {no ? (
      <Txt size={36}>✕</Txt>
    ) : (
      <svg width={32} height={32} viewBox="0 0 30 30"><path d="M 5 16 L 12 23 L 25 8" stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
    )}
  </div>
);

/* baris hari (kotak kalendar kecil) */
const DayRow: React.FC<{n: number; filled: number; col: string; label: string; perRow?: number}> = ({n, filled, col, label, perRow = 7}) => (
  <div style={{background: '#fff', borderRadius: 30, padding: '18px 24px', boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
    <Txt size={40} color={C.navy} style={{marginBottom: 12}}>{label}</Txt>
    <div style={{display: 'grid', gridTemplateColumns: `repeat(${perRow}, 74px)`, gap: 10}}>
      {new Array(n).fill(0).map((_, i) => (
        <div key={i} style={{width: 74, height: 64, borderRadius: 14, background: i < filled ? col : '#EEEAF7', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Txt size={30} color={i < filled ? '#fff' : '#B8B2CC'}>{i + 1}</Txt>
        </div>
      ))}
    </div>
  </div>
);

/* ================= 0 — Hook: 3 tahun makan ubat kemurungan… bukan kemurungan biasa ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTah = at(p, 'tahun', 0.3);
  const aUbat = at(p, 'ubat', 1.36);
  const aSem = at(p, 'sembuh', 3.64);
  const aBuk = at(p, 'bukan', 6.0);
  const years = ['2023', '2024', '2025'];
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${BLUE_BG[0]} 0%, ${BLUE_BG[1]} 100%)`}} />
      <NightSky seed={81} glow={f >= aBuk ? C.labelPink : LOW} top="transparent" bottom="transparent" />
      <Pop at={aTah - 4} style={{left: 0, width: 1080, top: 570, display: 'flex', justifyContent: 'center'}}>
        <Pill text="3 TAHUN" bg={C.navy} color={C.yellow} size={64} />
      </Pop>
      {years.map((y, i) => (
        <Pop key={y} at={aUbat + i * 6} style={{left: 130 + i * 290, top: 710}}>
          <div style={{width: 240, borderRadius: 30, background: '#fff', padding: '14px 0', textAlign: 'center', boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
            <Txt size={34} color={C.labelPink}>{y}</Txt>
            <div style={{display: 'flex', justifyContent: 'center'}}><HIcon name="pill" size={110} /></div>
          </div>
        </Pop>
      ))}
      <Who preset={HAKIM} x={290} y={990} w={500} mood={f >= aBuk ? 'curious' : 'sad'} pose={f >= aBuk ? 'chin' : 'down'} seed={1} />
      <Pop at={aSem} style={{left: 640, top: 1040}}>
        <Bubble size={40} bg={LOW} color="#fff">Tak sembuh…</Bubble>
      </Pop>
      <Pop at={aBuk} style={{left: 0, width: 1080, top: 1610, display: 'flex', justifyContent: 'center'}}>
        <div style={{background: C.labelPink, borderRadius: 40, padding: '14px 40px', boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
          <Txt size={58} style={{textAlign: 'center'}}>BUKAN kemurungan biasa?</Txt>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Berbulan-bulan murung ================= */
export const Murung: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aBer = at(p, 'berbulan-bulan', 2.2);
  const aBan = at(p, 'bangun', 3.7);
  const sym: {icon: AnyIcon; text: string; a: number}[] = [
    {icon: {b: 'bed'}, text: 'Susah bangun pagi', a: aBan},
    {icon: {b: 'heartbreak'}, text: 'Hilang minat', a: at(p, 'hilang', 4.6)},
    {icon: {battery: 0.12}, text: 'Letih', a: at(p, 'letih', 5.7)},
    {icon: {b: 'down'}, text: 'Rasa tak berguna', a: at(p, 'berguna', 7.1)},
  ];
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${BLUE_BG[0]} 0%, ${BLUE_BG[1]} 100%)`}} />
      {/* hujan */}
      {new Array(28).fill(0).map((_, i) => {
        const x = random(`rx${i}`) * 1080;
        const y = ((f * 14 + random(`ry${i}`) * 1920) % 1920);
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: 4, height: 40, borderRadius: 2, background: '#8FB3E8', opacity: 0.35}} />;
      })}
      <Pop at={4} style={{left: 60, top: 500}} origin="left center">
        <Pill text="Hakim, 29 tahun" bg={C.navy} color={C.yellow} size={50} />
      </Pop>
      <Pop at={aBer} style={{left: 60, top: 620}} origin="left center">
        <Pill text="Berbulan-bulan…" bg={LOW} size={44} />
      </Pop>
      {/* katil */}
      <div style={{position: 'absolute', left: 20, top: 1380, width: 580, height: 130, borderRadius: 30, background: '#2C3E75'}} />
      <div style={{position: 'absolute', left: 30, top: 1320, width: 190, height: 80, borderRadius: 30, background: '#DDE6F7'}} />
      <Who preset={HAKIM} x={60} y={900} w={460} mood="sad" pose="down" seed={1} />
      <div style={{position: 'absolute', left: 30, top: 1420, width: 560, height: 160, borderRadius: '60px 60px 24px 24px', background: '#3F5FA8'}} />
      {sym.map((s, i) => (
        <Pop key={s.text} at={s.a} style={{left: 540, top: 760 + i * 150}}>
          <Chip icon={s.icon} text={s.text} w={500} f={f - s.a} bg={i % 2 ? '#2C3E75' : C.navy} size={38} />
        </Pop>
      ))}
    </Camera>
  );
};

/* ================= 2 — Beberapa hari jadi orang lain (hipomania) ================= */
export const Tinggi: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aLain = at(p, 'lain', 2.5);
  const aTid = at(p, 'tidur', 3.1);
  const aSiap = at(p, 'siapkan', 4.7);
  const aCak = at(p, 'cakap', 6.6);
  const aIdea = at(p, 'idea', 7.7);
  const aWah = at(p, 'wah', 9.8);
  const bright = interpolate(f, [aLain - 10, aLain + 10], [0, 1], clamp);
  const bounce = Math.abs(Math.sin(f / 5)) * 14 * bright;
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${BLUE_BG[0]} 0%, ${BLUE_BG[1]} 100%)`}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.violet[0]} 0%, ${C.pink[0]} 55%, #F6C26B 100%)`, opacity: bright}} />
      <Glow x={330} y={1100} r={500} color={HIGH} opacity={0.35 * bright} />
      <Pop at={aLain - 4} style={{left: 60, top: 500}} origin="left center">
        <Pill text="Beberapa hari… jadi orang lain" bg={HIGH} color={C.navy} size={44} />
      </Pop>
      <Who preset={HAKIM} x={40} y={880 - bounce} w={480} mood="happy" pose={f >= aCak ? 'point' : 'wave'} seed={1} />
      <Pop at={aTid} style={{left: 560, top: 680}}>
        <Chip icon={{b: 'moon'}} text="Tidur 4 jam pun cukup" w={480} size={36} bg={C.navy} f={f - aTid} />
      </Pop>
      <Pop at={aSiap} style={{left: 560, top: 830}}>
        <Chip icon={{h: 'check'}} text="Semua kerja siap dalam 1 malam" w={480} size={32} bg={C.violet[1]} f={f - aSiap} />
      </Pop>
      <Pop at={aCak} style={{left: 560, top: 980}}>
        <Chip icon={{b: 'speech'}} text="Cakap laju" w={480} size={40} bg={C.navy} f={f - aCak} />
      </Pop>
      {/* idea meletup */}
      {f >= aIdea
        ? new Array(6).fill(0).map((_, i) => {
            const t = (f - aIdea - i * 4) / 30;
            if (t < 0) return null;
            const ang = -Math.PI / 2 + (i - 2.5) * 0.45;
            const d = 120 + Math.min(1, t) * 160;
            return (
              <div key={i} style={{position: 'absolute', left: 250 + Math.cos(ang) * d, top: 860 + Math.sin(ang) * d, transform: `scale(${Math.min(1, t * 3)})`}}>
                <Icon name="bulb" size={90} f={f} />
              </div>
            );
          })
        : null}
      <Pop at={aWah - 2} style={{left: 160, top: 1330}}>
        <Bubble size={50}>"Wah, Hakim dah okay!"</Bubble>
      </Pop>
      <Pop at={aTid} style={{left: 420, top: 760}}>
        <Battery level={1} size={130} />
      </Pop>
    </Camera>
  );
};

/* ================= 3 — Jatuh semula; isteri nampak corak → pakar psikiatri ================= */
export const Jatuh: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aJat = at(p, 'jatuh', 1.4);
  const aIst = at(p, 'isterinya', 3.4);
  const aCor = at(p, 'corak', 4.3);
  const aPak = at(p, 'pakar', 6.1);
  const prog = interpolate(f, [0, aCor + 10], [0.3, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return (
    <Camera dur={p.dur} to={1.06} panY={-10}>
      <NightSky seed={83} glow={LOW} />
      <Pop at={2} style={{left: 60, top: 480}}>
        <MoodGraph points={HAKIM_PATTERN} progress={prog} w={960} h={460} labels={{hipo: aCor, low: aJat}} title="Mood Hakim" />
      </Pop>
      {f >= aCor
        ? [0.37, 0.785].map((x, i) => (
            <div key={i} style={{position: 'absolute', left: 60 + 30 + x * 900 - 60, top: 480 + 70 + 40, width: 120, height: 120, borderRadius: 60, border: `6px solid ${HIGH}`, opacity: interpolate(f - aCor - i * 6, [0, 8], [0, 1], clamp), transform: `scale(${1 + 0.06 * Math.sin(f / 5)})`}} />
          ))
        : null}
      <Pop at={aJat} style={{left: 60, top: 1080}} origin="left center">
        <Pill text="Jatuh semula ke lembah murung" bg={LOW} size={42} />
      </Pop>
      <Who preset={HAKIM} x={30} y={1230} w={380} mood="sad" pose="down" seed={1} />
      <Pop at={aIst} style={{left: 420, top: 1220}}>
        <Avatar preset={ISTERI} width={360} mood="curious" pose="point" seed={4} />
      </Pop>
      <Pop at={aCor} style={{left: 640, top: 1180}}>
        <Bubble size={36}>"Ada coraknya…"</Bubble>
      </Pop>
      <Pop at={aPak} style={{left: 0, width: 1080, top: 1700, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, background: '#fff', padding: '10px 32px 10px 14px', borderRadius: 30, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <Icon name="chat" size={70} />
          <Txt size={46} color={C.navy}>Pakar psikiatri</Txt>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 4 — Diagnosis: Bipolar Jenis 2 ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTer = at(p, 'terlalu', 1.7);
  const aDiag = at(p, 'diagnosisnya', 3.6);
  const aBai = at(p, 'bai-po-la', 4.7);
  const stamp = f >= aBai - 2 ? interpolate(f - aBai + 2, [0, 6, 10], [1.8, 0.94, 1], clamp) : 0;
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[3]} 0%, ${C.violet[2]} 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={f >= aBai ? HIGH : C.labelPink} opacity={0.3} />
      <Who preset={p.preset} x={-10} y={760} w={480} mood="curious" pose="point" />
      <Who preset={HAKIM} x={640} y={900} w={400} mood={f >= aDiag ? 'curious' : 'neutral'} pose="clasp" seed={1} />
      <Pop at={aTer - 6} style={{left: 60, top: 500}}>
        <Bubble size={42}>Hari-hari "terlalu bertenaga"?</Bubble>
      </Pop>
      <Pop at={aTer + 4} style={{left: 760, top: 660}}>
        <Battery level={1} size={140} />
      </Pop>
      {stamp > 0 ? (
        <div style={{position: 'absolute', left: 0, width: 1080, top: 1250, display: 'flex', justifyContent: 'center'}}>
          <div style={{transform: `scale(${stamp}) rotate(-5deg)`, border: `10px solid ${HIGH}`, borderRadius: 30, padding: '12px 40px', background: 'rgba(18,11,51,0.9)', textAlign: 'center'}}>
            <Txt size={96} color={HIGH} style={{letterSpacing: 3}}>BIPOLAR</Txt>
            <Txt size={52} color="#fff">Mood Disorder · JENIS 2</Txt>
          </div>
        </div>
      ) : null}
    </Camera>
  );
};

/* ================= 5 — #1 Apa itu: hipomania + kemurungan; lebih ringan daripada mania ================= */
export const Apa: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aHipo = at(p, 'hipomania', 4.2);
  const aKem = at(p, 'kemurungan', 5.7);
  const aRin = at(p, 'ringan', 7.5);
  const aMan = at(p, 'mania dalam', 8.4);
  const prog = interpolate(f, [aHipo - 20, aKem + 20], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const bar = (h: number, col: string, label: string, sub: string, a: number) => {
    const g = interpolate(f, [a, a + 16], [0, 1], {...clamp, easing: Easing.out(Easing.back(1.4))});
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: 380}}>
        <div style={{height: 300, display: 'flex', alignItems: 'flex-end'}}>
          <div style={{width: 150, height: h * g, borderRadius: '24px 24px 8px 8px', background: col, boxShadow: '0 10px 24px rgba(18,11,51,.4)'}} />
        </div>
        <Txt size={40} color={col} style={{marginTop: 12}}>{label}</Txt>
        <Txt size={30} color={C.violet[4]}>{sub}</Txt>
      </div>
    );
  };
  return (
    <Camera dur={p.dur} to={1.05} panY={-10}>
      <NightSky seed={85} glow={C.violet[2]} />
      <Pop at={2} style={{left: 60, top: 470}}>
        <MoodGraph points={[[0, 0], [0.18, 0.72], [0.32, 0.6], [0.45, -0.1], [0.6, -0.78], [0.82, -0.72], [1, -0.05]]} progress={prog} w={960} h={380} labels={{hipo: aHipo, low: aKem}} />
      </Pop>
      {f >= aRin ? (
        <div style={{position: 'absolute', left: 140, top: 970, display: 'flex', gap: 40}}>
          {bar(150, HIGH, 'Hipomania', 'Jenis 2', aRin)}
          {bar(290, RED, 'Mania', 'Jenis 1', aMan)}
        </div>
      ) : null}
      <Pop at={aRin + 6} style={{left: 0, width: 1080, top: 1540, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Hipomania = lebih ringan daripada mania" bg={C.navy} color={C.yellow} size={40} />
      </Pop>
    </Camera>
  );
};

/* ================= 6 — #2 Hipomania: tanda + ≥ 4 hari + nampak produktif ================= */
export const Hipo: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const sym: {icon: AnyIcon; text: string; a: number; bg: string}[] = [
    {icon: {b: 'crown'}, text: 'Mood naik / mudah marah', a: at(p, 'mood', 1.8), bg: C.navy},
    {icon: {battery: 1}, text: 'Tenaga berlebihan', a: at(p, 'tenaga', 3.7), bg: C.violet[1]},
    {icon: {b: 'moon'}, text: 'Kurang tidur, tak penat', a: at(p, 'kurang', 4.9), bg: C.navy},
    {icon: {b: 'speech'}, text: 'Cakap laju', a: at(p, 'cakap', 6.3), bg: C.violet[1]},
  ];
  const aSek = at(p, 'sekurang-kurangnya', 7.3);
  const aEmp = at(p, 'empat', 8.2);
  const aNam = at(p, 'nampak', 9.0);
  const aTer = at(p, 'terlepas', 11.3);
  const filled = Math.round(interpolate(f, [aEmp - 4, aEmp + 12], [0, 4], clamp));
  return (
    <Camera dur={p.dur} to={1.05} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, #5B3A7A 60%, #8A5A3A 100%)`}} />
      <Glow x={540} y={800} r={500} color={HIGH} opacity={0.18} />
      {sym.map((s, i) => (
        <Pop key={s.text} at={s.a} style={{left: 50, top: 480 + i * 140}} origin="left center">
          <Chip icon={s.icon} text={s.text} w={i === 0 || i === 2 ? 760 : 600} f={f - s.a} bg={s.bg} size={40} />
        </Pop>
      ))}
      <Pop at={aSek} style={{left: 50, top: 1060}} origin="left center">
        <DayRow n={7} filled={filled} col={HIGH} label="Sekurang-kurangnya 4 hari" />
      </Pop>
      <Pop at={aNam} style={{left: 0, width: 1080, top: 1530, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: '#fff', padding: '10px 32px 10px 14px', borderRadius: 40, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <Icon name="rocket" size={70} f={f} />
          <Txt size={42} color={C.navy}>{f >= aTer ? 'Nampak produktif → terlepas pandang' : 'Nampak macam produktif…'}</Txt>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 7 — #3 Kemurungan: tanda + ≥ 2 minggu + lebih lama ================= */
export const Kemurungan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const sym: {icon: AnyIcon; text: string; a: number}[] = [
    {icon: {b: 'sad'}, text: 'Sedih', a: at(p, 'sedih', 1.5)},
    {icon: {b: 'heartbreak'}, text: 'Hilang minat', a: at(p, 'hilang', 2.3)},
    {icon: {battery: 0.12}, text: 'Letih', a: at(p, 'letih', 3.3)},
    {icon: {b: 'down'}, text: 'Rasa tak berguna', a: at(p, 'berguna', 4.4)},
  ];
  const aSek = at(p, 'sekurang-kurangnya', 5.1);
  const aDua = at(p, 'dua minggu', 6.0);
  const aFasa = at(p, 'fasa', 6.9);
  const aLama = at(p, 'lama', 8.3);
  const aDis = at(p, 'disangka', 9.4);
  const filled = Math.round(interpolate(f, [aDua - 4, aDua + 14], [0, 14], clamp));
  const phaseB = f >= aFasa;
  const g = interpolate(f, [aLama - 6, aLama + 16], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <Camera dur={p.dur} to={1.05} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${BLUE_BG[0]} 0%, ${BLUE_BG[1]} 100%)`}} />
      {!phaseB ? (
        <>
          {sym.map((s, i) => (
            <Pop key={s.text} at={s.a} style={{left: 50 + (i % 2) * 500, top: 500 + Math.floor(i / 2) * 150}}>
              <Chip icon={s.icon} text={s.text} w={470} f={f - s.a} bg={i % 3 ? '#2C3E75' : C.navy} size={38} />
            </Pop>
          ))}
          <Pop at={aSek} style={{left: 50, top: 830}} origin="left center">
            <DayRow n={14} filled={filled} col={LOW} label="Sekurang-kurangnya 2 minggu" />
          </Pop>
        </>
      ) : (
        <>
          <Pop at={aFasa} style={{left: 0, width: 1080, top: 500, display: 'flex', justifyContent: 'center'}}>
            <Pill text="Fasa kemurungan biasanya lebih lama" bg={LOW} size={42} />
          </Pop>
          <div style={{position: 'absolute', left: 80, top: 680, width: 920}}>
            <Txt size={38} color={LOW}>Kemurungan</Txt>
            <div style={{height: 70, width: 900 * g, borderRadius: 20, background: LOW, marginTop: 8, marginBottom: 30}} />
            <Txt size={38} color={HIGH}>Hipomania</Txt>
            <div style={{height: 70, width: 220 * g, borderRadius: 20, background: HIGH, marginTop: 8}} />
          </div>
          <Pop at={aDis} style={{left: 80, top: 1060}} origin="left center">
            <div style={{position: 'relative', background: '#fff', borderRadius: 30, padding: '16px 30px', boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
              <Txt size={42} color={C.navy}>Disangka "kemurungan biasa"</Txt>
              <Txt size={36} color={C.labelPink}>…sampai bertahun-tahun</Txt>
            </div>
          </Pop>
        </>
      )}
    </Camera>
  );
};

/* ================= 8 — #4 Rawatan ================= */
export const Rawat: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const items: {icon: AnyIcon; text: string; a: number; no?: boolean; bg: string}[] = [
    {icon: {b: 'pill'}, text: 'Penstabil mood / antipsikotik', a: at(p, 'penstabil', 1.6), bg: C.navy},
    {icon: {b: 'chat'}, text: 'Terapi', a: at(p, 'terapi', 4.0), bg: C.violet[1]},
    {icon: {h: 'pill'}, text: 'Antidepresan SAHAJA', a: at(p, 'antidepresan', 4.8), no: true, bg: RED},
    {icon: {b: 'moon'}, text: 'Rutin tidur teratur', a: at(p, 'rutin', 7.0), bg: C.navy},
    {icon: {b: 'family'}, text: 'Sokongan keluarga', a: at(p, 'sokongan', 8.4), bg: C.violet[1]},
  ];
  return (
    <Camera dur={p.dur} to={1.05} panY={-10}>
      <NightSky seed={87} glow={NORM} />
      {items.map((it, i) => (
        <Pop key={it.text} at={it.a} style={{left: 40, top: 480 + i * 150}} origin="left center">
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <Check no={it.no} />
            <Chip icon={it.icon} text={it.text} w={i === 0 ? 900 : 700} f={f - it.a} bg={it.bg} size={i === 0 ? 38 : 42} />
          </div>
        </Pop>
      ))}
      <Who preset={p.preset} x={600} y={1500} w={400} mood="happy" pose="point" />
    </Camera>
  );
};

/* ================= 9 — Hakim stabil ================= */
export const Stabil: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSta = at(p, 'stabil', 1.85);
  const prog = interpolate(f, [0, aSta + 20], [0.15, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.violet[0]} 0%, ${C.pink[0]} 60%, #F6A86B 100%)`}} />
      <Glow x={540} y={1100} r={560} color={C.yellow} opacity={0.3} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: '#3F8A5A'}} />
      <Pop at={2} style={{left: 90, top: 470}}>
        <MoodGraph points={[[0, -0.6], [0.15, 0.5], [0.3, -0.3], [0.45, 0.15], [0.6, -0.08], [0.75, 0.05], [1, 0.02]]} progress={prog} w={900} h={300} labels={{norm: aSta}} />
      </Pop>
      {f >= aSta
        ? new Array(12).fill(0).map((_, i) => {
            const t = f - aSta;
            const ang = random(`bs${i}`) * Math.PI * 2;
            const d = interpolate(t, [0, 24], [0, 240 + random(`bd${i}`) * 140], clamp);
            return <div key={i} style={{position: 'absolute', left: 540 + Math.cos(ang) * d, top: 1080 + Math.sin(ang) * d, width: 20, height: 20, borderRadius: 10, background: i % 2 ? C.yellow : '#fff', opacity: interpolate(t, [0, 6, 24, 34], [0, 1, 1, 0], clamp)}} />;
          })
        : null}
      <Who preset={HAKIM} x={120} y={900} w={460} mood="happy" pose={f >= aSta ? 'wave' : 'clasp'} seed={1} />
      <Who preset={ISTERI} x={620} y={1060} w={340} mood="happy" pose="clasp" seed={4} />
      <Pop at={aSta} style={{left: 0, width: 1080, top: 860, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: NORM, padding: '10px 34px 10px 14px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <HIcon name="check" size={70} />
          <Txt size={50}>Stabil & nikmati hidup</Txt>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 10 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aBer = at(p, 'bertenaga', 2.6);
  const aBtu = at(p, 'beritahu', 3.4);
  const aHen = at(p, 'jangan henti', 4.8);
  const aTun = at(p, 'jangan tunggu', 6.4);
  const aSaya = at(p, 'saya doktor', 8.9);
  return (
    <Camera dur={p.dur} to={1.06} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 60%, ${C.pink[2]} 100%)`}} />
      <NightSky seed={89} glow={C.violet[3]} top="transparent" bottom="transparent" stars={50} />
      <Pop at={2} style={{left: 0, width: 1080, top: 480, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <Pill text="Pernah murung" bg={LOW} size={38} />
          {f >= aBer ? <Pill text="+ hari luar biasa bertenaga?" bg={HIGH} color={C.navy} size={34} /> : null}
        </div>
      </Pop>
      <Pop at={aBtu} style={{left: 60, top: 620}} origin="left center">
        <Chip icon={{b: 'chat'}} text="Beritahu doktor anda" w={600} bg={NORM} size={42} />
      </Pop>
      <Pop at={aHen} style={{left: 60, top: 770}} origin="left center">
        <Chip icon={{h: 'warn'}} text="Jangan henti ubat sendiri" w={700} bg={RED} size={42} />
      </Pop>
      <Pop at={aTun} style={{left: 60, top: 920}} origin="left center">
        <Pill text="Jangan tunggu" bg={C.labelPink} size={54} />
      </Pop>
      <Who preset={p.preset} x={480} y={1060} w={540} mood="happy" pose={f >= aSaya ? 'wave' : 'point'} />
      <Pop at={aSaya} style={{left: 90, top: 1440}}>
        <Pill text="Dr. Azren" bg={C.labelPink} size={58} />
      </Pop>
      <div style={{position: 'absolute', left: 0, top: 1720, width: 1080, textAlign: 'center', opacity: interpolate(f, [aSaya, aSaya + 10], [0, 1], clamp)}}>
        <Txt size={30} color="#fff" style={{textShadow: '0 3px 8px rgba(18,11,51,.8)'}}>Video ini untuk pendidikan, bukan diagnosis.</Txt>
      </div>
    </Camera>
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro,
  murung: Murung,
  tinggi: Tinggi,
  jatuh: Jatuh,
  diagnosis: Diagnosis,
  apa: Apa,
  hipo: Hipo,
  kemurungan: Kemurungan,
  rawat: Rawat,
  stabil: Stabil,
  penutup: Penutup,
};

export {MoodGraph, HAKIM_PATTERN, Battery};
