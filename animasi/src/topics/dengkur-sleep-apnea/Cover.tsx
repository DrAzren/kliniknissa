import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset} from '../../components/Avatar';
import {Glow, NightSky, Pill} from '../../components/common';
import {ScriptFile} from '../../lib/timeline';
import {KIcon} from '../kit';
import {ZUL} from './scenes';

// Thumbnail 1080×1920 — teks penting dalam y 240–1680
export const Cover: React.FC<{preset: AvatarPreset; script: ScriptFile}> = ({preset, script}) => {
  const cv = script.cover;
  const T: React.CSSProperties = {fontFamily: FONT, fontWeight: 800, textAlign: 'center', width: 1080, position: 'absolute', left: 0, lineHeight: 1, textShadow: '0 8px 0 rgba(18,11,51,.7)'};
  return (
    <AbsoluteFill>
      <NightSky seed={47} glow={C.labelPink} />
      <Glow x={540} y={1150} r={540} color={C.labelPink} opacity={0.3} />
      <div style={{...T, top: 250, fontSize: 76, color: C.violet[4]}}>{cv.kicker}</div>
      <div style={{...T, top: 340, fontSize: 160, color: C.yellow}}>{cv.headline[0]}</div>
      <div style={{...T, top: 500, fontSize: 130, color: '#fff'}}>{cv.headline[1]}</div>
      <div style={{position: 'absolute', top: 690, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.highlight} bg={C.labelPink} size={56} />
      </div>
      <div style={{position: 'absolute', left: 40, top: 880}}><KIcon name="snore" size={220} f={8} /></div>
      <div style={{position: 'absolute', left: 820, top: 900}}><KIcon name="cpap" size={200} /></div>
      <div style={{position: 'absolute', left: 560, top: 1080}}>
        <Avatar preset={ZUL} width={400} mood="tired" pose="down" />
      </div>
      <div style={{position: 'absolute', left: 100, top: 1040}}>
        <Avatar preset={preset} width={460} mood="curious" pose="point" />
      </div>
      <div style={{position: 'absolute', top: 1600, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Dr. Azren" bg={C.navy} size={52} />
      </div>
    </AbsoluteFill>
  );
};
