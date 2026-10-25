#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut jede Seite neu und prüft sie. Ein Kommando, eine Antwort.

    python3 pruefe-alles.py            baut alles, prüft alles
    python3 pruefe-alles.py --schnell  ohne die Rauchproben im Browser

Rückgabewert 0 heißt: alles steht. Alles andere heißt: nicht ausliefern.
Dieses Skript ist die Sicherung, auf der die tägliche Automatik aufsitzt.
"""
import pathlib, subprocess, sys, time, re, os

hier = pathlib.Path(__file__).parent.resolve()
schnell = '--schnell' in sys.argv

# Zwei Anordnungen, dasselbe Skript:
#   Arbeitsbaum — Quellordner und wiki/ liegen nebeneinander.
#   Repo        — die Quellen liegen in quelltext/, die fertigen Seiten
#                 oben, weil GitHub Pages sie dort erwartet.
# Im Repo fehlt den bau-*.py ihr Ziel. Statt jedes Skript anzufassen,
# wird quelltext/wiki auf die Repo-Wurzel gelegt — dann schreiben sie
# genau dorthin, wo die Seiten ohnehin liegen müssen.
wiki = hier / 'wiki'
if not wiki.exists() and (hier.parent / 'index.html').exists():
    try:
        os.symlink(hier.parent, wiki, target_is_directory=True)
        print(f'  (quelltext/wiki zeigt jetzt auf {hier.parent})')
    except OSError as e:
        print(f'  Konnte quelltext/wiki nicht anlegen: {e}')
        sys.exit(1)
if not wiki.exists():
    print(f'  Finde die Seiten nicht. Erwartet: {wiki}')
    sys.exit(1)

# Reihenfolge ist wichtig: die Bereiche müssen vor der Startseite
# gebaut sein, weil die Startseite deren Rechner mitnimmt.
BAUTEN = [
    ('rituale/bau.py',        'Rituale'),
    ('rituale/bau-zauber.py', 'Zauber'),
    ('niveau/bau-reading.py', 'Reading'),
    ('karte/bau-karte.py',    'Karte'),
    ('karte/bau-tiefe.py',    'Tiefe'),
    ('bez/bau-bez.py',        'Beziehung'),
    ('oph/bau-oph.py',        'Ophiuchus'),
    ('geist/bau-geist.py',    'Geist'),
    ('dossier/bau-dossier.py','Dossier'),
    ('analyse/bau-analyse.py','Analyse'),
    ('zahlen/bau-zahlen.py',  'Zahlen'),
    ('zeit/bau-zeit.py',      'Zeiten'),
    ('bereiche/bau-bereiche.py', 'Bereiche'),
    ('monat/bau-monat.py',     'Monat'),
    ('ereignis/bau-ereignis.py', 'Ereignisse'),
    ('kern/bau-ich.py',       'Ich'),
    ('kern/bau-heute.py',     'Heute'),
]

print('Astro-Charlie · alles bauen und prüfen')
print('=' * 62)

fehlgeschlagen = []
t0 = time.time()
# Woran sich später erkennen lässt, welche Seite aus dem Bausystem
# kommt: Vor dem Bauen wird die Änderungszeit aller fertigen Seiten
# zurückgestellt. Was ein bau-*.py danach schreibt, ist frisch; was
# von Hand neben dem System liegt, bleibt alt. Nur die Zeitangabe
# wird angefasst, kein Inhalt.
gebaut_ab = t0 - 1.0
zeitstempel_gesetzt = True
for s in (hier / 'wiki').glob('*.html'):
    try:
        os.utime(s, (gebaut_ab - 10, gebaut_ab - 10))
    except OSError:
        zeitstempel_gesetzt = False

for pfad, name in BAUTEN:
    p = hier / pfad
    if not p.exists():
        print(f'  {name:<12} ÜBERSPRUNGEN (fehlt: {pfad})')
        continue
    t1 = time.time()
    r = subprocess.run([sys.executable, str(p)], capture_output=True,
                       text=True, cwd=str(hier))
    dauer = time.time() - t1
    if r.returncode == 0:
        print(f'  {name:<12} ok      {dauer:5.1f}s')
    else:
        print(f'  {name:<12} FEHLER  {dauer:5.1f}s')
        for zeile in (r.stdout + r.stderr).strip().splitlines():
            if zeile.strip().startswith('✗') or 'FEHLER' in zeile:
                print(f'      {zeile.strip()}')
        fehlgeschlagen.append(name)

print('-' * 62)

# ── Querprüfungen über alle fertigen Seiten ───────────────────
seiten = sorted(wiki.glob('*.html'))
print(f'  {len(seiten)} Seiten in wiki/')

# 1 · tote Verweise
vorhanden = {s.name for s in seiten}
tot = {}
for s in seiten:
    t = s.read_text(encoding='utf-8', errors='replace')
    for href in set(re.findall(r'href="([a-z0-9._-]+\.html)"', t)):
        if href not in vorhanden:
            tot.setdefault(href, []).append(s.name)
if tot:
    print(f'  {len(tot)} tote Verweise:')
    for z, von in sorted(tot.items())[:8]:
        print(f'      {z}  ←  {", ".join(von[:3])}')
    fehlgeschlagen.append('tote Verweise')
else:
    print('  keine toten Verweise')

# 2 · einheitliche Navigation
navs = {}
for s in seiten:
    t = s.read_text(encoding='utf-8', errors='replace')
    m = re.search(r'<nav class="ac-nav">(.*?)</nav>', t, re.S)
    if m:
        eintraege = tuple(re.findall(r'href="([a-z0-9._-]+\.html)"', m.group(1)))
        navs.setdefault(eintraege, []).append(s.name)
if len(navs) > 1:
    print(f'  {len(navs)} verschiedene Navigationen:')
    for eintraege, wo in sorted(navs.items(), key=lambda x: -len(x[1])):
        print(f'      {len(wo):3}× {" ".join(eintraege)}')
    # Keine harte Fehlermeldung: alte Bibliotheksseiten haben eigene Navigationen.
else:
    print('  Navigation überall gleich')

# 3 · nichts Privates ist ausgeliefert
#     Keine nackten Zahlen prüfen: "1180" ist auch eine CSS-Breite, und ein
#     Wächter, der täglich grundlos anschlägt, wird nach einer Woche ignoriert.
#     Geprüft wird auf Dinge, die nur in privaten Dateien vorkommen können.
PRIVAT = ['saat.json', 'orga/', 'strategie/', 'schuss.js',
          'Nettoeinkommen', 'Vertragsnummer', 'Vermieter']
durchgesickert = []
for s in seiten:
    if s.name in ('niko-reading.html',):      # liegt bewusst nur lokal
        continue
    t = s.read_text(encoding='utf-8', errors='replace')
    for g in PRIVAT:
        if g in t:
            durchgesickert.append(f'{s.name}: {g}')
    # Mandys Geburtsdaten dürfen nirgends fest im Quelltext stehen
    if re.search(r'\b1987\b', t) and re.search(r'08:58|8:58', t):
        durchgesickert.append(f'{s.name}: Geburtsdaten fest verdrahtet')
if durchgesickert:
    print('  PRIVATES IN AUSGELIEFERTEN SEITEN:')
    for d in durchgesickert[:6]:
        print(f'      {d}')
    fehlgeschlagen.append('Privates durchgesickert')
else:
    print('  nichts Privates in wiki/')

# 4 · keine festverdrahteten Pfade in den Quellen
#     Fehlerklasse: ein Skript, das den Ort der Arbeitskopie kennt, läuft
#     nur auf dem Rechner, auf dem es geschrieben wurde. Verschiebt jemand
#     die Kopie oder klont sie neu, bricht die Prüfung — und sie bricht an
#     einer Stelle, die nichts mit der Änderung zu tun hat.
#     Erlaubt bleiben Orte, die zur Maschine und nicht zur Arbeitskopie
#     gehören: /opt (das mitgelieferte Werkzeug), /tmp, /usr.
#     Die Namen werden zusammengesetzt, damit diese Prüfung nicht sich
#     selbst meldet.
#     Nur die Orte, an denen eine Arbeitskopie wirklich liegt. Nach
#     Laufwerksbuchstaben wird nicht gesucht: "r:\s" ist in einem
#     Python-Muster alltäglich, und ein Wächter, der grundlos
#     anschlägt, wird nach einer Woche ignoriert.
HEIMATORTE = ['home', 'Users', 'root', 'mnt', 'media', 'var/folders']
HEIMATPFAD = re.compile('|'.join('/' + o + '/' for o in HEIMATORTE))
ENDUNGEN = ('.py', '.js', '.html', '.css')
verdrahtet = []
for q in sorted(hier.rglob('*')):
    if q.is_symlink() or not q.is_file() or q.suffix not in ENDUNGEN:
        continue
    if wiki in q.parents or q.name.startswith('_probe-'):
        continue
    for nr, zeile in enumerate(q.read_text(encoding='utf-8', errors='replace').splitlines(), 1):
        m = HEIMATPFAD.search(zeile)
        if m:
            verdrahtet.append(f'{q.relative_to(hier)}:{nr}  {m.group(0)}…')
if verdrahtet:
    print('  FESTVERDRAHTETE PFADE IM QUELLTEXT:')
    for d in verdrahtet[:8]:
        print(f'      {d}')
    print('      (ein Pfad zur Arbeitskopie gehört nicht in den Quelltext —')
    print('       stattdessen __dirname bzw. pathlib.Path(__file__).parent)')
    fehlgeschlagen.append('festverdrahtete Pfade')
else:
    print('  keine festverdrahteten Pfade')

# 5 · jede ausgelieferte Seite hat einen Ursprung
#     Fehlerklasse: eine Seite, die neben dem Bausystem von Hand
#     gepflegt wird. Genau so ist der Monatsbericht dünn geblieben —
#     kein Bauskript erzeugte ihn, also verbesserte ihn auch niemand,
#     und er trug eine eigene Himmelsrechnung mit sich herum.
#     Ab jetzt muss jede Seite in wiki/ entweder gerade neu gebaut
#     worden sein oder unten als bekannte Handarbeit stehen. Eine
#     neue Seite von Hand kommt nicht mehr unbemerkt herein.
#     Die Liste soll schrumpfen: wandert eine Seite ins Bausystem,
#     wird ihr Eintrag gestrichen — das erzwingt die zweite Prüfung
#     darunter von selbst.
HANDARBEIT = {
    'achsen.html', 'angebote-struktur.html', 'ankommen.html',
    'aspekt-muster.html', 'aspekte-lesen.html', 'aspekte.html',
    'asteroiden.html', 'astrokartographie.html', 'audhs-verstehen.html',
    'bausteine.html', 'bazi.html', 'berufe.html', 'briefing.html',
    'chart-lesen.html', 'chart-rechner.html', 'coaching-verbinden.html',
    'coaching.html', 'dating-muster.html', 'diagnose-weg.html',
    'element-mix.html', 'erinnerung.html', 'faden.html',
    'finsternisse.html', 'fragen-schatzkiste.html', 'glossar.html',
    'grade.html', 'grenzen.html', 'grundlagen.html',
    'haeuser-lebensbuehnen.html', 'haeuser.html', 'haeusersysteme.html',
    'haltung-ethik.html', 'haltung.html', 'haus-achsen.html',
    'herrscher.html', 'kleine-punkte.html', 'klientinnen-fragen.html',
    'konzept-plattform.html', 'learning-seite.html',
    'lebens-kompass.html', 'leitfaden-fundament.html',
    'leitfaden-mars.html', 'leitfaden-merkur.html',
    'leitfaden-mond.html', 'leitfaden.html', 'lilith-arbeit.html',
    'linien-lesen.html', 'lunationen.html', 'mein-chart.html',
    'menschen-lesen.html', 'methoden.html', 'mondknoten-coaching.html',
    'mondknoten.html', 'mondphasen-rhythmus.html', 'mondzyklen.html',
    'nd-leitfaden.html', 'neurodivergente-astrologie.html',
    'neurodivergenz-vertiefung.html', 'orbis-gewichtung.html',
    'organizer.html', 'planet-jupiter.html', 'planet-mars.html',
    'planet-merkur.html', 'planet-mond.html', 'planet-saturn.html',
    'planet-sonne.html', 'planet-venus.html',
    'planeten-in-zeichen.html', 'planeten.html', 'planetenzyklen.html',
    'profektionen.html', 'profil-ansicht.html', 'profile.html',
    'quiz.html', 'raeume.html', 'raum-alltag.html',
    'raum-anders-verdrahtet.html', 'raum-berufung.html',
    'raum-herkunft.html', 'raum-koerper.html', 'raum-naehe.html',
    'raum-selbstwert.html', 'raum-sicherheit.html',
    'raum-unerlaubte.html', 'raum-versorgung.html',
    'raum-wunder-punkt.html', 'raum-zugehoerigkeit.html',
    'reading-ablauf.html', 'reading-gespraech.html', 'retrograde.html',
    'ruhe-schlaf.html', 'sekte.html', 'siderisch.html',
    'solar-return-light.html', 'solar-return-vertiefung.html',
    'spannungskarte.html', 'synastrie-vertiefung.html',
    'synastrie.html', 'timing.html', 'tool.html',
    'ueber-mich-vorlage.html', 'uebungscharts.html', 'vorschau.html',
    'weg.html', 'werkzeuge.html', 'wissen.html', 'zeichen.html',
    'zeitqualitaet.html',
}
frisch    = {s.name for s in seiten if s.stat().st_mtime > gebaut_ab}
herrenlos = sorted({s.name for s in seiten} - frisch - HANDARBEIT)
veraltet  = sorted(HANDARBEIT & frisch)
print(f'  {len(frisch)} Seiten gebaut, {len(HANDARBEIT)} noch Handarbeit')
if not zeitstempel_gesetzt:
    print('  Änderungszeiten nicht setzbar — der Ursprung der Seiten')
    print('  ist hier nicht prüfbar.')
    fehlgeschlagen.append('Ursprung nicht prüfbar')
if herrenlos:
    print('  SEITEN OHNE URSPRUNG:')
    for s in herrenlos[:8]:
        print(f'      {s}')
    print('      (eine Seite gehört in ein bau-*.py — oder, wenn sie')
    print('       vorerst von Hand bleibt, in HANDARBEIT in dieser Datei)')
    fehlgeschlagen.append('Seiten ohne Ursprung')
if veraltet:
    print('  IN HANDARBEIT, OBWOHL GEBAUT: ' + ', '.join(veraltet[:8]))
    print('      (die Seite kommt jetzt aus dem Bausystem — Eintrag streichen)')
    fehlgeschlagen.append('HANDARBEIT veraltet')

# 6 · es gibt genau eine Himmelsrechnung
#     Fehlerklasse: eine zweite Kopie der Engine. Solange sie gleich
#     ist, fällt sie nicht auf; sobald eine davon gepflegt wird,
#     rechnen zwei Seiten verschieden und niemand sieht, warum.
#     Erlaubt ist deshalb nur, was Zeichen für Zeichen mit
#     rituale/engine.js übereinstimmt.
ENGINE = hier / 'rituale' / 'engine.js'
engine_text = ENGINE.read_text(encoding='utf-8')
#     Die Namen werden zusammengesetzt, damit diese Prüfung nicht
#     sich selbst meldet.
KERN = tuple('function ' + n for n in
             ('helio', 'sunLon', 'moonLon', 'placidus'))
zweite = []
for q in sorted(hier.rglob('*')):
    if q.is_symlink() or not q.is_file() or q.suffix not in ('.js', '.html', '.py'):
        continue
    if wiki in q.parents or q == ENGINE or q.name.startswith('_probe-'):
        continue
    t_ = q.read_text(encoding='utf-8', errors='replace')
    if all(k in t_ for k in KERN) and t_ != engine_text:
        zweite.append(str(q.relative_to(hier)))
if zweite:
    print('  ZWEITE HIMMELSRECHNUNG:')
    for z in zweite[:8]:
        print(f'      {z}')
    print('      (gerechnet wird gegen rituale/engine.js — eine Kopie,')
    print('       die abweicht, lässt zwei Seiten verschieden rechnen)')
    fehlgeschlagen.append('zweite Himmelsrechnung')
else:
    print('  eine Himmelsrechnung, keine abweichende Kopie')

# 7 · die Bausteine am Wurzelort und ihre Quelle sind gleich
#     Fehlerklasse: eine Datei liegt zweimal — einmal in quelltext/
#     als Quelle, einmal oben, wo die Seiten sie wirklich laden.
#     Niemand kopiert sie, also wird eine Änderung an der Quelle
#     stillschweigend nicht ausgeliefert, und umgekehrt überlebt
#     eine Änderung oben den nächsten Blick in die Quelle nicht.
#     Heute aufgefallen an niveau.js und wortwahl.js: beide liegen
#     doppelt, beide sind noch gleich.
doppelt = []
for oben_js in sorted(wiki.glob('*.js')):
    if oben_js.is_symlink():
        continue
    quellen = [q for q in hier.rglob(oben_js.name)
               if q.is_file() and not q.is_symlink() and wiki not in q.parents]
    for q in quellen:
        if q.read_bytes() != oben_js.read_bytes():
            doppelt.append(f'{oben_js.name}  ≠  {q.relative_to(hier)}')
if doppelt:
    print('  ZWEI FASSUNGEN DERSELBEN DATEI:')
    for d in doppelt[:8]:
        print(f'      {d}')
    print('      (die Seiten laden die Fassung oben; eine abweichende')
    print('       Quelle in quelltext/ wird nie ausgeliefert)')
    fehlgeschlagen.append('zwei Fassungen derselben Datei')
else:
    print('  keine abweichende Zweitfassung am Wurzelort')

# 8 · es gibt genau eine Liste der zehn Lebensbereiche
#     Fehlerklasse wie bei der Himmelsrechnung: solange zwei Kopien
#     gleich sind, fällt nichts auf; sobald eine gepflegt wird,
#     zeigen zwei Seiten verschiedene Bereiche.
LISTE = hier / 'bereiche' / 'lebensbereiche.js'
zuordnung = re.compile(r"name:'[^']*',\s*haeuser:\s*\[")
zweite_liste = []
for q in sorted(hier.rglob('*')):
    if q.is_symlink() or not q.is_file() or q.suffix not in ('.js', '.py'):
        continue
    if wiki in q.parents or q == LISTE or q.name.startswith('_probe-'):
        continue
    if zuordnung.search(q.read_text(encoding='utf-8', errors='replace')):
        zweite_liste.append(str(q.relative_to(hier)))
if not LISTE.exists():
    print('  bereiche/lebensbereiche.js fehlt — die zehn Bereiche haben')
    print('  keine gemeinsame Quelle mehr')
    fehlgeschlagen.append('Bereichsliste fehlt')
elif zweite_liste:
    print('  ZWEITE LISTE DER LEBENSBEREICHE:')
    for z in zweite_liste[:8]:
        print(f'      {z}')
    print('      (die zehn Bereiche stehen allein in')
    print('       bereiche/lebensbereiche.js)')
    fehlgeschlagen.append('zweite Bereichsliste')
else:
    print('  eine Liste der Lebensbereiche')

# 9 · wer die Bereiche zeigt, lässt sie auch wählen
#     Fehlerklasse: eine Seite nimmt die zehn Bereiche, zeigt aber
#     keine Auswahl — dann gilt die Auswahl eben doch nur für
#     manche Seiten, und das ist genau die Zersplitterung, die
#     PRODUKT.md Abschnitt 4 ausschließt.
ohne_wahl = []
for s in seiten:
    t = s.read_text(encoding='utf-8', errors='replace')
    if 'AC_LB' not in t:
        continue
    if 'id="berwahl"' not in t or 'AC_WAHL' not in t:
        ohne_wahl.append(s.name)
if ohne_wahl:
    print('  SEITEN MIT BEREICHEN, ABER OHNE AUSWAHL:')
    for s in ohne_wahl[:8]:
        print(f'      {s}')
    print('      (die Auswahl gilt plattformweit — eine Seite, die die')
    print('       Bereiche zeigt, muss sie auch wählen lassen)')
    fehlgeschlagen.append('Bereiche ohne Auswahl')
else:
    print('  jede Seite mit Bereichen lässt sie auch wählen')

print('=' * 62)
print(f'  {time.time() - t0:.0f} Sekunden')
if fehlgeschlagen:
    print(f'  FEHLGESCHLAGEN: {", ".join(fehlgeschlagen)}')
    print('  → nicht ausliefern')
    sys.exit(1)
print('  alles steht')
