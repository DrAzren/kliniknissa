import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C} from '../../theme';
import {AvatarPreset} from '../../components/Avatar';
import {Camera, clamp, Glow, NightSky, Pill, Pop} from '../../components/common';
import {Icon} from '../kenali-eczema/scenes';
import {at, TopShade, Bed, Bubble, ChipList, ClinicBg, Closing, Confetti, Cross, KIcon, LimaScene, RED, SceneProps, Stamp, Tick, Txt, Who, Zzz} from '../kit';

export type {SceneProps};

/* ---------- watak cerita (rekaan) ---------- */
export const ZUL: AvatarPreset = {
  id: 'zul', skin: '#C08A62', skinShade: '#A4714B', hair: 'short', hairColor: '#1E1A24', top: 'tee', topColor: '#4F79C7', topShade: '#3B5FA3',
  accessory: null, stubble: true, moustache: true,
};
export const ISTERI: AvatarPreset = {
  id: 'isteri-zul', skin: '#D49C74', skinShade: '#B9805A', hair: 'hijab', hairColor: '#2A1C24', top: 'kurung', topColor: '#E4629F', topShade: '#C24A82',
  hijabColor: '#2BB3A3', hijabShade: '#1F8A7E', accessory: null,
};

/* gelombang bunyi dengkur; flat = 0..1 (1 = garis lurus) */
const SnoreWave: React.FC<{flat: number; w?: number; color?: string}> = ({flat, w = 900, color = C.yellow}) => {
  const f = useCurrentFrame();
  const pts: string[] = [];
  for (let x = 0; x <= w; x += 6) {
    const env = Math.abs(Math.sin((x / w) * Math.PI * 3 + f / 9));
    const y = 90 + Math.sin(x / 9 + f / 2) * 70 * env * (1 - flat);
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return (
    <svg width={w} height={180} viewBox={`0 0 ${w} 180`} style={{overflow: 'visible'}}>
      <polyline points={pts.join(' ')} stroke={flat > 0.9 ? RED : color} strokeWidth={8} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
};

/* saluran nafas (keratan): close 0..1, airOn = zarah udara bergerak */
const Airway: React.FC<{close: number; open?: number; w?: number; airPush?: boolean}> = ({close, w = 520, airPush}) => {
  const f = useCurrentFrame();
  const gap = 90 * (1 - close) + 4;
  const cx = 260;
  const flow = close < 0.85;
  return (
    <svg width={w} height={(w * 760) / 520} viewBox="0 0 520 760" style={{overflow: 'visible'}}>
      <rect x={20} y={20} width={480} height={720} rx={50} fill="#2A1F5C" />
      {/* dinding tisu kiri & kanan */}
      <path d={`M 60 40 L ${cx - 70} 40 Q ${cx - 70} 260 ${cx - gap / 2} 380 Q ${cx - 70} 500 ${cx - 70} 720 L 60 720 Z`} fill="#E58FA5" />
      <path d={`M 460 40 L ${cx + 70} 40 Q ${cx + 70} 260 ${cx + gap / 2} 380 Q ${cx + 70} 500 ${cx + 70} 720 L 460 720 Z`} fill="#E58FA5" />
      <path d={`M ${cx - 70} 40 Q ${cx - 70} 260 ${cx - gap / 2} 380 Q ${cx - 70} 500 ${cx - 70} 720`} stroke="#C96A84" strokeWidth={8} fill="none" />
      <path d={`M ${cx + 70} 40 Q ${cx + 70} 260 ${cx + gap / 2} 380 Q ${cx + 70} 500 ${cx + 70} 720`} stroke="#C96A84" strokeWidth={8} fill="none" />
      {/* zarah udara */}
      {new Array(10).fill(0).map((_, i) => {
        const speed = airPush ? 9 : 6;
        const yy = 720 - ((f * (flow ? speed : 0.6) + i * 70) % 700);
        const stuck = !flow && yy < 420;
        const narrowX = Math.max(4, gap / 2 - 10);
        const xx = cx + Math.sin(i * 1.7) * (yy > 300 && yy < 460 ? narrowX : 34);
        return <circle key={i} cx={xx} cy={stuck ? 440 + (i % 3) * 14 : yy} r={10} fill="#BFE3FA" opacity={stuck ? 0.5 : 0.9} />;
      })}
      {close > 0.9 ? <text x={cx} y={300} textAnchor="middle" fontFamily="Montserrat" fontWeight={800} fontSize={60} fill={C.yellow}>✕</text> : null}
    </svg>
  );
};

/* ================= 0 — Hook: dengkur kuat… senyap 10 saat ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSen = at(p, 'senyap', 2.3);
  const aSep = at(p, 'sepuluh', 3.3);
  const aTiada = at(p, 'tiada', 4.4);
  const aBukan = at(p, 'bukan', 6.4);
  const flat = interpolate(f, [aSen - 4, aSen + 6], [0, 1], clamp);
  const secs = Math.min(10, Math.max(0, Math.floor((f - aSep) / 4) + 1));
  return (
    <Camera dur={p.dur} to={1.1} panY={-20}>
      <NightSky seed={3} glow={flat > 0.5 ? C.labelPink : C.violet[2]} />
      <Glow x={540} y={1000} r={520} color={flat > 0.5 ? RED : C.violet[3]} opacity={0.25} />
      <div style={{position: 'absolute', left: 90, top: 600}}>
        <SnoreWave flat={flat} />
      </div>
      <Pop at={2} style={{left: 0, width: 1080, top: 520, display: 'flex', justifyContent: 'center'}}>
        <Pill text={flat > 0.5 ? 'Senyap…' : 'GRRR… ZZZ…'} bg={flat > 0.5 ? C.labelPink : C.navy} color={C.yellow} size={50} />
      </Pop>
      {f >= aSep ? (
        <div style={{position: 'absolute', left: 0, width: 1080, top: 790, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24}}>
          <KIcon name="clock" size={150} f={f} />
          <Txt size={170} color={C.yellow} style={{textShadow: '0 10px 0 rgba(18,11,51,.6)'}}>{`${secs}s`}</Txt>
        </div>
      ) : null}
      <Pop at={aTiada} style={{left: 0, width: 1080, top: 1010, display: 'flex', justifyContent: 'center'}}>
        <Pill text="TIADA NAFAS" bg={RED} size={70} />
      </Pop>
      <Bed x={60} y={1320} w={960} />
      <Who preset={ZUL} x={520} y={1060} w={420} mood="tired" pose="down" seed={1} style={{transform: `rotate(-8deg) translateY(${flat > 0.5 ? 0 : Math.sin(f / 4) * 4}px)`}} />
      <Zzz x={880} y={1060} on={flat < 0.5} />
      <Pop at={aBukan} style={{left: 40, top: 1210}}>
        <div style={{position: 'relative', background: '#fff', padding: '14px 40px', borderRadius: 44, boxShadow: '0 14px 34px rgba(18,11,51,.45)'}}>
          <Txt size={50} color={C.navy}>Tidur nyenyak?</Txt>
          <div style={{position: 'absolute', left: 170, top: -10}}>{f >= aBukan + 6 ? <Cross f={f - aBukan - 6} size={100} /> : null}</div>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Encik Zul; isteri rakam video ================= */
export const ZulScene: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aRakam = at(p, 'rakam', 6.9);
  const aBerd = at(p, 'berdengkur', 8.3);
  const aHenti = at(p, 'berhenti', 9.3);
  const aSentak = at(p, 'tersentak', 11.0);
  const jolt = f >= aSentak && f < aSentak + 12 ? Math.sin(f * 2.5) * 14 : 0;
  const flat = f >= aHenti && f < aSentak ? 1 : 0;
  return (
    <Camera dur={p.dur} to={1.07} panX={-20}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, #0F0C2E 0%, ${C.night[3]} 100%)`}} />
      <div style={{position: 'absolute', left: 820, top: 520}}><Icon name="moon" size={160} /></div>
      <Pop at={3} style={{left: 60, top: 520}}>
        <Pill text="Encik Zul, 42 • pegawai jualan" bg={C.navy} color={C.yellow} size={42} />
      </Pop>
      <Bed x={60} y={1320} w={960} />
      <Who preset={ZUL} x={300} y={1040 + jolt} w={440} mood={f >= aSentak ? 'shock' : 'tired'} pose="down" seed={1} style={{transform: `rotate(${f >= aSentak && f < aSentak + 20 ? 0 : -8}deg)`}} />
      <Zzz x={680} y={1040} on={f < aHenti || f >= aSentak + 20} />
      {/* isteri merakam */}
      {f >= aRakam - 6 ? <Who preset={ISTERI} x={700} y={1000} w={330} mood={f >= aHenti ? 'shock' : 'curious'} pose="point" seed={4} /> : null}
      <Pop at={aRakam} style={{left: 600, top: 760}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, background: '#2A2733', borderRadius: 30, padding: '16px 24px'}}>
          <div style={{width: 30, height: 30, borderRadius: 15, background: RED, opacity: Math.sin(f / 4) > 0 ? 1 : 0.3}} />
          <Txt size={44}>REC</Txt>
          <div style={{width: 200, overflow: 'hidden'}}>
            <div style={{transform: 'scale(0.22)', transformOrigin: 'left top', height: 44}}>
              <SnoreWave flat={flat} w={900} />
            </div>
          </div>
        </div>
      </Pop>
      <Pop at={aBerd} style={{left: 70, top: 640}}>
        <Bubble size={46}>GRRR… ZZZ…</Bubble>
      </Pop>
      <Pop at={aHenti} style={{left: 70, top: 840}}>
        <Pill text="Berhenti bernafas" bg={RED} size={46} />
      </Pop>
      <Pop at={aSentak} style={{left: 70, top: 960}}>
        <Pill text="Tersentak!" bg={C.yellow} color={C.navy} size={50} />
      </Pop>
    </Camera>
  );
};

