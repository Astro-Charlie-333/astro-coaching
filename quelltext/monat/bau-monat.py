#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut monatsbericht.html — ein fertiger Brief pro Person und Monat.

Die Seite hing bis heute als handgepflegte Datei neben dem System und
trug eine zweite, vollständige Himmelsrechnung mit sich herum. Beides
ist hier aufgelöst: gerechnet wird gegen rituale/engine.js, die Sätze
stehen in monat-daten.js, die Anzeige in monat-app.js.

Die drei Prüfungen, die diese Datei vor allem festhält:

  · In monat-app.js steht kein Satz. Wer Prosa in die Anzeige
    schreibt, klebt sie früher oder später aus Bruchstücken zusammen —
    und so entsteht „Der Schwerpunkt liegt auf deinen Ausdruck".
  · Jeder Satz in monat-daten.js ist vollständig: er beginnt groß und
    endet mit einem Satzzeichen.
  · Jeder Schlüssel, den der Rechner liefert, hat in den Daten ein
    Wort. Sonst steht „undefined" im Brief einer Klientin.
  · Jede Anlage nennt ihr Geschlecht, und erster und vierter Fall
    folgen daraus. Damit ist die Fügung „liegt auf deinen Ausdruck"
    nicht mehr eine Sorgfaltsfrage, sondern unmöglich.
  · Der Brief nennt zu jedem laufenden Vorgang, welche Anlage dieses
    Menschen getroffen ist. Sonst beschreibt er nur den Himmel, und
    zwei Menschen bekommen denselben Text.
"""
import pathlib, re, sys, subprocess, json

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit  = hier.parent / 'rituale'

lies = lambda p: p.read_text(encoding='utf-8')

kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Monatsbericht &middot; Coach-Ansicht &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<style>
"""

ber = hier.parent / 'bereiche'

html = (kopf + lies(rit / 'basis.css') + "\n" + lies(hier / 'monat-stil.css')
        + "\n" + lies(ber / 'wahl-stil.css')
        + '</style><script src="niveau.js" defer></script>\n'
          '<script src="wortwahl.js" defer></script>\n</head><body>\n'
        + lies(hier / 'monat-koerper.html') + "\n<script>\n"
        + lies(rit / 'engine.js') + "\n"
        # Die zehn Bereiche und die Auswahl-Leiste. Der Brief rechnet
        # nichts von der Bereichsseite, muss aber wissen, welche
        # Felder zu einem gewählten Bereich gehören.
        + lies(ber / 'lebensbereiche.js') + "\n"
        + lies(ber / 'wahl-daten.js') + "\n"
        + lies(ber / 'wahl-app.js') + "\n"
        + lies(hier / 'monat-rechner.js') + "\n"
        + lies(hier / 'monat-daten.js') + "\n"
        + lies(hier / 'monat-app.js')
        + "\n</script>\n</body></html>\n")

ziel = wiki / 'monatsbericht.html'
# Die App-Ansicht: Manifest, Symbol, Zwischenspeicher. Die Zeilen dafür
# stehen in app/app-kopf.html — an einer Stelle für alle Seiten.
html = html.replace('<head>', '<head>' + (hier.parent / 'app' / 'app-kopf.html').read_text(encoding='utf-8'), 1)
ziel.write_text(html, encoding='utf-8')

fehler = []
koerper = lies(hier / 'monat-koerper.html')
app     = lies(hier / 'monat-app.js')
daten   = lies(hier / 'monat-daten.js')
rechner = lies(hier / 'monat-rechner.js')


def ohne_kommentare(t):
    t = re.sub(r'/\*.*?\*/', ' ', t, flags=re.S)
    return re.sub(r'^\s*//.*$', ' ', t, flags=re.M)


def literale(t):
    return re.findall(r"'((?:[^'\\\n]|\\.)*)'", ohne_kommentare(t))


# ── 1 · Verdrahtung ────────────────────────────────────────────
ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""mbEl\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
if gesucht - ids:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(gesucht - ids)))
if 'nivleiste' not in ids:
    fehler.append('die Leiste für den Wissensstand fehlt')
# Fehlerklasse: der Brief bietet die Bereichsauswahl an, richtet sich
# aber nicht nach ihr — oder richtet sich danach, ohne sie anzubieten.
if 'berwahl' not in ids:
    fehler.append('die Leiste für die Bereichsauswahl fehlt im Körper')
if 'AC_WAHL' not in app:
    fehler.append('der Brief beachtet die Bereichsauswahl nicht')
if "addEventListener('ac-bereiche'" not in app:
    fehler.append('der Brief wird nach einer Änderung der Auswahl nicht neu gesetzt')
# Die Felder der Auswahl kommen aus der einen Liste, nicht aus einer
# zweiten Kopie der zehn Bereiche.
if re.search(r"k:'liebe'|haeuser:\s*\[", app + daten + rechner):
    fehler.append('die Bereiche stehen im Monatsbericht noch einmal — '
                  'sie gehören allein in bereiche/lebensbereiche.js')
# Die Auswahl muss den Rechner wirklich erreichen.
if 'felder' not in rechner:
    fehler.append('der Rechner nimmt die Felder der Auswahl nicht an')

