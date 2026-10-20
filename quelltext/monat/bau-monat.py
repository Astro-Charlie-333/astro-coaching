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

html = (kopf + lies(rit / 'basis.css') + "\n" + lies(hier / 'monat-stil.css')
        + '</style><script src="niveau.js" defer></script>\n'
          '<script src="wortwahl.js" defer></script>\n</head><body>\n'
        + lies(hier / 'monat-koerper.html') + "\n<script>\n"
        + lies(rit / 'engine.js') + "\n"
        + lies(hier / 'monat-rechner.js') + "\n"
        + lies(hier / 'monat-daten.js') + "\n"
        + lies(hier / 'monat-app.js')
        + "\n</script>\n</body></html>\n")

ziel = wiki / 'monatsbericht.html'
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
koll = (oben(app) | oben(daten) | oben(rechner)) & oben(lies(rit / 'engine.js'))
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
    rest = re.sub(r'<[^>]*>', ' ', lit)
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

    for w, d in T['LAUF'].items():
        satz(f'LAUF.{w}.titel', d['titel'], 15)
        satz(f'LAUF.{w}.text', d['text'], 120)
    satz('RUHIG.titel', T['RUHIG']['titel'], 15)
    satz('RUHIG.text', T['RUHIG']['text'], 120)
    for a in ('neumond', 'vollmond'):
        satz(f'MOND.{a}', T['MOND'][a], 120)
    satz('EINL', T['EINL'], 120, gross=False)   # schließt an die Anrede an
    satz('SCHWERPUNKT_NACH', T['SCHWERPUNKT_NACH'], 80)
    satz('FRAGE_NACH', T['FRAGE_NACH'], 40)
    satz('ZWEITES', T['ZWEITES'], 20)
    satz('GRUSS.text', T['GRUSS']['text'], 60)
    satz('BEDIENUNG.leer', T['BEDIENUNG']['leer'], 60)
    satz('ANREDE', T['ANREDE'], 5)

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
console.log(JSON.stringify({v,knopf,zwei,spaeter,roh,j0,t0,t2,fehler:[...new Set(f)]}));
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
    # Der Bericht muss am Geburtsbild hängen, nicht nur am Namen.
    if not pr['knopf']:
        fehler.append('das zweite Probeprofil ist nicht wählbar')
    else:
        if pr['zwei']['anrede'] == v['anrede']:
            fehler.append('der Profilwechsel ändert die Anrede nicht')
        ohne_a = re.sub(r'\w+ Probe|Hallo \w+', '', v['text'])
        ohne_b = re.sub(r'\w+ Probe|Hallo \w+', '', pr['zwei']['text'])
        if ohne_a == ohne_b:
            fehler.append('zwei verschiedene Geburtsbilder ergeben denselben Bericht')
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
