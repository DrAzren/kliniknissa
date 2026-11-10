import React from 'react';
import {AbsoluteFill, Easing, interpolate, random, useCurrentFrame} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset, Mood, Pose} from '../../components/Avatar';
import {Camera, clamp, Glow, NightSky, Pill, Pop, popOpacity, popScale} from '../../components/common';
import {WordsFile, wordTime} from '../../lib/timeline';
import {Icon} from '../kenali-eczema/scenes';

export type SceneProps = {preset: AvatarPreset; dur: number; wf: WordsFile; start: number; fps: number};

/* ---------- watak cerita (rekaan, khas topik ini) ---------- */
export const HAFIZ: AvatarPreset = {
  id: 'hafiz', skin: '#C9926A', skinShade: '#AD774F', hair: 'short', hairColor: '#1E1A24', top: 'tee', topColor: '#E4629F', topShade: '#C24A82',
  accessory: null, stubble: true, moustache: true,
};
export const ANAK: AvatarPreset = {
  id: 'anak', skin: '#D9A47C', skinShade: '#BE8860', hair: 'short', hairColor: '#231B28', top: 'tee', topColor: '#F6C945', topShade: '#D9AA2A',
  accessory: null,
};
export const ISTERI: AvatarPreset = {
  id: 'isteri', skin: '#D49C74', skinShade: '#B9805A', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#2BB3A3', topShade: '#1F8A7E',
  hijabColor: '#9C8EE1', hijabShade: '#7A6BC8', accessory: null,
};

const RED = '#D9485F';
const LEAF = '#3FAF6E';
const LEAF_D = '#2C8A55';
const WATER = '#4F79C7';

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

const Bubble: React.FC<{children: React.ReactNode; tail?: 'left' | 'right'; bg?: string; color?: string; size?: number}> = ({children, tail = 'left', bg = '#fff', color = C.navy, size = 46}) => (
  <div style={{position: 'relative', background: bg, color, borderRadius: 40, padding: `${size * 0.45}px ${size * 0.7}px`, fontFamily: FONT, fontWeight: 800, fontSize: size, lineHeight: 1.12, boxShadow: '0 14px 34px rgba(18,11,51,.45)', whiteSpace: 'nowrap'}}>
    {children}
    <div style={{position: 'absolute', bottom: -26, [tail === 'left' ? 'left' : 'right']: 60, width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: `30px solid ${bg}`}} />
  </div>
);

/* ================= Nyamuk (pandangan sisi, viewBox 300×220) ================= */
type Kind = 'aedes' | 'culex' | 'anopheles' | 'mansonia';
const LOOK: Record<Kind, {body: string; body2: string; leg: string; band?: string; speckle?: boolean; wingSpots?: boolean}> = {
  aedes: {body: '#16131C', body2: '#2A2433', leg: '#16131C', band: '#FFFFFF'},
  culex: {body: '#9A7350', body2: '#B88D63', leg: '#7E5C3E'},
  anopheles: {body: '#4A3B33', body2: '#5E4B40', leg: '#3F322B', wingSpots: true},
  mansonia: {body: '#6B5137', body2: '#86684A', leg: '#5A4430', speckle: true},
};

export const Mosquito: React.FC<{kind: Kind; size?: number; flip?: boolean; tilt?: number; style?: React.CSSProperties; seed?: number; still?: boolean}> = ({kind, size = 300, flip, tilt = 0, style, seed = 0, still}) => {
  const f = useCurrentFrame();
  const L = LOOK[kind];
  const flap = still ? 1 : 0.35 + 0.65 * Math.abs(Math.sin((f + seed * 3) * 2.3));
  const id = `${kind}${seed}`;
  const legs: string[] = [
    'M 112 122 L 92 160 L 52 206',
    'M 122 126 L 120 168 L 98 214',
    'M 132 124 L 168 162 L 214 210',
  ];
  return (
    <svg width={size} height={(size * 220) / 300} viewBox="0 0 300 220" style={{overflow: 'visible', transform: `${flip ? 'scaleX(-1) ' : ''}rotate(${tilt}deg)`, ...style}}>
      <defs>
        <clipPath id={`abd${id}`}>
          <ellipse cx={205} cy={98} rx={74} ry={19} transform="rotate(-10 205 98)" />
        </clipPath>
      </defs>
      {/* sayap */}
      <g transform={`translate(148 92) scale(1 ${flap}) translate(-148 -92)`} opacity={0.75}>
        <ellipse cx={205} cy={58} rx={80} ry={17} transform="rotate(-16 205 58)" fill="#DDE8FF" opacity={0.55} />
        <ellipse cx={200} cy={66} rx={70} ry={12} transform="rotate(-8 200 66)" fill="#FFFFFF" opacity={0.35} />
        {L.wingSpots ? [0, 1, 2, 3].map((i) => <circle key={i} cx={160 + i * 30} cy={58 - i * 8} r={6} fill="#2A211C" opacity={0.75} />) : null}
      </g>
      {/* kaki */}
      {legs.map((d, i) => (
        <g key={i}>
          <path d={d} stroke={L.leg} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {L.band
            ? [0.35, 0.6, 0.85].map((t, k) => {
                const pts = d.replace('M ', '').split(' L ').map((s) => s.split(' ').map(Number));
                const seg = t < 0.5 ? [pts[0], pts[1]] : [pts[1], pts[2]];
                const tt = t < 0.5 ? t * 2 : (t - 0.5) * 2;
                const x = seg[0][0] + (seg[1][0] - seg[0][0]) * tt;
                const y = seg[0][1] + (seg[1][1] - seg[0][1]) * tt;
                return <circle key={k} cx={x} cy={y} r={4} fill={L.band} />;
              })
            : null}
          {L.speckle
            ? [0.3, 0.5, 0.7, 0.9].map((t, k) => {
                const pts = d.replace('M ', '').split(' L ').map((s) => s.split(' ').map(Number));
                const x = pts[0][0] + (pts[2][0] - pts[0][0]) * t;
                const y = pts[0][1] + (pts[2][1] - pts[0][1]) * t;
                return <circle key={k} cx={x + 3} cy={y - 2} r={2.5} fill="#E8D8B8" />;
              })
            : null}
        </g>
      ))}
      {/* abdomen */}
      <ellipse cx={205} cy={98} rx={74} ry={19} transform="rotate(-10 205 98)" fill={L.body} />
      <g clipPath={`url(#abd${id})`}>
        {L.band ? [0, 1, 2, 3, 4].map((i) => <rect key={i} x={160 + i * 22} y={60} width={7} height={80} fill={L.band} transform="rotate(-10 205 98)" />) : null}
        {!L.band ? [0, 1, 2, 3].map((i) => <rect key={i} x={165 + i * 24} y={60} width={4} height={80} fill={L.body2} transform="rotate(-10 205 98)" />) : null}
      </g>
      {/* toraks */}
      <ellipse cx={128} cy={104} rx={30} ry={24} fill={L.body2} />
      {L.band ? <path d="M 116 92 Q 128 84 140 92 M 118 100 Q 128 94 138 100" stroke={L.band} strokeWidth={4} fill="none" strokeLinecap="round" /> : null}
      {L.speckle ? [0, 1, 2, 3, 4].map((i) => <circle key={i} cx={112 + random(`ms${i}`) * 34} cy={92 + random(`mt${i}`) * 22} r={2.5} fill="#E8D8B8" />) : null}
      {/* kepala */}
      <circle cx={88} cy={112} r={17} fill={L.body} />
      <circle cx={82} cy={108} r={7} fill="#B33A4F" />
      {/* antena */}
      <path d="M 80 98 L 62 70 M 86 97 L 76 66" stroke={L.leg} strokeWidth={3} strokeLinecap="round" />
      {[0, 1, 2].map((i) => <path key={i} d={`M ${70 - i * 3} ${84 - i * 6} l -6 -2 M ${70 - i * 3} ${84 - i * 6} l 4 -6`} stroke={L.leg} strokeWidth={2} />)}
      {/* proboscis */}
      <path d="M 74 120 L 18 150" stroke={L.body} strokeWidth={5} strokeLinecap="round" />
    </svg>
  );
};

