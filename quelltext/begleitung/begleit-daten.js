/* ── Die Begleitung ───────────────────────────────────────────
   Mandy am 29.10.:

     „So jetzt bin ich in die Situation gekommen dass ich coachen
      werde. Es ist ein Bekannter zwar aber ich will mit ihm an
      sich arbeiten. Das fehlt mir jetzt komplett in dem Tool. Ich
      brauche eine komplette Coaching Seite. Wie ich das aufziehe
      als Coachin. … Von Anfang bis Ende der Coaching Zeit."

   Was es schon gab: `dossier.html` — die Übersicht über einen
   Menschen, mit der richtigen Rahmung („Hypothesen, keine
   Befunde"). Was fehlte: der Verlauf. Wie fängt es an, was
   passiert in der dritten Sitzung, woran merkt man, dass es
   fertig ist.

   Diese Datei ist der Verlauf. Drei Grundsätze stecken darin:

   1. **Seine Worte zuerst, das Chart danach.** In der ersten
      Sitzung bleibt das Chart zu. Wer mit einer Deutung anfängt,
      bekommt für den Rest der Begleitung Bestätigung statt
      Material.

   2. **Das Chart liefert Fragen, keine Aussagen.** „Du hast
      Saturn im siebten Haus" ist eine Behauptung über einen
      Menschen. „Woran merkst du, dass eine Beziehung verbindlich
      geworden ist — und was kostet dich das?" ist dieselbe
      Information als Werkzeug. Nur die zweite Form steht hier.

   3. **Die Grenzen sind kein Anhang.** Eine Coachin, die nicht
      weiß, wann sie aufhört, ist keine professionelle Coachin.
      Deshalb stehen sie in jeder Sitzung mit dabei und nicht nur
      ganz hinten (PRODUKT.md Abschnitt 5).
*/

/* ── Der Rahmen, bevor es losgeht ─────────────────────────────
   Auftragsklärung. Das Unspektakulärste am ganzen Prozess und das,
   woran die meisten Begleitungen später scheitern. */
var C_RAHMEN = {
 titel:'Der Rahmen',
 sub:'Was ihr klärt, bevor die erste Sitzung anfängt. Zehn Minuten, die dir später Stunden sparen.',
 punkte:[
  {k:'was',  t:'Was das hier ist — und was nicht',
   d:'Sag es in zwei Sätzen, bevor er fragt: Du arbeitest mit ihm an einer Frage, die er mitbringt. Du behandelst nicht, du diagnostizierst nicht, und du sagst ihm nicht, was passieren wird. Wer das am Anfang hört, fragt später nicht danach.',
   satz:'„Ich arbeite mit dir an der Frage, die du mitbringst. Ich bin keine Therapeutin und sage dir auch nicht die Zukunft voraus — ich stelle Fragen, und du entscheidest, was daraus wird."'},
  {k:'chart', t:'Einwilligung für das Chart',
   d:'Er muss wissen, dass du mit seinen Geburtsdaten rechnest, was dabei herauskommt und dass es Hypothesen sind. Und er muss Nein sagen dürfen, ohne dass die Begleitung dadurch schlechter wird.',
   satz:'„Ich rechne mit deinem Geburtsdatum ein Bild und bereite mich damit vor. Was dabei herauskommt, sind Vermutungen — nichts davon gilt, solange du es nicht wiedererkennst. Wenn du lieber ohne arbeiten willst, geht das auch."'},
  {k:'form', t:'Wie oft, wie lange, wo',
   d:'Leg die Anzahl vorher fest, nicht „wir schauen mal". Sechs Sitzungen à 60 bis 90 Minuten ist ein brauchbarer Bogen für eine Frage. Ein festes Ende macht die Arbeit ernster, nicht lockerer.',
   satz:'„Sechs Termine, je anderthalb Stunden. Nach dem vierten schauen wir, ob wir auf Kurs sind."'},
  {k:'notizen', t:'Was mit deinen Notizen passiert',
   d:'Du schreibst mit. Sag, dass du das tust, wo es liegt, und dass niemand sonst es sieht. Diese Seite legt deine Notizen nur in deinem Browser ab — sie gehen nirgendwohin.',
   satz:'„Ich mache mir Notizen, damit ich zwischen den Terminen den Faden behalte. Die liegen bei mir und sieht sonst niemand."'},
  {k:'bekannt', t:'Wenn ihr euch kennt',
   d:'Das ist der Punkt, den fast alle überspringen, und er ist bei einem Bekannten der wichtigste. Ihr habt eine Geschichte, gemeinsame Leute und eine Zeit nach der Begleitung. Klärt drei Dinge: Was passiert mit dem, was er hier sagt, wenn ihr euch privat trefft? Darf er abbrechen, ohne dass es die Bekanntschaft kostet? Und was machst du, wenn du über Dritte etwas hörst, das hierher gehört?',
   satz:'„Was du hier sagst, kommt privat nicht vor — auch nicht als Anspielung. Und wenn du merkst, dass es nicht passt, sagst du das, und wir hören auf. Das ändert zwischen uns nichts."'},
  {k:'raus', t:'Wann du aufhörst',
   d:'Sag jetzt, unter welchen Umständen du abbrichst und weiterverweist, damit es später keine Zurückweisung ist, sondern eine Abmachung. Die Liste steht unten unter „Grenzen".',
   satz:'„Wenn ich merke, dass du etwas brauchst, das ich nicht kann, sage ich das — und helfe dir, die richtige Stelle zu finden. Das ist kein Abschieben."'}],
 hinweis:'Das ist kein Vertrag und ersetzt keinen. Es ist das Gespräch, das du führst, bevor die Arbeit anfängt.'};