for tag in ('div', 'section', 'nav', 'details'):
    a, z = len(re.findall(r'<%s\b' % tag, koerper)), len(re.findall(r'</%s>' % tag, koerper))
    if a != z:
        fehler.append(f'{tag}-Bilanz: {a} auf, {z} zu')

for href in sorted(set(re.findall(r'href="([a-z0-9._-]+\.html)"', koerper + app))):
    if not (wiki / href).exists():
        fehler.append('Verweis ins Leere: ' + href)

# ── 2 · Namenskollisionen mit der Engine ───────────────────────
def oben(t):
    return set(re.findall(r'^(?:var|function)\s+([A-Za-z_$][\w$]*)', t, re.M))
geliehen = (lies(ber / 'lebensbereiche.js') + lies(ber / 'wahl-daten.js')
            + lies(ber / 'wahl-app.js'))
koll = ((oben(app) | oben(daten) | oben(rechner) | oben(geliehen))
        & oben(lies(rit / 'engine.js')))
if koll:
    fehler.append('Namenskollision mit der Rechen-Engine: ' + ', '.join(sorted(koll)))

# ── 3 · Keine zweite Himmelsrechnung ───────────────────────────
#     Die alte Seite trug die Engine als Kopie mit sich. Zwei
#     Rechnungen laufen auseinander, sobald eine davon gepflegt wird.
for name in ('helio', 'sunLon', 'moonLon', 'placidus', 'angles', 'jdFromUT'):
    if re.search(r'\bfunction\s+' + name + r'\b', app + daten + rechner):
        fehler.append(f'eigene Himmelsrechnung: {name} gehört allein in rituale/engine.js')
if 'ELEM' in rechner and 'ELEM=' in rechner.replace(' ', ''):
    fehler.append('eigene Bahnelemente im Rechner — die stehen in rituale/engine.js')

# ── 4 · In der Anzeige steht kein Satz ─────────────────────────
#     Fehlerklasse: sobald Prosa in monat-app.js steht, wird sie dort
#     aus Bruchstücken zusammengesetzt, und die Fügung bricht.
#     Geprüft wird nach dem Entfernen der HTML-Teile: drei Wörter
#     hintereinander sind ein Satzanfang und gehören in monat-daten.js.
for lit in literale(app):
    # Auch ein abgeschnittenes Tag ist Auszeichnung, kein Satz:
    # '<p class="x" data-art="' endet mitten im Tag.
    rest = re.sub(r'</?[a-zA-Z][^>]*>?', ' ', lit)
    woerter = re.findall(r'[A-Za-zÄÖÜäöüß]{3,}', rest)
    if len(woerter) >= 3:
        fehler.append('Text in der Anzeige statt in monat-daten.js: '
                      f'"{lit[:60]}" ({", ".join(woerter[:4])})')

# ── 5 · Die Sätze aus monat-daten.js holen ─────────────────────
hol = hier / '_hol-daten.js'
hol.write_text(
    "const fs=require('fs'),path=require('path');"
    "const w={};const f=new Function('window',"
    "fs.readFileSync(path.join(__dirname,'monat-daten.js'),'utf8'));"
    "f(w);console.log(JSON.stringify(w.AC_MONAT_TEXT));", encoding='utf-8')
try:
    r = subprocess.run(['node', str(hol)], capture_output=True, text=True, timeout=60)
    T = json.loads(r.stdout) if r.returncode == 0 else None
    if T is None:
        fehler.append('monat-daten.js lässt sich nicht laden: ' + (r.stderr or '?')[-200:])
except Exception as e:
    fehler.append('monat-daten.js lässt sich nicht laden: ' + str(e)[:200]); T = None
finally:
    hol.unlink(missing_ok=True)

