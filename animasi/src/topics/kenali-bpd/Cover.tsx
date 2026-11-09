import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset} from '../../components/Avatar';
import {Glow, NightSky, Pill} from '../../components/common';
import {ScriptFile} from '../../lib/timeline';
import {BigHeart, SOFEA} from './scenes';

// Thumbnail 1080×1920 — teks penting dalam y 240–1680 (potongan grid 3:4)
export const Cover: React.FC<{preset: AvatarPreset; script: ScriptFile}> = ({preset, script}) => {
  const cv = script.cover;
  const T: React.CSSProperties = {fontFamily: FONT, fontWeight: 800, textAlign: 'center', width: 1080, position: 'absolute', left: 0, lineHeight: 1, textShadow: '0 8px 0 rgba(18,11,51,.7)'};
  return (
    <AbsoluteFill>
      <NightSky seed={53} glow={C.labelPink} />
      <Glow x={540} y={1150} r={560} color={C.labelPink} opacity={0.32} />
      <div style={{...T, top: 260, fontSize: 70, color: C.violet[4]}}>{cv.kicker}</div>
      <div style={{...T, top: 330, fontSize: 250, color: C.yellow}}>BPD</div>
      <div style={{position: 'absolute', top: 600, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Borderline Personality Disorder" bg={C.labelPink} size={50} />
      </div>
      <div style={{position: 'absolute', left: 620, top: 760, transform: 'rotate(10deg)'}}>
        <BigHeart size={320} crack={1} />
      </div>
      <div style={{position: 'absolute', left: 30, top: 830}}>
        <Avatar preset={SOFEA} width={520} mood="sad" pose="clasp" seed={1} />
      </div>
      <div style={{position: 'absolute', left: 560, top: 1080}}>
        <Avatar preset={preset} width={460} mood="curious" pose="point" seed={7} />
      </div>
      <div style={{position: 'absolute', top: 1520, width: 1080, display: 'flex', justifyContent: 'center', gap: 20}}>
        <Pill text={cv.sub.toUpperCase()} bg={C.yellow} color={C.navy} size={52} />
        <Pill text="Dr. Azren" bg={C.navy} size={52} />
      </div>
    </AbsoluteFill>
  );
};
