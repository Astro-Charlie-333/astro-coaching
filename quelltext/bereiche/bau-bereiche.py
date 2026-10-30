#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut bereiche.html — zehn Lebensbereiche, sortiert nach dem, was gerade läuft.

Die wichtigste Prüfung hier ist die letzte: Auf Wissensstufe 0 darf kein
einziges Fachwort sichtbar sein. Kein Planetenname, kein Haus, kein Aspekt.
Wer das verletzt, kommt nicht durch den Bau.
"""
import pathlib, re, sys, subprocess, json

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit  = hier.parent / 'rituale'
zeit = hier.parent / 'zeit'

lies = lambda p: p.read_text(encoding='utf-8')

kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Was bei dir gerade los ist &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<script src="kleine-punkte.js"></script>
<style>
"""

html = (kopf + lies(rit / 'basis.css') + "\n" + lies(hier / 'bereich-stil.css')
        + "\n" + lies(hier / 'wahl-stil.css')
        + '</style><script src="niveau.js" defer></script>\n'
          '<script src="wortwahl.js" defer></script>\n</head><body>\n'
        + lies(hier / 'bereich-koerper.html') + "\n<script>\n"
        + lies(rit / 'engine.js') + "\n"
        + lies(zeit / 'zeit-rechner.js') + "\n"
        # Die Liste der Bereiche vor allem anderen: der Rechner holt
        # sie dort, und die Auswahl-Leiste auch.
        + lies(hier / 'lebensbereiche.js') + "\n"
        + lies(hier / 'bereich-rechner.js') + "\n"
        + lies(hier / 'bereich-daten.js') + "\n"
        # Die gemeinsamen Sätze und der Tiefgang: nach den Daten,
        # weil beides sie braucht, und vor der Anzeige.
        + lies(hier / 'tief-bauer.js') + "\n"
        + lies(hier / 'wahl-daten.js') + "\n"
        + lies(hier / 'wahl-app.js') + "\n"
        + lies(hier / 'bereich-app.js')
        + "\n</script>\n</body></html>\n")

ziel = wiki / 'bereiche.html'
# Die App-Ansicht: Manifest, Symbol, Zwischenspeicher. Die Zeilen dafür
# stehen in app/app-kopf.html — an einer Stelle für alle Seiten.
html = html.replace('<head>', '<head>' + (hier.parent / 'app' / 'app-kopf.html').read_text(encoding='utf-8'), 1)
ziel.write_text(html, encoding='utf-8')

fehler, hinweise = [], []
koerper = lies(hier / 'bereich-koerper.html')
app     = lies(hier / 'bereich-app.js')
daten   = lies(hier / 'bereich-daten.js')
rechner = lies(hier / 'bereich-rechner.js')
bauer   = lies(hier / 'tief-bauer.js')
felder  = lies(hier / 'lebensbereiche.js')
wdaten  = lies(hier / 'wahl-daten.js')
wapp    = lies(hier / 'wahl-app.js')

BEREICHE = ['liebe', 'beruf', 'gesundheit', 'geld', 'familie',
            'freunde', 'freude', 'selbstwert', 'sinn', 'umbruch']
WANDERER = ['Pluto', 'Neptun', 'Uranus', 'Saturn', 'Jupiter',
            'Mars', 'Venus', 'Merkur', 'Sonne']
ARTEN    = ['zusammen', 'gegenueber', 'spannung', 'leicht']

# ── 1 · Verdrahtung ────────────────────────────────────────────
ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""getElementById\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
# Bereichs-IDs entstehen erst zur Laufzeit
gesucht = {g for g in gesucht if not g.startswith('ber-')}
if gesucht - ids:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(gesucht - ids)))
if 'berwahl' not in ids:
    fehler.append('die Leiste für die Bereichsauswahl fehlt im Körper')
if 'nivleiste' not in ids:
    fehler.append('die Leiste für den Wissensstand fehlt')

auf, zu = len(re.findall(r'<div\b', koerper)), len(re.findall(r'</div>', koerper))
if auf != zu:
    fehler.append(f'div-Bilanz: {auf} auf, {zu} zu')
for tag in ('section', 'nav', 'details'):
    a, z = len(re.findall(r'<%s\b' % tag, koerper)), len(re.findall(r'</%s>' % tag, koerper))
    if a != z:
        fehler.append(f'{tag}-Bilanz: {a} auf, {z} zu')

# ── 2 · Namenskollisionen ──────────────────────────────────────
def oben(t):
    return set(re.findall(r'^(?:var|function)\s+([A-Za-z_$][\w$]*)', t, re.M))
koll = (oben(app) | oben(daten) | oben(rechner)) & oben(lies(rit / 'engine.js'))
if koll:
    fehler.append('Namenskollision mit der Rechen-Engine: ' + ', '.join(sorted(koll)))

# ── 3 · Vollständigkeit der Texte ──────────────────────────────
def klammerblock(text, start):
    tiefe, i = 0, start
    while i < len(text):
        if text[i] == '{':
            tiefe += 1
        elif text[i] == '}':
            tiefe -= 1
            if tiefe == 0:
                return text[start:i + 1]
        i += 1
    return ''

def feld(block, name):
    m = re.search(r"\b" + name + r":\s*'((?:[^'\\]|\\.)*)'", block)
    return m.group(1) if m else None

# die zehn Bereiche
lay_texte = []          # alles, was ein Laie auf Stufe 0 sieht
for b in BEREICHE:
    m = re.search(r"^\s{4}" + b + r":\s*\{", daten, re.M)
    if not m:
        fehler.append(f'Bereich {b} fehlt in B_BER')
        continue
    blk = klammerblock(daten, m.end() - 1)
    for f_ in ('frage', 'worum', 'nomen', 'meistern', 'techFeld'):
        v = feld(blk, f_)
        if not v:
            fehler.append(f'Bereich {b}: {f_} fehlt')
        elif f_ in ('worum', 'meistern') and len(v) < 60:
            fehler.append(f'Bereich {b}: {f_} nur {len(v)} Zeichen — zu dünn')
        if v and f_ != 'techFeld':
            lay_texte.append((f'B_BER.{b}.{f_}', v))
    saetze = re.findall(r"'((?:[^'\\]|\\.)*)'", (feld_block := re.search(
        r"lautSatz:\s*\[(.*?)\]", blk, re.S).group(1) if re.search(r"lautSatz:\s*\[", blk) else ''))
    if len(saetze) != 4:
        fehler.append(f'Bereich {b}: {len(saetze)} statt 4 Sätze in lautSatz')
    for i, s in enumerate(saetze):
        if len(s) < 25:
            fehler.append(f'Bereich {b}: lautSatz {i} nur {len(s)} Zeichen')
        lay_texte.append((f'B_BER.{b}.lautSatz[{i}]', s))

# die neun Wanderer
for w in WANDERER:
    m = re.search(r"^\s{4}" + w + r":\s*\{", daten, re.M)
    if not m:
        fehler.append(f'Wanderer {w} fehlt in B_WAND')
        continue
    blk = klammerblock(daten, m.end() - 1)
    for f_ in ('was', 'tempo', 'tun', 'nutzen', 'tech'):
        v = feld(blk, f_)
        if not v:
            fehler.append(f'Wanderer {w}: {f_} fehlt')
            continue
        if f_ == 'was' and len(v) < 90:
            fehler.append(f'Wanderer {w}: was nur {len(v)} Zeichen — zu dünn')
        if f_ in ('tun', 'nutzen') and len(v) < 40:
            fehler.append(f'Wanderer {w}: {f_} nur {len(v)} Zeichen — zu dünn')
        if f_ != 'tech':
            lay_texte.append((f'B_WAND.{w}.{f_}', v))
    if feld(blk, 'tech') != w:
        fehler.append(f'Wanderer {w}: tech muss genau "{w}" sein')

# die vier Arten
for a in ARTEN:
    m = re.search(r"^\s{4}" + a + r":\s*\{", daten, re.M)
    if not m:
        fehler.append(f'Art {a} fehlt in B_ART')
        continue
    blk = klammerblock(daten, m.end() - 1)
    for f_ in ('wie', 'ton', 'tech'):
        v = feld(blk, f_)
        if not v:
            fehler.append(f'Art {a}: {f_} fehlt')
        elif f_ == 'wie':
            if len(v) < 40:
                fehler.append(f'Art {a}: wie nur {len(v)} Zeichen')
            lay_texte.append((f'B_ART.{a}.wie', v))

# die zwölf Felder
haeuser = re.findall(r"^\s{4}(\d+):\s*\{\s*kurz:'((?:[^'\\]|\\.)*)'", daten, re.M)
if len(haeuser) != 12:
    fehler.append(f'{len(haeuser)} statt 12 Felder in B_HAUS')
gefunden = {int(h[0]) for h in haeuser}
if gefunden != set(range(1, 13)):
    fehler.append('B_HAUS deckt nicht genau 1 bis 12 ab: ' + str(sorted(gefunden)))
for nr, kurz in haeuser:
    lay_texte.append((f'B_HAUS.{nr}.kurz', kurz))
    m = re.search(r"^\s{4}" + nr + r":\s*\{", daten, re.M)
    blk = klammerblock(daten, m.end() - 1)
    mt = feld(blk, 'meistern')
    if not mt:
        fehler.append(f'Feld {nr}: meistern fehlt')
    else:
        if len(mt) < 35:
            fehler.append(f'Feld {nr}: meistern nur {len(mt)} Zeichen')
        lay_texte.append((f'B_HAUS.{nr}.meistern', mt))

# die Facetten je Bereich
# Fehlerklasse: ein Bereich, der im Dauerthema nur einen Satz hergibt,
# ist keine Tiefe, sondern eine Behauptung. Geprüft wird deshalb die
# Zahl der Facetten, ihre Mindestlänge und dass jede an einem Feld
# hängt, das wirklich zu diesem Bereich gehört.
FACET_MIND = 3            # so viele zeigt die Seite
FACET_VORRAT = 1          # so viele müssen darüber hinaus bereitstehen,
                          # sonst kann das Chart nichts umsortieren
m_fac = re.search(r"var B_FACET = \{", daten)
if not m_fac:
    fehler.append('B_FACET fehlt — die Bereiche haben keine Facetten')
else:
    fac_block = klammerblock(daten, m_fac.end() - 1)
    # welche Felder gehören zu welchem Bereich — aus lebensbereiche.js,
    # der einen Liste, nicht doppelt gepflegt
    HAEUSER = {}
    for mb in re.finditer(r"k:'(\w+)',\s*name:'[^']*',\s*haeuser:\[([\d,\s]+)\]", felder):
        HAEUSER[mb.group(1)] = [int(x) for x in mb.group(2).split(',')]
    if set(HAEUSER) != set(BEREICHE):
        fehler.append('die Felder der Bereiche sind in lebensbereiche.js '
                      'nicht lesbar: ' + str(sorted(HAEUSER)))
    for b in BEREICHE:
        mb = re.search(r"^\s{4}" + b + r":\s*\[", fac_block, re.M)
        if not mb:
            fehler.append(f'Bereich {b}: keine Facetten in B_FACET')
            continue
        # bis zur schließenden Klammer dieses Bereichs
        rest = fac_block[mb.end():]
        tiefe, ende = 1, len(rest)
        for i, c in enumerate(rest):
            if c == '[':
                tiefe += 1
            elif c == ']':
                tiefe -= 1
                if tiefe == 0:
                    ende = i
                    break
        liste = rest[:ende]
        eintraege = []
        for me in re.finditer(r"\{\s*k:'(\w+)',\s*haus:(\d+),\s*wer:\[([^\]]*)\],", liste):
            blk = klammerblock(liste, me.start())
            eintraege.append((me.group(1), int(me.group(2)),
                              re.findall(r"'(\w+)'", me.group(3)), blk))
        if len(eintraege) < FACET_MIND + FACET_VORRAT:
            fehler.append(f'Bereich {b}: {len(eintraege)} Facetten — '
                          f'mindestens {FACET_MIND + FACET_VORRAT} nötig '
                          f'({FACET_MIND} werden gezeigt, der Rest ist der Vorrat, '
                          f'aus dem das Chart umsortiert)')
        if len({e[0] for e in eintraege}) != len(eintraege):
            fehler.append(f'Bereich {b}: zwei Facetten haben denselben Schlüssel')
        for k_, haus_, wer_, blk in eintraege:
            if b in HAEUSER and haus_ not in HAEUSER[b]:
                fehler.append(f'Facette {b}/{k_} hängt an Feld {haus_}, '
                              f'das gehört nicht zu diesem Bereich {HAEUSER[b]}')
            if not wer_:
                fehler.append(f'Facette {b}/{k_}: wer ist leer — '
                              'dann kann das Chart sie nicht gewichten')
            for w in wer_:
                if w not in ('Sonne', 'Mond') and w not in WANDERER:
                    fehler.append(f'Facette {b}/{k_}: "{w}" ist kein natal '
                                  'gerechneter Punkt')
            for f_, mind in (('titel', 8), ('was', 120), ('meistern', 35)):
                v = feld(blk, f_)
                if not v:
                    fehler.append(f'Facette {b}/{k_}: {f_} fehlt')
                    continue
                if len(v) < mind:
                    fehler.append(f'Facette {b}/{k_}: {f_} nur {len(v)} Zeichen — '
                                  f'mindestens {mind}')
                if f_ != 'titel' and not v.rstrip().endswith(('.', '?')):
                    fehler.append(f'Facette {b}/{k_}: {f_} endet ohne Punkt')
                lay_texte.append((f'B_FACET.{b}.{k_}.{f_}', v))

