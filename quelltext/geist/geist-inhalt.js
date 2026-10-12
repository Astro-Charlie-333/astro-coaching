/* Astro-Charlie · Geistführung — die Inhaltstafeln
   Alles hier ist Überlieferung und Deutung. Die Rechnung steckt in geist-app.js.
   Grundgedanke: Das 12. Haus ist in der alten Lehre das Haus des Verborgenen.
   Wer darüber herrscht und wo dieser Herrscher steht, sagt, über welchen Stoff
   der Zugang bei diesem Menschen läuft. Nicht ob, sondern womit. */

/* ── Die Tür: der Herrscher des 12. Hauses ───────────────────── */
var TUER={
 Sonne:{stoff:'Licht und Stimme',
  tuer:'Dein Zugang geht über Klarheit, nicht über Dämmerung. Du kommst nicht in Kontakt, indem du dich auflöst, sondern indem du dich hinstellst und etwas aussprichst. Die alte Lehre nennt das Anrufung: Du sagst laut, wer du bist und was du willst.',
  wie:'Im Licht arbeiten, nicht im Dunkeln. Eine Kerze, ein Fenster nach Osten, der frühe Morgen. Und: laut sprechen. Schon halblaut reicht, aber nicht nur im Kopf.',
  womit:'Gold, Bernstein, Zitrusduft, Weihrauch, Honig. Die Mittagsstunde.',
  anker:'ein Stück Bernstein oder eine Messingschale',
  nicht:'Trance, Dunkelheit, Dämmerzustände, lange Augen-zu-Sitzungen. Da verlierst du den Faden statt ihn zu finden.'},
 Mond:{stoff:'Wasser und Gefühl',
  tuer:'Dein Zugang ist der leibhaftigste von allen: Du merkst es zuerst im Körper und an der Stimmung, bevor ein Gedanke da ist. In der Überlieferung ist der Mond die Schwelle — er trägt, was von weiter oben kommt, bis in dein Gefühl.',
  wie:'Abends, am Wasser oder mit Wasser. Eine Schale, ein Bad, ein Spaziergang am Kanal. Und mit Rückblick: aufschreiben, was der Tag an Stimmung gebracht hat, bevor du fragst.',
  womit:'Silber, Mondstein, Perlmutt, Jasmin, Milch, Salz. Der Montag, die Mondstunden.',
  anker:'eine flache Schale mit Wasser',
  nicht:'Zwang und Takt. Dein Zugang hat Ebbe und Flut — an den Tagen, an denen nichts kommt, kommt nichts, und das ist Teil der Form.'},
 Merkur:{stoff:'Sprache und Zeichen',
  tuer:'Bei dir kommt es als <b>Satz</b>. Oder als Bild mit Worten dran, als plötzlich klarer Gedanke, als etwas, das du zufällig liest und das antwortet. Die alte Lehre ordnet Merkur die Boten zu — und die Deutung von Zeichen überhaupt.',
  wie:'Schreiben, nicht sitzen. Frage oben auf die Seite, Datum daneben, dann schreiben ohne anzuhalten. Karten, Losorakel, aufgeschlagene Bücher sind bei dir keine Spielerei, sondern das passende Werkzeug.',
  womit:'Papier und Stift. Achat, Kümmel, Minze, Lavendel. Der Mittwoch, die Merkurstunden.',
  anker:'immer dasselbe Heft und immer derselbe Stift',
  nicht:'Stillsitzen und Warten. Dein Kanal ist in Bewegung offen, nicht in Ruhe.'},
 Venus:{stoff:'Schönheit und Hingabe',
  tuer:'Dein Zugang öffnet sich über Wohlgefühl. Das ist in der Überlieferung kein Luxus, sondern Handwerk: Venus macht weich, und was weich ist, lässt durch. Vor jedem Kontakt steht bei dir etwas Schönes.',
  wie:'Erst der Körper weich, dann die Frage. Duft, warme Hände, ein Ton, etwas zum Hinschauen. Musik ist bei dir ein Zugang und nicht nur Kulisse. Hingabe statt Konzentration.',
  womit:'Rosenwasser, Vanille, Kupfer, Rosenquarz, Smaragd, Honigkuchen, Blumen. Der Freitag, die Venusstunden.',
  anker:'ein Fläschchen Rosenwasser oder ein Stück Rosenquarz',
  nicht:'Askese und Härte. Fasten, Kälte, Durchhalten, lange unbequeme Sitzungen — das schließt bei dir zu, statt zu öffnen.'},
 Mars:{stoff:'Hitze und Schnitt',
  tuer:'Dein Zugang ist kurz und heiß. Er geht über Anstrengung, über die Stelle, an der der Körper warm wird und der Kopf aufhört. Die alte Lehre gibt Mars das Schneiden und das Schützen — Grenze ziehen, Band durchtrennen, Raum freimachen.',
  wie:'Bewegen, bis es warm ist, und dann still werden. Nicht umgekehrt. Kurze, deutliche Handlungen mit einem klaren Anfang und einem klaren Ende. Schutzarbeit liegt dir.',
  womit:'Eisen, Rost, Nelke, Pfeffer, Ingwer, Blutstein, rote Kerze. Der Dienstag, die Marsstunden.',
  anker:'ein Stück Eisen — ein Nagel, ein Schlüssel, eine Klinge',
  nicht:'Langes Weichwerden. Dir fällt es schwerer, über Hingabe hineinzukommen — aber du kannst dich hineinarbeiten.'},
 Jupiter:{stoff:'Weite und Segen',
  tuer:'Dein Zugang ist der freundlichste. Jupiter ist in der alten Lehre der Große Benefik und zugleich der Priesterplanet: Er öffnet über Dank, über Großzügigkeit, über das Gefühl, dass es mehr gibt als das hier. Bei dir kommt der Kontakt leicht — die Arbeit ist, ihn zu begrenzen.',
  wie:'Mit Dank anfangen, nicht mit der Bitte. Draußen, weit, oben — Hügel, Himmel, hohe Räume. Etwas weggeben, bevor du fragst. Lehren und Weitergeben ist bei dir selbst eine Praxis.',
  womit:'Weihrauch, Zeder, Salbei, Lapislazuli, Amethyst, Zinn. Der Donnerstag, die Jupiterstunden.',
  anker:'ein Stück Weihrauch oder ein Zedernholzspan',
  nicht:'Mehr. Immer mehr Methoden, mehr Lehrer, mehr Bücher. Dein Risiko ist nicht Mangel, es ist Überlauf.'},
 Saturn:{stoff:'Zeit und Schwelle',
  tuer:'Dein Zugang ist der strengste und der verlässlichste. Saturn ist in der alten Lehre der Hüter der Schwelle — bei ihm gibt es keinen schnellen Weg, aber einen, der hält. Was du einmal aufgebaut hast, bleibt da.',
  wie:'Immer gleich, immer zur gleichen Zeit, immer am gleichen Ort. Lieber sieben Minuten täglich über ein Jahr als eine Stunde, wenn dir danach ist. Deine Praxis wird nicht durch Intensität stark, sondern durch Wiederholung.',
  womit:'Blei, Onyx, Obsidian, Zypresse, Myrrhe, schwarzer Stein, alte Dinge. Der Samstag, die Saturnstunden.',
  anker:'ein schwarzer Stein, möglichst schwer',
  nicht:'Spontaneität. Und Ungeduld. Bei dir dauert der Anfang lang und ist dann unerschütterlich — wenn du in den ersten Wochen aufhörst, hast du den ganzen Weg umsonst gegangen.'}
};

