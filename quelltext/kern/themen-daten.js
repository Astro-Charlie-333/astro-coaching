/* ── Die großen Themen ────────────────────────────────────────
   Mandy am 28.10.:

     „also auch Themen enthalten wie merkur rückläufig venus
      rückläufig etc? Sowas halt. Das sind die themen die es
      spannend machen und wann der nächste vollmond oder neumond
      ist oder kazimi und was sowas bei einem macht. Also solch
      themen sind alle nicht mehr vorhanden gewesen."

   Sie hatte recht, und die Ursache ist unangenehm: Die Rechnung
   kannte das alles längst. `jetztRueck()` weiß seit Monaten, welche
   Planeten rückwärts laufen, `STATIONSATZ` hat fertige Sätze dazu,
   `lunationen()` findet jeden Neu- und Vollmond. Gezeigt wurde
   davon nichts — die Seite machte aus „Merkur wird rückläufig" ein
   „Es wird zäher: Kommunikation".

   Das war ein Missverständnis der Grundregel. „Inhalt vor
   Maschinenraum" heißt: nicht mit Gradzahlen anfangen. Es heißt
   nicht, die Namen wegzulassen, unter denen die Leute die Sachen
   kennen. „Merkur rückläufig" ist kein Fachwort — es ist die
   Überschrift. REGELN.md Abschnitt 2 sagt das jetzt auch so.

   Jeder Eintrag hier hat vier Teile:

     was    — was dieses Thema überhaupt ist, in Alltagssprache
     tut    — was es im Leben macht, konkret genug zum Nachprüfen
     gut    — wofür der Zeitraum taugt. Nicht „meide X", sondern
              „dafür ist es gut". Angst verkauft, gehört aber nicht
              hierher (PRODUKT.md Abschnitt 5).
     dazu   — die Einordnung, die sonst niemand mitliefert: was an
              der verbreiteten Erzählung übertrieben ist.
*/

/* Rückläufige Planeten. Die drei schnellen bekommen einen eigenen
   Eintrag — sie betreffen den Alltag und wechseln oft genug, dass
   es eine Nachricht ist. Die langsamen laufen fünf Monate im Jahr
   rückwärts; daraus eine Schlagzeile zu machen wäre unehrlich. */
