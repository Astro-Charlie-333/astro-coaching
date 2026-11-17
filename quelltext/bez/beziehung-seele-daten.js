/* ── Beziehung · Die Seelenebene ─────────────────────────────
   Alle Sätze der Abschnitte Seelenebene, Seelen-Marker, gemeinsames
   Bild und chinesische Ebene. Die Anzeige (beziehung-app.js) setzt
   nur ein; was hier steht, ist Text.

   Gilt für alle Texte hier (REGELN.md 2, 2a, 4):
   * Ruhig, erwachsen, ohne Ausrufezeichen, ohne Versprechen.
   * Felder ohne „tech" im Namen werden auf Stufe 0 gezeigt und nennen
     deshalb weder Planeten noch Zeichen noch Häuser. Die Namen stehen
     in `n` und erscheinen erst ab Stufe 1, die Mechanik ab Stufe 2.
   * Spirituelle Deutung wird als Deutung gesagt, nicht als Tatsache. */

var BZS_T={
 /* Seelenebene */
 seeleKicker:'Die Seelenebene',
 seeleTitel:'Welche Verbindung das sein könnte',
 seeleVor:'Die spirituelle Astrologie kennt verschiedene Arten, wie Seelen einander begegnen. Hier stehen die fünf bekanntesten. '+
  'Ausgezählt ist, welche davon zwischen {a} und {b} am stärksten anklingt, gemessen daran, '+
  'wie oft dieselben Kontakte bei zufälligen Paaren vorkommen.',
 seeleHauptVor:'Am stärksten klingt an',
 seeleNeben:'Dicht dahinter: <b>{name}</b>. Bei euch gehört beides zusammen, und das ist kein Widerspruch: Viele tiefe Verbindungen tragen mehr als eine Ebene.',
 seeleBalken:'stärker als bei {p} von 100 Paaren',
 seeleBalkenHinweis:'Jeder Balken zeigt, wie stark eine Ebene bei euch anklingt, verglichen mit 20.000 zufällig gerechneten Paaren. Ein voller Balken heißt: kaum ein Paar hat davon mehr.',
 seeleDichte:'<b>Wie dicht eure Verbindung ist:</b> dichter als bei {p} von 100 zufälligen Paaren. {folge}',
 seeleDichteHoch:'Das ist selten. So viele enge Kontakte auf einmal erklären, warum sich diese Begegnung größer anfühlt als andere.',
 seeleDichteMittel:'Das ist eine lebendige, gut verbundene Mischung, aber nichts Außergewöhnliches.',
 seeleDichteNiedrig:'Zwischen euch gibt es wenige enge Kontakte. Das heißt nicht, dass nichts da ist, sondern dass diese Verbindung weniger über das Geburtsbild läuft als über das, was ihr miteinander tut.',
 seeleOhneZeit:'<b>Ohne Geburtszeit bei {wer}</b> fehlen der Schicksalspunkt, die Bereiche und die Ausstrahlung. Die Ebenen sind deshalb vorsichtiger gerechnet als bei vollständigen Daten.',
 seeleWarum:'Was dafür spricht',
 labWesen:'Worum es geht',
 labZeichen:'Woran man es merkt',
 labAufgabe:'Was diese Verbindung von euch will',
 labSchatten:'Wo es schwer wird',
 labFrage:'Eine Frage für euch',

 /* Marker */
 markerTitel:'Die Seelen-Marker',
 markerVor:'Woran spirituelle Astrologie eine besondere Verbindung festmacht, einzeln geprüft. Je enger ein Kontakt, desto mehr Punkte. Darunter steht jeweils, wie gewöhnlich er ist.',
 markerHaeufig:'kommt bei etwa {n} von 10 Paaren vor',
 markerSelten:'kommt bei weniger als 2 von 10 Paaren vor',
 markerFehltVor:'Diese Marker gibt es zwischen euch nicht:',
 markerTreffer:'{a} {pa} und {b} {pb}',
 markerTrefferTech:'{a} {pa} {typ} {b} {pb}',
 markerHaus:'{a} {pa} im Bereich {bereich} bei {b}',
 markerHausTech:' ({h}. Haus)',
 markerOrb:' ({orb}°)',
 markerPunkte:'{n} von 5',

 /* Doppelrad */
 radTitel:'Eure Bilder übereinander',
 radInnen:'innen',
 radAussen:'außen',
 radLinieWeich:'fließende Verbindung',
 radLinieEng:'Verschmelzen',
 radLinieHart:'Reibung',
 radHinweis:'Die Linien zeigen die engsten Seelen-Marker. Gold heißt Verschmelzen, Grün fließen, Rost Reibung.',

 /* Gemeinsames Bild */
 compTitel:'Das gemeinsame Bild',
 compVor:'Nimmt man aus beiden Geburtsbildern jeweils die Mitte, entsteht ein drittes Bild: das der Beziehung selbst. '+
  'Es beschreibt, wozu ihr zusammen da seid, unabhängig davon, wer von euch was mitbringt.',
 compSonne:'<b>Wozu diese Verbindung da ist:</b> {t}',
 compMond:'<b>Was sie braucht, um sich sicher zu fühlen:</b> {t}',
 compTech:'Composite nach der Mittelpunktmethode: Sonne in {zs}, Mond in {zm}{asc}.',
 compTechAsc:', Aszendent in {z}',
 compKontakteVor:'Was das gemeinsame Bild am stärksten prägt:',
 compKontaktTech:'{x} {typ} {y}{orb}',

 /* Chinesische Ebene */
 chinaTitel:'Die chinesische Ebene',
 chinaVor:'Die chinesische Astrologie ist eine eigene Sprache. Sie liest nicht die Himmelskörper im Moment der Geburt, '+
  'sondern Zeichen für Jahr, Monat, Tag und Stunde, gebaut aus zwölf Tieren und fünf Elementen. '+
  'Hier steht sie als zweite Ebene neben der westlichen. Wo beide dasselbe sagen, ist das Bild besonders deutlich.',
 chinaJahr:'{yy}-{el} · {tier}',
 chinaTierZeile:'<b>{tier}:</b> {wesen}',
 chinaElementZeile:'<b>{el}:</b> {wesen}',
 chinaAbw:'Im BaZi, das das Jahr erst um den 4. Februar wechseln lässt, gilt für {name} noch das Zeichen {tier}.',
 chinaGrenz:'{name} ist nahe am chinesischen Neujahr geboren. Das Tier ist auf den Tag genau gerechnet.',
 chinaTiereTitel:'Eure Jahrestiere',
 chinaTagTitel:'Eure Tagesmeister',
 chinaTagVor:'Im BaZi, den Vier Säulen, steht der eigentliche Kern eines Menschen nicht im Jahr, sondern im Tag: der Tagesmeister, ein Element in seiner Yin- oder Yang-Form. Wie zwei Tagesmeister zueinander stehen, gilt als die tiefere Verbindung.',
 chinaTagZeile:'<b>{name}:</b> {yy}-{el}',
 chinaPalastTitel:'Der Platz der Partnerschaft',
 chinaPalastVor:'Das Tier unter dem Tagesmeister heißt im BaZi Palast der Partnerschaft. Es zeigt, was jemand in naher Bindung sucht.',
 chinaPalastZeile:'<b>{name}:</b> {tier}',
 chinaTagOhneZeit:'Ohne Geburtszeit kann der Tag bei einer Geburt kurz vor oder nach Mitternacht um eins verrutschen.',
 chinaEinklang:'<b>Beide Ebenen zusammen:</b> {t}',
 chinaEinklangHarmonie:'Westlich wie chinesisch zeigt sich vor allem Verbindung. Das ist der seltene Fall, in dem zwei unabhängige Systeme dasselbe sagen.',
 chinaEinklangSpannung:'Westlich wie chinesisch zeigt sich Anziehung mit Reibung. Beide Systeme beschreiben eine Begegnung, die bewegt und nicht nur beruhigt.',
 chinaEinklangGemischt:'Die beiden Systeme setzen unterschiedliche Akzente. Das ist häufig und heißt nur, dass jede Sprache eine andere Seite derselben Verbindung beleuchtet.',

 /* Was das taugt */
 taugtTitel:'Was das taugt, und was nicht',
 taugt:[
  'Eine dichte Verbindung ist kein Versprechen, dass es gut wird. Sie zeigt, wie viel zwischen zwei Menschen in Bewegung ist, nicht, wohin es geht.',
  'Einzelne Marker sind häufig. Bei jedem steht, bei wie vielen von 10 zufälligen Paaren er vorkommt. Aussagekräftig ist erst die Mischung, und wie eng die Kontakte sind.',
  'Die Seelenebenen sind eine spirituelle Deutung. Sie ist nicht überprüft und lässt sich auch nicht überprüfen. Sie ist eine Sprache, um über eine Verbindung nachzudenken.',
  'Was ihr erlebt, geht vor. Wenn sich eine Verbindung anders anfühlt, als es hier steht, hat das Erleben recht und nicht die Seite.',
  'Ob zwei Menschen zueinanderfinden, entscheidet ihr Wille, nicht die Sterne.'
 ],

 /* Häuser in beide Richtungen */
 haeuserTitel:'Wo ihr im Leben des anderen landet',
 haeuserVor:'Jedes Geburtsbild ist wie eine Landkarte mit zwölf Lebensbereichen. Hier steht, in welchen Bereich des anderen eure wichtigsten Kräfte fallen. Dort spürt der andere euch am deutlichsten.',
 haeuserSpalte:'{a} bei {b}',
 haeuserZeile:'<b>{punkt}</b> · {bereich}',
 haeuserHausTech:' ({h}. Haus)',
 haeuserTiefHinweis:'Hervorgehoben sind die Bereiche für Partnerschaft, Tiefe und das Verborgene. Dort sitzen die Kräfte, die eine Verbindung schicksalhaft wirken lassen.',
 haeuserJuno:'<b>Spiegel im Spiegel:</b> Euer Bindungswunsch fällt jeweils in den Bereich des anderen für Partnerschaft oder Tiefe. Ihr sucht beide beim anderen etwas Verbindliches. Das ist selten.',
 haeuserOhneZeit:'Für die Bereiche braucht es die Geburtszeit. Sie fehlt bei {wer}.',
 /* Gemeinsam mit der chinesischen Ebene */
 chinaEinklangGrund:'Westlich zeigt sich Spiegel und Reibung, chinesisch vor allem Harmonie. Das passt zusammen: Unter der Reibung liegt eine Verbindung, die im Grund zusammenpasst.'
};

