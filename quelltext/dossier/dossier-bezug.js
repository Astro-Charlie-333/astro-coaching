/* Astro-Charlie · Dossier — der Bezug zwischen dir und der Person
   ----------------------------------------------------------------
   Der Grundgedanke: Ein Chart ist nicht neutral lesbar. Dieselbe Stellung
   bedeutet etwas anderes, je nachdem, in welchem Verhältnis du zu dem
   Menschen stehst — weil sich nicht die Person ändert, sondern was du
   mit dem Gelesenen anfangen darfst und wofür du zuständig bist.

   Der Mond einer Klientin ist eine Arbeitsangabe.
   Derselbe Mond bei deiner Mutter ist deine Kindheit.
   Derselbe Mond bei deinem Kind ist deine Verantwortung.

   Drei Dinge hängen deshalb am Bezug:
     1. gewicht  — welche Häuser und Planeten stärker zählen
     2. lesart   — wie dieselbe Stellung gelesen wird
     3. stellung — was deine Rolle erlaubt und wo sie endet            */

var BEZUG={
 klientin:{n:'Klient*in', klasse:'klientin', haus:[1,6,12,10],
   kurz:'Du arbeitest beruflich mit dieser Person.',
   punkte:['ASC','Saturn','Chiron'], auftrag:true},
 selbst:{n:'Du selbst', klasse:'selbst', haus:[1,4,10,12],
   kurz:'Dein eigenes Dossier — dieselbe Methode, auf dich angewendet.',
   punkte:['ASC','Mond','Saturn']},
 liebe:{n:'Partner*in', klasse:'liebe', haus:[7,8,5,4],
   kurz:'Ihr seid zusammen.',
   punkte:['Venus','Mars','Mond']},
 ex:{n:'Ex-Partner*in', klasse:'ex', haus:[8,7,12,4],
   kurz:'Ihr wart zusammen und habt noch miteinander zu tun.',
   punkte:['Pluto','Saturn','Venus']},
 mutter:{n:'Mutter', klasse:'eltern', haus:[4,10,12],
   kurz:'Diese Person hat dich großgezogen oder hätte es sollen.',
   punkte:['Mond','Saturn','Pluto'], eltern:true},
 vater:{n:'Vater', klasse:'eltern', haus:[10,4,9],
   kurz:'Diese Person hat dich großgezogen oder hätte es sollen.',
   punkte:['Sonne','Saturn','Mars'], eltern:true},
 kind:{n:'Eigenes Kind', klasse:'kind', haus:[5,4,1,11],
   kurz:'Du bist für diesen Menschen verantwortlich.',
   punkte:['Mond','Merkur','Mars'], kind:true},
 geschwister:{n:'Geschwister', klasse:'peer', haus:[3,4,11],
   kurz:'Ihr seid zusammen aufgewachsen.',
   punkte:['Merkur','Mars','Mond']},
 freundin:{n:'Freund*in', klasse:'peer', haus:[11,3,9],
   kurz:'Ihr habt euch ausgesucht.',
   punkte:['Merkur','Jupiter','Mond']},
 kollegin:{n:'Arbeit', klasse:'arbeit', haus:[6,10,11],
   kurz:'Ihr arbeitet zusammen oder übereinander.',
   punkte:['Merkur','Saturn','Mars']}
};
var BEZUG_FOLGE=['klientin','selbst','liebe','ex','mutter','vater','kind',
                 'geschwister','freundin','kollegin'];

/* ── 1 · Deine Stellung ───────────────────────────────────────────
   Was deine Rolle dir erlaubt — und wo sie aufhört. Das ist der
   Abschnitt, den man am ehesten überspringt und am teuersten bezahlt. */