var T_RUECK = {
 Merkur:{
  name:'Merkur rückläufig',
  schnell:true,
  was:'Merkur steht für zwei Dinge, die zusammengehören: wie du redest, und was ihr miteinander abmacht. Dazu alles, was Sachen von A nach B bringt — Technik, Post, Wege. Dreimal im Jahr läuft er für etwa drei Wochen scheinbar rückwärts.',
  tut:'Vier Ecken, an denen es in diesen Wochen klemmt:',
  felder:[
   ['Reden','Du sagst etwas, und es kommt anders an. Nicht falsch verstanden — anders gewichtet.'],
   ['Absprachen','Wer was bis wann macht, war klar und ist es plötzlich nicht mehr. Termine verschieben sich doppelt.'],
   ['Technik','Das Telefon spinnt, die Datei ist weg, das Update kommt zum schlechtesten Moment. Ein Backup ist in diesen Wochen keine Paranoia.'],
   ['Unterwegs','Anschlüsse werden knapp, Schlüssel bleiben drin, Adressen stimmen nicht. Eine halbe Stunde Puffer spart mehr Nerven, als sie kostet.']],
  gut:'Alles mit „wieder": wieder aufnehmen, wieder lesen, wieder hinsetzen, wieder melden. Was liegengeblieben ist, geht in diesen Wochen leichter von der Hand als etwas Neues.',
  dazu:'Was im Netz daraus gemacht wird, ist meist zu groß. Verträge sind in diesen drei Wochen genauso gültig wie sonst, Flüge fallen nicht messbar häufiger aus, und wer jetzt kündigt, bereut es nicht öfter als im Juli. Was näher dran ist: Du liest zweimal und fragst einmal nach — und das ist selten verkehrt, egal wie Merkur läuft.'},
 Venus:{
  name:'Venus rückläufig',
  schnell:true,
  was:'Venus steht für das, was dir nah ist und was du dir wert bist — Beziehungen, Geschmack, Geld, und auch dein Verhältnis zum eigenen Aussehen. Alle anderthalb Jahre läuft sie für sechs Wochen rückwärts.',
  tut:'Drei Ecken, an denen sich in diesen Wochen etwas verschiebt:',
  felder:[
   ['Alte Namen','Jemand meldet sich, an den du länger nicht gedacht hast. Oder du denkst an jemanden und greifst fast zum Telefon.'],
   ['Geschmack','Etwas, das lange selbstverständlich war, gefällt dir plötzlich nicht mehr — oder umgekehrt.'],
   ['Was es dir wert ist','Preise, Zusagen, Gehalt: Du merkst, wo du dich unter Wert verkauft hast. Manchmal erst, wenn es schon gesagt ist.']],
  gut:'Nachsehen, was du eigentlich willst, bevor du es wieder vergisst. Alte Beziehungen anschauen, ohne sofort etwas daraus machen zu müssen. Zahlen noch einmal prüfen, bevor du zusagst.',
  dazu:'Der verbreitete Rat lautet, jetzt gar nichts zu entscheiden und niemandem zu antworten. Das ist für sechs Wochen zu viel verlangt und auch nicht nötig. Näher dran: Entscheidungen aus diesen Wochen halten seltener — nicht, weil etwas schiefgeht, sondern weil sich die Frage danach oft anders stellt.'},
 Mars:{
  name:'Mars rückläufig',
  schnell:true,
  was:'Mars ist der Antrieb — womit du anfängst, wofür du streitest, und wie viel Kraft du draufsetzt. Alle zwei Jahre läuft er für gut zwei Monate rückwärts.',
  tut:'Die Kraft geht nach innen, bevor sie wieder nach außen geht:',
  felder:[
   ['Anfangen','Du fängst etwas an und verlierst nach drei Tagen die Lust. Das liegt nicht an dir.'],
   ['Ärger','Er kommt verspätet und dann an der falschen Stelle heraus — meist bei jemandem, der nichts dafür kann.'],
   ['Körper','Weniger Druck beim Training, mehr Wert auf Erholung. Wer in dieser Zeit etwas erzwingt, zahlt es hinterher.']],
  gut:'Überarbeiten statt anfangen. Und: herausfinden, worüber du dich eigentlich ärgerst, bevor du es jemandem sagst.',
  dazu:'Das ist die unangenehmste der drei und zugleich die seltenste — alle zwei Jahre, dafür dann wirklich lang. Was hier nicht steht: dass du in dieser Zeit nichts Neues anfangen „darfst". Du merkst nur deutlicher, was dir ohnehin schwerfällt.'},
 Jupiter:{name:'Jupiter rückläufig', schnell:false,
  was:'Jupiter steht für Wachstum und dafür, wie weit du gehst.',
  tut:'Die großen Pläne gehen in die Prüfung statt in die Umsetzung.',
  gut:'Noch einmal nachrechnen, ob das Vorhaben wirklich trägt.',
  dazu:'Jupiter läuft jedes Jahr vier Monate rückwärts. Das ist kein Ereignis, das ist ein Takt.'},
 Saturn:{name:'Saturn rückläufig', schnell:false,
  was:'Saturn steht für Struktur und dafür, was hält.',
  tut:'Etwas, das du aufgebaut hast, wird noch einmal auf Tragfähigkeit geprüft.',
  gut:'Nachbessern, wo es wackelt — solange es noch billig ist.',
  dazu:'Saturn läuft jedes Jahr viereinhalb Monate rückwärts. Auch das ist ein Takt, keine Nachricht.'},
 Uranus:{name:'Uranus rückläufig', schnell:false,
  was:'Uranus steht für den Bruch mit dem, wie es bisher war.',
  tut:'Der Veränderungsdruck wird innerlich, bevor er wieder sichtbar wird.',
  gut:'Dir ausmalen, was du ändern würdest, ohne es sofort zu tun.',
  dazu:'Fünf Monate im Jahr. Normalzustand, kein Ausnahmezustand.'},
 Neptun:{name:'Neptun rückläufig', schnell:false,
  was:'Neptun steht für das, was unscharf bleibt.',
  tut:'Etwas, das lange im Nebel lag, wird von innen noch einmal angeschaut.',
  gut:'Hinsehen, wo du dir etwas schöner erzählst, als es ist.',
  dazu:'Fünf Monate im Jahr.'},
 Pluto:{name:'Pluto rückläufig', schnell:false,
  was:'Pluto steht für den langen Umbau, den man nicht abbrechen kann.',
  tut:'Der Umbau geht nach innen weiter, auch wenn außen nichts passiert.',
  gut:'Nichts erzwingen. Das hier hat seine eigene Geschwindigkeit.',
  dazu:'Fünf Monate im Jahr.'}};

