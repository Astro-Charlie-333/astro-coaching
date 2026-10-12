/* ── Beziehungen: Rollen, Themen, Umgangshinweise ─────── */

/* Beziehungsarten. gew = welche Kontakte in dieser Beziehung zählen,
   du/sie = wie die beiden angesprochen werden, art = romantisch oder nicht. */
var ROLLE={
 liebe:{n:'Liebe / Partnerschaft', romantisch:true,
  gew:{'Venus|Mars':2.2,'Mond|Sonne':2.2,'Mond|Mond':1.8,'Venus|Venus':1.6,'Mond|Venus':1.8,
       'Mars|Mars':1.3,'Saturn|Venus':1.5,'Mond|Saturn':1.5,'Pluto|Venus':1.4,'Sonne|Sonne':1.4},
  haus:[7,5,8], was:'Nähe, Anziehung und wie ihr euch im Alltag vertragt'},
 freundschaft:{n:'Freundschaft', romantisch:false,
  gew:{'Merkur|Merkur':2.0,'Jupiter|Sonne':1.8,'Mond|Mond':1.6,'Merkur|Mond':1.6,
       'Uranus|Sonne':1.4,'Jupiter|Mond':1.5,'Sonne|Sonne':1.3,'Saturn|Merkur':1.2},
  haus:[11,3,9], was:'wie leicht ihr miteinander könnt und woran es gelegentlich hängt'},
 mutter:{n:'Mutter', romantisch:false, eltern:true,
  gew:{'Mond|Mond':2.2,'Mond|Saturn':2.0,'Mond|Sonne':1.8,'Saturn|Sonne':1.6,
       'Mond|Pluto':1.6,'Merkur|Mond':1.4,'Saturn|Saturn':1.2},
  haus:[4,10,12], was:'das Muster zwischen euch — und wo es heute noch greift'},
 vater:{n:'Vater', romantisch:false, eltern:true,
  gew:{'Saturn|Sonne':2.2,'Sonne|Sonne':1.8,'Mond|Saturn':1.8,'Mars|Sonne':1.5,
       'Saturn|Mars':1.5,'Jupiter|Sonne':1.3,'Pluto|Sonne':1.4},
  haus:[10,4,9], was:'das Muster zwischen euch — und wo es heute noch greift'},
 kind:{n:'Eigenes Kind', romantisch:false, kind:true,
  gew:{'Mond|Mond':2.2,'Mond|Sonne':2.0,'Merkur|Mond':1.8,'Saturn|Mond':1.8,
       'Mars|Mond':1.5,'Venus|Mond':1.5,'Jupiter|Sonne':1.3},
  haus:[5,4,11], was:'wie du dieses Kind erreichst und wo du ihm im Weg stehst'},
 geschwister:{n:'Geschwister', romantisch:false,
  gew:{'Merkur|Merkur':2.0,'Mars|Mars':1.8,'Mond|Mond':1.6,'Sonne|Mars':1.5,
       'Merkur|Mars':1.5,'Saturn|Sonne':1.3,'Mond|Mars':1.4},
  haus:[3,11,4], was:'eure alte Rollenverteilung und was davon noch läuft'},
 kollegin:{n:'Arbeit / Kollegin', romantisch:false,
  gew:{'Merkur|Merkur':2.0,'Saturn|Sonne':1.8,'Mars|Mars':1.6,'Saturn|Mars':1.6,
       'Merkur|Saturn':1.5,'Jupiter|Merkur':1.3,'Sonne|Sonne':1.2},
  haus:[6,10,11], was:'wie ihr zusammen arbeitet, ohne euch gegenseitig aufzuhalten'},
 tier:{n:'Tier', romantisch:false, tier:true,
  gew:{'Mond|Mond':2.2,'Mars|Mond':1.8,'Venus|Mond':1.6,'Saturn|Mond':1.8,
       'Mond|Sonne':1.5,'Mars|Mars':1.4},
  haus:[6,5,12], was:'das Temperament deines Tiers und wie ihr euch im Alltag vertragt'},
 sonstige:{n:'Sonstige', romantisch:false,
  gew:{'Mond|Mond':1.6,'Merkur|Merkur':1.6,'Sonne|Mond':1.5,'Saturn|Sonne':1.3},
  haus:[7,11,3], was:'was zwischen euch leicht geht und was reibt'}
};

