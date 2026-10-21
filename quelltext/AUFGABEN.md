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

### 1 · Die Besucherin wählt ihre Bereiche
Vielleicht interessiert jemanden nur Liebe und Beruf, vielleicht alles.
Die Auswahl gehört ihr und gilt plattformweit, nicht pro Seite.
**Fertig, wenn:** die Auswahl neben dem Wissensstand einstellbar ist, in
`AC_P` neben dem Profil liegt, und Bereiche, Monatsbericht und Startseite
sich danach richten. Keine Auswahl bedeutet: alle.

### 2 · Überblick und Tiefgang trennen
Siehe `PRODUKT.md`, Abschnitt 4. Dieselbe Rechnung, zwei Ausgaben.
**Fertig, wenn:** jeder Bereich einen Überblick zeigt und einen Tiefgang
erzeugen kann, der die natale Herkunft, die Facetten, die Widersprüche und
Gesprächsfragen enthält — und der Tiefgang als Datei herausgeht, statt im
Quelltext zu stehen. **Kein Schalter, der Freischalten vortäuscht.**

### 3 · Die App-Ansicht
Siehe `PRODUKT.md` Abschnitt 7, Stufe 2. Die Seite soll sich auf dem
Telefon installieren lassen: eigenes Symbol, Vollbild ohne Browserleiste,
und die zuletzt besuchten Seiten funktionieren auch ohne Netz.
**Fertig, wenn:** eine `manifest.webmanifest` mit Symbolen in den
Markenfarben existiert, jede gebaute Seite sie einbindet, ein Service
Worker die Seiten zwischenspeichert, und `pruefe-alles.py` prüft, dass
keine Seite das Einbinden vergisst. Kein Framework, kein Bauwerkzeug.

### 4 · Die zwölf alten Raumseiten in die Bereiche überführen
`raum-selbstwert.html` und die anderen elf enthalten gute Texte, aber in der
alten Form (Frage als Titel, Maschinenraum darunter).
**Fertig, wenn:** jeder Bereich auf `bereiche.html` unten auf die passende
alte Seite verweist, und keine alte Seite mehr den Maschinenraum im Titel
führt („2. Haus, Venus, Saturn, Lilith" gehört in `ac-tech`).

### 5 · Die Coachin-Sicht als zweite Schublade
In jedem Bereich eine zugeklappte Schublade „Mit jemand anderem darüber
sprechen": drei Gesprächsfragen und eine Grenze.
**Fertig, wenn:** zehn Bereiche je drei Fragen und eine Grenze haben und der
Bau prüft, dass keine davon eine Diagnose stellt.

### 6 · Doppelte Seiten zusammenlegen
Es gibt Seitenpaare, die fast dasselbe sagen (`aspekte.html` /
`aspekte-lesen.html`, `chart-lesen.html` / `bausteine.html`).
**Fertig, wenn:** jedes Paar entweder zusammengelegt ist oder in einem Satz
begründet, warum es zwei bleiben.

### 7 · Die Tierkreiszeichen auf `strategie/umgang-kristi.html`
Die Glyphen rendern als Emoji statt als Schriftzeichen; es fehlt `︎`.
**Fertig, wenn:** die Seite die Zeichen einfarbig zeigt.

### 8 · Netlify statt GitHub Pages
Vorbereitet, aber nicht umgestellt.
**Fertig, wenn:** die Seite unter der Netlify-Adresse läuft und die alte
Adresse weiterleitet.

### 9 · Facetten auch in unbesetzten Bereichen gewichten
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

### 10 · Zweite Stimme für die Reibung zwischen zwei Menschen
Die Analyse rechnet schon Paare und Zusammenarbeit, aber die Beiträge
schöpfen das nicht ab — dabei ist genau das der Unterschied zu allem
anderen in diesem Feld: nicht „du", sondern „ihr beide".
**Fertig, wenn:** `content/mach-content.py` einen vierten Beitragstyp
erzeugt, der aus `analyse/thema-paar.js` eine Reibung erklärt, ohne eine
konkrete Person erkennbar zu machen — und der Bau das prüft.

### 11 · Der Monatsbericht sagt nicht, was er nicht kann
`REGELN.md` Abschnitt 4 verlangt von jeder rechnenden Seite einen
Abschnitt „Was das taugt — und was nicht", und `PRODUKT.md` Abschnitt 3
nennt diese Ehrlichkeit den Markenkern. Der Monatsbericht hat nur einen
Hinweiskasten für die Coachin. Im Brief selbst, den ein Mensch liest,
steht nichts darüber, wie häufig so eine Aussage rechnerisch überhaupt
ist, dass die Deutung nicht überprüft ist, und dass das eigene Erleben
Vorrang hat.
**Fertig, wenn:** der Brief diese drei Sätze trägt, sie aus
`monat-daten.js` kommen, und `bau-monat.py` abbricht, wenn einer fehlt.

### 12 · Drei Kopien der Himmelsrechnung zusammenlegen
`bez/engine.js`, `niveau/engine.js` und `oph/engine.js` sind heute Zeichen
für Zeichen gleich mit `rituale/engine.js`. `pruefe-alles.py` verhindert
seit heute, dass sie auseinanderlaufen — aber vier Dateien für eine
Rechnung bleiben vier Dateien.
**Fertig, wenn:** die drei Kopien gelöscht sind, ihre `bau-*.py`
`rituale/engine.js` laden, und der Neubau bitgleiche Seiten erzeugt.

### 13 · Der Brief verschweigt, dass er auswählt
In manchen Monaten laufen sieben Vorgänge; der Brief nennt zwei und sagt
nicht, dass er auswählt. Wer das nicht weiß, hält die zwei für alles, was
los ist — und das ist genau die Sorte stiller Übertreibung, die
`PRODUKT.md` Abschnitt 3 ausschließen will.
**Fertig, wenn:** der Brief bei mehr als zwei Vorgängen in einem Satz sagt,
wie viele es insgesamt sind und wonach die genannten ausgewählt wurden, und
`bau-monat.py` einen Probefall mit mehr als zwei Vorgängen baut und prüft,
dass dieser Satz dort steht und bei zwei oder weniger fehlt.

### 14 · Die zweite Anlage sagt nicht, worum es geht
Der zweite Vorgang im Brief kommt ohne eigene Überschrift: „Daneben läuft
noch etwas Zweites." und direkt der Fließtext. Seit die Beschreibungen nach
Winkelart getrennt sind, gibt es für ihn eine passende Überschrift — sie
wird nur nicht gezeigt.
**Fertig, wenn:** auch der zweite Vorgang seine eigene Überschrift trägt,
diese sich bei reibendem und tragendem Winkel unterscheidet, und die
Rauchprobe prüft, dass bei zwei Vorgängen zwei verschiedene Überschriften
im Brief stehen.

---

## Erledigt

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
