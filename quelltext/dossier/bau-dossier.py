#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Setzt dossier.html zusammen und legt sie in der Plattform ab."""
import pathlib, re, sys

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit  = hier.parent / 'rituale'


def lies(p):
    return p.read_text(encoding='utf-8')


css_alt   = lies(hier / '_alt.css')          # übernommener Grundstil
css_neu   = lies(hier / 'dossier-stil.css')
koerper   = lies(hier / 'dossier-koerper.html')
daten     = lies(hier / 'dossier-daten.js')
# dossier-texte.js trägt seit Aufgabe 60 die Sätze der Seite — vor
# dossier-app.js, weil die Anzeige sie liest.
texte     = lies(hier / 'dossier-texte.js')
bezugjs   = lies(hier / 'dossier-bezug.js')
app       = lies(hier / 'dossier-app.js')
engine    = lies(rit / 'engine.js')

kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Das Dossier &middot; Praxis</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Jost:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<script src="kleine-punkte.js"></script>
<script src="raum.js"></script>
<style>
"""

# engine.js muss mit hinein: raum.js ist eine IIFE, die jdFromUT, angles und
# geo aus dem globalen Raum holt. Ohne die Engine rechnet AC_RAUM.chart nicht.
# Aufgabe 94: kern/fuellen.js liegt mit auf der Seite. Die Lücken
# einer Vorlage füllt AC_FUELL — die eine Stelle, an der ein
# fehlender Wert abbricht statt lautlos zu verschwinden.
fuellen   = lies(hier.parent / 'kern' / 'fuellen.js')

html = (kopf + css_alt + "\n" + css_neu
        + '</style><link rel="stylesheet" href="schwerkraft.css"><script src="niveau.js" defer></script>\n'
          '<script src="wortwahl.js" defer></script>\n</head><body>\n'
        + koerper + "\n<script>\n" + fuellen + "\n"
        + engine + "\n" + daten + "\n" + bezugjs + "\n" + texte + "\n" + app
        + "\n</script>\n</body></html>\n")

ziel = wiki / 'dossier.html'
# Die App-Ansicht: Manifest, Symbol, Zwischenspeicher. Die Zeilen dafür
# stehen in app/app-kopf.html — an einer Stelle für alle Seiten.
html = html.replace('<head>', '<head>' + (hier.parent / 'app' / 'app-kopf.html').read_text(encoding='utf-8'), 1)
ziel.write_text(html, encoding='utf-8')

# ── Prüfungen ────────────────────────────────────────────────
fehler, hinweise = [], []

sys.path.insert(0, str(rit))
import pruefwerk

ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
fehlt = gesucht - ids
if fehlt:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(fehlt)))
if ids - gesucht:
    hinweise.append('nur im HTML: ' + ', '.join(sorted(ids - gesucht)))

auf, zu = len(re.findall(r'<div\b', koerper)), len(re.findall(r'</div>', koerper))
if auf != zu:
    fehler.append(f'div-Bilanz im Körper: {auf} auf, {zu} zu')

alle = re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper)
dopp = {i for i in alle if alle.count(i) > 1}
if dopp:
    fehler.append('doppelte IDs: ' + ', '.join(sorted(dopp)))

# ── Die Anzeige schreibt keinen Satz und kein „dein" ─────────
#     Aufgabe 60, aus 34 und 38: Die Sätze dieser Seite stehen in
#     dossier-texte.js (DO_T), die Anzeige rechnet und setzt mit
#     `doFuell` ein. Was in dossier-app.js steht, zieht beim Umzug in
#     eine andere Umgebung nicht mit (PRODUKT.md Abschnitt 7) — und
#     genau deshalb ist das hier eine Sperre und kein Vorsatz.
if not re.search(r'\bvar DO_T\s*=', texte):
    fehler.append('Tafel DO_T fehlt in dossier-texte.js')
fehler += pruefwerk.pruefe_anzeige_satzfrei(app, 'dossier-app.js', 'dossier-texte.js')
fehler += pruefwerk.pruefe_anzeige_ohne_dein(app, 'dossier-app.js')
fehler += pruefwerk.pruefe_fueller(app, 'dossier-app.js')

#     Und die Gegenprobe gegen die Fehlerklasse, die ein grüner
#     Riegel nicht ausschließt: dass er heute nur nichts zu finden
#     hatte (REGELN.md 6e, Nachsatz). In allen drei Anführungsarten —
#     ein Satz, der in doppelten oder schrägen Anführungszeichen
#     durchgeht, wäre das Loch, über das die Sätze einzeln
#     zurückkommen.
for _art, _an in (('einfache', "'"), ('doppelte', '"'), ('schräge', '`')):
    _mit = app + '\nvar _gegenprobe=' + _an + 'Die typische Entgleisung' + _an + ';\n'
    if not pruefwerk.pruefe_anzeige_satzfrei(_mit, 'dossier-app.js', 'dossier-texte.js'):
        fehler.append(f'der Riegel sieht einen Satz in {_art} Anführung nicht — '
                      'dann hält er nur, was heute zufällig nicht dasteht')
    _mit = app + '\nvar _gegenprobe=' + _an + 'dein Saturn' + _an + ';\n'
    if not pruefwerk.pruefe_anzeige_ohne_dein(_mit, 'dossier-app.js'):
        fehler.append(f'der Riegel sieht ein „dein" in {_art} Anführung nicht — '
                      'dann kommt die ungebeugte Form einzeln zurück')

#     Jede Lücke einer Vorlage wird auch gefüllt — sonst steht
#     „{bezug}" auf der Seite.
fehler += pruefwerk.pruefe_vorlagenluecken(texte, app, 'dossier-texte.js')

# ── Keine Form wird an einen Namen oder eine Zahl geklebt ────
#     Dieselbe Klasse wie „dein" vor einem Punkt (REGELN.md 6f):
#     Eine Form, die sich mit dem eingesetzten Wort ändert, braucht
#     ihre eigene Vorlage. Diese Seite nennt das Haus an vierzehn
#     Stellen; keine davon darf in der Anzeige zusammengeklebt werden.
_GEKLEBT = re.compile(
    r"""(?:'|")\s*(?:dein|deine|deinem|deines|deiner|des|der|dem|den)\s*(?:'|")\s*\+"""
    r"""|\+\s*(?:'|")\s*\.\s*Haus""")
