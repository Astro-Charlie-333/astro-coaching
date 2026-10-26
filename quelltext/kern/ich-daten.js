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

/* ── Was eine Anlage antreibt ─────────────────────────────────
   Nicht der Planetenname, sondern das, was er im Leben macht.
   Diese Rollen sind der Baustein, aus dem die Sätze über diesen
   einen Menschen entstehen — in ihnen kommt kein Fachwort vor,
   deshalb tragen sie auch auf Wissensstufe 0. */
var I_ROLLE={
 Sonne:'worauf du hinauswillst',
 Mond:'was dich beruhigt',
 Merkur:'wie du denkst und redest',
 Venus:'was du schön findest und wem du nachgibst',
 Mars:'womit du anfängst und wofür du kämpfst',
 Jupiter:'wo du dir viel zutraust',
 Saturn:'wo du streng mit dir bist',
 Uranus:'wo du aus der Reihe tanzt',
 Neptun:'wo dir die Umrisse verschwimmen',
 Pluto:'wo es bei dir um alles oder nichts geht',
 Chiron:'wo Kleinigkeiten dich unverhältnismäßig treffen',
 Lilith:'was bei dir nie einen Platz bekommen hat'};

/* ── Was an dir auffällt ──────────────────────────────────────
   Die Sätze für die Befunde aus ich-rechner.js. Jeder benennt
   eine Stelle, die bei diesem Menschen anders liegt als bei den
   meisten — und sagt dazu, wie häufig das überhaupt ist.

   Was hier nicht steht: Schmeichelei und Dringlichkeit. Beides
   wäre der billige Weg, eine Seite packend zu machen, und beides
   schließt PRODUKT.md Abschnitt 5 aus. Spannend wird das hier
   durch Genauigkeit über diesen einen Menschen — ein Satz, der
   auf die Nachbarin nicht passt, ist von selbst interessant. */
