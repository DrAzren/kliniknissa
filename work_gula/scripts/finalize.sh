#!/usr/bin/env bash
# Mux rendered video + final mix and copy deliverables.
set -euo pipefail
cd "$(dirname "$0")/.."
D=../KLINIK_NISSA_CONTENT/2026-11-11/VIDEO_01_DIABETES_TEH_AIS
ffmpeg -y -v error -i video_noaudio.mp4 -i audio/final_mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "$D/final_video.mp4"
cp render/thumbnail.png "$D/thumbnail.png"; cp render/thumbnail.jpg "$D/thumbnail.jpg"; cp audio/take1.mp3 "$D/voiceover.mp3"
ffprobe -v error -show_entries stream=codec_type,codec_name,width,height,r_frame_rate,sample_rate -show_entries format=duration,size -of compact "$D/final_video.mp4"
