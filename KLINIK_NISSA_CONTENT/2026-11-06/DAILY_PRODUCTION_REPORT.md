# Daily production report — 2026-11-06
Batch scope: one video requested by the user ("Apa terjadi kepada dunia jika tiada kesihatan mental").

## Video 1 — VIDEO_01_MENTAL_HEALTH
- **Topic:** Apa jadi kepada dunia kalau tiada kesihatan mental? Five effects (city, economy, relationships, loneliness, body), then "BOLEH dijaga, BOLEH dirawat" and see a doctor if unwell for over 2 weeks
- **Production:** new reusable Remotion system `animasi/`. All visuals are SVG drawn in code (Violet Flat style), with no AI imagery and no paid video service. New reusable avatar preset `dr-azren` (based on the reference photo), see `animasi/config/dr-azren-avatar-sheet.png`
- **Voice:** Dr Azren (ElevenLabs `lN6exnzhuXDOyNQfsVSR`, `eleven_v4`), 1 take, 50.60 s. Scribe transcript matches the script word for word, and the emotion tags were not read aloud
- **Duration:** 51.10 s (voice + 0.5 s)
- **Files:** `final_video.mp4` (1080×1920, 30 fps, H.264 8.3 Mbps, AAC 48 kHz, −14.0 LUFS, true peak −2.4 dB), `final_video_cover_intro.mp4` (thumbnail as the first 0.5 s, for picking the TikTok cover frame), `thumbnail.png`, `voiceover.mp3`, captions, storyboard, medical references
- **Medical review:** PENDING (`medical_references.md`)
- **Approval status:** SCHEDULED at the user's request on Metricool (post 419648783) for 2026-11-07 12:00 MYT on FB Reel, IG Reel and TikTok. Medical review still pending.

## Usage (verified from tool responses)
- **ElevenLabs:** 855 credits (eleven_v4 TTS, 1 take, approved by the user). Scribe transcription 0 credits
- **Higgsfield:** 0

## Notes
- The user asked to remove "Spread Positivity". The end card and thumbnail show only "Dr. Azren".
- No ELEVENLABS_API_KEY in this cloud session, so the voice was generated via the ElevenLabs connector (Flows). `npm run voice` uses the API with a key from `.env` when it is run on your own computer.