/* ================= 2 — Siang mengantuk, hampir terlelap memandu ================= */
export const Siang: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aNgantuk = at(p, 'mengantuk', 1.6);
  const aLelap = at(p, 'terlelap', 3.9);
  const lid = f >= aLelap ? interpolate((f - aLelap) % 40, [0, 14, 24, 40], [0, 1, 1, 0], clamp) : 0;
  return (
    <Camera dur={p.dur} to={1.08} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, #8DC9F0 0%, #F6D9A8 100%)`}} />
      <TopShade />
      <div style={{position: 'absolute', left: 0, top: 1240, width: 1080, height: 680, background: '#4A4760'}} />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{position: 'absolute', left: ((i * 300 - f * 14) % 1200 + 1200) % 1200 - 100, top: 1500, width: 160, height: 20, background: '#fff', borderRadius: 10}} />
      ))}
      <Pop at={2} style={{left: 60, top: 520}}>
        <Pill text="Siang hari" bg={C.navy} color={C.yellow} size={48} />
      </Pop>
      <div style={{position: 'absolute', left: 560, top: 560}}><KIcon name="sun" size={200} f={f} /></div>
      {/* kereta */}
      <div style={{position: 'absolute', left: 120, top: 1080, transform: `rotate(${lid > 0.5 ? Math.sin(f / 3) * 2 : 0}deg)`}}>
        <KIcon name="car" size={840} f={f} />
      </div>
      <Who preset={ZUL} x={330} y={760} w={380} mood={f >= aNgantuk ? 'tired' : 'neutral'} pose="clasp" seed={1} />
      {/* kelopak mata tertutup */}
      <Pop at={aNgantuk} style={{left: 60, top: 620}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: C.navy, padding: '12px 28px 12px 14px', borderRadius: 40}}>
          <KIcon name="yawn" size={80} f={f} />
          <Txt size={44}>Mengantuk</Txt>
        </div>
      </Pop>
      {f >= aLelap ? (
        <>
          <AbsoluteFill style={{background: '#000', opacity: lid * 0.55}} />
          <Pop at={aLelap} style={{left: 0, width: 1080, top: 725, display: 'flex', justifyContent: 'center'}}>
            <Pill text="⚠ Hampir terlelap semasa memandu!" bg={RED} size={44} />
          </Pop>
        </>
      ) : null}
    </Camera>
  );
};