/* ── Der Bogen ────────────────────────────────────────────────
   Sechs Sitzungen. Jede hat genau eine Aufgabe; eine Sitzung, die
   zwei Aufgaben hat, erledigt keine davon. */
var C_SITZUNGEN = [
 {n:1, k:'auftrag', titel:'Ankommen und Auftrag',
  ziel:'Du verstehst, woran er arbeiten will — in seinen Worten, nicht in deinen.',
  chartZu:true,
  chartSatz:'Das Chart bleibt diese Sitzung zu. Wer mit einer Deutung anfängt, bekommt für den Rest der Begleitung Bestätigung statt Material.',
  ablauf:[['10 Min','Ankommen, Rahmen wiederholen, Fragen dazu'],
          ['35 Min','Sein Anliegen — und zwar an Beispielen, nicht als Überschrift'],
          ['20 Min','Den Auftrag schärfen, bis er in einem Satz steht'],
          ['10 Min','Abschluss, Hausaufgabe, nächster Termin']],
  oeffnung:'Was soll anders sein, wenn wir in sechs Terminen fertig sind?',
  kern:['Erzähl mir eine Situation aus der letzten Woche, in der das ein Thema war.',
        'Woran genau hast du gemerkt, dass es dich stört?',
        'Was hast du bisher versucht? Und was davon hat ein bisschen geholfen?',
        'Wenn sich nichts ändert — was kostet dich das in einem Jahr?',
        'Woran würdest du merken, dass es sich gelohnt hat? Nenn mir etwas, das man sehen kann.'],
  haken:[['Er bleibt im Allgemeinen','„Gib mir ein Beispiel von letzter Woche." Dreimal fragen, wenn nötig. Ohne Szene gibt es nichts zu arbeiten.'],
         ['Er will, dass du etwas sagst','„Dazu komme ich. Erst will ich verstehen, worum es bei dir geht — sonst erzähle ich dir etwas, das auf jeden passt."'],
         ['Er bringt drei Themen','Nimm eins. „Welches davon würdest du als Erstes loswerden wollen, wenn du nur eins haben kannst?"']],
  aufgabe:'Bis zum nächsten Mal: Eine Woche lang jeden Abend ein Satz — wann war es heute Thema, und was ist passiert?',
  notiz:'Sein Auftrag in SEINEN Worten. Wörtlich aufschreiben, nicht zusammenfassen.'},

 {n:2, k:'muster', titel:'Das Muster',
  ziel:'Ihr seht, wo sich dasselbe wiederholt — und was jedes Mal gleich abläuft.',
  chartZu:false,
  chartSatz:'Ab jetzt kommt das Chart dazu — als Frage, nie als Aussage. Was er nicht wiedererkennt, gilt nicht.',
  ablauf:[['10 Min','Die Woche, die Notizen'],
          ['40 Min','Drei Situationen nebeneinanderlegen'],
          ['20 Min','Was ist jedes Mal gleich?'],
          ['10 Min','Abschluss']],
  oeffnung:'Was ist dir diese Woche aufgefallen, als du es aufgeschrieben hast?',
  kern:['Erzähl mir drei Male, bei denen das passiert ist — einmal aus dieser Woche, einmal aus diesem Jahr, einmal aus früher.',
        'Was ist bei allen dreien gleich? Nicht die Situation — der Ablauf.',
        'An welcher Stelle hättest du jedes Mal etwas anderes machen können?',
        'Was hat dich daran gehindert?',
        'Wem gegenüber passiert dir das nie?'],
  haken:[['Er findet nur ein Beispiel','Dann nimm das eine und geh hinein: „Was war in den zehn Minuten davor?"'],
         ['Er erklärt statt zu erzählen','„Das ist deine Erklärung dafür. Was ist passiert?"'],
         ['Er redet über eine andere Person','„Und was hast du in dem Moment gemacht?" Das Muster ist seins, nicht ihres.']],
  aufgabe:'Diese Woche: Wenn es wieder passiert, notier die zehn Minuten davor.',
  notiz:'Der Ablauf des Musters in drei bis vier Schritten. Und: Wo ist die Stelle, an der es kippt?'},

 {n:3, k:'ressource', titel:'Was schon geht',
  ziel:'Ihr findet, was bei ihm bereits funktioniert — und übertragt es.',
  chartZu:false,
  chartSatz:'Hier eignen sich die Stellen seines Bildes, an denen etwas leicht läuft. Die werden meistens übersehen, weil sie nicht wehtun.',
  ablauf:[['10 Min','Die Woche'],
          ['35 Min','Wo geht es schon? Auch in ganz anderen Lebensbereichen'],
          ['25 Min','Was davon lässt sich übertragen?'],
          ['10 Min','Abschluss']],
  oeffnung:'Wo in deinem Leben hast du etwas Ähnliches schon mal hinbekommen?',
  kern:['Erzähl mir von etwas, das du gut kannst und das dich keine Überwindung kostet.',
        'Wie machst du das? Beschreib die Schritte, als müsstest du es jemandem beibringen.',
        'Wer würde dich am ehesten für genau diese Sache loben?',
        'Was von dem, was du da tust, kommt in der schwierigen Situation nicht vor?',
        'Was wäre der kleinste Teil davon, den du nächste Woche ausprobieren könntest?'],
  haken:[['Er sagt, er kann nichts davon','„Dann frag ich anders: Was machst du, ohne nachzudenken, und andere finden es schwer?"'],
         ['Er wertet es ab','„Das zählt nicht" ist keine Beschreibung, sondern eine Bewertung. „Es zählt hier. Wie machst du es?"'],
         ['Es wird zu gemütlich','Diese Sitzung ist angenehm und deshalb gefährlich. Mindestens zwanzig Minuten müssen auf die Übertragung gehen.']],
  aufgabe:'Einmal in dieser Woche den kleinsten übertragbaren Teil anwenden. Einmal reicht.',
  notiz:'Seine Ressource in seinen Worten — und der eine Schritt, der sich übertragen lässt.'},

 {n:4, k:'widerstand', titel:'Was es festhält',
  ziel:'Ihr versteht, wofür das Muster gut ist. Nichts hält sich jahrelang, das nichts bringt.',
  chartZu:false,
  chartSatz:'Hier gehören die Spannungen aus seinem Bild hin — aber als Frage nach dem Nutzen, nicht nach dem Fehler.',
  ablauf:[['10 Min','Die Woche, der Versuch'],
          ['40 Min','Wofür ist das Muster gut?'],
          ['20 Min','Was kostet es, es aufzugeben?'],
          ['10 Min','Abschluss, Zwischenbilanz: sind wir auf Kurs?']],
  oeffnung:'Du hast es diese Woche einmal anders gemacht. Was war daran unangenehm?',
  kern:['Angenommen, das Muster wäre klug: Wovor schützt es dich?',
        'Was müsstest du können oder aushalten, wenn du es nicht mehr hättest?',
        'Wer in deinem Leben hat etwas davon, dass es so bleibt?',
        'Was würdest du verlieren, wenn sich das ändert? Auch Kleines zählt.',
        'Was davon kannst du dir leisten zu verlieren?'],
  haken:[['Er wehrt ab','Nicht nachsetzen. „Lass die Frage einfach eine Woche liegen." Widerstand bei dieser Frage ist die Antwort.'],
         ['Es wird emotional','Bleib. Nicht trösten, nicht deuten, nicht weitermachen. „Nimm dir Zeit." Schweigen aushalten.'],
         ['Es kippt ins Therapeutische','Merkst du, dass ihr an etwas Altem und Großem seid — Gewalt, Verlust, etwas Unverarbeitetes: Das ist die Stelle zum Weiterverweisen. Siehe unten.']],
  aufgabe:'Keine. Diese Woche nur mitnehmen, was aufgegangen ist.',
  notiz:'Wofür das Muster gut ist — in seinen Worten. Und: Hat es gekippt? Wenn ja, wohin?'},

 {n:5, k:'entscheidung', titel:'Die Entscheidung',
  ziel:'Er entscheidet etwas Konkretes. Klein, datiert, überprüfbar.',
  chartZu:false,
  chartSatz:'Jetzt sind die laufenden Zeiten nützlich: Wo etwas ohnehin in Bewegung ist, fällt der Anfang leichter.',
  ablauf:[['10 Min','Die Woche'],
          ['30 Min','Was ändert sich jetzt wirklich?'],
          ['30 Min','Daraus einen Schritt machen, der am Dienstag funktioniert'],
          ['10 Min','Abschluss']],
  oeffnung:'Wenn du von allem, was wir besprochen haben, eine Sache mitnimmst — welche?',
  kern:['Was machst du ab jetzt anders? Sag es als Handlung, nicht als Haltung.',
        'Wann zum ersten Mal? Nenn mir einen Tag.',
        'Was muss dafür vorher passieren?',
        'Was ist der wahrscheinlichste Grund, warum es doch nicht passiert?',
        'Was machst du, wenn genau das eintritt?',
        'Woran merkst du in vier Wochen, dass du es getan hast?'],
  haken:[['Der Schritt ist zu groß','Halbieren. Dann noch einmal halbieren. Ein Schritt, der sicher klappt, ist mehr wert als einer, der beeindruckt.'],
         ['Er formuliert eine Haltung','„Gelassener sein" kann man nicht am Dienstag machen. „Was tust du stattdessen, wenn es anfängt?"'],
         ['Er will, dass du entscheidest','„Ich kann dir sagen, was ich sehe. Entscheiden musst du, sonst hält es nicht."']],
  aufgabe:'Der Schritt, am vereinbarten Tag. Und eine Notiz, was passiert ist — auch wenn nichts passiert ist.',
  notiz:'Die Entscheidung wörtlich, mit Datum. Und der Plan für den wahrscheinlichsten Rückfall.'},

 {n:6, k:'abschluss', titel:'Abschluss',
  ziel:'Er geht mit etwas, das er allein weiterführen kann — und weiß, was er erreicht hat.',
  chartZu:false,
  chartSatz:'Zum Schluss darf das Bild als Ganzes vorkommen: nicht als Deutung, sondern als das, was ihr beide inzwischen daran wiedererkennt.',
  ablauf:[['15 Min','Was ist in den letzten Wochen passiert?'],
          ['30 Min','Rückblick auf den Auftrag aus Sitzung 1'],
          ['25 Min','Was führt er allein weiter?'],
          ['10 Min','Abschied']],
  oeffnung:'Lies mir deinen Satz aus der ersten Sitzung vor. Was sagst du heute dazu?',
  kern:['Was ist anders als vor sechs Terminen? Auch Kleines.',
        'Was davon hast du selbst gemacht?',
        'Was ist offen geblieben?',
        'Was von dem hier willst du allein weiterführen — und wie?',
        'Woran wirst du merken, dass du in ein altes Muster zurückfällst?',
        'Was machst du dann?'],
  haken:[['Er will verlängern','Erst fertig abschließen, dann getrennt davon neu verabreden. Ein Anhängsel ist keine Begleitung.'],
         ['Er ist enttäuscht','Aushalten, nicht reparieren. „Was hättest du gebraucht?" — die Antwort ist für dich mehr wert als jedes Lob.'],
         ['Es ist zu Ende, aber ihr kennt euch','Sag ausdrücklich, dass die Begleitung endet und was das für euren privaten Umgang heißt. Ohne diesen Satz läuft es unausgesprochen weiter.']],
  aufgabe:'Keine. Es ist fertig.',
  notiz:'Was erreicht wurde, was offen ist, und was du beim nächsten Mal anders machen würdest.'}];

