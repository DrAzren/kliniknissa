import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset} from '../../components/Avatar';
import {Glow, NightSky, Pill} from '../../components/common';
import {ScriptFile} from '../../lib/timeline';
import {NAUFAL} from './scenes';

const RED = '#D9485F';

// Thumbnail 1080×1920 — teks penting dalam y 240–1680 (potongan grid 3:4)
export const Cover: React.FC<{preset: AvatarPreset; script: ScriptFile}> = ({preset, script}) => {
  const cv = script.cover;
  const T: React.CSSProperties = {fontFamily: FONT, fontWeight: 800, textAlign: 'center', width: 1080, position: 'absolute', left: 0, lineHeight: 1, textShadow: '0 8px 0 rgba(18,11,51,.7)'};
  return (
    <AbsoluteFill>
      <NightSky seed={43} glow={C.pink[0]} />
      <Glow x={540} y={1150} r={540} color={C.pink[0]} opacity={0.3} />
      <div style={{...T, top: 260, fontSize: 70, color: C.violet[4]}}>{cv.kicker}</div>
      <div style={{...T, top: 345, fontSize: 200, color: C.yellow}}>{cv.headline[0]}</div>
      <div style={{position: 'absolute', top: 580, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.highlight} bg={C.labelPink} size={64} />
      </div>
      <div style={{position: 'absolute', top: 720, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.sub} bg={C.yellow} color={C.navy} size={42} />
      </div>
      <div style={{position: 'absolute', left: 60, top: 960}}>
        <Avatar preset={NAUFAL} width={400} mood="sad" pose="clasp" seed={2} />
        <svg viewBox="0 0 600 760" width={400} height={(400 * 760) / 600} style={{position: 'absolute', left: 0, top: 0}}>
          {[[164, 649], [436, 649], [192, 338]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y}) scale(${i === 2 ? 0.6 : 0.8})`}>
              <ellipse rx={38} ry={26} fill={RED} opacity={0.75} />
              <ellipse cx={16} cy={-10} rx={20} ry={13} fill="#B32F4A" opacity={0.8} />
            </g>
          ))}
        </svg>
        {[0, 1, 2].map((i) => (
          <svg key={i} width={60} height={110} viewBox="0 0 60 110" style={{position: 'absolute', left: 300 + i * 34, top: -10 + i * 8}}>
            <path d="M 30 6 q 16 14 0 28 q -16 14 0 28 q 16 14 0 28" stroke={C.yellow} strokeWidth={9} fill="none" strokeLinecap="round" />
          </svg>
        ))}
      </div>
      <div style={{position: 'absolute', left: 520, top: 990}}>
        <Avatar preset={preset} width={470} mood="curious" pose="chin" />
      </div>
      <div style={{position: 'absolute', top: 1590, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Dr. Azren" bg={C.navy} size={52} />
      </div>
    </AbsoluteFill>
  );
};
