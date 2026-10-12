/* Astro-Charlie · Ich — Tafeln */

var I_SIGNS=['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion',
 'Schütze','Steinbock','Wassermann','Fische'];
var I_HERR=['Mars','Venus','Merkur','Mond','Sonne','Merkur','Venus','Mars',
 'Jupiter','Saturn','Saturn','Jupiter'];
var I_MIT={Skorpion:'Pluto',Wassermann:'Uranus',Fische:'Neptun'};

/* Die zwölf Häuser: Kurzname fürs Raster, dann der Satz, der erklärt,
   worum es wirklich geht, und die Frage, die das Haus aufmacht. */
var I_HAUS=[
 {k:'Person und Auftreten', t:'Wie du ankommst, bevor du etwas sagst — Körper, Tempo, erster Eindruck. Nicht wer du bist, sondern was ankommt.',
  f:'Wofür hält man mich, bevor man mich kennt?'},
 {k:'Wert und Besitz', t:'Was dir gehört und was du dir zugestehst. Geld steht hier, aber darunter liegt die Frage, was du dir wert bist.',
  f:'Was traue ich mich zu verlangen?'},
 {k:'Sprache und Nahbereich', t:'Reden, lernen, kurze Wege, Geschwister, Nachbarschaft. Das Alltägliche, das man nicht plant.',
  f:'Wie denke ich, wenn niemand zuhört?'},
 {k:'Zuhause und Herkunft', t:'Wo du herkommst und wo du landest. Familie, Wohnung, der Boden unter allem.',
  f:'Was hieß bei uns zu Hause „normal"?'},
 {k:'Ausdruck und Lust', t:'Was du aus Freude machst — Kunst, Spiel, Kinder, Verliebtsein. Ohne Zweck.',
  f:'Was mache ich, wenn es niemandem nützt?'},
 {k:'Alltag und Körper', t:'Das Tägliche: Arbeit, Pflege, Routinen, Gesundheit. Das Unspektakuläre, das alles trägt.',
  f:'Woran scheitert bei mir der Montag?'},
 {k:'Partnerschaft', t:'Das Gegenüber — in Liebe, in Verträgen, auch in offener Gegnerschaft. Wer dir aus Augenhöhe begegnet.',
  f:'Welchen Menschentyp ziehe ich wiederholt an?'},
 {k:'Tiefe und Geteiltes', t:'Was zwei Menschen teilen und was keiner allein lösen kann. Geld von anderen, Verlust, Übergänge, Sexualität.',
  f:'Worüber rede ich mit niemandem?'},
 {k:'Sinn und Weite', t:'Glaube, Lehre, Ferne. Wonach du dich ausrichtest, wenn der Alltag nicht reicht.',
  f:'Woran glaube ich, ohne es beweisen zu können?'},
 {k:'Beruf und Sichtbarkeit', t:'Wofür man dich kennt. Nicht der Job, sondern das, was dein Name bedeutet.',
  f:'Wofür will ich bekannt sein?'},
 {k:'Gruppen und Ziele', t:'Freundeskreis, Netzwerk, worauf du mit anderen zugehst. Das Haus der Hoffnung.',
  f:'Mit wem will ich in zehn Jahren noch zu tun haben?'},
 {k:'Rückzug und Inneres', t:'Was ohne Zeugen passiert. Schlaf, Rückzug, das Unbewusste, die eigenen blinden Flecken.',
  f:'Was kostet mich Kraft, ohne dass ich es merke?'}
];

