/* Texte der Mondseite. Zusammengelegt aus lunationen.html,
   mondzyklen.html und mondphasen-rhythmus.html am 6.11.2026.
   Die Rechnung steht in mond-app.js, die Termine in mond-termine.js. */
var MT_TYP = [
 {
  "k": "Neumond",
  "wort": "Säen",
  "alltag": "Der Mond ist unsichtbar. Etwas will anfangen, bevor es sich zeigt, auch vor dir selbst.",
  "tech": "Sonne und Mond stehen zusammen. Es ist dunkel — etwas beginnt, bevor es sichtbar ist.",
  "fenster": "Wirkt rund zwei Wochen, bis zum Vollmond.",
  "tun": "Absicht setzen, anfangen, noch nichts zeigen. Aufschreiben, was beginnen will.",
  "zugross": "Dass man am Neumond anfangen muss, sonst ist die Gelegenheit weg. Der nächste kommt in vier Wochen."
 },
 {
  "k": "Vollmond",
  "wort": "Ernten",
  "alltag": "Der Mond ist voll und hell. Was in den letzten Wochen gewachsen ist, wird sichtbar, Gefühle eingeschlossen.",
  "tech": "Sonne und Mond stehen sich gegenüber. Alles liegt im Licht — etwas wird sichtbar oder kippt ins Bewusstsein.",
  "fenster": "Wirkt rund zwei Wochen, bis zum Neumond.",
  "tun": "Anschauen, klären, abschließen. Nichts Neues beginnen.",
  "zugross": "Dass der Vollmond Menschen messbar unruhiger macht. Eine große Auswertung von Studien fand dafür keinen Beleg (Rotton und Kelly, 1985)."
 },
 {
  "k": "Sonnenfinsternis",
  "wort": "Neu ansetzen",
  "alltag": "Ein Neumond, bei dem der Mond die Sonne ganz oder teilweise verdeckt. Das passiert meist zweimal im Jahr. Er gilt als Neustart, der sich erst über Monate zeigt.",
  "tech": "Ein Neumond nahe der Mondknotenachse. Der Mond verdeckt die Sonne — etwas wird unsichtbar, bevor es neu erscheint.",
  "fenster": "Von etwa zwei Wochen vorher bis rund sechs Monate danach.",
  "tun": "Nicht erzwingen. Der Anfang zeigt sich oft erst rückblickend, und meistens mit einem blinden Fleck.",
  "zugross": "Dass eine Finsternis Unglück bringt. Sie beschreibt einen Zeitraum, kein Ereignis."
 },
 {
  "k": "Mondfinsternis",
  "wort": "Loslassen",
  "alltag": "Ein Vollmond, bei dem der Schatten der Erde auf den Mond fällt. Er gilt als Abschluss: Was nicht mehr trägt, wird deutlich.",
  "tech": "Ein Vollmond nahe der Mondknotenachse. Die Erde schiebt sich dazwischen — etwas wird abrupt sichtbar.",
  "fenster": "Von etwa zwei Wochen vorher bis rund sechs Monate danach.",
  "tun": "Loslassen, was ohnehin nicht mehr trägt. Nicht suchen, was man aufgeben könnte.",
  "zugross": "Dass man bei einer Mondfinsternis etwas verliert. Meist geht, was ohnehin nicht mehr getragen hat."
 }
];

