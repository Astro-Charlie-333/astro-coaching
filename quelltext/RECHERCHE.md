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

### 2026-11-11 · Spur A · „Nicht überprüft" ist die schonendere Aussage — und zwei offene Aufgaben tragen sie weiter

**Gesehen:** `REGELN.md` Abschnitt 4 verlangt von jeder rechnenden Seite
unter anderem den Satz, „dass die Deutung nicht überprüft ist". Im
Auslieferstand steht dieser Gedanke in vier Fassungen, jede in einer
eigenen Datei:

* `quelltext/bereiche/bereich-daten.js` (`B_EHRLICH`), ausgeliefert auf
  `bereiche.html` und `index.html`: „Die Rechnung ja, die Deutung nicht.
  Es gibt keinen Beleg dafür, dass daraus Ereignisse folgen."
* `quelltext/kern/ich-daten.js`, ausgeliefert auf `uebersicht.html`:
  „… dass daraus ein bestimmter Zug folgt, ist Deutung und nicht
  überprüft."
* `quelltext/zeit/zeit-koerper.html`, ausgeliefert auf `zeiten.html`:
  „Es gibt keinen Beleg dafür, dass dieses Verfahren Ereignisse
  vorhersagt, und es ist nie ernsthaft untersucht worden."
* `quelltext/zeit/zeit-app.js`, ausgeliefert auf derselben Seite:
  „Das Verfahren ist nicht überprüft."

Keine dieser vier nennt eine Quelle. Im Wurzelordner liegen 130
HTML-Seiten; fünf tragen einen Abschnitt „Was das taugt — und was
nicht" (nachgezählt im Repo, Stand dieses Commits).

Für mindestens eine der vier Aussagen ist „nicht überprüft" sachlich
zu schonend. Die Aussage auf `uebersicht.html` betrifft den Schluss von
einer Geburtsstellung auf einen Charakterzug — und das ist der
am häufigsten geprüfte Anspruch des ganzen Feldes. Dean und Kelly
berichten in `Journal of Consciousness Studies` 10 (6–7), S. 175–198
(2003): 2.101 Menschen, zwischen dem 3. und 9. März 1958 in London
geboren, im Schnitt 4,8 Minuten auseinander, erhoben mit elf, sechzehn
und dreiundzwanzig Jahren in einer Untersuchung, die nichts mit
Astrologie zu tun hatte; geprüft wurden 110 Merkmale. Die astrologische
Effektstärke war 0,00 ± 0,03. Fünf der 110 Korrelationen waren bei
p = 0,05 signifikant, erwartet waren nach Zufall etwa 5,5. Dieselbe
Arbeit fasst über vierzig kontrollierte Untersuchungen zur Trefferquote
von Astrologinnen zusammen — knapp 700 Astrologinnen, etwa 1.150
Geburtsbilder, mittlere Effektstärke 0,051 (SD 0,118, p = 0,66) — und
die Übereinstimmung der Astrologinnen untereinander mit 0,101, von den
Autoren „essentially no agreement at all" genannt. Die Zahl aller
empirischen Untersuchungen zur Astrologie liege über fünfhundert
(`journalpsyche.org/articles/0xc062.pdf`).

Dass es dabei einen Streitstand gibt, gehört dazu. Die bekannteste
Einzeluntersuchung ist Shawn Carlson, „A double-blind test of
astrology", `Nature` 318 (6045), S. 419–425, 5. Dezember 1985
(`link.springer.com/article/10.1038/318419a0`; den Volltext habe ich
nicht gelesen, er liegt hinter einer Anmeldung). Suitbert Ertel hat sie
im `Journal of Scientific Exploration` 23 (2) neu ausgewertet — die
Seite der Zeitschrift nennt im Zitatblock 2010, in den Metadaten 2009.
Er hält Carlson vor, der Aufbau habe „violated the demands of
fairness", und berichtet aus der Neuauswertung eine Zuordnung besser
als der Zufall mit p = 0,054 in der dreifachen Zwangswahl und p = 0,04
bei einer Zehnpunkt-Bewertung. Sein eigener Schluss: das reiche nicht,
um Astrologie als belegt zu behandeln, wohl aber, um Carlsons negatives
Urteil als nicht gerechtfertigt zu zeigen
(`journalofscientificexploration.org/index.php/jse/article/view/99`;
auch hier habe ich nur die Seite der Zeitschrift gelesen, nicht die
Arbeit).

Für das, was diese Plattform tatsächlich rechnet — laufende Transite
gegen das Radix —, ist die Lage dünner als für Geburtsbild und
Charakter. Eine Sammlung von 91 Kurzfassungen aus vier astrologischen
Fachzeitschriften (37 `Correlation`, 22 `APP`, 18 `AinO`, 14 `Kosmos`,
überwiegend 1980 bis 2000) führt mehrere Transit-Untersuchungen:
Kindesentführungen mit 25 beobachteten Mars-Saturn-Transiten gegen 19,3
erwartete, nicht signifikant, das stärkste Einzelergebnis bei p = 0,10;
gewaltsame Todesfälle, deren Folgeuntersuchung an 1.500 Fällen keinen
signifikanten Zusammenhang fand; Arbeitsunfälle mit einem Verhältnis
von etwa 1,38 bei 15 Grad Orbis, deren schwedische Folgeuntersuchung
„total non-significance" ergab
(`astrology-and-science.com/d-rese2.htm`, abgerufen 2026-11-11). Diese
Seite trägt keinen Verfassernamen und kein Datum und steht auf einer
Netzpräsenz der skeptischen Seite; die Untersuchungen selbst sind in
den Zeitschriften der Astrologinnen erschienen.

Das Entscheidende: Die Plattform kann die stärkere Aussage längst. Sie
steht dreimal im Haus, nur nicht in den Ehrlichkeitsabschnitten der
rechnenden Seiten. `mond.html` schreibt zum Vollmond: „Eine große
Auswertung von Studien fand dafür keinen Beleg (Rotton und Kelly,
1985)" — eine echte Arbeit, von der CMAJ als Rotton und Kelly, „Much
ado about the full moon: a meta analysis of lunar-lunacy research",
`Psychological Bulletin` 97 (2), S. 286–306, 1985 geführt, 37 Studien,
Mondphasen erklärten höchstens ein Prozent der Streuung
(`cmaj.ca/custom-print/140324`). `berufe.html` schreibt:
„Untersuchungen dazu sind wiederholt negativ ausgefallen."
`zahlen.html` schreibt über die Biorhythmen, Terence Hines habe über
hundert Studien durchgesehen, und nennt das Verfahren „überprüft und
widerlegt".

