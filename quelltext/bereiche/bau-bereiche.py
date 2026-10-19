#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut bereiche.html — zehn Lebensbereiche, sortiert nach dem, was gerade läuft.

Die wichtigste Prüfung hier ist die letzte: Auf Wissensstufe 0 darf kein
einziges Fachwort sichtbar sein. Kein Planetenname, kein Haus, kein Aspekt.
Wer das verletzt, kommt nicht durch den Bau.
"""
import pathlib, re, sys, subprocess

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit  = hier.parent / 'rituale'
zeit = hier.parent / 'zeit'

lies = lambda p: p.read_text(encoding='utf-8')

kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Was bei dir gerade los ist &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<script src="kleine-punkte.js"></script>
<style>
"""

html = (kopf + lies(rit / 'basis.css') + "\n" + lies(hier / 'bereich-stil.css')
        + '</style><script src="niveau.js" defer></script>\n'
          '<script src="wortwahl.js" defer></script>\n</head><body>\n'
        + lies(hier / 'bereich-koerper.html') + "\n<script>\n"
        + lies(rit / 'engine.js') + "\n"
        + lies(zeit / 'zeit-rechner.js') + "\n"
        + lies(hier / 'bereich-rechner.js') + "\n"
        + lies(hier / 'bereich-daten.js') + "\n"
        + lies(hier / 'bereich-app.js')
        + "\n</script>\n</body></html>\n")

ziel = wiki / 'bereiche.html'
ziel.write_text(html, encoding='utf-8')

fehler, hinweise = [], []
koerper = lies(hier / 'bereich-koerper.html')
app     = lies(hier / 'bereich-app.js')
daten   = lies(hier / 'bereich-daten.js')
rechner = lies(hier / 'bereich-rechner.js')

BEREICHE = ['liebe', 'beruf', 'gesundheit', 'geld', 'familie',
            'freunde', 'freude', 'selbstwert', 'sinn', 'umbruch']
WANDERER = ['Pluto', 'Neptun', 'Uranus', 'Saturn', 'Jupiter',
            'Mars', 'Venus', 'Merkur', 'Sonne']
ARTEN    = ['zusammen', 'gegenueber', 'spannung', 'leicht']

# ── 1 · Verdrahtung ────────────────────────────────────────────
ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""getElementById\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
# Bereichs-IDs entstehen erst zur Laufzeit
gesucht = {g for g in gesucht if not g.startswith('ber-')}
if gesucht - ids:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(gesucht - ids)))
if 'nivleiste' not in ids:
    fehler.append('die Leiste für den Wissensstand fehlt')

auf, zu = len(re.findall(r'<div\b', koerper)), len(re.findall(r'</div>', koerper))
if auf != zu:
    fehler.append(f'div-Bilanz: {auf} auf, {zu} zu')
for tag in ('section', 'nav', 'details'):
    a, z = len(re.findall(r'<%s\b' % tag, koerper)), len(re.findall(r'</%s>' % tag, koerper))
    if a != z:
        fehler.append(f'{tag}-Bilanz: {a} auf, {z} zu')

# ── 2 · Namenskollisionen ──────────────────────────────────────
def oben(t):
    return set(re.findall(r'^(?:var|function)\s+([A-Za-z_$][\w$]*)', t, re.M))
koll = (oben(app) | oben(daten) | oben(rechner)) & oben(lies(rit / 'engine.js'))
if koll:
    fehler.append('Namenskollision mit der Rechen-Engine: ' + ', '.join(sorted(koll)))

# ── 3 · Vollständigkeit der Texte ──────────────────────────────
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