# die vier Lautstärken
lauts = re.findall(r"\{\s*k:'(\w+)',\s*n:'([^']+)',\s*farbe:'(#[0-9A-Fa-f]{6})',\s*\n?\s*satz:'((?:[^'\\]|\\.)*)'", daten)
if len(lauts) != 4:
    fehler.append(f'{len(lauts)} statt 4 Lautstärken in B_LAUT')
farben = [l[2] for l in lauts]
if len(set(farben)) != len(farben):
    fehler.append('zwei Lautstärken haben dieselbe Farbe — dann sagt die Farbe nichts')
for k, n, fa, s in lauts:
    lay_texte.append((f'B_LAUT.{k}.satz', s))

# Kapitel und ehrlicher Teil
for f_ in ('laut', 'leise', 'nurKapitel', 'widerspruch'):
    v = re.search(r"\b" + f_ + r":\s*'((?:[^'\\]|\\.)*)'", daten)
    if not v:
        fehler.append(f'B_KAP.{f_} fehlt')
    else:
        lay_texte.append((f'B_KAP.{f_}', v.group(1)))
ehrlich = re.findall(r"\{\s*f:'((?:[^'\\]|\\.)*)',\s*\n?\s*a:'((?:[^'\\]|\\.)*)'", daten)
if len(ehrlich) < 4:
    fehler.append(f'nur {len(ehrlich)} Einträge im ehrlichen Teil — mindestens 4')
for q, a in ehrlich:
    lay_texte.append(('B_EHRLICH.frage', q))
    lay_texte.append(('B_EHRLICH.antwort', a))
for f_ in ('einl', 'rueck'):
    v = re.search(r"\b" + f_ + r":\s*'((?:[^'\\]|\\.)*)'", daten)
    if v:
        lay_texte.append((f'B_DURCH.{f_}', v.group(1)))

# ── Die Texte des Tiefgangs ────────────────────────────────────
# Fehlerklassen: ein Teil des Tiefgangs ohne Worte; eine
# Gesprächsfrage, die in Wahrheit eine Deutung oder gar eine
# Diagnose ist; ein Rahmensatz, der Fachsprache in eine Datei
# trägt, die ein Laie öffnet. Die Rechenprüfung sieht sich den
# fertigen Text an, hier werden die Bausteine geprüft.
TIEF_PFLICHT = {
    'titel': 4, 'vor': 120,
    'ueberblickTitel': 8, 'herkunftTitel': 10, 'facettenTitel': 10,
    'widTitel': 10, 'fragenTitel': 10, 'ehrlichTitel': 10,
    'herkunftVor': 30, 'facettenVor': 80, 'fragenVor': 80,
    'grenzeVor': 15, 'tunVor': 8, 'fuss': 100,
    'seiteTitel': 6, 'seiteVor': 150, 'seiteOffen': 150, 'seiteStufe': 60,
    'knopfAlle': 15, 'knopfEiner': 15, 'echoFertig': 15, 'echoOhne': 20,
}
m_tief = re.search(r"var B_TIEF = \{", daten)
if not m_tief:
    fehler.append('B_TIEF fehlt — der Tiefgang hat keine Überschriften')
else:
    tblk = klammerblock(daten, m_tief.end() - 1)
    for name, mind in TIEF_PFLICHT.items():
        v = feld(tblk, name)
        if not v:
            fehler.append(f'B_TIEF.{name} fehlt')
            continue
        if len(v) < mind:
            fehler.append(f'B_TIEF.{name} nur {len(v)} Zeichen — mindestens {mind}')
        lay_texte.append((f'B_TIEF.{name}', v))
    # Der Abschnitt auf der Seite muss sagen, dass nichts verschlossen
    # ist. Siehe PRODUKT.md Abschnitt 4: ein gemaltes Schloss auf einer
    # statischen Seite wäre eine Lüge, und hier wird keine erzählt.
    offen = feld(tblk, 'seiteOffen') or ''
    if 'Schloss' not in offen or 'Server' not in offen:
        fehler.append('B_TIEF.seiteOffen sagt nicht, dass der Tiefgang nicht '
                      'verschlossen ist, sondern noch nicht geschrieben')
    if '{n}' not in (feld(tblk, 'echoFertig') or ''):
        fehler.append('B_TIEF.echoFertig nennt den Dateinamen nicht')

# ── Was sich widerspricht ──────────────────────────────────────
WID_PFLICHT = {'vor': 100, 'keiner': 120, 'anlageZwei': 150, 'anlageEins': 100,
               'anlageTun': 60, 'zugleich': 100, 'zugleichTun': 60,
               'kapitel': 100, 'kapitelTun': 60}
m_wid = re.search(r"var B_WID = \{", daten)
if not m_wid:
    fehler.append('B_WID fehlt — die Widersprüche haben keine Worte')
else:
    wblk = klammerblock(daten, m_wid.end() - 1)
    for name, mind in WID_PFLICHT.items():
        v = feld(wblk, name)
        if not v:
            fehler.append(f'B_WID.{name} fehlt')
            continue
        if len(v) < mind:
            fehler.append(f'B_WID.{name} nur {len(v)} Zeichen — mindestens {mind}')
        lay_texte.append((f'B_WID.{name}', v))
    # Die beiden Formen für die Anlage brauchen ihre Lücken, sonst
    # steht derselbe Satz über zwei verschiedenen Befunden.
    for name, lueck in (('anlageZwei', ('{a}', '{b}')), ('anlageEins', ('{a}',))):
        v = feld(wblk, name) or ''
        for l in lueck:
            if l not in v:
                fehler.append(f'B_WID.{name} hat keine Lücke {l} — dann sagt '
                              'der Satz nicht, welche Stellen gegeneinander stehen')
    if feld(wblk, 'anlageZwei') == feld(wblk, 'anlageEins'):
        fehler.append('die beiden Formen für die Anlage sind gleich')
    # Das Eingeständnis, keinen Widerspruch zu finden, muss auch
    # sagen, dass das eigene Erleben Vorrang hat.
    if 'kennst' not in (feld(wblk, 'keiner') or ''):
        fehler.append('B_WID.keiner sagt nicht, dass ein selbst erlebter '
                      'Widerspruch trotzdem gilt')
    for name in ('techAnlage', 'techZugleich', 'techKapitel'):
        if not feld(wblk, name):
            fehler.append(f'B_WID.{name} fehlt — der Befund nennt seine Mechanik nicht')

# ── Wenn nichts läuft ──────────────────────────────────────────
m_leer = re.search(r"var B_LEER = \{", daten)
if not m_leer:
    fehler.append('B_LEER fehlt — die stillen Bereiche haben keine Worte')
else:
    lblk = klammerblock(daten, m_leer.end() - 1)
    for name, mind in (('keinVorgang', 100), ('keinFenster', 25),
                       ('tun', 100), ('nutzen', 60), ('natalLeer', 120)):
        v = feld(lblk, name)
        if not v:
            fehler.append(f'B_LEER.{name} fehlt')
            continue
        if len(v) < mind:
            fehler.append(f'B_LEER.{name} nur {len(v)} Zeichen — mindestens {mind}')
        lay_texte.append((f'B_LEER.{name}', v))
    # Fehlerklasse: derselbe Platzhalter stand in app und in daten.
    # Steht er noch in app, laufen zwei Fassungen auseinander.
    for name in ('keinVorgang', 'keinFenster', 'tun', 'nutzen', 'natalLeer'):
        v = feld(lblk, name)
        if v and v[:40] in app:
            fehler.append(f'B_LEER.{name} steht wörtlich auch in bereich-app.js '
                          '— zwei Fassungen desselben Satzes')

# ── Fugen und Formen ───────────────────────────────────────────
m_form = re.search(r"var B_FORM = \{", daten)
if not m_form:
    fehler.append('B_FORM fehlt — die gebauten Sätze haben keine Formen')
else:
    fblk = klammerblock(daten, m_form.end() - 1)
    monate = re.findall(r"'([A-ZÄÖÜ][a-zäöü]+)'",
                        re.search(r"monate:\[(.*?)\]", fblk, re.S).group(1))
    if len(monate) != 12:
        fehler.append(f'{len(monate)} statt 12 Monatsnamen in B_FORM')
    zeichen = re.findall(r"'([A-ZÄÖÜ][a-zäöü]+)'",
                         re.search(r"zeichen:\[(.*?)\]", fblk, re.S).group(1))
    if len(zeichen) != 12:
        fehler.append(f'{len(zeichen)} statt 12 Zeichennamen in B_FORM')
    # Nur die Formen, die ein Laie zu sehen bekommt, gehen in die
    # Stufe-0-Prüfung. Die tech-Formen dürfen Fachsprache tragen.
    for name, mind in (('laeuftAus', 5), ('fensterOffen', 60),
                       ('fensterKurz', 6), ('fensterBis', 12), ('fensterSeit', 20)):
        v = feld(fblk, name)
        if not v:
            fehler.append(f'B_FORM.{name} fehlt')
            continue
        if len(v) < mind:
            fehler.append(f'B_FORM.{name} nur {len(v)} Zeichen')
        lay_texte.append((f'B_FORM.{name}', v))
    for name, lueck in (('fensterKurz', '{d}'), ('fensterBis', '{d}'),
                        ('fensterBis', '{m}'), ('fensterSeit', '{d}'),
                        ('vieleJahre', '{n}'), ('techDurchgang', '{h}'),
                        ('techAspekt', '{z}')):
        if lueck not in (feld(fblk, name) or ''):
            fehler.append(f'B_FORM.{name} hat keine Lücke {lueck}')

# ── Die Gesprächsfragen ────────────────────────────────────────
# PRODUKT.md Abschnitt 5: keine Diagnose. Eine Frage, die eine
# Diagnose nahelegt, ist keine Frage, sondern ein Befund im
# Fragezeichen-Mantel — und genau das wird hier unmöglich gemacht.
DIAGNOSE = ['Diagnose', 'diagnos', 'Störung', 'Syndrom', 'krank', 'Krankheit',
            'Depression', 'depressiv', 'Trauma', 'traumat', 'ADHS', 'Autismus',
            'autistisch', 'Burnout', 'therapieren', 'behandeln', 'leidest',
            'Patient', 'Befund']
fragen_je, grenze_je, rah_texte = {}, {}, {}
m_fra = re.search(r"var B_FRAGEN = \{", daten)
if not m_fra:
    fehler.append('B_FRAGEN fehlt — die Bereiche haben keine Gesprächsfragen')
