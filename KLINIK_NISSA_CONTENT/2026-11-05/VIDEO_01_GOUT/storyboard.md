# Storyboard — Gout: kenapa ibu jari kaki tiba-tiba bengkak? (86.0 s, 1080×1920, 30 fps)
Format: 3D animated host-led explainer. **Dr Aminah** (3D Pixar-style Klinik Nissa doctor) talks to camera with lip-sync. A recurring patient character, **Pak Cik Hamid**, acts out the story in cutaways.
Pipeline (all ElevenLabs): character designs `gemini-3-pro-image` → scene stills `gemini-3.1-flash-image` with the character references → lip-sync `minimax-h3-max-lipsync` 768p (image + Dr Aminah `eleven_v4` audio) → cutaways `kling-2.5-turbo` image-to-video → music `eleven_music_v2_5` → GSAP overlay + ffmpeg (`work_gout/`).
Times are final-video seconds (whole programme at 1.06× tempo, pitch preserved).

| # | Time | Type | Picture | Narration (Dr Aminah) | Graphics |
|---|---|---|---|---|---|
| A | 0.00–8.72 | Cutaway (Kling) | Night bedroom: Pak Cik Hamid winces, blows on his glowing red big toe and lifts the blanket away | "Pernah tak… tengah malam… sampai kena selimut pun, tak tahan!" | Hook title on frame 0: "IBU JARI KAKI TIBA-TIBA BENGKAK? Mungkin ini GOUT"; logo badge from 3 s |
| B | 8.72–19.11 | Lip-sync | Dr Aminah in the clinic consultation room, greeting and gesturing | "Assalamualaikum! Saya Dr Aminah… apa yang berlaku dalam sendi." | Name tag "Dr Aminah · Klinik Nissa, Nilai" |
| C | 19.11–25.81 | Lip-sync | Dr Aminah shrunk inside the big-toe joint, surrounded by needle-like urate crystals | "Bila asid urik… kristal tajam, macam jarum, dalam sendi." | Chip "1 · ASID URIK ↑ = KRISTAL" |
| D | 25.81–33.11 | Cutaway (Kling) | Cute white blood cells swarm and grab the crystals; tissue glows red and hot | "Badan kita anggap kristal ni penceroboh…" | Chip "2 · SENDI MERADANG" |
| E | 33.11–45.92 | Lip-sync | Dr Aminah at a kenduri buffet (rendang, grilled meat, liver/tripe, prawns, cockles, rose syrup, sodas) | "Siapa yang berisiko? …ubat diuretik." | Chip "3 · SIAPA BERISIKO?" + risk list ticking in sync (5 items) |
| F | 45.92–52.85 | Cutaway (Kling) | Living room: Dr Aminah places an ice pack on Pak Cik's raised foot; he relaxes | "Bila serangan datang, rehatkan sendi, tuam dengan ais… Jangan ambil ubat sendiri, ya." | Chip "4 · BILA SERANGAN" + steps REHAT / TUAM AIS / JUMPA DOKTOR + "✕ Jangan ambil ubat sendiri" |
| G | 52.85–64.15 | Lip-sync | Dr Aminah beside a holographic uric-acid gauge (red → green target line) | "Kalau serangan berulang… bawah tiga ratus enam puluh mikromol per liter…" | Chip "5 · RAWATAN JANGKA PANJANG" + card "SASARAN ASID URIK <360 µmol/L — CPG Pengurusan Gout (Edisi ke-2), KKM" |
| H | 64.15–73.07 | Cutaway (Kling) | Pak Cik in a holographic body scan; heart/BP, blood-sugar, kidney and artery icons orbit him | "Gout juga selalu datang bersama… saringan sangat penting." | Chip "6 · SARINGAN" + chips Darah tinggi / Kencing manis / Kolesterol / Buah pinggang → "Saringan sangat penting" |
| I | 73.07–81.38 | Lip-sync | Dr Aminah waving at the Klinik Nissa reception | "Klinik Nissa, Nilai, sedia membantu… langkah pun ringan!" | CTA pill "Pemeriksaan Asid Urik & Konsultasi Gout" |
| END | 81.38–85.98 | End card | (blurred reception background) | — | Original logo, "Pemeriksaan Asid Urik & Konsultasi Gout", WhatsApp 012-608 1411, address, education disclaimer |

Subtitles: Montserrat Black 66 px, white with navy stroke, keywords in brand yellow, y≈1250–1510 (clear of the TikTok/Reels UI). Words were aligned to the audio with local Whisper (faster-whisper small) against the approved script.
Audio: Dr Aminah narration (9 takes, chosen after transcription check) at 1.06× tempo; ElevenLabs Music v2.5 instrumental bed (no vocals detected) side-chain ducked; whoosh on every cut; pops on graphic reveals. Loudness normalised to −14 LUFS.