var STELLUNG={
 klientin:{
  bist:'Du bist die Coachin. Das ist die einzige Rolle hier, die einen Auftrag hat.',
  darfst:'Deuten, nachfragen, widersprechen, Hausaufgaben geben. Du darfst auch sagen, dass du etwas nicht kannst — das gehört zur Rolle und schwächt sie nicht.',
  nicht:'Therapie. Diagnosen. Und: Du bist nicht dafür zuständig, dass es dieser Person gut geht. Du bist dafür zuständig, dass die Stunde etwas taugt. Der Unterschied ist das, was dich über Jahre trägt.',
  gefahr:'Die typische Entgleisung ist Übernahme — du trägst die Sache zwischen den Terminen weiter, sie nicht. Wenn du mehr arbeitest als die Person selbst, ist etwas gekippt.'},
 selbst:{
  bist:'Du liest dein eigenes Chart. Das ist die schwierigste Leserichtung, nicht die leichteste.',
  darfst:'Alles. Es ist deins.',
  nicht:'Dir selbst glauben, ohne nachzusehen. Bei einem fremden Chart prüfst du gegen das, was die Person erzählt. Bei dir fällt diese Kontrolle weg, und du bestätigst dir, was du ohnehin schon denkst.',
  gefahr:'Du liest die Stellen hart, an denen du dich ohnehin kritisierst, und überliest die, an denen du dir etwas zugestehen müsstest. Gegenmittel: Lies dein Dossier einmal so, als wäre es das einer Klientin. Was würdest du ihr sagen?'},
 liebe:{
  bist:'Du bist beteiligt. Nicht Beobachterin — Partei.',
  darfst:'Verstehen, warum etwas regelmäßig an derselben Stelle hakt. Deine eigene Reaktion anders legen. Ein Gespräch besser vorbereiten.',
  nicht:'Das hier als Beweismittel benutzen. „Dein Mars im Quadrat, deshalb hast du gestern…" ist kein Argument, das ist Astrologie als Waffe. Und das Dossier ersetzt nicht, die Person zu fragen.',
  gefahr:'Dass du die Deutung behältst statt sie zu teilen. Wenn du etwas Wichtiges hier liest und es nie zur Sprache kommt, hast du eine Beschreibung statt einer Beziehung.'},
 ex:{
  bist:'Du hast Abstand und zugleich noch Berührung. Die unübersichtlichste Lage von allen.',
  darfst:'Dich sortieren. Das Muster sehen, ohne es noch einmal zu durchleben. Auf einen anstehenden Kontakt vorbereiten.',
  nicht:'Hoffen, dass das Chart dir sagt, ob es doch gehen könnte. Das kann es nicht, und du liest es dann so, wie du es brauchst.',
  gefahr:'Dass Verstehen zum Ersatz fürs Abschließen wird. Je länger du hier liest, desto mehr Kontakt besteht — innerlich. Wenn du merkst, dass du wiederholt zurückkommst, ist die Frage nicht mehr astrologisch.'},
 eltern:{
  bist:'Du bist das Kind. Auch wenn du vierzig bist und die Person Hilfe braucht.',
  darfst:'Begreifen, woher etwas kam. Das ist das Große: zu sehen, dass ein Satz, der an dir hing, ein Satz von ihnen war — und zwar einer, den sie selbst irgendwo herhatten.',
  nicht:'Deine Eltern mit diesem Dossier therapieren. Es ist nicht deine Aufgabe, und sie haben nicht darum gebeten. Verstehen ist für dich gedacht, nicht für sie.',
  gefahr:'Zwei Richtungen. Die eine ist Entschuldigung: „Sie konnte nicht anders" wird zum Grund, nichts mehr zu erwarten. Die andere ist Anklage: endlich der Beweis, dass es an ihnen lag. Beides beendet das Nachdenken an der Stelle, an der es anfangen müsste.'},
 kind:{
  bist:'Du bist verantwortlich. Das ist der einzige Bezug hier mit echtem Gefälle.',
  darfst:'Dein Kind besser erreichen. Verstehen, warum etwas, das bei dir funktioniert hat, bei ihm nicht greift.',
  nicht:'Festlegen. Ein Chart beschreibt eine Anlage, kein Schicksal, und ein Kind, dem man sagt, wie es ist, richtet sich danach. Das ist bei Kindern kein akademisches Risiko, sondern das wahrscheinlichste Ergebnis.',
  gefahr:'Dass du Entwicklung als Charakter liest. Vieles, was du in einem Kinderchart findest, zeigt sich erst mit zwanzig oder nie. Lies es als Hinweis auf das, was dein Kind von dir braucht — nicht als Beschreibung dessen, wer es ist.'},
 peer:{
  bist:'Ihr seid auf Augenhöhe. Niemand hat hier einen Auftrag.',
  darfst:'Rücksicht nehmen, ohne zu fragen. Verstehen, warum ein bestimmter Ton bei dieser Person nicht ankommt.',
  nicht:'Ungefragt deuten. „Ich hab mal dein Chart gemacht" ist für viele Menschen übergriffig, auch wenn es freundlich gemeint ist — und besonders dann, wenn du etwas Treffendes gefunden hast.',
  gefahr:'Dass du anfängst, Verhalten zu erklären statt es zu erleben. Freundschaft lebt davon, dass die andere dich überrascht. Ein zu gut gelesenes Chart nimmt das weg.'},
 arbeit:{
  bist:'Ihr habt eine Aufgabe gemeinsam, keine Beziehung.',
  darfst:'Zusammenarbeit leichter machen. Wissen, wann du jemandem etwas schriftlich geben solltest statt mündlich.',
  nicht:'Das Private mitlesen. Was im 8. oder 12. Haus steht, geht dich in einem Arbeitsverhältnis nichts an — auch wenn du es sehen kannst.',
  gefahr:'Dass du Einschätzung mit Wissen verwechselst und jemanden in eine Rolle schiebst, aus der er nicht mehr rauskommt. Im Beruf wiegt so etwas schwerer, weil Entscheidungen daran hängen.'}
};

