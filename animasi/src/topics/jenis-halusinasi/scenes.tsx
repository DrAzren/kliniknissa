import React from 'react';
import {AbsoluteFill, Img, interpolate, random, staticFile, useCurrentFrame, Easing} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset} from '../../components/Avatar';
import {Camera, clamp, Glow, NightSky, Pill, Pop, popScale, popOpacity} from '../../components/common';
import {WordsFile, wordTime} from '../../lib/timeline';

export type SceneProps = {preset: AvatarPreset; dur: number; wf: WordsFile; start: number; fps: number};

/* ---------- watak cerita (khas topik ini; Pakcik Hamid ialah watak ilustrasi) ---------- */
export const PAKCIK: AvatarPreset = {
  id: 'pakcik', skin: '#C89068', skinShade: '#AC7550', hair: 'short-grey', hairColor: '#DCD8E4', top: 'kemeja', topColor: '#9A5A34', topShade: '#7A4426',
  accessory: 'glasses', glassesColor: '#3A2E2A', moustache: true,
};
export const KAKAK: AvatarPreset = {
  id: 'kakak', skin: '#D9A07A', skinShade: '#BD845E', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#6157C5', topShade: '#4B3C9B',
  hijabColor: '#EC8DB1', hijabShade: '#C8668E', accessory: null,
};
export const ABANG: AvatarPreset = {
  id: 'abang', skin: '#C58A60', skinShade: '#A9714B', hair: 'short', hairColor: '#24202B', top: 'kemeja', topColor: '#2F6FA8', topShade: '#24578A',
  accessory: null, stubble: true,
};
export const AISYAH: AvatarPreset = {
  id: 'aisyah', skin: '#E3AF88', skinShade: '#C99069', hair: 'hijab', hairColor: '#2A1C24', top: 'blouse', topColor: '#F4E4C9', topShade: '#D8C29E',
  hijabColor: '#2BB3A3', hijabShade: '#1F8A7E', accessory: null,
};
export const FARID: AvatarPreset = {
  id: 'farid', skin: '#C98F68', skinShade: '#AE7652', hair: 'short', hairColor: '#1C1824', top: 'hoodie', topColor: '#3B2C88', topShade: '#2A1F66',
  accessory: null,
};
const KIDS: AvatarPreset[] = [
  {id: 'kid1', skin: '#F2C6A2', skinShade: '#DDAA84', hair: 'short', hairColor: '#2A2233', top: 'tee', topColor: '#F6C945', topShade: '#D9AC2C', accessory: null},
  {id: 'kid2', skin: '#F2C6A2', skinShade: '#DDAA84', hair: 'hijab', hairColor: '#2A2233', top: 'tee', topColor: '#FFFFFF', topShade: '#DCD6F2', hijabColor: '#C394E6', hijabShade: '#9C8EE1', accessory: null},
  {id: 'kid3', skin: '#F2C6A2', skinShade: '#DDAA84', hair: 'side-part', hairColor: '#2A2233', top: 'tee', topColor: '#4FD8D8', topShade: '#2BB3A3', accessory: null},
];

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

/* budak "bercahaya" (halusinasi penglihatan): lutsinar, kebiruan, berkilau */
const GhostKid: React.FC<{preset: AvatarPreset; x: number; y: number; w: number; seed: number; at: number}> = ({preset, x, y, w, seed, at: a}) => {
  const f = useCurrentFrame();
  if (f < a) return null;
  const ff = f - a;
  const flick = 0.72 + 0.14 * Math.sin(f / 5 + seed * 2) + 0.07 * Math.sin(f / 1.7 + seed);
  const hop = Math.abs(Math.sin((f + seed * 9) / 7)) * 26;
  return (
    <div style={{position: 'absolute', left: x, top: y - hop, opacity: flick * popOpacity(ff), transform: `scale(${popScale(ff)})`, transformOrigin: 'bottom center', filter: `saturate(0.35) brightness(1.35) drop-shadow(0 0 22px #9EC3FF) drop-shadow(0 0 8px #fff)`}}>
      <Avatar preset={preset} width={w} mood="happy" pose={seed % 2 ? 'wave' : 'down'} seed={seed + 7} />
    </div>
  );
};

/* tag kecil "Kisah ilustrasi" */
const Ilustrasi: React.FC = () => (
  <div style={{position: 'absolute', left: 40, top: 1700}}>
    <Pill text="Kisah ilustrasi" bg="rgba(18,11,51,0.65)" color={C.violet[4]} size={28} />
  </div>
);

/* ---------- ikon flat ---------- */
type IconName =
  | 'ear' | 'eye' | 'hand' | 'nose' | 'tongue' | 'house' | 'ghost' | 'brain' | 'thermo' | 'pill' | 'moon' | 'bolt' | 'fog' | 'sun'
  | 'repeat' | 'scared' | 'cross' | 'bug' | 'smoke' | 'person' | 'none' | 'whatsapp' | 'check';
