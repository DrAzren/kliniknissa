# Daily production report — 2026-11-11
Batch scope: one video requested by the user ("Asma": storytelling hook of a young man short of breath, what asthma is, risk factors, prevention), same concept as the "Jenis-jenis Halusinasi" reel. Credit estimate was reported and approved before any generation.

## Video 1 — VIDEO_01_GENERAL_HEALTH
- **Topic:** Kenali Asma. Hook: illustrative story of "Amir" (22), who wakes at 2 a.m. with a tight chest and wheezing and is taken to hospital. Then: what asthma is (airways swell, narrow, fill with mucus), symptoms, 4 risk factors, how to control it, emergency signs, CTA.
- **Concept:** SVG animation drawn in code (Remotion, `animasi/`, topic `kenali-asma`), Violet Flat style, Dr. Azren avatar as the explainer. 15 scenes; see `storyboard.md`.
- **Voice:** Dr Azren (ElevenLabs cloned voice `lN6exnzhuXDOyNQfsVSR`, model `eleven_v4`). **One generation only**, at the user's request. Raw take 78.4 s, used as-is with 1.05× tempo (74.63 s). Raw take kept in `work/asma/take_raw.mp3`. The Scribe transcript matches the script word for word.
- **Video file:** `VIDEO_01_GENERAL_HEALTH/final_video.mp4` (1080×1920, 30 fps, H.264 8.5 Mbps + AAC 48 kHz, 75.14 s, 79.5 MB, −14.1 LUFS).
- **Thumbnail:** `thumbnail.png` / `.jpg` (1080×1920), from `animasi/src/topics/kenali-asma/Cover.tsx`.
- **Captions:** Facebook, Instagram, TikTok, a short all-platform caption and `description.txt`. No hashtags.
- **Medical review:** PENDING. See `medical_references.md` (7 claims, 5 items flagged; source pages were not re-opened in this session).
- **Approval status:** REVIEW-READY. Not scheduled.

## Usage (verified from tool responses)
- **ElevenLabs:** 1,191.9 credits
  - eleven_v4 TTS, 1 take, 1,192 characters = 1,191.88
  - Scribe transcription (word timings) = 0
  - Music and SFX reused from the Halusinasi reel (no new spend)
- **Higgsfield:** 0 credits (nothing generated; animation rendered locally)
- ElevenLabs flow: https://elevenlabs.io/app/flows/gpvDHk8NcjrFbGcMndFX

## Rebuild
`cd animasi && npm ci && npm run render -- --topic=kenali-asma --avatar=dr-azren`

## Outstanding approvals
1. Doctor medical-accuracy sign-off (`medical_references.md` checklist).
2. Carried over: WhatsApp 012-608 1411 confirmation, MAB/KKLIU status for the clinic-service CTA, voice-clone authorisation.
3. Scheduling: no instruction given yet.
