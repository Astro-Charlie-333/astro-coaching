/* ───────────────────────────────────────────────────────────────
   planeten-daten.js — alle Sätze der Planetenseite.

   Schritt 4 aus ENTWURF-NEUE-SEITE.md, dritter Teil: planeten.html,
   planeten-in-zeichen.html, die sieben planet-*.html und
   planetenzyklen.html werden eine Seite. Die Texte „Planet im
   Zeichen" kommen unverändert aus den sieben Einzelseiten; der Satz
   „Hier ist … zuhause" steht getrennt (wuerde), weil er ohne das
   Zeichen daneben nichts sagt und auf Stufe 0 nicht erscheint.

   Die Anzeige (planeten-app.js) schreibt keinen Satz und kein
   „dein" selbst. Lücken heißen {name} und werden nur gefüllt.
   ─────────────────────────────────────────────────────────────── */

/* Die zehn Kräfte. `titel` und `was` sind Alltagssprache und stehen
   auf Stufe 0 vor dem Namen (REGELN.md 2a: ein Name nur mit
   Erklärung auf derselben Karte). */
var PL_KRAFT = [
 {k:'Sonne',   gl:'☉', gruppe:'licht', titel:'Der Kern',
  was:'Wofür du dich lebendig fühlst und wofür du gesehen werden willst. Dein Wille und deine Lebenskraft.',
  frage:'Wobei fühlst du dich so lebendig, dass du die Zeit vergisst?'},
 {k:'Mond',    gl:'☽', gruppe:'licht', titel:'Das Gefühl',
  was:'Was du brauchst, um dich sicher zu fühlen, und wie du getröstet werden willst. Deine verletzliche Seite.',
  frage:'Was hilft dir, wenn es dir nicht gut geht, und wer darf das wissen?'},
 {k:'Merkur',  gl:'☿', gruppe:'persoenlich', titel:'Das Denken',
  was:'Wie du denkst, lernst und redest. Wie du Dinge mit anderen ausmachst.',
  frage:'Wie lernst du am leichtesten: lesen, reden oder ausprobieren?'},
 {k:'Venus',   gl:'♀', gruppe:'persoenlich', titel:'Die Liebe',
  was:'Wie du liebst, was dich anzieht und was dir etwas wert ist, du selbst eingeschlossen.',
  frage:'Woran merkst du, dass dir etwas guttut und nicht nur gefällt?'},
 {k:'Mars',    gl:'♂', gruppe:'persoenlich', titel:'Der Antrieb',
  was:'Womit du anfängst, wofür du kämpfst und wie du dich durchsetzt. Deine Energie und deine Wut.',
  frage:'Wofür setzt du dich ein, auch wenn es Ärger gibt?'},
 {k:'Jupiter', gl:'♃', gruppe:'gesellschaftlich', titel:'Das Wachstum',
  was:'Wo du dir etwas zutraust, großzügig bist und an das Gute glaubst.',
  frage:'Wo hast du einmal mehr gewagt, als du dir zugetraut hast, und was kam dabei heraus?'},
 {k:'Saturn',  gl:'♄', gruppe:'gesellschaftlich', titel:'Die Reife',
  was:'Wo du dich anstrengst, streng mit dir bist und mit der Zeit Können aufbaust.',
  frage:'Wo verlangst du von dir mehr als von anderen?'},
 {k:'Uranus',  gl:'♅', gruppe:'generation', titel:'Der Aufbruch',
  was:'Wo du nicht mitmachst, wie man es macht. Freiheit, plötzliche Wendungen, Erneuerung.',
  frage:'Wo in deinem Leben brauchst du mehr Luft?'},
 {k:'Neptun',  gl:'♆', gruppe:'generation', titel:'Die Sehnsucht',
  was:'Wo Grenzen verschwimmen: Träume, Hingabe und Spiritualität, aber auch Täuschung.',
  frage:'Wofür begeisterst du dich, ohne es prüfen zu wollen?'},
 {k:'Pluto',   gl:'♇', gruppe:'generation', titel:'Die Wandlung',
  was:'Wo es um alles oder nichts geht. Macht, Tiefe und der Umbau von Grund auf.',
  frage:'Was hast du schon einmal ganz losgelassen, und was ist danach gewachsen?'}];