export const Icon: React.FC<{name: IconName; size?: number; f?: number}> = ({name, size = 120, f = 0}) => {
  const y = C.yellow, pk = C.labelPink, nv = C.navy, g = C.green, w = '#fff', sk = '#E3AF88', sks = '#C99069';
  const body = (() => {
    switch (name) {
      case 'ear':
        return (
          <g>
            <path d="M 64 12 Q 104 12 104 52 Q 104 74 86 86 Q 76 94 76 104 Q 74 116 60 114 Q 46 112 48 96" stroke="none" fill={sk} />
            <path d="M 64 12 Q 26 12 26 54 Q 26 70 40 74 L 50 100 Q 54 114 62 112" fill={sk} />
            <path d="M 66 34 Q 86 34 86 54 Q 86 66 74 72 Q 64 76 66 88" stroke={sks} strokeWidth={9} fill="none" strokeLinecap="round" />
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M ${8 - i * 10} ${36 - i * 8} Q ${-4 - i * 10} 56 ${8 - i * 10} ${76 + i * 8}`} stroke={y} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.4 + 0.6 * Math.abs(Math.sin(f / 6 - i))} />
            ))}
          </g>
        );
      case 'eye':
        return (
          <g>
            <path d="M 6 60 Q 60 6 114 60 Q 60 114 6 60 Z" fill={w} />
            <circle cx={60} cy={60} r={26} fill={C.violet[1]} />
            <circle cx={60} cy={60} r={13} fill={nv} />
            <circle cx={68} cy={52} r={6} fill={w} />
          </g>
        );
      case 'hand':
        return (
          <g fill={sk}>
            <rect x={28} y={56} width={60} height={56} rx={22} />
            {[0, 1, 2, 3].map((i) => <rect key={i} x={30 + i * 15} y={14 + Math.abs(i - 1.5) * 6} width={13} height={56} rx={6.5} />)}
            <rect x={78} y={58} width={34} height={14} rx={7} transform="rotate(-38 78 64)" />
            <circle cx={50} cy={84} r={5} fill={y} />
          </g>
        );
      case 'nose':
        return (
          <g>
            <path d="M 54 10 Q 50 50 30 76 Q 22 92 40 98 Q 54 104 64 96 Q 76 104 90 96 Q 102 86 88 72 Q 74 48 74 10 Z" fill={sk} />
            <ellipse cx={46} cy={88} rx={8} ry={5} fill={sks} />
            <ellipse cx={80} cy={88} rx={8} ry={5} fill={sks} />
            {[0, 1].map((i) => (
              <path key={i} d={`M ${104 + i * 8} ${70 - i * 16} q 8 -10 0 -20 q -8 -10 0 -20`} stroke="#B9B3D6" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.4 + 0.6 * Math.abs(Math.sin(f / 7 + i))} />
            ))}
          </g>
        );
      case 'tongue':
        return (
          <g>
            <path d="M 10 40 Q 60 22 110 40 Q 104 70 60 74 Q 16 70 10 40 Z" fill="#B23A5E" />
            <path d="M 34 52 Q 34 110 60 110 Q 86 110 86 52 Z" fill="#F08AA8" />
            <path d="M 60 60 L 60 96" stroke="#D96C8C" strokeWidth={5} strokeLinecap="round" />
            <path d="M 14 40 Q 60 30 106 40 Q 60 50 14 40 Z" fill={w} />
          </g>
        );
      case 'house':
        return (
          <g>
            <path d="M 12 58 L 60 16 L 108 58 Z" fill={pk} />
            <rect x={24} y={56} width={72} height={52} rx={6} fill={w} />
            <rect x={50} y={74} width={20} height={34} rx={4} fill={C.violet[1]} />
          </g>
        );
      case 'ghost':
        return (
          <g>
            <path d="M 24 108 L 24 54 Q 24 14 60 14 Q 96 14 96 54 L 96 108 L 84 96 L 72 108 L 60 96 L 48 108 L 36 96 Z" fill={w} opacity={0.92} />
            <ellipse cx={46} cy={56} rx={7} ry={10} fill={nv} />
            <ellipse cx={74} cy={56} rx={7} ry={10} fill={nv} />
            <ellipse cx={60} cy={78} rx={8} ry={6} fill={nv} />
          </g>
        );
      case 'brain':
        return (
          <g>
            <path d="M 60 18 Q 40 8 28 22 Q 10 24 12 44 Q 2 58 14 72 Q 12 92 32 96 Q 42 112 60 102 Q 78 112 88 96 Q 108 92 106 72 Q 118 58 108 44 Q 110 24 92 22 Q 80 8 60 18 Z" fill="#F2A5C8" />
            <path d="M 60 20 L 60 100 M 36 40 Q 46 50 36 62 M 84 40 Q 74 50 84 62 M 30 78 Q 42 74 46 86 M 90 78 Q 78 74 74 86" stroke="#D97BA6" strokeWidth={5} fill="none" strokeLinecap="round" />
          </g>
        );
      case 'thermo':
        return (
          <g>
            <rect x={48} y={10} width={24} height={78} rx={12} fill={w} />
            <circle cx={60} cy={92} r={20} fill={pk} />
            <rect x={55} y={34} width={10} height={60} rx={5} fill={pk} />
            {[0, 1, 2].map((i) => <rect key={i} x={76} y={22 + i * 16} width={14} height={5} rx={2.5} fill={w} opacity={0.7} />)}
          </g>
        );
      case 'pill':
        return (
          <g transform="rotate(-35 60 60)">
            <rect x={14} y={40} width={92} height={40} rx={20} fill={w} />
            <path d="M 60 40 L 86 40 Q 106 40 106 60 Q 106 80 86 80 L 60 80 Z" fill={pk} />
          </g>
        );
      case 'moon':
        return (
          <g>
            <path d="M 78 16 A 44 44 0 1 0 104 88 A 38 38 0 1 1 78 16 Z" fill={y} />
            <path d="M 88 30 L 100 30 L 88 44 L 100 44" stroke={w} strokeWidth={4} fill="none" strokeLinejoin="round" />
          </g>
        );
      case 'bolt':
        return <path d="M 66 6 L 22 68 L 56 68 L 46 114 L 98 46 L 62 46 Z" fill={y} />;
      case 'fog':
        return (
          <g>
            <circle cx={60} cy={56} r={44} fill={C.violet[3]} />
            {[0, 1, 2].map((i) => <rect key={i} x={10 + i * 8} y={40 + i * 18} width={100 - i * 16} height={10} rx={5} fill={w} opacity={0.8} />)}
          </g>
        );
      case 'sun':
        return (
          <g>
            <circle cx={60} cy={60} r={26} fill={y} />
            {new Array(8).fill(0).map((_, i) => <rect key={i} x={56} y={6} width={8} height={18} rx={4} fill={y} transform={`rotate(${i * 45} 60 60)`} />)}
          </g>
        );
      case 'repeat':
        return (
          <g fill="none" stroke={w} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round">
            <path d="M 24 56 Q 24 28 52 28 L 92 28 M 80 14 L 94 28 L 80 42" />
            <path d="M 96 64 Q 96 92 68 92 L 28 92 M 40 78 L 26 92 L 40 106" />
          </g>
        );
      case 'scared':
        return (
          <g>
            <circle cx={60} cy={60} r={48} fill="#7FA6E8" />
            <circle cx={44} cy={50} r={9} fill={w} />
            <circle cx={76} cy={50} r={9} fill={w} />
            <circle cx={44} cy={50} r={4} fill={nv} />
            <circle cx={76} cy={50} r={4} fill={nv} />
            <ellipse cx={60} cy={82} rx={12} ry={15} fill={nv} />
          </g>
        );
      case 'cross':
        return (
          <g>
            <rect x={8} y={8} width={104} height={104} rx={24} fill={w} />
            <rect x={46} y={22} width={28} height={76} rx={6} fill={pk} />
            <rect x={22} y={46} width={76} height={28} rx={6} fill={pk} />
          </g>
        );
      case 'bug':
        return <Bug size={120} f={f} />;
      case 'smoke':
        return (
          <g fill="none" stroke="#C9C4E2" strokeWidth={10} strokeLinecap="round">
            {[0, 1, 2].map((i) => <path key={i} d={`M ${30 + i * 30} 110 q 16 -18 0 -36 q -16 -18 0 -36 q 16 -18 0 -30`} opacity={0.5 + 0.5 * Math.abs(Math.sin(f / 8 + i))} />)}
          </g>
        );
      case 'person':
        return (
          <g fill={w}>
            <circle cx={60} cy={36} r={22} />
            <path d="M 22 110 Q 22 64 60 64 Q 98 64 98 110 Z" />
          </g>
        );
      case 'none':
        return (
          <g>
            <circle cx={60} cy={60} r={46} fill="none" stroke={pk} strokeWidth={10} />
            <path d="M 28 92 L 92 28" stroke={pk} strokeWidth={10} strokeLinecap="round" />
            <g fill={w} opacity={0.7}>
              <circle cx={60} cy={46} r={14} />
              <path d="M 36 92 Q 36 66 60 66 Q 84 66 84 92 Z" />
            </g>
          </g>
        );
      case 'whatsapp':
        return (
          <g>
            <path d="M 60 8 C 30 8 8 30 8 58 C 8 70 12 80 18 88 L 12 112 L 36 104 C 44 108 52 110 60 110 C 90 110 112 88 112 58 C 112 30 90 8 60 8 Z" fill={g} />
            <path d="M 44 34 C 48 34 50 36 52 40 L 56 50 C 57 53 56 55 54 57 L 51 60 C 55 68 61 74 69 78 L 72 75 C 74 73 77 72 79 73 L 89 77 C 92 79 93 81 92 84 C 90 92 83 96 75 95 C 55 92 39 76 36 56 C 35 46 38 36 44 34 Z" fill={w} />
          </g>
        );
      case 'check':
        return (
          <g>
            <circle cx={60} cy={60} r={50} fill={g} />
            <path d="M 34 62 L 52 80 L 86 42" stroke={w} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
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

/* serangga kecil (semut) */
const Bug: React.FC<{size?: number; f?: number}> = ({size = 40, f = 0}) => {
  const leg = Math.sin(f / 2) * 6;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{overflow: 'visible'}}>
      <g stroke="#2A1F3D" strokeWidth={7} strokeLinecap="round">
        {[-1, 0, 1].map((i) => (
          <g key={i}>
            <path d={`M ${60 + i * 16} 60 L ${54 + i * 16 + leg * (i % 2 ? 1 : -1)} 26`} />
            <path d={`M ${60 + i * 16} 60 L ${66 + i * 16 - leg * (i % 2 ? 1 : -1)} 94`} />
          </g>
        ))}
      </g>
      <ellipse cx={34} cy={60} rx={16} ry={14} fill="#2A1F3D" />
      <ellipse cx={62} cy={60} rx={14} ry={12} fill="#3A2C55" />
      <ellipse cx={90} cy={60} rx={22} ry={18} fill="#2A1F3D" />
    </svg>
  );
};

/* kad simptom: ikon + teks */
const Sym: React.FC<{icon: IconName; text: string; bg?: string; color?: string; w?: number; f?: number; size?: number}> = ({icon, text, bg = C.navy, color = '#fff', w = 520, f = 0, size = 42}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 20, width: w, background: bg, borderRadius: 34, padding: '16px 26px 16px 18px', boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
    <div style={{width: 92, height: 92, borderRadius: 26, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
      <Icon name={icon} size={76} f={f} />
    </div>
    <Txt size={size} color={color}>{text}</Txt>
  </div>
);

/* belon kata */
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

/* ruang tamu malam (tingkap + bulan + lampu + sofa) */
const LivingRoom: React.FC<{f: number}> = ({f}) => (
  <>
    <Room wall={`linear-gradient(180deg, ${C.night[0]} 0%, ${C.night[3]} 100%)`} floor={C.night[1]} floorY={1300} />
    <div style={{position: 'absolute', left: 620, top: 470, width: 380, height: 400, borderRadius: 30, overflow: 'hidden', background: '#141040', border: `18px solid ${C.night[0]}`}}>
      <div style={{position: 'absolute', left: 200, top: 60, width: 110, height: 110, borderRadius: 55, background: '#F4F1FF', boxShadow: '0 0 60px #fff'}} />
      {new Array(10).fill(0).map((_, i) => (
        <div key={i} style={{position: 'absolute', left: random(`lw${i}`) * 340, top: random(`lh${i}`) * 360, width: 6, height: 6, borderRadius: 3, background: '#fff', opacity: 0.4 + 0.6 * Math.abs(Math.sin(f / 10 + i))}} />
      ))}
      <div style={{position: 'absolute', left: 162, top: 0, width: 20, height: 400, background: C.night[0]}} />
    </div>
    {/* lampu meja */}
    <Glow x={140} y={880} r={300} color={C.yellow} opacity={0.35} />
    <div style={{position: 'absolute', left: 80, top: 820, width: 120, height: 90, borderRadius: '18px 18px 50px 50px', background: C.yellow}} />
    <div style={{position: 'absolute', left: 134, top: 910, width: 12, height: 200, background: C.night[0]}} />
    {/* permaidani */}
    <div style={{position: 'absolute', left: 300, top: 1440, width: 740, height: 200, borderRadius: '50%', background: C.pink[2], opacity: 0.7}} />
  </>
);

/* ================= 0 — Intro: tajuk, Pakcik Hamid & 3 budak bercahaya ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTitleOut = at(p, 'nampak', 1.9);
  const aTiga = at(p, 'tiga', 2.3);
  const aMain = at(p, 'bermain', 3.6);
  const titleOut = interpolate(f, [aTitleOut - 4, aTitleOut + 6], [1, 0], clamp);
  const ballX = 640 + Math.sin(f / 9) * 200;
  const ballY = 1500 - Math.abs(Math.sin(f / 6)) * 120;
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <LivingRoom f={f} />
      {/* sofa + Pakcik */}
      <div style={{position: 'absolute', left: 20, top: 1080, width: 520, height: 260, borderRadius: 60, background: C.pink[2]}} />
      <Who preset={PAKCIK} x={40} y={830} w={460} mood={f >= aTiga ? 'curious' : 'neutral'} pose={f >= aMain ? 'chin' : 'clasp'} seed={3} />
      <div style={{position: 'absolute', left: 0, top: 1290, width: 500, height: 130, borderRadius: 40, background: C.pink[1]}} />
      {/* budak bercahaya */}
      {f >= aMain ? (
        <div style={{position: 'absolute', left: ballX - 34, top: ballY - 34, width: 68, height: 68, borderRadius: 34, background: C.yellow, boxShadow: `0 0 50px ${C.yellow}, 0 0 20px #fff`, opacity: 0.85}} />
      ) : null}
      <GhostKid preset={KIDS[0]} x={520} y={1200} w={240} seed={1} at={aTiga} />
      <GhostKid preset={KIDS[1]} x={700} y={1250} w={230} seed={2} at={aTiga + 5} />
      <GhostKid preset={KIDS[2]} x={850} y={1190} w={240} seed={3} at={aTiga + 10} />
      {/* tajuk (kelihatan pada frame 0) */}
      <div style={{position: 'absolute', top: 470, width: 1080, textAlign: 'center', opacity: titleOut, transform: `translateY(${(1 - titleOut) * -30}px)`}}>
        <div style={{position: 'absolute', left: 60, top: -40, width: 960, height: 420, borderRadius: 60, background: 'rgba(18,11,51,0.55)'}} />
        <div style={{position: 'relative'}}>
          <Txt size={62} color={C.violet[4]}>JENIS-JENIS</Txt>
          <Txt size={136} color={C.yellow} style={{lineHeight: 1, textShadow: '0 8px 0 rgba(18,11,51,.6)'}}>HALUSINASI</Txt>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: 18}}>
            <Pill text="Nampak benda yang tiada?" bg={C.labelPink} size={52} />
          </div>
        </div>
      </div>
      {f >= aTitleOut ? <Ilustrasi /> : null}
    </Camera>
  );
};

