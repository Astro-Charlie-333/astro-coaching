#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut wiki/ereignisse-lesen.html — „Ereignisse lesen: Das Bausteine-Prinzip".

Eine Lernseite im Bereich Astro-Coaching. Sie erklärt, wie aus mehreren
Bausteinen eine Aussage über einen Lebensbereich und ein Zeitfenster wird,
und wo im Chart die Menschen stehen, zu denen es eine Verbindung gibt.

Besonderheit gegenüber den rechnenden Seiten: Diese Seite HANDELT von der
Mechanik. Sie darf sie also benennen — aber erst ab Stufe 1. Auf Stufe 0
steht hier genauso wenig Fachsprache wie überall sonst; die Bausteine
tragen dort ihre Alltagsnamen. Genau das wird unten geprüft.
"""
import html as htmlmod
import json, pathlib, re, subprocess, sys

hier = pathlib.Path(__file__).parent.resolve()
wiki = hier.parent / 'wiki'
T = lambda n: (hier / n).read_text(encoding='utf-8')

KOPF = '''<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ereignisse lesen &middot; Astro-Charlie</title>
<meta name="description" content="Wie man aus einem Chart abliest, was in welchem Lebensbereich wann ansteht — und wo die Grenze liegt.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<script src="niveau.js"></script>
<script src="wortwahl.js"></script>
<style>
'''

koerper = T('ereignis-koerper.html')
app     = T('ereignis-app.js')
daten   = T('ereignis-daten.js')
rechner = T('ereignis-rechner.js')
stil    = T('ereignis-stil.css')

html = (KOPF + T('../niveau/basis.css') + '\n' + stil + '</style></head><body>\n'
        + koerper + '\n<script>\n' + daten + '\n' + rechner + '\n' + app
        + '\n</script>\n</body></html>\n')

ziel = wiki / 'ereignisse-lesen.html'
# Die App-Ansicht: Manifest, Symbol, Zwischenspeicher. Die Zeilen dafür
# stehen in app/app-kopf.html — an einer Stelle für alle Seiten.
html = html.replace('<head>', '<head>' + (hier.parent / 'app' / 'app-kopf.html').read_text(encoding='utf-8'), 1)
ziel.write_text(html, encoding='utf-8')

fehler = []
alles = koerper + app + daten + rechner

# 1 · Jede ID, die das Skript sucht, muss im Körper stehen
ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
gesucht |= set(re.findall(r"""getElementById\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
gesucht -= {'nivleiste'}                       # setzt niveau.js selbst ein
gesucht = {g for g in gesucht if not g.startswith('egqe')}   # je Frage erzeugt
if gesucht - ids:
    fehler.append('fehlende IDs im Körper: ' + ', '.join(sorted(gesucht - ids)))

# 2 · Die Tags gehen auf
for tag in ('div', 'section', 'nav', 'details', 'table', 'ul', 'ol'):
    auf = len(re.findall(r'<' + tag + r'\b', koerper))
    zu  = len(re.findall(r'</' + tag + r'>', koerper))
    if auf != zu:
        fehler.append(f'{tag}-Unwucht im Körper: {auf} auf, {zu} zu')

# 3 · Keine Namenskollision mit der Engine und den anderen Modulen
belegt = {'AC_NIV', 'AC_WORT', 'AC_P', 'AC_BER', 'AC_BDAT', 'AC_ZEIT', 'AC_WAHL', 'AC_SETUP'}
meine = set(re.findall(r'window\.(AC_[A-Z_]+)\s*=', daten + rechner + app))
if meine & belegt:
    fehler.append('Namenskollision: ' + ', '.join(sorted(meine & belegt)))
if meine != {'AC_EREIG', 'AC_EREIGR'}:
    fehler.append('unerwartete globale Namen: ' + ', '.join(sorted(meine)))

klar = htmlmod.unescape(re.sub(r'<[^>]+>', ' ', koerper))

