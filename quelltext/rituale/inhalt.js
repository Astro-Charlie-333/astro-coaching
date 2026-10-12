/* ── Inhalte: Phasen, Zeichen, Transite, Material ──────── */

var ZEI=[['Widder','♈','feuer'],['Stier','♉','erde'],['Zwillinge','♊','luft'],
 ['Krebs','♋','wasser'],['Löwe','♌','feuer'],['Jungfrau','♍','erde'],
 ['Waage','♎','luft'],['Skorpion','♏','wasser'],['Schütze','♐','feuer'],
 ['Steinbock','♑','erde'],['Wassermann','♒','luft'],['Fische','♓','wasser']];

var HAUSTHEMA=['Auftreten und Selbstbild','Geld, Besitz und Selbstwert','Reden, Lernen, nähere Umgebung',
 'Zuhause und Herkunft','Ausdruck, Spiel, Verliebtsein','Alltag, Arbeit, Körper',
 'Gegenüber und Verbindlichkeit','Geteiltes, Tiefe, Loslassen','Sinn, Ferne, Überzeugung',
 'Beruf und Sichtbarkeit','Freundschaft und Zukunft','Rückzug, Unbewusstes, Ruhe'];

/* Die acht Phasen. Winkel = Mond minus Sonne. */
var PHASEN=[
 {a:0,  n:'Neumond',                   w:'Setzen',
  t:['Kein Mondlicht. Die einzige Nacht im Monat, in der nichts zu sehen ist — und genau deshalb die, in der du etwas formulieren kannst, ohne es sofort rechtfertigen zu müssen. Es gibt noch keine Zeugen.',
     'Astrologisch steht der Mond exakt auf der Sonne: Wille und Bedürfnis zeigen in dieselbe Richtung. Das ist selten, und es hält etwa drei Tage.'],
  tu:'Eine Intention schreiben. Eine, nicht fünf. Und einen ersten Schritt dazu, den du in 48 Stunden tust.'},
 {a:45, n:'Zunehmende Sichel',         w:'Zeigen',
  t:['Die erste sichtbare Sichel, drei bis vier Tage nach dem Neumond. Jetzt weiß zum ersten Mal jemand anders davon — und das ist der Punkt, an dem die meisten Vorhaben sterben, weil man sie noch einen Tag für sich behalten will.',
     'Hier geht es nicht um Fortschritt, sondern um Bezeugung. Etwas wird real, wenn es außerhalb deines Kopfes existiert.'],
  tu:'Einen Menschen einweihen oder einen Schritt nach außen tun: eine Nachricht abschicken, einen Termin machen, eine Anmeldung ausfüllen. Klein genug, dass es heute passiert.'},
 {a:90, n:'Erstes Viertel',            w:'Entscheiden',
  t:['Halbmond, und der erste echte Widerstand. Eine Woche nach dem Neumond zeigt sich, was der Sache im Weg steht — Zeit, Geld, ein Mensch, eine Gewohnheit.',
     'Die Versuchung ist, die Intention umzuformulieren, bis sie wieder bequem ist. Das ist der Fehler. Die Spannung ist nicht das Zeichen, dass es die falsche Sache war. Sie ist das Zeichen, dass du angefangen hast.'],
  tu:'Eine Entscheidung treffen, die den Widerstand auflöst statt ihn zu umgehen. Aufschreiben, was sie kostet — und sie trotzdem treffen.'},
 {a:135,n:'Zunehmender Dreiviertelmond',w:'Nachjustieren',
  t:['Fast voll. Die Sache läuft, aber nicht so, wie du dachtest. Das ist normal und kein Grund umzukehren.',
     'Diese Phase wird fast nie beachtet, weil nichts Dramatisches passiert. Dabei ist sie die, in der aus einem Vorsatz ein Ergebnis wird oder eben nicht.'],
  tu:'Nicht neu anfangen, nachschärfen. Was genau funktioniert nicht — und was ist die kleinste Änderung, die das behebt? Aufschreiben, umsetzen, weiter.'},
 {a:180,n:'Vollmond',                  w:'Sehen',
  t:['Maximales Licht, und zwar auf alles. Mond und Sonne stehen sich gegenüber: Was du willst und was du brauchst, ziehen in verschiedene Richtungen, und du spürst beides gleichzeitig.',
     'Deshalb sind Vollmonde unruhig. Es ist nicht der Mond, der dich wach hält — es ist, dass hier sichtbar wird, was zwei Wochen lang unter dem Tempo lag.'],
  tu:'Den Neumondzettel rausholen. Drei Fragen: Was ist passiert? Was hat mich aufgehalten? Was davon war ich selbst? Und dann: eine Sache benennen, mit der du fertig bist.'},
 {a:225,n:'Abnehmender Dreiviertelmond',w:'Weitergeben',
  t:['Das Licht nimmt ab, aber noch ist viel da. Die Phase, in der aus einer Erfahrung etwas wird, das anderen nützt.',
     'In der traditionellen Einteilung heißt sie die verbreitende Phase. Was du gelernt hast, bleibt Privatbesitz, bis du es jemandem erzählst.'],
  tu:'Erzählen, posten, beibringen, beantworten. Eine Sache, die du im letzten Monat verstanden hast, in eigene Worte fassen — für jemanden, nicht für dich.'},
 {a:270,n:'Letztes Viertel',           w:'Abschneiden',
  t:['Der zweite Halbmond, die zweite Spannung — nur diesmal nach innen. Hier zeigt sich, was im nächsten Zyklus nicht mehr mitkommen darf.',
     'Dies ist die ehrlichste Phase des Monats und die unbeliebteste, weil sie etwas kostet.'],
  tu:'Eine Sache tatsächlich beenden. Nicht vornehmen — tun. Kündigen, löschen, absagen, wegwerfen, aufräumen. Eine Sache, heute.'},
 {a:315,n:'Abnehmende Sichel',         w:'Leer werden',
  t:['Die letzten drei Tage vor dem Neumond. Fast kein Licht mehr, und spürbar wenig Kraft. Das ist keine Schwäche, das ist der Zyklus.',
     'Wenn du dir in diesen Tagen regelmäßig vorwirfst, nichts zu schaffen, lohnt es sich, einen Monat lang nachzuschauen, ob es immer dieselben Tage sind.'],
  tu:'Nichts. Das ist das Ritual. Keine Termine, die dich kosten, keine neuen Vorhaben. Schlafen, lesen, aufräumen, still sein. Was du jetzt nicht tust, musst du nicht nachholen.'}
];

