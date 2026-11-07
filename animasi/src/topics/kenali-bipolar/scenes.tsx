import React from 'react';
import {AbsoluteFill, Img, interpolate, random, staticFile, useCurrentFrame, Easing} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset} from '../../components/Avatar';
import {Camera, clamp, Glow, NightSky, Pill, Pop, popScale, popOpacity} from '../../components/common';
import {WordsFile, wordTime} from '../../lib/timeline';

export type SceneProps = {preset: AvatarPreset; dur: number; wf: WordsFile; start: number; fps: number};

/* ---------- watak cerita (khas topik ini; bukan pencerita, jadi tidak dalam config/avatars.json) ---------- */
export const AINA: AvatarPreset = {
  id: 'aina', skin: '#E3AF88', skinShade: '#C99069', hair: 'hijab', hairColor: '#2A1C24', top: 'blouse', topColor: '#F4E4C9', topShade: '#D8C29E',
  hijabColor: '#EC8DB1', hijabShade: '#C8668E', accessory: null,
};
export const MAK: AvatarPreset = {
  id: 'mak', skin: '#C98F68', skinShade: '#AE7652', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#6157C5', topShade: '#4B3C9B',
  hijabColor: '#2BB3A3', hijabShade: '#1F8A7E', accessory: null,
};
export const AYAH: AvatarPreset = {
  id: 'ayah', skin: '#C58A60', skinShade: '#A9714B', hair: 'short', hairColor: '#24202B', top: 'kemeja', topColor: '#2F6FA8', topShade: '#24578A',
  accessory: null, stubble: true, moustache: true,
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

/* ---------- ikon flat ---------- */
type IconName = 'shoe' | 'bag' | 'phone' | 'moon' | 'crown' | 'speech' | 'cart' | 'calendar' | 'sad' | 'heartbreak' | 'down' | 'pill' | 'chat' | 'bed' | 'family' | 'rocket' | 'bulb' | 'battery';
export const Icon: React.FC<{name: IconName; size?: number; f?: number}> = ({name, size = 120, f = 0}) => {
  const s = size;
  const y = C.yellow, pk = C.labelPink, nv = C.navy, v = C.violet[1], g = C.green, w = '#fff';
  const body = (() => {
    switch (name) {
      case 'shoe':
        return (
          <g>
            <path d="M 14 70 L 20 34 L 46 34 Q 56 56 80 60 L 104 66 Q 112 70 110 84 L 14 84 Z" fill={pk} />
            <rect x={12} y={82} width={100} height={12} rx={6} fill={w} />
            <path d="M 50 44 L 62 40 M 56 52 L 68 48" stroke={w} strokeWidth={5} strokeLinecap="round" />
          </g>
        );
      case 'bag':
        return (
          <g>
            <path d="M 40 40 Q 40 14 60 14 Q 80 14 80 40" stroke={nv} strokeWidth={8} fill="none" />
            <path d="M 22 38 L 98 38 L 106 104 L 14 104 Z" fill={y} />
            <rect x={44} y={58} width={32} height={10} rx={5} fill={pk} />
          </g>
        );
      case 'phone':
        return (
          <g>
            <rect x={30} y={8} width={60} height={104} rx={14} fill={nv} />
            <rect x={36} y={20} width={48} height={78} rx={6} fill={C.violet[3]} />
            <circle cx={60} cy={104} r={4} fill={w} />
            <path d="M 46 40 L 74 40 M 46 54 L 68 54 M 46 68 L 74 68" stroke={w} strokeWidth={5} strokeLinecap="round" />
          </g>
        );
      case 'moon':
        return (
          <g>
            <path d="M 78 16 A 44 44 0 1 0 104 88 A 38 38 0 1 1 78 16 Z" fill={y} />
            <path d="M 88 30 L 100 30 L 88 44 L 100 44" stroke={w} strokeWidth={4} fill="none" strokeLinejoin="round" />
          </g>
        );
      case 'crown':
        return (
          <g>
            <path d="M 14 88 L 20 34 L 42 58 L 60 22 L 78 58 L 100 34 L 106 88 Z" fill={y} />
            <rect x={14} y={88} width={92} height={14} rx={6} fill={C.yellow} />
            <circle cx={60} cy={70} r={8} fill={pk} />
            <circle cx={34} cy={74} r={6} fill={g} />
            <circle cx={86} cy={74} r={6} fill={g} />
          </g>
        );
      case 'speech':
        return (
          <g>
            <path d="M 14 24 Q 14 12 26 12 L 94 12 Q 106 12 106 24 L 106 72 Q 106 84 94 84 L 48 84 L 26 106 L 30 84 L 26 84 Q 14 84 14 72 Z" fill={w} />
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={38 + i * 22} cy={48 + Math.sin(f / 3 + i) * 5} r={8} fill={pk} />
            ))}
          </g>
        );
      case 'cart':
        return (
          <g>
            <path d="M 8 20 L 26 20 L 40 80 L 98 80 L 110 36 L 32 36" stroke={nv} strokeWidth={8} fill="none" strokeLinejoin="round" strokeLinecap="round" />
            <rect x={44} y={42} width={22} height={30} rx={4} fill={pk} />
            <rect x={70} y={48} width={26} height={24} rx={4} fill={y} />
            <circle cx={48} cy={98} r={9} fill={nv} />
            <circle cx={90} cy={98} r={9} fill={nv} />
          </g>
        );
      case 'calendar':
        return (
          <g>
            <rect x={14} y={20} width={92} height={88} rx={14} fill={w} />
            <rect x={14} y={20} width={92} height={26} rx={12} fill={pk} />
            <rect x={14} y={34} width={92} height={12} fill={pk} />
            <rect x={32} y={10} width={10} height={22} rx={5} fill={nv} />
            <rect x={78} y={10} width={10} height={22} rx={5} fill={nv} />
            {[0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c2) => <rect key={`${r}${c2}`} x={24 + c2 * 20} y={54 + r * 13} width={12} height={8} rx={2} fill={r * 4 + c2 < 7 ? pk : C.violet[3]} />))}
          </g>
        );
      case 'sad':
        return (
          <g>
            <circle cx={60} cy={60} r={48} fill="#7FA6E8" />
            <circle cx={44} cy={52} r={6} fill={nv} />
            <circle cx={76} cy={52} r={6} fill={nv} />
            <path d="M 40 84 Q 60 66 80 84" stroke={nv} strokeWidth={7} strokeLinecap="round" fill="none" />
            <path d="M 80 62 Q 86 74 80 80 Q 74 74 80 62 Z" fill={w} />
          </g>
        );
      case 'heartbreak':
        return (
          <g>
            <path d="M 60 104 L 16 58 Q 2 40 16 24 Q 34 8 54 26 L 60 32 L 52 52 L 66 64 L 58 84 L 72 60 L 60 50 L 66 32 L 66 26 Q 86 8 104 24 Q 118 40 104 58 Z" fill="#7FA6E8" />
          </g>
        );
      case 'down':
        return (
          <g>
            <circle cx={60} cy={60} r={48} fill={C.violet[0]} />
            <path d="M 60 30 L 60 82 M 40 64 L 60 86 L 80 64" stroke={w} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        );
      case 'pill':
        return (
          <g>
            <rect x={30} y={30} width={60} height={80} rx={12} fill={w} />
            <rect x={26} y={12} width={68} height={24} rx={8} fill={g} />
            <rect x={38} y={52} width={44} height={30} rx={6} fill={C.violet[3]} />
            <rect x={56} y={56} width={8} height={22} rx={3} fill={w} />
            <rect x={49} y={63} width={22} height={8} rx={3} fill={w} />
          </g>
        );
      case 'chat':
        return (
          <g>
            <path d="M 8 20 Q 8 10 18 10 L 70 10 Q 80 10 80 20 L 80 52 Q 80 62 70 62 L 34 62 L 18 78 L 20 62 Q 8 62 8 52 Z" fill={w} />
            <path d="M 112 50 Q 112 40 102 40 L 52 40 Q 42 40 42 50 L 42 82 Q 42 92 52 92 L 86 92 L 102 108 L 100 92 Q 112 92 112 82 Z" fill={g} />
          </g>
        );
      case 'bed':
        return (
          <g>
            <rect x={8} y={60} width={104} height={30} rx={8} fill={C.violet[3]} />
            <rect x={8} y={44} width={34} height={22} rx={8} fill={w} />
            <rect x={8} y={88} width={10} height={20} rx={3} fill={nv} />
            <rect x={102} y={88} width={10} height={20} rx={3} fill={nv} />
            <circle cx={88} cy={28} r={20} fill={w} />
            <path d="M 88 16 L 88 28 L 96 32" stroke={nv} strokeWidth={4} strokeLinecap="round" fill="none" />
          </g>
        );
      case 'family':
        return (
          <g>
            <path d="M 60 108 L 20 68 Q 6 50 20 34 Q 38 18 56 36 L 60 40 L 64 36 Q 82 18 100 34 Q 114 50 100 68 Z" fill={pk} />
            <circle cx={44} cy={58} r={9} fill={w} />
            <circle cx={76} cy={58} r={9} fill={w} />
            <circle cx={60} cy={72} r={7} fill={w} />
          </g>
        );
      case 'rocket':
        return (
          <g>
            <path d="M 60 6 Q 90 30 86 78 L 34 78 Q 30 30 60 6 Z" fill={w} />
            <circle cx={60} cy={44} r={12} fill={C.violet[1]} />
            <path d="M 34 60 L 16 88 L 38 80 Z M 86 60 L 104 88 L 82 80 Z" fill={pk} />
            <path d="M 44 80 Q 60 120 76 80 Z" fill={y} />
          </g>
        );
      case 'bulb':
        return (
          <g>
            <circle cx={60} cy={48} r={36} fill={y} />
            <rect x={44} y={78} width={32} height={22} rx={6} fill={C.violet[3]} />
            <rect x={48} y={102} width={24} height={8} rx={4} fill={C.violet[3]} />
            <path d="M 50 56 L 60 40 L 70 56" stroke={w} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      case 'battery':
        return (
          <g>
            <rect x={8} y={34} width={96} height={52} rx={10} fill="none" stroke={w} strokeWidth={7} />
            <rect x={104} y={50} width={10} height={20} rx={3} fill={w} />
            <rect x={18} y={44} width={76 * Math.min(1, f / 18)} height={32} rx={5} fill={g} />
          </g>
        );
    }
  })();
  return (
    <svg width={s} height={s} viewBox="0 0 120 120" style={{overflow: 'visible'}}>
      {body}
    </svg>
  );
};

