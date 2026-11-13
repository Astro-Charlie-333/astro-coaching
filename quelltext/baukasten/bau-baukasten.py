#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut baukasten.html — die Werkstatt-Seite, auf der Mandy für einen
Menschen Bausteine erstellt und zuweist (Auftrag vom 13.11.).

Erste drei Bausteine: Abendroutine bei Angst, Morgenroutine bei Angst
(beide nach dem Geburtsbild) und „Was beim Arztbesuch ansprechen" zu
ADHS und AuDHS (ohne Geburtsbild, ohne Dosierungen).

Gespeichert wird je Profil nur Art, Datum und Freigabe (profil.js,
AC_P.bausteine). Der Inhalt entsteht beim Öffnen neu. Die Datei, die
an eine Klientin geht, ist ein eigenständiges HTML-Dokument ohne
Skript; dasselbe Dokument steht in der Vorschau.

Die Seite steht wie die Werkstatt nicht im Menü und nicht im Index.
"""
import pathlib, re, sys, subprocess, json

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit = hier.parent / 'rituale'
sys.path.insert(0, str(rit))
import pruefwerk


def lies(p):
    return p.read_text(encoding='utf-8')


koerper = lies(hier / 'bk-koerper.html')
app = lies(hier / 'bk-app.js')
daten = lies(hier / 'bk-daten.js')
rechner = lies(hier / 'bk-rechner.js')
stil = lies(hier / 'bk-stil.css')
engine = lies(rit / 'engine.js')
appkopf = lies(hier.parent / 'app' / 'app-kopf.html')

html = ('<!DOCTYPE html><html lang="de"><head>' + appkopf + '<meta charset="UTF-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        '<meta name="robots" content="noindex, nofollow">\n'
        '<title>Baukasten &middot; Werkstatt &middot; Astro-Charlie</title>\n'
        '<link rel="preconnect" href="https://fonts.googleapis.com">'
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
        '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">\n'
        '<script src="profil.js"></script>\n'
        '<style>\n' + lies(rit / 'basis.css') + '\n' + stil + '</style>\n</head><body>\n'
        + koerper + '\n<script>\n' + engine + '\n' + daten + '\n' + rechner + '\n' + app
        + '\n</script>\n</body></html>\n')
ziel = wiki / 'baukasten.html'
ziel.write_text(html, encoding='utf-8')

fehler = []

# ── 1 · IDs und Tags ─────────────────────────────────────────
ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
if gesucht - ids:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(gesucht - ids)))
for tag in ('div', 'section', 'nav', 'p', 'header'):
    a, z = len(re.findall(r'<' + tag + r'\b', koerper)), len(re.findall(r'</' + tag + '>', koerper))
    if a != z:
        fehler.append(f'{a} <{tag}> gegen {z} </{tag}> im Körper')
for f in ('bausteine', 'bausteinHinzu', 'bausteinAendern', 'bausteinLoeschen'):
    if f + ':function' not in lies(hier.parent.parent / 'profil.js'):
        fehler.append(f'profil.js kennt AC_P.{f} nicht')

# ── 2 · Eine Himmelsrechnung, keine Namenskollision ──────────
oben = lambda s: set(re.findall(r'^(?:var|function)\s+([A-Za-z_]\w*)', s, re.M))
for name, t in [('bk-daten.js', daten), ('bk-rechner.js', rechner)]:
    if oben(t) & oben(engine):
        fehler.append(f'{name}: Namen kollidieren mit engine.js: ' + ', '.join(sorted(oben(t) & oben(engine))))
    for v in ('function chartVon', 'function geo(', '0.38709927'):
        if v in t:
            fehler.append(f'{name} enthält eine eigene Himmelsrechnung')

# ── 3 · Daten vollständig, keine Dosierungen ─────────────────
probe_d = r'''
const fs=require('fs'); global.window={};
eval(fs.readFileSync(process.argv[2],'utf8')); eval(fs.readFileSync(process.argv[3],'utf8'));
const f=[], E=BK_ELEMENT;
if(E.join()!=='Feuer,Erde,Luft,Wasser') f.push('Elemente in falscher Reihenfolge');
const satz=(t,wo)=>{ if(!t||!/[.?]$/.test(t.trim())) f.push(wo+': kein ganzer Satz: „'+String(t).slice(0,40)+'"'); };
[['Abend',BK_ABEND],['Morgen',BK_MORGEN],['Halt',BK_HALT],['Woche',BK_WOCHE]].forEach(([n,D])=>{
  ['titel','lede','geruestTitel','satzTitel','schluss'].forEach(x=>{ if(!D[x]) f.push(n+': '+x+' fehlt'); });
  if(D.geruest.length<4) f.push(n+': das Gerüst ist zu kurz');
  D.geruest.forEach(z=>satz(z[1],n+', Gerüst '+z[0]));
  D.teile.forEach(t=>{ if(!['Sonne','Mond','Merkur','Mars','Saturn','Aszendent'].includes(t.punkt)) f.push(n+': '+t.k+' nennt einen Punkt, den der Rechner nicht liefert');
    const K=t.nach==='modus'?BK_MODUS:E;
    if(Object.keys(t.texte).sort().join()!==K.slice().sort().join()) f.push(n+', '+t.kopf+': nicht alle '+K.length+' Varianten');
    K.forEach(e=>{ satz(t.texte[e],n+', '+t.kopf+', '+e); if((t.texte[e]||'').length<60) f.push(n+', '+t.kopf+', '+e+': zu kurz'); }); });
  (D.fragen||[]).forEach(x=>satz(x,n+', Frage')); (D.schleifen||[]).forEach(x=>satz(x[1],n+', '+x[0])); (D.stufen||[]).forEach(x=>satz(x[1],n+', '+x[0]));
  if(Object.keys(D.saetze).sort().join()!==E.slice().sort().join()) f.push(n+': nicht alle vier Sätze');
  E.forEach(e=>satz(D.saetze[e],n+', Satz '+e)); });
satz(BK_ABEND.rueckzug,'Abend, Rückzug');
const A=BK_ARZT;
A.werte.forEach(w=>{ if(!w[0]||(w[1]||'').length<60) f.push('Arzt: Wert '+w[0]+' unvollständig'); satz(w[1],'Arzt, '+w[0]); });
const alles=JSON.stringify(A);
const dosis=alles.match(/\d[\d.,]*\s*(mg|µg|mcg|IE|I\.E\.|IU|ng\/ml|nmol)/i);
if(dosis) f.push('Arzt: Dosierung oder Grenzwert im Text: „'+dosis[0]+'"');
if(!/keine (medizinische )?Beratung|keine medizinische Beratung/.test(A.vorab)) f.push('Arzt: der Hinweis, dass es keine Beratung ist, fehlt');
A.quellen.forEach(q=>{ if(!/^https:\/\//.test(q[1])) f.push('Arzt: Quelle ohne Adresse'); });
BK_BAUSTEINE.forEach(b=>{ if(!b.titel||!b.kurz||!b.datei) f.push('Baustein '+b.k+' unvollständig'); });
if(BK_BAUSTEINE.map(b=>b.k).join()!=='abend,morgen,arzt,halt,woche,termin,termin2') f.push('die sieben Bausteine stimmen nicht');
if(BK_MODUS.join()!=='kardinal,fix,veränderlich') f.push('die drei Arten in falscher Reihenfolge');
[['ADHS',BK_TERMIN],['AuDHS',BK_TERMIN2]].forEach(([n,D])=>{
  ['titel','lede','vorab','vierTitel','gruppenTitel','kind','bereicheTitel','beispiel','saetzeTitel','fragenTitel','mitTitel','schluss'].forEach(x=>{ if(!D[x]) f.push('Termin '+n+': '+x+' fehlt'); });
  if(D.vier.length!==4) f.push('Termin '+n+': nicht vier Fragen');
  D.gruppen.forEach(g=>{ if(!g.t||g.m.length<3) f.push('Termin '+n+': Gruppe '+g.t+' zu klein'); g.m.forEach(m=>{ if(!m[0]||!m[1]) f.push('Termin '+n+': leerer Punkt in '+g.t); }); });
  if(new Set(D.bereiche.map(b=>b[0])).size!==D.bereiche.length) f.push('Termin '+n+': zwei Bereiche mit demselben Schlüssel, die Skalen würden sich gegenseitig abwählen');
  D.fragen.forEach(x=>{ if(!/\?$/.test(x)) f.push('Termin '+n+': Frage ohne Fragezeichen'); });
  if(!/keine Diagnose/.test(D.vorab)) f.push('Termin '+n+': der Hinweis, dass es keine Diagnose ist, fehlt');
  const dz=JSON.stringify(D).match(/\d[\d.,]*\s*(mg|µg|mcg|IE|IU|ng\/ml|nmol)/i); if(dz) f.push('Termin '+n+': Dosierung „'+dz[0]+'"'); });
if(BK_STUFEN.length!==5) f.push('die Skala hat nicht fünf Stufen');
const L={fuer:['name'],fachzeile:['element','punkt','zeichen'],dateiName:['art','name']};
for(const k in BK_TEXT){ const ist=(BK_TEXT[k].match(/\{([a-zA-Z]+)\}/g)||[]).map(x=>x.slice(1,-1)).sort().join();
  const s=(L[k]||[]).slice().sort().join(); if(ist!==s) f.push('BK_TEXT.'+k+': Lücken {'+ist+'} statt {'+s+'}'); }
console.log(JSON.stringify({fehler:f}));
'''
assert re.search(r'\d[\d.,]*\s*(mg|µg|mcg|IE|I\.E\.|IU|ng/ml|nmol)', '50-100 mg/day', re.I)
pd = hier / '.probe-bk-daten.js'
pd.write_text(probe_d, encoding='utf-8')
try:
    r = subprocess.run(['node', str(pd), str(rit / 'engine.js'), str(hier / 'bk-daten.js')], capture_output=True, text=True, timeout=60)
    if r.returncode != 0:
        fehler.append('Datenprüfung gescheitert: ' + (r.stderr or '')[-300:])
    else:
        fehler.extend(json.loads(r.stdout.strip().splitlines()[-1])['fehler'])
finally:
    pd.unlink(missing_ok=True)

# ── 4 · Rechner ──────────────────────────────────────────────
r = subprocess.run(['node', str(hier / '_test-bk.js'), str(rit / 'engine.js'), str(hier / 'bk-rechner.js')], capture_output=True, text=True, timeout=60)
if r.returncode != 0:
    fehler.append('_test-bk.js gescheitert: ' + (r.stderr or '')[-300:])
else:
    fehler.extend('Rechner: ' + x for x in json.loads(r.stdout.strip().splitlines()[-1])['fehler'])

# ── 5 · Keine echten Daten ───────────────────────────────────
for name, t in [('bk-app.js', app), ('bk-daten.js', daten), ('bk-koerper.html', koerper), ('bk-rechner.js', rechner), ('_test-bk.js', lies(hier / '_test-bk.js'))]:
    if re.search(r'\b1987\b', t) or re.search(r'\b08:58\b', t):
        fehler.append(f'{name}: sieht nach echten Geburtsdaten aus')

# ── 6 · Satzfrei, ohne „dein" ────────────────────────────────
fehler += pruefwerk.pruefe_anzeige_satzfrei(app, 'bk-app.js', 'bk-daten.js')
fehler += pruefwerk.pruefe_anzeige_ohne_dein(app, 'bk-app.js')
for _art, _an in (('einfache', "'"), ('doppelte', '"'), ('schräge', '`')):
    if not pruefwerk.pruefe_anzeige_satzfrei(app + '\nvar _g=' + _an + 'Diesem Profil zuweisen' + _an + ';\n', 'bk-app.js', 'bk-daten.js'):
        fehler.append(f'der Riegel sieht einen Satz in {_art} Anführung nicht')
    if not pruefwerk.pruefe_anzeige_ohne_dein(app + '\nvar _g=' + _an + 'für deinen Mond' + _an + ';\n', 'bk-app.js'):
        fehler.append(f'der Riegel sieht ein „dein" in {_art} Anführung nicht')

# ── Rauchprobe ───────────────────────────────────────────────
probe = r'''
const {chromium}=require('playwright'); const fs=require('fs');
(async()=>{
const f=[]; const b=await chromium.launch();
const ueber=async(pg,wo)=>{ const r=await pg.evaluate(()=>({sw:document.documentElement.scrollWidth,w:document.documentElement.clientWidth}));
  if(r.sw>r.w+1) f.push(wo+': läuft auf 390px über'); };
/* A · ohne Profile */
const c0=await b.newContext({viewport:{width:390,height:844}});
const p0=await c0.newPage(); p0.on('pageerror',e=>f.push('Skriptfehler ohne Profile: '+String(e.message).slice(0,160)));
await p0.goto('file://ZIEL'); await p0.waitForTimeout(500);
const a=await p0.evaluate(()=>({h:!document.getElementById('bkhinweis').hidden, k:document.querySelectorAll('[data-art]').length}));
if(!a.h) f.push('ohne Profile fehlt der Hinweis auf Profile');
if(a.k!==7) f.push(a.k+' statt 7 Bausteine');
/* B · zwei erfundene Profile, eins ohne Ort, eins mit Namen, der HTML enthält */
const c=await b.newContext({viewport:{width:390,height:844}, acceptDownloads:true});
await c.addInitScript(()=>{ if(sessionStorage.getItem('gesetzt')) return; sessionStorage.setItem('gesetzt','1');
  localStorage.setItem('ac_profile_v1',JSON.stringify({v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:[
  {id:'p1',name:'Lena <img src=x id=boese> Probe',alias:'',y:1986,mo:6,d:14,h:9,mi:20,tz:2,lat:50.94,lon:6.96,ort:'Köln',eigen:true,readings:[]},
  {id:'p2',name:'Ohne Ort',alias:'',y:1990,mo:1,d:5,h:12,mi:0,tz:1,lat:null,lon:null,ort:'',eigen:false,readings:[]}]})); });
const p=await c.newPage(); p.on('pageerror',e=>f.push('Skriptfehler mit Profilen: '+String(e.message).slice(0,160)));
await p.goto('file://ZIEL'); await p.waitForTimeout(500);
if(!(await p.evaluate(()=>!document.getElementById('bkwerk').checkVisibility()&&document.getElementById('bkleer').checkVisibility()))) f.push('ohne Wahl steht schon ein Entwurf da');
await p.click('[data-art=abend]'); await p.waitForTimeout(500);
const r1=await p.evaluate(()=>{ const P=AC_P.alle()[0], S=bkStellen(P), E=BK_ELEMENT;
  const d=document.getElementById('bkvorschau').srcdoc;
  const soll=BK_ABEND.teile.map(t=>t.texte[E[S[t.punkt].el]]);
  return {fehlt:soll.filter(x=>d.indexOf(x.replace(/&/g,'&amp;'))<0).length, satz:d.indexOf(BK_ABEND.saetze[E[S.Mond.el]])>=0,
    fach:/class="fach"/.test(d), script:/<script/i.test(d), boese:/<img src=x/.test(d), fuer:/Für Lena/.test(d),
    grund:document.getElementById('bkgrund').checkVisibility()}; });
if(r1.fehlt) f.push('Abendroutine: '+r1.fehlt+' persönliche Teile passen nicht zum Geburtsbild');
if(!r1.satz) f.push('Abendroutine: der Satz passt nicht zum Mond');
if(r1.fach) f.push('ohne Häkchen stehen trotzdem Fachbegriffe in der Datei');
if(r1.script) f.push('die Datei enthält ein Skript');
if(r1.boese) f.push('ein Name mit HTML landet ungeschützt in der Datei');
if(!r1.fuer) f.push('die Datei nennt den Vornamen nicht');
if(!r1.grund) f.push('die Grundlage aus dem Geburtsbild fehlt für Mandy');
await p.check('#bkfach'); await p.waitForTimeout(300);
if(!(await p.evaluate(()=>/class="fach"/.test(document.getElementById('bkvorschau').srcdoc)))) f.push('mit Häkchen fehlen die Fachbegriffe');
const hoch=await p.evaluate(()=>document.getElementById('bkvorschau').getBoundingClientRect().height);
if(hoch<400) f.push('die Vorschau ist nur '+Math.round(hoch)+' Pixel hoch');
await p.click('#bkzuweisen'); await p.waitForTimeout(200);
const z=await p.evaluate(()=>({n:AC_P.bausteine('p1').length, art:AC_P.bausteine('p1')[0]&&AC_P.bausteine('p1')[0].art, zeilen:document.querySelectorAll('#bkliste .bk-zeile').length}));
if(z.n!==1||z.art!=='abend'||z.zeilen!==1) f.push('Zuweisen speichert nicht oder zeigt nicht an');
const [dl]=await Promise.all([p.waitForEvent('download',{timeout:5000}).catch(()=>null), p.click('#bkdatei')]);
if(!dl) f.push('die Datei wird nicht heruntergeladen');
else { const pfad=await dl.path(); const t=fs.readFileSync(pfad,'utf8');
  if(!/^<!DOCTYPE html>/.test(t)||!/Deine Abendroutine/.test(t)) f.push('die heruntergeladene Datei ist nicht die Abendroutine');
  if(!/^Abendroutine-Lena/.test(dl.suggestedFilename())) f.push('Dateiname „'+dl.suggestedFilename()+'"'); }
await p.click('#bkliste .bk-zknoepfe button:nth-child(3)'); await p.waitForTimeout(150);
if(!(await p.evaluate(()=>AC_P.bausteine('p1')[0].frei))) f.push('Freigeben wirkt nicht');
await p.click('#bkliste .bk-zknoepfe button:nth-child(4)'); await p.waitForTimeout(150);
if((await p.evaluate(()=>AC_P.bausteine('p1').length))!==1) f.push('Entfernen löscht ohne Rückfrage');
await p.click('#bkliste .bk-zknoepfe button:text("Ja")'); await p.waitForTimeout(150);
if((await p.evaluate(()=>AC_P.bausteine('p1').length))!==0) f.push('Entfernen nach Rückfrage wirkt nicht');
for(const art of ['halt','woche']){
  await p.click('[data-art='+art+']'); await p.waitForTimeout(400);
  const ok=await p.evaluate((art)=>{ const S=bkStellen(AC_P.alle()[0]), D={halt:BK_HALT,woche:BK_WOCHE}[art], d=document.getElementById('bkvorschau').srcdoc;
    const fehlt=D.teile.filter(t=>{ const s=S[t.punkt], x=t.nach==='modus'?t.texte[BK_MODUS[s.z%3]]:t.texte[BK_ELEMENT[s.el]]; return d.indexOf(x.replace(/&/g,'&amp;').replace(/"/g,'&quot;'))<0; }).length;
    return {fehlt, grund:document.querySelectorAll('#bkgrund li').length===D.teile.length+1}; }, art);
  if(ok.fehlt) f.push(art+': '+ok.fehlt+' Teile passen nicht zum Geburtsbild');
  if(!ok.grund) f.push(art+': die Grundlage für Mandy ist unvollständig'); }
for(const [art,name] of [['termin','BK_TERMIN'],['termin2','BK_TERMIN2']]){
  await p.click('[data-art='+art+']'); await p.waitForTimeout(400);
  const t=await p.evaluate((name)=>{ const D=window[name]||eval(name), d=document.getElementById('bkvorschau').srcdoc;
    const doc=document.getElementById('bkvorschau').contentDocument;
    return {k:(d.match(/type="checkbox"/g)||[]).length, kSoll:D.gruppen.reduce((a,g)=>a+g.m.length+1,0),
      r:(d.match(/type="radio"/g)||[]).length, rSoll:D.bereiche.length*5, s:/<script/i.test(d),
      klick:(()=>{ const i=doc&&doc.querySelector('input[type=radio]'); if(!i) return false; i.click(); return i.checked; })()}; }, name);
  if(t.k!==t.kSoll) f.push(art+': '+t.k+' statt '+t.kSoll+' Kästchen');
  if(t.r!==t.rSoll) f.push(art+': '+t.r+' statt '+t.rSoll+' Stufen');
  await p.waitForTimeout(1600);
  const hh=await p.evaluate(()=>{ const fr=document.getElementById('bkvorschau'); return [fr.getBoundingClientRect().height, fr.contentDocument.documentElement.scrollHeight]; });
  if(Math.abs(hh[0]-hh[1])>40) f.push(art+': die Vorschau ist '+Math.round(hh[0])+' statt '+hh[1]+' Pixel hoch, der Rest ist abgeschnitten');
  if(t.s) f.push(art+': die Datei enthält ein Skript');
  if(!t.klick) f.push(art+': die Skala lässt sich in der Datei nicht anklicken'); }
await p.click('[data-art=morgen]'); await p.waitForTimeout(400);
const r2=await p.evaluate(()=>{ const S=bkStellen(AC_P.alle()[0]); return document.getElementById('bkvorschau').srcdoc.indexOf(BK_MORGEN.saetze[BK_ELEMENT[S.Sonne.el]])>=0; });
if(!r2) f.push('Morgenroutine: der Satz passt nicht zur Sonne');
await ueber(p,'mit Profil, Entwurf');
/* Profil ohne Ort: Routinen gehen nicht, Arztbesuch geht */
await p.selectOption('#bkprofil','p2'); await p.waitForTimeout(300);
const r3=await p.evaluate(()=>({c:document.getElementById('bkchart').checkVisibility(), w:document.getElementById('bkwerk').checkVisibility()}));
if(!r3.c||r3.w) f.push('ohne Geburtsort wird trotzdem eine Routine erstellt');
await p.click('[data-art=arzt]'); await p.waitForTimeout(400);
const r4=await p.evaluate(()=>{ const d=document.getElementById('bkvorschau').srcdoc; return {w:document.getElementById('bkwerk').checkVisibility(), n:(d.match(/class="wert"/g)||[]).length, g:document.getElementById('bkgrund').checkVisibility()}; });
if(!r4.w||r4.n!==6) f.push('Arztbesuch ohne Geburtsbild: '+r4.n+' statt 6 Werte');
if(r4.g) f.push('beim Arztbesuch steht eine Grundlage aus dem Geburtsbild');
await ueber(p,'Arztbesuch');
console.log(JSON.stringify({fehler:f})); await b.close();})();
'''
pp = hier / '.probe-bk.js'
pp.write_text(probe.replace('ZIEL', str(ziel)), encoding='utf-8')
try:
    r = subprocess.run(['node', str(pp)], capture_output=True, text=True, timeout=200)
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
print(f'      baukasten.html: {len(html)//1024} KB, sieben Bausteine')