/* Zeichen für das Doppelrad. Stehen hier, weil sie Zeichen sind und
   keine Rechnung; die Anzeige hängt das Textzeichen U+FE0E an. */
var BZS_GL={Sonne:'\u2609',Mond:'\u263D',Merkur:'\u263F',Venus:'\u2640',Mars:'\u2642',Jupiter:'\u2643',
 Saturn:'\u2644',Uranus:'\u2645',Neptun:'\u2646',Pluto:'\u2647',Nordknoten:'\u260A',Juno:'\u26B5',Chiron:'\u26B7'};
var BZS_ZGL=['\u2648','\u2649','\u264A','\u264B','\u264C','\u264D','\u264E','\u264F','\u2650','\u2651','\u2652','\u2653'];

/* ── Die fünf Seelenebenen ───────────────────────────────── */
var BZS_EBENE={
 seelenverwandt:{name:'Seelenverwandte', kurz:'Ein Wiedererkennen ohne Kampf',
  wesen:'Seelenverwandte schwingen im selben Takt. Die Begegnung fühlt sich an wie Nachhausekommen: Man muss sich nicht erklären, man wird verstanden. Diese Verbindung ist nicht zum Aufrütteln da, sondern zum Nähren.',
  zeichen:'Ruhe in der Gegenwart des anderen. Gespräche, die von allein fließen. Das Gefühl, sich schon lange zu kennen.',
  aufgabe:'Einander Halt geben, damit beide wachsen können. Die Leichtigkeit schützen, statt sie für selbstverständlich zu halten.',
  schatten:'Weil es so leicht ist, bleibt Wichtiges manchmal unausgesprochen. Und wo nichts reibt, schläft das Wachstum gern ein.',
  frage:'Wofür nutzt ihr die Ruhe, die ihr einander gebt?'},
 dualseele:{name:'Dualseele', kurz:'Der Spiegel, der wachrüttelt',
  wesen:'Die Dualseele, auch Zwillingsflamme genannt, gilt als die Seele, die dich vollständig spiegelt: deine Größe und deine Wunden. Man erkennt eine solche Verbindung nicht an Harmonie, sondern an der Mischung aus tiefer Resonanz und starker Reibung. Sie ist zum Erwachen da, nicht zum Ausruhen.',
  zeichen:'Sofortige Vertrautheit und gleichzeitig Unruhe. Gefühle, die größer sind als die gemeinsame Zeit. Phasen von Nähe und Rückzug. Das Gefühl, durch diesen Menschen mehr man selbst zu werden.',
  aufgabe:'Jede Seele zuerst zu sich selbst führen. In der spirituellen Lesart kommen Dualseelen erst gut zusammen, wenn beide ihre eigenen Themen angeschaut haben. Die Verbindung zeigt, was heilen will. Heilen muss es jede Seele selbst.',
  schatten:'Die Geschichte von der einen Seele kann dazu verführen, Schmerz auszuhalten, der nicht ausgehalten werden muss. Eine Dualseele ist kein Grund zu warten, wenn sich die andere Seite nicht bewegt.',
  frage:'Was zeigt dir diese Verbindung über dich, und was davon kannst du heute schon für dich tun?'},
 karmisch:{name:'Karmische Verbindung', kurz:'Eine alte Geschichte, die sich lösen will',
  wesen:'Karmische Verbindungen tragen das Gefühl, etwas Altes zu Ende zu bringen. Sie wirken schicksalhaft und vertraut, oft auch schwer. Ihr Sinn ist nicht unbedingt, für immer zu bleiben, sondern ein Muster zu erkennen und zu lösen.',
  zeichen:'Intensität von Anfang an. Themen, die man aus früheren Beziehungen kennt. Ein Sog, der stärker ist als die Vernunft.',
  aufgabe:'Das Muster benennen, das sich hier wiederholt, und es diesmal anders beantworten. Danach wird die Verbindung leichter, oder sie darf gehen.',
  schatten:'Der Sog lässt sich leicht mit Liebe verwechseln. Wo eine Verbindung immer wieder dieselbe Wunde öffnet, ruft sie nach Lösung, nicht nach mehr Ausharren.',
  frage:'Welches alte Muster begegnet dir hier, und wie würdest du es heute beantworten?'},
 seelenfamilie:{name:'Seelenfamilie', kurz:'Vertraut wie aus einem früheren Zuhause',
  wesen:'Zur Seelenfamilie gehören Menschen, mit denen man im Geist verwandt ist: dieselbe Sprache, ähnliche Werte, ein selbstverständliches Wohlwollen. Diese Verbindung kann Freundschaft sein, Familie oder Liebe. Ihr Kern ist Vertrautheit ohne Drama.',
  zeichen:'Ihr könnt stundenlang reden. Ihr freut euch ehrlich übereinander. Auch nach langer Pause ist sofort alles wieder da.',
  aufgabe:'Einander ermutigen und den eigenen Weg bestärken. Seelenfamilie erinnert daran, wer man eigentlich ist.',
  schatten:'Weil es so freundschaftlich ist, bleibt manchmal offen, was diese Verbindung eigentlich sein soll.',
  frage:'Woran erinnert dich dieser Mensch, wenn du dich selbst vergessen hast?'},
 seelenlehrer:{name:'Seelenlehrer', kurz:'Jemand, der dich weiterbringt',
  wesen:'Manche Menschen treten in unser Leben, um uns etwas beizubringen. Sie fordern, sie zeigen Grenzen, sie öffnen Türen zu dem, was wir werden können. Die Verbindung muss nicht bequem sein, um wertvoll zu sein.',
  zeichen:'Respekt, manchmal Ehrfurcht. Das Gefühl, an diesem Menschen zu wachsen. Lektionen, die man erst im Rückblick ganz versteht.',
  aufgabe:'Annehmen, was gelehrt wird, ohne sich kleinzumachen. Ein Lehrer verdient Dank, nicht Unterwerfung.',
  schatten:'Wo eine Seite immer die lehrende bleibt, entsteht ein Gefälle. Gute Lehrerverbindungen werden mit der Zeit zur Begegnung auf Augenhöhe.',
  frage:'Was lernst du gerade durch diesen Menschen, und was lernt er durch dich?'}
};