/* Themen: welche Abschnitte gezeigt werden */
var THEMA={
 komplett:   {n:'Komplett',             zeig:['grund','erreichen','reden','kontakte','streit','helfen','haeuser','jetzt']},
 kommunikation:{n:'Kommunikation',      zeig:['reden','kontakte','streit','jetzt']},
 naehe:      {n:'Nähe und Zuneigung', zeig:['grund','erreichen','kontakte','jetzt']},
 reibung:    {n:'Reibung und Konflikt', zeig:['streit','kontakte','jetzt']},
 alltag:     {n:'Alltag',               zeig:['grund','haeuser','kontakte','jetzt']},
 helfen:     {n:'Unterstützen',     zeig:['erreichen','helfen','reden','jetzt']}
};

/* ── Wie du diesen Menschen erreichst — nach seinem Mond ── */
var ERREICHEN=[
 ['Direkt und sofort. Lange Vorreden machen es schlimmer — sag es in einem Satz und bleib dann da.','Warten, bis der erste Ärger durch ist. Der geht schnell hoch und genauso schnell wieder weg.'],
 ['Über etwas Handfestes. Tee, Essen, eine Decke, nebeneinandersitzen. Reden kommt später oder gar nicht.','Drängen. Wer hier schiebt, erreicht das Gegenteil — und das hält dann tagelang.'],
 ['Über Reden. Fragen stellen, zuhören, weiterfragen. Beim Sprechen sortiert sich bei diesem Menschen das Gefühl erst.','Schweigen als Antwort. Das wird sofort als Strafe gelesen.'],
 ['Über Zugewandtheit und ein bisschen Zeit. Erst wenn klar ist, dass du bleibst, kommt das Eigentliche.','Sachlichkeit im falschen Moment. Erst das Gefühl ernst nehmen, dann die Lösung.'],
 ['Über Anerkennung. Sag, was du an der Sache gut findest, bevor du sagst, was fehlt.','Vor anderen korrigieren. Das trifft tiefer, als es aussieht.'],
 ['Über Hilfe bei etwas Konkretem. Nicht fragen, wie es geht — fragen, was du übernehmen kannst.','Große Gefühlsgespräche. Die machen hier eher Druck als Erleichterung.'],
 ['Über Ruhe im Raum. Erst Spannung rausnehmen, dann reden.','Ultimaten. Zwischen zwei Lagern zu stehen ist hier der schlimmste Zustand.'],
 ['Über Verlässlichkeit und Diskretion. Was du erfährst, bleibt bei dir — und das muss spürbar sein.','Bohren. Fragen bringen hier gar nichts, Zeit und Ruhe schon.'],
 ['Über Bewegung und Perspektive. Rausgehen, laufen, das Große Ganze ansprechen.','Einengen. Trost, der sich wie Festhalten anfühlt, treibt diesen Menschen weg.'],
 ['Über Zuständigkeit. Sag, was du übernimmst, und mach es dann auch.','Mitleid. Das wird hier als Abwertung gehört, nicht als Wärme.'],
 ['Über Abstand mit offener Tür. Angebot machen, dann in Ruhe lassen.','Dauerpräsenz. Nähe auf Anordnung löst hier Flucht aus.'],
 ['Über Stimmung statt über Worte. Musik, Wasser, zusammen schweigen. Dieser Mensch nimmt auf, wie du dich fühlst, nicht nur was du sagst.','Analysieren. Zerlegen hilft hier nicht, Mitschwingen schon.']];

/* ── Wie du mit diesem Menschen redest — nach seinem Merkur ── */
var REDEN=[
 ['Kurz und direkt. Komm zum Punkt, der Rest nervt.','Lange Einleitungen.'],
 ['Langsam und konkret. Ein Gedanke nach dem anderen, gern mit Beispiel.','Tempo und viele Themen auf einmal.'],
 ['Schnell und in Sprungbewegungen. Hier darf man abschweifen — es kommt zurück.','Darauf bestehen, bei einer Sache zu bleiben.'],
 ['Behutsam. Pack das Sachliche in etwas Persönliches, sonst kommt es nicht an.','Nüchternheit. Wird als Kälte gehört.'],
 ['Groß und klar. Bilder, Beispiele, ein bisschen Dramatik — das funktioniert hier wirklich.','Kleinteiligkeit.'],
 ['Präzise. Wer hier unsauber formuliert, bekommt eine Korrektur statt einer Antwort.','Ungefähre Aussagen.'],
 ['Höflich und ausgewogen. Nenn beide Seiten, dann deine.','Frontale Ansagen.'],
 ['Ehrlich und ohne Beschönigen. Dieser Mensch merkt sofort, wenn etwas weggelassen wird.','Halbwahrheiten — die kosten das Vertrauen für Monate.'],
 ['Offen und mit Begründung. Das Warum ist hier wichtiger als das Was.','Anweisungen ohne Grund.'],
 ['Sachlich und belegt. Zahlen, Termine, Zuständigkeiten.','Vages. Wird als Unernst gewertet.'],
 ['Auf Augenhöhe und ohne Konvention. Hier zählt das Argument, nicht die Form.','Hierarchie durchblicken lassen.'],
 ['Weich und mit Raum. Lass Pausen, dräng nicht auf eine Antwort im selben Moment.','Direkte Fragen mit Antwortzwang.']];