/* ================= 1 — Keluarga panik: "rumah berpenunggu?" ================= */
export const Keluarga: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKata = at(p, 'ada yang kata', 1.1);
  const aPen = at(p, 'berpenunggu', 2.3);
  return (
    <Camera dur={p.dur} to={1.08} panX={-15}>
      <Room wall={`linear-gradient(180deg, ${C.night[2]} 0%, ${C.violet[0]} 100%)`} floor={C.night[1]} floorY={1420} />
      {/* pintu ruang tamu bercahaya */}
      <div style={{position: 'absolute', left: 700, top: 640, width: 330, height: 780, background: C.night[0], borderRadius: '24px 24px 0 0'}} />
      <div style={{position: 'absolute', left: 724, top: 664, width: 282, height: 756, background: `linear-gradient(180deg, #9EC3FF55 0%, #C394E6aa 100%)`, borderRadius: '16px 16px 0 0', boxShadow: '0 0 80px #9EC3FF66'}} />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{position: 'absolute', left: 760 + i * 70, top: 1250 - Math.abs(Math.sin(f / 6 + i)) * 40, width: 40, height: 40, borderRadius: 20, background: '#fff', opacity: 0.35 + 0.25 * Math.sin(f / 4 + i), filter: 'blur(4px)'}} />
      ))}
      <Who preset={ABANG} x={40} y={870} w={430} mood="shock" pose="clasp" seed={5} />
      <Who preset={KAKAK} x={330} y={930} w={420} mood={f >= aPen ? 'sad' : 'shock'} pose="chin" seed={4} />
      {/* titis peluh */}
      {[0, 1].map((i) => {
        const ff = (f + i * 20) % 40;
        return <div key={i} style={{position: 'absolute', left: [380, 690][i], top: [900, 960][i] + ff * 2, width: 26, height: 38, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: '#8EC9FF', opacity: interpolate(ff, [0, 6, 30, 40], [0, 1, 1, 0])}} />;
      })}
      <Pop at={aKata} style={{left: 90, top: 560}}>
        <Bubble tail="left" size={50}>"Rumah ni..."</Bubble>
      </Pop>
      <Pop at={aPen} style={{left: 300, top: 700}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, background: C.labelPink, padding: '14px 32px 14px 16px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)', transform: `rotate(-4deg) translateY(${Math.sin(f / 5) * 6}px)`}}>
          <Icon name="ghost" size={84} />
          <Txt size={52}>Berpenunggu?</Txt>
        </div>
      </Pop>
      <Ilustrasi />
    </Camera>
  );
};

