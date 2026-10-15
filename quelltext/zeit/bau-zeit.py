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
const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const liste=[]; let i=0;
for(const y of [1952,1966,1974,1988,1999]) for(const h of [2,9,15,21]){
  i++; liste.push({id:'p'+i,name:'Probe '+i,alias:'P'+i,y,mo:1+((i*5)%12),d:3+((i*7)%25),
   h, mi:(i*11)%60, tz:1, lat:52.52, lon:13.405, ort:'Berlin',
   wlat:52.52, wlon:13.405, wort:'Berlin', eigen:i===1, readings:[]});
}
const BREITEN=[320,360,390,600,768,1024,1440,1600];
/* Wörter, die eine Anfängerin ohne Erklärung nicht verstehen kann.
   Auf Stufe 0 darf keines davon sichtbar sein. */
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
  antwort:!!document.querySelector('.zt-antwort'),
  gross:(document.querySelector('.zt-agross')||{}).textContent||'',
  naechste:document.querySelectorAll('.zt-anext').length,
  mini:document.querySelectorAll('.zt-amini .zt-m').length,
  schritte:document.querySelectorAll('.zt-schritt').length,
  bilder:document.querySelectorAll('.zt-mini-svg').length,
  bereiche:document.querySelectorAll('.zt-b').length,
  baender:document.querySelectorAll('.zt-band').length,
  zeilen:document.querySelectorAll('.zt-zeile').length,
  legende:document.querySelectorAll('.zt-legende span').length,
  gipfel:document.querySelectorAll('#ztgipfel .zt-g').length,
  tabelle:document.querySelectorAll('#zttabelle tbody tr').length,
  weitere:document.querySelectorAll('#ztweitere .zt-j').length,
  woerter:document.querySelectorAll('.zt-w').length,
  breit:document.body.scrollWidth}));

/* Ein erklärbares Wort muss sich wirklich öffnen */
notiz.wortAuf=await p.evaluate(()=>{
  const b=document.querySelector('.zt-w'); if(!b) return null;
  const e=document.getElementById(b.getAttribute('aria-controls'));
  const vorher=e.hasAttribute('hidden');
  b.click();
  const nachher=e.hasAttribute('hidden');
  const txt=e.textContent.length;
  b.click();
  return {vorher, nachher, txt};
});
if(!notiz.wortAuf||!notiz.wortAuf.vorher||notiz.wortAuf.nachher)
  f.push('ein erklärbares Wort öffnet sich nicht');
if(notiz.wortAuf&&notiz.wortAuf.txt<40) f.push('die Worterklärung ist zu kurz');

/* Alle fünf Bereiche durchschalten */
const bereiche=await p.evaluate(()=>[...document.querySelectorAll('.zt-b')].map(b=>b.dataset.b));
notiz.bereiche=bereiche; const antworten=new Set(); let minB=999;
for(const bk of bereiche){
  await p.evaluate(bk=>document.querySelector('.zt-b[data-b="'+bk+'"]').click(), bk);
  await p.waitForTimeout(240);
  const r=await p.evaluate(()=>({
    gross:(document.querySelector('.zt-agross')||{}).textContent||'',
    text:(document.querySelector('.zt-antwort')||{}).innerText||'',
    baender:document.querySelectorAll('.zt-band').length,
    gipfel:document.querySelectorAll('#ztgipfel .zt-g').length,
    breit:document.body.scrollWidth}));
  antworten.add(r.text.slice(0,400));
  if(r.baender<6) f.push('Bereich '+bk+': nur '+r.baender+' Bänder');
  if(r.breit>390) f.push('Bereich '+bk+': Überlauf '+r.breit);
  if(r.baender<minB) minB=r.baender;
  await schlecht('Bereich '+bk);
}
notiz.bereichWirkt=antworten.size;
if(antworten.size<3) f.push('die Bereiche zeigen fast dasselbe ('+antworten.size+' verschieden)');
await p.evaluate(()=>document.querySelector('.zt-b[data-b="arbeit"]').click());
await p.waitForTimeout(220);

