# 2026-11-18 — 3 video animasi — SIAP (pilihan A+ diluluskan)

Pengguna pilih **A+** (suara + 2 SFX baharu; muzik & tangisan bayi diguna semula). Kredit sebenar: 4,543.9 (lihat DAILY_PRODUCTION_REPORT.md).

Konsep sama seperti batch sebelum ini:
- Remotion `animasi/`, gaya Violet Flat SVG, avatar `dr-azren`, kit `src/topics/_kit/kit.tsx`.
- Struktur: hook → cerita → diagnosis → #1 hingga #5 → pulih → "Jangan tunggu… Saya Doktor Azren".
- Tiada CTA klinik. Papan tanda dalam cerita guna "KLINIK" generik.
- Penutup pada skrin: "Video ini untuk pendidikan, bukan diagnosis."

**Topik yang dielakkan** (sudah dibuat di mana-mana branch, 28 topik): tiada emosi, OCD, halusinasi, BPD, bipolar, bipolar jenis 2, serangan panik, kemurungan lelaki, kemurungan selepas bersalin, eczema, jenis nyamuk, denggi, gout, diabetes teh ais, influenza, hipoglisemia, kencing tikus, asma, sleep apnea, batu karang, darah tinggi, HFMD, strok, batuk kering TB, refluks asid, ADHD dewasa, sawan demam.

| # | Folder | Topic id | Tajuk | Watak (rekaan) | Aksara | Anggaran tempoh |
|---|---|---|---|---|---|---|
| 01 | VIDEO_01_KESIHATAN_BUAH_PINGGANG | `buah-pinggang` | Buah Pinggang Rosak Tanpa Sakit | Encik Rahim, 52, ada kencing manis + darah tinggi | 1,653 | ~92–98 s |
| 02 | VIDEO_02_MENTAL_HEALTH_KEBIMBANGAN | `kebimbangan-gad` | Risau Setiap Hari? Mungkin Gangguan Kebimbangan | Farah, 31, guru | 1,461 | ~82–88 s |
| 03 | VIDEO_03_KANAK_KANAK_CIRIT_BIRIT | `cirit-birit-anak` | Anak Cirit-Birit: Bila Jadi Bahaya? | Aisyah, 2 tahun, dan ibunya | 1,417 | ~80–86 s |

Skrip penuh ada dalam `VIDEO_0N_*/narration_script.txt`.

## Semakan fakta (perlu disemak doktor)

### 01 Buah pinggang
- **Sumber:** CPG KKM *Management of Chronic Kidney Disease* (2nd ed., 2018), QR: saringan air kencing + fungsi buah pinggang setiap tahun bagi yang berisiko; kencing manis ialah punca utama CKD di Malaysia.
- **Data dialisis:** Malaysian Dialysis & Transplant Registry: ~65–69% pesakit dialisis baharu menghidap kencing manis.
- **Prevalens:** Hooi et al., BMC Nephrol 2020: CKD 15.48% (2018). Angka ini tidak disebut dalam skrip.
- **Ubat tahan sakit:** Elak NSAID jangka panjang, berdasarkan Kidney Care UK / NICE NG203.
- ⚠️ **Senarai risiko (#2):** perlu disemak dengan teks penuh CPG.
- ⚠️ **Gejala lewat** (bengkak, sesak nafas, kerap kencing malam): NHS; tidak disemak dalam teks CPG.

### 02 Kebimbangan (GAD)
- ⚠️ **Tiada CPG KKM khusus GAD ditemui.** Rujukan yang digunakan: NICE CG113, WHO mhGAP 2023, dan kriteria DSM-5 (≥ 6 bulan, sukar dikawal, ≥ 3 gejala fizikal).
- ⚠️ **Rawatan:** CBT dan SSRI sebagai lini pertama; benzodiazepin tidak untuk jangka panjang. Perlu disemak doktor.
- ⚠️ **Prevalens GAD 1.7%** (NHMS keempat) tidak disebut dalam skrip.

### 03 Cirit-birit kanak-kanak
- **Sumber:** WHO fact sheet *Diarrhoeal disease* dan WHO/UNICEF *Clinical management of acute diarrhoea*: ORS, teruskan penyusuan/makanan, zink 10–14 hari, tanda dehidrasi teruk.
- **Sumber:** NICE CG84: elak jus buah dan minuman bergas; ORS sedikit tetapi kerap; tanda amaran (red flags).
- ⚠️ **Perlu dirujuk:** KKM *Paediatric Protocols* (bab gastroenteritis akut) belum disemak.
- ⚠️ **"Ubat tahan cirit-birit"** (loperamide) tidak disyorkan untuk kanak-kanak (WHO). Perlu disemak doktor.

## Perkataan berisiko sebutan
- **01:** dialisis, dipreskripsi, anti-radang, "buah pinggang kronik".
- **02:** "gangguan kebimbangan menyeluruh", "terapi kognitif tingkah laku", tiroid, relaksasi, preskripsi.
- **03:** dehidrasi, "rehidrasi oral", "O-R-S", cengkung.

## Muzik & SFX
- **Muzik:** guna semula `jenis-nyamuk/music.mp3` (0 kredit).
- **SFX guna semula (0 kredit):** whoosh, pop, sting, chime, slap; `baby` (dari postpartum) untuk video 03.
- **SFX baharu (pilihan, 2 s, ~7 kredit setiap satu):**
  - 02: jam berdetik laju (rasa cemas).
  - 03: air dituang ke cawan (ORS).

## Anggaran kredit ElevenLabs (Higgsfield = 0)
- **A (~4,531):** suara sahaja (1,653 + 1,461 + 1,417). Muzik dan SFX diguna semula.
- **A+ (~4,545):** A ditambah 2 SFX baharu.
- **B (~5,850):** A ditambah 1 muzik baharu (~90 s) yang dikongsi ketiga-tiga video.

Scribe = 0 kredit.
