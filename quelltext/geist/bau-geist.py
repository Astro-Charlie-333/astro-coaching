#!/usr/bin/env python3
"""Setzt geistfuehrung.html zusammen und legt sie in der Plattform ab."""
import json, pathlib, re, subprocess, sys

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit  = hier.parent / 'rituale'
kern = hier.parent / 'kern'

def lies(p):
    return p.read_text(encoding='utf-8')

css_basis = lies(rit / 'basis.css')
css_eigen = lies(hier / 'geist-stil.css')
koerper   = lies(hier / 'geist-koerper.html')
# bahn-daten.js liegt seit Aufgabe 59 mit auf der Seite: dort steht
# B_BEUGE, die eine Stelle, die „dein" beugt. geist-texte.js trägt
# die Sätze — beides vor geist-app.js, weil die Anzeige sie liest.
# Aufgabe 94: fuellen.js liegt mit auf der Seite — AC_FUELL ist die
# eine Stelle, an der eine Lücke gefüllt wird und ein fehlender Wert
# abbricht statt lautlos zu verschwinden.
js = [lies(kern / 'fuellen.js'),
      lies(rit / 'engine.js'), lies(rit / 'himmel.js'),
      lies(wiki / 'kleine-punkte.js'), lies(kern / 'bahn-daten.js'),
      lies(hier / 'geist-texte.js'), lies(hier / 'geist-inhalt.js'),
      lies(hier / 'geist-app.js')]

kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mit wem du arbeitest &middot; Astro-Charlie</title>
<link rel="stylesheet" href="schriften/schriften.css">
<script src="profil.js"></script>
<style>
"""

html = (kopf + css_basis + "\n" + css_eigen
        + '</style><script src="niveau.js" defer></script>\n'
          '<script src="wortwahl.js" defer></script>\n</head><body>\n'
        + koerper + "\n<script>\n" + "\n".join(js) + "\n</script>\n</body></html>\n")

ziel = wiki / 'geistfuehrung.html'
# Die App-Ansicht: Manifest, Symbol, Zwischenspeicher. Die Zeilen dafür
# stehen in app/app-kopf.html — an einer Stelle für alle Seiten.
html = html.replace('<head>', '<head>' + (hier.parent / 'app' / 'app-kopf.html').read_text(encoding='utf-8'), 1)
ziel.write_text(html, encoding='utf-8')

# ── Prüfungen ────────────────────────────────────────────────
fehler, hinweise = [], []
app    = lies(hier / 'geist-app.js')
inhalt = lies(hier / 'geist-inhalt.js')
texte  = lies(hier / 'geist-texte.js')

sys.path.insert(0, str(rit))
import pruefwerk

ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
fehlt = gesucht - ids
if fehlt:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(fehlt)))
if ids - gesucht:
    hinweise.append('nur im HTML: ' + ', '.join(sorted(ids - gesucht)))

auf, zu = len(re.findall(r'<div\b', koerper)), len(re.findall(r'</div>', koerper))
if auf != zu:
    fehler.append(f'div-Bilanz im Körper: {auf} auf, {zu} zu')

alle = re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper)
dopp = {i for i in alle if alle.count(i) > 1}
if dopp:
    fehler.append('doppelte IDs: ' + ', '.join(sorted(dopp)))

# Jeder Inhaltsschlüssel, den die App nachschlägt, muss es auch geben
for tafel in ['TUER', 'TUERZEICHEN', 'KANAL', 'KANALZUSTAND', 'NEPTUN', 'NEPTUNHAUS',
              'GLAUBE', 'GLAUBEHAUS', 'SEKTE', 'PHASEN', 'RHYTHMUS', 'MONDSATURN',
              'ACHT', 'CHIRON']:
    if not re.search(r'\bvar ' + tafel + r'\s*=', inhalt):
        fehler.append(f'Tafel {tafel} fehlt in geist-inhalt.js')
    if tafel not in app:
        hinweise.append(f'Tafel {tafel} wird nie benutzt')
for tafel in ['GT_T', 'GT_ZEICHEN', 'GT_ELEMENTE']:
    if not re.search(r'\bvar ' + tafel + r'\s*=', texte):
        fehler.append(f'Tafel {tafel} fehlt in geist-texte.js')

# ── Die Anzeige schreibt keinen Satz und kein „dein" ─────────
#     Aufgabe 59, aus 34 und 38: Die Sätze dieser Seite stehen in
#     geist-texte.js (GT_T), die Anzeige rechnet und setzt mit
#     `gFuell` ein. Was in geist-app.js steht, zieht beim Umzug in
#     eine andere Umgebung nicht mit (PRODUKT.md Abschnitt 7) — und
#     genau deshalb ist das hier eine Sperre und kein Vorsatz.
fehler += pruefwerk.pruefe_anzeige_satzfrei(app, 'geist-app.js', 'geist-texte.js')
fehler += pruefwerk.pruefe_anzeige_ohne_dein(app, 'geist-app.js')
fehler += pruefwerk.pruefe_fueller(app, 'geist-app.js')

#     Und die Gegenprobe gegen die Fehlerklasse, die ein grüner
#     Riegel nicht ausschließt: dass er heute nur nichts zu finden
#     hatte (REGELN.md 6e, Nachsatz). In allen drei Anführungsarten —
#     ein Satz, der in doppelten oder schrägen Anführungszeichen
#     durchgeht, wäre das Loch, über das die Sätze einzeln
#     zurückkommen.
for _art, _an in (('einfache', "'"), ('doppelte', '"'), ('schräge', '`')):
    _mit = app + '\nvar _gegenprobe=' + _an + 'Die Tür zum Verborgenen' + _an + ';\n'
    if not pruefwerk.pruefe_anzeige_satzfrei(_mit, 'geist-app.js', 'geist-texte.js'):
        fehler.append(f'der Riegel sieht einen Satz in {_art} Anführung nicht — '
                      'dann hält er nur, was heute zufällig nicht dasteht')
    _mit = app + '\nvar _gegenprobe=' + _an + 'dein Venus' + _an + ';\n'
    if not pruefwerk.pruefe_anzeige_ohne_dein(_mit, 'geist-app.js'):
        fehler.append(f'der Riegel sieht ein „dein" in {_art} Anführung nicht — '
                      'dann kommt die ungebeugte Form einzeln zurück')

#     Jede Lücke einer Vorlage wird auch gefüllt — sonst steht
#     „{imHaus}" auf der Seite.
fehler += pruefwerk.pruefe_vorlagenluecken(texte, app, 'geist-texte.js')

# ── Keine Form wird an einen Namen geklebt ───────────────────
#     Dieselbe Klasse wie „dein" vor einem Punkt (REGELN.md 6f):
#     Eine Form, die sich mit dem eingesetzten Wort ändert, braucht
#     ihre eigene Tabelle. Diese Seite nennt das Haus in drei Fällen
#     und den Planeten im Genitiv; keines davon darf in der Anzeige
#     zusammengeklebt werden.
_GEKLEBT = re.compile(
    r"""(?:'|")\s*(?:dein|deine|deinem|deines|deiner|des|der|dem|den)\s*(?:'|")\s*\+"""
    r"""|\+\s*(?:'|")\s*\.\s*Haus""")
_geklebt = [(pruefwerk.nur_code(app).count('\n', 0, m.start()) + 1, m.group(0))
            for m in _GEKLEBT.finditer(pruefwerk.nur_code(app))]
if _geklebt:
    fehler.append('eine Form wird an einen Namen geklebt (Zeile '
                  + ', '.join(str(z) for z, _ in _geklebt)
                  + ') — der Artikel gehört in GT_T, das „dein" in B_BEUGE')
