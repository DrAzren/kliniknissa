import React from 'react';
import {
  AbsoluteFill, at, Bubble, Burst, C, Camera, Check, Chip, ClinicSign, clamp, Closing, Cross, Easing, FiveIntro, Glow, Icon, IconPill, interpolate, KIcon, MIcon,
  NightSky, Pill, Pop, PointScene, RED, SceneProps, Stamp, Txt, useCurrentFrame, Who, LEAF, AvatarPreset,
} from '../_kit/kit';

/* ---------- watak cerita (rekaan) ---------- */
export const RAHMAN: AvatarPreset = {
  id: 'rahman', skin: '#B9825A', skinShade: '#9C6844', hair: 'short', hairColor: '#1E1A24', top: 'tee', topColor: '#3E7CC9', topShade: '#2E5F9E',
  accessory: null, stubble: true, moustache: true,
};
export const JURURAWAT: AvatarPreset = {
  id: 'jururawat', skin: '#D9A47C', skinShade: '#BE8860', hair: 'hijab', hairColor: '#2A1C24', top: 'scrubs', topColor: '#7FC4F2', topShade: '#5AA3D6',
  hijabColor: '#FFFFFF', hijabShade: '#DCD8EE', accessory: null,
};

/** Monitor BP besar dengan nombor yang meningkat. */
const BigBP: React.FC<{sys: number; dia: number; color?: string; w?: number}> = ({sys, dia, color = '#FF6B7D', w = 420}) => (
  <div style={{width: w, background: '#fff', borderRadius: 40, padding: 22, boxShadow: '0 20px 50px rgba(18,11,51,.5)'}}>
    <div style={{background: '#1D2B33', borderRadius: 24, padding: '18px 26px', textAlign: 'right'}}>
      <Txt size={w * 0.27} color={color} style={{lineHeight: 1}}>{Math.round(sys)}</Txt>
      <div style={{height: 4, background: '#3B4A52', margin: '8px 0'}} />
      <Txt size={w * 0.2} color={color} style={{lineHeight: 1}}>{Math.round(dia)}</Txt>
    </div>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14}}>
      <Txt size={30} color={C.navy}>mmHg</Txt>
      <div style={{width: 44, height: 44, borderRadius: 22, background: C.labelPink}} />
    </div>
  </div>
);