/* Beifarbe: in welchem Zeichen dieser Herrscher steht */
var TUERZEICHEN={
 Widder:'Dass {p} in Widder steht, heißt: schnell und am Anfang. Erste Eindrücke, nicht ausgesessene.',
 Stier:'Dass {p} in Stier steht, heißt: über das Material. Ein Gegenstand, der immer derselbe ist. Berührung, Gewicht, Geruch.',
 Zwillinge:'Dass {p} in Zwillinge steht, heißt: in Sprache und im Doppelten. Zwei Deutungen gleichzeitig halten können ist bei dir ein Werkzeug, kein Mangel.',
 Krebs:'Dass {p} in Krebs steht, heißt: über Zuhause, über Wasser, über die Herkunft. Ahnenarbeit liegt nahe.',
 'Löwe':'Dass {p} in Löwe steht, heißt: sichtbar und mit Herz. Du brauchst dafür einen Platz, der dir gehört.',
 Jungfrau:'Dass {p} in Jungfrau steht, heißt: über das Genaue. Kräuter, Reihenfolgen, Listen, Handarbeit. Dienst an etwas.',
 Waage:'Dass {p} in Waage steht, heißt: über Schönheit und zu zweit. Im Gegenüber wird es bei dir klar.',
 Skorpion:'Dass {p} in Skorpion steht, heißt: über das Verschwiegene. Was runter geht, nicht was hoch geht. Nicht erschrecken.',
 'Schütze':'Dass {p} in Schütze steht, heißt: über Sinn und Ferne. Fremde Traditionen, Reisen, große Fragen.',
 Steinbock:'Dass {p} in Steinbock steht, heißt: über Form. Ohne Gefäß kommt bei dir nichts an — mit Gefäß alles.',
 Wassermann:'Dass {p} in Wassermann steht, heißt: über das Eigene. Du wirst keine Linie übernehmen, du wirst eine bauen.',
 Fische:'Dass {p} in Fische steht, heißt: über Auflösung. Es kommt viel und ohne Rand — die Übung ist nicht Empfangen, sondern Unterscheiden.'
};

