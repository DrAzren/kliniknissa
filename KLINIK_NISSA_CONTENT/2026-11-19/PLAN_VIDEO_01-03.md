# 2026-11-19 — 3 video animasi — SIAP (pilihan A+ diluluskan)

Pengguna pilih **A+** (suara + 2 SFX baharu; muzik, jam berdetik & tangisan bayi diguna semula). Kredit sebenar: 4,416.9 (lihat DAILY_PRODUCTION_REPORT.md).

Konsep sama seperti batch sebelum ini:
- Remotion `animasi/`, gaya Violet Flat SVG, avatar `dr-azren`, kit `src/topics/_kit/kit.tsx`.
- Struktur: hook → cerita → diagnosis → #1 hingga #5 → pulih → "Jangan tunggu… Saya Doktor Azren".
- Tiada CTA klinik. Papan tanda dalam cerita guna "KLINIK" generik.
- Penutup pada skrin: "Video ini untuk pendidikan, bukan diagnosis."

**Topik yang dielakkan** (sudah dibuat di mana-mana branch, 31 topik): tiada emosi, OCD, halusinasi, BPD, bipolar, bipolar jenis 2, serangan panik, kemurungan lelaki, kemurungan selepas bersalin, eczema, jenis nyamuk, denggi, gout, diabetes teh ais, influenza, hipoglisemia, kencing tikus, asma, sleep apnea, batu karang, darah tinggi, HFMD, strok, batuk kering TB, refluks asid, ADHD dewasa, sawan demam, buah pinggang, kebimbangan (GAD), cirit-birit anak.

| # | Folder | Topic id | Tajuk | Watak (rekaan) | Aksara | Anggaran tempoh |
|---|---|---|---|---|---|---|
| 01 | VIDEO_01_KESIHATAN_KOLESTEROL | `kolesterol` | Kolesterol Tinggi: Tiada Tanda, Tapi Bahaya | Puan Rosnah, 45, kerani | 1,482 | ~85–90 s |
| 02 | VIDEO_02_MENTAL_HEALTH_INSOMNIA | `insomnia` | Susah Tidur Setiap Malam? Mungkin Insomnia | Hafiz, 38, penyelia kilang | 1,468 | ~84–89 s |
| 03 | VIDEO_03_KANAK_KANAK_BAYI_KUNING | `bayi-kuning` | Bayi Kuning: Bila Perlu Risau? | Bayi Danish, 4 hari, ibu & nenek | 1,454 | ~83–88 s |

Skrip penuh: `VIDEO_0N_*/narration_script.txt`.

## Semakan fakta (perlu disemak doktor)

### 01 Kolesterol
- **Sumber:** CPG KKM *Management of Dyslipidaemia* (5th ed., 2017). Carian tidak menemui edisi lebih baharu.
- Kolesterol tinggi biasanya tiada simptom; LDL membentuk plak, membawa kepada serangan jantung dan strok; statin ialah ubat lini pertama bagi risiko tinggi (ulasan MJMS 2023).
- ⚠️ **Umur mula saringan:** tidak disebut dalam skrip. Senarai risiko dalam #3 perlu disemak dengan CPG.

### 02 Insomnia
- ⚠️ **Tiada CPG KKM untuk insomnia ditemui.** Rujukan: NICE CKS *Insomnia*.
- Kronik = ≥ 3 malam seminggu selama ≥ 3 bulan.
- Kebersihan tidur.
- CBT-I sebagai lini pertama; ubat tidur hanya jangka pendek.
- ⚠️ **Perlu disemak:** "bangun selepas 20 minit" (kawalan rangsangan) dan "jauhkan telefon sejam".

### 03 Bayi kuning
- **Sumber:** CPG KKM *Management of Neonatal Jaundice* (2nd ed.), QR: kuning dalam 24 jam pertama tidak normal; saringan sebelum discaj.
- Kuning merebak dari kepala ke kaki menandakan paras lebih tinggi.
- Tanda bahaya: terlalu mengantuk, tak menyusu, tangisan nyaring, badan melengkung (Berita Harian / Public Health Malaysia).
- Menjemur bayi tidak digalakkan (laporan media tempatan).
- ⚠️ **Perlu disemak:** kenyataan KKM rasmi tentang menjemur bayi, ambang "lebih 2 minggu" (3 minggu bagi bayi pramatang), dan amaran najis pucat / air kencing gelap (kad warna najis KKM tidak ditemui dalam carian).

## Perkataan berisiko sebutan
- **01:** "L-D-L", bersantan, kolesterol.
- **02:** insomnia, kafein, "kognitif tingkah laku", preskripsi.
- **03:** bilirubin, jaundis, fototerapi, melengkung.

## Muzik & SFX
- **Muzik:** guna semula `jenis-nyamuk/music.mp3` (0 kredit).
- **SFX guna semula (0 kredit):**
  - Asas: whoosh, pop, sting, chime, slap.
  - `tick` (dari kebimbangan) untuk 02.
  - `baby` (dari postpartum) untuk 03.
- **SFX baharu (pilihan, 2 s, ~7 kredit setiap satu):**
  - 01: minyak menggoreng (desis kuali).
  - 02: jam loceng berbunyi.

## Anggaran kredit ElevenLabs (Higgsfield = 0)
- **A (~4,404):** suara sahaja (1,482 + 1,468 + 1,454). Muzik dan SFX diguna semula.
- **A+ (~4,418):** A ditambah 2 SFX baharu.
- **B (~5,720):** A ditambah 1 muzik baharu (~88 s) yang dikongsi ketiga-tiga video.

Scribe = 0 kredit.
