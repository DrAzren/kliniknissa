// Komponen kongsi untuk topik 2026-11-14 (dengkur-sleep-apnea, serangan-panik, batu-karang).
// Gaya sama dengan jenis-nyamuk: Violet Flat, semua dilukis SVG.
import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {Avatar, AvatarPreset, Mood, Pose} from '../components/Avatar';
import {Camera, clamp, Glow, NightSky, Pill, Pop, popOpacity, popScale} from '../components/common';
import {WordsFile, wordTime} from '../lib/timeline';
import {Icon} from './kenali-eczema/scenes';

export type SceneProps = {preset: AvatarPreset; dur: number; wf: WordsFile; start: number; fps: number};

export const RED = '#D9485F';
export const ORANGE = '#F08A24';
export const WATER = '#4F79C7';
export const LEAF = '#3FAF6E';

export const at = (p: SceneProps, phrase: string, fallbackSec: number) => {
  const t = wordTime(p.wf, phrase, p.start, p.start + fallbackSec);
  return Math.max(0, Math.round((t - p.start) * p.fps));
};

export const Txt: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 44, color = '#fff', style}) => (
  <div style={{fontFamily: FONT, fontWeight: 800, fontSize: size, color, lineHeight: 1.12, ...style}}>{children}</div>
);

export const Who: React.FC<{preset: AvatarPreset; x: number; y: number; w: number; style?: React.CSSProperties; mood?: Mood; pose?: Pose; seed?: number}> = ({preset, x, y, w, style, ...rest}) => (
  <div style={{position: 'absolute', left: x, top: y, ...style}}>
    <Avatar preset={preset} width={w} {...rest} />
  </div>
);

export const Bubble: React.FC<{children: React.ReactNode; tail?: 'left' | 'right'; bg?: string; color?: string; size?: number}> = ({children, tail = 'left', bg = '#fff', color = C.navy, size = 46}) => (
  <div style={{position: 'relative', background: bg, color, borderRadius: 40, padding: `${size * 0.45}px ${size * 0.7}px`, fontFamily: FONT, fontWeight: 800, fontSize: size, lineHeight: 1.12, boxShadow: '0 14px 34px rgba(18,11,51,.45)', whiteSpace: 'nowrap'}}>
    {children}
    <div style={{position: 'absolute', bottom: -26, [tail === 'left' ? 'left' : 'right']: 60, width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: `30px solid ${bg}`}} />
  </div>
);

