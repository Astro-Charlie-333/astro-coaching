#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut anders-verdrahtet.html — Schritt 5 aus ENTWURF-NEUE-SEITE.md.

Fünf Seiten zu einem Thema werden eine: audhs-verstehen.html (Verstehen),
diagnose-weg.html (Der Weg zur Abklärung), nd-leitfaden.html (Anders
verdrahtet leben), neurodivergente-astrologie.html und
neurodivergenz-vertiefung.html (Im Geburtsbild). Die fünf alten
Adressen leiten auf ihren Abschnitt weiter. Der Themenraum
raum-anders-verdrahtet.html bleibt der Lebensbereich und ist verlinkt.

Beim Zusammenlegen kam heraus:

  1. nd-leitfaden.html trug eine eigene Kopie der ganzen
     Himmelsrechnung und schrieb „Saturn im 4. Haus" auch auf Stufe 0.
     Jetzt rechnet es gegen engine.js, und jeder Bereich hat zwei
     Register: Alltagssprache immer, die Stellung ab Stufe 2.
  2. Der Hyperfokus-Finder setzte die eigenen Antworten als HTML ein.
     Jetzt nur als Text; die Rauchprobe hält das fest.
  3. diagnose-weg.html sagte, die vier Berliner Autismus-Ambulanzen
     hätten eine gemeinsame zentrale Warteliste. Belegen ließ sich am
     12.11. nur die Anmeldung der Spezialambulanz an der
     Humboldt-Universität am ersten Mittwoch jedes Quartals. Der Satz
     sagt jetzt nur das.
  4. Zwei Seiten sprachen die Coachin mit „Du bist selbst anders
     verdrahtet" an. Das steht jetzt als Möglichkeit in einem
     zugeklappten Abschnitt für die Arbeit mit anderen.
