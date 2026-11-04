"""Build the logo kit (SVG + PNG in every colorway) from the Canva PNG of the logo.

Usage:
  pip install potracer numpy pillow scipy resvg-py
  python scripts/brand_kit.py "../Acyll/brand logo_whiteBG.png" ../Acyll
"""
import io
import os
import sys

import resvg_py
from PIL import Image

sys.path.insert(0, os.path.dirname(__file__))
from logo import BURGUNDY, CREAM, RED, logo_svg, monogram_svg, trace  # noqa: E402

BLACK, WHITE = "#000000", "#ffffff"
LIGHT = {WHITE, CREAM}

# name: (ink, faces, background). faces=None → transparent faces (they show what is behind).
LOGOS = {
    # Transparent background
    "logo-noir": (BLACK, None, None),
    "logo-blanc": (WHITE, None, None),
    "logo-bordeaux": (BURGUNDY, None, None),
    "logo-rouge": (RED, None, None),
    "logo-creme": (CREAM, None, None),
    # Transparent background, filled faces: readable on any background or photo
    "logo-noir-plein": (BLACK, WHITE, None),
    "logo-bordeaux-plein": (BURGUNDY, CREAM, None),
    "logo-rouge-plein": (RED, CREAM, None),
    # With background
    "logo-noir-fond-blanc": (BLACK, WHITE, WHITE),
    "logo-blanc-fond-noir": (WHITE, BLACK, BLACK),
    "logo-creme-fond-bordeaux": (CREAM, None, BURGUNDY),
    "logo-creme-rouge-fond-bordeaux": (CREAM, RED, BURGUNDY),
    "logo-creme-fond-rouge": (CREAM, None, RED),
    "logo-bordeaux-fond-creme": (BURGUNDY, None, CREAM),
    "logo-rouge-fond-creme": (RED, None, CREAM),
}
# Square versions for profile pictures (LinkedIn, Malt, GitHub…).
SQUARES = ["logo-creme-fond-bordeaux", "logo-creme-fond-rouge", "logo-noir-fond-blanc", "logo-blanc-fond-noir"]

# name: (ink, face, tile). Tiles use the thick strokes, made for small sizes.
TILES = {
    "monogramme-rouge": (BURGUNDY, CREAM, RED),
    "monogramme-bordeaux": (CREAM, RED, BURGUNDY),
    "monogramme-creme": (RED, CREAM, CREAM),
    "monogramme-noir": (WHITE, BLACK, BLACK),
    "monogramme-blanc": (BLACK, WHITE, WHITE),
}
# name: (ink, face) on a transparent background.
LETTERS = {
    "noir": (BLACK, None),
    "blanc": (WHITE, None),
    "bordeaux": (BURGUNDY, None),
    "rouge": (RED, None),
    "creme": (CREAM, None),
    "noir-plein": (BLACK, WHITE),
    "bordeaux-plein": (BURGUNDY, CREAM),
}
FINE, THICK = (7, 5), (16, 14)


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(text)


def png(svg, path, width):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as f:
        f.write(resvg_py.svg_to_bytes(svg_string=svg, width=width))


def save(out, folder, name, svg, width):
    write(f"{out}/{folder}/svg/{name}.svg", svg)
    png(svg, f"{out}/{folder}/png/{name}.png", width)
    return f"{folder}/svg/{name}.svg"


def square_logo(d_ink, d_faces, w, h, ink, faces, bg):
    side = round(w * 1.35)
    margin_x, margin_y = (side - w) / 2, (side - h) / 2
    svg = logo_svg(d_ink, d_faces, w, h, ink, faces, bg, margin=0)
    # Re-wrap in a square canvas.
    inner = svg.split(">", 1)[1].rsplit("</svg>", 1)[0]
    inner = inner.replace(f'<rect width="{w}" height="{h}" fill="{bg}"/>', "")
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {side} {side}">'
            f'<rect width="{side}" height="{side}" fill="{bg}"/>'
            f'<g transform="translate({margin_x:.1f} {margin_y:.1f})">{inner}</g></svg>\n')


