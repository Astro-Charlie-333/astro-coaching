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


### 1 · Die Ich-Seite nach demselben Muster wie die Startseite umbauen

Mandy am 25.10.: „die Ich Seite und die heute Seite sind noch immer nicht
spannend und gut genug." Die Startseite ist umgebaut — die Ich-Seite hat
dieselben vier Fehler:

* Sie **beginnt mit dem Chartrad.** Maschinenraum vor Inhalt, genau der
  Fehler, den die Startseite gerade losgeworden ist.
* Die Dreierzeile direkt darunter (Antrieb · Bedürfnis · Wirkung) führt mit
  **Zeichen und Gradzahl**. Das gehört hinter die Alltagsbedeutung.
* **15 Bildschirme auf dem Telefon**, ohne Inhaltsverzeichnis und ohne eine
  Möglichkeit zu springen. Niemand liest das zu Ende.
* Der stärkste Teil — **„Was an dir auffällt"** mit den Häufigkeiten aus
  10.000 erfundenen Geburtsbildern und je einem Handgriff — steht unter
  allem anderen begraben. Das ist das Beste auf der ganzen Plattform und
  es kommt als Viertes.

Zu tun, in dieser Reihenfolge:

1. Der Seitenkopf führt mit **einem Satz über diesen Menschen**, nicht mit
   dem Rad. Das Rad rutscht nach unten oder in eine Klappe.
2. „Was an dir auffällt" wird der **erste** Abschnitt nach dem Kopf.
3. **Sprungmarken** oben: anklickbare Links auf die Abschnitte, wie auf der
   Essensseite. Auf dem Telefon mitlaufend oder zumindest am Anfang.
4. Alles, was Grad und Zeichen nennt, bekommt `ac-tech` und `data-ab="2"`.

Fertig, wenn: Auf 390 Pixeln steht im ersten Bildschirm ein Satz über diesen
Menschen und kein Gradzeichen; die Sprungmarken funktionieren; die Seite ist
auf dem Telefon höchstens halb so hoch wie jetzt (12.758 Pixel), weil alles
Nachschlagbare in Klappen liegt.

Dauerhafte Prüfung dazu in `bau-ich.py`: Höhe auf 390 Pixeln unter einer
Obergrenze; kein Gradzeichen und kein Zeichenname im ersten Bildschirm;
jede Sprungmarke zeigt auf eine ID, die es gibt.

### 4 · Die Coachin-Sicht als zweite Schublade
In jedem Bereich eine zugeklappte Schublade „Mit jemand anderem darüber
sprechen": drei Gesprächsfragen und eine Grenze.
**Fertig, wenn:** zehn Bereiche je drei Fragen und eine Grenze haben und der
Bau prüft, dass keine davon eine Diagnose stellt.

### 5 · Doppelte Seiten zusammenlegen
Es gibt Seitenpaare, die fast dasselbe sagen (`aspekte.html` /
`aspekte-lesen.html`, `chart-lesen.html` / `bausteine.html`).
**Fertig, wenn:** jedes Paar entweder zusammengelegt ist oder in einem Satz
begründet, warum es zwei bleiben.

### 6 · Die Tierkreiszeichen auf `strategie/umgang-kristi.html`
Die Glyphen rendern als Emoji statt als Schriftzeichen; es fehlt `︎`.
**Fertig, wenn:** die Seite die Zeichen einfarbig zeigt.

### 7 · Netlify statt GitHub Pages
Vorbereitet, aber nicht umgestellt.
**Fertig, wenn:** die Seite unter der Netlify-Adresse läuft und die alte
Adresse weiterleitet.

### 8 · Facetten auch in unbesetzten Bereichen gewichten
Die Facetten in Block 5 werden danach sortiert, was natal in den Feldern
des Bereichs steht. Ist dort nichts, entscheidet nur noch die Reihenfolge
der Textdatei — dann behauptet die Seite eine Gewichtung, die keine ist.
**Fertig, wenn:** auch ein Bereich ohne natale Besetzung eine Reihenfolge
zeigt, die von der Reihenfolge in `bereich-daten.js` abweicht, und
`bau-bereiche.py` genau das prüft.

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

## Erledigt
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
