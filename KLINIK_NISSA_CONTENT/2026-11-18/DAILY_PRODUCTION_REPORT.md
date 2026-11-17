# Daily production report — 2026-11-18 (branch `claude/upbeat-wozniak-5k7bfp`)
Three animated videos in the same concept as the previous batches (Remotion `animasi/`, Violet Flat SVG, avatar `dr-azren`, hook → story → diagnosis → #1–#5 → recovery → "jangan tunggu… saya Doktor Azren"). Topics checked against every branch (28 earlier topics) so none repeat. User approved **option A+**: new voice (1 take each) + 2 new short SFX; music reused from `jenis-nyamuk`; baby cry reused from `murung-selepas-bersalin`. No helpline line. **No clinic CTA.** **Not scheduled.**

Shared code: `animasi/src/topics/_kit/kit.tsx` gained 6 icons (soda can, ORS sachet, soap, diaper, urine sample, swollen foot). Topics registered in `src/topics/index.ts`.

## Video 1 — VIDEO_01_KESIHATAN_BUAH_PINGGANG (`buah-pinggang`)
- **Topic:** "Buah Pinggang Rosak Tanpa Sakit". Story: Encik Rahim (52, fictional) has diabetes and hypertension for 10 years, takes medicine irregularly, self-buys painkillers; tired, swollen legs, night urination → urine + blood tests → chronic kidney disease. Diabetes is the main cause of new dialysis patients in Malaysia. #1 silent disease, #2 risk factors, #3 yearly screening (urine + blood), #4 control sugar & BP, less salt, #5 careful with painkillers (NSAIDs) and products of unclear content. Early detection slows damage. Rahim now takes medicine daily.
- **Voice:** 1 take, 97.84 s (generation `NS2LLDA5dilf9Npi0zYx`).
- **Duration / tech:** 98.41 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (99 MB → 78 MB), AAC 48 kHz, **−14.0 LUFS**, TP −1.0 dB.
- **SFX:** all reused (sting ×2, slap, pop on #1–#5, chime, whoosh).
- **Medical review:** PENDING (CPG KKM CKD 2018; MDTR; Kidney Care UK; late-symptom list and full risk list flagged).

## Video 2 — VIDEO_02_MENTAL_HEALTH_KEBIMBANGAN (`kebimbangan-gad`)
- **Topic:** "Risau Setiap Hari? Mungkin Gangguan Kebimbangan". Story: Farah (31, teacher, fictional) worries about work, money, her mother's health, even being 5 minutes late; for over a year: tense shoulders, irritability, poor focus, poor sleep → doctor checks other causes (thyroid) → generalised anxiety disorder. #1 excessive worry ≥ 6 months, #2 hard to control, #3 physical signs, #4 impairs life, #5 treatable (CBT, medicine if needed, exercise, relaxation; no sedatives without prescription). Not a sign of weakness. Farah sleeps well and is calmer at school.
- **Voice:** 1 take, 85.92 s (generation `kLRJtwE0MKBAjPmqmkPC`).
- **Duration / tech:** 86.51 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (87 MB → 69 MB), AAC 48 kHz, **−14.6 LUFS**, TP −1.0 dB (true-peak cap, gain only).
- **SFX:** ticking clock (**new**, 2 s, −20 LUFS) ×2; sting, pop on #1–#5, chime, whoosh (reused).
- **Medical review:** PENDING (no MOH Malaysia GAD CPG found; NICE CG113, WHO mhGAP 2023, DSM-5; "exercise" and sedative wording flagged).

## Video 3 — VIDEO_03_KANAK_KANAK_CIRIT_BIRIT (`cirit-birit-anak`)
- **Topic:** "Anak Cirit-Birit: Bila Jadi Bahaya?". Story: Aisyah (2, fictional) has diarrhoea and vomiting; mother gives fizzy drink and juice (shown as WRONG); by night she is weak, sunken eyes, dry mouth, dry diaper → dehydration from gut infection. #1 ORS small and often, #2 continue breastfeeding and normal food, #3 avoid fizzy drinks and sweet juice, #4 no anti-diarrhoeal medicine for children without a doctor, #5 danger signs (very weak/drowsy, refuses drinks, persistent vomiting, blood in stool, little urine). Handwashing. Aisyah recovers in 2 days.
- **Voice:** 1 take, 84.08 s (generation `W12bVhd7WxQZGkzS7aEa`).
- **Duration / tech:** 84.65 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (85 MB → 67 MB), AAC 48 kHz, **−14.0 LUFS**, TP −1.4 dB.
- **SFX:** water pour (**new**, 2 s, −20 LUFS) on ORS; baby cry (reused from postpartum, 0 credits); sting, pop on #1–#5, chime, whoosh (reused).
- **Medical review:** PENDING (WHO, WHO/UNICEF, NICE CG84; KKM Paediatric Protocols not yet checked; anti-diarrhoeal wording flagged).

## Files per video
`final_video.mp4`, `thumbnail.png` + `.jpg`, `voiceover.mp3`, `music.mp3` (reused), `sfx_*.mp3` (new SFX, normalised), `narration_script.txt`, `caption_facebook.txt`, `caption_instagram.txt`, `caption_tiktok.txt` (no hashtags), `storyboard.md`, `medical_references.md`, `schedule_status.json`.

## Usage (verified from tool responses)
- **ElevenLabs:** **4,543.9 credits** (estimate before approval: ~4,545)
  - eleven_v4 TTS, 1 take each: 1,652.8 (buah pinggang) + 1,460.9 (kebimbangan) + 1,416.9 (cirit-birit) = 4,530.6
  - eleven_text_to_sound_v2, 2 s, 1 take each: 6.7 (tick) + 6.7 (pour) = 13.3
  - Estimate-only calls: 0 · Scribe ×3: 0 · Music: 0 (reused) · Baby cry: 0 (reused)
  - ElevenLabs Flow: `MBS8cyv1CMq3ifoNyfnV`
- **Higgsfield:** 0 credits

## Notes
- Pronunciation could not be checked automatically. Please listen for: dialisis, dipreskripsi, anti-radang, tiroid, "kognitif tingkah laku", relaksasi, preskripsi, dehidrasi, "rehidrasi oral", "O-R-S", cengkung.
- Remaining credit balance could not be read (ElevenLabs usage tool needs extra connector permission).