/* Je Beziehungsart ein Satz, wie die Ebenen dort zu lesen sind */
var BZS_ROLLE={
 freundschaft:'Zwischen Freundinnen und Freunden klingen dieselben Ebenen an, nur ohne Romantik. Eine Dualseele kann auch der eine Mensch sein, der dich spiegelt wie niemand sonst.',
 familie:'In der Familie liest man die Ebenen als Rollen, die sich Seelen gewählt haben: wer wem etwas beibringt und was sich zwischen den Generationen wiederholt.',
 kollegin:'Bei der Arbeit zeigt die Seelenebene vor allem, wer wen weiterbringt und wo alte Muster mitspielen.'
};

/* ── Die Seelen-Marker ───────────────────────────────────────
   n0 und was und sinn sind Alltagssprache (Stufe 0). n nennt den
   Namen und steht ab Stufe 1. hart ersetzt sinn, wenn der engste
   Kontakt in Spannung steht. */
var BZS_MARKER={
 lichter:{n0:'Wesenskern und Gefühl berühren sich', n:'Sonne und Mond',
  was:'Der Wesenskern des einen Menschen trifft das Gefühlsleben des anderen.',
  sinn:'Das klassische Zeichen einer Seelenverbindung. Der eine nährt den Kern des anderen, und man fühlt sich gesehen, wie man ist.',
  hart:'Hier steht der Kontakt in Spannung. Die Anziehung ist da, aber das Verstehen muss erarbeitet werden: Was der eine will, trifft beim anderen auf ein Bedürfnis, das gerade etwas anderes braucht.'},
 spiegel:{n0:'Ihr spiegelt euch', n:'Spiegel: gleiche Sonne, gleicher Mond, gleiche Ausstrahlung',
  was:'Beide tragen dieselbe Grundenergie an derselben Stelle, oder genau gegenüber.',
  sinn:'Spiegel sind das Herz der Dualseelen-Idee. Man begegnet sich selbst im anderen, dem Schönen und dem Ungelösten.'},
 nordknoten:{n0:'Die Lebensrichtung wird berührt', n:'Nordknoten',
  was:'Ein Punkt, der zeigt, wohin eine Seele in diesem Leben wachsen will, wird vom anderen Menschen berührt.',
  sinn:'Dieser Mensch verkörpert etwas, auf das die andere Seele zugeht. Solche Begegnungen fühlen sich bedeutsam an, als würde man einander weiterbringen.'},
 suedknoten:{n0:'Die Herkunft der Seele wird berührt', n:'Südknoten',
  was:'Ein Punkt für das, was eine Seele schon kann und mitbringt, oft gedeutet als Erinnerung an frühere Leben, wird vom anderen berührt.',
  sinn:'Das klassische karmische Zeichen. Man fühlt sich sofort vertraut, als kenne man sich von früher. Die Begegnung lädt ein, etwas Altes abzuschließen, statt es zu wiederholen.'},
 venusmars:{n0:'Zuneigung und Begehren', n:'Venus und Mars',
  was:'Die Art, wie der eine liebt, trifft die Art, wie der andere begehrt.',
  sinn:'Das Zeichen für Anziehung und Chemie. Hier fließt sie, ohne dass jemand nachhelfen muss.',
  hart:'In Spannung knistert es besonders, und es reibt. Anziehung und Streit liegen nah beieinander.'},
 juno:{n0:'Der Wunsch nach Bindung', n:'Juno',
  was:'Ein Punkt, der zeigt, was jemand in einer festen Bindung sucht, wird vom anderen berührt oder liegt in dessen Bereich für Partnerschaft oder Tiefe.',
  sinn:'Ein Zeichen für Verbindlichkeit. Der andere Mensch entspricht dem, was man sich in einer echten Partnerschaft wünscht.'},
 vertex:{n0:'Der Schicksalspunkt', n:'Vertex',
  was:'Ein Punkt im Geburtsbild, der für Begegnungen steht, die einem scheinbar zufallen.',
  sinn:'Berührt ein Mensch diesen Punkt, fühlt sich die Begegnung oft so an: Das musste passieren. Viele Schicksalsbegegnungen beginnen mit einem Zufall.'},
 chiron:{n0:'Die alte Wunde', n:'Chiron',
  was:'Ein Punkt für die tiefste Verletzung eines Menschen, und für die Gabe, die daraus wächst.',
  sinn:'Diese Verbindung berührt alte Wunden, und sie heilt: Allein dadurch, wie der andere ist, wird etwas leichter.',
  hart:'Diese Verbindung drückt auf eine alte Wunde. Das tut weh und zeigt genau, wo Heilung gebraucht wird.'},
 saturn:{n0:'Bindung und Prüfung', n:'Saturn',
  was:'Der Teil, der für Zeit, Verbindlichkeit und Grenzen steht, trifft einen persönlichen Punkt des anderen.',
  sinn:'Solche Verbindungen halten oft lange. Sie geben Halt und Treue.',
  hart:'Solche Verbindungen prüfen: Hindernisse, Verzögerungen, Ernst. Was die Prüfung übersteht, ist sehr belastbar.'},
 pluto:{n0:'Verwandlung', n:'Pluto',
  was:'Der Teil, der für Tiefe, Macht und Verwandlung steht, trifft einen persönlichen Punkt des anderen.',
  sinn:'Diese Verbindungen sind magnetisch und lassen niemanden unverändert. Sie gehen dorthin, wo es um alles geht.',
  hart:'Diese Verbindung ist magnetisch, und Macht, Eifersucht und Kontrolle spielen mit. Ehrlichkeit ist der einzige Weg hindurch.'},
 reibung:{n0:'Spannung zwischen den Herzen', n:'Spannung der persönlichen Punkte',
  was:'Wesenskern, Gefühl oder Zuneigung des einen stehen in Spannung zu denen des anderen.',
  sinn:'Reibung gehört zur Dualseele. Der Spiegel zeigt nicht nur das Schöne, und genau an diesen Stellen wachst ihr aneinander.'},
 nahferne:{n0:'Nähe und Ferne', n:'Uranus und Neptun',
  was:'Der Freiheitsdrang oder die Sehnsucht des einen trifft das Herz des anderen.',
  sinn:'Das typische Hin und Her mancher Seelenverbindungen: plötzliche Nähe, plötzlicher Rückzug, oder ein Nebel, in dem man einander so sieht, wie man es sich wünscht.'},
 lilith:{n0:'Das Ungezähmte', n:'Lilith',
  was:'Ein Punkt für das Wilde, Unangepasste und Verdrängte in einem Menschen wird vom anderen berührt.',
  sinn:'Eine Anziehung, die sich verboten oder unwiderstehlich anfühlen kann. Diese Verbindung weckt, was man sich sonst nicht erlaubt.'},
 vertraut:{n0:'Geistige Verwandtschaft', n:'Merkur, Mond und Jupiter',
  was:'Denken, Gefühl und Vertrauen der beiden sprechen dieselbe Sprache.',
  sinn:'Das Zeichen der Seelenfamilie: leichte Gespräche, ehrliches Wohlwollen, gemeinsamer Humor.'},
 berufung:{n0:'Der Lebensweg wird berührt', n:'Der Lebenswegpunkt (MC)',
  was:'Ein persönlicher Punkt des einen liegt dort, wo es beim anderen um Berufung und Sichtbarkeit geht.',
  sinn:'Dieser Mensch spielt eine Rolle für den Weg des anderen: als Förderer, Spiegel oder Lehrer.'},
 verborgen:{n0:'Im Verborgenen', n:'Der verborgene Bereich',
  was:'Wesenskern, Gefühl oder Zuneigung des einen landet beim anderen im Bereich für das Unsichtbare und Spirituelle.',
  sinn:'Man spürt einander auf einer Ebene, die schwer in Worte zu fassen ist. Klassisch gedeutet als Verbindung aus einem früheren Leben.'},
 verschmelzung:{n0:'Tiefe und Verschmelzung', n:'Der Bereich der Tiefe',
  was:'Wesenskern, Gefühl oder Zuneigung des einen landet beim anderen im Bereich für Tiefe, Vertrauen und Verschmelzung.',
  sinn:'Diese Verbindung geht unter die Oberfläche. Sie verlangt, Kontrolle abzugeben, und belohnt mit einer Nähe, die man selten erlebt.'}
};
/* Reihenfolge auf der Seite: erst das Erkennen, dann Anziehung,
   Schicksal, Wunden, Reibung, Verwandtschaft */
