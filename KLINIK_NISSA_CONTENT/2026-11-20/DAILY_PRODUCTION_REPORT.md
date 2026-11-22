# Daily production report — 2026-11-20 batch (produced 2026-11-22, branch `claude/upbeat-wozniak-5k7bfp`)
Three animated videos in the same concept as the previous batches (Remotion `animasi/`, Violet Flat SVG, avatar `dr-azren`, hook → story → diagnosis → #1–#5 → recovery → "jangan tunggu… saya Doktor Azren"). Ideas were proposed on 20 Nov; the user approved on 22 Nov ("hasilkan tiga2 video ini") without naming an option, so the cheapest option **A** was used: new voice (1 take each), **no new SFX, no new music** (music from `jenis-nyamuk`, siren from `strok`, water from `cirit-birit-anak`, tick from `kebimbangan-gad`, alarm from `insomnia`). Topics checked against every branch (34 earlier topics) so none repeat. No helpline line. **No clinic CTA.** **Not scheduled.**

Shared code: `animasi/src/topics/_kit/kit.tsx` gained 6 icons (battery with level, water waves, life jacket, fence, CPR, headache). Topics registered in `src/topics/index.ts`.

## Video 1 — VIDEO_01_KESIHATAN_SAKIT_KEPALA (`sakit-kepala`)
- **Topic:** "Sakit Kepala: Bila Jadi Bahaya?".
- **Story:** Puan Zarina (42, fictional) gets a sudden "worst-ever" headache while hanging laundry, vomits, has a stiff neck and wants only painkillers; her husband takes her to hospital → brain scan → bleeding in the brain.
- **Points (5 red flags):**
  - #1 sudden, peaks within minutes
  - #2 fever / stiff neck / rash
  - #3 weakness / slurred speech / blurred vision / confusion / fainting
  - #4 after head injury
  - #5 new and worsening (especially > 50) or waking with headache and vomiting
- **Extra:** go to hospital or call 999; for ordinary headache, rest, fluids and avoid overusing painkillers.
- **Voice:** 1 take, 80.96 s (generation `woMx5CYaa2BVqml1ubIx`).
- **Duration / tech:** 81.54 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (81 MB → 64 MB), AAC 48 kHz, **−14.0 LUFS**, TP −1.2 dB.
- **SFX:** all reused (sting ×2, siren, slap, pop on #1–#5, chime, whoosh).
- **Medical review:** PENDING.
  - No MOH Malaysia headache CPG found; sources are NICE CG150 and the NHS Scotland pathway.
  - Flagged: "rash" and "waking with headache + vomiting".

## Video 2 — VIDEO_02_MENTAL_HEALTH_BURNOUT (`burnout`)
- **Topic:** "Penat Yang Tak Hilang? Mungkin Burnout".
- **Story:** Aina (34, nurse, fictional) works long shifts for months covering colleagues; she is tired all the time, cynical and feels incapable, and a week's leave doesn't help → burnout from work stress.
- **Points:**
  - #1 exhaustion
  - #2 mental distance / cynicism
  - #3 reduced efficacy
  - #4 cause is chronic, unmanaged work stress (WHO: occupational phenomenon, not personal weakness)
  - #5 act early: workload, work-hour limits, sleep, exercise, support
- **Extra:** see a doctor if it persists or if low mood appears (overlap with depression).
- **Voice:** 1 take, 82.88 s (generation `VIg8sTnbaOQvS6O4CZl7`).
- **Duration / tech:** 83.43 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (82 MB → 66 MB), AAC 48 kHz, **−14.0 LUFS**, TP −1.4 dB.
- **SFX:** all reused (tick, alarm, sting, pop on #1–#5, chime, whoosh).
- **Medical review:** PENDING.
  - Source: WHO ICD-11.
  - Flagged: "doktor sahkan burnout" wording (burnout is not a medical diagnosis) and the general advice.

## Video 3 — VIDEO_03_KANAK_KANAK_LEMAS (`lemas`)
- **Topic:** "Lemas Berlaku Senyap dan Pantas".
- **Story:** school holiday; Irfan (4, fictional) at a pool while his father is on his phone (shown as WRONG); Irfan slips into the deep end and sinks silently; a lifeguard pulls him out → rescue breathing → hospital.
- **Points:**
  - #1 constant supervision within arm's reach, phone away
  - #2 drowning is silent
  - #3 fences, covers, empty buckets/basins
  - #4 avoid flood water, rivers, beaches without supervision; life jacket
  - #5 swimming and water-safety lessons; parents learn CPR
- **Extra:** if a child drowns: get them out, call 999, start CPR if not breathing, and go to hospital even if they seem fine.
- **Voice:** 1 take, 88.16 s (generation `14jZCDPtifteKMEj7dLv`).
- **Duration / tech:** 88.70 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (90 MB → 70 MB), AAC 48 kHz, **−14.1 LUFS**, TP −1.4 dB.
- **SFX:** all reused (water pour as splash, sting, siren, pop on #1–#5, chime, whoosh).
- **Medical review:** PENDING.
  - Source: WHO drowning fact sheet and WPRO.
  - Flagged: "drowning is silent" (not from WHO) and the CPR steps.

## Files per video
- `final_video.mp4`
- `thumbnail.png` + `.jpg`
- `voiceover.mp3`
- `music.mp3` (reused)
- `narration_script.txt`
- `caption_facebook.txt`, `caption_instagram.txt`, `caption_tiktok.txt` (no hashtags)
- `storyboard.md`
- `medical_references.md`
- `schedule_status.json`

## Usage (verified from tool responses)
- **ElevenLabs:** **4,226.6 credits** (estimate before approval: ~4,227 for option A)
  - eleven_v4 TTS, 1 take each: 1,374.9 (sakit kepala) + 1,392.9 (burnout) + 1,458.9 (lemas)
  - SFX: 0 (all reused)
  - Music: 0 (reused)
  - Scribe ×3: 0
  - ElevenLabs Flow: `Fnm0kRut4YgOkadR0b7I`
- **Higgsfield:** 0 credits

## Notes
- Folder date is 2026-11-20 (the day the ideas were proposed); production happened on 2026-11-22.
- Pronunciation could not be checked automatically. Please listen for: "sembilan sembilan sembilan", pendarahan, pelat, burnout, sinis, "Pertubuhan Kesihatan Sedunia", "C-P-R", penyelamat.
- Remaining credit balance could not be read (the ElevenLabs usage tool needs extra connector permission).
