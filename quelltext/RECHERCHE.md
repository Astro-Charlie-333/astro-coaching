# Recherche

Wie die Plattform von außen lernt. Gegenstück zu `AUFGABEN.md`: dort steht,
was gebaut wird — hier steht, **warum** es sich lohnt.

Zwei Rollen, strikt getrennt:

| | |
|---|---|
| **Die Späherin** | schaut nach außen, schreibt Funde hierher und schlägt Aufgaben vor. **Ändert nie Code.** |
| **Die Bauende** | schaut nach innen, nimmt die oberste Aufgabe aus `AUFGABEN.md` und baut sie. |

Die Trennung ist der Punkt. Eine Agentin, die recherchiert *und* baut, baut am
Ende das, was sie zuletzt gelesen hat. Eine, die nur vorschlägt, zwingt zur
Entscheidung — und die trifft ein Mensch.

---

## Was recherchiert wird

Drei Spuren, abwechselnd. Jede Woche eine.

### Spur A · Fachliches
Was die Astrologie und die Coaching-Praxis zu einem Thema wirklich hergeben.
Quellen, Streitstände, Verfahren, die wir noch nicht haben.

Nützliche Fragen: Welche Technik beantwortet eine Frage, die wir bisher nicht
beantworten? Wo behauptet unsere Seite etwas, das fachlich umstritten ist,
ohne das zu sagen? Was sagen Coaching- und Therapieliteratur über die Art
Frage, die unsere Bereiche stellen?

### Spur B · Markt
Was es schon gibt und was die anderen gut machen. Co-Star, The Pattern,
Chani, astro.com, astro-seek, Cafe Astrology, dazu Coaching-Werkzeuge
außerhalb der Astrologie.

Nützliche Fragen: Was macht dort jemand so gut, dass wir es als Maßstab
nehmen sollten? Wo ist eine Lücke, die zu uns passt? Was versprechen die,
was sie nicht halten — und wollen wir dort ehrlicher sein?

**Nie abschreiben.** Es werden Ideen und Lücken notiert, nie Texte
übernommen. Ein Fund, der nur aus fremdem Wortlaut besteht, ist kein Fund.

### Spur C · Was Menschen wirklich fragen
Wonach gesucht wird, was in Foren und Bewertungen steht, woran Leute
scheitern. Besonders bei den Gruppen, für die diese Plattform gedacht ist:
Menschen, die sich selbst verstehen wollen; Coaches; Therapeutinnen;
Astrologinnen; AuDHS-Erwachsene.

Nützliche Fragen: Welche Frage stellen Leute immer wieder, die unsere Seite
nicht beantwortet? Welches Wort benutzen sie dafür — und benutzen wir es auch?

---

## Wie ein Fund aussieht

Ein Fund ist nur dann ein Fund, wenn er zu einer Entscheidung führt. Format:

```
### JJJJ-MM-TT · Spur B · Kurzer Titel

**Gesehen:** Was konkret beobachtet wurde, mit Quelle.
**Heißt für uns:** Was daraus folgt — oder warum nichts folgt.
**Vorschlag:** Die Aufgabe, die daraus würde. Oder: kein Vorschlag.
**Dagegen spricht:** Was man gegen den Vorschlag sagen kann.
```

Der letzte Punkt ist Pflicht. Ein Vorschlag ohne Gegenargument ist eine
Werbung, keine Recherche.

## Was ein Fund nicht ist

* „Alle machen jetzt X" — ohne dass klar ist, ob X zu uns passt.
* Eine Zahl ohne Quelle.
* Ein Trend, der nur ein Trend ist.
* Etwas, das unsere Grundregel bricht: Inhalt vor Maschinenraum, Ehrlichkeit
  über die Grenzen der Methode. Was dagegen verstößt, kommt nicht hinein —
  egal, wie gut es bei anderen läuft.

---

## Höchstens zwei Vorschläge pro Woche

Mehr kann niemand entscheiden, und eine Liste, die schneller wächst als sie
abgearbeitet wird, ist keine Liste mehr, sondern ein Vorwurf.

---

## Funde

### 2026-10-21 · Spur B · Die Stufenleiste trägt den Vorsprung — und steht auf 5 von 124 Seiten

