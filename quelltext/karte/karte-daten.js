/* Astro-Charlie · Die Karte — eigene Tafeln
   Die Planet-in-Haus-Texte kommen beim Bauen aus planeten-in-haeusern.html,
   damit beide Seiten nie auseinanderlaufen. Hier steht nur, was dort fehlt:
   was ein Zeichen mit einem Haus macht, auf dem es sitzt.                */

/* Was das Haus IST — der Bereich, nicht der Stil */
var K_HAUS=[
 {k:'Auftreten',   t:'Wie du ankommst, bevor du etwas sagst.',
  lang:'Körper, Tempo, erster Eindruck. Das 1. Haus ist nicht, wer du bist — es ist, was bei anderen ankommt, bevor du die Gelegenheit hattest, es zu erklären.',
  frage:'Wofür hält man mich, bevor man mich kennt?'},
 {k:'Wert',        t:'Was dir gehört und was du dir zugestehst.',
  lang:'Geld steht hier, aber darunter liegt die Frage, was du dir wert bist — und was du dich traust zu verlangen.',
  frage:'Was traue ich mich zu fordern?'},
 {k:'Sprache',     t:'Reden, lernen, der Nahbereich.',
  lang:'Kurze Wege, Geschwister, Nachbarschaft, alles Alltägliche, das man nicht plant. Hier entscheidet sich, wie du denkst, wenn niemand zuhört.',
  frage:'Wie denke ich, wenn niemand zuhört?'},
 {k:'Herkunft',    t:'Wo du herkommst und wo du landest.',
  lang:'Familie, Wohnung, der Boden unter allem. Das 4. Haus ist gleichzeitig deine Kindheit und dein Zuhause mit vierzig.',
  frage:'Was hieß bei uns zu Hause „normal"?'},
 {k:'Ausdruck',    t:'Was du aus Freude machst.',
  lang:'Kunst, Spiel, Kinder, Verliebtsein. Alles, was keinen Zweck haben muss — und genau deshalb oft als Erstes wegfällt.',
  frage:'Was mache ich, wenn es niemandem nützt?'},
 {k:'Alltag',      t:'Das Tägliche, das alles trägt.',
  lang:'Arbeit, Pflege, Routinen, Körper. Das unspektakulärste Haus und das, an dem die meisten Vorhaben scheitern.',
  frage:'Woran scheitert bei mir der Montag?'},
 {k:'Gegenüber',   t:'Wer dir auf Augenhöhe begegnet.',
  lang:'Liebe, Verträge, auch offene Gegnerschaft. Alles, was ein echtes Du braucht — und deshalb auch zeigt, was du selbst nicht lebst.',
  frage:'Welchen Menschentyp ziehe ich wiederholt an?'},
 {k:'Tiefe',       t:'Was geteilt wird und keiner allein löst.',
  lang:'Geld von anderen, Verlust, Übergänge, Sexualität, die Toten. Das Haus, über das man nicht beim Abendessen spricht.',
  frage:'Worüber rede ich mit niemandem?'},
 {k:'Sinn',        t:'Wonach du dich ausrichtest.',
  lang:'Glaube, Lehre, Ferne, die großen Fragen. Was dich trägt, wenn der Alltag als Begründung nicht mehr reicht.',
  frage:'Woran glaube ich, ohne es beweisen zu können?'},
 {k:'Beruf',       t:'Wofür man dich kennt.',
  lang:'Nicht der Job, sondern was dein Name bedeutet — in deinem Umfeld, in deiner Branche, bei den Leuten, die dich nur vom Hörensagen kennen.',
  frage:'Wofür will ich bekannt sein?'},
 {k:'Gruppen',     t:'Worauf du mit anderen zugehst.',
  lang:'Freundeskreis, Netzwerk, gemeinsame Vorhaben. Das Haus der Hoffnung — hier steht, was du dir für später ausmalst.',
  frage:'Mit wem will ich in zehn Jahren noch zu tun haben?'},
 {k:'Rückzug',     t:'Was ohne Zeugen passiert.',
  lang:'Schlaf, Rückzug, das Unbewusste, die eigenen blinden Flecken. Hier geht Kraft verloren, ohne dass man es bemerkt — und hier ist man ehrlicher als sonst.',
  frage:'Was kostet mich Kraft, ohne dass ich es merke?'}
];

/* Was das Zeichen MACHT, wenn es auf einem Haus sitzt.
   Bewusst ohne Thema geschrieben — das Thema liefert das Haus.
   {B} wird durch den Bereich ersetzt. */