/* ── Zwischen den Sitzungen ───────────────────────────────── */
var C_ZWISCHEN = {
 titel:'Zwischen den Terminen',
 punkte:[
  ['Deine Vorbereitung','Zwanzig Minuten reichen. Notizen der letzten Sitzung lesen, zwei bis drei Chart-Fragen aussuchen, und einen Satz aufschreiben, was du diesmal verstehen willst.'],
  ['Was du nicht tust','Nicht zwischendurch deuten und ihm schreiben. Nicht nachbessern, was in der Sitzung nicht lief. Die Woche gehört ihm.'],
  ['Wenn er sich meldet','Kurz antworten, auf den Termin verweisen. Ausnahme: Krise — siehe Grenzen.'],
  ['Deine eigene Stelle','Merkst du, dass dich etwas an ihm besonders beschäftigt oder ärgert: aufschreiben. Nicht für ihn — für dich. Das ist meistens deins.']]};

/* ── Die Grenzen ──────────────────────────────────────────────
   Nicht als Anhang, sondern in jeder Sitzung sichtbar. Eine
   Coachin, die nicht weiß, wann sie aufhört, ist keine. */
var C_GRENZEN = {
 titel:'Wo du aufhörst',
 sub:'Das Unterscheidende an professioneller Arbeit ist nicht, was du kannst — es ist, dass du weißt, wo es aufhört.',
 hart:[
  ['Keine Diagnose','Du benennst keine Störung und bestätigst keine. Auch nicht, wenn er selbst eine nennt und du zustimmen würdest. „Das klingt nach etwas, das jemand anschauen sollte, der das darf."'],
  ['Kein Ersatz für Behandlung','Ist er in Therapie oder sollte es sein, läuft die Begleitung daneben, nicht stattdessen. Rat ihm nie, etwas abzusetzen, abzubrechen oder zu verschieben.'],
  ['Keine Vorhersage','Du sagst nicht, ob die Beziehung hält, ob er den Job bekommt, ob die Operation gut geht. Auch nicht als Vermutung, auch nicht, wenn er darum bittet.'],
  ['Keine Gesundheits-, Rechts- oder Geldberatung','Egal, was im Chart steht.'],
  ['Nichts über Dritte','Du deutest keine Charts von Menschen, die nicht dabei sind und nicht gefragt wurden. Auch nicht „nur, damit ich ihn verstehe".']],
 krise:{
  titel:'Wenn es eine Krise ist',
  text:'Spricht er von Selbstverletzung, davon, nicht mehr leben zu wollen, oder von akuter Gewalt — dann ist die Begleitung in diesem Moment vorbei, und du bist ein Mensch im Gespräch mit einem Menschen. Nicht deuten. Nicht beruhigen wollen. Fragen, ob er gerade sicher ist, und gemeinsam die nächste Stelle finden.',
  satz:'„Das ist zu wichtig für das, was ich hier mache. Lass uns zusammen jemanden finden, der das richtig kann — ich bleibe solange dran."',
  stellen:[
   ['Telefonseelsorge','0800 111 0 111 · 0800 111 0 222 · rund um die Uhr, kostenfrei, anonym'],
   ['Ärztlicher Bereitschaftsdienst','116 117'],
   ['Notruf','112, wenn jemand unmittelbar in Gefahr ist']],
  danach:'Danach meldest du dich bei ihm — nicht als Coachin, sondern als Mensch. Und du besprichst mit jemandem, was das mit dir gemacht hat.'},
 weich:[
  ['Du wirst zur Freundin','Merkst du, dass du tröstest statt fragst, ist die Rolle verrutscht. Benennen und zurück.'],
  ['Du willst recht behalten','Wenn du dich dabei ertappst, das Chart verteidigen zu wollen: Der Mensch hat recht, immer.'],
  ['Du langweilst dich','Meistens heißt das, dass ihr am falschen Thema arbeitet. Frag ihn danach.'],
  ['Er kommt nicht voran','Nach der vierten Sitzung ehrlich benennen. Entweder der Auftrag stimmt nicht, oder er braucht etwas anderes.']],
 drei:{titel:'Drei Sätze, die dich immer herausbringen',
  saetze:['„Dazu kann ich nichts sagen."',
          '„Das ist eine Vermutung, keine Aussage über dich."',
          '„Was davon stimmt bei dir, und was nicht?"']}};

