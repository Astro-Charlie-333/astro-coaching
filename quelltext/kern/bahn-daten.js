/* ── Die Worte für das, was dein Bild trifft ──────────────────
   Mandy am 29.10.: „die Textblöcke sind noch zu bla in teile. Also
   deine Sprachwahl ist noch immer nicht passend genug."

   Der Grund dafür ist derselbe wie bei dem Satz über die Umrisse
   (REGELN.md Abschnitt 6d): Ein Satz aus zwei Bausteinen wird nur
   dann konkret, wenn **beide** Bausteine etwas bezeichnen, das man
   sich vorstellen kann — und wenn am Ende eine Folge steht.

   Hier sind es drei Bausteine:

     ZIEL     — was dieser Punkt in deinem Leben ist. Kein
                Planetenname, sondern das, worum es geht.
     WANDERER — was der laufende Planet damit macht. Ein Verb.
     FOLGE    — was dabei herauskommt. Unterschiedlich für harte
                und weiche Winkel.

   Daraus: „Saturn prüft gerade, wofür du gehalten werden willst.
   Was davon nur Anspruch war, hält diese Zeit nicht."

   Zehn Wanderer mal zwölf Ziele ergeben 120 Paare; einzeln
   geschrieben wären sie in zwei Jahren noch nicht fertig und jedes
   dritte wäre schlecht. Zusammengesetzt sind es 42 Texte, und jeder
   einzelne davon kann gut sein. */

/* ── Beugung ──────────────────────────────────────────────────
   Bis zum 2.11. setzten die Überschriften immer dasselbe „dein"
   oder „deine" ein: „Jupiter auf dein Mond", „Mars quer zu dein
   Mars", „Saturn gegenüber dein Auftreten". Elf Köpfe auf der
   Startseite, keiner richtig — und es sind genau die Karten, von
   denen jemand einen Screenshot macht (PRODUKT.md 2, Punkt 3).

   Der Grund war nicht ein vergessenes Wort, sondern eine fehlende
   Angabe: Die Vorlage kannte weder den Fall, den die Formel
   verlangt, noch das Geschlecht des Punktes dahinter. Beides steht
   jetzt in den Daten — das Geschlecht am Punkt, der Fall an der
   Formel — und die Anzeige setzt nur noch zusammen. */

/* „dein" in den drei Fällen, die hier vorkommen. Mehr braucht es
   nicht: Ein Genitiv steht in keiner dieser Formeln. */
var B_DEIN = {
 m:{nom:'dein',  akk:'deinen', dat:'deinem'},
 w:{nom:'deine', akk:'deine',  dat:'deiner'},
 s:{nom:'dein',  akk:'dein',   dat:'deinem'}};

/* Was ein Punkt deines Geburtsbilds im Leben ist. Diese Hälfte
   entscheidet, ob der Satz nach dir klingt oder nach Lehrbuch.

   `g`     — das grammatische Geschlecht: m, w oder s.
   `wort`  — das Hauptwort ohne „dein", damit die Beugung davor
             passen kann.
   `beugt` — nur dort, wo sich das Hauptwort selbst ändert: „dem
             Aszendenten", „der öffentlichen Seite". Deutsche
             Substantive stehen im Singular sonst in allen drei
             Fällen gleich, deshalb ist das die Ausnahme.
   `laie`  — derselbe Punkt in Alltagssprache, mit eigenem
             Geschlecht: „dein Aszendent" ist männlich, „dein
             Auftreten" sächlich. */
var B_ZIEL = {
 Sonne:  {g:'w', wort:'Sonne',   was:'wofür du gehalten werden willst'},
 Mond:   {g:'m', wort:'Mond',    was:'was du brauchst, damit es sich sicher anfühlt'},
 Merkur: {g:'m', wort:'Merkur',  was:'wie du denkst und was du mit anderen ausmachst'},
 Venus:  {g:'w', wort:'Venus',   was:'was dir nah ist und was du dir wert bist'},
 Mars:   {g:'m', wort:'Mars',    was:'womit du anfängst und wofür du kämpfst'},
 Jupiter:{g:'m', wort:'Jupiter', was:'wo du dir etwas zutraust'},
 Saturn: {g:'m', wort:'Saturn',  was:'wo du dich zusammenreißt und streng mit dir bist'},
 Uranus: {g:'m', wort:'Uranus',  was:'wo du nicht mitmachst, wie man es macht'},
 Neptun: {g:'m', wort:'Neptun',  was:'wofür du dich begeisterst, ohne es prüfen zu wollen'},
 Pluto:  {g:'m', wort:'Pluto',   was:'wo es bei dir um alles oder nichts geht'},
 ASC:    {g:'m', wort:'Aszendent',
          beugt:{akk:'Aszendenten', dat:'Aszendenten'},
          laie:{g:'s', wort:'Auftreten'},
          was:'wie du ankommst, bevor du etwas gesagt hast'},
 MC:     {g:'s', wort:'MC',
          laie:{g:'w', wort:'öffentliche Seite',
                beugt:{dat:'öffentlichen Seite'}},
          was:'wohin du öffentlich gehst und wofür man dich kennt'}};

