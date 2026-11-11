import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset} from '../../components/Avatar';
import {Glow, NightSky, Pill} from '../../components/common';
import {ScriptFile} from '../../lib/timeline';
import {AMIR, Icon} from './scenes';

// Thumbnail 1080×1920 — semua teks penting dalam y 240–1680 (potongan grid 3:4)
export const Cover: React.FC<{preset: AvatarPreset; script: ScriptFile}> = ({preset, script}) => {
  const cv = script.cover;
  const T: React.CSSProperties = {fontFamily: FONT, fontWeight: 800, textAlign: 'center', width: 1080, position: 'absolute', left: 0, lineHeight: 1, textShadow: '0 8px 0 rgba(18,11,51,.7)'};
  return (
    <AbsoluteFill>
      <NightSky seed={41} glow={C.violet[2]} />
      <Glow x={300} y={1300} r={420} color="#F0566E" opacity={0.35} />
      <div style={{...T, top: 260, fontSize: 76, color: C.violet[4]}}>{cv.headline[0]}</div>
      <div style={{...T, top: 340, fontSize: 230, color: C.yellow}}>{cv.highlight}</div>
      <div style={{position: 'absolute', top: 590, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text={cv.sub} bg={C.labelPink} size={54} />
      </div>
      <div style={{position: 'absolute', top: 740, left: 150, width: 780, display: 'flex', justifyContent: 'space-between'}}>
        {(['lungs', 'inhaler', 'nosmoke'] as const).map((n, i) => (
          <div key={n} style={{width: 190, height: 190, borderRadius: 95, background: i % 2 ? C.violet[0] : C.navy, border: `6px solid ${C.yellow}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
            <Icon name={n} size={120} />
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', left: 30, top: 1010}}>
        <Avatar preset={AMIR} width={430} mood="shock" pose="clasp" seed={2} />
      </div>
      <div style={{position: 'absolute', left: 350, top: 985, background: C.yellow, color: C.navy, fontFamily: FONT, fontWeight: 800, fontSize: 40, padding: '14px 26px', borderRadius: 34, transform: 'rotate(-6deg)', boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>wiii… wiii…</div>
      <div style={{position: 'absolute', left: 600, top: 980}}>
        <Avatar preset={preset} width={450} mood="curious" pose="point" />
      </div>
      <div style={{position: 'absolute', top: 1570, width: 1080, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Dr. Azren" bg={C.navy} size={52} />
      </div>
    </AbsoluteFill>
  );
};
