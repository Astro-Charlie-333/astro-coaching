#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Setzt start.html zusammen — die öffentliche Tür.

Mandy am 2.11.: „SCHWERKRAFT ist auf jeden Fall der Name."
Und am 1.11.: „meine Seite ist einfach zu cluddert … am Ende wäre
vielleicht doch eine neue Seite besser."

Das ist Schritt 1 aus ENTWURF-NEUE-SEITE.md: die Seite, die bisher
komplett fehlte, und der Grund, warum man niemandem einen Link
schicken konnte. Alles andere steht schon; es war nur nie jemandem
erklärt, der Mandy nicht kennt.

Die Prüfungen hier sind anders als auf den übrigen Seiten. Woanders
wird geprüft, ob die Rechnung stimmt. Hier wird geprüft, ob der Text
zwei Versprechen hält, die Mandy selbst gesetzt hat:

  1. „keine Dringlichkeitsthemen oder sowas Sales Person mäßiges nee
     nee. Das bin ich als Mensch nicht." (1.11.)
  2. Keine Preise — aber auch keine Nebelformel an ihrer Stelle.
     „Investition auf Anfrage" ist genau das, was dabei herauskommt,
     wenn man eine Zahl weglässt und die Lücke nicht füllt. (2.11.)

Ein Vorsatz, an den sich jemand erinnern muss, ist keine Automatik
(REGELN.md 6c). Deshalb stehen beide hier als Prüfung.
"""
import pathlib, re, sys, subprocess, json

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit = hier.parent / 'rituale'


def lies(p):
    return p.read_text(encoding='utf-8')


koerper = lies(hier / 'start-koerper.html')
daten = lies(hier / 'start-daten.js')
app = lies(hier / 'start-app.js')

kopf = """<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Schwerkraft &middot; Coaching mit Mandy Netta</title>
<meta name="description" content="Coaching in Berlin, bei dem das Geburtsbild als Landkarte dient und nicht als Befund. Keine Vorhersage, keine Therapie, erstes Gespr&auml;ch kostenlos.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
"""

html = (kopf + lies(rit / 'basis.css') + "\n" + lies(hier / 'start-stil.css')
        + '</style>\n</head><body>\n'
        + koerper + "\n<script>\n" + daten + "\n" + app
        + "\n</script>\n</body></html>\n")

ziel = wiki / 'start.html'
html = html.replace('<head>', '<head>' + (hier.parent / 'app' / 'app-kopf.html')
                    .read_text(encoding='utf-8'), 1)
ziel.write_text(html, encoding='utf-8')

fehler, hinweise = [], []

# ── Die IDs, die das Skript füllt, gibt es auch ──────────────
ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""\b(?:setz|html)\(['"]([A-Za-z0-9_-]+)['"]""", app))
fehlt = gesucht - ids
if fehlt:
    fehler.append('Skript füllt IDs, die es nicht gibt: ' + ', '.join(sorted(fehlt)))
leer = ids - gesucht - {'stmethode', 'stangebot', 'stabmachen', 'sttuer',
                        'stich', 'stnicht', 'stkontakt', 'stehrlich'}
if leer:
    hinweise.append('IDs ohne Inhalt: ' + ', '.join(sorted(leer)))

auf, zu = len(re.findall(r'<div\b', koerper)), len(re.findall(r'</div>', koerper))
if auf != zu:
    fehler.append(f'{auf} <div> gegen {zu} </div>')

# ── Alle Texte aus den Daten, als ein Block zum Prüfen ───────
# Geprüft wird der Text, nicht das Markup — deshalb steht der Inhalt in
# start-daten.js und nicht im Körper (REGELN.md 6e: eine Prüfung prüft
# die Form, die gemeint ist).
texte = re.findall(r"'((?:[^'\\]|\\.)*)'", daten)
# Die Sätze stehen über mehrere Zeichenketten verteilt ('… Deshalb ' +
# 'findest du …'). Beim Verbinden entstehen doppelte Abstände, und ein
# Satz, den man danach sucht, wird nicht gefunden. Also erst normieren,
# dann prüfen — sonst prüft man seinen eigenen Zeilenumbruch.
alles = re.sub(r'\s+', ' ', ' '.join(texte)).strip()
klein = alles.lower()

