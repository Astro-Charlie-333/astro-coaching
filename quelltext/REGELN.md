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

* Auf Wissensstufe 0 kommt **kein** Haus vor, kein Aspekt, kein Zeichen,
  kein Gradzeichen, kein Fachbegriff.
* Die Mechanik steht in Elementen mit der Klasse `ac-tech` und dem Attribut
  `data-ab="2"`. Sie wird nicht versteckt — sie wartet.
* Eine Überschrift sagt, was passiert, nicht nur, woran man es abliest.
* Eine Seite, die ohne die Mechanik nicht verständlich ist, ist nicht fertig.

Das ist **geprüft**, nicht erhofft: `bau-bereiche.py` und `bau-heute.py`
brechen ab, wenn auf Stufe 0 eines der verbotenen Wörter sichtbar ist.
Jede neue Seite bekommt dieselbe Prüfung.

## 2a · Ein Name ist keine Fachsprache

Hier stand bis zum 28.10. eine Zeile, die falsch war:

> ~~Falsch: „Merkur wird rückläufig". Richtig: „Es wird zäher: Beruf".~~

Mandy hat gemerkt, was daraus geworden ist:

> „also auch Themen enthalten wie merkur rückläufig venus rückläufig etc?
> Sowas halt. Das sind die themen die es spannend machen und wann der
> nächste vollmond oder neumond ist oder kazimi und was sowas bei einem
> macht. Also solch themen sind alle nicht mehr vorhanden gewesen."

Sie hatte recht. Die Rechnung kannte das alles seit Monaten — welche
Planeten rückwärts laufen, jeden Neu- und Vollmond, fertige Sätze dazu.
Die Seite hat jedes davon in einen Bereichsnamen übersetzt und damit
unkenntlich gemacht. Es war alles da und nichts davon zu finden.

**Der Unterschied, auf den es ankommt:**

| | Beispiele | auf Stufe 0 |
|---|---|---|
| **Mechanik** — verschlüsselt einen Rechenweg, den man kennen muss | Orbis, Konjunktion, Quadrat, Aszendent, Whole Sign, applikativ | nie |
| **Name** — das Wort, unter dem die Leute die Sache kennen und danach suchen | Merkur rückläufig, Vollmond, Neumond, Kazimi, Sonnenfinsternis | ja, **wenn erklärt** |

„Orbis" wegzulassen macht die Seite zugänglicher. „Merkur rückläufig"
wegzulassen macht sie unkenntlich: Es ist kein Fachwort, sondern die
Überschrift, unter der die halbe Zielgruppe das Thema kennt.

**Der Preis für diese Erlaubnis** steht in `bau-heute.py` und ist streng:
Wer einen Namen nennt, erklärt ihn **auf derselben Karte**, in
Alltagssprache, **bevor** etwas über seine Wirkung dasteht. Dazu gehört
jedes Mal, was der Zeitraum taugt — und die Zeile „Was oft zu groß erzählt
wird", die der verbreiteten Erzählung widerspricht, wo sie übertreibt.
Ein Name ohne Erklärung ist wieder Fachsprache, und der Bau bricht ab.

Dasselbe gilt für Angst: Ein Thema, das mit „vermeide", „bloß nicht" oder
„gefährlich" arbeitet, lässt den Bau scheitern. Angst verkauft, und genau
deshalb steht sie hier nicht (PRODUKT.md Abschnitt 5).

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

## 6c · Wie ein Pull Request abgeliefert wird

Seit dem 27.10. ist `main` geschützt: Ein Pull Request kommt nur durch, wenn
die Prüfung **Alles bauen und prüfen** grün ist und der Zweig auf dem
aktuellen Stand steht.

**Du musst dafür nichts tun.** Öffne den Pull Request und hör auf. Ein
Ablauf in `.github/workflows/selbstuebernahme.yml` schaltet die
Selbstübernahme ein, sobald der Pull Request aus einem Aufgabenzweig
aufgeht (`taeglich/`, `recherche/`, `pruefung/`, `gestaltung/`,
`beitraege/`). Ist die Prüfung grün, übernimmt er sich selbst. Ist sie rot,
bleibt er liegen und schreibt den Grund als Kommentar hinein.

