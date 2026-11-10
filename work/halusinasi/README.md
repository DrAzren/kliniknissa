# Pipeline — 2026-11-10 "Jenis-jenis Halusinasi"
Same pipeline as `work/` (2026-11-04), self-contained in this folder. Rebuild from here:

```bash
python3 scripts/build_timing.py      # audio/takeA.mp3 -> audio/narration_final.wav + timeline_audio.json
python3 scripts/build_base.py        # clips/ + img/ (Ken Burns) -> base.mp4 + timeline_scenes.json
python3 scripts/build_subs.py        # -> render/subs.json
node scripts/render_overlay.js video_noaudio.mp4
python3 scripts/mix_audio.py         # -> audio/final_mix.wav
node scripts/render_thumb.js         # -> render/thumbnail.{png,jpg}
./scripts/finalize.sh
```
Sources: `img/s00–s11.png` (Higgsfield gpt_image_2_5), `clips/v00_hook.mp4`, `clips/v01_eye.mp4` (grok_video_v15_lite), `clips/c10_consult.mp4` (reused from 2026-11-04), `render/icon_*.png` (cropped from s04).
