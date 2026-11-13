#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Setzt werkstatt.html zusammen — der Arbeitsplatz je Klient:in.

Mandy am 2.11.: „Brauche da eine Übersicht oder sowas wo ich dann alles
abrufen kann auf einem Blick zum jeweiligen klient*In."

Die Teile gab es alle schon — Profile, Dossier, Begleitung, Readings.
Nur lagen sie auf fünf Seiten und in zwei Speichern. Diese Seite legt
nichts Neues an, sie liest zusammen. Das ist die stille fünfte Tür aus
ENTWURF-NEUE-SEITE.md Abschnitt 3: „Dossier, Begleitung, Profile. Steht
nicht im Menü — das ist dein Arbeitsplatz, nicht das Schaufenster."

Zwei Prüfungen sind hier die wichtigen, und beide schützen Menschen,
die nicht Mandy sind:

  1. In der Seite steht kein einziger echter Name und kein echtes
     Geburtsdatum. Auf dieser Seite stehen fremde Daten — sie dürfen
     ausschließlich aus dem Browser kommen, nie aus dem Quelltext.
  2. Keine andere Seite verlinkt hierher. Die Tür ist absichtlich
     still; verlinkt man sie, steht der Arbeitsplatz im Schaufenster.
"""
import pathlib, re, sys, subprocess, json

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit = hier.parent / 'rituale'

def lies(p):
    return p.read_text(encoding='utf-8')

koerper = lies(hier / 'werkstatt-koerper.html')
app = lies(hier / 'werkstatt-app.js')

kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Werkstatt &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<style>
"""

html = (kopf + lies(rit / 'basis.css') + "\n" + lies(hier / 'werkstatt-stil.css')
        + '</style>\n</head><body>\n'
        + koerper + "\n<script>\n"
        + lies(rit / 'engine.js') + "\n" + app
        + "\n</script>\n</body></html>\n")

ziel = wiki / 'werkstatt.html'
html = html.replace('<head>', '<head>' + (hier.parent / 'app' / 'app-kopf.html')
                    .read_text(encoding='utf-8'), 1)
ziel.write_text(html, encoding='utf-8')

fehler, hinweise = [], []

# ── Die IDs, die das Skript sucht, gibt es auch ──────────────
ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
fehlt = gesucht - ids
if fehlt:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(fehlt)))

auf, zu = len(re.findall(r'<div\b', koerper)), len(re.findall(r'</div>', koerper))
if auf != zu:
    fehler.append(f'{auf} <div> gegen {zu} </div>')

# ── 1 · Kein einziger echter Mensch im Quelltext ─────────────
# Auf dieser Seite stehen Daten von Menschen, die nicht Mandy sind.
# Deshalb ist die Sperre hier schärfer als anderswo: Es wird nicht nur
# nach ihren eigenen Daten gesucht, sondern nach jedem Datum, das wie
# ein Geburtsdatum aussieht, und nach jedem Namen aus den Prüfdaten.
for muster, was in [(r'\b(19|20)\d\d\b', 'eine Jahreszahl'),
                    (r'\b\d{1,2}\.\d{1,2}\.(19|20)\d\d\b', 'ein Datum'),
                    (r'\b\d{1,2}:\d\d\b', 'eine Uhrzeit')]:
    for datei, name in [(koerper, 'werkstatt-koerper.html'),
                        (app, 'werkstatt-app.js')]:
        if re.search(muster, datei):
            fehler.append(f'{was} steht in {name} — auf dieser Seite dürfen '
                          'Geburtsdaten ausschließlich aus dem Browser kommen')
# Und kein Mensch als Festwert. Eine Liste verbotener Vornamen wäre hier
# genau das falsche Mittel gewesen: Um sie zu schreiben, müsste man die
# Namen der Klient:innen in den öffentlichen Quelltext tippen — die
# Prüfung wäre selbst das Leck. Geprüft wird deshalb die Form: ein
# gefülltes Namens- oder Aliasfeld als Festwert hat hier nichts zu
# suchen, egal wie die Person heißt.
for feld in ['name', 'alias', 'ort', 'wort']:
    m = re.search(feld + r"\s*:\s*'([^']+)'", koerper + '\n' + app)
    if m:
        fehler.append(f'ein {feld}-Feld steht als Festwert im Quelltext: '
                      + repr(m.group(1)[:30]) + ' — Personendaten kommen hier '
                      'ausschließlich aus dem Browser')