/* Alle Profile */
let ohneAntwort=0; const stufen=new Set();
for(let k=0;k<liste.length;k++){
  await p.evaluate(k=>{const bs=[...document.querySelectorAll('#ztpersonen button')];
    bs[k%bs.length].click(); }, k);
  await p.waitForTimeout(200);
  const r=await p.evaluate(()=>({
    gross:(document.querySelector('.zt-agross')||{}).textContent||'',
    mini:document.querySelectorAll('.zt-amini .zt-m').length,
    breit:document.body.scrollWidth}));
  if(!r.gross) ohneAntwort++; else stufen.add(r.gross);
  if(r.mini!==5) f.push('Profil '+k+': '+r.mini+' statt 5 Bereiche in der Zeile');
  if(r.breit>390) f.push('Profil '+k+': Überlauf '+r.breit);
  await schlecht('Profil '+k);
}
notiz.ohneAntwort=ohneAntwort; notiz.stufen=[...stufen];
if(ohneAntwort) f.push(ohneAntwort+' Profile ohne Antwort');
if(stufen.size<2) f.push('alle Profile bekommen dieselbe Antwort');

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

/* Übersicht: eine Zeile anklicken wechselt den Bereich */
const vorB=await p.evaluate(()=>document.querySelector('.zt-b.ist').dataset.b);
await p.evaluate(()=>{ const z=[...document.querySelectorAll('.zt-zeile')];
  z[z.length-1].dispatchEvent(new MouseEvent('click',{bubbles:true})); });
await p.waitForTimeout(280);
const nachB=await p.evaluate(()=>document.querySelector('.zt-b.ist').dataset.b);
notiz.uebersichtWirkt=(vorB!==nachB);
if(!notiz.uebersichtWirkt) f.push('die Übersicht wechselt den Bereich nicht');

/* Stichtag — auf das erste Profil, damit das Datum sicher nach der Geburt liegt */
await p.evaluate(()=>document.querySelectorAll('#ztpersonen button')[0].click());
await p.waitForTimeout(240);
const vor=await p.evaluate(()=>document.getElementById('ztantwort').innerText);
async function stichtag(d){
  await p.evaluate(d=>{ const e=document.getElementById('ztdatum');
    e.value=d; e.dispatchEvent(new Event('change',{bubbles:true})); }, d);
  await p.waitForTimeout(380);
  return p.evaluate(()=>document.getElementById('ztantwort').innerText);
}
const nach=await stichtag('1998-05-20');
notiz.stichtagWirkt=(vor!==nach);
if(!notiz.stichtagWirkt) f.push('der Stichtag ändert nichts');
await schlecht('Stichtag 1998');

/* Vor der Geburt und weit danach müssen verständlich abgefangen sein */
notiz.vorGeburt=await stichtag('1900-01-01');
if(!/vor der Geburt/.test(notiz.vorGeburt))
  f.push('ein Stichtag vor der Geburt wird nicht verständlich abgefangen: '+
    notiz.vorGeburt.slice(0,120));
await schlecht('vor der Geburt');
notiz.weitDanach=await stichtag('2140-01-01');
if(!/Zukunft|vor der Geburt/.test(notiz.weitDanach))
  f.push('ein Stichtag weit in der Zukunft wird nicht abgefangen: '+
    notiz.weitDanach.slice(0,120));
await schlecht('weit in der Zukunft');
notiz.vorGeburt=notiz.vorGeburt.slice(0,60); notiz.weitDanach=notiz.weitDanach.slice(0,60);
await p.evaluate(()=>document.getElementById('ztheute').click());
await p.waitForTimeout(300);

