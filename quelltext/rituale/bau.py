#!/usr/bin/env python3
"""Setzt rituale.html zusammen und legt sie in der Plattform ab."""
import pathlib, re, sys

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'

basis   = (hier / 'basis.css').read_text(encoding='utf-8')
stil    = (hier / 'stil.css').read_text(encoding='utf-8')
koerper = (hier / 'koerper.html').read_text(encoding='utf-8')
engine  = (hier / 'engine.js').read_text(encoding='utf-8')
inhalt  = (hier / 'inhalt.js').read_text(encoding='utf-8')
app     = (hier / 'app.js').read_text(encoding='utf-8')

kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Rituale &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<style>
"""

html = (kopf + basis + "\n" + stil + "</style></head><body>\n"
        + koerper
        + "\n<script>\n" + engine + "\n" + inhalt + "\n" + app + "\n</script>\n</body></html>\n")

ziel = wiki / 'rituale.html'
ziel.write_text(html, encoding='utf-8')

# ── Prüfungen ────────────────────────────────────────────
fehler = []

ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""getElementById\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
fehlt = gesucht - ids
if fehlt:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(fehlt)))
unbenutzt = ids - gesucht
if unbenutzt:
    print('  nur im HTML: ' + ', '.join(sorted(unbenutzt)))

auf, zu = len(re.findall(r'<div\b', koerper)), len(re.findall(r'</div>', koerper))
if auf != zu:
    fehler.append(f'div-Bilanz im Körper: {auf} auf, {zu} zu')

dopp = {i for i in re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper)
        if re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper).count(i) > 1}
if dopp:
    fehler.append('doppelte IDs: ' + ', '.join(sorted(dopp)))

print(f'rituale.html  {ziel.stat().st_size:,} Bytes  →  {ziel}')
for f in fehler:
    print('  FEHLER: ' + f)
sys.exit(1 if fehler else 0)
