/* ── Die Sätze des Dossiers ────────────────────────────────────
   Aufgabe 60, aus 34 und 38. Bis zum 2026-11-20 standen diese
   siebenundneunzig Zeichenketten in `dossier-app.js`, zwischen der
   Rechnung. Was in der Anzeige steht, zieht beim Umzug in eine
   andere Umgebung nicht mit (`PRODUKT.md` Abschnitt 7): Rechnen
   weiß nichts von Sätzen, und Sätze wissen nichts vom Himmel.

   Die Lücken heißen `{so}` und werden von `doFuell` gefüllt.
   `bau-dossier.py` zählt nach, dass jede Lücke, die hier steht,
   auch wirklich gefüllt wird — eine, die niemand füllt, stünde
   sonst als „{bezug}" auf der Seite.

   Die Scheidelinie: Hier steht jedes Wort, das ein Mensch liest,
   samt dem Markup, das zu diesem Wort gehört. In der Anzeige
   bleibt nur das Gerüst — Klassen, Tags, Zahlen aus der Rechnung.

   Dreierlei hängt hier nicht am Himmel, sondern an der Sprache und
   gehört deshalb hierher: das Geschlecht des Punktnamens (`pron`),
   der Name des Winkels (`winkel`) und die Form „7. Haus" (`haus`).
   Die Zahl kommt aus der Rechnung, das Wort steht hier — damit
   nirgends ein Hauptwort an eine Zahl geklebt wird (REGELN.md 6f). */
