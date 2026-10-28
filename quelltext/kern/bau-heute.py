#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Setzt index.html neu zusammen."""
import pathlib, re, sys, subprocess, json

# Für die Reihenfolgeprüfung im Wochenausblick: ein Datum über den
# Jahreswechsel hinweg ist nur dann sortiert, wenn der Monat zählt.
_MONFOLGE = {m: i for i, m in enumerate(
    ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August',
     'September', 'Oktober', 'November', 'Dezember'])}

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit  = hier.parent / 'rituale'


def lies(p):
    return p.read_text(encoding='utf-8')


kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Heute &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<style>
"""

ber = hier.parent / 'bereiche'

html = (kopf + lies(rit / 'basis.css') + "\n" + lies(hier / 'kern-stil.css')
        + "\n" + lies(hier / 'heute-stil.css')
        + "\n" + lies(ber / 'wahl-stil.css')
        + '</style><script src="niveau.js" defer></script>\n'
          '<script src="wortwahl.js" defer></script>\n</head><body>\n'
        + lies(hier / 'heute-koerper.html') + "\n<script>\n"
        + lies(rit / 'engine.js') + "\n"
        + lies(rit / 'himmel.js') + "\n"
        + lies(rit / 'ritual.js') + "\n"
        + lies(hier / 'kern-rad.js') + "\n"
        + lies(hier.parent / 'zeit' / 'zeit-rechner.js') + "\n"
        # Die eine Liste der Bereiche vor dem Rechner, der sie holt.
        + lies(ber / 'lebensbereiche.js') + "\n"
        + lies(ber / 'bereich-rechner.js') + "\n"
        + lies(ber / 'bereich-daten.js') + "\n"
        + lies(ber / 'wahl-daten.js') + "\n"
        + lies(ber / 'wahl-app.js') + "\n"
        + lies(hier / 'heute-app.js')
        + "\n</script>\n</body></html>\n")

ziel = wiki / 'index.html'
# Die App-Ansicht: Manifest, Symbol, Zwischenspeicher. Die Zeilen dafür
# stehen in app/app-kopf.html — an einer Stelle für alle Seiten.
html = html.replace('<head>', '<head>' + (hier.parent / 'app' / 'app-kopf.html').read_text(encoding='utf-8'), 1)
ziel.write_text(html, encoding='utf-8')

fehler, hinweise = [], []
koerper = lies(hier / 'heute-koerper.html')
app = lies(hier / 'heute-app.js')

# Deutsche Substantive bleiben groß — toLowerCase macht daraus Unsinn.
if '.toLowerCase(' in app:
    fehler.append('toLowerCase verändert deutsche Großschreibung — nicht benutzen')

ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
# Fehlerklasse: eine Seite richtet sich nach der Bereichsauswahl,
# bietet sie aber nicht an — oder umgekehrt.
if 'berwahl' not in ids:
    fehler.append('die Leiste für die Bereichsauswahl fehlt im Körper')
if 'AC_WAHL' not in app:
    fehler.append('die Startseite beachtet die Bereichsauswahl nicht')
if "addEventListener('ac-bereiche'" not in app:
    fehler.append('der Kurzblick wird nach einer Änderung der Auswahl '
                  'nicht neu gezeichnet')
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
if gesucht - ids:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(gesucht - ids)))

auf, zu = len(re.findall(r'<div\b', koerper)), len(re.findall(r'</div>', koerper))
if auf != zu:
    fehler.append(f'div-Bilanz: {auf} auf, {zu} zu')

for href in sorted(set(re.findall(r'href="([a-z0-9_-]+\.html)', koerper + app))):
    if not (wiki / href).exists():
        fehler.append('Verweis ins Leere: ' + href)

# Die Signaturen der geliehenen Module: lieber hier anschlagen als im Browser
sig = lies(rit / 'himmel.js') + lies(rit / 'ritual.js')
for name, muster in [('ohneLauf liefert .leer', r'leer:\s*!!'),
                     ('naechsterZeichenwechsel nimmt nur jd', r'function naechsterZeichenwechsel\(jd\)'),
                     ('stationen liefert .direkt', r'direkt:\s*\(fb>=0\)'),
                     ('lunationen nimmt von und bis', r'function lunationen\(von,bis\)')]:
    if not re.search(muster, sig):
        fehler.append('Modul hat sich geändert — ' + name + ' stimmt nicht mehr')

# Rauchprobe
probe = hier / '_probe-heute.js'
probe.write_text(r"""
const {chromium}=(function(){const orte=[process.env.AC_PLAYWRIGHT,'playwright','/opt/npm-tools/node_modules/playwright'];for(const o of orte){if(!o)continue;try{return require(o);}catch(e){}}throw new Error('Playwright nicht gefunden. AC_PLAYWRIGHT setzen oder playwright installieren.');})();
(async()=>{
const b=await chromium.launch(); const f=[];
const p=await (await b.newContext({viewport:{width:390,height:900}})).newPage();
p.on('pageerror',e=>f.push(String(e.message).slice(0,130)));
await p.addInitScript(()=>{localStorage.removeItem('ac_kap_heute');
 localStorage.setItem('ac_profile_v1',JSON.stringify(
 {v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:[{id:'p1',name:'Probe Person',alias:'Probe',
  y:1980,mo:7,d:15,h:14,mi:20,tz:1,lat:52.52,lon:13.405,ort:'Berlin',
  wlat:52.52,wlon:13.405,wort:'Berlin',eigen:true,readings:[]}]}));});
await p.goto('file://ZIEL'); await p.waitForTimeout(1500);
const v=await p.evaluate(()=>({
  gruss:(document.getElementById('htgruss')||{}).textContent.trim(),
  satz:(document.getElementById('htsatz')||{}).textContent.trim().length,
  fakten:document.querySelectorAll('.ht-f').length,
  woche:document.querySelectorAll('.we').length,
  bereiche:document.querySelectorAll('.ht-b').length,
  bnamen:[...document.querySelectorAll('.ht-bn')].map(x=>x.textContent.trim()),
  btexte:[...document.querySelectorAll('.ht-bt')].filter(x=>x.textContent.trim().length>30).length,
  btext:[...document.querySelectorAll('.ht-bt')].map(x=>x.textContent.trim()),
  radfelder:document.querySelectorAll('.kr-haus').length,
  transit:document.querySelectorAll('.kr-tk').length,
  kap:document.querySelectorAll('.kb').length,
  schlecht:/undefined|NaN|\[object|Invalid/.test(document.body.innerText),
  breit:document.body.scrollWidth}));
/* Was gerade läuft: der neue Abschnitt vom 28.10. */
const lauf=await p.evaluate(()=>({
  karten:[...document.querySelectorAll('.lf')].length,
  haupt:document.querySelectorAll('.lf-haupt').length,
  saetze:[...document.querySelectorAll('.lf-was')].map(x=>x.textContent.trim()),
  wanderer:[...document.querySelectorAll('.lf-tech')]
    .map(x=>(x.textContent.trim().split(' ')[0]||'')),
  bahnen:document.querySelectorAll('.lf-bahn').length,
  marken:[...document.querySelectorAll('.lf-bahn')].map(b=>({
    jetzt:!!b.querySelector('.lf-jetzt'),
    exakt:!!b.querySelector('.lf-exakt')})),
  klein:[...document.querySelectorAll('.lf-tech')]
    .filter(x=>/\b(konjunktion|quadrat|trigon|sextil|opposition)\b/.test(x.textContent))
    .map(x=>x.textContent.slice(0,60))}));

/* Die Woche als Woche: Form, Band, Gruppen, Ausblick.
   Vorher war das eine Liste aus zehn Tagen. */
const wo=await p.evaluate(()=>{
  const tage=[...document.querySelectorAll('#htwoband .wt')];
  const grp=[...document.querySelectorAll('.wo-grp')];
  return {
    form:(document.getElementById('htwoform')||{}).textContent.trim(),
    tage:tage.length,
    heute:tage.filter(t=>t.classList.contains('ist')).length,
    heuteErst:tage.length?tage[0].classList.contains('ist'):false,
    klickbar:tage.filter(t=>t.tagName==='A').length,
    punkteOhneGruppe:tage.filter(t=>t.tagName==='A'&&!document.getElementById(
      t.getAttribute('href').slice(1))).length,
    gruppen:grp.length,
    koepfe:grp.map(g=>(g.querySelector('.wo-gh')||{}).textContent||''),
    lose:[...document.querySelectorAll('.we')].filter(w=>!w.closest('.wo-grp')).length,
    danach:(document.getElementById('htwodanach')||{}).textContent.trim()};
});

/* Der Aufmacher: Datum, Dopplung, Fensterangaben. */
const auf=await p.evaluate(()=>{
  const k=document.querySelector('.ht-auf-k');
  const titel=[...document.querySelectorAll('.we .tt')].map(x=>x.textContent.trim());
  return {
    da:!!k,
    wann:(document.querySelector('.ht-auf-w')||{}).textContent||'',
    titel:(document.querySelector('.ht-auf-t')||{}).textContent.trim()||'',
    text:(document.querySelector('.ht-auf-x')||{}).textContent.trim()||'',
    wochentitel:titel,
    volltexte:[...document.querySelectorAll('.we:not(.we-oben) .tx')]
      .map(x=>x.textContent.trim()),
    fenster:[...document.querySelectorAll('.ht-bbis-v')].map(x=>x.textContent.trim()),
    erstGross:!!document.querySelector('.ht-b-gross'),
    stellZu:!document.querySelector('#htstell').open,
    stellOben:(()=>{ const st=document.querySelector('#htstell'),
      be=document.querySelector('#htbereicheteil');
      return st&&be ? st.getBoundingClientRect().top < be.getBoundingClientRect().top : false; })()};
});

// „Wenig" muss die hinteren Bänder ausblenden
await p.evaluate(()=>document.querySelector('.kb[data-k="wenig"]').click());
await p.waitForTimeout(220);
const k=await p.evaluate(()=>({
  wocheWeg:document.getElementById('htwocheteil').hidden,
  bereicheDa:!document.getElementById('htbereicheteil').hidden,
  jetztDa:!document.getElementById('htjetzt').hidden}));
/* Auf Stufe 0 darf die Startseite keine Fachsprache zeigen. */
await p.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(0); }); await p.waitForTimeout(400);
const JARGON=['Konjunktion','Quadrat','Trigon','Sextil','Orbis','Transit','Aszendent',
 'r\u00fcckl\u00e4ufig','Whole','Radix','Planetenstunde','Planetenstunden',
 'Pluto','Neptun','Uranus','Saturn','Jupiter','Merkur'];
const j0=await p.evaluate(J=>{ const t=document.body.innerText;
  return J.filter(w=>new RegExp('(?<![A-Za-z\u00c4\u00d6\u00dc\u00e4\u00f6\u00fc\u00df])'+w+
    '(?![A-Za-z\u00c4\u00d6\u00dc\u00e4\u00f6\u00fc\u00df])').test(t)); }, JARGON);
const t0=await p.evaluate(()=>[...document.querySelectorAll('.ac-tech')]
  .filter(e=>e.offsetParent!==null).length);
await p.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(3); }); await p.waitForTimeout(400);
const t3=await p.evaluate(()=>[...document.querySelectorAll('.ac-tech')]
  .filter(e=>e.offsetParent!==null).length);