else:
    fra_block = klammerblock(daten, m_fra.end() - 1)
    alle_fragen, alle_grenzen = [], []
    for b in BEREICHE:
        mb = re.search(r"^\s{4}" + b + r":\s*\{", fra_block, re.M)
        if not mb:
            fehler.append(f'Bereich {b}: keine Gesprächsfragen in B_FRAGEN')
            continue
        blk = klammerblock(fra_block, mb.end() - 1)
        mf = re.search(r"fragen:\s*\[(.*?)\]", blk, re.S)
        fr = re.findall(r"'((?:[^'\\]|\\.)*)'", mf.group(1)) if mf else []
        if len(fr) != 3:
            fehler.append(f'Bereich {b}: {len(fr)} statt genau 3 Gesprächsfragen')
        for i, f_ in enumerate(fr):
            if not f_.rstrip().endswith('?'):
                fehler.append(f'Frage {b}/{i} ist keine Frage: "{f_[:50]}"')
            if len(f_) < 25:
                fehler.append(f'Frage {b}/{i} nur {len(f_)} Zeichen — zu dünn')
            for d in DIAGNOSE:
                if d in f_:
                    fehler.append(f'Frage {b}/{i} stellt eine Diagnose '
                                  f'("{d}"): "{f_[:60]}"')
            lay_texte.append((f'B_FRAGEN.{b}.frage{i}', f_))
            alle_fragen.append(f_)
        fragen_je[b] = fr
        gr = feld(blk, 'grenze')
        if not gr:
            fehler.append(f'Bereich {b}: die Grenze fehlt — dann sagt der '
                          'Tiefgang nicht, was er über diesen Bereich nicht weiß')
        else:
            if len(gr) < 60:
                fehler.append(f'Grenze {b}: nur {len(gr)} Zeichen — zu dünn')
            if not gr.rstrip().endswith('.'):
                fehler.append(f'Grenze {b}: endet ohne Punkt')
            for d in DIAGNOSE:
                if d in gr:
                    fehler.append(f'Grenze {b} stellt eine Diagnose ("{d}")')
            lay_texte.append((f'B_FRAGEN.{b}.grenze', gr))
            alle_grenzen.append(gr)
            grenze_je[b] = gr
    if len(set(alle_fragen)) != len(alle_fragen):
        fehler.append('dieselbe Gesprächsfrage steht in zwei Bereichen')
    if len(set(alle_grenzen)) != len(alle_grenzen):
        fehler.append('dieselbe Grenze steht in zwei Bereichen — dann ist sie '
                      'allgemein und sagt über den Bereich nichts')

    # ── Der Rahmen der Schublade ───────────────────────────────
    # Die Fehlerklasse, die hier unmöglich wird: Die Fragen stehen in
    # den Daten, aber auf der Seite sieht sie niemand — sie gingen
    # bis heute nur in den Tiefgang, also in eine Datei, die man erst
    # anfordern muss. Wer die Seite liest, bekam den Teil nie zu
    # sehen, der aus dem Befund ein Gespräch macht.
    #
    # Dagegen steht hier der Rahmen, und in der Rauchprobe weiter
    # unten wird am gezeichneten Ergebnis gemessen, nicht an den
    # Daten: Ein Rahmen, den die Anzeige nicht benutzt, fällt dort
    # durch.
    m_rah = re.search(r"^\s{4}rahmen:\s*\{", fra_block, re.M)
    if not m_rah:
        fehler.append('B_FRAGEN.rahmen fehlt — dann hat die Schublade auf '
                      'der Seite keine Überschrift und keinen Rahmen')
    else:
        rblk = klammerblock(fra_block, m_rah.end() - 1)
        rah_texte = {}
        for name, mind in (('titel', 20), ('vor', 80), ('grenzeVor', 15)):
            v = feld(rblk, name)
            if not v:
                fehler.append(f'B_FRAGEN.rahmen.{name} fehlt')
                continue
            if len(v) < mind:
                fehler.append(f'B_FRAGEN.rahmen.{name} nur {len(v)} Zeichen — zu dünn')
            for d in DIAGNOSE:
                if d in v:
                    fehler.append(f'B_FRAGEN.rahmen.{name} stellt eine Diagnose ("{d}")')
            lay_texte.append((f'B_FRAGEN.rahmen.{name}', v))
            rah_texte[name] = v
        # Die Schublade sagt, dass sie Fragen bringt und keine
        # Antworten. Ohne diesen Satz ist sie eine Deutung in
        # Fragezeichen — PRODUKT.md Abschnitt 5.
        if 'vor' in rah_texte and 'Antwort' not in rah_texte['vor']:
            fehler.append('B_FRAGEN.rahmen.vor sagt nicht, dass die Antworten '
                          'nicht hier stehen — dann liest die Schublade sich '
                          'wie eine Deutung')
        # Und der Rahmen bleibt Text: Steht einer dieser Sätze wörtlich
        # in der Anzeige, ist er dort beim nächsten Umbau geändert und
        # von keiner Prüfung gesehen. PRODUKT.md Abschnitt 7.
        # Gesucht wird im Code, nicht im Kommentar: Dass die Anzeige
        # erklärt, was sie zeichnet, ist das Gegenteil des Fehlers.
        # ohne_kommentar steht weiter unten erst zur Verfügung — hier
        # genügt derselbe Griff in Kurzform.
        app_nackt = re.sub(r'^\s*//.*$', ' ',
                           re.sub(r'/\*.*?\*/', ' ', app, flags=re.S), flags=re.M)
        for name, v in rah_texte.items():
            if v in app_nackt:
                fehler.append(f'B_FRAGEN.rahmen.{name} steht wörtlich in '
                              'bereich-app.js — Texte gehören in die Daten')
        for f_ in alle_fragen + alle_grenzen:
            if f_ in app_nackt:
                fehler.append('eine Gesprächsfrage oder Grenze steht wörtlich in '
                              'bereich-app.js — sie gehört in bereich-daten.js')
    # Gezeichnet wird aus den Daten, nicht geraten: Ohne diesen Griff
    # ist die Schublade gar nicht angebunden.
    if '.rahmen' not in app:
        fehler.append('bereich-app.js holt den Rahmen der Schublade nicht aus '
                      'B_FRAGEN — dann zeichnet die Seite die Coachin-Sicht nicht')

# ── Kein Schalter, der Freischalten vortäuscht ─────────────────
# PRODUKT.md Abschnitt 4: Die Seite hat keinen Server, alles im
# Quelltext ist lesbar. Ein Schloss wäre gemalt. Solange nicht
# entschieden ist, welcher Weg es wird, wird keines gebaut.
SCHLOSS = ['freischalt', 'Freischalt', 'entsperr', 'Entsperr', 'Zugangscode',
           'Gutschein', 'Lizenzschlüssel', 'Aktivierungs', 'gekauft',
           'Kaufcode', 'unlock', 'premium', 'Premium']
# Gesucht wird im Code und im Markup, nicht in Kommentaren: dass
# eine Datei erklärt, warum sie kein Schloss baut, ist das Gegenteil
# eines Schlosses.
def ohne_kommentar(s, html_auch=False):
    s = re.sub(r'/\*.*?\*/', ' ', s, flags=re.S)
    s = re.sub(r'^\s*//.*$', ' ', s, flags=re.M)
    if html_auch:
        s = re.sub(r'<!--.*?-->', ' ', s, flags=re.S)
    return s

nackt = (ohne_kommentar(koerper, True) + ohne_kommentar(app) +
         ohne_kommentar(daten) + ohne_kommentar(rechner) + ohne_kommentar(bauer) +
         ohne_kommentar(wapp) + ohne_kommentar(wdaten))
for w in SCHLOSS:
    if w in nackt:
        fehler.append(f'die Seite täuscht Freischalten vor ("{w}") — auf einer '
                      'statischen Seite ist jedes Schloss gemalt, '
                      'siehe PRODUKT.md Abschnitt 4')
# Und nichts wird nur ausgeblendet, statt herausgegeben: ein Teil
# der Seite, der den Tiefgang trägt und per Stil verborgen ist,
# wäre derselbe gemalte Schalter in anderer Form.
if re.search(r'id="btief[a-z]*"[^>]*style="[^"]*display\s*:\s*none', koerper):
    fehler.append('der Tiefgang-Abschnitt ist im Markup verborgen — '
                  'verbergen ist auf einer statischen Seite keine Grenze')
# Und der Tiefgang darf nicht fertig in der Seite liegen: dann wäre
# er nicht herausgegeben, sondern nur ausgeblendet.
if 'AC_TIEF.bauen' in app and 'innerHTML' in app.split('AC_TIEF.bauen')[1][:400]:
    fehler.append('der gebaute Tiefgang wird in die Seite geschrieben — '
                  'er geht als Datei heraus, nicht in das Markup')
if 'tief-bauer.js' not in lies(hier / 'bau-bereiche.py'):
    fehler.append('tief-bauer.js wird nicht mitgebaut')
if 'download' not in app or 'Blob' not in app:
    fehler.append('der Tiefgang geht nicht als Datei heraus')

# ── 4 · Die Grundregel: kein Maschinenraum im Laientext ────────
# Diese Wörter dürfen in keinem Text stehen, den ein Laie auf
# Stufe 0 sieht. Sie gehören in die Felder mit "tech" und in
# Elemente mit der Klasse ac-tech.
VERBOTEN = (
    ['Sonne', 'Mond', 'Merkur', 'Venus', 'Mars', 'Jupiter', 'Saturn',
     'Uranus', 'Neptun', 'Pluto', 'Lilith', 'Chiron']
    + ['Haus', 'Häuser', 'Hauses']
    + ['Aspekt', 'Aspekte', 'Konjunktion', 'Opposition', 'Quadrat',
       'Trigon', 'Sextil', 'Orbis', 'Orben']
    + ['Transit', 'Transite', 'Aszendent', 'Deszendent', 'Medium Coeli',
       'rückläufig', 'winkelhaft', 'Radix', 'Ekliptik', 'Dispositor',
       'Profektion', 'Firdaria', 'Aphesis', 'Whole Sign', 'Whole-Sign']
    + ['Widder', 'Stier', 'Zwillinge', 'Krebs', 'Löwe', 'Jungfrau',
       'Waage', 'Skorpion', 'Schütze', 'Steinbock', 'Wassermann', 'Fische']
)
# Geprüft wird nicht hier, sondern am Ende, wenn alle Sätze
# gesammelt sind. Fehlerklasse, aufgefallen bei Aufgabe 3: Ein Satz,
# der weiter unten zu lay_texte dazukommt — die Sätze der
# Auswahlleiste taten das seit dem 22.10. —, lief an dieser Prüfung
# vorbei und durfte stillschweigend ein Fachwort tragen. Die Prüfung
# steht deshalb hinter dem letzten Sammler, und danach wird die
# Liste zugemacht.

# ── 5 · Handwerk ───────────────────────────────────────────────
if 'toLowerCase' in app + daten + rechner:
    fehler.append('toLowerCase verändert deutsche Großschreibung — nicht benutzen')
for d in ('1987', '08:58'):
    if d in app + daten + rechner + koerper:
        fehler.append(f'echte Geburtsdaten im Quelltext: {d}')
if 'esc(' not in app:
    fehler.append('die Ausgabe wird nicht maskiert')

# ── Die eine Liste der Bereiche ────────────────────────────────
# Fehlerklasse: eine zweite Kopie der zehn Bereiche. Drei Seiten
# brauchen die Liste; solange zwei Kopien gleich sind, fällt nichts
# auf, und sobald eine gepflegt wird, zeigen zwei Seiten anderes.
# Deshalb steht sie allein in lebensbereiche.js, und der Rechner
# darf dort nur nachfragen.
for b in BEREICHE:
    if f"k:'{b}'" not in felder:
        fehler.append(f'Bereich {b} fehlt in lebensbereiche.js')
    if f"k:'{b}'" in rechner:
        fehler.append(f'Bereich {b} steht noch im Rechner — die Liste '
                      'gehört allein in lebensbereiche.js')
if 'AC_LB' not in rechner:
    fehler.append('der Rechner holt die Bereiche nicht aus lebensbereiche.js')
if re.search(r"name:'[^']*',\s*haeuser:\[", rechner):
    fehler.append('die Zuordnung von Bereich zu Feldern steht noch im '
                  'Rechner — sie gehört allein in lebensbereiche.js')

# ── Die Auswahl: angeboten und wirklich beachtet ───────────────
# Fehlerklasse: eine Seite zeigt die Leiste, richtet sich aber nicht
# danach. Dann ist die Einstellung Zierde.
if 'AC_WAHL' not in app:
    fehler.append('die Seite beachtet die Bereichsauswahl nicht')
if "addEventListener('ac-bereiche'" not in app:
    fehler.append('die Seite zeichnet sich nach einer Änderung der '
                  'Auswahl nicht neu')
# In wahl-app.js steht kein Satz — dieselbe Regel wie im Monatsbericht.
for lit in re.findall(r"'((?:[^'\\\n]|\\.)*)'",
                      re.sub(r'/\*.*?\*/', ' ', wapp, flags=re.S)):
    rest = re.sub(r'</?[a-zA-Z][^>]*>?', ' ', lit)
    if len(re.findall(r'[A-Za-zÄÖÜäöüß]{3,}', rest)) >= 3:
        fehler.append(f'Text in wahl-app.js statt in wahl-daten.js: "{lit[:60]}"')
# Die Sätze der Leiste: vollständig, ohne Fachwort, und der Satz über
# eine getroffene Auswahl muss sagen, dass Ausgeblendetes nicht
# dasselbe ist wie Ruhe.
wtexte = dict(re.findall(r"^\s*(\w+):\s*'((?:[^'\\]|\\.)*)'", wdaten, re.M))
for name, mind in (('lab', 4), ('alleKnopf', 5)):
    if name not in wtexte:
        fehler.append(f'wahl-daten.js: {name} fehlt')
for name in ('alle', 'auswahl'):
    v = re.search(r"\b" + name + r":\s*'((?:[^'\\]|\\.)*)'"
                  r"(?:\s*\+\s*'((?:[^'\\]|\\.)*)')*", wdaten)
    if not v:
        fehler.append(f'wahl-daten.js: {name} fehlt')
        continue
    ganz = ''.join(re.findall(r"'((?:[^'\\]|\\.)*)'",
                   re.search(r"\b" + name + r":((?:[^;]|\n)*?)(?:,\n|\n\s*\})",
                             wdaten).group(1)))
    if len(ganz) < 60:
        fehler.append(f'wahl-daten.js: {name} ist zu dünn ({len(ganz)} Zeichen)')
    if not ganz.rstrip().endswith(('.', '?')):
        fehler.append(f'wahl-daten.js: {name} endet ohne Punkt')
    lay_texte.append((f'WAHL.{name}', ganz))
    if name == 'auswahl' and '{zahl}' not in ganz:
        fehler.append(f'wahl-daten.js: {name} nennt nicht, wie viele '
                      'Bereiche gewählt sind')
if 'ausgeblendet' not in wtexte.get('auswahl', '') + wdaten:
    fehler.append('die Leiste sagt nicht, dass ausgeblendete Bereiche '
                  'nicht dasselbe sind wie stille')

# ── Zum Nachlesen: jeder Bereich kennt seine lange Seite ───────
# Fehlerklasse: ein Themenraum, auf den kein Bereich zeigt. Zehn
# lange Seiten lagen seit den Anfängen da und waren von der
# Bereichsseite aus nicht erreichbar — wer beim lautesten Bereich
# ankam und weiterlesen wollte, fand sie nicht. Geprüft wird
# deshalb beides und in beide Richtungen: Jeder der zehn Bereiche
# braucht mindestens eine Seite, und jede Seite raum-*.html in
# wiki/ braucht mindestens einen Bereich. Eine neue Raumseite, die
# nirgends angebunden ist, kommt damit nicht mehr durch den Bau.
m_raum = re.search(r"^\s{2}var B_RAUM\s*=\s*\{", daten, re.M)
if not m_raum:
    fehler.append('B_RAUM fehlt in bereich-daten.js — die Bereichsseite '
                  'kennt die langen Seiten nicht')
    RAUM_SEITEN, RAUM_ZU = {}, {}
