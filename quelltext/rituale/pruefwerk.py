#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Prüfungen, die mehr als eine Seite angehen — an einer Stelle.

Warum es diese Datei gibt: Dieselbe Fehlerklasse stand bis zum 5.11. in
jedem `bau-*.py` einzeln (AUFGABEN 25, 34, 38, 40 sagen es für vier
weitere). Eine Prüfung, die in sechs Ordnern sechsmal steht, ist in fünf
davon veraltet, sobald sie einmal verschärft wird.

Hier steht die Regel einmal. Wer sie braucht, importiert sie:

    import sys, pathlib
    sys.path.insert(0, str(pathlib.Path(__file__).parent.parent / 'rituale'))
    import pruefwerk

Jede Regel hier gehorcht `REGELN.md` Abschnitt 6e: Sie prüft die **Form**,
die gemeint ist, und sie wird gegen feste Beispiele gehalten — die
`assert`-Zeilen unter jeder Regel laufen beim Import, also bevor die erste
Seite gebaut wird. Bricht eine Regel, bricht sie dort und nicht an der
Seite des Tages.
"""
import re

# ═══════════════════════════════════════════════════════════════
#  Ein Handgriff verspricht nichts
#
#  `PRODUKT.md` Abschnitt 5: keine Vorhersage, keine Dringlichkeit,
#  die es nicht gibt. Ein Handgriff steht unter „Was du tun kannst"
#  und sagt, was jetzt zu tun ist — nicht, was passiert, wenn man es
#  lässt. Drei Formen verletzen das, und alle drei standen am
#  2026-10-30 wirklich auf der Seite:
#
#   A  ein Preis auf das Nichthandeln
#      „Was du in diesem Fenster nicht fragst, musst du später
#      teurer verhandeln." — erst eine Verneinung der Handlung,
#      dann die Rechnung dafür.
#   B  eine Folge jenseits des Fensters
#      „Die Kraft, die das Festhalten kostet, brauchst du nachher."
#      — eine Zeitverschiebung und eine Behauptung darüber, was dann
#      ist.
#   C  eine Behauptung darüber, was der Handgriff hervorbringt
#      „Was dabei wegbricht, hat nur so ausgesehen, als trüge es."
#      — sagt dem Menschen voraus, was seine Handlung mit sich
#      bringt, und bewertet es gleich mit.
#
#  Was ausdrücklich durchgeht: ein Vergleich mit dem Üblichen
#  („leichter als sonst"), eine Reihenfolge innerhalb des Fensters
#  („zuerst das, dann das") und die Angabe, wofür das Fenster taugt —
#  die steht ohnehin in einem eigenen Feld.
# ═══════════════════════════════════════════════════════════════

# Die Zeit nach dem Fenster. „dann" steht absichtlich nicht dabei:
# das ordnet innerhalb des Fenters und ist keine Verschiebung.
_SPAETER = r'(?:später|nachher|danach|irgendwann|künftig|in Zukunft|am Ende)'

# Eine Behauptung darüber, was dann der Fall ist.
_FOLGT = (r'(?:wird|wirst|werden|brauchst|braucht|musst|muss|soll|sollen|'
          r'zahlst|bezahlst|kostet|hast du|bist du)')

# Ein Preis, auch ohne Zeitwort davor.
_PREIS = re.compile(
    r'teurer|zahlst du|bezahlst du|rächt sich|holt dich .{0,20}\bein\b|'
    # „sonst" als Folge, nicht als Vergleich („leichter als sonst")
    # und nicht als Aufzählung („was sonst noch läuft").
    r'(?<!als )(?<!wie )\bsonst\b(?!\s+noch)|\bandernfalls\b|\bansonsten\b',
    re.I)

# Erst die Handlung verneinen, dann die Rechnung aufmachen.
_NICHTPREIS = re.compile(
    r'\bWas du\b[^,.;]*\bnicht\b[^,.;]*,\s*\w+\s+du\b', re.I)

# Was der Handgriff hervorbringt.
_ERTRAG = re.compile(r'\bWas (?:dabei|daraus|davon|dadurch)\b', re.I)

_ZUKUNFT = re.compile(_SPAETER + r'[^.!?]{0,80}?' + _FOLGT + r'\b|'
                      + _FOLGT + r'\b[^.!?]{0,80}?' + _SPAETER, re.I)


def handgriff_tadel(text):
    """Sagt, warum dieser Handgriff nicht durchgeht — oder None.

    Geprüft wird Satz für Satz, weil eine Zeitverschiebung im ersten
    Satz nichts mit einer Behauptung im dritten zu tun hat.
    """
    if not text:
        return None
    for satz in re.split(r'(?<=[.!?])\s+', text.strip()):
        if not satz:
            continue
        if _NICHTPREIS.search(satz):
            return ('setzt einen Preis darauf, es zu lassen: '
                    f'„{satz[:70]}"')
        if _PREIS.search(satz):
            return f'macht eine Rechnung auf: „{satz[:70]}"'
        if _ZUKUNFT.search(satz):
            return ('behauptet eine Folge nach dem Fenster: '
                    f'„{satz[:70]}"')
        if _ERTRAG.search(satz):
            return ('sagt voraus, was der Handgriff hervorbringt: '
                    f'„{satz[:70]}"')
    return None


# ── Die festen Beispiele (REGELN.md 6e) ────────────────────────
# Diese Sätze standen wirklich auf der Seite und müssen anschlagen.
for _s in (
    'Fragen. Jetzt. Was du in diesem Fenster nicht fragst, '
    'musst du später teurer verhandeln.',
    'Lass gehen, was ohnehin geht. Die Kraft, die das Festhalten '
    'kostet, brauchst du nachher.',
    'Nimm dir die Sache vor, die du aufschiebst. Was dabei wegbricht, '
    'hat nur so ausgesehen, als trüge es.',
    'Du hast freie Hand und baust in Ruhe, was später tragen soll.',
    'Frag jetzt, sonst wird es schwerer.',
    'Sag es, andernfalls entscheidet jemand anders.',
    'Was du heute nicht klärst, zahlst du am Ende doppelt.',
):
    assert handgriff_tadel(_s), f'müsste anschlagen: {_s}'

# Und diese müssen durchgehen — sonst prüft die Regel das falsche.
for _s in (
    'Lass alles Wichtige von jemandem gegenlesen, der nicht beteiligt '
    'ist. Verträge unterschreibst du in diesen Wochen besser mit dem '
    'Kopf als aus dem Bauch.',
    'Halte dir etwas frei: einen Abend, einen Puffer im Kalender, eine '
    'Entscheidung, die noch offen bleiben darf.',
    'Die Energie in etwas Körperliches stecken, bevor sie in ein '
    'Gespräch gerät. Dann das Gespräch führen.',
    'Das Treffen ansetzen, das Schöne kaufen, den Frieden anbieten. '
    'Kleine Fenster, kleine Dinge.',
    'Zeig dich. Schick die Mail, melde dich, mach den Vorschlag — '
    'man sieht dich diese Tage besser.',
    'Frag nach dem, was du willst. Das geht dieser Tage leichter '
    'als sonst.',
    'Sieh nach, was sonst noch an dir zieht, und nimm dir davon eines.',
    'Das Gespräch führen, das Schreiben schreiben, die Frage stellen, '
    'die du dir schon lange selbst beantwortest.',
):
    assert not handgriff_tadel(_s), \
        f'müsste durchgehen: {_s} → {handgriff_tadel(_s)}'
del _s


# ── Die Handgriffe aus bereich-daten.js ────────────────────────
# Sie stehen dort an einer Stelle: B_WAND[*].tun für die neun
# Wanderer und B_LEER.* für den stillen Bereich. „Heute" und die
# Bereichsseite holen beide genau hier — wer einen Handgriff
# ändert, ändert ihn für alle Seiten auf einmal.
_FELD = re.compile(r"^\s*(tun[A-Za-zÄÖÜäöü]*)\s*:\s*'((?:[^'\\]|\\.)*)'",
                   re.M)


def handgriffe(daten_js):
    """Jeder Handgriff aus bereich-daten.js, als (Ort, Text)."""
    raus = []
    for m in _FELD.finditer(daten_js):
        # Der Ort ist die Zeilennummer plus der Feldname; mehr braucht
        # niemand, um die Stelle zu finden.
        zeile = daten_js.count('\n', 0, m.start()) + 1
        raus.append((f'{m.group(1)} (Zeile {zeile})',
                     m.group(2).replace("\\'", "'")))
    return raus


def pruefe_handgriffe(daten_js, woher='bereich-daten.js'):
    """Alle Handgriffe der Datendatei. Gibt die Fehlerzeilen zurück."""
    fehler = []
    gefunden = handgriffe(daten_js)
    if len(gefunden) < 9:
        fehler.append(f'{woher}: nur {len(gefunden)} Handgriffe gefunden — '
                      'die neun Wanderer und der stille Bereich müssen dabei '
                      'sein, sonst prüft die Regel ins Leere')
    for wo, text in gefunden:
        tadel = handgriff_tadel(text)
        if tadel:
            fehler.append(f'Handgriff {woher} {wo} {tadel}')
    return fehler


def pruefe_gezeichnete_handgriffe(texte, woher='der Seite'):
    """Dasselbe, aber an dem, was wirklich auf der Seite steht.

    Nötig, weil ein Handgriff auch aus einer Anzeige kommen kann, die
    ihren Satz selbst mitbringt — und dann steht er in keiner
    Datendatei. Gemessen am gezeichneten Ergebnis fällt das auf.
    """
    fehler = []
    for text in texte:
        tadel = handgriff_tadel(text)
        if tadel:
            fehler.append(f'Handgriff auf {woher} {tadel}')
    return fehler


# ═══════════════════════════════════════════════════════════════
#  In einer Anzeige steht kein Satz
#
#  `PRODUKT.md` Abschnitt 7: Rechnen, Texte und Anzeige bleiben
#  getrennt, und kein Text wandert in die Anzeige. Ein Satz, der in
#  einer `*-app.js` steht, wandert beim Umzug nach Stufe 3 nicht mit,
#  wird beim nächsten Umbau nebenbei geändert und von keiner Prüfung
#  gesehen. Genau so entstand „liegt auf deinen Ausdruck".
#
#  Bis heute stand diese Regel zweimal: streng in `bau-bereiche.py`
#  für `bereich-app.js`, lose daneben für `wahl-app.js` — und für die
#  zwanzig übrigen Anzeigen gar nicht. Das ist die Fehlerklasse aus
#  `REGELN.md` Abschnitt 6c: Was verlässlich sein soll, gehört an eine
#  Stelle. Hier ist sie.
#
#  Geprüft wird die Form, nicht ein Wort (`REGELN.md` 6e): Jede
#  Zeichenkette wird vom Markup befreit; was dann noch nach Sprache
#  aussieht, ist ein Satz. Nach Sprache sieht es aus, wenn zwei Wörter
#  nebeneinanderstehen oder ein Wort ein Satzzeichen trägt. Technische
#  Zeichenketten — IDs, Klassen, Auswahlausdrücke, Typen — haben kein
#  Leerzeichen, keinen Großbuchstaben und keinen Umlaut; ein deutscher
#  Satz hat immer eines davon.
#
#  Alle drei Anführungsarten werden gelesen. Eine Prüfung, die nur die
#  einfache Anführung sieht, lässt sich mit einem Anführungszeichen
#  umgehen — dann steht derselbe Fehler nur an einer Stelle, an die
#  niemand sieht.
_ENTITAET = {'&middot;': '·', '&mdash;': '—',
             '&ndash;': '–', '&amp;': '&', '&lt;': '<', '&gt;': '>',
             '&quot;': '"', '&nbsp;': ' ', '&hellip;': '…'}
_SATZZEICHEN = '.,:;!?…—·()'
_WORT = r'[A-Za-zÄÖÜäöüß]{2,}(?:-[A-Za-zÄÖÜäöüß0-9]+)*'
# Keine Sprache, sondern eine Anweisung an den Browser. Die Ausnahme
# steht als vollständige Zeichenkette da, nicht als enthaltenes Wort —
# sonst wäre sie ein Schlupfloch.
_DIREKTIVEN = {'use strict', 'use asm'}
# ── Ein Auswahlausdruck ist keine Sprache ──────────────────────
# Der Absatz darüber stimmt für ein einzelnes technisches Wort:
# `#berwahl` trägt kein Leerzeichen und fällt durch. Für eine *Liste*
# von Auswahlausdrücken stimmt er nicht — `#berwahl, .bw-leiste`
# trägt Komma und Leerzeichen und sieht damit aus wie Sprache. Das
# war die letzte Zeichenkette in `wahl-app.js` (Aufgabe 49): keine,
# die in eine Datendatei gehört, sondern eine Anweisung an den
# Browser. Ein Satz lässt sich dorthin nicht verschieben, also muss
# die Regel ihn erkennen, statt die Anzeige sich zu verbiegen.
#
# Erkannt wird die Form, nicht das Komma (REGELN.md 6e): mehrere
# durch Komma getrennte Teile, und **jeder** Teil beginnt mit einem
# Auswahlzeichen (`#`, `.` oder `[`). Daran kommt kein deutscher Satz
# vorbei — „Liebe, Beruf" hat dieselbe Satzform, aber keinen Teil mit
# Auswahlzeichen. Und ein einzelnes `#FCF7EF` bleibt draußen: eine
# Farbe ist kein Auswahlausdruck, sondern Gestaltung in einer
# Anzeige, und die soll gemeldet werden.
#
# Die Zeichen eines Teils dürfen auch unmittelbar aneinanderhängen:
# `.z-zelle[data-z]` ist ein Teil und nicht zwei (Aufgabe 56). Bis
# zum 2026-11-17 verlangte die Regel zwischen zwei Auswahlzeichen ein
# Leerzeichen oder einen Nachkommen-Pfeil — damit war ein Klassenname
# mit angehängter Attributauswahl ein „Satz". Ein deutscher Satz kommt
# auch so nicht durch: jeder Teil muss mit `#`, `.` oder `[` anfangen.
_AUSWAHLZEICHEN = r'(?:[#.][A-Za-z_][A-Za-z0-9_-]*|\[[^\],]+\])'
_AUSWAHLTEIL = re.compile(_AUSWAHLZEICHEN
                          + r'(?:[\s>+~]*' + _AUSWAHLZEICHEN + r')*')


def auswahlliste(s):
    """Ob `s` eine Liste von Auswahlausdrücken ist — zwei oder mehr
    Teile, jeder mit Auswahlzeichen. Nur dann ist das Komma Technik
    und nicht Sprache."""
    teile = [t.strip() for t in s.split(',')]
    return (len(teile) >= 2
            and all(_AUSWAHLTEIL.fullmatch(t) for t in teile))


# ── Eine Medienabfrage ist keine Sprache ───────────────────────
# Dieselbe Klasse wie die Auswahlliste darüber, und derselbe Grund
# (Aufgabe 50): `(prefers-reduced-motion: reduce)` fragt den Browser,
# ob dieser Mensch Bewegung abgestellt hat. Sie steht in `ich-app.js`,
# `karte-app.js` und `haeuser-app.js` — und sie trägt Leerzeichen,
# Doppelpunkt und zwei Wörter, sieht also aus wie Sprache. Verschieben
# lässt sie sich nicht: `matchMedia` verlangt genau diese Zeichenkette,
# und eine Datendatei kennt keinen Browser.
#
# Erkannt wird die Form, nicht das Wort (REGELN.md 6e): jede Bedingung
# geklammert, alles klein, kein Umlaut — und das Merkmal vor dem
# Doppelpunkt aus einem **aufgezählten** Satz. Dass die Merkmale hier
# einzeln stehen und nicht als Muster, ist der Punkt: `(liebe: beruf)`
# hat dieselbe Form und ist Sprache. Wer ein Merkmal braucht, das hier
# fehlt, trägt es ein und sieht dabei, dass er eine Sperre anfasst.
_MEDIENTYP = {'all', 'screen', 'print', 'speech', 'not', 'only'}
_MEDIENMERKMAL = {
    'width', 'min-width', 'max-width',
    'height', 'min-height', 'max-height',
    'orientation', 'aspect-ratio', 'min-aspect-ratio', 'max-aspect-ratio',
    'resolution', 'min-resolution', 'max-resolution',
    'color', 'monochrome', 'hover', 'any-hover', 'pointer', 'any-pointer',
    'display-mode', 'forced-colors', 'scripting', 'update',
    'prefers-color-scheme', 'prefers-contrast',
    'prefers-reduced-motion', 'prefers-reduced-transparency'}
_MEDIENWERT = re.compile(r'[a-z0-9]+(?:[-./][a-z0-9]+)*')
_MEDIENBEDINGUNG = re.compile(r'\(\s*([a-z-]+)\s*(?::\s*([^()]+?)\s*)?\)')


def medienfrage(s):
    """Ob `s` eine Medienabfrage ist. Nur dann sind Doppelpunkt und
    Leerzeichen darin Technik und nicht Sprache."""
    s = s.strip()
    if not s or re.search(r'[A-ZÄÖÜäöüß]', s):
        return False
    teile = [t.strip() for t in re.split(r',|\band\b|\bor\b', s) if t.strip()]
    bedingungen = 0
    for t in teile:
        woerter = t.split()
        if woerter and all(w in _MEDIENTYP for w in woerter):
            continue                      # „screen", „only print"
        m = _MEDIENBEDINGUNG.fullmatch(t)
        if not m or m.group(1) not in _MEDIENMERKMAL:
            return False
        wert = m.group(2)
        if wert is not None and not all(_MEDIENWERT.fullmatch(w)
                                        for w in wert.split()):
            return False
        bedingungen += 1
    return bedingungen > 0


# ── Die festen Beispiele (REGELN.md 6e) ────────────────────────
for _m in ['(prefers-reduced-motion: reduce)',
           '(prefers-color-scheme: dark)',
           '(max-width: 600px)',
           '(min-resolution: 2dppx)',
           'screen and (min-width: 48em)',
           'only screen and (max-width: 32rem)',
           '(hover: hover) and (pointer: fine)',
           '(orientation: portrait)',
           '(display-mode: standalone)',
           '(min-aspect-ratio: 16/9)']:
    assert medienfrage(_m), f'ist eine Medienabfrage: {_m}'
# Und was dieselbe Form hat, aber Sprache ist. Ohne diese Zeilen wäre
# die Regel ein Loch: eine Klammer und ein Doppelpunkt sind billig.
for _m in ['(liebe: beruf)',
           '(zeit: jetzt)',
           '(Was du tun kannst: jetzt)',
           'Gerade steht nichts in deinen Häusern.',
           'bei jedem Menschen woanders',
           'prefers-reduced-motion: reduce',
           '(prefers-reduced-motion: reduce) und dein Mond',
           'Liebe, Beruf',
           'Zahl, Bereich[Liebe]',
           '']:
    assert not medienfrage(_m), f'ist keine Medienabfrage: {_m}'
del _m
# ── Eine Klassenliste ist keine Sprache ────────────────────────
# Die dritte dieser Art, und derselbe Grund wie bei den beiden
# darüber (Aufgabe 51): `ta.className = 'mb-roh an'` setzt zwei
# Klassen an ein Element. Das war die letzte Zeichenkette in
# `monat-app.js` — keine, die in eine Datendatei gehört, sondern eine
# Anweisung an den Browser. Eine *einzelne* Klasse fällt schon durch
# (`mb-roh` trägt kein Leerzeichen und keinen Großbuchstaben); zwei
# durch ein Leerzeichen getrennte tragen eines und sehen damit aus wie
# Sprache. Verschieben lässt sich so eine Zeichenkette nicht: eine
# Datendatei kennt keine Stilvorlage.
#
# Erkannt wird die Form, nicht das Leerzeichen (REGELN.md 6e), und
# die Teile werden **aufgezählt** wie die Merkmale der Medienabfrage:
# jeder Teil ist entweder mit Bindestrich geschrieben — so benennt
# dieses Projekt seine Klassen (`mb-roh`, `bw-leiste`, `ac-tech`,
# `ist-falsch`) — oder eine der vier bloßen Zustandsklassen, die es
# wirklich gibt. Daran kommt kein deutscher Satz vorbei:
# „alles-oder-nichts denken" hat einen Bindestrich, aber „denken" ist
# weder das eine noch das andere. Wer eine fünfte Zustandsklasse
# braucht, trägt sie ein und sieht dabei, dass er eine Sperre anfasst.
_KLASSE = re.compile(r'[a-z][a-z0-9]*(?:-[a-z0-9]+)+')
_ZUSTANDSKLASSE = {'an', 'auf', 'ist', 'voll'}


def klassenliste(s):
    """Ob `s` eine Liste von CSS-Klassen ist — zwei oder mehr Teile,
    mindestens einer mit Bindestrich, die übrigen aufgezählt. Nur dann
    ist das Leerzeichen darin Technik und nicht Sprache."""
    teile = s.split()
    return (len(teile) >= 2
            and all(_KLASSE.fullmatch(t) or t in _ZUSTANDSKLASSE
                    for t in teile)
            and any('-' in t for t in teile))


# ── Die festen Beispiele (REGELN.md 6e) ────────────────────────
for _k in ['mb-roh an',
           'mb-leer mb-roh',
           'bw-leiste an',
           'ist-falsch ist-richtig',
           'hz-opts auf',
           'mo-chip mo-klein ist',
           'ac-tech voll']:
    assert klassenliste(_k), f'ist eine Klassenliste: {_k}'
# Und was dieselbe Form hat, aber Sprache ist. Ohne diese Zeilen wäre
# die Regel ein Loch: ein Leerzeichen und ein Bindestrich sind billig.
for _k in ['alles-oder-nichts denken',
           'nicht an-deiner stelle',
           'ohne dein zutun',
           'Was du tun kannst',
           'dein Mond.',
           'Das Muster',
           'Liebe, Beruf',
           'Zahl, Bereich[Liebe]',
           'mb-roh',
           'an',
           'an auf',
           '']:
    assert not klassenliste(_k), f'ist keine Klassenliste: {_k}'
del _k


# Die drei Anführungsarten in einem Durchgang. Die Reihenfolge ist
# gleichgültig: `finditer` läuft von links, und an einer Stelle greift
# nur die Art, die dort wirklich beginnt — ein Apostroph in einer
# doppelt angeführten Zeichenkette wird also mitgelesen und nicht als
# Beginn einer neuen gezählt.
_LITERAL = re.compile(r"'((?:[^'\\\n]|\\.)*)'"
                      r'|"((?:[^"\\\n]|\\.)*)"'
                      r'|`((?:[^`\\]|\\.)*)`')


def nur_code(t):
    """Kommentare und Suchmuster weg — in einem Kommentar darf stehen,
    warum hier kein Satz steht, und /&/g ist kein Text."""
    t = re.sub(r'/\*.*?\*/', ' ', t, flags=re.S)
    t = re.sub(r'(?m)^\s*//.*$', ' ', t)
    return re.sub(r'(?<=[(,])\s*/(?:[^/\\\n]|\\.)*/[gimsuy]*', ' ', t)


def satz_darin(lit):
    """Was von einer Zeichenkette übrig bleibt, wenn man das Markup
    abzieht — oder None, wenn nichts nach Sprache aussieht."""
    if lit.strip() in _DIREKTIVEN:
        return None
    if auswahlliste(lit.strip()):
        return None
    if medienfrage(lit.strip()):
        return None
    if klassenliste(lit.strip()):
        return None
    rest = re.sub(r'</?[a-zA-Z][^>]*>?', ' ', lit)
    for k, v in _ENTITAET.items():
        rest = rest.replace(k, v)
    rest = re.sub(r'&[a-zA-Z]+;|&#\d+;', ' ', rest)
    if (' ' not in rest and not re.search(r'[A-ZÄÖÜ]', rest)
            and not re.search(r'[äöüßÄÖÜ]', rest)):
        return None          # eine technische Zeichenkette
    w = re.findall(_WORT, rest)
    if len(w) >= 2 or (w and re.search('[' + re.escape(_SATZZEICHEN) + ']',
                                       rest)):
        return rest.strip()
    return None


def saetze_in_anzeige(code):
    """Jede Zeichenkette einer Anzeige, die nach Sprache aussieht,
    als (Zeile, Text). Leere Liste heißt: diese Anzeige ist satzfrei."""
    code = nur_code(code)
    raus = []
    for m in _LITERAL.finditer(code):
        lit = m.group(1) or m.group(2) or m.group(3) or ''
        gefunden = satz_darin(lit)
        if gefunden:
            raus.append((code.count('\n', 0, m.start()) + 1, gefunden))
    return raus


def pruefe_anzeige_satzfrei(code, anzeige, daten):
    """Bricht ab, sobald in `anzeige` ein Satz steht. `daten` ist die
    Datei, in die er gehört — die Meldung soll den Weg zeigen."""
    return [f'Satz in {anzeige} statt in {daten} (Zeile {z}): "{t[:70]}"'
            for z, t in saetze_in_anzeige(code)]


# ── Die festen Beispiele (REGELN.md 6e) ────────────────────────
# Die Eingabe dieser Regel ändert sich mit jeder Anzeige, die
# umzieht. Diese Zeilen laufen beim Import — bricht die Regel, bricht
# sie hier und nicht an der Anzeige des Tages.
for _s in ['Noch kein Profil angelegt.',
           'Hier legst du eins an',
           'Was du tun kannst',
           'dein Mond.',
           'Das Muster',
           'Reading für',
           '. Haus',
           'Liebe, Beruf',
           'Zahl, Bereich[Liebe]',
           '#berwahl, Beruf',
           '#FCF7EF',
           'Jan.']:
    assert satz_darin(_s), f'müsste anschlagen: {_s}'
for _s in ['use strict',
           'nivleiste',
           '#berwahl',
           '#berwahl, .bw-leiste',
           '.bw-leiste, .bw-tipp',
           '#berwahl .bw-knoepfe, .bw-leiste',
           # Klasse und Attributauswahl hängen aneinander (Aufgabe 56)
           '.z-zelle[data-z], .zl[data-z]',
           '.z-k.leer, .z-k[data-z]',
           'ac-tech',
           'data-ab',
           'div',
           'aria-expanded',
           '</span>',
           '<span class="x"></span>',
           '',
           ' ']:
    assert not satz_darin(_s), \
        f'müsste durchgehen: {_s} → {satz_darin(_s)}'
# Und alle drei Anführungsarten werden gelesen, sonst ist die Regel
# mit einem Anführungszeichen abstellbar.
assert len(saetze_in_anzeige(
    "var a='Noch kein Profil angelegt.';\n"
    'var b="Hier legst du eins an";\n'
    'var c=`Was du tun kannst`;\n')) == 3
# Ein Kommentar darf sagen, warum hier kein Satz steht.
assert saetze_in_anzeige("// Hier steht kein Satz, weil er in die Daten gehört.\n"
                         "var a='nivleiste';\n") == []
# Ein Apostroph in einer doppelt angeführten Zeichenkette verschiebt
# die Zählung nicht.
assert len(saetze_in_anzeige('var a="das geht\'s nicht";var b=\'nivleiste\';')) == 1
del _s


# ═══════════════════════════════════════════════════════════════
#  Eine Anzeige schreibt „dein" nicht selbst
#
#  Aufgabe 38: Die Punkte tragen ihr Geschlecht in `bahn-daten.js`,
#  und `B_BEUGE` setzt „dein" im verlangten Fall davor — an einer
#  Stelle. Wo eine Anzeige die Form von Hand hinschreibt, steht
#  „liegt auf deinen Ausdruck" nur noch nicht da, wo es jemand sieht.
#
#  Gezählt wird, was in den Zeichenketten der Anzeige steht, nicht im
#  Code: `ohneDein` ist ein Name und kein Text, `B_DEIN` eine Tabelle.
#  Geprüft wird also die Form „dieses Wort steht in einem Text, den
#  die Anzeige selbst mitbringt".
_DEINFORM = re.compile(r'(?<![A-Za-zÄÖÜäöüß])[Dd]ein(?:e|em|en|er|es)?'
                       r'(?![A-Za-zÄÖÜäöüß])')


def deins_in_anzeige(code):
    """Jedes von Hand geschriebene „dein" in den Zeichenketten einer
    Anzeige, als (Zeile, Wort)."""
    code = nur_code(code)
    raus = []
    for m in _LITERAL.finditer(code):
        lit = m.group(1) or m.group(2) or m.group(3) or ''
        zeile = code.count('\n', 0, m.start()) + 1
        raus += [(zeile, d.group(0)) for d in _DEINFORM.finditer(lit)]
    return raus


def pruefe_anzeige_ohne_dein(code, anzeige):
    """Bricht ab, sobald `anzeige` „dein" selbst hinschreibt."""
    return [f'„{w}" von Hand in {anzeige} (Zeile {z}) — die Form gehört '
            'an die eine Stelle, die das Geschlecht des Punktes kennt '
            '(B_BEUGE in bahn-daten.js)'
            for z, w in deins_in_anzeige(code)]


