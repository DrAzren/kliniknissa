import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset} from '../../components/Avatar';
import {Glow, NightSky, Pill} from '../../components/common';
import {ScriptFile} from '../../lib/timeline';
import {Mosquito} from './scenes';

// Thumbnail 1080×1920 — teks penting dalam y 240–1680 (potongan grid 3:4)
export const Cover: React.FC<{preset: AvatarPreset; script: ScriptFile}> = ({preset, script}) => {
  const cv = script.cover;
  const T: React.CSSProperties = {fontFamily: FONT, fontWeight: 800, textAlign: 'center', width: 1080, position: 'absolute', left: 0, lineHeight: 1, textShadow: '0 8px 0 rgba(18,11,51,.7)'};
  const kinds = ['aedes', 'culex', 'anopheles', 'mansonia'] as const;
  return (
    <AbsoluteFill>
      <NightSky seed={47} glow={C.labelPink} />
      <Glow x={540} y={1150} r={540} color={C.labelPink} opacity={0.3} />
      <div style={{...T, top: 250, fontSize: 70, color: C.violet[4]}}>{cv.kicker}</div>
      <div style={{...T, top: 330, fontSize: 170, color: C.yellow}}>{cv.headline[0]}</div>
      <div style={{...T, top: 500, fontSize: 170, color: '#fff'}}>{cv.headline[1]}</div>
      <div style={{position: 'absolute', top: 700, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.highlight} bg={C.labelPink} size={56} />
      </div>
      {kinds.map((k, i) => (
        <div key={k} style={{position: 'absolute', left: i % 2 ? 790 : 20, top: 870 + Math.floor(i / 2) * 260}}>
          <Mosquito kind={k} size={260} seed={i} still tilt={k === 'anopheles' ? -30 : 0} flip={i % 2 === 0} />
        </div>
      ))}
      <div style={{position: 'absolute', left: 300, top: 1000}}>
        <Avatar preset={preset} width={480} mood="curious" pose="point" />
      </div>
      <div style={{position: 'absolute', top: 1600, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Dr. Azren" bg={C.navy} size={52} />
      </div>
    </AbsoluteFill>
  );
};