**Heißt für uns:** „Nicht überprüft" klingt wie eine offene Frage.
„Geprüft und negativ ausgefallen" ist eine andere Aussage, und für den
Teil, um den es auf `uebersicht.html` geht, die zutreffende. Der
Unterschied ist genau der, den `PRODUKT.md` Abschnitt 3 den Markenkern
nennt, und `REGELN.md` Abschnitt 7 verlangt ihn ausdrücklich: Was nicht
belegbar ist, steht als nicht belegbar da. Eine Formulierung, die den
Forschungsstand freundlicher darstellt, als er ist, ist dieselbe Art
Fehler wie eine, die ihn verschweigt — nur schwerer zu bemerken, weil
sie ehrlich klingt.

Dazu kommt, dass der Satz gerade im Begriff ist, sich zu vermehren.
Aufgabe 10 und Aufgabe 17 nennen „dass die Deutung nicht überprüft ist"
beide als Fertig-Kriterium: der Monatsbericht und „Heute" sollen ihn
bekommen. Wer die Formulierung ändern will, ändert sie günstiger vor
diesen beiden als danach.

**Vorschlag:** Die Aussage über den Forschungsstand an eine Stelle
legen, nach Verfahren unterschieden, mit Quelle — und die vier
vorhandenen Fassungen von dort holen. Siehe Aufgabe 71.

**Dagegen spricht:** „Widerlegt" wäre für diese Plattform zu stark. Was
geprüft wurde, ist überwiegend nicht, was sie tut: Geburtsbild gegen
Charakter und die Trefferquote von Astrologinnen, nicht laufende
Transite gegen das Radix. Für die Transite habe ich drei kleine
Untersuchungen auf einer unsignierten, undatierten Seite gefunden und
sonst nichts; daraus folgt kein Urteil, sondern der Satz, dass es kaum
Untersuchungen gibt. Eine Formulierung, die das nicht trennt, tauscht
eine zu freundliche Aussage gegen eine zu harte.

Zweitens ist der Streitstand echt. Ertels Neuauswertung ist
veröffentlicht, und ihre beiden Ergebnisse weisen in die andere
Richtung (p = 0,054 und p = 0,04). Dean ist auf der skeptischen Seite
Partei, und die Sammlung, aus der ich die Transit-Untersuchungen habe,
steht auf seiner eigenen Netzpräsenz, ohne Verfasser und ohne Datum.
Ich habe keine der Arbeiten im Volltext gelesen, sondern
Zusammenfassungen und Übersichten; wer den Satz schreibt, sollte
mindestens Dean und Kelly 2003 selbst gelesen haben.

Drittens arbeitet der Ehrlichkeitsabschnitt heute, weil er kurz ist:
vier Fragen, vier Antworten, in der Sprache der Seite. Ein Satz mit
Zeitschrift, Jahrgang und Effektstärke ist genau das, worüber die
Besucherin hinwegliest — und `PRODUKT.md` Abschnitt 2 sagt, dass diese
Zielgruppe ein Format erkennt. Eine Quellenangabe kann Vertrauen
herstellen oder wie ein Beipackzettel wirken; welches von beidem, hängt
am Satzbau und nicht an der Entscheidung.

Viertens, und am ernstesten: Die Seite rechnet weiter. Ein Satz, der
auf derselben Seite sagt, dass das Verfahren geprüft und negativ
ausgefallen ist, steht neben einer Sortierung, die behauptet, hier sei
es gerade laut. Das ist zu verantworten — `bereiche.html` sagt bereits,
was es stattdessen kann, nämlich einem Jahr eine Gliederung geben —,
aber es ist ein schmaler Grat, und für die Begleitete, die das Werkzeug
zwischen zwei Sitzungen benutzt, kann der stärkere Satz entweder die
Voraussetzung sein, es überhaupt zu benutzen, oder der Grund, es
zuzumachen. Welches davon, weiß ich nicht; ich habe keine Nutzerin
gefragt.

Und fünftens erzeugt die Aufgabe keine Seite. Sie fasst vier Textstellen
und eine Zeile in `REGELN.md` an. Die offenen Aufgaben 10, 17 und 18
betreffen Seiten, die jede sieht.

### 2026-11-11 · Spur A · Der Handgriff hat die richtige Form; die Wirkung sitzt in der Hälfte, die fehlt

**Gesehen:** `REGELN.md` Abschnitt 3 verlangt von jedem Bereich als
zweite der fünf Fragen „Was du tun kannst — ein Handgriff, nicht fünf".
Das ist dieselbe Form, die die Coaching- und
Verhaltensänderungsforschung seit Jahrzehnten untersucht, dort unter
dem Namen Wenn-dann-Plan. Gollwitzer und Sheeran haben 94 unabhängige
Prüfungen zusammengefasst und eine Effektstärke von d = 0,65 berichtet
(`Advances in Experimental Social Psychology` 38, S. 69–119, 2006;
`kops.uni-konstanz.de/handle/123456789/10973`).

