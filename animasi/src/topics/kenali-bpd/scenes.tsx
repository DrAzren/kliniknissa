import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame, Easing} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset, Mood, Pose} from '../../components/Avatar';
import {Camera, clamp, Glow, NightSky, Pill, Pop, popScale, popOpacity} from '../../components/common';
import {WordsFile, wordTime} from '../../lib/timeline';
import {Icon} from '../kenali-bipolar/scenes';

export type SceneProps = {preset: AvatarPreset; dur: number; wf: WordsFile; start: number; fps: number};

/* ---------- watak cerita (rekaan; khas topik ini) ---------- */
export const SOFEA: AvatarPreset = {
  id: 'sofea', skin: '#E8B590', skinShade: '#CC956F', hair: 'hijab', hairColor: '#2A1C24', top: 'hoodie', topColor: '#F49A7A', topShade: '#D47657',
  hijabColor: '#F4E4C9', hijabShade: '#D8C29E', accessory: null,
};
export const DANIAL: AvatarPreset = {
  id: 'danial', skin: '#C98F68', skinShade: '#AE7652', hair: 'short', hairColor: '#1F1A24', top: 'kemeja', topColor: '#2BB3A3', topShade: '#1F8A7E',
  accessory: null,
};
export const KAKAK: AvatarPreset = {
  id: 'kakak', skin: '#D9A27C', skinShade: '#BD855F', hair: 'hijab', hairColor: '#2A1C24', top: 'blouse', topColor: '#6157C5', topShade: '#4B3C9B',
  hijabColor: '#7FC8F8', hijabShade: '#5AA5D8', accessory: null,
};
const KAWAN1: AvatarPreset = {
  id: 'kawan1', skin: '#C58A60', skinShade: '#A9714B', hair: 'hijab', hairColor: '#2A1C24', top: 'blouse', topColor: '#F6C945', topShade: '#D9A92C',
  hijabColor: '#E4629F', hijabShade: '#C04480', accessory: null,
};
const KAWAN2: AvatarPreset = {
  id: 'kawan2', skin: '#E3AF88', skinShade: '#C99069', hair: 'short', hairColor: '#24202B', top: 'hoodie', topColor: '#4F79C7', topShade: '#3A5EA3',
  accessory: 'glasses-round',
};

// frame (relatif babak) bagi perkataan pertama frasa, selepas permulaan babak
const at = (p: SceneProps, phrase: string, fallbackSec: number) => {
  const t = wordTime(p.wf, phrase, p.start, p.start + fallbackSec);
  return Math.max(0, Math.round((t - p.start) * p.fps));
};

const Txt: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 44, color = '#fff', style}) => (
  <div style={{fontFamily: FONT, fontWeight: 800, fontSize: size, color, lineHeight: 1.12, ...style}}>{children}</div>
);

const Who: React.FC<{preset: AvatarPreset; x: number; y: number; w: number; mood?: Mood; pose?: Pose; anger?: number; seed?: number; silhouette?: boolean; style?: React.CSSProperties}> = ({preset, x, y, w, style, ...rest}) => (
  <div style={{position: 'absolute', left: x, top: y, ...style}}>
    <Avatar preset={preset} width={w} {...rest} />
  </div>
);

const Bubble: React.FC<{children: React.ReactNode; tail?: 'left' | 'right'; bg?: string; color?: string; size?: number}> = ({children, tail = 'left', bg = '#fff', color = C.navy, size = 46}) => (
  <div style={{position: 'relative', background: bg, color, borderRadius: 40, padding: `${size * 0.45}px ${size * 0.7}px`, fontFamily: FONT, fontWeight: 800, fontSize: size, lineHeight: 1.12, boxShadow: '0 14px 34px rgba(18,11,51,.45)', whiteSpace: 'nowrap'}}>
    {children}
    <div style={{position: 'absolute', bottom: -26, [tail === 'left' ? 'left' : 'right']: 60, width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: `30px solid ${bg}`}} />
  </div>
);

/* awan fikiran */
const Thought: React.FC<{children: React.ReactNode; w?: number}> = ({children, w = 520}) => (
  <div style={{position: 'relative'}}>
    <div style={{width: w, background: '#fff', borderRadius: 90, padding: '30px 40px', textAlign: 'center', boxShadow: '0 14px 34px rgba(18,11,51,.4)'}}>{children}</div>
    <div style={{position: 'absolute', right: 90, bottom: -50, width: 44, height: 44, borderRadius: 22, background: '#fff'}} />
    <div style={{position: 'absolute', right: 60, bottom: -96, width: 26, height: 26, borderRadius: 13, background: '#fff'}} />
  </div>
);

