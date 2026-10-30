#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Setzt begleitung.html zusammen — die Arbeitsseite für eine Begleitung.

Mandy am 29.10.: „Ich brauche eine komplette Coaching Seite. Wie ich das
aufziehe als Coachin. … Von Anfang bis Ende der Coaching Zeit."

Was es schon gab, war die Übersicht über einen Menschen (dossier.html).
Was fehlte, war der Verlauf. Diese Seite ist der Verlauf.

Die Prüfungen hier sind strenger als auf den anderen Seiten, und zwar aus
einem Grund: Hier arbeitet jemand mit einem anderen Menschen. Eine Seite,
die Deutungen statt Fragen ausgibt oder die Grenzen vergisst, richtet
Schaden an — nicht an der Seite, an einer Person.
"""
import pathlib, re, sys, subprocess, json

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit = hier.parent / 'rituale'
kern = hier.parent / 'kern'


def lies(p):
    return p.read_text(encoding='utf-8')


koerper = lies(hier / 'begleit-koerper.html')
daten = lies(hier / 'begleit-daten.js')
rechner = lies(hier / 'begleit-rechner.js')
app = lies(hier / 'begleit-app.js')

kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Die Begleitung &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<style>
"""

html = (kopf + lies(rit / 'basis.css') + "\n" + lies(hier / 'begleit-stil.css')
        + '</style><script src="niveau.js" defer></script>\n'
          '<script src="wortwahl.js" defer></script>\n</head><body>\n'
        + koerper + "\n<script>\n"
        + lies(rit / 'engine.js') + "\n"
        + lies(rit / 'himmel.js') + "\n"
        + lies(kern / 'bahn-rechner.js') + "\n"
        + daten + "\n" + rechner + "\n" + app
        + "\n</script>\n</body></html>\n")

ziel = wiki / 'begleitung.html'
html = html.replace('<head>', '<head>' + (hier.parent / 'app' / 'app-kopf.html').read_text(encoding='utf-8'), 1)
ziel.write_text(html, encoding='utf-8')

fehler, hinweise = [], []

# ── Die IDs, die das Skript sucht, gibt es auch ──────────────
ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
# Was das Skript selbst in die Sitzung schreibt, steht nicht im Körper.
erzeugt = set(re.findall(r'id="(bg[a-z]+)"', app))
fehlt = gesucht - ids - erzeugt
if fehlt:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(fehlt)))

auf, zu = len(re.findall(r'<div\b', koerper)), len(re.findall(r'</div>', koerper))
if auf != zu:
    fehler.append(f'{auf} <div> gegen {zu} </div>')

# ── Der Bogen ist vollständig ────────────────────────────────
# Eine Sitzung ohne Ziel, ohne Ablauf oder ohne Fragen ist keine
# Sitzung, sondern eine Überschrift.
m = re.search(r'var C_SITZUNGEN = \[(.*?)\}\];', daten, re.S)
if not m:
    fehler.append('C_SITZUNGEN fehlt — dann hat die Begleitung keinen Verlauf')
else:
    block = m.group(1)
    nummern = [int(x) for x in re.findall(r'\{n:(\d+),', block)]
    if nummern != list(range(1, len(nummern) + 1)):
        fehler.append(f'die Sitzungen sind nicht durchnummeriert: {nummern}')
    if len(nummern) < 4:
        fehler.append(f'nur {len(nummern)} Sitzungen — ein Bogen braucht mehr')
    for feld in ('ziel', 'oeffnung', 'aufgabe', 'notiz', 'chartSatz'):
        n = len(re.findall(r'\b' + feld + r':', block))
        if n != len(nummern):
            fehler.append(f'„{feld}" steht {n}× bei {len(nummern)} Sitzungen')
    for feld in ('ablauf', 'kern', 'haken'):
        n = len(re.findall(r'\b' + feld + r':\[', block))
        if n != len(nummern):
            fehler.append(f'„{feld}" steht {n}× bei {len(nummern)} Sitzungen')
    # Die erste Sitzung ohne Chart. Das ist der Grundsatz der Seite:
    # Wer mit einer Deutung anfängt, bekommt danach nur noch Bestätigung.
    erste = block.split('{n:2,')[0]
    if 'chartZu:true' not in erste:
        fehler.append('die erste Sitzung öffnet das Chart — dann hört niemand mehr zu, '
                      'was der Mensch selbst sagt')