/* ── Wenn er etwas sagt, das dich aus dem Takt bringt ───────── */
var C_WENN = {
 titel:'Wenn er etwas sagt',
 sub:'Die Sätze, auf die man nicht vorbereitet ist — und eine Antwort, die den Rahmen hält.',
 paare:[
  ['„Sag mir einfach, was rauskommt."',
   '„Das wäre bequem und würde nichts ändern. Was ich kann: dir Fragen stellen, auf die du selbst nicht kommst."'],
  ['„Das stimmt bei mir überhaupt nicht."',
   '„Gut. Dann streichen wir es." Nicht verteidigen, nicht nachjustieren. Was nicht passt, war eine Vermutung und ist jetzt erledigt.'],
  ['„Ich weiß es nicht."',
   'Warten. Zehn Sekunden. Dann: „Und wenn du es wüsstest?"'],
  ['„Bin ich damit normal?"',
   '„Darum geht es hier nicht. Die Frage ist, ob es für dich funktioniert."'],
  ['„Meine Mutter ist das eigentliche Problem."',
   '„Kann sein. Sie sitzt nur nicht hier. Was machst DU, wenn sie das tut?"'],
  ['„Du bist doch meine Freundin, sag mir ehrlich …"',
   '„Als Bekannte hätte ich eine Meinung. Hier arbeite ich anders — und das nützt dir mehr."'],
  ['Er weint.',
   'Nichts sagen. Ein Taschentuch, Zeit. Erst wenn er wieder da ist: „Was war das gerade?"'],
  ['Er schweigt lange.',
   'Mitschweigen. Die meisten Coachinnen reden eine Sekunde zu früh und nehmen ihm damit die Antwort weg.'],
  ['„Das haben wir doch letztes Mal schon geklärt."',
   '„Stimmt. Und es ist wieder da. Was heißt das?"']]};

