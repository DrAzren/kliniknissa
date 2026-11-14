// Kit kongsi untuk topik 2026-11-14 (darah-tinggi, kemurungan-lelaki, hfmd).
// Gaya Violet Flat yang sama dengan jenis-nyamuk: Txt, Who, Bubble, Chip, Stamp, PointScene, ikon SVG (viewBox 120).
import React from 'react';
import {AbsoluteFill, Easing, interpolate, random, useCurrentFrame} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset, Mood, Pose} from '../../components/Avatar';
import {Camera, clamp, Glow, NightSky, Pill, Pop, popOpacity, popScale} from '../../components/common';
import {WordsFile, wordTime} from '../../lib/timeline';
import {MIcon, MIconName} from '../jenis-nyamuk/scenes';
import {Icon} from '../kenali-eczema/scenes';

export type SceneProps = {preset: AvatarPreset; dur: number; wf: WordsFile; start: number; fps: number};
export {Camera, clamp, Glow, NightSky, Pill, Pop, popOpacity, popScale, Avatar, MIcon, Icon, C, FONT, Easing, interpolate, random, useCurrentFrame, AbsoluteFill};
export type {AvatarPreset, Mood, Pose, MIconName};

export const RED = '#D9485F';
export const LEAF = '#3FAF6E';
export const WATER = '#4F79C7';
export const SKIN = '#F2C9A6';

/** Frame (relatif babak) bagi perkataan pertama yang sepadan selepas babak bermula. */
export const at = (p: SceneProps, phrase: string, fallbackSec: number) => {
  const t = wordTime(p.wf, phrase, p.start, p.start + fallbackSec);
  return Math.max(0, Math.round((t - p.start) * p.fps));
};

export const Txt: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 44, color = '#fff', style}) => (
  <div style={{fontFamily: FONT, fontWeight: 800, fontSize: size, color, lineHeight: 1.12, ...style}}>{children}</div>
);

export const Who: React.FC<{preset: AvatarPreset; x: number; y: number; w: number; style?: React.CSSProperties; mood?: Mood; pose?: Pose; seed?: number; anger?: number; bow?: string}> = ({preset, x, y, w, style, bow, ...rest}) => (
  <div style={{position: 'absolute', left: x, top: y, ...style}}>
    <Avatar preset={preset} width={w} {...rest} />
    {bow ? <Bow color={bow} w={w} /> : null}
  </div>
);

/** Reben rambut untuk watak kanak-kanak perempuan (di atas kepala Avatar). */
const Bow: React.FC<{color: string; w: number}> = ({color, w}) => {
  const s = w / 600;
  return (
    <svg width={140 * s} height={100 * s} viewBox="0 0 140 100" style={{position: 'absolute', left: 380 * s, top: 40 * s, overflow: 'visible'}}>
      <path d="M 70 50 L 10 14 Q 0 50 10 86 Z" fill={color} />
      <path d="M 70 50 L 130 14 Q 140 50 130 86 Z" fill={color} />
      <circle cx={70} cy={50} r={18} fill="#fff" opacity={0.85} />
    </svg>
  );
};

export const Bubble: React.FC<{children: React.ReactNode; tail?: 'left' | 'right'; bg?: string; color?: string; size?: number}> = ({children, tail = 'left', bg = '#fff', color = C.navy, size = 46}) => (
  <div style={{position: 'relative', background: bg, color, borderRadius: 40, padding: `${size * 0.45}px ${size * 0.7}px`, fontFamily: FONT, fontWeight: 800, fontSize: size, lineHeight: 1.12, boxShadow: '0 14px 34px rgba(18,11,51,.45)', whiteSpace: 'nowrap'}}>
    {children}
    <div style={{position: 'absolute', bottom: -26, [tail === 'left' ? 'left' : 'right']: 60, width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: `30px solid ${bg}`}} />
  </div>
);

