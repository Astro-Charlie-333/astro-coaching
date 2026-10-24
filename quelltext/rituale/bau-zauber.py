#!/usr/bin/env python3
"""Setzt zauber.html zusammen und legt sie in der Plattform ab."""
import pathlib, re, sys

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'

teile = {n: (hier / n).read_text(encoding='utf-8') for n in
         ['basis.css', 'zauber-stil.css', 'zauber-koerper.html', 'engine.js',
          'himmel.js', 'zauber-inhalt.js', 'zauber-person.js', 'zauber-app.js']}

kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Zimt, Rosen, Steine &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<style>
"""

html = (kopf + teile['basis.css'] + "\n" + teile['zauber-stil.css'] + "</style></head><body>\n"
        + teile['zauber-koerper.html']
        + "\n<script>\n"
        + teile['engine.js'] + "\nvar window=window||{};\n"
        + teile['himmel.js'] + "\n"
        + teile['zauber-inhalt.js'] + "\n"
        + teile['zauber-person.js'] + "\n"
        + teile['zauber-app.js']
        + "\n</script>\n</body></html>\n")
# himmel.js hängt sich an window; im Seitenkontext ist das ohnehin global
html = html.replace("\nvar window=window||{};\n", "\n")

ziel = wiki / 'zauber.html'
# Die App-Ansicht: Manifest, Symbol, Zwischenspeicher. Die Zeilen dafür
# stehen in app/app-kopf.html — an einer Stelle für alle Seiten.
html = html.replace('<head>', '<head>' + (hier.parent / 'app' / 'app-kopf.html').read_text(encoding='utf-8'), 1)
ziel.write_text(html, encoding='utf-8')

fehler = []
koerper = teile['zauber-koerper.html']
app = teile['zauber-app.js']
ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
fehlt = gesucht - ids
if fehlt:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(fehlt)))
unbenutzt = ids - gesucht
if unbenutzt:
    print('  nur im HTML: ' + ', '.join(sorted(unbenutzt)))

auf, zu = len(re.findall(r'<div\b', koerper)), len(re.findall(r'</div>', koerper))
if auf != zu:
    fehler.append(f'div-Bilanz: {auf} auf, {zu} zu')
alle = re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper)
dopp = {i for i in alle if alle.count(i) > 1}
if dopp:
    fehler.append('doppelte IDs: ' + ', '.join(sorted(dopp)))

print(f'zauber.html  {ziel.stat().st_size:,} Bytes  →  {ziel}')
for f in fehler:
    print('  FEHLER: ' + f)
sys.exit(1 if fehler else 0)
