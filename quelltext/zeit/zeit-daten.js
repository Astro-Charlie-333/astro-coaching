/* Astro-Charlie · Zeiten — die Texte
   Zwölf Zeichen als Kapitel des Berufslebens und als Kapitel des
   Liebeslebens, die Stufen der Betriebsamkeit, die Profektionshäuser
   und die Firdaria-Herren.

   Regel wie überall: Kein Satz, der nicht sagt, was er meint. */

/* ── Die drei Stufen der Betriebsamkeit ──────────────────────
   Nicht gut oder schlecht, sondern wie viel gleichzeitig läuft.
   Gemessen an der Stellung zum Los des Glücks.                  */
var ZT_STUFE={
 winkel:{n:'Hochphase', kurz:'viel los', rang:3, farbe:'#9A7235',
   was:'Das Zeichen dieses Abschnitts steht im Winkel zum Los des Glücks. In der Überlieferung '+
     'sind das die betriebsamsten Zeiten eines Lebens: Es passiert viel, es wird sichtbar, und '+
     'Entscheidungen haben größere Folgen als sonst. Betriebsam heißt nicht angenehm — auch ein '+
     'schwerer Umbruch ist eine Hochphase.'},
 folgend:{n:'Mittlere Phase', kurz:'es läuft', rang:2, farbe:'#3D6B62',
   was:'Das Zeichen steht dem Winkel nach. Solche Abschnitte bauen aus, was in einer Hochphase '+
     'angefangen wurde, und sie sind meistens die stabileren.'},
 fallend:{n:'Ruhige Phase', kurz:'im Hintergrund', rang:1, farbe:'#6B6259',
   was:'Das Zeichen steht fallend zum Los des Glücks. Von außen passiert wenig. Solche Abschnitte '+
     'sind die, in denen vorbereitet, gelernt und sortiert wird — und sie fühlen sich oft nach '+
     'Stillstand an, obwohl sie keiner sind.'}
};
function ztStufe(vonGlueck){
  if([1,4,7,10].indexOf(vonGlueck)>=0) return 'winkel';
  if([2,5,8,11].indexOf(vonGlueck)>=0) return 'folgend';
  return 'fallend';
}

/* ── Die zwölf Zeichen als Kapitel ───────────────────────────
   beruf: wie dieser Lebensabschnitt im Arbeitsleben aussieht
   liebe: wie er im Liebesleben aussieht                        */