var K_ZEICHEN=[
 {n:'Widder', stil:'schnell und von vorn',
  t:'Du gehst {B} direkt an und fängst lieber an, als zu planen. Du bist hier schnell am Start und verlierst genauso schnell die Geduld. Was dir hier fehlt, ist selten Mut — es ist Ausdauer.',
  haken:'Du brichst hier Dinge ab, kurz bevor sie tragen würden.'},
 {n:'Stier', stil:'langsam und unverrückbar',
  t:'Du brauchst für {B} lange und lässt dich nicht treiben. Was du hier aufbaust, bleibt. Dafür veränderst du hier auch dann nichts, wenn es überfällig wäre.',
  haken:'Du hältst hier an Sachen fest, die längst nichts mehr bringen.'},
 {n:'Zwillinge', stil:'beweglich und zweigleisig',
  t:'Du hältst {B} offen und probierst mehreres nebeneinander. Festlegen fällt dir hier schwer — dafür findest du Wege, auf die andere nicht kommen.',
  haken:'Du fängst hier drei Sachen an und bringst keine zu Ende.'},
 {n:'Krebs', stil:'vorsichtig und nah',
  t:'Du gehst {B} über Gefühl an und schützt, was dir dort wichtig ist. Du tastest dich heran, und wenn es einmal zu dir gehört, gibst du es nicht mehr her.',
  haken:'Du nimmst hier alles persönlich, auch das, was nicht persönlich gemeint war.'},
 {n:'Löwe', stil:'groß und sichtbar',
  t:'Du machst aus {B} etwas, das man sieht. Halbherzig geht hier nicht. Du brauchst in diesem Bereich eine Resonanz — ohne sie macht es dir keinen Spaß.',
  haken:'Du brauchst hier Publikum und merkst es selbst nicht.'},
 {n:'Jungfrau', stil:'genau und dienend',
  t:'Du machst {B} gründlich und siehst, was noch fehlt. Dein Maßstab ist hier hoch, und zwar bei dir selbst zuerst.',
  haken:'Du verbesserst hier so lange, dass du nie fertig wirst.'},
 {n:'Waage', stil:'abwägend und zu zweit',
  t:'Du gehst {B} über das Gegenüber an. Du wägst ab, vergleichst, suchst die faire Lösung — und entscheidest ungern allein.',
  haken:'Du passt dich hier an und merkst zu spät, dass es nicht deins war.'},
 {n:'Skorpion', stil:'tief und ganz',
  t:'Du gehst in {B} bis auf den Grund. Oberflächlich geht hier nicht. Du erkennst hier, was andere übersehen, und zeigst es selten.',
  haken:'Du machst hier aus allem eine Grundsatzfrage.'},
 {n:'Schütze', stil:'weit und zuversichtlich',
  t:'Du gehst {B} groß an und siehst eher die Möglichkeit als das Hindernis. Du überschreitest hier gern Grenzen — räumliche und andere.',
  haken:'Du versprichst hier mehr, als sich halten lässt.'},
 {n:'Steinbock', stil:'strukturiert und auf Dauer',
  t:'Du baust {B} auf, langsam und mit Plan. Du nimmst hier Verantwortung, die dir keiner gegeben hat, und erwartest von dir mehr als von anderen.',
  haken:'Du machst hier aus allem eine Pflicht, auch aus dem Schönen.'},
 {n:'Wassermann', stil:'eigen und auf Abstand',
  t:'Du machst {B} anders als vorgesehen. Vorgaben helfen dir hier nicht, auch deine eigenen nicht. Du brauchst in diesem Bereich Luft.',
  haken:'Du gehst hier auf Abstand, wenn es eng wird — und nennst es Freiheit.'},
 {n:'Fische', stil:'durchlässig und ohne Rand',
  t:'Du nimmst in {B} viel auf und ziehst schlecht Grenzen. Du spürst hier mehr als andere und kannst es schwerer einordnen.',
  haken:'Du verlierst hier die Linie zwischen dir und den anderen.'}
];

/* Der Bereich, als Fortsetzung eines Satzes lesbar */
var K_BEREICH=['dein Auftreten','deinen Umgang mit Geld und Wert','dein Reden und Lernen',
 'dein Zuhause und deine Herkunft','deinen Ausdruck','deinen Alltag','deine Beziehungen',
 'alles Geteilte und Tiefe','deinen Glauben','deinen Beruf','deine Gruppen','deinen Rückzug'];

