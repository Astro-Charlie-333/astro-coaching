# Regeln für Astro-Charlie

> **Zuerst `PRODUKT.md` lesen.** Dort steht, *was* gebaut wird und
> *für wen*. Hier steht nur, *wie*. Bei Widerspruch gilt `PRODUKT.md`.

Diese Datei ist die einzige Quelle dafür, wie die Plattform klingt und wie
sie gebaut ist. Wer hier etwas ändert, ändert die Plattform. Wer eine Seite
baut, ohne hier gelesen zu haben, baut sie falsch.

Sie ist für Menschen **und** für Agenten geschrieben: ein Agent, der morgens
an der Seite arbeitet, liest zuerst diese Datei, dann `AUFGABEN.md`.

---

## 1 · Wofür die Plattform da ist

Zwei Nutzungen, in dieser Reihenfolge:

1. **Für sich selbst.** Jemand will wissen, was bei ihm gerade los ist und
   was er damit anfangen kann. Das ist der Normalfall, und jede Seite muss
   zuerst dafür funktionieren.
2. **Aus Sicht einer Coachin.** Dieselbe Seite muss einer Coachin erlauben,
   mit einem Menschen zu arbeiten: Gesprächsfragen, Grenzen, und das
   Eingeständnis, wo die Methode nichts hergibt.

Die zweite Sicht wird **zugeklappt** angeboten, nie im Vordergrund.

---

## 2 · Die Grundregel: Inhalt vor Maschinenraum

> Eine Seite spricht darüber, **was passiert** — nicht darüber, woran man es
> abliest.

Konkret:

* Auf Wissensstufe 0 kommt **kein** Planetenname vor, kein Haus, kein Aspekt,
  kein Zeichen, kein Gradzeichen, kein Fachbegriff.
* Die Mechanik steht in Elementen mit der Klasse `ac-tech` und dem Attribut
  `data-ab="2"`. Sie wird nicht versteckt — sie wartet.
* Eine Überschrift sagt das Ereignis, nicht die Ursache.
  Falsch: „Merkur wird rückläufig". Richtig: „Es wird zäher: Beruf".
* Eine Seite, die ohne die Mechanik nicht verständlich ist, ist nicht fertig.

Das ist **geprüft**, nicht erhofft: `bau-bereiche.py` und `bau-heute.py`
brechen ab, wenn auf Stufe 0 eines der verbotenen Wörter sichtbar ist.
Jede neue Seite bekommt dieselbe Prüfung.

### Die fünf Stufen

| Stufe | Wer | Was sichtbar ist |
|---|---|---|
| 0 | kennt nichts davon | nur Alltagssprache |
| 1 | hat davon gehört | dazu einzelne eingeordnete Begriffe |
| 2 | kennt Häuser und Aspekte | dazu die Mechanik in `ac-tech` |
| 3 | arbeitet damit | dazu Grade, Orben, Varianten |
| 4 | Fachperson | alles, inklusive Quellenlage und Streitfällen |

Die Stufe ist auf jeder Seite oben einstellbar (`#nivleiste`) und gilt für
die ganze Plattform.

---

## 3 · Der Aufbau eines Lebensbereichs

Jeder Bereich beantwortet **immer dieselben fünf Fragen in dieser
Reihenfolge**. Diese Reihenfolge ist nicht verhandelbar und wird beim Bauen
geprüft:

1. **Was ist los** — was gerade läuft, in Alltagssprache
2. **Was du tun kannst** — ein Handgriff, nicht fünf
3. **Wie lange das läuft** — mit Datum, nicht „bald"
4. **Wie du es nutzt** — wofür dieses Fenster gut ist
5. **Dein Dauerthema hier** — was im Geburtsbild steht und was man daran
   lernen kann

Die zehn Bereiche heißen nach dem Leben, nicht nach der Astrologie:
Liebe · Beruf · Gesundheit · Geld · Zuhause und Familie · Freunde ·
Freude und Kreativität · Selbstwert · Sinn und Richtung · Umbruch.

Die Bereiche werden **nach Lautstärke sortiert** angezeigt, der lauteste
oben. Nicht alphabetisch, nicht nach Hausnummer.

---

## 4 · Ton

* Du-Form, ruhig, erwachsen. Keine Ausrufezeichen, keine Emojis.
* Kurze Sätze. Ein Gedanke pro Satz.
* Nichts verkaufen. Keine Versprechen über die Zukunft.
* Keine Schmeichelei. Wenn etwas unangenehm ist, steht es da.
* Deutsche Rechtschreibung: Substantive groß. **Niemals `toLowerCase`** auf
  deutschen Text — das ist beim Bauen verboten und wird geprüft.