/* nyamuk terbang kecil mengelilingi titik */
const Flyer: React.FC<{cx: number; cy: number; r?: number; kind?: Kind; size?: number; seed?: number; speed?: number}> = ({cx, cy, r = 80, kind = 'aedes', size = 90, seed = 0, speed = 1}) => {
  const f = useCurrentFrame();
  const a = (f / 14) * speed + seed * 2.1;
  const x = cx + Math.cos(a) * r + Math.sin(a * 2.7) * 16;
  const y = cy + Math.sin(a * 1.3) * r * 0.6 + Math.cos(a * 3.1) * 10;
  const flip = Math.sin(a) > 0;
  return (
    <div style={{position: 'absolute', left: x - size / 2, top: y - size / 2}}>
      <Mosquito kind={kind} size={size} flip={flip} seed={seed} />
    </div>
  );
};

/* ---------- ikon khas topik (viewBox 120) ---------- */
export type MIconName = 'tiger' | 'croc' | 'snake' | 'thermo' | 'tube' | 'house' | 'drain' | 'brain' | 'tree' | 'monkey' | 'kiambang' | 'tyre' | 'pot' | 'bucket' | 'net' | 'sleeve' | 'window' | 'skull' | 'search' | 'joint' | 'eye' | 'head';
export const MIcon: React.FC<{name: MIconName; size?: number; f?: number}> = ({name, size = 120, f = 0}) => {
  const w = '#fff', nv = C.navy, y = C.yellow;
  const body = (() => {
    switch (name) {
      case 'tiger':
        return (
          <g>
            <circle cx={30} cy={28} r={16} fill="#F08A24" /><circle cx={90} cy={28} r={16} fill="#F08A24" />
            <circle cx={30} cy={28} r={8} fill="#FFD9B0" /><circle cx={90} cy={28} r={8} fill="#FFD9B0" />
            <circle cx={60} cy={64} r={46} fill="#F08A24" />
            <path d="M 60 20 L 60 36 M 46 24 L 50 38 M 74 24 L 70 38 M 16 60 L 32 62 M 18 76 L 32 72 M 104 60 L 88 62 M 102 76 L 88 72" stroke="#1E1A24" strokeWidth={6} strokeLinecap="round" />
            <ellipse cx={60} cy={84} rx={26} ry={18} fill="#FFF3E2" />
            <circle cx={44} cy={58} r={6} fill="#1E1A24" /><circle cx={76} cy={58} r={6} fill="#1E1A24" />
            <path d="M 52 76 L 68 76 L 60 86 Z" fill="#E4629F" />
          </g>
        );
      case 'croc':
        return (
          <g>
            <path d="M 6 66 Q 6 46 30 44 L 110 54 Q 118 60 110 66 Z" fill="#4E9A54" />
            <path d="M 6 70 Q 8 88 30 88 L 108 76 Q 116 72 108 68 Z" fill="#3D7F44" />
            {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M ${40 + i * 14} 66 l 6 8 l 6 -8`} fill={w} />)}
            <circle cx={30} cy={40} r={11} fill="#4E9A54" /><circle cx={30} cy={38} r={5} fill={y} /><rect x={28} y={34} width={3} height={8} fill="#1E1A24" />
            <circle cx={104} cy={56} r={2.5} fill="#1E1A24" />
          </g>
        );
      case 'snake':
        return (
          <g>
            <path d="M 18 104 Q 60 112 70 90 Q 80 66 46 60 Q 14 52 36 30 Q 50 18 78 22" stroke="#4E9A54" strokeWidth={20} fill="none" strokeLinecap="round" />
            <ellipse cx={86} cy={22} rx={16} ry={12} fill="#4E9A54" />
            <circle cx={90} cy={18} r={3} fill="#1E1A24" />
            <path d="M 100 26 L 114 30 M 114 30 L 118 26 M 114 30 L 118 34" stroke={RED} strokeWidth={3} strokeLinecap="round" />
          </g>
        );
      case 'thermo': {
        const lvl = Math.min(1, f / 40);
        return (
          <g>
            <rect x={48} y={8} width={24} height={82} rx={12} fill={w} />
            <circle cx={60} cy={96} r={20} fill={w} />
            <rect x={54} y={86 - 66 * lvl} width={12} height={66 * lvl + 6} rx={6} fill={RED} />
            <circle cx={60} cy={96} r={13} fill={RED} />
            {[0, 1, 2, 3].map((i) => <rect key={i} x={74} y={22 + i * 16} width={12} height={4} rx={2} fill={C.violet[3]} />)}
          </g>
        );
      }
      case 'tube':
        return (
          <g transform="rotate(20 60 60)">
            <rect x={42} y={8} width={36} height={18} rx={5} fill={C.violet[1]} />
            <path d="M 46 24 L 74 24 L 74 98 A 14 14 0 0 1 46 98 Z" fill={w} />
            <path d="M 48 56 L 72 56 L 72 98 A 12 12 0 0 1 48 98 Z" fill={RED} />
          </g>
        );
      case 'house':
        return (
          <g>
            <path d="M 10 58 L 60 14 L 110 58 Z" fill={C.labelPink} />
            <rect x={22} y={54} width={76} height={56} fill={w} />
            <rect x={50} y={76} width={22} height={34} rx={4} fill={C.violet[1]} />
            <rect x={30} y={66} width={14} height={14} rx={3} fill={y} />
          </g>
        );
      case 'drain':
        return (
          <g>
            <rect x={4} y={40} width={112} height={60} rx={10} fill="#5B5770" />
            <rect x={14} y={52} width={92} height={40} rx={6} fill="#3B3F2A" />
            <path d={`M 14 ${70 + Math.sin(f / 6) * 3} Q 40 ${62 + Math.sin(f / 6) * 3} 60 70 T 106 70 L 106 92 L 14 92 Z`} fill="#6E7A3A" />
            {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={14 + i * 20} y={40} width={8} height={14} fill="#8D89A6" />)}
          </g>
        );
      case 'brain':
        return (
          <g>
            <path d="M 60 18 Q 30 10 20 36 Q 4 46 14 70 Q 10 96 40 98 Q 52 110 60 96 Q 68 110 80 98 Q 110 96 106 70 Q 116 46 100 36 Q 90 10 60 18 Z" fill="#F29CBC" />
            <path d="M 60 20 L 60 96 M 34 40 Q 44 50 36 62 M 86 40 Q 76 50 84 62 M 30 76 Q 44 74 46 86 M 90 76 Q 76 74 74 86" stroke="#D2638E" strokeWidth={5} fill="none" strokeLinecap="round" />
            <circle cx={96} cy={24} r={14} fill={RED} opacity={0.4 + 0.4 * Math.abs(Math.sin(f / 6))} />
          </g>
        );
      case 'tree':
        return (
          <g>
            <rect x={52} y={64} width={16} height={50} fill="#7A5236" />
            <circle cx={60} cy={44} r={34} fill={LEAF_D} />
            <circle cx={38} cy={58} r={22} fill={LEAF} />
            <circle cx={82} cy={58} r={22} fill={LEAF} />
          </g>
        );
      case 'monkey':
        return (
          <g>
            <circle cx={20} cy={56} r={16} fill="#8A5A3B" /><circle cx={100} cy={56} r={16} fill="#8A5A3B" />
            <circle cx={20} cy={56} r={8} fill="#E8B48C" /><circle cx={100} cy={56} r={8} fill="#E8B48C" />
            <circle cx={60} cy={56} r={40} fill="#8A5A3B" />
            <path d="M 34 54 Q 34 34 60 38 Q 86 34 86 54 Q 92 92 60 94 Q 28 92 34 54 Z" fill="#E8B48C" />
            <circle cx={48} cy={56} r={5} fill="#1E1A24" /><circle cx={72} cy={56} r={5} fill="#1E1A24" />
            <path d="M 50 78 Q 60 86 70 78" stroke="#1E1A24" strokeWidth={4} fill="none" strokeLinecap="round" />
          </g>
        );
      case 'kiambang':
        return (
          <g>
            <ellipse cx={60} cy={98} rx={56} ry={12} fill={WATER} opacity={0.8} />
            {[0, 1, 2, 3, 4, 5].map((i) => <ellipse key={i} cx={60} cy={70} rx={16} ry={30} fill={i % 2 ? LEAF : '#6CCB8A'} transform={`rotate(${-75 + i * 30} 60 92)`} />)}
          </g>
        );
      case 'tyre':
        return (
          <g>
            <circle cx={60} cy={60} r={50} fill="#2A2733" />
            <circle cx={60} cy={60} r={24} fill="#55516A" />
            <path d="M 26 70 Q 60 82 94 70 L 92 80 Q 60 96 28 80 Z" fill={WATER} />
            {new Array(10).fill(0).map((_, i) => <rect key={i} x={57} y={8} width={6} height={12} fill="#45414F" transform={`rotate(${i * 36} 60 60)`} />)}
          </g>
        );
      case 'pot':
        return (
          <g>
            <path d="M 20 40 L 100 40 L 88 108 L 32 108 Z" fill="#C9673E" />
            <rect x={14} y={30} width={92} height={18} rx={6} fill="#E07C4F" />
            <ellipse cx={60} cy={40} rx={40} ry={6} fill={WATER} />
            <path d="M 60 30 Q 56 12 44 6 M 60 30 Q 66 10 80 8" stroke={LEAF} strokeWidth={6} fill="none" strokeLinecap="round" />
          </g>
        );
      case 'bucket':
        return (
          <g>
            <path d="M 18 34 L 102 34 L 92 110 L 28 110 Z" fill="#4FA3D8" />
            <ellipse cx={60} cy={34} rx={42} ry={9} fill="#2E6E9C" />
            <ellipse cx={60} cy={36} rx={36} ry={6} fill={WATER} />
            <path d="M 18 34 Q 60 -8 102 34" stroke="#2E6E9C" strokeWidth={5} fill="none" />
          </g>
        );
      case 'net':
        return (
          <g>
            <path d="M 60 6 L 14 50 L 14 112 L 106 112 L 106 50 Z" fill="rgba(255,255,255,0.25)" stroke={w} strokeWidth={4} />
            {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M ${24 + i * 18} 46 L ${24 + i * 18} 110`} stroke={w} strokeWidth={2} opacity={0.7} />)}
            {[0, 1, 2, 3].map((i) => <path key={`h${i}`} d={`M 14 ${62 + i * 14} L 106 ${62 + i * 14}`} stroke={w} strokeWidth={2} opacity={0.7} />)}
            <rect x={20} y={96} width={80} height={14} rx={5} fill={C.violet[3]} />
          </g>
        );
      case 'sleeve':
        return (
          <g>
            <path d="M 40 12 L 80 12 L 104 30 L 116 104 L 96 108 L 88 50 L 88 112 L 32 112 L 32 50 L 24 108 L 4 104 L 16 30 Z" fill="#7FC4F2" />
            <path d="M 46 12 Q 60 28 74 12" stroke={w} strokeWidth={6} fill="none" />
          </g>
        );
      case 'window':
        return (
          <g>
            <rect x={10} y={10} width={100} height={100} rx={10} fill="#8DC9F0" stroke={w} strokeWidth={8} />
            {new Array(7).fill(0).map((_, i) => <path key={i} d={`M ${22 + i * 13} 14 L ${22 + i * 13} 106`} stroke="#3B4A6B" strokeWidth={2} />)}
            {new Array(7).fill(0).map((_, i) => <path key={`h${i}`} d={`M 14 ${22 + i * 13} L 106 ${22 + i * 13}`} stroke="#3B4A6B" strokeWidth={2} />)}
          </g>
        );
      case 'skull':
        return (
          <g>
            <path d="M 60 10 Q 104 10 104 54 Q 104 76 86 84 L 86 104 L 34 104 L 34 84 Q 16 76 16 54 Q 16 10 60 10 Z" fill={w} />
            <circle cx={42} cy={54} r={12} fill={nv} /><circle cx={78} cy={54} r={12} fill={nv} />
            <path d="M 56 70 L 64 70 L 60 80 Z" fill={nv} />
            {[0, 1, 2].map((i) => <rect key={i} x={44 + i * 12} y={90} width={6} height={14} fill={nv} />)}
          </g>
        );
      case 'search':
        return (
          <g>
            <circle cx={50} cy={50} r={34} fill="rgba(255,255,255,0.2)" stroke={w} strokeWidth={10} />
            <path d="M 76 76 L 108 108" stroke={w} strokeWidth={14} strokeLinecap="round" />
          </g>
        );
      case 'joint':
        return (
          <g>
            <path d="M 20 30 L 56 64" stroke="#F2E6D8" strokeWidth={22} strokeLinecap="round" />
            <path d="M 64 64 L 100 98" stroke="#F2E6D8" strokeWidth={22} strokeLinecap="round" />
            <circle cx={60} cy={64} r={18} fill={RED} opacity={0.5 + 0.4 * Math.abs(Math.sin(f / 5))} />
            <path d="M 84 30 L 96 18 M 92 40 L 108 36 M 74 24 L 76 8" stroke={y} strokeWidth={5} strokeLinecap="round" />
          </g>
        );
      case 'eye':
        return (
          <g>
            <path d="M 8 60 Q 60 10 112 60 Q 60 110 8 60 Z" fill={w} />
            <circle cx={60} cy={60} r={22} fill="#6B4A36" /><circle cx={60} cy={60} r={10} fill="#1E1A24" />
            <path d="M 70 86 L 92 104" stroke={RED} strokeWidth={6} strokeLinecap="round" />
          </g>
        );
      case 'head':
        return (
          <g>
            <circle cx={60} cy={62} r={42} fill="#F2C9A6" />
            <path d={`M 22 40 L 34 46 M 98 40 L 86 46 M 60 6 L 60 18`} stroke={y} strokeWidth={6} strokeLinecap="round" transform={`scale(${1 + 0.05 * Math.sin(f / 3)})`} />
            <path d="M 40 58 L 52 62 M 80 58 L 68 62" stroke="#1E1A24" strokeWidth={5} strokeLinecap="round" />
            <path d="M 44 86 Q 60 76 76 86" stroke="#1E1A24" strokeWidth={5} fill="none" strokeLinecap="round" />
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
const Chip: React.FC<{icon?: MIconName; eicon?: React.ComponentProps<typeof Icon>['name']; text: React.ReactNode; bg?: string; color?: string; w?: number; f?: number; size?: number}> = ({icon, eicon, text, bg = C.navy, color = '#fff', w = 520, f = 0, size = 42}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 20, width: w, background: bg, borderRadius: 34, padding: '14px 26px 14px 16px', boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
    <div style={{width: 92, height: 92, borderRadius: 26, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
      {icon ? <MIcon name={icon} size={76} f={f} /> : eicon ? <Icon name={eicon} size={76} f={f} /> : null}
    </div>
    <Txt size={size} color={color}>{text}</Txt>
  </div>
);

const Cross: React.FC<{f: number; size?: number}> = ({f, size = 220}) => {
  const p = interpolate(f, [0, 8], [0, 1], clamp);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{position: 'absolute', left: 0, top: 0}}>
      <path d="M 14 14 L 86 86" stroke={C.labelPink} strokeWidth={12} strokeLinecap="round" strokeDasharray={102} strokeDashoffset={102 * (1 - Math.min(1, p * 2))} />
      <path d="M 86 14 L 14 86" stroke={C.labelPink} strokeWidth={12} strokeLinecap="round" strokeDasharray={102} strokeDashoffset={102 * (1 - Math.max(0, p * 2 - 1))} />
    </svg>
  );
};

/* ================= 0 — Hook: haiwan paling berbahaya? bukan harimau, buaya, ular… tapi nyamuk ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aHar = at(p, 'harimau', 2.9);
  const aBua = at(p, 'buaya', 4.1);
  const aUla = at(p, 'ular', 5.3);
  const aTapi = at(p, 'tapi', 6.2);
  const aNya = at(p, 'nyamuk', 7.2);
  const aSet = at(p, 'setiap tahun', 8.2);
  const aRat = at(p, 'ratusan', 9.9);
  const cards: {icon: MIconName; label: string; a: number; x: number}[] = [
    {icon: 'tiger', label: 'Harimau', a: aHar, x: 40},
    {icon: 'croc', label: 'Buaya', a: aBua, x: 390},
    {icon: 'snake', label: 'Ular', a: aUla, x: 740},
  ];
  const cardsOut = interpolate(f, [aTapi, aTapi + 10], [1, 0], clamp);
  const zoom = interpolate(f, [aTapi, aNya + 6], [0.15, 1], {...clamp, easing: Easing.out(Easing.back(1.4))});
  const shake = f >= aNya && f < aNya + 10 ? Math.sin(f * 3) * 10 : 0;
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={5} glow={f >= aTapi ? C.labelPink : C.violet[2]} />
      <Glow x={540} y={1000} r={560} color={f >= aNya ? C.labelPink : C.violet[3]} opacity={0.3} />
      <div style={{position: 'absolute', top: 480, width: 1080, textAlign: 'center', opacity: interpolate(f, [0, 8, aNya - 4, aNya + 6], [0, 1, 1, 0], clamp)}}>
        <Txt size={50} color={C.violet[4]}>HAIWAN PALING</Txt>
        <Txt size={104} color={C.yellow} style={{textShadow: '0 8px 0 rgba(18,11,51,.6)'}}>BERBAHAYA?</Txt>
      </div>
      {cardsOut > 0
        ? cards.map((c) => (
            <Pop key={c.label} at={c.a} style={{left: c.x, top: 790}}>
              <div style={{opacity: cardsOut, width: 300, height: 360, borderRadius: 40, background: C.navy, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 20px 50px rgba(18,11,51,.5)', position: 'relative'}}>
                <MIcon name={c.icon} size={200} />
                <Txt size={44}>{c.label}</Txt>
                <div style={{position: 'absolute', left: 40, top: 30}}>
                  {f >= c.a + 10 ? <Cross f={f - c.a - 10} /> : null}
                </div>
              </div>
            </Pop>
          ))
        : null}
      {f >= aTapi ? (
        <div style={{position: 'absolute', left: 540 - 380, top: 760, width: 760, height: 560, display: 'flex', justifyContent: 'center', alignItems: 'center', transform: `scale(${zoom}) translateX(${shake}px)`}}>
          <Mosquito kind="aedes" size={720} flip />
        </div>
      ) : null}
      <Pop at={aNya} style={{left: 0, width: 1080, top: 1300, display: 'flex', justifyContent: 'center'}}>
        <Txt size={150} color={C.labelPink} style={{textShadow: '0 10px 0 rgba(18,11,51,.6)', letterSpacing: 4}}>NYAMUK!</Txt>
      </Pop>
      <Pop at={aSet} style={{left: 0, width: 1080, top: 1500, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, background: '#fff', padding: '14px 34px 14px 18px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <MIcon name="skull" size={80} />
          <Txt size={46} color={C.navy}>{f >= aRat ? 'Ratusan ribu nyawa / tahun' : 'Setiap tahun…'}</Txt>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Petang Ahad di taman: nyamuk hinggap, "Alah, nyamuk je" + tepuk ================= */
export const Taman: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aBawa = at(p, 'bawa', 1.0);
  const aNya = at(p, 'beberapa', 3.0);
  const aHing = at(p, 'hinggap', 4.2);
  const aAlah = at(p, 'alah', 5.8);
  const land = interpolate(f, [aHing - 4, aHing + 14], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const slap = f >= aAlah && f < aAlah + 12;
  const ballY = 1260 - Math.abs(Math.sin(f / 7)) * 200;
  const landing: [number, number][] = [[330, 1330], [600, 1350], [450, 1420]];
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      {/* langit senja */}
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.violet[0]} 0%, ${C.pink[0]} 55%, #F6A86B 100%)`}} />
      <div style={{position: 'absolute', left: 700, top: 560, width: 200, height: 200, borderRadius: 100, background: '#FFD27A', boxShadow: '0 0 80px #FFD27A'}} />
      <div style={{position: 'absolute', left: -40, top: 720}}><MIcon name="tree" size={420} /></div>
      <div style={{position: 'absolute', left: 760, top: 820}}><MIcon name="tree" size={320} /></div>
      <div style={{position: 'absolute', left: 0, top: 1330, width: 1080, height: 600, background: LEAF_D}} />
      <div style={{position: 'absolute', left: 0, top: 1330, width: 1080, height: 40, background: LEAF}} />
      <Pop at={4} style={{left: 60, top: 500}}>
        <Pill text="Petang Ahad" bg={C.navy} color={C.yellow} size={46} />
      </Pop>
      {/* bola */}
      <div style={{position: 'absolute', left: 820, top: ballY}}>
        <svg width={120} height={120} viewBox="0 0 120 120">
          <circle cx={60} cy={60} r={54} fill={C.yellow} />
          <path d="M 6 60 Q 60 30 114 60 M 60 6 Q 30 60 60 114" stroke={C.labelPink} strokeWidth={8} fill="none" />
        </svg>
      </div>
      <Who preset={HAFIZ} x={200} y={820 + (slap ? 6 : 0)} w={520} mood={f >= aAlah ? 'happy' : f >= aHing ? 'curious' : 'happy'} pose={slap ? 'clasp' : f >= aBawa ? 'wave' : 'down'} seed={1} />
      <Who preset={ANAK} x={640} y={1080 - Math.abs(Math.sin(f / 6)) * 18} w={330} mood="happy" pose="wave" seed={3} />
      {/* nyamuk datang & hinggap */}
      {f >= aNya
        ? landing.map(([lx, ly], i) => {
            const t = f - aNya;
            const fx = 950 - t * 9 + Math.sin(t / 3 + i) * 40;
            const fy = 900 + i * 80 + Math.cos(t / 4 + i) * 30;
            const x = fx + (lx - fx) * land;
            const y = fy + (ly - fy) * land;
            const squashed = f >= aAlah + 2 && i === 0;
            return squashed ? null : (
              <div key={i} style={{position: 'absolute', left: x - 50, top: y - 40}}>
                <Mosquito kind="aedes" size={100} flip={land < 0.5} seed={i} still={land >= 1} />
              </div>
            );
          })
        : null}
      <Pop at={aAlah - 2} style={{left: 520, top: 640}}>
        <Bubble tail="left" size={50}>"Alah, nyamuk je."</Bubble>
      </Pop>
      {f >= aAlah && f < aAlah + 16 ? (
        <div style={{position: 'absolute', left: 230, top: 1180, transform: `scale(${popScale(f - aAlah)}) rotate(-10deg)`, opacity: interpolate(f - aAlah, [10, 16], [1, 0], clamp)}}>
          <Txt size={110} color={C.yellow} style={{textShadow: '0 8px 0 rgba(18,11,51,.6)'}}>PAP!</Txt>
        </div>
      ) : null}
    </Camera>
  );
};

/* ================= 2 — Lima hari kemudian: demam panas + simptom → isteri bawa ke klinik ================= */
export const Demam: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aDem = at(p, 'demam panas', 1.5);
  const aKep = at(p, 'kepala', 2.9);
  const aMata = at(p, 'belakang mata', 3.9);
  const aSendi = at(p, 'sendi', 5.0);
  const aIst = at(p, 'isterinya', 6.7);
  const aKli = at(p, 'klinik', 8.0);
  const sym: {icon: MIconName; text: string; a: number; bg: string}[] = [
    {icon: 'thermo', text: 'Demam panas', a: aDem, bg: RED},
    {icon: 'head', text: 'Sakit kepala', a: aKep, bg: C.navy},
    {icon: 'eye', text: 'Sakit belakang mata', a: aMata, bg: C.violet[0]},
    {icon: 'joint', text: 'Sendi rasa nak patah', a: aSendi, bg: C.navy},
  ];
  const heat = interpolate(f, [aDem, aDem + 20], [0, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[0]} 0%, ${C.night[3]} 100%)`}} />
      <Glow x={430} y={1150} r={460} color={RED} opacity={0.25 * heat + 0.05 * Math.sin(f / 5)} />
      <Pop at={2} style={{left: 0, width: 1080, top: 480, display: 'flex', justifyContent: 'center'}}>
        <Pill text="5 hari kemudian…" bg={C.labelPink} size={50} />
      </Pop>
      {/* katil */}
      <div style={{position: 'absolute', left: 30, top: 1360, width: 620, height: 140, borderRadius: 30, background: C.violet[2]}} />
      <div style={{position: 'absolute', left: 40, top: 1300, width: 200, height: 80, borderRadius: 30, background: '#fff', opacity: 0.85}} />
      <Who preset={HAFIZ} x={110} y={930} w={440} mood={f >= aSendi ? 'sad' : 'tired'} pose="clasp" seed={1} style={{transform: `translateX(${Math.sin(f * 1.5) * 3 * heat}px)`}} />
      <div style={{position: 'absolute', left: 60, top: 1400, width: 580, height: 170, borderRadius: '70px 70px 24px 24px', background: WATER}} />
      {/* titis peluh */}
      {heat > 0
        ? [0, 1, 2].map((i) => {
            const t = (f + i * 13) % 40;
            return <div key={i} style={{position: 'absolute', left: 230 + i * 90, top: 960 + t * 3, width: 18, height: 26, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: '#9FD6F7', opacity: interpolate(t, [0, 6, 32, 40], [0, 1, 1, 0])}} />;
          })
        : null}
      {sym.map((s, i) => (
        <Pop key={s.text} at={s.a} style={{left: 560, top: 600 + i * 150}}>
          <Chip icon={s.icon} text={s.text} w={480} f={f - s.a} bg={s.bg} size={i === 2 || i === 3 ? 34 : 40} />
        </Pop>
      ))}
      <Pop at={aIst} style={{left: 640, top: 1180}}>
        <Avatar preset={ISTERI} width={360} mood="sad" pose="point" seed={4} />
      </Pop>
      <Pop at={aKli} style={{left: 600, top: 1600}}>
        <Pill text="Terus ke klinik" bg={C.green} size={48} />
      </Pop>
    </Camera>
  );
};

/* ================= 3 — Ujian darah → DENGGI ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSah = at(p, 'sahkan', 0.6);
  const aDen = at(p, 'denggi', 2.6);
  const stamp = f >= aDen - 6 ? interpolate(f - aDen + 6, [0, 6, 10], [1.8, 0.94, 1], clamp) : 0;
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[3]} 0%, ${C.violet[2]} 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      <Pop at={1} style={{left: 640, top: 560}}>
        <div style={{width: 300, height: 300, borderRadius: 150, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(18,11,51,.5)'}}>
          <MIcon name="tube" size={210} />
        </div>
      </Pop>
      <Pop at={aSah - 6} style={{left: 640, top: 890}}>
        <Pill text="Ujian darah" bg={C.navy} color={C.yellow} size={44} />
      </Pop>
      <Who preset={p.preset} x={20} y={860} w={540} mood={f >= aDen ? 'neutral' : 'curious'} pose={f >= aSah ? 'point' : 'chin'} />
      <Who preset={HAFIZ} x={640} y={1090} w={360} mood={f >= aDen ? 'shock' : 'tired'} pose="down" seed={1} />
      {stamp > 0 ? (
        <div style={{position: 'absolute', left: 90, top: 580, width: 900, display: 'flex', justifyContent: 'center', transform: `scale(${stamp}) rotate(-6deg)`, opacity: interpolate(f - aDen + 6, [0, 3], [0, 1], clamp)}}>
          <div style={{background: C.navy, border: `10px solid ${C.labelPink}`, borderRadius: 40, padding: '24px 60px', textAlign: 'center', boxShadow: '0 30px 70px rgba(18,11,51,.6)'}}>
            <Txt size={38} color={C.violet[4]}>DIJANGKITI</Txt>
            <Txt size={140} color={C.yellow} style={{lineHeight: 1.02}}>DENGGI</Txt>
          </div>
        </div>
      ) : null}
    </Camera>
  );
};

/* ================= 4 — Bukan semua nyamuk sama: 4 jenis utama ================= */
const KINDS: {kind: Kind; name: string}[] = [
  {kind: 'aedes', name: 'Aedes'},
  {kind: 'culex', name: 'Culex'},
  {kind: 'anopheles', name: 'Anopheles'},
  {kind: 'mansonia', name: 'Mansonia'},
];
export const Empat: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSama = at(p, 'sama', 1.9);
  const aMy = at(p, 'malaysia', 2.7);
  const aEmp = at(p, 'empat', 3.7);
  const aRis = at(p, 'risiko', 6.3);
  return (
    <Camera dur={p.dur} to={1.06} panY={-15}>
      <NightSky seed={11} glow={C.green} />
      <Pop at={aSama} style={{left: 0, width: 1080, top: 470, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Bukan semua nyamuk sama!" bg={C.labelPink} size={50} />
      </Pop>
      <Pop at={aMy} style={{left: 0, width: 1080, top: 580, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 18}}>
          <Txt size={f >= aEmp ? 130 : 60} color={C.yellow} style={{textShadow: '0 8px 0 rgba(18,11,51,.6)'}}>{f >= aEmp ? '4' : 'Di Malaysia…'}</Txt>
          {f >= aEmp ? <Txt size={56}>jenis utama</Txt> : null}
        </div>
      </Pop>
      {KINDS.map((k, i) => {
        const a = aEmp + 4 + i * 6;
        return (
          <Pop key={k.kind} at={a} style={{left: 40 + (i % 2) * 510, top: 760 + Math.floor(i / 2) * 290}}>
            <div style={{width: 490, height: 270, borderRadius: 36, background: i % 3 === 0 ? C.navy : C.violet[0], display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 40px rgba(18,11,51,.5)'}}>
              <Mosquito kind={k.kind} size={260} seed={i} tilt={k.kind === 'anopheles' ? -28 : 0} />
              <Txt size={44} color={C.yellow}>{`${i + 1}. ${k.name}`}</Txt>
            </div>
          </Pop>
        );
      })}
      <Pop at={aRis} style={{left: 0, width: 1080, top: 1360, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Risiko berbeza" bg={C.green} size={48} />
      </Pop>
      <Who preset={p.preset} x={290} y={1420} w={500} mood="happy" pose={f >= aEmp ? 'point' : 'wave'} />
    </Camera>
  );
};

/* susun atur maklumat bagi setiap jenis */
const KindLayout: React.FC<{
  p: SceneProps;
  kind: Kind;
  name: string;
  bg: string;
  tilt?: number;
  facts: {node: React.ReactNode; a: number}[];
  diseases: {text: string; a: number; icon?: MIconName}[];
  extra?: React.ReactNode;
}> = ({p, kind, name, bg, tilt = 0, facts, diseases, extra}) => {
  const f = useCurrentFrame();
  const enter = interpolate(f, [0, 14], [0, 1], {...clamp, easing: Easing.out(Easing.back(1.3))});
  const hover = Math.sin(f / 10) * 10;
  return (
    <Camera dur={p.dur} to={1.06} panY={-10}>
      <AbsoluteFill style={{background: bg}} />
      <NightSky seed={kind.length * 7} top="transparent" bottom="transparent" stars={30} dim={0.6} />
      {extra}
      <div style={{position: 'absolute', left: 60, top: 470, opacity: enter}}>
        <Txt size={96} color={C.yellow} style={{textShadow: '0 8px 0 rgba(18,11,51,.6)'}}>{name}</Txt>
      </div>
      <div style={{position: 'absolute', left: 520, top: 430 + hover, transform: `scale(${enter})`, transformOrigin: 'center'}}>
        <Mosquito kind={kind} size={500} tilt={tilt} />
      </div>
      {facts.map((x, i) => (
        <Pop key={i} at={x.a} style={{left: 50, top: 800 + i * 122}} origin="left center">
          {x.node}
        </Pop>
      ))}
      {diseases.length ? (
        <div style={{position: 'absolute', left: 0, width: 1080, top: 1500, display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap'}}>
          {diseases.map((d, i) =>
            f >= d.a ? (
              <div key={i} style={{transform: `scale(${popScale(f - d.a)})`, opacity: popOpacity(f - d.a), display: 'flex', alignItems: 'center', gap: 10, background: RED, padding: '10px 26px 10px 14px', borderRadius: 40, boxShadow: '0 12px 30px rgba(18,11,51,.45)'}}>
                {d.icon ? <MIcon name={d.icon} size={60} f={f} /> : null}
                <Txt size={44}>{d.text}</Txt>
              </div>
            ) : null,
          )}
        </div>
      ) : null}
    </Camera>
  );
};

/* ================= 5 — #1 Aedes ================= */
export const Aedes: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aHit = at(p, 'hitam', 1.7);
  const aSiang = at(p, 'siang', 4.0);
  const aBersih = at(p, 'bersih', 7.1);
  const aPasu = at(p, 'pasu', 8.6);
  const aTayar = at(p, 'tayar', 9.3);
  const aBekas = at(p, 'bekas', 10.0);
  const aDen = at(p, 'denggi', 11.8);
  const aChik = at(p, 'chikungunya', 12.5);
  const aZika = at(p, 'zika', 13.5);
  return (
    <KindLayout
      p={p}
      kind="aedes"
      name="AEDES"
      bg={`linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 100%)`}
      facts={[
        {a: aHit, node: <Chip text="Hitam berbelang putih" w={640} f={f} icon="search" bg={C.navy} size={40} />},
        {a: aSiang, node: <Chip text="Gigit siang: pagi & petang" w={640} f={f} eicon="sun" bg={C.violet[1]} size={38} />},
        {a: aBersih, node: <Chip text="Air BERSIH bertakung" w={640} f={f} eicon="drop" bg={C.navy} size={40} />},
        {
          a: aPasu,
          node: (
            <div style={{display: 'flex', gap: 24, alignItems: 'center'}}>
              {[{i: 'pot' as MIconName, a: aPasu, t: 'Pasu'}, {i: 'tyre' as MIconName, a: aTayar, t: 'Tayar'}, {i: 'bucket' as MIconName, a: aBekas, t: 'Bekas'}].map((x) =>
                f >= x.a ? (
                  <div key={x.t} style={{transform: `scale(${popScale(f - x.a)})`, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: 30, padding: '10px 18px'}}>
                    <MIcon name={x.i} size={100} f={f} />
                    <Txt size={30}>{x.t}</Txt>
                  </div>
                ) : null,
              )}
            </div>
          ),
        },
      ]}
      diseases={[
        {text: 'Denggi', a: aDen},
        {text: 'Chikungunya', a: aChik},
        {text: 'Zika', a: aZika},
      ]}
    />
  );
};

/* ================= 6 — #2 Culex ================= */
export const Culex: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aRumah = at(p, 'rumah', 2.0);
  const aMalam = at(p, 'malam', 3.4);
  const aLong = at(p, 'longkang', 4.7);
  const aKotor = at(p, 'kotor', 5.6);
  const aEns = at(p, 'ensefalitis', 7.3);
  const aOtak = at(p, 'radang otak', 9.0);
  return (
    <KindLayout
      p={p}
      kind="culex"
      name="CULEX"
      bg={`linear-gradient(180deg, #0F0C2E 0%, ${C.night[3]} 100%)`}
      extra={
        <div style={{position: 'absolute', left: 860, top: 1020, opacity: interpolate(f, [aMalam, aMalam + 8], [0, 1], clamp)}}>
          <Icon name="moon" size={150} />
        </div>
      }
      facts={[
        {a: aRumah, node: <Chip text="Paling biasa di rumah" w={640} f={f} icon="house" bg={C.navy} size={40} />},
        {a: aMalam, node: <Chip text="Aktif waktu malam" w={640} f={f} eicon="moon" bg={C.violet[1]} size={40} />},
        {a: aLong, node: <Chip text={f >= aKotor ? 'Longkang & air kotor' : 'Longkang'} w={640} f={f} icon="drain" bg={C.navy} size={40} />},
      ]}
      diseases={[{text: f >= aOtak ? 'Ensefalitis Jepun (radang otak)' : 'Ensefalitis Jepun', a: aEns, icon: 'brain'}]}
    />
  );
};

