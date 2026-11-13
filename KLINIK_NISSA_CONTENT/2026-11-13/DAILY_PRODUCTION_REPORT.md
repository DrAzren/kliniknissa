# Daily production report — 2026-11-13
Batch scope: one video requested by the user ("Apa jadi kalau gula darah terlalu rendah?", hypoglycaemia, for World Diabetes Day 14 Nov; same animation concept as Bipolar / Eczema / Jenis Nyamuk; Dr Azren voice eleven_v4, 1 generation only; light music + SFX).

## Video 1 — VIDEO_01_DIABETES_HIPOGLISEMIA
- **Topic:** Hipoglisemia. Hook: "Pesakit diabetes boleh pengsan… bukan sebab gula terlalu tinggi, tapi terlalu RENDAH." Story: Pak Cik Kamal (60, fictional) injects insulin, skips breakfast, goes to a gotong-royong at the surau; at midday he trembles, has a cold sweat and becomes confused; his daughter takes him to a generic KLINIK; finger-prick 2.8 mmol/L → hypoglycaemia. Dr. Azren explains #1 definition (< ~3.9 mmol/L), #2 signs, #3 common causes, #4 first aid "Peraturan 15", plus an unconscious-patient warning (no forced drinking, honey in the mouth, call 999). Kamal recovers and no longer skips meals. Closes with screening for glucose + HbA1c for World Diabetes Day, "saya Doktor Azren". **No clinic CTA.**
- **Fact base:** CPG Management of T2DM, 6th ed. (2020), Section 4.1 Hypoglycaemia (user asked to follow the CPG). Draft changed to match it: honey example, "usual meal after recovery", and the unconscious-patient advice (CPG: honey into the oral cavity outside hospital, instead of the earlier "nothing by mouth").
- **Production:** `animasi/` Remotion (Violet Flat SVG), topic `hipoglisemia`, avatar `dr-azren` (drawing unchanged). New: Kamal (avatar + white kopiah overlay) and his daughter (hijab), a "3D" brain cell with fuel tank and lamps (perspective motion), blood-glucose gauge (red → green), glucometer, 15-minute countdown timer.
- **Voice:** Dr Azren (`lN6exnzhuXDOyNQfsVSR`, `eleven_v4`, emotion tags), **1 take only**, 97.92 s. Pronunciation per user: "hai-po-glai-si-mia"; HbA1c said both ways ("ech-bi-ei-wan-si, iaitu ujian gula tiga bulan"). Scribe word timings.
- **Music & SFX:** music reused from jenis-nyamuk (0 credits; the new 99 s track was quoted at 2,722.5 credits, about 2× the approved estimate, so the user chose reuse). 3 new SFX (heartbeat, flickering light, timer ding), 1 take each, normalised to ~−20 LUFS; whoosh, pop, sting, chime reused.
- **Duration / tech:** 98.47 s (voice + 0.5 s), 1080×1920, 30 fps, H.264 6.4 Mbps (2-pass re-encode of the 8.1 Mbps render, 100.1 MB → 81.8 MB, to stay under GitHub's 100 MB limit), AAC 48 kHz, −15.8 LUFS, true peak −1.1 dB (gain only; SFX peaks stop it reaching −14 LUFS without a limiter).
- **Files:** `final_video.mp4`, `thumbnail.png/.jpg`, `voiceover.mp3`, `music.mp3`, `narration_script.txt`, captions (FB / IG / TikTok, no hashtags), `storyboard.md`, `medical_references.md`, `schedule_status.json`
- **Medical review:** PENDING (`medical_references.md`, 3 items flagged ⚠️)
- **Approval status:** SCHEDULED on Metricool (post 426520379) for **13 Nov 2026, 12:15 MYT** on Facebook Reel, Instagram Reel (AI label) and TikTok (AIGC label), with custom thumbnail and short caption, at the user's request. Medical review still pending.

## Usage (verified from tool responses)
- **ElevenLabs:** 1,641.2 credits
  - eleven_v4 TTS, 1 take: 1,622.8 (estimate before approval: ~1,600 for 1,599 chars; final text 1,623 chars after the HbA1c change)
  - SFX v2 × 3, 1 take each: 6.7 + 6.7 + 5.0 = 18.3 (pre-run quote 60.5)
  - Music: 0 (reused; no music generation run)
  - Scribe transcription: 0
- **Higgsfield:** 0 credits (only free media_upload for the Metricool public URL)

## Video 2 — VIDEO_02_KESIHATAN_KENCING_TIKUS
- **Topic:** Kencing tikus (leptospirosis) selepas banjir. Hook: "Banjir dah surut… tapi bahaya sebenar baru bermula." Story: Encik Rahman (45, fictional) cleans his muddy house after a flood without boots and cuts his foot ("Luka sikit je"); a week later high fever, very painful calves, red eyes; wife takes him to a generic KLINIK; doctor asks about flood exposure, blood test confirms leptospirosis. Dr. Azren explains #1 what it is, #2 transmission, #3 signs (incubation 2–30 days, average 10; severe: jaundice, less urine, can be fatal), #4 prevention. Rahman recovers with early antibiotics. Closes "Demam dalam masa sebulan selepas banjir? Jangan tunggu… beritahu doktor anda terlibat dengan banjir. Saya Doktor Azren." **No clinic CTA.**
- **Fact base:** KKM Guidelines for the Diagnosis, Management, Prevention and Control of Leptospirosis in Malaysia (2011), read from a public repost (moh.gov.my PDF blocked, 403); KKM flood-season advisories.
- **Production:** `animasi/` Remotion (Violet Flat SVG), topic `kencing-tikus`, avatar `dr-azren` (unchanged). New: Rahman + wife, "3D" spiral *Leptospira* (front/back layering, highlights, perspective), rat, animated flood water, 1–30 day incubation calendar, boots / gloves / plaster / shower icons.
- **Voice:** Dr Azren (`lN6exnzhuXDOyNQfsVSR`, `eleven_v4`, emotion tags), **1 take only**, 92.4 s. "lep-to-spi-ro-sis" (captions: leptospirosis); "boot" for "but" (captions: but). Scribe word timings.
- **Music & SFX:** music reused from jenis-nyamuk (0 credits). 2 new SFX (flood water 2 s, rat squeak 1 s), 1 take each, normalised ~−20 LUFS; whoosh, pop, sting, chime, slap reused.
- **Duration / tech:** see render line (pending).
- **Medical review:** PENDING (`medical_references.md`, 2 items flagged ⚠️)
- **Approval status:** REVIEW-READY. Not scheduled.

### Usage (verified from tool responses)
- **ElevenLabs:** 1,516.8 credits
  - eleven_v4 TTS, 1 take: 1,506.8 (estimate before approval: ~1,510 for 1,507 chars)
  - SFX v2 × 2, 1 take each: 6.7 + 3.3 = 10.0 (estimate ~10)
  - Music: 0 (reused) · Scribe: 0
- **Higgsfield:** 0 credits

## Day total (verified)
- **ElevenLabs:** 1,641.2 + 1,516.8 = **3,158.0 credits**
- **Higgsfield:** 0 credits
