/* Astro-Charlie · Zahlen — die Texte
   Zwölf Zahlen (1–9 und die drei Meisterzahlen), jede durch acht
   Lebensbereiche hindurch. Dazu die Wohnungs- und Hausnummern und die
   Schulen, die es zu dem Thema gibt.

   Regel für alle Texte hier: nichts Rätselhaftes. Jeder Satz muss sagen,
   was er meint, und zwar so, dass man am Abend etwas davon hat. */

var Z_NUM = [1,2,3,4,5,6,7,8,9,11,22,33];

/* ── Die Zahlen selbst ───────────────────────────────────────
   braucht / zuviel steuern die Wohnungsrechnung weiter unten:
   braucht = was dieser Zahl von außen fehlt,
   zuviel  = wovon sie selbst schon reichlich hat.
   hat / gibt sind die Satzbausteine, aus denen die Wohnungstexte
   zusammengesetzt werden. */
var Z_ZAHL = {
1:{n:'Eins', titel:'Der Anfang', kurz:'anfangen, vorangehen, allein entscheiden',
  wesen:'Die Eins fängt an. Sie braucht keine Erlaubnis und wartet nicht, bis sich jemand mitbewegt — das ist ihre Stärke und gleichzeitig der Grund, warum sie oft allein dasteht.',
  stark:'Entscheidet schnell. Hält eine Richtung auch dann, wenn alle anderen zweifeln. Fängt Dinge an, die sonst niemand anfängt.',
  schatten:'Kann schlecht abgeben und noch schlechter um Hilfe bitten. Verwechselt Widerspruch mit Angriff. Wird einsam, ohne zu merken, dass sie es selbst eingerichtet hat.',
  pInd:'Sonne', pWest:'Sonne', tag:'Sonntag', farbe:'#A2593F',
  hat:'machst Dinge am liebsten selbst und fragst spät', gibt:'lässt dich allein machen und mischt sich nicht ein',
  satt:'Eigenantrieb und Alleingang',
  braucht:[2,6], zuviel:[1,8]},
2:{n:'Zwei', titel:'Die Verbindung', kurz:'anschließen, vermitteln, mitbekommen',
  wesen:'Die Zwei denkt in Paaren. Sie merkt sofort, wie es dem anderen geht, und richtet sich danach — manchmal so weit, dass ihre eigene Meinung erst auftaucht, wenn niemand mehr im Raum ist.',
  stark:'Hört wirklich zu. Stellt zwischen Streitenden eine Verbindung her, die vorher keiner gesehen hat. Hält Zweierbeziehungen über Jahre.',
  schatten:'Entscheidet nicht, solange die Möglichkeit besteht, dass sich jemand ärgert. Sagt ja und meint nein. Wartet darauf, gefragt zu werden.',
  pInd:'Mond', pWest:'Mond', tag:'Montag', farbe:'#887F35',
  hat:'richtest dich stark nach anderen', gibt:'dreht alles um Nähe, Rücksicht und zwei Menschen',
  satt:'Rücksicht und Anpassung',
  braucht:[1,8], zuviel:[2,6,11]},
3:{n:'Drei', titel:'Der Ausdruck', kurz:'sprechen, zeigen, vieles gleichzeitig',
  wesen:'Die Drei muss raus mit dem, was in ihr ist — reden, schreiben, zeigen, bauen. Sie hat mehr Ideen als Tage und fängt deshalb mehr an, als sie zu Ende bringt.',
  stark:'Bringt Dinge in Worte, die andere nur fühlen. Macht Stimmung. Findet zu allem drei Wege.',
  schatten:'Bricht ab, sobald es mühsam wird. Redet über das Problem, statt es anzufassen. Streut sich so weit, dass nichts fertig wird.',
  pInd:'Jupiter', pWest:'Jupiter', tag:'Donnerstag', farbe:'#71A540',
  hat:'fängst viel an und bringst wenig zu Ende', gibt:'macht es leicht, hier zu reden, zu spielen und Leute reinzulassen',
  satt:'Ideen und Anfänge',
  braucht:[4,7], zuviel:[3,5]},
4:{n:'Vier', titel:'Die Struktur', kurz:'ordnen, bauen, dranbleiben',
  wesen:'Die Vier will, dass etwas hält. Sie baut langsam, prüft zweimal und findet Ordnung nicht langweilig, sondern erholsam — bis die Ordnung sie selbst einschnürt.',
  stark:'Bringt zu Ende. Baut Dinge, die auch noch in zehn Jahren stehen. Ist die, auf die man sich verlassen kann.',
  schatten:'Hält an einem Plan fest, der nicht mehr stimmt. Macht aus allem eine Pflicht. Hat kein Konzept für Pause.',
  pInd:'Rahu', pWest:'Uranus', tag:'—', farbe:'#33843F',
  hat:'hast schon genug Pflicht und Plan im Leben', gibt:'verlangt Ordnung und gibt Verlässlichkeit zurück',
  satt:'Pflicht und Plan',
  braucht:[5,3], zuviel:[4,8,22]},
5:{n:'Fünf', titel:'Die Bewegung', kurz:'ausprobieren, wechseln, frei bleiben',
  wesen:'Die Fünf lernt durch Ausprobieren und hält es schwer aus, wenn etwas festgelegt ist, bevor sie es erlebt hat. Sie sammelt Erfahrungen so, wie andere Besitz sammeln.',
  stark:'Kommt mit allem Neuen zurecht. Wechselt schnell die Richtung, ohne zu verzweifeln. Kennt die Welt von mehr Seiten als die meisten.',
  schatten:'Geht, sobald es verbindlich wird. Verwechselt Reiz mit Richtung. Verbrennt sich an fünf Dingen gleichzeitig.',
  pInd:'Merkur', pWest:'Merkur', tag:'Mittwoch', farbe:'#3FA28B',
  hat:'bist ohnehin viel in Bewegung', gibt:'bleibt unruhig: viel Kommen und Gehen, viel Reiz, wenig Festes',
  satt:'Bewegung und Reiz',
  braucht:[4,2], zuviel:[5,3]},
6:{n:'Sechs', titel:'Die Fürsorge', kurz:'sorgen, halten, schön machen',
  wesen:'Die Sechs übernimmt. Sie sieht, was fehlt, und füllt es auf, bevor jemand fragt — bei allen, nur bei sich selbst meistens nicht.',
  stark:'Hält eine Gruppe zusammen. Macht Räume und Beziehungen bewohnbar. Bleibt, wenn es unangenehm wird.',
  schatten:'Sorgt so viel, dass sie Macht darüber bekommt, und merkt es nicht. Wird bitter, weil keiner fragt, wie es ihr geht. Sagt nie, was sie braucht.',
  pInd:'Venus', pWest:'Venus', tag:'Freitag', farbe:'#356788',
  hat:'sorgst ohnehin schon für zu viele Leute', gibt:'zieht Menschen, Verantwortung und Fürsorge an',
  satt:'Fürsorge und Verantwortung',
  braucht:[7,1], zuviel:[6,2,33]},
7:{n:'Sieben', titel:'Der Rückzug', kurz:'verstehen, prüfen, allein sein',
  wesen:'Die Sieben will wissen, wie etwas wirklich funktioniert, und braucht dafür Ruhe. Sie glaubt nichts, weil es alle sagen, und das macht sie gründlich und einsam zugleich.',
  stark:'Sieht, was unter der Oberfläche läuft. Lässt sich nicht beschwatzen. Hält Alleinsein nicht nur aus, sondern braucht es.',
  schatten:'Denkt über das Leben nachher statt mittendrin. Hält Abstand und nennt es Urteilskraft. Misstraut auch dem, was gut gemeint ist.',
  pInd:'Ketu', pWest:'Neptun', tag:'—', farbe:'#4240A5',
  hat:'ziehst dich ohnehin schnell zurück', gibt:'ist still, nach innen gedreht und braucht wenig Publikum',
  satt:'Abstand und Grübeln',
  braucht:[6,3], zuviel:[7,11]},
8:{n:'Acht', titel:'Die Konsequenz', kurz:'leisten, tragen, durchsetzen',
  wesen:'Die Acht denkt in Ergebnissen. Sie will nicht nur verstehen, sondern etwas bewegen — und messen, ob es sich bewegt hat. Material, Geld und Verantwortung sind für sie dasselbe Thema.',
  stark:'Hält Druck. Organisiert Große. Bringt Projekte durch, an denen andere verzweifeln.',
  schatten:'Macht den eigenen Wert an Leistung fest. Fährt über Menschen, wenn es eng wird. Hört erst auf, wenn der Körper aufhört.',
  pInd:'Saturn', pWest:'Saturn', tag:'Samstag', farbe:'#673384',
  hat:'arbeitest ohnehin mehr, als gut ist', gibt:'ist auf Leistung und Status gebaut und fordert beides ein',
  satt:'Leistung und Druck',
  braucht:[9,2], zuviel:[8,1,4]},
9:{n:'Neun', titel:'Der Abschluss', kurz:'loslassen, weiten, abschließen',
  wesen:'Die Neun ist die letzte Ziffer: bei ihr geht es ums Beenden und ums Größere. Sie nimmt viel mit — fremdes Leid eingeschlossen — und weiß oft nicht, wo sie aufhört und der andere anfängt.',
  stark:'Lässt los, wenn es Zeit ist. Denkt über den eigenen Zaun hinaus. Tröstet, ohne zu bewerten.',
  schatten:'Hängt an Abgeschlossenem. Hilft, um nicht bei sich hinzusehen. Hat keine Grenze und wundert sich über die Erschöpfung.',
  pInd:'Mars', pWest:'Mars', tag:'Dienstag', farbe:'#9E3D84',
  hat:'nimmst fremde Lasten mit, als wären sie deine', gibt:'ist offen, weit und wenig abgegrenzt — es geht hier immer um mehr als dich',
  satt:'fremde Lasten und Weite',
  braucht:[1,4], zuviel:[9,7]},
11:{n:'Elf', titel:'Die Zwei unter Spannung', kurz:'viel mitbekommen, wenig filtern', meister:2,
  wesen:'Die Elf gilt als Zwei mit hochgedrehtem Regler: dieselbe Feinfühligkeit, nur ohne Dämpfer. Was in der Zwei Rücksicht ist, ist hier Durchlässigkeit — man bekommt mehr mit, als man verarbeiten kann.',
  stark:'Nimmt Stimmungen wahr, bevor sie ausgesprochen sind. Trifft bei Menschen oft ins Mark. Steht für etwas ein, auch wenn es sie Kraft kostet.',
  schatten:'Das Nervensystem ist zuerst voll. Verwechselt fremde Anspannung mit eigener. Rutscht zwischen Hochgefühl und Erschöpfung hin und her.',
  pInd:'—', pWest:'—', tag:'—', farbe:'#5E5826',
  hat:'bekommst schon mehr mit, als du sortieren kannst', gibt:'ist offen und dünnwandig — hier kommt alles rein',
  satt:'Wahrnehmung und Reizlast',
  braucht:[4,6], zuviel:[11,7,5]},
22:{n:'Zweiundzwanzig', titel:'Die Vier im Großformat', kurz:'etwas bauen, das bleibt', meister:4,
  wesen:'Die Zweiundzwanzig gilt als Vier mit größerem Maßstab: nicht ein Haus, sondern eine Siedlung. Das Können ist dasselbe, die Last ist größer — und die Lähmung, die daraus entstehen kann, auch.',
  stark:'Denkt in Jahrzehnten und fängt trotzdem heute an. Übersetzt eine Idee in einen Plan, den andere ausführen können.',
  schatten:'Wartet auf das große Projekt und macht deshalb das kleine nicht. Nimmt sich mehr auf die Schultern als zwei Menschen tragen können.',
  pInd:'—', pWest:'—', tag:'—', farbe:'#265E2E',
  hat:'trägst ohnehin zu viel auf einmal', gibt:'ist auf Dauer und große Vorhaben gebaut und verlangt Durchhalten',
  satt:'Last und Maßstab',
  braucht:[3,5], zuviel:[22,4,8]},
33:{n:'Dreiunddreißig', titel:'Die Sechs im Großformat', kurz:'lehren, hingeben, viele halten', meister:6,
  wesen:'Die Dreiunddreißig gilt als Sechs, die über die eigene Familie hinausgeht: lehren, begleiten, viele versorgen. Die Grenze, die der Sechs schon schwerfällt, fällt hier ganz weg.',
  stark:'Kann vielen gleichzeitig etwas geben, ohne herablassend zu werden. Bleibt bei Menschen, die andere aufgeben.',
  schatten:'Gibt sich selbst auf und nennt es Berufung. Macht aus Helfen eine Rolle, aus der man nicht mehr rauskommt.',
  pInd:'—', pWest:'—', tag:'—', farbe:'#26485E',
  hat:'gibst ohnehin mehr, als zurückkommt', gibt:'zieht Menschen an, die etwas brauchen — und das hört nicht von selbst auf',
  satt:'Hingabe und Verantwortung für viele',
  braucht:[1,7], zuviel:[33,6,2]}
};