/* ── 2 · Die Umgewichtung ─────────────────────────────────────────
   Was in diesem Verhältnis stärker zählt. Nicht Geschmack, sondern
   die Häuser, die den Bezug tragen, plus die Planeten, über die er läuft. */
var GEWICHT={
 klientin:{haus:{1:1.5,6:1.4,12:1.4,10:1.3,2:1.2}, punkt:{Saturn:1.4,Chiron:1.4,ASC:1.3},
  warum:'Im Coaching zählt, was die Person mitbringt (1. Haus), was sie täglich tut (6.), was sie selbst nicht sieht (12.) und wofür sie angetreten ist (10.).'},
 selbst:{haus:{1:1.4,12:1.4,4:1.3,10:1.3}, punkt:{Mond:1.3,Saturn:1.3,Chiron:1.3},
  warum:'Bei dir selbst sind die blinden Stellen interessanter als die offensichtlichen — deshalb zählt das 12. Haus so viel wie das erste.'},
 liebe:{haus:{7:1.7,8:1.5,5:1.4,4:1.3}, punkt:{Venus:1.5,Mars:1.4,Mond:1.4},
  warum:'Das 7. Haus ist, was die Person in Partnerschaft sucht; das 8. ist, was sie dort nicht zeigt; das 5. ist, wie sie begehrt; das 4., was sie Zuhause nennt.'},
 ex:{haus:{8:1.7,7:1.4,12:1.4,4:1.3}, punkt:{Pluto:1.5,Saturn:1.4,Lilith:1.3},
  warum:'Nach einer Trennung läuft fast alles über das 8. Haus — Besitz, Verlust, was geteilt war und wie entwirrt wird. Das 12. kommt dazu, weil vieles unausgesprochen bleibt.'},
 eltern:{haus:{4:1.6,10:1.4,12:1.4,8:1.3}, punkt:{Mond:1.5,Saturn:1.5,Pluto:1.3},
  warum:'Bei einem Elternteil liest du das 4. Haus doppelt: Es ist ihr Zuhause und es war deins. Das 12. zählt, weil das, was sie nie ausgesprochen haben, bei dir angekommen ist.'},
 kind:{haus:{5:1.5,4:1.5,1:1.4,3:1.3}, punkt:{Mond:1.6,Merkur:1.4,Mars:1.3},
  warum:'Beim eigenen Kind ist der Mond das Wichtigste überhaupt — er sagt, wodurch sich dieses Kind sicher fühlt, und das ist in den ersten Jahren fast die ganze Information.'},
 peer:{haus:{11:1.5,3:1.4,9:1.3,5:1.2}, punkt:{Merkur:1.4,Jupiter:1.3,Mond:1.2},
  warum:'Unter Gleichen läuft es über das 11. Haus (worauf ihr gemeinsam zugeht), das 3. (wie geredet wird) und das 9. (ob ihr dieselbe Welt seht).'},
 arbeit:{haus:{6:1.6,10:1.5,11:1.3,3:1.3}, punkt:{Merkur:1.5,Saturn:1.4,Mars:1.3},
  warum:'Im Beruf zählt das 6. Haus (wie jemand arbeitet) mehr als das 10. (wohin er will) — und Merkur mehr als alles andere, weil fast jeder Konflikt bei der Arbeit ein Kommunikationskonflikt ist.'}
};

