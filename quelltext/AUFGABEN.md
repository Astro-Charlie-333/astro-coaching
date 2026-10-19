# Aufgaben

Die Liste, aus der die tägliche Arbeit kommt. **Immer von oben.** Was fertig
ist, wandert nach „Erledigt" mit Datum. Wer hier etwas einträgt, schreibt in
einem Satz, **woran man erkennt, dass es fertig ist** — sonst ist es keine
Aufgabe, sondern ein Wunsch.

Vor jeder Arbeit: `REGELN.md` lesen. Nach jeder Arbeit:
`python3 pruefe-alles.py`. Schlägt die Prüfung fehl, wird nichts ausgeliefert.

**Eine Aufgabe pro Tag.** Lieber eine Sache fertig als drei angefangen.

---

## Als Nächstes

### 1 · Die zwölf alten Raumseiten in die Bereiche überführen
`raum-selbstwert.html` und die anderen elf enthalten gute Texte, aber in der
alten Form (Frage als Titel, Maschinenraum darunter).
**Fertig, wenn:** jeder Bereich auf `bereiche.html` unten auf die passende
alte Seite verweist, und keine alte Seite mehr den Maschinenraum im Titel
führt („2. Haus, Venus, Saturn, Lilith" gehört in `ac-tech`).

### 2 · Die Coachin-Sicht als zweite Schublade
In jedem Bereich eine zugeklappte Schublade „Mit jemand anderem darüber
sprechen": drei Gesprächsfragen und eine Grenze.
**Fertig, wenn:** zehn Bereiche je drei Fragen und eine Grenze haben und der
Bau prüft, dass keine davon eine Diagnose stellt.

### 3 · Doppelte Seiten zusammenlegen
Es gibt Seitenpaare, die fast dasselbe sagen (`aspekte.html` /
`aspekte-lesen.html`, `chart-lesen.html` / `bausteine.html`).
**Fertig, wenn:** jedes Paar entweder zusammengelegt ist oder in einem Satz
begründet, warum es zwei bleiben.

### 4 · Die Tierkreiszeichen auf `strategie/umgang-kristi.html`
Die Glyphen rendern als Emoji statt als Schriftzeichen; es fehlt `︎`.
**Fertig, wenn:** die Seite die Zeichen einfarbig zeigt.

### 5 · Netlify statt GitHub Pages
Vorbereitet, aber nicht umgestellt.
**Fertig, wenn:** die Seite unter der Netlify-Adresse läuft und die alte
Adresse weiterleitet.

### 6 · Facetten auch in unbesetzten Bereichen gewichten
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

### 7 · Zweite Stimme für die Reibung zwischen zwei Menschen
Die Analyse rechnet schon Paare und Zusammenarbeit, aber die Beiträge
schöpfen das nicht ab — dabei ist genau das der Unterschied zu allem
anderen in diesem Feld: nicht „du", sondern „ihr beide".
**Fertig, wenn:** `content/mach-content.py` einen vierten Beitragstyp
erzeugt, der aus `analyse/thema-paar.js` eine Reibung erklärt, ohne eine
konkrete Person erkennbar zu machen — und der Bau das prüft.

---

## Erledigt

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
