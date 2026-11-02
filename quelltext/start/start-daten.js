/* ── Start: der Inhalt der öffentlichen Seite ─────────────────
   Mandy am 2.11.: „SCHWERKRAFT ist auf jeden Fall der Name."

   Dies ist die Tür. Die einzige Seite, die jemand sieht, der Mandy
   nicht kennt — und die einzige, die bisher komplett fehlte
   (ENTWURF-NEUE-SEITE.md Abschnitt 3).

   Warum der Text hier als Daten steht und nicht als HTML: So prüft
   bau-start.py den Text und nicht das Markup. Und geprüft werden muss
   hier mehr als sonst, weil zwei Dinge gelten, die Mandy selbst
   gesetzt hat:

   1. „keine Dringlichkeitsthemen oder sowas Sales Person mäßiges nee
      nee. Das bin ich als Mensch nicht." (1.11.)
   2. Keine Preise auf der Seite. „können wir das pricing noch
      ausklammern?" (2.11.) — Damit darf aber auch kein
      „Investition auf Anfrage" entstehen; siehe S_ABMACHEN.

   Beides steht als Prüfung im Bau, nicht als Vorsatz hier. */

var S_MARKE = {
  wort: 'Schwerkraft',
  zusatz: 'Coaching · Mandy Netta',
  /* Die Frage, die die ganze Seite beantwortet. Sie ist zugleich die
     Spannung im Namen: der Himmel zieht, der Boden hält. */
  frage: 'Was ist bei dir angelegt — und was machst du am Dienstag damit?',
  satz: 'Ich arbeite mit Menschen an dem, was sich bei ihnen immer wieder '
      + 'gleich zuspitzt. Das Geburtsbild benutze ich dabei als Landkarte, '
      + 'um schneller an die richtigen Fragen zu kommen — nicht, um dir zu '
      + 'sagen, wer du bist.',
  rolle: 'Ich bin Coachin, keine Astrologin. Der Unterschied ist nicht '
       + 'Bescheidenheit: Eine Astrologin deutet dein Bild. Ich stelle dir '
       + 'Fragen daraus, und was davon stimmt, entscheidest du.'
};

/* ── Wie ich arbeite: drei Linsen ──────────────────────────────
   Dieselben drei wie in der Begleitung (begleit-daten.js C_METHODE) —
   hier in der zweiten Person und ohne Werkstattsprache. Eine Seite je
   Thema heißt auch: eine Methode, zwei Adressaten. */
var S_LINSEN = [
  {n:'Der Bauplan', frage:'Was ist angelegt?',
   d:'Dein Geburtsbild sagt, welche Fragen bei dir wahrscheinlich etwas '
   + 'aufmachen und in welchem Lebensbereich sie sitzen. Es ist eine '
   + 'Vermutung, mit der wir arbeiten — und die du jederzeit streichen '
   + 'kannst, wenn sie nicht stimmt.'},
  {n:'Die private Logik', frage:'Wofür ist das gut?',
   d:'Jedes Muster, das sich jahrelang hält, bringt etwas ein — meistens '
   + 'Schutz vor etwas, das noch unangenehmer wäre. Diese Frage kommt aus '
   + 'der Individualpsychologie und ist der Teil der Arbeit, der am '
   + 'häufigsten etwas verändert.'},
  {n:'Die Landung', frage:'Was tust du am Dienstag?',
   d:'Hier hören die meisten Angebote auf, und hier entscheidet sich, ob '
   + 'es etwas gebracht hat. Eine Einsicht ohne Handlung ist in zwei '
   + 'Wochen weg. Jede Sitzung endet deshalb mit etwas Kleinem, das du '
   + 'tatsächlich machst.'}
];

/* ── Was es gibt ───────────────────────────────────────────────
   Zwei Dinge, nicht fünf. „dabei" ist Pflicht: jedes Angebot sagt,
   was drin ist, sonst ist es ein Versprechen ohne Inhalt. */
var S_ANGEBOT = [
  {n:'Ein Blick auf dein Bild', art:'einmalig, rund 90 Minuten',
   fuer:'Wenn du wissen willst, was in deinem Bild angelegt ist, und '
      + 'erst mal nichts weiter.',
   dabei:['Ein Gespräch über die drei, vier Stellen in deinem Bild, an '
        + 'denen bei dir am meisten hängt',
          'Eine schriftliche Zusammenfassung danach, in normalem Deutsch',
          'Zugang zu deinem Bild in diesem Werkzeug, dauerhaft'],
   nicht:'Keine Vorhersage, kein Jahresausblick, keine Entscheidung, die '
       + 'ich für dich treffe.'},
  {n:'Die Begleitung', art:'sechs Sitzungen über etwa drei Monate',
   fuer:'Wenn sich etwas Konkretes verändern soll und du weißt, dass du '
      + 'das allein schon ein paar Mal versucht hast.',
   dabei:['Sechs Sitzungen mit einem Bogen: ankommen, dein Bild, dein '
        + 'Muster, der Gewinn darin, die Landung, der Abschluss',
          'Zwischen den Sitzungen etwas zum Ausprobieren — klein genug, '
        + 'dass du es wirklich machst',
          'Nach der vierten Sitzung sage ich dir ehrlich, ob das etwas '
        + 'bringt oder ob du etwas anderes brauchst'],
   nicht:'Keine Therapie und kein Ersatz dafür. Wenn du in Behandlung '
       + 'bist, läuft das daneben, nicht stattdessen.'}
];

