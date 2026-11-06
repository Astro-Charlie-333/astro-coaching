#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut mond.html — Schritt 4 aus ENTWURF-NEUE-SEITE.md, erster Teil.

Drei Seiten werden eine: lunationen.html, mondzyklen.html und
mondphasen-rhythmus.html. Die alten Adressen bleiben als Weiterleitung
stehen, damit kein Lesezeichen ins Leere führt.

Beim Zusammenlegen kamen drei Fehler heraus, die live waren:

  1. Die beiden Terminlisten widersprachen sich. mondzyklen.html hatte
     die Mondfinsternis am 28.08.2026 auf 5°48' Fische, lunationen.html
     auf 4°54'. Nachgerechnet stimmt 4°54'. Ab jetzt gibt es eine Liste
     (mond-termine.js), erzeugt von gen-termine.py.
  2. lunationen.html zeigte im Winter jede Uhrzeit eine Stunde zu spät.
     Die Liste rechnete das ganze Jahr mit Sommerzeit.
  3. Zur Wirkungsdauer eines Neumonds stand auf der einen Seite „rund
     vier Wochen", auf der anderen „etwa zwei Wochen". Jetzt steht einmal
     da: bis zum Vollmond, rund zwei Wochen.

Dazu: Die drei Seiten hatten zwei eigene Himmelsrechnungen. Gerechnet
wird jetzt gegen rituale/engine.js, wie überall.
"""
import pathlib, re, sys, subprocess, json, datetime

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit = hier.parent / 'rituale'


def lies(p):
    return p.read_text(encoding='utf-8')


koerper = lies(hier / 'mond-koerper.html')
app = lies(hier / 'mond-app.js')
texte = lies(hier / 'mond-texte.js')
termine = lies(hier / 'mond-termine.js')
stil = lies(hier / 'mond-stil.css')
engine = lies(rit / 'engine.js')

SKRIPTE = ['profil.js', 'begriffe.js', 'niveau.js', 'wortwahl.js']

kopf = ('<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        '<title>Der Mond im Takt &middot; Neumond, Vollmond, Finsternisse &middot; Astro-Charlie</title>\n'
        '<meta name="description" content="Wo der Mond gerade steht, wann die nächsten Neu- und Vollmonde und Finsternisse kommen und welche davon dich betreffen.">\n'
        '<link rel="preconnect" href="https://fonts.googleapis.com">'
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
        '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">\n'
        # profil.js ohne defer: Die Seite liest AC_P beim Aufbau.
        + '\n'.join(f'<script src="{s}"{"" if s == "profil.js" else " defer"}></script>'
                    for s in SKRIPTE) + '\n<style>\n')

html = (kopf + lies(rit / 'basis.css') + '\n' + stil + '</style>\n</head><body>\n'
        + koerper + '\n<script>\n' + engine + '\n' + termine + '\n' + texte + '\n'
        + app + '\n</script>\n</body></html>\n')
html = html.replace('<head>', '<head>' + lies(hier.parent / 'app' / 'app-kopf.html'), 1)
ziel = wiki / 'mond.html'
ziel.write_text(html, encoding='utf-8')

fehler, hinweise = [], []

# ── Die alten Adressen leiten weiter ─────────────────────────
# Gebaut, nicht von Hand: Eine Weiterleitung ist auch eine Seite, und
# eine Seite ohne Quelle veraltet unbemerkt.
WEITER = {'lunationen.html': ('termine', 'Neumonde, Vollmonde und Finsternisse'),
          'mondzyklen.html': ('termine', 'Der Mondkalender'),
          'mondphasen-rhythmus.html': ('zyklus', 'Die Mondphasen als Rhythmus')}
for alt, (anker, titel) in WEITER.items():
    (wiki / alt).write_text(
        '<!DOCTYPE html><html lang="de"><head>' + lies(hier.parent / 'app' / 'app-kopf.html')
        + '<meta charset="UTF-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        f'<title>{titel} &middot; jetzt auf der Mondseite</title>\n'
        f'<link rel="canonical" href="mond.html#{anker}">\n'
        f'<meta http-equiv="refresh" content="0; url=mond.html#{anker}">\n'
        '<meta name="robots" content="noindex">\n'
        '</head><body style="font-family:system-ui,sans-serif;padding:40px 20px;max-width:560px;margin:0 auto">\n'
        f'<p>{titel} steht jetzt auf der <a href="mond.html#{anker}">Mondseite</a>.</p>\n'
        '</body></html>\n', encoding='utf-8')

# ── 1 · IDs und Tags ─────────────────────────────────────────
ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
if gesucht - ids:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(gesucht - ids)))
if re.search(r'\bid(?!=)\s', koerper):
    fehler.append('ein id-Attribut ohne Wert im Körper')
for tag in ('div', 'section', 'nav', 'table', 'svg', 'ol', 'p'):
    a, z = len(re.findall(r'<' + tag + r'\b', koerper)), len(re.findall(r'</' + tag + '>', koerper))
    if a != z:
        fehler.append(f'{a} <{tag}> gegen {z} </{tag}> im Körper')

# ── 2 · Eine Himmelsrechnung ─────────────────────────────────
for verraeter, was in [('0.38709927', 'Bahnelemente'), ('function sunLon', 'eine eigene sunLon'),
                       ('function moonLon', 'eine eigene moonLon'), ('function angles', 'eine eigene angles'),
                       ('function placidus', 'eine eigene Häuserrechnung')]:
    for name, t in [('mond-app.js', app), ('mond-texte.js', texte)]:
        if verraeter in t:
            fehler.append(f'{name} enthält wieder {was}')
oben = lambda s: set(re.findall(r'^(?:var|function)\s+([A-Za-z_]\w*)', s, re.M))
koll = (oben(texte) | oben(termine)) & oben(engine)
if koll:
    fehler.append('Namen kollidieren mit engine.js: ' + ', '.join(sorted(koll)))

# ── 3 · Die Texte sind vollständig ───────────────────────────
probe_t = r'''
const fs=require('fs'); global.window={};
eval(fs.readFileSync(process.argv[2],'utf8')); eval(fs.readFileSync(process.argv[3],'utf8'));
eval(fs.readFileSync(process.argv[4],'utf8'));
const f=[];
const lang=(o,k,n,wo)=>{ if(typeof o[k]!=='string'||o[k].trim().length<n) f.push(wo+': '+k+' fehlt oder ist zu kurz'); };
if(MT_TYP.length!==4) f.push(MT_TYP.length+' statt 4 Arten');
MT_TYP.forEach(t=>['alltag','tech','fenster','tun','zugross'].forEach(k=>lang(t,k,20,t.k)));
if(MT_ZEICHEN.length!==12) f.push('nicht 12 Zeichen');
MT_ZEICHEN.forEach(z=>MT_TYP.forEach(t=>{ if(!z.art||!z.art[t.k]||z.art[t.k].length<20) f.push(z.n+': Text für '+t.k+' fehlt'); }));
if(MT_HAUS.length!==12) f.push('nicht 12 Häuser');
MT_HAUS.forEach(h=>{ ['t','lang','kurz','frage'].forEach(k=>lang(h,k,4,h.n+'. Haus'));
  MT_TYP.forEach(t=>{ if(!h.art[t.k]||h.art[t.k].length<20) f.push(h.n+'. Haus: Text für '+t.k+' fehlt'); }); });
if(MT_PHASEN.length!==8) f.push('nicht 8 Phasen');
MT_PHASEN.forEach((p,i)=>{ if(p.a!==i*45) f.push(p.n+': beginnt nicht bei '+(i*45)+'°');
  ['n','s','t','tun','geb','frage'].forEach(k=>lang(p,k,3,p.n)); });
Object.keys(MT_ORB).forEach(k=>{ if(!MT_PUNKT[k]) f.push('kein Satz für den Punkt '+k);
  if(!MT_PRAX[k]||MT_PRAX[k].length!==2) f.push('keine zwei Praxissätze für '+k); });
['NM','VM','NMe','VMe'].forEach(k=>{ if(!MT_DTYP[k]) f.push('kein Typsatz '+k); });

/* Die Termine gegen die eigene Rechnung halten. Die Liste kommt aus
   der Swiss Ephemeris, engine.js rechnet nach Meeus. Stimmen beide auf
   ein halbes Grad, ist weder die Liste verrutscht noch die Uhrzeit. */
const T=MT_TERMINE;
if(T.length<100) f.push('nur '+T.length+' Termine');
const utc=t=>{ const [y,m,d]=t.d.split('-').map(Number),[h,mi]=t.z.split(':').map(Number);
  const ls=(yy,mm)=>{ const x=new Date(Date.UTC(yy,mm,0,1)); x.setUTCDate(x.getUTCDate()-x.getUTCDay()); return x; };
  let u=Date.UTC(y,m-1,d,h,mi)-3600000; const so=ls(y,3),wi=ls(y,10);
  if(u-3600000>=so.getTime()&&u-3600000<wi.getTime()) u-=3600000; return u; };
let vor=null;
T.forEach(t=>{
  if(!/^\d{4}-\d\d-\d\d$/.test(t.d)||!/^\d\d:\d\d$/.test(t.z)) f.push('Format: '+JSON.stringify(t));
  if(!(t.g>=0&&t.g<360)) f.push('Grad außerhalb: '+t.d);
  if(['','total','partiell','ringförmig','hybrid','Halbschatten'].indexOf(t.e)<0) f.push('unbekannte Finsternisart '+t.e);
  const jd=utc(t)/86400000+2440587.5, TT=(jd-2451545)/36525;
  const el=nrm(moonLon(TT)-sunLon(TT)), soll=t.t==='NM'?0:180, ab=Math.abs(((el-soll)%360+540)%360-180);
  if(ab>0.6) f.push(t.d+' '+t.t+': Sonne und Mond stehen zur angegebenen Zeit '+ab.toFixed(2)+'° daneben');
  const gm=Math.abs(((moonLon(TT)-t.g)%360+540)%360-180);
  if(gm>0.6) f.push(t.d+' '+t.t+': Grad weicht '+gm.toFixed(2)+'° von der Rechnung ab');
  if(vor){ const tage=(utc(t)-utc(vor))/86400000;
    if(vor.t===t.t||tage<13||tage>16.5) f.push('Lücke oder Doppelung zwischen '+vor.d+' und '+t.d); }
  vor=t; });
/* Feste Beispiele (Abschnitt 6e): bekannte Finsternisse */
[['2026-08-12','NM','total'],['2026-08-28','VM','partiell'],['2027-08-02','NM','total'],['2028-12-31','VM','total']]
 .forEach(([d,t,e])=>{ const x=T.find(y=>y.d===d&&y.t===t); if(!x||x.e!==e) f.push('Finsternis fehlt oder falsch: '+d); });
const erst=new Date(MT_ERSTELLT+'T12:00:00Z'), letzt=new Date(T[T.length-1].d+'T12:00:00Z');
if((letzt-erst)/86400000/365.25<3) f.push('die Termine reichen nicht drei Jahre über ihr Erstellungsdatum hinaus');
console.log(JSON.stringify({fehler:f, n:T.length, fins:T.filter(t=>t.e).length}));
'''
pt = hier / '.probe-mond-texte.js'
pt.write_text(probe_t, encoding='utf-8')
try:
    r = subprocess.run(['node', str(pt), str(rit / 'engine.js'), str(hier / 'mond-termine.js'),
                        str(hier / 'mond-texte.js')], capture_output=True, text=True, timeout=60)
    if r.returncode != 0:
        fehler.append('Textprüfung gescheitert: ' + (r.stderr or '')[-300:])
    else:
        e = json.loads(r.stdout.strip().splitlines()[-1])
        fehler.extend(e['fehler'])
        hinweise.append(f"{e['n']} Termine, davon {e['fins']} Finsternisse, gegen engine.js gehalten")
finally:
    pt.unlink(missing_ok=True)

# ── 4 · Was die alten Seiten falsch hatten, bleibt weg ───────
# Die Dauer eines Neumonds stand zweimal verschieden da. Eine Form,
# kein Textstück: „wirkt … vier Wochen" in einem Neumond-Satz.
if re.search(r'Neumond[^.]{0,120}wirkt[^.]{0,40}vier Wochen', texte + koerper, re.I):
    fehler.append('ein Neumond „wirkt vier Wochen" — es sind zwei, bis zum Vollmond')
for wort in ('vermeide', 'bloß nicht', 'gefährlich'):
    for name, t in [('mond-texte.js', texte), ('mond-koerper.html', koerper)]:
        if wort in t.lower():
            fehler.append(f'„{wort}" in {name} — Angst ist kein Werkzeug (REGELN 2a)')

# ── 5 · Keine echten Geburtsdaten ────────────────────────────
for name, t in [('mond-app.js', app), ('mond-texte.js', texte), ('mond-koerper.html', koerper)]:
    if re.search(r'\b1987\b', t) or re.search(r'\b08:58\b', t):
        fehler.append(f'{name}: sieht nach echten Geburtsdaten aus')

# ── Die Rauchprobe ───────────────────────────────────────────
probe = r'''
const {chromium}=require('playwright');
(async()=>{
const f=[];
const b=await chromium.launch();
const MECHANIK=['Konjunktion','Quadrat','Trigon','Sextil','Orbis','Transit','Aszendent','Whole',
 'Radix','Ekliptik','applikativ','separativ','Haus','Häuser','Mondknoten','Solar Return'];
const ZEICHEN=['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische'];
const wort=(t,x)=>new RegExp('(?<![A-Za-zÄÖÜäöüß])'+x+'(?![A-Za-zÄÖÜäöüß])').test(t);

/* A · ohne Profil */
const c1=await b.newContext({viewport:{width:390,height:844}});
const p=await c1.newPage();
p.on('pageerror',e=>f.push('Skriptfehler ohne Profil: '+String(e.message).slice(0,160)));
await p.goto('file://ZIEL'); await p.waitForTimeout(800);
const a=await p.evaluate(()=>({
  name:document.getElementById('mojetztname').textContent,
  naechste:document.querySelectorAll('#monaechste > div').length,
  phasen:document.querySelectorAll('#morad g[role=button]').length,
  karten:document.querySelectorAll('#moliste .mo-termin').length,
  profil:document.getElementById('moprofil').textContent,
  arten:document.querySelectorAll('#moarten .mo-art').length,
  stand:document.getElementById('mostand').textContent}));
if(!a.name||a.name==='—') f.push('„Gerade jetzt" zeigt keine Phase');
if(a.naechste!==3) f.push(a.naechste+' statt 3 nächste Termine');
if(a.phasen!==8) f.push(a.phasen+' statt 8 Phasen im Rad');
if(a.karten!==4) f.push(a.karten+' statt 4 Termine ohne Profil');
if(!/Profile/.test(a.profil)) f.push('ohne Profil fehlt der Hinweis auf Profile');
if(a.arten!==4) f.push(a.arten+' statt 4 Arten');
if(!/reichen bis/.test(a.stand)) f.push('der Stand der Termine fehlt');

/* Eine Phase antippen ändert die Erklärung */
const vorher=await p.evaluate(()=>document.getElementById('mophasename').textContent);
await p.evaluate(()=>{ const g=document.querySelectorAll('#morad g[role=button]'); g[(g.length+3)%8].dispatchEvent(new MouseEvent('click',{bubbles:true})); });
await p.waitForTimeout(150);
const nach=await p.evaluate(()=>document.getElementById('mophasename').textContent);
const g2=await p.evaluate(()=>{ const g=document.querySelectorAll('#morad g[role=button]'); return g[3].getAttribute('aria-pressed'); });
if(vorher===nach&&!/Verfeinern/.test(nach)) f.push('ein Klick auf eine Phase ändert nichts');
if(g2!=='true') f.push('die angetippte Phase ist nicht markiert');

/* Geburtsdatum ohne Profil */
await p.fill('#mogd','1980-07-15'); await p.waitForTimeout(150);
const gb=await p.evaluate(()=>document.getElementById('mogebname').textContent);
if(!/Geboren bei/.test(gb)) f.push('die Geburtsmondphase rechnet nicht aus dem Datum');

/* Stufe 0: keine Mechanik, kein Zeichen, kein Grad */
await p.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(0); }); await p.waitForTimeout(300);
const t0=await p.evaluate(()=>document.body.innerText);
const m0=MECHANIK.filter(x=>wort(t0,x)), z0=ZEICHEN.filter(x=>wort(t0,x));
if(m0.length) f.push('Fachsprache auf Stufe 0: '+m0.join(', '));
if(z0.length) f.push('Tierkreiszeichen auf Stufe 0: '+z0.join(', '));
if(/\d°/.test(t0)) f.push('Gradzahlen auf Stufe 0');
const tech0=await p.evaluate(()=>[...document.querySelectorAll('.ac-tech')].filter(e=>e.checkVisibility()).length);
if(tech0) f.push(tech0+' Mechanik-Elemente auf Stufe 0 sichtbar');
/* Jeder Name wird auf seiner Karte erklärt, bevor etwas über Wirkung steht */
const kart=await p.evaluate(()=>[...document.querySelectorAll('#moarten .mo-art')].map(k=>({
  h:k.querySelector('h3').textContent, erst:k.querySelectorAll('p')[0].textContent,
  zu:/zu groß erzählt/.test(k.textContent)})));
kart.forEach(k=>{ if(k.erst.length<40) f.push(k.h+': keine Erklärung vor der Wirkung');
  if(!k.zu) f.push(k.h+': „Was oft zu groß erzählt wird" fehlt'); });

/* Stufe 2: die Tabelle, mit Aszendent */
await p.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(2); }); await p.waitForTimeout(300);
const s2=await p.evaluate(()=>({zeilen:document.querySelectorAll('#motab tr').length,
  asc:!document.getElementById('moascbox').hidden,
  sichtbar:document.getElementById('motech').checkVisibility()}));
if(!s2.sichtbar) f.push('die Tabelle erscheint auf Stufe 2 nicht');
if(s2.zeilen<20) f.push('nur '+s2.zeilen+' Zeilen in der Tabelle');
if(!s2.asc) f.push('ohne Profil fehlt die Wahl des Aszendenten');
await p.selectOption('#moasc','3'); await p.waitForTimeout(150);
const hk=await p.evaluate(()=>document.querySelector('#motab tr').textContent);
if(!/Haus/.test(hk)) f.push('nach der Wahl des Aszendenten erscheint keine Hausspalte');
const k1=await p.evaluate(()=>document.getElementById('moktext').textContent);
await p.selectOption('#mokzeichen','7'); await p.waitForTimeout(100);
const k2=await p.evaluate(()=>document.getElementById('moktext').textContent);
if(k1===k2) f.push('die Kombination ändert sich nicht');
if(!/Skorpion/.test(k2)) f.push('die Kombination zeigt das gewählte Zeichen nicht');

const ueber=async(pg,wo)=>{ const r=await pg.evaluate(()=>{const w=document.documentElement.clientWidth; const r=[];
  document.querySelectorAll('body *').forEach(e=>{ if(e.closest('.mo-tabbox,.mo-rad-box')) return;
    const bb=e.getBoundingClientRect(); if(bb.width>0&&(bb.right>w+1.5||bb.left<-1.5)) r.push((e.className&&e.className.baseVal===undefined?e.className:e.tagName)+' '+Math.round(bb.right)); });
  return {r:r.slice(0,4),sw:document.documentElement.scrollWidth,w}; });
  if(r.r.length||r.sw>r.w+1) f.push(wo+': läuft auf 390px über: '+r.r.join(' | '));};
await ueber(p,'ohne Profil');

/* B · mit erfundenem Profil */
const c2=await b.newContext({viewport:{width:390,height:844}});
await c2.addInitScript(()=>{ localStorage.setItem('ac_profile_v1',JSON.stringify({v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:[
  {id:'p1',name:'Probe Mond',alias:'',y:1980,mo:7,d:15,h:14,mi:20,tz:1,lat:52.52,lon:13.405,ort:'Berlin',
   wlat:52.52,wlon:13.405,wort:'Berlin',eigen:true,readings:[]}]})); });
const q=await c2.newPage();
q.on('pageerror',e=>f.push('Skriptfehler mit Profil: '+String(e.message).slice(0,160)));
await q.goto('file://ZIEL'); await q.waitForTimeout(900);
const bq=await q.evaluate(()=>({profil:document.getElementById('moprofil').textContent,
  karten:document.querySelectorAll('#moliste .mo-termin').length,
  leer:!!document.querySelector('#moliste .mo-leer'),
  treffer:document.querySelectorAll('#moliste .mo-chip.treffer').length,
  geb:document.getElementById('mogebquelle').textContent,
  form:document.getElementById('mogebform').hidden}));
if(!/Probe Mond/.test(bq.profil)) f.push('das aktive Profil wird nicht genannt');
if(!bq.karten&&!bq.leer) f.push('mit Profil steht weder ein Termin noch der Hinweis, dass keiner trifft');
if(bq.karten&&bq.treffer<bq.karten) f.push('ein Termin in der Liste nennt nicht, was er trifft');
if(!/Profil/.test(bq.geb)||!bq.form) f.push('die Geburtsmondphase kommt nicht aus dem Profil');
await q.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(0); }); await q.waitForTimeout(300);
const tq=await q.evaluate(()=>document.body.innerText);
const mq=MECHANIK.filter(x=>wort(tq,x)).concat(ZEICHEN.filter(x=>wort(tq,x)));
if(mq.length) f.push('mit Profil auf Stufe 0: '+mq.join(', '));
await q.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(2); }); await q.waitForTimeout(300);
const th=await q.evaluate(()=>document.querySelector('#motab tr').textContent);
/* hidden allein reicht nicht: Eine Regel mit display schlägt das
   Attribut. Gemessen wird, ob man es sieht. */
const sicht=await q.evaluate(()=>({asc:document.getElementById('moascbox').checkVisibility(),
  form:document.getElementById('mogebform').checkVisibility()}));
if(sicht.asc) f.push('mit Profil steht trotzdem „Ohne Profil: Dein Aszendent" da');
if(sicht.form) f.push('mit Profil steht trotzdem das Formular fürs Geburtsdatum da');
if(!/Treffer/.test(th)) f.push('mit Profil fehlt die Trefferspalte');
await q.evaluate(()=>{ const r=document.querySelector('#motab tr.klick'); if(r) r.click(); }); await q.waitForTimeout(200);
const det=await q.evaluate(()=>(document.querySelector('#motab tr.detail')||{}).textContent||'');
if(det.length<80) f.push('ein Klick auf einen Termin klappt keine Erklärung auf');
await ueber(q,'mit Profil');
console.log(JSON.stringify({fehler:f}));
await b.close();})();
'''
pp = hier / '.probe-mond.js'
pp.write_text(probe.replace('ZIEL', str(ziel)), encoding='utf-8')
try:
    r = subprocess.run(['node', str(pp)], capture_output=True, text=True, timeout=160)
    if r.returncode != 0:
        fehler.append('Rauchprobe gescheitert: ' + (r.stderr or '')[-400:])
    else:
        fehler.extend(json.loads(r.stdout.strip().splitlines()[-1])['fehler'])
except Exception as e:
    fehler.append('Rauchprobe nicht gelaufen: ' + str(e)[:200])
finally:
    pp.unlink(missing_ok=True)

for h in hinweise:
    print('      Hinweis: ' + h)
if fehler:
    for f in fehler:
        print('      FEHLER: ' + f)
    sys.exit(1)
print(f'      mond.html: {len(html)//1024} KB, drei alte Adressen leiten weiter')