/* ================= 7 — #3 Anopheles ================= */
export const Anopheles: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTong = at(p, 'menonggeng', 2.0);
  const aSenja = at(p, 'senja', 3.6);
  const aHutan = at(p, 'hutan', 5.6);
  const aMal = at(p, 'malaria', 7.6);
  const aMon = at(p, 'monyet', 9.4);
  const aSabah = at(p, 'sabah', 10.4);
  const tilt = interpolate(f, [aTong - 4, aTong + 10], [0, -38], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return (
    <KindLayout
      p={p}
      kind="anopheles"
      name="ANOPHELES"
      tilt={tilt}
      bg={`linear-gradient(180deg, ${C.night[0]} 0%, ${C.pink[2]} 70%, #E08A5B 100%)`}
      extra={
        <>
          <div style={{position: 'absolute', left: 760, top: 1060, opacity: interpolate(f, [aHutan, aHutan + 8], [0, 1], clamp)}}><MIcon name="tree" size={260} /></div>
          <div style={{position: 'absolute', left: 900, top: 1140, opacity: interpolate(f, [aHutan + 3, aHutan + 11], [0, 1], clamp)}}><MIcon name="tree" size={200} /></div>
        </>
      }
      facts={[
        {a: aTong, node: <Chip text="Rehat MENONGGENG" w={640} f={f} icon="search" bg={C.navy} size={40} />},
        {a: aSenja, node: <Chip text="Gigit senja → malam" w={640} f={f} eicon="moon" bg={C.violet[1]} size={40} />},
        {a: aHutan, node: <Chip text="Hutan & pedalaman" w={640} f={f} icon="tree" bg={C.navy} size={40} />},
        {a: aSabah, node: <Pill text="Terutama Sabah & Sarawak" bg={C.yellow} color={C.navy} size={40} />},
      ]}
      diseases={[
        {text: 'Malaria', a: aMal},
        {text: 'Malaria monyet', a: aMon, icon: 'monkey'},
      ]}
    />
  );
};