# ── Die festen Beispiele (REGELN.md 6e) ────────────────────────
assert [w for _, w in deins_in_anzeige("var a='auf deinen Mond';")] == ['deinen']
assert deins_in_anzeige("var ohneDein = 1; var B_DEIN = {};") == []
assert deins_in_anzeige("var a='deinstalliert';") == []
assert deins_in_anzeige("// auf deinen Mond\nvar a='nivleiste';") == []
assert [w for _, w in deins_in_anzeige('var a="deine Venus";')] == ['deine']
# Alle drei Anführungsarten, sonst ist auch diese Regel mit einem
# Anführungszeichen abstellbar — die Satzregel darüber hat dieses
# Beispiel seit dem 7.11., hier fehlte es bis zum 2026-11-11.
assert [w for _, w in deins_in_anzeige('var a=`deinem Mond`;')] == ['deinem']
assert len(deins_in_anzeige("var a='dein';\nvar b=\"deine\";\nvar c=`deinen`;\n")) == 3


# ═══════════════════════════════════════════════════════════════
#  Jede Lücke einer Vorlage wird auch gefüllt
#
#  Sobald die Sätze einer Seite als Vorlagen in der Datendatei
#  stehen, entsteht eine neue Fehlerklasse: `{bereich}` wird nur
#  ersetzt, wo es auch eingesetzt wird. Eine Lücke, die niemand
#  füllt, steht in geschweiften Klammern auf der Seite — und die
#  Rauchprobe findet sie nur an der Stelle, die heute gerendert
#  wird (REGELN.md 6e).
#
#  Die Regel stand seit dem 2026-11-14 in `bau-zeit.py` und seit dem
#  2026-11-15 in `bau-karte.py`, in zwei verschiedenen Fassungen: die
#  eine las den Quelltext mitsamt Kommentaren und kannte nur
#  Schlüssel, die andere zog die Kommentare ab und zählte auch die
#  Lücke mit, die eine Anzeige selbst ersetzt. Mit `bau-mond.py` wäre
#  am 2026-11-16 eine dritte dazugekommen, deshalb steht sie jetzt
#  hier (Aufgabe 80, REGELN.md 5): Eine Regel in drei bau-*.py ist
#  nach der ersten Verschärfung in zwei von drei veraltet.
#
#  Was dieser Fassung fehlt, steht in Aufgabe 69: Sie sammelt alle
#  Schlüssel einer Anzeige in einen Topf und lässt deshalb eine Lücke
#  durch, die ein anderer Abschnitt zufällig gleich benennt. Jede
#  Seite, die sie aufruft, prüft zusätzlich im Ergebnis, dass keine
#  geschweifte Klammer auf der Seite steht.
#
#  Gefüllt heißt zweierlei: als Schlüssel in einem Füll-Aufruf
#  (`bereich:`) oder als Lücke, die die Anzeige selbst ersetzt
#  (`replace('{B}', …)`). Beides zählt, und zwar nur beides —
#  sonst wäre die Regel über ein beliebiges Vorkommen abstellbar.
_LUECKE = re.compile(r'\{([a-zA-Z][a-zA-Z0-9]*)\}')


