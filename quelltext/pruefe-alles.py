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
    # Zuletzt: die Rauchprobe der App-Ansicht lädt die eben gebauten
    # Seiten unter einem echten Netzprotokoll und schaltet das Netz ab.
    ('app/bau-app.py',        'App'),
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

# 2b · die Startseite heißt „Jetzt"
# Am 28.10. umbenannt: Sie hieß „Heute" und zeigte zehn Tage — der Name
# hat gelogen (ENTWURF-JETZT.md Abschnitt 1). Weil die Navigation in
# jeder Seite von Hand steht, wäre „überall oder gar nicht" sonst eine
# Sache des Erinnerns. REGELN.md Abschnitt 6c: Was verlässlich sein
# soll, gehört in die Maschine.
falsch_benannt = []
for s in seiten:
    t = s.read_text(encoding='utf-8', errors='replace')
    m = re.search(r'<nav class="ac-nav">(.*?)</nav>', t, re.S)
    if not m:
        continue
    b = re.search(r'href="index\.html"[^>]*>([^<]*)</a>', m.group(1))
    if b and b.group(1).strip() != 'Jetzt':
        falsch_benannt.append(f'{s.name}: „{b.group(1).strip()}"')
if falsch_benannt:
    print(f'  {len(falsch_benannt)} Seiten nennen die Startseite anders als „Jetzt":')
    for z in falsch_benannt[:8]:
        print(f'      {z}')
    fehlgeschlagen.append('Startseite heißt nicht überall „Jetzt"')
else:
    print('  die Startseite heißt überall „Jetzt"')

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

# 6b · die Bausteine am Wurzelort aus ihrer Quelle erneuern
#      Am 28.10. hat Prüfung 7 genau das gefunden, wofür sie
#      geschrieben wurde: himmel.js war in quelltext/ geändert und
#      oben alt. Die Prüfung war richtig — nur ist „daran denken,
#      die Datei zu kopieren" keine Automatik (REGELN.md 6c).
#      Also kopiert der Bau sie jetzt, und Prüfung 7 bleibt als
#      Netz für den Fall, dass jemand oben von Hand ändert.
erneuert = []
for oben_js in sorted(wiki.glob('*.js')):
    if oben_js.is_symlink():
        continue
    quellen = [q for q in hier.rglob(oben_js.name)
               if q.is_file() and not q.is_symlink() and wiki not in q.parents]
    if len(quellen) == 1 and quellen[0].read_bytes() != oben_js.read_bytes():
        oben_js.write_bytes(quellen[0].read_bytes())
        erneuert.append(oben_js.name)
if erneuert:
    print('  aus der Quelle erneuert: ' + ', '.join(erneuert))

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

# 10 · jede gebaute Seite bindet die App-Ansicht ein
#      Fehlerklasse: eine Seite, die das Manifest nicht nennt. Auf dem
#      Telefon fällt das nicht auf — die Seite sieht aus wie immer, nur
#      lässt sie sich von dort aus nicht installieren und bleibt nach
#      einem Verbindungsabbruch leer. Geprüft wird am Ergebnis, nicht in
#      den sechzehn Bauskripten: die Zeilen stehen in app/app-kopf.html,
#      und jede gebaute Seite muss genau diesen Block tragen. Wer eine
#      neue Seite baut und ihn vergisst, kommt hier nicht durch.
#      Die Handarbeitsseiten haben keine Quelle, in die er gehörte — sie
#      sind so lange ausgenommen, wie sie auf der Liste oben stehen, und
#      die Liste soll schrumpfen.
APP_KOPF = hier / 'app' / 'app-kopf.html'
if not APP_KOPF.exists():
    print('  app/app-kopf.html fehlt — die Seiten haben keine gemeinsame')
    print('  Quelle für Manifest und Zwischenspeicher mehr')
    fehlgeschlagen.append('app-kopf.html fehlt')
