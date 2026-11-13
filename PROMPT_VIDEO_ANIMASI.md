# Prompt templat — video animasi Klinik Nissa (Claude Code + ElevenLabs v4)

Salin semua teks di dalam kotak di bawah ke sesi Claude Code baharu (repo `DrAzren/kliniknissa`, model Opus 5.5). Tukar bahagian dalam `[KURUNGAN]` sahaja.

```text
Untuk video seterusnya, hasilkan video animasi bertajuk "[TAJUK VIDEO]".

TOPIK & CERITA
- Isi utama: [contoh: jenis-jenis, tanda, punca, faktor risiko, rawatan, pencegahan].
- Mulakan dengan storytelling hook yang padu (3–5 saat pertama mesti buat orang berhenti scroll):
  soalan mengejut / fakta yang mengejutkan, kemudian kisah watak rekaan [NAMA, UMUR, SITUASI]
  yang alami masalah ini → bawa jumpa doktor → diagnosis. Lepas itu Dr. Azren terangkan isi utama
  (format bernombor #1, #2, #3…), dan tutup dengan watak itu pulih / dikawal + pesanan
  "jangan tunggu, dapatkan rawatan …, saya Doktor Azren".
- Tempoh sasaran: [contoh: 85–100] saat.
- Tiada CTA klinik (tiada logo, nombor WhatsApp atau nama klinik). Papan tanda dalam cerita guna "KLINIK" generik.
- Fakta mesti disemak dengan sumber rasmi (CPG KKM dahulu, kemudian WHO/NICE). Senaraikan sumber
  dan tandakan perkara yang perlu disemak doktor dalam medical_references.md.

KONSEP ANIMASI (WAJIB SAMA DENGAN VIDEO BIPOLAR / ECZEMA / JENIS NYAMUK)
- Mula kerja daripada branch claude/modest-newton-p9r0ng (ada sistem animasi `animasi/` + sokongan muzik & SFX).
  Kalau branch kerja anda berbeza, merge/fast-forward dari branch itu dahulu.
- Gunakan sistem Remotion dalam `animasi/` (gaya Violet Flat, semua visual dilukis dengan kod SVG).
  Salin topik `jenis-nyamuk` sebagai templat (topics/<id>/script.json + src/topics/<id>/scenes.tsx + Cover.tsx),
  daftar dalam src/topics/index.ts. Baca animasi/README.md dahulu.
- Avatar pencerita: preset `dr-azren` (jangan ubah lukisannya). Watak cerita dilukis dengan komponen
  <Avatar> yang sama (contoh hijab, misai) dan ditakrif dalam scenes.tsx topik itu.
- 1080×1920, 30 fps, kapsyen atas ikut perkataan (kata kunci kuning), label bawah "#N", kamera sentiasa
  bergerak, ikon/pil muncul TEPAT pada perkataan yang disebut (guna wordTime / at()).
- Penutup ada "Video ini untuk pendidikan, bukan diagnosis."

SYARAT KREDIT (WAJIB)
1. JANGAN guna apa-apa kredit Higgsfield: tiada generate_image / generate_video / generate_audio /
   upscale / apa-apa penjanaan Higgsfield. Semua visual dibuat oleh Claude Code (Remotion + SVG).
   (Pengecualian: media_upload Higgsfield yang PERCUMA, 0 kredit, hanya untuk dapatkan URL awam
   jika saya minta jadualkan di Metricool.)
2. Suara: ElevenLabs, suara klon "Dr Azren" (voice_id lN6exnzhuXDOyNQfsVSR), model eleven_v4,
   tag emosi dalam [ ]. HANYA 1 GENERATION (generations_count = 1). Jangan sekali-kali ulang
   panggilan penjanaan untuk "retry" — setiap panggilan dicaj semula.
3. Muzik latar ringan: ElevenLabs Music (eleven_music_v2_5), instrumental, 1 generation sahaja,
   dijana SELEPAS suara siap supaya duration_seconds = tempoh suara + ~1 s.
4. Sound effect: guna semula dahulu fail percuma dalam animasi/public/topics/jenis-nyamuk/sfx/
   (whoosh, pop, slap, sting, chime, buzz). Jana SFX baharu (eleven_text_to_sound_v2) hanya jika
   perlu, 1 generation setiap satu, durasi pendek (1–3 s).
5. Masa perkataan: transkripsi Scribe pada take suara (0 kredit).
6. SEBELUM menjana apa-apa: tunjukkan skrip penuh, kiraan aksara, senarai muzik & SFX, dan
   ANGGARAN KREDIT, kemudian BERHENTI dan tunggu saya balas "OK jana".
   Kadar rujukan: TTS eleven_v4 ≈ 1 kredit/aksara (termasuk tag); Music ≈ 15 kredit/saat;
   SFX ≈ 3.3 kredit/saat; Scribe 0. Beri juga pilihan jimat (contoh: tanpa muzik baharu).

SEBUTAN
- Untuk perkataan yang mudah tersilap sebut, guna ejaan sebutan dalam teks suara dan betulkan
  dalam kapsyen melalui "corrections" (contoh: "bipo-lar" → bipolar, "ekzema" → eczema,
  "Doktor Azren" → "Dr. Azren", nombor perkataan → angka).
- Senaraikan perkataan berisiko (istilah Inggeris/Latin) dalam draf supaya saya boleh semak
  sebelum jana, kerana hanya ada 1 take.

AUDIO MIX
- Isi blok "audio" dalam script.json: music volume ~0.16 (≈ −16 dB di bawah suara), fadeIn 0.4,
  fadeOut 2.5, whooshOnCuts ~0.35, SFX dikunci pada frasa (at / offset / volume).
- Normalkan SFX baharu ke ~−20 LUFS dengan gain biasa sebelum guna.
- Render: npm run render -- --topic=<id> --avatar=dr-azren (gain sahaja ke ~−14 LUFS, TP < −1 dB).

SEMAKAN & HASIL
- Sebelum render penuh: npm run stills -- --topic=<id> --late, lihat contact.jpg, betulkan
  pertindihan teks/kapsyen/label.
- Jika final_video.mp4 > 95 MB, encode semula 2-pass (≈6.4 Mbps) supaya boleh di-push ke GitHub.
- Simpan dalam KLINIK_NISSA_CONTENT/<tarikh>/VIDEO_0N_<KATEGORI>/: final_video.mp4,
  thumbnail.png + .jpg, voiceover.mp3, music.mp3, narration_script.txt, caption_facebook.txt,
  caption_instagram.txt, caption_tiktok.txt (tanpa hashtag), storyboard.md (jadual babak + masa
  + SFX), medical_references.md, schedule_status.json; kemas kini DAILY_PRODUCTION_REPORT.md
  dengan penggunaan kredit SEBENAR daripada respons tool.
- Commit dan push ke branch kerja. JANGAN jadualkan di Metricool kecuali saya minta.
```

## Nota
- **Paling jimat:** suara sahaja ≈ 1,400–1,700 kredit. Muzik baharu menambah ≈ 1,300–1,600 kredit (100 s), dan SFX biasanya < 30 kredit.
- **Contoh penggunaan sebenar:** video "Jenis Nyamuk" (106 s) menggunakan 3,318.8 kredit ElevenLabs: suara 1,685.8, muzik 1,604.6, 4 SFX 28.3. Kredit Higgsfield yang digunakan ialah 0.
- **Jadual Metricool:** tambah ayat ini pada akhir prompt: *"Lepas siap, jadualkan di Metricool untuk FB, IG dan TikTok pada [TARIKH, MASA] dengan thumbnail dan description ringkas."*