/* ── Wie wir das abmachen ──────────────────────────────────────
   Hier standen im Entwurf Zahlen („Was es kostet. Zahlen, keine
   Investition auf Anfrage."). Mandy will die Preise noch nicht
   festlegen. Das Problem daran ist nicht die fehlende Zahl, sondern
   dass an ihrer Stelle leicht eine Nebelformel entsteht — und die
   verlagert die unangenehme Arbeit auf die Person, die liest.

   Deshalb hier: kein Preis, aber ein nachprüfbarer Ablauf. Wer liest,
   weiß, was als Nächstes passiert, was es kostet (nichts) und wie man
   wieder herauskommt (indem man nichts tut). */
var S_ABMACHEN = {
  titel: 'Wie wir das abmachen',
  schritte: [
   ['Du schreibst mir', 'Zwei Sätze reichen. Worum es geht und ob du '
     + 'eher an das Einmalige oder an die Begleitung denkst.'],
   ['Wir telefonieren, etwa zwanzig Minuten',
    'Das kostet nichts. Ich frage, worum es geht, und sage dir, ob ich '
    + 'die Richtige dafür bin. Manchmal ist die Antwort nein — dann sage '
    + 'ich dir, was ich stattdessen kenne.'],
   ['Danach sage ich dir, was es kostet',
    'Im Gespräch, mit einer Zahl, bevor irgendetwas anfängt. Ich arbeite '
    + 'daran, das nach Einkommen zu staffeln; bis das steht, bespreche '
    + 'ich es mit jedem einzeln.'],
   ['Du sagst ja oder nein',
    'Nein ist eine vollständige Antwort. Du musst sie nicht begründen, '
    + 'und ich melde mich danach nicht wieder.']],
  nachsatz: 'Es gibt hier nichts, was nur diese Woche gilt, und keine '
   + 'Liste, auf die du dich setzen musst. Wenn jetzt nicht der Zeitpunkt '
   + 'ist, ist es in einem halben Jahr auch noch dieselbe Arbeit.'
};

/* ── Wer ich bin ───────────────────────────────────────────────
   Kurz, ohne Heldenreise (ENTWURF Abschnitt 3, Punkt 5). Nur, was
   Mandy selbst gesagt hat, und nichts über ihre Person, was sie nicht
   selbst öffentlich machen wollte. */
var S_ICH = {
  titel: 'Wer ich bin',
  text: ['Ich heiße Mandy Netta, bin 39 und arbeite in Berlin.',
   'Vor diesem hier waren es rund zehn Jahre in Unternehmen: sechseinhalb '
   + 'davon bei McFIT Models, danach im Vertrieb eines '
   + 'Coaching-Unternehmens, im Social-Media- und Influencer-Marketing und '
   + 'in der Beratung von Coaches. Das heißt vor allem: Ich habe viel '
   + 'gesehen, wie in dieser Branche verkauft wird. Deshalb findest du '
   + 'auf dieser Seite keinen Countdown.',
   'Ich arbeite besonders gern mit neurodivergenten Menschen — mit '
   + 'Leuten also, bei denen die üblichen Ratschläge regelmäßig nicht '
   + 'greifen, weil sie für andere Köpfe gemacht sind.'],
  /* Gilt für die ganze Seite: zweite Person Singular. Der Absatz
     darüber hat beim ersten Entwurf „Sie" gesagt — die Prüfung fängt
     das, siehe bau-start.py. */
  anrede: 'du'
};

/* ── Was das hier nicht ist ────────────────────────────────────
   Derselbe Inhalt wie C_GRENZEN in der Begleitung, nur nach außen
   gedreht. Im Entwurf steht dazu: „Dieser Abschnitt verkauft besser
   als jeder Claim, weil ihn sonst niemand hat." Er steht hier nicht,
   weil er verkauft, sondern weil er wahr ist. */
