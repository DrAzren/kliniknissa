import React from 'react';
import {AbsoluteFill, Img, interpolate, random, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset} from '../../components/Avatar';
import {Camera, clamp, Glow, NightSky, Pill, Pop, popScale, popOpacity} from '../../components/common';
import {WordsFile, wordTime} from '../../lib/timeline';

export type SceneProps = {preset: AvatarPreset; dur: number; wf: WordsFile; start: number; fps: number};

/* ---------- watak cerita (Amir ialah watak ilustrasi) ---------- */
export const AMIR: AvatarPreset = {
  id: 'amir', skin: '#CE9468', skinShade: '#B27A52', hair: 'short', hairColor: '#1C1824', top: 'tee', topColor: '#4FB8D8', topShade: '#3795B4', accessory: null,
};
const AYAH: AvatarPreset = {
  id: 'ayah', skin: '#C58A60', skinShade: '#A9714B', hair: 'short-grey', hairColor: '#CFCBD8', top: 'kemeja', topColor: '#8A5A3C', topShade: '#6E452C', accessory: 'glasses', glassesColor: '#3A2E2A', moustache: true,
};
const SITI: AvatarPreset = {
  id: 'siti', skin: '#E3AF88', skinShade: '#C99069', hair: 'hijab', hairColor: '#2A1C24', top: 'blouse', topColor: '#F4E4C9', topShade: '#D8C29E', hijabColor: '#2BB3A3', hijabShade: '#1F8A7E', accessory: null,
};
const PEROKOK: AvatarPreset = {
  id: 'perokok', skin: '#C08660', skinShade: '#A46E4A', hair: 'short', hairColor: '#24202B', top: 'kemeja', topColor: '#5B6577', topShade: '#454E5E', accessory: null, stubble: true,
};

// frame (relatif babak) bagi perkataan pertama frasa, selepas permulaan babak
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

const Ilustrasi: React.FC = () => (
  <div style={{position: 'absolute', left: 40, top: 1700}}>
    <Pill text="Kisah ilustrasi" bg="rgba(18,11,51,0.65)" color={C.violet[4]} size={28} />
  </div>
);

const SHADOW = '0 14px 34px rgba(18,11,51,.5)';
const RED = '#F0566E';

/* ---------- ikon flat ---------- */
type IconName =
  | 'lungs' | 'inhaler' | 'cig' | 'nosmoke' | 'dust' | 'family' | 'scale' | 'calendar' | 'moon' | 'check' | 'cross' | 'whatsapp'
  | 'cough' | 'wheeze' | 'talk' | 'sneeze' | 'skin' | 'smoke' | 'siren' | 'breath';