Diese Zahl ist überholt. Die heute größte Zusammenfassung — Sheeran,
Listroma und Gollwitzer, „The when and how of planning", `European
Review of Social Psychology` 36 (1), S. 162–194, 2025 — wertet 642
unabhängige Prüfungen aus 294 Berichten aus und kommt auf d = 0,36
(95-Prozent-Intervall 0,33 bis 0,40), nach Korrektur für
Veröffentlichungsverzerrung 0,35, in einer robusten bayesschen
Auswertung 0,15 (0,08 bis 0,22). Die Autoren nennen die
Veröffentlichungsverzerrung erheblich und mahnen zur Vorsicht. Für
unsere Frage zählen vor allem die Unterschiede innerhalb dieser Zahl:

* Wenn-dann-Pläne, die an eine Bedingung hängen: d = 0,43. Terminpläne,
  die nur ein Zeitfenster nennen: d = 0,29.
* Nur eine Zeit genannt: d = 0,25. Zeit und Ort: d = 0,46. Zeit, Ort und
  dazu, wie und wie lange gehandelt wird: d = 0,24 — die Autoren
  schreiben, das halbiere die Wirkung gegenüber Zeit und Ort.
* Bei starkem, selbst getragenem Ziel: d = 0,79 gegen schwaches.
* Im Labor d = 0,49, im Feld d = 0,27; an objektiven Maßen d = 0,43, an
  Selbstauskunft d = 0,28.
* Dort, wo die Teilnehmenden die Situation selbst bestimmten (20
  Prüfungen), nur d = 0,16. Die Autoren empfehlen deshalb, die Situation
  vorzugeben oder eine kuratierte Auswahl anzubieten
  (`kops.uni-konstanz.de/server/api/core/bitstreams/d703c468-46e9-47fc-8900-d32d7d19c8d9/content`).

Bei uns sieht das so aus. `rituale/pruefwerk.py` prüft an einer Stelle,
was ein Handgriff **nicht** darf: keinen Preis aufmachen, keine Folge
nach dem Fenster behaupten, nicht vorhersagen, was er hervorbringt.
Vier Verbote, mit festen Beispielen darunter. Keine Regel verlangt,
dass etwas darin **steht**. `bereich-daten.js` trägt zehn echte
Handgriffe — neun Wanderer und den stillen Bereich; `tunWieOben`
verweist nur, `tunVor` ist eine Beschriftung. Einer der zehn nennt die
Situation, in der gehandelt wird: „Die Energie in etwas Körperliches
stecken, bevor sie in ein Gespräch gerät. Dann das Gespräch führen."
Fünf der zehn nennen die Zeit mit einem unbestimmten Wort — „gerade",
„dieser Tage", „diese Tage", „in diesen Wochen". Nach Aufgabe 41 landen
unter derselben Zeile noch 62 `meistern`-Texte; dreizehn davon nennen
eine Bedingung, elf davon mit „bevor" („Hilfe holen, bevor es dringend
wird"), und auch die sind eher eine Bedingung als eine Situation, die
man wiedererkennt (nachgezählt im Repo, Stand dieses Commits).

**Heißt für uns:** Die Bauentscheidung war richtig, und zwar aus dem
Grund, den die Forschung angibt: ein Handgriff, nicht fünf. Was sie
dazusagt, ist, in welcher Hälfte die Wirkung sitzt — in der Situation,
nicht in der Handlung. Und sie sagt genau das über die Hälfte, die wir
heute weglassen: Ein Fenster von Wochen ist ein Terminplan (d = 0,29),
eine wiedererkennbare Situation ist ein Wenn-dann-Plan (d = 0,43). Die
eine Sache, die die Autoren ausdrücklich empfehlen — die Situation
vorzugeben, statt sie der Person zu überlassen —, ist etwas, das eine
Seite kann und ein Mensch allein für sich schlechter hinbekommt.

Dazu kommt ein Argument, das ohne jede Effektstärke trägt: `REGELN.md`
Abschnitt 6d verlangt, dass jeder eingesetzte Halbsatz etwas bezeichnet,
das man sich vorstellen kann. „Zeig dich. Schick die Mail" bezeichnet
weniger als „bevor sie in ein Gespräch gerät". Die Regel steht schon da;
die Forschung ist der Grund, an dieser Stelle nachzusehen.

**Vorschlag:** Die zehn Handgriffe in `bereich-daten.js` um die
Situationshälfte ergänzen und die Anforderung neben `handgriff_tadel`
stellen. Siehe Aufgabe 72.

**Dagegen spricht:** Die Zahlen gelten für Menschen, die sich selbst
einen Plan für ein Ziel bilden, das sie schon haben — nicht für eine
Besucherin, die einen Satz liest. Der stärkste Unterschied in der
ganzen Auswertung ist die Motivation (d = 0,79 bei starkem Ziel), und
den bringt eine Seite nicht mit. Feld statt Labor halbiert den Effekt
schon ohne uns. Was die Forschung stützt, ist also die **Form**, nicht
die Erwartung, dass ein Satz auf einer Seite etwas bewegt. Das ist
ohnehin nichts, was die Plattform behaupten darf: `pruefwerk` bricht
den Bau ab, sobald ein Handgriff vorhersagt, was er hervorbringt.

Zweitens hat die Form dokumentierte Kosten, und sie treffen unsere
Leute. Parks-Stamm und Gollwitzer („Goal implementation: The benefits
and costs of if-then planning", in Moskowitz (Hrsg.), *The psychology
of goals*, Guilford Press 2009, S. 362–391) berichten: Wer eine
Situation festlegt, erkennt andere, gleich gute Gelegenheiten
schlechter; wer einen schlechten Plan hat, hält länger daran fest; bei
Häfner (2000) nutzten 34 Prozent mit Wenn-dann-Plan eine unerwartete
Gelegenheit gegen 57 Prozent ohne; und bei Powers u. a. (2005) machten
sozial vorgeschriebene Perfektionistinnen nach einem Wenn-dann-Plan
weniger Fortschritt und berichteten mehr negative Stimmung. Das letzte
ist der ernsteste Einwand. `PRODUKT.md` Abschnitt 2 nennt die
Andersgebaute, die ihr Leben lang Erklärungen bekommen hat, die nicht
passten, und verbietet jeden Ratschlag, der Überforderung zum
Charakterfehler macht. Ein Satz, der eine Situation vorschreibt, ist
näher an dieser Grenze als einer, der eine Handlung nennt.

Drittens ist die Aufgabe größer, als sie klingt, und hängt an einer
anderen. Zehn Texte sind schnell geschrieben, aber nach Aufgabe 41
gehören 62 weitere in dieselbe Zeile; solange nicht entschieden ist,
welche Texte Handgriffe sind, verlangt eine neue Regel entweder zu
wenig oder in 62 Fällen zu viel. Vorher gebaut, verriegelt sie den
kleineren Teil und macht den größeren später teurer.

Viertens kostet die Situationshälfte Länge, und Länge ist hier nicht
frei: `PRODUKT.md` Abschnitt 2 sagt, dass die Karten abfotografiert und
weitergeschickt werden und allein stehen müssen. Zwei Halbsätze mehr auf
jeder Karte sind gegen diese Nutzung gerechnet nicht umsonst.

Und fünftens habe ich keine der vier Arbeiten im Volltext gelesen,
sondern die Zusammenfassungen und die Kapitelfassung bei KOPS. Die Zahl
d = 0,36 steht gegen d = 0,15 in derselben Arbeit, je nach
Auswertungsverfahren; wer sich darauf stützt, sollte wissen, dass die
Spanne so breit ist.

### 2026-11-18 · Spur B · Jemand rechnet jetzt auch Häufigkeiten — und sagt genauer, woraus

**Gesehen:** Die Zahl „von 100 Menschen" führt `ich-daten.js` selbst als
„das belegte Pfund dieser Seite". Bis jetzt stand sie im Markt allein da.
Seit diesem Sommer nicht mehr: Unter dem Titel „How Rare Are Planetary
Aspects? 150-Year Study" steht eine durchgerechnete Häufigkeitstabelle im
Netz, laut Zeitstempel der Seite zuletzt am 27.08.2026 geändert
(`zodiacroots.com/how-rare-are-planetary-aspects-150-year-study/`).
Gerechnet wurde vom 1.1.1900 bis zum 31.12.2050 — 151 Jahre, die
Überschrift sagt 150 —, 55.152 Tagesschnappschüsse jeweils 12:00 UTC,
zwölf Körper, also 66 Paare, vierzehn Winkelarten, Orbis 0: gezählt wird
nur der exakte Durchgang zwischen zwei aufeinanderfolgenden Tagen.
Ergebnis: 688.746 exakte Durchgänge, Mond–Nordknoten mit 52.695 das
häufigste Paar, Neptun–Pluto mit 98 das seltenste und im ganzen Fenster
ohne einen einzigen exakten Hauptwinkel; 55 Paar-Winkel-Kombinationen
kommen zehnmal oder seltener vor.

Zweierlei daran ist wichtiger als die Zahlen. Erstens: Das sind
Himmelsschnappschüsse, keine Geburtsbilder von Menschen. Die Tabelle
beantwortet, wie selten eine Stellung **am Himmel** ist, nicht, wie viele
Menschen sie haben — und das ist nicht dasselbe, weil ein Mensch den
Himmel eines Augenblicks mitbringt und nicht den eines Mittags. Zweitens
ist die Arbeit nicht nachrechenbar: kein Verfasser, kein Code, keine
Daten, keine Fassung der benutzten Ephemeride, die vierzehn Winkelarten
nicht vollständig aufgezählt, die Regel für das Interpolieren zwischen
zwei Tagespunkten nicht genannt. Die Seite gehört zu einem Anbieter, der
daneben einen kostenpflichtigen Bericht verkauft — das ist kein
unabhängiger Befund, sondern eine Veröffentlichung einer Mitbewerberin,
dieselbe Einschränkung wie bei drei Quellen der Funde vom 21.10. und
11.11. In allen drei Suchen dieser Woche stand die Mehrzahl der Treffer
zu „den besten Astrologie-Apps" auf Netzpräsenzen, die selbst eine
Anwendung anbieten; bei einer Suche acht von neun. Die Besprechungsschicht
dieses Marktes ist überwiegend Werbung, und das ist beim Beantworten der
zweiten Prüffrage aus `PRODUKT.md` Abschnitt 6 jedes Mal einzeln zu
bedenken.

Gegen diesen Hintergrund unsere Seite. Was die Leserin sieht:

* `uebersicht.html`: „… abgezählt an 10.000 erfundenen Geburtsbildern,
  nicht geschätzt."
* `beziehung.html`: „Jeder Balken zeigt, wie stark eine Ebene bei euch
  anklingt, verglichen mit 20.000 zufällig gerechneten Paaren."

Was im Quelltext steht und nicht auf der Seite — nachgelesen im Repo,
Stand dieses Commits:

* `quelltext/kern/_taste-haeufig.js`: 10.000 Bilder, Jahrgänge 1930 bis
  2010, Tag 1 bis 28 jedes Monats, acht feste Orte, alle im
  deutschsprachigen Raum, fester Startwert.
* `quelltext/bez/_verteilung-bez.js`: 20.000 Paare, A geboren 1950 bis
  2005, B höchstens acht Jahre älter oder jünger, Breite 45 bis 55 Grad,
  Länge 5 bis 20 Grad, beide mit Geburtszeit, fester Startwert. Der
  Kommentar sagt, warum der Altersabstand begrenzt ist: „mit beliebigem
  Abstand wären die langsamen Planeten verzerrt."

**Heißt für uns:** Der vierte Vorsprung aus `PRODUKT.md` Abschnitt 3 hält
und ist in dem Punkt, auf den es ankommt, stärker als die
Veröffentlichung der Mitbewerberin: Unsere Tabellen haben einen festen
Startwert, zwei Bauläufe ergeben dieselbe Zahl, und beide Abtaster liegen
im Repo. Deren Tabelle kann niemand nachrechnen. Daran ist nichts zu
ändern.

Ein Satz muss trotzdem nachgezogen werden. In `ich-app.js` steht als
Kommentar, die Seltenheit sei „das Einzige, was diese Plattform hat und
sonst niemand". Das stimmt so nicht mehr: Veröffentlicht wird sie
inzwischen auch anderswo. Was uns bleibt, ist der engere und bessere
Anspruch — nachrechenbar, und über Menschen statt über den Himmel.

Zu ändern ist ein Wort. „20.000 zufällig gerechnete Paare" verspricht
etwas, das die Stichprobe nicht einlöst. Die Vergleichsgruppe ist mit
Absicht geformt, und sie ist genau entlang der Größe geformt, über die
die Zahl Auskunft gibt: Wer den Altersabstand auf acht Jahre begrenzt,
bestimmt damit, wie selten ein Kontakt zwischen zwei langsamen Planeten
aussieht. Ein Paar mit zwanzig Jahren Abstand wird mit Paaren verglichen,
die es nicht geben kann. Dasselbe, schwächer, auf der Ich-Seite: Die
letzten bis zu drei Tage jedes Monats kommen in den 10.000 Bildern nicht
vor, und die Jahrgänge enden 2010. Das ist keine falsche Zahl — sie ist
richtig für die Gruppe, an der sie gemessen wurde. Nur steht diese Gruppe
nirgends, wo sie jemand liest, und damit steht da eine Zahl ohne ihre
Grundlage. `REGELN.md` Abschnitt 7 meint diesen Fall.

**Vorschlag:** Der Satz, der die Zahl trägt, nennt die Vergleichsgruppe,
und die Angabe entsteht aus denselben Werten, mit denen abgetastet wird.
Siehe Aufgabe 85.

**Dagegen spricht:** Erstens Länge, und zwar an der teuersten Stelle.
`PRODUKT.md` Abschnitt 2 Punkt 3 sagt, dass die Karten abfotografiert und
weitergeschickt werden und allein stehen müssen. Ein Halbsatz über
Jahrgänge, Altersabstand und Mitteleuropa ist genau das, worüber
hinweggelesen wird — derselbe Einwand wie gegen die Quellenangabe im Fund
vom 11.11., und er wiegt hier schwerer, weil es die Zeile neben dem
Balken trifft und nicht einen Ehrlichkeitsabschnitt.

Zweitens hat niemand das Missverständnis gemeldet. Dass eine Leserin
„zufällig" als „alle Menschen" liest, ist mein Schluss, keine Beobachtung.
Ich habe keine Nutzerin gefragt, und es ist denkbar, dass die Zahl ohnehin
als Größenordnung gelesen wird und die Vergleichsgruppe niemanden
interessiert.

Drittens trägt der Marktteil dieses Fundes den Schluss nur zur Hälfte.
Die Mitbewerberin zählt Himmel, nicht Menschen; an ihr gemessen sind wir
voraus, und die Korrektur kommt aus unseren eigenen Dateien. Ein Fund, bei
dem der Markt nur der Anlass ist, ist ein schwächerer Fund, und das sollte
beim Abwägen gegen die offenen Aufgaben zählen.

Viertens: Die Aufgabe fasst zwei Sätze an und erzeugt keine Seite. Auf der
Liste stehen über zwanzig Einträge, von denen jeder einzelne etwas
betrifft, das eine Besucherin sieht.

Und fünftens wird der Satz, wenn man ihn ehrlich macht, nicht nur länger,
sondern auch angreifbarer: Wer schreibt, verglichen werde mit Paaren aus
Mitteleuropa mit höchstens acht Jahren Abstand, lädt die Frage ein, warum
dann überhaupt verglichen wird. Diese Frage ist berechtigt, und sie hat
keine kurze Antwort.

### 2026-11-18 · Spur B · Außerhalb der Astrologie steht die Regel für das Urteil über einen Zweiten geschrieben

**Gesehen:** `RECHERCHE.md` zählt zu Spur B ausdrücklich die
Coaching-Werkzeuge außerhalb der Astrologie. Das bekannteste davon ist
ein Fragebogen zur Selbsteinschätzung, und seine Herausgeberin hat
aufgeschrieben, was beim Weitergeben eines Ergebnisses gilt. Zwei Seiten,
beide ohne Datum außer einem Rechtevermerk von 2026; die Grundsätze
berufen sich auf einen Leitfaden des Zertifizierungsprogramms von 2011,
die Regeln sind also mindestens fünfzehn Jahre alt
(`myersbriggs.org/using-type-as-a-professional/mbti-code-of-ethics/`,
`themyersbriggs.com/en-us/support/ethical-principles-for-mbti-practitioners`).
Dem Sinn nach, nicht im Wortlaut, stehen dort vier Dinge:

* Das Ergebnis geht an die Person selbst. An Dritte nur mit ihrer
  ausdrücklichen Erlaubnis; ob sie es zeigt, entscheidet sie.
* Es wird nicht benutzt, um jemanden zu etikettieren, zu bewerten oder
  einzuschränken, und die Teilnahme ist immer freiwillig.
* Die Person ist die letzte Instanz darüber, was auf sie zutrifft. Wer
  deutet, beharrt nicht, wenn sie widerspricht, sondern geht dem
  Unterschied nach.
* Das Ergebnis sagt nichts über Fähigkeit, Verstand, Erfolgsaussicht,
  Gefühle oder Normalität, und es wird als Neigung beschrieben, nicht als
  Festlegung.

Beim Berufsverband der Coachinnen steht das nicht. Der im Oktober 2024
beschlossene Ethikkodex verlangt zutreffende Angaben über das eigene
Angebot (5.2), Arbeiten in den Grenzen der eigenen Kompetenz (5.1), das
Offenlegen anderer Rollen (3.7) und das Ansprechen einer Weitervermittlung,
wenn die Begleitung nichts mehr bringt (4.3). Einen Standard, der
verlangt, die Grenzen eines eingesetzten Werkzeugs offenzulegen, habe ich
darin nicht gefunden
(`coachingfederation.org/wp-content/uploads/2024/11/ethics-code-of-ethics-2024.11.04.pdf`).
Die geschriebene Regel sitzt also bei der Herausgeberin des Werkzeugs,
nicht beim Verband — und die Herausgeberin dieses Werkzeugs sind wir.

Bei uns: `beziehung.html` kündigt oben an „wie du diesen Menschen
erreichst, wie ihr redet, was bei Streit hilft", wählt das zweite Profil
in `#bzsteuer` und gibt den Text über `#bzkopie` und `#bzdruck` aus dem
Haus. Die Wörter „Einverständnis" und „gefragt" kommen auf der Seite
genau zweimal vor, beide Male innerhalb von Deutungssätzen, keines davon
über den zweiten Menschen (nachgezählt im Repo, Stand dieses Commits).
`PRODUKT.md` Abschnitt 5 schließt „Aussagen über eine dritte Person, die
nicht gefragt wurde" aus.