/* kad simptom: ikon + teks */
const Sym: React.FC<{icon: IconName; text: string; bg?: string; color?: string; w?: number; f?: number}> = ({icon, text, bg = C.navy, color = '#fff', w = 520, f = 0}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 20, width: w, background: bg, borderRadius: 34, padding: '16px 26px 16px 18px', boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
    <div style={{width: 92, height: 92, borderRadius: 26, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
      <Icon name={icon} size={76} f={f} />
    </div>
    <Txt size={42} color={color}>{text}</Txt>
  </div>
);

/* belon kata (ekor di bawah kiri / kanan) */
const Bubble: React.FC<{children: React.ReactNode; tail?: 'left' | 'right'; bg?: string; color?: string; size?: number}> = ({children, tail = 'left', bg = '#fff', color = C.navy, size = 46}) => (
  <div style={{position: 'relative', background: bg, color, borderRadius: 40, padding: `${size * 0.45}px ${size * 0.7}px`, fontFamily: FONT, fontWeight: 800, fontSize: size, lineHeight: 1.12, boxShadow: '0 14px 34px rgba(18,11,51,.45)', whiteSpace: 'nowrap'}}>
    {children}
    <div style={{position: 'absolute', bottom: -26, [tail === 'left' ? 'left' : 'right']: 60, width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: `30px solid ${bg}`}} />
  </div>
);

/* kotak parcel */
const Box: React.FC<{w: number; h: number; rot?: number; tone?: number}> = ({w, h, rot = 0, tone = 0}) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{transform: `rotate(${rot}deg)`, overflow: 'visible'}}>
    <rect x={0} y={0} width={w} height={h} rx={10} fill={tone ? '#C98B55' : '#D9A066'} />
    <rect x={0} y={0} width={w} height={h * 0.22} rx={8} fill={tone ? '#B67845' : '#C98B55'} />
    <rect x={w / 2 - 14} y={0} width={28} height={h} fill="#F2D7A6" opacity={0.85} />
    <rect x={w * 0.62} y={h * 0.55} width={w * 0.28} height={h * 0.22} rx={4} fill="#fff" />
  </svg>
);

/* lencana tempoh minimum */
const Weeks: React.FC<{n: number; bg: string}> = ({n, bg}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 16, background: bg, borderRadius: 36, padding: '14px 30px 14px 16px', boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
    <Icon name="calendar" size={84} />
    <div>
      <Txt size={32} color={C.navy}>Sekurang-kurangnya</Txt>
      <Txt size={56} color={C.navy}>{n} MINGGU</Txt>
    </div>
  </div>
);

/* kertas lantai + dinding bilik */
const Room: React.FC<{wall: string; floor: string; floorY?: number}> = ({wall, floor, floorY = 1260}) => (
  <>
    <AbsoluteFill style={{background: wall}} />
    <div style={{position: 'absolute', left: 0, top: floorY, width: 1080, height: 1920 - floorY, background: floor}} />
  </>
);

