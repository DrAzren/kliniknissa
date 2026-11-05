# Storyboard (DRAF): Nyamuk Aedes & denggi (anggaran ±100 s, 1080×1920, 30 fps)
Template: same format as `VIDEO_01_GOUT` (branch `claude/eager-johnson-68g9es`). A 3D Pixar-style host, **Dr Aminah**, talks to camera with lip-sync. A recurring family, **Adam (7) and his mother**, acts out the story in cutaways.
Pipeline (ElevenLabs): reuse the Gout character `am2.png` (Dr Aminah) → new designs for Adam and his mother `gemini-3-pro-image` → scene stills `gemini-3.1-flash-image` with character references → lip-sync `minimax-h3-max-lipsync` 768p (image + Dr Aminah `eleven_v4` audio) → cutaways `kling-2.5-turbo` → music `eleven_music_v2_5` + mosquito-buzz SFX → GSAP overlay + ffmpeg (`work_denggi/`, copied from `work_gout/`).
Times are estimates. Final times come from the chosen takes.

| # | Type | Picture | Narration (Dr Aminah) | Graphics |
|---|---|---|---|---|
| A1 | Cutaway (Kling 5 s) | Dusk in a Nilai housing estate: a swarm of thousands of mosquitoes rises from tyres, pots and a clogged drain and drifts toward a lit window | "Di sebalik air bertakung… beribu-ribu nyamuk sedang menunggu." | Hook title on frame 0: "SATU GIGITAN… BOLEH UBAH SEGALANYA"; mosquito-buzz SFX swelling |
| A2 | Cutaway (Kling 10 s) | Bedroom: Adam lies feverish; his mother holds his hand and presses a cool cloth to his forehead, eyes glistening | "Satu gigitan… Adam demam panas… dan berdoa." | Text "AWAS DENGGI"; logo badge from 3 s |
| B | Lip-sync | Dr Aminah in the consultation room, concerned → smile | "Assalamualaikum… Jom kenali musuh kita." | Name tag "Dr Aminah · Klinik Nissa, Nilai" |
| C | Lip-sync | Dr Aminah beside three giant hologram mosquitoes | "Kenali tiga jenis nyamuk…" | Chip "1 · JENIS NYAMUK" + 3 cards: ANOPHELES → Malaria · CULEX → JE & kaki gajah · AEDES → Denggi (Aedes highlighted red) |
| D | Cutaway (Kling 10 s) | Macro 3D Aedes: black body, white bands on legs and body, on the rim of a water container | "Aedes berbadan hitam, berbelang putih…" | Chip "2 · KENALI AEDES" + callouts "Hitam + belang putih" · "Gigit waktu SIANG" · clock icons "Awal pagi / Lewat petang" |
| E | Cutaway (Kling 10 s) | Low camera glide through a yard: larvae wriggling in a flower pot, old tyre, plastic container, bottle cap | "Ia bertelur dalam air jernih yang bertakung…" | Labels pop on each container; "Penutup botol pun cukup!" |
| F | Cutaway (Kling 10 s) | Adam in bed; hologram symptom icons appear around him; mother hands him a glass of water | "Tanda denggi: demam panas mengejut…" | Chip "3 · TANDA DENGGI" + checklist ticking in sync (5 items) + "✕ Jangan makan ubat tahan sakit sendiri" |
| G | Lip-sync | Dr Aminah, serious, beside a red hologram warning board | "Hati-hati! Bila demam mula turun, itulah fasa kritikal…" | Red chip "⚠ TANDA BAHAYA" + 4 items: Sakit perut teruk / Muntah berterusan / Berdarah / Terlalu lemah → "SEGERA KE KLINIK / HOSPITAL" |
| H | Lip-sync | Dr Aminah in a yard holding an upturned pail and repellent bottle; covered water drum behind | "Cegah dengan sepuluh minit seminggu…" | Chip "4 · PENCEGAHAN" + timer "10 MINIT / MINGGU" + steps CARI & MUSNAH / TUTUP / BERSIHKAN / PENGHALAU / LENGAN PANJANG |
| J | Cutaway (Kling 10 s) | Klinik Nissa: Dr Aminah shows a hologram FBC report to the mother; Adam smiles with a plaster on his arm | "Demam tiba-tiba? Jangan tunggu. Ujian darah penuh, atau FBC…" | Chip "5 · UJIAN FBC" + card PLATELET · SEL DARAH PUTIH · HEMATOKRIT |
| K | Lip-sync | Dr Aminah waving at the Klinik Nissa reception | "Klinik Nissa, Nilai, sedia membantu…" | CTA pill "Ujian Darah Penuh (FBC) & Pemeriksaan Demam" |
| END | End card | (blurred reception background) | — | Original logo, "Ujian Darah Penuh (FBC) & Pemeriksaan Demam", WhatsApp 012-608 1411, address, education disclaimer |

Subtitles and audio as for Gout: Montserrat Black 66 px, keywords in brand yellow, y≈1250–1510; music bed side-chain ducked, whoosh on cuts, pops on reveals, −14 LUFS.