else:
    raumblk = klammerblock(daten, m_raum.end() - 1)
    for name, mind in (('titel', 6), ('vor', 60), ('hin', 60)):
        v = feld(raumblk, name)
        if not v:
            fehler.append(f'B_RAUM.{name} fehlt')
        elif len(v) < mind:
            fehler.append(f'B_RAUM.{name} ist zu dünn ({len(v)} Zeichen)')
        elif name != 'titel' and not v.rstrip().endswith(('.', '?')):
            fehler.append(f'B_RAUM.{name} endet ohne Punkt')
        elif name != 'titel':
            lay_texte.append((f'RAUM.{name}', v))
    # Der Hinweis muss zugeben, dass diese Seiten in der alten Form
    # geschrieben sind. PRODUKT.md Abschnitt 3: Ehrlichkeit über die
    # eigenen Grenzen gilt auch für die eigenen alten Seiten.
    if 'älter' not in (feld(raumblk, 'hin') or ''):
        fehler.append('B_RAUM.hin sagt nicht, dass diese Seiten älter '
                      'sind als der Rest der Plattform')

    m_s = re.search(r"\bseiten:\s*\{", raumblk)
    RAUM_SEITEN = {}
    if not m_s:
        fehler.append('B_RAUM.seiten fehlt')
    else:
        sblk = klammerblock(raumblk, m_s.end() - 1)
        for ms in re.finditer(r"\b([A-Za-z][\w]*):\s*\{", sblk):
            eintrag = klammerblock(sblk, ms.end() - 1)
            RAUM_SEITEN[ms.group(1)] = {
                'datei': feld(eintrag, 'datei'),
                'name':  feld(eintrag, 'name'),
                'was':   feld(eintrag, 'was')}
        if len(RAUM_SEITEN) < 10:
            fehler.append(f'B_RAUM.seiten kennt nur {len(RAUM_SEITEN)} Seiten')
        gesehen_was = {}
        for k, e in sorted(RAUM_SEITEN.items()):
            if not e['datei'] or not re.fullmatch(r'raum-[a-z-]+\.html', e['datei']):
                fehler.append(f'B_RAUM.seiten.{k}: datei fehlt oder heißt '
                              f'nicht raum-….html ({e["datei"]!r})')
            elif not (wiki / e['datei']).exists():
                fehler.append(f'B_RAUM.seiten.{k} zeigt auf {e["datei"]}, '
                              'die es in wiki/ nicht gibt')
            if not e['name'] or len(e['name']) < 4:
                fehler.append(f'B_RAUM.seiten.{k}: name fehlt')
            else:
                lay_texte.append((f'RAUM.{k}.name', e['name']))
            if not e['was']:
                fehler.append(f'B_RAUM.seiten.{k}: was fehlt')
            elif len(e['was']) < 80:
                fehler.append(f'B_RAUM.seiten.{k}: was ist zu dünn '
                              f'({len(e["was"])} Zeichen)')
            elif not e['was'].rstrip().endswith('.'):
                fehler.append(f'B_RAUM.seiten.{k}: was endet ohne Punkt')
            else:
                # Fehlerklasse: zwei Seiten mit demselben Satz
                # beschrieben. Dann steht unter einem Bereich zweimal
                # dasselbe Angebot, und die Wahl ist keine.
                if e['was'] in gesehen_was:
                    fehler.append(f'B_RAUM.seiten.{k} und '
                                  f'{gesehen_was[e["was"]]} tragen denselben Satz')
                gesehen_was[e['was']] = k
                lay_texte.append((f'RAUM.{k}.was', e['was']))

    m_z = re.search(r"\bzu:\s*\{", raumblk)
    RAUM_ZU = {}
    if not m_z:
        fehler.append('B_RAUM.zu fehlt — kein Bereich kennt seine Seite')
    else:
        zblk = klammerblock(raumblk, m_z.end() - 1)
        for mz in re.finditer(r"\b([a-z]+)\s*:\s*\[([^\]]*)\]", zblk):
            RAUM_ZU[mz.group(1)] = re.findall(r"'([^']+)'", mz.group(2))
        for b in BEREICHE:
            if not RAUM_ZU.get(b):
                fehler.append(f'Bereich {b} zeigt auf keine lange Seite')
        for b, ks in sorted(RAUM_ZU.items()):
            if b not in BEREICHE:
                fehler.append(f'B_RAUM.zu kennt den Bereich {b} nicht')
            for k in ks:
                if k not in RAUM_SEITEN:
                    fehler.append(f'Bereich {b} zeigt auf {k}, das in '
                                  'B_RAUM.seiten nicht steht')
            if len(set(ks)) != len(ks):
                fehler.append(f'Bereich {b} zeigt zweimal auf dieselbe Seite')

    # Die andere Richtung: keine Raumseite ohne Bereich.
    verwendet = {k for ks in RAUM_ZU.values() for k in ks}
    ohne_bereich = sorted(k for k in RAUM_SEITEN if k not in verwendet)
    if ohne_bereich:
        fehler.append('Themenraum ohne Bereich, der darauf zeigt: '
                      + ', '.join(ohne_bereich))
    angebunden = {RAUM_SEITEN[k]['datei'] for k in verwendet if k in RAUM_SEITEN}
    fremd = sorted(q.name for q in wiki.glob('raum-*.html')
                   if q.name not in angebunden)
    if fremd:
        fehler.append('Raumseiten in wiki/, auf die kein Bereich zeigt: '
                      + ', '.join(fremd))

# Gezeichnet wird es auch wirklich, und die Sätze kommen aus den Daten.
if 'RAUM' not in app or 'data-raum=' not in app:
    fehler.append('die Bereichsseite zeichnet die langen Seiten nicht')
for k in sorted(RAUM_SEITEN):
    d = RAUM_SEITEN[k].get('datei') or ''
    if d and d in app:
        fehler.append(f'der Dateiname {d} steht in bereich-app.js statt '
                      'in bereich-daten.js')

# die fünf Blöcke müssen in der festgelegten Reihenfolge erscheinen
blocks = re.findall(r"<h4>(\d) &middot; ([^<]+)</h4>", app)
if [b[0] for b in blocks] != ['1', '2', '3', '4', '5']:
    fehler.append('die fünf Blöcke stehen nicht in der Reihenfolge 1–5: ' + str(blocks))
erwartet = ['Was ist los', 'Was du tun kannst', 'Wie lange das läuft',
            'Wie du es nutzt', 'Dein Dauerthema hier']
if [b[1] for b in blocks] != erwartet:
    fehler.append('die Blöcke heißen anders als vereinbart: ' + str([b[1] for b in blocks]))

# tote Verweise
for href in set(re.findall(r'href="([a-z0-9-]+\.html)"', koerper)):
    if not (wiki / href).exists():
        fehler.append(f'toter Verweis: {href}')

# ── Stufe 0: kein Maschinenraum in einem Laientext ─────────────
# Alle Sätze sind gesammelt. Jetzt erst wird geprüft — und danach
# die Liste zugemacht, damit ein späterer Sammler nicht lautlos an
# dieser Prüfung vorbeikommt, sondern den Bau abbricht.
for wo, text in lay_texte:
    for v in VERBOTEN:
        if re.search(r'(?<![A-Za-zÄÖÜäöüß])' + re.escape(v) + r'(?![A-Za-zÄÖÜäöüß])', text):
            fehler.append(f'Fachwort "{v}" steht im Laientext {wo}: "{text[:70]}…"')
    if '°' in text:
        fehler.append(f'Gradzeichen im Laientext {wo}')

# Zahlen mit Punkt statt Komma sind im Deutschen falsch
for wo, text in lay_texte:
    m = re.search(r'\d\.\d', text)
    if m:
        fehler.append(f'Dezimalpunkt statt Komma in {wo}: "{m.group(0)}"')

# ── Die Sprache selbst ─────────────────────────────────────────
# Befund vom 26.10. (Mandy): "die texte sind noch immer kacke und
# unübersichtlich... für alle bereiche". Drei Muster waren schuld,
# und alle drei lassen sich zählen.

# 1 · Maschinenraum in Alltagssprache. Diese Wörter benennen die
#     eigene Rechnung, nicht das Leben. Sie tragen kein Fachwissen
#     und sind deshalb an der Prüfung oben vorbeigekommen — gesagt
#     haben sie trotzdem nichts.
MODELLWORT = ['Vorgang', 'Vorgangs', 'Vorgänge', 'Vorgängen',
              'Schwerpunkt', 'Schwerpunkts', 'Einschnitt', 'Einschnitts',
              'Zeitraum', 'Zeitraums', 'Konstellation', 'Konstellationen',
              'Tonlage']
for wo, text in lay_texte:
    for v in MODELLWORT:
        if re.search(r'(?<![A-Za-zÄÖÜäöüß])' + re.escape(v) + r'(?![A-Za-zÄÖÜäöüß])', text):
            fehler.append(f'"{v}" beschreibt die Rechnung statt das Leben, in {wo}: '
                          f'"{text[:70]}…"')

# 2 · Sätze, die vor allem sagen, was sie NICHT meinen. Ein "nicht"
#     ist in Ordnung, zwei in einem Satz heißen fast immer, dass der
#     Satz sich selbst erklärt statt etwas zu behaupten.
NEG = re.compile(r'(?<![A-Za-zÄÖÜäöüß])(nicht|kein|keine|keinen|keiner|keinem|'
                 r'nichts|nie|niemals)(?![A-Za-zÄÖÜäöüß])', re.I)
# Ausgenommen sind die Felder, deren Aufgabe das Verneinen IST: die
# Grenzen der Methode, die Haftungssätze, der ehrliche Teil. Dort ist
# "sie kennt keine Konten, keine Verträge" der Inhalt, nicht die Ausrede.
GRENZFELD = ('.grenze', '.fuss', 'B_EHRLICH', 'B_WID.', '.fragenVor', '.ehrlich')
for wo, text in lay_texte:
    if any(g in wo for g in GRENZFELD):
        continue
    for satz in re.split(r'(?<=[.!?])\s+', text):
        n = len(NEG.findall(satz))
        if n > 1 and len(satz) > 30:
            fehler.append(f'{n} Verneinungen in einem Satz ({wo}) — der Satz sagt vor allem, '
                          f'was er nicht meint: "{satz[:90]}…"')

# 3 · Ein Handgriff ist eine Handlung. Fängt er mit einer Verneinung
#     an, verbietet er etwas, statt etwas zu sagen.
for wo, text in lay_texte:
    if not wo.endswith('.tun'):
        continue
    erst = text.split()[0].rstrip(',.') if text.split() else ''
    if erst.lower() in ('nicht', 'kein', 'keine', 'keinen', 'nichts', 'niemals', 'nie'):
        fehler.append(f'Der Handgriff {wo} beginnt mit einer Verneinung: "{text[:70]}…"')

lay_texte = tuple(lay_texte)

# ── 6 · Die Rechnung einzeln prüfen ────────────────────────────
t = subprocess.run([sys.executable and 'node', str(hier / '_test-bereich.js')],
                   capture_output=True, text=True, cwd=str(hier.parent))
if t.returncode != 0:
    fehler.append('die Rechenprüfung schlägt fehl:\n' + (t.stdout + t.stderr)[-1800:])
else:
    print(t.stdout.strip().splitlines()[-1])

