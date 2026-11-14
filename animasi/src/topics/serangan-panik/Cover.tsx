import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset} from '../../components/Avatar';
import {Glow, NightSky, Pill} from '../../components/common';
import {ScriptFile} from '../../lib/timeline';
import {KIcon} from '../kit';
import {AINA} from './scenes';

// Thumbnail 1080×1920 — teks penting dalam y 240–1680
export const Cover: React.FC<{preset: AvatarPreset; script: ScriptFile}> = ({preset, script}) => {
  const cv = script.cover;
  const T: React.CSSProperties = {fontFamily: FONT, fontWeight: 800, textAlign: 'center', width: 1080, position: 'absolute', left: 0, lineHeight: 1, textShadow: '0 8px 0 rgba(18,11,51,.7)'};
  return (
    <AbsoluteFill>
      <NightSky seed={51} glow={C.labelPink} />
      <Glow x={540} y={1150} r={540} color="#D9485F" opacity={0.3} />
      <div style={{...T, top: 250, fontSize: 76, color: C.violet[4]}}>{cv.kicker}</div>
      <div style={{...T, top: 340, fontSize: 150, color: C.yellow}}>{cv.headline[0]}</div>
      <div style={{...T, top: 490, fontSize: 170, color: '#fff'}}>{cv.headline[1]}</div>
      <div style={{position: 'absolute', top: 690, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.highlight} bg={C.labelPink} size={56} />
      </div>
      <div style={{position: 'absolute', left: 60, top: 880}}><KIcon name="heart" size={240} /></div>
      <div style={{position: 'absolute', left: 800, top: 900}}><KIcon name="ecg" size={220} f={4} /></div>
      <div style={{position: 'absolute', left: 580, top: 1100}}>
        <Avatar preset={AINA} width={380} mood="shock" pose="clasp" />
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
