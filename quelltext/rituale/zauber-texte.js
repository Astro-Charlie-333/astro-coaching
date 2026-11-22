/* ── Die Sätze der Zauberseite ─────────────────────────────────
   Aufgabe 58, aus 34 und 38. Bis zum 2026-11-18 standen diese
   siebenundneunzig Zeichenketten in `zauber-app.js`, zwischen der
   Rechnung. Was in der Anzeige steht, zieht beim Umzug in eine
   andere Umgebung nicht mit (`PRODUKT.md` Abschnitt 7): Rechnen
   weiß nichts von Sätzen.

   Die Lücken heißen `{so}` und werden von `zFuell` gefüllt.
   `bau-zauber.py` zählt nach, dass jede Lücke, die hier steht, auch
   wirklich gefüllt wird — eine, die niemand füllt, stünde sonst als
   „{bereich}" auf der Seite.

   „dein" steht hier in gewachsenen Sätzen („deine Geburtsdaten",
   „Dein Tag"): feste Wörter, deren Geschlecht sich nicht ändert. Wo
   die Seite „dein" vor etwas setzt, das wechselt, steht eine Lücke,
   und die Form bildet `B_BEUGE` aus `kern/bahn-daten.js` — die eine
   Stelle, die ein Geschlecht kennt.

   ── Zwei Formen, die sich mit dem Planeten ändern ──
   Beide standen hier falsch, und beide fielen nur an bestimmten
   Tagen auf:

     1 · „der Tag des Sonne". Die Genitivtabelle `gen` gibt es seit
         dem ersten Tag der Seite, und sie wurde an einer von zwei
         Stellen benutzt. Die andere klebte den Namen hinter „des" —
         sonntags, montags und freitags stand dort die falsche Form,
         an den übrigen vier Tagen die richtige.
     2 · „Sonnestunde". Die Anzeige hängte „stunde" an den Namen des
         Stundenherrschers. Für sechs der sieben geht das auf; die
         Sonne braucht ein Fugen-n.

   Dieselbe Fehlerklasse wie bei „dein" (`REGELN.md` 6f): Jede Form,
   die sich mit dem eingesetzten Wort ändert, braucht ihre eigene
   Tabelle — eine Tabelle für einen Fall deckt den anderen nicht.
   Deshalb stehen beide Formen hier ausgeschrieben, und
   `bau-zauber.py` hält sie gegen feste Beispiele und lässt keinen
   Artikel und keine Endung mehr an eine Lücke heran. */