/* ── Die acht Bereiche ───────────────────────────────────────  */
var Z_THEMA = [
 {k:'beruf',    n:'Arbeit & Berufung', u:'Wo die Zahl bei der Arbeit sichtbar wird'},
 {k:'liebe',    n:'Beziehung',         u:'Was die Zahl in Nähe tut'},
 {k:'geld',     n:'Geld',              u:'Wie die Zahl mit Geld umgeht'},
 {k:'koerper',  n:'Körper & Nerven',   u:'Wo es sich im Körper zeigt, wenn es zu viel wird'},
 {k:'lernen',   n:'Lernen & Fokus',    u:'Wie die Zahl lernt und was sie überlädt'},
 {k:'wohnen',   n:'Wohnen',            u:'Was ein Raum mit dieser Zahl tut'},
 {k:'zeit',     n:'Als Jahr',          u:'Wie sich ein Jahr mit dieser Zahl anlässt'},
 {k:'konflikt', n:'Streit',            u:'Wie die Zahl streitet und was hilft'}
];

/* ── Zahl × Bereich ──────────────────────────────────────────
   t = was los ist, tun = ein Handgriff, der heute geht. */
var Z_ZT = {
1:{
 beruf:{t:'Du arbeitest am besten, wenn du entscheiden darfst. In einer Rolle, in der jede Idee erst durch drei Abstimmungen muss, gehst du kaputt — nicht weil du nicht kannst, sondern weil dich das Warten auffrisst.', tun:'Nimm dir in deiner Arbeit einen Bereich, in dem du allein entscheidest. Und sei es ein kleiner.'},
 liebe:{t:'Du bist leicht zu verlieben und schwer zu erreichen. Nähe entsteht bei dir nicht durch Reden über Gefühle, sondern dadurch, dass jemand neben dir bleibt, während du etwas machst.', tun:'Sag einmal in der Woche einen Satz, der mit „Ich bräuchte" anfängt. Nicht mehr.'},
 geld:{t:'Du verdienst am liebsten selbst und ungern über andere. Geld ist für dich Beweglichkeit, nicht Sicherheit — deshalb legst du zu wenig zurück und wunderst dich in Flauten.', tun:'Ein fester Betrag am Monatsanfang auf ein Konto, auf das du nicht täglich schaust.'},
 koerper:{t:'Bei dir landet Überlast im Kopf und im Nacken. Du merkst Erschöpfung spät, weil du bis dahin funktioniert hast, und dann liegt sie quer.', tun:'Einmal am Tag zehn Minuten etwas, das kein Ziel hat. Nicht Sport, nicht Erledigen.'},
 lernen:{t:'Du lernst am schnellsten, indem du es selbst versuchst und scheiterst. Kurse, in denen jemand dir von vorne erklärt, was du gerade selbst herausfinden könntest, sind bei dir verlorene Zeit.', tun:'Fang bei Neuem mit dem Machen an und lies die Anleitung erst, wenn du hängst.'},
 wohnen:{t:'Du brauchst einen Platz, der nur dir gehört, und wäre es ein Sessel. Wohngemeinschaften funktionieren bei dir nur mit abschließbarer Tür.', tun:'Ein Quadratmeter in der Wohnung, an dem niemand etwas hinlegen darf.'},
 zeit:{t:'Ein Einser-Jahr ist der Start einer neuen Runde: Was du jetzt anfängst, prägt die nächsten neun Jahre. Es fühlt sich oft unfertig und einsam an, weil noch nichts davon sichtbar ist.', tun:'Schreib auf, was bis nächstes Jahr stehen soll. Ein Satz, kein Plan.'},
 konflikt:{t:'Du gehst direkt drauf zu und bist überrascht, wenn das als Angriff ankommt. Danach ist bei dir die Sache erledigt — beim anderen nicht, und das verstehst du nicht.', tun:'Frag am Tag nach dem Streit, ob für die andere Person noch etwas offen ist.'}},
2:{
 beruf:{t:'Du bist gut in Rollen, in denen zwischen Menschen vermittelt werden muss, und schlecht in Rollen, in denen du allein die Richtung ansagst. Das ist keine Schwäche, aber du musst Aufgaben finden, die das nicht dauernd verlangen.', tun:'Sag einmal in einer Besprechung deine Meinung, bevor du weißt, wie die anderen stehen.'},
 liebe:{t:'Du gehst in Beziehungen tief hinein und verlierst dabei den Überblick darüber, was du selbst willst. Oft merkst du erst beim Alleinsein, wie viel davon gar nicht deins war.', tun:'Einen Abend in der Woche etwas, das die andere Person nicht mag und du schon.'},
 geld:{t:'Du verhandelst für andere besser als für dich. Bei deinem eigenen Preis kommt immer ein Grund dazwischen, warum weniger auch geht.', tun:'Schreib deinen Preis auf, bevor das Gespräch anfängt, und sag genau den.'},
 koerper:{t:'Bei dir setzt sich Spannung im Bauch und im Schlaf fest. Du nimmst fremde Anspannung mit nach Hause und merkst nicht, dass sie nicht deine ist.', tun:'Nach Gesprächen zwei Minuten draußen stehen, bevor du in die Wohnung gehst.'},
 lernen:{t:'Du lernst am besten mit einem Gegenüber — jemandem, dem du es erzählst. Allein vor einem Buch driftest du weg, in einem Gespräch sitzt es nach zehn Minuten.', tun:'Such für jedes größere Thema einen Menschen, dem du es wöchentlich erklärst.'},
 wohnen:{t:'Du brauchst eine Wohnung, in die andere kommen können, und einen Raum, in dem niemand ist. Beides, nicht eins davon.', tun:'Einen Platz einrichten, an dem du nicht zu erreichen bist, auch für Mitwohnende.'},
 zeit:{t:'Ein Zweier-Jahr geht langsam und über Beziehungen: warten, abstimmen, reifen lassen. Wer hier Tempo erzwingt, zerreißt die Fäden, die gerade entstehen.', tun:'Eine Sache bewusst liegen lassen, statt sie zu entscheiden.'},
 konflikt:{t:'Du gehst Streit aus dem Weg, bis es dir zu viel wird, und dann kommt alles auf einmal. Für die andere Person kommt das aus dem Nichts, weil du vorher nichts gesagt hast.', tun:'Sag kleine Ärgernisse am selben Tag. Ein Satz, kein Gespräch.'}},
3:{
 beruf:{t:'Du brauchst Arbeit, in der gesprochen, geschrieben oder gezeigt wird. Reine Verwaltung macht dich stumpf, aber du brauchst jemanden oder etwas, das dich an das Fertigwerden erinnert.', tun:'Jede Woche eine Sache abschließen, auch wenn sie nicht gut ist.'},
 liebe:{t:'Du bist leicht im Kontakt und schwer im Bleiben. Wenn es ernst wird, redest du mehr und fühlst weniger — und das merkt die andere Person.', tun:'Bei einem schweren Thema nichts sagen und zuhören, bis die andere Person fertig ist.'},
 geld:{t:'Geld kommt bei dir in Schüben und geht in kleinen Beträgen. Nicht die große Ausgabe ist dein Problem, sondern die fünfzig kleinen, die du nicht mitzählst.', tun:'Zwei Wochen jede Ausgabe notieren. Nur notieren, nichts ändern.'},
 koerper:{t:'Bei dir zeigt sich Überlast in Hals, Stimme und Schlaf — du redest dich leer und liegst dann wach. Nervöser Hunger gehört oft dazu.', tun:'Eine Stunde am Tag ohne Sprechen und ohne Bildschirm.'},
 lernen:{t:'Du lernst schnell und oberflächlich. Fünf Themen gleichzeitig anzufangen fühlt sich bei dir produktiv an, bringt aber in keinem davon Tiefe.', tun:'Höchstens zwei Themen gleichzeitig. Die anderen auf eine Liste, die wartet.'},
 wohnen:{t:'Du brauchst eine Wohnung, in der etwas los sein darf, mit Platz für Material und Unordnung. Was du nicht brauchst, ist ein weiterer Raum, der dich ablenkt.', tun:'Ein Regal, auf dem nur Angefangenes liegt. Sichtbar.'},
 zeit:{t:'Ein Dreier-Jahr ist laut und voll: Kontakte, Auftritte, Angebote. Es fühlt sich nach Fülle an, aber am Jahresende ist oft nichts fertig, wenn du nicht aufpasst.', tun:'Zum Jahresanfang eine Sache benennen, die Ende Dezember fertig sein muss.'},
 konflikt:{t:'Du machst aus dem Streit eine Erzählung — gut formuliert, schnell, und für die andere Person nicht zu gewinnen. Hinterher hast du recht und nichts geklärt.', tun:'Im Streit höchstens drei Sätze am Stück, dann eine Frage.'}},
4:{
 beruf:{t:'Du bist die, bei der Dinge ankommen und fertig werden. Die Gefahr ist nicht, dass du zu wenig schaffst, sondern dass dir die Arbeit alles andere wegnimmt, weil du nicht aufhören kannst, solange etwas offen ist.', tun:'Eine feste Uhrzeit, ab der nicht mehr gearbeitet wird, auch wenn etwas offen ist.'},
 liebe:{t:'Du zeigst Liebe durch Tun: du reparierst, organisierst, erinnerst. Was dir schwerfällt, ist Nähe ohne Aufgabe — einfach dasitzen und nichts regeln.', tun:'Einmal in der Woche eine Stunde mit der anderen Person, in der nichts erledigt wird.'},
 geld:{t:'Du wirtschaftest vorsichtig und kommst damit gut durch. Der Preis ist, dass du Geld selten für etwas ausgibst, das nur schön ist, und dich dann freudlos fühlst.', tun:'Ein kleiner Betrag im Monat, der ohne Begründung ausgegeben wird.'},
 koerper:{t:'Bei dir setzt sich Überlast in Rücken, Kiefer und Gelenken fest. Du hältst lange durch, und wenn es kippt, dann in den Körper hinein, nicht in die Stimmung.', tun:'Zweimal am Tag zwei Minuten bewusst die Schultern und den Kiefer lockern.'},
 lernen:{t:'Du lernst gründlich, in Schritten, mit Wiederholung — und brauchst länger als andere, behältst es aber auch. Was dich blockiert, ist Stoff ohne erkennbare Struktur.', tun:'Bei Neuem zuerst das Inhaltsverzeichnis lesen und selbst eine Reihenfolge bauen.'},
 wohnen:{t:'Du brauchst eine Wohnung mit festen Plätzen und wenig Durchzug. In ständig wechselnden Wohnverhältnissen verlierst du mehr Kraft als du denkst.', tun:'Einen Raum oder eine Ecke komplett fertig einrichten, bevor du den nächsten anfängst.'},
 zeit:{t:'Ein Vierer-Jahr ist Arbeitsjahr: wenig Glanz, viel Fundament. Es fühlt sich zäh an und zahlt sich meistens erst im Jahr danach aus.', tun:'Eine Sache aufräumen, die seit Jahren offen ist. Versicherung, Steuer, Keller.'},
 konflikt:{t:'Du streitest um Fakten und Abläufe, während es der anderen Person um das Gefühl geht. Du hast dann in der Sache recht und bist trotzdem der Grund, warum es nicht besser wird.', tun:'Erst sagen, was du verstanden hast, dann was du richtigstellen willst.'}},
5:{
 beruf:{t:'Du brauchst Abwechslung, Menschen und wechselnde Orte. Eine Stelle mit immer gleichem Ablauf hältst du länger aus, als gut ist, und wirst dabei zynisch.', tun:'Alle drei Monate eine Sache in deiner Arbeit bewusst anders machen.'},
 liebe:{t:'Du verliebst dich in Möglichkeiten und ziehst dich zurück, sobald etwas verbindlich wird. Nicht weil du nicht liebst, sondern weil Festlegung bei dir wie Verlust riecht.', tun:'Bei Fluchtimpuls eine Woche warten, bevor du etwas beendest.'},
 geld:{t:'Dein Geld kommt unregelmäßig und geht in Erlebnisse. Du kannst mit wenig leben, aber nicht mit Planung — und genau die fehlt dir in schlechten Monaten.', tun:'Einen Monatsbedarf als Puffer aufbauen, in kleinen Schritten.'},
 koerper:{t:'Bei dir läuft Überlast über das Nervensystem: zu viele Reize, zu wenig Schlaf, zu viel Koffein, und dann Herzrasen oder Magen. Ruhe fühlt sich für dich erst falsch und dann gut an.', tun:'Einen Tag in der Woche ohne Verabredung. Fest im Kalender, nicht nach Gefühl.'},
 lernen:{t:'Du lernst in kurzen, intensiven Schüben und verlierst Interesse, wenn es Wiederholung braucht. Was du vor sechs Wochen angefangen hast, erkennst du heute kaum wieder.', tun:'In kurzen Einheiten lernen, aber jede begonnene Sache einmal bis zum ersten Ergebnis treiben.'},
 wohnen:{t:'Du brauchst eine Wohnung, aus der du leicht rauskommst, und eine, die nicht alles von dir verlangt. Große Räume mit viel Pflege binden dich an einen Ort, an dem du nicht bleiben willst.', tun:'So einrichten, dass du in zwanzig Minuten rausgehen kannst, ohne etwas zu suchen.'},
 zeit:{t:'Ein Fünfer-Jahr bringt Bewegung: Umzug, Wechsel, neue Leute, oft ungeplant. Es ist kein Jahr, um etwas Langfristiges zu gründen — eher eines, um zu schauen, was alles geht.', tun:'Nichts auf fünf Jahre festlegen. Verträge kurz halten.'},
 konflikt:{t:'Du gehst aus dem Raum, bevor es eng wird, und das kommt als Gleichgültigkeit an. Für dich war es Selbstschutz, für die andere Person Verlassenwerden.', tun:'Sagen, dass du eine Pause brauchst, und wann du zurückkommst. Dann zurückkommen.'}},
6:{
 beruf:{t:'Du landest überall da, wo sich jemand kümmern muss, und zwar auch dann, wenn das nicht deine Aufgabe ist. Deine Arbeit wächst nicht durch Ehrgeiz, sondern dadurch, dass du nicht nein sagst.', tun:'Eine Aufgabe zurückgeben, die du übernommen hast, ohne gefragt worden zu sein.'},
 liebe:{t:'Du sorgst — und bekommst dadurch Macht in der Beziehung, die du nicht wolltest. Irgendwann ist die andere Person das Kind und du die Müde, und keiner hat das verabredet.', tun:'Eine Sache, die du immer machst, zwei Wochen nicht machen. Ohne Ankündigung erklären, nicht vorwerfen.'},
 geld:{t:'Du gibst Geld für andere leichter aus als für dich. Bei dir selbst wird gerechnet, bei den anderen nicht, und das verschiebt sich über Jahre.', tun:'Einmal im Monat prüfen, wie viel von deinem Geld bei anderen gelandet ist.'},
 koerper:{t:'Bei dir zeigt sich Überlast in Hals, Schultern und Hormonhaushalt — du trägst, bis es sich körperlich meldet. Oft merkst du es erst, wenn jemand anderes dich darauf anspricht.', tun:'Einmal am Tag fragen: Was bräuchte ich jetzt? Und eine von drei Antworten umsetzen.'},
 lernen:{t:'Du lernst gut, wenn es für jemanden ist. Ohne Nutzen für andere findest du schwer den Anfang — und eigene Interessen rutschen hinter alle Termine.', tun:'Eine Lernzeit in der Woche, die ausdrücklich nichts für andere bringt.'},
 wohnen:{t:'Deine Wohnung wird automatisch zum Anlaufpunkt für andere. Das ist schön und wird zur Last, wenn es keinen Raum gibt, in dem du für niemanden erreichbar bist.', tun:'Eine Tür, die zugeht, und eine Zeit, in der sie zu ist.'},
 zeit:{t:'Ein Sechser-Jahr dreht sich um Zuhause, Familie und Verpflichtung: Umzug, Pflege, Kinder, Beziehung, Renovierung. Es ist ein warmes Jahr und ein voll besetztes.', tun:'Bei jeder neuen Verpflichtung in diesem Jahr eine alte abgeben.'},
 konflikt:{t:'Du streitest nicht, du bist enttäuscht — und das ist schwerer auszuhalten als Wut, weil sich niemand dagegen wehren kann. Dein Vorwurf heißt oft: Ich mache so viel.', tun:'Statt „ich mache so viel" sagen, was du konkret von der anderen Person willst.'}},
7:{
 beruf:{t:'Du brauchst Arbeit mit Tiefe und Alleinzeit. Offene Büros, Dauergespräch und Teamarbeit ohne Pause kosten dich mehr Kraft als die Arbeit selbst.', tun:'Zwei Stunden am Tag ohne Erreichbarkeit. Im Kalender als Termin, nicht als Vorhaben.'},
 liebe:{t:'Du brauchst Nähe und Abstand im Wechsel, und der Abstand kommt bei dir ohne Vorwarnung. Für die andere Person sieht das aus wie Rückzug aus Ablehnung, obwohl es Erholung ist.', tun:'Vorher sagen, dass du Rückzug brauchst, und wie lange. Nicht erst, wenn du schon weg bist.'},
 geld:{t:'Du brauchst wenig und verlangst zu wenig. Über Geld zu reden kommt dir unangenehm vor, und deshalb arbeitest du oft unter deinem Wert.', tun:'Deinen Satz einmal um zehn Prozent erhöhen, ohne es zu erklären.'},
 koerper:{t:'Bei dir läuft Überlast nach innen: Grübeln, Einschlafprobleme, Verdauung. Du merkst Stress im Kopf, nicht im Körper, und bemerkst den Körper erst, wenn er laut wird.', tun:'Einmal am Tag etwas rein Körperliches ohne Nachdenken. Gehen, Wasser, Hände im Teig.'},
 lernen:{t:'Du lernst am besten allein, langsam und in die Tiefe — und du gehst gern so tief, dass du die Anwendung vergisst. Kurse zu Themen, die du schon kennst, machen dich ungeduldig.', tun:'Zu jedem Thema, das du durchgearbeitet hast, eine Sache praktisch ausprobieren.'},
 wohnen:{t:'Du brauchst Stille und wenige Menschen in der Wohnung. Hellhörige Häuser und Durchgangsräume kosten dich dauerhaft Energie, auch wenn du dich daran gewöhnst.', tun:'Lärmquellen zählen und eine davon lösen — Teppich, Dichtung, Kopfhörer.'},
 zeit:{t:'Ein Siebener-Jahr dreht nach innen: weniger passiert außen, mehr sortiert sich innen. Von außen sieht es nach Stillstand aus, und das macht es anstrengend, wenn du Ergebnisse erwartest.', tun:'In diesem Jahr etwas lernen, von dem niemand etwas hat außer dir.'},
 konflikt:{t:'Du ziehst dich zurück und analysierst, statt zu streiten. Die andere Person steht dann allein im Raum und hält dein Schweigen für Verachtung.', tun:'Im Streit den Satz „Ich brauche Zeit zum Denken" sagen, statt still zu werden.'}},
8:{
 beruf:{t:'Du kannst Verantwortung tragen, die andere umhaut, und du suchst sie auch. Die Gefahr ist, dass dein Wert sich ganz an Ergebnissen festmacht und du in Flauten nicht weißt, wer du bist.', tun:'Eine Sache in der Woche, in der du nichts leistest und trotzdem anwesend bist.'},
 liebe:{t:'Du führst auch in der Beziehung und wunderst dich, dass sich das nicht gleich anfühlt. Nähe entsteht bei dir, wenn du etwas nicht kannst und es zeigst.', tun:'Einmal in der Woche etwas erzählen, bei dem du schlecht wegkommst.'},
 geld:{t:'Du verdienst gut und bindest viel Identität daran. Geld ist bei dir eine Frage von Sicherheit und Würde gleichzeitig, und deshalb sitzen Verluste tiefer als bei anderen.', tun:'Einen Betrag festlegen, ab dem genug ist, und das aufschreiben.'},
 koerper:{t:'Bei dir läuft Überlast über Blutdruck, Zähne und Erschöpfung. Du fährst auf Reserve, bis nichts mehr geht, und nennst das Disziplin.', tun:'Einen freien Tag in die Woche legen, bevor du ihn brauchst.'},
 lernen:{t:'Du lernst zielgerichtet und ungern ohne Zweck. Was dir nützt, sitzt schnell; was nur interessant ist, legst du weg — und verlierst damit die Hälfte dessen, was dich entspannen würde.', tun:'Eine Sache lernen, die dir beruflich nichts bringt.'},
 wohnen:{t:'Du brauchst eine Wohnung, die etwas darstellt, und merkst erst später, dass du sie dafür ständig im Griff haben musst. Groß und repräsentativ ist bei dir auch eine Verpflichtung.', tun:'Einen Raum bewusst unfertig lassen und nicht erklären.'},
 zeit:{t:'Ein Achter-Jahr ist Erntejahr: Geld, Verantwortung, Sichtbarkeit, manchmal auch Abrechnung. Was du in den Jahren davor gebaut hast, wird jetzt bewertet.', tun:'Verträge, Preise und Zuständigkeiten in diesem Jahr neu verhandeln.'},
 konflikt:{t:'Du gewinnst Streit und verlierst dabei Beziehungen. Dein Tempo und deine Klarheit wirken im Konflikt überlegen, und das macht Versöhnung schwer.', tun:'Zuerst sagen, woran du Anteil hast. Vor allem anderen.'}},
9:{
 beruf:{t:'Du brauchst Arbeit mit Sinn über dich hinaus, sonst wird alles schal. Was dich erschöpft, ist nicht die Menge, sondern dass du die Nöte der anderen mit nach Hause nimmst.', tun:'Nach der Arbeit eine kurze Handlung, die Schluss markiert. Jacke weg, Hände waschen, Musik an.'},
 liebe:{t:'Du siehst in Menschen, was aus ihnen werden könnte, und liebst manchmal das, statt sie. Du bleibst länger, als gut ist, weil Beenden für dich wie Aufgeben aussieht.', tun:'Einmal fragen: Wäre das gut, wenn es für immer so bliebe wie jetzt?'},
 geld:{t:'Du gibst leicht und rechnest ungern. Geld bedeutet dir nicht viel, bis es fehlt, und dann fehlt es grundsätzlich.', tun:'Einmal im Quartal den Kontostand ansehen, auch wenn es unangenehm ist.'},
 koerper:{t:'Bei dir zeigt sich Überlast als Schwere und Erschöpfung ohne klaren Grund. Du nimmst Stimmungen auf wie ein Schwamm und spürst sie als eigene Müdigkeit.', tun:'Nach Kontakt mit belasteten Menschen zehn Minuten allein, bevor der nächste Termin kommt.'},
 lernen:{t:'Du lernst über das große Bild und verlierst die Details. Zusammenhänge begreifst du schnell, die genaue Durchführung bleibt vage — und daran scheitert es dann.', tun:'Zu jedem verstandenen Zusammenhang drei konkrete Schritte aufschreiben.'},
 wohnen:{t:'Deine Wohnung wird leicht offen für alle, und Grenzen fallen dir schwer. Ohne klare Regel wohnen am Ende mehr Leute bei dir als eingezogen sind.', tun:'Eine Regel festlegen, ab wann Besuch geht, und sie einmal aussprechen.'},
 zeit:{t:'Ein Neuner-Jahr beendet: Beziehungen, Jobs, Wohnungen, Gewohnheiten. Es fühlt sich nach Abschied und Leerlauf an, und es macht Platz für das Einser-Jahr danach.', tun:'Nichts Großes neu anfangen. Stattdessen drei Dinge zu Ende bringen.'},
 konflikt:{t:'Du verstehst die andere Seite so gut, dass dein eigener Standpunkt verschwindet, und bist danach verbittert. Dein Großmut im Streit ist manchmal nur Vermeidung.', tun:'Im Streit einen Satz sagen, der nur deine Sicht enthält, ohne Verständnis für die andere.'}},
11:{
 beruf:{t:'Du arbeitest gut mit Menschen und ihren Zuständen, und du hältst weniger Betrieb aus, als die Rolle meistens verlangt. Was dich erschöpft, ist nicht die Aufgabe, sondern die Reizmenge drumherum.', tun:'Nach jedem Menschen-Termin fünfzehn Minuten Puffer. Fest eingetragen.'},
 liebe:{t:'Du spürst bei deinem Gegenüber mehr, als gesagt wird, und reagierst auf Dinge, die noch niemand ausgesprochen hat. Das kann unheimlich genau sein und für beide erschöpfend.', tun:'Nachfragen, statt vorauszusetzen: „Ich habe den Eindruck, dass… stimmt das?"'},
 geld:{t:'Dein Einkommen schwankt mit deiner Verfassung, und das ist bei dir ein größerer Faktor als bei anderen. Gute Wochen überschätzt du, schlechte unterschätzt du.', tun:'Monatsbudget am schlechtesten Monat der letzten sechs ausrichten, nicht am besten.'},
 koerper:{t:'Bei dir landet Überlast direkt im Nervensystem: Schlaf, Licht, Lärm, Haut, Magen. Du bist früher voll als andere, und das ist eine Mengenfrage, keine Charakterfrage.', tun:'Eine Reizquelle am Tag wegnehmen, nicht eine Erholung dazu.'},
 lernen:{t:'Du nimmst viel gleichzeitig auf und kommst beim Sortieren nicht mit. Lernen funktioniert bei dir in kurzen Einheiten mit viel Pause, nicht in langen Blöcken.', tun:'Fünfundzwanzig Minuten lernen, zehn Minuten nichts. Wirklich nichts.'},
 wohnen:{t:'Du brauchst eine ruhige, nicht hellhörige Wohnung mehr als eine große. Lärm, Durchgangsverkehr und viele Mitbewohnende kosten dich dauerhaft Substanz.', tun:'Vor einer Wohnungsentscheidung einmal abends dort stehen und zuhören.'},
 zeit:{t:'Ein Elfer-Jahr ist ein Zweier-Jahr mit mehr Druck: Beziehungen entscheiden sich, und du bekommst mehr mit, als du verarbeiten kannst. Es ist kein Jahr für Tempo.', tun:'Weniger Termine als im Vorjahr. Ganz konkret: zehn Prozent weniger.'},
 konflikt:{t:'Du nimmst die Anspannung der anderen Person auf und kannst dann nicht mehr unterscheiden, wessen Aufregung das ist. Danach bist du tagelang dünn.', tun:'Im Streit laut benennen, was gerade passiert, statt mitzuschwingen: „Wir sind beide hoch."'}},
22:{
 beruf:{t:'Du kannst etwas aufbauen, das länger steht als du dabei bist, und du wartest zu lange auf die richtige Gelegenheit dafür. Der Maßstab, in dem du denkst, hindert dich am Anfangen.', tun:'Den kleinsten Teil deines großen Vorhabens heraussuchen und diesen Monat machen.'},
 liebe:{t:'Du gehst Beziehungen auf lange Sicht an und übernimmst dabei mehr Verantwortung, als geteilt ist. Das wirkt verlässlich und macht aus Partnerschaft Projektleitung.', tun:'Eine Zuständigkeit in der Beziehung komplett abgeben. Auch wenn es schlechter läuft.'},
 geld:{t:'Du denkst in Jahren, nicht in Monaten, und planst entsprechend gut. Was dir fehlt, ist Geld für jetzt — du sparst auf etwas, das noch nicht existiert.', tun:'Einen Teil des Langfristgeldes bewusst für dieses Jahr freigeben.'},
 koerper:{t:'Bei dir zeigt sich Überlast als Rücken, Nacken und plötzliche Erschöpfung nach langen Phasen des Durchhaltens. Du trägst, bis es nicht mehr geht, und dann liegt es tagelang.', tun:'Jede sechste Woche zwei Tage komplett frei. Vorher eintragen, nicht nach Bedarf.'},
 lernen:{t:'Du lernst gründlich und mit Blick auf Anwendung, aber du nimmst dir zu viel auf einmal vor. Lehrpläne, die du selbst schreibst, sind doppelt so lang wie jedes Semester.', tun:'Jedes Lernvorhaben halbieren, bevor du anfängst.'},
 wohnen:{t:'Du richtest auf Dauer ein und renovierst gründlich. Die Gefahr ist, dass das Zuhause ein weiteres Projekt wird und kein Ort, an dem du sitzt.', tun:'Einen Raum für fertig erklären und dort nichts mehr verbessern.'},
 zeit:{t:'Ein Zweiundzwanziger-Jahr ist ein Vierer-Jahr in groß: viel Bau, wenig Glanz, große Hebel. Es ist das Jahr für das Fundament einer Sache, die Jahre laufen soll.', tun:'Eine Struktur bauen, die auch ohne dich funktioniert — eine Liste, ein Ablauf, eine Vertretung.'},
 konflikt:{t:'Du führst im Streit ins Sachliche und lässt die Beziehung dabei unversorgt. Du hast dann eine Lösung und die andere Person das Gefühl, verwaltet worden zu sein.', tun:'Zuerst das Gefühl benennen, dann den Vorschlag. In dieser Reihenfolge.'}},
33:{
 beruf:{t:'Du landest in Arbeit, in der du viele Menschen begleitest, und gibst dabei mehr, als abgerechnet wird. Die Rolle der Lehrenden kommt bei dir leicht, das Aufhören schwer.', tun:'Eine Zahl festlegen: wie viele Menschen du höchstens gleichzeitig begleitest.'},
 liebe:{t:'Du bist in Beziehungen die Gebende und wunderst dich, dass dich keiner fragt. Dein Gegenüber bekommt irgendwann ein schlechtes Gewissen statt Nähe.', tun:'Einmal in der Woche etwas annehmen, ohne es zurückzugeben.'},
 geld:{t:'Du arbeitest unter Preis, weil es um Menschen geht und Geld sich dann falsch anfühlt. Über Jahre wird das zu einem Problem, das nicht mehr allein deins ist.', tun:'Deinen Satz an der Arbeit ausrichten, nicht an der Lage der Klientin.'},
 koerper:{t:'Bei dir zeigt sich Überlast als Erschöpfung, die nicht mit Schlaf weggeht, und als Enge in Hals und Brust. Du merkst deine Grenze meist erst, wenn sie überschritten ist.', tun:'Eine feste Zeit in der Woche, in der du für niemanden erreichbar bist.'},
 lernen:{t:'Du lernst am liebsten, um es weiterzugeben, und überspringst dabei, was nur dich angeht. Deine eigenen Interessen stehen hinter allen Terminen.', tun:'Ein Thema lernen, das du niemandem erzählst.'},
 wohnen:{t:'Deine Wohnung wird zur Anlaufstelle — für Familie, Klientel, Freundeskreis. Ohne klaren Schnitt zwischen Arbeit und Zuhause gibt es irgendwann keinen Ort mehr, an dem du frei hast.', tun:'Arbeit und Wohnen räumlich trennen, und sei es durch einen Vorhang.'},
 zeit:{t:'Ein Dreiunddreißiger-Jahr ist ein Sechser-Jahr in groß: Verantwortung für viele, Lehre, Familie. Es gibt viel her und nimmt mehr.', tun:'Für dieses Jahr eine Obergrenze an Verpflichtungen festlegen und sie aufschreiben.'},
 konflikt:{t:'Du gehst in den Streit mit Verständnis und kommst als die Enttäuschte heraus. Weil du nie etwas verlangt hast, kann dir auch niemand etwas geben.', tun:'Eine klare Forderung formulieren. Ein Satz, der mit „Ich will" anfängt.'}}
};