/* ── Wie aus einem Chart eine Frage wird ──────────────────────
   Die Vorlagen pro Anlage. Eingesetzt wird das Lebensfeld des
   Hauses — damit wird aus zehn mal zwölf Kombinationen eine
   Frage, die nach diesem Menschen klingt und kein Fachwort
   enthält. Dieselbe Bauweise wie in bahn-daten.js. */
var C_FRAGE = {
 Sonne:  {thema:'Wofür er gehalten werden will',
   du:'wofür du gesehen werden willst',
   fragen:['Wo willst du in {feld} gesehen werden — und von wem genau?',
           'Was machst du in {feld}, damit es von dir ist und nicht bloß erledigt?']},
 Mond:   {thema:'Was er braucht, um sich sicher zu fühlen',
   du:'was du brauchst, um dich sicher zu fühlen',
   fragen:['Was brauchst du in {feld}, damit du dich entspannen kannst?',
           'Wann hast du dich in {feld} zuletzt sicher gefühlt — und was war da anders?']},
 Merkur: {thema:'Wie er denkt und was er ausmacht',
   du:'wie du denkst und was du ausmachst',
   fragen:['Worüber redest du in {feld} ständig, und worüber nie?',
           'Was hast du in {feld} nie ausgesprochen, obwohl es alle betrifft?']},
 Venus:  {thema:'Was ihm nah ist und was er sich wert ist',
   du:'was dir nah ist und was du dir wert bist',
   fragen:['Wofür sagst du in {feld} ja, obwohl du nein meinst?',
           'Was wäre dir in {feld} etwas wert — und was verlangst du dafür tatsächlich?']},
 Mars:   {thema:'Womit er anfängt und wofür er kämpft',
   du:'womit du anfängst und wofür du kämpfst',
   fragen:['Worüber ärgerst du dich in {feld} regelmäßig, ohne es zu sagen?',
           'Was hast du in {feld} angefangen und nicht zu Ende gebracht? Und warum gerade das?']},
 Jupiter:{thema:'Wo er sich etwas zutraut',
   du:'wo du dir etwas zutraust',
   fragen:['Was nimmst du dir in {feld} immer wieder vor und schaffst es nicht?',
           'Wo machst du in {feld} mehr, weil es sich gut anfühlt, und nicht, weil es nötig wäre?']},
 Saturn: {thema:'Wo er streng mit sich ist',
   du:'wo du streng mit dir bist',
   fragen:['Was hältst du in {feld} aufrecht, das längst niemand mehr von dir verlangt?',
           'Wessen Erlaubnis wartest du in {feld} ab — und weiß diese Person davon?']},
 Uranus: {thema:'Wo er nicht mitmacht',
   du:'wo du nicht mitmachst',
   fragen:['Wo machst du es in {feld} absichtlich anders als alle — und was kostet dich das?',
           'Was hast du in {feld} abgebrochen, obwohl es lief?']},
 Neptun: {thema:'Wofür er sich begeistert, ohne zu prüfen',
   du:'wofür du dich begeisterst, ohne zu prüfen',
   fragen:['Was erzählst du dir in {feld} schöner, als es ist?',
           'Wo hältst du dir in {feld} eine Möglichkeit offen, die nie stattfindet?']},
 Pluto:  {thema:'Wo es um alles oder nichts geht',
   du:'wo es bei dir um alles oder nichts geht',
   fragen:['Was ist bei dir in {feld} nie halb, sondern immer ganz oder gar nicht?',
           'Worüber redest du in {feld} mit niemandem?']},
 Chiron: {thema:'Wo Kleinigkeiten unverhältnismäßig treffen',
   du:'wo Kleinigkeiten dich zu hart treffen',
   fragen:['Was trifft dich in {feld} härter, als es sollte?',
           'Was könntest du anderen in {feld} gut beibringen und bei dir selbst nicht?']},
 Lilith: {thema:'Was nie einen Platz bekommen hat',
   du:'was bei dir nie Platz hatte',
   fragen:['Was hat bei dir in {feld} nie Platz gehabt?',
           'Wo wirst du in {feld} laut — und war das als Kind erlaubt?']}};