/* ================= 0 — Intro: tajuk + Aina, kalendar 1→7 hari ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSem = at(p, 'seminggu', 0.4);
  const aBer = at(p, 'berubah', 3.3);
  const day = Math.round(interpolate(f, [aSem, aSem + 40], [1, 7], clamp));
  const titleOut = interpolate(f, [aBer - 4, aBer + 6], [1, 0], clamp);
  return (
    <Camera dur={p.dur} to={1.07} panY={-20}>
      <NightSky seed={5} glow={C.pink[0]} />
      <Glow x={540} y={1250} r={520} color={C.pink[0]} opacity={0.35} />
      {/* tajuk (kelihatan pada frame 0) */}
      <div style={{position: 'absolute', top: 470, width: 1080, textAlign: 'center', opacity: titleOut, transform: `translateY(${(1 - titleOut) * -30}px)`}}>
        <Txt size={58} color={C.violet[4]}>KENALI</Txt>
        <Txt size={150} color={C.yellow} style={{lineHeight: 1, textShadow: '0 8px 0 rgba(18,11,51,.6)'}}>BIPOLAR</Txt>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 16}}>
          <Pill text="MOOD DISORDER" bg={C.labelPink} size={62} />
        </div>
      </div>
      {/* kalendar */}
      <Pop at={aSem} style={{left: 70, top: 900}}>
        <div style={{width: 250, borderRadius: 30, overflow: 'hidden', background: '#fff', boxShadow: '0 20px 50px rgba(18,11,51,.55)', transform: `rotate(-6deg)`}}>
          <div style={{background: C.labelPink, textAlign: 'center', padding: '10px 0'}}>
            <Txt size={36}>HARI</Txt>
          </div>
          <Txt size={130} color={C.navy} style={{textAlign: 'center', lineHeight: 1.15}}>{day}</Txt>
        </div>
      </Pop>
      {/* kilauan "berubah" */}
      {f >= aBer
        ? [0, 1, 2, 3, 4, 5].map((i) => {
            const ff = f - aBer - i * 2;
            const ang = (i / 6) * Math.PI * 2;
            const r = 230 + ff * 6;
            return <div key={i} style={{position: 'absolute', left: 640 + Math.cos(ang) * r - 18, top: 1130 + Math.sin(ang) * r - 18, width: 36, height: 36, background: C.yellow, transform: 'rotate(45deg)', borderRadius: 6, opacity: interpolate(ff, [0, 4, 20, 30], [0, 1, 1, 0], clamp)}} />;
          })
        : null}
      <Who preset={AINA} x={370} y={890} w={540} mood={f >= aBer ? 'happy' : 'neutral'} pose={f >= aBer ? 'wave' : 'clasp'} seed={1} />
    </Camera>
  );
};

/* ================= 1 — Parcel hari-hari: kotak bertimbun, kasut / beg / telefon ================= */
export const Parcel: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const items: {icon: IconName; text: string; at: number; x: number; y: number}[] = [
    {icon: 'shoe', text: 'Kasut baru', at: at(p, 'kasut', 2.2), x: 60, y: 500},
    {icon: 'bag', text: 'Beg baru', at: at(p, 'beg', 3.3), x: 600, y: 600},
    {icon: 'phone', text: 'Telefon baru', at: at(p, 'telefon', 4.2), x: 90, y: 760},
  ];
  const boxes = [
    {x: 620, w: 200, h: 150, r: -3},
    {x: 820, w: 180, h: 140, r: 4},
    {x: 680, w: 170, h: 130, r: 8},
    {x: 860, w: 150, h: 120, r: -6},
    {x: 740, w: 140, h: 110, r: 2},
  ];
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <Room wall={`linear-gradient(180deg, ${C.night[3]} 0%, ${C.violet[0]} 100%)`} floor={C.night[2]} floorY={1420} />
      {/* pintu rumah */}
      <div style={{position: 'absolute', left: 640, top: 760, width: 380, height: 680, background: C.night[0], borderRadius: '24px 24px 0 0'}} />
      <div style={{position: 'absolute', left: 664, top: 784, width: 332, height: 656, background: C.pink[2], borderRadius: '16px 16px 0 0'}} />
      <div style={{position: 'absolute', left: 940, top: 1110, width: 26, height: 26, borderRadius: 13, background: C.yellow}} />
      {/* kotak jatuh & bertimbun */}
      {boxes.map((b, i) => {
        const a = 2 + i * 7;
        const stackY = [1270, 1280, 1140, 1160, 1020][i];
        const yy = interpolate(f, [a, a + 9], [stackY - 700, stackY], {...clamp, easing: Easing.in(Easing.quad)});
        const sq = f >= a + 9 && f < a + 13 ? 0.92 : 1;
        if (f < a) return null;
        return (
          <div key={i} style={{position: 'absolute', left: b.x - 40, top: yy, transform: `scaleY(${sq})`, transformOrigin: 'bottom'}}>
            <Box w={b.w} h={b.h} rot={b.r} tone={i % 2} />
          </div>
        );
      })}
      <Who preset={AINA} x={150} y={930} w={520} mood="happy" pose={f > 40 ? 'wave' : 'clasp'} seed={1} />
      {items.map((it, i) => (
        <Pop key={i} at={it.at} style={{left: it.x, top: it.y + Math.sin(f / 9 + i) * 8}}>
          <Sym icon={it.icon} text={it.text} w={430} bg={[C.labelPink, C.violet[2], C.navy][i]} />
        </Pop>
      ))}
    </Camera>
  );
};

