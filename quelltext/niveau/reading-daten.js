/* Astro-Charlie · Textbausteine für das Reading
   Die Deutung selbst ist auf jeder Stufe dieselbe — was sich ändert, ist,
   wie sie eingerahmt wird. Deshalb steht hier je Stellung ein Kern in
   klarer Sprache; die Fachschicht kommt in reading.html darum herum. */

var R_SONNE=[
 'Du kommst in Gang, bevor andere fertig überlegt haben. Anfangen fällt dir leicht, Dranbleiben weniger — und beides gehört zusammen.',
 'Du brauchst Boden unter den Füßen. Was du einmal angefangen hast, ziehst du durch, und du lässt dich dabei nicht hetzen.',
 'Du lebst über Austausch. Ein Tag ohne ein gutes Gespräch fühlt sich leer an, und du verstehst dich selbst am besten, während du redest.',
 'Du spürst zuerst und denkst danach. Menschen, denen du gehörst, sind für dich keine Nebensache, sondern der Kern.',
 'Du willst gesehen werden, und das ist kein Makel. Wo du dich zeigen darfst, blühst du; wo du dich klein machen musst, wirst du müde.',
 'Du willst, dass es stimmt. Genauigkeit ist bei dir keine Pedanterie, sondern eine Form von Fürsorge — und sie richtet sich am härtesten gegen dich selbst.',
 'Du denkst in Beziehungen. Entscheidungen fällst du selten allein, und du merkst schnell, was im Raum nicht ausgeglichen ist.',
 'Du gehst in die Tiefe oder gar nicht. Halbe Sachen langweilen dich, und du erkennst, was andere verbergen.',
 'Du brauchst Horizont. Ohne eine große Frage dahinter wird dir jede Aufgabe zu eng.',
 'Du baust, was hält. Dein Maßstab ist lang, deine Geduld ebenfalls, und Anerkennung nimmst du erst, wenn sie verdient ist.',
 'Du willst nicht dazugehören um jeden Preis. Deine Freiheit ist dir wichtiger als Zustimmung, und das kostet dich manchmal Nähe.',
 'Du nimmst mehr auf als andere. Das macht dich durchlässig und mitfühlend — und es macht Abgrenzung zur Lebensaufgabe.'];

var R_MOND=[
 'Du beruhigst dich über Bewegung, nicht über Gespräche. Ärger geht bei dir schnell hoch und schnell wieder weg.',
 'Du brauchst Verlässlichkeit und etwas Schönes zum Anfassen. Veränderungen gehen dir langsamer ein, als du zugibst.',
 'Du musst reden, um zu fühlen. Was unausgesprochen bleibt, hält dich nachts wach.',
 'Du brauchst ein Zuhause im wörtlichen Sinn. Ohne einen Ort, der dir gehört, kommst du nicht zur Ruhe.',
 'Du brauchst Zugewandtheit. Wenn dich jemand übersieht, trifft es dich tiefer, als es von außen aussieht.',
 'Du beruhigst dich, indem du etwas in Ordnung bringst. Erst dann kannst du ausruhen — nicht umgekehrt.',
 'Du brauchst Frieden im Raum. Spannung zwischen anderen kostet dich Kraft, auch wenn sie dich gar nicht betrifft.',
 'Du brauchst Sicherheit, bevor du dich öffnest. Vertrauen gibst du langsam und ziehst es schnell zurück.',
 'Du brauchst das Gefühl, gehen zu können. Enge macht dich unruhig, lange bevor du sie benennst.',
 'Du nimmst dich selbst in die Pflicht, auch beim Gefühl. Weichheit erlaubst du dir erst, wenn alles erledigt ist — also selten.',
 'Du brauchst Abstand, um Nähe aushalten zu können. Das ist kein Widerspruch, sondern dein Rhythmus.',
 'Du nimmst Stimmungen auf wie ein Schwamm. Ein Teil dessen, was du fühlst, gehört gar nicht dir.'];

var R_ASC=[
 'Du wirkst direkt und wach. Menschen trauen dir schnell zu, dass du etwas anpackst.',
 'Du wirkst ruhig und belastbar. Andere lehnen sich an dich an, oft ungefragt.',
 'Du wirkst aufgeweckt und zugewandt. Mit dir ins Gespräch zu kommen, ist leicht.',
 'Du wirkst vorsichtig und warm. Es dauert, bis jemand sieht, wie viel bei dir los ist.',
 'Du wirkst präsent. Du fällst auf, auch wenn du es nicht darauf anlegst.',
 'Du wirkst zurückhaltend und genau. Viele unterschätzen, wie viel du bemerkst.',
 'Du wirkst freundlich und ausgleichend. Menschen entspannen sich in deiner Nähe.',
 'Du wirkst undurchsichtig, auch wenn du offen bist. Das zieht an und hält zugleich auf Abstand.',
 'Du wirkst offen und zuversichtlich. Dir wird zugetraut, dass es schon gutgeht.',
 'Du wirkst ernst und zuverlässig. Man hält dich oft für älter oder zuständiger, als du bist.',
 'Du wirkst eigen und ein bisschen auf Abstand. Das macht neugierig.',
 'Du wirkst weich und schwer greifbar. Menschen erzählen dir Dinge, die sie sonst niemandem erzählen.'];

