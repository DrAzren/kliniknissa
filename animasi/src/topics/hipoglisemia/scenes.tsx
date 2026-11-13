import React from 'react';
import {AbsoluteFill, Easing, interpolate, random, useCurrentFrame} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset, Mood, Pose} from '../../components/Avatar';
import {Camera, clamp, Glow, NightSky, Pill, Pop, popScale} from '../../components/common';
import {WordsFile, wordTime} from '../../lib/timeline';

export type SceneProps = {preset: AvatarPreset; dur: number; wf: WordsFile; start: number; fps: number};

/* ---------- watak cerita (rekaan, khas topik ini) ---------- */
export const KAMAL: AvatarPreset = {
  id: 'kamal', skin: '#C08A62', skinShade: '#A4714B', hair: 'short-grey', hairColor: '#8F8A99', top: 'tee', topColor: '#2E8B7A', topShade: '#226B5E',
  accessory: null, stubble: true, moustache: true,
};
export const ANAK: AvatarPreset = {
  id: 'anak-kamal', skin: '#D49C74', skinShade: '#B9805A', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#E4629F', topShade: '#C24A82',
  hijabColor: '#F6C945', hijabShade: '#D9AA2A', accessory: null,
};

const RED = '#D9485F';
const GREEN = '#3FBF7F';
const ORANGE = '#F08A24';
const BLUE = '#4F8FE0';
const SUGAR = '#FFF6E8';
const HONEY = '#F2A622';
const AMBER = '#F7B733';

const at = (p: SceneProps, phrase: string, fallbackSec: number) => {
  const t = wordTime(p.wf, phrase, p.start, p.start + fallbackSec);
  return Math.max(0, Math.round((t - p.start) * p.fps));
};

const Txt: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 44, color = '#fff', style}) => (
  <div style={{fontFamily: FONT, fontWeight: 800, fontSize: size, color, lineHeight: 1.12, ...style}}>{children}</div>
);

const Who: React.FC<{preset: AvatarPreset; x: number; y: number; w: number; style?: React.CSSProperties; mood?: Mood; pose?: Pose; seed?: number; silhouette?: boolean}> = ({preset, x, y, w, style, ...rest}) => (
  <div style={{position: 'absolute', left: x, top: y, ...style}}>
    <Avatar preset={preset} width={w} {...rest} />
  </div>
);

/* Pak Cik Kamal = Avatar + kopiah putih (ikut pernafasan avatar) */
const Kamal: React.FC<{x: number; y: number; w: number; mood?: Mood; pose?: Pose; style?: React.CSSProperties; silhouette?: boolean}> = ({x, y, w, mood, pose, style, silhouette}) => {
  const f = useCurrentFrame();
  const seed = 2;
  const breathe = Math.sin(((f + seed * 17) / 30) * Math.PI * 0.5) * 4;
  return (
    <div style={{position: 'absolute', left: x, top: y, ...style}}>
      <Avatar preset={KAMAL} width={w} mood={mood} pose={pose} seed={seed} silhouette={silhouette} />
      <svg viewBox="0 0 600 760" width={w} height={(w * 760) / 600} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
        <g transform={`translate(0 ${breathe})`}>
          <path d="M 146 156 C 140 70 214 28 300 28 C 386 28 460 70 454 156 C 384 136 216 136 146 156 Z" fill={silhouette ? C.shadow : '#F7F3EA'} />
          {!silhouette ? <path d="M 146 156 C 216 136 384 136 454 156 L 452 140 C 384 120 216 120 148 140 Z" fill="#D9D2C2" /> : null}
          {!silhouette ? [0, 1, 2, 3, 4, 5, 6].map((i) => <circle key={i} cx={196 + i * 35} cy={100 - Math.sin((i / 6) * Math.PI) * 18} r={5} fill="#D9D2C2" />) : null}
        </g>
      </svg>
    </div>
  );
};

const Bubble: React.FC<{children: React.ReactNode; bg?: string; color?: string; size?: number}> = ({children, bg = '#fff', color = C.navy, size = 46}) => (
  <div style={{position: 'relative', background: bg, color, borderRadius: 40, padding: `${size * 0.45}px ${size * 0.7}px`, fontFamily: FONT, fontWeight: 800, fontSize: size, lineHeight: 1.12, boxShadow: '0 14px 34px rgba(18,11,51,.45)', whiteSpace: 'nowrap'}}>
    {children}
  </div>
);