/* Die vier Gruppen, als kleiner Hinweis auf der Karte (ab Stufe 1). */
var PL_GRUPPE = {
 licht:'Eins der zwei Lichter',
 persoenlich:'Persönlicher Planet',
 gesellschaftlich:'Gesellschaftlicher Planet',
 generation:'Generationenplanet'};

/* Element und Art der zwölf Zeichen, in der Reihenfolge von SIGNS. */
var PL_ZART = ['Feuer · Kardinal','Erde · Fix','Luft · Veränderlich','Wasser · Kardinal',
 'Feuer · Fix','Erde · Veränderlich','Luft · Kardinal','Wasser · Fix',
 'Feuer · Veränderlich','Erde · Kardinal','Luft · Fix','Wasser · Veränderlich'];
var PL_ELEMENT = ['feuer','erde','luft','wasser'];

/* Planet im Zeichen: sieben Kräfte durch zwölf Zeichen. Reihenfolge
   der zwölf Texte wie SIGNS in engine.js. */
var PL_ZEICHEN = {
 Sonne:{
  kurz:"Der Kern · Identität, Wille, Lebenskraft",
  tip:"Die Sonne ist, wer du im Innersten bist — dein Wesenskern, dein Wille, das, worauf du hinstrahlst. Sie zeigt, wodurch du dich lebendig fühlst.",
  z:[
   "Ein Kern aus Mut und Aufbruch. Will vorangehen, anfangen, wagen. Lebendig durch Tat, Initiative, den ersten Schritt. Direkt und unabhängig.",
   "Ein Kern aus Ruhe und Beständigkeit. Will Sicherheit, Genuss, etwas Bleibendes. Lebendig durch Verlässlichkeit, Sinnlichkeit, das Konkrete. Geduldig und fest.",
   "Ein Kern aus Neugier und Austausch. Will lernen, reden, verbinden, verstehen. Lebendig durch Vielfalt, Sprache, Bewegung des Geistes. Wandelbar und wach.",
   "Ein Kern aus Gefühl und Fürsorge. Will Nähe, Zuhause, Geborgenheit. Lebendig durch emotionale Verbindung, Schützen und Genährtwerden. Sensibel und treu.",
   "Ein Kern aus Wärme und Ausdruck. Will strahlen, schaffen, gesehen werden, geben. Lebendig durch Kreativität, Herz, großzügige Präsenz. Stolz und warmherzig.",
   "Ein Kern aus Klarheit und Dienst. Will verbessern, verstehen, nützlich sein. Lebendig durch Sinn, Handwerk, das Feine im Detail. Bescheiden und gewissenhaft.",
   "Ein Kern aus Harmonie und Beziehung. Will Ausgleich, Schönheit, das Miteinander. Lebendig durch Verbindung, Fairness, Ästhetik. Diplomatisch und zugewandt.",
   "Ein Kern aus Tiefe und Intensität. Will Wahrheit, Wandlung, echtes Erleben. Lebendig durch Tiefe, Leidenschaft, das Verborgene. Intensiv und loyal.",
   "Ein Kern aus Sinn und Weite. Will verstehen, wachsen, hinaus. Lebendig durch Freiheit, Bedeutung, den großen Horizont. Optimistisch und ehrlich.",
   "Ein Kern aus Verantwortung und Aufbau. Will meistern, erreichen, etwas Solides schaffen. Lebendig durch Struktur, Ziele, Beständigkeit. Ernst und ausdauernd.",
   "Ein Kern aus Freiheit und Vision. Will erneuern, anders sein, für die Zukunft wirken. Lebendig durch Ideen, Gemeinschaft, Unabhängigkeit. Originell und weit.",
   "Ein Kern aus Mitgefühl und Traum. Will auflösen, verbinden, fühlen, hingeben. Lebendig durch Kunst, Spiritualität, grenzenlose Empathie. Weich und durchlässig."],
  wuerde:["","","","","","","","","","","",""]},
 Mond:{
  kurz:"Das Gefühl · Bedürfnis, Instinkt, Geborgenheit",
  tip:"Der Mond ist dein Gefühlsleben — wie du fühlst, was du zum Sich-sicher-Fühlen brauchst, wie du getröstet werden willst. Deine innere, verletzliche Seite.",
  z:[
   "Fühlt schnell, direkt, feurig. Braucht Bewegung und Selbstständigkeit, um sich sicher zu fühlen. Reagiert impulsiv, ist schnell aufgebracht und schnell wieder gut. Mag keine emotionale Enge.",
   "Fühlt ruhig, beständig, sinnlich. Braucht Sicherheit, Verlässlichkeit, körperliche Geborgenheit (Essen, Berührung, Natur). Lässt sich Zeit mit Gefühlen, bleibt dann treu. Mag keine Hektik.",
   "Fühlt über Denken und Reden. Braucht Austausch, um Gefühle zu verarbeiten — spricht sie sich von der Seele. Wechselhaft, neugierig, mag geistige Anregung. Kann Gefühle zerreden.",
   "Fühlt tief, unmittelbar, fürsorglich. Braucht Nest, Nähe, Vertrautheit. Nimmt Stimmungen auf wie ein Schwamm, umsorgt andere, kann sich zurückziehen ins Schneckenhaus.",
   "Fühlt warm, großzügig, dramatisch. Braucht Anerkennung, Zuneigung, das Gefühl, besonders zu sein. Zeigt Gefühle offen und herzlich. Verletzt, wenn übersehen. Liebt es, zu verwöhnen.",
   "Fühlt zurückhaltend, prüfend, dienend. Braucht Ordnung und Nützlich-sein, um sich sicher zu fühlen. Zeigt Liebe durch praktische Hilfe. Neigt zu Selbstkritik und Sorge.",
   "Fühlt über Harmonie und Beziehung. Braucht Frieden, Ausgleich, ein Gegenüber. Unwohl bei Streit und Alleinsein. Sucht Fairness, kann eigene Bedürfnisse hinter die des anderen stellen.",
   "Fühlt intensiv, tief, alles-oder-nichts. Braucht emotionale Tiefe und absolutes Vertrauen. Schützt sein Innerstes, testet, bevor es sich öffnet. Loyal bis in den Tod, verzeiht Verrat schwer.",
   "Fühlt frei, optimistisch, weit. Braucht Bewegungsfreiheit und Sinn, um sich wohlzufühlen. Mag keine emotionale Enge oder Klammern. Sucht Abenteuer auch im Gefühl. Ehrlich bis unverblümt.",
   "Fühlt kontrolliert, vorsichtig, erdig. Braucht Struktur und Verlässlichkeit. Öffnet sich erst, wenn es sicher ist — prüft Gefühle, bevor es sie zeigt. Zeigt Liebe durch Dableiben und Verantwortung, nicht durch Worte.",
   "Fühlt distanziert, freiheitsliebend, über den Kopf. Braucht Raum und Unabhängigkeit. Beobachtet Gefühle eher, als in ihnen zu baden. Wirkt kühl, ist aber loyal auf seine eigene, freie Art.",
   "Fühlt grenzenlos, mitfühlend, durchlässig. Braucht Rückzug und Auflösung, nimmt fremde Gefühle als eigene auf. Zutiefst empathisch, kann sich verlieren. Sucht Schönheit, Kunst, Spiritualität als Halt."],
  wuerde:["","","","Hier ist der Mond zuhause.","","","","","","","",""]},
 Merkur:{
  kurz:"Das Denken · Reden, Lernen, Wahrnehmen",
  tip:"Merkur ist, wie du denkst, redest, lernst und Informationen verarbeitest. Deine geistige Verdrahtung und dein Kommunikationsstil.",
  z:[
   "Denkt schnell, direkt, entschlossen. Sagt, was es denkt, ohne Umschweife. Schnelle Auffassung, aber ungeduldig mit Details. Redet gern zuerst, denkt manchmal danach.",
   "Denkt langsam, gründlich, praktisch. Braucht Zeit, bleibt dann fest bei seinem Urteil. Konkret statt abstrakt. Sagt weniger, meint es ernst. Ungern gehetzt.",
   "Denkt schnell, vielseitig, verbindend. Liebt Sprache, Information, Austausch. Springt zwischen Themen, sammelt Wissen, redet gern und viel. Kann oberflächlich werden.",
   "Denkt über Gefühl und Erinnerung. Verknüpft Wissen mit Emotion, hat ein gutes Gedächtnis für Persönliches. Kommuniziert einfühlsam, indirekt, schützend. Nimmt Worte persönlich.",
   "Denkt großzügig, überzeugt, dramatisch. Spricht mit Wärme und Autorität, gern vor Publikum. Steht zu seinen Ideen mit Stolz. Kann stur auf der eigenen Sicht beharren.",
   "Denkt präzise, analytisch, detailgenau. Sieht das Kleingedruckte, ordnet, unterscheidet. Kommuniziert klar und nützlich. Neigt zu Kritik und Grübeln.",
   "Denkt abwägend, fair, in Beziehungen. Sieht immer beide Seiten (kann schwer entscheiden). Kommuniziert diplomatisch, höflich, ausgleichend. Sucht die faire, schöne Formulierung.",
   "Denkt tief, forschend, durchdringend. Will hinter die Fassade, wittert Verborgenes. Kommuniziert intensiv, manchmal sparsam-strategisch. Ein Detektiv-Geist, misstrauisch gegenüber Oberflächen.",
   "Denkt groß, ehrlich, in Bögen. Sucht Wahrheit und Sinn statt Details. Spricht direkt, überzeugt, manchmal taktlos. Liebt Ideen und Philosophie. Verliert sich im großen Ganzen.",
   "Denkt strukturiert, ernst, zielorientiert. Realistisch, vorsichtig, gründlich. Spricht überlegt und verantwortungsvoll. Nimmt Dinge (und sich) ernst, kann pessimistisch wirken.",
   "Denkt originell, unabhängig, vorausschauend. Sieht Muster und Zukunft, denkt gern gegen den Strom. Kommuniziert sachlich, ideenreich, manchmal distanziert. Der Erfinder-Geist.",
   "Denkt bildhaft, intuitiv, verschwommen. Nimmt mehr wahr, als sich in Worte fassen lässt. Kommuniziert poetisch, einfühlsam, indirekt. Kann unlogisch wirken, ist aber oft hellsichtig."],
  wuerde:["","","Hier ist Merkur zuhause.","","","Hier ist Merkur zuhause.","","","","","",""]},
 Venus:{
  kurz:"Die Liebe und Werte · Was du anziehst, genießt, schätzt",
  tip:"Venus ist, wie du liebst, was dich anzieht, was du schön findest und wertschätzt. Dein Stil in Beziehung, Genuss und Ästhetik.",
  z:[
   "Liebt feurig, direkt, erobernd. Verliebt sich schnell, will Leidenschaft und Eroberung. Zeigt Zuneigung mutig und offen. Mag die Jagd, kann schnell das Interesse verlieren.",
   "Liebt sinnlich, treu, beständig. Genießt Berührung, Schönheit, Gemütlichkeit. Baut Liebe langsam auf, bleibt dann verlässlich. Zeigt Zuneigung körperlich und durch Fürsorge. Kann besitzergreifend sein.",
   "Liebt verspielt, geistig, abwechslungsreich. Braucht Gespräch, Witz, geistige Anregung in der Liebe. Charmant und flirty. Kann Bindung scheuen, wenn's langweilig wird.",
   "Liebt fürsorglich, tief, nestbauend. Zeigt Zuneigung durch Umsorgen und Schützen. Braucht emotionale Sicherheit, sucht Zuhause und Familie. Sensibel, klammert bei Unsicherheit.",
   "Liebt großzügig, warm, dramatisch. Will bewundert werden und verwöhnt großzügig zurück. Romantisch, treu, stolz. Braucht Aufmerksamkeit und Loyalität. Verletzt, wenn übersehen.",
   "Liebt bescheiden, dienend, praktisch. Zeigt Zuneigung durch kleine hilfreiche Taten. Zurückhaltend im Zeigen, wählerisch. Sucht das Echte, nicht das Große. Neigt zu Kritik.",
   "Liebt harmonisch, romantisch, partnerschaftlich. Sucht Ausgleich, Schönheit, ein echtes Gegenüber. Charmant, fair, beziehungsorientiert. Meidet Konflikt, kann sich verlieren.",
   "Liebt intensiv, tief, alles-oder-nichts. Will Verschmelzung, Wahrheit, absolute Hingabe. Leidenschaftlich und loyal, aber eifersüchtig und kontrollierend, wenn verunsichert. Kein halbes Ding.",
   "Liebt frei, abenteuerlich, ehrlich. Braucht Raum und gemeinsame Weite. Zeigt Zuneigung offen und optimistisch. Mag keine Enge, sucht Wachstum in der Liebe. Kann bindungsscheu sein.",
   "Liebt ernst, treu, beständig. Zeigt Zuneigung durch Verlässlichkeit, nicht durch große Worte. Baut langsam, bleibt dann. Sucht Sicherheit vor Romantik. Wirkt reserviert, ist tief loyal.",
   "Liebt frei, freundschaftlich, unkonventionell. Braucht Unabhängigkeit und geistige Verbindung. Sieht den Partner als Freund. Zeigt Zuneigung unkonventionell, wirkt distanziert, ist treu auf freie Art.",
   "Liebt hingebungsvoll, romantisch, grenzenlos. Verschmilzt gern, idealisiert, gibt sich ganz. Zutiefst empathisch und zärtlich. Kann sich verlieren oder Illusionen aufsitzen. Sucht Seelenliebe."],
  wuerde:["","","","","","","Hier ist Venus zuhause.","","","","",""]},
 Mars:{
  kurz:"Der Antrieb · Energie, Wille, Begehren",
  tip:"Mars ist deine Tatkraft, dein Antrieb, wie du kämpfst, dich durchsetzt und begehrst. Deine Energie und wie du sie einsetzt.",
  z:[
   "Handelt schnell, direkt, mutig. Geht frontal vor, liebt Herausforderung, startet gern. Kämpferisch und impulsiv. Kann aggressiv oder ungeduldig werden.",
   "Handelt langsam, beharrlich, ausdauernd. Setzt sich still aber unaufhaltsam durch. Braucht Zeit zum Loslegen, bleibt dann dran bis zum Ende. Sinnlich im Begehren. Stur, wenn gedrängt.",
   "Handelt vielseitig, wendig, verbal. Setzt sich mit Worten durch, kämpft mit Argumenten. Energie springt zwischen Vielem. Kann sich verzetteln, verliert Fokus. Flink, aber unstet.",
   "Handelt indirekt, schützend, gefühlsgeleitet. Setzt sich für Liebste ein, kämpft aus dem Bauch. Energie schwankt mit der Stimmung. Zieht sich bei Angriff ins Schneckenhaus zurück, statt frontal zu kämpfen.",
   "Handelt stolz, großzügig, dramatisch. Setzt sich mit Präsenz und Herz durch. Braucht Anerkennung fürs Tun. Kämpft für Ehre und Liebste. Kann herrschsüchtig oder theatralisch werden.",
   "Handelt präzise, effizient, dienend. Setzt sich durch gründliche, gute Arbeit durch. Energie fließt ins Verbessern und Ordnen. Kann sich in Details oder Selbstkritik verlieren.",
   "Handelt abwägend, fair, über Beziehung. Setzt sich diplomatisch durch, meidet offenen Kampf. Energie kann durch Unentschlossenheit gebremst werden. Kämpft für Gerechtigkeit und Ausgleich.",
   "Handelt strategisch, intensiv, unaufhaltsam. Setzt sich mit stiller Macht und Ausdauer durch. Energie tief und kontrolliert. Kämpft verdeckt, nachtragend, aber extrem willensstark. Alles oder nichts.",
   "Handelt begeistert, weit, freiheitsliebend. Setzt sich mit Optimismus und Überzeugung durch. Energie braucht Ziel und Sinn. Kämpft für Ideale. Kann sich verzetteln oder überschätzen.",
   "Handelt diszipliniert, ausdauernd, zielstrebig. Setzt sich durch Beharrlichkeit und Struktur durch. Energie kontrolliert und langfristig. Der Marathonläufer — unaufhaltsam, geduldig.",
   "Handelt unabhängig, originell, für die Sache. Setzt sich unkonventionell durch, kämpft für Ideen und Gemeinschaft. Energie stoßweise, eigenwillig. Mag keine Befehle, rebelliert gegen Zwang.",
   "Handelt indirekt, fließend, intuitiv. Setzt sich sanft oder verdeckt durch, meidet direkten Kampf. Energie schwankt, folgt Gefühl und Inspiration. Stark in Kunst/Spiritualität, kann sich verlieren."],
  wuerde:["Hier ist Mars zuhause.","","","","","","","","","Hier ist Mars stark.","",""]},
 Jupiter:{
  kurz:"Das Wachstum · Glück, Sinn, Expansion",
  tip:"Jupiter zeigt, wo du wächst, Glück und Fülle findest, wo du großzügig und optimistisch bist. Dein Bereich der Weite und des Vertrauens.",
  z:[
   "Wächst durch Mut und Initiative. Glück durch Vorangehen, Neues wagen, Unabhängigkeit. Großzügiger, begeisterter Pionier. Kann übermütig oder überstürzt werden.",
   "Wächst durch Beständigkeit und Genuss. Glück durch materielle Sicherheit, Sinnlichkeit, das Konkrete. Großzügig mit Ressourcen. Kann in Bequemlichkeit oder Übermaß kippen.",
   "Wächst durch Lernen und Austausch. Glück durch Wissen, Kontakte, Vielfalt. Großzügig mit Ideen und Worten. Kann sich verzetteln oder oberflächlich bleiben.",
   "Wächst durch Fürsorge und Nähe. Glück durch Familie, Zuhause, emotionale Verbindung. Großzügig im Umsorgen. Nährt und wird genährt.",
   "Wächst durch Ausdruck und Großzügigkeit. Glück durch Kreativität, Bühne, Herzlichkeit. Großzügig, warmherzig, inspirierend. Kann übertreiben oder eitel werden.",
   "Wächst durch Dienst und Verbesserung. Glück durch Nützlich-sein, Handwerk, Sorgfalt. Großzügig mit Hilfe. Kann sich in Details oder Bescheidenheit verlieren.",
   "Wächst durch Beziehung und Harmonie. Glück durch Partnerschaft, Schönheit, Ausgleich. Großzügig, fair, verbindend. Sucht Wachstum durch das Miteinander.",
   "Wächst durch Tiefe und Wandlung. Glück durch echtes Erleben, Transformation, Intensität. Großzügig mit Loyalität. Wächst durch Krisen, die zu Tiefe führen.",
   "Wächst durch Sinn und Weite. Glück durch Reisen, Philosophie, Freiheit, den großen Horizont. Großzügig, optimistisch, weise. Kann maßlos werden.",
   "Wächst durch Struktur und Verantwortung. Glück durch Erreichtes, Meisterschaft, langfristigen Aufbau. Großzügig durch Verlässlichkeit. Erdet den Optimismus, wächst langsam aber solide.",
   "Wächst durch Vision und Gemeinschaft. Glück durch Ideen, Freiheit, Zukunft, das Kollektiv. Großzügig mit Idealen. Wächst über Andersartigkeit und Fortschritt.",
   "Wächst durch Mitgefühl und Hingabe. Glück durch Spiritualität, Kunst, grenzenlose Empathie. Großzügig bis zur Selbstaufgabe. Wächst über Auflösung und Verbindung."],
  wuerde:["","","","Hier ist Jupiter stark.","","","","","Hier ist Jupiter zuhause.","","","Hier ist Jupiter stark."]},
 Saturn:{
  kurz:"Die Struktur · Verantwortung, Grenzen, Reife",
  tip:"Saturn zeigt, wo du lernst, reifst, dich anstrengst — dein Bereich der Herausforderung, Disziplin und langfristigen Meisterschaft. Der strenge Lehrer.",
  z:[
   "Lernaufgabe: gesunde Durchsetzung und Geduld. Ringt mit Ungeduld und Impulsivität. Reift, indem es lernt, Energie bewusst und ausdauernd zu lenken statt zu verpuffen.",
   "Lernaufgabe: echter Selbstwert und Sicherheit von innen. Ringt mit Angst um materielle Sicherheit und Festhalten. Reift durch das Vertrauen, dass Wert nicht von Besitz abhängt.",
   "Lernaufgabe: Konzentration und tiefes Denken. Ringt mit Zerstreuung und Selbstzweifeln beim Reden/Lernen. Reift, indem es Wissen vertieft statt nur zu streuen.",
   "Lernaufgabe: emotionale Sicherheit und Grenzen. Ringt mit alter Verletzlichkeit, Angst vor Nähe oder Zurückweisung. Reift, indem es lernt, sich selbst zu nähren und Gefühle zu halten.",
   "Lernaufgabe: echtes Selbstvertrauen und Ausdruck. Ringt mit Angst, gesehen zu werden, oder Anerkennungshunger. Reift, indem es die eigene Kreativität ernst nimmt, ohne Applaus zu brauchen.",
   "Lernaufgabe: Selbstannahme trotz Unvollkommenheit. Ringt mit Perfektionismus, Selbstkritik, Sorge. Reift, indem es lernt, gut genug sein zu lassen und sich selbst zu dienen.",
   "Lernaufgabe: echte, gleichwürdige Beziehung. Ringt mit Abhängigkeit, Konfliktscheu, Sich-Verlieren. Reift, indem es lernt, in Verbindung sich selbst treu zu bleiben.",
   "Lernaufgabe: Vertrauen und Loslassen von Kontrolle. Ringt mit Machtthemen, Misstrauen, Angst vor Verrat. Reift, indem es lernt, sich verletzlich zu zeigen und zu vertrauen.",
   "Lernaufgabe: gelebter Sinn statt bloßer Überzeugung. Ringt mit Dogmatismus oder Rastlosigkeit. Reift, indem es Weisheit erdet und aus Erfahrung statt Meinung schöpft.",
   "Lernaufgabe: Meisterschaft ohne Verhärtung. Ringt mit Härte, Pflichtgefühl, Angst vor Versagen. Reift, indem es Verantwortung mit Wärme und Selbstmitgefühl verbindet.",
   "Lernaufgabe: Zugehörigkeit trotz Andersartigkeit. Ringt mit Isolation oder Rebellion um ihrer selbst willen. Reift, indem es Freiheit und Gemeinschaft versöhnt.",
   "Lernaufgabe: gesunde Grenzen bei aller Offenheit. Ringt mit Verwirrung, Flucht, Selbstaufgabe. Reift, indem es lernt, mitzufühlen ohne sich zu verlieren, und Träume zu erden."],
  wuerde:["","","","","","","","","","Hier ist Saturn zuhause.","Hier ist Saturn stark.",""]}};