var I_AUF={
 titel:'Was an dir auffällt',
 vor:'Vier Stellen, an denen dein Bild von den meisten abweicht. Zu jeder steht, wie häufig sie überhaupt vorkommt — abgezählt an {n} erfundenen Geburtsbildern, nicht geschätzt.',
 haeufigForm:'Das haben etwa {p} von 100 Menschen.',
 haeufigSelten:'Das haben weniger als 1 von 100 Menschen.',
 haeufigOhne:'Wie häufig das ist, lässt sich nicht sinnvoll abzählen: es liegt bei jedem Menschen woanders.',

 /* Der Schwerpunkt — das vollste Feld */
 spViel:'Bei dir sammelt sich ungewöhnlich viel an einer einzigen Stelle: {bereich}. {zahl} von zehn Anlagen liegen dort. Dieser Bereich bekommt bei dir Gewicht, ob du ihn willst oder nicht, und er zieht Kraft aus den anderen ab.',
 spZwei:'Am dichtesten ist es bei dir an einer Stelle: {bereich}. Dort liegen {zahl} deiner zehn Anlagen — genug, dass dieser Bereich etwas mehr Gewicht hat als der Rest, aber kein Übergewicht.',
 spEins:'Bei dir verteilt sich alles: In keinem Lebensbereich liegt mehr als eine Anlage. Das heißt, kein Bereich zieht dich stärker als die anderen — du verteilst deine Kraft, statt sie zu bündeln, und musst selbst entscheiden, wohin sie geht.',
 spTun:'Nicht gegen den Schwerpunkt arbeiten. Was dort liegt, passiert ohnehin — die Frage ist nur, ob absichtlich.',
 spTunEins:'Dir die Reihenfolge selbst geben. Wo nichts von allein zieht, entscheidet, was du zuerst anfasst.',
 spLeer:'{zahl} von zwölf Bereichen sind bei dir unbesetzt. Das ist normal — es gibt zehn Anlagen und zwölf Bereiche. Unbesetzt heißt nicht, dass der Bereich fehlt, sondern dass du ihn selbst füllst.',

 /* Die Kette — wo sich der erste Eindruck entscheidet */
 kette:'Wie du ankommst, bevor du etwas sagst, entscheidet sich bei dir nicht bei dir selbst, sondern in einem anderen Bereich: {nach}. Was dort los ist, sieht man dir an — auch wenn das Gespräch gar nicht davon handelt.',
 ketteEigen:'Wie du ankommst, entscheidet sich bei dir an derselben Stelle, an der es entsteht. Das ist selten, und es heißt: Was man an dir sieht, ist nicht von woanders geliehen. Der erste Eindruck stimmt bei dir öfter als bei anderen.',
 ketteTun:'Bei einem ersten Eindruck, der nicht ankommt, nicht am Auftreten schrauben, sondern dort nachsehen, wo es herkommt.',
 ketteTunEigen:'Dem ersten Eindruck trauen, auch dem, den du bei anderen hast.',

 /* Der engste Winkel — zwei Anlagen, die sich begegnen */
 winkelHart:'Zwei Dinge in dir arbeiten gegeneinander: {a} und {b}. Das ist kein Fehler, sondern eine Reibung, die nicht aufhört — und die Stelle, an der du mehr geübt hast als Menschen ohne sie.',
 winkelWeich:'Zwei Dinge in dir arbeiten zusammen, ohne dass du etwas dafür tust: {a} und {b}. Das geht so glatt, dass du es leicht übersiehst und selten dafür Anerkennung bekommst.',
 winkelEng:'Bei dieser Stelle steht der Winkel fast auf den Grad genau. Je genauer er ist, desto deutlicher zeigt er sich in der Rechnung — was das in deinem Leben heißt, musst du selbst prüfen.',
 winkelHartTun:'Nicht entscheiden, welche Seite recht hat. Beiden abwechselnd den Vortritt lassen.',
 winkelWeichTun:'Das, was ohne Anstrengung geht, bewusst für etwas einsetzen, das Anstrengung kostet.',

 /* Rückläufige Anlagen bei der Geburt */
 rueckViel:'{zahl} deiner Anlagen liefen bei deiner Geburt rückwärts. Praktisch heißt das: Du arbeitest Dinge eher nach innen durch, bevor sie nach außen gehen — und wirkst dabei langsamer, als du bist.',
 rueckWenig:'{zahl} deiner Anlagen liefen bei deiner Geburt rückwärts. Das ist der Normalfall; auffällig wäre erst keine oder mehr als vier.',
 rueckKeine:'Keine einzige deiner Anlagen lief bei deiner Geburt rückwärts. Das ist ungewöhnlich und heißt: Bei dir geht fast alles direkt nach außen. Der Umweg nach innen ist bei dir keine eingebaute Gewohnheit, sondern etwas, das du dir nehmen musst.',
 rueckTunViel:'Dir die Zeit nach innen zugestehen, statt sie für Trödeln zu halten.',
 rueckTunKeine:'Vor der Antwort absichtlich eine Nacht verstreichen lassen. Was bei anderen von allein passiert, musst du einplanen.',

 /* Der ehrliche Teil, der zu jeder rechnenden Ausgabe gehört */
 grenzeTitel:'Was das taugt — und was nicht',
 grenzen:[
  'Die Häufigkeiten sind gerechnet, die Bedeutung nicht. Abgezählt ist, wie oft eine Stellung vorkommt — dass daraus ein bestimmter Zug folgt, ist Deutung und nicht überprüft.',
  'Selten heißt nicht wichtig. Eine seltene Stellung fällt in der Rechnung auf; ob sie in deinem Leben auffällt, weißt nur du.',
  'Hier steht nichts über deine Zukunft und nichts über deinen Wert. Es steht da, wo dein Bild von den meisten abweicht, und was man damit anfangen kann.',
  'Erkennst du dich nicht wieder, hat dein Erleben Vorrang. Die Rechnung kennt die Uhr deiner Geburt, nicht dein Leben.'
 ],
 tunVor:'Ein Handgriff dazu:'};