/* Was ein Planet in einem Haus praktisch bedeutet — knapp, verhaltensnah */
var I_PLANET={
 Sonne:'richtet dein Leben auf diesen Bereich aus. Hier willst du gesehen werden, hier entscheidet sich, ob es rund läuft.',
 Mond:'macht diesen Bereich zur Sicherheitsfrage. Wenn es hier wackelt, greift nichts anderes.',
 Merkur:'lässt dich hier denken und reden. Der Bereich, über den du dich sortierst.',
 Venus:'macht diesen Bereich angenehm und wichtig. Hier suchst du Schönheit und Einvernehmen.',
 Mars:'setzt hier Kraft ein. Der Bereich, in dem du anfängst, kämpfst und dich verausgabst.',
 Jupiter:'weitet diesen Bereich. Hier kommt dir leicht etwas zu — und hier übernimmst du dich.',
 Saturn:'macht diesen Bereich zur Prüfung. Hier arbeitest du gründlich und hast nie das Gefühl, dass es reicht.',
 Uranus:'bringt Unruhe und Eigensinn. Hier hältst du dich an keine Vorgabe, auch nicht an deine eigene.',
 Neptun:'macht diesen Bereich durchlässig. Hier siehst du mehr und zugleich unschärfer als anderswo.',
 Pluto:'legt Gewicht auf diesen Bereich. Hier geht nichts halb, und hier verändert sich im Leben am meisten.',
 Chiron:'macht diesen Bereich empfindlich. Hier treffen Kleinigkeiten unverhältnismäßig — und hier kannst du andere verstehen.',
 Lilith:'markiert, was hier keinen Platz bekommen hat. Der Bereich, in dem du dich am ehesten verbiegst.'};

/* Der Herrscher: wohin das Haus seine Fäden schickt */
var I_KETTE='Was in diesem Haus passiert, läuft über {h} — und {hs} steht im {n}. Haus. '+
 'Praktisch heißt das: Dieses Thema wird dort entschieden.';

/* Index: alles, was es auf dieser Plattform gibt, mit einem Satz dazu.
   Die Bauprüfung schlägt an, wenn eine Seite fehlt — so kann der Index
   nicht wieder veralten. */