# ── 6a · Ein unbesetzter Bereich muss trotzdem gewichtet sein ──
# Fehlerklasse vom 30.10.: In jedem der zehn Bereiche hängen
# mindestens zwei Facetten am selben Feld — in Geld hängen „Was
# reinkommt" und „Wie du damit umgehst" beide am Kernfeld. Steht
# dort natal nichts, bekamen beide dasselbe Gewicht, und dann
# entschied die Reihenfolge in bereich-daten.js, welche oben steht.
# Die Seite sagt aber „Die Reihenfolge kommt aus dem Geburtsbild".
#
# Diese Prüfung macht die Klasse unmöglich, und zwar nicht an einem
# Fall, sondern an der Eigenschaft: Über tausend erfundene
# Geburtsbilder hinweg darf in keinem Bereich ein Paar von Facetten
# auf allen gerechneten Gewichten gleich liegen. Liegt eines gleich,
# entscheidet wieder die Textdatei — dann bricht der Bau ab und sagt,
# welches Paar es war. Dazu muss die Gewichtung bei unbesetzten
# Bereichen nachweislich etwas bewegen, sonst ist sie Zierde.
fprobe = hier / '_probe-facetten.js'
fprobe.write_text(r"""
/* Probedaten sind erfunden — nie echte Geburtsdaten hier hinein. */
const fs=require('fs'), path=require('path');
const wurzel=path.join(__dirname,'..');
const code=['rituale/engine.js','zeit/zeit-rechner.js','bereiche/lebensbereiche.js',
            'bereiche/bereich-rechner.js','bereiche/bereich-daten.js']
  .map(f=>fs.readFileSync(path.join(wurzel,f),'utf8')).join('\n;\n');
const w={}; new Function('window','console',code)(w,console);
const AC=w.AC_BER, BD=w.AC_BDAT;
const ZIELE=['Sonne','Mond','Merkur','Venus','Mars','Jupiter',
             'Saturn','Uranus','Neptun','Pluto'];
const raus={gleichstand:[], leerGesehen:0, leerAnders:0, bereicheLeer:{},
            ohneGewichte:[], fehler:''};
try{
  for(let s=1;s<=1200;s++){
    const asc=(s*7.37)%360, C={ASC:asc, MC:(asc+270)%360};
    ZIELE.forEach((p,i)=>C[p]=(s*13.73+i*41.31+s*s*0.0131)%360);
    for(const B of AC.BEREICHE){
      const N=AC.natal(C,B), L=(BD.FACET||{})[B.k]||[];
      if(!L.length) continue;
      const out=AC.facetten(N,B,L);
      if(out.length!==L.length){ raus.fehler='facetten() verliert Facetten'; break; }
      /* Jede Facette muss alle drei Gewichte tragen. */
      out.forEach(e=>{ if(typeof e.g!=='number'||typeof e.gh!=='number'
                        ||typeof e.gs!=='number')
        raus.ohneGewichte.push(B.k+'/'+e.f.k); });
      /* Kein Paar darf auf allen Gewichten gleich liegen. */
      const schl=out.map(e=>e.g+'|'+e.gh+'|'+e.gs);
      for(let i=0;i<schl.length;i++) for(let j=i+1;j<schl.length;j++)
        if(schl[i]===schl[j] && raus.gleichstand.length<5)
          raus.gleichstand.push(B.k+': "'+out[i].f.k+'" und "'+out[j].f.k
            +'" liegen beide bei '+schl[i]);
      /* Und: bewegt die Gewichtung bei unbesetzten Bereichen etwas? */
      if(N.leer){
        raus.leerGesehen++;
        raus.bereicheLeer[B.k]=(raus.bereicheLeer[B.k]||0)+1;
        if(out.map(e=>e.f.k).join(',')!==L.map(f=>f.k).join(','))
          raus.leerAnders++;
      }
    }
    if(raus.fehler) break;
  }
}catch(e){ raus.fehler=String(e && e.message || e); }
console.log(JSON.stringify(raus));
""", encoding='utf-8')
fp = subprocess.run(['node', str(fprobe)], capture_output=True, text=True,
                    cwd=str(hier.parent))
try:
    fprobe.unlink()
except OSError:
    pass
if fp.returncode != 0:
    fehler.append('die Facettenprobe läuft nicht:\n' + (fp.stdout + fp.stderr)[-900:])
else:
    try:
        fn = json.loads(fp.stdout.strip().splitlines()[-1])
    except (ValueError, IndexError):
        fn = None
        fehler.append('die Facettenprobe gibt keinen lesbaren Bericht:\n'
                      + (fp.stdout + fp.stderr)[-600:])
    if fn:
        if fn['fehler']:
            fehler.append('die Facettenprobe bricht ab: ' + fn['fehler'])
        if fn['ohneGewichte']:
            fehler.append('eine Facette kommt ohne alle drei Gewichte (g, gh, gs): '
                          + ', '.join(sorted(set(fn['ohneGewichte']))[:4]))
        if fn['gleichstand']:
            fehler.append('zwei Facetten liegen auf allen Gewichten gleich — dann '
                          'sortiert die Textdatei, nicht das Geburtsbild: '
                          + ' | '.join(fn['gleichstand'][:3]))
        # Die Probe muss unbesetzte Bereiche überhaupt zu sehen bekommen,
        # sonst prüft sie die Klasse nicht, um die es geht.
        if fn['leerGesehen'] < 50:
            fehler.append(f"die Facettenprobe fand nur {fn['leerGesehen']} unbesetzte "
                          'Bereiche — zu wenige, um die Gewichtung dort zu prüfen')
        elif fn['leerAnders'] * 3 < fn['leerGesehen']:
            fehler.append(f"von {fn['leerGesehen']} unbesetzten Bereichen zeigen nur "
                          f"{fn['leerAnders']} eine andere Reihenfolge als die "
                          'Textdatei — dort gewichtet nichts')
        else:
            print(f"  Facetten: {fn['leerGesehen']} unbesetzte Bereiche geprüft, "
                  f"{fn['leerAnders']} davon anders sortiert als die Textdatei, "
                  'kein Gleichstand')