/* ---------- ikon flat khas BPD ---------- */
type BIcon = 'heart' | 'broken' | 'car' | 'bandage' | 'dna' | 'brain' | 'teddy' | 'clock' | 'mirror' | 'leaf' | 'shield' | 'hands' | 'cart' | 'phoneRed' | 'graph';
const BI: React.FC<{name: BIcon; size?: number; f?: number}> = ({name, size = 120, f = 0}) => {
  const y = C.yellow, pk = C.labelPink, nv = C.navy, w = '#fff', g = C.green;
  const heart = 'M 60 104 C 20 76 8 56 8 38 C 8 20 22 10 36 10 C 48 10 56 18 60 26 C 64 18 72 10 84 10 C 98 10 112 20 112 38 C 112 56 100 76 60 104 Z';
  const body = (() => {
    switch (name) {
      case 'heart':
        return <path d={heart} fill={pk} />;
      case 'broken':
        return (
          <g>
            <g transform="translate(-6 4) rotate(-8 60 60)">
              <path d={heart} fill={pk} clipPath="url(#bpd-lh)" />
            </g>
            <g transform="translate(6 4) rotate(8 60 60)">
              <path d={heart} fill={C.pink[1]} clipPath="url(#bpd-rh)" />
            </g>
            <defs>
              <clipPath id="bpd-lh"><path d="M 0 0 L 64 0 L 52 34 L 66 52 L 50 74 L 60 120 L 0 120 Z" /></clipPath>
              <clipPath id="bpd-rh"><path d="M 64 0 L 120 0 L 120 120 L 60 120 L 50 74 L 66 52 L 52 34 Z" /></clipPath>
            </defs>
          </g>
        );
      case 'car':
        return (
          <g>
            <path d="M 14 70 L 26 40 Q 30 32 40 32 L 80 32 Q 90 32 94 40 L 106 70 Z" fill={pk} />
            <rect x={8} y={66} width={104} height={28} rx={12} fill={pk} />
            <path d="M 34 40 L 58 40 L 58 62 L 26 62 Z M 64 40 L 86 40 L 94 62 L 64 62 Z" fill={C.violet[3]} />
            <circle cx={34} cy={96} r={13} fill={nv} />
            <circle cx={86} cy={96} r={13} fill={nv} />
            {[0, 1, 2].map((i) => (
              <rect key={i} x={-38 - ((f * 3 + i * 12) % 30)} y={48 + i * 16} width={28} height={6} rx={3} fill={w} opacity={0.8} />
            ))}
          </g>
        );
      case 'bandage':
        return (
          <g transform="rotate(-35 60 60)">
            <rect x={6} y={40} width={108} height={40} rx={20} fill="#F2C9A0" />
            <rect x={40} y={40} width={40} height={40} fill="#E3B086" />
            {[0, 1, 2, 3].map((i) => <circle key={i} cx={50 + (i % 2) * 20} cy={52 + Math.floor(i / 2) * 16} r={3} fill="#C98F68" />)}
          </g>
        );
      case 'dna':
        return (
          <g>
            {new Array(9).fill(0).map((_, i) => {
              const yy = 10 + i * 12.5;
              const ph = i * 0.75 + f / 8;
              const a = 60 + Math.sin(ph) * 36, b = 60 - Math.sin(ph) * 36;
              return (
                <g key={i}>
                  <line x1={a} y1={yy} x2={b} y2={yy} stroke={w} strokeWidth={4} opacity={0.7} />
                  <circle cx={a} cy={yy} r={8} fill={y} />
                  <circle cx={b} cy={yy} r={8} fill={pk} />
                </g>
              );
            })}
          </g>
        );
      case 'brain':
        return (
          <g>
            <path d="M 60 18 C 40 6 14 18 16 42 C 4 52 8 76 24 82 C 26 100 48 108 60 96 C 72 108 94 100 96 82 C 112 76 116 52 104 42 C 106 18 80 6 60 18 Z" fill={C.pink[0]} />
            <path d="M 60 20 L 60 96 M 34 40 Q 46 46 40 60 M 86 40 Q 74 46 80 60 M 30 72 Q 44 70 46 84 M 90 72 Q 76 70 74 84" stroke={C.pink[2]} strokeWidth={5} fill="none" strokeLinecap="round" />
          </g>
        );
      case 'teddy':
        return (
          <g>
            <circle cx={34} cy={28} r={16} fill="#B9835A" />
            <circle cx={86} cy={28} r={16} fill="#B9835A" />
            <circle cx={60} cy={50} r={34} fill="#C9935F" />
            <ellipse cx={60} cy={92} rx={36} ry={26} fill="#C9935F" />
            <ellipse cx={60} cy={60} rx={14} ry={10} fill="#E9C9A0" />
            <circle cx={48} cy={44} r={5} fill={nv} />
            <circle cx={72} cy={44} r={5} fill={nv} />
            <path d="M 54 66 Q 60 62 66 66" stroke={nv} strokeWidth={4} fill="none" strokeLinecap="round" />
            <path d="M 70 84 L 82 96 M 82 84 L 70 96" stroke={nv} strokeWidth={4} strokeLinecap="round" />
          </g>
        );
      case 'clock':
        return (
          <g>
            <circle cx={60} cy={60} r={52} fill={w} stroke={nv} strokeWidth={9} />
            <line x1={60} y1={60} x2={60} y2={24} stroke={nv} strokeWidth={7} strokeLinecap="round" transform={`rotate(${f * 24} 60 60)`} />
            <line x1={60} y1={60} x2={60} y2={34} stroke={pk} strokeWidth={8} strokeLinecap="round" transform={`rotate(${f * 2} 60 60)`} />
            <circle cx={60} cy={60} r={6} fill={nv} />
          </g>
        );
      case 'mirror':
        return (
          <g>
            <ellipse cx={60} cy={54} rx={40} ry={50} fill={C.violet[4]} stroke={y} strokeWidth={8} />
            <path d="M 40 34 L 54 24 M 40 50 L 64 30" stroke={w} strokeWidth={5} strokeLinecap="round" opacity={0.7} />
            <rect x={54} y={104} width={12} height={14} rx={4} fill={y} />
          </g>
        );
      case 'leaf':
        return (
          <g>
            <path d="M 20 100 C 20 40 60 14 104 16 C 106 62 80 100 20 100 Z" fill={g} />
            <path d="M 20 100 Q 60 60 92 28" stroke={w} strokeWidth={5} fill="none" strokeLinecap="round" />
          </g>
        );
      case 'shield':
        return (
          <g>
            <path d="M 60 8 L 104 24 L 100 66 Q 94 98 60 112 Q 26 98 20 66 L 16 24 Z" fill={y} />
            <path d="M 40 60 L 54 74 L 82 44" stroke={nv} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      case 'hands':
        return (
          <g>
            <path d={heart} fill={pk} transform="translate(30 18) scale(0.5)" />
            <path d="M 8 70 Q 30 62 46 80 L 60 96 L 74 80 Q 90 62 112 70 L 104 104 L 16 104 Z" fill="#E3AF88" />
          </g>
        );
      case 'cart':
        return (
          <g>
            <path d="M 8 20 L 26 20 L 38 80 L 100 80 L 110 36 L 30 36" stroke={w} strokeWidth={8} fill="none" strokeLinejoin="round" strokeLinecap="round" />
            <rect x={40} y={42} width={22} height={30} rx={4} fill={y} />
            <rect x={68} y={46} width={30} height={26} rx={4} fill={pk} />
            <circle cx={46} cy={98} r={9} fill={w} />
            <circle cx={92} cy={98} r={9} fill={w} />
          </g>
        );
      case 'phoneRed':
        return (
          <g>
            <circle cx={60} cy={60} r={54} fill={pk} />
            <path d="M 30 66 Q 60 40 90 66 L 84 78 L 70 72 L 70 64 Q 60 60 50 64 L 50 72 L 36 78 Z" fill={w} />
          </g>
        );
      case 'graph':
        return (
          <g>
            <path d="M 12 100 L 108 100 M 12 100 L 12 12" stroke={w} strokeWidth={6} strokeLinecap="round" />
            <path d="M 18 88 L 44 72 L 62 78 L 100 26" stroke={g} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 84 24 L 102 22 L 100 40" stroke={g} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
    }
  })();
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{overflow: 'visible'}}>
      {body}
    </svg>
  );
};

/* kad simptom: ikon + teks */
const Sym: React.FC<{icon: React.ReactNode; text: string; bg?: string; color?: string; w?: number}> = ({icon, text, bg = C.navy, color = '#fff', w = 560}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 20, width: w, background: bg, borderRadius: 34, padding: '16px 26px 16px 18px', boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
    <div style={{width: 96, height: 96, borderRadius: 26, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{icon}</div>
    <Txt size={42} color={color}>{text}</Txt>
  </div>
);

/* garis potong (untuk "bukan ...") */
const Strike: React.FC<{w: number; h: number; p: number}> = ({w, h, p}) => (
  <svg width={w} height={h} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} viewBox={`0 0 ${w} ${h}`}>
    <path d={`M 10 ${h - 10} L ${w - 10} 10`} stroke={C.labelPink} strokeWidth={14} strokeLinecap="round" strokeDasharray={w * 1.3} strokeDashoffset={w * 1.3 * (1 - p)} />
  </svg>
);

/* hati besar yang boleh retak (0 = utuh, 1 = terbelah) */
const BigHeart: React.FC<{size: number; crack: number; beat?: number}> = ({size, crack, beat = 0}) => {
  const heart = 'M 60 104 C 20 76 8 56 8 38 C 8 20 22 10 36 10 C 48 10 56 18 60 26 C 64 18 72 10 84 10 C 98 10 112 20 112 38 C 112 56 100 76 60 104 Z';
  const sep = crack * 14;
  const rot = crack * 10;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{overflow: 'visible', transform: `scale(${1 + beat})`}}>
      <defs>
        <clipPath id="bh-l"><path d="M -10 -10 L 64 -10 L 52 34 L 66 52 L 50 74 L 60 130 L -10 130 Z" /></clipPath>
        <clipPath id="bh-r"><path d="M 64 -10 L 130 -10 L 130 130 L 60 130 L 50 74 L 66 52 L 52 34 Z" /></clipPath>
      </defs>
      <g transform={`translate(${-sep} ${sep * 0.4}) rotate(${-rot} 60 100)`}>
        <path d={heart} fill={C.labelPink} clipPath="url(#bh-l)" />
        <path d="M 30 30 Q 22 38 24 50" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.5} clipPath="url(#bh-l)" />
      </g>
      <g transform={`translate(${sep} ${sep * 0.4}) rotate(${rot} 60 100)`}>
        <path d={heart} fill={C.pink[1]} clipPath="url(#bh-r)" />
      </g>
      {crack > 0 && crack < 0.25 ? <path d="M 64 0 L 52 34 L 66 52 L 50 74 L 60 110" stroke="#fff" strokeWidth={3} fill="none" /> : null}
    </svg>
  );
};

/* titisan air mata */
const Tears: React.FC<{x: number; y: number; f: number}> = ({x, y, f}) => (
  <>
    {[0, 1].map((i) => {
      const ff = (f + i * 17) % 34;
      return <div key={i} style={{position: 'absolute', left: x + i * 120, top: y + ff * 3.4, width: 20, height: 30, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: '#8EC9FF', opacity: interpolate(ff, [0, 5, 26, 34], [0, 1, 1, 0])}} />;
    })}
  </>
);

