/* ── Die Sätze der Seite „Mit wem du arbeitest" ────────────────
   Aufgabe 59, aus 34 und 38. Bis zum 2026-11-19 standen diese
   hundertvierundsiebzig Zeichenketten in `geist-app.js`, zwischen der
   Rechnung — die größte Anzeige der Plattform und die mit dem
   meisten „dein" von Hand. Was in der Anzeige steht, zieht beim
   Umzug in eine andere Umgebung nicht mit (`PRODUKT.md` Abschnitt 7):
   Rechnen weiß nichts von Sätzen.

   Die Lücken heißen `{so}` und werden von `gFuell` gefüllt.
   `bau-geist.py` zählt nach, dass jede Lücke, die hier steht, auch
   wirklich gefüllt wird — eine, die niemand füllt, stünde sonst als
   „{bereich}" auf der Seite.

   ── Was sich hier über „dein" gezeigt hat ──
   `AUFGABEN.md` sagte zu dieser Aufgabe: „hier zeigt sich, ob
   `B_BEUGE` für alle Fälle reicht." Es reichte nicht. Diese Seite
   nennt das Haus in drei Fällen:

     „dein 12. Haus"       — Nominativ
     „deinem 12. Haus"     — Dativ  („in deinem 12. Haus")
     „deines 12. Hauses"   — Genitiv („der Herrscher deines …")

   Den Genitiv gab es in `B_DEIN` nicht; der Kommentar dort sagte
   ausdrücklich, in keiner dieser Formeln stehe einer. Auf dieser
   Seite steht einer, und das Hauptwort ändert sich im Genitiv
   gleich mit („Hauses"). Beides steht jetzt an der einen Stelle,
   die ein Geschlecht kennt: der Fall in `B_DEIN` in
   `kern/bahn-daten.js`, die Form des Hauptworts hier unten in
   `haus.beugt`. Kein „dein" in `geist-app.js`.

   Dieselbe Fehlerklasse wie in `REGELN.md` 6f: Eine Tabelle für
   einen Fall deckt den anderen nicht. Die Sperre dazu steht in
   `bau-geist.py` und hält alle drei Fälle gegen feste Beispiele.

   Die Pronomen stehen hier und nicht in der Rechnung: ob es „sie
   kann, was sie soll" oder „er kann, was er soll" heißt, hängt am
   Geschlecht des Wortes und nicht am Himmel. */
