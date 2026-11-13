import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset} from '../../components/Avatar';
import {Glow, NightSky, Pill} from '../../components/common';
import {ScriptFile} from '../../lib/timeline';
import {HAKIM_PATTERN, MoodGraph} from './scenes';

// Thumbnail 1080×1920 — teks penting dalam y 240–1680 (potongan grid 3:4)
export const Cover: React.FC<{preset: AvatarPreset; script: ScriptFile}> = ({preset, script}) => {
  const cv = script.cover;
  const T: React.CSSProperties = {fontFamily: FONT, fontWeight: 800, textAlign: 'center', width: 1080, position: 'absolute', left: 0, lineHeight: 1, textShadow: '0 8px 0 rgba(18,11,51,.7)'};
  return (
    <AbsoluteFill>
      <NightSky seed={91} glow={C.violet[2]} />
      <Glow x={540} y={1150} r={540} color="#F6C945" opacity={0.18} />
      <div style={{...T, top: 250, fontSize: 70, color: C.violet[4]}}>{cv.kicker}</div>
      <div style={{...T, top: 330, fontSize: 170, color: C.yellow}}>{cv.headline[0]}</div>
      <div style={{...T, top: 500, fontSize: 150, color: '#fff'}}>{cv.headline[1]}</div>
      <div style={{position: 'absolute', top: 690, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.highlight} bg={C.labelPink} size={58} />
      </div>
      <div style={{position: 'absolute', left: 90, top: 850}}>
        <MoodGraph points={HAKIM_PATTERN} progress={1} w={900} h={340} labels={{hipo: -100, low: -100}} />
      </div>
      <div style={{position: 'absolute', left: 300, top: 1240}}>
        <Avatar preset={preset} width={480} mood="curious" pose="point" />
      </div>
      <div style={{position: 'absolute', top: 1520, width: 1080, display: 'flex', justifyContent: 'center', gap: 18}}>
        {cv.tags.map((t, i) => (
          <Pill key={t} text={t} bg={i ? '#4F8FE0' : C.yellow} color={i ? '#fff' : C.navy} size={40} />
        ))}
      </div>
      <div style={{position: 'absolute', top: 1640, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Dr. Azren" bg={C.navy} size={52} />
      </div>
    </AbsoluteFill>
  );
};
