#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut wiki/ophiuchus.html — „Ophiuchus, der Schlangenträger".

Die Seite zur Frage nach dem dreizehnten Zeichen: Was tatsächlich
passiert, wenn man Sternbilder statt Zeichen nimmt, für jedes Profil
und mit allen vier Systemen nebeneinander.

Seit dem 2026-11-26 (Aufgabe 64, aus 34 und 38) trennt dieser Bau,
was vorher in einer Datei lag:

    oph-daten.js    die Worte. Nichts rechnet, nichts zeigt an.
    sternbild.js    die Rechnung. Weiß nichts von Sätzen.
    oph-app.js      die Anzeige. Setzt zusammen, formuliert nicht.

Verriegelt wird das hier und nicht in einem Vorsatz: `REGELN.md` 6c
sagt, warum — eine Anweisung, an die sich jemand erinnern muss, ist
keine Automatik.
"""
import html as htmlmod
import json, pathlib, re, subprocess, sys

hier = pathlib.Path(__file__).parent.resolve()
wiki = hier.parent / 'wiki'
T = lambda n: (hier / n).read_text(encoding='utf-8')

KOPF = '''<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ophiuchus, der Schlangentr&auml;ger &middot; Astro-Charlie</title>
<link rel="stylesheet" href="schriften/schriften.css">
<script src="profil.js"></script>
<script src="niveau.js" defer></script>
<script src="wortwahl.js" defer></script>
<style>
'''

koerper = T('oph-koerper.html')
app     = T('oph-app.js')
daten   = T('oph-daten.js')
rechner = T('sternbild.js')
engine  = T('engine.js')
stil    = T('oph-stil.css')
# Aufgabe 94: kern/fuellen.js ist die eine Stelle, die eine Lücke
# füllt — und seit heute auch die, an der eine Zahl zu deutschem Text
# wird (AC_KOMMA). Aufgabe 38: kern/bahn-daten.js bringt B_BEUGE mit,
# die eine Stelle, die „dein" vor ein Hauptwort setzt und dessen
# Geschlecht kennt.
fuellen = T('../kern/fuellen.js')
bahn    = T('../kern/bahn-daten.js')

html = (KOPF + T('basis.css') + '\n' + stil + '</style></head><body>\n'
        + koerper + '\n<script>\n' + fuellen + '\n' + bahn + '\n'
        + engine + '\n' + rechner + '\n' + daten + '\n' + app
        + '\n</script>\n</body></html>\n')

# Die App-Ansicht: Manifest, Symbol, Zwischenspeicher. Die Zeilen dafür
# stehen in app/app-kopf.html — an einer Stelle für alle Seiten.
html = html.replace('<head>', '<head>'
                    + (hier.parent / 'app' / 'app-kopf.html').read_text(encoding='utf-8'), 1)
ziel = wiki / 'ophiuchus.html'
ziel.write_text(html, encoding='utf-8')

fehler = []
alles = koerper + app + daten + rechner

sys.path.insert(0, str(hier.parent / 'rituale'))
import pruefwerk

# 1 · Jede ID, die das Skript sucht, muss im Körper stehen
ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
gesucht |= set(re.findall(r"""getElementById\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
gesucht -= {'nivleiste'}                       # setzt niveau.js selbst ein
if gesucht - ids:
    fehler.append('fehlende IDs im Körper: ' + ', '.join(sorted(gesucht - ids)))

# 2 · Die Tags gehen auf
for tag in ('div', 'section', 'nav', 'details', 'table', 'ul', 'p'):
    auf = len(re.findall(r'<' + tag + r'\b', koerper))
    zu  = len(re.findall(r'</' + tag + r'>', koerper))
    if auf != zu:
        fehler.append(f'{tag}-Unwucht im Körper: {auf} auf, {zu} zu')

