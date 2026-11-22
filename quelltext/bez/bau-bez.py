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
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Jost:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<script src="kleine-punkte.js"></script>
<script src="asteroiden.js"></script>
<script src="bazi.js"></script>
<script src="niveau.js"></script>
<script src="wortwahl.js"></script>
<style>
'''
# Aufgabe 94: kern/fuellen.js liegt mit auf der Seite. Die Lücken
# einer Vorlage füllt AC_FUELL — die eine Stelle, an der ein
# fehlender Wert abbricht statt lautlos zu verschwinden.
fuellen = T('../kern/fuellen.js')

html = (kopf + T('basis.css') + "\n" + T('beziehung-stil.css') + "</style></head><body>\n"
        + T('beziehung-koerper.html') + "\n<script>\n" + fuellen + "\n" + T('engine.js') + "\n"
        + bahn + "\n"
        + T('beziehung-daten.js') + "\n" + T('beziehung-seele-daten.js') + "\n"
        + T('beziehung-verteilung.js') + "\n" + T('beziehung-rechner.js') + "\n"
        + T('beziehung-app.js') + "\n</script>\n</body></html>\n")
# Die App-Ansicht: Manifest, Symbol, Zwischenspeicher. Die Zeilen dafür
# stehen in app/app-kopf.html — an einer Stelle für alle Seiten.
html = html.replace('<head>', '<head>' + (hier.parent / 'app' / 'app-kopf.html').read_text(encoding='utf-8'), 1)
ziel = wiki / 'beziehung.html'
ziel.write_text(html, encoding='utf-8')

koerper = T('beziehung-koerper.html')
app = T('beziehung-app.js')
daten = T('beziehung-daten.js')
seele = T('beziehung-seele-daten.js')
rechner = T('beziehung-rechner.js')
fehler = []

# ── 0 · Die alten Synastrie-Seiten leiten weiter ─────────────────
#     Bis zum 17.11. standen synastrie.html und synastrie-vertiefung.html
#     als eigene Handarbeitsseiten da. Ihr Inhalt steht jetzt unten auf
#     dieser Seite (#lesen, #vertiefung).
appkopf = (hier.parent / 'app' / 'app-kopf.html').read_text(encoding='utf-8')
WEITER = {'synastrie.html': ('lesen', 'Synastrie'),
          'synastrie-vertiefung.html': ('vertiefung', 'Synastrie-Vertiefung')}
for alt, (anker, titel) in WEITER.items():
    (wiki / alt).write_text(
        '<!DOCTYPE html><html lang="de"><head>' + appkopf + '<meta charset="UTF-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        f'<title>{titel} &middot; jetzt auf „Zwischen euch beiden“</title>\n'
        f'<link rel="canonical" href="beziehung.html#{anker}">\n'
        f'<meta http-equiv="refresh" content="0; url=beziehung.html#{anker}">\n'
        '<meta name="robots" content="noindex">\n'
        '</head><body style="font-family:system-ui,sans-serif;padding:40px 20px;max-width:560px;margin:0 auto">\n'
        f'<p>{titel} steht jetzt auf der Seite <a href="beziehung.html#{anker}">Zwischen euch beiden</a>.</p>\n'
        '</body></html>\n', encoding='utf-8')
for anker, _ in WEITER.values():
    if f'id="{anker}"' not in koerper:
        fehler.append('eine Weiterleitung zeigt auf #' + anker + ', das es nicht gibt')

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
for name, quell in (('beziehung-daten.js', daten), ('beziehung-app.js', app),
                    ('beziehung-seele-daten.js', seele), ('beziehung-rechner.js', rechner)):
    koll = oben(quell) & fremd
    if koll:
        fehler.append(f'{name}: Namen kollidieren mit engine.js oder bahn-daten.js: '
                      + ', '.join(sorted(koll)))

# ── 3 · Deutsche Substantive bleiben groß (REGELN.md 4) ───────────
if '.toLowerCase(' in app + daten + seele + rechner:
    fehler.append('toLowerCase verändert deutsche Großschreibung — nicht benutzen')

# ── 4 · Kein echtes Geburtsdatum im Quelltext (REGELN.md 6) ───────
for verboten in (r'\b1987\b', r'\b08:58\b'):
    if any(re.search(verboten, q) for q in (app, daten, seele, rechner, koerper, T('_test-bez.js'))):
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
fehler += pruefwerk.pruefe_fueller(app, 'beziehung-app.js')

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

# ── 10 · Die Seelenebene: Rechnung, Vorlagen, Rauchprobe ─────────
#     Seit dem 17.11. (Mandy: „Das muss alles drin haben") rechnet die
#     Seite die Seelenebene, das gemeinsame Bild und die chinesische
#     Ebene. Die Rechnung hat ihre Prüfdatei, die Texte ihre Vorlagen-
#     prüfung, und die Seite eine Rauchprobe auf allen Stufen.
r = subprocess.run(['node', str(hier / '_test-bez.js')], capture_output=True, text=True, timeout=180)
if r.returncode != 0:
    fehler.append('_test-bez.js gescheitert: ' + (r.stderr or '')[-300:])
else:
    fehler.extend('Rechner: ' + x for x in json.loads(r.stdout.strip().splitlines()[-1])['fehler'])

#     Jede Vorlage in BZS_T wird an genau den Stellen gefüllt, die sie
#     trägt — dieselbe Prüfung wie oben für BZ_T, an der Klammer gelesen.
bzs_je = {}
for m in re.finditer(r'BZ_FUELL\(\s*BZS_T\.(\w+)\s*,\s*\{', app):
    tiefe, i = 1, m.end()
    while i < len(app) and tiefe:
        if app[i] in '{([':
            tiefe += 1
        elif app[i] in '})]':
            tiefe -= 1
        i += 1
    bzs_je.setdefault(m.group(1), set()).update(_schluessel(app[m.end():i - 1]))
bzs_T = seele[seele.find('var BZS_T={'):seele.find('\n};', seele.find('var BZS_T={'))]
bzs_T = re.sub(r"'\s*\+\s*\n\s*'", '', bzs_T)
for m in re.finditer(r"^ (\w+):'((?:[^'\\]|\\.)*)'", bzs_T, re.M):
    k, v = m.group(1), m.group(2)
    offen = set(re.findall(r'\{(\w+)\}', v)) - bzs_je.get(k, set())
    for ph in sorted(offen):
        fehler.append(f'BZS_T.{k}: Platzhalter {{{ph}}} wird nicht gefüllt')
    for ph in sorted(bzs_je.get(k, set()) - set(re.findall(r'\{(\w+)\}', v))):
        fehler.append(f'BZS_T.{k}: der Wert {ph} hat in der Vorlage keine Stelle')
for k in bzs_je:
    if not re.search(r'^ ' + k + r':', bzs_T, re.M):
        fehler.append(f'BZ_FUELL setzt in BZS_T.{k} ein — die Vorlage gibt es nicht')
#     Die übrigen Vorlagen (Tiere, Tagesmeister) mit der gemeinsamen Prüfung
fehler += pruefwerk.pruefe_vorlagenluecken(seele[seele.find('var BZS_EBENE'):], app, 'beziehung-seele-daten.js')

#     Jeder Marker hat seine Texte, jede Ebene ihre fünf Teile
for k in re.findall(r"\{k:'(\w+)'", rechner[rechner.find('var BZR_MARKER'):rechner.find('];', rechner.find('var BZR_MARKER'))]):
    if not re.search(r'^ ' + k + r':\{n0:', seele, re.M):
        fehler.append(f'der Marker {k} hat keinen Text in BZS_MARKER')
for e in ('seelenverwandt', 'dualseele', 'karmisch', 'seelenfamilie', 'seelenlehrer'):
    blk = re.search(r'^ ' + e + r":\{name:.*?frage:'[^']+'\}", seele, re.M | re.S)
    if not blk:
        fehler.append(f'die Ebene {e} ist unvollständig')
        continue
    for teil in ('kurz', 'wesen', 'zeichen', 'aufgabe', 'schatten', 'frage'):
        if not re.search(teil + r":'[^']{12,}'", blk.group(0)):
            fehler.append(f'{e}: {teil} fehlt oder ist zu kurz')
#     Keine Angstwörter (REGELN.md 2a) und keine Ausrufezeichen (REGELN.md 4)
for wort in ('vermeide', 'bloß nicht', 'gefährlich'):
    if wort in seele.lower():
        fehler.append(f'Angstwort in beziehung-seele-daten.js: {wort}')
if re.search(r"[A-Za-zäöüß]!\s", re.sub(r'/\*.*?\*/', '', seele, flags=re.S)):
    fehler.append('Ausrufezeichen in beziehung-seele-daten.js')

probe = r'''
const {chromium}=(function(){const orte=[process.env.AC_PLAYWRIGHT,'playwright','/opt/npm-tools/node_modules/playwright'];for(const o of orte){if(!o)continue;try{return require(o);}catch(e){}}throw new Error('Playwright nicht gefunden.');})();
(async()=>{
const f=[]; const b=await chromium.launch();
const VERBOTEN=['Konjunktion','Quadrat','Trigon','Sextil','Opposition','Orbis','Transit','Transite','Aszendent','Deszendent','Composite',
 'Haus','Häuser','Hauses','Mondknoten','Nordknoten','Südknoten','MC','IC','Planet','Planeten','Vertex','Chiron','Juno','Lilith',
 'Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische',
 'Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto','Synastrie'];
const wort=(t,x)=>new RegExp('(?<![A-Za-zÄÖÜäöüß])'+x+'(?![A-Za-zÄÖÜäöüß])').test(t);
const PROFILE={v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,bereiche:[],liste:[
 {id:'p1',name:'Lena Probe',alias:'',y:1985,mo:4,d:2,h:9,mi:40,tz:2,lat:52.52,lon:13.405,ort:'Berlin',eigen:true,readings:[]},
 {id:'p2',name:'Mira Test',alias:'',y:1990,mo:4,d:9,h:11,mi:5,tz:2,lat:48.14,lon:11.58,ort:'München',eigen:false,readings:[]},
 {id:'p3',name:'Jonas Ohnezeit',alias:'',y:1986,mo:2,d:8,h:null,mi:null,ohneZeit:true,tz:1,lat:53.55,lon:10,ort:'Hamburg',eigen:false,readings:[]}]};
const ctx=await b.newContext({viewport:{width:390,height:844}});
await ctx.addInitScript(s=>{ try{ if(!sessionStorage.getItem('gesetzt')){ localStorage.setItem('ac_profile_v1',JSON.stringify(s));
  localStorage.setItem('ac_niveau','2'); sessionStorage.setItem('gesetzt','1'); } }catch(e){} },PROFILE);
const p=await ctx.newPage(); p.on('pageerror',e=>f.push('Skriptfehler: '+String(e.message).slice(0,160)));
await p.goto('file://ZIEL'); await p.waitForTimeout(900);
const ueber=async(wo)=>{ const r=await p.evaluate(()=>{const w=document.documentElement.clientWidth; const r=[];
  document.querySelectorAll('#bzinhalt *, .bz-lesen *').forEach(e=>{ if(e.closest('.chips')) return; const bb=e.getBoundingClientRect();
    if(bb.width>0&&(bb.right>w+1.5||bb.left<-1.5)) r.push(e.tagName+'.'+(e.getAttribute('class')||'')+' '+Math.round(bb.right)); });
  return {r:r.slice(0,4),sw:document.documentElement.scrollWidth,w}; });
  if(r.r.length||r.sw>r.w+1) f.push(wo+': läuft auf 390px über: '+r.r.join(' | ')); };
const lage=async()=>p.evaluate(()=>({
  seele:!!document.querySelector('.bz-seele'), name:(document.querySelector('.bs-name')||{}).textContent||'',
  balken:document.querySelectorAll('.bs-zeile').length, marker:document.querySelectorAll('.bs-mk').length,
  rad:document.querySelectorAll('.bs-rad .r-g').length, linien:document.querySelectorAll('.bs-rad .r-l').length,
  haus:document.querySelectorAll('.bs-hsp li').length, comp:document.querySelectorAll('.bs-comp').length,
  china:document.querySelectorAll('.bs-ckarte').length, crad:document.querySelectorAll('.bs-crad .c-pkt').length,
  taugt:document.querySelectorAll('.bs-taugt li').length,
  schlecht:(document.getElementById('bzinhalt').innerText.match(/undefined|NaN|\[object|\{[a-zA-Z]+\}/)||[''])[0],
  emoji:[...document.querySelectorAll('.bs-rad text')].some(t=>/[☀-⛿](?!︎)/.test(t.textContent))}));

/* A · Stufe 2, zwei Profile mit Zeit */
let L=await lage();
if(!L.seele) f.push('die Seelenebene fehlt');
if(!L.name) f.push('keine Seelenebene benannt');
if(L.balken!==5) f.push(L.balken+' statt 5 Balken');
if(L.marker<3) f.push('nur '+L.marker+' Seelen-Marker');
if(L.rad<20) f.push('im Doppelrad stehen nur '+L.rad+' Zeichen');
if(L.haus!==16) f.push(L.haus+' statt 16 Zeilen bei den Bereichen');
if(L.comp!==2) f.push('das gemeinsame Bild ist unvollständig');
if(L.china!==2||L.crad!==12) f.push('die chinesische Ebene ist unvollständig');
if(L.taugt<5) f.push('„Was das taugt" ist unvollständig');
if(L.schlecht) f.push('auf der Seite steht „'+L.schlecht+'"');
if(L.emoji) f.push('ein Zeichen im Doppelrad wird als Emoji gezeigt');
/* Die Seite zeigt, was der Rechner sagt */
const stimmt=await p.evaluate(()=>{ const l=AC_P.alle(); const S=bzrSeele(l[0],l[1]);
  return {soll:BZS_EBENE[S.rang[0]].name, ist:document.querySelector('.bs-name').textContent,
          mk:S.marker.length, tier:AC_BAZI.TIER[bzrChina(l[0],l[1]).a.tier], text:document.getElementById('bzinhalt').innerText}; });
if(stimmt.soll!==stimmt.ist) f.push('die Seite nennt '+stimmt.ist+', der Rechner '+stimmt.soll);
if(L.marker!==stimmt.mk) f.push(L.marker+' Markerkarten, der Rechner kennt '+stimmt.mk);
if(stimmt.text.indexOf(stimmt.tier)<0) f.push('das Jahrestier steht nicht auf der Seite');
await ueber('Stufe 2');
/* Sprungmarken aus „Was dafür spricht" führen zu ihrer Karte */
const sprung=await p.evaluate(()=>[...document.querySelectorAll('.bs-chip')].every(a=>document.querySelector(a.getAttribute('href'))));
if(!sprung) f.push('ein Link unter „Was dafür spricht" führt ins Leere');

/* B · Stufe 0: keine Fachsprache */
await p.evaluate(()=>AC_NIV.setzen(0)); await p.waitForTimeout(350);
const t0=await p.evaluate(()=>document.querySelector('.wrap').innerText);
const m0=VERBOTEN.filter(x=>wort(t0,x));
if(m0.length) f.push('Stufe 0, Fachsprache sichtbar: '+m0.join(', '));
if(/\d°/.test(t0)) f.push('Stufe 0: Gradzahlen sichtbar');
L=await lage(); if(!L.seele||L.marker<3||L.china!==2) f.push('auf Stufe 0 fehlen Abschnitte');
await ueber('Stufe 0');

/* C · Stufe 3: Orben stehen da */
await p.evaluate(()=>AC_NIV.setzen(3)); await p.waitForTimeout(350);
const t3=await p.evaluate(()=>document.getElementById('bzinhalt').innerText);
if(!/\d,\d°/.test(t3)) f.push('Stufe 3: keine Orben mit Komma');
if(!/Composite/.test(t3)) f.push('Stufe 3: das Composite wird nicht benannt');

/* D · Thema Seelenebene, Rolle Tier, Profil ohne Zeit */
await p.evaluate(()=>AC_NIV.setzen(2)); await p.waitForTimeout(200);
await p.click('[data-t="seele"]'); await p.waitForTimeout(250);
const ts=await p.evaluate(()=>({seele:!!document.querySelector('.bz-seele'), streit:document.getElementById('bzinhalt').innerText.indexOf(BZ_T.streitTitel)>=0}));
if(!ts.seele||ts.streit) f.push('das Thema Seelenebene zeigt nicht die richtigen Abschnitte');
await p.click('[data-r="tier"]'); await p.waitForTimeout(250);
if(await p.evaluate(()=>!!document.querySelector('.bz-seele, .bs-mk, .bs-ckarte'))) f.push('beim Tier stehen Seelenebene oder chinesische Ebene');
await p.click('[data-r="liebe"]'); await p.click('[data-t="komplett"]'); await p.waitForTimeout(250);
await p.evaluate(()=>{ [...document.querySelectorAll('#bzB button')].filter(x=>/Jonas/.test(x.textContent))[0].click(); });
await p.waitForTimeout(350);
const oz=await p.evaluate(()=>({t:document.getElementById('bzinhalt').innerText, haus:document.querySelectorAll('.bs-hsp').length,
  vx:[...document.querySelectorAll('.bs-hits li')].some(li=>/Vertex|Schicksalspunkt/.test(li.textContent)&&/Jonas/.test(li.textContent.split(/und|Konjunktion|Opposition/)[0]))}));
if(!/Ohne Geburtszeit bei/.test(oz.t)) f.push('ohne Geburtszeit fehlt der Hinweis');
if(oz.haus) f.push('ohne Geburtszeit stehen trotzdem Bereiche da');
if(/undefined|NaN/.test(oz.t)) f.push('ohne Geburtszeit steht undefined oder NaN da');
await ueber('ohne Geburtszeit');

/* E · Die alten Adressen landen an der richtigen Stelle */
for(const [alt,anker] of [['synastrie.html','lesen'],['synastrie-vertiefung.html','vertiefung']]){
  const q=await ctx.newPage(); await q.goto('file://WIKI/'+alt); await q.waitForTimeout(700);
  if(!q.url().endsWith('beziehung.html#'+anker)) f.push(alt+' leitet nicht auf #'+anker+' weiter');
  await q.close(); }
console.log(JSON.stringify({fehler:f})); await b.close();})();
'''
pp = hier / '.probe-bez.js'
pp.write_text(probe.replace('ZIEL', str(ziel)).replace('WIKI', str(wiki.resolve())), encoding='utf-8')
try:
    r = subprocess.run(['node', str(pp)], capture_output=True, text=True, timeout=240)
    if r.returncode != 0:
        fehler.append('Rauchprobe gescheitert: ' + (r.stderr or '')[-400:])
    else:
        fehler.extend(json.loads(r.stdout.strip().splitlines()[-1])['fehler'])
except Exception as e:
    fehler.append('Rauchprobe nicht gelaufen: ' + str(e)[:200])
finally:
    pp.unlink(missing_ok=True)

print(f'beziehung.html  {ziel.stat().st_size:,} Bytes')
for x in fehler:
    print('  FEHLER: ' + x)
sys.exit(1 if fehler else 0)
