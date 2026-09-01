#!/usr/bin/env python3
"""Knock cream off Imagine lockups, print them onto blank garments, build pack art."""

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

BRAND = Path("/workspace/public/brand")
PRODUCTS = Path("/workspace/public/products")
ART = Path("/workspace/artifacts/imagine_images")
OUT_ART = Path("/workspace/artifacts/imagine_logos")

CREAM = (tee := (243, 235, 224))  # noqa: F841
PAPER = (243, 235, 224)
BONE = (231, 217, 198)


def flood_knock(im: Image.Image, tol: float = 32, feather: int = 2) -> Image.Image:
    """Make edge-connected cream transparent; keep interior cream (oval fill, counters)."""
    arr = np.array(im.convert("RGBA"))
    h, w = arr.shape[:2]
    rgb = arr[:, :, :3].astype(np.int16)
    border = np.concatenate(
        [rgb[0, :], rgb[-1, :], rgb[:, 0], rgb[:, -1]],
        axis=0,
    )
    bg = np.median(border, axis=0)
    diff = np.linalg.norm(rgb - bg, axis=2)
    mask = np.zeros((h, w), dtype=bool)
    stack = []
    for x in range(w):
        stack.append((0, x))
        stack.append((h - 1, x))
    for y in range(h):
        stack.append((y, 0))
        stack.append((y, w - 1))
    while stack:
        y, x = stack.pop()
        if mask[y, x] or diff[y, x] > tol:
            continue
        mask[y, x] = True
        if y > 0:
            stack.append((y - 1, x))
        if y < h - 1:
            stack.append((y + 1, x))
        if x > 0:
            stack.append((y, x - 1))
        if x < w - 1:
            stack.append((y, x + 1))
    alpha = np.where(mask, 0, arr[:, :, 3]).astype(np.uint8)
    knocked = Image.fromarray(np.dstack([arr[:, :, :3], alpha]))
    if feather:
        a = knocked.split()[3].filter(ImageFilter.GaussianBlur(feather))
        knocked.putalpha(a)
    return knocked


def tight_crop(im: Image.Image, pad: int = 12, thresh: int = 12) -> Image.Image:
    a = np.array(im.split()[3])
    ys, xs = np.where(a > thresh)
    if xs.size == 0:
        return im
    box = (
        max(0, int(xs.min()) - pad),
        max(0, int(ys.min()) - pad),
        min(im.width, int(xs.max()) + pad),
        min(im.height, int(ys.max()) + pad),
    )
    return im.crop(box)


def print_on(
    base: Image.Image,
    logo: Image.Image,
    cx: float,
    cy: float,
    width_frac: float,
    multiply: bool = True,
    opacity: float = 0.92,
) -> Image.Image:
    shirt = base.convert("RGBA")
    W, H = shirt.size
    target_w = int(W * width_frac)
    ratio = target_w / logo.width
    mark = logo.resize((target_w, max(1, int(logo.height * ratio))), Image.Resampling.LANCZOS)
    if opacity < 1:
        a = mark.split()[3].point(lambda p: int(p * opacity))
        mark.putalpha(a)
    x = int(W * cx) - mark.width // 2
    y = int(H * cy) - mark.height // 2
    layer = Image.new("RGBA", shirt.size, (0, 0, 0, 0))
    layer.paste(mark, (x, y), mark)
    if not multiply:
        return Image.alpha_composite(shirt, layer)
    s = np.array(shirt).astype(np.float32)
    l = np.array(layer).astype(np.float32)
    a = (l[:, :, 3:4] / 255.0)
    mul = s[:, :, :3] * l[:, :, :3] / 255.0
    s[:, :, :3] = mul * a + s[:, :, :3] * (1 - a)
    s[:, :, 3] = 255
    return Image.fromarray(s.astype(np.uint8))


def save_rgb(im: Image.Image, path: Path, quality: int = 90) -> None:
    im.convert("RGB").save(path, "JPEG", quality=quality, optimize=True, subsampling=1)
    print("wrote", path, im.size)