/* ================= 3 — Klinik: saringan, ujian tidur → apnea tidur obstruktif ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSar = at(p, 'saringan', 1.3);
  const aUji = at(p, 'ujian tidur', 3.0);
  const aAp = at(p, 'ap-nea', 5.9);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <ClinicBg />
      <Glow x={540} y={1000} r={480} color={C.labelPink} opacity={0.25} />
      <Pop at={aSar} style={{left: 600, top: 650}}>
        <Pill text="Saringan" bg={C.navy} color={C.yellow} size={46} />
      </Pop>
      <Pop at={aUji} style={{left: 600, top: 770}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, background: C.violet[1], padding: '10px 26px 10px 12px', borderRadius: 40}}>
          <Icon name="moon" size={70} />
          <Txt size={44}>Ujian tidur</Txt>
        </div>
      </Pop>
      <Who preset={p.preset} x={20} y={880} w={540} mood={f >= aAp ? 'neutral' : 'curious'} pose={f >= aSar ? 'point' : 'chin'} />
      <Who preset={ZUL} x={640} y={1060} w={360} mood={f >= aAp ? 'shock' : 'tired'} pose="down" seed={1} />
      <Stamp a={aAp} kicker="DIAGNOSIS" lines={['APNEA TIDUR', 'OBSTRUKTIF']} top={620} size={92} />
    </Camera>
  );
};

/* ================= 4 — 5 perkara ================= */
export const Lima: React.FC<SceneProps> = (p) => <LimaScene p={p} word="lima" title="perkara" glow={C.violet[2]} />;

