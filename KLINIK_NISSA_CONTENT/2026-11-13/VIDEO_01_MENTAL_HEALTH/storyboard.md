# Storyboard: Suka kemas = OCD? (73.1 s, 1080×1920, 30 fps)
Times are final-video seconds. Every scene is an AI 3D animation clip: a still from Higgsfield `gpt_image_2_5`, animated with Higgsfield `grok_video_v15_lite` (image-to-video, 720p, clip length matched to the scene). The motion-graphics overlay is an HTML/GSAP composition (`work/2026-11-13_ocd/render/overlay.html`).

| # | Time | Narration | 3D animation | Motion graphics |
|---|---|---|---|---|
| A | 0.00–3.75 | "Awak suka susun barang ikut warna? Meja mesti sentiasa kemas?" | Young woman in hijab slides the last pen into a rainbow-ordered row on her desk | Branded opening title, visible on frame 0: "SUKA KEMAS = OCD?" |
| B | 3.75–8.77 | "Ramai cakap, 'Eh, saya ni OCD.' Sebenarnya… belum tentu." | Glowing question mark pulsing inside a translucent head | Speech bubble "“Saya ni OCD!”", then a red "BELUM TENTU" stamp |
| C | 8.77–16.58 | "OCD atau gangguan obsesif-kompulsif… ada dua bahagian." | Holographic brain with a ring of light orbiting it in an endless loop | Card "OCD = Gangguan Obsesif-Kompulsif": ✕ Bukan sifat suka kemas / ✓ Penyakit mental, then pills "1 OBSESI" + "2 KOMPULSI" |
| D | 16.58–24.77 | "Pertama, obsesi… takut sangat tangan kotor" | Anxious man staring at stylised glowing microbes around his hands | Chip "1 · OBSESI"; card "Fikiran mengganggu yang datang berulang" + "Takut tangan kotor" |
| E | 24.77–27.21 | "…atau risau pintu rumah belum berkunci." | Man awake in bed at night, door-lock hologram above him | + "Risau pintu belum berkunci" |
| F | 27.21–34.51 | "Kedua, kompulsi… basuh tangan sampai kulit merekah." | Close-up of hands scrubbed repeatedly under the tap, knuckles red and dry (non-graphic) | Chip "2 · KOMPULSI"; card "Perbuatan berulang untuk redakan cemas" + "Basuh tangan berulang kali" |
| G | 34.51–37.00 | "Periksa kunci pintu, berkali-kali." | Man checks the door lock; ghost copies of his hand repeat the motion | + "Periksa kunci berkali-kali" |
| H | 37.00–40.39 | "Lega sekejap… kitaran itu berulang." | Man inside a spinning ring of teal light | Rotating cycle diagram: OBSESI → CEMAS → KOMPULSI → LEGA SEKEJAP, centre "KITARAN BERULANG" |
| I | 40.39–46.77 | "Jadi apa bezanya? … rasa puas … rasa terseksa." | Split frame: woman content at a tidy shelf (warm) / man distressed on the bathroom floor (cold) | "APA BEZANYA?" card: SUKA KEMAS = Rasa puas vs OCD = Rasa terseksa |
| J | 46.77–51.65 | "Ia boleh makan masa lebih sejam sehari…" | Man re-checks the stove while his wife and daughter wait by the door | ">1 JAM sehari", tags KERJA / PELAJARAN / KELUARGA synced to the words, "Rujukan: kriteria DSM-5-TR (APA)" |
| K | 51.65–60.90 | "Berita baiknya, OCD boleh dirawat. Terapi CBT… serta ubat…" | Therapy session; the light ring dissolves into golden particles | "OCD boleh dirawat": ✓ Terapi CBT: teknik ERP / ✓ Ubat (dengan preskripsi & pemantauan doktor) |
| L | 60.90–66.29 | "Kalau anda… dapatkan penilaian profesional." | Friendly doctor listening to a relieved patient | "Dapatkan penilaian profesional" card |
| END | 66.29–73.06 | "Klinik Nissa, Nilai, sedia membantu…" | (blurred brain-loop background) | Official logo (original file), "Konsultasi & Saringan Kesihatan Mental", WhatsApp 012-608 1411, address, education disclaimer |

**Subtitles:** Montserrat Black 66 px, white with a navy stroke, keywords in brand yellow, at most 2 lines, y≈1250–1510 (clear of the TikTok/Reels UI). Line breaks are fixed in `build_subs.py`. Subtitle spelling follows the approved script ("kompulsi", "Nissa"), not the raw transcript. The logo badge sits top-left from 3.0 s.

**Audio:**
- Dr Azren narration: 1 take, pauses over 0.3 s tightened, played at 1.06× with pitch preserved.
- Music: the same ElevenLabs Music v2.5 instrumental bed as the 4 Nov video, reused to save credits. It is slowed to 0.93× so it covers 73 s without a loop seam, and side-chain ducked under the voice.
- Sound effects: a whoosh on each cut and soft pops on reveals.
- Loudness: −14 LUFS integrated.