/* Die drei langsamen Kräfte stehen bei allen Menschen eines
   Jahrgangs im selben Zeichen. Bei ihnen sagt das Zeichen wenig über
   eine Person. */
var PL_AUSSEN = 'Diese Kraft bewegt sich so langsam, dass alle Menschen deines Jahrgangs sie ähnlich tragen. Persönlich wird sie durch den Lebensbereich, in dem sie bei dir steht.';

/* Die Zyklen, die für ein Profil gerechnet werden (planeten-rechner.js).
   Die Rückkehr ist ein Name, der hier erklärt wird (REGELN.md 2a). */
var PL_ZYKLUS = {
 Jupiter:{titel:'Jupiter-Rückkehr',
   was:'Jupiter steht wieder dort, wo er bei deiner Geburt stand. Neue Weite, ein neuer Anlauf: Wo willst du wachsen?'},
 Saturn1:{titel:'Erste Saturn-Rückkehr',
   was:'Saturn kommt zum ersten Mal an seinen Platz zurück. Erwachsenwerden im echten Sinn: Was nicht trägt, fällt.'},
 Saturn2:{titel:'Zweite Saturn-Rückkehr',
   was:'Saturn kehrt zum zweiten Mal zurück. Ernte und Bilanz: Was bleibt, und was darfst du ablegen?'},
 Uranus:{titel:'Uranus-Opposition',
   was:'Uranus steht seinem Platz bei deiner Geburt gegenüber. Die Lebensmitte: Freiheit gegen das, was geworden ist.'}};