/* Die zwölf Felder als Ortsangabe — „in deinem Zuhause", nicht
   „im vierten Haus". Was eingesetzt wird, muss sich im Satz
   anhören wie Alltagssprache. */
var C_FELD = [
 'deinem Auftreten',
 'deinem Verhältnis zu Geld',
 'deinem Alltag und deinem Reden',
 'deinem Zuhause',
 'deiner Freude und Kreativität',
 'deinem Alltag und deinem Körper',
 'deinen festen Beziehungen',
 'deinen tiefsten Bindungen',
 'deiner Ausrichtung',
 'deiner öffentlichen Rolle',
 'deinem Freundeskreis',
 'deinem Rückzug'];

/* Die Spannungen: eine Frage, die den Winkel als Frage stellt. */
var C_WINKEL = {
 hart:['Zwei Sachen willst du gleichzeitig. Die eine: {a}. Die andere: {b}. Wo im Alltag merkst du, dass beides zusammen nicht geht?',
       'Die eine Seite: {a}. Die andere: {b}. Welche von beiden gibt bei dir nach — und was passiert danach?'],
 weich:['Zwei Sachen ziehen bei dir in dieselbe Richtung. Die eine: {a}. Die andere: {b}. Wofür hast du das noch nie absichtlich eingesetzt?',
        'Die eine Seite: {a}. Die andere: {b}. Das geht bei dir zusammen — wem ist das außer dir schon aufgefallen?']};

var C_JETZT = {
 titel:'Was bei ihm gerade läuft',
 sub:'Die Zeiten sagen nicht, was passiert. Sie sagen, welche Frage gerade offen liegt — und deshalb jetzt leichter zu stellen ist.',
 frageVor:'Daraus eine Frage:',
 fragen:{
  hart:['Wo arbeitest du dich gerade in {feld} an etwas ab?',
        'Was in {feld} kostet dich im Moment mehr Kraft als sonst?',
        'Woran reibst du dich in {feld} gerade — und seit wann?'],
  weich:['Wo geht dir gerade in {feld} etwas leichter von der Hand als sonst?',
         'Was wäre in {feld} gerade möglich, das sonst schwerer wäre?',
         'Wo hast du in {feld} im Moment Rückenwind, ohne es zu merken?']},
 warnung:'Sag ihm nicht, dass gerade „ein Transit läuft". Stell die Frage und sieh, ob sie trifft. Tut sie es nicht, war es die falsche Woche dafür.'};

