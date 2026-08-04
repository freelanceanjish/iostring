#!/usr/bin/env python3
"""Generate move-forward LinkedIn banner from sharp hero domain images."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = Path(__file__).resolve().parent

HERO_IMAGES = [
    ROOT / "hero-financial-services-4k.png",
    ROOT / "hero-energy-domain-4k.png",
    ROOT / "hero-circular-construction-4k.png",
]

PURPLE = (139, 0, 255)
WHITE = (255, 255, 255)
DIVIDER = (139, 0, 255, 220)

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
FONT_REGULAR = "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"


def cover_crop(image: Image.Image, target_w: int, target_h: int) -> Image.Image:
    src_w, src_h = image.size
    scale = max(target_w / src_w, target_h / src_h)
    resized = image.resize((round(src_w * scale), round(src_h * scale)), Image.Resampling.LANCZOS)
    left = (resized.width - target_w) // 2
    top = (resized.height - target_h) // 2
    return resized.crop((left, top, left + target_w, top + target_h))


def build_background(width: int, height: int) -> Image.Image:
    panel_w = width // 3
    canvas = Image.new("RGB", (width, height))
    for index, path in enumerate(HERO_IMAGES):
        panel = cover_crop(Image.open(path).convert("RGB"), panel_w, height)
        canvas.paste(panel, (index * panel_w, 0))

    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for x in (panel_w, panel_w * 2):
        draw.line([(x, 0), (x, height)], fill=DIVIDER, width=max(2, width // 960))

    return Image.alpha_composite(canvas.convert("RGBA"), overlay)


def fit_font(
    draw: ImageDraw.ImageDraw,
    text: str,
    font_path: str,
    max_width: int,
    start_size: int,
    min_size: int,
) -> ImageFont.FreeTypeFont:
    for size in range(start_size, min_size - 1, -2):
        font = ImageFont.truetype(font_path, size)
        bbox = draw.textbbox((0, 0), text, font=font)
        if bbox[2] - bbox[0] <= max_width:
            return font
    return ImageFont.truetype(font_path, min_size)


def draw_shadowed_text(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int],
    anchor: str,
) -> None:
    x, y = xy
    shadow = (0, 0, 0, 180)
    for dx, dy in ((0, 4), (0, -4), (4, 0), (-4, 0), (3, 3), (-3, 3), (3, -3), (-3, -3)):
        draw.text((x + dx, y + dy), text, font=font, fill=shadow, anchor=anchor)
    draw.text((x, y), text, font=font, fill=fill, anchor=anchor)


def render_banner(width: int, height: int) -> Image.Image:
    banner = build_background(width, height)
    draw = ImageDraw.Draw(banner)

    margin_right = round(width * 0.055)
    margin_top = round(height * 0.18)
    max_text_width = round(width * 0.44)

    line1 = "Move forward"
    line2 = "with us"

    font1 = fit_font(draw, line1, FONT_BOLD, max_text_width, round(height * 0.24), round(height * 0.12))
    font2 = fit_font(draw, line2, FONT_REGULAR, max_text_width, round(height * 0.13), round(height * 0.08))

    bbox1 = draw.textbbox((0, 0), line1, font=font1)
    bbox2 = draw.textbbox((0, 0), line2, font=font2)
    line1_h = bbox1[3] - bbox1[1]
    line2_h = bbox2[3] - bbox2[1]
    gap = round(height * 0.02)

    x = width - margin_right
    y1 = margin_top
    y2 = y1 + line1_h + gap

    draw_shadowed_text(draw, (x, y1), line1, font1, WHITE, "rt")
    draw_shadowed_text(draw, (x, y2), line2, font2, PURPLE, "rt")

    return banner.convert("RGB")


def main() -> None:
    outputs = {
        "iostring-linkedin-banner-move-forward-3840x960.png": (3840, 960),
        "iostring-linkedin-banner-move-forward-1584x396.png": (1584, 396),
        "iostring-linkedin-banner-move-forward-1128x191.png": (1128, 191),
    }

    master = render_banner(3840, 960)
    for name, size in outputs.items():
        image = master if size == (3840, 960) else master.resize(size, Image.Resampling.LANCZOS)
        image.save(OUT_DIR / name, optimize=True)
        print(f"Wrote {name} ({size[0]}x{size[1]})")


if __name__ == "__main__":
    main()
