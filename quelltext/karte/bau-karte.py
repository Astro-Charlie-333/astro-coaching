#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut haeuser-karte.html.

Die Texte zu „Planet im Haus" werden nicht abgeschrieben, sondern beim Bauen
aus planeten-in-haeusern.html herausgelöst. So können die beiden Seiten nicht
auseinanderlaufen — und wenn sich dort die Struktur ändert, bricht der Bau.
"""
import pathlib, re, sys, json, subprocess

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit  = hier.parent / 'rituale'


def lies(p):
    return p.read_text(encoding='utf-8')


# ── Inhalte aus der Tiefenseite ziehen ───────────────────────
quelle = lies(wiki / 'planeten-in-haeusern.html')
m = re.search(r'(?:var|const)\s+D\s*=\s*(\{.*?\});\s*\n', quelle, re.S)
if not m:
    print('FEHLER: D nicht in planeten-in-haeusern.html gefunden'); sys.exit(1)
try:
    D = json.loads(m.group(1))
except Exception as e:
    print('FEHLER: D ließ sich nicht lesen — ' + str(e)[:120]); sys.exit(1)

fehler, hinweise = [], []
for schluessel in ('ph', 'planet'):
    if schluessel not in D:
        fehler.append(f'D.{schluessel} fehlt in der Tiefenseite')
if fehler:
    for f in fehler:
        print('  FEHLER: ' + f)
    sys.exit(1)

PN = ['Sonne', 'Mond', 'Merkur', 'Venus', 'Mars', 'Jupiter', 'Saturn',
      'Uranus', 'Neptun', 'Pluto']
for k in PN:
    if k not in D['ph']:
        fehler.append(f'kein Planet-im-Haus-Text für {k}')
    elif len(D['ph'][k]) != 12:
        fehler.append(f'{k}: {len(D["ph"][k])} statt 12 Haustexte')
    if k not in D['planet']:
        fehler.append(f'keine Planetenangabe für {k}')

uebernommen = ('/* Beim Bauen aus planeten-in-haeusern.html übernommen — nicht hier ändern. */\n'
               'var D_PH=' + json.dumps({k: D['ph'][k] for k in PN}, ensure_ascii=False) + ';\n'
               'var D_PLANET=' + json.dumps({k: D['planet'][k] for k in PN}, ensure_ascii=False) + ';\n')

kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>H&auml;user, Zeichen, Planeten &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<style>
"""

html = (kopf + lies(rit / 'basis.css') + "\n" + lies(hier / 'karte-stil.css')
        + '</style><script src="niveau.js" defer></script>\n'
          '<script src="wortwahl.js" defer></script>\n</head><body>\n'
        + lies(hier / 'karte-koerper.html') + "\n<script>\n"
        + lies(rit / 'engine.js') + "\n" + uebernommen + "\n"
        + lies(hier / 'karte-daten.js') + "\n"
        + lies(hier / 'karte-app.js')
        + "\n</script>\n</body></html>\n")

ziel = wiki / 'haeuser-karte.html'
ziel.write_text(html, encoding='utf-8')

koerper = lies(hier / 'karte-koerper.html')
app = lies(hier / 'karte-app.js')
daten = lies(hier / 'karte-daten.js')

ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
if gesucht - ids:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(gesucht - ids)))
if ids - gesucht:
    hinweise.append('nur im HTML: ' + ', '.join(sorted(ids - gesucht)))

auf, zu = len(re.findall(r'<div\b', koerper)), len(re.findall(r'</div>', koerper))
if auf != zu:
    fehler.append(f'div-Bilanz: {auf} auf, {zu} zu')

# Die eigenen Tafeln müssen zwölf Einträge haben
for tafel in ('K_HAUS', 'K_ZEICHEN', 'K_BEREICH', 'K_HERR'):
    mm = re.search(r'var ' + tafel + r'=\[(.*?)\n\];', daten, re.S)
    if not mm:
        fehler.append(f'Tafel {tafel} fehlt'); continue
    n = len(re.findall(r'^ \{|^ \'', mm.group(1), re.M)) or mm.group(1).count("',") + 1
    if tafel in ('K_HAUS', 'K_ZEICHEN') and n != 12:
        fehler.append(f'{tafel}: {n} statt 12 Einträge')

# {B} muss in jedem Zeichentext vorkommen, sonst fehlt der Bereich im Satz
for mm in re.finditer(r"\{n:'([^']+)', stil:'[^']*',\n  t:'([^']*)'", daten):
    if '{B}' not in mm.group(2):
        fehler.append(f'{mm.group(1)}: im Wirkungstext fehlt der Platzhalter {{B}}')

for href in sorted(set(re.findall(r'href="([a-z0-9_-]+\.html)', koerper + app))):
    if not (wiki / href).exists():
        fehler.append('Verweis ins Leere: ' + href)

