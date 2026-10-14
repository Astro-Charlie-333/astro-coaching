#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut zahlen.html — Numerologie, acht Lebensbereiche, Hausnummern, neun Schulen."""
import pathlib, re, sys, json, subprocess

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit  = hier.parent / 'rituale'

lies = lambda p: p.read_text(encoding='utf-8')

kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Die Zahlen &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<script src="kleine-punkte.js"></script>
<style>
"""

html = (kopf + lies(rit / 'basis.css') + "\n" + lies(hier / 'zahlen-stil.css')
        + '</style><script src="niveau.js" defer></script>\n'
          '<script src="wortwahl.js" defer></script>\n</head><body>\n'
        + lies(hier / 'zahlen-koerper.html') + "\n<script>\n"
        + lies(rit / 'engine.js') + "\n"
        + lies(hier / 'zahlen-rechner.js') + "\n"
        + lies(hier / 'zahlen-daten.js') + "\n"
        + lies(hier / 'zahlen-app.js')
        + "\n</script>\n</body></html>\n")

ziel = wiki / 'zahlen.html'
ziel.write_text(html, encoding='utf-8')

fehler, hinweise = [], []
koerper = lies(hier / 'zahlen-koerper.html')
app     = lies(hier / 'zahlen-app.js')
daten   = lies(hier / 'zahlen-daten.js')
rechner = lies(hier / 'zahlen-rechner.js')

# ── 1 · Verdrahtung ────────────────────────────────────────────
ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bzEl\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
if gesucht - ids:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(gesucht - ids)))
unbenutzt = ids - gesucht - {'nivleiste'}
if unbenutzt:
    hinweise.append('IDs im Körper, die das Skript nie anfasst: ' + ', '.join(sorted(unbenutzt)))

auf, zu = len(re.findall(r'<div\b', koerper)), len(re.findall(r'</div>', koerper))
if auf != zu:
    fehler.append(f'div-Bilanz: {auf} auf, {zu} zu')
for tag in ('section', 'table', 'nav'):
    a, z = len(re.findall(r'<%s\b' % tag, koerper)), len(re.findall(r'</%s>' % tag, koerper))
    if a != z:
        fehler.append(f'{tag}-Bilanz: {a} auf, {z} zu')

# ── 2 · Namenskollisionen (alles liegt in einem Skriptblock) ───
ERLAUBT = {'nrm'}
def oben(t):
    return set(re.findall(r'^(?:var|function)\s+([A-Za-z_$][\w$]*)', t, re.M))
koll = (oben(app) | oben(daten) | oben(rechner)) & oben(lies(rit / 'engine.js')) - ERLAUBT
if koll:
    fehler.append('Namenskollision mit der Rechen-Engine: ' + ', '.join(sorted(koll)))

# ── 3 · Vollständigkeit der Inhalte ───────────────────────────
ZAHLEN = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33]
THEMEN = re.findall(r"\{k:'([a-z]+)',\s*n:'", daten)
themen = [t for t in re.findall(r"\{k:'(\w+)',\s+n:'[^']+',\s+u:'", daten)]
if len(themen) != 8:
    fehler.append(f'{len(themen)} statt 8 Bereiche in Z_THEMA: {themen}')

def block_von(name, text):
    """Schneidet var NAME = { ... }; heraus, über die Klammerbilanz."""
    m = re.search(r'var\s+' + name + r'\s*=\s*\{', text)
    if not m:
        return None
    i = m.end() - 1
    tiefe, j = 0, i
    while j < len(text):
        if text[j] == '{':
            tiefe += 1
        elif text[j] == '}':
            tiefe -= 1
            if tiefe == 0:
                return text[i:j + 1]
        j += 1
    return None

zt = block_von('Z_ZT', daten)
zz = block_von('Z_ZAHL', daten)
zw = block_von('Z_WOHN', daten)
if not (zt and zz and zw):
    fehler.append('Z_ZT, Z_ZAHL oder Z_WOHN nicht gefunden — Struktur geändert?')
else:
    for n in ZAHLEN:
        for name, blk in (('Z_ZAHL', zz), ('Z_WOHN', zw), ('Z_ZT', zt)):
            if not re.search(r'[\{,\s]' + str(n) + r':\{', blk):
                fehler.append(f'{name}: Eintrag für die {n} fehlt')
    # jede Zelle der Matrix besetzt, und jede mit Text und Handgriff
    for m in re.finditer(r'(?:^|\n)(\d+):\{', zt):
        n = m.group(1)
        ende = zt.find('\n', m.end())
        # Zellenblock dieser Zahl: bis zur nächsten Zahl auf Spaltenanfang
        nx = re.search(r'\n(\d+):\{', zt[m.end():])
        zelle = zt[m.end(): m.end() + (nx.start() if nx else len(zt))]
        for th in themen:
            c = re.search(th + r":\{t:'((?:[^'\\]|\\.)*)'\s*,\s*tun:'((?:[^'\\]|\\.)*)'", zelle)
            if not c:
                fehler.append(f'Z_ZT[{n}]: Bereich {th} fehlt oder hat kein t/tun')
                continue
            if len(c.group(1)) < 90:
                fehler.append(f'Z_ZT[{n}].{th}: Text nur {len(c.group(1))} Zeichen — zu dünn')
            if len(c.group(2)) < 20:
                fehler.append(f'Z_ZT[{n}].{th}: Handgriff zu kurz')
    for feld in ('wesen', 'stark', 'schatten', 'satt', 'hat', 'gibt', 'braucht', 'zuviel'):
        n_feld = len(re.findall(r'\b' + feld + r':', zz))
        if n_feld != 12:
            fehler.append(f'Z_ZAHL: {n_feld} statt 12 Einträge haben {feld}')
    for feld in ('tut', 'gut', 'schwer', 'kniff'):
        if len(re.findall(r'\b' + feld + r':', zw)) != 12:
            fehler.append(f'Z_WOHN: nicht alle 12 Einträge haben {feld}')

n_sys = len(re.findall(r"\{k:'\w+',\s*n:'[^']+',\s*ruf:", daten))
if n_sys < 9:
    fehler.append(f'nur {n_sys} Schulen beschrieben, erwartet mindestens 9')
for m in re.finditer(r"\{k:'(\w+)',\s*n:'([^']+)',\s*ruf:", daten):
    blk = daten[m.end(): m.end() + 2600]
    for feld in ('wie', 'her', 'gut', 'vor'):
        if not re.search(r'\b' + feld + r":'", blk):
            fehler.append(f'Schule {m.group(2)}: Feld {feld} fehlt')

# ── 4 · Deutsche Textfallen ───────────────────────────────────
# Kleinschreibung in deutschem Fließtext war bisher immer ein Fehler.
for block, name in ((daten, 'zahlen-daten'), (app, 'zahlen-app')):
    for m in re.finditer(r'\.toLowerCase\(\)', block):
        zeile = block[:m.start()].count('\n') + 1
        fehler.append(f'{name}.js Zeile {zeile}: toLowerCase im Text — '
                      'deutsche Substantive bleiben groß')
# Dezimalpunkt statt Komma, aber nur in den Texten, nicht im Code
for m in re.finditer(r"'((?:[^'\\]|\\.){25,})'", daten):
    s = m.group(1)
    for d in re.finditer(r'\d\.\d', s):
        if not re.match(r'\d\.\s', s[d.start():]):   # „1. Haus" ist in Ordnung
            fehler.append('Dezimalpunkt im deutschen Text: …%s…'
                          % s[max(0, d.start() - 24):d.start() + 12])
# Platzhalter, die nicht gefüllt wurden
for ph in ('{A}', '{B}', '{n}', 'TODO', 'XXX', 'Lorem'):
    if ph in daten or ph in koerper:
        fehler.append('unausgefüllter Platzhalter im Text: ' + ph)

# ── 5 · Niemandes echte Daten in dieser Seite ─────────────────
#    (packen.py prüft das Repo; hier die Seite selbst, inklusive Probe)
for muster, was in ((r'\b1987\b', 'Geburtsjahr'), (r'\b08:58\b', 'Geburtszeit')):
    if re.search(muster, koerper + app + daten):
        fehler.append(f'echte persönliche Angabe ({was}) im Seitentext')

# ── 6 · Verweise ──────────────────────────────────────────────
for href in sorted(set(re.findall(r'href="([a-z0-9_-]+\.html)', koerper))):
    if not (wiki / href).exists():
        fehler.append('Verweis ins Leere: ' + href)

# ── 7 · Die Rechnung selbst prüfen ────────────────────────────
t = hier / '_test-rechner.js'
if t.exists():
    r = subprocess.run(['node', str(t)], capture_output=True, text=True, timeout=180)
    if r.returncode != 0:
        fehler.append('Rechnung fällt durch: ' +
                      (r.stdout + r.stderr).strip().splitlines()[-1][:180])
    else:
        letzte = [x for x in r.stdout.strip().splitlines() if 'Prüfungen' in x]
        if letzte:
            print('  ' + letzte[-1])
else:
    fehler.append('_test-rechner.js fehlt — die Rechnung wäre ungeprüft')

# ── 8 · Rauchprobe: die Seite wirklich bedienen ───────────────
probe = hier / '_probe-zahlen.js'
probe.write_text(r"""
const {chromium}=require('/opt/npm-tools/node_modules/playwright');
/* Erfundene Profile. Kein echtes Geburtsdatum in einer Probe. */
const liste=[
 {id:'p1',name:'Probe Person',alias:'PP',y:1980,mo:7,d:15,h:11,mi:20,tz:1,
  lat:52.52,lon:13.405,ort:'Berlin',wlat:52.52,wlon:13.405,wort:'Berlin',eigen:true,readings:[]},
 {id:'p2',name:'Zweite Probe',alias:'ZP',y:1966,mo:2,d:29,h:3,mi:5,tz:1,
  lat:48.14,lon:11.58,ort:'Muenchen',wlat:48.14,wlon:11.58,wort:'Muenchen',eigen:false,readings:[]},
 {id:'p3',name:'Mary Lee Baer',alias:'MB',y:1998,mo:11,d:2,h:19,mi:45,tz:1,
  lat:53.55,lon:9.99,ort:'Hamburg',wlat:53.55,wlon:9.99,wort:'Hamburg',eigen:false,readings:[]}];
