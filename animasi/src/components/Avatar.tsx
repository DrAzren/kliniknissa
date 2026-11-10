import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../theme';

export type Mood = 'neutral' | 'happy' | 'tired' | 'angry' | 'sad' | 'shock' | 'fake-smile' | 'curious';
export type Pose = 'down' | 'clasp' | 'point' | 'wave' | 'chin';

export type AvatarPreset = {
  id: string;
  name?: string;
  skin: string;
  skinShade: string;
  hair: 'side-part' | 'short' | 'short-grey' | string;
  hairColor: string;
  top: 'scrubs' | 'hoodie' | string;
  topColor: string;
  topShade?: string;
  accessory?: 'glasses-round' | 'glasses' | null | string;
  glassesColor?: string;
  stethoscope?: boolean;
  watch?: boolean;
  stubble?: boolean;
  // watak cerita: hair='hijab' guna hijabColor/hijabShade; moustache untuk misai
  hijabColor?: string;
  hijabShade?: string;
  moustache?: boolean;
};

type Props = {
  preset: AvatarPreset;
  mood?: Mood;
  pose?: Pose;
  silhouette?: boolean;
  anger?: number; // 0..1 muka bertukar merah (mood angry)
  width?: number;
  style?: React.CSSProperties;
  seed?: number; // ofset kelipan mata supaya dua avatar tak berkelip serentak
};