/* ================= 8 — #4 Mansonia ================= */
export const Mansonia: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aPaya = at(p, 'paya', 1.6);
  const aTum = at(p, 'tumbuhan', 3.0);
  const aKiam = at(p, 'kiambang', 4.1);
  const aKaki = at(p, 'kaki gajah', 6.5);
  const water = interpolate(f, [aPaya, aPaya + 14], [0, 1], clamp);
  return (
    <KindLayout
      p={p}
      kind="mansonia"
      name="MANSONIA"
      bg={`linear-gradient(180deg, ${C.night[1]} 0%, #1F4A4A 100%)`}
      extra={
        <div style={{position: 'absolute', left: 0, top: 1260, width: 1080, height: 660, opacity: water}}>
          <div style={{position: 'absolute', left: 0, top: 60, width: 1080, height: 600, background: `linear-gradient(180deg, #2E6B6B 0%, #1C3F44 100%)`}} />
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{position: 'absolute', left: 60 + i * 210, top: 20 + Math.sin(f / 15 + i) * 6, opacity: f >= aKiam ? 1 : 0.5}}>
              <MIcon name="kiambang" size={150} />
            </div>
          ))}
        </div>
      }
      facts={[
        {a: aPaya, node: <Chip text="Paya & kolam" w={640} f={f} eicon="drop" bg={C.navy} size={40} />},
        {a: aTum, node: <Chip text={f >= aKiam ? 'Tumbuhan air: kiambang' : 'Tumbuhan air'} w={640} f={f} icon="kiambang" bg={C.violet[1]} size={38} />},
      ]}
      diseases={[{text: 'Penyakit kaki gajah', a: aKaki}]}
    />
  );
};

