#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Die Schriften liegen bei uns, nicht bei Google.

Mandy am 24.11.: Die Seite soll richtig online gehen. Bis dahin holte
jede Seite Jost, DM Sans und JetBrains Mono von fonts.googleapis.com.
Dabei geht die IP-Adresse jeder Besucherin an Google, ohne dass sie
gefragt wurde — in Deutschland ist das abgemahnt worden (LG München I,
20.01.2022). Deshalb liegen die Dateien jetzt im Ordner schriften/ neben
den Seiten, und jede Seite lädt sie von dort.

    quelltext/schriften/dateien/   die woff2-Dateien und ihre Lizenzen
                                   (SIL Open Font License, aus fontsource 5.3.0)
    schriften/                     dasselbe oben, wo GitHub Pages es ausliefert
    schriften/schriften.css        die @font-face-Regeln unter den alten
                                   Namen — sonst ändert sich nichts am Stil

Prüft danach, dass keine Seite und keine Quelle mehr zu Google geht.
Läuft in pruefe-alles.py als letzte Prüfung, wenn alle Seiten gebaut sind;
als erster Schritt legt es die Dateien ab.
"""
import pathlib, shutil, sys, re

hier = pathlib.Path(__file__).parent.resolve()
wurzel = hier.parent.parent
quelle = hier / 'dateien'
ziel = wurzel / 'schriften'

LATIN = ('U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,'
         'U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,'
         'U+2212,U+2215,U+FEFF,U+FFFD')
LATIN_EXT = ('U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,'
             'U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,'
             'U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF')

# Name, Stil, Gewichte, Datei-Stamm. Die Namen sind dieselben wie bei
# Google, damit kein Stylesheet angefasst werden muss.
SCHNITTE = [
    ('Jost', 'normal', '100 900', 'jost-{t}-wght-normal'),
    ('Jost', 'italic', '100 900', 'jost-{t}-wght-italic'),
    ('DM Sans', 'normal', '100 1000', 'dm-sans-{t}-opsz-normal'),
    ('JetBrains Mono', 'normal', '100 800', 'jetbrains-mono-{t}-wght-normal'),
]

css = ['/* Selbst ausgelieferte Schriften (SIL Open Font License, siehe OFL-*.txt).\n'
       '   Gebaut von quelltext/schriften/bau-schriften.py — nicht von Hand ändern. */']
for name, stil, gew, stamm in SCHNITTE:
    for teil, bereich in (('latin-ext', LATIN_EXT), ('latin', LATIN)):
        datei = stamm.format(t=teil) + '.woff2'
        if not (quelle / datei).exists():
            print('  ✗ Schriftdatei fehlt: ' + datei)
            sys.exit(1)
        css.append("@font-face{font-family:'%s';font-style:%s;font-display:swap;"
                   "font-weight:%s;src:url(%s) format('woff2');unicode-range:%s;}"
                   % (name, stil, gew, datei, bereich))

ziel.mkdir(exist_ok=True)
for f in quelle.iterdir():
    shutil.copyfile(f, ziel / f.name)
(ziel / 'schriften.css').write_text('\n'.join(css) + '\n', encoding='utf-8')

# ── Prüfung: nichts geht mehr zu Google ─────────────────────
# Fehlerklasse: Eine neue Seite kopiert den alten Kopf mit dem
# Google-Link, und niemand merkt es, weil sie genauso aussieht.
fehler = []
GOOGLE = re.compile(r'fonts\.(?:googleapis|gstatic)\.com')
for p in sorted(wurzel.glob('*.html')):
    t = p.read_text(encoding='utf-8', errors='replace')
    if GOOGLE.search(t):
        fehler.append(p.name + ' lädt Schriften von Google')
    elif re.search(r"font-family:[^;}]*(?:Jost|DM Sans)", t) and 'schriften/schriften.css' not in t:
        fehler.append(p.name + ' benutzt Jost oder DM Sans, bindet schriften.css aber nicht ein')
for p in sorted(wurzel.joinpath('quelltext').rglob('*')):
    if p.is_symlink() or 'wiki' in p.relative_to(wurzel).parts[:2]:
        continue
    if p.suffix in ('.py', '.js', '.html', '.css') and p.is_file() and p != pathlib.Path(__file__).resolve():
        if GOOGLE.search(p.read_text(encoding='utf-8', errors='replace')):
            fehler.append(str(p.relative_to(wurzel)) + ' verweist noch auf Google')

if fehler:
    for f in fehler[:20]:
        print('  ✗ ' + f)
    if len(fehler) > 20:
        print('  ✗ … und %d weitere' % (len(fehler) - 20))
    sys.exit(1)
seiten = len(list(wurzel.glob('*.html')))
print('  Schriften: %d Dateien bei uns, %d Seiten ohne Google' % (len(list(quelle.glob('*.woff2'))), seiten))