/* ── Der Kanal: Merkur ──────────────────────────────────────── */
var KANAL={
 Widder:{wie:'als erster Impuls — der Satz, der sofort da ist, bevor du nachdenkst',ueb:'Den ersten Eindruck aufschreiben und dann <i>nicht</i> gleich handeln. Dein Risiko ist nicht Fehlempfang, es ist Übereilung.'},
 Stier:{wie:'langsam und körperlich — du weißt es, bevor du es sagen kannst',ueb:'Warte, bis die Worte kommen. Dein Kanal ist langsam und dafür zuverlässig. Nicht hetzen.'},
 Zwillinge:{wie:'in Worten, Wortspielen, Doppeldeutigkeiten, zufällig Gehörtem',ueb:'Du empfängst viel und schnell. Sortiere danach, nicht währenddessen — sonst verlierst du die Hälfte beim Prüfen.'},
 Krebs:{wie:'als Bild aus der Erinnerung, als Stimmung, als etwas Familiäres',ueb:'Trenne beim Nachlesen, was Erinnerung ist und was neu war. Beides ist echt, aber es ist nicht dasselbe.'},
 'Löwe':{wie:'als ganze Geschichte, dramatisch und mit Bedeutung',ueb:'Frag beim Nachlesen: Steht in der Geschichte etwas, das ich nicht schon wollte? Dein Kanal erzählt gern dich selbst.'},
 Jungfrau:{wie:'als Detail, als Zahl, als auffälliges Einzelnes — Merkur steht hier in seinem eigenen Haus',ueb:'Du hast einen eingebauten Filter. Dein Risiko ist, zu früh zu verwerfen. Schreib auch das auf, was unsinnig klingt.'},
 Waage:{wie:'im Vergleich — es wird klar, wenn du zwei Dinge nebeneinander hältst',ueb:'Du brauchst ein Gegenüber, und sei es ein Notizbuch, das antwortet. Allein im Kopf bleibt es unentschieden.'},
 Skorpion:{wie:'als Ahnung von dem, was nicht gesagt wird',ueb:'Du liest Untertöne sehr genau. Prüf nach, ob der Unterton wirklich da war oder ob du ihn mitgebracht hast.'},
 'Schütze':{wie:'als große Linie, als Sinnzusammenhang, als plötzliche Übersicht',ueb:'Die Linie stimmt oft, die Einzelheiten nicht. Notiere die Linie, und lass die Details offen.'},
 Steinbock:{wie:'trocken und knapp — ein Satz, der eher wie eine Anweisung klingt',ueb:'Du misstraust dem, was kommt, weil es so unspektakulär klingt. Genau das ist bei dir das Echtheitszeichen.'},
 Wassermann:{wie:'als Einsicht in ein Muster, plötzlich und von außen',ueb:'Es kommt in Sprüngen, nicht im Fluss. Halte es fest, sobald es da ist — es kommt nicht freundlich wieder.'},
 Fische:{wie:'ganz und ohne Rand — als Bild, als Wissen ohne Quelle, als Satz, von dem du nicht weißt, woher',ueb:'Merkur hat in Fische keine Kanten zum Sortieren. Deine eigentliche Praxis ist deshalb nicht „mehr empfangen", sondern: aufschreiben, <b>datieren</b>, und in vier Wochen nachsehen. Das ist in der Tradition die Unterscheidung der Geister, und bei dir ist sie die Hauptarbeit.'}
};

