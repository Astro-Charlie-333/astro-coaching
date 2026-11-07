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
           '#berwahl, .bw-leiste',
           'Jan.']:
    assert satz_darin(_s), f'müsste anschlagen: {_s}'
for _s in ['use strict',
           'nivleiste',
           '#berwahl',
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
