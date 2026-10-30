# Aufgaben

Die Liste, aus der die tägliche Arbeit kommt. **Immer von oben.** Was fertig
ist, wandert nach „Erledigt" mit Datum. Wer hier etwas einträgt, schreibt in
einem Satz, **woran man erkennt, dass es fertig ist** — sonst ist es keine
Aufgabe, sondern ein Wunsch.

Vor jeder Arbeit: **`PRODUKT.md`** lesen (was gebaut wird und für wen),
dann `REGELN.md` (wie). Nach jeder Arbeit:
`python3 pruefe-alles.py`. Schlägt die Prüfung fehl, wird nichts ausgeliefert.

**Eine Aufgabe pro Tag.** Lieber eine Sache fertig als drei angefangen.

---

## Als Nächstes




### 6 · Die Tierkreiszeichen auf `strategie/umgang-kristi.html`
Die Glyphen rendern als Emoji statt als Schriftzeichen; es fehlt `︎`.
**Fertig, wenn:** die Seite die Zeichen einfarbig zeigt.

### 7 · Netlify statt GitHub Pages
Vorbereitet, aber nicht umgestellt.
**Fertig, wenn:** die Seite unter der Netlify-Adresse läuft und die alte
Adresse weiterleitet.

### 9 · Die Sätze aus der Anzeige holen
`bereich-app.js` schreibt selbst Text, statt ihn zu zeichnen: die fünf
Blockköpfe, die Marke „Das Stärkste gerade", der Satz über die drei Seiten
eines Bereichs und die beiden Sätze über die lange Linie. PRODUKT.md
Abschnitt 7 verlangt das Gegenteil — ein Satz in der Anzeige wird beim
nächsten Umbau nebenbei geändert und von keiner Prüfung gesehen. Beim
Tiefgang ist das schon erzwungen, bei der Seite nicht.
**Fertig, wenn:** diese Sätze in `bereich-daten.js` stehen und
`bau-bereiche.py` abbricht, sobald in `bereich-app.js` wieder ein
Satzzeichen-tragender Text in Anführungszeichen auftaucht, der nicht aus
den Daten kommt.

### 19 · Die Begleitung sortiert für alle Menschen gleich
Gefunden beim Bauen am 30.10. `begleit-rechner.js` sortiert die Anlagen
eines Menschen nach `BG_GEWICHT` — einer festen Zahl je Planet. Sonne und
Mond stehen dort beide auf 1,00, Venus und Mars beide auf 0,85, Uranus und
Neptun beide auf 0,55. Zwei Folgen: Die Reihenfolge ist bei jedem Menschen
dieselbe, egal was in seinem Bild steht; und wo zwei Zahlen gleich sind,
entscheidet die Reihenfolge der Liste `BG_ANLAGEN`. Dieselbe Fehlerklasse
wie bei den Facetten (Aufgabe 8, erledigt), nur eine Seite weiter — und
hier wiegt sie mehr, weil die Coachin die oberste Anlage für die wichtigste
dieses Menschen hält.
**Fertig, wenn:** die Reihenfolge der Anlagen von der natalen Lage abhängt
(nicht allein vom Planetennamen), zwei erfundene Geburtsbilder nachweislich
verschiedene Reihenfolgen zeigen, kein Paar auf allen gerechneten Gewichten
gleich liegt, und `bau-begleitung.py` beides prüft.