/* Die Bereichsauswahl: da, wirksam, und sie sagt, dass sie ausblendet. */
const wahl=await p.evaluate(()=>({
  knoepfe:document.querySelectorAll('#berwahl button[data-bw]').length,
  tipp:(document.querySelector('#berwahl .bw-tipp')||{}).textContent||''}));

await p.evaluate(()=>{ window.AC_WAHL.setzen(['liebe']); });
await p.waitForTimeout(800);
const einer=await p.evaluate(()=>({
  bereiche:document.querySelectorAll('.ht-b').length,
  namen:[...document.querySelectorAll('.ht-bn')].map(x=>x.textContent.trim()),
  tipp:(document.getElementById('htbwhin')||{}).innerText||'',
  gespeichert:JSON.parse(localStorage.getItem('ac_profile_v1')||'{}').bereiche||[]}));
await p.evaluate(()=>{ window.AC_WAHL.setzen([]); });
await p.waitForTimeout(800);
const zurueck=await p.evaluate(()=>document.querySelectorAll('.ht-b').length);
console.log(JSON.stringify({v,k,j0,t0,t3,lauf,wo,auf,wahl,einer,zurueck,fehler:[...new Set(f)]}));
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
    v, k = pr['v'], pr['k']
    for f_ in pr['fehler']:
        fehler.append('JS-Fehler: ' + f_)
    if not v['gruss']:       fehler.append('kein Gruß im Kopf')
    if v['satz'] < 80:       fehler.append('der Jetzt-Satz ist leer oder zu kurz')
    if v['fakten'] < 3:      fehler.append(f'nur {v["fakten"]} Fakten im Kopf')
    if v['woche'] < 2:       fehler.append(f'nur {v["woche"]} Einträge in der Woche')
    if v['bereiche'] < 3:    fehler.append(f'nur {v["bereiche"]} Bereiche im Kurzblick')
    if v['bereiche'] > 4:    fehler.append(f'{v["bereiche"]} Bereiche — der Kurzblick soll kurz sein')
    if len(set(v['bnamen'])) != len(v['bnamen']):
        fehler.append('ein Bereich steht zweimal im Kurzblick: ' + ', '.join(v['bnamen']))
    if len(set(v['btext'])) != len(v['btext']):
        fehler.append('derselbe Handgriff steht mehrfach im Kurzblick')
    if v['btexte'] < v['bereiche']:
        fehler.append('nicht jeder Bereich im Kurzblick sagt, was zu tun ist')
    if v['radfelder'] != 12: fehler.append('Rad unvollständig')
    if v['transit'] < 8:     fehler.append(f'nur {v["transit"]} Transitpunkte')
    if v['kap'] != 3:        fehler.append('Kapazitätsschalter fehlt')
    if v['schlecht']:        fehler.append('undefined/NaN/Invalid im Text')
    if v['breit'] > 390:     fehler.append(f'Überlauf auf {v["breit"]}px')
    if not k['wocheWeg']:
        fehler.append('„Wenig" blendet die Terminliste nicht aus')
    if not k['bereicheDa']:
        fehler.append('„Wenig" blendet die Bereiche aus — die sollen bleiben')
    if not k['jetztDa']:
        fehler.append('„Wenig" blendet auch das Jetzt-Band aus')
    if pr['j0']:
        fehler.append('Fachsprache auf Stufe 0 sichtbar: ' + ', '.join(pr['j0']))
    if pr['t0'] != 0:
        fehler.append(f"{pr['t0']} Mechanik-Elemente schon auf Stufe 0 sichtbar")
    if pr['t3'] < 3:
        fehler.append(f"auf Stufe 3 nur {pr['t3']} Mechanik-Elemente — zu wenig")
    import datetime as _dt
    _dtjahr = _dt.date.today().year
    # ── Die Woche ist eine Woche ───────────────────────────────
    # Bis zum 28.10. war dieser Abschnitt eine Liste aus zehn Tagen.
    # Eine Liste beantwortet „was kommt als Nächstes", nicht „wie ist
    # meine Woche". Diese Prüfungen halten die Form fest, damit sie
    # nicht beim nächsten Eingriff wieder zur Liste wird.
    wo = pr['wo']
    if wo['tage'] != 7:
        fehler.append(f"das Wochenband hat {wo['tage']} Tage statt sieben")
    if wo['heute'] != 1:
        fehler.append(f"{wo['heute']} Tage im Band sind als heute markiert")
    if not wo['heuteErst']:
        fehler.append('das Wochenband fängt nicht bei heute an')
    if wo['punkteOhneGruppe']:
        fehler.append(f"{wo['punkteOhneGruppe']} Tage im Band springen ins Leere")
    if wo['lose']:
        fehler.append(f"{wo['lose']} Termine stehen ohne Tagesüberschrift — "
                      'dann ist es wieder eine Liste')
    if len(wo['form']) < 60:
        fehler.append('die Woche sagt nicht, welche Form sie hat')
    if wo['gruppen'] and not any(k.startswith('Heute') or k[:2] in
                                 ('Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So')
                                 for k in wo['koepfe']):
        fehler.append('eine Tagesüberschrift nennt keinen Wochentag')
    if len(set(wo['koepfe'])) != len(wo['koepfe']):
        fehler.append('derselbe Tag hat zwei Überschriften')
    # Der Ausblick muss in der Reihenfolge stehen, in der er kommt.
    if wo['danach']:
        _tage = [int(m) for m in re.findall(r'am (\d+)\.', wo['danach'])]
        _mon = re.findall(r'am \d+\. (\w+)', wo['danach'])
        # Über den Jahreswechsel kommt Januar nach Dezember: der Monat
        # wird fortlaufend gezählt, ein Umbruch ist erlaubt.
        _lauf, _vor, _plus = [], -1, 0
        for _m, _t in zip(_mon, _tage):
            _i = _MONFOLGE.get(_m, 99)
            if _vor >= 0 and _i < _vor:
                _plus += 12
            _vor = _i
            _lauf.append((_i + _plus, _t))
        if _lauf != sorted(_lauf):
            fehler.append('der Ausblick steht nicht in der Reihenfolge, in der er kommt')

    lf = pr['lauf']
    if lf['karten'] < 3:
        fehler.append(f"nur {lf['karten']} Konstellationen unter Was gerade laeuft")
    if lf['haupt'] != 1:
        fehler.append(f"{lf['haupt']} hervorgehobene Konstellationen statt genau einer")
    # Der Befund vom 28.10.: drei Karten sagten wortwörtlich denselben Satz,
    # weil der Text am Wanderer hängt und Saturn dreimal vorkam.
    if len(set(lf['saetze'])) != len(lf['saetze']):
        doppelt = [t[:60] for t in lf['saetze']
                   if lf['saetze'].count(t) > 1]
        fehler.append('derselbe Satz steht mehrfach unter „Was gerade läuft": '
                      + repr(doppelt[0] if doppelt else ''))
    if len(set(lf['wanderer'])) != len(lf['wanderer']):
        fehler.append('derselbe Wanderer steht mehrfach: ' + str(lf['wanderer']))
    for m in lf['marken']:
        if not m['jetzt']:
            fehler.append('eine Bahn ohne Marke für den heutigen Stand')
    if lf['klein']:
        fehler.append('Aspektname kleingeschrieben: ' + repr(lf['klein'][0]))

    a = pr['auf']
    if not a['da']:
        fehler.append('kein Aufmacher im Kopf')
    if len(a['text']) < 40:
        fehler.append('der Aufmacher sagt nicht, worum es geht')
    # Der Aufmacher darf nicht zweimal ausführlich auf der Seite stehen
    gleich = [t2 for t2 in a['wochentitel'] if t2 == a['titel']]
    if len(gleich) > 1:
        fehler.append('der Aufmacher steht mehrfach in der Terminliste')
    if a['titel'] and a['text'] in a['volltexte']:
        fehler.append('der Aufmachertext steht wortgleich noch einmal in der Terminliste')
    # „Heute" muss zum Kalendertag passen, nicht zur Stundendifferenz
    if a['wann'].lower().startswith('heute'):
        if ', ' in a['wann']:
            uhrz = a['wann'].split(', ')[-1].strip()
            try:
                hh, mm = (int(x) for x in uhrz.split(':'))
                if (hh, mm) < (_dt.datetime.now().hour, _dt.datetime.now().minute):
                    fehler.append(f"Aufmacher sagt „heute {uhrz}“, das ist schon vorbei")
            except ValueError:
                pass
    # Fensterangaben: kein nacktes Datum ohne Jahr, keine Mondphase in ferner Zukunft
    for f2 in a['fenster']:
        # Jede Angabe sagt entweder eine Dauer oder einen nahen Tag — nie beides unklar
        if not any(w in f2 for w in ('noch', 'mindestens', 'morgen')):
            fehler.append('Fensterangabe ohne Dauer: ' + repr(f2))
        # Ein genanntes Datum trägt immer die Jahreszahl
        if 'bis ' in f2 and '20' not in f2:
            fehler.append('Datum ohne Jahreszahl: ' + repr(f2))
        # Jenseits eines Jahres ist ein tagesgenaues Datum falsche Genauigkeit
        import re as _re
        m = _re.search(r'bis \d+\. \w+ (20\d\d)', f2)
        if m and int(m.group(1)) > _dtjahr + 1:
            fehler.append('tagesgenaues Datum weit in der Zukunft: ' + repr(f2))
        if 'bis noch' in f2 or 'noch noch' in f2:
            fehler.append('verdoppeltes Wort in der Fensterangabe: ' + repr(f2))
    if a['fenster'] and not a['erstGross']:
        fehler.append('die Bereichsliste hat kein Gefälle — alle Zeilen gleich groß')
    if not a['stellZu']:
        fehler.append('die Einstellleiste steht offen statt zugeklappt')
    if a['stellOben']:
        fehler.append('die Einstellungen stehen über dem Inhalt')

    w, e = pr['wahl'], pr['einer']
    if w['knoepfe'] != 11:
        fehler.append(f"{w['knoepfe']} statt 11 Knöpfe in der Bereichsauswahl")
    if len(w['tipp']) < 40:
        fehler.append('die Auswahl erklärt sich nicht: ' + repr(w['tipp'][:60]))
    if e['bereiche'] != 1:
        fehler.append(f"ein gewählter Bereich ergibt {e['bereiche']} Zeilen "
                      'im Kurzblick — die Auswahl wirkt hier nicht')
    if e['namen'] != ['Liebe']:
        fehler.append('der Kurzblick zeigt den falschen Bereich: ' + str(e['namen']))
    # Geprüft wird die Aussage, nicht der Wortlaut: Es muss dastehen, dass
    # ausgeblendet wird UND dass dort trotzdem etwas los sein kann.
    _t = e['tipp'].lower()
    if 'ausgeblendet' not in _t or 'gerechnet' not in _t:
        fehler.append('die Startseite blendet Bereiche aus, ohne sichtbar zu sagen, '
                      'dass dort trotzdem etwas los sein kann: ' + repr(e['tipp'][:90]))
    if e['gespeichert'] != ['liebe']:
        fehler.append('die Auswahl liegt nicht in AC_P neben dem Profil: '
                      + str(e['gespeichert']))
    if pr['zurueck'] < 3:
        fehler.append(f"nach \"alle zehn\" nur {pr['zurueck']} Bereiche im Kurzblick")
    print('  Rauchprobe: %d Fakten, %d Wocheneinträge, %d Bereiche, '
          '%d Transitpunkte' % (v['fakten'], v['woche'], v['bereiche'], v['transit']))

print(f'index.html  {ziel.stat().st_size:,} Bytes  →  {ziel}')
for h in hinweise:
    print('  Hinweis: ' + h)
for f in fehler:
    print('  FEHLER: ' + f)
sys.exit(1 if fehler else 0)