/* ── Wie dieser Mensch streitet — nach seinem Mars ── */
var STREIT=[
 ['Laut, sofort und schnell vorbei. Nicht persönlich nehmen, aber auch nicht wegducken.','Warte zehn Minuten, dann ist es meist schon durch.'],
 ['Gar nicht — bis es zu viel ist. Dann unbeweglich.','Früh ansprechen, bevor sich etwas festsetzt.'],
 ['Mit Worten und schnell. Diskussionen können hier über das Ziel hinausschießen.','Nicht auf jede Formulierung eingehen. Die Hälfte war Tempo, nicht Absicht.'],
 ['Indirekt und gekränkt. Rückzug statt Angriff.','Nachgehen, aber ohne Druck. Die Tür offen lassen.'],
 ['Groß und stolz. Gesichtsverlust ist hier das eigentliche Thema.','Eine Brücke bauen, die niemanden klein macht.'],
 ['Über Kritik an Details. Der Streit läuft nie über das, worum es geht.','Nach dem eigentlichen Punkt fragen.'],
 ['Gar nicht gern — und dann irgendwann alles auf einmal.','Früher fragen, ob etwas offen ist. Hier wird viel geschluckt.'],
 ['Lange leise, dann sehr genau. Hier wird nichts vergessen.','Ehrlich bleiben. Taktik wird durchschaut und nachgetragen.'],
 ['Laut und grundsätzlich. Aus dem Thema wird schnell eine Weltanschauung.','Auf den konkreten Fall zurückholen.'],
 ['Kühl und mit Argumenten. Wirkt beherrscht und ist es nicht immer.','Sachlich bleiben. Emotionale Appelle verfehlen hier.'],
 ['Plötzlich und überraschend — oder mit demonstrativer Distanz.','Nicht festhalten. Der Raum bringt mehr als die Aussprache.'],
 ['Durch Verschwinden. Direkte Konfrontation wird vermieden.','Konkret werden und klein anfangen. Vorwürfe führen hier nirgendwohin.']];

/* ── Wie du diesem Menschen hilfst — nach seinem Mond ── */
var HELFEN=[
 'Tu etwas, statt zu fragen. Handeln ist hier Trost.',
 'Sorg für Versorgung und Ruhe. Essen, Schlaf, nichts Ändern.',
 'Hör zu und stell Fragen. Reden ist hier schon die halbe Lösung.',
 'Sei verlässlich da. Nicht lösen — bleiben.',
 'Sag, was du an diesem Menschen schätzt. Ernst gemeint, nicht als Aufmunterung.',
 'Nimm eine konkrete Aufgabe ab. Eine, die du dann auch wirklich machst.',
 'Stell Frieden her. Auch wenn der Streit gar nicht dieser Person gehört.',
 'Halt es aus, ohne nachzufragen. Deine Ruhe ist hier das Angebot.',
 'Geh mit raus. Bewegung und Horizont wirken hier besser als Gespräche.',
 'Übernimm Verantwortung für eine Sache. Das entlastet mehr als Zuspruch.',
 'Gib Raum und sag, dass du da bist. Beides gleichzeitig.',
 'Sei einfach da und sei ruhig dabei. Dieser Mensch nimmt deinen Zustand auf.'];

/* ── Tiere: Temperament nach Mondzeichen ── */
var TIER_MOND=[
 'Schnell hochzufahren und schnell wieder runter. Braucht Auslastung, sonst sucht es sich welche.',
 'Gemütlich und futterorientiert. Veränderungen im Ablauf gehen schlecht rein.',
 'Neugierig, zappelig, leicht abgelenkt. Reagiert stark auf Stimmen und Geräusche.',
 'Anhänglich und stimmungsempfindlich. Merkt sofort, wenn im Haus etwas nicht stimmt.',
 'Will gesehen werden. Macht Theater, wenn die Aufmerksamkeit woanders liegt.',
 'Pingelig, strukturiert, empfindlicher Magen. Routine ist hier keine Macke, sondern Bedarf.',
 'Verträglich und ausgleichend. Streit in der Wohnung belastet dieses Tier sichtbar.',
 'Intensiv und misstrauisch gegenüber Fremden. Bindet sich dafür vollständig.',
 'Bewegungshungrig und unternehmungslustig. Enge Wohnungen sind das Hauptproblem.',
 'Ruhig, ausdauernd, etwas ernst. Braucht klare Regeln und hält sich dann daran.',
 'Eigensinnig und schwer zu berechnen. Macht Dinge aus eigenem Antrieb, nicht auf Zuruf.',
 'Sensibel, weich, leicht überfordert. Nimmt die Stimmung der Menschen auf wie ein Schwamm.'];