var BZS_MARKER_FOLGE=['lichter','spiegel','venusmars','nordknoten','suedknoten','vertex','juno','chiron',
 'saturn','pluto','lilith','reibung','nahferne','verborgen','verschmelzung','vertraut','berufung'];

/* Die zusätzlichen Punkte: Alltagswort (Stufe 0) und Name.
   tief: ab welcher Stufe der Name gezeigt wird. */
var BZS_PKT={
 Nordknoten:{w0:'Lebensrichtung', n:'Nordknoten', ab:1},
 Suedknoten:{w0:'Seelenherkunft', n:'Südknoten', ab:1},
 Chiron:{w0:'alte Wunde', n:'Chiron', ab:1},
 Lilith:{w0:'Ungezähmtes', n:'Lilith', ab:1},
 Juno:{w0:'Bindungswunsch', n:'Juno', ab:1},
 Vertex:{w0:'Schicksalspunkt', n:'Vertex', ab:2},
 ASC:{w0:'Ausstrahlung', n:'Aszendent', ab:2},
 DSC:{w0:'Partnerschaftspunkt', n:'Deszendent', ab:2},
 MC:{w0:'Lebensweg', n:'MC', ab:2}
};

/* ── Das gemeinsame Bild ────────────────────────────────────
   Nach dem Zeichen der Mitte beider Sonnen: wozu die Verbindung da ist. */
