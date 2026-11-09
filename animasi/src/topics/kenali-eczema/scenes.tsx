import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame, Easing} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset, Mood, Pose} from '../../components/Avatar';
import {Camera, clamp, Glow, NightSky, Pill, Pop, popScale, popOpacity} from '../../components/common';
import {WordsFile, wordTime} from '../../lib/timeline';

export type SceneProps = {preset: AvatarPreset; dur: number; wf: WordsFile; start: number; fps: number};

/* ---------- watak cerita (khas topik ini) ---------- */
export const NAUFAL: AvatarPreset = {
  id: 'naufal', skin: '#E0AC84', skinShade: '#C68E66', hair: 'short', hairColor: '#1E1726', top: 'tee', topColor: '#2BB3A3', topShade: '#1F8A7E',
  accessory: null,
};
export const IBU: AvatarPreset = {
  id: 'ibu', skin: '#D49C74', skinShade: '#B9805A', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#6157C5', topShade: '#4B3C9B',
  hijabColor: '#EC8DB1', hijabShade: '#C8668E', accessory: null,
};

const RED = '#D9485F';
const RED_D = '#B32F4A';
const SKIN_BG = '#F2C9A6';

const at = (p: SceneProps, phrase: string, fallbackSec: number) => {
  const t = wordTime(p.wf, phrase, p.start, p.start + fallbackSec);
  return Math.max(0, Math.round((t - p.start) * p.fps));
};

const Txt: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 44, color = '#fff', style}) => (
  <div style={{fontFamily: FONT, fontWeight: 800, fontSize: size, color, lineHeight: 1.12, ...style}}>{children}</div>
);

const Who: React.FC<{preset: AvatarPreset; x: number; y: number; w: number; style?: React.CSSProperties} & Omit<React.ComponentProps<typeof Avatar>, 'preset' | 'width'>> = ({preset, x, y, w, style, ...rest}) => (
  <div style={{position: 'absolute', left: x, top: y, ...style}}>
    <Avatar preset={preset} width={w} {...rest} />
  </div>
);

/* tompok ekzema (gugusan merah + sisik) dalam koordinat avatar 600×760 */
const Cluster: React.FC<{x: number; y: number; s?: number; id: string}> = ({x, y, s = 1, id}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={38} ry={26} fill={RED} opacity={0.72} />
    <ellipse cx={16} cy={-10} rx={20} ry={13} fill={RED_D} opacity={0.75} />
    <ellipse cx={-18} cy={10} rx={15} ry={10} fill={RED_D} opacity={0.6} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <circle key={i} cx={(random(`${id}x${i}`) - 0.5) * 60} cy={(random(`${id}y${i}`) - 0.5) * 38} r={2.5 + random(`${id}r${i}`) * 2.5} fill="#8E2238" />
    ))}
    {[0, 1, 2].map((i) => (
      <path key={`f${i}`} d={`M ${-20 + i * 18} ${-6 + (i % 2) * 10} l 10 -4`} stroke="#fff" strokeWidth={3} strokeLinecap="round" opacity={0.55} />
    ))}
  </g>
);

/* Naufal dengan tompok ekzema (level 0..1) */
const Naufal: React.FC<{x: number; y: number; w: number; mood?: Mood; pose?: Pose; level?: number; face?: boolean; style?: React.CSSProperties; seed?: number}> = ({
  x, y, w, mood = 'neutral', pose = 'down', level = 0, face = true, style, seed = 2,
}) => {
  const frame = useCurrentFrame();
  const breathe = Math.sin(((frame + seed * 17) / 30) * Math.PI * 0.5) * 4;
  const elbows: [number, number][] = pose === 'clasp' || pose === 'chin' ? [[164, 649], [436, 649]] : [[128, 650], [472, 650]];
  const h = (w * 760) / 600;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, ...style}}>
      <Avatar preset={NAUFAL} width={w} mood={mood} pose={pose} seed={seed} />
      {level > 0 ? (
        <svg viewBox="0 0 600 760" width={w} height={h} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible', opacity: Math.min(1, level)}}>
          <g transform={`translate(0 ${breathe})`}>
            <Cluster x={elbows[0][0]} y={elbows[0][1]} s={0.75} id="el" />
            {pose !== 'wave' && pose !== 'point' ? <Cluster x={elbows[1][0]} y={elbows[1][1]} s={0.75} id="er" /> : null}
            {face ? <Cluster x={192} y={338} s={0.62} id="fl" /> : null}
            {face ? <Cluster x={410} y={330} s={0.5} id="fr" /> : null}
          </g>
        </svg>
      ) : null}
    </div>
  );
};