### 31 · „Jupiter auf dein Mond" — die gebauten Überschriften beugen nicht
Gefunden im Gestaltungs-Durchgang vom 30.10. zu `index.html`
(`GESTALTERIN.md`, Befund 30.10-1). Die Köpfe in „Was dein Bild gerade
trifft", „Die nächsten zwölf Monate" und „Was gerade läuft" setzen immer
ein unflektiertes `dein` oder `deine` ein: „Jupiter auf dein Mond", „Mars
quer zu dein Mars", „Jupiter in Reichweite von deine Sonne", „Saturn
gegenüber dein Auftreten" — elf verschiedene, keine richtige. Auf Stufe 2
dasselbe („Jupiter Konjunktion dein Mond"). Die Vorlage kennt weder den
Fall, den die Präposition verlangt, noch das Geschlecht des Punktes
dahinter. Es trifft die größten Überschriften der Seite und damit die
Karten, die am ehesten fotografiert werden.
**Fertig, wenn:** jeder Punkt in den Daten sein grammatisches Geschlecht
trägt und jede Verbindungsformel ihren Fall, die elf Überschriften auf
`index.html` mit einem erfundenen Profil korrekt gebeugt dastehen („auf
deinen Mond", „quer zu deinem Mars", „von deiner Sonne", „gegenüber deinem
Auftreten") — auf Stufe 0 und auf Stufe 2 — und `bau-heute.py` abbricht,
sobald im erzeugten Text auf „auf", „quer zu", „im Einklang mit",
„gegenüber" oder „in Reichweite von" ein unflektiertes `dein` oder `deine`
vor einem großgeschriebenen Wort folgt.

### 32 · Die Grenze im Bereich Gesundheit liegt zugeklappt
Befund der Prüferin vom 2026-10-30 (Die Begleitete, erster Befund — die
Grenzen kommen zuerst). Die Sätze „Hier wird nichts über deinen Körper
festgestellt, und nichts hier ersetzt eine Behandlung" und „Bei allem
Körperlichen gehört eine Fachperson gefragt" stehen in einem
Klappabschnitt, der zugeklappt ausgeliefert wird und „Mit jemand anderem
darüber sprechen" heißt. Im sichtbaren Text der Bereichsseite kommt kein
Hinweis auf Behandlung, Therapie oder Fachperson vor, während offen
dasteht, dass der Körper „Aufmerksamkeit verlangt" und „etwas ernst
wird". `PRODUKT.md` Abschnitt 5 verlangt, dass das **dabei**steht;
`REGELN.md` Abschnitt 1 klappt die Sicht der Coachin zu, nicht die
Grenze. Auf „Jetzt" steht der vergleichbare Satz zu Kosmetischem offen im
Text — die Plattform kann es also, nur an der teuersten Stelle nicht.
**Fertig, wenn:** die Grenzsätze eines Bereichs ohne Aufklappen sichtbar
sind (die Gesprächsfragen dürfen gefaltet bleiben), das in den Daten
getrennt liegt und nicht in der Anzeige, und `bau-bereiche.py` abbricht,
wenn in einem Bereich mit Körper- oder Psychebezug der Grenzsatz fehlt
oder nur in einem zugeklappten Element steht.

### 33 · Aufgabe 17 greift zu kurz: der Preissatz steht auch in den Bereichen
Befund der Prüferin vom 2026-10-30 (zweiter Befund). „Was du in diesem
Fenster nicht fragst, musst du später teurer verhandeln" steht auf
`bereiche.html` in fünf von zehn Bereichen, „Was dabei wegbricht, hat nur
so ausgesehen, als trüge es" in zwei weiteren — zusammen sieben von zehn,
sichtbar auf Stufe 0 ohne Aufklappen. Dieselbe Fehlerklasse wie Aufgabe
17, aber 17 ist auf „Heute" zugeschnitten („kein Handgriff auf „Heute"",
Prüfung in `bau-heute.py`). So gefasst bleibt die Seite mit der größeren
Reichweite stehen. Gehört mit 17 in einen Zug; zweimal anfassen wäre
doppelte Arbeit.
**Fertig, wenn:** kein Handgriff auf „Heute" **und** keiner in den
Bereichen eine Folge in der Zukunft behauptet oder einen Preis auf
Nichthandeln setzt, die Handgriffe dafür nur an einer Stelle in den Daten
geändert werden mussten, und eine gemeinsame Prüfung — nicht je
`bau-*.py` eine eigene — abbricht, sobald ein Handgriff eine Zukunftsform
mit Folge oder ein Wort wie „teurer", „musst du später" oder „sonst"
enthält.

---

## Was nicht gemacht wird

* Keine neuen Rechenverfahren, solange die vorhandenen nicht verständlich
  erklärt sind.
* Keine neue Seite, solange zwei alte dasselbe sagen.
* Keine Gestaltungsänderung ohne Grund. Die Farben und Schriften stehen.

---

### 9 · Zweite Stimme für die Reibung zwischen zwei Menschen
Die Analyse rechnet schon Paare und Zusammenarbeit, aber die Beiträge
schöpfen das nicht ab — dabei ist genau das der Unterschied zu allem
anderen in diesem Feld: nicht „du", sondern „ihr beide".
**Fertig, wenn:** `content/mach-content.py` einen vierten Beitragstyp
erzeugt, der aus `analyse/thema-paar.js` eine Reibung erklärt, ohne eine
konkrete Person erkennbar zu machen — und der Bau das prüft.

### 10 · Der Monatsbericht sagt nicht, was er nicht kann
`REGELN.md` Abschnitt 4 verlangt von jeder rechnenden Seite einen
Abschnitt „Was das taugt — und was nicht", und `PRODUKT.md` Abschnitt 3
nennt diese Ehrlichkeit den Markenkern. Der Monatsbericht hat nur einen
Hinweiskasten für die Coachin. Im Brief selbst, den ein Mensch liest,
steht nichts darüber, wie häufig so eine Aussage rechnerisch überhaupt
ist, dass die Deutung nicht überprüft ist, und dass das eigene Erleben
Vorrang hat.
**Fertig, wenn:** der Brief diese drei Sätze trägt, sie aus
`monat-daten.js` kommen, und `bau-monat.py` abbricht, wenn einer fehlt.

### 11 · Drei Kopien der Himmelsrechnung zusammenlegen
`bez/engine.js`, `niveau/engine.js` und `oph/engine.js` sind heute Zeichen
für Zeichen gleich mit `rituale/engine.js`. `pruefe-alles.py` verhindert
seit heute, dass sie auseinanderlaufen — aber vier Dateien für eine
Rechnung bleiben vier Dateien.
**Fertig, wenn:** die drei Kopien gelöscht sind, ihre `bau-*.py`
`rituale/engine.js` laden, und der Neubau bitgleiche Seiten erzeugt.

### 12 · Der Brief verschweigt, dass er auswählt
In manchen Monaten laufen sieben Vorgänge; der Brief nennt zwei und sagt
nicht, dass er auswählt. Wer das nicht weiß, hält die zwei für alles, was
los ist — und das ist genau die Sorte stiller Übertreibung, die
`PRODUKT.md` Abschnitt 3 ausschließen will.
**Fertig, wenn:** der Brief bei mehr als zwei Vorgängen in einem Satz sagt,
wie viele es insgesamt sind und wonach die genannten ausgewählt wurden, und
`bau-monat.py` einen Probefall mit mehr als zwei Vorgängen baut und prüft,
dass dieser Satz dort steht und bei zwei oder weniger fehlt.

### 13 · Die zweite Anlage sagt nicht, worum es geht
Der zweite Vorgang im Brief kommt ohne eigene Überschrift: „Daneben läuft
noch etwas Zweites." und direkt der Fließtext. Seit die Beschreibungen nach
Winkelart getrennt sind, gibt es für ihn eine passende Überschrift — sie
wird nur nicht gezeigt.
**Fertig, wenn:** auch der zweite Vorgang seine eigene Überschrift trägt,
diese sich bei reibendem und tragendem Winkel unterscheidet, und die
Rauchprobe prüft, dass bei zwei Vorgängen zwei verschiedene Überschriften
im Brief stehen.

### 14 · Die Bausteine am Wurzelort haben keinen Ursprung
Seit dem 20. Oktober muss jede ausgelieferte *Seite* aus einem `bau-*.py`
kommen oder als Handarbeit eingetragen sein. Für die zwanzig
JavaScript-Dateien oben gilt das nicht: `profil.js` verwahrt die
Profildaten jeder Besucherin und wird von jeder gebauten Seite geladen,
hat aber weder eine Quelle in `quelltext/` noch ein Bauskript. Genau an
dieser Stelle war der Monatsbericht dünn geblieben.
**Fertig, wenn:** `pruefe-alles.py` auch für jede `.js`-Datei oben einen
Ursprung verlangt — gebaut oder namentlich als Handarbeit eingetragen —
und die Liste der Handarbeit wie bei den Seiten schrumpfen kann.

### 15 · Der Wissensstand liegt nicht bei den Profildaten
Die Bereichsauswahl liegt seit heute in `AC_P` neben dem Profil, der
Wissensstand aber in zwei eigenen Schlüsseln (`ac_niveau`,
`ac_niveau_profile`). Zwei Einstellungen, die dasselbe bewirken sollen —
plattformweit gelten —, liegen an zwei Orten, und nur eine wandert beim
Ausgeben der Profildaten mit.
**Fertig, wenn:** der Wissensstand ebenfalls in `AC_P` liegt, ein alter
Speicherstand einmalig übernommen wird, und `pruefe-alles.py` abbricht,
sobald eine Einstellung wieder einen eigenen Speicherschlüssel anlegt.

---

### 16 · Die Stufenleiste darf nicht weiter zurückfallen
Im Auslieferstand liegen 124 HTML-Seiten, fünf davon tragen `#nivleiste`.
Die 108 Seiten, die `pruefe-alles.py` als `HANDARBEIT` führt, tragen
weder `#nivleiste` noch `ac-tech` noch `data-ab`. „Verständlich auf jeder
Stufe" ist damit eine Eigenschaft von fünf Seiten, nicht der Plattform.
Siehe Recherche vom 2026-10-21, Spur B: Was nur die Absicht hält, driftet.
**Fertig, wenn:** `pruefe-alles.py` als siebte Querprüfung die Seiten ohne
Stufenleiste namentlich führt, abbricht, sobald eine Seite ohne
Stufenleiste auftaucht, die nicht auf der Liste steht, und ebenso
abbricht, wenn eine Seite auf der Liste eine Stufenleiste bekommen hat —
dieselbe Bauart wie `HANDARBEIT` und `veraltet` darüber.

### 17 · „Heute" sagt die Zukunft voraus und nicht, was es taugt
Befund der Prüferin vom 2026-10-23 (Die Suchende, dritter Befund — in
`PRUEFERIN.md` der erste, weil Grenzen zuerst kommen). Unter „Was du tun
kannst" stehen Sätze, die eine Zukunft behaupten und einen Preis darauf
setzen: „Was du in diesem Fenster nicht fragst, musst du später teurer
verhandeln." `PRODUKT.md` Abschnitt 5 schließt beides aus — Vorhersage
und Dringlichkeit, die es nicht gibt. Dazu fehlt „Heute" der Abschnitt
„Was das taugt — und was nicht", den `REGELN.md` Abschnitt 4 von jeder
rechnenden Seite verlangt; dieselbe Fehlerklasse wie Aufgabe 10.
**Fertig, wenn:** kein Handgriff auf „Heute" mehr eine Folge in der
Zukunft behauptet, „Heute" den Ehrlichkeitsabschnitt trägt (wie häufig
die Aussage rechnerisch ist, dass die Deutung nicht überprüft ist, dass
das eigene Erleben Vorrang hat), beides aus den Datendateien kommt, und
der Bau abbricht, wenn der Abschnitt fehlt oder ein Handgriff eine
Zukunftsform mit Folge enthält.