/* Den Punkt in der Sprache holen, die zur Stufe gehört. Gibt es
   kein Alltagswort, steht dort der Name — „dein Mond" ist auf
   Stufe 0 kein Fachwort (REGELN.md 2a). */
function B_PUNKT(k, laie){
  var z = B_ZIEL[k];
  if(!z) return {g:'m', wort:String(k)};
  if(laie && z.laie) return z.laie;
  return z;
}

/* Setzt „dein" und das Hauptwort im verlangten Fall zusammen.
   Die einzige Stelle, an der das passiert. */
function B_BEUGE(p, fall){
  var d = (B_DEIN[p.g] || B_DEIN.m)[fall] || B_DEIN.m.nom;
  var w = (p.beugt && p.beugt[fall]) || p.wort;
  return d + ' ' + w;
}

/* Die Winkel in zwei Registern. „Konjunktion" verschlüsselt einen
   Rechenweg und bleibt auf Stufe 0 draußen (REGELN.md 2a); „auf"
   sagt dasselbe und braucht keine Vorbildung.

   Jede Formel trägt den Fall, den sie verlangt: „auf" steht hier
   auf die Frage wohin und zieht den Akkusativ, „zu", „mit", „von"
   und „gegenüber" ziehen den Dativ. */
var B_WINKELWORT = {
 'Konjunktion':{wort:'auf',               fall:'akk'},
 'Opposition' :{wort:'gegenüber',         fall:'dat'},
 'Quadrat'    :{wort:'quer zu',           fall:'dat'},
 'Trigon'     :{wort:'im Einklang mit',   fall:'dat'},
 'Sextil'     :{wort:'in Reichweite von', fall:'dat'}};
var B_WINKELNOT = {wort:'bei', fall:'dat'};

/* Ab Stufe 2 steht der Fachname. „Jupiter Konjunktion dein Mond"
   waren zwei Nominative nebeneinander und sagten nicht, was wozu
   steht; „in Konjunktion zu deinem Mond" sagt es. */
var B_WINKELTECH = {vor:'in', nach:'zu', fall:'dat'};

/* Was ein laufender Planet mit dem macht, was er berührt.
   `tut` ist ein Verb mit offener Stelle dahinter, `hart` und
   `weich` sind die Folgen — die eine für Konjunktion, Opposition
   und Quadrat, die andere für Trigon und Sextil. */
var B_WAND = {
 Mond:{tut:'streift gerade',
   hart:'Für ein paar Stunden liegt das näher an der Oberfläche als sonst. Es geht vorbei, bevor du etwas daraus machen musst.',
   weich:'Ein paar Stunden, in denen das leichter von der Hand geht. Nichts, worauf man planen kann — aber brauchbar, wenn es gerade ansteht.'},
 Merkur:{tut:'bringt gerade zur Sprache',
   hart:'Es wird darüber geredet, und zwar nicht unbedingt so, wie du es gern hättest. Ein Gespräch, eine Nachricht, ein Satz, der hängen bleibt.',
   weich:'Es lässt sich in diesen Tagen leichter aussprechen als sonst. Wenn etwas gesagt werden muss, ist jetzt der günstigere Moment.'},
 Venus:{tut:'macht gerade weicher',
   hart:'Du willst, dass es angenehm bleibt, und gibst dabei schneller nach, als du es später gutheißt.',
   weich:'Es fällt leichter, sich darüber zu einigen. Gut für ein Gespräch, das sonst zäh wird.'},
 Sonne:{tut:'beleuchtet gerade',
   hart:'Ein paar Tage lang steht das im Mittelpunkt, ob du willst oder nicht. Danach ist es wieder eines unter vielen.',
   weich:'Ein paar Tage, in denen das sichtbar wird, ohne dass du drängen musst.'},
 Mars:{tut:'bringt gerade in Bewegung',
   hart:'Die Sache wird schnell heiß. Entweder du packst sie an, oder sie kommt als Gereiztheit bei jemandem heraus, der nichts dafür kann.',
   weich:'Du kommst hier gerade leicht in Bewegung. Was du jetzt anfängst, fängt wirklich an.'},
 Jupiter:{tut:'macht gerade größer',
   hart:'Es wird mehr, als hineinpasst. Das fühlt sich gut an und wird erst später zum Problem — meist, wenn der Kalender es einholt.',
   weich:'Hier geht in diesen Monaten mehr als sonst. Türen gehen auf, und es kostet weniger Überredung als üblich.'},
 Saturn:{tut:'prüft gerade',
   hart:'Was daran nur Anspruch war, hält diese Zeit nicht. Was echt ist, steht hinterher fester als vorher — aber es dauert, und es fühlt sich zwischendurch nach Rückschritt an.',
   weich:'Hier lässt sich gerade etwas festmachen, das sonst nicht hält. Keine aufregende Zeit, aber eine, nach der etwas steht.'},
 Uranus:{tut:'reißt gerade auf',
   hart:'Das verträgt gerade keine Fortsetzung wie bisher. Entweder du änderst es, oder es wird von außen geändert — das ist der unangenehmere Weg.',
   weich:'Hier ist gerade Luft für etwas, das du sonst nicht gewagt hättest. Der Widerstand dagegen ist kleiner als üblich.'},
 Neptun:{tut:'macht gerade unscharf',
   hart:'Die Umrisse verschwimmen: Du siehst hier gerade schlechter, was wirklich ist und was du dir dazudenkst. Das ist der Moment, in dem man jemanden fragt, der nicht beteiligt ist.',
   weich:'Hier darf gerade etwas offen bleiben, ohne dass es schadet. Gut für alles, was nicht entschieden werden muss.'},
 Pluto:{tut:'baut gerade um',
   hart:'Das geht nicht in Schritten, die du dir aussuchst, und es dauert Jahre statt Wochen. Was dabei verschwindet, war meistens schon vorher geborgt.',
   weich:'Hier bekommst du in diesen Jahren mehr Gewicht, ohne dass du dafür lauter werden musst.'}};

