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
### 2026-10-28 · Spur C · Die geratene Geburtszeit ist überall erlaubt und nirgends vermerkt

**Gesehen:** „Was, wenn ich meine Geburtszeit nicht kenne?" ist eine Frage,
die Menschen wirklich und immer wieder stellen. Eine Astrologin schreibt am
24. März 2013, Menschen nennten ihr „immer wieder" die Uhrzeit, die sie von
der Mutter haben, und „nicht wenige Menschen" hätten keine Chance, an ihre
Geburtszeit zu kommen; sie selbst berate nur, wenn jemand die Zeit beim
Standesamt erfragt hat
(`astromind.de/astrologie-artikel/spot-an-geht-ohne-geburtszeit-wirklich-gar-nichts.html`).
Ein Leserkommentar dort beschreibt die Praxis, die zu 12:00 gehört: Zeit auf
mittags setzen und dann den Mond und die Häuser weglassen. Städte führen für
diese Frage eigene Dienstleistungen: Braunschweig verlangt für die Auskunft
über die Geburtszeit 20,00 Euro im Voraus und rechnet mit etwa vier Wochen
(`braunschweig.de/vv/produkte/II/32/32_6/anfragegeburtszeit.php`).

Beschaffbar ist die Zeit in Deutschland also, aber nicht umsonst und nicht
heute. § 59 PStG in der seit dem 1. November 2022 geltenden Fassung
(3. Personenstandsrechts-Änderungsgesetz vom 19. Oktober 2022, BGBl. I
S. 1744) verlangt in der Geburtsurkunde „Ort sowie Tag, Stunde und Minute
der Geburt" (`buzer.de/59_PStG.htm`). Hamburg sagt dazu, die genaue
Geburtszeit stehe seit diesem Datum „auch in jeder neuen Geburtsurkunde",
bei älteren sei sie nicht zwingend enthalten; im beglaubigten Ausdruck aus
dem Geburtenregister steht sie, 19,50 Euro je Urkunde
(`hamburg.de/service/info/11254336/n0/`). Für erwachsene Nutzerinnen heißt
das: Ihre eigene Urkunde trägt die Zeit in der Regel nicht.

Bei uns nehmen vier Stellen eine Geburtszeit an. `tool.html` sagt es
ehrlich: „Wenn du die Uhrzeit nicht kennst, nimm 12:00; dann stimmen Sonne
und Planeten, nur Aszendent und Häuser nicht." `ankommen.js` sagt dasselbe
in anderen Worten. `chart-rechner.html` warnt nur vor der Zeitzone.
`profile.html` trägt 12:00 vor und sagt dazu nichts — und das ist die
Seite, auf die 123 der 126 ausgelieferten Seiten im Wurzelordner verweisen,
auch die Leerzustände von Heute, Dossier und Geistführung, von denen einer
ausdrücklich dazuschreibt, „weil alles an den Häusern hängt". Auf
`ankommen.html`, wo der ehrliche Satz steht, verweist genau eine Seite.
Gespeichert wird die Zeit wie jede andere Angabe; kein Schlüssel hält fest,
dass sie geraten war. 43 ausgelieferte Dateien benutzen `haus(`.

Was eine geratene Zeit kostet, ist mit der eigenen Rechnung messbar.
`haus()` in `rituale/engine.js` ist Whole Sign und hängt allein am Zeichen
des Aszendenten. Über ein Minutenraster eines ganzen Tages, vier erfundene
Geburten an deutschen Breiten, gerechnet am 2026-10-28: 12:00 trifft das
richtige Aszendenten-Zeichen nur innerhalb eines Fensters von 50 bis 173
Minuten, also 3,5 bis 12 Prozent des Tages. Die kürzesten Zeichenfenster
dieser Tage dauern 26 bis 47 Minuten. Liegt das Zeichen falsch, wandert
jeder Punkt um dieselbe Zahl von Häusern weiter — und damit die Reihenfolge
der zehn Bereiche, der lauteste Bereich und jedes „Dauerthema hier".
Nebenbei: `grade.html` nennt Whole Sign „gegen ungenaue Geburtszeiten
robust". Im Zusammenhang der Grade ist das richtig. Wer auf einer geratenen
Zeit sitzt, kann den Satz als Entwarnung lesen.

