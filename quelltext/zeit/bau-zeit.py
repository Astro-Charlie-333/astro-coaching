#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut zeiten.html — zodiakale Freilassung, Profektion, Firdaria."""
import pathlib, re, sys, json, subprocess

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit  = hier.parent / 'rituale'

lies = lambda p: p.read_text(encoding='utf-8')

kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Die Hochphasen &middot; Astro-Charlie</title>
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
ziel.write_text(html, encoding='utf-8')

fehler, hinweise = [], []
koerper = lies(hier / 'zeit-koerper.html')
app     = lies(hier / 'zeit-app.js')
daten   = lies(hier / 'zeit-daten.js')
rechner = lies(hier / 'zeit-rechner.js')

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
# Der Rechner liegt in einer eigenen Hülle, aber doppelte Namen zwischen
# Daten und Anwendung sind trotzdem ein Fehler.
doppelt = oben(app) & oben(daten)
if doppelt:
    fehler.append('derselbe Name in zeit-app und zeit-daten: ' + ', '.join(sorted(doppelt)))

# ── 3 · Vollständigkeit der Texte ──────────────────────────────
def klammerblock(text, start):
    """Schneidet ab der öffnenden Klammer an Position start den Block heraus."""
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
    """Länge des Feldwerts — die Texte sind über mehrere Zeilen zusammengesetzt,
       deshalb werden alle Zeichenketten des Feldes addiert."""
    m = re.search(r"\b" + feld + r":\s*'", block)
    if not m:
        return None
    rest = block[m.end() - 1:]
    # bis zum nächsten Feldnamen auf derselben Ebene
    nx = re.search(r"'\s*,\s*[a-zA-Z]+:", rest)
    stueck = rest[:nx.start() + 1] if nx else rest
    return sum(len(s) for s in re.findall(r"'((?:[^'\\]|\\.)*)'", stueck))

kap = re.findall(r'^(\d+):\{n:\'', daten, re.M)
if len(kap) != 12:
    fehler.append(f'{len(kap)} statt 12 Kapitel in ZT_KAPITEL')
for m in re.finditer(r"^(\d+):\{n:'([^']+)'", daten, re.M):
    name = m.group(2)
    block = klammerblock(daten, m.end() - len(m.group(2)) - 5)
    for spur in ('beruf', 'liebe'):
        sm = re.search(r"\b" + spur + r":\{", block)
        if not sm:
            fehler.append(f'Kapitel {name}: {spur} fehlt')
            continue
        sb = klammerblock(block, sm.end() - 1)
        lt, ltun = textlaenge(sb, 't'), textlaenge(sb, 'tun')
        if lt is None or ltun is None:
            fehler.append(f'Kapitel {name}/{spur}: t oder tun fehlt')
            continue
        if lt < 120:
            fehler.append(f'Kapitel {name}/{spur}: Text nur {lt} Zeichen')
        if ltun < 25:
            fehler.append(f'Kapitel {name}/{spur}: Handgriff nur {ltun} Zeichen')
if len(re.findall(r'\{h:\d+,', daten)) != 12:
    fehler.append('ZT_PROFEKTION hat nicht 12 Häuser')
for herr in ('Sonne', 'Mond', 'Merkur', 'Venus', 'Mars', 'Jupiter', 'Saturn',
             'Aufsteigender Knoten', 'Absteigender Knoten'):
    if ("'" + herr + "':{t:'") not in daten:
        fehler.append('ZT_FIRDARIA ohne ' + herr)

# ── 4 · Die Zahlen der Überlieferung stehen richtig im Text ────
import html as _html
koerper_klar = _html.unescape(koerper).replace('\u00ad', '')
for n, z in ((15, 'Widder'), (8, 'Stier'), (20, 'Zwillinge'), (25, 'Krebs'), (19, 'Löwe'),
             (20, 'Jungfrau'), (8, 'Waage'), (15, 'Skorpion'), (12, 'Schütze'),
             (27, 'Steinbock'), (30, 'Wassermann'), (12, 'Fische')):
    if not re.search(z + r'\s+' + str(n) + r'\b', koerper_klar):
        fehler.append(f'die Jahre von {z} ({n}) stehen nicht im Rechenweg auf der Seite')
if '211' not in koerper:
    fehler.append('der Umlauf von 211 Monaten wird auf der Seite nicht genannt')
if '360' not in koerper:
    fehler.append('das Jahr zu 360 Tagen wird nicht genannt')

