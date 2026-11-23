#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut analyse.html."""
import pathlib, re, sys, json, subprocess

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit  = hier.parent / 'rituale'


def lies(p):
    return p.read_text(encoding='utf-8')


kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Die Analyse &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Jost:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<script src="kleine-punkte.js"></script>
<style>
"""

# analyse-texte.js trägt seit Aufgabe 61 die Sätze der Seite, und
# kern/fuellen.js die eine Stelle, an der eine Lücke gefüllt wird
# (Aufgabe 94). Beides steht vor analyse-app.js, weil die Anzeige es
# liest.
html = (kopf + lies(rit / 'basis.css') + "\n" + lies(hier / 'analyse-stil.css')
        + '</style><script src="niveau.js" defer></script>\n'
          '<script src="wortwahl.js" defer></script>\n</head><body>\n'
        + lies(hier / 'analyse-koerper.html') + "\n<script>\n"
        + lies(hier.parent / 'kern' / 'fuellen.js') + "\n"
        + lies(rit / 'engine.js') + "\n"
        + lies(hier / 'engine.js') + "\n"
        + lies(hier / 'thema-paar.js') + "\n"
        + lies(hier / 'thema-zusammen.js') + "\n"
        + lies(hier / 'thema-beruf.js') + "\n"
        + lies(hier / 'thema-rest.js') + "\n"
        + lies(hier / 'analyse-texte.js') + "\n"
        + lies(hier / 'analyse-app.js')
        + "\n</script>\n</body></html>\n")

ziel = wiki / 'analyse.html'
# Die App-Ansicht: Manifest, Symbol, Zwischenspeicher. Die Zeilen dafür
# stehen in app/app-kopf.html — an einer Stelle für alle Seiten.
html = html.replace('<head>', '<head>' + (hier.parent / 'app' / 'app-kopf.html').read_text(encoding='utf-8'), 1)
ziel.write_text(html, encoding='utf-8')

fehler, hinweise = [], []
koerper = lies(hier / 'analyse-koerper.html')
app = lies(hier / 'analyse-app.js')
texte = lies(hier / 'analyse-texte.js')
paar = lies(hier / 'thema-paar.js')
zus  = lies(hier / 'thema-zusammen.js')
bruf = lies(hier / 'thema-beruf.js')
rest = lies(hier / 'thema-rest.js')
THEMENDATEIEN = ((paar, 'thema-paar'), (zus, 'thema-zusammen'),
                 (bruf, 'thema-beruf'), (rest, 'thema-rest'))
alletexte = paar + zus + bruf + rest
kern = lies(hier / 'engine.js')

ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
if gesucht - ids:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(gesucht - ids)))

auf, zu = len(re.findall(r'<div\b', koerper)), len(re.findall(r'</div>', koerper))
if auf != zu:
    fehler.append(f'div-Bilanz: {auf} auf, {zu} zu')

# Namenskollisionen: alles liegt in einem Skriptblock
ERLAUBT = {'nrm', 'chartVon', 'H'}


def oben(t):
    return set(re.findall(r'^(?:var|function)\s+([A-Za-z_$][\w$]*)', t, re.M))


koll = (oben(app) | oben(texte) | oben(paar) | oben(zus) | oben(bruf)
        | oben(rest) | oben(kern)) \
       & oben(lies(rit / 'engine.js')) - ERLAUBT
if koll:
    fehler.append('Namenskollision mit der Rechen-Engine: ' + ', '.join(sorted(koll)))

# Jede Regel braucht id, wenn, dann — und eine id darf nur einmal vorkommen
alle_ids = re.findall(r"\{id:'([\w-]+)'", alletexte)
dopp = {i for i in alle_ids if alle_ids.count(i) > 1}
if dopp:
    fehler.append('doppelte Regel-ids: ' + ', '.join(sorted(dopp)))
for block, name in THEMENDATEIEN:
    for m in re.finditer(r"\{id:'([\w-]+)'([^\n]*)", block):
        if 'modus:' not in m.group(2):
            fehler.append(f'{name}: Regel {m.group(1)} ohne modus')
n_regeln = len(alle_ids)
if n_regeln < 95:
    fehler.append(f'nur {n_regeln} Regeln insgesamt')

# Kleinschreibung in Regeltexten erzeugt im Deutschen fast immer einen Fehler
# („immer wieder um zuhause geht") — jeder bisherige Fall war einer.
for block, name in THEMENDATEIEN:
    for m in re.finditer(r'\.toLowerCase\(\)', block):
        zeile = block[:m.start()].count('\n') + 1
        fehler.append(f'{name}.js Zeile {zeile}: toLowerCase im Regeltext — '
                      'deutsche Substantive bleiben groß')

# Formen und Felder müssen zusammenpassen — eine Form ohne Felder
# würde still auf den Vorgabewert zurückfallen.
for block, name in THEMENDATEIEN:
    for m in re.finditer(r'var\s+(T_\w+)\s*=\s*\{', block):
        tname = m.group(1)
        kopfblock = block[m.end(): m.end() + 2600]
        formen = re.findall(r"\{k:'(\w+)',\s*n:'", kopfblock.split('felder:')[0])
        if not formen:
            continue
        fmatch = re.search(r'felder:\s*\{(.*?)\}', kopfblock, re.S)
        if not fmatch:
            fehler.append(f'{tname}: hat Formen, aber kein felder')
            continue
        felder = set(re.findall(r'(\w+)\s*:\s*\[', fmatch.group(1)))
        fehlend = [f for f in formen if f not in felder]
        if fehlend:
            fehler.append(f'{tname}: Formen ohne Felder — ' + ', '.join(fehlend))
        ueberzaehlig = [f for f in felder if f not in formen]
        if ueberzaehlig:
            fehler.append(f'{tname}: Felder ohne Form — ' + ', '.join(ueberzaehlig))
        # nurForm / ohneForm dürfen nur bekannte Formen nennen
        for mm in re.finditer(r"(nurForm|ohneForm):\s*\[([^\]]*)\]", block):
            genannt = re.findall(r"'(\w+)'", mm.group(2))
            unbekannt = [g for g in genannt if g not in felder and g not in formen]
            if unbekannt and tname in ('T_PAAR', 'T_ZUSAMMEN', 'T_BERUF'):
                pass   # je Datei geprüft, s.u.

for block, name in THEMENDATEIEN:
    alleformen = set(re.findall(r"\{k:'(\w+)',\s*n:'", block))
    for mm in re.finditer(r"(nurForm|ohneForm):\s*\[([^\]]*)\]", block):
        for g in re.findall(r"'(\w+)'", mm.group(2)):
            if g not in alleformen:
                fehler.append(f'{name}: {mm.group(1)} nennt die Form "{g}", '
                              'die es in dieser Datei nicht gibt')

# ── Die Anzeige schreibt keinen Satz und kein „dein" ─────────
#     Aufgabe 61, aus 34 und 38: Die Sätze dieser Seite stehen in
#     analyse-texte.js (AN_T), die Anzeige rechnet und setzt mit
#     `anFuell` ein. Was in analyse-app.js steht, zieht beim Umzug in
#     eine andere Umgebung nicht mit (PRODUKT.md Abschnitt 7) — und
#     genau deshalb ist das hier eine Sperre und kein Vorsatz.
sys.path.insert(0, str(rit))
import pruefwerk

if not re.search(r'\bvar AN_T\s*=', texte):
    fehler.append('Tafel AN_T fehlt in analyse-texte.js')
fehler += pruefwerk.pruefe_anzeige_satzfrei(app, 'analyse-app.js', 'analyse-texte.js')
fehler += pruefwerk.pruefe_anzeige_ohne_dein(app, 'analyse-app.js')
fehler += pruefwerk.pruefe_fueller(app, 'analyse-app.js')
fehler += pruefwerk.pruefe_vorlagenluecken(texte, app, 'analyse-texte.js')

#     Und die Gegenprobe gegen die Fehlerklasse, die ein grüner
#     Riegel nicht ausschließt: dass er heute nur nichts zu finden
#     hatte (REGELN.md 6e, Nachsatz). In allen drei Anführungsarten —
#     ein Satz, der in doppelten oder schrägen Anführungszeichen
#     durchgeht, wäre das Loch, über das die Sätze einzeln
#     zurückkommen.
for _art, _an in (('einfache', "'"), ('doppelte', '"'), ('schräge', '`')):
    _mit = app + '\nvar _gegenprobe=' + _an + 'Für diese Kombination' + _an + ';\n'
    if not pruefwerk.pruefe_anzeige_satzfrei(_mit, 'analyse-app.js', 'analyse-texte.js'):
        fehler.append(f'der Riegel sieht einen Satz in {_art} Anführung nicht — '
                      'dann hält er nur, was heute zufällig nicht dasteht')
    _mit = app + '\nvar _gegenprobe=' + _an + 'deine Vorbereitung' + _an + ';\n'
    if not pruefwerk.pruefe_anzeige_ohne_dein(_mit, 'analyse-app.js'):
        fehler.append(f'der Riegel sieht ein „dein" in {_art} Anführung nicht — '
                      'dann kommt die ungebeugte Form einzeln zurück')

#     Wer AC_FUELL aufruft, bringt es auch mit.
if pruefwerk.ruft_ohne_stelle(lies(ziel)):
    fehler.append('die Seite füllt Lücken, aber kern/fuellen.js liegt nicht mit darauf')

# ── Keine Beschriftung wird an eine Zahl geklebt ─────────────
#     Der Fehler, der beim Umzug am 2026-11-22 aufgefallen ist. Die
#     Waage beschriftete sich so:
#
#         llab: erg.nenner + ' gemeinsame Nenner'  → „1 gemeinsame Nenner"
#         llab: nt + ' trägt'                      → „4 trägt"
#
#     Beide Formen hängen an der Zahl davor, und beide waren für die
#     Eins beziehungsweise für alles außer der Eins falsch. Das ist
#     dieselbe Klasse wie REGELN.md 6f: Was sich mit dem eingesetzten
#     Wert ändert, braucht seine eigene Vorlage — und eine Sperre, die
#     am Schlüssel sitzt, der im Text landet.
#
#     Geprüft wird die Form, die gemeint ist, nicht ein Wort, das
#     meistens dabeisteht (REGELN.md 6e): eine Zuweisung an ein
#     Beschriftungsfeld, deren rechte Seite ein Plus trägt.
_KLEBT = re.compile(r"""\b(l{1,2}lab|r{1,2}lab|lk|rk)\s*:\s*[^,}\n]*\+""")


def klebt_an_zahl(quell):
    """Zeilen, in denen eine Beschriftung zusammengesetzt wird."""
    rein = pruefwerk.nur_code(quell)
    return [rein.count('\n', 0, m.start()) + 1 for m in _KLEBT.finditer(rein)]


# Die festen Beispiele (REGELN.md 6e) — die beiden Fassungen, die es
# wirklich gab, und die Formen, die durchgehen müssen.
assert klebt_an_zahl("waage:{llab:nt+' trägt'}") == [1]
assert klebt_an_zahl('waage:{rlab: nb + " bremst"}') == [1]
assert klebt_an_zahl("x={llab:erg.nenner+' gemeinsame Nenner'}") == [1]
assert klebt_an_zahl("x={lk:'nenner'+s}") == [1]
assert klebt_an_zahl("waage:{lk:'traegt', ln:nt, rk:'bremst', rn:nb}") == []
assert klebt_an_zahl("var llab=anZahl(W.lk, W.ln);") == []
assert klebt_an_zahl("/* vorher: llab:nt+' trägt' */\nvar a=1;") == []
assert klebt_an_zahl("waage:{links:a+b, rechts:c+d}") == []

for _quell, _name in list(THEMENDATEIEN) + [(app, 'analyse-app'), (texte, 'analyse-texte')]:
    for _z in klebt_an_zahl(_quell):
        fehler.append(f'{_name}.js Zeile {_z}: eine Beschriftung wird '
                      'zusammengesetzt — die Rechnung liefert Schlüssel und '
                      'Zahl, die Form steht in AN_T.waage (REGELN.md 6f)')

# ── Jede Waage-Beschriftung hat eine Einzahl und eine Mehrzahl ──
#     Sonst wäre die Regel darüber umsonst: Ein Schlüssel ohne
#     Einzahlform müsste wieder von Hand gebildet werden.
_WAAGE = re.search(r'waage:\s*\{(.*?)\n\s*\},', texte, re.S)
if not _WAAGE:
    fehler.append('AN_T.waage fehlt in analyse-texte.js')
else:
    _PAAR_FORM = re.compile(
        r"(\w+)\s*:\s*\{\s*ein:\s*'([^']*)',\s*viele:\s*'([^']*)'\s*\}")
    _formen = {m.group(1): (m.group(2), m.group(3))
               for m in _PAAR_FORM.finditer(_WAAGE.group(1))}
    _alle = set(re.findall(r'^\s*(\w+)\s*:\s*\{', _WAAGE.group(1), re.M))
    _ohne = sorted(_alle - set(_formen))
    if _ohne:
        fehler.append('Waage-Schlüssel ohne Einzahl und Mehrzahl: '
                      + ', '.join(_ohne))
    for _k, (_ein, _viele) in _formen.items():
        if '{n}' in _ein:
            fehler.append(f'AN_T.waage.{_k}.ein trägt eine Lücke — die '
                          'Einzahlform gilt genau für die Eins')
        if '{n}' not in _viele:
            fehler.append(f'AN_T.waage.{_k}.viele trägt keine Lücke ' + '{n}'
                          ' — dann steht dort keine Zahl')
    # Und jeder Schlüssel, den eine Themendatei nennt, muss es geben.
    for _quell, _name in THEMENDATEIEN:
        for _m in re.finditer(r"\b[lr]k\s*:\s*'(\w+)'", _quell):
            if _m.group(1) not in _formen:
                fehler.append(f'{_name}.js nennt den Waage-Schlüssel '
                              f'"{_m.group(1)}", den AN_T.waage nicht kennt')

for href in sorted(set(re.findall(r'href="([a-z0-9_-]+\.html)', koerper))):
    if not (wiki / href).exists():
        fehler.append('Verweis ins Leere: ' + href)

# ── Rauchprobe: viele Paare durchrechnen ────────────────────
probe = hier / '_probe-analyse.js'
probe.write_text(r"""
const {chromium}=(function(){const orte=[process.env.AC_PLAYWRIGHT,'playwright','/opt/npm-tools/node_modules/playwright'];for(const o of orte){if(!o)continue;try{return require(o);}catch(e){}}throw new Error('Playwright nicht gefunden. AC_PLAYWRIGHT setzen oder playwright installieren.');})();
/* Zwanzig erfundene Charts, über Jahrzehnte und Tageszeiten gestreut. */
const liste=[]; let i=0;
for(const y of [1955,1968,1979,1988,1997]) for(const mo of [2,6,9,12]){
  i++; liste.push({id:'p'+i,name:'T'+i,alias:'T'+i,y,mo,d:4+((i*7)%24),h:(i*5)%24,mi:(i*13)%60,
   tz:1,lat:52.52,lon:13.405,ort:'Berlin',wlat:52.52,wlon:13.405,wort:'Berlin',
   eigen:i===1,readings:[]});
}
(async()=>{
const b=await chromium.launch(); const f=[];
const p=await (await b.newContext({viewport:{width:390,height:900}})).newPage();
p.on('pageerror',e=>f.push(String(e.message).slice(0,140)));
await p.addInitScript(l=>localStorage.setItem('ac_profile_v1',JSON.stringify(
 {v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:l})), liste);
await p.goto('file://ZIEL'); await p.waitForTimeout(900);

const themen=await p.evaluate(()=>[...document.querySelectorAll('.th')].map(x=>x.dataset.t));
const start=await p.evaluate(()=>({
  erg:!!document.querySelector('.an-erg'),
  gruppen:document.querySelectorAll('.an-gruppe').length,
  befunde:document.querySelectorAll('.an-b').length,
  breit:document.body.scrollWidth}));

async function lage(){
  return p.evaluate(()=>({
    n:document.querySelectorAll('.an-b').length,
    erg:(document.querySelector('.an-erg .gr')||{}).textContent||'',
    titel:[...document.querySelectorAll('.an-b h3')].map(x=>x.textContent).join('|'),
    fehler:(document.getElementById('anfehler')||{}).textContent||'',
    schlecht:/undefined|NaN|\[object|ihr ihr/.test(document.body.innerText),
    /* Eine Lücke, die niemand füllt, steht in geschweiften Klammern
       auf der Seite (Aufgabe 61). Die Textprüfung in bau-analyse.py
       sieht nur die Vorlagen, nicht den gerenderten Zweig. */
    klammer:(document.body.innerText.match(/\{[a-zA-Z][a-zA-Z0-9]*\}/)||[''])[0],
    waage:[...document.querySelectorAll('.an-waage .w-l b')].map(x=>x.textContent),
    breit:document.body.scrollWidth}));
}

/* Alle Themen × mehrere Paarungen × alle Formen */
let min=1e9, max=0, leer=0, laeufe=0, regelFehler='';
const waageLabels=[];
const gesehen=new Set(); const formWirkt={}; const formZahl={};
for(const t of themen){
  await p.evaluate(t=>document.querySelector('.th[data-t="'+t+'"]').click(), t);
  await p.waitForTimeout(170);
  const formen=await p.evaluate(()=>[...document.querySelectorAll('.fb')].map(x=>x.dataset.f));
  formZahl[t]=formen.length;
  const proForm={};
  for(const fm of (formen.length?formen:[null])){
    if(fm) await p.evaluate(fm=>document.querySelector('.fb[data-f="'+fm+'"]').click(), fm);
    await p.waitForTimeout(140);
    for(let k=1;k<Math.min(liste.length,7);k++){
      const hatB=await p.evaluate(k=>{
        const bs=[...document.querySelectorAll('.pb[data-w="b"]')];
        if(!bs.length) return false; bs[k%bs.length].click(); return true; }, k);
      if(!hatB){
        await p.evaluate(k=>{const as=[...document.querySelectorAll('.pb[data-w="a"]')];
          as[k%as.length].click();}, k);
      }
      await p.waitForTimeout(140); laeufe++;
      const r=await lage();
      if(r.fehler) regelFehler=r.fehler;
      if(r.schlecht) f.push('undefined/NaN bei '+t+'/'+fm+'/'+k);
      if(r.klammer) f.push('offene Vorlagenlücke '+r.klammer+' bei '+t+'/'+fm);
      if(r.waage.length) waageLabels.push(...r.waage);
      if(r.breit>390) f.push('Überlauf '+r.breit+' bei '+t+'/'+fm);
      if(r.n===0) leer++;
      if(r.n<min) min=r.n; if(r.n>max) max=r.n;
      if(r.erg) gesehen.add(t+'::'+r.erg);
      if(fm&&k===1) proForm[fm]=r.titel;
    }
  }
  /* Die Form muss die Befunde wirklich verändern, nicht nur den Knopf */
  if(formen.length){
    const werte=Object.values(proForm);
    formWirkt[t]=new Set(werte).size;
  }
}
/* Bericht ziehen — mit einem Thema, das Formen hat, sonst steht keine drin */
await p.evaluate(()=>document.querySelector('.th[data-t="zusammen"]').click());
await p.waitForTimeout(260);
await p.evaluate(()=>{const b=document.querySelector('.pb[data-w="b"]'); if(b) b.click();});
await p.waitForTimeout(260);
const bericht=await p.evaluate(()=>typeof berichtText==='function'?berichtText():'');
/* Die Regel selbst, gegen feste Zahlen gehalten (REGELN.md 6e): Die
   Einzahlform gilt genau für die Eins, jede andere Zahl steht in der
   Beschriftung. So bricht sie an der Regel und nicht an dem Lauf, in
   dem heute zufällig genau ein Befund stand. */
const zahlProbe=await p.evaluate(()=>{
  const schlecht=[];
  for(const k of Object.keys(AN_T.waage)){
    const f=AN_T.waage[k];
    if(anZahl(k,1)!==f.ein) schlecht.push(k+': die Eins nimmt nicht die Einzahl');
    for(const n of [0,2,3,11]){
      const s=anZahl(k,n);
      if(s===f.ein) schlecht.push(k+': '+n+' nimmt die Einzahl');
      if(s.indexOf(String(n))<0) schlecht.push(k+': '+n+' steht nicht in „'+s+'"');
    }
  }
  return schlecht;
});
console.log(JSON.stringify({themen,start,min,max,leer,laeufe,formWirkt,formZahl,
  zahlProbe, waageLabels:[...new Set(waageLabels)],
  ergebnisse:[...gesehen].length, regelFehler, berichtLaenge:bericht.length,
  berichtForm:/·/.test(bericht.split('\n')[0]),
  fehler:[...new Set(f)]}));
await b.close();})();
""".replace('ZIEL', str(ziel)), encoding='utf-8')
try:
    r = subprocess.run(['node', str(probe)], capture_output=True, text=True, timeout=420)
    pr = json.loads(r.stdout.strip().splitlines()[-1]) if r.returncode == 0 else None
    if pr is None:
        fehler.append('Rauchprobe: ' + (r.stderr.strip().splitlines() or ['?'])[-1][:200])
except Exception as e:
    fehler.append('Rauchprobe: ' + str(e)[:200]); pr = None
finally:
    probe.unlink(missing_ok=True)

if pr:
    for f_ in pr['fehler']:
        fehler.append(f_)
    for _m in pr['zahlProbe']:
        fehler.append('Einzahl und Mehrzahl der Waage — ' + _m)
    if not pr['waageLabels']:
        fehler.append('über alle Läufe wurde keine Waage beschriftet — '
                      'dann prüft die Regel darüber nichts')
    if pr['regelFehler']:
        fehler.append('Regel wirft Fehler — ' + pr['regelFehler'][:180])
    if len(pr['themen']) != 5:
        fehler.append(f'{len(pr["themen"])} statt 5 Themen')
    # Die gewählte Form muss die Befunde ändern, sonst ist sie Zierde
    for th, verschieden in pr['formWirkt'].items():
        if pr['formZahl'].get(th, 0) > 1 and verschieden < 2:
            fehler.append(f'Thema {th}: die Form ändert an den Befunden nichts '
                          f'({pr["formZahl"][th]} Formen, {verschieden} verschiedene Ergebnisse)')
    for th, z in pr['formZahl'].items():
        if th in ('paar', 'zusammen', 'beruf') and z < 4:
            fehler.append(f'Thema {th} hat nur {z} Formen')
    if not pr['berichtForm']:
        fehler.append('der Bericht nennt die gewählte Form nicht')
    if not pr['start']['erg']:
        fehler.append('beim Start kommt kein Ergebnis')
    if pr['start']['befunde'] < 6:
        fehler.append(f'beim Start nur {pr["start"]["befunde"]} Befunde')
    if pr['leer']:
        fehler.append(f'{pr["leer"]} von {pr["laeufe"]} Läufen ohne einen einzigen Befund')
    if pr['min'] < 3:
        fehler.append(f'ein Lauf brachte nur {pr["min"]} Befunde')
    if pr['ergebnisse'] < 9:
        fehler.append(f'nur {pr["ergebnisse"]} verschiedene Ergebnisse über alle Läufe — '
                      'die Rechnung unterscheidet zu wenig')
    if pr['berichtLaenge'] < 800:
        fehler.append(f'der Bericht ist nur {pr["berichtLaenge"]} Zeichen lang')
    print('  Rauchprobe: %d Läufe über %d Themen, %d–%d Befunde je Lauf, '
          '%d verschiedene Ergebnisse, Bericht %d Zeichen'
          % (pr['laeufe'], len(pr['themen']), pr['min'], pr['max'],
             pr['ergebnisse'], pr['berichtLaenge']))
    print('    %d verschiedene Waage-Beschriftungen' % len(pr['waageLabels']))
    print('    Formen je Thema: %s' % pr['formZahl'])
    print('    davon wirksam (verschiedene Befunde): %s' % pr['formWirkt'])

print(f'analyse.html  {ziel.stat().st_size:,} Bytes  →  {ziel}')
print(f'  {n_regeln} Regeln')
for h in hinweise:
    print('  Hinweis: ' + h)
for f in fehler:
    print('  FEHLER: ' + f)
sys.exit(1 if fehler else 0)