/* garis gatal bergetar */
const Itch: React.FC<{x: number; y: number; f: number; size?: number; color?: string}> = ({x, y, f, size = 1, color = C.yellow}) => (
  <svg width={160 * size} height={160 * size} viewBox="0 0 160 160" style={{position: 'absolute', left: x, top: y, overflow: 'visible'}}>
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M ${20 + i * 40} 30 q 10 12 0 24 q -10 12 0 24 q 10 12 0 24`} stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" transform={`translate(${Math.sin(f * 1.7 + i) * 6} ${Math.cos(f * 1.3 + i) * 4})`} />
    ))}
  </svg>
);

/* ---------- ikon flat ---------- */
type IconName = 'drop' | 'dropx' | 'scratch' | 'moon' | 'soap' | 'cream' | 'sun' | 'dust' | 'sweater' | 'bath' | 'timer' | 'lotion' | 'shirt' | 'nail' | 'tube' | 'shield' | 'lungs' | 'nose' | 'skin' | 'family' | 'doctor';
export const Icon: React.FC<{name: IconName; size?: number; f?: number}> = ({name, size = 120, f = 0}) => {
  const y = C.yellow, pk = C.labelPink, nv = C.navy, g = C.green, w = '#fff', bl = '#7FC4F2';
  const body = (() => {
    switch (name) {
      case 'drop':
        return <path d="M 60 10 Q 98 58 98 78 A 38 38 0 0 1 22 78 Q 22 58 60 10 Z" fill={bl} />;
      case 'dropx':
        return (
          <g>
            <path d="M 60 10 Q 98 58 98 78 A 38 38 0 0 1 22 78 Q 22 58 60 10 Z" fill={bl} opacity={0.55} />
            <path d="M 26 26 L 96 104 M 96 26 L 26 104" stroke={pk} strokeWidth={12} strokeLinecap="round" />
          </g>
        );
      case 'scratch':
        return (
          <g>
            <rect x={14} y={30} width={92} height={70} rx={20} fill={SKIN_BG} />
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M ${30 + i * 24} ${42 + Math.sin(f / 2 + i) * 4} L ${44 + i * 24} ${88 + Math.sin(f / 2 + i) * 4}`} stroke={RED} strokeWidth={8} strokeLinecap="round" />
            ))}
          </g>
        );
      case 'moon':
        return (
          <g>
            <path d="M 78 16 A 44 44 0 1 0 104 88 A 38 38 0 1 1 78 16 Z" fill={y} />
            <path d="M 88 30 L 100 30 L 88 44 L 100 44" stroke={w} strokeWidth={4} fill="none" strokeLinejoin="round" />
          </g>
        );
      case 'soap':
        return (
          <g>
            <rect x={14} y={46} width={92} height={58} rx={22} fill={C.pink[0]} />
            <rect x={26} y={58} width={68} height={14} rx={7} fill="rgba(255,255,255,.35)" />
            {[0, 1, 2].map((i) => <circle key={i} cx={34 + i * 28} cy={30 - ((f + i * 9) % 26)} r={9 - i * 2} fill="none" stroke={w} strokeWidth={4} opacity={0.85} />)}
          </g>
        );
      case 'cream':
        return (
          <g>
            <path d="M 34 20 L 86 20 L 92 98 Q 92 108 82 108 L 38 108 Q 28 108 28 98 Z" fill={w} />
            <rect x={44} y={6} width={32} height={16} rx={4} fill={C.violet[1]} />
            <rect x={36} y={50} width={48} height={30} rx={6} fill={C.violet[3]} />
            <path d="M 60 56 L 60 74 M 51 65 L 69 65" stroke={w} strokeWidth={6} strokeLinecap="round" />
          </g>
        );
      case 'sun':
        return (
          <g>
            <g transform={`rotate(${f * 2} 60 60)`}>
              {new Array(8).fill(0).map((_, i) => <rect key={i} x={55} y={2} width={10} height={22} rx={5} fill={y} transform={`rotate(${i * 45} 60 60)`} />)}
            </g>
            <circle cx={60} cy={60} r={30} fill={y} />
            <path d="M 96 74 Q 104 88 96 96 Q 88 88 96 74 Z" fill={bl} />
          </g>
        );
      case 'dust':
        return (
          <g>
            {new Array(14).fill(0).map((_, i) => (
              <circle key={i} cx={18 + random(`dx${i}`) * 84 + Math.sin(f / 8 + i) * 4} cy={18 + random(`dy${i}`) * 84 + Math.cos(f / 9 + i) * 4} r={4 + random(`dr${i}`) * 7} fill={['#B9A68E', '#9C8B76', '#D8C8B0'][i % 3]} />
            ))}
          </g>
        );
      case 'sweater':
        return (
          <g>
            <path d="M 40 14 L 80 14 L 112 40 L 98 62 L 88 54 L 88 108 L 32 108 L 32 54 L 22 62 L 8 40 Z" fill="#B76E45" />
            {[0, 1, 2, 3].map((i) => <path key={i} d={`M 38 ${36 + i * 18} l 8 6 l 8 -6 l 8 6 l 8 -6 l 8 6 l 8 -6 l 8 6`} stroke="#E0A479" strokeWidth={4} fill="none" />)}
          </g>
        );
      case 'bath':
        return (
          <g>
            <path d="M 8 58 L 112 58 L 104 92 Q 100 104 86 104 L 34 104 Q 20 104 16 92 Z" fill={w} />
            <rect x={4} y={52} width={112} height={12} rx={6} fill={C.violet[3]} />
            {[0, 1, 2].map((i) => <path key={i} d={`M ${36 + i * 24} ${44 - ((f + i * 8) % 20)} q 6 -8 0 -16 q -6 -8 0 -16`} stroke={bl} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.85} />)}
          </g>
        );
      case 'timer':
        return (
          <g>
            <rect x={50} y={4} width={20} height={12} rx={4} fill={nv} />
            <circle cx={60} cy={66} r={46} fill={w} />
            <path d={`M 60 66 L 60 26 A 40 40 0 0 1 ${60 + 40 * Math.sin(Math.min(1, f / 40) * Math.PI * 0.6)} ${66 - 40 * Math.cos(Math.min(1, f / 40) * Math.PI * 0.6)} Z`} fill={g} />
            <circle cx={60} cy={66} r={6} fill={nv} />
          </g>
        );
      case 'lotion':
        return (
          <g>
            <rect x={30} y={40} width={60} height={72} rx={16} fill={w} />
            <rect x={48} y={18} width={24} height={24} rx={4} fill={g} />
            <path d="M 60 18 L 60 8 L 88 8" stroke={g} strokeWidth={8} strokeLinecap="round" fill="none" />
            <path d="M 60 62 Q 74 76 60 92 Q 46 76 60 62 Z" fill={bl} />
          </g>
        );
      case 'shirt':
        return (
          <g>
            <path d="M 40 14 L 80 14 L 112 40 L 98 62 L 88 54 L 88 108 L 32 108 L 32 54 L 22 62 L 8 40 Z" fill={w} />
            <path d="M 46 14 Q 60 30 74 14" stroke={C.violet[3]} strokeWidth={6} fill="none" />
            <path d="M 50 70 Q 60 56 70 70 Q 60 84 50 70 Z" fill={g} />
          </g>
        );
      case 'nail':
        return (
          <g>
            <rect x={36} y={30} width={48} height={84} rx={24} fill={SKIN_BG} />
            <rect x={44} y={36} width={32} height={30} rx={12} fill="#FBE3E8" />
            <path d="M 18 22 L 102 22" stroke={pk} strokeWidth={6} strokeDasharray="10 8" strokeLinecap="round" />
          </g>
        );
      case 'tube':
        return (
          <g>
            <path d="M 18 40 L 86 30 L 86 90 L 18 80 Z" fill={w} />
            <rect x={86} y={46} width={22} height={28} rx={5} fill={C.violet[1]} />
            <path d="M 18 40 L 10 44 L 10 76 L 18 80" fill={C.violet[3]} />
            <rect x={34} y={50} width={36} height={20} rx={5} fill={g} />
          </g>
        );
      case 'shield':
        return (
          <g>
            <path d="M 60 8 L 104 24 Q 104 84 60 112 Q 16 84 16 24 Z" fill={g} />
            <path d="M 38 60 L 54 76 L 84 44" stroke={w} strokeWidth={11} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      case 'lungs':
        return (
          <g>
            <path d="M 54 30 Q 20 26 14 70 Q 10 104 40 104 Q 54 104 54 84 Z" fill={pk} />
            <path d="M 66 30 Q 100 26 106 70 Q 110 104 80 104 Q 66 104 66 84 Z" fill={pk} />
            <path d="M 60 8 L 60 52 M 60 44 L 48 58 M 60 44 L 72 58" stroke={w} strokeWidth={7} strokeLinecap="round" fill="none" />
          </g>
        );
      case 'nose':
        return (
          <g>
            <path d="M 54 12 Q 50 60 26 82 Q 22 100 44 100 Q 56 108 66 98 Q 92 102 92 84 Q 72 62 70 12 Z" fill={SKIN_BG} />
            <ellipse cx={46} cy={92} rx={7} ry={5} fill="#B7826A" />
            <ellipse cx={74} cy={92} rx={7} ry={5} fill="#B7826A" />
            <path d="M 98 30 q 8 6 0 12 M 104 22 q 12 12 0 26" stroke={bl} strokeWidth={5} fill="none" strokeLinecap="round" />
          </g>
        );
      case 'skin':
        return (
          <g>
            <rect x={10} y={20} width={100} height={80} rx={22} fill={SKIN_BG} />
            <g transform="translate(60 60) scale(1)"><ellipse rx={30} ry={20} fill={RED} opacity={0.8} /><ellipse cx={12} cy={-6} rx={14} ry={9} fill={RED_D} /></g>
          </g>
        );
      case 'family':
        return (
          <g>
            <circle cx={36} cy={34} r={16} fill={w} />
            <circle cx={84} cy={34} r={16} fill={w} />
            <circle cx={60} cy={62} r={12} fill={y} />
            <path d="M 12 100 Q 12 60 36 60 Q 52 60 56 76 M 108 100 Q 108 60 84 60 Q 68 60 64 76" fill={w} stroke={w} strokeWidth={4} />
            <path d="M 42 108 Q 42 82 60 82 Q 78 82 78 108 Z" fill={y} />
          </g>
        );
      case 'doctor':
        return (
          <g>
            <rect x={14} y={14} width={92} height={92} rx={24} fill={w} />
            <rect x={48} y={28} width={24} height={64} rx={6} fill={pk} />
            <rect x={28} y={48} width={64} height={24} rx={6} fill={pk} />
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
const Sym: React.FC<{icon: IconName; text: React.ReactNode; bg?: string; color?: string; w?: number; f?: number; size?: number}> = ({icon, text, bg = C.navy, color = '#fff', w = 520, f = 0, size = 42}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 20, width: w, background: bg, borderRadius: 34, padding: '16px 26px 16px 18px', boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
    <div style={{width: 92, height: 92, borderRadius: 26, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
      <Icon name={icon} size={76} f={f} />
    </div>
    <Txt size={size} color={color}>{text}</Txt>
  </div>
);

const Bubble: React.FC<{children: React.ReactNode; tail?: 'left' | 'right'; bg?: string; color?: string; size?: number}> = ({children, tail = 'left', bg = '#fff', color = C.navy, size = 46}) => (
  <div style={{position: 'relative', background: bg, color, borderRadius: 40, padding: `${size * 0.45}px ${size * 0.7}px`, fontFamily: FONT, fontWeight: 800, fontSize: size, lineHeight: 1.12, boxShadow: '0 14px 34px rgba(18,11,51,.45)', whiteSpace: 'nowrap'}}>
    {children}
    <div style={{position: 'absolute', bottom: -26, [tail === 'left' ? 'left' : 'right']: 60, width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: `30px solid ${bg}`}} />
  </div>
);

const Room: React.FC<{wall: string; floor: string; floorY?: number}> = ({wall, floor, floorY = 1260}) => (
  <>
    <AbsoluteFill style={{background: wall}} />
    <div style={{position: 'absolute', left: 0, top: floorY, width: 1080, height: 1920 - floorY, background: floor}} />
  </>
);

const Check: React.FC<{on: boolean; f: number}> = ({on, f}) => (
  <div style={{width: 44, height: 44, borderRadius: 12, background: on ? C.green : C.violet[4], display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${on ? popScale(f) : 1})`, flexShrink: 0}}>
    {on ? <svg width={30} height={30} viewBox="0 0 30 30"><path d="M 5 16 L 12 23 L 25 8" stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg> : null}
  </div>
);

/* ================= 0 — Intro: tajuk + Naufal ceria → kulit berubah ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aEnam = at(p, 'enam', 1.0);
  const aCeria = at(p, 'ceria', 3.3);
  const aTapi = at(p, 'tapi', 4.2);
  const aBer = at(p, 'berubah', 6.2);
  const titleOut = interpolate(f, [aTapi - 4, aTapi + 8], [1, 0], clamp);
  const level = interpolate(f, [aBer - 10, aBer + 8], [0, 1], clamp);
  const bounce = f < aTapi ? -Math.abs(Math.sin(f / 6)) * 22 : 0;
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={7} glow={f >= aBer ? C.pink[0] : C.green} />
      <Glow x={540} y={1250} r={520} color={f >= aBer ? C.pink[0] : C.green} opacity={0.3} />
      <div style={{position: 'absolute', top: 530, width: 1080, textAlign: 'center', opacity: titleOut, transform: `translateY(${(1 - titleOut) * -30}px)`}}>
        <Txt size={58} color={C.violet[4]}>KENALI</Txt>
        <Txt size={170} color={C.yellow} style={{lineHeight: 1, textShadow: '0 8px 0 rgba(18,11,51,.6)'}}>ECZEMA</Txt>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 16}}>
          <Pill text="Kulit kering & gatal" bg={C.labelPink} size={56} />
        </div>
      </div>
      {/* bola */}
      {f < aTapi + 10 ? (
        <div style={{position: 'absolute', left: 150, top: 1180 - Math.abs(Math.sin(f / 7)) * 220, opacity: interpolate(f, [aTapi, aTapi + 10], [1, 0], clamp)}}>
          <svg width={150} height={150} viewBox="0 0 120 120">
            <circle cx={60} cy={60} r={54} fill={C.yellow} />
            <path d="M 6 60 Q 60 30 114 60 M 60 6 Q 30 60 60 114" stroke={C.labelPink} strokeWidth={8} fill="none" />
          </svg>
        </div>
      ) : null}
      <Pop at={aEnam} style={{left: 560, top: 960}}>
        <div style={{opacity: titleOut > 0 ? 1 : interpolate(f, [aTapi, aTapi + 8], [1, 0], clamp)}}>
          <Pill text="Naufal, 6 tahun" bg={C.green} size={46} />
        </div>
      </Pop>
      <Naufal x={330} y={1060 + bounce} w={440} mood={f >= aBer ? 'shock' : f >= aCeria ? 'happy' : 'happy'} pose={f >= aBer ? 'clasp' : f >= aCeria ? 'wave' : 'down'} level={level} />
      {f >= aBer ? (
        <>
          <Pop at={aBer} style={{left: 160, top: 860}}>
            <Txt size={110} color={C.labelPink} style={{transform: `rotate(-10deg)`}}>!</Txt>
          </Pop>
          <Pop at={aBer + 3} style={{left: 820, top: 880}}>
            <Txt size={110} color={C.labelPink} style={{transform: `rotate(10deg)`}}>?</Txt>
          </Pop>
        </>
      ) : null}
    </Camera>
  );
};

/* ================= 1 — Tompok merah di siku & lutut → gatal → malam garu, tak boleh tidur ================= */
export const Gatal: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTompok = at(p, 'tompok', 0.4);
  const aKering = at(p, 'kering', 1.2);
  const aSiku = at(p, 'siku', 2.1);
  const aLutut = at(p, 'lutut', 3.0);
  const aGatal = at(p, 'gatalnya', 3.7);
  const aMalam = at(p, 'malam-malam', 5.5);
  const aGaru = at(p, 'garu', 6.7);
  const aLuka = at(p, 'luka', 7.3);
  const aTidur = at(p, 'tak boleh tidur', 8.3);
  const night = f >= aMalam;
  const lvl = interpolate(f, [aTompok, aTompok + 12], [0, 1], clamp);
  const flakes = interpolate(f, [aKering, aKering + 10], [0, 1], clamp);
  const shake = f >= aGatal && f < aMalam ? Math.sin(f * 2.2) * 8 : 0;
  if (!night) {
    return (
      <Camera dur={aMalam} to={1.1} panX={-15}>
        <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[2]} 0%, ${C.violet[0]} 100%)`}} />
        <Glow x={540} y={1000} r={560} color={C.pink[0]} opacity={0.35} />
        {/* lengan close-up: bahu → siku → tangan */}
        <svg width={1080} height={1200} viewBox="0 0 1080 1200" style={{position: 'absolute', left: 0, top: 440, transform: `translateX(${shake}px)`}}>
          <path d="M -40 250 L 520 600 L 180 1150" stroke={NAUFAL.skinShade} strokeWidth={250} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M -40 230 L 510 580 L 170 1130" stroke={NAUFAL.skin} strokeWidth={220} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M -60 170 L 200 330 L 120 500 L -60 400 Z" fill={NAUFAL.topColor} />
          {/* lipatan siku */}
          <path d="M 430 560 Q 470 600 450 660" stroke={NAUFAL.skinShade} strokeWidth={10} fill="none" strokeLinecap="round" />
          <g opacity={lvl}>
            <g transform="translate(440 600) scale(2.6)"><Cluster x={0} y={0} id="arm1" /></g>
            <g transform="translate(330 520) scale(1.5)"><Cluster x={0} y={0} id="arm2" /></g>
            <g transform="translate(400 720) scale(1.4)"><Cluster x={0} y={0} id="arm3" /></g>
          </g>
          {/* sisik kering */}
          <g opacity={flakes}>
            {new Array(16).fill(0).map((_, i) => {
              const x = 300 + random(`fk${i}`) * 260;
              const y = 470 + random(`fy${i}`) * 300;
              return <path key={i} d={`M ${x} ${y} l 22 -8 l -6 14 Z`} fill="#FFF5EC" opacity={0.85} />;
            })}
          </g>
        </svg>
        <Pop at={aTompok} style={{left: 560, top: 520}}>
          <Pill text="Tompok merah" bg={C.labelPink} size={46} />
        </Pop>
        <Pop at={aKering} style={{left: 620, top: 640}}>
          <Pill text="Kering" bg="#fff" color={C.navy} size={46} />
        </Pop>
        <Pop at={aSiku} style={{left: 120, top: 1500}}>
          <Pill text="Lipatan siku" bg={C.navy} color={C.yellow} size={44} />
        </Pop>
        <Pop at={aLutut} style={{left: 580, top: 1500}}>
          <Pill text="Belakang lutut" bg={C.navy} color={C.yellow} size={44} />
        </Pop>
        {f >= aGatal ? (
          <>
            <Itch x={640} y={820} f={f} size={1.3} />
            <Itch x={120} y={700} f={f + 3} size={1} color={C.pink[0]} />
            <Pop at={aGatal} style={{left: 600, top: 1100}}>
              <Txt size={110} color={C.yellow} style={{transform: `rotate(-8deg) translateX(${Math.sin(f * 1.8) * 6}px)`, textShadow: '0 8px 0 rgba(18,11,51,.6)'}}>GATAL!</Txt>
            </Pop>
          </>
        ) : null}
      </Camera>
    );
  }
  const fn = f - aMalam;
  return (
    <Camera dur={p.dur - aMalam} to={1.08} panY={-10}>
      <Room wall={`linear-gradient(180deg, ${C.night[0]} 0%, ${C.night[3]} 100%)`} floor={C.night[1]} floorY={1400} />
      {/* tingkap bulan */}
      <div style={{position: 'absolute', left: 620, top: 470, width: 360, height: 380, borderRadius: 30, overflow: 'hidden', background: '#141040', border: `18px solid ${C.night[0]}`}}>
        <div style={{position: 'absolute', left: 190, top: 70, width: 100, height: 100, borderRadius: 50, background: '#F4F1FF', boxShadow: '0 0 40px #fff'}} />
        {new Array(8).fill(0).map((_, i) => (
          <div key={i} style={{position: 'absolute', left: random(`ns${i}`) * 320, top: random(`ny${i}`) * 300, width: 6, height: 6, borderRadius: 3, background: '#fff', opacity: 0.4 + 0.6 * Math.abs(Math.sin(f / 10 + i))}} />
        ))}
        <div style={{position: 'absolute', left: 152, top: 0, width: 20, height: 380, background: C.night[0]}} />
      </div>
      {/* jam */}
      <Pop at={4} style={{left: 90, top: 500}}>
        <div style={{background: C.navy, borderRadius: 30, padding: '14px 30px', boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
          <Txt size={80} color={C.labelPink} style={{fontVariantNumeric: 'tabular-nums'}}>{`0${1 + Math.floor(Math.min(fn, 200) / 60)}:${String(Math.floor((Math.min(fn, 200) % 60) * 0.98)).padStart(2, '0')}`}</Txt>
        </div>
      </Pop>
      {/* katil */}
      <div style={{position: 'absolute', left: 40, top: 1290, width: 1000, height: 160, borderRadius: 30, background: C.violet[2]}} />
      <div style={{position: 'absolute', left: 60, top: 1230, width: 240, height: 90, borderRadius: 30, background: '#fff', opacity: 0.85}} />
      <Naufal x={300} y={860} w={470} mood={f >= aLuka ? 'sad' : 'tired'} pose="clasp" level={1} style={{transform: `translateX(${f >= aGaru ? Math.sin(f * 1.6) * 7 : 0}px)`}} />
      <div style={{position: 'absolute', left: 120, top: 1330, width: 860, height: 200, borderRadius: '80px 80px 30px 30px', background: '#4F79C7'}} />
      {f >= aGaru ? (
        <>
          <Itch x={250} y={1080} f={f} size={1.1} />
          <Itch x={680} y={1060} f={f + 5} size={1.1} />
          <Pop at={aGaru} style={{left: 90, top: 880}}>
            <Bubble tail="right" size={44}>garu… garu…</Bubble>
          </Pop>
        </>
      ) : null}
      <Pop at={aLuka} style={{left: 700, top: 930}}>
        <Pill text="Sampai luka" bg={C.labelPink} size={44} />
      </Pop>
      <Pop at={aTidur} style={{left: 0, width: 1080, top: 1560, display: 'flex', justifyContent: 'center'}}>
        <Sym icon="moon" text="Tak boleh tidur" w={560} bg={C.navy} />
      </Pop>
    </Camera>
  );
};

/* ================= 2 — Ibu cuba sabun & krim → makin teruk → bawa ke klinik ================= */
export const Ibu: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSabun = at(p, 'sabun', 0.9);
  const aKrim = at(p, 'krim', 2.5);
  const aTeruk = at(p, 'teruk', 3.6);
  const aAkhir = at(p, 'akhirnya', 4.4);
  const aDoktor = at(p, 'doktor', 6.4);
  const pan = interpolate(f, [aAkhir - 2, aAkhir + 16], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const walk = interpolate(f, [aAkhir + 10, p.dur], [0, 1], clamp);
  const items: {icon: IconName; a: number; x: number; y: number}[] = [
    {icon: 'soap', a: aSabun, x: 560, y: 520},
    {icon: 'soap', a: aSabun + 5, x: 760, y: 600},
    {icon: 'cream', a: aKrim, x: 600, y: 760},
    {icon: 'tube', a: aKrim + 4, x: 800, y: 820},
    {icon: 'cream', a: aKrim + 8, x: 700, y: 980},
  ];
  return (
    <Camera dur={p.dur} to={1.06}>
      <AbsoluteFill style={{transform: `translateX(${-pan * 1080}px)`}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, background: `linear-gradient(180deg, ${C.violet[0]} 0%, ${C.night[4]} 100%)`}} />
        <div style={{position: 'absolute', left: 0, top: 1360, width: 1080, height: 600, background: C.night[2]}} />
        {/* rak bilik air */}
        <div style={{position: 'absolute', left: 520, top: 690, width: 480, height: 22, borderRadius: 10, background: C.pink[2]}} />
        <div style={{position: 'absolute', left: 520, top: 940, width: 480, height: 22, borderRadius: 10, background: C.pink[2]}} />
        <div style={{position: 'absolute', left: 520, top: 1160, width: 480, height: 22, borderRadius: 10, background: C.pink[2]}} />
        {items.map((it, i) => (
          <Pop key={i} at={it.a} style={{left: it.x, top: it.y}}>
            <Icon name={it.icon} size={150} f={f} />
          </Pop>
        ))}
        {f >= aTeruk ? (
          <div style={{position: 'absolute', left: 520, top: 500, width: 500, height: 700, opacity: popOpacity(f - aTeruk)}}>
            <svg width={500} height={700} viewBox="0 0 500 700">
              <path d="M 40 40 L 460 660 M 460 40 L 40 660" stroke={C.labelPink} strokeWidth={22} strokeLinecap="round" strokeDasharray={760} strokeDashoffset={760 * (1 - interpolate(f - aTeruk, [0, 10], [0, 1], clamp))} />
            </svg>
          </div>
        ) : null}
        <Who preset={IBU} x={20} y={880} w={430} mood={f >= aTeruk ? 'sad' : 'curious'} pose={f >= aKrim ? 'point' : 'clasp'} seed={4} />
        <Naufal x={330} y={1120} w={300} mood={f >= aTeruk ? 'sad' : 'tired'} pose="clasp" level={f >= aTeruk ? 1 : 0.75} />
        <Pop at={aTeruk} style={{left: 300, top: 1500}}>
          <Pill text="Makin teruk" bg={C.labelPink} size={52} />
        </Pop>
        {/* klinik */}
        <div style={{position: 'absolute', left: 1080, top: 0, width: 1080, height: 1920, background: `linear-gradient(180deg, ${C.violet[3]} 0%, ${C.pink[0]} 100%)`}} />
        <div style={{position: 'absolute', left: 1080, top: 1440, width: 1080, height: 500, background: C.night[2]}} />
        <div style={{position: 'absolute', left: 1080 + 120, top: 640, width: 840, height: 800, background: '#F5EEF9', borderRadius: '30px 30px 0 0'}} />
        <div style={{position: 'absolute', left: 1080 + 160, top: 680, width: 760, height: 150, background: C.navy, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26}}>
          <Icon name="doctor" size={96} />
          <Txt size={64} color={C.yellow}>KLINIK</Txt>
        </div>
        <div style={{position: 'absolute', left: 1080 + 420, top: 980, width: 240, height: 460, background: '#4FD8D8', borderRadius: '20px 20px 0 0', opacity: 0.85}} />
        {[0, 1].map((i) => <div key={i} style={{position: 'absolute', left: 1080 + [190, 720][i], top: 960, width: 170, height: 200, borderRadius: 18, background: C.violet[3]}} />)}
        <div style={{position: 'absolute', left: 1080 + 60 + walk * 280, top: 1060, display: 'flex', alignItems: 'flex-end', transform: `translateY(${-Math.abs(Math.sin(f / 4)) * 10}px)`}}>
          <Avatar preset={IBU} width={280} mood="neutral" pose="down" seed={4} />
          <div style={{marginLeft: -50, position: 'relative', width: 200, height: (200 * 760) / 600}}>
            <Naufal x={0} y={0} w={200} mood="sad" pose="down" level={1} />
          </div>
        </div>
      </AbsoluteFill>
      <Pop at={aDoktor} style={{left: 330, top: 520}}>
        <Pill text="Jumpa doktor" bg={C.green} size={48} />
      </Pop>
    </Camera>
  );
};

/* ================= 3 — Pemeriksaan → diagnosis eczema atopik ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSah = at(p, 'sahkan', 1.5);
  const aDiag = at(p, 'menghidap', 3.0);
  const checks = ['Kulit kering', 'Gatal', 'Ruam di lipatan', 'Sejarah keluarga'];
  const stamp = f >= aDiag ? interpolate(f - aDiag, [0, 6, 10], [1.7, 0.94, 1], clamp) : 0;
  return (
    <Camera dur={p.dur} to={1.08} panY={-10}>
      <Room wall={`linear-gradient(180deg, ${C.night[3]} 0%, ${C.violet[2]} 100%)`} floor={C.night[1]} floorY={1420} />
      <Glow x={300} y={1000} r={460} color={C.violet[3]} opacity={0.35} />
      <Pop at={3} style={{left: 600, top: 500}}>
        <div style={{width: 420, background: '#fff', borderRadius: 30, padding: '60px 30px 26px', position: 'relative', boxShadow: '0 20px 50px rgba(18,11,51,.5)', transform: 'rotate(4deg)'}}>
          <div style={{position: 'absolute', left: 140, top: -20, width: 140, height: 56, borderRadius: 16, background: C.navy}} />
          <Txt size={32} color={C.violet[2]} style={{marginBottom: 12}}>PEMERIKSAAN</Txt>
          {checks.map((c2, i) => {
            const a = 8 + i * 8;
            return (
              <div key={i} style={{display: 'flex', alignItems: 'center', gap: 16, margin: '12px 0'}}>
                <Check on={f >= a} f={f - a} />
                <Txt size={34} color={C.navy}>{c2}</Txt>
              </div>
            );
          })}
        </div>
      </Pop>
      <div style={{position: 'absolute', left: 0, top: 1330, width: 1080, height: 70, background: C.pink[2], borderRadius: 16}} />
      <Who preset={p.preset} x={10} y={840} w={520} mood={f >= aSah ? 'neutral' : 'curious'} pose={f >= aSah ? 'clasp' : 'chin'} />
      <Naufal x={650} y={1020} w={340} mood={f >= aDiag ? 'curious' : 'sad'} pose="down" level={1} />
      {/* kanta pembesar */}
      {f < aDiag ? (
        <div style={{position: 'absolute', left: 560 + Math.sin(f / 8) * 30, top: 1200 + Math.cos(f / 10) * 20}}>
          <svg width={200} height={200} viewBox="0 0 200 200">
            <circle cx={80} cy={80} r={58} fill="rgba(255,255,255,0.25)" stroke={C.navy} strokeWidth={14} />
            <path d="M 122 122 L 180 180" stroke={C.navy} strokeWidth={22} strokeLinecap="round" />
          </svg>
        </div>
      ) : null}
      {f >= aDiag ? (
        <div style={{position: 'absolute', left: 90, top: 560, width: 900, display: 'flex', justifyContent: 'center', transform: `scale(${stamp}) rotate(-5deg)`, opacity: interpolate(f - aDiag, [0, 3], [0, 1], clamp)}}>
          <div style={{background: C.navy, border: `10px solid ${C.labelPink}`, borderRadius: 40, padding: '26px 54px', textAlign: 'center', boxShadow: '0 30px 70px rgba(18,11,51,.6)'}}>
            <Txt size={38} color={C.violet[4]}>DIAGNOSIS</Txt>
            <Txt size={110} color={C.yellow} style={{lineHeight: 1.02}}>ECZEMA</Txt>
            <Txt size={62}>ATOPIK</Txt>
          </div>
        </div>
      ) : null}
    </Camera>
  );
};