var ZT_KAPITEL={
0:{n:'Widder', herr:'Mars',
  beruf:{t:'Ein Anfangskapitel. In Widder-Abschnitten wird etwas begonnen, oft überstürzt und '+
     'allein: eigene Selbstständigkeit, ein Wechsel ohne Netz, ein Streit, nach dem man geht. '+
     'Das Tempo ist hoch und die Richtung noch nicht fertig.',
   tun:'Anfangen und die Sache erst im Laufen sortieren. Auf Klarheit zu warten, kostet hier den Abschnitt.'},
  liebe:{t:'Eine Zeit, in der etwas beginnt und schnell geht. Verliebtheit kommt plötzlich, '+
     'Entscheidungen fallen früh, und es wird eher gehandelt als besprochen. Auch Trennungen '+
     'passieren in solchen Abschnitten schnell und ohne langes Vorspiel.',
   tun:'Nichts Großes in den ersten drei Monaten festlegen. Das Tempo ist hier nicht die Wahrheit.'}},
1:{n:'Stier', herr:'Venus',
  beruf:{t:'Ein Kapitel des Festigens. Es geht um Geld, Besitz und darum, dass die Arbeit '+
     'etwas abwirft, das bleibt. Spektakulär ist das selten; wer hier auf Aufregung wartet, '+
     'verpasst, dass gerade das Fundament gegossen wird.',
   tun:'Preise, Verträge und Rücklagen anfassen. In einem Stier-Abschnitt zahlt sich das aus.'},
  liebe:{t:'Eine Zeit der Beständigkeit und der Sinnlichkeit. Beziehungen, die hier anfangen, '+
     'haben eine lange Anlaufzeit und halten dann. Es geht viel um Alltag, Zuhause und darum, '+
     'wie Nähe sich körperlich anfühlt.',
   tun:'Etwas Gemeinsames einrichten, das Bestand hat — eine Wohnung, eine Gewohnheit, ein Ritual.'}},
2:{n:'Zwillinge', herr:'Merkur',
  beruf:{t:'Ein langes Kapitel mit vielen Fäden. Hier laufen mehrere Sachen nebeneinander, '+
     'es wird viel geredet, geschrieben und vermittelt, und der Beruf ist eher eine Reihe von '+
     'Gelegenheiten als ein Weg. Zwanzig Jahre sind das — man merkt es nicht als Abschnitt, '+
     'sondern als Lebensgefühl.',
   tun:'Nicht auf die eine große Sache warten. In diesem Kapitel entsteht sie aus vielen kleinen.'},
  liebe:{t:'Eine Zeit mit Bewegung und Kontakt. Es gibt mehr Begegnungen als in anderen '+
     'Abschnitten, und Verbindungen entstehen über Gespräche. Festlegung fällt hier schwerer; '+
     'oft läuft mehr als eine Sache gleichzeitig.',
   tun:'Aussprechen, was gerade gilt. In diesem Kapitel entstehen Missverständnisse aus Unausgesprochenem.'}},
3:{n:'Krebs', herr:'Mond',
  beruf:{t:'Das längste Kapitel von allen, fünfundzwanzig Jahre. Die Arbeit hängt hier eng am '+
     'Privatleben: Zuhause, Familie, Sicherheit und Beruf lassen sich nicht trennen. Oft wird '+
     'von zu Hause gearbeitet, für die Familie, oder der Beruf richtet sich nach ihr.',
   tun:'Die Frage ernst nehmen, wie viel Sicherheit du brauchst — in Euro, nicht im Gefühl.'},
  liebe:{t:'Eine Zeit, in der Beziehung und Zuhause dasselbe Thema werden. Zusammenziehen, '+
     'Kinder, Familie, Pflege. Nähe wird hier über Fürsorge hergestellt und nicht über Worte, '+
     'und alte Familienmuster melden sich deutlich.',
   tun:'Einmal benennen, was du aus deiner Herkunftsfamilie mitbringst. In diesem Kapitel wirkt es.'}},
4:{n:'Löwe', herr:'Sonne',
  beruf:{t:'Ein Kapitel der Sichtbarkeit. Hier tritt jemand nach vorn, mit eigenem Namen und '+
     'eigenem Gesicht. Das ist der Abschnitt, in dem aus einer Arbeit ein Ruf wird — und in dem '+
     'es anstrengend wird, wenn man nicht gesehen werden will.',
   tun:'Etwas unter eigenem Namen machen. Nicht größer, sondern sichtbarer.'},
  liebe:{t:'Eine Zeit, in der Liebe etwas Gezeigtes ist. Es geht um Begehrtwerden, um Romantik '+
     'im großen Format und oft auch um Kinder. Wer sich hier versteckt, fühlt sich ungeliebt, '+
     'auch wenn es nicht stimmt.',
   tun:'Die Beziehung sichtbar machen — vorstellen, zusammen auftreten, zugeben, dass es dir wichtig ist.'}},
5:{n:'Jungfrau', herr:'Merkur',
  beruf:{t:'Ein langes Arbeitskapitel. Hier geht es um Können, Handwerk und tägliche Routine, '+
     'nicht um Glanz. Zwanzig Jahre, in denen jemand gut wird in etwas — und oft das Gefühl hat, '+
     'dass nichts vorangeht, weil der Fortschritt in Details steckt.',
   tun:'Eine Fertigkeit wirklich zu Ende lernen. In diesem Kapitel ist das die beste Investition.'},
  liebe:{t:'Eine Zeit, in der Liebe im Alltäglichen stattfindet: wer einkauft, wer sich kümmert, '+
     'wie der Alltag läuft. Das klingt nüchtern und ist es auch. Beziehungen werden hier geprüft '+
     'an der Frage, ob sie im Werktag funktionieren.',
   tun:'Die Arbeitsteilung einmal offen besprechen, bevor sie zum Vorwurf wird.'}},
6:{n:'Waage', herr:'Venus',
  beruf:{t:'Ein kurzes Kapitel, in dem Partnerschaften zählen: Mitgründerinnen, Kundschaft, '+
     'Verträge, Verhandlungen. Allein geht hier wenig voran, zu zweit viel.',
   tun:'Die eine Verbindung suchen, die dich weiterbringt. Acht Jahre sind kurz.'},
  liebe:{t:'Das Beziehungskapitel im engeren Sinn. Hier werden Partnerschaften eingegangen, '+
     'formalisiert oder beendet. Es geht um Augenhöhe, um Fairness und um die Frage, was eine '+
     'Verbindung verbindlich macht.',
   tun:'Aussprechen, was du willst — verbindlich oder offen. In diesem Kapitel entscheidet sich das.'}},
7:{n:'Skorpion', herr:'Mars',
  beruf:{t:'Ein Kapitel der Tiefe und der Krisen. Hier wird mit Dingen gearbeitet, über die '+
     'sonst nicht geredet wird, oder es geht ums Geld anderer Leute: Beteiligungen, Kredite, '+
     'Erbschaften, Investoren. Es ist selten gemütlich und selten langweilig.',
   tun:'Die Zahlen anderer Leute verstehen lernen. Hier hängt vieles daran.'},
  liebe:{t:'Eine intensive Zeit. Bindungen werden tiefer und verwickelter, oft auch abhängiger. '+
     'Es geht um Sexualität, um Gemeinsames, um Macht und darum, was wirklich geteilt wird. '+
     'Trennungen in diesem Abschnitt sind einschneidend.',
   tun:'Das aussprechen, was du am wenigsten aussprechen willst. Genau darum geht es hier.'}},
8:{n:'Schütze', herr:'Jupiter',
  beruf:{t:'Ein Kapitel der Weite. Ausbildung, Lehre, Ausland, Veröffentlichung — der Beruf '+
     'bekommt hier einen größeren Rahmen, und oft kommt eine Gelegenheit von weit her.',
   tun:'Etwas lernen oder lehren, das über deinen bisherigen Rahmen hinausgeht.'},
  liebe:{t:'Eine Zeit, in der Liebe mit Weite zu tun hat: Fernbeziehungen, andere Länder, '+
     'andere Herkunft, gemeinsames Reisen oder gemeinsames Lernen. Es geht weniger um Alltag '+
     'als um die Frage, ob ihr in dieselbe Richtung schaut.',
   tun:'Gemeinsam etwas Neues anfangen, das keine von euch allein gemacht hätte.'}},
9:{n:'Steinbock', herr:'Saturn',
  beruf:{t:'Ein sehr langes und ernstes Kapitel, siebenundzwanzig Jahre. Hier wird aufgebaut, '+
     'Verantwortung übernommen und ausgehalten. Der Anfang ist zäh und undankbar, das Ende '+
     'trägt. Wer in diesem Abschnitt auf schnelle Erfolge wartet, wartet die ganze Zeit.',
   tun:'In Jahren rechnen, nicht in Monaten. Und früh eine Struktur bauen, die ohne dich läuft.'},
  liebe:{t:'Eine Zeit, in der Beziehungen Gewicht bekommen: Verbindlichkeit, Verantwortung, '+
     'manchmal Altersunterschied oder Pflege. Es wird weniger geschwärmt und mehr getragen. '+
     'Was hier hält, hält wirklich.',
   tun:'Prüfen, ob du bleibst, weil du willst, oder weil du dich verpflichtet fühlst.'}},
10:{n:'Wassermann', herr:'Saturn',
  beruf:{t:'Das längste Kapitel überhaupt, dreißig Jahre. Es geht um Gruppen, Netzwerke und '+
     'darum, etwas anders zu machen als vorgesehen. Der Beruf läuft hier über Leute, nicht über '+
     'Bewerbungen, und er passt selten in eine vorhandene Schublade.',
   tun:'In Gruppen gehen, in denen das schon gemacht wird, was du machen willst.'},
  liebe:{t:'Eine Zeit, in der Beziehungen eigene Formen annehmen: Freundschaft und Liebe gehen '+
     'ineinander über, Abstand gehört dazu, und was andere für richtig halten, trifft hier nicht zu.',
   tun:'Die eigene Form aushandeln, statt eine zu übernehmen, die nicht passt.'}},
11:{n:'Fische', herr:'Jupiter',
  beruf:{t:'Ein Kapitel im Hintergrund. Hier wird oft unbezahlt, unsichtbar oder im Dienst '+
     'einer Sache gearbeitet, und die Richtung ist unscharf. Es ist der Abschnitt vor einem '+
     'Neuanfang — und das merkt man erst hinterher.',
   tun:'Nichts erzwingen. Festhalten, was von selbst wiederkommt, und das als Hinweis nehmen.'},
  liebe:{t:'Eine Zeit mit weichen Rändern. Verbindungen sind hier eher ungeklärt als eindeutig: '+
     'Nähe ohne Festlegung, Sehnsucht, manchmal auch Täuschung. Es wird viel gefühlt und wenig geklärt.',
   tun:'Einmal konkret nachfragen, was gerade gilt. In diesem Kapitel bleibt das sonst offen.'}}
};

