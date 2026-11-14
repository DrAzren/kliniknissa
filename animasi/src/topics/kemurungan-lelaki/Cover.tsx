import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset} from '../../components/Avatar';
import {Glow, NightSky, Pill} from '../../components/common';
import {ScriptFile} from '../../lib/timeline';
import {Cross, KIcon} from '../_kit/kit';
import {FAIZ} from './scenes';

// Thumbnail 1080×1920 — teks penting dalam y 240–1680
export const Cover: React.FC<{preset: AvatarPreset; script: ScriptFile}> = ({preset, script}) => {
  const cv = script.cover;
  const T: React.CSSProperties = {fontFamily: FONT, fontWeight: 800, textAlign: 'center', width: 1080, position: 'absolute', left: 0, lineHeight: 1, textShadow: '0 8px 0 rgba(18,11,51,.7)'};
  return (
    <AbsoluteFill>
      <NightSky seed={53} glow={C.pink[2]} />
      <Glow x={540} y={1150} r={540} color={C.violet[3]} opacity={0.3} />
      <div style={{...T, top: 250, fontSize: 80, color: C.violet[4]}}>{cv.kicker}</div>
      <div style={{...T, top: 345, fontSize: 170, color: '#fff'}}>{cv.headline[0]}</div>
      <div style={{...T, top: 510, fontSize: 150, color: C.yellow}}>{cv.headline[1]}</div>
      <div style={{position: 'absolute', top: 710, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.highlight} bg={C.labelPink} size={50} />
      </div>
      <div style={{position: 'absolute', left: 30, top: 920}}>
        <Avatar preset={FAIZ} width={440} mood="angry" anger={0.7} pose="down" seed={1} />
      </div>
      <div style={{position: 'absolute', left: 380, top: 860, width: 170, height: 170}}>
        <KIcon name="drop" size={170} />
        <div style={{position: 'absolute', left: 0, top: 0}}><Cross f={20} size={170} /></div>
      </div>
      <div style={{position: 'absolute', left: 560, top: 1000}}>
        <Avatar preset={preset} width={460} mood="curious" pose="chin" />
      </div>
      <div style={{position: 'absolute', top: 1600, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Dr. Azren" bg={C.navy} size={52} />
      </div>
    </AbsoluteFill>
  );
};