# die zehn Bereiche
lay_texte = []          # alles, was ein Laie auf Stufe 0 sieht
for b in BEREICHE:
    m = re.search(r"^\s{4}" + b + r":\s*\{", daten, re.M)
    if not m:
        fehler.append(f'Bereich {b} fehlt in B_BER')
        continue
    blk = klammerblock(daten, m.end() - 1)
    for f_ in ('frage', 'worum', 'nomen', 'meistern', 'techFeld'):
        v = feld(blk, f_)
        if not v:
            fehler.append(f'Bereich {b}: {f_} fehlt')
        elif f_ in ('worum', 'meistern') and len(v) < 60:
            fehler.append(f'Bereich {b}: {f_} nur {len(v)} Zeichen — zu dünn')
        if v and f_ != 'techFeld':
            lay_texte.append((f'B_BER.{b}.{f_}', v))
    saetze = re.findall(r"'((?:[^'\\]|\\.)*)'", (feld_block := re.search(
        r"lautSatz:\s*\[(.*?)\]", blk, re.S).group(1) if re.search(r"lautSatz:\s*\[", blk) else ''))
    if len(saetze) != 4:
        fehler.append(f'Bereich {b}: {len(saetze)} statt 4 Sätze in lautSatz')
    for i, s in enumerate(saetze):
        if len(s) < 25:
            fehler.append(f'Bereich {b}: lautSatz {i} nur {len(s)} Zeichen')
        lay_texte.append((f'B_BER.{b}.lautSatz[{i}]', s))

# die neun Wanderer
for w in WANDERER:
    m = re.search(r"^\s{4}" + w + r":\s*\{", daten, re.M)
    if not m:
        fehler.append(f'Wanderer {w} fehlt in B_WAND')
        continue
    blk = klammerblock(daten, m.end() - 1)
    for f_ in ('was', 'tempo', 'tun', 'nutzen', 'tech'):
        v = feld(blk, f_)
        if not v:
            fehler.append(f'Wanderer {w}: {f_} fehlt')
            continue
        if f_ == 'was' and len(v) < 90:
            fehler.append(f'Wanderer {w}: was nur {len(v)} Zeichen — zu dünn')
        if f_ in ('tun', 'nutzen') and len(v) < 40:
            fehler.append(f'Wanderer {w}: {f_} nur {len(v)} Zeichen — zu dünn')
        if f_ != 'tech':
            lay_texte.append((f'B_WAND.{w}.{f_}', v))
    if feld(blk, 'tech') != w:
        fehler.append(f'Wanderer {w}: tech muss genau "{w}" sein')

# die vier Arten
for a in ARTEN:
    m = re.search(r"^\s{4}" + a + r":\s*\{", daten, re.M)
    if not m:
        fehler.append(f'Art {a} fehlt in B_ART')
        continue
    blk = klammerblock(daten, m.end() - 1)
    for f_ in ('wie', 'ton', 'tech'):
        v = feld(blk, f_)
        if not v:
            fehler.append(f'Art {a}: {f_} fehlt')
        elif f_ == 'wie':
            if len(v) < 40:
                fehler.append(f'Art {a}: wie nur {len(v)} Zeichen')
            lay_texte.append((f'B_ART.{a}.wie', v))

# die zwölf Felder
haeuser = re.findall(r"^\s{4}(\d+):\s*\{\s*kurz:'((?:[^'\\]|\\.)*)'", daten, re.M)
if len(haeuser) != 12:
    fehler.append(f'{len(haeuser)} statt 12 Felder in B_HAUS')
gefunden = {int(h[0]) for h in haeuser}
if gefunden != set(range(1, 13)):
    fehler.append('B_HAUS deckt nicht genau 1 bis 12 ab: ' + str(sorted(gefunden)))
for nr, kurz in haeuser:
    lay_texte.append((f'B_HAUS.{nr}.kurz', kurz))
    m = re.search(r"^\s{4}" + nr + r":\s*\{", daten, re.M)
    blk = klammerblock(daten, m.end() - 1)
    mt = feld(blk, 'meistern')
    if not mt:
        fehler.append(f'Feld {nr}: meistern fehlt')
    else:
        if len(mt) < 35:
            fehler.append(f'Feld {nr}: meistern nur {len(mt)} Zeichen')
        lay_texte.append((f'B_HAUS.{nr}.meistern', mt))

# die Facetten je Bereich
# Fehlerklasse: ein Bereich, der im Dauerthema nur einen Satz hergibt,
# ist keine Tiefe, sondern eine Behauptung. Geprüft wird deshalb die
# Zahl der Facetten, ihre Mindestlänge und dass jede an einem Feld
# hängt, das wirklich zu diesem Bereich gehört.
FACET_MIND = 3            # so viele zeigt die Seite
FACET_VORRAT = 1          # so viele müssen darüber hinaus bereitstehen,
                          # sonst kann das Chart nichts umsortieren