/* Ohne Profil: die Lebensmarken nach dem Alter. Sie gelten für alle
   Menschen; die Uranus-Marke schwankt je nach Jahrgang. */
var PL_MARKEN = [
 {a:12,t:'Jupiter-Rückkehr',d:'Neue Weite, erster eigener Anlauf'},
 {a:24,t:'Jupiter-Rückkehr',d:'Raum für das eigene Leben'},
 {a:29,t:'Erste Saturn-Rückkehr',d:'Erwachsenwerden: was nicht trägt, fällt'},
 {a:36,t:'Jupiter-Rückkehr',d:'Ausdehnung auf gefestigter Basis'},
 {a:37,t:'Mondknoten-Rückkehr',d:'Bin ich auf meinem Weg?'},
 {a:42,t:'Uranus-Opposition (ungefähr)',d:'Freiheit gegen das Gewordene. Das Alter schwankt je nach Jahrgang zwischen 40 und 45.'},
 {a:44,t:'Saturn-Opposition',d:'Halbzeit: Hält die Struktur?'},
 {a:48,t:'Jupiter-Rückkehr',d:'Neue Weite, oft beruflich'},
 {a:50,t:'Chiron-Rückkehr',d:'Aus der Wunde wird Können für andere'},
 {a:56,t:'Mondknoten-Rückkehr',d:'Die dritte Richtungsfrage'},
 {a:59,t:'Zweite Saturn-Rückkehr',d:'Bilanz und Ernte'},
 {a:60,t:'Jupiter-Rückkehr',d:'Der fünfte Wachstumszyklus'}];