# ── 1 · Keine Verkäufersprache ───────────────────────────────
# Mandy am 1.11., wörtlich: „keine Dringlichkeitsthemen oder sowas
# Sales Person mäßiges nee nee. Das bin ich als Mensch nicht."
VERBOTEN = [
    'nur noch', 'letzte chance', 'sichere dir', 'sichere dein',
    'verpasse nicht', 'verpass nicht', 'exklusiv', 'limitiert',
    'begrenzte plätze', 'begrenzte plaetze', 'early bird', 'nur heute',
    'nur diese woche', 'jetzt zuschlagen', 'investition', 'auf anfrage',
    'warteliste', 'rabatt', 'einmalige gelegenheit', 'nicht verpassen',
    'schnell sein', 'bevor es zu spät ist', 'letzter aufruf',
    'nur für kurze zeit', 'game changer', 'lebensverändernd',
    'durchbruch', 'transformation deines lebens',
]
# Zwei Stellen sagen diese Wörter absichtlich — weil sie sie verneinen.
# Eine Verneinung ist nicht die Behauptung, und eine Prüfung, die das
# nicht unterscheidet, prüft wieder ein Textstück statt einer Aussage
# (REGELN.md 6e). Beide Sätze müssen da sein; nur dann sind sie vom
# Verbot ausgenommen, und nur sie.
VERNEINT = [
    'es gibt hier nichts, was nur diese woche gilt',
    'deshalb findest du auf dieser seite keinen countdown',
]
rest = klein
for v in VERNEINT:
    if v not in klein:
        fehler.append('der Satz, der die Dringlichkeit ausschließt, fehlt: '
                      + repr(v[:40]))
    rest = rest.replace(v, ' ')

getroffen = [w for w in VERBOTEN if w in rest]
if getroffen:
    fehler.append('Verkäufersprache im Text: ' + ', '.join(repr(w) for w in getroffen))

# ── 2 · Kein Preis, aber auch kein Nebel ─────────────────────
# Die Preise sind ausgeklammert (Mandy am 2.11.). Gefährlich ist nicht
# die fehlende Zahl, sondern was an ihre Stelle rutscht.
preise = re.findall(r'\d+\s*(?:€|EUR|Euro)', alles)
if preise:
    fehler.append('Preis auf der Seite, obwohl ausgeklammert: ' + ', '.join(preise))
# Statt der Zahl steht ein Ablauf. Der muss drei Dinge sagen:
if 'kostet nichts' not in klein:
    fehler.append('nirgends steht, dass das erste Gespräch nichts kostet')
if 'bevor irgendetwas anfängt' not in klein:
    fehler.append('nirgends steht, dass der Preis vor dem Anfang genannt wird')
if 'nein ist eine vollständige antwort' not in klein:
    fehler.append('nirgends steht, dass man ohne Begründung nein sagen kann')

# ── 3 · Durchgehend „du" ─────────────────────────────────────
# Beim ersten Entwurf stand in „Wer ich bin" ein „Sie" mitten im
# Du-Text. Das fällt beim Lesen kaum auf und wirkt trotzdem fremd.
sie = re.findall(r'(?<![.!?]\s)(?<!^)\b(?:Sie|Ihnen|Ihre[nmrs]?|Ihr)\b', alles)
if sie:
    fehler.append(f'{len(sie)}× Höflichkeitsform in einem Du-Text: '
                  + ', '.join(sorted(set(sie))[:4]))

# ── 4 · Jedes Angebot sagt, was drin ist und wo es aufhört ───
angebote = daten.count("art:'")
if angebote < 2:
    fehler.append(f'{angebote} Angebote — es sollen zwei sein')
if daten.count('dabei:[') != angebote:
    fehler.append('nicht jedes Angebot sagt, was dabei ist')
if daten.count("nicht:'") != angebote:
    fehler.append('nicht jedes Angebot sagt, wo es aufhört')

# ── 5 · Die Grenzen und die Krise stehen drauf ───────────────
# Dieselben Grenzen wie in der Begleitung, nur nach außen gedreht. Eine
# öffentliche Seite ohne sie wäre ein Versprechen ohne Boden.
for pflicht, was in [('keine therapie', 'keine Therapie'),
                     ('keine vorhersage', 'keine Vorhersage'),
                     ('wirksamkeitsnachweis', 'der Hinweis auf den fehlenden Nachweis'),
                     ('dein erleben recht', 'der Satz, dass das Erleben vorgeht')]:
    if pflicht not in klein:
        fehler.append('es fehlt: ' + was)
for nr in ['0800 111 0 111', '116 117', '112']:
    if nr not in alles:
        fehler.append('Krisennummer fehlt: ' + nr)