/* ================= 4 — Apa itu eczema: lapisan pelindung kulit lemah; tidak berjangkit ================= */
export const Apa: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aRadang = at(p, 'keradangan', 2.0);
  const aLapisan = at(p, 'lapisan', 4.1);
  const aLemah = at(p, 'lemah', 5.4);
  const aKering = at(p, 'kering', 7.1);
  const aMeradang = at(p, 'meradang', 8.0);
  const aIngat = at(p, 'ingat', 9.0);
  const aJangkit = at(p, 'tidak berjangkit', 10.1);
  const gap = interpolate(f, [aLemah, aLemah + 14], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const diagOut = interpolate(f, [aIngat - 4, aIngat + 6], [1, 0], clamp);
  const bricks: {x: number; y: number; w: number}[] = [];
  for (let r = 0; r < 3; r++) for (let c2 = 0; c2 < 5; c2++) bricks.push({x: c2 * 172 + (r % 2 ? 86 : 0) - 40, y: r * 92, w: 156});
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <NightSky seed={13} glow={C.violet[2]} />
      <Pop at={aRadang} style={{left: 0, width: 1080, top: 470, display: 'flex', justifyContent: 'center'}}>
        <div style={{opacity: diagOut}}>
          <Pill text="Keradangan kulit berpanjangan" bg={C.labelPink} size={44} />
        </div>
      </Pop>
      {f >= aLapisan && diagOut > 0 ? (
        <div style={{position: 'absolute', left: 90, top: 600, width: 900, height: 560, borderRadius: 40, overflow: 'hidden', background: C.navy, opacity: popOpacity(f - aLapisan) * diagOut, boxShadow: '0 20px 50px rgba(18,11,51,.55)'}}>
          <Txt size={34} color={C.violet[4]} style={{position: 'absolute', left: 36, top: 24}}>LAPISAN PELINDUNG KULIT</Txt>
          {/* udara atas */}
          <svg width={900} height={560} viewBox="0 0 900 560" style={{position: 'absolute', left: 0, top: 0}}>
            {/* air keluar */}
            {f >= aKering
              ? [0, 1, 2, 3].map((i) => {
                  const ff = (f - aKering + i * 9) % 36;
                  return <path key={i} transform={`translate(${170 + i * 180} ${300 - ff * 6}) scale(0.5)`} d="M 0 -40 Q 30 0 30 16 A 30 30 0 0 1 -30 16 Q -30 0 0 -40 Z" fill="#7FC4F2" opacity={interpolate(ff, [0, 6, 28, 36], [0, 1, 1, 0])} />;
                })
              : null}
            {/* bahan perengsa masuk */}
            {f >= aMeradang
              ? [0, 1, 2, 3, 4].map((i) => {
                  const ff = (f - aMeradang + i * 7) % 34;
                  return <circle key={i} cx={130 + i * 160} cy={90 + ff * 6} r={11} fill={C.yellow} opacity={interpolate(ff, [0, 5, 26, 34], [0, 1, 1, 0])} />;
                })
              : null}
            <g transform="translate(0 290)">
              {bricks.map((b, i) => {
                const dx = (random(`gx${i}`) - 0.5) * 50 * gap;
                const dy = (random(`gy${i}`) - 0.5) * 34 * gap;
                const rot = (random(`gr${i}`) - 0.5) * 14 * gap;
                const hot = f >= aMeradang ? interpolate(f - aMeradang, [0, 12], [0, 1], clamp) * (i % 3 === 0 ? 1 : 0.5) : 0;
                return (
                  <g key={i} transform={`translate(${b.x + dx} ${b.y + dy}) rotate(${rot} 78 40)`}>
                    <rect width={b.w} height={80} rx={18} fill={SKIN_BG} />
                    <rect width={b.w} height={80} rx={18} fill={RED} opacity={hot * 0.75} />
                  </g>
                );
              })}
            </g>
          </svg>
          <Pop at={aLemah} style={{left: 560, top: 90}}>
            <Pill text="Lemah" bg={C.labelPink} size={42} />
          </Pop>
          <Pop at={aKering} style={{left: 520, top: 170}}>
            <Pill text="Air hilang → kering" bg="#4F79C7" size={34} />
          </Pop>
          <Pop at={aMeradang} style={{left: 60, top: 170}}>
            <Pill text="Perengsa masuk" bg={C.yellow} color={C.navy} size={34} />
          </Pop>
        </div>
      ) : null}
      {f >= aIngat ? (
        <div style={{position: 'absolute', left: 0, width: 1080, top: 540, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
          <Pop at={aIngat} style={{position: 'relative'}}>
            <div style={{position: 'relative', width: 280, height: 280, borderRadius: 140, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(18,11,51,.55)'}}>
              <Icon name="shield" size={190} />
            </div>
          </Pop>
          <Pop at={aJangkit} style={{position: 'relative'}}>
            <Pill text="TIDAK BERJANGKIT" bg={C.green} size={70} />
          </Pop>
        </div>
      ) : null}
      <Who preset={p.preset} x={250} y={1150} w={560} mood="happy" pose={f >= aIngat ? 'point' : f >= aLapisan ? 'clasp' : 'wave'} />
    </Camera>
  );
};

/* ================= 5 — Tanda: kering, sangat gatal, waktu malam ================= */
export const Tanda: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const items: {icon: IconName; text: string; a: number; bg: string}[] = [
    {icon: 'dropx', text: 'Kulit kering', a: at(p, 'kulit kering', 1.1), bg: C.violet[0]},
    {icon: 'scratch', text: 'Sangat gatal', a: at(p, 'sangat', 2.0), bg: C.navy},
    {icon: 'moon', text: 'Teruk waktu malam', a: at(p, 'waktu', 3.5), bg: C.violet[0]},
  ];
  return (
    <Camera dur={p.dur} to={1.06} panX={-10}>
      <NightSky seed={19} glow={C.pink[0]} />
      {items.map((it, i) => (
        <Pop key={i} at={it.a} style={{left: 50, top: 480 + i * 150}}>
          <Sym icon={it.icon} text={it.text} w={600} f={f} bg={it.bg} />
        </Pop>
      ))}
      <Naufal x={620} y={980} w={400} mood="sad" pose="clasp" level={1} style={{transform: `translateX(${Math.sin(f * 1.6) * 5}px)`}} />
      <Itch x={660} y={1290} f={f} size={0.9} />
      <Who preset={p.preset} x={40} y={1000} w={480} mood="neutral" pose="point" />
    </Camera>
  );
};

/* peta badan kanak-kanak (depan) */
const BodyMap: React.FC<{marks: {x: number; y: number; on: number}[]}> = ({marks}) => (
  <svg width={520} height={900} viewBox="0 0 520 900" style={{overflow: 'visible'}}>
    <g fill={SKIN_BG}>
      <circle cx={260} cy={120} r={92} />
      <rect x={232} y={200} width={56} height={40} />
      <path d="M 260 380 L 120 270 Q 90 250 70 280 L 40 520 L 90 524 L 116 340 Z" />
      <path d="M 260 380 L 400 270 Q 430 250 450 280 L 480 520 L 430 524 L 404 340 Z" />
      <path d="M 170 600 L 150 860 L 220 860 L 254 600 Z" />
      <path d="M 350 600 L 370 860 L 300 860 L 266 600 Z" />
    </g>
    <path d="M 150 240 Q 260 210 370 240 L 380 620 L 140 620 Z" fill={NAUFAL.topColor} />
    <path d="M 140 560 L 380 560 L 384 700 L 270 700 L 260 640 L 250 700 L 136 700 Z" fill={C.navy} />
    <g fill="#1E1726"><path d="M 168 110 Q 170 30 260 28 Q 350 30 352 110 Q 320 70 260 72 Q 200 70 168 110 Z" /></g>
    {marks.map((m, i) =>
      m.on > 0 ? (
        <g key={i} transform={`translate(${m.x} ${m.y}) scale(${popScale(m.on)})`} opacity={popOpacity(m.on)}>
          <circle r={44} fill="none" stroke={C.yellow} strokeWidth={8} opacity={0.6 + 0.4 * Math.sin(m.on / 4)} />
          <ellipse rx={26} ry={18} fill={RED} />
          <ellipse cx={8} cy={-5} rx={12} ry={8} fill={RED_D} />
        </g>
      ) : null,
    )}
  </svg>
);

/* ================= 6 — Ruam di lipatan siku, belakang lutut, leher, muka → tebal, bersisik, berair ================= */
export const Ruam: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSiku = at(p, 'siku', 1.2);
  const aLutut = at(p, 'lutut', 2.3);
  const aLeher = at(p, 'leher', 2.9);
  const aMuka = at(p, 'muka', 3.6);
  const aGaru = at(p, 'kerap', 4.6);
  const aTebal = at(p, 'tebal', 5.9);
  const aSisik = at(p, 'bersisik', 6.6);
  const aAir = at(p, 'berair', 7.5);
  const mapOut = interpolate(f, [aGaru - 4, aGaru + 8], [1, 0], clamp);
  const labels: {t: string; a: number; x: number; y: number}[] = [
    {t: 'Siku', a: aSiku, x: 40, y: 830},
    {t: 'Belakang lutut', a: aLutut, x: 560, y: 1210},
    {t: 'Leher', a: aLeher, x: 700, y: 700},
    {t: 'Muka', a: aMuka, x: 120, y: 560},
  ];
  const sw: {t: string; a: number; kind: 'tebal' | 'sisik' | 'air'}[] = [
    {t: 'Tebal', a: aTebal, kind: 'tebal'},
    {t: 'Bersisik', a: aSisik, kind: 'sisik'},
    {t: 'Berair', a: aAir, kind: 'air'},
  ];
  return (
    <Camera dur={p.dur} to={1.06} panY={-10}>
      <NightSky seed={29} glow={C.violet[3]} />
      {mapOut > 0 ? (
        <div style={{opacity: mapOut}}>
          <div style={{position: 'absolute', left: 280, top: 470}}>
            <BodyMap
              marks={[
                {x: 100, y: 400, on: f - aSiku},
                {x: 420, y: 400, on: f - aSiku - 4},
                {x: 200, y: 760, on: f - aLutut},
                {x: 320, y: 760, on: f - aLutut - 4},
                {x: 260, y: 228, on: f - aLeher},
                {x: 210, y: 150, on: f - aMuka},
                {x: 314, y: 150, on: f - aMuka - 4},
              ]}
            />
          </div>
          {labels.map((l, i) => (
            <Pop key={i} at={l.a} style={{left: l.x, top: l.y}}>
              <Pill text={l.t} bg={C.labelPink} size={42} />
            </Pop>
          ))}
        </div>
      ) : null}
      {f >= aGaru ? (
        <>
          <Pop at={aGaru} style={{left: 0, width: 1080, top: 480, display: 'flex', justifyContent: 'center'}}>
            <Sym icon="scratch" text="Kerap digaru…" w={560} f={f} bg={C.navy} />
          </Pop>
          {sw.map((s, i) =>
            f >= s.a ? (
              <div key={i} style={{position: 'absolute', left: 60 + i * 330, top: 720, width: 300, opacity: popOpacity(f - s.a), transform: `scale(${popScale(f - s.a)})`}}>
                <div style={{width: 300, height: 300, borderRadius: 40, background: SKIN_BG, overflow: 'hidden', position: 'relative', boxShadow: '0 16px 40px rgba(18,11,51,.5)'}}>
                  <svg width={300} height={300} viewBox="0 0 300 300">
                    <ellipse cx={150} cy={150} rx={120} ry={90} fill={RED} opacity={0.75} />
                    {s.kind === 'tebal'
                      ? [0, 1, 2, 3, 4, 5].map((k) => <path key={k} d={`M 50 ${80 + k * 28} Q 150 ${66 + k * 28} 250 ${80 + k * 28}`} stroke={RED_D} strokeWidth={9} fill="none" strokeLinecap="round" />)
                      : s.kind === 'sisik'
                        ? new Array(14).fill(0).map((_, k) => <path key={k} d={`M ${60 + random(`sx${k}`) * 180} ${80 + random(`sy${k}`) * 140} l 28 -10 l -8 20 Z`} fill="#FFF3E6" />)
                        : [0, 1, 2, 3, 4].map((k) => {
                            const ff = (f - s.a + k * 8) % 40;
                            return <path key={k} transform={`translate(${80 + k * 36} ${120 + ff * 2.4}) scale(0.4)`} d="M 0 -40 Q 30 0 30 16 A 30 30 0 0 1 -30 16 Q -30 0 0 -40 Z" fill="#BFE6FF" opacity={0.9} />;
                          })}
                  </svg>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 18}}>
                  <Pill text={s.t} bg={[C.labelPink, C.violet[2], '#4F79C7'][i]} size={44} />
                </div>
              </div>
            ) : null,
          )}
          <Naufal x={330} y={1100} w={420} mood="sad" pose="clasp" level={1} />
        </>
      ) : null}
    </Camera>
  );
};