var R_MERKUR=[
 'Du denkst schnell und sagst es sofort. Diplomatie kommt bei dir im zweiten Schritt.',
 'Du denkst langsam und gründlich. Hast du dich entschieden, bringt dich so leicht nichts mehr davon ab.',
 'Du denkst in viele Richtungen gleichzeitig. Das macht dich schnell — und schwer bei einer Sache zu halten.',
 'Du denkst mit dem Gefühl mit. Sachlichkeit auf Kommando funktioniert bei dir nicht.',
 'Du denkst in Bildern und sprichst gern vor Publikum. Kleinkram langweilt dich.',
 'Du denkst in Details und siehst Fehler, bevor du sie suchst. Das ist eine Gabe und eine Last.',
 'Du wägst beim Reden ab und willst niemanden vor den Kopf stoßen. Das kostet dich manchmal die klare Ansage.',
 'Du sagst nicht alles, was du denkst, und du denkst mehr, als du sagst. Oberflächliches Gerede hältst du schlecht aus.',
 'Du denkst groß und redest gern überzeugt. Details holst du dir später nach.',
 'Du sagst, was belegbar ist. Ins Blaue reden ist nicht deine Art.',
 'Du denkst quer und kommst auf Dinge, auf die sonst niemand kommt. Erklären musst du sie trotzdem.',
 'Du denkst in Stimmungen und Bildern. Was du meinst, lässt sich oft schwer in gerade Sätze bringen.'];

var R_VENUS=[
 'Du magst es direkt. Wer zu lange um dich herumschleicht, verliert dich.',
 'Du magst Beständigkeit und etwas Schönes zum Anfassen. Billig funktioniert bei dir nicht.',
 'Du verliebst dich über Worte. Jemand, der gut erzählt, hat bei dir viel gewonnen.',
 'Du bindest dich über Fürsorge. Du gibst viel — und erwartest leise, dass es jemand bemerkt.',
 'Du willst, dass es schön ist und dass es gezeigt wird. Heimliches wird dir zu klein.',
 'Du zeigst Zuneigung über praktische Dinge. Große Worte sind dir unangenehm.',
 'Du willst Ausgleich und Stil. Streit vermeidest du länger, als dir guttut.',
 'Du liebst ganz oder gar nicht. Oberflächlichkeit ist bei dir kein Vorwurf, sondern ein Ausschlusskriterium.',
 'Du brauchst Luft in einer Beziehung. Jemand, der mitwachsen will, passt besser als jemand, der dich hält.',
 'Du bindest dich über Verlässlichkeit. Was du zusagst, gilt — und das erwartest du zurück.',
 'Du brauchst Freiheit und Eigenart. Besitzansprüche vertreiben dich schneller als Streit.',
 'Du liebst mit viel Hingabe und siehst Menschen manchmal, wie sie sein könnten, statt wie sie sind.'];

var R_MARS=[
 'Du gehst direkt drauf zu. Das ist deine Stärke und gelegentlich dein Problem.',
 'Du setzt dich über Ausdauer durch, nicht über Lautstärke. Wenn du wirklich wütend wirst, ist es ernst.',
 'Du setzt dich mit Worten durch. Diskussionen gewinnst du öfter, als du Kämpfe führst.',
 'Du wirst stark, wenn es um jemanden geht, den du schützt. Für dich selbst fällt es dir schwerer.',
 'Du gehst mit Schwung und Stolz voran. Zurückstecken fällt dir spürbar schwer.',
 'Du arbeitest dich präzise vor. Dein Ärger kommt als Kritik heraus, nicht als Ausbruch.',
 'Du setzt dich ungern frontal durch und suchst den Umweg über Verständigung. Das funktioniert — bis es nicht mehr funktioniert.',
 'Du setzt dich leise und ausdauernd durch. Wer dich unterschätzt, merkt es spät.',
 'Du gehst mit Überzeugung ran. Ohne guten Grund bewegst du dich nicht.',
 'Du arbeitest strategisch und in langen Linien. Tempo ist dir weniger wichtig als Richtung.',
 'Du setzt dich über das Unerwartete durch. Vorhersehbar bist du nie.',
 'Du weichst aus, statt zu kämpfen — und bist genau darin schwer zu fassen. Direkte Wut liegt dir nicht.'];

var R_ELEMENT={
 Feuer:['Feuer','Du gehst in Vorlage. Begeisterung ist bei dir keine Laune, sondern der Antrieb — und wenn sie ausgeht, geht gar nichts.'],
 Erde:['Erde','Du willst, dass sich etwas anfassen lässt. Pläne ohne Umsetzung machen dich unruhig.'],
 Luft:['Luft','Du brauchst den Überblick und den Austausch. Ohne jemanden zum Denken wird es dir eng.'],
 Wasser:['Wasser','Du nimmst wahr, was unausgesprochen bleibt. Das ist deine beste Information und deine größte Belastung.']};
var R_ELEMENT_FEHLT={
 Feuer:'Dir fehlt das Element, das einfach mal losgeht. Du wartest eher ab, als dich zu begeistern — und bewunderst Menschen, die loslaufen.',
 Erde:'Dir fehlt das Element, das Dinge festmacht. Ideen hast du reichlich; was ihnen fehlt, ist ein Montagmorgen.',
 Luft:'Dir fehlt das Element, das Abstand nimmt. Du steckst in Dingen drin, statt sie von außen anzuschauen.',
 Wasser:'Dir fehlt das Element, das Stimmungen liest. Du bemerkst spät, wenn bei jemandem etwas nicht stimmt — auch bei dir selbst.'};
var R_MODUS={
 kardinal:['anfangend','Du bringst Dinge ins Rollen. Was läuft, übergibst du gern.'],
 fix:['haltend','Du bleibst dran, auch wenn es längst unbequem ist. Loslassen ist dein Thema, nicht Durchhalten.'],
 beweglich:['anpassend','Du stellst dich um, wenn sich etwas ändert. Festlegen fällt dir schwerer als mitgehen.']};
