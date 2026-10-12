#!/usr/bin/env python3
"""Setzt geistfuehrung.html zusammen und legt sie in der Plattform ab."""
import pathlib, re, sys

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit  = hier.parent / 'rituale'

def lies(p):
    return p.read_text(encoding='utf-8')

css_basis = lies(rit / 'basis.css')
css_eigen = lies(hier / 'geist-stil.css')
koerper   = lies(hier / 'geist-koerper.html')
js = [lies(rit / 'engine.js'), lies(rit / 'himmel.js'),
      lies(wiki / 'kleine-punkte.js'), lies(hier / 'geist-inhalt.js'),
      lies(hier / 'geist-app.js')]

kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mit wem du arbeitest &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<style>
"""

html = (kopf + css_basis + "\n" + css_eigen
        + '</style><script src="niveau.js" defer></script>\n'
          '<script src="wortwahl.js" defer></script>\n</head><body>\n'
        + koerper + "\n<script>\n" + "\n".join(js) + "\n</script>\n</body></html>\n")

ziel = wiki / 'geistfuehrung.html'
ziel.write_text(html, encoding='utf-8')

# ── Prüfungen ────────────────────────────────────────────────
fehler, hinweise = [], []
app = lies(hier / 'geist-app.js')

ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
fehlt = gesucht - ids
if fehlt:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(fehlt)))
if ids - gesucht:
    hinweise.append('nur im HTML: ' + ', '.join(sorted(ids - gesucht)))

auf, zu = len(re.findall(r'<div\b', koerper)), len(re.findall(r'</div>', koerper))
if auf != zu:
    fehler.append(f'div-Bilanz im Körper: {auf} auf, {zu} zu')

alle = re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper)
dopp = {i for i in alle if alle.count(i) > 1}
if dopp:
    fehler.append('doppelte IDs: ' + ', '.join(sorted(dopp)))

# Jeder Inhaltsschlüssel, den die App nachschlägt, muss es auch geben
inhalt = lies(hier / 'geist-inhalt.js')

for tafel in ['TUER', 'TUERZEICHEN', 'KANAL', 'KANALZUSTAND', 'NEPTUN', 'NEPTUNHAUS',
              'GLAUBE', 'GLAUBEHAUS', 'SEKTE', 'PHASEN', 'RHYTHMUS', 'MONDSATURN',
              'ACHT', 'CHIRON']:
    if not re.search(r'\bvar ' + tafel + r'\s*=', inhalt):
        fehler.append(f'Tafel {tafel} fehlt in geist-inhalt.js')
    if tafel not in app:
        hinweise.append(f'Tafel {tafel} wird nie benutzt')

# Namenskollisionen: alles liegt in einem <script>, also im gleichen Geltungsbereich.
# Diese vier überschreiben die Engine absichtlich und verhaltensgleich.
ERLAUBT = {'nrm', 'datVon', 'gewaehlt', 'chartVon'}


def oben(text):
    return set(re.findall(r'^(?:var|function)\s+([A-Za-z_$][\w$]*)', text, re.M))


fremd = oben(lies(rit / 'engine.js')) | oben(lies(rit / 'himmel.js'))
eigen = oben(app) | oben(inhalt)
koll = (eigen & fremd) - ERLAUBT
if koll:
    fehler.append('Namenskollision mit engine.js/himmel.js: ' + ', '.join(sorted(koll)))

# Tote Verweise innerhalb der Plattform
for href in sorted(set(re.findall(r'href="([a-z0-9_-]+\.html)"', koerper))):
    if not (wiki / href).exists():
        fehler.append('Verweis ins Leere: ' + href)

print(f'geistfuehrung.html  {ziel.stat().st_size:,} Bytes  →  {ziel}')
for h in hinweise:
    print('  Hinweis: ' + h)
for f in fehler:
    print('  FEHLER: ' + f)
sys.exit(1 if fehler else 0)