_rein = pruefwerk.nur_code(app)
_geklebt = [(_rein.count('\n', 0, m.start()) + 1, m.group(0))
            for m in _GEKLEBT.finditer(_rein)]
if _geklebt:
    fehler.append('eine Form wird an einen Namen geklebt (Zeile '
                  + ', '.join(str(z) for z, _ in _geklebt)
                  + ') — das Hauptwort gehört in DO_T, die Zahl kommt aus der Rechnung')
# Die Gegenprobe: die Regel schlägt auch an, wenn jemand es tut.
for _probe in ["var a='dein '+pl;", "var b=hh+'. Haus';", "var c='des '+pl;"]:
    if not _GEKLEBT.search(_probe):
        fehler.append('die Klebe-Regel sieht „' + _probe + '" nicht')
for _probe in ["var d=doHaus(12);", "var e=doFuell(DT.haus,{n:hh});",
               "var f=DT.pron[pl];"]:
    if _GEKLEBT.search(_probe):
        fehler.append('die Klebe-Regel schlägt bei „' + _probe + '" an, '
                      'obwohl die Form aus einer Vorlage kommt')

# Namenskollisionen mit dem, was die Seite noch lädt
ERLAUBT = {'nrm', 'chartVon', 'gewaehlt'}


def oben(t):
    return set(re.findall(r'^(?:var|function)\s+([A-Za-z_$][\w$]*)', t, re.M))


fremd = oben(lies(wiki / 'raum.js')) | oben(lies(wiki / 'kleine-punkte.js'))
koll = (oben(app) | oben(daten) | oben(bezugjs) | oben(texte)) & fremd - ERLAUBT
if koll:
    hinweise.append('gleiche Namen wie raum.js/kleine-punkte.js (beide in eigener IIFE, '
                    'daher unkritisch): ' + ', '.join(sorted(koll)))

# Jeder Bezug braucht in jeder Tafel einen Eintrag — sonst bleibt ein Abschnitt leer
BEZUEGE = re.findall(r'^ (\w+):\{n:', bezugjs, re.M)
KLASSEN = sorted(set(re.findall(r"klasse:'(\w+)'", bezugjs)))
if not BEZUEGE:
    fehler.append('keine Bezüge gefunden')