def main():
    src, out = sys.argv[1:3]
    d_ink, d_faces, w, h = trace(src)
    entries = []  # (section, file, shown on a dark checkerboard)

    for name, (ink, faces, bg) in LOGOS.items():
        svg = logo_svg(d_ink, d_faces, w, h, ink, faces, bg, margin=round(h * 0.3) if bg else 0)
        entries.append(("Logo", save(out, "logo", name, svg, 2400), bg is None and ink in LIGHT))
    for name in SQUARES:
        ink, faces, bg = LOGOS[name]
        svg = square_logo(d_ink, d_faces, w, h, ink, faces, bg)
        entries.append(("Logo carré (photo de profil)", save(out, "logo", name + "-carre", svg, 1600), False))

    for name, (ink, face, bg) in TILES.items():
        entries.append(("Monogramme, tuile arrondie", save(out, "monogramme", name, monogram_svg(ink, face, bg, *THICK), 1024), False))
    for name, (ink, face, bg) in TILES.items():
        entries.append(("Monogramme, tuile carrée", save(out, "monogramme", name + "-carre", monogram_svg(ink, face, bg, *THICK, rounded=False), 1024), False))
    for weight, (stroke, slit) in (("fin", FINE), ("epais", THICK)):
        for name, (ink, face) in LETTERS.items():
            svg = monogram_svg(ink, face, None, stroke, slit)
            entries.append((f"Monogramme seul, trait {'fin (fidèle au logo)' if weight == 'fin' else 'épais (petites tailles)'}",
                            save(out, "monogramme", f"monogramme-{name}-{weight}", svg, 1024), ink in LIGHT))

    # Favicons and app icons (same as the website).
    fav = monogram_svg(BURGUNDY, CREAM, RED, *THICK)
    fav_square = monogram_svg(BURGUNDY, CREAM, RED, *THICK, rounded=False)
    write(f"{out}/favicon/favicon.svg", fav)
    for size in (16, 32, 48, 192, 512):
        png(fav, f"{out}/favicon/favicon-{size}.png", size)
    png(fav_square, f"{out}/favicon/apple-touch-icon.png", 180)  # iOS rounds the corners itself
    sizes = [16, 32, 48]
    imgs = [Image.open(io.BytesIO(resvg_py.svg_to_bytes(svg_string=fav, width=s))) for s in sizes]
    imgs[-1].save(f"{out}/favicon/favicon.ico", sizes=[(s, s) for s in sizes], append_images=imgs[:-1])

    write(f"{out}/apercu.html", preview(entries))


def preview(entries):
    cards, section = [], None
    for sec, path, dark in entries:
        if sec != section:
            if section:
                cards.append("</div>")
            cards.append(f"<h2>{sec}</h2><div class=grid>")
            section = sec
        name = os.path.basename(path)
        cls = "dark" if dark else "check"  # light inks on a transparent background need a dark preview
        cards.append(f'<figure class="{cls}"><img src="{path}" alt=""><figcaption>{name[:-4]}</figcaption></figure>')
    cards.append("</div>")
    return f"""<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Logo Acyll Studio</title>
<link rel="icon" href="favicon/favicon.svg">
<style>
  body {{ margin: 0; padding: 32px 16px 64px; font: 14px/1.4 system-ui, sans-serif; background: #f4f1f1; color: #2f050b; }}
  main {{ max-width: 1200px; margin: 0 auto; }}
  h1 {{ margin: 0 0 4px; }} h2 {{ margin: 40px 0 12px; font-size: 16px; }}
  .colors {{ display: flex; flex-wrap: wrap; gap: 12px; }}
  .colors span {{ display: flex; align-items: center; gap: 8px; padding: 6px 10px 6px 6px; background: #fff; border-radius: 8px; }}
  .colors i {{ width: 28px; height: 28px; border-radius: 6px; border: 1px solid #0002; }}
  .grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }}
  figure {{ margin: 0; background: #fff; border-radius: 12px; overflow: hidden; }}
  figure img {{ display: block; width: 100%; height: 160px; object-fit: contain; padding: 16px; box-sizing: border-box; }}
  .check img {{ background: repeating-conic-gradient(#e7e2e2 0 25%, #fff 0 50%) 0 0 / 16px 16px; }}
  .dark img {{ background: repeating-conic-gradient(#3d0b13 0 25%, #2f050b 0 50%) 0 0 / 16px 16px; }}
  figcaption {{ padding: 8px 12px; font: 12px ui-monospace, monospace; }}
  .sizes {{ display: flex; align-items: end; gap: 16px; }}
</style></head><body><main>
<h1>Logo Acyll Studio</h1>
<p>Chaque fichier existe en SVG (<code>svg/</code>) et en PNG (<code>png/</code>). Voir le README pour l’usage.</p>
<div class="colors">
  <span><i style="background:{RED}"></i>Rouge {RED}</span>
  <span><i style="background:{BURGUNDY}"></i>Bordeaux {BURGUNDY}</span>
  <span><i style="background:{CREAM}"></i>Crème {CREAM}</span>
  <span><i style="background:{BLACK}"></i>Noir {BLACK}</span>
  <span><i style="background:{WHITE}"></i>Blanc {WHITE}</span>
</div>
{''.join(cards)}
<h2>Favicon (tailles réelles)</h2>
<div class="sizes">
  <img src="favicon/favicon-16.png" width="16"><img src="favicon/favicon-32.png" width="32">
  <img src="favicon/favicon-48.png" width="48"><img src="favicon/apple-touch-icon.png" width="90">
  <img src="favicon/favicon-192.png" width="96">
</div>
</main></body></html>
"""


if __name__ == "__main__":
    main()
