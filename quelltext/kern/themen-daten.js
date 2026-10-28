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
  was:'Merkur steht für Absprachen, Technik und alles Geschriebene. Dreimal im Jahr läuft er für etwa drei Wochen scheinbar rückwärts.',
  tut:'Nachrichten kommen anders an, als sie gemeint waren. Termine verschieben sich, Dateien sind weg, Gespräche, die du für geklärt hieltest, gehen noch einmal von vorn los.',
  gut:'Alles mit „wieder": wieder aufnehmen, wieder lesen, wieder hinsetzen. Was liegengeblieben ist, geht in diesen Wochen leichter von der Hand als etwas Neues.',
  dazu:'Was im Netz daraus gemacht wird, ist meist zu groß. Verträge gelten in diesen drei Wochen genauso wie sonst, und Flüge fallen nicht häufiger aus. Was stimmt: Du liest zweimal, und das ist selten verkehrt.'},
 Venus:{
  name:'Venus rückläufig',
  schnell:true,
  was:'Venus steht für das, was dir nah ist und was du dir wert bist — Beziehungen, Geschmack, Geld. Alle anderthalb Jahre läuft sie für sechs Wochen rückwärts.',
  tut:'Alte Namen tauchen wieder auf. Du stellst fest, dass dir etwas nicht mehr gefällt, das lange selbstverständlich war — oder umgekehrt, dass du etwas vermisst, das du abgeschrieben hattest.',
  gut:'Nachsehen, was du eigentlich willst, bevor du es wieder vergisst. Alte Beziehungen anschauen, ohne sofort etwas daraus machen zu müssen. Preise und Zusagen noch einmal prüfen.',
  dazu:'Der verbreitete Rat lautet, jetzt nichts zu entscheiden und niemandem zu antworten. Das ist zu viel verlangt für sechs Wochen. Näher dran: Entscheidungen aus diesen Wochen halten seltener, weil sich die Frage danach oft anders stellt.'},
 Mars:{
  name:'Mars rückläufig',
  schnell:true,
  was:'Mars ist der Antrieb — womit du anfängst und wofür du streitest. Alle zwei Jahre läuft er für gut zwei Monate rückwärts.',
  tut:'Die Energie geht nach innen. Du fängst Dinge an und verlierst nach drei Tagen die Lust. Ärger kommt verspätet und dann an der falschen Stelle heraus.',
  gut:'Überarbeiten statt anfangen. Und: zu merken, worüber du dich eigentlich ärgerst, bevor du es jemandem sagst.',
  dazu:'Das ist die unangenehmste der drei und zugleich die seltenste. Sie kommt nur alle zwei Jahre und dauert dann aber wirklich.'},
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
  tut:'Ein Anfang, der noch niemandem auffällt. Was du jetzt beginnst, hat zwei Wochen Zeit, bis es sichtbar wird.',
  gut:'Anfangen statt abschließen. Einen Satz aufschreiben, was bis zum Vollmond passiert sein soll.'},
 voll:{
  name:'Vollmond',
  was:'Mond und Sonne stehen sich vom Himmel aus genau gegenüber, deshalb ist der Mond ganz beleuchtet. Der hellste Punkt des Monats, und sein Höhepunkt.',
  tut:'Sichtbar wird, was vor zwei Wochen angelegt wurde. Gefühle sind lauter als sonst, Entscheidungen fallen schneller — nicht unbedingt besser.',
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