/* ================= 2 — Kad kredit hampir penuh, Aina ketawa ================= */
export const Kad: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aPenuh = at(p, 'penuh', 1.0);
  const aKetawa = at(p, 'ketawa', 2.8);
  const aRileks = at(p, 'rilekslah', 3.6);
  const aBisnes = at(p, 'bisnes', 5.5);
  const fill = interpolate(f, [4, aPenuh + 6], [0.12, 0.95], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const barCol = fill > 0.8 ? C.labelPink : fill > 0.5 ? C.yellow : C.green;
  const shake = f >= aPenuh && f < aPenuh + 14 ? Math.sin(f * 2.4) * 6 : 0;
  const cardOut = interpolate(f, [aRileks - 6, aRileks + 6], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <NightSky seed={9} glow={C.violet[1]} />
      {/* kad kredit */}
      <div style={{position: 'absolute', left: 150 - cardOut * 70, top: 480 - cardOut * 20, transform: `rotate(${-6 + shake}deg) scale(${1 - cardOut * 0.32})`, transformOrigin: 'left top'}}>
        <div style={{width: 640, height: 400, borderRadius: 40, background: `linear-gradient(135deg, ${C.violet[2]} 0%, ${C.pink[1]} 100%)`, boxShadow: '0 30px 70px rgba(18,11,51,.6)', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', right: -80, top: -80, width: 280, height: 280, borderRadius: 140, background: 'rgba(255,255,255,0.12)'}} />
          <div style={{position: 'absolute', left: 50, top: 70, width: 96, height: 72, borderRadius: 14, background: C.yellow}} />
          <Txt size={40} style={{position: 'absolute', left: 50, top: 190, letterSpacing: 4}}>•••• •••• •••• 2026</Txt>
          {/* had kredit */}
          <div style={{position: 'absolute', left: 50, top: 280, width: 540, height: 48, borderRadius: 24, background: 'rgba(18,11,51,0.45)'}}>
            <div style={{width: `${fill * 100}%`, height: '100%', borderRadius: 24, background: barCol}} />
          </div>
          <Txt size={34} style={{position: 'absolute', left: 50, top: 336}}>Had kredit {Math.round(fill * 100)}%</Txt>
        </div>
      </div>
      <Pop at={aPenuh} style={{left: 520, top: 430}}>
        <Pill text="HAMPIR PENUH!" bg={C.labelPink} size={46} style={{transform: `rotate(${f >= aRileks ? 0 : 6}deg)`, opacity: 1 - cardOut * 0.0}} />
      </Pop>
      {/* Mak terkejut */}
      <Who preset={MAK} x={620} y={1030} w={420} mood={f >= aRileks ? 'sad' : 'shock'} pose="clasp" seed={4} />
      {/* Aina ketawa */}
      <Who preset={AINA} x={60} y={960} w={520} mood={f >= aKetawa ? 'happy' : 'neutral'} pose={f >= aBisnes ? 'point' : 'down'} seed={1} style={{transform: `translateY(${f >= aKetawa ? -Math.abs(Math.sin(f / 4)) * 14 : 0}px)`}} />
      {f >= aKetawa && f < aRileks
        ? ['HA', 'HA', 'HA'].map((t, i) => (
            <Pop key={i} at={aKetawa + i * 5} style={{left: 90 + i * 150, top: 880 - i * 30 + Math.sin(f / 3 + i) * 10}}>
              <Txt size={64} color={C.yellow} style={{transform: `rotate(${[-12, 6, -4][i]}deg)`}}>{t}</Txt>
            </Pop>
          ))
        : null}
      <Pop at={aRileks} style={{left: 120, top: 700}}>
        <Bubble tail="left">"Rilekslah mak!"</Bubble>
      </Pop>
      <Pop at={aBisnes} style={{left: 440, top: 840}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: C.yellow, padding: '14px 28px 14px 16px', borderRadius: 40, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <div style={{transform: `translateY(${-Math.abs(Math.sin(f / 5)) * 10}px)`}}>
            <Icon name="rocket" size={80} />
          </div>
          <Txt size={44} color={C.navy}>Bisnes besar!</Txt>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 3 — Malam tidur 2 jam → pagi penuh tenaga → cakap laju → cepat marah ================= */
export const Malam: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTidur = at(p, 'tidur', 0.9);
  const aPagi = at(p, 'pagi', 2.5);
  const aTenaga = at(p, 'tenaga', 3.6);
  const aCakap = at(p, 'cakap laju', 4.3);
  const aIdea = at(p, 'idea', 5.4);
  const aMarah = at(p, 'cepat marah', 6.6);
  const day = interpolate(f, [aPagi - 4, aPagi + 16], [0, 1], {...clamp, easing: Easing.inOut(Easing.sin)});
  const anger = interpolate(f, [aMarah, aMarah + 18], [0, 1], clamp);
  const mood = f >= aMarah ? 'angry' : f >= aPagi ? 'happy' : 'shock';
  const mix = (a: string, b: string) => {
    const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
    const ch = (sh: number) => Math.round(((pa >> sh) & 255) * (1 - day) + ((pb >> sh) & 255) * day);
    return `rgb(${ch(16)},${ch(8)},${ch(0)})`;
  };
  return (
    <Camera dur={p.dur} to={1.09} panX={15}>
      <Room wall={`linear-gradient(180deg, ${mix(C.night[0], C.violet[3])} 0%, ${mix(C.night[3], C.pink[0])} 100%)`} floor={mix(C.night[1], C.violet[0])} floorY={1400} />
      {/* tingkap: bulan turun, matahari naik */}
      <div style={{position: 'absolute', left: 600, top: 480, width: 400, height: 420, borderRadius: 30, overflow: 'hidden', background: mix('#141040', '#FFD27A'), border: `18px solid ${C.night[0]}`}}>
        <div style={{position: 'absolute', left: 230, top: 70 + day * 300, width: 100, height: 100, borderRadius: 50, background: '#F4F1FF', boxShadow: '0 0 40px #fff', opacity: 1 - day}} />
        <div style={{position: 'absolute', left: 120, top: 380 - day * 280, width: 150, height: 150, borderRadius: 75, background: C.yellow, boxShadow: `0 0 70px ${C.yellow}`}} />
        {new Array(8).fill(0).map((_, i) => (
          <div key={i} style={{position: 'absolute', left: random(`ws${i}`) * 340, top: random(`wy${i}`) * 300, width: 6, height: 6, borderRadius: 3, background: '#fff', opacity: (1 - day) * (0.4 + 0.6 * Math.abs(Math.sin(f / 10 + i)))}} />
        ))}
        <div style={{position: 'absolute', left: 172, top: 0, width: 20, height: 420, background: C.night[0]}} />
      </div>
      {/* jam dinding */}
      <div style={{position: 'absolute', left: 90, top: 500}}>
        <svg width={220} height={220} viewBox="0 0 220 220">
          <circle cx={110} cy={110} r={100} fill="#fff" stroke={C.navy} strokeWidth={14} />
          <line x1={110} y1={110} x2={110} y2={50} stroke={C.navy} strokeWidth={10} strokeLinecap="round" transform={`rotate(${interpolate(f, [0, p.dur], [0, 720])} 110 110)`} />
          <line x1={110} y1={110} x2={110} y2={72} stroke={C.labelPink} strokeWidth={12} strokeLinecap="round" transform={`rotate(${90 + day * 120} 110 110)`} />
          <circle cx={110} cy={110} r={10} fill={C.navy} />
        </svg>
      </div>
      <Pop at={aTidur} style={{left: 60, top: 740}}>
        <Pill text={f >= aPagi ? '5:00 pagi' : 'Tidur 2 jam'} bg={C.navy} color={C.yellow} size={42} />
      </Pop>
      {/* katil */}
      <div style={{position: 'absolute', left: 40, top: 1300, width: 1000, height: 150, borderRadius: 30, background: C.violet[2]}} />
      <div style={{position: 'absolute', left: 40, top: 1240, width: 240, height: 90, borderRadius: 30, background: '#fff', opacity: 0.85}} />
      <Who preset={AINA} x={250} y={890} w={520} mood={mood} pose={f >= aCakap ? 'wave' : f >= aPagi ? 'point' : 'clasp'} anger={anger} seed={1} style={{transform: `translateY(${f >= aPagi && f < aMarah ? -Math.abs(Math.sin(f / 5)) * 20 : 0}px)`}} />
      {/* telefon menyala waktu malam */}
      {f < aPagi ? <div style={{position: 'absolute', left: 440, top: 1500, width: 200, height: 120, borderRadius: 60, background: `radial-gradient(circle, ${C.violet[3]}aa 0%, ${C.violet[3]}00 70%)`}} /> : null}
      <Pop at={aTenaga} style={{left: 660, top: 960}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10, background: C.navy, padding: '12px 26px 12px 14px', borderRadius: 36}}>
          <Icon name="battery" size={78} f={f - aTenaga} />
          <Txt size={40} color={C.green}>100%</Txt>
        </div>
      </Pop>
      {/* cakap laju: belon bertubi-tubi */}
      {f >= aCakap && f < aMarah
        ? [0, 1, 2, 3, 4, 5].map((i) => {
            const a = aCakap + i * 6;
            if (f < a) return null;
            const ff = f - a;
            return (
              <div key={i} style={{position: 'absolute', left: [80, 640, 110, 690, 60, 620][i], top: [1030, 1110, 1160, 1230, 900, 860][i] - ff * 2, transform: `scale(${popScale(ff)})`, opacity: popOpacity(ff) * interpolate(ff, [30, 44], [1, 0], clamp)}}>
                <Pill text={['bla bla', 'lepas tu!', 'tau tak?', 'jom!', 'cepat!', 'bla bla'][i]} bg="#fff" color={C.navy} size={38} />
              </div>
            );
          })
        : null}
      {/* idea melompat-lompat */}
      {f >= aIdea && f < aMarah
        ? [0, 1, 2].map((i) => {
            const jump = Math.abs(Math.sin((f - aIdea) / 5 + i * 1.3)) * 90;
            return (
              <div key={i} style={{position: 'absolute', left: 300 + i * 150, top: 760 - jump, transform: `scale(${popScale(f - aIdea - i * 3)})`, opacity: popOpacity(f - aIdea - i * 3)}}>
                <Icon name="bulb" size={100} />
              </div>
            );
          })
        : null}
      {/* marah */}
      {f >= aMarah ? (
        <>
          <Pop at={aMarah} style={{left: 560, top: 780}}>
            <Bubble tail="left" bg={C.labelPink} color="#fff" size={46}>"Jangan kacau!"</Bubble>
          </Pop>
          <Pop at={aMarah + 4} style={{left: 140, top: 820}}>
            <Txt size={90} color={C.labelPink} style={{transform: `rotate(-10deg) translateY(${Math.sin(f) * 4}px)`}}>!!</Txt>
          </Pop>
        </>
      ) : null}
    </Camera>
  );
};

/* ================= 4 — Mak & ayah risau → bawa Aina ke klinik ================= */
export const Risau: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aAkhir = at(p, 'akhirnya', 2.0);
  const aDoktor = at(p, 'doktor', 3.8);
  const pan = interpolate(f, [aAkhir - 2, aAkhir + 16], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const walk = interpolate(f, [aAkhir + 10, p.dur], [0, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.06}>
      <AbsoluteFill style={{transform: `translateX(${-pan * 1080}px)`}}>
        {/* ruang tamu */}
        <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, background: `linear-gradient(180deg, ${C.violet[0]} 0%, ${C.night[4]} 100%)`}} />
        <div style={{position: 'absolute', left: 0, top: 1360, width: 1080, height: 600, background: C.night[2]}} />
        <div style={{position: 'absolute', left: 820, top: 520, width: 150, height: 104, borderRadius: '20px 20px 60px 60px', background: C.yellow, boxShadow: `0 40px 120px ${C.yellow}88`}} />
        <div style={{position: 'absolute', left: 888, top: 624, width: 14, height: 740, background: C.night[0]}} />
        {/* bingkai gambar Aina */}
        <div style={{position: 'absolute', left: 110, top: 520, width: 230, height: 190, borderRadius: 16, background: C.yellow, padding: 12, transform: 'rotate(-4deg)'}}>
          <div style={{width: '100%', height: '100%', borderRadius: 8, background: C.violet[3], overflow: 'hidden', display: 'flex', justifyContent: 'center'}}>
            <Avatar preset={AINA} width={170} mood="happy" />
          </div>
        </div>
        {/* sofa */}
        <div style={{position: 'absolute', left: 60, top: 1250, width: 960, height: 230, borderRadius: 60, background: C.pink[2]}} />
        <Who preset={AYAH} x={90} y={900} w={430} mood="sad" pose="clasp" seed={5} />
        <Who preset={MAK} x={540} y={920} w={420} mood="sad" pose="clasp" seed={4} />
        {/* titis peluh & awan fikiran */}
        {[0, 1].map((i) => {
          const ff = (f + i * 20) % 40;
          return <div key={i} style={{position: 'absolute', left: [470, 900][i], top: [930, 950][i] + ff * 2, width: 26, height: 38, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: '#8EC9FF', opacity: interpolate(ff, [0, 6, 30, 40], [0, 1, 1, 0])}} />;
        })}
        <Pop at={8} style={{left: 360, top: 520}}>
          <div style={{width: 320, height: 230, borderRadius: 120, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: '0 14px 34px rgba(18,11,51,.4)'}}>
            <Icon name="bag" size={80} />
            <Icon name="moon" size={70} />
            <Txt size={80} color={C.labelPink}>?</Txt>
          </div>
          <div style={{position: 'absolute', left: 90, top: 236, width: 44, height: 44, borderRadius: 22, background: '#fff'}} />
          <div style={{position: 'absolute', left: 60, top: 290, width: 26, height: 26, borderRadius: 13, background: '#fff'}} />
        </Pop>
        {/* luar klinik */}
        <div style={{position: 'absolute', left: 1080, top: 0, width: 1080, height: 1920, background: `linear-gradient(180deg, ${C.violet[3]} 0%, ${C.pink[0]} 100%)`}} />
        <div style={{position: 'absolute', left: 1080, top: 1440, width: 1080, height: 500, background: C.night[2]}} />
        <div style={{position: 'absolute', left: 1080 + 120, top: 640, width: 840, height: 800, background: '#F5EEF9', borderRadius: '30px 30px 0 0'}} />
        <div style={{position: 'absolute', left: 1080 + 160, top: 680, width: 760, height: 150, background: C.navy, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22}}>
          <Img src={staticFile('brand/klinik_nissa_logo.png')} style={{height: 120, borderRadius: 12}} />
          <Txt size={58} color={C.yellow}>
            KLINIK <span style={{color: '#4FD8D8'}}>NISSA</span>
          </Txt>
        </div>
        <div style={{position: 'absolute', left: 1080 + 420, top: 980, width: 240, height: 460, background: '#4FD8D8', borderRadius: '20px 20px 0 0', opacity: 0.85}} />
        {[0, 1].map((i) => <div key={i} style={{position: 'absolute', left: 1080 + [190, 720][i], top: 960, width: 170, height: 200, borderRadius: 18, background: C.violet[3]}} />)}
        {/* keluarga berjalan masuk */}
        <div style={{position: 'absolute', left: 1080 + 40 + walk * 260, top: 1070, display: 'flex', alignItems: 'flex-end', transform: `translateY(${-Math.abs(Math.sin(f / 4)) * 10}px)`}}>
          <Avatar preset={AYAH} width={260} mood="neutral" pose="down" seed={5} />
          <div style={{marginLeft: -60}}>
            <Avatar preset={AINA} width={250} mood="neutral" pose="down" seed={1} />
          </div>
          <div style={{marginLeft: -60}}>
            <Avatar preset={MAK} width={250} mood="neutral" pose="down" seed={4} />
          </div>
        </div>
      </AbsoluteFill>
      <Pop at={aDoktor} style={{left: 330, top: 520}}>
        <Pill text="Jumpa doktor" bg={C.green} size={48} />
      </Pop>
    </Camera>
  );
};

/* ================= 5 — Penilaian doktor → episod mania → diagnosis ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSah = at(p, 'sahkan', 1.6);
  const aMania = at(p, 'episod', 3.6);
  const aDiag = at(p, 'diagnosisnya', 4.8);
  const checks = ['Mood', 'Tidur', 'Perbelanjaan', 'Tenaga'];
  const stamp = f >= aDiag ? interpolate(f - aDiag, [0, 6, 10], [1.7, 0.94, 1], clamp) : 0;
  return (
    <Camera dur={p.dur} to={1.08} panY={-10}>
      <Room wall={`linear-gradient(180deg, ${C.night[3]} 0%, ${C.violet[2]} 100%)`} floor={C.night[1]} floorY={1420} />
      <Glow x={300} y={1000} r={460} color={C.violet[3]} opacity={0.35} />
      {/* papan klip */}
      <Pop at={4} style={{left: 600, top: 530}}>
        <div style={{width: 400, background: '#fff', borderRadius: 30, padding: '60px 30px 26px', position: 'relative', boxShadow: '0 20px 50px rgba(18,11,51,.5)', transform: 'rotate(4deg)'}}>
          <div style={{position: 'absolute', left: 130, top: -20, width: 140, height: 56, borderRadius: 16, background: C.navy}} />
          <Txt size={34} color={C.violet[2]} style={{marginBottom: 12}}>PENILAIAN</Txt>
          {checks.map((c2, i) => {
            const a = 10 + i * 9;
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
      {/* meja */}
      <div style={{position: 'absolute', left: 0, top: 1330, width: 1080, height: 70, background: C.pink[2], borderRadius: 16}} />
      <Who preset={p.preset} x={20} y={840} w={520} mood={f >= aSah ? 'neutral' : 'curious'} pose={f >= aSah ? 'clasp' : 'chin'} />
      <Who preset={AINA} x={640} y={1050} w={360} mood={f >= aDiag ? 'shock' : 'neutral'} pose="clasp" seed={1} />
      <Pop at={aMania} style={{left: 560, top: 960}}>
        <Pill text="Episod MANIA" bg={C.yellow} color={C.navy} size={50} />
      </Pop>
      {/* cop diagnosis */}
      {f >= aDiag ? (
        <div style={{position: 'absolute', left: 90, top: 570, width: 900, display: 'flex', justifyContent: 'center', transform: `scale(${stamp}) rotate(-5deg)`, opacity: interpolate(f - aDiag, [0, 3], [0, 1], clamp)}}>
          <div style={{background: C.navy, border: `10px solid ${C.labelPink}`, borderRadius: 40, padding: '26px 44px', textAlign: 'center', boxShadow: '0 30px 70px rgba(18,11,51,.6)'}}>
            <Txt size={38} color={C.violet[4]}>DIAGNOSIS</Txt>
            <Txt size={96} color={C.yellow} style={{lineHeight: 1.02}}>BIPOLAR</Txt>
            <Txt size={58}>MOOD DISORDER</Txt>
          </div>
        </div>
      ) : null}
    </Camera>
  );
};

/* ================= 6 — Apa itu bipolar: bukan "moody", dua kutub ================= */
export const Apa: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aMoody = at(p, 'moody', 2.6);
  const aGang = at(p, 'gangguan', 4.4);
  const aEks = at(p, 'ekstrem', 6.6);
  const aKutub = at(p, 'dua kutub', 7.6);
  const amp = interpolate(f, [aGang, aEks + 10], [26, 150], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const draw = interpolate(f, [aGang, aGang + 30], [0, 1], clamp);
  const moodyOut = interpolate(f, [aGang - 6, aGang + 4], [1, 0], clamp);
  const pts: string[] = [];
  for (let x = 0; x <= 900; x += 10) {
    const ph = x / 900;
    const y = 300 + Math.sin(ph * Math.PI * 3.2 - f / 14) * amp * (0.6 + 0.4 * Math.sin(ph * 3));
    pts.push(`${x === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`);
  }
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <NightSky seed={13} glow={C.violet[2]} />
      {/* bukan sekadar moody */}
      {f >= aMoody && moodyOut > 0 ? (
        <div style={{position: 'absolute', left: 290, top: 560, opacity: moodyOut, transform: `scale(${popScale(f - aMoody)})`}}>
          <Bubble tail="left" size={70}>"moody"</Bubble>
          <svg width={520} height={200} style={{position: 'absolute', left: -20, top: -20}} viewBox="0 0 520 200">
            <path d="M 30 30 L 470 170 M 470 30 L 30 170" stroke={C.labelPink} strokeWidth={18} strokeLinecap="round" strokeDasharray={480} strokeDashoffset={480 * (1 - interpolate(f - aMoody, [6, 14], [0, 1], clamp))} />
          </svg>
        </div>
      ) : null}
      {/* graf mood dua kutub */}
      {f >= aGang ? (
        <div style={{position: 'absolute', left: 90, top: 440}}>
          <svg width={900} height={600} viewBox="0 0 900 600" style={{overflow: 'visible'}}>
            <rect x={0} y={0} width={900} height={150} rx={30} fill={C.yellow} opacity={0.16} />
            <rect x={0} y={450} width={900} height={150} rx={30} fill="#7FA6E8" opacity={0.16} />
            <line x1={0} y1={300} x2={900} y2={300} stroke="#fff" strokeOpacity={0.35} strokeWidth={4} strokeDasharray="14 14" />
            <path d={pts.join(' ')} stroke={C.pink[0]} strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray={3000} strokeDashoffset={3000 * (1 - draw)} />
          </svg>
          <Pop at={aKutub} style={{left: 20, top: 30}}>
            <Pill text="▲ MANIA" bg={C.yellow} color={C.navy} size={42} />
          </Pop>
          <Pop at={aKutub + 8} style={{left: 20, top: 480}}>
            <Pill text="▼ KEMURUNGAN" bg="#4F79C7" size={42} />
          </Pop>
        </div>
      ) : null}
      <Who preset={p.preset} x={250} y={1060} w={580} mood="happy" pose={f < aMoody ? 'wave' : 'point'} />
    </Camera>
  );
};