/* ================= 7 — Faktor risiko: sejarah keluarga + pencetus ================= */
export const Risiko: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKel = at(p, 'keluarganya', 2.1);
  const aEk = at(p, 'ekzema', 2.9);
  const aAsma = at(p, 'asma', 3.9);
  const aRes = at(p, 'resdung', 4.5);
  const aPencetus = at(p, 'pencetusnya', 5.3);
  const trig: {icon: IconName; t: string; a: number}[] = [
    {icon: 'soap', t: 'Sabun berpewangi', a: Math.min(at(p, 'sabun', 6.4), aPencetus + 8)},
    {icon: 'sun', t: 'Peluh & cuaca panas', a: at(p, 'peluh', 7.7)},
    {icon: 'dust', t: 'Habuk', a: at(p, 'habuk', 9.2)},
    {icon: 'sweater', t: 'Pakaian kasar', a: at(p, 'pakaian', 9.9)},
  ];
  const famOut = interpolate(f, [aPencetus - 4, aPencetus + 6], [1, 0], clamp);
  const fam: {icon: IconName; t: string; a: number; bg: string}[] = [
    {icon: 'skin', t: 'Eczema', a: aEk, bg: C.labelPink},
    {icon: 'lungs', t: 'Asma', a: aAsma, bg: C.violet[2]},
    {icon: 'nose', t: 'Resdung', a: aRes, bg: '#4F79C7'},
  ];
  return (
    <Camera dur={p.dur} to={1.06} panY={-12}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.night[3]} 60%, ${C.violet[0]} 100%)`}} />
      <Glow x={540} y={850} r={520} color={C.pink[0]} opacity={0.28} />
      {famOut > 0 ? (
        <div style={{opacity: famOut}}>
          <Pop at={aKel} style={{left: 0, width: 1080, top: 470, display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 18, background: C.yellow, padding: '14px 34px 14px 18px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
              <div style={{background: C.navy, borderRadius: 24, padding: 6}}><Icon name="family" size={80} /></div>
              <Txt size={44} color={C.navy}>Ahli keluarga ada:</Txt>
            </div>
          </Pop>
          {/* garis salasilah */}
          {f >= aEk ? (
            <svg width={1080} height={160} style={{position: 'absolute', left: 0, top: 590}}>
              <path d="M 540 0 L 540 60 M 190 60 L 890 60 M 190 60 L 190 150 M 540 60 L 540 150 M 890 60 L 890 150" stroke="#fff" strokeOpacity={0.5} strokeWidth={8} fill="none" strokeLinecap="round" />
            </svg>
          ) : null}
          {fam.map((it, i) => (
            <Pop key={i} at={it.a} style={{left: 40 + i * 350, top: 740}}>
              <div style={{width: 300, height: 290, background: it.bg, borderRadius: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, boxShadow: '0 16px 40px rgba(18,11,51,.5)'}}>
                <div style={{background: 'rgba(255,255,255,.15)', borderRadius: 30, padding: 10}}><Icon name={it.icon} size={130} f={f} /></div>
                <Txt size={48}>{it.t}</Txt>
              </div>
            </Pop>
          ))}
        </div>
      ) : null}
      {f >= aPencetus ? (
        <>
          <Pop at={aPencetus} style={{left: 0, width: 1080, top: 470, display: 'flex', justifyContent: 'center'}}>
            <Pill text="PENCETUS" bg={C.labelPink} size={56} />
          </Pop>
          {trig.map((t, i) => {
            if (f < t.a) return null;
            const ff = f - t.a;
            return (
              <div key={i} style={{position: 'absolute', left: 60 + (i % 2) * 490, top: 610 + Math.floor(i / 2) * 290, width: 470, height: 260, background: i === 1 || i === 2 ? C.navy : C.violet[0], borderRadius: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, transform: `scale(${popScale(ff)})`, opacity: popOpacity(ff), boxShadow: '0 16px 40px rgba(18,11,51,.5)'}}>
                <Icon name={t.icon} size={120} f={f} />
                <Txt size={40} style={{textAlign: 'center'}}>{t.t}</Txt>
              </div>
            );
          })}
        </>
      ) : null}
      <Who preset={p.preset} x={f >= aPencetus ? 700 : 330} y={f >= aPencetus ? 1210 : 1070} w={f >= aPencetus ? 360 : 420} mood="curious" pose={f >= aPencetus ? 'point' : 'chin'} />
      {f >= aPencetus ? <Naufal x={40} y={1230} w={300} mood="tired" pose="clasp" level={1} /> : null}
    </Camera>
  );
};

/* ================= 8 — Boleh dikawal: mandi air suam ≤10 minit, sabun lembut ================= */
export const Cegah: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKawal = at(p, 'dikawal', 1.9);
  const aMandi = at(p, 'mandi', 2.8);
  const aMinit = at(p, 'sepuluh', 4.2);
  const aSabun = at(p, 'sabun', 5.3);
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 60%, ${C.green}88 100%)`}} />
      <Glow x={540} y={1000} r={560} color={C.green} opacity={0.3} />
      <Pop at={aKawal} style={{left: 0, width: 1080, top: 470, display: 'flex', justifyContent: 'center'}}>
        <Pill text="✓ BOLEH DIKAWAL" bg={C.green} size={58} />
      </Pop>
      <Pop at={aMandi} style={{left: 60, top: 620}}>
        <Sym icon="bath" text="Mandi air suam" w={560} f={f} bg={C.navy} />
      </Pop>
      <Pop at={aMinit} style={{left: 640, top: 610}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, background: C.yellow, borderRadius: 36, padding: '12px 26px 12px 14px', boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <Icon name="timer" size={90} f={f - aMinit} />
          <div>
            <Txt size={30} color={C.navy}>Maksimum</Txt>
            <Txt size={52} color={C.navy}>10 minit</Txt>
          </div>
        </div>
      </Pop>
      <Pop at={aSabun} style={{left: 60, top: 790}}>
        <Sym icon="soap" text="Sabun lembut, tanpa pewangi" w={760} f={f} bg={C.violet[0]} size={40} />
      </Pop>
      {/* Naufal dalam tab mandi */}
      <div style={{position: 'absolute', left: 330, top: 1000}}>
        <Naufal x={0} y={0} w={420} mood="happy" pose="wave" level={interpolate(f, [0, p.dur], [0.8, 0.45], clamp)} face={true} />
      </div>
      {new Array(8).fill(0).map((_, i) => {
        const ff = (f + i * 11) % 60;
        return <div key={i} style={{position: 'absolute', left: 260 + random(`bb${i}`) * 560, top: 1290 - ff * 4, width: 26 + (i % 3) * 10, height: 26 + (i % 3) * 10, borderRadius: 30, border: '4px solid #fff', opacity: interpolate(ff, [0, 8, 50, 60], [0, 0.8, 0.8, 0])}} />;
      })}
      <svg width={1080} height={420} style={{position: 'absolute', left: 0, top: 1310}} viewBox="0 0 1080 420">
        <rect x={140} y={0} width={800} height={30} rx={15} fill={C.violet[3]} />
        <path d="M 160 24 L 920 24 L 890 230 Q 880 280 820 280 L 260 280 Q 200 280 190 230 Z" fill="#fff" />
        {new Array(9).fill(0).map((_, i) => <circle key={i} cx={200 + i * 85} cy={20 + Math.sin(f / 6 + i) * 6} r={40} fill="#DDF1FF" />)}
        <rect x={250} y={280} width={30} height={60} rx={10} fill={C.violet[3]} />
        <rect x={800} y={280} width={30} height={60} rx={10} fill={C.violet[3]} />
      </svg>
    </Camera>
  );
};