var C_KOPF = {
 titel:'Die Begleitung',
 lede:'Wie du eine Begleitung aufziehst — vom ersten Gespräch bis zum Abschluss. Mit den Fragen aus dem Bild des Menschen, mit dem du arbeitest.',
 warnung:'Alles, was du hier eintippst, bleibt in deinem Browser. Es geht nicht ins Netz, niemand sonst sieht es, und es ist auch nicht gesichert — mach dir von Wichtigem eine eigene Kopie.',
 wen:'Mit wem arbeitest du?',
 keinProfil:'Leg zuerst ein Profil für die Person an, dann stehen hier ihre Fragen.',
 dossier:'Die Übersicht über diesen Menschen steht im Dossier →',
 eigen:'Das ist dein eigenes Profil. Für eine Begleitung wählst du das Profil der Person aus, mit der du arbeitest — sonst stehen hier deine Fragen und nicht ihre.',
 notizVor:'Deine Notizen',
 notizHin:'Bleibt in diesem Browser.',
 erledigt:'erledigt',
 drucken:'Diese Sitzung drucken'};

/* ── Die Methode ──────────────────────────────────────────────
   Mandy am 30.10., über ein fremdes Konzeptdokument:

     „ich meinte nur die Struktur und Ideen dahinter … Denn meine
      Seite ist einfach zu cluddert und vor allem sehe ich nicht
      mehr durch."

   Was dieses Dokument richtig gesehen hat, ist nicht neu — es ist
   ein Name für das, was diese Seite ohnehin schon tut. Die
   Begleitung hatte einen Verlauf, aber keine Methode, die man in
   einem Satz sagen kann. Genau das fehlte.

   Drei Linsen. Sie sind keine Erfindung: Die mittlere kommt aus
   der Individualpsychologie Alfred Adlers (1870–1937), einer
   eigenen Schule mit eigener Literatur. Sie taugt für Coaching
   besser als die meisten anderen, weil sie nicht nach Krankheit
   fragt, sondern nach Zielen und Mustern — und weil sie von
   Anfang an für die Arbeit mit gesunden Menschen gedacht war.

   Was sie nicht ist: eine Therapie. Adlerianische Psychotherapie
   gibt es, sie wird von ausgebildeten Therapeutinnen gemacht, und
   davon ist das hier so weit entfernt wie ein Kochbuch von einer
   Ernährungsberatung. Die Linse ist ein Blickwinkel, keine
   Behandlung — und das steht auf der Seite auch so. */
var C_METHODE = {
 titel:'Die Methode',
 sub:'Drei Linsen, durch die du dasselbe Leben dreimal ansiehst. Jede Sitzung im Bogen liegt auf einer davon.',
 name:'Bauplan · Logik · Landung',
 linsen:[
  {k:'bauplan', n:'Der Bauplan',
   frage:'Was ist angelegt?',
   d:'Das Geburtsbild — als Hypothese, nicht als Befund. Es sagt, welche Fragen bei diesem Menschen wahrscheinlich etwas aufmachen, und in welchem Lebensfeld sie sitzen. Es sagt nicht, wer er ist.',
   wo:'Sitzung 2 und 3, und in jeder Sitzung die Fragen aus seinem Bild.',
   falle:'Den Bauplan für die Antwort zu halten. Er liefert die Frage.'},
  {k:'logik', n:'Die private Logik',
   frage:'Wofür ist das gut?',
   d:'Jedes Muster, das sich jahrelang hält, bringt etwas ein — meistens Schutz vor etwas, das noch unangenehmer wäre. Alfred Adler nannte das die private Logik: die unausgesprochenen Regeln, nach denen jemand sein Leben einrichtet, und die von innen völlig vernünftig aussehen.',
   wo:'Sitzung 4 ist ganz dafür da. Die Frage nach dem Gewinn steht unten bei den Werkzeugen.',
   falle:'Daraus eine Diagnose zu machen. Es ist eine Frage an ihn, keine Feststellung über ihn.'},
  {k:'landung', n:'Die Landung',
   frage:'Was tust du am Dienstag?',
   d:'Der Teil, an dem die meisten spirituellen Ansätze aufhören und an dem sich entscheidet, ob eine Begleitung etwas gebracht hat. Eine Einsicht, die keine Handlung nach sich zieht, verfliegt in zwei Wochen.',
   wo:'Sitzung 5, und als Hausaufgabe am Ende jeder einzelnen Sitzung.',
   falle:'Zu große Schritte. Halbieren, dann noch einmal halbieren.'}],
 ehrlich:'Die mittlere Linse stammt aus einer echten psychologischen Schule, die erste aus einer Überlieferung ohne Wirksamkeitsnachweis, die dritte ist schlichtes Handwerk. Das ist kein Makel, solange es dasteht — und es steht da.',
 abgrenzung:'Diese drei Linsen sind ein Blickwinkel für ein Gespräch. Sie sind keine Therapie, keine Diagnostik und kein Behandlungsverfahren. Wer behandelt werden muss, wird behandelt — von jemandem, der das darf.'};