# 3 · Keine Namenskollision mit der Engine und den anderen Modulen
#
#     Die Anzeige liegt seit heute in einer eigenen Hülle, und das ist
#     kein Schönheitsschritt: Vorher stand dort `var T` als globaler
#     Name, und `T` ist genau der Name, den die Engine in jeder ihrer
#     Funktionen als Parameter führt. Heute ging das gut, weil ein
#     Parameter den globalen Namen verdeckt — Glück und keine Prüfung.
#     Geprüft wird, was wirklich im globalen Namensraum landet, und
#     nicht, was eine Datei irgendwo schreibt: Eine Datei in eigener
#     Hülle gibt nur ihre `window.`-Namen heraus. Sonst schlüge die
#     Regel auf jeden Namen an, den eine Hülle gerade schützt — und
#     eine Regel, die bei richtiger Bauart meckert, wird abgeschaltet.
def _globale(quelle):
    raus = set(re.findall(r'window\.([A-Za-z_][A-Za-z0-9_]*)\s*=', quelle))
    if not re.search(r'^\(function\(\)\{', quelle, re.M):
        raus |= set(re.findall(r'^(?:var|function)\s+([A-Za-z_][A-Za-z0-9_]*)',
                               quelle, re.M))
    return raus


# Der Fund von heute, nebenbei: Die alte, unverhüllte Anzeige führte
# `nrm` und `gewaehlt` — genau die zwei Namen, die `engine.js` schon
# global vergibt. Die Seite lief, weil der Rumpf von `nrm` Zeichen für
# Zeichen derselbe war und `gewaehlt` dort ebenfalls `null` sein
# sollte. Glück, keine Prüfung (REGELN.md 6f).
_MODULE = [('kern/fuellen.js', fuellen), ('kern/bahn-daten.js', bahn),
           ('engine.js', engine), ('sternbild.js', rechner),
           ('oph-daten.js', daten), ('oph-app.js', app)]
_woher = {}
for _name, _quelle in _MODULE:
    for _n in _globale(_quelle):
        if _n in _woher:
            fehler.append(f'der globale Name „{_n}" wird zweimal vergeben: '
                          f'{_woher[_n]} und {_name}')
        _woher[_n] = _name
if not re.search(r'^\(function\(\)\{', app, re.M):
    fehler.append('oph-app.js steht nicht in einer eigenen Hülle — '
                  'ihre Namen liegen dann neben denen der Engine')
meine = set(re.findall(r'window\.(AC_[A-Z_]+)\s*=', daten + app))
if meine != {'AC_OPHT'}:
    fehler.append('unerwartete globale Namen: ' + ', '.join(sorted(meine)))

# 3a · Die Anzeige schreibt keinen Satz und kein „dein"
#
#      Aufgabe 64, die letzte aus dem Zug von Aufgabe 34. Alles, was
#      die Seite beschriftet, steht in oph-daten.js als OP_T; die
#      Anzeige setzt mit AC_FUELL ein und lässt „dein" von B_BEUGE
#      bilden. Was in oph-app.js stünde, zöge beim Umzug in eine
#      andere Umgebung nicht mit (PRODUKT.md Abschnitt 7) — deshalb
#      ist das hier eine Sperre und kein Vorsatz.
if not re.search(r'\bvar OP_T\s*=', daten):
    fehler.append('Tafel OP_T fehlt in oph-daten.js')
fehler += pruefwerk.pruefe_anzeige_satzfrei(app, 'oph-app.js', 'oph-daten.js')
fehler += pruefwerk.pruefe_anzeige_ohne_dein(app, 'oph-app.js')
fehler += pruefwerk.pruefe_fueller(app, 'oph-app.js')
fehler += pruefwerk.pruefe_vorlagenluecken(daten, app, 'oph-daten.js')
if pruefwerk.ruft_ohne_stelle(ziel.read_text(encoding='utf-8')):
    fehler.append('die Seite füllt Lücken, aber kern/fuellen.js liegt nicht mit darauf')

