#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Setzt praxis.html zusammen — die Praxis von Schwerkraft.

Bis zum 18.11. hieß sie Werkstatt (werkstatt.html leitet weiter).
Mandy am 17.11.: „ich brauche einen bereich in dem ich alleine arbeiten
kann der mit schwerkraft verbunden ist". Seitdem: eigener Look
(schwerkraft.css), eigene Leiste, und Klient*innen werden hier
angelegt, nicht mehr auf der Profilseite für alle.

Vorher: der Arbeitsplatz je Klient:in.

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
# Seit Aufgabe 66 steht jedes Wort der Seite hier und nicht in der
# Anzeige; gefüllt wird mit AC_FUELL aus kern/fuellen.js.
daten = lies(hier / 'werkstatt-daten.js')
fuellen = lies(hier.parent / 'kern' / 'fuellen.js')

kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Praxis &middot; Schwerkraft</title>
<link rel="stylesheet" href="schriften/schriften.css">
<script src="staedte.js"></script>
<script src="profil.js"></script>
<script src="profil-formular.js"></script>
<style>
"""

html = (kopf + lies(rit / 'basis.css') + "\n" + lies(wiki / 'schwerkraft.css') + "\n"
        + lies(wiki / 'profil-formular.css') + "\n" + lies(hier / 'werkstatt-stil.css')
        + '</style>\n</head><body>\n'
        + koerper + "\n<script>\n"
        + lies(rit / 'engine.js') + "\n" + fuellen + "\n" + daten
        + "\n" + app
        + "\n</script>\n</body></html>\n")

ziel = wiki / 'praxis.html'
html = html.replace('<head>', '<head>' + (hier.parent / 'app' / 'app-kopf.html')
                    .read_text(encoding='utf-8'), 1)
ziel.write_text(html, encoding='utf-8')

# Die alte Adresse leitet weiter — falls ein Lesezeichen darauf zeigt.
(wiki / 'werkstatt.html').write_text(
    '<!DOCTYPE html><html lang="de"><head>' + (hier.parent / 'app' / 'app-kopf.html')
    .read_text(encoding='utf-8') + '<meta charset="UTF-8">\n'
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
    '<meta name="robots" content="noindex, nofollow">\n'
    '<title>Praxis &middot; Schwerkraft</title>\n'
    '<meta http-equiv="refresh" content="0; url=praxis.html">\n'
    '</head><body style="font-family:system-ui,sans-serif;padding:40px 20px">\n'
    '<p>Die Werkstatt heißt jetzt <a href="praxis.html">Praxis</a>.</p>\n'
    '</body></html>\n', encoding='utf-8')

fehler, hinweise = [], []

# ── Die IDs, die das Skript sucht, gibt es auch ──────────────
ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
# Die Felder des Formulars legt profil-formular.js an, nicht der Körper
fehlt = {i for i in gesucht - ids if not i.startswith('pf')}
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
#
# Welche Dateien geprüft werden, steht nicht als Liste da, sondern
# wird aus dem Ordner geholt: Eine Liste von Hand hätte am 2026-11-28
# die neue `werkstatt-daten.js` nicht gekannt — genau die Datei, in
# die jetzt alle Texte wandern. Dieselbe Lehre wie REGELN.md 6f: Die
# Sperre sitzt an der Form („jede Quelle dieser Seite") und nicht an
# den Namen, die jemand im Kopf hatte.
QUELLEN = [(lies(q), q.name) for q in sorted(hier.glob('werkstatt-*'))
           if q.suffix in ('.html', '.js')]
ERWARTET = {'werkstatt-koerper.html', 'werkstatt-app.js', 'werkstatt-daten.js'}
if {n for _, n in QUELLEN} != ERWARTET:
    fehler.append('die Quellen der Praxis sind andere als erwartet: '
                  + ', '.join(sorted({n for _, n in QUELLEN} ^ ERWARTET))
                  + ' — eine neue Quelle gehört in diese Prüfung, bevor '
                  'Personendaten darin landen können')
for muster, was in [(r'\b(19|20)\d\d\b', 'eine Jahreszahl'),
                    (r'\b\d{1,2}\.\d{1,2}\.(19|20)\d\d\b', 'ein Datum'),
                    (r'\b\d{1,2}:\d\d\b', 'eine Uhrzeit')]:
    for datei, name in QUELLEN:
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
    m = re.search(feld + r"\s*:\s*'([^']+)'",
                  '\n'.join(q for q, _ in QUELLEN))
    if m:
        fehler.append(f'ein {feld}-Feld steht als Festwert im Quelltext: '
                      + repr(m.group(1)[:30]) + ' — Personendaten kommen hier '
                      'ausschließlich aus dem Browser')

# ── 1a · Die Anzeige schreibt keinen Satz ────────────────────
#
#     Aufgabe 66, die letzte des Zuges, der am 2026-11-07 mit
#     `bereich-app.js` begann. Jedes Wort der Seite steht in
#     `werkstatt-daten.js` als `WK_T`; die Anzeige setzt mit
#     `AC_FUELL` ein und jede Zahl geht durch `AC_KOMMA`. Was in
#     `werkstatt-app.js` stünde, zöge beim Umzug in eine andere
#     Umgebung nicht mit (`PRODUKT.md` Abschnitt 7) — deshalb ist das
#     hier eine Sperre und kein Vorsatz.
sys.path.insert(0, str(rit))
import pruefwerk

if not re.search(r'\bvar WK_T\s*=', daten):
    fehler.append('Tafel WK_T fehlt in werkstatt-daten.js')
fehler += pruefwerk.pruefe_anzeige_satzfrei(app, 'werkstatt-app.js',
                                            'werkstatt-daten.js')
fehler += pruefwerk.pruefe_anzeige_ohne_dein(app, 'werkstatt-app.js')
fehler += pruefwerk.pruefe_fueller(app, 'werkstatt-app.js')
fehler += pruefwerk.pruefe_vorlagenluecken(daten, app, 'werkstatt-daten.js')
# Deutscher Text wird nicht kleingeschrieben (`REGELN.md` Abschnitt 4).
# Hier hat es wirklich zugeschlagen: Der Dateiname eines Readings lief
# bis zum 2026-11-28 durch `toLowerCase`, und aus „Reading Müller"
# wurde „reading-müller". Neun Bauten hatten diese Regel, dieser nicht
# — und genau dort stand die letzte Stelle.
for _datei, _quelle in (('werkstatt-app.js', app),
                        ('werkstatt-daten.js', daten)):
    fehler += pruefwerk.pruefe_grossschreibung(_quelle, _datei)
    fehler += pruefwerk.pruefe_kein_kleinschreiben(_quelle, _datei)
fehlt_stelle = pruefwerk.ruft_ohne_stelle(html)
if fehlt_stelle:
    fehler.append('die Seite ruft ' + ', '.join(fehlt_stelle)
                  + ', hat aber kern/fuellen.js nicht mit darauf')

#     Die Anzeige liegt in einer eigenen Hülle, und die Datentafel ist
#     der einzige neue Name daneben. Ohne das liegen ihre Namen neben
#     denen der Engine, und die Seite läuft, solange zwei Fassungen
#     zufällig dasselbe tun — Glück, keine Prüfung (REGELN.md 6f).
if not re.search(r'^\(function\(\)\{', app, re.M):
    fehler.append('werkstatt-app.js steht nicht in einer eigenen Hülle — '
                  'ihre Namen liegen dann neben denen der Engine')
_OBEN = re.compile(r'^\s*(?:function|var|let|const)\s+([A-Za-z_$][\w$]*)', re.M)
_fremd = set()
for _q in (lies(rit / 'engine.js'), fuellen, lies(wiki / 'profil.js'),
           lies(wiki / 'profil-formular.js'), lies(wiki / 'staedte.js')):
    _fremd |= set(_OBEN.findall(_q))
_meine = set(_OBEN.findall(daten))
if _meine != {'WK_T'}:
    fehler.append('werkstatt-daten.js vergibt mehr als WK_T: '
                  + ', '.join(sorted(_meine)))
if _meine & _fremd:
    fehler.append('der Name kollidiert mit einer anderen Datei der Seite: '
                  + ', '.join(sorted(_meine & _fremd)))

#     Die Gegenprobe gegen die Fehlerklasse, die ein grüner Riegel
#     nicht ausschließt: dass er heute nur nichts zu finden hatte
#     (`REGELN.md` 6e, Nachsatz). In allen drei Anführungsarten, denn
#     ein Satz, der in doppelten oder schrägen Anführungszeichen
#     durchgeht, wäre das Loch, über das die Sätze einzeln
#     zurückkommen.
for _art, _an in (('einfache', "'"), ('doppelte', '"'), ('schräge', '`')):
    _mit = app + '\nvar _gegenprobe=' + _an + 'Noch keine Sitzungsnotizen' + _an + ';\n'
    if not pruefwerk.pruefe_anzeige_satzfrei(_mit, 'werkstatt-app.js',
                                             'werkstatt-daten.js'):
        fehler.append(f'der Satzriegel sieht eine {_art} Anführung nicht — '
                      'dann hält er nur, was heute zufällig nicht dasteht')
    _mit = app + '\nvar _gegenprobe=' + _an + 'deine Sonne' + _an + ';\n'
    if not pruefwerk.pruefe_anzeige_ohne_dein(_mit, 'werkstatt-app.js'):
        fehler.append(f'der „dein"-Riegel sieht eine {_art} Anführung nicht '
                      '— dann kommt die ungebeugte Form einzeln zurück')
_mit = app + '\nvar _gegenprobe=s.charAt(0).toUpperCase()+s.slice(1);\n'
if not pruefwerk.pruefe_grossschreibung(_mit, 'werkstatt-app.js'):
    fehler.append('der Riegel gegen die eigene Großschreibung greift nicht')
_mit = app + '\nvar _gegenprobe=String(t).toLowerCase();\n'
if not pruefwerk.pruefe_kein_kleinschreiben(_mit, 'werkstatt-app.js'):
    fehler.append('der Riegel gegen das Kleinschreiben greift nicht')
_mit = daten + "\nvar WK_X={a:'{nirgendsgefuellt}'};\n"
if not pruefwerk.pruefe_vorlagenluecken(_mit, app, 'werkstatt-daten.js'):
    fehler.append('eine Vorlagenlücke, die niemand füllt, bricht nicht ab')

# ── 2 · Die Tür bleibt still ─────────────────────────────────
# Verlinkt irgendeine andere ausgelieferte Seite hierher, steht der
# Arbeitsplatz im Schaufenster. Die Seite selbst darf sich verlinken,
# und Seiten hinter derselben Tür dürfen zurückführen: der Baukasten
# (13.11.). Dass der Baukasten seinerseits nirgends öffentlich verlinkt
# ist, hält Querprüfung 14 in pruefe-alles.py fest.
HINTER_DER_TUER = {'praxis.html', 'werkstatt.html', 'baukasten.html'}
verlinkt = []
for s in sorted(wiki.glob('*.html')):
    if s.name in HINTER_DER_TUER:
        continue
    _t = s.read_text(encoding='utf-8', errors='replace')
    # Seiten mit der Praxis-Leiste gehören selbst zur Praxis
    if 'class="sk-leiste"' in _t:
        continue
    if re.search(r'["\'](praxis|werkstatt)\.html', _t):
        verlinkt.append(s.name)
if verlinkt:
    fehler.append('die Praxis ist verlinkt in: ' + ', '.join(verlinkt[:6])
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
/* Was auf der Seite steht, je Ansicht. Geprueft wird in Python:
   Der Rauchlauf berichtet, die Regel entscheidet (REGELN.md 6e). */
const texte=[];
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
texte.push(['Liste',await p.evaluate(()=>document.body.innerText)]);

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
texte.push(['Einzelansicht',await p.evaluate(()=>document.body.innerText)]);

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
if(!/anlegen/.test(o.text)) f.push('der Leer-Hinweis sagt nicht, wo es weitergeht');
texte.push(['Liste ohne Profile',await p2.evaluate(()=>document.body.innerText)]);

/* Eine Klient*in in der Praxis anlegen, ohne die Profilseite */
await p2.click('#wkneu'); await p2.waitForTimeout(150);
if(await p2.evaluate(()=>document.getElementById('wkform').hidden)) f.push('das Formular geht nicht auf');
await p2.fill('#pfname','Probe Drei'); await p2.fill('#pfalias','Klientin 03');
await p2.fill('#pfdate','1991-05-06'); await p2.fill('#pftime','07:30');
await p2.type('#pfort','Hamburg',{delay:30}); await p2.waitForTimeout(300);
const ortKnopf=await p2.$('#pfortliste button'); if(ortKnopf) await ortKnopf.click(); else f.push('die Ortssuche liefert nichts');
await p2.click('#pfspeichern'); await p2.waitForTimeout(300);
const neu=await p2.evaluate(()=>({n:AC_P.alle().length, detail:!document.getElementById('wkdetail').hidden,
  name:(document.getElementById('wkname')||{}).textContent||'', form:document.getElementById('wkform').hidden}));
if(neu.n!==1) f.push('nach dem Anlegen stehen '+neu.n+' Profile da');
if(!neu.detail||!/Probe Drei/.test(neu.name)) f.push('nach dem Anlegen öffnet die Einzelansicht nicht');
texte.push(['Einzelansicht ohne Notizen',await p2.evaluate(()=>document.body.innerText)]);
/* Ein Reading ablegen und wieder löschen */
await p2.fill('#wkrt','Reading Probe'); await p2.fill('#wkrx','Ein Satz.');
await p2.click('#wkrneu button'); await p2.waitForTimeout(200);
if(await p2.evaluate(()=>document.querySelectorAll('.wk-r1').length)!==1) f.push('das Reading wurde nicht abgelegt');
p2.once('dialog',d=>d.accept()); await p2.click('.wk-r-kn .weg'); await p2.waitForTimeout(200);
if(await p2.evaluate(()=>AC_P.readings(AC_P.alle()[0].id).length)!==0) f.push('das Reading wurde nicht gelöscht');
/* Bearbeiten führt zurück in die Einzelansicht */
await p2.click('#wkbearb'); await p2.waitForTimeout(200);
if(await p2.inputValue('#pfname')!=='Probe Drei') f.push('Bearbeiten lädt die Daten nicht');
await p2.fill('#pfname','Probe Vier'); await p2.click('#pfspeichern'); await p2.waitForTimeout(250);
if(!/Probe Vier/.test(await p2.textContent('#wkname'))) f.push('nach dem Bearbeiten steht der alte Name da');
/* Die Leiste springt aus der Einzelansicht in einen Abschnitt */
await p2.click('.sk-nav a[href$="#handbuch"]'); await p2.waitForTimeout(250);
if(await p2.evaluate(()=>!document.getElementById('wkdetail').hidden)) f.push('der Sprung aus der Leiste lässt die Einzelansicht offen');
/* Keine Tür von Astro-Charlie, dafür der Weg zurück */
const lst=await p2.evaluate(()=>({acnav:!!document.querySelector('.ac-nav'), raus:!!document.querySelector('.sk-raus[href="index.html"]')}));
if(lst.acnav) f.push('in der Praxis steht die Leiste von Astro-Charlie');
if(!lst.raus) f.push('der Weg zurück zu Astro-Charlie fehlt');
/* Löschen */
await p2.click('.wk-k'); await p2.waitForTimeout(200);
p2.once('dialog',d=>d.accept()); await p2.click('#wkloeschen'); await p2.waitForTimeout(250);
if(await p2.evaluate(()=>AC_P.alle().length)!==0) f.push('Löschen hat nicht gelöscht');

console.log(JSON.stringify({fehler:f,texte:texte}));
await b.close();})();
'''

pp = hier / '.probe-werkstatt.js'
pp.write_text(probe.replace('ZIEL', str(ziel)), encoding='utf-8')
try:
    r = subprocess.run(['node', str(pp)], capture_output=True, text=True, timeout=140)
    if r.returncode != 0:
        fehler.append('Rauchprobe gescheitert: ' + (r.stderr or '')[-300:])
    else:
        ergebnis = json.loads(r.stdout.strip().splitlines()[-1])
        fehler.extend(ergebnis['fehler'])
        # ── Die Seite gibt einem Menschen kein Geschlecht ────
        #     `PRODUKT.md` Abschnitt 2: keine Seite setzt ein
        #     männliches Gegenüber voraus. Bis zum 28.11. stand auf
        #     dieser hier an sechs Stellen „Wie er auf andere wirkt",
        #     „Seine öffentliche Richtung", „Sein Bild" — für eine
        #     Zielgruppe, die die Seite selbst „Klient*innen" nennt
        #     und die überwiegend Frauen sind. Im Profil steht kein
        #     Geschlecht; die Seite kann es also nicht wissen.
        #
        #     Geprüft wird am gezeichneten Text und nicht im
        #     Quelltext: Die Hälfte dieser Sätze entsteht erst beim
        #     Zeichnen. Und die Zahl der Ansichten wird mitgeprüft —
        #     eine Regel ohne Eingabe ist keine (REGELN.md 6e).
        texte = ergebnis.get('texte', [])
        if len(texte) < 4:
            fehler.append(f'die Rauchprobe hat nur {len(texte)} von vier '
                          'Ansichten gelesen — ohne Text prüft die '
                          'Geschlechtsregel nichts')
        for lage, text in texte:
            fehler += pruefwerk.pruefe_ohne_geschlecht(text,
                                                       f'der Seite ({lage})')
except Exception as e:
    fehler.append('Rauchprobe nicht gelaufen: ' + str(e)[:200])
finally:
    pp.unlink(missing_ok=True) if not __import__('os').environ.get('BEHALTEN') else None

for h in hinweise:
    print('      Hinweis: ' + h)
if fehler:
    for f in fehler:
        print('      FEHLER: ' + f)
    sys.exit(1)
print(f'      praxis.html: {len(html)//1024} KB')
