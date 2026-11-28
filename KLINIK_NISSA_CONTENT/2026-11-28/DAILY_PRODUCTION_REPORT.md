# Daily production report — 2026-11-28 batch (produced 2026-11-27, branch `claude/upbeat-wozniak-5k7bfp`)
Three animated videos, same concept as previous batches:
- Remotion `animasi/`, Violet Flat SVG, avatar `dr-azren`.
- Structure: hook → story → diagnosis → #1–#5 → recovery → "jangan tunggu… saya Doktor Azren".

The user approved option **A+** ("+ A, ditambah 2 SFX baharu"):
- New voice, 1 take each.
- **2 new short SFX:** fall thud, phone notification.
- Music reused from `jenis-nyamuk`.

Topics were checked against all 43 earlier topics; none repeat. No helpline line. **No clinic CTA.** **Scheduled** on Metricool for 28 Nov (same day) at the user's request (see below).

Shared code: `animasi/src/topics/_kit/kit.tsx` gained 8 icons: cane, bathroom grab bar, non-slip mat, slipper, dumbbell, TV, book, music notes. Topics registered in `src/topics/index.ts`: `jatuh-warga-emas`, `senaman-mood`, `anak-skrin`.

## Video 1 — VIDEO_01_KESIHATAN_JATUH_WARGA_EMAS (`jatuh-warga-emas`)
- **Topic:** "Warga Emas Jatuh: 5 Cara Mencegahnya".
- **Story:** Pak Hamid (72, retired teacher, fictional) slips on a wet, dark bathroom floor at night. He can't get up; his wife finds him → hip fracture.
- **Points:**
  - #1 risk factors (weak legs, balance, dizziness, poor vision, previous fall)
  - #2 medication review (sleeping pills, sedatives, BP drugs)
  - #3 strength & balance exercise
  - #4 home safety (night light, non-slip mat, grab bar, clear floor)
  - #5 eye check, non-slip well-fitting footwear
- **Extra:** any fall, even without injury, should be reported to a doctor.
- **Voice:** 1 take, 78.08 s (generation `3ttxIeB9uadLlEVoLb92`).
- **Duration / tech:** 78.63 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (79 MB → 62 MB), AAC 48 kHz, **−14.0 LUFS**, TP −1.5 dB.
- **SFX:**
  - **New:** `sfx_thud.mp3` (on "tergelincir").
  - Reused: water splash, siren, sting, pop on #1–#5, chime, whoosh.
- **Medical review:** PENDING.
  - Sources: NICE NG249 / CG161, Cochrane summary.
  - Flagged: "kebanyakan jatuh boleh dicegah", medication examples, footwear advice. MOH falls guideline not yet checked.

## Video 2 — VIDEO_02_MENTAL_HEALTH_SENAMAN_MOOD (`senaman-mood`)
- **Topic:** "Senaman & Mood: Ubat Yang Sering Dilupakan".
- **Story:** Encik Rizal (36, bank officer, fictional) spends every evening on the sofa with his phone. His mood drops, he is irritable and sleeps poorly → doctor assesses him and adds regular exercise.
- **Points:**
  - #1 reduces depression & anxiety symptoms, improves sleep
  - #2 ≥ 150 min/week moderate activity (≈ 30 min × 5 days)
  - #3 start small, 10 minutes is fine, be consistent
  - #4 choose what you enjoy, with friends/groups
  - #5 complements treatment, doesn't replace it; don't stop medication/therapy yourself
