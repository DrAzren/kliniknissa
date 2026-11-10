# Daily production report — 2026-11-10
Batch scope: one video requested by the user ("Jenis-jenis halusinasi", opening with a storytelling hook, plus thumbnail and a simple description). The other daily slots were not produced.

## Video 1 — VIDEO_01_MENTAL_HEALTH
- **Topic:** Jenis-jenis halusinasi. Hook: an illustrative story of "Pakcik Hamid", who sees three small children in his living room every night. His family suspects the house is haunted, but the cause turns out to be his eyes (Charles Bonnet syndrome). The video then covers the definition, the 5 sensory types, causes, normal sleep-related hallucinations, red flags and the CTA.
- **Voice:** Dr Azren (ElevenLabs cloned voice `lN6exnzhuXDOyNQfsVSR`, model `eleven_v4`). **One generation only**, at the user's request. The take was used as-is (raw 75.7 s; tightened to 70.7 s with pause compression and 1.05× tempo).
- **Duration:** 72.89 s (narration 70.7 s + end card)
- **Video file:** `VIDEO_01_MENTAL_HEALTH/final_video.mp4` (1080×1920, 30 fps, H.264 + AAC 48 kHz, 28.0 MB). Same file also saved as `2026-11-10_slot1_mental-health_jenis-halusinasi.mp4`.
- **Thumbnail:** `thumbnail.png` (1080×1920) + `thumbnail.jpg`. Headline "JENIS-JENIS HALUSINASI" and pill "NAMPAK BENDA YANG TIADA?" over the hook scene, checked against the 3:4 grid crop.
- **Description:** `description.txt` (simple, 3 short paragraphs). Platform captions: Facebook, Instagram, TikTok, and a short all-platform caption. No hashtags.
- **Medical review:** PENDING. See `medical_references.md` (6 claims with sources, 5 items flagged for the doctor).
- **Approval status:** REVIEW-READY. Not approved, not scheduled.

## Usage (verified from tool responses)
- **Higgsfield:** 13.00 credits (13.31 → 0.31)
  - 12 stills `gpt_image_2_5` = 3.00
  - 2 image-to-video clips `grok_video_v15_lite` 720p (6 s + 4 s) = 10.00
- **ElevenLabs:** ≈ 1,157 credits
  - eleven_v4 TTS: 1 take = 1,156.9
  - Scribe transcription (word timings) = 0
  - Music and SFX were reused from the 2026-11-04 batch (no new spend)

## Production notes
- **Low Higgsfield balance:** only 13.31 credits were available, so only the two key hook scenes are true image-to-video animation. The other 10 scenes are 3D stills with eased Ken Burns zoom/pan plus GSAP motion graphics, and one doctor clip is reused from 2026-11-04. Higgsfield is now at about 0 credits, so the next video needs a top-up for full animation.
- **Sense icons:** the five round icons (ear, eye, hand, nose, tongue) are cropped from scene still s04, so they match the visual style without extra generations.
- **Honesty labels:** "Kisah ilustrasi" is shown on screen during the story, and the end card and all captions say that Pakcik Hamid is an illustration.

## Outstanding approvals
1. Doctor medical-accuracy sign-off (`medical_references.md` checklist).
2. Carried over: WhatsApp 012-608 1411 confirmation, MAB/KKLIU status for the clinic-service CTA, voice-clone authorisation.
3. Scheduling instruction (not requested in this batch).