/* ── Der Satz über diesen Menschen ────────────────────────────
   Der Kopf der Seite führt nicht mit dem Rad, sondern mit drei
   Sätzen darüber, was bei diesem Menschen los ist. Drei Tafeln
   mit je zwölf Einträgen: Antrieb, Bedürfnis, Wirkung. Zwölf
   mal zwölf mal zwölf Möglichkeiten — ein Satz, der auf die
   Nachbarin nicht passt.

   In keinem Satz steht ein Fachwort, deshalb trägt der Kopf auf
   Wissensstufe 0. Jeder Satz nennt auch den Preis der Sache:
   Schmeichelei schließt PRODUKT.md Abschnitt 5 aus, und ein
   Werkzeug, das einem nach dem Mund redet, hilft beim Verstehen
   nicht. Reihenfolge wie die Zeichen, von vorn. */
var I_KOPF={
 /* Worauf du hinauswillst */
 antrieb:[
  'Du willst vorangehen und selbst anfangen, statt zu warten, bis jemand dich fragt.',
  'Du willst etwas aufbauen, das bleibt, und zwar in deinem Tempo und nicht in fremdem.',
  'Du willst verstehen und weitersagen, und du brauchst mehr als eine Sache gleichzeitig.',
  'Du willst dafür sorgen, dass es den Menschen um dich herum gut geht — und dabei selbst einen Ort haben.',
  'Du willst etwas machen, das dir gehört und das man sieht, nicht etwas Anonymes.',
  'Du willst, dass es wirklich stimmt, und du willst gebraucht werden für etwas Konkretes.',
  'Du willst, dass es zwischen Menschen aufgeht, und du entscheidest ungern allein.',
  'Du willst auf den Grund kommen. Halbe Antworten hältst du nicht lange aus.',
  'Du willst wissen, was weiter draußen liegt, und dich nicht zu früh festlegen.',
  'Du willst etwas zustande bringen, für das du mit deinem Namen einstehen kannst.',
  'Du willst es anders machen als vorgegeben, und zwar so, dass es mehr als dir nützt.',
  'Du willst dich einlassen und mitgehen, statt dich an einer Grenze festzumachen.'],
 /* Was dich beruhigt */
 beduerfnis:[
  'Ruhe findest du in Bewegung. Stillsitzen macht es bei dir schlimmer, nicht besser.',
  'Ruhe findest du in dem, was gleich bleibt: dasselbe Essen, derselbe Weg, vertraute Dinge.',
  'Ruhe findest du, wenn du es aussprechen oder aufschreiben kannst. Ungesagt wird es größer.',
  'Ruhe findest du dort, wo du niemandem etwas erklären musst.',
  'Ruhe findest du, wenn jemand dich wirklich meint — nicht, wenn jemand nur nett ist.',
  'Ruhe findest du, wenn eine Sache fertig ist und an ihrem Platz liegt.',
  'Ruhe findest du, wenn kein Streit offen im Raum steht. Ein ungeklärter Ton hält dich wach.',
  'Ruhe findest du, wenn du weißt, woran du bei jemandem bist. Unklarheit kostet dich mehr als schlechte Nachrichten.',
  'Ruhe findest du, wenn du weg könntest — auch an den Tagen, an denen du bleibst.',
  'Ruhe findest du, wenn du weißt, dass es trägt, auch ohne dich.',
  'Ruhe findest du mit genug Abstand, um von außen auf die Sache zu sehen.',
  'Ruhe findest du, wo gerade nichts von dir verlangt wird: Musik, Wasser, Schlaf.'],
 /* Wie du bei anderen ankommst */
 wirkung:[
  'Bei anderen kommst du direkt an, oft schneller und schärfer als du es gemeint hast.',
  'Bei anderen kommst du ruhig und verlässlich an, manchmal auch als nicht zu bewegen.',
  'Bei anderen kommst du wach und gesprächig an, aber schwer festzuhalten.',
  'Bei anderen kommst du zugewandt und vorsichtig an. Offen bist du erst später.',
  'Bei anderen kommst du deutlich an, auch wenn du nichts dafür tust.',
  'Bei anderen kommst du genau und zurückhaltend an, oft prüfender als du es meinst.',
  'Bei anderen kommst du freundlich und ausgleichend an. Kanten zeigst du selten zuerst.',
  'Bei anderen kommst du dicht und verschlossen an. Man rät bei dir, statt zu wissen.',
  'Bei anderen kommst du offen und unbekümmert an, manchmal eine Nummer zu groß.',
  'Bei anderen kommst du ernst und zuständig an, meist älter als du bist.',
  'Bei anderen kommst du eigen und sachlich an, und bist nicht leicht einzuordnen.',
  'Bei anderen kommst du weich und durchlässig an, mit unscharfen Rändern.'],
 /* Die Zeile unter dem Namen, wenn noch nichts gerechnet ist */
 leer:'Für diesen Satz fehlt die Geburtszeit. Ohne sie lässt sich nicht sagen, wie du bei anderen ankommst.'};

