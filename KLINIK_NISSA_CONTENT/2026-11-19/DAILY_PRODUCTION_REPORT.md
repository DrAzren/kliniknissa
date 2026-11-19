# Daily production report — 2026-11-19 (branch `claude/upbeat-wozniak-5k7bfp`)
Three animated videos in the same concept as the previous batches (Remotion `animasi/`, Violet Flat SVG, avatar `dr-azren`, hook → story → diagnosis → #1–#5 → recovery → "jangan tunggu… saya Doktor Azren"). Topics checked against every branch (31 earlier topics) so none repeat. User approved **option A+**: new voice (1 take each) + 2 new short SFX; music reused from `jenis-nyamuk`; ticking clock reused from `kebimbangan-gad`; baby cry reused from `murung-selepas-bersalin`. No helpline line. **No clinic CTA.** **Not scheduled.**

Shared code: `animasi/src/topics/_kit/kit.tsx` gained 7 icons (artery with plaque, wok, vegetables, moon, car, sun, phototherapy lamp). Topics registered in `src/topics/index.ts`.

## Video 1 — VIDEO_01_KESIHATAN_KOLESTEROL (`kolesterol`)
- **Topic:** "Kolesterol Tinggi: Tiada Tanda, Tapi Bahaya".
- **Story:** Puan Rosnah (45, clerk, fictional) eats fried and santan food daily and never had a blood test; her brother had a heart attack at 50 → blood test → high cholesterol.
- **Points:**
  - #1 LDL forms plaque
  - #2 heart attack & stroke
  - #3 blood test if risk factors
  - #4 lifestyle
  - #5 medicine by risk level; don't stop without the doctor
- **Ending:** Rosnah cooks healthier and walks daily.
- **Voice:** 1 take, 85.52 s (generation `MiXmTHcftLtHakpsVn3S`).
- **Duration / tech:** 86.08 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (87 MB → 68 MB), AAC 48 kHz, **−15.4 LUFS**, TP −1.1 dB. Gain only; the true-peak cap prevented −14.
- **SFX:**
  - New: frying (2 s, −20 LUFS).
  - Reused: sting ×2, slap, pop on #1–#5, chime, whoosh.
- **Medical review:** PENDING.
  - Source: CPG KKM Dyslipidaemia 2017.
  - Flagged: screening age and risk list.

## Video 2 — VIDEO_02_MENTAL_HEALTH_INSOMNIA (`insomnia`)
- **Topic:** "Susah Tidur Setiap Malam? Mungkin Insomnia".
- **Story:** Hafiz (38, factory supervisor, fictional) has trouble falling asleep, wakes often and wakes too early; coffee and phone in bed; for 4 months he is tired and irritable and nearly dozes off while driving → chronic insomnia.
- **Points:**
  - #1 definition (≥ 3 nights/week, 3 months)
  - #2 fixed sleep/wake time
  - #3 dark, quiet, cool room; no phone 1 h before bed
  - #4 avoid caffeine, smoking, heavy meals; get up after 20 min
  - #5 CBT-I first line; sleeping pills short-term with a prescription
- **Extra:** can be linked to depression or anxiety.
- **Ending:** Hafiz sleeps well.
- **Voice:** 1 take, 89.36 s (generation `Ut7s9vpRYvB8w1118uO8`).
- **Duration / tech:** 89.92 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (92 MB → 71 MB), AAC 48 kHz, **−14.1 LUFS**, TP −2.1 dB.
- **SFX:**
  - New: alarm clock (2 s, −20 LUFS).
  - Reused: ticking clock (from kebimbangan), sting, pop on #1–#5, chime, whoosh.
- **Medical review:** PENDING.
  - No MOH Malaysia insomnia CPG found; source is NICE CKS.
  - Flagged: "20 minutes" and "1 hour phone" wording.

## Video 3 — VIDEO_03_KANAK_KANAK_BAYI_KUNING (`bayi-kuning`)
- **Topic:** "Bayi Kuning: Bila Perlu Risau?".
- **Story:** baby Danish (4 days, fictional) is getting yellower; grandmother says to sun him (shown as WRONG); day 5 the yellow reaches his legs, he sleeps a lot and won't feed → neonatal jaundice needing phototherapy.
- **Points:**
  - #1 jaundice within 24 h is abnormal
  - #2 spread head-to-toe means a higher level
  - #3 danger signs
  - #4 don't sun the baby; phototherapy is the treatment
  - #5 jaundice > 2 weeks, pale stools or dark urine need a check
- **Extra:** feed often and attend checks.
- **Ending:** Danish recovers.
- **Voice:** 1 take, 85.04 s (generation `elcLeEKtcQDfctpMHZZm`).
- **Duration / tech:** 85.61 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (84 MB → 68 MB), AAC 48 kHz, **−14.7 LUFS**, TP −1.1 dB.
- **SFX:**
  - Reused: baby cry (0 credits), sting, pop on #1–#5, chime, whoosh.
  - No new SFX for this video.
- **Medical review:** PENDING.
  - Source: CPG KKM Neonatal Jaundice 2nd ed.
  - Flagged: sunlight statement, prolonged jaundice threshold, stool/urine colour.

## Files per video
- `final_video.mp4`
- `thumbnail.png` + `.jpg`
- `voiceover.mp3`
- `music.mp3` (reused)
- `sfx_*.mp3` (new SFX, normalised)
- `narration_script.txt`
- `caption_facebook.txt`, `caption_instagram.txt`, `caption_tiktok.txt` (no hashtags)
- `storyboard.md`
- `medical_references.md`
- `schedule_status.json`

## Usage (verified from tool responses)
- **ElevenLabs:** **4,416.9 credits** (estimate before approval: ~4,418)
  - eleven_v4 TTS, 1 take each: 1,481.9 (kolesterol) + 1,467.9 (insomnia) + 1,453.9 (bayi kuning) = 4,403.6
  - eleven_text_to_sound_v2, 2 s, 1 take each: 6.7 (frying) + 6.7 (alarm) = 13.3
  - Estimate-only calls: 0
  - Scribe ×3: 0
  - Music: 0 (reused)
  - Tick / baby cry: 0 (reused)
  - ElevenLabs Flow: `bHpXHWCxVWp0nidDij0u`
- **Higgsfield:** 0 credits

## Notes
- Two worker restarts happened while the SFX nodes were being prepared. Before running anything, the flow was checked: both nodes were still `not_run`. Each SFX was then run once only, so there was no double charge.
- Pronunciation could not be checked automatically. Please listen for: "L-D-L", bersantan, kafein, "kognitif tingkah laku", preskripsi, bilirubin, jaundis, fototerapi, melengkung.
- Remaining credit balance could not be read (the ElevenLabs usage tool needs extra connector permission).
