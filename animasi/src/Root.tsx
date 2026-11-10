import React from 'react';
import {Composition, Still, CalculateMetadataFunction} from 'remotion';
import {Video, CoverStill, VideoProps, COVER_INTRO, TAIL} from './Video';
import {AvatarSheet} from './AvatarSheet';
import {TOPICS} from './topics';
import {FPS, H, W} from './theme';
import './fonts';

const calc: CalculateMetadataFunction<VideoProps> = ({props}) => {
  const T = TOPICS[props.topic];
  if (!T) throw new Error(`Topik "${props.topic}" tidak didaftarkan dalam src/topics/index.ts`);
  // tempoh = suara + 0.5 s (0.5 s cover di depan, atau 0.5 s ekor)
  const secs = T.words.duration + (props.coverIntro ? COVER_INTRO : TAIL);
  return {durationInFrames: Math.ceil(secs * FPS)};
};

export const Root: React.FC = () => (
  <>
    <Composition id="Video" component={Video} width={W} height={H} fps={FPS} durationInFrames={300}
      defaultProps={{topic: 'dunia-tanpa-kesihatan-mental', avatar: 'dr-azren', coverIntro: false, silent: false} as VideoProps}
      calculateMetadata={calc} />
    <Still id="Cover" component={CoverStill} width={W} height={H} defaultProps={{topic: 'dunia-tanpa-kesihatan-mental', avatar: 'dr-azren'}} />
    <Still id="AvatarSheet" component={AvatarSheet} width={1080} height={1920} defaultProps={{avatar: 'dr-azren'}} />
  </>
);