/* Die Sprungmarken oben. Jede nennt ihren Abschnitt in
   Alltagssprache — im ersten Bildschirm steht kein Fachwort.
   Die Kennungen müssen im Körper vorkommen; das prüft bau-ich.py. */
var I_MARKEN=[
 {id:'ab-auffaellt', t:'Was auffällt'},
 {id:'ab-heute',     t:'Heute'},
 {id:'ab-felder',    t:'Zwölf Lebensfelder'},
 {id:'ab-zusammen',  t:'Was zusammenhängt'},
 {id:'ab-bild',      t:'Dein Geburtsbild'},
 {id:'ab-alles',     t:'Alles zu dir'}];

/* Index: alles, was es auf dieser Plattform gibt, mit einem Satz dazu.
   Die Bauprüfung schlägt an, wenn eine Seite fehlt — so kann der Index
   nicht wieder veralten. */
var I_INDEX=[
 {g:'Dein Chart', e:[
  {s:'chart-rechner.html', t:'Chart-Rechner', w:'Jedes Datum durchrechnen, auch ohne Profil.'},
  {s:'bausteine.html', t:'Die Bausteine', w:'Planeten, Zeichen, Häuser auf einer Seite, mit Rad zum Antippen.'},
  {s:'haeuser-karte.html', t:'Häuser, Zeichen, Planeten', w:'Die Übersicht als Bild — Rad, Matrix und der Vergleich zweier Häuser.', neu:1},
  {s:'planeten-in-haeusern.html', t:'Jede Kombination', w:'Planet, Zeichen und Haus einzeln durchspielen — jetzt mit deinen eigenen zehn Stellungen.', neu:1},
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
  {s:'zahlen.html', t:'Deine Zahlen', w:'Lebenszahl, Namenszahlen und was die Hausnummer macht — mit dem, was die Schulen trennt.', neu:1},
  {s:'haeusersysteme.html', t:'Häusersysteme', w:'Whole Sign oder Placidus — was sich ändert und was nicht.'},
  {s:'siderisch.html', t:'Siderisch', w:'Dein Chart tropisch und vedisch nebeneinander.'},
  {s:'ophiuchus.html', t:'Ophiuchus', w:'Das dreizehnte Zeichen, durchgerechnet — in vier Systemen.', neu:1}]},
 {g:'Was gerade läuft', e:[
  {s:'zeiten.html', t:'Wann bei dir was los ist', w:'Dein Leben in Kapitel: laute und leise Jahre für fünf Lebensbereiche, von Grund auf erklärt.', neu:1},
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
  {s:'analyse.html', t:'Die Analyse', w:'Thema wählen, ein oder zwei Charts — Kombinationen, Ergebnis, Ansätze, Bericht.', neu:1},
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