/* Die drei Tempi. Daraus entsteht die Angabe, wie lange das gilt —
   ohne sie ist „Saturn auf deiner Sonne" ein Satz ohne Zeitraum. */
var B_TEMPO = {
 schnell:{name:'Stunden', satz:'Das ist morgen vorbei.'},
 mittel: {name:'Tage',    satz:'Das zieht ein paar Tage.'},
 langsam:{name:'Monate',  satz:'Das ist keine Stimmung, das ist ein Abschnitt.'}};

/* Mehrfachdurchgänge. Ein rückläufiger Wanderer kreuzt dieselbe
   Stelle bis zu dreimal — und die drei Termine fühlen sich
   unterschiedlich an. Das ist eine der Sachen, die fast keine App
   zeigt, obwohl sie leicht zu rechnen ist. */
var B_DURCHGANG = {
 1: {von3:'Das erste von drei Malen. Jetzt zeigt sich, worum es geht; entschieden wird es noch nicht.',
     von2:'Das erste von zwei Malen. Jetzt kommt das Thema auf den Tisch.'},
 2: {von3:'Das zweite von drei Malen, rückwärts. Jetzt geht es noch einmal von innen durch — unangenehmer als beim ersten Mal und meist der Teil, an dem sich etwas dreht.',
     von2:'Das zweite und letzte Mal. Jetzt steht es fest.'},
 3: {von3:'Das dritte und letzte Mal. Was beim zweiten Durchgang klar geworden ist, wird jetzt gemacht.'}};

var B_KOPF = {
 titel:'Was dein Bild gerade trifft',
 sub:'Welche Punkte bei dir berührt werden, von wem, und wie nah das dran ist.',
 nix:'Gerade steht nichts innerhalb der Orbis-Grenzen auf deinem Bild. Das ist selten und hält nie lange.',
 nahVor:'Abstand',
 exaktVor:'Genau am',
 laeuftVor:'Gilt für',
 rueck:'läuft rückwärts',
 mehrVor:'Alle Berührungen anzeigen',
 wenigerVor:'Weniger anzeigen',
 schnellTitel:'Dazu heute, nur für Stunden',
 schnellSub:'Mond, Merkur, Venus und Sonne ziehen schnell vorbei. Sie machen den Tag, nicht den Abschnitt.',
 tech:'{wanderer} {grad} {zeichen} {aspekt} {ziel} {gradZ} {zeichenZ}, Orbis {ab}°'};

var B_STRAHL = {
 titel:'Die nächsten zwölf Monate',
 sub:'Die langsamen Wanderer auf deinem Bild, mit dem Tag, an dem der Winkel genau aufgeht. Tipp eine Zeile an, dann steht da, was sie heißt.',
 nix:'In den nächsten zwölf Monaten geht kein Winkel der langsamen Wanderer auf deinem Bild genau auf. Das kommt vor — dann sind die Jahre davor und danach die dichteren.',
 heute:'heute',
 jetztMarke:'Hier stehst du',
 mehr:'Noch {n} weitere anzeigen',
 weniger:'Weniger anzeigen',
 legende:'Gerechnet ist der Tag, an dem der Winkel genau aufgeht. Was er bedeutet, ist Deutung — und die prüfst du an dir.',
 wieder:'Dieselbe Begegnung noch einmal — was sie heißt, steht beim ersten Mal.',
 steht:'Läuft schon. Steht oben unter „Was dein Bild gerade trifft".',
 inTagen:'in {n} T.',
 inMonaten:'in {n} Mon.',
 tech:'{wanderer} {aspekt} {ziel} exakt am {datum}{rueck}{durchgang}',
 techRueck:', rückläufig',
 techDurchgang:', Durchgang {n} von {alle}'};
