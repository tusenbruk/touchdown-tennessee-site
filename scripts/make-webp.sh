#!/usr/bin/env bash
# Regenerates the WebP width variants that src/components/responsive-img.tsx
# expects, for every product image the catalog actually references (plus the
# home hero). Originals are never modified. Needs ImageMagick (`convert`).
#   products/<name>.jpg -> <name>-600.webp, <name>-900.webp
#   heroes/tailgate.jpg -> tailgate-800.webp, tailgate-1600.webp
set -euo pipefail
cd "$(dirname "$0")/.."
grep -oE '"/products/[A-Za-z0-9_.-]+\.jpg"' src/lib/catalog.ts | tr -d '"' | sort -u | while read -r p; do
  f="public$p"; b="${f%.jpg}"
  convert "$f" -strip -resize 600x -quality 78 "$b-600.webp"
  convert "$f" -strip -resize 900x -quality 78 "$b-900.webp"
done
convert public/heroes/tailgate.jpg -strip -resize 800x -quality 72 public/heroes/tailgate-800.webp
convert public/heroes/tailgate.jpg -strip -resize 1600x -quality 72 public/heroes/tailgate-1600.webp
