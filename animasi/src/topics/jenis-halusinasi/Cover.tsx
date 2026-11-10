import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset} from '../../components/Avatar';
import {Glow, NightSky, Pill} from '../../components/common';
import {ScriptFile} from '../../lib/timeline';
import {Icon, PAKCIK} from './scenes';

// Thumbnail 1080×1920 — semua teks penting dalam y 240–1680 (potongan grid 3:4)
const GHOST: React.CSSProperties = {filter: 'saturate(0.35) brightness(1.35) drop-shadow(0 0 22px #9EC3FF) drop-shadow(0 0 8px #fff)', opacity: 0.75};
const KID = (hair: string, col: string, hj?: string): AvatarPreset => ({id: 'k', skin: '#F2C6A2', skinShade: '#DDAA84', hair, hairColor: '#2A2233', top: 'tee', topColor: col, hijabColor: hj, accessory: null});

export const Cover: React.FC<{preset: AvatarPreset; script: ScriptFile}> = ({preset, script}) => {
  const cv = script.cover;
  const T: React.CSSProperties = {fontFamily: FONT, fontWeight: 800, textAlign: 'center', width: 1080, position: 'absolute', left: 0, lineHeight: 1, textShadow: '0 8px 0 rgba(18,11,51,.7)'};
  return (
    <AbsoluteFill>
      <NightSky seed={41} glow={C.violet[2]} />
      <Glow x={760} y={1250} r={420} color="#9EC3FF" opacity={0.3} />
      <div style={{...T, top: 260, fontSize: 72, color: C.violet[4]}}>{cv.headline[0]}</div>
      <div style={{...T, top: 345, fontSize: 142, color: C.yellow}}>{cv.highlight}</div>
      <div style={{position: 'absolute', top: 530, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.sub} bg={C.labelPink} size={54} />
      </div>
      {/* 5 deria */}
      <div style={{position: 'absolute', top: 680, left: 60, width: 960, display: 'flex', justifyContent: 'space-between'}}>
        {(['ear', 'eye', 'hand', 'nose', 'tongue'] as const).map((n, i) => (
          <div key={n} style={{width: 170, height: 170, borderRadius: 85, background: i % 2 ? C.violet[0] : C.navy, border: `6px solid ${C.yellow}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
            <Icon name={n} size={110} />
          </div>
        ))}
      </div>
      {/* Pakcik Hamid + budak bercahaya, Dr. Azren */}
      <div style={{position: 'absolute', left: 20, top: 960}}>
        <Avatar preset={PAKCIK} width={380} mood="shock" pose="clasp" seed={3} />
      </div>
      <div style={{position: 'absolute', left: 400, top: 1220, ...GHOST}}>
        <Avatar preset={KID('short', '#F6C945')} width={200} mood="happy" pose="wave" seed={8} />
      </div>
      <div style={{position: 'absolute', left: 540, top: 1260, ...GHOST}}>
        <Avatar preset={KID('hijab', '#FFFFFF', '#C394E6')} width={190} mood="happy" seed={9} />
      </div>
      <div style={{position: 'absolute', left: 660, top: 980}}>
        <Avatar preset={preset} width={400} mood="curious" pose="chin" />
      </div>
      <div style={{position: 'absolute', top: 1560, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Dr. Azren" bg={C.navy} size={52} />
      </div>
    </AbsoluteFill>
  );
};
