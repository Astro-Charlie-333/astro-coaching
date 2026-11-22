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

# ── Vorrat prüfen, bevor etwas geschrieben wird ───────────────
# Einmal war die Bereichsliste in eine eigene Datei gewandert, die
# content-rechner.js nicht mehr mitlud. Die Rechnung lief trotzdem
# durch und lieferte leere Bereiche; der Entwurf hätte „None" in
# jedem Karussellbild gehabt. Lieber hier abbrechen.
for feld in ('bereiche', 'ehrlich', 'stand', 'bloecke'):
    if not D.get(feld):
        print(f'Die Rechnung kam ohne „{feld}" zurück — da fehlt eine Quelldatei. '
              'Siehe die Ladeliste in content-rechner.js.')
        sys.exit(1)
luecken = [x['aszendent'] for x in D['aufhaenger']['proAszendent']
           if not x.get('bereich') or not x.get('worum')]
if luecken:
    print('Zu diesen Aszendenten fehlt der Lebensbereich: ' + ', '.join(luecken))
    sys.exit(1)

SPRECHTEMPO = 2.2          # Wörter je Sekunde, ruhig gesprochen

# ── Wie lang ein Karussell sein darf ──────────────────────────
# Die Spanne steht in CONTENT-REGELN.md und wird von dort gelesen,
# nicht hier noch einmal hingeschrieben. Der Grund ist eine echte
# Fehlerklasse: Die Regel sagt „Karussell (6–9 Bilder)", die Prüfung
# unten verlangte einmal mindestens vierzehn — ein eigenes Bild je
# Aszendent plus Rahmen. Der Entwurf kam also mit sechzehn Bildern
# heraus und wurde als „gegen CONTENT-REGELN.md geprüft" gemeldet,
# während er gegen genau diese Regel verstieß. Wer die Zahl an einer
# Stelle hat, kann sie nicht an der anderen vergessen.
REGELN = (hier / 'CONTENT-REGELN.md')
if not REGELN.exists():
    print(f'CONTENT-REGELN.md liegt nicht neben diesem Skript ({REGELN}) — '
          'ohne die Regeln wird hier nichts erzeugt.')
    sys.exit(1)
REGELN_TEXT = REGELN.read_text(encoding='utf-8')
_m = re.search(r'\*\*Karussell\*\*\s*\((\d+)\s*[\u2013-]\s*(\d+)\s*Bilder\)', REGELN_TEXT)
if not _m:
    print('In CONTENT-REGELN.md steht keine Bildzahl für das Karussell mehr '
          '(erwartet: „**Karussell** (6–9 Bilder)" im Abschnitt „Die drei '
          'Formate"). Die Prüfung kann sich dann nicht an der Regel messen — '
          'lieber abbrechen als eine Länge erfinden.')
    sys.exit(1)
KAR_MIN, KAR_MAX = int(_m.group(1)), int(_m.group(2))
if KAR_MIN > KAR_MAX:
    print(f'Die Bildzahl in CONTENT-REGELN.md steht verdreht da: {KAR_MIN}–{KAR_MAX}.')
    sys.exit(1)
KAR_RAHMEN = 4             # Aufhänger, Übersetzung, Handgriff, Hinweis

# Zeichennamen gebeugt. „Vollmond in Zwillinge" stand wochenlang so im
# Entwurf: Die Rechnung liefert den Namen im Nominativ, und eingesetzt
# nach „in" oder „durch" muss er in den Dativ bzw. Akkusativ. In
# Tabellenspalten bleibt der Nominativ richtig — dort steht der Name
# als Beschriftung, nicht in einem Satz. Darum wird hier gebeugt und
# nicht in der Rechnung.
ZEICHEN_FALL = {
    'Widder':     ('im Widder',         'durch den Widder'),
    'Stier':      ('im Stier',          'durch den Stier'),
    'Zwillinge':  ('in den Zwillingen', 'durch die Zwillinge'),
    'Krebs':      ('im Krebs',          'durch den Krebs'),
    'Löwe':       ('im Löwen',          'durch den Löwen'),
    'Jungfrau':   ('in der Jungfrau',   'durch die Jungfrau'),
    'Waage':      ('in der Waage',      'durch die Waage'),
    'Skorpion':   ('im Skorpion',       'durch den Skorpion'),
    'Schütze':    ('im Schützen',       'durch den Schützen'),
    'Steinbock':  ('im Steinbock',      'durch den Steinbock'),
    'Wassermann': ('im Wassermann',     'durch den Wassermann'),
    'Fische':     ('in den Fischen',    'durch die Fische'),
}
MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli',
          'August', 'September', 'Oktober', 'November', 'Dezember']