def main() -> None:
    OUT_ART.mkdir(parents=True, exist_ok=True)
    PRODUCTS.mkdir(parents=True, exist_ok=True)

    sources = {
        "wordmark": BRAND / "wordmark.jpg",
        "badge": BRAND / "badge.jpg",
        "tdt": BRAND / "tdt.jpg",
        "river": BRAND / "river.jpg",
        "tdt-mark": BRAND / "tdt-mark.jpg",
    }
    pngs: dict[str, Image.Image] = {}
    for name, src in sources.items():
        knocked = tight_crop(flood_knock(Image.open(src)))
        out = BRAND / f"{name}.png"
        knocked.save(out, "PNG")
        pngs[name] = knocked
        print("png", out, knocked.size)

    # Header mark: extra-tight TDT
    pngs["tdt-mark"].save(BRAND / "tdt-mark.png", "PNG")

    cream = Image.open(ART / "7de0ba6e-2c6f-47ad-a127-16ee12535f46.jpg")
    navy = Image.open(ART / "dc531d3a-5d16-4021-b9a1-654b243e0328.jpg")
    hat = Image.open(ART / "2e3f8160-3d68-4df7-82a9-4f20bfcaf8d8.jpg")
    orange = Image.open(ART / "f3e6ad29-d64d-43bf-9621-c6b43066ec9d.jpg")

    save_rgb(
        print_on(cream, pngs["tdt"], 0.50, 0.36, 0.38, multiply=True, opacity=0.88),
        PRODUCTS / "tee-tdt.jpg",
    )
    save_rgb(
        print_on(cream, pngs["wordmark"], 0.50, 0.36, 0.46, multiply=True, opacity=0.90),
        PRODUCTS / "tee-wordmark.jpg",
    )
    save_rgb(
        print_on(navy, pngs["river"], 0.50, 0.36, 0.40, multiply=False, opacity=1.0),
        PRODUCTS / "tee-river-lockup.jpg",
    )
    save_rgb(
        print_on(hat, pngs["badge"], 0.50, 0.38, 0.28, multiply=True, opacity=0.95),
        PRODUCTS / "cap-badge.jpg",
    )
    save_rgb(
        print_on(orange, pngs["tdt-mark"], 0.50, 0.35, 0.32, multiply=True, opacity=0.85),
        PRODUCTS / "tee-tdt-orange.jpg",
    )
    save_rgb(
        print_on(cream, pngs["badge"], 0.50, 0.36, 0.34, multiply=True, opacity=0.92),
        PRODUCTS / "tee-badge.jpg",
    )

    # Portrait sticker sheet so 3:4 product cards don't crop the 2x2.
    pack_w, pack_h = 1200, 1600
    pack = Image.new("RGB", (pack_w, pack_h), PAPER)
    cells = [pngs["wordmark"], pngs["badge"], pngs["tdt"], pngs["river"]]
    margin = 70
    gap = 28
    grid = 2
    cell = (pack_w - margin * 2 - gap) // grid
    # Vertically center the 2x2 on the portrait sheet.
    grid_h = cell * 2 + gap
    y0 = (pack_h - grid_h) // 2
    for i, cell_im in enumerate(cells):
        col, row = i % 2, i // 2
        box = Image.new("RGBA", (cell, cell), (*BONE, 255))
        fit = cell - 48
        r = min(fit / cell_im.width, fit / cell_im.height)
        sz = (max(1, int(cell_im.width * r)), max(1, int(cell_im.height * r)))
        placed = cell_im.resize(sz, Image.Resampling.LANCZOS)
        px = (cell - placed.width) // 2
        py = (cell - placed.height) // 2
        box.paste(placed, (px, py), placed)
        x = margin + col * (cell + gap)
        y = y0 + row * (cell + gap)
        pack.paste(box.convert("RGB"), (x, y))
    save_rgb(pack, PRODUCTS / "pack-marks.jpg", quality=92)
    pack.save(BRAND / "sheet-portrait.jpg", "JPEG", quality=92)

    print("done")


if __name__ == "__main__":
    main()