# ── 2 · Die Tür bleibt still ─────────────────────────────────
# Verlinkt irgendeine andere ausgelieferte Seite hierher, steht der
# Arbeitsplatz im Schaufenster. Die Seite selbst darf sich verlinken,
# und Seiten hinter derselben Tür dürfen zurückführen: der Baukasten
# (13.11.). Dass der Baukasten seinerseits nirgends öffentlich verlinkt
# ist, hält Querprüfung 14 in pruefe-alles.py fest.
HINTER_DER_TUER = {'werkstatt.html', 'baukasten.html'}
verlinkt = []
for s in sorted(wiki.glob('*.html')):
    if s.name in HINTER_DER_TUER:
        continue
    if 'werkstatt.html' in s.read_text(encoding='utf-8', errors='replace'):
        verlinkt.append(s.name)
if verlinkt:
    fehler.append('die Werkstatt ist verlinkt in: ' + ', '.join(verlinkt[:6])
                  + ' — sie soll in keinem Menü stehen')

# ── 3 · Die Seite schreibt nicht in den Begleitungsspeicher ──
# Zwei Seiten, die denselben Speicher bearbeiten, überschreiben sich.
# Die Werkstatt liest die Sitzungsnotizen nur.
if re.search(r"setItem\(\s*['\"]ac_begleit", app):
    fehler.append('die Werkstatt schreibt in den Begleitungsspeicher — '
                  'geschrieben wird dort, nicht hier')