/* Merkurs Zustand: wie viel Filter ist eingebaut */
var KANALZUSTAND={
 domizil:'Merkur steht in seinem eigenen Zeichen. Du hast einen eingebauten Filter und darfst dich auf deine Einordnung verlassen.',
 erhoehung:'Merkur ist erhöht. Deine Einordnung ist schärfer als bei den meisten — nutze sie, auch für andere.',
 exil:'Merkur steht im Exil. Der Empfang ist offen, die Sortierung nicht eingebaut. Du brauchst sie von außen: Heft, Datum, Nachlesen.',
 exilfall:'Merkur steht <b>im Exil und im Fall</b> — das gibt es nur in diesem einen Zeichen, und es ist die schwächste Stellung, die Merkur überhaupt haben kann. In der alten Lehre heißt das: Er kann hier nicht sortieren. Lies es nicht als Urteil über deinen Verstand, sondern als Angabe über die Bauart: Du empfängst breit und ungefiltert, und der Filter muss von außen kommen — Heft, Datum, Nachlesen. Was dir fehlt, ist kein Vermögen, sondern ein Werkzeug, und Werkzeuge kann man hinlegen.',
 fall:'Merkur steht im Fall. Du wirst dir selbst am wenigsten glauben. Die Gegenmaßnahme ist nicht mehr Vertrauen, sondern Beleg: aufschreiben und später prüfen, bis du Belege hast.',
 '':'Merkur ist peregrin — ohne eigene Würde, also beweglich. Er nimmt den Charakter dessen an, womit er verbunden ist.'
};