#      Und die Gegenprobe gegen die Fehlerklasse, die ein grüner
#      Riegel nicht ausschließt: dass er heute nur nichts zu finden
#      hatte (REGELN.md 6e, Nachsatz). In allen drei Anführungsarten,
#      denn ein Satz, der in doppelten oder schrägen
#      Anführungszeichen durchgeht, wäre das Loch, über das die Sätze
#      einzeln zurückkommen.
for _art, _an in (('einfache', "'"), ('doppelte', '"'), ('schräge', '`')):
    _mit = app + '\nvar _gegenprobe=' + _an + 'Die Sonne steht tropisch' + _an + ';\n'
    if not pruefwerk.pruefe_anzeige_satzfrei(_mit, 'oph-app.js', 'oph-daten.js'):
        fehler.append(f'der Riegel sieht einen Satz in {_art} Anführung nicht — '
                      'dann hält er nur, was heute zufällig nicht dasteht')
    _mit = app + '\nvar _gegenprobe=' + _an + 'deine Sonne' + _an + ';\n'
    if not pruefwerk.pruefe_anzeige_ohne_dein(_mit, 'oph-app.js'):
        fehler.append(f'der Riegel sieht ein „dein" in {_art} Anführung nicht — '
                      'dann kommt die ungebeugte Form einzeln zurück')

# 3b · Die zwölf Zeichen stehen nicht zweimal
#
#      `oph-daten.js` führt die Reihe als ZEICHEN, die Engine als
#      SIGNS. Zwei Tafeln mit denselben zwölf Wörtern sind heute
#      gleich — das ist Glück und keine Prüfung, dieselbe Lage wie
#      `mundart` und `P0` am 2026-11-25. Solange beide auf dieser
#      Seite liegen, hält diese Zeile sie aneinander; die Doppelung
#      selbst ist als Aufgabe eingetragen.
#
#      Und die dreizehnte Einteilung wird nicht neben die zwölf
#      geschrieben, sondern aus ihnen gebildet: Wer `Z13` wieder von
#      Hand hinschreibt, bringt zwölf Wörter ein zweites Mal mit.
zeichen_daten = re.search(r'var ZEICHEN\s*=\s*\[(.*?)\]', daten, re.S)
zeichen_engine = re.search(r'var SIGNS\s*=\s*\[(.*?)\]', engine, re.S)
if not zeichen_daten or not zeichen_engine:
    fehler.append('Zeichenreihe nicht gefunden — ZEICHEN in oph-daten.js '
                  'oder SIGNS in der Engine fehlt')
else:
    hol = lambda s: re.findall(r"'([^']+)'", s)
    if hol(zeichen_daten.group(1)) != hol(zeichen_engine.group(1)):
        fehler.append('ZEICHEN in oph-daten.js und SIGNS in der Engine sagen '
                      'nicht dasselbe — zwei Tafeln, die auseinanderlaufen')
    if len(hol(zeichen_daten.group(1))) != 12:
        fehler.append('ZEICHEN führt nicht zwölf Namen')
if re.search(r"'Schlangenträger'\s*,\s*'Schütze'", daten + app):
    fehler.append('die dreizehn Zeichen stehen von Hand neben den zwölf — '
                  'sie entstehen aus ZEICHEN und OP_DREIZEHN')

klar = htmlmod.unescape(re.sub(r'<[^>]+>', ' ', koerper))

# 4 · Jeder Text ist vollständig und lang genug
for marke in ('spannen', 'ophwahl', 'ophtabelle', 'ophband', 'ophantwort',
              'ophkopie', 'ophecho', 'ophquellen'):
    if f'id="{marke}"' not in koerper:
        fehler.append(f'Element fehlt im Körper: {marke}')
if len(re.findall(r'<h2', koerper)) < 6:
    fehler.append('zu wenige Abschnitte auf der Seite')