/* Je Zeichen: Thema, Handlung, Satz */
var ZTEXT=[
 ['Anfangen ohne Erlaubnis','Tu etwas, bevor du es zu Ende gedacht hast. Die Nachricht abschicken, die Anmeldung ausfüllen, den Anruf machen. Widder-Lunationen belohnen nicht die beste Entscheidung, sondern die getroffene.','Ich fange an, bevor ich mich bereit fühle.'],
 ['Halten und genießen','Iss etwas Gutes, langsam, ohne Bildschirm — oder streich eine Ausgabe, die dich ärgert. Stier fragt nicht, was du erreichen willst, sondern was du behalten willst.','Ich darf etwas behalten, ohne es zu verdienen.'],
 ['Fragen und sagen','Schreib die Frage auf, die du dich nicht zu stellen traust. Und dann stell sie — heute, nicht irgendwann. Zwillinge-Lunationen lösen sich über Worte, nicht über Einsicht.','Ich darf nachfragen, auch wenn es dumm klingt.'],
 ['Zuhause und Herkunft','Richte eine Ecke der Wohnung her, die nur dir gehört — keine Ablage, kein Durchgang. Oder ruf jemanden an, bei dem du dich als Kind sicher gefühlt hast.','Ich sorge für mich wie für jemanden, den ich mag.'],
 ['Gesehen werden','Zeig etwas Eigenes, bevor es fertig ist. Posten, vorlesen, schicken. Löwe-Lunationen verlangen ein Publikum, und sei es eins.','Ich zeige es, bevor es perfekt ist.'],
 ['Ordnen und fertig machen','Nimm die eine Sache, die seit Wochen halbfertig herumliegt, und mach sie zu Ende. Nur die eine. Jungfrau-Lunationen gehen schief, wenn man ein System baut statt eine Aufgabe zu erledigen.','Gut genug ist fertig.'],
 ['Ausgleich und Nein','Nimm eine Zusage zurück, die du aus Höflichkeit gegeben hast. Waage-Lunationen handeln nicht von Harmonie, sondern davon, dass du im Gleichgewicht mit vorkommst.','Ich darf absagen, ohne es zu erklären.'],
 ['Wahrheit und Tiefe','Schreib etwas auf, das du noch niemandem gesagt hast — und behalte es. Nicht verschicken. Skorpion-Lunationen wollen, dass du es weißt, nicht dass du es beichtest.','Ich schaue hin, auch wenn es unangenehm ist.'],
 ['Weite und Sinn','Such dir einen Ort, an dem du weit sehen kannst, und bleib zwanzig Minuten. Oder lies etwas, das nichts mit deinem Alltag zu tun hat.','Es gibt mehr als das hier, und ich darf es wissen wollen.'],
 ['Struktur und Grenze','Schreib eine Regel auf, die ab heute gilt — für dich, nicht für andere. Eine, die du auch einhältst, wenn jemand ungehalten wird. Steinbock-Lunationen prüfen, ob eine Grenze nur eine Ankündigung war.','Das ist meine Grenze, und sie gilt auch, wenn jemand sauer wird.'],
 ['Freiheit und Eigenart','Lass etwas, das du nur machst, weil man es so macht. Eine Gewohnheit, eine Gruppe, eine Erwartung. Wassermann-Lunationen bringen nichts Neues, sie räumen Platz.','Ich muss nicht so sein, wie es naheliegt.'],
 ['Auflösen und Ruhe','Eine Stunde ohne Plan. Wasser hilft — Bad, Dusche, See, auch nur die Hände unter den Hahn. Fische-Lunationen sind die einzigen, bei denen Nichtstun die Handlung ist.','Ich muss das nicht lösen. Ich muss es nur aushalten, bis es sich sortiert.']
];

