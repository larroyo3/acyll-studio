"""Shape fixed brand words with HarfBuzz and export them as SVG path data.

The brand fonts are commercial and are never committed: this script turns the few words
the site needs into outlines (src/data/wordmarks.ts) and draws the favicon.

Usage:
  pip install fonttools uharfbuzz
  python scripts/wordmarks.py <Hitch-hike.otf> <TANHEADLINE-Regular.otf> src/data/wordmarks.ts public/favicon.svg
"""
import json
import sys

import uharfbuzz as hb
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont


def shape(path, text):
    blob = hb.Blob.from_file_path(path)
    face = hb.Face(blob)
    font = hb.Font(face)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font, buf, {"kern": True, "liga": True, "calt": True})
    return buf.glyph_infos, buf.glyph_positions


def wordmark(path, text):
    tt = TTFont(path)
    glyph_set = tt.getGlyphSet()
    order = tt.getGlyphOrder()
    upm = tt["head"].unitsPerEm
    asc = tt["hhea"].ascent
    infos, positions = shape(path, text)

    svg_pen = SVGPathPen(glyph_set, ntos=lambda v: ("%.1f" % v).rstrip("0").rstrip("."))
    bounds = BoundsPen(glyph_set)
    x = 0
    for info, pos in zip(infos, positions):
        name = order[info.codepoint]
        # Flip Y so the baseline sits at y=0 and ascenders go negative (SVG space).
        t = (1, 0, 0, -1, x + pos.x_offset, -pos.y_offset)
        glyph_set[name].draw(TransformPen(svg_pen, t))
        glyph_set[name].draw(TransformPen(bounds, t))
        x += pos.x_advance

    x_min, y_min, x_max, y_max = bounds.bounds
    return {
        "d": svg_pen.getCommands(),
        "upm": upm,
        "ascent": asc,
        "advance": x,
        # Ink box in SVG space (y down), used by callers that want a tight fit.
        "ink": [round(x_min), round(y_min), round(x_max - x_min), round(y_max - y_min)],
    }


def main():
    hitch, tan, out_ts, out_favicon = sys.argv[1:5]
    marks = {
        "acyll": wordmark(hitch, "Acyll"),
        "lucas": wordmark(hitch, "Lucas"),
        "acyllStudio": wordmark(tan, "Acyll Studio"),
    }
    with open(out_ts, "w") as f:
        f.write("// Generated from the brand fonts (Hitch Hike, TAN Headline) by shaping each word\n")
        f.write("// and exporting outlines, so no font file is shipped. Units are font units, y=0 is the baseline.\n")
        f.write("export const wordmarks = ")
        f.write(json.dumps(marks, indent=2))
        f.write(" as const;\n\nexport type WordmarkName = keyof typeof wordmarks;\n")

    a = wordmark(hitch, "A")
    ix, iy, iw, ih = a["ink"]
    size = max(iw, ih)
    pad = size * 0.22
    box = size + pad * 2
    # Center the ink box of the glyph inside a rounded square.
    tx = -ix + (box - iw) / 2
    ty = -iy + (box - ih) / 2
    with open(out_favicon, "w") as f:
        f.write(
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {box:.0f} {box:.0f}">'
            f'<rect width="{box:.0f}" height="{box:.0f}" rx="{box * 0.22:.0f}" fill="#9e001a"/>'
            f'<path transform="translate({tx:.1f} {ty:.1f})" fill="#fffcfc" d="{a["d"]}"/></svg>\n'
        )


if __name__ == "__main__":
    main()