/* ================= 5 — #1 Saluran nafas tertutup ================= */
export const S1: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aKendur = at(p, 'kendur', 2.4);
  const aSempit = at(p, 'menyempit', 4.4);
  const aTutup = at(p, 'tertutup', 5.6);
  const aOks = at(p, 'oksigen', 6.4);
  const aOtak = at(p, 'otak', 7.8);
  const aKali = at(p, 'berkali-kali', 9.1);
  const close = interpolate(f, [aSempit - 4, aSempit + 10, aTutup, aTutup + 8], [0, 0.55, 0.55, 1], clamp);
  const o2 = interpolate(f, [aOks, aOks + 30], [97, 82], clamp);
  const wake = f >= aKali ? Math.floor((f - aKali) / 8) : 0;
  return (
    <Camera dur={p.dur} to={1.06} panY={-10}>
      <NightSky seed={21} glow={C.violet[2]} />
      <div style={{position: 'absolute', left: 50, top: 520}}>
        <Airway close={close} w={460} />
      </div>
      <Pop at={aKendur} style={{left: 540, top: 540}} origin="left center">
        <Pill text="Otot tekak kendur" bg={C.navy} color={C.yellow} size={40} />
      </Pop>
      <Pop at={aSempit} style={{left: 540, top: 660}} origin="left center">
        <Pill text="Menyempit…" bg={C.violet[1]} size={42} />
      </Pop>
      <Pop at={aTutup} style={{left: 540, top: 780}} origin="left center">
        <Pill text="TERTUTUP" bg={RED} size={52} />
      </Pop>
      <Pop at={aOks} style={{left: 560, top: 920}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: '#10203A', padding: '14px 28px 14px 14px', borderRadius: 34}}>
          <KIcon name="o2" size={90} />
          <Txt size={70} color={o2 < 90 ? '#FF7A8A' : '#4BE38A'}>{`${Math.round(o2)}%`}</Txt>
          <Txt size={60} color="#FF7A8A">↓</Txt>
        </div>
      </Pop>
      <Pop at={aOtak} style={{left: 560, top: 1090}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: C.navy, padding: '12px 28px 12px 14px', borderRadius: 34}}>
          <KIcon name="brain" size={90} f={f} />
          <KIcon name="alarm" size={80} f={f} />
          <Txt size={44}>{f >= aKali ? `Terjaga ×${Math.min(30, 3 + wake * 3)}` : 'Kejut!'}</Txt>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 6 — #2 Tanda ================= */
export const S2: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Camera dur={p.dur} to={1.05} panY={-10}>
      <NightSky seed={31} glow={C.labelPink} />
      <ChipList
        top={520}
        gap={150}
        size={42}
        items={[
          {icon: <KIcon name="snore" size={78} f={f} />, text: 'Dengkur kuat', a: at(p, 'dengkur', 1.6)},
          {icon: <KIcon name="choke" size={78} f={f} />, text: 'Tercungap / tersedak waktu malam', a: at(p, 'tercungap', 2.6)},
          {icon: <KIcon name="headache" size={78} f={f} />, text: 'Bangun dengan sakit kepala', a: at(p, 'bangun', 4.8)},
          {icon: <KIcon name="yawn" size={78} f={f} />, text: 'Mengantuk sepanjang hari', a: at(p, 'mengantuk', 6.4)},
        ]}
        w={900}
      />
      <Who preset={ZUL} x={620} y={1180} w={360} mood="tired" pose="down" seed={1} />
    </Camera>
  );
};

