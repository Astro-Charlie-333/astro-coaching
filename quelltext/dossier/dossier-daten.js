/* Astro-Charlie · Dossier — die Tafeln
   Geschrieben als Verhaltensbeschreibung, nicht als Charaktertypen:
   was man an dieser Person merkt, nicht was sie angeblich ist. */

var SIGNS=['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion',
 'Schütze','Steinbock','Wassermann','Fische'];
var GLY=['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
var HT=['Person und Auftreten','Wert und Besitz','Sprache und Nahbereich','Zuhause und Wurzeln',
 'Ausdruck und Romantik','Alltag und Arbeit','Partnerschaft','Tiefe und Geteiltes','Sinn und Weite',
 'Beruf und Sichtbarkeit','Gruppen und Ziele','Rückzug und Inneres'];
var HK=['Person','Wert','Sprache','Zuhause','Ausdruck','Alltag','Partnerschaft','Tiefe','Sinn',
 'Beruf','Gruppen','Rückzug'];
var ELN=['Feuer','Erde','Luft','Wasser'];
var MON=['kardinal','fix','veränderlich'];
var HERR=['Mars','Venus','Merkur','Mond','Sonne','Merkur','Venus','Mars','Jupiter','Saturn','Saturn','Jupiter'];
var MITHERR={Skorpion:'Pluto',Wassermann:'Uranus',Fische:'Neptun'};

/* Würden — klassisch. Merkur in Fische ist der einzige Fall, in dem
   Exil und Fall zusammenfallen; das gehört beides genannt. */
var DOMIZIL={Mars:[0,7],Venus:[1,6],Merkur:[2,5],Mond:[3],Sonne:[4],Jupiter:[8,11],Saturn:[9,10]};
var ERHOEHUNG={Sonne:0,Mond:1,Merkur:5,Venus:11,Mars:9,Jupiter:3,Saturn:6};
var WNAME={domizil:'im eigenen Zeichen',erhoehung:'in Erhöhung',exil:'im Exil',
 fall:'im Fall',exilfall:'im Exil und im Fall','':''};
var WDEUT={
 domizil:'arbeitet ungehindert — was dieser Planet im Chart zu tun hat, kann er auch',
 erhoehung:'ist überdurchschnittlich stark; diese Funktion ist eine echte Stärke der Person',
 exil:'arbeitet gegen das Material. Nicht beschädigt, aber umständlich: Was andere nebenbei können, kostet hier Aufwand',
 fall:'ist geschwächt. Die Person traut sich an dieser Stelle selbst am wenigsten zu, oft zu Unrecht',
 exilfall:'ist so schwach, wie dieser Planet stehen kann. Das heißt nicht untauglich — es heißt, dass diese Funktion einen Behelf von außen braucht, um verlässlich zu laufen'};

/* ── Der Mond: wodurch Sicherheit entsteht ───────────────────── */
var MOND=[
 'Bewegung und eigene Entscheidung. Behutsames Vorgehen wirkt hier bremsend, nicht schonend.',
 'Zeit, Ruhe und Verlässlichkeit. Zusagen zählen bei diesem Mond mehr als Einfühlung.',
 'Reden dürfen. Diese Person sortiert sich im Sprechen — Ausreden lassen ist die halbe Arbeit.',
 'Vertrautheit und spürbare Zugewandtheit. Ohne emotionale Stimmigkeit entsteht hier kein Vertrauen.',
 'Gesehenwerden. Nicht Lob im Sinne von Bewertung — ernst genommen und gewürdigt werden.',
 'Klarheit und Konkretes. Vage Deutungen machen unruhig; diese Person will etwas, das stimmt.',
 'Ausgewogenheit und ein echtes Gegenüber. Sie passt sich sonst an — frag gezielt nach Widerspruch.',
 'Ehrlichkeit ohne Umweg. Beschönigen wird sofort bemerkt und kostet dauerhaft Vertrauen.',
 'Sinn und Weite. Kleinteiliges ermüdet — zeig den größeren Zusammenhang.',
 'Struktur und Nachweis. Diese Person will wissen, wohin es geht und dass es wirkt.',
 'Freiraum. Zu viel Nähe erzeugt hier Abstand, und zwar wortlos.',
 'Behutsamkeit und Zeit. Diese Person nimmt alles auf, auch deine Stimmung.'];

/* ── Merkur: wie man mit dieser Person redet ─────────────────── */
var MERKUR=[
 'Direkt und kurz. Diese Person unterbricht und meint es nicht böse — sie ist schon weiter.',
 'Langsam und einmal. Nachfassen wirkt wie Drängeln. Antwort kommt, aber später.',
 'Schnell, assoziativ, gern mehrgleisig. Reihenfolge ist hier kein Qualitätsmerkmal.',
 'Über Beispiele und Erinnerungen. Abstraktes kommt nicht an, Geschichten schon.',
 'Mit Zuspitzung. Diese Person hört eine gut erzählte Sache besser als eine gut begründete.',
 'Genau. Ungenauigkeit wird bemerkt und untergräbt alles danach Gesagte.',
 'Im Austausch. Diese Person denkt im Vergleich — gib ihr zwei Möglichkeiten statt einer Empfehlung.',
 'Knapp, und nicht alles. Diese Person merkt, wenn etwas zurückgehalten wird, und fragt nicht nach.',
 'Groß. Zeig den Zusammenhang zuerst, die Einzelheiten danach — sonst steigt sie aus.',
 'Sachlich und ergebnisbezogen. Kein Smalltalk vorweg, das wirkt hier wie Zeitverlust.',
 'Über Prinzipien. Diese Person will das Muster verstehen, bevor sie den Einzelfall annimmt.',
 'In Bildern. Listen rutschen durch, Szenen bleiben. Schriftlich nachreichen hilft.'];

/* ── Venus: woran man merkt, dass diese Person etwas mag ────── */
var VENUS=[
 'Sie wird direkt. Begeisterung ist hier sofort sichtbar und ebenso schnell wieder weg.',
 'Sie wird anhänglich und großzügig mit Materiellem. Zuneigung zeigt sich als Versorgung.',
 'Sie redet mehr. Wer ihr wichtig ist, bekommt Nachrichten, Links, Gedanken um drei Uhr nachts.',
 'Sie kümmert sich. Essen, Fürsorge, Nachfragen. Wird leicht als Mütterlichkeit missverstanden.',
 'Sie macht etwas daraus. Geschenke, Gesten, Aufwand. Zurückhaltung wird hier als Ablehnung gelesen.',
 'Sie wird hilfreich. Sie ordnet, erinnert, erledigt. Das ist die Zuneigung, nicht die Vorstufe.',
 'Sie passt sich an. Angenehm und trügerisch — frag nach, was sie selbst will.',
 'Sie wird exklusiv. Halbe Nähe gibt es nicht; es ist entweder ganz oder gar nicht.',
 'Sie teilt ihre Welt. Bücher, Orte, Pläne. Mitkommen zählt hier mehr als Komplimente.',
 'Sie wird verbindlich. Verabredungen, Verantwortung, langfristig. Das ist bei diesem Zeichen eine Liebeserklärung.',
 'Sie bleibt, ohne zu klammern — und erwartet dasselbe. Nähe über Freiraum, nicht trotz.',
 'Sie macht keinen Unterschied mehr zwischen sich und dir. Schön und riskant; hier gehen Grenzen verloren.'];

/* ── Mars: wie diese Person handelt und wie sie wütend wird ─── */
var MARS=[
 'Sofort und laut, dann vorbei. Nicht nachtragend, aber in dem Moment schwer zu bremsen.',
 'Lange gar nicht, dann endgültig. Wenn diese Person wütend wird, ist es zu spät zum Reden.',
 'Als Wortgefecht. Scharf, schnell, und hinterher ist unklar, worum es ging.',
 'Indirekt. Rückzug, Schweigen, Kränkung statt Angriff. Du wirst es merken, aber nicht hören.',
 'Mit Stolz. Es geht um Würde, nicht um die Sache. Eine Entschuldigung wirkt hier schneller als ein Argument.',
 'Als Kritik am Detail. Die eigentliche Wut kommt verkleidet als Sachfrage.',
 'Gar nicht, bis es platzt. Diese Person vermeidet Konflikt so lange, dass die Entladung unverhältnismäßig wirkt.',
 'Kalt und zielgenau. Diese Person weiß, wo es wehtut, und trifft dort. Danach lange Funkstille.',
 'Großzügig und übertrieben. Laut, schnell wieder gut, und erstaunt, dass es jemanden verletzt hat.',
 'Kontrolliert und mit Konsequenz. Keine Szene, aber die Sache hat Folgen.',
 'Abrupt. Erst normal, dann plötzlich Abstand. Begründung kommt sachlich nach, Gefühl nicht.',
 'Diffus. Diese Person weiß selbst nicht genau, worauf sie wütend ist, und richtet es leicht gegen sich.'];

/* ── Die Sonne: worauf diese Person hinauswill ──────────────── */
var SONNE=[
 'Als Erste dort sein und etwas anfangen. Verwaltung zermürbt sie.',
 'Etwas aufbauen, das bleibt und ihr gehört.',
 'Verstehen und weitergeben. Eine Sache reicht ihr selten.',
 'Dazugehören und für jemanden wichtig sein.',
 'Etwas Eigenes schaffen und dafür gesehen werden.',
 'Es richtig machen und gebraucht werden.',
 'Zwischen Menschen etwas in Ordnung bringen.',
 'Bis auf den Grund gehen. Oberflächliches hält sie nicht aus.',
 'Weiter kommen — geografisch, gedanklich, oder beides.',
 'Etwas erreichen, das zählt. Auch gegen Widerstand.',
 'Etwas anders machen als vorgesehen.',
 'Etwas Größerem dienen, auch ohne Namen daran.'];

/* ── Aszendent: wie diese Person ankommt ───────────────────── */
var ASZ=[
 'schnell, direkt, manchmal schroffer als gemeint',
 'ruhig und beständig — wirkt belastbarer, als sie sich fühlt',
 'wach, redegewandt, schwer festzulegen',
 'zurückhaltend und freundlich, braucht länger, bis sie auftaut',
 'präsent und wärmend, nimmt Raum ein, ohne es zu merken',
 'genau und zurückgenommen, wirkt kühler als sie ist',
 'verbindlich und angenehm — und dadurch schwer einzuschätzen',
 'kontrolliert und verschlossen, wirkt intensiver, als sie will',
 'offen und direkt, wirkt unbeschwerter, als sie ist',
 'ernst und gefasst, wirkt älter und distanzierter als gemeint',
 'eigen und freundlich-distanziert, schwer zu vereinnahmen',
 'weich, durchlässig, manchmal schwer greifbar'];

/* Wenn Aszendent und Sonne weit auseinander liegen */
var ASZ_SONNE='Zwischen dem, wie diese Person wirkt, und dem, was sie antreibt, liegt ein deutlicher Unterschied. '+
 'Rechne damit, dass dein erster Eindruck in die Irre führt — und dass die Person das von anderen gewohnt ist.';

/* ── Wo das Gewicht liegt: eckig, folgend, fallend ──────────── */
var LAGE={
 eckig:{n:'auf den Ecken',t:'Der Schwerpunkt liegt in den Winkelhäusern (1, 4, 7, 10). Diese Person wirkt nach außen und wird bemerkt. Was sie tut, hat Folgen für andere — und sie merkt es nicht immer.'},
 folgend:{n:'in den folgenden Häusern',t:'Der Schwerpunkt liegt in den Häusern 2, 5, 8 und 11 — den sichernden. Diese Person baut, hält und verteidigt. Sie fängt seltener an und gibt seltener auf.'},
 fallend:{n:'in den fallenden Häusern',t:'Der Schwerpunkt liegt in den Häusern 3, 6, 9 und 12 — den vermittelnden. Diese Person verarbeitet, lernt, ordnet, gibt weiter. Sie wird oft übersehen und ist meistens diejenige, die es zusammenhält.'}};

/* ── Sekte ──────────────────────────────────────────────────── */
var SEKTE={
 tag:{n:'Tagchart',t:'Geboren bei Tageslicht. Jupiter ist der Benefik der Sekte — Weite, Zuversicht und Großzügigkeit tragen bei dieser Person weiter als bei anderen. Mars ist der Malefik außerhalb der Sekte: der ungebremste. Dort, wo Mars steht, wird am ehesten überzogen.',
  raus:'Mars'},
 nacht:{n:'Nachtchart',t:'Geboren nach Sonnenuntergang. Venus ist der Benefik der Sekte — über Schönheit, Zuwendung und Behaglichkeit erreicht man diese Person am sichersten. Saturn ist der Malefik außerhalb der Sekte: Härte gegen sich selbst, Verzicht und Schuldgefühl sind die Stelle, an der es kalt wird.',
  raus:'Saturn'}};

/* ── Mondphase bei der Geburt ───────────────────────────────── */
var PHASE=[
 ['Neumond','fängt von vorn an und folgt keiner Vorlage. Wirkt eigensinnig und ist es nicht — es gibt schlicht keine Karte, der diese Person folgen könnte.'],
 ['Sichel','braucht Anlauf, läuft dann. Die ersten Minuten jeder Sache sind der schwere Teil.'],
 ['Erstes Viertel','kommt über Handeln weiter, nicht über Nachdenken. Eine Entscheidung löst hier mehr als eine Einsicht.'],
 ['Vor dem Vollmond','braucht Zeugen. Was nicht ausgesprochen wurde, zählt für diese Person nicht als erledigt.'],
 ['Vollmond','wird im Gegenüber klar. Allein ist der schwierigste Zustand, zu zweit der stärkste.'],
 ['Nach dem Vollmond','gibt weiter. Diese Person versteht sich selbst am besten, wenn sie es jemandem erklärt.'],
 ['Letztes Viertel','kommt über Loslassen weiter. Erst wegräumen, dann Neues.'],
 ['Balsamischer Mond','braucht mehr Alleinsein als andere, und es ist keine Schwermut. Diese Person bringt etwas mit, das älter ist als sie.']];

/* ── Belastungsmuster ───────────────────────────────────────── */
var MUSTER=[
 {a:'Merkur',b:'Uranus',max:5,hart:false,n:'Sprunghaftes Denken',
  t:'Verknüpft über Ecken, ist oft drei Schritte weiter, ermüdet bei linearem Zuhören. Arbeite mit Übersicht statt mit Reihenfolge.'},
 {a:'Merkur',b:'Neptun',max:5,hart:false,n:'Denken in Bildern',
  t:'Listen rutschen durch, Geschichten bleiben. Struktur von außen hilft mehr als Motivation.'},
 {a:'Mond',b:'Uranus',max:5,hart:false,n:'Reizempfindliches Nervensystem',
  t:'Fährt spät herunter und sprunghaft hoch. Feste Aufstehzeiten helfen mehr als Abendrituale.'},
 {a:'Mars',b:'Saturn',max:5,hart:true,n:'Gas und Bremse gleichzeitig',
  t:'Ein Teil der Energie geht ins Selbstbremsen — ein normaler Tag kostet mehr als bei anderen. Das ist keine Faulheit.'},
 {a:'Mond',b:'Neptun',max:5,hart:false,n:'Dünne Grenze zwischen eigenem und fremdem Gefühl',
  t:'Übernimmt Stimmungen aus dem Raum, ohne es zu merken, und hält sie für die eigenen.'},
 {a:'Mond',b:'Pluto',max:5,hart:true,n:'Gefühl mit Wucht',
  t:'Nichts bleibt klein. Was andere ärgert, erschüttert hier — und wird selten gezeigt.'},
 {a:'Sonne',b:'Saturn',max:5,hart:true,n:'Es reicht nie',
  t:'Leistung wird nicht als Beweis verbucht, sondern als Mindeststandard. Erfolge zählen bei dieser Person nicht.'},
 {a:'Venus',b:'Saturn',max:5,hart:true,n:'Zuneigung unter Vorbehalt',
  t:'Rechnet damit, dass Zuwendung an Bedingungen hängt — und prüft deshalb lange, bevor sie sich darauf verlässt.'},
 {a:'Merkur',b:'Saturn',max:5,hart:true,n:'Vorsicht beim Sagen',
  t:'Denkt gründlich und äußert spät. Schweigen heißt hier nicht Ablehnung, sondern dass es noch nicht fertig ist.'},
 {a:'Mars',b:'Pluto',max:5,hart:true,n:'Alles oder nichts',
  t:'Kein mittleres Tempo. Entweder volle Wucht oder Stillstand — und beides hält lange an.'}];

/* ── Themen: aus der bisherigen Fassung übernommen ─────────── */
var THEMEN=[
 {n:'Selbstwert', s:'raum-selbstwert.html', anker:{haeuser:[2,1,10], punkte:['Venus','Saturn','Lilith']},
  kern:'Was die Person sich zutraut und zugesteht — in Geld, in Grenzen, im Raum, den sie einnimmt.',
  hilfe:'Nicht über Argumente arbeiten, sondern über Erfahrung: eine kleine Forderung, die gelingt, verändert mehr als zehn Einsichten.'},
 {n:'Berufung', s:'raum-berufung.html', anker:{haeuser:[10,6,2,9], punkte:['MC','Jupiter','Saturn']},
  kern:'Wofür die Person da ist und wie sie sichtbar wird — inklusive der Frage, wovon sie lebt.',
  hilfe:'Nicht nach Leidenschaft fragen, sondern nach Hyperfokus: Wobei vergisst die Person zu essen? Das ist verlässlicher.'},
 {n:'Nähe', s:'raum-naehe.html', anker:{haeuser:[7,5,8], punkte:['Venus','Mars','Mond']},
  kern:'Was sich in Beziehungen wiederholt und woran es regelmäßig kippt.',
  hilfe:'Nach dem Abbruchpunkt fragen, nicht nach dem Partnertyp. Wann kippt es — nach wie vielen Wochen, nach welchem Ereignis?'},
 {n:'Herkunft', s:'raum-herkunft.html', anker:{haeuser:[4,3], punkte:['Mond','Saturn','Pluto']},
  kern:'Was aus der Familie mitläuft — Atmosphäre, Erwartungen, unausgesprochene Sätze.',
  hilfe:'Vorsichtig und langsam. Nicht graben. Wenn mehr kommt als Erinnerung, ist die Grenze erreicht.'},
 {n:'Der wunde Punkt', s:'raum-wunder-punkt.html', anker:{haeuser:[12], punkte:['Chiron','Saturn']},
  kern:'Die Stelle, an der Kleinigkeiten unverhältnismäßig treffen — und woraus Überkompensation entsteht.',
  hilfe:'Nicht auf Heilung hinarbeiten. Das Ziel ist Umgang, nicht Verschwinden. Die Übertreibung würdigen, bevor man sie hinterfragt.'},
 {n:'Das Unerlaubte', s:'raum-unerlaubte.html', anker:{haeuser:[8,12], punkte:['Lilith','Pluto','Mars']},
  kern:'Welcher Anteil keinen Platz bekommt — und wie viel Energie darin eingesperrt ist.',
  hilfe:'Erst benennen lassen, nicht befreien. Und vorher sagen, dass es sich falsch anfühlen wird — sonst bricht die Person beim ersten Unbehagen ab.'},
 {n:'Zugehörigkeit', s:'raum-zugehoerigkeit.html', anker:{haeuser:[11,3], punkte:['Uranus','Saturn','Sonne']},
  kern:'Wie die Person in Gruppen steht und was Dazugehören sie kostet.',
  hilfe:'Nicht auf mehr Geselligkeit hinarbeiten. Manche brauchen weniger Gruppe, nicht mehr.'},
 {n:'Anders verdrahtet', s:'raum-anders-verdrahtet.html', anker:{haeuser:[6,12,3], punkte:['Merkur','Uranus','Mond']},
  kern:'Wo im Alltag Kraft verlorengeht — Reizverarbeitung, Energie, Struktur.',
  hilfe:'Mechanismen statt Motivation. Anhängen statt neu planen, sichtbar machen, Hürden senken.'},
 {n:'Alltag und Struktur', s:'raum-alltag.html', anker:{haeuser:[6,4], punkte:['Saturn','Mond','Merkur']},
  kern:'Welche Art von Struktur bei dieser Person hält und warum Systeme scheitern.',
  hilfe:'Nach dem einen System fragen, das mal gehalten hat. Was daran anders war, ist die Antwort.'},
 {n:'Körper', s:'raum-koerper.html', anker:{haeuser:[1,6], punkte:['Mars','ASC','Venus']},
  kern:'Körperliche Präsenz, Bewegung, wo sich Anspannung sammelt.',
  hilfe:'Keine Zahlen, keine Pläne. Bei Essen, Gewicht oder Kontrolle sofort abgeben.'},
 {n:'Sicherheit und Nähe', s:'raum-sicherheit.html', anker:{haeuser:[8,4,1], punkte:['Mond','Lilith','Pluto']},
  kern:'Was die Person braucht, um sich sicher zu fühlen und loszulassen.',
  hilfe:'Nur so weit, wie die Person öffnet. Nie nachfragen, nie konkretisieren. Bei Übergriffserfahrungen sofort verweisen.'},
 {n:'Versorgung', s:'raum-versorgung.html', anker:{haeuser:[6,2], punkte:['Mond','Saturn','Neptun']},
  kern:'Essen, Trinken, Papierkram, Schlaf — das Langweilige, das alles trägt.',
  hilfe:'An der klemmenden Stufe ansetzen, nicht am Vorsatz. Und keine Mengen, keine Ziele.'}
];