# ── 5 · Deutsche Textfallen ───────────────────────────────────
for block, name in ((daten, 'zeit-daten'), (app, 'zeit-app')):
    for m in re.finditer(r'\.toLowerCase\(\)', block):
        zeile = block[:m.start()].count('\n') + 1
        fehler.append(f'{name}.js Zeile {zeile}: toLowerCase im Text')
for m in re.finditer(r"'((?:[^'\\]|\\.){25,})'", daten):
    s = m.group(1)
    for d in re.finditer(r'\d\.\d', s):
        if not re.match(r'\d\.\s', s[d.start():]):
            fehler.append('Dezimalpunkt im deutschen Text: …%s…'
                          % s[max(0, d.start() - 24):d.start() + 12])
for ph in ('{A}', '{B}', 'TODO', 'XXX', 'Lorem'):
    if ph in daten or ph in koerper:
        fehler.append('unausgefüllter Platzhalter: ' + ph)

# ── 6 · Keine echten Geburtsdaten in der Seite ────────────────
for muster, was in ((r'\b1987\b', 'Geburtsjahr'), (r'\b08:58\b', 'Geburtszeit')):
    if re.search(muster, koerper + app + daten):
        fehler.append(f'echte persönliche Angabe ({was}) im Seitentext')

# ── 7 · Verweise ──────────────────────────────────────────────
for href in sorted(set(re.findall(r'href="([a-z0-9_-]+\.html)', koerper))):
    if not (wiki / href).exists():
        fehler.append('Verweis ins Leere: ' + href)

# ── 8 · Die Rechnung einzeln prüfen ───────────────────────────
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