/* ================= 0 — Hook: 3/10 dewasa, 4/10 tak tahu, senyap tapi membunuh ================= */
export const Intro: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aDan = at(p, 'dan empat', 4.2);
  const aTak = at(p, 'tak tahu', 6.6);
  const aSak = at(p, 'tak sakit', 8.3);
  const aGat = at(p, 'tak gatal', 9.2);
  const aBun = at(p, 'membunuh', 11.0);
  const phase2 = f >= aDan;
  const fade = interpolate(f, [aSak - 6, aSak + 4], [1, 0], clamp);
  return (
    <Camera dur={p.dur} to={1.08} panY={-20}>
      <NightSky seed={5} glow={f >= aBun ? RED : C.violet[2]} />
      <Glow x={540} y={1000} r={560} color={f >= aBun ? RED : C.violet[3]} opacity={0.3} />
      {fade > 0 ? (
        <div style={{opacity: fade}}>
          <div style={{position: 'absolute', top: 470, width: 1080, textAlign: 'center'}}>
            <Txt size={150} color={C.yellow} style={{textShadow: '0 8px 0 rgba(18,11,51,.6)'}}>{phase2 ? '4 / 10' : '3 / 10'}</Txt>
            <Txt size={52}>{phase2 ? 'pesakit tak tahu' : 'dewasa di Malaysia'}</Txt>
          </div>
          <div style={{position: 'absolute', left: 90, top: 820, width: 900, display: 'flex', flexWrap: 'wrap', gap: 30, justifyContent: 'center'}}>
            {new Array(10).fill(0).map((_, i) => {
              const lit = phase2 ? true : f >= 4 + i * 5 && i < 3;
              const q = phase2 && i < 4 && f >= aTak + i * 3;
              const pop = phase2 ? interpolate(f - aDan - i * 2, [0, 8], [0.7, 1], clamp) : interpolate(f - i * 2, [0, 8], [0, 1], clamp);
              return (
                <div key={i} style={{width: 150, height: 190, position: 'relative', transform: `scale(${pop})`, opacity: lit ? 1 : 0.35}}>
                  <svg width={150} height={190} viewBox="0 0 120 150">
                    <circle cx={60} cy={38} r={28} fill={lit ? RED : '#fff'} />
                    <path d="M 12 150 Q 12 76 60 76 Q 108 76 108 150 Z" fill={lit ? RED : '#fff'} />
                  </svg>
                  {q ? <div style={{position: 'absolute', left: 80, top: -20}}><KIcon name="question" size={80} /></div> : null}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      {[{t: 'Tak sakit', a: aSak, x: 80}, {t: 'Tak gatal', a: aGat, x: 560}].map((c) => (
        <Pop key={c.t} at={c.a} style={{left: c.x, top: 560}}>
          <div style={{width: 440, height: 300, borderRadius: 40, background: C.navy, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, position: 'relative', boxShadow: '0 20px 50px rgba(18,11,51,.5)'}}>
            {c.t === 'Tak sakit' ? <MIcon name="head" size={150} f={f} /> : <Icon name="scratch" size={150} f={f} />}
            <Txt size={52}>{c.t}</Txt>
            <div style={{position: 'absolute', left: 280, top: 20}}>{f >= c.a + 8 ? <Cross f={f - c.a - 8} size={130} /> : null}</div>
          </div>
        </Pop>
      ))}
      <Pop at={aBun - 4} style={{left: 0, width: 1080, top: 950, display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <KIcon name="heart" size={300} f={f * 2} />
          <Txt size={92} color={C.labelPink} style={{textShadow: '0 10px 0 rgba(18,11,51,.6)', marginTop: 10, whiteSpace: 'nowrap'}}>BOLEH MEMBUNUH</Txt>
        </div>
      </Pop>
    </Camera>
  );
};

/* ================= 1 — Encik Rahman, pemandu lori ================= */
export const Rahman: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aUmur = at(p, 'empat puluh', 0.8);
  const aLori = at(p, 'pemandu', 2.0);
  const aSih = at(p, 'rasa sihat', 3.0);
  const aKep = at(p, 'sakit kepala', 5.0);
  const aBia = at(p, 'biasalah', 6.2);
  const road = (f * 14) % 240;
  return (
    <Camera dur={p.dur} to={1.08} panX={-20}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.violet[0]} 0%, ${C.pink[0]} 60%, #F6A86B 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1340, width: 1080, height: 600, background: '#3B3754'}} />
      {new Array(7).fill(0).map((_, i) => <div key={i} style={{position: 'absolute', left: i * 240 - road, top: 1460, width: 130, height: 18, borderRadius: 9, background: C.yellow}} />)}
      <div style={{position: 'absolute', left: 520, top: 1000}}><KIcon name="truck" size={520} /></div>
      <Who preset={RAHMAN} x={60} y={820} w={520} mood={f >= aKep && f < aBia ? 'tired' : 'happy'} pose={f >= aBia ? 'wave' : 'down'} seed={1} />
      <Pop at={aUmur} style={{left: 60, top: 480}}>
        <Pill text="Encik Rahman, 45" bg={C.navy} color={C.yellow} size={50} />
      </Pop>
      <Pop at={aLori} style={{left: 560, top: 600}}>
        <Pill text="Pemandu lori" bg={C.labelPink} size={44} />
      </Pop>
      <Pop at={aSih} style={{left: 560, top: 720}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}><Check /><Txt size={44}>Rasa sihat</Txt></div>
      </Pop>
      <Pop at={aKep} style={{left: 560, top: 820}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}><MIcon name="head" size={70} f={f} /><Txt size={40}>Kadang-kadang sakit kepala</Txt></div>
      </Pop>
      <Pop at={aBia - 2} style={{left: 330, top: 940}}>
        <Bubble tail="left" size={46}>"Biasalah, kurang tidur."</Bubble>
      </Pop>
    </Camera>
  );
};

/* ================= 2 — Ke klinik: BP 168/100, datang semula, tetap tinggi ================= */
export const Klinik: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSel = at(p, 'selesema', 1.4);
  const aUkur = at(p, 'ukur', 3.0);
  const aSer = at(p, 'seratus', 4.6);
  const aPer = at(p, 'per', 6.1);
  const aSem = at(p, 'datang semula', 8.0);
  const aKed = at(p, 'bacaan kedua', 9.0);
  const aTet = at(p, 'tetap tinggi', 10.0);
  const sys = interpolate(f, [aUkur, aSer + 18], [0, 168], {...clamp, easing: Easing.out(Easing.cubic)});
  const dia = interpolate(f, [aUkur, aPer + 8], [0, 100], {...clamp, easing: Easing.out(Easing.cubic)});
  const second = f >= aKed;
  return (
    <Camera dur={p.dur} to={1.07} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1400, width: 1080, height: 520, background: C.night[3]}} />
      <Glow x={540} y={820} r={420} color={f >= aSer ? RED : C.violet[3]} opacity={0.35} />
      <ClinicSign x={330} y={460} />
      <Pop at={aSel} style={{left: 60, top: 600}}>
        <Pill text="Datang sebab selesema" bg={C.navy} size={40} />
      </Pop>
      <Pop at={aUkur - 4} style={{left: 320, top: 700}}>
        <BigBP sys={second ? 166 : sys} dia={second ? 102 : dia} />
      </Pop>
      <Pop at={aPer + 6} style={{left: 760, top: 760}}>
        <div style={{background: RED, borderRadius: 30, padding: '10px 24px'}}><Txt size={40}>TINGGI!</Txt></div>
      </Pop>
      <Who preset={JURURAWAT} x={-20} y={1080} w={400} mood={f >= aSer ? 'shock' : 'neutral'} pose={f >= aUkur && f < aSem ? 'point' : 'down'} seed={2} />
      <Who preset={RAHMAN} x={660} y={1080} w={400} mood={f >= aSer ? 'shock' : 'neutral'} pose="down" seed={1} />
      <Pop at={aSem} style={{left: 40, top: 960}}>
        <IconPill icon={<KIcon name="calendar" size={60} f={f - aSem} />} text="Datang semula" size={38} />
      </Pop>
      <Pop at={aKed} style={{left: 760, top: 640}}>
        <Pill text="Bacaan ke-2" bg={C.yellow} color={C.navy} size={38} />
      </Pop>
      <Pop at={aTet} style={{left: 330, top: 1340}}>
        <Pill text="Tetap tinggi" bg={RED} size={50} />
      </Pop>
    </Camera>
  );
};

/* ================= 3 — Diagnosis: DARAH TINGGI (hipertensi) ================= */
export const Diagnosis: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aDar = at(p, 'darah tinggi', 1.0);
  return (
    <Camera dur={p.dur} to={1.1} panY={-10}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night[3]} 0%, ${C.violet[2]} 100%)`}} />
      <div style={{position: 'absolute', left: 0, top: 1380, width: 1080, height: 540, background: C.night[1]}} />
      <Glow x={540} y={900} r={480} color={C.labelPink} opacity={0.3} />
      <Who preset={p.preset} x={20} y={880} w={540} mood={f >= aDar ? 'neutral' : 'curious'} pose={f >= aDar ? 'point' : 'chin'} />
      <Who preset={RAHMAN} x={630} y={1050} w={400} mood={f >= aDar ? 'shock' : 'tired'} pose="down" seed={1} />
      <Stamp f={f} a={aDar} top="DIAGNOSIS" big="DARAH TINGGI" sub="(Hipertensi)" bigSize={118} y={500} />
    </Camera>
  );
};

/* ================= 4 — Definisi 140/90 + "5 perkara penting" ================= */
export const Lima: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSer = at(p, 'seratus', 2.0);
  const aLeb = at(p, 'atau lebih', 4.2);
  const aFive = at(p, 'lima', 5.4);
  return (
    <FiveIntro
      p={p}
      aFive={aFive}
      sub="perkara penting"
      head={
        <>
          <Pop at={4} style={{left: 0, width: 1080, top: 470, display: 'flex', justifyContent: 'center'}}>
            <Pill text="Darah tinggi = bacaan kekal" bg={C.navy} size={44} />
          </Pop>
          <Pop at={aSer} style={{left: 0, width: 1080, top: 600, display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 20, background: RED, borderRadius: 50, padding: '14px 44px', boxShadow: '0 14px 34px rgba(18,11,51,.5)'}}>
              <Txt size={110}>{f >= aLeb ? '≥ 140/90' : '140/90'}</Txt>
              {f >= aLeb ? <svg width={70} height={90} viewBox="0 0 70 90"><path d="M 35 6 L 64 46 L 46 46 L 46 84 L 24 84 L 24 46 L 6 46 Z" fill={C.yellow} /></svg> : null}
            </div>
          </Pop>
          <Pop at={aSer + 10} style={{left: 0, width: 1080, top: 790, display: 'flex', justifyContent: 'center'}}>
            <Txt size={36} color={C.violet[4]}>mmHg, pada bacaan berulang</Txt>
          </Pop>
        </>
      }
    />
  );
};

/* ================= 5 — #1 Ia senyap ================= */
export const Senyap: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aTia = at(p, 'tiada simptom', 2.6);
  const aKep = at(p, 'sakit kepala', 4.1);
  const aUkur = at(p, 'ukur', 8.3);
  return (
    <PointScene
      p={p}
      title="IA SENYAP"
      bg={`linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[0]} 100%)`}
      hero={
        <div style={{position: 'relative'}}>
          <KIcon name="heart" size={300} f={f} />
          <div style={{position: 'absolute', left: 190, top: -20}}><Txt size={90} color={C.yellow}>shh…</Txt></div>
        </div>
      }
      items={[
        {a: aTia, icon: <KIcon name="question" size={76} />, text: 'Kebanyakan TIADA simptom'},
        {a: aKep, icon: <MIcon name="head" size={76} f={f} />, text: 'Sakit kepala bukan petunjuk'},
        {a: aUkur, icon: <KIcon name="bp" size={80} text="UKUR" />, text: 'Satu-satunya cara: UKUR', bg: C.green},
      ]}
    />
  );
};

/* ================= 6 — #2 Faktor risiko (grid 6) ================= */
export const Risiko: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="FAKTOR RISIKO"
      titleSize={72}
      grid
      bg={`linear-gradient(180deg, #0F0C2E 0%, ${C.night[3]} 100%)`}
      hero={<KIcon name="warning" size={280} />}
      items={[
        {a: at(p, 'masin', 2.3), icon: <KIcon name="salt" size={120} />, text: 'Makan masin'},
        {a: at(p, 'berat', 2.9), icon: <KIcon name="scale" size={120} f={f} />, text: 'Berat badan'},
        {a: at(p, 'kurang bergerak', 4.2), icon: <KIcon name="couch" size={120} />, text: 'Kurang gerak'},
        {a: at(p, 'merokok', 5.1), icon: <KIcon name="cigarette" size={120} f={f} />, text: 'Merokok'},
        {a: at(p, 'umur', 5.8), icon: <KIcon name="hourglass" size={120} />, text: 'Umur'},
        {a: at(p, 'ahli keluarga', 7.0), icon: <Icon name="family" size={120} />, text: 'Keluarga'},
      ]}
    />
  );
};