m_fac = re.search(r"var B_FACET = \{", daten)
if not m_fac:
    fehler.append('B_FACET fehlt — die Bereiche haben keine Facetten')
else:
    fac_block = klammerblock(daten, m_fac.end() - 1)
    # welche Felder gehören zu welchem Bereich — aus dem Rechner, nicht doppelt gepflegt
    HAEUSER = {}
    for mb in re.finditer(r"k:'(\w+)',\s*name:'[^']*',\s*haeuser:\[([\d,\s]+)\]", rechner):
        HAEUSER[mb.group(1)] = [int(x) for x in mb.group(2).split(',')]
    if set(HAEUSER) != set(BEREICHE):
        fehler.append('die Felder der Bereiche sind im Rechner nicht lesbar: '
                      + str(sorted(HAEUSER)))
    for b in BEREICHE:
        mb = re.search(r"^\s{4}" + b + r":\s*\[", fac_block, re.M)
        if not mb:
            fehler.append(f'Bereich {b}: keine Facetten in B_FACET')
            continue
        # bis zur schließenden Klammer dieses Bereichs
        rest = fac_block[mb.end():]
        tiefe, ende = 1, len(rest)
        for i, c in enumerate(rest):
            if c == '[':
                tiefe += 1
            elif c == ']':
                tiefe -= 1
                if tiefe == 0:
                    ende = i
                    break
        liste = rest[:ende]
        eintraege = []
        for me in re.finditer(r"\{\s*k:'(\w+)',\s*haus:(\d+),\s*wer:\[([^\]]*)\],", liste):
            blk = klammerblock(liste, me.start())
            eintraege.append((me.group(1), int(me.group(2)),
                              re.findall(r"'(\w+)'", me.group(3)), blk))
        if len(eintraege) < FACET_MIND + FACET_VORRAT:
            fehler.append(f'Bereich {b}: {len(eintraege)} Facetten — '
                          f'mindestens {FACET_MIND + FACET_VORRAT} nötig '
                          f'({FACET_MIND} werden gezeigt, der Rest ist der Vorrat, '
                          f'aus dem das Chart umsortiert)')
        if len({e[0] for e in eintraege}) != len(eintraege):
            fehler.append(f'Bereich {b}: zwei Facetten haben denselben Schlüssel')
        for k_, haus_, wer_, blk in eintraege:
            if b in HAEUSER and haus_ not in HAEUSER[b]:
                fehler.append(f'Facette {b}/{k_} hängt an Feld {haus_}, '
                              f'das gehört nicht zu diesem Bereich {HAEUSER[b]}')
            if not wer_:
                fehler.append(f'Facette {b}/{k_}: wer ist leer — '
                              'dann kann das Chart sie nicht gewichten')
            for w in wer_:
                if w not in ('Sonne', 'Mond') and w not in WANDERER:
                    fehler.append(f'Facette {b}/{k_}: "{w}" ist kein natal '
                                  'gerechneter Punkt')
            for f_, mind in (('titel', 8), ('was', 120), ('meistern', 35)):
                v = feld(blk, f_)
                if not v:
                    fehler.append(f'Facette {b}/{k_}: {f_} fehlt')
                    continue
                if len(v) < mind:
                    fehler.append(f'Facette {b}/{k_}: {f_} nur {len(v)} Zeichen — '
                                  f'mindestens {mind}')
                if f_ != 'titel' and not v.rstrip().endswith(('.', '?')):
                    fehler.append(f'Facette {b}/{k_}: {f_} endet ohne Punkt')
                lay_texte.append((f'B_FACET.{b}.{k_}.{f_}', v))

# die vier Lautstärken
lauts = re.findall(r"\{\s*k:'(\w+)',\s*n:'([^']+)',\s*farbe:'(#[0-9A-Fa-f]{6})',\s*\n?\s*satz:'((?:[^'\\]|\\.)*)'", daten)
if len(lauts) != 4:
    fehler.append(f'{len(lauts)} statt 4 Lautstärken in B_LAUT')
