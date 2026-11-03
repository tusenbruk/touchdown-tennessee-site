#!/usr/bin/env bash
# Regenerates the WebP width variants that src/components/responsive-img.tsx
# expects. Originals are never modified. Needs ImageMagick (`convert`).
#   products/*.jpg -> -600.webp, -900.webp   heroes/tailgate.jpg -> -800.webp, -1600.webp
set -euo pipefail
cd "$(dirname "$0")/../public"
for f in products/*.jpg; do
  b=${f%.jpg}
  convert "$f" -strip -resize 600x -quality 78 "$b-600.webp"
  convert "$f" -strip -resize 900x -quality 78 "$b-900.webp"
done
convert heroes/tailgate.jpg -strip -resize 800x -quality 72 heroes/tailgate-800.webp
convert heroes/tailgate.jpg -strip -resize 1600x -quality 72 heroes/tailgate-1600.webp