/* Die Zeile, mit der die langsamen zusammengefasst werden, statt
   fünf fast gleiche Karten zu bauen. */
var T_RUECK_LANGSAM = {
 vor:'Außerdem rückläufig, wie fast das halbe Jahr über:',
 nach:'Die äußeren Planeten laufen fünf Monate im Jahr rückwärts. Das ist ihr Takt und keine Nachricht — deshalb stehen sie hier klein.'};

/* Neumond und Vollmond. Beide stehen immer da, auch wenn sie noch
   Wochen hin sind: „wann ist der nächste Vollmond" ist eine Frage,
   auf die eine Astrologieseite jederzeit antworten können muss. */
var T_MOND = {
 neu:{
  name:'Neumond',
  was:'Der Mond steht genau bei der Sonne. Am Himmel ist nichts zu sehen — der dunkelste Punkt des Monats.',
  tut:'Der leiseste Punkt im Monat. Drei Ecken, an denen man das merkt:',
  felder:[
   ['Stimmung','Eher nach innen gerichtet als nach außen. Lust auf Gesellschaft ist in diesen Tagen oft gering, und das ist kein Rückzug im schlechten Sinn.'],
   ['Anfangen','Was du jetzt beginnst, fällt noch niemandem auf. Es hat zwei Wochen Zeit, bis es sichtbar wird — und die braucht es meistens auch.'],
   ['Schlaf','Die ruhigsten Nächte im Monatslauf, soweit sich das messen lässt. Wenn du lange schläfst, hol es dir.']],
  gut:'Anfangen statt abschließen. Einen Satz aufschreiben, was bis zum Vollmond passiert sein soll.'},
 voll:{
  name:'Vollmond',
  was:'Mond und Sonne stehen sich vom Himmel aus genau gegenüber, deshalb ist der Mond ganz beleuchtet. Der hellste Punkt des Monats, und sein Höhepunkt.',
  tut:'Der lauteste Punkt im Monat. Drei Ecken, an denen man das merkt:',
  felder:[
   ['Stimmung','Gefühle sind lauter als sonst, und Entscheidungen fallen schneller — nicht unbedingt besser. Was dich heute maßlos ärgert, ärgert dich übermorgen normal.'],
   ['Sichtbar','Was vor zwei Wochen angelegt wurde, zeigt sich jetzt. Oft auch gegenüber anderen, ohne dass du es vorhattest.'],
   ['Schlaf','In den Nächten davor schlafen Menschen messbar etwas später ein und kürzer. Der Effekt ist klein und hängt offenbar am Licht — mehr dazu unter „Schlaf und Bewegung".']],
  gut:'Abschließen statt anfangen. Und: eine Nacht darüber schlafen, bevor du etwas davon abschickst.'},
 inZeichen:'im Zeichen {zeichen}',
 beiDir:'Bei dir fällt er in den Bereich {bereich}.'};

/* Finsternisse. Eine Lunation nahe am Mondknoten. Die Erzählung
   drumherum ist groß; die ehrliche Fassung ist kleiner und
   trotzdem interessant. */
