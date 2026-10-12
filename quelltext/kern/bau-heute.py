#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Setzt index.html neu zusammen."""
import pathlib, re, sys, subprocess, json

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit  = hier.parent / 'rituale'


def lies(p):
    return p.read_text(encoding='utf-8')


kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Heute &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<style>
"""

html = (kopf + lies(rit / 'basis.css') + "\n" + lies(hier / 'kern-stil.css')
        + "\n" + lies(hier / 'heute-stil.css')
        + '</style><script src="niveau.js" defer></script>\n'
          '<script src="wortwahl.js" defer></script>\n</head><body>\n'
        + lies(hier / 'heute-koerper.html') + "\n<script>\n"
        + lies(rit / 'engine.js') + "\n"
        + lies(rit / 'himmel.js') + "\n"
        + lies(rit / 'ritual.js') + "\n"
        + lies(hier / 'kern-rad.js') + "\n"
        + lies(hier / 'heute-app.js')
        + "\n</script>\n</body></html>\n")

ziel = wiki / 'index.html'
ziel.write_text(html, encoding='utf-8')

fehler, hinweise = [], []
koerper = lies(hier / 'heute-koerper.html')
app = lies(hier / 'heute-app.js')

ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
if gesucht - ids:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(gesucht - ids)))

auf, zu = len(re.findall(r'<div\b', koerper)), len(re.findall(r'</div>', koerper))
if auf != zu:
    fehler.append(f'div-Bilanz: {auf} auf, {zu} zu')

for href in sorted(set(re.findall(r'href="([a-z0-9_-]+\.html)', koerper + app))):
    if not (wiki / href).exists():
        fehler.append('Verweis ins Leere: ' + href)

# Die Signaturen der geliehenen Module: lieber hier anschlagen als im Browser
sig = lies(rit / 'himmel.js') + lies(rit / 'ritual.js')
for name, muster in [('ohneLauf liefert .leer', r'leer:\s*!!'),
                     ('naechsterZeichenwechsel nimmt nur jd', r'function naechsterZeichenwechsel\(jd\)'),
                     ('stationen liefert .direkt', r'direkt:\s*\(fb>=0\)'),
                     ('lunationen nimmt von und bis', r'function lunationen\(von,bis\)')]:
    if not re.search(muster, sig):
        fehler.append('Modul hat sich geändert — ' + name + ' stimmt nicht mehr')

# Rauchprobe
probe = hier / '_probe-heute.js'
probe.write_text(r"""
const {chromium}=require('/opt/npm-tools/node_modules/playwright');
(async()=>{
const b=await chromium.launch(); const f=[];
const p=await (await b.newContext({viewport:{width:390,height:900}})).newPage();
p.on('pageerror',e=>f.push(String(e.message).slice(0,130)));
await p.addInitScript(()=>{localStorage.removeItem('ac_kap_heute');
 localStorage.setItem('ac_profile_v1',JSON.stringify(
 {v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:[{id:'p1',name:'Probe Person',alias:'Probe',
  y:1980,mo:7,d:15,h:14,mi:20,tz:1,lat:52.52,lon:13.405,ort:'Berlin',
  wlat:52.52,wlon:13.405,wort:'Berlin',eigen:true,readings:[]}]}));});
await p.goto('file://ZIEL'); await p.waitForTimeout(1500);
const v=await p.evaluate(()=>({
  gruss:(document.getElementById('htgruss')||{}).textContent.trim(),
  satz:(document.getElementById('htsatz')||{}).textContent.trim().length,
  fakten:document.querySelectorAll('.ht-f').length,
  woche:document.querySelectorAll('.we').length,
  laeuft:document.querySelectorAll('.lf').length,
  radfelder:document.querySelectorAll('.kr-haus').length,
  transit:document.querySelectorAll('.kr-tk').length,
  kap:document.querySelectorAll('.kb').length,
  schlecht:/undefined|NaN|\[object|Invalid/.test(document.body.innerText),
  breit:document.body.scrollWidth}));
// „Wenig" muss die hinteren Bänder ausblenden
await p.evaluate(()=>document.querySelector('.kb[data-k="wenig"]').click());
await p.waitForTimeout(220);
const k=await p.evaluate(()=>({
  wocheWeg:document.getElementById('htwocheteil').hidden,
  laeuftWeg:document.getElementById('htlaeuftteil').hidden,
  jetztDa:!document.getElementById('htjetzt').hidden}));
console.log(JSON.stringify({v,k,fehler:[...new Set(f)]}));
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
    v, k = pr['v'], pr['k']
    for f_ in pr['fehler']:
        fehler.append('JS-Fehler: ' + f_)
    if not v['gruss']:       fehler.append('kein Gruß im Kopf')
    if v['satz'] < 80:       fehler.append('der Jetzt-Satz ist leer oder zu kurz')
    if v['fakten'] < 3:      fehler.append(f'nur {v["fakten"]} Fakten im Kopf')
    if v['woche'] < 2:       fehler.append(f'nur {v["woche"]} Einträge in der Woche')
    if v['laeuft'] < 5:      fehler.append(f'nur {v["laeuft"]} langsame Planeten')
    if v['radfelder'] != 12: fehler.append('Rad unvollständig')
    if v['transit'] < 8:     fehler.append(f'nur {v["transit"]} Transitpunkte')
    if v['kap'] != 3:        fehler.append('Kapazitätsschalter fehlt')
    if v['schlecht']:        fehler.append('undefined/NaN/Invalid im Text')
    if v['breit'] > 390:     fehler.append(f'Überlauf auf {v["breit"]}px')
    if not k['wocheWeg'] or not k['laeuftWeg']:
        fehler.append('„Wenig" blendet die hinteren Bänder nicht aus')
    if not k['jetztDa']:
        fehler.append('„Wenig" blendet auch das Jetzt-Band aus')
    print('  Rauchprobe: %d Fakten, %d Wocheneinträge, %d langsame Planeten, '
          '%d Transitpunkte' % (v['fakten'], v['woche'], v['laeuft'], v['transit']))

print(f'index.html  {ziel.stat().st_size:,} Bytes  →  {ziel}')
for h in hinweise:
    print('  Hinweis: ' + h)
for f in fehler:
    print('  FEHLER: ' + f)
sys.exit(1 if fehler else 0)
