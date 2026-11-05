#!/usr/bin/env bash
# Mux rendered video + final mix, copy deliverables into the content folder.
set -euo pipefail
cd "$(dirname "$0")/.."
D=../KLINIK_NISSA_CONTENT/2026-11-05/VIDEO_01_GOUT
mkdir -p "$D"
ffmpeg -y -v error -i video_noaudio.mp4 -i audio/final_mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "$D/final_video.mp4"
ffmpeg -y -v error -i audio/narration_final.wav -c:a libmp3lame -b:a 192k "$D/voiceover.mp3"
cp "$D/final_video.mp4" "$D/2026-11-05_slot1_gout_dr-aminah-3d.mp4"
ffprobe -v error -show_entries stream=codec_type,codec_name,width,height,r_frame_rate,sample_rate -show_entries format=duration,size -of compact "$D/final_video.mp4"
