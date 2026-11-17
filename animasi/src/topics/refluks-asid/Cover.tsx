import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset} from '../../components/Avatar';
import {Glow, NightSky, Pill} from '../../components/common';
import {ScriptFile} from '../../lib/timeline';
import {KIcon, RED} from '../_kit/kit';
import {AMIR} from './scenes';

// Thumbnail 1080×1920 — teks penting dalam y 240–1680
export const Cover: React.FC<{preset: AvatarPreset; script: ScriptFile}> = ({preset, script}) => {
  const cv = script.cover;
  const T: React.CSSProperties = {fontFamily: FONT, fontWeight: 800, textAlign: 'center', width: 1080, position: 'absolute', left: 0, lineHeight: 1, textShadow: '0 8px 0 rgba(18,11,51,.7)'};
  return (
    <AbsoluteFill>
      <NightSky seed={91} glow={RED} />
      <Glow x={540} y={1150} r={540} color="#FF7A3D" opacity={0.3} />
      <div style={{...T, top: 250, fontSize: 60, color: C.violet[4]}}>{cv.kicker}</div>
      <div style={{...T, top: 330, fontSize: 170, color: C.yellow}}>{cv.headline[0]}</div>
      <div style={{...T, top: 500, fontSize: 170, color: '#fff'}}>{cv.headline[1]}</div>
      <div style={{position: 'absolute', top: 700, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.highlight} bg={C.labelPink} size={54} />
      </div>
      <div style={{position: 'absolute', top: 830, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.sub} bg={C.yellow} color={C.navy} size={40} />
      </div>
      <div style={{position: 'absolute', left: 40, top: 980}}>
        <Avatar preset={AMIR} width={420} mood="tired" pose="clasp" seed={1} />
      </div>
      <div style={{position: 'absolute', left: 370, top: 960}}>
        <KIcon name="reflux" size={200} />
      </div>
      <div style={{position: 'absolute', left: 560, top: 1000}}>
        <Avatar preset={preset} width={460} mood="curious" pose="point" />
      </div>
      <div style={{position: 'absolute', top: 1600, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Dr. Azren" bg={C.navy} size={52} />
      </div>
    </AbsoluteFill>
  );
};