**Heißt für uns:** Von den vier Regeln ist eine bei uns unterwegs:
Aufgabe 76 verlangt den fünften Punkt, dass der andere Mensch zu sich
selbst das letzte Wort hat. Der vierte Punkt — Neigung statt Festlegung —
ist der Sache nach das, was `REGELN.md` Abschnitt 4 mit „keine laute
Phase ist ein Versprechen" meint. Die beiden übrigen stehen nirgends: dass
die Deutung dem gehört, über den sie geht, und dass niemand ungefragt
hineingerät. Sie gehören auch nicht in den Ehrlichkeitsabschnitt — der
steht am Ende und spricht die Leserin an. Sie gehören an die Stelle, an
der der zweite Mensch in die Seite kommt. Diese Stelle hat heute niemand.

**Vorschlag:** Ein Satz dort, wo das zweite Profil gewählt wird. Siehe
Aufgabe 86. Die Textausgabe bleibt bei Aufgabe 76; sie hier mitzumachen
hieße, dieselbe Zeile zweimal anzufassen.

**Dagegen spricht:** Erstens hinkt der Vergleich, und zwar an der Stelle,
auf die es ankommt. Dort füllt die Person selbst einen Fragebogen aus; es
gibt eine Befragte, und deshalb kann es eine Regel geben, wem ihr Ergebnis
gehört. Hier füllt niemand etwas aus — jemand tippt ein Geburtsdatum ein.
Ob eine Regel, die für eine Befragung gemacht wurde, auf eine Rechnung aus
einem Datum übergeht, sagt keine meiner Quellen. Die Übertragung ist meine.