const BREITEN=[320,360,390,600,768,1024,1440,1600];
(async()=>{
const b=await chromium.launch(); const f=[]; const notiz={};
const ctx=await b.newContext({viewport:{width:390,height:900}});
const p=await ctx.newPage();
p.on('pageerror',e=>f.push('JS: '+String(e.message).slice(0,150)));
p.on('console',m=>{ if(m.type()==='error'){ const s=m.text();
  /* Schriften und sonstiges Netz sind hier nicht erreichbar — das ist die Umgebung */
  if(!/ERR_TUNNEL|ERR_NAME_NOT_RESOLVED|ERR_INTERNET|net::ERR_|Failed to load resource/.test(s))
    f.push('Konsole: '+s.slice(0,130)); } });
await p.addInitScript(l=>localStorage.setItem('ac_profile_v1',JSON.stringify(
 {v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:l})), liste);
await p.goto('file://ZIEL'); await p.waitForTimeout(800);

const bad=/undefined|NaN|\[object|&[a-z]+;|sie machst|dein Sonne/;
async function schlecht(wo){
  const t=await p.evaluate(()=>document.body.innerText);
  const m=t.match(bad); if(m) f.push('schlechter Text bei '+wo+': "'+
    t.slice(Math.max(0,t.indexOf(m[0])-50), t.indexOf(m[0])+50).replace(/\n/g,' ')+'"');
}
await schlecht('Start');

/* Grundgerüst */
notiz.start=await p.evaluate(()=>({
  karten:document.querySelectorAll('.z-k').length,
  segmente:document.querySelectorAll('.z-seg').length,
  meister:document.querySelectorAll('.z-mz').length,
  kette:document.querySelectorAll('.z-rechn .zf').length,
  mzeilen:document.querySelectorAll('#zmatrix tbody tr').length,
  mspalten:document.querySelectorAll('#zmatrix thead th').length,
  liste:document.querySelectorAll('#zmliste .zl').length,
  schulen:document.querySelectorAll('#zschulen .z-sys').length,
  balken:document.querySelectorAll('#zvert .z-bal i').length,
  abw:(document.getElementById('zabw')||{}).textContent||'',
  planetzeilen:document.querySelectorAll('#zplanet tbody tr').length,
  passtzeilen:document.querySelectorAll('#zpasst tbody tr').length,
  sprung:document.querySelectorAll('.z-sprung a').length,
  leerKarten:document.querySelectorAll('.z-k.leer').length}));

/* Sprungmarken müssen auf existierende Abschnitte zeigen */
notiz.sprungOk=await p.evaluate(()=>[...document.querySelectorAll('.z-sprung a')]
  .every(a=>!!document.querySelector(a.getAttribute('href'))));

/* Jede der zwölf Zahlen einmal öffnen */
let minB=1e9, themenMin=99; const titel=new Set();
for(const n of [1,2,3,4,5,6,7,8,9,11,22,33]){
  await p.evaluate(n=>{
    const g=document.querySelector('[data-z="'+n+'"]'); g.dispatchEvent(
      new MouseEvent('click',{bubbles:true})); }, n);
  await p.waitForTimeout(90);
  const r=await p.evaluate(()=>({
    bereiche:document.querySelectorAll('#zdetail .z-b').length,
    tun:document.querySelectorAll('#zdetail .z-b .tun').length,
    h3:(document.querySelector('#zdetail h3')||{}).textContent||'',
    laenge:(document.getElementById('zdetail')||{}).innerText.length||0,
    breit:document.body.scrollWidth}));
  if(r.bereiche<8) f.push('Zahl '+n+': nur '+r.bereiche+' Bereiche im Detail');
  if(r.tun<8) f.push('Zahl '+n+': nur '+r.tun+' Handgriffe');
  if(r.laenge<1400) f.push('Zahl '+n+': Detail nur '+r.laenge+' Zeichen');
  if(r.breit>390) f.push('Zahl '+n+': Überlauf '+r.breit);
  titel.add(r.h3); if(r.bereiche<themenMin) themenMin=r.bereiche;
  if(r.laenge<minB) minB=r.laenge;
  await schlecht('Zahl '+n);
}
notiz.detailTitel=titel.size; notiz.detailMin=minB;

/* Name eintragen → Namenszahlen müssen auftauchen */
await p.fill('#zname','Mary Lee Baer'); await p.waitForTimeout(480);
notiz.mitName=await p.evaluate(()=>({
  leer:document.querySelectorAll('.z-k.leer').length,
  gitter:document.querySelectorAll('.z-gitter .lk:not(.luecke)').length,
  vokale:document.querySelectorAll('.z-gitter .lk.vokal').length,
  streit:document.querySelectorAll('#zstreit .z-streit').length}));
await schlecht('mit Name');

/* Tafel umschalten — die Zahlen müssen sich ändern */
const vor=await p.evaluate(()=>document.querySelector('#zkarten').innerText);
await p.click('button[data-s="chald"]'); await p.waitForTimeout(400);
const nach=await p.evaluate(()=>document.querySelector('#zkarten').innerText);
notiz.tafelWirkt=(vor!==nach);
await schlecht('chaldäisch');
await p.click('button[data-s="pyth"]'); await p.waitForTimeout(300);

/* Buchstaben verdecken */
await p.click('#znamever'); await p.waitForTimeout(220);
notiz.verdeckt=await p.evaluate(()=>{
  const g=document.querySelector('.z-gitter'); return g? !/[A-Z]/.test(g.innerText):false; });
await p.click('#znamever'); await p.waitForTimeout(200);

/* Hausnummern */
const adrProbe=['47a','12/3','8','29','Hauptstraße 4','Hauptstraße 47a, 3. OG','abc'];
notiz.adressen=[];
for(const a of adrProbe){
  await p.fill('#zadr',a); await p.waitForTimeout(330);
  const r=await p.evaluate(()=>({
    bloecke:document.querySelectorAll('#zwohnerg .z-wohnerg').length,
    urteil:[...document.querySelectorAll('.z-wurteil')].map(x=>x.textContent).join('/'),
    leer:document.querySelectorAll('#zwohnerg .z-leer').length,
    passt:document.querySelectorAll('#zwohnerg .z-passt b').length,
    laenge:(document.getElementById('zwohnerg')||{}).innerText.length||0,
    breit:document.body.scrollWidth}));
  notiz.adressen.push({a,...r});
  if(a!=='abc'){
    if(!r.bloecke) f.push('Adresse "'+a+'" gibt keinen Block');
    if(!r.urteil) f.push('Adresse "'+a+'" gibt kein Urteil');
    if(r.passt!==12*r.bloecke) f.push('Adresse "'+a+'": '+r.passt+' statt '+
      (12*r.bloecke)+' Lebenszahlen in der Eignung ('+r.bloecke+' Nummernteile)');
  } else if(!r.leer) f.push('"abc" müsste als unbrauchbar erkannt werden');
  if(r.breit>390) f.push('Adresse "'+a+'": Überlauf '+r.breit);
  await schlecht('Adresse '+a);
}

/* Bereichsfilter */
const themen=await p.evaluate(()=>[...document.querySelectorAll('#zthemen button')].map(b=>b.dataset.t));
notiz.themen=themen.length;
for(const t of themen){
  await p.evaluate(t=>document.querySelector('#zthemen button[data-t="'+t+'"]').click(), t);
  await p.waitForTimeout(80);
  const n=await p.evaluate(()=>document.querySelectorAll('#zmliste .zl').length);
  if(n!==12) f.push('Bereich '+t+': '+n+' statt 12 Zeilen in der schmalen Liste');
}

/* Bericht */
notiz.bericht=await p.evaluate(()=>typeof zBerichtText==='function'?zBerichtText():'');
notiz.berichtLaenge=notiz.bericht.length;
if(/undefined|NaN|&[a-z]+;|<[a-z]/.test(notiz.bericht))
  f.push('Bericht enthält Rohzeug: '+notiz.bericht.slice(0,160));
delete notiz.bericht;

/* Alle fünf Wissensstufen */
notiz.stufen=[];
for(let s=0;s<=4;s++){
  await p.evaluate(s=>AC_NIV.setzen(s), s); await p.waitForTimeout(170);
  const r=await p.evaluate(()=>{
    const sicht=e=>getComputedStyle(e).display!=='none'&&e.offsetParent!==null;
    return {
    tech:[...document.querySelectorAll('.ac-tech')].filter(sicht).length,
    tiefe:[...document.querySelectorAll('[data-ab]')].filter(sicht).length,
    sichtbar:document.body.innerText.length,
    breit:document.body.scrollWidth};});
  notiz.stufen.push({s,...r});
  if(r.breit>390) f.push('Stufe '+s+': Überlauf '+r.breit);
  if(r.sichtbar<9000) f.push('Stufe '+s+': nur '+r.sichtbar+' Zeichen sichtbar');
}
await p.evaluate(()=>AC_NIV.setzen(2)); await p.waitForTimeout(150);

/* Breiten */
notiz.breiten=[];
for(const w of BREITEN){
  await p.setViewportSize({width:w,height:900}); await p.waitForTimeout(220);
  const r=await p.evaluate(()=>({scroll:document.body.scrollWidth,
    ring:!!document.querySelector('.z-ring'),
    matrix:getComputedStyle(document.getElementById('zmatrix')).display,
    liste:getComputedStyle(document.getElementById('zmliste')).display}));
  notiz.breiten.push({w,...r});
  if(r.scroll>w+1) f.push('Breite '+w+': Inhalt '+r.scroll+' breit');
  if(!r.ring) f.push('Breite '+w+': kein Ring');
  if(r.matrix==='none'&&r.liste==='none') f.push('Breite '+w+': weder Tabelle noch Liste sichtbar');
}
await p.setViewportSize({width:390,height:900});

/* Ohne Profil darf nichts brechen */
const p2=await (await b.newContext({viewport:{width:390,height:900}})).newPage();
const f2=[]; p2.on('pageerror',e=>f2.push(String(e.message).slice(0,140)));
await p2.goto('file://ZIEL'); await p2.waitForTimeout(700);
notiz.ohneProfil=await p2.evaluate(()=>({
  segmente:document.querySelectorAll('.z-seg').length,
  leer:document.querySelectorAll('.z-leer').length,
  schulen:document.querySelectorAll('.z-sys').length,
  text:document.body.innerText.length}));
await p2.evaluate(()=>{const g=document.querySelector('[data-z="7"]');
  g.dispatchEvent(new MouseEvent('click',{bubbles:true}));});
await p2.waitForTimeout(150);
notiz.ohneProfil.detail=await p2.evaluate(
  ()=>document.querySelectorAll('#zdetail .z-b').length);
await p2.fill('#zadr','47a'); await p2.waitForTimeout(330);
notiz.ohneProfil.adresse=await p2.evaluate(
  ()=>document.querySelectorAll('#zwohnerg .z-wohnerg').length);
f2.forEach(x=>f.push('ohne Profil: '+x));

console.log(JSON.stringify({notiz,fehler:[...new Set(f)]}));
await b.close();})();
""".replace('ZIEL', str(ziel)), encoding='utf-8')

pr = None
try:
    r = subprocess.run(['node', str(probe)], capture_output=True, text=True, timeout=600)
    if r.returncode == 0 and r.stdout.strip():
        pr = json.loads(r.stdout.strip().splitlines()[-1])
    else:
        fehler.append('Rauchprobe: ' + ((r.stderr or r.stdout).strip().splitlines() or ['?'])[-1][:220])
except Exception as e:
    fehler.append('Rauchprobe: ' + str(e)[:220])
finally:
    probe.unlink(missing_ok=True)

if pr:
    for x in pr['fehler']:
        fehler.append(x)
    s, n = pr['notiz'], pr['notiz']['start']
    if n['karten'] != 8:        fehler.append(f'{n["karten"]} statt 8 Karten im Blatt')
    if n['segmente'] != 9:      fehler.append(f'{n["segmente"]} statt 9 Ringsegmente')
    if n['meister'] != 3:       fehler.append(f'{n["meister"]} statt 3 Meisterzahlen')
    if n['mzeilen'] != 12:      fehler.append(f'{n["mzeilen"]} statt 12 Zeilen in der Matrix')
    if n['mspalten'] != 9:      fehler.append(f'{n["mspalten"]} statt 9 Spalten (Zahl + 8 Bereiche)')
    if n['liste'] != 12:        fehler.append(f'{n["liste"]} statt 12 Zeilen in der schmalen Liste')
    if n['schulen'] != 9:       fehler.append(f'{n["schulen"]} statt 9 Schulen auf der Seite')
    if n['balken'] != 12:       fehler.append(f'{n["balken"]} statt 12 Balken in der Verteilung')
    if n['planetzeilen'] != 9:  fehler.append(f'{n["planetzeilen"]} statt 9 Zeilen in der Planetentabelle')
    if n['passtzeilen'] != 12:  fehler.append(f'{n["passtzeilen"]} statt 12 Zeilen in der Eignungstabelle')
    if n['kette'] < 8:          fehler.append(f'die Rechenkette zeigt nur {n["kette"]} Felder')
    if not n['abw'].strip() or '%' not in n['abw']:
        fehler.append('die Abweichungsquote wird nicht ausgerechnet')
    if not s['sprungOk']:
        fehler.append('eine Sprungmarke zeigt auf einen Abschnitt, den es nicht gibt')
    if s['detailTitel'] != 12:
        fehler.append(f'nur {s["detailTitel"]} verschiedene Detail-Überschriften bei 12 Zahlen')
    if not s['tafelWirkt']:
        fehler.append('das Umschalten der Tafel ändert die Zahlen nicht')
    if not s['verdeckt']:
        fehler.append('„Buchstaben verdecken" verdeckt die Buchstaben nicht')
    mn = s['mitName']
    if mn['leer']:      fehler.append(f'{mn["leer"]} Karten bleiben leer, obwohl ein Name eingetragen ist')
    if mn['gitter'] != 11:  fehler.append(f'Buchstabengitter zeigt {mn["gitter"]} statt 11 Buchstaben')
    if mn['vokale'] < 4:    fehler.append(f'nur {mn["vokale"]} Vokale markiert')
    if not mn['streit']:    fehler.append('kein Hinweis auf die Uneinigkeit der Schulen, obwohl der Name einen auslöst')
    if s['themen'] != 8:    fehler.append(f'{s["themen"]} statt 8 Bereichsknöpfe')
    if s['berichtLaenge'] < 2500:
        fehler.append(f'der Bericht ist nur {s["berichtLaenge"]} Zeichen lang')
    op = s['ohneProfil']
    if op['segmente'] != 9: fehler.append('ohne Profil fehlt der Ring')
    if op['detail'] != 8:   fehler.append('ohne Profil fehlen die Bereiche im Detail')
    if not op['adresse']:   fehler.append('ohne Profil rechnet die Hausnummer nicht')
    if op['text'] < 9000:   fehler.append(f'ohne Profil nur {op["text"]} Zeichen Seite')
    tech = [x['tech'] for x in s['stufen']]
    tiefe = [x['tiefe'] for x in s['stufen']]
    if not (tech[0] == tech[1] == 0):
        fehler.append(f'Fachangaben sind auf Stufe 0/1 sichtbar: {tech}')
    # Jede Stufe muss wirklich etwas dazulegen, sonst ist die Einstellung Zierde
    for k in range(4):
        if tiefe[k + 1] <= tiefe[k]:
            fehler.append(f'Stufe {k+1} zeigt nicht mehr als Stufe {k}: {tiefe}')
    if s['stufen'][4]['sichtbar'] <= s['stufen'][0]['sichtbar']:
        fehler.append('Stufe Pro zeigt nicht mehr Text als Stufe Neu')

    print('  Rauchprobe: 12 Zahlen geöffnet (Detail %d–… Zeichen), %d Bereiche je Zahl, '
          '%d Adressen, 5 Stufen, %d Breiten, Bericht %d Zeichen'
          % (s['detailMin'], n['mspalten'] - 1, len(s['adressen']),
             len(s['breiten']), s['berichtLaenge']))
    print('    Zusatzangaben je Stufe 0–4: %s  (davon Fachsprache %s)' % (tiefe, tech))
    print('    Seitentext je Stufe: %s Zeichen'
          % [x['sichtbar'] for x in s['stufen']])
    print('    Adressen: %s' % ', '.join(
        '%s→%s' % (a['a'], a['urteil'] or ('leer' if a['leer'] else '?')) for a in s['adressen']))

print(f'zahlen.html  {ziel.stat().st_size:,} Bytes  →  {ziel}')
print('  12 Zahlen × %d Bereiche = %d Felder, %d Schulen'
      % (len(themen), 12 * len(themen), n_sys))
for h in hinweise:
    print('  Hinweis: ' + h)
for f in fehler:
    print('  FEHLER: ' + f)
sys.exit(1 if fehler else 0)
