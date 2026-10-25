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
bezugjs   = lies(hier / 'dossier-bezug.js')
app       = lies(hier / 'dossier-app.js')
engine    = lies(rit / 'engine.js')

kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Das Dossier &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<script src="kleine-punkte.js"></script>
<script src="raum.js"></script>
<style>
"""

# engine.js muss mit hinein: raum.js ist eine IIFE, die jdFromUT, angles und
# geo aus dem globalen Raum holt. Ohne die Engine rechnet AC_RAUM.chart nicht.
html = (kopf + css_alt + "\n" + css_neu
        + '</style><script src="niveau.js" defer></script>\n'
          '<script src="wortwahl.js" defer></script>\n</head><body>\n'
        + koerper + "\n<script>\n"
        + engine + "\n" + daten + "\n" + bezugjs + "\n" + app
        + "\n</script>\n</body></html>\n")

ziel = wiki / 'dossier.html'
# Die App-Ansicht: Manifest, Symbol, Zwischenspeicher. Die Zeilen dafür
# stehen in app/app-kopf.html — an einer Stelle für alle Seiten.
html = html.replace('<head>', '<head>' + (hier.parent / 'app' / 'app-kopf.html').read_text(encoding='utf-8'), 1)
ziel.write_text(html, encoding='utf-8')

# ── Prüfungen ────────────────────────────────────────────────
fehler, hinweise = [], []

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

# Namenskollisionen mit dem, was die Seite noch lädt
ERLAUBT = {'nrm', 'chartVon', 'gewaehlt'}


def oben(t):
    return set(re.findall(r'^(?:var|function)\s+([A-Za-z_$][\w$]*)', t, re.M))


fremd = oben(lies(wiki / 'raum.js')) | oben(lies(wiki / 'kleine-punkte.js'))
koll = (oben(app) | oben(daten) | oben(bezugjs)) & fremd - ERLAUBT
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
for href in sorted(set(re.findall(r'href="([a-z0-9_-]+\.html)"', koerper + daten))):
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
    punkt:/\d\.\d°/.test(document.getElementById('dossier').innerText),
    breit:document.body.scrollWidth}));
}
console.log(JSON.stringify({bez,sicht,fehler:[...new Set(f)]}));
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