# ── Rauchprobe ───────────────────────────────────────────────
probe = hier / '_probe-karte.js'
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
const v=await p.evaluate(()=>({
  radfelder:document.querySelectorAll('.kk-hs').length,
  zellen:document.querySelectorAll('.kk-mx td button').length,
  meine:document.querySelectorAll('.kk-mx td.ist').length,
  zeichenwahl:document.querySelectorAll('.vz').length,
  hauswahl:document.querySelectorAll('.vh').length,
  vglseiten:document.querySelectorAll('.vs').length,
  schlecht:/undefined|NaN|\[object|\{B\}/.test(document.body.innerText),
  breit:document.body.scrollWidth}));
// Haus im Rad anklicken
await p.evaluate(()=>document.querySelector('.kk-hs[data-h="12"]').dispatchEvent(
  new MouseEvent('click',{bubbles:true})));
await p.waitForTimeout(280);
const a=await p.evaluate(()=>({
  offen:!document.getElementById('kkdetail').hidden,
  kopf:(document.querySelector('.kd-t b')||{}).textContent,
  wirkung:(document.querySelector('.kd-wirkung')||{}).textContent,
  kette:!!document.querySelector('.kd-kette')}));
// Matrixzelle anklicken
await p.evaluate(()=>document.querySelector('.kk-mx td button[data-p="Saturn"][data-h="3"]').click());
await p.waitForTimeout(240);
const c=await p.evaluate(()=>({
  titel:(document.querySelector('.kz-t')||{}).textContent,
  text:(document.querySelector('.kz-text')||{}).textContent.length}));
// Vergleich: Zeichen wechseln, zweites Haus wählen
await p.evaluate(()=>document.querySelectorAll('.vz')[7].click());
await p.waitForTimeout(160);
await p.evaluate(()=>document.querySelector('.vh[data-h="6"]').click());
await p.waitForTimeout(160);
const d=await p.evaluate(()=>({
  seiten:[...document.querySelectorAll('.vs-w')].map(e=>e.textContent.slice(0,45)),
  folgen:[...document.querySelectorAll('.vs-u')].map(e=>e.textContent.slice(0,60)),
  marken:[...document.querySelectorAll('.vs-r')].map(e=>e.textContent),
  mitte:(document.querySelector('.vs-mitte')||{}).textContent}));
// Alle 144 Haus-Zeichen-Paare einmal durchrechnen
const alle=await p.evaluate(()=>{
  const z={}, leer=[];
  for(let zi=0; zi<12; zi++) for(let h=1; h<=12; h++){
    const r=resoVon(zi,h); z[r]=(z[r]||0)+1;
    if(!K_RESO[r]) leer.push(zi+'/'+h);
  }
  return {verteilung:z, leer:leer};
});
console.log(JSON.stringify({v,a,c,d,alle,fehler:[...new Set(f)]}));
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
    v, a, c, d = pr['v'], pr['a'], pr['c'], pr['d']
    for f_ in pr['fehler']:
        fehler.append('JS-Fehler: ' + f_)
    if v['radfelder'] != 12:   fehler.append(f'{v["radfelder"]} statt 12 Radfelder')
    if v['zellen'] != 120:     fehler.append(f'{v["zellen"]} statt 120 Matrixzellen')
    if v['meine'] != 10:       fehler.append(f'{v["meine"]} statt 10 eigene Stellungen markiert')
    if v['zeichenwahl'] != 12: fehler.append('Zeichenwahl unvollständig')
    if v['hauswahl'] != 12:    fehler.append('Hauswahl unvollständig')
    if v['vglseiten'] != 2:    fehler.append('der Vergleich zeigt nicht zwei Seiten')
    if v['schlecht']:          fehler.append('undefined/NaN/Platzhalter sichtbar')
    if v['breit'] > 390:       fehler.append(f'Überlauf auf {v["breit"]}px')
    if not a['offen']:         fehler.append('Klick im Rad öffnet kein Detail')
    if a['kopf'] != 'Rückzug': fehler.append('Radklick auf Haus 12 öffnet: ' + str(a['kopf']))
    if not a['kette']:         fehler.append('die Herrscherkette fehlt im Detail')
    if 'Saturn im 3. Haus' not in (c['titel'] or ''):
        fehler.append('Matrixklick öffnet die falsche Zelle: ' + str(c['titel']))
    if c['text'] < 60:         fehler.append('der Planet-im-Haus-Text kam nicht mit')
    if len(d['seiten']) != 2 or d['seiten'][0] == d['seiten'][1]:
        fehler.append('der Vergleich zeigt zweimal denselben Wirkungstext')
    if len(d['folgen']) != 2 or d['folgen'][0] == d['folgen'][1]:
        fehler.append('der Vergleich zeigt zweimal dieselbe Folge — dann '
                      'unterscheidet sich nur das Substantiv, und der Punkt geht verloren')
    al = pr.get('alle', {})
    if al.get('leer'):
        fehler.append('Resonanz ohne Text für: ' + ', '.join(al['leer'][:5]))
    if al.get('verteilung') and sum(al['verteilung'].values()) != 144:
        fehler.append('nicht alle 144 Haus-Zeichen-Paare berechnet')
    print('  Rauchprobe: %d Radfelder, %d Matrixzellen, %d eigene markiert, '
          'Radklick öffnet „%s", Matrixklick „%s"'
          % (v['radfelder'], v['zellen'], v['meine'], a['kopf'], c['titel']))

print(f'haeuser-karte.html  {ziel.stat().st_size:,} Bytes  →  {ziel}')
for h in hinweise:
    print('  Hinweis: ' + h)
for f in fehler:
    print('  FEHLER: ' + f)
sys.exit(1 if fehler else 0)