var MT_ZEICHEN = [
 {
  "n": "Widder",
  "el": "Feuer",
  "wie": "schnell, direkt und ungeduldig — es geht sofort los",
  "art": {
   "Neumond": "Etwas anfangen, ohne den Plan zu haben. Mut vor Vorbereitung — der Rest ergibt sich beim Gehen.",
   "Vollmond": "Es kulminiert die Frage, was du selbst willst — gegen das, was das Umfeld erwartet.",
   "Sonnenfinsternis": "Ein Neustart im Selbstbehaupten. Was hier beginnt, verlangt Mut und wird über Monate wachsen.",
   "Mondfinsternis": "Etwas im Selbstbehaupten kommt an sein Ende. Ein alter Kampf hört auf."
  }
 },
 {
  "n": "Stier",
  "el": "Erde",
  "wie": "langsam, sinnlich und handfest — es soll bleiben",
  "art": {
   "Neumond": "Etwas aufbauen, das bleiben soll. Langsam beginnen, dafür mit einem tragfähigen Fundament.",
   "Vollmond": "Es kulminiert die Frage nach Sicherheit und Wert. Was ist genug, und was hältst du fest?",
   "Sonnenfinsternis": "Ein Neustart in Sachen Wert und Sicherheit. Langsam, aber grundlegend.",
   "Mondfinsternis": "Etwas in Sachen Besitz oder Selbstwert löst sich. Loslassen fällt hier besonders schwer."
  }
 },
 {
  "n": "Zwillinge",
  "el": "Luft",
  "wie": "über Reden, Lesen und Verknüpfen — viele Fäden gleichzeitig",
  "art": {
   "Neumond": "Ein Gespräch beginnen, eine Frage stellen, etwas lernen. Neugier ist hier der Antrieb.",
   "Vollmond": "Es kulminiert etwas Gesagtes oder Ungesagtes. Informationen kommen zusammen.",
   "Sonnenfinsternis": "Ein Neustart im Denken und Sprechen. Neue Kontakte, neue Themen, ein anderer Ton.",
   "Mondfinsternis": "Etwas Ungesagtes kommt heraus. Eine Wahrheit findet ihre Worte."
  }
 },
 {
  "n": "Krebs",
  "el": "Wasser",
  "wie": "über Gefühl, Zugehörigkeit und Schutz",
  "art": {
   "Neumond": "Sich um etwas kümmern, das Nähe braucht. Ein Anfang, der Sicherheit schaffen soll.",
   "Vollmond": "Es kulminiert ein Bedürfnis nach Zugehörigkeit. Familie und Herkunft werden spürbar.",
   "Sonnenfinsternis": "Ein Neustart in Zugehörigkeit und Zuhause. Oft mit Umzug, Familie oder Wurzeln verbunden.",
   "Mondfinsternis": "Etwas mit Familie oder Zuhause kulminiert. Ein Kapitel der Herkunft schließt."
  }
 },
 {
  "n": "Löwe",
  "el": "Feuer",
  "wie": "großzügig, sichtbar und mit Herz — es will gesehen werden",
  "art": {
   "Neumond": "Sich zeigen. Etwas beginnen, das von dir handelt und Freude machen darf.",
   "Vollmond": "Es kulminiert der Wunsch, gesehen zu werden. Etwas will endlich Anerkennung.",
   "Sonnenfinsternis": "Ein Neustart im Sichtbarwerden. Etwas Eigenes will nach draußen.",
   "Mondfinsternis": "Etwas im Ausdruck kommt an sein Ende — eine Rolle, ein Auftritt, eine Verliebtheit."
  }
 },
 {
  "n": "Jungfrau",
  "el": "Erde",
  "wie": "genau, prüfend und praktisch — im Detail, nicht im Großen",
  "art": {
   "Neumond": "Ordnen und verbessern. Ein unspektakulärer Anfang, der im Kleinen ansetzt.",
   "Vollmond": "Es kulminiert die Frage, ob es reicht. Kritik und Perfektion werden laut.",
   "Sonnenfinsternis": "Ein Neustart im Alltag. Routinen, Arbeit, Körper — unspektakulär und tiefgreifend.",
   "Mondfinsternis": "Etwas im Alltag bricht weg. Meist eine Routine, die nicht mehr trägt."
  }
 },
 {
  "n": "Waage",
  "el": "Luft",
  "wie": "über das Gegenüber, über Ausgleich und Ästhetik",
  "art": {
   "Neumond": "Auf jemanden zugehen. Ein Anfang, der zu zweit gedacht ist.",
   "Vollmond": "Es kulminiert eine Beziehungsfrage. Ausgleich oder Ungleichgewicht wird deutlich.",
   "Sonnenfinsternis": "Ein Neustart in Beziehungen. Neue Menschen oder eine neue Art, mit ihnen umzugehen.",
   "Mondfinsternis": "Etwas in einer Beziehung kulminiert. Klarheit, in die eine oder andere Richtung."
  }
 },
 {
  "n": "Skorpion",
  "el": "Wasser",
  "wie": "tief, kompromisslos und unter der Oberfläche",
  "art": {
   "Neumond": "Etwas beginnen, das ernst ist. Kein Probelauf, sondern Tiefe von Anfang an.",
   "Vollmond": "Es kulminiert etwas Tiefes. Kontrolle, Vertrauen oder Geteiltes kommen an einen Punkt.",
   "Sonnenfinsternis": "Ein Neustart in der Tiefe. Etwas verändert sich grundlegend, oft ohne Ankündigung.",
   "Mondfinsternis": "Etwas Tiefes löst sich. Kontrolle, Bindung oder ein Geheimnis kommt ans Licht."
  }
 },
 {
  "n": "Schütze",
  "el": "Feuer",
  "wie": "weit, überzeugt und auf ein Ziel hin",
  "art": {
   "Neumond": "Den Horizont weiten. Lernen, reisen, an etwas glauben, das größer ist als der Alltag.",
   "Vollmond": "Es kulminiert eine Sinnfrage. Eine Überzeugung wird bestätigt oder bricht weg.",
   "Sonnenfinsternis": "Ein Neustart im Weltbild. Lernen, Ferne, Glauben — der Horizont verschiebt sich.",
   "Mondfinsternis": "Eine Überzeugung endet. Was du geglaubt hast, hält der Prüfung nicht mehr stand."
  }
 },
 {
  "n": "Steinbock",
  "el": "Erde",
  "wie": "ernsthaft, strukturiert und langfristig",
  "art": {
   "Neumond": "Verantwortung übernehmen. Ein Anfang mit Anspruch und langem Zeithorizont.",
   "Vollmond": "Es kulminiert eine Frage nach Leistung und Anerkennung. Ergebnisse werden sichtbar.",
   "Sonnenfinsternis": "Ein Neustart in Verantwortung und Rolle. Beruflich oft ein Einschnitt.",
   "Mondfinsternis": "Etwas Berufliches kulminiert. Anerkennung oder Abschluss, oft öffentlich."
  }
 },
 {
  "n": "Wassermann",
  "el": "Luft",
  "wie": "eigenwillig, distanziert und nicht wie üblich",
  "art": {
   "Neumond": "Etwas anders machen als üblich. Ein Anfang, der nicht ins Schema passen soll.",
   "Vollmond": "Es kulminiert die Spannung zwischen Dazugehören und Eigenständigsein.",
   "Sonnenfinsternis": "Ein Neustart in Zugehörigkeit und Zukunft. Gruppen, Netzwerke, Ziele.",
   "Mondfinsternis": "Etwas in einer Gruppe löst sich. Zugehörigkeiten sortieren sich neu."
  }
 },
 {
  "n": "Fische",
  "el": "Wasser",
  "wie": "durchlässig, intuitiv und ohne feste Grenze",
  "art": {
   "Neumond": "Loslassen und vertrauen. Ein Anfang, der sich mehr wie Hingabe anfühlt als wie Planung.",
   "Vollmond": "Es kulminiert etwas Diffuses. Gefühle, Erschöpfung oder Sehnsucht werden greifbar.",
   "Sonnenfinsternis": "Ein Neustart im Inneren. Wenig sichtbar, dafür grundlegend — oft ein Abschluss, der einen Anfang enthält.",
   "Mondfinsternis": "Etwas Unbewusstes wird sichtbar. Erschöpfung oder eine alte Sehnsucht meldet sich."
  }
 }
];

