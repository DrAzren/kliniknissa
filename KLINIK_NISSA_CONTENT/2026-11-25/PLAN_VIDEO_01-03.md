# 2026-11-25 — 3 video animasi — SIAP (dihasilkan 24 Nov, pilihan A+)

Pengguna lulus "+ A, ditambah 2 SFX baharu". Suara 1 take setiap satu, 2 SFX baharu (degupan jantung, kanak-kanak tercekik), muzik diguna semula. Kredit sebenar: ≈4,240.9 (lihat DAILY_PRODUCTION_REPORT.md).

Konsep sama seperti batch sebelum ini:
- Remotion `animasi/`, gaya Violet Flat SVG, avatar `dr-azren`, kit `src/topics/_kit/kit.tsx`.
- Struktur: hook → cerita → diagnosis → #1–#5 → pulih → penutup.
- Tiada CTA klinik. Papan tanda generik "KLINIK".
- Penutup pada skrin: "Video ini untuk pendidikan, bukan diagnosis."

**Topik yang dielakkan** (sudah dibuat di mana-mana branch, 40 topik): semua topik dalam PLAN 2026-11-24, ditambah kanser serviks, mitos antidepresan dan demam anak.

**Kaitan kalendar editorial:**
- 25 Nov: "Anemia kekurangan zat besi" dan "3 tanda anda mungkin kurang darah".
- 26 Nov: "Overthinking: kenapa otak tak boleh berhenti".
- Tercekik: cuti sekolah (keselamatan kanak-kanak, kalendar 21 Nov).

| # | Folder | Topic id | Tajuk | Watak (rekaan) | Aksara | Anggaran tempoh |
|---|---|---|---|---|---|---|
| 01 | VIDEO_01_KESIHATAN_ANEMIA | `anemia` | Kurang Darah? Kenali Anemia Kekurangan Zat Besi | Cikgu Nurul, 32, guru | 1,400 | ~82–86 s |
| 02 | VIDEO_02_MENTAL_HEALTH_OVERTHINKING | `overthinking` | Overthinking: Kenapa Otak Tak Boleh Berhenti? | Farah, 29, eksekutif pemasaran | 1,431 | ~84–88 s |
| 03 | VIDEO_03_KANAK_KANAK_TERCEKIK | `tercekik` | Anak Tercekik: Apa Perlu Buat? | Danish, 2 tahun, ibu & ayah | 1,397 | ~82–86 s |

Skrip penuh: `VIDEO_0N_*/narration_script.txt`.

## Semakan fakta (perlu disemak doktor)

### 01 Anemia
- **Sumber:**
  - NHMS 2019 (Bernama): 21.3% rakyat Malaysia mengalami anemia; 3 daripada 10 wanita 15–49 tahun.
  - BSG / NICE CKS: teruskan zat besi ~3 bulan selepas Hb normal; lelaki & wanita selepas menopaus perlu siasatan (punca pendarahan usus).
- ⚠️ **Perlu disemak:**
  - "Elak teh atau kopi bersama makanan" (nasihat lazim, belum disahkan daripada CPG).
  - "Najis hitam" sebagai kesan sampingan biasa pil zat besi.
  - Sumber KKM khusus belum dijumpai.

### 02 Overthinking
- **Sumber:**
  - NHS Every Mind Matters: "worry time" dan "worry tree" (teknik CBT).
  - Ruminasi berkait dengan kebimbangan (GAD) dan kemurungan (bahan CBT universiti).
- ⚠️ **Perlu disemak:**
  - "Overthinking" bukan diagnosis; ayat "doktor menilai, dan menerangkan".
  - Tempoh "15 minit sehari" (sumber berbeza: 15–30 minit).
  - Rujukan CPG KKM GAD (2nd ed.).

### 03 Tercekik
- **Sumber:**
  - NHS *How to stop a child from choking*: batuk kuat → galakkan batuk; > 1 tahun: tepukan belakang + tekanan perut; < 1 tahun: tepukan belakang + tekanan dada; tidak sedar → 999 + CPR; jumpa doktor selepas itu.
  - MSD Manual: jangan korek mulut secara membuta tuli; tiada tekanan perut pada bayi.
- ⚠️ **Perlu disemak:**
  - Garis panduan pertolongan cemas tempatan (KKM / MRC / Bulan Sabit Merah).
  - "Jangan beri kacang kepada kanak-kanak kecil" (had umur tidak disebut).
  - "Potong anggur memanjang".

## Perkataan berisiko sebutan
- **01:** anemia, termengah-mengah, kekacang.
- **02:** overthinking, kafein, eksekutif.
- **03:** "sembilan sembilan sembilan", "C-P-R", tercekik.

## Muzik & SFX
- **Muzik:** guna semula `jenis-nyamuk/music.mp3` (0 kredit).
- **SFX guna semula (0 kredit):**
  - Asas: whoosh, pop, sting, chime, slap.
  - Lain-lain: tick (01 jam / 02 malam), alarm, siren (03), batuk (`cough`, dewasa), bip, pil.
- **SFX baharu (pilihan, 2 s, ~7 kredit setiap satu):**
  - 01: degupan jantung laju.
  - 03: batuk / tercekik kanak-kanak.

## Anggaran kredit ElevenLabs (Higgsfield = 0)
- **A (~4,228):** suara sahaja (1,400 + 1,431 + 1,397). Muzik dan SFX diguna semula.
- **A+ (~4,241):** A ditambah 2 SFX baharu.
- **B (~5,540):** A ditambah 1 muzik baharu (~87 s) yang dikongsi ketiga-tiga video.

Scribe = 0 kredit.