### 18 · Die Startseite ohne Profil sagt nicht, wofür sie da ist
Befund der Prüferin vom 2026-10-23 (Die Suchende, zweiter Befund). Wer
`index.html` ohne Profil öffnet, sieht nur den Kasten „Noch kein Profil
angelegt" und sonst eine leere Seite — am Telefon 351 Pixel hoch. Die
Seite verlangt als Erstes Geburtszeit und Geburtsort und hat bis dahin
mit keinem Satz gesagt, was sie dafür zurückgibt. Der Satz, der das
könnte, steht schon auf `bereiche.html`.
**Fertig, wenn:** der Leerzustand von „Heute" vor der Aufforderung in
zwei bis drei Sätzen sagt, was die Seite tut, was sie zurückgibt und
warum sie Zeit und Ort braucht — auf Stufe 0, ohne Verkaufston —, der
Text aus einer Datendatei kommt und der Bau abbricht, wenn der
Leerzustand nur noch aus der Aufforderung besteht.

### 19 · `toLowerCase` wird nur dort geprüft, wo jemand daran gedacht hat
`REGELN.md` Abschnitt 4 verbietet `toLowerCase` auf deutschen Text
plattformweit. Geprüft wird es aber in sechs `bau-*.py` einzeln, jedes nur
für seinen eigenen Ordner — und zwei Dateien, über die kein solcher
Wächter läuft, benutzen es: `niveau/reading-app.js` baut den Dateinamen
eines Readings damit, und `bez/beziehung-app.js` schreibt damit den ersten
Buchstaben eines Satzes klein, was bei einem Substantiv falsches Deutsch
ergibt. Eine Regel, die pro Ordner geprüft wird, gilt für jeden neuen
Ordner nicht.
**Fertig, wenn:** `pruefe-alles.py` als Querprüfung über den ganzen
Quelltext abbricht, sobald irgendwo `toLowerCase` steht, die
Ordnerprüfungen dafür entfallen, und die beiden Fundstellen ohne sie
auskommen.

### 20 · In `bereich-app.js` darf noch ein Satz stehen
Für `monat-app.js` und `wahl-app.js` bricht der Bau ab, sobald dort ein
Satz steht — daraus entstand seinerzeit „liegt auf deinen Ausdruck".
`bereich-app.js` trägt weiter eigene Sätze: den Hinweis auf ein fehlendes
Profil, den Satz über einen Stichtag vor der Geburt, die Zeile über die
drei Seiten eines Bereichs. Beim Tiefgang sind heute fünf solche Sätze
nach `bereich-daten.js` gewandert; die übrigen warten.
**Fertig, wenn:** alle Sätze aus `bereich-app.js` in `bereich-daten.js`
stehen und `bau-bereiche.py` abbricht, sobald dort wieder einer auftaucht —
dieselbe Prüfung, die `wahl-app.js` schon hat.

### 21 · „Heute" sagt über jeden Menschen zu viel Gleiches
Gemessen am 2026-10-23 mit zwei sehr verschiedenen erfundenen
Geburtsbildern: Auf `index.html` sind 67 von 100 Sätzen wortgleich. Besser
als „Ich" vorher, aber die Seite nennt nur den lautesten Bereich und einen
Handgriff; der Rest gilt für alle. Dazu steht dort „Der Mond steht in
Fische 26 Grad 44 und läuft durch das 2." mitten im Laientext — Mechanik,
die in `ac-tech` gehört.
Gehört in einen Zug mit Aufgabe 17 und 18, die beide dieselbe Seite
betreffen; zweimal anfassen wäre doppelte Arbeit.
**Fertig, wenn:** „Heute" zu jedem Vorgang sagt, welche Anlage dieses
Menschen er trifft (wie der Monatsbericht seit dem 21.10.), die Mechanik
in `ac-tech` wartet, und `bau-heute.py` wie `bau-ich.py` seit heute fünf
erfundene Bilder zeichnet und abbricht, wenn im Schnitt mehr als ein
Viertel der Kernaussagen wortgleich ist.

### 22 · Der Index auf „Ich" kennt die Bereichsseite nicht
`bau-ich.py` meldet als Hinweis: `bereiche.html` rechnet mit einem Profil,
steht aber nicht im Index „Alles, was es zu dir gibt". Die Bereichsseite
ist einer der fünf Hauptpunkte der Navigation — wer den Index für
vollständig hält, übersieht sie.
**Fertig, wenn:** die Bereichsseite im Index steht und der Hinweis beim
Bauen ein Fehler wird statt eines Hinweises, damit die nächste fehlende
Seite nicht wieder nur eine Zeile im Protokoll ist.

### 23 · Die App-Ansicht endet an den 108 Handarbeitsseiten
Seit heute binden die 17 gebauten Seiten Manifest und Zwischenspeicher
ein. Die 108 Seiten, die `pruefe-alles.py` als `HANDARBEIT` führt, tun es
nicht — sie haben keine Quelle, in die die Zeilen gehörten. Wer über eine
von ihnen auf die Seite kommt, bekommt kein Angebot, sie aufs Telefon zu
legen, und nach einem Verbindungsabbruch bleibt sie leer. „Installierbar"
ist damit eine Eigenschaft von 17 Seiten, nicht der Plattform — dieselbe
Lücke wie bei der Stufenleiste in Aufgabe 16.
**Fertig, wenn:** auch die Handarbeitsseiten den Block aus
`app/app-kopf.html` tragen — entweder weil sie ins Bausystem gewandert
sind oder weil ein Bauskript sie an dieser einen Stelle nachrüstet — und
die Ausnahmeliste in der zehnten Querprüfung schrumpfen kann statt zu
bleiben.

### 24 · Niemand erfährt, dass man die Seite aufs Telefon legen kann
Das Manifest liegt, der Zwischenspeicher läuft, und kein Satz auf der
Plattform sagt es. Auf dem Telefon versteckt der Browser das Angebot in
einem Menü, das die wenigsten öffnen; eine Stufe, von der niemand weiß,
ist keine Stufe. Nach `PRODUKT.md` Abschnitt 5 ohne Dringlichkeit und
ohne Verkaufston — ein Hinweis, der einmal erscheint und sich wegtippen
lässt.
**Fertig, wenn:** die Startseite in zwei Sätzen sagt, was das Ablegen auf
dem Telefon bringt und dass dabei nichts an einen Server geht, der Text
aus einer Datendatei kommt, ein Wegtippen dauerhaft gilt, und der Bau
abbricht, wenn der Hinweis beim zweiten Besuch wieder auftaucht.

### 25 · Die Stufe-0-Prüfung steht in sechs Ordnern einzeln
Beim Anbinden der Raumseiten ist aufgefallen: Die Liste der Wörter, die
auf Stufe 0 nicht sichtbar sein dürfen, liegt heute in sechs `bau-*.py`
je für den eigenen Ordner, in drei `_test-*.js` noch einmal und seit
heute auch in `pruefe-alles.py`. Solange die Kopien gleich sind, fällt
nichts auf; sobald eine gepflegt wird, gilt auf einer Seite ein Fachwort
als Fachwort und auf der nächsten nicht. Dieselbe Fehlerklasse wie bei
der Himmelsrechnung und der Bereichsliste — und dieselbe wie Aufgabe 19
beim `toLowerCase`.
**Fertig, wenn:** die Liste an einer Stelle steht, die Python und
JavaScript beide lesen können, die Kopien gelöscht sind, und
`pruefe-alles.py` abbricht, sobald irgendwo im Quelltext eine zweite
Liste mit Planetennamen und Zeichennamen auftaucht.