/* ── Kontaktdeutungen. Schlüssel: alphabetisch sortiertes Paar. ──
   [weich, hart] je Fassung; r = romantische Fassung, falls nötig. */
var KONTAKT={

 'Mond|Sonne':{akteur:'Sonne',
  w:{tut:'{A} geht voran und sagt, wo es langgeht.',
     an:'{B} fühlt sich dabei nicht überfahren, sondern mitgenommen. Das ist seltener, als es klingt — bei den meisten Menschen erzeugt eine fremde Richtung Widerstand, hier nicht.',
     hilft:'Nichts. Das ist die Stelle, an der ihr nichts tun müsst. Merkt sie euch für die Tage, an denen anderes hakt.'},
  h:{tut:'{A} will etwas erreichen und zieht Richtung Ziel.',
     an:'{B} braucht in dem Moment Sicherheit und zieht Richtung Ruhe. Beides ist berechtigt, und deshalb endet es immer wieder in derselben Diskussion — nur mit wechselndem Anlass.',
     hilft:'Nicht den Anlass verhandeln, sondern die Reihenfolge: erst zehn Minuten ankommen, dann planen. Wer das umdreht, streitet.'},
  rw:{tut:'{A} gibt den Takt vor, ohne es zu merken.',
      an:'{B} kann in diesem Takt leben, ohne sich zu verbiegen. Das ist die klassische Paarverbindung — ihr passt im Grundrhythmus, ohne daran zu arbeiten.',
      hilft:'Nichts erzwingen. Die Verbindung trägt von selbst, solange ihr sie nicht überschreibt.'},
  rh:{tut:'{A} zieht nach vorn: Pläne, Aufbruch, das nächste Ding.',
      an:'{B} braucht zuerst, dass das Jetzige steht. Ihr wollt dasselbe Leben und braucht verschiedene Geschwindigkeiten dorthin.',
      hilft:'Zwei Termine statt einem Streit: einer für das Nächste, einer nur fürs Dableiben. Beide ernst nehmen.'}},

 'Mond|Mond':{
  w:{tut:'Ihr beruhigt euch auf ähnliche Weise.',
     an:'Schweigen zwischen euch ist entspannt und nicht peinlich. Ihr müsst einander den eigenen Zustand nicht erklären — er ist dem anderen vertraut.',
     hilft:'Darauf verlassen. Wenn es einem schlecht geht, ist die andere die naheliegende Adresse, und zwar ohne Vorrede.'},
  h:{tut:'Ihr braucht in denselben Momenten Gegensätzliches: die eine Nähe, die andere Luft.',
     an:'Es fühlt sich an, als würde die andere im falschen Moment weggehen oder zu nah kommen. Dabei folgt jede nur ihrem eigenen Takt.',
     hilft:'Den Takt aussprechen, bevor er kollidiert: „Ich brauche jetzt eine Stunde für mich und komme dann wieder." Der zweite Halbsatz ist der wichtige.'}},

 'Mars|Venus':{akteur:'Mars',
  w:{tut:'{A} geht auf {B} zu — direkt, körperlich, ohne lange Vorrede.',
     an:'{B} mag genau diese Art. Es funkt, und zwar ohne dass einer sich anstrengen müsste.',
     hilft:'Nichts. Diese Anziehung hält, solange keiner sie zerredet.'},
  h:{tut:'{A} drängt, fordert, wird ungeduldig.',
     an:'{B} will Einvernehmen und zieht sich bei Druck zurück — was {A} wiederum als Ablehnung liest und noch mehr drängt.',
     hilft:'{A} macht einen Schritt weniger, {B} sagt einen Satz mehr. Beides fällt beiden schwer und löst fast immer die Schleife.'},
  rw:{tut:'{A} begehrt sichtbar und ohne Umweg.',
      an:'{B} wird gern so begehrt. Das ist der Kontakt, den viele suchen und wenige haben — und er verliert sich nicht nach zwei Jahren.',
      hilft:'Nichts. Höchstens: nicht für selbstverständlich halten.'},
  rh:{tut:'{A} will Nähe sofort und ganz.',
      an:'{B} will sie auch, aber anders getaktet. Die Anziehung bleibt stark und übersetzt sich regelmäßig in Streit — das eine lässt sich hier vom anderen kaum trennen.',
      hilft:'Den Streit nicht für ein Zeichen halten, dass es nicht passt. Aber auch nicht zur Gewohnheit machen: Wenn jede Nähe über einen Konflikt läuft, ist das ein Muster und kein Temperament.'}},

 'Merkur|Merkur':{
  w:{tut:'Ihr denkt in ähnlichem Tempo und ähnlichen Sprüngen.',
     an:'Halbe Sätze reichen. Ihr müsst euch selten erklären, und Gespräche gehen weiter, wo sie aufgehört haben.',
     hilft:'Wichtiges trotzdem einmal ganz aussprechen. Gerade weil ihr euch versteht, bleiben Dinge unausgesprochen, die beide für geklärt halten.'},
  h:{tut:'Die eine denkt schnell und assoziativ, die andere gründlich und der Reihe nach.',
     an:'Die Schnelle hält die Gründliche für zäh, die Gründliche hält die Schnelle für oberflächlich. Keins von beidem stimmt — es ist nur verschiedenes Tempo.',
     hilft:'Schriftlich, wenn es wichtig ist. Im Geschriebenen verschwindet der Tempounterschied, und übrig bleibt die Sache.'}},

 'Mond|Saturn':{akteur:'Saturn',
  w:{tut:'{A} bleibt ruhig, wenn es bei {B} wackelt, und wird nicht mitgerissen.',
     an:'{B} erlebt {A} als verlässlich — als jemanden, bei dem ein Gefühl nicht sofort eine Krise wird.',
     hilft:'{A} darf das ruhig sagen statt nur tun: „Ich bleib da." Bei diesem Kontakt wirkt der Satz länger als die Geste.'},
  h:{tut:'{A} reagiert auf Gefühle mit Sachlichkeit, Einwänden oder Schweigen — oft gar nicht abwertend gemeint, sondern aus Verlegenheit.',
     an:'{B} erlebt das als Kälte und zieht sich zurück, meist ohne es zu sagen. Mit der Zeit zeigt {B} immer weniger und wirkt dadurch auf {A} unnahbar, was alles verstärkt.',
     hilft:'{A} sagt zuerst einen Satz, der nichts löst: „Das klingt mies." Erst danach das Praktische. Diese Reihenfolge ist bei diesem Kontakt der ganze Unterschied.'}},

 'Saturn|Sonne':{akteur:'Saturn',
  w:{tut:'{A} nimmt {B} ernst und zeigt Zutrauen, ohne groß darüber zu reden.',
     an:'{B} erlebt eine Verbindung, die hält — jemanden, der auch dann noch da ist, wenn es gerade nichts zu feiern gibt.',
     hilft:'Das Zutrauen ab und zu aussprechen. {B} merkt es sonst erst, wenn es weg ist.'},
  h:{tut:'{A} bremst, prüft, weist auf das hin, was noch fehlt.',
     an:'{B} fühlt sich klein gemacht, auch wenn {A} nur gründlich sein wollte. Bei diesem Kontakt landet Kritik nicht bei der Sache, sondern bei der Person.',
     hilft:'{A} sagt zuerst, was schon gut ist, und zwar konkret. Nicht aus Höflichkeit — bei diesem Kontakt kommt sonst nur die Einschränkung an.'}},

 'Jupiter|Sonne':{akteur:'Jupiter',
  w:{tut:'{A} findet {B} gut und lässt es merken — Zuspruch, Türen, Gelegenheiten.',
     an:'{B} wird in {A}s Gegenwart größer, traut sich mehr und wird dabei nicht übermütig.',
     hilft:'Nichts. Das ist die freundlichste Verbindung im ganzen Repertoire. Nutzt sie für die Sachen, die {B} allein nicht anfangen würde.'},
  h:{tut:'{A} redet {B} zu, macht größer, sieht Möglichkeiten.',
     an:'{B} sagt Dinge zu, die sich später nicht halten lassen, und steht hinterher mit dem Problem allein da. {A} merkt das selten, weil es gut gemeint war.',
     hilft:'Vor jeder Zusage eine Nacht. Bei diesem Kontakt ist die Begeisterung von beiden echt und die Einschätzung von beiden zu optimistisch.'}},

 'Mond|Venus':{akteur:'Venus',
  w:{tut:'{A} macht es {B} angenehm — ohne Aufwand, oft ohne Absicht.',
     an:'{B} fühlt sich in {A}s Nähe wohl und entspannt schneller als sonst. Das ist der Kontakt, der Freundschaften lange hält.',
     hilft:'Nichts.'},
  h:{tut:'{A} zeigt Zuneigung in der eigenen Sprache.',
     an:'{B} braucht sie anders und spürt eine Lücke, die sich schlecht benennen lässt — weil ja offensichtlich etwas Nettes passiert ist. Das macht es schwer anzusprechen.',
     hilft:'Einmal konkret fragen: „Woran merkst du, dass ich dich mag?" Die Antwort ist bei diesem Kontakt fast immer eine andere, als {A} erwartet.'}},

 'Mars|Mars':{
  w:{tut:'Ihr geht Dinge ähnlich an und in ähnlichem Tempo.',
     an:'Zusammen etwas anzufangen geht leicht. Keiner muss den anderen antreiben oder bremsen.',
     hilft:'Nichts — außer daran denken, dass andere euer gemeinsames Tempo anstrengend finden.'},
  h:{tut:'Ihr geht Dinge entgegengesetzt an: die eine sofort, die andere erst richtig.',
     an:'Jede hält das Vorgehen der anderen für den Fehler. Aus einer Sachfrage wird deshalb schnell ein Machtkampf, obwohl es um die Sache gar nicht mehr geht.',
     hilft:'Aufteilen statt abstimmen. Zwei Zuständigkeiten nebeneinander funktionieren hier besser als eine gemeinsame Entscheidung.'}},

 'Mars|Saturn':{akteur:'Saturn',
  w:{tut:'{A} gibt {B}s Kraft eine Form: Plan, Reihenfolge, Ausdauer.',
     an:'{B} kommt weiter als allein, weil der Schwung nicht gleich wieder versickert.',
     hilft:'{A} setzt den Rahmen, {B} füllt ihn. Umgekehrt geht es bei diesem Kontakt schief.'},
  h:{tut:'{A} bremst, {B} drückt. Beide finden sich im Recht.',
     an:'{B} erlebt {A} als Verhinderung, {A} erlebt {B} als rücksichtslos. Das ist der Kontakt, bei dem am meisten Kraft zwischen zwei Menschen verlorengeht, ohne dass etwas passiert.',
     hilft:'Einen Probelauf mit Enddatum vereinbaren. {B} darf loslegen, {A} bekommt einen Termin, an dem geprüft wird. Beide bekommen, was sie brauchen.'}},

 'Merkur|Mond':{akteur:'Merkur',
  w:{tut:'{A} findet Worte für das, was {B} fühlt.',
     an:'{B} fühlt sich verstanden, noch bevor klar ist, worum es überhaupt geht. Das ist der Kontakt, über den Freundschaften laufen.',
     hilft:'Nichts.'},
  h:{tut:'{A} redet, erklärt, analysiert.',
     an:'{B} ist noch beim Fühlen und erlebt das Reden als Überrollen. {B} sagt dann nichts mehr, und {A} hält das für Einverständnis.',
     hilft:'{A} fragt und wartet zehn Sekunden. Nicht fünf — zehn. Bei diesem Kontakt passiert die ganze Arbeit in dieser Pause.'}},

 'Pluto|Venus':{akteur:'Pluto',
  w:{tut:'{A} nimmt {B} ganz ernst, ohne Halbheiten.',
     an:'{B} erlebt eine Intensität, die schmeichelt und trägt. Mit {A} gibt es keine beiläufige Beziehung.',
     hilft:'Daran denken, dass diese Dichte für Außenstehende schwer auszuhalten ist. Nach außen ruhig etwas kleiner machen.'},
  h:{tut:'{A} will alles wissen, hält fest, prüft.',
     an:'{B} empfindet die Nähe als Besitz und fängt an, Dinge auszulassen — nicht aus Falschheit, sondern um Luft zu haben. Was {A} wiederum bestätigt.',
     hilft:'{A} stellt eine Frage weniger und erträgt die Lücke. {B} erzählt eine Sache mehr, unaufgefordert. Beides ist unangenehm und löst den Kreis.'}},

 'Mond|Pluto':{akteur:'Pluto',
  w:{tut:'{A} hält {B}s schwierige Seiten aus, ohne zu erschrecken.',
     an:'{B} kann bei {A} Dinge sagen, die sonst unausgesprochen bleiben. Das bindet stark.',
     hilft:'Nichts — aber wissen, dass eine Trennung bei diesem Kontakt überdurchschnittlich lange nachwirkt.'},
  h:{tut:'{A} berührt bei {B} etwas Altes, meist ungewollt und oft durch Kleinigkeiten.',
     an:'{B} reagiert unverhältnismäßig heftig und kann hinterher selbst nicht erklären, warum. {A} fühlt sich zu Unrecht beschuldigt.',
     hilft:'Im Moment nicht klären. Später, ruhig, die Frage: „Woran hat dich das erinnert?" Fast immer nicht an {A}.'}},

 'Sonne|Sonne':{
  w:{tut:'Ihr wollt im Kern Ähnliches.',
     an:'Ihr versteht ohne Erklärung, was der anderen wichtig ist. Das macht gemeinsame Vorhaben leicht.',
     hilft:'Nichts — außer: Ähnlichkeit heißt nicht Einigkeit. Ihr könnt dasselbe wollen und euch über den Weg streiten.'},
  h:{tut:'Ihr wollt beide die Richtung bestimmen.',
     an:'Keine kann hier gut folgen, und das schwelt. Aus kleinen Fragen werden Grundsatzfragen, weil es nicht um die Sache geht, sondern darum, wer entscheidet.',
     hilft:'Gebiete aufteilen, dauerhaft. Eine entscheidet beim einen, die andere beim anderen, und zwar ohne Rückfrage. Alles andere wird hier zum Dauerkonflikt.'}},

 'Merkur|Saturn':{akteur:'Saturn',
  w:{tut:'{A} hört genau zu und hält {B} an der Sache.',
     an:'{B} denkt in {A}s Gegenwart klarer, weil nichts durchgeht, was nicht stimmt.',
     hilft:'Nichts. Für alles Schriftliche und alles, was stimmen muss, seid ihr ein gutes Gespann.'},
  h:{tut:'{A} widerspricht, korrigiert, fragt nach Belegen.',
     an:'{B} fängt an, sich vorab zu rechtfertigen, und sagt irgendwann die halben Gedanken nicht mehr. Das Gespräch wird dünner, ohne dass einer es merkt.',
     hilft:'Eine Runde ohne Einwände: {B} redet zu Ende, {A} fragt erst danach. Zehn Minuten reichen, um den Unterschied zu sehen.'}},

 'Sonne|Uranus':{akteur:'Uranus',
  w:{tut:'{A} bringt {B} auf Ideen, die allein nicht entstanden wären.',
     an:'{B} erlebt {A} als befreiend — jemanden, bei dem die eigenen Regeln kurz nicht gelten.',
     hilft:'Daraus etwas Konkretes machen, solange der Schwung da ist. Bei diesem Kontakt verpufft sonst viel.'},
  h:{tut:'{A} ist unberechenbar: sagt ab, ändert Pläne, taucht wieder auf.',
     an:'{B} hat nie Boden unter den Füßen, und das untergräbt mehr als jeder Streit. {A} versteht die Aufregung nicht — gemeint war nie etwas Persönliches.',
     hilft:'Verlässlichkeit an einer einzigen Stelle vereinbaren — ein fester Termin in der Woche, der nicht verschoben wird. Der Rest darf beweglich bleiben.'}},

 'Mars|Mond':{akteur:'Mars',
  w:{tut:'{A} handelt, wo {B} fühlt — macht, besorgt, regelt.',
     an:'{B} erlebt das als Fürsorge und kommt schneller zur Ruhe, als Reden es schaffen würde.',
     hilft:'Vorher kurz fragen, ob gerade Handeln oder Dasein gefragt ist. Meist Handeln — aber nicht immer.'},
  h:{tut:'{A} wird laut oder schnell, bevor {B} sortiert hat.',
     an:'{B} erschrickt und macht zu. Danach ist das eigentliche Thema nicht mehr erreichbar, und es geht nur noch um den Ton.',
     hilft:'{A} bleibt leiser als nötig, {B} sagt im Moment selbst „zu schnell" statt es hinterher zu erklären. Hier entstehen die meisten unnötigen Streits zwischen zwei Menschen.'}},

 'Jupiter|Mond':{akteur:'Jupiter',
  w:{tut:'{A} ist großzügig mit {B} — mit Zeit, Zuspruch, Einladungen.',
     an:'{B} geht es in {A}s Nähe besser als allein. Keine große Sache, aber verlässlich.',
     hilft:'Nichts.'},
  h:{tut:'{A} gibt groß: der große Rat, das große Angebot, die große Geste. Maßstab ist dabei, was {A} selbst gut fände.',
     an:'{B} hätte etwas Kleines und Bestimmtes gebraucht und bekommt etwas Großes und Allgemeines. {B} bedankt sich und bleibt hungrig. Weil die Geste freundlich war, lässt sich schlecht sagen, dass sie nicht gepasst hat — und so wiederholt es sich.',
     hilft:'Ein Satz vorher: „Was hilft dir gerade konkret?" Und dann genau das, auch wenn es kleiner ist, als {A} geben wollte. Das ist bei diesem Kontakt der ganze Unterschied.'}},

 'Venus|Venus':{
  w:{tut:'Ihr mögt Ähnliches.',
     an:'Was schön ist, was gemütlich ist, was sich lohnt — darüber müsst ihr nicht verhandeln. Das macht den Alltag leicht.',
     hilft:'Nichts.'},
  h:{tut:'Ihr habt verschiedenen Geschmack und eine verschiedene Vorstellung davon, was etwas wert ist.',
     an:'Im Alltag harmlos. Sobald Geld im Spiel ist, wird daraus ein echter Konflikt, weil jede die Ausgaben der anderen für unvernünftig hält.',
     hilft:'Getrennte Töpfe für das, was nur eine will. Gemeinsam nur das, was wirklich beide betrifft.'}},

 'Saturn|Venus':{akteur:'Saturn',
  w:{tut:'{A} meint es ernst mit {B} und bleibt.',
     an:'{B} erlebt eine Zuneigung, auf die Verlass ist — unspektakulär und tragfähig.',
     hilft:'Nichts. Bei diesem Kontakt ist das Unspektakuläre die Qualität.'},
  h:{tut:'{A} hält sich zurück, prüft, zeigt wenig.',
     an:'{B} erlebt Zuneigung unter Vorbehalt und fängt an, sich darum zu bemühen. Das ist der Kontakt, bei dem eine wirbt und die andere wartet — und beide unglücklich dabei sind.',
     hilft:'{A} sagt einmal deutlich, woran {B} ist. Ein Satz. Bei diesem Kontakt ist Zurückhaltung keine Vorsicht, sondern das eigentliche Problem.'}}
};