/* ── Neptun: wie viel Form du brauchst ─────────────────────── */
var NEPTUN={
 Feuer:'Dein Neptun steht in einem Feuerzeichen: Der Kontakt kommt als Begeisterung, als Vision, als etwas, das dich anzündet. Das ist echt und es verfliegt schnell. Schreib es auf, während es brennt.',
 Erde:'Dein Neptun steht in einem Erdzeichen: Er will Form. Ein Heft, eine Uhrzeit, eine Regel, ein Handwerk. Das ist kein Nebel-Neptun — gib ihm ein Gefäß, und er wird verlässlich. Ohne Gefäß kippt er.',
 Luft:'Dein Neptun steht in einem Luftzeichen: Der Kontakt kommt als Gedanke, als Muster, als Verstehen. Du wirst ihn zuerst für eine Idee halten. Prüf, ob die Idee von dir war.',
 Wasser:'Dein Neptun steht in einem Wasserzeichen: Hier ist er zu Hause, und die Grenze zwischen dir und dem, was kommt, ist dünn. Das ist Gabe und Aufgabe gleichzeitig — du brauchst nach jeder Sitzung etwas, das dich zurückholt.'
};
var NEPTUNHAUS={
 1:'im 1. Haus — am eigenen Körper und Auftritt. Andere spüren das an dir, bevor du etwas sagst.',
 2:'im 2. Haus — am eigenen Wert. Das Thema ist, ob du das, was du kannst, auch als deines annimmst.',
 3:'im 3. Haus — im Alltäglichen, im Reden, im Nahen. Es kommt in Nebensätzen und auf kurzen Wegen.',
 4:'im 4. Haus — zu Hause und bei der Herkunft. Ahnen, Wohnung, der eigene Boden. Hier ist der Ort deiner Praxis selbst wichtig.',
 5:'im 5. Haus — im Machen und Spielen. Über Kunst, über Kinder, über das, was du aus Freude tust.',
 6:'im 6. Haus — im Tun und im Körper. Über Handarbeit, Pflege, Wiederholung. Dienst ist bei dir ein Zugang.',
 7:'im 7. Haus — im Gegenüber. Es wird klar, wenn jemand da ist. Allein bleibt es diffus.',
 8:'im 8. Haus — im Verborgenen, in dem, was man erbt, und bei den Toten. Das ist in der alten Lehre die dünnste Stelle zur anderen Seite.',
 9:'im 9. Haus — im Glauben und in der Ferne. Lehre, Pilgern, fremde Traditionen. Hier gehört er klassisch hin.',
 10:'im 10. Haus — im Sichtbaren und im Beruf. Es gehört nach draußen, nicht in den Keller.',
 11:'im 11. Haus — in Gemeinschaft, in Freundschaft, in dem, worauf du hoffst. Mit anderen zusammen geht es leichter.',
 12:'im 12. Haus — in seinem eigenen Feld. Rückzug ist bei dir keine Flucht, sondern die Arbeitsform.'
};

/* ── Glaube: das 9. Haus ───────────────────────────────────── */
var GLAUBE={
 Widder:'Du glaubst, was du selbst ausprobiert hast. Fremde Autorität trägt bei dir nicht weit — du musst es einmal am eigenen Leib gehabt haben, dann hält es.',
 Stier:'Du glaubst, was sich bewährt. Dein Glaube wächst langsam und wirft nichts weg. Alte, einfache, handfeste Formen passen zu dir besser als neue komplizierte.',
 Zwillinge:'Du glaubst in der Mehrzahl. Du kannst zwei Lehren gleichzeitig ernstnehmen, ohne dass es dich zerreißt — das ist kein Wankelmut, das ist dein Zugang.',
 Krebs:'Du glaubst, was dich hält. Herkunft, Familie, Ahnen, das Vertraute. Was von weit her kommt, musst du erst nach Hause tragen, bevor es echt wird.',
 'Löwe':'Du glaubst, was dich anrührt. Dein Glaube braucht Größe, Feier, Wärme — eine Form, in der etwas gefeiert wird und nicht nur verwaltet.',
 Jungfrau:'Du glaubst, was funktioniert und sich prüfen lässt. Du willst die Methode genau, die Reihenfolge richtig, die Wirkung nachvollziehbar. Das ist keine Kleinlichkeit, das ist dein Weg zur Hingabe.',
 Waage:'Du glaubst, was gerecht und schön ist. Eine Lehre, die hässlich oder unfair ist, überzeugt dich nicht, auch wenn sie stimmt.',
 Skorpion:'Du glaubst, was durch eine Krise gegangen ist. Alles Leichte ist dir verdächtig. Dein Glaube bildet sich an den Stellen, an denen etwas zu Ende gegangen ist.',
 'Schütze':'Hier gehört das 9. Haus hin. Du glaubst leicht und gern, und das Risiko ist nicht Zweifel, sondern Weite ohne Boden. Deine Übung ist Auswahl.',
 Steinbock:'Du glaubst, was Bestand hat. Alt, bewährt, streng, mit Lehrweg. Dir ist eine lange Tradition lieber als eine schöne Idee — und das trägt.',
 Wassermann:'Du wirst <b>keine Linie übernehmen</b>. Dein Glaube muss selbst gebaut, nachvollziehbar und ausdrücklich dein eigener sein. Guru-Verhältnisse gehen bei dir schief, und das ist keine Schwäche: Du bist auf Eigenbau angelegt.',
 Fische:'Du glaubst, was du gespürt hast. Dir muss niemand etwas erklären — und du kannst kaum erklären, warum du es weißt. Deine Übung ist, es trotzdem in Worte zu bringen, damit du es teilen kannst.'
};

