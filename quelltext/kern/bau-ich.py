#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Setzt uebersicht.html neu zusammen."""
import pathlib, re, sys, subprocess, json

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit  = hier.parent / 'rituale'


def lies(p):
    return p.read_text(encoding='utf-8')


fehler, hinweise = [], []

kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Dein Bild &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<script src="kleine-punkte.js"></script>
<script src="aspekte-daten.js"></script>
<style>
"""

# ── Die Häufigkeiten abtasten ─────────────────────────────────
# „Gerechnet, nicht behauptet" (PRODUKT.md Abschnitt 3) gilt auch für
# den Satz „das haben etwa 9 von 100 Menschen". Deshalb wird die
# Tabelle hier aus erfundenen Geburtsbildern abgezählt und in die
# Seite gebacken, statt sie zu schätzen. Fester Startwert: zwei
# Bauläufe müssen dieselbe Tabelle ergeben, sonst ist es keine Zahl.
TASTE_N = 10000
MINDEST_SCHLUESSEL = {'sp2', 'sp3', 'sp4', 'kette_eigen', 'rueck0', 'rueck2'}

haeufig = None
try:
    tr = subprocess.run(['node', str(hier / '_taste-haeufig.js'),
                         str(hier.parent), str(TASTE_N)],
                        capture_output=True, text=True, timeout=300)
    if tr.returncode == 0:
        haeufig = json.loads(tr.stdout.strip().splitlines()[-1])
    else:
        fehler.append('Häufigkeitsabtastung lief nicht: '
                      + (tr.stderr or tr.stdout)[-300:])
except Exception as e:
    fehler.append('Häufigkeitsabtastung: ' + str(e)[:170])

if haeufig:
    if haeufig['n'] < TASTE_N * 0.95:
        fehler.append(f'nur {haeufig["n"]} von {TASTE_N} Bildern abgetastet')
    fehlend_s = MINDEST_SCHLUESSEL - set(haeufig['anteil'])
    if fehlend_s:
        fehler.append('die Abtastung kennt diese Befunde nicht: '
                      + ', '.join(sorted(fehlend_s))
                      + ' — dann steht neben ihnen keine Häufigkeit')
    for k, v in haeufig['anteil'].items():
        if not (0 < v <= 1):
            fehler.append(f'Häufigkeit {k} ist {v} — keine Zahl zwischen 0 und 1')
    summe = sum(v for k, v in haeufig['anteil'].items() if k.startswith('sp'))
    if abs(summe - 1) > 0.02:
        fehler.append(f'die Schwerpunkt-Häufigkeiten summieren sich auf {summe:.3f} '
                      'statt auf 1 — dann fehlt ein Fall')
tabelle = ('var I_HAEUFIG=' + json.dumps(haeufig or {'n': 0, 'anteil': {}},
                                        ensure_ascii=False) + ';\n')

html = (kopf + lies(rit / 'basis.css') + "\n" + lies(hier / 'kern-stil.css')
        + "\n" + lies(hier / 'ich-stil.css')
        + '</style><script src="niveau.js" defer></script>\n'
          '<script src="wortwahl.js" defer></script>\n</head><body>\n'
        + lies(hier / 'ich-koerper.html') + "\n<script>\n"
        + lies(rit / 'engine.js') + "\n"
        + lies(hier / 'kern-rad.js') + "\n"
        + lies(hier / 'ich-daten.js') + "\n"
        + tabelle
        + lies(hier / 'ich-rechner.js') + "\n"
        + lies(hier / 'ich-app.js')
        + "\n</script>\n</body></html>\n")

ziel = wiki / 'uebersicht.html'
# Die App-Ansicht: Manifest, Symbol, Zwischenspeicher. Die Zeilen dafür
# stehen in app/app-kopf.html — an einer Stelle für alle Seiten.
html = html.replace('<head>', '<head>' + (hier.parent / 'app' / 'app-kopf.html').read_text(encoding='utf-8'), 1)
ziel.write_text(html, encoding='utf-8')

koerper = lies(hier / 'ich-koerper.html')
app = lies(hier / 'ich-app.js')
daten = lies(hier / 'ich-daten.js')
rechner = lies(hier / 'ich-rechner.js')

# ── Die Texte des neuen Abschnitts ─────────────────────────────
# Fehlerklasse, gemessen am 23.10.: Die Seite sagte über jeden
# Menschen dasselbe. 86 von 100 Sätzen waren bei zwei völlig
# verschiedenen Geburtsbildern wortgleich, und was sich unterschied,
# waren Aufzählungen von Fachbegriffen. Geprüft wird deshalb unten
# in der Rauchprobe, wie viel von den Kernaussagen sich bei fünf
# erfundenen Bildern wirklich unterscheidet — hier nur, ob die
# Bausteine dafür vollständig sind.
def klammerblock(text, start):
    tiefe, i = 0, start
    while i < len(text):
        if text[i] == '{':
            tiefe += 1
        elif text[i] == '}':
            tiefe -= 1
            if tiefe == 0:
                return text[start:i + 1]
        i += 1
    return ''


def feld(block, name):
    m = re.search(r"\b" + name + r":\s*'((?:[^'\\]|\\.)*)'", block)
    return m.group(1) if m else None


lay_texte = []

AUF_PFLICHT = {
    'titel': 10, 'vor': 120, 'haeufigForm': 20, 'haeufigSelten': 30,
    'haeufigOhne': 60,
    'spViel': 150, 'spZwei': 150, 'spEins': 150, 'spTun': 50,
    'spTunEins': 50, 'spLeer': 120,
    'kette': 150, 'ketteEigen': 150, 'ketteTun': 50, 'ketteTunEigen': 30,
    'winkelHart': 120, 'winkelWeich': 120, 'winkelEng': 80,
    'winkelHartTun': 40, 'winkelWeichTun': 50,
    'rueckViel': 120, 'rueckWenig': 80, 'rueckKeine': 150,
    'rueckTunViel': 40, 'rueckTunKeine': 50,
    'grenzeTitel': 20, 'tunVor': 10,
}
m_auf = re.search(r"var I_AUF=\{", daten)
if not m_auf:
    fehler.append('I_AUF fehlt — der Abschnitt „Was an dir auffällt" hat keine Worte')
else:
    ablk = klammerblock(daten, m_auf.end() - 1)
    for name, mind in AUF_PFLICHT.items():
        v = feld(ablk, name)
        if not v:
            fehler.append(f'I_AUF.{name} fehlt')
            continue
        if len(v) < mind:
            fehler.append(f'I_AUF.{name} nur {len(v)} Zeichen — mindestens {mind}')
        lay_texte.append((f'I_AUF.{name}', v))
    # Die Lücken, ohne die ein Satz nichts über diesen Menschen sagt.
    for name, luecken in (('vor', ('{n}',)), ('haeufigForm', ('{p}',)),
                          ('spViel', ('{bereich}', '{zahl}')),
                          ('spZwei', ('{bereich}', '{zahl}')),
                          ('spLeer', ('{zahl}',)), ('kette', ('{nach}',)),
                          ('winkelHart', ('{a}', '{b}')),
                          ('winkelWeich', ('{a}', '{b}')),
                          ('rueckViel', ('{zahl}',)), ('rueckWenig', ('{zahl}',))):
        v = feld(ablk, name) or ''
        for l in luecken:
            if l not in v:
                fehler.append(f'I_AUF.{name} hat keine Lücke {l} — dann gilt der '
                              'Satz für jeden Menschen gleich, und genau das war '
                              'der Fehler')
    # Der ehrliche Teil gehört zu jeder rechnenden Ausgabe (REGELN.md 4).
    mg = re.search(r"grenzen:\s*\[(.*?)\n \]", daten, re.S)
    grenzen = re.findall(r"'((?:[^'\\]|\\.)*)'", mg.group(1)) if mg else []
    if len(grenzen) < 4:
        fehler.append(f'nur {len(grenzen)} Sätze im ehrlichen Teil — mindestens 4')
    for g in grenzen:
        if len(g) < 80:
            fehler.append(f'ein Satz im ehrlichen Teil ist zu dünn: "{g[:50]}"')
        lay_texte.append(('I_AUF.grenzen', g))
    if not any('Vorrang' in g for g in grenzen):
        fehler.append('der ehrliche Teil sagt nicht, dass das eigene Erleben '
                      'Vorrang hat')
    if not any('nicht überprüft' in g or 'nicht belegbar' in g or
               'Deutung' in g for g in grenzen):
        fehler.append('der ehrliche Teil sagt nicht, dass die Deutung nicht '
                      'überprüft ist')

# Die Rollen: aus ihnen entstehen die Sätze über zwei Anlagen, die
# sich begegnen. Ohne sie stünden dort Planetennamen.
m_rolle = re.search(r"var I_ROLLE=\{", daten)
if not m_rolle:
    fehler.append('I_ROLLE fehlt — dann stünden im Winkelsatz Planetennamen')
else:
    rblk = klammerblock(daten, m_rolle.end() - 1)
    for pk in ['Sonne', 'Mond', 'Merkur', 'Venus', 'Mars', 'Jupiter',
               'Saturn', 'Uranus', 'Neptun', 'Pluto']:
        v = feld(rblk, pk)
        if not v:
            fehler.append(f'I_ROLLE.{pk} fehlt')
            continue
        if len(v) < 15:
            fehler.append(f'I_ROLLE.{pk} nur {len(v)} Zeichen')
        lay_texte.append((f'I_ROLLE.{pk}', v))
    rollen = [feld(rblk, k) for k in ['Sonne', 'Mond', 'Merkur', 'Venus', 'Mars',
                                      'Jupiter', 'Saturn', 'Uranus', 'Neptun', 'Pluto']]
    if len({r for r in rollen if r}) != len([r for r in rollen if r]):
        fehler.append('zwei Anlagen haben dieselbe Rolle — dann sagt der '
                      'Winkelsatz zweimal dasselbe')

# ── Auf Stufe 0 kein Fachwort ──────────────────────────────────
# Dieselbe Liste wie in bau-bereiche.py. Sie gilt für alles, was ein
# Laie im neuen Abschnitt zu sehen bekommt.
VERBOTEN = (
    ['Sonne', 'Mond', 'Merkur', 'Venus', 'Mars', 'Jupiter', 'Saturn',
     'Uranus', 'Neptun', 'Pluto', 'Lilith', 'Chiron']
    + ['Haus', 'Häuser', 'Hauses']
    + ['Aspekt', 'Aspekte', 'Konjunktion', 'Opposition', 'Quadrat',
       'Trigon', 'Sextil', 'Orbis', 'Orben']
    + ['Transit', 'Transite', 'Aszendent', 'Deszendent', 'Herrscher',
       'Radix', 'Ekliptik', 'rückläufig', 'Rückläufig', 'winkelhaft']
    + ['Widder', 'Stier', 'Zwillinge', 'Krebs', 'Löwe', 'Jungfrau',
       'Waage', 'Skorpion', 'Schütze', 'Steinbock', 'Wassermann', 'Fische']
)
for wo, text in lay_texte:
    for v in VERBOTEN:
        if re.search(r'(?<![A-Za-zÄÖÜäöüß])' + re.escape(v) + r'(?![A-Za-zÄÖÜäöüß])', text):
            fehler.append(f'Fachwort "{v}" im Laientext {wo}: "{text[:60]}…"')
    if '°' in text:
        fehler.append(f'Gradzeichen im Laientext {wo}')
    if re.search(r'\d\.\d', text):
        fehler.append(f'Dezimalpunkt statt Komma in {wo}')

# ── Der Rechner formuliert nicht selbst ────────────────────────
# Dieselbe Fehlerklasse wie bei tief-bauer.js und monat-app.js: ein
# Satz im Rechenwerk wird dort nebenbei geändert und von keiner
# Prüfung gelesen.
ohne_komm = re.sub(r'/\*.*?\*/', ' ', rechner, flags=re.S)
ohne_komm = re.sub(r'^\s*//.*$', ' ', ohne_komm, flags=re.M)
for lit in re.findall(r"'((?:[^'\\\n]|\\.)*)'", ohne_komm):
    if len(re.findall(r'[A-Za-zÄÖÜäöüß]{3,}', lit)) >= 3:
        fehler.append(f'Satz in ich-rechner.js statt in ich-daten.js: "{lit[:60]}"')

# Keine echten Geburtsdaten, keine Großschreibungsfallen
for d_ in ('1987', '08:58'):
    if d_ in app + daten + rechner + koerper:
        fehler.append(f'echte Geburtsdaten im Quelltext: {d_}')
if 'toLowerCase' in app + daten + rechner:
    fehler.append('toLowerCase verändert deutsche Großschreibung — nicht benutzen')

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
const {chromium}=(function(){const orte=[process.env.AC_PLAYWRIGHT,'playwright','/opt/npm-tools/node_modules/playwright'];for(const o of orte){if(!o)continue;try{return require(o);}catch(e){}}throw new Error('Playwright nicht gefunden. AC_PLAYWRIGHT setzen oder playwright installieren.');})();
(async()=>{
const b=await chromium.launch(); const f=[]; const notiz={};
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
/* ── Sagt die Seite über jeden dasselbe? ─────────────────────
   Die Prüfung, die den Fund vom 23.10. dauerhaft abstellt.
   Fünf erfundene Geburtsbilder, und von den Kernaussagen im
   Abschnitt „Was an dir auffällt" darf nur ein kleiner Teil
   wortgleich sein. Wer wieder einen Satz schreibt, der für
   jeden gilt, kommt damit nicht durch den Bau. */
const LEUTE=[
 {id:'ia',y:1958,mo:3, d:14,h:5, mi:20,lat:52.52,lon:13.405},
 {id:'ib',y:1991,mo:11,d:2, h:21,mi:45,lat:48.14,lon:11.58},
 {id:'ic',y:1943,mo:7, d:29,h:12,mi:0, lat:53.55,lon:9.99},
 {id:'id',y:2003,mo:1, d:8, h:3, mi:33,lat:50.11,lon:8.68},
 {id:'ie',y:1976,mo:10,d:19,h:17,mi:5, lat:48.21,lon:16.37}];
const JARGON=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus',
 'Neptun','Pluto','Haus','Häuser','Aspekt','Konjunktion','Opposition','Quadrat',
 'Trigon','Sextil','Orbis','rückläufig','Rückläufig','Herrscher','Aszendent',
 'Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion',
 'Schütze','Steinbock','Wassermann','Fische'];
const auf={};
for(const L of LEUTE){
  const c=await b.newContext({viewport:{width:390,height:1000}});
  const q=await c.newPage();
  q.on('pageerror',e=>f.push('JS bei '+L.id+': '+String(e.message).slice(0,110)));
  await q.addInitScript(l=>localStorage.setItem('ac_profile_v1',JSON.stringify(
    {v:1,eigen:l.id,aktiv:l.id,zeigeNamen:true,liste:[{id:l.id,name:'Probe '+l.id,
     alias:l.id,y:l.y,mo:l.mo,d:l.d,h:l.h,mi:l.mi,tz:1,lat:l.lat,lon:l.lon,ort:'Ort',
     wlat:l.lat,wlon:l.lon,wort:'Ort',eigen:true,readings:[]}]})), L);
  await q.goto('file://ZIEL'); await q.waitForTimeout(1100);
  await q.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(0); });
  await q.waitForTimeout(350);
  auf[L.id]=await q.evaluate(J=>{
    const box=document.getElementById('ichauf')||{innerText:''};
    const t=box.innerText||'';
    return {
      saetze:[...document.querySelectorAll('#ichauf .au-satz')].map(e=>e.innerText.trim()),
      bloecke:document.querySelectorAll('#ichauf .au').length,
      haeufig:[...document.querySelectorAll('#ichauf .au-h')].map(e=>e.innerText.trim()),
      tech:document.querySelectorAll('#ichauf .ac-tech').length,
      techOffen:[...document.querySelectorAll('#ichauf .ac-tech')]
                  .filter(e=>e.offsetParent!==null).length,
      jargon:J.filter(w=>new RegExp('(?<![A-Za-zÄÖÜäöüß])'+w+'(?![A-Za-zÄÖÜäöüß])').test(t)),
      luecke:(t.match(/\{\w+\}/)||[''])[0],
      schlecht:(t.match(/undefined|NaN|\[object|null/)||[''])[0],
      grenzen:document.querySelectorAll('#ichaufgrenze p').length,
      ueberschrift:(document.getElementById('ichaufh')||{}).innerText||'',
      vorzeile:(document.getElementById('ichaufvor')||{}).innerText||'',
      breit:document.body.scrollWidth };
  }, JARGON);
  await c.close();
}
notiz.auf=auf;
/* Wie viel sagt die Seite bei verschiedenen Menschen wörtlich gleich? */
const ids=Object.keys(auf); let paare=0, summe=0, schlimm=0;
for(let i=0;i<ids.length;i++) for(let j=i+1;j<ids.length;j++){
  const A=auf[ids[i]].saetze, B=auf[ids[j]].saetze;
  if(!A.length) continue;
  const g=A.filter(x=>B.includes(x)).length/A.length;
  paare++; summe+=g; if(g>schlimm) schlimm=g;
}
notiz.gleichMittel=paare?Math.round(100*summe/paare):100;
notiz.gleichSchlimmster=Math.round(100*schlimm);

console.log(JSON.stringify({vor,nach,notiz,fehler:[...new Set(f)]}));
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
    # ── Was an dir auffällt ───────────────────────────────────
    # Der Fund vom 23.10.: Die Seite sagte über jeden Menschen
    # dasselbe — 86 von 100 Sätzen waren bei zwei verschiedenen
    # Geburtsbildern wortgleich. Diese Schwelle ist die Prüfung,
    # die das künftig unmöglich macht.
    GLEICH_HOECHSTENS = 25        # Prozent wortgleicher Kernaussagen
    au = pr['notiz'].get('auf') or {}
    if len(au) < 5:
        fehler.append(f'nur {len(au)} von 5 Probebildern gezeichnet')
    for wer, a in au.items():
        if a['bloecke'] < 4:
            fehler.append(f'{wer}: nur {a["bloecke"]} Befunde in „Was an dir '
                          'auffällt" — es sollen vier sein')
        if len(a['saetze']) != a['bloecke']:
            fehler.append(f'{wer}: {len(a["saetze"])} Kernaussagen bei '
                          f'{a["bloecke"]} Befunden — jeder braucht genau eine')
        for s in a['saetze']:
            if len(s) < 80:
                fehler.append(f'{wer}: Kernaussage zu dünn: "{s[:50]}"')
        if len(a['haeufig']) != a['bloecke']:
            fehler.append(f'{wer}: {len(a["haeufig"])} Häufigkeitszeilen bei '
                          f'{a["bloecke"]} Befunden — jeder Befund sagt, wie '
                          'häufig er ist')
        if a['tech'] != a['bloecke']:
            fehler.append(f'{wer}: {a["tech"]} Mechanikzeilen bei {a["bloecke"]} '
                          'Befunden')
        if a['techOffen']:
            fehler.append(f'{wer}: {a["techOffen"]} Mechanikzeilen schon auf '
                          'Stufe 0 sichtbar')
        if a['jargon']:
            fehler.append(f'{wer}: Fachsprache auf Stufe 0 sichtbar: '
                          + ', '.join(a['jargon']))
        if a['luecke']:
            fehler.append(f'{wer}: offene Lücke im Text: {a["luecke"]}')
        if a['schlecht']:
            fehler.append(f'{wer}: schlechter Text: {a["schlecht"]!r}')
        if a['grenzen'] < 4:
            fehler.append(f'{wer}: nur {a["grenzen"]} Sätze im ehrlichen Teil')
        if a.get('vorzeile') and not re.search(r'\d{1,3}\.\d{3}', a['vorzeile']):
            fehler.append(f'{wer}: die Zahl der abgetasteten Bilder steht ohne '
                          'deutsche Tausendertrennung da: ' + repr(a['vorzeile'][:70]))
        if len(a['ueberschrift']) < 10:
            fehler.append(f'{wer}: der Abschnitt hat keine Überschrift')
        if a['breit'] > 391:
            fehler.append(f'{wer}: seitlicher Überlauf auf {a["breit"]}px')
    mittel = pr['notiz'].get('gleichMittel', 100)
    schlimm = pr['notiz'].get('gleichSchlimmster', 100)
    if mittel > GLEICH_HOECHSTENS:
        fehler.append(f'die Seite sagt über verschiedene Menschen im Schnitt '
                      f'{mittel}% wortgleiche Kernaussagen (höchstens '
                      f'{GLEICH_HOECHSTENS}% sind erlaubt) — ein Satz, der für '
                      'jeden gilt, holt niemanden ab')
    if schlimm > 60:
        fehler.append(f'zwei Probebilder bekommen {schlimm}% wortgleiche '
                      'Kernaussagen — zu viel für zwei verschiedene Menschen')
    print(f'  Was an dir auffällt: vier Befunde je Bild, '
          f'{mittel}% wortgleiche Kernaussagen im Schnitt '
          f'(schlimmstes Paar {schlimm}%), Stufe 0 ohne Fachwort')

    print('  Rauchprobe: 12 Häuser, %d Transitpunkte, %d Aspekte, %d Indexeinträge, '
          'Radklick öffnet „%s"' % (v['transit'], v['aspekte'], v['index'], n['text']))

print(f'uebersicht.html  {ziel.stat().st_size:,} Bytes  →  {ziel}')
for h in hinweise:
    print('  Hinweis: ' + h)
for f in fehler:
    print('  FEHLER: ' + f)
sys.exit(1 if fehler else 0)