export const Icon: React.FC<{name: IconName; size?: number; f?: number}> = ({name, size = 120, f = 0}) => {
  const y = C.yellow, pk = C.labelPink, nv = C.navy, g = C.green, w = '#fff';
  const body = (() => {
    switch (name) {
      case 'lungs':
        return (
          <g>
            <rect x={54} y={6} width={12} height={46} rx={6} fill={w} />
            <path d="M 60 44 Q 44 44 40 56 M 60 44 Q 76 44 80 56" stroke={w} strokeWidth={9} fill="none" strokeLinecap="round" />
            <path d="M 46 36 Q 14 40 8 84 Q 4 112 26 110 Q 50 106 52 84 L 52 44 Q 52 36 46 36 Z" fill="#F58AAE" />
            <path d="M 74 36 Q 106 40 112 84 Q 116 112 94 110 Q 70 106 68 84 L 68 44 Q 68 36 74 36 Z" fill="#F58AAE" />
            <path d="M 40 62 Q 28 70 24 90 M 80 62 Q 92 70 96 90" stroke="#D9628C" strokeWidth={6} fill="none" strokeLinecap="round" />
          </g>
        );
      case 'inhaler':
        return (
          <g>
            <rect x={44} y={6} width={34} height={44} rx={8} fill="#C9CEDA" />
            <path d="M 36 34 L 86 34 L 86 100 Q 86 112 74 112 L 22 112 Q 12 112 12 102 L 12 92 Q 12 82 22 82 L 36 82 Z" fill="#4FB8D8" />
            <rect x={36} y={34} width={50} height={14} fill="#3795B4" />
            <rect x={12} y={88} width={12} height={18} rx={4} fill={nv} />
            {[0, 1, 2].map((i) => <circle key={i} cx={-2 - i * 12} cy={97 + Math.sin(f / 4 + i) * 6} r={5 - i} fill={w} opacity={0.75 - i * 0.2} />)}
          </g>
        );
      case 'cig':
        return (
          <g>
            <rect x={8} y={72} width={78} height={20} rx={5} fill={w} />
            <rect x={8} y={72} width={24} height={20} rx={5} fill="#E9A04B" />
            <rect x={86} y={72} width={14} height={20} rx={4} fill={RED} />
            {[0, 1].map((i) => <path key={i} d={`M ${92 + i * 14} 62 q 12 -12 0 -24 q -12 -12 0 -24`} stroke="#C9C4E2" strokeWidth={7} fill="none" strokeLinecap="round" opacity={0.45 + 0.5 * Math.abs(Math.sin(f / 8 + i))} />)}
          </g>
        );
      case 'nosmoke':
        return (
          <g>
            <circle cx={60} cy={60} r={50} fill={w} />
            <rect x={24} y={52} width={56} height={16} rx={4} fill={nv} />
            <rect x={80} y={52} width={12} height={16} rx={3} fill="#E9A04B" />
            <circle cx={60} cy={60} r={46} fill="none" stroke={RED} strokeWidth={11} />
            <path d="M 28 92 L 92 28" stroke={RED} strokeWidth={11} strokeLinecap="round" />
          </g>
        );
      case 'dust':
        return (
          <g>
            {[[30, 40, 16], [78, 30, 11], [56, 70, 20], [94, 78, 13], [24, 90, 10], [70, 104, 8]].map(([cx, cy, r], i) => (
              <circle key={i} cx={cx + Math.sin(f / 9 + i) * 4} cy={cy + Math.cos(f / 11 + i) * 4} r={r} fill={i % 2 ? '#C9C4E2' : '#A79FD0'} opacity={0.9} />
            ))}
          </g>
        );
      case 'family':
        return (
          <g fill={w}>
            <circle cx={36} cy={34} r={18} />
            <path d="M 8 104 Q 8 58 36 58 Q 64 58 64 104 Z" />
            <circle cx={86} cy={56} r={14} fill={y} />
            <path d="M 64 106 Q 64 74 86 74 Q 108 74 108 106 Z" fill={y} />
          </g>
        );
      case 'scale':
        return (
          <g>
            <rect x={10} y={22} width={100} height={88} rx={22} fill={w} />
            <path d="M 30 62 A 30 30 0 0 1 90 62 Z" fill={nv} />
            <path d={`M 60 60 L ${60 + Math.sin(0.9 + Math.sin(f / 6) * 0.12) * 24} ${60 - Math.cos(0.9 + Math.sin(f / 6) * 0.12) * 24}`} stroke={RED} strokeWidth={6} strokeLinecap="round" />
            <circle cx={60} cy={60} r={5} fill={RED} />
          </g>
        );
      case 'calendar':
        return (
          <g>
            <rect x={12} y={20} width={96} height={90} rx={16} fill={w} />
            <path d="M 12 46 L 12 36 Q 12 20 28 20 L 92 20 Q 108 20 108 36 L 108 46 Z" fill={pk} />
            <rect x={32} y={8} width={10} height={24} rx={5} fill={nv} />
            <rect x={78} y={8} width={10} height={24} rx={5} fill={nv} />
            <path d="M 40 76 L 54 90 L 82 62" stroke={g} strokeWidth={11} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      case 'moon':
        return <path d="M 78 16 A 44 44 0 1 0 104 88 A 38 38 0 1 1 78 16 Z" fill={y} />;
      case 'check':
        return (
          <g>
            <circle cx={60} cy={60} r={50} fill={g} />
            <path d="M 34 62 L 52 80 L 86 42" stroke={w} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      case 'cross':
        return (
          <g>
            <rect x={8} y={8} width={104} height={104} rx={24} fill={w} />
            <rect x={46} y={22} width={28} height={76} rx={6} fill={RED} />
            <rect x={22} y={46} width={76} height={28} rx={6} fill={RED} />
          </g>
        );
      case 'whatsapp':
        return (
          <g>
            <path d="M 60 8 C 30 8 8 30 8 58 C 8 70 12 80 18 88 L 12 112 L 36 104 C 44 108 52 110 60 110 C 90 110 112 88 112 58 C 112 30 90 8 60 8 Z" fill={g} />
            <path d="M 44 34 C 48 34 50 36 52 40 L 56 50 C 57 53 56 55 54 57 L 51 60 C 55 68 61 74 69 78 L 72 75 C 74 73 77 72 79 73 L 89 77 C 92 79 93 81 92 84 C 90 92 83 96 75 95 C 55 92 39 76 36 56 C 35 46 38 36 44 34 Z" fill={w} />
          </g>
        );
      case 'cough':
        return (
          <g>
            <circle cx={44} cy={54} r={34} fill="#E3AF88" />
            <ellipse cx={66} cy={66} rx={9} ry={11} fill={nv} />
            <circle cx={50} cy={44} r={5} fill={nv} />
            {[0, 1, 2].map((i) => <path key={i} d={`M ${86 + i * 10} ${52 - i * 8} L ${100 + i * 10} ${46 - i * 12}`} stroke={y} strokeWidth={7} strokeLinecap="round" opacity={0.4 + 0.6 * Math.abs(Math.sin(f / 3 + i))} transform={`rotate(${i * 22} 80 66)`} />)}
          </g>
        );
      case 'wheeze':
        return (
          <g fill="none" stroke={y} strokeWidth={9} strokeLinecap="round">
            {[0, 1, 2].map((i) => <path key={i} d={`M 10 ${32 + i * 28} q 16 -18 32 0 t 32 0 t 32 0`} opacity={0.4 + 0.6 * Math.abs(Math.sin(f / 5 - i))} />)}
          </g>
        );
      case 'breath':
        return (
          <g>
            <circle cx={60} cy={60} r={48} fill="#7FA6E8" />
            <circle cx={44} cy={50} r={8} fill={w} />
            <circle cx={76} cy={50} r={8} fill={w} />
            <circle cx={44} cy={50} r={4} fill={nv} />
            <circle cx={76} cy={50} r={4} fill={nv} />
            <ellipse cx={60} cy={82} rx={11 + Math.sin(f / 3) * 2} ry={13 + Math.sin(f / 3) * 3} fill={nv} />
          </g>
        );
      case 'talk':
        return (
          <g>
            <path d="M 14 22 Q 14 10 26 10 L 94 10 Q 106 10 106 22 L 106 66 Q 106 78 94 78 L 58 78 L 34 104 L 38 78 L 26 78 Q 14 78 14 66 Z" fill={w} />
            {[0, 1, 2].map((i) => <circle key={i} cx={40 + i * 20} cy={44} r={7} fill={nv} opacity={i === 0 ? 1 : 0.25} />)}
            <path d="M 80 96 L 108 116 M 108 96 L 80 116" stroke={RED} strokeWidth={9} strokeLinecap="round" />
          </g>
        );
      case 'sneeze':
        return (
          <g>
            <path d="M 54 10 Q 50 50 30 76 Q 22 92 40 98 Q 54 104 64 96 Q 76 104 90 96 Q 102 86 88 72 Q 74 48 74 10 Z" fill="#E3AF88" />
            <ellipse cx={46} cy={88} rx={8} ry={5} fill="#C99069" />
            <ellipse cx={80} cy={88} rx={8} ry={5} fill="#C99069" />
            <ellipse cx={46} cy={104 + (f % 20) * 0.6} rx={5} ry={8} fill="#8EC9FF" />
          </g>
        );
      case 'skin':
        return (
          <g>
            <rect x={14} y={30} width={92} height={60} rx={30} fill="#E3AF88" />
            {[[40, 52, 9], [62, 66, 11], [80, 50, 8], [52, 74, 6]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={RED} opacity={0.75} />)}
          </g>
        );
      case 'smoke':
        return (
          <g fill="none" stroke="#C9C4E2" strokeWidth={10} strokeLinecap="round">
            {[0, 1, 2].map((i) => <path key={i} d={`M ${30 + i * 30} 110 q 16 -18 0 -36 q -16 -18 0 -36 q 16 -18 0 -30`} opacity={0.5 + 0.5 * Math.abs(Math.sin(f / 8 + i))} />)}
          </g>
        );
      case 'siren':
        return (
          <g>
            <path d="M 28 86 L 28 58 Q 28 26 60 26 Q 92 26 92 58 L 92 86 Z" fill={RED} />
            <rect x={16} y={84} width={88} height={22} rx={8} fill={w} />
            {[-50, 0, 50].map((a, i) => <rect key={i} x={56} y={0} width={8} height={18} rx={4} fill={y} transform={`rotate(${a} 60 60)`} opacity={0.4 + 0.6 * Math.abs(Math.sin(f / 3 + i))} />)}
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

/* kad: ikon + teks */
const Sym: React.FC<{icon: IconName; text: React.ReactNode; bg?: string; color?: string; w?: number; f?: number; size?: number}> = ({icon, text, bg = C.navy, color = '#fff', w = 520, f = 0, size = 42}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 20, width: w, background: bg, borderRadius: 34, padding: '16px 26px 16px 18px', boxShadow: SHADOW}}>
    <div style={{width: 92, height: 92, borderRadius: 26, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
      <Icon name={icon} size={76} f={f} />
    </div>
    <Txt size={size} color={color}>{text}</Txt>
  </div>
);

const Bubble: React.FC<{children: React.ReactNode; tail?: 'left' | 'right'; bg?: string; color?: string; size?: number}> = ({children, tail = 'left', bg = '#fff', color = C.navy, size = 46}) => (
  <div style={{position: 'relative', background: bg, color, borderRadius: 40, padding: `${size * 0.45}px ${size * 0.7}px`, fontFamily: FONT, fontWeight: 800, fontSize: size, lineHeight: 1.12, boxShadow: SHADOW, whiteSpace: 'nowrap'}}>
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

/* bilik tidur malam: tingkap + bulan, jam digital, katil */
const Bedroom: React.FC<{f: number; clock?: boolean}> = ({f, clock = true}) => (
  <>
    <Room wall={`linear-gradient(180deg, ${C.night[0]} 0%, ${C.night[3]} 100%)`} floor={C.night[1]} floorY={1380} />
    <div style={{position: 'absolute', left: 640, top: 470, width: 360, height: 380, borderRadius: 30, overflow: 'hidden', background: '#141040', border: `18px solid ${C.night[0]}`}}>
      <div style={{position: 'absolute', left: 190, top: 50, width: 110, height: 110, borderRadius: 55, background: '#F4F1FF', boxShadow: '0 0 60px #fff'}} />
      {new Array(10).fill(0).map((_, i) => (
        <div key={i} style={{position: 'absolute', left: random(`bw${i}`) * 320, top: random(`bh${i}`) * 340, width: 6, height: 6, borderRadius: 3, background: '#fff', opacity: 0.4 + 0.6 * Math.abs(Math.sin(f / 10 + i))}} />
      ))}
      <div style={{position: 'absolute', left: 152, top: 0, width: 20, height: 380, background: C.night[0]}} />
    </div>
    {clock ? (
      <div style={{position: 'absolute', left: 70, top: 1010, width: 250, height: 110, borderRadius: 24, background: '#0E0930', border: `6px solid ${C.violet[0]}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 40px ${RED}55`}}>
        <Txt size={64} color={RED} style={{letterSpacing: 2, opacity: 0.75 + 0.25 * Math.sin(f / 8)}}>
          2<span style={{opacity: f % 30 < 15 ? 1 : 0.2}}>:</span>00
        </Txt>
      </div>
    ) : null}
    {clock ? <div style={{position: 'absolute', left: 50, top: 1120, width: 290, height: 270, borderRadius: '16px 16px 0 0', background: C.violet[0]}} /> : null}
  </>
);

/* gelombang "wisel" keluar dari mulut */
const WheezeLines: React.FC<{x: number; y: number; f: number; from: number; color?: string}> = ({x, y, f, from, color = C.yellow}) => {
  if (f < from) return null;
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      {[0, 1, 2].map((i) => {
        const ph = ((f - from) * 2.2 + i * 34) % 100;
        const dx = ph * 2.6;
        return (
          <path key={i} d={`M ${x + dx} ${y - 30 + i * 30} q 14 -16 28 0 t 28 0 t 28 0`} stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" opacity={interpolate(ph, [0, 15, 75, 100], [0, 0.95, 0.6, 0])} />
        );
      })}
    </svg>
  );
};

/* ================= 0 — Intro: pukul 2 pagi, Amir terjaga, dada ketat, nafas berbunyi ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aAmir = at(p, 'Amir', 1.6);
  const aJaga = at(p, 'terjaga', 3.4);
  const aKetat = at(p, 'ketat', 5.6);
  const aBunyi = at(p, 'berbunyi', 6.8);
  const titleOut = interpolate(f, [aAmir - 4, aAmir + 6], [1, 0], clamp);
  const up = interpolate(f, [aJaga - 3, aJaga + 7], [0, 1], clamp);
  const pulse = f >= aKetat ? 0.5 + 0.5 * Math.sin((f - aKetat) / 2.6) : 0;
  return (
    <Camera dur={p.dur} to={1.09} panY={-20}>
      <Bedroom f={f} />
      {/* katil */}
      <div style={{position: 'absolute', left: 330, top: 1040, width: 760, height: 360, borderRadius: '50px 0 0 30px', background: C.violet[0]}} />
      <div style={{position: 'absolute', left: 380, top: 1190, width: 260, height: 130, borderRadius: 50, background: '#fff', opacity: 0.92}} />
      {/* Amir: baring -> duduk terjaga */}
      <div style={{position: 'absolute', left: 430, top: 800 + (1 - up) * 190, transform: `rotate(${(1 - up) * -72}deg)`, transformOrigin: '50% 80%'}}>
        <Avatar preset={AMIR} width={480} mood={up < 0.5 ? 'tired' : 'shock'} pose={f >= aKetat ? 'clasp' : 'down'} seed={2} style={{transform: f >= aKetat ? `translateY(${Math.sin(f / 2.2) * 4}px)` : undefined}} />
      </div>
      {/* selimut */}
      <div style={{position: 'absolute', left: 360, top: 1330, width: 720, height: 240, borderRadius: '90px 0 0 30px', background: C.pink[0]}} />
      <div style={{position: 'absolute', left: 360, top: 1330, width: 720, height: 60, borderRadius: '90px 0 0 0', background: '#F08AB8'}} />
      {up < 0.5 ? <Txt size={66} color={C.violet[4]} style={{position: 'absolute', left: 560, top: 960 - (f % 40), opacity: interpolate(f % 40, [0, 10, 30, 40], [0, 1, 1, 0])}}>z z</Txt> : null}
      {/* dada ketat: denyut merah */}
      {f >= aKetat ? <Glow x={670} y={1250} r={150 + pulse * 40} color={RED} opacity={0.35 + pulse * 0.35} /> : null}
      <Pop at={aKetat} style={{left: 60, top: 760}}>
        <Pill text="Dada ketat" bg={RED} size={50} />
      </Pop>
      <WheezeLines x={760} y={1090} f={f} from={aBunyi} />
      <Pop at={aBunyi} style={{left: 620, top: 900}}>
        <Bubble tail="left" size={44} bg={C.yellow}>
          wiii… wiii…
        </Bubble>
      </Pop>
      {/* tajuk (kelihatan pada frame 0) */}
      <div style={{position: 'absolute', top: 480, width: 1080, textAlign: 'center', opacity: titleOut, transform: `translateY(${(1 - titleOut) * -30}px)`}}>
        <div style={{position: 'absolute', left: 60, top: -40, width: 960, height: 420, borderRadius: 60, background: 'rgba(18,11,51,0.6)'}} />
        <div style={{position: 'relative'}}>
          <Txt size={62} color={C.violet[4]}>KENALI</Txt>
          <Txt size={170} color={C.yellow} style={{lineHeight: 1, textShadow: '0 8px 0 rgba(18,11,51,.6)'}}>ASMA</Txt>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: 18}}>
            <Pill text="Sesak nafas tengah malam?" bg={C.labelPink} size={50} />
          </div>
        </div>
      </div>
      {f >= aAmir ? <Ilustrasi /> : null}
    </Camera>
  );
};

/* ================= 1 — Cuba tarik nafas, udara tak cukup ================= */
export const Sesak: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTarik = at(p, 'tarik', 0.8);
  const aUdara = at(p, 'udara', 2.6);
  const aCukup = at(p, 'tak cukup', 3.4);
  const heave = Math.sin(f / 3.2) * 10;
  return (
    <Camera dur={p.dur} to={1.12} origin="50% 60%">
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[0]} 0%, ${C.night[2]} 60%, #4A1C4E 100%)`}} />
      <Glow x={540} y={1150} r={600} color={RED} opacity={0.18 + 0.12 * Math.sin(f / 3.2)} />
      {/* zarah udara yang cuba masuk tapi berpatah balik */}
      {new Array(12).fill(0).map((_, i) => {
        const ph = ((f * 1.6 + i * 23) % 90) / 90;
        const ang = (i / 12) * Math.PI * 2;
        const far = 520, near = 250;
        const r = ph < 0.6 ? far - (far - near) * (ph / 0.6) : near + (far - near) * ((ph - 0.6) / 0.4) * 0.6;
        return <div key={i} style={{position: 'absolute', left: 540 + Math.cos(ang) * r - 11, top: 1130 + Math.sin(ang) * r * 0.8 - 11, width: 22, height: 22, borderRadius: 11, background: '#9EC3FF', opacity: interpolate(ph, [0, 0.15, 0.6, 1], [0, 0.85, 0.85, 0]), boxShadow: '0 0 14px #9EC3FF'}} />;
      })}
      <Who preset={AMIR} x={220} y={880 + heave} w={640} mood="shock" pose="clasp" seed={2} />
      {/* titis peluh */}
      {[0, 1].map((i) => {
        const ff = (f + i * 18) % 36;
        return <div key={i} style={{position: 'absolute', left: [330, 720][i], top: 1010 + ff * 2.4, width: 26, height: 38, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: '#8EC9FF', opacity: interpolate(ff, [0, 6, 28, 36], [0, 1, 1, 0])}} />;
      })}
      <Pop at={aTarik} style={{left: 70, top: 520}}>
        <Sym icon="breath" text="Tarik nafas dalam-dalam" bg={C.violet[0]} w={640} f={f} size={40} />
      </Pop>
      <Pop at={aUdara} style={{left: 0, width: 1080, top: 680, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: f >= aCukup ? RED : C.navy, padding: '16px 40px', borderRadius: 50, boxShadow: SHADOW, transform: `rotate(-3deg)`}}>
          <Txt size={56}>Udara tak cukup!</Txt>
        </div>
      </Pop>
      <Ilustrasi />
    </Camera>
  );
};

