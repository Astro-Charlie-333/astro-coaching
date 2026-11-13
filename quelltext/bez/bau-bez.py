#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut beziehung.html — „nicht du, sondern ihr beide".

Der Vorsprung aus PRODUKT.md Abschnitt 3 hängt an dieser Seite: Die
Paarsicht allein hat jede Astrologie-App, handhabbar ist sie hier.

Seit dem 2026-11-13 (Aufgabe 52, aus 34 und 38) schreibt
`beziehung-app.js` keinen Satz mehr. Alle dreiundachtzig Zeichenketten
stehen in `beziehung-daten.js` (`BZ_T`), und „dein" bildet `B_BEUGE`
aus `kern/bahn-daten.js`. Gehalten wird das von vier Prüfungen hier:
beide Riegel aus `rituale/pruefwerk.py`, ihre Gegenprobe in allen drei
Anführungsarten, und die Angabe, dass `BZ_PUNKT` dasselbe Wort nennt
wie `niveau/wortwahl.js`.
"""
import pathlib, re, sys, json, subprocess

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
sys.path.insert(0, str(hier.parent / 'rituale'))
import pruefwerk

T = lambda n: (hier / n).read_text(encoding='utf-8')
bahn = (hier.parent / 'kern' / 'bahn-daten.js').read_text(encoding='utf-8')

kopf = '''<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Zwischen euch beiden &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<script src="niveau.js"></script>
<script src="wortwahl.js"></script>
<style>
'''
html = (kopf + T('basis.css') + "\n" + T('beziehung-stil.css') + "</style></head><body>\n"
        + T('beziehung-koerper.html') + "\n<script>\n" + T('engine.js') + "\n"
        + bahn + "\n"
        + T('beziehung-daten.js') + "\n" + T('beziehung-app.js') + "\n</script>\n</body></html>\n")
# Die App-Ansicht: Manifest, Symbol, Zwischenspeicher. Die Zeilen dafür
# stehen in app/app-kopf.html — an einer Stelle für alle Seiten.
html = html.replace('<head>', '<head>' + (hier.parent / 'app' / 'app-kopf.html').read_text(encoding='utf-8'), 1)
ziel = wiki / 'beziehung.html'
ziel.write_text(html, encoding='utf-8')

koerper = T('beziehung-koerper.html')
app = T('beziehung-app.js')
daten = T('beziehung-daten.js')
fehler = []

# ── 1 · Jede gesuchte ID steht im Körper, und die Tags gehen auf ──
ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
ges = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
if ges - ids:
    fehler.append('fehlende IDs: ' + ', '.join(sorted(ges - ids)))
if len(re.findall(r'<div\b', koerper)) != len(re.findall(r'</div>', koerper)):
    fehler.append('div-Unwucht')

# ── 2 · Keine Namen kollidieren mit der Engine oder bahn-daten.js ──
#     Seit dem 2026-11-13 liegt bahn-daten.js mit auf der Seite
#     (B_BEUGE). Zwei Dateien, die denselben Namen belegen, sind
#     keine Ordnungsfrage: Die zweite gewinnt lautlos, und welche
#     die zweite ist, entscheidet die Reihenfolge weiter oben.
def oben(quell):
    return set(re.findall(r'^(?:var|function|const|let)\s+([A-Za-z_$][\w$]*)', quell, re.M))

fremd = oben(T('engine.js')) | oben(bahn)
for name, quell in (('beziehung-daten.js', daten), ('beziehung-app.js', app)):
    koll = oben(quell) & fremd
    if koll:
        fehler.append(f'{name}: Namen kollidieren mit engine.js oder bahn-daten.js: '
                      + ', '.join(sorted(koll)))

# ── 3 · Deutsche Substantive bleiben groß (REGELN.md 4) ───────────
if '.toLowerCase(' in app + daten:
    fehler.append('toLowerCase verändert deutsche Großschreibung — nicht benutzen')

# ── 4 · Kein echtes Geburtsdatum im Quelltext (REGELN.md 6) ───────
for verboten in ('1987', '08:58'):
    if verboten in app + daten:
        fehler.append(f'echtes Geburtsdatum im Quelltext: {verboten}')

# ── 5 · Kein Satz steht denselben Namen zweimal ───────────────────
# Sonst entsteht „Mandy kann nicht einschätzen, woran Mandy ist".
# Ausnahme: der bewusste Kreuzsatz bei Mars|Saturn.
AUSNAHME = {'{B} erlebt {A} als Verhinderung, {A} erlebt {B} als rücksichtslos.'}
kt = daten[daten.find('var KONTAKT={'):]
kt = kt[:kt.find('\n};')]
for m in re.finditer(r"(tut|an|hilft):'([^']*)'", kt):
    for satz in re.split(r'(?<=[.!?]) ', m.group(2)):
        if satz in AUSNAHME:
            continue
        for ph in ('{A}', '{B}'):
            if len(re.findall(re.escape(ph) + r'(?!s)', satz)) > 1:
                fehler.append('Name doppelt im Satz: ' + satz[:70])

# ── 6 · Jedes Paar hat die drei Schritte, die Richtung stimmt ─────
for m in re.finditer(r"^ '(\w+)\|(\w+)':\{([^\n]*)", kt, re.M):
    p1, p2, rest = m.group(1), m.group(2), m.group(3)
    sym = (p1 == p2)
    hat = 'akteur:' in rest
    if sym and hat:
        fehler.append(f'{p1}|{p2}: symmetrisch, braucht keinen akteur')
    if not sym and not hat:
        fehler.append(f'{p1}|{p2}: ohne akteur bleibt die Richtung unbestimmt')
    if hat:
        ak = re.search(r"akteur:'(\w+)'", rest).group(1)
        if ak not in (p1, p2):
            fehler.append(f'{p1}|{p2}: akteur {ak} gehört nicht zum Paar')

# ── 7 · Die Anzeige schreibt keinen Satz und kein „dein" ──────────
#     Aufgabe 52, aus 34 und 38: Die Sätze stehen in
#     beziehung-daten.js, die Beugung bildet B_BEUGE aus
#     bahn-daten.js — die eine Stelle, die das Geschlecht eines
#     Punktes kennt.
fehler += pruefwerk.pruefe_anzeige_satzfrei(app, 'beziehung-app.js', 'beziehung-daten.js')
fehler += pruefwerk.pruefe_anzeige_ohne_dein(app, 'beziehung-app.js')

#     Und die Gegenprobe gegen die Fehlerklasse, die ein grüner
#     Riegel nicht ausschließt: dass er heute nur nichts zu finden
#     hatte (REGELN.md 6e, Nachsatz). In allen drei Anführungsarten —
#     ein Satz, der in doppelten oder schrägen Anführungszeichen
#     durchgeht, wäre das Loch, über das die Sätze einzeln
#     zurückkommen.
for _art, _an in (('einfache', "'"), ('doppelte', '"'), ('schräge', '`')):
    _mit = app + '\nvar _gegenprobe=' + _an + 'Wie du diesen Menschen erreichst' + _an + ';\n'
    if not pruefwerk.pruefe_anzeige_satzfrei(_mit, 'beziehung-app.js', 'beziehung-daten.js'):
        fehler.append(f'der Riegel sieht einen Satz in {_art} Anführung nicht — '
                      'dann hält er nur, was heute zufällig nicht dasteht')
    _mit = app + '\nvar _gegenprobe=' + _an + 'auf deinen Mond' + _an + ';\n'
    if not pruefwerk.pruefe_anzeige_ohne_dein(_mit, 'beziehung-app.js'):
        fehler.append(f'der Riegel sieht ein „dein" in {_art} Anführung nicht — '
                      'dann kommt die ungebeugte Form einzeln zurück')

# ── 8 · Eine Vorlage über einen genannten Menschen sagt nicht „dein" ──
#     Bis zum 2026-11-13 stand in der Terminliste „Lukas: Dein
#     Jupiter berührt gerade deine Sonne" — die Zeile nannte Lukas
#     und sprach dann die Leserin an. Der Riegel oben findet das
#     nicht, weil die Vorlage in der Datendatei steht und dort stehen
#     darf.
#
#     Geprüft wird die Form, nicht ein Wort (REGELN.md 6e): Eine
#     Vorlage, die einen Namen als Besitz vor einen Punkt setzt,
#     trägt kein zweites Besitzwort. Welche Vorlagen das sind, steht
#     an ihrem Platzhalter — {a}, {b} oder {bs} vor {pa}, {pb} oder
#     {punkt} —, nicht an einer Liste von Namen, die veraltet.
DEIN = re.compile(r'\b[Dd]ein(e|en|em|er)?\b')


def _mit_namen(form):
    """Setzt diese Vorlage einen Namen als Besitz vor einen Punkt?"""
    f = str(form)
    besitz = any(p in f for p in ('{a}', '{b}', '{bs}'))
    punkt = any(p in f for p in ('{pa}', '{pb}', '{punkt}'))
    return besitz and punkt


assert _mit_namen('{a} {pa} trifft {b} {pb}')
assert _mit_namen('{wander} berührt gerade {bs} {punkt}')
assert not _mit_namen('Deine Planeten fallen in {bs} Lebensbereiche.')
assert not _mit_namen('<b>{punkt}</b> fällt in Bereich <b>{bereich}</b>')
assert not _mit_namen('Du bist {ea}, {b} ist {eb}.')
assert DEIN.search('Dein Jupiter berührt gerade {bs} Sonne')
assert DEIN.search('{a} {pa} trifft deine {pb}')
assert not DEIN.search('{a} {pa} trifft {b} {pb}')
assert not DEIN.search('deinstalliert')

def _schluessel(roh):
    """Die Schlüssel eines Objektliterals, nur auf oberster Ebene.

    Ein Wert darf selbst Doppelpunkte und Klammern tragen; nur was
    links von einem Doppelpunkt auf Tiefe null steht, ist ein
    Schlüssel."""
    aus, tiefe, wort, gesehen = set(), 0, '', False
    for z in roh:
        if z in '{([':
            tiefe += 1
        elif z in '})]':
            tiefe -= 1
        elif tiefe == 0 and z == ',':
            wort, gesehen = '', False
            continue
        elif tiefe == 0 and z == ':' and not gesehen:
            if re.fullmatch(r'\w+', wort.strip()):
                aus.add(wort.strip())
            gesehen = True
            continue
        if tiefe == 0 and not gesehen:
            wort += z
    return aus


assert _schluessel('a:esc(x), b:y') == {'a', 'b'}
assert _schluessel('folge:(m===n?BZ_T.x:BZ_T.y)') == {'folge'}
assert _schluessel("wer:esc(l.join(BZ_T.und))") == {'wer'}
assert _schluessel('wander:x.t, typ:x.typ, bs:esc(bes(x.wen)), punkt:x.k') == \
    {'wander', 'typ', 'bs', 'punkt'}
assert _schluessel('') == set()


# ── 9 · Die Texte aus beziehung-daten.js holen ────────────────────
#     Geprüft wird an den geladenen Werten und nicht am Quelltext:
#     eine Vorlage, die über zwei Zeilen zusammengesetzt ist, sieht
#     im Quelltext anders aus als auf der Seite.
hol = hier / '_hol-daten.js'
hol.write_text(
    "const fs=require('fs'),path=require('path');\n"
    "const w={};\n"
    "function lies(n){return fs.readFileSync(path.join(__dirname,n),'utf8');}\n"
    "const f=new Function('window',\n"
    "  lies(path.join('..','niveau','wortwahl.js'))+'\\n'+\n"
    "  lies(path.join('..','kern','bahn-daten.js'))+'\\n'+\n"
    "  lies('beziehung-daten.js')+'\\n'+\n"
    "  'return {T:BZ_T, P:BZ_PUNKT, mein:function(k,laie){\\n'+\n"
    "  '  return B_BEUGE(laie?BZ_PUNKT[k]:B_PUNKT(k),\\\"nom\\\");},\\n'+\n"
    "  ' kurz:function(k,n){return window.AC_WORT.PLANET[k].kurz(n);}};');\n"
    "const r=f(w);\n"
    "const aus={T:r.T, P:r.P, mein0:{}, mein1:{}, kurz0:{}, kurz1:{}};\n"
    "for(const k in r.P){aus.mein0[k]=r.mein(k,true); aus.mein1[k]=r.mein(k,false);\n"
    "  aus.kurz0[k]=r.kurz(k,0); aus.kurz1[k]=r.kurz(k,1);}\n"
    "console.log(JSON.stringify(aus));\n", encoding='utf-8')
try:
    r = subprocess.run(['node', str(hol)], capture_output=True, text=True, timeout=60)
    D = json.loads(r.stdout) if r.returncode == 0 else None
    if D is None:
        fehler.append('beziehung-daten.js lässt sich nicht laden: ' + (r.stderr or '?')[-300:])
except Exception as e:
    fehler.append('beziehung-daten.js lässt sich nicht laden: ' + str(e)[:200])
    D = None
finally:
    hol.unlink(missing_ok=True)

if D:
    # Die Vorlagen, die einen Namen vor einen Punkt setzen
    for k, v in D['T'].items():
        if isinstance(v, str) and _mit_namen(v) and DEIN.search(v):
            fehler.append(f'BZ_T.{k} nennt einen Namen und sagt trotzdem „dein": ' + v[:70])

    # Jede Vorlage ist da und nicht leer
    for k, v in D['T'].items():
        if isinstance(v, str) and not v.strip():
            fehler.append(f'BZ_T.{k} ist leer')

    # Jeder Platzhalter einer Vorlage wird an *dieser* Vorlage
    # gefüllt. Die erste Fassung dieser Prüfung sammelte alle
    # Schlüssel aller Einsetzungen in einen Topf — damit ging
    # „{wer}" durch, weil ein anderer Abschnitt ein `wer` einsetzt,
    # und auf der Seite stand „{wer}: Neptun berührt gerade …".
    # Genau der Fall aus REGELN.md 6e: geprüft wurde ein Wort, das
    # meistens dabeisteht, und nicht die Form, die gemeint ist.
    #
    # Gelesen wird die Klammer und nicht ein Suchmuster: ein Wert wie
    # `folge:(a?BZ_T.x:BZ_T.y)` trägt selbst einen Doppelpunkt, und
    # ein Suchmuster hält `BZ_T.x` dann für einen Schlüssel.
    je_vorlage = {}
    for m in re.finditer(r'BZ_FUELL\(\s*BZ_T\.(\w+)\s*,\s*\{', app):
        tiefe, i = 1, m.end()
        while i < len(app) and tiefe:
            if app[i] in '{([':
                tiefe += 1
            elif app[i] in '})]':
                tiefe -= 1
            i += 1
        je_vorlage.setdefault(m.group(1), set()).update(
            _schluessel(app[m.end():i - 1]))

    # Eine Vorlage, die die Anzeige nicht durch BZ_FUELL schickt,
    # darf keinen Platzhalter tragen — sie landet unverändert auf
    # der Seite.
    for k, v in D['T'].items():
        if not isinstance(v, str):
            continue
        offen = set(re.findall(r'\{(\w+)\}', v)) - je_vorlage.get(k, set())
        for ph in sorted(offen):
            fehler.append(f'BZ_T.{k}: Platzhalter {{{ph}}} wird nicht gefüllt — '
                          'die geschweifte Klammer landet auf der Seite')
    # Und umgekehrt: ein Wert, für den die Vorlage keine Stelle hat,
    # ist ein Satzteil, der lautlos verschwindet.
    for name, schluessel in sorted(je_vorlage.items()):
        v = D['T'].get(name)
        if not isinstance(v, str):
            fehler.append(f'BZ_FUELL setzt in BZ_T.{name} ein — die Vorlage gibt es nicht')
            continue
        hat = set(re.findall(r'\{(\w+)\}', v))
        for ph in sorted(schluessel - hat):
            fehler.append(f'BZ_T.{name}: der Wert {ph} hat in der Vorlage keine Stelle')

    # BZ_PUNKT nennt dasselbe Wort wie niveau/wortwahl.js — geprüft,
    # nicht abgeschrieben. Bewegt sich eine der beiden Dateien,
    # bricht der Bau und nicht die Seite.
    if sorted(D['P']) != sorted(D['kurz0']):
        fehler.append('BZ_PUNKT und wortwahl.js kennen nicht dieselben Punkte')
    for k in sorted(D['P']):
        if D['mein0'][k] != D['kurz0'][k]:
            fehler.append(f'BZ_PUNKT.{k}: B_BEUGE sagt „{D["mein0"][k]}", '
                          f'wortwahl.js sagt „{D["kurz0"][k]}"')
        if D['mein1'][k] != D['kurz1'][k]:
            fehler.append(f'{k}: B_PUNKT ergibt „{D["mein1"][k]}", '
                          f'wortwahl.js sagt auf Stufe 1 „{D["kurz1"][k]}"')
        if D['P'][k]['wort'] in D['mein0'][k].split(' ', 1)[0]:
            fehler.append(f'BZ_PUNKT.{k}: das Hauptwort trägt das Besitzwort schon')

print(f'beziehung.html  {ziel.stat().st_size:,} Bytes')
for x in fehler:
    print('  FEHLER: ' + x)
sys.exit(1 if fehler else 0)
