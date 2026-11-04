#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut die zwölf Themenräume — Schritt 3 aus ENTWURF-NEUE-SEITE.md.

Der Plan sah vor, die zwölf raum-*.html in bereiche.html zusammenzulegen.
Das wäre falsch gewesen, und zwar aus zwei Gründen:

  1. Die „35.000 Wörter" im Plan gibt es nicht. Die zwölf Räume haben
     zusammen 2.460 Wörter Inhalt. Der Rest war Beiwerk — eine
     Stylesheet-Kopie und eine komplette Himmelsrechnung je Seite.
  2. Die beiden Systeme sind nicht dasselbe. Sieben Räume haben ein
     Gegenstück in den Lebensbereichen, drei nicht: „Das Unerlaubte",
     „Der wunde Punkt" und „Anders verdrahtet". Der letzte ist der Raum
     über Neurodivergenz; ein Zusammenlegen hätte ihn gelöscht.

Also stattdessen: die Räume bleiben, aber sie werden gebaut. Aus einem
Motor, einer Himmelsrechnung und zwölf Definitionen.

Dabei kamen zwei Fehler heraus, die seit Wochen live waren:

  * In „Anders verdrahtet" stand rohes JavaScript im Fließtext
    ('+res.length+'). Eigene PR, schon zusammengeführt.
  * Fünf Räume — Alltag, Körper, Sicherheit, Versorgung,
    Zugehörigkeit — speicherten die Antworten ihrer Übungen fest unter
    dem Schlüssel 'raum-selbstwert-…'. Wer dort etwas beantwortet hat,
    hat die Antworten aus dem Selbstwert-Raum überschrieben. Beim
    Zusammenführen auf einen Motor ist das weg: Der Schlüssel kommt
    jetzt aus RAUM.slug, und eine Prüfung unten hält das fest.
