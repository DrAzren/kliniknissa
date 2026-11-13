import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset} from '../../components/Avatar';
import {Glow, NightSky, Pill} from '../../components/common';
import {ScriptFile} from '../../lib/timeline';
import {Gauge} from './scenes';

// Thumbnail 1080×1920 — teks penting dalam y 240–1680 (potongan grid 3:4)
export const Cover: React.FC<{preset: AvatarPreset; script: ScriptFile}> = ({preset, script}) => {
  const cv = script.cover;
  const T: React.CSSProperties = {fontFamily: FONT, fontWeight: 800, textAlign: 'center', width: 1080, position: 'absolute', left: 0, lineHeight: 1, textShadow: '0 8px 0 rgba(18,11,51,.7)'};
  return (
    <AbsoluteFill>
      <NightSky seed={53} glow={C.labelPink} />
      <Glow x={540} y={1150} r={540} color="#D9485F" opacity={0.3} />
      <div style={{...T, top: 250, fontSize: 70, color: C.violet[4]}}>{cv.kicker}</div>
      <div style={{...T, top: 330, fontSize: 170, color: C.yellow}}>{cv.headline[0]}</div>
      <div style={{...T, top: 500, fontSize: 150, color: '#fff'}}>{cv.headline[1]}</div>
      <div style={{position: 'absolute', top: 680, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.highlight} bg={C.labelPink} size={96} />
      </div>
      <div style={{position: 'absolute', left: 500, top: 960}}>
        <Gauge value={2.6} width={540} />
      </div>
      <div style={{position: 'absolute', left: 30, top: 940}}>
        <Avatar preset={preset} width={480} mood="shock" pose="point" />
      </div>
      <div style={{position: 'absolute', top: 1360, width: 1080, display: 'flex', justifyContent: 'center', gap: 18}}>
        {cv.tags.map((t) => (
          <Pill key={t} text={t} bg={C.navy} color={C.yellow} size={40} />
        ))}
      </div>
      <div style={{position: 'absolute', top: 1500, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.sub} bg="#fff" color={C.navy} size={44} />
      </div>
      <div style={{position: 'absolute', top: 1620, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Dr. Azren" bg={C.navy} size={52} />
      </div>
    </AbsoluteFill>
  );
};