### 26 · Die Raumseiten sagen nicht, zu welchem Bereich sie gehören
Von der Bereichsseite führt seit heute ein Weg zu jedem Themenraum,
aber nicht zurück: Wer auf `raum-naehe.html` landet, erfährt nicht, dass
dasselbe Thema auf `bereiche.html` mit Datum und Handgriff steht. Der
Fuß der Raumseiten verweist auf `raeume.html` und auf eine passende
Nachbarseite — die Bereiche fehlen.
**Fertig, wenn:** jede der zwölf Raumseiten unten auf ihren Bereich
verweist, die Zuordnung dieselbe Quelle benutzt wie der Weg hin
(`B_RAUM.zu`, nicht eine zweite Liste), und `pruefe-alles.py` abbricht,
sobald eine Raumseite keinen Rückweg hat.

### 27 · „Haus" steht auf der Ich-Seite noch auf Stufe 0
Seit dem Umbau vom 27.10. warten Grad, Zeichen und Anlagennamen auf der
Ich-Seite in `ac-tech`, und `bau-ich.py` prüft das über den gerenderten
Text der ganzen aufgeklappten Seite. Für „Haus" gilt das noch nicht: Die
Überschrift eines aufgeklappten Feldes heißt „7. Haus — Partnerschaft",
und die Weiterverweise nennen „Alle Häuser". `REGELN.md` Abschnitt 2
schließt das Wort auf Stufe 0 aus.
**Fertig, wenn:** auf Stufe 0 nirgends auf der Ich-Seite „Haus",
„Häuser" oder „Hauses" sichtbar ist, die Wörter stattdessen in `ac-tech`
warten, und die Prüfung in `bau-ich.py`, die heute Grad, Zeichen und
Anlagen abfängt, auch diese drei Wörter führt. Der Stufenschalter, der
der Ich-Seite bis zum 27.10. ganz fehlte, gehört zu Aufgabe 16.

### 28 · In `ich-app.js` stehen noch Sätze
`bau-ich.py` fängt seit dem 23.10. jeden Satz ab, der in
`ich-rechner.js` steht statt in `ich-daten.js` — dieselbe Fehlerklasse
wie bei `tief-bauer.js` und `monat-app.js`. Die Anzeige wird dabei nicht
angesehen, und dort steht noch welches: „Heute auf deinem Chart",
„Gerade steht nichts in deinen Häusern", „Kein Planet steht hier — das
ist der Normalfall …", „Die Frage, die es aufmacht", „Noch kein Profil
angelegt". Diese Sätze liest keine Prüfung, also kann sie auch niemand
auf Stufe 0 prüfen — und beim Umzug nach `PRODUKT.md` Abschnitt 7
wandern sie nicht mit, weil sie in der Anzeige hängen.
**Fertig, wenn:** diese Sätze in `ich-daten.js` stehen, in der
Laienprüfung mitlaufen, und `bau-ich.py` `ich-app.js` mit derselben
Suche abfängt wie `ich-rechner.js` — ein neuer Satz in der Anzeige
bricht den Bau.

### 29 · Die geratene Geburtszeit ist nirgends vermerkt
Vier Stellen nehmen eine Geburtszeit an. `tool.html` und `ankommen.js` sagen,
was eine geratene Zeit kostet; `chart-rechner.html` warnt nur vor der
Zeitzone; `profile.html` trägt 12:00 vor und sagt nichts dazu — und das ist
die Seite, auf die 123 der 126 ausgelieferten Seiten verweisen, auch die
Leerzustände von Heute, Dossier und Geistführung. Gespeichert wird die Zeit
wie jede andere Angabe; kein Schlüssel hält fest, dass sie geraten war. 43
ausgelieferte Dateien benutzen `haus(`. Siehe Recherche vom 2026-10-28,
Spur C: Bei vier erfundenen Geburten an deutschen Breiten trifft 12:00 das
Aszendenten-Zeichen nur in einem Fenster von 50 bis 173 Minuten; liegt es
falsch, wandert jeder Punkt um dieselbe Zahl von Häusern weiter und mit ihm
die Reihenfolge der zehn Bereiche.
**Fertig, wenn:** `profile.html` am Zeitfeld sagt, was eine geratene Zeit
kostet, das Profil einen Vermerk darüber führt, ob die Zeit geraten ist, die
Seiten, deren Kernaussage an den Häusern hängt, diesen Vermerk in einem Satz
anzeigen, und `pruefe-alles.py` abbricht, sobald eine ausgelieferte Seite
`haus(` benutzt und den Vermerk nicht liest.

