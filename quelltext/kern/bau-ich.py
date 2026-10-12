#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Setzt uebersicht.html neu zusammen."""
import pathlib, re, sys, subprocess, json

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit  = hier.parent / 'rituale'


def lies(p):
    return p.read_text(encoding='utf-8')


kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Dein Bild &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<script src="kleine-punkte.js"></script>
<script src="aspekte-daten.js"></script>
<style>
"""

html = (kopf + lies(rit / 'basis.css') + "\n" + lies(hier / 'kern-stil.css')
        + "\n" + lies(hier / 'ich-stil.css')
        + '</style><script src="niveau.js" defer></script>\n'
          '<script src="wortwahl.js" defer></script>\n</head><body>\n'
        + lies(hier / 'ich-koerper.html') + "\n<script>\n"
        + lies(rit / 'engine.js') + "\n"
        + lies(hier / 'kern-rad.js') + "\n"
        + lies(hier / 'ich-daten.js') + "\n"
        + lies(hier / 'ich-app.js')
        + "\n</script>\n</body></html>\n")

ziel = wiki / 'uebersicht.html'
ziel.write_text(html, encoding='utf-8')

fehler, hinweise = [], []
koerper = lies(hier / 'ich-koerper.html')
app = lies(hier / 'ich-app.js')
daten = lies(hier / 'ich-daten.js')

ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
# h1..h12 und d1..d12 entstehen zur Laufzeit
gesucht = {g for g in gesucht if not re.fullmatch(r'[hd]\d+', g)}
if gesucht - ids:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(gesucht - ids)))

auf, zu = len(re.findall(r'<div\b', koerper)), len(re.findall(r'</div>', koerper))
if auf != zu:
    fehler.append(f'div-Bilanz: {auf} auf, {zu} zu')

# Der Index darf nicht ins Leere zeigen …
vorhanden = {p.name for p in wiki.iterdir()}
verlinkt = set(re.findall(r"\{s:'([a-z0-9_.-]+\.html)'", daten))
for s in sorted(verlinkt):
    if s not in vorhanden:
        fehler.append('Index zeigt auf eine Seite, die es nicht gibt: ' + s)

# … und er soll nicht wieder veralten: jede Seite, die mit einem Profil rechnet,
# gehört hinein. Erkennungsmerkmal: sie lädt profil.js.
BEWUSST_DRAUSSEN = {
    'uebersicht.html',          # diese Seite selbst
    'menschen-lesen.html', 'niko-reading.html',
    'raeume.html',              # Sammelseite, verlinkt die Räume selbst
}
rechnet = set()
for p in sorted(wiki.glob('*.html')):
    s = lies(p)
    if 'profil.js' in s and 'AC_P' in s:
        rechnet.add(p.name)
fehlend = sorted(rechnet - verlinkt - BEWUSST_DRAUSSEN
                 - {n for n in rechnet if n.startswith('raum-')})
if fehlend:
    hinweise.append('rechnet mit Profil, steht aber nicht im Index: ' + ', '.join(fehlend))

# Rauchprobe — eine leere Seite wirft keinen Fehler
probe = hier / '_probe-ich.js'
probe.write_text(r"""
const {chromium}=require('/opt/npm-tools/node_modules/playwright');
(async()=>{
const b=await chromium.launch(); const f=[];
const p=await (await b.newContext({viewport:{width:390,height:900}})).newPage();
p.on('pageerror',e=>f.push(String(e.message).slice(0,130)));
await p.addInitScript(()=>localStorage.setItem('ac_profile_v1',JSON.stringify(
 {v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:[{id:'p1',name:'Probe Person',alias:'Probe',
  y:1980,mo:7,d:15,h:14,mi:20,tz:1,lat:52.52,lon:13.405,ort:'Berlin',
  wlat:52.52,wlon:13.405,wort:'Berlin',eigen:true,readings:[]}]})));
await p.goto('file://ZIEL'); await p.waitForTimeout(900);
const vor=await p.evaluate(()=>({
  haeuser:document.querySelectorAll('.hz').length,
  radfelder:document.querySelectorAll('.kr-haus').length,
  transit:document.querySelectorAll('.kr-tk').length,
  aspekte:document.querySelectorAll('.ia').length,
  index:document.querySelectorAll('.ix').length,
  name:(document.getElementById('ichname')||{}).textContent.trim(),
  schlecht:/undefined|NaN|\[object/.test(document.body.innerText),
  breit:document.body.scrollWidth}));
// Haus im Rad anklicken: öffnet sich die passende Zeile?
await p.evaluate(()=>document.querySelector('.kr-haus[data-h="7"]').dispatchEvent(
  new MouseEvent('click',{bubbles:true})));
await p.waitForTimeout(260);
const nach=await p.evaluate(()=>({
  offen:document.querySelectorAll('.hdetail:not([hidden])').length,
  welches:(document.querySelector('.hz.ist')||{}).dataset,
  radIst:(document.querySelector('.kr-haus.ist')||{}).getAttribute('data-h'),
  text:(document.querySelector('.hdetail:not([hidden]) h4')||{}).textContent}));
console.log(JSON.stringify({vor,nach,fehler:[...new Set(f)]}));
await b.close();})();
""".replace('ZIEL', str(ziel)), encoding='utf-8')
try:
    r = subprocess.run(['node', str(probe)], capture_output=True, text=True, timeout=180)
    pr = json.loads(r.stdout.strip().splitlines()[-1]) if r.returncode == 0 else None
    if pr is None:
        fehler.append('Rauchprobe: ' + (r.stderr.strip().splitlines() or ['?'])[-1][:170])
except Exception as e:
    fehler.append('Rauchprobe: ' + str(e)[:170]); pr = None
finally:
    probe.unlink(missing_ok=True)

if pr:
    v, n = pr['vor'], pr['nach']
    for f_ in pr['fehler']:
        fehler.append('JS-Fehler: ' + f_)
    if v['haeuser'] != 12:      fehler.append(f'nur {v["haeuser"]} Hauszeilen')
    if v['radfelder'] != 12:    fehler.append(f'nur {v["radfelder"]} Radfelder')
    if v['transit'] < 8:        fehler.append(f'nur {v["transit"]} Transitpunkte im Ring')
    if v['aspekte'] < 5:        fehler.append(f'nur {v["aspekte"]} Aspekte')
    if v['index'] < 30:         fehler.append(f'nur {v["index"]} Indexeinträge')
    if not v['name']:           fehler.append('kein Name im Kopf')
    if v['schlecht']:           fehler.append('undefined/NaN im Text')
    if v['breit'] > 390:        fehler.append(f'Überlauf auf {v["breit"]}px')
    if n['offen'] != 1:         fehler.append('Klick im Rad öffnet nicht genau ein Haus')
    if n['radIst'] != '7':      fehler.append('Rad merkt sich das gewählte Haus nicht')
    if '7. Haus' not in (n['text'] or ''):
        fehler.append('Klick aufs 7. Hausfeld öffnet das falsche Haus: ' + str(n['text']))
    print('  Rauchprobe: 12 Häuser, %d Transitpunkte, %d Aspekte, %d Indexeinträge, '
          'Radklick öffnet „%s"' % (v['transit'], v['aspekte'], v['index'], n['text']))

print(f'uebersicht.html  {ziel.stat().st_size:,} Bytes  →  {ziel}')
for h in hinweise:
    print('  Hinweis: ' + h)
for f in fehler:
    print('  FEHLER: ' + f)
sys.exit(1 if fehler else 0)