def luecken_ohne_fueller(daten_quell, app_quell):
    """Welche Lücke aus den Vorlagen niemand füllt. Kommentare zählen
    nicht mit: dort darf stehen, wie eine Lücke aussieht."""
    offen = set(_LUECKE.findall(nur_code(daten_quell)))
    gefuellt = set(re.findall(r'\b([a-zA-Z][a-zA-Z0-9]*)\s*:', app_quell))
    gefuellt |= set(re.findall(r"""replace\(\s*['"]\{([a-zA-Z][a-zA-Z0-9]*)\}""",
                               app_quell))
    return sorted(offen - gefuellt)


def pruefe_vorlagenluecken(daten_quell, app_quell, daten):
    """Bricht ab, sobald eine Vorlage eine Lücke trägt, die in der
    Anzeige nicht gefüllt wird."""
    ohne = luecken_ohne_fueller(daten_quell, app_quell)
    if not ohne:
        return []
    return ['Vorlagenlücke in %s, die niemand füllt: %s'
            % (daten, ', '.join('{%s}' % x for x in ohne))]


# ── Die festen Beispiele (REGELN.md 6e) ────────────────────────
assert luecken_ohne_fueller("a:'{herr} im {herrhaus}. Haus'",
                            'kFuell(K_T.a,{herr:x,herrhaus:y})') == []
