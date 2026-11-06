import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {C, FONT} from '../theme';

// Pop: skala 0.7 -> 1.06 -> 1 (dalam ~12 frame)
export const popScale = (f: number) =>
  interpolate(f, [0, 7, 12], [0.7, 1.06, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad)});
export const popOpacity = (f: number) => interpolate(f, [0, 4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const Pop: React.FC<{at: number; children: React.ReactNode; style?: React.CSSProperties; origin?: string}> = ({at, children, style, origin = 'center'}) => {
  const f = useCurrentFrame() - at;
  if (f < 0) return null;
  return (
    <div style={{position: 'absolute', transform: `scale(${popScale(f)})`, opacity: popOpacity(f), transformOrigin: origin, ...style}}>{children}</div>
  );
};

export const Pill: React.FC<{text: string; bg?: string; color?: string; size?: number; style?: React.CSSProperties}> = ({text, bg = C.navy, color = '#fff', size = 44, style}) => (
  <div
    style={{
      background: bg,
      color,
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: size,
      padding: `${size * 0.34}px ${size * 0.6}px`,
      borderRadius: size,
      whiteSpace: 'nowrap',
      boxShadow: '0 10px 30px rgba(18,11,51,0.45)',
      letterSpacing: 0.5,
      ...style,
    }}
  >
    {text}
  </div>
);

// Langit malam berbintang + glow + bokeh
export const NightSky: React.FC<{seed?: number; top?: string; bottom?: string; glow?: string; stars?: number; dim?: number}> = ({
  seed = 1,
  top = C.night[0],
  bottom = C.night[3],
  glow = C.violet[2],
  stars = 70,
  dim = 1,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${top} 0%, ${C.night[2]} 55%, ${bottom} 100%)`}}>
      <AbsoluteFill style={{background: `radial-gradient(circle at 50% 42%, ${glow}88 0%, ${glow}00 55%)`}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {new Array(stars).fill(0).map((_, i) => {
          const x = random(`sx${seed}${i}`) * 1080;
          const y = random(`sy${seed}${i}`) * 1500;
          const r = 1.5 + random(`sr${seed}${i}`) * 3.2;
          const tw = 0.35 + 0.65 * Math.abs(Math.sin(frame / (18 + random(`st${seed}${i}`) * 30) + i));
          return <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={tw * 0.85 * dim} />;
        })}
        {new Array(9).fill(0).map((_, i) => {
          const x = random(`bx${seed}${i}`) * 1080;
          const y = 200 + random(`by${seed}${i}`) * 1500;
          const r = 40 + random(`br${seed}${i}`) * 90;
          const col = [C.violet[3], C.pink[0], C.violet[4]][i % 3];
          return <circle key={`b${i}`} cx={x + Math.sin(frame / 60 + i) * 14} cy={y} r={r} fill={col} opacity={0.13 * dim} style={{filter: 'blur(18px)'}} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Kamera: push-in + sedikit pan, sentiasa bergerak
export const Camera: React.FC<{children: React.ReactNode; dur: number; to?: number; panX?: number; panY?: number; origin?: string}> = ({children, dur, to = 1.1, panX = 0, panY = 0, origin = '50% 50%'}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, Math.max(1, dur)], [0, 1], {...clamp, easing: Easing.inOut(Easing.sin)});
  const s = 1 + (to - 1) * p;
  return (
    <AbsoluteFill style={{transform: `translate(${panX * p}px, ${panY * p}px) scale(${s})`, transformOrigin: origin}}>{children}</AbsoluteFill>
  );
};

export const Glow: React.FC<{x: number; y: number; r: number; color: string; opacity?: number}> = ({x, y, r, color, opacity = 0.6}) => (
  <div
    style={{
      position: 'absolute',
      left: x - r,
      top: y - r,
      width: r * 2,
      height: r * 2,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, ${color}00 70%)`,
      opacity,
    }}
  />
);

export const useSceneFrame = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return {frame, fps, t: frame / fps};
};