var I_INDEX=[
 {g:'Dein Chart', e:[
  {s:'chart-rechner.html', t:'Chart-Rechner', w:'Jedes Datum durchrechnen, auch ohne Profil.'},
  {s:'bausteine.html', t:'Die Bausteine', w:'Planeten, Zeichen, Häuser auf einer Seite, mit Rad zum Antippen.'},
  {s:'grade.html', t:'Deine Grade', w:'Jede Stellung auf die Bogenminute, mit Würden.'},
  {s:'aspekt-muster.html', t:'Aspektmuster', w:'Großes Dreieck, T-Quadrat und was sonst in deinem Chart steckt.'},
  {s:'achsen.html', t:'Deine Achsen', w:'AC, MC und die Knotenachse — die Linien, an denen alles hängt.'},
  {s:'element-mix.html', t:'Element-Mix', w:'Was dir reichlich zur Verfügung steht und was du dir holen musst.'},
  {s:'kleine-punkte.html', t:'Chiron und Lilith', w:'Die wunde Stelle und das Unerlaubte.'},
  {s:'asteroiden.html', t:'Asteroiden', w:'Ceres, Pallas, Juno und Vesta — vier Kleinkörper mit Deutungstradition.'},
  {s:'sekte.html', t:'Tag oder Nacht', w:'Die älteste Unterscheidung der Astrologie, und eine der nützlichsten.'},
  {s:'retrograde.html', t:'Rückläufig', w:'Was es heißt, wenn ein Planet bei deiner Geburt rückwärts lief.'},
  {s:'profil-ansicht.html', t:'Profil-Ansicht', w:'Dasselbe Bild für jede andere Person deiner Liste.'},
  {s:'bazi.html', t:'Andere Linsen', w:'Vier Säulen, Human Design und was sie anders sehen.'},
  {s:'haeusersysteme.html', t:'Häusersysteme', w:'Whole Sign oder Placidus — was sich ändert und was nicht.'},
  {s:'siderisch.html', t:'Siderisch', w:'Dein Chart tropisch und vedisch nebeneinander.'},
  {s:'ophiuchus.html', t:'Ophiuchus', w:'Das dreizehnte Zeichen, durchgerechnet — in vier Systemen.', neu:1}]},
 {g:'Was gerade läuft', e:[
  {s:'index.html', t:'Heute', w:'Was diese Stunde, diese Woche und diesen Monat läuft.'},
  {s:'solar-return-light.html', t:'Dein Jahr', w:'Das Solar — was die nächsten zwölf Monate ansagen.'},
  {s:'solar-return-vertiefung.html', t:'Solar vertieft', w:'Dasselbe Jahr genauer, mit Herrschern und Achsen.'},
  {s:'profektionen.html', t:'Profektionen', w:'Welches Haus dieses Lebensjahr regiert.'},
  {s:'planetenzyklen.html', t:'Planetenzyklen', w:'Saturn, Jupiter, Uranus und ihre Wiederkehr.'},
  {s:'lunationen.html', t:'Lunationen', w:'Neumonde, Vollmonde und Finsternisse.'},
  {s:'zeitqualitaet.html', t:'Zeitqualität', w:'Was gerade leichtfällt und was nicht.'},
  {s:'vorschau.html', t:'Woche und Monat', w:'Sieben Tage im Blick und die Höhepunkte des Monats.'}]},
 {g:'Praxis', e:[
  {s:'geistfuehrung.html', t:'Mit wem du arbeitest', w:'Wie spirituelle Praxis zu deinem Chart passt — Tür, Kanal, Rhythmus.', neu:1},
  {s:'rituale.html', t:'Rituale', w:'Was man zu Neumond, Vollmond und den großen Transiten tut.'},
  {s:'zauber.html', t:'Zimt, Rosen, Steine', w:'Planetenstunden für deinen Ort, Zutaten und Steine nach Planet.'},
  {s:'ankommen.html', t:'Ankommen', w:'Vier Fragen, damit sich die Seite nach dir richtet.'},
  {s:'erinnerung.html', t:'Erinnerung', w:'Was du dir über dich notiert hast.'},
  {s:'methoden.html', t:'Methoden für den Moment', w:'Sieben Werkzeuge für Tage, an denen wenig geht.'},
  {s:'nd-leitfaden.html', t:'Anders verdrahtet leben', w:'Das Leben nach der eigenen Bauweise einrichten, nicht gegen sie.'},
  {s:'faden.html', t:'Der rote Faden', w:'Welches Thema zuerst, welches später — und warum in dieser Reihenfolge.'},
  {s:'weg.html', t:'Ein Schritt nach dem anderen', w:'Fünf Stufen, jede für sich abgeschlossen.'}]},
 {g:'Menschen', e:[
  {s:'profile.html', t:'Profile', w:'Alle Charts, die du angelegt hast.'},
  {s:'dossier.html', t:'Dossier', w:'Ein Bericht pro Person — und zwar für dein Verhältnis zu ihr.', neu:1},
  {s:'beziehung.html', t:'Beziehung', w:'Zwei Charts nebeneinander, nach Beziehungsart ausgewertet.', neu:1},
  {s:'synastrie.html', t:'Synastrie', w:'Die klassische Paarauswertung.'},
  {s:'synastrie-vertiefung.html', t:'Synastrie vertieft', w:'Häuserüberlagerung und Komposit.'},
  {s:'dating-muster.html', t:'Dating-Muster', w:'Was sich bei dir wiederholt und woran es kippt.'}]},
 {g:'Für deine Arbeit', e:[
  {s:'reading.html', t:'Reading', w:'Dein Chart als Text — in fünf Wissensständen.', neu:1},
  {s:'coaching.html', t:'Coaching', w:'Wie eine Stunde aufgebaut ist.'},
  {s:'klientinnen-fragen.html', t:'Klientinnenfragen', w:'Was oft gefragt wird und was du antworten kannst.'},
  {s:'haltung-ethik.html', t:'Haltung und Ethik', w:'Die Linien, hinter die du nicht gehst.'},
  {s:'angebote-struktur.html', t:'Dein Angebot', w:'Wie du es zuschneidest und was es kostet.'},
  {s:'briefing.html', t:'Briefing', w:'Was du vor einer Stunde parat haben willst.'},
  {s:'monatsbericht.html', t:'Monatsbericht', w:'Ein fertiger Text pro Person und Monat, in deiner Sprache.'},
  {s:'berufe.html', t:'Berufe im Chart', w:'Welche Felder zu welchen Stellungen passen.'},
  {s:'wissen.html', t:'Alle Seiten', w:'Das vollständige Regal — 119 Seiten.'}]}
];