def gebeugt(name, fall=0):
    """„Zwillinge" → „in den Zwillingen" (fall 0) bzw. „durch die Zwillinge"."""
    if name not in ZEICHEN_FALL:
        print(f'Unbekannter Zeichenname „{name}" — die Beugungsliste in '
              'mach-content.py kennt ihn nicht. Lieber abbrechen als ihn '
              'ungebeugt in einen Beitrag schreiben.')
        sys.exit(1)
    return ZEICHEN_FALL[name][fall]


def deutsch(iso):
    """2026-11-16 → „16. November 2026"."""
    j, m, t = (int(x) for x in iso.split('-'))
    return f'{t}. {MONATE[m - 1]} {j}'


def wortfolgen(satz, n=4):
    """Alle Folgen von n Wörtern, kleingeschrieben — zum Vergleichen."""
    w = re.findall(r'\w+', satz.lower())
    return {tuple(w[i:i + n]) for i in range(len(w) - n + 1)}


def einzelsaetze(block):
    return [x.strip() for x in re.split(r'(?<=[.!?])\s+', block.strip()) if x.strip()]


def ohne_wiederholung(spaeter, frueher):
    """Streicht aus `spaeter` die Sätze, die `frueher` schon sagt.

    Die Textbausteine der Plattform überschneiden sich stellenweise:
    Jupiters „was" endet auf „es kostet weniger Überredung als üblich",
    sein „tun" sagt dasselbe noch einmal mit anderen Wörtern. Im
    Karussell stand das dann auf Bild 2 und auf dem Handgriff-Bild —
    dieselbe Aussage zweimal, und keine der beiden exakt gleich, also
    ging die Prüfung auf wörtliche Dopplungen daran vorbei.

    Gestrichen wird nur, wenn mindestens ein Satz übrig bleibt: ein
    leeres Karussellbild ist schlimmer als ein doppelter Satz.
    """
    hat = wortfolgen(frueher)
    behalten = [s for s in einzelsaetze(spaeter) if not (wortfolgen(s) & hat)]
    return ' '.join(behalten) if behalten else spaeter.strip()


def ungebeugte(roh):
    """Zeichennamen, die ungebeugt hinter „in" oder „durch" stehen.

    Tabellenzeilen bleiben außen vor: dort ist der Name eine
    Spaltenbeschriftung und im Nominativ richtig.
    """
    saetze = '\n'.join(zl for zl in roh.splitlines()
                       if not zl.lstrip().startswith('|'))
    return [z for z in ZEICHEN_FALL
            if re.search(r'\b(?:in|durch)\s+' + re.escape(z) + r'\b', saetze)]


def selbsttest():
    """Prüft die Prüfung — sonst merkt niemand, wenn sie stumpf wird.

    Die Fehlerklasse ist echt: „Vollmond in Zwillinge" stand so im
    Entwurf, weil die Rechnung den Nominativ liefert. Wenn jemand das
    Muster unten umbaut, soll es hier auffallen und nicht in einem
    Beitrag.
    """
    proben = [
        ('Vollmond in Zwillinge — 24. November',        ['Zwillinge']),
        ('Vollmond in den Zwillingen — 24. November',   []),
        ('Jupiter läuft gerade durch Löwe.',            ['Löwe']),
        ('Jupiter läuft gerade durch den Löwen.',       []),
        ('Uranus steht gerade in den Zwillingen.',      []),
        ('Neumond in Fische',                           ['Fische']),
        ('Saturn steht in Widder',                      ['Widder']),
        ('Saturn steht im Widder',                      []),
        ('| Jupiter | Löwe | 28. Juli 2027 |',          []),
    ]
    for probe, soll in proben:
        ist = ungebeugte(probe)
        if ist != soll:
            print(f'Der Selbsttest der Beugungsprüfung schlägt fehl:\n'
                  f'  Probe:    {probe!r}\n'
                  f'  erwartet: {soll}\n'
                  f'  bekommen: {ist}')
            sys.exit(1)
    doppelt = ohne_wiederholung(
        'Zustimmung kostet dieser Tage weniger Überredung als üblich. Frag nach.',
        'Türen gehen auf, und es kostet weniger Überredung als üblich.')
    if doppelt != 'Frag nach.':
        print('Der Selbsttest der Wiederholungsprüfung schlägt fehl:\n'
              f'  erwartet: „Frag nach."\n  bekommen: „{doppelt}"')
        sys.exit(1)
    einzeln = ohne_wiederholung('Frag nach dem, was du willst.',
                                'Etwas wird größer und leichter.')
    if einzeln != 'Frag nach dem, was du willst.':
        print(f'Die Wiederholungsprüfung streicht zu viel: „{einzeln}"')
        sys.exit(1)
    if ohne_wiederholung('Alles doppelt.', 'Alles doppelt.') != 'Alles doppelt.':
        print('Die Wiederholungsprüfung macht ein Bild leer, statt zu behalten.')
        sys.exit(1)

    for name, (dativ, akkusativ) in ZEICHEN_FALL.items():
        if ungebeugte(f'Vollmond {dativ}.') or ungebeugte(f'Jupiter läuft {akkusativ}.'):
            print(f'Die Beugung von „{name}" fällt in die eigene Prüfung.')
            sys.exit(1)