var T_FINSTERNIS = {
 sonne:{name:'Sonnenfinsternis',
  tut:'Ein Neumond mit mehr Gewicht. Was hier anfängt, fängt meist nicht sanft an — es wird eher etwas weggenommen, damit Platz entsteht.'},
 mond:{name:'Mondfinsternis',
  tut:'Ein Vollmond mit mehr Gewicht. Etwas kommt zum Ende, und zwar schneller, als dir lieb ist.'},
 vielleicht:'Knapp an der Grenze — ob daraus eine Finsternis wird, hängt an Bruchteilen eines Grades. Hier steht deshalb „möglich" und nicht „ist".',
 dazu:'Finsternissen wird nachgesagt, dass sie Schicksal machen. Was sich nachrechnen lässt: Sie kommen in Serien, immer paarweise, zweimal im Jahr. Was sie bei dir bedeuten, weißt nur du — und erst hinterher.'};

/* Kazimi und Verbrennung. Das Thema, das in Mandys Aufzählung
   stand und auf der Seite komplett fehlte. */
var T_SONNE = {
 kazimi:{
  name:'Kazimi — {planet} im Herzen der Sonne',
  was:'{planet} steht der Sonne so nah, dass zwischen beiden weniger als ein Drittel Grad liegt. Das dauert ein paar Stunden und kommt für jeden Planeten höchstens ein- bis dreimal im Jahr vor.',
  tut:'Die Überlieferung hält das für die stärkste Stellung, die ein Planet überhaupt haben kann: Der Planet sitzt im Thron statt im Feuer. Praktisch heißt das, dass das Thema dieses Planeten für ein paar Stunden ungewöhnlich klar dasteht.',
  gut:'Ein kleines Zeitfenster, in dem sich das Thema des Planeten gut ansehen lässt. Mehr muss man damit nicht machen.',
  dazu:'Kazimi ist eine klassische Lehre, keine gemessene Wirkung. Was stimmt: Die Stellung ist selten und auf die Stunde genau berechenbar.'},
 verbrannt:{
  name:'{planet} verbrannt',
  was:'{planet} steht weniger als 8,5° von der Sonne entfernt — so nah, dass man {planet} am Himmel im Licht nicht mehr sieht.',
  tut:'Klassisch gilt das als geschwächt: Das Thema ist da, aber es kommt nicht an. Was dieser Planet bei dir bedeutet, läuft in diesen Wochen eher im Hintergrund.',
  gut:'Nichts erzwingen, was an diesem Thema hängt. Es kommt von allein wieder heraus.',
  dazu:'„Verbrannt" klingt schlimmer, als es gemeint ist. Es heißt unsichtbar, nicht beschädigt.'},
 strahlen:{
  name:'{planet} unter den Strahlen',
  was:'{planet} steht weniger als 15° von der Sonne entfernt und geht fast gleichzeitig mit ihr auf.',
  tut:'Die Vorstufe zur Verbrennung. Das Thema tritt in den Hintergrund, ohne ganz zu verschwinden.',
  gut:'Abwarten, wenn es an diesem Thema hängt.',
  dazu:'Eine Feinheit aus der klassischen Astrologie, die die meisten Apps nicht kennen.'}};

/* ── Verschiebbares verschieben ───────────────────────────────
   Mandy am 28.10.: „dass man nicht unbedingt kosmetische eingriffe
   oder botox etc machen sollte."

   Der Rat ist verbreitet und gehört in der Überlieferung an zwei
   andere Stellen als die, an der er meist steht:

     Venus rückläufig — weil sich das Urteil darüber verschiebt,
       was man schön findet. Nicht das Ergebnis wird anders, der
       Maßstab wird es.
     Mars rückläufig — die klassische Regel für alles, was
       schneidet. Mars ist in der Überlieferung die Klinge.

   Merkur rückläufig ist für Verträge, Technik und Wege zuständig,
   nicht für den Körper.

   Dazu die Grenze, ohne die das hier nicht stehen dürfte: Es geht
   um Verschiebbares. Was medizinisch nötig ist, richtet sich nach
   der Ärztin und nach gar nichts sonst (PRODUKT.md Abschnitt 5). */
