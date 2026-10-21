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

### 1 · Der Monatsbericht sagt, was bei DIESEM Menschen los ist
Er nennt gerade Hausthemen („Ausdruck und das, was dir Freude macht") und
beschreibt laufende Vorgänge in Sätzen, die für jeden gleich lauten. Was im
Geburtsbild steht, kommt kein einziges Mal vor. Dazu ein Grammatikfehler:
„Der Schwerpunkt liegt auf **deinen** Ausdruck".
**Fertig, wenn:** der Bericht zu jedem laufenden Vorgang sagt, welche
natale Anlage er trifft und was das für diesen Menschen heißt; zwei
verschiedene Geburtsbilder im selben Monat erzeugen Berichte, die sich in
mehr als den Daten unterscheiden; und `bau-monat.py` prüft genau das.

### 2 · Die Besucherin wählt ihre Bereiche
Vielleicht interessiert jemanden nur Liebe und Beruf, vielleicht alles.
Die Auswahl gehört ihr und gilt plattformweit, nicht pro Seite.
**Fertig, wenn:** die Auswahl neben dem Wissensstand einstellbar ist, in
`AC_P` neben dem Profil liegt, und Bereiche, Monatsbericht und Startseite
sich danach richten. Keine Auswahl bedeutet: alle.

### 3 · Überblick und Tiefgang trennen
Siehe `PRODUKT.md`, Abschnitt 4. Dieselbe Rechnung, zwei Ausgaben.
**Fertig, wenn:** jeder Bereich einen Überblick zeigt und einen Tiefgang
erzeugen kann, der die natale Herkunft, die Facetten, die Widersprüche und
Gesprächsfragen enthält — und der Tiefgang als Datei herausgeht, statt im
Quelltext zu stehen. **Kein Schalter, der Freischalten vortäuscht.**

### 4 · Die App-Ansicht
Siehe `PRODUKT.md` Abschnitt 7, Stufe 2. Die Seite soll sich auf dem
Telefon installieren lassen: eigenes Symbol, Vollbild ohne Browserleiste,
und die zuletzt besuchten Seiten funktionieren auch ohne Netz.
**Fertig, wenn:** eine `manifest.webmanifest` mit Symbolen in den
Markenfarben existiert, jede gebaute Seite sie einbindet, ein Service
Worker die Seiten zwischenspeichert, und `pruefe-alles.py` prüft, dass
keine Seite das Einbinden vergisst. Kein Framework, kein Bauwerkzeug.

### 5 · Die zwölf alten Raumseiten in die Bereiche überführen
`raum-selbstwert.html` und die anderen elf enthalten gute Texte, aber in der
alten Form (Frage als Titel, Maschinenraum darunter).
**Fertig, wenn:** jeder Bereich auf `bereiche.html` unten auf die passende
alte Seite verweist, und keine alte Seite mehr den Maschinenraum im Titel
führt („2. Haus, Venus, Saturn, Lilith" gehört in `ac-tech`).

### 6 · Die Coachin-Sicht als zweite Schublade
In jedem Bereich eine zugeklappte Schublade „Mit jemand anderem darüber
sprechen": drei Gesprächsfragen und eine Grenze.
**Fertig, wenn:** zehn Bereiche je drei Fragen und eine Grenze haben und der
Bau prüft, dass keine davon eine Diagnose stellt.

### 7 · Doppelte Seiten zusammenlegen
Es gibt Seitenpaare, die fast dasselbe sagen (`aspekte.html` /
`aspekte-lesen.html`, `chart-lesen.html` / `bausteine.html`).
**Fertig, wenn:** jedes Paar entweder zusammengelegt ist oder in einem Satz
begründet, warum es zwei bleiben.

### 8 · Die Tierkreiszeichen auf `strategie/umgang-kristi.html`
Die Glyphen rendern als Emoji statt als Schriftzeichen; es fehlt `︎`.
**Fertig, wenn:** die Seite die Zeichen einfarbig zeigt.

### 9 · Netlify statt GitHub Pages
Vorbereitet, aber nicht umgestellt.
**Fertig, wenn:** die Seite unter der Netlify-Adresse läuft und die alte
Adresse weiterleitet.

### 10 · Facetten auch in unbesetzten Bereichen gewichten
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

### 11 · Zweite Stimme für die Reibung zwischen zwei Menschen
Die Analyse rechnet schon Paare und Zusammenarbeit, aber die Beiträge
schöpfen das nicht ab — dabei ist genau das der Unterschied zu allem
anderen in diesem Feld: nicht „du", sondern „ihr beide".
**Fertig, wenn:** `content/mach-content.py` einen vierten Beitragstyp
erzeugt, der aus `analyse/thema-paar.js` eine Reibung erklärt, ohne eine
konkrete Person erkennbar zu machen — und der Bau das prüft.

### 12 · Der Monatsbericht sagt nicht, was er nicht kann
`REGELN.md` Abschnitt 4 verlangt von jeder rechnenden Seite einen
Abschnitt „Was das taugt — und was nicht", und `PRODUKT.md` Abschnitt 3
nennt diese Ehrlichkeit den Markenkern. Der Monatsbericht hat nur einen
Hinweiskasten für die Coachin. Im Brief selbst, den ein Mensch liest,
steht nichts darüber, wie häufig so eine Aussage rechnerisch überhaupt
ist, dass die Deutung nicht überprüft ist, und dass das eigene Erleben
Vorrang hat.
**Fertig, wenn:** der Brief diese drei Sätze trägt, sie aus
`monat-daten.js` kommen, und `bau-monat.py` abbricht, wenn einer fehlt.

### 13 · Drei Kopien der Himmelsrechnung zusammenlegen
`bez/engine.js`, `niveau/engine.js` und `oph/engine.js` sind heute Zeichen
für Zeichen gleich mit `rituale/engine.js`. `pruefe-alles.py` verhindert
seit heute, dass sie auseinanderlaufen — aber vier Dateien für eine
Rechnung bleiben vier Dateien.
**Fertig, wenn:** die drei Kopien gelöscht sind, ihre `bau-*.py`
`rituale/engine.js` laden, und der Neubau bitgleiche Seiten erzeugt.

---

### 14 · Die Stufenleiste darf nicht weiter zurückfallen
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

### 15 · Den ersten Vorsprungssatz nachschärfen
`PRODUKT.md` Abschnitt 3 sagt, fast alles auf dem Markt rede über dich
allein. The Pattern verkauft seit Jahren eine Paarsicht, Co-Star führt
eine Freundesliste mit Passung. Siehe Recherche vom 2026-10-21, Spur B:
Die Paarsicht als solche ist kein Vorsprung mehr; die Verbindung mit
Ehrlichkeit über die Häufigkeit und mit der Sicht der Coachin kann einer
sein. Nur dieser Satz wird angefasst, keine Seite.
**Fertig, wenn:** der erste Vorsprung in Abschnitt 3 benennt, was die
anderen bei Paaren bereits tun, und den eigenen Vorsprung so formuliert,
dass eine Leserin ihn an der Seite nachprüfen kann.

## Erledigt

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