/* ── Wohnungen und Häuser ────────────────────────────────────
   Was eine Nummer mit einem Zuhause macht, für wen sie gut ist und
   was man tun kann, wenn man schon drin wohnt. */
var Z_WOHN = {
1:{tut:'In einer Eins fängt etwas an. Solche Wohnungen werden oft nach einer Trennung, einem Umzug in eine neue Stadt oder einem Neustart bezogen, und sie bleiben selten lange Familienwohnungen.',
  gut:'Für Alleinwohnende, für den ersten eigenen Haushalt, für alle, die gerade eigene Entscheidungen üben.',
  schwer:'Für Paare und Familien, die zusammenwachsen wollen. Hier bleibt jeder leicht bei sich.',
  kniff:'Einen Ort schaffen, an dem alle zusammenkommen müssen — ein Tisch ohne Bildschirm.'},
2:{tut:'Eine Zwei ist auf zwei Menschen gebaut. Es geht hier viel um Rücksicht, Absprache und wer wann das Bad hat, und das ist angenehm, solange man zu zweit ist.',
  gut:'Für Paare, für Wohnen mit einem festen Gegenüber, für alle, die gerade Nähe lernen wollen.',
  schwer:'Für Alleinwohnende, die sowieso zu wenig Kontakt haben — die Wohnung verstärkt die Lücke, statt sie zu füllen.',
  kniff:'Zwei Plätze einrichten, an denen man allein sitzen kann, ohne den Raum zu verlassen.'},
3:{tut:'In einer Drei ist etwas los. Es sammeln sich Leute, Material und angefangene Sachen, und es wird mehr geredet als aufgeräumt.',
  gut:'Für Leute, die arbeiten, indem sie reden oder machen. Für Gastfreundliche, für Familien mit Kindern.',
  schwer:'Für alle, die Stille brauchen oder zu Hause konzentriert arbeiten müssen.',
  kniff:'Einen Raum zur Ruhezone erklären, in dem nichts gelagert und nicht gesprochen wird.'},
4:{tut:'In einer Vier läuft der Haushalt nach Plan: feste Plätze, feste Zeiten, alles hat eine Schublade. Es wird in solchen Wohnungen mehr geregelt und weniger improvisiert.',
  gut:'Für Leute, die Halt brauchen, nach unruhigen Jahren, oder die zu Hause wirklich arbeiten müssen.',
  schwer:'Für alle, die schon genug Pflicht im Leben haben. Hier kommt noch mehr dazu.',
  kniff:'Einen Raum ohne Zweck. Keine Ablage, kein Plan, nichts, was dort erledigt werden muss.'},
5:{tut:'In einer Fünf ist Durchzug. Menschen kommen und gehen, Pläne ändern sich, die Wohnung wird selten die letzte. Es ist belebt und schwer zur Ruhe zu bringen.',
  gut:'Für Leute, die viel unterwegs sind, für Übergangszeiten, für Jüngere und Wohngemeinschaften.',
  schwer:'Für alle, die zur Ruhe kommen, ein Kind großziehen oder zu Hause konzentriert arbeiten wollen.',
  kniff:'Ein Zimmer gegen Lärm und Besuch abdichten und wirklich freihalten.'},
6:{tut:'Eine Sechs wird zum Zuhause für mehr Leute, als eingezogen sind. Es wird hier gekocht, gepflegt und geholfen, und die Wohnung sieht meistens schöner aus als nötig.',
  gut:'Für Familien, Paare, Pflegende, für alle, die ein Zuhause für andere sein wollen.',
  schwer:'Für Menschen, die sowieso schon für zu viele sorgen. Die Wohnung legt noch etwas drauf.',
  kniff:'Eine Tür, die zugeht, und eine Zeit am Tag, in der sie zu ist.'},
7:{tut:'In einer Sieben ist es still, auch wenn es laut ist. Solche Wohnungen ziehen sich nach innen, und man ist dort schneller allein mit sich als geplant.',
  gut:'Für Lernende, Schreibende, Forschende. Für Erholungsphasen und für alle, die zu viel Betrieb hinter sich haben.',
  schwer:'Für Einsame, für Menschen in einer schweren Phase, für alle, die Gesellschaft brauchen, um aufzustehen.',
  kniff:'Eine feste Verabredung pro Woche, die in der Wohnung stattfindet. Nicht draußen.'},
8:{tut:'Eine Acht ist auf Leistung gebaut. Hier geht es um Arbeit, Geld und darum, wie es von außen aussieht — und die Wohnung fordert das auch ein, in Miete, Pflege oder Repräsentation.',
  gut:'Für Selbstständige, für alle, die beruflich etwas aufbauen, und für die, die mit Geld klarkommen.',
  schwer:'Für Erschöpfte und für alle, die gerade weniger leisten wollen oder müssen.',
  kniff:'Einen Raum bewusst unfertig und nicht vorzeigbar lassen.'},
9:{tut:'Eine Neun ist offen und weit, mit wenig Grenze nach außen. Hier endet oft ein Lebensabschnitt, und es wohnen mit der Zeit mehr Leute mit, als abgesprochen war.',
  gut:'Für Abschiede und Übergänge, für Menschen mit viel Besuch, für Gemeinschaftsprojekte.',
  schwer:'Für alle, denen Abgrenzung schwerfällt — hier fällt sie noch schwerer.',
  kniff:'Eine Regel aufstellen, bis wann Besuch bleibt, und sie einmal laut sagen.'},
11:{tut:'Eine Elf ist eine Zwei mit dünneren Wänden. Alles, was im Haus passiert, kommt hier an: Geräusche, Stimmungen, Nachbarschaftsthemen.',
  gut:'Für Menschen, die mit Wahrnehmung arbeiten und sie auch abschalten können.',
  schwer:'Für reizoffene Menschen, die ohnehin schon zu viel mitbekommen.',
  kniff:'Zuerst in Dämmung, Vorhänge und Teppich investieren, nicht in Möbel.'},
22:{tut:'Eine Zweiundzwanzig ist eine Vier mit großem Maßstab. Solche Adressen werden gekauft, nicht gemietet, und sie werden zum Projekt für Jahre.',
  gut:'Für alle, die wirklich etwas aufbauen wollen — Haus, Praxis, Familiensitz.',
  schwer:'Für Übergangszeiten und für alle, die schon genug tragen.',
  kniff:'Einen Teil der Wohnung für fertig erklären und dort nichts mehr anfassen.'},
33:{tut:'Eine Dreiunddreißig ist eine Sechs, die über die eigene Familie hinausgeht: Hier wird gelehrt, begleitet, versorgt — oft in Verbindung von Wohnen und Arbeiten.',
  gut:'Für Praxen, Beratung und Unterricht in den eigenen Räumen.',
  schwer:'Für alle, die Arbeit und Zuhause nicht trennen können und deshalb nie Schluss haben.',
  kniff:'Eine sichtbare Grenze zwischen Arbeits- und Wohnteil. Eine Tür, ein Vorhang, eine andere Bodenfarbe.'}
};