selbsttest()


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
    titel = f"{art} {gebeugt(A['zeichenName'])} — {A['datum']['kurz']}"
    aufreisser = f"{art} am {A['datum']['kurz']}."
    # „Ein guter Zeitpunkt" wertet ein Datum, das noch nicht da ist —
    # genau das, was die Regeln als Zukunftsversprechen ausschließen.
    # Was stimmt: Ein Datum ist ein Datum, und Daten funktionieren
    # besser als Vorsätze. Das ist die Übersetzung ins Leben.
    uebersetzung = (
        'Das ist keine Vorhersage und kein Befehl. Es ist ein Datum, an dem du '
        'eine Sache anfangen kannst — und ein Datum funktioniert dafür besser '
        'als ein Vorsatz.'
        if A['mondart'] == 'neu' else
        'Das ist keine Vorhersage und kein Befehl. Es ist ein Datum, an dem du '
        'eine offene Sache zu Ende bringen kannst — und ein Datum funktioniert '
        'dafür besser als ein Vorsatz.')
    handgriff = ('Such dir eine Sache und fang sie an. Eine, nicht fünf.'
                 if A['mondart'] == 'neu'
                 else 'Such dir eine Sache und bring sie zu Ende. Eine, nicht fünf.')
    # Nicht noch einmal der Aszendenten-Satz aus Bild 1: der steht dort
    # schon und wird hier nur zur Füllung wiederholt.
    nutzen = ('Die kleinste, die du dir zutraust, ist die richtige.'
              if A['mondart'] == 'neu'
              else 'Eine, die du schon dreimal verschoben hast, ist die richtige.')
else:
    titel = f"{A['planet']} steht {gebeugt(A['zeichenName'])}"
    # Rückläufig heißt nicht „läuft durch" — der Planet steht dann im
    # Zeichen, geht darin aber zurück. Vorher stand in jeder stillen
    # Woche „läuft gerade durch", auch bei einem rückläufigen Wanderer.
    aufreisser = (f"{A['planet']} steht gerade {gebeugt(A['zeichenName'])}."
                  if A.get('rueck') else
                  f"{A['planet']} läuft gerade {gebeugt(A['zeichenName'], 1)}.")
    # Ein Dauerstand hat kein Datum, an dem er anfängt — also sagt der
    # Beitrag das, statt eine Woche so klingen zu lassen wie ein Termin.
    # Das Ende steht fest und ist gerechnet; das ist das Datum, das hier
    # ehrlich hingehört.
    dauer = (f"Das ist kein Tag, sondern ein Zeitraum: Er läuft noch bis zum "
             f"{A['bis']['kurz']} {A['bis']['jahr']}."
             if A.get('bis') else 'Das ist kein Tag, sondern ein Zeitraum.')
    uebersetzung = satzende(A['was']) + ' ' + dauer
    handgriff = satzende(A['tun'])
    nutzen = satzende(A['nutzen'])

# Handgriff und Nutzen dürfen nicht wiederholen, was die Übersetzung
# schon gesagt hat — siehe ohne_wiederholung().
handgriff = ohne_wiederholung(handgriff, uebersetzung)
nutzen = ohne_wiederholung(nutzen, uebersetzung + ' ' + handgriff)