/* ================= ikon khas topik (viewBox 120) ================= */
export type HIconName = 'pen' | 'plate' | 'plateFull' | 'surau' | 'hand' | 'drop' | 'heart' | 'question' | 'hungry' | 'faint' | 'pill' | 'shoe' | 'spoon' | 'honey' | 'glass' | 'phone' | 'cup' | 'meter' | 'tube' | 'ring' | 'check' | 'warn';
export const HIcon: React.FC<{name: HIconName; size?: number; f?: number}> = ({name, size = 120, f = 0}) => {
  const w = '#fff', nv = C.navy, y = C.yellow;
  const body = (() => {
    switch (name) {
      case 'pen':
        return (
          <g transform="rotate(-40 60 60)">
            <rect x={48} y={6} width={24} height={20} rx={6} fill={C.violet[1]} />
            <rect x={44} y={24} width={32} height={66} rx={10} fill={w} />
            <rect x={50} y={40} width={20} height={26} rx={4} fill={AMBER} />
            <rect x={52} y={88} width={16} height={10} fill="#C9C3D9" />
            <path d="M 58 98 L 60 116 L 62 98 Z" fill="#C9C3D9" />
          </g>
        );
      case 'plate':
      case 'plateFull':
        return (
          <g>
            <ellipse cx={60} cy={70} rx={54} ry={36} fill={w} />
            <ellipse cx={60} cy={66} rx={38} ry={24} fill="#E9E4F5" />
            {name === 'plateFull' ? (
              <g>
                <ellipse cx={50} cy={62} rx={22} ry={13} fill={w} stroke="#E0D9EE" strokeWidth={3} />
                <circle cx={74} cy={58} r={10} fill={GREEN} />
                <ellipse cx={72} cy={72} rx={14} ry={7} fill={ORANGE} />
              </g>
            ) : null}
            <path d="M 8 30 L 8 58 M 2 30 L 2 46 M 14 30 L 14 46" stroke="#C9C3D9" strokeWidth={4} strokeLinecap="round" />
            <path d="M 112 28 Q 120 44 112 60 L 112 104" stroke="#C9C3D9" strokeWidth={5} strokeLinecap="round" fill="none" />
          </g>
        );
      case 'surau':
        return (
          <g>
            <rect x={16} y={62} width={88} height={50} fill={w} />
            <path d="M 24 64 Q 24 20 60 14 Q 96 20 96 64 Z" fill={C.green} />
            <path d="M 60 14 L 60 2" stroke={y} strokeWidth={4} />
            <path d="M 54 6 Q 60 0 66 6 Q 60 4 54 6" fill={y} />
            <path d="M 50 112 L 50 86 Q 60 74 70 86 L 70 112 Z" fill={C.violet[1]} />
            <rect x={2} y={40} width={10} height={72} fill={w} />
            <path d="M 0 40 L 7 24 L 14 40 Z" fill={C.green} />
          </g>
        );
      case 'hand': {
        const j = Math.sin(f * 2.2) * 5;
        return (
          <g transform={`translate(${j} 0)`}>
            <rect x={30} y={50} width={60} height={56} rx={22} fill="#E2B48C" />
            {[0, 1, 2, 3].map((i) => <rect key={i} x={30 + i * 15} y={14 + (i === 0 || i === 3 ? 10 : 0)} width={13} height={50} rx={6.5} fill="#E2B48C" />)}
            <rect x={80} y={56} width={30} height={14} rx={7} fill="#E2B48C" transform="rotate(-30 80 62)" />
            <path d="M 10 30 L 18 40 M 6 60 L 18 60 M 110 24 L 102 36" stroke={y} strokeWidth={5} strokeLinecap="round" />
          </g>
        );
      }
      case 'drop':
        return (
          <g>
            <path d="M 60 8 Q 100 58 100 80 A 40 40 0 0 1 20 80 Q 20 58 60 8 Z" fill="#8FD0F5" />
            <path d="M 44 72 Q 44 58 54 50" stroke={w} strokeWidth={7} strokeLinecap="round" fill="none" opacity={0.8} />
            <path d="M 96 14 L 96 30 M 88 22 L 104 22 M 90 16 L 102 28 M 102 16 L 90 28" stroke={w} strokeWidth={3} strokeLinecap="round" />
          </g>
        );
      case 'heart': {
        const s = 1 + 0.12 * Math.max(0, Math.sin(f * 0.9)) ** 6;
        return (
          <g transform={`translate(60 62) scale(${s}) translate(-60 -62)`}>
            <path d="M 60 104 C 20 76 6 56 6 38 A 26 26 0 0 1 60 28 A 26 26 0 0 1 114 38 C 114 56 100 76 60 104 Z" fill={RED} />
            <path d="M 14 60 L 38 60 L 46 44 L 56 76 L 66 52 L 72 60 L 106 60" stroke={w} strokeWidth={5} fill="none" strokeLinejoin="round" strokeLinecap="round" />
          </g>
        );
      }
      case 'question':
        return (
          <g>
            <circle cx={60} cy={60} r={52} fill={C.violet[3]} />
            <text x={60} y={84} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={74} fill={w} transform={`rotate(${Math.sin(f / 5) * 12} 60 60)`}>?</text>
          </g>
        );
      case 'hungry':
        return (
          <g>
            <ellipse cx={60} cy={64} rx={44} ry={48} fill="#F2C9A6" />
            <path d="M 34 62 Q 60 90 86 62" stroke={RED} strokeWidth={6} fill="none" strokeLinecap="round" />
            <path d="M 20 30 Q 30 20 40 30 M 80 30 Q 90 20 100 30" stroke={nv} strokeWidth={5} fill="none" strokeLinecap="round" />
            <text x={96} y={32} fontFamily={FONT} fontWeight={800} fontSize={30} fill={y} opacity={0.5 + 0.5 * Math.abs(Math.sin(f / 5))}>~</text>
          </g>
        );
      case 'faint':
        return (
          <g>
            <circle cx={60} cy={60} r={52} fill={RED} />
            {[0, 1, 2].map((i) => {
              const a = f / 6 + (i * Math.PI * 2) / 3;
              return <path key={i} d="M -8 0 L 0 -10 L 8 0 L 0 10 Z" fill={y} transform={`translate(${60 + Math.cos(a) * 32} ${34 + Math.sin(a) * 10})`} />;
            })}
            <path d="M 38 62 L 50 74 M 50 62 L 38 74 M 70 62 L 82 74 M 82 62 L 70 74" stroke={w} strokeWidth={5} strokeLinecap="round" />
            <ellipse cx={60} cy={92} rx={12} ry={7} fill={w} />
          </g>
        );
      case 'pill':
        return (
          <g>
            <rect x={30} y={24} width={60} height={86} rx={12} fill={ORANGE} />
            <rect x={24} y={10} width={72} height={22} rx={8} fill={w} />
            <rect x={38} y={50} width={44} height={40} rx={6} fill={w} />
            <rect x={44} y={62} width={32} height={16} rx={8} fill={C.violet[1]} />
          </g>
        );
      case 'shoe':
        return (
          <g transform={`translate(0 ${-Math.abs(Math.sin(f / 4)) * 8})`}>
            <path d="M 10 82 L 14 46 Q 40 52 54 36 L 70 52 Q 100 60 110 74 L 112 90 L 10 90 Z" fill={C.labelPink} />
            <rect x={8} y={88} width={106} height={14} rx={7} fill={w} />
            <path d="M 34 54 L 46 48 M 38 62 L 52 56 M 44 70 L 58 64" stroke={w} strokeWidth={4} strokeLinecap="round" />
            <path d="M 0 40 L -16 40 M 4 56 L -20 56 M 6 72 L -12 72" stroke={y} strokeWidth={5} strokeLinecap="round" />
          </g>
        );
      case 'spoon':
        return (
          <g transform="rotate(-30 60 60)">
            <ellipse cx={60} cy={36} rx={26} ry={30} fill="#D7D3E3" />
            <ellipse cx={60} cy={34} rx={20} ry={22} fill={SUGAR} />
            {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={50 + (i % 3) * 7} y={24 + Math.floor(i / 3) * 9} width={6} height={6} fill={w} stroke="#E8DCC8" strokeWidth={1} />)}
            <rect x={55} y={62} width={10} height={54} rx={5} fill="#D7D3E3" />
          </g>
        );
      case 'honey':
        return (
          <g>
            <rect x={22} y={34} width={76} height={78} rx={18} fill={HONEY} />
            <rect x={18} y={20} width={84} height={20} rx={8} fill="#B5651D" />
            <rect x={34} y={58} width={52} height={32} rx={8} fill="#FFE29A" />
            <text x={60} y={82} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={20} fill="#B5651D">MADU</text>
            <path d="M 98 40 Q 110 54 104 70" stroke={HONEY} strokeWidth={8} strokeLinecap="round" fill="none" />
          </g>
        );
      case 'glass':
        return (
          <g>
            <path d="M 24 14 L 96 14 L 86 110 L 34 110 Z" fill="rgba(255,255,255,0.35)" stroke={w} strokeWidth={4} />
            <path d="M 30 44 L 90 44 L 86 106 L 34 106 Z" fill="#CFEAFB" />
            {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={42 + i * 9} cy={96 - ((f * 1.5 + i * 13) % 50)} r={3} fill={w} />)}
          </g>
        );
      case 'phone': {
        const ring = Math.sin(f * 1.3) * 6;
        return (
          <g>
            <g transform={`rotate(${ring} 60 60)`}>
              <rect x={30} y={8} width={60} height={104} rx={14} fill={nv} />
              <rect x={36} y={20} width={48} height={74} rx={6} fill={GREEN} />
              <text x={60} y={66} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={26} fill={w}>999</text>
              <circle cx={60} cy={102} r={5} fill={w} />
            </g>
            {[0, 1].map((i) => <path key={i} d={`M ${100 + i * 10} ${30 - i * 6} Q ${112 + i * 12} 60 ${100 + i * 10} ${90 + i * 6}`} stroke={y} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.5 + 0.5 * Math.abs(Math.sin(f / 4 + i))} />)}
          </g>
        );
      }
      case 'cup':
        return (
          <g>
            <path d="M 22 30 L 86 30 L 80 106 L 28 106 Z" fill={w} />
            <path d="M 86 44 Q 112 46 108 70 Q 104 88 82 86" stroke={w} strokeWidth={8} fill="none" />
            <ellipse cx={54} cy={34} rx={30} ry={6} fill={ORANGE} />
          </g>
        );
      case 'meter':
        return (
          <g>
            <rect x={22} y={10} width={76} height={100} rx={18} fill={nv} stroke={w} strokeWidth={4} />
            <rect x={32} y={22} width={56} height={40} rx={6} fill="#CFEAFB" />
            <text x={60} y={52} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={22} fill={nv}>mmol</text>
            <circle cx={60} cy={82} r={10} fill={C.violet[3]} />
            <rect x={52} y={104} width={16} height={16} fill={w} />
          </g>
        );
      case 'tube':
        return (
          <g transform="rotate(20 60 60)">
            <rect x={42} y={8} width={36} height={18} rx={5} fill={C.violet[1]} />
            <path d="M 46 24 L 74 24 L 74 98 A 14 14 0 0 1 46 98 Z" fill={w} />
            <path d="M 48 56 L 72 56 L 72 98 A 12 12 0 0 1 48 98 Z" fill={RED} />
          </g>
        );
      case 'ring':
        return <circle cx={60} cy={60} r={42} fill="none" stroke={BLUE} strokeWidth={18} />;
      case 'check':
        return (
          <g>
            <circle cx={60} cy={60} r={52} fill={GREEN} />
            <path d="M 34 62 L 52 80 L 88 42" stroke={w} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      case 'warn':
        return (
          <g>
            <path d="M 60 8 L 114 106 L 6 106 Z" fill={y} />
            <rect x={54} y={40} width={12} height={38} rx={6} fill={nv} />
            <circle cx={60} cy={90} r={7} fill={nv} />
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

/* kad ikon + teks */
const Chip: React.FC<{icon: HIconName; text: React.ReactNode; bg?: string; color?: string; w?: number; f?: number; size?: number}> = ({icon, text, bg = C.navy, color = '#fff', w = 520, f = 0, size = 42}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 20, width: w, background: bg, borderRadius: 34, padding: '14px 26px 14px 16px', boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
    <div style={{width: 92, height: 92, borderRadius: 26, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
      <HIcon name={icon} size={76} f={f} />
    </div>
    <Txt size={size} color={color}>{text}</Txt>
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

/* ================= Tolok gula darah (separuh bulatan, 0–15 mmol/L) ================= */
const MAXG = 15;
const angOf = (v: number) => -90 + (Math.max(0, Math.min(MAXG, v)) / MAXG) * 180;
const arc = (r: number, a0: number, a1: number) => {
  const p = (a: number) => [300 + r * Math.sin((a * Math.PI) / 180), 320 - r * Math.cos((a * Math.PI) / 180)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return `M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`;
};
export const Gauge: React.FC<{value: number; width?: number; showText?: boolean; glow?: boolean}> = ({value, width = 700, showText = true, glow = true}) => {
  const f = useCurrentFrame();
  const a = angOf(value);
  const col = value < 3.9 ? RED : value <= 7.8 ? GREEN : ORANGE;
  const ticks = [0, 3.9, 7.8, 11, 15];
  return (
    <svg viewBox="0 0 600 400" width={width} height={(width * 400) / 600} style={{overflow: 'visible'}}>
      <defs>
        <radialGradient id="gface" cx="50%" cy="80%" r="80%">
          <stop offset="0%" stopColor="#2B2470" />
          <stop offset="100%" stopColor="#14103A" />
        </radialGradient>
      </defs>
      <path d="M 20 330 A 280 280 0 0 1 580 330 L 580 360 Q 580 380 560 380 L 40 380 Q 20 380 20 360 Z" fill="url(#gface)" />
      <path d={arc(240, angOf(0), angOf(3.9))} stroke={RED} strokeWidth={42} fill="none" />
      <path d={arc(240, angOf(3.9), angOf(7.8))} stroke={GREEN} strokeWidth={42} fill="none" />
      <path d={arc(240, angOf(7.8), angOf(15))} stroke={ORANGE} strokeWidth={42} fill="none" />
      {ticks.map((t) => {
        const r0 = 196, r1 = 176;
        const an = (angOf(t) * Math.PI) / 180;
        return (
          <g key={t}>
            <path d={`M ${300 + r0 * Math.sin(an)} ${320 - r0 * Math.cos(an)} L ${300 + r1 * Math.sin(an)} ${320 - r1 * Math.cos(an)}`} stroke="#fff" strokeWidth={5} strokeLinecap="round" />
            {t === 3.9 ? <text x={300 + 150 * Math.sin(an)} y={334 - 150 * Math.cos(an)} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill={C.yellow}>3.9</text> : null}
          </g>
        );
      })}
      {glow ? <circle cx={300} cy={320} r={120} fill={col} opacity={0.12 + 0.06 * Math.sin(f / 6)} /> : null}
      <g transform={`rotate(${a} 300 320)`}>
        <path d="M 288 320 L 300 92 L 312 320 Z" fill="#fff" />
      </g>
      <circle cx={300} cy={320} r={28} fill="#fff" />
      <circle cx={300} cy={320} r={14} fill={col} />
      {showText ? (
        <text x={300} y={372} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill={col}>
          {value.toFixed(1)} mmol/L
        </text>
      ) : null}
    </svg>
  );
};

/* ================= Glukometer ================= */
const Glucometer: React.FC<{value: number | null; width?: number; drop?: boolean}> = ({value, width = 420, drop}) => {
  const f = useCurrentFrame();
  const col = value === null ? C.navy : value < 3.9 ? RED : GREEN;
  return (
    <svg viewBox="0 0 300 440" width={width} height={(width * 440) / 300} style={{overflow: 'visible'}}>
      <defs>
        <linearGradient id="gmbody" x1="0" x2="1">
          <stop offset="0%" stopColor="#3A3290" />
          <stop offset="55%" stopColor="#2A2470" />
          <stop offset="100%" stopColor="#1A1650" />
        </linearGradient>
      </defs>
      <rect x={20} y={10} width={260} height={360} rx={56} fill="url(#gmbody)" />
      <rect x={36} y={22} width={60} height={300} rx={30} fill="#fff" opacity={0.08} />
      <rect x={52} y={52} width={196} height={150} rx={20} fill="#D8F0FF" />
      <text x={150} y={150} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={value === null ? 70 : 88} fill={col}>
        {value === null ? (Math.floor(f / 8) % 2 ? '- - -' : '') : value.toFixed(1)}
      </text>
      <text x={150} y={190} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={24} fill={C.navy}>mmol/L</text>
      <circle cx={110} cy={268} r={26} fill={C.violet[3]} />
      <circle cx={190} cy={268} r={26} fill={C.labelPink} />
      {/* jalur ujian */}
      <rect x={130} y={360} width={40} height={80} rx={4} fill="#F4F1FA" />
      <rect x={138} y={416} width={24} height={12} rx={3} fill={RED} opacity={drop ? 1 : 0.2} />
    </svg>
  );
};

/* ================= Sel otak "3D" dengan tangki minyak & lampu ================= */
const Neuron: React.FC<{fuel: number; light: number; flicker?: boolean; width?: number; sugarIn?: number}> = ({fuel, light, flicker, width = 760, sugarIn = 0}) => {
  const f = useCurrentFrame();
  const tips: [number, number][] = [
    [80, 120], [220, 40], [400, 30], [540, 120], [580, 330], [500, 520], [100, 520], [30, 330],
  ];
  const lampOn = (i: number) => {
    if (!flicker) return light;
    const r = random(`fl${i}${Math.floor(f / 3)}`);
    return light * (r > 0.45 ? 1 : 0.12);
  };
  const lvl = Math.max(0, Math.min(1, fuel));
  const tankTop = 236, tankH = 128;
  const wobble = Math.sin(f / 8) * 4;
  return (
    <div style={{width, height: (width * 600) / 620, transform: `perspective(1400px) rotateY(${Math.sin(f / 40) * 12}deg) rotateX(${8 + Math.sin(f / 55) * 4}deg)`}}>
      <svg viewBox="0 0 620 600" width={width} height={(width * 600) / 620} style={{overflow: 'visible'}}>
        <defs>
          <radialGradient id="soma" cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#F7B9D4" />
            <stop offset="45%" stopColor="#D9679C" />
            <stop offset="100%" stopColor="#7A2E66" />
          </radialGradient>
          <linearGradient id="fuel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE08A" />
            <stop offset="100%" stopColor={AMBER} />
          </linearGradient>
          <radialGradient id="bulb" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#FFFBE6" />
            <stop offset="60%" stopColor="#FFD54A" />
            <stop offset="100%" stopColor="#E89B12" />
          </radialGradient>
          <clipPath id="tankclip">
            <rect x={240} y={tankTop} width={140} height={tankH} rx={26} />
          </clipPath>
        </defs>
        {/* dendrit */}
        {tips.map(([x, y], i) => (
          <path key={i} d={`M 310 300 Q ${(310 + x) / 2 + Math.sin(i * 2.1) * 50} ${(300 + y) / 2 + Math.cos(i * 1.7) * 50} ${x} ${y}`} stroke="#B84B86" strokeWidth={22 - (i % 3) * 3} fill="none" strokeLinecap="round" />
        ))}
        {/* lampu di hujung dendrit */}
        {tips.map(([x, y], i) => {
          const on = lampOn(i);
          return (
            <g key={`l${i}`}>
              <circle cx={x} cy={y} r={70} fill="#FFD54A" opacity={0.35 * on} style={{filter: 'blur(14px)'}} />
              <circle cx={x} cy={y} r={30} fill={on > 0.3 ? 'url(#bulb)' : '#5C5470'} />
              <circle cx={x} cy={y} r={30} fill="#3B3355" opacity={(1 - on) * 0.7} />
              <ellipse cx={x - 9} cy={y - 10} rx={9} ry={6} fill="#fff" opacity={0.6} />
            </g>
          );
        })}
        {/* badan sel (soma) */}
        <ellipse cx={318} cy={322} rx={190} ry={170} fill="#120B33" opacity={0.35} />
        <ellipse cx={310} cy={300} rx={190} ry={170} fill="url(#soma)" />
        <ellipse cx={250} cy={210} rx={70} ry={34} fill="#fff" opacity={0.22} transform="rotate(-20 250 210)" />
        {/* tangki minyak */}
        <rect x={234} y={tankTop - 6} width={152} height={tankH + 12} rx={30} fill="#2A1F4A" />
        <g clipPath="url(#tankclip)">
          <rect x={240} y={tankTop} width={140} height={tankH} fill="#1B1538" />
          <path d={`M 240 ${tankTop + tankH * (1 - lvl) + wobble} Q 275 ${tankTop + tankH * (1 - lvl) - 8} 310 ${tankTop + tankH * (1 - lvl)} T 380 ${tankTop + tankH * (1 - lvl) - wobble} L 380 ${tankTop + tankH} L 240 ${tankTop + tankH} Z`} fill="url(#fuel)" />
        </g>
        <rect x={256} y={tankTop + 8} width={14} height={tankH - 16} rx={7} fill="#fff" opacity={0.18} />
        <text x={310} y={tankTop - 18} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={28} fill="#fff">GULA</text>
        {/* kiub gula masuk */}
        {sugarIn > 0
          ? [0, 1, 2, 3, 4, 5].map((i) => {
              const t = (sugarIn * 1.6 - i * 0.12) % 1;
              if (t < 0 || sugarIn * 1.6 - i * 0.12 < 0) return null;
              const x = 520 - t * 210 + Math.sin(i) * 20;
              const yy = 60 + t * (tankTop + 20 - 60);
              return <rect key={i} x={x - 14} y={yy - 14} width={28} height={28} rx={5} fill={SUGAR} stroke="#E8DCC8" strokeWidth={3} opacity={t < 0.92 ? 1 : 0} transform={`rotate(${t * 200} ${x} ${yy})`} />;
            })
          : null}
      </svg>
    </div>
  );
};

/* ================= Pemasa 15 minit ================= */
const Timer: React.FC<{p: number; size?: number}> = ({p, size = 460}) => {
  const left = Math.max(0, 15 * 60 * (1 - p));
  const mm = Math.floor(left / 60);
  const ss = Math.floor(left % 60);
  const r = 180, L = 2 * Math.PI * r;
  const col = p >= 1 ? GREEN : C.yellow;
  return (
    <svg viewBox="0 0 440 440" width={size} height={size} style={{overflow: 'visible'}}>
      <circle cx={220} cy={220} r={210} fill={C.navy} />
      <circle cx={220} cy={220} r={r} stroke="#3B3570" strokeWidth={30} fill="none" />
      <circle cx={220} cy={220} r={r} stroke={col} strokeWidth={30} fill="none" strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * p} transform="rotate(-90 220 220)" />
      <text x={220} y={240} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={104} fill="#fff">
        {`${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`}
      </text>
      <text x={220} y={300} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={34} fill={C.violet[4]}>MINIT</text>
      <rect x={196} y={-6} width={48} height={24} rx={8} fill={C.navy} />
    </svg>
  );
};

/* ================= 0 — Hook: pengsan… sebab gula terlalu RENDAH ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aPeng = at(p, 'pengsan', 1.36);
  const aTing = at(p, 'tinggi', 3.6);
  const aTapi = at(p, 'tapi', 4.48);
  const aRen = at(p, 'rendah', 6.84);
  const v =
    f < aTing
      ? interpolate(f, [0, aTing], [6.5, 7.5], clamp)
      : f < aTapi
        ? interpolate(f, [aTing, aTing + 10], [7.5, 13.5], {...clamp, easing: Easing.out(Easing.back(1.6))})
        : interpolate(f, [aTapi, aRen, aRen + 8], [13.5, 6, 1.8], {...clamp, easing: Easing.in(Easing.quad)});
  const shake = f >= aRen && f < aRen + 12 ? Math.sin(f * 3) * 12 : 0;
  const flash = f >= aRen ? interpolate(f - aRen, [0, 3, 14], [0, 0.45, 0], clamp) : 0;
  const fall = interpolate(f, [aPeng, aPeng + 18], [0, -78], {...clamp, easing: Easing.in(Easing.quad)});
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={11} glow={f >= aRen ? C.labelPink : C.violet[2]} />
      <Glow x={540} y={880} r={540} color={f >= aRen ? RED : C.violet[3]} opacity={0.3} />
      <Pop at={2} style={{left: 0, width: 1080, top: 500, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Pesakit diabetes boleh…" bg={C.navy} color={C.yellow} size={46} />
      </Pop>
      <div style={{position: 'absolute', left: 140 + shake, top: 620}}>
        <Gauge value={v} width={800} showText={false} />
      </div>
      {f >= aTing && f < aRen ? (
        <Pop at={aTing} style={{left: 700, top: 1000}}>
          <div style={{position: 'relative', width: 300, padding: '12px 0', textAlign: 'center', background: ORANGE, borderRadius: 30}}>
            <Txt size={44}>TINGGI?</Txt>
            <div style={{position: 'absolute', left: 60, top: -40}}>{f >= aTapi ? <Cross f={f - aTapi} size={180} /> : null}</div>
          </div>
        </Pop>
      ) : null}
      <Pop at={aRen} style={{left: 0, width: 1080, top: 1060, display: 'flex', justifyContent: 'center'}}>
        <Txt size={170} color={C.labelPink} style={{textShadow: '0 10px 0 rgba(18,11,51,.6)', letterSpacing: 4, transform: `translateX(${shake}px)`}}>RENDAH!</Txt>
      </Pop>
      <Pop at={aPeng} style={{left: 0, width: 1080, top: 1330, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, background: C.navy, padding: '12px 40px 12px 16px', borderRadius: 50, boxShadow: '0 14px 34px rgba(18,11,51,.5)', transform: `rotate(${fall * 0.05}deg)`}}>
          <HIcon name="faint" size={96} f={f} />
          <Txt size={60} color="#fff">PENGSAN</Txt>
        </div>
      </Pop>
      <AbsoluteFill style={{background: RED, opacity: flash}} />
    </Camera>
  );
};

/* ================= 1 — Pagi: insulin, tak sarapan, terus gotong-royong ================= */
export const Pagi: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKam = at(p, 'kamal', 0.3);
  const aKen = at(p, 'kencing', 2.0);
  const aIns = at(p, 'insulin', 4.1);
  const aSar = at(p, 'sarapan', 5.7);
  const aGot = at(p, 'gotong-royong', 6.8);
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.violet[0]} 0%, ${C.pink[0]} 60%, #F6A86B 100%)`}} />
      <div style={{position: 'absolute', left: 860, top: 560, width: 150, height: 150, borderRadius: 75, background: '#FFC24A', boxShadow: '0 0 80px #FFC24A'}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: '#7A4E8E'}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 26, background: '#9B6AB0'}} />
      <Pop at={aKam - 4} style={{left: 60, top: 500}} origin="left center">
        <Pill text="Pak Cik Kamal, 60 tahun" bg={C.navy} color={C.yellow} size={50} />
      </Pop>
      <Pop at={aKen} style={{left: 60, top: 620}} origin="left center">
        <Pill text="Kencing manis" bg={C.labelPink} size={46} />
      </Pop>
      <Kamal x={60} y={800} w={500} mood={f >= aGot ? 'happy' : 'neutral'} pose={f >= aGot ? 'wave' : f >= aIns ? 'clasp' : 'down'} />
      <Pop at={aIns} style={{left: 560, top: 780}}>
        <Chip icon="pen" text="Suntik insulin" w={480} f={f - aIns} bg={C.green} />
      </Pop>
      <Pop at={aSar} style={{left: 560, top: 930}}>
        <div style={{position: 'relative'}}>
          <Chip icon="plate" text="Tak sarapan" w={480} bg={RED} />
          <div style={{position: 'absolute', left: 18, top: 14}}>{f >= aSar + 6 ? <Cross f={f - aSar - 6} size={92} /> : null}</div>
        </div>
      </Pop>
      <Pop at={aGot} style={{left: 560, top: 1080}}>
        <Chip icon="surau" text="Gotong-royong di surau" w={480} size={36} />
      </Pop>
    </Camera>
  );
};

/* ================= 2 — Tengah hari: menggeletar, berpeluh sejuk, keliru → anak bawa ke klinik ================= */
export const Simptom: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aGel = at(p, 'menggeletar', 1.0);
  const aPel = at(p, 'berpeluh', 2.1);
  const aKel = at(p, 'keliru', 3.6);
  const aAnak = at(p, 'anaknya', 4.6);
  const aKli = at(p, 'klinik', 5.9);
  const shakeAmt = f >= aGel ? 5 : 0;
  const sym: {icon: HIconName; text: string; a: number; bg: string}[] = [
    {icon: 'hand', text: 'Menggeletar', a: aGel, bg: C.navy},
    {icon: 'drop', text: 'Berpeluh sejuk', a: aPel, bg: BLUE},
    {icon: 'question', text: 'Keliru', a: aKel, bg: C.violet[0]},
  ];
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, #F6C26B 0%, ${C.pink[0]} 55%, ${C.violet[0]} 100%)`}} />
      <div style={{position: 'absolute', left: 840, top: 520, width: 170, height: 170, borderRadius: 85, background: '#FFF1B8', boxShadow: '0 0 90px #FFE07A'}} />
      <div style={{position: 'absolute', left: 560, top: 1030, opacity: 0.4}}><HIcon name="surau" size={460} /></div>
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: '#3F8A5A'}} />
      <Pop at={2} style={{left: 60, top: 500}} origin="left center">
        <Pill text="Tengah hari…" bg={C.navy} color={C.yellow} size={48} />
      </Pop>
      <Kamal x={40 + Math.sin(f * 2.4) * shakeAmt} y={820} w={480} mood={f >= aKel ? 'sad' : f >= aGel ? 'tired' : 'neutral'} pose="clasp" />
      {/* peluh sejuk */}
      {f >= aPel
        ? [0, 1, 2, 3].map((i) => {
            const t = (f + i * 11) % 36;
            return <div key={i} style={{position: 'absolute', left: 140 + i * 85, top: 900 + t * 3, width: 20, height: 28, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: '#9FD6F7', opacity: interpolate(t, [0, 6, 28, 36], [0, 1, 1, 0])}} />;
          })
        : null}
      {/* tanda soal berpusing */}
      {f >= aKel
        ? [0, 1, 2].map((i) => {
            const a = f / 10 + (i * Math.PI * 2) / 3;
            return (
              <div key={i} style={{position: 'absolute', left: 260 + Math.cos(a) * 170, top: 810 + Math.sin(a) * 40, opacity: interpolate(f - aKel, [0, 6], [0, 1], clamp)}}>
                <Txt size={70} color={C.yellow}>?</Txt>
              </div>
            );
          })
        : null}
      {sym.map((s, i) => (
        <Pop key={s.text} at={s.a} style={{left: 560, top: 640 + i * 150}}>
          <Chip icon={s.icon} text={s.text} w={470} f={f - s.a} bg={s.bg} size={40} />
        </Pop>
      ))}
      <Pop at={aAnak} style={{left: 700, top: 1100}}>
        <Avatar preset={ANAK} width={330} mood="sad" pose="point" seed={4} />
      </Pop>
      <Pop at={aKli} style={{left: 40, top: 1560}} origin="left center">
        <div style={{display: 'flex', alignItems: 'center', gap: 18, background: '#fff', padding: '14px 34px 14px 18px', borderRadius: 30, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <div style={{width: 70, height: 70, borderRadius: 16, background: C.labelPink, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Txt size={60}>+</Txt>
          </div>
          <Txt size={56} color={C.navy}>KLINIK</Txt>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 3 — Glukometer: 2.8 mmol/L → HIPOGLISEMIA ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aJari = at(p, 'hujung', 1.0);
  const aDua = at(p, 'dua', 2.1);
  const aLap = at(p, 'lapan', 2.9);
  const aHipo = at(p, 'hai-po-glai-si-mia', 5.0);
  const val = f < aDua ? null : interpolate(f, [aDua, aLap + 4], [6.2, 2.8], {...clamp, easing: Easing.out(Easing.cubic)});
  const fingerY = interpolate(f, [aJari - 10, aJari + 6], [180, 0], {...clamp, easing: Easing.out(Easing.cubic)});
  const stamp = f >= aHipo - 4 ? interpolate(f - aHipo + 4, [0, 6, 10], [1.8, 0.94, 1], clamp) : 0;
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[3]} 0%, ${C.violet[2]} 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={820} r={480} color={val !== null && val < 3.9 ? RED : C.violet[3]} opacity={0.32} />
      <div style={{position: 'absolute', left: 330, top: 500}}>
        <Glucometer value={val} width={420} drop={f >= aJari} />
      </div>
      {/* jari dengan titis darah */}
      <div style={{position: 'absolute', left: 450, top: 1112 + fingerY, opacity: f >= aJari - 10 ? 1 : 0, transform: 'scaleY(-1)'}}>
        <svg width={180} height={260} viewBox="0 0 90 130">
          <rect x={22} y={0} width={46} height={110} rx={23} fill="#E2B48C" />
          <ellipse cx={45} cy={22} rx={14} ry={10} fill="#F2D2B6" />
          <path d="M 45 112 Q 56 124 45 130 Q 34 124 45 112 Z" fill={RED} />
        </svg>
      </div>
      <Who preset={p.preset} x={-20} y={1150} w={380} mood="curious" pose="point" />
      <Kamal x={730} y={1180} w={340} mood="tired" pose="clasp" />
      {stamp > 0 ? (
        <div style={{position: 'absolute', left: 0, width: 1080, top: 1300, display: 'flex', justifyContent: 'center'}}>
          <div style={{transform: `scale(${stamp}) rotate(-6deg)`, border: `10px solid ${C.labelPink}`, borderRadius: 26, padding: '10px 36px', background: 'rgba(18,11,51,0.85)'}}>
            <Txt size={92} color={C.labelPink} style={{letterSpacing: 3}}>HIPOGLISEMIA</Txt>
          </div>
        </div>
      ) : null}
    </Camera>
  );
};

/* ================= 4 — Otak: gula = minyak, minyak kering, lampu berkelip ================= */
export const Otak: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aGula = at(p, 'gula', 0.95);
  const aMin = at(p, 'minyak utama', 1.7);
  const aKer = at(p, 'kering', 3.6);
  const aLam = at(p, 'lampu', 4.3);
  const aKel = at(p, 'berkelip', 5.4);
  const fuel = interpolate(f, [0, aKer - 10, aLam + 6], [0.85, 0.6, 0.1], clamp);
  const light = interpolate(f, [aKer, aKel + 10], [1, 0.55], clamp);
  return (
    <Camera dur={p.dur} to={1.12} panY={-30}>
      <NightSky seed={17} glow={f >= aKer ? C.labelPink : C.violet[2]} dim={0.8} />
      <Glow x={540} y={940} r={560} color={f >= aKel ? '#5C4AA8' : '#FFD54A'} opacity={f >= aKel ? 0.25 : 0.2} />
      <div style={{position: 'absolute', left: 160, top: 620}}>
        <Neuron fuel={fuel} light={light} flicker={f >= aLam} width={760} />
      </div>
      <Pop at={4} style={{left: 0, width: 1080, top: 500, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Sel otak" bg={C.navy} color={C.yellow} size={46} />
      </Pop>
      <Pop at={aGula} style={{left: 0, width: 1080, top: 1380, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, background: '#fff', padding: '12px 34px 12px 16px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <HIcon name="spoon" size={80} />
          <Txt size={46} color={C.navy}>{f >= aMin ? 'Gula = minyak otak' : 'Gula…'}</Txt>
        </div>
      </Pop>
      <Pop at={aKer} style={{left: 0, width: 1080, top: 1530, display: 'flex', justifyContent: 'center'}}>
        <Pill text={f >= aKel ? 'Lampu otak berkelip!' : 'Minyak hampir kering!'} bg={C.labelPink} size={50} />
      </Pop>
    </Camera>
  );
};

/* ================= 5 — #1 Definisi: < 3.9 mmol/L ================= */
export const Definisi: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aHipo = at(p, 'hai-po-glai-si-mia', 0.8);
  const aBaw = at(p, 'bawah', 3.2);
  const aTiga = at(p, 'tiga', 3.9);
  const aMil = at(p, 'milimol', 5.2);
  const level = interpolate(f, [aBaw - 6, aMil + 6], [6.5, 2.8], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const top = 470, h = 880, maxV = 10;
  const yOf = (v: number) => top + h * (1 - v / maxV);
  const col = level < 3.9 ? RED : GREEN;
  return (
    <Camera dur={p.dur} to={1.06} panY={-10}>
      <NightSky seed={21} glow={f >= aTiga ? C.labelPink : C.violet[2]} />
      {/* bar gula darah */}
      <div style={{position: 'absolute', left: 90, top: top - 10, width: 200, height: h + 20, borderRadius: 100, background: C.navy, boxShadow: '0 20px 50px rgba(18,11,51,.5)'}} />
      <div style={{position: 'absolute', left: 116, top: yOf(maxV), width: 148, height: h, borderRadius: 74, overflow: 'hidden', background: '#2B2565'}}>
        <div style={{position: 'absolute', left: 0, top: yOf(level) - top, width: 148, height: h, background: `linear-gradient(180deg, ${col} 0%, ${col}AA 100%)`}} />
        <div style={{position: 'absolute', left: 0, top: yOf(3.9) - top, width: 148, height: h - (yOf(3.9) - top), background: RED, opacity: 0.25}} />
      </div>
      {[0, 2, 4, 6, 8, 10].map((v) => (
        <div key={v} style={{position: 'absolute', left: 300, top: yOf(v) - 18}}>
          <Txt size={30} color={C.violet[4]}>{v}</Txt>
        </div>
      ))}
      {/* garisan 3.9 */}
      <div style={{position: 'absolute', left: 70, top: yOf(3.9) - 4, width: interpolate(f, [aTiga - 4, aTiga + 8], [0, 900], clamp), height: 8, background: C.yellow, borderRadius: 4}} />
      <Pop at={aTiga} style={{left: 370, top: yOf(3.9) - 110}} origin="left center">
        <Pill text="3.9 mmol/L" bg={C.yellow} color={C.navy} size={48} />
      </Pop>
      <Pop at={aHipo} style={{left: 380, top: 560}} origin="left center">
        <div>
          <Txt size={80} color={C.labelPink}>HIPOGLISEMIA</Txt>
          <Txt size={44} color="#fff" style={{marginTop: 8}}>= gula darah terlalu rendah</Txt>
        </div>
      </Pop>
      <Pop at={aBaw} style={{left: 400, top: 1030}} origin="left center">
        <div style={{display: 'flex', alignItems: 'baseline', gap: 14}}>
          <Txt size={170} color={C.yellow} style={{textShadow: '0 8px 0 rgba(18,11,51,.6)'}}>{f >= aTiga ? '< 3.9' : '<'}</Txt>
        </div>
      </Pop>
      <Pop at={aMil} style={{left: 420, top: 1230}} origin="left center">
        <Txt size={52} color="#fff">mmol/L</Txt>
      </Pop>
      <Pop at={aBaw + 10} style={{left: 110, top: yOf(level) - 40}}>
        <div style={{width: 160, textAlign: 'center'}}>
          <Txt size={34} color="#fff">{level.toFixed(1)}</Txt>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 6 — #2 Tanda ================= */
export const Tanda: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const sym: {icon: HIconName; text: string; a: number; bg: string}[] = [
    {icon: 'hand', text: 'Menggeletar', a: at(p, 'menggeletar', 1.6), bg: C.navy},
    {icon: 'drop', text: 'Berpeluh sejuk', a: at(p, 'berpeluh', 2.6), bg: BLUE},
    {icon: 'heart', text: 'Jantung berdebar', a: at(p, 'jantung', 3.6), bg: C.violet[0]},
    {icon: 'hungry', text: 'Rasa lapar', a: at(p, 'lapar', 5.1), bg: C.navy},
    {icon: 'question', text: 'Keliru', a: at(p, 'keliru', 5.8), bg: C.violet[1]},
  ];
  const aTer = at(p, 'teruk', 6.9);
  const aPit = at(p, 'pitam', 7.9);
  const fall = interpolate(f, [aPit, aPit + 16], [0, 80], {...clamp, easing: Easing.in(Easing.quad)});
  return (
    <Camera dur={p.dur} to={1.05} panY={-10}>
      <NightSky seed={25} glow={f >= aTer ? RED : C.violet[2]} />
      {sym.map((s, i) => (
        <Pop key={s.text} at={s.a} style={{left: 40, top: 500 + i * 150}} origin="left center">
          <Chip icon={s.icon} text={s.text} w={540} f={f - s.a} bg={s.bg} size={42} />
        </Pop>
      ))}
      <div style={{position: 'absolute', left: 610, top: 760, transform: `rotate(${fall}deg)`, transformOrigin: '50% 100%'}}>
        <Kamal x={0} y={0} w={320} mood={f >= aPit ? 'tired' : f >= sym[4].a ? 'sad' : 'tired'} pose="clasp" style={{position: 'relative', transform: `translateX(${f >= sym[0].a && f < aPit ? Math.sin(f * 2.4) * 4 : 0}px)`}} />
      </div>
      <Pop at={aTer} style={{left: 0, width: 1080, top: 1540, display: 'flex', justifyContent: 'center'}}>
        <Chip icon="faint" text={f >= aPit ? 'Teruk → PITAM' : 'Kalau teruk…'} w={640} f={f - aTer} bg={RED} size={50} />
      </Pop>
    </Camera>
  );
};

/* ================= 7 — #3 Punca ================= */
export const Punca: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSkip = at(p, 'skip', 1.9);
  const aUbat = at(p, 'ubat', 3.2);
  const aIns = at(p, 'insulin', 4.2);
  const aSen = at(p, 'bersenam', 5.3);
  const aLeb = at(p, 'lebih', 5.8);
  const card: React.CSSProperties = {width: 980, borderRadius: 44, background: 'rgba(30,26,74,0.92)', boxShadow: '0 20px 50px rgba(18,11,51,.5)', padding: '30px 36px'};
  return (
    <Camera dur={p.dur} to={1.06} panY={-10}>
      <NightSky seed={31} glow={C.violet[2]} />
      <Pop at={aSkip} style={{left: 50, top: 500}}>
        <div style={card}>
          <Txt size={54} color={C.yellow}>Skip makan</Txt>
          <Txt size={40} color="#fff" style={{marginTop: 6}}>selepas ambil ubat / insulin</Txt>
          <div style={{display: 'flex', gap: 40, marginTop: 26, alignItems: 'center'}}>
            <div style={{position: 'relative'}}>
              <HIcon name="plate" size={170} />
              {f >= aSkip + 6 ? <div style={{position: 'absolute', left: 10, top: 10}}><Cross f={f - aSkip - 6} size={150} /></div> : null}
            </div>
            {f >= aUbat ? <div style={{transform: `scale(${popScale(f - aUbat)})`}}><HIcon name="pill" size={150} /></div> : <div style={{width: 150}} />}
            {f >= aIns ? <div style={{transform: `scale(${popScale(f - aIns)})`}}><HIcon name="pen" size={170} /></div> : null}
          </div>
        </div>
      </Pop>
      <Pop at={aSen} style={{left: 50, top: 1000}}>
        <div style={{...card, display: 'flex', alignItems: 'center', gap: 36}}>
          <HIcon name="shoe" size={170} f={f} />
          <div>
            <Txt size={54} color={C.yellow}>Bersenam</Txt>
            <Txt size={40} color="#fff" style={{marginTop: 6}}>{f >= aLeb ? 'lebih daripada biasa' : '…'}</Txt>
          </div>
        </div>
      </Pop>
      <Who preset={p.preset} x={640} y={1500} w={380} mood="curious" pose="point" />
      <Pop at={aLeb + 8} style={{left: 60, top: 1560}} origin="left center">
        <Pill text="Gula darah jatuh ↓" bg={RED} size={46} />
      </Pop>
    </Camera>
  );
};

/* ================= 8 — #4 Peraturan 15: 15 g → tunggu 15 minit → periksa semula ================= */
export const Rawatan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aPer = at(p, 'peraturan', 1.8);
  const aAmb = at(p, 'ambil', 3.3);
  const aTiga = at(p, 'tiga sudu', 6.0);
  const aAir = at(p, 'air', 7.4);
  const aSatu = at(p, 'satu sudu', 8.4);
  const aTung = at(p, 'tunggu', 10.0);
  const aKem = at(p, 'kemudian', 11.3);
  const aPer2 = at(p, 'periksa', 11.8);
  const aKal = at(p, 'kalau masih', 12.9);
  const aBila = at(p, 'bila gula', 15.0);
  const aMak = at(p, 'makan seperti', 16.1);
  const phaseA = f < aTung;
  const phaseB = f >= aTung && f < aKem + 8;
  const phaseC = f >= aKem + 8;
  const tp = interpolate(f, [aTung + 4, aKem], [0, 1], clamp);
  const g = interpolate(f, [aPer2, aPer2 + 40], [2.8, 5.6], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const sugarIn = interpolate(f, [aPer2 - 6, aPer2 + 40], [0, 1], clamp);
  const fuel = interpolate(f, [aPer2, aPer2 + 40], [0.1, 0.85], clamp);
  const light = interpolate(f, [aPer2 + 10, aPer2 + 40], [0.15, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.05} panY={-10}>
      <NightSky seed={35} glow={phaseC ? C.green : C.violet[2]} />
      <Pop at={aPer - 2} style={{left: 0, width: 1080, top: 490, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
          <Pill text="Pertolongan cemas" bg={C.labelPink} size={40} />
          <Pill text="PERATURAN 15" bg={C.yellow} color={C.navy} size={52} />
        </div>
      </Pop>
      {phaseA ? (
        <>
          <Pop at={aAmb} style={{left: 0, width: 1080, top: 610, display: 'flex', justifyContent: 'center'}}>
            <div style={{textAlign: 'center'}}>
              <Txt size={200} color={C.yellow} style={{textShadow: '0 10px 0 rgba(18,11,51,.6)'}}>15 g</Txt>
              <Txt size={50} color="#fff">gula cepat serap</Txt>
            </div>
          </Pop>
          <Pop at={aTiga} style={{left: 50, top: 930}}>
            <div style={{width: 580, borderRadius: 40, background: C.navy, padding: '20px 24px', boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 4}}>
                {[0, 1, 2].map((i) => (f >= aTiga + i * 5 ? <div key={i} style={{transform: `scale(${popScale(f - aTiga - i * 5)})`}}><HIcon name="spoon" size={120} /></div> : <div key={i} style={{width: 120}} />))}
                {f >= aAir ? <div style={{transform: `scale(${popScale(f - aAir)})`}}><HIcon name="glass" size={140} f={f} /></div> : null}
              </div>
              <Txt size={38} color="#fff" style={{marginTop: 6}}>3 sudu teh gula + air</Txt>
            </div>
          </Pop>
          <Pop at={aSatu - 6} style={{left: 660, top: 880}}>
            <Txt size={44} color={C.violet[4]}>atau</Txt>
          </Pop>
          <Pop at={aSatu} style={{left: 660, top: 940}}>
            <div style={{width: 370, borderRadius: 40, background: '#B5651D', padding: '14px 20px', boxShadow: '0 14px 34px rgba(18,11,51,.5)', textAlign: 'center'}}>
              <div style={{display: 'flex', justifyContent: 'center'}}><HIcon name="honey" size={130} /></div>
              <Txt size={36} color="#fff">1 sudu besar madu</Txt>
            </div>
          </Pop>
        </>
      ) : null}
      {phaseB ? (
        <div style={{position: 'absolute', left: 0, width: 1080, top: 640, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
          <div style={{transform: `scale(${popScale(f - aTung)})`}}>
            <Timer p={tp} size={560} />
          </div>
          <Pill text={tp >= 1 ? 'Siap!' : 'Tunggu 15 minit ⏩'} bg={tp >= 1 ? C.green : C.navy} color={tp >= 1 ? '#fff' : C.yellow} size={50} />
        </div>
      ) : null}
      {phaseC ? (
        <>
          <div style={{position: 'absolute', left: 240, top: 600, transform: `scale(${popScale(f - aKem - 8)})`}}>
            <Gauge value={g} width={600} />
          </div>
          <div style={{position: 'absolute', left: 330, top: 990}}>
            <Neuron fuel={fuel} light={light} flicker={light < 0.5} width={420} sugarIn={sugarIn} />
          </div>
          <Pop at={aKal} style={{left: 40, top: 1520}} origin="left center">
            <Pill text="Masih < 3.9? Ulang lagi" bg={C.labelPink} size={44} />
          </Pop>
          <Pop at={aBila} style={{left: 40, top: 1640}} origin="left center">
            <div style={{display: 'flex', alignItems: 'center', gap: 14, background: C.green, padding: '10px 30px 10px 14px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
              <HIcon name="plateFull" size={70} />
              <Txt size={42}>{f >= aMak ? 'Gula naik → makan seperti biasa' : 'Gula naik →'}</Txt>
            </div>
          </Pop>
        </>
      ) : null}
    </Camera>
  );
};

/* ================= 9 — Amaran: tak sedar → jangan paksa minum, sapu madu, 999 ================= */
export const Amaran: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSed = at(p, 'sedar', 1.1);
  const aJan = at(p, 'jangan', 1.7);
  const aSap = at(p, 'sapukan', 3.4);
  const aTel = at(p, 'telefon', 6.2);
  const pulse = 0.18 + 0.1 * Math.abs(Math.sin(f / 8));
  return (
    <Camera dur={p.dur} to={1.06} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[0]} 0%, #4A1838 100%)`}} />
      <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, ${RED} 0%, ${RED}00 60%)`, opacity: pulse}} />
      <Pop at={aSed - 4} style={{left: 0, width: 1080, top: 500, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, background: C.yellow, padding: '12px 36px 12px 18px', borderRadius: 44}}>
          <HIcon name="warn" size={74} />
          <Txt size={56} color={C.navy}>TAK SEDAR?</Txt>
        </div>
      </Pop>
      <Pop at={aJan} style={{left: 50, top: 650}} origin="left center">
        <div style={{position: 'relative'}}>
          <Chip icon="cup" text="Jangan paksa minum" w={640} bg={C.navy} size={44} />
          <div style={{position: 'absolute', left: 18, top: 14}}>{f >= aJan + 8 ? <Cross f={f - aJan - 8} size={92} /> : null}</div>
        </div>
      </Pop>
      <Pop at={aSap} style={{left: 50, top: 810}} origin="left center">
        <Chip icon="honey" text="Sapu sesudu madu dalam mulut" w={760} bg="#B5651D" size={40} />
      </Pop>
      <Pop at={aTel} style={{left: 720, top: 960}}>
        <div style={{textAlign: 'center'}}>
          <HIcon name="phone" size={260} f={f} />
          <Txt size={90} color={C.yellow} style={{textShadow: '0 8px 0 rgba(18,11,51,.6)'}}>999</Txt>
        </div>
      </Pop>
      {/* Pak Cik Kamal terbaring */}
      <div style={{position: 'absolute', left: 0, top: 1560, width: 1080, height: 360, background: '#2A1F4A'}} />
      <div style={{position: 'absolute', left: 290, top: 1150, width: 330, transform: 'rotate(-90deg)', transformOrigin: '50% 50%'}}>
        <Kamal x={0} y={0} w={330} mood="tired" pose="down" style={{position: 'relative'}} />
      </div>
      {f >= aSap + 10 ? (
        <div style={{position: 'absolute', left: 360, top: 1180, transform: `translate(${interpolate(f - aSap - 10, [0, 14], [120, 0], clamp)}px, 0) rotate(20deg)`}}>
          <HIcon name="spoon" size={110} />
        </div>
      ) : null}
    </Camera>
  );
};

/* ================= 10 — Pulih: bacaan naik semula, tak skip makan ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aMin = at(p, 'minum', 0.5);
  const aNaik = at(p, 'naik semula', 2.5);
  const aKini = at(p, 'kini', 3.6);
  const val = interpolate(f, [aMin + 10, aNaik + 6], [2.8, 5.6], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.violet[0]} 0%, ${C.pink[0]} 60%, #F6A86B 100%)`}} />
      <Glow x={540} y={1050} r={560} color={C.yellow} opacity={0.35} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: '#3F8A5A'}} />
      {f >= aNaik
        ? new Array(14).fill(0).map((_, i) => {
            const t = f - aNaik;
            const ang = random(`sp${i}`) * Math.PI * 2;
            const d = interpolate(t, [0, 24], [0, 240 + random(`sd${i}`) * 160], clamp);
            return <div key={i} style={{position: 'absolute', left: 800 + Math.cos(ang) * d, top: 820 + Math.sin(ang) * d, width: 22, height: 22, borderRadius: 11, background: i % 2 ? C.yellow : '#fff', opacity: interpolate(t, [0, 6, 24, 34], [0, 1, 1, 0], clamp)}} />;
          })
        : null}
      <Kamal x={30} y={820} w={500} mood={f >= aNaik ? 'happy' : 'neutral'} pose={f >= aNaik ? 'wave' : 'clasp'} />
      <Pop at={aMin} style={{left: 400, top: 1080}}>
        <HIcon name="glass" size={150} f={f} />
      </Pop>
      <Pop at={4} style={{left: 600, top: 520}}>
        <Glucometer value={val} width={380} />
      </Pop>
      <Pop at={aNaik} style={{left: 0, width: 1080, top: 1500, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: C.green, padding: '10px 34px 10px 14px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <HIcon name="check" size={70} />
          <Txt size={50}>Bacaan naik semula</Txt>
        </div>
      </Pop>
      <Pop at={aKini} style={{left: 0, width: 1080, top: 1640, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: C.navy, padding: '10px 34px 10px 14px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <HIcon name="plateFull" size={70} />
          <Txt size={46} color={C.yellow}>Tak lagi skip makan</Txt>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 11 — Penutup: Hari Diabetes Sedunia, saringan gula & HbA1c ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aHari = at(p, 'hari', 0.4);
  const aJan = at(p, 'jangan tunggu', 1.8);
  const aSar = at(p, 'saringan', 3.0);
  const aHb = at(p, 'ech-bi-ei-wan-si', 4.3);
  const aUj = at(p, 'ujian', 6.0);
  const aSaya = at(p, 'saya doktor', 7.9);
  return (
    <Camera dur={p.dur} to={1.06} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 60%, ${C.pink[2]} 100%)`}} />
      <NightSky seed={23} glow={BLUE} top="transparent" bottom="transparent" stars={50} />
      <Glow x={540} y={1000} r={560} color={BLUE} opacity={0.25} />
      <Pop at={aHari} style={{left: 0, width: 1080, top: 490, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, background: '#fff', padding: '10px 32px 10px 14px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <HIcon name="ring" size={76} />
          <div>
            <Txt size={28} color={BLUE}>14 NOVEMBER</Txt>
            <Txt size={42} color={C.navy}>Hari Diabetes Sedunia</Txt>
          </div>
        </div>
      </Pop>
      <Pop at={aJan} style={{left: 0, width: 1080, top: 640, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />
      </Pop>
      <Pop at={aSar} style={{left: 60, top: 780}} origin="left center">
        <Chip icon="meter" text="Saringan gula darah" w={640} bg={C.green} size={42} />
      </Pop>
      <Pop at={aHb} style={{left: 60, top: 930}} origin="left center">
        <Chip icon="tube" text={f >= aUj ? <span>HbA1c<br /><span style={{fontSize: 32, color: C.yellow}}>ujian gula 3 bulan</span></span> : 'HbA1c'} w={640} bg={C.navy} size={44} />
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
  pagi: Pagi,
  simptom: Simptom,
  diagnosis: Diagnosis,
  otak: Otak,
  definisi: Definisi,
  tanda: Tanda,
  punca: Punca,
  rawatan: Rawatan,
  amaran: Amaran,
  pulih: Pulih,
  penutup: Penutup,
};