/* saluran darah dengan denyut tekanan */
const Vessel: React.FC<{f: number; damage: number}> = ({f, damage}) => (
  <svg width={400} height={300} viewBox="0 0 400 300">
    <path d="M 0 110 Q 200 70 400 110 L 400 190 Q 200 230 0 190 Z" fill="#E7A0B0" />
    <path d="M 0 128 Q 200 92 400 128 L 400 172 Q 200 208 0 172 Z" fill={RED} />
    {[0, 1, 2, 3].map((i) => {
      const x = ((f * 9 + i * 110) % 460) - 30;
      return <circle key={i} cx={x} cy={150} r={20} fill="#B32F4A" />;
    })}
    {[[120, 104], [250, 196], [320, 110]].map(([x, y], i) => (
      <path key={i} d={`M ${x} ${y} l 14 ${y > 150 ? 18 : -18} l 10 ${y > 150 ? -10 : 10} l 12 ${y > 150 ? 16 : -16}`} stroke={C.yellow} strokeWidth={6} fill="none" strokeLinecap="round" opacity={damage > i / 3 ? 1 : 0} />
    ))}
  </svg>
);

/* ================= 7 — #3 Kesan jika dibiarkan ================= */
export const Kesan: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aSal = at(p, 'saluran', 3.2);
  const damage = interpolate(f, [aSal, aSal + 40], [0, 1], clamp);
  return (
    <PointScene
      p={p}
      title="KESAN JIKA DIBIARKAN"
      titleSize={70}
      bg={`linear-gradient(180deg, ${C.night[0]} 0%, #5A1F3A 100%)`}
      glow={RED}
      hero={<Vessel f={f} damage={damage} />}
      items={[
        {a: at(p, 'strok', 5.9), icon: <MIcon name="brain" size={76} f={f} />, text: 'Strok', bg: RED},
        {a: at(p, 'serangan jantung', 6.5), icon: <KIcon name="heart" size={76} f={f} />, text: 'Serangan jantung'},
        {a: at(p, 'kegagalan', 7.5), icon: <KIcon name="kidney" size={76} />, text: 'Kegagalan buah pinggang', size: 36},
        {a: at(p, 'mata', 9.3), icon: <MIcon name="eye" size={76} />, text: 'Masalah mata'},
      ]}
      mood="sad"
      pose="clasp"
    />
  );
};