/* ================= 2 — Doktor periksa: punca bukan di rumah, tapi di mata ================= */
export const Doktor: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aPer = at(p, 'periksa', 0.9);
  const aBukan = at(p, 'bukan', 2.3);
  const aMata = at(p, 'mata', 4.2);
  const beam = f >= aPer ? 0.55 + 0.25 * Math.sin(f / 3) : 0;
  const houseOut = interpolate(f, [aMata - 6, aMata + 2], [1, 0], clamp);
  return (
    <Camera dur={p.dur} to={1.08} panY={-10}>
      <Room wall={`linear-gradient(180deg, ${C.night[3]} 0%, ${C.violet[2]} 100%)`} floor={C.night[1]} floorY={1420} />
      <Glow x={540} y={1050} r={480} color={C.violet[3]} opacity={0.35} />
      {/* carta mata di dinding */}
      <div style={{position: 'absolute', left: 820, top: 560, width: 180, height: 250, background: '#fff', borderRadius: 18, padding: 14, textAlign: 'center', transform: 'rotate(3deg)'}}>
        {['E', 'F P', 'T O Z', 'L P E D'].map((r, i) => (
          <Txt key={i} size={[60, 40, 28, 20][i]} color={C.navy} style={{letterSpacing: 4}}>{r}</Txt>
        ))}
      </div>
      <Who preset={p.preset} x={10} y={840} w={540} mood="curious" pose="point" />
      <Who preset={PAKCIK} x={600} y={960} w={420} mood={f >= aMata ? 'shock' : 'neutral'} pose="clasp" seed={3} />
      {/* cahaya lampu suluh dari tangan doktor ke mata Pakcik */}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: beam}}>
        <polygon points="535,1196 780,1110 790,1170" fill={C.yellow} />
      </svg>
      {/* rumah dipangkah */}
      {f >= aBukan && houseOut > 0 ? (
        <div style={{position: 'absolute', left: 120, top: 520, opacity: houseOut, transform: `scale(${popScale(f - aBukan)})`}}>
          <div style={{background: '#fff', borderRadius: 40, padding: 22}}>
            <Icon name="house" size={160} />
          </div>
          <svg width={240} height={240} style={{position: 'absolute', left: -18, top: -18}} viewBox="0 0 240 240">
            <path d="M 20 20 L 220 220 M 220 20 L 20 220" stroke={C.labelPink} strokeWidth={22} strokeLinecap="round" strokeDasharray={290} strokeDashoffset={290 * (1 - interpolate(f - aBukan, [4, 12], [0, 1], clamp))} />
          </svg>
        </div>
      ) : null}
      {/* punca sebenar: MATA */}
      <Pop at={aMata} style={{left: 180, top: 520}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 22, background: C.yellow, padding: '18px 40px 18px 22px', borderRadius: 56, boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
          <div style={{background: C.navy, borderRadius: 40, padding: 10}}>
            <Icon name="eye" size={110} />
          </div>
          <div>
            <Txt size={34} color={C.navy}>Punca sebenar</Txt>
            <Txt size={84} color={C.navy} style={{lineHeight: 1}}>MATA</Txt>
          </div>
        </div>
      </Pop>
      <Ilustrasi />
    </Camera>
  );
};

