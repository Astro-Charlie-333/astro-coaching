#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut haeuser.html — Schritt 4 aus ENTWURF-NEUE-SEITE.md, zweiter Teil.

Vier Seiten werden eine: haeuser.html, haeuser-lebensbuehnen.html,
haus-achsen.html und haeusersysteme.html. Die Adresse haeuser.html
bleibt, die drei anderen leiten weiter. haeuser-karte.html bleibt eine
eigene gebaute Seite (karte/bau-karte.py): Sie ist ein Werkzeug mit
120 Kombinationen, kein Lesetext, und wird von hier aus verlinkt.

Beim Zusammenlegen kamen zwei Dinge heraus, die live waren:

  1. haus-achsen.html hieß „Deine Haus-Achsen" und stand unter
     „Dein Chart" mit einer festen Deutung eines einzelnen Geburtsbilds.
     Jede Besucherin las diese Deutung als ihre eigene. „Bei dir" wird
     jetzt aus dem aktiven Profil gerechnet; in den Quellen stehen nur
     Prinzipien. Prüfung 4 hält das fest.
  2. haeusersysteme.html rechnete ihr Beispiel aus einem echten
     Geburtsdatum mit verschobener Uhrzeit. Das Beispiel ist jetzt
     erfunden und wird beim Bauen gegen engine.js nachgerechnet.