var MT_HAUS = [
 {
  "n": 1,
  "t": "Person, Körper, Auftreten",
  "lang": "deine Person und dein Auftreten",
  "kurz": "Person",
  "wo": "in dir selbst — Auftreten, Körper, wie du dich zeigst",
  "frage": "Was möchtest du über dich selbst herausfinden?",
  "art": {
   "Neumond": "Ein neuer Anfang mit dir selbst. Aussehen, Auftreten, wie du dich zeigst — hier darf etwas neu gesetzt werden.",
   "Vollmond": "Etwas an dir selbst wird sichtbar. Wie du wirkst, was andere in dir sehen, kommt ans Licht.",
   "Sonnenfinsternis": "Ein Reset an deiner Person. Über die nächsten sechs Monate verändert sich, wie du auftrittst und wer du für andere bist.",
   "Mondfinsternis": "Ein Abschluss an deiner Person. Ein Selbstbild, das nicht mehr stimmt, fällt weg."
  }
 },
 {
  "n": 2,
  "t": "Wert, Geld, Ressourcen",
  "lang": "deinen Wert und deinen Besitz",
  "kurz": "Wert",
  "wo": "in dem, was dir gehört und was du dir wert bist",
  "frage": "Woran misst du gerade deinen Wert?",
  "art": {
   "Neumond": "Ein neuer Anfang bei Geld und Wert. Ein Vorhaben, das dich tragen soll, oder eine neue Haltung zum eigenen Wert.",
   "Vollmond": "Eine Frage von Wert und Geld kulminiert. Eine Zahl, eine Entscheidung, eine Bewertung wird fällig.",
   "Sonnenfinsternis": "Ein Reset bei Wert und Ressourcen. Einkommen, Besitz oder Selbstwert werden neu gesetzt — selten sanft.",
   "Mondfinsternis": "Ein Abschluss bei Wert und Besitz. Etwas Materielles oder eine alte Bewertung deiner selbst endet."
  }
 },
 {
  "n": 3,
  "t": "Sprache, Lernen, Nahbereich",
  "lang": "Sprache und deinen Nahbereich",
  "kurz": "Sprache",
  "wo": "im Reden, Lernen und im täglichen Umfeld",
  "frage": "Was möchtest du lernen oder endlich aussprechen?",
  "art": {
   "Neumond": "Ein neuer Anfang im Reden und Lernen. Ein Kurs, ein Text, ein Gespräch, das lange fällig war.",
   "Vollmond": "Ein Gespräch kommt zum Punkt. Etwas wird ausgesprochen oder endlich verstanden.",
   "Sonnenfinsternis": "Ein Reset im Denken und Reden. Eine neue Sprache, ein neues Umfeld, eine neue Art zu lernen.",
   "Mondfinsternis": "Ein Abschluss im Reden. Ein Gespräch wird zu Ende geführt, oder ein Kontakt hört auf."
  }
 },
 {
  "n": 4,
  "t": "Zuhause, Wurzeln, Herkunft",
  "lang": "dein Zuhause und deine Wurzeln",
  "kurz": "Zuhause",
  "wo": "zuhause, in der Familie und in dem, was dich geprägt hat",
  "frage": "Was bräuchtest du, damit du dich wirklich zuhause fühlst?",
  "art": {
   "Neumond": "Ein neuer Anfang zuhause. Umzug, Umbau, oder eine andere Beziehung zur eigenen Herkunft.",
   "Vollmond": "Ein Familien- oder Wohnthema kulminiert. Etwas an der Basis klärt sich oder bricht auf.",
   "Sonnenfinsternis": "Ein Reset an der Basis. Wohnen, Familie oder Herkunft — der Boden wird neu gelegt.",
   "Mondfinsternis": "Ein Abschluss zuhause. Ein Wohnort, eine Familienrolle oder ein altes Herkunftsthema wird abgelegt."
  }
 },
 {
  "n": 5,
  "t": "Ausdruck, Spiel, Romantik",
  "lang": "deinen Ausdruck und deine Romantik",
  "kurz": "Ausdruck",
  "wo": "in dem, was aus dir herauswill — Kreativität, Verliebtsein, Spiel",
  "frage": "Was möchtest du machen, ohne dass es einen Zweck hat?",
  "art": {
   "Neumond": "Ein neuer Anfang im Ausdruck. Etwas Kreatives, ein Verliebtsein, etwas, das Freude macht.",
   "Vollmond": "Etwas Kreatives oder Romantisches erreicht seinen Höhepunkt — im Guten oder als Entscheidung.",
   "Sonnenfinsternis": "Ein Reset im Ausdruck. Was aus dir herauswill, findet eine andere Form. Auch Romantik gehört hierher.",
   "Mondfinsternis": "Ein Abschluss im Ausdruck. Ein Projekt wird fertig, oder eine romantische Sache findet ihr Ende."
  }
 },
 {
  "n": 6,
  "t": "Alltag, Arbeit, Gesundheit",
  "lang": "deinen Alltag und deine Arbeit",
  "kurz": "Alltag",
  "wo": "im gewöhnlichen Tag: Arbeit, Routinen, Körper",
  "frage": "Welche Routine würde dir das Leben leichter machen?",
  "art": {
   "Neumond": "Ein neuer Anfang im Alltag. Eine Routine, ein Arbeitsrhythmus, ein anderer Umgang mit dem Körper.",
   "Vollmond": "Der Alltag zeigt seine Rechnung. Arbeitspensum, Routine oder Körper melden sich deutlich.",
   "Sonnenfinsternis": "Ein Reset im Alltag. Arbeit, Routinen und Körper stellen sich um — meistens weil es so nicht weiterging.",
   "Mondfinsternis": "Ein Abschluss im Alltag. Eine Routine, ein Job oder eine Belastung, die zu lange getragen wurde."
  }
 },
 {
  "n": 7,
  "t": "Partnerschaft und Begegnung",
  "lang": "deine Partnerschaften",
  "kurz": "Partnerschaft",
  "wo": "in der Begegnung mit einem Gegenüber",
  "frage": "Was erwartest du von einem Gegenüber, ohne es zu sagen?",
  "art": {
   "Neumond": "Ein neuer Anfang mit einem Gegenüber. Eine Beziehung, eine Zusammenarbeit, ein Gespräch auf Augenhöhe.",
   "Vollmond": "Eine Beziehung kommt zum Punkt. Klärung, Bekenntnis oder Ende — jedenfalls Sichtbarkeit.",
   "Sonnenfinsternis": "Ein Reset in der Partnerschaft. Beziehungen beginnen, wandeln sich oder enden über die kommenden Monate.",
   "Mondfinsternis": "Ein Abschluss in der Beziehung. Etwas klärt sich endgültig — Bekenntnis oder Trennung."
  }
 },
 {
  "n": 8,
  "t": "Tiefe, Krise, Geteiltes",
  "lang": "Tiefe und Geteiltes",
  "kurz": "Tiefe",
  "wo": "dort, wo es ernst wird — Nähe, Krise, Gemeinsames",
  "frage": "Was hältst du fest, obwohl du es loslassen könntest?",
  "art": {
   "Neumond": "Ein neuer Anfang in der Tiefe. Etwas Gemeinsames, etwas Ernstes, etwas, das Vertrauen verlangt.",
   "Vollmond": "Etwas Tiefes kommt hoch. Vertrauen, Abhängigkeit, Gemeinsames — hier wird es ernst.",
   "Sonnenfinsternis": "Ein Reset in der Tiefe. Gemeinsame Ressourcen, Abhängigkeiten, Verwandlung. Kein Unglück — ein Umbau.",
   "Mondfinsternis": "Ein Abschluss in der Tiefe. Etwas Verstricktes löst sich, oft mit spürbarer Erleichterung danach."
  }
 },
 {
  "n": 9,
  "t": "Sinn, Weite, Lehre",
  "lang": "Sinn und Weite",
  "kurz": "Sinn",
  "wo": "in Sinnfragen, Ferne, Lernen und Überzeugungen",
  "frage": "Woran glaubst du gerade — und wovon hast du dich verabschiedet?",
  "art": {
   "Neumond": "Ein neuer Anfang im Weiten. Reise, Ausbildung, eine Überzeugung, die sich verschiebt.",
   "Vollmond": "Eine Überzeugung kulminiert. Etwas, das du geglaubt hast, bestätigt sich oder fällt.",
   "Sonnenfinsternis": "Ein Reset im Weltbild. Ausbildung, Ferne, Glaube — der Horizont verschiebt sich.",
   "Mondfinsternis": "Ein Abschluss im Glauben. Eine Überzeugung, die dich lange getragen hat, trägt nicht mehr."
  }
 },
 {
  "n": 10,
  "t": "Beruf und Sichtbarkeit",
  "lang": "deinen Beruf und deine Sichtbarkeit",
  "kurz": "Beruf",
  "wo": "in der Öffentlichkeit — Beruf, Rolle, wofür du stehst",
  "frage": "Wofür möchtest du bekannt sein?",
  "art": {
   "Neumond": "Ein neuer Anfang im Beruf. Eine Rolle, ein Projekt, ein Schritt in die Sichtbarkeit.",
   "Vollmond": "Beruflich wird etwas sichtbar. Anerkennung, Ergebnis oder eine Rolle, die nicht mehr passt.",
   "Sonnenfinsternis": "Ein Reset im Beruf. Rolle, Richtung oder Sichtbarkeit werden über Monate neu bestimmt.",
   "Mondfinsternis": "Ein Abschluss im Beruf. Eine Rolle endet oder erreicht ihren Höhepunkt und danach ihr Ende."
  }
 },
 {
  "n": 11,
  "t": "Gruppen, Netzwerke, Ziele",
  "lang": "deine Gruppen und Ziele",
  "kurz": "Gruppen",
  "wo": "in Gruppen, Freundeskreis und langfristigen Vorhaben",
  "frage": "Wo gehörst du dazu, ohne dich anstrengen zu müssen?",
  "art": {
   "Neumond": "Ein neuer Anfang in Gruppen. Ein Netzwerk, ein Kreis, ein Ziel, das man nicht allein verfolgt.",
   "Vollmond": "Ein Gruppenthema kulminiert. Zugehörigkeit oder ein gemeinsames Ziel klärt sich.",
   "Sonnenfinsternis": "Ein Reset im Umfeld. Gruppen, Freundeskreis und langfristige Ziele sortieren sich neu.",
   "Mondfinsternis": "Ein Abschluss in einer Gruppe. Ein Kreis oder ein gemeinsames Ziel läuft aus."
  }
 },
 {
  "n": 12,
  "t": "Rückzug, Inneres, Unsichtbares",
  "lang": "deinen Rückzug und dein Inneres",
  "kurz": "Rückzug",
  "wo": "im Verborgenen — auch vor dir selbst",
  "frage": "Was möchtest du abschließen, bevor etwas Neues beginnt?",
  "art": {
   "Neumond": "Ein neuer Anfang im Verborgenen. Etwas beginnt, das noch niemand sieht — auch du kaum.",
   "Vollmond": "Etwas Inneres wird bewusst. Was lange unter der Oberfläche lief, kommt jetzt an die Oberfläche.",
   "Sonnenfinsternis": "Ein Reset im Verborgenen. Ein Kapitel beginnt, das erst später sichtbar wird — oft nach einem Rückzug.",
   "Mondfinsternis": "Ein Abschluss im Inneren. Etwas Altes verabschiedet sich, ohne dass es jemand mitbekommt."
  }
 }
];