/* ================= 3 — Penglihatan kabur → otak "isi" ruang kosong ================= */
export const Mata: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKabur = at(p, 'kabur', 1.4);
  const aOtak = at(p, 'otaknya', 2.4);
  const aGambar = at(p, 'gambar', 4.6);
  const blur = interpolate(f, [aKabur - 6, aKabur + 10], [0, 12], clamp);
  const fillIn = interpolate(f, [aGambar - 6, aGambar + 10], [0, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <NightSky seed={31} glow={C.violet[2]} />
      {/* bingkai "pandangan Pakcik" */}
      <div style={{position: 'absolute', left: 90, top: 560, width: 900, height: 560, borderRadius: 50, overflow: 'hidden', border: `12px solid ${C.navy}`, boxShadow: '0 30px 70px rgba(18,11,51,.6)'}}>
        <div style={{position: 'absolute', inset: 0, filter: `blur(${blur}px)`}}>
          <div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${C.night[3]} 0%, ${C.violet[0]} 100%)`}} />
          <div style={{position: 'absolute', left: 0, top: 400, width: 900, height: 160, background: C.pink[2]}} />
          <div style={{position: 'absolute', left: 620, top: 60, width: 220, height: 220, borderRadius: 24, background: '#141040', border: `12px solid ${C.night[0]}`}} />
          <div style={{position: 'absolute', left: 70, top: 160, width: 100, height: 76, borderRadius: '14px 14px 40px 40px', background: C.yellow}} />
        </div>
        {/* tompok kosong (penglihatan hilang) */}
        {[[260, 300], [480, 330], [700, 360]].map(([x, y], i) => (
          <div key={i} style={{position: 'absolute', left: x - 110, top: y - 110, width: 220, height: 220, borderRadius: 110, background: `radial-gradient(circle, ${C.shadow} 0%, ${C.shadow}ee 50%, ${C.shadow}00 72%)`, opacity: interpolate(f, [aKabur, aKabur + 12], [0, 1], clamp) * (1 - fillIn * 0.7)}} />
        ))}
        {/* otak isi dengan gambar sendiri */}
        {[0, 1, 2].map((i) => (
          <div key={i} style={{position: 'absolute', left: [180, 400, 620][i], top: [210, 240, 260][i], opacity: fillIn * (0.7 + 0.2 * Math.sin(f / 5 + i)), transform: `scale(${0.6 + fillIn * 0.4})`, filter: 'saturate(0.4) brightness(1.4) drop-shadow(0 0 18px #9EC3FF)'}}>
            <Avatar preset={KIDS[i]} width={160} mood="happy" pose={i === 1 ? 'wave' : 'down'} seed={i + 4} />
          </div>
        ))}
      </div>
      <Pop at={aKabur} style={{left: 130, top: 500}}>
        <Pill text="Penglihatan kabur" bg={C.labelPink} size={46} />
      </Pop>
      {/* otak + pancaran */}
      <Pop at={aOtak} style={{left: 640, top: 1150}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: C.navy, padding: '14px 30px 14px 16px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
          <div style={{transform: `scale(${1 + 0.06 * Math.sin(f / 4)})`}}>
            <Icon name="brain" size={96} />
          </div>
          <Txt size={38}>Otak "isi"<br />ruang kosong</Txt>
        </div>
      </Pop>
      {f >= aOtak
        ? [0, 1, 2, 3].map((i) => {
            const ff = (f - aOtak + i * 8) % 32;
            return <div key={i} style={{position: 'absolute', left: 700 - ff * 4 - i * 40, top: 1150 - ff * 3, width: 18, height: 18, borderRadius: 9, background: C.yellow, opacity: interpolate(ff, [0, 6, 24, 32], [0, 1, 1, 0]), boxShadow: `0 0 16px ${C.yellow}`}} />;
          })
        : null}
      <Who preset={PAKCIK} x={40} y={1140} w={420} mood="curious" pose="chin" seed={3} />
      <Ilustrasi />
    </Camera>
  );
};

/* ================= 4 — Sindrom Charles Bonnet (cop) ================= */
export const Cbs: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSin = at(p, 'sindrom', 0.6);
  const stamp = f >= aSin ? interpolate(f - aSin, [0, 6, 10], [1.7, 0.94, 1], clamp) : 0;
  return (
    <Camera dur={p.dur} to={1.06}>
      <NightSky seed={37} glow={C.pink[0]} />
      <Glow x={540} y={1200} r={520} color={C.green} opacity={0.25} />
      {f >= aSin ? (
        <div style={{position: 'absolute', left: 60, top: 500, width: 960, display: 'flex', justifyContent: 'center', transform: `scale(${stamp}) rotate(-4deg)`, opacity: interpolate(f - aSin, [0, 3], [0, 1], clamp)}}>
          <div style={{background: C.navy, border: `10px solid ${C.labelPink}`, borderRadius: 40, padding: '26px 44px', textAlign: 'center', boxShadow: '0 30px 70px rgba(18,11,51,.6)'}}>
            <Txt size={44} color={C.violet[4]}>SINDROM</Txt>
            <Txt size={92} color={C.yellow} style={{lineHeight: 1.02}}>CHARLES BONNET</Txt>
          </div>
        </div>
      ) : null}
      <Pop at={Math.max(0, aSin + 10)} style={{left: 0, width: 1080, top: 830, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Masalah mata, bukan tanda “gila”" bg={C.green} size={44} />
      </Pop>
      <Who preset={PAKCIK} x={290} y={990} w={500} mood={f >= aSin + 10 ? 'happy' : 'shock'} pose="clasp" seed={3} />
      <Ilustrasi />
    </Camera>
  );
};

/* ================= 5 — Apa itu halusinasi + 5 jenis ================= */
const FIVE: {icon: IconName; text: string}[] = [
  {icon: 'ear', text: 'Dengar'},
  {icon: 'eye', text: 'Lihat'},
  {icon: 'hand', text: 'Sentuh'},
  {icon: 'nose', text: 'Bau'},
  {icon: 'tongue', text: 'Rasa'},
];
export const Apa: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aNyata = at(p, 'nyata', 2.2);
  const aTiada = at(p, 'tiada', 4.1);
  const aLima = at(p, 'lima', 5.3);
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <NightSky seed={13} glow={C.violet[2]} />
      <Pop at={2} style={{left: 0, width: 1080, top: 480, display: 'flex', justifyContent: 'center'}}>
        <div style={{background: C.navy, borderRadius: 44, padding: '24px 48px', textAlign: 'center', boxShadow: '0 20px 50px rgba(18,11,51,.55)'}}>
          <Txt size={92} color={C.yellow}>HALUSINASI</Txt>
          <div style={{display: 'flex', justifyContent: 'center', gap: 18, marginTop: 12}}>
            <div style={{opacity: f >= aNyata ? 1 : 0.2, transform: `scale(${f >= aNyata ? popScale(f - aNyata) : 1})`}}>
              <Pill text="Rasa NYATA" bg={C.green} size={40} />
            </div>
            <div style={{opacity: f >= aTiada ? 1 : 0.2, transform: `scale(${f >= aTiada ? popScale(f - aTiada) : 1})`}}>
              <Pill text="…tapi TIADA" bg={C.labelPink} size={40} />
            </div>
          </div>
        </div>
      </Pop>
      {/* 5 deria */}
      {FIVE.map((d, i) => {
        const a = aLima + i * 5;
        if (f < a) return null;
        const ff = f - a;
        return (
          <div key={i} style={{position: 'absolute', left: 40 + i * 202, top: 830 + Math.sin(f / 8 + i) * 8, width: 190, textAlign: 'center', transform: `scale(${popScale(ff)})`, opacity: popOpacity(ff)}}>
            <div style={{width: 160, height: 160, margin: '0 auto', borderRadius: 80, background: i % 2 ? C.violet[0] : C.navy, border: `6px solid ${C.yellow}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
              <Icon name={d.icon} size={104} f={f} />
            </div>
            <Txt size={36} style={{marginTop: 10}}>{d.text}</Txt>
          </div>
        );
      })}
      <Who preset={p.preset} x={250} y={1080} w={580} mood="happy" pose={f < aLima ? 'wave' : 'point'} />
    </Camera>
  );
};