lay_texte = []        # alles, was ein Laie auf Stufe 0 liest
if T:
    def satz(wo, s, mindest=30, gross=True):
        """Ein ganzer Satz: endet mit Satzzeichen, beginnt groß —
        außer er schließt an einen vorigen an (die Anrede)."""
        kern = s.replace('*', '').strip()
        if len(kern) < mindest:
            fehler.append(f'{wo}: nur {len(kern)} Zeichen — zu dünn')
        if gross and kern and not (kern[0].isupper() or kern[0] == '{'):
            fehler.append(f'{wo}: beginnt klein — "{kern[:40]}"')
        if kern and kern[-1] not in '.!?:,':
            fehler.append(f'{wo}: endet ohne Satzzeichen — "…{kern[-40:]}"')
        if s.count('*') % 2:
            fehler.append(f'{wo}: ungerade Zahl von Hervorhebungen')
        lay_texte.append((wo, s))

    if len(T['SCHWERPUNKT']) != 12:
        fehler.append(f"{len(T['SCHWERPUNKT'])} statt 12 Schwerpunktsätze")
    for i, s in enumerate(T['SCHWERPUNKT'], 1):
        satz(f'SCHWERPUNKT[{i}]', s, 40)
    if len(set(T['SCHWERPUNKT'])) != len(T['SCHWERPUNKT']):
        fehler.append('zwei Häuser haben denselben Schwerpunktsatz')

    if len(T['FRAGE']) != 12:
        fehler.append(f"{len(T['FRAGE'])} statt 12 Fragen")
    for i, s in enumerate(T['FRAGE'], 1):
        satz(f'FRAGE[{i}]', s, 25)
        if not s.strip().endswith('?'):
            fehler.append(f'FRAGE[{i}] ist keine Frage: "{s[:50]}"')
    if len(set(T['FRAGE'])) != len(T['FRAGE']):
        fehler.append('zwei Häuser haben dieselbe Frage')

    # Fehlerklasse: ein tragender Winkel bekommt die Überschrift des
    # reibenden. Dann steht „Es ist gerade zäh" über einem Absatz, der
    # von Halt spricht. Jede Bewegung braucht beide Fassungen, und sie
    # müssen sich wirklich unterscheiden.
    for w, d in sorted(T['LAUF'].items()):
        for art in ('hart', 'weich'):
            if art not in d:
                fehler.append(f'LAUF.{w}: die Fassung "{art}" fehlt')
                continue
            satz(f'LAUF.{w}.{art}.titel', d[art]['titel'], 15)
            satz(f'LAUF.{w}.{art}.text', d[art]['text'], 120)
        if 'hart' in d and 'weich' in d:
            for teil in ('titel', 'text'):
                if d['hart'][teil] == d['weich'][teil]:
                    fehler.append(f'LAUF.{w}: reibender und tragender Winkel '
                                  f'haben denselben {teil} — der Unterschied '
                                  f'ist dann nur behauptet')
    titel = [d[a]['titel'] for d in T['LAUF'].values()
             for a in ('hart', 'weich') if a in d]
    if len(set(titel)) != len(titel):
        fehler.append('zwei Fassungen tragen dieselbe Überschrift')
    satz('RUHIG.titel', T['RUHIG']['titel'], 15)
    satz('RUHIG.text', T['RUHIG']['text'], 120)
    for a in ('neumond', 'vollmond'):
        satz(f'MOND.{a}', T['MOND'][a], 120)
    satz('EINL', T['EINL'], 120, gross=False)   # schließt an die Anrede an
    satz('SCHWERPUNKT_NACH', T['SCHWERPUNKT_NACH'], 80)
    satz('FRAGE_NACH', T['FRAGE_NACH'], 40)
    satz('ZWEITES', T['ZWEITES'], 20)
    # Fehlerklasse: der Brief sortiert nach der Auswahl, sagt das aber
    # nicht — dann hält ein Mensch die genannten Vorgänge für alles,
    # was läuft. Beide Fassungen müssen da sein und sich wirklich
    # unterscheiden.
    for art in ('drin', 'draussen'):
        if art not in T.get('AUSWAHL', {}):
            fehler.append(f'AUSWAHL.{art} fehlt — der Brief verschweigt, '
                          'dass er nach der Auswahl sortiert')
            continue
        satz(f'AUSWAHL.{art}', T['AUSWAHL'][art], 80)
        if '{zahl}' not in T['AUSWAHL'][art]:
            fehler.append(f'AUSWAHL.{art} nennt nicht, wie viele Bereiche '
                          'gewählt sind')
    if T.get('AUSWAHL', {}).get('drin') == T.get('AUSWAHL', {}).get('draussen'):
        fehler.append('AUSWAHL: beide Fassungen sagen dasselbe — dann ist der '
                      'Unterschied nur behauptet')
    satz('GRUSS.text', T['GRUSS']['text'], 60)
    satz('BEDIENUNG.leer', T['BEDIENUNG']['leer'], 60)
    satz('ANREDE', T['ANREDE'], 5)

    # ── Die Anlagen: Fälle, Vollständigkeit, Wortwahl ──────────
    # Fehlerklasse: ein falscher Fall in einer Fügung. Das Geschlecht
    # steht in den Daten, und beide Formen müssen daraus folgen —
    # genau daran scheitert sonst „liegt auf deinen Ausdruck".
    FAELLE = {'m': ('dein ', 'deinen '),
              'f': ('deine ', 'deine '),
              'n': ('dein ', 'dein ')}
    for r_, A in sorted(T['ANLAGE'].items()):
        if A.get('genus') not in FAELLE:
            fehler.append(f'ANLAGE.{r_}: kein Geschlecht (m, f oder n) angegeben')
            continue
        vn, va = FAELLE[A['genus']]
        if not A['nom'].startswith(vn):
            fehler.append(f'ANLAGE.{r_} ist {A["genus"]}, der erste Fall muss mit '
                          f'"{vn}" beginnen — steht aber "{A["nom"]}"')
        elif not A['akk'].startswith(va):
            fehler.append(f'ANLAGE.{r_} ist {A["genus"]}, der vierte Fall muss mit '
                          f'"{va}" beginnen — steht aber "{A["akk"]}"')
        elif A['nom'][len(vn):] != A['akk'][len(va):]:
            fehler.append(f'ANLAGE.{r_}: erster und vierter Fall meinen nicht '
                          f'dasselbe — "{A["nom"]}" gegen "{A["akk"]}"')
        if A['nom'][:1].isupper():
            fehler.append(f'ANLAGE.{r_}: beginnt groß und passt dann in keine Lücke')
        for feld in ('nom', 'akk', 'lang'):
            if len(A[feld]) < 8:
                fehler.append(f'ANLAGE.{r_}.{feld}: zu knapp — "{A[feld]}"')
            lay_texte.append((f'ANLAGE.{r_}.{feld}', A[feld]))

    # Fehlerklasse: die Lücke wird aus dem falschen Fall gefüllt. Die
    # Lücke heißt nach ihrem Fall, und die Anzeige darf sie nur aus
    # dem gleichnamigen Feld bedienen.
    for lücke, feld in (('anlageNom', 'nom'), ('anlageAkk', 'akk')):
        for quelle in re.findall(lücke + r'\s*:\s*([A-Za-z0-9_.\[\]]+)',
                                 ohne_kommentare(app)):
            if not quelle.endswith('.' + feld):
                fehler.append(f'die Lücke {{{lücke}}} wird aus {quelle} gefüllt — '
                              f'sie verlangt die Form aus .{feld}')
    for feld, lücke in (('nom', 'anlageNom'), ('akk', 'anlageAkk')):
        if lücke not in ' '.join(
                re.findall(r'\{([a-zA-Z]+)\}', json.dumps(T, ensure_ascii=False))):
            fehler.append(f'keine einzige Lücke {{{lücke}}} in den Sätzen')

    satz('ANLAGE_SATZ', T['ANLAGE_SATZ'], 80)
    satz('BEWOHNT', T['BEWOHNT'], 80)
    satz('UNBEWOHNT', T['UNBEWOHNT'], 80)
    for w, d in sorted(T['BEDEUTUNG'].items()):
        for art in ('hart', 'weich'):
            if art not in d:
                fehler.append(f'BEDEUTUNG.{w}: die Fassung "{art}" fehlt')
                continue
            satz(f'BEDEUTUNG.{w}.{art}', d[art], 100)
            if '{anlageNom}' not in d[art]:
                fehler.append(f'BEDEUTUNG.{w}.{art} nennt die Anlage nicht')
            # Die Lücke am Satzanfang ergäbe ein kleingeschriebenes
            # „dein" als erstes Wort des Satzes.
            if re.search(r'(^|[.!?]\s)\*?\{anlageNom\}', d[art]):
                fehler.append(f'BEDEUTUNG.{w}.{art}: die Anlage steht am '
                              f'Satzanfang und wird dort kleingeschrieben')
        if d.get('hart') == d.get('weich'):
            fehler.append(f'BEDEUTUNG.{w}: reibender und tragender Winkel '
                          f'bedeuten dasselbe — dann ist die Unterscheidung '
                          f'nur behauptet')
    if T['ANLAGE_SATZ'].count('{feld}') != 1:
        fehler.append('ANLAGE_SATZ nennt nicht genau einmal das Feld, in dem '
                      'die Anlage bei diesem Menschen liegt')

    # Jeder Schlüssel des Rechners braucht ein Wort in den Daten.
    for w in re.findall(r"'(\w+)'", re.search(
            r'M_WANDERER\s*=\s*\[(.*?)\]', rechner, re.S).group(1)):
        if w not in T['LAUF']:
            fehler.append(f'Wanderer {w} hat keinen Text in LAUF')
    for r_ in re.findall(r"'(\w+)'", re.search(
            r'M_PUNKTE\s*=\s*\[(.*?)\]', rechner, re.S).group(1)):
        if r_ not in T['TECH']['punkt']:
            fehler.append(f'Punkt {r_} hat keine Dativform in TECH.punkt')
    for k in re.findall(r"k:'(\w+)'", rechner):
        if k not in T['TECH']['winkel']:
            fehler.append(f'Winkel {k} hat kein Wort in TECH.winkel')
    # Ohne diese beiden steht im Brief „undefined" statt einer Anlage.
    for r_ in re.findall(r"'(\w+)'", re.search(
            r'M_PUNKTE\s*=\s*\[(.*?)\]', rechner, re.S).group(1)):
        if r_ not in T['ANLAGE']:
            fehler.append(f'Punkt {r_} hat keine Anlage in Alltagssprache')
    for w in re.findall(r"'(\w+)'", re.search(
            r'M_WANDERER\s*=\s*\[(.*?)\]', rechner, re.S).group(1)):
        if w not in T['BEDEUTUNG']:
            fehler.append(f'Wanderer {w} sagt nicht, was er mit einer Anlage macht')
    for art in set(re.findall(r"art:'(\w+)'", rechner)):
        for w, d in T['BEDEUTUNG'].items():
            if art not in d:
                fehler.append(f'die Winkelart "{art}" hat bei {w} keine Fassung')
        for w, d in T['LAUF'].items():
            if art not in d:
                fehler.append(f'die Winkelart "{art}" hat bei {w} keine Beschreibung')

    # Platzhalter: nur die, die die Anzeige auch füllt.
    gefuellt = set(re.findall(r'\b(\w+)\s*:', ' '.join(
        re.findall(r'mbSatz\([^)]*\{([^}]*)\}', ohne_kommentare(app)))))
    gebraucht = set()
    def sammle(x):
        if isinstance(x, str):
            gebraucht.update(re.findall(r'\{([a-zA-Z]+)\}', x))
        elif isinstance(x, dict):
            for v in x.values(): sammle(v)
        elif isinstance(x, list):
            for v in x: sammle(v)
    sammle(T)
    if gebraucht - gefuellt:
        fehler.append('Platzhalter, die niemand füllt: '
                      + ', '.join(sorted(gebraucht - gefuellt)))