/* Wo der Herrscher des 9. Hauses steht — da wird dein Glaube gemacht */
var GLAUBEHAUS={
 1:'Dein Glaube wird an dir selbst gemacht. Du bist die Probe.',
 2:'Dein Glaube wird daran gemacht, was er wert ist — was er dir trägt und was er dich kostet.',
 3:'Dein Glaube wird im Reden gemacht, im Alltäglichen, auf kurzen Wegen, mit Geschwistern und Nachbarn.',
 4:'Dein Glaube wird zu Hause gemacht, bei der Herkunft, bei denen vor dir.',
 5:'Dein Glaube wird im Machen gemacht — in Kunst, mit Kindern, im Spiel.',
 6:'Dein Glaube wird in der Arbeit gemacht, am Körper, im täglichen Tun.',
 7:'Dein Glaube wird <b>im Gegenüber</b> gemacht — eins zu eins, im Gespräch, in der Begegnung. Nicht allein im Studium.',
 8:'Dein Glaube wird an Übergängen gemacht — an Verlust, an Erbe, an dem, was zu Ende geht.',
 9:'Dein Glaube wird im Glauben selbst gemacht — Lehre, Reise, Studium. Hier sitzt er bei sich.',
 10:'Dein Glaube wird in der Öffentlichkeit gemacht. Er gehört in deinen Beruf, nicht daneben.',
 11:'Dein Glaube wird in Gemeinschaft gemacht — Freundschaft, Gruppe, gemeinsame Hoffnung.',
 12:'Dein Glaube wird im Rückzug gemacht. Allein, still, ohne Zeugen.'
};

/* ── Sekte: Tag- oder Nachtchart ───────────────────────────── */
var SEKTE={
 tag:{titel:'Tagchart',
  licht:'Die <b>Sonne</b> ist dein führendes Licht. Arbeite bei Tag und mit Absicht: klar sagen, was du willst, im Hellen, mit offenen Augen.',
  gut:'Jupiter ist bei dir der Benefik der Sekte — der freundliche Planet mit Dienst. Alles, was mit Dank, Weite und Weitergeben zu tun hat, trägt bei dir mehr als bei anderen.',
  warn:'Mars ist bei dir der Malefik <i>außerhalb</i> der Sekte. Das ist die unruhigste Stelle: Alles, was über Kraft, Zwang, Hitze und Durchhalten gehen will, geht bei dir leicht schief.',
  wer:'Mars'},
 nacht:{titel:'Nachtchart',
  licht:'Der <b>Mond</b> ist dein führendes Licht. Arbeite abends und nachts, mit Gefühl und Körper als erstem Anzeiger — nicht mit Absicht und Ansage.',
  gut:'Venus ist bei dir der Benefik der Sekte. Schönheit, Duft, Musik, Hingabe, Zärtlichkeit — das ist bei dir nicht Beigabe, das ist der Hauptweg.',
  warn:'Saturn ist bei dir der Malefik <i>außerhalb</i> der Sekte. Strenge gegen sich selbst, Härte, Verzicht und Schuldgefühl sind die Stelle, an der deine Praxis kalt wird.',
  wer:'Saturn'}
};