/* Übung zu den Zyklen, unverändert aus planetenzyklen.html, dazu
   eine Frage zu den Kräften selbst. */
var PL_QUIZ = [
 {q:'Was sagt ein Planet in einem Geburtsbild?',
  o:['Welche Kraft wirkt: Gefühl, Denken, Liebe, Antrieb','In welchem Lebensbereich etwas passiert'],r:0,
  e:'Der Planet ist das Was. Das Zeichen sagt, wie diese Kraft sich ausdrückt, das Haus, auf welcher Lebensbühne. Erst alle drei zusammen beschreiben einen Menschen.'},
 {q:'Beim letzten Jupiter-Durchgang durch das 4. Haus ist jemand umgezogen. Jupiter läuft jetzt wieder durch das 4. Haus. Was sagst du im Reading?',
  o:['„Du wirst wieder umziehen."','„Es geht wieder um Zuhause und Raum. In welcher Form?"'],r:1,
  e:'Der Zyklus wiederholt das Thema, nicht das Ereignis. Es kann diesmal ein Umbau sein, ein Familienthema, ein neues Verhältnis zur eigenen Herkunft. Eine Ereignis-Prognose ist nicht nur unseriös, sie verschließt auch den Blick für das, was tatsächlich passiert.'},
 {q:'Welcher Zyklus eignet sich am besten, um im Coaching schnell ein überprüfbares Muster zu finden?',
  o:['Mars, 2 Jahre','Neptun, 165 Jahre'],r:0,
  e:'Kurze Zyklen sind im Gespräch überprüfbar: An zwei Jahre zurück erinnert sich jeder. Neptun kehrt in einem Menschenleben nie zurück. Er beschreibt Generationen, keine Biografie.'},
 {q:'Eine Klientin ist 29 und beschreibt, dass gerade alles zusammenbricht. Was ist die hilfreichste Frage?',
  o:['„Was hält davon nicht mehr, und wusstest du das schon vorher?"','„Wann ist es endlich vorbei?"'],r:0,
  e:'Die Saturn-Rückkehr entfernt, was nicht getragen hat, meistens Dinge, die man selbst längst geahnt hat. Die Frage nach dem Ende vertröstet nur. Die Frage nach dem, was ohnehin nicht mehr hielt, gibt der Person ihre Handlungsfähigkeit zurück.'}];