var T_SCHNITT = {
 Venus:{
  titel:'Kosmetisches lieber später',
  text:'Die Überlieferung rät in diesen Wochen von Dingen ab, die man wegen des Aussehens macht und auch in sechs Wochen noch machen könnte — Botox, Füller, größere Haarveränderungen, kosmetische Eingriffe. Der Grund ist nicht, dass etwas schiefgeht, sondern dass sich gerade dein Maßstab dafür verschiebt, was dir gefällt. Was du jetzt entscheidest, beurteilst du danach oft anders.'},
 Mars:{
  titel:'Nichts, was schneidet',
  text:'Für alles, was schneidet, gilt in der Überlieferung dasselbe: aufschiebbare Eingriffe lieber aufschieben, bis Mars wieder vorwärts läuft. Mars ist in dieser Lehre die Klinge, und rückwärts heißt: zweimal ansetzen.'},
 grenze:'Das gilt für Verschiebbares. Was medizinisch nötig ist, entscheidet deine Ärztin — nach dem Befund, nicht nach dem Himmel. Diese Seite ersetzt keine Beratung und rät nie davon ab, einen Termin wahrzunehmen.',
 beleg:'Das ist eine alte Wahlregel, keine gemessene Wirkung. Es gibt keine Studie, die zeigt, dass kosmetische Eingriffe zu diesen Zeiten schlechter ausgehen. Was die Regel beschreibt, ist etwas anderes und durchaus nachvollziehbar: dass man den eigenen Geschmack in bestimmten Phasen schlechter einschätzt.'};

/* Die Saturnrückkehr. Für die Zielgruppe aus PRODUKT.md Abschnitt 2
   das größte Thema überhaupt — zwischen 27 und 31 zum ersten Mal,
   zwischen 56 und 60 zum zweiten — und auf der Seite kam es bis zum
   28.10. kein einziges Mal vor, obwohl die Rechnung es kann. */
var T_SATURN = {
 name:'Deine Saturnrückkehr',
 was:'Saturn braucht rund 29 Jahre für eine Runde. Jetzt steht er wieder an der Stelle, an der er bei deiner Geburt stand — das passiert ein-, höchstens zweimal im Leben.',
 tut:'Was du aufgebaut hast, ohne es je entschieden zu haben, wird jetzt entschieden. Beziehungen, Arbeit, Wohnort: Was nur aus Gewohnheit weiterlief, hält diese Phase oft nicht aus.',
 gut:'Nachsehen, was davon wirklich deins ist. Was du in dieser Zeit behältst, behältst du bewusst — und das trägt danach anders.',
 dazu:'Im Netz wird daraus gern eine Katastrophe mit Ansage. Was stimmt: Die Phase dauert etwa zweieinhalb Jahre und fällt bei den meisten mit einem Lebensabschnitt zusammen, in dem ohnehin viel entschieden wird. Was nicht stimmt: dass sie etwas kaputt macht, das sonst gehalten hätte.',
 erste:'die erste', zweite:'die zweite', dritte:'die dritte',
 nummer:'{welche} — du bist {alter}',
 naht:'Beginnt {wann}',
 laeuft:'Läuft gerade'};

/* Die Überschriften des Abschnitts. */
var T_KOPF = {
 titel:'Die großen Themen',
 sub:'Die Sachen, die man beim Namen kennt — mit Zeitraum, und mit dem, was sie bei dir treffen.',
 nix:'Gerade läuft nichts von den großen Themen. Kein Planet rückwärts, keine Lunation in Sicht. Das kommt vor.',
 wannVor:'Zeitraum',
 nochTage:'noch {n} Tage',
 nochEinTag:'noch heute',
 inTagen:'in {n} Tagen',
 beiDirVor:'Bei dir',
 gutVor:'Gut dafür',
 dazuVor:'Was oft zu groß erzählt wird'};

