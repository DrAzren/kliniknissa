# Storyboard — "Dengkur Kuat Bukan Tanda Tidur Nyenyak" (≈101.8 s, 1080×1920, 30 fps)
Animasi SVG (Remotion, `animasi/`, topik `dengkur-sleep-apnea`), gaya Violet Flat, avatar `dr-azren`, konsep sama dengan Bipolar / Eczema / Jenis Nyamuk. Watak cerita (rekaan) dilukis dengan `<Avatar>`: **Encik Zul** (misai, baju-T biru) dan **isterinya** (tudung hijau). Komponen baharu: gelombang dengkur, keratan saluran nafas (menyempit → tertutup → dibuka oleh CPAP), mesin CPAP. Tiada CTA klinik. Kapsyen atas ikut perkataan (kata kunci kuning). Komponen kongsi dalam `src/topics/kit.tsx`.

| # | Masa (s) | Babak | Visual | SFX | Label bawah |
|---|---|---|---|---|---|
| 0 | 0.00–8.20 | Hook | Malam, Zul di katil, gelombang dengkur "GRRR… ZZZ…" → jadi garis lurus merah pada "senyap", jam kira 1s→10s, "TIADA NAFAS", bubble "Tidur nyenyak?" dipangkah. | dengkur (baharu), sting | — |
| 1 | 8.20–21.07 | Zul & isteri | "Encik Zul, 42 • pegawai jualan", bulan. Isteri muncul, "REC" dengan gelombang. "GRRR… ZZZ…", "Berhenti bernafas" (ZZZ hilang), "Tersentak!" (badan tersentak). | dengkur, tepukan | — |
| 2 | 21.07–26.52 | Siang | Siang, matahari, Zul dalam kereta, "Mengantuk". Pada "terlelap": skrin malap berkelip + "⚠ Hampir terlelap semasa memandu!" | whoosh | — |
| 3 | 26.52–34.60 | Diagnosis | Papan "KLINIK", Dr. Azren, "Saringan", "Ujian tidur". Cop "APNEA TIDUR OBSTRUKTIF". | sting | — |
| 4 | 34.60–38.74 | 5 perkara | "5 perkara", bulatan 1–5, Dr. Azren menunjuk. | whoosh | — |
| 5 | 38.74–49.90 | #1 | Keratan saluran nafas: "Otot tekak kendur" → "Menyempit…" → "TERTUTUP" (zarah udara tersekat). Meter O₂ turun 97%→82%. Otak + loceng: "Terjaga ×N". | pop | #1 Saluran nafas tertutup |
| 6 | 49.90–57.93 | #2 | Kad: Dengkur kuat · Tercungap / tersedak waktu malam · Bangun dengan sakit kepala · Mengantuk sepanjang hari. | pop | #2 Tanda-tanda |
| 7 | 57.93–66.74 | #3 | Kad: Berat badan berlebihan · Leher besar · Lelaki · Umur lebih 50 tahun · Darah tinggi. | pop | #3 Faktor risiko |
| 8 | 66.74–74.98 | #4 | 4 kad: Darah tinggi · Sakit jantung · Strok · Kemalangan jalan raya + "kerana tertidur ketika memandu". | pop | #4 Bahaya jika dibiarkan |
| 9 | 74.98–87.97 | #5 | "Boleh dirawat ✓", senarai semak: Turunkan berat badan · Elak rokok · Tidur mengiring. Pada "mesin": kad "Mesin CPAP" + saluran nafas terbuka bila udara ditiup, "Saluran terbuka ✓". | pop | #5 Rawatan |
| 10 | 87.97–94.12 | Pulih | Malam → pagi, matahari, "CPAP setiap malam", "Bangun segar ✓", "Memandu lebih selamat", Zul & isteri gembira. | loceng | — |
| 11 | 94.12–101.83 | Penutup | "Berhenti bernafas waktu tidur?", "Jangan tunggu", "Dapatkan pemeriksaan", Dr. Azren melambai, "Dr. Azren", "Video ini untuk pendidikan, bukan diagnosis." | — | — |

Audio: suara Dr Azren + muzik latar (diguna semula daripada video Jenis Nyamuk, ElevenLabs Music v2.5, 107 s, volume 0.16 ≈ −16 dB, fade in 0.4 s / out 2.5 s) + SFX: dengkur (baharu, 3 s, −20 LUFS), sting, tepukan, loceng, whoosh pada potongan babak (0.35), pop pada #1–#5. Konfigurasi dalam `animasi/topics/dengkur-sleep-apnea/script.json` → `audio`.