for pflicht in ('stimmt nicht', 'Was es nicht gibt',
                'Beide messen etwas Richtiges'):
    if pflicht not in klar:
        fehler.append(f'Im ehrlichen Teil fehlt: {pflicht}')
# Jeder Text in OP_T trägt etwas, und eine Vorlage ist mehr als ihre
# Lücke.
#
#     Diese Regel ist zweimal zu weit gegriffen, bevor sie saß, und
#     beide Male auf dieselbe Weise: Sie zählte Zeichen, statt die
#     Form zu prüfen, die gemeint ist (REGELN.md 6e).
#
#     Erst „jeder Text ist länger als sechs Zeichen" — das schlug auf
#     `ohne: '—'` und `ohneName: 'Du'` an. Beide sind richtig so: der
#     Strich steht für ein Feld ohne Wert, „Du" ist die Anrede ohne
#     Namen.
#
#     Dann „eine Vorlage mit Lücke ist länger als vierzehn Zeichen" —
#     das schlug auf `'{tage} Tage'` und `'„{text}“'` an, und auch die
#     sind richtig: Einheit und Anführung sind kurz.
#
#     Gemeint ist beides Mal dasselbe: **Eine Vorlage, die nichts als
#     ihre Lücke ist, ist keine Vorlage** — dann gehört der Wert
#     direkt an die Stelle und nicht durch AC_FUELL. Das erkennt man
#     daran, dass nach dem Abzug aller Lücken kein Zeichen übrig
#     bleibt, und nicht an der Länge.
def _vorlage_tadel(name, roh):
    """Was an einem Eintrag von OP_T nicht stimmt. `roh` ist der
    Quelltext des Werts samt Anführung."""
    inhalt = roh.strip().strip(',;')
    if len(inhalt) <= 2:
        return f'OP_T.{name} ist leer'
    if '{' in inhalt and not re.sub(r'\{[a-zA-Z][a-zA-Z0-9]*\}', '',
                                   inhalt[1:-1]).strip():
        return (f'OP_T.{name} ist nichts als seine Lücke — ein Wert ohne '
                'Satz darum geht ohne AC_FUELL an seine Stelle')
    return None


# Die festen Beispiele (REGELN.md 6e). Sie laufen, bevor die Seite
# geprüft wird — bricht die Regel, bricht sie hier.
for _n, _r in [("a", "''"), ("b", "'{x}'"), ("c", "'{x}{y}'"),
               ("d", "'{x} '")]:
    assert _vorlage_tadel(_n, _r), f'müsste anschlagen: {_r}'
for _r in ["'—'", "'Du'", "'{tage} Tage'", "'„{text}“'", "'Chart'",
           "'{name} wäre tatsächlich Schlangenträger.'", "'—',"]:
    assert _vorlage_tadel('x', _r) is None, f'müsste durchgehen: {_r}'
del _n, _r

for name, wert in re.findall(r"^\s(\w+):\s+(['\"][^\n]*)$", daten, re.M):
    tadel = _vorlage_tadel(name, wert)
    if tadel:
        fehler.append(tadel)

# 5 · Kein echtes Geburtsdatum, kein toLowerCase
if re.search(r'\b1987\b', alles):
    fehler.append('echtes Geburtsjahr im Quelltext')
if re.search(r'\b08:58\b', alles):
    fehler.append('echte Geburtszeit im Quelltext')
if '.toLowerCase(' in alles:
    fehler.append('toLowerCase auf deutschem Text')

# 6 · Keine Versprechen, kein Verkaufston, keine Angst als Hebel
for wort in ('garantiert', 'auf jeden Fall', 'wird passieren', 'zu 100'):
    if wort.lower() in klar.lower():
        fehler.append(f'Versprechen im Text: „{wort}"')
if '!' in klar:
    fehler.append('Ausrufezeichen im sichtbaren Text')