/* ── 3 · Der Mond, je nach Bezug ──────────────────────────────────
   Der Mond ist die Stellung, die sich am stärksten verändert, wenn sich
   das Verhältnis ändert. Bei jedem Bezug steht er für etwas anderes. */
var MOND_BEZUG={
 klientin:{ist:'eine Arbeitsangabe',
  t:'Der Mond sagt dir, wodurch diese Person sich sicher fühlt — und damit, unter welcher Bedingung überhaupt gearbeitet werden kann. Solange der Mond nicht bedient ist, greift keine Einsicht. Das ist die Reihenfolge, die im Coaching am häufigsten übersprungen wird: erst Sicherheit, dann Arbeit.'},
 selbst:{ist:'deine Betriebsbedingung',
  t:'Dein Mond ist das, was du brauchst, bevor du überhaupt leistungsfähig bist. Die meisten Menschen behandeln ihn als Luxus und wundern sich, warum die Disziplin nicht hält. Es ist umgekehrt: Der Mond ist die Voraussetzung, nicht die Belohnung.'},
 liebe:{ist:'die eigentliche Verträglichkeitsfrage',
  t:'In einer Partnerschaft entscheidet der Mond mehr als Venus. Venus sagt, was jemand schön findet; der Mond sagt, was ihn beruhigt — und zusammen lebt man mit dem Mond, nicht mit dem Geschmack. Die meisten Dauerkonflikte in Beziehungen sind Mondkonflikte: zwei Menschen, die unter verschiedenen Bedingungen zur Ruhe kommen.'},
 ex:{ist:'der Grund, warum es nicht ging',
  t:'Im Rückblick ist der Mond fast immer die Stelle. Nicht der Streit, nicht die Umstände — sondern dass eine der beiden Arten, sich sicher zu fühlen, in dieser Konstellation nicht bedient werden konnte. Das ist weder Schuld noch Versagen. Es ist eine Unverträglichkeit, und sie wäre auch mit mehr Mühe nicht verschwunden.'},
 eltern:{ist:'deine Kindheit, von innen gesehen',
  t:'Hier wird es ernst: Der Mond deiner Mutter oder deines Vaters beschreibt, wodurch <i>sie</i> sich sicher fühlten — und damit die Atmosphäre, in der du aufgewachsen bist. Was dieser Mond brauchte, hat das Haus bestimmt. Was er nicht konnte, hast du als normal gelernt. Das ist die Stelle, an der ein Elterndossier etwas erklärt, das du sonst dir selbst zuschreibst.'},
 kind:{ist:'deine wichtigste Information überhaupt',
  t:'Beim eigenen Kind ist der Mond fast die ganze Nachricht. Er sagt, wodurch dieses Kind sich sicher fühlt — und Kinder lernen, entwickeln und beruhigen sich ausschließlich in Sicherheit. Was bei dir funktioniert hat, muss hier nicht greifen, und wenn es nicht greift, liegt es fast immer daran, dass der Mond eine andere Sprache spricht als deiner.'},
 peer:{ist:'die Gebrauchsanweisung',
  t:'Unter Freundinnen ist der Mond das, was du nicht fragen musst: wann jemand Nähe braucht und wann Luft, ob ein Anruf hilft oder stört, ob Mitgefühl erwünscht ist oder praktische Hilfe. Die meisten Freundschaften scheitern nicht an Streit, sondern daran, dass jemand im falschen Modus getröstet wurde.'},
 arbeit:{ist:'die Reizschwelle',
  t:'Im Arbeitskontext ist der Mond nicht dein Thema — mit einer Ausnahme: Er sagt, unter welchen Bedingungen jemand unruhig wird. Das ist beruflich brauchbar und privat nicht dein Geschäft. Lies ihn als Reizschwelle, nicht als Charakter.'}
};