# ── 6 · Auf Stufe 0 kein Fachwort ──────────────────────────────
#     TECH ist ausgenommen: dort gehört die Mechanik hin, und sie
#     erscheint erst ab Stufe 2.
VERBOTEN = (
    ['Sonne', 'Mond', 'Merkur', 'Venus', 'Mars', 'Jupiter', 'Saturn',
     'Uranus', 'Neptun', 'Pluto', 'Lilith', 'Chiron']
    + ['Haus', 'Häuser', 'Hauses']
    + ['Aspekt', 'Aspekte', 'Konjunktion', 'Opposition', 'Quadrat',
       'Trigon', 'Sextil', 'Orbis', 'Orben']
    + ['Transit', 'Transite', 'Aszendent', 'Aszendenten', 'Deszendent',
       'Medium Coeli', 'rückläufig', 'winkelhaft', 'Radix', 'Ekliptik',
       'Dispositor', 'Profektion', 'Firdaria', 'Whole Sign', 'Whole-Sign']
    + ['Widder', 'Stier', 'Zwillinge', 'Krebs', 'Löwe', 'Jungfrau',
       'Waage', 'Skorpion', 'Schütze', 'Steinbock', 'Wassermann', 'Fische']
)
for wo, text in lay_texte:
    for v in VERBOTEN:
        if re.search(r'(?<![A-Za-zÄÖÜäöüß])' + re.escape(v) + r'(?![A-Za-zÄÖÜäöüß])', text):
            fehler.append(f'Fachwort "{v}" steht im Laientext {wo}: "{text[:60]}…"')
    if '°' in text:
        fehler.append(f'Gradzeichen im Laientext {wo}')
    m = re.search(r'\d\.\d', text)
    if m:
        fehler.append(f'Dezimalpunkt statt Komma in {wo}: "{m.group(0)}"')