# 7 · Rauchprobe im Browser
#
#     Die Seite hatte bis heute keine — und genau deshalb ist der
#     Fehler des Tages monatelang ausgeliefert worden: Jede Zahl auf
#     ihr trug einen Punkt statt eines Kommas („44.6 Tage", „-4.9°
#     Breite"), gegen REGELN.md Abschnitt 4. Eine Datenprüfung sieht
#     das nicht, denn im Quelltext steht keine dieser Zahlen; sie
#     entsteht erst beim Zeichnen. Deshalb wird hier gezeichnet und
#     danach gelesen, auf jeder Stufe.
probe = hier / '_probe-oph.js'
probe.write_text(r"""
const {chromium}=(function(){const orte=[process.env.AC_PLAYWRIGHT,'playwright',
'/opt/npm-tools/node_modules/playwright'];for(const o of orte){if(!o)continue;
try{return require(o);}catch(e){}}
throw new Error('Playwright nicht gefunden. AC_PLAYWRIGHT setzen oder playwright installieren.');})();
/* Erfundene Daten. Echte Geburtsdaten stehen in keinem Quelltext
   (REGELN.md Abschnitt 6). Das zweite Profil ist mit Absicht im
   Dezember geboren: Dann läuft die Sonne durch den Schlangenträger,
   und der andere Zweig des Aufmachers wird wirklich gezeichnet. */
const PROFIL={v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:[
 {id:'p1',name:'Probe Person',alias:'Probe',y:1980,mo:7,d:15,h:14,mi:20,tz:1,
  lat:52.52,lon:13.405,ort:'Berlin',wlat:52.52,wlon:13.405,wort:'Berlin',
  eigen:true,readings:[]},
 {id:'p2',name:'Dezember Kind',alias:'Dez',y:1994,mo:12,d:5,h:9,mi:30,tz:1,
  lat:48.137,lon:11.575,ort:'Muenchen',wlat:48.137,wlon:11.575,wort:'Muenchen',
  eigen:false,readings:[]}]};
function sichtbar(){
  const aus=[]; const lauf=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  let n; while(n=lauf.nextNode()){ const e=n.parentElement; if(!e) continue;
    if(e.offsetParent===null&&e.tagName!=='BODY') continue;
    const d=e.closest('details'); if(d&&!d.open&&!e.closest('summary')) continue;
    const t=n.nodeValue.replace(/\s+/g,' ').trim(); if(t) aus.push(t); }
  return aus.join('\n');
}
(async()=>{
const b=await chromium.launch(); const f=[]; const raus={text:{},fehler:f};
for(const lage of ['ohne','mit']){
  const ctx=await b.newContext({viewport:{width:390,height:900}});
  if(lage==='mit') await ctx.addInitScript(P=>localStorage.setItem(
    'ac_profile_v1',JSON.stringify(P)),PROFIL);
  const p=await ctx.newPage();
  p.on('pageerror',e=>f.push(lage+': '+String(e.message).slice(0,150)));
  await p.goto('file://ZIEL'); await p.waitForTimeout(900);
  for(const s of [0,1,2,3,4]){
    await p.evaluate(n=>{ if(window.AC_NIV&&AC_NIV.setzen) AC_NIV.setzen(n); },s);
    await p.waitForTimeout(350);
    raus.text[lage+'/'+s]=await p.evaluate(sichtbar);
  }
  if(lage==='ohne'){
    raus.leer=await p.evaluate(()=>({
      hinweis:document.querySelectorAll('.oph-leer').length,
      band:(document.getElementById('ophband')||{}).innerHTML.length}));
  }
  if(lage==='mit'){
    await p.evaluate(()=>{ if(window.AC_NIV&&AC_NIV.setzen) AC_NIV.setzen(2); });
    await p.waitForTimeout(300);
    raus.da=await p.evaluate(()=>({
      balken:document.querySelectorAll('.spz').length,
      zeilen:document.querySelectorAll('table.vgl tbody tr').length,
      spalten:document.querySelectorAll('table.vgl thead th').length,
      gross:document.querySelectorAll('.oph-gross').length,
      band:document.querySelectorAll('#ophband .oph-karte').length,
      antwort:(document.getElementById('ophantwort')||{}).textContent.trim().length,
      kursiv:document.querySelectorAll('#ophantwort i').length,
      quellen:(document.getElementById('ophquellen')||{}).textContent.trim().length,
      knoepfe:document.querySelectorAll('#ophwahl button').length,
      klammer:/[{][a-zA-Z]+[}]/.test(document.body.innerText),
      schlecht:/undefined|NaN|\[object|Invalid/.test(document.body.innerText),
      breit:document.body.scrollWidth, fenster:window.innerWidth}));
    /* Die Chartwahl muss den Inhalt wirklich wechseln, nicht nur
       die Markierung setzen. */
    const vor=await p.evaluate(()=>document.getElementById('ophtabelle').textContent);
    const kn=await p.$$('#ophwahl button');
    if(kn.length>1){ await kn[1].click(); await p.waitForTimeout(500); }
    raus.wahl={anzahl:kn.length,
      gleich:vor===await p.evaluate(()=>document.getElementById('ophtabelle').textContent),
      gedrueckt:await p.evaluate(()=>[...document.querySelectorAll('#ophwahl button')]
        .filter(x=>x.getAttribute('aria-pressed')==='true').length)};
    raus.text['zweites/2']=await p.evaluate(sichtbar);
    /* Nichts läuft über den Rand.

       „Über den Rand" heißt: Die Seite selbst wird breiter. Ein
       Element in einem Kasten, der absichtlich seitwärts rollt,
       läuft nicht über — die Vergleichstabelle ist auf dem Telefon
       genau das (oph-stil.css, @media max-width:620px). Eine
       Prüfung, die beides gleich behandelt, meldet eine richtige
       Bauart als Fehler und wird abgeschaltet (REGELN.md 6e). */
    raus.ueber=await p.evaluate(()=>{
      const rollt=e=>{ for(let a=e.parentElement;a;a=a.parentElement){
        const o=getComputedStyle(a).overflowX;
        if(o==='auto'||o==='scroll'){
          if(a.scrollWidth>a.clientWidth+1) return true; } }
        return false; };
      return [...document.querySelectorAll('.wrap *')]
        .filter(e=>e.getBoundingClientRect().right>window.innerWidth+1.5)
        .filter(e=>!rollt(e))
        .map(e=>e.className||e.tagName).slice(0,6);});
    /* AC_KOMMA ist die eine Stelle, und sie bricht ab statt zu
       verschwinden — geprüft auf der Seite selbst. */
    raus.komma=await p.evaluate(()=>{
      const r={};
      r.punkt=AC_KOMMA(44.6,1); r.rund=AC_KOMMA(2.25,1);
      r.ganz=AC_KOMMA(45,0); r.neg=AC_KOMMA(-4.9,1);
      try{ AC_KOMMA(undefined,1); r.bricht=false; }catch(e){ r.bricht=true; }
      try{ AC_KOMMA(1/0,1); r.unendlich=false; }catch(e){ r.unendlich=true; }
      return r;});
  }
  await ctx.close();
}
console.log(JSON.stringify(raus));
await b.close();})();
""".replace('ZIEL', str(ziel)), encoding='utf-8')