assert luecken_ohne_fueller("a:'{herr} im {herrhaus}. Haus'",
                            'kFuell(K_T.a,{herr:x})') == ['herrhaus']
assert luecken_ohne_fueller("t:'Du gehst {B} direkt an'",
                            "K_ZEICHEN[z].t.replace('{B}', K_BEREICH[h-1])") == []
assert luecken_ohne_fueller("t:'Du gehst {B} direkt an'", 'var B=1;') == ['B']
assert luecken_ohne_fueller("a:'ohne Luecke'", '') == []
# Eine Lücke, die in einem Kommentar erklärt wird, ist keine Vorlage.
assert luecken_ohne_fueller('/* Die Lücken heißen {so}. */\n', '') == []
assert pruefe_vorlagenluecken("a:'{herr}'", '', 'x-daten.js') == [
    'Vorlagenlücke in x-daten.js, die niemand füllt: {herr}']
assert pruefe_vorlagenluecken("a:'{herr}'", 'moFuell(T.a,{herr:x})', 'x-daten.js') == []


# ═══════════════════════════════════════════════════════════════
#  Eine Anzeige baut keinen eigenen Füller
#
#  Aufgabe 94, gefunden beim Erledigen von Aufgabe 60 am
#  2026-11-21. Die Funktion, die `{so}` durch einen Wert ersetzt,
#  stand in siebzehn Anzeigen einzeln — und in drei Fassungen, die
#  sich bei genau einem Fall unterschieden: Was passiert, wenn der
#  Wert fehlt? Dreizehn machten aus `undefined` ein '', drei ein
#  'undefined' auf der Seite, eine brach ab. Nur die letzte war
#  richtig, und sie war es erst seit einem Tag.
#
#  Die Funktion steht jetzt an einer Stelle (`kern/fuellen.js`,
#  `AC_FUELL`). Diese Regel hält das: Sie sucht nicht nach einem
#  Namen — der ist frei wählbar und die Regel damit abstellbar —,
#  sondern nach der **Form**, in der sich ein Füller überhaupt
#  bauen lässt (REGELN.md 6e). Eine Lücke entsteht nur auf zwei
#  Arten, und beide brauchen den Schlüssel als Veränderliche:
#
#   A  aus dem Schlüssel zusammengesetzt:  '{' + k + '}'
#   B  als Suchmuster mit Fanggruppe:      /\{([a-zA-Z]+)\}/g
#
#  Was ausdrücklich durchgeht: ein Aufruf von `AC_FUELL`, und ein
#  Suchmuster auf eine **feste** Lücke — `/\{A\}s/g` in
#  beziehung-app.js setzt zwei Namen samt deutscher Besitzform ein
#  und ist kein Füller über Schlüssel, sondern eine eigene Sache.
# ═══════════════════════════════════════════════════════════════