/* ── Schlaf und Bewegung ──────────────────────────────────────
   Mandy am 28.10.:

     „mir fiel auf dass ich anhand des Mondes zB besser oder
      schlechter schlafe … bei mir stier mars 12 haus wenn da mond
      drin ist dann eher yoga als kraftsport … Wo man mehr auf
      schlaf wo mehr auf aktivität gehen oder sowas machen sollte.
      Welcher tag ist passend für was."

   Das ist der Abschnitt, in dem sich zwei Sorten Wissen begegnen,
   und beide werden hier getrennt ausgewiesen:

   GEMESSEN ist der Zusammenhang zwischen Mondphase und Schlaf.
   Casiraghi u.a. (Science Advances, 2021) haben drei Gemeinschaften
   in Argentinien über Monate vermessen: In den Nächten vor dem
   Vollmond schliefen die Menschen später ein und kürzer. Ohne
   elektrisches Licht 22 Minuten später und 25 Minuten kürzer, mit
   wenig Licht 22 und 19, in der Stadt 9 und 11. Dasselbe Muster
   fand sich bei 464 Studierenden in Seattle. Cajochen u.a.
   (Current Biology, 2013) fanden im Schlaflabor bei 33 Menschen
   um den Vollmond rund 20 Minuten weniger Schlaf, fünf Minuten
   längeres Einschlafen und 30 Prozent weniger Tiefschlafaktivität.
   Beide Arbeiten sind umstritten: Die Laborauswertung war nachträglich
   und nicht geplant, Replikationsversuche schlugen fehl, und es gibt
   die begründete Vermutung, dass Studien ohne Befund seltener
   veröffentlicht werden. Was bleibt: ein kleiner, mehrfach
   gefundener Effekt — und eine plausible Ursache, nämlich das Licht.

   ÜBERLIEFERT ist alles Übrige: dass der Mond im Erdzeichen zu
   anderem Training passt als im Feuerzeichen, dass ein Mond über
   dem eigenen Mars anders anfühlt. Dafür gibt es keine Messung,
   und das steht auch so da. */

var T_KOERPER = {
 titel:'Schlaf und Bewegung',
 sub:'Wo der Mond gerade steht — und was in deinem Bild er dabei berührt.',
 heuteVor:'Heute',
 schlafVor:'Schlaf',
 bewegungVor:'Bewegung',
 trefferVor:'Der Mond steht heute auf etwas von dir',
 gemessenTitel:'Was daran gemessen ist',
 gemessen:'Nur der Zusammenhang zwischen Mondphase und Schlaf, und auch der ist klein und umstritten. In den Nächten vor dem Vollmond schlafen Menschen etwas später ein und etwas kürzer — in einer argentinischen Feldstudie ohne elektrisches Licht rund 22 Minuten später und 25 Minuten kürzer, in der Stadt nur noch 9 und 11 Minuten. Je mehr künstliches Licht, desto kleiner der Effekt; das spricht dafür, dass es am Licht liegt und nicht am Mond als solchem. Eine Laborarbeit von 2013 fand Ähnliches, ließ sich aber nicht wiederholen.',
 ueberliefertTitel:'Was Überlieferung ist',
 ueberliefert:'Alles andere hier. Dass ein Erdmond zu ruhigem Training passt und ein Feuermond zu schnellem, dass ein Mond über deinem Mars sich anders anfühlt — das sind alte Zuordnungen, keine Messungen. Sie taugen als Vorschlag, den du an dir selbst prüfst. Merkst du nichts davon, hat dein Erleben recht.',
 selbstVor:'Prüf es an dir',
 selbst:'Das Interessante daran ist nicht, ob die Zuordnung stimmt, sondern ob sie bei dir stimmt. Notier dir zwei Monate lang in einem Satz, wie du geschlafen hast und wonach dir war. Danach weißt du mehr über dich, als jede Tabelle dir sagen kann.'};

/* Die vier Elemente, in Körpersprache statt in Astrologensprache. */
var T_ELEMENT = {
 feuer:{name:'Feuer', schlaf:'Du kommst abends schwerer runter, als dir lieb ist. Ein Abend ohne Bildschirm hilft mehr als früher ins Bett gehen.',
        bewegung:'Gut für alles Schnelle: laufen, tanzen, etwas, das Spaß macht und außer Atem bringt.'},
 erde:{name:'Erde', schlaf:'Der Schlaf ist eher tief und schwer. Gut möglich, dass du morgens länger brauchst, um wach zu werden.',
       bewegung:'Gut für alles Langsame mit Gewicht: Kraft, Wandern, lange Einheiten in gleichem Tempo.'},
 luft:{name:'Luft', schlaf:'Der Kopf macht abends weiter. Aufschreiben, was noch offen ist, wirkt besser als dagegen anzukämpfen.',
       bewegung:'Gut für alles Bewegliche und Gesellige: Radfahren, Kurse, Sport mit anderen.'},
 wasser:{name:'Wasser', schlaf:'Oft der beste Schlaf im Monat, dafür lebhaftere Träume. Mehr Schlaf als sonst ist hier keine Schwäche.',
         bewegung:'Gut für alles Weiche: Schwimmen, Dehnen, Yoga. Weniger gut für Bestzeiten.'}};