# ── Das Chart liefert Fragen, keine Aussagen ─────────────────
# Die teuerste Fehlerklasse dieser Seite. Eine Zeile, die behauptet
# statt zu fragen, wird im Gespräch als Befund vorgelesen.
mf = re.search(r'var C_FRAGE = \{(.*?)\}\};', daten, re.S)
if not mf:
    fehler.append('C_FRAGE fehlt — dann hat die Seite keine Fragen aus dem Chart')
else:
    fragen = re.findall(r"'([^']{20,})'", mf.group(1))
    ohne = [f for f in fragen if '?' not in f and '{feld}' in f]
    if ohne:
        fehler.append('Chart-Zeilen ohne Fragezeichen (das sind Aussagen über einen '
                      'Menschen): ' + '; '.join(x[:50] for x in ohne[:3]))
    ohne_feld = [f for f in fragen if '?' in f and '{feld}' not in f]
    if ohne_feld:
        fehler.append('Chart-Frage ohne Lebensfeld — dann gilt sie für jeden gleich: '
                      + ohne_feld[0][:60])
    # Kein Fachwort in den Fragen: Sie werden einem Menschen vorgelesen,
    # der von Astrologie nichts weiß und auch nichts wissen muss.
    for w in ('Haus', 'Aszendent', 'Konjunktion', 'Quadrat', 'Trigon', 'Orbis',
              'Transit', 'Saturn', 'Pluto', 'Merkur', 'Neptun', 'Uranus', 'Jupiter'):
        schlecht = [f for f in fragen if re.search(r'\b' + w + r'\b', f)]
        if schlecht:
            fehler.append(f'Fachwort „{w}" in einer Frage, die vorgelesen wird: '
                          + schlecht[0][:60])

    # Jede Anlage braucht beide Fassungen: „thema" ist Mandys
    # Überschrift in dritter Person, „du" wird vorgelesen. Am 29.10.
    # stand in einer Du-Frage „womit er anfängt" — die falsche
    # Person, direkt ins Gesicht eines Menschen.
    for k in ('Sonne', 'Mond', 'Merkur', 'Venus', 'Mars', 'Jupiter', 'Saturn',
              'Uranus', 'Neptun', 'Pluto', 'Chiron', 'Lilith'):
        mk = re.search(re.escape(k) + r":\s*\{(.*?)\n [A-ZL]", mf.group(1) + '\n Z', re.S)
        blk = mk.group(1) if mk else ''
        if "du:'" not in blk:
            fehler.append(f'C_FRAGE.{k} hat keine Du-Fassung — dann steht in einer '
                          'vorgelesenen Frage die dritte Person')

mfeld = re.search(r'var C_FELD = \[(.*?)\];', daten, re.S)
if not mfeld:
    fehler.append('C_FELD fehlt')
else:
    felder = re.findall(r"'([^']+)'", mfeld.group(1))
    if len(felder) != 12:
        fehler.append(f'{len(felder)} Lebensfelder statt zwölf')
    if len(set(felder)) != len(felder):
        fehler.append('zwei Häuser haben dasselbe Lebensfeld')
    # Ein Relativsatz als Einsetzstück zerbricht jeden Satz, in den
    # er kommt: „in dem, wie du auf andere wirkst regelmäßig".
    for f_ in felder:
        if ',' in f_ or f_.startswith('dem ') or f_.startswith('dem,'):
            fehler.append(f'Lebensfeld ist ein Nebensatz und zerbricht den Satz: „{f_}"')
        if len(f_) > 36:
            fehler.append(f'Lebensfeld zu lang für die Einsetzung: „{f_}"')

# ── Die Methode nennt ihre Herkunft ──────────────────────────
# Eine Linse, die aus einer psychologischen Schule stammt, und eine,
# die aus einer Überlieferung ohne Wirksamkeitsnachweis kommt, dürfen
# nicht gleich aussehen. Steht die Herkunft nicht da, wird aus einem
# Blickwinkel ein Verfahren — und das ist der Punkt, an dem Coaching
# anfängt, Behandlung zu spielen.
if 'C_METHODE' not in daten:
    fehler.append('C_METHODE fehlt — dann hat die Begleitung keine Methode')
