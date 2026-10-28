#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Setzt uebersicht.html neu zusammen."""
import pathlib, re, sys, subprocess, json

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit  = hier.parent / 'rituale'


def lies(p):
    return p.read_text(encoding='utf-8')


fehler, hinweise = [], []

kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Dein Bild &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<script src="kleine-punkte.js"></script>
<script src="aspekte-daten.js"></script>
<style>
"""

# ── Die Häufigkeiten abtasten ─────────────────────────────────
# „Gerechnet, nicht behauptet" (PRODUKT.md Abschnitt 3) gilt auch für
# den Satz „das haben etwa 9 von 100 Menschen". Deshalb wird die
# Tabelle hier aus erfundenen Geburtsbildern abgezählt und in die
# Seite gebacken, statt sie zu schätzen. Fester Startwert: zwei
# Bauläufe müssen dieselbe Tabelle ergeben, sonst ist es keine Zahl.
TASTE_N = 10000
MINDEST_SCHLUESSEL = {'sp2', 'sp3', 'sp4', 'kette_eigen', 'rueck0', 'rueck2'}

haeufig = None
try:
    tr = subprocess.run(['node', str(hier / '_taste-haeufig.js'),
                         str(hier.parent), str(TASTE_N)],
                        capture_output=True, text=True, timeout=300)
    if tr.returncode == 0:
        haeufig = json.loads(tr.stdout.strip().splitlines()[-1])
    else:
        fehler.append('Häufigkeitsabtastung lief nicht: '
                      + (tr.stderr or tr.stdout)[-300:])
except Exception as e:
    fehler.append('Häufigkeitsabtastung: ' + str(e)[:170])

if haeufig:
    if haeufig['n'] < TASTE_N * 0.95:
        fehler.append(f'nur {haeufig["n"]} von {TASTE_N} Bildern abgetastet')
    fehlend_s = MINDEST_SCHLUESSEL - set(haeufig['anteil'])
    if fehlend_s:
        fehler.append('die Abtastung kennt diese Befunde nicht: '
                      + ', '.join(sorted(fehlend_s))
                      + ' — dann steht neben ihnen keine Häufigkeit')
    for k, v in haeufig['anteil'].items():
        if not (0 < v <= 1):
            fehler.append(f'Häufigkeit {k} ist {v} — keine Zahl zwischen 0 und 1')
    summe = sum(v for k, v in haeufig['anteil'].items() if k.startswith('sp'))
    if abs(summe - 1) > 0.02:
        fehler.append(f'die Schwerpunkt-Häufigkeiten summieren sich auf {summe:.3f} '
                      'statt auf 1 — dann fehlt ein Fall')
tabelle = ('var I_HAEUFIG=' + json.dumps(haeufig or {'n': 0, 'anteil': {}},
                                        ensure_ascii=False) + ';\n')

html = (kopf + lies(rit / 'basis.css') + "\n" + lies(hier / 'kern-stil.css')
        + "\n" + lies(hier / 'ich-stil.css')
        + '</style><script src="niveau.js" defer></script>\n'
          '<script src="wortwahl.js" defer></script>\n</head><body>\n'
        + lies(hier / 'ich-koerper.html') + "\n<script>\n"
        + lies(rit / 'engine.js') + "\n"
        + lies(hier / 'kern-rad.js') + "\n"
        + lies(hier / 'ich-daten.js') + "\n"
        + tabelle
        + lies(hier / 'ich-rechner.js') + "\n"
        + lies(hier / 'ich-app.js')
        + "\n</script>\n</body></html>\n")

ziel = wiki / 'uebersicht.html'
# Die App-Ansicht: Manifest, Symbol, Zwischenspeicher. Die Zeilen dafür
# stehen in app/app-kopf.html — an einer Stelle für alle Seiten.
html = html.replace('<head>', '<head>' + (hier.parent / 'app' / 'app-kopf.html').read_text(encoding='utf-8'), 1)
ziel.write_text(html, encoding='utf-8')

koerper = lies(hier / 'ich-koerper.html')
app = lies(hier / 'ich-app.js')
daten = lies(hier / 'ich-daten.js')
rechner = lies(hier / 'ich-rechner.js')

# ── Die Texte des neuen Abschnitts ─────────────────────────────
# Fehlerklasse, gemessen am 23.10.: Die Seite sagte über jeden
# Menschen dasselbe. 86 von 100 Sätzen waren bei zwei völlig
# verschiedenen Geburtsbildern wortgleich, und was sich unterschied,
# waren Aufzählungen von Fachbegriffen. Geprüft wird deshalb unten
# in der Rauchprobe, wie viel von den Kernaussagen sich bei fünf
# erfundenen Bildern wirklich unterscheidet — hier nur, ob die
# Bausteine dafür vollständig sind.
def klammerblock(text, start):
    tiefe, i = 0, start
    while i < len(text):
        if text[i] == '{':
            tiefe += 1
        elif text[i] == '}':
            tiefe -= 1
            if tiefe == 0:
                return text[start:i + 1]
        i += 1
    return ''


def feld(block, name):
    m = re.search(r"\b" + name + r":\s*'((?:[^'\\]|\\.)*)'", block)
    return m.group(1) if m else None


lay_texte = []

AUF_PFLICHT = {
    'titel': 10, 'vor': 120, 'haeufigForm': 20, 'haeufigSelten': 30,
    'haeufigOhne': 60,
    'spViel': 150, 'spZwei': 150, 'spEins': 150, 'spTun': 50,
    'spTunEins': 50, 'spLeer': 120,
    'kette': 150, 'ketteEigen': 150, 'ketteTun': 50, 'ketteTunEigen': 30,
    'winkelHart': 120, 'winkelWeich': 120, 'winkelEng': 80,
    'winkelHartTun': 40, 'winkelWeichTun': 50,
    'rueckViel': 120, 'rueckWenig': 80, 'rueckKeine': 150,
    'rueckTunViel': 40, 'rueckTunKeine': 50,
    'grenzeTitel': 20, 'tunVor': 10,
}
m_auf = re.search(r"var I_AUF=\{", daten)
if not m_auf:
    fehler.append('I_AUF fehlt — der Abschnitt „Was an dir auffällt" hat keine Worte')
else:
    ablk = klammerblock(daten, m_auf.end() - 1)
    for name, mind in AUF_PFLICHT.items():
        v = feld(ablk, name)
        if not v:
            fehler.append(f'I_AUF.{name} fehlt')
            continue
        if len(v) < mind:
            fehler.append(f'I_AUF.{name} nur {len(v)} Zeichen — mindestens {mind}')
        lay_texte.append((f'I_AUF.{name}', v))
    # Die Lücken, ohne die ein Satz nichts über diesen Menschen sagt.
    for name, luecken in (('vor', ('{n}',)), ('haeufigForm', ('{p}',)),
                          ('spViel', ('{bereich}', '{zahl}')),
                          ('spZwei', ('{bereich}', '{zahl}')),
                          ('spLeer', ('{zahl}',)), ('kette', ('{nach}',)),
                          ('winkelHart', ('{a}', '{b}')),
                          ('winkelWeich', ('{a}', '{b}')),
                          ('rueckViel', ('{zahl}',)), ('rueckWenig', ('{zahl}',))):
        v = feld(ablk, name) or ''
        for l in luecken:
            if l not in v:
                fehler.append(f'I_AUF.{name} hat keine Lücke {l} — dann gilt der '
                              'Satz für jeden Menschen gleich, und genau das war '
                              'der Fehler')
    # Der ehrliche Teil gehört zu jeder rechnenden Ausgabe (REGELN.md 4).
    mg = re.search(r"grenzen:\s*\[(.*?)\n \]", daten, re.S)
    grenzen = re.findall(r"'((?:[^'\\]|\\.)*)'", mg.group(1)) if mg else []
    if len(grenzen) < 4:
        fehler.append(f'nur {len(grenzen)} Sätze im ehrlichen Teil — mindestens 4')
    for g in grenzen:
        if len(g) < 80:
            fehler.append(f'ein Satz im ehrlichen Teil ist zu dünn: "{g[:50]}"')
        lay_texte.append(('I_AUF.grenzen', g))
    if not any('Vorrang' in g for g in grenzen):
        fehler.append('der ehrliche Teil sagt nicht, dass das eigene Erleben '
                      'Vorrang hat')
    if not any('nicht überprüft' in g or 'nicht belegbar' in g or
               'Deutung' in g for g in grenzen):
        fehler.append('der ehrliche Teil sagt nicht, dass die Deutung nicht '
                      'überprüft ist')

# ── Der Satz, mit dem die Seite anfängt ───────────────────────
# Fehlerklasse vom 27.10.: Die Seite begann mit dem Rad, und die
# Dreierzeile darunter führte mit Zeichen und Gradzahl. Der Kopf
# führt jetzt mit einem Satz über diesen Menschen — und der
# gehört in dieselbe Laienprüfung wie alles andere, sonst steht
# im ersten Bildschirm wieder Fachsprache.
KOPF_PFLICHT = {
    'spViel': 90, 'spZwei': 80, 'spEins': 90,
    'kette': 90, 'ketteEigen': 90,
    'winkelHart': 90, 'winkelWeich': 90,
    'rueckViel': 60, 'rueckKeine': 90,
    'ohne': 60, 'nach': 40,
}
m_kopf = re.search(r"var I_KOPF=\{", daten)
if not m_kopf:
    fehler.append('I_KOPF fehlt — dann hat der Kopf keinen Satz über diesen Menschen')
else:
    kblk = klammerblock(daten, m_kopf.end() - 1)
    for name, mind in KOPF_PFLICHT.items():
        v = feld(kblk, name)
        if not v:
            fehler.append(f'I_KOPF.{name} fehlt')
            continue
        if len(v) < mind:
            fehler.append(f'I_KOPF.{name} nur {len(v)} Zeichen — mindestens {mind}')
        lay_texte.append((f'I_KOPF.{name}', v))
    for name, luecken in (('spViel', ('{bereich}',)), ('spZwei', ('{bereich}',)),
                          ('kette', ('{nach}',)),
                          ('winkelHart', ('{a}', '{b}')),
                          ('winkelWeich', ('{a}', '{b}'))):
        v = feld(kblk, name) or ''
        for l in luecken:
            if l not in v:
                fehler.append(f'I_KOPF.{name} hat keine Lücke {l} — dann steht im '
                              'ersten Bildschirm ein Satz, der für jeden gilt')

# Die Dreierzeile: erst das Leben, dann der Bereich. Was sie sagt,
# ist Laientext und wird so geprüft.
m_drei = re.search(r"var I_DREI=\[", daten)
if not m_drei:
    fehler.append('I_DREI fehlt — die Dreierzeile hätte keine Alltagsbedeutung')
else:
    dblk = daten[m_drei.end() - 1:daten.index(']', m_drei.end()) + 1]
    for name in ('rolle', 'was'):
        for v in re.findall(r"\b" + name + r":\s*'((?:[^'\\]|\\.)*)'", dblk):
            lay_texte.append((f'I_DREI.{name}', v))
    if len(re.findall(r"\bwas:", dblk)) != 3:
        fehler.append('die Dreierzeile hat nicht drei Alltagsbedeutungen')
for name in ('I_DREI_TITEL', 'I_DREI_SUB', 'I_DREI_BEREICH', 'I_DREI_WIRKUNG',
             'I_SPRUNG_TITEL', 'I_ASP_SUB'):
    mv = re.search(r"var " + name + r"\s*=\s*'((?:[^'\\]|\\.)*)'", daten)
    if not mv:
        fehler.append(f'{name} fehlt')
    else:
        lay_texte.append((name, mv.group(1)))

# Die Rollen: aus ihnen entstehen die Sätze über zwei Anlagen, die
# sich begegnen. Ohne sie stünden dort Planetennamen.
PLANETEN_ROLLE = ['Sonne', 'Mond', 'Merkur', 'Venus', 'Mars', 'Jupiter',
                  'Saturn', 'Uranus', 'Neptun', 'Pluto']

m_rolle = re.search(r"var I_ROLLE=\{", daten)
if not m_rolle:
    fehler.append('I_ROLLE fehlt — dann stünden im Winkelsatz Planetennamen')
else:
    rblk = klammerblock(daten, m_rolle.end() - 1)
    wills, folgen = [], []
    for pk in PLANETEN_ROLLE:
        m_pk = re.search(re.escape(pk) + r"\s*:\s*\{", rblk)
        if not m_pk:
            fehler.append(f'I_ROLLE.{pk} fehlt')
            continue
        pblk = klammerblock(rblk, m_pk.end() - 1)
        will, zuweit = feld(pblk, 'will'), feld(pblk, 'zuweit')

        # „will": eine Handlung, die man sich vorstellen kann. Ein
        # Relativsatz („wo dir die Umrisse verschwimmen") benennt eine
        # Stelle statt einer Sache — genau der Satz, über den Mandy am
        # 28.10. gestolpert ist.
        if not will:
            fehler.append(f'I_ROLLE.{pk}.will fehlt')
        else:
            if len(will) < 20:
                fehler.append(f'I_ROLLE.{pk}.will nur {len(will)} Zeichen')
            if re.match(r'^(wo|was|wie|wofür|womit|worauf|wem)\b', will):
                fehler.append(f'I_ROLLE.{pk}.will fängt mit „{will.split()[0]}" an — '
                              'das benennt eine Stelle, keine Handlung')
            wills.append(will)
            lay_texte.append((f'I_ROLLE.{pk}.will', will))

        # „zuweit": die Folge. Ein Hauptsatz mit „du" darin — ohne den
        # bleibt der Winkelsatz bei zwei Zuständen stehen.
        if not zuweit:
            fehler.append(f'I_ROLLE.{pk}.zuweit fehlt — ohne Folge sagt der '
                          'Winkelsatz nur, dass es zwei Dinge gibt')
        else:
            if len(zuweit) < 25:
                fehler.append(f'I_ROLLE.{pk}.zuweit nur {len(zuweit)} Zeichen')
            if not re.search(r'\bdu\b', zuweit):
                fehler.append(f'I_ROLLE.{pk}.zuweit ohne „du" — dann ist es '
                              'keine Folge für den Leser')
            folgen.append(zuweit)
            lay_texte.append((f'I_ROLLE.{pk}.zuweit', zuweit))

    for name, liste in (('will', wills), ('zuweit', folgen)):
        if len(set(liste)) != len(liste):
            fehler.append(f'zwei Anlagen haben dasselbe „{name}" — dann sagt '
                          'der Winkelsatz zweimal dasselbe')

# ── Ein gebauter Satz nennt eine Folge, nicht zwei Zustände ────
# Mandy am 28.10.: „Zwei Dinge in dir arbeiten gegeneinander: worauf
# du hinauswillst und wo dir die Umrisse verschwimmen. — was soll ein
# satz bitte bedeuten."
#
# Nichts. Zwei Halbsätze mit „und" dazwischen, und danach kommt keine
# Folge. REGELN.md Abschnitt 7 hält die Regel fest, hier wird sie
# geprüft: Jede Vorlage, die zwei Rollen einsetzt, braucht ein Wort,
# das eine Folge anschließt — und die harte Fassung die Folge selbst.
FOLGEWORT = ('also', 'deshalb', 'weshalb', 'weil', 'sodass', 'dadurch',
             'darum', 'daher')
for blockname, blk in (('I_AUF', ablk if m_auf else ''),
                       ('I_KOPF', kblk if m_kopf else '')):
    for vn in ('winkelHart', 'winkelWeich'):
        v = feld(blk, vn) if blk else ''
        if not v:
            continue
        if '{a}' not in v or '{b}' not in v:
            fehler.append(f'{blockname}.{vn} setzt nicht beide Rollen ein')
        if not any(w in v.lower() for w in FOLGEWORT):
            fehler.append(f'{blockname}.{vn} ohne Folgewort — der Satz stellt '
                          'zwei Zustände nebeneinander und hört auf')
        if vn == 'winkelHart' and '{az}' not in v:
            fehler.append('I_AUF/I_KOPF.winkelHart ohne {az} — dann steht da '
                          'nicht, was aus der Reibung folgt')

# ── Auf Stufe 0 kein Fachwort ──────────────────────────────────
# Dieselbe Liste wie in bau-bereiche.py. Sie gilt für alles, was ein
# Laie im neuen Abschnitt zu sehen bekommt.
VERBOTEN = (
    ['Sonne', 'Mond', 'Merkur', 'Venus', 'Mars', 'Jupiter', 'Saturn',
     'Uranus', 'Neptun', 'Pluto', 'Lilith', 'Chiron']
    + ['Haus', 'Häuser', 'Hauses']
    + ['Aspekt', 'Aspekte', 'Konjunktion', 'Opposition', 'Quadrat',
       'Trigon', 'Sextil', 'Orbis', 'Orben']
    + ['Transit', 'Transite', 'Aszendent', 'Deszendent', 'Herrscher',
       'Radix', 'Ekliptik', 'rückläufig', 'Rückläufig', 'winkelhaft']
    + ['Widder', 'Stier', 'Zwillinge', 'Krebs', 'Löwe', 'Jungfrau',
       'Waage', 'Skorpion', 'Schütze', 'Steinbock', 'Wassermann', 'Fische']
)
for wo, text in lay_texte:
    for v in VERBOTEN:
        if re.search(r'(?<![A-Za-zÄÖÜäöüß])' + re.escape(v) + r'(?![A-Za-zÄÖÜäöüß])', text):
            fehler.append(f'Fachwort "{v}" im Laientext {wo}: "{text[:60]}…"')
    if '°' in text:
        fehler.append(f'Gradzeichen im Laientext {wo}')
    if re.search(r'\d\.\d', text):
        fehler.append(f'Dezimalpunkt statt Komma in {wo}')

# ── Der Rechner formuliert nicht selbst ────────────────────────
# Dieselbe Fehlerklasse wie bei tief-bauer.js und monat-app.js: ein
# Satz im Rechenwerk wird dort nebenbei geändert und von keiner
# Prüfung gelesen.
ohne_komm = re.sub(r'/\*.*?\*/', ' ', rechner, flags=re.S)
ohne_komm = re.sub(r'^\s*//.*$', ' ', ohne_komm, flags=re.M)
for lit in re.findall(r"'((?:[^'\\\n]|\\.)*)'", ohne_komm):
    if len(re.findall(r'[A-Za-zÄÖÜäöüß]{3,}', lit)) >= 3:
        fehler.append(f'Satz in ich-rechner.js statt in ich-daten.js: "{lit[:60]}"')

# Keine echten Geburtsdaten, keine Großschreibungsfallen
for d_ in ('1987', '08:58'):
    if d_ in app + daten + rechner + koerper:
        fehler.append(f'echte Geburtsdaten im Quelltext: {d_}')
if 'toLowerCase' in app + daten + rechner:
    fehler.append('toLowerCase verändert deutsche Großschreibung — nicht benutzen')

ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""", app))
# h1..h12 und d1..d12 entstehen zur Laufzeit
gesucht = {g for g in gesucht if not re.fullmatch(r'[hd]\d+', g)}
if gesucht - ids:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(gesucht - ids)))