for tafel in ['STELLUNG', 'GEWICHT', 'MOND_BEZUG', 'MOND_TUN', 'SATURN_BEZUG',
              'CHIRON_BEZUG', 'KONFLIKT', 'EINSTIEG', 'GRENZE']:
    m = re.search(r'var ' + tafel + r'=\{(.*?)\n\};', bezugjs, re.S)
    if not m:
        fehler.append(f'Tafel {tafel} fehlt'); continue
    hat = set(re.findall(r"^ (\w+):", m.group(1), re.M))
    fehlende = [k for k in KLASSEN if k not in hat]
    if fehlende:
        fehler.append(f'{tafel}: keine Einträge für ' + ', '.join(fehlende))

# Jeder Bezug muss eine Klasse haben, die es gibt
for k in BEZUEGE:
    m = re.search(r'^ ' + k + r":\{n:'[^']*', klasse:'(\w+)'", bezugjs, re.M)
    if not m:
        fehler.append(f'Bezug {k} hat keine klasse')

# Reihenfolge muss alle Bezüge enthalten
folge = re.search(r"var BEZUG_FOLGE=\[(.*?)\];", bezugjs, re.S)
if folge:
    inFolge = set(re.findall(r"'(\w+)'", folge.group(1)))
    if set(BEZUEGE) - inFolge:
        fehler.append('nicht in BEZUG_FOLGE: ' + ', '.join(sorted(set(BEZUEGE) - inFolge)))
    if inFolge - set(BEZUEGE):
        fehler.append('in BEZUG_FOLGE, aber kein Bezug: ' + ', '.join(sorted(inFolge - set(BEZUEGE))))

# Tote Verweise
for href in sorted(set(re.findall(r'href="([a-z0-9_-]+\.html)"',
                                  koerper + daten + texte))):
    if not (wiki / href).exists():
        fehler.append('Verweis ins Leere: ' + href)

# Rauchprobe: die Seite tatsächlich rendern. Namensprüfungen merken nicht,
# wenn eine Abhängigkeit fehlt — ein leeres Dossier wirft keinen Fehler.
import subprocess, json, shutil
probe = hier / '_probe.js'
probe.write_text(r"""
const {chromium}=(function(){const orte=[process.env.AC_PLAYWRIGHT,'playwright','/opt/npm-tools/node_modules/playwright'];for(const o of orte){if(!o)continue;try{return require(o);}catch(e){}}throw new Error('Playwright nicht gefunden. AC_PLAYWRIGHT setzen oder playwright installieren.');})();
(async()=>{
const b=await chromium.launch();
const p=await (await b.newContext({viewport:{width:390,height:900}})).newPage();
const f=[];
p.on('pageerror',e=>f.push(String(e.message).slice(0,120)));
await p.addInitScript(()=>localStorage.setItem('ac_profile_v1',JSON.stringify(
 {v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:[{id:'p1',name:'Probe',alias:'Probe',
  y:1980,mo:7,d:15,h:14,mi:20,tz:1,lat:52.52,lon:13.405,ort:'Berlin',
  wlat:52.52,wlon:13.405,wort:'Berlin',eigen:true,readings:[]}]})));
await p.goto('file://ZIEL'); await p.waitForTimeout(700);
const bez=await p.evaluate(()=>[...document.querySelectorAll('.bzb')].map(x=>x.dataset.b));
/* Die Vorlagenmaschine gegen feste Beispiele (REGELN.md 6e). Eine
   Datenpruefung sieht nicht, was beim Zeichnen daraus wird, und ein
   gruener Riegel heisst sonst nur, dass sein Fall heute nicht vorkam. */
const regel=await p.evaluate(()=>{
 const r={};
 r.fuellt=doFuell('{a} im {b}. Haus',{a:'Saturn',b:7});
 r.haus=doHaus(12);
 r.winkel=doWinkel('sextil');
 r.pron=DT.pron.Venus;
 try{ doFuell('a {x} b',{x:undefined}); r.bricht=false; }catch(e){ r.bricht=true; }
 try{ doFuell('a {x} b',{x:''}); r.leerGeht=true; }catch(e){ r.leerGeht=false; }
 return r;});
const sicht={};
for(const k of bez){
  await p.evaluate(k=>document.querySelector('.bzb[data-b="'+k+'"]').click(),k);
  await p.waitForTimeout(110);
  sicht[k]=await p.evaluate(()=>({
    laenge:document.getElementById('dossier').innerText.length,
    abschnitte:document.querySelectorAll('.do-ab').length,
    haeuser:[...document.querySelectorAll('.dh .nr')].map(e=>e.innerText).join(','),
    themen:[...document.querySelectorAll('.do-bal')].map(e=>e.innerText.replace(/\s+/g,' ')).join('|'),
    schlecht:/undefined|NaN|\[object|\{p\}/.test(document.getElementById('dossier').innerText),
    /* Eine Luecke, die niemand fuellt, steht erst hier in geschweiften
       Klammern — und nur in dem Bezug, der sie zeichnet. */
    luecken:[...new Set(document.getElementById('dossier').innerHTML
      .match(/\{[a-zA-Z][a-zA-Z0-9]*\}/g)||[])].join(','),
    punkt:/\d\.\d°/.test(document.getElementById('dossier').innerText),
    breit:document.body.scrollWidth}));
}
console.log(JSON.stringify({bez,sicht,regel,fehler:[...new Set(f)]}));
await b.close();})();
""".replace('ZIEL', str(ziel)), encoding='utf-8')
try:
    roh = subprocess.run(['node', str(probe)], capture_output=True, text=True, timeout=180)
    if roh.returncode != 0:
        fehler.append('Rauchprobe lief nicht: ' + roh.stderr.strip().splitlines()[-1][:160])
        pr = None
    else:
        pr = json.loads(roh.stdout.strip().splitlines()[-1])