/* ================= 7 — #3 Faktor risiko ================= */
export const S3: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Camera dur={p.dur} to={1.05} panY={-10}>
      <NightSky seed={37} glow={C.violet[3]} />
      <ChipList
        top={540}
        gap={150}
        size={42}
        w={760}
        items={[
          {icon: <KIcon name="scale" size={78} f={f} />, text: 'Berat badan berlebihan', a: at(p, 'berat', 2.4)},
          {icon: <KIcon name="neck" size={78} f={f} />, text: 'Leher besar', a: at(p, 'leher', 3.7)},
          {icon: <KIcon name="male" size={78} f={f} />, text: 'Lelaki', a: at(p, 'lelaki', 4.7)},
          {icon: <KIcon name="age" size={78} f={f} />, text: 'Umur lebih 50 tahun', a: at(p, 'berumur', 5.6)},
          {icon: <KIcon name="bp" size={78} f={f} />, text: 'Darah tinggi', a: at(p, 'darah', 7.8)},
        ]}
      />
      <Who preset={p.preset} x={720} y={1260} w={340} mood="curious" pose="chin" />
    </Camera>
  );
};

/* ================= 8 — #4 Bahaya jika dibiarkan ================= */
export const S4: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const items: {icon: React.ReactNode; text: string; a: number}[] = [
    {icon: <KIcon name="bp" size={150} f={f} />, text: 'Darah tinggi', a: at(p, 'darah', 3.2)},
    {icon: <KIcon name="heart" size={150} f={f} />, text: 'Sakit jantung', a: at(p, 'jantung', 4.1)},
    {icon: <KIcon name="stroke" size={150} f={f} />, text: 'Strok', a: at(p, 'strok', 5.3)},
    {icon: <KIcon name="car" size={150} f={f} />, text: 'Kemalangan jalan raya', a: at(p, 'kemalangan', 6.1)},
  ];
  return (
    <Camera dur={p.dur} to={1.06} panY={-15}>
      <NightSky seed={41} glow={RED} />
      <Glow x={540} y={1000} r={520} color={RED} opacity={0.2} />
      {items.map((it, i) => (
        <Pop key={i} at={it.a} style={{left: 50 + (i % 2) * 500, top: 530 + Math.floor(i / 2) * 350}}>
          <div style={{width: 480, height: 330, borderRadius: 40, background: i === 3 ? RED : C.navy, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, boxShadow: '0 16px 40px rgba(18,11,51,.5)'}}>
            {it.icon}
            <Txt size={i === 3 ? 38 : 46} style={{textAlign: 'center', padding: '0 20px'}}>{it.text}</Txt>
          </div>
        </Pop>
      ))}
      {f >= items[3].a + 8 ? (
        <div style={{position: 'absolute', left: 0, width: 1080, top: 1240, display: 'flex', justifyContent: 'center', opacity: interpolate(f - items[3].a - 8, [0, 6], [0, 1], clamp)}}>
          <Pill text="kerana tertidur ketika memandu" bg={C.yellow} color={C.navy} size={40} />
        </div>
      ) : null}
    </Camera>
  );
};

