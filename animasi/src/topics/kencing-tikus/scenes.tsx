import React from 'react';
import {AbsoluteFill, Easing, interpolate, random, useCurrentFrame} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset, Mood, Pose} from '../../components/Avatar';
import {Camera, clamp, Glow, NightSky, Pill, Pop} from '../../components/common';
import {WordsFile, wordTime} from '../../lib/timeline';
import {HIcon} from '../hipoglisemia/scenes';
import {MIcon} from '../jenis-nyamuk/scenes';

export type SceneProps = {preset: AvatarPreset; dur: number; wf: WordsFile; start: number; fps: number};

/* ---------- watak cerita (rekaan, khas topik ini) ---------- */
export const RAHMAN: AvatarPreset = {
  id: 'rahman', skin: '#C48E66', skinShade: '#A8744E', hair: 'short', hairColor: '#1E1A24', top: 'tee', topColor: '#4F79C7', topShade: '#3A5FA3',
  accessory: null, stubble: true, moustache: true,
};
export const ISTERI: AvatarPreset = {
  id: 'isteri-rahman', skin: '#D9A47C', skinShade: '#BE8860', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#2BB3A3', topShade: '#1F8A7E',
  hijabColor: '#C394E6', hijabShade: '#9C6FC6', accessory: null,
};

const RED = '#D9485F';
const GREEN = '#3FBF7F';
const MUD = '#7A5A3A';
const MUD_D = '#5E4329';
const FLOOD = '#8C6B45';
const FLOOD_L = '#A8865C';
const BACT = '#9BE15D';

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

/* ================= Bakteria spiral "3D" (Leptospira) ================= */
export const Spiral: React.FC<{length?: number; seed?: number; color?: string; glow?: boolean; speed?: number}> = ({length = 600, seed = 0, color = BACT, glow = true, speed = 1}) => {
  const f = useCurrentFrame();
  const ph = (f * 0.25 * speed + seed * 1.7) % (Math.PI * 2);
  const N = 120, amp = 22, k = (Math.PI * 2 * 9) / length;
  const pts = new Array(N + 1).fill(0).map((_, i) => {
    const x = (i / N) * length;
    const env = Math.min(1, i / 8, (N - i) / 8);
    return {x, y: Math.sin(k * x + ph) * amp * (0.35 + 0.65 * env), z: Math.cos(k * x + ph)};
  });
  const sway = (x: number) => Math.sin(x / length * Math.PI * 2 + f / 20 + seed) * 18;
  const segs = pts.slice(1).map((p, i) => ({a: pts[i], b: p}));
  const hook = (end: 0 | 1) => {
    const x0 = end ? length : 0;
    const dir = end ? 1 : -1;
    return `M ${x0} ${sway(x0) + pts[end ? N : 0].y} q ${dir * 30} -10 ${dir * 30} -40 q 0 -18 ${-dir * 18} -14`;
  };
  return (
    <svg width={length + 80} height={200} viewBox={`-40 -100 ${length + 80} 200`} style={{overflow: 'visible'}}>
      {glow ? <ellipse cx={length / 2} cy={0} rx={length / 2 + 30} ry={60} fill={color} opacity={0.18} style={{filter: 'blur(16px)'}} /> : null}
      <path d={hook(0)} stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" opacity={0.9} />
      <path d={hook(1)} stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" opacity={0.9} />
      {/* belakang dahulu, depan kemudian (rasa 3D) */}
      {[false, true].map((front) =>
        segs
          .filter((s) => (s.a.z > 0) === front)
          .map((s, i) => (
            <line
              key={`${front}${i}`}
              x1={s.a.x}
              y1={s.a.y + sway(s.a.x)}
              x2={s.b.x}
              y2={s.b.y + sway(s.b.x)}
              stroke={front ? color : '#4E8A2C'}
              strokeWidth={front ? 15 : 11}
              strokeLinecap="round"
            />
          )),
      )}
      {segs
        .filter((s, i) => s.a.z > 0.6 && i % 2 === 0)
        .map((s, i) => (
          <line key={`h${i}`} x1={s.a.x} y1={s.a.y + sway(s.a.x) - 4} x2={s.b.x} y2={s.b.y + sway(s.b.x) - 4} stroke="#fff" strokeWidth={4} strokeLinecap="round" opacity={0.55} />
        ))}
    </svg>
  );
};

/* bakteria kecil terapung */
const MiniSpirals: React.FC<{n: number; x: number; y: number; w: number; h: number; seed: string; opacity?: number; size?: number}> = ({n, x, y, w, h, seed, opacity = 1, size = 150}) => {
  const f = useCurrentFrame();
  return (
    <>
      {new Array(n).fill(0).map((_, i) => {
        const px = x + random(`${seed}x${i}`) * w + Math.sin(f / 30 + i) * 20;
        const py = y + random(`${seed}y${i}`) * h + Math.cos(f / 25 + i) * 14;
        const rot = random(`${seed}r${i}`) * 360 + f * (i % 2 ? 0.6 : -0.6);
        return (
          <div key={i} style={{position: 'absolute', left: px, top: py, transform: `rotate(${rot}deg) scale(${size / 680})`, transformOrigin: '0 0', opacity}}>
            <Spiral length={600} seed={i} glow={false} />
          </div>
        );
      })}
    </>
  );
};