# A: eine Lücke, deren Name erst beim Laufen entsteht.
_FUELL_GEBAUT = re.compile(r"""['"]\{['"]\s*\+""")

# B: ein Suchmuster, das den Namen der Lücke fängt. Ohne Fanggruppe
#    ist es eine feste Lücke und keine über Schlüssel.
_FUELL_MUSTER = re.compile(r'/\\\{\s*\([^)\n]*\)\s*\\\}')


def _ohne_kommentar(t):
    """Nur die Kommentare weg. `nur_code` zieht auch Suchmuster ab —
    und genau die sind hier das Gesuchte."""
    t = re.sub(r'/\*.*?\*/', ' ', t, flags=re.S)
    return re.sub(r'(?m)^\s*//.*$', ' ', t)


def eigene_fueller(code):
    """Jede Stelle, an der eine Anzeige selbst eine Lücke aus einem
    Schlüssel baut, als (Zeile, Art)."""
    t = _ohne_kommentar(code)
    raus = [(t.count('\n', 0, m.start()) + 1, 'zusammengesetzt')
            for m in _FUELL_GEBAUT.finditer(t)]
    raus += [(t.count('\n', 0, m.start()) + 1, 'als Suchmuster')
             for m in _FUELL_MUSTER.finditer(t)]
    return sorted(raus)