# ── 7 · Handwerk ───────────────────────────────────────────────
if 'toLowerCase' in app + daten + rechner:
    fehler.append('toLowerCase verändert deutsche Großschreibung — nicht benutzen')
for d in ('1987', '08:58'):
    if d in app + daten + rechner + koerper:
        fehler.append(f'echte Geburtsdaten im Quelltext: {d}')
if 'mbEsc(' not in app:
    fehler.append('die Ausgabe wird nicht maskiert')
# Fehlerklasse: ein Stilattribut im Skript. Die alte Seite setzte die
# Mechanik-Zeile mit font-size und color direkt im Code — damit steht
# das Aussehen an zwei Orten, und einer davon wird nie mitgepflegt.
if re.search(r"'[^']*style=", ohne_kommentare(app)):
    fehler.append('Stilattribut im Skript — das gehört in monat-stil.css')

# ── 8 · Die Rechnung einzeln prüfen ────────────────────────────
t = subprocess.run(['node', str(hier / '_test-monat.js')],
                   capture_output=True, text=True, cwd=str(hier.parent))
if t.returncode != 0:
    fehler.append('die Rechenprüfung schlägt fehl:\n' + (t.stdout + t.stderr)[-1800:])
else:
    print('  ' + t.stdout.strip().splitlines()[-1])