/* ================= 8 — #4 Ubah gaya hidup ================= */
export const Gaya: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aGar = at(p, 'garam', 1.7);
  return (
    <PointScene
      p={p}
      title="UBAH GAYA HIDUP"
      titleSize={74}
      bg={`linear-gradient(180deg, ${C.night[1]} 0%, #1F4A4A 100%)`}
      glow={C.green}
      hero={
        <div style={{position: 'relative', width: 280, height: 280}}>
          <KIcon name="salt" size={280} />
          <div style={{position: 'absolute', left: 30, top: 30}}>{f >= aGar + 6 ? <Cross f={f - aGar - 6} size={220} /> : null}</div>
        </div>
      }
      items={[
        {a: aGar, icon: <KIcon name="spoon" size={76} />, text: 'Garam < 1 sudu teh / hari', size: 38},
        {a: at(p, 'bersenam', 4.6), icon: <KIcon name="shoe" size={76} />, text: 'Senam 150 minit / minggu', size: 38},
        {a: at(p, 'berhenti merokok', 7.2), icon: <KIcon name="nosmoke" size={76} />, text: 'Berhenti merokok', bg: C.green},
      ]}
      mood="happy"
    />
  );
};

/* ================= 9 — #5 Ubat ================= */
export const Ubat: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <PointScene
      p={p}
      title="UBAT"
      titleSize={110}
      bg={`linear-gradient(180deg, ${C.night[1]} 0%, ${C.violet[2]} 100%)`}
      hero={<KIcon name="pill" size={280} />}
      items={[
        {a: at(p, 'jika doktor', 1.3), icon: <Icon name="doctor" size={76} />, text: 'Ikut preskripsi doktor'},
        {a: at(p, 'setiap hari', 3.0), icon: <KIcon name="calendar" size={76} f={f} />, text: 'Setiap hari, walau rasa sihat', size: 36},
        {a: at(p, 'jangan berhenti', 5.2), icon: <KIcon name="warning" size={76} />, text: 'Jangan berhenti sendiri', bg: RED},
      ]}
    />
  );
};