# 4 · Jeder Text ist vollständig und lang genug
for marke in ('idee', 'bausteine', 'mischer', 'rezepte', 'menschen',
              'zweicharts', 'beispiel', 'grenzen', 'quiz', 'weiterlernen'):
    if f'id="{marke}"' not in koerper:
        fehler.append(f'Abschnitt fehlt: {marke}')
if len(re.findall(r'<h2', koerper)) < 9:
    fehler.append('zu wenige Abschnitte auf der Seite')
# Die Pflichtabschnitte aus REGELN.md §4
if 'Was das taugt' not in klar:
    fehler.append('Der Abschnitt „Was das taugt — und was nicht" fehlt')
for pflicht in ('kein Versprechen', 'nicht überprüft', 'Vorrang'):
    if pflicht not in klar:
        fehler.append(f'In „Was das taugt" fehlt: {pflicht}')

# 5 · Die Rechnung besteht ihre eigene Prüfdatei
pruef = subprocess.run(['node', str(hier / '_test-ereignis.js')],
                       capture_output=True, text=True, timeout=120)
if pruef.returncode != 0:
    fehler.append('_test-ereignis.js: ' + (pruef.stdout + pruef.stderr).strip()[:400])

# 6 · Kein echtes Geburtsdatum, kein toLowerCase, keine Zahl mit Punkt
if re.search(r'\b1987\b', alles):
    fehler.append('echtes Geburtsjahr im Quelltext')
if re.search(r'\b08:58\b', alles):
    fehler.append('echte Geburtszeit im Quelltext')
if '.toLowerCase(' in alles:
    fehler.append('toLowerCase auf deutschem Text')
if re.search(r'\d\.\d\s*°', daten + koerper):
    fehler.append('Gradangabe mit Punkt statt Komma')

# 7 · Keine Versprechen, kein Verkaufston
for wort in ('garantiert', 'auf jeden Fall', 'wird passieren', 'zu 100'):
    if wort.lower() in klar.lower():
        fehler.append(f'Versprechen im Text: „{wort}"')
if '!' in klar:
    fehler.append('Ausrufezeichen im sichtbaren Text')

