#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut planeten.html — Schritt 4 aus ENTWURF-NEUE-SEITE.md, dritter Teil.

Zehn Seiten werden eine: planeten.html, planeten-in-zeichen.html, die
sieben planet-*.html (Sonne bis Saturn durch die zwölf Zeichen) und
planetenzyklen.html. Die Adresse planeten.html bleibt, die neun
anderen leiten auf die passende Stelle weiter.

planeten-in-haeusern.html bleibt ein eigenes Werkzeug, wie
haeuser-karte.html neben der Häuserseite: 2448 Kombinationen mit vier
Blickwinkeln sind kein Lesetext, sondern ein Nachschlagegerät. Es wird
von hier aus verlinkt.

Beim Zusammenlegen kamen drei Dinge heraus:

  1. Die Einzelseiten sagten „Hier ist der Mond zuhause" mitten im
     Text. Ohne das Zeichen daneben sagt der Satz nichts; er steht
     jetzt getrennt und erst ab Stufe 1.
  2. Der Zyklenrechner rechnete nur mit dem Geburtsjahr, auch wenn ein
     Profil da war, und schrieb selbst dazu, dass die Uranus-Opposition
     so nicht stimmt. Mit Profil wird jetzt gegen engine.js gerechnet,
     auf etwa einen Monat genau; ohne Profil bleibt die Jahrestabelle.
  3. Die Seite ist von Anfang an satzfrei: Sätze in planeten-daten.js,
     „dein" über B_BEUGE (Aufgabe 34). Sie muss nicht in die Liste der
     Anzeigen, die noch umziehen.
