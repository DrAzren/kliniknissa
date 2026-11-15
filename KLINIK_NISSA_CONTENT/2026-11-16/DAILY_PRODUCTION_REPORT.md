# Daily production report — 2026-11-16 (produced 2026-11-15, branch `claude/upbeat-wozniak-5k7bfp`)
Three animated videos in the same concept as the previous batches (Remotion `animasi/`, Violet Flat SVG, avatar `dr-azren`, hook → story → diagnosis → #1–#5 → recovery → "jangan tunggu… saya Doktor Azren"). Topics checked against every branch so none repeat. User approved **option A+**: new voice (1 take each) + 3 new short SFX; music **reused** from `jenis-nyamuk`. No Talian HEAL line. **No clinic CTA.** **Scheduled** on Metricool at the user's request (see below).

Shared code: `animasi/src/topics/_kit/kit.tsx` gained 10 icons (ambulance, droop face, arms, dizzy, chest x-ray, baby, mask, sputum pot, brain scan, broken heart). Topics registered in `src/topics/index.ts`.

## Video 1 — VIDEO_01_KESIHATAN_STROK (`strok`)
- **Topic:** "Strok: Setiap Minit Berharga". Hook: nearly 2 million brain cells die every minute of a stroke. Story: Puan Salmah (58, fictional) drops her spoon at dinner, mouth droops, slurred speech; grandchild calls 999 → brain scan → ischaemic stroke. #1 face, #2 arm, #3 speech, #4 balance & vision, #5 time (call 999, don't wait, no massage, no food/drink). Treatment works best in the first hours; prevention. Salmah walks again.
- **Voice:** 1 take, 86.24 s (generation `wENZthV4BCGA3l42BDDH`). Scribe word timings.
- **Duration / tech:** 86.81 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (render 91.9 MB → 71.3 MB), AAC 48 kHz, −14.5 LUFS, TP −1.1 dB.
- **SFX:** siren (**new**, 2 s, −20 LUFS) on "999"; sting ×2, slap, pop on #1–#5, chime, whoosh on cuts (reused).
- **Medical review:** PENDING (Saver 2006; MOH CPG Ischaemic Stroke; "jangan urut / jangan beri makan" flagged).

## Video 2 — VIDEO_02_MENTAL_HEALTH_POSTPARTUM (`murung-selepas-bersalin`)
- **Topic:** "Bukan Sekadar Baby Blues". Story: Nurul (29, fictional), 3 weeks after birth, cries daily, can't sleep when the baby sleeps, "Aku ibu yang gagal"; husband notices → clinic screening → postpartum depression. #1 baby blues vs depression, #2 signs, #3 risk factors, #4 family role, #5 treatment (talk therapy, medication; some are compatible with breastfeeding). Nurul smiles again. Safety line for thoughts of harming self or baby.
- **Voice:** 1 take, 92.40 s (generation `H2bhvVyOCDCR6CuEJkDw`). "baby blues" kept in English.
- **Duration / tech:** 92.97 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (100.4 MB → 75.3 MB), AAC 48 kHz, **−17.2 LUFS**, TP −1.0 dB. The voice take itself is −18.3 LUFS with −0.9 dB peaks (softer, "gentle" delivery), so gain-only mixing cannot reach −14 LUFS without a limiter.
- **SFX:** baby cry (**new**, 2 s, −20 LUFS) on "Bayi tidur"; sting, pop on #1–#5, chime, whoosh (reused).
- **Medical review:** PENDING (NICE CG192; CPG MDD 2019; Malaysian prevalence studies; baby-blues duration and breastfeeding-compatible medication flagged).

## Video 3 — VIDEO_03_KESIHATAN_BATUK_KERING_TB (`batuk-kering-tb`)
- **Topic:** "Batuk Lebih 2 Minggu? Mungkin Batuk Kering". Story: Hakim (38, factory worker, fictional) coughs for 3 weeks despite 2 bottles of cough syrup, night sweats, lost 5 kg → sputum test + chest X-ray → TB. #1 signs, #2 spread, #3 who is at risk, #4 tests, #5 treatment ≥ 6 months, don't stop early. Family screened; Hakim cured after 6 months.
- **Voice:** 1 take, 87.20 s (generation `vIS7rEM0vRG19Tuag2ii`). "x-ray" in the voice → caption "X-ray".
- **Duration / tech:** 87.79 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (95.1 MB → 71.7 MB), AAC 48 kHz, −14.0 LUFS, TP −1.3 dB.
- **SFX:** cough (**new**, 2 s, −20 LUFS) ×2; sting, pop on #1–#5, chime, whoosh (reused).
- **Medical review:** PENDING (WHO Global TB Report 2025; MOH CPG TB 2021).

## Files per video
`final_video.mp4`, `thumbnail.png` + `.jpg`, `voiceover.mp3`, `music.mp3` (reused), `sfx_*.mp3` (new SFX, normalised), `narration_script.txt`, `caption_facebook.txt`, `caption_instagram.txt`, `caption_tiktok.txt` (no hashtags), `storyboard.md`, `medical_references.md`, `schedule_status.json`.

## Usage (verified from tool responses)
- **ElevenLabs:** **4,555.5 credits** (estimate before approval: ~4,556)
  - eleven_v4 TTS, 1 take each: 1,529.8 (strok) + 1,522.8 (postpartum) + 1,482.9 (TB) = 4,535.5
  - eleven_text_to_sound_v2, 2 s, 1 take each: 6.7 (siren) + 6.7 (baby) + 6.7 (cough) = 20.0. The pre-run estimates showed 55 and then 22 credits, but the actual charge was 6.67 each.
  - Estimate-only calls: 0
  - Scribe ×3: 0
  - Music: 0 (reused)
  - ElevenLabs Flow: `p2sPgiMNTt8WqWRqC7TE`
- **Higgsfield:** 0 credits

## Notes
- Pronunciation could not be checked automatically (Scribe aligns to the script text). Please listen for: strok, "sembilan sembilan sembilan", fisioterapi, "baby blues", tuberkulosis, "x-ray", kahak.

## Scheduling (requested 2026-11-15)
Metricool brand Klinik Nissa (7840561), FB Reel + IG Reel + TikTok, custom thumbnail, caption = `caption_instagram.txt`. AI-generated label OFF (IG `isAiGenerated=false`, TikTok `isAigc=false`), TikTok commercial content OFF. Times from Metricool best-time data for Monday (FB+IG+TikTok combined: 12:00 and 18:00 highest, then 10:00, then 17:00).
| Time (MYT) | Video | Metricool post |
|---|---|---|
| 10:20 | VIDEO_01 Strok | 428860803 |
| 12:40 | VIDEO_03 Batuk kering TB | 428861122 |
| 18:20 | VIDEO_02 Bukan sekadar baby blues | 428861185 |
A worker restart interrupted the first scheduling attempt; the scheduled list was checked before retrying, so there are no duplicates. Media uploaded to Higgsfield storage for a public URL (free, 0 credits). Status: PENDING until published.