# ── 6 · Keine Mechanik ohne Erklärung ────────────────────────
# REGELN.md 2a: Ein Name ist keine Fachsprache — aber nur, wenn er auf
# derselben Karte erklärt wird. Diese Seite erklärt nichts, also kommt
# hier auch keine Mechanik vor.
MECHANIK = ['orbis', 'konjunktion', 'quadrat', 'trigon', 'sextil',
            'opposition', 'aszendent', 'rückläufig', 'ekliptik',
            'whole sign', 'transit', 'lunation', 'kazimi', 'dekanat']
mech = [w for w in MECHANIK if w in klein]
if mech:
    fehler.append('Mechanik auf der Tür, die nichts erklärt: ' + ', '.join(mech))

# ── 7 · Die Marke heißt Schwerkraft, und zwar richtig ────────
if 'Schwerkraft' not in koerper:
    fehler.append('die Marke steht nicht in der Leiste')
# Und keine Werkzeugleiste. Die fünf Links sind für Leute gemacht, die
# das Werkzeug schon benutzen; wer auf der Tür landet, kennt keinen
# davon. Nebenbei hielte eine helle, klebende Leiste über den dunklen
# Blöcken, und das sah aus wie ein Fehler.
if 'class="ac-nav"' in koerper:
    fehler.append('die Werkzeugleiste steht wieder auf der Tür — sie gehört '
                  'nicht dorthin (siehe Kommentar in start-koerper.html)')
# Kein Zusatz, der nach Handelsregister oder nach Größe klingt, die es
# nicht gibt (IHK: Geschäftsbezeichnung für Kleingewerbetreibende).
for z in ['GmbH', 'UG (', '& Co', 'Inh.', 'Institut', 'Akademie',
          'Zentrum', 'Gruppe e.V']:
    if z in alles or z in koerper:
        fehler.append('unzulässiger Firmenzusatz für ein Kleingewerbe: ' + z)
# Und der bürgerliche Name steht da, weil die Bezeichnung ihn nicht ersetzt.
if 'Mandy Netta' not in alles:
    fehler.append('der bürgerliche Name fehlt — eine Geschäftsbezeichnung '
                  'ersetzt ihn nicht')

# ── 8 · Nichts Privates ──────────────────────────────────────
# Dieselbe Sperre wie in allen bau-*.py: keine echten Geburtsdaten.
for muster, was in [(r'\b1987\b', 'Geburtsjahr'), (r'\b08:58\b', 'Geburtszeit'),
                    (r'\b2650\b', 'Einkommen'), (r'\b1180\b', 'Miete')]:
    if re.search(muster, daten) or re.search(muster, koerper):
        fehler.append('Privates in der öffentlichen Seite: ' + was)