"""
import pathlib, re, sys, subprocess, json

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit = hier.parent / 'rituale'
sys.path.insert(0, str(rit))
import pruefwerk


def lies(p):
    return p.read_text(encoding='utf-8')


koerper = lies(hier / 'planeten-koerper.html')
app = lies(hier / 'planeten-app.js')
daten = lies(hier / 'planeten-daten.js')
rechner = lies(hier / 'planeten-rechner.js')
stil = lies(hier / 'planeten-stil.css')
engine = lies(rit / 'engine.js')
bahn = lies(hier.parent / 'kern' / 'bahn-daten.js')
appkopf = lies(hier.parent / 'app' / 'app-kopf.html')

SKRIPTE = ['profil.js', 'begriffe.js', 'niveau.js', 'wortwahl.js']
html = ('<!DOCTYPE html><html lang="de"><head>' + appkopf + '<meta charset="UTF-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        '<title>Die zehn Planeten &middot; in den Zeichen &middot; Zyklen &middot; Astro-Charlie</title>\n'
        '<meta name="description" content="Zehn Kräfte in dir: was jede bedeutet, wie sie durch die zwölf Zeichen geht und wann die großen Zyklen wiederkommen.">\n'
        '<link rel="preconnect" href="https://fonts.googleapis.com">'
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
        '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">\n'
        + '\n'.join(f'<script src="{s}"{"" if s == "profil.js" else " defer"}></script>' for s in SKRIPTE)
        + '\n<style>\n' + lies(rit / 'basis.css') + '\n' + stil + '</style>\n</head><body>\n'
        + koerper + '\n<script>\n' + engine + '\n' + bahn + '\n' + daten + '\n' + rechner + '\n' + app
        + '\n</script>\n</body></html>\n')
ziel = wiki / 'planeten.html'
ziel.write_text(html, encoding='utf-8')

PLANETEN7 = ['sonne', 'mond', 'merkur', 'venus', 'mars', 'jupiter', 'saturn']
WEITER = {'planeten-in-zeichen.html': ('zeichen', 'Planeten in den Zeichen'),
          'planetenzyklen.html': ('zyklen', 'Planetenzyklen')}
for p in PLANETEN7:
    WEITER[f'planet-{p}.html'] = (f'zeichen-{p}', p.capitalize() + ' in den Zeichen')
for alt, (anker, titel) in WEITER.items():
    (wiki / alt).write_text(
        '<!DOCTYPE html><html lang="de"><head>' + appkopf + '<meta charset="UTF-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        f'<title>{titel} &middot; jetzt auf der Planetenseite</title>\n'
        f'<link rel="canonical" href="planeten.html#{anker}">\n'
        f'<meta http-equiv="refresh" content="0; url=planeten.html#{anker}">\n'
        '<meta name="robots" content="noindex">\n'
        '</head><body style="font-family:system-ui,sans-serif;padding:40px 20px;max-width:560px;margin:0 auto">\n'
        f'<p>{titel} steht jetzt auf der <a href="planeten.html#{anker}">Planetenseite</a>.</p>\n'
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
for p in PLANETEN7:
    if not re.search(r'id="zeichen-' + p + r'" data-k="' + p.capitalize() + '"', koerper):
        fehler.append(f'der Reiter zeichen-{p} trägt nicht den Planeten, auf den die alte Adresse zeigt')
for tag in ('div', 'section', 'nav', 'table', 'svg', 'ol', 'ul', 'p', 'header'):
    a, z = len(re.findall(r'<' + tag + r'\b', koerper)), len(re.findall(r'</' + tag + '>', koerper))
    if a != z:
        fehler.append(f'{a} <{tag}> gegen {z} </{tag}> im Körper')

# ── 2 · Eine Himmelsrechnung, keine Namenskollision ──────────
for verraeter, was in [('0.38709927', 'Bahnelemente'), ('function sunLon', 'eine eigene sunLon'),
                       ('function geo(', 'eine eigene geo'), ('function angles', 'eine eigene angles'),
                       ('function chartVon', 'ein eigenes chartVon')]:
    for name, t in [('planeten-app.js', app), ('planeten-daten.js', daten), ('planeten-rechner.js', rechner)]:
        if verraeter in t:
            fehler.append(f'{name} enthält wieder {was}')
oben = lambda s: set(re.findall(r'^(?:var|function)\s+([A-Za-z_]\w*)', s, re.M))
for name, t in [('planeten-daten.js', daten), ('planeten-rechner.js', rechner)]:
    koll = oben(t) & (oben(engine) | oben(bahn))
    if koll:
        fehler.append(f'{name}: Namen kollidieren mit engine.js oder bahn-daten.js: ' + ', '.join(sorted(koll)))
if oben(daten) & oben(rechner):
    fehler.append('Daten und Rechner benutzen dieselben Namen: ' + ', '.join(sorted(oben(daten) & oben(rechner))))

# ── 3 · Daten vollständig ────────────────────────────────────
probe_d = r'''
const fs=require('fs'); global.window={};
eval(fs.readFileSync(process.argv[2],'utf8')); eval(fs.readFileSync(process.argv[3],'utf8')); eval(fs.readFileSync(process.argv[4],'utf8'));
const f=[], ALLE=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];
if(PL_KRAFT.length!==10) f.push(PL_KRAFT.length+' statt 10 Kräfte');
PL_KRAFT.forEach((K,i)=>{ if(K.k!==ALLE[i]) f.push((i+1)+': '+K.k+' statt '+ALLE[i]);
  ['gl','titel','was','frage'].forEach(x=>{ if(!K[x]) f.push(K.k+': '+x+' fehlt'); });
  if(K.was&&K.was.length<40) f.push(K.k+': die Erklärung ist zu kurz');
  if(!/\?$/.test(K.frage||'')) f.push(K.k+': die Frage endet nicht mit Fragezeichen');
  if(!PL_GRUPPE[K.gruppe]) f.push(K.k+': unbekannte Gruppe '+K.gruppe);
  if(!B_ZIEL[K.k]) f.push(K.k+': B_ZIEL kennt diesen Punkt nicht, die Beugung fiele auf „dein" zurück'); });
const soll={Sonne:'deine Sonne',Mond:'dein Mond',Venus:'deine Venus',Pluto:'dein Pluto'};
for(const k in soll){ const b=B_BEUGE(B_PUNKT(k),'nom'); if(b!==soll[k]) f.push('Beugung: '+b+' statt '+soll[k]); }
const ZK=Object.keys(PL_ZEICHEN);
if(ZK.join()!==ALLE.slice(0,7).join()) f.push('Planeten in den Zeichen: '+ZK.join()+' statt Sonne bis Saturn');
ZK.forEach(k=>{ const Z=PL_ZEICHEN[k];
  if(!Z.kurz||!Z.tip) f.push(k+': Einleitung fehlt');
  if(Z.z.length!==12) f.push(k+': '+Z.z.length+' statt 12 Zeichen');
  if(Z.wuerde.length!==12) f.push(k+': '+Z.wuerde.length+' statt 12 Würdeangaben');
  Z.z.forEach((t,i)=>{ if(!t||t.length<60) f.push(k+' in '+SIGNS[i]+': Text fehlt oder zu kurz');
    if(/Hier ist .* (zuhause|stark)/.test(t)) f.push(k+' in '+SIGNS[i]+': „Hier ist … zuhause" steht im Text statt getrennt');
    if(new RegExp('(^|[^A-Za-zÄÖÜäöüß])('+SIGNS.join('|')+')([^A-Za-zÄÖÜäöüß]|$)').test(t)) f.push(k+' in '+SIGNS[i]+': nennt ein Zeichen und erscheint auf Stufe 0'); });
  Z.wuerde.forEach((t,i)=>{ if(t&&!/^Hier ist .* (zuhause|stark)\.$/.test(t)) f.push(k+' in '+SIGNS[i]+': Würde in falscher Form'); }); });
if(PL_ZART.length!==12) f.push('PL_ZART hat '+PL_ZART.length+' Einträge');
PL_ZART.forEach((t,i)=>{ if(t.split(' · ')[0].toLowerCase!==undefined && t.split(' · ')[0]!==['Feuer','Erde','Luft','Wasser'][i%4]) f.push(SIGNS[i]+': falsches Element'); });
['Jupiter','Saturn1','Saturn2','Uranus'].forEach(k=>{ const Z=PL_ZYKLUS[k]; if(!Z||!Z.titel||!Z.was||Z.was.length<40) f.push('Zyklus '+k+' unvollständig'); });
PL_MARKEN.forEach((m,i)=>{ if(i&&m.a<PL_MARKEN[i-1].a) f.push('Lebensmarken nicht nach Alter sortiert'); if(!m.t||!m.d) f.push('Lebensmarke '+m.a+' unvollständig'); });
PL_QUIZ.forEach((q,i)=>{ if(!(q.r>=0&&q.r<q.o.length)) f.push('Übung '+(i+1)+': Lösung zeigt ins Leere'); if(!q.e||q.e.length<60) f.push('Übung '+(i+1)+': Erklärung fehlt'); });
const LUECKEN={profilMit:['name'],beiKopf:['wer'],beiTech:['planet','zeichen','haus'],zyklenMit:['name'],alterJetzt:['jahr','alter'],mitAlter:['alter']};
for(const k in PL_TEXT){ const ist=(PL_TEXT[k].match(/\{([a-zA-Z]+)\}/g)||[]).map(x=>x.slice(1,-1)).sort().join();
  const s=(LUECKEN[k]||[]).slice().sort().join(); if(ist!==s) f.push('PL_TEXT.'+k+': Lücken {'+ist+'} statt {'+s+'}'); }
console.log(JSON.stringify({fehler:f}));
'''
pd = hier / '.probe-planeten-daten.js'
pd.write_text(probe_d, encoding='utf-8')
try:
    r = subprocess.run(['node', str(pd), str(rit / 'engine.js'), str(hier.parent / 'kern' / 'bahn-daten.js'),
                        str(hier / 'planeten-daten.js')], capture_output=True, text=True, timeout=60)
    if r.returncode != 0:
        fehler.append('Datenprüfung gescheitert: ' + (r.stderr or '')[-300:])
    else:
        fehler.extend(json.loads(r.stdout.strip().splitlines()[-1])['fehler'])
finally:
    pd.unlink(missing_ok=True)

# ── 4 · Die Rechnung besteht ihre Prüfdatei ──────────────────
r = subprocess.run(['node', str(hier / '_test-planeten.js'), str(rit / 'engine.js'), str(hier / 'planeten-rechner.js')],
                   capture_output=True, text=True, timeout=120)
if r.returncode != 0:
    fehler.append('_test-planeten.js gescheitert: ' + (r.stderr or '')[-300:])
else:
    fehler.extend('Rechner: ' + x for x in json.loads(r.stdout.strip().splitlines()[-1])['fehler'])

# ── 5 · Keine eingebaute Deutung, keine echten Daten ─────────
NAMEN = ('Widder|Stier|Zwillinge|Krebs|Löwe|Jungfrau|Waage|Skorpion|Schütze|Steinbock|Wassermann|Fische|'
         'Sonne|Mond|Merkur|Venus|Mars|Jupiter|Saturn|Uranus|Neptun|Pluto')
for name, t in [('planeten-koerper.html', koerper), ('planeten-daten.js', daten)]:
    for m in re.finditer(r'(?i)(bei dir|dein(?:em)? chart)\W{0,3}[^.<]{0,60}\b(' + NAMEN + r')\b', t):
        fehler.append(f'{name}: feste Deutung „{m.group(0)[:60]}…" — das wird gerechnet')
for name, t in [('planeten-app.js', app), ('planeten-daten.js', daten), ('planeten-koerper.html', koerper),
                ('planeten-rechner.js', rechner), ('_test-planeten.js', lies(hier / '_test-planeten.js'))]:
    if re.search(r'\b1987\b', t) or re.search(r'\b08:58\b', t):
        fehler.append(f'{name}: sieht nach echten Geburtsdaten aus')

# ── 6 · In der Anzeige steht kein Satz, und kein „dein" ──────
#     Die Seite entsteht satzfrei, beide Riegel aus pruefwerk halten
#     sie von Anfang an (Aufgabe 34). Dazu die Gegenprobe in allen
#     drei Anführungsarten (REGELN.md 6e, Nachsatz): ein grüner Riegel
#     heißt sonst nur, dass heute nichts dastand.
fehler += pruefwerk.pruefe_anzeige_satzfrei(app, 'planeten-app.js', 'planeten-daten.js')
fehler += pruefwerk.pruefe_anzeige_ohne_dein(app, 'planeten-app.js')
for _art, _an in (('einfache', "'"), ('doppelte', '"'), ('schräge', '`')):
    _mit = app + '\nvar _gegenprobe=' + _an + 'Die zehn Kräfte in dir' + _an + ';\n'
    if not pruefwerk.pruefe_anzeige_satzfrei(_mit, 'planeten-app.js', 'planeten-daten.js'):
        fehler.append(f'der Riegel sieht einen Satz in {_art} Anführung nicht')
    _mit = app + '\nvar _gegenprobe=' + _an + 'auf deinen Mars' + _an + ';\n'
    if not pruefwerk.pruefe_anzeige_ohne_dein(_mit, 'planeten-app.js'):
        fehler.append(f'der Riegel sieht ein „dein" in {_art} Anführung nicht')
if 'toLowerCase' in app + daten + rechner:
    fehler.append('toLowerCase auf deutschem Text (REGELN.md 4)')

# ── Rauchprobe ───────────────────────────────────────────────
probe = r'''
const {chromium}=require('playwright');
(async()=>{
const f=[]; const b=await chromium.launch();
const MECHANIK=['Konjunktion','Quadrat','Trigon','Sextil','Opposition','Orbis','Transit','Aszendent','Deszendent','Whole','Placidus',
 'Radix','Ekliptik','Haus','Häuser','Hauses','Mondknoten','MC','IC','Rückkehr','Planet','Planeten'];
const ZEICHEN=['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische'];
const NAMEN=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];
const wort=(t,x)=>new RegExp('(?<![A-Za-zÄÖÜäöüß])'+x+'(?![A-Za-zÄÖÜäöüß])').test(t);
const ueber=async(pg,wo)=>{ const r=await pg.evaluate(()=>{const w=document.documentElement.clientWidth; const r=[];
  document.querySelectorAll('body *').forEach(e=>{ if(e.closest('.pl-tabbox')) return; const bb=e.getBoundingClientRect();
    if(bb.width>0&&(bb.right>w+1.5||bb.left<-1.5)) r.push(e.tagName+'.'+(e.className.baseVal===undefined?e.className:'')+' '+Math.round(bb.right)); });
  return {r:r.slice(0,4),sw:document.documentElement.scrollWidth,w}; });
  if(r.r.length||r.sw>r.w+1) f.push(wo+': läuft auf 390px über: '+r.r.join(' | ')); };
/* Stufe 0: Namen der Kräfte nur auf ihrer eigenen Karte, mit Erklärung
   davor (REGELN.md 2a). Außerhalb der Karten kein Name, nirgends ein
   Zeichen, ein Fachwort oder eine Gradzahl. */
const stufe0=async(pg,wo)=>{ await pg.evaluate(()=>{ AC_NIV.setzen(0); }); await pg.waitForTimeout(300);
  const r=await pg.evaluate(()=>{ const ganz=document.body.innerText;
    const k=[...document.querySelectorAll('.pl-karte')].map(c=>({t:c.innerText, was:c.querySelector('.pl-was').innerText, name:c.querySelector('.pl-name').innerText}));
    const kopie=document.body.cloneNode(true); kopie.querySelectorAll('.pl-karte').forEach(c=>c.remove());
    document.body.appendChild(kopie); kopie.style.position='absolute'; kopie.style.left='-9999px';
    const aussen=kopie.innerText; kopie.remove(); return {ganz,aussen,k}; });
  const m=MECHANIK.filter(x=>wort(r.ganz,x)).concat(ZEICHEN.filter(x=>wort(r.ganz,x)));
  if(m.length) f.push(wo+', Stufe 0: '+m.join(', '));
  const n=NAMEN.filter(x=>wort(r.aussen,x)); if(n.length) f.push(wo+', Stufe 0, außerhalb der Karten: '+n.join(', '));
  r.k.forEach(c=>{ if(c.was.length<40) f.push(wo+', Stufe 0: '+c.name+' ohne Erklärung auf der Karte');
    NAMEN.filter(x=>x!==c.name&&wort(c.t,x)).forEach(x=>f.push(wo+', Stufe 0: Karte '+c.name+' nennt '+x)); });
  if(/\d°/.test(r.ganz)) f.push(wo+', Stufe 0: Gradzahlen');
  const sicht=await pg.evaluate(()=>({h:document.querySelector('.pl-hinweis').checkVisibility(), z:document.getElementById('zeichen').checkVisibility(), y:document.getElementById('zyklen').checkVisibility()}));
  if(!sicht.h) f.push(wo+', Stufe 0: der Hinweis auf die Stufe fehlt');
  if(sicht.z||sicht.y) f.push(wo+', Stufe 0: Zeichen oder Zyklen sichtbar'); };

/* A · ohne Profil */
const c1=await b.newContext({viewport:{width:390,height:844}});
const p=await c1.newPage(); p.on('pageerror',e=>f.push('Skriptfehler ohne Profil: '+String(e.message).slice(0,160)));
await p.goto('file://ZIEL'); await p.waitForTimeout(700);
const a=await p.evaluate(()=>({k:document.querySelectorAll('#plkarten .pl-karte').length,
  dots:document.querySelectorAll('#plbahn g[role=button]').length, bei:document.querySelectorAll('.pl-bei').length,
  profil:document.getElementById('plprofil').textContent, q:document.querySelectorAll('#plquiz .pl-q').length,
  z:document.querySelectorAll('#plzeichen .pl-z').length, mitte:document.getElementById('plbahnwer').textContent, soll:PL_TEXT.bahnHeute}));
if(a.k!==10) f.push(a.k+' statt 10 Karten');
if(a.dots!==10) f.push(a.dots+' statt 10 Punkte auf den Bahnen');
if(a.bei) f.push('ohne Profil steht trotzdem „bei dir" da');
if(!/Profile/.test(a.profil)) f.push('ohne Profil fehlt der Hinweis auf Profile');
if(a.q!==4) f.push(a.q+' statt 4 Übungsfragen');
if(a.z!==12) f.push(a.z+' statt 12 Zeichenkarten');
if(a.mitte!==a.soll) f.push('ohne Profil sagt die Mitte nicht, dass es der Himmel heute ist');
/* Die Punkte stehen dort, wo engine.js die Kräfte heute rechnet */
const lage=await p.evaluate(()=>{ const jd=heuteJD(), raus=[];
  document.querySelectorAll('#plbahn g[role=button]').forEach(g=>{ const k=g.getAttribute('aria-label').split(':')[0];
    const c=g.querySelector('circle'), x=+c.getAttribute('cx')-200, y=+c.getAttribute('cy')-200;
    const w=((Math.atan2(y,-x)*180/Math.PI)%360+360)%360, soll=lon(k,jd);
    raus.push({k, d:Math.abs(((w-soll)%360+540)%360-180)}); }); return raus; });
lage.forEach(x=>{ if(x.d>0.5) f.push('Bahn: '+x.k+' steht '+x.d.toFixed(1)+' Grad neben seinem Platz'); });
await p.evaluate(()=>{ document.querySelectorAll('#plbahn g[role=button]')[4].dispatchEvent(new MouseEvent('click',{bubbles:true})); });
await p.waitForTimeout(150);
const an=await p.evaluate(()=>{ const g=document.querySelectorAll('#plbahn g[role=button]')[4], k=g.getAttribute('aria-label').split(':')[0];
  const i=PL_KRAFT.findIndex(x=>x.k===k); return {g:g.getAttribute('aria-pressed'), c:document.querySelectorAll('#plkarten .pl-karte')[i].classList.contains('an'),
  n:document.querySelectorAll('#plkarten .pl-karte.an').length}; });
if(an.g!=='true'||!an.c||an.n!==1) f.push('ein Klick auf eine Bahn markiert die Karte nicht');
await p.evaluate(()=>AC_NIV.setzen(2)); await p.waitForTimeout(200);
const emoji=await p.evaluate(()=>{ const t=document.body.innerText+[...document.querySelectorAll('svg text')].map(x=>x.textContent).join(' ');
  return (t.match(/[\u2600-\u26FF](?!\uFE0E)/g)||[]).slice(0,5).join(' '); });
if(emoji) f.push('Symbole ohne Textform (U+FE0E), sie erscheinen als Emoji: '+emoji);
await stufe0(p,'ohne Profil');
await p.evaluate(()=>document.getElementById('plstufe').click()); await p.waitForTimeout(300);
const s1=await p.evaluate(()=>({n:document.body.classList.contains('niv-1'), z:document.getElementById('zeichen').checkVisibility(), h:document.querySelector('.pl-hinweis').checkVisibility()}));
if(!s1.n||!s1.z||s1.h) f.push('der Knopf im Hinweis stellt nicht auf Stufe 1 oder blendet das Nachschlagen nicht ein');
await p.evaluate(()=>{ document.getElementById('zeichen-venus').click(); }); await p.waitForTimeout(100);
const v=await p.evaluate(()=>({sel:document.getElementById('zeichen-venus').getAttribute('aria-selected'), kurz:document.querySelector('#plzkopf .kurz').textContent,
  erst:document.querySelector('#plzeichen .pl-z p').textContent, wuerde:document.querySelectorAll('#plzeichen .wuerde').length,
  sK:PL_ZEICHEN.Venus.kurz, sE:PL_ZEICHEN.Venus.z[0], sW:PL_ZEICHEN.Venus.wuerde.filter(Boolean).length}));
if(v.sel!=='true'||v.kurz!==v.sK||v.erst!==v.sE) f.push('der Reiter Venus zeigt nicht Venus');
if(v.wuerde!==v.sW) f.push('die Würde-Zeilen stimmen nicht');
await p.fill('#pljahr','1980'); await p.waitForTimeout(100);
const y=await p.evaluate(()=>({rows:document.querySelectorAll('#plzyklen tr').length, next:document.querySelectorAll('#plzyklen tr.naechstes').length,
  erste:document.querySelectorAll('#plzyklen tr')[1].querySelector('td').textContent, n:PL_MARKEN.length, a0:PL_MARKEN[0].a}));
if(y.rows!==y.n+1) f.push('Jahrestabelle: '+(y.rows-1)+' statt '+y.n+' Zeilen');
if(y.next!==1) f.push('Jahrestabelle: '+y.next+' mal „als Nächstes"');
if(y.erste!==String(1980+y.a0)) f.push('Jahrestabelle: erstes Jahr '+y.erste);
await p.evaluate(()=>{ document.querySelectorAll('#plquiz .pl-opts button')[0].click(); }); await p.waitForTimeout(100);
const qq=await p.evaluate(()=>({ex:!document.querySelector('#plquiz .pl-expl').hidden, r:!!document.querySelector('#plquiz button.richtig')}));
if(!qq.ex||!qq.r) f.push('die Übung zeigt nach einer Antwort keine Erklärung');
await ueber(p,'ohne Profil, Stufe 1');
/* Eine alte Adresse: planet-mars.html kommt mit #zeichen-mars an */
await p.evaluate(()=>AC_NIV.setzen(2));
await p.goto('file://ZIEL#zeichen-mars'); await p.waitForTimeout(600);
const m=await p.evaluate(()=>({sel:document.getElementById('zeichen-mars').getAttribute('aria-selected'), kurz:document.querySelector('#plzkopf .kurz').textContent, soll:PL_ZEICHEN.Mars.kurz}));
if(m.sel!=='true'||m.kurz!==m.soll) f.push('#zeichen-mars wählt den Mars nicht aus');

/* B · mit erfundenem Profil */
const c2=await b.newContext({viewport:{width:390,height:844}});
await c2.addInitScript(()=>{ localStorage.setItem('ac_profile_v1',JSON.stringify({v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:[
  {id:'p1',name:'Probe Bahn',alias:'',y:1978,mo:9,d:22,h:7,mi:35,tz:1,lat:48.14,lon:11.58,ort:'München',
   wlat:48.14,wlon:11.58,wort:'München',eigen:true,readings:[]}]})); localStorage.setItem('ac_niveau','2'); });
const q=await c2.newPage(); q.on('pageerror',e=>f.push('Skriptfehler mit Profil: '+String(e.message).slice(0,160)));
await q.goto('file://ZIEL'); await q.waitForTimeout(800);
const bq=await q.evaluate(()=>{ const P=AC_P.aktives(), C=chartVon(P), Z=plZyklen(P);
  const karten=[...document.querySelectorAll('#plkarten .pl-karte')].map((c,i)=>{ const k=PL_KRAFT[i].k, zi=Math.floor(C[k]/30);
    return {k, kopf:c.querySelector('.pl-bei-kopf').textContent, text:c.querySelector('.pl-bei-text').textContent,
      soll:PL_ZEICHEN[k]?PL_ZEICHEN[k].z[zi]:PL_AUSSEN, tech:c.querySelector('.pl-bei-tech').textContent, zeichen:SIGNS[zi], haus:haus(C,C[k])}; });
  const sonneZ=Math.floor(C.Sonne/30), chip=[...document.querySelectorAll('#plzeichen .pl-z')].findIndex(x=>x.classList.contains('pl-z-bei'));
  return {karten, profil:document.getElementById('plprofil').textContent, rows:document.querySelectorAll('#plzyklen tr').length-1, z:Z.length,
    next:document.querySelectorAll('#plzyklen tr.naechstes').length, jahr:document.getElementById('pljahrbox').hidden,
    sonneZ, chip, mitte:document.getElementById('plbahnwer').textContent, soll:PL_TEXT.bahnGeburt}; });
if(!/Probe Bahn/.test(bq.profil)) f.push('das aktive Profil wird nicht genannt');
bq.karten.forEach(c=>{ if(c.text!==c.soll) f.push(c.k+': der Satz bei dir passt nicht zum gerechneten Zeichen');
  if(!new RegExp('^So zeigt sich dein(e)? '+c.k+'$').test(c.kopf)) f.push(c.k+': Kopf „'+c.kopf+'"');
  if(c.tech!==c.k+' in '+c.zeichen+' · '+c.haus+'. Haus') f.push(c.k+': die Fachzeile stimmt nicht mit der Rechnung überein'); });
if(bq.rows!==bq.z||bq.z<9) f.push('Zyklen mit Profil: '+bq.rows+' Zeilen, gerechnet '+bq.z);
if(bq.next!==1) f.push('Zyklen mit Profil: '+bq.next+' mal „als Nächstes"');
if(!bq.jahr) f.push('mit Profil steht das Jahresfeld noch da');
if(bq.chip!==bq.sonneZ) f.push('„Bei dir" steht beim falschen Zeichen');
if(bq.mitte!==bq.soll) f.push('mit Profil sagt die Mitte nicht, dass es die Geburt ist');
await ueber(q,'mit Profil, Stufe 2');
await stufe0(q,'mit Profil');
await ueber(q,'mit Profil, Stufe 0');
console.log(JSON.stringify({fehler:f})); await b.close();})();
'''
pp = hier / '.probe-planeten.js'
pp.write_text(probe.replace('ZIEL', str(ziel)), encoding='utf-8')
try:
    r = subprocess.run(['node', str(pp)], capture_output=True, text=True, timeout=240)
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
print(f'      planeten.html: {len(html)//1024} KB, neun alte Adressen leiten weiter')
