# Daily production report — 2026-11-24 batch (produced 2026-11-23, branch `claude/upbeat-wozniak-5k7bfp`)
Three animated videos in the same concept as the previous batches (Remotion `animasi/`, Violet Flat SVG, avatar `dr-azren`, hook → story → diagnosis → #1–#5 → recovery → "jangan tunggu… saya Doktor Azren"). The user approved option **A+** ("+ A, ditambah 2 SFX baharu ~4,378"): new voice (1 take each), **2 new short SFX** (pill bottle rattle, digital thermometer beep), music reused from `jenis-nyamuk`. Topics checked against all 37 earlier topics, so none repeat. No helpline line. **No clinic CTA.** **Not scheduled** (schedule on Metricool only when the user asks).

Shared code: `animasi/src/topics/_kit/kit.tsx` gained 9 icons:
- syringe
- HPV self-sampling kit
- abnormal cells
- uterus/cervix
- digital thermometer (shows a reading)
- rash under glass
- drawer
- pill bottle
- thin shirt

Topics are registered in `src/topics/index.ts` (`kanser-serviks`, `mitos-antidepresan`, `demam-anak`).

## Video 1 — VIDEO_01_KESIHATAN_KANSER_SERVIKS (`kanser-serviks`)
- **Topic:** "Kanser Serviks: Saringan Sebelum Terlambat".
- **Story:** Puan Hidayah (38, cloth seller, fictional) never had screening (no pain, embarrassed). Her best friend is diagnosed with cervical cancer, so she goes to the clinic → HPV test → pre-cancerous cell changes, treated early.
- **Points:**
  - #1 almost all cases come from persistent HPV infection
  - #2 early stage usually has no symptoms
  - #3 women 30–65: HPV test, self-sampling option
  - #4 warning signs: bleeding after sex, between periods or after menopause; unusual discharge
  - #5 HPV vaccine (schoolgirls; adult women ask a doctor)
- **Extra:** a positive test does not mean cancer, but needs follow-up.
- **Voice:** 1 take, 86.08 s (generation `ED5ubCLK31EzoW7Hq00N`).
- **Duration / tech:** 86.63 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (84 MB → 69 MB), AAC 48 kHz, **−14.6 LUFS**, TP −1.1 dB. Slightly below −14 because of the true-peak cap.
- **SFX:** all reused (sting, pop on #1–#5, chime, whoosh).
- **Medical review:** PENDING.
  - Sources: MOH Malaysia HPV primary screening guideline (2019), WHO, NHS.
  - Flagged: the 30–65 age range, warning signs and adult vaccine eligibility.

## Video 2 — VIDEO_02_MENTAL_HEALTH_MITOS_ANTIDEPRESAN (`mitos-antidepresan`)
- **Topic:** "Ubat Kemurungan Buat Ketagih? Ini Faktanya".
- **Story:** Encik Kamal (40, technician, fictional) is prescribed an antidepressant. A friend says it is addictive, so he keeps it in a drawer. Two months later he is worse, returns and talks openly with the doctor.
- **Points:**
  - #1 not addictive (no high, no craving for higher doses)
  - #2 takes a few weeks to work
  - #3 side effects usually mild and often fade
  - #4 don't stop suddenly; taper with the doctor
  - #5 sedatives/sleeping pills are different (dependence risk, short-term only)
- **Extra:** talking therapy and family support matter too.
- **Voice:** 1 take, 86.64 s (generation `dg0M8FM8NhSbKnoz7kTC`).
- **Duration / tech:** 87.21 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (86 MB → 69 MB), AAC 48 kHz, **−14.0 LUFS**, TP −2.0 dB.
- **SFX:** **new** `sfx_pills.mp3` (pill bottle rattle, plays on "simpan ubat" and "Kamal kini"). Reused: slap (drawer), sting, pop on #1–#5, chime, whoosh.
- **Medical review:** PENDING.
  - Sources: RCPsych (2020), *Advances in Psychiatric Treatment*, NHS, NICE CG113, MOH CPG MDD 2nd ed.
  - Flagged: "bukan ubat ketagihan" wording and "beberapa minggu".

## Video 3 — VIDEO_03_KANAK_KANAK_DEMAM (`demam-anak`)
- **Topic:** "Anak Demam: Bila Perlu Jumpa Doktor?".
- **Story:** Hana (3, fictional) has 39°C fever; her mother panics and wants antibiotics. Hana still drinks, plays and laughs when the fever drops → viral infection, no antibiotics needed.
- **Points:**
  - #1 look at the child, not only the number
  - #2 baby < 3 months with ≥ 38°C → hospital now
  - #3 red flags: very weak/hard to wake, breathing difficulty, non-blanching rash, fits, passing less urine
  - #4 fever ≥ 5 days → see a doctor
  - #5 at home: fluids, light clothes, paracetamol by body weight if uncomfortable, no cold sponging
- **Extra:** most fevers are viral and settle in a few days; antibiotics do not help viruses.
- **Voice:** 1 take, 83.12 s (generation `alpiO7Swr4JSn8KpsmQJ`).
- **Duration / tech:** 83.67 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (82 MB → 67 MB), AAC 48 kHz, **−14.4 LUFS**, TP −1.0 dB.
- **SFX:** **new** `sfx_beep.mp3` (digital thermometer beep, plays on "Suhu badannya" and "dengan suhu"). Reused: sting, pop on #1–#5, chime, whoosh.
- **Medical review:** PENDING.
  - Source: NICE NG143.
  - Flagged: non-blanching rash, reduced urine, paracetamol dosing and cold sponging. MOH *Paediatric Protocols* not yet checked.

## Files per video
- `final_video.mp4`
- `thumbnail.png` + `.jpg`
- `voiceover.mp3`
- `music.mp3` (reused)
- `sfx_pills.mp3` / `sfx_beep.mp3` (new SFX; videos 2 and 3)
- `narration_script.txt`
- `caption_facebook.txt`, `caption_instagram.txt`, `caption_tiktok.txt` (no hashtags)
- `storyboard.md`
- `medical_references.md`
- `schedule_status.json` (status `READY_NOT_SCHEDULED`)

## Usage (verified from tool responses)
- **ElevenLabs:** **≈4,377.0 credits** (estimate before approval: ~4,378 for option A+)
  - eleven_v4 TTS, 1 take each: 1,473.9 (serviks) + 1,481.9 (antidepresan) + 1,407.9 (demam) = 4,363.7
  - SFX ×2 (eleven_text_to_sound_v2, 2 s, 1 generation each): 6.67 + 6.67 = 13.3
  - Music: 0 (reused)
  - Scribe ×3: 0
  - ElevenLabs Flow: `XREJc6AQFfErqwHkqdjf`
- **Higgsfield:** 0 credits

## Notes
- Folder date is 2026-11-24 (the planned posting day); production happened on 2026-11-23.
- Pronunciation could not be checked automatically. Please listen for: "H-P-V", pra-kanser, keputihan, antidepresan, khayal, kebergantungan, parasetamol, kebah, "tiga puluh sembilan darjah".
- The remaining credit balance could not be read (the ElevenLabs usage tool needs extra connector permission).