farben = [l[2] for l in lauts]
if len(set(farben)) != len(farben):
    fehler.append('zwei Lautstärken haben dieselbe Farbe — dann sagt die Farbe nichts')
for k, n, fa, s in lauts:
    lay_texte.append((f'B_LAUT.{k}.satz', s))

# Kapitel und ehrlicher Teil
for f_ in ('laut', 'leise', 'nurKapitel', 'widerspruch'):
    v = re.search(r"\b" + f_ + r":\s*'((?:[^'\\]|\\.)*)'", daten)
    if not v:
        fehler.append(f'B_KAP.{f_} fehlt')
    else:
        lay_texte.append((f'B_KAP.{f_}', v.group(1)))
ehrlich = re.findall(r"\{\s*f:'((?:[^'\\]|\\.)*)',\s*\n?\s*a:'((?:[^'\\]|\\.)*)'", daten)
if len(ehrlich) < 4:
    fehler.append(f'nur {len(ehrlich)} Einträge im ehrlichen Teil — mindestens 4')
for q, a in ehrlich:
    lay_texte.append(('B_EHRLICH.frage', q))
    lay_texte.append(('B_EHRLICH.antwort', a))
for f_ in ('einl', 'rueck'):
    v = re.search(r"\b" + f_ + r":\s*'((?:[^'\\]|\\.)*)'", daten)
    if v:
        lay_texte.append((f'B_DURCH.{f_}', v.group(1)))

# ── 4 · Die Grundregel: kein Maschinenraum im Laientext ────────
# Diese Wörter dürfen in keinem Text stehen, den ein Laie auf
# Stufe 0 sieht. Sie gehören in die Felder mit "tech" und in
# Elemente mit der Klasse ac-tech.
VERBOTEN = (
    ['Sonne', 'Mond', 'Merkur', 'Venus', 'Mars', 'Jupiter', 'Saturn',
     'Uranus', 'Neptun', 'Pluto', 'Lilith', 'Chiron']
    + ['Haus', 'Häuser', 'Hauses']
    + ['Aspekt', 'Aspekte', 'Konjunktion', 'Opposition', 'Quadrat',
       'Trigon', 'Sextil', 'Orbis', 'Orben']
    + ['Transit', 'Transite', 'Aszendent', 'Deszendent', 'Medium Coeli',
       'rückläufig', 'winkelhaft', 'Radix', 'Ekliptik', 'Dispositor',
       'Profektion', 'Firdaria', 'Aphesis', 'Whole Sign', 'Whole-Sign']
    + ['Widder', 'Stier', 'Zwillinge', 'Krebs', 'Löwe', 'Jungfrau',
       'Waage', 'Skorpion', 'Schütze', 'Steinbock', 'Wassermann', 'Fische']
)
for wo, text in lay_texte:
    for v in VERBOTEN:
        if re.search(r'(?<![A-Za-zÄÖÜäöüß])' + re.escape(v) + r'(?![A-Za-zÄÖÜäöüß])', text):
            fehler.append(f'Fachwort "{v}" steht im Laientext {wo}: "{text[:70]}…"')
    if '°' in text:
        fehler.append(f'Gradzeichen im Laientext {wo}')

# Zahlen mit Punkt statt Komma sind im Deutschen falsch
for wo, text in lay_texte:
    m = re.search(r'\d\.\d', text)
    if m:
        fehler.append(f'Dezimalpunkt statt Komma in {wo}: "{m.group(0)}"')

# ── 5 · Handwerk ───────────────────────────────────────────────
if 'toLowerCase' in app + daten + rechner:
    fehler.append('toLowerCase verändert deutsche Großschreibung — nicht benutzen')
for d in ('1987', '08:58'):
    if d in app + daten + rechner + koerper:
        fehler.append(f'echte Geburtsdaten im Quelltext: {d}')
if 'esc(' not in app:
    fehler.append('die Ausgabe wird nicht maskiert')

# jeder Bereich muss im Rechner und in den Daten stehen
for b in BEREICHE:
    if f"k:'{b}'" not in rechner:
        fehler.append(f'Bereich {b} fehlt im Rechner')

