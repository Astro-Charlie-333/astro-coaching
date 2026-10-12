#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut analyse.html."""
import pathlib, re, sys, json, subprocess

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit  = hier.parent / 'rituale'


def lies(p):
    return p.read_text(encoding='utf-8')


kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Die Analyse &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<script src="kleine-punkte.js"></script>
<style>
"""

html = (kopf + lies(rit / 'basis.css') + "\n" + lies(hier / 'analyse-stil.css')
        + '</style><script src="niveau.js" defer></script>\n'
          '<script src="wortwahl.js" defer></script>\n</head><body>\n'
        + lies(hier / 'analyse-koerper.html') + "\n<script>\n"
        + lies(rit / 'engine.js') + "\n"
        + lies(hier / 'engine.js') + "\n"
        + lies(hier / 'thema-paar.js') + "\n"
        + lies(hier / 'thema-rest.js') + "\n"
        + lies(hier / 'analyse-app.js')
        + "\n</script>\n</body></html>\n")

ziel = wiki / 'analyse.html'
ziel.write_text(html, encoding='utf-8')

fehler, hinweise = [], []
koerper = lies(hier / 'analyse-koerper.html')
app = lies(hier / 'analyse-app.js')
paar = lies(hier / 'thema-paar.js')
rest = lies(hier / 'thema-rest.js')
kern = lies(hier / 'engine.js')

ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
if gesucht - ids:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(gesucht - ids)))

auf, zu = len(re.findall(r'<div\b', koerper)), len(re.findall(r'</div>', koerper))
if auf != zu:
    fehler.append(f'div-Bilanz: {auf} auf, {zu} zu')

# Namenskollisionen: alles liegt in einem Skriptblock
ERLAUBT = {'nrm', 'chartVon', 'H'}


def oben(t):
    return set(re.findall(r'^(?:var|function)\s+([A-Za-z_$][\w$]*)', t, re.M))


koll = (oben(app) | oben(paar) | oben(rest) | oben(kern)) & oben(lies(rit / 'engine.js')) - ERLAUBT
if koll:
    fehler.append('Namenskollision mit der Rechen-Engine: ' + ', '.join(sorted(koll)))

# Jede Regel braucht id, wenn, dann — und eine id darf nur einmal vorkommen
alle_ids = re.findall(r"\{id:'([\w-]+)'", paar + rest)
dopp = {i for i in alle_ids if alle_ids.count(i) > 1}
if dopp:
    fehler.append('doppelte Regel-ids: ' + ', '.join(sorted(dopp)))
for block, name in ((paar, 'thema-paar'), (rest, 'thema-rest')):
    for m in re.finditer(r"\{id:'([\w-]+)'([^\n]*)", block):
        if 'modus:' not in m.group(2):
            fehler.append(f'{name}: Regel {m.group(1)} ohne modus')
n_regeln = len(alle_ids)
if n_regeln < 25:
    fehler.append(f'nur {n_regeln} Regeln insgesamt')

# Kleinschreibung in Regeltexten erzeugt im Deutschen fast immer einen Fehler
# („immer wieder um zuhause geht") — jeder bisherige Fall war einer.
for block, name in ((paar, 'thema-paar'), (rest, 'thema-rest')):
    for m in re.finditer(r'\.toLowerCase\(\)', block):
        zeile = block[:m.start()].count('\n') + 1
        fehler.append(f'{name}.js Zeile {zeile}: toLowerCase im Regeltext — '
                      'deutsche Substantive bleiben groß')

for href in sorted(set(re.findall(r'href="([a-z0-9_-]+\.html)', koerper))):
    if not (wiki / href).exists():
        fehler.append('Verweis ins Leere: ' + href)

# ── Rauchprobe: viele Paare durchrechnen ────────────────────
probe = hier / '_probe-analyse.js'
probe.write_text(r"""
const {chromium}=require('/opt/npm-tools/node_modules/playwright');
/* Zwanzig erfundene Charts, über Jahrzehnte und Tageszeiten gestreut. */
const liste=[]; let i=0;
for(const y of [1955,1968,1979,1988,1997]) for(const mo of [2,6,9,12]){
  i++; liste.push({id:'p'+i,name:'T'+i,alias:'T'+i,y,mo,d:4+((i*7)%24),h:(i*5)%24,mi:(i*13)%60,
   tz:1,lat:52.52,lon:13.405,ort:'Berlin',wlat:52.52,wlon:13.405,wort:'Berlin',
   eigen:i===1,readings:[]});
}
(async()=>{
const b=await chromium.launch(); const f=[];
const p=await (await b.newContext({viewport:{width:390,height:900}})).newPage();
p.on('pageerror',e=>f.push(String(e.message).slice(0,140)));
await p.addInitScript(l=>localStorage.setItem('ac_profile_v1',JSON.stringify(
 {v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:l})), liste);
await p.goto('file://ZIEL'); await p.waitForTimeout(900);

const themen=await p.evaluate(()=>[...document.querySelectorAll('.th')].map(x=>x.dataset.t));
const start=await p.evaluate(()=>({
  erg:!!document.querySelector('.an-erg'),
  gruppen:document.querySelectorAll('.an-gruppe').length,
  befunde:document.querySelectorAll('.an-b').length,
  breit:document.body.scrollWidth}));

/* Alle Themen × mehrere Paarungen */
let min=99, max=0, leer=0, laeufe=0, regelFehler='';
const gesehen=new Set();
for(const t of themen){
  await p.evaluate(t=>document.querySelector('.th[data-t="'+t+'"]').click(), t);
  await p.waitForTimeout(160);
  for(let k=1;k<Math.min(liste.length,9);k++){
    const hatB=await p.evaluate(k=>{
      const bs=[...document.querySelectorAll('.pb[data-w="b"]')];
      if(!bs.length) return false; bs[k%bs.length].click(); return true; }, k);
    if(!hatB){
      await p.evaluate(k=>{const as=[...document.querySelectorAll('.pb[data-w="a"]')];
        as[k%as.length].click();}, k);
    }
    await p.waitForTimeout(150); laeufe++;
    const r=await p.evaluate(()=>({
      n:document.querySelectorAll('.an-b').length,
      erg:(document.querySelector('.an-erg .gr')||{}).textContent||'',
      fehler:(document.getElementById('anfehler')||{}).textContent||'',
      schlecht:/undefined|NaN|\[object|\{A\}|\{B\}/.test(document.body.innerText),
      breit:document.body.scrollWidth}));
    if(r.fehler) regelFehler=r.fehler;
    if(r.schlecht) f.push('undefined/NaN bei '+t+'/'+k);
    if(r.breit>390) f.push('Überlauf '+r.breit+' bei '+t+'/'+k);
    if(r.n===0) leer++;
    if(r.n<min) min=r.n; if(r.n>max) max=r.n;
    if(r.erg) gesehen.add(t+'::'+r.erg);
  }
}
/* Bericht ziehen */
const bericht=await p.evaluate(()=>typeof berichtText==='function'?berichtText():'');
console.log(JSON.stringify({themen,start,min,max,leer,laeufe,
  ergebnisse:[...gesehen].length, regelFehler, berichtLaenge:bericht.length,
  fehler:[...new Set(f)]}));
await b.close();})();
""".replace('ZIEL', str(ziel)), encoding='utf-8')
try:
    r = subprocess.run(['node', str(probe)], capture_output=True, text=True, timeout=420)
    pr = json.loads(r.stdout.strip().splitlines()[-1]) if r.returncode == 0 else None
    if pr is None:
        fehler.append('Rauchprobe: ' + (r.stderr.strip().splitlines() or ['?'])[-1][:200])
except Exception as e:
    fehler.append('Rauchprobe: ' + str(e)[:200]); pr = None
finally:
    probe.unlink(missing_ok=True)

if pr:
    for f_ in pr['fehler']:
        fehler.append(f_)
    if pr['regelFehler']:
        fehler.append('Regel wirft Fehler — ' + pr['regelFehler'][:180])
    if len(pr['themen']) != 4:
        fehler.append(f'{len(pr["themen"])} statt 4 Themen')
    if not pr['start']['erg']:
        fehler.append('beim Start kommt kein Ergebnis')
    if pr['start']['befunde'] < 6:
        fehler.append(f'beim Start nur {pr["start"]["befunde"]} Befunde')
    if pr['leer']:
        fehler.append(f'{pr["leer"]} von {pr["laeufe"]} Läufen ohne einen einzigen Befund')
    if pr['min'] < 3:
        fehler.append(f'ein Lauf brachte nur {pr["min"]} Befunde')
    if pr['ergebnisse'] < 5:
        fehler.append(f'nur {pr["ergebnisse"]} verschiedene Ergebnisse über alle Läufe — '
                      'die Rechnung unterscheidet zu wenig')
    if pr['berichtLaenge'] < 800:
        fehler.append(f'der Bericht ist nur {pr["berichtLaenge"]} Zeichen lang')
    print('  Rauchprobe: %d Läufe über %d Themen, %d–%d Befunde je Lauf, '
          '%d verschiedene Ergebnisse, Bericht %d Zeichen'
          % (pr['laeufe'], len(pr['themen']), pr['min'], pr['max'],
             pr['ergebnisse'], pr['berichtLaenge']))

print(f'analyse.html  {ziel.stat().st_size:,} Bytes  →  {ziel}')
print(f'  {n_regeln} Regeln')
for h in hinweise:
    print('  Hinweis: ' + h)
for f in fehler:
    print('  FEHLER: ' + f)
sys.exit(1 if fehler else 0)
