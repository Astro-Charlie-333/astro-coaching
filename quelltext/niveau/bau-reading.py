#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut wiki/reading.html — „Das Reading in ihrer Sprache".

Das Werkzeug, mit dem die Coachin einen Tiefgang herausgibt
(`PRODUKT.md` Abschnitt 4, Weg 1): dasselbe Chart in fünf Fassungen,
zum Kopieren, Speichern und Drucken.

Seit dem 2026-11-27 (Aufgabe 65, aus dem Zug von Aufgabe 34) trennt
dieser Bau, was vorher in einer Datei lag:

    reading-daten.js    die Worte. Nichts rechnet, nichts zeigt an.
    reading-rechner.js  die Rechnung. Weiß nichts von Sätzen.
    reading-app.js      die Anzeige. Setzt zusammen, formuliert nicht.

Bis dahin hatte diese Seite **keine Rauchprobe** — und genau deshalb
waren vier Fehler monatelang ausgeliefert, von denen man drei sehen
konnte:

  · Auf Stufe 0 stand „Krebs-Anteil:" — ein Zeichenname auf der
    Stufe, die keinen kennt (`REGELN.md` Abschnitt 2).
  · Auf Stufe 1 fingen drei Absätze klein an („deine Sonne in
    Krebs — …"), zwei Absätze weiter stand dieselbe Form groß.
  · Ab Stufe 3 trug jede Gradzahl einen Punkt statt eines Kommas
    („(1.6°)", „Feuer 0.0 · Erde 6.0") — `REGELN.md` Abschnitt 4,
    dieselbe Klasse wie auf `ophiuchus.html` am 2026-11-26.
  · Hinter einem Satzpunkt stand ein Gedankenstrich: „… funktioniert
    bei dir nicht. — im 9. Haus (…)."

Keiner davon steht im Quelltext: Jeder entsteht erst beim Zeichnen.
Deshalb wird hier gezeichnet und danach gelesen, auf jeder Stufe und
in beiden Lagen (`REGELN.md` 6e).
"""
import html as htmlmod
import json, pathlib, re, subprocess, sys

hier = pathlib.Path(__file__).parent.resolve()
wiki = hier.parent / 'wiki'
T = lambda n: (hier / n).read_text(encoding='utf-8')

KOPF = '''<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Reading nach Wissensstand &middot; Astro-Charlie</title>
<link rel="stylesheet" href="schriften/schriften.css">
<script src="profil.js"></script>
<script src="niveau.js"></script>
<script src="aspekte-daten.js"></script>
<script src="schatten.js"></script>
<style>
'''

koerper = T('reading-koerper.html')
app     = T('reading-app.js')
daten   = T('reading-daten.js')
rechner = T('reading-rechner.js')
engine  = T('engine.js')
stil    = T('reading-stil.css')
wortwahl = T('wortwahl.js')
# Aufgabe 94 und 64: `kern/fuellen.js` ist die eine Stelle, die eine
# Lücke füllt, eine Zahl zu deutschem Text macht (AC_KOMMA) und seit
# heute einen Halbsatz groß anfangen lässt (AC_GROSS). Aufgabe 38:
# `kern/bahn-daten.js` bringt B_BEUGE mit, die eine Stelle, die „dein"
# vor ein Hauptwort setzt und dessen Geschlecht kennt.
fuellen = T('../kern/fuellen.js')
bahn    = T('../kern/bahn-daten.js')

# `wortwahl.js` liegt mit auf der Seite und wird nicht von oben
# geladen. Der Grund ist die Rauchprobe: `wiki/wortwahl.js` ist eine
# zweite Fassung derselben Datei, die erst `pruefe-alles.py` aus der
# Quelle erneuert — ein Bau, der allein läuft, hätte sonst die
# Sprachtafel von vorgestern gemessen und wäre grün geblieben,
# während die Seite mit der neuen Fassung bricht. Eine Prüfung, die
# etwas anderes liest, als die Seite lädt, prüft nichts
# (`REGELN.md` 6e).
html = (KOPF + T('basis.css') + '\n' + stil + '</style></head><body data-niv-keine>\n'
        + koerper + '\n<script>\n' + fuellen + '\n' + bahn + '\n'
        + wortwahl + '\n' + engine + '\n' + rechner + '\n' + daten + '\n' + app
        + '\n</script>\n</body></html>\n')

# Die App-Ansicht: Manifest, Symbol, Zwischenspeicher. Die Zeilen dafür
# stehen in app/app-kopf.html — an einer Stelle für alle Seiten.
html = html.replace('<head>', '<head>'
                    + (hier.parent / 'app' / 'app-kopf.html').read_text(encoding='utf-8'), 1)
ziel = wiki / 'reading.html'
ziel.write_text(html, encoding='utf-8')

fehler = []
alles = koerper + app + daten + rechner

sys.path.insert(0, str(hier.parent / 'rituale'))
import pruefwerk

# ── 1 · Jede ID, die das Skript sucht, steht im Körper ─────────
ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
gesucht |= set(re.findall(r"""getElementById\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
if gesucht - ids:
    fehler.append('fehlende IDs im Körper: ' + ', '.join(sorted(gesucht - ids)))

# ── 2 · Die Tags gehen auf ─────────────────────────────────────
for tag in ('div', 'section', 'nav', 'details', 'p', 'h2'):
    auf = len(re.findall(r'<' + tag + r'\b', koerper))
    zu  = len(re.findall(r'</' + tag + r'>', koerper))
    if auf != zu:
        fehler.append(f'{tag}-Unwucht im Körper: {auf} auf, {zu} zu')

# ── 3 · Keine Namenskollision mit der Engine ───────────────────
#
#     Der zweite Fund von heute, und er war seit Monaten da: Die alte,
#     unverhüllte Anzeige führte `nrm`, `chartVon`, `haus` und
#     `gewaehlt` im globalen Namensraum — genau die vier Namen, die
#     `engine.js` dort schon vergibt. Die drei Funktionen standen
#     Zeichen für Zeichen gleich und `gewaehlt` sollte dort auch
#     `null` sein; die Seite lief also, weil beide Fassungen
#     zufällig dasselbe sagten. Ändert sich eine, rechnet diese Seite
#     lautlos anders als der Rest der Plattform. Glück, keine Prüfung
#     (`REGELN.md` 6f) — und genau die Lage, die `bau-oph.py` am
#     2026-11-26 gefunden hat.
#
#     Geprüft wird, was wirklich im globalen Namensraum landet, und
#     nicht, was eine Datei irgendwo schreibt: Eine Datei in eigener
#     Hülle gibt nur ihre `window.`-Namen heraus.
def _globale(quelle):
    raus = set(re.findall(r'window\.([A-Za-z_][A-Za-z0-9_]*)\s*=', quelle))
    if not re.search(r'^\(function\(\)\{', quelle, re.M):
        raus |= set(re.findall(r'^(?:var|function)\s+([A-Za-z_][A-Za-z0-9_]*)',
                               quelle, re.M))
    return raus


_MODULE = [('kern/fuellen.js', fuellen), ('kern/bahn-daten.js', bahn),
           ('wortwahl.js', wortwahl),
           ('engine.js', engine), ('reading-rechner.js', rechner),
           ('reading-daten.js', daten), ('reading-app.js', app)]
_woher = {}
for _name, _quelle in _MODULE:
    for _n in _globale(_quelle):
        if _n in _woher:
            fehler.append(f'der globale Name „{_n}" wird zweimal vergeben: '
                          f'{_woher[_n]} und {_name}')
        _woher[_n] = _name
for _datei, _quelle in (('reading-app.js', app), ('reading-rechner.js', rechner)):
    if not re.search(r'^\(function\(\)\{', _quelle, re.M):
        fehler.append(f'{_datei} steht nicht in einer eigenen Hülle — '
                      'ihre Namen liegen dann neben denen der Engine')
meine = set(re.findall(r'window\.(AC_[A-Z_]+)\s*=', daten + app + rechner))
if meine != {'AC_RDR'}:
    fehler.append('unerwartete globale Namen: ' + ', '.join(sorted(meine)))

# ── 3a · Die Anzeige schreibt keinen Satz und kein „dein" ──────
#
#      Aufgabe 65. Alles, was die Seite beschriftet, steht in
#      `reading-daten.js` als `RD_T`; die Anzeige setzt mit AC_FUELL
#      ein, lässt „dein" von B_BEUGE bilden, die Zahl von AC_KOMMA
#      und den großen Anfang von AC_GROSS. Was in `reading-app.js`
#      stünde, zöge beim Umzug in eine andere Umgebung nicht mit
#      (`PRODUKT.md` Abschnitt 7) — deshalb ist das hier eine Sperre
#      und kein Vorsatz.
if not re.search(r'\bvar RD_T\s*=', daten):
    fehler.append('Tafel RD_T fehlt in reading-daten.js')
fehler += pruefwerk.pruefe_anzeige_satzfrei(app, 'reading-app.js', 'reading-daten.js')
fehler += pruefwerk.pruefe_anzeige_ohne_dein(app, 'reading-app.js')
fehler += pruefwerk.pruefe_fueller(app, 'reading-app.js')
fehler += pruefwerk.pruefe_vorlagenluecken(daten, app, 'reading-daten.js')
# Der Rechner weiß nichts von Sätzen (`REGELN.md` Abschnitt 5).
fehler += pruefwerk.pruefe_anzeige_satzfrei(rechner, 'reading-rechner.js',
                                            'reading-daten.js')
fehler += pruefwerk.pruefe_anzeige_ohne_dein(rechner, 'reading-rechner.js')
# Und keine der drei Dateien baut sich den großen Anfang selbst.
for _datei, _quelle in (('reading-app.js', app), ('reading-rechner.js', rechner),
                        ('reading-daten.js', daten), ('wortwahl.js', wortwahl)):
    fehler += pruefwerk.pruefe_grossschreibung(_quelle, _datei)
fehlt_stelle = pruefwerk.ruft_ohne_stelle(ziel.read_text(encoding='utf-8'))
if fehlt_stelle:
    fehler.append('die Seite ruft ' + ', '.join(fehlt_stelle)
                  + ', hat aber kern/fuellen.js nicht mit darauf')

#      Die Gegenprobe gegen die Fehlerklasse, die ein grüner Riegel
#      nicht ausschließt: dass er heute nur nichts zu finden hatte
#      (`REGELN.md` 6e, Nachsatz). In allen drei Anführungsarten,
#      denn ein Satz, der in doppelten oder schrägen
#      Anführungszeichen durchgeht, wäre das Loch, über das die Sätze
#      einzeln zurückkommen.
for _art, _an in (('einfache', "'"), ('doppelte', '"'), ('schräge', '`')):
    for _datei, _quelle in (('reading-app.js', app),
                            ('reading-rechner.js', rechner)):
        _mit = _quelle + '\nvar _gegenprobe=' + _an + 'Die Sonne steht tropisch' + _an + ';\n'
        if not pruefwerk.pruefe_anzeige_satzfrei(_mit, _datei, 'reading-daten.js'):
            fehler.append(f'der Satzriegel sieht in {_datei} eine {_art} '
                          'Anführung nicht — dann hält er nur, was heute '
                          'zufällig nicht dasteht')
        _mit = _quelle + '\nvar _gegenprobe=' + _an + 'deine Sonne' + _an + ';\n'
        if not pruefwerk.pruefe_anzeige_ohne_dein(_mit, _datei):
            fehler.append(f'der „dein"-Riegel sieht in {_datei} eine {_art} '
                          'Anführung nicht — dann kommt die ungebeugte Form '
                          'einzeln zurück')
_mit = app + '\nvar _gegenprobe=s.charAt(0).toUpperCase()+s.slice(1);\n'
if not pruefwerk.pruefe_grossschreibung(_mit, 'reading-app.js'):
    fehler.append('der Riegel gegen die eigene Großschreibung greift nicht')

# ── 3b · Die Beugung steht nicht zweimal ───────────────────────
#
#      `wortwahl.js` hat bis heute in `ueberschrift()` aus „deine
#      Sonne" per Suchmuster „Deine Sonne" gemacht — die Beugung von
#      Hand, neben `B_BEUGE`. Die Funktion ist gestrichen; diese
#      Zeile hält, dass keine zweite zurückkommt.
if re.search(r"replace\(\s*/\^?[Dd]ein", wortwahl + app + daten + rechner):
    fehler.append('„dein" wird per Suchmuster zusammengesetzt — die Form '
                  'bildet B_BEUGE in kern/bahn-daten.js (Aufgabe 65)')
# Und dieses Wörterbuch hält Worte, kein Zahlenformat.
if 'toFixed(' in pruefwerk.nur_code(wortwahl):
    fehler.append('wortwahl.js formatiert eine Zahl — das tut AC_KOMMA in '
                  'kern/fuellen.js, gerufen von der Anzeige')

# ── 3c · Die Elementtafeln sagen dasselbe ──────────────────────
#
#      Der Rechner führt `ELE` und `MODUS` als Schlüssel, die Daten
#      `R_ELEMENT` und `R_MODUS` als Worte. Zwei Listen mit denselben
#      Namen sind heute gleich — das ist Glück und keine Prüfung,
#      dieselbe Lage wie `ZEICHEN` und `SIGNS` auf `ophiuchus.html`.
for _rname, _dname in (('ELE', 'R_ELEMENT'), ('MODUS', 'R_MODUS')):
    _r = re.search(r'var ' + _rname + r'\s*=\s*\[(.*?)\]', rechner, re.S)
    _d = re.search(r'var ' + _dname + r'\s*=\s*\{(.*?)\}\};', daten, re.S)
    if not _r or not _d:
        fehler.append(f'{_rname} im Rechner oder {_dname} in den Daten fehlt')
        continue
    _schluessel = re.findall(r"'([^']+)'", _r.group(1))
    _worte = re.findall(r'^\s*([A-Za-zÄÖÜäöü]+)\s*:\s*\{', _d.group(1), re.M)
    if _schluessel != _worte:
        fehler.append(f'{_rname} im Rechner und {_dname} in den Daten sagen '
                      f'nicht dasselbe: {_schluessel} gegen {_worte}')

klar = htmlmod.unescape(re.sub(r'<[^>]+>', ' ', koerper))

# ── 4 · Jeder Text ist vollständig und lang genug ──────────────
for marke in ('rdwahl', 'rdstufe', 'rdinhalt', 'rdkopie', 'rddatei',
              'rddruck', 'rdecho'):
    if f'id="{marke}"' not in koerper:
        fehler.append(f'Element fehlt im Körper: {marke}')
if len(re.findall(r'<h2', koerper)) < 1:
    fehler.append('zu wenige Abschnitte auf der Seite')
for pflicht in ('ehrliche Anmerkung zur Methode', 'ändert sich zwischen den Stufen'):
    if pflicht not in klar:
        fehler.append(f'Im ehrlichen Teil fehlt: {pflicht}')
# Jede Liste in RD_T hat höchstens fünf Stellen, eine je Stufe, und
# jeder Text trägt etwas. Eine Vorlage, die nichts als ihre Lücke
# ist, ist keine Vorlage (dieselbe Regel wie in `bau-oph.py`).
for _n, _roh in re.findall(r"^\s(\w+):\s+('[^\n]*)$", daten, re.M):
    _inhalt = _roh.strip().strip(',;')
    if len(_inhalt) <= 2:
        fehler.append(f'RD_T.{_n} ist leer')
    elif '{' in _inhalt and not re.sub(r'\{[a-zA-Z][a-zA-Z0-9]*\}', '',
                                       _inhalt[1:-1]).strip():
        fehler.append(f'RD_T.{_n} ist nichts als seine Lücke')
for _n, _inhalt in re.findall(r'^ (\w+):\s*\[(.*?)\],?$', daten, re.S | re.M):
    if _inhalt.count("',\n  '") + 1 > 5 or _inhalt.count("', '") + 1 > 5:
        fehler.append(f'RD_T.{_n} hat mehr als fünf Stellen — es gibt fünf Stufen')

# ── 5 · Kein echtes Geburtsdatum, kein toLowerCase ─────────────
#
#     Der vierte Fund von heute: Der Dateiname nahm den Vornamen
#     durch `toLowerCase` — aus „Müller" wurde „müller". `REGELN.md`
#     Abschnitt 4 verbietet das seit Monaten, nur hat es hier nie
#     jemand geprüft.
if re.search(r'\b1987\b', alles):
    fehler.append('echtes Geburtsjahr im Quelltext')
if re.search(r'\b08:58\b', alles):
    fehler.append('echte Geburtszeit im Quelltext')
if '.toLowerCase(' in alles:
    fehler.append('toLowerCase auf deutschem Text')

# ── 6 · Keine Versprechen, kein Verkaufston, keine Angst ───────
for wort in ('garantiert', 'auf jeden Fall', 'wird passieren', 'zu 100'):
    if wort.lower() in (klar + daten).lower():
        fehler.append(f'Versprechen im Text: „{wort}"')
if '!' in klar:
    fehler.append('Ausrufezeichen im sichtbaren Text')

# ── 7 · Rauchprobe im Browser ──────────────────────────────────
probe = hier / '_probe-reading.js'
probe.write_text(r"""
const {chromium}=(function(){const orte=[process.env.AC_PLAYWRIGHT,'playwright',
'/opt/npm-tools/node_modules/playwright'];for(const o of orte){if(!o)continue;
try{return require(o);}catch(e){}}
throw new Error('Playwright nicht gefunden. AC_PLAYWRIGHT setzen oder playwright installieren.');})();
/* Erfundene Daten. Echte Geburtsdaten stehen in keinem Quelltext
   (REGELN.md Abschnitt 6). Das zweite Profil ist mit Absicht ein
   anderes Chart: So lässt sich messen, ob die Wahl „Für wen" den
   Inhalt wirklich wechselt und nicht nur die Markierung setzt. */
const PROFIL={v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:[
 {id:'p1',name:'Probe Person',alias:'Probe',y:1980,mo:7,d:15,h:14,mi:20,tz:1,
  lat:52.52,lon:13.405,ort:'Berlin',wlat:52.52,wlon:13.405,wort:'Berlin',
  eigen:true,readings:[]},
 {id:'p2',name:'Zweite Probe',alias:'Zwei',y:1994,mo:12,d:5,h:9,mi:30,tz:1,
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
const b=await chromium.launch(); const f=[]; const raus={text:{},roh:{},fehler:f};
for(const lage of ['ohne','mit']){
  const ctx=await b.newContext({viewport:{width:390,height:900}});
  if(lage==='mit') await ctx.addInitScript(P=>localStorage.setItem(
    'ac_profile_v1',JSON.stringify(P)),PROFIL);
  const p=await ctx.newPage();
  p.on('pageerror',e=>f.push(lage+': '+String(e.message).slice(0,150)));
  await p.goto('file://ZIEL'); await p.waitForTimeout(900);
  if(lage==='ohne'){
    raus.leer=await p.evaluate(()=>({
      hinweis:document.querySelectorAll('.rd-leer').length,
      verweis:document.querySelectorAll('.rd-leer a[href="profile.html"]').length,
      knoepfe:document.querySelectorAll('#rdwahl button').length,
      artikel:document.querySelectorAll('article.rd').length}));
  }
  if(lage==='mit'){
    /* Jede Stufe wird über den Regler der Seite eingestellt. Der
       globale Wissensstand gilt hier nicht: Diese Seite fragt nach
       dem Stand der **Empfängerin**, deshalb trägt sie
       data-niv-keine und ihren eigenen Regler. */
    raus.rungen=await p.evaluate(()=>document.querySelectorAll('#rdstufe button[data-s]').length);
    for(const s of [0,1,2,3,4]){
      const k=await p.$('#rdstufe button[data-s="'+s+'"]');
      if(!k){ f.push('Rung '+s+' fehlt'); continue; }
      await k.click(); await p.waitForTimeout(350);
      raus.text['s'+s]=await p.evaluate(sichtbar);
      raus.roh['s'+s]=await p.evaluate(()=>{
        const a=document.querySelector('article.rd');
        return a?a.innerText.replace(/\s+/g,' ').trim():''; });
      raus['d'+s]=await p.evaluate(()=>({
        abschnitte:document.querySelectorAll('article.rd section.rd-ab').length,
        tech:document.querySelectorAll('article.rd .rd-tech').length,
        gedrueckt:[...document.querySelectorAll('#rdstufe button[data-s]')]
          .filter(x=>x.getAttribute('aria-pressed')==='true').length,
        klammer:/[{][a-zA-Z]+[}]/.test(document.body.innerText),
        schlecht:/undefined|NaN|\[object|Invalid/.test(document.body.innerText),
        klein:[...document.querySelectorAll('article.rd p, article.rd h3')]
          .map(e=>e.innerText.trim()).filter(t=>/^[a-zäöü]/.test(t)).slice(0,5),
        breit:document.body.scrollWidth, fenster:window.innerWidth}));
    }
    /* Die Wahl „Für wen" muss den Inhalt wirklich wechseln. */
    await (await p.$('#rdstufe button[data-s="2"]')).click();
    await p.waitForTimeout(300);
    const vor=await p.evaluate(()=>document.getElementById('rdinhalt').textContent);
    const kn=await p.$$('#rdwahl button');
    if(kn.length>1){ await kn[1].click(); await p.waitForTimeout(500); }
    raus.wahl={anzahl:kn.length,
      gleich:vor===await p.evaluate(()=>document.getElementById('rdinhalt').textContent),
      gedrueckt:await p.evaluate(()=>[...document.querySelectorAll('#rdwahl button')]
        .filter(x=>x.getAttribute('aria-pressed')==='true').length)};
    raus.text['zweite/2']=await p.evaluate(sichtbar);
    /* Nichts läuft über den Rand. */
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
    /* AC_GROSS und AC_KOMMA auf der Seite selbst: beide brechen ab,
       statt zu verschwinden. */
    raus.stellen=await p.evaluate(()=>{
      const r={};
      r.gross=AC_GROSS('deine Sonne'); r.tag=AC_GROSS('<b>dein Mond</b>');
      r.schon=AC_GROSS('Dein Merkur'); r.komma=AC_KOMMA(1.6,1);
      try{ AC_GROSS(undefined); r.gbricht=false; }catch(e){ r.gbricht=true; }
      try{ AC_KOMMA(undefined,1); r.kbricht=false; }catch(e){ r.kbricht=true; }
      return r;});
    /* Und der Dateiname lässt die Großschreibung stehen. */
    raus.datei=await p.evaluate(()=>{
      let name=null;
      const klick=HTMLAnchorElement.prototype.click;
      HTMLAnchorElement.prototype.click=function(){ name=this.download; };
      document.getElementById('rddatei').click();
      HTMLAnchorElement.prototype.click=klick;
      return name;});
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
        if pr['leer']['hinweis'] != 1:
            fehler.append('ohne Profil fehlt der Hinweis auf die Profilseite')
        if pr['leer']['verweis'] != 1:
            fehler.append('ohne Profil fehlt der Verweis nach profile.html')
        if pr['leer']['knoepfe']:
            fehler.append('ohne Profil steht trotzdem eine Auswahl „Für wen" da')
        if pr['leer']['artikel']:
            fehler.append('ohne Profil steht trotzdem ein Reading da')
        if pr.get('rungen') != 5:
            fehler.append(f"Stufenrungen: {pr.get('rungen')} statt 5")

        for s in range(5):
            d, wo = pr.get('d%d' % s), f'Stufe {s}'
            if not d:
                fehler.append(f'{wo} wurde nicht gezeichnet')
                continue
            if d['abschnitte'] < 6:
                fehler.append(f"{wo}: {d['abschnitte']} Abschnitte, zu wenige")
            if d['gedrueckt'] != 1:
                fehler.append(f'{wo}: der Regler markiert nicht genau eine Rung')
            if d['klammer']:
                fehler.append(f'{wo}: eine Vorlagenlücke steht ungefüllt da')
            if d['schlecht']:
                fehler.append(f'{wo}: undefined/NaN sichtbar')
            if d['breit'] > d['fenster'] + 2:
                fehler.append(f"{wo}: läuft über den Rand ({d['breit']} > {d['fenster']})")
            # Die Mechanik wartet, bis sie gefragt ist (REGELN.md 2).
            if s < 2 and d['tech']:
                fehler.append(f"{wo}: {d['tech']} Mechanik-Zeilen schon sichtbar")
            if s >= 3 and not d['tech']:
                fehler.append(f'{wo}: die Mechanik fehlt')
            # Kein Absatz und keine Überschrift fängt klein an —
            # der Fund von heute, auf jeder Stufe nachgemessen.
            if d['klein']:
                fehler.append(f"{wo}: fängt klein an: "
                              + '; '.join(x[:40] for x in d['klein']))

        # Auf Stufe 0 kein Fachwort — die Grundregel, am gezeichneten
        # Ergebnis und nicht an den Daten (REGELN.md Abschnitt 2 und 6e).
        if pr['roh'].get('s0'):
            fehler += pruefwerk.pruefe_stufe0(pr['roh']['s0'], 'Stufe 0 der Seite')
        # Keine Zahl im sichtbaren Text trägt einen Punkt. Welche
        # Zahlen dastehen, entscheidet das Chart, und auf Stufe 0 ist
        # das eine andere Auswahl als auf Stufe 4 — deshalb auf jeder.
        for lage, text in sorted(pr['text'].items()):
            fehler += pruefwerk.pruefe_dezimalpunkte(text, f'der Seite ({lage})')
        if pr['ueber']:
            fehler.append('ragt über den Rand: ' + ', '.join(pr['ueber'])[:150])

        w = pr['wahl']
        if w['anzahl'] != 2:
            fehler.append('die Auswahl „Für wen" bietet %d statt 2' % w['anzahl'])
        if w['gleich']:
            fehler.append('die Auswahl „Für wen" wechselt den Inhalt nicht')
        if w['gedrueckt'] != 1:
            fehler.append('die Auswahl „Für wen" markiert nicht genau eine Wahl')

        st = pr['stellen']
        for soll, ist, was in (('Deine Sonne', st['gross'], 'AC_GROSS'),
                               ('<b>Dein Mond</b>', st['tag'], 'AC_GROSS hinter einem Tag'),
                               ('Dein Merkur', st['schon'], 'AC_GROSS auf schon Großes'),
                               ('1,6', st['komma'], 'AC_KOMMA')):
            if ist != soll:
                fehler.append(f'{was} auf der Seite falsch: „{ist}" statt „{soll}"')
        if not st['gbricht']:
            fehler.append('AC_GROSS macht aus einem fehlenden Wert Text')
        if not st['kbricht']:
            fehler.append('AC_KOMMA macht aus einem fehlenden Wert Text')
        if pr['datei'] != 'reading-Zweite-mittel.txt':
            fehler.append('der Dateiname stimmt nicht: „%s" statt '
                          '„reading-Zweite-mittel.txt" — die Großschreibung '
                          'bleibt stehen (REGELN.md Abschnitt 4)' % pr['datei'])
except subprocess.TimeoutExpired:
    fehler.append('Rauchprobe: Zeitüberschreitung')
finally:
    probe.unlink(missing_ok=True)

print(f'reading.html  {ziel.stat().st_size:,} Bytes')
for x in fehler:
    print('  FEHLER: ' + x)
sys.exit(1 if fehler else 0)