# die fünf Blöcke müssen in der festgelegten Reihenfolge erscheinen
blocks = re.findall(r"<h4>(\d) &middot; ([^<]+)</h4>", app)
if [b[0] for b in blocks] != ['1', '2', '3', '4', '5']:
    fehler.append('die fünf Blöcke stehen nicht in der Reihenfolge 1–5: ' + str(blocks))
erwartet = ['Was ist los', 'Was du tun kannst', 'Wie lange das läuft',
            'Wie du es nutzt', 'Dein Dauerthema hier']
if [b[1] for b in blocks] != erwartet:
    fehler.append('die Blöcke heißen anders als vereinbart: ' + str([b[1] for b in blocks]))

# tote Verweise
for href in set(re.findall(r'href="([a-z0-9-]+\.html)"', koerper)):
    if not (wiki / href).exists():
        fehler.append(f'toter Verweis: {href}')

# ── 6 · Die Rechnung einzeln prüfen ────────────────────────────
t = subprocess.run([sys.executable and 'node', str(hier / '_test-bereich.js')],
                   capture_output=True, text=True, cwd=str(hier.parent))
if t.returncode != 0:
    fehler.append('die Rechenprüfung schlägt fehl:\n' + (t.stdout + t.stderr)[-1800:])
else:
    print(t.stdout.strip().splitlines()[-1])