/* ================= 6 — #1 Pendengaran ================= */
export const Dengar: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSuara = at(p, 'suara', 1.6);
  const aTiada = at(p, 'tiada', 2.8);
  return (
    <Camera dur={p.dur} to={1.08} panX={-12}>
      <Room wall={`linear-gradient(180deg, ${C.night[0]} 0%, ${C.night[4]} 100%)`} floor={C.night[1]} floorY={1380} />
      {/* sudut kosong + gelombang bunyi */}
      <Glow x={860} y={1000} r={260} color={C.violet[3]} opacity={0.35} />
      <div style={{position: 'absolute', left: 780, top: 1110, width: 170, height: 230, borderRadius: '30px 30px 10px 10px', background: C.violet[0]}} />
      <div style={{position: 'absolute', left: 760, top: 1250, width: 210, height: 60, borderRadius: 20, background: C.violet[1]}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {[0, 1, 2, 3].map((i) => {
          const r = ((f * 3 + i * 45) % 180) + 30;
          return <circle key={i} cx={860} cy={1050} r={r} fill="none" stroke={C.yellow} strokeWidth={8} opacity={interpolate(r, [30, 210], [0.8, 0])} />;
        })}
      </svg>
      {f >= aSuara
        ? ['“Hei…”', '“Aisyah…”', '…'].map((t, i) => {
            const a = aSuara + i * 10;
            if (f < a) return null;
            const ff = f - a;
            return (
              <div key={i} style={{position: 'absolute', left: [660, 720, 640][i], top: [820, 920, 1010][i] - ff, opacity: popOpacity(ff) * interpolate(ff, [30, 50], [0.9, 0], clamp), transform: `scale(${popScale(ff)})`}}>
                <Pill text={t} bg="rgba(255,255,255,0.85)" color={C.navy} size={38} />
              </div>
            );
          })
        : null}
      <Who preset={AISYAH} x={40} y={900} w={500} mood="shock" pose="clasp" seed={2} style={{transform: `rotate(${Math.sin(f / 10) * 1.5}deg)`}} />
      <Pop at={aSuara} style={{left: 90, top: 520}}>
        <Sym icon="ear" text="Dengar suara" f={f} bg={C.violet[0]} w={480} />
      </Pop>
      <Pop at={aTiada} style={{left: 500, top: 660}}>
        <Sym icon="none" text="Tiada orang" bg={C.labelPink} w={460} />
      </Pop>
    </Camera>
  );
};

