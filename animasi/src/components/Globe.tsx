import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';

// Bumi flat 2D: benua bergerak (berputar), glow ungu, boleh jadi kelabu & boleh senyum.
const LAND = [
  'M 40 120 C 70 60 160 50 200 90 C 240 120 230 170 190 190 C 160 210 170 260 130 280 C 90 300 60 250 70 210 C 76 180 20 170 40 120 Z',
  'M 300 60 C 340 40 410 50 430 90 C 450 130 400 150 380 140 C 350 130 330 170 300 160 C 270 150 270 80 300 60 Z',
  'M 330 220 C 380 200 460 220 480 270 C 500 320 470 380 430 400 C 400 415 380 380 370 350 C 360 320 300 300 310 260 C 314 240 320 228 330 220 Z',
  'M 150 360 C 190 340 250 350 260 390 C 270 430 230 470 190 460 C 150 450 120 390 150 360 Z',
  'M 520 120 C 550 100 590 120 590 150 C 590 180 550 190 530 180 C 510 170 500 140 520 120 Z',
];

export const Globe: React.FC<{r?: number; grey?: number; smile?: number; speed?: number; style?: React.CSSProperties; glow?: boolean}> = ({
  r = 260,
  grey = 0,
  smile = 0,
  speed = 0.6,
  style,
  glow = true,
}) => {
  const frame = useCurrentFrame();
  const tile = 600;
  const off = -((frame * speed) % tile);
  const id = `g${r}`;
  return (
    <div style={{position: 'relative', width: r * 2, height: r * 2, filter: grey ? `grayscale(${grey}) brightness(${1 - 0.35 * grey})` : undefined, ...style}}>
      {glow ? (
        <div
          style={{
            position: 'absolute',
            inset: -r * 0.45,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${C.violet[4]}77 0%, ${C.violet[2]}00 68%)`,
          }}
        />
      ) : null}
      <svg viewBox="0 0 520 520" width={r * 2} height={r * 2} style={{position: 'absolute', inset: 0}}>
        <defs>
          <clipPath id={id}>
            <circle cx={260} cy={260} r={250} />
          </clipPath>
        </defs>
        <circle cx={260} cy={260} r={250} fill={C.violet[1]} />
        <g clipPath={`url(#${id})`}>
          <g transform={`translate(${off} 0)`}>
            {[0, tile, tile * 2].map((dx) => (
              <g key={dx} transform={`translate(${dx} 0)`} fill={C.green}>
                {LAND.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </g>
            ))}
          </g>
          {/* shading 2 tona */}
          <circle cx={330} cy={320} r={250} fill={C.night[3]} opacity={0.35} />
          <circle cx={230} cy={220} r={250} fill={C.violet[1]} opacity={0} />
          <ellipse cx={170} cy={140} rx={70} ry={36} fill="#fff" opacity={0.18} transform="rotate(-30 170 140)" />
        </g>
        {smile > 0 ? (
          <g opacity={smile}>
            <ellipse cx={205} cy={250} rx={18} ry={24} fill={C.navy} />
            <ellipse cx={315} cy={250} rx={18} ry={24} fill={C.navy} />
            <circle cx={211} cy={242} r={6} fill="#fff" />
            <circle cx={321} cy={242} r={6} fill="#fff" />
            <path d="M 200 310 Q 260 370 320 310" stroke={C.navy} strokeWidth={14} strokeLinecap="round" fill="none" />
            <ellipse cx={170} cy={300} rx={24} ry={13} fill={C.pink[0]} opacity={0.7} />
            <ellipse cx={350} cy={300} rx={24} ry={13} fill={C.pink[0]} opacity={0.7} />
          </g>
        ) : null}
      </svg>
    </div>
  );
};