else:
    for pflicht, was in (
            ('Adler', 'die mittlere Linse nennt ihre Herkunft nicht'),
            ('keine Therapie', 'die Methode grenzt sich nicht gegen Therapie ab'),
            ('ohne Wirksamkeitsnachweis', 'die Methode sagt nicht, was daran nicht belegt ist')):
        if pflicht not in daten:
            fehler.append(was)
    for feld in ('frage:', 'wo:', 'falle:'):
        n = len(re.findall(r'\b' + re.escape(feld), daten))
        if n < 3:
            fehler.append(f'„{feld}" steht nur {n}× bei drei Linsen')

# ── Jedes Werkzeug sagt, wann es NICHT passt ─────────────────
# Das Nützlichste an einem Werkzeugkasten, und das, was in fast
# allen fehlt. Ohne diese Zeile wird jeder Handgriff überall
# angewandt, auch da, wo er schadet.
mw = re.search(r'var C_WERKZEUG = \[(.*?)\}\];', daten, re.S)
if not mw:
    fehler.append('C_WERKZEUG fehlt')
else:
    blk = mw.group(1)
    anzahl = len(re.findall(r"\{n:'", blk))
    if anzahl < 4:
        fehler.append(f'nur {anzahl} Werkzeuge')
    for feld in ('wann:', 'satz:', 'wozu:', 'nicht:', 'her:'):
        n = len(re.findall(r'\b' + re.escape(feld), blk))
        if n != anzahl:
            fehler.append(f'„{feld}" steht {n}× bei {anzahl} Werkzeugen — '
                          'jedes braucht alle fünf Angaben')

# ── Die Grenzen ──────────────────────────────────────────────
# Ohne sie ist die Seite nicht professionell, sondern gefährlich.
for stueck, warum in (
        ('C_GRENZEN', 'ohne Grenzen ist das keine professionelle Seite'),
        ('krise:', 'ohne den Krisenfall fehlt der wichtigste Teil'),
        ('Telefonseelsorge', 'der Krisenfall nennt keine Anlaufstelle')):
    if stueck not in daten:
        fehler.append(f'{stueck} fehlt — {warum}')

for pflicht, was in (
        ('Keine Diagnose', 'die Grenze gegen das Diagnostizieren'),
        ('Keine Vorhersage', 'die Grenze gegen Vorhersagen'),
        ('Kein Ersatz für Behandlung', 'die Grenze gegen den Behandlungsersatz')):
    if pflicht not in daten:
        fehler.append(f'{was} fehlt in den harten Grenzen')

# Die Nummern müssen stimmen — eine falsche Nummer im Krisenfall ist
# schlimmer als keine.
for nummer in ('0800 111 0 111', '116 117', '112'):
    if nummer not in daten:
        fehler.append(f'die Nummer {nummer} fehlt im Krisenfall')

# ── Nichts, was wie eine Vorhersage klingt ───────────────────
for satz in ('wird passieren', 'du wirst bekommen', 'es wird gut gehen',
             'sagt voraus', 'prophezeit'):
    if satz in daten.lower():
        fehler.append(f'Vorhersagesprache in den Texten: „{satz}"')

# ── Die Notizen bleiben lokal, und das steht auch da ─────────
if 'localStorage' not in app:
    fehler.append('die Notizen werden nicht gespeichert')
if 'Browser' not in daten:
    fehler.append('nirgends steht, dass die Notizen im Browser bleiben')
for verraeter in ('fetch(', 'XMLHttpRequest', 'navigator.sendBeacon'):
    if verraeter in app:
        fehler.append(f'die Seite schickt etwas nach außen: {verraeter}')

# ── Keine echten Geburtsdaten im Quelltext ───────────────────
for quelle, name in ((daten, 'begleit-daten.js'), (rechner, 'begleit-rechner.js'),
                     (app, 'begleit-app.js'), (koerper, 'begleit-koerper.html')):
    if re.search(r'\b1987\b', quelle) or '08:58' in quelle:
        fehler.append(f'echte Geburtsdaten in {name}')