try:
    r = subprocess.run(['node', str(probe)], capture_output=True, text=True, timeout=240)
    pr = json.loads(r.stdout.strip().splitlines()[-1]) if r.returncode == 0 else None
    if pr is None:
        letzte = (r.stderr.strip().splitlines() or ['ohne Meldung'])[-1]
        fehler.append('Rauchprobe: ' + letzte[:200])
    else:
        if pr['fehler']:
            fehler.append('Skriptfehler: ' + '; '.join(pr['fehler'])[:240])
        d = pr['da']
        if d['balken'] != 13:   fehler.append(f"Spannenbalken: {d['balken']} statt 13")
        if d['zeilen'] != 10:   fehler.append(f"Tabellenzeilen: {d['zeilen']} statt 10")
        if d['spalten'] != 5:   fehler.append(f"Tabellenspalten: {d['spalten']} statt 5")
        if d['gross'] != 1:     fehler.append('der Aufmacher über dem Chart fehlt')
        if d['band'] != 1:      fehler.append('der Abschnitt zum Band fehlt')
        if d['antwort'] < 400:  fehler.append('der Absatz zum Kopieren ist leer')
        if d['kursiv'] != 1:    fehler.append('im kopierbaren Absatz fehlt die Kursive')
        if d['quellen'] < 200:  fehler.append('die Quellenangabe ist leer')
        if d['knoepfe'] != 2:   fehler.append(f"Chartknöpfe: {d['knoepfe']} statt 2")
        if d['klammer']:        fehler.append('eine Vorlagenlücke steht ungefüllt auf der Seite')
        if d['schlecht']:       fehler.append('undefined/NaN auf der Seite sichtbar')
        if d['breit'] > d['fenster'] + 2:
            fehler.append(f"Seite läuft über den Rand: {d['breit']} > {d['fenster']}")
        if pr['ueber']:
            fehler.append('ragt über den Rand: ' + ', '.join(pr['ueber'])[:150])
        if pr['leer']['hinweis'] != 1:
            fehler.append('ohne Profil fehlt der Hinweis auf die Profilseite')
        if pr['leer']['band']:
            fehler.append('ohne Profil steht trotzdem ein Bandabschnitt da')
        w = pr['wahl']
        if w['anzahl'] != 2:    fehler.append('die Chartwahl bietet nicht zwei Charts')
        if w['gleich']:         fehler.append('die Chartwahl wechselt den Inhalt nicht')
        if w['gedrueckt'] != 1: fehler.append('die Chartwahl markiert nicht genau eine Wahl')
        k = pr['komma']
        for soll, ist, was in (('44,6', k['punkt'], 'eine Stelle'),
                               ('2,3', k['rund'], 'Rundung'),
                               ('45', k['ganz'], 'ohne Nachkomma'),
                               ('-4,9', k['neg'], 'negativ')):
            if ist != soll:
                fehler.append(f'AC_KOMMA auf der Seite falsch ({was}): '
                              f'„{ist}" statt „{soll}"')
        if not k['bricht']:
            fehler.append('AC_KOMMA macht aus einem fehlenden Wert Text, '
                          'statt abzubrechen')
        if not k['unendlich']:
            fehler.append('AC_KOMMA druckt eine Division durch Null')

        # Keine Zahl im sichtbaren Text trägt einen Punkt.
        #
        #     Der Fehler vom 2026-11-26, auf jeder Stufe und in jeder
        #     Lage nachgemessen: Welche Zahlen überhaupt dastehen,
        #     entscheidet das Chart, und auf Stufe 0 steht eine
        #     andere Auswahl als auf Stufe 4. Eine Prüfung an einer
        #     Stelle wäre eine, deren Fall heute nicht vorkam
        #     (REGELN.md 6e, Nachsatz).
        for lage, text in sorted(pr['text'].items()):
            for m in pruefwerk.pruefe_dezimalpunkte(text, f'der Seite ({lage})'):
                fehler.append(m)
except subprocess.TimeoutExpired:
    fehler.append('Rauchprobe: Zeitüberschreitung')
finally:
    probe.unlink(missing_ok=True)

print(f'ophiuchus.html  {ziel.stat().st_size:,} Bytes')
for x in fehler:
    print('  FEHLER: ' + x)
sys.exit(1 if fehler else 0)
