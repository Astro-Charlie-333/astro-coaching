# Entwurf: die neue Hauptseite

> Mandy am 30.10.: „meine Seite ist einfach zu cluddert und vor allem sehe
> ich nicht mehr durch … am Ende wäre vielleicht doch eine neue Seite
> besser und dann halt schauen wie man das dann richtig aufbauen kann."

Erst das Papier. Was draufsteht, in welcher Reihenfolge, was von den 127
Seiten mitkommt und was nicht — bevor eine Zeile gebaut wird. Beim letzten
Mal (`ENTWURF-JETZT.md`) war genau das der Punkt, an dem es gekippt ist.

---

## 1 · Der Befund

**Die Seite ist nicht zu voll. Sie ist mehrfach vorhanden.**

127 Seiten, 270.389 Wörter. Davon werden **15 aus Quelltext gebaut und
geprüft**; die anderen 112 sind Handarbeit aus verschiedenen Monaten, mit
verschiedenen Regeln und verschiedener Stimme.

Und dieselben Themen liegen mehrfach da:

| Thema | Seiten |
|---|---|
| Lebensbereiche | `bereiche.html` **und** 12 × `raum-*.html` |
| Planeten | 11 Seiten |
| Mond | 6 Seiten |
| Häuser | 5 Seiten |
| „… lesen" | 5 Seiten |
| Leitfäden | 6 Seiten |
| Reading | 3 Seiten |

`lunationen.html` und `mondzyklen.html` tragen **denselben Titel**:
„Neumonde, Vollmonde und Finsternisse". Zwei Seiten, eine Sache, 6.681
Wörter.

Die zwölf `raum-*.html` sind ein komplettes zweites System für
Lebensbereiche — 35.000 Wörter neben einer gebauten Seite, die dasselbe
tut. Das ist nicht Unordnung, das ist eine Abzweigung, die nie
zurückgeführt wurde.

**Daraus folgt die Grundregel des Umzugs:** Nicht 127 Seiten umziehen.
Für jedes Thema **eine** Seite bestimmen, den besten Text aus allen
Fassungen dorthin holen, den Rest stilllegen.

---

## 2 · Was die neue Seite ist

**Marke:** Mandy Netta · Astrologie & Coaching
**Angebot und Methode:** Schwerkraft *(Arbeitstitel)*
**Werkzeug dahinter:** Astro-Charlie

Eine Seite beantwortet eine Frage. Diese beantwortet:

> **Was ist bei dir angelegt — und was machst du am Dienstag damit?**

Das ist dieselbe Spannung wie der Name: Der Himmel zieht, der Boden hält.
Und es ist die Grenze, an der sich diese Seite von jeder anderen
Astrologieseite unterscheidet.

---

## 3 · Vier Türen statt fünf Menüpunkte

Heute mischt die Navigation drei Produkte. Neu:

| | Tür | für wen | was dahinter liegt |
|---|---|---|---|
| 1 | **Start** | jemand, der dich noch nicht kennt | Wer du bist, wie du arbeitest, was es gibt, was es kostet. **Existiert heute nicht.** |
| 2 | **Dein Bild** | die Besucherin mit Geburtsdaten | Geburtsbild, die zwölf Felder, die Lebensbereiche |
| 3 | **Jetzt** | wer wiederkommt | Was gerade läuft, die Woche, die großen Themen |
| 4 | **Wissen** | zum Nachschlagen | Die Bibliothek, stark eingedampft |

Und eine **fünfte, stille Tür: Werkstatt.** Dossier, Begleitung, Profile.
Steht nicht im Menü — das ist dein Arbeitsplatz, nicht das Schaufenster.
Erreichbar über einen eigenen Weg, den nur du kennst.

### Was auf „Start" steht

Der Teil, der heute komplett fehlt, und der Grund, warum du niemandem
einen Link schicken kannst:

1. **Ein Satz, was du machst.** Kein Claim, ein Satz.
2. **Wie du arbeitest** — die drei Linsen, in drei Zeilen.
3. **Was es gibt** — Reading, Begleitung, und was jeweils dabei ist.
4. **Was es kostet.** Zahlen, keine „Investition auf Anfrage".
5. **Wer du bist** — kurz, ohne Heldenreise.
6. **Was das hier nicht ist** — keine Therapie, keine Vorhersage. Dieser
   Abschnitt verkauft besser als jeder Claim, weil ihn sonst niemand hat.
7. **Ein Weg hinein, der nichts kostet:** das eigene Bild ansehen.

Keine Dringlichkeit, keine Verknappung, keine Countdown-Uhr. Das ist in
`PRODUKT.md` Abschnitt 5 ausgeschlossen und bleibt es.

---

## 4 · Was mitkommt, was zusammengelegt wird, was liegen bleibt

### Kommt mit, unverändert gut (15 Seiten)

Alles Gebaute. Das ist der teure Teil: Himmelsrechnung, Bereichsrechner,
die fünf Wissensstufen, die Prüfungen. Daran wird nichts neu erfunden.

### Wird zusammengelegt

| aus | wird |
|---|---|
| 12 × `raum-*.html` | die Texte wandern in `bereiche.html`, die Seiten gehen |
| `lunationen` + `mondzyklen` + `mondphasen-rhythmus` | **eine** Mondseite |
| 5 Häuserseiten | **eine**, gebaut |
| 11 Planetenseiten | **eine** Planetenseite mit allen, gebaut |
| 3 Readingseiten + 4 Coachingseiten | sind längst in `begleitung.html` |

