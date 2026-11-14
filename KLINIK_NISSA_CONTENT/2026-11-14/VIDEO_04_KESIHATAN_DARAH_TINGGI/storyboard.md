# Storyboard — "Darah Tinggi: Pembunuh Senyap" (100.21 s, 1080×1920, 30 fps)
Animasi SVG (Remotion, `animasi/`, topik `darah-tinggi`), gaya Violet Flat, avatar `dr-azren`, konsep sama dengan video Bipolar / Eczema / Jenis Nyamuk. Kit kongsi `src/topics/_kit/kit.tsx` (ikon SVG, kad, cop diagnosis, babak #N). Watak cerita (rekaan) dilukis dengan komponen `<Avatar>`: **Encik Rahman** (45, pemandu lori, misai, baju-T biru) dan **jururawat** (tudung putih, scrub biru muda). Tiada CTA klinik; papan tanda guna "KLINIK" generik. Kapsyen atas ikut perkataan (kata kunci kuning), label bawah "#N".

| # | Masa (s) | Babak | Visual | SFX | Label bawah |
|---|---|---|---|---|---|
| 0 | 0.00–12.27 | intro | 10 ikon orang: 3 bertukar merah ("3 / 10 dewasa di Malaysia"), kemudian "4 / 10 pesakit tak tahu" dengan tanda soal. Kad "Tak sakit" & "Tak gatal" dipangkah; jantung berdenyut + "BOLEH MEMBUNUH". | suspen | — |
| 1 | 12.27–20.43 | rahman | Jalan raya senja + lori. "Encik Rahman, 45", "Pemandu lori", ✓ "Rasa sihat", "Kadang-kadang sakit kepala", bubble "Biasalah, kurang tidur." | whoosh, tepukan | — |
| 2 | 20.43–31.63 | klinik | Papan "KLINIK". Jururawat ukur; monitor BP naik ke 168/100, "TINGGI!". "Datang semula" (kalendar), "Bacaan ke-2", "Tetap tinggi". | whoosh | — |
| 3 | 31.63–35.09 | diagnosis | Dr. Azren + Rahman terkejut; cop "DIAGNOSIS: DARAH TINGGI (Hipertensi)". | whoosh, suspen | — |
| 4 | 35.09–42.10 | lima | "Darah tinggi = bacaan kekal" → "≥ 140/90" (anak panah naik), "mmHg, pada bacaan berulang"; "5 perkara penting". | whoosh | — |
| 5 | 42.10–51.18 | senyap | Jantung "shh…". Kad: Kebanyakan TIADA simptom · Sakit kepala bukan petunjuk · Satu-satunya cara: UKUR. | whoosh, pop | #1 Ia senyap |
| 6 | 51.18–60.30 | risiko | Grid 6: Makan masin · Berat badan · Kurang gerak · Merokok · Umur · Keluarga. | whoosh, pop | #2 Faktor risiko |
| 7 | 60.30–70.34 | kesan | Saluran darah berdenyut dan retak. Kad: Strok · Serangan jantung · Kegagalan buah pinggang · Masalah mata. | whoosh, pop | #3 Kesan jika dibiarkan |
| 8 | 70.34–78.66 | gaya | Bekas garam dipangkah. Kad: Garam < 1 sudu teh / hari · Senam 150 minit / minggu · Berhenti merokok. | whoosh, pop | #4 Ubah gaya hidup |
| 9 | 78.66–85.17 | ubat | Kapsul ubat. Kad: Ikut preskripsi doktor · Setiap hari, walau rasa sihat · Jangan berhenti sendiri. | whoosh, pop | #5 Ubat |
| 10 | 85.17–93.09 | pulih | Pagi cerah, Rahman berjalan. ✓ Kurang garam · ✓ Jalan setiap pagi · ✓ Ubat ikut jadual. Monitor 128/80 hijau, "TERKAWAL", konfeti. | whoosh, loceng | — |
| 11 | 93.09–100.21 | penutup | "Jangan tunggu ada simptom", "Periksa tekanan darah", "Sekurang-kurangnya setahun sekali", Dr. Azren melambai, penafian pendidikan. | whoosh | — |

## Audio
- Suara: Dr Azren (`lN6exnzhuXDOyNQfsVSR`, `eleven_v4`, tag emosi), 1 take (99.68 s), masa perkataan Scribe.
- Muzik: **guna semula** `jenis-nyamuk/music.mp3` (ElevenLabs Music v2.5, instrumental, 107 s), volume 0.16 (~−16 dB di bawah suara), fadeIn 0.4 s, fadeOut 2.5 s, endVolume 0.3. Tiada muzik baharu (pilihan A).
- SFX: guna semula fail percuma `jenis-nyamuk/sfx/` (tiada SFX baharu). Whoosh 0.35 pada setiap potongan babak.
- `sting.mp3` pada "membunuh" (11.04 s), volume 0.7
- `slap.mp3` pada "Biasalah" (18.39 s), volume 0.5
- `sting.mp3` pada "darah tinggi atau hipertensi" (32.82 s), volume 0.8
- `pop.mp3` pada "Satu Ia" (42.20 s), volume 0.5
- `pop.mp3` pada "Dua Faktor" (51.28 s), volume 0.5
- `pop.mp3` pada "Tiga Kesan" (60.40 s), volume 0.5
- `pop.mp3` pada "Empat Ubah" (70.44 s), volume 0.5
- `pop.mp3` pada "Lima Ubat" (78.76 s), volume 0.5
- `chime.mp3` pada "terkawal" (92.24 s), volume 0.8
- Konfigurasi: `animasi/topics/darah-tinggi/script.json` → `audio`.