/* ================= 7 — #2 Penglihatan ================= */
export const Lihat: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aNampak = at(p, 'nampak', 1.4);
  const aBayang = at(p, 'bayang', 2.4);
  const flick = 0.22 + 0.14 * Math.sin(f / 3) + 0.08 * Math.sin(f / 1.3);
  return (
    <Camera dur={p.dur} to={1.1} origin="70% 55%">
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[0]} 0%, ${C.night[2]} 100%)`}} />
      {/* koridor perspektif */}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        <polygon points="0,1920 1080,1920 700,1180 520,1180" fill={C.night[3]} />
        <polygon points="0,500 520,980 520,1180 0,1920" fill={C.violet[0]} />
        <polygon points="1080,500 700,980 700,1180 1080,1920" fill={C.night[4]} />
        <rect x={520} y={980} width={180} height={200} fill="#9EC3FF" opacity={0.35} />
        {[0, 1, 2].map((i) => <rect key={i} x={560 - i * 90} y={560 + i * 140} width={60 + i * 50} height={14} rx={7} fill="#E8E4FF" opacity={0.5 - i * 0.1} />)}
      </svg>
      {/* bayang di hujung koridor */}
      {f >= aNampak ? (
        <div style={{position: 'absolute', left: 535, top: 965, opacity: flick * popOpacity(f - aNampak), filter: 'blur(3px) drop-shadow(0 0 20px #9EC3FF)'}}>
          <Avatar preset={FARID} width={150} silhouette pose="down" />
        </div>
      ) : null}
      <Who preset={FARID} x={20} y={950} w={500} mood="shock" pose="down" seed={6} />
      <Pop at={aNampak} style={{left: 470, top: 520}}>
        <Sym icon="eye" text="Nampak orang" bg={C.violet[0]} w={500} />
      </Pop>
      <Pop at={aBayang} style={{left: 470, top: 660}}>
        <Sym icon="person" text="…atau bayang" bg={C.navy} w={500} />
      </Pop>
    </Camera>
  );
};

/* ================= 8 — #3 Sentuhan ================= */
export const Sentuh: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSerangga = at(p, 'serangga', 1.4);
  const aKulit = at(p, 'kulit', 2.8);
  const n = 7;
  return (
    <Camera dur={p.dur} to={1.08} panY={-10}>
      <Room wall={`linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 100%)`} floor={C.night[1]} floorY={1460} />
      {/* lengan besar (dekat) */}
      <div style={{position: 'absolute', left: -60, top: 840, width: 760, height: 190, borderRadius: 95, background: '#C98F68', transform: 'rotate(-10deg)', boxShadow: 'inset 0 -26px 0 #AE7652'}}>
        <div style={{position: 'absolute', left: 660, top: -30, width: 250, height: 250, borderRadius: 125, background: '#C98F68', boxShadow: 'inset 0 -26px 0 #AE7652'}} />
        <div style={{position: 'absolute', left: 0, top: 0, width: 130, height: 190, borderRadius: '95px 0 0 95px', background: FARID.topColor}} />
        {f >= aSerangga
          ? new Array(n).fill(0).map((_, i) => {
              const a = aSerangga + i * 3;
              if (f < a) return null;
              const x = ((f - a) * 5 + i * 105) % 760;
              return (
                <div key={i} style={{position: 'absolute', left: x - 20, top: 46 + (i % 3) * 34 + Math.sin(f / 4 + i) * 6, opacity: 0.55 + 0.3 * Math.sin(f / 5 + i), filter: 'drop-shadow(0 0 6px #fff)'}}>
                  <Bug size={56} f={f + i * 3} />
                </div>
              );
            })
          : null}
      </div>
      <Who preset={FARID} x={560} y={980} w={460} mood={f >= aSerangga ? 'shock' : 'neutral'} pose="clasp" seed={6} style={{transform: `translateX(${f >= aKulit ? Math.sin(f * 1.8) * 5 : 0}px)`}} />
      <Pop at={aSerangga} style={{left: 90, top: 520}}>
        <Sym icon="bug" text="Rasa serangga merayap" bg={C.violet[0]} w={640} f={f} />
      </Pop>
      <Pop at={aKulit} style={{left: 90, top: 1120}}>
        <Pill text="…atas kulit" bg={C.labelPink} size={48} />
      </Pop>
    </Camera>
  );
};

/* ================= 9 — #4 Bau ================= */
export const Bau: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTerbakar = at(p, 'terbakar', 1.8);
  const aLain = at(p, 'orang lain', 2.7);
  return (
    <Camera dur={p.dur} to={1.08} panX={12}>
      <Room wall={`linear-gradient(180deg, ${C.night[3]} 0%, ${C.violet[2]} 100%)`} floor={C.night[1]} floorY={1440} />
      {/* dapur: kabinet + dapur gas (tutup) */}
      <div style={{position: 'absolute', left: 520, top: 1180, width: 560, height: 280, background: C.night[0], borderRadius: '20px 0 0 0'}} />
      <div style={{position: 'absolute', left: 520, top: 1150, width: 560, height: 44, background: '#E8E4FF', borderRadius: 12}} />
      <div style={{position: 'absolute', left: 640, top: 1120, width: 300, height: 34, background: '#2A2533', borderRadius: 10}} />
      {[0, 1].map((i) => <div key={i} style={{position: 'absolute', left: 680 + i * 160, top: 1110, width: 60, height: 14, borderRadius: 7, background: '#4A4458'}} />)}
      <Pop at={aLain} style={{left: 720, top: 1240}}>
        <Pill text="Dapur: OFF" bg={C.green} size={36} />
      </Pop>
      {/* asap khayalan di hidung */}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: f >= aTerbakar - 6 ? 1 : 0.35}}>
        {[0, 1, 2, 3].map((i) => {
          const yy = 1080 - ((f * 2.4 + i * 60) % 260);
          return <path key={i} d={`M ${300 + i * 40} ${yy} q 26 -30 0 -60 q -26 -30 0 -60`} stroke="#C9C4E2" strokeWidth={14} strokeLinecap="round" fill="none" opacity={interpolate((f * 2.4 + i * 60) % 260, [0, 60, 200, 260], [0, 0.7, 0.5, 0])} />;
        })}
      </svg>
      <Who preset={AISYAH} x={30} y={900} w={500} mood="shock" pose="chin" seed={2} />
      <Pop at={aTerbakar} style={{left: 90, top: 520}}>
        <Sym icon="smoke" text="Bau terbakar" bg={C.violet[0]} w={480} f={f} />
      </Pop>
      <Pop at={aLain} style={{left: 470, top: 660}}>
        <Sym icon="nose" text="Orang lain tak hidu" bg={C.labelPink} w={560} f={f} size={38} />
      </Pop>
    </Camera>
  );
};

/* ================= 10 — #5 Rasa ================= */
export const Rasa: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aPahit = at(p, 'pahit', 1.4);
  const aBesi = at(p, 'besi', 2.1);
  const aSebab = at(p, 'tanpa sebab', 2.7);
  return (
    <Camera dur={p.dur} to={1.08} panY={-12}>
      <NightSky seed={43} glow={C.violet[1]} />
      {/* meja */}
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 80, background: C.pink[2], borderRadius: 16}} />
      {/* gelas air */}
      <div style={{position: 'absolute', left: 760, top: 1220}}>
        <svg width={140} height={190} viewBox="0 0 140 190">
          <path d="M 14 10 L 126 10 L 112 182 L 28 182 Z" fill="#CFE8FF" opacity={0.55} />
          <path d="M 22 70 L 118 70 L 112 182 L 28 182 Z" fill="#9EC3FF" opacity={0.7} />
          <path d="M 14 10 L 126 10" stroke="#fff" strokeWidth={6} strokeLinecap="round" />
        </svg>
      </div>
      <Who preset={ABANG} x={170} y={940} w={520} mood={f >= aPahit ? 'angry' : 'neutral'} anger={0.25} pose="chin" seed={5} />
      {/* kilauan logam di mulut */}
      {f >= aBesi
        ? [0, 1, 2, 3].map((i) => {
            const ff = f - aBesi - i * 3;
            const ang = (i / 4) * Math.PI * 2 + f / 10;
            return <div key={i} style={{position: 'absolute', left: 430 + Math.cos(ang) * 110 - 12, top: 1240 + Math.sin(ang) * 60 - 12, width: 24, height: 24, background: '#D9E0EA', transform: 'rotate(45deg)', borderRadius: 4, opacity: interpolate(ff, [0, 4, 30, 40], [0, 1, 1, 0.6], clamp), boxShadow: '0 0 14px #fff'}} />;
          })
        : null}
      <Pop at={0} style={{left: 90, top: 500}}>
        <div style={{background: C.navy, borderRadius: 40, padding: 16, boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
          <Icon name="tongue" size={130} />
        </div>
      </Pop>
      <Pop at={aPahit} style={{left: 330, top: 520}}>
        <Pill text="Pahit" bg={C.green} size={52} />
      </Pop>
      <Pop at={aBesi} style={{left: 600, top: 520}}>
        <Pill text="Rasa besi" bg="#8F95A3" size={52} />
      </Pop>
      <Pop at={aSebab} style={{left: 330, top: 680}}>
        <Pill text="Tanpa sebab" bg={C.labelPink} size={52} />
      </Pop>
    </Camera>
  );
};

/* ================= 11 — Punca pelbagai: 6 jubin ================= */
export const Punca: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const tiles: {icon: IconName; text: string; a: number; bg: string}[] = [
    {icon: 'moon', text: 'Kurang tidur', a: at(p, 'kurang', 1.3), bg: C.violet[0]},
    {icon: 'thermo', text: 'Demam panas', a: at(p, 'demam', 2.2), bg: C.navy},
    {icon: 'pill', text: 'Ubat / dadah', a: at(p, 'ubat', 3.3), bg: C.navy},
    {icon: 'bolt', text: 'Epilepsi', a: at(p, 'epilepsi', 4.4), bg: C.violet[0]},
    {icon: 'fog', text: 'Demensia', a: at(p, 'demensia', 5.3), bg: C.violet[0]},
    {icon: 'brain', text: 'Skizofrenia', a: at(p, 'skizofrenia', 7.4), bg: C.navy},
  ];
  return (
    <Camera dur={p.dur} to={1.06} panY={-12}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 70%, ${C.pink[2]} 100%)`}} />
      <Glow x={540} y={900} r={560} color={C.violet[3]} opacity={0.3} />
      <Pop at={2} style={{left: 0, width: 1080, top: 500, display: 'flex', justifyContent: 'center'}}>
        <Pill text="PUNCA PELBAGAI" bg={C.yellow} color={C.navy} size={52} />
      </Pop>
      {tiles.map((t, i) => {
        if (f < t.a) return null;
        const ff = f - t.a;
        return (
          <div key={i} style={{position: 'absolute', left: 60 + (i % 2) * 490, top: 620 + Math.floor(i / 2) * 200, width: 470, height: 180, background: t.bg, borderRadius: 34, display: 'flex', alignItems: 'center', gap: 18, padding: '0 26px', transform: `scale(${popScale(ff)})`, opacity: popOpacity(ff), boxShadow: '0 16px 40px rgba(18,11,51,.5)'}}>
            <div style={{width: 110, height: 110, borderRadius: 30, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <Icon name={t.icon} size={86} f={f} />
            </div>
            <Txt size={40}>{t.text}</Txt>
          </div>
        );
      })}
      <Who preset={p.preset} x={290} y={1210} w={500} mood="neutral" pose="clasp" />
    </Camera>
  );
};