Zweitens ist ein Einverständnis, das niemand prüfen kann, Theater. Die
Seite kann nicht wissen, ob der andere Mensch zugestimmt hat. Ein Haken
zum Anklicken wäre eine Behauptung in der Form einer Sicherung — genau
das, was `PRODUKT.md` Abschnitt 4 für das Freischalten ausschließt: kein
Schalter, der etwas nur vortäuscht.

Drittens steht der Satz im Weg. Die Seite wird aus einem Grund geöffnet,
und `PRODUKT.md` Abschnitt 6 misst sie daran. Aufgabe 75 räumt gerade bei
`profile.html` drei Einstellungen weg, die vor dem Gegenstand stehen; hier
würde im selben Zug eine Zeile davor gesetzt.

Viertens könnte die Ebene falsch sein. Eingetippt werden fremde
Geburtsdaten auf `profile.html`, nicht auf `beziehung.html`. Dort stünde
der Satz an der Quelle statt an der letzten Station — nur ist
`profile.html` Handarbeit ohne `bau-*.py`, die Prüfung müsste also nach
`pruefe-alles.py`, und Aufgabe 75 arbeitet schon an derselben Seite. Wer
beides zusammenlegen will, legt es zusammen; dann ist es eine andere
Aufgabe.

Und fünftens trifft es ausgerechnet die Coachin. Sie arbeitet mit Paaren
und legt den Partner einer Klientin selbstverständlich an. Ein Satz, der
mitschwingen lässt, dass daran etwas heikel ist, kann für sie wie ein
Vorwurf klingen. `PRODUKT.md` Abschnitt 2 nennt sie als eine der fünf, für
die gebaut wird; nichts in meinen Quellen sagt, dass sie diesen Satz
haben will.

