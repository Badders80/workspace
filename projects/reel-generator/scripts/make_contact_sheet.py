#!/usr/bin/env python3
"""
Build a simple contact sheet for a generated asset label.

Usage:
    python3 scripts/make_contact_sheet.py --label library-v1
"""

from __future__ import annotations

import argparse
import math
from pathlib import Path
from typing import List

from PIL import Image, ImageDraw, ImageFont, ImageOps


PROJECT_ROOT = Path(__file__).resolve().parent.parent
ASSETS_DIR = PROJECT_ROOT / "assets"
SUPPORTED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}


def load_font(size: int) -> ImageFont.ImageFont:
    try:
        return ImageFont.truetype("DejaVuSans.ttf", size)
    except OSError:
        return ImageFont.load_default()


def gather_images(label_dir: Path) -> List[Path]:
    images: List[Path] = []
    for path in sorted(label_dir.rglob("*")):
        if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS:
            images.append(path)
    return images


def build_contact_sheet(label: str, images: List[Path], output_path: Path) -> None:
    if not images:
        raise RuntimeError(f"No images found for label '{label}'")

    columns = 3
    thumb_width = 440
    thumb_height = 280
    padding = 28
    title_height = 80
    caption_height = 44
    rows = math.ceil(len(images) / columns)

    sheet_width = (columns * thumb_width) + ((columns + 1) * padding)
    sheet_height = title_height + (rows * (thumb_height + caption_height + padding)) + padding

    sheet = Image.new("RGB", (sheet_width, sheet_height), color=(18, 22, 28))
    draw = ImageDraw.Draw(sheet)
    title_font = load_font(34)
    caption_font = load_font(18)

    draw.text((padding, 22), f"{label} Contact Sheet", fill=(245, 247, 250), font=title_font)

    for index, image_path in enumerate(images):
        row = index // columns
        column = index % columns
        x = padding + (column * (thumb_width + padding))
        y = title_height + padding + (row * (thumb_height + caption_height + padding))

        with Image.open(image_path) as img:
            thumb = ImageOps.fit(
                img.convert("RGB"),
                (thumb_width, thumb_height),
                method=Image.Resampling.LANCZOS,
                centering=(0.5, 0.5),
            )

        sheet.paste(thumb, (x, y))
        caption = f"{image_path.parent.name} | {image_path.name}"
        draw.text((x, y + thumb_height + 10), caption[:52], fill=(210, 216, 224), font=caption_font)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output_path, format="PNG")


def main() -> None:
    parser = argparse.ArgumentParser(description="Create a contact sheet for a generated asset label")
    parser.add_argument("--label", required=True, help="Asset label under assets/")
    parser.add_argument("--output", type=Path, help="Optional output path")
    args = parser.parse_args()

    label_dir = ASSETS_DIR / args.label
    if not label_dir.exists():
        raise SystemExit(f"Label directory not found: {label_dir}")

    images = gather_images(label_dir)
    output_path = args.output or (label_dir / f"{args.label}_contact_sheet.png")
    build_contact_sheet(label=args.label, images=images, output_path=output_path)
    print(output_path)


if __name__ == "__main__":
    main()