const shadeOf = (hex: string, amt: number) => {
  const n = parseInt(hex.slice(1), 16);
  const f = (v: number) => Math.max(0, Math.min(255, Math.round(v + amt)));
  const r = f((n >> 16) & 255), g = f((n >> 8) & 255), b = f(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};

// Lengan: bahu -> siku -> tangan (lengan baju pendek di bahagian atas)
const Arm: React.FC<{pts: [number, number][]; skin: string; sleeve: string; hand: string; watch?: string; pointer?: boolean; flip?: boolean}> = ({pts, skin, sleeve, hand, watch, pointer, flip}) => {
  const [s, e, h] = pts;
  const sl: [number, number] = [s[0] + (e[0] - s[0]) * 0.55, s[1] + (e[1] - s[1]) * 0.55];
  const d = `M ${sl[0]} ${sl[1]} Q ${e[0]} ${e[1]} ${h[0]} ${h[1]}`;
  // titik pergelangan (untuk jam)
  const t = 0.86;
  const wx = (1 - t) * (1 - t) * sl[0] + 2 * (1 - t) * t * e[0] + t * t * h[0];
  const wy = (1 - t) * (1 - t) * sl[1] + 2 * (1 - t) * t * e[1] + t * t * h[1];
  const ang = (Math.atan2(h[1] - e[1], h[0] - e[0]) * 180) / Math.PI;
  return (
    <g>
      <path d={d} stroke={skin} strokeWidth={50} strokeLinecap="round" fill="none" />
      <path d={`M ${s[0]} ${s[1]} L ${sl[0]} ${sl[1]}`} stroke={sleeve} strokeWidth={74} strokeLinecap="round" fill="none" />
      {watch ? (
        <g transform={`translate(${wx} ${wy}) rotate(${ang + 90})`}>
          <rect x={-27} y={-9} width={54} height={18} rx={6} fill={watch} />
          <rect x={-12} y={-13} width={24} height={26} rx={7} fill="#2A2530" />
          <rect x={-8} y={-9} width={16} height={18} rx={5} fill="#E9C77A" />
        </g>
      ) : null}
      <circle cx={h[0]} cy={h[1]} r={31} fill={hand} />
      {pointer ? (
        <rect x={h[0] + (flip ? -58 : 14)} y={h[1] - 34} width={44} height={20} rx={10} fill={hand} transform={`rotate(${flip ? 30 : -30} ${h[0]} ${h[1]})`} />
      ) : null}
    </g>
  );
};

export const Avatar: React.FC<Props> = ({preset, mood = 'neutral', pose = 'down', silhouette = false, anger = 0, width = 600, style, seed = 0}) => {
  const frame = useCurrentFrame();
  const S = C.shadow;
  const c = (x: string) => (silhouette ? S : x);
  const skin = c(preset.skin);
  const skinShade = c(preset.skinShade);
  const hair = c(preset.hairColor);
  const top = c(preset.topColor);
  const topShade = c(preset.topShade ?? shadeOf(preset.topColor, -30));
  const ink = c('#1E1A2A');
  const glass = c(preset.glassesColor ?? '#2A2133');
  const hijab = preset.hair === 'hijab';
  const hj = c(preset.hijabColor ?? '#E8A3B8');
  const hjShade = c(preset.hijabShade ?? shadeOf(preset.hijabColor ?? '#E8A3B8', -28));

  // pernafasan & kelipan
  const breathe = Math.sin(((frame + seed * 17) / 30) * Math.PI * 0.5) * 4;
  const cyc = (frame + seed * 41) % 96;
  const blink = cyc < 4 ? [1, 0.35, 0.1, 0.5][cyc] : 1;
  const eyeRy = 17 * (mood === 'tired' ? 0.55 : 1) * blink;

  // kening (kiri/kanan penonton): [x1,y1,x2,y2]
  const brows: Record<Mood, [number[], number[]]> = {
    neutral: [[212, 206, 262, 200], [338, 200, 388, 206]],
    happy: [[212, 200, 262, 194], [338, 194, 388, 200]],
    'fake-smile': [[212, 198, 262, 192], [338, 192, 388, 198]],
    tired: [[212, 214, 262, 214], [338, 214, 388, 214]],
    sad: [[214, 210, 262, 196], [338, 196, 386, 210]],
    angry: [[214, 194, 264, 216], [336, 216, 386, 194]],
    shock: [[212, 186, 262, 178], [338, 178, 388, 186]],
    curious: [[212, 206, 262, 202], [338, 186, 388, 194]],
  };
  const [bl, br] = brows[mood];

  const armPts: Record<Pose, {l: [number, number][]; r: [number, number][]; pointR?: boolean}> = {
    down: {l: [[150, 520], [122, 640], [132, 745]], r: [[450, 520], [478, 640], [468, 745]]},
    clasp: {l: [[150, 520], [125, 650], [270, 705]], r: [[450, 520], [475, 650], [330, 705]]},
    point: {l: [[150, 520], [122, 640], [132, 745]], r: [[450, 520], [530, 520], [580, 410]], pointR: true},
    wave: {l: [[150, 520], [122, 640], [132, 745]], r: [[450, 520], [545, 500], [560, 360]]},
    chin: {l: [[150, 520], [125, 650], [270, 705]], r: [[450, 520], [500, 640], [370, 418]]},
  };
  const arms = armPts[pose];
  const wave = pose === 'wave' ? Math.sin((frame / 30) * Math.PI * 3) * 10 : 0;

  const smile = mood === 'happy' || mood === 'fake-smile';
  const rightArm = (
    <g transform={wave ? `rotate(${wave} 450 520)` : undefined}>
      <Arm pts={arms.r} skin={skin} sleeve={top} hand={skin} watch={preset.watch ? c('#1F1B27') : undefined} pointer={arms.pointR} />
    </g>
  );
  const hideHead = false;

  return (
    <svg viewBox="0 0 600 760" width={width} height={(width * 760) / 600} style={{overflow: 'visible', ...style}}>
      <defs>
        <clipPath id={`head-${seed}`}>
          <circle cx={300} cy={250} r={175} />
        </clipPath>
      </defs>
      <g transform={`translate(0 ${breathe})`}>
        {/* Hijab: kain belakang (di belakang badan) */}
        {hijab ? <path d="M 112 250 C 96 420 120 520 170 560 L 430 560 C 480 520 504 420 488 250 Z" fill={hjShade} /> : null}
        {/* Badan (scrub) */}
        <path d="M 112 780 L 124 560 Q 134 452 236 430 L 364 430 Q 466 452 476 560 L 488 780 Z" fill={top} />
        <path d="M 400 440 Q 466 456 476 560 L 488 780 L 420 780 Q 430 600 400 440 Z" fill={topShade} opacity={silhouette ? 1 : 0.55} />
        {/* Leher */}
        <rect x={262} y={372} width={76} height={80} rx={24} fill={skinShade} />
        {/* Leher V */}
        <path d="M 246 430 L 354 430 L 300 532 Z" fill={topShade} />
        <path d="M 260 430 L 340 430 L 300 508 Z" fill={skin} />
        <path d="M 260 430 L 340 430 L 322 452 L 278 452 Z" fill={skinShade} />
        {/* Poket dada (scrub sahaja) */}
        {preset.top === 'scrubs' ? (
          <g>
            <rect x={352} y={572} width={76} height={70} rx={10} fill={topShade} opacity={silhouette ? 1 : 0.6} />
            <rect x={352} y={572} width={76} height={12} rx={6} fill={topShade} />
            {!silhouette ? <rect x={364} y={556} width={8} height={34} rx={4} fill={C.violet[1]} /> : null}
          </g>
        ) : null}
        {/* Hijab bawal: labuh di dada */}
        {hijab ? (
          <g>
            <path d="M 132 380 C 150 520 220 600 300 612 C 380 600 450 520 468 380 Z" fill={hj} />
            <path d="M 300 612 C 380 600 450 520 468 380 L 440 380 C 420 500 370 572 300 590 Z" fill={hjShade} opacity={0.6} />
          </g>
        ) : null}
        {/* Stetoskop */}
        {preset.stethoscope ? (
          <g fill="none" stroke={c('#1F1B27')} strokeWidth={10} strokeLinecap="round">
            <path d="M 262 428 C 226 476 222 548 246 606" />
            <path d="M 338 428 C 378 476 384 560 362 626" />
            <path d="M 246 606 L 230 640" strokeWidth={7} stroke={c('#C9CED8')} />
            <path d="M 246 606 L 266 642" strokeWidth={7} stroke={c('#C9CED8')} />
            <circle cx={230} cy={644} r={6} fill={c('#1F1B27')} stroke="none" />
            <circle cx={266} cy={646} r={6} fill={c('#1F1B27')} stroke="none" />
            <circle cx={362} cy={650} r={24} fill={c('#C9CED8')} stroke="none" />
            <circle cx={362} cy={650} r={14} fill={c('#8F95A3')} stroke="none" />
          </g>
        ) : null}
        {/* Lengan */}
        <Arm pts={arms.l} skin={skin} sleeve={top} hand={skin} />
        {pose !== 'chin' ? rightArm : null}

        {/* Kepala */}
        {!hideHead ? (
          <g>
            {!hijab ? (
              <g>
                <circle cx={130} cy={272} r={32} fill={skinShade} />
                <circle cx={470} cy={272} r={32} fill={skinShade} />
                <circle cx={130} cy={272} r={18} fill={c(shadeOf(preset.skinShade, -18))} />
                <circle cx={470} cy={272} r={18} fill={c(shadeOf(preset.skinShade, -18))} />
              </g>
            ) : null}
            <circle cx={300} cy={250} r={175} fill={skinShade} />
            <g clipPath={`url(#head-${seed})`}>
              <circle cx={286} cy={236} r={175} fill={skin} />
              {mood === 'angry' && !silhouette ? <circle cx={300} cy={250} r={175} fill={C.labelPink} opacity={0.5 * anger} /> : null}
              {preset.stubble ? (
                <g fill={hair} opacity={silhouette ? 1 : 0.07}>
                  <path d="M 196 352 Q 300 470 404 352 Q 404 420 300 430 Q 196 420 196 352 Z" />
                  <ellipse cx={300} cy={346} rx={46} ry={11} />
                </g>
              ) : null}
            </g>

            {/* Rambut belah tepi (side-part) */}
            {preset.hair === 'side-part' || preset.hair === 'short' || preset.hair === 'short-grey' ? (
              <g fill={hair}>
                <path d="M 128 268 C 104 150 190 58 312 52 C 436 48 506 132 474 262 C 466 214 448 176 420 158 C 360 182 270 186 196 150 C 162 178 140 218 128 268 Z" />
                {/* jambul disikat ke kanan */}
                <path d="M 190 152 C 196 76 290 36 376 54 C 446 68 486 118 476 182 C 446 130 384 112 322 124 C 268 134 222 152 190 152 Z" />
                <path d="M 128 268 C 124 240 128 220 140 200 L 148 262 Z" />
                <path d="M 472 262 C 476 236 472 216 462 198 L 452 258 Z" />
                {!silhouette ? <path d="M 236 108 C 280 84 350 80 404 98 C 360 92 300 96 252 116 Z" fill={c('#3A3150')} /> : null}
                {!silhouette ? <path d="M 214 140 C 222 120 236 104 252 94" stroke={c('#3A3150')} strokeWidth={5} strokeLinecap="round" fill="none" /> : null}
              </g>
            ) : null}

            {/* Hijab: bingkai muka */}
            {hijab ? (
              <g>
                <path
                  fillRule="evenodd"
                  d="M 300 38 C 430 38 512 130 506 270 C 500 400 420 470 300 474 C 180 470 100 400 94 270 C 88 130 170 38 300 38 Z M 300 120 C 210 120 152 190 152 280 C 152 370 214 432 300 432 C 386 432 448 370 448 280 C 448 190 390 120 300 120 Z"
                  fill={hj}
                />
                <path d="M 160 196 C 200 132 400 132 440 196 C 400 158 200 158 160 196 Z" fill={hjShade} opacity={0.7} />
                {!silhouette ? <path d="M 150 120 C 190 76 250 56 300 54" stroke="rgba(255,255,255,0.35)" strokeWidth={10} strokeLinecap="round" fill="none" /> : null}
              </g>
            ) : null}

            {/* Mata */}
            {mood === 'fake-smile' || (mood === 'happy' && false) ? (
              <g stroke={ink} strokeWidth={9} strokeLinecap="round" fill="none">
                <path d="M 220 278 Q 240 252 260 278" />
                <path d="M 340 278 Q 360 252 380 278" />
              </g>
            ) : (
              <g>
                <ellipse cx={240} cy={272} rx={mood === 'shock' ? 13 : 17} ry={mood === 'shock' ? 13 * blink : eyeRy} fill={ink} />
                <ellipse cx={360} cy={272} rx={mood === 'shock' ? 13 : 17} ry={mood === 'shock' ? 13 * blink : eyeRy} fill={ink} />
                {blink > 0.6 && !silhouette ? (
                  <g fill="#fff">
                    <circle cx={246} cy={265} r={6} />
                    <circle cx={366} cy={265} r={6} />
                  </g>
                ) : null}
                {mood === 'tired' ? (
                  <g fill={skin}>
                    <rect x={218} y={248} width={44} height={22} />
                    <rect x={338} y={248} width={44} height={22} />
                  </g>
                ) : null}
              </g>
            )}
            {mood === 'tired' && !silhouette ? (
              <g fill={C.pink[2]} opacity={0.38}>
                <ellipse cx={240} cy={302} rx={26} ry={9} />
                <ellipse cx={360} cy={302} rx={26} ry={9} />
              </g>
            ) : null}

            {/* Kening */}
            <g stroke={hair} strokeWidth={11} strokeLinecap="round">
              <line x1={bl[0]} y1={bl[1]} x2={bl[2]} y2={bl[3]} />
              <line x1={br[0]} y1={br[1]} x2={br[2]} y2={br[3]} />
            </g>

            {/* Cermin mata bulat */}
            {preset.accessory === 'glasses-round' || preset.accessory === 'glasses' ? (
              <g fill="none" stroke={glass} strokeWidth={6}>
                <circle cx={240} cy={270} r={44} fill={silhouette ? 'none' : 'rgba(255,255,255,0.10)'} />
                <circle cx={360} cy={270} r={44} fill={silhouette ? 'none' : 'rgba(255,255,255,0.10)'} />
                <path d="M 284 266 Q 300 254 316 266" />
                <path d="M 196 262 L 140 254" />
                <path d="M 404 262 L 460 254" />
                {!silhouette ? <path d="M 218 246 Q 228 238 240 236" stroke="rgba(255,255,255,0.55)" strokeWidth={5} strokeLinecap="round" /> : null}
                {!silhouette ? <path d="M 338 246 Q 348 238 360 236" stroke="rgba(255,255,255,0.55)" strokeWidth={5} strokeLinecap="round" /> : null}
              </g>
            ) : null}

            {/* Hidung & pipi */}
            <ellipse cx={300} cy={316} rx={15} ry={11} fill={skinShade} />
            {preset.moustache ? <path d="M 252 346 Q 276 326 300 340 Q 324 326 348 346 Q 324 352 300 346 Q 276 352 252 346 Z" fill={hair} /> : null}
            {!silhouette && mood !== 'sad' && mood !== 'tired' ? (
              <g fill={C.pink[0]} opacity={smile ? 0.55 : 0.4}>
                <ellipse cx={200} cy={334} rx={28} ry={15} />
                <ellipse cx={400} cy={334} rx={28} ry={15} />
              </g>
            ) : null}

            {/* Mulut */}
            {smile ? (
              <g>
                <path d="M 250 356 Q 300 424 350 356 Z" fill={c('#5B1F3D')} />
                {!silhouette ? <path d="M 258 358 L 342 358 L 336 370 L 264 370 Z" fill="#fff" /> : null}
                {!silhouette ? <path d="M 276 392 Q 300 380 324 392 Q 300 406 276 392 Z" fill={C.pink[0]} /> : null}
              </g>
            ) : mood === 'shock' ? (
              <ellipse cx={300} cy={380} rx={20} ry={26} fill={c('#5B1F3D')} />
            ) : mood === 'angry' ? (
              <g>
                <rect x={262} y={366} width={76} height={26} rx={10} fill={c('#5B1F3D')} />
                {!silhouette ? <rect x={268} y={370} width={64} height={9} rx={4} fill="#fff" /> : null}
              </g>
            ) : (
              <path
                d={
                  mood === 'sad'
                    ? 'M 266 384 Q 300 362 334 384'
                    : mood === 'tired'
                      ? 'M 274 376 Q 300 372 326 378'
                      : mood === 'curious'
                        ? 'M 270 370 Q 306 386 334 362'
                        : 'M 262 364 Q 300 390 338 364'
                }
                stroke={c('#5B1F3D')}
                strokeWidth={8}
                strokeLinecap="round"
                fill="none"
              />
            )}
          </g>
        ) : null}
        {pose === 'chin' ? rightArm : null}
      </g>
    </svg>
  );
};