# REGELN.md Abschnitt 5 verlangt, dass die Tags aufgehen — und
# nennt vier Sorten. Geprüft wurde bisher nur div; seit der Körper
# Abschnitte und Klappen trägt, ist ein nicht geschlossenes
# section oder details genauso möglich und fällt im Browser
# nicht auf, weil er stillschweigend repariert.
for tag in ('div', 'section', 'nav', 'details'):
    auf = len(re.findall(r'<' + tag + r'\b', koerper))
    zu = len(re.findall(r'</' + tag + r'>', koerper))
    if auf != zu:
        fehler.append(f'{tag}-Bilanz: {auf} auf, {zu} zu')

# Jede Sprungmarke zeigt auf einen Abschnitt, den es gibt. Geprüft
# wird am Körper (hier) und am gerenderten Ergebnis (unten) — die
# Marken entstehen zur Laufzeit aus genau diesen Abschnitten.
for m_ab in re.finditer(r'<section\b([^>]*\bdata-sprung="[^"]*"[^>]*)>', koerper):
    if not re.search(r'\bid="[A-Za-z0-9_-]+"', m_ab.group(1)):
        fehler.append('ein Abschnitt mit Sprungmarke hat keine ID: '
                      + m_ab.group(1)[:60])

# Der Index darf nicht ins Leere zeigen …
vorhanden = {p.name for p in wiki.iterdir()}
verlinkt = set(re.findall(r"\{s:'([a-z0-9_.-]+\.html)'", daten))
for s in sorted(verlinkt):
    if s not in vorhanden:
        fehler.append('Index zeigt auf eine Seite, die es nicht gibt: ' + s)