/* Und je nach Element des Mondzeichens die konkrete Anweisung für dieses Verhältnis */
var MOND_TUN={
 klientin:{Feuer:'Kurze Einheiten, schnelle Richtungswechsel, früh etwas zu tun geben. Lange Vorreden verlieren diese Person.',
  Erde:'Konkret werden und Zusagen halten. Diese Person misst dich an Verlässlichkeit, nicht an Einfühlung.',
  Luft:'Reden lassen. Sie sortiert sich im Sprechen — was aussieht wie Abschweifen, ist die Arbeit selbst.',
  Wasser:'Langsam. Und achte auf deine eigene Stimmung, bevor du reingehst — diese Person nimmt sie mit.'},
 selbst:{Feuer:'Du brauchst Bewegung, bevor du nachdenken kannst, nicht danach. Spaziergang zuerst, Entscheidung dann.',
  Erde:'Du beruhigst dich über Materielles: aufräumen, kochen, etwas in der Hand haben. Das ist keine Vermeidung.',
  Luft:'Du brauchst jemanden zum Reden, um zu wissen, was du denkst. Ohne Gegenüber drehst du im Kreis.',
  Wasser:'Du brauchst Rückzug, und zwar mehr als du dir zugestehst. Nicht als Erholung — als Verarbeitung.'},
 liebe:{Feuer:'Diese Person braucht Reibung und Tempo. Zu viel Rücksicht wirkt hier wie Desinteresse.',
  Erde:'Verlässlichkeit vor Romantik. Was du ankündigst und tust, zählt mehr als was du fühlst und sagst.',
  Luft:'Gespräch ist hier Nähe. Schweigsame Abende empfindet diese Person als Distanz, auch wenn du sie als Vertrautheit meinst.',
  Wasser:'Stimmung vor Inhalt. Diese Person merkt, wie du etwas sagst, lange bevor sie hört, was.'},
 ex:{Feuer:'Kurz halten. Ausführliche Klärungsgespräche heizen hier auf, statt zu klären.',
  Erde:'Praktisch bleiben: Sachen, Termine, Geld. Auf dieser Ebene geht es, auf der emotionalen nicht.',
  Luft:'Schriftlich ist besser als mündlich. Diese Person argumentiert schneller als sie fühlt, und du verlierst mündlich.',
  Wasser:'Abstand halten, auch freundlichen. Kontakt reicht bei diesem Mond aus, um alles wieder zu öffnen.'},
 eltern:{Feuer:'Dieses Elternteil brauchte Bewegung und wurde eng, wenn es feststeckte. Du hast vermutlich gelernt, dich schnell zu machen.',
  Erde:'Hier wurde Sicherheit über Materielles hergestellt — Ordnung, Essen, Geld. Gefühle kamen in Form von Versorgung. Das war Zuwendung, auch wenn es sich nicht so anfühlte.',
  Luft:'Hier wurde geredet und erklärt. Du hast vermutlich früh gelernt zu argumentieren — und dass Gefühle erst gelten, wenn sie begründet sind.',
  Wasser:'Die Stimmung dieses Elternteils war im Raum, ob ausgesprochen oder nicht. Du hast gelernt, sie zu lesen, bevor du lesen konntest. Das ist eine Fähigkeit und eine Last.'},
 kind:{Feuer:'Dein Kind beruhigt sich durch Bewegung, nicht durch Stillsitzen. „Setz dich mal hin" ist hier das Gegenteil von Hilfe.',
  Erde:'Dein Kind braucht Vorhersehbarkeit: gleiche Abläufe, gleiche Reihenfolge, Ankündigung vor Veränderung. Spontanität ist für dich schön und für dieses Kind anstrengend.',
  Luft:'Dein Kind braucht Erklärung. Nicht „weil ich es sage" — eine echte Begründung beruhigt hier mehr als Trost.',
  Wasser:'Dein Kind nimmt deine Stimmung auf, auch die, die du versteckst. Es ist ehrlicher, deine Verstimmung zu benennen, als sie zu verbergen.'},
 peer:{Feuer:'Direkt sein. Diese Person verträgt Widerspruch besser als Vorsicht.',
  Erde:'Zuverlässig sein. Abgesagte Treffen wiegen hier schwerer, als du denkst.',
  Luft:'Ansprechbar sein. Lange Funkstille deutet diese Person als Abkühlung.',
  Wasser:'Da sein, ohne zu lösen. Diese Person will selten Ratschläge, sie will, dass jemand bleibt.'},
 arbeit:{Feuer:'Wird unruhig bei Leerlauf und langen Abstimmungen. Gib früh etwas zu tun.',
  Erde:'Wird unruhig bei kurzfristigen Änderungen. Vorlauf einplanen.',
  Luft:'Wird unruhig, wenn nicht geredet wird. Kurz einbinden reicht meist.',
  Wasser:'Wird unruhig bei schlechter Stimmung im Team, auch bei einer, die nichts mit ihr zu tun hat.'}
};

