#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut zeiten.html — Lebensabschnitte in Alltagssprache, fünf Bereiche."""
import pathlib, re, sys, json, subprocess, html as _html

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit  = hier.parent / 'rituale'

lies = lambda p: p.read_text(encoding='utf-8')

kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Wann bei dir was los ist &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<script src="kleine-punkte.js"></script>
<style>
"""

html = (kopf + lies(rit / 'basis.css') + "\n" + lies(hier / 'zeit-stil.css')
        + '</style><script src="niveau.js" defer></script>\n'
          '<script src="wortwahl.js" defer></script>\n</head><body>\n'
        + lies(hier / 'zeit-koerper.html') + "\n<script>\n"
        + lies(rit / 'engine.js') + "\n"
        + lies(hier / 'zeit-rechner.js') + "\n"
        + lies(hier / 'zeit-daten.js') + "\n"
        + lies(hier / 'zeit-app.js')
        + "\n</script>\n</body></html>\n")

ziel = wiki / 'zeiten.html'
# Die App-Ansicht: Manifest, Symbol, Zwischenspeicher. Die Zeilen dafür
# stehen in app/app-kopf.html — an einer Stelle für alle Seiten.
html = html.replace('<head>', '<head>' + (hier.parent / 'app' / 'app-kopf.html').read_text(encoding='utf-8'), 1)
ziel.write_text(html, encoding='utf-8')

fehler, hinweise = [], []
koerper = lies(hier / 'zeit-koerper.html')
app     = lies(hier / 'zeit-app.js')
daten   = lies(hier / 'zeit-daten.js')
rechner = lies(hier / 'zeit-rechner.js')

BEREICHE = ['arbeit', 'liebe', 'koerper', 'erfolg', 'druck']

# ── 1 · Verdrahtung ────────────────────────────────────────────
ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bztEl\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
if gesucht - ids:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(gesucht - ids)))

auf, zu = len(re.findall(r'<div\b', koerper)), len(re.findall(r'</div>', koerper))
if auf != zu:
    fehler.append(f'div-Bilanz: {auf} auf, {zu} zu')
for tag in ('section', 'nav'):
    a, z = len(re.findall(r'<%s\b' % tag, koerper)), len(re.findall(r'</%s>' % tag, koerper))
    if a != z:
        fehler.append(f'{tag}-Bilanz: {a} auf, {z} zu')

# ── 2 · Namenskollisionen ──────────────────────────────────────
ERLAUBT = {'nrm'}
def oben(t):
    return set(re.findall(r'^(?:var|function)\s+([A-Za-z_$][\w$]*)', t, re.M))
koll = (oben(app) | oben(daten)) & oben(lies(rit / 'engine.js')) - ERLAUBT
if koll:
    fehler.append('Namenskollision mit der Rechen-Engine: ' + ', '.join(sorted(koll)))
doppelt = oben(app) & oben(daten)
if doppelt:
    fehler.append('derselbe Name in zeit-app und zeit-daten: ' + ', '.join(sorted(doppelt)))

# ── 3 · Vollständigkeit ────────────────────────────────────────
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

def textlaenge(block, feld):
    m = re.search(r"\b" + feld + r":\s*'", block)
    if not m:
        return None
    rest = block[m.end() - 1:]
    nx = re.search(r"'\s*,\s*[a-zA-Z]+:", rest)
    stueck = rest[:nx.start() + 1] if nx else rest
    return sum(len(s) for s in re.findall(r"'((?:[^'\\]|\\.)*)'", stueck))

kap = re.findall(r'^(\d+):\{n:\'', daten, re.M)
if len(kap) != 12:
    fehler.append(f'{len(kap)} statt 12 Kapitel in ZT_KAPITEL')
for m in re.finditer(r"^(\d+):\{n:'([^']+)'", daten, re.M):
    name = m.group(2)
    block = klammerblock(daten, m.end() - len(m.group(2)) - 5)
    if not re.search(r"\bbild:\s*'", block):
        fehler.append(f'Kapitel {name}: kein Bild in einfachen Worten')
    for spur in BEREICHE:
        sm = re.search(r"\b" + spur + r":\{", block)
        if not sm:
            fehler.append(f'Kapitel {name}: Bereich {spur} fehlt')
            continue
        sb = klammerblock(block, sm.end() - 1)
        lt, ltun = textlaenge(sb, 't'), textlaenge(sb, 'tun')
        if lt is None or ltun is None:
            fehler.append(f'Kapitel {name}/{spur}: t oder tun fehlt')
            continue
        if lt < 110:
            fehler.append(f'Kapitel {name}/{spur}: Text nur {lt} Zeichen')
        if ltun < 25:
            fehler.append(f'Kapitel {name}/{spur}: Handgriff nur {ltun} Zeichen')

n_ber = len(re.findall(r"\{k:'(?:" + '|'.join(BEREICHE) + r")', n:'", daten))
if n_ber != 5:
    fehler.append(f'{n_ber} statt 5 Bereiche in ZT_BEREICH')
for feld in ('frage', 'worum', 'los', 'losErkl', 'kurz', 'farbe'):
    if len(re.findall(r'\b' + feld + r":\s*'", daten)) < 5:
        fehler.append(f'nicht alle fünf Bereiche haben {feld}')
if len(re.findall(r"\{n:'[^']+',\s*\n?\s*t:'", daten)) < 4:
    hinweise.append('die vier Schritte sehen anders aus als erwartet')
n_schritte = len(re.findall(r"mehr:'", daten))
if n_schritte < 4:
    fehler.append(f'nur {n_schritte} Schritte mit Vertiefung in ZT_SCHRITTE')
if len(re.findall(r'\{h:\d+,', daten)) != 12:
    fehler.append('ZT_PROFEKTION hat nicht 12 Häuser')

# ── 4 · Jedes erklärte Wort muss es auch geben ────────────────
woerter = set(re.findall(r"^\s*'([^']+)':'", daten, re.M))
benutzt = set()
for m in re.finditer(r"\[\[([^\]|]+)(?:\|[^\]]+)?\]\]", daten + app):
    benutzt.add(m.group(1))
for m in re.finditer(r"ztW\('([^']+)'", app):
    benutzt.add(m.group(1))
fehlende = benutzt - woerter
if fehlende:
    fehler.append('erklärt werden sollen Wörter, die nicht im Glossar stehen: ' +
                  ', '.join(sorted(fehlende)))
if len(woerter) < 8:
    fehler.append(f'nur {len(woerter)} Wörter im Glossar')
# Keine Erklärung darf selbst wieder ein Fachwort einführen
HART = ['winkelhaft', 'Aphesis', 'hermetisch', 'Dekanat', 'Dodekatemorion']
for w in woerter:
    m = re.search(r"'" + re.escape(w) + r"':'((?:[^'\\]|\\.|'\+\s*\n\s*')*)'", daten)
    if m:
        for h in HART:
            if h.lower() in m.group(1).lower():
                fehler.append(f'die Erklärung von „{w}" benutzt selbst das Fachwort „{h}"')

# ── 5 · Die überlieferten Zahlen stehen auf der Seite ─────────
alles_klar = _html.unescape(koerper + daten).replace('\u00ad', '')
for n, z in ((15, 'Widder'), (8, 'Stier'), (20, 'Zwillinge'), (25, 'Krebs'), (19, 'Löwe'),
             (20, 'Jungfrau'), (8, 'Waage'), (15, 'Skorpion'), (12, 'Schütze'),
             (27, 'Steinbock'), (30, 'Wassermann'), (12, 'Fische')):
    if not re.search(z + r'\s+' + str(n) + r'\b', alles_klar):
        fehler.append(f'die Jahre von {z} ({n}) stehen nirgends auf der Seite')
if '360' not in alles_klar:
    fehler.append('das Jahr zu 360 Tagen wird nicht genannt')
if 'Valens' not in alles_klar:
    fehler.append('die Quelle Valens wird nicht genannt')

# ── 6 · Deutsche Textfallen ───────────────────────────────────
for block, name in ((daten, 'zeit-daten'), (app, 'zeit-app')):
    for m in re.finditer(r'\.toLowerCase\(\)', block):
        fehler.append(f'{name}.js Zeile {block[:m.start()].count(chr(10))+1}: toLowerCase im Text')
for m in re.finditer(r"'((?:[^'\\]|\\.){25,})'", daten):
    s = m.group(1)
    for d in re.finditer(r'\d\.\d', s):
        if not re.match(r'\d\.\s', s[d.start():]):
            fehler.append('Dezimalpunkt im deutschen Text: …%s…'
                          % s[max(0, d.start() - 24):d.start() + 12])
for ph in ('{A}', '{B}', 'TODO', 'XXX', 'Lorem'):
    if ph in daten or ph in koerper:
        fehler.append('unausgefüllter Platzhalter: ' + ph)

# ── 7 · Keine echten Geburtsdaten ─────────────────────────────
for muster, was in ((r'\b1987\b', 'Geburtsjahr'), (r'\b08:58\b', 'Geburtszeit')):
    if re.search(muster, koerper + app + daten):
        fehler.append(f'echte persönliche Angabe ({was}) im Seitentext')

# ── 8 · Verweise ──────────────────────────────────────────────
for href in sorted(set(re.findall(r'href="([a-z0-9_-]+\.html)', koerper))):
    if not (wiki / href).exists():
        fehler.append('Verweis ins Leere: ' + href)

# ── 9 · Die Rechnung einzeln prüfen ───────────────────────────
t = hier / '_test-zeit.js'
if t.exists():
    r = subprocess.run(['node', str(t)], capture_output=True, text=True, timeout=180)
    if r.returncode != 0:
        fehler.append('Rechnung fällt durch: ' +
                      (r.stdout + r.stderr).strip().splitlines()[-1][:200])
    else:
        letzte = [x for x in r.stdout.strip().splitlines() if 'Prüfungen' in x]
        if letzte:
            print('  ' + letzte[-1])
else:
    fehler.append('_test-zeit.js fehlt — die Rechnung wäre ungeprüft')

# ── 10 · Rauchprobe ───────────────────────────────────────────
probe = hier / '_probe-zeit.js'
probe.write_text(r"""
const {chromium}=(function(){const orte=[process.env.AC_PLAYWRIGHT,'playwright','/opt/npm-tools/node_modules/playwright'];for(const o of orte){if(!o)continue;try{return require(o);}catch(e){}}throw new Error('Playwright nicht gefunden. AC_PLAYWRIGHT setzen oder playwright installieren.');})();
const liste=[]; let i=0;
for(const y of [1952,1966,1974,1988,1999]) for(const h of [2,9,15,21]){
  i++; liste.push({id:'p'+i,name:'Probe '+i,alias:'P'+i,y,mo:1+((i*5)%12),d:3+((i*7)%25),
   h, mi:(i*11)%60, tz:1, lat:52.52, lon:13.405, ort:'Berlin',
   wlat:52.52, wlon:13.405, wort:'Berlin', eigen:i===1, readings:[]});
}
const BREITEN=[320,360,390,600,768,1024,1440,1600];
const JARGON=['winkelhaft','Los des','Firdaria','Profektion','Aphesis','hermetisch',
  'Lösung der Bindung','Ebene 1','Ebene 2','Orbis','Dispositor'];
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