# ── Rauchprobe ───────────────────────────────────────────────
pr = None
probe = hier / '_probe-begleitung.js'
probe.write_text("""
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const f=[];
const ctx=await b.newContext({viewport:{width:390,height:900}});
const p=await ctx.newPage();
p.on('pageerror',e=>f.push(String(e.message).slice(0,140)));
await p.addInitScript(()=>localStorage.setItem('ac_profile_v1',JSON.stringify(
 {v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:[
  {id:'p1',name:'Probe Eigen',alias:'Ich',y:1980,mo:7,d:15,h:14,mi:20,tz:1,
   lat:52.52,lon:13.405,ort:'Berlin',wlat:52.52,wlon:13.405,wort:'Berlin',
   eigen:true,readings:[]},
  {id:'p2',name:'Probe Klient',alias:'K.',y:1991,mo:11,d:3,h:6,mi:45,tz:1,
   lat:53.55,lon:9.99,ort:'Hamburg',wlat:53.55,wlon:9.99,wort:'Hamburg',
   eigen:false,readings:[]}]})));
await p.goto('file://ZIEL'); await p.waitForTimeout(1100);
const v=await p.evaluate(()=>({
  profile:document.querySelectorAll('#bgwahl .bw').length,
  rahmen:document.querySelectorAll('#bgrahmen .rh').length,
  sitzungen:document.querySelectorAll('#bgleiste .sz').length,
  sitzungTitel:(document.querySelector('.sz-h')||{}).textContent||'',
  chartZu:!!document.querySelector('.sz-chartlage.sz-zu'),
  kern:document.querySelectorAll('.sz-kern li').length,
  haken:document.querySelectorAll('.hk').length,
  notizfeld:!!document.getElementById('bgnotiz'),
  krise:!!document.querySelector('.kr-l li'),
  nummern:[...document.querySelectorAll('.kr-l span')].map(x=>x.textContent),
  grenzen:document.querySelectorAll('.bg-hart .gr').length,
  wenn:document.querySelectorAll('.we2').length,
  vorrat:document.querySelectorAll('.vf').length,
  breit:document.body.scrollWidth,
  schlecht:/undefined|NaN|\\[object|Invalid|\\{feld\\}/.test(document.body.innerText)}));
/* Das eigene Profil ist gewaehlt: Die Seite muss darauf hinweisen. */
const eigenHinweis=await p.evaluate(()=>!document.getElementById('bgeigen').hidden);
/* Auf das zweite Profil umschalten: Die Fragen muessen sich aendern. */
const vorher=await p.evaluate(()=>[...document.querySelectorAll('.cf li')].map(x=>x.textContent).join('|'));
await p.evaluate(()=>{ const b=[...document.querySelectorAll('#bgwahl .bw')];
  (b[1]||b[0]).click(); });
await p.waitForTimeout(500);
/* Sitzung 2 oeffnen: dort kommen die Chart-Fragen. */
await p.evaluate(()=>{ const b=document.querySelector('#bgleiste .sz[data-n="2"]');
  if(b) b.click(); });
await p.waitForTimeout(400);
const s2=await p.evaluate(()=>({
  titel:(document.querySelector('.sz-h')||{}).textContent||'',
  chartZu:!!document.querySelector('.sz-chartlage.sz-zu'),
  fragen:[...document.querySelectorAll('.cf li')].map(x=>x.textContent.trim()),
  eigenHinweis:!document.getElementById('bgeigen').hidden}));
/* Eine Notiz eintippen und nachsehen, ob sie einen Neustart ueberlebt. */
await p.evaluate(()=>{ const t=document.getElementById('bgnotiz');
  t.value='Probenotiz'; t.dispatchEvent(new Event('input')); });
await p.waitForTimeout(250);
await p.reload({waitUntil:'load'}); await p.waitForTimeout(900);
await p.evaluate(()=>{ const b=document.querySelector('#bgleiste .sz[data-n="2"]');
  if(b) b.click(); });
await p.waitForTimeout(350);
const nachher=await p.evaluate(()=>(document.getElementById('bgnotiz')||{}).value||'');
/* Auf Stufe 0 darf in den Fragen kein Fachwort stehen. */
await p.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(0); }); await p.waitForTimeout(350);
const JARG=['Konjunktion','Quadrat','Trigon','Sextil','Orbis','Aszendent','Haus'];
const j0=await p.evaluate(J=>{
  const t=[...document.querySelectorAll('.cf li, .vf li, .jz-q')]
    .map(x=>x.textContent).join(' ');
  return J.filter(w=>new RegExp('(?<![A-Za-zÄÖÜäöüß])'+w+'(?![A-Za-zÄÖÜäöüß])').test(t));
}, JARG);
/* Der Spickzettel: eine Bildschirmhoehe, sonst taugt er nichts. */
await p.evaluate(()=>{ const b=document.getElementById('bgspickan'); if(b) b.click(); });
await p.waitForTimeout(400);
const spick=await p.evaluate(()=>{
  const z=document.getElementById('bgspick');
  if(!z||z.hidden) return null;
  return {hoehe:Math.round(z.getBoundingClientRect().height),
    fragen:z.querySelectorAll('.sp-fragen li').length,
    minuten:z.querySelectorAll('.sp-min span').length,
    raus:!!z.querySelector('.sp-raus')};
});
/* Sitzung 1 haelt das Chart zu — der Spickzettel auch.
   Dafuer erst zurueck auf Sitzung 1: Die Probe steht oben noch
   auf Sitzung 2. */
await p.evaluate(()=>{ const b=document.querySelector('#bgleiste .sz[data-n="1"]');
  if(b) b.click(); });
await p.waitForTimeout(350);
await p.evaluate(()=>{ const b=document.getElementById('bgspickan'); if(b) b.click(); });
await p.waitForTimeout(350);
const spick1=await p.evaluate(()=>{
  const z=document.getElementById('bgspick');
  return z&&!z.hidden ? [...z.querySelectorAll('.sp-fragen li')].map(x=>x.textContent) : [];
});
const linsen=await p.evaluate(()=>({
  anzahl:document.querySelectorAll('.ln').length,
  werkzeuge:document.querySelectorAll('.wz').length,
  nichtZeilen:document.querySelectorAll('.wz-nicht').length,
  herkunft:document.querySelectorAll('.wz-her').length,
  abgrenzung:((document.getElementById('bgabgrenzung')||{}).textContent||'').length}));
console.log(JSON.stringify({v,eigenHinweis,vorher,s2,nachher,j0,spick,spick1,linsen,fehler:[...new Set(f)]}));
await b.close();})();
""".replace('ZIEL', str(ziel)), encoding='utf-8')
try:
    r = subprocess.run(['node', str(probe)], capture_output=True, text=True, timeout=180)
    pr = json.loads(r.stdout.strip().splitlines()[-1]) if r.returncode == 0 else None
    if pr is None:
        fehler.append('Rauchprobe fehlgeschlagen: ' + (r.stderr or '')[-300:])