/* skrin telefon dengan sembang */
const ChatMsg: React.FC<{text: string; me?: boolean; f: number; w?: number}> = ({text, me = true, f, w}) => (
  <div style={{display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start', margin: '8px 0', transform: `scale(${popScale(f)})`, opacity: popOpacity(f), transformOrigin: me ? 'right' : 'left'}}>
    <div style={{maxWidth: w ?? 380, background: me ? C.green : '#fff', color: me ? '#fff' : C.navy, borderRadius: me ? '26px 26px 6px 26px' : '26px 26px 26px 6px', padding: '12px 20px', fontFamily: FONT, fontWeight: 800, fontSize: 32, lineHeight: 1.15}}>{text}</div>
  </div>
);

/* ================= 0 — Pagi: tajuk → Sofea & Danial, hati besar ================= */
export const Pagi: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSofea = at(p, 'Sofea', 1.1);
  const aSemp = at(p, 'sempurna', 3.7);
  const titleOut = interpolate(f, [aSofea - 2, aSofea + 8], [1, 0], clamp);
  const inP = interpolate(f, [aSofea, aSofea + 14], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const beat = Math.max(0, Math.sin(f / 4)) * 0.05;
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.violet[3]} 0%, ${C.pink[0]} 70%, #F7B58C 100%)`}} />
      {/* matahari pagi */}
      <div style={{position: 'absolute', left: 800, top: 600 - inP * 80, width: 200, height: 200, borderRadius: 100, background: C.yellow, boxShadow: `0 0 120px ${C.yellow}`, opacity: inP}} />
      <Glow x={540} y={1150} r={560} color="#fff" opacity={0.25} />
      {/* hati kecil terapung */}
      {new Array(10).fill(0).map((_, i) => {
        const yy = 1500 - ((f * (2 + random(`hy${i}`) * 2) + random(`ho${i}`) * 1100) % 1100);
        return (
          <div key={i} style={{position: 'absolute', left: random(`hx${i}`) * 1000, top: yy, opacity: 0.5 * inP, transform: `scale(${0.3 + random(`hs${i}`) * 0.4})`}}>
            <BI name="heart" size={90} />
          </div>
        );
      })}
      {/* tajuk (frame 0) */}
      <div style={{position: 'absolute', top: 470, width: 1080, textAlign: 'center', opacity: titleOut, transform: `translateY(${(1 - titleOut) * -40}px)`}}>
        <Txt size={58} color={C.navy}>KENALI</Txt>
        <Txt size={210} color={C.yellow} style={{lineHeight: 1, textShadow: '0 10px 0 rgba(18,11,51,.6)'}}>BPD</Txt>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 16}}>
          <Pill text="Borderline Personality Disorder" bg={C.navy} size={46} />
        </div>
      </div>
      {/* hati besar */}
      <div style={{position: 'absolute', left: 340, top: 560, opacity: inP, transform: `scale(${0.6 + inP * 0.4})`}}>
        <BigHeart size={400} crack={0} beat={beat} />
      </div>
      <Who preset={SOFEA} x={-30 + (1 - inP) * -300} y={940} w={540} mood="happy" pose="clasp" seed={1} />
      <Who preset={DANIAL} x={560 + (1 - inP) * 300} y={960} w={520} mood="happy" pose="wave" seed={2} />
      <Pop at={aSemp} style={{left: 0, width: 1080, top: 1010, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Paling sempurna!" bg={C.yellow} color={C.navy} size={52} style={{transform: `rotate(-4deg)`}} />
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Malam: menjerit "Aku benci kau!" → hati retak → menangis seorang diri ================= */
export const Malam: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aJerit = at(p, 'menjerit', 1.1);
  const aAku = at(p, 'Aku benci', 1.95);
  const aKem = at(p, 'Kemudian', 3.8);
  const aUmur = at(p, 'Umurnya', 6.6);
  const crack = interpolate(f, [aAku, aAku + 10], [0, 1], {...clamp, easing: Easing.out(Easing.back(2))});
  const shake = f >= aAku && f < aAku + 12 ? Math.sin(f * 3.1) * 16 * (1 - (f - aAku) / 12) : 0;
  const anger = interpolate(f, [aJerit, aJerit + 14], [0, 1], clamp);
  const lone = interpolate(f, [aKem - 2, aKem + 18], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const sofeaMood: Mood = f >= aKem ? 'sad' : f >= aJerit ? 'angry' : 'neutral';
  return (
    <AbsoluteFill style={{transform: `translateX(${shake}px)`}}>
      <Camera dur={p.dur} to={1.1} panY={-30}>
        <NightSky seed={3} glow={f >= aKem ? '#33508F' : C.labelPink} dim={1 - lone * 0.5} />
        {/* bulan */}
        <div style={{position: 'absolute', left: 120, top: 520, width: 150, height: 150, borderRadius: 75, background: '#F4F1FF', boxShadow: '0 0 60px #fff', opacity: 0.9}} />
        <div style={{position: 'absolute', left: 160, top: 500, width: 150, height: 150, borderRadius: 75, background: C.night[0], opacity: 0.95}} />
        {/* hati retak */}
        <div style={{position: 'absolute', left: 360, top: 560, opacity: 1 - lone * 0.65, transform: `scale(${1 - lone * 0.25})`}}>
          <BigHeart size={360} crack={crack} />
        </div>
        {/* serpihan kaca */}
        {f >= aAku
          ? new Array(12).fill(0).map((_, i) => {
              const ff = f - aAku;
              const ang = (i / 12) * Math.PI * 2 + random(`sa${i}`);
              const d = ff * (10 + random(`sd${i}`) * 10);
              return (
                <div key={i} style={{position: 'absolute', left: 540 + Math.cos(ang) * d, top: 740 + Math.sin(ang) * d + ff * ff * 0.4, width: 26, height: 14, background: i % 2 ? '#fff' : C.labelPink, transform: `rotate(${ff * 20 + i * 30}deg)`, opacity: interpolate(ff, [0, 3, 22, 30], [0, 1, 1, 0], clamp), clipPath: 'polygon(0 0, 100% 40%, 30% 100%)'}} />
              );
            })
          : null}
        {/* Danial terkejut lalu pergi */}
        <Who preset={DANIAL} x={600 + lone * 520} y={1000} w={460} mood="shock" pose="down" seed={2} style={{opacity: 1 - lone}} />
        {/* Sofea */}
        <Who preset={SOFEA} x={60 + lone * 200} y={960 + lone * 20} w={520} mood={sofeaMood} pose={f >= aKem ? 'clasp' : f >= aJerit ? 'point' : 'down'} anger={anger} seed={1} style={{filter: `saturate(${1 - lone * 0.45})`}} />
        {f >= aKem ? <Tears x={60 + lone * 200 + 170} y={1180} f={f - aKem} /> : null}
        <Pop at={aAku} style={{left: 290, top: 980}}>
          <div style={{opacity: 1 - lone}}>
            <Bubble tail="left" bg={C.labelPink} color="#fff" size={64}>"Aku benci kau!"</Bubble>
          </div>
        </Pop>
        {/* lampu sorot mengecil: seorang diri */}
        <AbsoluteFill style={{background: `radial-gradient(circle at ${(60 + lone * 200 + 260) / 10.8}% 64%, rgba(0,0,0,0) ${46 - lone * 22}%, rgba(10,6,30,${0.75 * lone}) ${62 - lone * 22}%)`}} />
        <Pop at={aKem + 10} style={{left: 0, width: 1080, top: 560, display: 'flex', justifyContent: 'center'}}>
          <Pill text="Seorang diri..." bg="#33508F" size={48} />
        </Pop>
        <Pop at={aUmur} style={{left: 0, width: 1080, top: 680, display: 'flex', justifyContent: 'center'}}>
          <div style={{display: 'flex', alignItems: 'center', background: C.yellow, borderRadius: 50, padding: '14px 40px', boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
            <Txt size={60} color={C.navy}>Sofea, 20 tahun</Txt>
          </div>
        </Pop>
      </Camera>
    </AbsoluteFill>
  );
};

/* ================= 2 — Mesej: lambat balas 10 minit → panik → 20 mesej, 5 panggilan ================= */
export const Mesej: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aLambat = at(p, 'lambat', 1.4);
  const aSep = at(p, 'Sepuluh', 2.9);
  const aPanik = at(p, 'panik', 5.0);
  const aDia = at(p, 'Dia nak', 5.6);
  const aDua = at(p, 'Dua puluh', 7.2);
  const aLima = at(p, 'Lima panggilan', 8.7);
  const mins = Math.round(interpolate(f, [aSep, aSep + 18], [0, 10], clamp));
  const count = Math.round(interpolate(f, [aDua, aDua + 26], [1, 20], clamp));
  const pulse = f >= aPanik ? Math.max(0, Math.sin((f - aPanik) / 2.6)) : 0;
  const flood = ['Awak?', 'Kenapa diam?', 'Jawab la!!', 'Awak marah ke?', 'Sorry...', 'Tolong balas', '???', 'Jangan buat saya macam ni'];
  const floodScroll = interpolate(f, [aDua, aDua + 40], [0, 360], clamp);
  return (
    <Camera dur={p.dur} to={1.07} panX={-10}>
      <NightSky seed={7} glow={f >= aPanik ? C.labelPink : C.violet[2]} />
      {/* denyut panik */}
      {f >= aPanik ? <AbsoluteFill style={{boxShadow: `inset 0 0 ${120 + pulse * 160}px rgba(226,61,120,${0.25 + pulse * 0.35})`}} /> : null}
      {/* telefon */}
      <div style={{position: 'absolute', left: 80, top: 470, width: 560, height: 900, borderRadius: 70, background: C.navy, padding: 22, boxShadow: '0 30px 70px rgba(18,11,51,.6)', transform: `rotate(-4deg) translateY(${f >= aPanik ? Math.sin(f * 1.7) * 3 : 0}px)`}}>
        <div style={{width: '100%', height: '100%', borderRadius: 50, background: '#E9E4FA', overflow: 'hidden', position: 'relative'}}>
          <div style={{height: 120, background: C.violet[1], display: 'flex', alignItems: 'center', gap: 16, padding: '0 24px', position: 'relative', zIndex: 2}}>
            <div style={{width: 76, height: 76, borderRadius: 38, background: C.violet[4], overflow: 'hidden', display: 'flex', justifyContent: 'center'}}>
              <Avatar preset={DANIAL} width={80} mood="neutral" seed={9} />
            </div>
            <div>
              <Txt size={36}>Danial</Txt>
              <Txt size={24} color={C.violet[4]}>{f >= aLambat ? 'aktif 10 min lalu' : 'dalam talian'}</Txt>
            </div>
          </div>
          <div style={{padding: '10px 18px', transform: `translateY(${-floodScroll}px)`}}>
            <ChatMsg text="Hai awak, dah sampai?" f={f - 2} />
            <div style={{textAlign: 'right', fontFamily: FONT, fontWeight: 800, fontSize: 22, color: C.violet[1]}}>{f >= aLambat ? 'Dibaca ✓✓' : 'Dihantar ✓'}</div>
            {flood.map((t, i) => (f >= aDua + i * 4 ? <ChatMsg key={i} text={t} f={f - aDua - i * 4} /> : null))}
          </div>
          {/* panggilan tak berjawab */}
          {f >= aLima ? (
            <div style={{position: 'absolute', left: 20, right: 20, top: 520, background: '#fff', borderRadius: 30, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 14px 34px rgba(18,11,51,.35)', transform: `scale(${popScale(f - aLima)})`, opacity: popOpacity(f - aLima)}}>
              <BI name="phoneRed" size={80} />
              <div>
                <Txt size={34} color={C.labelPink}>5 panggilan</Txt>
                <Txt size={26} color={C.navy}>tidak dijawab</Txt>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {/* lencana kiraan mesej */}
      {f >= aDua ? (
        <div style={{position: 'absolute', left: 540, top: 440, width: 130, height: 130, borderRadius: 65, background: C.labelPink, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${popScale(f - aDua) * (1 + (f % 4 < 2 ? 0.05 : 0))})`, boxShadow: '0 10px 30px rgba(18,11,51,.5)'}}>
          <Txt size={62}>{count}</Txt>
        </div>
      ) : null}
      {/* jam: 10 minit */}
      <Pop at={aSep} style={{left: 650, top: 520}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, background: '#fff', borderRadius: 40, padding: '12px 26px 12px 14px', boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <BI name="clock" size={76} f={f - aSep} />
          <Txt size={46} color={C.navy}>{mins} minit</Txt>
        </div>
      </Pop>
      {/* Sofea */}
      <Who preset={SOFEA} x={600} y={940 - pulse * 8} w={460} mood={f >= aPanik ? 'shock' : 'curious'} pose={f >= aDua ? 'point' : 'chin'} seed={1} />
      {/* jantung berdegup */}
      {f >= aPanik ? (
        <div style={{position: 'absolute', left: 900, top: 1240}}>
          <BI name="heart" size={110 * (1 + pulse * 0.3)} />
        </div>
      ) : null}
      <Pop at={aDia} style={{left: 520, top: 700}}>
        <div style={{opacity: interpolate(f, [aDua + 6, aDua + 14], [1, 0], clamp)}}>
          <Thought w={500}>
            <Txt size={44} color={C.labelPink}>"Dia nak tinggalkan aku..."</Txt>
          </Thought>
        </div>
      </Pop>
    </Camera>
  );
};

/* muka emosi (bulat) */
const Face: React.FC<{kind: 'gembira' | 'marah' | 'kosong'; size: number; f: number}> = ({kind, size, f}) => {
  const bg = kind === 'gembira' ? C.yellow : kind === 'marah' ? C.labelPink : 'transparent';
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{overflow: 'visible'}}>
      {kind === 'kosong' ? (
        <circle cx={100} cy={100} r={92} fill="rgba(255,255,255,0.06)" stroke="#BFC6E0" strokeWidth={8} strokeDasharray="22 16" transform={`rotate(${f * 2} 100 100)`} />
      ) : (
        <circle cx={100} cy={100} r={92} fill={bg} />
      )}
      {kind === 'gembira' ? (
        <g fill={C.navy}>
          <path d="M 56 80 Q 70 62 84 80" stroke={C.navy} strokeWidth={10} fill="none" strokeLinecap="round" />
          <path d="M 116 80 Q 130 62 144 80" stroke={C.navy} strokeWidth={10} fill="none" strokeLinecap="round" />
          <path d="M 52 112 Q 100 172 148 112 Z" />
        </g>
      ) : kind === 'marah' ? (
        <g>
          <path d="M 50 66 L 88 82 M 150 66 L 112 82" stroke={C.navy} strokeWidth={11} strokeLinecap="round" />
          <circle cx={74} cy={96} r={10} fill={C.navy} />
          <circle cx={126} cy={96} r={10} fill={C.navy} />
          <path d="M 64 150 Q 100 118 136 150" stroke={C.navy} strokeWidth={11} fill="none" strokeLinecap="round" />
        </g>
      ) : (
        <g stroke="#BFC6E0" strokeWidth={9} strokeLinecap="round">
          <line x1={64} y1={90} x2={86} y2={90} />
          <line x1={114} y1={90} x2={136} y2={90} />
          <line x1={74} y1={138} x2={126} y2={138} />
        </g>
      )}
    </svg>
  );
};

/* ================= 3 — Emosi berubah dalam beberapa jam: gembira → marah → kosong; kawan menjauh ================= */
export const Emosi: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aJam = at(p, 'beberapa jam', 1.1);
  const aG = at(p, 'Gembira', 2.2);
  const aM = at(p, 'marah', 3.2);
  const aK = at(p, 'kosong', 4.1);
  const aKawan = at(p, 'Kawan-kawan', 5.0);
  const facesOut = interpolate(f, [aKawan - 4, aKawan + 4], [1, 0], clamp);
  const away = interpolate(f, [aKawan, aKawan + 40], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const faces: {k: 'gembira' | 'marah' | 'kosong'; a: number; x: number}[] = [
    {k: 'gembira', a: aG, x: 60},
    {k: 'marah', a: aM, x: 380},
    {k: 'kosong', a: aK, x: 700},
  ];
  const mood: Mood = f >= aK ? 'tired' : f >= aM ? 'angry' : f >= aG ? 'happy' : 'neutral';
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[0]} 0%, ${C.night[3]} 60%, ${C.violet[0]} 100%)`}} />
      <Glow x={540} y={900} r={520} color={f >= aK ? '#7FA6E8' : f >= aM ? C.labelPink : C.yellow} opacity={0.3 * facesOut + 0.1} />
      {/* jam berputar laju */}
      <Pop at={Math.max(0, aJam - 8)} style={{left: 0, width: 1080, top: 470, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: C.navy, borderRadius: 44, padding: '12px 30px 12px 14px', opacity: facesOut}}>
          <BI name="clock" size={80} f={f * 3} />
          <Txt size={44} color={C.yellow}>Dalam beberapa jam</Txt>
        </div>
      </Pop>
      {faces.map((fc, i) =>
        f >= fc.a && facesOut > 0 ? (
          <div key={i} style={{position: 'absolute', left: fc.x, top: 640, opacity: popOpacity(f - fc.a) * facesOut, transform: `scale(${popScale(f - fc.a)}) rotate(${fc.k === 'marah' ? Math.sin(f) * 4 : 0}deg)`}}>
            <Face kind={fc.k} size={300} f={f} />
            <Txt size={44} style={{textAlign: 'center', marginTop: 6}} color={fc.k === 'kosong' ? '#BFC6E0' : fc.k === 'marah' ? C.labelPink : C.yellow}>
              {fc.k.toUpperCase()}
            </Txt>
          </div>
        ) : null,
      )}
      {/* anak panah antara muka */}
      {[0, 1].map((i) =>
        f >= faces[i + 1].a && facesOut > 0 ? (
          <div key={i} style={{position: 'absolute', left: 330 + i * 320, top: 760, opacity: facesOut}}>
            <Txt size={60} color="#fff">→</Txt>
          </div>
        ) : null,
      )}
      {/* kawan menjauh */}
      {f >= aKawan ? (
        <>
          <Who preset={KAWAN1} x={-20 - away * 420} y={1020 + away * 40} w={380} mood="neutral" pose="down" seed={3} style={{opacity: 1 - away * 0.85, transform: `scale(${1 - away * 0.3})`}} />
          <Who preset={KAWAN2} x={720 + away * 420} y={1020 + away * 40} w={380} mood="neutral" pose="down" seed={4} style={{opacity: 1 - away * 0.85, transform: `scale(${1 - away * 0.3})`}} />
          <Pop at={aKawan + 6} style={{left: 0, width: 1080, top: 640, display: 'flex', justifyContent: 'center'}}>
            <Pill text="Kawan-kawan menjauh" bg="#33508F" size={52} />
          </Pop>
        </>
      ) : null}
      <Who preset={SOFEA} x={290} y={f >= aKawan ? 960 : 1000} w={500} mood={f >= aKawan ? 'sad' : mood} pose="clasp" anger={f >= aM && f < aK ? 1 : 0} seed={1} />
    </Camera>
  );
};

/* ================= 4 — Kakak bawa Sofea jumpa doktor ================= */
export const Kakak: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aDok = at(p, 'doktor', 2.3);
  const walk = interpolate(f, [0, p.dur], [0, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.06}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.violet[3]} 0%, ${C.pink[0]} 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1440, width: 1080, height: 500, background: C.night[2]}} />
      <div style={{position: 'absolute', left: 120, top: 640, width: 840, height: 800, background: '#F5EEF9', borderRadius: '30px 30px 0 0'}} />
      <div style={{position: 'absolute', left: 160, top: 680, width: 760, height: 150, background: C.navy, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26}}>
        <svg width={96} height={96} viewBox="0 0 96 96">
          <rect x={0} y={0} width={96} height={96} rx={20} fill="#fff" />
          <rect x={36} y={14} width={24} height={68} rx={6} fill={C.labelPink} />
          <rect x={14} y={36} width={68} height={24} rx={6} fill={C.labelPink} />
        </svg>
        <Txt size={64} color={C.yellow}>KLINIK</Txt>
      </div>
      <div style={{position: 'absolute', left: 420, top: 980, width: 240, height: 460, background: '#4FD8D8', borderRadius: '20px 20px 0 0', opacity: 0.85}} />
      {[0, 1].map((i) => <div key={i} style={{position: 'absolute', left: [190, 720][i], top: 960, width: 170, height: 200, borderRadius: 18, background: C.violet[3]}} />)}
      <div style={{position: 'absolute', left: -60 + walk * 300, top: 1000, display: 'flex', alignItems: 'flex-end', transform: `translateY(${-Math.abs(Math.sin(f / 4)) * 10}px)`}}>
        <Avatar preset={KAKAK} width={320} mood="neutral" pose="clasp" seed={5} />
        <div style={{marginLeft: -90}}>
          <Avatar preset={SOFEA} width={300} mood="sad" pose="down" seed={1} />
        </div>
      </div>
      <Pop at={6} style={{left: 60, top: 500}}>
        <Pill text="Kakak" bg={C.navy} size={46} />
      </Pop>
      <Pop at={aDok} style={{left: 0, width: 1080, top: 860, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Jumpa doktor" bg={C.green} size={56} />
      </Pop>
    </Camera>
  );
};

/* ================= 5 — Penilaian → diagnosis BPD ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSah = at(p, 'sahkan', 1.5);
  const aDiag = at(p, 'Borderline', 3.3);
  const checks = ['Emosi', 'Hubungan', 'Gambaran diri', 'Tingkah laku'];
  const stamp = f >= aDiag ? interpolate(f - aDiag, [0, 6, 10], [1.7, 0.94, 1], clamp) : 0;
  return (
    <Camera dur={p.dur} to={1.08} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[3]} 0%, ${C.violet[2]} 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: C.night[1]}} />
      <Glow x={300} y={1000} r={460} color={C.violet[3]} opacity={0.35} />
      <Pop at={2} style={{left: 590, top: 500}}>
        <div style={{width: 420, background: '#fff', borderRadius: 30, padding: '60px 30px 26px', position: 'relative', boxShadow: '0 20px 50px rgba(18,11,51,.5)', transform: 'rotate(4deg)'}}>
          <div style={{position: 'absolute', left: 140, top: -20, width: 140, height: 56, borderRadius: 16, background: C.navy}} />
          <Txt size={34} color={C.violet[2]} style={{marginBottom: 12}}>PENILAIAN</Txt>
          {checks.map((c2, i) => {
            const a = 8 + i * 8;
            const on = f >= a;
            return (
              <div key={i} style={{display: 'flex', alignItems: 'center', gap: 16, margin: '12px 0'}}>
                <div style={{width: 44, height: 44, borderRadius: 12, background: on ? C.green : C.violet[4], display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${on ? popScale(f - a) : 1})`}}>
                  {on ? <svg width={30} height={30} viewBox="0 0 30 30"><path d="M 5 16 L 12 23 L 25 8" stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg> : null}
                </div>
                <Txt size={36} color={C.navy}>{c2}</Txt>
              </div>
            );
          })}
        </div>
      </Pop>
      <div style={{position: 'absolute', left: 0, top: 1330, width: 1080, height: 70, background: C.pink[2], borderRadius: 16}} />
      <Who preset={p.preset} x={20} y={840} w={520} mood={f >= aSah ? 'neutral' : 'curious'} pose={f >= aSah ? 'clasp' : 'chin'} />
      <Who preset={SOFEA} x={640} y={1050} w={360} mood={f >= aDiag ? 'shock' : 'sad'} pose="clasp" seed={1} />
      {f >= aDiag ? (
        <div style={{position: 'absolute', left: 60, top: 540, width: 960, display: 'flex', justifyContent: 'center', transform: `scale(${stamp}) rotate(-4deg)`, opacity: interpolate(f - aDiag, [0, 3], [0, 1], clamp)}}>
          <div style={{background: C.navy, border: `10px solid ${C.labelPink}`, borderRadius: 40, padding: '26px 40px', textAlign: 'center', boxShadow: '0 30px 70px rgba(18,11,51,.6)'}}>
            <Txt size={36} color={C.violet[4]}>DIAGNOSIS</Txt>
            <Txt size={92} color={C.yellow} style={{lineHeight: 1.02}}>BORDERLINE</Txt>
            <Txt size={52}>PERSONALITY DISORDER</Txt>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 12}}>
              <Pill text="BPD" bg={C.labelPink} size={50} />
            </div>
          </div>
        </div>
      ) : null}
    </Camera>
  );
};

/* ================= 6 — Apa itu BPD: 3 tiang tak stabil; bukan drama, bukan cari perhatian ================= */
export const Apa: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aGang = at(p, 'gangguan', 2.0);
  const items = [
    {t: 'EMOSI', a: at(p, 'emosi', 4.0), bg: C.labelPink},
    {t: 'HUBUNGAN', a: at(p, 'hubungan', 4.7), bg: C.violet[1]},
    {t: 'GAMBARAN DIRI', a: at(p, 'gambaran', 5.7), bg: C.green},
  ];
  const aStab = at(p, 'tidak stabil', 6.8);
  const aBukan = at(p, 'bukan drama', 8.0);
  const aCari = at(p, 'cari perhatian', 9.8);
  const blocksOut = interpolate(f, [aBukan - 4, aBukan + 4], [1, 0], clamp);
  const wob = interpolate(f, [aStab, aStab + 12], [0.15, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <NightSky seed={11} glow={C.violet[2]} />
      <Pop at={aGang} style={{left: 0, width: 1080, top: 470, display: 'flex', justifyContent: 'center'}}>
        <div style={{opacity: blocksOut}}>
          <Pill text="Gangguan personaliti" bg={C.navy} color={C.yellow} size={54} />
        </div>
      </Pop>
      {/* menara blok goyang */}
      {blocksOut > 0
        ? items.map((it, i) => {
            if (f < it.a) return null;
            const ff = f - it.a;
            const drop = interpolate(ff, [0, 8], [-500, 0], {...clamp, easing: Easing.out(Easing.bounce)});
            const rot = Math.sin(f / (5 + i) + i * 2) * 7 * wob * (i + 1) * 0.6;
            const sx = Math.sin(f / (6 + i) + i) * 22 * wob * i;
            return (
              <div key={i} style={{position: 'absolute', left: 190 + sx, top: 1040 - i * 170 + drop, width: 700, height: 150, borderRadius: 30, background: it.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${rot}deg)`, opacity: blocksOut, boxShadow: '0 16px 40px rgba(18,11,51,.5)'}}>
                <Txt size={62}>{it.t}</Txt>
              </div>
            );
          })
        : null}
      <Pop at={aStab} style={{left: 640, top: 600}}>
        <div style={{opacity: blocksOut}}>
          <Pill text="TIDAK STABIL!" bg={C.yellow} color={C.navy} size={48} style={{transform: `rotate(${Math.sin(f / 3) * 6}deg)`}} />
        </div>
      </Pop>
      {/* bukan drama / bukan cari perhatian */}
      {f >= aBukan ? (
        <div style={{position: 'absolute', left: 0, width: 1080, top: 520, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40}}>
          <Txt size={64} color={C.yellow} style={{opacity: popOpacity(f - aBukan)}}>BUKAN...</Txt>
          {[
            {t: '"Drama"', a: aBukan + 4},
            {t: '"Sengaja cari perhatian"', a: aCari - 6},
          ].map((x, i) =>
            f >= x.a ? (
              <div key={i} style={{position: 'relative', transform: `scale(${popScale(f - x.a)})`, opacity: popOpacity(f - x.a)}}>
                <Bubble tail={i ? 'right' : 'left'} size={58}>{x.t}</Bubble>
                <div style={{position: 'absolute', left: -10, top: -10, width: '110%', height: '120%'}}>
                  <Strike w={i ? 820 : 360} h={110} p={interpolate(f - x.a, [8, 16], [0, 1], clamp)} />
                </div>
              </div>
            ) : null,
          )}
        </div>
      ) : null}
      <Who preset={p.preset} x={f >= aBukan ? 270 : 640} y={f >= aBukan ? 1060 : 1180} w={f >= aBukan ? 540 : 380} mood={f >= aBukan ? 'neutral' : 'curious'} pose={f >= aBukan ? 'point' : 'chin'} />
    </Camera>
  );
};

/* ================= 7 — 5 tanda utama ================= */
export const Lima: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Camera dur={p.dur} to={1.12}>
      <NightSky seed={19} glow={C.labelPink} />
      <div style={{position: 'absolute', left: 0, width: 1080, top: 560, textAlign: 'center', transform: `scale(${popScale(f)})`}}>
        <Txt size={360} color={C.yellow} style={{lineHeight: 1, textShadow: '0 14px 0 rgba(18,11,51,.6)'}}>5</Txt>
        <Txt size={84}>TANDA UTAMA</Txt>
      </div>
      <div style={{position: 'absolute', left: 0, width: 1080, top: 1140, display: 'flex', justifyContent: 'center', gap: 26}}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{width: 70, height: 70, borderRadius: 35, background: [C.labelPink, C.violet[1], C.yellow, C.green, '#7FA6E8'][i], transform: `scale(${popScale(f - 4 - i * 3)})`, opacity: popOpacity(f - 4 - i * 3)}} />
        ))}
      </div>
    </Camera>
  );
};

/* ================= 8 — #1 Takut ditinggalkan ================= */
export const T1: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTakut = at(p, 'takut', 0.9);
  const aSang = at(p, 'sanggup', 2.5);
  const leave = interpolate(f, [aTakut, p.dur], [0, 1], clamp);
  const chips = ['Merayu', 'Mesej tak henti', 'Ikut ke mana saja'];
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 70%, ${C.pink[2]} 100%)`}} />
      {/* pintu keluar */}
      <div style={{position: 'absolute', left: 790, top: 720, width: 280, height: 700, background: C.night[0], borderRadius: '24px 0 0 0'}} />
      <div style={{position: 'absolute', left: 810, top: 740, width: 260, height: 680, background: C.yellow, opacity: 0.25 + leave * 0.4, borderRadius: '16px 0 0 0'}} />
      {/* Danial melangkah pergi, Sofea berpaut */}
      <Who preset={DANIAL} x={470 + leave * 180} y={960} w={420} mood="sad" pose="down" seed={2} />
      <Who preset={SOFEA} x={60 + leave * 90} y={990} w={460} mood="sad" pose="point" seed={1} style={{transform: `rotate(${6 + Math.sin(f / 6) * 2}deg)`}} />
      <Pop at={aTakut} style={{left: 60, top: 760}}>
        <Bubble tail="left" bg={C.labelPink} color="#fff" size={52}>"Jangan pergi!"</Bubble>
      </Pop>
      {chips.map((c, i) => (
        <Pop key={i} at={aSang + i * 6} style={{left: [40, 380, 120][i], top: [490, 560, 630][i]}}>
          <Pill text={c} bg={[C.navy, C.violet[2], C.navy][i]} size={40} style={{transform: `rotate(${[-4, 3, -2][i]}deg)`}} />
        </Pop>
      ))}
    </Camera>
  );
};

/* ================= 9 — #2 Hubungan tak stabil: memuja ⇄ membenci ================= */
export const T2: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aPuja = at(p, 'memuja', 1.9);
  const aBenci = at(p, 'membenci', 3.4);
  // jarum: -1 (memuja) ... +1 (membenci)
  let needle = 0;
  if (f >= aPuja) needle = interpolate(f, [aPuja, aPuja + 8], [0, -1], {...clamp, easing: Easing.out(Easing.back(2))});
  if (f >= aBenci) needle = interpolate(f, [aBenci, aBenci + 8], [-1, 1], {...clamp, easing: Easing.out(Easing.back(2))});
  if (f >= aBenci + 18) needle = Math.sin((f - aBenci - 18) / 4) * 0.95;
  const ang = needle * 70;
  return (
    <Camera dur={p.dur} to={1.07} panY={-10}>
      <NightSky seed={21} glow={needle < 0 ? C.pink[0] : '#33508F'} />
      {/* tolok */}
      <div style={{position: 'absolute', left: 90, top: 480}}>
        <svg width={900} height={560} viewBox="0 0 900 560" style={{overflow: 'visible'}}>
          <path d="M 90 470 A 360 360 0 0 1 450 110" stroke={C.labelPink} strokeWidth={70} fill="none" />
          <path d="M 450 110 A 360 360 0 0 1 810 470" stroke="#4F79C7" strokeWidth={70} fill="none" />
          <g transform={`rotate(${ang} 450 470)`}>
            <path d="M 440 470 L 450 150 L 460 470 Z" fill="#fff" />
          </g>
          <circle cx={450} cy={470} r={34} fill={C.yellow} />
        </svg>
        <div style={{position: 'absolute', left: -20, top: 0}}>
          <BI name="heart" size={140} />
        </div>
        <div style={{position: 'absolute', left: 780, top: 0}}>
          <BI name="broken" size={140} />
        </div>
      </div>
      <Pop at={aPuja} style={{left: 40, top: 1000}}>
        <Pill text="MEMUJA" bg={C.labelPink} size={52} />
      </Pop>
      <Pop at={aBenci} style={{left: 620, top: 1000}}>
        <Pill text="MEMBENCI" bg="#4F79C7" size={52} />
      </Pop>
      <Who preset={SOFEA} x={300} y={1040} w={460} mood={needle < -0.3 ? 'happy' : needle > 0.3 ? 'angry' : 'neutral'} anger={needle > 0.3 ? 1 : 0} pose="clasp" seed={1} />
    </Camera>
  );
};

/* ================= 10 — #3 Emosi berubah mendadak & marah sukar dikawal ================= */
export const T3: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aMend = at(p, 'mendadak', 1.4);
  const aMarah = at(p, 'marah', 2.2);
  const draw = interpolate(f, [0, aMend + 20], [0, 1], clamp);
  const anger = interpolate(f, [aMarah, aMarah + 14], [0, 1], clamp);
  const pts: string[] = [];
  const ys = [200, 60, 330, 120, 300, 40, 260, 340, 90, 220];
  for (let i = 0; i < ys.length; i++) pts.push(`${i ? 'L' : 'M'} ${i * 92} ${ys[i]}`);
  return (
    <Camera dur={p.dur} to={1.07} panX={10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[0]} 0%, ${C.night[3]} 60%, ${C.pink[2]} 100%)`}} />
      <div style={{position: 'absolute', left: 60, top: 470, width: 960, background: C.navy, borderRadius: 40, padding: '24px 40px', boxShadow: '0 20px 50px rgba(18,11,51,.55)'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Txt size={36} color={C.yellow}>Mood</Txt>
          <Txt size={36} color={C.violet[4]}>dalam beberapa jam</Txt>
        </div>
        <svg width={880} height={380} viewBox="0 0 830 380" style={{marginTop: 8}}>
          <line x1={0} y1={190} x2={830} y2={190} stroke="#fff" strokeOpacity={0.3} strokeWidth={4} strokeDasharray="12 12" />
          <path d={pts.join(' ')} stroke={C.pink[0]} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={3200} strokeDashoffset={3200 * (1 - draw)} />
        </svg>
      </div>
      {/* wap marah */}
      {f >= aMarah
        ? [0, 1, 2].map((i) => {
            const ff = (f - aMarah + i * 9) % 27;
            return <div key={i} style={{position: 'absolute', left: 400 + i * 110, top: 1010 - ff * 5, width: 60, height: 60, borderRadius: 30, background: '#fff', opacity: interpolate(ff, [0, 6, 27], [0, 0.6, 0]), transform: `scale(${0.5 + ff / 27})`}} />;
          })
        : null}
      <Pop at={aMarah} style={{left: 450, top: 1100}}>
        <Pill text="Marah sukar dikawal" bg={C.labelPink} size={42} style={{transform: `rotate(5deg) translateX(${Math.sin(f * 2) * 4}px)`}} />
      </Pop>
      <Who preset={SOFEA} x={150} y={1010} w={480} mood={f >= aMarah ? 'angry' : f >= aMend ? 'shock' : 'neutral'} anger={anger} pose={f >= aMarah ? 'point' : 'clasp'} seed={1} style={{transform: `translateX(${f >= aMarah ? Math.sin(f * 2.2) * 5 : 0}px)`}} />
    </Camera>
  );
};

/* ================= 11 — #4 Bertindak ikut emosi ================= */
export const T4: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const items = [
    {icon: <BI name="cart" size={80} />, text: 'Berbelanja berlebihan', a: at(p, 'berbelanja', 2.3), bg: C.violet[0]},
    {icon: <BI name="car" size={80} f={f} />, text: 'Memandu laju', a: at(p, 'memandu', 3.6), bg: C.navy},
    {icon: <BI name="bandage" size={80} />, text: 'Mencederakan diri', a: at(p, 'mencederakan', 4.8), bg: C.labelPink},
  ];
  return (
    <Camera dur={p.dur} to={1.06} panX={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[2]} 0%, ${C.pink[2]} 70%, ${C.pink[0]} 100%)`}} />
      {/* kilat impulsif */}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: 0.16}}>
        <g transform={`translate(800 1150) rotate(${f * 0.8})`}>
          {new Array(12).fill(0).map((_, i) => (
            <path key={i} d="M 0 0 L -50 -1100 L 50 -1100 Z" fill={C.yellow} transform={`rotate(${(i * 360) / 12})`} />
          ))}
        </g>
      </svg>
      <Pop at={4} style={{left: 50, top: 480}}>
        <Pill text="Ikut emosi, tanpa fikir" bg={C.yellow} color={C.navy} size={46} />
      </Pop>
      {items.map((it, i) => (
        <Pop key={i} at={it.a} style={{left: 50, top: 620 + i * 160}}>
          <Sym icon={it.icon} text={it.text} w={640} bg={it.bg} />
        </Pop>
      ))}
      <Who preset={SOFEA} x={660} y={1000} w={400} mood="sad" pose="clasp" seed={1} />
    </Camera>
  );
};

/* ================= 12 — #5 Rasa kosong & keliru identiti ================= */
export const T5: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKosong = at(p, 'kosong', 0.9);
  const aKeliru = at(p, 'keliru', 2.6);
  const hollow = interpolate(f, [aKosong, aKosong + 20], [0, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[0]} 0%, #263A78 70%, #33508F 100%)`}} />
      {/* Sofea pudar / berlubang */}
      <div style={{position: 'absolute', left: 30, top: 900, opacity: 1 - hollow * 0.7}}>
        <Avatar preset={SOFEA} width={500} mood="tired" pose="clasp" seed={1} />
      </div>
      <div style={{position: 'absolute', left: 30, top: 900, opacity: hollow}}>
        <svg width={500} height={634} viewBox="0 0 600 760" style={{overflow: 'visible'}}>
          <circle cx={300} cy={250} r={175} fill="none" stroke="#BFC6E0" strokeWidth={10} strokeDasharray="26 18" transform={`rotate(${f} 300 250)`} />
          <path d="M 110 760 Q 120 470 300 440 Q 480 470 490 760" fill="none" stroke="#BFC6E0" strokeWidth={10} strokeDasharray="26 18" />
        </svg>
      </div>
      <Pop at={aKosong} style={{left: 60, top: 490}}>
        <Pill text="Kosong... berpanjangan" bg="#4F79C7" size={46} />
      </Pop>
      {/* cermin: siapa aku? */}
      <Pop at={aKeliru} style={{left: 560, top: 820}}>
        <div style={{position: 'relative'}}>
          <BI name="mirror" size={440} />
          {['?', '?', '?'].map((q, i) => (
            <Txt key={i} size={[120, 80, 70][i]} color={[C.yellow, C.labelPink, '#fff'][i]} style={{position: 'absolute', left: [180, 100, 290][i], top: [120 + Math.sin(f / 6) * 10, 70, 220 + Math.cos(f / 7) * 10][i], transform: `rotate(${[0, -15, 12][i]}deg)`}}>
              {q}
            </Txt>
          ))}
        </div>
      </Pop>
      <Pop at={aKeliru + 10} style={{left: 600, top: 650}}>
        <Bubble tail="right" size={50}>"Siapa aku?"</Bubble>
      </Pop>
    </Camera>
  );
};

/* ================= 13 — Punca: genetik + otak + pengalaman sukar sejak kecil ================= */
export const Punca: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const parts = [
    {icon: 'dna' as BIcon, t: 'Genetik', a: at(p, 'genetik', 1.0), bg: C.violet[1]},
    {icon: 'brain' as BIcon, t: 'Otak & kawalan emosi', a: at(p, 'cara otak', 1.9), bg: C.navy},
    {icon: 'teddy' as BIcon, t: 'Pengalaman sukar sejak kecil', a: at(p, 'pengalaman', 3.7), bg: C.pink[2]},
  ];
  return (
    <Camera dur={p.dur} to={1.07} panY={-10}>
      <NightSky seed={29} glow={C.violet[3]} />
      <Pop at={2} style={{left: 0, width: 1080, top: 470, display: 'flex', justifyContent: 'center'}}>
        <Pill text="PUNCA = GABUNGAN" bg={C.yellow} color={C.navy} size={52} />
      </Pop>
      {parts.map((pt, i) => {
        if (f < pt.a) return null;
        const ff = f - pt.a;
        const slide = interpolate(ff, [0, 10], [i % 2 ? 300 : -300, 0], {...clamp, easing: Easing.out(Easing.cubic)});
        return (
          <div key={i} style={{position: 'absolute', left: 90 + slide, top: 600 + i * 190, width: 900, opacity: popOpacity(ff)}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 24, background: pt.bg, borderRadius: 36, padding: '16px 30px 16px 20px', boxShadow: '0 16px 40px rgba(18,11,51,.5)'}}>
              <BI name={pt.icon} size={110} f={f} />
              <Txt size={46}>{pt.t}</Txt>
            </div>
            {i < 2 && f >= parts[i + 1].a ? <Txt size={56} color={C.yellow} style={{textAlign: 'center', height: 0, transform: 'translateY(-14px)'}}>+</Txt> : null}
          </div>
        );
      })}
      <Who preset={p.preset} x={600} y={1210} w={360} mood="neutral" pose="point" />
    </Camera>
  );
};

