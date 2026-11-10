# Daily production report — 2026-11-09
Batch scope: one video requested by the user ("Kenali eczema", storytelling hook: 6-year-old child, then doctor explains signs, risk factors and prevention; same animation concept as the Bipolar video; max 90 s; Dr Azren voice eleven_v4 with emotion; 1 generation only).

## Video 1 — VIDEO_01_KULIT_ECZEMA
- **Topic:** Kenali Eczema. Story: Naufal (6, fictional) suddenly gets red, dry patches in elbow creases and behind the knees, itching so badly he scratches until it bleeds and can't sleep; Ibu tries soaps and creams, it gets worse, she takes him to the doctor; diagnosis atopic eczema. Dr. Azren explains what eczema is (weak skin barrier, not contagious), signs, risk factors and triggers, and prevention/care steps. Closes "jangan tunggu, dapatkan rawatan awal, saya Doktor Azren". **No clinic CTA** (same as Bipolar).
- **Production:** `animasi/` Remotion system (Violet Flat SVG), topic `kenali-eczema`, avatar preset `dr-azren`. New story characters Naufal and Ibu drawn with the same `<Avatar>` component; eczema patches are an overlay (Dr. Azren's drawing is unchanged).
- **Voice:** Dr Azren (ElevenLabs `lN6exnzhuXDOyNQfsVSR`, `eleven_v4`, emotion tags), **1 take only** (user request), 87.25 s. Name changed Adam → Naufal before generation (user request). "eczema" written "ekzema" in the voice text; captions show "eczema". Scribe word timings.
- **Duration:** 87.77 s (voice + 0.5 s), under the 90 s limit. 1080×1920, 30 fps, H.264 8 Mbps, AAC 48 kHz, −14.0 LUFS, true peak −1.3 dB.
- **Files:** `final_video.mp4`, `thumbnail.png/.jpg`, `voiceover.mp3`, captions, storyboard, medical references
- **Medical review:** PENDING (`medical_references.md`, 2 items flagged)
- **Approval status:** REVIEW-READY. Not scheduled.

## Usage (verified from tool responses)
- **ElevenLabs:** 1,439.9 credits
  - eleven_v4 TTS, 1 take × 1,439.9 (estimate before approval: 1,431.9 for the "Adam" version; +8 characters for "Naufal")
  - Scribe transcription 0
- **Higgsfield:** 0 credits

## Video 2 — VIDEO_02_JENIS_NYAMUK
- **Topic:** Jenis-jenis nyamuk di Malaysia dan kesannya. Hook: "Haiwan paling berbahaya di dunia… bukan harimau, bukan buaya, bukan ular. Tapi nyamuk." Story: Hafiz (fictional) gets bitten at the park, "Alah, nyamuk je", 5 days later fever and joint pain, diagnosed with dengue. Dr. Azren then explains 4 types: Aedes, Culex, Anopheles and Mansonia (look, biting time, breeding site, disease), then prevention (10 minutes a week to search and destroy, long sleeves, repellent, bed nets, window screens). Hafiz recovers thanks to early treatment. Closes "jangan tunggu, dapatkan rawatan segera, saya Doktor Azren". **No clinic CTA.**
- **Production:** `animasi/` Remotion (Violet Flat SVG), topic `jenis-nyamuk`, avatar `dr-azren`; new `<Mosquito>` component (4 species) and story characters Hafiz, his child and wife. **New:** optional `audio` block in `script.json` (background music + SFX cued to words + whoosh on scene cuts), supported by `src/Video.tsx` for every topic.
- **Voice:** Dr Azren (`lN6exnzhuXDOyNQfsVSR`, `eleven_v4`, emotion tags), **1 take only**, 105.68 s. Scribe word timings.
- **Music & SFX (new for this series):** ElevenLabs Music v2.5 instrumental, 107 s, 1 take; 4 SFX (mosquito buzz, slap, suspense sting, chime), 1 take each; whoosh and pop reused from `work/audio`.
- **Duration:** 106.24 s (voice + 0.5 s), 1080×1920, 30 fps, H.264 6.4 Mbps (2-pass re-encode of the 8 Mbps render to stay under GitHub’s 100 MB limit, 87.7 MB), AAC 48 kHz, −15.0 LUFS, true peak −1.3 dB (gain-only; the slap/whoosh peaks stop it reaching −14 LUFS without a limiter). Longer than the 87 s eczema video because of the 4-type format.
- **Files:** `final_video.mp4`, `thumbnail.png/.jpg`, `voiceover.mp3`, `music.mp3`, captions, storyboard, medical references
- **Medical review:** PENDING (`medical_references.md`, 3 items flagged: JE vector, malaria in Malaysia, Mansonia/filariasis)
- **Approval status:** REVIEW-READY. Not scheduled.

### Usage (verified from tool responses)
- **ElevenLabs:** 3,318.8 credits
  - eleven_v4 TTS, 1 take: 1,685.8 (estimate before approval: ~1,690)
  - Music v2.5, 107 s, 1 take: 1,604.6 (estimate: ~1,330; actual rate ≈ 15.0 credits/s)
  - SFX × 4, 1 take each: 10.0 + 3.3 + 8.3 + 6.7 = 28.3
  - Scribe transcription: 0
- **Higgsfield:** 0 credits

## Video 3 — VIDEO_03_MENTAL_HEALTH_BPD
- **Topic:** Kenali Borderline Personality Disorder (BPD). Hook: "Pagi tadi, Sofea kata Danial lelaki paling sempurna… Malam ini, dia menjerit 'Aku benci kau!'… Umurnya baru 20 tahun." Story: Sofea (20, fictional) panics when Danial is 10 minutes late replying (20 messages, 5 calls), mood swings within hours (happy, angry, empty), friends drift away; her sister takes her to the doctor; diagnosis BPD. Dr. Azren explains what BPD is ("bukan drama, bukan sengaja cari perhatian"), 5 main signs, causes, treatment (psychotherapy such as DBT), and that many improve over time. Sofea, a year later, calmer and not alone. Closes "jangan tunggu, dapatkan bantuan profesional, saya Doktor Azren". **No clinic CTA. No helpline** (user decision, although sign #4 mentions self-harm; flagged in `medical_references.md`).
- **Production:** `animasi/` Remotion (Violet Flat SVG), topic `kenali-bpd`, avatar `dr-azren`, same concept as `jenis-nyamuk`. 17 scenes; new story characters Sofea, Danial, kakak and 2 friends; new flat icons (cracking heart, chat phone, mood faces, mood gauge, DNA/brain/teddy, DBT skills).
- **Voice:** Dr Azren (`lN6exnzhuXDOyNQfsVSR`, `eleven_v4`, emotion tags), **1 take only**, 107.44 s. Scribe word timings.
- **Music & SFX:** ElevenLabs Music v2.5 instrumental, **60 s, 1 take, crossfade-looped to 117 s** (user choice to save credits). 4 new SFX (glass crack, heartbeat, message pings, empty drone), 1 take each, normalised to −20 LUFS; whoosh, pop, sting and chime reused from `jenis-nyamuk`.
- **Duration:** 108.01 s (voice + 0.5 s), 1080×1920, 30 fps, H.264 6.4 Mbps (2-pass re-encode of the 8 Mbps render to stay under GitHub's 100 MB limit, 89.4 MB), AAC 48 kHz, −15.0 LUFS, true peak −1.0 dB (gain only; heartbeat and glass-crack levels were lowered once so the mix reaches −15).
- **Files:** `final_video.mp4`, `thumbnail.png/.jpg`, `voiceover.mp3`, `music.mp3`, captions, storyboard, medical references
- **Medical review:** PENDING (`medical_references.md`, 3 items flagged: no helpline with self-harm mention, "5 tanda utama" vs 9 DSM criteria, simplified causes)
- **Approval status:** SCHEDULED at the user's request (medical review still pending). Metricool post 422761007, **10 Nov 2026 14:00 MYT**, Facebook Reel + Instagram Reel (AI label) + TikTok (AIGC label), custom thumbnail, short caption (`caption_scheduled_all_platforms.txt`).

### Usage (verified from tool responses)
- **ElevenLabs:** 2,670.9 credits (estimate given before approval: ~2,670-2,690 with 60 s looped music)
  - eleven_v4 TTS, 1 take: 1,737.8
  - Music v2.5, 60 s, 1 take: 899.8 (the pre-run estimator quoted 1,650; actual followed ≈15 credits/s)
  - SFX × 4, 1 take each: 8.3 + 10.0 + 5.0 + 10.0 = 33.3
  - Scribe transcription: 0
- **Higgsfield:** 0 credits