**Heißt für uns:** Der Satz fehlt nicht — er steht zweimal da. Was fehlt,
ist sein Ort und seine Haltbarkeit. Die Plattform weiß in der Sekunde der
Eingabe, dass eine Zeit geraten sein könnte, und vergisst es danach für
immer; alles, was danach aus den Häusern kommt, tritt mit derselben Sicherheit
auf wie der Rest. Genau das schließt `PRODUKT.md` Abschnitt 3 aus, und
`REGELN.md` Abschnitt 4 verlangt für jede rechnende Seite, dass sie sagt,
was sie nicht kann.

**Vorschlag:** Den Vermerk einführen und ihn dort anzeigen, wo die
Kernaussage an den Häusern hängt. Siehe Aufgabe 29.

**Dagegen spricht:** Die billige Hälfte — ein Satz am Zeitfeld von
`profile.html` — kostet fast nichts; die teure Hälfte fasst viele Dateien
an und endet leicht als Warnband auf jeder Seite, also als das, was Menschen
überlesen. Zweitens ist Whole Sign dort wirklich robust, wo der Fehler
häufig ist: Eine auf die halbe Stunde erinnerte Zeit stimmt meistens, und
ein Vermerk, der „geraten" nicht von „ungefähr" unterscheidet, warnt die
Falschen. Drittens hängt vieles gar nicht an den Häusern — Zeichen, Aspekte,
gradgenaue Durchgänge —, eine pauschale Warnung würde also übertreiben und
gerade die Ehrlichkeit beschädigen, der sie dienen soll. Viertens habe ich
keine Zahl dazu, wie viele Besucherinnen ihre Zeit nicht kennen: „nicht
wenige" ist der Eindruck einer Praktikerin von 2013, und die Gesetzesänderung
von 2022 hilft Menschen, die danach geboren sind, nicht den heutigen
Erwachsenen. Ist der Fall selten, ist die Arbeit teuer bezahlt. Und
fünftens, der ernsteste Einwand: Nimmt man den Fund ernst, steht nicht ein
Satz zur Entscheidung, sondern der Einstieg. Dann wären die Fragen, ob die
Seite die Zeit genauer verlangt, ob sie den Weg zum Standesamt nennt (etwa
20 Euro, Wochen), oder ob es eine Lesart ohne Häuser gibt. Aufgabe 29
entscheidet das nicht; sie verhindert nur das Vergessen. Wer die größere
Antwort will, sollte sie vor der kleinen entscheiden.

### 2026-10-28 · Spur C · Die häufigsten Fragen der Andersgebauten beantwortet die Seite schon — ein Verfahren heißt falsch

**Gesehen:** Was diese Gruppe wirklich fragt, steht gesammelt bei der
Autismus-Stiftung, einer gemeinnützigen Stiftung in Kassel, die es nach
eigener Angabe seit 2005 gibt. Ihre sechs häufigen Fragen zu AuDHD bei
Erwachsenen: zu alt für eine Diagnostik, was eine Abklärung kostet, welche
Praxen weibliche Erscheinungsformen erkennen, welche Rolle die
Selbstdiagnose spielt, ob es nach der Diagnose Medikamente gibt, ob man die
Diagnose vor der Familie behalten kann
(`autismusstiftung.de/audhd-erwachsene/`). Keine davon ist eine Frage nach
Deutung. Alle sind Fragen nach Zugang.

`diagnose-weg.html` beantwortet sie, und zwar gründlich: Unterlagen vor dem
ersten Anruf, die Hausärztin als Startpunkt, wer abklären darf, realistische
Wartezeiten, Anrufprotokoll, Kostenerstattung, 116 117, dazu „Stand:
September 2026" und der Hinweis, dass es kein medizinischer oder
rechtlicher Rat ist. An der Prüffrage aus `PRODUKT.md` Abschnitt 6 gemessen
leistet diese Seite für die Andersgebaute mehr als die meisten.