/* Bericht */
notiz.bericht=await p.evaluate(()=>typeof ztBericht==='function'?ztBericht():'');
notiz.berichtLaenge=notiz.bericht.length;
if(/undefined|NaN|&[a-z]+;|<[a-z]|\[\[/.test(notiz.bericht))
  f.push('Bericht enthält Rohzeug: '+notiz.bericht.slice(0,200));
delete notiz.bericht;

/* Wissensstufen — und auf Stufe 0 kein Fachwort */
notiz.stufenTiefe=[]; notiz.jargon0=[];
for(let s=0;s<=4;s++){
  await p.evaluate(s=>AC_NIV.setzen(s), s); await p.waitForTimeout(200);
  const r=await p.evaluate(()=>{
    const sicht=e=>getComputedStyle(e).display!=='none'&&e.offsetParent!==null;
    return {tiefe:[...document.querySelectorAll('[data-ab]')].filter(sicht).length,
      text:document.body.innerText, breit:document.body.scrollWidth};});
  notiz.stufenTiefe.push(r.tiefe);
  if(s===0){
    JARGON.forEach(w=>{ if(r.text.indexOf(w)>=0) notiz.jargon0.push(w); });
    notiz.text0=r.text.length;
  }
  if(r.breit>390) f.push('Stufe '+s+': Überlauf '+r.breit);
  if(r.text.length<4000) f.push('Stufe '+s+': nur '+r.text.length+' Zeichen');
}
if(notiz.jargon0.length)
  f.push('auf Stufe 0 steht Fachsprache ohne Erklärung: '+notiz.jargon0.join(', '));
await p.evaluate(()=>AC_NIV.setzen(2)); await p.waitForTimeout(150);

/* Breiten */
notiz.breiten=[];
for(const w of BREITEN){
  await p.setViewportSize({width:w,height:900}); await p.waitForTimeout(230);
  const r=await p.evaluate(()=>({scroll:document.body.scrollWidth,
    linie:!!document.querySelector('.zt-linie'),
    antwort:!!document.querySelector('.zt-antwort')}));
  notiz.breiten.push(w+':'+r.scroll);
  if(r.scroll>w+1) f.push('Breite '+w+': Inhalt '+r.scroll+' breit');
  if(!r.linie||!r.antwort) f.push('Breite '+w+': Teile fehlen');
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
    if not n['antwort']:     fehler.append('oben steht keine Antwort')
    if not n['gross']:       fehler.append('die große Antwort ist leer')
    if not n['naechste']:    fehler.append('die nächste Hochphase wird nicht genannt')
    if n['mini'] != 5:       fehler.append(f'{n["mini"]} statt 5 Bereiche in der Kurzzeile')
    if n['schritte'] != 4:   fehler.append(f'{n["schritte"]} statt 4 Erklärschritte')
    if n['bilder'] < 4:      fehler.append(f'nur {n["bilder"]} Bilder in der Erklärung')
    if n['bereiche'] != 5:   fehler.append(f'{n["bereiche"]} statt 5 Bereiche zur Wahl')
    if n['zeilen'] != 5:     fehler.append(f'{n["zeilen"]} statt 5 Zeilen in der Übersicht')
    if n['legende'] != 4:    fehler.append(f'{n["legende"]} statt 4 Einträge in der Legende')
    if n['weitere'] != 2:    fehler.append('die zwei weiteren Verfahren fehlen')
    if n['woerter'] < 5:     fehler.append(f'nur {n["woerter"]} erklärbare Wörter auf der Seite')
    if n['tabelle'] < 20:    fehler.append(f'die Tabelle hat nur {n["tabelle"]} Zeilen')
    if s['berichtLaenge'] < 2000:
        fehler.append(f'der Bericht ist nur {s["berichtLaenge"]} Zeichen lang')
    tiefe = s['stufenTiefe']
    if tiefe[0] != 0:
        fehler.append(f'auf Stufe 0 sind Zusatzangaben sichtbar: {tiefe}')
    if tiefe[4] <= tiefe[1]:
        fehler.append(f'die Wissensstufe ändert zu wenig: {tiefe}')

    print('  Rauchprobe: 20 Profile, 5 Bereiche (%d verschiedene Antworten), '
          '%d Erklärschritte mit %d Bildern, %d erklärbare Wörter, Bericht %d Zeichen'
          % (s['bereichWirkt'], n['schritte'], n['bilder'], n['woerter'], s['berichtLaenge']))
    print('    Antworten über alle Profile: %s' % ', '.join(s['stufen']))
    print('    Stufe 0: %d Zeichen Text, Fachwörter darin: %s'
          % (s['text0'], s['jargon0'] or 'keine'))
    print('    Zusatzangaben je Stufe 0–4: %s' % tiefe)
    print('    Breiten: %s' % ', '.join(s['breiten']))
    print('    Stichtag vor der Geburt: „%s…"' % s['vorGeburt'].replace(chr(10), ' ')[:58])

print(f'zeiten.html  {ziel.stat().st_size:,} Bytes  →  {ziel}')
print('  12 Kapitel × 5 Bereiche = %d Texte, %d erklärte Wörter'
      % (12 * 5, len(woerter)))
for h in hinweise:
    print('  Hinweis: ' + h)
for f in fehler:
    print('  FEHLER: ' + f)
sys.exit(1 if fehler else 0)
