import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT} from '../theme';
import {displayText, Phrase} from '../lib/timeline';
import {popScale, popOpacity} from './common';

// Kapsyen atas (y ≈ 300): satu frasa 2–5 perkataan; perkataan belum disebut malap.
export const Captions: React.FC<{phrases: Phrase[]; offset: number}> = ({phrases, offset}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps - offset;
  const p = phrases.find((x) => t >= x.start - 0.05 && t < x.end);
  if (!p) return null;
  const since = Math.round((t - p.start) * fps);
  if (p.number) {
    return (
      <div style={{position: 'absolute', top: 300 - 70, left: 0, width: 1080, textAlign: 'center'}}>
        <span
          style={{
            display: 'inline-block',
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 110,
            color: C.yellow,
            transform: `scale(${popScale(since)})`,
            opacity: popOpacity(since),
            textShadow: '0 6px 0 rgba(18,11,51,0.65), 0 0 40px rgba(18,11,51,0.6)',
          }}
        >
          {displayText(p.tokens[0].text)}
        </span>
      </div>
    );
  }
  return (
    <div
      style={{
        position: 'absolute',
        top: 300 - 50,
        left: 60,
        width: 960,
        textAlign: 'center',
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 76,
        lineHeight: 1.18,
        textShadow: '0 5px 0 rgba(18,11,51,0.7), 0 0 30px rgba(18,11,51,0.75)',
      }}
    >
      {p.tokens.map((tk, i) => {
        const on = t >= tk.start - 0.02;
        return (
          <span key={i} style={{color: tk.key ? C.yellow : '#fff', opacity: on ? 1 : 0.28}}>
            {displayText(tk.text)}
            {i < p.tokens.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </div>
  );
};

// Label bawah: lencana kuning "#N" + label navy (y ≈ 1440)
export const BottomLabel: React.FC<{n: number; text: string; at?: number}> = ({n, text, at = 6}) => {
  const f = useCurrentFrame() - at;
  if (f < 0) return null;
  return (
    <div style={{position: 'absolute', top: 1440 - 55, left: 0, width: 1080, display: 'flex', justifyContent: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', transform: `scale(${popScale(f)})`, opacity: popOpacity(f)}}>
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: 55,
            background: C.yellow,
            color: C.navy,
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            boxShadow: '0 8px 24px rgba(18,11,51,0.5)',
          }}
        >
          #{n}
        </div>
        <div
          style={{
            background: C.navy,
            color: '#fff',
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 50,
            padding: '22px 44px 22px 52px',
            marginLeft: -26,
            borderRadius: '0 50px 50px 0',
            boxShadow: '0 8px 24px rgba(18,11,51,0.5)',
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};