# Zehn Bereiche auf zwölf Häuser: zwei Aszendenten landen im selben
# Bereich. Je Aszendent ein eigenes Bild hieß darum zweimal dasselbe
# Bild, Wort für Wort — und sechzehn Bilder, wo die Regeln sechs bis
# neun nennen. Dagegen stand der Satz „bei diesem Aszendenten trifft
# es den Bereich am Rand, nicht in der Mitte": Er erklärte, warum zwei
# Bilder gleich aussehen, und übersetzte selbst nichts ins Leben —
# „am Rand" heißt für eine Leserin gar nichts.
#
# Nach Lebensbereich gebündelt löst sich beides auf: Jeder Bereich
# steht einmal da, und die Aszendenten, die dort landen, stehen
# nebeneinander in derselben Zeile.
nach_bereich = []
for x in A['proAszendent']:
    for e in nach_bereich:
        if e['bereich'] == x['bereich']:
            e['aszendenten'].append(x['aszendent'])
            break
    else:
        nach_bereich.append({'bereich': x['bereich'], 'worum': x['worum'],
                             'aszendenten': [x['aszendent']]})


def aufzaehlung(namen):
    """[„Widder", „Fische"] → „Widder oder Fische".

    „und" wäre falsch: Niemand hat zwei Aszendenten. Die Zeile sagt,
    welche zwei im selben Lebensbereich landen — für die Leserin ist
    das ein Entweder-oder.
    """
    if len(namen) == 1:
        return namen[0]
    return ', '.join(namen[:-1]) + ' oder ' + namen[-1]


def verteilen(liste, n):
    """Zerlegt `liste` in n möglichst gleich große Stücke.

    Gleich groß, weil ein Karussell mit vier, vier und zwei Zeilen
    schief aussieht, wo drei Bilder mit vier, drei und drei sauber
    liegen.
    """
    k, r = divmod(len(liste), n)
    aus, i = [], 0
    for j in range(n):
        m = k + (1 if j < r else 0)
        aus.append(liste[i:i + m])
        i += m
    return [g for g in aus if g]


# So viele Inhaltsbilder, dass das Karussell in der Mitte der erlaubten
# Spanne landet — nicht am oberen Rand, damit noch ein Bild dazukann,
# ohne die Regel zu reißen.
inhaltsbilder = max(1, min((KAR_MIN + KAR_MAX) // 2 - KAR_RAHMEN,
                           len(nach_bereich)))
gruppen = verteilen(nach_bereich, inhaltsbilder)

bilder = [
    ('1 · Aufhänger', aufreisser + '\n\nWas das für dich heißt, hängt von deinem Aszendenten ab.'),
    ('2 · Übersetzung', uebersetzung),
]
for i, gruppe in enumerate(gruppen, 1):
    zeilen = []
    for e in gruppe:
        if zeilen:
            zeilen.append('')
        zeilen.append(f"**{e['bereich']}** · Aszendent "
                      f"{aufzaehlung(e['aszendenten'])}")
        zeilen.append('')
        zeilen.append(e['worum'])
    bilder.append((f"Aszendenten · {i} von {len(gruppen)}", '\n'.join(zeilen)))
bilder.append(('Vorletztes · Handgriff', handgriff + '\n\n' + nutzen))
bilder.append(('Letztes · Hinweis',
               'Auf der Seite steht, wie lange das bei dir läuft und was dein '
               'Dauerthema in diesem Bereich ist.\n\nLink im Profil.'))

# ── Beitrag 2 · Reel mit Bildschirmaufnahme ───────────────────
# Der Bereich rotiert mit der Kalenderwoche. So ist über zehn Wochen
# jeder einmal dran, statt dass derselbe immer wieder kommt.
woche_nr = int(D['woche'].split('KW')[1])
B = D['bereiche'][woche_nr % len(D['bereiche'])]

# Zwei Dinge, die der Sprechtext hier nicht tun darf:
#   · behaupten, was beim Aufnehmen auf dem Bildschirm steht. Welcher
#     Bereich oben landet, hängt an den Daten, die eingegeben werden —
#     das weiß dieses Skript nicht. Also sagt der Text, dass einer
#     aufgeklappt wird, und nicht, dass er oben steht.
#   · „Man kann es ausrechnen" behaupten. Die Rechnung ist belegt, die
#     Deutung nicht; die Seite beantwortet die Frage nicht, sie sortiert.
# Die Blöcke, die im Reel vorkommen — über ihren Platz in der Liste,
# die die Plattform selbst führt. Umbenennt jemand dort einen Block,
# wandert der neue Name in die Aufnahmeanweisung mit.
BLOCK_ZEIT = D['bloecke'][2]      # „3 · Wie lange das läuft"
BLOCK_DAUER = D['bloecke'][-1]    # „5 · Dein Dauerthema hier"