# ── 9 · Rauchprobe im Browser ──────────────────────────────────
probe = hier / '_probe-monat.js'
probe.write_text(r"""
const {chromium}=(function(){const orte=[process.env.AC_PLAYWRIGHT,'playwright','/opt/npm-tools/node_modules/playwright'];for(const o of orte){if(!o)continue;try{return require(o);}catch(e){}}throw new Error('Playwright nicht gefunden. AC_PLAYWRIGHT setzen oder playwright installieren.');})();
(async()=>{
const b=await chromium.launch(); const f=[];
const p=await (await b.newContext({viewport:{width:390,height:900}})).newPage();
p.on('pageerror',e=>f.push(String(e.message).slice(0,130)));
/* Zwei erfundene Geburtsbilder mit verschiedenen Aszendenten. */
await p.addInitScript(()=>{localStorage.setItem('ac_profile_v1',JSON.stringify(
 {v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:[
  {id:'p1',name:'Lena Probe',alias:'Lena',y:1975,mo:8,d:4,h:14,mi:20,tz:1,
   lat:52.52,lon:13.405,ort:'Berlin',wlat:52.52,wlon:13.405,wort:'Berlin',eigen:true,readings:[]},
  {id:'p2',name:'Mira Probe',alias:'Mira',y:1992,mo:2,d:17,h:6,mi:5,tz:1,
   lat:48.14,lon:11.58,ort:'Muenchen',wlat:48.14,wlon:11.58,wort:'Muenchen',eigen:false,readings:[]}]}));});
await p.goto('file://ZIEL'); await p.waitForTimeout(1200);
const v=await p.evaluate(()=>({
  anrede:(document.querySelector('.mb-brief .anrede')||{}).textContent||'',
  zeit:(document.querySelector('.mb-brief .zeit')||{}).textContent||'',
  briefe:document.querySelectorAll('.mb-brief').length,
  absaetze:document.querySelectorAll('.mb-brief p').length,
  ueber:document.querySelectorAll('.mb-brief h4').length,
  kasten:document.querySelectorAll('.mb-brief .kasten').length,
  ruhig:document.querySelectorAll('.mb-brief .kasten.ruhig').length,
  anlagen:[...document.querySelectorAll('.mb-brief .anlage')].map(e=>e.innerText.trim()),
  feld:(document.querySelector('.mb-brief .anlagenfeld')||{}).innerText||'',
  frage:(document.querySelector('.mb-brief .frage')||{}).textContent||'',
  gruss:document.querySelectorAll('.mb-brief .gruss').length,
  knoepfe:document.querySelectorAll('#mbsteuer button').length,
  text:document.querySelector('.mb-brief').innerText,
  breit:document.body.scrollWidth}));
/* Profil wechseln: der Brief muss sich ändern. */
const knopf=await p.evaluate(()=>{const b=[...document.querySelectorAll('#mbsteuer button')]
 .filter(x=>/Mira/.test(x.textContent))[0]; if(!b) return false; b.click(); return true;});
await p.waitForTimeout(700);
const zwei=await p.evaluate(()=>({
  anrede:(document.querySelector('.mb-brief .anrede')||{}).textContent||'',
  ruhig:document.querySelectorAll('.mb-brief .kasten.ruhig').length,
  anlagen:[...document.querySelectorAll('.mb-brief .anlage')].map(e=>e.innerText.trim()),
  feld:(document.querySelector('.mb-brief .anlagenfeld')||{}).innerText||'',
  text:document.querySelector('.mb-brief').innerText}));
/* Monat wechseln: der Zeitraum muss sich ändern. */
await p.evaluate(()=>{const b=[...document.querySelectorAll('#mbsteuer button')]
 .filter(x=>x.textContent.trim()==='übernächster')[0]; if(b) b.click();});
await p.waitForTimeout(700);
const spaeter=await p.evaluate(()=>(document.querySelector('.mb-brief .zeit')||{}).textContent||'');
/* Zum Bearbeiten öffnen muss den Text wirklich füllen. */
await p.evaluate(()=>document.getElementById('mbroh').click());
await p.waitForTimeout(300);
const roh=await p.evaluate(()=>({sichtbar:document.getElementById('mbtext').offsetParent!==null,
  laenge:document.getElementById('mbtext').value.length,
  spitz:/[<>]/.test(document.getElementById('mbtext').value)}));
/* Stufe 0: kein Fachwort, keine Mechanik sichtbar. */
await p.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(0); }); await p.waitForTimeout(400);
const JARGON=['Konjunktion','Opposition','Quadrat','Trigon','Sextil','Orbis','Transit',
 'Aszendent','Aszendenten','Radix','Pluto','Neptun','Uranus','Saturn','Jupiter','Merkur',
 'Medium','Coeli'];
const j0=await p.evaluate(J=>{ const t=document.body.innerText;
  return J.filter(w=>new RegExp('(?<![A-Za-zÄÖÜäöüß])'+w+
    '(?![A-Za-zÄÖÜäöüß])').test(t)); }, JARGON);
const t0=await p.evaluate(()=>[...document.querySelectorAll('.ac-tech')]
  .filter(e=>e.offsetParent!==null).length);
await p.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(2); }); await p.waitForTimeout(400);
const t2=await p.evaluate(()=>[...document.querySelectorAll('.ac-tech')]
  .filter(e=>e.offsetParent!==null).length);
/* Die Bereichsauswahl: angeboten, wirksam, und sie verschweigt nicht,
   dass der Brief nach ihr sortiert.
   Vorher zurück auf das erste Profil und diesen Monat — sonst wird
   gegen einen Brief geprüft, der von jemand anderem handelt. */
await p.evaluate(()=>{const b=[...document.querySelectorAll('#mbsteuer button')]
 .filter(x=>/Lena/.test(x.textContent))[0]; if(b) b.click();});
await p.waitForTimeout(500);
await p.evaluate(()=>{const b=[...document.querySelectorAll('#mbsteuer button')]
 .filter(x=>x.textContent.trim()==='dieser')[0]; if(b) b.click();});
await p.waitForTimeout(700);
const wahl=await p.evaluate(()=>{
  const ps=AC_P.alle()[0], P=chartVon(ps), mv=AC_MONAT.monatVon(new Date(),0);
  const b=AC_MONAT.bericht(P,mv.jahr,mv.mon);
  const haeuser=b.treffer.map(x=>x.hausNatal);
  return {
    knoepfe:document.querySelectorAll('#berwahl button[data-bw]').length,
    tipp:(document.querySelector('#berwahl .bw-tipp')||{}).innerText||'',
    ohneWahl:document.querySelectorAll('.mb-brief .mb-wahl').length,
    treffer:b.treffer.length,
    drin:AC_LB.BEREICHE.filter(x=>x.haeuser.some(h=>haeuser.indexOf(h)>=0)).map(x=>x.k),
    draussen:AC_LB.BEREICHE.filter(x=>!x.haeuser.some(h=>haeuser.indexOf(h)>=0)).map(x=>x.k)};
});
let wDrin={}, wDraussen={};
if(wahl.treffer && wahl.drin.length){
  await p.evaluate(k=>{ window.AC_WAHL.setzen([k]); }, wahl.drin[0]);
  await p.waitForTimeout(900);
  wDrin=await p.evaluate(()=>({
    art:(document.querySelector('.mb-brief .mb-wahl')||{}).getAttribute
        ? document.querySelector('.mb-brief .mb-wahl').getAttribute('data-art') : '',
    text:(document.querySelector('.mb-brief .mb-wahl')||{}).innerText||'',
    briefe:document.querySelectorAll('.mb-brief').length,
    gespeichert:JSON.parse(localStorage.getItem('ac_profile_v1')||'{}').bereiche||[]}));
}
if(wahl.treffer && wahl.draussen.length){
  await p.evaluate(k=>{ window.AC_WAHL.setzen([k]); }, wahl.draussen[0]);
  await p.waitForTimeout(900);
  wDraussen=await p.evaluate(()=>({
    art:(document.querySelector('.mb-brief .mb-wahl')||{}).getAttribute
        ? document.querySelector('.mb-brief .mb-wahl').getAttribute('data-art') : '',
    text:(document.querySelector('.mb-brief .mb-wahl')||{}).innerText||'',
    kasten:document.querySelectorAll('.mb-brief .kasten').length}));
}
await p.evaluate(()=>{ window.AC_WAHL.setzen([]); });
await p.waitForTimeout(700);
const nachWahl=await p.evaluate(()=>document.querySelectorAll('.mb-brief .mb-wahl').length);
console.log(JSON.stringify({v,knopf,zwei,spaeter,roh,j0,t0,t2,
  wahl,wDrin,wDraussen,nachWahl,fehler:[...new Set(f)]}));
await b.close();})();
""".replace('ZIEL', str(ziel)), encoding='utf-8')
try:
    r = subprocess.run(['node', str(probe)], capture_output=True, text=True, timeout=240)
    pr = json.loads(r.stdout.strip().splitlines()[-1]) if r.returncode == 0 else None
    if pr is None:
        fehler.append('Rauchprobe: ' + (r.stderr.strip().splitlines() or ['?'])[-1][:200])