var BZS_COMP_SONNE=[
 'Diese Verbindung ist zum Aufbrechen da. Zusammen traut ihr euch Dinge, die ihr allein aufgeschoben hättet. Sie lebt von Bewegung und wird matt, wenn nur noch verwaltet wird.',
 'Diese Verbindung ist zum Ankommen da. Sie will etwas Festes bauen: Rituale, einen Ort, Verlässlichkeit. Sie wächst langsam und hält dafür lange.',
 'Diese Verbindung lebt vom Austausch. Ihr redet, schreibt, denkt laut zusammen, und genau darüber wächst die Nähe. Wird es still zwischen euch, fehlt ihr der Atem.',
 'Diese Verbindung ist ein Zuhause. Sie will nähren, schützen, ein Wir schaffen, in dem man weich sein darf. Ihr Thema ist Geborgenheit, und die Angst, sie zu verlieren.',
 'Diese Verbindung will gesehen werden und strahlen. Sie macht euch beide mutiger im Ausdruck, großzügiger, verspielter. Sie braucht Anerkennung, auch voneinander.',
 'Diese Verbindung ist zum Heilwerden und Ordnen da. Sie zeigt sich in kleinen Diensten, im gemeinsamen Alltag, im Kümmern. Ihr Risiko ist das ständige Verbessern statt Annehmen.',
 'Diese Verbindung dreht sich um Gleichgewicht. Sie will Augenhöhe, Schönheit, Fairness. Ihr lernt aneinander, was Partnerschaft wirklich heißt, und wo Harmonie zur Vermeidung wird.',
 'Diese Verbindung ist zur Verwandlung da. Sie geht tief, an Stellen, die man sonst niemandem zeigt. Halbe Sachen hält sie nicht aus, und sie lässt euch beide nicht unverändert.',
 'Diese Verbindung ist eine gemeinsame Reise. Sie will Sinn, Weite und Wachstum, gern auch wörtlich unterwegs. Eng wird es, wenn jemand sie festhalten will.',
 'Diese Verbindung will etwas aufbauen, das bleibt. Sie ist ernst, verbindlich und auf lange Sicht angelegt. Ihre Wärme zeigt sie spät und durch Taten, nicht durch Worte.',
 'Diese Verbindung ist eine Freundschaft der Seelen, frei und ungewöhnlich. Sie braucht Raum und eigene Regeln. Sie scheitert nicht an zu wenig Nähe, sondern an zu viel Erwartung.',
 'Diese Verbindung ist ein spirituelles Band. Sie spürt mehr, als sie erklärt, und verbindet über Stimmungen, Träume und Mitgefühl. Ihr Thema ist Hingabe, und die Grenze zwischen Hingabe und Selbstaufgabe.'];