# ── Die Rauchprobe ───────────────────────────────────────────
# Zwei erfundene Menschen, erfundene Daten. Keine echten — siehe oben.
probe = r'''
const {chromium}=require('playwright');
(async()=>{
const f=[];
const b=await chromium.launch();
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();
p.on('pageerror',e=>f.push('Skriptfehler: '+String(e.message).slice(0,140)));
await p.addInitScript(()=>{
 localStorage.setItem('ac_profile_v1',JSON.stringify({v:1,eigen:'p1',aktiv:'p1',
  zeigeNamen:true,liste:[
  {id:'p1',name:'Probe Eins',alias:'',y:1980,mo:7,d:15,h:14,mi:20,tz:1,
   lat:52.52,lon:13.405,ort:'Berlin',wlat:52.52,wlon:13.405,wort:'Berlin',
   eigen:true,readings:[]},
  {id:'p2',name:'Probe Zwei',alias:'',y:1975,mo:3,d:9,h:6,mi:45,tz:1,
   lat:48.14,lon:11.58,ort:'Muenchen',wlat:48.14,wlon:11.58,wort:'Muenchen',
   eigen:false,readings:[{id:'r1',titel:'Erstes Reading',text:'x',
   datum:'2026-01-02'}]}]}));
 localStorage.setItem('ac_begleit_v1',JSON.stringify({
  'p2-1':'Erste Sitzung, Auftrag geklaert.',
  'p2-2':'Zweite Sitzung, Bild angesehen.'}));
});
await p.goto('file://ZIEL'); await p.waitForTimeout(700);

/* Die Liste */
const li=await p.evaluate(()=>({
  karten:document.querySelectorAll('.wk-k').length,
  anzahl:(document.getElementById('wkanzahl')||{}).textContent||'',
  leerSichtbar:!document.getElementById('wkleer').hidden,
  namen:[...document.querySelectorAll('.wk-k-n')].map(x=>x.textContent.trim()),
  balken:document.querySelectorAll('.wk-k-b i.an').length}));
if(li.karten!==2) f.push(li.karten+' statt 2 Karten in der Liste');
if(li.leerSichtbar) f.push('der Leer-Hinweis steht da, obwohl Menschen da sind');
if(!/1 Mensch|Ein Mensch/.test(li.anzahl)) f.push('die Anzahl stimmt nicht: '+li.anzahl);
if(li.balken!==2) f.push(li.balken+' statt 2 gefuellte Sitzungsbalken');

/* Einzelansicht oeffnen */
await p.evaluate(()=>{
  const k=[...document.querySelectorAll('.wk-k')]
    .filter(x=>/Zwei/.test(x.textContent))[0]; k.click();});
await p.waitForTimeout(400);
const de=await p.evaluate(()=>({
  offen:!document.getElementById('wkdetail').hidden,
  listeZu:document.getElementById('wkliste').hidden,
  name:(document.getElementById('wkname')||{}).textContent||'',
  geb:(document.getElementById('wkgeb')||{}).textContent||'',
  blick:document.querySelectorAll('.wk-b1').length,
  blickText:(document.getElementById('wkblick')||{}).innerText||'',
  sitzungen:document.querySelectorAll('.wk-s1').length,
  gefuellt:[...document.querySelectorAll('.wk-s1')]
    .filter(x=>!x.classList.contains('leerzeile')).length,
  spruenge:document.querySelectorAll('.wk-sp').length,
  readings:document.querySelectorAll('.wk-r1').length}));
if(!de.offen||!de.listeZu) f.push('die Einzelansicht oeffnet nicht');
if(!/Probe Zwei/.test(de.name)) f.push('falscher Name in der Einzelansicht');
if(!/Muenchen/.test(de.geb)) f.push('der Geburtsort fehlt im Kopf');
if(de.blick<5) f.push('nur '+de.blick+' Kaesten in „Auf einen Blick"');
/* Gross- und Kleinschreibung ist hier egal: Die Beschriftungen stehen
   im Quelltext klein und werden per CSS in Grossbuchstaben gesetzt.
   innerText liefert das Gesetzte, nicht das Geschriebene — ohne das i
   sucht man nach „Herrscher" und bekommt „HERRSCHER". */
if(!/herrscher des 1/i.test(de.blickText)) f.push('die Herrscherkette fehlt');
if(de.sitzungen!==6) f.push(de.sitzungen+' statt 6 Sitzungszeilen');
if(de.gefuellt!==2) f.push(de.gefuellt+' statt 2 gefuellte Sitzungen');
if(de.spruenge<4) f.push('nur '+de.spruenge+' Spruenge');
if(de.readings!==1) f.push(de.readings+' statt 1 Reading');

/* Ein Dokument anlegen und wieder entfernen */
await p.fill('#wkdt','Analyse');
await p.fill('#wkdu','example.org/x');
await p.click('.wk-dokneu button');
await p.waitForTimeout(250);
const d1=await p.evaluate(()=>({
  zeilen:document.querySelectorAll('.wk-d1').length,
  href:(document.querySelector('.wk-d1 a')||{}).getAttribute
    ?document.querySelector('.wk-d1 a').getAttribute('href'):'',
  gespeichert:(JSON.parse(localStorage.getItem('ac_profile_v1')||'{}')
    .liste||[]).filter(x=>x.id==='p2')[0].dok||[]}));
if(d1.zeilen!==1) f.push('das Dokument wurde nicht angelegt');
if(!/^https:\/\//.test(d1.href)) f.push('die Adresse bekam kein https: '+d1.href);
if(d1.gespeichert.length!==1) f.push('das Dokument steht nicht im Profil');

/* Notiz speichert */
await p.fill('#wkmerk','Zwischennotiz');
await p.waitForTimeout(900);
const m=await p.evaluate(()=>(JSON.parse(localStorage.getItem('ac_profile_v1')||'{}')
  .liste||[]).filter(x=>x.id==='p2')[0].merk||'');
if(m!=='Zwischennotiz') f.push('die Notiz wurde nicht gespeichert: '+JSON.stringify(m));

/* Zurueck */
await p.click('#wkzurueck'); await p.waitForTimeout(300);
const zu2=await p.evaluate(()=>({liste:!document.getElementById('wkliste').hidden,
  detail:document.getElementById('wkdetail').hidden}));
if(!zu2.liste||!zu2.detail) f.push('der Weg zurueck funktioniert nicht');

/* 390 Pixel */
const ueber=await p.evaluate(()=>{
  const w=document.documentElement.clientWidth; const r=[];
  document.querySelectorAll('body *').forEach(e=>{
    const b=e.getBoundingClientRect();
    if(b.width>0&&(b.right>w+1.5||b.left<-1.5)) r.push((e.className||e.tagName)+' '+Math.round(b.right));
  }); return r.slice(0,4);});
if(ueber.length) f.push('laeuft auf 390px ueber: '+ueber.join(' | '));

/* Ohne Profile darf die Seite nicht leer aussehen.
   Ein eigener Kontext, kein reload: addInitScript laeuft bei jedem
   Seitenaufbau erneut und legt die Probeprofile sofort wieder an —
   wer stattdessen loescht und neu laedt, prueft nichts. */
const p2=await (await b.newContext({viewport:{width:390,height:844}})).newPage();
p2.on('pageerror',e=>f.push('Skriptfehler ohne Profile: '+String(e.message).slice(0,140)));
await p2.goto('file://ZIEL'); await p2.waitForTimeout(600);
const o=await p2.evaluate(()=>({leer:!document.getElementById('wkleer').hidden,
  karten:document.querySelectorAll('.wk-k').length,
  text:(document.getElementById('wkleer')||{}).innerText||''}));
if(o.karten!==0) f.push(o.karten+' Karten, obwohl niemand angelegt ist');
if(!o.leer) f.push('ohne Profile fehlt der Hinweis, wo man Menschen anlegt');
if(!/Profile/.test(o.text)) f.push('der Leer-Hinweis sagt nicht, wo es weitergeht');

console.log(JSON.stringify({fehler:f}));
await b.close();})();
'''

pp = hier / '.probe-werkstatt.js'
pp.write_text(probe.replace('ZIEL', str(ziel)), encoding='utf-8')
try:
    r = subprocess.run(['node', str(pp)], capture_output=True, text=True, timeout=140)
    if r.returncode != 0:
        fehler.append('Rauchprobe gescheitert: ' + (r.stderr or '')[-300:])
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
print(f'      werkstatt.html: {len(html)//1024} KB')
