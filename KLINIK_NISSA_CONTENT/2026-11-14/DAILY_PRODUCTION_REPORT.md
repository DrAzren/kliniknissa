# Daily production report — 2026-11-14
Batch scope: three animated videos in the same concept as Bipolar / Eczema / Jenis Nyamuk (Remotion `animasi/`, Violet Flat SVG, avatar `dr-azren`, storytelling hook → doctor → diagnosis → #1–#5 → recovery → "jangan tunggu… saya Doktor Azren"). Topics picked after the user rejected topics already posted (diabetes, diabetes & depression, leptospirosis, gout). The user approved **option A**: new voice + 2 new SFX, background music **reused** from `jenis-nyamuk` (no new music generation). **No clinic CTA.** Not scheduled on Metricool.

Shared new code: `animasi/src/topics/kit.tsx` (scene helpers, ~50 new SVG icons, clinic background, standard "5 perkara" and closing scenes, top shade for light backgrounds). Story characters are defined in each topic's `scenes.tsx`; Dr. Azren's drawing is unchanged.

## Video 1 — VIDEO_01_SLEEP_APNEA (`dengkur-sleep-apnea`)
- **Topic:** "Dengkur Kuat Bukan Tanda Tidur Nyenyak". Hook: loud snoring, then 10 s silence. Story: Encik Zul (42, fictional) snores, his wife films him stopping breathing and jolting awake, he is sleepy by day and nearly falls asleep driving → screening + sleep test → obstructive sleep apnoea. #1 airway closes (cross-section animation, O₂ falls, brain wakes), #2 signs, #3 risk factors, #4 risks if untreated, #5 treatment (weight, no smoking, side sleeping, CPAP). Zul sleeps with CPAP, wakes fresh.
- **Voice:** Dr Azren (`lN6exnzhuXDOyNQfsVSR`, `eleven_v4`, emotion tags), **1 take**, 101.28 s. Pronunciation spellings: "ap-nea", "si-pap" (captions show apnea / CPAP). Scribe word timings.
- **Duration / tech:** 101.84 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (render was 102.8 MB > 95 MB), AAC 48 kHz, −14.1 LUFS, TP −1.4 dB.
- **SFX:** snore (**new**, 3 s, normalised to −20 LUFS), sting, slap, chime, whoosh on cuts, pop on #1–#5 (reused).
- **Medical review:** PENDING (`medical_references.md`; MOH CPG OSA 2022/2024 + NICE NG202).

## Video 2 — VIDEO_02_MENTAL_HEALTH_PANIK (`serangan-panik`)
- **Topic:** "Ingat Serangan Jantung, Rupanya Serangan Panik". Story: Aina (24, fictional) on a crowded LRT: palpitations, breathless, shaking, sweating → thinks heart attack → clinic, ECG normal → panic attack. #1 signs (peak within minutes), #2 why (false alarm, adrenaline), #3 first-time chest pain must be checked first, #4 slow breathing + 5-4-3 grounding, #5 recurrent attacks = panic disorder, CBT ± medication. Aina rides the LRT calmly again.
- **Voice:** 1 take, 91.44 s. "E-C-G" spelled out (caption: ECG).
- **Duration / tech:** 92.01 s, 1080×1920, 30 fps, H.264 ~7.8 Mbps (90.1 MB, no re-encode needed), AAC 48 kHz, **−16.0 LUFS**, TP −1.1 dB. This take is quieter than the others (voice alone −18.4 LUFS with peaks at −1.1 dB), so gain-only mixing cannot reach −14 LUFS without a limiter.
- **SFX:** heartbeat (**new**, 3 s, −20 LUFS), sting, chime, whoosh, pop.
- **Medical review:** PENDING. **No MOH Malaysia CPG for panic disorder**, so the video relies on NICE CG113 + the Singapore MOH Anxiety CPG.

## Video 3 — VIDEO_03_BATU_KARANG (`batu-karang`)
- **Topic:** "Sakit Pinggang Sampai Berpeluh? Mungkin Batu Karang". Story: Danial (35, AC technician, fictional) works on hot roofs and drinks little → colicky flank pain, vomiting, red urine → urine test + imaging → kidney stone. #1 how stones form, #2 main signs, #3 danger signs → emergency department, #4 small stones pass vs large stones (urologist), #5 prevention (2.5–3 L water/day, clear urine, less salt, red meat, sugary drinks). The stone passes; he now carries a water bottle.
- **Voice:** 1 take, 89.52 s.
- **Duration / tech:** 90.07 s, 1080×1920, 30 fps, H.264 ~8.0 Mbps (89.7 MB, no re-encode needed), AAC 48 kHz, −14.7 LUFS, TP −1.0 dB.
- **SFX:** all reused (sting, slap, chime, whoosh, pop). No new SFX.
- **Medical review:** PENDING. **No dedicated MOH CPG**, so the video relies on NICE NG118 + EAU Urolithiasis.

## Files (each folder)
`final_video.mp4`, `thumbnail.png/.jpg`, `voiceover.mp3`, `music.mp3` (reused jenis-nyamuk track), `narration_script.txt`, `caption_facebook.txt`, `caption_instagram.txt`, `caption_tiktok.txt` (no hashtags), `storyboard.md`, `medical_references.md`, `schedule_status.json` (READY_NOT_SCHEDULED).

## Usage (actual, from tool responses)
- **ElevenLabs: 4,722.5 credits** (estimate before approval, option A: ≈ 4,720)
  - eleven_v4 TTS, 1 take each: 1,633.8 (sleep apnea) + 1,529.8 (panic) + 1,538.8 (kidney stone) = **4,702.5**
  - SFX eleven_text_to_sound_v2, 3 s, 1 take each: 10.0 (snore) + 10.0 (heartbeat) = **20.0**
  - Music: **0** (reused `jenis-nyamuk/music.mp3`, 107 s, covers all three videos)
  - Scribe transcription × 3: **0**
- **Higgsfield: 0 credits** (nothing generated, nothing uploaded)
- ElevenLabs flows: iOVYEwXSjE3dRpYT5uFv (sleep apnea), YcWeHisKSxdFujq1L6T4 (panic), EC91pfxOt13QUIhVhscl (kidney stone).

## Open items
- Doctor review of the three `medical_references.md` files (items marked **Check**).
- Listen-through of each voice take for pronunciation (only 1 take each): "ap-nea", "obstruktif", "si-pap", "LRT", "E-C-G", "Adrenalin", "urologi", "milimeter".
- Publishing: not scheduled (awaiting the user's instruction).