**Gesehen:** The Pattern ist der bekannteste Versuch im Markt, ohne
Fachsprache auszukommen. Newsweek beschreibt die App am 12. Juli 2019
(unter Berufung auf The Daily Dot) als eine, die Vokabular über
Sonnenzeichen und Aspekte vermeidet und stattdessen Persönlichkeitstexte
in drei Abschnitten zeigt
(`newsweek.com/what-pattern-everything-you-need-know-about-app-channing-tatum-freaking-out-over-1449099`).
Bustle beschreibt dieselbe App am 15. Mai 2024 mit einer Oberfläche voller
Geburtsbild, Sonne, Mond, Aszendent, Transite, Aspekte und Stellungen wie
„Pluto conjunct Venus" (`bustle.com/life/pattern-app-review-features-price`).
Eine Besprechung von 2026 nennt sie weiter fachsprachenfrei und benennt den
Preis dafür — die Nutzerin sehe nicht, warum die App sagt, was sie sagt —,
steht aber im Blog einer konkurrierenden App und ist damit kein
unabhängiger Befund (`blog.whisper.day/reviews/the-pattern-review-2026/`).
Welche der beiden Lesarten stimmt, ändert nichts am Schluss: Eine
fachsprachenfreie Oberfläche, die nur von der Absicht ihrer Autorinnen
gehalten wird, bleibt über fünf Jahre nicht fachsprachenfrei. Entweder sie
ist abgedriftet, oder sorgfältige Leserinnen derselben App sind sich nicht
einig, ob sie es ist.

Bei uns hält nicht die Absicht, sondern `bau-*.py`: `REGELN.md`
Abschnitt 2 sagt, der Bau bricht ab, wenn auf Stufe 0 ein verbotenes Wort
sichtbar ist. Diese Prüfung sitzt aber in den einzelnen Bauskripten, nicht
unter den sechs Querprüfungen, die `pruefe-alles.py` über alle
ausgelieferten Seiten laufen lässt. Im Auslieferstand liegen 124
HTML-Seiten. Fünf davon tragen `#nivleiste`. Die 108 Seiten, die
`pruefe-alles.py` selbst unter `HANDARBEIT` führt, tragen weder
`#nivleiste` noch `ac-tech` noch `data-ab` — nachgezählt im Repo, Stand
dieses Commits.

**Heißt für uns:** „Verständlich auf jeder Stufe" (`PRODUKT.md`
Abschnitt 3) ist heute eine Eigenschaft von fünf Seiten, nicht der
Plattform. Der Satz in `REGELN.md`, die Stufe gelte für die ganze
Plattform, beschreibt die Absicht, nicht den Auslieferstand. Der Markt
zeigt, dass sich der Abstand zwischen beidem nicht von selbst schließt.

**Vorschlag:** Eine siebte Querprüfung in `pruefe-alles.py`, die die
Seiten ohne Stufenleiste namentlich führt und wachsen nicht zulässt —
dieselbe Bauart wie die Liste `HANDARBEIT`, die laut eigenem Kommentar
schrumpfen soll. Das verlangt nicht, 108 Seiten auf einmal umzubauen. Es
macht das Abdriften unmöglich und den Rückstand bei jedem Lauf sichtbar.
Siehe Aufgabe 14.

**Dagegen spricht:** Eine Zahl, die nur fallen darf, ist eine Sperrklinke,
und eine Sperrklinke über 108 Seiten blockiert Arbeit, die mit der
Stufenleiste nichts zu tun hat: Aufgabe 7 legt doppelte Seiten zusammen
und senkt die Zahl, müsste die Liste also im selben Commit anfassen. Eine
neue Handarbeitsseite wird umständlich, auch wenn sie richtig ist — ein
Impressum braucht keine Stufenleiste. Zweitens ist auf den
Handarbeitsseiten heute nichts kaputt: Sie sind die Bibliothek, und wer
auf `planet-saturn.html` landet, hat den Maschinenraum meist schon
gewollt. An der Prüffrage aus `PRODUKT.md` Abschnitt 6 gemessen ändert
eine Stufenleiste dort weniger, als die Zahl 108 vermuten lässt. Und der
Marktbefund ist dünner, als er aussieht: Die Quellen widersprechen sich,
eine davon ist eine Konkurrentin, und von außen ist nicht zu sehen, ob
The Pattern das Abdriften etwas gekostet hat. Keine meiner Quellen
verbindet das Vokabular mit dem Erfolg oder Misserfolg der App.