/* ================= 7 — Kutub atas: mania ================= */
export const Mania: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const items: {icon: IconName; text: string; a: number}[] = [
    {icon: 'moon', text: 'Tidur sikit, tak penat', a: at(p, 'tidur', 1.6)},
    {icon: 'crown', text: 'Rasa diri terlalu hebat', a: at(p, 'rasa diri', 3.4)},
    {icon: 'speech', text: 'Bercakap laju', a: at(p, 'bercakap', 4.8)},
    {icon: 'cart', text: 'Belanja & ambil risiko', a: at(p, 'berbelanja', 5.9)},
  ];
  const aMinggu = at(p, 'berterusan', 8.1);
  return (
    <Camera dur={p.dur} to={1.06} panX={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[2]} 0%, ${C.pink[2]} 55%, ${C.pink[0]} 100%)`}} />
      {/* sinar matahari berputar */}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: 0.18}}>
        <g transform={`translate(780 1150) rotate(${f * 0.6})`}>
          {new Array(14).fill(0).map((_, i) => (
            <path key={i} d="M 0 0 L -60 -1100 L 60 -1100 Z" fill={C.yellow} transform={`rotate(${(i * 360) / 14})`} />
          ))}
        </g>
      </svg>
      <Glow x={780} y={1150} r={420} color={C.yellow} opacity={0.4} />
      {items.map((it, i) => (
        <Pop key={i} at={it.a} style={{left: 50, top: 470 + i * 140}}>
          <Sym icon={it.icon} text={it.text} w={580} f={f} bg={i % 2 ? C.navy : C.violet[0]} />
        </Pop>
      ))}
      <Pop at={aMinggu} style={{left: 50, top: 1040}}>
        <Weeks n={1} bg={C.yellow} />
      </Pop>
      <Who preset={AINA} x={650} y={830} w={400} mood="happy" pose="wave" seed={1} style={{transform: `translateY(${-Math.abs(Math.sin(f / 6)) * 18}px)`}} />
    </Camera>
  );
};

/* ================= 8 — Kutub bawah: kemurungan ================= */
export const Murung: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const items: {icon: IconName; text: string; a: number}[] = [
    {icon: 'sad', text: 'Sedih', a: at(p, 'sedih', 1.8)},
    {icon: 'heartbreak', text: 'Hilang minat', a: at(p, 'hilang', 2.6)},
    {icon: 'down', text: 'Rasa tak berguna', a: at(p, 'rasa tak', 3.4)},
  ];
  const aMinggu = at(p, 'sekurang-kurangnya', 4.6);
  return (
    <Camera dur={p.dur} to={1.07} panX={10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[0]} 0%, #263A78 60%, #33508F 100%)`}} />
      {/* awan hujan */}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {new Array(26).fill(0).map((_, i) => {
          const x = 60 + random(`rx${i}`) * 440;
          const yy = ((f * 14 + random(`ry${i}`) * 700) % 700) + 760;
          return <line key={i} x1={x} y1={yy} x2={x - 6} y2={yy + 34} stroke="#9EC3FF" strokeWidth={5} strokeLinecap="round" opacity={0.6} />;
        })}
        <g fill="#5E6E9E" transform={`translate(${Math.sin(f / 30) * 10} 0)`}>
          <circle cx={170} cy={720} r={80} />
          <circle cx={280} cy={680} r={110} />
          <circle cx={400} cy={730} r={80} />
          <rect x={100} y={720} width={380} height={80} rx={40} />
        </g>
      </svg>
      {items.map((it, i) => (
        <Pop key={i} at={it.a} style={{left: 520, top: 480 + i * 140}}>
          <Sym icon={it.icon} text={it.text} w={500} bg={i % 2 ? C.navy : '#2E4685'} />
        </Pop>
      ))}
      <Pop at={aMinggu} style={{left: 520, top: 910}}>
        <Weeks n={2} bg="#7FA6E8" />
      </Pop>
      {/* Aina berselimut */}
      <Who preset={AINA} x={60} y={900} w={460} mood="sad" pose="clasp" seed={1} style={{filter: 'saturate(0.6)'}} />
      <div style={{position: 'absolute', left: 30, top: 1330, width: 540, height: 200, borderRadius: '90px 90px 30px 30px', background: '#4F79C7'}} />
    </Camera>
  );
};

