# Storyboard — "Lelaki Murung Tak Semestinya Menangis" (96.37 s, 1080×1920, 30 fps)
Animasi SVG (Remotion, `animasi/`, topik `kemurungan-lelaki`), gaya Violet Flat, avatar `dr-azren`, konsep sama dengan video Bipolar / Eczema / Jenis Nyamuk. Kit kongsi `src/topics/_kit/kit.tsx` (ikon SVG, kad, cop diagnosis, babak #N). Watak cerita (rekaan) dilukis dengan komponen `<Avatar>`: **Faiz** (34, jurutera, baju kelabu-biru), **isteri** (tudung kuning) dan **anak lelaki** (baju-T hijau). Tiada CTA klinik; papan tanda guna "KLINIK" generik. Kapsyen atas ikut perkataan (kata kunci kuning), label bawah "#N".

| # | Masa (s) | Babak | Visual | SFX | Label bawah |
|---|---|---|---|---|---|
| 0 | 0.00–7.72 | intro | "LELAKI MURUNG", air mata dipangkah "Tak menangis". Kad Marah (awan ribut, muka Faiz merah) · Diam (…) · Kerja larut (laptop). | tepukan | — |
| 1 | 7.72–16.36 | faiz | Siang hijau: "Faiz, 34", "Jurutera", bola futsal "Dulu ceria, kaki futsal". Bertukar malam: "Sejak beberapa bulan…", awan ribut, Faiz marah, "Mudah naik angin!", isteri & anak sedih. | whoosh | — |
| 2 | 16.36–25.08 | malam | Bilik gelap, jam "3:00 pagi", bulan. Faiz di katil, cahaya telefon. "Badan sakit", "Perut tak selesa", ✓ "Ujian: normal", bubble "Aku okey. Penat kerja je." (senyum palsu). | whoosh, tepukan | — |
| 3 | 25.08–29.01 | doktor | Papan "KLINIK", isteri menunjuk/memujuk, Dr. Azren muncul. "Saringan", "Temu bual". | whoosh | — |
| 4 | 29.01–31.46 | diagnosis | Cop "DIAGNOSIS: KEMURUNGAN MAJOR"; Faiz sedih. | whoosh, suspen | — |
| 5 | 31.46–37.26 | lima | "Kemurungan pada lelaki", air mata + "Tak nampak macam SEDIH", Faiz senyum palsu; "5 tanda sering terlepas". | whoosh | — |
| 6 | 37.26–42.30 | marah | Faiz marah (muka merah). Kad: Panas baran · Mudah tersinggung · Bertengkar hal kecil. | whoosh, pop | #1 Cepat marah |
| 7 | 42.30–48.98 | skrin | Laptop + telefon. Kad: Kerja tanpa henti · Tenggelam dalam telefon · Untuk elak rasa kosong. | whoosh, pop | #2 Lari ke kerja / skrin |
| 8 | 48.98–55.46 | sakit | Faiz letih. Kad: Sakit kepala · Sakit belakang · Perut tak selesa · Tak baik-baik. | whoosh, pop | #3 Sakit tanpa punca |
| 9 | 55.46–61.26 | tidur | Katil + Zzz. Kad: Susah tidur · Atau tidur terlalu lama · Bangun tetap letih. | whoosh, pop | #4 Tidur terganggu |
| 10 | 61.26–69.24 | minat | Bola dipangkah dan pudar. Kad: Hobi ditinggalkan · Kawan dijauhi · Lebih banyak merokok · Ambil risiko bahaya. | whoosh, pop | #5 Hilang minat |
| 11 | 69.24–79.66 | rawat | Muka senyum. "BOLEH DIRAWAT". Kad: Lebih 2 minggu? Perlu dinilai · Terapi bercakap · Ubat jika perlu · Antidepresan: tidak menyebabkan ketagihan. | whoosh | — |
| 12 | 79.66–85.20 | pulih | Padang futsal, "Beberapa bulan rawatan…", "Kembali ke padang futsal", Faiz & anak melambai, bola melantun, konfeti. | whoosh, loceng | — |
| 13 | 85.20–96.37 | penutup | "Bercakap bukan tanda lemah", "Jangan tunggu, dapatkan rawatan", kotak merah "Fikiran mencederakan diri? Dapatkan bantuan kecemasan segera", Dr. Azren melambai, penafian pendidikan. | whoosh | — |

## Audio
- Suara: Dr Azren (`lN6exnzhuXDOyNQfsVSR`, `eleven_v4`, tag emosi), 1 take (95.84 s), masa perkataan Scribe.
- Muzik: **guna semula** `jenis-nyamuk/music.mp3` (ElevenLabs Music v2.5, instrumental, 107 s), volume 0.16 (~−16 dB di bawah suara), fadeIn 0.4 s, fadeOut 2.5 s, endVolume 0.3. Tiada muzik baharu (pilihan A).
- SFX: guna semula fail percuma `jenis-nyamuk/sfx/` (tiada SFX baharu). Whoosh 0.35 pada setiap potongan babak.
- `slap.mp3` pada "marah" (3.56 s), volume 0.45
- `slap.mp3` pada "Aku okey" (22.67 s), volume 0.45
- `sting.mp3` pada "kemurungan major" (30.23 s), volume 0.8
- `pop.mp3` pada "Satu Cepat" (37.36 s), volume 0.5
- `pop.mp3` pada "Dua Lari" (42.40 s), volume 0.5
- `pop.mp3` pada "Tiga Sakit" (49.08 s), volume 0.5
- `pop.mp3` pada "Empat Tidur" (55.56 s), volume 0.5
- `pop.mp3` pada "Lima Hilang" (61.36 s), volume 0.5
- `chime.mp3` pada "padang futsal" (82.48 s), volume 0.8
- Konfigurasi: `animasi/topics/kemurungan-lelaki/script.json` → `audio`.