/* ── Die Lösung der Bindung ──────────────────────────────────  */
var ZT_BINDUNG={
 beruf:{n:'Lösung der Bindung',
   was:'An dieser Stelle springt die Reihe ins Gegenzeichen, statt von vorn zu beginnen. In der '+
     'Überlieferung ist das der große Einschnitt eines Kapitels: ein Bruch mit dem, was bis '+
     'dahin galt, und ein Wechsel der Richtung — Branchenwechsel, Kündigung, Gründung, Umzug '+
     'in ein anderes Leben.',
   tun:'Solche Zeitpunkte lohnt es, vorher zu kennen. Nicht um sie zu vermeiden, sondern um '+
     'nicht überrascht zu sein, wenn eine Sache zu Ende geht, die man für dauerhaft hielt.'},
 liebe:{n:'Lösung der Bindung',
   was:'Derselbe Einschnitt, auf das Liebesleben gelesen: Hier endet eine Form von Beziehung '+
     'und eine andere fängt an. Das muss keine Trennung sein — es kann auch eine Beziehung '+
     'sein, die sich grundlegend ändert.',
   tun:'In solchen Jahren keine Entscheidung aus Gewohnheit treffen. Was hier weitergeführt '+
     'wird, muss neu begründet werden.'}
};

/* ── Die Profektionshäuser ───────────────────────────────────  */
var ZT_PROFEKTION=[
 {h:1,  n:'Du selbst',       t:'Ein Jahr über dich: Auftreten, Körper, Richtung. Was du dieses Jahr anfängst, trägt deine Handschrift.'},
 {h:2,  n:'Geld und Wert',   t:'Ein Jahr über Einkommen, Besitz und den eigenen Wert. Preise, Gehalt und Rücklagen sind dieses Jahr das Thema.'},
 {h:3,  n:'Nahbereich',      t:'Ein Jahr über Geschwister, Nachbarschaft, kurze Wege und das Schreiben. Viel Bewegung, wenig Grundsätzliches.'},
 {h:4,  n:'Zuhause',         t:'Ein Jahr über Wohnung, Familie und Herkunft. Umzüge, Eltern, und die Frage, wo du eigentlich hingehörst.'},
 {h:5,  n:'Ausdruck',        t:'Ein Jahr über das, was von dir ausgeht: Kinder, Kunst, Verliebtheit, Spiel. Mehr zeigen als zurückhalten.'},
 {h:6,  n:'Alltag',          t:'Ein Jahr über Arbeit, Routine und Körper. Unspektakulär und arbeitsreich — und das Jahr, in dem Gewohnheiten umgestellt werden können.'},
 {h:7,  n:'Die anderen',     t:'Ein Jahr über Partnerschaft, Kundschaft und Verträge. Was dieses Jahr wichtig wird, kommt über andere Menschen.'},
 {h:8,  n:'Das Geteilte',    t:'Ein Jahr über gemeinsames Geld, Abhängigkeit und Dinge, über die nicht geredet wird. Oft unbequem, selten folgenlos.'},
 {h:9,  n:'Weite',           t:'Ein Jahr über Lehre, Ausland, Veröffentlichung und Überzeugungen. Der Rahmen wird größer.'},
 {h:10, n:'Beruf',           t:'Ein Jahr über Position und Außenwirkung. Von allen zwölf das sichtbarste — hier wird bewertet, was du aufgebaut hast.'},
 {h:11, n:'Gruppen',         t:'Ein Jahr über Netzwerke, Freundeskreis und Zukunftspläne. Vieles kommt dieses Jahr über Leute, die du kennst.'},
 {h:12, n:'Rückzug',         t:'Ein Jahr im Hintergrund: abschließen, loslassen, erholen. Das Jahr vor einem neuen Zwölferlauf, und das zum Aufräumen.'}
];

