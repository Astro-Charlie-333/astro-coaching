#!/usr/bin/env python3
"""Setzt zauber.html zusammen und legt sie in der Plattform ab.

Seit Aufgabe 58 liegen zauber-texte.js (die Sätze) und
kern/bahn-daten.js (die Beugung von „dein") mit auf der Seite: Die
Anzeige rechnet und setzt ein, sie schreibt nichts mehr.
"""
import json, pathlib, re, subprocess, sys

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'

teile = {n: (hier / n).read_text(encoding='utf-8') for n in
         ['basis.css', 'zauber-stil.css', 'zauber-koerper.html', 'engine.js',
          'himmel.js', 'zauber-inhalt.js', 'zauber-person.js',
          'zauber-texte.js', 'zauber-app.js']}
teile['bahn-daten.js'] = (hier.parent / 'kern' / 'bahn-daten.js').read_text(encoding='utf-8')
# Aufgabe 94: AC_FUELL ist die eine Stelle, an der eine Lücke gefüllt
# wird — ein fehlender Wert bricht dort ab statt zu verschwinden.
teile['fuellen.js'] = (hier.parent / 'kern' / 'fuellen.js').read_text(encoding='utf-8')

kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Zimt, Rosen, Steine &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Jost:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<style>
"""

html = (kopf + teile['basis.css'] + "\n" + teile['zauber-stil.css'] + "</style></head><body>\n"
        + teile['zauber-koerper.html']
        + "\n<script>\n"
        + teile['fuellen.js'] + "\n"
        + teile['engine.js'] + "\nvar window=window||{};\n"
        + teile['himmel.js'] + "\n"
        + teile['bahn-daten.js'] + "\n"
        + teile['zauber-inhalt.js'] + "\n"
        + teile['zauber-person.js'] + "\n"
        + teile['zauber-texte.js'] + "\n"
        + teile['zauber-app.js']
        + "\n</script>\n</body></html>\n")
# himmel.js hängt sich an window; im Seitenkontext ist das ohnehin global
html = html.replace("\nvar window=window||{};\n", "\n")

ziel = wiki / 'zauber.html'
# Die App-Ansicht: Manifest, Symbol, Zwischenspeicher. Die Zeilen dafür
# stehen in app/app-kopf.html — an einer Stelle für alle Seiten.
html = html.replace('<head>', '<head>' + (hier.parent / 'app' / 'app-kopf.html').read_text(encoding='utf-8'), 1)
ziel.write_text(html, encoding='utf-8')

fehler = []
koerper = teile['zauber-koerper.html']
app = teile['zauber-app.js']
texte = teile['zauber-texte.js']
inhalt = teile['zauber-inhalt.js']

sys.path.insert(0, str(hier))
import pruefwerk

# ── 1 · Verdrahtung ───────────────────────────────────────────
ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
fehlt = gesucht - ids
if fehlt:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(fehlt)))
unbenutzt = ids - gesucht
if unbenutzt:
    print('  nur im HTML: ' + ', '.join(sorted(unbenutzt)))

auf, zu = len(re.findall(r'<div\b', koerper)), len(re.findall(r'</div>', koerper))
if auf != zu:
    fehler.append(f'div-Bilanz: {auf} auf, {zu} zu')
alle = re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper)
dopp = {i for i in alle if alle.count(i) > 1}
if dopp:
    fehler.append('doppelte IDs: ' + ', '.join(sorted(dopp)))

# ── 2 · Namenskollisionen (alles liegt in einem Skriptblock) ──
#     Seit Aufgabe 58 liegt auch bahn-daten.js auf der Seite. Zwei
#     Dateien, die denselben Namen belegen, sind keine Ordnungsfrage:
#     Die zweite gewinnt lautlos, und welche die zweite ist,
#     entscheidet die Reihenfolge im Skriptblock oben.
ERLAUBT = {'nrm'}


def oben(t):
    return set(re.findall(r'^(?:var|function)\s+([A-Za-z_$][\w$]*)', t, re.M))


fremd = oben(teile['engine.js']) | oben(teile['bahn-daten.js'])
koll = (oben(app) | oben(texte) | oben(inhalt) | oben(teile['zauber-person.js'])) \
    & fremd - ERLAUBT
if koll:
    fehler.append('Namenskollision mit engine.js oder bahn-daten.js: '
                  + ', '.join(sorted(koll)))

# ── 3 · Die Anzeige schreibt keinen Satz und kein „dein" ──────
#     Aufgabe 58, aus 34 und 38: Die Sätze dieser Seite stehen in
#     zauber-texte.js (ZT_T), die Anzeige rechnet und setzt mit
#     `zFuell` ein. Was in zauber-app.js steht, zieht beim Umzug in
#     eine andere Umgebung nicht mit (PRODUKT.md Abschnitt 7) — und
#     genau deshalb ist das hier eine Sperre und kein Vorsatz.
fehler += pruefwerk.pruefe_anzeige_satzfrei(app, 'zauber-app.js', 'zauber-texte.js')
fehler += pruefwerk.pruefe_anzeige_ohne_dein(app, 'zauber-app.js')
fehler += pruefwerk.pruefe_fueller(app, 'zauber-app.js')

#     Und die Gegenprobe gegen die Fehlerklasse, die ein grüner
#     Riegel nicht ausschließt: dass er heute nur nichts zu finden
#     hatte (REGELN.md 6e, Nachsatz). In allen drei Anführungsarten —
#     ein Satz, der in doppelten oder schrägen Anführungszeichen
#     durchgeht, wäre das Loch, über das die Sätze einzeln
#     zurückkommen.
for _art, _an in (('einfache', "'"), ('doppelte', '"'), ('schräge', '`')):
    _mit = app + '\nvar _gegenprobe=' + _an + 'Die Stunde der Venus' + _an + ';\n'
    if not pruefwerk.pruefe_anzeige_satzfrei(_mit, 'zauber-app.js', 'zauber-texte.js'):
        fehler.append(f'der Riegel sieht einen Satz in {_art} Anführung nicht — '
                      'dann hält er nur, was heute zufällig nicht dasteht')
    _mit = app + '\nvar _gegenprobe=' + _an + 'dein Venus' + _an + ';\n'
    if not pruefwerk.pruefe_anzeige_ohne_dein(_mit, 'zauber-app.js'):
        fehler.append(f'der Riegel sieht ein „dein" in {_art} Anführung nicht — '
                      'dann kommt die ungebeugte Form einzeln zurück')

#     Jede Lücke einer Vorlage wird auch gefüllt — sonst steht
#     „{bereich}" auf der Seite.
fehler += pruefwerk.pruefe_vorlagenluecken(texte, app, 'zauber-texte.js')

# ── 4 · Keine Form wird an einen Namen geklebt ────────────────
#     Zwei Fehler, gefunden beim Herausziehen der Sätze (Aufgabe 58),
#     und beide dieselbe Klasse wie „dein" vor einem Punkt
#     (REGELN.md 6f): Eine Form, die sich mit dem eingesetzten Wort
#     ändert, braucht ihre eigene Tabelle.
#
#       „der Tag des Sonne"  — die Anzeige setzte den Namen hinter
#                              den Artikel, obwohl die Genitivtabelle
#                              seit dem ersten Tag daneben lag und an
#                              der anderen Stelle benutzt wurde.
#       „Sonnestunde"        — die Anzeige hängte „stunde" an den
#                              Namen. Sechs von sieben gehen auf, die
#                              Sonne braucht ein Fugen-n.
#
#     Beide fielen nur an bestimmten Tagen auf: sonntags, montags und
#     freitags stand die falsche Form da, dienstags nicht. Eine
#     Prüfung am Ergebnis des Tages hätte sie vier Tage in der Woche
#     durchgelassen (REGELN.md 6e). Deshalb wird die **Form** geprüft,
#     und zwar an drei Stellen:
#
#       a  in den Vorlagen: kein Artikel direkt vor einer Lücke
#       b  in den Vorlagen: kein Buchstabe direkt hinter einer Lücke
#       c  in der Anzeige: keine Zeichenkette, die mit einem kleinen
#          Buchstaben an einen Ausdruck geklebt wird („+'stunde'").
#          Das muss hier stehen und nicht im Satzriegel: „stunde" ist
#          ein Wort ohne Großbuchstaben und ohne Satzzeichen und geht
#          dort durch.
_ARTIKEL = re.compile(r'(?<![A-Za-zÄÖÜäöüß])(?:des|dem|den|der|vom|zum|zur)\s+\{')
_ENDUNG = re.compile(r'\}[A-Za-zÄÖÜäöüß]')
_GEKLEBT = re.compile(r"""[\w\)\]]\s*\+\s*(?:'[a-zäöüß]|"[a-zäöüß]|`[a-zäöüß])""")


def form_tadel(stueck):
    """Sagt, warum diese Vorlage eine Form ankleben würde — oder None."""
    m = _ARTIKEL.search(stueck)
    if m:
        return 'Artikel vor einer Lücke: ' + m.group(0)
    m = _ENDUNG.search(stueck)
    if m:
        return 'Endung hinter einer Lücke: ' + m.group(0)
    return None


# Die festen Beispiele (REGELN.md 6e). Sie laufen, bevor die Prüfung
# die Seite ansieht — bricht die Regel, bricht sie hier.
assert form_tadel('der Tag des {herr}') == 'Artikel vor einer Lücke: des {'
assert form_tadel('die Stunde der {planet}') == 'Artikel vor einer Lücke: der {'
assert form_tadel('{stamm}stunde') == 'Endung hinter einer Lücke: }s'
assert form_tadel('Heute ist {tag}, der Tag {gen} — das färbt alles.') is None
assert form_tadel('Stunde {gen}') is None
assert form_tadel('Es ist {stunde}, noch bis {bis}.') is None
assert form_tadel('{n}. Haus') is None
assert form_tadel('auf {auf} · unter {unter}') is None
# „Sonnenaufgang{nacht}" ist kein Ankleben: die Lücke steht hinter dem
# Wort und bringt ihr eigenes Leerzeichen mit.
assert form_tadel('seit Sonnenaufgang{nacht}, sie dauert {min} Minuten.') is None
# Und „wonach" darf als Wort dastehen — geprüft wird der Artikel vor
# einer Lücke, nicht die Buchstabenfolge.
assert form_tadel('Was der Mond berührt, bevor {zeichen} wechselt.') is None
assert form_tadel('Bei dir in {herrZeichen}, im {herrHaus}.') is None

for _z, _t in [(i + 1, l) for i, l in enumerate(
        pruefwerk.nur_code(texte).splitlines())]:
    for _lit in re.findall(r"'((?:[^'\\\n]|\\.)*)'", _t):
        _tadel = form_tadel(_lit)
        if _tadel:
            fehler.append(f'zauber-texte.js Zeile {_z}: {_tadel}')

_geklebt = [(pruefwerk.nur_code(app).count('\n', 0, m.start()) + 1, m.group(0))
            for m in _GEKLEBT.finditer(pruefwerk.nur_code(app))]
if _geklebt:
    fehler.append('zauber-app.js klebt ein Wort an einen Ausdruck: '
                  + ', '.join(f'Zeile {z}: {w}' for z, w in _geklebt[:4])
                  + ' — das fertige Wort gehört in eine Tabelle in '
                    'zauber-texte.js')
# Gegenprobe: ohne sie wäre nicht zu sehen, ob die Regel heute nur
# nichts zu finden hatte.
assert _GEKLEBT.search("h+=st.herr+'stunde'"), \
    'die Regel sieht das angeklebte Wort nicht'
assert not _GEKLEBT.search("h+='<b>'+T.jzMond+'</b>'"), \
    'die Regel schlägt auf gewöhnliches Markup an'

# ── 5 · Die beiden Tabellen sind vollständig und richtig ──────
#     Die Form kommt nur aus der Tabelle, also muss die Tabelle alle
#     sieben kennen. Fehlt ein Eintrag, stünde dort „undefined".
#     Die sieben Wörter stehen hier ausgeschrieben: eine Tabelle, die
#     sich selbst prüft, prüft nichts.
GEN_SOLL = {'Sonne': 'der Sonne', 'Mond': 'des Mondes', 'Merkur': 'des Merkur',
            'Venus': 'der Venus', 'Mars': 'des Mars', 'Jupiter': 'des Jupiter',
            'Saturn': 'des Saturn'}
STUNDE_SOLL = {'Sonne': 'Sonnenstunde', 'Mond': 'Mondstunde',
               'Merkur': 'Merkurstunde', 'Venus': 'Venusstunde',
               'Mars': 'Marsstunde', 'Jupiter': 'Jupiterstunde',
               'Saturn': 'Saturnstunde'}
ZEICHEN_SOLL = ['Widder', 'Stier', 'Zwillinge', 'Krebs', 'Löwe', 'Jungfrau',
                'Waage', 'Skorpion', 'Schütze', 'Steinbock', 'Wassermann',
                'Fische']

probe = r'''
const fs=require('fs'); global.window={};
eval(fs.readFileSync(process.argv[2],'utf8'));
eval(fs.readFileSync(process.argv[3],'utf8'));
const f=[], soll=JSON.parse(process.argv[4]);
/* Jede Tabelle, aus der eine Form kommt, kennt alle sieben Planeten
   und trägt das Wort, das dort hingehört. */
['gen','stunde'].forEach(n=>{
  const t=ZT_T[n], s=soll[n];
  PL.forEach(k=>{ if(t[k]!==s[k]) f.push('ZT_T.'+n+'['+k+'] ist „'+t[k]+'" statt „'+s[k]+'"'); });
  Object.keys(t).forEach(k=>{ if(PL.indexOf(k)<0) f.push('ZT_T.'+n+' kennt '+k+', den es als Planeten nicht gibt'); });
});
/* Die Zeichen in der Reihenfolge der Rechnung, ab Widder. */
ZT_ZEICHEN.forEach((z,i)=>{ if(z.n!==soll.zeichen[i]) f.push('ZT_ZEICHEN['+i+'] heißt '+z.n+' statt '+soll.zeichen[i]);
  if(!z.z) f.push('ZT_ZEICHEN['+i+'] hat kein Schriftzeichen'); });
if(ZT_ZEICHEN.length!==12) f.push('ZT_ZEICHEN hat '+ZT_ZEICHEN.length+' statt zwölf Einträge');
/* Das Haus steht einmal, mit Geschlecht und mit seiner Lücke. */
if(ZT_T.haus.g!=='s') f.push('das Haus ist sächlich, ZT_T.haus.g sagt '+ZT_T.haus.g);
if(ZT_T.haus.wort.indexOf('{n}')<0) f.push('ZT_T.haus.wort hat keine Lücke für die Nummer');
/* Und jede Vorlage ist ein Text und keine leere Hülle. */
Object.keys(ZT_T).forEach(k=>{ const v=ZT_T[k];
  if(typeof v==='string' && !v.trim()) f.push('ZT_T.'+k+' ist leer'); });
console.log(JSON.stringify({fehler:f}));
'''
pp = hier / '.probe-zauber-texte.js'
pp.write_text(probe, encoding='utf-8')
try:
    r = subprocess.run(['node', str(pp), str(hier / 'zauber-inhalt.js'),
                        str(hier / 'zauber-texte.js'),
                        json.dumps({'gen': GEN_SOLL, 'stunde': STUNDE_SOLL,
                                    'zeichen': ZEICHEN_SOLL})],
                       capture_output=True, text=True, timeout=60)
    if r.returncode != 0:
        fehler.append('Tabellenprüfung gescheitert: ' + (r.stderr or '')[-300:])
    else:
        fehler.extend(json.loads(r.stdout.strip().splitlines()[-1])['fehler'])
except Exception as e:
    fehler.append('Tabellenprüfung nicht gelaufen: ' + str(e)[:200])
finally:
    pp.unlink(missing_ok=True)

# ── 6 · Kein echtes Geburtsdatum im Quelltext ─────────────────
#     REGELN.md Abschnitt 6. Die Probedaten unten sind erfunden.
for _n, _q in teile.items():
    if '1987' in _q or '08:58' in _q:
        fehler.append(f'{_n} enthält ein echtes Geburtsdatum')

# ── 7 · Rauchprobe im Browser ─────────────────────────────────
#     Die Seite rechnet alles erst im Browser; ein Tippfehler in einer
#     Lücke fällt ohne diesen Schritt niemandem auf. Zwei Durchgänge:
#     ohne Profil (dann steht nichts „bei dir") und mit einem
#     erfundenen.
rauch = r'''
const {chromium}=require('playwright');
(async()=>{
const f=[]; const b=await chromium.launch();
const schau=async(pg,wo)=>{
  const a=await pg.evaluate(()=>({
    jetzt:document.getElementById('jetztbox').textContent.trim().length,
    stunden:document.querySelectorAll('#tafel .tz').length,
    planeten:document.querySelectorAll('#planeten details.pk').length,
    ziele:document.querySelectorAll('#zielwahl button').length,
    zielinhalt:document.getElementById('zielinhalt').textContent.trim().length,
    draht:document.getElementById('draht').textContent.trim().length,
    zutaten:document.querySelectorAll('#zutaten .zt-k').length,
    steine:document.querySelectorAll('#steine .st-k').length,
    pflege:document.querySelectorAll('#pflege .pf').length,
    text:document.body.innerText}));
  if(a.jetzt<80) f.push(wo+': „Jetzt gerade" ist leer');
  if(a.stunden!==24) f.push(wo+': '+a.stunden+' statt 24 Planetenstunden');
  if(a.planeten!==7) f.push(wo+': '+a.planeten+' statt 7 Planetenkarten');
  if(a.ziele!==5) f.push(wo+': '+a.ziele+' statt 5 Ziele');
  if(a.zielinhalt<200) f.push(wo+': das Ziel zeigt keinen Inhalt');
  if(a.draht<80) f.push(wo+': „Dein eigener Draht" ist leer');
  if(a.zutaten<10) f.push(wo+': die Zutaten fehlen');
  if(a.steine<10) f.push(wo+': die Steine fehlen');
  if(a.pflege!==3) f.push(wo+': die drei Pflegekästen fehlen');
  /* Keine ungefüllte Lücke auf der gezeichneten Seite. Die
     Vorlagenprüfung sieht die Vorlagen, diese Zeile das Ergebnis
     (Aufgabe 69). */
  const roh=a.text.match(/\{[a-zA-Z][a-zA-Z0-9]*\}/g)||[];
  if(roh.length) f.push(wo+': ungefüllte Lücke auf der Seite: '+roh.slice(0,4).join(' '));
  if(/undefined|NaN/.test(a.text)) f.push(wo+': „undefined" oder „NaN" steht auf der Seite');
  /* Und die Form, die am Planeten hängt, kommt aus der Tabelle:
     „der Tag des Sonne" stand hier drei Tage in der Woche. */
  const g=await pg.evaluate(()=>{ const st=AC_HIMMEL.planetenStunde(
      Date.now()/86400000+2440587.5,52.52,13.405);
    if(st.polar) return null;
    return {tag:ZT_T.gen[st.tagesherr], std:ZT_T.gen[st.herr],
            roh:st.tagesherr, t:document.getElementById('jetztbox').innerText}; });
  if(g){
    if(g.t.indexOf('der Tag '+g.tag)<0) f.push(wo+': der Tagesherrscher steht nicht im Genitiv aus der Tabelle');
    if(g.t.indexOf('Stunde '+g.std)<0) f.push(wo+': der Stundenherrscher steht nicht im Genitiv aus der Tabelle');
    /* Und die rohe Form daneben, aber nur, wenn sie nicht zufällig
       die richtige ist: „des Merkur" ist der Genitiv, „des Mond"
       wäre der Fehler. */
    ['des ','dem ','der ','den '].map(a=>a+g.roh).forEach(x=>{
      if(x!==g.tag&&x!==g.std&&g.t.indexOf(x)>=0) f.push(wo+': „'+x+'" steht auf der Seite'); });
  }
  /* Nichts läuft auf dem Telefon über den Rand. */
  const r=await pg.evaluate(()=>{const w=document.documentElement.clientWidth; const r=[];
    document.querySelectorAll('body *').forEach(e=>{ if(e.closest('.chips')||e.closest('.taf')) return;
      const bb=e.getBoundingClientRect();
      if(bb.width>0&&(bb.right>w+1.5||bb.left<-1.5)) r.push(e.tagName+' '+Math.round(bb.right)); });
    return {r:r.slice(0,4),sw:document.documentElement.scrollWidth,w}; });
  if(r.r.length||r.sw>r.w+1) f.push(wo+': läuft auf 390px über: '+r.r.join(' | '));
  return a;
};

/* A · ohne Profil */
const c1=await b.newContext({viewport:{width:390,height:844}});
const p=await c1.newPage(); p.on('pageerror',e=>f.push('Skriptfehler ohne Profil: '+String(e.message).slice(0,160)));
await p.goto('file://ZIEL'); await p.waitForTimeout(700);
const a1=await schau(p,'ohne Profil');
if(/Bei dir/.test(a1.text)) f.push('ohne Profil steht trotzdem „Bei dir" da');
if(!/Chart anlegen/.test(a1.text)) f.push('ohne Profil fehlt der Weg zum Profil');
/* Ein Klick auf ein anderes Ziel ändert den Inhalt wirklich. */
const vorher=await p.evaluate(()=>document.getElementById('zielinhalt').textContent);
await p.evaluate(()=>{ document.querySelectorAll('#zielwahl button')[2].click(); });
await p.waitForTimeout(200);
const nachher=await p.evaluate(()=>document.getElementById('zielinhalt').textContent);
if(vorher===nachher) f.push('ein anderes Ziel ändert den Inhalt nicht');
/* Und der Filter filtert. */
const vollZahl=await p.evaluate(()=>document.querySelectorAll('#steine .st-k').length);
await p.evaluate(()=>{ document.querySelectorAll('#steinfilter button')[1].click(); });
await p.waitForTimeout(200);
const gefiltert=await p.evaluate(()=>document.querySelectorAll('#steine .st-k').length);
if(!(gefiltert>0&&gefiltert<vollZahl)) f.push('der Steinfilter filtert nicht');

/* B · mit erfundenem Profil */
const c2=await b.newContext({viewport:{width:390,height:844}});
await c2.addInitScript(()=>{ localStorage.setItem('ac_profile_v1',JSON.stringify({v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:[
  {id:'p1',name:'Probe Zauber',alias:'',y:1994,mo:3,d:9,h:11,mi:24,tz:1,lat:52.52,lon:13.405,ort:'Berlin',
   wlat:53.55,wlon:9.99,wort:'Hamburg',eigen:true,readings:[]}]})); });
const q=await c2.newPage(); q.on('pageerror',e=>f.push('Skriptfehler mit Profil: '+String(e.message).slice(0,160)));
await q.goto('file://ZIEL'); await q.waitForTimeout(700);
const a2=await schau(q,'mit Profil');
if(!/Bei dir/.test(a2.text)) f.push('mit Profil steht nirgends „Bei dir"');
if(!/Hamburg/.test(a2.text)) f.push('der Wohnort aus dem Profil steht nicht bei der Sonne');
/* „dein 5. Haus" ist gebeugt und nicht „dein 5 Haus" oder „deine". */
const hh=await q.evaluate(()=>({t:document.body.innerText,
  soll:B_BEUGE({g:ZT_T.haus.g,wort:'4. Haus'},'nom')}));
if(hh.soll!=='dein 4. Haus') f.push('B_BEUGE bildet „'+hh.soll+'" statt „dein 4. Haus"');
if(!/dein \d+\. Haus/.test(hh.t)) f.push('mit Profil steht nirgends „dein N. Haus"');
if(/deine \d+\. Haus|dein \d+ Haus/.test(hh.t)) f.push('das Haus steht ungebeugt auf der Seite');
console.log(JSON.stringify({fehler:f})); await b.close();})();
'''
rp = hier / '.rauch-zauber.js'
rp.write_text(rauch.replace('ZIEL', str(ziel)), encoding='utf-8')
try:
    r = subprocess.run(['node', str(rp)], capture_output=True, text=True, timeout=180)
    if r.returncode != 0:
        fehler.append('Rauchprobe gescheitert: ' + (r.stderr or '')[-400:])
    else:
        fehler.extend(json.loads(r.stdout.strip().splitlines()[-1])['fehler'])
except Exception as e:
    fehler.append('Rauchprobe nicht gelaufen: ' + str(e)[:200])
finally:
    rp.unlink(missing_ok=True)

print(f'zauber.html  {ziel.stat().st_size:,} Bytes  →  {ziel}')
for f in fehler:
    print('  FEHLER: ' + f)
sys.exit(1 if fehler else 0)