/* Was der Mond im eigenen Bild gerade berührt. Nur die Punkte, bei
   denen die Überlieferung etwas über Körper und Rhythmus sagt —
   nicht alle zehn, sonst steht jeden Tag irgendetwas da. */
/* Das Haus, nicht nur der Grad. Mandys eigenes Beispiel war
   „stier mars 12 haus wenn da mond drin ist" — das ist der
   Mondlauf durch das Haus, in dem ihr Mars steht, und dauert zwei
   bis drei Tage. Die genaue Begegnung auf den Grad dauert neun
   Stunden. Beides ist nützlich, und das Haus ist das häufigere. */
var T_MONDHAUS = {
 Mars:{was:'Der Mond läuft diese Tage durch den Bereich, in dem dein Mars steht.',
       tut:'Zwei bis drei Tage lang liegt dein Antrieb im Licht des Mondes. Manche merken das als Unruhe, manche als Lust auf Bewegung.',
       rat:'Wenn Training ansteht: eher das Weiche als das Schwere — dehnen, Yoga, Schwimmen statt Bestzeit. Und wenn dir doch nach Kraft ist, hat das Vorrang vor dieser Zeile.'},
 Saturn:{was:'Der Mond läuft diese Tage durch den Bereich, in dem dein Saturn steht.',
         tut:'Eine Phase, in der man sich selbst gegenüber leicht zu streng wird.',
         rat:'Weniger vornehmen. Ruhige Bewegung statt Leistungsmessung.'},
 Mond:{was:'Der Mond läuft diese Tage durch den Bereich, in dem er bei deiner Geburt stand.',
       tut:'Einmal im Monat kommt er dort vorbei. In der Überlieferung die Tage, an denen man am ehesten bei sich ist.',
       rat:'Auf dich hören statt auf den Plan. Was dir zu viel ist, ist dir wahrscheinlich wirklich zu viel.'}};

var T_MONDTREFFER = {
 Mars:{was:'Der Mond läuft heute über deinen Mars.',
       tut:'Antrieb und Bedürfnis liegen übereinander. Bei manchen kommt das als Tatendrang heraus, bei anderen als Gereiztheit — und bei vielen als beides nacheinander.',
       rat:'Wenn dir nach Kraft ist: gern. Wenn nicht, ist heute der Tag, an dem Dehnen oder Yoga mehr bringt als ein Programm durchzuziehen. Beides ist richtig; es kommt darauf an, was du merkst.'},
 Saturn:{was:'Der Mond läuft heute über deinen Saturn.',
         tut:'Die Überlieferung hält das für den schwersten Mondtag im Monat: weniger Elan, mehr Ernst, und eine Neigung, streng mit sich zu sein.',
         rat:'Heute weniger vornehmen und das Wenige fertig machen. Kein Tag für eine Leistungsmessung.'},
 Mond:{was:'Der Mond steht heute dort, wo er bei deiner Geburt stand.',
       tut:'Das passiert einmal im Monat. In der Überlieferung ist es der Tag, an dem du am ehesten bei dir selbst bist.',
       rat:'Ein guter Tag, um auf dich zu hören statt auf einen Plan. Was dir heute zu viel ist, ist dir wahrscheinlich wirklich zu viel.'},
 Sonne:{was:'Der Mond läuft heute über deine Sonne.',
        tut:'Was du willst und was du brauchst, zeigen in dieselbe Richtung — das ist selten und fühlt sich leicht an.',
        rat:'Ein guter Tag für etwas, das dir wichtig ist und das du sonst aufschiebst.'},
 Venus:{was:'Der Mond läuft heute über deine Venus.',
        tut:'Ein weicher Tag. Nähe, Essen, Schönes fallen leichter als Disziplin.',
        rat:'Gut für Bewegung, die sich gut anfühlt, statt für eine, die etwas beweist.'}};