/* ================= 2 — Dikejarkan ke hospital; doktor: serangan asma ================= */
const Ambulance: React.FC<{f: number}> = ({f}) => (
  <svg width={520} height={300} viewBox="0 0 520 300" style={{overflow: 'visible'}}>
    <rect x={10} y={40} width={330} height={190} rx={22} fill="#fff" />
    <path d="M 340 90 L 430 90 Q 452 90 464 110 L 500 170 Q 508 184 508 200 L 508 230 L 340 230 Z" fill="#fff" />
    <path d="M 362 110 L 426 110 Q 438 110 446 124 L 472 168 L 362 168 Z" fill="#9EC3FF" />
    <rect x={10} y={150} width={498} height={26} fill={RED} />
    <rect x={150} y={70} width={30} height={70} rx={5} fill={RED} />
    <rect x={130} y={90} width={70} height={30} rx={5} fill={RED} />
    <rect x={250} y={12} width={50} height={30} rx={10} fill={f % 10 < 5 ? RED : '#6FA8FF'} />
    <circle cx={110} cy={236} r={44} fill="#221A3D" />
    <circle cx={110} cy={236} r={18} fill="#C9CEDA" />
    <circle cx={410} cy={236} r={44} fill="#221A3D" />
    <circle cx={410} cy={236} r={18} fill="#C9CEDA" />
  </svg>
);
export const Hospital: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aDok = at(p, 'Doktor', 3.1);
  const aSer = at(p, 'serangan', 4.1);
  const ax = interpolate(f, [0, Math.max(10, aDok - 6)], [-560, 300], clamp);
  const cut = f >= aDok;
  if (!cut) {
    return (
      <Camera dur={p.dur} to={1.06}>
        <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[0]} 0%, ${C.night[3]} 100%)`}} />
        <NightSky seed={5} glow={C.violet[2]} top="transparent" bottom="transparent" stars={40} />
        {/* hospital */}
        <div style={{position: 'absolute', left: 520, top: 620, width: 520, height: 800, background: C.violet[0], borderRadius: '24px 24px 0 0'}} />
        <div style={{position: 'absolute', left: 660, top: 520, width: 240, height: 120, borderRadius: 20, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 50px #ffffff55'}}>
          <Txt size={50} color={RED}>HOSPITAL</Txt>
        </div>
        {new Array(12).fill(0).map((_, i) => (
          <div key={i} style={{position: 'absolute', left: 570 + (i % 3) * 150, top: 700 + Math.floor(i / 3) * 140, width: 100, height: 90, borderRadius: 12, background: random(`hw${i}`) > 0.4 ? C.yellow : C.night[3], opacity: 0.9}} />
        ))}
        <div style={{position: 'absolute', left: 700, top: 1250, width: 160, height: 170, borderRadius: '14px 14px 0 0', background: '#9EC3FF'}} />
        {/* jalan */}
        <div style={{position: 'absolute', left: 0, top: 1420, width: 1080, height: 500, background: C.night[1]}} />
        {new Array(6).fill(0).map((_, i) => (
          <div key={i} style={{position: 'absolute', left: ((i * 220 - f * 14) % 1320 + 1320) % 1320 - 120, top: 1540, width: 120, height: 16, borderRadius: 8, background: '#fff', opacity: 0.5}} />
        ))}
        {/* cahaya siren */}
        <Glow x={ax + 275} y={1200} r={300} color={f % 10 < 5 ? RED : '#6FA8FF'} opacity={0.45} />
        <div style={{position: 'absolute', left: ax, top: 1180 + Math.sin(f / 2) * 3}}>
          <Ambulance f={f} />
        </div>
        <Pop at={4} style={{left: 40, top: 860}}>
          <Sym icon="siren" text={<>Dikejarkan<br />ke hospital</>} bg={RED} w={440} f={f} size={38} />
        </Pop>
        <Ilustrasi />
      </Camera>
    );
  }
  const g = f - aDok;
  return (
    <Camera dur={p.dur} to={1.06}>
      <Room wall={`linear-gradient(180deg, ${C.night[3]} 0%, ${C.violet[2]} 100%)`} floor={C.night[1]} floorY={1440} />
      <Glow x={540} y={1050} r={480} color={C.violet[3]} opacity={0.35} />
      {/* katil hospital + Amir dengan topeng oksigen */}
      <div style={{position: 'absolute', left: 520, top: 1260, width: 560, height: 200, borderRadius: '30px 0 0 20px', background: '#E8E4FF'}} />
      <Who preset={AMIR} x={590} y={930} w={430} mood="tired" pose="down" seed={2} />
      <div style={{position: 'absolute', left: 757, top: 1150, width: 96, height: 76, borderRadius: '40px 40px 50px 50px', background: '#CFE8FF', opacity: 0.85, border: '5px solid #9EC3FF'}} />
      <div style={{position: 'absolute', left: 560, top: 1320, width: 520, height: 150, borderRadius: '60px 0 0 20px', background: '#9EC3FF'}} />
      <Who preset={p.preset} x={10} y={860} w={540} mood="curious" pose="point" />
      <Pop at={Math.max(0, aSer - aDok) + aDok} style={{left: 110, top: 520}}>
        <div style={{background: C.yellow, borderRadius: 50, padding: '22px 44px', boxShadow: SHADOW, transform: `rotate(-3deg) scale(${1 + 0.03 * Math.sin(g / 4)})`}}>
          <Txt size={38} color={C.navy}>Doktor kata…</Txt>
          <Txt size={84} color={C.navy} style={{lineHeight: 1.02}}>SERANGAN ASMA</Txt>
        </div>
      </Pop>
      <Ilustrasi />
    </Camera>
  );
};

/* ================= 3 — Apa itu asma? Radang kronik saluran pernafasan ================= */
const BigLungs: React.FC<{f: number; inflamed?: number}> = ({f, inflamed = 0}) => {
  const br = 1 + Math.sin(f / 9) * 0.03;
  return (
    <svg width={520} height={520} viewBox="0 0 120 120" style={{overflow: 'visible', transform: `scale(${br})`}}>
      <rect x={54} y={2} width={12} height={46} rx={6} fill="#F6D9E4" />
      <path d="M 46 32 Q 14 36 8 84 Q 4 114 26 112 Q 50 108 52 84 L 52 42 Q 52 32 46 32 Z" fill="#F58AAE" />
      <path d="M 74 32 Q 106 36 112 84 Q 116 114 94 112 Q 70 108 68 84 L 68 42 Q 68 32 74 32 Z" fill="#F58AAE" />
      <g stroke={inflamed > 0.5 ? RED : '#fff'} strokeWidth={5.5} fill="none" strokeLinecap="round">
        <path d="M 60 44 Q 44 46 38 60 Q 30 72 26 92" />
        <path d="M 38 60 Q 46 70 44 88" />
        <path d="M 60 44 Q 76 46 82 60 Q 90 72 94 92" />
        <path d="M 82 60 Q 74 70 76 88" />
      </g>
      {inflamed > 0 ? <g opacity={inflamed * (0.45 + 0.25 * Math.sin(f / 4))}><circle cx={34} cy={72} r={22} fill={RED} /><circle cx={86} cy={72} r={22} fill={RED} /></g> : null}
    </svg>
  );
};
export const Apa: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aRadang = at(p, 'radang', 2.2);
  const aSaluran = at(p, 'saluran', 3.6);
  const infl = interpolate(f, [aRadang, aRadang + 10], [0, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <NightSky seed={13} glow={C.violet[2]} />
      <Pop at={2} style={{left: 0, width: 1080, top: 520, display: 'flex', justifyContent: 'center'}}>
        <div style={{background: C.navy, borderRadius: 44, padding: '20px 54px', textAlign: 'center', boxShadow: '0 20px 50px rgba(18,11,51,.55)'}}>
          <Txt size={54} color={C.violet[4]}>APA ITU</Txt>
          <Txt size={120} color={C.yellow} style={{lineHeight: 1}}>ASMA?</Txt>
        </div>
      </Pop>
      <div style={{position: 'absolute', left: 500, top: 850}}>
        <BigLungs f={f} inflamed={infl} />
      </div>
      <Pop at={aRadang} style={{left: 520, top: 800}}>
        <Pill text="Radang kronik" bg={RED} size={50} />
      </Pop>
      <Pop at={aSaluran} style={{left: 500, top: 1390}}>
        <Pill text="Saluran pernafasan" bg={C.green} size={46} />
      </Pop>
      <Who preset={p.preset} x={-30} y={1020} w={560} mood="happy" pose={f < aRadang ? 'wave' : 'point'} />
    </Camera>
  );
};

/* ================= 4 — Saluran membengkak, menyempit, berkahak ================= */
const Airway: React.FC<{size: number; swell: number; narrow: number; mucus: number; f: number}> = ({size, swell, narrow, mucus, f}) => {
  const R = 100;
  const wall = 22 + swell * 20;
  const squeeze = narrow * 16;
  const lumen = R - 14 - wall - squeeze;
  return (
    <svg width={size} height={size} viewBox="-110 -110 220 220" style={{overflow: 'visible'}}>
      {/* otot */}
      <circle r={R - squeeze * 0.4} fill="#C2456E" />
      {new Array(14).fill(0).map((_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const rr = R - squeeze * 0.4 - 7;
        return <circle key={i} cx={Math.cos(a) * rr} cy={Math.sin(a) * rr} r={4} fill="#9C2F55" />;
      })}
      {/* dinding (bengkak = lebih tebal & merah) */}
      <circle r={R - 14 - squeeze * 0.7} fill={swell > 0.3 ? `rgb(${246 - swell * 6}, ${150 - swell * 60}, ${178 - swell * 60})` : '#F6B7CF'} />
      {/* lumen */}
      <circle r={Math.max(12, lumen)} fill="#1A1038" />
      {/* kahak */}
      {mucus > 0
        ? new Array(7).fill(0).map((_, i) => {
            const a = (i / 7) * Math.PI * 2 + 0.4;
            const rr = Math.max(12, lumen) - 4;
            return <circle key={i} cx={Math.cos(a) * rr} cy={Math.sin(a) * rr} r={(9 + (i % 3) * 4) * mucus + Math.sin(f / 6 + i) * 1.2} fill="#E6D36A" />;
          })
        : null}
      {/* aliran udara */}
      {new Array(5).fill(0).map((_, i) => {
        const ph = ((f * 2 + i * 20) % 100) / 100;
        const maxR = Math.max(6, lumen - 14);
        const a = (i / 5) * Math.PI * 2;
        const count = narrow > 0.5 ? 2 : 5;
        if (i >= count) return null;
        return <circle key={`a${i}`} cx={Math.cos(a) * maxR * 0.5} cy={Math.sin(a) * maxR * 0.5} r={3 + ph * 5} fill="#9EC3FF" opacity={1 - ph} />;
      })}
    </svg>
  );
};
export const Saluran: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aBengkak = at(p, 'membengkak', 1.8);
  const aSempit = at(p, 'menyempit', 2.9);
  const aKahak = at(p, 'kahak', 4.4);
  const swell = interpolate(f, [aBengkak, aBengkak + 14], [0, 1], clamp);
  const narrow = interpolate(f, [aSempit, aSempit + 14], [0, 1], clamp);
  const mucus = interpolate(f, [aKahak - 2, aKahak + 12], [0, 1], clamp);
  const steps: {a: number; text: string; bg: string}[] = [
    {a: aBengkak, text: 'Membengkak', bg: RED},
    {a: aSempit, text: 'Menyempit', bg: C.labelPink},
    {a: aKahak, text: 'Penuh kahak', bg: '#B59B1F'},
  ];
  return (
    <Camera dur={p.dur} to={1.06} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 70%, ${C.pink[2]} 100%)`}} />
      <Glow x={730} y={900} r={420} color={RED} opacity={0.12 + swell * 0.2} />
      {/* normal */}
      <div style={{position: 'absolute', left: 60, top: 560, width: 400, textAlign: 'center'}}>
        <Pill text="Saluran normal" bg={C.green} size={38} style={{display: 'inline-block'}} />
        <div style={{marginTop: 26}}>
          <Airway size={380} swell={0} narrow={0} mucus={0} f={f} />
        </div>
      </div>
      {/* semasa serangan */}
      <div style={{position: 'absolute', left: 560, top: 560, width: 460, textAlign: 'center'}}>
        <Pill text="Semasa serangan" bg={RED} size={38} style={{display: 'inline-block'}} />
        <div style={{marginTop: 26, transform: `scale(${1 + 0.02 * Math.sin(f / 3) * swell})`}}>
          <Airway size={440} swell={swell} narrow={narrow} mucus={mucus} f={f} />
        </div>
      </div>
      <Txt size={64} color={C.yellow} style={{position: 'absolute', left: 470, top: 780}}>→</Txt>
      {steps.map((s, i) => (
        <Pop key={i} at={s.a} style={{left: 60 + i * 330, top: 1130}}>
          <div style={{width: 310, background: s.bg, borderRadius: 34, padding: '18px 0', textAlign: 'center', boxShadow: SHADOW}}>
            <Txt size={30} color="rgba(255,255,255,.8)">{i + 1}</Txt>
            <Txt size={36}>{s.text}</Txt>
          </div>
        </Pop>
      ))}
      <Who preset={p.preset} x={300} y={1280} w={480} mood="neutral" pose="clasp" />
    </Camera>
  );
};

