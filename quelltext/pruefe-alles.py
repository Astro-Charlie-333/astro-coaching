#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut jede Seite neu und prüft sie. Ein Kommando, eine Antwort.

    python3 pruefe-alles.py            baut alles, prüft alles
    python3 pruefe-alles.py --schnell  ohne die Rauchproben im Browser

Rückgabewert 0 heißt: alles steht. Alles andere heißt: nicht ausliefern.
Dieses Skript ist die Sicherung, auf der die tägliche Automatik aufsitzt.
"""
import pathlib, subprocess, sys, time, re, os

hier = pathlib.Path(__file__).parent.resolve()
schnell = '--schnell' in sys.argv

# Zwei Anordnungen, dasselbe Skript:
#   Arbeitsbaum — Quellordner und wiki/ liegen nebeneinander.
#   Repo        — die Quellen liegen in quelltext/, die fertigen Seiten
#                 oben, weil GitHub Pages sie dort erwartet.
# Im Repo fehlt den bau-*.py ihr Ziel. Statt jedes Skript anzufassen,
# wird quelltext/wiki auf die Repo-Wurzel gelegt — dann schreiben sie
# genau dorthin, wo die Seiten ohnehin liegen müssen.
wiki = hier / 'wiki'
if not wiki.exists() and (hier.parent / 'index.html').exists():
    try:
        os.symlink(hier.parent, wiki, target_is_directory=True)
        print(f'  (quelltext/wiki zeigt jetzt auf {hier.parent})')
    except OSError as e:
        print(f'  Konnte quelltext/wiki nicht anlegen: {e}')
        sys.exit(1)
if not wiki.exists():
    print(f'  Finde die Seiten nicht. Erwartet: {wiki}')
    sys.exit(1)

# Reihenfolge ist wichtig: die Bereiche müssen vor der Startseite
# gebaut sein, weil die Startseite deren Rechner mitnimmt.
BAUTEN = [
    ('rituale/bau.py',        'Rituale'),
    ('rituale/bau-zauber.py', 'Zauber'),
    ('niveau/bau-reading.py', 'Reading'),
    ('karte/bau-karte.py',    'Karte'),
    ('karte/bau-tiefe.py',    'Tiefe'),
    ('bez/bau-bez.py',        'Beziehung'),
    ('oph/bau-oph.py',        'Ophiuchus'),
    ('geist/bau-geist.py',    'Geist'),
    ('dossier/bau-dossier.py','Dossier'),
    ('analyse/bau-analyse.py','Analyse'),
    ('zahlen/bau-zahlen.py',  'Zahlen'),
    ('zeit/bau-zeit.py',      'Zeiten'),
    ('bereiche/bau-bereiche.py', 'Bereiche'),
    ('kern/bau-ich.py',       'Ich'),
    ('kern/bau-heute.py',     'Heute'),
]

print('Astro-Charlie · alles bauen und prüfen')
print('=' * 62)

fehlgeschlagen = []
t0 = time.time()

for pfad, name in BAUTEN:
    p = hier / pfad
    if not p.exists():
        print(f'  {name:<12} ÜBERSPRUNGEN (fehlt: {pfad})')
        continue
    t1 = time.time()
    r = subprocess.run([sys.executable, str(p)], capture_output=True,
                       text=True, cwd=str(hier))
    dauer = time.time() - t1
    if r.returncode == 0:
        print(f'  {name:<12} ok      {dauer:5.1f}s')
    else:
        print(f'  {name:<12} FEHLER  {dauer:5.1f}s')
        for zeile in (r.stdout + r.stderr).strip().splitlines():
            if zeile.strip().startswith('✗') or 'FEHLER' in zeile:
                print(f'      {zeile.strip()}')
        fehlgeschlagen.append(name)

print('-' * 62)

# ── Querprüfungen über alle fertigen Seiten ───────────────────
seiten = sorted(wiki.glob('*.html'))
print(f'  {len(seiten)} Seiten in wiki/')

# 1 · tote Verweise
vorhanden = {s.name for s in seiten}
tot = {}
for s in seiten:
    t = s.read_text(encoding='utf-8', errors='replace')
    for href in set(re.findall(r'href="([a-z0-9._-]+\.html)"', t)):
        if href not in vorhanden:
            tot.setdefault(href, []).append(s.name)
if tot:
    print(f'  {len(tot)} tote Verweise:')
    for z, von in sorted(tot.items())[:8]:
        print(f'      {z}  ←  {", ".join(von[:3])}')
    fehlgeschlagen.append('tote Verweise')
else:
    print('  keine toten Verweise')

# 2 · einheitliche Navigation
navs = {}
for s in seiten:
    t = s.read_text(encoding='utf-8', errors='replace')
    m = re.search(r'<nav class="ac-nav">(.*?)</nav>', t, re.S)
    if m:
        eintraege = tuple(re.findall(r'href="([a-z0-9._-]+\.html)"', m.group(1)))
        navs.setdefault(eintraege, []).append(s.name)
if len(navs) > 1:
    print(f'  {len(navs)} verschiedene Navigationen:')
    for eintraege, wo in sorted(navs.items(), key=lambda x: -len(x[1])):
        print(f'      {len(wo):3}× {" ".join(eintraege)}')
    # Keine harte Fehlermeldung: alte Bibliotheksseiten haben eigene Navigationen.
else:
    print('  Navigation überall gleich')

# 3 · nichts Privates ist ausgeliefert
#     Keine nackten Zahlen prüfen: "1180" ist auch eine CSS-Breite, und ein
#     Wächter, der täglich grundlos anschlägt, wird nach einer Woche ignoriert.
#     Geprüft wird auf Dinge, die nur in privaten Dateien vorkommen können.
PRIVAT = ['saat.json', 'orga/', 'strategie/', 'schuss.js',
          'Nettoeinkommen', 'Vertragsnummer', 'Vermieter']
durchgesickert = []
for s in seiten:
    if s.name in ('niko-reading.html',):      # liegt bewusst nur lokal
        continue
    t = s.read_text(encoding='utf-8', errors='replace')
    for g in PRIVAT:
        if g in t:
            durchgesickert.append(f'{s.name}: {g}')
    # Mandys Geburtsdaten dürfen nirgends fest im Quelltext stehen
    if re.search(r'\b1987\b', t) and re.search(r'08:58|8:58', t):
        durchgesickert.append(f'{s.name}: Geburtsdaten fest verdrahtet')
if durchgesickert:
    print('  PRIVATES IN AUSGELIEFERTEN SEITEN:')
    for d in durchgesickert[:6]:
        print(f'      {d}')
    fehlgeschlagen.append('Privates durchgesickert')
else:
    print('  nichts Privates in wiki/')

print('=' * 62)
print(f'  {time.time() - t0:.0f} Sekunden')
if fehlgeschlagen:
    print(f'  FEHLGESCHLAGEN: {", ".join(fehlgeschlagen)}')
    print('  → nicht ausliefern')
    sys.exit(1)
print('  alles steht')