### 2026-10-21 · Spur B · Der erste Vorsprungssatz stimmt nicht mehr

**Gesehen:** `PRODUKT.md` Abschnitt 3 sagt, fast alles auf dem Markt rede
über dich allein, und führt die zweite Person als etwas, das es so sonst
nicht gibt. Das deckt sich nicht mit dem, was die Marktführer tun.
Newsweek beschreibt am 12. Juli 2019, dass The Pattern Passung über
zusammengesetzte Persönlichkeitsanteile beurteilt statt über
Zeichenvergleiche, und dass diese Beziehungstexte unverblümt ausfallen
können. Bustle beschreibt am 15. Mai 2024 den Reiter „Bonds" für
romantische und freundschaftliche Passung: das erste eigene Profil
kostenlos, drei weitere für 9,99 Dollar — die Paarsicht ist dort also
nicht nur vorhanden, sie ist das, was verkauft wird
(`bustle.com/life/pattern-app-review-features-price`). Co-Star führt eine
Freundesliste mit Passung als eine seiner Hauptfunktionen; eine
Gestaltungskritik der Pratt-Hochschule vom Februar 2022 behandelt den
Freundesbildschirm als einen der Kernbildschirme der App
(`ixd.prattsi.org/2022/02/design-critique-co-star-iphone-app/`).

Die Lücke, die meine Quellen wirklich benennen, ist eine andere: Die
Passungstexte von CHANI seien deutlich weniger entwickelt als die übrigen,
weil handgeschriebener Text nicht alle Kombinationen abdecken könne — das
steht allerdings im Blog einer konkurrierenden App
(`auraeastrology.com/blog/chani-app-review-2026-an-astrologers-honest-opinion`).
Und in allem, was ich gelesen habe, fand ich kein Produkt, das die dritte
Person im Raum anspricht, also die Coachin, die mit zwei Menschen
arbeitet, und keines, das sagt, wie häufig eine Paaraussage rechnerisch
überhaupt auffällig ist. Das ist das Fehlen eines Befundes in meiner
Suche, kein Beweis, dass es das nicht gibt.

**Heißt für uns:** Die Paarsicht als solche ist kein Vorsprung mehr. Sie
ist besetzt, und sie ist bezahlt. Ein Vorsprung kann noch in der
Verbindung mit den beiden anderen Punkten aus Abschnitt 3 liegen:
Ehrlichkeit darüber, wie häufig eine Aussage überhaupt ist, und die Sicht
der Coachin. Solange Abschnitt 3 die weite Fassung behauptet, wird jede
Aufgabe an einem Satz gemessen, der nicht trägt — und wir bauen auf einen
Vorsprung zu, den wir nicht haben.

**Vorschlag:** Den ersten Vorsprungssatz in `PRODUKT.md` Abschnitt 3 auf
das nachschärfen, was überprüfbar bleibt. Siehe Aufgabe 15.

**Dagegen spricht:** Abschnitt 3 sagt „fast alles", nicht „alles". Co-Star
und The Pattern widerlegen den Satz nicht, sie verengen ihn, und ein
Dokumentensatz, der zu vier Fünfteln zutrifft, kostet nichts. Zweitens
sagt keine meiner Quellen, wie gut diese Funktionen wirklich sind: Bustle
beschreibt einen einzigen Versuch, die beiden kritischen Besprechungen
stehen in Blogs von Konkurrentinnen, und ich habe die Apps nicht benutzt.
Den eigenen Maßstab auf dieser Grundlage zu korrigieren, ist
möglicherweise sicherer formuliert, als die Belege hergeben. Und
drittens: Ein umgeschriebener Satz in `PRODUKT.md` erzeugt keine Seite.
Wer die Stunde dafür aufwendet, hat den Monatsbericht aus Aufgabe 1 nicht
weitergebracht.