# Die Gegenprobe: die Regel schlägt auch an, wenn jemand es tut.
for _probe in ["var a='dein '+pl;", "var b='im '+ph+'. Haus';",
               "var c='des '+pl;"]:
    if not _GEKLEBT.search(_probe):
        fehler.append('die Klebe-Regel sieht „' + _probe + '" nicht')
for _probe in ["var d=gDeinHaus(12);", "var e=gImHaus(ph);",
               "var f=T.gen[pl];"]:
    if _GEKLEBT.search(_probe):
        fehler.append('die Klebe-Regel schlägt bei „' + _probe + '" an, '
                      'obwohl die Form aus einer Tabelle kommt')

# Namenskollisionen: alles liegt in einem <script>, also im gleichen Geltungsbereich.
# Diese vier überschreiben die Engine absichtlich und verhaltensgleich.
ERLAUBT = {'nrm', 'datVon', 'gewaehlt', 'chartVon'}


def oben(text):
    return set(re.findall(r'^(?:var|function)\s+([A-Za-z_$][\w$]*)', text, re.M))


# bahn-daten.js gehört seit Aufgabe 59 dazu: zwei Dateien, die denselben
# Namen belegen, sind keine Ordnungsfrage — die zweite gewinnt lautlos.
fremd = (oben(lies(rit / 'engine.js')) | oben(lies(rit / 'himmel.js'))
         | oben(lies(kern / 'bahn-daten.js')))
eigen = oben(app) | oben(inhalt) | oben(texte)
koll = (eigen & fremd) - ERLAUBT
if koll:
    fehler.append('Namenskollision mit engine.js/himmel.js/bahn-daten.js: '
                  + ', '.join(sorted(koll)))

# Tote Verweise innerhalb der Plattform
for href in sorted(set(re.findall(r'href="([a-z0-9_-]+\.html)"', koerper))):
    if not (wiki / href).exists():
        fehler.append('Verweis ins Leere: ' + href)