"""
import pathlib, re, sys, subprocess, json

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit = hier.parent / 'rituale'
sys.path.insert(0, str(rit))
import pruefwerk


def lies(p):
    return p.read_text(encoding='utf-8')


koerper = lies(hier / 'nd-koerper.html')
app = lies(hier / 'nd-app.js')
daten = lies(hier / 'nd-daten.js')
rechner = lies(hier / 'nd-rechner.js')
stil = lies(hier / 'nd-stil.css')
engine = lies(rit / 'engine.js')
appkopf = lies(hier.parent / 'app' / 'app-kopf.html')

SKRIPTE = ['profil.js', 'fortschritt.js', 'begriffe.js', 'niveau.js', 'wortwahl.js']
html = ('<!DOCTYPE html><html lang="de"><head>' + appkopf + '<meta charset="UTF-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        '<title>Anders verdrahtet &middot; ADHS, Autismus, Abkl&auml;rung, Alltag &middot; Astro-Charlie</title>\n'
        '<meta name="description" content="ADHS, Autismus und beides verstehen, der Weg zur Abklärung in Deutschland, und wie man das Leben so einrichtet, dass die eigene Bauweise ein Vorteil wird.">\n'
        '<link rel="preconnect" href="https://fonts.googleapis.com">'
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
        '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">\n'
        + '\n'.join(f'<script src="{s}"{"" if s == "profil.js" else " defer"}></script>' for s in SKRIPTE)
        + '\n<style>\n' + lies(rit / 'basis.css') + '\n' + stil + '</style>\n</head><body>\n'
        + koerper + '\n<script>\n' + engine + '\n' + daten + '\n' + rechner + '\n' + app
        + '\n</script>\n</body></html>\n')
ziel = wiki / 'anders-verdrahtet.html'
ziel.write_text(html, encoding='utf-8')

WEITER = {'audhs-verstehen.html': ('verstehen', 'ADHS, Autismus und beides'),
          'diagnose-weg.html': ('abklaerung', 'Der Weg zur Abklärung'),
          'nd-leitfaden.html': ('leben', 'Anders verdrahtet leben'),
          'neurodivergente-astrologie.html': ('chart', 'Astrologie für anders verdrahtete Köpfe'),
          'neurodivergenz-vertiefung.html': ('chart', 'Neurodivergentes Erleben im Chart')}
for alt, (anker, titel) in WEITER.items():
    (wiki / alt).write_text(
        '<!DOCTYPE html><html lang="de"><head>' + appkopf + '<meta charset="UTF-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        f'<title>{titel} &middot; jetzt auf der Seite Anders verdrahtet</title>\n'
        f'<link rel="canonical" href="anders-verdrahtet.html#{anker}">\n'
        f'<meta http-equiv="refresh" content="0; url=anders-verdrahtet.html#{anker}">\n'
        '<meta name="robots" content="noindex">\n'
        '</head><body style="font-family:system-ui,sans-serif;padding:40px 20px;max-width:560px;margin:0 auto">\n'
        f'<p>{titel} steht jetzt auf der Seite <a href="anders-verdrahtet.html#{anker}">Anders verdrahtet</a>.</p>\n'
        '</body></html>\n', encoding='utf-8')

fehler = []

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
for tag in ('div', 'section', 'nav', 'table', 'svg', 'ol', 'ul', 'p', 'header', 'details'):
    a, z = len(re.findall(r'<' + tag + r'\b', koerper)), len(re.findall(r'</' + tag + '>', koerper))
    if a != z:
        fehler.append(f'{a} <{tag}> gegen {z} </{tag}> im Körper')

# ── 2 · Eine Himmelsrechnung, keine Namenskollision ──────────
for verraeter, was in [('0.38709927', 'Bahnelemente'), ('function helio', 'eine eigene helio'),
                       ('function geo(', 'eine eigene geo'), ('function chartVon', 'ein eigenes chartVon'),
                       ('function angles', 'eine eigene angles')]:
    for name, t in [('nd-app.js', app), ('nd-daten.js', daten), ('nd-rechner.js', rechner), ('nd-koerper.html', koerper)]:
        if verraeter in t:
            fehler.append(f'{name} enthält wieder {was}')
oben = lambda s: set(re.findall(r'^(?:var|function)\s+([A-Za-z_]\w*)', s, re.M))
for name, t in [('nd-daten.js', daten), ('nd-rechner.js', rechner)]:
    if oben(t) & oben(engine):
        fehler.append(f'{name}: Namen kollidieren mit engine.js: ' + ', '.join(sorted(oben(t) & oben(engine))))

# ── 3 · Daten vollständig ────────────────────────────────────
probe_d = r'''
const fs=require('fs'); global.window={};
eval(fs.readFileSync(process.argv[2],'utf8')); eval(fs.readFileSync(process.argv[3],'utf8'));
const f=[], FACH=new RegExp('(^|[^A-Za-zÄÖÜäöüß])('+SIGNS.join('|')+'|Sonne|Mond|Merkur|Venus|Mars|Jupiter|Saturn|Uranus|Neptun|Pluto|Haus|Häuser|Aszendent|Knoten|Planet)([^A-Za-zÄÖÜäöüß]|$)');
if(ND_BEREICH.map(b=>b.k).join()!=='struktur,lernen,emotionen,kommunikation,energie,reize') f.push('die sechs Bereiche stimmen nicht');
const laie=b=>[b.laie,b.wasser,b.sonst,b.kontakt,b.gleich,b.anders,b.h12,b.h6,b.keine]
  .concat(Object.values(b.modus||{}),Object.values(b.element||{})).filter(Boolean);
ND_BEREICH.forEach(b=>{ ['icon','titel','frage','tech','adler','tun'].forEach(x=>{ if(!b[x]) f.push(b.k+': '+x+' fehlt'); });
  if(!/\?$/.test(b.frage)) f.push(b.k+': die Frage endet nicht mit Fragezeichen');
  laie(b).concat([b.titel,b.frage,b.adler,b.tun]).forEach(t=>{ if(FACH.test(t)) f.push(b.k+': „'+t.slice(0,50)+'…" nennt einen Fachbegriff und steht auf Stufe 0'); });
  if(b.element&&Object.keys(b.element).sort().join()!==ND_ELEMENT.slice().sort().join()) f.push(b.k+': nicht alle vier Elemente');
  if(b.modus&&Object.keys(b.modus).sort().join()!==ND_MODUS.slice().sort().join()) f.push(b.k+': nicht alle drei Arten'); });
/* Jeder eingesetzte Satz nennt eine Folge (REGELN.md 6d): kein Satz
   endet auf einen bloßen Zustand mit Doppelpunkt oder ohne Punkt. */
ND_BEREICH.forEach(b=>laie(b).forEach(t=>{ if(!/[.?]$/.test(t)) f.push(b.k+': „'+t.slice(0,40)+'…" endet nicht als Satz'); }));
if(ND_HF.length!==3) f.push(ND_HF.length+' statt 3 Fragen im Hyperfokus-Finder');
ND_HF.forEach(q=>{ ['id','t','h','lab','folge'].forEach(x=>{ if(!q[x]) f.push('Finder '+q.id+': '+x+' fehlt'); }); if(!/\?$/.test(q.t)) f.push('Finder '+q.id+': keine Frage'); });
if(ND_CHECK_SCHLUESSEL!=='ac_diagnoseweg') f.push('der Schlüssel der Abhakliste hat sich geändert, gesetzte Häkchen gingen verloren');
if(ND_CHECK.length!==11||new Set(ND_CHECK.map(c=>c[0])).size!==11) f.push('die Abhakliste hat nicht elf verschiedene Punkte');
const L={profilMit:['name'],hfZitat:['text'],hfChipsFolge:['liste'],hfBild:['feldJ','feldS'],hfBildTech:['hj','hs']};
for(const k in ND_TEXT){ const ist=(ND_TEXT[k].match(/\{([a-zA-Z0-9]+)\}/g)||[]).map(x=>x.slice(1,-1)).sort().join();
  const s=(L[k]||[]).slice().sort().join(); if(ist!==s) f.push('ND_TEXT.'+k+': Lücken {'+ist+'} statt {'+s+'}'); }
console.log(JSON.stringify({fehler:f}));
'''
pd = hier / '.probe-nd-daten.js'
pd.write_text(probe_d, encoding='utf-8')
try:
    r = subprocess.run(['node', str(pd), str(rit / 'engine.js'), str(hier / 'nd-daten.js')],
                       capture_output=True, text=True, timeout=60)
    if r.returncode != 0:
        fehler.append('Datenprüfung gescheitert: ' + (r.stderr or '')[-300:])
    else:
        fehler.extend(json.loads(r.stdout.strip().splitlines()[-1])['fehler'])
finally:
    pd.unlink(missing_ok=True)

# ── 4 · Die Rechnung besteht ihre Prüfdatei ──────────────────
r = subprocess.run(['node', str(hier / '_test-nd.js'), str(rit / 'engine.js'), str(hier / 'nd-rechner.js')],
                   capture_output=True, text=True, timeout=60)
if r.returncode != 0:
    fehler.append('_test-nd.js gescheitert: ' + (r.stderr or '')[-300:])
else:
    fehler.extend('Rechner: ' + x for x in json.loads(r.stdout.strip().splitlines()[-1])['fehler'])

# ── 5 · Keine echten Daten, keine Ferndiagnose ───────────────
for name, t in [('nd-app.js', app), ('nd-daten.js', daten), ('nd-koerper.html', koerper),
                ('nd-rechner.js', rechner), ('_test-nd.js', lies(hier / '_test-nd.js'))]:
    if re.search(r'\b1987\b', t) or re.search(r'\b08:58\b', t):
        fehler.append(f'{name}: sieht nach echten Geburtsdaten aus')
#     Eine Form, kein Textstück: ein Satz, der aus dem Geburtsbild auf
#     eine Diagnose schließt („… zeigt, dass du ADHS hast", „deutet auf
#     Autismus"). Erlaubt ist er nur als zitiertes Verbot in Anführung;
#     deshalb fallen Zitate vor der Suche weg.
def _ferndiagnose(text):
    ohne = re.sub(r'(&bdquo;|„).*?(&ldquo;|“|")', ' ', text, flags=re.S)
    ohne = re.sub(r'<[^>]+>', ' ', ohne)
    return [m.group(0) for m in re.finditer(
        r'\b(zeigt|zeigen|deutet|deuten|spricht|sprechen|weist|weisen)\b,?\s+(dass|darauf hin, dass|auf|für)\s+[^.]{0,30}?\b(ADHS|Autismus|autistisch|AuDHS)\b', ohne)]


assert _ferndiagnose('Dein Mond zeigt, dass du ADHS hast.')
assert _ferndiagnose('Diese Stellung deutet auf Autismus.')
assert not _ferndiagnose('Du sagst nie &bdquo;Dein Geburtsbild zeigt, dass du ADHS hast&ldquo;.')
assert not _ferndiagnose('<th>Das zeigt sich so</th><th>Bei ADHS eher</th>')
for name, t in [('nd-daten.js', daten), ('nd-koerper.html', koerper)]:
    for m in _ferndiagnose(t):
        fehler.append(f'{name}: „{m[:70]}" klingt nach einer Ferndiagnose')

# ── 6 · In der Anzeige steht kein Satz, und kein „dein" ──────
fehler += pruefwerk.pruefe_anzeige_satzfrei(app, 'nd-app.js', 'nd-daten.js')
fehler += pruefwerk.pruefe_anzeige_ohne_dein(app, 'nd-app.js')
for _art, _an in (('einfache', "'"), ('doppelte', '"'), ('schräge', '`')):
    _mit = app + '\nvar _gegenprobe=' + _an + 'Was dein Bild dazu sagt' + _an + ';\n'
    if not pruefwerk.pruefe_anzeige_satzfrei(_mit, 'nd-app.js', 'nd-daten.js'):
        fehler.append(f'der Riegel sieht einen Satz in {_art} Anführung nicht')
    _mit = app + '\nvar _gegenprobe=' + _an + 'für deinen Mars' + _an + ';\n'
    if not pruefwerk.pruefe_anzeige_ohne_dein(_mit, 'nd-app.js'):
        fehler.append(f'der Riegel sieht ein „dein" in {_art} Anführung nicht')
if 'toLowerCase' in app + daten + rechner:
    fehler.append('toLowerCase auf deutschem Text (REGELN.md 4)')
if re.search(r'innerHTML\s*=\s*[^;]*\bndAnt\b', app):
    fehler.append('Antworten aus dem Hyperfokus-Finder landen in innerHTML')

# ── Rauchprobe ───────────────────────────────────────────────
probe = r'''
const {chromium}=require('playwright');
(async()=>{
const f=[]; const b=await chromium.launch();
const VERBOTEN=['Konjunktion','Quadrat','Trigon','Sextil','Opposition','Orbis','Transit','Aszendent','Deszendent','Whole','Placidus',
 'Radix','Haus','Häuser','Hauses','Mondknoten','MC','IC','Planet','Planeten','Placement','Placements',
 'Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische',
 'Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];
const wort=(t,x)=>new RegExp('(?<![A-Za-zÄÖÜäöüß])'+x+'(?![A-Za-zÄÖÜäöüß])').test(t);
const ueber=async(pg,wo)=>{ const r=await pg.evaluate(()=>{const w=document.documentElement.clientWidth; const r=[];
  document.querySelectorAll('body *').forEach(e=>{ if(e.closest('.nd-tabbox')) return; const bb=e.getBoundingClientRect();
    if(bb.width>0&&(bb.right>w+1.5||bb.left<-1.5)) r.push(e.tagName+'.'+(e.className.baseVal===undefined?e.className:'')+' '+Math.round(bb.right)); });
  return {r:r.slice(0,4),sw:document.documentElement.scrollWidth,w}; });
  if(r.r.length||r.sw>r.w+1) f.push(wo+': läuft auf 390px über: '+r.r.join(' | ')); };
const stufe0=async(pg,wo)=>{ await pg.evaluate(()=>AC_NIV.setzen(0)); await pg.waitForTimeout(300);
  const t=await pg.evaluate(()=>document.body.innerText);
  const m=VERBOTEN.filter(x=>wort(t,x)); if(m.length) f.push(wo+', Stufe 0: '+m.join(', '));
  if(/\d°/.test(t)) f.push(wo+', Stufe 0: Gradzahlen');
  const s=await pg.evaluate(()=>({h:document.querySelector('.nd-hinweis').checkVisibility(), c:document.getElementById('chart').checkVisibility(),
    teile:['verstehen','abklaerung','leben'].every(i=>document.getElementById(i).checkVisibility())}));
  if(!s.h) f.push(wo+', Stufe 0: der Hinweis auf die Stufe fehlt');
  if(s.c) f.push(wo+', Stufe 0: der Abschnitt zum Geburtsbild ist sichtbar');
  if(!s.teile) f.push(wo+', Stufe 0: Verstehen, Abklärung oder Leben fehlt'); };

/* A · ohne Profil */
const c1=await b.newContext({viewport:{width:390,height:844}});
const p=await c1.newPage(); p.on('pageerror',e=>f.push('Skriptfehler ohne Profil: '+String(e.message).slice(0,160)));
await p.goto('file://ZIEL'); await p.waitForTimeout(700);
const a=await p.evaluate(()=>({b:document.querySelectorAll('#ndbereiche .nd-bereich').length, tech:document.querySelectorAll('#ndbereiche .nd-tech').length,
  profil:document.getElementById('ndprofil').textContent, check:document.querySelectorAll('#ndcheck input').length,
  hf:document.querySelectorAll('#ndhf textarea').length, chips:document.querySelectorAll('#ndhfchips button').length, go:document.getElementById('ndhfgo').disabled}));
if(a.b!==6) f.push(a.b+' statt 6 Bereiche');
if(a.tech) f.push('ohne Profil stehen trotzdem Stellungen da');
if(!/Profile/.test(a.profil)) f.push('ohne Profil fehlt der Hinweis auf Profile');
if(a.check!==11) f.push(a.check+' statt 11 Punkte auf der Abhakliste');
if(a.hf!==3||a.chips!==9) f.push('der Hyperfokus-Finder ist unvollständig');
if(!a.go) f.push('die Auswertung lässt sich ohne Antwort auslösen');
await stufe0(p,'ohne Profil');
/* Die Antwort wird als Text eingesetzt, nie als HTML */
await p.fill('#ndhfvergessen','<img src=x id=boese>Modellbau');
await p.evaluate(()=>document.querySelectorAll('#ndhfchips button')[2].click());
await p.click('#ndhfgo'); await p.waitForTimeout(150);
const e=await p.evaluate(()=>({img:!!document.getElementById('boese'), t:document.getElementById('ndhferg').innerText}));
if(e.img) f.push('eine Antwort im Hyperfokus-Finder wird als HTML ausgeführt');
if(!/Modellbau/.test(e.t)||!/am Rechner/.test(e.t)) f.push('die Auswertung zeigt die Antwort oder die Bedingungen nicht');
/* Die Abhakliste merkt sich ein Häkchen unter dem alten Schlüssel */
await p.click('#ndczeugnisse'); await p.reload(); await p.waitForTimeout(500);
const k=await p.evaluate(()=>({an:document.getElementById('ndczeugnisse').checked, s:localStorage.getItem('ac_diagnoseweg')}));
if(!k.an||!/zeugnisse/.test(k.s||'')) f.push('die Abhakliste merkt sich das Häkchen nicht');
await p.evaluate(()=>document.getElementById('ndstufe').click()); await p.waitForTimeout(300);
const s1=await p.evaluate(()=>({n:document.body.classList.contains('niv-1'), c:document.getElementById('chart').checkVisibility(), h:document.querySelector('.nd-hinweis').checkVisibility()}));
if(!s1.n||!s1.c||s1.h) f.push('der Knopf im Hinweis stellt nicht auf Stufe 1 oder blendet den Abschnitt zum Geburtsbild nicht ein');
await ueber(p,'ohne Profil, Stufe 1');

/* B · mit erfundenem Profil */
const c2=await b.newContext({viewport:{width:390,height:844}});
await c2.addInitScript(()=>{ localStorage.setItem('ac_profile_v1',JSON.stringify({v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:[
  {id:'p1',name:'Probe Reiz',alias:'',y:1979,mo:11,d:30,h:5,mi:15,tz:1,lat:53.08,lon:8.8,ort:'Bremen',
   wlat:53.08,wlon:8.8,wort:'Bremen',eigen:true,readings:[]}]})); localStorage.setItem('ac_niveau','2'); });
const q=await c2.newPage(); q.on('pageerror',e=>f.push('Skriptfehler mit Profil: '+String(e.message).slice(0,160)));
await q.goto('file://ZIEL'); await q.waitForTimeout(700);
const bq=await q.evaluate(()=>{ const S=ndStellen(AC_P.aktives());
  const karten=[...document.querySelectorAll('#ndbereiche .nd-bereich')].map(x=>({t:x.querySelector('.nd-zeile p').textContent, tech:x.querySelector('.nd-tech').textContent}));
  const E=['Feuer','Erde','Luft','Wasser'];
  const soll=[
    ND_BEREICH[0].modus[ND_MODUS[S.mondModus]], ND_BEREICH[1].element[E[S.merkurZ%4]],
    E[S.mondZ%4]==='Wasser'?ND_BEREICH[2].wasser:HT[S.mondHaus-1], (S.ascZ%4===S.merkurZ%4)?ND_BEREICH[3].gleich:ND_BEREICH[3].anders,
    ND_BEREICH[4].element[E[S.marsZ%4]], S.h12.length?ND_BEREICH[5].h12:(S.h6.length?ND_BEREICH[5].h6:ND_BEREICH[5].keine)];
  const techSoll=['Saturn im '+S.saturnHaus+'. Haus','Merkur in '+SIGNS[S.merkurZ],'Mond in '+SIGNS[S.mondZ],'Aszendent in '+SIGNS[S.ascZ],'Mars in '+SIGNS[S.marsZ],'12. Haus: '];
  return {karten, soll, techSoll, kontakt:[S.mondNeptun,S.marsSaturn], profil:document.getElementById('ndprofil').textContent}; });
if(!/Probe Reiz/.test(bq.profil)) f.push('das aktive Profil wird nicht genannt');
bq.karten.forEach((x,i)=>{ if(x.t.indexOf(bq.soll[i])<0) f.push('Bereich '+(i+1)+': der Satz passt nicht zur gerechneten Stellung');
  if(x.tech.indexOf(bq.techSoll[i])!==0) f.push('Bereich '+(i+1)+': Fachzeile „'+x.tech+'"'); });
if(/Neptun/.test(bq.karten[2].tech)!==bq.kontakt[0]) f.push('Emotionen: der Neptun-Kontakt stimmt nicht mit der Rechnung überein');
if(/Saturn/.test(bq.karten[4].tech)!==bq.kontakt[1]) f.push('Energie: der Saturn-Kontakt stimmt nicht mit der Rechnung überein');
await q.fill('#ndhfselbst','Gitarre'); await q.click('#ndhfgo'); await q.waitForTimeout(150);
const hb=await q.evaluate(()=>{ const S=ndStellen(AC_P.aktives()); const t=document.getElementById('ndhferg').innerText;
  return {ok:t.indexOf(HT[S.jupiterHaus-1])>=0&&t.indexOf(HT[S.sonneHaus-1])>=0}; });
if(!hb.ok) f.push('die Auswertung nennt die gerechneten Lebensbereiche nicht');
await ueber(q,'mit Profil, Stufe 2');
await stufe0(q,'mit Profil');
const t0=await q.evaluate(()=>[...document.querySelectorAll('#ndbereiche .nd-zeile p')].filter(x=>x.checkVisibility()).length);
if(t0<12) f.push('mit Profil sind die Sätze der Bereiche auf Stufe 0 nicht zu sehen');
await ueber(q,'mit Profil, Stufe 0');
console.log(JSON.stringify({fehler:f})); await b.close();})();
'''
pp = hier / '.probe-nd.js'
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
print(f'      anders-verdrahtet.html: {len(html)//1024} KB, fünf alte Adressen leiten weiter')