# 8 · Rauchprobe im Browser
probe = hier / '_probe-ereignis.js'
probe.write_text(r"""
const {chromium}=(function(){const orte=[process.env.AC_PLAYWRIGHT,'playwright',
'/opt/npm-tools/node_modules/playwright'];for(const o of orte){if(!o)continue;
try{return require(o);}catch(e){}}
throw new Error('Playwright nicht gefunden. AC_PLAYWRIGHT setzen oder playwright installieren.');})();
(async()=>{
const b=await chromium.launch(); const f=[];
const p=await (await b.newContext({viewport:{width:390,height:900}})).newPage();
p.on('pageerror',e=>f.push(String(e.message).slice(0,140)));
await p.goto('file://ZIEL'); await p.waitForTimeout(900);

const da=await p.evaluate(()=>({
  karten:document.querySelectorAll('.eg-k').length,
  stapel:document.querySelectorAll('.eg-st').length,
  rezepte:document.querySelectorAll('.eg-r').length,
  menschen:document.querySelectorAll('.eg-mb').length,
  faelle:document.querySelectorAll('.eg-fall').length,
  fragen:document.querySelectorAll('.eg-q').length,
  tabzeilen:document.querySelectorAll('#egmtab tbody tr').length,
  satz:(document.getElementById('egsatz')||{}).textContent.trim().length,
  zerlegt:document.querySelectorAll('.eg-z').length,
  schlecht:/undefined|NaN|\[object|Invalid/.test(document.body.innerText),
  breit:document.body.scrollWidth,
  fenster:window.innerWidth}));

/* Der Mischer muss wirklich wirken, nicht nur dastehen. */
const vorher=await p.evaluate(()=>document.getElementById('egsatz').textContent);
await p.selectOption('#egpl','Saturn');
await p.selectOption('#eghs','9');
await p.waitForTimeout(250);
const nachher=await p.evaluate(()=>document.getElementById('egsatz').textContent);

/* Die Personenwahl muss den Inhalt wirklich wechseln. */
const p1=await p.evaluate(()=>document.getElementById('egperson').textContent);
await p.evaluate(()=>document.querySelector('.eg-mb[data-m="haustier"]').click());
await p.waitForTimeout(220);
const p2=await p.evaluate(()=>({t:document.getElementById('egperson').textContent,
  gedrueckt:document.querySelector('.eg-mb[data-m="haustier"]').getAttribute('aria-pressed')}));

/* Das Quiz muss antworten und erklären. */
await p.evaluate(()=>document.querySelector('.eg-q[data-qi="0"] .eg-q-opt[data-a="0"]').click());
await p.waitForTimeout(200);
const quiz=await p.evaluate(()=>({
  echo:(document.getElementById('egqe0')||{}).textContent.trim().length,
  richtig:document.querySelectorAll('.eg-q-opt.ist-richtig').length,
  gesperrt:[...document.querySelectorAll('.eg-q[data-qi="0"] .eg-q-opt')].every(x=>x.disabled),
  stand:(document.getElementById('egquizstand')||{}).textContent.trim().length}));

/* Stufe 0: kein Fachwort irgendwo auf der sichtbaren Seite. */
await p.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(0); });
await p.waitForTimeout(500);
const JARGON=['Konjunktion','Sextil','Quadrat','Trigon','Opposition','Orbis','Aszendent',
 'Radix','Whole','Deszendent','Synastrie','Composite','Progression','Herrscher',
 'Pluto','Neptun','Uranus','Saturn','Jupiter','Merkur','Venus','Mars',
 'Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion',
 'Schütze','Steinbock','Wassermann','Fische'];
const j0=await p.evaluate(J=>{
  const t=(function(){ const b=document.body, aus=[];
    const lauf=document.createTreeWalker(b,NodeFilter.SHOW_TEXT);
    let n; while(n=lauf.nextNode()){ const e=n.parentElement;
      if(!e) continue;
      if(e.offsetParent===null&&e.tagName!=='BODY') continue;
      const d=e.closest('details');
      if(d&&!d.open&&!e.closest('summary')) continue;
      aus.push(n.nodeValue); }
    return aus.join(' '); })();
  return J.filter(w=>new RegExp('(?<![A-Za-zÄÖÜäöüß])'+w+
    '(?![A-Za-zÄÖÜäöüß])').test(t));
}, JARGON);
const t0=await p.evaluate(()=>[...document.querySelectorAll('.ac-tech')]
  .filter(e=>e.offsetParent!==null).length);
const satz0=await p.evaluate(()=>document.getElementById('egsatz').textContent.trim());

/* Ab Stufe 3 muss die Mechanik sichtbar werden. */
await p.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(3); });
await p.waitForTimeout(500);
const t3=await p.evaluate(()=>[...document.querySelectorAll('.ac-tech')]
  .filter(e=>e.offsetParent!==null).length);
const satz3=await p.evaluate(()=>document.getElementById('egsatz').textContent.trim());

/* Nichts läuft über den Rand. */
const ueber=await p.evaluate(()=>[...document.querySelectorAll('.wrap *')]
  .filter(e=>e.getBoundingClientRect().right>window.innerWidth+1.5)
  .map(e=>e.className||e.tagName).slice(0,6));

console.log(JSON.stringify({da,vorher,nachher,p1:p1.length,p2,quiz,j0,t0,t3,
  satz0,satz3,ueber,fehler:[...new Set(f)]}));
await b.close();})();
""".replace('ZIEL', str(ziel)), encoding='utf-8')