# ── Rauchprobe: gemessen wird am gezeichneten Ergebnis ───────
#     Eine Datenprüfung sieht nicht, was auf der Seite landet. Die
#     drei Fälle von „dein 12. Haus" entstehen erst beim Zeichnen,
#     und eine Lücke, die niemand füllt, steht erst dort in
#     geschweiften Klammern (REGELN.md 5, Punkt 8).
#     Probedaten, nicht Mandys (REGELN.md 6).
rauch = r'''
const {chromium}=require('playwright');
(async()=>{const f=[];const b=await chromium.launch();
const c=await b.newContext({viewport:{width:390,height:844}});
await c.addInitScript(()=>{ localStorage.setItem('ac_profile_v1',JSON.stringify({v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:[
  {id:'p1',name:'Probe Geist',alias:'',y:1991,mo:7,d:14,h:16,mi:12,tz:2,lat:50.11,lon:8.68,ort:'Frankfurt',
   wlat:52.52,wlon:13.405,wort:'Berlin',eigen:true,readings:[]}]})); });
const p=await c.newPage();
p.on('pageerror',e=>f.push('Skriptfehler: '+String(e.message).slice(0,160)));
await p.goto('file://ZIEL'); await p.waitForTimeout(900);
const g=await p.evaluate(()=>({
  text:document.body.innerText,
  html:document.getElementById('ginhalt').innerHTML,
  nom:B_BEUGE({g:GT_T.haus.g,wort:'12. Haus',beugt:{gen:'12. Hauses'}},'nom'),
  dat:B_BEUGE({g:GT_T.haus.g,wort:'12. Haus',beugt:{gen:'12. Hauses'}},'dat'),
  gen:B_BEUGE({g:GT_T.haus.g,wort:'12. Haus',beugt:{gen:'12. Hauses'}},'gen'),
  bloecke:['tuer','kanal','form','glaube','sekte','rhythmus','tief','praxis','zeiten']
    .map(i=>[i,(document.getElementById(i)||{textContent:''}).textContent.trim().length]),
  /* Zwei Zweige zeichnet nicht jedes Profil: der Malefik im 12. Haus
     und der Neumond im Zeichen des 12. Hauses. Dass ihr Riegel grün
     ist, hieße bei ihnen nur, dass ihr Fall heute nicht vorkam
     (REGELN.md 6e, Nachsatz) — deshalb werden beide Vorlagen hier
     direkt gefüllt und gegen feste Beispiele gehalten. */
  selten:{
    malefik:gFuell(GT_T.sekteImZwoelften,{weg:GT_T.sekteWeg.Saturn}),
    neumond:gFuell(GT_T.ztNeumondHaus,{deinHausDat:gDeinHaus(12,'dat')})}
}));
Object.keys(g.selten).forEach(k=>{
  const s=g.selten[k];
  if(/\{[a-zA-Z]/.test(s)) f.push('der seltene Zweig '+k+' hat eine offene Lücke: '+s);
});
if(!/Strenge, Verzicht/.test(g.selten.malefik))
  f.push('der Weg des Malefiks fehlt im seltenen Zweig: '+g.selten.malefik);
if(g.selten.neumond!=='in deinem 12. Haus')
  f.push('der Neumond im eigenen Haus heißt „'+g.selten.neumond+'" statt „in deinem 12. Haus"');
/* Jeder Block ist wirklich gefüllt. */
g.bloecke.forEach(([i,n])=>{ if(n<80) f.push('Block '+i+' ist leer oder zu kurz ('+n+' Zeichen)'); });
/* Keine ungefüllte Lücke auf der gezeichneten Seite. */
const offen=g.html.match(/\{[a-zA-Z][a-zA-Z0-9]*\}/g);
if(offen) f.push('ungefüllte Lücke auf der Seite: '+[...new Set(offen)].join(', '));
/* Die drei Fälle, gegen feste Beispiele (REGELN.md 6e). */
if(g.nom!=='dein 12. Haus') f.push('B_BEUGE bildet „'+g.nom+'" statt „dein 12. Haus"');
if(g.dat!=='deinem 12. Haus') f.push('B_BEUGE bildet „'+g.dat+'" statt „deinem 12. Haus"');
if(g.gen!=='deines 12. Hauses') f.push('B_BEUGE bildet „'+g.gen+'" statt „deines 12. Hauses"');
/* Und so steht es auch auf der Seite — ungebeugt wäre es nicht aufgefallen. */
if(!/dein 12\. Haus/.test(g.text)) f.push('auf der Seite steht nirgends „dein 12. Haus"');
if(/deine \d+\. Haus|dein \d+ Haus|dein \d+\. Hauses|deines \d+\. Haus\b/.test(g.text))
  f.push('das Haus steht ungebeugt auf der Seite');
console.log(JSON.stringify({fehler:f})); await b.close();})();
'''
if '--schnell' not in sys.argv:
    rp = hier / '.rauch-geist.js'
    rp.write_text(rauch.replace('ZIEL', str(ziel)), encoding='utf-8')
    try:
        r = subprocess.run(['node', str(rp)], capture_output=True, text=True, timeout=240)
        if r.returncode != 0:
            fehler.append('Rauchprobe gescheitert: ' + (r.stderr or '')[-400:])
        else:
            fehler.extend(json.loads(r.stdout.strip().splitlines()[-1])['fehler'])
    except Exception as e:
        fehler.append('Rauchprobe nicht gelaufen: ' + str(e)[:200])
    finally:
        rp.unlink(missing_ok=True)

print(f'geistfuehrung.html  {ziel.stat().st_size:,} Bytes  →  {ziel}')
for h in hinweise:
    print('  Hinweis: ' + h)
for f in fehler:
    print('  FEHLER: ' + f)
sys.exit(1 if fehler else 0)
