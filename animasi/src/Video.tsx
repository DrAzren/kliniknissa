import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import {TOPICS} from './topics';
import {phrases, sceneTimings} from './lib/timeline';
import {BottomLabel, Captions} from './components/Caption';
import {AvatarPreset} from './components/Avatar';
import avatars from '../config/avatars.json';
import {C} from './theme';

export type VideoProps = {topic: string; avatar: string; coverIntro: boolean; silent?: boolean};
export const COVER_INTRO = 0.5;
export const TAIL = 0.5;

export const getPreset = (id: string): AvatarPreset => {
  const p = (avatars as AvatarPreset[]).find((a) => a.id === id);
  if (!p) throw new Error(`Avatar "${id}" tiada dalam config/avatars.json`);
  return p;
};

export const Video: React.FC<VideoProps> = ({topic, avatar, coverIntro, silent}) => {
  const {fps} = useVideoConfig();
  const T = TOPICS[topic];
  const preset = getPreset(avatar);
  const scenes = sceneTimings(T.script, T.words);
  const ph = phrases(T.script, T.words);
  const off = coverIntro ? COVER_INTRO : 0;
  const offF = Math.round(off * fps);
  return (
    <AbsoluteFill style={{background: C.night[0]}}>
      {scenes.map((s, i) => {
        const from = offF + Math.round(s.start * fps);
        const isLast = i === scenes.length - 1;
        const to = isLast ? offF + Math.round((T.words.duration + (coverIntro ? 0 : TAIL)) * fps) : offF + Math.round(s.end * fps);
        const Comp = T.scenes[s.id];
        if (!Comp) throw new Error(`Babak "${s.id}" tiada komponen`);
        return (
          <Sequence key={s.id} from={from} durationInFrames={Math.max(1, to - from)} name={s.id}>
            <Comp preset={preset} dur={to - from} wf={T.words} start={s.start} fps={fps} />
            {s.n && s.label ? <BottomLabel n={s.n} text={s.label} /> : null}
          </Sequence>
        );
      })}
      <Captions phrases={ph} offset={off} />
      {coverIntro ? (
        <Sequence from={0} durationInFrames={offF} name="cover">
          <T.Cover preset={preset} script={T.script} />
        </Sequence>
      ) : null}
      {!silent ? (
        <Sequence from={offF}>
          <Audio src={staticFile(`topics/${topic}/voice.mp3`)} />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};

export const CoverStill: React.FC<{topic: string; avatar: string}> = ({topic, avatar}) => {
  const T = TOPICS[topic];
  return <T.Cover preset={getPreset(avatar)} script={T.script} />;
};
