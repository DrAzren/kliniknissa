# 2026-11-14 — 3 video animasi (VIDEO_04–06) — SIAP (pilihan A diluluskan)

Pengguna pilih **pilihan A** (suara sahaja, muzik nyamuk diguna semula, tiada SFX baharu, tiada Talian HEAL). Kredit sebenar: 4,899.5 (lihat DAILY_PRODUCTION_REPORT.md). Folder dinombor 04–06 kerana branch `claude/trusting-sagan-des1yl` sudah ada VIDEO_01–03 untuk tarikh yang sama (sleep apnea, panik, batu karang).

Topik yang sudah dibuat sebelum ini (semua branch) dan dielakkan: tiada emosi, OCD, halusinasi, BPD, bipolar, bipolar jenis 2, serangan panik, eczema, jenis nyamuk, denggi, gout, diabetes teh ais, influenza, hipoglisemia, kencing tikus, asma, sleep apnea, batu karang.

| # | Folder | Topic id | Tajuk | Watak | Aksara (termasuk tag) | Anggaran tempoh |
|---|---|---|---|---|---|---|
| 04 | VIDEO_04_KESIHATAN_DARAH_TINGGI | `darah-tinggi` | Darah Tinggi: Pembunuh Senyap | Encik Rahman, 45, pemandu lori (misai) | 1,644 | ~95–103 s |
| 05 | VIDEO_05_MENTAL_HEALTH_KEMURUNGAN_LELAKI | `kemurungan-lelaki` | Lelaki Murung Tak Semestinya Menangis | Faiz, 34, jurutera (+ isteri berhijab, anak) | 1,624 | ~95–102 s |
| 06 | VIDEO_06_KANAK_KANAK_HFMD | `hfmd` | HFMD: Tangan, Kaki & Mulut | Aisyah, 3 tahun (+ Mak berhijab) | 1,632 | ~95–102 s |

Skrip penuh: `VIDEO_0N_*/narration_script.txt` (tepat seperti yang dihantar ke ElevenLabs).

## Pembetulan kapsyen (corrections)
- **04:** "Tiga daripada sepuluh" → "3 daripada 10"; "empat daripada sepuluh" → "4 daripada 10"; "empat puluh lima tahun" → "45 tahun"; "seratus enam puluh lapan, per seratus" → "168/100"; "seratus empat puluh per sembilan puluh" → "140/90"; "satu sudu teh" → "1 sudu teh"; "seratus lima puluh minit" → "150 minit"; "Tiga bulan" → "3 bulan"; "Doktor Azren" → "Dr. Azren".
- **05:** "tiga puluh empat tahun" → "34 tahun"; "pukul tiga pagi" → "pukul 3 pagi"; "dua minggu" → "2 minggu"; "Doktor Azren" → "Dr. Azren".
- **06:** "tiga tahun" → "3 tahun"; "E V tujuh puluh satu" → "EV71"; "tujuh hingga sepuluh hari" → "7–10 hari"; "Doktor Azren" → "Dr. Azren".

## Perkataan berisiko sebutan (1 take sahaja — sila semak)
- **04:** hipertensi, strok, simptom, "seratus enam puluh lapan, per seratus" (cara sebut bacaan BP).
- **05:** major (mungkin disebut "mejar" atau "mei-jor" — kedua-dua boleh diterima), antidepresan, futsal, okey, skrin.
- **06:** HFMD (dibaca huruf demi huruf; alternatif tulis "eic ef em di" untuk sebutan Inggeris), enterovirus, "E V tujuh puluh satu", taska.

## Muzik (ElevenLabs Music `eleven_music_v2_5`, instrumental, 1 generation setiap video, dijana SELEPAS suara: durasi = suara + ~1 s)
- **04:** calm hopeful medical ambient, soft piano + warm pads, gentle steady pulse ~90 bpm, no vocals.
- **05:** intimate melancholic piano + soft ambient strings, slow, brightening to hopeful in the last 20 s, no vocals.
- **06:** gentle caring light underscore, soft marimba + ukulele + pads, warm, not too bouncy, no vocals.
Audio mix: music 0.16, fadeIn 0.4, fadeOut 2.5, endVolume 0.3, whooshOnCuts 0.35.

## SFX
Guna semula (0 kredit) daripada `animasi/public/topics/jenis-nyamuk/sfx/`: whoosh (potongan babak), pop (#1–#5), sting (diagnosis), chime (pulih), slap (04: "Biasalah"; 05: "Aku okey").
SFX baharu (pilihan, `eleven_text_to_sound_v2`, 1 generation setiap satu, dinormalkan ke −20 LUFS):
- 04: `heartbeat.mp3` — denyutan jantung berat, 2 s (pada "boleh membunuh" & bacaan 168/100).
- 05: `phone-buzz.mp3` — getaran notifikasi telefon, 1.5 s (pada "pegang telefon").
- 06: `sneeze.mp3` — bersin kecil kanak-kanak kartun, 1.5 s (pada "bersin").

## Anggaran kredit ElevenLabs (Higgsfield = 0)
| | Suara v4 (1 take) | Muzik (~104 s × 15/s) | SFX baharu | Jumlah |
|---|---|---|---|---|
| 04 | ~1,644 | ~1,560 | ~6.6 | ~3,210 |
| 05 | ~1,624 | ~1,560 | ~5.0 | ~3,190 |
| 06 | ~1,632 | ~1,560 | ~5.0 | ~3,200 |
| **Penuh** | **~4,900** | **~4,680** | **~17** | **~9,600** |
Scribe = 0.

Pilihan jimat:
- **A (paling jimat, ~4,900):** suara sahaja; muzik guna semula `jenis-nyamuk/music.mp3` (106 s) untuk ketiga-tiga video; tiada SFX baharu.
- **B (~6,480):** suara + 1 muzik baharu neutral (~104 s) dikongsi ketiga-tiga video; tiada SFX baharu.
- **C (~9,600):** penuh seperti jadual.

Baki kredit ElevenLabs tidak dapat disemak (connector perlu kebenaran tambahan).
