# Daily production report — 2026-11-17 (branch `claude/upbeat-wozniak-5k7bfp`)
Three animated videos in the same concept as the previous batches (Remotion `animasi/`, Violet Flat SVG, avatar `dr-azren`, hook → story → diagnosis → #1–#5 → recovery → "jangan tunggu… saya Doktor Azren"). Topics checked against every branch (25 earlier topics) so none repeat. User approved **option A+**: new voice (1 take each) + 2 new short SFX; music reused from `jenis-nyamuk`; siren reused from `strok`. No helpline line. **No clinic CTA.** **Scheduled** on Metricool at the user's request (see below).

Shared code: `animasi/src/topics/_kit/kit.tsx` gained 10 icons (chili, burger, coffee, keys, checklist, bell, cart, camera, recovery position, reflux). Topics registered in `src/topics/index.ts`.

## Video 1 — VIDEO_01_KESIHATAN_REFLUKS_ASID (`refluks-asid`)
- **Topic:** "Dada Panas Lepas Makan? Mungkin Refluks Asid". Story: Amir (36, bank officer, fictional) eats late, drinks coffee, lies down after; burning chest, sour taste, night cough → doctor rules out heart → acid reflux. #1 signs, #2 triggers, #3 don't lie down (no food 2–3 h before bed, raise bed head), #4 medicine (no self-medicating painkillers), #5 alarm signs. Safety reminder: chest pain spreading to arm/jaw with breathlessness and sweating → 999. Amir sleeps well.
- **Voice:** 1 take, 97.04 s (generation `4D5eluTbPCDTnbNhatYr`).
- **Duration / tech:** 97.60 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (101.5 MB → 80.7 MB), AAC 48 kHz, −14.2 LUFS, TP −1.1 dB.
- **SFX:** acid fizz (**new**, 2 s, −20 LUFS) ×2; sting ×2, pop on #1–#5, chime, whoosh (reused).
- **Medical review:** PENDING (ACG 2022; NICE CG184; NSAID claim flagged).

## Video 2 — VIDEO_02_MENTAL_HEALTH_ADHD_DEWASA (`adhd-dewasa`)
- **Topic:** "Bukan Malas, Mungkin ADHD". Story: Danial (27, graphic designer, fictional) misses deadlines, drifts off in meetings, interrupts, impulse-buys; warned by boss for the third time → assessment incl. childhood history → adult ADHD. #1 poor focus, #2 restlessness, #3 impulsivity, #4 began in childhood (everyone forgets sometimes), #5 treatment (medication, therapy, lists, reminders). Danial finishes projects on time.
- **Voice:** 1 take, 87.44 s (generation `FUDRvt758pSOeB1QaJkv`). "ADHD" kept as letters.
- **Duration / tech:** 88.00 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (93.7 MB → 71.8 MB), AAC 48 kHz, −14.3 LUFS, TP −1.2 dB.
- **SFX:** keys + phone ping (**new**, 2 s, −20 LUFS); slap, sting, pop on #1–#5, chime, whoosh (reused).
- **Medical review:** PENDING (NICE NG87; DSM-5-TR; Malaysian referral pathway and medication availability flagged).

## Video 3 — VIDEO_03_KANAK_KANAK_SAWAN_DEMAM (`sawan-demam`)
- **Topic:** "Anak Kejang Ketika Demam: Apa Perlu Buat?". Story: Adam (18 months, fictional) has a fever, stiffens and jerks in his mother's arms; she panics and tries to put a spoon in his mouth (shown as WRONG); seizure stops in 2 minutes → hospital → febrile seizure. #1 safe place + side position, #2 nothing in the mouth / don't restrain, #3 time it, film it, #4 call 999 if > 5 min / breathing difficulty / not waking, #5 hospital after first seizure. Reassurance: usually stops by itself, no brain damage, not epilepsy, may recur with fever.
- **Voice:** 1 take, 84.48 s (generation `OamXiLj2SirE1Hgb01O2`).
- **Duration / tech:** 85.03 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (88.5 MB → 70.0 MB), AAC 48 kHz, **−15.1 LUFS**, TP −1.1 dB (the "urgent" voice opening peaks at +0.3 dB before gain, so gain-only could not reach −14 LUFS).
- **SFX:** siren (reused from `strok`, 0 credits); sting ×2, pop on #1–#5, chime, whoosh (reused).
- **Medical review:** PENDING (DFTB; SCHN handbook; NICE CKS; "nothing in the mouth" flagged for source).

## Files per video
`final_video.mp4`, `thumbnail.png` + `.jpg`, `voiceover.mp3`, `music.mp3` (reused), `sfx_*.mp3` (new SFX, normalised), `narration_script.txt`, `caption_facebook.txt`, `caption_instagram.txt`, `caption_tiktok.txt` (no hashtags), `storyboard.md`, `medical_references.md`, `schedule_status.json`.

## Usage (verified from tool responses)
- **ElevenLabs:** **4,570.9 credits** (estimate before approval: ~4,572)
  - eleven_v4 TTS, 1 take each: 1,616.8 (refluks) + 1,448.9 (ADHD) + 1,491.9 (sawan) = 4,557.6
  - eleven_text_to_sound_v2, 2 s, 1 take each: 6.7 (acid) + 6.7 (keys) = 13.3
  - Estimate-only calls: 0 · Scribe ×3: 0 · Music: 0 (reused) · Siren: 0 (reused)
  - ElevenLabs Flow: `eWWyeKlaLbyFmpCDzvwq`
- **Higgsfield:** 0 credits

## Notes
- Pronunciation could not be checked automatically. Please listen for: refluks, televisyen, ADHD, hiperaktif, impulsif, sawan, epilepsi, "sembilan sembilan sembilan".

## Scheduling (Metricool, brand Klinik Nissa, Asia/Kuala_Lumpur)
Requested 2026-11-17 ~09:30: "jadualkan ke metricool. pilih 3 waktu terbaik" → "hari ini". Facebook Reel + Instagram Reel (shown on feed) + TikTok (public), auto-publish, caption = `caption_instagram.txt`. AI-generated label OFF (IG `isAiGenerated`, TikTok `isAigc`), commercial content OFF (TikTok own brand / third party), TikTok auto-music OFF. Made-for-kids: not applicable (no YouTube on this brand).

| Time (MYT) | Video | Metricool post id | Why this slot |
|---|---|---|---|
| Tue 17 Nov 12:40 | VIDEO_01 Refluks Asid | 430894968 | Lunch: FB 12:00 peak, TikTok 12:00; topic about eating |
| Tue 17 Nov 18:10 | VIDEO_03 Sawan Demam | 430895791 | After work: FB 16–18, TikTok 18:00 peak, IG 17:47; parents at home |
| Tue 17 Nov 20:40 | VIDEO_02 ADHD Dewasa | 430895877 | Night: IG 20:51 peak, TikTok 19:00+; adults relaxing |

Media uploaded to the user's Higgsfield storage (free `media_upload`, 0 credits) for public URLs; Metricool copied them to its own storage. Medical review is still pending: please check before 12:40.