### 2026-11-25 · Spur C · Zwei der vier Wörter, unter denen die Zielgruppe die Sache kennt, kommen auf keiner Seite vor

**Gesehen:** `PRODUKT.md` Abschnitt 2 Punkt 1 nennt vier Wörter, die diese
Zielgruppe mitbringt: „Merkur rückläufig", „big three", „Saturn Return",
„mein Mars in …". Nachgezählt im Auslieferstand — 134 HTML-Seiten im
Wurzelordner, Stand dieses Commits:

* „Merkur rückläufig" steht auf 4 Dateien, „rückläufig" auf 28.
* „Saturn Return" steht auf **keiner**. Die Sache selbst ist da, unter
  deutschen Namen: „Deine Saturnrückkehr" als große Karte auf
  `index.html` (aus `kern/themen-daten.js`), „Erste" und „Zweite
  Saturn-Rückkehr" auf der Altersachse von `planeten.html`,
  „Saturnwiederkehr um 29 und um 58" auf `ereignisse-lesen.html`.
* „big three", „Big Three" und „Big 3" stehen auf **keiner**. Die Sache
  ist da als „die drei Großen" (`chart-lesen.html`,
  `reading-ablauf.html`) und „die drei Kernsätze" (`tool.html`,
  `profil-ansicht.html`).
* Zum Vergleich: „Solar Return" — das deutlich weniger bekannte Wort —
  steht auf 15 Dateien, hat zwei eigene Seiten, einen Glossareintrag,
  wird von `begriffe.js` automatisch verlinkt und steht im Suchindex der
  Bibliothek. Englische Namen sind hier also nicht grundsätzlich
  ausgeschlossen.

Am deutlichsten wird es beim Nachschlagen. `glossar.html` hat keinen
Eintrag für Saturnrückkehr, Saturn Return, big three oder die drei
Großen. Das Suchfeld auf `wissen.html` — verlinkt von 83 der
ausgelieferten Seiten, und sein eigener Platzhalter schlägt „Saturn" als
Beispiel vor — kennt zu „saturn" zwei Einträge, von denen einer auf
`planetenzyklen.html` zeigt, eine Weiterleitungshülle. Zu „saturn
return", „big three" und „merkur rückläufig" steht im Index nichts; die
Suche antwortet „Nichts gefunden."

Dazu kommt, dass die Saturnkarte an eine Bedingung hängt: `heute-app.js`
zeigt sie nur, solange der Abstand des laufenden zum eigenen Saturn
höchstens 8 Grad beträgt. Wer 24 ist und das Wort gehört hat, findet
weder die Karte noch das Wort.

Dass es das Wort ist, mit dem die Leute kommen, zeigt die
deutschsprachige Publizistik: Sie führt den englischen Begriff als
Hauptbegriff. `desired.de` titelt am 25. Juli 2023 (Nadine Jungbluth)
„Saturn Return: Die Bedeutung hinter Saturns Rückkehr", behält den
englischen Begriff durchgehend, übersetzt ihn einmal als „Rückkehr des
Saturns" und beginnt mit dem Hinweis, Leserinnen könnten dem Begriff in
sozialen Medien begegnet sein und sich gefragt haben, was er bedeutet;
genannt werden rund 29,5 Jahre Umlauf und Wiederkehren mit etwa 29, 58
und 87 (`desired.de/horoskop/saturn-return-bist-du-schon-astrologisch-erwachsen/`).
Das evangelische `sonntagsblatt.de` bringt am 31. Mai 2024 einen
kritischen Beitrag (Gunter Stemmler, Rubrik Glaube, Stichwort
Aberglaube) unter demselben englischen Begriff; „Rückkehr von Saturn"
steht nur als Umschreibung in der Überschrift, einen deutschen
Fachbegriff bildet der Text nicht, das Alter nennt er mit etwa 29 und
den Anlass mit Popstars und englischsprachigen Medien
(`sonntagsblatt.de/artikel/glaube/astrologie-saturn-return-warum-prominente-ueber-eine-rueckkehr-von-saturn`).
Für das zweite Wort: `sternengedanken.de`, veröffentlicht am
15. September 2023, führt „Die Big 3 in der Astrologie", benutzt „Big 3"
und „Big Three" durchgehend und bietet überhaupt kein deutsches Wort an
(`sternengedanken.de/die-big-3-in-der-astrologie/`). Deutsche Rechner
verkaufen unter dem Wort: „Big-3-Rechner"
(`upastrology.com/de/big-3-calculator`), „deine Big Three"
(`chartodyssey.com/de`). Eine Zahl zum Suchvolumen im deutschen Raum
habe ich nicht; ich habe keine gefunden, die ich nachprüfen konnte.