/* Alle Wörter der Anzeige. Lücken {name} werden gefüllt, nie erweitert. */
var PL_TEXT = {
 profilOhne:'Noch kein Profil aktiv. Mit einem Profil unter <a href="profile.html">Profile</a> steht bei jeder Kraft, wie sie bei dir aussieht.',
 profilMit:'Für {name}: Bei jeder Kraft steht, wie sie bei dir aussieht. Wechseln unter <a href="profile.html">Profile</a>.',
 beiKopf:'So zeigt sich {wer}',
 beiTech:'{planet} in {zeichen} · {haus}. Haus',
 zeichenBei:'Bei dir',
 bahnHeute:'Der Himmel heute',
 bahnGeburt:'Bei der Geburt',
 bahnTipp:'Tippe eine Kraft an',
 zyklenMit:'Gerechnet für {name}. Die Monate stimmen auf etwa einen Monat genau.',
 zyklenOhne:'Ohne Profil rechnet die Seite nach dem Geburtsjahr, auf etwa ein Jahr genau.',
 jahrFehler:'Bitte ein Jahr zwischen 1900 und 2030 eingeben.',
 alterJetzt:'Im Jahr {jahr} etwa {alter} Jahre alt.',
 mitAlter:'mit {alter}',
 vorbei:'vorbei',
 naechstes:'als Nächstes',
 spalteJahr:'Jahr',
 spalteAlter:'Alter',
 spalteZyklus:'Zyklus'};
