import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset} from '../../components/Avatar';
import {Glow, NightSky, Pill} from '../../components/common';
import {Globe} from '../../components/Globe';
import {ScriptFile} from '../../lib/timeline';

// Thumbnail 1080×1920 — semua teks penting dalam y 240–1680 (potongan grid 3:4 TikTok)
export const Cover: React.FC<{preset: AvatarPreset; script: ScriptFile}> = ({preset, script}) => {
  const cv = script.cover;
  const T: React.CSSProperties = {fontFamily: FONT, fontWeight: 800, textAlign: 'center', width: 1080, position: 'absolute', left: 0, lineHeight: 1, textShadow: '0 8px 0 rgba(18,11,51,.7)'};
  return (
    <AbsoluteFill>
      <NightSky seed={77} glow={C.pink[0]} />
      <Glow x={540} y={1080} r={560} color={C.pink[0]} opacity={0.45} />
      <div style={{...T, top: 250, fontSize: 64, color: C.violet[4]}}>{cv.kicker}</div>
      <div style={{...T, top: 330, fontSize: 96, color: '#fff'}}>{cv.headline[0]}</div>
      <div style={{...T, top: 440, fontSize: 170, color: C.yellow}}>{cv.headline[1]}</div>
      <div style={{position: 'absolute', top: 632, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.highlight} bg={C.labelPink} size={74} />
      </div>
      <div style={{position: 'absolute', top: 772, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.sub} bg={C.yellow} color={C.navy} size={38} />
      </div>
      {/* bumi separuh kelabu / separuh berwarna */}
      <div style={{position: 'absolute', left: 540 - 270, top: 870}}>
        <div style={{position: 'relative', width: 540, height: 540}}>
          <Globe r={270} />
          <div style={{position: 'absolute', inset: 0, clipPath: 'inset(0 50% 0 0)'}}>
            <Globe r={270} grey={1} glow={false} />
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 540 - 250, top: 1110}}>
        <Avatar preset={preset} width={500} mood="shock" pose="down" />
      </div>
      {cv.tags.map((t, i) => (
        <div key={i} style={{position: 'absolute', left: [50, 580, 40, 640][i], top: [900, 950, 1270, 1320][i], transform: `rotate(${[-6, 5, 4, -5][i]}deg)`}}>
          <Pill text={t} bg={i % 2 ? C.violet[2] : C.navy} size={34} />
        </div>
      ))}
      <div style={{position: 'absolute', top: 1590, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Dr. Azren" bg={C.navy} size={52} />
      </div>
    </AbsoluteFill>
  );
};