/* ── Die Verträglichkeit von Mensch und Nummer ───────────────
   Keine Tabelle, sondern eine Rechnung: Jede Zahl hat etwas, wovon sie
   schon zu viel hat, und etwas, was ihr von außen fehlt. Eine Nummer,
   die das Fehlende liefert, trägt. Eine, die das Zuviel verdoppelt, reibt.
   Dieselbe Rechnung gilt in beide Richtungen — deshalb kann die Seite
   auch sagen, für wen eine bestimmte Nummer passt. */
function zWohnReso(lz, hz){
  if(!Z_ZAHL[lz] || !Z_ZAHL[hz]) return null;
  if(hz === lz) return 'doppelt';
  var mL = Z_ZAHL[lz].meister, mH = Z_ZAHL[hz].meister;
  if(mL === hz || mH === lz) return 'verwandt';
  if(Z_ZAHL[lz].braucht.indexOf(hz) >= 0) return 'traegt';
  if(Z_ZAHL[lz].zuviel.indexOf(hz) >= 0) return 'reibt';
  return 'neutral';
}

var Z_RESO = {
 traegt:{n:'Trägt dich', rang:3, farbe:'#3F6B4A',
   satz:function(L,H){ return 'Du '+L.hat+'. Eine '+H.n+' '+H.gibt+' — das ist genau das Gegengewicht, das dir fehlt.'; },
   folge:'Diese Wohnung nimmt dir etwas ab, statt noch etwas draufzulegen.'},
 verwandt:{n:'Verwandt', rang:2, farbe:'#9A7235',
   satz:function(L,H){ return 'Deine Zahl und die Nummer gehören zusammen: dasselbe Thema, nur in anderer Lautstärke. Die '+H.n+' '+H.gibt+'.'; },
   folge:'Vertraut und eng. Du kennst alles davon schon, im Guten wie im Anstrengenden.'},
 doppelt:{n:'Doppelt', rang:1, farbe:'#2E3A5C',
   satz:function(L,H){ return 'Deine Zahl noch einmal in der Hausnummer. Die '+H.n+' '+H.gibt+' — also genau das, was du selbst mitbringst.'; },
   folge:'Alles, was du gut kannst, wird hier größer. Alles, was dir fehlt, fehlt doppelt.'},
 reibt:{n:'Reibt', rang:0, farbe:'#A05A3A',
   satz:function(L,H){ return 'Du '+L.hat+'. Eine '+H.n+' '+H.gibt+' — dasselbe also noch einmal, jetzt in den Wänden.'; },
   folge:'Machbar, aber du musst gegensteuern. Der Kniff unten ist hier keine Idee, sondern Pflicht.'},
 neutral:{n:'Unauffällig', rang:2, farbe:'#6B6259',
   satz:function(L,H){ return 'Zwischen deiner Zahl und dieser Nummer liegt kein besonderer Zug. Die '+H.n+' '+H.gibt+', und das trifft bei dir weder einen Nerv noch eine Lücke.'; },
   folge:'Die Nummer macht hier wenig. Entscheide nach Grundriss, Lärm und Miete.'}
};