/* ── Mondphase bei der Geburt: der Rhythmus ───────────────── */
var PHASEN=[
 {n:'Neumond',t:'Du bist in den ersten dreieinhalb Tagen nach einem Neumond geboren — in der Phase, in der noch nichts zu sehen ist. Neumond-Menschen fangen von vorn an. Du folgst keiner Karte, du zeichnest eine. Deshalb fühlt sich bei dir kein fremdes System je ganz richtig an, und deshalb <b>musst</b> du dir dein eigenes bauen. Das ist kein Eigensinn, das ist die Anlage.'},
 {n:'Sichel',t:'Du bist in der zunehmenden Sichel geboren — die Phase, in der etwas aus dem Boden kommt und noch gegen die Schwerkraft kämpft. Bei dir braucht alles Geistige einen Anlauf, und danach läuft es. Die ersten Minuten jeder Praxis sind der schwere Teil. Nicht aufhören, bevor sie vorbei sind.'},
 {n:'Erstes Viertel',t:'Du bist im ersten Viertel geboren — Halbmond, zunehmend, die Phase der Entscheidung. Du kommst über <b>Handlung</b> hinein, nicht über Stille. Eine Sache tun, die eine Wahl ist. Danach ist der Kanal offen.'},
 {n:'Vor dem Vollmond',t:'Du bist kurz vor dem Vollmond geboren — alles drängt auf Sichtbarkeit. Du brauchst Zeugen: etwas aussprechen, zeigen, jemandem geben. Allein im Kopf bleibt es unfertig.'},
 {n:'Vollmond',t:'Du bist im Vollmond geboren — Sonne und Mond sehen sich gegenüber. Bei dir kommt Klarheit im <b>Gegenüber</b>: in der Begegnung, im Gespräch, in der Spiegelung. Allein ist dein schwierigster Zustand und mit einem Menschen dein stärkster.'},
 {n:'Nach dem Vollmond',t:'Du bist nach dem Vollmond geboren — die Phase des Weitergebens. Was du empfängst, ist nicht nur für dich. Dein Kanal öffnet sich am weitesten, wenn du etwas für jemand anderen fragst.'},
 {n:'Letztes Viertel',t:'Du bist im letzten Viertel geboren — abnehmender Halbmond, die Phase des Aufräumens. Du kommst über Loslassen hinein. Wegräumen, abschließen, beenden — danach kommt der Kontakt von selbst.'},
 {n:'Balsamischer Mond',t:'Du bist im balsamischen Mond geboren — den letzten dreieinhalb Tagen vor dem Neumond, der ältesten und dünnsten Phase. In der Überlieferung sind das die Menschen, die von weit her mitbringen. Dein Zugang ist im Rückzug, im Alten, in dem, was zu Ende geht. Du brauchst mehr Alleinsein als andere, und es ist keine Schwermut.'}
];

/* ── Rhythmus: aus dem Mondzeichen ───────────────────────── */
var RHYTHMUS={
 Feuer:{min:'7 bis 10 Minuten',t:'Dein Mond steht in einem Feuerzeichen: Er hält nicht lange, dafür ist er sofort da. Kurz und heiß ist bei dir keine Abkürzung, sondern die richtige Form. Vierzig Minuten sitzen ist bei dir keine tiefere Praxis, sondern eine abgebrochene.'},
 Erde:{min:'15 bis 20 Minuten',t:'Dein Mond steht in einem Erdzeichen: Er braucht Anlauf und trägt dann lange. Gib dir Zeit zum Ankommen — die ersten fünf Minuten sind noch nichts, danach fängt es an.'},
 Luft:{min:'10 bis 15 Minuten',t:'Dein Mond steht in einem Luftzeichen: Er arbeitet im Wechsel. Zwei kürzere Einheiten mit etwas dazwischen tragen bei dir weiter als eine lange.'},
 Wasser:{min:'15 bis 25 Minuten',t:'Dein Mond steht in einem Wasserzeichen: Er geht tief und braucht danach einen Abschluss. Plan das Zurückkommen mit ein — etwas essen, Hände waschen, rausgehen.'}
};
var MONDSATURN={
 flow:'Und dein Mond steht in gutem Winkel zu Saturn: Ein fester kleiner Rahmen fühlt sich bei dir <b>nicht</b> wie Zwang an. Du kannst täglich, wenn es kurz ist. Nutz das — es ist selten.',
 spannung:'Dein Mond steht in Spannung zu Saturn: Feste Zeiten fühlen sich schnell wie Pflicht an, und dann hörst du auf. Die Lösung ist nicht mehr Disziplin, sondern eine so kleine Form, dass sie nicht wie Pflicht wirkt. Drei Minuten, die du nie auslässt, sind mehr als zwanzig, die du dreimal schaffst.',
 '':'Dein Mond ist frei von Saturn: Dein Rhythmus kommt von dir, nicht von einer Regel. Du darfst die Form öfter wechseln als andere, solange du sie überhaupt hast.'
};

