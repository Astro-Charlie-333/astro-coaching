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
 'Mond|Sonne':{
  w:'Ein Grundton, der stimmt. Was der eine will, kann der andere gut aushalten — das merkt man erst, wenn man es mal anders erlebt hat.',
  h:'Der eine zieht Richtung Ziel, der andere Richtung Sicherheit. Beides ist berechtigt, und genau deshalb wird daraus immer wieder dieselbe Diskussion.',
  rw:'Die klassische Paar-Verbindung. Ihr passt im Grundrhythmus zusammen, ohne dafür etwas tun zu müssen.',
  rh:'Ihr wollt dasselbe und braucht Verschiedenes. Das hält zusammen und reibt gleichzeitig — beides gehört zu dieser Verbindung.'},
 'Mond|Mond':{
  w:'Ihr beruhigt euch auf ähnliche Weise. Schweigen zwischen euch ist meistens entspannt und nicht peinlich.',
  h:'Ihr braucht in denselben Momenten Gegensätzliches — der eine Nähe, der andere Luft. Das ist keine Boshaftigkeit, nur unterschiedlicher Takt.'},
 'Mars|Venus':{
  w:'Es funkt, und zwar ohne Anstrengung.',
  h:'Anziehung mit Reibung. Spannend und anstrengend in derselben Bewegung.',
  rw:'Die Anziehung ist da und bleibt es auch. Das ist der Kontakt, den man sucht und selten findet.',
  rh:'Starke Anziehung, die sich regelmäßig in Streit übersetzt. Das eine lässt sich vom anderen schwer trennen.'},
 'Merkur|Merkur':{
  w:'Ihr versteht euch beim Reden fast von selbst. Halbe Sätze reichen.',
  h:'Ihr denkt in verschiedenen Geschwindigkeiten. Missverständnisse entstehen hier nicht aus Unwillen, sondern aus Tempo.'},
 'Mond|Saturn':{
  w:'Eine verlässliche Verbindung. Der eine hält, wenn es beim anderen wackelt.',
  h:'Einer von euch fühlt sich beim anderen regelmäßig zu wenig. Das ist der Kontakt, der am häufigsten unterschätzt wird — und der am längsten nachwirkt.'},
 'Saturn|Sonne':{
  w:'Respekt und Struktur. Einer gibt dem anderen Halt, ohne ihn kleinzumachen.',
  h:'Einer bremst den anderen — meistens ungewollt. Wer sich hier beweisen muss, merkt es selbst oft erst spät.'},
 'Jupiter|Sonne':{
  w:'Ihr macht euch gegenseitig größer. In dieser Verbindung traut man sich mehr zu.',
  h:'Einer übertreibt für den Geschmack des anderen. Großzügig und zu viel liegen hier nah beieinander.'},
 'Mond|Venus':{
  w:'Es ist angenehm miteinander. Einfach so.',
  h:'Zuneigung trifft auf ein anderes Bedürfnis. Gut gemeint kommt nicht immer gut an.'},
 'Mars|Mars':{
  w:'Ihr zieht in dieselbe Richtung, wenn es losgeht.',
  h:'Zwei Antriebe, die sich in die Quere kommen. Aufgaben teilen hilft mehr als Absprachen.'},
 'Mars|Saturn':{
  w:'Ausdauer trifft auf Schwung. Zusammen bringt ihr Dinge zu Ende.',
  h:'Der eine will los, der andere bremst. Das hält beide auf, wenn es nicht benannt wird.'},
 'Merkur|Mond':{
  w:'Der eine spricht aus, was der andere fühlt. Das entlastet.',
  h:'Sachlichkeit trifft auf Stimmung. Was als Information gemeint war, kommt als Kritik an.'},
 'Pluto|Venus':{
  w:'Eine Verbindung mit Tiefe. Oberflächlich wird es zwischen euch selten.',
  h:'Es wird schnell intensiv — und schnell um Kontrolle. Eifersucht ist hier ein Thema, auch wenn niemand es so nennt.',
  rh:'Starke Bindung mit Hang zum Klammern. Das Schöne und das Schwierige haben hier dieselbe Wurzel.'},
 'Mond|Pluto':{
  w:'Ihr kommt schnell an das heran, was andere nicht sehen.',
  h:'Es geht hier sofort tief, auch wenn keiner das wollte. Gefühle werden zwischen euch schnell zum Machtthema.'},
 'Sonne|Sonne':{
  w:'Ähnlicher Grundton. Ihr versteht, warum der andere tut, was er tut.',
  h:'Zwei Richtungen, die sich kreuzen. Ihr seid euch nicht fremd — ihr wollt nur Verschiedenes.'},
 'Merkur|Saturn':{
  w:'Gespräche mit Substanz. Nichts wird hier leichtfertig gesagt.',
  h:'Einer fühlt sich beim Reden geprüft. Das legt sich, wenn man es einmal ausspricht.'},
 'Sonne|Uranus':{
  w:'Ihr bringt einander auf Ideen. Langweilig wird es nicht.',
  h:'Einer ist dem anderen zu unberechenbar. Verlässlichkeit ist hier das Verhandlungsthema.'},
 'Mars|Mond':{
  w:'Schwung trifft Gefühl, und es passt.',
  h:'Der eine wird laut, bevor der andere sortiert hat. Hier entstehen die meisten unnötigen Streits.'},
 'Jupiter|Mond':{
  w:'In dieser Verbindung geht es einem besser als allein.',
  h:'Großzügigkeit, die am Bedarf vorbeigeht. Gut gemeint ist hier nicht gleich gut.'},
 'Venus|Venus':{
  w:'Ihr mögt Ähnliches. Das macht vieles einfach.',
  h:'Verschiedener Geschmack, verschiedene Vorstellung von schön. Harmlos — solange es nicht ums Geld geht.'},
 'Saturn|Venus':{
  w:'Etwas, das hält. Nicht aufregend, dafür verlässlich.',
  h:'Zuneigung, die sich Bedingungen stellt. Einer wartet auf ein Zeichen, das der andere nicht gibt.'}
};

/* Was ein Planet des einen im Haus des anderen anfasst */
var INHAUS=['dein Auftreten und wie du wirkst','dein Geld und deinen Selbstwert','dein Reden und Lernen',
 'dein Zuhause und deine Herkunft','deinen Ausdruck und dein Spiel','deinen Alltag und deinen Körper',
 'deine Verbindlichkeit','deine Tiefe und dein Loslassen','deinen Sinn und deine Überzeugung',
 'deinen Beruf und deine Sichtbarkeit','deine Freundschaften und deine Zukunft','deinen Rückzug und deine Ruhe'];

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
