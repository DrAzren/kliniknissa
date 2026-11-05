# Credit estimate: Nyamuk Aedes & denggi (Dr Aminah, eleven_v4), 2026-11-05
Unit prices are taken from the actual ElevenLabs charges on the Gout video (`claude/eager-johnson-68g9es`, DAILY_PRODUCTION_REPORT.md). 61,711 credits ≈ US$11.22, so 1,000 credits ≈ US$0.18.
Draft script: 11 segments, 1,406 characters, 200 words. Estimated narration ≈ 96 s, plus a 4.6 s end card ≈ 100 s.

## Pakej A: Penuh (same format as Gout), ≈ 61,400 credits (≈ US$11.20)
| Item | Model | Basis | Credits |
|---|---|---|---|
| Narration, 11 segments × 2 takes | eleven_v4 (Dr Aminah) | 1,406 chars × 2 × ~1.05 | ≈ 2,960 |
| Character designs: Adam + mother (Dr Aminah reused from Gout, 0) | gemini-3-pro-image 2K | 2 × ~1,218 | ≈ 2,440 |
| Scene stills (11 × 1K, with character references) | gemini-3.1-flash-image | 11 × ~609 | ≈ 6,700 |
| Lip-sync, 5 talking scenes (B C G H K, ≈ 49 s) | minimax-h3-max-lipsync 768p | ~494 / s | ≈ 24,400 |
| Cutaways: 5 × 10 s + 1 × 5 s (A1 A2 D E F J) | kling-2.5-turbo | ~4,242 / 10 s | ≈ 23,330 |
| Music bed ≈ 102 s | eleven_music_v2_5 | ~15 / s | ≈ 1,530 |
| Mosquito-buzz SFX (whoosh/pop reused) | eleven_text_to_sound_v2 | | ≈ 35 |
| **Total** | | | **≈ 61,400** |

## Pakej B: Jimat, ≈ 51,000 credits (≈ US$9.30)
Lip-sync only for B, G and K (≈ 28 s ≈ 13,900). C (mosquito types) and H (prevention) use the Dr Aminah still with camera motion plus the motion-graphic cards. Everything else is as in A.

## Pakej C: Asas, ≈ 13,700 credits (≈ US$2.50)
No AI video. All 11 scenes are stills with Ken Burns camera motion and GSAP motion graphics, plus voice and music. Much flatter than the Gout video.

Voice only (eleven_v4, 2 takes per segment): **≈ 2,960 credits**.
Allow about +10% for re-generating a bad shot. Local steps (Whisper subtitles, overlay render, mixing) cost 0 credits. Higgsfield: 0 (not used).