# … und er soll nicht wieder veralten: jede Seite, die mit einem Profil rechnet,
# gehört hinein. Erkennungsmerkmal: sie lädt profil.js.
BEWUSST_DRAUSSEN = {
    'uebersicht.html',          # diese Seite selbst
    'menschen-lesen.html', 'niko-reading.html',
    'raeume.html',              # Sammelseite, verlinkt die Räume selbst
}
rechnet = set()
for p in sorted(wiki.glob('*.html')):
    s = lies(p)
    if 'profil.js' in s and 'AC_P' in s:
        rechnet.add(p.name)
fehlend = sorted(rechnet - verlinkt - BEWUSST_DRAUSSEN
                 - {n for n in rechnet if n.startswith('raum-')})
if fehlend:
    hinweise.append('rechnet mit Profil, steht aber nicht im Index: ' + ', '.join(fehlend))

# Rauchprobe — eine leere Seite wirft keinen Fehler
probe = hier / '_probe-ich.js'
probe.write_text(r"""
const {chromium}=(function(){const orte=[process.env.AC_PLAYWRIGHT,'playwright','/opt/npm-tools/node_modules/playwright'];for(const o of orte){if(!o)continue;try{return require(o);}catch(e){}}throw new Error('Playwright nicht gefunden. AC_PLAYWRIGHT setzen oder playwright installieren.');})();
(async()=>{
const b=await chromium.launch(); const f=[]; const notiz={};
const p=await (await b.newContext({viewport:{width:390,height:900}})).newPage();
p.on('pageerror',e=>f.push(String(e.message).slice(0,130)));
await p.addInitScript(()=>localStorage.setItem('ac_profile_v1',JSON.stringify(
 {v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:[{id:'p1',name:'Probe Person',alias:'Probe',
  y:1980,mo:7,d:15,h:14,mi:20,tz:1,lat:52.52,lon:13.405,ort:'Berlin',
  wlat:52.52,wlon:13.405,wort:'Berlin',eigen:true,readings:[]}]})));
await p.goto('file://ZIEL'); await p.waitForTimeout(900);
const vor=await p.evaluate(()=>({
  haeuser:document.querySelectorAll('.hz').length,
  radfelder:document.querySelectorAll('.kr-haus').length,
  transit:document.querySelectorAll('.kr-tk').length,
  aspekte:document.querySelectorAll('.ia').length,
  index:document.querySelectorAll('.ix').length,
  name:(document.getElementById('ichname')||{}).textContent.trim(),
  schlecht:/undefined|NaN|\[object/.test(document.body.innerText),
  breit:document.body.scrollWidth}));
// Haus im Rad anklicken: öffnet sich die passende Zeile?
await p.evaluate(()=>document.querySelector('.kr-haus[data-h="7"]').dispatchEvent(
  new MouseEvent('click',{bubbles:true})));
await p.waitForTimeout(260);
const nach=await p.evaluate(()=>({
  offen:document.querySelectorAll('.hdetail:not([hidden])').length,
  welches:(document.querySelector('.hz.ist')||{}).dataset,
  radIst:(document.querySelector('.kr-haus.ist')||{}).getAttribute('data-h'),
  text:(document.querySelector('.hdetail:not([hidden]) h4')||{}).textContent}));
/* ── Der erste Bildschirm und der Aufbau der Seite ───────────
   Die Fehlerklasse vom 27.10., in Messungen festgehalten: Die
   Seite begann mit dem Rad, war auf dem Telefon fünfzehn
   Bildschirme hoch und hatte keine Möglichkeit zu springen.

   Gemessen wird in einem eigenen, frisch geladenen Fenster. Die
   Probe oben hat geklickt und gescrollt — auf derselben Seite
   gemessen hieße „der erste Bildschirm" irgendeine Stelle in der
   Mitte, und eine aufgeklappte Klappe zählte als Höhe mit.
   Gemessen wird auf Stufe 0: dort gilt die Regel am strengsten. */
const cb=await b.newContext({viewport:{width:390,height:844}});
const q0=await cb.newPage();
q0.on('pageerror',e=>f.push('JS beim Aufbau: '+String(e.message).slice(0,110)));
await q0.addInitScript(()=>localStorage.setItem('ac_profile_v1',JSON.stringify(
 {v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:[{id:'p1',name:'Probe Person',alias:'Probe',
  y:1980,mo:7,d:15,h:14,mi:20,tz:1,lat:52.52,lon:13.405,ort:'Berlin',
  wlat:52.52,wlon:13.405,wort:'Berlin',eigen:true,readings:[]}]})));
await q0.goto('file://ZIEL'); await q0.waitForTimeout(1100);
await q0.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(0); });
await q0.waitForTimeout(400);
const bau=await q0.evaluate(()=>{
  /* Eine geschlossene Klappe nimmt ihrem Inhalt im Browser nicht
     den Kasten, nur die Darstellung: offsetParent und Höhe bleiben
     stehen, der Text ist leer. Wer nur danach fragt, hält jede
     zugeklappte Zeile für eine leere Zeile. */
  const zu=e=>!!e.closest('details:not([open])');
  const sicht=e=>{ const r=e.getBoundingClientRect();
    return r.height>0 && r.width>0 && e.offsetParent!==null && !zu(e); };
  /* Was ein Mensch im ersten Bildschirm wirklich liest. */
  const erst=[...document.querySelectorAll('.ich-wrap *')].filter(e=>{
    const r=e.getBoundingClientRect();
    return r.top<844 && r.bottom>0 && sicht(e) && !e.children.length
           && e.innerText && e.innerText.trim(); })
    .map(e=>e.innerText.trim()).join(' ⁞ ');
  const marken=[...document.querySelectorAll('#ichsprung a[href^="#"]')]
    .map(a=>({text:(a.textContent||'').trim(), ziel:a.getAttribute('href').slice(1),
              gibts:!!document.getElementById(a.getAttribute('href').slice(1)),
              sichtbar:sicht(a)}));
  /* Ein Kasten, der nichts sagt: entsteht, sobald ein Block nur
     noch aus wartender Mechanik besteht. Gezählt wird nur, was
     wirklich auf dem Schirm steht — was in einer geschlossenen
     Klappe liegt, ist nicht leer, sondern zu. */
  const leer=[...document.querySelectorAll('.ia, .au, .ix, .hz, .ich-drei > div')]
    .filter(e=>sicht(e) && !(e.innerText||'').trim())
    .map(e=>e.className).slice(0,6);
  const leiste=document.querySelector('.ac-leiste');
  const spr=document.getElementById('ichsprung');
  return {
    hoehe:document.documentElement.scrollHeight,
    erst, marken, leer,
    leit:(document.getElementById('ichleit')||{}).innerText||'',
    klappen:document.querySelectorAll('.ich-wrap details').length,
    klappenOffen:document.querySelectorAll('.ich-wrap details[open]').length,
    niv:!!document.getElementById('nivleiste'),
    nivKnoepfe:document.querySelectorAll('#nivleiste button').length,
    techGanz:document.querySelectorAll('.ich-wrap .ac-tech').length,
    techOffen:[...document.querySelectorAll('.ich-wrap .ac-tech')].filter(sicht).length,
    /* Zwei klebende Zeilen übereinander: die untere verschwindet
       hinter der oberen, sobald die obere umbricht. */
    leisteUnten:leiste?Math.round(leiste.getBoundingClientRect().bottom):0,
    sprungOben:spr?Math.round(spr.getBoundingClientRect().top):0 };
});
/* Zwei klebende Zeilen überlappen erst, wenn sie wirklich kleben.
   Am Seitenanfang steht die Sprungzeile an ihrem eigenen Platz
   weit unterhalb der Leiste — dort gemessen sähe jede falsche
   Einstellung richtig aus. Also erst scrollen, dann messen. */
await q0.evaluate(()=>window.scrollTo(0,1400));
await q0.waitForTimeout(350);
Object.assign(bau, await q0.evaluate(()=>{
  const l=document.querySelector('.ac-leiste'), s=document.getElementById('ichsprung');
  return {klebtLeisteUnten:l?Math.round(l.getBoundingClientRect().bottom):0,
          klebtSprungOben:s?Math.round(s.getBoundingClientRect().top):0,
          klebtSprungUnten:s?Math.round(s.getBoundingClientRect().bottom):0}; }));
await q0.evaluate(()=>window.scrollTo(0,0));
await q0.waitForTimeout(250);
/* Alles aufgeklappt darf die Seite nicht seitlich überlaufen —
   und auf Stufe 0 auch dann keinen Grad und kein Zeichen zeigen.
   Eine Klappe ist kein Versteck: Was darin liegt, liest jemand,
   der sie aufmacht, und für den gilt dieselbe Regel. Ein Feld
   wird mit aufgemacht, weil die Felder ihren Text erst beim
   Antippen bauen und sonst ungeprüft blieben. */
await q0.evaluate(()=>document.querySelectorAll('.ich-wrap details')
  .forEach(d=>{ d.open=true; }));
await q0.waitForTimeout(400);
await q0.evaluate(()=>{ const z=document.getElementById('h1'); if(z) z.click(); });
await q0.waitForTimeout(400);
bau.offenText=await q0.evaluate(()=>{
  const w=document.querySelector('.ich-wrap');
  if(!w) return '';
  /* Ohne das Regal: Dort stehen die Namen anderer Seiten, und
     eine Seite darf „Chiron und Lilith" heißen. Geprüft wird,
     was die Seite über diesen Menschen sagt — nicht, wie die
     Seiten heißen, auf die sie verweist. */
  const k=w.cloneNode(true);
  const ix=k.querySelector('#ichindex'); if(ix) ix.remove();
  /* Der Klon hängt nicht im Dokument, innerText fiele auf
     textContent zurück und nähme das Wartende mit. Also wird er
     unsichtbar eingehängt und dort gelesen. */
  k.style.position='absolute'; k.style.left='-9999px'; k.style.width='390px';
  document.body.appendChild(k);
  const txt=k.innerText||'';
  k.remove();
  return txt; });
bau.breitOffen=await q0.evaluate(()=>document.body.scrollWidth);
bau.leerOffen=await q0.evaluate(()=>
  [...document.querySelectorAll('.ia, .hz, .ix, .ich-drei > div')]
    .filter(e=>e.offsetParent!==null && e.getBoundingClientRect().height>0
               && !e.closest('details:not([open])')
               && !(e.innerText||'').trim()).length);
/* Stufe 2: die Mechanik muss wirklich erscheinen. Eine Wartemarke
   auf einer Seite ohne Stufenschalter wäre für immer unsichtbar. */
await q0.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(2); });
await q0.waitForTimeout(400);
const stufe2=await q0.evaluate(()=>({
  techOffen:[...document.querySelectorAll('.ich-wrap .ac-tech')]
    .filter(e=>e.offsetParent!==null
               && e.getBoundingClientRect().height>0
               && !e.closest('details:not([open])')).length }));
await cb.close();

/* Springt eine Marke wirklich — und macht sie die Klappe auf?
   Eigenes Fenster, damit der Klick nichts misst, was oben schon
   gemessen wurde. */
const cs=await b.newContext({viewport:{width:390,height:844}});
const q1=await cs.newPage();
q1.on('pageerror',e=>f.push('JS beim Springen: '+String(e.message).slice(0,110)));
await q1.addInitScript(()=>localStorage.setItem('ac_profile_v1',JSON.stringify(
 {v:1,eigen:'p1',aktiv:'p1',zeigeNamen:true,liste:[{id:'p1',name:'Probe Person',alias:'Probe',
  y:1980,mo:7,d:15,h:14,mi:20,tz:1,lat:52.52,lon:13.405,ort:'Berlin',
  wlat:52.52,wlon:13.405,wort:'Berlin',eigen:true,readings:[]}]})));
await q1.goto('file://ZIEL'); await q1.waitForTimeout(1100);
const sprung=await q1.evaluate(async()=>{
  const marken=[...document.querySelectorAll('#ichsprung a[href^="#"]')];
  const a=marken.find(x=>{
    const z=document.getElementById(x.getAttribute('href').slice(1));
    return z && z.querySelector('details'); }) || marken[marken.length-1];
  if(!a) return {ok:false, grund:'keine Marke'};
  const ziel=document.getElementById(a.getAttribute('href').slice(1));
  const vorher=window.scrollY;
  a.click();
  await new Promise(r=>setTimeout(r,800));
  const kasten=ziel.getBoundingClientRect();
  return {ok:true, bewegt:Math.abs(window.scrollY-vorher)>40,
          hatKlappe:!!ziel.querySelector('details'),
          klappeNachher:!!ziel.querySelector('details[open]'),
          obenImBild:Math.round(kasten.top),
          ziel:a.getAttribute('href')};
});
await cs.close();

/* ── Sagt die Seite über jeden dasselbe? ─────────────────────
   Die Prüfung, die den Fund vom 23.10. dauerhaft abstellt.
   Fünf erfundene Geburtsbilder, und von den Kernaussagen im
   Abschnitt „Was an dir auffällt" darf nur ein kleiner Teil
   wortgleich sein. Wer wieder einen Satz schreibt, der für
   jeden gilt, kommt damit nicht durch den Bau. */
const LEUTE=[
 {id:'ia',y:1958,mo:3, d:14,h:5, mi:20,lat:52.52,lon:13.405},
 {id:'ib',y:1991,mo:11,d:2, h:21,mi:45,lat:48.14,lon:11.58},
 {id:'ic',y:1943,mo:7, d:29,h:12,mi:0, lat:53.55,lon:9.99},
 {id:'id',y:2003,mo:1, d:8, h:3, mi:33,lat:50.11,lon:8.68},
 {id:'ie',y:1976,mo:10,d:19,h:17,mi:5, lat:48.21,lon:16.37}];
const JARGON=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus',
 'Neptun','Pluto','Haus','Häuser','Aspekt','Konjunktion','Opposition','Quadrat',
 'Trigon','Sextil','Orbis','rückläufig','Rückläufig','Herrscher','Aszendent',
 'Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion',
 'Schütze','Steinbock','Wassermann','Fische'];
const auf={};
for(const L of LEUTE){
  const c=await b.newContext({viewport:{width:390,height:1000}});
  const q=await c.newPage();
  q.on('pageerror',e=>f.push('JS bei '+L.id+': '+String(e.message).slice(0,110)));
  await q.addInitScript(l=>localStorage.setItem('ac_profile_v1',JSON.stringify(
    {v:1,eigen:l.id,aktiv:l.id,zeigeNamen:true,liste:[{id:l.id,name:'Probe '+l.id,
     alias:l.id,y:l.y,mo:l.mo,d:l.d,h:l.h,mi:l.mi,tz:1,lat:l.lat,lon:l.lon,ort:'Ort',
     wlat:l.lat,wlon:l.lon,wort:'Ort',eigen:true,readings:[]}]})), L);
  await q.goto('file://ZIEL'); await q.waitForTimeout(1100);
  await q.evaluate(()=>{ if(window.AC_NIV) AC_NIV.setzen(0); });
  await q.waitForTimeout(350);
  auf[L.id]=await q.evaluate(J=>{
    const box=document.getElementById('ichauf')||{innerText:''};
    const t=box.innerText||'';
    return {
      saetze:[...document.querySelectorAll('#ichauf .au-satz')].map(e=>e.innerText.trim()),
      bloecke:document.querySelectorAll('#ichauf .au').length,
      haeufig:[...document.querySelectorAll('#ichauf .au-zahl')].map(e=>e.innerText.trim()),
      /* Die Punkte müssen die Zahl wirklich zeigen: so viele helle
         Punkte wie die Zahl sagt, und immer genau hundert insgesamt.
         Sonst ist das Bild Dekoration und keine Angabe. */
      punkte:[...document.querySelectorAll('#ichauf .au-feld')].map(f=>({
        gesamt:f.querySelectorAll('circle').length,
        an:f.querySelectorAll('circle.an').length,
        sagt:(()=>{ const z=f.parentElement.querySelector('.au-z b');
          return z?z.textContent.trim():null; })()})),
      hauptKarten:document.querySelectorAll('#ichauf .au-haupt').length,
      radInKlappe:(()=>{ const r=document.getElementById('ichrad');
        return r?!!r.closest('details'):null; })(),
      radY:(()=>{ const r=document.getElementById('ichrad');
        return r?Math.round(r.getBoundingClientRect().top+window.scrollY):null; })(),
      tech:document.querySelectorAll('#ichauf .ac-tech').length,
      techOffen:[...document.querySelectorAll('#ichauf .ac-tech')]
                  .filter(e=>e.offsetParent!==null).length,
      jargon:J.filter(w=>new RegExp('(?<![A-Za-zÄÖÜäöüß])'+w+'(?![A-Za-zÄÖÜäöüß])').test(t)),
      luecke:(t.match(/\{\w+\}/)||[''])[0],
      schlecht:(t.match(/undefined|NaN|\[object|null/)||[''])[0],
      grenzen:document.querySelectorAll('#ichaufgrenze p').length,
      ueberschrift:(document.getElementById('ichaufh')||{}).innerText||'',
      leit:((document.getElementById('ichleit')||{}).innerText||'').trim(),
      vorzeile:(document.getElementById('ichaufvor')||{}).innerText||'',
      breit:document.body.scrollWidth };
  }, JARGON);
  await c.close();
}
notiz.auf=auf;
/* Wie viel sagt die Seite bei verschiedenen Menschen wörtlich gleich? */
const ids=Object.keys(auf); let paare=0, summe=0, schlimm=0;
for(let i=0;i<ids.length;i++) for(let j=i+1;j<ids.length;j++){
  const A=auf[ids[i]].saetze, B=auf[ids[j]].saetze;
  if(!A.length) continue;
  const g=A.filter(x=>B.includes(x)).length/A.length;
  paare++; summe+=g; if(g>schlimm) schlimm=g;
}
notiz.gleichMittel=paare?Math.round(100*summe/paare):100;
notiz.gleichSchlimmster=Math.round(100*schlimm);

console.log(JSON.stringify({vor,nach,bau,sprung,stufe2,notiz,fehler:[...new Set(f)]}));
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
    v, n = pr['vor'], pr['nach']
    for f_ in pr['fehler']:
        fehler.append('JS-Fehler: ' + f_)
    if v['haeuser'] != 12:      fehler.append(f'nur {v["haeuser"]} Hauszeilen')
    if v['radfelder'] != 12:    fehler.append(f'nur {v["radfelder"]} Radfelder')
    if v['transit'] < 8:        fehler.append(f'nur {v["transit"]} Transitpunkte im Ring')
    if v['aspekte'] < 5:        fehler.append(f'nur {v["aspekte"]} Aspekte')
    if v['index'] < 30:         fehler.append(f'nur {v["index"]} Indexeinträge')
    if not v['name']:           fehler.append('kein Name im Kopf')
    if v['schlecht']:           fehler.append('undefined/NaN im Text')
    if v['breit'] > 390:        fehler.append(f'Überlauf auf {v["breit"]}px')
    if n['offen'] != 1:         fehler.append('Klick im Rad öffnet nicht genau ein Haus')
    if n['radIst'] != '7':      fehler.append('Rad merkt sich das gewählte Haus nicht')
    if '7. Haus' not in (n['text'] or ''):
        fehler.append('Klick aufs 7. Hausfeld öffnet das falsche Haus: ' + str(n['text']))
    # ── Der erste Bildschirm, die Höhe, die Sprungmarken ──────
    # Der Fund vom 25.10.: „die Ich Seite ist noch immer nicht
    # spannend und gut genug." Dahinter steckten drei Fehler, und
    # jeder bekommt hier seine Prüfung, damit er nicht zurückkommt.
    #
    # 1 · Der erste Bildschirm führte mit dem Rad und mit Zeichen
    #     und Gradzahl — Maschinenraum vor Inhalt.
    # 2 · 12.496 Pixel auf dem Telefon, also fünfzehn Bildschirme
    #     am Stück, ohne eine Möglichkeit zu springen.
    # 3 · Der stärkste Abschnitt stand als vierter.
    #
    # Die Obergrenze ist nicht gerundet geraten: Sie ist die
    # Hälfte der gemessenen 12.496 Pixel, und genau das war die
    # Bedingung in AUFGABEN.md.
    HOECHSTENS_HOCH = 6248        # Pixel auf 390 Pixeln Breite, Stufe 0
    ERSTER_BILDSCHIRM = 844
    b = pr.get('bau') or {}
    if not b:
        fehler.append('der Aufbau der Seite wurde nicht gemessen')
    else:
        if b['hoehe'] > HOECHSTENS_HOCH:
            fehler.append(f'die Seite ist auf 390 Pixeln {b["hoehe"]} Pixel hoch '
                          f'(höchstens {HOECHSTENS_HOCH}) — das sind '
                          f'{b["hoehe"]/ERSTER_BILDSCHIRM:.0f} Bildschirme am Stück. '
                          'Was nachgeschlagen wird, gehört in eine Klappe')
        # Der erste Bildschirm: ein Satz über diesen Menschen, und
        # nichts, woran man ihn abliest.
        erst = b.get('erst') or ''
        if '°' in erst or '′' in erst:
            fehler.append('Gradzeichen im ersten Bildschirm: '
                          + repr(erst[:120]))
        for wort in VERBOTEN:
            if re.search(r'(?<![A-Za-zÄÖÜäöüß])' + re.escape(wort)
                         + r'(?![A-Za-zÄÖÜäöüß])', erst):
                fehler.append(f'Fachwort "{wort}" im ersten Bildschirm — dort steht, '
                              'was mit diesem Menschen los ist, nicht woran man '
                              'es abliest')
        leit = (b.get('leit') or '').strip()
        if len(leit) < 70:
            fehler.append(f'der Kopf führt nicht mit einem Satz über diesen '
                          f'Menschen (nur {len(leit)} Zeichen)')
        elif leit not in erst:
            fehler.append('der Satz über diesen Menschen steht nicht im ersten '
                          'Bildschirm')
        # Die Sprungmarken müssen zeigen, wohin sie zeigen.
        marken = b.get('marken') or []
        if len(marken) < 4:
            fehler.append(f'nur {len(marken)} Sprungmarken — ohne sie liest '
                          'niemand eine lange Seite zu Ende')
        for mk in marken:
            if not mk['gibts']:
                fehler.append(f'Sprungmarke „{mk["text"]}" zeigt auf #{mk["ziel"]} '
                              '— diesen Abschnitt gibt es nicht')
            if not mk['sichtbar']:
                fehler.append(f'Sprungmarke „{mk["text"]}" ist nicht sichtbar')
            if not mk['text']:
                fehler.append(f'eine Sprungmarke auf #{mk["ziel"]} hat keine Aufschrift')
        if len({mk['ziel'] for mk in marken}) != len(marken):
            fehler.append('zwei Sprungmarken zeigen auf denselben Abschnitt')
        # Klappen: ohne sie wäre die Höhe oben nicht zu halten, und
        # eine Klappe, die offen startet, ist keine.
        if b.get('klappen', 0) < 3:
            fehler.append(f'nur {b.get("klappen", 0)} Klappen — alles '
                          'Nachschlagbare gehört in eine')
        if b.get('klappenOffen'):
            fehler.append(f'{b["klappenOffen"]} Klappen stehen beim Laden offen '
                          '— dann ist die Seite wieder so hoch wie vorher')
        if b.get('leer'):
            fehler.append('sichtbare Kästen ohne ein Wort darin: '
                          + ', '.join(b['leer'])
                          + ' — ein Block, der nur aus wartender Mechanik '
                            'besteht, hinterlässt auf Stufe 0 ein Loch')
        if b.get('leerOffen'):
            fehler.append(f'{b["leerOffen"]} leere Kästen, wenn alle Klappen '
                          'offen sind')
        # Grad und Zeichen gehören auf Stufe 0 nirgends hin, auch
        # nicht in einer aufgeklappten Klappe. Gelesen wird der
        # sichtbare Text: Was in ac-tech wartet, steht dort nicht
        # drin, und genau das ist der Unterschied, den diese
        # Prüfung festhält.
        ot = b.get('offenText') or ''
        if not ot:
            fehler.append('der aufgeklappte Text wurde nicht gelesen')
        else:
            for zeichen in ('°', '′', '″'):
                if zeichen in ot:
                    stelle = ot[max(0, ot.index(zeichen) - 60):ot.index(zeichen) + 10]
                    fehler.append(f'Gradzeichen „{zeichen}" auf Stufe 0 sichtbar: '
                                  + repr(stelle.replace(chr(10), ' ')))
            ZEICHEN_UND_ANLAGEN = (
                ['Widder', 'Stier', 'Zwillinge', 'Krebs', 'Löwe', 'Jungfrau',
                 'Waage', 'Skorpion', 'Schütze', 'Steinbock', 'Wassermann', 'Fische']
                + ['Sonne', 'Mond', 'Merkur', 'Venus', 'Mars', 'Jupiter',
                   'Saturn', 'Uranus', 'Neptun', 'Pluto', 'Lilith', 'Chiron']
                + ['Aszendent', 'Herrscher', 'Orbis', 'rückläufig', 'Rückläufig',
                   'Konjunktion', 'Opposition', 'Quadrat', 'Trigon', 'Sextil'])
            for wort in ZEICHEN_UND_ANLAGEN:
                mw = re.search(r'(?<![A-Za-zÄÖÜäöüß])' + re.escape(wort)
                               + r'(?![A-Za-zÄÖÜäöüß])', ot)
                if mw:
                    stelle = ot[max(0, mw.start() - 50):mw.end() + 30]
                    fehler.append(f'„{wort}" auf Stufe 0 sichtbar — Zeichen und '
                                  'Anlagen warten in ac-tech: '
                                  + repr(stelle.replace(chr(10), ' ')))
        if b.get('breitOffen', 0) > 391:
            fehler.append(f'seitlicher Überlauf auf {b["breitOffen"]}px, wenn '
                          'alle Klappen offen sind')
        # Die Stufe muss auf der Seite einstellbar sein. Sonst
        # wartet die Mechanik für immer: Was in ac-tech liegt,
        # bekäme niemand je zu sehen, und die Seite behauptete
        # fünf Stufen, von denen sie nur eine zeigt.
        if not b.get('niv'):
            fehler.append('die Seite hat keinen Stufenschalter — dann ist alles, '
                          'was in ac-tech wartet, für immer unsichtbar')
        elif b.get('nivKnoepfe', 0) < 5:
            fehler.append(f'der Stufenschalter hat {b.get("nivKnoepfe")} Knöpfe '
                          'statt fünf')
        if not b.get('techGanz'):
            fehler.append('nichts wartet in ac-tech — dann steht die Mechanik '
                          'entweder offen da oder sie fehlt ganz')
        if b.get('techOffen'):
            fehler.append(f'{b["techOffen"]} Mechanikstellen sind schon auf '
                          'Stufe 0 sichtbar')
        s2 = (pr.get('stufe2') or {}).get('techOffen', 0)
        if s2 <= 0:
            fehler.append('auf Stufe 2 erscheint keine einzige Mechanikstelle — '
                          'dann ist das Warten ein Verstecken')
        # Zwei klebende Zeilen übereinander: die obere Leiste bricht
        # auf schmalen Schirmen um, und die Sprungzeile verschwände
        # dahinter.
        if b.get('klebtSprungOben', 0) < b.get('klebtLeisteUnten', 0) - 1:
            fehler.append(f'die Sprungzeile klebt bei {b["klebtSprungOben"]}px und '
                          f'liegt damit hinter der oberen Leiste (die reicht bis '
                          f'{b["klebtLeisteUnten"]}px) — die obere Leiste bricht '
                          'auf schmalen Schirmen um, eine feste Zahl im Stil '
                          'verdeckt die Sprungzeile dann')
        if b.get('klebtSprungUnten', 0) <= b.get('klebtSprungOben', 0):
            fehler.append('die Sprungzeile ist beim Scrollen nicht mehr da — '
                          'dann läuft sie auf dem Telefon nicht mit')
    sp = pr.get('sprung') or {}
    if not sp.get('ok'):
        fehler.append('keine Sprungmarke zum Anklicken gefunden')
    else:
        if not sp.get('bewegt'):
            fehler.append(f'ein Klick auf die Sprungmarke {sp.get("ziel")} '
                          'bewegt die Seite nicht')
        if sp.get('obenImBild') is not None and not (-5 <= sp['obenImBild'] <= 200):
            fehler.append(f'nach dem Sprung steht der Abschnitt {sp.get("ziel")} '
                          f'bei {sp["obenImBild"]}px statt oben im Bild')
        if sp.get('hatKlappe') and not sp.get('klappeNachher'):
            fehler.append(f'die Sprungmarke {sp.get("ziel")} führt in eine '
                          'geschlossene Klappe — man springt ins Leere')

    # ── Was an dir auffällt ───────────────────────────────────
    # Der Fund vom 23.10.: Die Seite sagte über jeden Menschen
    # dasselbe — 86 von 100 Sätzen waren bei zwei verschiedenen
    # Geburtsbildern wortgleich. Diese Schwelle ist die Prüfung,
    # die das künftig unmöglich macht.
    GLEICH_HOECHSTENS = 25        # Prozent wortgleicher Kernaussagen
    au = pr['notiz'].get('auf') or {}
    if len(au) < 5:
        fehler.append(f'nur {len(au)} von 5 Probebildern gezeichnet')
    for wer, a in au.items():
        if a['bloecke'] < 4:
            fehler.append(f'{wer}: nur {a["bloecke"]} Befunde in „Was an dir '
                          'auffällt" — es sollen vier sein')
        if len(a['saetze']) != a['bloecke']:
            fehler.append(f'{wer}: {len(a["saetze"])} Kernaussagen bei '
                          f'{a["bloecke"]} Befunden — jeder braucht genau eine')
        for s in a['saetze']:
            if len(s) < 80:
                fehler.append(f'{wer}: Kernaussage zu dünn: "{s[:50]}"')
        if len(a['haeufig']) != a['bloecke']:
            fehler.append(f'{wer}: {len(a["haeufig"])} Häufigkeitsangaben bei '
                          f'{a["bloecke"]} Befunden — jeder Befund sagt, wie '
                          'häufig er ist')

        for q in a.get('punkte', []):
            if q['gesamt'] != 100:
                fehler.append(f'{wer}: Punktfeld mit {q["gesamt"]} statt 100 Punkten')
            if q['sagt'] and q['sagt'].lstrip('<').isdigit():
                soll = int(q['sagt'].lstrip('<'))
                if q['sagt'].startswith('<'):
                    if q['an'] != 1:
                        fehler.append(f'{wer}: "<1" zeigt {q["an"]} helle Punkte statt einem')
                elif q['an'] != soll:
                    fehler.append(f'{wer}: Punktfeld zeigt {q["an"]} helle Punkte, '
                                  f'die Zahl daneben sagt {soll}')
        if a.get('hauptKarten') != 1:
            fehler.append(f'{wer}: {a.get("hauptKarten")} hervorgehobene Karten statt '
                          'genau einer — ohne Gefälle ist es wieder eine Liste')
        if a.get('radInKlappe'):
            fehler.append(f'{wer}: das Chart steckt in einer Klappe. Auf einer '
                          'Astrologieseite ist es das Bild des Menschen und gehört sichtbar')
        if a.get('radY') is not None and a['radY'] > 900:
            fehler.append(f'{wer}: das Chart steht erst bei {a["radY"]} Pixeln — zu weit unten')
        if a['tech'] != a['bloecke']:
            fehler.append(f'{wer}: {a["tech"]} Mechanikzeilen bei {a["bloecke"]} '
                          'Befunden')
        if a['techOffen']:
            fehler.append(f'{wer}: {a["techOffen"]} Mechanikzeilen schon auf '
                          'Stufe 0 sichtbar')
        if a['jargon']:
            fehler.append(f'{wer}: Fachsprache auf Stufe 0 sichtbar: '
                          + ', '.join(a['jargon']))
        if a['luecke']:
            fehler.append(f'{wer}: offene Lücke im Text: {a["luecke"]}')
        if a['schlecht']:
            fehler.append(f'{wer}: schlechter Text: {a["schlecht"]!r}')
        if a['grenzen'] < 4:
            fehler.append(f'{wer}: nur {a["grenzen"]} Sätze im ehrlichen Teil')
        if a.get('vorzeile') and not re.search(r'\d{1,3}\.\d{3}', a['vorzeile']):
            fehler.append(f'{wer}: die Zahl der abgetasteten Bilder steht ohne '
                          'deutsche Tausendertrennung da: ' + repr(a['vorzeile'][:70]))
        if len(a['ueberschrift']) < 10:
            fehler.append(f'{wer}: der Abschnitt hat keine Überschrift')
        if a['breit'] > 391:
            fehler.append(f'{wer}: seitlicher Überlauf auf {a["breit"]}px')
    # Derselbe Anspruch wie für die Kernaussagen gilt für den
    # Satz im Kopf: Er ist das Erste, was jemand liest. Stünde
    # dort bei fünf verschiedenen Bildern dreimal dasselbe, wäre
    # er wieder ein Satz, der für jeden gilt.
    leitsaetze = [a.get('leit', '') for a in au.values() if a.get('leit')]
    if len(leitsaetze) < len(au):
        fehler.append('bei mindestens einem Probebild fehlt der Satz im Kopf')
    if leitsaetze and len(set(leitsaetze)) < 3:
        fehler.append(f'fünf verschiedene Geburtsbilder bekommen nur '
                      f'{len(set(leitsaetze))} verschiedene Sätze im Kopf — '
                      'der erste Satz der Seite soll von diesem Menschen handeln')
    mittel = pr['notiz'].get('gleichMittel', 100)
    schlimm = pr['notiz'].get('gleichSchlimmster', 100)
    if mittel > GLEICH_HOECHSTENS:
        fehler.append(f'die Seite sagt über verschiedene Menschen im Schnitt '
                      f'{mittel}% wortgleiche Kernaussagen (höchstens '
                      f'{GLEICH_HOECHSTENS}% sind erlaubt) — ein Satz, der für '
                      'jeden gilt, holt niemanden ab')
    if schlimm > 60:
        fehler.append(f'zwei Probebilder bekommen {schlimm}% wortgleiche '
                      'Kernaussagen — zu viel für zwei verschiedene Menschen')
    print(f'  Was an dir auffällt: vier Befunde je Bild, '
          f'{mittel}% wortgleiche Kernaussagen im Schnitt '
          f'(schlimmstes Paar {schlimm}%), Stufe 0 ohne Fachwort')

    print('  Rauchprobe: 12 Häuser, %d Transitpunkte, %d Aspekte, %d Indexeinträge, '
          'Radklick öffnet „%s"' % (v['transit'], v['aspekte'], v['index'], n['text']))
    if pr.get('bau'):
        b = pr['bau']
        print('  Aufbau auf 390px: %d Pixel hoch (%.1f Bildschirme), %d Sprungmarken, '
              '%d Klappen, %d Wartemarken'
              % (b['hoehe'], b['hoehe'] / 844, len(b.get('marken') or []),
                 b.get('klappen', 0), b.get('techGanz', 0)))

print(f'uebersicht.html  {ziel.stat().st_size:,} Bytes  →  {ziel}')
for h in hinweise:
    print('  Hinweis: ' + h)
for f in fehler:
    print('  FEHLER: ' + f)
sys.exit(1 if fehler else 0)