const bad=/undefined|NaN|\[object|&[a-z]+;|Invalid Date|\w\.\.(?!\.)|\s\.|,,|\[\[/;
async function schlecht(wo){
  const t=await p.evaluate(()=>document.body.innerText);
  const m=t.match(bad); if(m) f.push('schlechter Text bei '+wo+': "'+
    t.slice(Math.max(0,t.indexOf(m[0])-60), t.indexOf(m[0])+60).replace(/\n/g,' ')+'"');
}
await schlecht('Start');

notiz.start=await p.evaluate(()=>({
  zeilen:document.querySelectorAll('.zt-zl').length,
  stufen:[...document.querySelectorAll('.zt-zl .zs')].map(x=>x.textContent),
  unter:document.querySelectorAll('.zt-zl .zu').length,
  ereignisse:document.querySelectorAll('.zt-ereignisse li').length,
  baender:document.querySelectorAll('.zt-band').length,
  legende:document.querySelectorAll('.zt-legende span').length,
  klapp:document.querySelectorAll('.zt-klapp').length,
  daten:(document.querySelector('.zt-daten')||{}).textContent||'',
  schritte:document.querySelectorAll('.zt-schritt').length,
  bilder:document.querySelectorAll('.zt-mini-svg').length,
  woerter:document.querySelectorAll('.zt-w').length,
  weitere:document.querySelectorAll('#ztweitere .zt-j').length,
  tabelle:document.querySelectorAll('#zttabelle tbody tr').length,
  breit:document.body.scrollWidth}));

/* Die Altersachse muss zur Heute-Linie passen */
notiz.achse=await p.evaluate(()=>{
  const svg=document.querySelector('.zt-linie'); if(!svg) return null;
  const heute=svg.querySelector('.zt-heute line');
  const txt=svg.querySelector('.zt-heute text');
  if(!heute||!txt) return null;
  const hx=parseFloat(heute.getAttribute('x1'));
  const alter=parseInt(txt.textContent.replace(/[^0-9]/g,''),10);
  /* die beiden Achsenstriche links und rechts von heute */
  const ticks=[...svg.querySelectorAll('text.zt-achse')]
    .filter(t=>/^[0-9]+$/.test(t.textContent))
    .map(t=>({j:+t.textContent, x:parseFloat(t.getAttribute('x'))}));
  const links=ticks.filter(t=>t.x<=hx).pop();
  const rechts=ticks.filter(t=>t.x>hx)[0];
  return {alter, links:links?links.j:null, rechts:rechts?rechts.j:null};
});
if(notiz.achse){
  const a=notiz.achse;
  if(a.links!==null && a.alter<a.links) f.push('die Heute-Linie steht rechts von Alter '+
    a.links+', obwohl das Alter '+a.alter+' ist');
  if(a.rechts!==null && a.alter>=a.rechts) f.push('die Heute-Linie steht links von Alter '+
    a.rechts+', obwohl das Alter '+a.alter+' ist');
} else f.push('die Altersachse ließ sich nicht prüfen');

/* Ein erklärbares Wort muss sich öffnen */
notiz.wortAuf=await p.evaluate(()=>{
  const b=document.querySelector('.zt-w'); if(!b) return null;
  const e=document.getElementById(b.getAttribute('aria-controls'));
  const vorher=e.hasAttribute('hidden'); b.click();
  const nachher=e.hasAttribute('hidden'); const txt=e.textContent.length; b.click();
  return {vorher, nachher, txt};
});
if(!notiz.wortAuf||!notiz.wortAuf.vorher||notiz.wortAuf.nachher)
  f.push('ein erklärbares Wort öffnet sich nicht');

/* Eine Zeile öffnen */
await p.evaluate(()=>document.querySelectorAll('.zt-zl')[1].click());
await p.waitForTimeout(260);
notiz.detail=await p.evaluate(()=>({
  da:!!document.querySelector('.zt-detail'),
  zeilen:document.querySelectorAll('#ztdetail tbody tr').length,
  kopf:(document.querySelector('#ztdetail h3')||{}).textContent||''}));
if(!notiz.detail.da) f.push('Klick auf eine Zeile öffnet kein Detail');
if(notiz.detail.zeilen<3) f.push('Detail zeigt zu wenige Abschnitte');
await schlecht('Detail');

/* Alle Profile: Tafel, Ereignisse, keine Ausreißer */
let minE=999; const lautstaerken=new Set(); const kapitel=new Set();
for(let k=0;k<liste.length;k++){
  await p.evaluate(k=>{const bs=[...document.querySelectorAll('#ztpersonen button')];
    bs[k%bs.length].click(); }, k);
  await p.waitForTimeout(210);
  const r=await p.evaluate(()=>({
    zeilen:document.querySelectorAll('.zt-zl').length,
    stufen:[...document.querySelectorAll('.zt-zl .zs')].map(x=>x.textContent),
    ereignisse:document.querySelectorAll('.zt-ereignisse li').length,
    kapitel:[...document.querySelectorAll('.zt-zl .zk b')].map(x=>x.textContent),
    breit:document.body.scrollWidth}));
  if(r.zeilen!==5) f.push('Profil '+k+': '+r.zeilen+' statt 5 Zeilen');
  if(!r.ereignisse) f.push('Profil '+k+': keine kommenden Ereignisse');
  if(r.breit>390) f.push('Profil '+k+': Überlauf '+r.breit);
  r.stufen.forEach(s=>lautstaerken.add(s)); r.kapitel.forEach(s=>kapitel.add(s));
  if(r.ereignisse<minE) minE=r.ereignisse;
  await schlecht('Profil '+k);
}
notiz.minEreignisse=minE; notiz.lautstaerken=[...lautstaerken];
notiz.kapitelGesehen=kapitel.size;
if(lautstaerken.size<3) f.push('nur '+lautstaerken.size+' verschiedene Lautstärken über alle Profile');
if(kapitel.size<6) f.push('nur '+kapitel.size+' verschiedene Kapitel über 20 Profile');

/* Stichtag */
await p.evaluate(()=>document.querySelectorAll('#ztpersonen button')[0].click());
await p.waitForTimeout(240);
const vor=await p.evaluate(()=>document.getElementById('ztjetzt').innerText);
async function stichtag(d){
  await p.evaluate(d=>{ const e=document.getElementById('ztdatum');
    e.value=d; e.dispatchEvent(new Event('change',{bubbles:true})); }, d);
  await p.waitForTimeout(380);
  return p.evaluate(()=>document.getElementById('ztjetzt').innerText);
}
const nach=await stichtag('1998-05-20');
notiz.stichtagWirkt=(vor!==nach);
if(!notiz.stichtagWirkt) f.push('der Stichtag ändert nichts');
await schlecht('Stichtag 1998');
notiz.vorGeburt=await stichtag('1900-01-01');
if(!/vor der Geburt/.test(notiz.vorGeburt))
  f.push('ein Stichtag vor der Geburt wird nicht abgefangen: '+notiz.vorGeburt.slice(0,110));
notiz.weitDanach=await stichtag('2140-01-01');
if(!/Zukunft|vor der Geburt/.test(notiz.weitDanach))
  f.push('ein Stichtag weit in der Zukunft wird nicht abgefangen: '+notiz.weitDanach.slice(0,110));
notiz.vorGeburt=notiz.vorGeburt.slice(0,58); notiz.weitDanach=notiz.weitDanach.slice(0,46);
await p.evaluate(()=>document.getElementById('ztheute').click());
await p.waitForTimeout(300);

/* Bericht */
notiz.bericht=await p.evaluate(()=>typeof ztBericht==='function'?ztBericht():'');
notiz.berichtLaenge=notiz.bericht.length;
if(/undefined|NaN|&[a-z]+;|<[a-z]|\[\[/.test(notiz.bericht))
  f.push('Bericht enthält Rohzeug: '+notiz.bericht.slice(0,200));
delete notiz.bericht;

/* Wissensstufen */
notiz.stufenTiefe=[]; notiz.jargon0=[];
for(let s=0;s<=4;s++){
  await p.evaluate(s=>AC_NIV.setzen(s), s); await p.waitForTimeout(200);
  const r=await p.evaluate(()=>{
    const sicht=e=>getComputedStyle(e).display!=='none'&&e.offsetParent!==null;
    return {tiefe:[...document.querySelectorAll('[data-ab]')].filter(sicht).length,
      text:document.body.innerText, breit:document.body.scrollWidth};});
  notiz.stufenTiefe.push(r.tiefe);
  if(s===0){ JARGON.forEach(w=>{ if(r.text.indexOf(w)>=0) notiz.jargon0.push(w); });
    notiz.text0=r.text.length; }
  if(r.breit>390) f.push('Stufe '+s+': Überlauf '+r.breit);
  if(r.text.length<3000) f.push('Stufe '+s+': nur '+r.text.length+' Zeichen');
}
if(notiz.jargon0.length)
  f.push('auf Stufe 0 steht Fachsprache ohne Erklärung: '+notiz.jargon0.join(', '));
await p.evaluate(()=>AC_NIV.setzen(2)); await p.waitForTimeout(150);

/* Aufgeklappt muss alles noch passen */
await p.evaluate(()=>document.querySelectorAll('.zt-klapp').forEach(d=>d.open=true));
await p.waitForTimeout(300);
notiz.offen=await p.evaluate(()=>({
  schritte:document.querySelectorAll('.zt-schritt').length,
  tabelle:document.querySelectorAll('#zttabelle tbody tr').length,
  breit:document.body.scrollWidth}));
if(notiz.offen.schritte!==4) f.push('aufgeklappt fehlen die vier Schritte');
if(notiz.offen.tabelle<20) f.push('aufgeklappt hat die Tabelle nur '+notiz.offen.tabelle+' Zeilen');
if(notiz.offen.breit>390) f.push('aufgeklappt Überlauf '+notiz.offen.breit);
await schlecht('aufgeklappt');

/* Breiten */
notiz.breiten=[];
for(const w of BREITEN){
  await p.setViewportSize({width:w,height:900}); await p.waitForTimeout(230);
  const r=await p.evaluate(()=>({scroll:document.body.scrollWidth,
    linie:!!document.querySelector('.zt-linie'),
    tafel:document.querySelectorAll('.zt-zl').length}));
  notiz.breiten.push(w+':'+r.scroll);
  if(r.scroll>w+1) f.push('Breite '+w+': Inhalt '+r.scroll+' breit');
  if(!r.linie||r.tafel!==5) f.push('Breite '+w+': Teile fehlen');
}
await p.setViewportSize({width:390,height:900});

/* Ohne Profil */
const p2=await (await b.newContext({viewport:{width:390,height:900}})).newPage();
const f2=[]; p2.on('pageerror',e=>f2.push(String(e.message).slice(0,140)));
await p2.goto('file://ZIEL'); await p2.waitForTimeout(800);
notiz.ohneProfil=await p2.evaluate(()=>({
  leer:document.querySelectorAll('.zt-leer').length,
  schritte:document.querySelectorAll('.zt-schritt').length,
  text:document.body.innerText.length}));
f2.forEach(x=>f.push('ohne Profil: '+x));
if(notiz.ohneProfil.schritte!==4) f.push('ohne Profil fehlen die vier Schritte');
if(notiz.ohneProfil.text<2500) f.push('ohne Profil fast leere Seite');

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
    if n['zeilen'] != 5:     fehler.append(f'{n["zeilen"]} statt 5 Zeilen in der Tafel')
    if n['unter'] < 4:       fehler.append('die Unterabschnitte fehlen in der Tafel')
    if n['ereignisse'] < 5:  fehler.append(f'nur {n["ereignisse"]} kommende Ereignisse')
    if n['baender'] < 20:    fehler.append(f'nur {n["baender"]} Bänder über fünf Spuren')
    if n['legende'] != 4:    fehler.append(f'{n["legende"]} statt 4 Einträge in der Legende')
    if n['klapp'] != 2:      fehler.append('die beiden aufklappbaren Teile fehlen')
    if 'UTC' not in n['daten']:
        fehler.append('es steht nicht da, mit welchen Geburtsdaten gerechnet wird')
    if n['schritte'] != 4:   fehler.append(f'{n["schritte"]} statt 4 Erklärschritte')
    if n['bilder'] < 4:      fehler.append(f'nur {n["bilder"]} Bilder in der Erklärung')
    if n['weitere'] != 2:    fehler.append('die zwei weiteren Verfahren fehlen')
    if n['woerter'] < 4:     fehler.append(f'nur {n["woerter"]} erklärbare Wörter')
    if s['berichtLaenge'] < 2000:
        fehler.append(f'der Bericht ist nur {s["berichtLaenge"]} Zeichen lang')
    tiefe = s['stufenTiefe']
    if tiefe[0] != 0:
        fehler.append(f'auf Stufe 0 sind Zusatzangaben sichtbar: {tiefe}')
    if tiefe[4] <= tiefe[1]:
        fehler.append(f'die Wissensstufe ändert zu wenig: {tiefe}')

    print('  Rauchprobe: 20 Profile, %d–… kommende Ereignisse, %d Kapitelnamen gesehen, '
          'Bericht %d Zeichen' % (s['minEreignisse'], s['kapitelGesehen'], s['berichtLaenge']))
    print('    Lautstärken über alle Profile: %s' % ', '.join(s['lautstaerken']))
    if s.get('achse'):
        print('    Altersachse: Heute-Linie bei %s zwischen den Marken %s und %s'
              % (s['achse']['alter'], s['achse']['links'], s['achse']['rechts']))
    print('    Gerechnet mit: %s' % n['daten'])
    print('    Stufe 0: %d Zeichen, Fachwörter darin: %s' % (s['text0'], s['jargon0'] or 'keine'))
    print('    Breiten: %s' % ', '.join(s['breiten']))

print(f'zeiten.html  {ziel.stat().st_size:,} Bytes  →  {ziel}')
print('  12 Kapitel × 5 Bereiche = %d Texte, %d erklärte Wörter'
      % (12 * 5, len(woerter)))
for h in hinweise:
    print('  Hinweis: ' + h)
for f in fehler:
    print('  FEHLER: ' + f)
sys.exit(1 if fehler else 0)