else:
    block = APP_KOPF.read_text(encoding='utf-8').strip()
    ohne_app, halb = [], []
    for s in seiten:
        if s.name in HANDARBEIT:
            continue
        t = s.read_text(encoding='utf-8', errors='replace')
        if block in t:
            continue
        (halb if 'rel="manifest"' in t else ohne_app).append(s.name)
    # Jede Datei, auf die der gemeinsame Kopf und das Manifest zeigen,
    # muss oben liegen. Ein Symbol, das fehlt, bleibt sonst still.
    gebraucht = set(re.findall(r'(?:href|src)="([a-z0-9._-]+)"', block))
    man = wiki / 'manifest.webmanifest'
    if man.exists():
        import json as _json
        try:
            mm = _json.loads(man.read_text(encoding='utf-8'))
            gebraucht |= {i.get('src', '') for i in mm.get('icons', [])}
            gebraucht |= {mm.get('start_url', '')}
        except ValueError:
            fehlgeschlagen.append('Manifest ist kein lesbares JSON')
    gebraucht |= {'manifest.webmanifest', 'sw.js', 'app-start.js', 'offline.html'}
    fehlende = sorted(n for n in gebraucht if n and not (wiki / n).exists())
    if ohne_app:
        print(f'  {len(ohne_app)} GEBAUTE SEITEN OHNE APP-ANSICHT:')
        for s in ohne_app[:8]:
            print(f'      {s}')
        print('      (die Zeilen stehen in app/app-kopf.html — ein bau-*.py')
        print('       setzt sie mit einer Zeile vor dem Schreiben ein)')
        fehlgeschlagen.append('Seiten ohne App-Ansicht')
    if halb:
        print('  SEITEN MIT HALBEM APP-KOPF: ' + ', '.join(halb[:8]))
        print('      (der Block in app/app-kopf.html gilt ganz oder nicht —')
        print('       eine eigene Fassung je Seite läuft wieder auseinander)')
        fehlgeschlagen.append('halber App-Kopf')
    if fehlende:
        print('  DIE APP-ANSICHT VERWEIST INS LEERE: ' + ', '.join(fehlende[:8]))
        fehlgeschlagen.append('App-Ansicht verweist ins Leere')
    if not ohne_app and not halb and not fehlende:
        anzahl = len([s for s in seiten if s.name not in HANDARBEIT])
        print(f'  alle {anzahl} gebauten Seiten binden die App-Ansicht ein')

# 11 · kein Maschinenraum im Titel einer Raumseite
#     Fehlerklasse: Eine Seite nennt oben, woraus sie gerechnet ist,
#     statt wovon sie handelt. Auf den Karten der Räume stand bis
#     heute "2. Haus, Venus, Saturn, Lilith" unter dem Namen — genau
#     das, was REGELN.md Abschnitt 2 verbietet: Eine Seite spricht
#     darüber, WAS passiert, nicht darüber, woran man es abliest.
#     Die Räume sind Handarbeit, haben also kein bau-*.py, das das
#     prüfen könnte. Deshalb steht die Prüfung hier.
#     Geprüft wird nur, was im Markup wirklich oben steht: Titel,
#     Überschriften und die Titelzeilen einer Raumkarte. Was in
#     ac-tech wartet, darf die Mechanik nennen — es ist ja der Ort
#     dafür. Skripte und Stil bleiben außen vor: dort entstehen die
#     Fachbegriffe für die Wartemarken.
#     Die Wortliste liegt bewusst klein und nur hier. Dieselbe Liste
#     steht heute in sechs bau-*.py je für ihren Ordner — das
#     zusammenzulegen ist eine eigene Aufgabe und steht in AUFGABEN.md.
MASCHINE = (
    ['Sonne', 'Mond', 'Merkur', 'Venus', 'Mars', 'Jupiter', 'Saturn',
     'Uranus', 'Neptun', 'Pluto', 'Lilith', 'Chiron', 'Mondknoten']
    + ['Haus', 'Häuser', 'Hauses', 'Aszendent', 'Deszendent', 'Radix',
       'MC', 'IC', 'Orbis', 'Orben', 'rückläufig', 'winkelhaft']
    + ['Aspekt', 'Aspekte', 'Konjunktion', 'Opposition', 'Quadrat',
       'Trigon', 'Sextil']
    + ['Widder', 'Stier', 'Zwillinge', 'Krebs', 'Löwe', 'Jungfrau',
       'Waage', 'Skorpion', 'Schütze', 'Steinbock', 'Wassermann', 'Fische']
)
# Zwei Stellen werden angesehen, und nur diese zwei: die
# Überschriften einer Seite und alles, was auf einer Raumkarte steht.
# Ein Fließtext weiter unten darf Fachbegriffe erklären, das ist sein
# Zweck. Die Karte wird als Ganzes geprüft und nicht nach
# Klassennamen: Sonst heißt die nächste Zeile anders und ist wieder
# ungeprüft — genau so kam „2. Haus, Venus, Saturn, Lilith" dorthin.
UEBERSCHRIFT = re.compile(r'<(h1|h2|h3|title)\b([^>]*)>(.*?)</\1>'
                          r'|<div\b([^>]*\bclass="rm-frage[^"]*"[^>]*)>(.*?)</div>',
                          re.S)