var S_NICHT = {
  titel: 'Was das hier nicht ist',
  sub: 'Der Teil, den du vor dem Schreiben lesen solltest.',
  punkte: [
   ['Keine Therapie', 'Ich behandle nichts und diagnostiziere nichts. '
     + 'Wenn etwas behandelt werden muss, gehört es zu jemandem, der das '
     + 'darf — und ich sage es dir, wenn ich den Eindruck habe.'],
   ['Keine Vorhersage', 'Ich sage dir nicht, ob die Beziehung hält, ob du '
     + 'den Job bekommst oder wann es besser wird. Auch nicht als '
     + 'Vermutung, auch nicht, wenn du darum bittest.'],
   ['Keine Gesundheits-, Rechts- oder Geldberatung',
    'Unabhängig davon, was in einem Bild steht.'],
   ['Nichts über andere', 'Ich deute keine Bilder von Menschen, die nicht '
     + 'dabei sind und nicht gefragt wurden.'],
   ['Kein Beweis', 'Astrologie hat keinen Wirksamkeitsnachweis. Ich '
     + 'behandle sie als Sprache, in der sich über Muster gut reden '
     + 'lässt, nicht als Messverfahren. Wo dein Erleben und das Bild sich '
     + 'widersprechen, hat dein Erleben recht.']],
  krise: {titel:'Wenn es dringend ist',
   text:'Wenn du daran denkst, dir etwas zu tun, oder gerade in Gefahr '
     + 'bist, bin ich die falsche Adresse — nicht aus Unwilligkeit, '
     + 'sondern weil es Stellen gibt, die das können und rund um die Uhr '
     + 'da sind.',
   stellen:[['Telefonseelsorge', '0800 111 0 111 · 0800 111 0 222 · '
     + 'kostenfrei und anonym, Tag und Nacht'],
    ['Ärztlicher Bereitschaftsdienst', '116 117'],
    ['Notruf', '112']]}
};

/* ── Der Weg hinein, der nichts kostet ────────────────────────
   Entwurf Abschnitt 3, Punkt 7. Das Werkzeug gibt es längst; es war
   nur nie als Eingang kenntlich. */
var S_TUER = {
  titel: 'Ein Anfang, der nichts kostet',
  text: 'Du kannst dein Bild hier ansehen, ohne mit mir zu sprechen und '
    + 'ohne etwas anzugeben außer Geburtstag, Uhrzeit und Ort. Es bleibt '
    + 'in deinem Browser. Das Werkzeug heißt Astro-Charlie, ich habe es '
    + 'selbst gebaut, und es erklärt jeden Begriff, den es benutzt.',
  wege: [['uebersicht.html', 'Dein Bild ansehen',
          'Was bei dir angelegt ist, Feld für Feld'],
         ['index.html', 'Was gerade läuft',
          'Die Tage, an denen dein Bild diesen Monat getroffen wird'],
         ['wissen.html', 'Nachlesen',
          'Die Begriffe, ohne Vorwissen erklärt']]
};

/* ── Kontakt ───────────────────────────────────────────────────
   Mandy am 2.11.: „Muss noch eine e-mail adresse dafür erstellen."

   Die Adresse steht an genau einer Stelle — hier. Solange sie null
   ist, zeigt die Seite an der Stelle eine sichtbare Lücke statt einer
   erfundenen Adresse, und bau-start.py sagt es im Bau als Hinweis.
   Eine erfundene oder private Adresse wäre schlimmer als eine Lücke:
   Die Lücke sieht nur Mandy, denn die Seite ist nirgends verlinkt. */
var S_KONTAKT = {
  mail: null,
  lueckeTitel: 'Hier fehlt noch die Adresse',
  luecke: 'Sobald die Mailadresse für Schwerkraft steht, kommt sie in '
    + 'start-daten.js an eine Stelle (S_KONTAKT.mail) — und erscheint '
    + 'dann hier und im Impressum.'
};

/* ── Der Ehrlichkeitsabschnitt ────────────────────────────────
   REGELN.md: Was nicht belegbar ist, steht entweder nicht da oder mit
   dem Hinweis, dass es nicht belegbar ist. Auf dieser Seite ist das
   keine Fußnote, sondern Teil des Angebots. */
var S_EHRLICH = {
  titel: 'Woran du mich messen kannst',
  punkte: [
   'Die Fragen, die ich stelle, kommen teils aus der '
   + 'Individualpsychologie — einer psychologischen Schule mit '
   + 'Geschichte — und teils aus der astrologischen Überlieferung, die '
   + 'keinen Wirksamkeitsnachweis hat. Ich sage dir in der Sitzung, was '
   + 'woher kommt.',
   'Rechnen kann dieses Werkzeug: Positionen, Häuser, exakte Tage. Das '
   + 'ist Astronomie und nachprüfbar. Was diese Positionen bedeuten, ist '
   + 'Deutung und nicht nachprüfbar.',
   'Ich fange gerade an und arbeite mit meinen ersten Klient:innen. Das '
   + 'sage ich dir, bevor du dich entscheidest, und nicht danach.']
};