except Exception as e:
    fehler.append('Rauchprobe lief nicht: ' + str(e)[:160]); pr = None
finally:
    probe.unlink(missing_ok=True)

if pr:
    for f_ in pr['fehler']:
        fehler.append('JS-Fehler beim Rendern: ' + f_)
    for k, s in pr['sicht'].items():
        if s['abschnitte'] < 7:
            fehler.append(f'Bezug {k}: nur {s["abschnitte"]} Abschnitte gerendert')
        if s['laenge'] < 2500:
            fehler.append(f'Bezug {k}: Dossier zu kurz ({s["laenge"]} Zeichen)')
        if s['schlecht']:
            fehler.append(f'Bezug {k}: undefined/NaN/Platzhalter im Text')
        if s['punkt']:
            fehler.append(f'Bezug {k}: Dezimalpunkt statt Komma')
        if s['breit'] > 390:
            fehler.append(f'Bezug {k}: Überlauf auf {s["breit"]}px')
        if s['luecken']:
            fehler.append(f'Bezug {k}: ungefüllte Lücke auf der Seite: '
                          + s['luecken'])
    # Die Vorlagenmaschine, gegen feste Beispiele (REGELN.md 6e). Ohne
    # diese fünf Zeilen prüft die Rauchprobe nur, dass heute nichts
    # fehlte — nicht, dass ein fehlender Wert auffällt.
    r = pr['regel']
    for feld, soll in (('fuellt', 'Saturn im 7. Haus'), ('haus', '12. Haus'),
                       ('winkel', 'Sextil'), ('pron', 'sie')):
        if r.get(feld) != soll:
            fehler.append(f'doFuell/{feld} ergibt „{r.get(feld)}" statt „{soll}"')
    if not r.get('bricht'):
        fehler.append('eine Lücke ohne Wert bricht nicht ab — dann verschwindet '
                      'ein Wort lautlos aus dem Satz (so war „Saturn Sextil '
                      'Sonne" beim Umzug zu „Saturn  Sonne" geworden)')
    if not r.get('leerGeht'):
        fehler.append('ein absichtlich leerer Wert bricht ab — dann ist die '
                      'Regel zu scharf und trifft den leeren Ort')
    # Der Kern der Sache: der Bezug muss den Inhalt wirklich verändern
    if len({s['haeuser'] for s in pr['sicht'].values()}) < 5:
        fehler.append('die Häuser ändern sich kaum zwischen den Bezügen')
    if len({s['themen'] for s in pr['sicht'].values()}) < 4:
        fehler.append('die Themengewichtung ändert sich kaum zwischen den Bezügen')
    print('  Rauchprobe: %d Bezüge gerendert, %d verschiedene Häuser-Sets, '
          '%d verschiedene Themenreihenfolgen'
          % (len(pr['bez']),
             len({s['haeuser'] for s in pr['sicht'].values()}),
             len({s['themen'] for s in pr['sicht'].values()})))

print(f'dossier.html  {ziel.stat().st_size:,} Bytes  →  {ziel}')
print(f'  {len(BEZUEGE)} Bezüge in {len(KLASSEN)} Leseklassen: ' + ', '.join(KLASSEN))
for h in hinweise:
    print('  Hinweis: ' + h)
for f in fehler:
    print('  FEHLER: ' + f)
sys.exit(1 if fehler else 0)