/* Was ein Planet des einen im Haus des anderen anfasst */
/* Die Lebensbereiche der ANDEREN Person — deshalb ohne „dein".
   Den Besitz setzt die App mit dem Namen davor. */
var INHAUS=['Auftreten und Wirkung','Geld und Selbstwert','Reden und Lernen',
 'Zuhause und Herkunft','Ausdruck und Spiel','Alltag und Körper',
 'Verbindlichkeit','Tiefe und Loslassen','Sinn und Überzeugung',
 'Beruf und Sichtbarkeit','Freundschaften und Zukunft','Rückzug und Ruhe'];

/* Was in dieser Beziehungsart den Unterschied macht */
var ROLLENSATZ={
 liebe:'In einer Liebesbeziehung entscheidet selten der gro\u00DFe Konflikt, sondern der kleine, der sich jeden Dienstag wiederholt. Achte unten weniger auf die harten Kontakte als auf die, die den Alltag betreffen.',
 freundschaft:'Freundschaften halten \u00FCber Leichtigkeit, nicht \u00FCber Arbeit. Wo zwischen euch etwas anstrengend ist, ist die ehrliche Frage nicht, wie man es l\u00F6st, sondern ob es gel\u00F6st werden muss.',
 mutter:'Bei einer Mutter liest man zwei Dinge gleichzeitig: wie es fr\u00FCher war und wie es heute ist. Die Kontakte unten beschreiben das Muster von damals \u2014 wie viel davon heute noch l\u00E4uft, entscheidet ihr, nicht das Chart.',
 vater:'Bei einem Vater geht es fast immer um Ma\u00DFst\u00E4be \u2014 wessen Ma\u00DFstab gilt, und ob du ihn noch brauchst. Lies die Kontakte unten als Beschreibung einer alten Rollenverteilung.',
 kind:'Bei einem eigenen Kind dreht sich alles um: Was braucht dieses Kind, das ich selbst nicht gebraucht h\u00E4tte? Genau da liegen die blinden Flecken, und genau die stehen unten.',
 geschwister:'Zwischen Geschwistern l\u00E4uft meistens noch die Rollenverteilung aus der Kindheit mit \u2014 wer vern\u00FCnftig war, wer laut, wer \u00FCbersehen wurde. Das h\u00F6rt nicht von allein auf.',
 kollegin:'Bei Arbeitsbeziehungen interessiert nicht, ob man sich mag, sondern ob man sich gegenseitig aufh\u00E4lt. Darauf zielen die Abschnitte unten.',
 tier:'Beim Tier geht es nicht um Verstehen, sondern um Passung: Dein Tempo gegen sein Tempo, deine Reizschwelle gegen seine.',
 sonstige:'Ohne festgelegte Beziehungsart wird allgemein gelesen. Stell oben die Art ein, die wirklich zutrifft \u2014 dann wird es deutlich genauer.'
};