/* ================= 9 — Ingat: shopping ≠ bipolar; yang penting perubahan daripada biasa ================= */
export const Ingat: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aShop = at(p, 'shopping', 0.7);
  const aPenting = at(p, 'yang penting', 3.3);
  const aBeza = at(p, 'berbeza', 6.3);
  const out1 = interpolate(f, [aPenting - 4, aPenting + 4], [1, 0], clamp);
  const draw = interpolate(f, [aPenting + 4, aBeza + 6], [0, 1], clamp);
  const line: string[] = [];
  for (let x = 0; x <= 760; x += 8) {
    const k = x / 760;
    const big = k > 0.5 ? Math.sin((k - 0.5) * Math.PI * 6) * 120 * Math.min(1, (k - 0.5) * 6) : Math.sin(k * Math.PI * 8) * 12;
    line.push(`${x === 0 ? 'M' : 'L'} ${x} ${(170 - big).toFixed(1)}`);
  }
  return (
    <Camera dur={p.dur} to={1.08} panY={-10}>
      <NightSky seed={17} glow={C.green} />
      {/* shopping ≠ bipolar */}
      {f >= aShop && out1 > 0 ? (
        <div style={{position: 'absolute', left: 90, top: 520, width: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26, opacity: out1, transform: `scale(${popScale(f - aShop)})`}}>
          <div style={{background: '#fff', borderRadius: 40, padding: 24}}>
            <Icon name="bag" size={150} />
          </div>
          <Txt size={150} color={C.labelPink}>≠</Txt>
          <Pill text="BIPOLAR" bg={C.labelPink} size={70} />
        </div>
      ) : null}
      {/* graf: biasa vs berubah */}
      {f >= aPenting ? (
        <div style={{position: 'absolute', left: 90, top: 470, width: 900, background: C.navy, borderRadius: 40, padding: '30px 40px', opacity: popOpacity(f - aPenting), boxShadow: '0 20px 50px rgba(18,11,51,.55)'}}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Txt size={38} color={C.green}>Biasa</Txt>
            <Txt size={38} color={C.yellow}>Berubah jelas!</Txt>
          </div>
          <svg width={820} height={340} viewBox="0 0 760 340" style={{marginTop: 10}}>
            <line x1={380} y1={0} x2={380} y2={340} stroke="#fff" strokeOpacity={0.3} strokeWidth={4} strokeDasharray="12 12" />
            <path d={line.join(' ')} stroke={C.pink[0]} strokeWidth={12} fill="none" strokeLinecap="round" strokeDasharray={2600} strokeDashoffset={2600 * (1 - draw)} />
          </svg>
          <Txt size={36} style={{textAlign: 'center', marginTop: 6}}>Mood + tingkah laku</Txt>
        </div>
      ) : null}
      <Who preset={p.preset} x={260} y={1080} w={560} mood={f >= aPenting ? 'neutral' : 'curious'} pose={f >= aPenting ? 'point' : 'chin'} />
    </Camera>
  );
};

