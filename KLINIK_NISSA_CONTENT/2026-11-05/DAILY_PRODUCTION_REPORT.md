# Daily production report — 2026-11-05
Batch scope: one video requested by the user. Gout, in a new **3D animated host format**: a Dr Aminah character acts and talks to camera, replacing the earlier compilation-of-clips style. The other daily slots were not produced.

## Video 1 — VIDEO_01_GOUT
- **Topic:** Gout: kenapa ibu jari kaki tiba-tiba bengkak? Covers the cause (urate crystals), inflammation, risk factors, what to do in a flare, long-term treatment target, comorbidity screening, and a clinic CTA.
- **Format:** 3D Pixar-style host **Dr Aminah** (5 lip-synced talking scenes) plus recurring patient **Pak Cik Hamid** (4 animated cutaways).
- **Voice:** Dr Aminah (ElevenLabs cloned voice `uFdZbpnXsSJhPEhajxEx`, model **`eleven_v4`**), 9 segments × 2 takes. Takes were chosen after a Whisper transcription check: A2 B2 C1 D2 E2 F1 G1 H1 I2. The user approved the script before rendering.
- **Duration:** 85.98 s (narration 81.4 s + 4.6 s end card), 1080×1920, 30 fps, H.264 + AAC 48 kHz.
- **Files:** `final_video.mp4` (same file also saved as `2026-11-05_slot1_gout_dr-aminah-3d.mp4`), `thumbnail.png/.jpg`, `voiceover.mp3`, `narration_script.txt`, `caption_{facebook,instagram,tiktok}.txt`, `storyboard.md`, `medical_references.md`, `schedule_status.json`.
- **ElevenLabs flow (all sources, editable):** https://elevenlabs.io/app/flows/3YTUs0X9dujoPwm8ROoJ
- **Medical review:** PENDING. 9 claims verified against CPG KKM *Management of Gout* (2nd Ed., 2021); 6 items flagged for the doctor.
- **Approval status:** REVIEW-READY. Not approved, not scheduled.

## Usage (from tool responses)
**ElevenLabs: ≈ 61,711 credits (≈ US$11.22)**
| Item | Model | Credits |
|---|---|---|
| Character designs (8 × 2K) | gemini-3-pro-image | 9,743.5 |
| Narration, 9 segments × 2 takes | eleven_v4 | 2,403.8 |
| Scene stills (9 × 1K, with character references) | gemini-3.1-flash-image | 5,480.7 |
| Lip-sync, 5 talking scenes (52 s, 768p) | minimax-h3-max-lipsync | 25,691.8 |
| Cutaways, 4 × 10 s | kling-2.5-turbo | 16,966.3 |
| Music bed, 95 s instrumental | eleven_music_v2_5 | 1,424.7 |

**Higgsfield:** 0 credits (balance still 13.31). One audio file and one image were uploaded only to get a price quote.
Pricing notes for future videos: Seedance 2.5 on ElevenLabs costs ~25k credits per 9 s clip, so it was avoided. Higgsfield Intone lip-sync costs ~7 credits/s (720p) or ~16 credits/s (1080p), and Kling 3.0 costs 15–17.5 credits per 10 s. Higgsfield works out at ~US$24–50 per video at top-up prices.

## Tool notes
- Subtitles are word-aligned with local faster-whisper (no credit cost). Overlay is HTML + GSAP rendered with Playwright, as in the previous batch.
- Pipeline is reusable for future Dr Aminah videos: `work_gout/scripts/build_timeline.py → build_subs.py → render_overlay.js → mix_audio.py → finalize.sh`.

## Outstanding approvals
1. Doctor medical-accuracy sign-off (`medical_references.md` checklist).
2. Consent from Dr Aminah for her voice clone, name and 3D likeness.
3. Confirm that 012-608 1411 is the clinic's WhatsApp line.
4. Advertising compliance (KKLIU / Medicine Advertisements Board) for the clinic-service CTA.
5. Add an AI-generated content label when posting.