try:
    r = subprocess.run(['node', str(probe)], capture_output=True, text=True, timeout=200)
    pr = json.loads(r.stdout.strip().splitlines()[-1]) if r.returncode == 0 else None
    if pr is None:
        letzte = (r.stderr.strip().splitlines() or ['ohne Meldung'])[-1]
        fehler.append('Rauchprobe: ' + letzte[:180])
    else:
        d = pr['da']
        if pr['fehler']:            fehler.append('Skriptfehler: ' + '; '.join(pr['fehler'])[:220])
        if d['karten'] != 5:        fehler.append(f"Bausteinkarten: {d['karten']} statt 5")
        if d['stapel'] != 3:        fehler.append(f"Stapelstufen: {d['stapel']} statt 3")
        if d['rezepte'] < 6:        fehler.append(f"Rezepte: nur {d['rezepte']}")
        if d['menschen'] < 10:      fehler.append(f"Menschen zur Auswahl: nur {d['menschen']}")
        if d['faelle'] != 2:        fehler.append(f"Beispielfälle: {d['faelle']} statt 2")
        if d['fragen'] != 5:        fehler.append(f"Quizfragen: {d['fragen']} statt 5")
        if d['tabzeilen'] < 10:     fehler.append(f"Tabellenzeilen: nur {d['tabzeilen']}")
        if d['satz'] < 40:          fehler.append('Der Mischer liefert keinen Satz')
        if d['zerlegt'] != 5:       fehler.append(f"Zerlegung zeigt {d['zerlegt']} statt 5 Bausteine")
        if d['schlecht']:           fehler.append('undefined/NaN auf der Seite sichtbar')
        if d['breit'] > d['fenster'] + 2:
            fehler.append(f"Seite läuft über den Rand: {d['breit']} > {d['fenster']}")
        if pr['ueber']:             fehler.append('ragt über den Rand: ' + ', '.join(pr['ueber'])[:150])

        if pr['vorher'] == pr['nachher']:
            fehler.append('Der Mischer ändert nichts, wenn man ihn bedient')
        if pr['p1'] < 150:          fehler.append('Die Personenkarte ist leer')
        if pr['p2']['t'] == '' or pr['p1'] == len(pr['p2']['t']):
            fehler.append('Die Personenwahl wechselt den Inhalt nicht')
        if pr['p2']['gedrueckt'] != 'true':
            fehler.append('Die Personenwahl markiert die Auswahl nicht')

        q = pr['quiz']
        if q['echo'] < 50:          fehler.append('Das Quiz erklärt die Antwort nicht')
        if not q['richtig']:        fehler.append('Das Quiz markiert die richtige Antwort nicht')
        if not q['gesperrt']:       fehler.append('Das Quiz lässt nach der Antwort weiterklicken')
        if q['stand'] < 5:          fehler.append('Das Quiz zeigt keinen Stand')

        if pr['j0']:
            fehler.append('Stufe 0 zeigt Fachsprache: ' + ', '.join(pr['j0'])[:200])
        if pr['t0']:
            fehler.append(f"Stufe 0 zeigt {pr['t0']} technische Blöcke")
        if not pr['t3']:
            fehler.append('Ab Stufe 3 bleibt die Mechanik versteckt')
        if pr['satz0'] == pr['satz3']:
            fehler.append('Der Satz ändert sich zwischen Stufe 0 und 3 nicht')
        if '°' in pr['satz0']:
            fehler.append('Stufe 0 zeigt eine Gradangabe')
        if '°' not in pr['satz3']:
            fehler.append('Stufe 3 zeigt keine Gradangabe')
except subprocess.TimeoutExpired:
    fehler.append('Rauchprobe: Zeitüberschreitung')
finally:
    probe.unlink(missing_ok=True)

print(f'ereignisse-lesen.html  {ziel.stat().st_size:,} Bytes')
for x in fehler:
    print('  FEHLER: ' + x)
sys.exit(1 if fehler else 0)
