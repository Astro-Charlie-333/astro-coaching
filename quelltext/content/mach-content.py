#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Schreibt die Entwürfe einer Woche — drei Beiträge, fertig zum Produzieren.

    python3 content/mach-content.py

Legt content/entwuerfe/JJJJ-KWnn.md an. Die Rechnung kommt aus
content-rechner.js, die Texte aus bereiche/bereich-daten.js — damit
Beiträge und Plattform nie etwas Verschiedenes sagen können.

Am Ende prüft das Skript die Entwürfe gegen CONTENT-REGELN.md und
bricht ab, wenn ein Entwurf dagegen verstößt.
"""
import json, pathlib, subprocess, sys, re

hier = pathlib.Path(__file__).parent
wurzel = hier.parent
entwuerfe = hier / 'entwuerfe'
entwuerfe.mkdir(exist_ok=True)

# ── Rechnung holen ────────────────────────────────────────────
r = subprocess.run(['node', str(hier / 'content-rechner.js')],
                   capture_output=True, text=True, cwd=str(wurzel))
if r.returncode != 0:
    print('Die Rechnung lief nicht:\n' + (r.stderr or r.stdout)[-1500:])
    sys.exit(1)
D = json.loads(r.stdout)

SPRECHTEMPO = 2.2          # Wörter je Sekunde, ruhig gesprochen


def sekunden(text):
    return round(len(text.split()) / SPRECHTEMPO)


def satzende(s):
    """Sorgt dafür, dass ein eingesetzter Textbaustein sauber endet."""
    s = s.strip()
    return s if s.endswith(('.', '!', '?', '…')) else s + '.'


# ── Beitrag 1 · Karussell, nach Aszendent ─────────────────────
A = D['aufhaenger']

if A['art'] == 'station':
    richtung = 'wird wieder direktläufig' if A['direkt'] else 'wird rückläufig'
    titel = f"{A['planet']} {richtung} — {A['datum']['kurz']}"
    aufreisser = (f"{A['planet']} {richtung}. Am {A['datum']['kurz']}.")
    uebersetzung = satzende(A['was'])
    handgriff = satzende(A['tun'])
    nutzen = satzende(A['nutzen'])
elif A['art'] == 'lunation':
    art = 'Neumond' if A['mondart'] == 'neu' else 'Vollmond'
    titel = f"{art} in {A['zeichenName']} — {A['datum']['kurz']}"
    aufreisser = f"{art} am {A['datum']['kurz']}."
    uebersetzung = ('Ein guter Zeitpunkt, in einem bestimmten Bereich etwas anzufangen.'
                    if A['mondart'] == 'neu'
                    else 'Ein guter Zeitpunkt, in einem bestimmten Bereich etwas abzuschließen.')
    handgriff = ('Such dir eine Sache und fang sie an. Eine, nicht fünf.'
                 if A['mondart'] == 'neu'
                 else 'Such dir eine Sache und bring sie zu Ende. Eine, nicht fünf.')
    nutzen = 'Welcher Bereich das bei dir ist, hängt von deinem Aszendenten ab.'
else:
    titel = f"{A['planet']} steht in {A['zeichenName']}"
    aufreisser = f"{A['planet']} läuft gerade durch {A['zeichenName']}."
    uebersetzung = satzende(A['was'])
    handgriff = satzende(A['tun'])
    nutzen = satzende(A['nutzen'])

bilder = [
    ('1 · Aufhänger', aufreisser + '\n\nWas das für dich heißt, hängt von deinem Aszendenten ab.'),
    ('2 · Übersetzung', uebersetzung),
]
for x in A['proAszendent']:
    bilder.append((f"Aszendent {x['aszendent']}",
                   f"**{x['bereich']}**\n\n{x['worum']}"))
bilder.append(('Vorletztes · Handgriff', handgriff + '\n\n' + nutzen))
bilder.append(('Letztes · Hinweis',
               'Auf der Seite steht, wie lange das bei dir läuft und was dein '
               'Dauerthema in diesem Bereich ist.\n\nLink im Profil.'))

# ── Beitrag 2 · Reel mit Bildschirmaufnahme ───────────────────
# Der Bereich rotiert mit der Kalenderwoche. So ist über zehn Wochen
# jeder einmal dran, statt dass derselbe immer wieder kommt.
woche_nr = int(D['woche'].split('KW')[1])
B = D['bereiche'][woche_nr % len(D['bereiche'])]

reel = [
    ('Hook', 'Bildschirm: die Seite, noch nichts eingegeben',
     f"{B['frage']} Die meisten beantworten das aus dem Bauch. "
     f"Man kann es auch ausrechnen."),
    ('Was man sieht', 'Bildschirm: Geburtsdaten eingeben, die Bereiche erscheinen',
     f"Zehn Lebensbereiche, sortiert danach, wo gerade am meisten passiert. "
     f"Bei mir steht {B['name']} weit oben — bei dir kann ein ganz anderer oben stehen."),
    ('Was da steht', f"Bildschirm: {B['name']} aufklappen, langsam scrollen",
     f"{B['worum']}"),
    ('Der Punkt', 'Bildschirm: Block „Was du tun kannst"',
     f"{satzende(B['dauerthema'])}"),
    ('Abschluss', 'Bildschirm: Block „Wie lange das läuft"',
     'Und das Nützlichste daran ist nicht, dass da etwas los ist — sondern '
     'dass dabeisteht, wann es vorbei ist.'),
]

# ── Beitrag 3 · Das Ehrliche ──────────────────────────────────
E = D['ehrlich'][woche_nr % len(D['ehrlich'])]

# ── Schreiben ─────────────────────────────────────────────────
z = []
z.append(f"# Beiträge · {D['woche']}")
z.append('')
z.append(f"Erzeugt am {D['erzeugt']}. Gerechnet, nicht erfunden — "
         f"die Daten kommen aus derselben Engine wie die Plattform.")
z.append('')
z.append('Vor dem Produzieren: `content/CONTENT-REGELN.md` lesen. '
         'Besonders die Regel, dass der Titel den Fachbegriff nennen darf, der Rest nicht.')
z.append('')
z.append('---')
z.append('')

z.append(f"## Montag · Karussell — {titel}")
z.append('')
z.append(f"**{len(bilder)} Bilder.** Gestaltung nach den Marken-Farben in CONTENT-REGELN.md: "
         'Creme-Fläche, Nachtblau für Text, Messing für das eine hervorgehobene Wort.')
z.append('')
for name, text in bilder:
    z.append(f"**{name}**")
    z.append('')
    for zeile in text.split('\n'):
        z.append('> ' + zeile if zeile else '>')
    z.append('')
z.append('**Caption**')
z.append('')
z.append(f"> {aufreisser} {uebersetzung}")
z.append('>')
z.append('> Welcher Lebensbereich das bei dir ist, steht im Karussell — such deinen Aszendenten.')
z.append('>')
z.append('> Wenn du deinen Aszendenten nicht kennst: Der Rechner auf der Seite sagt ihn dir '
         'in zehn Sekunden, du brauchst nur Geburtsdatum, -zeit und -ort.')
z.append('')
z.append('---')
z.append('')

gesamt = 0
z.append(f"## Mittwoch · Reel — Bildschirmaufnahme, {B['name']}")
z.append('')
z.append('Kein Gesicht. Du nimmst die Seite auf und sprichst darüber. '
         'Der erste Satz steht zusätzlich als Text im Bild, damit er ohne Ton funktioniert.')
z.append('')
z.append('| Abschnitt | Was man sieht | Sprechtext | Dauer |')
z.append('|---|---|---|---|')
for name, bild, text in reel:
    s = sekunden(text)
    gesamt += s
    z.append(f"| **{name}** | {bild} | {text} | {s} s |")
z.append('')
z.append(f"**Gesamt rund {gesamt} Sekunden** bei ruhigem Sprechtempo.")
z.append('')
z.append('**Caption**')
z.append('')
z.append(f"> {B['frage']}")
z.append('>')
z.append(f"> {B['dauerthema']}")
z.append('')
z.append('---')
z.append('')

z.append('## Freitag · Einzelbild — das Ehrliche')
z.append('')
z.append('Ein Satz, eine Fläche, sonst nichts. Das ist der Beitragstyp, der dich '
         'von allen anderen in diesem Feld unterscheidet — damit nicht sparen.')
z.append('')
z.append('**Bild**')
z.append('')
z.append(f"> {E['frage']}")
z.append('>')
z.append(f"> {E['antwort']}")
z.append('')
z.append('**Caption**')
z.append('')
z.append('> Ich finde, das gehört dazugesagt. Eine Methode, die nie zugibt, wo sie '
         'aufhört, ist keine Methode, sondern ein Versprechen.')
z.append('')
z.append('---')
z.append('')

z.append('## Zum Nachschlagen · was sonst noch läuft')
z.append('')
z.append('| Wanderer | Zeichen | noch bis |')
z.append('|---|---|---|')
for s in D['stand']:
    bis = s['bis']['kurz'] + ' ' + str(s['bis']['jahr']) if s['bis'] else 'offen'
    z.append(f"| {s['planet']}{' ℞' if s['rueck'] else ''} | {s['zeichenName']} | {bis} |")
z.append('')
if D['lunationen']:
    z.append('**Mondphasen:** ' + ' · '.join(
        f"{'Neumond' if l['art'] == 'neu' else 'Vollmond'} am {l['datum']['kurz']} "
        f"in {l['zeichenName']}" for l in D['lunationen']))
    z.append('')
if D['stationen']:
    z.append('**Wendepunkte:** ' + ' · '.join(
        f"{s['planet']} {'direkt' if s['direkt'] else 'rückläufig'} ab {s['datum']['kurz']}"
        for s in D['stationen']))
    z.append('')

ziel = entwuerfe / f"{D['woche']}.md"
text = '\n'.join(z) + '\n'
ziel.write_text(text, encoding='utf-8')

# ── Prüfen ────────────────────────────────────────────────────
fehler = []

# 1 · Verbotene Sprache
VERBOTEN = {
    'Universum': 'Mystik-Vokabular',
    'manifestier': 'Mystik-Vokabular',
    'Schicksal': 'Schicksalsrhetorik',
    'vorbestimmt': 'Schicksalsrhetorik',
    'wird dein': 'Zukunftsversprechen',
    'Achtung': 'Angst als Hebel',
    'Vorsicht': 'Angst als Hebel',
    'Hey ihr Lieben': 'Begrüßungsfloskel',
    'folg mir': 'Aufforderung statt Inhalt',
    'Banane': 'kein Maskottchen mehr',
    'Charlie': 'kein Maskottchen mehr',
}
for wort, grund in VERBOTEN.items():
    if re.search(re.escape(wort), text, re.I):
        fehler.append(f'„{wort}" steht im Entwurf ({grund})')

# 2 · Kein Beitrag darf reine Fachsprache sein: nach dem Aufhänger
#     muss im selben Beitrag eine Übersetzung ins Leben stehen.
if len(uebersetzung) < 60:
    fehler.append('die Übersetzung ins Leben ist zu dünn')
FACHWORT = ['Konjunktion', 'Quadrat', 'Trigon', 'Sextil', 'Orbis', 'Aszendent',
            'rückläufig', 'direktläufig', 'Neumond', 'Vollmond', 'Haus']
for name, inhalt in bilder[1:-2]:
    if name.startswith('Aszendent'):
        continue
    treffer = [w for w in FACHWORT if w in inhalt]
    if treffer and len(inhalt) < 90:
        fehler.append(f'„{name}" ist fast nur Fachsprache ({", ".join(treffer)}) '
                      'und übersetzt nichts ins Leben')

# 3 · Vollständigkeit
if len(bilder) < 14:
    fehler.append(f'nur {len(bilder)} Karussellbilder — zwölf Aszendenten plus Rahmen fehlen')
aszendenten = [b[0] for b in bilder if b[0].startswith('Aszendent')]
if len(aszendenten) != 12:
    fehler.append(f'{len(aszendenten)} statt 12 Aszendenten im Karussell')
if len(set(aszendenten)) != 12:
    fehler.append('ein Aszendent kommt doppelt vor')
leer = [n for n, t in bilder if len(t.strip()) < 15]
if leer:
    fehler.append('leere Karussellbilder: ' + ', '.join(leer))

# 4 · Das Reel muss in die Länge passen, die die Plattformen zeigen
if gesamt < 18:
    fehler.append(f'das Reel ist mit {gesamt} s zu kurz')
if gesamt > 55:
    fehler.append(f'das Reel ist mit {gesamt} s zu lang — unter 45 s halten')

# 5 · Keine Geburtsdaten von irgendwem.
#     Der eigene Erzeugungsstempel oben ist kein Geburtsdatum.
koerper = '\n'.join(zl for zl in text.splitlines() if not zl.startswith('Erzeugt am'))
if re.search(r'\b(19|20)\d{2}\b.{0,20}\b\d{1,2}[:.]\d{2}\b', koerper):
    fehler.append('da steht etwas, das wie ein Geburtsdatum mit Uhrzeit aussieht')
if re.search(r'\b\d{1,2}\.\d{1,2}\.(19|20)\d{2}\b', koerper):
    fehler.append('da steht ein vollständiges Datum im Geburtsdatumsformat')

# 6 · Deutsche Zahlen mit Komma
m = re.search(r'\d\.\d', text)
if m and 'Uhr' not in text[max(0, m.start()-20):m.start()+20]:
    fehler.append(f'Dezimalpunkt statt Komma: „{m.group(0)}"')

print(f"{ziel.name}  {len(text):,} Zeichen  →  {ziel}")
print(f"  Karussell mit {len(bilder)} Bildern · Reel {gesamt} s · ein Einzelbild")
if fehler:
    print('\nFEHLER:')
    for f in fehler:
        print('  ✗ ' + f)
    sys.exit(1)
print('  ✓ gegen CONTENT-REGELN.md geprüft')