/* ================= 9 — Cara lindungi keluarga ================= */
export const Cegah: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const items: {icon?: MIconName; eicon?: React.ComponentProps<typeof Icon>['name']; text: string; a: number}[] = [
    {eicon: 'timer', text: '10 minit / minggu: cari & musnah', a: at(p, 'sepuluh', 1.4)},
    {icon: 'sleeve', text: 'Baju lengan panjang', a: at(p, 'lengan', 6.2)},
    {eicon: 'lotion', text: 'Losyen penghalau nyamuk', a: at(p, 'losyen', 7.3)},
    {icon: 'net', text: 'Kelambu', a: at(p, 'kelambu', 8.9)},
    {icon: 'window', text: 'Jaring di tingkap', a: at(p, 'jaring', 9.5)},
  ];
  const aCari = at(p, 'cari', 3.5);
  return (
    <Camera dur={p.dur} to={1.05} panY={-10}>
      <NightSky seed={29} glow={C.green} />
      <Pop at={2} style={{left: 0, width: 1080, top: 470, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Lindungi keluarga" bg={C.green} size={54} />
      </Pop>
      {items.map((it, i) => (
        <Pop key={i} at={it.a} style={{left: 50, top: 600 + i * 132}} origin="left center">
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <div style={{width: 48, height: 48, borderRadius: 14, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg width={32} height={32} viewBox="0 0 30 30"><path d="M 5 16 L 12 23 L 25 8" stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <Chip icon={it.icon} eicon={it.eicon} text={it.text} w={i === 0 ? 900 : 700} f={f - it.a} bg={i % 2 ? C.violet[1] : C.navy} size={i === 0 ? 36 : 40} />
          </div>
        </Pop>
      ))}
      {/* cari & musnah: bekas air diterbalikkan */}
      {f >= aCari && f < items[1].a ? (
        <div style={{position: 'absolute', left: 760, top: 1300, transform: `rotate(${interpolate(f - aCari, [0, 16], [0, 150], clamp)}deg)`, transformOrigin: '60px 100px'}}>
          <MIcon name="bucket" size={170} />
        </div>
      ) : null}
      <Who preset={p.preset} x={60} y={1330} w={440} mood="happy" pose="point" />
      <Who preset={HAFIZ} x={520} y={1400} w={300} mood="happy" pose="clasp" seed={1} />
      <Who preset={ANAK} x={800} y={1500} w={230} mood="happy" pose="wave" seed={3} />
    </Camera>
  );
};

/* ================= 10 — Hafiz pulih kerana rawatan awal ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aPul = at(p, 'pulih', 0.9);
  const aRaw = at(p, 'rawatan awal', 2.3);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.violet[0]} 0%, ${C.pink[0]} 60%, #F6A86B 100%)`}} />
      <Glow x={540} y={1050} r={560} color={C.yellow} opacity={0.35} />
      <div style={{position: 'absolute', left: 0, top: 1360, width: 1080, height: 560, background: LEAF_D}} />
      {f >= aPul
        ? new Array(14).fill(0).map((_, i) => {
            const t = f - aPul;
            const ang = random(`sp${i}`) * Math.PI * 2;
            const d = interpolate(t, [0, 24], [0, 260 + random(`sd${i}`) * 160], clamp);
            return <div key={i} style={{position: 'absolute', left: 540 + Math.cos(ang) * d, top: 980 + Math.sin(ang) * d, width: 22, height: 22, borderRadius: 11, background: i % 2 ? C.yellow : '#fff', opacity: interpolate(t, [0, 6, 24, 34], [0, 1, 1, 0], clamp)}} />;
          })
        : null}
      <Who preset={HAFIZ} x={180} y={820} w={520} mood="happy" pose={f >= aPul ? 'wave' : 'clasp'} seed={1} />
      <Who preset={ANAK} x={640} y={1060 - Math.abs(Math.sin(f / 6)) * 16} w={330} mood="happy" pose="wave" seed={3} />
      <Pop at={aPul} style={{left: 0, width: 1080, top: 500, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Hafiz pulih!" bg={C.green} size={70} />
      </Pop>
      <Pop at={aRaw} style={{left: 0, width: 1080, top: 650, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Kerana rawatan awal" bg={C.navy} color={C.yellow} size={48} />
      </Pop>
    </Camera>
  );
};

/* ================= 11 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aDem = at(p, 'demam', 0.5);
  const aTunggu = at(p, 'jangan tunggu', 2.1);
  const aRawat = at(p, 'dapatkan', 3.1);
  const aSaya = at(p, 'saya doktor', 4.6);
  return (
    <Camera dur={p.dur} to={1.06} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 60%, ${C.pink[2]} 100%)`}} />
      <NightSky seed={23} glow={C.pink[0]} top="transparent" bottom="transparent" stars={50} />
      <Glow x={540} y={1000} r={560} color={C.green} opacity={0.25} />
      <Pop at={aDem} style={{left: 0, width: 1080, top: 470, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: '#fff', padding: '12px 30px 12px 16px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <MIcon name="thermo" size={70} f={f} />
          <Txt size={40} color={C.navy}>Demam selepas digigit nyamuk?</Txt>
        </div>
      </Pop>
      <Pop at={aTunggu} style={{left: 0, width: 1080, top: 600, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Jangan tunggu" bg={C.labelPink} size={60} />
      </Pop>
      <Pop at={aRawat} style={{left: 0, width: 1080, top: 740, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, background: C.green, padding: '14px 34px 14px 18px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <Icon name="doctor" size={80} />
          <Txt size={46}>Dapatkan rawatan segera</Txt>
        </div>
      </Pop>
      <Who preset={p.preset} x={250} y={900} w={580} mood="happy" pose={f >= aSaya ? 'wave' : 'clasp'} />
      <Pop at={aSaya} style={{left: 0, width: 1080, top: 1440, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Dr. Azren" bg={C.labelPink} size={58} />
      </Pop>
      <div style={{position: 'absolute', left: 0, top: 1650, width: 1080, textAlign: 'center', opacity: interpolate(f, [aSaya, aSaya + 10], [0, 1], clamp)}}>
        <Txt size={30} color={C.violet[4]}>Video ini untuk pendidikan, bukan diagnosis.</Txt>
      </div>
    </Camera>
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro,
  taman: Taman,
  demam: Demam,
  diagnosis: Diagnosis,
  empat: Empat,
  aedes: Aedes,
  culex: Culex,
  anopheles: Anopheles,
  mansonia: Mansonia,
  cegah: Cegah,
  pulih: Pulih,
  penutup: Penutup,
};