# ── 7 · Rauchprobe im Browser ──────────────────────────────────
probe = hier / '_probe-bereich.js'
probe.write_text(r"""
const {chromium}=(function(){const orte=[process.env.AC_PLAYWRIGHT,'playwright','/opt/npm-tools/node_modules/playwright'];for(const o of orte){if(!o)continue;try{return require(o);}catch(e){}}throw new Error('Playwright nicht gefunden. AC_PLAYWRIGHT setzen oder playwright installieren.');})();
const liste=[]; let i=0;
for(const y of [1958,1971,1983,1996]) for(const h of [4,11,17,22]){
  i++; liste.push({id:'p'+i,name:'Probe '+i,alias:'P'+i,y,mo:1+((i*5)%12),d:3+((i*7)%25),
   h, mi:(i*13)%60, tz:1, lat:52.52, lon:13.405, ort:'Berlin',
   wlat:52.52, wlon:13.405, wort:'Berlin', eigen:i===1, readings:[]});
}
/* Auf Stufe 0 darf keines dieser Wörter sichtbar sein. */
const JARGON=['Konjunktion','Opposition','Quadrat','Trigon','Sextil','Orbis',
  'Transit','Aszendent','winkelhaft','rückläufig','Radix','Whole',
  'Pluto','Neptun','Uranus','Saturn','Jupiter','Merkur',
  'Profektion','Firdaria','Dispositor','Ekliptik'];
const BREITEN=[320,360,390,768,1024,1440];
(async()=>{
const b=await chromium.launch(); const f=[];
/* Die Notizen werden vorbelegt, und zwar mit Werten, die die
   Urteile unten durchfallen lassen. Fehlerklasse aus der
   Fehlerprobe vom 23.10.: bricht die Probe in der Mitte ab (eine
   Seite navigiert weg, ein Klick geht ins Leere), platzte sie
   vorher mit einem unlesbaren Node-Stapel — und die Prüfungen
   danach liefen nie. Eine abgebrochene Probe muss melden, was sie
   nicht mehr erreicht hat, statt grün oder stumm zu sein. */
const NICHT='Rauchprobe kam nicht bis hierher';
const leerDatei=()=>({name:'',laenge:0,fehler:NICHT,jargon:[],
  fehlendeTeile:['(ungelaufen)'],schlecht:''});
const notiz={
  start:{facs:[],bereiche:0,offen:0,ueber:0,bloecke:0,haupt:0,ehrlich:0,kopf:'',breit:0},
  doppelt:[],facAnzahl:[],facAlleDrei:false,facAnders:0,facDoppelt:[],
  folge:[],gleich:false,stufe0:[],techSichtbar0:99,techSichtbar3:0,techJeBereich:[],
  nach:[],gespr:[],
  stichtagWirkt:false,personWirkt:false,vorGeburt:'',zurueck:0,ohneProfil:'',
  wahl:{knoepfe:0,alleAn:'',tipp:''},
  einer:{bereiche:0,ueber:0,name:'',tipp:'',gespeichert:[],eigenerSchluessel:[]},
  zwei:{bereiche:0,gespeichert:[]},letzter:0,
  zurueckAlle:{bereiche:0,gespeichert:[]},unsinn:0,ueberlauf:[],
  tief:{titel:'',vor:'',knopfAlle:'',knoepfe:0,verborgen:0},
  datei0:leerDatei(),dateiEiner:leerDatei(),
  datei3:{laenge:0,mechanik:0,fehler:NICHT},echo:'',aufDerSeite:[]};
try{
const p=await (await b.newContext({viewport:{width:390,height:900},acceptDownloads:true})).newPage();
p.on('pageerror',e=>f.push('JS: '+String(e.message).slice(0,150)));
p.on('console',m=>{ if(m.type()==='error'){ const s=m.text();
  if(!/ERR_TUNNEL|ERR_NAME_NOT_RESOLVED|net::ERR_|Failed to load resource/.test(s))
    f.push('Konsole: '+s.slice(0,130)); } });
await p.addInitScript(l=>localStorage.setItem('ac_profile_v1',JSON.stringify(
 {v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:l})), liste);
const ORT='file://ZIEL';
await p.goto(ORT); await p.waitForTimeout(900);

const bad=/undefined|NaN|\[object|&[a-z]+;|Invalid Date|\w\.\.(?!\.)|\s\.|,,|\[\[|null/;
async function schlecht(wo){
  const t=await p.evaluate(()=>document.body.innerText);
  const m=t.match(bad); if(m) f.push('schlechter Text bei '+wo+': "'+
    t.slice(Math.max(0,t.indexOf(m[0])-60), t.indexOf(m[0])+60).replace(/\n/g,' ')+'"');
}
await schlecht('Start');

/* Die Seite zeigt einen Bereich auf einmal. Was über alle zehn
   gelten muss, wird geprüft, indem die Probe jeden Reiter antippt —
   das prüft die Zusicherung und die Bedienung in einem Zug. */
async function proBereich(fn){
  const ks=await p.evaluate(()=>[...document.querySelectorAll('.b-rt')].map(b=>b.dataset.rt));
  /* Merken, wo die Probe stand — sonst misst alles Folgende am
     letzten Reiter statt dort, wo es messen wollte. */
  const vorher=await p.evaluate(()=>{
    const a=document.querySelector('.b-rt[aria-selected="true"]');
    return a?a.dataset.rt:null; });
  const out={};
  for(const k of ks){
    await p.evaluate(x=>document.querySelector('.b-rt[data-rt="'+x+'"]').click(), k);
    await p.waitForTimeout(170);
    out[k]=await p.evaluate(fn);
  }
  if(vorher){
    await p.evaluate(x=>{ const b=document.querySelector('.b-rt[data-rt="'+x+'"]');
      if(b) b.click(); }, vorher);
    await p.waitForTimeout(220);
  }
  return out;
}

notiz.start=await p.evaluate(()=>({
  facs:[...document.querySelectorAll('.b-facs')]
        .map(e=>e.querySelectorAll('.b-fac').length),
  bereiche:document.querySelectorAll('.b-rt').length,
  gezeigt:document.querySelectorAll('.b-ber').length,
  klappen:document.querySelectorAll('#bliste details.b-ber').length,
  gewaehlt:document.querySelectorAll('.b-rt[aria-selected="true"]').length,
  reiterPasst:(()=>{ const a=document.querySelector('.b-rt[aria-selected="true"]'),
    s2=document.querySelector('.b-ber'); return !!(a&&s2&&s2.id==='ber-'+a.dataset.rt); })(),
  folgeGleich:(()=>{
    const u=[...document.querySelectorAll('.b-u')].map(x=>x.dataset.k),
          r=[...document.querySelectorAll('.b-rt')].map(x=>x.dataset.rt);
    return JSON.stringify(u)===JSON.stringify(r); })(),
  ueber:document.querySelectorAll('.b-u').length,
  bloecke:document.querySelectorAll('.b-ber .b-blk').length,
  haupt:document.querySelectorAll('.b-haupt').length,
  ehrlich:document.querySelectorAll('#behrlich h4').length,
  kopf:(document.getElementById('bkopf')||{}).innerText||'',
  breit:document.body.scrollWidth}));

/* In einem Bereich darf kein Satz zweimal wörtlich stehen. */
notiz.doppelt=[].concat(...Object.values(await proBereich(()=>{
  const raus=[];
  document.querySelectorAll('.b-ber').forEach(d=>{
    const name=(d.querySelector('.b-name')||{}).textContent||'?';
    const saetze=[];
    /* Nur Fließtext. In der Dauerliste dürfen zwei Fenster
       zu Recht dasselbe Enddatum nennen. */
    d.querySelectorAll('.b-in p').forEach(e=>{
      if(e.classList.contains('ac-tech')) return;
      (e.innerText||'').split(/(?<=[.!?])\s+/).forEach(s=>{
        s=s.trim(); if(s.length>25) saetze.push(s);
      });
    });
    const zahl={};
    saetze.forEach(s=>{ zahl[s]=(zahl[s]||0)+1; });
    Object.keys(zahl).forEach(s=>{ if(zahl[s]>1) raus.push(name+': "'+s.slice(0,55)+'…"'); });
  });
  return raus;
})));

/* Die Facetten müssen vom Chart sortiert sein, nicht von der
   Textdatei. Prüfung: zwei verschiedene Geburtsbilder dürfen nicht
   überall dieselbe Reihenfolge zeigen — sonst ist die Sortierung
   Behauptung. */
async function facFolge(){
  return proBereich(()=>[...document.querySelectorAll('.b-fac h5')]
    .map(x=>x.textContent.trim()));
}
const facA=await facFolge();
await p.evaluate(()=>{const bs=[...document.querySelectorAll('#bpersonen button')];
  if(bs[7]) bs[7].click();});
await p.waitForTimeout(700);
const facB=await facFolge();
notiz.facAnzahl=Object.values(facA).map(v=>v.length);
notiz.facAlleDrei=Object.values(facA).every(v=>v.length>=3)
               && Object.values(facB).every(v=>v.length>=3);
notiz.facAnders=Object.keys(facA).filter(k=>
  facB[k] && JSON.stringify(facA[k])!==JSON.stringify(facB[k])).length;
/* Und innerhalb eines Bereichs darf keine Facette zweimal dastehen. */
notiz.facDoppelt=Object.keys(facA).filter(k=>
  new Set(facA[k]).size!==facA[k].length);
await p.evaluate(()=>{const bs=[...document.querySelectorAll('#bpersonen button')];
  if(bs[0]) bs[0].click();});
await p.waitForTimeout(700);

/* Die Reihenfolge muss nach Lautstärke fallen. */
notiz.folge=await p.evaluate(()=>{
  const rang={'STILL':0,'LEISE':1,'IN BEWEGUNG':2,'VIEL LOS':3};
  return [...document.querySelectorAll('.b-u .b-ul')]
    .map(x=>rang[x.textContent.trim().toUpperCase()]);
});

/* Überblick und Reiterleiste müssen dieselbe Reihenfolge haben. */
notiz.gleich=await p.evaluate(()=>{
  const a=[...document.querySelectorAll('.b-u')].map(x=>x.dataset.k);
  const c=[...document.querySelectorAll('.b-rt')].map(x=>x.dataset.rt);
  return JSON.stringify(a)===JSON.stringify(c);
});

/* Der Kern der Umstellung: Ein Anker von außen muss wirklich bei
   dem Bereich ankommen, auf den er zeigt — nicht auf einer
   zugeklappten Zeile. Fehler vom 26.10., von Mandy gemeldet. */
notiz.anker=await (async()=>{
  const ks=await p.evaluate(()=>[...document.querySelectorAll('.b-rt')].map(b=>b.dataset.rt));
  const ziel=ks[ks.length-1];
  await p.goto(ORT+'#ber-'+ziel);
  await p.waitForTimeout(2200);
  /* Kein Nachhelfen. Die Seite ist mit dem Anker geladen worden und
     muss von selbst dort stehen — so kommt auch ein Mensch an, der
     von der Startseite aus klickt. */
  await p.waitForTimeout(600);
  return p.evaluate(z=>{
    const s2=document.querySelector('.b-ber');
    const d=document.getElementById('ber-'+z);
    const h3=d?d.querySelector('.b-name'):null;
    const leiste=document.querySelector('.ac-leiste');
    const lu=leiste?leiste.getBoundingClientRect().bottom:0;
    return { gezeigt:s2?s2.id:'', erwartet:'ber-'+z,
             sichtbar:!!(d&&d.offsetParent!==null),
             inKlappe:!!(d&&d.closest('details')),
             /* Steht die Überschrift nach dem Sprung frei oder
                hinter der klebenden Leiste? */
             frei:!!(h3 && h3.getBoundingClientRect().top >= lu - 1),
             hoehe:document.body.scrollHeight };
  }, ziel);
})();

/* Zwei Dinge, die beim Lesen auffielen und sich zählen lassen:
   kein Satz darf sagen, es laufe nichts, während darunter etwas
   aufgezählt wird — und keine Jahreszahl weit jenseits eines
   Jahrzehnts, das ist falsche Genauigkeit. */
notiz.widerspruch=Object.values(await proBereich(()=>{
  const d=document.querySelector('.b-ber'); if(!d) return null;
  const kap=[...d.querySelectorAll('.b-kap')].map(e=>e.innerText);
  const vor=d.querySelectorAll('.b-vor').length;
  const zeit=(d.querySelector('.b-kapzeit')||{}).innerText||'';
  const jahr=(zeit.match(/\b(20\d\d)\b/)||[])[1];
  return { name:(d.querySelector('.b-name')||{}).textContent||'?',
           nichtsUndDoch: vor>0 && kap.some(t=>/zieht nichts Großes/.test(t)),
           fernesJahr: jahr ? +jahr : null };
})).filter(Boolean);

/* Die Ankerprobe hat die Seite neu geladen und steht jetzt beim
   stillsten Bereich. Alles Weitere wird am lautesten gemessen. */
await p.evaluate(()=>{ const b=document.querySelector('.b-rt'); if(b) b.click(); });
await p.waitForTimeout(400);

/* Stufe 0: kein Fachwort irgendwo sichtbar. */
await p.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(0); }); await p.waitForTimeout(300);
notiz.stufe0=await p.evaluate(J=>{
  const t=document.body.innerText;
  return J.filter(w=>new RegExp('(?<![A-Za-zÄÖÜäöüß])'+w+'(?![A-Za-zÄÖÜäöüß])').test(t));
}, JARGON);
notiz.techSichtbar0=await p.evaluate(()=>[...document.querySelectorAll('.ac-tech')]
  .filter(e=>e.offsetParent!==null).length);

/* Zum Nachlesen: jeder Bereich zeigt unten auf seine lange Seite.
   Fehlerklasse: die Zuordnung steht in den Daten, aber die Seite
   zeichnet sie nicht — oder sie steht in der Mechanik und wartet
   damit auf Stufe 0 unsichtbar. Gemessen wird deshalb am Ergebnis
   und auf Stufe 0, nicht an den Daten. */
notiz.nach=Object.values(await proBereich(()=>{
  const d=document.querySelector('.b-ber');
  if(!d) return null;
  const a=[...d.querySelectorAll('.b-nach .b-nachl')];
  return {name:((d.querySelector('.b-name')||{}).textContent||'?').trim(),
    ziele:a.map(x=>x.getAttribute('href')),
    sicht:a.filter(x=>x.offsetParent!==null).length,
    duenn:a.filter(x=>
      ((x.querySelector('.b-nachw')||{}).innerText||'').trim().length<60
      || ((x.querySelector('.b-nachn')||{}).innerText||'').trim().length<4).length};
})).filter(Boolean);

/* Mit jemand anderem darüber sprechen: die zweite Sicht aus
   REGELN.md Abschnitt 1, zugeklappt angeboten.

   Gemessen wird am gezeichneten Ergebnis und auf Stufe 0 — nicht an
   den Daten. Die Fragen standen dort schon, bevor die Seite sie
   zeigte; eine Prüfung, die nur die Daten liest, hätte das nie
   gemerkt. Deshalb zählt hier, was ein Mensch wirklich aufklappen
   kann: eine Klappe je Bereich, zu, sichtbar, mit den Fragen dieses
   Bereichs darin und mit der Grenze darunter. */
notiz.gespr=Object.values(await proBereich(()=>{
  const d=document.querySelector('.b-ber');
  if(!d) return null;
  const o={k:(d.id||'').replace(/^ber-/,''),
    name:((d.querySelector('.b-name')||{}).textContent||'?').trim(),
    klappen:d.querySelectorAll('.b-gespr').length};
  if(o.klappen!==1) return o;
  const k=d.querySelector('.b-gespr');
  o.tag=k.tagName.toLowerCase();
  o.offenVorher=!!k.open;
  o.sichtbar=k.offsetParent!==null;
  o.titel=((k.querySelector('summary')||{}).innerText||'').trim();
  /* Erst messen, dann aufklappen: Die Frage, ob sie zu ist, lässt
     sich nach dem Öffnen nicht mehr stellen. */
  k.open=true;
  const fr=[...k.querySelectorAll('.b-gesprf li')];
  o.fragen=fr.map(x=>(x.innerText||'').trim());
  o.fragenSicht=fr.filter(x=>x.offsetParent!==null).length;
  const g=[...k.querySelectorAll('.b-gesprg')];
  o.grenzen=g.length;
  o.grenze=g.length?(g[0].innerText||'').trim():'';
  o.grenzeSicht=g.filter(x=>x.offsetParent!==null).length;
  o.vor=((k.querySelector('.b-gesprvor')||{}).innerText||'').trim();
  o.text=(k.innerText||'').trim();
  return o;
})).filter(Boolean);

/* Stufe 3: jetzt darf die Mechanik da sein. Gemessen wird am
   lautesten Bereich — im stillsten gibt es nichts abzulesen, und
   dann prüft die Zahl nicht die Mechanik, sondern die Stille. */
await p.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(3); }); await p.waitForTimeout(500);
/* Über alle zehn Bereiche zählen. An einem einzelnen zu messen hieße,
   die Stille eines ruhigen Bereichs für fehlende Mechanik zu halten —
   genau das ist beim Umbau am 26.10. passiert. */
notiz.techJeBereich=Object.values(await proBereich(()=>
  [...document.querySelectorAll('.ac-tech:not(.b-techblk), .b-techz')]
    .filter(e=>e.offsetParent!==null).length));
notiz.techSichtbar3=Math.max.apply(null, notiz.techJeBereich);

await schlecht('Stufe 3');

/* ── Der Tiefgang geht als Datei heraus ─────────────────────
   Fünf Dinge müssen stimmen:
     · der Abschnitt erklärt sich und sagt, dass nichts verschlossen ist
     · jeder Bereich hat seinen eigenen Knopf
     · der Knopf schreibt wirklich eine Datei, mit allen Teilen darin
     · auf Stufe 0 ist auch diese Datei frei von Fachsprache
     · und der Tiefgang steht nicht auf der Seite, sondern nur in
       der Datei — sonst wäre er nicht herausgegeben, nur sichtbar */
const TD = await p.evaluate(()=>window.AC_BDAT.TIEF);
const TEILE = [TD.ueberblickTitel, TD.herkunftTitel, TD.facettenTitel,
               TD.widTitel, TD.fragenTitel, TD.ehrlichTitel];

notiz.tiefKnoepfe = Object.values(await proBereich(
  ()=>document.querySelectorAll('#bliste button[data-tief]').length));
notiz.tief = await p.evaluate(()=>({
  titel:(document.getElementById('btieftitel')||{}).innerText||'',
  vor:(document.getElementById('btiefvor')||{}).innerText||'',
  knopfAlle:(document.getElementById('btiefalle')||{}).innerText||'',
  knoepfe:document.querySelectorAll('#bliste button[data-tief]').length,
  knopfPasst:(()=>{ const b=document.querySelector('#bliste button[data-tief]'),
    s2=document.querySelector('.b-ber');
    return !!(b&&s2&&s2.id==='ber-'+b.dataset.tief); })(),
  verborgen:[...document.querySelectorAll('#tiefgang,#btiefalle')]
              .filter(e=>e.offsetParent===null).length}));

async function holen(sel){
  /* Der Wächter wird vor dem Klick aufgesetzt und sein Fehlschlag
     sofort abgefangen: bleibt die Datei aus, soll die Probe das
     melden und nicht daran zerbrechen. */
  const warten=p.waitForEvent('download',{timeout:9000}).then(d=>d,()=>null);
  try{ await p.click(sel); }
  catch(e){ await warten; return { name:'', text:'',
            fehler:'Knopf nicht klickbar: '+String(e.message).slice(0,90) }; }
  const dl=await warten;
  if(!dl) return { name:'', text:'', fehler:'keine Datei nach dem Klick' };
  let ort=null; try{ ort=await dl.path(); }catch(e){}
  return { name:dl.suggestedFilename(),
           text:ort ? require('fs').readFileSync(ort,'utf8') : '' };
}
function befund(d){
  return { name:d.name, laenge:d.text.length, fehler:d.fehler||'',
    jargon:JARGON.filter(w=>new RegExp('(?<![A-Za-zÄÖÜäöüß])'+w+'(?![A-Za-zÄÖÜäöüß])')
             .test(d.text)),
    fehlendeTeile:TEILE.filter(x=>d.text.indexOf(x)<0),
    schlecht:(d.text.match(/undefined|NaN|\[object|\{\w+\}/)||[''])[0] };
}

/* Stufe 0: die Datei muss ohne ein Fachwort auskommen. */
await p.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(0); }); await p.waitForTimeout(350);
notiz.datei0 = befund(await holen('#btiefalle'));
notiz.echo = await p.evaluate(()=>(document.getElementById('btiefecho')||{}).innerText||'');

/* Ein einzelner Bereich: kürzer als alle zehn, aber vollständig. */
await p.waitForTimeout(200);
const dEiner = await holen('#bliste button[data-tief]');
notiz.dateiEiner = befund(dEiner);

/* Stufe 3: jetzt darf die Mechanik in der Datei stehen. */
await p.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(3); }); await p.waitForTimeout(350);
const d3 = await holen('#btiefalle');
notiz.datei3 = { laenge:d3.text.length, mechanik:(d3.text.match(/\[ /g)||[]).length,
                 fehler:d3.fehler||'' };

/* Und das Wichtigste: auf der Seite selbst steht der Tiefgang
   nicht — auf keiner Stufe, auch nicht mit allen Bereichen offen. */
notiz.aufDerSeite = [];
for(const st of [0,2,4]){
  await p.evaluate(s=>{ if(window.AC_NIV) AC_NIV.setzen(s); }, st);
  await p.waitForTimeout(300);
  await p.evaluate(()=>document.querySelectorAll('details').forEach(d=>d.open=true));
  await p.waitForTimeout(200);
  const drin = await p.evaluate(T=>{
    const t=document.body.innerText;
    return [T.herkunftTitel,T.widTitel,T.fragenTitel,T.grenzeVor]
             .filter(x=>t.indexOf(x)>=0);
  }, TD);
  if(drin.length) notiz.aufDerSeite.push('Stufe '+st+': '+drin.join(', '));
}
await p.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(0); }); await p.waitForTimeout(300);

/* Stichtag wirkt wirklich. */
await p.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(0); }); await p.waitForTimeout(250);
const vor=await p.evaluate(()=>document.getElementById('bliste').innerText);
await p.evaluate(()=>{ const e=document.getElementById('bdatum');
  e.value='2019-06-01'; e.dispatchEvent(new Event('change')); });
await p.waitForTimeout(600);
const nach=await p.evaluate(()=>document.getElementById('bliste').innerText);
notiz.stichtagWirkt = (vor!==nach);
await schlecht('Stichtag 2019');

/* Stichtag vor der Geburt wird abgefangen. */
await p.evaluate(()=>{ const e=document.getElementById('bdatum');
  e.value='1900-01-01'; e.dispatchEvent(new Event('change')); });
await p.waitForTimeout(500);
notiz.vorGeburt=await p.evaluate(()=>(document.getElementById('bkopf')||{}).innerText||'');

/* Zurück auf heute. */
await p.evaluate(()=>document.getElementById('bheute').click());
await p.waitForTimeout(500);
notiz.zurueck=await p.evaluate(()=>document.querySelectorAll('.b-rt').length);

/* Person wechseln ändert das Bild. */
const p1=await p.evaluate(()=>document.getElementById('bliste').innerText);
await p.evaluate(()=>{const bs=[...document.querySelectorAll('#bpersonen button')];
  if(bs[3]) bs[3].click();});
await p.waitForTimeout(600);
const p2=await p.evaluate(()=>document.getElementById('bliste').innerText);
notiz.personWirkt = (p1!==p2);
await schlecht('andere Person');

/* Ohne Profil darf die Seite nicht leer und nicht kaputt sein. */
const q=await (await b.newContext({viewport:{width:390,height:900}})).newPage();
q.on('pageerror',e=>f.push('JS ohne Profil: '+String(e.message).slice(0,150)));
await q.goto('file://ZIEL'); await q.waitForTimeout(700);
notiz.ohneProfil=await q.evaluate(()=>(document.getElementById('bkopf')||{}).innerText||'');

/* Die Auswahl der Bereiche. Vier Dinge müssen stimmen:
   sie ist da, sie wirkt, sie sagt dass sie ausblendet, und sie
   liegt in AC_P neben dem Profil statt in einem eigenen Schlüssel. */
notiz.wahl=await p.evaluate(()=>({
  knoepfe:document.querySelectorAll('#berwahl button[data-bw]').length,
  alleAn:(document.querySelector('#berwahl button[data-bw=""]')||{})
           .getAttribute? document.querySelector('#berwahl button[data-bw=""]')
           .getAttribute('aria-pressed'):'',
  tipp:(document.querySelector('#berwahl .bw-tipp')||{}).innerText||''}));
await p.evaluate(()=>{ window.AC_WAHL.setzen(['liebe']); });
await p.waitForTimeout(600);
notiz.einer=await p.evaluate(()=>({
  bereiche:document.querySelectorAll('.b-rt').length,
  ueber:document.querySelectorAll('.b-u').length,
  name:(document.querySelector('.b-ber .b-name')||{}).textContent||'',
  tipp:(document.querySelector('#berwahl .bw-tipp')||{}).innerText||'',
  gespeichert:JSON.parse(localStorage.getItem('ac_profile_v1')||'{}').bereiche||[],
  eigenerSchluessel:Object.keys(localStorage).filter(k=>/bereich/i.test(k))}));
/* Ein zweiter Bereich kommt dazu, nicht an die Stelle des ersten. */
await p.evaluate(()=>{ const b=[...document.querySelectorAll('#berwahl button[data-bw]')]
  .filter(x=>x.getAttribute('data-bw')==='beruf')[0]; if(b) b.click(); });
await p.waitForTimeout(600);
notiz.zwei=await p.evaluate(()=>({
  bereiche:document.querySelectorAll('.b-rt').length,
  gespeichert:JSON.parse(localStorage.getItem('ac_profile_v1')||'{}').bereiche||[]}));
/* Der letzte Bereich lässt sich nicht abwählen — eine leere Seite
   wäre keine Einstellung. */
await p.evaluate(()=>{ window.AC_WAHL.setzen(['geld']); });
await p.waitForTimeout(500);
await p.evaluate(()=>{ const b=[...document.querySelectorAll('#berwahl button[data-bw]')]
  .filter(x=>x.getAttribute('data-bw')==='geld')[0]; if(b) b.click(); });
await p.waitForTimeout(500);
notiz.letzter=await p.evaluate(()=>document.querySelectorAll('.b-rt').length);
/* Zurück auf alle zehn. */
await p.evaluate(()=>{ const b=document.querySelector('#berwahl button[data-bw=""]');
  if(b) b.click(); });
await p.waitForTimeout(700);
notiz.zurueckAlle=await p.evaluate(()=>({
  bereiche:document.querySelectorAll('.b-rt').length,
  gespeichert:JSON.parse(localStorage.getItem('ac_profile_v1')||'{}').bereiche||[]}));
/* Ein verdorbener Speicherstand darf die Seite nicht leeren. */
await p.evaluate(()=>{ window.AC_P.setzeBereiche(['gibtsnicht']);
  window.dispatchEvent(new CustomEvent('ac-bereiche')); });
await p.waitForTimeout(700);
notiz.unsinn=await p.evaluate(()=>document.querySelectorAll('.b-rt').length);
await p.evaluate(()=>{ window.AC_WAHL.setzen([]); });
await p.waitForTimeout(700);

/* Breiten */
notiz.ueberlauf=[];
for(const w of BREITEN){
  await p.setViewportSize({width:w,height:900}); await p.waitForTimeout(200);
  const s=await p.evaluate(()=>document.body.scrollWidth);
  if(s>w+1) notiz.ueberlauf.push(w+'px → '+s+'px');
}

}catch(e){
  f.push('Rauchprobe brach ab, bevor sie fertig war: '
         + String((e && e.message) || e).slice(0,200));
}
try{ await b.close(); }catch(e){}
console.log(JSON.stringify({fehler:f, notiz}, null, 1));
})();
""".replace('ZIEL', str(ziel)), encoding='utf-8')