# ── 7 · Rauchprobe im Browser ──────────────────────────────────
probe = hier / '_probe-bereich.js'
probe.write_text(r"""
const {chromium}=(function(){const orte=[process.env.AC_PLAYWRIGHT,'playwright','/opt/npm-tools/node_modules/playwright'];for(const o of orte){if(!o)continue;try{return require(o);}catch(e){}}throw new Error('Playwright nicht gefunden. AC_PLAYWRIGHT setzen oder playwright installieren.');})();
const liste=[]; let i=0;
for(const y of [1958,1971,1983,1996]) for(const h of [4,11,17,22]){
  i++; liste.push({id:'p'+i,name:'Probe '+i,alias:'P'+i,y,mo:1+((i*5)%12),d:3+((i*7)%25),
   h, mi:(i*13)%60, tz:1, lat:52.52, lon:13.405, ort:'Berlin',
   wlat:52.52, wlon:13.405, wort:'Berlin', eigen:i===1, readings:[]});
}
/* Auf Stufe 0 darf keines dieser Wörter sichtbar sein. */
const JARGON=['Konjunktion','Opposition','Quadrat','Trigon','Sextil','Orbis',
  'Transit','Aszendent','winkelhaft','rückläufig','Radix','Whole',
  'Pluto','Neptun','Uranus','Saturn','Jupiter','Merkur',
  'Profektion','Firdaria','Dispositor','Ekliptik'];
const BREITEN=[320,360,390,768,1024,1440];
(async()=>{
const b=await chromium.launch(); const f=[]; const notiz={};
const p=await (await b.newContext({viewport:{width:390,height:900}})).newPage();
p.on('pageerror',e=>f.push('JS: '+String(e.message).slice(0,150)));
p.on('console',m=>{ if(m.type()==='error'){ const s=m.text();
  if(!/ERR_TUNNEL|ERR_NAME_NOT_RESOLVED|net::ERR_|Failed to load resource/.test(s))
    f.push('Konsole: '+s.slice(0,130)); } });
await p.addInitScript(l=>localStorage.setItem('ac_profile_v1',JSON.stringify(
 {v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:l})), liste);
await p.goto('file://ZIEL'); await p.waitForTimeout(900);

const bad=/undefined|NaN|\[object|&[a-z]+;|Invalid Date|\w\.\.(?!\.)|\s\.|,,|\[\[|null/;
async function schlecht(wo){
  const t=await p.evaluate(()=>document.body.innerText);
  const m=t.match(bad); if(m) f.push('schlechter Text bei '+wo+': "'+
    t.slice(Math.max(0,t.indexOf(m[0])-60), t.indexOf(m[0])+60).replace(/\n/g,' ')+'"');
}
await schlecht('Start');

notiz.start=await p.evaluate(()=>({
  facs:[...document.querySelectorAll('.b-ber[open] .b-facs')]
        .map(e=>e.querySelectorAll('.b-fac').length),
  bereiche:document.querySelectorAll('.b-ber').length,
  offen:document.querySelectorAll('.b-ber[open]').length,
  ueber:document.querySelectorAll('.b-u').length,
  bloecke:document.querySelectorAll('.b-ber[open] .b-blk').length,
  haupt:document.querySelectorAll('.b-haupt').length,
  ehrlich:document.querySelectorAll('#behrlich h4').length,
  kopf:(document.getElementById('bkopf')||{}).innerText||'',
  breit:document.body.scrollWidth}));

/* In einem Bereich darf kein Satz zweimal wörtlich stehen. */
notiz.doppelt=await p.evaluate(()=>{
  const raus=[];
  document.querySelectorAll('.b-ber').forEach(d=>{
    d.open=true;
    const name=(d.querySelector('.b-name')||{}).textContent||'?';
    const saetze=[];
    /* Nur Fließtext. In der Dauerliste dürfen zwei Fenster
       zu Recht dasselbe Enddatum nennen. */
    d.querySelectorAll('.b-in p').forEach(e=>{
      if(e.classList.contains('ac-tech')) return;
      (e.innerText||'').split(/(?<=[.!?])\s+/).forEach(s=>{
        s=s.trim(); if(s.length>25) saetze.push(s);
      });
    });
    const zahl={};
    saetze.forEach(s=>{ zahl[s]=(zahl[s]||0)+1; });
    Object.keys(zahl).forEach(s=>{ if(zahl[s]>1) raus.push(name+': "'+s.slice(0,55)+'…"'); });
  });
  return raus;
});

/* Die Facetten müssen vom Chart sortiert sein, nicht von der
   Textdatei. Prüfung: zwei verschiedene Geburtsbilder dürfen nicht
   überall dieselbe Reihenfolge zeigen — sonst ist die Sortierung
   Behauptung. */
async function facFolge(){
  await p.evaluate(()=>document.querySelectorAll('.b-ber').forEach(d=>d.open=true));
  await p.waitForTimeout(250);
  return p.evaluate(()=>{
    const o={};
    document.querySelectorAll('.b-ber').forEach(d=>{
      o[d.id]=[...d.querySelectorAll('.b-fac h5')].map(x=>x.textContent.trim());
    });
    return o;
  });
}
const facA=await facFolge();
await p.evaluate(()=>{const bs=[...document.querySelectorAll('#bpersonen button')];
  if(bs[7]) bs[7].click();});
await p.waitForTimeout(700);
const facB=await facFolge();
notiz.facAnzahl=Object.values(facA).map(v=>v.length);
notiz.facAlleDrei=Object.values(facA).every(v=>v.length>=3)
               && Object.values(facB).every(v=>v.length>=3);
notiz.facAnders=Object.keys(facA).filter(k=>
  facB[k] && JSON.stringify(facA[k])!==JSON.stringify(facB[k])).length;
/* Und innerhalb eines Bereichs darf keine Facette zweimal dastehen. */
notiz.facDoppelt=Object.keys(facA).filter(k=>
  new Set(facA[k]).size!==facA[k].length);
await p.evaluate(()=>{const bs=[...document.querySelectorAll('#bpersonen button')];
  if(bs[0]) bs[0].click();});
await p.waitForTimeout(700);

/* Die Reihenfolge muss nach Lautstärke fallen. */
notiz.folge=await p.evaluate(()=>{
  const rang={'STILL':0,'LEISE':1,'IN BEWEGUNG':2,'VIEL LOS':3};
  return [...document.querySelectorAll('.b-ber .b-laut')]
    .map(x=>rang[x.textContent.trim().toUpperCase()]);
});

/* Der Überblick muss dieselbe Reihenfolge haben wie die Liste. */
notiz.gleich=await p.evaluate(()=>{
  const a=[...document.querySelectorAll('.b-u .b-un')].map(x=>x.textContent.trim());
  const c=[...document.querySelectorAll('.b-ber .b-name')].map(x=>x.textContent.trim());
  return JSON.stringify(a)===JSON.stringify(c);
});

/* Stufe 0: kein Fachwort irgendwo sichtbar. */
await p.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(0); }); await p.waitForTimeout(300);
await p.evaluate(()=>document.querySelectorAll('.b-ber').forEach(d=>d.open=true));
await p.waitForTimeout(200);
notiz.stufe0=await p.evaluate(J=>{
  const t=document.body.innerText;
  return J.filter(w=>new RegExp('(?<![A-Za-zÄÖÜäöüß])'+w+'(?![A-Za-zÄÖÜäöüß])').test(t));
}, JARGON);
notiz.techSichtbar0=await p.evaluate(()=>[...document.querySelectorAll('.ac-tech')]
  .filter(e=>e.offsetParent!==null).length);

/* Stufe 3: jetzt darf die Mechanik da sein. */
await p.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(3); }); await p.waitForTimeout(300);
await p.evaluate(()=>document.querySelectorAll('.b-ber').forEach(d=>d.open=true));
await p.waitForTimeout(200);
notiz.techSichtbar3=await p.evaluate(()=>[...document.querySelectorAll('.ac-tech')]
  .filter(e=>e.offsetParent!==null).length);
await schlecht('Stufe 3');

/* Stichtag wirkt wirklich. */
await p.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(0); }); await p.waitForTimeout(250);
const vor=await p.evaluate(()=>document.getElementById('bliste').innerText);
await p.evaluate(()=>{ const e=document.getElementById('bdatum');
  e.value='2019-06-01'; e.dispatchEvent(new Event('change')); });
await p.waitForTimeout(600);
const nach=await p.evaluate(()=>document.getElementById('bliste').innerText);
notiz.stichtagWirkt = (vor!==nach);
await schlecht('Stichtag 2019');

/* Stichtag vor der Geburt wird abgefangen. */
await p.evaluate(()=>{ const e=document.getElementById('bdatum');
  e.value='1900-01-01'; e.dispatchEvent(new Event('change')); });
await p.waitForTimeout(500);
notiz.vorGeburt=await p.evaluate(()=>(document.getElementById('bkopf')||{}).innerText||'');

/* Zurück auf heute. */
await p.evaluate(()=>document.getElementById('bheute').click());
await p.waitForTimeout(500);
notiz.zurueck=await p.evaluate(()=>document.querySelectorAll('.b-ber').length);

/* Person wechseln ändert das Bild. */
const p1=await p.evaluate(()=>document.getElementById('bliste').innerText);
await p.evaluate(()=>{const bs=[...document.querySelectorAll('#bpersonen button')];
  if(bs[3]) bs[3].click();});
await p.waitForTimeout(600);
const p2=await p.evaluate(()=>document.getElementById('bliste').innerText);
notiz.personWirkt = (p1!==p2);
await schlecht('andere Person');

/* Ohne Profil darf die Seite nicht leer und nicht kaputt sein. */
const q=await (await b.newContext({viewport:{width:390,height:900}})).newPage();
q.on('pageerror',e=>f.push('JS ohne Profil: '+String(e.message).slice(0,150)));
await q.goto('file://ZIEL'); await q.waitForTimeout(700);
notiz.ohneProfil=await q.evaluate(()=>(document.getElementById('bkopf')||{}).innerText||'');

/* Breiten */
notiz.ueberlauf=[];
for(const w of BREITEN){
  await p.setViewportSize({width:w,height:900}); await p.waitForTimeout(200);
  const s=await p.evaluate(()=>document.body.scrollWidth);
  if(s>w+1) notiz.ueberlauf.push(w+'px → '+s+'px');
}

await b.close();
console.log(JSON.stringify({fehler:f, notiz}, null, 1));
})();
""".replace('ZIEL', str(ziel)), encoding='utf-8')