/* kad ikon + teks */
export const Chip: React.FC<{icon?: React.ReactNode; text: React.ReactNode; bg?: string; color?: string; w?: number; size?: number}> = ({icon, text, bg = C.navy, color = '#fff', w = 640, size = 40}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 20, width: w, background: bg, borderRadius: 34, padding: '14px 26px 14px 16px', boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
    {icon ? (
      <div style={{width: 92, height: 92, borderRadius: 26, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{icon}</div>
    ) : null}
    <Txt size={size} color={color}>{text}</Txt>
  </div>
);

/* senarai kad yang muncul tepat pada perkataan */
export const ChipList: React.FC<{items: {icon?: React.ReactNode; text: React.ReactNode; a: number; bg?: string}[]; top?: number; gap?: number; left?: number; w?: number; size?: number}> = ({items, top = 620, gap = 128, left = 60, w = 660, size = 40}) => (
  <>
    {items.map((it, i) => (
      <Pop key={i} at={it.a} style={{left, top: top + i * gap}} origin="left center">
        <Chip icon={it.icon} text={it.text} w={w} bg={it.bg ?? (i % 2 ? C.violet[1] : C.navy)} size={size} />
      </Pop>
    ))}
  </>
);

/* cop diagnosis */
export const Stamp: React.FC<{a: number; kicker: string; lines: string[]; top?: number; size?: number}> = ({a, kicker, lines, top = 560, size = 120}) => {
  const f = useCurrentFrame();
  if (f < a - 6) return null;
  const s = interpolate(f - a + 6, [0, 6, 10], [1.8, 0.94, 1], clamp);
  return (
    <div style={{position: 'absolute', left: 40, top, width: 1000, display: 'flex', justifyContent: 'center', transform: `scale(${s}) rotate(-5deg)`, opacity: interpolate(f - a + 6, [0, 3], [0, 1], clamp)}}>
      <div style={{background: C.navy, border: `10px solid ${C.labelPink}`, borderRadius: 40, padding: '22px 50px', textAlign: 'center', boxShadow: '0 30px 70px rgba(18,11,51,.6)'}}>
        <Txt size={38} color={C.violet[4]}>{kicker}</Txt>
        {lines.map((l) => (
          <Txt key={l} size={size} color={C.yellow} style={{lineHeight: 1.02}}>{l}</Txt>
        ))}
      </div>
    </div>
  );
};

/* tanda pangkah dilukis */
export const Cross: React.FC<{f: number; size?: number; color?: string}> = ({f, size = 120, color = C.labelPink}) => {
  const p = interpolate(f, [0, 8], [0, 1], clamp);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
      <path d="M 14 14 L 86 86" stroke={color} strokeWidth={12} strokeLinecap="round" strokeDasharray={102} strokeDashoffset={102 * (1 - Math.min(1, p * 2))} />
      <path d="M 86 14 L 14 86" stroke={color} strokeWidth={12} strokeLinecap="round" strokeDasharray={102} strokeDashoffset={102 * (1 - Math.max(0, p * 2 - 1))} />
    </svg>
  );
};

export const Tick: React.FC<{size?: number; bg?: string}> = ({size = 48, bg = C.green}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.3, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
    <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 30 30"><path d="M 5 16 L 12 23 L 25 8" stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </div>
);

export const Confetti: React.FC<{a: number; x?: number; y?: number}> = ({a, x = 540, y = 980}) => {
  const f = useCurrentFrame();
  if (f < a) return null;
  return (
    <>
      {new Array(14).fill(0).map((_, i) => {
        const t = f - a;
        const ang = random(`cf${i}`) * Math.PI * 2;
        const d = interpolate(t, [0, 24], [0, 260 + random(`cd${i}`) * 160], clamp);
        return <div key={i} style={{position: 'absolute', left: x + Math.cos(ang) * d, top: y + Math.sin(ang) * d, width: 22, height: 22, borderRadius: 11, background: i % 2 ? C.yellow : '#fff', opacity: interpolate(t, [0, 6, 24, 34], [0, 1, 1, 0], clamp)}} />;
      })}
    </>
  );
};

/* papan tanda KLINIK generik + bangunan */
export const ClinicBg: React.FC = () => (
  <>
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[3]} 0%, ${C.violet[2]} 100%)`}} />
    <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: C.night[1]}} />
    <div style={{position: 'absolute', left: 300, top: 520, width: 480, height: 110, borderRadius: 26, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, boxShadow: '0 16px 40px rgba(18,11,51,.5)'}}>
      <svg width={70} height={70} viewBox="0 0 70 70"><rect x={25} y={6} width={20} height={58} rx={5} fill={C.labelPink} /><rect x={6} y={25} width={58} height={20} rx={5} fill={C.labelPink} /></svg>
      <Txt size={64} color={C.navy} style={{letterSpacing: 6}}>KLINIK</Txt>
    </div>
  </>
);

/* kad "N perkara" */
export const LimaScene: React.FC<{p: SceneProps; word: string; title: string; glow?: string}> = ({p, word, title, glow = C.green}) => {
  const f = useCurrentFrame();
  const a = at(p, word, 1.5);
  return (
    <Camera dur={p.dur} to={1.06} panY={-15}>
      <NightSky seed={13} glow={glow} />
      <Glow x={540} y={900} r={480} color={C.violet[3]} opacity={0.3} />
      <Pop at={a} style={{left: 0, width: 1080, top: 520, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 22}}>
          <Txt size={220} color={C.yellow} style={{textShadow: '0 10px 0 rgba(18,11,51,.6)'}}>5</Txt>
          <Txt size={70}>{title}</Txt>
        </div>
      </Pop>
      {[0, 1, 2, 3, 4].map((i) => (
        <Pop key={i} at={a + 6 + i * 3} style={{left: 115 + i * 180, top: 830}}>
          <div style={{width: 130, height: 130, borderRadius: 65, background: i % 2 ? C.violet[1] : C.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 30px rgba(18,11,51,.5)'}}>
            <Txt size={70} color={C.yellow}>{i + 1}</Txt>
          </div>
        </Pop>
      ))}
      <Who preset={p.preset} x={250} y={1020} w={580} mood="happy" pose={f >= a ? 'point' : 'wave'} />
    </Camera>
  );
};

/* penutup standard */
export const Closing: React.FC<{p: SceneProps; question: React.ReactNode; qIcon: React.ReactNode; firstWord: string; action: string; actionWord: string}> = ({p, question, qIcon, firstWord, action, actionWord}) => {
  const f = useCurrentFrame();
  const aQ = at(p, firstWord, 0.2);
  const aTunggu = at(p, 'jangan tunggu', 2.1);
  const aRawat = at(p, actionWord, 3.1);
  const aSaya = at(p, 'saya doktor', 4.6);
  return (
    <Camera dur={p.dur} to={1.06} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 60%, ${C.pink[2]} 100%)`}} />
      <NightSky seed={23} glow={C.pink[0]} top="transparent" bottom="transparent" stars={50} />
      <Glow x={540} y={1000} r={560} color={C.green} opacity={0.25} />
      <Pop at={aQ} style={{left: 0, width: 1080, top: 520, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: '#fff', padding: '12px 30px 12px 16px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)', maxWidth: 1000}}>
          {qIcon}
          <Txt size={38} color={C.navy}>{question}</Txt>
        </div>
      </Pop>
      <Pop at={aTunggu} style={{left: 0, width: 1080, top: 610, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Jangan tunggu" bg={C.labelPink} size={60} />
      </Pop>
      <Pop at={aRawat} style={{left: 0, width: 1080, top: 750, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, background: C.green, padding: '14px 34px 14px 18px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <Icon name="doctor" size={80} />
          <Txt size={46}>{action}</Txt>
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

/* katil (pandangan sisi) */
export const Bed: React.FC<{x?: number; y?: number; w?: number}> = ({x = 40, y = 1300, w = 1000}) => (
  <>
    <div style={{position: 'absolute', left: x, top: y + 70, width: w, height: 130, borderRadius: 30, background: C.violet[2]}} />
    <div style={{position: 'absolute', left: x - 10, top: y - 120, width: 50, height: 340, borderRadius: 20, background: C.violet[0]}} />
    <div style={{position: 'absolute', left: x + 50, top: y + 10, width: 220, height: 90, borderRadius: 40, background: '#fff', opacity: 0.9}} />
  </>
);

/* bayang gelap di atas (untuk latar cerah supaya kapsyen jelas) */
export const TopShade: React.FC = () => (
  <div style={{position: 'absolute', left: -60, top: -60, width: 1200, height: 620, background: 'linear-gradient(180deg, rgba(18,11,51,0.92) 0%, rgba(18,11,51,0.75) 55%, rgba(18,11,51,0) 100%)'}} />
);

/* ZZZ terapung */
export const Zzz: React.FC<{x: number; y: number; on?: boolean; size?: number}> = ({x, y, on = true, size = 70}) => {
  const f = useCurrentFrame();
  if (!on) return null;
  return (
    <>
      {[0, 1, 2].map((i) => {
        const t = (f + i * 14) % 42;
        return (
          <div key={i} style={{position: 'absolute', left: x + t * 2.4 + i * 10, top: y - t * 4, opacity: interpolate(t, [0, 6, 34, 42], [0, 1, 1, 0])}}>
            <Txt size={size - i * 12} color={C.violet[4]}>Z</Txt>
          </div>
        );
      })}
    </>
  );
};

/* titis peluh */
export const Sweat: React.FC<{x: number; y: number; on: boolean; n?: number; spread?: number}> = ({x, y, on, n = 3, spread = 90}) => {
  const f = useCurrentFrame();
  if (!on) return null;
  return (
    <>
      {new Array(n).fill(0).map((_, i) => {
        const t = (f + i * 13) % 40;
        return <div key={i} style={{position: 'absolute', left: x + i * spread, top: y + t * 3, width: 18, height: 26, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: '#9FD6F7', opacity: interpolate(t, [0, 6, 32, 40], [0, 1, 1, 0])}} />;
      })}
    </>
  );
};

export {popOpacity, popScale};

/* ---------- ikon (viewBox 120) ---------- */
export type KName =
  | 'heart' | 'heart-ok' | 'chest' | 'hand' | 'eye' | 'ear' | 'alarm' | 'adrenaline' | 'repeat' | 'house' | 'therapy' | 'pill'
  | 'train' | 'ecg' | 'kidney' | 'stone' | 'bottle' | 'salt' | 'meat' | 'soda' | 'cup' | 'bolt' | 'hospital' | 'sun' | 'ac'
  | 'snore' | 'yawn' | 'headache' | 'choke' | 'scale' | 'neck' | 'male' | 'age' | 'bp' | 'brain' | 'stroke' | 'car' | 'nosmoke'
  | 'side' | 'cpap' | 'phone' | 'clock' | 'o2' | 'vomit' | 'thermo' | 'nopee' | 'search' | 'hammer' | 'drop';

export const KIcon: React.FC<{name: KName; size?: number; f?: number}> = ({name, size = 120, f = 0}) => {
  const w = '#fff', nv = C.navy, y = C.yellow, pk = C.labelPink;
  const beat = 1 + 0.08 * Math.max(0, Math.sin(f / 3));
  const body = (() => {
    switch (name) {
      case 'heart':
      case 'heart-ok':
        return (
          <g transform={`translate(60 62) scale(${name === 'heart' ? beat : 1}) translate(-60 -62)`}>
            <path d="M 60 104 C 20 76 6 56 10 36 C 14 16 40 10 60 30 C 80 10 106 16 110 36 C 114 56 100 76 60 104 Z" fill={name === 'heart' ? RED : C.green} />
            {name === 'heart-ok' ? <path d="M 38 58 L 54 74 L 84 42" stroke={w} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M 26 58 L 44 58 L 52 40 L 64 76 L 72 58 L 94 58" stroke={w} strokeWidth={6} fill="none" strokeLinejoin="round" />}
          </g>
        );
      case 'chest':
        return (
          <g>
            <path d="M 14 110 Q 14 30 60 26 Q 106 30 106 110 Z" fill="#F2C9A6" />
            <path d="M 40 56 Q 60 66 80 56" stroke="#D9A07A" strokeWidth={5} fill="none" />
            <circle cx={70} cy={74} r={16} fill={RED} opacity={0.5 + 0.4 * Math.abs(Math.sin(f / 5))} />
            <path d="M 70 46 L 64 64 L 76 64 L 68 86" stroke={y} strokeWidth={5} fill="none" strokeLinejoin="round" />
          </g>
        );
      case 'hand':
        return (
          <g>
            <path d="M 34 112 L 30 60 Q 30 50 38 50 Q 44 50 44 60 L 44 30 Q 44 20 52 20 Q 60 20 60 30 L 60 24 Q 60 14 68 14 Q 76 14 76 24 L 76 30 Q 76 22 84 22 Q 92 22 92 32 L 92 80 Q 92 112 66 112 Z" fill="#F2C9A6" />
            {[0, 1, 2].map((i) => <path key={i} d={`M ${16 - i * 4} ${40 + i * 18} l -10 0`} stroke={y} strokeWidth={5} strokeLinecap="round" opacity={0.5 + 0.5 * Math.abs(Math.sin(f / 4 + i))} />)}
          </g>
        );
      case 'eye':
        return (
          <g>
            <path d="M 8 60 Q 60 12 112 60 Q 60 108 8 60 Z" fill={w} />
            <circle cx={60} cy={60} r={22} fill="#6B4A36" />
            <circle cx={60} cy={60} r={10} fill="#1E1A24" />
            <circle cx={66} cy={54} r={5} fill={w} />
          </g>
        );
      case 'ear':
        return (
          <g>
            <path d="M 70 112 Q 50 112 50 94 Q 50 80 40 70 Q 26 56 32 36 Q 40 10 66 10 Q 96 12 98 42 Q 100 64 84 78 Q 76 86 78 98 Q 78 112 70 112 Z" fill="#F2C9A6" />
            <path d="M 52 44 Q 56 26 70 28 Q 84 32 80 48 Q 76 58 66 60" stroke="#D9A07A" strokeWidth={7} fill="none" strokeLinecap="round" />
            {[0, 1].map((i) => <path key={i} d={`M ${104 + i * 10} ${30 + i * 4} Q ${112 + i * 10} 50 ${104 + i * 10} ${70 - i * 4}`} stroke={y} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.4 + 0.6 * Math.abs(Math.sin(f / 5 + i))} />)}
          </g>
        );
      case 'alarm': {
        const sh = Math.sin(f * 1.6) * 10;
        return (
          <g transform={`rotate(${sh} 60 60)`}>
            <path d="M 60 10 Q 92 12 94 50 L 96 82 L 108 94 L 12 94 L 24 82 L 26 50 Q 28 12 60 10 Z" fill={y} />
            <circle cx={60} cy={104} r={10} fill={ORANGE} />
            <rect x={54} y={2} width={12} height={12} rx={4} fill={ORANGE} />
            <path d="M 4 40 Q 0 60 8 76 M 116 40 Q 120 60 112 76" stroke={pk} strokeWidth={6} fill="none" strokeLinecap="round" />
          </g>
        );
      }
      case 'adrenaline':
        return (
          <g>
            <path d="M 60 8 Q 92 54 92 76 A 32 32 0 0 1 28 76 Q 28 54 60 8 Z" fill={ORANGE} />
            <path d="M 64 40 L 50 72 L 64 72 L 54 100" stroke={y} strokeWidth={7} fill="none" strokeLinejoin="round" strokeLinecap="round" />
          </g>
        );
      case 'repeat':
        return (
          <g>
            <path d="M 24 60 A 36 36 0 0 1 90 40" stroke={w} strokeWidth={10} fill="none" strokeLinecap="round" />
            <path d="M 96 60 A 36 36 0 0 1 30 80" stroke={w} strokeWidth={10} fill="none" strokeLinecap="round" />
            <path d="M 80 22 L 96 42 L 72 46 Z" fill={w} />
            <path d="M 40 98 L 24 78 L 48 74 Z" fill={w} />
          </g>
        );
      case 'house':
        return (
          <g>
            <path d="M 10 58 L 60 14 L 110 58 Z" fill={pk} />
            <rect x={22} y={54} width={76} height={56} fill={w} />
            <rect x={50} y={76} width={22} height={34} rx={4} fill={C.violet[1]} />
            <rect x={30} y={66} width={14} height={14} rx={3} fill={y} />
          </g>
        );
      case 'therapy':
        return (
          <g>
            <path d="M 6 20 Q 6 8 18 8 L 70 8 Q 82 8 82 20 L 82 48 Q 82 60 70 60 L 34 60 L 18 76 L 20 60 Q 6 60 6 48 Z" fill={w} />
            <path d="M 114 54 Q 114 44 104 44 L 52 44 Q 42 44 42 54 L 42 82 Q 42 92 52 92 L 86 92 L 102 108 L 100 92 Q 114 92 114 82 Z" fill={C.green} />
            <circle cx={30} cy={34} r={5} fill={nv} /><circle cx={44} cy={34} r={5} fill={nv} /><circle cx={58} cy={34} r={5} fill={nv} />
            <path d="M 62 68 L 72 78 L 94 58" stroke={w} strokeWidth={6} fill="none" strokeLinecap="round" />
          </g>
        );
      case 'pill':
        return (
          <g transform="rotate(-35 60 60)">
            <rect x={14} y={40} width={92} height={40} rx={20} fill={w} />
            <path d="M 60 40 L 86 40 A 20 20 0 0 1 86 80 L 60 80 Z" fill={pk} />
          </g>
        );
      case 'train':
        return (
          <g>
            <rect x={14} y={14} width={92} height={84} rx={20} fill={C.violet[3]} />
            <rect x={24} y={26} width={72} height={34} rx={8} fill="#BFE3FA" />
            <circle cx={36} cy={78} r={7} fill={y} /><circle cx={84} cy={78} r={7} fill={y} />
            <path d="M 30 98 L 18 114 M 90 98 L 102 114" stroke={w} strokeWidth={6} strokeLinecap="round" />
          </g>
        );
      case 'ecg': {
        const off = (f * 6) % 120;
        return (
          <g>
            <rect x={6} y={14} width={108} height={86} rx={14} fill="#10203A" />
            <clipPath id="ecgclip"><rect x={10} y={18} width={100} height={78} /></clipPath>
            <g clipPath="url(#ecgclip)">
              <path transform={`translate(${-off} 0)`} d="M 0 60 L 30 60 L 38 50 L 44 60 L 50 60 L 56 26 L 62 84 L 68 60 L 120 60 L 150 60 L 158 50 L 164 60 L 170 60 L 176 26 L 182 84 L 188 60 L 240 60" stroke="#4BE38A" strokeWidth={5} fill="none" strokeLinejoin="round" />
            </g>
          </g>
        );
      }
      case 'kidney':
        return (
          <g>
            <path d="M 66 12 Q 104 12 108 54 Q 110 96 72 106 Q 46 112 40 92 Q 36 80 50 70 Q 60 62 50 52 Q 38 42 42 28 Q 48 12 66 12 Z" fill="#C9576A" />
            <path d="M 60 46 Q 74 56 62 70" stroke="#8E3446" strokeWidth={6} fill="none" strokeLinecap="round" />
          </g>
        );
      case 'stone':
        return (
          <g>
            <path d="M 30 70 L 42 38 L 70 28 L 94 46 L 98 78 L 74 96 L 42 92 Z" fill="#C9B48A" />
            <path d="M 42 38 L 60 58 L 70 28 M 60 58 L 98 78 M 60 58 L 42 92" stroke="#A8925F" strokeWidth={4} />
            {[0, 1, 2].map((i) => <path key={i} d={`M ${18 + i * 40} ${18 + (i % 2) * 6} l 6 -10 l 6 10`} stroke={y} strokeWidth={4} fill="none" opacity={0.5 + 0.5 * Math.abs(Math.sin(f / 4 + i))} />)}
          </g>
        );
      case 'bottle': {
        const lvl = Math.min(1, f / 40);
        return (
          <g>
            <rect x={46} y={4} width={28} height={14} rx={4} fill={C.green} />
            <path d="M 40 18 L 80 18 L 84 34 L 84 108 Q 84 116 76 116 L 44 116 Q 36 116 36 108 L 36 34 Z" fill="rgba(255,255,255,0.35)" stroke={w} strokeWidth={4} />
            <rect x={40} y={112 - 74 * lvl} width={40} height={74 * lvl} rx={4} fill="#6FC3F2" />
          </g>
        );
      }
      case 'salt':
        return (
          <g>
            <path d="M 34 40 L 86 40 L 92 112 L 28 112 Z" fill={w} />
            <path d="M 34 40 Q 34 14 60 14 Q 86 14 86 40 Z" fill="#B9B4D6" />
            {[0, 1, 2].map((i) => <circle key={i} cx={48 + i * 12} cy={26} r={3} fill={nv} />)}
            <rect x={36} y={66} width={48} height={20} rx={4} fill={pk} />
          </g>
        );
      case 'meat':
        return (
          <g>
            <path d="M 20 60 Q 16 24 56 20 Q 100 18 104 54 Q 106 92 62 98 Q 24 100 20 60 Z" fill="#C9485F" />
            <path d="M 34 56 Q 56 40 84 52 M 40 74 Q 60 64 86 72" stroke="#F2B9C1" strokeWidth={6} fill="none" strokeLinecap="round" />
            <rect x={86} y={86} width={30} height={14} rx={7} fill={w} transform="rotate(30 100 92)" />
          </g>
        );
      case 'soda':
        return (
          <g>
            <path d="M 30 24 L 90 24 L 82 112 L 38 112 Z" fill={pk} />
            <rect x={26} y={16} width={68} height={12} rx={5} fill={w} />
            <path d="M 66 16 L 76 -2 L 92 -2" stroke={y} strokeWidth={6} fill="none" strokeLinecap="round" />
            {[0, 1, 2].map((i) => <circle key={i} cx={46 + i * 14} cy={60 + i * 12} r={5} fill={w} opacity={0.7} />)}
          </g>
        );
      case 'cup': {
        // bekas sampel air kencing: warna dari kuning gelap ke merah
        return (
          <g>
            <path d="M 26 20 L 94 20 L 86 112 L 34 112 Z" fill="rgba(255,255,255,0.35)" stroke={w} strokeWidth={4} />
            <path d="M 30 50 L 90 50 L 86 108 L 34 108 Z" fill="#D9485F" opacity={0.85} />
            <rect x={22} y={10} width={76} height={14} rx={5} fill={C.violet[3]} />
          </g>
        );
      }
      case 'bolt':
        return <path d="M 70 4 L 24 68 L 56 68 L 44 116 L 96 46 L 62 46 Z" fill={y} />;
      case 'hospital':
        return (
          <g>
            <rect x={14} y={26} width={92} height={88} rx={8} fill={w} />
            <rect x={44} y={6} width={32} height={30} rx={6} fill={w} />
            <path d="M 60 44 L 60 84 M 40 64 L 80 64" stroke={RED} strokeWidth={14} strokeLinecap="round" />
            <rect x={48} y={92} width={24} height={22} fill={C.violet[1]} />
          </g>
        );
      case 'sun':
        return (
          <g>
            {new Array(8).fill(0).map((_, i) => <rect key={i} x={56} y={4} width={8} height={20} rx={4} fill={ORANGE} transform={`rotate(${i * 45 + f} 60 60)`} />)}
            <circle cx={60} cy={60} r={30} fill={y} />
          </g>
        );
      case 'ac':
        return (
          <g>
            <rect x={6} y={30} width={108} height={70} rx={10} fill="#DCE3F2" />
            <circle cx={42} cy={65} r={26} fill="#9AA6C4" />
            {[0, 1, 2].map((i) => <rect key={i} x={40} y={44} width={4} height={22} rx={2} fill="#5B6684" transform={`rotate(${i * 120 + f * 12} 42 65)`} />)}
            {[0, 1, 2, 3].map((i) => <rect key={i} x={78} y={44 + i * 12} width={28} height={5} rx={2} fill="#9AA6C4" />)}
          </g>
        );
      case 'snore':
        return (
          <g>
            <circle cx={40} cy={70} r={34} fill="#F2C9A6" />
            <path d="M 26 64 L 38 66 M 46 66 L 58 64" stroke="#1E1A24" strokeWidth={5} strokeLinecap="round" />
            <ellipse cx={42} cy={86} rx={10} ry={8} fill="#7A3B3B" />
            <path d={`M 76 40 Q 92 ${30 + Math.sin(f / 3) * 8} 108 40 M 80 60 Q 96 ${50 + Math.sin(f / 3 + 1) * 8} 112 60 M 76 80 Q 92 ${70 + Math.sin(f / 3 + 2) * 8} 108 80`} stroke={y} strokeWidth={6} fill="none" strokeLinecap="round" />
          </g>
        );
      case 'yawn':
        return (
          <g>
            <circle cx={60} cy={60} r={48} fill="#F2C9A6" />
            <path d="M 34 48 Q 42 54 50 48 M 70 48 Q 78 54 86 48" stroke="#1E1A24" strokeWidth={5} fill="none" strokeLinecap="round" />
            <ellipse cx={60} cy={80} rx={14} ry={16 + 4 * Math.sin(f / 6)} fill="#7A3B3B" />
          </g>
        );
      case 'headache':
        return (
          <g>
            <circle cx={60} cy={64} r={44} fill="#F2C9A6" />
            <path d="M 40 60 L 52 64 M 80 60 L 68 64" stroke="#1E1A24" strokeWidth={5} strokeLinecap="round" />
            <path d="M 44 88 Q 60 78 76 88" stroke="#1E1A24" strokeWidth={5} fill="none" strokeLinecap="round" />
            <path d="M 18 22 L 30 32 M 102 22 L 90 32 M 60 2 L 60 16" stroke={y} strokeWidth={6} strokeLinecap="round" transform={`scale(${1 + 0.04 * Math.sin(f / 3)})`} />
          </g>
        );
      case 'choke':
        return (
          <g>
            <circle cx={60} cy={56} r={40} fill="#F2C9A6" />
            <path d="M 40 48 L 52 54 M 80 48 L 68 54" stroke="#1E1A24" strokeWidth={5} strokeLinecap="round" />
            <ellipse cx={60} cy={76} rx={10} ry={12} fill="#7A3B3B" />
            <path d="M 34 100 Q 60 118 86 100" stroke={RED} strokeWidth={8} fill="none" strokeLinecap="round" />
          </g>
        );
      case 'scale':
        return (
          <g>
            <rect x={10} y={30} width={100} height={80} rx={16} fill={w} />
            <path d="M 30 56 A 30 30 0 0 1 90 56" stroke="#C9C4E0" strokeWidth={10} fill="none" />
            <path d={`M 60 60 L ${60 + Math.cos(-0.5 - 0.3 * Math.sin(f / 8)) * 26} ${60 + Math.sin(-0.5 - 0.3 * Math.sin(f / 8)) * 26}`} stroke={RED} strokeWidth={6} strokeLinecap="round" />
            <circle cx={60} cy={60} r={6} fill={nv} />
          </g>
        );
      case 'neck':
        return (
          <g>
            <circle cx={60} cy={36} r={28} fill="#F2C9A6" />
            <rect x={36} y={56} width={48} height={40} rx={10} fill="#E5B48E" />
            <path d="M 10 116 Q 14 92 40 90 L 80 90 Q 106 92 110 116 Z" fill={C.violet[1]} />
            <path d="M 26 72 L 94 72" stroke={y} strokeWidth={5} strokeDasharray="8 6" />
            <path d="M 26 66 L 26 78 M 94 66 L 94 78" stroke={y} strokeWidth={5} />
          </g>
        );
      case 'male':
        return (
          <g>
            <circle cx={50} cy={70} r={30} stroke="#7FC4F2" strokeWidth={12} fill="none" />
            <path d="M 72 48 L 104 16 M 80 16 L 104 16 L 104 40" stroke="#7FC4F2" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      case 'age':
        return (
          <g>
            <rect x={10} y={22} width={100} height={88} rx={14} fill={w} />
            <rect x={10} y={22} width={100} height={26} rx={14} fill={pk} />
            <rect x={28} y={10} width={10} height={24} rx={5} fill={nv} /><rect x={82} y={10} width={10} height={24} rx={5} fill={nv} />
            <text x={60} y={96} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={40} fill={nv}>50+</text>
          </g>
        );
      case 'bp':
        return (
          <g>
            <rect x={20} y={14} width={80} height={92} rx={14} fill={w} />
            <rect x={30} y={26} width={60} height={34} rx={6} fill="#10203A" />
            <text x={60} y={52} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={24} fill="#FF7A8A">160</text>
            <circle cx={60} cy={84} r={12} fill={RED} opacity={0.6 + 0.4 * Math.abs(Math.sin(f / 5))} />
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
      case 'stroke':
        return (
          <g>
            <path d="M 60 18 Q 30 10 20 36 Q 4 46 14 70 Q 10 96 40 98 Q 52 110 60 96 Q 68 110 80 98 Q 110 96 106 70 Q 116 46 100 36 Q 90 10 60 18 Z" fill="#F29CBC" />
            <path d="M 70 30 L 56 56 L 72 56 L 58 86" stroke={RED} strokeWidth={7} fill="none" strokeLinejoin="round" strokeLinecap="round" />
          </g>
        );
      case 'car':
        return (
          <g>
            <path d="M 10 76 L 18 50 Q 22 40 34 40 L 86 40 Q 98 40 102 50 L 110 76 L 110 94 L 10 94 Z" fill="#7FC4F2" />
            <path d="M 28 52 L 34 44 L 86 44 L 92 52 Z" fill="#DDF1FF" />
            <circle cx={32} cy={94} r={12} fill="#2A2733" /><circle cx={88} cy={94} r={12} fill="#2A2733" />
            <rect x={14} y={66} width={14} height={8} rx={3} fill={y} />
          </g>
        );
      case 'nosmoke':
        return (
          <g>
            <rect x={14} y={54} width={74} height={14} rx={3} fill={w} />
            <rect x={88} y={54} width={18} height={14} rx={3} fill={ORANGE} />
            <path d={`M 96 48 Q 90 ${36 + Math.sin(f / 5) * 4} 100 28`} stroke="#B9B4D6" strokeWidth={4} fill="none" />
            <circle cx={60} cy={60} r={52} stroke={RED} strokeWidth={9} fill="none" />
            <path d="M 24 24 L 96 96" stroke={RED} strokeWidth={9} />
          </g>
        );
      case 'side':
        return (
          <g>
            <rect x={6} y={78} width={108} height={22} rx={8} fill={C.violet[3]} />
            <rect x={8} y={64} width={34} height={18} rx={9} fill={w} />
            <circle cx={30} cy={52} r={16} fill="#F2C9A6" />
            <path d="M 44 60 Q 70 48 106 66 L 106 80 L 40 80 Z" fill={C.violet[1]} />
          </g>
        );
      case 'cpap':
        return (
          <g>
            <rect x={8} y={60} width={46} height={44} rx={10} fill={w} />
            <rect x={16} y={70} width={30} height={10} rx={4} fill={C.green} />
            <path d="M 54 82 Q 80 84 82 60 Q 84 40 92 34" stroke="#B9B4D6" strokeWidth={8} fill="none" strokeLinecap="round" />
            <path d="M 84 16 Q 112 18 112 38 Q 110 56 92 56 Q 74 56 74 38 Q 74 18 84 16 Z" fill="#DDF1FF" stroke={w} strokeWidth={4} />
          </g>
        );
      case 'phone':
        return (
          <g>
            <rect x={30} y={6} width={60} height={108} rx={12} fill="#2A2733" />
            <rect x={36} y={16} width={48} height={84} rx={6} fill="#6FC3F2" />
            <circle cx={74} cy={26} r={6} fill={RED} opacity={Math.sin(f / 4) > 0 ? 1 : 0.2} />
          </g>
        );
      case 'clock':
        return (
          <g>
            <circle cx={60} cy={60} r={50} fill={w} />
            <path d={`M 60 60 L 60 22`} stroke={nv} strokeWidth={6} strokeLinecap="round" transform={`rotate(${f * 12} 60 60)`} />
            <path d="M 60 60 L 84 60" stroke={pk} strokeWidth={6} strokeLinecap="round" />
            <circle cx={60} cy={60} r={6} fill={nv} />
          </g>
        );
      case 'o2':
        return (
          <g>
            <circle cx={60} cy={60} r={50} fill="#6FC3F2" />
            <text x={54} y={76} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={46} fill={w}>O</text>
            <text x={84} y={86} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={26} fill={w}>2</text>
          </g>
        );
      case 'vomit':
        return (
          <g>
            <circle cx={60} cy={56} r={42} fill="#B6D98A" />
            <path d="M 38 46 L 50 50 M 82 46 L 70 50" stroke="#1E1A24" strokeWidth={5} strokeLinecap="round" />
            <path d="M 46 76 Q 60 66 74 76" stroke="#1E1A24" strokeWidth={5} fill="none" strokeLinecap="round" />
            <path d="M 52 98 Q 60 108 68 98" stroke={LEAF} strokeWidth={6} fill="none" />
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
          </g>
        );
      }
      case 'nopee':
        return (
          <g>
            <path d="M 28 20 L 92 20 L 84 112 L 36 112 Z" fill="rgba(255,255,255,0.35)" stroke={w} strokeWidth={4} />
            <circle cx={60} cy={66} r={34} stroke={RED} strokeWidth={8} fill="none" />
            <path d="M 36 42 L 84 90" stroke={RED} strokeWidth={8} />
          </g>
        );
      case 'search':
        return (
          <g>
            <circle cx={50} cy={50} r={34} fill="rgba(255,255,255,0.2)" stroke={w} strokeWidth={10} />
            <path d="M 76 76 L 108 108" stroke={w} strokeWidth={14} strokeLinecap="round" />
          </g>
        );
      case 'hammer':
        return (
          <g transform={`rotate(${-20 + 20 * Math.abs(Math.sin(f / 4))} 30 100)`}>
            <rect x={24} y={40} width={14} height={72} rx={6} fill="#A8784E" />
            <rect x={4} y={18} width={74} height={30} rx={8} fill="#9AA6C4" />
          </g>
        );
      case 'drop':
        return <path d="M 60 8 Q 96 56 96 78 A 36 36 0 0 1 24 78 Q 24 56 60 8 Z" fill="#6FC3F2" />;
    }
  })();
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{overflow: 'visible'}}>
      {body}
    </svg>
  );
};