reel = [
    ('Hook', 'Bildschirm: die Seite, noch nichts eingegeben',
     f"{B['frage']} Aus dem Bauch beantwortet man das jeden Tag anders. "
     f"Ausrechnen kann man die Antwort nicht — aber man kann ausrechnen, "
     f"wo gerade am meisten zusammenkommt."),
    # Abschnitt hieß „Was man sieht" wie die Spalte daneben — in der
    # Tabelle stand die Überschrift dann zweimal nebeneinander.
    ('Die Liste',
     'Bildschirm: erst ab der Bereichsliste aufnehmen — die Eingabefelder '
     'mit den Geburtsdaten nicht mitfilmen',
     f"Zehn Lebensbereiche, gegeneinander sortiert. Welcher bei dir oben "
     f"steht, hängt an deinen Daten — ich klappe hier einen auf."),
    ('Was da steht', f"Bildschirm: {B['name']} aufklappen, langsam scrollen",
     f"{B['worum']}"),
    # Die Blocknamen kommen aus bereich-daten.js (D['bloecke']), nicht
    # aus diesem Skript. Vorher stand neben dem Dauerthema-Satz die
    # Anweisung, Block „Was du tun kannst" zu filmen. Dort steht aber
    # der Handgriff eines einzelnen Vorgangs; das Dauerthema steht im
    # letzten Block. Die Aufnahme hätte einen anderen Block gezeigt als
    # den, den die Stimme vorliest — und niemand hätte es gemerkt, weil
    # der Name hier hartcodiert stand.
    ('Der Punkt', f'Bildschirm: Block „{BLOCK_DAUER}"',
     f"{satzende(B['dauerthema'])}"),
    ('Abschluss', f'Bildschirm: Block „{BLOCK_ZEIT}"',
     'Das Nützlichste ist nicht, dass da etwas los ist — sondern dass '
     'dabeisteht, wann es vorbei ist.'),
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
z.append(f"Gilt für Montag, {deutsch(D['wocheVon'])}, bis Sonntag, "
         f"{deutsch(D['wocheBis'])}.")
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
# „in zehn Sekunden" war erfunden: Die Plattform verspricht nirgends
# eine Dauer, und sie sagt an anderer Stelle das Gegenteil davon, dass
# das schnell hingetippt ist — der Aszendent wechselt etwa alle zwei
# Stunden, die Geburtszeit muss also stimmen. Das gehört in die
# Caption, nicht das Tempo.
z.append('> Wenn du deinen Aszendenten nicht kennst: Der Rechner auf der Seite '
         'rechnet ihn aus, du brauchst Geburtsdatum, -zeit und -ort. Der '
         'Aszendent wechselt etwa alle zwei Stunden — die Uhrzeit sollte stimmen.')
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
# Nicht das Dauerthema wiederholen — das ist der Sprechtext im Video.
# Die Caption hat eine eigene Aufgabe: sagen, was die Seite wirklich
# tut, und was man als Nächstes tun kann.
z.append(f"> {B['frage']}")
z.append('>')
# „worauf Druck liegt und wie lange noch" ist der Satz, der alle vier
# Wochen im ehrlichen Einzelbild vom Freitag steht. In der Caption vom
# Mittwoch also anders sagen, sonst klingt die Woche nach einem Satz.
z.append('> Die Seite beantwortet das nicht. Sie sortiert zehn Lebensbereiche '
         'gegeneinander — interessant ist nicht, ob etwas läuft, sondern wo '
         'am meisten. Den Rest machst du.')
z.append('>')
z.append('> Wenn du es nachrechnen willst: Der Rechner steht auf der Seite, Link im Profil.')
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

z.append('## Zum Nachschlagen')
z.append('')
z.append('Die Tabelle ist der Dauerstand, keine Vorschau: Die langsamen '
         'Wanderer stehen Jahre im selben Zeichen, und das Datum ist der '
         'Zeichenwechsel — kein Termin für diese Woche.')
z.append('')
# Rückläufig und Zeichenwechsel sind zwei verschiedene Tatsachen und
# brauchen zwei Spalten. „Saturn ℞ | Widder | 15. April 2028" las sich
# als „rückläufig bis 2028": Rückläufig ist Saturn Wochen, im Widder
# bleibt er bis 2028. Das Datum gehört zum Zeichen, nicht zur Richtung.
z.append('| Wanderer | Zeichen | Richtung | im Zeichen noch bis |')
z.append('|---|---|---|---|')
for s in D['stand']:
    bis = s['bis']['kurz'] + ' ' + str(s['bis']['jahr']) if s['bis'] else 'offen'
    richtung = 'rückläufig' if s['rueck'] else 'direkt'
    z.append(f"| {s['planet']} | {s['zeichenName']} | {richtung} | {bis} |")
z.append('')
z.append('Die Daten der nächsten gut zwei Wochen stehen darunter. Was nach '
         'dem ' + deutsch(D['wocheBis']) + ' liegt, ist noch nicht dran — es '
         'wird der Aufhänger der Woche, in der es stattfindet.')
z.append('')
if D['lunationen']:
    z.append('**Mondphasen:** ' + ' · '.join(
        f"{'Neumond' if l['art'] == 'neu' else 'Vollmond'} am {l['datum']['kurz']} "
        f"{gebeugt(l['zeichenName'])}" for l in D['lunationen']))
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
    # Wertungen über ein Datum, das noch nicht da ist. Die Seite sagt,
    # worauf Druck liegt — nicht, dass ein Tag gut wird.
    'guter Zeitpunkt': 'Wertung über ein zukünftiges Datum',
    'günstiger Zeitpunkt': 'Wertung über ein zukünftiges Datum',
    'beste Zeit': 'Wertung über ein zukünftiges Datum',
    'perfekter Moment': 'Wertung über ein zukünftiges Datum',
    'richtige Moment': 'Wertung über ein zukünftiges Datum',
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

# 3 · Länge und Vollständigkeit des Karussells.
#     Die Länge wird gegen die Spanne aus CONTENT-REGELN.md geprüft, die
#     oben aus der Datei gelesen wird. Vorher stand hier „mindestens 14",
#     also das Gegenteil der Regel („6–9 Bilder"), und der Entwurf ging
#     mit sechzehn Bildern als geprüft durch. Eine Prüfung, die ihre
#     eigene Zahl mitbringt, prüft irgendwann sich selbst.
if not (KAR_MIN <= len(bilder) <= KAR_MAX):
    fehler.append(f'{len(bilder)} Karussellbilder — CONTENT-REGELN.md sagt '
                  f'{KAR_MIN} bis {KAR_MAX}')
#     Gebündelt heißt nicht weggefallen: Jeder der zwölf Aszendenten muss
#     genau einmal vorkommen, und zwar sichtbar im Bild und nicht nur in
#     der Datenstruktur.
gezeigt = [a for g in gruppen for e in g for a in e['aszendenten']]
if sorted(gezeigt) != sorted(ZEICHEN_FALL):
    fehlt = sorted(set(ZEICHEN_FALL) - set(gezeigt))
    doppelt_asz = sorted({a for a in gezeigt if gezeigt.count(a) > 1})
    if fehlt:
        fehler.append('diese Aszendenten stehen in keinem Karussellbild: '
                      + ', '.join(fehlt))
    if doppelt_asz:
        fehler.append('diese Aszendenten stehen doppelt im Karussell: '
                      + ', '.join(doppelt_asz))
asz_bilder = '\n'.join(t for n, t in bilder if n.startswith('Aszendenten'))
nicht_im_bild = [a for a in sorted(set(gezeigt))
                 if not re.search(r'\b' + re.escape(a) + r'\b', asz_bilder)]
if nicht_im_bild:
    fehler.append('diese Aszendenten sind gebündelt, stehen aber in keinem '
                  'Bildtext: ' + ', '.join(nicht_im_bild))
#     Und kein Bereich darf zweimal auftauchen — genau das war der Grund
#     für die zwei Wort-für-Wort gleichen Bilder.
bereiche_gezeigt = [e['bereich'] for g in gruppen for e in g]
doppelte_bereiche = sorted({b for b in bereiche_gezeigt
                            if bereiche_gezeigt.count(b) > 1})
if doppelte_bereiche:
    fehler.append('dieser Lebensbereich steht in mehr als einem Karussellbild: '
                  + ', '.join(doppelte_bereiche))
leer = [n for n, t in bilder if len(t.strip()) < 15]
if leer:
    fehler.append('leere Karussellbilder: ' + ', '.join(leer))

# 4 · Das Reel muss in die Länge passen, die CONTENT-REGELN.md nennt:
#     25 bis 50 Sekunden. Vorher stand hier 18 bis 55 — die Prüfung war
#     weiter als die Regel, die sie prüfen sollte.
if gesamt < 25:
    fehler.append(f'das Reel ist mit {gesamt} s zu kurz — die Regel sagt 25 bis 50 s')
if gesamt > 50:
    fehler.append(f'das Reel ist mit {gesamt} s zu lang — die Regel sagt 25 bis 50 s')

# 4a · Der Sprechtext darf nicht behaupten, was auf dem Bildschirm steht.
#      Welcher Bereich beim Aufnehmen oben landet, hängt an den
#      eingegebenen Daten und steht beim Schreiben nicht fest.
BEHAUPTET = [
    (r'[Bb]ei mir (steht|ist|liegt)', 'behauptet etwas über den eigenen Bildschirm'),
    (r'ganz oben steht', 'behauptet eine Reihenfolge, die nicht feststeht'),
    (r'kann man (es|das) (auch )?ausrechnen',
     'behauptet, die Frage sei berechenbar — die Rechnung ist belegt, die Deutung nicht'),
]
for name, bild, sprech in reel:
    for muster, grund in BEHAUPTET:
        if re.search(muster, sprech):
            fehler.append(f'Reel „{name}": {grund}')

# 4b · Keine Aufnahmeanweisung, die Geburtsdaten ins Bild holt.
for name, bild, sprech in reel:
    if re.search(r'Geburtsdaten (eingeben|eintippen)|Eingabe .{0,12}aufnehmen', bild):
        fehler.append(f'Reel „{name}": die Anweisung filmt Geburtsdaten mit')

# 4d · Jede Blockbeschriftung in einer Aufnahmeanweisung muss ein Block
#      sein, den die Plattform wirklich hat — und der Sprechtext daneben
#      muss aus genau diesem Block kommen. Die Fehlerklasse ist echt:
#      Neben dem Dauerthema-Satz stand die Anweisung, Block „Was du tun
#      kannst" zu filmen. Dort steht der Handgriff eines einzelnen
#      Vorgangs; das Dauerthema steht im letzten Block. Die Aufnahme
#      hätte etwas anderes gezeigt als das, was die Stimme vorliest.
for name, bild, sprech in reel:
    for genannt in re.findall(r'„([^„"]+)"', bild):
        if genannt not in D['bloecke']:
            fehler.append(f'Reel „{name}": „{genannt}" ist kein Block der '
                          'Bereichsseite. Die Blöcke heißen: '
                          + ' · '.join(D['bloecke']))
    if sprech.strip() == satzende(B['dauerthema']).strip() \
            and BLOCK_DAUER not in bild:
        fehler.append(f'Reel „{name}": der Sprechtext ist das Dauerthema, die '
                      f'Aufnahme zeigt aber nicht „{BLOCK_DAUER}"')
    if sprech.strip() == B['worum'].strip() and '„' in bild:
        fehler.append(f'Reel „{name}": „worum es geht" steht auf der '
                      'Bereichsseite über den Blöcken, nicht in einem Block')

# 4c · Kein Satz zweimal. Captions dürfen den Aufhänger aufgreifen —
#      innerhalb eines Beitrags ist dieselbe Zeile dagegen Füllung.
#      Die zwölf Aszendentenbilder sind absichtlich parallel gebaut und
#      bleiben außen vor.
def saetze(t):
    return [x.strip() for x in re.split(r'(?<=[.!?])\s+|\n+', t) if len(x.strip()) > 35]

for was, stuecke in (('Karussell', [t for n, t in bilder if not n.startswith('Aszendent')]),
                     ('Reel', [t for _, _, t in reel])):
    gesehen = {}
    for st in stuecke:
        for satz in saetze(st):
            if satz in gesehen:
                fehler.append(f'{was}: „{satz[:60]}…" steht zweimal')
            gesehen[satz] = True

# 5 · Keine Geburtsdaten von irgendwem.
#     Der eigene Erzeugungsstempel oben ist kein Geburtsdatum.
koerper = '\n'.join(zl for zl in text.splitlines() if not zl.startswith('Erzeugt am'))
if re.search(r'\b(19|20)\d{2}\b.{0,20}\b\d{1,2}[:.]\d{2}\b', koerper):
    fehler.append('da steht etwas, das wie ein Geburtsdatum mit Uhrzeit aussieht')
if re.search(r'\b\d{1,2}\.\d{1,2}\.(19|20)\d{2}\b', koerper):
    fehler.append('da steht ein vollständiges Datum im Geburtsdatumsformat')

# 6 · Keine Platzhalter aus leeren Datenfeldern
#     („None" und „null" entstehen, wenn eine Quelldatei fehlt.)
for platzhalter in ('None', 'null', 'undefined'):
    if re.search(r'\b' + platzhalter + r'\b', text):
        fehler.append(f'„{platzhalter}" steht im Entwurf — ein Datenfeld war leer')

# 7 · Deutsche Zahlen mit Komma
m = re.search(r'\d\.\d', text)
if m and 'Uhr' not in text[max(0, m.start()-20):m.start()+20]:
    fehler.append(f'Dezimalpunkt statt Komma: „{m.group(0)}"')

# 8 · Zeichennamen müssen gebeugt sein, wenn sie in einem Satz stehen.
#     „Vollmond in Zwillinge" ist die Fehlerklasse: Die Rechnung liefert
#     den Nominativ, und wer ihn direkt hinter „in" oder „durch" setzt,
#     schreibt falsches Deutsch in einen Beitrag, der seriös wirken soll.
#     In Tabellenzeilen steht der Name als Beschriftung — die bleiben außen vor.
for z_name in ungebeugte(text):
    fehler.append(f'„{z_name}" steht ungebeugt in einem Satz — '
                  f'richtig wäre „{gebeugt(z_name)}" bzw. '
                  f'„{gebeugt(z_name, 1)}"')

# 8a · Keine sinngleiche Wiederholung im Karussell. Prüfung 4c findet nur
#      wörtliche Dopplungen; diese hier findet dieselbe Aussage in anderen
#      Worten. Die zwölf Aszendentenbilder sind absichtlich parallel und
#      bleiben außen vor.
rahmen = [(n, t) for n, t in bilder if not n.startswith('Aszendent')]
for i, (n1, t1) in enumerate(rahmen):
    for n2, t2 in rahmen[i + 1:]:
        for s1 in saetze(t1):
            for s2 in saetze(t2):
                gemeinsam = wortfolgen(s1) & wortfolgen(s2)
                if gemeinsam:
                    folge = ' '.join(sorted(gemeinsam)[0])
                    fehler.append(f'„{n1}" und „{n2}" sagen dasselbe '
                                  f'(„…{folge}…")')

# 9 · Der Aufhänger muss in der Woche liegen, für die der Entwurf gilt.
#     Sonst steht im Montagsbeitrag ein Termin, der erst in der Woche
#     danach stattfindet — und taucht dort ein zweites Mal auf.
if A['art'] in ('station', 'lunation'):
    if not (D['wocheVon'] <= A['datum']['iso'] <= D['wocheBis']):
        fehler.append(f"der Aufhänger liegt am {A['datum']['iso']}, der Entwurf "
                      f"gilt aber für {D['wocheVon']} bis {D['wocheBis']}")

# 10 · In der Standtabelle darf das Rückläufig-Zeichen nicht in derselben
#      Zelle stehen wie der Planetenname, weil daneben ein Datum steht,
#      das den Zeichenwechsel meint. „Saturn ℞ | Widder | 15. April 2028"
#      liest sich als „rückläufig bis 2028" — rückläufig ist Saturn
#      Wochen, im Widder bleibt er bis 2028. Zwei Tatsachen, ein Datum:
#      Die Spalten müssen sie trennen.
for zeile in text.splitlines():
    if zeile.startswith('|') and '℞' in zeile:
        fehler.append('in der Standtabelle steht „℞" in der Zeile zu einem '
                      'Datum, das den Zeichenwechsel meint — die Richtung '
                      'gehört in eine eigene Spalte')
        break

print(f"{ziel.name}  {len(text):,} Zeichen  →  {ziel}")
print(f"  Karussell mit {len(bilder)} Bildern · Reel {gesamt} s · ein Einzelbild")
if fehler:
    print('\nFEHLER:')
    for f in fehler:
        print('  ✗ ' + f)
    sys.exit(1)
print('  ✓ gegen CONTENT-REGELN.md geprüft')