/* ── Die Schulen ─────────────────────────────────────────────
   Jede mit dem, was sie wirklich ist, und mit dem, was sich über ihr
   Alter belegen lässt. „alt" steht für: so weit zurück reicht es
   nachweisbar, nicht so weit, wie behauptet wird. */
var Z_SYSTEM = [
{k:'pyth', n:'Pythagoräische Numerologie', ruf:'Der Standard im Westen', neu:0,
 wie:'A bis Z laufen glatt durch 1 bis 9 und fangen wieder bei 1 an. Aus Name und Geburtsdatum werden Lebenszahl, Ausdruckszahl, Seelenzahl und Persönlichkeitszahl gebildet.',
 her:'Der Name verweist auf Pythagoras, die Methode nicht. Als Urheberin des Systems auf dem englischen Alphabet gilt <b>L. Dow Balliett</b>, deren erstes Buch 1905 erschien; von ihr kommt auch, dass 11 und 22 als Meisterzahlen stehen bleiben. Ausgebaut hat es ihre Schülerin <b>Juno Jordan</b> (1884–1984) in Büchern von 1936 und 1965. Aus der Antike ist keine Zuordnung lateinischer Buchstaben zu 1 bis 9 bekannt — das lateinische Alphabet hatte schlicht keine Zahlwerte.',
 gut:'Verbreitet, überall gleich erklärt, leicht zu lernen. Wenn jemand „meine Lebenszahl" sagt, ist fast immer diese gemeint.',
 vor:'Das Alter wird regelmäßig überschätzt. Es ist ein System aus dem frühen zwanzigsten Jahrhundert, keines aus der Antike.'},
{k:'chald', n:'Chaldäische Numerologie', ruf:'Nach Klang, ohne Neun', neu:0,
 wie:'Die Buchstaben werden nicht alphabetisch, sondern nach Klanggruppen auf 1 bis 8 verteilt. Die 9 bleibt frei: Sie gilt als heilig und wird keinem Buchstaben zugeordnet. Gezählt wird der Rufname, nicht der Name auf der Geburtsurkunde.',
 her:'Benannt nach Babylonien, in den Westen gebracht von <b>Cheiro</b> (Louis Hamon) mit <i>The Book of Numbers</i>, London 1926. Eine Verbindung zu babylonischen Quellen ist nicht belegt; die Tafel selbst ist bei Cheiro und seinen Nachfolgern gut dokumentiert.',
 gut:'Nimmt ernst, wie ein Name wirklich gesprochen und benutzt wird. Für Menschen mit Spitznamen oder geänderten Namen oft treffender.',
 vor:'Gibt für denselben Namen andere Zahlen als die pythagoräische Tafel. Wer beide nebeneinander rechnet, bekommt zwei verschiedene Antworten — und keine von beiden ist die richtige.'},
{k:'gematria', n:'Gematria und Isopsephie', ruf:'Hier kommen die Zahlen aus der Schrift', neu:0,
 wie:'Im Hebräischen und im Griechischen sind die Buchstaben gleichzeitig die Ziffern. Alef ist eins, Bet ist zwei, und so weiter. Ein Wort hat also einen Zahlenwert, ohne dass jemand ihn zuweisen musste.',
 her:'Wirklich alt und gut belegt: griechische Isopsephie seit der Antike, hebräische Gematria seit der rabbinischen Zeit, ausgebaut in der Kabbala. In Pompeji steht ein Graffito, das statt eines Namens nur dessen Zahlenwert nennt — „ich liebe die, deren Zahl 545 ist".',
 gut:'Der historisch einzige Fall, in dem die Zahl nicht gesetzt, sondern mitgeliefert wird. Deshalb kann man hier Texte wirklich vergleichen.',
 vor:'Gilt nur für diese Schriften. Einen deutschen Namen in Gematria zu rechnen heißt, ihn erst in hebräische Buchstaben zu übertragen — und an dieser Übertragung hängt dann das Ergebnis.'},
{k:'abjad', n:'Abjad', ruf:'Die arabische Variante', neu:0,
 wie:'Dieselbe Idee wie Gematria, mit den arabischen Buchstaben in ihrer alten, nicht in der heutigen Reihenfolge. Jeder Buchstabe hat einen festen Wert von 1 bis 1000.',
 her:'Belegt seit dem Mittelalter, bis heute in Gebrauch für Jahresangaben in Chronogrammen und für Inschriften.',
 gut:'Gut dokumentiert, mit klaren Regeln, und bis heute lebendig.',
 vor:'Wie bei Gematria: an Schrift und Sprache gebunden, nicht übertragbar.'},
{k:'ank', n:'Ank Jyotish', ruf:'Indische Zahlenlehre', neu:0,
 wie:'Arbeitet mit drei Zahlen: Mulank (der Geburtstag), Bhagyank (die Summe des ganzen Datums) und Namank (der Name). Jede Ziffer gehört zu einem Planeten, und die Deutung läuft über diesen Planeten.',
 her:'Eng mit der vedischen Astrologie verwoben, in der heutigen Form seit dem zwanzigsten Jahrhundert populär, mit älteren Wurzeln in der indischen Astrologie.',
 gut:'Die einzige Schule, die Zahlen systematisch an ein vorhandenes astrologisches Gerüst anbindet. Wenn du mit Charts arbeitest, ist das die anschlussfähigste.',
 vor:'Die Planetenzuordnung weicht bei der 4 und der 7 von der westlichen ab: indisch Rahu und Ketu, westlich Uranus und Neptun. Das ändert die Deutung dieser beiden Zahlen erheblich.'},
{k:'kabb', n:'Kabbalistische Numerologie', ruf:'Nur der Name, zweiundzwanzig Wege', neu:0,
 wie:'Rechnet allein mit dem Namen, nicht mit dem Geburtsdatum, und reduziert auf 1 bis 22 statt auf 1 bis 9 — passend zu den zweiundzwanzig Buchstaben des hebräischen Alphabets und den Pfaden im Lebensbaum.',
 her:'Beruft sich auf die Kabbala; was heute unter diesem Namen als Numerologie verkauft wird, ist überwiegend eine Zusammenstellung des zwanzigsten Jahrhunderts. Die kabbalistische Tradition selbst arbeitet mit Gematria, nicht mit Lebenszahlen.',
 gut:'Weil das Geburtsdatum herausfällt, ist das die Schule für Namenswechsel — Heirat, Künstlername, Transition.',
 vor:'Die Bezeichnung verspricht mehr Tradition, als in der Methode steckt.'},
{k:'chin', n:'Chinesische Zahlen', ruf:'Keine Deutung, sondern Sprache', neu:0,
 wie:'Hier geht es nicht um Zahlenbedeutung, sondern um Gleichklang: Die Vier klingt wie das Wort für sterben, die Acht wie das Wort für reich werden, die Neun wie das Wort für dauerhaft.',
 her:'Tatsache über Sprache und Markt, nicht über Mystik. In Hongkong und Teilen Chinas werden Etagen mit 4 und 14 in Hochhäusern übersprungen, und Nummern mit vielen Achten erzielen auf Auktionen reale Aufpreise.',
 gut:'Hier ist der Effekt nachweisbar — nur wirkt er über Menschen und Preise, nicht über die Zahl.',
 vor:'Lässt sich nicht auf deutsche Verhältnisse übertragen. In Berlin bedeutet eine Hausnummer 4 nichts, weil hier niemand den Gleichklang hört.'},
{k:'engel', n:'Engelszahlen', ruf:'111, 222, 11:11', neu:1,
 wie:'Wiederholende Ziffernfolgen auf Uhren, Nummernschildern und Rechnungen werden als Botschaft gelesen, mit einer festen Bedeutung je Folge.',
 her:'Jung: Die heutige Form entsteht in den 1990er Jahren mit Doreen Virtue und verbreitet sich in den 2010er Jahren über soziale Netzwerke. Eine ältere Tradition dafür gibt es nicht.',
 gut:'Niedrige Schwelle und starke Wirkung als Erinnerung — eine wiederkehrende Zahl kann ein brauchbarer Anker für eine Absicht sein.',
 vor:'Was hier passiert, ist gut beschrieben und heißt <b>Frequenzillusion</b>: Sobald du auf 11:11 achtest, siehst du es überall, weil du die anderen Minuten nicht mitzählst. Das ist kein Gegenargument gegen die Praxis, aber es erklärt sie vollständig.'},
{k:'bio', n:'Biorhythmik', ruf:'Widerlegt, aber zählt dazu', neu:0,
 wie:'Behauptet drei feste Zyklen ab dem Geburtstag: 23 Tage körperlich, 28 Tage seelisch, 33 Tage geistig, und berechnet daraus gute und kritische Tage.',
 her:'Die 23 und die 28 stammen von dem Berliner Arzt <b>Wilhelm Fließ</b> Ende des neunzehnten Jahrhunderts, Hermann Swoboda kam 1904 auf Ähnliches, die 33 fügte Alfred Teltscher hinzu. Populär wurde das Ganze in den 1970er Jahren.',
 gut:'Nichts, außer als Beispiel. Diese Schule ist als einzige wirklich großflächig überprüft worden — und deshalb die einzige, über die man etwas Belastbares sagen kann.',
 vor:'Die Überprüfungen sind durchgefallen. Terence Hines hat über hundert Studien dazu durchgesehen: Sie bestätigten entweder, dass es keinen Zusammenhang gibt, oder sie hatten Fehler, die ihre Ergebnisse unbrauchbar machen. Wer Biorhythmen trotzdem verkauft, verkauft etwas, das überprüft und widerlegt ist.'}
];

/* ── Zahl und Chart ──────────────────────────────────────────
   Welcher Planet zu welcher Ziffer gehört — und wo die beiden großen
   Schulen sich widersprechen. */
var Z_PLANET = {
1:{ind:'Sonne', west:'Sonne'}, 2:{ind:'Mond', west:'Mond'},
3:{ind:'Jupiter', west:'Jupiter'}, 4:{ind:'Rahu', west:'Uranus'},
5:{ind:'Merkur', west:'Merkur'}, 6:{ind:'Venus', west:'Venus'},
7:{ind:'Ketu', west:'Neptun'}, 8:{ind:'Saturn', west:'Saturn'},
9:{ind:'Mars', west:'Mars'}
};