# ── 9 · Rauchprobe ────────────────────────────────────────────
probe = hier / '_probe-zeit.js'
probe.write_text(r"""
const {chromium}=require('/opt/npm-tools/node_modules/playwright');
/* Erfundene Profile über Jahrzehnte, Tageszeiten und Breiten gestreut. */
const liste=[]; let i=0;
for(const y of [1952,1966,1974,1988,1999]) for(const h of [2,9,15,21]){
  i++; liste.push({id:'p'+i,name:'Probe '+i,alias:'P'+i,y,mo:1+((i*5)%12),d:3+((i*7)%25),
   h, mi:(i*11)%60, tz:1, lat:52.52, lon:13.405, ort:'Berlin',
   wlat:52.52, wlon:13.405, wort:'Berlin', eigen:i===1, readings:[]});
}
const BREITEN=[320,360,390,600,768,1024,1440,1600];
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

const bad=/undefined|NaN|\[object|&[a-z]+;|Invalid Date|:00:00|\w\.\.(?!\.)|\s\.|,,/;
async function schlecht(wo){
  const t=await p.evaluate(()=>document.body.innerText);
  const m=t.match(bad); if(m) f.push('schlechter Text bei '+wo+': "'+
    t.slice(Math.max(0,t.indexOf(m[0])-60), t.indexOf(m[0])+60).replace(/\n/g,' ')+'"');
}
await schlecht('Start');

notiz.start=await p.evaluate(()=>({
  karten:document.querySelectorAll('.zt-j').length,
  baender:document.querySelectorAll('.zt-band').length,
  legende:document.querySelectorAll('.zt-legende span').length,
  gipfel:document.querySelectorAll('#ztgipfel .zt-g').length,
  schnitte:document.querySelectorAll('#ztschnitte .zt-g').length,
  tabelle:document.querySelectorAll('#zttabelle tbody tr').length,
  sprung:document.querySelectorAll('.zt-sprung a').length,
  rauten:document.querySelectorAll('.zt-band path').length,
  heute:document.querySelectorAll('.zt-heute').length,
  breit:document.body.scrollWidth}));
notiz.sprungOk=await p.evaluate(()=>[...document.querySelectorAll('.zt-sprung a')]
  .every(a=>!!document.querySelector(a.getAttribute('href'))));

/* Jedes Profil durchrechnen */
let minBaender=999, minGipfel=999, ohneJetzt=0;
const stufen=new Set(), kapitel=new Set();
for(let k=0;k<liste.length;k++){
  await p.evaluate(k=>{
    const bs=[...document.querySelectorAll('#ztpersonen button')]; bs[k%bs.length].click(); }, k);
  await p.waitForTimeout(220);
  const r=await p.evaluate(()=>({
    baender:document.querySelectorAll('.zt-band').length,
    karten:document.querySelectorAll('.zt-j').length,
    gipfel:document.querySelectorAll('#ztgipfel .zt-g').length,
    stufen:[...document.querySelectorAll('.zt-stufe')].map(x=>x.textContent),
    kapitel:[...document.querySelectorAll('.zt-j h3')].map(x=>x.textContent),
    breit:document.body.scrollWidth}));
  if(r.karten!==4) f.push('Profil '+k+': '+r.karten+' statt 4 Karten');
  if(r.baender<6) f.push('Profil '+k+': nur '+r.baender+' Bänder');
  if(!r.gipfel) ohneJetzt++;
  if(r.breit>390) f.push('Profil '+k+': Überlauf '+r.breit);
  r.stufen.forEach(s=>stufen.add(s)); r.kapitel.forEach(s=>kapitel.add(s));
  if(r.baender<minBaender) minBaender=r.baender;
  if(r.gipfel<minGipfel) minGipfel=r.gipfel;
  await schlecht('Profil '+k);
}
notiz.minBaender=minBaender; notiz.minGipfel=minGipfel; notiz.ohneGipfel=ohneJetzt;
notiz.stufen=[...stufen]; notiz.kapitelGesehen=kapitel.size;

/* Ein Band öffnen */
await p.evaluate(()=>{ document.querySelector('.zt-band')
  .dispatchEvent(new MouseEvent('click',{bubbles:true})); });
await p.waitForTimeout(260);
notiz.detail=await p.evaluate(()=>({
  da:!!document.querySelector('.zt-detail'),
  zeilen:document.querySelectorAll('#ztdetail tbody tr').length,
  laenge:(document.getElementById('ztdetail')||{}).innerText.length||0}));
if(!notiz.detail.da) f.push('Klick auf ein Band öffnet kein Detail');
if(notiz.detail.zeilen<3) f.push('Detail zeigt zu wenige Unterabschnitte');
await schlecht('Detail');

/* Stichtag verschieben — die Lage muss sich ändern */
const vor=await p.evaluate(()=>document.querySelector('#ztjetzt').innerText);
await p.evaluate(()=>{ const d=document.getElementById('ztdatum');
  d.value='1998-05-20'; d.dispatchEvent(new Event('change',{bubbles:true})); });
await p.waitForTimeout(400);
const nach=await p.evaluate(()=>document.querySelector('#ztjetzt').innerText);
notiz.stichtagWirkt=(vor!==nach);
if(!notiz.stichtagWirkt) f.push('der Stichtag ändert nichts');
await schlecht('Stichtag 1998');
await p.evaluate(()=>document.getElementById('ztheute').click());
await p.waitForTimeout(300);

/* Eros-Variante muss die Liebesspur verschieben */
const lv=await p.evaluate(()=>document.querySelectorAll('.zt-j')[1].innerText);
await p.evaluate(()=>{ const b=document.querySelector('#ztvariante button[data-v="alt"]');
  if(b) b.click(); });
await p.waitForTimeout(400);
const ln=await p.evaluate(()=>document.querySelectorAll('.zt-j')[1].innerText);
notiz.varianteWirkt=(lv!==ln);
await p.evaluate(()=>{ const b=document.querySelector('#ztvariante button[data-v="paulus"]');
  if(b) b.click(); });
await p.waitForTimeout(300);

/* Spur umschalten in der Tabelle */
await p.evaluate(()=>document.querySelector('#ztwelche button[data-w="liebe"]').click());
await p.waitForTimeout(240);
notiz.tabelleLiebe=await p.evaluate(()=>document.querySelectorAll('#zttabelle tbody tr').length);
if(notiz.tabelleLiebe<8) f.push('Tabelle für die Liebe hat nur '+notiz.tabelleLiebe+' Zeilen');

/* Bericht */
notiz.bericht=await p.evaluate(()=>typeof ztBericht==='function'?ztBericht():'');
notiz.berichtLaenge=notiz.bericht.length;
if(/undefined|NaN|&[a-z]+;|<[a-z]/.test(notiz.bericht))
  f.push('Bericht enthält Rohzeug: '+notiz.bericht.slice(0,200));
delete notiz.bericht;

/* Fünf Wissensstufen */
notiz.stufenTiefe=[];
for(let s=0;s<=4;s++){
  await p.evaluate(s=>AC_NIV.setzen(s), s); await p.waitForTimeout(170);
  const r=await p.evaluate(()=>{
    const sicht=e=>getComputedStyle(e).display!=='none'&&e.offsetParent!==null;
    return {tiefe:[...document.querySelectorAll('[data-ab]')].filter(sicht).length,
      text:document.body.innerText.length, breit:document.body.scrollWidth};});
  notiz.stufenTiefe.push(r.tiefe);
  if(r.breit>390) f.push('Stufe '+s+': Überlauf '+r.breit);
  if(r.text<4000) f.push('Stufe '+s+': nur '+r.text+' Zeichen');
}
await p.evaluate(()=>AC_NIV.setzen(2)); await p.waitForTimeout(150);

/* Breiten */
notiz.breiten=[];
for(const w of BREITEN){
  await p.setViewportSize({width:w,height:900}); await p.waitForTimeout(230);
  const r=await p.evaluate(()=>({scroll:document.body.scrollWidth,
    linie:!!document.querySelector('.zt-linie')}));
  notiz.breiten.push(w+':'+r.scroll);
  if(r.scroll>w+1) f.push('Breite '+w+': Inhalt '+r.scroll+' breit');
  if(!r.linie) f.push('Breite '+w+': keine Linie');
}
await p.setViewportSize({width:390,height:900});

/* Ohne Profil */
const p2=await (await b.newContext({viewport:{width:390,height:900}})).newPage();
const f2=[]; p2.on('pageerror',e=>f2.push(String(e.message).slice(0,140)));
await p2.goto('file://ZIEL'); await p2.waitForTimeout(800);
notiz.ohneProfil=await p2.evaluate(()=>({
  leer:document.querySelectorAll('.zt-leer').length,
  text:document.body.innerText.length}));
f2.forEach(x=>f.push('ohne Profil: '+x));
if(notiz.ohneProfil.text<3000) f.push('ohne Profil fast leere Seite');

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
    if n['karten'] != 4:   fehler.append(f'{n["karten"]} statt 4 Karten unter „Jetzt gerade"')
    if n['baender'] < 8:   fehler.append(f'nur {n["baender"]} Bänder auf der Linie')
    if n['heute'] != 1:    fehler.append('die Stichtagslinie fehlt')
    if n['legende'] != 4:  fehler.append(f'{n["legende"]} statt 4 Einträge in der Legende')
    if not n['gipfel']:    fehler.append('keine Hochphasen gelistet')
    if n['tabelle'] < 20:  fehler.append(f'die Tabelle hat nur {n["tabelle"]} Zeilen')
    if not s['sprungOk']:  fehler.append('eine Sprungmarke zeigt ins Leere')
    if s['ohneGipfel']:    fehler.append(f'{s["ohneGipfel"]} Profile ohne eine einzige Hochphase')
    if len(s['stufen']) < 3:
        fehler.append(f'nur {len(s["stufen"])} verschiedene Stufen über alle Profile: {s["stufen"]}')
    if s['kapitelGesehen'] < 6:
        fehler.append(f'nur {s["kapitelGesehen"]} verschiedene Kapitel über 20 Profile — '
                      'die Rechnung unterscheidet zu wenig')
    if not s['varianteWirkt']:
        fehler.append('die Eros-Variante ändert die Liebesspur nicht')
    if s['berichtLaenge'] < 1500:
        fehler.append(f'der Bericht ist nur {s["berichtLaenge"]} Zeichen lang')
    tiefe = s['stufenTiefe']
    if tiefe[0] != 0:
        fehler.append(f'auf Stufe 0 sind Zusatzangaben sichtbar: {tiefe}')
    if tiefe[4] <= tiefe[0]:
        fehler.append(f'die Wissensstufe ändert nichts: {tiefe}')

    print('  Rauchprobe: 20 Profile, %d–… Bänder, %d–… Hochphasen je Profil, '
          '%d verschiedene Kapitel, Bericht %d Zeichen'
          % (s['minBaender'], s['minGipfel'], s['kapitelGesehen'], s['berichtLaenge']))
    print('    Stufen gesehen: %s' % ', '.join(s['stufen']))
    print('    Zusatzangaben je Wissensstufe 0–4: %s' % tiefe)
    print('    Breiten: %s' % ', '.join(s['breiten']))

print(f'zeiten.html  {ziel.stat().st_size:,} Bytes  →  {ziel}')
print('  12 Kapitel × 2 Spuren, 12 Profektionshäuser, 9 Firdaria-Herren')
for h in hinweise:
    print('  Hinweis: ' + h)
for f in fehler:
    print('  FEHLER: ' + f)
sys.exit(1 if fehler else 0)