### 30 · Die Berliner Platzvergabe ist keine Warteliste
`diagnose-weg.html` beschreibt für Berlin eine „gemeinsame zentrale
Warteliste" der vier Autismus-Spezialambulanzen. Die vier Stellen, die eine
Anmeldung über die Spezialambulanz der Humboldt-Universität und der erste
Mittwoch eines Quartals stimmen; das Verfahren nicht — vergeben wird per
Zufallsverfahren, verteilt wird nach organisatorischen Kriterien, eine Wahl
der Stelle gibt es nicht, und Rückmeldung bekommt nur, wer einen Platz
erhält. Damit gilt Schritt 4 derselben Seite („gleichzeitig überall
anmelden, absagen sobald ein Termin sicher ist") dort gerade nicht. Siehe
Recherche vom 2026-10-28, Spur C.
**Fertig, wenn:** der Berlin-Absatz das Verfahren benennt, Schritt 4 Berlin
ausdrücklich ausnimmt, Quelle und Abrufdatum auf der Seite stehen, und wer
den Absatz liest, weiß, was er als Nächstes tut.

### 29 · Die Prüfung auf Stufe 0 misst an ausgeblendeten Abschnitten
Beim Reparieren von „Schlaf und Bewegung“ am 29.10. aufgefallen: Die
Rauchprobe in `bau-heute.py` klickt vorher auf „Wenig“, und das blendet
mehrere Abschnitte aus. Die Zählungen `t0` und `t3` danach messen deshalb
an einer Seite, auf der die Hälfte gar nicht gerendert ist — sie können
nicht mehr finden, was dort stehen würde. „Auf Stufe 0 keine Fachsprache“
ist damit für die hinteren Bänder nicht geprüft, sondern nur gehofft.
**Fertig, wenn:** `t0` und `t3` an der vollständig eingeblendeten Seite
gemessen werden, die Zählung `checkVisibility()` benutzt statt
`offsetParent`, und ein absichtlich sichtbar gemachtes Fachwort in einem
der hinteren Bänder den Bau bricht.

### 30 · Zwei Seiten erklären dasselbe — die nächsten Paare sind ungeprüft
Aufgabe 5 hat zwei Paare angesehen und eine doppelte Tafel abgeräumt.
`pruefe-alles.py` hält seit heute die Stellen fest, an denen die fünf
Winkel ausgelegt werden dürfen — für jede andere Doppelung gibt es nichts
Vergleichbares. Bei 108 Handarbeitsseiten ist das nächste Paar nur eine
Frage der Zeit.
**Fertig, wenn:** eine Querprüfung die ausgelieferten Seiten paarweise auf
wörtlich gleiche Absätze ab einer bestimmten Länge vergleicht, die
bekannten und gewollten Dopplungen namentlich eingetragen sind, und eine
neue Dopplung den Bau bricht.

---

## Erledigt

* **2026-10-30** · Facetten auch in unbesetzten Bereichen gewichtet
  (Aufgabe 8). Jeder der zehn Bereiche hat zwei Facetten am selben Feld —
  in Geld hängen „Was reinkommt" und „Wie du damit umgehst" beide am
  Kernfeld. Stand dort natal nichts, bekamen beide dasselbe Gewicht, und
  dann entschied die Reihenfolge in `bereich-daten.js`, welche oben steht.
  Die Seite sagt aber, die Reihenfolge komme aus dem Geburtsbild.
  Jetzt wird ein unbesetztes Feld über seinen Herrn gelesen, wie es das
  Fach seit Jahrhunderten tut: Gehört der Herr des Feldes selbst zur
  Facette, steht er in einem Feld des Bereichs, berühren ihn die Punkte
  der Facette im Winkel — daraus kommt ein zweites Gewicht. Bleibt auch
  das gleich, entscheidet ein drittes: wie dicht die Punkte einer Facette
  im Bild beieinanderstehen. Weil dieser Wert stetig ist, sind zwei
  Facetten nie mehr gleich schwer.
  Die dauerhafte Prüfung in `bau-bereiche.py` prüft nicht den Einzelfall,
  sondern die Eigenschaft: Über 1.200 erfundene Geburtsbilder hinweg darf
  kein Paar von Facetten auf allen Gewichten gleich liegen, und die
  unbesetzten Bereiche müssen oft genug anders sortieren als die
  Textdatei. Beides bricht den Bau ab, wenn es kippt. Auf Wissensstufe 2
  nennt die Mechanik jetzt den Herrn des Feldes, statt nur eine Zahl
  hinzuschreiben.

* **2026-10-29** · Die doppelten Seitenpaare angesehen (Aufgabe 5). Beide
  Paare bleiben zwei Seiten, und beide sagen das jetzt selbst: Auf jeder
  der vier steht ein Satz, wofür die Nachbarseite da ist.
  `aspekte.html` ist die Lektion (was die fünf Winkel sind, mit Beispielen
  und Spielraum), `aspekte-lesen.html` das Nachschlagewerk für 45
  Planetenpaare. `chart-lesen.html` ist eine Methode — in welcher
  Reihenfolge man liest —, `bausteine.html` ein Nachschlagewerk für die
  Teile. Eine Methode liest man einmal, ein Nachschlagewerk schlägt man
  immer wieder auf; das zusammenzulegen hätte beides schlechter gemacht.
  Eine echte Doppelung war darunter: Die fünf Winkel wurden auf zwei
  Seiten erklärt, mit verschiedenen Worten. Auf `aspekte-lesen.html` ist
  die Spalte „Was es tut“ jetzt weg — die Tafel dort sagt nur noch,
  welcher Winkel welche Farbe im Chart hat, und das ist genau das, was
  diese Seite braucht. Die Bedeutung steht einmal, auf `aspekte.html`.
  Fehlerklasse abgestellt, als zwölfte Querprüfung in `pruefe-alles.py`:
  Ob zwei Texte dasselbe sagen, kann keine Prüfung entscheiden — aber sie
  kann die Stellen festhalten, an denen die fünf Winkel überhaupt
  ausgelegt werden dürfen. `TAFEL_ERLAUBT` führt drei (Lektion,
  Farbschlüssel, Wörterbuch), jede mit einem Satz Begründung, und die
  Liste bricht in beide Richtungen: eine vierte Seite mit der Tafel ist
  ein Fehler, eine eingetragene ohne sie auch. Dieselbe Bauart wie
  `HANDARBEIT`.

* **2026-10-29** · `main` war rot, und zwar an der Prüfung, nicht an der
  Seite. Seit dem Zusammenführen vom 28.10. meldete `bau-heute.py`:
  „‚Schlaf und Bewegung‘ zeigt die Mechanik schon auf Stufe 0.“ Die Seite
  tut das nicht — auf Stufe 0 steht dort „Der Mond läuft heute über deine
  Sonne“ und sonst nichts. Gemessen wurde nur zum falschen Zeitpunkt: Der
  Block lief, bevor die Rauchprobe den Wissensstand überhaupt auf 0
  gestellt hatte, also auf dem Auslieferstand — und dort soll die Mechanik
  zu sehen sein.
  Zwei Messfallen stecken darin, beide notiert, wo sie passiert sind:
  `offsetParent` taugt nicht als Sichtprüfung, weil ein Kind in einer
  zugeklappten Klappe weiter eine Box und einen offsetParent hat — jetzt
  `checkVisibility()`. Und `innerText` taugt es auch nicht, solange der
  Abschnitt selbst ausgeblendet ist: Dann gibt er den rohen Textinhalt
  zurück, samt allem, was gerade versteckt ist. Der Klick auf „Wenig“
  kurz davor tat genau das. Für die Messung wird deshalb kurz wieder
  alles eingeblendet und danach zurückgestellt.
  Geprüft in beide Richtungen: Auf der richtigen Seite meldet die Prüfung
  nichts mehr, und eine absichtlich sichtbar gemachte Mechanikzeile bricht
  den Bau weiter.
  Dass dieselbe Falle noch an zwei weiteren Stellen derselben Rauchprobe
  sitzt, steht als Aufgabe 29.

* **2026-10-28** · Die Coachin-Sicht steht jetzt auf der Seite (Aufgabe 4).
  Die drei Gesprächsfragen und die Grenze gab es für alle zehn Bereiche
  schon — sie gingen aber nur in den Tiefgang, also in eine Datei, die man
  erst anfordern muss. Wer die Seite las, bekam genau den Teil nie zu
  sehen, der aus einem Befund ein Gespräch macht. Jetzt sitzt unter den
  fünf Blöcken jedes Bereichs eine zugeklappte Schublade „Mit jemand
  anderem darüber sprechen": drei Fragen, und darunter, was dieser Bereich
  über einen Menschen nicht weiß. Zugeklappt, weil die zweite Sicht nie im
  Vordergrund steht — und ohne Schloss, denn die Klappe hält die Fragen aus
  dem Weg, nicht zurück.
  Die dauerhafte Prüfung misst am gezeichneten Ergebnis und auf Stufe 0,
  nicht an den Daten: Eine Prüfung, die nur die Datei liest, hätte den
  Mangel nie gemerkt — die Fragen standen dort ja. Sie fällt durch, wenn
  eine Klappe fehlt, offen steht, auf Stufe 0 unsichtbar ist, nicht genau
  drei Fragen trägt, die Fragen eines anderen Bereichs zeigt, die Grenze
  nicht mitbringt oder irgendwo eine Diagnose stellt. Alle sechs Fälle
  wurden einzeln ausprobiert, bevor sie eingebaut wurden.
  Ein Fund nebenbei: `_test-bereich.js` lief über alle Schlüssel von
  `B_FRAGEN` statt über die zehn Bereiche. Solange die beiden gleich waren,
  fiel das nicht auf. Jetzt läuft die Prüfung über die Bereiche — damit
  prüft sie ohnehin das Richtige, nämlich dass keiner fehlt.

* **2026-10-27** · Die Ich-Seite umgebaut (Aufgabe 1). Sie begann mit
  dem Chartrad und führte darunter mit Zeichen und Gradzahl — und war
  auf dem Telefon 12.496 Pixel hoch, fünfzehn Bildschirme am Stück ohne
  eine Möglichkeit zu springen. Jetzt steht im ersten Bildschirm ein
  Satz über diesen Menschen, genommen aus dem seltensten Befund und
  ohne ein Fachwort: „Zwei Dinge in dir arbeiten zusammen, ohne dass du
  etwas dafür tust …" Darunter kommt „Was an dir auffällt" als erster
  Abschnitt, dann die drei tragenden Stellen — erst, worum es im Leben
  geht, dann der Lebensbereich, und Grad und Zeichen warten. Alles
  Nachschlagbare liegt in Klappen: das Rad, die zwölf Felder, die
  Verbindungen, das Regal. Die Seite ist damit 3.766 Pixel hoch, weniger
  als ein Drittel, und oben läuft eine Sprungzeile mit.
  Zwei Funde nebenbei. Die Seite hatte keinen Stufenschalter: `niveau.js`
  setzt ihn nur ein, wo ein Platzhalter steht oder ein `.wrap` existiert,
  und die Ich-Seite hat `.ich-wrap`. Alles, was dort in `ac-tech`
  wartete, wäre für immer unsichtbar geblieben. Und auf jeder Karte im
  Abschnitt „Was zusammenhängt" stand nur die Formel: Der Satz dazu
  wurde geholt und unter einem Namen gesucht, den es in
  `aspekte-daten.js` nie gab, also fiel er jedes Mal lautlos weg. Jetzt
  steht dort, worum es geht, Karten ohne Satz entfallen, und daneben
  steht, wie viele Winkel insgesamt gerechnet sind — eine Auswahl, die
  sich nicht als Ganzes ausgibt.
  Fehlerklassen abgestellt, alle in `bau-ich.py`: die Seite höher als
  6.248 Pixel auf 390 Pixeln; ein Gradzeichen, ein Zeichen- oder
  Anlagenname auf Stufe 0 sichtbar — gemessen am gerenderten Text der
  ganzen aufgeklappten Seite, inklusive eines aufgeklappten Feldes, denn
  eine Klappe ist kein Versteck; ein Abschnitt mit Sprungmarke ohne ID;
  eine Sprungmarke ohne Ziel, ohne Aufschrift oder unsichtbar; ein
  Sprung, der die Seite nicht bewegt oder in eine geschlossene Klappe
  führt; eine Klappe, die beim Laden offen steht; eine Seite ohne
  Stufenschalter oder mit einem, auf dem die Mechanik trotzdem nicht
  erscheint; ein sichtbarer Kasten ohne ein Wort darin; ein seitlicher
  Überlauf bei offenen Klappen; zwei klebende Zeilen übereinander,
  gemessen im gescrollten Zustand, weil am Seitenanfang jede falsche
  Einstellung richtig aussieht; derselbe Satz im Kopf bei fünf
  verschiedenen Geburtsbildern; ein Satz im Kopf ohne Lücke oder mit
  Fachwort; und `section`, `nav` und `details`, die nicht aufgehen —
  bisher wurde nur `div` gezählt. Zehn absichtlich eingebaute Fehler,
  alle zehn erkannt.
  Offen geblieben: „Haus" steht auf Stufe 0 noch sichtbar (Aufgabe 27),
  und in `ich-app.js` hängen weiter Sätze, die keine Prüfung liest
  (Aufgabe 28). Wie viele andere Seiten denselben fehlenden
  Stufenschalter haben, ist nicht gezählt — das gehört zu Aufgabe 16.

* **2026-10-26** · Die Sprache der Bereichstexte umgeschrieben. 32 Texte in
  `bereich-daten.js`, dazu zwei Logikfehler in der Anzeige: Der Satz „Gerade
  zieht nichts Großes daran" stand auch dann da, wenn darunter drei laufende
  Sachen aufgezählt wurden, und die lange Linie nannte Monatsdaten bis zu
  zehn Jahre voraus. Drei dauerhafte Sprachprüfungen dazu.
* **2026-10-25** · Die alten Raumseiten hängen an den Bereichen
  (Aufgabe 3). Zehn lange Texte lagen seit den Anfängen da — „Warum
  nehme ich eigentlich zu wenig?", „Warum wiederholt sich das immer?" —
  und waren von der Bereichsseite aus nicht erreichbar: Wer beim
  lautesten Bereich ankam und weiterlesen wollte, fand sie nicht. Jetzt
  steht unter jedem Bereich, welche lange Seite dazugehört und was auf
  ihr steht, in Alltagssprache und auf der untersten Stufe sichtbar.
  Zwei Bereiche dürfen auf dieselbe Seite zeigen: „Warum nehme ich
  eigentlich zu wenig?" ist eine Frage nach dem Geld und eine nach dem
  eigenen Wert. Dazu die zweite Hälfte: Auf den Karten der
  Raumübersicht stand unter dem Namen „2. Haus, Venus, Saturn, Lilith" —
  also woran man es abliest, an der Stelle, wo stehen soll, wovon die
  Seite handelt. Die Seite selbst sagt zwei Kästen weiter unten, dass
  die Räume nach der Frage heißen und nicht nach der Technik; genau das
  gilt nun auch für die Karten. Die Mechanik wartet jetzt in `ac-tech`
  und erscheint ab der zweiten Stufe, und wo eine Karte Lebenssprache
  und Mechanik in einer Zeile mischte („Essen, Trinken, Papierkram …"),
  bleibt der Lebensteil stehen. Fehlerklassen abgestellt: ein Bereich
  ohne Verweis; ein Verweis auf eine Seite, die es nicht gibt; ein
  Themenraum in `wiki/`, auf den niemand zeigt (gemessen an der
  gebauten Seite, nicht an den Daten); ein Verweis, der in der Mechanik
  wartet und deshalb auf Stufe 0 unsichtbar ist; zwei Räume mit
  demselben Satz beschrieben; ein Dateiname im Anzeigeskript statt in
  den Daten; und Maschinenraum im Titel einer Raumseite — das als
  elfte Querprüfung über alle dreizehn Raumseiten, weil diese Seiten
  Handarbeit sind und kein eigenes Bauskript haben, das es prüfen
  könnte. Ein Fund an der eigenen Prüfung dabei: Die Stufe-0-Prüfung
  stand mitten in `bau-bereiche.py`, und alles, was danach noch Sätze
  sammelte, lief an ihr vorbei — die Sätze der Auswahlleiste taten das
  seit dem 22. Oktober unbemerkt. Die Prüfung steht jetzt hinter dem
  letzten Sammler, und die Liste wird danach zugemacht, damit ein
  späterer Sammler den Bau abbricht statt lautlos durchzukommen. Und
  weil eine Wartemarke nur wartet, wenn jemand die Stufe anwendet,
  bricht die Querprüfung auch ab, wenn eine Raumseite Wartemarken
  trägt, aber den Wissensstand nicht lädt — im Markup sähe sonst
  alles richtig aus und die Mechanik stünde trotzdem offen da. 3455
  Prüfungen im Bereichsrechner, vierzehn absichtlich eingebaute Fehler
  alle erkannt.

* **2026-10-24** · Die App-Ansicht (Aufgabe 2, Stufe 2 aus `PRODUKT.md`
  Abschnitt 7). Die Seite lässt sich aufs Telefon legen: eigenes Symbol in
  den Markenfarben, Vollbild ohne Browserleiste, und was man einmal offen
  hatte, steht auch ohne Netz noch da. Kein Framework, kein Bauwerkzeug —
  die vier Symbole entstehen beim Bauen aus zwei Kreisen und zlib, damit
  der Bau auf jedem Rechner mit Python läuft und nicht an einem
  Bildprogramm hängt. Der Zwischenspeicher fragt bewusst erst das Netz und
  dann sich selbst: Andersherum wäre er schneller, würde aber alte Texte
  als heutige ausgeben, und das ist genau die stille Übertreibung, die
  `PRODUKT.md` Abschnitt 3 ausschließt. Die Startseite legt er schon beim
  Anmelden ab, weil der erste Seitenaufruf noch an ihm vorbeiläuft — sonst
  wäre nach dem ersten Besuch ausgerechnet die Seite nicht da, von der aus
  man weitergeht. Ist eine Seite gar nicht da, kommt `offline.html` statt
  einer Browserfehlermeldung: was los ist, was trotzdem geht, und dass
  ohnehin das eigene Gerät rechnet und kein Server. Neu ist dabei vor
  allem eine Stelle statt sechzehn: Die Zeilen, mit denen eine Seite
  Manifest, Symbol und Zwischenspeicher einbindet, stehen allein in
  `app/app-kopf.html`; jedes `bau-*.py` setzt sie mit einer Zeile ein, und
  geprüft wird am Ergebnis, nicht in den Bauskripten. Fehlerklassen
  abgestellt: eine gebaute Seite ohne App-Ansicht; eine Seite mit einer
  eigenen halben Fassung des Blocks; ein Symbol, das das Manifest nennt
  und das es nicht gibt; ein Symbol, dessen wirkliche Größe nicht zu der
  passt, die das Manifest behauptet (gelesen wird aus der Datei, nicht aus
  dem Dateinamen); zwei Orte für die Markenfarbe, die auseinanderlaufen;
  ein Zwischenspeicher, der zuerst in sich selbst greift; ein `sw.js`
  oben, das von seiner Quelle abweicht; ein Satz im Anzeigeskript statt in
  den Daten; ein halber oder fehlender Text; Fachsprache auf Stufe 0. Dazu
  ein Fund an der eigenen Prüfung: Die Rauchprobe war beim ersten Anlauf
  grün und blind — der Browser hat seinen eigenen Zwischenspeicher, und
  der lieferte die Seite ohne Netz auch dann aus, wenn `sw.js` nichts
  getan hatte. Der Prüfserver schickt jetzt `no-store`; was ohne Netz noch
  steht, steht wirklich wegen `sw.js`. Die Probe schaltet das Netz ab und
  prüft dreierlei: die besuchte Seite steht noch, die Startseite auch, und
  eine nie besuchte zeigt die Ohne-Netz-Seite statt eines Abbruchs — und
  mit Netz ist wieder die frische Seite da. Siebzehn absichtlich
  eingebaute Fehler alle erkannt.
* **2026-10-23** · „Ich" sagt endlich etwas über diesen einen Menschen.
  Mandys Befund: Die Aussagen seien vage und unpersönlich. Nachgemessen mit
  zwei sehr verschiedenen erfundenen Geburtsbildern: 86 von 100 Sätzen
  waren wortgleich, und was sich unterschied, waren Aufzählungen von
  Fachbegriffen („7. Haus (Partnerschaft): Mars, Jupiter") — also gar keine
  Sätze. Ursache: zwölf Haustexte und zwölf Anlagensätze, jeder für sich
  allgemeingültig geschrieben und zusammengeklebt; die Kombination erreichte
  nie einen Satz. Neu ist der Abschnitt „Was an dir auffällt": vier Befunde,
  der seltenste zuerst — wo sich bei diesem Menschen die Anlagen häufen, wo
  sich sein erster Eindruck entscheidet, welche zwei Anlagen bei ihm
  aufeinandertreffen, und wie viele bei seiner Geburt rückwärts liefen.
  Jeder Befund nennt eine gerechnete Häufigkeit: Die Tabelle wird beim Bauen
  aus 10.000 erfundenen Geburtsbildern abgezählt, mit festem Startwert,
  damit zwei Bauläufe dieselbe Zahl ergeben. Dabei fiel ein Fehler im
  eigenen Entwurf auf: „fast auf den Grad genau" hätten 60 von 100 Menschen,
  weil der engste von 66 Winkeln fast immer eng ist — die Schwelle ist jetzt
  an der Abtastung geeicht statt geraten. Gemessen nachher: 5 Prozent
  wortgleiche Kernaussagen im Schnitt über zehn Paare, schlimmstes Paar 25.
  Dazu, weil es dieselbe Stelle betraf: Die Winkelrechnung ist aus der
  Anzeige in `ich-rechner.js` gewandert, damit die Abtastung dieselbe
  Rechnung benutzt und nicht eine zweite Fassung. Fehlerklassen abgestellt:
  ein Satz ohne Lücke, der wieder für jeden gilt; eine Anlage, die als
  Planetenname statt als Rolle erscheint; Fachsprache auf Stufe 0; eine
  Mechanikzeile ohne Wartemarke; ein fehlender Häufigkeitssatz; eine
  Abtastung, die nichts liefert; ein Satz im Rechner statt in den Daten; ein
  ehrlicher Teil ohne den Vorrang des eigenen Erlebens; eine Tausenderzahl
  ohne deutsche Trennung. Die wichtigste davon ist die erste: `bau-ich.py`
  zeichnet bei jedem Bau fünf erfundene Bilder und bricht ab, sobald im
  Schnitt mehr als ein Viertel der Kernaussagen wortgleich ist. Neun
  absichtlich eingebaute Fehler alle erkannt.
* **2026-10-23** · Überblick und Tiefgang getrennt (Aufgabe 1). Die Seite
  zeigt den Überblick: was los ist, was du tun kannst, wie lange es läuft.
  Der Tiefgang ist dieselbe Rechnung, zu Ende geschrieben — woher ein Thema
  bei diesem Menschen kommt, alle Facetten statt der ersten drei, was sich
  darin widerspricht, drei Gesprächsfragen und eine Grenze, dazu der
  ehrliche Teil. Je Bereich ein Knopf und einer für alle gewählten; der
  Text entsteht beim Antippen auf dem Gerät und geht als Datei heraus,
  statt auf der Seite zu stehen. Kein Schalter, der Freischalten
  vortäuscht: Die Seite sagt selbst, dass sie keinen Server hat und jedes
  Schloss hier gemalt wäre. Der Wissensstand gilt auch für die Datei — auf
  der untersten Stufe kommt sie ohne ein einziges Fachwort heraus, sonst
  wäre „verständlich auf jeder Stufe" ein Versprechen, das die Seite hält
  und die Datei bricht. Neu gerechnet werden die Widersprüche: zwei
  natale Punkte in den Feldern eines Bereichs im harten Winkel, ein
  reibender und ein tragender Vorgang zur selben Zeit, und ein Kapitel,
  das mit seinem eigenen Abschnitt nicht übereinstimmt. Findet die
  Rechnung keinen, steht genau das da. Fehlerklassen abgestellt: ein
  Tiefgang, dem einer seiner Teile fehlt; eine Gesprächsfrage, die eine
  Diagnose stellt; ein Widerspruch, der zweimal denselben Satz ergibt
  (daran fielen zwei natale Paare zwischen denselben beiden Feldern auf);
  ein Widerspruch, der erfunden oder verschwiegen wird; ein Satz im
  Tiefgang-Bauer statt in den Daten; ein Fachwort in einer Datei, die auf
  Stufe 0 erzeugt wurde; ein Knopf, der keine Datei schreibt; ein
  Tiefgang, der doch auf der Seite steht; und ein Wort wie
  „freischalten" im Code oder im Markup. Zwei Funde beim Prüfen selbst:
  die Rauchprobe platzte bei einem Abbruch mit einem unlesbaren
  Node-Stapel, statt zu melden, was sie nicht mehr erreicht hat — und die
  Rechenprüfung rechnete ohne die langen Kapitel, weshalb die dritte
  Sorte Widerspruch dort nie entstand und ihre Prüfung grün und blind
  war. Beides ist abgestellt, samt einer Prüfung, dass jede Sorte in den
  Probebildern wirklich vorkommt. 3455 Prüfungen im Bereichsrechner,
  vierzehn absichtlich eingebaute Fehler alle erkannt.
* **2026-10-22** · Erster Vorsprung in `PRODUKT.md` nachgeschärft (Aufgabe 16,
  aus der Recherche vom 21.10.): Die Paarsicht allein ist kein Vorsprung —
  The Pattern und Co-Star haben sie. Was dort fehlt, ist der Handgriff, das
  Zeitfenster mit Datum, die eigene Grenze und die Sicht der Coachin. Dazu
  die Einordnung, dass Co-Star offen astrologisch spricht und The Pattern
  der nähere Wettbewerb ist, weil es die Fachsprache meidet.

* **2026-10-22** · Die Besucherin wählt ihre Bereiche. Neben dem
  Wissensstand steht jetzt eine zweite Leiste: zehn Bereiche und „alle
  zehn". Die Auswahl liegt in `AC_P` neben dem Profil, gilt deshalb
  plattformweit und nicht pro Seite, und keine Auswahl heißt weiter alle.
  Die Bereichsseite zeigt nur noch die gewählten, der Kurzblick auf der
  Startseite auch, und der Monatsbericht nennt zuerst die Vorgänge, die
  in einem gewählten Bereich liegen. Was die Seite dabei nicht tut, ist
  das verschweigen: die Leiste sagt, dass die übrigen Bereiche
  ausgeblendet und nicht ruhig sind, und läuft in der Auswahl in einem
  Monat nichts, sagt der Brief das, statt einen Vorgang von außerhalb als
  den Monat auszugeben. Die zehn Bereiche stehen nicht mehr im Rechner,
  sondern allein in `bereiche/lebensbereiche.js` — drei Seiten brauchen
  sie, und eine zweite Kopie wäre derselbe Fehler wie früher bei der
  Himmelsrechnung. Fehlerklassen abgestellt: eine Seite, die die Leiste
  zeigt, sich aber nicht nach ihr richtet, kommt nicht durch den Bau;
  eine Seite, die die Bereiche nennt, ohne sie wählen zu lassen, auch
  nicht; eine Auswahl mit eigenem Speicherschlüssel statt bei den
  Profildaten fällt auf; ein unbekannter Bereich im Speicher bedeutet
  „alle" statt einer leeren Seite; der letzte gewählte Bereich lässt sich
  nicht abwählen; ein Satz in `wahl-app.js` statt in `wahl-daten.js`
  bricht den Bau; eine zweite Bereichsliste irgendwo im Quelltext bricht
  ihn auch. Und eine Fehlerklasse, die beim Arbeiten auffiel: `niveau.js`
  und `wortwahl.js` liegen zweimal im Projekt — einmal als Quelle, einmal
  oben, wo die Seiten sie laden —, und niemand kopiert sie; seit heute
  bricht die Prüfung ab, sobald zwei Fassungen auseinanderlaufen. 257
  Prüfungen im Bereichsrechner, 1904 im Monatsrechner, neun absichtlich
  eingebaute Fehler alle erkannt.
* **2026-10-21** · Der Monatsbericht sagt, was bei DIESEM Menschen los ist.
  Zu jedem laufenden Vorgang steht jetzt im Brief, welche Anlage dieses
  Menschen er trifft („deinen Antrieb — die Kraft, mit der du anfängst"),
  in welchem Lebensbereich sie bei ihm liegt, und was die Bewegung dort
  macht. Dazu sagt der Brief, was bei diesem Menschen überhaupt in dem
  Bereich liegt, auf den der Monat zeigt — bei den meisten liegt dort
  nichts, und auch das steht da, statt verschwiegen zu werden. Die
  Beschreibungen der Bewegungen sind nach Winkelart getrennt: vorher stand
  „Es ist gerade zäh" auch über einem tragenden Winkel, dessen eigener
  Absatz von Halt sprach. Fehlerklassen abgestellt: jede Anlage nennt ihr
  Geschlecht, und erster und vierter Fall müssen daraus folgen — damit ist
  „liegt auf deinen Ausdruck" nicht mehr Sorgfalt, sondern unmöglich; eine
  Lücke, die den vierten Fall verlangt, darf nur aus der Form für den
  vierten Fall gefüllt werden; reibende und tragende Fassung dürfen nicht
  gleich sein; und läuft etwas, muss der Brief eine Anlage nennen. 1813
  Prüfungen im Rechner, elf absichtlich eingebaute Fehler alle erkannt.
* **2026-10-20** · Der Monatsbericht kommt aus dem Bausystem: `monat/` mit
  `bau-monat.py`, getrennt in Rechnen (`monat-rechner.js`), Texte
  (`monat-daten.js`) und Anzeige (`monat-koerper.html`, `monat-stil.css`,
  `monat-app.js`). Die zweite Himmelsrechnung, die die Seite mit sich
  herumtrug, ist weg — gerechnet wird gegen `rituale/engine.js`.
  Fehlerklassen abgestellt: in `monat-app.js` kann kein Satz mehr stehen
  (daraus entstand „liegt auf deinen Ausdruck"); jeder Satz in den Daten
  ist vollständig; jeder Schlüssel des Rechners braucht ein Wort in den
  Daten; die Mechanik wartet in `ac-tech` statt im Laientext zu stehen;
  der Monat hat die Tage, die er wirklich hat (kein 30. Februar mehr);
  Neu- und Vollmond werden auf die Minute genau getroffen statt auf den
  Tag danach. Plattformweit neu: jede ausgelieferte Seite hat einen
  Ursprung — gebaut oder als Handarbeit eingetragen (108 noch) —, und es
  gibt genau eine Himmelsrechnung. 901 Prüfungen im Rechner.
* **2026-10-16** · Dauerthema vertieft: jeder Bereich zeigt in Block 5 drei
  Facetten statt einem Satz, nach dem Geburtsbild gewichtet und sortiert.
  Die Reihenfolge entscheidet der Rechner, die Texte stehen getrennt
  davon. Geprüft wird jetzt: Zahl und Mindestlänge der Facetten, dass
  jede an einem Feld des eigenen Bereichs hängt, dass die Seite überall
  drei zeigt — und dass zwei verschiedene Geburtsbilder nicht dieselbe
  Reihenfolge bekommen.
* **2026-10-16** · Zwei Prüfdateien kannten den Ort der Arbeitskopie fest
  und fielen nach einem Umzug durch. Fehlerklasse abgestellt: die Quellen
  enthalten keinen Pfad zur Arbeitskopie mehr, und `pruefe-alles.py`
  bricht ab, sobald wieder einer hineingerät.
* **2026-10-15** · Lebensbereiche statt Räume: `bereiche.html` mit zehn
  Bereichen, nach Lautstärke sortiert, je fünf feste Blöcke (was ist los,
  was tun, wie lange, wie nutzen, Dauerthema). 171 Prüfungen.
* **2026-10-15** · Startseite: heller Kopf statt dunklem Block, Inhalt vor
  Maschinenraum, die Planetentabelle „Läuft" durch den Bereichs-Kurzblick
  ersetzt.
* **2026-10-15** · Auf Stufe 0 ist plattformweit keine Fachsprache mehr
  sichtbar — und das wird beim Bauen geprüft, nicht gehofft.
* **2026-10-15** · Navigation überall auf „Bereiche" umgestellt (122 Seiten).
* **2026-10-15** · `REGELN.md` und `pruefe-alles.py` angelegt.
* **2026-10-15** · Beiträge: `content/` mit eigenen Regeln, einem Rechner
  für die Wochenlage und einem Generator, der drei Entwürfe pro Woche
  schreibt — Karussell nach Aszendent, Reel als Bildschirmaufnahme,
  ein ehrliches Einzelbild. Alles aus denselben Dateien wie die Seite,
  damit Beiträge und Plattform sich nie widersprechen können.