/* Nach dem Element der Mitte beider Monde: was sie emotional braucht */
var BZS_COMP_MOND=[
 'Begeisterung, gemeinsame Abenteuer, das Gefühl, lebendig zu sein. Routine ohne Funken fühlt sich für sie wie Liebesentzug an.',
 'Verlässlichkeit, Körperlichkeit, gemeinsame Gewohnheiten. Sie fühlt sich sicher, wenn Worte durch Taten gedeckt sind.',
 'Gespräche, Leichtigkeit, Freiraum. Sie fühlt sich sicher, wenn alles gesagt werden darf und niemand festgehalten wird.',
 'Tiefe, Rückzugsorte, emotionale Ehrlichkeit. Sie fühlt sich sicher, wenn Gefühle Platz haben, auch die schweren.'];
var BZS_COMP={
 band:{n0:'Herz und Wille der Beziehung',
  w:'Was die Beziehung will und was sie fühlt, passt zusammen. Das gibt ihr eine innere Ruhe, die auch schwere Zeiten trägt.',
  h:'Was die Beziehung will und was sie braucht, zieht in verschiedene Richtungen. Das hält sie wach und verlangt, dass ihr beides immer wieder neu aushandelt.'},
 liebe:{n0:'Zuneigung und Begehren der Beziehung',
  w:'Zuneigung und Begehren arbeiten zusammen. Die Anziehung bleibt lebendig, ohne zu verbrennen.',
  h:'Zuneigung und Begehren reiben sich. Das hält die Anziehung hoch, und Streit und Nähe liegen oft nah beieinander.'},
 pruefung:{n0:'Eine Prüfung für die Beziehung',
  h:'Die Beziehung trifft auf eine Wand aus Zeit, Pflicht oder Vorsicht. Sie wird geprüft, bevor sie sich zeigen darf. Was diese Prüfung übersteht, ist sehr belastbar.'},
 halt:{n0:'Ein stilles Rückgrat',
  w:'Die Beziehung hat ein stilles Rückgrat. Verlässlichkeit wächst hier fast von allein, und mit ihr Vertrauen.'},
 tiefe:{n0:'Verwandlung durch die Beziehung',
  w:'Die Beziehung verändert euch tief, auf eine Weise, die sich richtig anfühlt.',
  h:'Die Beziehung hat eine Kraft, die verwandelt und manchmal überwältigt. Macht und Kontrolle wollen hier ehrlich besprochen werden.'},
 freiheit:{n0:'Freiheit in der Beziehung',
  h:'Die Beziehung braucht Freiheit und reagiert auf Enge mit Abstand. Sie kommt und geht in Wellen. Feste Formen fallen ihr schwer, eigene Regeln leicht.'},
 traum:{n0:'Zauber und Nebel',
  w:'Die Beziehung hat etwas Zauberhaftes, eine Verbundenheit jenseits von Worten.',
  h:'Die Beziehung hat etwas Zauberhaftes und etwas Nebliges zugleich. Man sieht einander leicht so, wie man es sich wünscht. Klarheit ist hier ein Liebesdienst.'},
 glueck:{n0:'Rückenwind',
  w:'Die Beziehung hat Rückenwind. Großzügigkeit und Vertrauen fallen leicht, und sie macht euch beide weiter.'}
};