/* Transit-Rituale */
var TRANSITE=[
 {t:'Merkur rückläufig', w:'dreimal im Jahr, je gut drei Wochen',
  h:'<p>Der berühmteste Transit, und der am stärksten übertriebene. Was sich wirklich zeigt: Dinge, die du für erledigt hieltest, kommen zurück. Alte Nachrichten, alte Namen, alte Entwürfe. Das ist kein Unglück, das ist ein Angebot.</p>'+
    '<div class="rit"><b>Zum Beginn — Rückschau</b>Schreib drei Dinge auf, die du angefangen und nicht beendet hast. Nicht bewerten, nur auflisten. Leg den Zettel weg.</div>'+
    '<div class="rit"><b>Zum Ende — Wiederaufnahme</b>Nimm den Zettel, wähle eine der drei, und mach den nächsten Schritt. Die anderen zwei streichst du durch. Auch das ist ein Ergebnis.</div>'+
    '<p>Zu der Regel, man solle nichts unterschreiben: In der Sache überbewertet. Was stimmt, ist, dass man in diesen Wochen genauer liest, und genauer lesen ist immer gut. Wenn ein Vertrag jetzt nicht standhält, hätte er es auch im Juli nicht getan.</p>'},
 {t:'Venus rückläufig', w:'alle rund 18 Monate, etwa sechs Wochen',
  h:'<p>Seltener und spürbarer als Merkur. Menschen tauchen wieder auf. Und das, was du an Zuneigung, Zeit und Geld in andere steckst, wird unangenehm gut sichtbar.</p>'+
    '<div class="rit"><b>Das Ritual — Inventur</b>Schreib eine Liste: Wen bezahle ich — mit Geld, Zeit oder Aufmerksamkeit — ohne dass etwas zurückkommt? Vollständig, auch die unbequemen Namen. Dann leg sie weg und tu <b>nichts</b> damit.</div>'+
    '<div class="nicht"><b>Nicht jetzt</b>Keine Trennung aussprechen, keine Versöhnung einleiten, keine große Anschaffung. Was während der Rückläufigkeit entschieden wird, sieht danach oft anders aus. Warte, bis Venus direkt läuft, nimm die Liste wieder raus — und dann handle.</div>'},
 {t:'Mars rückläufig', w:'alle rund zwei Jahre, etwa zehn Wochen',
  h:'<p>Die Kraft geht nach innen. Was sonst nach außen gehen würde — Wut, Antrieb, Durchsetzung — staut sich und richtet sich gegen einen selbst. Typisch: Erschöpfung ohne erkennbaren Grund, und eine Gereiztheit, die niemanden trifft außer dich.</p>'+
    '<div class="rit"><b>Das Ritual — wo geht die Kraft hin</b>Drei Spalten auf ein Blatt: <i>Wofür arbeite ich?</i> — <i>Wer hat es verlangt?</i> — <i>Will ich es?</i> Zeile für Zeile durchgehen. Die Zeilen, in denen Spalte drei leer bleibt, sind die Antwort.</div>'+
    '<div class="nicht"><b>Nicht jetzt</b>Keine Konfrontation, die du gewinnen willst. Mars rückläufig trifft daneben — du bist nicht schwächer, aber du zielst schlechter.</div>'},
 {t:'Finsternisse', w:'zweimal im Jahr, paarweise',
  h:'<p>Hier steht bewusst kein Ritual, und das ist die Empfehlung.</p>'+
    '<div class="nicht"><b>Kein Manifestieren</b>Die Tradition ist sich an dieser Stelle ungewöhnlich einig: Zu Finsternissen setzt man keine Intentionen. Der Grund ist weniger mystisch als er klingt — was an Finsternissen in Bewegung gerät, hast du nicht ausgesucht. Ein Ritual, das so tut, als könntest du es lenken, baut dir vier Wochen später ein Gefühl von Versagen, für etwas, das nie in deiner Hand lag.</div>'+
    '<div class="rit"><b>Was stattdessen geht — Protokoll</b>Schreib auf, was gerade passiert. Nicht was du willst, sondern was ist. Datum dazu, Zettel weg, Erinnerung in sechs Monaten. Finsternisse zeigen ihre Bedeutung rückwärts, fast nie im Moment.</div>'+
    '<p>Richtig relevant wird eine Finsternis ohnehin nur, wenn sie nah an einem Punkt in deinem eigenen Chart steht — ein paar Grad, nicht irgendwo im selben Zeichen. Alles andere ist Hintergrund.</p>'},
 {t:'Saturn — Return oder Quadrat', w:'mit 29, 58 — dazwischen alle sieben Jahre ein Winkel',
  h:'<p>Kein Monatsthema, sondern ein Thema von zwei, drei Jahren. Saturn fragt nicht, was du willst, sondern was trägt. Alles, was auf einer zu dünnen Grundlage stand, wird in dieser Zeit spürbar unbequem — Beruf, Wohnort, Beziehung, der eigene Umgang mit Geld.</p>'+
    '<div class="rit"><b>Das Ritual — Grenzstein setzen</b>Einmal, am Anfang. Zwei Listen auf einem Blatt: <i>Was mache ich in drei Jahren noch?</i> und <i>Was habe ich bis dahin beendet?</i> Datieren, unterschreiben, an einen Ort legen, den du wiederfindest. Dann ein Jahr nicht anschauen.</div>'+
    '<p>Die zweite Liste ist die wichtige. Saturn-Zeiten gehen selten daran vorbei, dass man etwas aufgibt; die Frage ist nur, ob man es aussucht.</p>'},
 {t:'Jupiter durch ein Haus', w:'rund ein Jahr pro Lebensbereich',
  h:'<p>Jupiter macht größer, was er berührt — die Möglichkeiten und den Aufwand. Er bringt nichts von allein; er öffnet eine Tür und wartet, ob jemand durchgeht.</p>'+
    '<div class="rit"><b>Am Anfang</b>Ein Satz: Wenn in diesem Bereich nichts im Weg stünde, was würde ich größer machen? Aufschreiben, datieren.</div>'+
    '<div class="rit"><b>Am Ende</b>Denselben Zettel rausholen. Was ist tatsächlich gewachsen — und war es das, was du aufgeschrieben hattest?</div>'},
 {t:'Pluto-Transit', w:'Jahre, manchmal ein Jahrzehnt',
  h:'<p>Der einzige Transit, bei dem ein Ritual nichts beschleunigt. Pluto nimmt sich die Zeit, die er braucht, und was er umbaut, baut sich nicht zurück.</p>'+
    '<div class="rit"><b>Was ein Ritual hier leisten kann</b>Es markiert, dass du drinsteckst. Das klingt klein und ist es nicht: Der größte Schaden in solchen Jahren entsteht dadurch, dass man sich an der Person misst, die man vorher war, und sich für träge hält. Schreib einen Brief an dich selbst für danach. Keine Ziele — beschreib nur, wie es jetzt ist. Verschlossen weglegen.</div>'+
    '<p>Und der ehrliche Teil: Wenn ein Pluto-Transit mit einer Krise zusammenfällt, die dich wirklich übersteigt, ist die richtige Adresse eine Therapeutin und nicht ein Chart. Beides geht gleichzeitig, aber nicht statt.</p>'},
 {t:'Solar Return — dein Geburtstag', w:'einmal im Jahr, auf die Minute genau',
  h:'<p>Der Moment, in dem die Sonne wieder exakt dort steht wie bei deiner Geburt — meist einen Tag vor oder nach dem Kalendergeburtstag, zu einer krummen Uhrzeit. Das ist der eigentliche Jahreswechsel.</p>'+
    '<div class="rit"><b>Das Ritual — zwölf Sätze</b>Nimm dir eine Stunde möglichst nah am exakten Zeitpunkt. Ein Satz pro Lebensbereich, zwölf insgesamt: Körper, Geld, Reden, Zuhause, Ausdruck, Alltag, Gegenüber, Tiefe, Sinn, Beruf, Freundschaft, Ruhe. Je Bereich ein Satz darüber, wie es gerade ist. Im nächsten Jahr schreibst du die zwölf neu und legst sie daneben.</div>'+
    '<p>Nach drei Jahren ist das die aufschlussreichste Sammlung, die du über dich besitzt — und zwar deshalb, weil du beim Schreiben nicht wusstest, was wichtig werden würde.</p>'},
 {t:'Mondknoten-Transit', w:'Knotenrückkehr mit 18, 37, 56',
  h:'<p>Die Knoten laufen rückwärts durch den Tierkreis und brauchen gut 18 1/2 Jahre für eine Runde. Bei der Rückkehr stehen sie wieder, wo sie bei deiner Geburt standen — dieselbe Abzweigung, anderes Alter.</p>'+
    '<div class="rit"><b>Das Ritual — zurück zur Abzweigung</b>Rechne nach, was mit 18 beziehungsweise 37 bei dir los war. Schreib auf, welche Entscheidung damals fiel — und ob du sie heute wieder so träfst. Es geht nicht ums Bereuen. Es geht darum, dass dieselbe Frage noch einmal vorbeikommt und du diesmal mehr weißt.</div>'}
];

