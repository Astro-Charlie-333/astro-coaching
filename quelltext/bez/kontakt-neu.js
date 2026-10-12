/* Astro-Charlie · Beziehung — die Kontakte zwischen zwei Charts
   ------------------------------------------------------------------
   Vorher stand hier je Paar ein Satz wie „Großzügigkeit, die am Bedarf
   vorbeigeht". Das war nicht falsch, aber unbrauchbar: Es stand nicht
   drin, WER großzügig ist und WER daran vorbeigreift.

   Der Grund lag in der Rechnung: paarKey() hat die beiden Planetennamen
   alphabetisch sortiert und damit die Richtung weggeworfen. Jetzt bleibt
   sie erhalten, und jeder Kontakt wird in drei Schritten erzählt:

     tut   — was die eine Person tut
     an    — was bei der anderen ankommt
     hilft — der eine Handgriff, der den Unterschied macht

   {A} ist die Person mit dem handelnden Planeten, {B} die andere.
   Bei symmetrischen Paaren (Mond|Mond) gibt es keinen Akteur; dort
   stehen beide gleich, und die Texte reden von „ihr". */

var KONTAKT={

 'Mond|Sonne':{akteur:'Sonne',
  w:{tut:'{A} geht voran und sagt, wo es langgeht.',
     an:'{B} fühlt sich dabei nicht überfahren, sondern mitgenommen. Das ist seltener, als es klingt — bei den meisten Menschen erzeugt eine fremde Richtung Widerstand, hier nicht.',
     hilft:'Nichts. Das ist die Stelle, an der ihr nichts tun müsst. Merkt sie euch für die Tage, an denen anderes hakt.'},
  h:{tut:'{A} will etwas erreichen und zieht Richtung Ziel.',
     an:'{B} braucht in dem Moment Sicherheit und zieht Richtung Ruhe. Beides ist berechtigt, und deshalb endet es immer wieder in derselben Diskussion — nur mit wechselndem Anlass.',
     hilft:'Nicht den Anlass verhandeln, sondern die Reihenfolge: erst zehn Minuten ankommen, dann planen. Wer das umdreht, streitet.'},
  rw:{tut:'{A} gibt den Takt vor, ohne es zu merken.',
      an:'{B} kann in diesem Takt leben, ohne sich zu verbiegen. Das ist die klassische Paarverbindung — ihr passt im Grundrhythmus, ohne daran zu arbeiten.',
      hilft:'Nichts erzwingen. Die Verbindung trägt von selbst, solange ihr sie nicht überschreibt.'},
  rh:{tut:'{A} zieht nach vorn: Pläne, Aufbruch, das nächste Ding.',
      an:'{B} braucht zuerst, dass das Jetzige steht. Ihr wollt dasselbe Leben und braucht verschiedene Geschwindigkeiten dorthin.',
      hilft:'Zwei Termine statt einem Streit: einer für das Nächste, einer nur fürs Dableiben. Beide ernst nehmen.'}},

 'Mond|Mond':{
  w:{tut:'Ihr beruhigt euch auf ähnliche Weise.',
     an:'Schweigen zwischen euch ist entspannt und nicht peinlich. Ihr müsst einander den eigenen Zustand nicht erklären — er ist dem anderen vertraut.',
     hilft:'Darauf verlassen. Wenn es einem schlecht geht, ist die andere die naheliegende Adresse, und zwar ohne Vorrede.'},
  h:{tut:'Ihr braucht in denselben Momenten Gegensätzliches: die eine Nähe, die andere Luft.',
     an:'Es fühlt sich an, als würde die andere im falschen Moment weggehen oder zu nah kommen. Dabei folgt jede nur ihrem eigenen Takt.',
     hilft:'Den Takt aussprechen, bevor er kollidiert: „Ich brauche jetzt eine Stunde für mich und komme dann wieder." Der zweite Halbsatz ist der wichtige.'}},

 'Mars|Venus':{akteur:'Mars',
  w:{tut:'{A} geht auf {B} zu — direkt, körperlich, ohne lange Vorrede.',
     an:'{B} mag genau diese Art. Es funkt, und zwar ohne dass einer sich anstrengen müsste.',
     hilft:'Nichts. Diese Anziehung hält, solange keiner sie zerredet.'},
  h:{tut:'{A} drängt, fordert, wird ungeduldig.',
     an:'{B} will Einvernehmen und zieht sich bei Druck zurück — was {A} wiederum als Ablehnung liest und noch mehr drängt.',
     hilft:'{A} macht einen Schritt weniger, {B} sagt einen Satz mehr. Beides fällt beiden schwer und löst fast immer die Schleife.'},
  rw:{tut:'{A} begehrt sichtbar und ohne Umweg.',
      an:'{B} wird gern so begehrt. Das ist der Kontakt, den viele suchen und wenige haben — und er verliert sich nicht nach zwei Jahren.',
      hilft:'Nichts. Höchstens: nicht für selbstverständlich halten.'},
  rh:{tut:'{A} will Nähe sofort und ganz.',
      an:'{B} will sie auch, aber anders getaktet. Die Anziehung bleibt stark und übersetzt sich regelmäßig in Streit — das eine lässt sich hier vom anderen kaum trennen.',
      hilft:'Den Streit nicht für ein Zeichen halten, dass es nicht passt. Aber auch nicht zur Gewohnheit machen: Wenn jede Nähe über einen Konflikt läuft, ist das ein Muster und kein Temperament.'}},

 'Merkur|Merkur':{
  w:{tut:'Ihr denkt in ähnlichem Tempo und ähnlichen Sprüngen.',
     an:'Halbe Sätze reichen. Ihr müsst euch selten erklären, und Gespräche gehen weiter, wo sie aufgehört haben.',
     hilft:'Wichtiges trotzdem einmal ganz aussprechen. Gerade weil ihr euch versteht, bleiben Dinge unausgesprochen, die beide für geklärt halten.'},
  h:{tut:'Die eine denkt schnell und assoziativ, die andere gründlich und der Reihe nach.',
     an:'Die Schnelle hält die Gründliche für zäh, die Gründliche hält die Schnelle für oberflächlich. Keins von beidem stimmt — es ist nur verschiedenes Tempo.',
     hilft:'Schriftlich, wenn es wichtig ist. Im Geschriebenen verschwindet der Tempounterschied, und übrig bleibt die Sache.'}},

 'Mond|Saturn':{akteur:'Saturn',
  w:{tut:'{A} bleibt ruhig, wenn es bei {B} wackelt, und wird nicht mitgerissen.',
     an:'{B} erlebt {A} als verlässlich — als jemanden, bei dem ein Gefühl nicht sofort eine Krise wird.',
     hilft:'{A} darf das ruhig sagen statt nur tun: „Ich bleib da." Bei diesem Kontakt wirkt der Satz länger als die Geste.'},
  h:{tut:'{A} reagiert auf Gefühle mit Sachlichkeit, Einwänden oder Schweigen — oft gar nicht abwertend gemeint, sondern aus Verlegenheit.',
     an:'{B} erlebt das als Kälte und zieht sich zurück, meist ohne es zu sagen. Mit der Zeit zeigt {B} immer weniger und wirkt dadurch auf {A} unnahbar, was alles verstärkt.',
     hilft:'{A} sagt zuerst einen Satz, der nichts löst: „Das klingt mies." Erst danach das Praktische. Diese Reihenfolge ist bei diesem Kontakt der ganze Unterschied.'}},

 'Saturn|Sonne':{akteur:'Saturn',
  w:{tut:'{A} nimmt {B} ernst und traut {B} etwas zu, ohne groß darüber zu reden.',
     an:'{B} erlebt eine Verbindung, die hält — jemanden, der auch dann noch da ist, wenn es gerade nichts zu feiern gibt.',
     hilft:'Das Zutrauen ab und zu aussprechen. {B} merkt es sonst erst, wenn es weg ist.'},
  h:{tut:'{A} bremst, prüft, weist auf das hin, was noch fehlt.',
     an:'{B} fühlt sich klein gemacht, auch wenn {A} nur gründlich sein wollte. Bei diesem Kontakt landet Kritik nicht bei der Sache, sondern bei der Person.',
     hilft:'{A} sagt zuerst, was schon gut ist, und zwar konkret. Nicht aus Höflichkeit — bei diesem Kontakt kommt sonst nur die Einschränkung an.'}},

 'Jupiter|Sonne':{akteur:'Jupiter',
  w:{tut:'{A} findet {B} gut und lässt es merken — Zuspruch, Türen, Gelegenheiten.',
     an:'{B} wird in {A}s Gegenwart größer, traut sich mehr und wird dabei nicht übermütig.',
     hilft:'Nichts. Das ist die freundlichste Verbindung im ganzen Repertoire. Nutzt sie für die Sachen, die {B} allein nicht anfangen würde.'},
  h:{tut:'{A} redet {B} zu, macht größer, sieht Möglichkeiten.',
     an:'{B} sagt zu, was {B} nicht halten kann, und steht hinterher mit dem Problem allein da. {A} merkt das selten, weil es gut gemeint war.',
     hilft:'Vor jeder Zusage eine Nacht. Bei diesem Kontakt ist die Begeisterung von beiden echt und die Einschätzung von beiden zu optimistisch.'}},

 'Mond|Venus':{akteur:'Venus',
  w:{tut:'{A} macht es {B} angenehm — ohne Aufwand, oft ohne Absicht.',
     an:'{B} fühlt sich in {A}s Nähe wohl und entspannt schneller als sonst. Das ist der Kontakt, der Freundschaften lange hält.',
     hilft:'Nichts.'},
  h:{tut:'{A} zeigt Zuneigung so, wie {A} sie selbst gern bekommt.',
     an:'{B} braucht sie anders und spürt eine Lücke, die {B} nicht benennen kann — weil ja offensichtlich etwas Nettes passiert ist. Das macht es schwer anzusprechen.',
     hilft:'Einmal konkret fragen: „Woran merkst du, dass ich dich mag?" Die Antwort ist bei diesem Kontakt fast immer eine andere, als {A} erwartet.'}},

 'Mars|Mars':{
  w:{tut:'Ihr geht Dinge ähnlich an und in ähnlichem Tempo.',
     an:'Zusammen etwas anzufangen geht leicht. Keiner muss den anderen antreiben oder bremsen.',
     hilft:'Nichts — außer daran denken, dass andere euer gemeinsames Tempo anstrengend finden.'},
  h:{tut:'Ihr geht Dinge entgegengesetzt an: die eine sofort, die andere erst richtig.',
     an:'Jede hält das Vorgehen der anderen für den Fehler. Aus einer Sachfrage wird deshalb schnell ein Machtkampf, obwohl es um die Sache gar nicht mehr geht.',
     hilft:'Aufteilen statt abstimmen. Zwei Zuständigkeiten nebeneinander funktionieren hier besser als eine gemeinsame Entscheidung.'}},

 'Mars|Saturn':{akteur:'Saturn',
  w:{tut:'{A} gibt {B}s Kraft eine Form: Plan, Reihenfolge, Ausdauer.',
     an:'{B} kommt weiter als allein, weil der Schwung nicht gleich wieder versickert.',
     hilft:'{A} setzt den Rahmen, {B} füllt ihn. Umgekehrt geht es bei diesem Kontakt schief.'},
  h:{tut:'{A} bremst, {B} drückt. Beide finden sich im Recht.',
     an:'{B} erlebt {A} als Verhinderung, {A} erlebt {B} als rücksichtslos. Das ist der Kontakt, bei dem am meisten Kraft zwischen zwei Menschen verlorengeht, ohne dass etwas passiert.',
     hilft:'Einen Probelauf mit Enddatum vereinbaren. {B} darf loslegen, {A} bekommt einen Termin, an dem geprüft wird. Beide bekommen, was sie brauchen.'}},

 'Merkur|Mond':{akteur:'Merkur',
  w:{tut:'{A} findet Worte für das, was {B} fühlt.',
     an:'{B} fühlt sich verstanden, bevor {B} selbst weiß, worum es geht. Das ist der Kontakt, über den Freundschaften laufen.',
     hilft:'Nichts.'},
  h:{tut:'{A} redet, erklärt, analysiert.',
     an:'{B} ist noch beim Fühlen und erlebt das Reden als Überrollen. {B} sagt dann nichts mehr, und {A} hält das für Einverständnis.',
     hilft:'{A} fragt und wartet zehn Sekunden. Nicht fünf — zehn. Bei diesem Kontakt passiert die ganze Arbeit in dieser Pause.'}},

 'Pluto|Venus':{akteur:'Pluto',
  w:{tut:'{A} nimmt {B} ganz ernst, ohne Halbheiten.',
     an:'{B} erlebt eine Intensität, die schmeichelt und trägt. Mit {A} gibt es keine beiläufige Beziehung.',
     hilft:'Daran denken, dass diese Dichte für Außenstehende schwer auszuhalten ist. Nach außen ruhig etwas kleiner machen.'},
  h:{tut:'{A} will alles wissen, hält fest, prüft.',
     an:'{B} empfindet die Nähe als Besitz und fängt an, Dinge auszulassen — nicht aus Falschheit, sondern um Luft zu haben. Was {A} wiederum bestätigt.',
     hilft:'{A} stellt eine Frage weniger und erträgt die Lücke. {B} erzählt eine Sache mehr, unaufgefordert. Beides ist unangenehm und löst den Kreis.'}},

 'Mond|Pluto':{akteur:'Pluto',
  w:{tut:'{A} hält {B}s schwierige Seiten aus, ohne zu erschrecken.',
     an:'{B} kann bei {A} Dinge sagen, die {B} sonst für sich behält. Das bindet stark.',
     hilft:'Nichts — aber wissen, dass eine Trennung bei diesem Kontakt überdurchschnittlich lange nachwirkt.'},
  h:{tut:'{A} berührt bei {B} etwas Altes, meist ungewollt und oft durch Kleinigkeiten.',
     an:'{B} reagiert unverhältnismäßig heftig und kann hinterher selbst nicht erklären, warum. {A} fühlt sich zu Unrecht beschuldigt.',
     hilft:'Im Moment nicht klären. Später, ruhig, die Frage: „Woran hat dich das erinnert?" Fast immer nicht an {A}.'}},

 'Sonne|Sonne':{
  w:{tut:'Ihr wollt im Kern Ähnliches.',
     an:'Ihr versteht ohne Erklärung, was der anderen wichtig ist. Das macht gemeinsame Vorhaben leicht.',
     hilft:'Nichts — außer: Ähnlichkeit heißt nicht Einigkeit. Ihr könnt dasselbe wollen und euch über den Weg streiten.'},
  h:{tut:'Ihr wollt beide die Richtung bestimmen.',
     an:'Keine kann hier gut folgen, und das schwelt. Aus kleinen Fragen werden Grundsatzfragen, weil es nicht um die Sache geht, sondern darum, wer entscheidet.',
     hilft:'Gebiete aufteilen, dauerhaft. Eine entscheidet beim einen, die andere beim anderen, und zwar ohne Rückfrage. Alles andere wird hier zum Dauerkonflikt.'}},

 'Merkur|Saturn':{akteur:'Saturn',
  w:{tut:'{A} hört genau zu und hält {B} an der Sache.',
     an:'{B} denkt in {A}s Gegenwart klarer, weil nichts durchgeht, was nicht stimmt.',
     hilft:'Nichts. Für alles Schriftliche und alles, was stimmen muss, seid ihr ein gutes Gespann.'},
  h:{tut:'{A} widerspricht, korrigiert, fragt nach Belegen.',
     an:'{B} fängt an, sich vorab zu rechtfertigen, und sagt irgendwann die halben Gedanken nicht mehr. Das Gespräch wird dünner, ohne dass einer es merkt.',
     hilft:'Eine Runde ohne Einwände: {B} redet zu Ende, {A} fragt erst danach. Zehn Minuten reichen, um den Unterschied zu sehen.'}},

 'Sonne|Uranus':{akteur:'Uranus',
  w:{tut:'{A} bringt {B} auf Ideen, die {B} allein nicht gehabt hätte.',
     an:'{B} erlebt {A} als befreiend — jemanden, bei dem die eigenen Regeln kurz nicht gelten.',
     hilft:'Daraus etwas Konkretes machen, solange der Schwung da ist. Bei diesem Kontakt verpufft sonst viel.'},
  h:{tut:'{A} ist unberechenbar: sagt ab, ändert Pläne, taucht wieder auf.',
     an:'{B} kann nicht einschätzen, woran {B} ist, und das untergräbt mehr als jeder Streit. {A} versteht die Aufregung nicht, weil {A} es nie persönlich gemeint hat.',
     hilft:'Verlässlichkeit an einer einzigen Stelle vereinbaren — ein fester Termin in der Woche, der nicht verschoben wird. Der Rest darf beweglich bleiben.'}},

 'Mars|Mond':{akteur:'Mars',
  w:{tut:'{A} handelt, wo {B} fühlt — macht, besorgt, regelt.',
     an:'{B} erlebt das als Fürsorge und kommt schneller zur Ruhe, als Reden es schaffen würde.',
     hilft:'Vorher kurz fragen, ob gerade Handeln oder Dasein gefragt ist. Meist Handeln — aber nicht immer.'},
  h:{tut:'{A} wird laut oder schnell, bevor {B} sortiert hat.',
     an:'{B} erschrickt und macht zu. Danach ist das eigentliche Thema nicht mehr erreichbar, und es geht nur noch um den Ton.',
     hilft:'{A} bleibt leiser als nötig, {B} sagt im Moment selbst „zu schnell" statt es hinterher zu erklären. Hier entstehen die meisten unnötigen Streits zwischen zwei Menschen.'}},

 'Jupiter|Mond':{akteur:'Jupiter',
  w:{tut:'{A} ist großzügig mit {B} — mit Zeit, Zuspruch, Einladungen.',
     an:'{B} geht es in {A}s Nähe besser als allein. Keine große Sache, aber verlässlich.',
     hilft:'Nichts.'},
  h:{tut:'{A} gibt groß: der große Rat, das große Angebot, die große Geste — und zwar das, was {A} selbst gut fände.',
     an:'{B} hätte etwas Kleines und Bestimmtes gebraucht und bekommt etwas Großes und Allgemeines. {B} bedankt sich und bleibt hungrig. Weil die Geste freundlich war, lässt sich schlecht sagen, dass sie nicht gepasst hat — und so wiederholt es sich.',
     hilft:'Ein Satz vorher: „Was hilft dir gerade konkret?" Und dann genau das, auch wenn es kleiner ist, als {A} geben wollte. Das ist bei diesem Kontakt der ganze Unterschied.'}},

 'Venus|Venus':{
  w:{tut:'Ihr mögt Ähnliches.',
     an:'Was schön ist, was gemütlich ist, was sich lohnt — darüber müsst ihr nicht verhandeln. Das macht den Alltag leicht.',
     hilft:'Nichts.'},
  h:{tut:'Ihr habt verschiedenen Geschmack und eine verschiedene Vorstellung davon, was etwas wert ist.',
     an:'Im Alltag harmlos. Sobald Geld im Spiel ist, wird daraus ein echter Konflikt, weil jede die Ausgaben der anderen für unvernünftig hält.',
     hilft:'Getrennte Töpfe für das, was nur eine will. Gemeinsam nur das, was wirklich beide betrifft.'}},

 'Saturn|Venus':{akteur:'Saturn',
  w:{tut:'{A} meint es ernst mit {B} und bleibt.',
     an:'{B} erlebt eine Zuneigung, auf die Verlass ist — unspektakulär und tragfähig.',
     hilft:'Nichts. Bei diesem Kontakt ist das Unspektakuläre die Qualität.'},
  h:{tut:'{A} hält sich zurück, prüft, zeigt wenig.',
     an:'{B} erlebt Zuneigung unter Vorbehalt und fängt an, sich darum zu bemühen. Das ist der Kontakt, bei dem eine wirbt und die andere wartet — und beide unglücklich dabei sind.',
     hilft:'{A} sagt einmal deutlich, woran {B} ist. Ein Satz. Bei diesem Kontakt ist Zurückhaltung keine Vorsicht, sondern das eigentliche Problem.'}}
};