RAUMKARTE = re.compile(r'<a\b[^>]*class="rk\b[^"]*"[^>]*>(.*?)</a>', re.S)
WARTET = re.compile(r'<([a-z]+)\b[^>]*\bclass="[^"]*\bac-tech\b[^"]*"[^>]*>.*?</\1>', re.S)

def klartext(roh):
    """Was ein Mensch von diesem Stück Markup wirklich zu sehen bekommt."""
    s = re.sub(r'<[^>]*>', ' ', roh or '')
    for ent, zeichen in (('&amp;', '&'), ('&nbsp;', ' '), ('&bdquo;', '„'),
                         ('&ldquo;', '"'), ('&middot;', '·'), ('&uuml;', 'ü'),
                         ('&auml;', 'ä'), ('&ouml;', 'ö'), ('&mdash;', '—'),
                         ('&amp;rarr;', '→'), ('&rarr;', '→')):
        s = s.replace(ent, zeichen)
    return re.sub(r'\s+', ' ', s).strip()

def maschinenwort(text):
    for w in MASCHINE:
        if re.search(r'(?<![A-Za-zÄÖÜäöüß])' + re.escape(w)
                     + r'(?![A-Za-zÄÖÜäöüß])', text):
            return w
    return None

raumseiten = [s for s in seiten
              if s.name == 'raeume.html' or s.name.startswith('raum-')]
maschinentitel, ohne_marke = [], []
for s in raumseiten:
    roh = s.read_text(encoding='utf-8', errors='replace')
    ohne = re.sub(r'<(script|style)\b.*?</\1>', ' ', roh, flags=re.S)
    stellen = []
    for m in UEBERSCHRIFT.finditer(ohne):
        attr = (m.group(2) or '') + (m.group(4) or '')
        if 'ac-tech' in attr:          # wartet an der richtigen Stelle
            continue
        stellen.append(m.group(3) if m.group(3) is not None else m.group(5))
    # Auf einer Karte zählt alles, was nicht wartet.
    for m in RAUMKARTE.finditer(ohne):
        stellen.append(WARTET.sub(' ', m.group(1)))
    for stelle in stellen:
        klar = klartext(stelle)
        w = maschinenwort(klar)
        if w:
            maschinentitel.append(f'{s.name}: „{klar[:60]}" ({w})')
    # Und was wartet, muss auch wirklich warten. Zwei Wege, auf denen
    # eine Wartemarke nichts bewirkt: ohne data-ab hängt sie an einer
    # einzigen Stilregel, und ohne niveau.js gibt es gar keine Regel —
    # dann steht die Mechanik wieder offen da, obwohl im Markup alles
    # richtig aussieht.
    for m in re.finditer(r'<[a-z]+\b([^>]*\bclass="[^"]*\bac-tech\b[^"]*"[^>]*)>', ohne):
        if 'data-ab' not in m.group(1):
            ohne_marke.append(f'{s.name}: ac-tech ohne data-ab')
    if 'ac-tech' in ohne and 'niveau.js' not in roh:
        ohne_marke.append(f'{s.name}: Wartemarken, aber niveau.js fehlt')
if maschinentitel:
    print('  MASCHINENRAUM IM TITEL EINER RAUMSEITE:')
    for d in maschinentitel[:8]:
        print(f'      {d}')
    print('      (eine Seite sagt oben, WAS passiert — woran man es')
    print('       abliest, wartet in ac-tech mit data-ab="2")')
    fehlgeschlagen.append('Maschinenraum im Titel')