* Zahlen mit Komma, nicht mit Punkt: 2,5 Grad.
* Zeiträume unter einem Jahr in Monaten oder Wochen, darüber in Jahren.
  Nie „in 17 Monaten" neben „in 1,5 Jahren".

### Was nie behauptet wird

Jede rechnende Seite hat einen Abschnitt „Was das taugt — und was nicht".
Darin steht mindestens:

* dass eine laute Phase kein Versprechen ist, dass es gut wird,
* wie häufig die Aussage rechnerisch überhaupt ist,
* dass die Deutung nicht überprüft ist,
* und dass das eigene Erleben Vorrang hat vor der Seite.

---

## 5 · Wie gebaut wird

* Statisches HTML und JavaScript. Kein Framework, kein Bauwerkzeug,
  kein Node im Auslieferzustand. Speicher ist `localStorage`.
* Jede Seite entsteht aus einem Ordner mit immer denselben Teilen:
  `*-koerper.html`, `*-stil.css`, `*-rechner.js`, `*-daten.js`, `*-app.js`,
  und einem `bau-*.py`, das alles zu einer Datei in `wiki/` zusammensetzt.
* **Rechnen, Texte und Anzeige bleiben getrennt.** Der Rechner weiß nichts
  von Sätzen, die Daten wissen nichts vom Himmel.
* Gerechnet wird gegen `rituale/engine.js`. Keine zweite Himmelsrechnung.

### Jedes `bau-*.py` prüft mindestens

1. dass jede ID, die das Skript sucht, im Körper existiert
2. dass die Tags aufgehen (`div`, `section`, `nav`, `details`)
3. dass keine Namen mit der Engine kollidieren
4. dass jeder Text vollständig und lang genug ist
5. **dass auf Stufe 0 keine Fachsprache sichtbar ist**
6. dass kein echtes Geburtsdatum im Quelltext steht
7. dass die Rechnung ihre eigene Prüfdatei besteht (`_test-*.js`)
8. eine Rauchprobe im Browser: die Seite rendert, die Bedienelemente
   wirken wirklich, nichts läuft über den Rand

Ein Bau, der fehlschlägt, liefert nicht aus. `sys.exit(1)`.

### Die goldene Regel für Fehler

> Jeder gemeldete Fehler wird mit einer dauerhaften Prüfung beantwortet,
> die genau diese Fehlerklasse unmöglich macht.

Nicht nur den Fall reparieren — die Klasse. Beispiele, die es schon gibt:
die Altersachse muss zur Markierung passen; die Auswahl „Als" muss die
Befunde wirklich ändern; auf Stufe 0 kein Fachwort; derselbe Satz nicht
zweimal in einem Bereich; die vier Lautstärken müssen sich wirklich
unterscheiden.

---

## 6 · Was privat bleibt

Das wird beim Packen erzwungen (`packen.py`), nicht nur hier notiert:

* `strategie/` gehört **nicht** ins öffentliche Paket.
* `orga/saat.json` enthält Einkommen, Miete, Vermieter und Vertragsnummern
  und verlässt den Rechner nie.
* `niko-reading.html` enthält Namen und Geburtszeit einer dritten Person.
* `rituale/schuss.js` enthält Mandys Geburtsdaten.
* In `bau-*.py` und `_test-*.js` sind **erfundene** Daten zu benutzen.
  Die Prüfung sucht nach `1987` und `08:58` und bricht ab.

---

## 6b · Wer von außen draufschaut

Drei Aufgaben prüfen die Plattform, und sie fragen Verschiedenes:

| | fragt | schreibt in |
|---|---|---|
| **Prüferin** | Wo steigt jemand aus? | `PRUEFERIN.md` |
| **Späherin** | Was machen die anderen? | `RECHERCHE.md` |
| **Gestalterin** | Warum sollte jemand bleiben, das weiterschicken oder dafür bezahlen? | `GESTALTERIN.md` |

Die Gestalterin ist die Einzige, die sagen darf: **richtig gebaut und
trotzdem schlecht.** Alle Prüfungen in diesem Projekt fragen, ob etwas
funktioniert — sie fragt, ob es jemanden interessiert. Wer eine Seite baut,
liest ihren letzten Durchgang zu dieser Seite.

Keine der drei baut. Sie schreiben ihre eigene Datei und höchstens eine
Aufgabe nach `AUFGABEN.md`.

---

## 7 · Wenn etwas unklar ist

Im Zweifel: **weniger Astrologie, mehr Leben.** Und wenn eine Aussage nicht
belegbar ist, steht sie entweder nicht da oder mit dem Hinweis, dass sie
nicht belegbar ist.