/* ================= 5 — Simptom: sesak, berbunyi, batuk, terutama malam ================= */
export const Simptom: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const items: {icon: IconName; text: string; a: number; bg: string}[] = [
    {icon: 'breath', text: 'Sesak nafas', a: at(p, 'sesak', 1.2), bg: C.navy},
    {icon: 'wheeze', text: 'Nafas berbunyi', a: at(p, 'berbunyi', 1.9), bg: C.violet[0]},
    {icon: 'cough', text: 'Batuk', a: at(p, 'batuk', 2.8), bg: C.navy},
  ];
  const aMalam = at(p, 'terutamanya', 3.6);
  return (
    <Camera dur={p.dur} to={1.07} panX={-12}>
      <Bedroom f={f} clock={false} />
      <Who preset={AMIR} x={10} y={920} w={500} mood="sad" pose="clasp" seed={2} style={{transform: `translateY(${Math.sin(f / 3) * 5}px)`}} />
      <WheezeLines x={330} y={1200} f={f} from={items[1].a} />
      {items.map((it, i) => (
        <Pop key={i} at={it.a} style={{left: 500, top: 900 + i * 140}}>
          <Sym icon={it.icon} text={it.text} w={520} bg={it.bg} f={f} />
        </Pop>
      ))}
      <Pop at={aMalam} style={{left: 60, top: 540}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: C.yellow, padding: '14px 36px 14px 18px', borderRadius: 50, boxShadow: SHADOW}}>
          <div style={{background: C.navy, borderRadius: 40, padding: 8}}>
            <Icon name="moon" size={70} />
          </div>
          <Txt size={46} color={C.navy}>Terutama waktu malam</Txt>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 6 — Siapa berisiko? 4 faktor ================= */
