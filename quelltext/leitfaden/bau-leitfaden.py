#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut leitfaden.html — „Menschen ansprechen", Teil von Schritt 5 aus
ENTWURF-NEUE-SEITE.md.

Fünf Seiten werden eine: leitfaden.html (die Übersicht) und die vier
Kompasse leitfaden-mond.html, leitfaden-merkur.html, leitfaden-mars.html
und leitfaden-fundament.html. Die Adresse leitfaden.html bleibt, die vier
anderen leiten auf ihren Abschnitt weiter.

nd-leitfaden.html heißt auch Leitfaden, ist aber keiner in diesem Sinn:
kein Gesprächswerkzeug für die Coachin, sondern eine Seite für
anders verdrahtete Menschen selbst, mit eigenem Werkzeug. Sie gehört
zu den Neurodivergenz-Seiten und bleibt hier draußen.

Neu gegenüber den alten Seiten: Mit einem aktiven Profil steht oben,
wie man genau diesen Menschen anspricht — Ton, Erklären, Tun, Fundament.
Auf Stufe 0 ohne einen Fachbegriff; die Stellung steht ab Stufe 2 daneben.
Die Seite ist von Anfang an satzfrei (Aufgabe 34).
"""
import pathlib, re, sys, subprocess, json

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit = hier.parent / 'rituale'
sys.path.insert(0, str(rit))
import pruefwerk


def lies(p):
    return p.read_text(encoding='utf-8')


koerper = lies(hier / 'leitfaden-koerper.html')
app = lies(hier / 'leitfaden-app.js')
daten = lies(hier / 'leitfaden-daten.js')
rechner = lies(hier / 'leitfaden-rechner.js')
stil = lies(hier / 'leitfaden-stil.css')
engine = lies(rit / 'engine.js')
appkopf = lies(hier.parent / 'app' / 'app-kopf.html')

SKRIPTE = ['profil.js', 'begriffe.js', 'niveau.js', 'wortwahl.js']
html = ('<!DOCTYPE html><html lang="de"><head>' + appkopf + '<meta charset="UTF-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        '<title>Menschen ansprechen &middot; Coaching-Leitfaden &middot; Astro-Charlie</title>\n'
        '<meta name="description" content="Wie du jemanden abholst: in welchem Ton, wie du erklärst, wie er ins Tun kommt und was er schon mitbringt.">\n'
        '<link rel="preconnect" href="https://fonts.googleapis.com">'
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
        '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">\n'
        + '\n'.join(f'<script src="{s}"{"" if s == "profil.js" else " defer"}></script>' for s in SKRIPTE)
        + '\n<style>\n' + lies(rit / 'basis.css') + '\n' + stil + '</style>\n</head><body>\n'
        + koerper + '\n<script>\n' + engine + '\n' + daten + '\n' + rechner + '\n' + app
        + '\n</script>\n</body></html>\n')
ziel = wiki / 'leitfaden.html'
ziel.write_text(html, encoding='utf-8')

WEITER = {'leitfaden-mond.html': ('mond', 'Den Mond ansprechen'),
          'leitfaden-merkur.html': ('merkur', 'Den Merkur ansprechen'),
          'leitfaden-mars.html': ('mars', 'Den Mars ansprechen'),
          'leitfaden-fundament.html': ('fundament', 'Das Fundament: Südknoten und IC')}
for alt, (anker, titel) in WEITER.items():
    (wiki / alt).write_text(
        '<!DOCTYPE html><html lang="de"><head>' + appkopf + '<meta charset="UTF-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        f'<title>{titel} &middot; jetzt im Coaching-Leitfaden</title>\n'
        f'<link rel="canonical" href="leitfaden.html#{anker}">\n'
        f'<meta http-equiv="refresh" content="0; url=leitfaden.html#{anker}">\n'
        '<meta name="robots" content="noindex">\n'
        '</head><body style="font-family:system-ui,sans-serif;padding:40px 20px;max-width:560px;margin:0 auto">\n'
        f'<p>{titel} steht jetzt im <a href="leitfaden.html#{anker}">Coaching-Leitfaden</a>.</p>\n'
        '</body></html>\n', encoding='utf-8')

fehler = []

# ── 1 · IDs und Tags ─────────────────────────────────────────
ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
for k in ('mond', 'merkur', 'mars'):
    gesucht.add('lfk' + k)
if gesucht - ids:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(gesucht - ids)))
for anker in re.findall(r'href="#([a-z0-9-]+)"', koerper):
    if anker not in ids:
        fehler.append('Sprungmarke ins Leere: #' + anker)
for anker, _ in WEITER.values():
    if anker not in ids:
        fehler.append('eine Weiterleitung zeigt auf #' + anker + ', das es nicht gibt')
for k in ('Mond', 'Merkur', 'Mars'):
    if not re.search(r'id="' + k.lower() + r'"[^>]*>\s*<div class="lf-eyebrow" id="lfk' + k.lower()
                     + r'"></div>\s*<h2[^>]*></h2>\s*<div class="lf-kompass" data-k="' + k + '">', koerper):
        fehler.append(f'der Abschnitt #{k.lower()} trägt nicht den Kompass {k}')
for tag in ('div', 'section', 'nav', 'ol', 'ul', 'p', 'header'):
    a, z = len(re.findall(r'<' + tag + r'\b', koerper)), len(re.findall(r'</' + tag + '>', koerper))
    if a != z:
        fehler.append(f'{a} <{tag}> gegen {z} </{tag}> im Körper')

# ── 2 · Eine Himmelsrechnung, keine Namenskollision ──────────
for verraeter, was in [('0.38709927', 'Bahnelemente'), ('function nodeLon', 'ein eigener Mondknoten'),
                       ('function geo(', 'eine eigene geo'), ('function chartVon', 'ein eigenes chartVon')]:
    for name, t in [('leitfaden-app.js', app), ('leitfaden-daten.js', daten), ('leitfaden-rechner.js', rechner)]:
        if verraeter in t:
            fehler.append(f'{name} enthält wieder {was}')
oben = lambda s: set(re.findall(r'^(?:var|function)\s+([A-Za-z_]\w*)', s, re.M))
for name, t in [('leitfaden-daten.js', daten), ('leitfaden-rechner.js', rechner)]:
    if oben(t) & oben(engine):
        fehler.append(f'{name}: Namen kollidieren mit engine.js: ' + ', '.join(sorted(oben(t) & oben(engine))))

# ── 3 · Daten vollständig ────────────────────────────────────
probe_d = r'''
const fs=require('fs'); global.window={};
eval(fs.readFileSync(process.argv[2],'utf8')); eval(fs.readFileSync(process.argv[3],'utf8'));
const f=[], ZN=new RegExp('(^|[^A-Za-zÄÖÜäöüß])('+SIGNS.join('|')+'|Mond|Merkur|Mars|Venus|Saturn|Jupiter|Knoten|Südknoten|Nordknoten|Haus|IC|MC)([^A-Za-zÄÖÜäöüß]|$)');
['Mond','Merkur','Mars'].forEach(k=>{ const K=LF_KOMPASS[k];
  if(!K) { f.push('Kompass '+k+' fehlt'); return; }
  ['label','um','titel','kompass','kurz','warum'].forEach(x=>{ if(!K[x]) f.push(k+': '+x+' fehlt'); });
  [K.label,K.um].forEach(x=>{ if(ZN.test(x||'')) f.push(k+': „'+x+'" steht auf Stufe 0 und nennt einen Fachnamen'); });
  if(K.k.length!==12) f.push(k+': '+K.k.length+' statt 12 Zeichen');
  K.k.forEach((c,i)=>{ ['bringt','sprich','frage','vermeide'].forEach(x=>{
      if(!c[x]||c[x].length<20) f.push(k+' in '+SIGNS[i]+': '+x+' fehlt oder zu kurz');
      else if(ZN.test(c[x])) f.push(k+' in '+SIGNS[i]+': '+x+' nennt einen Fachnamen und steht auf Stufe 0'); });
    if(/[»«]/.test(c.frage)) f.push(k+' in '+SIGNS[i]+': die Frage trägt noch die alten Anführungszeichen');
    if(!/\?$/.test(c.frage)) f.push(k+' in '+SIGNS[i]+': die Frage endet nicht mit Fragezeichen'); }); });
if(LF_SK.length!==12) f.push(LF_SK.length+' statt 12 Südknoten');
LF_SK.forEach((c,i)=>{ if(c.nk!==SIGNS[(i+6)%12]) f.push('Südknoten in '+SIGNS[i]+': Nordknoten '+c.nk+' liegt nicht gegenüber');
  ['bringt','waechst'].forEach(x=>{ if(!c[x]||c[x].length<30) f.push('Südknoten in '+SIGNS[i]+': '+x+' fehlt');
    else if(ZN.test(c[x])) f.push('Südknoten in '+SIGNS[i]+': '+x+' nennt einen Fachnamen'); }); });
[LF_FUNDAMENT.label,LF_FUNDAMENT.um].forEach(x=>{ if(ZN.test(x)) f.push('Fundament: „'+x+'" nennt einen Fachnamen'); });
if(LF_ELEMENTNAME.join()!=='Feuer,Erde,Luft,Wasser') f.push('Elemente in falscher Reihenfolge');
const LUECKEN={profilMit:['name'],tech:['punkt','zeichen'],techSk:['gegen','zeichen'],nk:['zeichen'],skTitel:['zeichen']};
for(const k in LF_TEXT){ const ist=(LF_TEXT[k].match(/\{([a-zA-Z]+)\}/g)||[]).map(x=>x.slice(1,-1)).sort().join();
  const s=(LUECKEN[k]||[]).slice().sort().join(); if(ist!==s) f.push('LF_TEXT.'+k+': Lücken {'+ist+'} statt {'+s+'}'); }
console.log(JSON.stringify({fehler:f}));
'''
pd = hier / '.probe-leitfaden-daten.js'
pd.write_text(probe_d, encoding='utf-8')
try:
    r = subprocess.run(['node', str(pd), str(rit / 'engine.js'), str(hier / 'leitfaden-daten.js')],
                       capture_output=True, text=True, timeout=60)
    if r.returncode != 0:
        fehler.append('Datenprüfung gescheitert: ' + (r.stderr or '')[-300:])
    else:
        fehler.extend(json.loads(r.stdout.strip().splitlines()[-1])['fehler'])
finally:
    pd.unlink(missing_ok=True)

# ── 4 · Die Rechnung besteht ihre Prüfdatei ──────────────────
r = subprocess.run(['node', str(hier / '_test-leitfaden.js'), str(rit / 'engine.js'), str(hier / 'leitfaden-rechner.js')],
                   capture_output=True, text=True, timeout=60)
if r.returncode != 0:
    fehler.append('_test-leitfaden.js gescheitert: ' + (r.stderr or '')[-300:])
else:
    fehler.extend('Rechner: ' + x for x in json.loads(r.stdout.strip().splitlines()[-1])['fehler'])

# ── 5 · Keine echten Daten ───────────────────────────────────
for name, t in [('leitfaden-app.js', app), ('leitfaden-daten.js', daten), ('leitfaden-koerper.html', koerper),
                ('leitfaden-rechner.js', rechner), ('_test-leitfaden.js', lies(hier / '_test-leitfaden.js'))]:
    if re.search(r'\b1987\b', t) or re.search(r'\b08:58\b', t):
        fehler.append(f'{name}: sieht nach echten Geburtsdaten aus')

# ── 6 · In der Anzeige steht kein Satz, und kein „dein" ──────
fehler += pruefwerk.pruefe_anzeige_satzfrei(app, 'leitfaden-app.js', 'leitfaden-daten.js')
fehler += pruefwerk.pruefe_anzeige_ohne_dein(app, 'leitfaden-app.js')
for _art, _an in (('einfache', "'"), ('doppelte', '"'), ('schräge', '`')):
    _mit = app + '\nvar _gegenprobe=' + _an + 'So sprichst du mit ihr' + _an + ';\n'
    if not pruefwerk.pruefe_anzeige_satzfrei(_mit, 'leitfaden-app.js', 'leitfaden-daten.js'):
        fehler.append(f'der Riegel sieht einen Satz in {_art} Anführung nicht')
    _mit = app + '\nvar _gegenprobe=' + _an + 'für deinen Mond' + _an + ';\n'
    if not pruefwerk.pruefe_anzeige_ohne_dein(_mit, 'leitfaden-app.js'):
        fehler.append(f'der Riegel sieht ein „dein" in {_art} Anführung nicht')
if 'toLowerCase' in app + daten + rechner:
    fehler.append('toLowerCase auf deutschem Text (REGELN.md 4)')

# ── Rauchprobe ───────────────────────────────────────────────
probe = r'''
const {chromium}=require('playwright');
(async()=>{
const f=[]; const b=await chromium.launch();
const VERBOTEN=['Konjunktion','Quadrat','Trigon','Sextil','Opposition','Orbis','Transit','Aszendent','Deszendent','Whole','Placidus',
 'Radix','Haus','Häuser','Hauses','Mondknoten','Südknoten','Nordknoten','MC','IC','Imum','Planet','Planeten',
 'Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische',
 'Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];
const wort=(t,x)=>new RegExp('(?<![A-Za-zÄÖÜäöüß])'+x+'(?![A-Za-zÄÖÜäöüß])').test(t);
const ueber=async(pg,wo)=>{ const r=await pg.evaluate(()=>{const w=document.documentElement.clientWidth; const r=[];
  document.querySelectorAll('body *').forEach(e=>{ const bb=e.getBoundingClientRect();
    if(bb.width>0&&(bb.right>w+1.5||bb.left<-1.5)) r.push(e.tagName+'.'+(e.className.baseVal===undefined?e.className:'')+' '+Math.round(bb.right)); });
  return {r:r.slice(0,4),sw:document.documentElement.scrollWidth,w}; });
  if(r.r.length||r.sw>r.w+1) f.push(wo+': läuft auf 390px über: '+r.r.join(' | ')); };
const stufe0=async(pg,wo)=>{ await pg.evaluate(()=>AC_NIV.setzen(0)); await pg.waitForTimeout(300);
  const t=await pg.evaluate(()=>document.body.innerText);
  const m=VERBOTEN.filter(x=>wort(t,x)); if(m.length) f.push(wo+', Stufe 0: '+m.join(', '));
  if(/\d°/.test(t)) f.push(wo+', Stufe 0: Gradzahlen');
  const s=await pg.evaluate(()=>({h:document.querySelector('.lf-hinweis').checkVisibility(), k:['mond','merkur','mars','fundament','beispiel'].some(i=>document.getElementById(i).checkVisibility())}));
  if(!s.h) f.push(wo+', Stufe 0: der Hinweis auf die Stufe fehlt');
  if(s.k) f.push(wo+', Stufe 0: ein Kompass ist sichtbar'); };

/* A · ohne Profil */
const c1=await b.newContext({viewport:{width:390,height:844}});
const p=await c1.newPage(); p.on('pageerror',e=>f.push('Skriptfehler ohne Profil: '+String(e.message).slice(0,160)));
await p.goto('file://ZIEL'); await p.waitForTimeout(700);
const a=await p.evaluate(()=>({felder:document.querySelectorAll('#lffelder .lf-feld').length, profil:document.getElementById('lfprofil').textContent,
  k:['Mond','Merkur','Mars'].map(k=>document.querySelectorAll('[data-k="'+k+'"] .lf-k').length), sk:document.querySelectorAll('#lfsk .lf-k').length,
  h:['mond','merkur','mars'].map(i=>document.querySelector('#'+i+' h2').textContent), soll:['Mond','Merkur','Mars'].map(k=>LF_KOMPASS[k].titel),
  bei:document.querySelectorAll('.lf-k-bei').length}));
if(a.felder) f.push('ohne Profil stehen trotzdem Felder für einen Menschen da');
if(!/Profile/.test(a.profil)) f.push('ohne Profil fehlt der Hinweis auf Profile');
if(a.k.join()!=='12,12,12') f.push('Kompasse: '+a.k.join()+' statt je 12 Karten');
if(a.sk!==12) f.push(a.sk+' statt 12 Südknoten-Karten');
if(a.h.join()!==a.soll.join()) f.push('die Überschriften der Kompasse stimmen nicht: '+a.h.join(' | '));
if(a.bei) f.push('ohne Profil ist trotzdem eine Karte markiert');
await p.evaluate(()=>AC_NIV.setzen(2)); await p.waitForTimeout(200);
const emoji=await p.evaluate(()=>{ const t=document.body.innerText+[...document.querySelectorAll('svg text')].map(x=>x.textContent).join(' ');
  return (t.match(/[\u2600-\u26FF](?!\uFE0E)/g)||[]).slice(0,5).join(' '); });
if(emoji) f.push('Symbole ohne Textform (U+FE0E), sie erscheinen als Emoji: '+emoji);
await stufe0(p,'ohne Profil');
await p.evaluate(()=>document.getElementById('lfstufe').click()); await p.waitForTimeout(300);
const s1=await p.evaluate(()=>({n:document.body.classList.contains('niv-1'), k:['mond','merkur','mars','fundament'].every(i=>document.getElementById(i).checkVisibility()), h:document.querySelector('.lf-hinweis').checkVisibility()}));
if(!s1.n||!s1.k||s1.h) f.push('der Knopf im Hinweis stellt nicht auf Stufe 1 oder blendet die Kompasse nicht ein');
await ueber(p,'ohne Profil, Stufe 1');

/* B · mit erfundenem Profil */
const c2=await b.newContext({viewport:{width:390,height:844}});
await c2.addInitScript(()=>{ localStorage.setItem('ac_profile_v1',JSON.stringify({v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:[
  {id:'p1',name:'Probe Ton',alias:'',y:1983,mo:4,d:17,h:16,mi:10,tz:2,lat:50.94,lon:6.96,ort:'Köln',
   wlat:50.94,wlon:6.96,wort:'Köln',eigen:true,readings:[]}]})); localStorage.setItem('ac_niveau','2'); });
const q=await c2.newPage(); q.on('pageerror',e=>f.push('Skriptfehler mit Profil: '+String(e.message).slice(0,160)));
await q.goto('file://ZIEL'); await q.waitForTimeout(700);
const bq=await q.evaluate(()=>{ const S=lfStellen(AC_P.aktives());
  const felder=[...document.querySelectorAll('#lffelder .lf-feld')].map(x=>({dd:[...x.querySelectorAll('dd')].map(d=>d.textContent), tech:x.querySelector('.tech').textContent}));
  const soll=['Mond','Merkur','Mars'].map(k=>{ const c=LF_KOMPASS[k].k[S[k]]; return {dd:[c.sprich,c.frage,c.vermeide], tech:k+' in '+SIGNS[S[k]]}; });
  soll.push({dd:[LF_SK[S.Suedknoten].bringt,LF_SK[S.Suedknoten].waechst], tech:'Südknoten in '+SIGNS[S.Suedknoten]+', Nordknoten in '+SIGNS[(S.Suedknoten+6)%12]});
  const chips=['Mond','Merkur','Mars'].map(k=>[...document.querySelectorAll('[data-k="'+k+'"] .lf-k')].findIndex(x=>x.classList.contains('lf-k-bei')));
  const skc=[...document.querySelectorAll('#lfsk .lf-k')].findIndex(x=>x.classList.contains('lf-k-bei'));
  return {felder, soll, chips, sollChips:['Mond','Merkur','Mars'].map(k=>S[k]), skc, sollSk:S.Suedknoten, profil:document.getElementById('lfprofil').textContent}; });
if(!/Probe Ton/.test(bq.profil)) f.push('das aktive Profil wird nicht genannt');
if(bq.felder.length!==4) f.push(bq.felder.length+' statt 4 Felder für den Menschen');
bq.felder.forEach((x,i)=>{ const s=bq.soll[i]; if(!s) return;
  if(x.dd.join('|')!==s.dd.join('|')) f.push('Feld '+(i+1)+': die Sätze passen nicht zur gerechneten Stellung');
  if(x.tech!==s.tech) f.push('Feld '+(i+1)+': Fachzeile „'+x.tech+'" statt „'+s.tech+'"'); });
if(bq.chips.join()!==bq.sollChips.join()) f.push('„Dieses Profil" steht im Kompass beim falschen Zeichen');
if(bq.skc!==bq.sollSk) f.push('„Dieses Profil" steht beim falschen Südknoten');
await ueber(q,'mit Profil, Stufe 2');
await stufe0(q,'mit Profil');
const f0=await q.evaluate(()=>document.querySelectorAll('#lffelder .lf-feld').length&&document.querySelector('#lffelder .lf-feld dd').checkVisibility());
if(!f0) f.push('mit Profil sind die Felder auf Stufe 0 nicht zu sehen');
await ueber(q,'mit Profil, Stufe 0');
console.log(JSON.stringify({fehler:f})); await b.close();})();
'''
pp = hier / '.probe-leitfaden.js'
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
print(f'      leitfaden.html: {len(html)//1024} KB, vier alte Adressen leiten weiter')