### Warum das nicht als Anweisung dasteht

Bis zum 28.10. stand hier: „Jede Aufgabe schaltet nach dem Öffnen die
Selbstübernahme ein." Alle Agentinnen lesen diese Datei. Am nächsten Morgen
hatten zwei von ihnen sie gelesen und es trotzdem nicht getan.

Wer eine nummerierte Schrittliste abarbeitet, führt keine Regel aus, die in
einem anderen Dokument steht. **Eine Anweisung, an die sich jemand erinnern
muss, ist keine Automatik.** Das gilt für Menschen wie für Agentinnen, und
es ist dieselbe Lehre wie bei den Prüfungen in den `bau-*.py`: Was
verlässlich sein soll, gehört in die Maschine, nicht in einen Satz.

Dazu kam ein Zeitproblem, das von Hand kaum zu treffen ist: GitHub lässt die
Selbstübernahme nur scharfschalten, **solange die Prüfung noch läuft**. Ist
sie bereits grün, antwortet es „clean status", und der Pull Request bleibt
stehen. Der Ablauf startet beim Öffnen und ist damit immer früh genug.

### Was ein Zweig braucht, damit er überhaupt durchkommt

Am 29.10. lag ein Pull Request einen Tag lang fest, und zwar aus zwei
Gründen gleichzeitig:

1. **Er war zu alt.** Vier Zusammenführungen später hätte er 4.639 Zeilen
   gelöscht — alles, was in der Zwischenzeit entstanden war. Ein Zweig, der
   einen Tag liegt, wird nicht nachgezogen, sondern auf dem aktuellen Stand
   **neu aufgesetzt**. Das ist billiger als jede Konfliktauflösung.
2. **Die Prüfung lief nie.** Kein einziger Lauf auf diesem Zweig, also war
   die Pflichtprüfung nie grün und konnte es auch nicht werden.

Deshalb gehört zum Abliefern ein Blick danach: Läuft die Prüfung? Steht der
Zweig auf dem aktuellen Stand? Sind beide Antworten nein, ist der Pull
Request kein Pull Request, sondern ein Zettel.

## 6d · Ein gebauter Satz nennt eine Folge

Mandy am 28.10. über einen Satz der Ich-Seite:

> „Zwei Dinge in dir arbeiten gegeneinander: worauf du hinauswillst und wo
> dir die Umrisse verschwimmen. — was soll ein satz bitte bedeuten."

Nichts. So war er gebaut:

```
Vorlage:  "Zwei Dinge in dir arbeiten gegeneinander: {a} und {b}."
{a} = Sonne  → "worauf du hinauswillst"
{b} = Neptun → "wo dir die Umrisse verschwimmen"
```

Zwei Nebensätze aneinandergeklebt, und danach kommt nichts. Daraus zwei
Regeln, die für jede Vorlage gelten, in die etwas eingesetzt wird:

1. **Jeder eingesetzte Halbsatz bezeichnet etwas, das man sich vorstellen
   kann.** „Wo dir die Umrisse verschwimmen" bezeichnet nichts. „Es offen
   lassen, statt dich festzulegen" schon. Praktisch heißt das: keine
   Ortsangabe („wo …"), keine Frageform („was …", „wie …") — eine
   Handlung.
2. **Der Satz endet mit einer Folge, nicht mit zwei Zuständen.** Nicht
   „A und B arbeiten gegeneinander", sondern was dabei herauskommt:
   „… also hältst du eine Möglichkeit so lange offen, dass nichts davon
   stattfindet."

Deshalb hat jede Rolle in `ich-daten.js` zwei Teile — `will` (die
Handlung) und `zuweit` (die Folge). `bau-ich.py` prüft beide und
verlangt in jeder Winkelvorlage ein Folgewort.

---

## 7 · Wenn etwas unklar ist

Im Zweifel: **weniger Astrologie, mehr Leben.** Und wenn eine Aussage nicht
belegbar ist, steht sie entweder nicht da oder mit dem Hinweis, dass sie
nicht belegbar ist.