/** Kad ikon + teks. */
export const Chip: React.FC<{icon: React.ReactNode; text: React.ReactNode; bg?: string; color?: string; w?: number; size?: number}> = ({icon, text, bg = C.navy, color = '#fff', w = 520, size = 42}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 20, width: w, background: bg, borderRadius: 34, padding: '14px 26px 14px 16px', boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
    <div style={{width: 92, height: 92, borderRadius: 26, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{icon}</div>
    <Txt size={size} color={color}>{text}</Txt>
  </div>
);

/** Petak ikon besar + label (untuk grid). */
export const Tile: React.FC<{icon: React.ReactNode; text: string; bg?: string; w?: number; h?: number; size?: number}> = ({icon, text, bg = C.navy, w = 300, h = 250, size = 36}) => (
  <div style={{width: w, height: h, borderRadius: 34, background: bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 14px 34px rgba(18,11,51,.5)', textAlign: 'center'}}>
    {icon}
    <Txt size={size}>{text}</Txt>
  </div>
);

export const Cross: React.FC<{f: number; size?: number; color?: string}> = ({f, size = 220, color = C.labelPink}) => {
  const p = interpolate(f, [0, 8], [0, 1], clamp);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{position: 'absolute', left: 0, top: 0}}>
      <path d="M 14 14 L 86 86" stroke={color} strokeWidth={12} strokeLinecap="round" strokeDasharray={102} strokeDashoffset={102 * (1 - Math.min(1, p * 2))} />
      <path d="M 86 14 L 14 86" stroke={color} strokeWidth={12} strokeLinecap="round" strokeDasharray={102} strokeDashoffset={102 * (1 - Math.max(0, p * 2 - 1))} />
    </svg>
  );
};

export const Check: React.FC<{size?: number; bg?: string}> = ({size = 48, bg = C.green}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.3, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
    <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 30 30"><path d="M 5 16 L 12 23 L 25 8" stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </div>
);

/** Cop diagnosis besar. */
export const Stamp: React.FC<{f: number; a: number; top: string; big: string; sub?: string; bigSize?: number; y?: number}> = ({f, a, top, big, sub, bigSize = 130, y = 560}) => {
  if (f < a - 6) return null;
  const s = interpolate(f - a + 6, [0, 6, 10], [1.8, 0.94, 1], clamp);
  return (
    <div style={{position: 'absolute', left: 40, top: y, width: 1000, display: 'flex', justifyContent: 'center', transform: `scale(${s}) rotate(-5deg)`, opacity: interpolate(f - a + 6, [0, 3], [0, 1], clamp)}}>
      <div style={{background: C.navy, border: `10px solid ${C.labelPink}`, borderRadius: 40, padding: '24px 54px', textAlign: 'center', boxShadow: '0 30px 70px rgba(18,11,51,.6)'}}>
        <Txt size={38} color={C.violet[4]}>{top}</Txt>
        <Txt size={bigSize} color={C.yellow} style={{lineHeight: 1.02, whiteSpace: 'nowrap'}}>{big}</Txt>
        {sub ? <Txt size={44} color="#fff" style={{marginTop: 8}}>{sub}</Txt> : null}
      </div>
    </div>
  );
};

/** Percikan konfeti (babak pulih). */
export const Burst: React.FC<{f: number; a: number; x?: number; y?: number}> = ({f, a, x = 540, y = 980}) => {
  if (f < a) return null;
  const t = f - a;
  return (
    <>
      {new Array(16).fill(0).map((_, i) => {
        const ang = random(`bu${i}`) * Math.PI * 2;
        const d = interpolate(t, [0, 24], [0, 260 + random(`bd${i}`) * 180], clamp);
        return <div key={i} style={{position: 'absolute', left: x + Math.cos(ang) * d, top: y + Math.sin(ang) * d, width: 22, height: 22, borderRadius: 11, background: i % 3 === 0 ? C.green : i % 2 ? C.yellow : '#fff', opacity: interpolate(t, [0, 6, 24, 34], [0, 1, 1, 0], clamp)}} />;
      })}
    </>
  );
};

/** Papan tanda "KLINIK" generik. */
export const ClinicSign: React.FC<{x: number; y: number; w?: number}> = ({x, y, w = 420}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, display: 'flex', alignItems: 'center', gap: 18, background: '#fff', borderRadius: 26, padding: '14px 26px', boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
    <svg width={70} height={70} viewBox="0 0 70 70">
      <rect x={24} y={6} width={22} height={58} rx={6} fill={C.green} />
      <rect x={6} y={24} width={58} height={22} rx={6} fill={C.green} />
    </svg>
    <Txt size={56} color={C.navy} style={{letterSpacing: 4}}>KLINIK</Txt>
  </div>
);

/* ===================== Ikon baharu (viewBox 120) ===================== */
export type KIconName =
  | 'person' | 'bp' | 'heart' | 'kidney' | 'salt' | 'scale' | 'couch' | 'cigarette' | 'nosmoke' | 'hourglass' | 'spoon' | 'shoe'
  | 'pill' | 'calendar' | 'truck' | 'phone' | 'laptop' | 'ball' | 'bed' | 'storm' | 'back' | 'stomach' | 'talk' | 'empty'
  | 'warning' | 'virus' | 'saliva' | 'sneeze' | 'palm' | 'sole' | 'mouth' | 'hospital' | 'toy' | 'cup' | 'nocup' | 'bowl'
  | 'zzz' | 'bolt' | 'vomit' | 'bottle' | 'question' | 'smile' | 'clock' | 'school' | 'poop' | 'lungs' | 'drop';

export const KIcon: React.FC<{name: KIconName; size?: number; f?: number; text?: string}> = ({name, size = 120, f = 0, text}) => {
  const w = '#fff', nv = C.navy, y = C.yellow;
  const body = (() => {
    switch (name) {
      case 'person':
        return (
          <g>
            <circle cx={60} cy={30} r={22} fill={w} />
            <path d="M 20 114 Q 20 60 60 60 Q 100 60 100 114 Z" fill={w} />
          </g>
        );
      case 'bp': {
        // monitor digital + manset
        return (
          <g>
            <rect x={6} y={10} width={80} height={100} rx={14} fill={w} />
            <rect x={14} y={20} width={64} height={46} rx={6} fill="#1D2B33" />
            <text x={46} y={40} fontFamily={FONT} fontWeight={800} fontSize={18} fill="#7CF29A" textAnchor="middle">{(text ?? '').split('/')[0] || '---'}</text>
            <text x={46} y={60} fontFamily={FONT} fontWeight={800} fontSize={16} fill="#7CF29A" textAnchor="middle">{(text ?? '').split('/')[1] ?? ''}</text>
            <circle cx={30} cy={86} r={9} fill={C.labelPink} />
            <rect x={48} y={80} width={28} height={12} rx={6} fill={C.violet[3]} />
            <path d="M 86 60 Q 110 60 108 86" stroke="#55516A" strokeWidth={6} fill="none" />
            <rect x={96} y={84} width={22} height={34} rx={8} fill={C.violet[1]} />
          </g>
        );
      }
      case 'heart': {
        const b = 1 + 0.08 * Math.abs(Math.sin(f / 4));
        return (
          <g transform={`translate(60 62) scale(${b}) translate(-60 -62)`}>
            <path d="M 60 108 C 20 80 6 58 10 38 C 14 16 42 10 60 32 C 78 10 106 16 110 38 C 114 58 100 80 60 108 Z" fill={RED} />
            <path d="M 30 30 Q 22 40 26 52" stroke="#fff" strokeWidth={6} strokeLinecap="round" fill="none" opacity={0.6} />
          </g>
        );
      }
      case 'kidney':
        return (
          <g>
            <path d="M 70 12 C 106 12 114 52 106 80 C 98 108 64 118 48 98 C 40 86 56 76 52 64 C 48 52 28 50 26 36 C 24 18 46 12 70 12 Z" fill="#C2566E" />
            <path d="M 52 64 Q 66 70 70 60" stroke="#E8B48C" strokeWidth={7} strokeLinecap="round" fill="none" />
            <path d="M 80 30 Q 94 44 90 70" stroke="#E07A93" strokeWidth={6} strokeLinecap="round" fill="none" opacity={0.7} />
          </g>
        );
      case 'salt':
        return (
          <g>
            <path d="M 34 40 L 86 40 L 94 112 L 26 112 Z" fill={w} />
            <path d="M 36 40 Q 36 10 60 10 Q 84 10 84 40 Z" fill="#C9CED8" />
            {[[48, 22], [60, 18], [72, 22], [54, 30], [66, 30]].map(([x, yy], i) => <circle key={i} cx={x} cy={yy} r={3} fill="#55516A" />)}
            <text x={60} y={88} fontFamily={FONT} fontWeight={800} fontSize={30} fill={nv} textAnchor="middle">S</text>
            {[0, 1, 2].map((i) => <rect key={i} x={50 + i * 10} y={0 - ((f + i * 7) % 20)} width={4} height={4} fill={w} opacity={0.0} />)}
          </g>
        );
      case 'scale':
        return (
          <g>
            <rect x={10} y={30} width={100} height={80} rx={18} fill={w} />
            <rect x={30} y={42} width={60} height={30} rx={8} fill="#1D2B33" />
            <path d={`M 60 70 L ${60 + 22 * Math.cos(-Math.PI / 2 + 0.6 + Math.sin(f / 8) * 0.2)} ${70 + 22 * Math.sin(-Math.PI / 2 + 0.6 + Math.sin(f / 8) * 0.2)}`} stroke={RED} strokeWidth={5} strokeLinecap="round" />
            <rect x={22} y={84} width={30} height={18} rx={6} fill="#C9CED8" />
            <rect x={68} y={84} width={30} height={18} rx={6} fill="#C9CED8" />
          </g>
        );
      case 'couch':
        return (
          <g>
            <rect x={14} y={40} width={92} height={44} rx={14} fill={C.violet[3]} />
            <rect x={6} y={60} width={24} height={40} rx={10} fill={C.violet[1]} />
            <rect x={90} y={60} width={24} height={40} rx={10} fill={C.violet[1]} />
            <rect x={24} y={70} width={72} height={26} rx={8} fill={C.violet[1]} />
            <rect x={16} y={98} width={8} height={14} fill="#55516A" /><rect x={96} y={98} width={8} height={14} fill="#55516A" />
          </g>
        );
      case 'cigarette':
        return (
          <g>
            <rect x={10} y={70} width={78} height={18} rx={4} fill={w} />
            <rect x={88} y={70} width={22} height={18} rx={4} fill="#E08A3E" />
            <rect x={6} y={70} width={8} height={18} rx={3} fill="#FF6A3D" />
            <path d={`M 10 62 Q ${0 + Math.sin(f / 6) * 6} 46 12 34 Q ${24 + Math.sin(f / 5) * 6} 22 14 8`} stroke="#C9CED8" strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.8} />
          </g>
        );
      case 'nosmoke':
        return (
          <g>
            <circle cx={60} cy={60} r={52} fill={w} />
            <rect x={22} y={52} width={58} height={16} rx={4} fill="#C9CED8" />
            <rect x={80} y={52} width={18} height={16} rx={4} fill="#E08A3E" />
            <circle cx={60} cy={60} r={46} fill="none" stroke={RED} strokeWidth={10} />
            <path d="M 28 28 L 92 92" stroke={RED} strokeWidth={10} strokeLinecap="round" />
          </g>
        );
      case 'hourglass':
        return (
          <g>
            <rect x={22} y={6} width={76} height={12} rx={5} fill={C.violet[3]} />
            <rect x={22} y={102} width={76} height={12} rx={5} fill={C.violet[3]} />
            <path d="M 30 18 L 90 18 Q 90 46 64 60 Q 90 74 90 102 L 30 102 Q 30 74 56 60 Q 30 46 30 18 Z" fill={w} />
            <path d="M 40 30 L 80 30 Q 76 46 60 56 Q 44 46 40 30 Z" fill={y} />
            <path d="M 36 100 Q 40 84 60 78 Q 80 84 84 100 Z" fill={y} />
          </g>
        );
      case 'spoon':
        return (
          <g>
            <ellipse cx={42} cy={44} rx={30} ry={22} fill="#C9CED8" transform="rotate(-30 42 44)" />
            <ellipse cx={42} cy={44} rx={22} ry={14} fill={w} transform="rotate(-30 42 44)" />
            <path d="M 62 58 L 110 106" stroke="#C9CED8" strokeWidth={12} strokeLinecap="round" />
            {[[34, 40], [44, 44], [40, 50], [50, 38]].map(([x, yy], i) => <rect key={i} x={x} y={yy} width={5} height={5} fill="#B9BED0" />)}
          </g>
        );
      case 'shoe':
        return (
          <g>
            <path d="M 10 70 L 14 34 Q 30 30 40 44 Q 60 60 96 62 Q 114 66 112 86 L 10 86 Z" fill={C.labelPink} />
            <rect x={8} y={84} width={106} height={16} rx={8} fill={w} />
            <path d="M 34 50 L 50 46 M 42 58 L 58 54" stroke={w} strokeWidth={5} strokeLinecap="round" />
          </g>
        );
      case 'pill':
        return (
          <g>
            <g transform="rotate(-35 60 60)">
              <rect x={20} y={42} width={80} height={36} rx={18} fill={w} />
              <path d="M 60 42 L 82 42 A 18 18 0 0 1 82 78 L 60 78 Z" fill={C.labelPink} />
            </g>
            <circle cx={92} cy={96} r={16} fill={y} />
            <path d="M 82 96 L 102 96" stroke="#C99A1F" strokeWidth={4} />
          </g>
        );
      case 'calendar':
        return (
          <g>
            <rect x={10} y={18} width={100} height={92} rx={14} fill={w} />
            <rect x={10} y={18} width={100} height={26} rx={12} fill={C.labelPink} />
            <rect x={30} y={8} width={8} height={20} rx={4} fill={nv} /><rect x={82} y={8} width={8} height={20} rx={4} fill={nv} />
            {new Array(9).fill(0).map((_, i) => (
              <g key={i}>
                <rect x={22 + (i % 3) * 28} y={52 + Math.floor(i / 3) * 18} width={20} height={12} rx={3} fill={i < Math.min(9, Math.floor(f / 4)) ? C.green : '#DAD6EE'} />
              </g>
            ))}
          </g>
        );
      case 'truck':
        return (
          <g>
            <rect x={4} y={30} width={72} height={56} rx={6} fill={C.violet[3]} />
            <path d="M 76 46 L 100 46 L 116 66 L 116 86 L 76 86 Z" fill={C.labelPink} />
            <rect x={84} y={52} width={18} height={14} rx={3} fill="#BFE3FF" />
            <circle cx={26} cy={92} r={13} fill="#2A2733" /><circle cx={26} cy={92} r={5} fill="#C9CED8" />
            <circle cx={96} cy={92} r={13} fill="#2A2733" /><circle cx={96} cy={92} r={5} fill="#C9CED8" />
          </g>
        );
      case 'phone':
        return (
          <g>
            <rect x={30} y={6} width={60} height={108} rx={12} fill="#2A2733" />
            <rect x={36} y={16} width={48} height={84} rx={6} fill={`hsl(${(f * 6) % 360} 70% 62%)`} />
            <rect x={52} y={104} width={16} height={4} rx={2} fill="#55516A" />
            <rect x={42} y={26} width={36} height={8} rx={4} fill="rgba(255,255,255,.6)" />
            <rect x={42} y={42} width={26} height={8} rx={4} fill="rgba(255,255,255,.6)" />
          </g>
        );
      case 'laptop':
        return (
          <g>
            <rect x={18} y={18} width={84} height={60} rx={8} fill="#2A2733" />
            <rect x={24} y={24} width={72} height={48} rx={4} fill="#8DC9F0" />
            {[0, 1, 2].map((i) => <rect key={i} x={30} y={30 + i * 13} width={20 + ((i * 17 + f) % 40)} height={6} rx={3} fill={w} opacity={0.8} />)}
            <path d="M 6 82 L 114 82 L 104 98 L 16 98 Z" fill="#C9CED8" />
          </g>
        );
      case 'ball':
        return (
          <g transform={`rotate(${f * 4} 60 60)`}>
            <circle cx={60} cy={60} r={50} fill={w} />
            <path d="M 60 40 L 79 54 L 72 76 L 48 76 L 41 54 Z" fill={nv} />
            {[0, 1, 2, 3, 4].map((i) => <path key={i} d="M 60 40 L 60 12" stroke={nv} strokeWidth={4} transform={`rotate(${i * 72} 60 60)`} />)}
          </g>
        );
      case 'bed':
        return (
          <g>
            <rect x={8} y={34} width={14} height={76} rx={5} fill="#7A5236" />
            <rect x={14} y={66} width={100} height={26} rx={8} fill={C.violet[3]} />
            <rect x={22} y={52} width={34} height={18} rx={9} fill={w} />
            <path d="M 52 66 Q 70 50 112 58 L 112 70 Z" fill={C.violet[1]} />
            <rect x={104} y={60} width={10} height={50} rx={4} fill="#7A5236" />
          </g>
        );
      case 'storm':
        return (
          <g>
            <circle cx={42} cy={48} r={26} fill="#55516A" /><circle cx={72} cy={40} r={30} fill="#55516A" /><circle cx={92} cy={58} r={20} fill="#55516A" />
            <rect x={24} y={52} width={84} height={26} rx={13} fill="#55516A" />
            <path d="M 62 74 L 48 100 L 62 100 L 54 118 L 80 88 L 66 88 L 76 74 Z" fill={y} opacity={0.6 + 0.4 * Math.abs(Math.sin(f / 3))} />
          </g>
        );
      case 'back':
        return (
          <g>
            <path d="M 34 10 Q 20 60 34 110 L 86 110 Q 100 60 86 10 Z" fill={SKIN} />
            {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={54} y={18 + i * 15} width={12} height={10} rx={4} fill="#E8D8C8" />)}
            <circle cx={60} cy={78} r={16} fill={RED} opacity={0.4 + 0.4 * Math.abs(Math.sin(f / 5))} />
          </g>
        );
      case 'stomach':
        return (
          <g>
            <path d="M 46 10 L 46 32 Q 14 40 18 72 Q 24 108 64 106 Q 104 102 100 66 Q 96 42 70 50 Q 60 54 60 34 L 60 10 Z" fill="#F29CBC" />
            <path d="M 34 70 Q 50 60 66 74 Q 80 86 92 72" stroke="#D2638E" strokeWidth={5} fill="none" strokeLinecap="round" />
            <path d={`M 98 24 l 8 -6 M 104 36 l 10 -2 M 90 16 l 2 -10`} stroke={y} strokeWidth={5} strokeLinecap="round" opacity={0.5 + 0.5 * Math.abs(Math.sin(f / 4))} />
          </g>
        );
      case 'talk':
        return (
          <g>
            <rect x={6} y={14} width={70} height={50} rx={18} fill={w} />
            <path d="M 22 60 L 18 80 L 40 62 Z" fill={w} />
            <rect x={46} y={52} width={68} height={46} rx={18} fill={C.yellow} />
            <path d="M 98 94 L 104 112 L 84 96 Z" fill={C.yellow} />
            {[0, 1, 2].map((i) => <circle key={i} cx={26 + i * 16} cy={39} r={5} fill={nv} opacity={0.4 + 0.6 * Math.abs(Math.sin(f / 5 + i))} />)}
          </g>
        );
      case 'empty':
        return (
          <g>
            <circle cx={60} cy={60} r={46} fill="none" stroke={w} strokeWidth={8} strokeDasharray="14 12" transform={`rotate(${f * 2} 60 60)`} />
            <circle cx={60} cy={60} r={10} fill={w} opacity={0.5} />
          </g>
        );
      case 'warning':
        return (
          <g>
            <path d="M 60 8 L 114 106 L 6 106 Z" fill={y} />
            <rect x={54} y={40} width={12} height={38} rx={6} fill={nv} />
            <circle cx={60} cy={90} r={7} fill={nv} />
          </g>
        );
      case 'virus':
        return (
          <g transform={`rotate(${f * 1.5} 60 60)`}>
            {new Array(8).fill(0).map((_, i) => (
              <g key={i} transform={`rotate(${i * 45} 60 60)`}>
                <rect x={56} y={6} width={8} height={22} fill="#7FD08A" />
                <circle cx={60} cy={8} r={8} fill="#4FB566" />
              </g>
            ))}
            <circle cx={60} cy={60} r={34} fill="#4FB566" />
            <circle cx={48} cy={52} r={7} fill="#2E8A45" /><circle cx={70} cy={66} r={9} fill="#2E8A45" /><circle cx={66} cy={44} r={4} fill="#2E8A45" />
          </g>
        );
      case 'saliva':
      case 'drop':
        return (
          <g>
            <path d="M 60 10 Q 98 60 92 80 Q 86 110 60 110 Q 34 110 28 80 Q 22 60 60 10 Z" fill="#9FD6F7" />
            <path d="M 44 78 Q 44 94 58 98" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" />
          </g>
        );
      case 'sneeze':
        return (
          <g>
            <circle cx={40} cy={60} r={34} fill={SKIN} />
            <path d="M 26 52 L 36 56 M 46 52 L 56 56" stroke="#1E1A24" strokeWidth={4} strokeLinecap="round" />
            <ellipse cx={58} cy={74} rx={8} ry={6} fill="#5B1F3D" />
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const t = ((f + i * 5) % 30) / 30;
              return <circle key={i} cx={70 + t * 46} cy={74 + (i - 2.5) * 8 * t} r={4 - t * 2} fill="#9FD6F7" opacity={1 - t} />;
            })}
          </g>
        );
      case 'palm':
        return (
          <g>
            <rect x={28} y={50} width={62} height={60} rx={24} fill={SKIN} />
            {[0, 1, 2, 3].map((i) => <rect key={i} x={30 + i * 15} y={12 + (i === 0 || i === 3 ? 12 : 0)} width={13} height={50} rx={6.5} fill={SKIN} />)}
            <rect x={84} y={52} width={30} height={13} rx={6.5} fill={SKIN} transform="rotate(-35 84 58)" />
            {[[46, 70], [66, 82], [54, 94], [76, 64], [40, 30], [72, 26]].map(([x, yy], i) => <circle key={i} cx={x} cy={yy} r={5} fill={RED} />)}
          </g>
        );
      case 'sole':
        return (
          <g>
            <path d="M 40 30 Q 34 70 42 100 Q 52 118 70 110 Q 84 100 80 70 Q 78 40 86 30 Q 70 14 40 30 Z" fill={SKIN} />
            {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={40 + i * 11} cy={20 - (i === 0 ? 4 : 0)} r={i === 0 ? 8 : 6} fill={SKIN} />)}
            {[[54, 48], [66, 64], [52, 86], [70, 92]].map(([x, yy], i) => <circle key={i} cx={x} cy={yy} r={5} fill={RED} />)}
          </g>
        );
      case 'mouth':
        return (
          <g>
            <path d="M 10 60 Q 60 10 110 60 Q 60 112 10 60 Z" fill="#D2638E" />
            <path d="M 20 60 Q 60 30 100 60 Q 60 96 20 60 Z" fill="#7A1F3D" />
            <ellipse cx={60} cy={76} rx={28} ry={10} fill="#F29CBC" />
            {[[42, 52], [74, 58], [60, 80]].map(([x, yy], i) => <circle key={i} cx={x} cy={yy} r={6} fill="#FFF3C4" stroke={RED} strokeWidth={2} />)}
          </g>
        );
      case 'hospital':
        return (
          <g>
            <rect x={14} y={24} width={92} height={88} rx={6} fill={w} />
            <rect x={48} y={34} width={24} height={8} fill={RED} /><rect x={56} y={26} width={8} height={24} fill={RED} />
            {[0, 1, 2].map((i) => <rect key={i} x={22 + i * 28} y={60} width={18} height={14} rx={3} fill="#8DC9F0" />)}
            <rect x={48} y={86} width={24} height={26} rx={3} fill={C.violet[1]} />
          </g>
        );
      case 'toy':
        return (
          <g>
            <rect x={10} y={62} width={46} height={46} rx={8} fill={C.labelPink} />
            <rect x={64} y={62} width={46} height={46} rx={8} fill={C.green} />
            <rect x={36} y={12} width={46} height={46} rx={8} fill={y} />
            <text x={33} y={96} fontFamily={FONT} fontWeight={800} fontSize={30} fill={w} textAnchor="middle">A</text>
            <text x={87} y={96} fontFamily={FONT} fontWeight={800} fontSize={30} fill={w} textAnchor="middle">B</text>
            <text x={59} y={46} fontFamily={FONT} fontWeight={800} fontSize={30} fill={nv} textAnchor="middle">C</text>
          </g>
        );
      case 'cup':
      case 'nocup':
        return (
          <g>
            <path d="M 26 20 L 94 20 L 86 110 L 34 110 Z" fill="rgba(255,255,255,.85)" />
            <path d="M 30 50 L 90 50 L 86 106 L 34 106 Z" fill="#7CC6F2" />
            {name === 'nocup' ? <path d="M 14 14 L 106 106 M 106 14 L 14 106" stroke={RED} strokeWidth={12} strokeLinecap="round" /> : null}
          </g>
        );
      case 'bowl':
        return (
          <g>
            <path d="M 8 56 L 112 56 Q 108 106 60 108 Q 12 106 8 56 Z" fill={w} />
            <ellipse cx={60} cy={56} rx={52} ry={12} fill="#F3E2B8" />
            <path d={`M 40 40 Q 34 26 42 14 M 60 38 Q 54 24 62 10 M 80 40 Q 74 26 82 14`} stroke="#C9CED8" strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.5 + 0.4 * Math.sin(f / 6)} />
            <rect x={70} y={22} width={8} height={40} rx={4} fill="#C9CED8" transform="rotate(30 74 42)" />
          </g>
        );
      case 'zzz':
        return (
          <g>
            {[0, 1, 2].map((i) => (
              <text key={i} x={20 + i * 30} y={100 - i * 30 - (f % 30) * 0.4} fontFamily={FONT} fontWeight={800} fontSize={30 + i * 10} fill={w} opacity={0.5 + i * 0.25}>Z</text>
            ))}
          </g>
        );
      case 'bolt':
        return <path d="M 70 4 L 22 68 L 56 68 L 44 116 L 98 46 L 62 46 Z" fill={y} transform={`translate(${Math.sin(f * 2) * 3} 0)`} />;
      case 'vomit':
        return (
          <g>
            <circle cx={60} cy={54} r={44} fill="#B6E3A8" />
            <path d="M 38 46 L 50 50 M 82 46 L 70 50" stroke="#1E1A24" strokeWidth={5} strokeLinecap="round" />
            <ellipse cx={60} cy={76} rx={14} ry={10} fill="#5B1F3D" />
            <path d="M 52 84 Q 50 104 60 116 Q 70 104 68 84 Z" fill="#9BCB5A" opacity={0.8} />
          </g>
        );
      case 'bottle':
        return (
          <g>
            <rect x={40} y={4} width={40} height={16} rx={6} fill={C.labelPink} />
            <path d="M 44 20 L 76 20 L 76 30 Q 92 38 92 56 L 92 104 Q 92 114 82 114 L 38 114 Q 28 114 28 104 L 28 56 Q 28 38 44 30 Z" fill={w} />
            <path d="M 30 64 L 90 64 L 90 104 Q 90 112 82 112 L 38 112 Q 30 112 30 104 Z" fill="#F7F1E3" />
            {[0, 1, 2].map((i) => <rect key={i} x={70} y={46 + i * 16} width={14} height={4} rx={2} fill={C.violet[3]} />)}
          </g>
        );
      case 'question':
        return (
          <g>
            <circle cx={60} cy={60} r={52} fill={y} />
            <text x={60} y={84} fontFamily={FONT} fontWeight={800} fontSize={70} fill={nv} textAnchor="middle">?</text>
          </g>
        );
      case 'smile':
        return (
          <g>
            <circle cx={60} cy={60} r={52} fill={y} />
            <circle cx={42} cy={48} r={7} fill={nv} /><circle cx={78} cy={48} r={7} fill={nv} />
            <path d="M 34 70 Q 60 96 86 70" stroke={nv} strokeWidth={8} fill="none" strokeLinecap="round" />
          </g>
        );
      case 'clock': {
        const a = (f * 12 * Math.PI) / 180;
        return (
          <g>
            <circle cx={60} cy={60} r={52} fill={w} />
            <circle cx={60} cy={60} r={44} fill="none" stroke={C.violet[3]} strokeWidth={4} />
            <path d={`M 60 60 L ${60 + 30 * Math.sin(a)} ${60 - 30 * Math.cos(a)}`} stroke={nv} strokeWidth={6} strokeLinecap="round" />
            <path d="M 60 60 L 60 34" stroke={RED} strokeWidth={6} strokeLinecap="round" transform="rotate(90 60 60)" />
            <circle cx={60} cy={60} r={6} fill={nv} />
          </g>
        );
      }
      case 'school':
        return (
          <g>
            <path d="M 6 50 L 60 14 L 114 50 Z" fill={C.labelPink} />
            <rect x={14} y={48} width={92} height={62} fill={w} />
            {[0, 1, 2].map((i) => <rect key={i} x={22 + i * 30} y={60} width={16} height={16} rx={3} fill="#8DC9F0" />)}
            <rect x={50} y={84} width={20} height={26} rx={3} fill={C.violet[1]} />
            <path d="M 60 14 L 60 0 L 78 6 L 60 12" fill={y} />
          </g>
        );
      case 'poop':
        return (
          <g>
            <ellipse cx={60} cy={96} rx={48} ry={16} fill="#8A5A3B" />
            <ellipse cx={60} cy={74} rx={38} ry={14} fill="#9C6A47" />
            <ellipse cx={60} cy={54} rx={26} ry={12} fill="#8A5A3B" />
            <path d="M 60 44 Q 76 30 64 18" stroke="#9C6A47" strokeWidth={12} fill="none" strokeLinecap="round" />
          </g>
        );
      case 'lungs':
        return (
          <g>
            <rect x={56} y={8} width={8} height={40} rx={4} fill="#E8D8C8" />
            <path d="M 54 40 Q 30 34 18 64 Q 10 96 22 108 Q 40 114 52 98 Z" fill="#F29CBC" />
            <path d="M 66 40 Q 90 34 102 64 Q 110 96 98 108 Q 80 114 68 98 Z" fill="#F29CBC" />
            <path d="M 100 14 l 12 -8 M 106 28 l 12 0" stroke={y} strokeWidth={5} strokeLinecap="round" opacity={0.5 + 0.5 * Math.abs(Math.sin(f / 3))} />
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

/* ===================== Babak bernombor generik ===================== */
export type PointItem = {icon: React.ReactNode; text: React.ReactNode; a: number; bg?: string; size?: number};

/**
 * Susun atur #N: tajuk (y≈470), hero (kanan atas), senarai kad (y 820–1340), label bawah (#N oleh Video),
 * Dr. Azren kecil di bawah label.
 */
export const PointScene: React.FC<{
  p: SceneProps;
  title: string;
  titleSize?: number;
  bg: string;
  glow?: string;
  hero?: React.ReactNode;
  items: PointItem[];
  grid?: boolean;
  extra?: React.ReactNode;
  mood?: Mood;
  pose?: Pose;
  itemW?: number;
  titleTop?: number;
}> = ({p, title, titleSize = 84, titleTop = 530, bg, glow = C.violet[2], hero, items, grid, extra, mood = 'neutral', pose = 'point', itemW = 660}) => {
  const f = useCurrentFrame();
  const enter = interpolate(f, [0, 14], [0, 1], {...clamp, easing: Easing.out(Easing.back(1.3))});
  const hover = Math.sin(f / 10) * 8;
  return (
    <Camera dur={p.dur} to={1.05} panY={-10}>
      <AbsoluteFill style={{background: bg}} />
      <NightSky seed={title.length * 7} top="transparent" bottom="transparent" stars={30} dim={0.6} glow={glow} />
      {extra}
      <div style={{position: 'absolute', left: 60, top: titleTop, width: 560, opacity: enter, transform: `translateX(${(1 - enter) * -40}px)`}}>
        <Txt size={titleSize} color={C.yellow} style={{textShadow: '0 8px 0 rgba(18,11,51,.6)'}}>{title}</Txt>
      </div>
      {hero ? <div style={{position: 'absolute', left: 640, top: 440 + hover, width: 400, height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${enter})`}}>{hero}</div> : null}
      {grid
        ? items.map((it, i) => (
            <Pop key={i} at={it.a} style={{left: 50 + (i % 3) * 330, top: 830 + Math.floor(i / 3) * 270}}>
              <Tile icon={it.icon} text={it.text as string} bg={it.bg ?? (i % 2 ? C.violet[1] : C.navy)} w={310} h={250} size={it.size ?? 34} />
            </Pop>
          ))
        : items.map((it, i) => (
            <Pop key={i} at={it.a} style={{left: 50, top: 830 + i * 130}} origin="left center">
              <Chip icon={it.icon} text={it.text} w={itemW} bg={it.bg ?? (i % 2 ? C.violet[1] : C.navy)} size={it.size ?? 40} />
            </Pop>
          ))}
      <Who preset={p.preset} x={grid ? 620 : 720} y={1540} w={grid ? 400 : 330} mood={mood} pose={pose} />
    </Camera>
  );
};

/** Babak "Ini 5 perkara": nombor besar + Dr. Azren. */
export const FiveIntro: React.FC<{p: SceneProps; aFive: number; head: React.ReactNode; sub: string; glow?: string; children?: React.ReactNode}> = ({p, aFive, head, sub, glow = C.green, children}) => {
  const f = useCurrentFrame();
  return (
    <Camera dur={p.dur} to={1.06} panY={-15}>
      <NightSky seed={11} glow={glow} />
      {children}
      <Pop at={aFive} style={{left: 0, width: 1080, top: 900, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
          <Txt size={220} color={C.yellow} style={{textShadow: '0 10px 0 rgba(18,11,51,.6)'}}>5</Txt>
          <Txt size={64} style={{width: 420}}>{sub}</Txt>
        </div>
      </Pop>
      {head}
      <Who preset={p.preset} x={300} y={1300} w={480} mood="happy" pose={f >= aFive ? 'point' : 'wave'} />
    </Camera>
  );
};

/** Penutup standard: pil berturutan + Dr. Azren + penafian pendidikan. */
export const Closing: React.FC<{p: SceneProps; lines: {a: number; node: React.ReactNode}[]; aSaya: number}> = ({p, lines, aSaya}) => {
  const f = useCurrentFrame();
  return (
    <Camera dur={p.dur} to={1.06} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 60%, ${C.pink[2]} 100%)`}} />
      <NightSky seed={23} glow={C.pink[0]} top="transparent" bottom="transparent" stars={50} />
      <Glow x={540} y={1000} r={560} color={C.green} opacity={0.25} />
      {lines.map((l, i) => (
        <Pop key={i} at={l.a} style={{left: 0, width: 1080, top: 460 + i * 135, display: 'flex', justifyContent: 'center'}}>
          {l.node}
        </Pop>
      ))}
      <Who preset={p.preset} x={290} y={460 + lines.length * 135 + 10} w={500} mood="happy" pose={f >= aSaya ? 'wave' : 'clasp'} />
      <Pop at={aSaya} style={{left: 0, width: 1080, top: 1560, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Dr. Azren" bg={C.labelPink} size={58} />
      </Pop>
      <div style={{position: 'absolute', left: 0, top: 1700, width: 1080, textAlign: 'center', opacity: interpolate(f, [aSaya, aSaya + 10], [0, 1], clamp)}}>
        <Txt size={30} color={C.violet[4]}>Video ini untuk pendidikan, bukan diagnosis.</Txt>
      </div>
    </Camera>
  );
};

/** Pil putih dengan ikon (untuk penutup / hook). */
export const IconPill: React.FC<{icon: React.ReactNode; text: string; bg?: string; color?: string; size?: number}> = ({icon, text, bg = '#fff', color = C.navy, size = 44}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 16, background: bg, padding: '12px 32px 12px 16px', borderRadius: 48, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
    {icon}
    <Txt size={size} color={color} style={{whiteSpace: 'nowrap'}}>{text}</Txt>
  </div>
);