# ── Die Rauchprobe ───────────────────────────────────────────
probe = r'''
const {chromium}=require('playwright');
(async()=>{
const f=[];
const b=await chromium.launch();
const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();
p.on('pageerror',e=>f.push('Skriptfehler: '+String(e.message).slice(0,130)));
await p.goto('file://ZIEL'); await p.waitForTimeout(600);

/* Der erste Bildschirm macht eine Aussage (ENTWURF 8.6). */
const kopf=await p.evaluate(()=>{
  const h=document.querySelector('.st-frage');
  const kn=[...document.querySelectorAll('.st-kn')];
  return {frage:h?h.textContent.trim():'',
    hoehe:h?Math.round(h.getBoundingClientRect().bottom):0,
    knoepfe:kn.length,
    knText:kn.map(k=>k.textContent.trim()),
    knOben:kn.length?Math.round(kn[0].getBoundingClientRect().bottom):0,
    wort:((document.querySelector('.st-wort')||{}).textContent||'').trim()};
});
if(!kopf.frage) f.push('der Kopf hat keine Frage');
if(kopf.frage && !kopf.frage.endsWith('?')) f.push('die Kopfzeile ist keine Frage: '+kopf.frage.slice(0,50));
if(kopf.hoehe>700) f.push('die Frage endet erst bei '+kopf.hoehe+'px — nicht auf dem ersten Bildschirm');
if(kopf.knoepfe!==2) f.push(kopf.knoepfe+' statt 2 Knoepfe im Kopf');
if(kopf.knOben>844) f.push('der erste Knopf liegt unter dem ersten Bildschirm');
if(!/Schwerkraft/.test(kopf.wort)) f.push('die Marke steht nicht im Kopf');

/* Alle Abschnitte sind gefuellt — kein leeres Geruest. */
const ab=await p.evaluate(()=>{
  const n=i=>{const e=document.getElementById(i);
    return e?e.innerText.trim().length:-1;};
  return {linsen:document.querySelectorAll('.st-li').length,
    angebote:document.querySelectorAll('.st-a').length,
    schritte:document.querySelectorAll('.st-schritte li').length,
    wege:document.querySelectorAll('.st-w').length,
    grenzen:document.querySelectorAll('.st-n1').length,
    krise:n('stkrise'), ich:n('stichtext'), ehrlich:n('stehr'),
    kontakt:n('stkbox'),
    mail:!!document.querySelector('.st-k-a'),
    luecke:!!document.querySelector('.st-luecke'),
    listen:[...document.querySelectorAll('.st-a-l')].map(u=>u.children.length)};
});
if(ab.linsen!==3) f.push(ab.linsen+' statt 3 Linsen');
if(ab.angebote!==2) f.push(ab.angebote+' statt 2 Angebote');
if(ab.schritte!==4) f.push(ab.schritte+' statt 4 Schritte im Ablauf');
if(ab.wege!==3) f.push(ab.wege+' statt 3 Wege hinein');
if(ab.grenzen<4) f.push('nur '+ab.grenzen+' Grenzen — zu wenige');
if(ab.krise<200) f.push('der Krisenabschnitt ist zu kurz');
if(ab.ich<120) f.push('„Wer ich bin" ist zu kurz');
if(ab.ehrlich<200) f.push('der Ehrlichkeitsabschnitt ist zu kurz');
ab.listen.forEach((n,i)=>{ if(n<3) f.push('Angebot '+(i+1)+' nennt nur '+n+' Dinge'); });
/* Der Kontakt ist entweder eine Adresse oder eine sichtbare Luecke —
   niemals still leer. */
if(!ab.mail && !ab.luecke) f.push('der Kontakt ist still leer');
if(ab.kontakt<30) f.push('der Kontaktkasten ist leer');

/* Auf 390 Pixeln laeuft nichts ueber. */
const ueber=await p.evaluate(()=>{
  const w=document.documentElement.clientWidth; const r=[];
  document.querySelectorAll('body *').forEach(e=>{
    const b=e.getBoundingClientRect();
    if(b.width>0 && (b.right>w+1.5||b.left<-1.5))
      r.push((e.className||e.tagName)+' '+Math.round(b.right));
  }); return r.slice(0,4);
});
if(ueber.length) f.push('laeuft auf 390px ueber: '+ueber.join(' | '));
if(await p.evaluate(()=>document.documentElement.scrollWidth>
   document.documentElement.clientWidth+1)) f.push('die Seite scrollt waagerecht');

/* Kein Countdown, kein Zaehler — auch nicht als Deko. */
const zaehler=await p.evaluate(()=>{
  const t=document.body.innerText;
  return /\b(verbleibend|noch \d+ (Tage|Stunden|Plätze)|countdown)\b/i.test(t)
    && !/keinen Countdown/.test(t);
});
if(zaehler) f.push('etwas zaehlt auf der Seite herunter');

/* Nichts verlangt eine Eingabe. Wer hier landet, hat noch nichts. */
const eingaben=await p.evaluate(()=>
  document.querySelectorAll('input,select,textarea').length);
if(eingaben) f.push(eingaben+' Eingabefelder auf der Tuer — hier wird nichts verlangt');

console.log(JSON.stringify({fehler:f, kopf:kopf, ab:ab}));
await b.close();})();
'''

pp = hier / '.probe-start.js'
pp.write_text(probe.replace('ZIEL', str(ziel)), encoding='utf-8')
try:
    r = subprocess.run(['node', str(pp)], capture_output=True, text=True, timeout=120)
    if r.returncode != 0:
        fehler.append('Rauchprobe gescheitert: ' + (r.stderr or '')[-300:])
    else:
        pr = json.loads(r.stdout.strip().splitlines()[-1])
        fehler.extend(pr['fehler'])
        if pr['ab']['luecke']:
            hinweise.append('die Mailadresse fehlt noch — die Seite zeigt an '
                            'der Stelle eine Lücke (S_KONTAKT.mail in '
                            'start-daten.js)')
except Exception as e:
    fehler.append('Rauchprobe nicht gelaufen: ' + str(e)[:200])
finally:
    pp.unlink(missing_ok=True)

for h in hinweise:
    print('      Hinweis: ' + h)
if fehler:
    for f in fehler:
        print('      FEHLER: ' + f)
    sys.exit(1)
print(f'      start.html: {len(html)//1024} KB')
