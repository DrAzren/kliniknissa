import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset} from '../../components/Avatar';
import {Glow, NightSky, Pill} from '../../components/common';
import {ScriptFile} from '../../lib/timeline';
import {Rat, Spiral} from './scenes';

// Thumbnail 1080×1920 — teks penting dalam y 240–1680 (potongan grid 3:4)
export const Cover: React.FC<{preset: AvatarPreset; script: ScriptFile}> = ({preset, script}) => {
  const cv = script.cover;
  const T: React.CSSProperties = {fontFamily: FONT, fontWeight: 800, textAlign: 'center', width: 1080, position: 'absolute', left: 0, lineHeight: 1, textShadow: '0 8px 0 rgba(18,11,51,.7)'};
  return (
    <AbsoluteFill>
      <NightSky seed={73} glow="#4E8A2C" />
      <Glow x={540} y={1200} r={560} color="#9BE15D" opacity={0.18} />
      <div style={{...T, top: 250, fontSize: 70, color: C.violet[4]}}>{cv.kicker}</div>
      <div style={{...T, top: 330, fontSize: 170, color: C.yellow}}>{cv.headline[0]}</div>
      <div style={{...T, top: 500, fontSize: 170, color: '#fff'}}>{cv.headline[1]}</div>
      <div style={{position: 'absolute', top: 700, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.highlight} bg="#D9485F" size={64} />
      </div>
      <div style={{position: 'absolute', left: 130, top: 860, transform: 'rotate(-10deg)'}}>
        <Spiral length={760} />
      </div>
      {/* air banjir */}
      <div style={{position: 'absolute', left: 0, top: 1300, width: 1080, height: 620, background: '#8C6B45', opacity: 0.92}} />
      <div style={{position: 'absolute', left: 640, top: 1090}}>
        <Rat size={360} flip />
      </div>
      <div style={{position: 'absolute', left: 40, top: 1000}}>
        <Avatar preset={preset} width={440} mood="shock" pose="point" />
      </div>
      <div style={{position: 'absolute', top: 1400, width: 1080, display: 'flex', justifyContent: 'center', gap: 18}}>
        {cv.tags.map((t) => (
          <Pill key={t} text={t} bg={C.navy} color={C.yellow} size={40} />
        ))}
      </div>
      <div style={{position: 'absolute', top: 1520, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.sub} bg="#fff" color={C.navy} size={44} />
      </div>
      <div style={{position: 'absolute', top: 1640, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Dr. Azren" bg={C.navy} size={52} />
      </div>
    </AbsoluteFill>
  );
};
