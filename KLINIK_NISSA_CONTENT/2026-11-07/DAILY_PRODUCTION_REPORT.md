# Daily production report — 2026-11-07
Batch scope: one video requested by the user ("Kenali Bipolar Mood Disorder", storytelling first).

## Video 1 — VIDEO_01_MENTAL_HEALTH_BIPOLAR
- **Topic:** Kenali Bipolar Mood Disorder. Story: Aina (24, fictional) shops every day for a week, credit card nearly maxed, sleeps 2 hours but full of energy, talks fast, irritable; parents worry, take her to the doctor; diagnosis Bipolar Mood Disorder. Then Dr. Azren explains the two poles (mania ≥1 week, depression ≥2 weeks), "shopping alone ≠ bipolar", treatment, CTA Klinik Nissa Nilai.
- **Production:** `animasi/` Remotion system (Violet Flat SVG), topic `kenali-bipolar`, avatar preset `dr-azren` (the avatar sheet the user sent). New story characters Aina, Mak, Ayah drawn with the same `<Avatar>` component (new `hair: "hijab"` and `moustache` options; Dr. Azren's drawing is unchanged).
- **Voice:** Dr Azren (ElevenLabs `lN6exnzhuXDOyNQfsVSR`, `eleven_v4`, emotion tags), take A of 2 (88.11 s). Scribe word timings; emotion tags not read aloud.
- **Duration:** 88.61 s (voice + 0.5 s)
- **Files:** `final_video.mp4`, `thumbnail.png`, `voiceover.mp3`, captions, storyboard, medical references
- **Medical review:** PENDING (`medical_references.md`, 2 items flagged)
- **Approval status:** REVIEW-READY. Not scheduled.

## Usage (verified from tool responses)
- **ElevenLabs:** ≈ 4,228 credits
  - eleven_v4 TTS, 2 takes × 1,490.9 = 2,981.7
  - 4 images (2 × 432.8 + 2 × 190.4 = 1,246.3) generated for a 3D avatar direction **before** the user sent the flat avatar sheet. Not used in the video.
  - Scribe transcription 0
- **Higgsfield:** 0 credits (one free media upload used as a reference URL)

## Notes
- The first search for "avatar.azrin" (Higgsfield, ElevenLabs, Drive) found nothing; the avatar is the `dr-azren` preset in `animasi/` (from branch `claude/focused-curie-tc5e9f`), now brought into this branch.
- No background music, same as the previous animated episode.