/* ================= 9 — Pelembap 2× sehari, baju kapas, kuku pendek, krim ikut arahan doktor ================= */
export const Cegah2: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const tiles: {icon: IconName; text: string; sub: string; a: number; bg: string}[] = [
    {icon: 'lotion', text: 'Pelembap', sub: 'Lepas mandi, 2× sehari', a: at(p, 'pelembap', 0.3), bg: C.violet[0]},
    {icon: 'shirt', text: 'Baju kapas', sub: 'Longgar', a: at(p, 'baju', 4.5), bg: C.navy},
    {icon: 'nail', text: 'Kuku pendek', sub: 'Kurang luka', a: at(p, 'potong', 6.1), bg: C.navy},
    {icon: 'tube', text: 'Krim doktor', sub: 'Ikut arahan', a: at(p, 'doktor beri', 7.4), bg: C.violet[0]},
  ];
  const aSehari = at(p, 'sehari', 3.6);
  return (
    <Camera dur={p.dur} to={1.06} panY={-12}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 60%, ${C.green}88 100%)`}} />
      <Glow x={540} y={900} r={560} color={C.green} opacity={0.28} />
      {tiles.map((t, i) => {
        if (f < t.a) return null;
        const ff = f - t.a;
        return (
          <div key={i} style={{position: 'absolute', left: 60 + (i % 2) * 490, top: 480 + Math.floor(i / 2) * 330, width: 470, height: 300, background: t.bg, borderRadius: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, transform: `scale(${popScale(ff)})`, opacity: popOpacity(ff), boxShadow: '0 16px 40px rgba(18,11,51,.5)'}}>
            <Icon name={t.icon} size={110} f={f} />
            <Txt size={44} style={{textAlign: 'center'}}>{t.text}</Txt>
            <Txt size={30} color={C.yellow} style={{textAlign: 'center'}}>{t.sub}</Txt>
          </div>
        );
      })}
      {f >= aSehari && f < tiles[1].a ? (
        <Pop at={aSehari} style={{left: 620, top: 560}}>
          <div style={{width: 300, height: 220, borderRadius: 36, background: C.yellow, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
            <Txt size={110} color={C.navy}>2×</Txt>
          </div>
        </Pop>
      ) : null}
      <Who preset={IBU} x={40} y={1100} w={400} mood="happy" pose="point" seed={4} />
      <Naufal x={660} y={1100} w={380} mood="happy" pose={f >= tiles[3].a ? 'wave' : 'down'} level={interpolate(f, [0, p.dur], [0.45, 0.08], clamp)} />
      {/* kilauan kulit sihat */}
      {[0, 1, 2, 3].map((i) => {
        const ff = (f + i * 12) % 48;
        return <div key={i} style={{position: 'absolute', left: 680 + i * 80, top: 1150 + (i % 2) * 120, width: 30, height: 30, background: '#fff', transform: `rotate(45deg) scale(${interpolate(ff, [0, 12, 24], [0, 1, 0], clamp)})`, borderRadius: 4}} />;
      })}
    </Camera>
  );
};

/* ================= 10 — Penutup: jangan tunggu, rawatan awal (tiada CTA klinik) ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTunggu = at(p, 'jangan tunggu', 1.9);
  const aRawat = at(p, 'dapatkan', 2.9);
  const aSaya = at(p, 'saya doktor', 4.3);
  return (
    <Camera dur={p.dur} to={1.06} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 60%, ${C.pink[2]} 100%)`}} />
      <NightSky seed={23} glow={C.pink[0]} top="transparent" bottom="transparent" stars={50} />
      <Glow x={540} y={1000} r={560} color={C.green} opacity={0.25} />
      <Pop at={aTunggu} style={{left: 0, width: 1080, top: 500, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />
      </Pop>
      <Pop at={aRawat} style={{left: 0, width: 1080, top: 640, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, background: C.green, padding: '14px 34px 14px 18px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <Icon name="doctor" size={80} />
          <Txt size={46}>Dapatkan rawatan awal</Txt>
        </div>
      </Pop>
      <Who preset={p.preset} x={130} y={880} w={580} mood="happy" pose={f >= aSaya ? 'wave' : 'clasp'} />
      <Naufal x={670} y={1090} w={330} mood="happy" pose="wave" level={0} />
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
  intro: Intro,
  gatal: Gatal,
  ibu: Ibu,
  diagnosis: Diagnosis,
  apa: Apa,
  tanda: Tanda,
  ruam: Ruam,
  risiko: Risiko,
  cegah: Cegah,
  cegah2: Cegah2,
  penutup: Penutup,
};