var MT_PUNKT = {
 "Sonne": [
  "deine Identität",
  "wofür du Kraft hast"
 ],
 "Mond": [
  "dein Gefühlsleben",
  "was du brauchst, um dich sicher zu fühlen"
 ],
 "Merkur": [
  "dein Denken und Reden",
  "wie du sortierst und formulierst"
 ],
 "Venus": [
  "deine Zuneigung und deinen Selbstwert",
  "wie du Nähe zeigst und was du dir wert bist"
 ],
 "Mars": [
  "deinen Antrieb",
  "wie du in Bewegung kommst und mit Ärger umgehst"
 ],
 "Jupiter": [
  "dein Wachstum",
  "wo du dir etwas zutraust"
 ],
 "Saturn": [
  "deine Struktur",
  "wo du dich verpflichtet fühlst und zurückhältst"
 ],
 "Uranus": [
  "dein Freiheitsbedürfnis",
  "wo du ausbrichst, sobald es eng wird"
 ],
 "Neptun": [
  "deine Sehnsucht",
  "wo du dich verlierst und wo du inspiriert bist"
 ],
 "Pluto": [
  "deine Tiefe",
  "wo es dir ernst wird und wo du nicht loslässt"
 ],
 "ASC": [
  "dein Auftreten",
  "wie du wirkst, bevor du etwas sagst"
 ],
 "MC": [
  "deine Rolle nach außen",
  "wofür du öffentlich stehst"
 ]
};

