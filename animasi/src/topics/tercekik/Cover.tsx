import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset} from '../../components/Avatar';
import {Glow, NightSky, Pill} from '../../components/common';
import {ScriptFile} from '../../lib/timeline';
import {KIcon, RED} from '../_kit/kit';
import {DANISH, IBU} from './scenes';

/** Saiz fon tajuk supaya muat 1000 px. */
const fit = (s: string, max: number) => Math.min(max, Math.floor(1000 / (s.length * 0.72)));

// Thumbnail 1080×1920 — teks penting dalam y 240–1680
export const Cover: React.FC<{preset: AvatarPreset; script: ScriptFile}> = ({preset, script}) => {
  const cv = script.cover;
  const T: React.CSSProperties = {fontFamily: FONT, fontWeight: 800, textAlign: 'center', width: 1080, position: 'absolute', left: 0, lineHeight: 1, textShadow: '0 8px 0 rgba(18,11,51,.7)'};
  return (
    <AbsoluteFill>
      <NightSky seed={271} glow={RED} />
      <Glow x={540} y={1150} r={540} color={RED} opacity={0.25} />
      <div style={{...T, top: 250, fontSize: 56, color: C.violet[4]}}>{cv.kicker}</div>
      <div style={{...T, top: 330, fontSize: fit(cv.headline[0], 170), color: '#fff'}}>{cv.headline[0]}</div>
      <div style={{...T, top: 500, fontSize: fit(cv.headline[1], 180), color: C.yellow}}>{cv.headline[1]}</div>
      <div style={{position: 'absolute', top: 710, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.highlight} bg={C.labelPink} size={48} />
      </div>
      <div style={{position: 'absolute', top: 830, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.sub} bg={C.yellow} color={C.navy} size={38} />
      </div>
      <div style={{position: 'absolute', left: 10, top: 1000}}>
        <Avatar preset={IBU} width={400} mood="shock" pose="clasp" seed={4} />
      </div>
      <div style={{position: 'absolute', left: 200, top: 1250}}>
        <Avatar preset={DANISH} width={240} mood="shock" pose="clasp" seed={6} />
      </div>
      <div style={{position: 'absolute', left: 390, top: 940}}><KIcon name="grape" size={180} /></div>
      <div style={{position: 'absolute', left: 580, top: 1000}}>
        <Avatar preset={preset} width={450} mood="curious" pose="point" />
      </div>
      <div style={{position: 'absolute', top: 1600, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Dr. Azren" bg={C.navy} size={52} />
      </div>
    </AbsoluteFill>
  );
};
