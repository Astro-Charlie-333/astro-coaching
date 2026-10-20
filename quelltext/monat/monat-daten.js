/* ───────────────────────────────────────────────────────────────
   monat-daten.js — alle Sätze des Monatsberichts.

   Zwei Regeln, die hier beim Bauen geprüft werden:

   1 · Jeder Satz steht hier vollständig. Nichts wird in
       monat-app.js aus Bruchstücken zusammengeklebt — genau daraus
       entstehen Sätze wie „Der Schwerpunkt liegt auf deinen
       Ausdruck". Lücken heißen {name} und werden nur gefüllt,
       nie erweitert.
   2 · Was ein Laie liest, enthält kein Fachwort. Die Mechanik
       steht getrennt unter TECH und erscheint erst ab Stufe 2.

   *So* markierter Text wird hervorgehoben. HTML steht hier nicht:
   die Anzeige maskiert jeden Wert.
   ─────────────────────────────────────────────────────────────── */
(function(){

  /* ── Rahmen des Briefes ───────────────────────────────────── */
  var M_ANREDE = 'Hallo {vorname},';
  var M_DU     = 'du';

  var M_EINL = 'hier ist dein Überblick für {monat}. Alles darin ist ein '
             + '*Angebot zum Abgleichen*, keine Vorhersage — nimm mit, was '
             + 'dir entspricht, und lass liegen, was nicht passt.';

  var M_H = {
    monat: 'Worauf dieser Monat zeigt',
    daten: 'Zwei Daten zum Merken',
    frage: 'Eine Frage für diesen Monat'
  };

  /* ── Der Schwerpunkt, zwölf ganze Sätze ───────────────────── */
  /* Ganze Sätze, weil der Rahmen sonst nicht zur Fügung passt.
     Reihenfolge: erstes bis zwölftes natales Haus. */
  var M_SCHWERPUNKT = [
    'Dieser Monat zeigt auf *dich selbst und darauf, wie du auftrittst*.',
    'Dieser Monat zeigt auf *deinen Wert und auf das, was dir gehört*.',
    'Dieser Monat zeigt auf *Austausch, Lernen und deinen Nahbereich*.',
    'Dieser Monat zeigt auf *dein Zuhause und deine Wurzeln*.',
    'Dieser Monat zeigt auf *deinen Ausdruck und auf das, was dir Freude macht*.',
    'Dieser Monat zeigt auf *deinen Alltag und deine Arbeit*.',
    'Dieser Monat zeigt auf *deine Beziehungen und dein Gegenüber*.',
    'Dieser Monat zeigt auf *Tiefe, Geteiltes und auf das, was nicht an der Oberfläche liegt*.',
    'Dieser Monat zeigt auf *Sinn, Weite und darauf, wovon du überzeugt bist*.',
    'Dieser Monat zeigt auf *deine berufliche Rolle und darauf, wie du gesehen wirst*.',
    'Dieser Monat zeigt auf *Gruppen, Freundschaften und Ziele*.',
    'Dieser Monat zeigt auf *Rückzug und auf dein Innenleben*.'
  ];

  var M_SCHWERPUNKT_NACH =
      'Das ist der Bereich, in dem in diesen Wochen mehr Aufmerksamkeit '
    + 'hängenbleibt als sonst — manchmal weil etwas ansteht, manchmal '
    + 'einfach, weil es dir auffällt.';

  /* ── Was gerade läuft, in Alltagssprache ──────────────────── */
  var M_LAUF = {
    Jupiter: {
      titel: 'Es geht gerade leichter als sonst.',
      text:  'In diesem Monat öffnet sich etwas. Dinge, die sonst '
           + 'Überwindung kosten, gehen leichter von der Hand — und es '
           + 'lohnt sich, das zu nutzen, statt es für selbstverständlich '
           + 'zu halten.'
    },
    Saturn: {
      titel: 'Es ist gerade zäh — und das hat einen Grund.',
      text:  'Dieser Monat verlangt mehr Aufwand für dasselbe Ergebnis. '
           + 'Das ist kein Zeichen, dass du etwas falsch machst. Es ist '
           + 'eine Phase, in der sich zeigt, was trägt. Was du jetzt '
           + 'aufbaust, hält lange — es fühlt sich beim Bauen nur nicht '
           + 'gut an.'
    },
    Uranus: {
      titel: 'Rechne mit Unruhe.',
      text:  'In diesem Monat reißen Routinen leichter ab als sonst, und '
           + 'Entscheidungen kommen plötzlich. Nimm dir weniger vor und '
           + 'plan Lücken ein — das ist keine Nachlässigkeit, sondern '
           + 'Anpassung.'
    },
    Neptun: {
      titel: 'Die Konturen sind gerade weicher.',
      text:  'In diesem Monat verschwimmt manches. Du überschätzt leicht, '
           + 'was du schaffst, und Gefühle lassen sich schwerer zuordnen. '
           + 'Schreib Dinge auf, statt dich auf dein Gespür zu verlassen.'
    },
    Pluto: {
      titel: 'Im Hintergrund wird umgebaut.',
      text:  'Dieser Monat gehört zu einer längeren Bewegung, die man '
           + 'selten mittendrin erkennt. Du musst nichts erzwingen — das '
           + 'Meiste passiert ohnehin, auch ohne dass du nachhilfst.'
    }
  };

  var M_ZWEITES = 'Daneben läuft noch etwas Zweites.';

  var M_RUHIG = {
    titel: 'Ein ruhiger Monat.',
    text:  'In diesem Monat berührt keine der langsamen Bewegungen deine '
         + 'Hauptpunkte. Solche Monate sind unterschätzt: Sie eignen sich '
         + 'für das, was in bewegten Zeiten liegen bleibt — nachholen, '
         + 'aufräumen, etwas zu Ende bringen.'
  };

  /* ── Die zwei Daten ───────────────────────────────────────── */
  var M_MOND = {
    neumond:  '*Neumond am {tag}. {monat}* in deinem Bereich *{bereich}*. '
            + 'Gute Gelegenheit, dort etwas anzufangen oder neu anzusetzen '
            + '— ohne Druck, es ist nur ein günstiger Moment.',
    vollmond: '*Vollmond am {tag}. {monat}* in deinem Bereich *{bereich}*. '
            + 'Da wird oft etwas sichtbar oder kommt zu einem Abschluss. '
            + 'Wenn in diesen Tagen etwas hochkommt, ist das kein Zufall.'
  };

  /* ── Die Frage, zwölf ganze Fragen ────────────────────────── */
  var M_FRAGE = [
    'Wie zeigst du dich gerade — und stimmt das mit dem überein, wie du dich fühlst?',
    'Was ist dir gerade wirklich etwas wert?',
    'Mit wem müsstest du mal wieder reden?',
    'Was bräuchte dein Zuhause, damit du dort zur Ruhe kommst?',
    'Was machst du gerade nur zum Vergnügen?',
    'Welche Kleinigkeit im Alltag kostet dich mehr, als sie sollte?',
    'Was gibst du gerade mehr, als du bekommst?',
    'Worüber redest du gerade mit niemandem?',
    'Woran glaubst du gerade — und seit wann?',
    'Wofür willst du gesehen werden?',
    'Wo gehörst du gerade dazu, ohne dich zu verbiegen?',
    'Was brauchst du gerade an Rückzug, und nimmst du ihn dir?'
  ];

  var M_FRAGE_NACH = 'Du musst sie nicht beantworten. Manchmal reicht es, '
                   + 'sie im Hinterkopf zu haben.';

  var M_GRUSS = {
    text: 'Wenn etwas davon ins Schwarze trifft oder gar nicht passt — '
        + 'schreib mir gern. Beides ist nützlich.',
    formel: 'Herzlich',
    name: 'Mandy'
  };

  /* ── Die Mechanik, erst ab Stufe 2 ────────────────────────── */
  /* Hier und nur hier stehen Fachwörter. Jeder Schlüssel aus
     AC_MONAT.WINKEL und AC_MONAT.PUNKTE braucht einen Eintrag —
     bau-monat.py prüft das, damit ein neuer Winkel im Rechner
     nicht ohne sein Wort bleibt. */
  var M_TECH = {
    satz: 'Hintergrund: {wanderer} {winkel} {punkt}, Orbis {orbis} Grad.',
    winkel: {
      trifft:     'in Konjunktion mit',
      fordert:    'im Quadrat zu',
      gegenueber: 'in Opposition zu',
      traegt:     'im Trigon zu',
      hilft:      'im Sextil zu'
    },
    /* Dativ, weil der Satz ihn verlangt. Vollständige Formen,
       nicht „deinen " plus Name. */
    punkt: {
      Sonne:  'deiner Sonne',
      Mond:   'deinem Mond',
      Merkur: 'deinem Merkur',
      Venus:  'deiner Venus',
      Mars:   'deinem Mars',
      ASC:    'deinem Aszendenten',
      MC:     'deinem Medium Coeli'
    }
  };

  /* ── Bedienung ────────────────────────────────────────────── */
  var M_BEDIENUNG = {
    leer: '*Noch keine Profile angelegt.* Der Monatsbericht arbeitet mit '
        + 'den Profilen, die du dort anlegst:',
    profilseite: 'Profile',
    kopiert: 'Text kopiert — du kannst ihn jetzt in eine Mail oder '
           + 'Nachricht einfügen.',
    kopieFehler: 'Kopieren hat nicht geklappt — öffne den Text zum '
               + 'Bearbeiten und markiere ihn von Hand.',
    profil: 'Profil',
    monat: 'Monat',
    ich: ' (ich)',
    monate: ['dieser', 'nächster', 'übernächster']
  };

  window.AC_MONAT_TEXT = {
    ANREDE:M_ANREDE, DU:M_DU, EINL:M_EINL, H:M_H,
    SCHWERPUNKT:M_SCHWERPUNKT, SCHWERPUNKT_NACH:M_SCHWERPUNKT_NACH,
    LAUF:M_LAUF, ZWEITES:M_ZWEITES, RUHIG:M_RUHIG,
    MOND:M_MOND, FRAGE:M_FRAGE, FRAGE_NACH:M_FRAGE_NACH,
    GRUSS:M_GRUSS, TECH:M_TECH, BEDIENUNG:M_BEDIENUNG
  };

})();