var MT_PRAX = {
 "Sonne": [
  "Du willst dich neu zeigen — sichtbarer, klarer, mehr nach dir. Das kostet Energie und gibt auch welche zurück.",
  "Etwas an deinem Selbstbild stimmt nicht mehr. Eine Rolle fällt weg, und du merkst es daran, dass du sie nicht mehr aushältst."
 ],
 "Mond": [
  "Ein neues Bedürfnis meldet sich, oft zuerst körperlich. Du brauchst etwas anderes als bisher und weißt noch nicht genau was.",
  "Ein Gefühl, das lange unter der Oberfläche lief, kommt hoch — meistens stärker, als der Anlass hergibt. Das ist der Sinn der Sache."
 ],
 "Merkur": [
  "Ein Gespräch, ein Kurs, eine Idee fängt an. Du willst etwas verstehen oder aussprechen, das ansteht.",
  "Etwas wird ausgesprochen oder endlich verstanden. Danach kann man nicht mehr so tun, als wüsste man es nicht."
 ],
 "Venus": [
  "Etwas Neues in Zuneigung, Geschmack oder Wert beginnt. Auch: du bewertest neu, was dir zusteht.",
  "Eine Beziehungs- oder Wertfrage kommt zum Punkt. Entweder es klärt sich oder es endet."
 ],
 "Mars": [
  "Dein Antrieb bekommt eine neue Richtung. Gut zum Anfangen, schlecht zum Abwarten.",
  "Aufgestauter Ärger entlädt sich, oder du merkst, wofür du keine Kraft mehr hast. Beides ist brauchbar."
 ],
 "Jupiter": [
  "Eine Möglichkeit tut sich auf, größer als geplant. Vorsicht, dir zu viel vorzunehmen.",
  "Eine Erwartung erfüllt sich oder platzt. Beides zeigt dir, wie realistisch du gerechnet hast."
 ],
 "Saturn": [
  "Etwas will Struktur bekommen. Der Anfang fühlt sich schwer an — das gehört dazu und ist kein schlechtes Zeichen.",
  "Eine Verpflichtung endet oder wird fällig. Was du zu lange getragen hast, meldet sich jetzt."
 ],
 "Uranus": [
  "Etwas bricht auf, meistens ungeplant. Der Impuls ist echt, die Richtung noch nicht.",
  "Ein Bruch wird sichtbar. Was du längst nicht mehr wolltest, lässt sich nicht länger aushalten."
 ],
 "Neptun": [
  "Eine Sehnsucht wird lauter, ohne klare Form. Nicht mit einem Plan verwechseln.",
  "Ein Bild löst sich auf. Enttäuschend im Wortsinn — und meistens hilfreich."
 ],
 "Pluto": [
  "Etwas beginnt, das tiefer geht als gedacht. Man merkt es erst später am Ausmaß.",
  "Etwas Verstricktes löst sich. Oft mit Erleichterung, aber selten ohne Wucht."
 ],
 "ASC": [
  "Du willst anders auftreten, oft auch äußerlich. Menschen bemerken es vor dir.",
  "Wie du wirkst und wie du dich fühlst passen nicht mehr zusammen. Das wird jetzt sichtbar."
 ],
 "MC": [
  "Ein beruflicher Schritt beginnt. Noch unfertig, aber die Richtung steht.",
  "Eine berufliche Rolle erreicht ihren Höhepunkt oder ihr Ende."
 ]
};

