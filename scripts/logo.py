"""Vectorise the brand logo (PNG made in Canva) and draw the favicon.

The logo fonts (Druzhba Retro and a Canva 3D block font) are not available as files, so the
logo is traced from the high-resolution PNG instead: black ink becomes one SVG path, and the
white faces of "ACYLL" are holes. Drawn in currentColor, the same path gives the black-on-white
and white-on-black versions.

The favicon is the "A" of ACYLL, redrawn from the logo's measurements with thicker strokes
so it stays readable at 16 px.

Usage:
  pip install potracer numpy pillow scipy
  python scripts/logo.py "../Acyll/Old/brand logo_whiteBG.png" src/data/logo.ts public/favicon.svg
"""
import math
import sys

import numpy as np
import potrace
from PIL import Image
from scipy import ndimage

PAD = 8  # the ink must not touch the edge, otherwise potrace adds a frame
SMALL_THICKEN = 5  # px added around the ACYLL ink in the small version (outlines 7 → ~17 px)

# Design system colors (src/styles/tokens.css).
CREAM = "#fffcfc"
RED = "#9e001a"
BURGUNDY = "#2f050b"


def num(v):
    return ("%.1f" % v).rstrip("0").rstrip(".")


def path_of(mask):
    # potracer fills the False pixels, hence the inversion.
    curves = potrace.Bitmap(~mask).trace(turdsize=4, alphamax=1.0, opticurve=True, opttolerance=0.2)
    d = []
    for curve in curves:
        p = curve.start_point
        d.append(f"M{num(p.x)} {num(p.y)}")
        for seg in curve.segments:
            e = seg.end_point
            if seg.is_corner:
                d.append(f"L{num(seg.c.x)} {num(seg.c.y)}L{num(e.x)} {num(e.y)}")
            else:
                d.append(f"C{num(seg.c1.x)} {num(seg.c1.y)} {num(seg.c2.x)} {num(seg.c2.y)} {num(e.x)} {num(e.y)}")
        d.append("Z")
    return "".join(d)


def trace(png, thicken=0):
    """Return (ink path, faces path, width, height) in the same coordinate space.

    thicken > 0 grows the ink of the ACYLL line by that many source pixels on each side, so its
    thin outlines (7 px) stay visible when the logo is drawn small (header). STUDIOS is untouched.
    """
    ink = np.array(Image.open(png).convert("L")) < 128
    ys, xs = np.where(ink)
    x0, y0, x1, y1 = xs.min() - PAD, ys.min() - PAD, xs.max() + 1 + PAD, ys.max() + 1 + PAD
    ink = ink[y0:y1, x0:x1]

    # The two lines are separated by an empty band of rows.
    rows = ink.any(axis=1)
    top = np.argmax(rows)
    split = top + np.argmin(rows[top:])

    if thicken:
        r = thicken
        yy, xx = np.mgrid[-r:r + 1, -r:r + 1]
        disk = xx * xx + yy * yy <= r * r
        bottom = ink.copy()
        bottom[:split] = False
        ink = ink | ndimage.binary_dilation(bottom, structure=disk)

    # Faces of ACYLL: closed white areas below the split.
    # (The counters of the D and O of STUDIOS stay holes.)
    labels, _ = ndimage.label(~ink)
    outside = labels[0, 0]
    faces = np.zeros_like(ink)
    for i, sl in enumerate(ndimage.find_objects(labels), start=1):
        if i != outside and sl[0].start > split:
            faces |= labels == i
    # Grow the faces under the ink (drawn on top) so no hairline shows between the two paths.
    faces = ndimage.binary_dilation(faces, iterations=2)

    return path_of(ink), path_of(faces), x1 - x0, y1 - y0