/* Elementfarben wie im übrigen System */
var K_ELFARBE=['#A05A3A','#3D6B62','#2E3A5C','#6A4A62'];
var K_ELEMENT=['Feuer','Erde','Luft','Wasser'];
var K_MOD=['kardinal','fix','veränderlich'];
var K_HERR=['Mars','Venus','Merkur','Mond','Sonne','Merkur','Venus','Mars',
 'Jupiter','Saturn','Saturn','Jupiter'];
var K_MIT={Skorpion:'Pluto',Wassermann:'Uranus',Fische:'Neptun'};

/* Die Hausarten — erklären, warum manche Häuser lauter sind */
var K_ART=[
 {n:'Eckhaus', h:[1,4,7,10],
  t:'Die vier Ecken. Was hier steht, wirkt nach außen und wird bemerkt — auch von Leuten, die dich kaum kennen.'},
 {n:'Folgehaus', h:[2,5,8,11],
  t:'Die vier sichernden. Was hier steht, hält und baut auf. Es fängt seltener an und gibt seltener auf.'},
 {n:'Fallendes Haus', h:[3,6,9,12],
  t:'Die vier vermittelnden. Was hier steht, verarbeitet, lernt, ordnet, gibt weiter — und wird oft übersehen.'}
];

/* Der Vergleich, der die ganze Idee trägt */
var K_VERGLEICH_TEXT=
 'Ein Zeichen ist ein <b>Stil</b>, kein Thema. Derselbe Stil sieht völlig anders aus, '+
 'je nachdem, welchen Lebensbereich er färbt. Stell zwei Häuser nebeneinander und '+
 'lies denselben Satz zweimal — der Unterschied ist der ganze Punkt.';

/* Die zweite Achse: Wie gut passt dieser Stil zum natürlichen Thema des Hauses?
   Jedes Haus hat ein Zeichen, zu dem es von Natur aus gehört (Haus 1 ↔ Widder,
   Haus 2 ↔ Stier und so weiter). Der Winkel zwischen dem Zeichen auf dem Haus
   und diesem natürlichen Zeichen sagt, ob Stil und Bereich sich vertragen.
   Das ist der Grund, warum Stier auf dem 2. Haus etwas ganz anderes ist als
   Stier auf dem 11. — und nicht bloß dasselbe mit anderem Thema. */
var K_RESO={
 doppelt:{n:'Zuhause',
  t:'Dieses Zeichen gehört von Natur aus zu diesem Haus. Stil und Bereich sind dasselbe — nichts bricht sich, nichts korrigiert sich.',
  folge:'Darum ist das hier unverstellt und deutlich. Du bist in diesem Bereich sehr erkennbar, im Guten wie im Anstrengenden, und bekommst von außen wenig Gegengewicht.'},
 achse:{n:'Gegenüber',
  t:'Dieses Zeichen gehört von Natur aus zum gegenüberliegenden Haus. Stil und Bereich ziehen in entgegengesetzte Richtungen.',
  folge:'Darum fühlt sich dieser Bereich bei dir oft widersprüchlich an: Du machst es so, wie es dem Gegenteil entspricht. Das löst sich nicht auf — es wird brauchbar, wenn du beide Seiten bedienst, statt eine zu gewinnen.'},
 spannung:{n:'Reibung',
  t:'Zwischen diesem Zeichen und dem natürlichen Zeichen dieses Hauses liegt ein Quadrat. Der Stil passt nicht bruchlos zum Schauplatz.',
  folge:'Darum kostet dieser Bereich dich mehr Kraft als andere — und wird gleichzeitig der, in dem du am meisten lernst. Reibung ist hier kein Fehler, sondern die Arbeitsweise.'},
 fliesst:{n:'Fließt',
  t:'Zwischen diesem Zeichen und dem natürlichen Zeichen dieses Hauses liegt ein Trigon. Stil und Bereich arbeiten mühelos zusammen.',
  folge:'Darum läuft das hier von selbst — und genau deshalb nutzt du es selten bewusst. Was leicht geht, nimmt man nicht ernst.'},
 leicht:{n:'Verträgt sich',
  t:'Zwischen diesem Zeichen und dem natürlichen Zeichen dieses Hauses liegt ein Sextil. Sie vertragen sich, ohne zu verschmelzen.',
  folge:'Darum geht hier vieles glatt, sobald du den ersten Schritt machst. Von allein passiert es nicht.'},
 neutral:{n:'Nebeneinander',
  t:'Zwischen diesem Zeichen und dem natürlichen Zeichen dieses Hauses besteht kein klassischer Winkel.',
  folge:'Darum färben sie sich, ohne sich zu verstärken oder zu stören. Dieser Bereich ist bei dir unauffällig — was nicht heißt, dass er unwichtig wäre.'}
};