/* ── Die chinesische Ebene ──────────────────────────────────── */
var BZS_TIER=[
 'wach, findig und charmant, mit feinem Gespür für Gelegenheiten',
 'beständig, geduldig und verlässlich, mit einer stillen Kraft',
 'mutig, leidenschaftlich und freiheitsliebend, mit großem Gerechtigkeitssinn',
 'sanft, feinfühlig und diplomatisch, mit einem Sinn für Schönheit und Frieden',
 'kraftvoll, begeisternd und großzügig, mit dem Mut zu großen Zielen',
 'klug, tief und geheimnisvoll, mit starker Intuition',
 'lebendig, frei und herzlich, immer in Bewegung',
 'weich, kreativ und mitfühlend, mit Sehnsucht nach Geborgenheit',
 'witzig, erfinderisch und schnell im Kopf, voller Ideen',
 'aufrichtig, genau und fleißig, mit klarem Blick für das Wesentliche',
 'treu, ehrlich und beschützend, mit starkem Sinn für Fairness',
 'warmherzig, genussvoll und großzügig, mit einem guten Herzen'];
var BZS_ELEMENT={Holz:'wachsend, großzügig, idealistisch', Feuer:'leidenschaftlich, strahlend, impulsiv',
 Erde:'geerdet, fürsorglich, verlässlich', Metall:'klar, entschlossen, mit festen Werten',
 Wasser:'tief, anpassungsfähig, intuitiv'};
var BZS_SANHE=['das Wasser-Dreieck der Tatkräftigen: Ratte, Drache und Affe',
 'das Metall-Dreieck der Beständigen: Schlange, Hahn und Büffel',
 'das Feuer-Dreieck der Freiheitsliebenden: Tiger, Pferd und Hund',
 'das Holz-Dreieck der Feinfühligen: Schwein, Hase und Ziege'];
