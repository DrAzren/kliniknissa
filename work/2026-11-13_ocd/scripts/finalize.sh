#!/usr/bin/env bash
# Mux rendered video + final mix, copy deliverables, print QA info.
set -euo pipefail
cd "$(dirname "$0")/.."
D=../../KLINIK_NISSA_CONTENT/2026-11-13/VIDEO_01_MENTAL_HEALTH
mkdir -p "$D"
ffmpeg -y -v error -i video_noaudio.mp4 -i audio/final_mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "$D/final_video.mp4"
cp render/thumbnail.png "$D/thumbnail.png"; cp render/thumbnail.jpg "$D/thumbnail.jpg"
ffmpeg -y -v error -i audio/narration_final.wav -c:a libmp3lame -b:a 192k "$D/voiceover.mp3"
cp "$D/final_video.mp4" "$D/2026-11-13_slot1_mental-health_ocd-suka-kemas.mp4"
ffprobe -v error -show_entries stream=codec_type,codec_name,width,height,r_frame_rate,sample_rate -show_entries format=duration,size -of compact "$D/final_video.mp4"