def logo_svg(d_ink, d_faces, w, h, ink, faces=None, bg=None, margin=0):
    """Full logo. faces=None leaves the faces transparent; bg adds a background with a margin."""
    W, H = w + 2 * margin, h + 2 * margin
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">']
    if bg:
        out.append(f'<rect width="{W}" height="{H}" fill="{bg}"/>')
    out.append(f'<g transform="translate({margin} {margin})">')
    if faces:
        out.append(f'<path fill="{faces}" d="{d_faces}"/>')
    out.append(f'<path fill="{ink}" fill-rule="evenodd" d="{d_ink}"/>')
    out.append("</g></svg>\n")
    return "".join(out)


def monogram_svg(ink, face, bg=None, stroke=16, slit=14, rounded=True):
    """The "A" of ACYLL. stroke/slit 7/5 match the logo; 16/14 stay readable at 16 px.

    With bg, the A sits in a 400×400 tile (rounded corners if `rounded`);
    without, the viewBox fits the letter and face=None leaves the face transparent.
    """
    # Measured on the PNG (source pixels): face 245×289, top radius 50, 3D offset 36.
    w, h, r, off = 245, 289, 50, 36
    c = math.cos(math.pi / 4) * r
    px, py = w - r + c, r - c
    # Face swept along (off, off): the black outline and 3D relief in one shape.
    relief = (f"M0 {h}V{r}A{r} {r} 0 0 1 {r} 0H{w - r}A{r} {r} 0 0 1 {num(px)} {num(py)}"
              f"L{num(px + off)} {num(py + off)}A{r} {r} 0 0 1 {w + off} {r + off}V{h + off}H{off}Z")
    s, fw, fh, fr = stroke, w - 2 * stroke, h - 2 * stroke, r - stroke
    inner = f"M{s} {s + fh}V{s + fr}A{fr} {fr} 0 0 1 {s + fr} {s}H{s + fw - fr}A{fr} {fr} 0 0 1 {s + fw} {s + fr}V{s + fh}Z"
    sx = num(w / 2 + 3 - slit / 2)
    slits = (f'<rect x="{sx}" y="99" width="{slit}" height="62" rx="{num(slit / 2)}"/>'
             f'<rect x="{sx}" y="217" width="{slit}" height="{h - 217}"/>')

    if bg:
        box = 400
        ox, oy = (box - (w + off)) / 2, (box - (h + off)) / 2
        head = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {box} {box}">'
                f'<rect width="{box}" height="{box}"{" rx=\"88\"" if rounded else ""} fill="{bg}"/>')
    else:
        m = 8
        ox = oy = m
        head = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w + off + 2 * m} {h + off + 2 * m}">'

    body = [head, f'<g transform="translate({num(ox)} {num(oy)})">']
    if face:
        body.append(f'<path fill="{ink}" d="{relief}"/><path fill="{face}" d="{inner}"/>')
        body.append(f'<g fill="{ink}">{slits}</g>')
    else:
        # Transparent face: cut the face out of the relief, keep the slits.
        body.append(f'<path fill="{ink}" fill-rule="evenodd" d="{relief}{inner}"/>')
        body.append(f'<g fill="{ink}">{slits}</g>')
    body.append("</g></svg>\n")
    return "".join(body)


def main():
    png, out_ts, out_favicon = sys.argv[1:4]
    d, _, w, h = trace(png)
    d_small, _, _, _ = trace(png, thicken=SMALL_THICKEN)
    with open(out_ts, "w") as f:
        f.write("// Generated by scripts/logo.py from the Canva PNG of the logo (« STUDIOS / ACYLL »).\n")
        f.write("// `logo` is faithful to the PNG; `logoSmall` has thicker ACYLL outlines for small sizes.\n")
        f.write(f"export const logo = {{ width: {w}, height: {h}, d: '{d}' }} as const;\n")
        f.write(f"export const logoSmall = {{ width: {w}, height: {h}, d: '{d_small}' }} as const;\n")
    with open(out_favicon, "w") as f:
        f.write(monogram_svg(BURGUNDY, CREAM, bg=RED))


if __name__ == "__main__":
    main()