/* Wie zwei Tiere zueinander stehen */
var BZS_TIERE={
 gleich:{n:'Dasselbe Tier', ton:'eng',
  t:'Ihr seid im selben Jahreszeichen geboren. Ihr versteht euch ohne Übersetzung und kennt die Schwächen des anderen, weil es die eigenen sind. Das verbindet, und es verdoppelt manchmal, was ohnehin zu viel ist.'},
 liuhe:{n:'Geheime Freunde', ton:'weich',
  t:'Eure Tiere bilden eines der sechs harmonischen Paare. In der chinesischen Tradition ist das die innigste Verbindung zweier Jahreszeichen: still, vertraut, wie füreinander gemacht. Was dem einen Zeichen fehlt, bringt das andere mit.'},
 sanhe:{n:'Dasselbe Dreieck', ton:'weich',
  t:'Eure Tiere gehören zum selben Dreieck der Harmonie, {gruppe}. Sie teilen eine Grundhaltung zum Leben und ziehen am selben Strang. Nach chinesischer Lesart eine der glücklichsten Verbindungen.'},
 chong:{n:'Gegenüber', ton:'hart',
  t:'Eure Tiere stehen sich im Kreis genau gegenüber. Die Tradition nennt das Zusammenstoß: zwei Temperamente, die sich stark anziehen und reiben. Gegenüberliegende Zeichen ergänzen sich oft, verlangen aber Respekt vor dem ganz anderen Tempo.'},
 hai:{n:'Verborgene Reibung', ton:'hart',
  t:'Eure Tiere bilden ein Paar, das in der Tradition als Schaden gilt: nach außen unauffällig, im Inneren kleine Kränkungen, die sich sammeln. Gemeint ist kein Unglück, sondern Missverständnisse, die man früh ansprechen kann.'},
 neutral:{n:'Freie Verbindung', ton:'frei',
  t:'Eure Tiere haben keine besondere Beziehung zueinander. Das ist der häufigste Fall und heißt: Hier entscheidet nicht das Zeichen, sondern das, was ihr daraus macht.'}
};
/* Der Platz der Partnerschaft, dieselben Beziehungen */
var BZS_PALAST={
 gleich:'Eure Partnerschaftsplätze tragen dasselbe Tier. Ihr sucht in naher Bindung dasselbe und erkennt das aneinander.',
 liuhe:'Eure Partnerschaftsplätze sind geheime Freunde. Im BaZi gilt das als eines der schönsten Zeichen für eine Partnerschaft: Nähe, die sich leicht und selbstverständlich anfühlt.',
 sanhe:'Eure Partnerschaftsplätze liegen im selben Dreieck der Harmonie. In naher Bindung zieht ihr in dieselbe Richtung.',
 chong:'Eure Partnerschaftsplätze stehen sich gegenüber. Im BaZi heißt das: Bewegung im Beziehungsleben, starke Anziehung und Unruhe zugleich. Diese Verbindung bleibt nicht stehen.',
 hai:'Eure Partnerschaftsplätze bilden ein Schadenspaar. In naher Bindung sammeln sich leicht unausgesprochene Kränkungen. Offenheit ist hier das Gegenmittel.',
 neutral:'Eure Partnerschaftsplätze haben keine besondere Beziehung zueinander. Die Nähe entsteht hier nicht aus dem Zeichen, sondern aus dem Alltag.'
};
/* Zwei Tagesmeister. {g} gibt oder bremst, {n} empfängt. */
var BZS_TAG={
 wuhe:{n:'Verbundene Tagesmeister', ton:'eng',
  t:'Eure Tagesmeister bilden eine der fünf klassischen Verbindungen. Im BaZi ist das das stärkste Zeichen für zwei Menschen, die sich anziehen und ergänzen: zwei Kräfte, die zusammen etwas Drittes werden. Es gilt als Zeichen einer tiefen, fast magnetischen Bindung.'},
 gleich:{n:'Gleiches Element', ton:'eng',
  t:'Ihr habt denselben Elementkern, {el}. Ihr seid wie Geschwister im Wesen, versteht euch schnell und wollt manchmal denselben Platz.'},
 naehrt:{n:'{g} nährt {n}', ton:'weich',
  t:'{gs} Element nährt {ns} Element: {eg} nährt {en}. {g} gibt, stärkt und unterstützt, oft ohne darüber nachzudenken. Für {n} fühlt sich das an wie Rückenwind. Wichtig ist, dass das Geben nicht nur in eine Richtung fließt.'},
 bremst:{n:'{g} bremst {n}', ton:'hart',
  t:'{gs} Element bremst {ns} Element: {eg} bremst {en}. Das gibt {n} Halt und Form, kann sich aber auch wie Kontrolle anfühlen. Was als Struktur gemeint ist, darf nicht zur Enge werden.'}
};