var MT_DTYP = {
 "NM": [
  "Ein Neumond setzt an",
  "Sonne und Mond stehen zusammen, es ist dunkel. Was hier beginnt, bleibt zwei Wochen unsichtbar und zeigt sich erst zum Vollmond."
 ],
 "VM": [
  "Ein Vollmond bringt zum Punkt",
  "Sonne und Mond stehen sich gegenüber, alles liegt im Licht. Was hier kulminiert, war längst unterwegs — es wird nur jetzt sichtbar."
 ],
 "NMe": [
  "Eine Sonnenfinsternis setzt neu an",
  "Ein Reset über rund sechs Monate. Der Mond verdeckt die Sonne: Etwas verschwindet, bevor Neues erscheint — und man sieht es erst rückblickend."
 ],
 "VMe": [
  "Eine Mondfinsternis schließt ab",
  "Ein Abschluss über rund sechs Monate. Die Erde schiebt sich dazwischen: Was ohnehin nicht mehr trug, wird abrupt sichtbar."
 ]
};

var MT_HERR = {
 "0": "Mars",
 "1": "Venus",
 "2": "Merkur",
 "3": "Mond",
 "4": "Sonne",
 "5": "Merkur",
 "6": "Venus",
 "7": "Pluto",
 "8": "Jupiter",
 "9": "Saturn",
 "10": "Uranus",
 "11": "Neptun"
};