/* ── Das 8. Haus: die dünne Stelle ─────────────────────────── */
var ACHT={
 Feuer:'Deine achte Stelle ist feurig: Was von der anderen Seite kommt, kommt bei dir plötzlich und deutlich — als Schreck, als Eingebung, als klarer Satz an einem unpassenden Moment.',
 Erde:'Deine achte Stelle ist erdig: Es kommt über Dinge. Erbstücke, Fotos, Gegenstände von Menschen, die nicht mehr da sind. Ein Gegenstand auf dem Tisch ist bei dir kein Symbol, sondern der Weg.',
 Luft:'Deine achte Stelle ist luftig: Es kommt als Gedanke und als Zusammenhang, oft beim Lesen oder im Gespräch über jemanden, der gestorben ist.',
 Wasser:'Deine achte Stelle ist wässrig: Es kommt im Traum und in der Stimmung. Träume sind bei dir Arbeitsmaterial und gehören notiert.'
};

/* ── Chiron: die Wunde am Empfangen ───────────────────────── */
var CHIRON={
 1:'Chiron im 1. Haus: Die Wunde sitzt an dir selbst — am Auftreten und am Benennen. Das Heilmittel steckt in derselben Stellung: Du wirst nicht sicherer, indem du länger übst, sondern indem du es <b>aussprichst</b> und einem zweiten Menschen gibst.',
 2:'Chiron im 2. Haus: Die Wunde sitzt am Wert. „Ich darf das nicht können." Gegenmittel: etwas verschenken, was du empfangen hast.',
 3:'Chiron im 3. Haus: Die Wunde sitzt im Sagen. Lernen und Erzählen war einmal gefährlich. Gegenmittel: schreiben, erst nur für dich.',
 4:'Chiron im 4. Haus: Die Wunde sitzt in der Herkunft. Zu Hause durfte es das nicht geben. Gegenmittel: einen eigenen Ort einrichten, der nur dafür da ist.',
 5:'Chiron im 5. Haus: Die Wunde sitzt an der Freude und am Zeigen. Gegenmittel: etwas machen, das niemand sehen muss.',
 6:'Chiron im 6. Haus: Die Wunde sitzt im Körper und im Dienen. Gegenmittel: Praxis als Pflege verstehen, nicht als Leistung.',
 7:'Chiron im 7. Haus: Die Wunde sitzt im Gegenüber — einmal hat jemand das Vertrauen gebrochen. Gegenmittel: ein Mensch, der zuhört, ohne zu deuten.',
 8:'Chiron im 8. Haus: Die Wunde sitzt am Übergang, am Verlust. Gegenmittel: nichts erzwingen. Hier geht es sehr langsam und dann sehr tief.',
 9:'Chiron im 9. Haus: Die Wunde sitzt am Glauben — enttäuschte Lehre, verlorene Religion. Gegenmittel: eigene Formulierung, kein fremdes Bekenntnis.',
 10:'Chiron im 10. Haus: Die Wunde sitzt am Ansehen. Die Angst, damit nicht ernstgenommen zu werden. Gegenmittel: genau das zum Beruf machen, aber sauber.',
 11:'Chiron im 11. Haus: Die Wunde sitzt in der Gruppe — irgendwann nicht dazugehört. Gegenmittel: ein kleiner Kreis, keine Bühne.',
 12:'Chiron im 12. Haus: Die Wunde sitzt im Verborgenen selbst. Oft lange niemandem erzählt. Gegenmittel: einmal aufschreiben, mit Datum, und aufheben.'
};
