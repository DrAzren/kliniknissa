# Daily production report — 2026-11-25 batch (produced 2026-11-24, branch `claude/upbeat-wozniak-5k7bfp`)
Three animated videos, same concept as previous batches:
- Remotion `animasi/`, Violet Flat SVG, avatar `dr-azren`.
- Structure: hook → story → diagnosis → #1–#5 → recovery → "jangan tunggu… saya Doktor Azren".

The user approved option **A+** ("+ A, ditambah 2 SFX baharu"):
- New voice, 1 take each.
- **2 new short SFX:** fast heartbeat, toddler choking/cough.
- Music reused from `jenis-nyamuk`.

Topics checked against all 40 earlier topics; none repeat. No helpline line. **No clinic CTA.** **Not scheduled** (Metricool only when the user asks).

Shared code: `animasi/src/topics/_kit/kit.tsx` gained 10 icons:
- stairs
- steak
- red blood cells (with count)
- spinning thought spiral
- notebook
- grapes
- nuts
- back blows
- abdominal thrust
- infant chest thrust

Topics registered in `src/topics/index.ts`: `anemia`, `overthinking`, `tercekik`.

## Video 1 — VIDEO_01_KESIHATAN_ANEMIA (`anemia`)
- **Topic:** "Kurang Darah? Kenali Anemia Kekurangan Zat Besi".
- **Story:** Cikgu Nurul (32, teacher, fictional) is tired, dizzy and breathless on the stairs. She blames poor sleep, but has heavy periods → blood test → iron-deficiency anaemia.
- **Points:**
  - #1 signs: tired, pale, breathless, palpitations, dizzy
  - #2 causes: blood loss/heavy periods, pregnancy needs, low-iron diet
  - #3 confirm with a blood test and find the cause; men and post-menopausal women need further investigation
  - #4 iron tablets as directed (black stools, constipation; keep going)
  - #5 iron-rich foods; avoid tea/coffee with meals
- **Voice:** 1 take, 84.88 s (generation `xDXqLuA1IYONBx5gAV8I`).
- **Duration / tech:** 85.44 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (84 MB → 68 MB), AAC 48 kHz, **−14.0 LUFS**, TP −2.1 dB.
- **SFX:**
  - **New:** `sfx_heart.mp3` (heartbeat on "termengah-mengah" and "jantung berdebar").
  - Reused: sting, pop on #1–#5, chime, whoosh.
- **Medical review:** PENDING.
  - Sources: NICE CKS, NHS, BSG, NHMS 2019.
  - Flagged: tea/coffee advice and "black stools". No MOH anaemia-specific source found.

## Video 2 — VIDEO_02_MENTAL_HEALTH_OVERTHINKING (`overthinking`)
- **Topic:** "Overthinking: Kenapa Otak Tak Boleh Berhenti?".
- **Story:** Farah (29, marketing executive, fictional) replays office conversations every night and imagines everything going wrong. She sleeps late, wakes tired and struggles with decisions → doctor explains repetitive thinking linked to anxiety.
- **Points:**
  - #1 planning vs overthinking
  - #2 affects sleep; linked to anxiety and depression
  - #3 15-minute daily "worry time" (write worries, postpone)
  - #4 "can I do something?": one small step, or switch to an activity
  - #5 exercise, less caffeine, phone away before bed
- **Extra:** see a doctor if persistent, affecting work or feeling hopeless; talking therapy helps.
- **Voice:** 1 take, 84.32 s (generation `8KK5Hm1fraISAcyeCDeK`).
- **Duration / tech:** 84.89 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (82 MB → 68 MB), AAC 48 kHz, **−14.2 LUFS**, TP −1.1 dB.
- **SFX:** all reused (tick, sting, pop on #1–#5, chime, whoosh).
- **Medical review:** PENDING.
  - Sources: NHS Every Mind Matters, KCL, Oxford CBT material.
  - Flagged: "overthinking" is not a diagnosis; 15-minute duration; MOH CPG GAD reference.

## Video 3 — VIDEO_03_KANAK_KANAK_TERCEKIK (`tercekik`)
- **Topic:** "Anak Tercekik: Apa Perlu Buat?".
- **Story:** Danish (2, fictional) eats grapes while running and chokes (lips turning blue). His mother sweeps his mouth with a finger (shown as WRONG). His father gives back blows and abdominal thrusts → grape comes out → hospital check.
- **Points:**
  - #1 strong cough → encourage coughing
  - #2 over 1 year: 5 back blows + 5 abdominal thrusts, repeat
  - #3 under 1 year: 5 back blows + 5 chest thrusts, no abdominal thrusts
  - #4 unconscious → 999 + CPR
  - #5 prevention: cut grapes lengthwise, no nuts for small children, small toys away, sit while eating
- **Extra:** see a doctor even if the object comes out.
- **Voice:** 1 take, 81.36 s (generation `Sv0EM9jMhNCpYDWS1xYK`).
- **Duration / tech:** 81.92 s, 1080×1920, 30 fps, H.264 2-pass 6.4 Mbps (81 MB → 65 MB), AAC 48 kHz, **−14.3 LUFS**, TP −1.1 dB.
- **SFX:**
  - **New:** `sfx_choke.mp3` (toddler choking/cough on "terhenti").
  - Reused: sting, slap (back blow), siren, pop on #1–#5, chime, whoosh.
- **Medical review:** PENDING.
  - Sources: NHS, MSD Manual, MedlinePlus.
  - Flagged: local first-aid guideline (MRC / MOH / Red Crescent), finger-sweep wording, age limit for nuts.

## Files per video
- `final_video.mp4`
- `thumbnail.png` + `.jpg`
- `voiceover.mp3`
- `music.mp3` (reused)
- `sfx_heart.mp3` / `sfx_choke.mp3` (new SFX; videos 1 and 3)
- `narration_script.txt`
- `caption_facebook.txt`, `caption_instagram.txt`, `caption_tiktok.txt` (no hashtags)
- `storyboard.md`
- `medical_references.md`
- `schedule_status.json` (status `READY_NOT_SCHEDULED`)

## Usage (verified from tool responses)
- **ElevenLabs:** **≈4,240.9 credits** (estimate before approval: ~4,241 for option A+)
  - eleven_v4 TTS, 1 take each: 1,399.9 (anemia) + 1,430.9 (overthinking) + 1,396.9 (tercekik) = 4,227.6
  - SFX ×2 (eleven_text_to_sound_v2, 2 s, 1 generation each): 6.67 + 6.67 = 13.3
  - Music: 0 (reused)
  - Scribe ×3: 0
  - ElevenLabs Flow: `IsEd0zP4bAC0RQbPrVxU`
- **Higgsfield:** 0 credits

## Notes
- Folder date is 2026-11-25 (the planned posting day); production happened on 2026-11-24.
- Pronunciation could not be checked automatically. Please listen for: overthinking, termengah-mengah, kekacang, "C-P-R", "sembilan sembilan sembilan".
- Remaining credit balance could not be read (the ElevenLabs usage tool needs extra connector permission).