Eine Stelle trägt nicht. Die Seite beschreibt für Berlin eine „gemeinsame
zentrale Warteliste" der vier Autismus-Spezialambulanzen, Anmeldung über
ein Online-Formular der Spezialambulanz für Soziale Interaktion, nur am
ersten Mittwoch eines Quartals. Die vier Stellen, die eine Anmeldung und der
erste Mittwoch stimmen. Eine Warteliste ist es nicht: Das Berliner
Autismusnetzwerk, dessen Redaktion an der Hochschulambulanz der
Humboldt-Universität sitzt, beschreibt eine zentrale Vergabe per
Zufallsverfahren, seit Juni 2025 von den vier Zentren gemeinsam
koordiniert; verteilt wird nach organisatorischen Kriterien, individuelle
Wünsche werden nicht berücksichtigt, und Rückmeldung bekommt nur, wer einen
Platz erhält (`berlinerautismusnetzwerk.org/diagnostik/diagnostikplatzvergabe/`,
abgerufen 2026-10-28). Ein Blog aus der Community nennt die vier
Quartalstermine und das Anmeldefenster am Tag selbst
(`differentplanet.de/2025/01/04/diagnostik-warteliste-der-hu-berlin-oeffnet-am-8-1-25/`);
maßgeblich für aktuelle Termine ist die Seite der Ambulanz selbst, die ich
nicht gelesen habe.

Daraus folgt eine zweite Unstimmigkeit auf derselben Seite: Schritt 4 rät,
sich „gleichzeitig überall" anzumelden und abzusagen, sobald ein Termin
sicher ist. Überall sonst ist das der richtige Rat. Hier gibt es eine Tür
für vier Stellen, keine Absage macht einen gewählten Platz frei, und wer
keine Antwort bekommt, ist nicht übersehen worden.

Nebenbei, ohne Vorschlag: Wir schreiben den Namen der Gruppe auf zwei
Weisen. Die meisten ausgelieferten Seiten sagen AuDHS, zwei sagen AuDHD
(`neurodivergente-astrologie.html`, `mondphasen-rhythmus.html`). Beides ist
im deutschsprachigen Raum in Gebrauch: Eine Autismus-Coaching-Seite schreibt
am 12. August 2024 „AuDHS (im englischen: AuDHD)"
(`autismus-coaching-rheinmain.de/post/audhs-schon-wieder-ein-modewort`), die
Autismus-Stiftung schreibt durchgehend AuDHD. Keines der Wörter ist falsch,
also ist nichts zu korrigieren. Wissen sollte es, wer die nächste dieser
Seiten anfasst.

**Heißt für uns:** Auf dieser Seite tut die Plattform etwas, das sie
sonst nirgends tut — sie beantwortet eine Frage, die mit Astrologie nichts
zu tun hat, und tut es gut. Der Preis dafür ist, dass eine solche Seite
altert: Wartezeiten, Verfahren und Beträge ändern sich, und nichts im Repo
macht das sichtbar. Das falsch benannte Verfahren ist billig zu berichtigen.
Das Altern ist die Klasse dahinter, und eine Prüfung auf ein Datum löst sie
nicht, weil kein Bauskript nachsehen kann, ob eine Angabe draußen noch
stimmt. Dafür schlage ich nichts vor; das gehört in diese Spur und wird
wiederkommen.

**Vorschlag:** Den Berlin-Absatz berichtigen. Siehe Aufgabe 30.

**Dagegen spricht:** Es ist ein Absatz auf einer Handarbeitsseite, gelesen
von dem Bruchteil der Besucherinnen, der in Berlin wohnt und einen
Autismus-Verdacht hat. Gegen die offenen Aufgaben 10, 17 und 18 gerechnet,
die alle die Seite betreffen, die jede sieht, ist das ein kleiner Hebel.
Zweitens stützt sich der Fund auf eine Netzwerkseite und einen Blog, nicht
auf die Ambulanz selbst; nennt die ihr Verfahren eine Warteliste, ist unser
Wort vertretbar. Drittens ist „Zufallsverfahren" ein härteres Wort als
„Warteliste" — eine Seite, die eine Hürde senken soll, könnte sie damit
erhöhen; wer es schreibt, sollte die Zahl der Plätze und die Frage nach
Mehrfachanmeldungen weglassen, solange sie nicht von der Ambulanz selbst
belegt sind. Und viertens altert eine heute datierte Berichtigung genauso
wie der Satz, den sie ersetzt: Ohne jemanden, der die Seite alle paar Monate
nachliest, verschiebt der Fund das Veralten nur um einen Schritt.
