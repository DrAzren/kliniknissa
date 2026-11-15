# Daily production report — 2026-11-14 (VIDEO_04–06, branch `claude/upbeat-wozniak-5k7bfp`)
VIDEO_01–03 for the same date (sleep apnea, serangan panik, batu karang) were produced in another session on branch `claude/trusting-sagan-des1yl`. This batch is numbered 04–06 so the folders do not clash. If both branches are merged, combine the two `DAILY_PRODUCTION_REPORT.md` files by hand.

Batch scope: three animated videos in the same concept as Bipolar / Eczema / Jenis Nyamuk (Remotion `animasi/`, Violet Flat SVG, avatar `dr-azren`, storytelling hook → doctor → diagnosis → #1–#5 → recovery → "jangan tunggu… saya Doktor Azren"). Topics were chosen so they do not repeat any topic already produced on any branch. The user approved **option A**: voice only. Background music and SFX were **reused** from `jenis-nyamuk` (no new music, no new SFX). No Talian HEAL line (user's instruction). **No clinic CTA.** **Scheduled** on Metricool on 2026-11-15 at the user's request (see below).

Shared new code: `animasi/src/topics/_kit/kit.tsx` (scene helpers, ~45 new SVG icons, diagnosis stamp, `PointScene` for #N scenes, `FiveIntro`, `Closing`). Story characters are defined in each topic's `scenes.tsx`; Dr. Azren's drawing is unchanged. Topics registered in `src/topics/index.ts`.

## Video 4 — VIDEO_04_KESIHATAN_DARAH_TINGGI (`darah-tinggi`)
- **Topic:** "Darah Tinggi: Pembunuh Senyap". Hook: 3 in 10 Malaysian adults have it, about 4 in 10 patients don't know; "tak sakit, tak gatal, tapi boleh membunuh". Story: Encik Rahman (45, lorry driver, fictional) feels fine, occasional headache → clinic for flu, BP 168/100, repeat reading still high → hypertension. #1 silent, #2 risk factors, #3 complications, #4 lifestyle (salt < 1 tsp, 150 min/week, stop smoking), #5 medication. Rahman controlled at 3 months. Close: check BP at least once a year.
- **Voice:** Dr Azren (`lN6exnzhuXDOyNQfsVSR`, `eleven_v4`, emotion tags), **1 take**, 99.68 s (generation `cQX2RpmvqIn5fAjoRGdW`). Scribe word timings.
- **Duration / tech:** 100.25 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (render was 106 MB > 95 MB → 79 MB), AAC 48 kHz, −14.1 LUFS, TP −1.2 dB.
- **SFX (reused):** sting ×2, slap, pop on #1–#5, chime, whoosh on cuts.
- **Medical review:** PENDING (`medical_references.md`; MOH CPG Hypertension 5th ed. 2018 + NHMS 2023).

## Video 5 — VIDEO_05_MENTAL_HEALTH_KEMURUNGAN_LELAKI (`kemurungan-lelaki`)
- **Topic:** "Lelaki Murung Tak Semestinya Menangis". Story: Faiz (34, engineer, fictional) becomes irritable, on his phone until 3 a.m., body aches with normal tests, "Aku okey" → wife persuades him → screening + interview → major depression. #1 quick anger, #2 escape into work/screens, #3 unexplained aches, #4 disturbed sleep, #5 loss of interest / withdrawal / risk-taking. >2 weeks needs assessment; talk therapy ± medication; antidepressants are not addictive. Faiz back at futsal with his son. Close: talking is not weakness; thoughts of self-harm → emergency help.
- **Voice:** 1 take, 95.84 s (generation `xn2fng9DICP2NdQcW1lQ`).
- **Duration / tech:** 96.41 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (99.5 MB → 76 MB), AAC 48 kHz, **−15.1 LUFS**, TP −1.1 dB (−14 LUFS not reachable with gain only; slap/whoosh peaks limit it).
- **SFX (reused):** slap ×2, sting, pop on #1–#5, chime, whoosh on cuts.
- **Medical review:** PENDING (MOH CPG MDD 2nd ed. 2019; NIMH; "antidepressants not addictive" needs doctor check re: discontinuation symptoms).

## Video 6 — VIDEO_06_KANAK_KANAK_HFMD (`hfmd`)
- **Topic:** "HFMD: Penyakit Tangan, Kaki & Mulut". Hook: a small mouth ulcer can be the sign of a disease that closes a kindergarten. Story: Aisyah (3, fictional) comes home from nursery with fever, cries when drinking milk; next morning red spots and blisters on palms and soles → clinic → HFMD. #1 cause (enterovirus, EV71), #2 spread, #3 usual signs (self-limiting 7–10 days), #4 danger signs → hospital, #5 care & prevention. Aisyah recovers in a week.
- **Voice:** 1 take, 100.16 s (generation `V0nRtcYlsUoGMfFPtb5P`). "E V tujuh puluh satu" in the voice → caption "EV71".
- **Duration / tech:** 100.74 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (105 MB → 80 MB), AAC 48 kHz, **−15.0 LUFS**, TP −1.1 dB.
- **SFX (reused):** sting ×2, pop on #1–#5, chime, whoosh on cuts.
- **Medical review:** PENDING (WHO WPRO HFMD guide 2011; KKM; "7–10 days" and "tak mahu minum" flagged).

## Files per video
`final_video.mp4`, `thumbnail.png` + `.jpg`, `voiceover.mp3`, `music.mp3` (reused), `narration_script.txt`, `caption_facebook.txt`, `caption_instagram.txt`, `caption_tiktok.txt` (no hashtags), `storyboard.md`, `medical_references.md`, `schedule_status.json`.

## Usage (verified from tool responses)
- **ElevenLabs:** **4,899.5 credits** (estimate before approval: ~4,900)
  - eleven_v4 TTS, 1 take each: 1,643.8 (darah tinggi) + 1,623.8 (kemurungan lelaki) + 1,631.8 (HFMD)
  - Estimate-only calls (TTS, Scribe): 0
  - Scribe transcription ×3: 0
  - Music: 0 (reused `jenis-nyamuk/music.mp3`)
  - SFX: 0 (reused `jenis-nyamuk/sfx/`)
  - ElevenLabs Flow: `0xZVIRu6C9JvIGXB6mY0`
- **Higgsfield:** 0 credits (no generation, no upload)
- Remaining ElevenLabs balance could not be read (the account-usage tool asks for extra connector permission).

## Notes / open items
- Pronunciation could not be checked automatically (Scribe output is aligned to the script text). Please listen for: hipertensi, strok, "seratus enam puluh lapan, per seratus", "major", antidepresan, HFMD, enterovirus, "E V tujuh puluh satu".
- Music was composed for the mosquito video (light, playful). It sits at −16 dB under the voice. For the depression video it may feel slightly bright; a new track would cost ~1,500 credits.

## Scheduling (2026-11-15, at the user's request)
Metricool brand Klinik Nissa (7840561), FB Reel + IG Reel + TikTok, custom thumbnail, caption = `caption_instagram.txt`. AI-generated label OFF (IG `isAiGenerated=false`, TikTok `isAigc=false`), TikTok commercial content OFF (own brand / third party). Made-for-kids only exists for YouTube, which this brand does not have. Times from Metricool best-time data for Sunday (FB/TikTok peak 18:00, then 19:00, then 16:00–17:00).
| Time (MYT) | Video | Metricool post |
|---|---|---|
| 16:40 | VIDEO_06 HFMD | 428645510 |
| 18:10 | VIDEO_04 Darah Tinggi | 428645580 |
| 19:40 | VIDEO_05 Lelaki Murung | 428645621 |
Media uploaded to Higgsfield storage for a public URL (free, 0 credits). Status: PENDING until published.