/* ================= 12 — Boleh jadi normal: nak terlelap / baru terjaga ================= */
export const Normal: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aNormal = at(p, 'normal', 0.8);
  const aLelap = at(p, 'terlelap', 2.6);
  const aJaga = at(p, 'terjaga', 3.3);
  const sun = interpolate(f, [aJaga - 4, aJaga + 12], [0, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.07} panX={10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[0]} 0%, ${C.violet[2]} 70%, ${C.violet[3]} 100%)`}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, #FFD27A00 0%, #FFD27A66 100%)`, opacity: sun}} />
      {/* bentuk mimpi terapung */}
      {new Array(9).fill(0).map((_, i) => {
        const x = 120 + random(`dx${i}`) * 840;
        const y = 820 + random(`dy${i}`) * 300 + Math.sin(f / 15 + i) * 20;
        const r = 18 + random(`dr${i}`) * 26;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: r * 2, height: r * 2, borderRadius: i % 3 ? r : 6, transform: `rotate(${f + i * 30}deg)`, background: [C.yellow, C.violet[4], C.pink[0]][i % 3], opacity: 0.35 + 0.2 * Math.sin(f / 9 + i)}} />;
      })}
      {/* katil + Aisyah baring */}
      <div style={{position: 'absolute', left: 60, top: 1300, width: 960, height: 200, borderRadius: 40, background: C.violet[1]}} />
      <div style={{position: 'absolute', left: 80, top: 1200, width: 280, height: 120, borderRadius: 50, background: '#fff', opacity: 0.9}} />
      <div style={{position: 'absolute', left: 120, top: 1000, transform: 'rotate(-78deg)', transformOrigin: 'center'}}>
        <Avatar preset={AISYAH} width={360} mood={f >= aJaga ? 'curious' : 'tired'} pose="clasp" seed={2} />
      </div>
      <div style={{position: 'absolute', left: 300, top: 1250, width: 720, height: 220, borderRadius: '90px 40px 30px 30px', background: C.pink[0]}} />
      <Txt size={70} color={C.violet[4]} style={{position: 'absolute', left: 430, top: 1080 - (f % 40), opacity: f < aJaga ? interpolate(f % 40, [0, 10, 30, 40], [0, 1, 1, 0]) : 0}}>z z</Txt>
      <Pop at={aNormal} style={{left: 0, width: 1080, top: 480, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: C.green, padding: '14px 34px 14px 16px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <Icon name="check" size={76} />
          <Txt size={50}>Boleh jadi normal</Txt>
        </div>
      </Pop>
      <Pop at={aLelap} style={{left: 70, top: 640}}>
        <Sym icon="moon" text="Nak terlelap" bg={C.navy} w={450} />
      </Pop>
      <Pop at={aJaga} style={{left: 560, top: 640}}>
        <Sym icon="sun" text="Baru terjaga" bg={C.violet[0]} w={450} />
      </Pop>
    </Camera>
  );
};

/* ================= 13 — Bila perlu jumpa doktor ================= */
export const Bila: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const items: {icon: IconName; text: string; a: number}[] = [
    {icon: 'repeat', text: 'Kerap berlaku', a: at(p, 'kerap', 0.8)},
    {icon: 'scared', text: 'Menakutkan', a: at(p, 'menakutkan', 1.4)},
    {icon: 'thermo', text: 'Demam & keliru', a: at(p, 'demam', 3.2)},
  ];
  const aTunggu = at(p, 'jangan', 4.4);
  const aJumpa = at(p, 'jumpa', 5.4);
  return (
    <Camera dur={p.dur} to={1.07} panY={-12}>
      <NightSky seed={17} glow={C.labelPink} />
      {items.map((it, i) => (
        <Pop key={i} at={it.a} style={{left: 450, top: 500 + i * 140}}>
          <Sym icon={it.icon} text={it.text} w={570} bg={i === 2 ? C.labelPink : C.navy} />
        </Pop>
      ))}
      <Pop at={aTunggu} style={{left: 450, top: 940}}>
        <Pill text="Jangan tunggu" bg={C.yellow} color={C.navy} size={52} />
      </Pop>
      <Pop at={aJumpa} style={{left: 450, top: 1080}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: C.green, padding: '14px 34px 14px 16px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <Icon name="cross" size={70} />
          <Txt size={50}>Jumpa doktor</Txt>
        </div>
      </Pop>
      <Who preset={p.preset} x={-20} y={900} w={540} mood={f >= aJumpa ? 'happy' : 'neutral'} pose={f >= aTunggu ? 'point' : 'clasp'} />
    </Camera>
  );
};

/* ================= 14 — Penutup: Klinik Nissa, Nilai ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKon = at(p, 'konsultasi', 2.4);
  const aSar = at(p, 'saringan', 3.3);
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
      <Pop at={aKon} style={{left: 0, width: 1080, top: 980, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Konsultasi &" bg={C.labelPink} size={44} />
      </Pop>
      <Pop at={aSar} style={{left: 0, width: 1080, top: 1070, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Saringan kesihatan mental" bg={C.labelPink} size={44} />
      </Pop>
      <Who preset={p.preset} x={340} y={1110} w={400} mood="happy" pose="wave" />
      <Pop at={aSar + 8} style={{left: 0, width: 1080, top: 1500, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: C.yellow, padding: '12px 34px 12px 14px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <Icon name="whatsapp" size={70} />
          <Txt size={50} color={C.navy}>012-608 1411</Txt>
        </div>
      </Pop>
      <div style={{position: 'absolute', left: 0, top: 1650, width: 1080, textAlign: 'center', opacity: interpolate(f, [aSar, aSar + 10], [0, 1], clamp)}}>
        <Txt size={28} color={C.violet[4]}>Video ini untuk pendidikan, bukan diagnosis.</Txt>
        <Txt size={28} color={C.violet[4]}>Watak Pakcik Hamid ialah ilustrasi.</Txt>
      </div>
    </Camera>
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro,
  keluarga: Keluarga,
  doktor: Doktor,
  mata: Mata,
  cbs: Cbs,
  apa: Apa,
  dengar: Dengar,
  lihat: Lihat,
  sentuh: Sentuh,
  bau: Bau,
  rasa: Rasa,
  punca: Punca,
  normal: Normal,
  bila: Bila,
  penutup: Penutup,
};