/* ================= 14 — Boleh dirawat: psikoterapi, DBT, ramai pulih ================= */
export const Rawat: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aRawat = at(p, 'dirawat', 2.0);
  const aPsiko = at(p, 'psikoterapi', 3.8);
  const aDBT = at(p, 'DBT', 5.5);
  const aRamai = at(p, 'Ramai', 8.4);
  const skills = ['Sedar diri (mindfulness)', 'Tahan tekanan', 'Kawal emosi', 'Hubungan sihat'];
  const cardsOut = interpolate(f, [aRamai - 4, aRamai + 4], [1, 0], clamp);
  const g = interpolate(f, [aRamai, aRamai + 40], [0, 1], clamp);
  const line: string[] = [];
  const N = 40;
  for (let i = 0; i <= N; i++) {
    const k = i / N;
    const y = 300 - k * 220 + Math.sin(k * 18) * 26 * (1 - k);
    line.push(`${i ? 'L' : 'M'} ${(k * 760).toFixed(1)} ${y.toFixed(1)}`);
  }
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 60%, ${C.green}88 100%)`}} />
      <Glow x={540} y={900} r={560} color={C.green} opacity={0.3} />
      <Pop at={aRawat} style={{left: 0, width: 1080, top: 470, display: 'flex', justifyContent: 'center'}}>
        <Pill text="✓ BOLEH DIRAWAT" bg={C.green} size={56} />
      </Pop>
      {cardsOut > 0 ? (
        <>
          <Pop at={aPsiko} style={{left: 60, top: 610}}>
            <div style={{opacity: cardsOut, display: 'flex', alignItems: 'center', gap: 18, background: C.navy, borderRadius: 36, padding: '14px 30px 14px 16px', boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
              <Icon name="chat" size={90} />
              <div>
                <Txt size={30} color={C.violet[4]}>Rawatan utama</Txt>
                <Txt size={50}>Psikoterapi</Txt>
              </div>
            </div>
          </Pop>
          {f >= aDBT ? (
            <div style={{position: 'absolute', left: 60, top: 790, width: 600, background: '#fff', borderRadius: 36, padding: '22px 28px', opacity: popOpacity(f - aDBT) * cardsOut, transform: `scale(${popScale(f - aDBT)})`, transformOrigin: 'left top', boxShadow: '0 20px 50px rgba(18,11,51,.5)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                <Pill text="DBT" bg={C.labelPink} size={44} />
                <Txt size={30} color={C.navy}>Dialectical Behaviour Therapy</Txt>
              </div>
              {skills.map((s, i) => {
                const a = aDBT + 10 + i * 7;
                return (
                  <div key={i} style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 14, opacity: popOpacity(f - a), transform: `translateX(${interpolate(f - a, [0, 8], [-30, 0], clamp)}px)`}}>
                    <BI name={(['leaf', 'shield', 'heart', 'hands'] as BIcon[])[i]} size={52} />
                    <Txt size={36} color={C.navy}>{s}</Txt>
                  </div>
                );
              })}
            </div>
          ) : null}
        </>
      ) : null}
      {/* graf pulih */}
      {f >= aRamai ? (
        <div style={{position: 'absolute', left: 90, top: 600, width: 900, background: C.navy, borderRadius: 40, padding: '26px 40px', opacity: popOpacity(f - aRamai), boxShadow: '0 20px 50px rgba(18,11,51,.55)'}}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Txt size={36} color={C.labelPink}>Sukar</Txt>
            <Txt size={36} color={C.green}>Pulih ketara</Txt>
          </div>
          <svg width={820} height={330} viewBox="0 0 760 330" style={{marginTop: 8}}>
            <path d={line.join(' ')} stroke={C.green} strokeWidth={12} fill="none" strokeLinecap="round" strokeDasharray={1400} strokeDashoffset={1400 * (1 - g)} />
          </svg>
          <Txt size={34} style={{textAlign: 'center'}}>dari masa ke masa</Txt>
        </div>
      ) : null}
      <Who preset={p.preset} x={f >= aRamai ? 330 : 640} y={f >= aRamai ? 1120 : 1080} w={f >= aRamai ? 420 : 400} mood="happy" pose={f >= aDBT && f < aRamai ? 'point' : 'clasp'} />
    </Camera>
  );
};

/* ================= 15 — Setahun kemudian: Sofea tenang, tak lagi seorang diri ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSukar = at(p, 'sukar', 2.4);
  const aKini = at(p, 'Tapi kini', 3.1);
  const aTenang = at(p, 'menenangkan', 4.6);
  const aJuang = at(p, 'tak lagi', 5.9);
  const breath = 0.5 + 0.5 * Math.sin((f - aTenang) / 14);
  const join = interpolate(f, [aJuang, aJuang + 18], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const warm = interpolate(f, [aKini - 4, aKini + 16], [0, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.06} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[1]} 60%, ${C.pink[0]} 100%)`}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.violet[3]} 0%, #F7B58C 100%)`, opacity: warm * 0.7}} />
      <Glow x={540} y={1100} r={560} color={C.green} opacity={0.2 + warm * 0.2} />
      <Pop at={2} style={{left: 60, top: 480}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 40, padding: '12px 30px 12px 16px', boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <Icon name="calendar" size={80} />
          <Txt size={46} color={C.navy}>+1 tahun</Txt>
        </div>
      </Pop>
      {/* awan kecil "hari sukar" berlalu */}
      {f >= aSukar ? (
        <div style={{position: 'absolute', left: 620 + (f - aSukar) * 3, top: 520, opacity: popOpacity(f - aSukar) * (1 - warm * 0.8)}}>
          <svg width={260} height={130} viewBox="0 0 260 130">
            <g fill="#8E9AC4">
              <circle cx={70} cy={80} r={50} />
              <circle cx={140} cy={56} r={60} />
              <circle cx={200} cy={84} r={44} />
              <rect x={30} y={80} width={200} height={50} rx={25} />
            </g>
          </svg>
        </div>
      ) : null}
      {/* bulatan pernafasan */}
      {f >= aTenang ? (
        <div style={{position: 'absolute', left: 540 - 260, top: 900 - 260, width: 520, height: 520, borderRadius: 260, border: `10px solid ${C.green}`, opacity: 0.6 * popOpacity(f - aTenang), transform: `scale(${0.75 + breath * 0.3})`}} />
      ) : null}
      <Pop at={aTenang} style={{left: 0, width: 1080, top: 650, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Tarik nafas... tenang" bg={C.green} size={46} />
      </Pop>
      {/* kakak & kawan datang menyokong */}
      {f >= aJuang ? (
        <>
          <Who preset={KAKAK} x={-260 + join * 260} y={1050} w={380} mood="happy" pose="clasp" seed={5} />
          <Who preset={KAWAN1} x={960 - join * 260} y={1060} w={360} mood="happy" pose="wave" seed={3} />
        </>
      ) : null}
      <Who preset={SOFEA} x={290} y={960} w={500} mood={f >= aKini ? 'happy' : 'neutral'} pose={f >= aJuang ? 'wave' : 'clasp'} seed={1} />
      <Pop at={aJuang + 8} style={{left: 0, width: 1080, top: 790, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Tak lagi seorang diri" bg={C.yellow} color={C.navy} size={50} />
      </Pop>
    </Camera>
  );
};

/* ================= 16 — Penutup (tiada CTA klinik) ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTunggu = at(p, 'jangan tunggu', 2.9);
  const aBantu = at(p, 'Dapatkan', 3.7);
  const aSaya = at(p, 'Saya Doktor', 5.6);
  return (
    <Camera dur={p.dur} to={1.06} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 60%, ${C.pink[2]} 100%)`}} />
      <NightSky seed={23} glow={C.pink[0]} top="transparent" bottom="transparent" stars={50} />
      <Glow x={540} y={1000} r={560} color={C.green} opacity={0.25} />
      <Pop at={aTunggu} style={{left: 0, width: 1080, top: 500, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />
      </Pop>
      <Pop at={aBantu} style={{left: 0, width: 1080, top: 640, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, background: C.green, padding: '14px 34px 14px 18px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <Icon name="family" size={80} />
          <Txt size={44}>Dapatkan bantuan profesional</Txt>
        </div>
      </Pop>
      <Who preset={p.preset} x={250} y={880} w={580} mood="happy" pose={f >= aSaya ? 'wave' : 'clasp'} />
      <Pop at={aSaya} style={{left: 0, width: 1080, top: 1400, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Dr. Azren" bg={C.labelPink} size={58} />
      </Pop>
      <div style={{position: 'absolute', left: 0, top: 1650, width: 1080, textAlign: 'center', opacity: interpolate(f, [aSaya, aSaya + 10], [0, 1], clamp)}}>
        <Txt size={30} color={C.violet[4]}>Video ini untuk pendidikan, bukan diagnosis.</Txt>
      </div>
    </Camera>
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  pagi: Pagi,
  malam: Malam,
  mesej: Mesej,
  emosi: Emosi,
  kakak: Kakak,
  diagnosis: Diagnosis,
  apa: Apa,
  lima: Lima,
  t1: T1,
  t2: T2,
  t3: T3,
  t4: T4,
  t5: T5,
  punca: Punca,
  rawat: Rawat,
  pulih: Pulih,
  penutup: Penutup,
};

export {BigHeart, BI};
