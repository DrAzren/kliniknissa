import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame, Easing} from 'remotion';
import {C, FONT} from '../../theme';
import {Avatar, AvatarPreset} from '../../components/Avatar';
import {Camera, clamp, Glow, NightSky, Pill, Pop, popScale} from '../../components/common';
import {Globe} from '../../components/Globe';
import {WordsFile, wordTime} from '../../lib/timeline';

export type SceneProps = {preset: AvatarPreset; dur: number; wf: WordsFile; start: number; fps: number};

// frame (relatif babak) bagi perkataan pertama frasa, selepas permulaan babak
const at = (p: SceneProps, phrase: string, fallbackSec: number) => {
  const t = wordTime(p.wf, phrase, p.start, p.start + fallbackSec);
  return Math.max(0, Math.round((t - p.start) * p.fps));
};

const Txt: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({children, size = 44, color = '#fff', style}) => (
  <div style={{fontFamily: FONT, fontWeight: 800, fontSize: size, color, ...style}}>{children}</div>
);

const AvatarAt: React.FC<{p: SceneProps; x: number; y: number; w: number} & Omit<React.ComponentProps<typeof Avatar>, 'preset' | 'width'>> = ({p, x, y, w, ...rest}) => (
  <div style={{position: 'absolute', left: x, top: y}}>
    <Avatar preset={p.preset} width={w} {...rest} />
  </div>
);

/* 0 — Intro: bumi berputar, Dr. Azren tertanya-tanya */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={3} />
      <div style={{position: 'absolute', left: 540 - 250, top: 470}}>
        <Globe r={250} />
      </div>
      {[0, 1, 2].map((i) => {
        const y = 520 + Math.sin(f / 14 + i * 2) * 16;
        return (
          <Txt key={i} size={[96, 70, 80][i]} color={C.yellow} style={{position: 'absolute', left: [180, 820, 870][i], top: y + [0, 40, 260][i], opacity: interpolate(f, [8 + i * 8, 16 + i * 8], [0, 1], clamp), transform: `rotate(${[-14, 12, 18][i]}deg)`}}>
            ?
          </Txt>
        );
      })}
      <AvatarAt p={p} x={540 - 290} y={960} w={580} mood="curious" pose="chin" />
    </Camera>
  );
};