/* ================= Tikus (pandangan sisi) ================= */
export const Rat: React.FC<{size?: number; flip?: boolean; pee?: number}> = ({size = 300, flip, pee = 0}) => {
  const f = useCurrentFrame();
  const tail = Math.sin(f / 6) * 10;
  return (
    <svg width={size} height={(size * 180) / 300} viewBox="0 0 300 180" style={{overflow: 'visible', transform: flip ? 'scaleX(-1)' : undefined}}>
      <path d={`M 70 120 Q 20 ${130 + tail} 6 ${100 - tail}`} stroke="#D9A3A8" strokeWidth={8} fill="none" strokeLinecap="round" />
      <ellipse cx={140} cy={110} rx={86} ry={50} fill="#8A8496" />
      <ellipse cx={130} cy={96} rx={60} ry={28} fill="#A39DAE" opacity={0.6} />
      <path d="M 200 90 Q 262 92 286 118 Q 262 136 214 132 Z" fill="#8A8496" />
      <circle cx={210} cy={74} r={22} fill="#8A8496" />
      <circle cx={210} cy={74} r={13} fill="#E7A9B4" />
      <circle cx={246} cy={104} r={6} fill="#1E1A24" />
      <circle cx={286} cy={118} r={7} fill="#E7A9B4" />
      <path d="M 280 116 L 300 108 M 280 120 L 302 122" stroke="#5D5866" strokeWidth={2} />
      <path d="M 110 156 L 104 172 M 170 156 L 176 172" stroke="#D9A3A8" strokeWidth={8} strokeLinecap="round" />
      {pee > 0 ? (
        <g opacity={Math.min(1, pee * 3)}>
          {[0, 1, 2].map((i) => {
            const t = ((f / 12 + i / 3) % 1);
            return <ellipse key={i} cx={70 - t * 10} cy={150 + t * 60} rx={6} ry={9} fill="#F2D14B" opacity={1 - t} />;
          })}
        </g>
      ) : null}
    </svg>
  );
};

/* ================= Air banjir (paras boleh berubah) ================= */
const Flood: React.FC<{level: number; color?: string; opacity?: number}> = ({level, color = FLOOD, opacity = 0.92}) => {
  const f = useCurrentFrame();
  const w = (o: number, a: number) => {
    let d = `M 0 ${level + Math.sin(f / 10 + o) * a}`;
    for (let x = 0; x <= 1080; x += 60) d += ` L ${x} ${level + Math.sin(x / 90 + f / 10 + o) * a}`;
    return d + ' L 1080 1920 L 0 1920 Z';
  };
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
      <path d={w(0, 12)} fill={color} opacity={opacity} />
      <path d={w(2, 8)} fill={FLOOD_L} opacity={0.35} transform="translate(0 18)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M ${(i * 230 + f * 2) % 1180 - 80} ${level + 60 + i * 40} q 30 -10 60 0`} stroke="#C9AC80" strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.6} />
      ))}
    </svg>
  );
};

