import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset} from '../../components/Avatar';
import {Glow, NightSky, Pill} from '../../components/common';
import {ScriptFile} from '../../lib/timeline';
import {KIcon, Who} from '../_kit/kit';
import {AISYAH, BOW} from './scenes';

// Thumbnail 1080×1920 — teks penting dalam y 240–1680
export const Cover: React.FC<{preset: AvatarPreset; script: ScriptFile}> = ({preset, script}) => {
  const cv = script.cover;
  const T: React.CSSProperties = {fontFamily: FONT, fontWeight: 800, textAlign: 'center', width: 1080, position: 'absolute', left: 0, lineHeight: 1, textShadow: '0 8px 0 rgba(18,11,51,.7)'};
  return (
    <AbsoluteFill>
      <NightSky seed={61} glow={C.pink[0]} />
      <Glow x={540} y={1150} r={540} color={C.pink[0]} opacity={0.3} />
      <div style={{...T, top: 250, fontSize: 64, color: C.violet[4]}}>{cv.kicker}</div>
      <div style={{...T, top: 330, fontSize: 230, color: C.yellow}}>{cv.headline[0]}</div>
      <div style={{position: 'absolute', top: 590, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.highlight} bg={C.labelPink} size={58} />
      </div>
      <div style={{position: 'absolute', top: 720, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.sub} bg={C.yellow} color={C.navy} size={42} />
      </div>
      <div style={{position: 'absolute', left: 0, width: 1080, top: 850, display: 'flex', justifyContent: 'center', gap: 30}}>
        <KIcon name="palm" size={170} />
        <KIcon name="sole" size={170} />
        <KIcon name="mouth" size={170} />
      </div>
      <Who preset={AISYAH} x={60} y={1080} w={380} mood="sad" pose="down" seed={2} bow={BOW} />
      <div style={{position: 'absolute', left: 520, top: 1040}}>
        <Avatar preset={preset} width={480} mood="curious" pose="point" />
      </div>
      <div style={{position: 'absolute', top: 1600, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Dr. Azren" bg={C.navy} size={52} />
      </div>
    </AbsoluteFill>
  );
};
