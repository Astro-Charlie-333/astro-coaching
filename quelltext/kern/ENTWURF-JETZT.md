# Entwurf: die Seite „Jetzt"

> Mandy am 28.10.: „die ganze seite ist einfach immer noch nicht ansatzweise
> da wo sie sein sollte … Denn ich habe das Gefühl, dass vielleicht genau
> das das Problem ist. Dass es bereits gebaut ist."

Sie hatte halb recht, und die Hälfte ist die wichtige:

**Diese Seite wurde nie entworfen. Sie wurde nur korrigiert.** Jeder Eingriff
war eine Antwort auf „das ist falsch", nie auf „was ist diese Seite
eigentlich?". Deshalb wanderten drei Tage lang Blöcke hin und her, und das
Gefühl blieb dasselbe. Flicken hat eine Obergrenze.

Der Rechner bleibt. Die Oberfläche nicht.

---

## 1 · Was diese Seite ist

Eine Seite beantwortet **eine** Frage. Diese beantwortet:

> **Was ist gerade los — und was kommt als Nächstes?**

Nicht: was ist heute. Der Zeitraum ist die **Woche**, nicht der Tag. Die
Seite hieß „Heute" und zeigte zehn Tage; der Name hat gelogen. Sie heißt
jetzt **Jetzt**.

### Für wen sie zuerst funktioniert

Für jemanden, der morgens auf dem Weg zur Bahn draufschaut. Zehn Sekunden.
Er geht mit **einem** Satz weg, nicht mit einem Überblick.

Erst danach für jemanden, der sich hinsetzt und liest.

---

## 2 · Was fehlte

Mandy: „Die Heute seite hat fast keine coolen Aspekte mehr. Was ist die
Woche zB los und highlights der ganzen Aspekte."

Das war mein Fehler. Die Regel „Inhalt statt Maschinenraum" sollte
verhindern, dass eine Seite **mit** Mechanik anfängt. Daraus wurde, dass
Mechanik kaum noch vorkommt.

**Für jemanden ab Wissensstufe 2 sind die Aspekte der Inhalt.** „Pluto
Quadrat Venus, exakt am 14. November" ist das Interessante — nicht das, was
man versteckt. Die Regel heißt: nicht damit anfangen. Nicht: weglassen.

Der Rechner kennt alle laufenden Konstellationen samt Gewicht und Fenster
(`AC_BER.blatt().alle`). Gezeigt wurden sie nirgends.

---

## 3 · Die Reihenfolge

Nach Dringlichkeit für den Leser, nicht nach Logik des Systems.

| | Abschnitt | warum da |
|---|---|---|
| 1 | **Der Aufmacher** | Das eine Ereignis mit Datum in den nächsten vier Tagen. Wer nur zehn Sekunden hat, hat damit genug. |
| 2 | **Was gerade läuft** | *Neu.* Die stärksten Konstellationen, nach Gewicht sortiert, mit Datum und Lebensbereich. Das, was gefehlt hat. |
| 3 | **Die Woche** | Die datierten Termine — als Woche gelesen, nicht als Liste von zehn Tagen. |
| 4 | **Wo am meisten los ist** | Die Lebensbereiche, gekürzt. Die Tiefe steht auf `bereiche.html`. |
| 5 | **Einstellen** | Zugeklappt, unter dem Inhalt. |

### Abschnitt 2 im Einzelnen

Je Konstellation:

* **ein Satz, was sie macht** — in Alltagssprache, aus `B_WAND` und `B_ART`
* **welcher Lebensbereich** — anklickbar nach `bereiche.html#ber-…`
* **wann sie genau ist** — der exakte Tag, nicht nur das Fenster
* **wie nah sie dran ist** — als Balken, nicht als Gradzahl
* **ab Stufe 1**: der Aspekt im Klartext, mit Orbis und Richtung

Sortiert nach Gewicht. Höchstens fünf. Die stärkste groß.

Der exakte Tag wird neu gerechnet: Der Rechner kannte bisher nur das
Fenster (von–bis), nicht den Höhepunkt darin.

---

## 4 · Die Regel für gebaute Sätze

Mandy am 28.10.: „Zwei Dinge in dir arbeiten gegeneinander: worauf du
hinauswillst und wo dir die Umrisse verschwimmen. — was soll ein satz bitte
bedeuten."

Nichts. So entstand er:

```
Vorlage:  "Zwei Dinge in dir arbeiten gegeneinander: {a} und {b}."
{a} = Sonne  → "worauf du hinauswillst"
{b} = Neptun → "wo dir die Umrisse verschwimmen"
```

Zwei Nebensätze aneinandergeklebt, und danach kommt nichts.

**Die Regel: Ein gebauter Satz nennt eine Folge, nicht zwei Zustände.**

Nicht „A und B arbeiten gegeneinander", sondern was dabei herauskommt:
„Du willst irgendwohin, und sobald du es ansiehst, löst es sich auf.
Deshalb hältst du Pläne länger offen als nötig."

Und: **Jeder Halbsatz, der eingesetzt wird, muss für sich etwas bezeichnen,
das man sich vorstellen kann.** „Wo dir die Umrisse verschwimmen" bezeichnet
nichts. „Wofür du dich leicht begeisterst, ohne es prüfen zu wollen" schon.

---

## 5 · Was nicht angefasst wird

* Die Himmelsrechnung, der Bereichsrechner, die Zodiacal Releasing, das
  Abzählen gegen 10.000 Charts, die fünf Wissensstufen.
* Farben und Schriften.
* Die Prüfungen. Sie wandern mit, wenn ein Abschnitt wandert.

---

## 6 · Woran man erkennt, dass es fertig ist

1. Auf 390 Pixeln steht im ersten Bildschirm **ein** datierter Satz.
2. Es gibt einen Abschnitt, in dem die laufenden Konstellationen stehen —
   mit exaktem Datum, nicht nur mit Fenster.
3. Ab Stufe 2 steht dort der Aspekt im Klartext.
4. Kein gebauter Satz besteht aus zwei aneinandergeklebten Halbsätzen ohne
   Folge.
5. Die Seite heißt überall „Jetzt", auch in der Navigation aller Seiten.