except Exception as e:
    fehler.append(f'Rauchprobe nicht gelaufen: {e}')
finally:
    probe.unlink(missing_ok=True)

if pr:
    v = pr['v']
    for f_ in pr['fehler']:
        fehler.append('JS-Fehler: ' + f_)
    if v['profile'] < 2:
        fehler.append('die Profilauswahl zeigt nicht alle Profile')
    if v['rahmen'] < 5:
        fehler.append(f"nur {v['rahmen']} Punkte im Rahmen")
    if v['sitzungen'] < 4:
        fehler.append(f"nur {v['sitzungen']} Sitzungen in der Leiste")
    if not v['chartZu']:
        fehler.append('die erste Sitzung zeigt nicht, dass das Chart zubleibt')
    if v['kern'] < 4:
        fehler.append(f"nur {v['kern']} Kernfragen in Sitzung 1")
    if v['haken'] < 2:
        fehler.append('Sitzung 1 sagt nicht, was zu tun ist, wenn es hakt')
    if not v['notizfeld']:
        fehler.append('es gibt kein Notizfeld')
    if not v['krise']:
        fehler.append('der Krisenfall nennt keine Anlaufstelle')
    if not any('0800 111 0 111' in x for x in v['nummern']):
        fehler.append('die Nummer der Telefonseelsorge steht nicht auf der Seite')
    if v['grenzen'] < 4:
        fehler.append(f"nur {v['grenzen']} harte Grenzen")
    if v['wenn'] < 5:
        fehler.append('zu wenige Sätze unter „Wenn er etwas sagt"')
    if v['vorrat'] < 6:
        fehler.append(f"nur {v['vorrat']} Einträge im Fragenvorrat")
    if v['breit'] > 390:
        fehler.append(f"Überlauf auf {v['breit']}px")
    if v['schlecht']:
        fehler.append('undefined/NaN/{feld} im Text')
    if not pr['eigenHinweis']:
        fehler.append('die Seite warnt nicht, wenn das eigene Profil gewählt ist')
    # Sitzung 2 öffnet das Chart, und die Fragen stehen da.
    s2 = pr['s2']
    if s2['chartZu']:
        fehler.append('auch Sitzung 2 hält das Chart zu')
    if len(s2['fragen']) < 3:
        fehler.append(f"nur {len(s2['fragen'])} Chart-Fragen in Sitzung 2")
    for q in s2['fragen']:
        if '?' not in q:
            fehler.append(f'eine Chart-Zeile ist keine Frage: „{q[:50]}"')
        # Die Frage wird einem Menschen vorgelesen. Steht „er" oder
        # „ihm" darin, redet sie über ihn statt mit ihm.
        if re.search(r'\b(er|ihm|ihn|seine[rmns]?|sein)\b', q):
            fehler.append(f'dritte Person in einer vorgelesenen Frage: „{q[:60]}"')
    if s2['eigenHinweis']:
        fehler.append('der Hinweis aufs eigene Profil bleibt stehen, obwohl ein '
                      'anderes gewählt ist')
    if pr['vorher'] and s2['fragen'] and pr['vorher'] == '|'.join(s2['fragen']):
        fehler.append('die Fragen ändern sich nicht, wenn man die Person wechselt')
    if pr['nachher'] != 'Probenotiz':
        fehler.append(f"die Notiz überlebt den Neustart nicht: „{pr['nachher']}\"")
    if pr['j0']:
        fehler.append('Fachsprache in den Fragen auf Stufe 0: ' + ', '.join(pr['j0']))

    sp = pr['spick']
    if not sp:
        fehler.append('der Spickzettel lässt sich nicht öffnen')
    else:
        # Wer während eines Gesprächs scrollen muss, schaut weg —
        # und der Mensch gegenüber sieht das.
        if sp['hoehe'] > 900:
            fehler.append(f"der Spickzettel ist {sp['hoehe']}px hoch — mehr als eine "
                          'Bildschirmhöhe, dann muss man im Gespräch scrollen')
        if sp['fragen'] < 3:
            fehler.append(f"nur {sp['fragen']} Fragen auf dem Spickzettel")
        if not sp['minuten']:
            fehler.append('der Spickzettel zeigt die Minuten nicht')
        if not sp['raus']:
            fehler.append('der Spickzettel sagt nicht, wie man aussteigt')
    # Der Spickzettel liegt im Gespräch vor ihr. Unterläuft er die
    # Regel der Seite, ist er schlimmer als keiner.
    kern1 = []
    m1 = re.search(r"kern:\[(.*?)\],\n  haken", daten, re.S)
    if m1:
        kern1 = re.findall(r"'((?:[^'\\]|\\.)*)'", m1.group(1))
    for q in pr['spick1']:
        if kern1 and q not in [k.replace("\\'", "'") for k in kern1]:
            fehler.append('der Spickzettel für Sitzung 1 zeigt eine Frage, die nicht '
                          f'aus Sitzung 1 stammt — das Chart bleibt dort zu: „{q[:50]}"')
    ln = pr['linsen']
    if ln['anzahl'] != 3:
        fehler.append(f"{ln['anzahl']} Linsen statt drei")
    if ln['werkzeuge'] < 4:
        fehler.append(f"nur {ln['werkzeuge']} Werkzeuge auf der Seite")
    if ln['nichtZeilen'] != ln['werkzeuge']:
        fehler.append('nicht jedes Werkzeug sagt, wann es nicht passt')
    if ln['herkunft'] != ln['werkzeuge']:
        fehler.append('nicht jedes Werkzeug nennt seine Herkunft')
    if ln['abgrenzung'] < 80:
        fehler.append('die Abgrenzung gegen Therapie steht nicht auf der Seite')

grosse = len(html.encode('utf-8'))
print(f"begleitung.html  {grosse:,} Bytes  →  {ziel}".replace(',', '.'))
if pr:
    print(f"  Rauchprobe: {pr['v']['sitzungen']} Sitzungen, {pr['v']['rahmen']} Rahmenpunkte, "
          f"{len(pr['s2']['fragen'])} Chart-Fragen in Sitzung 2, "
          f"{pr['v']['vorrat']} im Vorrat, Notiz überlebt den Neustart")
for h in hinweise:
    print('  Hinweis: ' + h)
for f_ in fehler:
    print('  FEHLER: ' + f_)
if fehler:
    sys.exit(1)