"""
import pathlib, re, sys, subprocess, json

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit = hier.parent / 'rituale'


def lies(p):
    return p.read_text(encoding='utf-8')


vorlage = lies(hier / 'raum-koerper.html')
daten = lies(hier / 'raum-daten.js')
motor = lies(hier / 'raum-motor.js')
stil = lies(hier / 'raum-stil.css')

ADLER = ('<div class="rm-adler"><b>Zu den Wozu-Fragen:</b> Sie kommen von '
         'Alfred Adler. Seine Idee: Verhalten hat kein Warum, sondern ein '
         '<b>Wozu</b>. Jedes Muster erfüllt einen Zweck — sonst gäbe es das '
         'Muster nicht. In jeder Facette findest du deshalb eine Frage danach, '
         'was dich dieses eine Muster kostet <i>und</i> wovor es dich schützt. '
         'Die zweite Hälfte ist die wichtigere. Mehr dazu unter '
         '<a href="haltung.html">Haltung &amp; Methode</a>.</div>')

SKRIPTE = ['profil.js', 'coach.js', 'fortschritt.js', 'kleine-punkte.js',
           'raum.js', 'format.js', 'niveau.js', 'wortwahl.js']

fehler, hinweise = [], []

# ── Die Räume aus der Datendatei lesen ──────────────────────
slugs = re.findall(r"R_RAEUME\['([a-z-]+)'\]", daten)
if len(slugs) != 12:
    fehler.append(f'{len(slugs)} statt 12 Räume in raum-daten.js')


def feld(slug, name):
    m = re.search(r"R_RAEUME\['" + slug + r"'\] = \{(.*?)\n\};", daten, re.S)
    if not m:
        return ''
    f = re.search(name + r':\s*(".*?[^\\]"|true|false),\n', m.group(1), re.S)
    if not f:
        return ''
    v = f.group(1)
    if v in ('true', 'false'):
        return v == 'true'
    return json.loads(v)


def nur_daten(slug):
    """Der Kopf der Datendatei plus genau ein Raum."""
    # Nicht mit einer einzelnen Regex schneiden: Die eingebettete
    # RAUM-Definition endet selbst mit "\n};" am Zeilenanfang, ein
    # nicht-gieriger Ausdruck haelt dort an und liefert halben Code.
    # Also bis zum naechsten Blockanfang gehen und von hinten suchen.
    start = daten.find("R_RAEUME['" + slug + "'] = {")
    if start < 0:
        fehler.append(f'{slug}: Block nicht in raum-daten.js gefunden')
        return 'var R_RAEUME = {};'
    naechster = daten.find('R_RAEUME[', start + 10)
    ende = daten.rfind('\n};', start, naechster if naechster > 0 else len(daten))
    if ende < 0:
        fehler.append(f'{slug}: Blockende nicht gefunden')
        return 'var R_RAEUME = {};'
    return 'var R_RAEUME = {};\n' + daten[start:ende + 3]


gebaut = []
for slug in slugs:
    kopf = (f'<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">\n'
            f'<meta name="viewport" content="width=device-width, initial-scale=1">\n'
            f'<title>{feld(slug, "titel")} &middot; Themenraum &middot; Astro-Charlie</title>\n'
            '<link rel="preconnect" href="https://fonts.googleapis.com">'
            '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
            '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">\n'
            # profil.js und raum.js laden ohne defer: Der Seitenaufbau
            # unten braucht AC_P und AC_RAUM sofort. Mit defer liefen sie
            # erst nach dem Inline-Block, und bauen() fand AC_RAUM nicht.
            + '\n'.join(f'<script src="{s}"'
                        f'{"" if s in ("profil.js", "raum.js") else " defer"}></script>'
                        for s in SKRIPTE) + '\n<style>\n')

    koerper = (vorlage
               .replace('{{H1}}', feld(slug, 'h1'))
               .replace('{{FRAGE}}', feld(slug, 'frage'))
               .replace('{{INTRO}}', feld(slug, 'intro'))
               .replace('{{ADLER}}', ADLER if feld(slug, 'adler') else '')
               .replace('{{ZEITSCHIENE}}',
                        '<div id="zeitschiene"></div>' if feld(slug, 'zeitschiene') else '')
               .replace('{{WEITER}}', feld(slug, 'weiter'))
               .replace('{{FUSS}}', feld(slug, 'fuss')))

    # Die Himmelsrechnung kommt aus engine.js — einmal, wie überall.
    # raum.js wird mit defer geladen und setzt erst danach AC_RAUM.
    # Ein Inline-Aufruf liefe vorher — deshalb auf das Ende des
    # Dokuments warten. Die alten Seiten hatten dasselbe Problem nicht,
    # weil ihr Motor und ihre Daten im selben Block standen.
    start = ("var R = R_RAEUME['" + slug + "'];\n"
             "var RAUM = R.def.RAUM, WOZU = R.def.WOZU;\n"
             "function losLegen(){\n"
             "  if(!window.AC_RAUM) return setTimeout(losLegen, 20);\n"
             "  bauen();\n"
             "}\n"
             "if(document.readyState === 'loading')\n"
             "  document.addEventListener('DOMContentLoaded', losLegen);\n"
             "else losLegen();\n")

    html = (kopf + lies(rit / 'basis.css') + '\n' + stil
            + '</style>\n</head><body>\n' + koerper + '\n<script>\n'
            # Nur die Daten dieses einen Raums. Vorher trug jede Seite
            # alle zwoelf mit sich — 298 KB statt 60.
            + lies(rit / 'engine.js') + '\n' + nur_daten(slug) + '\n' + motor + '\n'
            + start + '</script>\n</body></html>\n')

    # Die App-Ansicht: dieselbe Zeile wie in jedem anderen bau-*.py.
    html = html.replace('<head>', '<head>' + lies(
        hier.parent / 'app' / 'app-kopf.html'), 1)
    ziel = wiki / f'raum-{slug}.html'
    ziel.write_text(html, encoding='utf-8')
    gebaut.append(ziel)

# ── 1 · Kein Raum speichert unter dem Namen eines anderen ────
# Das war der Fehler: fünf Räume schrieben fest nach
# 'raum-selbstwert-…'. Jetzt kommt der Schlüssel aus RAUM.slug, und das
# bleibt so. Ein fester Raumname in dieser Zeile ist ab jetzt ein
# Baufehler.
m = re.search(r"schluessel:\s*'([^']*)'", motor)
if not m or 'raum-' != m.group(1):
    fehler.append('der Speicherschlüssel im Motor ist nicht mehr '
                  "'raum-'+RAUM.slug — so überschreiben Räume einander")
if re.search(r"schluessel:\s*'raum-[a-z]", motor):
    fehler.append('im Motor steht ein fester Raumname im Speicherschlüssel')

# ── 1b · Der Motor ruft sich nicht selbst auf ────────────────
# Der Code kam aus Seiten, die mit "bauen();" endeten. In einer
# gemeinsamen Datei laeuft das los, bevor es einen Raum gibt — und
# reisst den ganzen Block mit. Aufgerufen wird erst von der Seite.
import re as _re
if _re.search(r'^\s*bauen\(\);', motor, _re.M):
    fehler.append('der Motor ruft bauen() selbst auf — das laeuft, bevor '
                  'RAUM gesetzt ist')

# ── 2 · Nur eine Himmelsrechnung ─────────────────────────────
# Vorher trug jede der zwölf Seiten ihre eigene. Dass das nie
# auseinanderlief, war Glück und nicht Absicht.
for verraeter, was in [('0.38709927', 'Bahnelemente'),
                       ('function sunLon', 'eine eigene sunLon'),
                       ('function angles', 'eine eigene angles')]:
    if verraeter in motor or verraeter in daten:
        fehler.append(f'der Raum-Quelltext enthält wieder {was}')

# ── 3 · Alle zwölf Räume, und jeder mit Inhalt ───────────────
for slug in slugs:
    for name, mindest in [('h1', 3), ('frage', 15), ('intro', 60), ('fuss', 20)]:
        w = feld(slug, name)
        if not isinstance(w, str) or len(w) < mindest:
            fehler.append(f'{slug}: {name} fehlt oder ist zu kurz')
if 'anders-verdrahtet' not in slugs:
    fehler.append('der Raum „Anders verdrahtet" fehlt — er hat kein '
                  'Gegenstück in den Lebensbereichen und darf nicht wegfallen')

# ── 4 · Kein rohes Skript im Fließtext ───────────────────────
# Genau das stand in „Anders verdrahtet" wochenlang sichtbar.
for z in gebaut:
    t = lies(z)
    for mm in re.finditer(r"'\+[A-Za-z_][\w.]*\+'", t):
        if t.rfind('<script', 0, mm.start()) <= t.rfind('</script>', 0, mm.start()):
            fehler.append(f'{z.name}: rohes JavaScript im Fließtext')
            break

# ── Die Rauchprobe ───────────────────────────────────────────
probe = r'''
const {chromium}=require('playwright');
(async()=>{
const f=[];
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:390,height:844}});
await ctx.addInitScript(()=>{localStorage.setItem('ac_profile_v1',JSON.stringify(
 {v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:[{id:'p1',name:'Probe Person',
  alias:'Probe',y:1980,mo:7,d:15,h:14,mi:20,tz:1,lat:52.52,lon:13.405,
  ort:'Berlin',wlat:52.52,wlon:13.405,wort:'Berlin',eigen:true,readings:[]}]}));});
const p=await ctx.newPage();
p.on('pageerror',e=>f.push('Skriptfehler: '+String(e.message).slice(0,130)));
const RAEUME=SLUGS;
const abzug={};
for(const r of RAEUME){
  await p.goto('file://WIKI/raum-'+r+'.html');
  await p.waitForTimeout(800);
  const d=await p.evaluate(()=>{
    const w=document.getElementById('raum');
    return {laenge:w?w.innerText.length:0,
      text:(w?w.innerText:'').replace(/\s+/g,' ').trim(),
      /* raum.js kapselt sich in einer IIFE, sein eigenes haus() ist
         also nicht global und kann von engine.js nicht ueberschrieben
         werden. Geprueft wird deshalb das Ergebnis, nicht die
         Funktion: Der Aszendent muss im ersten Haus liegen. */
      ascHaus:(function(){try{var P=chartVon({y:1980,mo:7,d:15,h:14,mi:20,
        tz:1,lat:52.52,lon:13.405});return haus(P,P.ASC);}catch(e){return 'x';}})(),
      ueber:(function(){const W=document.documentElement.clientWidth;const o=[];
        document.querySelectorAll('body *').forEach(e=>{const bb=e.getBoundingClientRect();
          if(bb.width>0&&(bb.right>W+1.5||bb.left<-1.5)) o.push(e.className||e.tagName);});
        return o.slice(0,2);})()};
  });
  if(d.laenge<800) f.push(r+': der Raum bleibt fast leer ('+d.laenge+' Zeichen)');
  if(d.ascHaus!==1) f.push(r+': der Aszendent liegt im '+d.ascHaus+
    '. Haus statt im ersten — die Himmelsrechnung stimmt nicht');
  if(d.ueber.length) f.push(r+': laeuft auf 390px ueber ('+d.ueber.join(', ')+')');
  abzug[r]={laenge:d.laenge, text:d.text};
}
console.log(JSON.stringify({fehler:f, abzug:abzug}));
await b.close();})();
'''

pp = hier / '.probe-raeume.js'
pp.write_text(probe.replace('SLUGS', json.dumps(slugs)).replace('WIKI', str(wiki)),
              encoding='utf-8')
try:
    r = subprocess.run(['node', str(pp)], capture_output=True, text=True, timeout=200)
    if r.returncode != 0:
        fehler.append('Rauchprobe gescheitert: ' + (r.stderr or '')[-300:])
    else:
        pr = json.loads(r.stdout.strip().splitlines()[-1])
        fehler.extend(pr['fehler'])
        (hier / '.abzug.json').write_text(json.dumps(pr['abzug'], indent=1),
                                          encoding='utf-8')
except Exception as e:
    fehler.append('Rauchprobe nicht gelaufen: ' + str(e)[:200])
finally:
    pp.unlink(missing_ok=True)

for h in hinweise:
    print('      Hinweis: ' + h)
if fehler:
    for f in fehler[:12]:
        print('      FEHLER: ' + f)
    sys.exit(1)
print(f'      12 Themenräume, je ~{len(html)//1024} KB')
