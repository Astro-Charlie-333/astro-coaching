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




### 6 · Die Tierkreiszeichen auf `strategie/umgang-kristi.html`
Die Glyphen rendern als Emoji statt als Schriftzeichen; es fehlt `︎`.
**Fertig, wenn:** die Seite die Zeichen einfarbig zeigt.

*Steht seit Wochen oben und wird jeden Morgen übersprungen: `strategie/`
ist ein privater Ordner, den die tägliche Arbeit nicht anfasst
(`REGELN.md` Abschnitt 6). Mandy macht das selbst oder verschiebt die
Seite — sonst blockiert die Zeile die Liste von oben, dieselbe Art, eine
Aufgabe nicht zu machen wie bei Aufgabe 43.*

### 7 · Netlify statt GitHub Pages
Vorbereitet, aber nicht umgestellt.
**Fertig, wenn:** die Seite unter der Netlify-Adresse läuft und die alte
Adresse weiterleitet.

*Wird ebenfalls jeden Morgen übersprungen: Der Schritt braucht Mandys
Netlify-Konto und die Adressumstellung, also etwas außerhalb des
Repositoriums. Die Anleitung dazu liegt in `NETLIFY-ANLEITUNG.md`.*

### 34 · Die Anzeigen kommen aus dem Satzgeschäft heraus
Hier steckt seit dem 2026-11-07 auch die frühere Aufgabe 38 („dieselbe
Beugung fehlt in den anderen Anzeigen"). Beide betrafen dieselben
zweiundzwanzig Dateien; sie zweimal anzufassen wäre doppelte Arbeit.

Die gemeinsame Prüfstelle steht seit dem 2026-11-07 (Aufgabe 43):
`pruefwerk.pruefe_anzeige_satzfrei` liest alle drei Anführungsarten,
`pruefwerk.pruefe_anzeige_ohne_dein` findet jedes von Hand
geschriebene „dein". Durch und verriegelt sind `bereich-app.js`,
`start-app.js`, `offline-app.js`, `heute-app.js` (2026-11-09),
`wahl-app.js` (2026-11-10), `ich-app.js` (2026-11-11),
`monat-app.js` (2026-11-12), `beziehung-app.js` (2026-11-13),
`zeit-app.js` (2026-11-14), `karte-app.js` (2026-11-15),
`mond-app.js` (2026-11-16), `zahlen-app.js` (2026-11-17),
`haeuser-app.js` (2026-11-18) `zauber-app.js` (2026-11-19) und
`geist-app.js` (2026-11-20) und
`dossier-app.js` (2026-11-21) und
`analyse-app.js` (2026-11-23) und
`begleit-app.js` (2026-11-24) und
`ereignis-app.js` (2026-11-25) und
`oph-app.js` (2026-11-26);
dazu `planeten-app.js`, `leitfaden-app.js` und `nd-app.js`, die von
Anfang an satzfrei gebaut wurden. Wie viele es sind, zählt
`pruefe-alles.py` nach: Der Satz hier stand bis zum 2026-11-13 auf
„fünf", nannte sechs Namen und meinte sieben Anzeigen — eine Zahl, die
von Hand nachgezogen werden muss, stimmt nach dem zweiten Mal nicht
mehr. Seit dem 2026-11-11 verlangt die
Querprüfung **beide** Riegel je Anzeige, nicht nur den Satzriegel.

Die übrigen stehen einzeln darunter, in der Reihenfolge, in
der ein Mensch sie vor sich hat: zuerst die Türen der Navigation
(`uebersicht.html` ist „Dein Bild"), dann
die Seiten, die ein Profil rechnen, zuletzt die Werkzeuge der
Coachin. **Wie weit es ist, steht nicht hier, sondern in
`pruefe-alles.py`, Querprüfung 13** — dort wird bei jedem Lauf
nachgezählt, und die Liste bricht in beide Richtungen. Eine Liste in
einem Dokument driftet; diese kann nur schrumpfen.

Für jede der Aufgaben 51 bis 66 gilt dasselbe, deshalb steht es
einmal hier. **Fertig, wenn:** die Sätze dieser Anzeige in ihrer
`*-daten.js` stehen, die Anzeige „dein" nicht mehr selbst schreibt
(sondern `B_BEUGE` aus `bahn-daten.js` lässt), ihr `bau-*.py` beide
Regeln aus `pruefwerk` aufruft, ein von Hand eingesetzter Satz und
ein von Hand eingesetztes „dein" den Bau abbrechen — in allen drei
Anführungsarten geprüft —, und die Zeile in `ANZEIGEN` nach `FERTIG`
gewandert ist. Bricht eine Anzeige dabei auf, wird sie nicht halb
abgeliefert: lieber zwei Tage für eine große Anzeige als eine, die
zur Hälfte umgezogen ist. Der zweite Tag baut dann auf dem offenen
Pull Request des ersten auf — und weil die Querprüfung bei jedem Lauf
nachzählt, fällt ein halber Umzug beim Abliefern auf und nicht
hinterher.

Die Zahlen in Klammern sind der Stand vom 2026-11-07: (Sätze, „dein"
von Hand). Sie stehen hier nur, damit man den Umfang einer Aufgabe
abschätzen kann — gezählt wird in `pruefe-alles.py`.

### 65 · `reading-app.js` (70, 14)
`reading.html` — das Werkzeug, mit dem die Coachin einen Tiefgang
herausgibt (`PRODUKT.md` Abschnitt 4, Weg 1). `niveau/wortwahl.js`
trägt in `PLANET[k].kurz(n)` ein festes „dein" samt einer
Ersetzung, die daraus wieder einen Satzanfang macht; das gehört mit
in diesen Zug, weil `reading-app.js` und `tief-bauer.js` diese
Zeichenketten in Vorlagen einsetzen.

### 66 · `werkstatt-app.js` (39, 2)
`werkstatt.html`.

### 97 · `ereignis-rechner.js` schreibt die Sätze der Seite
Gefunden beim Erledigen von Aufgabe 63 am 2026-11-25. Die Anzeige ist
jetzt satzfrei, der Rechner daneben aber nicht: `P0`, `P1`, `Z0`, `H0`,
`A0`, `A1` und die Texte in `STUFEN_ORB` stehen dort, und `satz()` und
`zerlegung()` kleben daraus die Sätze zusammen — mitsamt zehnmal „dein"
von Hand. Eine der beiden Tafeln, die der Umzug heute entdoppelt hat
(`mundart` in der Anzeige, `P0` im Rechner, Wort für Wort gleich),
liegt damit weiterhin dort. `PRODUKT.md` Abschnitt 7 verlangt, dass
`*-rechner.js` nichts von Sätzen weiß; `REGELN.md` Abschnitt 5 sagt es
noch einmal. Heute fällt das nicht auf, weil beide Tafeln dasselbe
sagen — das ist Glück und keine Prüfung, dieselbe Lage wie bei
Aufgabe 41.

Die Richtung steht schon fest und ist bei `AN_T.waage` am 2026-11-23
erprobt: Die Rechnung liefert Schlüssel, die Anzeige setzt ein.
**Fertig, wenn:** `ereignis-rechner.js` keine Zeichenkette mehr trägt,
die auf der Seite landet — `satz()` und `zerlegung()` geben
Schlüssel und Zahlen zurück, die Worte dazu stehen in
`ereignis-daten.js`, die zehn Kräfte in Alltagssprache genau einmal —,
`bau-ereignis.py` `pruefe_anzeige_satzfrei` und
`pruefe_anzeige_ohne_dein` auch auf den Rechner anwendet, ein von Hand
eingesetzter Satz dort den Bau abbricht (in allen drei
Anführungsarten), und der sichtbare Text der Seite auf allen fünf
Stufen derselbe bleibt wie heute — gemessen am gezeichneten Ergebnis.

### 98 · Zehn Seiten mit Regler prüfen ihre Beschriftungen nicht
Gefunden beim Erledigen von Aufgabe 63 am 2026-11-25. Der Fehler des
Tages — zwei Rungen eines Reglers, die beide „Volltreffer" hießen —
ist mit `pruefwerk.doppelte_beschriftung` beantwortet, und
`bau-ereignis.py` ruft die Regel am gezeichneten Ergebnis auf, auf
jeder Stufe. Elf ausgelieferte Seiten haben einen Regler; geprüft wird
genau eine.

Zwei davon sind gebaut und haben eine Rauchprobe, in die die Regel
hineinpasst: `baukasten.html` und `mond.html`. Nachgemessen sind beide
heute sauber — das ist der Stand von heute und keine Zusage. Die
übrigen acht (`briefing`, `chart-rechner`, `dating-muster`,
`finsternisse`, `herrscher`, `orbis-gewichtung`, `profektionen`,
`spannungskarte`) sind Handarbeit ohne `bau-*.py`; für sie gilt
dasselbe wie für `profile.html` in Aufgabe 75 — die Prüfung gehört
nach `pruefe-alles.py` und muss die Seite dafür im Browser zeichnen,
was es dort heute noch nicht gibt.

Welcher Bau die Regel ruft, zählt `pruefe-alles.py` seit heute nach
(`REGLER_OFFEN` und `REGLER_DURCH`); die Liste kann nur schrumpfen.
**Fertig, wenn:** `REGLER_OFFEN` leer ist, jede gebaute Seite mit
Regler die Regel in ihrer Rauchprobe auf jeder Stufe aufruft, eine
absichtlich doppelte Beschriftung in jeder dieser Seiten den Bau
abbricht, und `pruefe-alles.py` die handgemachten Seiten mit Regler
genauso nachmisst — am gezeichneten Ergebnis, weil erst die Rechnung
entscheidet, ob zwei Werte in dieselbe Klasse fallen.

### 95 · Zwei Lücken auf der Jetzt-Seite füllt niemand
Gefunden beim Erledigen von Aufgabe 94 am 2026-11-22. `AC_FUELL`
ersetzt nur Schlüssel, die ihm übergeben werden; eine Lücke, die
niemand füllt, bleibt als `{liste}` in geschweiften Klammern auf der
Seite stehen. Genau zwei solche gibt es noch, beide in
`kern/heute-daten.js`: `{liste}` in `auch` und `{zu}` in
`techAspekt`. Aufgefallen sind sie nur, weil
`pruefwerk.pruefe_vorlagenluecken` von Hand gegen diese Datei
gehalten wurde — `bau-heute.py` ruft die Regel nicht auf, und
deshalb steht sie dort seit Monaten.

Das ist nicht der Fall, sondern die Klasse: Die Regel gibt es seit
dem 2026-11-16 an einer Stelle, aber nur neun der siebzehn Bauten
rufen sie. Eine Prüfung, die nicht aufgerufen wird, ist keine.
**Fertig, wenn:** beide Lücken einen Wert haben oder aus der Vorlage
heraus sind, `bau-heute.py` `pruefe_vorlagenluecken` aufruft, und
`pruefe-alles.py` nachzählt, welche Bauten die Regel rufen — sodass
ein Bau, der sie fallen lässt, auffällt und nicht jahrelang
durchgeht.

### 96 · Die neunzehn Hüllen um `AC_FUELL`
Beim Umzug zu Aufgabe 94 am 2026-11-22 ist in jeder Anzeige eine
einzeilige Hülle stehen geblieben (`moFuell`, `gFuell`, `kFuell`,
`tf`, `fuell` und die übrigen), die nichts tut, als `AC_FUELL`
aufzurufen. Das war Absicht: So blieben rund 450 Aufrufstellen
unberührt und der Umzug nachlesbar. Die Rechnung dafür steht aber
noch offen — neunzehn Namen für eine Sache, und jeder davon kann
beim nächsten Umbau wieder einen eigenen Rumpf bekommen, ohne dass
sich der Name ändert.
**Fertig, wenn:** die Anzeigen `AC_FUELL` selbst aufrufen, keine
Hülle mehr dazwischensteht, und `pruefwerk` eine Hülle um `AC_FUELL`
genauso abweist wie heute einen eigenen Füller — beides mit festen
Beispielen.

### 67 · `tief-bauer.js` schreibt „dein" selbst
Der Rest der früheren Aufgabe 38. `tief-bauer.js` ist keine Anzeige
und steht deshalb nicht in `ANZEIGEN`, setzt aber dieselben
Zeichenketten in Vorlagen ein — solange es „dein" von Hand schreibt,
bringt der Tiefgang die Form mit, die `B_BEUGE` gerade abgeschafft
hat.
**Fertig, wenn:** `tief-bauer.js` kein festes „dein" oder „deine"
mehr vor einem Punktnamen schreibt, `bau-bereiche.py`
`pruefwerk.pruefe_anzeige_ohne_dein` auch darauf anwendet, und ein
von Hand eingesetztes „dein" in dieser Datei den Bau abbricht.

### 40 · Dieselbe Grenze fehlt den anderen rechnenden Seiten offen
Gefunden beim Erledigen von Aufgabe 32 am 4.11. `bereiche.html` zeigt
die Grenze seit heute offen und wird darauf geprüft. Die übrigen
rechnenden Seiten tun das nicht: Der Monatsbericht trägt nur einen
Hinweiskasten für die Coachin (Aufgabe 10 sagt es für den Brief), und
auf der Ich-Seite steht der Grenzabschnitt unter einer eigenen
Überschrift, ohne dass eine Prüfung festhält, dass er offen steht.
Solange jede Seite ihre Grenze selbst setzt, steht derselbe Fehler nur
noch nicht dort, wo ihn jemand sieht — dieselbe Fehlerklasse in
mehreren Ordnern einzeln, wie bei Aufgabe 25 und 34 (dort
steckt seit dem 7.11. auch die frühere Aufgabe 38).
**Fertig, wenn:** die Prüfung „der Grenzsatz steht offen und nicht in
einem zugeklappten Element" an einer Stelle steht, die alle
`bau-*.py` benutzen, jede rechnende Seite sie besteht, und ein in eine
Klappe geschobener Grenzsatz in jeder dieser Seiten den Bau abbricht —
gemessen am gezeichneten Ergebnis, nicht an den Daten.

### 41 · Die Handgriffregel liest nur Felder, die „tun" heißen
Gefunden beim Erledigen von Aufgabe 33 am 5.11. Die gemeinsame Regel in
`rituale/pruefwerk.py` sammelt die Handgriffe über den Feldnamen ein
(`tun`, `tunWieOben`). Auf der Seite steht aber noch ein zweiter Satz
unter der Zeile „Ein Handgriff dazu:": `tief-bauer.js` setzt dort
`B_BER[*].meistern` und `B_FACET[*].meistern` ein — zweiundsechzig
Texte, die als Handgriff ausgeliefert und von der Regel nicht gelesen
werden. Heute gehen alle zweiundsechzig durch; das ist Glück und keine
Prüfung. Dieselbe Fehlerklasse wie in `REGELN.md` Abschnitt 6f: Die
Sperre sitzt am Feldnamen, der Satz hängt aber an der Stelle, an der er
erscheint.
**Fertig, wenn:** jeder Text, der auf einer Seite unter „Ein Handgriff
dazu:" oder „Was du tun kannst" landet, durch `handgriff_tadel` geht —
unabhängig davon, wie sein Feld heißt —, die Zuordnung an einer Stelle
steht und nicht je Datei, und ein Preissatz in `meistern` den Bau
abbricht, geprüft am gezeichneten Ergebnis.

### 42 · Die Selbstübernahme schluckt einen zweiten Commit
Gefunden am 5.11. Pull Request #54 ging mit einem Commit auf, die
Selbstübernahme wurde beim Öffnen scharfgeschaltet, und als die Prüfung
grün war, hat sie zusammengefasst und übernommen — drei Minuten später.
Ein zweiter Commit, der in dieser Zeit auf denselben Zweig gepusht
wurde, war danach **nicht** auf `main`: Die Zusammenfassung lief auf dem
Stand, den die Prüfung gesehen hatte. Der Push ist durchgegangen, die
Übernahme hat nichts gemeldet, und auf `main` fehlte Arbeit, die als
abgeliefert galt. Nur weil der Arbeitsbaum danach noch schmutzig war,
ist es aufgefallen.
Das ist keine Fehlbedienung, sondern die Bauart: `REGELN.md` 6c schaltet
die Übernahme beim Öffnen scharf, damit sie das Zeitfenster trifft — und
genau deshalb kann sie zuschlagen, während noch gearbeitet wird. Wer
nachträglich etwas auf einen offenen Aufgabenzweig pusht, muss damit
rechnen, dass es verschwindet.
**Fertig, wenn:** entweder die Selbstübernahme einen Zweig stehen lässt,
dessen Spitze die geprüfte Fassung nicht ist, oder `REGELN.md` 6c in
einem Satz sagt, dass ein Aufgabenzweig nach dem Öffnen des Pull
Requests nicht mehr angefasst wird und Nachträge einen eigenen Pull
Request brauchen — und ein Lauf, der das verletzt, beim Abliefern
auffällt statt hinterher.

### 44 · Was weggeklappt wurde, sagt nicht, worum es geht
Gefunden beim Erledigen von Aufgabe 39 am 2026-11-06. Ein Vorgang, der
in einem anderen Bereich stärker zieht, steht dort offen und hier nur
noch mit seinem Zeitfenster unter „Was sonst noch läuft" — also mit
Tempo und Datum, aber ohne ein Wort darüber, was da läuft und wo man es
nachlesen kann. Wer die Klappe öffnet, findet eine Dauer ohne Sache.
**Fertig, wenn:** jede Zeile unter „Was sonst noch läuft" neben dem
Zeitfenster den Bereich nennt, in dem derselbe Vorgang offen steht, die
Sätze dafür aus `bereich-daten.js` kommen, und `bau-bereiche.py` am
gezeichneten Ergebnis abbricht, wenn eine dieser Zeilen nur eine Dauer
trägt.

### 45 · „Was an dir auffällt" zählt mit, was nicht auffällt
Gefunden im Gestaltungs-Durchgang vom 06.11. zu `uebersicht.html`
(Befund 06.11-1). Über dem Abschnitt steht „Das ist die auffälligste von
vier Stellen. Alle vier stehen gleich darunter, jede mit einem Handgriff
dazu." An sechs erfundenen Profilen nachgezählt: fünf zeigen drei Karten,
und in allen sechs trägt genau eine Karte keinen Handgriff — die mit
„2 deiner Anlagen liefen bei deiner Geburt rückwärts. Das ist der
Normalfall." Bei einem der Profile steht genau diese Karte oben und
bekommt die dunkle Fläche. Die Zahl „von 100 Menschen" ist das belegte
Pfund dieser Seite; über einem Satz, der selbst sagt, dass er nichts
bedeutet, entwertet sie die Karten, bei denen sie stimmt.
**Fertig, wenn:** unter „Was an dir auffällt" nur Karten mit einem
Handgriff stehen, der Satz darüber die Zahl der wirklich gezeichneten
Karten nennt statt „vier", der Normalfall-Satz in „Was diese Zahlen
taugen" steht, und `bau-ich.py` am gezeichneten Ergebnis abbricht, sobald
eine Karte ohne Handgriff in dem Abschnitt landet oder die genannte Zahl
von der gezeichneten abweicht — gegen feste Beispiele gehalten wie
`_datum_ohne_jahr` in `bau-heute.py`.

### 46 · Die Nischenseiten sprechen die Besucherin als Coachin an
Gefunden im Prüfdurchgang vom 06.11. als Die Andersgebaute (Befund
06.11-1). Wer in `wissen.html` nach „ADHS", „Autismus" oder
„neurodivergent" sucht, bekommt vier Treffer; die ersten beiden sind
`neurodivergente-astrologie.html` und `neurodivergenz-vertiefung.html`,
und beide sind an Mandy geschrieben: „DEINE NISCHE", „Dein Herzstück",
„Deine Haltung als Coachin", „Dein Vorteil: Du bist selbst anders
verdrahtet … glaubwürdig wie kein Zertifikat". Die beiden Seiten, die an
die Besucherin gerichtet sind — `audhs-verstehen.html` und
`diagnose-weg.html` —, stehen dahinter. Die Umschaltung „Für mich / Als
Coachin" ändert daran nichts: beide Ansichten melden 89 Seiten und zeigen
dieselbe Trefferliste. `REGELN.md` Abschnitt 1 verlangt, dass die Sicht
der Coachin zugeklappt angeboten wird und nie im Vordergrund steht; hier
ist sie nicht zugeklappt, sondern die ganze Seite, und sie steht in „Für
mich" vor dem, was für die Besucherin da ist. Betroffen ist die Rolle,
für die diese vier Seiten überhaupt gebaut wurden.
**Fertig, wenn:** in der Ansicht „Für mich" weder Suche noch Regal eine
Seite zeigt, die die Leserin als Coachin anspricht, die Gruppe „Anders
verdrahtete Köpfe" dort mit `audhs-verstehen.html` beginnt, jede Seite
ihre Ansicht aus derselben Quelle bezieht wie die Zählung darüber (keine
zweite Liste), und `pruefe-alles.py` am gerenderten Text abbricht, sobald
eine Seite in der Ansicht „Für mich" eine Coach-Anrede enthält — geprüft
an einer Form, nicht an einem Wort, und gegen feste Beispiele gehalten
wie `_datum_ohne_jahr` in `bau-heute.py`.

### 47 · „Wie viel geht heute?" steht am Fuß der Seite, die es kürzen soll
Gefunden im Prüfdurchgang vom 06.11. als Die Andersgebaute (Befund
06.11-2). `index.html` ist auf Stufe 0 am Telefon (390) 13.502 Pixel hoch,
mit zwölf Klappabschnitten, von denen keiner offen ist. Der Block „Wie
viel geht heute? · Wenig — ein Satz · Mittel — das Wichtigste · Viel —
alles" liegt bei 13.306 Pixeln hinter dem zugeklappten „Seite einstellen"
und ist ausgeliefert nicht gesetzt. Er wirkt: nach „Wenig" schrumpft die
Seite auf 6.700 Pixel. Wer ihn braucht, muss dafür genau das tun, wovor er
schützt. Nicht dasselbe wie der Befund vom 23.10. zur Stufenleiste — das
ist ein zweiter, eigener Schalter.
**Fertig, wenn:** „Wie viel geht heute?" am Telefon ohne Scrollen
erreichbar ist (offen oder als eine Zeile, die sagt, was dahinter liegt),
die Bereichsauswahl unten bleiben darf, die Einstellung weiterhin nichts
mitschreibt und täglich neu fragt, und `bau-heute.py` am gerenderten
Ergebnis abbricht, sobald der Block bei 390 Pixeln Breite tiefer als eine
Bildschirmhöhe liegt.

### 73 · Fünf Riegel haben keine Gegenprobe
Gefunden beim Erledigen von Aufgabe 51 am 2026-11-12. Sieben Anzeigen
stehen in `FERTIG`, und alle sieben rufen beide Riegel aus `pruefwerk`
auf. Aber nur zwei der Bauskripte prüfen danach, ob der Riegel
überhaupt noch etwas sieht: `bau-ich.py` seit dem 2026-11-11 und
`bau-monat.py` seit heute setzen einen Satz und ein „dein" probehalber
ein — in allen drei Anführungsarten — und brechen ab, wenn der Riegel
schweigt. Die fünf übrigen Anzeigen haben das nicht: `bau-app.py`,
`bau-start.py`, `bau-heute.py` und `bau-bereiche.py` mit seinen beiden.
Deren Grün sagt also nur, dass heute nichts dastand, nicht dass die
Regel greift — genau der Nachsatz zu `REGELN.md` 6e. Dieselbe
Fehlerklasse wie bei der Querprüfung 13 vor dem 2026-11-11: eine
Zusage, die gehalten aussieht und nicht gehalten wird.
Und die Gegenprobe gehört nicht siebenmal abgeschrieben: in zwei
Dateien steht sie heute Zeile für Zeile gleich, also driftet sie
beim nächsten Umbau auseinander — dieselbe Klasse wie die eigene
Satzregel, die heute aus `bau-monat.py` herausgefallen ist.

*Stand 2026-11-20: Es sind inzwischen vierzehn Bauskripte, in denen
diese Gegenprobe Zeile für Zeile gleich steht — jedes Erledigen einer
Anzeige aus Aufgabe 34 schreibt sie ein weiteres Mal ab. Die Aufgabe
wird dadurch nicht anders, nur jeden Tag ein Stück teurer.*
**Fertig, wenn:** die Gegenprobe in `rituale/pruefwerk.py` steht und
nicht in den Bauskripten, jeder Aufruf von
`pruefe_anzeige_satzfrei` und `pruefe_anzeige_ohne_dein` sie
mitbringt, ohne dass ein Bauskript daran denken muss, eine
abgeschwächte Regel in jeder dieser sieben Anzeigen den Bau abbricht —
in allen drei Anführungsarten geprüft —, und die beiden
abgeschriebenen Fassungen in `bau-ich.py` und `bau-monat.py`
weg sind.

### 74 · Auf `beziehung.html` nennt „Was gerade läuft" einen Planeten und erklärt ihn nicht
Gefunden beim Erledigen von Aufgabe 52 am 2026-11-13. Die Zeile heißt
auf Stufe 0 „Neptun berührt gerade Jonas' Struktur — da geht gerade mehr
als sonst, wenn ihr es nutzt." Der getroffene Punkt steht seither in
Alltagssprache; der laufende Planet steht als bloßer Name da, ohne ein
Wort dazu, was er ist. `REGELN.md` Abschnitt 2a erlaubt den Namen auf
Stufe 0 — aber nur mit der Erklärung auf derselben Karte, und vor der
Wirkung. Hier steht keine, und es ist genau die Zeile, von der jemand
einen Screenshot macht (`PRODUKT.md` 2, Punkt 3).

Vorher stand dort „Dein Neptun berührt gerade dein Saturn", also
zweimal ein Name und zweimal ein falsches „dein" — der Fund ist älter
als der Umzug, nur sichtbar geworden ist er dabei. Die Worte liegen
schon fertig in `kern/bahn-daten.js`: `B_WAND` gibt jedem Wanderer ein
Verb und für harte und weiche Winkel je eine Folge, und `B_ZIEL` sagt,
was der getroffene Punkt im Leben ist. Beide Dateien liegen seit heute
mit auf der Seite.
**Fertig, wenn:** die Zeile auf Stufe 0 statt des Planetennamens das
Verb und die Folge aus `B_WAND` trägt — oder den Namen mit seiner
Erklärung davor —, der bloße Name und der Winkel erst ab Stufe 2 in
`ac-tech` mit `data-ab="2"` stehen, und `bau-bez.py` den Bau abbricht,
sobald im auf Stufe 0 gezeichneten Abschnitt ein Planetenname ohne
Erklärung auf derselben Karte vorkommt — gegen feste Beispiele
gehalten, also unabhängig davon, welcher Tag und welches Geburtsbild
gerechnet wird.


### 75 · Auf `profile.html` beginnt die Profilliste erst unterhalb des ersten Bildschirms
Aus dem Gestaltungsdurchgang vom 2026-11-13 (Befund 13.11-1). Bei 390
Pixeln Breite steht über der Liste erst der Moduskasten „Wie du die
Plattform benutzt" (282 Pixel hoch), dann h1 und Einleitung, dann die
Wissensstand-Leiste, dann der Haken „Vollständige Namen anzeigen" — die
erste Profilkarte beginnt bei Pixel 1.048, der Bildschirm ist 844 Pixel
hoch. Im Coach-Modus gehen in demselben Kasten sechs Werkzeugkarten auf,
er wird 1.004 Pixel hoch, und die erste Karte rutscht auf 1.769; dort ist
auch die h1 der Seite nicht mehr im ersten Bild. Bei 1.280 steht die Karte
bei 780 (Coach-Modus: 1.126). Drei Einstellungen stehen vor dem
Gegenstand, obwohl die Seite nur zwei Gründe hat, geöffnet zu werden:
jemanden anlegen oder jemanden aktiv setzen. Vorschlag aus dem Durchgang:
Kasten, Stufenleiste und Namen-Haken wandern gemeinsam unter die Liste,
vor „Profil anlegen"; an ihrer Stelle bleibt eine Zeile, die den
eingestellten Modus nennt und zu ihnen springt.
**Fertig, wenn:** bei 390 Pixeln Breite die erste Profilkarte — und ohne
Profile der Hinweis „Noch keine Profile." — in **beiden** Modi oberhalb
von Pixel 844 beginnt, der Moduskasten samt Stufenleiste und Namen-Haken
unterhalb der Liste steht, an der bisherigen Stelle eine Zeile den
eingestellten Modus nennt und dorthin springt, und `pruefe-alles.py` eine
Querprüfung bekommt, die genau das nachmisst: Seite mit erfundenem Profil
bei 390 laden, in beiden Modi und mit null und mit drei Profilen, und
abbrechen, sobald der erste Gegenstand der Liste unterhalb von 844 Pixeln
anfängt. Nach der goldenen Regel aus `REGELN.md` Abschnitt 5 ist die
Prüfung der eigentliche Teil: `profile.html` ist Handarbeit und hat kein
`bau-*.py`, also gehört sie nach `pruefe-alles.py` — gemessen am
gezeichneten Ergebnis, nicht am Quelltext, weil die Höhe des Kastens vom
Modus abhängt.

### 76 · `beziehung.html` sagt, wie der andere Mensch ist, und nicht, was das taugt
Befund der Prüferin vom 2026-11-13 (Das Gegenüber-Paar, erster Befund —
Grenzen kommen zuerst). Die Seite spricht vier Abschnitte lang im
Indikativ über den zweiten Menschen („Jonte streitet so: Laut und
grundsätzlich", „Was danebengeht: Bohren"), und auf der ganzen Seite —
mit allen Elementen aufgeklappt nachgemessen — kommen „Was das taugt",
„Erleben", „Vorrang", „nicht überprüft", „häufig" und „gefragt" kein
einziges Mal vor. Die zwei Sätze, die dastehen, relativieren die
Beziehung („kein Urteil über eine Beziehung"), nicht die Person, über die
geredet wird. `PRODUKT.md` Abschnitt 5 schließt „Aussagen über eine
dritte Person, die nicht gefragt wurde" aus; `REGELN.md` Abschnitt 4
verlangt von jeder rechnenden Seite den Abschnitt „Was das taugt — und
was nicht" mit vier Punkten. `bereiche.html` und `uebersicht.html` haben
ihn, `synastrie.html` — wohin diese Seite als „DIE THEORIE" verweist —
nicht. Dazu steht unter der Deutung „Text kopieren": Was hier entsteht,
wird nach `PRODUKT.md` Abschnitt 2, Punkt 3 weitergeschickt, und
weitergeschickt wird dann ein Urteil über jemanden ohne den Satz, der ihm
widersprechen lässt.

Die Aufgabe hängt an Aufgabe 40 und schärft sie: Dort soll geprüft
werden, dass der Grenzsatz **offen** steht statt zugeklappt. Auf dieser
Seite gibt es keinen, den man aufklappen könnte — die Prüfung ginge grün
durch, ohne etwas gesehen zu haben. Das ist der Nachsatz zu `REGELN.md`
Abschnitt 6e.
**Fertig, wenn:** `beziehung.html` den Abschnitt „Was das taugt — und was
nicht" offen trägt, mit den vier Punkten aus `REGELN.md` Abschnitt 4 und
einem fünften, der nur für zwei Menschen gilt — dass der andere Mensch zu
sich selbst das letzte Wort hat und sein Erleben vor der Seite steht —,
derselbe Satz in dem Text steht, den „Text kopieren" ausgibt, die Prüfung
aus Aufgabe 40 zuerst verlangt, **dass** es den Abschnitt gibt, bevor sie
prüft, dass er offen steht, und `bau-bez.py` abbricht, wenn er fehlt oder
in ein Klappelement wandert — gemessen am gezeichneten Ergebnis, gegen
feste Beispiele gehalten.

### 77 · Die Beziehungsart ändert die Deutung nicht, verspricht aber Genauigkeit
Befund der Prüferin vom 2026-11-13 (Das Gegenüber-Paar, zweiter Befund).
Die Seite verspricht oben „für die Beziehung, die ihr wirklich habt. Eine
Mutter liest man anders als eine Freundin", im Ergebnis „Stell oben die
Art ein, die wirklich zutrifft — dann wird es deutlich genauer", und im
Fuß „Gewichtet nach Beziehungsart". Gemessen über alle neun Arten, jede
einzeln angetippt: Es ändern sich zwei Sätze und die Reihenfolge der vier
Karten. Die Kartentexte sind in sieben von neun Arten dieselbe Menge,
Wort für Wort; Liebe/Partnerschaft, Geschwister, Arbeit/Kollegin und
Sonstige liefern sogar dieselben Zeilen in derselben Zahl. Deshalb steht
in der Deutung für **Mutter**, **Vater**, **Arbeit/Kollegin** und
**Tier** wörtlich „Das ist der Kontakt, der Freundschaften lange hält"
und „wissen, dass eine Trennung bei diesem Kontakt überdurchschnittlich
lange nachwirkt". „Wie du … erreichst", „Wie ihr miteinander redet",
„Wenn es Streit gibt" und „Wenn du helfen willst" sind in allen neun
Arten identisch. Der Schalter THEMA daneben tut dagegen wirklich etwas —
er tauscht Abschnitte aus —, es gibt also keinen Grund anzunehmen, dass
der eine wirkt und der andere nur sortiert. Fehlerklasse aus `REGELN.md`
Abschnitt 5, dort schon mit einem Beispiel geführt: „die Auswahl »Als«
muss die Befunde wirklich ändern".
**Fertig, wenn:** jeder Kartentext nach Beziehungsart gebeugt wird — kein
ausgelieferter Satz trägt ein Wort, das zur eingestellten Art nicht passt
(„Freundschaften" und „Trennung" nicht unter Mutter, Vater,
Arbeit/Kollegin oder Tier) —, zwei verschiedene Beziehungsarten nie
dieselbe Menge Kartentexte ergeben, und `bau-bez.py` beides abbricht:
sobald zwei Arten denselben Textkörper liefern und sobald ein Wort aus
der Sperrliste einer Art in deren Deutung erscheint. Die Beispiele stehen
als `assert` in `rituale/pruefwerk.py` und laufen vor dem ersten Bau
(`REGELN.md` Abschnitt 6e), damit die Prüfung nicht davon abhängt, welche
zwei Geburtsbilder gerade gerechnet werden. Bleibt die Beugung aus, ist
die Aufgabe nicht erledigt, indem das Versprechen umformuliert wird —
dann ist es eine andere Aufgabe und wird als solche eingetragen.

---

### 78 · `toUpperCase` steht in keiner Prüfung
Gefunden beim Erledigen von Aufgabe 53 am 2026-11-14. `REGELN.md`
Abschnitt 4 verbietet `toLowerCase` auf deutschem Text, und jedes
`bau-*.py` prüft das. Dieselbe Falle in der anderen Richtung prüft
niemand: `toUpperCase` macht aus „ß" ein „SS" und aus „Maß" ein „MASS".
Dass das bekannt ist, steht in `kern/heute-daten.js` als Kommentar —
„toUpperCase auf deutschem Text ist dieselbe Falle wie toLowerCase" —
und daneben die Beschriftung, die deshalb von Hand dasteht. Ein
Kommentar ist aber keine Automatik (`REGELN.md` Abschnitt 6c): vier
Anzeigen schreiben weiter Überschriften mit `toUpperCase`
(`zeit-app.js`, `zahlen-app.js` zweimal, `analyse-app.js` zweimal,
`bereiche/tief-bauer.js`), und grün sind sie nur, weil in keinem der
betroffenen Namen heute ein „ß" vorkommt — genau der Fall aus
Abschnitt 6e.

**Fertig, wenn:** die Prüfung neben `toLowerCase` auch `toUpperCase`
auf Text anschlägt, sie in `rituale/pruefwerk.py` mit festen Beispielen
steht (ein Name mit „ß" muss anschlagen, `zahlen-rechner.js` auf einem
Buchstabenschlüssel darf durchgehen), und die betroffenen Überschriften
ihre große Fassung in der Datendatei stehen haben, nicht in einer
Umwandlung.

### 79 · Der Satzriegel sieht die Farben in `style` nicht
Ebenfalls am 2026-11-14 gefunden. `pruefwerk.saetze_in_anzeige` schlägt
bei einer Farbe wie `'#DDD0BC'` an — richtig, Farben gehören nicht in
die Anzeige. Steht dieselbe Farbe aber in einem vollständigen
Attribut (`'<p style="color:#6B6259">'`), zieht die Regel das Markup ab
und findet nichts. Eine Anzeige kann also satzfrei sein und ihre
Gestaltung weiter selbst mitbringen; `zeit-app.js` hat nach dem Umzug
noch neun solche Stellen, `zahlen-app.js` 22, `mond-app.js` 13,
`haeuser-app.js` 11. Dass es ausgerechnet vier Farben erwischt hat, lag
an den Ziffern: `#DDD0BC` zerfällt in zwei Buchstabengruppen und sieht
damit aus wie Sprache, `#EBE1D2` nicht.

**Fertig, wenn:** eine Farbe in einem `style`-Attribut einer Anzeige den
Bau abbricht, die Regel in `rituale/pruefwerk.py` mit festen Beispielen
steht (eine Farbe im Attribut schlägt an, eine Klassenangabe ohne Farbe
geht durch), und die neun Stellen in `zeit-app.js` ihre Farbe aus
`zeit-stil.css` oder `ZT_FARBE` holen. Für `zahlen`, `mond` und
`haeuser` gehört es in deren Umzug (Aufgaben 55, 56, 57), nicht
hierher.

### 83 · Im Monatsbericht stehen die zwei Daten in der Größe der Füllung
Aus dem Gestaltungsdurchgang vom 2026-11-17 (Befund 17.11-1) zu
`monatsbericht.html` — die Seite, die Abschnitt 5 der `GESTALTERIN.md`
als `monat.html` führt. Unter „Zwei Daten zum Merken" setzt
`bau-monat.py` beide Lunationen als gewöhnliches `<p>`: „Neumond am
9. November in deinem Bereich Wert und Besitz. …" und „Vollmond am
24. November in deinem Bereich Sinn und Weite. …", 16 Pixel DM Sans,
also dieselbe Größe wie jeder andere Absatz im Brief. Abgesetzt ist im
ganzen Brief nur zweierlei — der Kasten „Es ist gerade zäh" und der
Kasten mit der Frage —, und das größte Stück Text auf 2.073 Pixeln Brief
ist die Anrede mit dem Namen der Empfängerin (23 Pixel auf dem Telefon).
Die beiden
Termine sind die einzige Stelle im Brief, die Name, Tag, Bereich und
Bedeutung trägt, also genau die vier Teile, die `PRODUKT.md` Abschnitt 2
Punkt 3 für etwas verlangt, das allein stehen können muss; auf
`index.html` ist dieselbe Information das Beste der Seite. Vorschlag aus
dem Durchgang: Jede der beiden Angaben wird dreiteilig, aus Werten, die
in `monat-stil.css` schon stehen — der Tag in der `.zeit`-Behandlung
(11 Pixel JetBrains Mono, Messing, gesperrt: „9. NOVEMBER"), darunter der
Name in der Fraunces-Größe der `.anrede` (`clamp(23px,4.4vw,30px)`,
„Neumond"), darunter wie bisher in 16 Pixeln der Bereich und der Satz.
Keine neue Farbe, keine
neue Schrift, keine neue Größe.
**Fertig, wenn:** im gezeichneten `monatsbericht.html` jede der beiden
Lunationen aus drei Teilen besteht, der Name in der Fraunces-Größe der
`.anrede` steht und damit kein Text im Brief außer der Anrede selbst
größer ist als die beiden Termine, der Tag in der `.zeit`-Behandlung
darüber steht, „Text kopieren" daraus drei Zeilen statt eines Absatzes
macht, der Druck den
Brief weiterhin allein stehen lässt — und `bau-monat.py` nach der
goldenen Regel aus `REGELN.md` Abschnitt 5 am gezeichneten Ergebnis
abbricht, sobald eine Lunationsangabe wieder in derselben Schriftgröße
steht wie der Fließtext des Briefs. Gemessen am Ergebnis, nicht am
Quelltext, weil die Größen aus der Datei daneben kommen.

### 85 · „20.000 zufällig gerechnete Paare" sagt nicht, welche Paare
Siehe Recherche vom 2026-11-18, erster Fund. Die Häufigkeitszahlen sind
gerechnet und mit festem Startwert wiederholbar — im Markt ist das der
Vorsprung. Was die Leserin sieht, ist aber nur die Anzahl, nicht die
Vergleichsgruppe: `beziehung.html` sagt „20.000 zufällig gerechnete
Paare", abgetastet werden nach `quelltext/bez/_verteilung-bez.js` Paare
mit höchstens acht Jahren Abstand, Jahrgänge 1950 bis 2005,
Mitteleuropa, beide mit Geburtszeit. Der Altersabstand ist genau die
Größe, die bestimmt, wie selten ein Kontakt zwischen zwei langsamen
Planeten aussieht. Auf `uebersicht.html` dasselbe schwächer: 10.000
Bilder, Jahrgänge 1930 bis 2010, Tag 1 bis 28, acht Orte. Eine Zahl ohne
ihre Grundlage ist der Fall aus `REGELN.md` Abschnitt 7.
**Fertig, wenn:** der auf `beziehung.html` sichtbare Satz zur
Vergleichsgruppe sagt, woraus sie besteht, der Satz auf `uebersicht.html`
dasselbe für seine Stichprobe tut, beide Sätze aus `beziehung-daten.js`
beziehungsweise `ich-daten.js` kommen und nicht aus der Anzeige, die
Angaben beim Bauen aus denselben Werten entstehen, mit denen abgetastet
wird — nicht von Hand danebengeschrieben, sonst driftet es beim nächsten
Lauf —, und `bau-bez.py` und `bau-ich.py` am gezeichneten Ergebnis
abbrechen, sobald eine Häufigkeitszahl ohne ihre Vergleichsgruppe
dasteht. Gegen feste Beispiele gehalten wie `_datum_ohne_jahr` in
`bau-heute.py`, damit die Prüfung nicht davon abhängt, welches
Geburtsbild gerade gerechnet wird.

### 86 · Auf `beziehung.html` steht nirgends, wessen Daten der zweite Mensch sind
Siehe Recherche vom 2026-11-18, zweiter Fund. Die Seite wählt in
`#bzsteuer` ein zweites Profil, sagt vier Abschnitte lang, wie dieser
Mensch ist, und gibt das über „Text kopieren" und „Drucken" aus dem Haus.
Dass die Deutung über einen Menschen geht, der sie weder in Auftrag
gegeben hat noch zu sehen bekommt, steht nirgends — obwohl
`PRODUKT.md` Abschnitt 5 Aussagen über eine dritte Person, die nicht
gefragt wurde, ausschließt. Aufgabe 76 bringt den Satz, dass dieser
Mensch zu sich selbst das letzte Wort hat, in den Ehrlichkeitsabschnitt
am Ende. Hier geht es um die andere Stelle: den Anfang.
**Fertig, wenn:** dort, wo das zweite Profil gewählt wird, ein Satz
steht, dass dies die Geburtsdaten eines anderen Menschen sind und die
Deutung über ihn ihm gehört — in der Sprache der Seite, ohne Haken und
ohne Sperre, weil die Seite nicht wissen kann, ob jemand zugestimmt hat,
und ein Haken nur eine Sicherung vortäuschen würde; der Satz aus
`beziehung-daten.js` kommt und nicht aus `beziehung-app.js`; er auf
Stufe 0 offen steht und nicht in einem Klappelement; und `bau-bez.py` am
gezeichneten Ergebnis abbricht, wenn er fehlt oder in eine Klappe
wandert. Die Textausgabe von „Text kopieren" gehört zu Aufgabe 76 und
wird hier nicht mitgemacht.

### 87 · `zauber.html` nennt „Konjunktion" und hat keine Stufenleiste
Gefunden beim Erledigen von Aufgabe 58. Die Karte „Der Mond läuft
gerade leer" sagt: „Seit seinem letzten Aspekt (Konjunktion zu Venus
um 14:12) …". „Aspekt" und „Konjunktion" verschlüsseln einen Rechenweg
und gehören auf Stufe 0 nicht auf die Seite (`REGELN.md` 2a) — und die
Seite trägt kein `#nivleiste`, also gibt es gar keine Stufe, auf der
sie wartet. Das Wort dafür steht fertig in `B_WINKELWORT` („auf",
„gegenüber", „quer zu"), das seit Aufgabe 58 ohnehin auf der Seite
liegt.
**Fertig, wenn:** auf Stufe 0 kein Mechanikwort auf `zauber.html`
sichtbar ist, die Mechanik in `ac-tech`/`data-ab="2"` wartet, und die
Rauchprobe in `bau-zauber.py` die Stufe 0 prüft, wie es
`bau-haeuser.py` tut.

### 88 · Die Namensprüfung steht in drei `bau-*.py` einzeln
Auch aus Aufgabe 58: Seit jede Anzeige ihre Sätze auslagert, liegt
`kern/bahn-daten.js` auf immer mehr Seiten, und jede Seite prüft
selbst, dass ihre Namen nicht mit `engine.js` kollidieren — in
`bau-mond.py`, `bau-zahlen.py` und seit heute `bau-zauber.py`, in drei
Fassungen. Die dritte hat sofort etwas gefunden, wonach die beiden
anderen nicht gesucht haben: `chartVon`, `datVon` und `gewaehlt`
standen in `zauber-app.js` ein zweites Mal, Wort für Wort gleich.
Dieselbe Lehre wie bei den Stufe-0-Prüfungen (`REGELN.md` 5): Eine
Regel in drei Dateien ist nach der ersten Verschärfung in zwei von
drei veraltet.
**Fertig, wenn:** die Regel als `pruefwerk.pruefe_namenskollision` an
einer Stelle steht, feste Beispiele darunter hat, die drei `bau-*.py`
sie aufrufen, und ein von Hand eingesetzter Zweitname den Bau
abbricht.

### 89 · „Vorbei ist es So, 22.11., 08:23 Uhr"
Dritter Fund aus Aufgabe 58, heute nicht behoben, damit der Umzug ein
Umzug bleibt. Endet der leere Mondlauf an einem anderen Tag, setzt
`wannKurz` Tag und Datum mit ein, und das „Uhr" dahinter steht dann
hinter einem Datum. Innerhalb desselben Tags liest es sich richtig.
Dieselbe Klasse wie `_datum_ohne_jahr` in `bau-heute.py` (`REGELN.md`
6e): Der Satz stimmt für die Eingabe des Tages und nicht für die Form.
**Fertig, wenn:** die Vorlage zwei Fassungen hat — eine mit „Uhr" für
heute, eine ohne für einen anderen Tag —, die Anzeige die passende
wählt, und eine Prüfung mit festen Beispielen in `bau-zauber.py` ein
„Uhr" hinter einem Datum abbricht.

### 91 · Auf `ereignisse-lesen.html` steht über der Falz nur die Stufe
Aus dem Gestaltungsdurchgang vom 2026-11-20 (Befund 20.11-1) zu
`ereignisse-lesen.html` — die Seite, die Abschnitt 5 der `GESTALTERIN.md`
als `ereignisse.html` führt. Bei 390 Pixeln auf Stufe 0 steht der Kasten
`<div class="tip" data-bis="0">` („Du liest gerade die Fassung ohne
Fachsprache. …") in `ereignis-koerper.html` zwischen `#nivleiste` und der
ersten Überschrift und ist dort 234 Pixel hoch. Seine erste Hälfte sagt,
was 91 Pixel höher schon in `.niv-tipp` steht („Keine Ahnung von
Astrologie. Alles in Alltagssprache. …"). Dadurch beginnt „Die Grundidee:
ein Hinweis ist kein Ereignis" bei Pixel 859 und damit unter der Falz von
844, die Treppe Rauschen · Verdacht · Thema bei 1.107. Auf Stufe 2, wo der
Kasten wegfällt, steht dieselbe Überschrift bei 602 und die Treppe bei
850; bei 1.280 Pixeln steht die Treppe auf beiden Stufen über der Falz.
Wer am wenigsten mitbringt, sieht auf dem Telefon also am wenigsten.
Der einzige Satz des Kastens, der etwas Eigenes sagt, stimmt zudem nur
halb: Auf Stufe 0 fehlen nicht nur Fachbegriffe und Beispiele, sondern
vier ganze Abschnitte — Rezepte (2.666 Pixel), Zwei Charts (999),
Durchgerechnet (2.541) und Kleines Quiz (1.995) —, und er steht neun
Telefonbildschirme vor der ersten Lücke.
**Fertig, wenn:** im gezeichneten `ereignisse-lesen.html` bei 390 Pixeln
auf Stufe 0 die Überschrift `#idee` und ihr Absatz über der Falz von 844
stehen, der Kasten mit `data-bis="0"` nicht mehr zwischen `#nivleiste` und
`#idee` steht, sein Hinweis auf das Fehlende stattdessen in der
`<section data-ab="1">` der Rezepte steht und dort alle vier auf Stufe 0
leeren Abschnitte nennt — und `bau-ereignis.py` nach der goldenen Regel
aus `REGELN.md` Abschnitt 5 am gezeichneten Ergebnis abbricht, sobald auf
Stufe 0 die erste Überschrift der Seite tiefer steht als auf Stufe 2.
Gemessen am Ergebnis bei 390 Pixeln, nicht am Quelltext, weil die Höhe
aus `ereignis-stil.css` und der Textlänge zusammen entsteht.

### 92 · Im Reading steht die tragende und die reibende Fassung im selben Absatz
Befund der Prüferin vom 2026-11-20 (Die Coachin, erster Befund). Unter
„Die stärksten Verbindungen" laufen beide Fassungen einer Verbindung als
ein Absatz ohne Bindewort, Überschrift oder Absatz dazwischen. Bei Rieke
(09.03.1990) drei von fünf, bei Tomke (02.11.1986) zwei von fünf, also
fünf von zehn über zwei Geburtsbilder: „Du weißt meistens, was dir
guttut, und tust es auch." gefolgt von „Oft übergehst du das Bedürfnis —
und zahlst später."; „Was du anfängst, bringst du zu Ende." gefolgt von
„Du trittst gleichzeitig auf Gas und Bremse." Für eine Coachin steht
damit in dem Text, den sie aus der Hand gibt, über denselben Menschen
beides — und die Klientin kann keinem der beiden Sätze widersprechen.
Dieselbe Seite hat weiter unten den Abschnitt „Wo es kippen kann", der
genau dafür da ist. Es ist die Fehlerklasse aus `REGELN.md` Abschnitt 6d
(zwei Zustände aneinandergeklebt, keine Folge) und derselbe Riegel, den
der Monatsbericht am 2026-10-21 bekommen hat („reibende und tragende
Fassung dürfen nicht gleich sein" — hier: dürfen nicht unmarkiert
nebeneinander stehen). Betrifft die Stufen „Wenig" aufwärts; auf „Neu"
ist die zweite Hälfte gar nicht da.
**Fertig, wenn:** die reibende Fassung entweder im Abschnitt „Wo es
kippen kann" steht oder im Absatz ein Wort trägt, das die Wendung
markiert, `pruefwerk` eine Regel bekommt, die am **gezeichneten**
Reading abbricht, sobald tragende und reibende Fassung derselben
Verbindung ohne ein solches Wort im selben Absatz stehen, diese Regel
über alle fünf Stufen und über mindestens zwei verschiedene
Geburtsbilder läuft, und `assert`-Zeilen in `pruefwerk` die Fälle
festhalten, die durchgehen müssen, und die, die anschlagen müssen
(`REGELN.md` Abschnitt 6e).

### 93 · Die Reading-Stufe fängt bei „Mittel" an, auch wenn „Neu" eingestellt ist
Befund der Prüferin vom 2026-11-20 (Die Coachin, zweiter Befund).
`ac_niveau` steht auf `0`, von Hand gesetzt, bevor die erste Seite
gelesen wurde; die Leiste „WISSENSSTAND DER PERSON" auf `reading.html`
steht beim ersten Aufruf trotzdem auf „Mittel" — bei beiden Profilen und
bei 390 wie bei 1440. Im Text stehen daraufhin „die Sonne in Fische",
„der Aszendent in Krebs", „Orbis", „Stellium"; nach dem Umschalten auf
„Neu" sind sie weg. Die Seite sagt über diese Stufe selbst: „Hier steht
kein Planetenname und kein Haus. Das ist die Fassung, die du
verschickst, wenn du nicht sicher bist." Dazu nennt der kopierte Text
(2.978 Zeichen) in keiner Zeile, für welche der fünf Stufen er
geschrieben ist — hinterher ist nicht mehr feststellbar, welche Fassung
verschickt wurde. Dieselbe Klasse wie der Auslieferzustand der globalen
Leiste (Befund 23.10.) und wie Aufgabe 15 und 16, nur an der zweiten
Leiste.
**Fertig, wenn:** die Stufe eines Menschen, für den sie noch nie von Hand
gesetzt wurde, der plattformweit eingestellten Stufe folgt (und ohne
jede Einstellung „Neu" ist), erst ein Tipp auf `reading.html` daraus
eine eigene Einstellung für diesen Menschen macht, „Text kopieren",
„Als Datei speichern" und „Drucken" in der ersten Zeile die Stufe
nennen, für die der Text geschrieben ist — und `pruefe-alles.py` am
gezeichneten Ergebnis abbricht, sobald eine Stufenleiste beim ersten
Aufruf eine andere Stufe gedrückt zeigt als die, die im Speicher liegt.

### 97 · „Noch 1 Tage bis zu deinem Solar Return"
Gefunden beim Erledigen von Aufgabe 61 am 2026-11-23. Die
Fehlerklasse von dort — eine Form, die sich mit der eingesetzten Zahl
ändert, wird an die Zahl geklebt — steckt auch außerhalb der Analyse.
In `rituale/ritual.js` Zeile 151 steht `'Noch '+tage+' Tage bis …'`,
und `tage` darf `1` sein: An dem einen Tag im Jahr, an dem es zutrifft,
liest die Besucherin „Noch 1 Tage". Dasselbe in
`werkstatt/werkstatt-app.js` Zeile 153 (`a + ' Jahre'`). Gesucht wurde
nach der Form „Wert plus Hauptwort", nicht nach den Wörtern; die
Suche nach den Wörtern hätte beide nicht gefunden.

Die Prüfung dazu gehört nach `rituale/pruefwerk.py`, nicht in ein
einzelnes `bau-*.py`: Die Klasse betrifft jede Seite, und eine Regel
in sechsundzwanzig Ordnern ist nach der ersten Verschärfung in
fünfundzwanzig davon veraltet (`REGELN.md` Abschnitt 5). Eine
Einheit, die sich nicht beugt („Grad", „Uhr", „Prozent"), geht durch —
die Regel prüft, ob es zu einem gebeugten Hauptwort eine Einzahlform
gibt, nicht ob irgendwo ein Plus steht.

**Fertig, wenn:** keine Seite der Plattform mehr eine Zahl mit einem
gebeugten Hauptwort zusammenklebt, die Einzahl überall aus einer
Vorlage kommt, `pruefwerk` die Regel mit festen Beispielen für die
Eins, die Null und die Mehrzahl trägt (`REGELN.md` Abschnitt 6e), und
der Bau jeder Seite abbricht, sobald jemand es wieder tut.

### 98 · `thema-rest.js` gibt ein Feld zurück, das niemand liest
Gefunden beim Erledigen von Aufgabe 61 am 2026-11-23. `T_ALLTAG` und
`T_KOMM` liefern im Ergebnis `zahl:{reibung:…}`. Gelesen wurde das
schon vorher nicht — die Anzeige verlangte `zahl.nenner`, und das gab
es dort nie. Seit die Waage über `waage:{lk, ln, rk, rn}` läuft, ist
das Feld sichtbar toter Ballast: Es sieht aus wie eine Waage, die
nicht gezeichnet wird.
**Fertig, wenn:** die beiden Themen entweder eine richtige Waage
liefern oder das Feld nicht mehr, und `bau-analyse.py` abbricht,
sobald ein Thema ein Ergebnisfeld zurückgibt, das die Anzeige nicht
liest.

### 101 · Mit einem Profil wählt `analyse.html` ein Thema vor, das nicht rechnet
Aus dem Gestaltungsdurchgang vom 2026-11-24 (Befund 24.11-1) zu
`analyse.html`. `analyse-app.js` Zeile 26 setzt `var themaK='paar'` fest.
Wer nur sein eigenes Profil hat — die Suchende aus `PRODUKT.md`
Abschnitt 2, der häufigste Fall —, bekommt deshalb bei 390 Pixeln ab
Pixel 1.432 den Kasten „Für dieses Thema brauchst du zwei Profile. Noch
eins anlegen — dann rechnet es.", eine Seite von 2.691 Pixeln und kein
Ergebnis. Darüber steht ihr eigener Name zweimal untereinander, in der
Zeile „Zwischen" und in der Zeile „und". Dabei rechnen drei der fünf
Themen mit einem Profil: „Berufung & Beruf" zeichnet 8.583 Pixel
Ergebnis, „Alltag & Energie" 4.477, „Kommunikation" 4.236. Die einzige
Auszeichnung der Kartenreihe zeigt in die falsche Richtung: **IM AUFBAU**
entsteht aus `(t.regeln.length<10?AT.aufbau:'')`, zählt also Regeln und
markiert zwei der drei Themen, die rechnen — während die beiden, die mit
einem Profil nicht rechnen können, unmarkiert bleiben.
**Fertig, wenn:** `analyse.html`, mit einem festen erfundenen Profil
gezeichnet, ein Ergebnis zeigt statt des Kastens; das vorgewählte Thema
aus der Zahl der Profile folgt statt aus einer festen Zeichenkette (unter
zwei Profilen das erste mit `modus:'solo'`); die Themen mit
`modus:'paar'` in diesem Zustand auf der Karte selbst als „braucht zwei
Profile" markiert und nicht wählbar sind, mit demselben `<i>`, das
„IM AUFBAU" schon benutzt; die Zeile „und" den in „Zwischen" gewählten
Menschen nicht noch einmal anbietet; und `bau-analyse.py` nach der
goldenen Regel aus `REGELN.md` Abschnitt 5 am gezeichneten Ergebnis
abbricht, sobald das vorgewählte Thema kein Ergebnis zeichnet — mit
festen Beispielen für kein, ein und zwei Profile (`REGELN.md`
Abschnitt 6e), weil die Eingabe je Besucherin eine andere ist.


### 102 · „Saturn Return" und „big three" stehen auf keiner Seite
Aus der Recherche vom 2026-11-25 (Spur C, erster Fund). `PRODUKT.md`
Abschnitt 2 Punkt 1 nennt vier Wörter, die die Zielgruppe mitbringt;
zwei davon stehen auf keiner der 134 ausgelieferten Seiten, obwohl beide
Sachen da sind — die Saturnrückkehr als große Karte auf `index.html`
(aus `kern/themen-daten.js`, und nur innerhalb von 8 Grad sichtbar), die
drei Großen auf `tool.html`, `chart-lesen.html`, `reading-ablauf.html`
und `profil-ansicht.html`. „Solar Return" steht dagegen auf 15 Dateien,
im Glossar, im Suchindex und in `begriffe.js`. `glossar.html` kennt
keinen der beiden Begriffe; das Suchfeld auf `wissen.html`, verlinkt von
83 Seiten, antwortet auf „saturn return" und „big three" mit „Nichts
gefunden".
**Fertig, wenn:** beide Namen in der Tabelle in `REGELN.md`
Abschnitt 2a stehen; jeder dort an der Stelle auftaucht, an der die
Sache schon erklärt ist — auf der Saturnkarte und dort, wo Sonne, Mond
und Aszendent zusammen erklärt werden —, jeweils mit der Erklärung auf
derselben Karte und der Zeile „Was oft zu groß erzählt wird", wie
Abschnitt 2a es verlangt; beide über `glossar.html` und über den
Suchindex von `wissen.html` zu finden sind; und `pruefe-alles.py`
abbricht, sobald ein in der Tabelle von `REGELN.md` Abschnitt 2a
geführter Name auf keiner ausgelieferten Seite oder in keinem Suchindex
vorkommt — als Regel in einer eigenen Funktion mit festen Beispielen,
die durchgehen und anschlagen müssen (`REGELN.md` Abschnitt 6e), damit
die Prüfung an der Regel bricht und nicht an der Seite.

### 103 · Die Antwort für die Skeptikerin endet auf dem gefühlten Nutzen
Aus der Recherche vom 2026-11-25 (Spur C, zweiter Fund). Auf
`klientinnen-fragen.html` endet die Antwort auf „Glaubst du wirklich
daran? Ist das nicht Unsinn?" mit „Was zählt: Hilft es dir, dich klarer
zu sehen? Wenn ja, hat es seinen Zweck erfüllt." Der erste Satzteil
derselben Antwort weist den Wissenschaftsanspruch zurück und ist
richtig; der letzte macht die gefühlte Passung zum Maßstab, und genau
die benennt die Coaching-Fachpresse als den Mechanismus der Täuschung
(Coaching-Magazin 1|2025). Die Seite verspricht „Deine Sicherheit im
Gespräch". Dieselbe Seite ist außerdem eine fünfte Stelle mit einer
eigenen Aussage über den Forschungsstand, die Aufgabe 71 nicht führt:
nachgezählt am 2026-11-25 tragen elf ausgelieferte Seiten siebzehn
solche Sätze, darunter drei auf `index.html`, die je Verfahren schon
richtig sind. Deshalb nach Aufgabe 71 oder mit ihr zusammen.
**Fertig, wenn:** die Antwort nicht mehr mit der gefühlten Hilfe als
Maßstab endet, sondern „hat mir beim Denken geholfen" von „hat über mich
gestimmt" selbst unterscheidet und für den Forschungsstand auf dieselbe
Stelle zeigt, die Aufgabe 71 anlegt; und in Aufgabe 71 die vollständige
Liste der Stellen steht, damit die dort verlangte Prüfung die drei
richtigen Sätze auf `index.html` nicht mitabbricht.


## Was nicht gemacht wird

* Keine neuen Rechenverfahren, solange die vorhandenen nicht verständlich
  erklärt sind.
* Keine neue Seite, solange zwei alte dasselbe sagen.
* Keine Gestaltungsänderung ohne Grund. Die Farben und Schriften stehen.

---

### 9 · Zweite Stimme für die Reibung zwischen zwei Menschen
Die Analyse rechnet schon Paare und Zusammenarbeit, aber die Beiträge
schöpfen das nicht ab — dabei ist genau das der Unterschied zu allem
anderen in diesem Feld: nicht „du", sondern „ihr beide".
**Fertig, wenn:** `content/mach-content.py` einen vierten Beitragstyp
erzeugt, der aus `analyse/thema-paar.js` eine Reibung erklärt, ohne eine
konkrete Person erkennbar zu machen — und der Bau das prüft.

### 10 · Der Monatsbericht sagt nicht, was er nicht kann
`REGELN.md` Abschnitt 4 verlangt von jeder rechnenden Seite einen
Abschnitt „Was das taugt — und was nicht", und `PRODUKT.md` Abschnitt 3
nennt diese Ehrlichkeit den Markenkern. Der Monatsbericht hat nur einen
Hinweiskasten für die Coachin. Im Brief selbst, den ein Mensch liest,
steht nichts darüber, wie häufig so eine Aussage rechnerisch überhaupt
ist, dass die Deutung nicht überprüft ist, und dass das eigene Erleben
Vorrang hat.
**Fertig, wenn:** der Brief diese drei Sätze trägt, sie aus
`monat-daten.js` kommen, und `bau-monat.py` abbricht, wenn einer fehlt.

### 11 · Drei Kopien der Himmelsrechnung zusammenlegen
`bez/engine.js`, `niveau/engine.js` und `oph/engine.js` sind heute Zeichen
für Zeichen gleich mit `rituale/engine.js`. `pruefe-alles.py` verhindert
seit heute, dass sie auseinanderlaufen — aber vier Dateien für eine
Rechnung bleiben vier Dateien.
**Fertig, wenn:** die drei Kopien gelöscht sind, ihre `bau-*.py`
`rituale/engine.js` laden, und der Neubau bitgleiche Seiten erzeugt.

### 12 · Der Brief verschweigt, dass er auswählt
In manchen Monaten laufen sieben Vorgänge; der Brief nennt zwei und sagt
nicht, dass er auswählt. Wer das nicht weiß, hält die zwei für alles, was
los ist — und das ist genau die Sorte stiller Übertreibung, die
`PRODUKT.md` Abschnitt 3 ausschließen will.
**Fertig, wenn:** der Brief bei mehr als zwei Vorgängen in einem Satz sagt,
wie viele es insgesamt sind und wonach die genannten ausgewählt wurden, und
`bau-monat.py` einen Probefall mit mehr als zwei Vorgängen baut und prüft,
dass dieser Satz dort steht und bei zwei oder weniger fehlt.

### 13 · Die zweite Anlage sagt nicht, worum es geht
Der zweite Vorgang im Brief kommt ohne eigene Überschrift: „Daneben läuft
noch etwas Zweites." und direkt der Fließtext. Seit die Beschreibungen nach
Winkelart getrennt sind, gibt es für ihn eine passende Überschrift — sie
wird nur nicht gezeigt.
**Fertig, wenn:** auch der zweite Vorgang seine eigene Überschrift trägt,
diese sich bei reibendem und tragendem Winkel unterscheidet, und die
Rauchprobe prüft, dass bei zwei Vorgängen zwei verschiedene Überschriften
im Brief stehen.

### 14 · Die Bausteine am Wurzelort haben keinen Ursprung
Seit dem 20. Oktober muss jede ausgelieferte *Seite* aus einem `bau-*.py`
kommen oder als Handarbeit eingetragen sein. Für die zwanzig
JavaScript-Dateien oben gilt das nicht: `profil.js` verwahrt die
Profildaten jeder Besucherin und wird von jeder gebauten Seite geladen,
hat aber weder eine Quelle in `quelltext/` noch ein Bauskript. Genau an
dieser Stelle war der Monatsbericht dünn geblieben.
**Fertig, wenn:** `pruefe-alles.py` auch für jede `.js`-Datei oben einen
Ursprung verlangt — gebaut oder namentlich als Handarbeit eingetragen —
und die Liste der Handarbeit wie bei den Seiten schrumpfen kann.

### 15 · Der Wissensstand liegt nicht bei den Profildaten
Die Bereichsauswahl liegt seit heute in `AC_P` neben dem Profil, der
Wissensstand aber in zwei eigenen Schlüsseln (`ac_niveau`,
`ac_niveau_profile`). Zwei Einstellungen, die dasselbe bewirken sollen —
plattformweit gelten —, liegen an zwei Orten, und nur eine wandert beim
Ausgeben der Profildaten mit.
**Fertig, wenn:** der Wissensstand ebenfalls in `AC_P` liegt, ein alter
Speicherstand einmalig übernommen wird, und `pruefe-alles.py` abbricht,
sobald eine Einstellung wieder einen eigenen Speicherschlüssel anlegt.

---

### 16 · Die Stufenleiste darf nicht weiter zurückfallen
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

### 17 · „Heute" sagt die Zukunft voraus und nicht, was es taugt
Befund der Prüferin vom 2026-10-23 (Die Suchende, dritter Befund — in
`PRUEFERIN.md` der erste, weil Grenzen zuerst kommen). Unter „Was du tun
kannst" stehen Sätze, die eine Zukunft behaupten und einen Preis darauf
setzen: „Was du in diesem Fenster nicht fragst, musst du später teurer
verhandeln." `PRODUKT.md` Abschnitt 5 schließt beides aus — Vorhersage
und Dringlichkeit, die es nicht gibt. Dazu fehlt „Heute" der Abschnitt
„Was das taugt — und was nicht", den `REGELN.md` Abschnitt 4 von jeder
rechnenden Seite verlangt; dieselbe Fehlerklasse wie Aufgabe 10.
**Fertig, wenn:** kein Handgriff auf „Heute" mehr eine Folge in der
Zukunft behauptet, „Heute" den Ehrlichkeitsabschnitt trägt (wie häufig
die Aussage rechnerisch ist, dass die Deutung nicht überprüft ist, dass
das eigene Erleben Vorrang hat), beides aus den Datendateien kommt, und
der Bau abbricht, wenn der Abschnitt fehlt oder ein Handgriff eine
Zukunftsform mit Folge enthält.

**Die Handgriffe sind seit dem 5.11. erledigt** (Aufgabe 33): Sie liegen
an einer Stelle in `bereich-daten.js`, und `rituale/pruefwerk.py` bricht
den Bau ab, sobald einer eine Folge in der Zukunft behauptet. Offen
bleibt hier nur noch der Ehrlichkeitsabschnitt auf „Heute".

### 18 · Die Startseite ohne Profil sagt nicht, wofür sie da ist
Befund der Prüferin vom 2026-10-23 (Die Suchende, zweiter Befund). Wer
`index.html` ohne Profil öffnet, sieht nur den Kasten „Noch kein Profil
angelegt" und sonst eine leere Seite — am Telefon 351 Pixel hoch. Die
Seite verlangt als Erstes Geburtszeit und Geburtsort und hat bis dahin
mit keinem Satz gesagt, was sie dafür zurückgibt. Der Satz, der das
könnte, steht schon auf `bereiche.html`.
**Fertig, wenn:** der Leerzustand von „Heute" vor der Aufforderung in
zwei bis drei Sätzen sagt, was die Seite tut, was sie zurückgibt und
warum sie Zeit und Ort braucht — auf Stufe 0, ohne Verkaufston —, der
Text aus einer Datendatei kommt und der Bau abbricht, wenn der
Leerzustand nur noch aus der Aufforderung besteht.

### 19 · `toLowerCase` wird nur dort geprüft, wo jemand daran gedacht hat
`REGELN.md` Abschnitt 4 verbietet `toLowerCase` auf deutschen Text
plattformweit. Geprüft wird es aber in sechs `bau-*.py` einzeln, jedes nur
für seinen eigenen Ordner — und zwei Dateien, über die kein solcher
Wächter läuft, benutzen es: `niveau/reading-app.js` baut den Dateinamen
eines Readings damit, und `bez/beziehung-app.js` schreibt damit den ersten
Buchstaben eines Satzes klein, was bei einem Substantiv falsches Deutsch
ergibt. Eine Regel, die pro Ordner geprüft wird, gilt für jeden neuen
Ordner nicht.
**Fertig, wenn:** `pruefe-alles.py` als Querprüfung über den ganzen
Quelltext abbricht, sobald irgendwo `toLowerCase` steht, die
Ordnerprüfungen dafür entfallen, und die beiden Fundstellen ohne sie
auskommen.

### 20 · In `bereich-app.js` darf noch ein Satz stehen
Für `monat-app.js` und `wahl-app.js` bricht der Bau ab, sobald dort ein
Satz steht — daraus entstand seinerzeit „liegt auf deinen Ausdruck".
`bereich-app.js` trägt weiter eigene Sätze: den Hinweis auf ein fehlendes
Profil, den Satz über einen Stichtag vor der Geburt, die Zeile über die
drei Seiten eines Bereichs. Beim Tiefgang sind heute fünf solche Sätze
nach `bereich-daten.js` gewandert; die übrigen warten.
**Fertig, wenn:** alle Sätze aus `bereich-app.js` in `bereich-daten.js`
stehen und `bau-bereiche.py` abbricht, sobald dort wieder einer auftaucht —
dieselbe Prüfung, die `wahl-app.js` schon hat.

### 21 · „Heute" sagt über jeden Menschen zu viel Gleiches
Gemessen am 2026-10-23 mit zwei sehr verschiedenen erfundenen
Geburtsbildern: Auf `index.html` sind 67 von 100 Sätzen wortgleich. Besser
als „Ich" vorher, aber die Seite nennt nur den lautesten Bereich und einen
Handgriff; der Rest gilt für alle. Dazu steht dort „Der Mond steht in
Fische 26 Grad 44 und läuft durch das 2." mitten im Laientext — Mechanik,
die in `ac-tech` gehört.
Gehört in einen Zug mit Aufgabe 17 und 18, die beide dieselbe Seite
betreffen; zweimal anfassen wäre doppelte Arbeit.
**Fertig, wenn:** „Heute" zu jedem Vorgang sagt, welche Anlage dieses
Menschen er trifft (wie der Monatsbericht seit dem 21.10.), die Mechanik
in `ac-tech` wartet, und `bau-heute.py` wie `bau-ich.py` seit heute fünf
erfundene Bilder zeichnet und abbricht, wenn im Schnitt mehr als ein
Viertel der Kernaussagen wortgleich ist.

### 22 · Der Index auf „Ich" kennt die Bereichsseite nicht
`bau-ich.py` meldet als Hinweis: `bereiche.html` rechnet mit einem Profil,
steht aber nicht im Index „Alles, was es zu dir gibt". Die Bereichsseite
ist einer der fünf Hauptpunkte der Navigation — wer den Index für
vollständig hält, übersieht sie.
**Fertig, wenn:** die Bereichsseite im Index steht und der Hinweis beim
Bauen ein Fehler wird statt eines Hinweises, damit die nächste fehlende
Seite nicht wieder nur eine Zeile im Protokoll ist.

### 23 · Die App-Ansicht endet an den 108 Handarbeitsseiten
Seit heute binden die 17 gebauten Seiten Manifest und Zwischenspeicher
ein. Die 108 Seiten, die `pruefe-alles.py` als `HANDARBEIT` führt, tun es
nicht — sie haben keine Quelle, in die die Zeilen gehörten. Wer über eine
von ihnen auf die Seite kommt, bekommt kein Angebot, sie aufs Telefon zu
legen, und nach einem Verbindungsabbruch bleibt sie leer. „Installierbar"
ist damit eine Eigenschaft von 17 Seiten, nicht der Plattform — dieselbe
Lücke wie bei der Stufenleiste in Aufgabe 16.
**Fertig, wenn:** auch die Handarbeitsseiten den Block aus
`app/app-kopf.html` tragen — entweder weil sie ins Bausystem gewandert
sind oder weil ein Bauskript sie an dieser einen Stelle nachrüstet — und
die Ausnahmeliste in der zehnten Querprüfung schrumpfen kann statt zu
bleiben.

### 24 · Niemand erfährt, dass man die Seite aufs Telefon legen kann
Das Manifest liegt, der Zwischenspeicher läuft, und kein Satz auf der
Plattform sagt es. Auf dem Telefon versteckt der Browser das Angebot in
einem Menü, das die wenigsten öffnen; eine Stufe, von der niemand weiß,
ist keine Stufe. Nach `PRODUKT.md` Abschnitt 5 ohne Dringlichkeit und
ohne Verkaufston — ein Hinweis, der einmal erscheint und sich wegtippen
lässt.
**Fertig, wenn:** die Startseite in zwei Sätzen sagt, was das Ablegen auf
dem Telefon bringt und dass dabei nichts an einen Server geht, der Text
aus einer Datendatei kommt, ein Wegtippen dauerhaft gilt, und der Bau
abbricht, wenn der Hinweis beim zweiten Besuch wieder auftaucht.

### 25 · Die Stufe-0-Prüfung steht in sechs Ordnern einzeln
Beim Anbinden der Raumseiten ist aufgefallen: Die Liste der Wörter, die
auf Stufe 0 nicht sichtbar sein dürfen, liegt heute in sechs `bau-*.py`
je für den eigenen Ordner, in drei `_test-*.js` noch einmal und seit
heute auch in `pruefe-alles.py`. Solange die Kopien gleich sind, fällt
nichts auf; sobald eine gepflegt wird, gilt auf einer Seite ein Fachwort
als Fachwort und auf der nächsten nicht. Dieselbe Fehlerklasse wie bei
der Himmelsrechnung und der Bereichsliste — und dieselbe wie Aufgabe 19
beim `toLowerCase`.
**Fertig, wenn:** die Liste an einer Stelle steht, die Python und
JavaScript beide lesen können, die Kopien gelöscht sind, und
`pruefe-alles.py` abbricht, sobald irgendwo im Quelltext eine zweite
Liste mit Planetennamen und Zeichennamen auftaucht.

### 26 · Die Raumseiten sagen nicht, zu welchem Bereich sie gehören
Von der Bereichsseite führt seit heute ein Weg zu jedem Themenraum,
aber nicht zurück: Wer auf `raum-naehe.html` landet, erfährt nicht, dass
dasselbe Thema auf `bereiche.html` mit Datum und Handgriff steht. Der
Fuß der Raumseiten verweist auf `raeume.html` und auf eine passende
Nachbarseite — die Bereiche fehlen.
**Fertig, wenn:** jede der zwölf Raumseiten unten auf ihren Bereich
verweist, die Zuordnung dieselbe Quelle benutzt wie der Weg hin
(`B_RAUM.zu`, nicht eine zweite Liste), und `pruefe-alles.py` abbricht,
sobald eine Raumseite keinen Rückweg hat.

### 27 · „Haus" steht auf der Ich-Seite noch auf Stufe 0
Seit dem Umbau vom 27.10. warten Grad, Zeichen und Anlagennamen auf der
Ich-Seite in `ac-tech`, und `bau-ich.py` prüft das über den gerenderten
Text der ganzen aufgeklappten Seite. Für „Haus" gilt das noch nicht: Die
Überschrift eines aufgeklappten Feldes heißt „7. Haus — Partnerschaft",
und die Weiterverweise nennen „Alle Häuser". `REGELN.md` Abschnitt 2
schließt das Wort auf Stufe 0 aus.
**Fertig, wenn:** auf Stufe 0 nirgends auf der Ich-Seite „Haus",
„Häuser" oder „Hauses" sichtbar ist, die Wörter stattdessen in `ac-tech`
warten, und die Prüfung in `bau-ich.py`, die heute Grad, Zeichen und
Anlagen abfängt, auch diese drei Wörter führt. Der Stufenschalter, der
der Ich-Seite bis zum 27.10. ganz fehlte, gehört zu Aufgabe 16.

### 28 · In `ich-app.js` stehen noch Sätze
`bau-ich.py` fängt seit dem 23.10. jeden Satz ab, der in
`ich-rechner.js` steht statt in `ich-daten.js` — dieselbe Fehlerklasse
wie bei `tief-bauer.js` und `monat-app.js`. Die Anzeige wird dabei nicht
angesehen, und dort steht noch welches: „Heute auf deinem Chart",
„Gerade steht nichts in deinen Häusern", „Kein Planet steht hier — das
ist der Normalfall …", „Die Frage, die es aufmacht", „Noch kein Profil
angelegt". Diese Sätze liest keine Prüfung, also kann sie auch niemand
auf Stufe 0 prüfen — und beim Umzug nach `PRODUKT.md` Abschnitt 7
wandern sie nicht mit, weil sie in der Anzeige hängen.
**Fertig, wenn:** diese Sätze in `ich-daten.js` stehen, in der
Laienprüfung mitlaufen, und `bau-ich.py` `ich-app.js` mit derselben
Suche abfängt wie `ich-rechner.js` — ein neuer Satz in der Anzeige
bricht den Bau.

### 29 · Die geratene Geburtszeit ist nirgends vermerkt
Vier Stellen nehmen eine Geburtszeit an. `tool.html` und `ankommen.js` sagen,
was eine geratene Zeit kostet; `chart-rechner.html` warnt nur vor der
Zeitzone; `profile.html` trägt 12:00 vor und sagt nichts dazu — und das ist
die Seite, auf die 123 der 126 ausgelieferten Seiten verweisen, auch die
Leerzustände von Heute, Dossier und Geistführung. Gespeichert wird die Zeit
wie jede andere Angabe; kein Schlüssel hält fest, dass sie geraten war. 43
ausgelieferte Dateien benutzen `haus(`. Siehe Recherche vom 2026-10-28,
Spur C: Bei vier erfundenen Geburten an deutschen Breiten trifft 12:00 das
Aszendenten-Zeichen nur in einem Fenster von 50 bis 173 Minuten; liegt es
falsch, wandert jeder Punkt um dieselbe Zahl von Häusern weiter und mit ihm
die Reihenfolge der zehn Bereiche.
**Fertig, wenn:** `profile.html` am Zeitfeld sagt, was eine geratene Zeit
kostet, das Profil einen Vermerk darüber führt, ob die Zeit geraten ist, die
Seiten, deren Kernaussage an den Häusern hängt, diesen Vermerk in einem Satz
anzeigen, und `pruefe-alles.py` abbricht, sobald eine ausgelieferte Seite
`haus(` benutzt und den Vermerk nicht liest.

### 30 · Die Berliner Platzvergabe ist keine Warteliste
`diagnose-weg.html` beschreibt für Berlin eine „gemeinsame zentrale
Warteliste" der vier Autismus-Spezialambulanzen. Die vier Stellen, die eine
Anmeldung über die Spezialambulanz der Humboldt-Universität und der erste
Mittwoch eines Quartals stimmen; das Verfahren nicht — vergeben wird per
Zufallsverfahren, verteilt wird nach organisatorischen Kriterien, eine Wahl
der Stelle gibt es nicht, und Rückmeldung bekommt nur, wer einen Platz
erhält. Damit gilt Schritt 4 derselben Seite („gleichzeitig überall
anmelden, absagen sobald ein Termin sicher ist") dort gerade nicht. Siehe
Recherche vom 2026-10-28, Spur C.
**Fertig, wenn:** der Berlin-Absatz das Verfahren benennt, Schritt 4 Berlin
ausdrücklich ausnimmt, Quelle und Abrufdatum auf der Seite stehen, und wer
den Absatz liest, weiß, was er als Nächstes tut.

### 29 · Die Prüfung auf Stufe 0 misst an ausgeblendeten Abschnitten
Beim Reparieren von „Schlaf und Bewegung“ am 29.10. aufgefallen: Die
Rauchprobe in `bau-heute.py` klickt vorher auf „Wenig“, und das blendet
mehrere Abschnitte aus. Die Zählungen `t0` und `t3` danach messen deshalb
an einer Seite, auf der die Hälfte gar nicht gerendert ist — sie können
nicht mehr finden, was dort stehen würde. „Auf Stufe 0 keine Fachsprache“
ist damit für die hinteren Bänder nicht geprüft, sondern nur gehofft.
**Fertig, wenn:** `t0` und `t3` an der vollständig eingeblendeten Seite
gemessen werden, die Zählung `checkVisibility()` benutzt statt
`offsetParent`, und ein absichtlich sichtbar gemachtes Fachwort in einem
der hinteren Bänder den Bau bricht.

### 30 · Zwei Seiten erklären dasselbe — die nächsten Paare sind ungeprüft
Aufgabe 5 hat zwei Paare angesehen und eine doppelte Tafel abgeräumt.
`pruefe-alles.py` hält seit heute die Stellen fest, an denen die fünf
Winkel ausgelegt werden dürfen — für jede andere Doppelung gibt es nichts
Vergleichbares. Bei 108 Handarbeitsseiten ist das nächste Paar nur eine
Frage der Zeit.
**Fertig, wenn:** eine Querprüfung die ausgelieferten Seiten paarweise auf
wörtlich gleiche Absätze ab einer bestimmten Länge vergleicht, die
bekannten und gewollten Dopplungen namentlich eingetragen sind, und eine
neue Dopplung den Bau bricht.

### 36 · Die Herrscherliste steht zehnmal im Quelltext
Gefunden beim Erledigen von Aufgabe 19 am 2.11., als eine elfte Kopie
dazugekommen wäre. `['Mars','Venus','Merkur','Mond','Sonne','Merkur',
'Venus','Mars','Jupiter','Saturn','Saturn','Jupiter']` steht Zeichen für
Zeichen gleich in `bereich-rechner.js`, `dossier-daten.js`,
`zeit-rechner.js`, `analyse/engine.js`, `zauber-person.js`,
`karte-daten.js`, `geist-app.js`, `ich-daten.js`, `_taste-haeufig.js` und
jetzt auch in `begleit-rechner.js`. Dieselbe Fehlerklasse wie bei den
Engine-Kopien (Aufgabe 11), nur dass hier niemand verhindert, dass die
zehn auseinanderlaufen: Eine geänderte Zuordnung an einer Stelle bliebe
an neun anderen stehen, und das fällt erst auf, wenn zwei Seiten
verschiedene Herren nennen.
**Fertig, wenn:** die Zuordnung an genau einer Stelle steht, die übrigen
Seiten sie von dort laden, der Neubau bitgleiche Seiten erzeugt, und
`pruefe-alles.py` abbricht, sobald irgendwo im Quelltext eine zweite
Zwölferliste mit diesen Namen auftaucht.

### 37 · Gerechnete Zahlen stehen mit Punkt statt mit Komma
Gefunden beim Erledigen von Aufgabe 19 am 2.11. `REGELN.md` Abschnitt 4
verlangt „Zahlen mit Komma, nicht mit Punkt: 2,5 Grad". Die Anzeigen
schreiben aber `x.ab.toFixed(1) + '°'` — in `begleit-app.js` an drei
Stellen, und `toFixed` liefert immer einen Punkt. Sichtbar wird das ab
Wissensstufe 2 in jedem Winkel-Etikett: „3.2°" statt „3,2°". Eine Regel,
die in `REGELN.md` steht und nirgends geprüft wird, ist eine Bitte.
**Fertig, wenn:** keine ausgelieferte Seite eine Dezimalzahl mit Punkt im
sichtbaren Text zeigt, die Umwandlung an einer Stelle liegt, die alle
Anzeigen benutzen, und eine gemeinsame Prüfung — nicht je `bau-*.py` eine
eigene — abbricht, sobald im erzeugten Text eine Ziffer, ein Punkt und
wieder eine Ziffer aufeinanderfolgen.

### 68 · Die Verweisprüfung steht zehnmal und sieht jedes Mal anders hin
Gefunden beim Erledigen von Aufgabe 48 am 2026-11-09. „Verweis ins Leere"
steht in zehn `bau-*.py` einzeln, und keine zwei Fassungen prüfen
dasselbe: Sieben suchen `href="…"`, zwei davon mit schließendem
Anführungszeichen und eine mit Punkt im Namen; vier lesen nur den Körper,
drei auch die Anzeige, eine die Daten. Ein Dateiname, der nicht in einem
`href`-Attribut steht — `wo:'zauber.html|Planetenstunden heute'`, oder
`ohneProfilDatei` in einer Datendatei —, kommt an keiner dieser Fassungen
vorbei. Genau das ist bei Aufgabe 48 passiert: Vier Seitennamen wanderten
aus `heute-app.js` in `heute-daten.js`, und die Prüfung in
`bau-heute.py` wäre grün geblieben, weil ihr Fall nicht mehr bei ihr
vorbeikommt. Sie ist dort seit dem 2026-11-09 auf die gemeinte Form
umgestellt (jeder Seitenname, wo immer er steht, mit festen Beispielen
darunter) — in den neun übrigen Ordnern steht die alte Fassung. Dieselbe
Fehlerklasse wie bei Aufgabe 40 und 41: eine Regel, die je Datei gepflegt
wird, ist in acht von neun Ordnern veraltet, sobald sie einmal verschärft
wurde.
**Fertig, wenn:** die Regel in `rituale/pruefwerk.py` steht, jedes
`bau-*.py` sie von dort holt, jede gebaute Seite sie besteht, ein
Seitenname ins Leere in **jeder** dieser Seiten den Bau abbricht — auch
wenn er nicht in einem `href`-Attribut steht —, und eine Gegenprobe
festhält, dass die Regel pro Seite überhaupt etwas findet, damit ihr Grün
eine Aussage bleibt.

### 69 · Die Lücke in einer Vorlage fällt erst auf, wenn sie erscheint
Gefunden beim Erledigen von Aufgabe 49 am 2026-11-10. Die Sätze der
Terminliste nennen seither ihren Bereich, also tragen die Vorlagen in
`heute-daten.js` eine Lücke mehr. Ob die Anzeige sie füllt, merkt heute
nur die Rauchprobe — und die sieht allein die Karten, die der Himmel
dieses Tages hergibt. Die beiden Mondsätze waren am 2026-11-10 gar nicht
auf der Seite; dass „{bereich}" dort nicht stehen bleibt, ist an vier
verstellten Tagen von Hand nachgesehen worden und von keiner Prüfung.
Dieselbe Fehlerklasse wie `REGELN.md` 6e: Eine Prüfung, deren Eingabe
der Tag bestimmt, prüft an den meisten Tagen nichts.
**Fertig, wenn:** jede Vorlage in `heute-daten.js`, die als Kartentext
auf die Seite geht, an ihrer Einsetzstelle in `heute-app.js` mit allen
ihren Lücken gefüllt wird, die Zuordnung an einer Stelle steht und nicht
je Vorlage, und eine Vorlage, die eine Lücke dazubekommt, ohne dass die
Anzeige sie füllt, den Bau abbricht — gegen feste Beispiele gehalten wie
`_datum_ohne_jahr`, also unabhängig davon, welcher Tag ist.

*Seit dem 2026-11-13 gibt es diese Prüfung einmal, in `bau-bez.py`: sie
liest jeden `BZ_FUELL`-Aufruf mit der Klammer statt mit einem
Suchmuster und hält die Schlüssel gegen die Lücken genau dieser
Vorlage. Die erste Fassung sammelte alle Schlüssel in einen Topf — und
ließ „{wer}" durch, weil ein anderer Abschnitt ein `wer` einsetzt.
Dieselbe Falle wie in `REGELN.md` 6e. Wer Aufgabe 69 macht, nimmt sie
von dort und legt sie nach `rituale/pruefwerk.py`, statt sie ein
zweites Mal zu erfinden.*

*Dazugekommen am 2026-11-16 (Aufgabe 55): In `pruefwerk` steht jetzt
`pruefe_luecken` — genau die Topf-Fassung, vor der der Absatz darüber
warnt. Sie hält `karte-daten.js` und `mond-texte.js` und fängt die
Lücke, die niemand irgendwo füllt; eine Lücke, die ein anderer
Abschnitt zufällig gleich benennt, lässt sie durch. Beide Seiten
prüfen deshalb zusätzlich im Ergebnis, dass keine geschweifte Klammer
auf der Seite steht. Wer Aufgabe 69 macht, **ersetzt** `pruefe_luecken`
durch die Fassung aus `bau-bez.py` — sie nicht ein drittes Mal
erfinden, und die Topf-Fassung nicht neben der genauen stehen
lassen.*

### 70 · Auf `zeiten.html` nennen neun Karten ein Zeichen und erklären keines
Aus dem Gestaltungsdurchgang vom 2026-11-10 (Befund 10.11-1). Alle neun
Karten unter „Was als Nächstes kommt" enden auf „Der Abschnitt trägt das
Zeichen X." — auch auf Stufe 0, auch ohne ein Wort dazu, was X heißt. Im
Balkenbild tragen acht Balken statt eines Wortes nur das Glyph. Dabei steht
die Alltagssprache längst da: `zeit-daten.js` gibt jedem Zeichen ein `bild`
(„verbinden, reden, vieles gleichzeitig"), und „Wo du gerade stehst" zeigt
es schon. `REGELN.md` Abschnitt 2a verlangt die Erklärung auf derselben
Karte, bevor etwas über die Wirkung dasteht. Nebenwirkung: Weil kein
Zeichenname auf dieser Seite in `ac-tech` steht, ändert der
Wissensstand-Schalter auf der ganzen Seite nichts außer seiner eigenen
Beschriftung — gemessen über 6.656 Pixel Seitenhöhe.
**Fertig, wenn:** jede der neun Karten das `bild` ihres Zeichens in
Alltagssprache trägt, der bloße Zeichenname und das Glyph nur noch in
`ac-tech` mit `data-ab="2"` stehen, und `bau-zeit.py` den Bau abbricht,
sobald im auf Stufe 0 gezeichneten Ergebnis ein Zeichenname oder ein
Tierkreisglyph ohne das zugehörige `bild` auf derselben Karte vorkommt —
gegen feste Beispiele gehalten wie `_datum_ohne_jahr`, also unabhängig
davon, welches Geburtsbild gerechnet wird.

### 71 · Vier Fassungen sagen über den Forschungsstand vier verschiedene Dinge
Aus der Recherche vom 2026-11-11 (Spur A, erster Fund). Der Satz, den
`REGELN.md` Abschnitt 4 verlangt — „dass die Deutung nicht überprüft
ist" —, steht im Auslieferstand viermal und jedes Mal anders:
`bereich-daten.js` („keinen Beleg dafür, dass daraus Ereignisse
folgen", auf `bereiche.html` und `index.html`), `ich-daten.js`
(„ist Deutung und nicht überprüft", auf `uebersicht.html`),
`zeit-koerper.html` („nie ernsthaft untersucht worden") und
`zeit-app.js` („Das Verfahren ist nicht überprüft") auf `zeiten.html`.
Keine der vier nennt eine Quelle. Für die Aussage auf
`uebersicht.html` ist „nicht überprüft" sachlich falsch in die
schonende Richtung: Der Schluss von einer Geburtsstellung auf einen
Charakterzug ist der am häufigsten geprüfte Anspruch des Feldes und
wiederholt negativ ausgefallen (Dean und Kelly 2003, Effektstärke
0,00 ± 0,03 an 2.101 Menschen und 110 Merkmalen). Für die Transite,
die diese Plattform wirklich rechnet, ist die Lage umgekehrt dünn.
Drei Handarbeitsseiten können es längst besser und nennen eine Quelle
(`mond.html` Rotton und Kelly 1985, `berufe.html` „wiederholt negativ
ausgefallen", `zahlen.html` Hines). Aufgabe 10 und Aufgabe 17 nennen
die alte Formulierung beide als Fertig-Kriterium und würden sie in
zwei weitere Seiten tragen; deshalb vor diesen beiden.
**Fertig, wenn:** die Aussage über den Forschungsstand an genau einer
Stelle steht, je Verfahren getrennt (Geburtsstellung gegen
Charakterzug, laufende Transite, zodiakale Freilassung) und jeweils
mit Quelle, die vier vorhandenen Fassungen und die Zeile in
`REGELN.md` Abschnitt 4 von dort kommen, auf `uebersicht.html` statt
„nicht überprüft" steht, dass geprüft wurde und negativ ausfiel, und
`pruefe-alles.py` abbricht, sobald eine ausgelieferte Seite eine
eigene, nicht von dort stammende Aussage über den Forschungsstand
trägt — gegen feste Beispiele gehalten, also unabhängig davon, welche
Seite gerade gebaut wird.

### 72 · Der Handgriff nennt nicht, wann er zu tun ist
Aus der Recherche vom 2026-11-11 (Spur A, zweiter Fund). `REGELN.md`
Abschnitt 3 verlangt „ein Handgriff, nicht fünf", und
`pruefwerk.handgriff_tadel` hält diese Form mit vier Verboten: kein
Preis, keine Folge nach dem Fenster, keine Vorhersage des Ertrags.
Keine Regel verlangt, dass etwas darin steht. Von den zehn echten
Handgriffen in `bereich-daten.js` nennt einer die Situation, in der
gehandelt wird; fünf nennen die Zeit mit einem unbestimmten Wort
(„gerade", „dieser Tage", „in diesen Wochen"). Die größte
Zusammenfassung dazu (Sheeran, Listroma und Gollwitzer 2025, 642
Prüfungen) trennt genau hier: ein an eine Bedingung gehängter Plan
d = 0,43, ein bloßes Zeitfenster d = 0,29; und sie empfiehlt
ausdrücklich, die Situation vorzugeben statt sie der Person zu
überlassen. Unabhängig von jeder Effektstärke verlangt `REGELN.md`
Abschnitt 6d schon heute, dass ein eingesetzter Halbsatz etwas
bezeichnet, das man sich vorstellen kann. **Hängt an Aufgabe 41:**
Solange nicht entschieden ist, welche Texte Handgriffe sind, verlangt
eine neue Regel in 62 `meistern`-Fällen zu viel oder bei den zehn zu
wenig.
**Fertig, wenn:** jeder der zehn Handgriffe in `bereich-daten.js` die
Situation nennt, in der die Handlung zu tun ist — eine
wiedererkennbare Gelegenheit, kein Zeitfenster und kein „gerade" —,
die Anforderung neben `handgriff_tadel` in `rituale/pruefwerk.py`
steht und mit festen Beispielen unterlegt ist (welche durchgehen,
welche anschlagen müssen, nach `REGELN.md` Abschnitt 6e), ein
Handgriff ohne Situationshälfte den Bau abbricht, und die Prüfung
nachzählt und ausgibt, wie viele der 62 `meistern`-Texte sie heute
nicht bestehen würden — damit der Rückstand sichtbar ist, ohne
Aufgabe 41 zu blockieren.

---

### 68 · Die Satzprüfung liest die Rechner nicht
Aufgefallen beim Erledigen von Aufgabe 50 am 2026-11-11. Die beiden
Regeln aus `pruefwerk` halten jetzt sechs Anzeigen — aber sie werden
nur auf `*-app.js` angewandt. Neben jeder Anzeige liegt ein
`*-rechner.js`, und der ist für einen Satz genauso erreichbar: Wer
einen Text aus der Anzeige entfernt bekommt, kann ihn eine Datei
weiter wieder hineinschreiben, und dort liest ihn keine der beiden
Regeln. `bau-ich.py` hat dafür eine eigene, lose Fassung („drei Wörter
oder mehr in einfacher Anführung") — dieselbe Bauart, die in
`bau-bereiche.py` bis zum 2026-11-10 stand und die Aufgabe 49
ersetzen musste: sie liest eine von drei Anführungsarten und schlägt
unter drei Wörtern nicht an. Dieselbe Fehlerklasse in mehreren Ordnern
einzeln, wie bei Aufgabe 25, 34 und 40.
**Fertig, wenn:** `pruefwerk.pruefe_anzeige_satzfrei` auch auf jedes
`*-rechner.js` angewandt wird, die lose Fassung in `bau-ich.py`
dadurch wegfällt, ein Satz in jeder der drei Anführungsarten in einem
Rechner den Bau abbricht, und `pruefe-alles.py` nachzählt, welche
Rechner noch Sätze tragen — in beide Richtungen brechend, wie
Querprüfung 13.

---

### 81 · `mond-app.js` rechnet den Himmel in der Anzeige
Aufgefallen beim Erledigen von Aufgabe 55 am 2026-11-16. Die Sätze
sind heraus, die Rechnung ist drin: `moChartJD`, `moSolar` (der
Solar Return, eine Nullstellensuche über 367 Tage), `moTreffer`,
`moHaus` und `moElong` stehen in derselben Datei wie `document` und
`el()`. Der Mondordner hat deshalb kein `mond-rechner.js`, und
`mond-texte.js` heißt nicht `mond-daten.js` — beides weicht von
`REGELN.md` Abschnitt 5 ab.

Das ist nicht Ordnungsliebe. `PRODUKT.md` Abschnitt 7 sagt, warum:
Beim Umzug in Stufe 3 wandern Rechnen, Texte und Prüfungen
unverändert mit, und nur die Anzeige wird neu gebaut. Eine Rechnung,
die in der Anzeige steht, wandert nicht mit — sie wird abgeschrieben.
Vier Monate Arbeit an den Terminen hängen hier an einer Datei, die
`getElementById` aufruft.
**Fertig, wenn:** `mond-rechner.js` die Himmels- und Trefferrechnung
trägt und darin kein `document`, kein `el(` und kein `MT_`-Textschlüssel
vorkommt, `mond-app.js` nur noch holt und einsetzt, `bau-mond.py`
beides als dauerhafte Sperre prüft — ein `document` im Rechner und
eine Rechnung in der Anzeige brechen den Bau —, und der angezeigte
Text über alle fünf Stufen, beide Profilzustände und alle
aufklappbaren Terminzeilen derselbe ist wie vorher.

### 82 · `zahlen.html` zeigt auf Stufe 0 Rahu, Ketu und das Haus
Gefunden beim Erledigen von Aufgabe 56 am 2026-11-17. `bau-zahlen.py`
prüft, dass auf Stufe 0 und 1 kein Element mit der Klasse `ac-tech`
sichtbar ist — und das stimmt. Der Abschnitt „Zahl und Chart" steht
aber ohne `ac-tech` und ohne `data-ab` offen, und am gezeichneten
Ergebnis auf Stufe 0 sind sichtbar: **Rahu**, **Ketu**, **Uranus**,
**Neptun** und **„im 7. Haus"**. `REGELN.md` Abschnitt 2 lässt auf
Stufe 0 kein Haus zu, und Rahu und Ketu sind nach Abschnitt 2a
Mechanik und kein Name, unter dem jemand die Sache kennt: Die
Zuordnung verschlüsselt einen Rechenweg (welcher Mondknoten zu
welcher Ziffer gehört), den man kennen muss.

Dieselbe Fehlerklasse wie bei Aufgabe 40: Die Prüfung ist da, aber sie
prüft eine Klasse im Quelltext statt das Wort im gezeichneten
Ergebnis. `bau-bereiche.py` und `bau-heute.py` tun das seit dem
2026-10-15 richtig; `REGELN.md` Abschnitt 2 sagt, jede neue Seite
bekomme dieselbe Prüfung — `zahlen.html` hat sie nie bekommen.
Betroffen ist die Suchende, die keine Astrologie kennen will und auf
der ehrlichsten Seite der Plattform als erstes zwei Sanskritnamen
liest.

**Fertig, wenn:** auf Stufe 0 von `zahlen.html` keines der verbotenen
Wörter mehr sichtbar ist — gemessen am gerenderten Text und nicht an
den Daten —, die Wortliste an derselben Stelle steht wie für die
übrigen Seiten (nicht ein zweites Mal in `bau-zahlen.py`), und ein von
Hand auf Stufe 0 gestelltes Fachwort den Bau abbricht, gegen feste
Beispiele gehalten wie `_datum_ohne_jahr` in `bau-heute.py`.

### 84 · Die leere Bühne sagt nicht, was man damit macht

Gefunden am 2026-11-18 beim Erledigen von Aufgabe 57. Auf
`haeuser.html` steht bei jeder Bühne ohne Planeten „Bei dir eine
leise Bühne." Das ist eine Feststellung und kein Handgriff: Die
Besucherin weiß danach, dass dort nichts steht, und nicht, was sie
damit anfangen soll — obwohl der Körper der Seite die Antwort schon
kennt („Ist es leer, schau, wo sein Herrscher steht", Abschnitt
„Für Readings", erst ab Stufe 2 sichtbar). Sieben bis neun der
zwölf Bühnen sind bei den meisten Menschen leer, das ist also der
häufigste Satz der Seite und der einzige ohne Folge.

Dieselbe Prüffrage wie in `PRODUKT.md` Abschnitt 6: Könnte ein Mensch
nach dieser Karte besser sagen, was er tun kann? Heute nein.

**Fertig, wenn:** jede leere Bühne auf Stufe 0 einen Satz trägt, der
auf eine Handlung hinausläuft statt auf einen Zustand,
`pruefwerk.pruefe_handgriffe` ihn hält, und ein Satz ohne Folge den
Bau von `haeuser.html` abbricht — gegen feste Beispiele gehalten
(REGELN.md 6e).

### 90 · Die Klebe-Regel steht in zwei Fassungen an zwei Orten
Gefunden beim Erledigen von Aufgabe 59 am 2026-11-20. „Jede Form, die
sich mit dem eingesetzten Wort ändert, braucht ihre eigene Tabelle"
(`REGELN.md` 6f) wird inzwischen an zwei Stellen erzwungen, und zwar
mit zwei verschiedenen Mustern: `bau-zauber.py` sucht einen Artikel
**vor** einer Lücke und einen Buchstaben **dahinter**
(`der Tag des {herr}`, `{stamm}stunde`), `bau-geist.py` sucht ein
angeklebtes „dein"/„des"/„der" und ein angehängtes `'. Haus'` in der
Anzeige. Beide meinen dieselbe Fehlerklasse, keine der beiden findet,
was die andere findet, und die nächste Anzeige schreibt eine dritte
Fassung. Das ist genau der Fall, für den `REGELN.md` 5 den
gemeinsamen Ort vorsieht: Eine Regel in zwei Bauskripten ist nach der
ersten Verschärfung in einem von zwei veraltet.

**Fertig, wenn:** die Regel als eine Funktion in
`rituale/pruefwerk.py` steht, beide Fassungen darin aufgehen (ein
Artikel vor einer Lücke, eine Endung dahinter und eine von Hand
angeklebte Form in der Anzeige schlagen alle drei an), `bau-zauber.py`
und `bau-geist.py` nur noch diese Funktion aufrufen, und die festen
Beispiele beider Seiten beim Import laufen — in beide Richtungen, also
auch mit den Fällen, die durchgehen müssen (`REGELN.md` 6e).


### 99 · Dieselbe Zahl ohne Komma steht noch auf anderen Seiten
Gefunden beim Erledigen von Aufgabe 62 am 2026-11-24. Dort ging
`x.ab.toFixed(1)` an vier Stellen ohne Umweg in den Text, und auf
der Seite stand „4.2°" statt „4,2°" (`REGELN.md` Abschnitt 4). Die
Regel dagegen steht jetzt in `bau-begleitung.py` und gilt für eine
Datei.

Nachgezählt am 2026-11-24: In dreizehn weiteren Anzeigen steht
`toFixed`, und jede bringt ihre eigene Kommafunktion mit — `komma`
in `ereignis-rechner.js` und `tief-bauer.js`, `kommaZahl` hier,
eine namenlose in `dossier-app.js`, `geist-app.js`, `ich-app.js`
und `monat-app.js`. Das ist dieselbe Lage wie vor Aufgabe 94: eine
Regel in vierzehn Dateien ist nach der ersten Verschärfung in
dreizehn davon veraltet. Ein Teil der Aufrufe ist dabei richtig —
in `karte-app.js` und `mond-app.js` rechnet `toFixed` Punkte eines
SVG-Pfades aus, und dort gehört der Punkt hin. Die Regel muss also
zwischen *wird gezeichnet* und *wird gelesen* unterscheiden, sonst
greift sie zu weit (`REGELN.md` 6e).
Am 2026-11-26 ist genau das eingetreten, was diese Zeile vorausgesagt
hat, und zwar auf einer Seite, die in der Zählung von damals nicht
einmal vorkam: Auf `ophiuchus.html` trug **jede** Zahl einen Punkt —
„44.6 Tage", „-4.9° Breite", „für den Skorpion 6.7." Die Seite kannte
keine der dreizehn Kommafunktionen, also hatte sie keine.

Beim Erledigen von Aufgabe 64 sind deshalb drei der fünf Punkte
eingelöst:

* Die Stelle gibt es und sie steht in `kern/`: `AC_KOMMA` in
  `kern/fuellen.js`, neben `AC_FUELL`. Ein fehlender Wert und eine
  Division durch Null brechen dort ab, statt gedruckt zu werden.
* Die Regel unterscheidet *wird gezeichnet* von *wird gelesen*, und
  zwar auf dem einzigen Weg, der dafür trägt:
  `pruefwerk.dezimalpunkte` liest den **sichtbaren Text der
  gezeichneten Seite**. Was in ein Stilattribut geht — die
  Balkenbreite auf dieser Seite, die SVG-Pfade in `karte-app.js` und
  `mond-app.js` — sieht sie nie. Den deutschen Tausenderpunkt lässt
  sie an der Form durch: dahinter stehen genau drei Ziffern.
* `pruefe-alles.py` zählt nach. `bau-oph.py` ruft die Regel auf
  jeder Stufe und in jeder Lage.

Offen ist der Rest, und er ist größer als gedacht: Die Querprüfung hat
beim ersten Lauf **zwölf** Dateien gefunden, die sich die Umwandlung
selbst bauen — darunter `analyse/engine.js`, `bez/beziehung-app.js`,
`zahlen-app.js`, `zeit-app.js` und `mond-app.js`, die in der Zählung
vom 2026-11-24 nicht genannt waren. Welche es sind, steht in
`KOMMA_OFFEN` in `pruefe-alles.py`; die Liste bricht in beide
Richtungen und kann nur schrumpfen.

**Fertig, wenn:** `KOMMA_OFFEN` leer ist, keine Datei außer
`kern/fuellen.js` einen Punkt selbst zu einem Komma macht, jedes
`bau-*.py` einer rechnenden Seite `pruefe_dezimalpunkte` am
gezeichneten Ergebnis ruft, `pruefe-alles.py` nachzählt, welche
Bauten sie rufen — sodass ein Bau, der sie fallen lässt, auffällt —,
und eine Gradzahl mit Punkt in jeder dieser Seiten den Bau abbricht.

### 100 · Der Satz für „noch kein Profil" steht auf keiner Seite
Gefunden beim Erledigen von Aufgabe 62 am 2026-11-24. In
`begleit-app.js` gibt es einen Zweig für den Fall, dass noch kein
Profil angelegt ist: „Noch kein Profil angelegt. Hier legst du eins
an — ohne Geburtszeit und Geburtsort kann hier nichts gerechnet
werden." Er wird nie erreicht. `neu()` fragt zuerst `profil()`, und
ohne Profil steigt es dort aus, bevor `wenBauen()` überhaupt läuft;
auf der Seite steht dann `C_KOPF.keinProfil`, ein anderer Satz ohne
den Weg zum Profil. Zwei Sätze für denselben Fall, und der
ausführlichere ist toter Text.

Das ist nicht der Fall, sondern die Klasse: Ein Zweig, den kein
Durchgang der Rauchprobe betritt, kann jeden Unsinn enthalten und
bleibt grün. Die Rauchprobe hat den Fall ohne Profil, sie prüft dort
nur nicht, welcher der beiden Sätze kommt.
**Fertig, wenn:** es für „noch kein Profil" einen Satz gibt und
nicht zwei, der Weg zum Profil darin steht, die Rauchprobe ohne
Profil darauf abbricht, und `bau-begleitung.py` einen Zweig
anschlägt, dessen Text in keinem der beiden Durchgänge auf der Seite
landet.

---

*Gefunden am 2026-11-26 beim Erledigen von Aufgabe 64.*

### 104 · Der Wissensregler auf `ophiuchus.html` ändert nichts
Beim Abgleich des gezeichneten Ergebnisses über alle fünf Stufen
aufgefallen. Die Seite trägt die Stufenleiste oben, hört auf
`ac-niveau` und zeichnet bei jedem Wechsel neu — und ihr sichtbarer
Text ist auf Stufe 0 und auf Stufe 4 **Wort für Wort derselbe**. Der
einzige Unterschied ist die Beschreibung, die die Leiste über sich
selbst schreibt.

Das ist dieselbe Fehlerklasse wie die zwei Rungen namens
„Volltreffer" am 2026-11-25, eine Größe höher: ein Bedienelement, das
eine Wahl anbietet, die keinen Unterschied macht. Fünf Stufen, eine
Ausgabe.

Und es ist `REGELN.md` Abschnitt 2 von der anderen Seite her: Auf
Stufe 0 stehen auf dieser Seite Ekliptik, Präzession, Ayanamsa,
Siderisch und zehn Planetennamen. Die Seite *handelt* von der
Mechanik und darf sie benennen (Abschnitt 2a, `ereignisse-lesen.html`
macht es vor) — aber dann muss die Stufe auch etwas tun: auf Stufe 0
der Rechenweg in `ac-tech` und die Aussage in Alltagssprache davor.

Dahinter steckt eine Sachfrage und nicht nur eine Bauweise: Was
bleibt von dieser Seite auf Stufe 0 übrig? Die Antwort auf „bin ich in
Wahrheit Schlangenträger" lässt sich ohne ein einziges Fachwort geben,
und sie ist das, wovon jemand einen Screenshot macht (`PRODUKT.md` 2,
Punkt 3). Die drei geprüften Behauptungen oben auf der Seite sind
schon so geschrieben; die gerechnete Hälfte darunter ist es nicht.
**Fertig, wenn:** der sichtbare Text der Seite sich zwischen Stufe 0
und Stufe 4 wirklich unterscheidet, auf Stufe 0 kein Fachwort und
keine Gradangabe sichtbar ist, ab Stufe 2 die Mechanik in `ac-tech`
dazukommt, und `bau-oph.py` beides in seiner Rauchprobe festhält —
wie `bau-ereignis.py` es für `ereignisse-lesen.html` tut.

## Erledigt

* **2026-11-26** · `oph-app.js` kommt aus dem Satzgeschäft heraus
  (Aufgabe 64, aus 34 und 38) — die **letzte** Anzeige des Zuges, der
  am 2026-11-07 mit `bereich-app.js` begann. Die fünfundsechzig Sätze
  und Beschriftungen stehen jetzt in `oph-daten.js` als `OP_T`; die
  Anzeige setzt mit `AC_FUELL` ein und lässt „dein" von `B_BEUGE`
  bilden. Verriegelt ist das in `bau-oph.py`: beide Riegel aus
  `pruefwerk`, in allen drei Anführungsarten gegengeprobt, dazu
  `pruefe_fueller`, `pruefe_vorlagenluecken` und `ruft_ohne_stelle`.
  Die Seite hatte bis heute **keine Rauchprobe**; sie hat jetzt eine.

  Dabei sind drei Doppelungen zusammengefallen, die alle dasselbe
  zweimal sagten: die zwölf Zeichennamen (als `ZN` *und* in `Z13`,
  wo nur ein dreizehnter Name dazwischensteht), der kopierbare
  Absatz für Klientinnen (einmal im Körper, einmal als `ANTWORT` in
  der Anzeige) und die beiden Sternbilder, die der Spannensatz
  vergleicht (genannt im Satz, nachgeschlagen in der Anzeige). Die
  dreizehn Zeichen entstehen jetzt aus den zwölf, der Absatz steht
  einmal und wird zweimal verschieden ausgegeben — auf der Seite
  kursiv, in der Zwischenablage ohne Auszeichnung.

  Zwei Fehlerklassen kamen mit heraus, und beide waren **auf der
  Seite** zu sehen.

  Die erste: **Jede Zahl der Seite trug einen Punkt statt eines
  Kommas.**

  | auf der Seite | richtig |
  |---|---|
  | 44.6 Tage | 44,6 Tage |
  | -4.9° Breite | -4,9° Breite |
  | für den Skorpion 6.7. | für den Skorpion 6,7. |

  `REGELN.md` Abschnitt 4 sagt es seit Monaten, und am 2026-11-24
  stand derselbe Fehler auf der Begleitungsseite — dort an vier
  Stellen, hier an allen zwanzig. Der Grund ist nicht
  Unachtsamkeit: Die Umwandlung gab es zwölfmal, unter drei Namen,
  und diese Seite kannte keine davon. Sie steht jetzt als
  `AC_KOMMA` in `kern/fuellen.js`, neben `AC_FUELL` — beide machen
  aus einem Wert Text, beide brechen ab, wenn der Wert fehlt.

  Die Regel dagegen liest **nicht den Quelltext**, und das ist der
  Punkt: Dieselbe Seite rechnet mit `toFixed(1)` auch eine
  Balkenbreite in Prozent aus, und dort verlangt CSS den Punkt. Eine
  Regel über den Quelltext müsste die beiden Fälle am Aufruf
  unterscheiden und saß damit wieder an dem Schlüssel, den jemand im
  Kopf hat, statt an der Form, die im Text landet (`REGELN.md` 6f).
  `pruefwerk.dezimalpunkte` liest deshalb den sichtbaren Text der
  gezeichneten Seite, auf jeder Stufe und in jeder Lage. Den
  deutschen Tausenderpunkt lässt sie durch, und zwar an der Form:
  hinter einem Tausenderpunkt stehen genau drei Ziffern. Auf dieser
  Seite steht wirklich einer — „rund 25.800 Jahren".

  Die zweite: Die Anzeige vergab `nrm` und `gewaehlt` im **globalen
  Namensraum** — genau die zwei Namen, die `engine.js` dort schon
  führt. Die Seite lief, weil der Rumpf von `nrm` Zeichen für Zeichen
  derselbe war und `gewaehlt` auch in der Engine `null` sein sollte.
  Glück, keine Prüfung. Die Anzeige liegt jetzt in einer eigenen
  Hülle, und `bau-oph.py` zählt nach, welcher Name wirklich global
  wird — eine Datei in eigener Hülle gibt nur ihre `window.`-Namen
  heraus, sonst schlüge die Regel auf jeden Namen an, den eine Hülle
  gerade schützt.

  Dreimal ist dabei eine eigene Prüfung zu weit gegriffen, bevor sie
  saß, und jedes Mal auf dieselbe Weise: Sie zählte Zeichen, statt
  die Form zu prüfen (`REGELN.md` 6e). „Jeder Text ist länger als
  sechs Zeichen" schlug auf `ohne: '—'` an, „eine Vorlage mit Lücke
  ist länger als vierzehn" auf `'{tage} Tage'`, und „nichts ragt über
  den Rand" auf die Vergleichstabelle, die auf dem Telefon
  absichtlich seitwärts rollt. Gemeint war jedes Mal etwas
  Genaueres — eine leere Vorlage, eine Vorlage, die nichts als ihre
  Lücke ist, und ein Element, über dem **kein** rollender Kasten
  steht. Eine Prüfung, die bei richtiger Bauart meckert, wird
  abgeschaltet.

  Nachgemessen: Der sichtbare Text der Seite ist auf allen fünf
  Stufen, mit und ohne Profil und für beide Probecharts derselbe wie
  vorher — bis auf die Punkte, die Kommas geworden sind. Nebenbei
  wirft die Schaltfläche „Diesen Absatz kopieren" keinen Seitenfehler
  mehr: Die abgelehnte Zusage der Zwischenablage wird jetzt
  abgefangen.


* **2026-11-25** · `ereignis-app.js` kommt aus dem Satzgeschäft heraus
  (Aufgabe 63, aus 34 und 38). Die achtundzwanzig Sätze und
  Beschriftungen stehen jetzt in `ereignis-daten.js` als `EG_T`; die
  Anzeige setzt mit `AC_FUELL` ein und lässt „dein" von `B_BEUGE`
  bilden, das das Geschlecht am Wort liest. Verriegelt ist das in
  `bau-ereignis.py`: beide Riegel aus `pruefwerk`, in allen drei
  Anführungsarten gegengeprobt, dazu `pruefe_fueller`,
  `pruefe_vorlagenluecken` und `ruft_ohne_stelle`.

  Zwei Fehlerklassen kamen mit heraus.

  Die erste stand **auf der Seite**: Der Lautstärkeregler bot auf
  Stufe 0 sechs Rungen an, und zwei lasen „Volltreffer".

  | Rung | Wert | Beschriftung auf Stufe 0 |
  |---|---|---|
  | 1 | 0,2° | Volltreffer |
  | 2 | 0,5° | Volltreffer |

  Der **Wert** einer Rung ist der Orbis, die **Beschriftung** hängt an
  der Lautstärkeklasse — und 0,2° und 0,5° fallen in dieselbe. Wer die
  zweite wählte, bediente einen Regler ohne Unterschied, und ein
  Superlativ, der zweimal gilt, gilt keinmal. Das ist `REGELN.md` 6f
  an einem Bedienelement statt in einem Satz: Die Sperre saß am Wert,
  der Text hängt am Schlüssel daneben. Auf Stufe 0 gibt es jetzt eine
  Rung je Klasse — sichtbar ändert das sonst nichts, weil dort kein
  Grad dasteht. Die Regel dagegen heißt
  `pruefwerk.doppelte_beschriftung`, hat neun feste Beispiele und wird
  in der Rauchprobe auf jeder Stufe gegen jeden Regler der Seite
  gehalten. Elf ausgelieferte Seiten haben einen Regler; wie viele die
  Regel rufen, zählt `pruefe-alles.py` seit heute nach (Aufgabe 98).

  Die zweite war unsichtbar und hätte es nicht bleiben müssen: Die
  Tafel der zehn Kräfte in Alltagssprache stand zweimal von Hand da —
  als `mundart` in der Anzeige und als `P0` im Rechner, Wort für Wort
  gleich. Gedruckt hat die Seite beide Male dasselbe; gemerkt hätte es
  niemand, sobald eine der beiden sich ändert. Die Anzeige hat jetzt
  keine eigene mehr; die im Rechner bleibt, bis `satz()` nur noch
  Schlüssel liefert (Aufgabe 97).

  Nachgemessen am gezeichneten Text, auf allen Stufen und mit
  beantwortetem Quiz: Außer der verschwundenen Rung steht Zeile für
  Zeile dasselbe da wie vorher.

* **2026-11-24** · `begleit-app.js` kommt aus dem Satzgeschäft heraus
  (Aufgabe 62, aus 34 und 38). Die zwanzig Sätze und jede
  Beschriftung stehen jetzt in `begleit-daten.js` als `C_T`; die
  Anzeige rechnet und setzt mit `AC_FUELL` ein — ohne Hülle, die
  nichts tut (Aufgabe 96). Verriegelt ist das in
  `bau-begleitung.py`: beide Riegel aus `pruefwerk`, in allen drei
  Anführungsarten gegengeprobt, dazu `pruefe_fueller` und
  `pruefe_vorlagenluecken`. Gefüllt wird auf dieser Seite an zwei
  Stellen — die Fragen aus dem Bild setzt der Rechner ein —, also
  werden beide gefragt; nur die Anzeige zu fragen hieße, `{feld}`
  für ungefüllt zu halten, obwohl es gefüllt wird.

  Zwei Fehlerklassen kamen mit heraus, beide auf der Seite sichtbar:

  | gerechnet | auf der Seite | richtig wäre |
  |---|---|---|
  | 4,2 Grad | „4.2°" | 4,2° |
  | 10 Minuten | „10 Min", im Spickzettel wieder herausgeschnitten | 10 |

  Die Gradzahl: `kommaZahl` gab es auf dieser Seite vom ersten Tag an
  und wurde nur in der Mechanik der Stellungen benutzt. Daneben
  stand viermal `toFixed` und damit der Punkt. Die Sperre saß am
  Aufruf, den jemand im Kopf hatte, nicht an der Form, die im Text
  landet — dieselbe Klasse wie `REGELN.md` 6f. `bau-begleitung.py`
  bricht jetzt an jedem `toFixed` ab, dessen Ergebnis nicht durch
  `kommaZahl` geht, mit festen Beispielen darunter.

  Die Einheit: Die Daten trugen `'10 Min'`, und der Spickzettel
  schnitt mit `replace(' Min','')` das Wort wieder heraus, um die
  Zahl allein zu zeigen. Eine Anzeige, die in der Wortwahl der Daten
  herumschneidet, ist dieselbe Klasse wie die Beugung am Wert in
  `AN_T.waage` (Aufgabe 61): Was sich mit dem Wert ändert, gehört in
  die Vorlage. `ablauf` trägt jetzt Minuten als Zahl, `ablaufZeit`
  macht daraus „10 Min" und `spickZeit` dieselbe Zahl ohne Einheit.

* **2026-11-24** · Die Prüfung des Genitivs auf `zauber.html` prüft
  eine Form und kein Textstück. `main` war rot, ohne dass sich ein
  Commit geändert hatte:

  ```
  FEHLER: ohne Profil: „des Mond" steht auf der Seite
  FEHLER: ohne Profil: „der Mond" steht auf der Seite
  ```

  Auf der Seite stand „Heute ist Montag, der Tag des Mondes" — genau
  die Form aus der Tabelle — und daneben „Der Mond läuft gerade
  leer", ein richtiger deutscher Satz. Geprüft wurde aber, ob die
  Zeichenkette „des " plus Name *irgendwo* vorkommt: „des Mondes"
  enthält „des Mond", und „der Mond" ist ein Nominativ, den keine
  Vorlage zusammengeklebt hat. Die Regel ging seit dem 2026-11-19
  durch, weil der Tagesherrscher an keinem Bautag Mond hieß — genau
  der Fall aus `REGELN.md` 6e, zum zweiten Mal.

  Gemeint war: hinter einem Artikel steht der rohe Name, obwohl die
  Tabelle eine andere Form vorgibt. Die Regel steht jetzt als
  `pruefwerk.roh_hinter_artikel` an einer Stelle, liest den Namen als
  eigenes Wort und nur hinter dem Genitivartikel, in dem die Beugung
  wirklich sitzt; darunter stehen zehn feste Beispiele, unter ihnen
  der Fall vom 2026-11-24. Und die Entscheidung ist aus dem Browser
  heraus: Die Rauchprobe berichtet, was auf der Seite steht, die
  Regel sagt, was daran falsch ist.

* **2026-11-23** · `analyse-app.js` kommt aus dem Satzgeschäft heraus
  (Aufgabe 61, aus 34 und 38). Die neunundzwanzig Sätze und das eine
  von Hand geschriebene „dein" stehen jetzt in `analyse-texte.js`
  als `AN_T`; die Anzeige rechnet, gruppiert und setzt mit `anFuell`
  ein, das `AC_FUELL` aufruft. Verriegelt ist das in
  `bau-analyse.py`: beide Riegel aus `pruefwerk`, in allen drei
  Anführungsarten gegengeprobt, dazu `pruefe_fueller` und
  `pruefe_vorlagenluecken`.

  Dabei ist eine Fehlerklasse herausgefallen, die auf der Seite stand
  und nach der niemand gesucht hat. Die Waage unter dem Ergebnis
  beschriftete sich, indem sie ihr Hauptwort an die Zahl davor klebte:

  | gerechnet | auf der Seite | richtig wäre |
  |---|---|---|
  | 1 Nenner | „1 gemeinsame Nenner" | 1 gemeinsamer Nenner |
  | 4 Befunde | „4 trägt" | 4 Befunde tragen |
  | 1 Reibungspunkt | „1 Reibungspunkte" | 1 Reibungspunkt |

  Das ist dieselbe Klasse wie `REGELN.md` 6f, eine Ebene weiter:
  Dort hing der Satz am falschen Schlüssel, hier hängt die **Beugung
  am Wert**. Eine Form, die sich mit der eingesetzten Zahl ändert,
  braucht ihre eigene Vorlage. Einzahl und Mehrzahl stehen jetzt je
  Schlüssel in `AN_T.waage`, und die drei Themendateien liefern nur
  noch Schlüssel und Zahl.

  Die dauerhafte Prüfung dazu sitzt an der Form, nicht am Wort
  (`REGELN.md` 6e): `bau-analyse.py` bricht ab, sobald irgendwo eine
  Beschriftung zusammengesetzt wird — acht feste Beispiele laufen
  vorher —, verlangt zu jedem Schlüssel eine Einzahl ohne Lücke und
  eine Mehrzahl mit `{n}`, und hält die Regel in der Rauchprobe
  direkt gegen `anZahl` für 0, 1, 2, 3 und 11. Dazu findet die
  Rauchprobe jetzt jede offene Vorlagenlücke auf der gerenderten
  Seite, nicht nur die zwei Namen, nach denen sie bisher gesucht hat.

* **2026-11-22** · Eine Lücke wird an einer Stelle gefüllt
  (Aufgabe 94). Die Funktion, die `{so}` durch einen Wert ersetzt,
  stand in **neunzehn** Dateien einzeln — und in vier Fassungen, die
  sich bei genau einem Fall unterschieden: Was passiert, wenn der
  Wert fehlt?

  | Fassung | Dateien | aus `undefined` wurde |
  |---|---|---|
  | Notbehelf | 7 | `''` — das Wort verschwand |
  | ohne alles | 5 | `undefined` — es stand auf der Seite |
  | Lücke bleibt | 1 | `{liste}` — die Klammern blieben stehen |
  | Abbruch | 1 | ein Fehler — richtig, seit einem Tag |

  Gesucht waren sechs. Gefunden hat sie nicht das Suchen nach den
  Namen, sondern die Prüfung selbst: Sie fragt nicht, wie eine
  Funktion heißt, sondern nach der **Form**, in der sich ein Füller
  überhaupt bauen lässt — eine Lücke aus dem Schlüssel
  zusammengesetzt, oder ein Suchmuster mit Fanggruppe. Drei Dateien
  waren auf diese Weise dabei, nach denen niemand gesucht hätte,
  `kern/heute-app.js` darunter.

  Die Funktion steht jetzt in `kern/fuellen.js` als `AC_FUELL` und
  liegt auf achtzehn Seiten mit. Ein fehlender Wert bricht dort ab;
  ein absichtlich leerer (`''`) und eine Null gehen durch. Auf der
  Seite ändert sich nichts — kein Text, keine Gestaltung, alle 3.615
  Rechenprüfungen der Bereiche und jede Rauchprobe unverändert
  grün. Was sich ändert, ist, was beim nächsten Mal passiert, wenn
  ein Schlüssel nicht gefunden wird.

  Verriegelt ist das dreifach, weil jede der drei Sperren etwas
  anderes nicht sieht:

  * `pruefwerk.pruefe_fueller` in jedem `bau-*.py` — eine Anzeige,
    die sich wieder eine eigene baut, bringt ihren Bau zum Scheitern
    (nachgewiesen: `exit=1`).
  * eine Querprüfung in `pruefe-alles.py` — `AC_FUELL` steht genau
    einmal im Quelltext, und auch eine Datei, die noch kein
    `bau-*.py` verriegelt, baut sich keine eigene.
  * `pruefwerk.ruft_ohne_stelle` — wer `AC_FUELL` aufruft, hat es
    auch auf der Seite.

  Die dritte ist unterwegs entstanden, und zwar aus einem echten
  Fehlschlag: Die Rechenprüfung der Bereiche lud `tief-bauer.js`
  ohne `fuellen.js` und brach mit „AC_FUELL is not defined" ab. Dort
  hat der Bau es gefunden, weil diese Rechnung wirklich lief — eine
  Anzeige, deren Zweig heute nicht gerendert wird, wäre damit
  durchgekommen (`REGELN.md` 6e). Deshalb wird jetzt die Seite selbst
  gefragt und nicht der Weg dorthin.

  Was offen bleibt, steht als Aufgabe 95 (zwei Lücken in
  `kern/heute-daten.js`, die niemand füllt — und acht Bauten, die
  `pruefe_vorlagenluecken` nicht aufrufen) und 96 (die neunzehn
  einzeiligen Hüllen um `AC_FUELL`, die den Umzug nachlesbar
  gehalten haben).


* **2026-11-21** · `dossier-app.js` ist aus dem Satzgeschäft heraus
  (Aufgabe 60, aus 34 und 38) — 97 Zeichenketten und 4 mal „dein" von
  Hand. Die Vorlagen stehen jetzt in `DO_T` in `dossier-texte.js`, die
  Anzeige rechnet und setzt mit `doFuell` ein. Über zehn erfundene
  Profile und alle zehn Bezüge — 101 Ansichten — ist das gezeichnete
  Dossier Zeichen für Zeichen dasselbe wie vorher. Ein Umzug, keine
  Änderung an der Seite.

  Herausgekommen ist dabei eine Fehlerklasse, die keiner der
  Vorgänger hatte, und sie ist unterwegs zugeschlagen: Die Belege
  eines Kernthemas nennen den Winkel mit dem Namen, den `AC_RAUM`
  mitliefert („Sextil"). Nachgeschlagen wurde in der neuen
  Sprachtafel, und die kennt nur den Schlüssel („sextil"). Die
  Füllfunktion machte aus dem fehlenden Wert eine leere Stelle, und
  aus „Saturn Sextil Sonne" wurde „Saturn  Sonne" — ein Wort weg,
  nichts rot, keine Meldung. Dieselbe Klasse wie `REGELN.md` 6f, nur
  eine Ebene tiefer: Dort kannte eine Tabelle den Fall nicht, hier
  hat der Notbehelf das Nichtkennen zugedeckt.

  Die Antwort ist deshalb nicht der eine Nachschlag, sondern die
  Regel: **Eine Lücke ohne Wert bricht ab, statt leer zu werden.**
  Ein leerer Wert, den jemand absichtlich einsetzt, geht weiter
  durch — beides steht als festes Beispiel in der Rauchprobe, sonst
  wäre die Regel bei der nächsten Verschärfung eine halbe.

  Neu dauerhaft geprüft in `bau-dossier.py`: beide Riegel aus
  `pruefwerk` mit Gegenprobe in allen drei Anführungsarten, die
  Lückenprüfung, eine Regel gegen jede an einen Namen oder eine Zahl
  geklebte Form, und am gezeichneten Ergebnis je Bezug, dass keine
  geschweifte Klammer übrig bleibt. Zehn Sabotagen — ein Satz in
  jeder Anführungsart, ein „dein", eine geklebte Form, eine
  ungefüllte Lücke, ein geschluckter Wert — lassen den Bau jetzt
  scheitern; vorher ging jede davon durch.

* **2026-11-20** · `geist-app.js` ist aus dem Satzgeschäft heraus
  (Aufgabe 59, aus 34 und 38) — die größte der Anzeigen, 174
  Zeichenketten und 31 mal „dein" von Hand. Die Vorlagen stehen jetzt
  in `GT_T` in `geist-texte.js`, die Anzeige rechnet und setzt mit
  `gFuell` ein. Der gezeichnete Text ist über zehn erfundene Profile
  hinweg Zeichen für Zeichen derselbe wie vorher, auch das Markup
  beider Register — es war ein Umzug und keine Änderung an der Seite.

  Was dabei herauskam, war nicht ein Text, sondern eine Lücke in der
  gemeinsamen Beugung. `AUFGABEN.md` hatte es vorausgesagt: „hier
  zeigt sich, ob `B_BEUGE` für alle Fälle reicht." Es reichte nicht.

  * **„der Herrscher deines 12. Hauses"** ist ein Genitiv, und
    `B_DEIN` in `kern/bahn-daten.js` kannte drei Fälle. Darüber stand
    ausdrücklich, mehr brauche es nicht: ein Genitiv stehe in keiner
    dieser Formeln. Für die Formeln der Startseite stimmte das; diese
    Seite hat einen, und deshalb stand die vierte Form von Hand in
    einer Anzeige — genau die Bauart, die die Tabelle abschaffen
    sollte. Dieselbe Fehlerklasse wie `REGELN.md` 6f: Eine Tabelle
    deckt den Fall, den sie kennt, und welche Fälle es gibt,
    entscheidet nicht die erste Seite, die sie benutzt. Der Genitiv
    steht jetzt in `B_DEIN`, die Form des Hauptworts („Hauses") in
    `GT_T.haus.beugt` — alle drei Fälle der Seite („dein", „deinem",
    „deines") kommen aus der einen Stelle.
  * **`kz` bedeutete in `bauPraxis` etwas anderes als daneben.** Die
    Zahlenformatierung mit deutschem Komma heißt `kz`; in dieser
    Funktion war `kz` das Merkurzeichen. Beides im gleichen
    Geltungsbereich, und wer dort eine Zahl formatieren wollte, hätte
    ein Zeichenindex zurückbekommen. Heißt jetzt `merkZ`.

  Dazu heraus: `nameVon`, `esc`, `tagUhr` — nie benutzt. Und
  `kleine-punkte.js` liegt mit `bahn-daten.js` zusammen auf der Seite,
  deshalb liest die Namensprüfung jetzt auch diese Datei.

  **Neu dauerhaft geprüft** in `bau-geist.py`, gegen die Klasse und
  nicht gegen den Fall: die beiden Riegel aus `pruefwerk` mit
  Gegenprobe in allen drei Anführungsarten, die Lückenprüfung, und
  eine Regel, die keine Form mehr an eine Lücke heranlässt — kein
  „dein"/„des"/„der" vor einem Pluszeichen, kein `+'. Haus'` dahinter,
  mit sechs festen Beispielen in beide Richtungen (`REGELN.md` 6e).
  Dazu eine Rauchprobe im Browser, die am gezeichneten Ergebnis
  nachsieht: jeder der neun Blöcke ist gefüllt, nirgends steht eine
  geschweifte Klammer, und `B_BEUGE` bildet alle drei Fälle richtig.
  Die zwei Zweige, die nicht jedes Profil zeichnet — der Malefik im
  12. Haus und der Neumond im Zeichen des 12. Hauses — werden eigens
  gefüllt und gegen feste Beispiele gehalten, weil ein grüner Riegel
  bei ihnen sonst nur heißt, dass ihr Fall heute nicht vorkam
  (`REGELN.md` 6e, Nachsatz).

* **2026-11-19** · `zauber-app.js` ist aus dem Satzgeschäft heraus
  (Aufgabe 58, aus 34 und 38) — die vierzehnte von zweiundzwanzig
  Anzeigen, mit 97 Zeichenketten und 18 mal „dein" die zweitgrößte.
  Die Vorlagen stehen jetzt in `ZT_T` in `zauber-texte.js`, die
  Anzeige rechnet und setzt mit `zFuell` ein, und „dein" vor einer
  Hausnummer bildet `B_BEUGE`. Der gezeichnete Text der Seite ist
  Zeile für Zeile derselbe wie vorher, das Bild pixelgleich — bis auf
  zwei Stellen, die mehr als Umzug waren:

  * **„Heute ist Sonntag, der Tag des Sonne."** Die Genitivtabelle
    `GEN` lag seit dem ersten Tag der Seite daneben und wurde an einer
    von zwei Stellen benutzt; die andere klebte den Namen hinter
    „des". Sonntags, montags und freitags stand dort die falsche Form,
    an den übrigen vier Tagen die richtige — deshalb ist es so lange
    niemandem aufgefallen.
  * **„Es ist gerade Sonnestunde."** Die Anzeige hängte „stunde" an
    den Namen des Stundenherrschers. Für sechs der sieben geht das
    auf; die Sonne braucht ein Fugen-n. Das fertige Wort steht jetzt
    in `ZT_T.stunde`.

  Dazu ein dritter Fund, der kein Text war: `chartVon`, `datVon` und
  `gewaehlt` standen in `zauber-app.js` ein zweites Mal, Wort für Wort
  gleich wie in `engine.js` — eine zweite Himmelsrechnung, die
  `REGELN.md` 5 verbietet. Sie sind heraus; die Seite rechnet gegen
  die Engine.

  **Neu dauerhaft geprüft** in `bau-zauber.py`, gegen die Klasse und
  nicht gegen den Fall: Kein Artikel steht direkt vor einer Lücke
  (`der Tag des {herr}` bricht ab), kein Buchstabe direkt dahinter
  (`{stamm}stunde` bricht ab), und die Anzeige klebt keine
  Zeichenkette an einen Ausdruck (`st.herr+'stunde'` bricht ab) — das
  muss eigens dastehen, weil „stunde" ein Wort ohne Großbuchstaben
  und ohne Satzzeichen ist und am Satzriegel vorbeikommt. Zwölf feste
  Beispiele laufen, bevor die Prüfung die Seite ansieht (`REGELN.md`
  6e). Dazu die beiden Riegel aus `pruefwerk` mit Gegenprobe in allen
  drei Anführungsarten, die Lückenprüfung, die Namensprüfung und eine
  Rauchprobe im Browser, die die Seite mit und ohne Profil zeichnet
  und am Ergebnis nachsieht, dass der Genitiv aus der Tabelle kommt.

* **2026-11-18** · `haeuser-app.js` ist aus dem Satzgeschäft heraus
  (Aufgabe 57, aus 34 und 38) — die dreizehnte von zweiundzwanzig
  Anzeigen. Ihre vierzig Zeichenketten stehen jetzt als Vorlagen in
  `HZ_T` in `haeuser-daten.js`; die Anzeige rechnet und setzt mit
  `hzFuell` ein. Von Hand geschriebenes „dein" gab es hier keins.

  Zwei Stellen waren mehr als Umzug:

  * **Vier der vierzig waren gar kein Text**, sondern zwei
    Schriftnamen, eine Farbe und das Gerüst des Beispielkastens. Eine
    Datendatei kennt keine Stilvorlage, also sind Farben und Schriften
    des Rads nach `haeuser-stil.css` gewandert (die Anzeige setzt nur
    noch die Klassen `hz-feld`, `voll`, `an`) und das Gerüst in den
    Körper. Das Rad sieht aus wie vorher.
  * **Dieselbe Bühne stand zweimal verschieden auf der Seite.** Im
    Beispiel unter „Whole Sign oder Placidus" beschrieb die Anzeige
    das elfte Haus von Hand als „Gemeinschaft, Netzwerke,
    Zugehörigkeit" und das zehnte als „Beruf, Wirken, Sichtbarkeit".
    Zwölf Karten weiter oben heißen dieselben Bühnen
    „Freundschaft, Netzwerke, Zukunftspläne" und „Beruf, Ruf,
    Ziele". Wer beides liest, hält eins davon für falsch. Die
    Beschreibung kommt jetzt aus `HZ_HAUS`, auch die Zeichennamen und
    das Zählwort im Satz „Waage ist ab Schütze das elfte Zeichen"
    stehen als Daten daneben und werden gegen die Rechnung gehalten.

  **Neu dauerhaft geprüft** (`bau-haeuser.py`, Prüfung 5): Die Form
  „N. Haus: …" in Körper, Daten oder Anzeige muss das Stichwort aus
  `HZ_HAUS` tragen — eine zweite, von Hand geschriebene Beschreibung
  derselben Bühne lässt den Bau scheitern. Eine Lücke (`{stich}`) geht
  durch, ein Kommentar auch; acht feste Beispiele stehen darunter
  (REGELN.md 6e). Dazu die beiden Riegel aus `pruefwerk` samt
  Gegenprobe in allen drei Anführungsarten und
  `pruefe_vorlagenluecken`; die Rauchprobe sieht zusätzlich am
  gezeichneten Ergebnis nach, dass keine geschweifte Klammer
  dasteht und das Beispiel die Worte aus `HZ_HAUS` benutzt.

* **2026-11-17** · `zahlen-app.js` ist aus dem Satzgeschäft heraus
  (Aufgabe 56, aus 34 und 38) — die zwölfte von zweiundzwanzig
  Anzeigen und die größte: 194 Zeichenketten und 13 mal „dein".
  Sie stehen jetzt als Vorlagen in `Z_T` in `zahlen-texte.js`; die
  Anzeige rechnet, setzt mit `zFuell` ein und schreibt nichts mehr.
  Die acht Karten des Blattes (`Z_KARTEN`) waren ebenfalls Text in der
  Anzeige und liegen jetzt bei den Texten.

  Drei Stellen waren mehr als Umzug:

  * **„deine Jahr", „deine Geburtstag".** Die Legende des Rings, die
    Vorlesefassung der Segmente, der Kasten im Detail und die schmale
    Liste setzten alle „deine " vor den Namen der eigenen Zahl — und
    der wechselt das Geschlecht: *der* Geburtstag, *das* Jahr, *der*
    Ausdruck. Jetzt trägt `Z_LABEL` das Geschlecht, `B_BEUGE` aus
    `kern/bahn-daten.js` bildet die Form, und `bahn-daten.js` liegt
    mit auf der Seite. Dieselbe Entscheidung wie bei `mond-app.js` am
    2026-11-16.
  * **Die drei Meisterzahlen lasen eine fremde Variable.** Im Ring
    hing der Zusatz „deine Zahl" der Kreise in der Mitte an `hat` aus
    der Segmentschleife darüber — nach ihrem Durchlauf steht dort
    `9 === Lebenszahl`. Wer die Lebenszahl 9 hatte, bekam alle drei
    Meisterzahlen als eigene vorgelesen; wer die 11 hatte, seine
    eigene nicht. Genau `REGELN.md` 6f: Die Sperre saß an der
    Schleifenvariablen, der Satz hängt aber an der Zahl.
    Die dauerhafte Antwort ist keine Reparatur dieser Zeile, sondern
    eine Prüfung am gezeichneten Ring: Die goldene Marke, das
    Vorlesewort und die Legende sind drei Auskünfte über dieselbe
    Sache und werden gegeneinander gehalten — an vier erfundenen
    Profilen, je mit und ohne Namen, und eines davon hat eine
    Meisterzahl als Lebenszahl, sonst bleiben die Kreise in der Mitte
    ungeprüft. Die Vergleichsregel steht in `_ring_tadel` mit festen
    Beispielen (`REGELN.md` 6e), darunter dem Fehler von heute. Dass
    sie greift, ist mit wiederhergestelltem Fehler nachgewiesen: fünf
    Meldungen.
  * **Eine Schule hieß zweierlei.** Auf dem Knopf stand
    „Chäldäisch", dreimal im Körper „chäldäische Schule", in den
    Daten „Chaldäische Numerologie". `bau-zahlen.py` hält jetzt jedes
    Wort auf „-äisch" in Körper und Vorlagen gegen die Schreibweisen,
    die `zahlen-daten.js` kennt — „hebräisch" geht durch, weil es
    dort steht, eine erfundene Schreibung nicht.

  Mitgewandert, weil Teil derselben Sache: Die Anzeige trug ihre
  Farben und Schriftgrößen in `style`-Attributen mit sich; sie stehen
  jetzt in `zahlen-stil.css`. Die Farbe einer Zahl bleibt in der
  Vorlage — die kommt aus den Daten.

  Gelockert wurde eine Sperre in `rituale/pruefwerk.py`: Ein
  Auswahlausdruck wie `.z-zelle[data-z]` galt als Satz, weil die Regel
  zwischen zwei Auswahlzeichen ein Leerzeichen verlangte. Jetzt dürfen
  sie aneinanderhängen; dass ein deutscher Satz dadurch nicht
  durchkommt, halten zwei neue feste Beispiele fest.

  Der angezeigte Text ist über beide Tafeln, fünf Stufen und zwei
  Profile derselbe wie vorher — bis auf vier Zeilen: die zwei
  berichtigten Beugungen und die zwei berichtigten Schulnamen.

* **2026-11-16** · `mond-app.js` ist aus dem Satzgeschäft heraus
  (Aufgabe 55, aus 34 und 38; dazu Aufgabe 80) — die elfte von
  zweiundzwanzig Anzeigen.
  Die sechsundsiebzig Zeichenketten von `mond.html` stehen jetzt als
  Vorlagen in `MT_T` in `mond-texte.js`; die Anzeige rechnet, setzt mit
  `moFuell` ein und schreibt nichts mehr.

  Drei der acht „dein" von Hand sind **nicht** bloß umgezogen: Sie
  beugten ein Besitzwort an einen Punktnamen, dessen Geschlecht
  wechselt, und standen deshalb falsch auf der Seite — „dein Venus",
  „Dein Sonne". In dreiunddreißig von hundertvier aufklappbaren
  Erklärungen. Jetzt liegt `kern/bahn-daten.js` mit auf der Seite und
  `B_BEUGE` bildet die Form: „deine Venus". Dieselbe Entscheidung wie
  bei `beziehung-app.js` am 2026-11-13 — und der Grund, warum
  Aufgabe 38 keine Formsache war: Es sind genau die Kästen, von denen
  jemand einen Screenshot macht (`PRODUKT.md` 2, Punkt 3).

  Zwei Stellen waren außerdem mehr als Umzug:

  * Die zwölf Zeichennamen und die vier Artnamen standen ein zweites
    Mal in der Anzeige (`ZN`, `TYPNAME`). Beide Listen kommen jetzt
    aus den Daten, und `bau-mond.py` hält die Reihenfolge von
    `MT_ZEICHEN` gegen die zwölf Zeichen ab Widder sowie
    `MT_T.artName` gegen die Überschriften in `MT_TYP`. Ohne diese
    zwei Prüfungen wäre das Herausziehen ein Tausch gewesen: dieselbe
    Dopplung, eine Datei weiter. Dass sie greifen, ist mit vertauschten
    Namen nachgewiesen.
  * Die Schriftnamen (`DM Sans`, `JetBrains Mono`) setzte die Anzeige
    als Attribut an die Beschriftung im Phasenrad. Eine Datendatei
    kennt keine Stilvorlage, also sind sie nach `mond-stil.css`
    gewandert; die Anzeige setzt eine Klasse. Dieselbe Schrift, ein
    Wort anders im berechneten Stil.

  `'auf'` und `'gegenüber'` schrieb die Rechnung selbst in ihr
  Ergebnis — Wort und Schlüssel in einem, derselbe Fall wie
  `REGELN.md` 6f. `moTreffer` liefert jetzt den Winkelschlüssel, und
  das Wort kommt aus `B_WINKELWORT` in `bahn-daten.js`, wo es für alle
  Seiten steht.

  Gehalten wird das von `pruefwerk.pruefe_anzeige_satzfrei` und
  `pruefwerk.pruefe_anzeige_ohne_dein` in `bau-mond.py`, jeweils mit
  der Gegenprobe in allen drei Anführungsarten — ein grüner Riegel
  heißt sonst nur, dass heute nichts dastand (`REGELN.md` 6e,
  Nachsatz). Neu dazugekommen ist die Lückenprüfung: Sobald Sätze
  Vorlagen sind, kann `{bereich}` auf der Seite stehen bleiben. Sie
  stand in `bau-zeit.py` und `bau-karte.py` in zwei verschiedenen
  Fassungen; `mond` wäre die dritte geworden. Damit war Aufgabe 80
  fällig, und sie ist mit erledigt: Die Regel heißt jetzt
  `pruefwerk.pruefe_vorlagenluecken`, steht an einer Stelle, und alle
  drei Seiten holen sie von dort — nachgewiesen mit einer Lücke ohne
  Füller in jeder der drei Datendateien. Weil sie Schlüssel in einen Topf sammelt
  (die Falle aus Aufgabe 69), prüft die Rauchprobe zusätzlich **jede**
  der hundertvier aufklappbaren Zeilen auf eine geschweifte Klammer,
  nicht nur die erste, die zufällig oben steht.

  Nachgewiesen gleich geblieben: 256 abgenommene Zustände — fünf
  Wissensstufen mit und ohne Profil, alle acht Phasen, alle zwölf
  Aszendenten, alle vier Filter, hundertvier aufgeklappte
  Erklärungen, 96 Kombinationen im Nachschlagewerk und vier
  Geburtsdaten. 215 davon Zeichen für Zeichen identisch; die
  übrigen 41 sind die dreiunddreißig berichtigten Beugungen, der
  Schriftname im berechneten Stil und sieben Zustände, in denen der
  Mond zwischen den beiden Abnahmen weitergelaufen ist.

* **2026-11-15** · `karte-app.js` ist aus dem Satzgeschäft heraus
  (Aufgabe 54, aus 34 und 38) — die zehnte von zweiundzwanzig
  Anzeigen. Die zweiundvierzig Zeichenketten von `haeuser-karte.html`
  stehen jetzt als Vorlagen in `K_T` in `karte-daten.js`; die Anzeige
  rechnet, setzt mit `kFuell` ein und schreibt nichts mehr. Die fünf
  „dein" von Hand sind mit ihren Sätzen umgezogen: keines beugt ein
  Besitzwort an einen Punktnamen, dessen Geschlecht wechselt
  („deine Stellung", „Dein Chart"), deshalb bleibt es Prosa in der
  Datendatei und `bahn-daten.js` muss nicht mit auf die Seite —
  dieselbe Lage wie bei `zeit-app.js` und `monat-app.js`.

  Zwei Stellen waren dabei nicht bloß Umzug:

  * Die Achsenbeschriftung im Rad kam aus dem Schlüssel selbst
    (`[['AC',P.ASC],['MC',P.MC]]` — der Name im Code *war* das Wort
    auf dem Bild). Jetzt heißt der Schlüssel `ASC` wie überall sonst,
    und `K_T.radAchse` sagt, was dasteht. Das ist derselbe Fall wie
    REGELN.md 6f, eine Stufe früher: Solange ein Schlüssel zugleich
    ein Text ist, kann man das eine nicht ändern, ohne das andere zu
    treffen.
  * `' class="ist"'` und `'kd-bew leer'` sehen für den Satzriegel aus
    wie Sprache und sind keine. Statt die Regel aufzuweichen, ist das
    Markup mit den Vorlagen in die Datendatei gewandert — dort steht
    es ohnehin schon, weil `K_T` fertige Bausteine hält und nicht
    Satzfragmente.

  Neu verriegelt in `bau-karte.py`, über den beiden Regeln aus
  `pruefwerk` hinaus: **jede Lücke einer Vorlage wird auch gefüllt.**
  Eine, die kein Aufruf füllt, stand sonst als „{herrhaus}" auf der
  Seite — und die Rauchprobe hat davon nur gesehen, was zufällig
  gerade offen war (REGELN.md 6e). Geprüft wird jetzt beides: der
  Quelltext aller Vorlagen auf einmal, unabhängig von Profil und
  geöffnetem Haus, und das Ergebnis in allen zwölf Detailkästen, allen
  120 Matrixzellen und allen zwölf Vergleichen — eine Lücke, die ein
  *Wert* mitbringt, fällt nur dort auf. Gegengeprobt in allen drei
  Anführungsarten, für Satz und „dein".

  Der angezeigte Text ist über vier Profilzustände, fünf Wissensstufen,
  alle zwölf geöffneten Häuser, alle 120 Matrixzellen und sechzig
  Vergleiche Zeichen für Zeichen derselbe wie vorher.

* **2026-11-14** · `zeit-app.js` ist aus dem Satzgeschäft heraus
  (Aufgabe 53, aus 34 und 38) — die neunte von zweiundzwanzig Anzeigen
  und mit 114 Zeichenketten die größte bisher. Sie stehen jetzt als
  Vorlagen in `ZT_T` in `zeit-daten.js`; die Anzeige setzt nur noch
  Werte ein (`ztFuell`). Die sechs „dein" von Hand sind mit ihren
  Sätzen umgezogen: keines davon beugt ein Besitzwort an einen
  Punktnamen, dessen Geschlecht wechselt, deshalb bleibt es Prosa in
  der Datendatei und `bahn-daten.js` muss nicht mit auf die Seite —
  dieselbe Lage wie bei `monat-app.js`.

  Drei Sachen sind dabei aufgebrochen und mitgeändert worden, weil sie
  Teil derselben Sache waren:

  * Die Beugung der Dauer hing an einer Kette von vier Ersetzungen
    (`ztDauer(…).replace(/n$/,'')…`), die aus „in drei Jahren" ein
    „noch drei Jahre" schnitt. Zwei der vier Glieder waren wirkungslos
    — `.replace(/Jahre$/,'Jahre')` ersetzt etwas durch sich selbst.
    Jetzt stehen beide Fälle als eigene Vorlagen in `ZT_T.dauer`, und
    `ztDauer(jahre, akk)` wählt.
  * Ein Stück Attributkette (`'" aria-expanded="false" aria-controls="'`)
    sah für den Riegel aus wie Sprache und war keine. Verschieben
    ließ sie sich nicht — eine Datendatei kennt kein Markup. Statt die
    Regel aufzuweichen, baut `ztTag(name, attr, innen)` das Element
    jetzt aus Namen und Attributen, statt es zusammenzukleben; das
    Auszeichnen und das Entschärfen sitzen damit an einer Stelle.
  * Neun Farben standen in der Anzeige verstreut, vier davon zweimal
    dasselbe Grau, ohne dass irgendwo stand, dass es dasselbe sein
    soll. Sie heißen jetzt in `ZT_FARBE` (`balken`, `balkenHell`,
    `achse`, `merk`).

  Gehalten wird das von `bau-zeit.py`: beide Regeln aus `pruefwerk`,
  und dazu die Gegenprobe in allen drei Anführungsarten — ein Riegel,
  der heute nichts findet, hat noch nichts bewiesen (`REGELN.md`
  Abschnitt 6e). Neu dazu kommt eine Prüfung, die es vorher auf keiner
  Seite gab: **jede Lücke einer Vorlage muss auch gefüllt werden.** Mit
  Vorlagen entsteht eine Fehlerklasse, die es vorher nicht gab — eine
  Lücke, die kein Aufruf füllt, erscheint als `{bis}` auf der Seite,
  und zwar nur an den Tagen, an denen diese Vorlage überhaupt vorkommt.
  Die Prüfung vergleicht die Lücken in `zeit-daten.js` gegen die
  Namen, die `zeit-app.js` einsetzt, und ist damit vom Himmel des Tages
  unabhängig.

  Gegengeprobt wurde der Umzug an der Seite selbst: der angezeigte Text
  ist über drei Profile, drei Wissensstufen, das aufgeklappte Kapitel
  und den Bericht zum Mitnehmen Zeichen für Zeichen derselbe wie vorher.
  Ein Umzug, der die Seite ändert, ist kein Umzug.

* **2026-11-13** · `beziehung-app.js` ist aus dem Satzgeschäft heraus
  (Aufgabe 52, aus 34 und 38) — die achte von zweiundzwanzig Anzeigen
  und die größte bisher: dreiundachtzig Zeichenketten und vierzehnmal
  „dein" von Hand. Sie stehen jetzt als Vorlagen in `BZ_T` in
  `beziehung-daten.js`; die Anzeige setzt nur noch Werte ein
  (`BZ_FUELL`). Die beiden Grammatikregeln, die die Anzeige selbst
  mitbrachte, sind weg: `PGENUS` (eine zweite Geschlechtertabelle für
  die Planeten) und `ohneDein` (ein Suchmuster, das das Besitzwort
  hinterher wieder abschnitt). An ihrer Stelle steht `BZ_PUNKT` —
  Hauptwort und Geschlecht je Punkt —, und `B_BEUGE` aus
  `kern/bahn-daten.js` bildet daraus „dein Gefühl" und „deine
  Zuneigung". Dafür liegt `bahn-daten.js` seit heute mit auf der Seite,
  und weil damit zwei Dateien mehr denselben Namensraum teilen, prüft
  `bau-bez.py` jetzt auch auf Namenskollisionen; die drei Funktionen
  der Anzeige, die `engine.js` verdeckten (`chartVon`, `haus`, `nrm`),
  heißen jetzt `bzChart`, `bzHaus` und `bzNrm`.

  Dass `BZ_PUNKT` dasselbe Wort nennt wie `niveau/wortwahl.js`, ist
  keine Absicht, sondern geprüft: Der Bau hält jede der zehn Zeilen
  gegen `PLANET[k].kurz(0)` und `kurz(1)` und bricht ab, sobald sich
  eine der beiden Dateien bewegt. Eine Kopie, die driften kann, wäre
  hier der Fehler gewesen; eine, die nicht driften kann, ist eine
  Angabe.

  Zwei Funde fielen beim Umzug heraus, und beide sind mit einer
  dauerhaften Prüfung beantwortet:

  **„Jonas: Dein Jupiter berührt gerade dein Saturn."** Die Zeile
  nannte einen der beiden Menschen und sprach danach die Leserin an —
  „dein" galt nicht ihr, sondern Jonas. Der Riegel aus `pruefwerk`
  findet das nicht, weil die Vorlage in der Datendatei steht und dort
  stehen darf. Die Zeile heißt jetzt „Jupiter berührt gerade Jonas'
  Struktur", und `bau-bez.py` lässt keine Vorlage mehr durch, die einen
  Namen als Besitz vor einen Punkt setzt und gleichzeitig „dein" sagt.
  Geprüft wird die Form und nicht eine Liste von Vorlagennamen, die
  veraltet: erkannt wird sie an ihren Platzhaltern.

  **Ein `toLowerCase` auf deutschem Text**, mitten in der Anzeige —
  verboten seit `REGELN.md` Abschnitt 4 und in neun Bauskripten
  geprüft, nur in diesem nicht (Aufgabe 19). Er machte aus „Auf
  Augenhöhe und ohne Konvention" ein kleines „auf". Mit dem Satz ist er
  weggefallen, und die Prüfung steht jetzt auch hier.

  Dazu eine Prüfung, die beim Umzug ihren eigenen Fehler gezeigt hat:
  Jeder Platzhalter einer Vorlage muss an *dieser* Vorlage gefüllt
  werden. Die erste Fassung sammelte alle Schlüssel aller Einsetzungen
  in einen Topf — und ließ „{wer}" durch, weil ein anderer Abschnitt
  ein `wer` einsetzt. Auf der Seite stand daraufhin „{wer}: Neptun
  berührt gerade Struktur". Genau der Fall aus `REGELN.md` 6e: geprüft
  war ein Wort, das meistens dabeisteht, und nicht die Form. Die zweite
  Fassung liest die Klammer, nicht ein Suchmuster, und bricht in beide
  Richtungen — fehlender Wert wie überschüssiger. Aufgabe 69 kann sie
  übernehmen.

  Nachgewiesen an der gebauten Seite: der volle Lauf grün, 86.401
  Bytes, und die Rauchprobe gegen die Fassung von gestern auf allen
  fünf Stufen, mit einem Profil ohne Geburtszeit und mit der Rolle
  „Tier" — Zeichen für Zeichen gleich bis auf die drei Stellen, die
  sich ändern sollten. Offen bleiben vierzehn Anzeigen, 1085 Sätze und
  116 mal „dein", und die neue Aufgabe 74: auf Stufe 0 steht in „Was
  gerade läuft" ein Planetenname ohne Erklärung.

* **2026-11-12** · `monat-app.js` ist aus dem Satzgeschäft heraus
  (Aufgabe 51, aus 34 und 38) — die siebte von zweiundzwanzig
  Anzeigen. Zu verschieben war nichts: Die beiden Zeichenketten, die
  die Querprüfung gezählt hat, waren `'mb-roh an'` — zwei Klassen an
  einem Textfeld, damit der Rohtext des Briefs zum Kopieren
  aufklappt. Keine, die in eine Datendatei gehört; eine Datendatei
  kennt keine Stilvorlage. Also musste die Regel lernen, wie eine
  Klassenliste aussieht, so wie bei Aufgabe 49 der Auswahlausdruck
  und bei Aufgabe 50 die Medienabfrage. Die dritte dieser Art, und
  sie ist nach demselben Muster aufgezählt: jeder Teil entweder mit
  Bindestrich — so benennt dieses Projekt seine Klassen — oder eine
  der vier bloßen Zustandsklassen, die es wirklich gibt. Daran kommt
  kein deutscher Satz vorbei; „alles-oder-nichts denken" hat einen
  Bindestrich, aber „denken" ist weder das eine noch das andere, und
  elf feste Beispiele halten das fest. `zeit-app.js` ist davon von
  allein um einen Satz gesunken (`'zt-bt zt-gly'`), ohne dass sie
  jemand angefasst hat.
  Der eigentliche Fund steckte daneben: `bau-monat.py` trug seit dem
  Umzug der Seite **seine eigene Fassung** der Satzregel — drei
  Wörter ab drei Buchstaben, und nur in einfachen Anführungszeichen.
  Sie war in zwei Richtungen schwächer als die gemeinsame: „mb-roh
  an" kam durch, und jeder Satz in doppelten oder schrägen
  Anführungszeichen auch. Genau davor warnt `REGELN.md` Abschnitt 5.
  Sie ist weg; die Seite hält jetzt beide Riegel aus
  `rituale/pruefwerk.py`, und eine Gegenprobe setzt in allen drei
  Anführungsarten probehalber einen Satz und ein „dein" ein und
  bricht ab, wenn ein Riegel schweigt. Nachgewiesen am gebauten
  Brief: 1904 Prüfungen, Rauchprobe grün, die Seite Zeichen für
  Zeichen wie vorher. Offen bleiben fünfzehn Anzeigen, 1168 Sätze
  und 130 mal „dein" — und die neue Aufgabe 73, weil vier der
  Bauskripte ihren Riegel ohne Gegenprobe führen.

* **2026-11-11** · `ich-app.js` ist aus dem Satzgeschäft heraus
  (Aufgabe 50, aus 34 und 38) — und die Querprüfung hält jetzt beide
  Riegel statt einem. In der Anzeige hinter der Tür „Dein Bild"
  standen vierzig Zeichenketten und zweimal „dein" von Hand: die
  Zeile, die diesen Menschen vorstellt, die Brücke zu „Jetzt", die
  Beschriftung des Punktfelds, die Mechanik zu jedem Befund, die
  zwölf Häuser mit allem, was aufgeklappt darunter steht, und der
  Zustand ohne Profil. Alle sind Vorlagen in `ich-daten.js`; die
  Anzeige setzt nur noch Werte ein. Nachgewiesen ist, dass sich auf
  der Seite nichts geändert hat: drei erfundene Profile, alles
  aufgeklappt, der gezeichnete Text vorher und nachher Zeichen für
  Zeichen gleich.
  Zwei Zeichenketten ließen sich nicht verschieben, und sie zeigen
  zwei verschiedene Antworten auf dieselbe Frage.
  `(prefers-reduced-motion: reduce)` fragt den Browser, ob dieser
  Mensch Bewegung abgestellt hat — `matchMedia` verlangt genau diese
  Zeichenkette, und eine Datendatei kennt keinen Browser. Hier musste
  die Regel lernen, wie eine Medienabfrage aussieht, so wie bei
  Aufgabe 49 der Auswahlausdruck: jede Bedingung geklammert, alles
  klein, und das Merkmal vor dem Doppelpunkt aus einem aufgezählten
  Satz. Dass die Merkmale einzeln dastehen und nicht als Muster, ist
  der Punkt — „(liebe: beruf)" hat dieselbe Form und ist Sprache,
  und die festen Beispiele halten das fest. Es betrifft nicht nur
  diese Seite: `karte-app.js` und `haeuser-app.js` tragen dieselbe
  Abfrage und sind beim ersten Lauf danach von allein um drei Zeilen
  gesunken, ohne dass sie jemand angefasst hat — die Querprüfung hat
  das gemeldet, weil sie in beide Richtungen bricht. Sie kommen damit
  später nicht daran hängen.
  `" r="3.1" class="` dagegen war ein halb offenes Attribut mitten in
  einer Zeichenkette — ein Wort und ein Dezimalpunkt, und fertig ist
  der Satz. Dort hat sich die Anzeige verbogen und nicht die Regel:
  die drei Maße des Punktfelds stehen jetzt als Zahlen oben, und
  jedes Stück Auszeichnung darin ist wieder ganz. Eine Regel, die
  Attributstücke durchlässt, wäre ein Loch; eine Zahl mit einem Namen
  ist ohnehin besser zu lesen.
  Dabei aufgefallen und mitgenommen: `bereich-app.js` stand seit dem
  2026-11-07 als fertig in `pruefe-alles.py`, hatte aber nur den
  Satzriegel. Der „dein"-Riegel fehlte, und die Querprüfung hat es
  nicht gemerkt, weil sie nur nach dem einen Aufruf suchte — sie war
  selbst die halbe Sperre, vor der `REGELN.md` 6f warnt. „Fertig"
  heißt zwei Zusagen; jetzt verlangt sie beide, und der fehlende
  Aufruf ist nachgetragen. Dazu hatte die „dein"-Regel kein festes
  Beispiel in schräger Anführung — mit einem Anführungszeichen wäre
  sie abstellbar gewesen. Sechs der zweiundzwanzig Anzeigen sind
  durch und verriegelt.

* **2026-11-10** · `wahl-app.js` ist aus dem Satzgeschäft heraus
  (Aufgabe 49, aus 34 und 38) — und die Prüfung, die sie festhielt,
  hat gelernt, was ein Auswahlausdruck ist. In der Bereichsleiste
  stand kein Satz mehr, nur noch `'#berwahl, .bw-leiste'`: eine
  Anweisung an den Browser, die sich in keine Datendatei verschieben
  lässt. Gezählt wurde sie trotzdem, weil die Regel in
  `rituale/pruefwerk.py` eine technische Zeichenkette an „kein
  Leerzeichen, kein Großbuchstabe, kein Umlaut" erkannte — und eine
  *Liste* von Auswahlausdrücken trägt Komma und Leerzeichen. Sie
  erkennt jetzt diese Form: zwei oder mehr durch Komma getrennte
  Teile, jeder mit `#`, `.` oder `[` davor. Daran kommt kein
  deutscher Satz vorbei, und die festen Beispiele halten das fest —
  „Liebe, Beruf" und „#berwahl, Beruf" schlagen weiter an, eine
  Farbe wie `#FCF7EF` auch.
  Dafür hält die Leiste nun den strengen Riegel: die lose Fassung in
  `bau-bereiche.py` las nur die einfache Anführung und schlug erst ab
  drei Wörtern an — ein zweiwortiger Satz ging durch, ein Satz in
  doppelter Anführung auch. An ihrer Stelle stehen
  `pruefwerk.pruefe_anzeige_satzfrei` und
  `pruefwerk.pruefe_anzeige_ohne_dein`, nachgewiesen an vier
  Gegenproben: ein Satz in jeder der drei Anführungsarten und ein
  „dein" von Hand brechen den Bau. Damit sind fünf der
  zweiundzwanzig Anzeigen durch und verriegelt.

* **2026-11-10** · Zwei Karten der Terminliste trugen wortgleich
  denselben Satz. `main` war an diesem Morgen rot, ohne dass sich ein
  Commit geändert hatte: Merkur und Venus drehten in derselben Woche
  wieder vorwärts, in zwei verschiedenen Bereichen. Die
  Überschriften waren verschieden („Merkur läuft wieder direkt —
  Selbstwert" und „Venus läuft wieder direkt — Gesundheit"), der
  Satz darunter war derselbe — er hing am Schlüssel „dreht vor- oder
  rückwärts", die Überschrift am Bereich. Das ist `REGELN.md` 6f,
  eine Zeile tiefer: jeder Schlüssel, der in einem gebauten Text
  landet, braucht seine eigene Sperre.
  Die Antwort ist keine Sperre, sondern der Bereich im Satz: Die
  vier Sätze zu Rückläufigkeit und Lunation in `kern/heute-daten.js`
  nennen jetzt den Bereich, um den es geht. Eine Karte, die
  weitergeschickt wird, muss allein stehen können (`PRODUKT.md`
  Abschnitt 2, Punkt 3) — vorher stand „in diesem Bereich" ohne den
  Bereich.
  Dauerhaft gehalten wird es von einer Prüfung, die *alle* Volltexte
  der Terminliste zählt und nicht nur den des Aufmachers: die alte
  Fassung hat die Dopplung an diesem Tag nur gefunden, weil Merkur
  zufällig oben stand. Sie steht in einer eigenen Funktion mit acht
  festen Beispielen darunter (`REGELN.md` 6e) und misst am
  gezeichneten Ergebnis. Dazu sieht die Rauchprobe eine ungefüllte
  Lücke wie „{bereich}" jetzt als denselben Fehler wie „undefined".

* **2026-11-09** · `heute-app.js` ist aus dem Satzgeschäft heraus
  (Aufgabe 48, aus 34 und 38). Die Anzeige der Tür „Jetzt" — die Seite,
  die ein Mensch am häufigsten vor sich hat — trug einhundertsechzig
  Zeichenketten und achtmal ein von Hand geschriebenes „dein". Sie
  stehen jetzt in `kern/heute-daten.js`, zusammen mit den Listen, die
  vorher im Code standen: die zwölf Zeichen, die zwölf Häuser, der
  zweite Fall der Planeten, Monate, Wochentage und die Aspektnamen. Was
  in die Abschnitte der Themenseite gehörte, ist dort gelandet, wo der
  Abschnitt schon seine Texte hat (`themen-daten.js`, `bahn-daten.js`),
  und nicht in einer zweiten Liste daneben.
  Dabei ist ein Fehler aufgefallen, den keine Prüfung gesehen hat: Die
  Mechanikzeile unter „Schlaf und Bewegung" setzte „dein" selbst vor den
  Punktnamen und schrieb damit „dein Venus" und „dein Sonne". Die Form
  bildet jetzt `B_BEUGE` aus `bahn-daten.js` — eine Stelle, die das
  Geschlecht des Punktes kennt. Genau diese Fehlerklasse ist der Grund
  für Aufgabe 38.
  Dauerhaft wird das von zwei Riegeln in `bau-heute.py` gehalten:
  `pruefwerk.pruefe_anzeige_satzfrei` und
  `pruefwerk.pruefe_anzeige_ohne_dein`. Nachgewiesen an vier
  Gegenproben — ein Satz in jeder der drei Anführungsarten und ein
  „dein" von Hand brechen den Bau.
  Dazu eine dritte Prüfung, weil der Umzug eine bestehende leerlaufen
  ließ: „Verweis ins Leere" suchte `href="…"` in Körper und Anzeige, und
  die vier Seitennamen waren gerade in die Datendatei gewandert. Sie
  prüft jetzt die gemeinte Form — jeden Seitennamen, wo immer er steht,
  mit festen Beispielen darunter (`REGELN.md` 6e) — und zählt nach, dass
  sie überhaupt etwas findet. Dass dieselbe lose Fassung noch in neun
  anderen Ordnern steht, ist Aufgabe 68.
  Auf der Seite sieht man davon nichts: Der Text ist Wort für Wort
  derselbe, nachgewiesen durch einen Vergleich des gezeichneten
  Seitentexts vor und nach dem Umzug. Offen sind jetzt 1215 Sätze und
  132 mal „dein" in 18 Anzeigen; `heute-app.js` steht in Querprüfung 13
  unter `FERTIG`.

* **2026-11-07** · Die Aufgaben 34 und 38 sind in Tageswerke zerlegt
  (Aufgabe 43). Beide verlangten, dass **jede** der zweiundzwanzig
  Anzeigen eine Prüfung besteht — zusammen über 1300 Zeichenketten,
  kein Tageswerk. So wie sie dastanden, wurden sie jeden Morgen
  übersprungen, und das ist die schlechteste Art, eine Aufgabe nicht
  zu machen.
  Die Regel stand vorher zweimal: streng in `bau-bereiche.py` für
  `bereich-app.js`, lose daneben für `wahl-app.js` und für
  `offline-app.js`, die erst ab zwölf Zeichen hinsah — und für die
  neunzehn übrigen Anzeigen gar nicht. Jetzt steht sie einmal, in
  `rituale/pruefwerk.py`: `pruefe_anzeige_satzfrei` liest alle drei
  Anführungsarten (das Ausweichen auf `"` und Backtick braucht
  deshalb keine eigene Prüfung mehr), `pruefe_anzeige_ohne_dein`
  findet jedes von Hand geschriebene „dein". Beide gegen feste
  Beispiele gehalten (`REGELN.md` 6e), die beim Import laufen —
  darunter die Ausnahme für die Browseranweisung `use strict`, die
  kein Satz ist.
  Der Fortschritt steht nicht in dieser Datei, sondern in
  `pruefe-alles.py` als Querprüfung 13, weil eine Liste in einem
  Dokument driftet (`REGELN.md` 6c). Sie zählt bei jedem Lauf nach
  und bricht in fünf Richtungen: eine Anzeige hat Text dazubekommen,
  eine Anzeige ist weiter als ihr Eintrag, eine `*-app.js` steht
  nicht in der Liste, eine eingetragene Anzeige gibt es nicht mehr,
  und eine als fertig geführte Anzeige hat keinen Riegel in ihrem
  `bau-*.py`. Die letzte Richtung ist die wichtigste: ohne sie wäre
  „fertig" eine Behauptung.
  Auf der Seite sieht man davon nichts — dafür steht am Ende jedes
  Prüflaufs, wie weit es ist: heute 3 von 22 Anzeigen ohne eigenen
  Satz, 1375 Sätze und 140 mal „dein" offen. `start-app.js` und
  `offline-app.js` haben ihren Riegel heute bekommen; sie erfüllten
  beide Regeln schon.

* **2026-11-06** · Derselbe Absatz steht nur noch in einem Bereich
  (Aufgabe 39). Unter „1 · Was ist los" stand bei einem Probebild
  derselbe Absatz in bis zu vier Bereichen wörtlich gleich. Wer die
  Seite durchblättert, liest viermal dasselbe und hält es für vier
  Befunde — und ein Screenshot davon belegt nur, dass die Seite
  nichts Eigenes über diesen Bereich zu sagen hat (`PRODUKT.md`
  Abschnitt 2, Punkt 3).
  Die Ursache war die Fehlerklasse aus `REGELN.md` 6f: Die Sperre in
  `bereich-rechner.js` saß je Bereich, der Absatz steht aber auf der
  Seite. Und sie hätte auch je Vorgang nicht gereicht — der Absatz
  hängt am Wanderer, zwei verschiedene Vorgänge desselben Wanderers
  tragen denselben Text. Jetzt sitzt die Sperre auf dem Wanderer, an
  einer Stelle (`absatzSchluessel`), und zwar eine Ebene höher:
  `seitenweit()` lässt den Absatz dort offen, wo er am stärksten
  zieht. Der stärkste Vorgang eines Bereichs bleibt immer offen,
  damit kein Bereich leer dasteht; sein Zeitfenster behalten auch die
  übrigen unter „Was sonst noch läuft".
  Dazu die Auskunft, die vorher fehlte: Ein offener Absatz nennt die
  anderen Bereiche, in die derselbe Vorgang zieht. Das ist zugleich
  der Grund, warum zwei offene Absätze desselben Vorgangs nie
  wortgleich sind — jede Liste lässt den eigenen Bereich weg.
  Geprüft an drei Stellen: die Regel `_absatz_doppelt` in
  `bau-bereiche.py` mit neun festen Beispielen (`REGELN.md` 6e), das
  gezeichnete Ergebnis von drei verschiedenen Geburtsbildern in der
  Rauchprobe, und `seitenweit()` selbst in `_test-bereich.js` gegen
  von Hand gebaute Bereiche. Alle drei schlagen an, wenn man die
  Zuteilung, den Aufruf oder den Satz entfernt — ausprobiert, nicht
  vermutet.

* **2026-11-05** · Ein vollständiger Lauf lässt die vier Symbole in Ruhe
  (Aufgabe 35). Jeder Lauf hat den Arbeitsbaum an diesen vier Dateien
  schmutzig gemacht, obwohl sie mit der Aufgabe des Tages nichts zu tun
  hatten — wer das nicht wusste, nahm sie blind mit oder warf sie blind
  weg.
  Der erste Versuch war falsch und ist auf GitHub rot geworden: Ich habe
  die hier gebauten Bytes eingecheckt, in der Annahme, die Dateien im
  Repo seien veraltet. Der Bauserver hat dann genau die alten Bytes
  erzeugt und die neuen abgelehnt. Die Ursache ist nicht das Bild,
  sondern der Packer — `zlib.compress` liefert je nach Fassung andere
  Bytes bei bitgleichen Bildpunkten, hier zlib-ng, dort das gewöhnliche
  zlib. Die Dateien im Repo waren immer richtig.
  `bau-app.py` überschreibt ein ausgeliefertes Symbol jetzt nicht mehr,
  sondern vergleicht Kopf und Bildpunkte (`png_pixel`, beide Seiten durch
  dieselbe Funktion). Damit ist die geprüfte Form die gemeinte — das
  Bild, nicht der Packer, `REGELN.md` 6e — und der Lauf lässt die
  Dateien in jeder Umgebung in Ruhe. `--symbole-neu` bleibt der Weg für
  eine absichtliche Gestaltungsänderung.
  Die Probe dagegen, in beide Richtungen: dieselben Bildpunkte mit
  anderer Packstufe geschrieben (5.821 statt 3.967 Bytes) gehen durch;
  ein einziger geänderter Bildpunkt bricht den Bau ab. Die erste Hälfte
  ist der Fehler, den die Bytefassung gemacht hat.

* **2026-11-05** · Ein Handgriff verspricht nichts mehr — und die Regel
  dafür steht an einer Stelle (Aufgabe 33). Unter „Was du tun kannst"
  stand in sieben von zehn Bereichen und im Kurzblick auf „Jetzt" ein
  Satz, der eine Zukunft behauptet und einen Preis darauf setzt: „Was du
  in diesem Fenster nicht fragst, musst du später teurer verhandeln",
  „Was dabei wegbricht, hat nur so ausgesehen, als trüge es", „Die
  Kraft, die das Festhalten kostet, brauchst du nachher". `PRODUKT.md` 5
  schließt beides aus. Vier Handgriffe sind umgeschrieben, und zwar an
  **einer** Stelle: Beide Seiten holen sie aus `B_WAND[*].tun` und
  `B_LEER` in `bereich-daten.js`. `heute-app.js` brachte zwei eigene
  Sätze mit — die liegen jetzt auch dort (`LEER.tun`,
  `LEER.tunWieOben`), weil ein Satz im Bauwerk von keiner Prüfung
  gelesen wird.
  Die dauerhafte Prüfung steht neu in `rituale/pruefwerk.py`, nicht je
  `bau-*.py` eine eigene: `handgriff_tadel` kennt drei Formen — ein
  Preis auf das Nichthandeln („Was du … nicht …, musst du …", „teurer",
  „sonst"), eine Folge jenseits des Fensters (eine Zeitverschiebung und
  eine Behauptung darüber, was dann ist) und eine Vorhersage darüber,
  was der Handgriff hervorbringt („Was dabei …"). Fünfzehn feste
  Beispiele laufen beim Import, nach `REGELN.md` 6e — sieben, die
  anschlagen müssen, acht, die durchgehen müssen, darunter der
  Vergleich „leichter als sonst" und die Aufzählung „was sonst noch
  läuft". `bau-bereiche.py` und `bau-heute.py` prüfen damit die Daten
  **und** das gezeichnete Ergebnis.
  Die Probe dagegen, dreimal: der Preissatz zurück in die Daten, und
  beide Bauten brechen ab — an den Daten und an der Seite. Ein eigener
  Satz zurück in `handgriff()`, und `bau-heute.py` bricht zweimal ab:
  einmal, weil die Anzeige einen Satz zurückgibt, der in keiner
  Datendatei steht, einmal an dem Satz selbst.

* **2026-11-04** · Die Grenze steht offen, nicht hinter einem Klick
  (Aufgabe 32). „Hier wird nichts über deinen Körper festgestellt, und
  nichts hier ersetzt eine Behandlung" lag als letzte Zeile in der
  Schublade „Mit jemand anderem darüber sprechen" — und die wird
  zugeklappt ausgeliefert. Im Bereich Gesundheit stand damit offen,
  dass der Körper „Aufmerksamkeit verlangt", während der Satz, dass
  eine Fachperson gefragt gehört, einen Klick entfernt war.
  `PRODUKT.md` 5 verlangt, dass das **dabei**steht; `REGELN.md` 1
  klappt die Sicht der Coachin zu, nicht die Grenze.
  Die Grenze liegt jetzt in einem eigenen Block `B_GRENZE` statt in
  `B_FRAGEN`: Was dort steht, steht offen; was in `B_FRAGEN` steht,
  darf gefaltet bleiben. Die Trennung liegt damit in den Daten, die
  Anzeige entscheidet nichts mehr. `mensch` sagt je Bereich, ob er am
  Körper oder an der Psyche hängt — bei Gesundheit, Freude,
  Selbstwert und Umbruch. Selbstwert nannte bisher niemanden und hat
  den Satz dazubekommen.
  Dauerhafte Prüfung in `bau-bereiche.py`, an zwei Stellen, weil zwei
  Dinge schiefgehen können: in den Daten, ob der Satz da ist und bei
  Körper- oder Psychebezug auch nennt, wen man stattdessen fragt
  (`_nennt_menschen`, mit festen Beispielen nach `REGELN.md` 6e) — und
  in der Rauchprobe am gezeichneten Ergebnis, auf Stufe 0 und ohne
  vorher irgendetwas aufzuklappen, ob er dort ohne Klick zu lesen ist.
  Die Probe dagegen: die Grenze zurück in die Klappe geschoben, und
  der Bau bricht in allen zehn Bereichen ab. Eine Prüfung, die nur die
  Daten liest, hätte den Fehler nie gefunden — der Satz stand ja da.

* **2026-11-03** · Die gebauten Überschriften beugen jetzt (Aufgabe 31).
  Auf der Startseite stand „Jupiter auf dein Mond", „Mars quer zu dein
  Mars", „Saturn gegenüber dein Auftreten" — elf Köpfe in den drei
  größten Abschnitten, keiner richtig, und auf Stufe 2 dasselbe. Die
  Vorlage setzte immer dasselbe „dein" oder „deine" ein; sie kannte
  weder den Fall, den die Formel verlangt, noch das Geschlecht des
  Punktes dahinter. Es traf genau die Karten, von denen jemand einen
  Screenshot macht (`PRODUKT.md` 2, Punkt 3).
  Beides steht jetzt in `bahn-daten.js`: das Geschlecht am Punkt, der
  Fall an der Formel. `B_BEUGE` ist die einzige Stelle, die „dein" und
  das Hauptwort zusammensetzt; die Anzeige beugt nichts mehr selbst. Wo
  sich das Hauptwort mitbeugt, steht das dabei — „auf deinen
  Aszendenten", „gegenüber deiner öffentlichen Seite". Das
  Fachregister heißt jetzt „Jupiter in Konjunktion zu deinem Mond"
  statt „Jupiter Konjunktion dein Mond": zwei Nominative nebeneinander
  sagten nicht, was wozu steht (`REGELN.md` 6d).
  Dauerhafte Prüfung in `bau-heute.py`: Die Rauchprobe liest beide
  Register jeder Überschrift und die Tabellen aus den Daten und
  verlangt zu Fall und Geschlecht genau eine Gestalt. Eine Prüfung auf
  „da steht ‚dein' vor einem großen Wort" wäre derselbe Fehler noch
  einmal gewesen — „auf deine Venus" und „auf dein Auftreten" sind
  richtig. Damit sich die Prüfung nicht durch Verstellen der Daten
  abschalten lässt, steht das Deutsche daneben und nicht darin:
  `_PRAEPFALL` am Verhältniswort, `_WORTFORMEN` am Wort, beide mit
  festen Beispielen vor dem ersten Bau (`REGELN.md` 6e). Vier Proben:
  Fall verstellt, Geschlecht verstellt, Beugung entfernt, festes „dein"
  in der Anzeige — jede bricht den Bau.
  Dabei aufgefallen und mitgenommen: Die Rauchprobe setzte ihre Adresse
  über `.replace('ZIEL', …)` ein. Seit sie `B_ZIEL` aus der Seite liest,
  stand mitten im Skript „B_/pfad/zu/index.html". Jetzt greift die
  Einsetzung auf die ganze Adresse.

* **2026-11-02** · Die Begleitung sortiert jetzt je Mensch (Aufgabe 19,
  „Die Begleitung sortiert für alle Menschen gleich" — die Nummer 19
  steht in dieser Liste zweimal, gemeint ist diese).
  `begleit-rechner.js` sortierte die Anlagen eines Menschen nach
  `BG_GEWICHT` — einer festen Zahl je Planet. Damit stand bei jedem
  Menschen dasselbe oben, egal was in seinem Bild steht, und wo zwei
  Zahlen gleich sind (Sonne und Mond je 1,00, Venus und Mars je 0,85,
  Uranus und Neptun je 0,55), entschied die Reihenfolge der Liste
  `BG_ANLAGEN`. Die Coachin hält die oberste Anlage für die wichtigste
  dieses Menschen; dort stand die Tabelle.
  Jetzt tragen drei Gewichte die Reihenfolge, und nur das erste hat
  überhaupt mit dem Planetennamen zu tun: das Grundgewicht, aufgerechnet
  mit dem, was die natale Lage dazu sagt (Winkelfeld, das Feld gehört der
  Anlage selbst, sie herrscht über das Feld des Auftretens, der Herr des
  Feldes berührt sie im Winkel); wie dicht die Anlage im Bild mit allem
  anderen verknüpft ist; und wie weit vorn sie in ihrem Feld steht. Der
  letzte Wert ist stetig, deshalb unterscheiden sich zwei Anlagen fast
  immer schon dort. Bleiben zwei auf allen drei gleich, entscheidet die
  natale Länge — aus der Reihenfolge von `BG_ANLAGEN` kommt die
  Sortierung in keinem Fall mehr.
  Die dauerhafte Prüfung in `bau-begleitung.py` prüft nicht den
  Einzelfall, sondern die Eigenschaft, über 1.200 erfundene
  Geburtsbilder: Jede Stellung trägt alle drei Gewichte; kein Paar liegt
  auf allen drei gleich, solange die beiden natal nicht auf derselben
  Länge stehen; es kommen mindestens hundert verschiedene Reihenfolgen
  heraus; und mindestens die Hälfte der Bilder sortiert anders als die
  reine Gewichtstabelle. Alle vier wurden gegengeprüft, indem die alte
  Sortierung kurz wieder eingesetzt wurde — jede schlägt an. Bei den 1.200
  Bildern sind hundert mit Absicht dabei, in denen drei Anlagen auf
  demselben Grad verschiedener Zeichen stehen; zwölf im Abstand von genau
  30° wären ein rundum symmetrisches Bild, in dem die Lagen tatsächlich
  nicht zu unterscheiden sind, und so ein Bild gibt es am Himmel nicht.
  Auf Wissensstufe 2 sagt das Etikett im Fragenvorrat jetzt, woran die
  Reihenfolge hängt, statt nur Planet und Haus zu nennen.

  Zwei Nebenfunde, beide im Zug mitgenommen, weil beide den Bau betrafen:
  Das Etikett stand auf `white-space:nowrap` und schob die Seite auf
  686px, sobald mehr darin stand — die Rauchprobe misst die Breite jetzt
  auf 320, 360, 390 und 768px und auf der höchsten Wissensstufe, nicht
  mehr nur auf 390px. Und die Prüfung „die Notiz überlebt den Neustart"
  flatterte: etwa jeder vierte Lauf auf `main` war rot, ohne dass sich ein
  Commit geändert hatte. Chromium wirft bei `file://` den `localStorage`
  beim Neuladen manchmal weg; danach war nicht nur die Notiz fort, sondern
  auch das gewählte Profil, und gelesen wurde das leere Feld eines anderen
  Menschen. Gemeint war nie „der Browser nimmt den Speicher mit über eine
  Navigation" — das entscheidet der Browser. Geprüft wird jetzt, was an
  der Seite hängt: dass die Notiz im Speicher landet, getrennt je Mensch
  und Sitzung, und dass die Seite sie beim Aufbau von dort holt und nicht
  aus dem Feld, in dem sie noch steht. Zehn Läufe hintereinander grün,
  und beide Teile schlagen an, wenn man den Lesepfad oder den Schlüssel
  kaputt macht. Dieselbe Lehre wie `REGELN.md` 6e, und der Nachsatz
  dorthin: eine Prüfung, die an der Uhr hängt, prüft die Uhr.

* **2026-10-31** · Die Sätze aus der Anzeige geholt (Aufgabe 9).
  `bereich-app.js` schrieb zwanzig Texte selbst: die fünf Blockköpfe, die
  Marke über dem stärksten Vorgang, die beiden Sätze über die lange Linie,
  der Satz über die drei Seiten eines Bereichs, die Frage nach den vier
  Stufen, der Hinweis ohne Profil, der Hinweis bei einem Stichtag vor der
  Geburt, die Kopfzeile, die Zeile über die stillen Bereiche und der
  Maschinenraum zur natalen Lage. Alle stehen jetzt in `bereich-daten.js`
  unter `B_SEITE`; die Anzeige setzt nur noch ein, was in geschweiften
  Klammern steht. Auf der Seite ändert sich kein Wort — das war der Punkt:
  PRODUKT.md Abschnitt 7 verlangt, dass Texte unverändert umziehen können,
  und ein Satz in der Anzeige zieht nicht mit.
  Die dauerhafte Prüfung in `bau-bereiche.py` repariert nicht die zwanzig
  Fälle, sondern schließt die Klasse: Jede Zeichenkette in
  `bereich-app.js` wird vom Markup befreit; bleibt etwas übrig, das nach
  Sprache aussieht — zwei Wörter nebeneinander oder ein Wort mit
  Satzzeichen —, bricht der Bau ab. Technische Zeichenketten fallen
  durch, weil sie kein Leerzeichen, keinen Großbuchstaben und keinen
  Umlaut haben; ein deutscher Satz hat immer eines davon. Dazu die beiden
  Umwege: ein doppeltes Anführungszeichen oder ein Backtick außerhalb
  einer Markup-Zeichenkette bricht den Bau ebenfalls ab. Nachgewiesen an
  fünf eingebauten Fehlern — Satz in einfacher, doppelter und
  Backtick-Anführung, die dreiwörtige Marke ohne Satzzeichen und das
  Fragment „ Haus." —, jeder einzelne bricht den Bau. Die Reihenfolge der
  fünf Blöcke wird jetzt in den Daten geprüft und zusätzlich daran, dass
  die Anzeige sie der Reihe nach einsetzt.

* **2026-10-30** · Facetten auch in unbesetzten Bereichen gewichtet
  (Aufgabe 8). Jeder der zehn Bereiche hat zwei Facetten am selben Feld —
  in Geld hängen „Was reinkommt" und „Wie du damit umgehst" beide am
  Kernfeld. Stand dort natal nichts, bekamen beide dasselbe Gewicht, und
  dann entschied die Reihenfolge in `bereich-daten.js`, welche oben steht.
  Die Seite sagt aber, die Reihenfolge komme aus dem Geburtsbild.
  Jetzt wird ein unbesetztes Feld über seinen Herrn gelesen, wie es das
  Fach seit Jahrhunderten tut: Gehört der Herr des Feldes selbst zur
  Facette, steht er in einem Feld des Bereichs, berühren ihn die Punkte
  der Facette im Winkel — daraus kommt ein zweites Gewicht. Bleibt auch
  das gleich, entscheidet ein drittes: wie dicht die Punkte einer Facette
  im Bild beieinanderstehen. Weil dieser Wert stetig ist, sind zwei
  Facetten nie mehr gleich schwer.
  Die dauerhafte Prüfung in `bau-bereiche.py` prüft nicht den Einzelfall,
  sondern die Eigenschaft: Über 1.200 erfundene Geburtsbilder hinweg darf
  kein Paar von Facetten auf allen Gewichten gleich liegen, und die
  unbesetzten Bereiche müssen oft genug anders sortieren als die
  Textdatei. Beides bricht den Bau ab, wenn es kippt. Auf Wissensstufe 2
  nennt die Mechanik jetzt den Herrn des Feldes, statt nur eine Zahl
  hinzuschreiben.

* **2026-10-29** · Die doppelten Seitenpaare angesehen (Aufgabe 5). Beide
  Paare bleiben zwei Seiten, und beide sagen das jetzt selbst: Auf jeder
  der vier steht ein Satz, wofür die Nachbarseite da ist.
  `aspekte.html` ist die Lektion (was die fünf Winkel sind, mit Beispielen
  und Spielraum), `aspekte-lesen.html` das Nachschlagewerk für 45
  Planetenpaare. `chart-lesen.html` ist eine Methode — in welcher
  Reihenfolge man liest —, `bausteine.html` ein Nachschlagewerk für die
  Teile. Eine Methode liest man einmal, ein Nachschlagewerk schlägt man
  immer wieder auf; das zusammenzulegen hätte beides schlechter gemacht.
  Eine echte Doppelung war darunter: Die fünf Winkel wurden auf zwei
  Seiten erklärt, mit verschiedenen Worten. Auf `aspekte-lesen.html` ist
  die Spalte „Was es tut“ jetzt weg — die Tafel dort sagt nur noch,
  welcher Winkel welche Farbe im Chart hat, und das ist genau das, was
  diese Seite braucht. Die Bedeutung steht einmal, auf `aspekte.html`.
  Fehlerklasse abgestellt, als zwölfte Querprüfung in `pruefe-alles.py`:
  Ob zwei Texte dasselbe sagen, kann keine Prüfung entscheiden — aber sie
  kann die Stellen festhalten, an denen die fünf Winkel überhaupt
  ausgelegt werden dürfen. `TAFEL_ERLAUBT` führt drei (Lektion,
  Farbschlüssel, Wörterbuch), jede mit einem Satz Begründung, und die
  Liste bricht in beide Richtungen: eine vierte Seite mit der Tafel ist
  ein Fehler, eine eingetragene ohne sie auch. Dieselbe Bauart wie
  `HANDARBEIT`.

* **2026-10-29** · `main` war rot, und zwar an der Prüfung, nicht an der
  Seite. Seit dem Zusammenführen vom 28.10. meldete `bau-heute.py`:
  „‚Schlaf und Bewegung‘ zeigt die Mechanik schon auf Stufe 0.“ Die Seite
  tut das nicht — auf Stufe 0 steht dort „Der Mond läuft heute über deine
  Sonne“ und sonst nichts. Gemessen wurde nur zum falschen Zeitpunkt: Der
  Block lief, bevor die Rauchprobe den Wissensstand überhaupt auf 0
  gestellt hatte, also auf dem Auslieferstand — und dort soll die Mechanik
  zu sehen sein.
  Zwei Messfallen stecken darin, beide notiert, wo sie passiert sind:
  `offsetParent` taugt nicht als Sichtprüfung, weil ein Kind in einer
  zugeklappten Klappe weiter eine Box und einen offsetParent hat — jetzt
  `checkVisibility()`. Und `innerText` taugt es auch nicht, solange der
  Abschnitt selbst ausgeblendet ist: Dann gibt er den rohen Textinhalt
  zurück, samt allem, was gerade versteckt ist. Der Klick auf „Wenig“
  kurz davor tat genau das. Für die Messung wird deshalb kurz wieder
  alles eingeblendet und danach zurückgestellt.
  Geprüft in beide Richtungen: Auf der richtigen Seite meldet die Prüfung
  nichts mehr, und eine absichtlich sichtbar gemachte Mechanikzeile bricht
  den Bau weiter.
  Dass dieselbe Falle noch an zwei weiteren Stellen derselben Rauchprobe
  sitzt, steht als Aufgabe 29.

* **2026-10-28** · Die Coachin-Sicht steht jetzt auf der Seite (Aufgabe 4).
  Die drei Gesprächsfragen und die Grenze gab es für alle zehn Bereiche
  schon — sie gingen aber nur in den Tiefgang, also in eine Datei, die man
  erst anfordern muss. Wer die Seite las, bekam genau den Teil nie zu
  sehen, der aus einem Befund ein Gespräch macht. Jetzt sitzt unter den
  fünf Blöcken jedes Bereichs eine zugeklappte Schublade „Mit jemand
  anderem darüber sprechen": drei Fragen, und darunter, was dieser Bereich
  über einen Menschen nicht weiß. Zugeklappt, weil die zweite Sicht nie im
  Vordergrund steht — und ohne Schloss, denn die Klappe hält die Fragen aus
  dem Weg, nicht zurück.
  Die dauerhafte Prüfung misst am gezeichneten Ergebnis und auf Stufe 0,
  nicht an den Daten: Eine Prüfung, die nur die Datei liest, hätte den
  Mangel nie gemerkt — die Fragen standen dort ja. Sie fällt durch, wenn
  eine Klappe fehlt, offen steht, auf Stufe 0 unsichtbar ist, nicht genau
  drei Fragen trägt, die Fragen eines anderen Bereichs zeigt, die Grenze
  nicht mitbringt oder irgendwo eine Diagnose stellt. Alle sechs Fälle
  wurden einzeln ausprobiert, bevor sie eingebaut wurden.
  Ein Fund nebenbei: `_test-bereich.js` lief über alle Schlüssel von
  `B_FRAGEN` statt über die zehn Bereiche. Solange die beiden gleich waren,
  fiel das nicht auf. Jetzt läuft die Prüfung über die Bereiche — damit
  prüft sie ohnehin das Richtige, nämlich dass keiner fehlt.

* **2026-10-27** · Die Ich-Seite umgebaut (Aufgabe 1). Sie begann mit
  dem Chartrad und führte darunter mit Zeichen und Gradzahl — und war
  auf dem Telefon 12.496 Pixel hoch, fünfzehn Bildschirme am Stück ohne
  eine Möglichkeit zu springen. Jetzt steht im ersten Bildschirm ein
  Satz über diesen Menschen, genommen aus dem seltensten Befund und
  ohne ein Fachwort: „Zwei Dinge in dir arbeiten zusammen, ohne dass du
  etwas dafür tust …" Darunter kommt „Was an dir auffällt" als erster
  Abschnitt, dann die drei tragenden Stellen — erst, worum es im Leben
  geht, dann der Lebensbereich, und Grad und Zeichen warten. Alles
  Nachschlagbare liegt in Klappen: das Rad, die zwölf Felder, die
  Verbindungen, das Regal. Die Seite ist damit 3.766 Pixel hoch, weniger
  als ein Drittel, und oben läuft eine Sprungzeile mit.
  Zwei Funde nebenbei. Die Seite hatte keinen Stufenschalter: `niveau.js`
  setzt ihn nur ein, wo ein Platzhalter steht oder ein `.wrap` existiert,
  und die Ich-Seite hat `.ich-wrap`. Alles, was dort in `ac-tech`
  wartete, wäre für immer unsichtbar geblieben. Und auf jeder Karte im
  Abschnitt „Was zusammenhängt" stand nur die Formel: Der Satz dazu
  wurde geholt und unter einem Namen gesucht, den es in
  `aspekte-daten.js` nie gab, also fiel er jedes Mal lautlos weg. Jetzt
  steht dort, worum es geht, Karten ohne Satz entfallen, und daneben
  steht, wie viele Winkel insgesamt gerechnet sind — eine Auswahl, die
  sich nicht als Ganzes ausgibt.
  Fehlerklassen abgestellt, alle in `bau-ich.py`: die Seite höher als
  6.248 Pixel auf 390 Pixeln; ein Gradzeichen, ein Zeichen- oder
  Anlagenname auf Stufe 0 sichtbar — gemessen am gerenderten Text der
  ganzen aufgeklappten Seite, inklusive eines aufgeklappten Feldes, denn
  eine Klappe ist kein Versteck; ein Abschnitt mit Sprungmarke ohne ID;
  eine Sprungmarke ohne Ziel, ohne Aufschrift oder unsichtbar; ein
  Sprung, der die Seite nicht bewegt oder in eine geschlossene Klappe
  führt; eine Klappe, die beim Laden offen steht; eine Seite ohne
  Stufenschalter oder mit einem, auf dem die Mechanik trotzdem nicht
  erscheint; ein sichtbarer Kasten ohne ein Wort darin; ein seitlicher
  Überlauf bei offenen Klappen; zwei klebende Zeilen übereinander,
  gemessen im gescrollten Zustand, weil am Seitenanfang jede falsche
  Einstellung richtig aussieht; derselbe Satz im Kopf bei fünf
  verschiedenen Geburtsbildern; ein Satz im Kopf ohne Lücke oder mit
  Fachwort; und `section`, `nav` und `details`, die nicht aufgehen —
  bisher wurde nur `div` gezählt. Zehn absichtlich eingebaute Fehler,
  alle zehn erkannt.
  Offen geblieben: „Haus" steht auf Stufe 0 noch sichtbar (Aufgabe 27),
  und in `ich-app.js` hängen weiter Sätze, die keine Prüfung liest
  (Aufgabe 28). Wie viele andere Seiten denselben fehlenden
  Stufenschalter haben, ist nicht gezählt — das gehört zu Aufgabe 16.

* **2026-10-26** · Die Sprache der Bereichstexte umgeschrieben. 32 Texte in
  `bereich-daten.js`, dazu zwei Logikfehler in der Anzeige: Der Satz „Gerade
  zieht nichts Großes daran" stand auch dann da, wenn darunter drei laufende
  Sachen aufgezählt wurden, und die lange Linie nannte Monatsdaten bis zu
  zehn Jahre voraus. Drei dauerhafte Sprachprüfungen dazu.
* **2026-10-25** · Die alten Raumseiten hängen an den Bereichen
  (Aufgabe 3). Zehn lange Texte lagen seit den Anfängen da — „Warum
  nehme ich eigentlich zu wenig?", „Warum wiederholt sich das immer?" —
  und waren von der Bereichsseite aus nicht erreichbar: Wer beim
  lautesten Bereich ankam und weiterlesen wollte, fand sie nicht. Jetzt
  steht unter jedem Bereich, welche lange Seite dazugehört und was auf
  ihr steht, in Alltagssprache und auf der untersten Stufe sichtbar.
  Zwei Bereiche dürfen auf dieselbe Seite zeigen: „Warum nehme ich
  eigentlich zu wenig?" ist eine Frage nach dem Geld und eine nach dem
  eigenen Wert. Dazu die zweite Hälfte: Auf den Karten der
  Raumübersicht stand unter dem Namen „2. Haus, Venus, Saturn, Lilith" —
  also woran man es abliest, an der Stelle, wo stehen soll, wovon die
  Seite handelt. Die Seite selbst sagt zwei Kästen weiter unten, dass
  die Räume nach der Frage heißen und nicht nach der Technik; genau das
  gilt nun auch für die Karten. Die Mechanik wartet jetzt in `ac-tech`
  und erscheint ab der zweiten Stufe, und wo eine Karte Lebenssprache
  und Mechanik in einer Zeile mischte („Essen, Trinken, Papierkram …"),
  bleibt der Lebensteil stehen. Fehlerklassen abgestellt: ein Bereich
  ohne Verweis; ein Verweis auf eine Seite, die es nicht gibt; ein
  Themenraum in `wiki/`, auf den niemand zeigt (gemessen an der
  gebauten Seite, nicht an den Daten); ein Verweis, der in der Mechanik
  wartet und deshalb auf Stufe 0 unsichtbar ist; zwei Räume mit
  demselben Satz beschrieben; ein Dateiname im Anzeigeskript statt in
  den Daten; und Maschinenraum im Titel einer Raumseite — das als
  elfte Querprüfung über alle dreizehn Raumseiten, weil diese Seiten
  Handarbeit sind und kein eigenes Bauskript haben, das es prüfen
  könnte. Ein Fund an der eigenen Prüfung dabei: Die Stufe-0-Prüfung
  stand mitten in `bau-bereiche.py`, und alles, was danach noch Sätze
  sammelte, lief an ihr vorbei — die Sätze der Auswahlleiste taten das
  seit dem 22. Oktober unbemerkt. Die Prüfung steht jetzt hinter dem
  letzten Sammler, und die Liste wird danach zugemacht, damit ein
  späterer Sammler den Bau abbricht statt lautlos durchzukommen. Und
  weil eine Wartemarke nur wartet, wenn jemand die Stufe anwendet,
  bricht die Querprüfung auch ab, wenn eine Raumseite Wartemarken
  trägt, aber den Wissensstand nicht lädt — im Markup sähe sonst
  alles richtig aus und die Mechanik stünde trotzdem offen da. 3455
  Prüfungen im Bereichsrechner, vierzehn absichtlich eingebaute Fehler
  alle erkannt.

* **2026-10-24** · Die App-Ansicht (Aufgabe 2, Stufe 2 aus `PRODUKT.md`
  Abschnitt 7). Die Seite lässt sich aufs Telefon legen: eigenes Symbol in
  den Markenfarben, Vollbild ohne Browserleiste, und was man einmal offen
  hatte, steht auch ohne Netz noch da. Kein Framework, kein Bauwerkzeug —
  die vier Symbole entstehen beim Bauen aus zwei Kreisen und zlib, damit
  der Bau auf jedem Rechner mit Python läuft und nicht an einem
  Bildprogramm hängt. Der Zwischenspeicher fragt bewusst erst das Netz und
  dann sich selbst: Andersherum wäre er schneller, würde aber alte Texte
  als heutige ausgeben, und das ist genau die stille Übertreibung, die
  `PRODUKT.md` Abschnitt 3 ausschließt. Die Startseite legt er schon beim
  Anmelden ab, weil der erste Seitenaufruf noch an ihm vorbeiläuft — sonst
  wäre nach dem ersten Besuch ausgerechnet die Seite nicht da, von der aus
  man weitergeht. Ist eine Seite gar nicht da, kommt `offline.html` statt
  einer Browserfehlermeldung: was los ist, was trotzdem geht, und dass
  ohnehin das eigene Gerät rechnet und kein Server. Neu ist dabei vor
  allem eine Stelle statt sechzehn: Die Zeilen, mit denen eine Seite
  Manifest, Symbol und Zwischenspeicher einbindet, stehen allein in
  `app/app-kopf.html`; jedes `bau-*.py` setzt sie mit einer Zeile ein, und
  geprüft wird am Ergebnis, nicht in den Bauskripten. Fehlerklassen
  abgestellt: eine gebaute Seite ohne App-Ansicht; eine Seite mit einer
  eigenen halben Fassung des Blocks; ein Symbol, das das Manifest nennt
  und das es nicht gibt; ein Symbol, dessen wirkliche Größe nicht zu der
  passt, die das Manifest behauptet (gelesen wird aus der Datei, nicht aus
  dem Dateinamen); zwei Orte für die Markenfarbe, die auseinanderlaufen;
  ein Zwischenspeicher, der zuerst in sich selbst greift; ein `sw.js`
  oben, das von seiner Quelle abweicht; ein Satz im Anzeigeskript statt in
  den Daten; ein halber oder fehlender Text; Fachsprache auf Stufe 0. Dazu
  ein Fund an der eigenen Prüfung: Die Rauchprobe war beim ersten Anlauf
  grün und blind — der Browser hat seinen eigenen Zwischenspeicher, und
  der lieferte die Seite ohne Netz auch dann aus, wenn `sw.js` nichts
  getan hatte. Der Prüfserver schickt jetzt `no-store`; was ohne Netz noch
  steht, steht wirklich wegen `sw.js`. Die Probe schaltet das Netz ab und
  prüft dreierlei: die besuchte Seite steht noch, die Startseite auch, und
  eine nie besuchte zeigt die Ohne-Netz-Seite statt eines Abbruchs — und
  mit Netz ist wieder die frische Seite da. Siebzehn absichtlich
  eingebaute Fehler alle erkannt.
* **2026-10-23** · „Ich" sagt endlich etwas über diesen einen Menschen.
  Mandys Befund: Die Aussagen seien vage und unpersönlich. Nachgemessen mit
  zwei sehr verschiedenen erfundenen Geburtsbildern: 86 von 100 Sätzen
  waren wortgleich, und was sich unterschied, waren Aufzählungen von
  Fachbegriffen („7. Haus (Partnerschaft): Mars, Jupiter") — also gar keine
  Sätze. Ursache: zwölf Haustexte und zwölf Anlagensätze, jeder für sich
  allgemeingültig geschrieben und zusammengeklebt; die Kombination erreichte
  nie einen Satz. Neu ist der Abschnitt „Was an dir auffällt": vier Befunde,
  der seltenste zuerst — wo sich bei diesem Menschen die Anlagen häufen, wo
  sich sein erster Eindruck entscheidet, welche zwei Anlagen bei ihm
  aufeinandertreffen, und wie viele bei seiner Geburt rückwärts liefen.
  Jeder Befund nennt eine gerechnete Häufigkeit: Die Tabelle wird beim Bauen
  aus 10.000 erfundenen Geburtsbildern abgezählt, mit festem Startwert,
  damit zwei Bauläufe dieselbe Zahl ergeben. Dabei fiel ein Fehler im
  eigenen Entwurf auf: „fast auf den Grad genau" hätten 60 von 100 Menschen,
  weil der engste von 66 Winkeln fast immer eng ist — die Schwelle ist jetzt
  an der Abtastung geeicht statt geraten. Gemessen nachher: 5 Prozent
  wortgleiche Kernaussagen im Schnitt über zehn Paare, schlimmstes Paar 25.
  Dazu, weil es dieselbe Stelle betraf: Die Winkelrechnung ist aus der
  Anzeige in `ich-rechner.js` gewandert, damit die Abtastung dieselbe
  Rechnung benutzt und nicht eine zweite Fassung. Fehlerklassen abgestellt:
  ein Satz ohne Lücke, der wieder für jeden gilt; eine Anlage, die als
  Planetenname statt als Rolle erscheint; Fachsprache auf Stufe 0; eine
  Mechanikzeile ohne Wartemarke; ein fehlender Häufigkeitssatz; eine
  Abtastung, die nichts liefert; ein Satz im Rechner statt in den Daten; ein
  ehrlicher Teil ohne den Vorrang des eigenen Erlebens; eine Tausenderzahl
  ohne deutsche Trennung. Die wichtigste davon ist die erste: `bau-ich.py`
  zeichnet bei jedem Bau fünf erfundene Bilder und bricht ab, sobald im
  Schnitt mehr als ein Viertel der Kernaussagen wortgleich ist. Neun
  absichtlich eingebaute Fehler alle erkannt.
* **2026-10-23** · Überblick und Tiefgang getrennt (Aufgabe 1). Die Seite
  zeigt den Überblick: was los ist, was du tun kannst, wie lange es läuft.
  Der Tiefgang ist dieselbe Rechnung, zu Ende geschrieben — woher ein Thema
  bei diesem Menschen kommt, alle Facetten statt der ersten drei, was sich
  darin widerspricht, drei Gesprächsfragen und eine Grenze, dazu der
  ehrliche Teil. Je Bereich ein Knopf und einer für alle gewählten; der
  Text entsteht beim Antippen auf dem Gerät und geht als Datei heraus,
  statt auf der Seite zu stehen. Kein Schalter, der Freischalten
  vortäuscht: Die Seite sagt selbst, dass sie keinen Server hat und jedes
  Schloss hier gemalt wäre. Der Wissensstand gilt auch für die Datei — auf
  der untersten Stufe kommt sie ohne ein einziges Fachwort heraus, sonst
  wäre „verständlich auf jeder Stufe" ein Versprechen, das die Seite hält
  und die Datei bricht. Neu gerechnet werden die Widersprüche: zwei
  natale Punkte in den Feldern eines Bereichs im harten Winkel, ein
  reibender und ein tragender Vorgang zur selben Zeit, und ein Kapitel,
  das mit seinem eigenen Abschnitt nicht übereinstimmt. Findet die
  Rechnung keinen, steht genau das da. Fehlerklassen abgestellt: ein
  Tiefgang, dem einer seiner Teile fehlt; eine Gesprächsfrage, die eine
  Diagnose stellt; ein Widerspruch, der zweimal denselben Satz ergibt
  (daran fielen zwei natale Paare zwischen denselben beiden Feldern auf);
  ein Widerspruch, der erfunden oder verschwiegen wird; ein Satz im
  Tiefgang-Bauer statt in den Daten; ein Fachwort in einer Datei, die auf
  Stufe 0 erzeugt wurde; ein Knopf, der keine Datei schreibt; ein
  Tiefgang, der doch auf der Seite steht; und ein Wort wie
  „freischalten" im Code oder im Markup. Zwei Funde beim Prüfen selbst:
  die Rauchprobe platzte bei einem Abbruch mit einem unlesbaren
  Node-Stapel, statt zu melden, was sie nicht mehr erreicht hat — und die
  Rechenprüfung rechnete ohne die langen Kapitel, weshalb die dritte
  Sorte Widerspruch dort nie entstand und ihre Prüfung grün und blind
  war. Beides ist abgestellt, samt einer Prüfung, dass jede Sorte in den
  Probebildern wirklich vorkommt. 3455 Prüfungen im Bereichsrechner,
  vierzehn absichtlich eingebaute Fehler alle erkannt.
* **2026-10-22** · Erster Vorsprung in `PRODUKT.md` nachgeschärft (Aufgabe 16,
  aus der Recherche vom 21.10.): Die Paarsicht allein ist kein Vorsprung —
  The Pattern und Co-Star haben sie. Was dort fehlt, ist der Handgriff, das
  Zeitfenster mit Datum, die eigene Grenze und die Sicht der Coachin. Dazu
  die Einordnung, dass Co-Star offen astrologisch spricht und The Pattern
  der nähere Wettbewerb ist, weil es die Fachsprache meidet.

* **2026-10-22** · Die Besucherin wählt ihre Bereiche. Neben dem
  Wissensstand steht jetzt eine zweite Leiste: zehn Bereiche und „alle
  zehn". Die Auswahl liegt in `AC_P` neben dem Profil, gilt deshalb
  plattformweit und nicht pro Seite, und keine Auswahl heißt weiter alle.
  Die Bereichsseite zeigt nur noch die gewählten, der Kurzblick auf der
  Startseite auch, und der Monatsbericht nennt zuerst die Vorgänge, die
  in einem gewählten Bereich liegen. Was die Seite dabei nicht tut, ist
  das verschweigen: die Leiste sagt, dass die übrigen Bereiche
  ausgeblendet und nicht ruhig sind, und läuft in der Auswahl in einem
  Monat nichts, sagt der Brief das, statt einen Vorgang von außerhalb als
  den Monat auszugeben. Die zehn Bereiche stehen nicht mehr im Rechner,
  sondern allein in `bereiche/lebensbereiche.js` — drei Seiten brauchen
  sie, und eine zweite Kopie wäre derselbe Fehler wie früher bei der
  Himmelsrechnung. Fehlerklassen abgestellt: eine Seite, die die Leiste
  zeigt, sich aber nicht nach ihr richtet, kommt nicht durch den Bau;
  eine Seite, die die Bereiche nennt, ohne sie wählen zu lassen, auch
  nicht; eine Auswahl mit eigenem Speicherschlüssel statt bei den
  Profildaten fällt auf; ein unbekannter Bereich im Speicher bedeutet
  „alle" statt einer leeren Seite; der letzte gewählte Bereich lässt sich
  nicht abwählen; ein Satz in `wahl-app.js` statt in `wahl-daten.js`
  bricht den Bau; eine zweite Bereichsliste irgendwo im Quelltext bricht
  ihn auch. Und eine Fehlerklasse, die beim Arbeiten auffiel: `niveau.js`
  und `wortwahl.js` liegen zweimal im Projekt — einmal als Quelle, einmal
  oben, wo die Seiten sie laden —, und niemand kopiert sie; seit heute
  bricht die Prüfung ab, sobald zwei Fassungen auseinanderlaufen. 257
  Prüfungen im Bereichsrechner, 1904 im Monatsrechner, neun absichtlich
  eingebaute Fehler alle erkannt.
* **2026-10-21** · Der Monatsbericht sagt, was bei DIESEM Menschen los ist.
  Zu jedem laufenden Vorgang steht jetzt im Brief, welche Anlage dieses
  Menschen er trifft („deinen Antrieb — die Kraft, mit der du anfängst"),
  in welchem Lebensbereich sie bei ihm liegt, und was die Bewegung dort
  macht. Dazu sagt der Brief, was bei diesem Menschen überhaupt in dem
  Bereich liegt, auf den der Monat zeigt — bei den meisten liegt dort
  nichts, und auch das steht da, statt verschwiegen zu werden. Die
  Beschreibungen der Bewegungen sind nach Winkelart getrennt: vorher stand
  „Es ist gerade zäh" auch über einem tragenden Winkel, dessen eigener
  Absatz von Halt sprach. Fehlerklassen abgestellt: jede Anlage nennt ihr
  Geschlecht, und erster und vierter Fall müssen daraus folgen — damit ist
  „liegt auf deinen Ausdruck" nicht mehr Sorgfalt, sondern unmöglich; eine
  Lücke, die den vierten Fall verlangt, darf nur aus der Form für den
  vierten Fall gefüllt werden; reibende und tragende Fassung dürfen nicht
  gleich sein; und läuft etwas, muss der Brief eine Anlage nennen. 1813
  Prüfungen im Rechner, elf absichtlich eingebaute Fehler alle erkannt.
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