def pruefe_fueller(code, anzeige):
    """Bricht ab, sobald `anzeige` sich einen eigenen Füller baut."""
    return [f'eigener Füller in {anzeige} (Zeile {z}, {art}) — eine '
            'Lücke füllt AC_FUELL aus kern/fuellen.js, die eine '
            'Stelle, an der ein fehlender Wert abbricht statt zu '
            'verschwinden (Aufgabe 94)'
            for z, art in eigene_fueller(code)]


# ── Die festen Beispiele (REGELN.md 6e) ────────────────────────
# Die beiden Arten, die es wirklich gab.
assert [a for _, a in eigene_fueller(
    "s=s.split('{'+k+'}').join(String(werte[k]));")] == ['zusammengesetzt']
assert [a for _, a in eigene_fueller(
    's = s.split("{" + k + "}").join(m[k]);')] == ['zusammengesetzt']
assert [a for _, a in eigene_fueller(
    r"String(v).replace(/\{([a-zA-Z]+)\}/g, function(_, k){ return w[k]; })"
)] == ['als Suchmuster']
assert [a for _, a in eigene_fueller(
    r"String(v).replace(/\{([a-zA-Z0-9]+)\}/g, f)")] == ['als Suchmuster']
# Der Aufruf der einen Stelle ist kein eigener Füller.
assert eigene_fueller("var t = AC_FUELL(T.a, {name:n, haus:h});") == []
assert eigene_fueller("return mbEsc(AC_FUELL(vorlage, werte));") == []
# Eine feste Lücke ohne Fanggruppe bleibt erlaubt: beziehung-app.js
# setzt zwei Namen mit deutscher Besitzform ein.
assert eigene_fueller(r"x.replace(/\{A\}s/g, esc(bes(A)))") == []
assert eigene_fueller(r"x.replace(/\{B\}/g, esc(B))") == []
# Eine geschweifte Klammer im Text ist keine Form.
assert eigene_fueller("var a='Die Lücken heißen {so}.';") == []
# Ein Kommentar darf die Form zeigen, die hier nicht stehen darf.
assert eigene_fueller("/* nicht: '{' + k + '}' */\nvar a=1;") == []
assert eigene_fueller("// auch nicht: '{'+k+'}'\nvar a=1;") == []
# Beide Arten in einer Datei werden beide gemeldet, nach Zeile.
assert [z for z, _ in eigene_fueller(
    "a('{'+k+'}');\n" + r"b(/\{([a-z]+)\}/g);" + "\n")] == [1, 2]
assert pruefe_fueller("s.split('{'+k+'}')", 'x-app.js')[0].startswith(
    'eigener Füller in x-app.js (Zeile 1, zusammengesetzt)')
assert pruefe_fueller('AC_FUELL(a,b)', 'x-app.js') == []


# Wer AC_FUELL aufruft, muss es auch mitbringen. Beim Umzug am
# 2026-11-22 ist das einmal passiert: Die Rechenprüfung der Bereiche
# lud tief-bauer.js ohne fuellen.js und brach mit „AC_FUELL is not
# defined" ab. Dort hat es der Bau gefunden, weil diese Rechnung
# wirklich lief — eine Anzeige, deren Zweig heute nicht gerendert
# wird, käme damit durch (REGELN.md 6e).
def ruft_ohne_stelle(seite):
    """Wahr, wenn hier eine Lücke gefüllt wird, ohne dass AC_FUELL
    auf der Seite steht."""
    return 'AC_FUELL(' in seite and 'function AC_FUELL(' not in seite