/* ── 4 · Saturn, je nach Bezug ────────────────────────────────────
   Saturn ist die zweite Stellung, die kippt. Im Coaching ist er ein
   Arbeitsthema, bei den Eltern eine Erklärung, beim Kind eine Warnung. */
var SATURN_BEZUG={
 klientin:'Bei einer Klientin ist Saturn das, wo sie sich beweisen muss und es nie reicht. Erwarte dort Widerstand gegen Erleichterung — Loslassen fühlt sich an dieser Stelle nach Nachlässigkeit an. Arbeite nicht gegen Saturn, sondern mit ihm: eine kleine, überprüfbare Aufgabe hilft hier mehr als eine Einsicht.',
 selbst:'Bei dir selbst ist Saturn die Stelle, an der du am strengsten mit dir bist und es für Realismus hältst. Der Test: Würdest du einer Freundin dasselbe sagen? Wenn nein, ist es nicht Realismus.',
 liebe:'In der Partnerschaft ist Saturn die Stelle, an der diese Person dich prüft — nicht aus Misstrauen, sondern weil sie dort gelernt hat, dass nichts umsonst kommt. Die Prüfung hat ein Ende, aber sie dauert länger, als du es für nötig hältst. Durchhalten wirkt hier stärker als Beteuern.',
 ex:'Im Rückblick zeigt Saturn, woran sich die Beziehung aufgerieben hat — die Stelle, an der eine Forderung stand, die nie erfüllbar war. Es lohnt zu prüfen, ob sie von der Person kam oder ob du sie dir geliehen hast.',
 eltern:'Bei einem Elternteil ist Saturn die Stelle, an der sie selbst unter Druck standen — und fast immer die Stelle, an der sie ihn weitergegeben haben. Hier liegt der Satz, den du von zu Hause mitgenommen hast, ohne ihn je geprüft zu haben. Du kannst ihn jetzt lesen und entscheiden, ob er deiner ist.',
 kind:'Beim eigenen Kind ist Saturn die Stelle, an der es am leichtesten beschädigt wird. Dort sitzt bereits von sich aus ein Mangelgefühl. Druck, Vergleich oder ein beiläufiger kritischer Satz an dieser Stelle wirken länger nach als anderswo — und Lob greift nicht, weil das Kind es nicht glaubt. Was greift, ist Beschreibung: sagen, was du siehst, ohne es zu bewerten.',
 peer:'Unter Freundinnen ist Saturn die Stelle, an der diese Person keinen Spaß versteht. Nicht aus Humorlosigkeit — dort ist etwas teuer bezahlt worden. Ein Scherz, der anderswo durchgeht, landet hier anders.',
 arbeit:'Im Beruf ist Saturn tendenziell die Stärke: der Bereich, in dem jemand gründlich ist und nichts durchrutschen lässt. Dafür ist es der Bereich, in dem Kritik unverhältnismäßig ankommt. Rückmeldung dort besonders genau formulieren.'
};