/* ================= 10 — Boleh dirawat: 4 cara → hidup stabil ================= */
export const Rawat: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aRawat = at(p, 'dirawat', 2.0);
  const tiles: {icon: IconName; text: string; a: number; bg: string}[] = [
    {icon: 'pill', text: 'Ubat penstabil mood', a: at(p, 'ubat', 3.0), bg: C.violet[0]},
    {icon: 'chat', text: 'Terapi', a: at(p, 'terapi', 4.1), bg: C.navy},
    {icon: 'bed', text: 'Rutin tidur teratur', a: at(p, 'rutin', 4.9), bg: C.navy},
    {icon: 'family', text: 'Sokongan keluarga', a: at(p, 'sokongan', 6.2), bg: C.violet[0]},
  ];
  const aRamai = at(p, 'ramai', 7.4);
  const tilesOut = interpolate(f, [aRamai - 4, aRamai + 6], [1, 0], clamp);
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 60%, ${C.green}88 100%)`}} />
      <Glow x={540} y={900} r={560} color={C.green} opacity={0.3} />
      <Pop at={aRawat} style={{left: 0, width: 1080, top: 500, display: 'flex', justifyContent: 'center'}}>
        <Pill text="✓ BOLEH DIRAWAT" bg={C.green} size={56} />
      </Pop>
      {tilesOut > 0
        ? tiles.map((t, i) => {
            if (f < t.a) return null;
            const ff = f - t.a;
            return (
              <div key={i} style={{position: 'absolute', left: 60 + (i % 2) * 490, top: 620 + Math.floor(i / 2) * 250, width: 470, height: 220, background: t.bg, borderRadius: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, transform: `scale(${popScale(ff)})`, opacity: popOpacity(ff) * tilesOut, boxShadow: '0 16px 40px rgba(18,11,51,.5)'}}>
                <Icon name={t.icon} size={100} />
                <Txt size={38} style={{textAlign: 'center'}}>{t.text}</Txt>
              </div>
            );
          })
        : null}
      {/* keluarga stabil & gembira */}
      {f >= aRamai ? (
        <div style={{position: 'absolute', left: 60, top: 600, width: 960, opacity: popOpacity(f - aRamai), transform: `scale(${popScale(f - aRamai)})`}}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end'}}>
            <Avatar preset={MAK} width={300} mood="happy" pose="clasp" seed={4} />
            <div style={{marginLeft: -40, marginRight: -40, zIndex: 2}}>
              <Avatar preset={AINA} width={330} mood="happy" pose="wave" seed={1} />
            </div>
            <Avatar preset={AYAH} width={300} mood="happy" pose="clasp" seed={5} />
          </div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: -30}}>
            <Pill text="Stabil & berjaya" bg={C.yellow} color={C.navy} size={46} />
          </div>
        </div>
      ) : null}
      <Who preset={p.preset} x={f >= aRamai ? 640 : 300} y={f >= aRamai ? 1190 : 1110} w={f >= aRamai ? 380 : 500} mood="happy" pose={f >= aRawat && f < aRamai ? 'clasp' : 'wave'} />
    </Camera>
  );
};

/* ================= 11 — Penutup: Klinik Nissa, Nilai ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTunggu = at(p, 'jangan tunggu', 2.6);
  const aKlinik = at(p, 'klinik nissa', 3.6);
  const aKons = at(p, 'konsultasi', 5.9);
  return (
    <Camera dur={p.dur} to={1.05} panY={-10}>
      <NightSky seed={23} glow={C.pink[0]} />
      <Glow x={540} y={820} r={520} color={C.green} opacity={0.25} />
      <Pop at={aTunggu} style={{left: 0, width: 1080, top: 478, display: 'flex', justifyContent: 'center', opacity: interpolate(f, [aKons - 8, aKons], [1, 0], clamp)}}>
        <Pill text="Jangan tunggu" bg={C.labelPink} size={54} />
      </Pop>
      <Pop at={aKlinik} style={{left: 0, width: 1080, top: 600, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{background: '#06274F', borderRadius: 40, padding: 18, boxShadow: '0 24px 60px rgba(18,11,51,.6)'}}>
          <Img src={staticFile('brand/klinik_nissa_logo.png')} style={{width: 300, display: 'block'}} />
        </div>
        <Txt size={50} style={{marginTop: 18}}>Klinik Nissa, Nilai</Txt>
      </Pop>
      <Pop at={aKons} style={{left: 0, width: 1080, top: 1060, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
        <Pill text="Konsultasi & saringan kesihatan mental" bg={C.green} size={36} />
        <Pill text="WhatsApp 012-608 1411" bg={C.yellow} color={C.navy} size={40} />
      </Pop>
      <Who preset={p.preset} x={30} y={1230} w={400} mood="happy" pose={f >= aKlinik ? 'point' : 'wave'} />
      <div style={{position: 'absolute', left: 430, top: 1560, width: 620, textAlign: 'center', opacity: interpolate(f, [aKons, aKons + 10], [0, 1], clamp)}}>
        <Txt size={30} color={C.violet[4]}>Video ini untuk pendidikan, bukan diagnosis.</Txt>
      </div>
    </Camera>
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro,
  parcel: Parcel,
  kad: Kad,
  malam: Malam,
  risau: Risau,
  diagnosis: Diagnosis,
  apa: Apa,
  mania: Mania,
  murung: Murung,
  ingat: Ingat,
  rawat: Rawat,
  penutup: Penutup,
};