**Heißt für uns:** Das ist Mandys Einwand aus `REGELN.md` Abschnitt 2a,
eine Ebene höher. Dort kannte die Rechnung die Rückläufigkeiten und die
Lunationen seit Monaten, und die Seite hat jede davon in einen
Bereichsnamen übersetzt — „Es war alles da und nichts davon zu finden."
Die Antwort darauf war die Unterscheidung zwischen Mechanik und Namen,
und die Tabelle führt fünf Namen auf. Die beiden Wörter, die
`PRODUKT.md` selbst nennt, stehen nicht in dieser Tabelle, und der
Auslieferstand zeigt, warum das zählt: Beide Themen sind da, sorgfältig
geschrieben, und unter dem Wort, mit dem jemand ankommt, nicht
erreichbar. `PRODUKT.md` Abschnitt 2 Punkt 1 sagt die Folge selbst: Eine
Seite, die diese Worte vermeidet, wirkt auf diese Gruppe nicht
zugänglicher, sondern wie ein anderes Thema.

**Vorschlag:** Die beiden Namen in die Tabelle in `REGELN.md`
Abschnitt 2a aufnehmen und dort ankommen lassen, wo die Sache schon
erklärt steht — auf der Karte, im Glossar, im Suchindex. Siehe
Aufgabe 102.

**Dagegen spricht:** Erstens, und das ist der stärkste Einwand: Der Fund
argumentiert über Auffindbarkeit, und diese Plattform ist nicht darauf
gebaut, gefunden zu werden. Es gibt keine `robots.txt` und keine
`sitemap.xml`, und eine `meta name="description"` tragen 7 der 134
Seiten. Wer sagt, die Besucherin komme mit dem Wort an, argumentiert über
einen Weg, den es noch nicht gibt. Ist die Frage wirklich, wie Menschen
hier ankommen, dann steht nicht ein Wort zur Entscheidung, sondern der
Zugang — und diese Entscheidung gehört vor die kleine.

Zweitens habe ich keine Zahl. Ich habe, was Verlage schreiben, nicht,
wonach unsere Besucherinnen suchen. Beim Fund vom 28.10. war der Einwand,
„nicht wenige" sei der Eindruck einer Praktikerin; hier ist er härter:
Ich habe gar keine Zahl, und es ist denkbar, dass deutschsprachige
Leserinnen „Saturnrückkehr" sagen und der englische Begriff vor allem
eine Sache der englischsprachigen Presse ist, die deutsche Verlage
übernehmen.

Drittens arbeitet ein englisches Schlagwort gegen den Ton. `PRODUKT.md`
Abschnitt 8 will lieber warm als technisch, `REGELN.md` Abschnitt 4
ruhiges, erwachsenes Deutsch. „Saturn Return" auf Stufe 0 ist das
Register der Apps, von denen sich die Plattform unterscheidet, und
`PRODUKT.md` Abschnitt 2 Punkt 2 sagt, diese Gruppe erkennt ein Format.
Ein Wort, das eingesetzt wird, um gefunden zu werden, kann sich lesen wie
ein Wort, das eingesetzt wird, um zu verkaufen.

Viertens löst die billige Hälfte den Fund nicht. Ein Wort auf der
Saturnkarte kostet fast nichts, aber diese Karte läuft nur innerhalb von
8 Grad. Was wirklich hilft — Glossar und Suchindex — sitzt auf zwei
Seiten, die `pruefe-alles.py` unter `HANDARBEIT` führt und für die es
kein `bau-*.py` gibt; die Prüfung muss also in `pruefe-alles.py`, und
eine von Hand gepflegte Liste von Zweitwörtern altert genau so wie der
Berlin-Absatz aus dem Fund vom 28.10.

Fünftens hat die Namenserlaubnis einen Preis, und diese Aufgabe muss ihn
zweimal zahlen: `REGELN.md` Abschnitt 2a verlangt die Erklärung auf
derselben Karte, in Alltagssprache, vor der Wirkung, dazu die Zeile „Was
oft zu groß erzählt wird". Für den Saturn steht beides schon auf der
Karte. Für die drei Großen stehen die erklärenden Stellen auf Lese- und
Praxisseiten; wandert das Wort dorthin, muss diese Zeile dafür erst
geschrieben werden. Das ist mehr, als ein Wort einzusetzen.

Und sechstens erzeugt die Aufgabe keine Seite. Unter „Als Nächstes"
stehen 37 Einträge; Aufgabe 101 betrifft eine Seite, auf der eine
Besucherin mit einem Profil überhaupt kein Ergebnis bekommt. Daneben ist
ein zweites Wort für ein Thema, das schon geschrieben ist, klein.

### 2026-11-25 · Spur C · Die Frage, die jede Coachin gestellt bekommt, ist beantwortet — der letzte Halbsatz der Antwort hält nicht

**Gesehen:** Spur C fragt, welche Frage immer wieder gestellt wird. Für
die Coachin aus `PRODUKT.md` Abschnitt 2 hat die deutschsprachige
Coaching-Fachpresse aufgeschrieben, woraus der Angriff besteht:
Coaching-Magazin, Ausgabe 1|2025, veröffentlicht am 18. Februar 2025,
Verfasser Dawid Barczynski, in der Rubrik „Kontrovers", aber ohne
Gegenstimme — eine Befürworterin kommt nicht zu Wort. Dem Sinn nach,
nicht im Wortlaut, stehen dort vier Vorwürfe: Zwillings- und
Zeitzwillingsuntersuchungen fanden keinen Zusammenhang zwischen
Geburtszeit und Persönlichkeit (angeführt werden Dean und Kelly 2003
sowie Hartmann und andere 2006); die gefühlte Passung erklärt sich über
den Barnum-Effekt, also darüber, dass vage Allgemeinaussagen als
persönlich treffend angenommen werden; die genannten Angebote —
Einstellung nach Sternzeichen, Teamentwicklung nach Horoskop,
planetengetaktete Karriereplanung — nehmen echte Tatsachen aus einer
Entscheidung heraus und erzeugen falsche Sicherheit, und der Beitrag
fragt, wer die Verantwortung trägt, wenn die Einstellung oder das Team
scheitert; und das Kernproblem sei nicht der private Glaube, sondern
dass Coachinnen Glauben als Wissenschaft darstellen. Ein Selbstversuch
der Redaktion befragte Karriere-Horoskopseiten und einen Chatbot und
bekam für jedes Zeichen bestätigende Auskünfte, dieselbe Paarung je
nach Blickrichtung verschieden
(`coaching-magazin.de/kontrovers/astrologie-im-coaching`). Einen
Ethikkodex eines Coaching-Verbands führt der Beitrag nicht an.