/* ── 5 · Chiron, je nach Bezug ────────────────────────────────── */
var CHIRON_BEZUG={
 klientin:'Dort treffen Kleinigkeiten unverhältnismäßig. Rechne mit Überkompensation — die Person ist in diesem Bereich auffällig gut und lässt es trotzdem nicht gelten. Lob greift nicht, Beschreibung schon.',
 selbst:'Deine eigene wunde Stelle erkennst du daran, dass du dort entweder sofort abwehrst oder sofort einknickst — beides ohne Zwischenstufe. Die Übertreibung würdigen, bevor du sie hinterfragst.',
 liebe:'Hier verletzt du diese Person versehentlich. Nicht durch Böses, sondern durch Beiläufiges: ein Nebensatz, ein Blick, ein Vergessen. Es lohnt zu wissen wo, weil du dann unterscheiden kannst zwischen „ich war unachtsam" und „das war nicht mein Thema".',
 ex:'Wenn ihr euch gegenseitig an dieser Stelle getroffen habt, erklärt das die Heftigkeit. Zwei Menschen, die beide genau dort nichts aushalten, machen einander ohne Absicht sehr weh.',
 eltern:'Die wunde Stelle deiner Eltern ist oft die, an der sie dich nicht schützen konnten — nicht aus Gleichgültigkeit, sondern weil sie dort selbst nichts hatten. Das ist keine Entschuldigung und es ändert nichts an dem, was gefehlt hat. Es ändert nur, ob du es auf dich beziehst.',
 kind:'Bei deinem Kind ist diese Stelle die, an der du am ehesten etwas falsch machst, ohne es zu merken — weil dort oft dein eigenes Thema liegt. Wenn eine Reaktion deines Kindes dich unverhältnismäßig trifft, ist das der Punkt.',
 peer:'Hier ist diese Person dünnhäutiger als sie wirkt. Gut zu wissen, bevor man einen gut gemeinten Rat gibt.',
 arbeit:'Hier reagiert diese Person empfindlich auf Feedback, auch auf sachliches. Nicht umgehen — aber mit mehr Sorgfalt formulieren als sonst.'
};

/* ── 6 · Was zwischen euch passiert, wenn es schwierig wird ────── */
var KONFLIKT={
 klientin:{t:'Im Coaching zeigt sich Widerstand selten als Widerspruch. Er zeigt sich als Zustimmung ohne Folgen, als abgesagte Termine, als „es war alles gut" ohne Beispiel.',
  tun:'Nicht nachfassen, sondern benennen: „Mir fällt auf, dass wir seit drei Stunden um dasselbe kreisen. Woran liegt das?" Das ist keine Konfrontation, das ist die Arbeit.'},
 selbst:{t:'Dein Konfliktmuster mit dir selbst ist das, was du tust, wenn ein Vorsatz scheitert: sofort härter werden oder sofort aufgeben.',
  tun:'Beides einmal nicht tun und nachsehen, was unter dem Vorsatz lag. Meist war die Form falsch, nicht der Wille.'},
 liebe:{t:'In Partnerschaften wiederholen sich Streits selten im Inhalt und fast immer in der Form: wer zuerst geht, wer lauter wird, wer schweigt.',
  tun:'Die Form ändern, nicht das Thema. Ein Streit, der zum ersten Mal anders abläuft, ist mehr wert als zehn, die inhaltlich gelöst werden.'},
 ex:{t:'Konflikte mit einem Ex sind fast nie der Konflikt, um den es scheinbar geht. Die Sachfrage ist der Träger für etwas, das nicht mehr verhandelbar ist.',
  tun:'Die Sachfrage sachlich entscheiden und die andere Ebene nicht mit öffnen. Das wirkt kalt und ist das Freundlichste, was geht.'},
 eltern:{t:'Konflikte mit Eltern laufen in alten Rollen ab, auch wenn alle erwachsen sind. Du wirst im Gespräch jünger, und das merkst du erst hinterher.',
  tun:'Nicht das Gespräch gewinnen wollen. Vorher entscheiden, was du erreichen willst, und daran festhalten, auch wenn ein alter Satz fällt.'},
 kind:{t:'Konflikte mit dem eigenen Kind eskalieren fast immer über deinen Zustand, nicht über sein Verhalten.',
  tun:'Zuerst dich. Ein ruhiger Elternteil löst mehr als ein gerechter.'},
 peer:{t:'Unter Freundinnen wird selten gestritten und oft vermieden. Der Konflikt zeigt sich als dünner werdender Kontakt.',
  tun:'Früh ansprechen, solange es noch klein ist. Eine Freundschaft, die über Monate leiser wird, ist schwerer zurückzuholen als eine, in der einmal etwas gesagt wurde.'},
 arbeit:{t:'Arbeitskonflikte sind meistens Missverständnisse über Zuständigkeit oder Tempo, nicht über Inhalt.',
  tun:'Schriftlich festhalten, wer was bis wann macht. Das klingt bürokratisch und löst die Mehrzahl dieser Konflikte, bevor sie entstehen.'}
};

