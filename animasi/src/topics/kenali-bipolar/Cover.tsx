import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset} from '../../components/Avatar';
import {Glow, NightSky, Pill} from '../../components/common';
import {ScriptFile} from '../../lib/timeline';
import {AINA, Icon} from './scenes';

// Thumbnail 1080×1920 — semua teks penting dalam y 240–1680 (potongan grid 3:4 TikTok)
export const Cover: React.FC<{preset: AvatarPreset; script: ScriptFile}> = ({preset, script}) => {
  const cv = script.cover;
  const T: React.CSSProperties = {fontFamily: FONT, fontWeight: 800, textAlign: 'center', width: 1080, position: 'absolute', left: 0, lineHeight: 1, textShadow: '0 8px 0 rgba(18,11,51,.7)'};
  return (
    <AbsoluteFill>
      <NightSky seed={41} glow={C.pink[0]} />
      {/* kiri hangat (mania), kanan biru (kemurungan) */}
      <div style={{position: 'absolute', left: 0, top: 820, width: 1080, height: 1100, background: `linear-gradient(90deg, ${C.pink[0]}55 0%, ${C.pink[0]}00 45%, #4F79C700 55%, #4F79C766 100%)`, WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 22%)', maskImage: 'linear-gradient(180deg, transparent 0%, #000 22%)'}} />
      <Glow x={540} y={1150} r={520} color={C.violet[3]} opacity={0.3} />
      <div style={{...T, top: 250, fontSize: 64, color: C.violet[4]}}>{cv.kicker}</div>
      <div style={{...T, top: 330, fontSize: 190, color: C.yellow}}>{cv.headline[0]}</div>
      <div style={{position: 'absolute', top: 540, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={`${cv.headline[1]} ${cv.highlight}`} bg={C.labelPink} size={70} />
      </div>
      <div style={{position: 'absolute', top: 690, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.sub} bg={C.yellow} color={C.navy} size={42} />
      </div>
      {/* Aina: kiri ceria (mania), kanan murung; Dr. Azren di tengah */}
      <div style={{position: 'absolute', left: 10, top: 930}}>
        <Avatar preset={AINA} width={370} mood="happy" pose="wave" seed={1} />
      </div>
      <div style={{position: 'absolute', left: 30, top: 840, transform: 'rotate(-10deg)'}}>
        <Icon name="bag" size={130} />
      </div>
      <div style={{position: 'absolute', left: 700, top: 930, filter: 'saturate(0.6)'}}>
        <Avatar preset={AINA} width={370} mood="sad" pose="clasp" seed={2} />
      </div>
      <div style={{position: 'absolute', left: 325, top: 1010}}>
        <Avatar preset={preset} width={430} mood="curious" pose="chin" />
      </div>
      <div style={{position: 'absolute', left: 40, top: 1440}}>
        <Pill text="▲ Mania" bg={C.yellow} color={C.navy} size={38} />
      </div>
      <div style={{position: 'absolute', left: 735, top: 1440}}>
        <Pill text="▼ Murung" bg="#4F79C7" size={38} />
      </div>
      <div style={{position: 'absolute', top: 1600, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Dr. Azren" bg={C.navy} size={52} />
      </div>
    </AbsoluteFill>
  );
};
