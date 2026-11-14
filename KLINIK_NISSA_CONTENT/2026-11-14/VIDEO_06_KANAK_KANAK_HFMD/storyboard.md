# Storyboard — "HFMD: Penyakit Tangan, Kaki & Mulut" (100.71 s, 1080×1920, 30 fps)
Animasi SVG (Remotion, `animasi/`, topik `hfmd`), gaya Violet Flat, avatar `dr-azren`, konsep sama dengan video Bipolar / Eczema / Jenis Nyamuk. Kit kongsi `src/topics/_kit/kit.tsx` (ikon SVG, kad, cop diagnosis, babak #N). Watak cerita (rekaan) dilukis dengan komponen `<Avatar>`: **Aisyah** (3 tahun, baju-T merah jambu, reben) dan **Mak** (tudung ungu, baju kurung hijau). Tiada CTA klinik; papan tanda guna "KLINIK" generik. Kapsyen atas ikut perkataan (kata kunci kuning), label bawah "#N".

| # | Masa (s) | Babak | Visual | SFX | Label bawah |
|---|---|---|---|---|---|
| 0 | 0.00–6.29 | intro | Mulut besar dengan ulser zoom masuk, "Ulser kecil dalam mulut…"; bangunan tadika dengan cop merah "DITUTUP". | suspen | — |
| 1 | 6.29–13.08 | aisyah | "Aisyah, 3 tahun", "Balik dari taska", termometer "Badan panas". Bertukar malam: Aisyah menangis (air mata), botol susu dipangkah, Mak risau. | whoosh | — |
| 2 | 13.08–20.14 | lepuh | "Esok paginya…", "Bintik merah & lepuh kecil", kad Tapak tangan & Tapak kaki, bintik merah muncul pada tangan/kaki Aisyah, Mak terkejut, papan "KLINIK". | whoosh | — |
| 3 | 20.14–25.98 | diagnosis | Kad Tangan · Kaki · Mulut muncul pada perkataan; Dr. Azren periksa mulut; cop "PENYAKIT TANGAN, KAKI & MULUT: HFMD". | whoosh, suspen | — |
| 4 | 25.98–33.82 | lima | "Sangat mudah berjangkit" (virus), "Terutama kanak-kanak kecil" (mainan); "5 perkara ibu bapa perlu tahu". | whoosh | — |
| 5 | 33.82–44.82 | punca | Virus berputar. Kad: Virus: enterovirus · Kebanyakan kes ringan · EV71: boleh serius · Komplikasi otak & jantung. | whoosh, pop | #1 Punca |
| 6 | 44.82–53.70 | merebak | Kanak-kanak bersin. Grid 6: Air liur · Bersin · Cecair lepuh · Najis · Tangan kotor · Mainan. | whoosh, pop | #2 Cara merebak |
| 7 | 53.70–64.34 | tanda | Aisyah dengan bintik. Kad: Demam & sakit tekak · Ulser dalam mulut · Lepuh: tangan, kaki, punggung · Sembuh sendiri: 7–10 hari. | whoosh, pop | #3 Tanda biasa |
| 8 | 64.34–76.38 | bahaya | Segitiga amaran → hospital + "Hospital segera!". Grid 6: Demam tinggi · Mengantuk / lemah · Terkejut-kejut · Muntah berulang · Sesak nafas · Tak mahu minum. | whoosh, pop | #4 Tanda bahaya |
| 9 | 76.38–88.78 | rawatan | Kapsul dipangkah + "Tiada ubat khusus". Grid 6: Banyak air · Makanan lembut · Ubat demam · Basuh + sabun · Cuci mainan · Rehat di rumah. | whoosh, pop | #5 Rawatan & pencegahan |
| 10 | 88.78–94.44 | pulih | "Seminggu kemudian", ✓ Ulser sembuh · ✓ Lepuh mula kering · ✓ Kembali ceria!; Aisyah melompat, Mak gembira, konfeti. | whoosh, loceng | — |
| 11 | 94.44–100.71 | penutup | "Anak ada tanda bahaya?", "Jangan tunggu", "Dapatkan rawatan segera", Dr. Azren melambai, penafian pendidikan. | whoosh | — |

## Audio
- Suara: Dr Azren (`lN6exnzhuXDOyNQfsVSR`, `eleven_v4`, tag emosi), 1 take (100.16 s), masa perkataan Scribe.
- Muzik: **guna semula** `jenis-nyamuk/music.mp3` (ElevenLabs Music v2.5, instrumental, 107 s), volume 0.16 (~−16 dB di bawah suara), fadeIn 0.4 s, fadeOut 2.5 s, endVolume 0.3. Tiada muzik baharu (pilihan A).
- SFX: guna semula fail percuma `jenis-nyamuk/sfx/` (tiada SFX baharu). Whoosh 0.35 pada setiap potongan babak.
- `sting.mp3` pada "tadika ditutup" (4.72 s), volume 0.6
- `sting.mp3` pada "HFMD" (24.66 s), volume 0.8
- `pop.mp3` pada "Satu Punca" (33.92 s), volume 0.5
- `pop.mp3` pada "Dua Cara" (44.92 s), volume 0.5
- `pop.mp3` pada "Tiga Tanda" (53.80 s), volume 0.5
- `pop.mp3` pada "Empat Tanda" (64.44 s), volume 0.5
- `pop.mp3` pada "Lima Rawatan" (76.48 s), volume 0.5
- `chime.mp3` pada "kembali ceria" (93.20 s), volume 0.8
- Konfigurasi: `animasi/topics/hfmd/script.json` → `audio`.