/* ── Die Werkzeuge ────────────────────────────────────────────
   Fünf Handgriffe, die man sich merken kann. Alle fünf kommen aus
   der Individualpsychologie und sind seit Jahrzehnten in Gebrauch;
   keiner davon ist hier erfunden. Zu jedem steht, wann er passt,
   wie der Satz lautet und woran man merkt, dass er gerade nicht
   passt — das Letzte fehlt in den meisten Werkzeugkästen und ist
   das Nützlichste daran. */
var C_WERKZEUG = [
 {n:'Die Frage nach dem Gewinn', wann:'Wenn ein Muster sich hält, obwohl alle es loswerden wollen.',
  satz:'„Angenommen, das wäre morgen früh weg — was müsstest du dann tun, vor dem du dich jetzt noch drücken kannst?"',
  wozu:'Macht sichtbar, wofür das Muster gut ist. Fast immer schützt es vor etwas, das noch unangenehmer wäre.',
  nicht:'Nicht, wenn jemand gerade weint oder überfordert ist. Die Frage ist scharf und braucht einen Menschen, der stehen kann.',
  her:'Adler fragte Klienten sinngemäß, was anders wäre, wenn sie gesund wären — und hörte aus der Antwort, wofür das Symptom gebraucht wird.'},
 {n:'Die frühe Erinnerung', wann:'Wenn du verstehen willst, nach welchen Regeln jemand sein Leben einrichtet.',
  satz:'„Erzähl mir eine einzelne Erinnerung von früher. Keine, die dir oft erzählt wurde — eine, die du selbst siehst. Und sag mir, was du dabei gefühlt hast."',
  wozu:'Welche Szene jemand auswählt und wie er sie erzählt, sagt mehr über seine heutigen Regeln als über seine Kindheit. Es geht nicht darum, ob sie stimmt.',
  nicht:'Nicht benutzen, um Kindheit aufzuarbeiten. Du fragst nach einer Erinnerung, nicht nach einer Geschichte. Kommt etwas Schweres, hörst du auf und siehst bei den Grenzen nach.',
  her:'Adlers „frühe Kindheitserinnerungen" — eines der ältesten Verfahren der Individualpsychologie.'},
 {n:'Mut zur Unvollkommenheit', wann:'Bei Perfektionismus, Aufschieben, und bei „ich bin noch nicht so weit".',
  satz:'„Was wäre die unperfekteste Fassung davon, die trotzdem zählt?"',
  wozu:'Nimmt dem Aufschieben den Vorwand. Wer nicht perfekt sein muss, kann anfangen.',
  nicht:'Nicht bei jemandem, der ohnehin schon alles hinwirft. Da brauchst du das Gegenteil.',
  her:'Ein Kernsatz der adlerianischen Tradition, geprägt im Umfeld von Rudolf Dreikurs.'},
 {n:'Als ob handeln', wann:'Wenn jemand weiß, was er will, und es trotzdem nicht tut.',
  satz:'„Mach es diese Woche einmal so, als wärst du schon der Mensch, der das kann. Nur einmal, nur eine Situation."',
  wozu:'Umgeht die Frage, ob er sich bereit fühlt. Gefühle kommen meistens nach der Handlung, nicht davor.',
  nicht:'Nicht als Dauerzustand. „Als ob" ist ein Versuch, keine Maske — sonst wird daraus Anpassung.',
  her:'Adlers „acting as if", heute in fast jeder Coaching-Schule in irgendeiner Form.'},
 {n:'Die drei Lebensaufgaben', wann:'Zur Bestandsaufnahme, und immer dann, wenn ein Thema alles andere überdeckt.',
  satz:'„Wie steht es gerade in deiner Arbeit, in deinen Beziehungen und in dem, was du mit anderen teilst?"',
  wozu:'Zeigt schnell, ob ein Bereich alles frisst — und ob es in den anderen besser läuft, als er gerade denkt.',
  nicht:'Keine Checkliste daraus machen. Es sind drei Türen, nicht drei Punkte.',
  her:'Adler fasste das Leben in drei Aufgaben: Arbeit, Gemeinschaft und Liebe.'}];

var C_SPICK = {
 titel:'Spickzettel',
 sub:'Eine Bildschirmhöhe, damit du während des Gesprächs nicht scrollst. Zum Ausdrucken gedacht.',
 knopf:'Spickzettel anzeigen',
 zu:'Spickzettel schließen',
 minuten:'Minuten',
 raus:'Wenn es zu viel wird',
 rausSatz:'„Das ist zu wichtig für das, was ich hier mache. Lass uns zusammen jemanden finden, der das richtig kann."'};
