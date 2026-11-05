# Klinik Nissa — AI Health Content Factory

Production workspace for Klinik Nissa's Malay health-education reels (Facebook / Instagram / TikTok).

```
brand/                      original Klinik Nissa logo (from Google Drive, unaltered)
KLINIK_NISSA_CONTENT/
  EDITORIAL_CALENDAR_30D.md rolling 30-day topic plan
  <date>/DAILY_PRODUCTION_REPORT.md
  <date>/VIDEO_0N_<CATEGORY>/  final_video.mp4, thumbnail.png, voiceover.mp3, narration_script.txt,
                               caption_{facebook,instagram,tiktok}.txt, storyboard.md,
                               medical_references.md, schedule_status.json
work/                       sources & pipeline for the 4 Nov batch (AI clip compilation)
work_gout/                  5 Nov gout video: 3D Dr Aminah host format (ElevenLabs flow 3YTUs0X9dujoPwm8ROoJ)
                            scripts: build_timeline.py → build_subs.py → render_overlay.js → mix_audio.py → finalize.sh
  img/ clips/ audio/        Higgsfield stills, 3D animation clips, ElevenLabs audio
  render/overlay.html       motion-graphics composition (GSAP): subtitles, chips, end card
  render/thumbnail.html     thumbnail template
  scripts/                  build_timing.py → build_base.py → build_subs.py →
                            render_overlay.js → mix_audio.py → finalize.sh
```

Rebuild order (from `work/`):

```bash
python3 scripts/build_timing.py
python3 scripts/build_base.py
python3 scripts/build_subs.py
node scripts/render_overlay.js video_noaudio.mp4
python3 scripts/mix_audio.py
./scripts/finalize.sh
```

Nothing is scheduled or published until medical, voice, brand and advertising approvals are recorded in `schedule_status.json`.
