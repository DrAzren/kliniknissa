import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Avatar, Mood, Pose} from './components/Avatar';
import {getPreset} from './Video';
import {C, FONT} from './theme';

// Helaian rujukan watak: semua mood + bayang (untuk semakan & video akan datang)
const MOODS: [Mood, Pose][] = [
  ['neutral', 'clasp'], ['happy', 'wave'], ['curious', 'chin'], ['tired', 'down'],
  ['sad', 'clasp'], ['angry', 'down'], ['shock', 'down'], ['fake-smile', 'point'],
];
export const AvatarSheet: React.FC<{avatar: string}> = ({avatar}) => {
  const p = getPreset(avatar);
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[0]}, ${C.night[3]})`, flexDirection: 'row', flexWrap: 'wrap', padding: 40, gap: 20, alignContent: 'flex-start'}}>
      <div style={{width: '100%', fontFamily: FONT, fontWeight: 800, fontSize: 64, color: C.yellow, textAlign: 'center'}}>{p.name ?? p.id}</div>
      {MOODS.map(([m, pose], i) => (
        <div key={m} style={{width: 320, height: 450, background: C.night[2], borderRadius: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden', position: 'relative'}}>
          <div style={{position: 'absolute', top: 16, fontFamily: FONT, fontWeight: 800, fontSize: 26, color: '#fff'}}>{m} · {pose}</div>
          <Avatar preset={p} width={300} mood={m} pose={pose} anger={m === 'angry' ? 0.7 : 0} seed={i} />
        </div>
      ))}
      <div style={{width: 980, height: 190, background: C.night[2], borderRadius: 30, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', gap: 40}}>
        <Avatar preset={p} width={150} mood="sad" silhouette />
        <div style={{fontFamily: FONT, fontWeight: 800, fontSize: 32, color: '#fff', alignSelf: 'center'}}>silhouette (#120B33)</div>
      </div>
    </AbsoluteFill>
  );
};
