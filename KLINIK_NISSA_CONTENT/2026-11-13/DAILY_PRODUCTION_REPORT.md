# Daily production report: 2026-11-13
Batch scope: one video. The user chose idea A (OCD) from the three ideas proposed on 12 Nov and asked for the Dr Azren voice with **one ElevenLabs generation only** to save credits. The B and C slots were not produced.

## Video 1: VIDEO_01_MENTAL_HEALTH
- **Topic:** Suka kemas = OCD? Belum tentu. Obsessions vs compulsions, the cycle, how OCD differs from liking tidiness, treatment (CBT/ERP + medication)
- **Voice:** Dr Azren (ElevenLabs cloned voice `lN6exnzhuXDOyNQfsVSR`, model `eleven_v4`), **1 take** (`generations_count: 1`), used as is. No retakes.
- **Duration:** 73.06 s (narration 70.7 s + end card)
- **Video file:** `VIDEO_01_MENTAL_HEALTH/final_video.mp4` (1080×1920, 30 fps, H.264 + AAC 48 kHz). The same file is saved as `2026-11-13_slot1_mental-health_ocd-suka-kemas.mp4`.
- **Thumbnail:** `thumbnail.png` (1080×1920) + `thumbnail.jpg`. Headline "SUKA KEMAS = OCD?", pill "BELUM TENTU!"
- **Captions:** Facebook, Instagram, TikTok, plus a short all-platform version. No hashtags.
- **Medical review:** PENDING. See `medical_references.md` (5 claims checked; 5 items flagged for the doctor).
- **Approval status:** REVIEW-READY. Not approved, not scheduled.

## Usage (verified from tool responses)
- **Higgsfield:** 75.00 credits (480.81 → 405.81)
  - 12 stills `gpt_image_2_5` @ 0.25 = 3.00
  - 12 image-to-video clips `grok_video_v15_lite` 720p, 72 s total @ 1 credit/s = 72.00
- **ElevenLabs:** ≈ 1,535 credits
  - eleven_v4 TTS, 1 take = 1,115.9
  - Scribe transcription for word timings = 419.3 (on 4 Nov the narration transcriptions showed 0, but this time it was charged)
  - Music and SFX: none generated. The 4 Nov music bed, whoosh and pop were reused.

## Pipeline
Sources and scripts are in `work/2026-11-13_ocd/`. Rebuild order (from that folder):
`build_timing.py → build_base.py → build_subs.py → (cp timeline_scenes.json render/scenes.json) → node scripts/render_overlay.js video_noaudio.mp4 → mix_audio.py → scripts/finalize.sh`

## Outstanding approvals
1. Doctor medical-accuracy sign-off (`medical_references.md` checklist).
2. WhatsApp number 012-608 1411 confirmation (carried over from 4 Nov).
3. Advertising compliance (MAB/KKLIU) for the clinic-service CTA.
4. Voice-clone authorisation for "Dr Azren".

## Calendar note
OCD was the 12 Nov A-slot topic and was produced on 13 Nov. The 5–11 Nov topics and the 13 Nov A topic (Stres kerja & badan) remain unproduced.