- **Extra:** low mood > 2 weeks or loss of interest → see a doctor.
- **Voice:** 1 take, 76.96 s (generation `OBJI61I1xKE2yb35kTkF`).
- **Duration / tech:** 77.55 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (77 MB → 62 MB), AAC 48 kHz, **−14.7 LUFS**, TP −1.1 dB. Slightly below −14 because of the true-peak cap.
- **SFX:** all reused (tick, sting, pop on #1–#5, chime, whoosh).
- **Medical review:** PENDING.
  - Sources: WHO physical activity, NICE NG222, NIHR.
  - Flagged: "improves sleep", "10 minutes" message, MOH CPG MDD reference.

## Video 3 — VIDEO_03_KANAK_KANAK_SKRIN (`anak-skrin`)
- **Topic:** "Anak & Skrin: Berapa Lama Yang Sesuai?".
- **Story:** Adik Aqil (2, fictional) is given a phone whenever he cries and now watches for hours. He says few words, has tantrums when the phone is taken away and sleeps poorly → doctor advises more talking and play, not screens.
- **Points:**
  - #1 under 2: screen time not recommended
  - #2 age 2–4: ≤ 1 hour/day, less is better
  - #3 watch together, suitable content, talk about it
  - #4 no screens at meals and before bed; phone out of the bedroom
  - #5 replace with play, books, singing, talking; parents as role models
- **Extra:** speech delay or poor interaction → early assessment.
- **Voice:** 1 take, 75.84 s (generation `syR1vylWZSv2Z1HbCHai`).
- **Duration / tech:** 76.42 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (76 MB → 61 MB), AAC 48 kHz, **−14.1 LUFS**, TP −1.1 dB.
- **SFX:**
  - **New:** `sfx_phone.mp3` (on "beri telefon").
  - Reused: sting, pop on #1–#5, chime, whoosh.
- **Medical review:** PENDING.
  - Source: WHO 2019 under-5 guidelines.
  - Flagged: meal/bedtime advice is AAP/NHS, not WHO. The story deliberately does not claim screens *cause* speech delay. MOH screen-time guidance not yet checked.

## Files per video
- `final_video.mp4`
- `thumbnail.png` + `.jpg`
- `voiceover.mp3`
- `music.mp3` (reused)
- `sfx_thud.mp3` / `sfx_phone.mp3` (new SFX; videos 1 and 3)
- `narration_script.txt`
- `caption_facebook.txt`, `caption_instagram.txt`, `caption_tiktok.txt` (no hashtags)
- `storyboard.md`
- `medical_references.md`
- `schedule_status.json`

## Usage (verified from tool responses)
- **ElevenLabs:** **≈3,923.9 credits** (estimate before approval: ~3,924 for option A+)
  - eleven_v4 TTS, 1 take each: 1,301.9 (jatuh) + 1,318.9 (senaman) + 1,289.9 (skrin) = 3,910.6
  - SFX ×2 (eleven_text_to_sound_v2, 2 s, 1 generation each): 6.67 + 6.67 = 13.3
  - Music: 0 (reused)
  - Scribe ×3: 0
  - ElevenLabs Flow: `Wd8AoKU0xDztzLxHdZzT`
- **Higgsfield:** 0 credits

## Notes
- Folder date is 2026-11-28 (next posting day); production happened on 2026-11-27.
- Pronunciation could not be checked automatically. Please listen for: fisioterapi, tergelincir, "seratus lima puluh minit", "dua hingga empat tahun", mengamuk.
- The remaining credit balance could not be read (the ElevenLabs usage tool needs extra connector permission).

## Scheduling (Metricool, brand Klinik Nissa, Asia/Kuala_Lumpur)
Requested 2026-11-28 ~08:35: "cari waktu terbaik HARI INI dan post hari ini". Facebook Reel + Instagram Reel (shown on feed) + TikTok (public), auto-publish, caption = `caption_instagram.txt`, custom thumbnail. AI-generated label OFF (IG `isAiGenerated`, TikTok `isAigc`), commercial content OFF (TikTok own brand / third party), TikTok auto-music OFF. Made-for-kids: not applicable (no YouTube on this brand).

| Time (MYT) | Video | Metricool post id | Why this slot |
|---|---|---|---|
| Sat 28 Nov 10:10 | VIDEO_01 Warga Emas Jatuh | 445027584 | FB 10:00 and TikTok 10:00 are the top hours on Saturday; adult children at home on weekend mornings |
| Sat 28 Nov 12:20 | VIDEO_03 Anak & Skrin | 445027750 | TikTok 12:00 (2nd), FB 12:00 (3rd); parents free at weekend lunchtime |
| Sat 28 Nov 18:10 | VIDEO_02 Senaman & Mood | 445027859 | TikTok 18:00 (3rd), IG 18:00 strong, FB evening; fits the "exercise this evening" message |

Media uploaded to the user's Higgsfield storage (free `media_upload`, 0 credits; sizes verified equal to local files); Metricool copied it to its own storage. Medical review is still pending: please check before 10:10 today.