/* 1 — Bandar tak bangun: subuh, jam loceng Isnin, Dr. Azren mengantuk */
export const Bandar: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const sunY = interpolate(f, [0, p.dur], [1040, 980], clamp);
  const shake = Math.sin(f * 2.2) * (f % 40 < 24 ? 7 : 0);
  const fadeWin = at(p, 'bangun', 2.2);
  return (
    <Camera dur={p.dur} to={1.1} panX={-25}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[0]} 0%, ${C.night[4]} 45%, ${C.pink[2]} 62%, ${C.pink[0]} 70%)`}} />
      <NightSky seed={11} stars={40} dim={0.6} top="transparent" bottom="transparent" glow={C.pink[0]} />
      <div style={{position: 'absolute', left: 540 - 150, top: sunY - 150, width: 300, height: 300, borderRadius: 150, background: C.yellow, boxShadow: `0 0 120px ${C.yellow}`}} />
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {new Array(9).fill(0).map((_, i) => {
          const w = 110 + random(`bw${i}`) * 70;
          const h = 220 + random(`bh${i}`) * 330;
          const x = i * 125 - 40;
          const col = i % 2 ? C.night[2] : C.night[3];
          return (
            <g key={i}>
              <rect x={x} y={1060 - h} width={w} height={h + 900} fill={col} />
              {new Array(Math.floor(h / 60)).fill(0).map((__, r) =>
                [0, 1, 2].map((cIdx) => {
                  const lit = random(`w${i}${r}${cIdx}`) > 0.55;
                  const off = f > fadeWin + random(`o${i}${r}${cIdx}`) * 20;
                  return <rect key={`${r}${cIdx}`} x={x + 18 + cIdx * ((w - 36) / 3)} y={1060 - h + 26 + r * 60} width={(w - 60) / 3} height={30} rx={4} fill={lit && !off ? C.yellow : C.night[0]} opacity={lit && !off ? 0.95 : 0.55} />;
                }),
              )}
            </g>
          );
        })}
        <rect x={0} y={1060} width={1080} height={900} fill={C.night[1]} />
      </svg>
      {/* Jam loceng */}
      <div style={{position: 'absolute', left: 660, top: 560, transform: `rotate(${shake}deg)`}}>
        <svg width={300} height={300} viewBox="0 0 300 300">
          <circle cx={80} cy={60} r={42} fill={C.labelPink} />
          <circle cx={220} cy={60} r={42} fill={C.labelPink} />
          <circle cx={150} cy={160} r={118} fill={C.labelPink} />
          <circle cx={150} cy={160} r={96} fill="#fff" />
          <line x1={150} y1={160} x2={150} y2={92} stroke={C.navy} strokeWidth={12} strokeLinecap="round" />
          <line x1={150} y1={160} x2={150} y2={110} stroke={C.navy} strokeWidth={12} strokeLinecap="round" transform="rotate(210 150 160)" />
          <rect x={60} y={268} width={30} height={26} rx={8} fill={C.navy} />
          <rect x={210} y={268} width={30} height={26} rx={8} fill={C.navy} />
        </svg>
      </div>
      <Pop at={6} style={{left: 690, top: 880}}>
        <Pill text="ISNIN 7:00" bg={C.navy} color={C.yellow} size={42} />
      </Pop>
      {/* Z terapung */}
      {[0, 1, 2].map((i) => {
        const ff = (f + i * 22) % 66;
        return (
          <Txt key={i} size={60 + i * 16} color={C.violet[4]} style={{position: 'absolute', left: 420 + ff * 1.4 + i * 10, top: 860 - ff * 4.5, opacity: interpolate(ff, [0, 10, 50, 66], [0, 1, 1, 0])}}>
            Z
          </Txt>
        );
      })}
      <AvatarAt p={p} x={40} y={900} w={540} mood="tired" pose="down" />
      <Pop at={at(p, 'semangat', 3.2)} style={{left: 560, top: 1120}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, background: C.navy, padding: '18px 26px', borderRadius: 40, boxShadow: '0 10px 30px rgba(18,11,51,.5)'}}>
          <svg width={86} height={44} viewBox="0 0 86 44">
            <rect x={2} y={2} width={74} height={40} rx={9} fill="none" stroke="#fff" strokeWidth={4} />
            <rect x={78} y={14} width={6} height={16} rx={2} fill="#fff" />
            <rect x={8} y={8} width={interpolate(f % 30, [0, 15, 30], [8, 3, 8])} height={28} rx={4} fill={C.labelPink} />
          </svg>
          <Txt size={40}>Semangat 2%</Txt>
        </div>
      </Pop>
    </Camera>
  );
};

/* 2 — Pejabat lengang: meja kosong, rumpai bergolek, 12 bilion hari kerja */
export const Pejabat: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const cardAt = at(p, 'dua belas', 2.4);
  const count = Math.round(interpolate(f, [cardAt, cardAt + 24], [0, 12], {...clamp, easing: Easing.out(Easing.cubic)}));
  const tumble = interpolate(f, [0, p.dur], [-200, 1200]);
  return (
    <Camera dur={p.dur} to={1.08} panX={20}>
      <AbsoluteFill style={{background: C.night[3]}} />
      <div style={{position: 'absolute', left: 0, top: 1180, width: 1080, height: 800, background: C.night[2]}} />
      {/* tingkap pejabat */}
      {[0, 1, 2].map((i) => (
        <div key={i} style={{position: 'absolute', left: 90 + i * 320, top: 480, width: 260, height: 300, borderRadius: 18, background: `linear-gradient(180deg, ${C.violet[0]}, ${C.night[4]})`, opacity: 0.8}} />
      ))}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
        {[0, 1, 2].map((i) => {
          const x = 60 + i * 340;
          return (
            <g key={i}>
              <rect x={x + 60} y={880} width={180} height={120} rx={12} fill={C.night[0]} />
              <rect x={x + 70} y={890} width={160} height={100} rx={8} fill={C.night[1]} />
              <rect x={x + 135} y={1000} width={30} height={40} fill={C.night[0]} />
              <rect x={x + 10} y={1040} width={280} height={26} rx={10} fill={C.violet[0]} />
              <rect x={x + 30} y={1066} width={20} height={120} fill={C.violet[0]} />
              <rect x={x + 250} y={1066} width={20} height={120} fill={C.violet[0]} />
              {/* kerusi kosong */}
              <rect x={x + 100} y={1110} width={100} height={70} rx={20} fill={C.pink[1]} opacity={0.8} />
              <rect x={x + 145} y={1180} width={10} height={50} fill={C.pink[2]} />
            </g>
          );
        })}
        {/* rumpai bergolek */}
        <g transform={`translate(${tumble} ${1250 + Math.abs(Math.sin(f / 6)) * -40}) rotate(${f * 9})`}>
          <circle r={54} fill="none" stroke={C.violet[3]} strokeWidth={7} strokeDasharray="30 14" />
          <circle r={34} fill="none" stroke={C.violet[3]} strokeWidth={6} strokeDasharray="20 12" />
          <path d="M -50 0 L 50 0 M 0 -50 L 0 50 M -35 -35 L 35 35" stroke={C.violet[3]} strokeWidth={5} />
        </g>
      </svg>
      {/* kad statistik */}
      <Pop at={cardAt} style={{left: 90, top: 540, width: 900}}>
        <div style={{background: C.navy, borderRadius: 40, padding: '36px 40px', textAlign: 'center', boxShadow: '0 20px 50px rgba(18,11,51,.6)'}}>
          <Txt size={150} color={C.yellow} style={{lineHeight: 1}}>
            {count} BILION
          </Txt>
          <Txt size={50} style={{marginTop: 10}}>hari kerja hilang setiap tahun</Txt>
          <Txt size={30} color={C.violet[3]} style={{marginTop: 14}}>Anggaran WHO &amp; ILO (2022): kemurungan &amp; kebimbangan</Txt>
        </div>
      </Pop>
      <AvatarAt p={p} x={600} y={1010} w={440} mood="shock" pose="down" seed={2} />
      <Pop at={8} style={{left: 90, top: 860}}>
        <Pill text="Tutup" bg={C.labelPink} size={36} />
      </Pop>
    </Camera>
  );
};

/* 3 — Hubungan retak: Dr. Azren marah, gambar keluarga retak */
export const Rumah: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const anger = interpolate(f, [0, p.dur * 0.6], [0, 1], clamp);
  const crackAt = at(p, 'rumah', 2.0);
  const crack = interpolate(f, [crackAt, crackAt + 14], [0, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.1} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.violet[0]} 0%, ${C.night[4]} 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1300, width: 1080, height: 700, background: C.night[2]}} />
      {/* lampu & sofa */}
      <div style={{position: 'absolute', left: 60, top: 1110, width: 960, height: 220, borderRadius: 60, background: C.pink[2]}} />
      <div style={{position: 'absolute', left: 820, top: 540, width: 160, height: 110, borderRadius: '20px 20px 60px 60px', background: C.yellow, boxShadow: `0 40px 120px ${C.yellow}88`}} />
      <div style={{position: 'absolute', left: 893, top: 650, width: 14, height: 480, background: C.night[0]}} />
      {/* bingkai gambar keluarga */}
      <div style={{position: 'absolute', left: 120, top: 500, width: 340, height: 270, borderRadius: 18, background: C.yellow, padding: 16, transform: `rotate(${crack * -5}deg)`}}>
        <div style={{width: '100%', height: '100%', borderRadius: 10, background: C.violet[3], position: 'relative', overflow: 'hidden'}}>
          <svg viewBox="0 0 308 238" width="100%" height="100%">
            {[70, 154, 238].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy={110 + (i === 1 ? 20 : 0)} r={i === 1 ? 28 : 36} fill={[C.pink[0], C.green, C.violet[2]][i]} />
                <rect x={x - 40} y={150} width={80} height={100} rx={36} fill={[C.pink[1], C.green, C.violet[1]][i]} />
              </g>
            ))}
            <path d="M 160 0 L 140 60 L 175 100 L 130 160 L 165 238" stroke="#fff" strokeWidth={8} fill="none" strokeLinejoin="round" strokeDasharray={320} strokeDashoffset={320 * (1 - crack)} />
          </svg>
        </div>
      </div>
      {/* asap dari kepala */}
      {[0, 1, 2, 3].map((i) => {
        const ff = (f + i * 12) % 48;
        return <div key={i} style={{position: 'absolute', left: 470 + (i % 2 ? 60 : -40) + Math.sin(ff / 6) * 14, top: 800 - ff * 5, width: 70 + ff, height: 70 + ff, borderRadius: '50%', background: '#fff', opacity: interpolate(ff, [0, 8, 48], [0, 0.55, 0]) * anger}} />;
      })}
      <AvatarAt p={p} x={250} y={880} w={580} mood="angry" pose="down" anger={anger} />
      {[{t: '!!', x: 150, y: 1000, d: 4}, {t: '#@%!', x: 820, y: 900, d: 14}].map((b, i) => (
        <Pop key={i} at={b.d} style={{left: b.x, top: b.y + Math.sin(f / 4 + i) * 8}}>
          <Pill text={b.t} bg="#fff" color={C.labelPink} size={46} />
        </Pop>
      ))}
      <Pop at={at(p, 'benda kecil', 0.3) + 8} style={{left: 70, top: 850}}>
        <Pill text="Siapa ambil remote?!" bg={C.labelPink} size={38} />
      </Pop>
    </Camera>
  );
};

/* 4 — Sunyi dalam ramai: telefon penuh mesej, tapi rasa seorang */
export const Sunyi: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const butAt = at(p, 'tapi semua', 2.6);
  const dimP = interpolate(f, [butAt, butAt + 20], [0, 1], clamp);
  const msgs = ['Jom lepak!', 'Ada gambar baru 😂', 'Group: 128 mesej', 'Tengok video ni', 'Hantar lokasi?'];
  return (
    <Camera dur={p.dur} to={1.12} panX={-10}>
      <NightSky seed={21} glow={C.violet[1]} dim={1 - dimP * 0.6} />
      {/* orang ramai yang pudar */}
      <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: 0.55 - dimP * 0.35}}>
        {new Array(8).fill(0).map((_, i) => {
          const x = 70 + i * 135 + (i % 2) * 20;
          const y = 1120 + (i % 3) * 30;
          return (
            <g key={i} fill={C.night[4]}>
              <circle cx={x} cy={y} r={44} />
              <rect x={x - 56} y={y + 50} width={112} height={220} rx={50} />
            </g>
          );
        })}
      </svg>
      {/* lampu sorot */}
      <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920, background: `radial-gradient(ellipse 380px 640px at 300px 1150px, rgba(246,201,69,${0.08 + dimP * 0.14}) 0%, rgba(18,11,51,${dimP * 0.55}) 100%)`}} />
      {/* telefon */}
      <div style={{position: 'absolute', left: 560, top: 500, width: 400, height: 700, borderRadius: 54, background: C.navy, padding: 22, boxShadow: '0 30px 80px rgba(18,11,51,.6)', transform: `rotate(6deg)`}}>
        <div style={{width: '100%', height: '100%', borderRadius: 36, background: C.night[3], overflow: 'hidden', position: 'relative'}}>
          {msgs.map((m, i) => {
            const a = 4 + i * 9;
            if (f < a) return null;
            return (
              <div key={i} style={{position: 'absolute', left: i % 2 ? 70 : 20, top: 30 + i * 118, transform: `scale(${popScale(f - a)})`, transformOrigin: 'left', background: i % 2 ? C.violet[1] : '#fff', color: i % 2 ? '#fff' : C.navy, fontFamily: FONT, fontWeight: 800, fontSize: 28, padding: '16px 22px', borderRadius: 26, whiteSpace: 'nowrap'}}>
                {m}
              </div>
            );
          })}
        </div>
        <Pop at={10} style={{right: -30, top: -30}}>
          <div style={{width: 110, height: 110, borderRadius: 55, background: C.labelPink, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 800, fontSize: 40, color: '#fff'}}>99+</div>
        </Pop>
      </div>
      <AvatarAt p={p} x={20} y={930} w={520} mood={dimP > 0.5 ? 'sad' : 'neutral'} pose="clasp" />
      <Pop at={butAt + 6} style={{left: 90, top: 820}}>
        <Pill text="Tapi rasa... seorang" bg={C.navy} color={C.yellow} size={40} />
      </Pop>
    </Camera>
  );
};

/* 5 — Badan terkesan: titik merah berdenyut — tidur, jantung, daya tahan */
const PulseDot: React.FC<{x: number; y: number; at: number; color?: string}> = ({x, y, at: a, color = C.labelPink}) => {
  const f = useCurrentFrame() - a;
  if (f < 0) return null;
  const ring = (f % 30) / 30;
  return (
    <div style={{position: 'absolute', left: x - 60, top: y - 60, width: 120, height: 120}}>
      <div style={{position: 'absolute', inset: 60 - 60 * ring, borderRadius: '50%', border: `6px solid ${color}`, opacity: 1 - ring}} />
      <div style={{position: 'absolute', inset: 40, borderRadius: '50%', background: color, transform: `scale(${popScale(f)})`, boxShadow: `0 0 30px ${color}`}} />
    </div>
  );
};

export const Badan: React.FC<SceneProps> = (p) => {
  const aT = at(p, 'tidur', 2.4);
  const aJ = at(p, 'jantung', 3.0);
  const aD = at(p, 'daya tahan', 3.6);
  // kedudukan avatar: x=270, y=820, w=540 (skala 0.9 daripada viewBox 600)
  const ax = 270, ay = 840, s = 0.9;
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={31} glow={C.pink[1]} />
      <AvatarAt p={p} x={ax} y={ay} w={540} mood="sad" pose="down" />
      <PulseDot x={ax + 300 * s} y={ay + 120 * s} at={aT} color={C.violet[4]} />
      <PulseDot x={ax + 330 * s} y={ay + 560 * s} at={aJ} />
      <PulseDot x={ax + 478 * s} y={ay + 660 * s} at={aD} color={C.yellow} />
      <Pop at={aT + 4} style={{left: 110, top: 660}}>
        <Pill text="☾  Tidur terganggu" bg={C.navy} size={40} />
      </Pop>
      <Pop at={aJ + 4} style={{left: 90, top: 1180}}>
        <Pill text="♥  Jantung" bg={C.labelPink} size={40} />
      </Pop>
      <Pop at={aD + 4} style={{left: 640, top: 1220}}>
        <Pill text="Daya tahan ↓" bg={C.yellow} color={C.navy} size={40} />
      </Pop>
      <Pop at={6} style={{left: 0, width: 1080, top: 500, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Stres berpanjangan" bg={C.violet[2]} size={38} />
      </Pop>
    </Camera>
  );
};

/* 6 — Dunia jadi kelabu */
export const Kelabu: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const g = interpolate(f, [0, Math.min(p.dur, 40)], [0, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.14}>
      <AbsoluteFill style={{filter: `grayscale(${g})`}}>
        <NightSky seed={41} dim={1 - g * 0.7} />
        <div style={{position: 'absolute', left: 540 - 300, top: 560}}>
          <Globe r={300} grey={g} speed={0.3} />
        </div>
        <AvatarAt p={p} x={540 - 230} y={1150} w={460} mood="sad" pose="clasp" />
      </AbsoluteFill>
    </Camera>
  );
};

/* 7 — Penutup: warna kembali, BOLEH dijaga & dirawat, kalendar 1→14, Dr. Azren */
const Cells: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      {new Array(14).fill(0).map((_, i) => {
        const x = random(`cx${i}`) * 1080 + Math.sin(f / 50 + i) * 30;
        const y = random(`cy${i}`) * 1920 + Math.cos(f / 60 + i) * 30;
        const r = 50 + random(`cr${i}`) * 110;
        const col = i % 2 ? C.pink[0] : C.violet[3];
        return (
          <g key={i} opacity={0.22}>
            <circle cx={x} cy={y} r={r} fill={col} />
            <circle cx={x + r * 0.2} cy={y - r * 0.1} r={r * 0.32} fill={i % 2 ? C.pink[2] : C.violet[0]} />
          </g>
        );
      })}
    </svg>
  );
};

export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const col = interpolate(f, [0, 24], [1, 0], clamp);
  const aJaga = at(p, 'dijaga', 2.2);
  const aRawat = at(p, 'dirawat', 3.2);
  const aCal = at(p, 'kalau rasa', 4.4);
  const aIngat = at(p, 'ingat', 7.4);
  const aSaya = at(p, 'saya doktor', 10.2);
  const day = Math.round(interpolate(f, [aCal, aCal + 36], [1, 14], clamp));
  // bumi: besar di tengah -> kecil ke penjuru kiri atas
  const move = interpolate(f, [aCal - 10, aCal + 6], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const gr = 230 - 120 * move;
  const gx = 540 - 230 + (150 - (540 - 230)) * move;
  const gy = 470 + (520 - 470) * move;
  const calOut = interpolate(f, [aIngat - 6, aIngat], [1, 0], clamp);
  return (
    <Camera dur={p.dur} to={1.06} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 60%, ${C.pink[2]} 100%)`}} />
      <Cells />
      <Glow x={540} y={900} r={600} color={C.pink[0]} opacity={0.35} />
      <div style={{position: 'absolute', left: gx, top: gy, filter: `grayscale(${col})`}}>
        <Globe r={gr} smile={interpolate(f, [10, 26], [0, 1], clamp)} />
      </div>
      {/* label hijau */}
      <Pop at={aJaga} style={{left: 90, top: 980}}>
        <Pill text="✓ BOLEH dijaga" bg={C.green} size={44} />
      </Pop>
      <Pop at={aRawat} style={{left: 90, top: 1100}}>
        <Pill text="✓ BOLEH dirawat" bg={C.green} size={44} />
      </Pop>
      {/* kalendar */}
      {f >= aCal ? (
        <div style={{position: 'absolute', left: 470, width: 560, top: 470, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: calOut, transform: `scale(${popScale(f - aCal)})`}}>
          <div style={{width: 360, borderRadius: 34, overflow: 'hidden', background: '#fff', boxShadow: '0 20px 50px rgba(18,11,51,.55)'}}>
            <div style={{background: C.labelPink, textAlign: 'center', padding: '14px 0'}}>
              <Txt size={44}>HARI</Txt>
            </div>
            <Txt size={170} color={C.navy} style={{textAlign: 'center', lineHeight: 1.15}}>
              {day}
            </Txt>
          </div>
          <Pill text="Lebih 2 minggu? Jangan tunggu." bg={C.navy} color={C.yellow} size={32} style={{marginTop: 22}} />
        </div>
      ) : null}
      {/* petikan */}
      <Pop at={aIngat} style={{left: 470, top: 500, width: 560}}>
        <div style={{background: C.navy, borderRadius: 34, padding: '30px 34px', boxShadow: '0 20px 50px rgba(18,11,51,.55)'}}>
          <Txt size={44} style={{lineHeight: 1.2}}>
            Tiada kesihatan tanpa <span style={{color: C.yellow}}>kesihatan mental</span>
          </Txt>
        </div>
      </Pop>
      <AvatarAt p={p} x={470} y={860} w={560} mood="happy" pose={f >= aSaya ? 'wave' : 'point'} seed={3} />
      <Pop at={aSaya} style={{left: 0, width: 1080, top: 1440 - 40, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Dr. Azren" bg={C.labelPink} size={58} />
      </Pop>
    </Camera>
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro,
  bandar: Bandar,
  pejabat: Pejabat,
  rumah: Rumah,
  sunyi: Sunyi,
  badan: Badan,
  kelabu: Kelabu,
  penutup: Penutup,
};