elif ohne_marke:
    print('  WARTEMARKE OHNE STUFE:')
    for d in sorted(set(ohne_marke))[:8]:
        print(f'      {d}')
    print('      (ac-tech verbirgt sich nur über eine einzige Stilregel —')
    print('       data-ab="2" sagt, ab welcher Stufe es erscheint)')
    fehlgeschlagen.append('ac-tech ohne data-ab')
else:
    print(f'  {len(raumseiten)} Raumseiten ohne Maschinenraum im Titel')

# 12 · die Tafel der fünf Aspekte steht nur an den eingetragenen Stellen
# Aufgabe 5 vom 29.10.: Zwei Seiten erklärten dieselben fünf Winkel,
# mit verschiedenen Worten und verschiedenen Beispielen. Wer beide
# liest, lernt nicht mehr, sondern zweifelt — und beim nächsten
# Umschreiben wandert nur eine der beiden mit.
#
# Ob zwei Texte dasselbe sagen, kann keine Prüfung entscheiden. Was
# sie kann: die Stellen festhalten, an denen die fünf Winkel
# überhaupt ausgelegt werden dürfen, und jede weitere auffallen
# lassen. Dieselbe Bauart wie HANDARBEIT oben: die Liste bricht in
# beide Richtungen — eine neue Seite mit der Tafel ist ein Fehler,
# und eine eingetragene Seite, die sie verloren hat, auch. Dann
# steht hier nie eine Liste, die nichts mehr beschreibt.
ASPEKTNAMEN = ['Konjunktion', 'Sextil', 'Quadrat', 'Trigon', 'Opposition']
ASPEKTGRADE = ['0°', '60°', '90°', '120°', '180°']
TAFEL_ERLAUBT = {
    # die Lektion: was die fünf Winkel sind, mit Beispielen und Spielraum
    'aspekte.html',
    # das Nachschlagewerk: nur Winkel und Farbe, damit man die Linien
    # im Chart zuordnen kann — die Bedeutung steht auf aspekte.html
    'aspekte-lesen.html',
    # das Wörterbuch: eine Zeile je Begriff, wie für jeden anderen auch
    'glossar.html',
}
mit_tafel = set()
for s_ in seiten:
    t = s_.read_text(encoding='utf-8', errors='replace')
    t = re.sub(r'<(script|style)\b.*?</\1>', ' ', t, flags=re.S)
    klar = re.sub(r'<[^>]+>', ' ', t)
    if (all(n in klar for n in ASPEKTNAMEN)
            and all(g in klar for g in ASPEKTGRADE)):
        mit_tafel.add(s_.name)
neu_tafel = sorted(mit_tafel - TAFEL_ERLAUBT)
weg_tafel = sorted(TAFEL_ERLAUBT - mit_tafel)
if neu_tafel:
    print('  NOCH EINE SEITE LEGT DIE FÜNF WINKEL AUS:')
    for d in neu_tafel[:8]:
        print(f'      {d}')
    print('      (die Winkel werden einmal erklärt — auf aspekte.html.')
    print('       Soll es wirklich eine weitere Stelle sein, gehört sie')
    print('       mit einem Satz Begründung in TAFEL_ERLAUBT)')
    fehlgeschlagen.append('zweite Aspekttafel')
elif weg_tafel:
    print('  EINGETRAGENE ASPEKTTAFEL FEHLT:')
    for d in weg_tafel:
        print(f'      {d}')
    print('      (steht in TAFEL_ERLAUBT, trägt die Tafel aber nicht mehr —')
    print('       dann gehört der Eintrag heraus)')
    fehlgeschlagen.append('Aspekttafel verschwunden')
else:
    print(f'  die fünf Winkel an {len(mit_tafel)} eingetragenen Stellen')

print('=' * 62)
print(f'  {time.time() - t0:.0f} Sekunden')
if fehlgeschlagen:
    print(f'  FEHLGESCHLAGEN: {", ".join(fehlgeschlagen)}')
    print('  → nicht ausliefern')
    sys.exit(1)
print('  alles steht')