/* Material */
var MATERIAL=[
 {n:'Palo Santo', m:['acht','Herkunft prüfen'],
  t:['<i>Bursera graveolens</i> steht auf der Roten Liste der IUCN als <b>nicht gefährdet</b> — die weit verbreitete Behauptung, die Art sei vom Aussterben bedroht, verwechselt sie meist mit <i>Bulnesia sarmientoi</i>, einem anderen Baum, der tatsächlich geschützt ist.',
     'Das Problem liegt woanders: In Nordwestperu wird illegal geschlagen, weil die Nachfrage hoch ist. Traditionell wird nur Holz verwendet, das von selbst gefallen ist und mehrere Jahre gelegen hat — daher kommt der Duft überhaupt erst. Peru hatte den Baum 2006 unter Schutz gestellt, genau mit dieser Regel.',
     'Praktisch heißt das: Es spricht nichts dagegen, deins aufzubrauchen. Beim Nachkaufen auf die Angabe achten, dass es Fallholz aus zertifiziertem Anbau ist.']},
 {n:'Weißer Salbei', m:['acht','Heikler als gedacht'],
  t:['<i>Salvia apiana</i> ist nicht offiziell geschützt, aber die kalifornische Native Plant Society gibt an, dass rund die Hälfte der Bestände durch Bebauung verlorengegangen ist. Dazu kommt Wilderei auf öffentlichem Land, die dort verboten ist und trotzdem stattfindet.',
     'Der zweite Punkt wiegt schwerer: Das Räuchern mit weißem Salbei stammt aus Zeremonien indigener Nationen Nordamerikas. Mehrere von ihnen haben sich ausdrücklich dagegen ausgesprochen, dass die Praxis übernommen und verkauft wird — in einem Land, in dem sie ihnen über Jahrzehnte gesetzlich verboten war.',
     'Das heißt nicht, dass du deins wegwerfen musst. Es heißt, dass es dafür europäische Pflanzen gibt, die dasselbe tun — und die hier wachsen.']},
 {n:'Was stattdessen geht', m:['gut','Nebenan gewachsen'],
  t:['<b>Beifuß</b> ist das klassische Räucherkraut Mitteleuropas, die Pflanze der Rauhnächte. Wächst an jedem Bahndamm, lässt sich im Spätsommer schneiden und trocknen.',
     '<b>Wacholder</b>, <b>Lorbeer</b>, <b>Rosmarin</b>, <b>Lavendel</b>, <b>Fichtenharz</b> — alle seit Jahrhunderten hier in Gebrauch, alle problemlos zu bekommen. Harze brauchen ein Sieb oder eine Kohle, Kräuter brennen direkt.',
     'Und falls Rauch für dich reiztechnisch ohnehin schwierig ist: Eine Kerze tut dasselbe. Der Zweck ist ein körperliches Signal, kein bestimmter Geruch.']},
 {n:'Feuer, aber sicher', m:['acht','Kurz und wichtig'],
  t:['Verbrennen gehört in eine Metallschüssel, ein Waschbecken oder nach draußen. Papier in kleine Stücke reißen, eins nach dem anderen. Fenster auf, und nichts brennen lassen, während du den Raum verlässt.',
     'Rauchmelder reagieren auf Räucherwerk zuverlässig. Das ist kein Scherz, sondern der häufigste Grund, warum ein Vollmondritual mit einem Schreck endet.',
     'Und zur Ehrlichkeit: Verbrennen wirkt nicht besser als Zerreißen. Es fühlt sich endgültiger an, und das ist der ganze Unterschied — aber der ist echt.']},
 {n:'Mondwasser', m:['frei','Was dran ist'],
  t:['Ein Glas Wasser über Nacht auf die Fensterbank, am Morgen trinken. Chemisch passiert daran nichts. Das Wasser ist am Morgen dasselbe Wasser.',
     'Was passiert: Du trinkst es bewusst, mit einem Gedanken dabei, und zwar als erstes an diesem Tag. Dass der Mond nichts tut, hebt diesen Teil nicht auf.',
     'Nur bitte abgedeckt und drinnen am Fenster, nicht offen draußen über Nacht.']},
 {n:'Was du nicht brauchst', m:['frei','Entlastung'],
  t:['Keine Kristalle, keine bestimmten Karten, kein Set für 60 Euro, keine spezielle Uhrzeit auf die Minute, keine Himmelsrichtung, kein Kreis aus Salz.',
     'Nicht weil nichts davon schön wäre — sondern weil jedes zusätzliche Teil die Schwelle höher legt. Ein Ritual, das Vorbereitung braucht, findet beim dritten Mal nicht mehr statt.',
     'Unverzichtbar sind genau drei Dinge: zwanzig Minuten, Papier, und dass das Handy in einem anderen Raum liegt.']}
];

var QUELLEN='Zu den Pflanzenangaben: '+
 '<a href="https://en.wikipedia.org/wiki/Bursera_graveolens" target="_blank" rel="noopener">IUCN-Einstufung und Lage in Peru</a> &middot; '+
 '<a href="https://www.csulb.edu/college-of-business/legal-resource-center/article/ecological-damage-white-sage" target="_blank" rel="noopener">Bestandsverluste und Stimmen indigener Nationen zum weißen Salbei</a>. '+
 'Alles Astrologische auf dieser Seite ist Tradition und Deutung, keine Naturwissenschaft — die Rechnung dahinter stimmt, die Bedeutung ist eine Vereinbarung.';