Das sind rund **40 Seiten weniger**, ohne dass ein einziger guter Satz
verlorengeht.

### Bleibt liegen — aber wird nicht gelöscht

Was nach der Zusammenlegung übrig ist und niemand braucht, zieht nach
`archiv/`. Nicht verlinkt, nicht im Menü, aber da. Löschen kann man
später immer noch; was weg ist, ist weg.

---

## 5 · Die Regel für den Umzug

> Mandy: „und dann auch double checked wenn was rübergeholt wird und
> upgedated etc."

Keine Seite zieht um, weil es sie gibt. Jede Seite, die mitkommt, erfüllt
alle fünf Punkte — sonst bleibt sie liegen:

1. **Aus Quelltext gebaut.** Handarbeit zieht nicht um. Was mitkommt,
   bekommt ein `bau-*.py` mit Prüfungen, sonst veraltet es wieder
   unbemerkt.
2. **Besteht die heutigen Regeln.** Namen werden erklärt
   (`REGELN.md` 2a), gebaute Sätze nennen eine Folge (6d), auf Stufe 0
   keine Mechanik, der Ehrlichkeitsabschnitt ist dran.
3. **Fakten nachgeprüft.** Wo eine Zahl oder eine Behauptung steht, wird
   sie gegen die Quelle gehalten. Was sich nicht halten lässt, fliegt raus
   oder bekommt dazu, dass es nicht belegt ist.
4. **Auf 390 Pixeln angesehen.** Nicht ausgelesen — angesehen.
5. **Eine Seite je Thema.** Gibt es das Thema schon woanders, wird
   zusammengelegt statt danebengestellt.

Dazu eine Prüfung in `pruefe-alles.py`, die mitzählt, wie viele Seiten
noch Handarbeit sind. Die Zahl darf nur fallen.

---

## 6 · Gestaltung

**Es braucht keine neue Palette.** Das fremde Konzeptdokument beschreibt
als Ziel „Mitternachtsblau & Sandfarben" — genau das steht seit Monaten
in `basis.css`:

| | |
|---|---|
| `--nacht` | `#2E3A5C` — Mitternachtsblau |
| `--messing` | `#9A7235` — Sand/Messing |
| `--creme` | `#FCF7EF` |
| Schriften | Fraunces · DM Sans · JetBrains Mono |

Was fehlt, ist nicht Farbe, sondern **Mut damit**. Die dunklen Flächen auf
der Jetzt-Seite („Die großen Themen", der Spickzettel) sind das Stärkste,
was die Seite optisch hat, und sie kommen zweimal vor. Die neue Seite
arbeitet durchgehend mit dem Wechsel aus großen ruhigen Cremeflächen und
wenigen dunklen Blöcken, die etwas Wichtiges tragen.

Dazu drei Dinge, die heute fehlen:

* **Ein erster Bildschirm, der eine Aussage macht** statt eine Seite
  anzukündigen.
* **Bilder.** Die Seite hat außer dem Chartrad keine. Ein Chart ist
  grafisch stark — das gehört groß, nicht in eine Ecke.
* **Eine Sache, die sich bewegt**, wenn man sie anfasst. Der Zeitstrahl
  ist der Anfang davon.

---

## 7 · Die Reihenfolge

| | | warum zuerst |
|---|---|---|
| 1 | **Start** bauen | Damit du überhaupt einen Link verschicken kannst |
| 2 | Navigation auf vier Türen | Danach findet man sich zurecht, auch mit altem Inhalt dahinter |
| 3 | Die zwölf `raum-*` zusammenlegen | Der größte einzelne Gewinn: 35.000 Wörter, eine Seite |
| 4 | Mond, Häuser, Planeten zusammenlegen | Noch einmal rund 25 Seiten |
| 5 | Rest nach `archiv/` | Was dann noch übrig ist, braucht niemand |

Nach Schritt 1 und 2 ist die Seite benutzbar. Alles danach ist Aufräumen
und kann dauern.

---

## 8 · Woran man erkennt, dass es fertig ist

1. Du kannst jemandem **einen Link schicken**, und derjenige weiß nach
   zehn Sekunden, was du machst und was es kostet.
2. Die Navigation hat **vier Punkte**, und jeder gehört zu genau einem
   Menschen.
3. **Kein Thema liegt zweimal.** Geprüft, nicht gehofft.
4. Die Zahl der Handarbeitsseiten ist **gefallen**, nicht gestiegen.
5. Deine Werkstatt steht **nicht im Menü**.
6. Auf 390 Pixeln macht der erste Bildschirm **eine Aussage**.

---

## 9 · Was offen ist

* **Der Name des Angebots.** „Schwerkraft" ist Arbeitstitel. Domain und
  Handle sind nicht geprüft — das musst du selbst tun, bevor es fest wird.
* **Die Preise.** Stehen auf „Start", also müssen sie vorher entschieden
  sein. Das fremde Dokument schlägt 250–350 € für ein Reading vor; ob das
  deine Zahl ist, entscheidest du, nicht es.
* **Buchung.** Ob ein Kalenderlink reicht oder es mehr braucht, hängt
  davon ab, wie viele Anfragen kommen. Fürs Erste reicht eine
  E-Mail-Adresse.
