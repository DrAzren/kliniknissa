# Animasi Klinik Nissa — video TikTok 9:16 dengan avatar Dr. Azren

Semua animasi dilukis dengan kod (SVG dalam React/Remotion) dan dirender di komputer sendiri. Tiada servis video berbayar dan tiada imej AI. Suara datang daripada ElevenLabs (klon "Dr Azren").

## Pasang
1. Pasang Node.js 18 ke atas dan ffmpeg (`ffmpeg`, `ffprobe` dalam PATH).
2. Dalam folder ini:
   ```bash
   npm install
   cp .env.example .env    # isi ELEVENLABS_API_KEY=... (jangan commit .env)
   ```

## Arahan
| Arahan | Fungsi |
|---|---|
| `npm run voice -- --topic=<id>` | Jana suara **sekali sahaja** (`/with-timestamps`). Kalau `public/topics/<id>/voice.mp3` dah ada, ia tak guna kredit. Kalau anda letak fail suara sendiri, ia buat masa perkataan dengan faster-whisper. |
| `npm run render -- --avatar=dr-azren` | Render video + thumbnail ke `out/<topik>/`. Tambah `--cover-intro` untuk letak thumbnail sebagai 0.5 s pertama. |
| `npm run render:all` | Render semua avatar dalam `config/avatars.json`. |
| `npm run cover -- --avatar=dr-azren` | Thumbnail PNG 1080×1920 sahaja. |
| `npm run stills -- --late` | PNG pertengahan & hujung setiap babak + `contact.jpg` untuk semakan visual. |
| `npm run studio` | Buka Remotion Studio untuk pratonton. |

Topik lalai ialah `dunia-tanpa-kesihatan-mental`. Guna `--topic=<id>` untuk topik lain.

Render menghasilkan 1080×1920, 30 fps, H.264 ~8 Mbps. Kelantangan dinaikkan dengan gain biasa ke ~-14 LUFS (true peak kekal bawah -1 dB, tiada compressor/limiter). Skrip juga menyemak resolusi, tempoh (suara + 0.5 s) dan aliran audio dengan ffprobe.

## Struktur
```
config/avatars.json             preset avatar (dr-azren)
config/dr-azren-avatar-sheet.png helaian rujukan: 8 mood + bayang
topics/<id>/script.json         SUMBER TUNGGAL: teks suara, babak, kata kunci, pembetulan kapsyen, teks cover
topics/<id>/words.json          masa setiap perkataan (dari ElevenLabs / Scribe / whisper)
public/topics/<id>/voice.mp3    take suara (diguna semula)
src/components/Avatar.tsx       <Avatar mood pose preset silhouette />
src/components/Caption.tsx      kapsyen atas + label bawah "#N"
src/topics/<id>/scenes.tsx      babak (lukisan SVG) untuk topik itu
src/topics/<id>/Cover.tsx       thumbnail
src/topics/index.ts             daftar topik
scripts/                        voice, words, render, stills
```

## Avatar Dr. Azren
Dilukis berdasarkan gambar rujukan: rambut hitam belah tepi, cermin mata bulat nipis, kulit sawo matang, scrub beige dengan poket dada, stetoskop di leher, jam tangan. Ia disimpan sebagai preset `dr-azren` supaya semua video akan datang guna watak yang sama.

- Mood: `neutral`, `happy`, `curious`, `tired`, `sad`, `angry` (dengan `anger` 0–1 untuk muka merah), `shock`, `fake-smile`.
- Pose: `down`, `clasp`, `point`, `wave`, `chin`.
- `silhouette` menukar semua warna kepada `#120B33` (bayang).
- Mata berkelip dan badan "bernafas" secara automatik.

Contoh: `<Avatar preset={preset} mood="happy" pose="wave" width={560} />`

### Tambah avatar baru
Tambah satu objek dalam `config/avatars.json` (salin `dr-azren`, tukar `id` dan warna). Medan: `skin`, `skinShade`, `hair` (`side-part`/`short`), `hairColor`, `top`, `topColor`, `topShade`, `accessory` (`glasses-round` atau `null`), `stethoscope`, `watch`, `stubble`. Kemudian `npm run render -- --avatar=<id-baru>`. Untuk gaya rambut/baju baharu (contohnya tudung), tambah bentuknya dalam `src/components/Avatar.tsx`.

## Buat video topik baharu
1. Salin `topics/dunia-tanpa-kesihatan-mental/` dan `src/topics/dunia-tanpa-kesihatan-mental/` ke id baharu.
2. Edit `script.json`:
   - `voice.text`: skrip penuh. Tag dalam `[ ]` ialah arahan emosi (tak dibaca).
   - `scenes`: senarai babak. `marker` = perkataan/frasa yang memulakan babak (sempadan = masa perkataan itu tolak 0.1 s, dikira automatik). `n` + `label` = label bawah "#N".
   - `keywords` (kuning), `corrections` (contohnya "Doktor Azren" → "Dr. Azren", "dua minggu" → "2 minggu"), `cover`.
   - Struktur "N perkara bernombor + penutup" boleh diguna semula. Perkataan nombor ("Satu.", "Dua." …) dipaparkan sendiri, kuning 110px.
3. Lukis babak dalam `scenes.tsx` (satu komponen bagi setiap `id` babak) dan daftarkan topik dalam `src/topics/index.ts`.
4. `npm run voice -- --topic=<id>`, semak transkrip, kemudian `npm run stills -- --topic=<id> --late` dan `npm run render -- --topic=<id> --avatar=dr-azren`.

Kalau suara dijana melalui ElevenLabs Flows (bukan API): letak MP3 di `public/topics/<id>/voice.mp3` dan transkrip Scribe di `topics/<id>/scribe_words.json`, kemudian `npm run words -- --topic=<id> --from-scribe=topics/<id>/scribe_words.json`.

## Gaya "Violet Flat"
Vektor flat 2D tanpa garis luar, shading 2 tona, glow ungu, bokeh, bintang berkelip. Palet dalam `src/theme.ts`. Font Montserrat ExtraBold (800). Kamera sentiasa push-in/pan. Potongan antara babak ialah hard cut.