assert ruft_ohne_stelle('var t = AC_FUELL(T.a, {n:1});')
assert not ruft_ohne_stelle('function AC_FUELL(form, werte){}\n'
                            'var t = AC_FUELL(T.a, {n:1});')
assert not ruft_ohne_stelle('<p>eine Seite ohne Lücken</p>')
# Der Name allein ist kein Aufruf — so steht er in einem Kommentar
# und in dieser Meldung.
assert not ruft_ohne_stelle('/* gefüllt wird mit AC_FUELL */')


# ═══════════════════════════════════════════════════════════════
#  Ein Artikel verlangt die Form, die die Tabelle vorgibt
#
#  Am 2026-11-24 war `main` rot, ohne dass sich ein Commit geändert
#  hatte — dieselbe Klasse wie REGELN.md 6e, zum zweiten Mal. Die
#  Meldung von `bau-zauber.py`:
#
#      FEHLER: ohne Profil: „des Mond" steht auf der Seite
#      FEHLER: ohne Profil: „der Mond" steht auf der Seite
#
#  Auf der Seite stand „Heute ist Montag, der Tag des Mondes" — also
#  genau die Form aus der Tabelle — und daneben „Der Mond läuft
#  gerade leer", ein richtiger deutscher Satz. Geprüft wurde aber:
#  *steht die Zeichenkette „des " + Name irgendwo im Text?* „des
#  Mondes" enthält „des Mond", und „der Mond" ist ein Nominativ, den
#  keine Vorlage zusammengeklebt hat. Die Regel ging seit dem
#  2026-11-19 durch, weil der Tagesherrscher an keinem Bautag Mond
#  hieß; sie schlug an dem Tag zu, an dem er es war.
#
#  Gemeint war: *hinter einem Artikel steht der rohe Name, obwohl die
#  Tabelle eine andere Form vorgibt.* Daraus zwei Formen, die die
#  Regel einhalten muss (REGELN.md 6e, Punkt 1):
#
#    · Der Name ist ein eigenes Wort. „des Mondes" ist nicht
#      „des Mond".
#    · Geprüft wird der Artikel, in dem die Beugung wirklich sitzt:
#      der Genitiv. „der Mond", „den Mond", „dem Mond" sind Fälle,
#      die ein Satz richtig braucht — kein zusammengeklebtes Wort.
#
#  Und die Entscheidung steht hier und nicht im Browser: Der
#  Rauchlauf berichtet, was auf der Seite steht; was daran falsch
#  ist, entscheidet diese Funktion — darunter die festen Beispiele.
_GEN_ARTIKEL = 'des'


def roh_hinter_artikel(text, roh, *tabelle):
    """Die Formen, in denen `roh` hinter dem Genitivartikel als
    eigenes Wort steht, obwohl keine Tabellenform so lautet."""
    if not roh or not text:
        return []
    falsch = _GEN_ARTIKEL + ' ' + roh
    if falsch in tabelle:
        return []
    treffer = re.search(r'(?<![A-Za-zÄÖÜäöüß])' + _GEN_ARTIKEL + r' '
                        + re.escape(roh) + r'(?![A-Za-zÄÖÜäöüß])', text)
    return [falsch] if treffer else []


# ── Die festen Beispiele (REGELN.md 6e) ────────────────────────
# Der Fall vom 2026-11-24: die Tabellenform steht da, die Regel
# schweigt.
assert roh_hinter_artikel('Heute ist Montag, der Tag des Mondes — das '
                          'färbt alle 24 Stunden.', 'Mond',
                          'des Mondes', 'des Jupiter') == []
# Und der Nominativ im Nebensatz ist keine gebaute Form.
assert roh_hinter_artikel('Der Mond läuft gerade leer. Vorbei ist es '
                          '12:14 Uhr, dann tritt der Mond in Zwillinge.',
                          'Mond', 'des Mondes') == []
assert roh_hinter_artikel('Sie berührt den Mond nicht mehr.', 'Mond',
                          'des Mondes') == []
# Der Fehler, um den es geht: der rohe Name hinter dem Genitiv.
assert roh_hinter_artikel('Heute ist Montag, der Tag des Mond.', 'Mond',
                          'des Mondes') == ['des Mond']
assert roh_hinter_artikel('Heute ist Sonntag, der Tag des Sonne.', 'Sonne',
                          'der Sonne') == ['des Sonne']
# Wo die Tabelle selbst „des " + Name sagt, ist die Form richtig.
assert roh_hinter_artikel('Stunde des Merkur', 'Merkur', 'des Merkur') == []
# Ein Name, der in einem längeren Wort steckt, ist nicht dieser Name.
assert roh_hinter_artikel('die Bahn des Marsmondes', 'Mars',
                          'des Mars') == []
assert roh_hinter_artikel('', 'Mond', 'des Mondes') == []
assert roh_hinter_artikel('der Tag des Mondes', '', 'des Mondes') == []


# ═══════════════════════════════════════════════════════════════
#  Zwei Optionen eines Reglers heißen nicht gleich
#
#  Gefunden am 2026-11-25 auf `ereignisse-lesen.html`. Der Regler
#  für die Lautstärke bot auf Stufe 0 sechs Rungen an, und zwei
#  davon lasen „Volltreffer":
#
#      ORBWERTE = [0.2, 0.5, 1.0, 2.0, 3.0, 4.5]
#      laut(0,2) → Volltreffer   laut(0,5) → Volltreffer
#
#  Der **Wert** einer Option ist der Orbis, die **Beschriftung**
#  hängt an der Lautstärkeklasse — und zwei Werte fallen in
#  dieselbe Klasse. Das ist genau die Fehlerklasse aus REGELN.md
#  6f: Die Sperre saß am Wert, der Text hängt am Schlüssel
#  daneben. Wer die zweite Rung wählt, bedient einen Regler, der
#  nichts sagt; und der Superlativ „Volltreffer" gilt zweimal,
#  also keinmal.
#
#  Geprüft wird am gezeichneten Ergebnis, nicht an den Daten: ob
#  zwei Werte in einer Klasse landen, entscheidet die Rechnung,
#  und sichtbar wird es erst in der Liste.
def doppelte_beschriftung(regler):
    """`regler` ist eine Liste von (Name, [Beschriftungen]) — eine
    Meldung je Regler, in dem eine Beschriftung zweimal steht."""
    raus = []
    for name, texte in regler:
        sauber = [t.strip() for t in texte]
        doppelt = sorted({t for t in sauber
                          if t and sauber.count(t) > 1})
        if doppelt:
            raus.append(
                f'der Regler „{name}" bietet {", ".join(doppelt)} '
                'zweimal an — zwei Rungen mit demselben Namen sind '
                'eine Wahl ohne Unterschied (REGELN.md 6f)')
    return raus