/* ── 7 · Gesprächseinstiege, je nach Bezug ───────────────────────
   Dieselbe Stellung, andere Frage. */
var EINSTIEG={
 klientin:['Wobei vergisst du zu essen?',
  'Was hast du zuletzt abgesagt, worauf du dich eigentlich gefreut hattest?',
  'Wenn das nächstes Jahr noch genauso ist — was wäre dann das Schlimmste daran?'],
 selbst:['Was rate ich anderen regelmäßig und mache es selbst nicht?',
  'Wovon habe ich zuletzt gesagt, es sei „gerade schlecht möglich"?',
  'Was würde ich tun, wenn niemand es mitbekäme?'],
 liebe:['Wann hast du dich zuletzt von mir richtig verstanden gefühlt — und wobei?',
  'Was tue ich, von dem du annimmst, dass ich weiß, dass es dich stört?',
  'Was brauchst du nach einem schlechten Tag: reden, Ruhe oder dass ich einfach da bin?'],
 ex:['Was hätte ich damals gebraucht, das ich nicht gesagt habe?',
  'Was von dem, was ich ihr/ihm vorwerfe, kam eigentlich von woanders?',
  'Was ist der kleinste praktische Punkt, den wir klären könnten, ohne alles aufzumachen?'],
 eltern:['Wie war das bei dir, als du so alt warst wie ich damals?',
  'Wovor hattest du Angst, als wir klein waren?',
  'Was hättest du gern anders gemacht und was würdest du wieder so machen?'],
 kind:['Was war heute das Blödeste?',
  'Wobei hast du das Gefühl, dass ich dir nicht zuhöre?',
  'Was soll ich tun, wenn du wütend bist — dableiben oder rausgehen?'],
 peer:['Wann habe ich zuletzt genervt und du hast nichts gesagt?',
  'Was brauchst du gerade von mir — zuhören oder helfen?',
  'Woran merke ich, dass es dir schlecht geht, wenn du es nicht sagst?'],
 arbeit:['Wie arbeitest du am liebsten — vorher abstimmen oder erst machen und dann zeigen?',
  'Was brauchst du von mir, um schneller zu sein?',
  'Was läuft bei uns gerade doppelt?']
};

/* ── 8 · Die Grenze ───────────────────────────────────────────── */
var GRENZE={
 klientin:'Diese Person hat dich beauftragt — du darfst dieses Dossier also haben. Was du damit nicht darfst: es ihr vorlegen wie einen Befund. Ein Dossier ist deine Vorbereitung, nicht ihr Ergebnis.',
 selbst:'Keine, außer der Ehrlichkeit.',
 liebe:'Hat diese Person davon gewusst, dass du ihr Chart liest? Wenn nicht, ist das die Frage, nicht die Deutung. Und wenn du etwas Wichtiges findest: Es gehört ins Gespräch, nicht in deine Schublade.',
 ex:'Diese Person hat dem hier nicht zugestimmt und würde es vermutlich nicht. Das macht es nicht verboten — es macht es zu etwas, das für dich gedacht ist und nicht für den Kontakt mit ihr.',
 eltern:'Deine Eltern haben nicht darum gebeten, gelesen zu werden. Das Dossier ist dein Werkzeug, um zu verstehen, was war. Es als Gesprächsgrundlage zu benutzen, geht fast immer schief.',
 kind:'Dein Kind kann nicht zustimmen. Deshalb gilt hier die strengste Regel von allen: Das Dossier ändert, was <b>du</b> tust, nicht wie du über dein Kind sprichst. Sag ihm nie, wie es ist — auch nicht Freundlichkeiten.',
 peer:'Diese Person hat dich nicht beauftragt. Lies es für dich und erzähl nicht davon, außer sie fragt.',
 arbeit:'Beruflicher Kontext, private Daten. Alles, was über Arbeitsweise hinausgeht, geht dich hier nichts an — auch wenn du es sehen kannst. Und es gehört unter keinen Umständen in eine Personalentscheidung.'
};