/* ================= Ikon khas topik (viewBox 120) ================= */
type KIconName = 'calf' | 'redEye' | 'yellow' | 'lessUrine' | 'wound' | 'barefoot' | 'boot' | 'glove' | 'plaster' | 'shower' | 'wade' | 'nose' | 'mouth' | 'eye' | 'capsule' | 'calendar';
const KIcon: React.FC<{name: KIconName; size?: number; f?: number}> = ({name, size = 120, f = 0}) => {
  const w = '#fff', nv = C.navy;
  const skin = '#E2B48C';
  const body = (() => {
    switch (name) {
      case 'calf':
        return (
          <g>
            <path d="M 46 6 L 74 6 Q 92 40 80 74 L 74 104 L 94 108 Q 100 116 90 118 L 46 118 L 48 70 Q 34 40 46 6 Z" fill={skin} />
            <ellipse cx={74} cy={46} rx={16} ry={24} fill={RED} opacity={0.35 + 0.35 * Math.abs(Math.sin(f / 5))} />
            <path d="M 98 30 L 110 22 M 102 46 L 116 46 M 98 62 L 110 70" stroke={C.yellow} strokeWidth={5} strokeLinecap="round" />
          </g>
        );
      case 'redEye':
      case 'eye':
        return (
          <g>
            <path d="M 6 60 Q 60 12 114 60 Q 60 108 6 60 Z" fill={name === 'redEye' ? '#F6C7C7' : w} />
            {name === 'redEye' ? <path d="M 20 56 L 36 60 L 30 70 M 100 54 L 86 60 L 92 70 M 30 46 L 42 54 M 92 44 L 80 54" stroke={RED} strokeWidth={3} fill="none" strokeLinecap="round" /> : null}
            <circle cx={60} cy={60} r={22} fill="#6B4A36" />
            <circle cx={60} cy={60} r={10} fill="#1E1A24" />
            <circle cx={52} cy={52} r={5} fill={w} />
          </g>
        );
      case 'yellow':
        return (
          <g>
            <circle cx={60} cy={62} r={46} fill="#F2D14B" />
            <path d="M 34 54 Q 42 48 50 54 M 70 54 Q 78 48 86 54" stroke={nv} strokeWidth={5} fill="none" strokeLinecap="round" />
            <ellipse cx={42} cy={60} rx={9} ry={6} fill="#FFF3A6" /><ellipse cx={78} cy={60} rx={9} ry={6} fill="#FFF3A6" />
            <circle cx={42} cy={60} r={4} fill={nv} /><circle cx={78} cy={60} r={4} fill={nv} />
            <path d="M 44 88 Q 60 80 76 88" stroke={nv} strokeWidth={5} fill="none" strokeLinecap="round" />
          </g>
        );
      case 'lessUrine':
        return (
          <g>
            <path d="M 50 10 Q 84 52 84 70 A 34 34 0 0 1 16 70 Q 16 52 50 10 Z" fill="#F2D14B" />
            <path d="M 98 30 L 98 96 M 84 82 L 98 98 L 112 82" stroke={RED} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      case 'wound':
        return (
          <g>
            <rect x={10} y={30} width={100} height={64} rx={30} fill={skin} />
            <path d="M 30 62 L 46 54 L 58 66 L 72 52 L 90 62" stroke={RED} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={58} cy={74} r={4} fill={RED} />
          </g>
        );
      case 'barefoot':
        return (
          <g>
            <path d="M 30 112 Q 18 70 34 40 Q 52 14 74 26 Q 92 40 84 72 Q 78 96 82 112 Z" fill={skin} />
            {[0, 1, 2, 3, 4].map((i) => <ellipse key={i} cx={38 + i * 11} cy={22 + Math.abs(i - 1.5) * 5} rx={6} ry={8} fill={skin} />)}
            <rect x={0} y={100} width={120} height={20} rx={8} fill={MUD} />
          </g>
        );
      case 'boot':
        return (
          <g>
            <path d="M 34 8 L 74 8 L 74 74 Q 104 78 112 96 L 112 110 L 30 110 Z" fill="#F2C230" />
            <rect x={28} y={104} width={88} height={12} rx={6} fill="#3A3150" />
            <rect x={34} y={8} width={40} height={12} rx={4} fill="#D9A41F" />
            <path d="M 40 30 L 66 30" stroke="#D9A41F" strokeWidth={5} strokeLinecap="round" />
          </g>
        );
      case 'glove':
        return (
          <g>
            <rect x={34} y={74} width={50} height={40} rx={8} fill="#E4629F" />
            <rect x={28} y={40} width={62} height={46} rx={20} fill="#F28AB8" />
            {[0, 1, 2, 3].map((i) => <rect key={i} x={30 + i * 15} y={10 + (i === 0 || i === 3 ? 10 : 0)} width={13} height={42} rx={6.5} fill="#F28AB8" />)}
            <rect x={80} y={50} width={28} height={13} rx={6.5} fill="#F28AB8" transform="rotate(-30 80 56)" />
          </g>
        );
      case 'plaster':
        return (
          <g transform="rotate(-30 60 60)">
            <rect x={6} y={40} width={108} height={40} rx={20} fill="#E8C39A" />
            <rect x={40} y={44} width={40} height={32} rx={6} fill="#F7E6D2" />
            {[0, 1, 2, 3].map((i) => <circle key={i} cx={18 + (i % 2) * 8} cy={54 + Math.floor(i / 2) * 12} r={2.5} fill="#C9A47A" />)}
            {[0, 1, 2, 3].map((i) => <circle key={`r${i}`} cx={94 + (i % 2) * 8} cy={54 + Math.floor(i / 2) * 12} r={2.5} fill="#C9A47A" />)}
            <path d="M 88 18 Q 96 30 88 34 Q 80 30 88 18 Z" fill="#8FD0F5" />
          </g>
        );
      case 'shower':
        return (
          <g>
            <path d="M 20 20 Q 20 6 34 6 L 70 6" stroke="#C9C3D9" strokeWidth={8} fill="none" strokeLinecap="round" />
            <path d="M 54 14 L 98 14 L 90 34 L 62 34 Z" fill="#C9C3D9" />
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const t = ((f / 8 + i / 6) % 1);
              return <path key={i} d={`M ${64 + (i % 3) * 10} ${40 + t * 70} l 0 10`} stroke="#8FD0F5" strokeWidth={5} strokeLinecap="round" opacity={1 - t * 0.6} />;
            })}
          </g>
        );
      case 'wade':
        return (
          <g>
            <circle cx={60} cy={20} r={14} fill={skin} />
            <rect x={44} y={36} width={32} height={46} rx={12} fill={C.violet[3]} />
            <rect x={0} y={66} width={120} height={54} rx={10} fill={FLOOD} />
            <path d="M 0 70 Q 20 62 40 70 T 80 70 T 120 70" stroke={FLOOD_L} strokeWidth={5} fill="none" />
          </g>
        );
      case 'nose':
        return (
          <g>
            <path d="M 58 10 Q 48 60 30 80 Q 38 98 60 96 Q 82 98 90 80 Q 72 60 62 10 Z" fill={skin} />
            <ellipse cx={46} cy={86} rx={8} ry={5} fill="#A8744E" /><ellipse cx={74} cy={86} rx={8} ry={5} fill="#A8744E" />
          </g>
        );
      case 'mouth':
        return (
          <g>
            <path d="M 14 56 Q 60 24 106 56 Q 60 104 14 56 Z" fill="#D2638E" />
            <path d="M 22 58 Q 60 70 98 58" stroke="#8A2F55" strokeWidth={6} fill="none" />
            <rect x={44} y={56} width={32} height={10} rx={3} fill={w} />
          </g>
        );
      case 'capsule':
        return (
          <g transform="rotate(-35 60 60)">
            <rect x={14} y={38} width={92} height={44} rx={22} fill={w} />
            <path d="M 60 38 L 84 38 A 22 22 0 0 1 84 82 L 60 82 Z" fill={C.labelPink} />
            <rect x={24} y={46} width={26} height={8} rx={4} fill="#fff" opacity={0.8} />
          </g>
        );
      case 'calendar':
        return (
          <g>
            <rect x={10} y={18} width={100} height={92} rx={14} fill={w} />
            <rect x={10} y={18} width={100} height={28} rx={14} fill={C.labelPink} />
            <rect x={10} y={34} width={100} height={12} fill={C.labelPink} />
            <rect x={32} y={8} width={10} height={20} rx={5} fill={nv} /><rect x={78} y={8} width={10} height={20} rx={5} fill={nv} />
            <text x={60} y={94} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={38} fill={nv}>30</text>
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

const Chip: React.FC<{icon?: KIconName; hicon?: React.ComponentProps<typeof HIcon>['name']; micon?: React.ComponentProps<typeof MIcon>['name']; text: React.ReactNode; bg?: string; color?: string; w?: number; f?: number; size?: number}> = ({icon, hicon, micon, text, bg = C.navy, color = '#fff', w = 520, f = 0, size = 42}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 20, width: w, background: bg, borderRadius: 34, padding: '14px 26px 14px 16px', boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
    <div style={{width: 92, height: 92, borderRadius: 26, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
      {icon ? <KIcon name={icon} size={76} f={f} /> : hicon ? <HIcon name={hicon} size={76} f={f} /> : micon ? <MIcon name={micon} size={76} f={f} /> : null}
    </div>
    <Txt size={size} color={color}>{text}</Txt>
  </div>
);

const Check: React.FC = () => (
  <div style={{width: 48, height: 48, borderRadius: 14, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
    <svg width={32} height={32} viewBox="0 0 30 30"><path d="M 5 16 L 12 23 L 25 8" stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </div>
);

/* ================= Kalendar inkubasi 1–30 ================= */
const Calendar: React.FC<{from: number; upto: number; mark10: boolean; width?: number}> = ({from, upto, mark10, width = 900}) => {
  const f = useCurrentFrame();
  const cols = 6, cell = 130, gap = 14;
  const W = cols * cell + (cols - 1) * gap;
  return (
    <div style={{width, background: '#fff', borderRadius: 40, padding: 30, boxShadow: '0 20px 50px rgba(18,11,51,.5)'}}>
      <div style={{background: C.labelPink, borderRadius: 24, padding: '10px 20px', marginBottom: 20, textAlign: 'center'}}>
        <Txt size={42}>Tempoh selepas terdedah</Txt>
      </div>
      <div style={{position: 'relative', width: W, height: 5 * cell + 4 * gap, margin: '0 auto', transform: `scale(${(width - 60) / W})`, transformOrigin: '0 0'}}>
        {new Array(30).fill(0).map((_, i) => {
          const d = i + 1;
          const on = d >= from && d <= upto;
          const is10 = d === 10 && mark10;
          return (
            <div
              key={d}
              style={{
                position: 'absolute',
                left: (i % cols) * (cell + gap),
                top: Math.floor(i / cols) * (cell + gap),
                width: cell,
                height: cell,
                borderRadius: 24,
                background: is10 ? C.yellow : on ? '#FFD3E2' : '#EEEAF7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: is10 ? `scale(${1.12 + 0.05 * Math.sin(f / 5)})` : undefined,
                boxShadow: is10 ? '0 10px 24px rgba(18,11,51,.35)' : undefined,
              }}
            >
              <Txt size={52} color={on || is10 ? C.navy : '#B8B2CC'}>{d}</Txt>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ================= 0 — Hook: banjir surut… bahaya baru bermula ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSur = at(p, 'surut', 0.76);
  const aBah = at(p, 'bahaya', 1.84);
  const aBaru = at(p, 'baru', 3.2);
  const level = interpolate(f, [0, aBah], [900, 1330], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const reveal = interpolate(f, [aBah, aBah + 16], [0, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.1} panY={-20}>
      <NightSky seed={61} glow={f >= aBah ? '#4E8A2C' : C.violet[2]} />
      {/* rumah */}
      <div style={{position: 'absolute', left: 240, top: 640}}>
        <svg width={600} height={700} viewBox="0 0 600 700">
          <path d="M 20 260 L 300 40 L 580 260 Z" fill={C.labelPink} />
          <rect x={60} y={250} width={480} height={450} fill="#EDE6F6" />
          <rect x={250} y={420} width={110} height={280} rx={10} fill={C.violet[1]} />
          <rect x={100} y={330} width={110} height={110} rx={10} fill="#8DC9F0" />
          <rect x={390} y={330} width={110} height={110} rx={10} fill="#8DC9F0" />
          {/* kesan paras air */}
          <rect x={60} y={420} width={480} height={10} fill={MUD} opacity={interpolate(f, [aSur, aSur + 20], [0, 0.7], clamp)} />
        </svg>
      </div>
      <Flood level={level} />
      <div style={{opacity: reveal}}>
        <MiniSpirals n={7} x={40} y={level + 40} w={960} h={330} seed="intro" size={170} />
      </div>
      <Pop at={4} style={{left: 0, width: 1080, top: 480, display: 'flex', justifyContent: 'center'}}>
        <Pill text={f >= aSur ? 'Banjir dah surut…' : 'Banjir…'} bg={C.navy} color={C.yellow} size={52} />
      </Pop>
      <Pop at={aBaru} style={{left: 0, width: 1080, top: 590, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Bahaya baru bermula" bg={RED} size={58} />
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Bersihkan lumpur tanpa but, kaki luka ================= */
export const Kerja: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aRah = at(p, 'rahman', 0.24);
  const aBan = at(p, 'banjir', 2.68);
  const aLum = at(p, 'lumpur', 4.96);
  const aTanpa = at(p, 'tanpa', 5.76);
  const aLuka = at(p, 'terluka', 7.24);
  const aSik = at(p, 'luka sikit', 9.15);
  const sweep = Math.sin(f / 6) * 14;
  return (
    <Camera dur={p.dur} to={1.07} panX={-20}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.violet[0]} 0%, #9C8EB5 60%, #B59C86 100%)`}} />
      {/* dinding dengan kesan air */}
      <div style={{position: 'absolute', left: 0, top: 1050, width: 1080, height: 12, background: MUD, opacity: 0.6}} />
      <div style={{position: 'absolute', left: 0, top: 1062, width: 1080, height: 330, background: 'rgba(122,90,58,0.25)'}} />
      <div style={{position: 'absolute', left: 0, top: 1390, width: 1080, height: 530, background: MUD}} />
      {new Array(9).fill(0).map((_, i) => (
        <div key={i} style={{position: 'absolute', left: 40 + i * 120, top: 1420 + (i % 3) * 60, width: 90, height: 26, borderRadius: 13, background: MUD_D, opacity: 0.7}} />
      ))}
      <Pop at={aRah - 4} style={{left: 60, top: 500}} origin="left center">
        <Pill text="Encik Rahman, 45 tahun" bg={C.navy} color={C.yellow} size={50} />
      </Pop>
      <Pop at={aBan} style={{left: 60, top: 620}} origin="left center">
        <Pill text="Bersihkan rumah lepas banjir" bg={FLOOD} size={42} />
      </Pop>
      <Who preset={RAHMAN} x={40} y={830} w={480} mood={f >= aLuka ? 'shock' : 'neutral'} pose={f >= aSik ? 'wave' : 'clasp'} seed={1} />
      {/* penyapu */}
      <div style={{position: 'absolute', left: 430, top: 1080, transform: `rotate(${-20 + sweep}deg)`, transformOrigin: '20px 0'}}>
        <svg width={60} height={420} viewBox="0 0 60 420">
          <rect x={22} y={0} width={14} height={320} rx={7} fill="#B5824E" />
          <path d="M 0 320 L 60 320 L 52 420 L 8 420 Z" fill={C.yellow} />
        </svg>
      </div>
      <Pop at={aLum} style={{left: 600, top: 780}}>
        <Chip icon="barefoot" text={f >= aTanpa ? 'Tanpa but' : 'Penuh lumpur'} w={430} bg={MUD} f={f} />
      </Pop>
      {f >= aTanpa + 8 && f < aLuka ? (
        <div style={{position: 'absolute', left: 618, top: 794}}><Cross f={f - aTanpa - 8} size={92} /></div>
      ) : null}
      <Pop at={aLuka} style={{left: 600, top: 950}}>
        <div style={{width: 430, borderRadius: 40, background: '#fff', padding: 20, boxShadow: '0 14px 34px rgba(18,11,51,.5)', textAlign: 'center'}}>
          <svg width={390} height={230} viewBox="0 0 390 230">
            <path d="M 60 0 L 150 0 L 160 150 Q 230 150 330 180 Q 360 200 340 220 L 60 220 Z" fill="#E2B48C" />
            <path d="M 110 90 L 130 80 L 140 100 L 160 88" stroke={RED} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <rect x={140} y={60} width={70} height={10} rx={3} fill="#8B5A2B" transform="rotate(-25 140 60)" />
            <rect x={0} y={200} width={390} height={30} rx={10} fill={MUD} />
          </svg>
          <Txt size={40} color={RED}>Kaki terluka</Txt>
        </div>
      </Pop>
      <Pop at={aSik - 2} style={{left: 520, top: 1290}}>
        <Bubble size={50}>"Luka sikit je."</Bubble>
      </Pop>
    </Camera>
  );
};

/* ================= 2 — Seminggu kemudian: demam, betis sakit, mata merah ================= */
export const Simptom: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aDem = at(p, 'demam', 1.3);
  const aBet = at(p, 'betisnya', 2.5);
  const aMat = at(p, 'matanya', 5.7);
  const aIst = at(p, 'isterinya', 7.0);
  const aKli = at(p, 'klinik', 8.3);
  const heat = interpolate(f, [aDem, aDem + 20], [0, 1], clamp);
  const sym = [
    {micon: 'thermo' as const, text: 'Demam tinggi', a: aDem, bg: RED},
    {icon: 'calf' as const, text: 'Betis sakit sangat', a: aBet, bg: C.navy},
    {icon: 'redEye' as const, text: 'Mata merah', a: aMat, bg: C.violet[0]},
  ];
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[0]} 0%, ${C.night[3]} 100%)`}} />
      <Glow x={300} y={1100} r={460} color={RED} opacity={0.25 * heat + 0.05 * Math.sin(f / 5)} />
      <Pop at={2} style={{left: 60, top: 500}} origin="left center">
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <KIcon name="calendar" size={80} />
          <Pill text="Seminggu kemudian…" bg={C.labelPink} size={48} />
        </div>
      </Pop>
      <Who preset={RAHMAN} x={40} y={840} w={470} mood={f >= aBet ? 'sad' : 'tired'} pose="clasp" seed={1} style={{transform: `translateX(${Math.sin(f * 1.5) * 3 * heat}px)`}} />
      {heat > 0
        ? [0, 1, 2].map((i) => {
            const t = (f + i * 13) % 40;
            return <div key={i} style={{position: 'absolute', left: 150 + i * 100, top: 930 + t * 3, width: 18, height: 26, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: '#9FD6F7', opacity: interpolate(t, [0, 6, 32, 40], [0, 1, 1, 0])}} />;
          })
        : null}
      {sym.map((s, i) => (
        <Pop key={s.text} at={s.a} style={{left: 540, top: 660 + i * 150}}>
          <Chip icon={'icon' in s ? s.icon : undefined} micon={'micon' in s ? s.micon : undefined} text={s.text} w={500} f={f - s.a} bg={s.bg} size={40} />
        </Pop>
      ))}
      <Pop at={aIst} style={{left: 680, top: 1140}}>
        <Avatar preset={ISTERI} width={330} mood="sad" pose="point" seed={4} />
      </Pop>
      <Pop at={aKli} style={{left: 40, top: 1600}} origin="left center">
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

/* ================= 3 — "Ada terlibat dengan banjir?" → LEPTOSPIROSIS ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aAda = at(p, 'ada', 1.0);
  const aUji = at(p, 'ujian', 2.7);
  const aLep = at(p, 'lep-to-spi-ro-sis', 5.7);
  const aKen = at(p, 'kencing', 8.4);
  const stamp = f >= aLep - 4 ? interpolate(f - aLep + 4, [0, 6, 10], [1.8, 0.94, 1], clamp) : 0;
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[3]} 0%, ${C.violet[2]} 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={f >= aLep ? '#4E8A2C' : C.labelPink} opacity={0.3} />
      <Who preset={p.preset} x={-10} y={760} w={480} mood="curious" pose="point" />
      <Who preset={RAHMAN} x={640} y={900} w={400} mood="tired" pose="clasp" seed={1} />
      <Pop at={aAda - 2} style={{left: 60, top: 500}}>
        <Bubble size={46}>"Ada terlibat dengan banjir?"</Bubble>
      </Pop>
      <Pop at={aUji} style={{left: 620, top: 640}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, background: C.navy, padding: '8px 26px 8px 10px', borderRadius: 40}}>
          <MIcon name="tube" size={80} />
          <Txt size={38} color={C.yellow}>Ujian darah</Txt>
        </div>
      </Pop>
      {stamp > 0 ? (
        <div style={{position: 'absolute', left: 0, width: 1080, top: 1290, display: 'flex', justifyContent: 'center'}}>
          <div style={{transform: `scale(${stamp}) rotate(-6deg)`, border: `10px solid ${BACT}`, borderRadius: 26, padding: '10px 32px', background: 'rgba(18,11,51,0.88)'}}>
            <Txt size={88} color={BACT} style={{letterSpacing: 2}}>LEPTOSPIROSIS</Txt>
          </div>
        </div>
      ) : null}
      <Pop at={aKen} style={{left: 0, width: 1080, top: 1490, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: '#fff', padding: '8px 34px 8px 10px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <Rat size={130} />
          <Txt size={46} color={C.navy}>Penyakit kencing tikus</Txt>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 4 — #1 Apa itu: bakteria spiral dari air kencing tikus ================= */
export const Apa: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aBak = at(p, 'bakteria', 2.86);
  const aSpi = at(p, 'spiral', 3.86);
  const aAir = at(p, 'air kencing', 5.46);
  const aHai = at(p, 'haiwan', 6.5);
  const aCem = at(p, 'mencemari', 7.58);
  const grow = interpolate(f, [aBak - 6, aBak + 14], [0, 1], {...clamp, easing: Easing.out(Easing.back(1.4))});
  const dirty = interpolate(f, [aCem, aCem + 20], [0, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.06} panY={-10}>
      <NightSky seed={63} glow="#4E8A2C" />
      <div style={{position: 'absolute', left: 140, top: 540, transform: `scale(${grow}) perspective(1200px) rotateX(${12 + Math.sin(f / 30) * 8}deg) rotateZ(${-8 + Math.sin(f / 45) * 5}deg)`, transformOrigin: '400px 100px'}}>
        <Spiral length={720} />
      </div>
      <Pop at={aSpi} style={{left: 0, width: 1080, top: 790, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Bakteria berbentuk spiral" bg={BACT} color={C.navy} size={46} />
      </Pop>
      {/* tanah + air bertakung */}
      <div style={{position: 'absolute', left: 0, top: 1180, width: 1080, height: 200, background: MUD}} />
      <div style={{position: 'absolute', left: 340, top: 1170, width: 700, height: 90, borderRadius: '50%', background: `rgba(${Math.round(120 + 60 * dirty)}, ${Math.round(150 + 20 * dirty)}, ${Math.round(200 - 120 * dirty)}, 0.9)`}} />
      <div style={{opacity: dirty}}>
        <MiniSpirals n={6} x={360} y={1160} w={620} h={150} seed="apa" size={120} />
      </div>
      <Pop at={aAir - 4} style={{left: 30, top: 990}}>
        <Rat size={300} pee={f >= aAir ? 1 : 0} />
      </Pop>
      <Pop at={aHai} style={{left: 520, top: 960}}>
        <Pill text="+ haiwan lain" bg={C.navy} color={C.yellow} size={42} />
      </Pop>
      <Pop at={aCem} style={{left: 0, width: 1080, top: 1550, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Cemari air & tanah" bg={FLOOD} size={50} />
      </Pop>
    </Camera>
  );
};

/* ================= 5 — #2 Cara jangkitan: luka, mata, hidung, mulut + banjir ================= */
export const Jangkitan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const entries: {icon: KIconName; text: string; a: number; x: number; y: number; tx: number; ty: number}[] = [
    {icon: 'wound', text: 'Luka di kulit', a: at(p, 'luka', 3.26), x: 40, y: 500, tx: 380, ty: 780},
    {icon: 'eye', text: 'Mata', a: at(p, 'mata', 4.42), x: 700, y: 500, tx: 590, ty: 670},
    {icon: 'nose', text: 'Hidung', a: at(p, 'hidung', 5.18), x: 40, y: 830, tx: 520, ty: 705},
    {icon: 'mouth', text: 'Mulut', a: at(p, 'mulut', 5.78), x: 700, y: 830, tx: 545, ty: 745},
  ];
  const aRis = at(p, 'risiko', 6.42);
  const aRed = at(p, 'meredah', 7.78);
  const aBer = at(p, 'membersihkan', 9.06);
  const level = interpolate(f, [aRis, aRis + 40], [1960, 1080], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <Camera dur={p.dur} to={1.06} panY={-10}>
      <NightSky seed={65} glow={C.violet[2]} />
      <Who preset={RAHMAN} x={320} y={480} w={440} mood={f >= aRis ? 'curious' : 'neutral'} pose="down" seed={1} />
      {entries.map((e) => {
        const t = interpolate(f, [e.a, e.a + 18], [0, 1], clamp);
        const sx = e.x + (e.x < 500 ? 330 : 40);
        const sy = e.y + 60;
        return (
          <React.Fragment key={e.text}>
            {f >= e.a ? (
              <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, pointerEvents: 'none'}}>
                <path d={`M ${sx} ${sy} L ${sx + (e.tx - sx) * t} ${sy + (e.ty - sy) * t}`} stroke={BACT} strokeWidth={8} strokeDasharray="14 12" strokeLinecap="round" />
                <circle cx={sx + (e.tx - sx) * t} cy={sy + (e.ty - sy) * t} r={14} fill={BACT} />
              </svg>
            ) : null}
            <Pop at={e.a} style={{left: e.x, top: e.y}}>
              <Chip icon={e.icon} text={e.text} w={340} bg={C.navy} size={38} f={f} />
            </Pop>
          </React.Fragment>
        );
      })}
      {f >= aRis ? <Flood level={level} /> : null}
      {f >= aRis ? (
        <div style={{opacity: interpolate(f, [aRis + 10, aRis + 30], [0, 1], clamp)}}>
          <MiniSpirals n={6} x={40} y={level + 30} w={1000} h={220} seed="jg" size={130} />
        </div>
      ) : null}
      <Pop at={aRis} style={{left: 0, width: 1080, top: 1000, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Risiko paling tinggi" bg={RED} size={48} />
      </Pop>
      <Pop at={aRed} style={{left: 40, top: 1180}} origin="left center">
        <Chip icon="wade" text="Redah air banjir" w={480} bg={FLOOD} size={38} />
      </Pop>
      <Pop at={aBer} style={{left: 560, top: 1180}} origin="left center">
        <Chip icon="barefoot" text="Bersihkan lumpur" w={480} bg={MUD} size={38} />
      </Pop>
    </Camera>
  );
};

/* ================= 6 — #3 Tanda: kalendar 2–30 hari, simptom, amaran teruk ================= */
export const Tanda: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aDua = at(p, 'dua', 2.6);
  const aHari = at(p, 'hari', 3.5);
  const aSep = at(p, 'sepuluh', 4.6);
  const aDem = at(p, 'demam', 5.7);
  const aTer = at(p, 'teruk', 10.9);
  const upto = Math.round(interpolate(f, [aDua + 4, aHari + 10], [2, 30], clamp));
  const sym = [
    {micon: 'thermo' as const, text: 'Demam mengejut', a: aDem, bg: RED},
    {micon: 'head' as const, text: 'Sakit kepala', a: at(p, 'kepala', 6.9), bg: C.navy},
    {icon: 'calf' as const, text: 'Sakit otot, terutama betis', a: at(p, 'otot', 8.0), bg: C.violet[0]},
    {icon: 'redEye' as const, text: 'Mata merah', a: at(p, 'mata merah', 9.6), bg: C.navy},
  ];
  const severe = [
    {icon: 'yellow' as const, text: 'Kulit & mata kuning', a: at(p, 'kuning', 12.4)},
    {icon: 'lessUrine' as const, text: 'Kencing berkurang', a: at(p, 'kencing berkurang', 13.2)},
    {micon: 'skull' as const, text: 'Boleh membawa maut', a: at(p, 'maut', 15.1)},
  ];
  return (
    <Camera dur={p.dur} to={1.05} panY={-10}>
      <NightSky seed={67} glow={f >= aTer ? RED : C.violet[2]} />
      {f < aDem ? (
        <>
          <Pop at={aDua - 6} style={{left: 90, top: 500}}>
            <Calendar from={2} upto={f >= aDua ? upto : 0} mark10={f >= aSep} width={900} />
          </Pop>
          <Pop at={aSep} style={{left: 0, width: 1080, top: 1540, display: 'flex', justifyContent: 'center'}}>
            <Pill text="Purata 10 hari" bg={C.yellow} color={C.navy} size={50} />
          </Pop>
        </>
      ) : f < aTer ? (
        sym.map((s, i) => (
          <Pop key={s.text} at={s.a} style={{left: 50, top: 520 + i * 165}} origin="left center">
            <Chip icon={'icon' in s ? s.icon : undefined} micon={'micon' in s ? s.micon : undefined} text={s.text} w={i === 2 ? 900 : 640} f={f - s.a} bg={s.bg} size={i === 2 ? 40 : 44} />
          </Pop>
        ))
      ) : (
        <>
          <Pop at={aTer} style={{left: 0, width: 1080, top: 500, display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, background: C.yellow, padding: '10px 36px 10px 16px', borderRadius: 44}}>
              <HIcon name="warn" size={70} />
              <Txt size={54} color={C.navy}>KALAU TERUK</Txt>
            </div>
          </Pop>
          {severe.map((s, i) => (
            <Pop key={s.text} at={s.a} style={{left: 90, top: 660 + i * 170}} origin="left center">
              <Chip icon={'icon' in s ? s.icon : undefined} micon={'micon' in s ? s.micon : undefined} text={s.text} w={820} f={f - s.a} bg={i === 2 ? RED : C.navy} size={46} />
            </Pop>
          ))}
        </>
      )}
    </Camera>
  );
};

/* ================= 7 — #4 Cegah ================= */
export const Cegah: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const items: {icon: KIconName; text: string; a: number; bg: string; no?: boolean}[] = [
    {icon: 'boot', text: 'But getah', a: at(p, 'boot', 1.7), bg: C.navy},
    {icon: 'glove', text: 'Sarung tangan', a: at(p, 'sarung', 2.5), bg: C.violet[1]},
    {icon: 'plaster', text: 'Tutup luka: plaster kalis air', a: at(p, 'tutup', 3.4), bg: C.navy},
    {icon: 'wade', text: 'Jangan redah / main air banjir', a: at(p, 'jangan', 5.7), bg: RED, no: true},
    {icon: 'shower', text: 'Terus mandi dengan air bersih', a: at(p, 'selepas', 8.2), bg: C.violet[1]},
  ];
  return (
    <Camera dur={p.dur} to={1.05} panY={-10}>
      <NightSky seed={69} glow={C.green} />
      {items.map((it, i) => (
        <Pop key={it.text} at={it.a} style={{left: 40, top: 490 + i * 150}} origin="left center">
          <div style={{display: 'flex', alignItems: 'center', gap: 14, position: 'relative'}}>
            {it.no ? (
              <div style={{width: 48, height: 48, borderRadius: 14, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <Txt size={36}>✕</Txt>
              </div>
            ) : (
              <Check />
            )}
            <Chip icon={it.icon} text={it.text} w={i >= 2 ? 920 : 600} f={f - it.a} bg={it.bg} size={i >= 2 ? 38 : 44} />
          </div>
        </Pop>
      ))}
      <Who preset={p.preset} x={600} y={1500} w={400} mood="happy" pose="point" />
    </Camera>
  );
};

/* ================= 8 — Pulih dengan antibiotik awal ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aAnt = at(p, 'antibiotik', 0.75);
  const aPul = at(p, 'pulih', 2.2);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.violet[0]} 0%, ${C.pink[0]} 60%, #F6A86B 100%)`}} />
      <Glow x={540} y={1050} r={560} color={C.yellow} opacity={0.35} />
      <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: '#3F8A5A'}} />
      {f >= aPul
        ? new Array(14).fill(0).map((_, i) => {
            const t = f - aPul;
            const ang = random(`kp${i}`) * Math.PI * 2;
            const d = interpolate(t, [0, 24], [0, 260 + random(`kd${i}`) * 160], clamp);
            return <div key={i} style={{position: 'absolute', left: 540 + Math.cos(ang) * d, top: 1000 + Math.sin(ang) * d, width: 22, height: 22, borderRadius: 11, background: i % 2 ? C.yellow : '#fff', opacity: interpolate(t, [0, 6, 24, 34], [0, 1, 1, 0], clamp)}} />;
          })
        : null}
      <Who preset={RAHMAN} x={120} y={820} w={480} mood={f >= aPul ? 'happy' : 'neutral'} pose={f >= aPul ? 'wave' : 'clasp'} seed={1} />
      <Who preset={ISTERI} x={640} y={1040} w={340} mood="happy" pose="clasp" seed={4} />
      <Pop at={aAnt} style={{left: 0, width: 1080, top: 500, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: C.navy, padding: '10px 36px 10px 14px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <KIcon name="capsule" size={80} />
          <Txt size={48} color={C.yellow}>Antibiotik awal</Txt>
        </div>
      </Pop>
      <Pop at={aPul} style={{left: 0, width: 1080, top: 650, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: GREEN, padding: '10px 36px 10px 14px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <HIcon name="check" size={76} />
          <Txt size={54}>Pulih sepenuhnya</Txt>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 9 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSeb = at(p, 'sebulan', 0.8);
  const aJan = at(p, 'jangan tunggu', 2.4);
  const aPer = at(p, 'pergi', 3.4);
  const aBer = at(p, 'beritahu', 4.4);
  const aSaya = at(p, 'saya doktor', 7.0);
  return (
    <Camera dur={p.dur} to={1.06} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 60%, ${C.pink[2]} 100%)`}} />
      <NightSky seed={71} glow={C.green} top="transparent" bottom="transparent" stars={50} />
      <Pop at={2} style={{left: 0, width: 1080, top: 490, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: '#fff', padding: '10px 32px 10px 14px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <MIcon name="thermo" size={70} f={f} />
          <Txt size={40} color={C.navy}>{f >= aSeb ? 'Demam ≤ 1 bulan selepas banjir?' : 'Demam…'}</Txt>
        </div>
      </Pop>
      <Pop at={aJan} style={{left: 0, width: 1080, top: 640, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Jangan tunggu" bg={C.labelPink} size={58} />
      </Pop>
      <Pop at={aPer} style={{left: 60, top: 790}} origin="left center">
        <Chip hicon="meter" text="Pergi ke klinik" w={520} bg={C.green} size={42} />
      </Pop>
      <Pop at={aBer} style={{left: 60, top: 940}} origin="left center">
        <Bubble size={40} bg={C.yellow}>"Saya terlibat dengan banjir."</Bubble>
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
  kerja: Kerja,
  simptom: Simptom,
  diagnosis: Diagnosis,
  apa: Apa,
  jangkitan: Jangkitan,
  tanda: Tanda,
  cegah: Cegah,
  pulih: Pulih,
  penutup: Penutup,
};