# ── Die festen Beispiele (REGELN.md 6e) ────────────────────────
# Der Fall vom 2026-11-25.
assert len(doppelte_beschriftung(
    [('egor', ['Volltreffer', 'Volltreffer', 'sehr eng', 'eng'])])) == 1
assert 'Volltreffer' in doppelte_beschriftung(
    [('egor', ['Volltreffer', 'Volltreffer'])])[0]
# Was durchgehen muss.
assert doppelte_beschriftung([('egor', ['Volltreffer', 'sehr eng'])]) == []
assert doppelte_beschriftung([('egpl', [])]) == []
assert doppelte_beschriftung([]) == []
# Führende Leerzeichen machen aus zwei gleichen Namen keine zwei.
assert len(doppelte_beschriftung(
    [('x', ['Volltreffer', ' Volltreffer '])])) == 1
# Eine leere Beschriftung ist keine Dopplung, sondern ein
# Platzhalter („bitte wählen") — davon gibt es je Regler einen.
assert doppelte_beschriftung([('x', ['', '', 'eng'])]) == []
# Jeder Regler wird einzeln gezählt: derselbe Name in zwei
# verschiedenen Reglern ist kein Fehler.
assert doppelte_beschriftung([('a', ['eng']), ('b', ['eng'])]) == []
# Und mehr als eine Dopplung in einem Regler wird in einer
# Meldung genannt, alphabetisch.
assert doppelte_beschriftung(
    [('x', ['a', 'a', 'b', 'b'])]) == [
    'der Regler „x" bietet a, b zweimal an — zwei Rungen mit '
    'demselben Namen sind eine Wahl ohne Unterschied (REGELN.md 6f)']


# ═══════════════════════════════════════════════════════════════
#  Eine Zahl im Text trägt ein Komma
#
#  Gefunden am 2026-11-26 auf `ophiuchus.html`: „44.6 Tage",
#  „-4.9° Breite", „Die Sonne braucht für den Skorpion 6.7." — jede
#  Zahl der Seite trug einen Punkt. `REGELN.md` Abschnitt 4 verlangt
#  seit Monaten das Komma, und die Begleitungsseite hatte am
#  2026-11-24 denselben Fehler an vier Stellen.
#
#  Dort wurde er mit einer Regel über den Quelltext beantwortet
#  (`.toFixed(` außerhalb von `kommaZahl`). Die greift hier nicht:
#  Dieselbe Seite rechnet mit `toFixed(1)` auch eine Balkenbreite in
#  Prozent aus, und **CSS verlangt den Punkt**. Eine Regel, die den
#  Quelltext liest, müsste die beiden Fälle am Aufruf
#  unterscheiden — und steht damit wieder an dem Schlüssel, den
#  jemand im Kopf hatte, und nicht an der Form, die im Text landet
#  (REGELN.md 6f, derselbe Nachsatz wie bei `kommaZahl`).
#
#  Geprüft wird deshalb der **sichtbare Text der gezeichneten
#  Seite**. Das ist die Form, die gemeint ist (REGELN.md 6e): Was im
#  Stilattribut steht, liest diese Regel nie, und was ein Mensch
#  liest, prüft sie immer — gleich, über welchen Weg es dorthin kam.
#
#  Der deutsche Tausenderpunkt bleibt erlaubt, und er kommt wirklich
#  vor: Im Text der Seite steht „rund 25.800 Jahren". Ihn vom
#  Dezimalpunkt zu trennen ist eine Formfrage und keine Wortfrage —
#  hinter einem Tausenderpunkt stehen genau drei Ziffern, hinter
#  einem Dezimalpunkt eine, zwei oder mehr als drei.
# Der Punkt am Satzende gehört nicht zur Zahl: „für den Skorpion 6.7."
# ist eine Zahl mit Punkt und ein Satzende, nicht eine Zahl mit zwei.
# Deshalb sperrt der Blick nach vorn nur Ziffern und das Komma.
_ZAHLKETTE = re.compile(r'(?<![\d,.])\d+(?:\.\d+)+(?![\d,])')


def dezimalpunkte(text):
    """Jede Zahl im sichtbaren Text, die einen Punkt als
    Dezimaltrenner trägt. Rückgabe sind die Zahlen selbst, damit die
    Meldung zeigt, wonach man auf der Seite sucht."""
    raus = []
    for m in _ZAHLKETTE.finditer(text):
        teile = m.group(0).split('.')
        if any(len(t) != 3 for t in teile[1:]):
            raus.append(m.group(0))
    return sorted(set(raus))


def pruefe_dezimalpunkte(text, woher='der Seite'):
    """Bricht ab, sobald auf `text` eine Zahl mit Punkt steht."""
    schlimm = dezimalpunkte(text)
    if not schlimm:
        return []
    return ['Zahl mit Punkt statt Komma auf %s: %s — eine Zahl wird '
            'über AC_KOMMA aus kern/fuellen.js zu Text '
            '(REGELN.md Abschnitt 4)'
            % (woher, ', '.join(schlimm[:8]))]


# ── Die festen Beispiele (REGELN.md 6e) ────────────────────────
# Der Eingang dieser Regel ist der Text einer Seite und ändert sich
# mit jedem Chart, das sie zeichnet. Diese Zeilen laufen beim Import,
# also bevor die erste Seite gebaut wird.
#
# Was anschlagen muss — die Zahlen, die am 2026-11-26 wirklich
# dastanden.
for _t, _w in [('44.6 Tage', ['44.6']),
               ('6.7', ['6.7']),
               ('-4.9° Breite', ['4.9']),
               ('und für den Skorpion 6.7. Der Schlangenträger', ['6.7']),
               ('17.1 Grad nördlich', ['17.1']),
               ('44.0 Grad', ['44.0']),
               ('2.25 Grad', ['2.25']),
               # Mehr als drei Ziffern hinter dem Punkt ist kein
               # Tausenderpunkt, sondern eine krumme Zahl.
               ('0.12345', ['0.12345'])]:
    assert dezimalpunkte(_t) == _w, f'müsste anschlagen: {_t}'
# Was durchgehen muss.
for _t in ['44,6 Tage',                   # so ist es richtig
           'rund 25.800 Jahren',          # Tausenderpunkt, steht im Körper
           'von 1.234.567 Jahren',        # mehrere Tausendergruppen
           '1930 festgelegt',             # eine Jahreszahl hat keinen Punkt
           'etwa vom 29. November bis zum 17. Dezember',
           'Abschnitt 4. Die Zahl steht da',   # Satzende hinter einer Zahl
           'zu je 27 Grad 41 Minuten',
           '97,5 Prozent',
           '17° Krebs 19\'',
           '']:
    assert dezimalpunkte(_t) == [], f'müsste durchgehen: {_t} → {dezimalpunkte(_t)}'
# Und die Meldung nennt die Zahl, nicht nur, dass es eine gibt.
assert '44.6' in pruefe_dezimalpunkte('44.6 Tage')[0]
assert pruefe_dezimalpunkte('44,6 Tage') == []
del _t, _w