/* ── Die Firdaria-Herren ─────────────────────────────────────  */
var ZT_FIRDARIA={
 'Sonne':{t:'Zehn Jahre, in denen es um Sichtbarkeit, Position und den eigenen Namen geht. Gute Zeit, nach vorn zu treten.'},
 'Mond':{t:'Neun Jahre mit viel Bewegung im Privaten: Zuhause, Familie, Stimmung, Gesundheit. Weniger planbar als andere Abschnitte.'},
 'Merkur':{t:'Dreizehn Jahre über Reden, Schreiben, Lernen und Handel. Der längste Abschnitt der Reihe — viele Fäden, viel Austausch.'},
 'Venus':{t:'Acht Jahre über Beziehung, Geschmack und Geld. Oft die angenehmste Strecke, und die, in der sich etwas verbindet.'},
 'Mars':{t:'Sieben Jahre mit Reibung und Tempo. Konflikte, Durchsetzung, Trennungen und Neuanfänge aus eigener Kraft.'},
 'Jupiter':{t:'Zwölf Jahre mit Spielraum: Ausbildung, Weite, Gelegenheiten. Es wird mehr, und gelegentlich zu viel.'},
 'Saturn':{t:'Elf Jahre mit Gewicht: Verantwortung, Begrenzung, Aufbau. Zäh am Anfang, haltbar am Ende.'},
 'Aufsteigender Knoten':{t:'Drei Jahre, in denen etwas zunimmt und über das übliche Maß hinauswächst — im Guten wie im Anstrengenden.'},
 'Absteigender Knoten':{t:'Zwei Jahre, in denen etwas abnimmt und sich auflöst. Eine Zeit zum Abschließen, nicht zum Anfangen.'}
};