/* ================= 9 — #5 Rawatan: gaya hidup + CPAP ================= */
export const S5: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aRawat = at(p, 'dirawat', 1.2);
  const aMesin = at(p, 'mesin', 8.4);
  const aTiup = at(p, 'meniup', 9.6);
  const aBuka = at(p, 'terbuka', 12.2);
  const life: {icon: React.ReactNode; text: string; a: number}[] = [
    {icon: <KIcon name="scale" size={70} f={f} />, text: 'Turunkan berat badan', a: at(p, 'turunkan', 2.0)},
    {icon: <KIcon name="nosmoke" size={70} f={f} />, text: 'Elak rokok', a: at(p, 'elak', 3.3)},
    {icon: <KIcon name="side" size={70} f={f} />, text: 'Tidur mengiring', a: at(p, 'mengiring', 4.6)},
  ];
  const showCpap = f >= aMesin;
  const close = interpolate(f, [aMesin, aTiup, aTiup + 14], [1, 1, 0], clamp);
  return (
    <Camera dur={p.dur} to={1.06} panY={-10}>
      <NightSky seed={53} glow={C.green} />
      <Pop at={aRawat} style={{left: 0, width: 1080, top: 520, display: 'flex', justifyContent: 'center'}}>
        <Pill text="Boleh dirawat ✓" bg={C.green} size={52} />
      </Pop>
      {life.map((it, i) => (
        <Pop key={i} at={it.a} style={{left: 50, top: 640 + i * 120, opacity: showCpap ? 0 : 1}} origin="left center">
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <Tick />
            <div style={{display: 'flex', alignItems: 'center', gap: 14, background: i % 2 ? C.violet[1] : C.navy, padding: '8px 26px 8px 10px', borderRadius: 30}}>
              {it.icon}
              <Txt size={40}>{it.text}</Txt>
            </div>
          </div>
        </Pop>
      ))}
      {showCpap ? (
        <>
          <Pop at={aMesin} style={{left: 60, top: 640}}>
            <div style={{width: 470, height: 470, borderRadius: 40, background: C.navy, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 40px rgba(18,11,51,.5)'}}>
              <KIcon name="cpap" size={300} f={f} />
              <Txt size={52} color={C.yellow}>Mesin CPAP</Txt>
            </div>
          </Pop>
          <div style={{position: 'absolute', left: 640, top: 640}}>
            <Airway close={close} w={300} airPush={f >= aTiup} />
          </div>
          {f >= aTiup ? (
            <div style={{position: 'absolute', left: 545, top: 820, opacity: Math.abs(Math.sin(f / 5))}}>
              <Txt size={70} color="#BFE3FA">≫</Txt>
            </div>
          ) : null}
          <Pop at={aBuka} style={{left: 0, width: 1080, top: 1150, display: 'flex', justifyContent: 'center'}}>
            <Pill text="Saluran terbuka ✓" bg={C.green} size={40} />
          </Pop>
        </>
      ) : null}
    </Camera>
  );
};

/* ================= 10 — Zul pulih ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aCpap = at(p, 'si-pap', 1.2);
  const aSegar = at(p, 'segar', 3.8);
  const aMandu = at(p, 'memandu', 4.6);
  const morning = interpolate(f, [aSegar - 10, aSegar + 10], [0, 1], clamp);
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.night[3]} 100%)`}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, #8DC9F0 0%, #F6D9A8 100%)`, opacity: morning}} />
      <div style={{position: 'absolute', left: 760, top: 560, opacity: morning}}><KIcon name="sun" size={200} f={f} /></div>
      <Glow x={540} y={1050} r={560} color={C.yellow} opacity={0.3 * morning} />
      <TopShade />
      <Pop at={aCpap} style={{left: 60, top: 520}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, background: C.navy, padding: '10px 26px 10px 12px', borderRadius: 40}}>
          <KIcon name="cpap" size={80} f={f} />
          <Txt size={42}>CPAP setiap malam</Txt>
        </div>
      </Pop>
      <Bed x={60} y={1340} w={960} />
      <Who preset={ZUL} x={300} y={900} w={460} mood={morning > 0.5 ? 'happy' : 'neutral'} pose={morning > 0.5 ? 'wave' : 'down'} seed={1} />
      <Who preset={ISTERI} x={720} y={1060} w={320} mood="happy" pose="clasp" seed={4} />
      <Confetti a={aSegar} y={900} />
      <Pop at={aSegar} style={{left: 60, top: 640}}>
        <Pill text="Bangun segar ✓" bg={C.green} size={50} />
      </Pop>
      <Pop at={aMandu} style={{left: 60, top: 760}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, background: C.yellow, padding: '8px 26px 8px 12px', borderRadius: 40}}>
          <KIcon name="car" size={70} f={f} />
          <Txt size={40} color={C.navy}>Memandu lebih selamat</Txt>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 11 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return <Closing p={p} firstWord="kalau" question="Berhenti bernafas waktu tidur?" qIcon={<KIcon name="snore" size={70} f={f} />} action="Dapatkan pemeriksaan" actionWord="dapatkan" />;
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro,
  zul: ZulScene,
  siang: Siang,
  diagnosis: Diagnosis,
  lima: Lima,
  s1: S1,
  s2: S2,
  s3: S3,
  s4: S4,
  s5: S5,
  pulih: Pulih,
  penutup: Penutup,
};