var DO_T = {

 /* ── Formen, die an einem Namen hängen ──────────────────── */

 /* Das Geschlecht des Punktnamens, damit „Venus … er" nicht
    passiert. Hängt am Wort, nicht am Chart. */
 pron:{Sonne:'sie',Mond:'er',Merkur:'er',Venus:'sie',Mars:'er',Jupiter:'er',
  Saturn:'er',Uranus:'er',Neptun:'er',Pluto:'er',Chiron:'er',Lilith:'sie'},

 /* Der Name des Winkels. Die Rechnung kennt nur den Schlüssel —
    Mechanik, also erst ab Stufe 2 sichtbar (REGELN.md 2a). */
 winkel:{konjunktion:'Konjunktion',opposition:'Opposition',
  quadrat:'Quadrat',trigon:'Trigon',sextil:'Sextil'},

 /* Das Haus: die Zahl rechnet, das Hauptwort steht hier. */
 haus:'{n}. Haus',

 /* Die eine Meldung, die kein Mensch auf der Seite liest: Sie
    steht hier, weil auch eine Werkstattmeldung ein Satz ist und die
    Anzeige keinen trägt. `doFuell` bricht damit ab, wenn eine Lücke
    ohne Wert ankommt. */

 /* Was zwischen zwei Angaben steht. */
 komma:', ',
 punkte:' · ',
 spannTrenner:'; ',

 /* ── Kopf ───────────────────────────────────────────────── */
 kopfLabel:'Bestandsbericht · {bezug}',
 kopfDatum:'{d}.{mo}.{y} · {h}:{mi} · {ort}',
 kopfSonne:'Sonne · Antrieb',
 kopfMond:'Mond · Bedürfnis',
 kopfAsz:'Aszendent · Wirkung',
 kopfHaus:'{n}. Haus · {kurz}',
 kopfHerr:'Herrscher {pl}',
 kopfHerrImHaus:'Herrscher {pl} im {n}.',

 /* ── 0 · Deine Stellung ─────────────────────────────────── */
 stellungTitel:'Deine Stellung',
 stellungSub:'Bevor irgendetwas gedeutet wird: was dein Verhältnis zu '+
   'dieser Person dir erlaubt — und wo es endet.',
 stellungDarfst:'Du darfst',
 stellungNicht:'Du darfst nicht',
 stellungGefahr:'Die typische Entgleisung',

 /* ── 1 · Wie die Person gebaut ist ──────────────────────── */
 bauTitel:'Wie diese Person gebaut ist',
 bauSub:'Die Grundanlage — als Einstieg, nicht als Urteil.',
 /* Je Element: was die Person tut. Reihenfolge wie ELN. */
 bauElement:['geht voran, braucht Tempo und verbraucht sich, wenn nichts passiert',
  'braucht Greifbares und Verlässlichkeit; Ideen ohne Umsetzung machen unruhig',
  'denkt und redet, bevor gefühlt wird — Austausch ist kein Luxus, sondern Bedarf',
  'nimmt auf, was im Raum ist, auch Unausgesprochenes'],
 /* Je Qualität: wie sie anfängt und aufhört. Reihenfolge wie MON. */
 bauMotus:['startet gern und verliert schnell die Lust',
  'braucht lange zum Anfangen und ist dann kaum zu stoppen',
  'passt sich an und wechselt die Richtung, bevor es eng wird'],
 bauGrundton:'<b>Grundton {element}, {motus}.</b> Die Person {tutElement}. '+
   'Und sie {tutMotus}. Am wenigsten ausgeprägt ist <b>{wenigsten}</b> — die '+
   'Qualität, die sie sich bewusst holen muss, weil sie nicht von allein kommt.',
 bauGewicht:'<b>Gewicht {lage}.</b> {text}',

 herrKopf:'<b>Chart-Herrscher {pl}</b>',
 herrImHaus:' im {n}. Haus ({titel})',
 herrWuerde:', <span class="ac-tech">{wuerde}</span>',
 herrSteuer:'. Das ist der Steuermann: Alles läuft praktisch über {ueber}. '+
   'Wenn du nicht weißt, wo du ansetzen sollst — dort.',
 herrPunkt:'diesen Punkt',
 herrDeut:' Und {pron} {deutung}.',

 zeileSonne:'Sonne in {zeichen}',
 zeileSonneT:'Will: {text}',
 zeileMond:'Mond in {zeichen}',
 zeileMondT:'Braucht: {text}',
 zeileAsz:'Aszendent {zeichen}',
 zeileAszT:'Wirkt {text}',

 sekteKopf:'<b>{name}.</b> {text}',
 sekteRaus:' Bei dieser Person steht {pl} im {n}. Haus — {titel}.',

 phase:'<b>Mondphase bei der Geburt: {name}.</b> Diese Person {text}',

 /* ── 2 · Umgang ─────────────────────────────────────────── */
 umgangTitel:'Umgang',
 umgangSub:'Drei Stellungen, die im Alltag mehr entscheiden als das '+
   'Sonnenzeichen: wie man redet, woran man Zuneigung erkennt, und wie '+
   'Wut aussieht.',
 /* Woran man die Stellung im Alltag merkt, je Punkt. */
 umgangLab:{Merkur:'Reden',Venus:'Mag etwas',Mars:'Wird wütend'},
 umgangZeile:'{pl} in {zeichen}',
 umgangWuerde:' <i class="ac-tech">{wuerde}</i>',
 umgangText:'<b>{lab}:</b> {text}',

 mondKopf:'Der Mond — in diesem Verhältnis {ist}',
 /* Nicht kleinschreiben — die Tafel beginnt mit Substantiven. */
 mondStellung:'<b>{zeichen}, {n}. Haus ({titel}).</b> '+
   'Was hier Sicherheit schafft: {text}',
 mondTun:'Also konkret',

 /* ── 3 · Kernthemen ─────────────────────────────────────── */
 themenTitel:'Kernthemen',
 themenSub:'Gewichtet nach Planeten in den Häusern, Herrscherlage, engen '+
   'Aspekten und Achsennähe — und dann noch einmal danach, in welchem '+
   'Verhältnis du zu dieser Person stehst.',
 themenWarum:'<b>Umgewichtet für „{bezug}"</b>{warum}',
 balkenHoch:' <i class="hoch" title="durch den Bezug höher gewichtet">↑</i>',
 balken:'<div class="bar"><i class="{leise}" style="width:{breite}%"></i></div>',
 kernNr:'Kernthema {i} · Gewicht {g}',
 kernHoch:' · durch den Bezug angehoben',
 /* Der Hinweis ist aus der Coaching-Praxis geschrieben. In privaten
    Bezügen bleibt er brauchbar, aber er heißt dann nicht „arbeiten". */
 hebel:{klientin:'Wie du hier arbeitest:',selbst:'Dein Hebel:'},
 hebelSonst:'Der Hebel — aus der Coaching-Praxis, auch privat brauchbar:',
 belPlanet:'{pl} im {n}.',
 belAspekt:'{a} {typ} {b} {orb}°',
 belAchse:'{pl} auf {zu}',
 raumLink:' <a href="{s}">Raum öffnen →</a>',

 /* ── 4 · Die Häuser ────────────────────────────────────── */
 haeuserTitel:'Die Häuser, die euer Verhältnis tragen',
 haeuserSub:'Nicht jedes Haus geht dich etwas an. Diese schon — sie sind '+
   'es, in denen sich ein Verhältnis dieser Art abspielt.',
 hausZeichen:'{glyphe} {zeichen} · Herrscher {pl}',
 hausZeichenHaus:'{glyphe} {zeichen} · Herrscher {pl} im {n}.',
 hausLeer:'<i>leer — läuft über {pl} im {n}. Haus</i>',
 punkteKopf:'<b>Über diese Stellungen läuft bei „{bezug}" das Verhältnis:</b>',
 punktZeile:'<b>{pl} in {zeichen}</b>',
 punktHaus:', {n}. Haus',
 punktWuerde:' <span class="ac-tech">— {wuerde}, {pron} {deutung}</span>',

 /* ── 5 · Wo es klemmt ──────────────────────────────────── */
 klemmtTitel:'Wo es klemmt',
 klemmtSub:'Saturn, Chiron und die engsten harten Aspekte — gelesen für '+
   'dein Verhältnis zu dieser Person.',
 stellPl:'{pl} in {zeichen}',
 stellHaus:'{n}. Haus · {titel}',
 saturnTech:'Sachlich: Der Beweisdruck sitzt in {titel}. Was diese Person '+
   'dort tut, macht sie gründlich und selten mit dem Gefühl, dass es reicht.',
 /* Was der äußere Punkt in eine harte Verbindung mitbringt. */
 hartDeut:{Saturn:'Druck und Begrenzung',Pluto:'Macht und Intensität',
  Uranus:'Unruhe und Abbruch',Neptun:'Unschärfe und Auflösung'},
 spannKopf:'<b>Die engsten Spannungen:</b> ',
 spannZeile:'{a} {typ} {b} <span class="ac-grad">({orb}°)</span> — '+
   '{deut} trifft auf {a2}',
 spannSchluss:'. Diese Achsen lösen sich nicht auf. Die Arbeit besteht '+
   'darin, beide Seiten abwechselnd zu bedienen, statt eine gewinnen zu lassen.',

 /* ── 6 · Belastungsmuster ──────────────────────────────── */
 musterTitel:'Hinweise auf Belastungsmuster',
 musterSub:'Keine Diagnosen. Konstellationen, die erfahrungsgemäß mit '+
   'bestimmten Alltagsschwierigkeiten einhergehen — brauchbar als Frage, '+
   'nicht als Befund.',
 musterZeile:'<b>{name}</b><span class="q ac-tech">{a} {typ} {b} '+
   '<span class="ac-grad">{orb}°</span></span>{text}',
 musterVerdeckt:'<b>Vieles läuft verdeckt</b><span class="q ac-tech">{wer} '+
   'im {n}. Haus</span>Energie wird verbraucht, ohne dass die Person es '+
   'bemerkt — Erschöpfung kommt plötzlich statt angekündigt.',

 /* ── 7 · Konflikt, Einstiege, Grenze ───────────────────── */
 schwierigTitel:'Wenn es schwierig wird',
 schwierigTun:'Was hilft',
 einstiegTitel:'Gesprächseinstiege',
 einstiegSub:'Drei Fragen, die zu diesem Verhältnis passen — nicht zu jedem.',
 grenzeTitel:'Die Grenze',

 /* ── Wahl und leere Lage ───────────────────────────────── */
 bezugFrage:'In welchem Verhältnis stehst du zu dieser Person?',
 rechenFehler:'Chart ließ sich nicht rechnen.',
 leer:'Noch kein Profil angelegt. <a href="profile.html">Hier legst du '+
   'eins an</a> — ohne Geburtszeit und Geburtsort kann das Dossier nichts '+
   'rechnen, weil alles an den Häusern hängt.'
};