Gegen den Auslieferstand gehalten trifft das meiste davon auf festen
Boden. `klientinnen-fragen.html`, die Seite, die für genau diese Lage
geschrieben ist, führt sieben Klientinnenfragen mit Antworten, darunter
„Glaubst du wirklich daran? Ist das nicht Unsinn?", und weist den
Wissenschaftsanspruch im ersten Satzteil zurück. `berufe.html` — die
Seite, die Charts auf Arbeitsfelder abbildet, also die Praxis, die der
Beitrag angreift — schreibt, es gebe keinen Beleg für einen Zusammenhang
von Geburtsdaten mit Berufswahl oder Berufserfolg, Untersuchungen dazu
seien wiederholt negativ ausgefallen, niemand solle einen Beruf aus einem
Chart wählen, und sagt der Coachin ausdrücklich, nicht „du solltest X
werden" zu sagen. `PRODUKT.md` Abschnitt 5 schließt Diagnose, Vorhersage
und Aussagen über eine nicht gefragte dritte Person aus.

Ein Halbsatz hält nicht, und es ist der letzte genau dieser Antwort.
Nach „Ich sehe Astrologie nicht als Wissenschaft, sondern als Werkzeug
zur Selbstreflexion" endet sie auf: „Was zählt: Hilft es dir, dich klarer
zu sehen? Wenn ja, hat es seinen Zweck erfüllt." Die gefühlte Passung ist
der Maßstab, den der Beitrag als den Mechanismus der Täuschung benennt.
Eine Coachin, die einer Skeptikerin damit antwortet, hat den Punkt
eingeräumt, ohne es zu merken.

Dabei liegt diese Seite außerhalb dessen, wohin Aufgabe 71 schaut. Jene
Aufgabe stützt sich auf vier Fassungen der Forschungsstandsaussage in
vier Dateien. Nachgezählt im Repo über acht feste Wendungen, Stand
dieses Commits, tragen elf ausgelieferte Seiten siebzehn solche Sätze
(dazu einer auf `baukasten.html`, der von Nahrungsergänzung handelt und
nicht von Astrologie). Darunter: `praxis-bereiche.html` trägt denselben
Satz aus `B_EHRLICH` wie `bereiche.html` und `index.html`, wird in der
Aufgabe aber nicht geführt; `index.html` trägt vier, von denen drei je
Verfahren sagen, was gemessen ist und was nicht — also genau das, was
Aufgabe 71 verlangt, und zwar bereits fertig; `zeitqualitaet.html` trägt
zwei weitere; `beziehung.html` sagt von den Seelenebenen, sie seien nicht
überprüft und auch nicht überprüfbar, was eine andere Aussage ist; und
`klientinnen-fragen.html` trägt die oben genannte. Das Fertig-Kriterium
von Aufgabe 71 würde `pruefe-alles.py` an jeder ausgelieferten Seite
abbrechen lassen, die eine eigene Aussage trägt — auch an den drei auf
`index.html`, die richtig sind.

**Heißt für uns:** Der Angriff ist veröffentlicht, datiert und kommt aus
der Fachpresse des Berufs, zu dem die Coachin gehört — und die Antwort
der Plattform darauf steht besser da, als der Beitrag vermuten lässt. Das
ist das Ergebnis, und es ist ein gutes. Daraus folgen zwei Dinge, und
keines davon ist groß. Erstens endet die eine Antwort, die ihr Sicherheit
im Gespräch geben soll, auf dem Maßstab, mit dem die Kritik sie
auseinandernimmt. Zweitens zählt Aufgabe 71 vier Stellen, und es sind
mehr; wer die dort verlangte Prüfung ohne die vollständige Liste baut,
bricht entweder die richtigen Sätze auf `index.html` mit ab oder weicht
die Prüfung auf, bis sie durchgeht.

**Vorschlag:** Den letzten Halbsatz der Antwort ersetzen und die Stelle
in Aufgabe 71 mitführen. Siehe Aufgabe 103. Zu den anderen drei
Vorwürfen schlage ich nichts vor: `berufe.html`,
`klientinnen-fragen.html` und `PRODUKT.md` Abschnitt 5 beantworten sie
schon.

**Dagegen spricht:** Erstens ist es ein Satz auf einer Seite, die von
zwei der 134 ausgelieferten Seiten verlinkt wird
(`fragen-schatzkiste.html` und `praxis.html`), geschrieben für eine der
fünf, in der Sicht, die `REGELN.md` Abschnitt 1 zugeklappt anbietet.
Gegen Aufgabe 101 gerechnet, wo eine Besucherin mit einem Profil
überhaupt kein Ergebnis sieht, ist der Hebel klein.

Zweitens ist die Kritik an dem Halbsatz meine, nicht die des Beitrags. Er
behandelt diese Seite nicht und sagt nirgends, „hilft es dir" sei im
Coaching ein unzulässiger Maßstab; er sagt im Gegenteil, Metaphern und
Analogien seien legitime Coaching-Werkzeuge, solange sie nur die Einsicht
stützen. So gelesen ist „hilft es dir, dich klarer zu sehen" genau der
legitime Gebrauch und kein Eingeständnis. Welche der beiden Lesarten eine
Klientin hört, weiß ich nicht; ich habe keine gefragt.

Drittens ist die Quelle ein einziger Beitrag, und einseitig nach eigener
Bauart: keine Befürworterin zitiert, kein Verbandsstandard angeführt, und
auf derselben Seite steht eine Anzeige für konkurrierende
Eignungsdiagnostik. Darauf eine Änderung der eigenen Antwort zu bauen
heißt, die Formulierung von der schärfsten Kritikerin setzen zu lassen.

Viertens wird der Ersatz länger und schwerer. Die jetzige Antwort
funktioniert, weil sie kurz ist und sich laut sagen lässt. Ein Satz, der
„hat mir beim Denken geholfen" von „hat über mich gestimmt" unterscheidet,
ist richtig und zwei Teilsätze länger — und die Seite verspricht
Sicherheit im Gespräch, nicht Vollständigkeit.

Und fünftens schneidet die Zählung in beide Richtungen. Siebzehn Sätze
auf elf Seiten lassen sich als Wildwuchs lesen, den Aufgabe 71 aufräumen
soll — oder als Beweis, dass die Plattform je Verfahren längst tut, was
die Aufgabe zentralisieren will. Trifft das Zweite zu, dann ist der
richtige Schritt, die Sätze auf `index.html` als Vorbild zu nehmen und
Aufgabe 71 kleiner zu machen, statt ihr eine Stelle hinzuzufügen. Ich
habe nicht alle siebzehn im Zusammenhang gelesen, sondern nach acht
Wendungen gesucht und gelesen, was sie zurückgaben.