const FOUR: {icon: IconName; text: string}[] = [
  {icon: 'family', text: 'Keturunan'},
  {icon: 'sneeze', text: 'Alahan'},
  {icon: 'cig', text: 'Asap rokok'},
  {icon: 'scale', text: 'Berat'},
];
export const Risiko: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aEmpat = at(p, 'empat', 2.4);
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <NightSky seed={19} glow={C.pink[0]} />
      <Pop at={2} style={{left: 0, width: 1080, top: 520, display: 'flex', justifyContent: 'center'}}>
        <div style={{background: C.navy, borderRadius: 44, padding: '22px 50px', textAlign: 'center', boxShadow: '0 20px 50px rgba(18,11,51,.55)'}}>
          <Txt size={58} color={C.violet[4]}>SIAPA YANG</Txt>
          <Txt size={104} color={C.yellow} style={{lineHeight: 1}}>BERISIKO?</Txt>
        </div>
      </Pop>
      {FOUR.map((d, i) => {
        const a = aEmpat + i * 5;
        if (f < a) return null;
        const ff = f - a;
        return (
          <div key={i} style={{position: 'absolute', left: 50 + i * 250, top: 850 + Math.sin(f / 8 + i) * 8, width: 230, textAlign: 'center', transform: `scale(${popScale(ff)})`, opacity: popOpacity(ff)}}>
            <div style={{width: 190, height: 190, margin: '0 auto', borderRadius: 95, background: i % 2 ? C.violet[0] : C.navy, border: `6px solid ${C.yellow}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: SHADOW}}>
              <Icon name={d.icon} size={118} f={f} />
            </div>
            <Txt size={36} style={{marginTop: 12}}>{d.text}</Txt>
          </div>
        );
      })}
      <Who preset={p.preset} x={250} y={1140} w={580} mood="curious" pose={f < aEmpat ? 'chin' : 'point'} />
    </Camera>
  );
};

/* ================= 7 — #1 Keturunan ================= */
export const Keturunan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aAhli = at(p, 'ahli', 1.6);
  const aAsma = at(p, 'asma', 3.0);
  const link = interpolate(f, [aAhli, aAhli + 14], [0, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.08} panX={-10}>
      <Room wall={`linear-gradient(180deg, ${C.night[2]} 0%, ${C.violet[0]} 100%)`} floor={C.night[1]} floorY={1420} />
      <Glow x={540} y={1000} r={480} color={C.violet[3]} opacity={0.3} />
      {/* bingkai gambar keluarga */}
      <div style={{position: 'absolute', left: 440, top: 700, width: 200, height: 150, borderRadius: 16, background: C.yellow, border: `10px solid ${C.navy}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Icon name="family" size={110} />
      </div>
      <Who preset={AYAH} x={30} y={900} w={470} mood="neutral" pose="clasp" seed={4} />
      <Who preset={AMIR} x={580} y={930} w={450} mood="curious" pose="down" seed={2} />
      {/* garis keturunan (paru-paru ayah -> anak) */}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <path d="M 300 1250 Q 540 1060 790 1270" stroke={C.yellow} strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray="4 26" strokeDashoffset={-f * 2} opacity={link} />
      </svg>
      <Pop at={aAhli} style={{left: 200, top: 1190}}>
        <div style={{background: C.navy, borderRadius: 60, padding: 12, border: `5px solid ${C.yellow}`}}>
          <Icon name="lungs" size={90} />
        </div>
      </Pop>
      <Pop at={aAsma} style={{left: 740, top: 1210}}>
        <div style={{background: C.navy, borderRadius: 60, padding: 12, border: `5px solid ${C.yellow}`}}>
          <Icon name="lungs" size={90} />
        </div>
      </Pop>
      <Pop at={aAhli} style={{left: 60, top: 520}}>
        <Sym icon="family" text="Ahli keluarga ada asma" bg={C.violet[0]} w={620} size={40} />
      </Pop>
    </Camera>
  );
};

/* ================= 8 — #2 Alahan: resdung, ekzema ================= */
export const Alahan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aRes = at(p, 'resdung', 1.9);
  const aEk = at(p, 'ekzema', 2.8);
  const sneeze = f >= aRes ? Math.max(0, Math.sin((f - aRes) / 5)) : 0;
  return (
    <Camera dur={p.dur} to={1.08} panX={12}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.night[4]} 100%)`}} />
      <Glow x={300} y={1100} r={460} color={C.green} opacity={0.2} />
      {/* debunga / habuk terapung */}
      {new Array(16).fill(0).map((_, i) => {
        const x = random(`px${i}`) * 1080 + Math.sin(f / 20 + i) * 30;
        const y = 500 + ((random(`py${i}`) * 900 + f * (1 + (i % 3) * 0.5)) % 900);
        const r = 8 + random(`pr${i}`) * 12;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: r * 2, height: r * 2, borderRadius: r, background: i % 2 ? C.yellow : '#C9C4E2', opacity: 0.4}} />;
      })}
      <Who preset={SITI} x={20} y={920 + sneeze * 14} w={520} mood={f >= aRes ? 'sad' : 'neutral'} pose="chin" seed={3} />
      <Pop at={aRes} style={{left: 520, top: 880}}>
        <Sym icon="sneeze" text={<>Resdung<br /><span style={{fontSize: 28, opacity: 0.8}}>bersin, hidung berair</span></>} bg={C.violet[0]} w={500} f={f} />
      </Pop>
      <Pop at={aEk} style={{left: 520, top: 1070}}>
        <Sym icon="skin" text={<>Ekzema<br /><span style={{fontSize: 28, opacity: 0.8}}>kulit gatal, merah</span></>} bg={C.labelPink} w={500} />
      </Pop>
      <Pop at={4} style={{left: 60, top: 520}}>
        <Pill text="Ada alahan" bg={C.yellow} color={C.navy} size={52} />
      </Pop>
    </Camera>
  );
};

/* ================= 9 — #3 Asap rokok ================= */
const SmokeCloud: React.FC<{x: number; y: number; f: number; drift: number; n?: number}> = ({x, y, f, drift, n = 7}) => (
  <>
    {new Array(n).fill(0).map((_, i) => {
      const ph = ((f * 1.3 + i * (100 / n)) % 100) / 100;
      const r = 30 + ph * 70;
      return <div key={i} style={{position: 'absolute', left: x + ph * drift - r + Math.sin(f / 9 + i) * 16, top: y - ph * 230 - r, width: r * 2, height: r * 2, borderRadius: r, background: '#C9C4E2', opacity: interpolate(ph, [0, 0.2, 1], [0, 0.42, 0]), filter: 'blur(6px)'}} />;
    })}
  </>
);
export const Rokok: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aMerokok = at(p, 'merokok', 2.2);
  const aLain = at(p, 'terhidu', 3.2);
  return (
    <Camera dur={p.dur} to={1.08} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[0]} 0%, #3A2A5A 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1440, width: 1080, height: 480, background: C.night[1]}} />
      <Who preset={PEROKOK} x={20} y={930} w={470} mood="neutral" pose="chin" seed={5} />
      {/* rokok di tangan */}
      <div style={{position: 'absolute', left: 300, top: 1150, transform: 'rotate(-18deg)'}}>
        <svg width={150} height={40} viewBox="0 0 150 40">
          <rect x={0} y={10} width={110} height={20} rx={5} fill="#fff" />
          <rect x={0} y={10} width={32} height={20} rx={5} fill="#E9A04B" />
          <rect x={110} y={10} width={18} height={20} rx={4} fill={RED} opacity={0.7 + 0.3 * Math.sin(f / 3)} />
        </svg>
      </div>
      <SmokeCloud x={440} y={1140} f={f} drift={330} />
      <Who preset={AMIR} x={590} y={950} w={450} mood={f >= aLain ? 'sad' : 'neutral'} pose={f >= aLain ? 'clasp' : 'down'} seed={2} style={{transform: f >= aLain ? `translateX(${Math.sin(f * 1.4) * 4}px)` : undefined}} />
      <Pop at={aMerokok} style={{left: 60, top: 520}}>
        <Sym icon="cig" text="Merokok" bg={C.violet[0]} w={400} f={f} />
      </Pop>
      <Pop at={aLain} style={{left: 440, top: 670}}>
        <Sym icon="smoke" text="Terhidu asap orang lain" bg={C.labelPink} w={590} f={f} size={38} />
      </Pop>
    </Camera>
  );
};

/* ================= 10 — #4 Berat badan berlebihan ================= */
export const Berat: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aBerat = at(p, 'berat', 0.7);
  const aLebih = at(p, 'berlebihan', 1.8);
  const needle = interpolate(f, [aBerat, aBerat + 16, aBerat + 22, aBerat + 28], [-1.1, 0.95, 0.75, 0.85], clamp) + (f > aBerat + 28 ? Math.sin(f / 5) * 0.03 : 0);
  return (
    <Camera dur={p.dur} to={1.08}>
      <NightSky seed={43} glow={C.violet[1]} />
      {/* penimbang besar */}
      <div style={{position: 'absolute', left: 290, top: 620}}>
        <svg width={500} height={500} viewBox="0 0 580 580">
          <rect x={20} y={40} width={540} height={520} rx={90} fill="#E8E4FF" />
          <rect x={50} y={70} width={480} height={460} rx={70} fill="#fff" />
          <path d="M 110 300 A 180 180 0 0 1 470 300 Z" fill={C.navy} />
          <path d="M 110 300 A 180 180 0 0 1 200 144 L 290 300 Z" fill={C.green} />
          <path d="M 200 144 A 180 180 0 0 1 380 144 L 290 300 Z" fill={C.yellow} />
          <path d="M 380 144 A 180 180 0 0 1 470 300 L 290 300 Z" fill={RED} />
          <circle cx={290} cy={300} r={96} fill="#fff" />
          <path d={`M 290 300 L ${290 + Math.sin(needle) * 160} ${300 - Math.cos(needle) * 160}`} stroke={C.navy} strokeWidth={14} strokeLinecap="round" />
          <circle cx={290} cy={300} r={22} fill={C.navy} />
          {[0, 1].map((i) => <ellipse key={i} cx={210 + i * 160} cy={440} rx={52} ry={66} fill="#D9D3F2" />)}
        </svg>
      </div>
      <Pop at={aLebih} style={{left: 0, width: 1080, top: 510, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Berat badan berlebihan" bg={RED} size={50} />
      </Pop>
      <Pop at={aLebih + 8} style={{left: 0, width: 1080, top: 1160, display: 'flex', justifyContent: 'center'}}>
        <Sym icon="lungs" text="Paru-paru lebih terbeban" bg={C.navy} w={640} size={38} />
      </Pop>
    </Camera>
  );
};

/* ================= 11 — Tak boleh sembuh sepenuhnya, tapi boleh dikawal ================= */
export const Kawal: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSembuh = at(p, 'sembuh', 1.2);
  const aKawal = at(p, 'dikawal', 3.4);
  const aCara = at(p, 'caranya', 4.6);
  const dim = f >= aKawal ? 0.45 : 1;
  return (
    <Camera dur={p.dur} to={1.07} panY={-12}>
      <NightSky seed={29} glow={f >= aKawal ? C.green : C.violet[2]} />
      <Glow x={540} y={1000} r={560} color={C.green} opacity={f >= aKawal ? 0.28 : 0} />
      <Pop at={aSembuh} style={{left: 0, width: 1080, top: 500, display: 'flex', justifyContent: 'center', opacity: dim}}>
        <div style={{opacity: dim}}>
          <Pill text="Tak boleh sembuh sepenuhnya" bg={C.navy} size={46} />
        </div>
      </Pop>
      <Pop at={aKawal} style={{left: 0, width: 1080, top: 640, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, background: C.green, padding: '18px 46px 18px 20px', borderRadius: 60, boxShadow: SHADOW}}>
          <Icon name="check" size={96} />
          <div>
            <Txt size={38}>tapi…</Txt>
            <Txt size={76} style={{lineHeight: 1}}>BOLEH DIKAWAL</Txt>
          </div>
        </div>
      </Pop>
      <Pop at={aCara} style={{left: 620, top: 900}}>
        <Bubble tail="left" size={48} bg={C.yellow}>Ini caranya!</Bubble>
      </Pop>
      <Who preset={p.preset} x={230} y={1010} w={620} mood={f >= aKawal ? 'happy' : 'neutral'} pose={f >= aCara ? 'point' : 'clasp'} />
    </Camera>
  );
};

/* ================= 12 — Cara cegah: 4 langkah ================= */
export const Cegah: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const tiles: {icon: IconName; title: string; sub: string; a: number; bg: string}[] = [
    {icon: 'dust', title: 'Elak pencetus', sub: 'Habuk · asap · jerebu', a: at(p, 'elakkan', 0.2), bg: C.violet[0]},
    {icon: 'nosmoke', title: 'Jangan merokok', sub: 'Jauhi asap rokok', a: at(p, 'jangan merokok', 4.2), bg: C.navy},
    {icon: 'inhaler', title: 'Inhaler pencegah', sub: 'Setiap hari, walaupun sihat', a: at(p, 'inhaler', 5.9), bg: C.violet[0]},
    {icon: 'calendar', title: 'Pemeriksaan', sub: 'Ikut jadual doktor', a: at(p, 'pemeriksaan', 12.0), bg: C.navy},
  ];
  const active = tiles.reduce((acc, t, i) => (f >= t.a ? i : acc), 0);
  return (
    <Camera dur={p.dur} to={1.06} panY={-12}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 70%, #1F6F78 100%)`}} />
      <Glow x={540} y={900} r={560} color={C.green} opacity={0.22} />
      <Pop at={2} style={{left: 0, width: 1080, top: 545, display: 'flex', justifyContent: 'center'}}>
        <Pill text="CARA KAWAL ASMA" bg={C.yellow} color={C.navy} size={50} />
      </Pop>
      {tiles.map((t, i) => {
        if (f < t.a) return null;
        const ff = f - t.a;
        const on = i === active;
        return (
          <div key={i} style={{position: 'absolute', left: 60, top: 665 + i * 160, width: 960, height: 146, background: t.bg, borderRadius: 36, display: 'flex', alignItems: 'center', gap: 22, padding: '0 28px', transform: `scale(${popScale(ff) * (on ? 1 : 0.97)})`, opacity: popOpacity(ff) * (on ? 1 : 0.72), boxShadow: SHADOW, border: on ? `5px solid ${C.yellow}` : '5px solid transparent', boxSizing: 'border-box'}}>
            <div style={{width: 70, height: 70, borderRadius: 35, background: C.yellow, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <Txt size={40} color={C.navy}>{i + 1}</Txt>
            </div>
            <div style={{width: 104, height: 104, borderRadius: 28, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <Icon name={t.icon} size={82} f={f} />
            </div>
            <div>
              <Txt size={46}>{t.title}</Txt>
              <Txt size={30} color={C.violet[4]} style={{marginTop: 4}}>{t.sub}</Txt>
            </div>
          </div>
        );
      })}
      <Who preset={p.preset} x={340} y={1310} w={400} mood="happy" pose="clasp" />
    </Camera>
  );
};

/* ================= 13 — Tanda bahaya: terus ke kecemasan ================= */
export const Kecemasan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const items: {icon: IconName; text: string; a: number}[] = [
    {icon: 'inhaler', text: 'Sesak tak lega selepas inhaler', a: at(p, 'sesak', 0.9)},
    {icon: 'talk', text: 'Susah nak bercakap', a: at(p, 'susah', 3.6)},
  ];
  const aTunggu = at(p, 'jangan', 5.0);
  const aTerus = at(p, 'terus', 6.0);
  return (
    <Camera dur={p.dur} to={1.07} panY={-12}>
      <NightSky seed={17} glow={RED} />
      <Glow x={540} y={900} r={600} color={RED} opacity={0.15 + 0.1 * Math.sin(f / 4)} />
      <Pop at={2} style={{left: 0, width: 1080, top: 520, display: 'flex', justifyContent: 'center'}}>
        <Pill text="⚠ TANDA BAHAYA" bg={RED} size={50} />
      </Pop>
      {items.map((it, i) => (
        <Pop key={i} at={it.a} style={{left: 60, top: 660 + i * 150}}>
          <Sym icon={it.icon} text={it.text} w={960} bg={C.navy} size={44} f={f} />
        </Pop>
      ))}
      <Pop at={aTunggu} style={{left: 520, top: 1000}}>
        <Pill text="Jangan tunggu" bg={C.yellow} color={C.navy} size={54} />
      </Pop>
      <Pop at={aTerus} style={{left: 480, top: 1150}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: RED, padding: '14px 34px 14px 16px', borderRadius: 44, boxShadow: SHADOW, transform: `scale(${1 + 0.03 * Math.sin(f / 3)})`}}>
          <Icon name="siren" size={80} f={f} />
          <Txt size={46}>Terus ke<br />kecemasan</Txt>
        </div>
      </Pop>
      <Who preset={p.preset} x={-30} y={960} w={540} mood="neutral" pose={f >= aTunggu ? 'point' : 'clasp'} />
    </Camera>
  );
};

/* ================= 14 — Penutup: Klinik Nissa, Nilai ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aPem = at(p, 'pemeriksaan', 2.6);
  const aRaw = at(p, 'rawatan', 3.5);
  return (
    <Camera dur={p.dur} to={1.05} panY={-12}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 60%, ${C.pink[2]} 100%)`}} />
      <NightSky seed={23} glow={C.pink[0]} top="transparent" bottom="transparent" stars={50} />
      <Glow x={540} y={1000} r={560} color={C.green} opacity={0.25} />
      <Pop at={0} style={{left: 410, top: 560}}>
        <div style={{width: 260, height: 260, borderRadius: 60, overflow: 'hidden', boxShadow: '0 20px 50px rgba(18,11,51,.6)', border: `6px solid ${C.green}`}}>
          <Img src={staticFile('brand/klinik_nissa_logo.png')} style={{width: '100%', height: '100%'}} />
        </div>
      </Pop>
      <Pop at={4} style={{left: 0, width: 1080, top: 860, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Klinik Nissa, Nilai" bg={C.navy} color={C.yellow} size={54} />
      </Pop>
      <Pop at={aPem} style={{left: 0, width: 1080, top: 980, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Pemeriksaan &" bg={C.labelPink} size={44} />
      </Pop>
      <Pop at={aRaw} style={{left: 0, width: 1080, top: 1070, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Rawatan asma" bg={C.labelPink} size={44} />
      </Pop>
      <Who preset={p.preset} x={340} y={1110} w={400} mood="happy" pose="wave" />
      <Pop at={aRaw + 8} style={{left: 0, width: 1080, top: 1500, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: C.yellow, padding: '12px 34px 12px 14px', borderRadius: 44, boxShadow: SHADOW}}>
          <Icon name="whatsapp" size={70} />
          <Txt size={50} color={C.navy}>012-608 1411</Txt>
        </div>
      </Pop>
      <div style={{position: 'absolute', left: 0, top: 1650, width: 1080, textAlign: 'center', opacity: interpolate(f, [aRaw, aRaw + 10], [0, 1], clamp)}}>
        <Txt size={28} color={C.violet[4]}>Video ini untuk pendidikan, bukan diagnosis.</Txt>
        <Txt size={28} color={C.violet[4]}>Watak Amir ialah ilustrasi.</Txt>
      </div>
    </Camera>
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro,
  sesak: Sesak,
  hospital: Hospital,
  apa: Apa,
  saluran: Saluran,
  simptom: Simptom,
  risiko: Risiko,
  keturunan: Keturunan,
  alahan: Alahan,
  rokok: Rokok,
  berat: Berat,
  kawal: Kawal,
  cegah: Cegah,
  kecemasan: Kecemasan,
  penutup: Penutup,
};