var GT_T = {

 /* ── Formen, die am Planeten hängen ──────────────────────── */

 /* Genitiv mit Artikel: „Stunde der Sonne", „Stunde des Mondes".
    Nicht Artikel plus Name — „des Sonne" wäre das Ergebnis. */
 gen:{Sonne:'der Sonne', Mond:'des Mondes', Merkur:'des Merkur',
      Venus:'der Venus', Mars:'des Mars', Jupiter:'des Jupiter',
      Saturn:'des Saturn'},

 /* Der Wochentag, ganz. */
 wotag:{Sonne:'Sonntag', Mond:'Montag', Mars:'Dienstag',
        Merkur:'Mittwoch', Jupiter:'Donnerstag', Venus:'Freitag',
        Saturn:'Samstag'},

 /* Das Geschlecht des Planetennamens, damit „Dass sie in Fische
    steht" richtig wird. `p` ist der Nominativ, `d` der Dativ. */
 pron: {Sonne:'sie', Mond:'er', Merkur:'er', Venus:'sie',
        Mars:'er', Jupiter:'er', Saturn:'er'},
 pron2:{Sonne:'ihr', Mond:'ihm', Merkur:'ihm', Venus:'ihr',
        Mars:'ihm', Jupiter:'ihm', Saturn:'ihm'},

 /* Die Würde in Worten. Mechanik, also ab Stufe 2 (REGELN.md 2a). */
 wuerde:{domizil:'im eigenen Zeichen', erhoehung:'in Erhöhung',
         exil:'im Exil', fall:'im Fall',
         exilfall:'im Exil und im Fall', '':'peregrin'},

 /* Das Haus steht an siebzehn Stellen im Text. Es steht hier
    einmal, mit seinem Geschlecht — „dein 12. Haus", „deinem 12.
    Haus" und „deines 12. Hauses" bildet damit B_BEUGE und nicht
    die Anzeige. `beugt.gen` ist nötig, weil das Hauptwort sich im
    Genitiv selbst ändert. */
 haus:{g:'s', wort:'{n}. Haus', beugt:{gen:'{n}. Hauses'}},
 imHaus:'im {n}. Haus',

 trenner:'·',
 und:' und ',
 undKomma:', ',

 /* ── Die Tür: der Herrscher des 12. Hauses ───────────────── */
 tuerKopf:'Die Tür',
 tuerIst:'ist {deinHaus} · Herrscher',
 tuerSteht:'steht in',
 tuerWuerde:'{imHaus} · {wuerde}',
 tuerLeicht:'Der Bereich hinter dem Vorhang gehört bei dir',
 tuerVon:'und wird geführt von',
 tuerStoff:'Dein Stoff: <b>{stoff}</b>',
 tuerStark:'Und {pl} steht <b>{wuerde}</b> — {p} kann, was {p} soll. '+
   'Das ist die stärkste Aussage in diesem Abschnitt: Dein Zugang zum '+
   'Unsichtbaren ist nicht beschädigt, er ist nur vielleicht unbenutzt.',
 tuerSchwach:'{pl} steht <b>{wuerde}</b> — {p} arbeitet gegen das Material. '+
   'Das heißt nicht, dass die Tür zu ist. Es heißt, dass du sie bewusst '+
   'bauen musst, statt darauf zu warten, dass sie von selbst aufgeht.',
 tuerRaus:'<b>Und es gehört nach draußen.</b> Der Herrscher {deinHausGen} '+
   'steht {imHaus} — im sichtbaren Teil des Charts. Deine verborgene Arbeit '+
   'ist nicht als Privatkeller angelegt, sondern als etwas, das rauskommt.',
 tuerWie:'So',
 tuerWomit:'Womit',
 tuerNicht:'Nicht',
 tuerBew:'<b>Im {n}. Haus selbst steht {wer}.</b> In der alten Lehre ist '+
   'das Haus des Verborgenen kein freundlicher Ort für Planeten — was dort '+
   'steht, wirkt, ohne gesehen zu werden. {satz} bei dir Teil der Praxis, '+
   'aber nicht ihr Eingang. Der Eingang ist {pl}.',
 tuerBewViele:'Diese Planeten sind',
 tuerBewEiner:'Dieser Planet ist',
 tuerLeer:'{DeinHaus} ist <b>leer</b>. Das ist kein Mangel — es heißt, '+
   'dass dein Zugang ganz über {pl} läuft und über nichts sonst. '+
   'Einfacher, aber enger: Es gibt bei dir eine Tür, nicht drei.',

 /* ── Der Kanal: Merkur ───────────────────────────────────── */
 kanalKopf:'Der Kanal',
 kanalIn:'in',
 kanalWuerde:'{imHaus} · {wuerde}',
 kanalLeicht:'Dein Denken und Empfangen steht in',
 kanalWie:'Es kommt bei dir <b>{wie}</b>.',
 kanalUebKopf:'Deine Übung',
 kanalSelbst:'Und Merkur ist bei dir zugleich <b>Chartherrscher</b> — '+
   'Herrscher deines Aszendenten. Das heißt: Dieser Kanal ist nicht eine '+
   'Nebenfähigkeit, er ist die Art, wie du überhaupt in der Welt bist. '+
   'Was du empfängst, ist bei dir nie nur Information. Es ist Identität.',
 kanalHerr:'Dein Chartherrscher ist <b>{ch}</b> ({stellung}, {hausPunkt}) — '+
   'der Planet, der dich insgesamt führt. Merkur ist der Empfang; '+
   '{ch} ist die Richtung.',
 kanalOffen:'offen',
 kanalEng:'eng',
 kanalWinkel:'<b>Merkur {typ} {wer}</b> ({orb}°) — {text}',
 /* Je Winkel ein Vorsatz und zwei Folgen: die offene und die enge.
    Der Vorsatz allein sagt noch nichts (REGELN.md 6d). */
 kanalAspekt:{
  Neptun:{vor:'die klassische Verbindung zum Unsichtbaren.',
    flow:'Sie ist bei dir offen: Eindrücke kommen leicht und oft.',
    spannung:'Sie ist bei dir unter Spannung: Es kommt viel, aber du '+
      'traust es dir nicht zu. Das ist der Winkel, der nach Beleg verlangt.'},
  Pluto:{vor:'die Tiefe.',
    flow:'Du liest, was unter der Oberfläche liegt, ohne Mühe.',
    spannung:'Du liest es auch, aber es kostet dich etwas. Dosieren.'},
  Mond:{vor:'Gefühl und Wort liegen bei dir zusammen.',
    flow:'Du kannst sagen, was du spürst — das ist die halbe Arbeit.',
    spannung:'Du spürst früher, als du sagen kannst. Erst Körper, dann Worte.'},
  Saturn:{vor:'Struktur am Denken.',
    flow:'Du kannst ordnen, was kommt. Verlass dich darauf.',
    spannung:'Du prüfst zu hart und verwirfst zu früh. Schreib erst '+
      'alles auf, urteile später.'}},

 /* ── Neptun: wie viel Form ───────────────────────────────── */
 formKopf:'Wie viel Form du brauchst',
 formIn:'in',
 formLeicht:'Dein Planet für alles Unscharfe steht in',
 formHaus:'Er steht {t}',
 formGefaessKopf:'Das Gefäß ist Pflicht, nicht Kür',
 formGefaess:'Neptun steht bei dir in Spannung zu {wer}. Das ist die '+
   'Stelle, an der es ohne Form kippt — entweder zu viel Glauben oder '+
   'plötzlich gar keiner, {sonne}Deshalb: feste Uhrzeit, festes Heft, '+
   'feste Länge. Nicht aus Strenge — als Schutz.',
 formGefaessSonne:'und mit der Sonne dabei auch das Gefühl, wer du '+
   'eigentlich bist. ',
 formPaar:'{k} ({typ}, {orb}°)',
 formFreiKopf:'Du hast Spielraum',
 formFrei:'Neptun steht bei dir frei von harten Winkeln zu den '+
   'persönlichen Planeten. Du kannst mit offenen Formen arbeiten, ohne '+
   'dich zu verlieren. Die Form ist bei dir Komfort, nicht Notwehr.',

 /* ── Glaube: das 9. Haus ─────────────────────────────────── */
 glaubeKopf:'Woran du glaubst — und wo das gemacht wird',
 glaubeIst:'ist {deinHaus} · Herrscher',
 glaubeLeicht:'Dein Glaubensbereich gehört',
 glaubeModern:'Modern wird {zeichen} auch {pl} zugeordnet ({stellung}, '+
   '{hausPunkt}). Diese Seite rechnet klassisch, aber beides zusammen '+
   'gelesen ergibt oft das vollständigere Bild.',
 glaubeLeer:'{DeinHaus} ist leer. Das heißt nicht, dass du nicht glaubst — '+
   'es heißt, dass dein Glaube nicht an einem Ort sitzt, sondern dort '+
   'gemacht wird, wo {pl} steht: {imHaus}.',
 glaubeBew:'Im {n}. Haus selbst steht {wer} — da arbeitet dein Glaube '+
   'unmittelbar, nicht über einen Umweg.',

 /* ── Sekte: Tag- oder Nachtchart ─────────────────────────── */
 sekteKopf:'Deine Sekte',
 sekteTech:'Sonne {imHaus}, also {wo} dem Horizont',
 sekteUeber:'über',
 sekteUnter:'unter',
 sekteLeicht:'du bist {wann} geboren',
 sekteTag:'bei Tageslicht',
 sekteNacht:'nach Sonnenuntergang',
 sekteWarnKopf:'Die wacklige Stelle',
 sekteWo:'Bei dir steht {mal} in {stellung}, {imHaus}{wuerde}. ',
 sekteWuerdeDazu:', {w}',
 sekteImZwoelften:'<b>Und zwar im 12. Haus selbst</b> — genau in dem Feld, '+
   'um das es auf dieser Seite geht. Das ist die klarste Warnung, die dein '+
   'Chart hier ausspricht: Der Weg über {weg} ist bei dir nicht nur '+
   'unergiebig, er ist die Stelle, an der es trüb wird.',
 sekteWeg:{Mars:'Kraft, Zwang und Durchhalten',
   Saturn:'Strenge, Verzicht und Selbstdisziplin bis zur Härte'},
 sekteHerrscht:'<b>Und er herrscht über {deinHaus}</b> — das heißt, du '+
   'kommst nicht um ihn herum, sondern musst ihn mild halten: kurz, '+
   'dosiert, mit Pause.',
 sekteDraussen:'Er ist also nicht direkt am Verborgenen beteiligt. '+
   'Gut — halte ihn da auch raus.',

 /* ── Rhythmus: Mondzeichen und Mondphase ─────────────────── */
 rhyKopf:'Dein Rhythmus',
 rhyIn:'in',
 rhyLeicht:'Dein Mond steht in',
 rhyLaenge:'· deine Länge:',
 rhySaturn:'(Mond {typ} Saturn, {orb}°)',
 rhyPhaseKopf:'Mondphase bei der Geburt · {n}',
 rhyPhaseWinkel:'{grad}° zwischen Sonne und Mond — Phase {nr} von 8',
 rhyNeumond:'Der Neumond davor war am {datum} in {zeichen} — {abstand} '+
   'vor deiner Geburt.',
 rhyStunden:'{n} Stunden',
 rhyTage:'{n} Tage',

 /* ── Das 8. Haus und Chiron ──────────────────────────────── */
 tiefKopf:'Die dünne Stelle',
 tiefIst:'ist {deinHaus}',
 tiefLeicht:'Der Bereich der Übergänge gehört bei dir',
 tiefAlt:'In der alten Lehre ist das 8. Haus das Haus dessen, was man '+
   'nicht sieht und trotzdem erbt: der Toten, des Übergangs, des '+
   'Verschwiegenen. Wer mit Führung arbeitet, arbeitet hier.',
 tiefBew:'Dass {wer} dort {verb}, macht diese Stelle bei dir aktiv — sie '+
   'meldet sich, ob du willst oder nicht. Das ist ein Argument für eine '+
   'feste Form: nicht um es zu unterdrücken, sondern damit es einen '+
   'Platz hat.',
 tiefStehen:'stehen',
 tiefSteht:'steht',
 chironKopf:'Die Wunde am Empfangen · Chiron',
 chironStellung:'{stellung} · {hausPunkt}',
 chironSaturn:'Chiron steht dabei in Spannung zu Saturn ({typ}, {orb}°) — '+
   'das ist typischerweise die Erfahrung, einmal gesagt bekommen zu haben, '+
   'dass die eigene Wahrnehmung nicht zählt. Von außen, von jemandem mit '+
   'Autorität. Es ist nachvollziehbar, dass du dir selbst zuerst nicht '+
   'glaubst. Es ist aber nicht wahr.',

 /* ── Die Praxis, sieben Schritte ─────────────────────────── */
 prRahmen:'Rahmen',
 prOeffnen:'Öffnen',
 prAnker:'Anker',
 prFragen:'Fragen',
 prEmpfangen:'Empfangen',
 prSchliessen:'Schließen',
 prNachlesen:'Nachlesen',
 prRahmenT:'<b>{min}</b>, immer zur gleichen Zeit, immer am gleichen Ort. '+
   '{wann} Nicht länger — Länge ist bei dir kein Qualitätsmerkmal.',
 prTag:'Am Tag, im Hellen.',
 prNacht:'Abends oder nachts.',
 prAnkerT:'Ein Gegenstand, der <b>immer derselbe</b> ist: {anker}. Nicht '+
   'wechseln. Der Gegenstand macht die Arbeit der Erinnerung, nicht dein '+
   'Wille.',
 prFragenT:'Eine Frage, ausgeschrieben, oben auf die Seite. <b>Mit '+
   'Datum.</b> Offene Fragen („was braucht X") tragen weiter als '+
   'Ja-Nein-Fragen.',
 prEmpfangenT:'Es kommt bei dir {wie}. Nimm das erste, nicht das dritte — '+
   'das dritte hast du gemacht.',
 prSchliessenT:'Danken und aufhören. Ein Satz reicht. Dann etwas '+
   'Körperliches: Hände waschen, etwas essen, rausgehen. Ohne Abschluss '+
   'bleibt die Tür auf.',
 prNachlesenT:'Einmal im Monat, zum Neumond: Heft von vorn, mit Datum '+
   'danebenlegen. Was ist eingetroffen, was nicht. <b>Das ist der Teil, '+
   'der aus Gefühl Erfahrung macht</b> — und in der Tradition heißt er '+
   'Unterscheidung der Geister, nicht Skepsis.',
 prNameKopf:'Und wenn du dafür einen Namen brauchst',
 prName:'Ob du das, was antwortet, Führung nennst, Ahnen, höheres Selbst, '+
   '{ch} oder einfach „das, was ich weiß, wenn ich still bin" — die '+
   'Tradition schreibt dir das nicht vor, und dein Chart auch nicht. Was '+
   'dein Chart vorschreibt, ist der <b>Stoff</b>: {stoff}. Daran musst du '+
   'dich halten, nicht an eine Bezeichnung.',

 /* ── Deine Zeiten, live ──────────────────────────────────── */
 ztJetzt:'Jetzt',
 ztStunde:'Stunde {gen}',
 ztTagesherr:'Tagesherr: {herr} · bis {bis}',
 ztPolar:'Planetenstunden gibt es an diesem Ort gerade nicht — die Sonne '+
   'geht nicht auf oder nicht unter.',
 ztChartherrscher:'Chartherrscher',
 ztTuer:'Tür',
 ztRolle:'{rolle} · {pl}',
 ztLaeuft:'Nächste Stunde läuft jetzt',
 ztAb:'Nächste Stunde ab {uhr}',
 ztKeine:'heute keine mehr',
 ztTag:'Tag: {wotag}',
 ztNeumondKopf:'Nächster Neumond',
 ztNeumondWann:'{datum} in {zeichen}',
 ztNeumondSonne:'in deinem Sonnenzeichen',
 ztNeumondMond:'in deinem Mondzeichen',
 ztNeumondHaus:'in {deinHausDat}',
 ztRueckblick:'Rückblick-Termin',
 ztMondKopf:'Mond im 12.',
 ztMondJetzt:'jetzt — in {zeichen}',
 ztMondJetztDazu:'die stillste Zeit im Monat, zweieinhalb Tage lang',
 ztMondBald:'in etwa {n} Tagen',
 ztMondBaldDazu:'{zeichen} · jeden Monat zweieinhalb Tage',

 /* ── Ohne Profil ─────────────────────────────────────────── */
 leer:'Noch kein Profil angelegt. <a href="profile.html">Hier legst du '+
   'eins an</a> — ohne Geburtszeit und Geburtsort kann diese Seite nichts '+
   'rechnen, weil alles hier an den Häusern hängt.'
};

/* Die Zeichen stehen einmal: Name und Schriftzeichen zusammen. */
var GT_ZEICHEN = [
 {n:'Widder',     z:'♈'}, {n:'Stier',     z:'♉'},
 {n:'Zwillinge',  z:'♊'}, {n:'Krebs',     z:'♋'},
 {n:'Löwe',       z:'♌'}, {n:'Jungfrau',  z:'♍'},
 {n:'Waage',      z:'♎'}, {n:'Skorpion',  z:'♏'},
 {n:'Schütze',    z:'♐'}, {n:'Steinbock', z:'♑'},
 {n:'Wassermann', z:'♒'}, {n:'Fische',    z:'♓'}];

/* Die vier Elemente als Schlüssel in die Inhaltstafeln. */
var GT_ELEMENTE = ['Feuer', 'Erde', 'Luft', 'Wasser'];