var ZT_T = {

 /* ── Formen, die am Planeten hängen ──────────────────────── */

 /* Genitiv mit Artikel: „Stunde der Sonne", „der Tag des Mondes". */
 gen:{Sonne:'der Sonne', Mond:'des Mondes', Merkur:'des Merkur',
      Venus:'der Venus', Mars:'des Mars', Jupiter:'des Jupiter',
      Saturn:'des Saturn'},

 /* Das zusammengesetzte Wort, ganz. Nicht Name plus Endung:
    „Sonnenstunde" trägt ein Fugen-n, das keine Regel aus dem Namen
    ableitet. */
 stunde:{Sonne:'Sonnenstunde', Mond:'Mondstunde', Merkur:'Merkurstunde',
         Venus:'Venusstunde', Mars:'Marsstunde', Jupiter:'Jupiterstunde',
         Saturn:'Saturnstunde'},

 /* Das Haus steht an acht Stellen im Text. Es steht hier einmal,
    mit seinem Geschlecht — „dein 5. Haus" bildet damit B_BEUGE und
    nicht die Anzeige. */
 haus:{g:'s', wort:'{n}. Haus'},

 /* ── Jetzt: Planetentag, Planetenstunde, Mond ─────────────── */
 jzKopf:'Jetzt',
 jzPolarGross:'Planetenstunden gibt es hier gerade nicht',
 jzPolar:'<p>An diesem Ort geht die Sonne zurzeit nicht auf oder nicht unter. '+
   'Planetenstunden teilen den Tag zwischen Sonnenauf- und -untergang — ohne '+
   'die beiden gibt es nichts zu teilen.</p>',
 jzJetzt:'Jetzt gerade',
 jzStunde:'Stunde {gen}',
 jzStundeSatz:'<p>{kurz}. Diese Stunde läuft noch bis <b>{bis}</b>, dann '+
   'übernimmt {naechster}.</p>',
 jzTagSatz:'<p>Heute ist <b>{tag}</b>, der Tag {gen} — das färbt alle 24 '+
   'Stunden. Es ist die {nr}. Stunde seit Sonnenaufgang{nacht}, sie dauert '+
   '{min} Minuten.</p>',
 jzNacht:' (Nachtstunde)',
 jzMond:'Mond',
 jzMondZeichen:'{glyphe} {zeichen}',
 jzMondHaus:'<br>{deinHaus}',
 jzSonne:'Sonne',
 jzSonneZeit:'auf {auf} · unter {unter}',
 jzOrt:'<br>{ort}',
 jzLauf:'Mond ohne Lauf',
 jzLaufJa:'ja, seit {seit}<br>bis {bis}',
 jzLaufNein:'nein<br>Wechsel {bis}',
 jzLeer:'<b>Der Mond läuft gerade leer.</b> Seit seinem letzten Aspekt '+
   '({winkel} zu {planet} um {zeit}) berührt er bis zum Zeichenwechsel nichts '+
   'mehr. Die Überlieferung ist hier ungewöhnlich einhellig: <b>nichts Neues '+
   'anfangen</b>. Was jetzt beginnt, verläuft im Sand — was jetzt endet, endet '+
   'gut. Vorbei ist es {bis} Uhr, dann tritt der Mond in {zeichen}.',

 /* ── Die Stundentafel ─────────────────────────────────────── */
 tfLeer:'An diesem Ort geht die Sonne gerade nicht auf oder unter.',
 tfFuss:'Von Sonnenaufgang bis Sonnenaufgang. Die Stunden sind ungleich lang — '+
   'im Sommer dauert eine Tagstunde deutlich länger als eine Nachtstunde, im '+
   'Winter umgekehrt. Dunkel hinterlegt sind die Nachtstunden.',

 /* ── Die sieben Planeten als Werkstoff ────────────────────── */
 plMeta:'{tag} · {metall}',
 plKurz:'<p><b>{kurz}.</b> {fuer}.</p>',
 plTransit:'Läuft gerade durch {zeichen}',
 plTransitHaus:'Läuft gerade durch {zeichen} — bei dir das {haus}: {feld}',
 /* Die Karte bringt ihre Hülle mit: „pl-dein" ist eine Klasse, und
    eine Klasse mit „dein" darin gehört nicht in die Anzeige — dort
    riegelt pruefe_anzeige_ohne_dein jedes „dein" ab, ohne nach
    Klasse oder Satz zu fragen. */
 plNatal:'<div class="pl-dein"><b>Bei dir geboren in {zeichen}</b>, im '+
   '{haus}.{schmack}</div>',
 plSchmack:' {satz} <i>Was bei dir nicht trägt: {nicht}.</i>',
 plFarben:'Farben',
 plZutaten:'Zutaten',
 plSteine:'Steine',

 /* ── Wofür du gerade arbeitest ────────────────────────────── */
 zUnd:' und ',
 zWann:'<b>Wann:</b> {wann}',
 zJetzt:'Es ist <b>gerade</b> {stunde}, noch bis {bis}. Wenn du eins davon '+
   'machen willst, dann jetzt.',
 zDein:'<div class="z-dein"><b>Bei dir gerade:</b> {planet} läuft durch '+
   '{zeichen}, {deinHaus} — '+
   '{feld}. Dorthin gehört das Thema im Moment, auch wenn du eigentlich an '+
   'etwas anderes gedacht hast.',
 zKlang:' <br><br><b>Und wie es bei dir klingen muss:</b> {satz}',
 zFaden:'<br><br><b>{deinZielhaus}</b> steht in {zeichen}, Herrscher ist '+
   '{herr} — bei dir in {herrZeichen}, im {herrHaus}. Das ist der Faden, an '+
   'dem dieses Thema bei dir hängt.',
 zLeer:'Ohne Chart bleibt es allgemein. Unter <a href="profile.html">Profile</a> '+
   'deine Geburtsdaten anlegen — dann steht hier, durch welches deiner Häuser '+
   '{planet} gerade läuft und wie ein Ritual bei dir klingen muss.',
 zZutaten:'Zutaten',
 zSteine:'Steine',
 zMond:'Mond',

 /* ── Zutaten und Steine ───────────────────────────────────── */
 filterAlle:'alle',
 filterPlanet:'{glyphe} {planet}',
 stWasserJa:'Wasser ja',
 stWasserNein:'kein Wasser',
 stSonneJa:'Sonne ja',
 stSonneNein:'bleicht in der Sonne',
 pfReinigen:'Reinigen',
 pfLaden:'Aufladen',
 pfWaehlen:'Aussuchen',

 /* ── Dein eigener Draht ───────────────────────────────────── */
 dtLeer:'<b>Hier würde dein eigener Faden stehen.</b><br><br>Welcher Planet '+
   'dich regiert, welcher Stein deiner ist, in welcher Stunde du am stärksten '+
   'arbeitest — dafür brauche ich einmal deine Geburtsdaten. '+
   '<a href="profile.html">Chart anlegen</a>',
 dtGross:'Dein Planet ist {herr}',
 dtSatz:'<p>Dein Aszendent steht in {zeichen}, und {zeichen} wird von {herr} '+
   'regiert. Damit ist {herr} dein <b>Chartherrscher</b> — der Planet, durch '+
   'den bei dir alles andere läuft. Bei dir steht er in {herrZeichen}, im '+
   '{herrHaus}.</p>',
 dtTag:'Dein Tag',
 dtTagSatz:'<span>Was du an diesem Tag anfängst, hat den kürzesten Weg.</span>',
 dtMetall:'Dein Metall',
 dtFarben:'Deine Farben',
 dtSteine:'Deine Steine',
 dtZutaten:'Deine Zutaten',
 dtLichter:'Sonne und Mond',
 dtLichterSatz:'Sonne im {sonne}, Mond im {mond}',
 dtFuss:'Der erste Stein, den du dir zulegst, wenn du einen aussuchen willst '+
   'statt auf einen zu warten: <b>{stein}</b>. Nicht weil er der stärkste '+
   'wäre, sondern weil er zu dem Planeten gehört, der bei dir ohnehin alles '+
   'durchläuft.',
 dtKeinStein:'Bergkristall',

 /* ── Profilwahl ───────────────────────────────────────────── */
 pwLabel:'Profil',
 pwEigen:' (ich)'
};

/* Die zwölf Zeichen mit ihrem Schriftzeichen. Die Reihenfolge ab
   Widder ist die Rechnung, nicht der Geschmack — `bau-zauber.py`
   hält sie dagegen. */
var ZT_ZEICHEN = [
 {n:'Widder',     z:'♈'}, {n:'Stier',      z:'♉'},
 {n:'Zwillinge',  z:'♊'}, {n:'Krebs',      z:'♋'},
 {n:'Löwe',       z:'♌'}, {n:'Jungfrau',   z:'♍'},
 {n:'Waage',      z:'♎'}, {n:'Skorpion',   z:'♏'},
 {n:'Schütze',    z:'♐'}, {n:'Steinbock',  z:'♑'},
 {n:'Wassermann', z:'♒'}, {n:'Fische',     z:'♓'}];
