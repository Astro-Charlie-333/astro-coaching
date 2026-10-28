/* ───────────────────────────────────────────────────────────────
   bereich-daten.js — alle Texte der Bereichsseite.

   Grundregel dieser Datei: Auf der sichtbaren Ebene steht, WAS
   passiert. Nicht, woran man es abliest. Kein Planetenname, kein
   Hausname, kein Aspektname in den Sätzen, die ein Laie zuerst
   liest. Die Mechanik steht getrennt in den Feldern mit dem
   Vorsatz "tech" und erscheint erst ab Wissensstufe 2.
   Das wird beim Bauen geprüft — bau-bereiche.py bricht ab, wenn
   sich Fachsprache in einen Laientext schleicht.
   ─────────────────────────────────────────────────────────────── */
(function(){

  /* ── Die vier Lautstärken ───────────────────────────────────── */
  var B_LAUT = [
    { k:'still',   n:'Still',        farbe:'#A8AEBE',
      satz:'Hier passiert gerade wenig. Das ist keine Vernachlässigung, sondern eine Pause.' },
    { k:'leise',   n:'Leise',        farbe:'#7E95A8',
      satz:'Etwas bewegt sich, aber ohne Druck. Gut für Dinge, die Zeit brauchen.' },
    { k:'bewegt',  n:'In Bewegung',  farbe:'#9A7235',
      satz:'Hier ist etwas im Gang. Entscheidungen, die du jetzt triffst, haben Gewicht.' },
    { k:'viel',    n:'Viel los',     farbe:'#B5502E',
      satz:'Das ist gerade dein lautester Bereich. Hierhin geht die Energie, ob du willst oder nicht.' }
  ];

  /* ── Die Bereiche ───────────────────────────────────────────── */
  var B_BER = {
    liebe: {
      frage: 'Was ist bei mir gerade in der Liebe los?',
      worum: 'Verliebtsein, Beziehungen, Nähe und das, was du dich traust zu wollen.',
      nomen: 'in der Liebe',
      lautSatz: [
        'In der Liebe ist es gerade ruhig. Du hast Zeit, und es drängt dich niemand.',
        'In der Liebe bewegt sich etwas langsam. Eher ein Tasten als ein Sprung.',
        'In der Liebe ist etwas im Gang, das Folgen hat.',
        'Die Liebe ist gerade dein lautester Bereich.'
      ],
      meistern: 'Die Aufgabe hier ist fast immer dieselbe: etwas wollen und es auch sagen. Sag es im Klartext und sag es zuerst, statt anzudeuten und abzuwarten.',
      techFeld: 'Siebtes, fünftes und achtes Haus'
    },
    beruf: {
      frage: 'Wo stehe ich beruflich?',
      worum: 'Arbeit, Aufgabe und Sichtbarkeit — also auch die Frage, wofür du gelten willst und wofür man dich bisher kennt.',
      nomen: 'im Beruf',
      lautSatz: [
        'Beruflich ist gerade Ruhe. Keine Weichen werden gestellt.',
        'Beruflich bewegt sich etwas im Hintergrund.',
        'Beruflich ist etwas im Gang, das deine Richtung verändert.',
        'Der Beruf ist gerade dein lautester Bereich.'
      ],
      meistern: 'Hier geht es darum, eine Sache zu Ende zu bringen, die man dir ansieht. Nicht zehn angefangene, sondern eine fertige.',
      techFeld: 'Zehntes, sechstes und zweites Haus'
    },
    gesundheit: {
      frage: 'Wie geht es mir körperlich?',
      worum: 'Kraft, Schlaf, Belastbarkeit und die Routinen, die dich tragen oder aufbrauchen.',
      nomen: 'mit deinem Körper',
      lautSatz: [
        'Körperlich ist gerade nichts Besonderes im Gang.',
        'Dein Körper meldet sich leise. Hinhören reicht, Alarm ist keiner.',
        'Dein Körper ist gerade ein Thema, das Aufmerksamkeit verlangt.',
        'Der Körper ist gerade dein lautester Bereich.'
      ],
      meistern: 'Die Aufgabe hier heißt Maß: aufhören, bevor es weh tut, nicht erst danach.',
      techFeld: 'Sechstes, erstes und zwölftes Haus'
    },
    geld: {
      frage: 'Wie steht es ums Geld?',
      worum: 'Verdienen, Ausgeben, Sicherheit und was du dir zutraust zu verlangen.',
      nomen: 'beim Geld',
      lautSatz: [
        'Beim Geld ist gerade Ruhe.',
        'Beim Geld verschiebt sich etwas langsam.',
        'Beim Geld ist etwas im Gang, das eine Entscheidung braucht.',
        'Geld ist gerade dein lautester Bereich.'
      ],
      meistern: 'Hier geht es ums Verlangen eines Preises, nicht ums Sparen. Die Zahl aussprechen, ohne sie vorher kleiner zu machen.',
      techFeld: 'Zweites, achtes und elftes Haus'
    },
    familie: {
      frage: 'Was ist mit Zuhause und Familie?',
      worum: 'Herkunft, Wohnen, die Menschen, die man nicht gewählt hat, und der Ort, an dem du landest.',
      nomen: 'zu Hause',
      lautSatz: [
        'Zu Hause und in der Familie ist gerade Ruhe.',
        'Zu Hause bewegt sich etwas, ohne zu drängen.',
        'Zu Hause oder in der Familie ist etwas im Gang.',
        'Zuhause und Familie sind gerade dein lautester Bereich.'
      ],
      meistern: 'Die Aufgabe hier ist, erwachsen in alten Rollen zu bleiben — also nicht wieder zu werden, wer man mit sechzehn war.',
      techFeld: 'Viertes, drittes und zehntes Haus'
    },
    freunde: {
      frage: 'Wie ist es mit den Menschen um mich?',
      worum: 'Freundschaften, Gruppen, Zugehörigkeit und wo du dazugehörst, ohne dich zu verbiegen.',
      nomen: 'bei den Menschen um dich',
      lautSatz: [
        'Im Umfeld ist gerade Ruhe.',
        'Im Umfeld verschiebt sich etwas leise.',
        'Bei den Menschen um dich ist etwas im Gang.',
        'Dein Umfeld ist gerade dein lautester Bereich.'
      ],
      meistern: 'Hier geht es darum, zu bleiben, wenn es unbequem wird — und zu gehen, wenn es nicht mehr stimmt. Beides rechtzeitig.',
      techFeld: 'Elftes, siebtes und drittes Haus'
    },
    freude: {
      frage: 'Wo ist bei mir gerade Freude?',
      worum: 'Spiel, Lust, Machen ohne Zweck, und das, was du tust, wenn niemand zusieht.',
      nomen: 'bei dem, was dir Freude macht',
      lautSatz: [
        'Hier ist gerade wenig los. Freude kommt derzeit nicht von außen.',
        'Etwas Spielerisches regt sich leise.',
        'Hier ist etwas im Gang, das dir gehört und sonst niemandem.',
        'Freude und Kreativität sind gerade dein lautester Bereich.'
      ],
      meistern: 'Die Aufgabe hier ist, etwas zu tun, das zu nichts führt — und es danach einfach stehen zu lassen, ohne Begründung.',
      techFeld: 'Fünftes, elftes und neuntes Haus'
    },
    selbstwert: {
      frage: 'Wie stehe ich zu mir?',
      worum: 'Was du von dir hältst, was du dir zugestehst, und wie du auftrittst.',
      nomen: 'in deinem Verhältnis zu dir',
      lautSatz: [
        'Hier ist gerade Ruhe. Dein Bild von dir wackelt nicht.',
        'An deinem Selbstbild rückt sich etwas leise zurecht.',
        'Dein Verhältnis zu dir selbst ist gerade in Bewegung.',
        'Der Selbstwert ist gerade dein lautester Bereich.'
      ],
      meistern: 'Hier geht es darum, den eigenen Wert nicht an der letzten Rückmeldung zu messen.',
      techFeld: 'Erstes, zweites und zehntes Haus'
    },
    sinn: {
      frage: 'Wohin soll das alles?',
      worum: 'Richtung, Überzeugungen, Lernen und die Frage, wofür du das alles machst.',
      nomen: 'bei der Frage nach der Richtung',
      lautSatz: [
        'Die großen Fragen sind gerade leise.',
        'Eine Richtungsfrage klopft leise an.',
        'Die Frage nach der Richtung ist gerade offen.',
        'Sinn und Richtung sind gerade dein lautester Bereich.'
      ],
      meistern: 'Die Aufgabe hier ist, eine Überzeugung zu haben, die man auch wieder ändern kann.',
      techFeld: 'Neuntes, fünftes und zwölftes Haus'
    },
    umbruch: {
      frage: 'Steht bei mir etwas zum Abschluss?',
      worum: 'Loslassen, Krisen, Abhängigkeiten und das, was zu Ende geht, damit etwas anderes anfangen kann.',
      nomen: 'bei dem, was zu Ende geht',
      lautSatz: [
        'Nichts drängt zum Abschluss. Du kannst Dinge stehen lassen.',
        'Etwas löst sich leise, ohne Bruch.',
        'Etwas geht gerade zu Ende, und das braucht Platz.',
        'Umbruch ist gerade dein lautester Bereich.'
      ],
      meistern: 'Hier geht es darum, loszulassen, bevor es weggenommen wird. Das ist der ganze Unterschied.',
      techFeld: 'Achtes, zwölftes und viertes Haus'
    }
  };

  /* ── Die Wanderer, ohne ihren Namen ──────────────────────────
     was    — was dieser Durchgang mit einem macht
     tempo  — wie er sich anfühlt: als Ruck oder als Drift
     tun    — was jetzt sinnvoll ist
     nutzen — wofür das Fenster gut ist
     tech   — die Mechanik, erst ab Stufe 2 sichtbar */
  var B_WAND = {
    Pluto: {
      was:'Etwas verwandelt sich von Grund auf. Nicht ein Teil davon — das Ganze. Am Anfang merkt man nur, dass das Alte nicht mehr geht; was stattdessen kommt, zeigt sich erst später.',
      tempo:'Das arbeitet über Jahre und kommt meist in zwei oder drei Wellen.',
      tun:'Lass gehen, was ohnehin geht. Die Kraft, die das Festhalten kostet, brauchst du nachher.',
      nutzen:'Das ist das Fenster für eine Sache, die du schon lange ändern willst und bisher nie durchgezogen hast. Der Widerstand dagegen ist jetzt am schwächsten.',
      tech:'Pluto'
    },
    Neptun: {
      was:'Die Konturen werden weich. Sehnsucht und Wirklichkeit lassen sich schwerer unterscheiden als sonst — in beide Richtungen: man idealisiert, und man übersieht.',
      tempo:'Das zieht sich über Jahre und hat keinen scharfen Anfang.',
      tun:'Lass alles Wichtige von jemandem gegenlesen, der nicht beteiligt ist. Verträge unterschreibst du in diesen Wochen besser mit dem Kopf als aus dem Bauch.',
      nutzen:'Gut für alles, was Vorstellungskraft braucht: gestalten, schreiben, heilen, verzeihen. Schlecht für alles, was Genauigkeit braucht.',
      tech:'Neptun'
    },
    Uranus: {
      was:'Etwas bricht aus der Ordnung aus. Es kommt plötzlich, auch wenn es sich lange angekündigt hat, und es kommt selten so, wie man es erwartet hat.',
      tempo:'Das zieht sich über Monate. Was daraus folgt, passiert an einem einzigen Nachmittag.',
      tun:'Halte dir etwas frei: einen Abend, einen Puffer im Kalender, eine Entscheidung, die noch offen bleiben darf.',
      nutzen:'Das Fenster für das Unkonventionelle. Was du jetzt anders machst als alle, hat eine bessere Chance als sonst.',
      tech:'Uranus'
    },
    Saturn: {
      was:'Etwas wird ernst. Es verlangt eine Entscheidung, eine Grenze oder eine Rechnung, die offen ist. Es fühlt sich schwer an, und was dabei herauskommt, hält.',
      tempo:'Rund ein halbes bis ein ganzes Jahr, in zwei oder drei Anläufen.',
      tun:'Nimm dir die Sache vor, die du aufschiebst. Was dabei wegbricht, hat nur so ausgesehen, als trüge es.',
      nutzen:'Das beste Fenster für etwas Verbindliches: eine Zusage, ein Vertrag, eine Struktur, eine Absage. Gerade weil es schwerfällt, hält es nachher.',
      tech:'Saturn'
    },
    Jupiter: {
      was:'Etwas wird größer und leichter. Türen gehen auf, Menschen sagen ja, und es kostet weniger Überredung als üblich.',
      tempo:'Rund ein Jahr, mit einer deutlichen Spitze darin.',
      tun:'Fragen. Jetzt. Was du in diesem Fenster nicht fragst, musst du später teurer verhandeln.',
      nutzen:'Das Fenster zum Ausweiten: anbieten, bewerben, veröffentlichen, vorstellen, mehr verlangen.',
      tech:'Jupiter'
    },
    Mars: {
      was:'Es wird heiß. Energie, Ungeduld und Reibung — man will handeln, auch wenn es noch nicht Zeit ist.',
      tempo:'Einige Tage bis zwei Wochen.',
      tun:'Die Energie in etwas Körperliches stecken, bevor sie in ein Gespräch gerät. Dann das Gespräch führen.',
      nutzen:'Gut für Anfänge, Konfrontationen, die lange fällig sind, und alles, was Mut braucht. Schlecht für Geduldsarbeit.',
      tech:'Mars'
    },
    Venus: {
      was:'Es wird angenehm. Begegnungen gehen leichter, Geschmack und Zuneigung sind nah an der Oberfläche.',
      tempo:'Wenige Tage.',
      tun:'Das Treffen ansetzen, das Schöne kaufen, den Frieden anbieten. Kleine Fenster, kleine Dinge.',
      nutzen:'Gut für Versöhnung, Verhandlung und alles, was von Sympathie lebt.',
      tech:'Venus'
    },
    Merkur: {
      was:'Es wird gesprächig. Gedanken sortieren sich, Nachrichten kommen, und Dinge, die lange nur gefühlt wurden, finden plötzlich Worte.',
      tempo:'Wenige Tage.',
      tun:'Das Gespräch führen, das Schreiben schreiben, die Frage stellen, die du dir schon lange selbst beantwortest.',
      nutzen:'Gut für Klärung, Absprachen und Papiere — also für alles, was danach schriftlich vorliegen soll.',
      tech:'Merkur'
    },
    Sonne: {
      was:'Etwas kommt ins Licht. Für ein paar Tage steht dieser Bereich mehr im Vordergrund als die anderen.',
      tempo:'Rund drei bis vier Tage.',
      tun:'Zeig dich. Schick die Mail, melde dich, mach den Vorschlag — man sieht dich diese Tage besser.',
      nutzen:'Gut für Sichtbarkeit, schlecht als Grundlage für große Schlüsse — es geht so schnell vorbei, wie es kam.',
      tech:'Sonne'
    }
  };

  /* ── Wie es ankommt ─────────────────────────────────────────── */
  var B_ART = {
    zusammen:   { wie:'Es trifft einen Punkt bei dir direkt und mit voller Wucht.',   ton:'direkt',  tech:'Konjunktion' },
    gegenueber: { wie:'Es kommt von außen, über andere Menschen oder Umstände.',       ton:'von außen', tech:'Opposition' },
    spannung:   { wie:'Es reibt. Zwei Dinge wollen gleichzeitig und schließen sich aus — das ist der Druck, den du spürst.', ton:'reibend', tech:'Quadrat' },
    leicht:     { wie:'Es geht glatt. So glatt, dass es leicht ungenutzt vorbeigeht.', ton:'leicht',  tech:'Trigon oder Sextil' }
  };

  /* ── Hausdurchgang: eine lange Passage, kein Ereignis ───────── */
  var B_DURCH = {
    einl:'Hierhin geht gerade die meiste Zeit und die meiste Aufmerksamkeit, über Monate oder Jahre. Was du hier entscheidest, wiegt schwerer als sonst.',
    rueck:'Gerade geht es rückwärts. Etwas, das du schon einmal durch hattest, kommt wieder — meistens, weil beim ersten Mal eine Frage offen blieb.'
  };

  /* ── Die zwölf Felder, für den natalen Teil ──────────────────
     kurz     — worum es in diesem Feld geht, ohne Fachwort
     meistern — was man daran lernen kann */
  var B_HAUS = {
    1:  { kurz:'wie du auftrittst und wie man dich zuerst wahrnimmt',
          meistern:'Auftreten und Absicht zur Deckung bringen, damit die Leute mit dir reden statt mit einer Rolle.' },
    2:  { kurz:'was du hast, verdienst und wert bist',
          meistern:'Einen Preis nennen, ohne ihn vorher zu drücken.' },
    3:  { kurz:'wie du redest, lernst und mit dem Nahbereich umgehst',
          meistern:'Zuhören, ohne schon die Antwort zu bauen.' },
    4:  { kurz:'wo du herkommst und wo du landest',
          meistern:'Ein Zuhause bauen, das nicht das deiner Eltern ist — weder Kopie noch Gegenentwurf.' },
    5:  { kurz:'was du machst, weil es Freude macht',
          meistern:'Etwas zeigen, bevor es fertig ist — und aushalten, dass es dann schon beurteilt wird.' },
    6:  { kurz:'dein Alltag, deine Arbeit, dein Körper im Betrieb',
          meistern:'Routinen bauen, die auch an schlechten Tagen halten — also kleinere, als du gern hättest.' },
    7:  { kurz:'wie du dich mit einem anderen Menschen verbindest',
          meistern:'Nah sein und dabei bleiben, wer du bist. Beides gleichzeitig, nicht abwechselnd.' },
    8:  { kurz:'Verbindlichkeit, Loslassen, geteilte Dinge',
          meistern:'Abhängigkeit aushalten, ohne sich zu verlieren, und loslassen, bevor man gezwungen wird.' },
    9:  { kurz:'deine Überzeugungen und wohin du willst',
          meistern:'Eine Haltung haben, die neue Tatsachen überlebt.' },
    10: { kurz:'wofür man dich kennt',
          meistern:'Etwas fertig machen, das deinen Namen trägt.' },
    11: { kurz:'deine Leute und wo du dazugehörst',
          meistern:'Dazugehören, ohne sich anzupassen, bis nichts mehr übrig ist.' },
    12: { kurz:'was im Verborgenen liegt, Rückzug und Erschöpfung',
          meistern:'Rückzug planen, bevor der Körper ihn erzwingt.' }
  };

  /* ── Die Facetten eines Bereichs ────────────────────────────
     Jeder Bereich hat mehrere Seiten. Welche davon bei einem
     Menschen oben steht, entscheidet das Geburtsbild, nicht diese
     Datei: haus und wer sagen dem Rechner, woran eine Facette
     hängt — er gewichtet und sortiert, die Datei liefert nur Text.
     titel/was/meistern sind Laientext und bleiben ohne Fachwort.
     wer ist Maschinenraum und erscheint erst ab Stufe 2. */
  var B_FACET = {
    liebe: [
      { k:'binden', haus:7, wer:['Venus','Mond'],
        titel:'Wie du dich bindest',
        was:'Wie du dich an einen anderen Menschen bindest: wie schnell, wie fest, und was du dabei von dir abgibst. Hier zeigt sich, ob Nähe für dich eine Erweiterung ist oder eine Verkleinerung.',
        meistern:'Nah sein und ansprechbar bleiben für das, was du selbst willst.' },
      { k:'verliebt', haus:5, wer:['Venus','Mars','Sonne'],
        titel:'Verliebtsein und Begehren',
        was:'Das Verliebtsein selbst: Anziehung, Spiel, der Reiz am Anfang. Hier entscheidet sich, ob du dich traust, Interesse zu zeigen, bevor du weißt, wie es ausgeht.',
        meistern:'Interesse zeigen, ohne vorher zu wissen, ob es erwidert wird.' },
      { k:'ernst', haus:8, wer:['Pluto','Mars','Saturn'],
        titel:'Wenn es ernst wird',
        was:'Was passiert, wenn aus Verliebtsein Verbindlichkeit wird: Vertrauen, Eifersucht, Geld, Abhängigkeit. Das ist der Teil, der am Anfang nicht vorkommt und später alles entscheidet.',
        meistern:'Abhängigkeit aussprechen, statt sie zu verstecken.' },
      { k:'muster', haus:7, wer:['Saturn','Uranus'],
        titel:'Dein Muster bei der Wahl',
        was:'Wen du immer wieder wählst, und woran du merkst, dass es wieder dieselbe Sorte Mensch ist. Muster sind kein Schicksal, aber sie wiederholen sich, solange niemand sie benennt.',
        meistern:'Das eigene Muster benennen, ohne dich dafür zu verurteilen.' }
    ],
    beruf: [
      { k:'ruf', haus:10, wer:['Sonne','Saturn','Jupiter'],
        titel:'Wofür man dich kennt',
        was:'Das Bild, das andere von deiner Arbeit haben. Es entsteht aus dem, was fertig geworden ist, nicht aus dem, was du könntest. In diesem Abstand liegt der Unterschied zwischen Begabung und Ruf.',
        meistern:'Zeigen, was fertig ist, nicht, was du könntest.' },
      { k:'alltag', haus:6, wer:['Merkur','Mars','Saturn'],
        titel:'Der Alltag der Arbeit',
        was:'Wie deine Arbeitstage wirklich aussehen: Abläufe, Kollegen, die kleinen Reibungen. Hier entscheidet sich, ob eine Stelle trägt, lange bevor die große Frage nach der Richtung kommt.',
        meistern:'Reibung ansprechen, solange sie noch klein ist.' },
      { k:'lohn', haus:2, wer:['Venus','Jupiter'],
        titel:'Was es dir einbringt',
        was:'Was du für die Arbeit bekommst, und ob es dem entspricht, was du hineinsteckst. Das ist die Hauptfrage. Eine Aufgabe, die dich nicht trägt, verbraucht dich auch dann, wenn sie dir liegt.',
        meistern:'Den Preis nennen, bevor man dich danach fragt.' },
      { k:'wechsel', haus:10, wer:['Uranus','Neptun','Pluto'],
        titel:'Bleiben oder gehen',
        was:'Die Frage, ob du bleibst. Sie kommt selten als Entschluss, sondern als langsames Nachlassen von Interesse. Wer sie zu lange vertagt, trifft sie am Ende nicht mehr selbst.',
        meistern:'Gehen, solange es noch deine Entscheidung ist.' }
    ],
    gesundheit: [
      { k:'taeglich', haus:6, wer:['Merkur','Mars','Saturn'],
        titel:'Was du täglich machst',
        was:'Schlaf, Essen, Bewegung, Pausen. Nichts davon ist interessant, und alles davon entscheidet, wie viel du aushältst. Der Körper rechnet in Wochen, nicht in guten Vorsätzen.',
        meistern:'Etwas Kleines jeden Tag, statt etwas Großes selten.' },
      { k:'kraft', haus:1, wer:['Sonne','Mars'],
        titel:'Deine Kraft und ihr Maß',
        was:'Wie viel Kraft du hast und wie du mit ihr umgehst. Manche merken zu spät, dass sie am Ende sind, andere schon beim ersten Widerstand. Beides ist ein Problem mit dem Maß, nicht mit der Kraft.',
        meistern:'Das eigene Maß kennen und es nicht täglich neu verhandeln.' },
      { k:'leer', haus:12, wer:['Neptun','Saturn','Mond'],
        titel:'Erschöpfung und Rückzug',
        was:'Das Thema, das sich nicht ankündigt: Müdigkeit, die bleibt, und das Bedürfnis, eine Weile niemanden zu sehen. Rückzug ist keine Schwäche, sondern ein Posten im Haushalt.',
        meistern:'Leere Tage einplanen, statt sie erzwingen zu lassen.' },
      { k:'hilfe', haus:6, wer:['Venus','Jupiter','Mond'],
        titel:'Wer dir dabei hilft',
        was:'Die Menschen, die mit deinem Körper zu tun haben: Behandlung, Beratung, Begleitung. Wie leicht du dir helfen lässt, gehört zur Gesundheit genauso wie das, was du selbst tust.',
        meistern:'Hilfe holen, bevor es dringend wird.' }
    ],
    geld: [
      { k:'rein', haus:2, wer:['Venus','Jupiter','Saturn'],
        titel:'Was hereinkommt',
        was:'Was du verdienst, und wofür. Hier geht es weniger um die Höhe als um die Frage, ob du den Betrag selbst gesetzt hast oder ob er dir gesetzt wurde.',
        meistern:'Den Betrag selbst setzen, statt ihn abzuwarten.' },
      { k:'umgang', haus:2, wer:['Mond','Mars','Merkur'],
        titel:'Wie du damit umgehst',
        was:'Ausgeben, aufschieben, nicht hinsehen. Der Umgang mit Geld hat selten mit Rechnen zu tun und meist mit dem Gefühl, das eine Zahl auslöst, bevor man sie einordnet.',
        meistern:'Hinsehen, während es unangenehm ist, nicht danach.' },
      { k:'geteilt', haus:8, wer:['Pluto','Saturn','Mars'],
        titel:'Geteiltes Geld und Verpflichtungen',
        was:'Alles, was nicht allein dir gehört: gemeinsame Kassen, Verträge, Rückzahlungen, Erbschaften. Das ist der Teil, über den am seltensten gesprochen wird und der am stärksten bindet.',
        meistern:'Über gemeinsames Geld reden, bevor es knapp wird.' },
      { k:'gelegenheit', haus:11, wer:['Jupiter','Uranus','Venus'],
        titel:'Woher Gelegenheiten kommen',
        was:'Geld kommt fast immer über Menschen: über Empfehlungen, über Netze, über Zufälle, die in Wahrheit Beziehungen sind. Wer das unterschätzt, arbeitet mehr für dasselbe Ergebnis.',
        meistern:'Sagen, was du suchst, bevor jemand danach fragt.' }
    ],
    familie: [
      { k:'herkunft', haus:4, wer:['Mond','Saturn'],
        titel:'Woher du kommst',
        was:'Die Familie, in der du angefangen hast, und was von dort mitgekommen ist. Manches davon trägt, manches ist nur alt. Das auseinanderzuhalten ist die halbe Arbeit.',
        meistern:'Behalten, was trägt, und zurücklassen, was nur alt ist.' },
      { k:'wohnen', haus:4, wer:['Venus','Jupiter','Sonne'],
        titel:'Wo du jetzt wohnst',
        was:'Der Ort, an dem du abends ankommst. Ob er dich beruhigt, ob du dort bleiben willst, und ob du ihn eingerichtet hast oder nur bezogen.',
        meistern:'Den Ort einrichten, statt nur in ihm zu wohnen.' },
      { k:'geschwister', haus:3, wer:['Merkur','Mars','Mond'],
        titel:'Geschwister und Nahbereich',
        was:'Die Menschen, mit denen du aufgewachsen bist oder täglich zu tun hast. Alte Rollen halten sich dort besonders lange, weil sie nie jemand ausgesprochen hat.',
        meistern:'Mit Geschwistern reden wie mit Erwachsenen.' },
      { k:'eltern', haus:10, wer:['Saturn','Pluto','Sonne'],
        titel:'Die Eltern heute',
        was:'Was aus dem Verhältnis zu den Eltern geworden ist, jetzt, wo alle älter sind. Verantwortung dreht sich in diesen Jahren oft um, und das kommt für beide Seiten zu früh.',
        meistern:'Verantwortung übernehmen, ohne wieder Kind zu werden.' }
    ],
    freunde: [
      { k:'leute', haus:11, wer:['Jupiter','Venus','Uranus'],
        titel:'Deine Leute',
        was:'Die Menschen, die du dir ausgesucht hast. Wie viele es sind, sagt wenig. Ob du dort anrufen würdest, wenn es schlecht läuft, sagt fast alles.',
        meistern:'Anrufen, während es schlecht läuft, nicht hinterher.' },
      { k:'dazu', haus:11, wer:['Saturn','Pluto','Mond'],
        titel:'Dazugehören',
        was:'Gruppen, Vereine, Teams, Milieus. Die Frage ist immer dieselbe: Wie viel von dir legst du ab, um dabei zu sein, und merkst du es noch, während du es tust.',
        meistern:'Merken, was du ablegst, um dabei zu sein.' },
      { k:'streit', haus:7, wer:['Venus','Mars','Saturn'],
        titel:'Streit und Versöhnung',
        was:'Was passiert, wenn es zwischen dir und jemandem kippt. Manche gehen zu früh, manche bleiben zu lang. Das Thema ist nicht der Streit, sondern wie er endet.',
        meistern:'Einen Streit beenden, ohne dass einer verliert.' },
      { k:'locker', haus:3, wer:['Merkur','Mond','Jupiter'],
        titel:'Der lockere Kreis',
        was:'Nachbarn, Kollegen, Bekannte vom Sehen. Dieser Kreis wird unterschätzt: er kostet wenig und trägt im Alltag oft mehr als die wenigen engen Bindungen.',
        meistern:'Lose Verbindungen pflegen, bevor du sie brauchst.' }
    ],
    freude: [
      { k:'zwecklos', haus:5, wer:['Venus','Sonne','Mars'],
        titel:'Was du ohne Zweck tust',
        was:'Das, was du tust, wenn niemand zusieht und es zu nichts führt. Erwachsene streichen es als Erstes, weil es sich am leichtesten streichen lässt und niemandem auffällt.',
        meistern:'Zeit für etwas freihalten, das niemandem nützt.' },
      { k:'herstellen', haus:5, wer:['Merkur','Mond','Neptun'],
        titel:'Etwas herstellen',
        was:'Schreiben, bauen, kochen, gestalten. Es geht um die Bereitschaft, etwas aus der Hand zu geben, das erst halb fertig ist. Mit Begabung hat das wenig zu tun.',
        meistern:'Etwas aus der Hand geben, das noch nicht gut ist.' },
      { k:'weite', haus:9, wer:['Jupiter','Uranus','Sonne'],
        titel:'Neugier und Weite',
        was:'Reisen, Lernen, Dinge, die du noch nie gemacht hast. Freude kommt bei vielen Menschen weniger aus Ruhe als aus Neuem, und das geht mit den Jahren leicht verloren.',
        meistern:'Etwas anfangen, in dem du noch schlecht bist.' },
      { k:'zusammen', haus:11, wer:['Venus','Jupiter','Mond'],
        titel:'Freude mit anderen',
        was:'Das, was nur zusammen etwas hergibt: spielen, feiern, singen, gemeinsam albern sein. Allein lässt sich das nicht nachholen, und verabreden muss es jemand.',
        meistern:'Einladen, auch wenn der Anlass dünn ist.' }
    ],
    selbstwert: [
      { k:'auftritt', haus:1, wer:['Sonne','Mars','Saturn'],
        titel:'Wie du auftrittst',
        was:'Der erste Eindruck, den du machst, und wie weit er von dem entfernt ist, was du meinst. Viele Missverständnisse über einen Menschen fangen in diesem Abstand an.',
        meistern:'Dich so zeigen, wie du dich selbst meinst.' },
      { k:'zugestehen', haus:2, wer:['Venus','Jupiter','Mond'],
        titel:'Was du dir zugestehst',
        was:'Wie viel dir zusteht, in deinen eigenen Augen: Zeit, Geld, Platz, Aufmerksamkeit. Das ist eine Entscheidung, wird aber meist wie eine Tatsache behandelt.',
        meistern:'Dir etwas zugestehen, ohne es vorher zu verdienen.' },
      { k:'aussen', haus:1, wer:['Mond','Neptun','Pluto'],
        titel:'Der Blick von außen',
        was:'Wie stark eine Rückmeldung dein Bild von dir verschiebt. Wer sich an fremden Augen misst, hat jeden Tag einen anderen Wert und weiß nie, woran er ist.',
        meistern:'Eine Rückmeldung einordnen, statt sie zu übernehmen.' },
      { k:'geltung', haus:10, wer:['Saturn','Sonne','Uranus'],
        titel:'Geltung und Anerkennung',
        was:'Der Wunsch, dass zählt, was du tust. Er ist nicht peinlich. Er wird erst dort zum Problem, wo er die Richtung bestimmt, statt sie zu begleiten.',
        meistern:'Anerkennung wollen und trotzdem selbst entscheiden.' }
    ],
    sinn: [
      { k:'halten', haus:9, wer:['Jupiter','Sonne','Merkur'],
        titel:'Woran du dich hältst',
        was:'Die Sätze, nach denen du entscheidest, auch wenn du sie nie aufgeschrieben hast. Die meisten Menschen entdecken sie erst, wenn jemand ernsthaft widerspricht.',
        meistern:'Sagen können, woran du dich hältst, in drei Sätzen.' },
      { k:'richtung', haus:9, wer:['Saturn','Uranus','Pluto'],
        titel:'Wohin es gehen soll',
        was:'Die Richtung für die nächsten Jahre. Eine Richtung, kein Ziel. Genug, um zu entscheiden, was wegfällt, und offen genug, um sich unterwegs zu irren.',
        meistern:'Eine Richtung wählen und dadurch etwas streichen.' },
      { k:'zieht', haus:5, wer:['Venus','Mars','Mond'],
        titel:'Was dich zieht',
        was:'Sinn zeigt sich bei vielen Menschen in dem, was sie ohnehin immer wieder tun, und kaum im Nachdenken darüber. Das ist ein brauchbarer Hinweis, und er wird regelmäßig übergangen.',
        meistern:'Dem nachgehen, was du ohnehin nicht lässt.' },
      { k:'leere', haus:12, wer:['Neptun','Saturn','Mond'],
        titel:'Wenn nichts trägt',
        was:'Die Zeit, in der nichts trägt und alles gleichgültig wirkt. Sie gehört dazu und ist kein Fehler. Sie ist aber der schlechteste Moment für große Entschlüsse.',
        meistern:'Keine großen Entschlüsse in leeren Wochen treffen.' }
    ],
    umbruch: [
      { k:'ende', haus:8, wer:['Pluto','Saturn','Mars'],
        titel:'Was zu Ende geht',
        was:'Etwas, das lange getragen hat, trägt nicht mehr. Meist weiß man es früher, als man es zugibt, und die Zeit zwischen Wissen und Zugeben ist die anstrengendste.',
        meistern:'Aussprechen, was du längst weißt, auch ungefragt.' },
      { k:'lassen', haus:8, wer:['Venus','Mond','Neptun'],
        titel:'Loslassen',
        was:'Die Frage, wie man etwas aus der Hand gibt, ohne es zu zerschlagen. Wer zu lange hält, verliert es trotzdem, nur unfreundlicher und mit mehr Schaden.',
        meistern:'Aus der Hand geben, bevor es genommen wird.' },
      { k:'dazwischen', haus:12, wer:['Neptun','Pluto','Saturn'],
        titel:'Die Zeit dazwischen',
        was:'Zwischen dem Ende und dem Anfang liegt eine Strecke ohne Form. Sie fühlt sich an wie Stillstand und ist in Wahrheit Arbeit. Abkürzen lässt sie sich trotzdem nicht.',
        meistern:'Die Strecke ohne Form aushalten, statt sie zu füllen.' },
      { k:'danach', haus:4, wer:['Mond','Saturn','Uranus'],
        titel:'Was danach bleibt',
        was:'Nach einem Bruch stellt sich die Frage, wohin du gehst und wer dann noch da ist. Das entscheidet über die nächsten Jahre oft mehr als der Bruch selbst.',
        meistern:'Vorher wissen, wohin du gehst, nicht erst danach.' }
    ]
  };

  /* ── Das lange Kapitel, falls die Zeitenseite mitrechnet ───── */
  var B_KAP = {
    laut:'Das hier ist seit Jahren eine deiner großen Baustellen. Es kommt in Schüben: Monate, in denen nichts ist, und dann drei Wochen, in denen alles gleichzeitig kommt.',
    leise:'Das läuft seit Jahren leise mit. Es verändert sich in so kleinen Schritten, dass du es erst im Rückblick siehst.',
    nurKapitel:'Gerade zieht nichts Großes daran. Was sich ändert, ändert sich im Kleinen: in einem Gespräch, an einem Dienstag, ohne Ankündigung.',
    widerspruch:'Die lange Linie und dieses Jahr ziehen in verschiedene Richtungen. Die Linie sagt, wohin es über Jahre geht. Das Jahr sagt, wie es sich gerade anfühlt.',
    tech:'Zodiakale Freilassung, erste und zweite Ebene'
  };

  /* ── Wenn nichts läuft ───────────────────────────────────────
     Ein stiller Bereich ist der Normalfall, nicht der Ausfall. Die
     Sätze dafür standen bis heute in bereich-app.js — dieselbe
     Fehlerklasse wie beim Monatsbericht: ein Satz im Bauwerk wird
     nebenbei geändert und von keiner Prüfung gelesen. Überblick
     und Tiefgang holen sie jetzt beide hier. */
  var B_LEER = {
    keinVorgang:'Hier zieht gerade nichts an dir. So ist es die meiste Zeit und an den meisten Stellen des Lebens — es brennt selten überall auf einmal.',
    keinFenster:'Nichts, was in nächster Zeit zu Ende geht.',
    tun:'Fang hier selbst etwas an. Von außen kommt gerade kein Anstoß, und genau das ist die Gelegenheit: Du hast freie Hand und baust in Ruhe, was später tragen soll.',
    nutzen:'Nimm die Ruhe für das, was später Kraft kostet: vorbereiten, sortieren, den Termin machen.',
    natalLeer:'Hier ist dir nichts in die Wiege gelegt. Es zieht dich von selbst woandershin, und was an dieser Stelle entsteht, entsteht, weil du es machst. Das kostet mehr Absicht und wird dafür wirklich deins.'
  };

  /* ── Fugen und Formen ────────────────────────────────────────
     Alles, was gebaute Sätze zusammenhält: Monatsnamen, Zeitwörter,
     und die Formen, in die der Bauer seine Zahlen einsetzt.

     Warum das hier steht und nicht im Bauer: Dieselbe Fehlerklasse
     wie beim Monatsbericht. Steht ein Satz im Bauwerk, wird er dort
     nebenbei geändert, und niemand prüft ihn. Steht er hier, ist er
     Text und wird geprüft wie jeder andere. tief-bauer.js darf
     deshalb keinen eigenen Satz enthalten; der Bau prüft das. */
  var B_FORM = {
    monate:['Januar','Februar','März','April','Mai','Juni','Juli',
            'August','September','Oktober','November','Dezember'],
    zeichen:['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau',
             'Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische'],
    /* Zeitspannen. Unter einem Jahr in Monaten oder Wochen, darüber
       in Jahren — nie "17 Monate" neben "1,5 Jahre". */
    laeuftAus:'läuft aus',
    tag:'Tag', tage:'Tage',
    woche:'Woche', wochen:'Wochen',
    einMonat:'Monat', vieleMonate:'Monate',
    einJahr:'etwa ein Jahr', vieleJahre:'etwa {n} Jahre',
    /* Das Fenster eines Vorgangs */
    fensterOffen:'Das läuft noch über Jahre hinaus — ein Ende ist in dieser Rechnung nicht in Sicht.',
    fensterKurz:'Noch {d}.',
    fensterBis:'Noch {d}, bis etwa {m}.',
    fensterSeit:'Angefangen hat es vor {d}.',
    /* Mechanik. Wartet bis Wissensstufe 2 und steht nie im Laientext. */
    techDurchgang:'{p} läuft durch das {h}. Haus',
    techAspekt:'{p} {a} {z}, {g} Grad vom exakten Stand',
    techRueck:', rückläufig',
    techZu:', zulaufend',
    techWeg:', weggehend',
    techNatal:'Natal darin: {p}.',
    techNatalLeer:'Natal unbesetzt.',
    techFeldNr:'{h}. Haus',
    techFacDrin:', natal darin: {p}',
    techFacBereich:', im Bereich, aber anderes Haus: {p}',
    techFacBesetzt:', natal besetzt, aber nicht von den Punkten dieser Facette',
    techFacLeer:', natal unbesetzt',
    techGewicht:' (Gewicht {g})'
  };

  /* ── Was sich in einem Bereich widerspricht ──────────────────
     Der Rechner findet die Widersprüche, hier stehen die Worte
     dafür. Drei Sorten, und ein Satz für den Fall, dass die
     Rechnung keinen findet — denn dann wird keiner erfunden.
     {a} und {b} füllt der Tiefgang mit dem, worum es an der
     jeweiligen Stelle geht; die Mechanik dazu wartet in tech. */
  var B_WID = {
    vor:'Ein Lebensbereich zieht fast immer in zwei Richtungen. Was hier steht, ist kein Fehler an dir, sondern die Form, in der dieser Bereich bei dir arbeitet.',
    keiner:'Hier findet die Rechnung keinen Gegenzug. Das heißt nicht, dass es keinen gibt — nur, dass er nicht aus den Stellen kommt, die hier gerechnet werden. Was du selbst an Widerspruch kennst, gilt trotzdem.',
    anlageZwei:'Zwei Stellen in diesem Bereich ziehen bei dir von Anfang an in verschiedene Richtungen. Die eine: {a}. Die andere: {b}. Beide gehören dir, und beide verlangen etwas anderes. Das löst sich nicht auf; es wird mit den Jahren nur besser zu bedienen.',
    anlageEins:'An einer einzigen Stelle — {a} — ziehen bei dir zwei Kräfte auseinander. Von außen sieht das nach Unentschlossenheit aus. Von innen ist es ein Spagat.',
    anlageTun:'Nicht entscheiden, welche Seite recht hat, sondern beiden eine eigene Zeit geben. Was abwechselnd Platz bekommt, muss nicht gegeneinander kämpfen.',
    zugleich:'Gerade läuft hier beides zur selben Zeit: etwas, das reibt, und etwas, das trägt. Deshalb kommt dir dieser Bereich widersprüchlich vor — er ist es auch.',
    zugleichTun:'Das Tragende für das benutzen, was am Reibenden hängt. Der leichte Teil ist das Werkzeug, nicht die Belohnung.',
    kapitel:'Die lange Linie und diese Wochen ziehen in verschiedene Richtungen. Beides gilt: Die Linie sagt, worum es über Jahre geht. Die Wochen sagen, wie es sich heute anfühlt.',
    kapitelTun:'Miss die ganze Sache an der langen Linie, nicht an diesen Wochen. Wer auf einer leisen Strecke aufgibt, gibt mitten in etwas auf, das noch läuft.',
    techAnlage:'Natal {x} {w} {y}, {g} Grad vom exakten Stand',
    techAnlageAuch:'; ebenso zwischen denselben Häusern: {p}',
    techWinkel:{ quadrat:'Quadrat', opposition:'Opposition' },
    techZugleich:'Reibender und tragender Transit gleichzeitig im selben Bereich',
    techKapitel:'Erste und zweite Ebene der zodiakalen Freilassung weichen in der Winkelhaftigkeit voneinander ab'
  };

  /* ── Zum Darübersprechen ─────────────────────────────────────
     Drei Fragen und eine Grenze je Bereich. Für die Coachin, die
     Therapeutin, oder für jemanden, dem man vertraut.

     Es sind Fragen, keine Deutungen: die Antwort steht nicht hier
     und wird auch nicht nahegelegt. Und jede Grenze sagt, was
     dieser Bereich über das Leben eines Menschen nicht weiß —
     das ist der Teil, den sonst niemand mitliefert.
     Eine Diagnose steht hier nie; der Bau prüft das.

     Seit heute stehen diese Fragen nicht mehr nur im Tiefgang,
     sondern auf der Seite selbst — in einer zugeklappten Schublade
     unter den fünf Blöcken jedes Bereichs. REGELN.md Abschnitt 1:
     Die Sicht der Coachin wird zugeklappt angeboten, nie im
     Vordergrund. Der Rahmen dafür steht hier und nicht in der
     Anzeige, damit er geprüft wird wie jeder andere Text. */
  var B_FRAGEN = {
    rahmen: {
      titel:'Mit jemand anderem darüber sprechen',
      vor:'Drei Fragen, die du mitnehmen kannst — zu einer Coachin, in eine Therapie, oder zu jemandem, dem du vertraust. Die Antworten stehen nicht hier, und das ist der Sinn der Fragen.',
      grenzeVor:'Und was dieser Bereich über dich nicht weiß:'
    },
    liebe: {
      fragen:[
        'Wann hast du zuletzt etwas gewollt und es auch gesagt?',
        'Woran merkst du, dass du dich in einer Verbindung kleiner machst?',
        'Was müsste jemand tun, damit du ihm glaubst?'],
      grenze:'Ob eine bestimmte Beziehung trägt, steht hier nicht. Die Rechnung kennt deine Anlage, nicht den Menschen neben dir — und über ihn sagt sie ohnehin nichts, solange er nicht selbst gefragt wurde.'
    },
    beruf: {
      fragen:[
        'Was von deiner Arbeit ist in den letzten zwei Jahren wirklich fertig geworden?',
        'Wofür möchtest du gelten, und wofür kennt man dich bisher?',
        'Was hält dich an deiner Stelle — das Gute daran oder die Kosten des Gehens?'],
      grenze:'Ob ein Wechsel richtig ist, entscheidet dein Leben und nicht diese Rechnung. Sie sagt, wo gerade Bewegung liegt, nicht, wohin du gehen sollst.'
    },
    gesundheit: {
      fragen:[
        'Woran merkst du zuerst, dass du über deine Kraft gehst?',
        'Welche Routine hält bei dir auch an einem schlechten Tag?',
        'Was tust du, wenn der Körper nicht mehr mitmacht, und was davon hilft wirklich?'],
      grenze:'Hier wird nichts über deinen Körper festgestellt, und nichts hier ersetzt eine Behandlung. Bei allem Körperlichen gehört eine Fachperson gefragt, die dich untersuchen kann — diese Seite kann das nicht und soll es nicht.'
    },
    geld: {
      fragen:[
        'Wann hast du zuletzt eine Zahl genannt, ohne sie vorher kleiner zu machen?',
        'Was wäre genug, und woran würdest du es merken?',
        'Welche Ausgabe schützt dich wirklich, und welche beruhigt dich nur?'],
      grenze:'Über deine Lage sagt diese Rechnung nichts. Sie kennt keine Konten, keine Verträge und keine Preise, und sie ist keine Beratung.'
    },
    familie: {
      fragen:[
        'In welche Rolle rutschst du, sobald du zu Hause bist?',
        'Was von deinem Zuhause hast du selbst gewählt?',
        'Welches Gespräch mit wem schiebst du seit Jahren vor dir her?'],
      grenze:'Was einen anderen in deiner Familie bewegt, steht hier nicht. Über Menschen, die nicht selbst gefragt wurden, sagt diese Seite nichts.'
    },
    freunde: {
      fragen:[
        'Bei wem musst du dich nicht erklären?',
        'Wo bleibst du dabei, obwohl es längst nicht mehr stimmt?',
        'Wann hast du zuletzt selbst gefragt, ob jemand Zeit hat?'],
      grenze:'Ob eine Freundschaft hält, lässt sich hier nicht ablesen. Die Rechnung sagt, wo bei dir Bewegung liegt, nicht, wer bleibt.'
    },
    freude: {
      fragen:[
        'Was tust du, wenn niemand zusieht und es keinen Nutzen hat?',
        'Wann hast du zuletzt etwas angefangen, ohne es zu Ende bringen zu müssen?',
        'Was hast du als Kind gern gemacht, und seit wann nicht mehr?'],
      grenze:'Dass Freude fehlt, kann viele Gründe haben, und dieser Bereich nennt keinen davon. Hält es länger an und wird es schwer, gehört ein Mensch gefragt und nicht eine Seite gelesen.'
    },
    selbstwert: {
      fragen:[
        'Woran misst du gerade, ob du genug bist?',
        'Wessen Stimme hörst du, wenn du streng mit dir wirst?',
        'Was würdest du einem Menschen sagen, der dir erzählt, was du dir erzählst?'],
      grenze:'Diese Seite stellt nichts über dich fest. Sie beschreibt ein Muster und misst keinen Wert; wie du dich siehst, ist hier nicht nachlesbar.'
    },
    sinn: {
      fragen:[
        'Welche Überzeugung von dir hat die letzten fünf Jahre überlebt?',
        'Wohin willst du, wenn niemand fragt, ob das vernünftig ist?',
        'Was glaubst du, weil du es selbst gesehen hast, und was, weil es dir gesagt wurde?'],
      grenze:'Wohin dein Weg geht, sagt diese Rechnung nicht. Sie sagt, wann die Frage laut wird, nicht, was die Antwort ist.'
    },
    umbruch: {
      fragen:[
        'Was ist gerade zu Ende, auch wenn es noch steht?',
        'Was willst du mitnehmen, und was lässt du bewusst zurück?',
        'Wer weiß, dass es dir gerade so geht?'],
      grenze:'Dass etwas laut ist, heißt nicht, dass es schlimm wird, und kein Datum hier ist ein Ereignis. Wird ein Umbruch zu viel, gehört ein Mensch gefragt und nicht eine Seite gelesen.'
    }
  };

  /* ── Der Tiefgang ────────────────────────────────────────────
     Die Seite zeigt den Überblick: was los ist, was du tun kannst,
     wie lange es läuft. Der Tiefgang ist dieselbe Rechnung, zu Ende
     geschrieben — und er geht als Datei heraus, statt auf der Seite
     zu stehen.

     Warum als Datei: Diese Plattform ist eine statische Seite ohne
     Server. Alles, was im Quelltext steht, kann jeder lesen. Ein
     Tiefgang hinter einem Schalter wäre deshalb nicht verkauft,
     sondern verschenkt — und der Schalter eine Lüge. Der Tiefgang
     entsteht stattdessen auf dem Gerät, aus den Daten des Menschen,
     der ihn anfordert, und gehört ihm.

     Hier stehen nur Überschriften und Rahmensätze. Alles Weitere
     holt der Tiefgang aus den Blöcken darüber. */
  var B_TIEF = {
    titel:'Tiefgang',
    vor:'Dieser Text ist auf dem Gerät entstanden, aus den Geburtsdaten, die dort gespeichert sind. Er geht über den Überblick auf der Seite hinaus: woher ein Thema kommt, welche Seiten es hat, was sich darin widerspricht, und was man darüber sprechen kann.',
    ueberblickTitel:'Was gerade läuft',
    herkunftTitel:'Woher das bei dir kommt',
    facettenTitel:'Die Seiten dieses Bereichs',
    widTitel:'Was sich hier widerspricht',
    fragenTitel:'Zum Darübersprechen',
    ehrlichTitel:'Was das taugt — und was nicht',
    herkunftVor:'Bei dir liegt das Gewicht hier auf dem, was man so beschreiben kann:',
    facettenVor:'Dieser Bereich hat mehrere Seiten. Die Reihenfolge kommt aus dem Geburtsbild: was oben steht, wiegt bei diesem Menschen mehr. Der Überblick auf der Seite zeigt nur die ersten davon.',
    fragenVor:'Drei Fragen für ein Gespräch — mit einer Coachin, einer Therapeutin, oder mit jemandem, dem du vertraust. Es sind Fragen und keine Deutungen: die Antwort steht nicht hier.',
    grenzeVor:'Was dieser Bereich nicht weiß:',
    /* Was auf der Seite über den Tiefgang steht. Ehrlich, weil es
       hier nichts zu verbergen gibt: Diese Seite hat keinen Server,
       also ist nichts verschlossen. Der Tiefgang ist nicht
       versteckt, sondern noch nicht geschrieben. */
    seiteTitel:'Der Tiefgang',
    seiteVor:'Oben steht der Überblick: was los ist, was du tun kannst, wie lange es läuft. Der Tiefgang ist dieselbe Rechnung, zu Ende geschrieben — woher ein Thema bei dir kommt, welche Seiten es hat, was sich darin widerspricht, und drei Fragen, mit denen man darüber sprechen kann.',
    seiteOffen:'Er liegt nicht hinter einem Schloss. Diese Seite hat keinen Server, deshalb wäre jedes Schloss hier nur gemalt. Der Tiefgang ist einfach noch nicht geschrieben: Er entsteht beim Antippen auf deinem Gerät, aus den Daten, die dort liegen, und wird als Textdatei gespeichert. Niemand anders bekommt ihn zu sehen.',
    seiteStufe:'Er ist so ausführlich, wie dein Wissensstand oben eingestellt ist. Steht der auf der untersten Stufe, kommt die Datei ohne ein einziges Fachwort.',
    knopfAlle:'Tiefgang zu allen gewählten Bereichen',
    knopfEiner:'Tiefgang zu diesem Bereich',
    echoFertig:'Die Datei ist geschrieben: {n}',
    echoOhne:'Dafür fehlt ein Profil. Leg eines unter Profile an.',
    tunVor:'Ein Handgriff dazu:',
    fuss:'Astro-Charlie · Der Tiefgang ist ein Werkzeug zum Verstehen, keine Diagnose, keine Vorhersage und kein Ersatz für Behandlung. Dein eigenes Erleben hat Vorrang vor allem, was hier steht.'
  };

  /* ── Die langen Texte zu einem Bereich ──────────────────────── */
  /* Zu zehn der Themen gibt es seit den Anfängen der Plattform eine
     eigene, lange Seite — nach der Frage geordnet, mit der ein
     Mensch tatsächlich kommt, und ohne Zeitbezug. Diese Seiten
     waren bisher nur über eine eigene Übersicht erreichbar: Wer
     beim lautesten Bereich ankam und weiterlesen wollte, fand sie
     nicht.

     Hier steht, welche Seite zu welchem Bereich gehört und was auf
     ihr steht — in Alltagssprache, weil der Verweis auf Stufe 0
     sichtbar ist. Zwei Bereiche dürfen auf dieselbe Seite zeigen:
     "Warum nehme ich eigentlich zu wenig?" ist eine Frage nach dem
     Geld und eine nach dem eigenen Wert, und die Seite beantwortet
     beide. Was nicht sein darf, ist eine Seite, auf die kein
     Bereich zeigt — das prüft bau-bereiche.py. */
  var B_RAUM = {
    titel:'Zum Nachlesen',
    vor:'Oben steht, was gerade läuft. Zu diesem Bereich gibt es auch einen langen Text ohne Zeitbezug — geordnet nach der Frage, mit der Menschen damit kommen.',
    hin:'Diese Seiten sind älter als der Rest der Plattform. Sie sind gründlich, aber sie reden mehr über die Rechnung als die Seiten hier.',
    seiten:{
      naehe:{ datei:'raum-naehe.html', name:'Nähe',
        was:'Was dich anzieht, wie viel Nähe du zulässt, wie du streitest — und was sich darin immer wiederholt.' },
      berufung:{ datei:'raum-berufung.html', name:'Berufung',
        was:'Was dich antreibt, wofür du gesehen wirst, womit du dein Geld verdienst und wem das alles nützt.' },
      alltag:{ datei:'raum-alltag.html', name:'Alltag',
        was:'Dein eigener Rhythmus, Ordnung die hält, Anfangen und Dranbleiben — und was passiert, wenn es zu viel wird.' },
      koerper:{ datei:'raum-koerper.html', name:'Körper',
        was:'Wie du im Körper bist, wo Anspannung sich zeigt, was mit Schlaf und Genuss zu tun hat und was Bewegung bei dir bewirkt.' },
      andersVerdrahtet:{ datei:'raum-anders-verdrahtet.html', name:'Anders verdrahtet',
        was:'Wie dein Kopf arbeitet, was dich überlastet, wie dein Vorrat an Kraft sich füllt und was du nach einem lauten Tag brauchst.' },
      herkunft:{ datei:'raum-herkunft.html', name:'Herkunft',
        was:'Die Stimmung, in der du groß wurdest, was nie ausgesprochen wurde, was du davon übernommen hast und was du daraus machst.' },
      versorgung:{ datei:'raum-versorgung.html', name:'Versorgung',
        was:'Essen, Trinken, Papierkram, Haushalt, Schlaf — das Einfache, das trotzdem liegen bleibt, und warum das keine Faulheit ist.' },
      selbstwert:{ datei:'raum-selbstwert.html', name:'Selbstwert',
        was:'Einen Preis nennen und ihn stehen lassen, genügen, Nein sagen, Raum einnehmen — und die Sätze, die von früher mitlaufen.' },
      wunderPunkt:{ datei:'raum-wunder-punkt.html', name:'Der wunde Punkt',
        was:'Wo es zuverlässig wehtut, was du deshalb vermeidest, womit du es überdeckst und was tatsächlich hilft.' },
      zugehoerigkeit:{ datei:'raum-zugehoerigkeit.html', name:'Zugehörigkeit',
        was:'Wie du in Gruppen bist, welche Rolle du dort übernimmst, wofür du gebraucht wirst und was dich das Dazugehören kostet.' },
      unerlaubte:{ datei:'raum-unerlaubte.html', name:'Das Unerlaubte',
        was:'Was du dir nicht erlaubst, wie du es verbirgst, wo es trotzdem herauskommt und welche Kraft darin ungenutzt liegt.' },
      sicherheit:{ datei:'raum-sicherheit.html', name:'Sicherheit und Fallenlassen',
        was:'Was Sicherheit für dich bedeutet, wo deine Bremsen sitzen, was du dir nicht erlaubst und was du brauchst, um loszulassen.' }
    },
    /* Welcher Bereich auf welche Seite zeigt. Die Zuordnung ist nach
       dem Inhalt gemacht, nicht nach dem Namen: Der Alltag gehört zum
       Beruf, weil dort die Arbeit steht, die jeden Tag getan wird. */
    zu:{
      liebe:      ['naehe'],
      beruf:      ['berufung', 'alltag'],
      gesundheit: ['koerper', 'andersVerdrahtet'],
      geld:       ['selbstwert'],
      familie:    ['herkunft', 'versorgung'],
      freunde:    ['zugehoerigkeit'],
      freude:     ['unerlaubte'],
      selbstwert: ['selbstwert', 'wunderPunkt'],
      sinn:       ['berufung'],
      umbruch:    ['sicherheit']
    }
  };

  /* ── Was die Seite nicht kann ───────────────────────────────── */
  var B_EHRLICH = [
    { f:'Sagt das, was passieren wird?',
      a:'Nein. Es sagt, worauf gerade Druck liegt und wie lange noch. Was du daraus machst, steht nicht darin.' },
    { f:'Warum ist bei mir fast überall etwas los?',
      a:'Weil immer etwas läuft. Deshalb werden die Bereiche hier gegeneinander sortiert: Interessant ist nicht, ob etwas läuft, sondern wo am meisten.' },
    { f:'Ist das überprüft?',
      a:'Die Rechnung ja, die Deutung nicht. Es gibt keinen Beleg dafür, dass daraus Ereignisse folgen. Was es kann, ist einem Jahr eine Gliederung geben — und das ist für ein Gespräch schon viel.' },
    { f:'Was, wenn ein Bereich still ist und sich trotzdem alles dreht?',
      a:'Dann stimmt dein Erleben und nicht die Seite. Deine Lage hat immer Vorrang. Die Seite kennt nur die Uhr, nicht dein Leben.' }
  ];

  window.AC_BDAT = {
    LAUT:B_LAUT, BER:B_BER, WAND:B_WAND, ART:B_ART,
    DURCH:B_DURCH, HAUS:B_HAUS, FACET:B_FACET,
    KAP:B_KAP, EHRLICH:B_EHRLICH,
    WID:B_WID, FRAGEN:B_FRAGEN, TIEF:B_TIEF, FORM:B_FORM, LEER:B_LEER,
    RAUM:B_RAUM
  };

})();
