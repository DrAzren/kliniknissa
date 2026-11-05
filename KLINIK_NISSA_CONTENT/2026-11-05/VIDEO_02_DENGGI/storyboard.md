# Storyboard: Nyamuk Aedes & denggi (104.2 s, 1080×1920, 30 fps)
Format: code-driven 3D explainer in The Curious Affan style. Every frame is drawn by three.js in headless Chromium (`explainer/episodes/denggi/`). There are no AI images or AI video. The cast is procedural: **Dr Aminah** (tudung, white coat, stethoscope, name badge), **Adam (7)** and **his mother** (baju kurung, tudung). Mosquitoes are procedural too: Aedes, Culex, Anopheles, a swarm of 1,100 instances, and larvae.
Narration: Dr Aminah, ElevenLabs `eleven_v4`, take 1 of each segment (chosen with a local Whisper check), whole programme at 1.06× tempo. Music and SFX are synthesised with numpy. Subtitles are word-timed with local faster-whisper.

| # | Time (s) | Picture | Narration | Graphics |
|---|---|---|---|---|
| A1 | 0.00–4.61 | Dusk housing estate: a swarm rises from tyres, pots, a tub and a bottle cap and drifts to a lit window | "Di sebalik air bertakung… beribu-ribu nyamuk sedang menunggu." | Hook on frame 0: "SATU GIGITAN…" + "BOLEH UBAH SEGALANYA"; swarm buzz |
| A2 | 4.61–13.81 | Macro: an Aedes lands on skin and bites. Then Adam, feverish in bed with a cool cloth, while his mother holds his hand, cries and prays | "Satu gigitan… Adam demam panas… dan berdoa." | Card "39°C DEMAM PANAS"; heartbeat in the score |
| B | 13.81–21.71 | Dr Aminah in the Klinik Nissa consultation room, waves and talks | "Assalamualaikum… Jom kenali musuh kita." | Name tag; "NYAMUK AEDES" |
| C | 21.71–31.42 | Hologram lab: three mosquitoes on stacked holo pads; Dr Aminah points to each | "Kenali tiga jenis nyamuk…" | Chip 1; cards ANOPHELES → Malaria, CULEX → Radang otak JE & kaki gajah, AEDES → DENGGI (red) |
| D | 31.42–40.08 | Macro Aedes on the rim of a water tub, slow orbit | "Aedes berbadan hitam, berbelang putih…" | Chip 2; HITAM + BELANG PUTIH; ☀ SIANG; AWAL PAGI / LEWAT PETANG |
| E | 40.08–47.17 | Low glide over a pot, a tyre and a tub with wriggling larvae, ending on a bottle cap | "Ia bertelur dalam air jernih…" | PASU BUNGA, TAYAR BURUK, JENTIK-JENTIK; "PENUTUP BOTOL PUN CUKUP!" |
| F | 47.17–58.25 | Adam feverish; his mother brings a glass of water | "Tanda denggi…" | Chip 3; symptom checklist ticking in sync; "Minum banyak air" / "✕ Jangan makan ubat tahan sakit sendiri" |
| G | 58.25–69.38 | Dr Aminah, serious; red alarm light pulses | "Hati-hati! Bila demam mula turun…" | HATI-HATI chip; "DEMAM MULA TURUN = FASA KRITIKAL (hari 3–7)"; red list SEGERA KE KLINIK / HOSPITAL (4 items) |
| H | 69.38–80.35 | Yard: Dr Aminah tips water out of a pail, the drum lid closes, she holds up repellent | "Cegah dengan sepuluh minit seminggu…" | Chip 4; "10 MINIT SEMINGGU" timer; 5-step checklist |
| J | 80.35–91.05 | Clinic: Adam (well again, plaster on his arm) and his mother; Dr Aminah explains | "Demam tiba-tiba? Jangan tunggu…" | "DEMAM TIBA-TIBA? JANGAN TUNGGU!"; chip 5; FBC card (Platelet, Sel darah putih, Hematokrit) |
| K | 91.05–99.55 | Klinik Nissa reception; Dr Aminah waves | "Klinik Nissa, Nilai, sedia membantu…" | CTA "Ujian Darah Penuh (FBC) & Pemeriksaan Demam"; "HAPUSKAN AEDES, SELAMATKAN KELUARGA!" |
| END | 99.55–104.15 | End card | — | Original logo, KLINIK NISSA, NILAI, FBC & Pemeriksaan Demam, WhatsApp 012-608 1411, address, education disclaimer |

Logo badge top-right from 3 s. Captions: Fredoka 64 px in a navy pill at y≈1430, keywords in brand yellow, warnings in red.
Audio: emotional A-minor piano, pad and heartbeat for the hook; warm C-major pluck groove; A-minor tension under G with a soft alarm; resolve chord under the end card. Mosquito buzz in A1/A2, whoosh on every cut, pops on reveals. Music is ducked under the voice. Mix −14 LUFS.
Rebuild: `cd explainer && ./episodes/denggi/make.sh` (after `npm install`). New voice takes: `episodes/denggi/pick_takes.py` → `tools/build_timeline.py episodes/denggi --tempo 1.06` → `make.sh`.