except Exception as e:
    fehler.append('Rauchprobe: ' + str(e)[:200]); pr = None
finally:
    probe.unlink(missing_ok=True)

if pr:
    v = pr['v']
    for f_ in pr['fehler']:
        fehler.append('JS-Fehler: ' + f_)
    if v['briefe'] != 1:        fehler.append(f"{v['briefe']} Briefe statt einem")
    if not v['anrede'].strip(): fehler.append('keine Anrede im Brief')
    if not v['zeit'].strip():   fehler.append('kein Zeitraum im Brief')
    if v['absaetze'] < 5:       fehler.append(f"nur {v['absaetze']} Absätze im Brief")
    if v['ueber'] < 2:          fehler.append(f"nur {v['ueber']} Überschriften im Brief")
    if v['kasten'] != 1:        fehler.append(f"{v['kasten']} Kästen statt einem")
    if not v['frage'].strip().endswith('?'): fehler.append('die Monatsfrage ist keine Frage')
    if v['gruss'] != 1:         fehler.append('der Gruß fehlt')
    if v['knoepfe'] < 5:        fehler.append(f"nur {v['knoepfe']} Bedienknöpfe")
    if re.search(r'undefined|NaN|\[object|Invalid', v['text']):
        fehler.append('undefined/NaN im Brief')
    if re.search(r'\{[a-zA-Z]+\}', v['text']):
        fehler.append('ungefüllter Platzhalter im Brief: '
                      + re.search(r'\{[a-zA-Z]+\}', v['text']).group(0))
    if '*' in v['text']:
        fehler.append('Sternchen aus den Daten stehen noch im Brief')
    if v['breit'] > 390:        fehler.append(f"Überlauf auf {v['breit']}px")
    # Der Brief sagt zu jedem laufenden Vorgang, welche Anlage dieses
    # Menschen getroffen ist. Ohne das beschreibt er nur den Himmel.
    for wer, b in (('erstes Profil', v), ('zweites Profil', pr['zwei'])):
        if not b['feld'].strip():
            fehler.append(f'{wer}: der Brief sagt nicht, was bei diesem '
                          f'Menschen in dem Bereich liegt, auf den der Monat zeigt')

    # ── Die Bereichsauswahl im Brief ──────────────────────────
    # Fehlerklassen: die Leiste fehlt; der Brief sortiert nach der
    # Auswahl, ohne es zu sagen; er sagt „darin läuft nichts", wo
    # etwas läuft; ohne Auswahl steht der Satz trotzdem da.
    w = pr['wahl']
    if w['knoepfe'] != 11:
        fehler.append(f"{w['knoepfe']} statt 11 Knöpfe in der Bereichsauswahl")
    if len(w['tipp']) < 40:
        fehler.append('die Auswahl erklärt sich nicht: ' + repr(w['tipp'][:60]))
    if w['ohneWahl'] != 0:
        fehler.append('ohne Auswahl redet der Brief trotzdem von einer Auswahl')
    if not w['treffer']:
        fehler.append('die Probe trifft keinen Vorgang — damit ist nicht '
                      'geprüft, ob der Brief die Auswahl beachtet')
    else:
        if not w['drin']:
            fehler.append('kein Bereich enthält einen der laufenden Vorgänge — '
                          'die Zuordnung von Feld zu Bereich greift nicht')
        else:
            d = pr['wDrin']
            if d.get('art') != 'drin':
                fehler.append('der Brief sagt nicht, dass er nach der Auswahl '
                              'sortiert: ' + repr(d.get('art')))
            if len(d.get('text', '')) < 40:
                fehler.append('der Satz über die Auswahl ist leer oder zu kurz')
            if d.get('briefe') != 1:
                fehler.append('nach einer Auswahl steht kein Brief mehr da')
            if d.get('gespeichert') != [w['drin'][0]]:
                fehler.append('die Auswahl liegt nicht in AC_P neben dem '
                              'Profil: ' + str(d.get('gespeichert')))
        if w['draussen']:
            a = pr['wDraussen']
            if a.get('art') != 'draussen':
                fehler.append('in einer Auswahl ohne laufenden Vorgang tut der '
                              'Brief, als wäre sie getroffen: ' + repr(a.get('art')))
            if a.get('kasten') != 1:
                fehler.append('der Brief verliert seinen Kasten, wenn in der '
                              'Auswahl nichts läuft')
    if pr['nachWahl'] != 0:
        fehler.append('nach "alle zehn" redet der Brief weiter von einer Auswahl')
        if b['ruhig'] and b['anlagen']:
            fehler.append(f'{wer}: ein ruhiger Monat nennt trotzdem eine '
                          f'getroffene Anlage')
        if not b['ruhig'] and not b['anlagen']:
            fehler.append(f'{wer}: etwas läuft, aber der Brief nennt keine '
                          f'Anlage dieses Menschen')
        for i, a in enumerate(b['anlagen'], 1):
            if len(a) < 120:
                fehler.append(f'{wer}: die {i}. Anlage ist mit {len(a)} Zeichen '
                              f'zu dünn für Herkunft und Bedeutung')
            if re.search(r'\bdeinen (?:Gefühlsleben|Denken|Auftreten|Rolle)\b', a):
                fehler.append(f'{wer}: falscher Fall in der {i}. Anlage — "{a[:60]}"')

    # Der Bericht muss am Geburtsbild hängen, nicht nur am Namen.
    if not pr['knopf']:
        fehler.append('das zweite Probeprofil ist nicht wählbar')
    else:
        if pr['zwei']['anrede'] == v['anrede']:
            fehler.append('der Profilwechsel ändert die Anrede nicht')
        # Ohne Namen und ohne jede Ziffer: was dann noch verschieden
        # ist, ist wirklich Inhalt und nicht nur ein anderes Datum.
        putz = lambda t: re.sub(r'\d+', '', re.sub(r'\w+ Probe|Hallo \w+', '', t))
        if putz(v['text']) == putz(pr['zwei']['text']):
            fehler.append('zwei verschiedene Geburtsbilder ergeben denselben '
                          'Bericht — außer den Daten unterscheidet ihn nichts')
    if pr['spaeter'].strip() == v['zeit'].strip():
        fehler.append('der Monatswechsel ändert den Zeitraum nicht')
    if not pr['roh']['sichtbar']:
        fehler.append('„Zum Bearbeiten öffnen" zeigt kein Feld')
    if pr['roh']['laenge'] < 400:
        fehler.append(f"der Text zum Bearbeiten hat nur "
                      f"{pr['roh']['laenge']} Zeichen")
    if pr['roh']['spitz']:
        fehler.append('im Text zum Bearbeiten stehen noch spitze Klammern')
    if pr['j0']:
        fehler.append('Fachsprache auf Stufe 0 sichtbar: ' + ', '.join(pr['j0']))
    if pr['t0'] != 0:
        fehler.append(f"{pr['t0']} Mechanik-Zeilen schon auf Stufe 0 sichtbar")
    if pr['t2'] < 1:
        fehler.append('ab Stufe 2 ist keine Mechanik-Zeile sichtbar')
    print(f"  Rauchprobe: {v['absaetze']} Absätze, {v['ueber']} Überschriften, "
          f"{v['knoepfe']} Knöpfe, Text {pr['roh']['laenge']} Zeichen")

print(f'monatsbericht.html  {ziel.stat().st_size:,} Bytes  →  {ziel}')
for f in fehler:
    print('  FEHLER: ' + f)
sys.exit(1 if fehler else 0)
