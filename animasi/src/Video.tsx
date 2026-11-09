import React from 'react';
import {AbsoluteFill, Audio, interpolate, Sequence, staticFile, useVideoConfig} from 'remotion';
import {TOPICS} from './topics';
import {norm, phrases, sceneTimings, wordTime} from './lib/timeline';
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
      {!silent && T.script.audio ? <AudioBed topic={topic} offF={offF} scenes={scenes} /> : null}
    </AbsoluteFill>
  );
};

export const CoverStill: React.FC<{topic: string; avatar: string}> = ({topic, avatar}) => {
  const T = TOPICS[topic];
  return <T.Cover preset={getPreset(avatar)} script={T.script} />;
};

// Muzik latar + SFX (pilihan, dari script.json "audio")
const AudioBed: React.FC<{topic: string; offF: number; scenes: ReturnType<typeof sceneTimings>}> = ({topic, offF, scenes}) => {
  const {fps, durationInFrames} = useVideoConfig();
  const T = TOPICS[topic];
  const a = T.script.audio!;
  const src = (f: string) => staticFile(`topics/${topic}/${f}`);
  const voiceEndF = offF + Math.round(T.words.duration * fps);
  const cues = (a.sfx ?? []).map((c, i) => {
    const t = typeof c.at === 'number' ? c.at : wordTime(T.words, c.at, 0, -1);
    if (t < 0) throw new Error(`SFX "${c.file}": frasa "${c.at}" tiada dalam words.json`);
    return {...c, key: `${i}-${norm(String(c.at))}`, from: offF + Math.max(0, Math.round((t + (c.offset ?? 0)) * fps))};
  });
  const m = a.music;
  return (
    <>
      {m ? (
        <Audio
          src={src(m.file)}
          volume={(f) => {
            const fin = interpolate(f, [0, (m.fadeIn ?? 0) * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            const fout = interpolate(f, [durationInFrames - (m.fadeOut ?? 0) * fps, durationInFrames], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            const tail = interpolate(f, [voiceEndF, voiceEndF + 8], [m.volume, m.endVolume ?? m.volume], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            return tail * fin * fout;
          }}
        />
      ) : null}
      {a.whooshOnCuts
        ? scenes.slice(1).map((s) => (
            <Sequence key={`w${s.id}`} from={offF + Math.max(0, Math.round(s.start * fps) - 6)} durationInFrames={fps * 2}>
              <Audio src={src('sfx/whoosh.mp3')} volume={a.whooshOnCuts} />
            </Sequence>
          ))
        : null}
      {cues.map((c) => (
        <Sequence key={c.key} from={c.from} durationInFrames={fps * 4}>
          <Audio src={src(`sfx/${c.file}`)} volume={c.volume ?? 1} />
        </Sequence>
      ))}
    </>
  );
};