r = subprocess.run(['node', str(probe)], capture_output=True, text=True, cwd='/tmp')
if r.returncode != 0:
    fehler.append('Rauchprobe lief nicht: ' + (r.stderr or r.stdout)[-900:])
else:
    import json as _json
    try:
        erg = _json.loads(r.stdout)
    except Exception as e:
        fehler.append('Rauchprobe gab keinen lesbaren Bericht: ' + r.stdout[-500:])
        erg = None
    if erg:
        fehler.extend(erg['fehler'])
        n = erg['notiz']
        s = n['start']
        if s['bereiche'] != 10:
            fehler.append(f"{s['bereiche']} statt 10 Bereiche auf der Seite")
        if s['offen'] != 3:
            fehler.append(f"{s['offen']} statt 3 offene Bereiche beim Laden")
        if s['ueber'] != 10:
            fehler.append(f"{s['ueber']} statt 10 Zeilen im Überblick")
        if s['bloecke'] != 15:
            fehler.append(f"{s['bloecke']} statt 15 Blöcke in den drei offenen Bereichen")
        if len(s['facs']) != 3 or any(x < 3 for x in s['facs']):
            fehler.append('die drei offenen Bereiche zeigen nicht je drei '
                          f"Facetten im Dauerthema: {s['facs']}")
        if s['haupt'] < 1:
            fehler.append('kein Bereich hebt seinen stärksten Vorgang hervor')
        if s['ehrlich'] < 4:
            fehler.append(f"nur {s['ehrlich']} Fragen im ehrlichen Teil")
        if len(s['kopf']) < 60:
            fehler.append('der Kopf sagt zu wenig: ' + repr(s['kopf'][:80]))

        folge = n['folge']
        if len(folge) != 10:
            fehler.append(f'{len(folge)} Lautstärken statt 10')
        elif any(x is None for x in folge):
            fehler.append('eine Lautstärke ist nicht lesbar: ' + str(folge))
        elif folge != sorted(folge, reverse=True):
            fehler.append('die Bereiche stehen nicht nach Lautstärke sortiert: ' + str(folge))
        elif len(set(folge)) < 2:
            fehler.append('alle zehn Bereiche sind gleich laut — die Seite unterscheidet nichts')

        if not n['gleich']:
            fehler.append('Überblick und Liste haben verschiedene Reihenfolgen')

        if n['doppelt']:
            fehler.append('derselbe Satz steht zweimal in einem Bereich: '
                          + ' | '.join(n['doppelt'][:4]))

        if not n['facAlleDrei']:
            fehler.append('nicht jeder Bereich zeigt drei Facetten: '
                          + str(n['facAnzahl']))
        if n['facDoppelt']:
            fehler.append('eine Facette steht zweimal im selben Bereich: '
                          + ', '.join(n['facDoppelt'][:4]))
        if n['facAnders'] < 3:
            fehler.append(f"die Facetten sind bei zwei verschiedenen Geburtsbildern "
                          f"in nur {n['facAnders']} von 10 Bereichen anders sortiert "
                          '— dann sortiert nicht das Chart, sondern die Textdatei')
        if n['stufe0']:
            fehler.append('Fachsprache auf Stufe 0 sichtbar: ' + ', '.join(n['stufe0']))
        if n['techSichtbar0'] != 0:
            fehler.append(f"{n['techSichtbar0']} Mechanik-Zeilen schon auf Stufe 0 sichtbar")
        if n['techSichtbar3'] < 5:
            fehler.append(f"auf Stufe 3 nur {n['techSichtbar3']} Mechanik-Zeilen — zu wenig")

        if not n['stichtagWirkt']:
            fehler.append('der Stichtag verändert die Anzeige nicht')
        if not n['personWirkt']:
            fehler.append('ein Personenwechsel verändert die Anzeige nicht')
        if 'vor der Geburt' not in n['vorGeburt']:
            fehler.append('ein Stichtag vor der Geburt wird nicht abgefangen: '
                          + repr(n['vorGeburt'][:90]))
        if n['zurueck'] != 10:
            fehler.append('der Knopf "Heute" bringt die Seite nicht zurück')
        if 'Profil' not in n['ohneProfil']:
            fehler.append('ohne Profil fehlt der Hinweis: ' + repr(n['ohneProfil'][:90]))
        if n['ueberlauf']:
            fehler.append('seitlicher Überlauf bei ' + '; '.join(n['ueberlauf']))

probe.unlink(missing_ok=True)

# ── Bericht ────────────────────────────────────────────────────
print(f'bereiche.html  {ziel.stat().st_size:,} Bytes  →  {ziel}')
for h in hinweise:
    print('  · ' + h)
if fehler:
    print('\nFEHLER:')
    for f_ in fehler:
        print('  ✗ ' + f_)
    sys.exit(1)
print('  ✓ alles geprüft')