Dazu: haeuser.html und haeuser-lebensbuehnen.html waren fast dieselbe
Seite mit zwölf Karten, einmal kürzer, einmal mit Frage.
"""
import pathlib, re, sys, subprocess, json

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit = hier.parent / 'rituale'


def lies(p):
    return p.read_text(encoding='utf-8')


koerper = lies(hier / 'haeuser-koerper.html')
app = lies(hier / 'haeuser-app.js')
daten = lies(hier / 'haeuser-daten.js')
stil = lies(hier / 'haeuser-stil.css')
engine = lies(rit / 'engine.js')
appkopf = lies(hier.parent / 'app' / 'app-kopf.html')

SKRIPTE = ['profil.js', 'begriffe.js', 'niveau.js', 'wortwahl.js']
html = ('<!DOCTYPE html><html lang="de"><head>' + appkopf + '<meta charset="UTF-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        '<title>Die 12 H&auml;user &middot; Lebensb&uuml;hnen, Achsen, Systeme &middot; Astro-Charlie</title>\n'
        '<meta name="description" content="Die zwölf Lebensbereiche mit ihrer Frage, die sechs Paare und wo bei dir viel los ist.">\n'
        '<link rel="preconnect" href="https://fonts.googleapis.com">'
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
        '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">\n'
        + '\n'.join(f'<script src="{s}"{"" if s == "profil.js" else " defer"}></script>' for s in SKRIPTE)
        + '\n<style>\n' + lies(rit / 'basis.css') + '\n' + stil + '</style>\n</head><body>\n'
        + koerper + '\n<script>\n' + engine + '\n' + daten + '\n' + app + '\n</script>\n</body></html>\n')
ziel = wiki / 'haeuser.html'
ziel.write_text(html, encoding='utf-8')

WEITER = {'haeuser-lebensbuehnen.html': ('buehnen', 'Die 12 Lebensbühnen'),
          'haus-achsen.html': ('achsen', 'Die Haus-Achsen'),
          'haeusersysteme.html': ('systeme', 'Whole Sign oder Placidus?')}
for alt, (anker, titel) in WEITER.items():
    (wiki / alt).write_text(
        '<!DOCTYPE html><html lang="de"><head>' + appkopf + '<meta charset="UTF-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        f'<title>{titel} &middot; jetzt auf der H&auml;userseite</title>\n'
        f'<link rel="canonical" href="haeuser.html#{anker}">\n'
        f'<meta http-equiv="refresh" content="0; url=haeuser.html#{anker}">\n'
        '<meta name="robots" content="noindex">\n'
        '</head><body style="font-family:system-ui,sans-serif;padding:40px 20px;max-width:560px;margin:0 auto">\n'
        f'<p>{titel} steht jetzt auf der <a href="haeuser.html#{anker}">H&auml;userseite</a>.</p>\n'
        '</body></html>\n', encoding='utf-8')

fehler, hinweise = [], []

# ── 1 · IDs und Tags ─────────────────────────────────────────
ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
if gesucht - ids:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(gesucht - ids)))
for anker in re.findall(r'href="#([a-z0-9-]+)"', koerper):
    if anker not in ids:
        fehler.append('Sprungmarke ins Leere: #' + anker)
for anker, _ in WEITER.values():
    if anker not in ids:
        fehler.append('eine Weiterleitung zeigt auf #' + anker + ', das es nicht gibt')
for tag in ('div', 'section', 'nav', 'table', 'svg', 'ol', 'ul', 'p'):
    a, z = len(re.findall(r'<' + tag + r'\b', koerper)), len(re.findall(r'</' + tag + '>', koerper))
    if a != z:
        fehler.append(f'{a} <{tag}> gegen {z} </{tag}> im Körper')

# ── 2 · Eine Himmelsrechnung ─────────────────────────────────
for verraeter, was in [('0.38709927', 'Bahnelemente'), ('function sunLon', 'eine eigene sunLon'),
                       ('function angles', 'eine eigene angles'), ('function placidus', 'eine eigene Häuserrechnung')]:
    for name, t in [('haeuser-app.js', app), ('haeuser-daten.js', daten)]:
        if verraeter in t:
            fehler.append(f'{name} enthält wieder {was}')
oben = lambda s: set(re.findall(r'^(?:var|function)\s+([A-Za-z_]\w*)', s, re.M))
koll = oben(daten) & oben(engine)
if koll:
    fehler.append('Namen kollidieren mit engine.js: ' + ', '.join(sorted(koll)))

# ── 3 · Daten vollständig, Beispiel nachgerechnet ────────────
probe_d = r'''
const fs=require('fs'); global.window={};
eval(fs.readFileSync(process.argv[2],'utf8')); eval(fs.readFileSync(process.argv[3],'utf8'));
const f=[];
if(HZ_HAUS.length!==12) f.push(HZ_HAUS.length+' statt 12 Bereiche');
HZ_HAUS.forEach((h,i)=>{ ['name','titel','was','stich','frage'].forEach(k=>{ if(!h[k]||h[k].length<3) f.push((i+1)+': '+k+' fehlt'); });
  if(!/\?$/.test(h.frage)) f.push((i+1)+': die Frage endet nicht mit Fragezeichen'); });
const ecken={0:'Aszendent',3:'IC',6:'Deszendent',9:'MC'};
HZ_HAUS.forEach((h,i)=>{ if((ecken[i]||'')!==h.ecke) f.push((i+1)+': falsche Ecke „'+h.ecke+'"'); });
if(HZ_ACHSEN.length!==6) f.push(HZ_ACHSEN.length+' statt 6 Achsen');
const gesehen=new Set();
HZ_ACHSEN.forEach(x=>{ if(x.b!==x.a+6) f.push(x.name+': '+(x.a+1)+' und '+(x.b+1)+' liegen sich nicht gegenüber');
  gesehen.add(x.a); gesehen.add(x.b);
  ['zuvielA','zuvielB'].forEach(k=>{ if(!x[k]||x[k].length<40) f.push(x.name+': '+k+' fehlt'); }); });
if(gesehen.size!==12) f.push('die Achsen decken nicht alle zwölf Bereiche ab');
HZ_QUIZ.forEach(q=>{ if(!(q.r>=0&&q.r<q.o.length)) f.push('Quiz: Lösung zeigt ins Leere'); });
/* Das Beispiel: Whole Sign und Placidus nachrechnen */
const b=HZ_BEISPIEL, C=chartVon(b.p);
const ut=b.p.h+b.p.mi/60-b.p.tz, jd=jdFromUT(b.p.y,b.p.mo,b.p.d,ut), a=angles(jd,b.p.lat,b.p.lon);
const pl=placidus(a.ramc,a.eps,b.p.lat); /* [11,12,2,3] */
const zg=l=>{l=((l%360)+360)%360; const z=Math.floor(l/30), r=l-z*30; let d=Math.floor(r), m=Math.floor((r-d)*60+1e-9); return d+'°'+(m<10?'0':'')+m+' '+SIGNS[z];};
const nah=(soll,ist)=>{ const m=soll.match(/^(\d+)°(\d+) (.+)$/); if(!m) return false;
  const g=SIGNS.indexOf(m[3])*30+(+m[1])+(+m[2])/60; return Math.abs(((ist-g)%360+540)%360-180)<0.2; };
if(!nah(b.asc,C.ASC)) f.push('Beispiel: Aszendent '+b.asc+' stimmt nicht, gerechnet '+zg(C.ASC));
if(!nah(b.mc,C.MC)) f.push('Beispiel: MC '+b.mc+' stimmt nicht, gerechnet '+zg(C.MC));
if(!nah(b.sonne,C.Sonne)) f.push('Beispiel: Sonne '+b.sonne+' stimmt nicht, gerechnet '+zg(C.Sonne));
if(haus(C,C.Sonne)!==b.wsHaus) f.push('Beispiel: Whole-Sign-Haus der Sonne ist '+haus(C,C.Sonne));
if(haus(C,C.MC)!==11) f.push('Beispiel: das MC liegt nicht im 11. Haus, wie der Text sagt');
const ab=(((C.Sonne-C.MC)%360)+360)%360, bis11=(((pl[0]-C.MC)%360)+360)%360;
if(!(ab<bis11)||b.plHaus!==10) f.push('Beispiel: die Sonne liegt nach Placidus nicht im 10. Haus');
if(Math.abs(ab*60-b.abstand)>6) f.push('Beispiel: Abstand Sonne–MC '+(ab*60).toFixed(0)+"' statt "+b.abstand+"'");
console.log(JSON.stringify({fehler:f}));
'''
pd = hier / '.probe-haeuser-daten.js'
pd.write_text(probe_d, encoding='utf-8')
try:
    r = subprocess.run(['node', str(pd), str(rit / 'engine.js'), str(hier / 'haeuser-daten.js')],
                       capture_output=True, text=True, timeout=60)
    if r.returncode != 0:
        fehler.append('Datenprüfung gescheitert: ' + (r.stderr or '')[-300:])
    else:
        fehler.extend(json.loads(r.stdout.strip().splitlines()[-1])['fehler'])
finally:
    pd.unlink(missing_ok=True)

# ── 4 · Keine eingebaute Deutung eines bestimmten Menschen ──
# Eine Form, kein Textstück: „bei dir" (oder „dein Chart") gefolgt
# von einem Zeichen- oder Planetennamen in einer Quelldatei heißt,
# dass jemandes Chart fest im Text steht. Gerechnet wird in der App,
# dort stehen keine Namen hinter „bei dir".
NAMEN = ('Widder|Stier|Zwillinge|Krebs|Löwe|Jungfrau|Waage|Skorpion|Schütze|Steinbock|Wassermann|Fische|'
         'Sonne|Mond|Merkur|Venus|Mars|Jupiter|Saturn|Uranus|Neptun|Pluto')
for name, t in [('haeuser-koerper.html', koerper), ('haeuser-daten.js', daten)]:
    for m in re.finditer(r'(?i)(bei dir|dein(?:em)? chart)\W{0,3}[^.<]{0,60}\b(' + NAMEN + r')\b', t):
        fehler.append(f'{name}: feste Deutung „{m.group(0)[:60]}…" — das wird gerechnet')
for name, t in [('haeuser-app.js', app), ('haeuser-daten.js', daten), ('haeuser-koerper.html', koerper)]:
    if re.search(r'\b1987\b', t) or re.search(r'\b08:58\b', t) or re.search(r"9°0[0-9] Widder", t):
        fehler.append(f'{name}: sieht nach echten Geburtsdaten aus')

# ── Rauchprobe ───────────────────────────────────────────────
probe = r'''
const {chromium}=require('playwright');
(async()=>{
const f=[]; const b=await chromium.launch();
const MECHANIK=['Konjunktion','Quadrat','Trigon','Sextil','Orbis','Transit','Aszendent','Deszendent','Whole','Placidus',
 'Radix','Ekliptik','Haus','Häuser','Hauses','Mondknoten','MC','IC'];
const ZEICHEN=['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische'];
const PLAN=['Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];
const wort=(t,x)=>new RegExp('(?<![A-Za-zÄÖÜäöüß])'+x+'(?![A-Za-zÄÖÜäöüß])').test(t);
const ueber=async(pg,wo)=>{ const r=await pg.evaluate(()=>{const w=document.documentElement.clientWidth; const r=[];
  document.querySelectorAll('body *').forEach(e=>{ if(e.closest('.hz-tabbox')) return; const bb=e.getBoundingClientRect();
    if(bb.width>0&&(bb.right>w+1.5||bb.left<-1.5)) r.push(e.tagName+'.'+(e.className.baseVal===undefined?e.className:'')+' '+Math.round(bb.right)); });
  return {r:r.slice(0,4),sw:document.documentElement.scrollWidth,w}; });
  if(r.r.length||r.sw>r.w+1) f.push(wo+': läuft auf 390px über: '+r.r.join(' | ')); };
const stufe0=async(pg,wo)=>{ await pg.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(0); }); await pg.waitForTimeout(300);
  const t=await pg.evaluate(()=>document.body.innerText);
  const m=MECHANIK.filter(x=>wort(t,x)).concat(ZEICHEN.filter(x=>wort(t,x)),PLAN.filter(x=>wort(t,x)));
  if(m.length) f.push(wo+', Stufe 0: '+m.join(', '));
  if(/\d°/.test(t)) f.push(wo+', Stufe 0: Gradzahlen'); };

/* A · ohne Profil */
const c1=await b.newContext({viewport:{width:390,height:844}});
const p=await c1.newPage(); p.on('pageerror',e=>f.push('Skriptfehler ohne Profil: '+String(e.message).slice(0,160)));
await p.goto('file://ZIEL'); await p.waitForTimeout(700);
const a=await p.evaluate(()=>({k:document.querySelectorAll('#hzbuehnen .hz-buehne').length,
  rad:document.querySelectorAll('#hzrad g[role=button]').length, ach:document.querySelectorAll('#hzachsen .hz-achse').length,
  bei:document.querySelectorAll('.hz-bei').length, profil:document.getElementById('hzprofil').textContent,
  q:document.querySelectorAll('#hzquiz .hz-q').length, bsp:document.getElementById('hzbeispiel').textContent}));
if(a.k!==12) f.push(a.k+' statt 12 Bühnen');
if(a.rad!==12) f.push(a.rad+' statt 12 Felder im Rad');
if(a.ach!==6) f.push(a.ach+' statt 6 Paare');
if(a.bei) f.push('ohne Profil steht trotzdem „bei dir" da');
if(!/Profile/.test(a.profil)) f.push('ohne Profil fehlt der Hinweis auf Profile');
if(a.q!==2) f.push('das Quiz fehlt');
if(!/erfunden/.test(a.bsp)) f.push('das Beispiel sagt nicht, dass es erfunden ist');
/* Die Richtung des Rads: 4 unten, 7 rechts, 10 oben, wie im Geburtsbild */
const lage=await p.evaluate(()=>[...document.querySelectorAll('#hzrad g[role=button] text:first-of-type')].map(t=>({x:+t.getAttribute('x'),y:+t.getAttribute('y')})));
if(!(lage[3].y>300&&lage[6].x>300&&lage[9].y<100&&lage[0].x<100)) f.push('das Rad läuft nicht wie ein Geburtsbild: 4 unten, 7 rechts, 10 oben');
await p.evaluate(()=>{ const g=document.querySelectorAll('#hzrad g[role=button]'); g[6].dispatchEvent(new MouseEvent('click',{bubbles:true})); });
await p.waitForTimeout(150);
const an=await p.evaluate(()=>({g:document.querySelectorAll('#hzrad g[role=button]')[6].getAttribute('aria-pressed'),
  k:document.querySelectorAll('#hzbuehnen .hz-buehne')[6].classList.contains('an')}));
if(an.g!=='true'||!an.k) f.push('ein Klick ins Rad markiert die Bühne nicht');
await stufe0(p,'ohne Profil');
await p.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(2); }); await p.waitForTimeout(300);
const s2=await p.evaluate(()=>document.getElementById('systeme').checkVisibility());
if(!s2) f.push('die Systemfrage erscheint auf Stufe 2 nicht');
await p.evaluate(()=>{ document.querySelectorAll('#hzquiz .hz-opts button')[0].click(); }); await p.waitForTimeout(100);
const qq=await p.evaluate(()=>({ex:!document.querySelector('#hzquiz .hz-expl').hidden, r:!!document.querySelector('#hzquiz button.richtig')}));
if(!qq.ex||!qq.r) f.push('das Quiz zeigt nach einer Antwort keine Erklärung');
await ueber(p,'ohne Profil');

/* B · mit erfundenem Profil */
const c2=await b.newContext({viewport:{width:390,height:844}});
await c2.addInitScript(()=>{ localStorage.setItem('ac_profile_v1',JSON.stringify({v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:[
  {id:'p1',name:'Probe Rad',alias:'',y:1980,mo:7,d:15,h:14,mi:20,tz:1,lat:52.52,lon:13.405,ort:'Berlin',
   wlat:52.52,wlon:13.405,wort:'Berlin',eigen:true,readings:[]}]})); });
const q=await c2.newPage(); q.on('pageerror',e=>f.push('Skriptfehler mit Profil: '+String(e.message).slice(0,160)));
await q.goto('file://ZIEL'); await q.waitForTimeout(700);
const bq=await q.evaluate(()=>{
  const C=chartVon(AC_P.aktives()), PL=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];
  const n=Array(12).fill(0); PL.forEach(k=>n[haus(C,C[k])-1]++);
  const karten=[...document.querySelectorAll('#hzbuehnen .hz-buehne')].map(k=>k.classList.contains('voll'));
  const ach=[...document.querySelectorAll('#hzachsen .hz-achse')].map(k=>k.querySelector('.hz-bei').textContent);
  return {n, karten, ach, profil:document.getElementById('hzprofil').textContent};});
if(!/Probe Rad/.test(bq.profil)) f.push('das aktive Profil wird nicht genannt');
bq.n.forEach((n,i)=>{ if((n>0)!==bq.karten[i]) f.push('Bühne '+(i+1)+': „belebt" stimmt nicht mit der Rechnung überein'); });
const AX=[[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
AX.forEach(([x,y],i)=>{ const t=bq.ach[i], na=bq.n[x]>0, nb=bq.n[y]>0;
  const soll=(!na&&!nb)?/beide Seiten leise/:(na&&nb)?/beide Seiten belebt/:/Gewicht auf/;
  if(!soll.test(t)) f.push('Paar '+(x+1)+'–'+(y+1)+': Satz passt nicht zur Rechnung'); });
await stufe0(q,'mit Profil');
await ueber(q,'mit Profil');
console.log(JSON.stringify({fehler:f})); await b.close();})();
'''
pp = hier / '.probe-haeuser.js'
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

if fehler:
    for f in fehler:
        print('      FEHLER: ' + f)
    sys.exit(1)
print(f'      haeuser.html: {len(html)//1024} KB, drei alte Adressen leiten weiter')