/* ================= 10 — 3 bulan kemudian: terkawal ================= */
export const Pulih: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  const aGar = at(p, 'garam', 2.1);
  const aJal = at(p, 'berjalan', 2.6);
  const aUbat = at(p, 'ubat', 4.4);
  const aTer = at(p, 'terkawal', 7.0);
  const walk = Math.sin(f / 4) * 8;
  return (
    <Camera dur={p.dur} to={1.08} panY={-15}>
      <AbsoluteFill style={{background: `linear-gradient(180deg, #7FC4F2 0%, #F6D6A8 100%)`}} />
      <div style={{position: 'absolute', left: 760, top: 470, width: 180, height: 180, borderRadius: 90, background: '#FFD27A', boxShadow: '0 0 80px #FFD27A'}} />
      <div style={{position: 'absolute', left: 0, top: 1360, width: 1080, height: 560, background: LEAF}} />
      <Pop at={2} style={{left: 60, top: 490}}>
        <Pill text="3 bulan kemudian" bg={C.navy} color={C.yellow} size={48} />
      </Pop>
      {[{t: 'Kurang garam', a: aGar, i: <KIcon name="salt" size={60} />}, {t: 'Jalan setiap pagi', a: aJal, i: <KIcon name="shoe" size={60} />}, {t: 'Ubat ikut jadual', a: aUbat, i: <KIcon name="pill" size={60} />}].map((x, i) => (
        <Pop key={x.t} at={x.a} style={{left: 60, top: 600 + i * 110}} origin="left center">
          <div style={{display: 'flex', alignItems: 'center', gap: 14, background: C.navy, borderRadius: 40, padding: '10px 30px 10px 14px'}}>
            <Check size={44} />{x.i}<Txt size={38}>{x.t}</Txt>
          </div>
        </Pop>
      ))}
      <Who preset={RAHMAN} x={40} y={940 + walk} w={460} mood="happy" pose={f >= aTer ? 'wave' : 'down'} seed={1} />
      <Pop at={aTer - 10} style={{left: 560, top: 960}}>
        <BigBP sys={128} dia={80} color="#7CF29A" w={400} />
      </Pop>
      <Pop at={aTer} style={{left: 580, top: 1440}}>
        <Pill text="TERKAWAL" bg={C.green} size={64} />
      </Pop>
      <Burst f={f} a={aTer} x={760} y={1100} />
    </Camera>
  );
};

/* ================= 11 — Penutup ================= */
export const Penutup: React.FC<SceneProps> = (p) => {
  const f = useCurrentFrame();
  return (
    <Closing
      p={p}
      aSaya={at(p, 'saya doktor', 5.3)}
      lines={[
        {a: at(p, 'jangan tunggu', 0.1), node: <Pill text="Jangan tunggu ada simptom" bg={C.labelPink} size={52} />},
        {a: at(p, 'periksa', 1.6), node: <IconPill icon={<KIcon name="bp" size={70} text="UKUR" />} text="Periksa tekanan darah" />},
        {a: at(p, 'setahun', 4.0), node: <IconPill icon={<KIcon name="calendar" size={64} f={f} />} text="Sekurang-kurangnya setahun sekali" size={38} bg={C.green} color="#fff" />},
      ]}
    />
  );
};

export const SCENES: Record<string, React.FC<SceneProps>> = {
  intro: Intro,
  rahman: Rahman,
  klinik: Klinik,
  diagnosis: Diagnosis,
  lima: Lima,
  senyap: Senyap,
  risiko: Risiko,
  kesan: Kesan,
  gaya: Gaya,
  ubat: Ubat,
  pulih: Pulih,
  penutup: Penutup,
};