r = subprocess.run(['node', str(probe)], capture_output=True, text=True, cwd='/tmp')
if r.returncode != 0:
    fehler.append('Rauchprobe lief nicht: ' + (r.stderr or r.stdout)[-900:])
else:
    import json as _json
    try:
        erg = _json.loads(r.stdout)
    except Exception as e:
        fehler.append('Rauchprobe gab keinen lesbaren Bericht: ' + r.stdout[-500:])
        erg = None
    if erg:
        fehler.extend(erg['fehler'])
        n = erg['notiz']
        s = n['start']
        if s['bereiche'] != 10:
            fehler.append(f"{s['bereiche']} statt 10 Reiter über dem Bereich")
        if s['gezeigt'] != 1:
            fehler.append(f"{s['gezeigt']} Bereiche gleichzeitig gezeigt statt einem — "
                          'die Seite ist wieder eine Textwüste')
        if s['klappen']:
            fehler.append('der gezeigte Bereich steckt in einer Klappe — ein Sprungziel, '
                          'das sich erst öffnen muss, ist für einen Link von außen keines')
        if s['gewaehlt'] != 1:
            fehler.append(f"{s['gewaehlt']} Reiter markiert statt genau einem")
        if not s['reiterPasst']:
            fehler.append('der markierte Reiter gehört nicht zum gezeigten Bereich')
        if not s['folgeGleich']:
            fehler.append('Überblick und Reiterleiste stehen in verschiedener Reihenfolge')
        if s['ueber'] != 10:
            fehler.append(f"{s['ueber']} statt 10 Zeilen im Überblick")
        if s['bloecke'] != 5:
            fehler.append(f"{s['bloecke']} statt 5 Blöcke im gezeigten Bereich")
        if len(s['facs']) != 1 or any(x < 3 for x in s['facs']):
            fehler.append('der gezeigte Bereich zeigt nicht drei '
                          f"Facetten im Dauerthema: {s['facs']}")
        if s['haupt'] < 1:
            fehler.append('kein Bereich hebt seinen stärksten Vorgang hervor')
        if s['ehrlich'] < 4:
            fehler.append(f"nur {s['ehrlich']} Fragen im ehrlichen Teil")
        if len(s['kopf']) < 60:
            fehler.append('der Kopf sagt zu wenig: ' + repr(s['kopf'][:80]))

        folge = n['folge']
        if len(folge) != 10:
            fehler.append(f'{len(folge)} Lautstärken statt 10')
        elif any(x is None for x in folge):
            fehler.append('eine Lautstärke ist nicht lesbar: ' + str(folge))
        elif folge != sorted(folge, reverse=True):
            fehler.append('die Bereiche stehen nicht nach Lautstärke sortiert: ' + str(folge))
        elif len(set(folge)) < 2:
            fehler.append('alle zehn Bereiche sind gleich laut — die Seite unterscheidet nichts')

        if not n['gleich']:
            fehler.append('Überblick und Reiterleiste haben verschiedene Reihenfolgen')

        import datetime as _d2
        for w in n.get('widerspruch', []):
            if w['nichtsUndDoch']:
                fehler.append(f"{w['name']}: Der Text sagt, es laufe nichts Großes — "
                              'und zählt darunter laufende Sachen auf')
            if w['fernesJahr'] and w['fernesJahr'] - _d2.date.today().year > 3:
                fehler.append(f"{w['name']}: Jahreszahl {w['fernesJahr']} in der Laufzeit — "
                              'das ist falsche Genauigkeit, so weit voraus')

        # Der Befund vom 26.10.: ein Link von außen landete auf einer
        # zugeklappten Zeile bei 82 % einer 18-Bildschirm-Seite.
        a = n['anker']
        if a['gezeigt'] != a['erwartet']:
            fehler.append(f"ein Anker von außen zeigt den falschen Bereich: "
                          f"{a['gezeigt']!r} statt {a['erwartet']!r}")
        if not a['sichtbar']:
            fehler.append('der Bereich, auf den ein Anker zeigt, ist nicht sichtbar')
        if a['inKlappe']:
            fehler.append('das Sprungziel eines Ankers steckt in einer Klappe')
        if not a['frei']:
            fehler.append('nach dem Sprung steht die Überschrift des Bereichs hinter der '
                          'Markenleiste — der Sprung sieht aus, als hätte er nicht gegriffen')
        if a['hoehe'] > 9000:
            fehler.append(f"die Seite ist {a['hoehe']} Pixel hoch — da sieht niemand durch")

        if n['doppelt']:
            fehler.append('derselbe Satz steht zweimal in einem Bereich: '
                          + ' | '.join(n['doppelt'][:4]))

        if not n['facAlleDrei']:
            fehler.append('nicht jeder Bereich zeigt drei Facetten: '
                          + str(n['facAnzahl']))
        if len(n['facAnzahl']) != 10:
            fehler.append(f"nur {len(n['facAnzahl'])} von 10 Bereichen über die "
                          'Reiter erreichbar')
        if n.get('tiefKnoepfe') and (len(n['tiefKnoepfe']) != 10
                                     or any(x != 1 for x in n['tiefKnoepfe'])):
            fehler.append('nicht jeder Bereich hat genau einen Knopf für den Tiefgang: '
                          + str(n['tiefKnoepfe']))
        if n['facDoppelt']:
            fehler.append('eine Facette steht zweimal im selben Bereich: '
                          + ', '.join(n['facDoppelt'][:4]))
        if n['facAnders'] < 3:
            fehler.append(f"die Facetten sind bei zwei verschiedenen Geburtsbildern "
                          f"in nur {n['facAnders']} von 10 Bereichen anders sortiert "
                          '— dann sortiert nicht das Chart, sondern die Textdatei')
        # ── Zum Nachlesen ────────────────────────────────────
        # Fehlerklassen: ein Bereich ohne Verweis; ein Verweis, der
        # auf Stufe 0 nicht sichtbar ist; eine Zeile ohne Namen oder
        # ohne Satz; ein toter Verweis; und ein Themenraum in wiki/,
        # auf den von der Bereichsseite aus niemand zeigt.
        nach = n['nach']
        if len(nach) != 10:
            fehler.append(f'{len(nach)} statt 10 Bereiche beim Nachlesen')
        for e in nach:
            if not e['ziele']:
                fehler.append(f"Bereich {e['name']} verweist unten auf "
                              'keine lange Seite')
                continue
            if e['sicht'] != len(e['ziele']):
                fehler.append(f"Bereich {e['name']}: {len(e['ziele']) - e['sicht']} "
                              'Verweise sind auf Stufe 0 nicht sichtbar')
            if e['duenn']:
                fehler.append(f"Bereich {e['name']}: {e['duenn']} Verweise ohne "
                              'Namen oder ohne Satz, der sagt, was dort steht')
            for z in e['ziele']:
                if not z or not (wiki / z).exists():
                    fehler.append(f"Bereich {e['name']} verweist auf {z!r} — "
                                  'die Seite gibt es nicht')
        angebunden = {z for e in nach for z in e['ziele'] if z}
        offen = sorted({q.name for q in wiki.glob('raum-*.html')} - angebunden)
        if offen:
            fehler.append('Themenräume, auf die von der Bereichsseite aus '
                          'niemand zeigt: ' + ', '.join(offen))
        # ── Die Schublade zum Darübersprechen ──────────────────
        # Die Fehlerklasse: eine Coachin-Sicht, die in den Daten
        # steht und auf der Seite nicht ankommt. Bis heute ging sie
        # nur in den Tiefgang — in eine Datei, die man erst
        # anfordern muss. Zwei weitere Weisen, denselben Fehler zu
        # machen, sind hier mit ausgeschlossen: eine Klappe, die
        # offen steht (dann ist die zweite Sicht im Vordergrund,
        # gegen REGELN.md Abschnitt 1), und eine, die überall
        # dieselben Fragen zeigt (dann ist die Zuordnung Behauptung).
        def _s(x):
            return ' '.join((x or '').split())
        gespr = n['gespr']
        if len(gespr) != 10:
            fehler.append(f'{len(gespr)} statt 10 Bereiche mit einer Schublade '
                          'zum Darübersprechen')
        for e in gespr:
            wer = e.get('name') or e.get('k') or '?'
            if e.get('klappen') != 1:
                fehler.append(f"Bereich {wer}: {e.get('klappen')} Schubladen zum "
                              'Darübersprechen statt genau einer')
                continue
            if e.get('tag') != 'details':
                fehler.append(f"Bereich {wer}: die Schublade ist ein "
                              f"<{e.get('tag')}> und keine Klappe")
            if e.get('offenVorher'):
                fehler.append(f'Bereich {wer}: die Schublade steht offen — die '
                              'Sicht der Coachin gehört zugeklappt, nie in den '
                              'Vordergrund (REGELN.md Abschnitt 1)')
            if not e.get('sichtbar'):
                fehler.append(f'Bereich {wer}: die Schublade ist auf Stufe 0 '
                              'nicht sichtbar — dann findet sie niemand')
            soll_t = _s(rah_texte.get('titel', ''))
            if soll_t and _s(e.get('titel')) != soll_t:
                fehler.append(f"Bereich {wer}: die Schublade heißt "
                              f"{_s(e.get('titel'))!r} statt {soll_t!r}")
            fr = e.get('fragen') or []
            if len(fr) != 3:
                fehler.append(f'Bereich {wer}: {len(fr)} statt genau drei '
                              'Gesprächsfragen in der Schublade')
            for f_ in fr:
                if not f_.rstrip().endswith('?'):
                    fehler.append(f'Bereich {wer}: "{f_[:50]}" ist keine Frage')
            if e.get('fragenSicht') != len(fr):
                fehler.append(f'Bereich {wer}: nach dem Aufklappen sind nur '
                              f"{e.get('fragenSicht')} von {len(fr)} Fragen sichtbar")
            # Die Fragen dieses Bereichs, nicht irgendwelche.
            soll_f = {_s(x) for x in fragen_je.get(e.get('k'), [])}
            if soll_f and {_s(x) for x in fr} != soll_f:
                fehler.append(f'Bereich {wer}: die Schublade zeigt nicht die drei '
                              'Fragen dieses Bereichs')
            if e.get('grenzen') != 1:
                fehler.append(f"Bereich {wer}: {e.get('grenzen')} Grenzen in der "
                              'Schublade statt genau einer')
            elif not e.get('grenzeSicht'):
                fehler.append(f'Bereich {wer}: die Grenze ist nach dem '
                              'Aufklappen nicht sichtbar')
            soll_g = _s(grenze_je.get(e.get('k'), ''))
            if soll_g and soll_g not in _s(e.get('grenze')):
                fehler.append(f'Bereich {wer}: unter den Fragen steht nicht die '
                              'Grenze dieses Bereichs')
            if len(_s(e.get('vor'))) < 80:
                fehler.append(f'Bereich {wer}: die Schublade sagt nicht, wofür '
                              'die Fragen da sind')
            # PRODUKT.md Abschnitt 5: keine Diagnose. Gesucht wird im
            # gezeichneten Text, damit auch ein Satz auffällt, den die
            # Anzeige dazwischensetzt.
            for d in DIAGNOSE:
                if d in (e.get('text') or ''):
                    fehler.append(f'Bereich {wer}: die Schublade stellt eine '
                                  f'Diagnose ("{d}")')

        if n['stufe0']:
            fehler.append('Fachsprache auf Stufe 0 sichtbar: ' + ', '.join(n['stufe0']))
        if n['techSichtbar0'] != 0:
            fehler.append(f"{n['techSichtbar0']} Mechanik-Zeilen schon auf Stufe 0 sichtbar")
        if n['techSichtbar3'] < 5:
            fehler.append(f"auf Stufe 3 höchstens {n['techSichtbar3']} Mechanik-Zeilen "
                          f"je Bereich — zu wenig: {n.get('techJeBereich')}")
        if n.get('techJeBereich') and sum(n['techJeBereich']) < 20:
            fehler.append('über alle zehn Bereiche nur '
                          f"{sum(n['techJeBereich'])} Mechanik-Zeilen auf Stufe 3")

        if not n['stichtagWirkt']:
            fehler.append('der Stichtag verändert die Anzeige nicht')
        if not n['personWirkt']:
            fehler.append('ein Personenwechsel verändert die Anzeige nicht')
        if 'vor der Geburt' not in n['vorGeburt']:
            fehler.append('ein Stichtag vor der Geburt wird nicht abgefangen: '
                          + repr(n['vorGeburt'][:90]))
        if n['zurueck'] != 10:
            fehler.append('der Knopf "Heute" bringt die Seite nicht zurück')
        if 'Profil' not in n['ohneProfil']:
            fehler.append('ohne Profil fehlt der Hinweis: ' + repr(n['ohneProfil'][:90]))
        # ── Die Auswahl der Bereiche ──────────────────────────
        # Fehlerklassen: die Leiste fehlt; sie wirkt nicht; sie
        # blendet aus, ohne es zu sagen; sie liegt nicht bei AC_P;
        # sie lässt sich leerklicken; ein verdorbener Stand macht
        # die Seite leer.
        w = n['wahl']
        if w['knoepfe'] != 11:
            fehler.append(f"{w['knoepfe']} statt 11 Knöpfe in der "
                          'Bereichsauswahl (zehn Bereiche und "alle")')
        if w['alleAn'] != 'true':
            fehler.append('ohne Auswahl ist "alle zehn" nicht markiert')
        if len(w['tipp']) < 40:
            fehler.append('die Auswahl erklärt sich nicht: ' + repr(w['tipp'][:60]))
        e = n['einer']
        if e['bereiche'] != 1:
            fehler.append(f"eine Auswahl von einem Bereich zeigt "
                          f"{e['bereiche']} Bereiche — die Auswahl wirkt nicht")
        if e['ueber'] != 1:
            fehler.append(f"der Überblick zeigt {e['ueber']} Zeilen, "
                          'obwohl ein Bereich gewählt ist')
        if 'Liebe' not in e['name']:
            fehler.append('die Auswahl zeigt den falschen Bereich: ' + repr(e['name']))
        if 'ausgeblendet' not in e['tipp']:
            fehler.append('die Seite blendet Bereiche aus, ohne zu sagen, '
                          'dass sie ausgeblendet und nicht ruhig sind')
        if e['gespeichert'] != ['liebe']:
            fehler.append('die Auswahl liegt nicht in AC_P neben dem Profil: '
                          + str(e['gespeichert']))
        if e['eigenerSchluessel']:
            fehler.append('die Auswahl legt einen eigenen Speicherschlüssel an: '
                          + str(e['eigenerSchluessel'])
                          + ' — sie gehört zu den Profildaten')
        if n['zwei']['bereiche'] != 2:
            fehler.append(f"ein zweiter Bereich ergibt {n['zwei']['bereiche']} "
                          'Bereiche statt zwei')
        if n['zwei']['gespeichert'] != ['liebe', 'beruf']:
            fehler.append('die zweite Wahl wird nicht ergänzt: '
                          + str(n['zwei']['gespeichert']))
        if n['letzter'] != 1:
            fehler.append('der letzte gewählte Bereich lässt sich abwählen — '
                          f"dann bleiben {n['letzter']} Bereiche übrig")
        if n['zurueckAlle']['bereiche'] != 10:
            fehler.append('"alle zehn" bringt nicht alle zehn zurück: '
                          + str(n['zurueckAlle']['bereiche']))
        if n['zurueckAlle']['gespeichert'] != []:
            fehler.append('alle zehn gewählt wird gespeichert, statt als '
                          '"keine Auswahl" zu gelten: '
                          + str(n['zurueckAlle']['gespeichert']))
        if n['unsinn'] != 10:
            fehler.append('ein unbekannter Bereich im Speicher leert die Seite: '
                          f"{n['unsinn']} Bereiche")
        # ── Der Tiefgang als Datei ────────────────────────────
        # Fehlerklassen: der Knopf fehlt; er schreibt nichts; die
        # Datei ist unvollständig; sie trägt Fachsprache auf Stufe 0
        # in die Hände eines Laien; oder der Tiefgang steht doch auf
        # der Seite und ist damit nicht herausgegeben, sondern nur
        # sichtbar gemacht.
        tf = n['tief']
        if len(tf['titel']) < 5:
            fehler.append('der Abschnitt über den Tiefgang hat keine Überschrift')
        if len(tf['vor']) < 300:
            fehler.append('der Abschnitt über den Tiefgang erklärt sich nicht: '
                          + repr(tf['vor'][:80]))
        if 'Schloss' not in tf['vor']:
            fehler.append('die Seite sagt nicht, dass der Tiefgang nicht '
                          'verschlossen ist, sondern noch nicht geschrieben')
        if len(tf['knopfAlle']) < 15:
            fehler.append('der Knopf für den Tiefgang ist nicht beschriftet')
        if tf['knoepfe'] != 1:
            fehler.append(f"{tf['knoepfe']} statt einem Knopf für den Tiefgang "
                          'beim gezeigten Bereich')
        if not tf['knopfPasst']:
            fehler.append('der Knopf für den Tiefgang gehört nicht zum gezeigten Bereich')
        if tf['verborgen']:
            fehler.append('der Abschnitt über den Tiefgang ist unsichtbar')

        for wo, d, mind in (('alle Bereiche', n['datei0'], 20000),
                            ('einen Bereich', n['dateiEiner'], 1500)):
            if d['fehler']:
                fehler.append(f'der Knopf für {wo} schreibt keine Datei: '
                              + d['fehler'])
                continue
            if not d['name'].startswith('tiefgang-') or not d['name'].endswith('.txt'):
                fehler.append(f'die Datei für {wo} heißt {d["name"]!r}')
            if d['laenge'] < mind:
                fehler.append(f'der Tiefgang für {wo} ist nur {d["laenge"]} '
                              f'Zeichen lang — mindestens {mind}')
            if d['fehlendeTeile']:
                fehler.append(f'dem Tiefgang für {wo} fehlen Teile: '
                              + ', '.join(d['fehlendeTeile']))
            if d['jargon']:
                fehler.append(f'Fachsprache im Tiefgang für {wo} auf Stufe 0: '
                              + ', '.join(d['jargon']))
            if d['schlecht']:
                fehler.append(f'schlechter Text im Tiefgang für {wo}: '
                              + repr(d['schlecht']))
        if n['datei0']['laenge'] and n['dateiEiner']['laenge'] >= n['datei0']['laenge']:
            fehler.append('ein einzelner Bereich ergibt keinen kürzeren '
                          'Tiefgang als alle zehn')
        if 'tiefgang-' not in n['echo']:
            fehler.append('die Seite sagt nicht, dass die Datei geschrieben '
                          'wurde: ' + repr(n['echo'][:60]))
        if n['datei3']['fehler']:
            fehler.append('auf Stufe 3 schreibt der Knopf keine Datei: '
                          + n['datei3']['fehler'])
        else:
            if n['datei3']['mechanik'] < 10:
                fehler.append(f"auf Stufe 3 stehen nur {n['datei3']['mechanik']} "
                              'Mechanik-Zeilen im Tiefgang — zu wenig')
            if n['datei3']['laenge'] <= n['datei0']['laenge']:
                fehler.append('der Tiefgang auf Stufe 3 ist nicht länger als '
                              'der auf Stufe 0 — dann wirkt der Wissensstand nicht')
        if n['aufDerSeite']:
            fehler.append('der Tiefgang steht auf der Seite statt nur in der '
                          'Datei: ' + '; '.join(n['aufDerSeite']))

        if n['ueberlauf']:
            fehler.append('seitlicher Überlauf bei ' + '; '.join(n['ueberlauf']))

probe.unlink(missing_ok=True)

# ── Bericht ────────────────────────────────────────────────────
print(f'bereiche.html  {ziel.stat().st_size:,} Bytes  →  {ziel}')
for h in hinweise:
    print('  · ' + h)
if fehler:
    print('\nFEHLER:')
    for f_ in fehler:
        print('  ✗ ' + f_)
    sys.exit(1)
print('  ✓ alles geprüft')
