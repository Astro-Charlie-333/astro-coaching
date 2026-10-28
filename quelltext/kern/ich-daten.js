/* Astro-Charlie · Ich — Tafeln */

var I_SIGNS=['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion',
 'Schütze','Steinbock','Wassermann','Fische'];
var I_HERR=['Mars','Venus','Merkur','Mond','Sonne','Merkur','Venus','Mars',
 'Jupiter','Saturn','Saturn','Jupiter'];
var I_MIT={Skorpion:'Pluto',Wassermann:'Uranus',Fische:'Neptun'};

/* Die zwölf Häuser: Kurzname fürs Raster, dann der Satz, der erklärt,
   worum es wirklich geht, und die Frage, die das Haus aufmacht. */
var I_HAUS=[
 {k:'Wie du reinkommst', t:'Wie du ankommst, bevor du etwas sagst — Körper, Tempo, erster Eindruck. Nicht wer du bist, sondern was ankommt.',
  f:'Wofür hält man mich, bevor man mich kennt?'},
 {k:'Geld — und was du dir wert bist', t:'Was dir gehört und was du dir zugestehst. Geld steht hier, aber darunter liegt die Frage, was du dir wert bist.',
  f:'Was traue ich mich zu verlangen?'},
 {k:'Reden, lernen, Geschwister', t:'Reden, lernen, kurze Wege, Geschwister, Nachbarschaft. Das Alltägliche, das man nicht plant.',
  f:'Wie denke ich, wenn niemand zuhört?'},
 {k:'Zuhause und wo du herkommst', t:'Wo du herkommst und wo du landest. Familie, Wohnung, der Boden unter allem.',
  f:'Was hieß bei uns zu Hause „normal"?'},
 {k:'Verliebtsein, Spielen, Machen', t:'Was du aus Freude machst — Kunst, Spiel, Kinder, Verliebtsein. Ohne Zweck.',
  f:'Was mache ich, wenn es niemandem nützt?'},
 {k:'Dein Alltag und dein Körper', t:'Das Tägliche: Arbeit, Pflege, Routinen, Gesundheit. Das Unspektakuläre, das alles trägt.',
  f:'Woran scheitert bei mir der Montag?'},
 {k:'Das verbindliche Gegenüber', t:'Das Gegenüber — in Liebe, in Verträgen, auch in offener Gegnerschaft. Wer dir aus Augenhöhe begegnet.',
  f:'Welchen Menschentyp ziehe ich wiederholt an?'},
 {k:'Tiefe und geteiltes Geld', t:'Was zwei Menschen teilen und was keiner allein lösen kann. Geld von anderen, Verlust, Übergänge, Sexualität.',
  f:'Worüber rede ich mit niemandem?'},
 {k:'Was du glaubst, wie weit du gehst', t:'Glaube, Lehre, Ferne. Wonach du dich ausrichtest, wenn der Alltag nicht reicht.',
  f:'Woran glaube ich, ohne es beweisen zu können?'},
 {k:'Wohin du öffentlich gehst', t:'Wofür man dich kennt. Nicht der Job, sondern das, was dein Name bedeutet.',
  f:'Wofür will ich bekannt sein?'},
 {k:'Deine Leute und worauf du hoffst', t:'Freundeskreis, Netzwerk, worauf du mit anderen zugehst. Das Haus der Hoffnung.',
  f:'Mit wem will ich in zehn Jahren noch zu tun haben?'},
 {k:'Was du mit dir allein ausmachst', t:'Was ohne Zeugen passiert. Schlaf, Rückzug, das Unbewusste, die eigenen blinden Flecken.',
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
   Diese Rollen sind der Baustein, aus dem die Sätze über zwei
   Anlagen entstehen, die sich begegnen. Kein Fachwort darin,
   deshalb tragen sie auch auf Wissensstufe 0.

   Mandy am 28.10.: „Zwei Dinge in dir arbeiten gegeneinander:
   worauf du hinauswillst und wo dir die Umrisse verschwimmen. —
   was soll ein satz bitte bedeuten."

   Nichts. Die Rollen waren Ortsangaben — „wo dir die Umrisse
   verschwimmen" benennt nichts, was man sich vorstellen kann.
   Zwei davon aneinandergeklebt ergeben einen Satz, der auf jeden
   Menschen passt und deshalb über keinen etwas sagt.

   Jede Rolle hat jetzt zwei Teile:

     will   — was diese Anlage will, als Handlung, die man sich
              vorstellen kann. Steht nach einem Doppelpunkt.
     zuweit — was passiert, wenn man ihr zu weit folgt. Ein
              Hauptsatz mit „du" darin: eine Folge, kein Zustand.

   Daraus baut der Winkelsatz nicht zwei Zustände, sondern das,
   was dabei herauskommt. REGELN.md Abschnitt 7 hält die Regel
   fest, bau-ich.py prüft sie. */
var I_ROLLE={
 Sonne:  {will:'etwas hinstellen, das am Ende nach dir aussieht',
          zuweit:'ziehst du es allein durch und merkst zu spät, dass es keiner von dir verlangt hat'},
 Mond:   {will:'dich sicher fühlen, bevor du weitergehst',
          zuweit:'bleibst du, wo es bequem ist, und nennst das eine Entscheidung'},
 Merkur: {will:'es einmal durchsprechen, bevor es gilt',
          zuweit:'redest du eine Sache so lange klein, dass niemand mehr anfangen mag'},
 Venus:  {will:'es angenehm halten zwischen dir und den anderen',
          zuweit:'sagst du Ja zu etwas, das du nicht wolltest, und bist hinterher verstimmt'},
 Mars:   {will:'anfangen, bevor alles geklärt ist',
          zuweit:'fängst du drei Dinge an und bringst keins zu Ende'},
 Jupiter:{will:'mehr vorhaben, als gerade hineinpasst',
          zuweit:'sagst du etwas zu, für das du den Kalender noch nicht angesehen hattest'},
 Saturn: {will:'erst nachweisen können, dass du es kannst',
          zuweit:'wartest du auf eine Erlaubnis, die dir niemand erteilen wird'},
 Uranus: {will:'es nicht so machen, wie man es macht',
          zuweit:'wirfst du etwas hin, das gerade erst angefangen hatte zu laufen'},
 Neptun: {will:'es offen lassen, statt dich festzulegen',
          zuweit:'hältst du eine Möglichkeit so lange offen, dass nichts davon stattfindet'},
 Pluto:  {will:'ganz hineingehen oder gar nicht',
          zuweit:'machst du eine Lebensfrage aus etwas, das in einer Woche vorbei gewesen wäre'},
 Chiron: {will:'nicht noch einmal an dieselbe Stelle gefasst werden',
          zuweit:'weichst du einem Gespräch aus, das in zehn Minuten erledigt wäre'},
 Lilith: {will:'nicht wieder die Seite sein, die zurücksteckt',
          zuweit:'machst du eine Grundsatzfrage aus einer Kleinigkeit'}};

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
 winkelHart:'Zwei Dinge in dir ziehen auseinander. Das eine: {a}. Das andere: {b}. Beides auf einmal geht nicht, also kippt es abwechselnd. Mal {az}. Mal {bz}. Das ist kein Fehler, sondern die Stelle, an der du mehr geübt hast als Menschen ohne sie.',
 winkelWeich:'Zwei Dinge in dir ziehen in dieselbe Richtung. Das eine: {a}. Das andere: {b}. Dafür musst du nichts tun, und deshalb fällt es dir nicht auf: du rechnest es dir nicht an und setzt es selten dort ein, wo es dir etwas brächte.',
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

/* ── Der Satz, mit dem die Seite anfängt ──────────────────────
   Bis zum 27.10. begann die Seite mit dem Chartrad: Maschinenraum
   vor Inhalt, genau der Fehler, den REGELN.md Abschnitt 2
   ausschließt. Jetzt führt der Kopf mit einem Satz über diesen
   einen Menschen.

   Genommen wird der seltenste Befund — derselbe, der unten in
   „Was an dir auffällt" oben steht, aber kürzer gefasst, damit er
   im ersten Bildschirm ganz zu lesen ist. Kein Fachwort, kein
   Gradzeichen: Das steht hier auf Stufe 0.

   Ein Befund ohne Form hier führt nicht: 'rueckWenig' ist der
   Normalfall und sagt über diesen Menschen nichts, also rutscht
   der nächste Befund nach vorn. */
var I_KOPF={
 spViel:'Bei dir sammelt sich auffällig viel an einer einzigen Stelle deines Lebens: {bereich}. Dieser Bereich bekommt Gewicht, ob du ihn willst oder nicht.',
 spZwei:'Am dichtesten ist es bei dir an einer Stelle: {bereich}. Etwas mehr Gewicht als der Rest, aber kein Übergewicht.',
 spEins:'Bei dir verteilt sich alles gleichmäßig: Kein Lebensbereich zieht dich stärker als die anderen. Die Reihenfolge musst du dir selbst geben.',
 kette:'Wie du auf andere wirkst, entscheidet sich bei dir nicht bei dir selbst, sondern in einem anderen Bereich: {nach}.',
 ketteEigen:'Wie du auf andere wirkst, entscheidet sich bei dir an derselben Stelle, an der es entsteht. Der erste Eindruck stimmt bei dir öfter als bei anderen.',
 winkelHart:'Zwei Dinge wollen bei dir Verschiedenes: {a} — und {b}. Weil beides zusammen nicht geht, {az}.',
 winkelWeich:'Zwei Dinge ziehen bei dir in dieselbe Richtung: {a} — und {b}. Das läuft von allein, deshalb rechnest du es dir nicht an.',
 rueckViel:'Vieles in dir läuft erst nach innen, bevor es nach außen geht. Du wirkst dabei langsamer, als du bist.',
 rueckKeine:'Bei dir geht fast alles direkt nach außen. Der Umweg nach innen ist bei dir keine eingebaute Gewohnheit, sondern etwas, das du dir nehmen musst.',
 ohne:'Dein Bild hat keine einzelne Stelle, die stark aus dem Rahmen fällt. Was bei dir auffällt, liegt in der Mischung.',
 nach:'Das ist die auffälligste von vier Stellen. Alle vier stehen gleich darunter, jede mit einem Handgriff dazu.'};

/* ── Die drei Stellen, die den Grundton setzen ────────────────
   Bis zum 27.10. stand hier Zeichen und Gradzahl zuerst und die
   Alltagsbedeutung darunter. Jetzt umgekehrt: erst, worum es im
   Leben geht, dann der Lebensbereich — und die Mechanik wartet. */
var I_DREI_TITEL='Was dich trägt';
var I_DREI_SUB='Drei Stellen, die bei jedem Menschen den Grundton setzen. Bei dir liegen sie in diesen Bereichen.';
var I_DREI=[
 {rolle:'Antrieb',   k:'Sonne', was:'Worauf du hinauswillst'},
 {rolle:'Bedürfnis', k:'Mond',  was:'Was dich beruhigt, wenn es eng wird'},
 {rolle:'Wirkung',   k:'ASC',   was:'Wie du ankommst, bevor du etwas sagst'}
];
var I_DREI_BEREICH='Liegt bei dir im Bereich: {bereich}';
var I_DREI_WIRKUNG='Entscheidet sich bei dir im Bereich: {bereich}';

/* Die Überschrift über den Sprungmarken. Die Marken selbst
   entstehen aus den Abschnitten der Seite, nicht aus einer
   zweiten Liste — eine zweite Liste läuft auseinander. */
var I_SPRUNG_TITEL='Auf dieser Seite';

/* Was in dir zusammenhängt. Bis zum 27.10. stand auf jeder Karte
   nur die Formel: Der Satz dazu wurde geholt und unter einem
   Namen gesucht, den es in aspekte-daten.js nie gab, also fiel er
   jedes Mal weg. Jetzt steht er da, und die Formel wartet.
   Gezeigt werden nur Verbindungen, zu denen es einen Satz gibt —
   eine leere Karte sagt nichts, und eine Karte, die nur aus
   Fachsprache besteht, ist auf Stufe 0 unsichtbar und hinterlässt
   ein Loch. Wie viele es insgesamt sind, steht daneben: eine
   Auswahl, die sich nicht als Ganzes ausgibt. */
var I_ASP_SUB='Die {zahl} engsten Verbindungen in deinem Bild, die engste zuerst. Rot fordert, grün fließt — keins von beidem ist gut oder schlecht.';
var I_ASP_TECH='Gerechnet sind {gesamt} Aspekte. Hier stehen die {zahl} engsten zwischen zwei Planeten; Aspekte auf Aszendent und MC stehen auf der Achsenseite.';

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
  {s:'index.html', t:'Jetzt', w:'Was diese Stunde, diese Woche und diesen Monat läuft.'},
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
