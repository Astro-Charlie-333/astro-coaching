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
        'In der Liebe ist es gerade ruhig. Nichts drängt, nichts entscheidet sich.',
        'In der Liebe bewegt sich etwas langsam. Eher ein Tasten als ein Sprung.',
        'In der Liebe ist etwas im Gang, das Folgen hat.',
        'Die Liebe ist gerade dein lautester Bereich.'
      ],
      meistern: 'Die Aufgabe hier ist fast immer dieselbe: etwas wollen und es auch sagen. Nicht andeuten, nicht testen, nicht abwarten, wer zuerst springt.',
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
      meistern: 'Die Aufgabe hier ist, etwas zu tun, das keinen Nutzen hat, und es nicht nachträglich zu rechtfertigen.',
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
      tun:'Nicht gegenhalten. Was jetzt zerfällt, lässt sich nicht retten, und das Festhalten kostet die Kraft, die du nachher brauchst.',
      nutzen:'Das ist das Fenster für eine Sache, die du schon lange ändern willst und bisher nie durchgezogen hast. Der Widerstand dagegen ist jetzt am schwächsten.',
      tech:'Pluto'
    },
    Neptun: {
      was:'Die Konturen werden weich. Sehnsucht und Wirklichkeit lassen sich schwerer unterscheiden als sonst — in beide Richtungen: man idealisiert, und man übersieht.',
      tempo:'Das zieht sich über Jahre und hat keinen scharfen Anfang.',
      tun:'Keine Verträge auf Gefühl unterschreiben. Alles, was wichtig ist, von jemandem nachsehen lassen, der nicht beteiligt ist.',
      nutzen:'Gut für alles, was Vorstellungskraft braucht: gestalten, schreiben, heilen, verzeihen. Schlecht für alles, was Genauigkeit braucht.',
      tech:'Neptun'
    },
    Uranus: {
      was:'Etwas bricht aus der Ordnung aus. Es kommt plötzlich, auch wenn es sich lange angekündigt hat, und es kommt selten so, wie man es erwartet hat.',
      tempo:'Der Zeitraum ist lang, die Ereignisse darin sind kurz und unvermittelt.',
      tun:'Luft lassen. Wer alles festbindet, erlebt den Ruck als Bruch; wer Spiel im System hat, erlebt ihn als Wendung.',
      nutzen:'Das Fenster für das Unkonventionelle. Was du jetzt anders machst als alle, hat eine bessere Chance als sonst.',
      tech:'Uranus'
    },
    Saturn: {
      was:'Etwas wird ernst. Es verlangt eine Entscheidung, eine Grenze oder eine Rechnung, die offen ist. Es fühlt sich schwer an, und was dabei herauskommt, hält.',
      tempo:'Rund ein halbes bis ein ganzes Jahr, in zwei oder drei Anläufen.',
      tun:'Die Sache anschauen, die du aufschiebst. Was jetzt wegbricht, war ohnehin nicht tragfähig — es hat nur so ausgesehen.',
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
      tun:'Nutzen, dass man dich hier gerade sieht.',
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
    einl:'Über einen längeren Zeitraum liegt der Schwerpunkt überhaupt erst in diesem Bereich. Das ist kein Ereignis, sondern ein Hintergrund: Alles, was hier passiert, passiert gerade mit mehr Gewicht als sonst.',
    rueck:'Gerade läuft das rückwärts. Was in diesem Bereich schon einmal dran war, kommt noch einmal vorbei — meist, weil beim ersten Mal etwas offen geblieben ist.'
  };

  /* ── Die zwölf Felder, für den natalen Teil ──────────────────
     kurz     — worum es in diesem Feld geht, ohne Fachwort
     meistern — was man daran lernen kann */
  var B_HAUS = {
    1:  { kurz:'wie du auftrittst und wie man dich zuerst wahrnimmt',
          meistern:'Auftreten und Absicht zur Deckung bringen, damit man nicht mit jemandem spricht, der du nicht bist.' },
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

  /* ── Das lange Kapitel, falls die Zeitenseite mitrechnet ───── */
  var B_KAP = {
    laut:'Über Jahre hinweg ist dieser Bereich bei dir ein Hauptthema. Das heißt nicht, dass jede Woche etwas passiert — es heißt, dass hier mehr geschieht als in den stillen Bereichen.',
    leise:'Über Jahre hinweg läuft dieser Bereich bei dir im Hintergrund. Was hier geschieht, geschieht ohne großen Einschnitt.',
    nurKapitel:'Gerade rührt kein langsamer Vorgang daran. Was in diesem Bereich passiert, passiert deshalb im Alltäglichen und nicht als Einschnitt — und es passiert trotzdem.',
    widerspruch:'Das große Kapitel und der Abschnitt darin sagen Verschiedenes. Beides gilt gleichzeitig: das Kapitel ist der Rahmen, der Abschnitt die aktuelle Tonlage.',
    tech:'Zodiakale Freilassung, erste und zweite Ebene'
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
    DURCH:B_DURCH, HAUS:B_HAUS, KAP:B_KAP, EHRLICH:B_EHRLICH
  };

})();
