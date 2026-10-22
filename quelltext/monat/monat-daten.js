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

  /* ── Was bei DIESEM Menschen angelegt ist ─────────────────── */
  /* Ohne diesen Block beschreibt der Bericht nur den Himmel, und
     jeder Mensch bekommt denselben Brief. Hier steht, was ein
     getroffener Punkt im Leben dieses Menschen überhaupt ist —
     in Alltagssprache, ohne ein einziges Fachwort.

     genus ist kein Schmuck: aus ihm leiten sich nom und akk ab, und
     bau-monat.py rechnet das nach. So kann hier nie wieder eine
     Fügung wie „liegt auf deinen Ausdruck" entstehen.
       m → dein / deinen     f → deine / deine     n → dein / dein

     Regel für die Sätze weiter unten: auf eine Lücke mit einer
     Anlage folgt nie ein Fürwort, das sich darauf bezieht. Sonst
     passt „ihm" nicht mehr zu „deine Rolle". */
  var M_ANLAGE = {
    Sonne:  { genus:'m', nom:'dein Kern', akk:'deinen Kern',
              lang:'das, worum sich am Ende alles dreht' },
    Mond:   { genus:'n', nom:'dein Gefühlsleben', akk:'dein Gefühlsleben',
              lang:'das, was du brauchst, um dich sicher zu fühlen' },
    Merkur: { genus:'n', nom:'dein Denken', akk:'dein Denken',
              lang:'die Art, wie du Dinge sortierst und in Worte bringst' },
    Venus:  { genus:'m', nom:'dein Sinn für Nähe', akk:'deinen Sinn für Nähe',
              lang:'das, was du schön findest und wie nah du andere heranlässt' },
    Mars:   { genus:'m', nom:'dein Antrieb', akk:'deinen Antrieb',
              lang:'die Kraft, mit der du anfängst und dich durchsetzt' },
    ASC:    { genus:'n', nom:'dein Auftreten', akk:'dein Auftreten',
              lang:'die Art, wie du auf andere wirkst, bevor sie dich kennen' },
    MC:     { genus:'f', nom:'deine Rolle nach außen', akk:'deine Rolle nach außen',
              lang:'das, wofür du gesehen wirst und woran andere dich festmachen' }
  };

  /* Welche Anlage getroffen ist und wo sie bei diesem Menschen liegt. */
  var M_ANLAGE_SATZ =
      'Das trifft bei dir *{anlageAkk}* — {lang}. Angelegt ist das bei '
    + 'dir im Bereich *{feld}*; dort wirst du es am ehesten merken.';

  /* Was die Bewegung mit dieser Anlage macht. Je Bewegung zwei
     Fassungen: eine für den reibenden Winkel, eine für den
     tragenden. Die Lücke steht nie am Satzanfang — sonst stünde
     dort ein kleingeschriebenes „dein". */
  var M_BEDEUTUNG = {
    Jupiter: {
      hart:  'In diesem Monat bekommt *{anlageNom}* mehr Raum, als du '
           + 'gewohnt bist. Das lässt sich nutzen, und es lässt sich '
           + 'überziehen. Nimm dir dort eine Sache vor, nicht fünf.',
      weich: 'In diesem Monat bekommt *{anlageNom}* Rückenwind. Wenn du '
           + 'dort etwas vorhast, ist das ein guter Moment, damit '
           + 'anzufangen.'
    },
    Saturn: {
      hart:  'In diesem Monat wird *{anlageNom}* auf die Probe gestellt. '
           + 'Was dort nur halb trägt, zeigt sich jetzt — unangenehm, '
           + 'aber brauchbar.',
      weich: 'In diesem Monat bekommt *{anlageNom}* Halt. Was du dort '
           + 'jetzt ordnest oder festlegst, hält länger als sonst.'
    },
    Uranus: {
      hart:  'In diesem Monat wird *{anlageNom}* unruhig. Rechne damit, '
           + 'dass dort etwas anders läuft als geplant, und halte dir '
           + 'Platz dafür frei.',
      weich: 'In diesem Monat kommt *{anlageNom}* in Bewegung. Eine '
           + 'Änderung, die du dort schon länger erwägst, geht gerade '
           + 'leichter von der Hand.'
    },
    Neptun: {
      hart:  'In diesem Monat wird *{anlageNom}* schwerer greifbar. '
           + 'Verlass dich dort weniger auf dein Gefühl und mehr auf '
           + 'das, was du dir aufgeschrieben hast.',
      weich: 'In diesem Monat wird *{anlageNom}* durchlässiger. Das macht '
           + 'dich dort aufnahmefähiger — für anderes Erleben, und '
           + 'genauso für Täuschung.'
    },
    Pluto: {
      hart:  'In diesem Monat gerät *{anlageNom}* unter Druck. Dahinter '
           + 'steht eine längere Bewegung; du musst das nicht in vier '
           + 'Wochen lösen.',
      weich: 'In diesem Monat wird *{anlageNom}* langsam umgebaut. Das '
           + 'merkt man selten mittendrin, eher daran, dass Altes dort '
           + 'an Gewicht verliert.'
    }
  };

  /* Was in dem Bereich liegt, auf den der Monat zeigt. Bei den
     meisten Menschen liegt dort nichts — auch das ist eine Aussage
     über sie und wird deshalb ausgesprochen, statt verschwiegen. */
  var M_BEWOHNT =
      'In diesem Bereich steht bei dir etwas Eigenes: *{anlagen}*. Das '
    + 'ist ein Grund, warum dich ein solcher Monat hier eher erwischt '
    + 'als jemand anderen.';

  var M_UNBEWOHNT =
      'In diesem Bereich ist bei dir keine deiner Hauptanlagen '
    + 'angelegt. Das macht den Monat nicht unwichtig. Es heißt eher, '
    + 'dass du dort freier bist und weniger aus Gewohnheit reagierst.';

  /* Aufzählung mehrerer Anlagen. Die Wörter stehen hier, damit in
     der Anzeige kein Text steht. */
  var M_LISTE = { trenner: ', ', letzter: ' und ' };

  /* ── Was gerade läuft, in Alltagssprache ──────────────────── */
  /* Je Bewegung zwei Fassungen: eine für den reibenden Winkel, eine
     für den tragenden. Vorher gab es nur eine — dann stand über einem
     tragenden Winkel „Es ist gerade zäh" und darunter „bekommt Halt".
     bau-monat.py besteht darauf, dass sich die beiden Fassungen
     wirklich unterscheiden. */
  var M_LAUF = {
    Jupiter: {
      hart: {
        titel: 'Es ist gerade mehr als sonst — und leicht zu viel.',
        text:  'In diesem Monat drängt etwas nach außen. Das kann sich gut '
             + 'anfühlen und trotzdem über das Ziel hinausgehen: mehr '
             + 'zugesagt, mehr vorgenommen, mehr ausgegeben als gedacht. '
             + 'Die Frage ist nicht, ob du etwas anfängst, sondern wie viel.'
      },
      weich: {
        titel: 'Es geht gerade leichter als sonst.',
        text:  'In diesem Monat öffnet sich etwas. Dinge, die sonst '
             + 'Überwindung kosten, gehen leichter von der Hand — und es '
             + 'lohnt sich, das zu nutzen, statt es für selbstverständlich '
             + 'zu halten.'
      }
    },
    Saturn: {
      hart: {
        titel: 'Es ist gerade zäh — und das hat einen Grund.',
        text:  'Dieser Monat verlangt mehr Aufwand für dasselbe Ergebnis. '
             + 'Das ist kein Zeichen, dass du etwas falsch machst. Es ist '
             + 'eine Phase, in der sich zeigt, was trägt. Was du jetzt '
             + 'aufbaust, hält lange — es fühlt sich beim Bauen nur nicht '
             + 'gut an.'
      },
      weich: {
        titel: 'Es trägt gerade mehr als sonst.',
        text:  'In diesem Monat lässt sich etwas festmachen, das sonst '
             + 'schwer zu fassen ist. Das kommt ohne großen Auftritt: Was '
             + 'du jetzt ordnest, verabredest oder aufschreibst, hält '
             + 'länger, als der Aufwand vermuten lässt.'
      }
    },
    Uranus: {
      hart: {
        titel: 'Rechne mit Unruhe.',
        text:  'In diesem Monat reißen Routinen leichter ab als sonst, und '
             + 'Entscheidungen kommen plötzlich. Nimm dir weniger vor und '
             + 'plan Lücken ein — das ist keine Nachlässigkeit, sondern '
             + 'Anpassung.'
      },
      weich: {
        titel: 'Es lässt sich gerade etwas lockern.',
        text:  'In diesem Monat gibt etwas nach, das lange fest saß. Das '
             + 'kommt eher als Gelegenheit denn als Bruch: Eine Gewohnheit, '
             + 'die du ohnehin ändern wolltest, lässt sich jetzt ohne '
             + 'großen Kampf ändern.'
      }
    },
    Neptun: {
      hart: {
        titel: 'Die Konturen sind gerade weicher.',
        text:  'In diesem Monat verschwimmt manches. Du überschätzt leicht, '
             + 'was du schaffst, und Gefühle lassen sich schwerer zuordnen. '
             + 'Schreib Dinge auf, statt dich auf dein Gespür zu verlassen.'
      },
      weich: {
        titel: 'Du nimmst gerade mehr auf als sonst.',
        text:  'In diesem Monat bist du durchlässiger für Stimmungen und '
             + 'für das, was andere nicht aussprechen. Das ist brauchbar, '
             + 'solange du es nicht mit Klarheit verwechselst: Was du '
             + 'aufnimmst, ist noch keine Entscheidung.'
      }
    },
    Pluto: {
      hart: {
        titel: 'Etwas steht unter Druck und gibt nach.',
        text:  'In diesem Monat lässt sich etwas nicht mehr halten, das du '
             + 'lange gehalten hast. Das kann von außen kommen oder von dir '
             + 'selbst. Erzwingen hilft hier wenig, und Festhalten kostet '
             + 'mehr, als es einbringt.'
      },
      weich: {
        titel: 'Im Hintergrund wird umgebaut.',
        text:  'Dieser Monat gehört zu einer längeren Bewegung, die man '
             + 'selten mittendrin erkennt. Du musst nichts erzwingen — das '
             + 'Meiste passiert ohnehin, auch ohne dass du nachhilfst.'
      }
    }
  };

  var M_ZWEITES = 'Daneben läuft noch etwas Zweites.';

  /* ── Wenn dieser Mensch Bereiche gewählt hat ──────────────── */
  /* Der Brief richtet sich nach der Auswahl: Vorgänge in gewählten
     Bereichen kommen zuerst. Was er nicht tut, ist das verschweigen.
     Sonst liest jemand einen Brief über zwei Vorgänge und hält sie
     für alles, was läuft — dieselbe stille Übertreibung, die
     PRODUKT.md Abschnitt 3 ausschließt. */
  var M_AUSWAHL = {
    drin: 'Du hast {zahl} von zehn Bereichen gewählt. Dieser Brief '
        + 'nennt zuerst, was davon betroffen ist.',
    draussen: 'Du hast {zahl} von zehn Bereichen gewählt. In diesem '
            + 'Monat läuft darin nichts Deutliches — was hier steht, '
            + 'liegt außerhalb deiner Auswahl.'
  };

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
    satz: 'Hintergrund: {wanderer} {winkel} {punkt} im {hausNatal}. Haus, '
        + 'Orbis {orbis} Grad.',
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
    ANLAGE:M_ANLAGE, ANLAGE_SATZ:M_ANLAGE_SATZ, BEDEUTUNG:M_BEDEUTUNG,
    BEWOHNT:M_BEWOHNT, UNBEWOHNT:M_UNBEWOHNT, LISTE:M_LISTE,
    LAUF:M_LAUF, ZWEITES:M_ZWEITES, RUHIG:M_RUHIG, AUSWAHL:M_AUSWAHL,
    MOND:M_MOND, FRAGE:M_FRAGE, FRAGE_NACH:M_FRAGE_NACH,
    GRUSS:M_GRUSS, TECH:M_TECH, BEDIENUNG:M_BEDIENUNG
  };

})();
