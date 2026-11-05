# Aedes & denggi explainer (Dr Aminah): status 2026-11-05
Format changed at the user's request: a **code-driven 3D explainer** (The Curious Affan style) replaces AI video. Source: `explainer/episodes/denggi/`.
Voice: Dr Aminah `uFdZbpnXsSJhPEhajxEx`, `eleven_v4`, 11 segments × 2 takes, ElevenLabs flow https://elevenlabs.io/app/flows/vaSUGKbEpM6ml7JaLPJn
Chosen takes: take 1 for every segment (Whisper check in `explainer/episodes/denggi/audio/take_check.json`).

Credits spent: **ElevenLabs 2,811.7** (eleven_v4 narration only; ≈ US$0.51). Higgsfield 0. Everything else is 0 (code, numpy, local Whisper).
The ElevenLabs estimate had been ≈ 2,570. Actual charges were about 1 credit per character (the estimate used segment G's 0.91 rate).
Deliverables: `KLINIK_NISSA_CONTENT/2026-11-05/VIDEO_02_DENGGI/`.

## Revision 2 (user feedback, 0 credits)
- Thumbnail redone in the Klinik Nissa format used for Gout/mental health: Montserrat 900, navy top/bottom shading, red "DENGGI" tag,
  "SATU GIGITAN / BOLEH UBAH SEGALANYA", teal pill "Dr Aminah terangkan", logo badge. Source: `explainer/episodes/denggi/thumbnail/`
  (`node episodes/denggi/thumbnail/render.js`). Background: clean 3D still of the Aedes bite (`--eval "window.BG_ONLY=true"`).
- Voice cleaned in `tools/build_timeline.py --enhance`: 95 Hz high-pass + 11.5 kHz low-pass (rumble/hiss), FFT denoise, -3 dB at 220 Hz,
  +2.5 dB at 3.2 kHz, de-esser, soft gate between words, light compression. Music now ducks ~78% under the voice; SFX also duck; G alarm quieter.
- "Klinik Nissa, Nilai" said in one breath: the pauses after "Nissa" (0.21 s) and "Nilai" (0.14 s) in take K_1 cut to 0.03 s with
  `tools/squeeze_pauses.py` (original take kept in `audio/takes/`).