var MT_ORB = {
 "Sonne": 4,
 "Mond": 4,
 "ASC": 4,
 "MC": 4,
 "Merkur": 3,
 "Venus": 3,
 "Mars": 3,
 "Jupiter": 2.5,
 "Saturn": 2.5,
 "Uranus": 2,
 "Neptun": 2,
 "Pluto": 2
};

var MT_PHASEN = [
 {
  "a": 0,
  "n": "Neumond",
  "s": "Säen",
  "t": "Der dunkle Punkt des Zyklus. Etwas will beginnen, ist aber noch nicht sichtbar — auch für dich selbst nicht ganz.",
  "tun": "Aufschreiben, was anfangen will. Noch nichts veröffentlichen.",
  "geb": "Du fängst an, ohne Landkarte. Instinktiv, mutig, oft ohne begründen zu können, warum. Rückblickend wirkt dein Weg schlüssig — während du drinsteckst, nicht.",
  "frage": "Was fängst du an, bevor du weißt, wie es geht?"
 },
 {
  "a": 45,
  "n": "Sichel",
  "s": "Wagen",
  "t": "Der erste sichtbare Streifen. Das Vorhaben nimmt Form an und trifft auf den ersten Widerstand — meist die Frage, ob es realistisch ist.",
  "tun": "Dranbleiben, obwohl es wackelt. Nicht alles nochmal überdenken.",
  "geb": "Du kämpfst gegen das Alte an. Es zieht dich vorwärts, und gleichzeitig hält dich Vertrautes fest. Dein Wachstum passiert genau in dieser Spannung.",
  "frage": "Was hält dich fest, obwohl du weiterwillst?"
 },
 {
  "a": 90,
  "n": "Erstes Viertel",
  "s": "Handeln",
  "t": "Halbmond, wachsend. Jetzt braucht es Entscheidungen — nicht mehr überlegen, sondern bauen. Oft der anstrengendste Teil.",
  "tun": "Entscheiden und umsetzen. Krisen hier gehören dazu.",
  "geb": "Du handelst und baust dabei Strukturen um. Widerstand schreckt dich nicht, er aktiviert dich. Geduld ist die Übung.",
  "frage": "Wo baust du gerade um, statt zu warten?"
 },
 {
  "a": 135,
  "n": "Zunehmend gewölbt",
  "s": "Verfeinern",
  "t": "Fast voll. Die Sache steht, ist aber noch nicht rund. Details, Feinschliff, und die Frage, ob es für andere verständlich ist.",
  "tun": "Überarbeiten, testen, jemanden drüberschauen lassen.",
  "geb": "Du willst verstehen, bevor du zeigst. Gründlich, manchmal zu gründlich — irgendwann muss es raus, auch unfertig.",
  "frage": "Was verbesserst du gerade, das eigentlich fertig ist?"
 },
 {
  "a": 180,
  "n": "Vollmond",
  "s": "Ernten",
  "t": "Sonne und Mond stehen sich gegenüber, alles liegt im Licht. Etwas kulminiert und kippt ins Bewusstsein. Emotional oft intensiv.",
  "tun": "Anschauen, was geworden ist. Klären. Nichts Neues beginnen.",
  "geb": "Du erkennst dich über das Gegenüber. Beziehungen sind bei dir der Ort der Erkenntnis — du verstehst dich, indem du dich spiegelst.",
  "frage": "Was zeigt dir gerade jemand über dich selbst?"
 },
 {
  "a": 225,
  "n": "Verbreitend",
  "s": "Teilen",
  "t": "Abnehmend, noch hell. Was du verstanden hast, will weitergegeben werden. Die Phase des Erklärens und Erzählens.",
  "tun": "Weitergeben, veröffentlichen, jemandem beibringen.",
  "geb": "Du bist zum Teilen gebaut. Was du erlebst, wird bei dir automatisch zu etwas, das anderen hilft. Lehren liegt dir, auch ohne Titel.",
  "frage": "Was hast du verstanden, das jemand anders gerade braucht?"
 },
 {
  "a": 270,
  "n": "Letztes Viertel",
  "s": "Prüfen",
  "t": "Halbmond, abnehmend. Eine Sinnkrise im Kleinen: War das richtig? Alte Überzeugungen werden überprüft, manche fallen weg.",
  "tun": "Ehrlich bilanzieren. Was hat nicht funktioniert und warum?",
  "geb": "Du hinterfragst, was andere für gesetzt halten. Das macht dich weitsichtig — und manchmal einsam mit deiner Sicht.",
  "frage": "Welche Überzeugung von dir stimmt vielleicht nicht mehr?"
 },
 {
  "a": 315,
  "n": "Balsamisch",
  "s": "Loslassen",
  "t": "Die letzten dunklen Tage. Kraft sammeln, abschließen, nichts erzwingen. Wer hier durchzieht, startet den nächsten Zyklus leer.",
  "tun": "Ruhen. Aufräumen. Absagen. Schlafen.",
  "geb": "Du spürst Enden, bevor andere sie sehen, und brauchst mehr Rückzug als die meisten. Abschließen ist bei dir eine Begabung.",
  "frage": "Wovon verabschiedest du dich gerade, ohne es zu benennen?"
 }
];

