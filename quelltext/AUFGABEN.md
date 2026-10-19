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

### 6 · Block 5 sagt seinen Schwerpunkt zweimal
Seit die Facetten da sind, beschreibt der Satz „Dein Schwerpunkt liegt hier
bei dem, was man so beschreiben kann …" dasselbe Feld wie die oberste
Facette, nur allgemeiner. Zwei Anläufe für denselben Gedanken.
**Fertig, wenn:** Block 5 den Schwerpunkt genau einmal benennt — in der
obersten Facette — und `bau-bereiche.py` prüft, dass kein Bereich zwei
Absätze zum selben Feld führt.

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

* **2026-10-19** · Jeder Bereich zeigt in Block 5 jetzt drei Facetten statt
  eines Satzes, und welche davon oben steht, entscheidet das Geburtsbild:
  das Feld mit dem meisten Gewicht zuerst, die Lichter zählen doppelt, bei
  gleicher Besetzung bleibt das Kernfeld vorn. Der Bau prüft Anzahl,
  Mindestlänge und Reihenfolge; eine Kopie desselben Textes in zwei
  Bereichen bricht ab. Dabei zwei Prüfdateien repariert, die auf feste
  Pfade eines fremden Rechners zeigten — `pruefe-alles.py` lässt solche
  Pfade jetzt nicht mehr durch.

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
