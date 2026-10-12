#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Rüstet planeten-in-haeusern.html nach.

Die Seite war ein reines Nachschlagewerk — sie lud zwar profil.js, rechnete
aber kein Chart. Man musste also wissen, was man suchen will. Dieser Patch
gibt ihr zwei Dinge:

  1. „Deine Stellungen" — zehn Knöpfe, die direkt auf die eigenen
     Planet-Zeichen-Haus-Kombinationen springen.
  2. einen Verweis auf die Übersichtsseite, damit man nicht im Formular
     startet, sondern im Bild.

Der Patch ist absichtlich klein und prüft vorher, ob die Anker noch da sind.
"""
import pathlib, re, sys, subprocess, json

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit  = hier.parent / 'rituale'
ziel = wiki / 'planeten-in-haeusern.html'
sich = hier / 'tiefe-original.html'

# Original einmal beiseitelegen, damit der Patch wiederholbar bleibt
if not sich.exists():
    sich.write_text(ziel.read_text(encoding='utf-8'), encoding='utf-8')
s = sich.read_text(encoding='utf-8')

fehler = []
ANKER = {
    'Zufallsknopf':   '<div class="zufall"><button class="btn2" id="zufall">',
    'Auswahlzustand': 'var sel = {p:4, z:1, h:11, l:0};',
    'Datenobjekt':    'var D = {',
    'Stilblock':      '</style><script src="profil.js"></script>',
}
for name, a in ANKER.items():
    if a not in s:
        fehler.append(f'Anker „{name}" nicht mehr in der Seite — Patch abgebrochen')
if fehler:
    for f in fehler:
        print('  FEHLER: ' + f)
    sys.exit(1)

# ── 1 · Stil ────────────────────────────────────────────────
stil = """
/* Nachgerüstet: deine eigenen Stellungen */
.pih-meins{background:var(--messing-bg,#F7EFE1);border:1px solid var(--messing,#9A7235);
 border-radius:17px;padding:15px 18px;margin:0 0 18px;}
.pih-meins .k{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.13em;
 text-transform:uppercase;color:var(--messing,#9A7235);margin-bottom:9px;}
.pih-meins .reihe{display:flex;flex-wrap:wrap;gap:6px;}
.pih-meins button{font-family:inherit;font-size:13.4px;padding:7px 13px;border-radius:17px;
 border:1px solid var(--linie-stark,#DDD0BC);background:var(--papier,#FFFDFA);
 color:var(--tinte,#231F1A);cursor:pointer;}
.pih-meins button:hover{border-color:var(--nacht,#2E3A5C);}
.pih-meins button .g{color:var(--messing,#9A7235);margin-right:6px;}
.pih-meins .hin{font-size:13.2px;color:var(--leise,#6B6259);margin-top:9px;}
.pih-karte{background:var(--nacht,#2E3A5C);color:#F4EFE6;border-radius:17px;
 padding:16px 19px;margin:0 0 18px;display:flex;flex-wrap:wrap;gap:10px 18px;align-items:center;}
.pih-karte p{margin:0;font-size:14.8px;line-height:1.6;flex:1 1 200px;min-width:0;color:rgba(244,239,230,.9);}
.pih-karte a{color:#E8C97A;}
@media(max-width:420px){.pih-karte{flex-direction:column;align-items:flex-start;gap:9px;}}
"""
s = s.replace('</style><script src="profil.js"></script>',
              stil + '</style><script src="profil.js"></script>', 1)

# ── 2 · Markup vor den Zufallsknopf ─────────────────────────
markup = """<div class="pih-karte">
  <p>Du suchst hier etwas Bestimmtes. Wenn du erst einmal sehen willst, wie H&auml;user, Zeichen und Planeten zusammenh&auml;ngen, fang beim Bild an.</p>
  <a href="haeuser-karte.html">Zur &Uuml;bersicht mit Rad und Matrix &rarr;</a>
</div>
<div class="pih-meins" id="pihmeins" hidden></div>
<div class="zufall"><button class="btn2" id="zufall">"""
s = s.replace('<div class="zufall"><button class="btn2" id="zufall">', markup, 1)

# ── 3 · Rechnung und Knöpfe ─────────────────────────────────
nach = """var sel = {p:4, z:1, h:11, l:0};

/* Nachgerüstet: das eigene Chart. Die Seite kannte es vorher nicht —
   man musste wissen, wonach man sucht. Die Engine kommt von unten mit. */
var PIH_PN=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];
var PIH_GLY={Sonne:'\\u2609',Mond:'\\u263D',Merkur:'\\u263F',Venus:'\\u2640',Mars:'\\u2642',
 Jupiter:'\\u2643',Saturn:'\\u2644',Uranus:'\\u2645',Neptun:'\\u2646',Pluto:'\\u2647'};
function pihChart(){
  var p=null; try{ p=AC_P.aktives()||AC_P.eigenes(); }catch(e){}
  if(!p||typeof jdFromUT!=='function') return null;
  var ut=p.h+p.mi/60-p.tz,y=p.y,mo=p.mo,d=p.d;
  if(ut<0){ut+=24;d-=1;} if(ut>=24){ut-=24;d+=1;}
  var jd=jdFromUT(y,mo,d,ut),T=(jd-2451545)/36525,a=angles(jd,p.lat,p.lon);
  var C={ASC:a.asc};
  PIH_PN.forEach(function(k){
    C[k]=(k==='Sonne')?sunLon(T):((k==='Mond')?moonLon(T):geo(k,T)); });
  C._name=AC_P.anzeige(p,true);
  return C;
}
function pihMeins(){
  var box=document.getElementById('pihmeins'); if(!box) return;
  var C=pihChart();
  if(!C){ box.hidden=true; return; }
  function nrm(x){x=x%360;return x<0?x+360:x;}
  function zi(l){ return Math.floor(nrm(l)/30); }
  function hs(l){ return ((Math.floor(nrm(l)/30)-Math.floor(nrm(C.ASC)/30))%12+12)%12+1; }
  var h='<div class="k">Deine Stellungen &middot; '+C._name+'</div><div class="reihe">';
  PIH_PN.forEach(function(k){
    var z=zi(C[k]), n=hs(C[k]);
    h+='<button type="button" data-p="'+k+'" data-z="'+z+'" data-h="'+n+'">'+
      '<span class="g">'+PIH_GLY[k]+'</span>'+k+' &middot; '+D.zeichen[z].n+' &middot; '+n+'.</button>';
  });
  h+='</div><div class="hin">Ein Knopf setzt Punkt, Zeichen und Haus auf einmal. '+
     'Der Blickwinkel oben bleibt stehen \\u2014 so liest du dieselbe Stellung '+
     'nacheinander f\\u00fcr Pers\\u00f6nlichkeit, Beruf und Liebe.</div>';
  box.innerHTML=h; box.hidden=false;
  Array.prototype.forEach.call(box.querySelectorAll('button'),function(b){
    b.addEventListener('click',function(){
      sel.p=PL.indexOf(b.getAttribute('data-p'));
      sel.z=+b.getAttribute('data-z');
      sel.h=+b.getAttribute('data-h')-1;
      if(typeof zeichne==='function') zeichne();
      else if(typeof alles==='function') alles();
      else if(typeof render==='function') render();
      var t=document.getElementById('titel'); if(t) t.scrollIntoView({block:'nearest',
        behavior:(window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth')});
    });
  });
}"""
s = s.replace('var sel = {p:4, z:1, h:11, l:0};  // Mars in Stier im 12. Haus als Startbeispiel',
              nach, 1)

# Engine und Aufruf ans Ende des Skriptblocks
i = s.rfind('</script>')
s = s[:i] + "\n/* Engine für das eigene Chart, nachgerüstet */\n" + \
    rit.joinpath('engine.js').read_text(encoding='utf-8') + \
    "\ntry{ pihMeins(); }catch(e){}\n" + s[i:]

ziel.write_text(s, encoding='utf-8')

# ── Prüfungen ───────────────────────────────────────────────
hinweise = []
for href in ('haeuser-karte.html',):
    if not (wiki / href).exists():
        fehler.append('Verweis ins Leere: ' + href)

probe = hier / '_probe-tiefe.js'
probe.write_text(r"""
const {chromium}=require('/opt/npm-tools/node_modules/playwright');
(async()=>{
const b=await chromium.launch(); const f=[];
const p=await (await b.newContext({viewport:{width:390,height:900}})).newPage();
p.on('pageerror',e=>f.push(String(e.message).slice(0,130)));
await p.addInitScript(()=>localStorage.setItem('ac_profile_v1',JSON.stringify(
 {v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:[{id:'p1',name:'Probe Person',alias:'Probe',
  y:1980,mo:7,d:15,h:14,mi:20,tz:1,lat:52.52,lon:13.405,ort:'Berlin',
  wlat:52.52,wlon:13.405,wort:'Berlin',eigen:true,readings:[]}]})));
await p.goto('file://ZIEL'); await p.waitForTimeout(900);
const v=await p.evaluate(()=>({
  knoepfe:document.querySelectorAll('#pihmeins button').length,
  sichtbar:!document.getElementById('pihmeins').hidden,
  karte:!!document.querySelector('.pih-karte a'),
  titelVorher:(document.getElementById('titel')||{}).textContent,
  breit:document.body.scrollWidth,
  schlecht:/undefined|NaN|\[object/.test(document.body.innerText)}));
await p.evaluate(()=>document.querySelectorAll('#pihmeins button')[6].click());
await p.waitForTimeout(300);
const n=await p.evaluate(()=>({
  titel:(document.getElementById('titel')||{}).textContent,
  beschriftung:document.querySelectorAll('#pihmeins button')[6].textContent}));
console.log(JSON.stringify({v,n,fehler:[...new Set(f)]}));
await b.close();})();
""".replace('ZIEL', str(ziel)), encoding='utf-8')
try:
    r = subprocess.run(['node', str(probe)], capture_output=True, text=True, timeout=180)
    pr = json.loads(r.stdout.strip().splitlines()[-1]) if r.returncode == 0 else None
    if pr is None:
        fehler.append('Rauchprobe: ' + (r.stderr.strip().splitlines() or ['?'])[-1][:170])
except Exception as e:
    fehler.append('Rauchprobe: ' + str(e)[:170]); pr = None
finally:
    probe.unlink(missing_ok=True)

if pr:
    v, n = pr['v'], pr['n']
    for f_ in pr['fehler']:
        fehler.append('JS-Fehler: ' + f_)
    if v['knoepfe'] != 10:  fehler.append(f'{v["knoepfe"]} statt 10 eigene Stellungen')
    if not v['sichtbar']:   fehler.append('die eigenen Stellungen bleiben versteckt')
    if not v['karte']:      fehler.append('der Verweis auf die Übersicht fehlt')
    if v['schlecht']:       fehler.append('undefined/NaN im Text')
    if v['breit'] > 390:    fehler.append(f'Überlauf auf {v["breit"]}px')
    if n['titel'] == v['titelVorher']:
        fehler.append('ein Klick auf die eigene Stellung ändert die Anzeige nicht')
    # Saturn steht im Knopf — muss auch in der Überschrift landen
    if 'Saturn' not in (n['titel'] or ''):
        fehler.append('Klick auf Saturn zeigt: ' + str(n['titel']))
    print('  Rauchprobe: %d eigene Stellungen, Klick setzt „%s"' % (v['knoepfe'], n['titel']))

print(f'planeten-in-haeusern.html  {ziel.stat().st_size:,} Bytes nachgerüstet')
for h in hinweise:
    print('  Hinweis: ' + h)
for f in fehler:
    print('  FEHLER: ' + f)
sys.exit(1 if fehler else 0)
