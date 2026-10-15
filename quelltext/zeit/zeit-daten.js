/* Astro-Charlie · Zeiten — die Texte
   ==================================================================
   Regel für diese Datei: Kein Fachwort ohne Erklärung an Ort und
   Stelle, und kein Satz, den man zweimal lesen muss. Die klassischen
   Namen stehen dabei — aber in Klammern und erst, wenn der Sinn
   schon da ist.                                                      */

/* ── Die fünf Bereiche ───────────────────────────────────────
   Dieselbe Rechnung, fünfmal von einem anderen Punkt aus gestartet.
   Jeder Punkt gehört zu einem Lebensbereich.                       */
var ZT_BEREICH=[
 {k:'arbeit', n:'Arbeit & Berufung', kurz:'Arbeit', farbe:'#9A7235',
  frage:'Wann geht beruflich etwas voran, und wann ist Ruhe?',
  worum:'Was du tust, wie du dein Geld verdienst, wohin dein Weg geht.',
  los:'Los des Geistes',
  losErkl:'Der Startpunkt dieser Spur. Er wird aus dem Abstand zwischen Sonne und Mond '+
    'gebildet und steht in der Überlieferung für das, was ein Mensch von sich aus tut.'},
 {k:'liebe', n:'Liebe & Nähe', kurz:'Liebe', farbe:'#A05A3A',
  frage:'Wann passiert in Beziehungen etwas, und wann ist es still?',
  worum:'Verliebtheit, Partnerschaft, Nähe, auch Trennungen.',
  los:'Los des Eros',
  losErkl:'Der Startpunkt dieser Spur. Er wird aus Venus und dem Los des Geistes gebildet '+
    'und steht für Begehren und Zuneigung.'},
 {k:'koerper', n:'Körper, Geld & Umstände', kurz:'Umstände', farbe:'#3D6B62',
  frage:'Wann sind die äußeren Umstände günstig, und wann sperrig?',
  worum:'Körper, Wohnort, Einkommen — das, was dir zustößt, statt dass du es machst.',
  los:'Los des Glücks',
  losErkl:'Der wichtigste Punkt des ganzen Verfahrens. Er wird aus dem Abstand zwischen '+
    'Mond und Sonne gebildet und steht für die Umstände, in denen jemand lebt. '+
    'Von ihm aus wird auch gemessen, welche Abschnitte laut sind.'},
 {k:'erfolg', n:'Rückenwind & Zuspruch', kurz:'Rückenwind', farbe:'#3F6B4A',
  frage:'Wann kommt Unterstützung von außen, und wann musst du allein ran?',
  worum:'Förderung, Glücksfälle, Leute, die dir etwas zutrauen.',
  los:'Los des Sieges',
  losErkl:'Der Startpunkt dieser Spur, aus Jupiter und dem Los des Geistes gebildet. '+
    'Er steht für Zuversicht und für das, was von außen hilft.'},
 {k:'druck', n:'Druck & Pflicht', kurz:'Druck', farbe:'#6A4A62',
  frage:'Wann wird es eng, und wann lässt der Druck nach?',
  worum:'Verpflichtungen, Zwänge, Dinge, die erledigt werden müssen.',
  los:'Los der Notwendigkeit',
  losErkl:'Der Startpunkt dieser Spur, aus Merkur und dem Los des Glücks gebildet. '+
    'Er steht für das, was man tun muss, statt es zu wollen.'}
];

/* ── Die drei Lautstärken ────────────────────────────────────  */
var ZT_STUFE={
 winkel:{n:'Hochphase', kurz:'laut', rang:3, farbe:'#9A7235',
   satz:'Hier ist viel los.',
   was:'In so einem Abschnitt passiert mehr als sonst, es wird sichtbarer, und '+
     'Entscheidungen haben größere Folgen. <b>Laut heißt nicht schön.</b> Ein harter '+
     'Umbruch ist genauso eine Hochphase wie ein Aufstieg — gemeint ist die Menge, '+
     'nicht die Richtung.',
   woher:'Das Zeichen dieses Abschnitts steht im rechten Winkel zum Glückspunkt oder '+
     'genau auf ihm. Vier von zwölf Zeichen tun das.'},
 folgend:{n:'Mittlere Phase', kurz:'normal', rang:2, farbe:'#3D6B62',
   satz:'Es läuft, ohne dass es dich umwirft.',
   was:'Diese Abschnitte bauen aus, was in einer Hochphase angefangen wurde. Sie sind '+
     'die stabileren und meistens die angenehmeren.',
   woher:'Das Zeichen steht dem rechten Winkel nach. Vier von zwölf Zeichen tun das.'},
 fallend:{n:'Ruhige Phase', kurz:'leise', rang:1, farbe:'#857B70',
   satz:'Von außen passiert wenig.',
   was:'Hier wird vorbereitet, gelernt und sortiert. Solche Abschnitte fühlen sich oft '+
     'nach Stillstand an und sind keiner — aber wer in einer ruhigen Phase auf den großen '+
     'Durchbruch wartet, wartet die ganze Zeit.',
   woher:'Das Zeichen steht fallend zum Glückspunkt. Vier von zwölf Zeichen tun das.'}
};
function ztStufe(vonGlueck){
  if([1,4,7,10].indexOf(vonGlueck)>=0) return 'winkel';
  if([2,5,8,11].indexOf(vonGlueck)>=0) return 'folgend';
  return 'fallend';
}

/* ── Die vier Schritte, wie das überhaupt funktioniert ───────  */
var ZT_SCHRITTE=[
 {n:'Dein Leben bekommt Kapitel',
  t:'Nicht Jahre, sondern Abschnitte von ganz verschiedener Länge — manche acht Jahre, '+
    'manche dreißig. Sie folgen aufeinander wie Kapitel in einem Buch, und man merkt den '+
    'Wechsel meistens erst hinterher.',
  mehr:'Das Verfahren heißt zodiakale Freilassung und steht bei Vettius Valens im zweiten '+
    'Jahrhundert. Es wurde über Jahrhunderte nicht benutzt und erst in den letzten '+
    'Jahrzehnten aus den Handschriften zurückgeholt.'},
 {n:'Wie lang ein Kapitel ist, steht fest',
  t:'Jedes Tierkreiszeichen hat eine feste Zahl von Jahren. Die Zahlen sind überliefert '+
    'und werden nicht berechnet oder geschätzt — sie sind für alle Menschen gleich. '+
    'Was sich unterscheidet, ist nur, bei welchem Zeichen du anfängst.',
  mehr:'Es sind die kleinen Jahre der Zeichenherren: Widder 15, Stier 8, Zwillinge 20, '+
    'Krebs 25, Löwe 19, Jungfrau 20, Waage 8, Skorpion 15, Schütze 12, Steinbock 27, '+
    'Wassermann 30, Fische 12. Gerechnet wird in Jahren zu 360 Tagen.'},
 {n:'Ein Punkt entscheidet, welche Kapitel laut sind',
  t:'In deinem Chart gibt es einen Punkt, den <b>Glückspunkt</b>. Von ihm aus gezählt sind '+
    'vier der zwölf Zeichen „laut". Fällt ein Kapitel auf eines davon, ist es eine Hochphase. '+
    'Deshalb hat jeder Mensch andere laute Jahre, obwohl die Kapitellängen gleich sind.',
  mehr:'Der Glückspunkt ist das Los des Glücks: bei Tag Aszendent plus Mond minus Sonne, '+
    'bei Nacht umgekehrt. Laut sind die Zeichen, die winkelhaft dazu stehen — das Zeichen '+
    'selbst, das vierte, das siebte und das zehnte davon.'},
 {n:'Dieselbe Rechnung, fünfmal',
  t:'Je nachdem, von welchem Punkt du startest, bekommst du die Kapitel für einen anderen '+
    'Lebensbereich. Arbeit, Liebe, Umstände, Rückenwind und Druck laufen deshalb <b>nicht '+
    'gleichzeitig</b> — in der Arbeit kann Hochphase sein, während es in der Liebe still ist.',
  mehr:'Jeder Bereich hat seinen eigenen Startpunkt, eines der sieben hermetischen Lose. '+
    'Was sich zwischen den Bereichen nie ändert, ist der Glückspunkt: Er bleibt der Maßstab '+
    'für laut und leise, egal welche Spur gerechnet wird.'}
];

/* ── Die Wörter, die auf der Seite vorkommen ─────────────────
   Jedes in einem Satz, ohne ein weiteres Fachwort darin.       */
var ZT_WORT={
 'Kapitel':'Ein Lebensabschnitt in diesem Verfahren. Er dauert zwischen 8 und 30 Jahren, '+
   'je nachdem, welches Tierkreiszeichen ihn trägt.',
 'Unterabschnitt':'Ein kürzerer Abschnitt innerhalb eines Kapitels — Monate bis wenige Jahre. '+
   'Auch er kann laut oder leise sein, unabhängig vom Kapitel darum herum.',
 'Hochphase':'Ein Abschnitt, in dem viel gleichzeitig passiert. Nicht automatisch etwas Gutes: '+
   'gemeint ist die Menge an Ereignissen, nicht ihre Richtung.',
 'Glückspunkt':'Ein rechnerischer Punkt in deinem Chart, der aus Sonne, Mond und Aszendent '+
   'gebildet wird. Von ihm aus wird gemessen, welche Abschnitte laut sind.',
 'Der große Schnitt':'Eine Stelle, an der die Reihe aus der normalen Ordnung springt. In der '+
   'Überlieferung der größte Einschnitt eines Kapitels: etwas endet, das man für dauerhaft hielt.',
 'Jahresthema':'Ein Verfahren, das jedem Lebensjahr eines der zwölf Häuser zuordnet. Mit 0 das '+
   'erste, mit 1 das zweite, und nach zwölf Jahren fängt es von vorn an.',
 'Planetenabschnitt':'Ein weiteres altes Verfahren, das ein Leben in neun Abschnitte teilt und '+
   'jedem einen Planeten zuordnet. Zusammen decken sie 75 Jahre ab.',
 'Aszendent':'Das Tierkreiszeichen, das bei deiner Geburt am östlichen Horizont aufging. Es '+
   'wechselt etwa alle zwei Stunden — deshalb braucht dieses Verfahren die Geburtszeit.',
 'Tag oder Nacht':'Stand die Sonne bei deiner Geburt über dem Horizont, ist es eine Taggeburt, '+
   'sonst eine Nachtgeburt. Bei Nachtgeburten werden mehrere Punkte spiegelverkehrt gerechnet.'
};

/* ── Die zwölf Zeichen als Kapitel, durch fünf Bereiche ──────  */
var ZT_KAPITEL={
0:{n:'Widder', herr:'Mars', bild:'anfangen und allein losgehen',
 arbeit:{t:'Ein Anfangskapitel. Es wird etwas begonnen, oft überstürzt und ohne Absicherung: '+
   'Selbstständigkeit, ein Wechsel ohne Netz, ein Streit, nach dem man geht.',
  tun:'Anfangen und die Sache im Laufen sortieren. Auf Klarheit zu warten kostet hier den Abschnitt.'},
 liebe:{t:'Hier geht etwas schnell los. Verliebtheit kommt plötzlich, Entscheidungen fallen '+
   'früh. Auch Trennungen passieren in solchen Abschnitten ohne langes Vorspiel.',
  tun:'In den ersten drei Monaten nichts Großes festlegen. Das Tempo ist hier nicht die Wahrheit.'},
 koerper:{t:'Die Umstände ändern sich ruckartig und oft von außen angestoßen. Umzüge, '+
   'Unfälle, plötzliche Ausgaben — aber auch ein neuer Ort, der plötzlich frei wird.',
  tun:'Einen Puffer anlegen. In so einem Abschnitt kommt die Überraschung, nicht der Plan.'},
 erfolg:{t:'Unterstützung kommt hier, wenn du selbst losgehst, nicht wenn du wartest. '+
   'Wer fragt, bekommt; wer hofft, dass jemand von selbst merkt, bekommt nichts.',
  tun:'Drei Leute direkt fragen. Nicht andeuten — fragen.'},
 druck:{t:'Der Druck kommt plötzlich und als Konflikt: etwas muss sofort entschieden werden, '+
   'meistens gegen jemanden. Er baut sich nicht auf, er ist von einem Tag auf den anderen da.',
  tun:'Die Auseinandersetzung früh führen, solange sie noch klein ist.'}},

1:{n:'Stier', herr:'Venus', bild:'festhalten, sichern, genießen',
 arbeit:{t:'Ein Kapitel des Festigens. Es geht um Geld, Besitz und darum, dass die Arbeit '+
   'etwas abwirft, das bleibt. Spektakulär ist das selten — hier wird das Fundament gegossen.',
  tun:'Preise, Verträge und Rücklagen anfassen. Das zahlt sich in diesem Abschnitt wirklich aus.'},
 liebe:{t:'Beständigkeit und Sinnlichkeit. Was hier anfängt, braucht eine lange Anlaufzeit und '+
   'hält dann. Es geht um Alltag, Zuhause und darum, wie Nähe sich körperlich anfühlt.',
  tun:'Etwas gemeinsam einrichten, das Bestand hat — eine Wohnung, eine feste Gewohnheit.'},
 koerper:{t:'Die Umstände werden ruhiger und verlässlicher. Einkommen stabilisiert sich, der '+
   'Körper will mehr Genuss und weniger Tempo. Es setzt sich auch leicht etwas an.',
  tun:'Eine Gewohnheit einführen, die acht Jahre durchhält. Keine Kur, eine Gewohnheit.'},
 erfolg:{t:'Hilfe kommt in Form von Geld und Material, nicht in Form von Türen. Jemand '+
   'bezahlt, leiht, überlässt dir etwas.',
  tun:'Konkret um das Materielle bitten, nicht um Rat.'},
 druck:{t:'Der Druck ist zäh und finanziell: laufende Kosten, Verpflichtungen, die man nicht '+
   'einfach kündigt. Er kommt langsam und geht langsam.',
  tun:'Einmal alle Dauerkosten aufschreiben. In diesem Abschnitt lohnt genau das.'}},

2:{n:'Zwillinge', herr:'Merkur', bild:'verbinden, reden, vieles gleichzeitig',
 arbeit:{t:'Ein langes Kapitel mit vielen Fäden. Mehrere Sachen nebeneinander, viel Reden und '+
   'Schreiben, und der Beruf ist eher eine Reihe von Gelegenheiten als ein Weg.',
  tun:'Nicht auf die eine große Sache warten. Hier entsteht sie aus vielen kleinen.'},
 liebe:{t:'Viel Bewegung und Kontakt. Mehr Begegnungen als sonst, Verbindungen entstehen über '+
   'Gespräche. Festlegung fällt schwer, oft läuft mehr als eine Sache gleichzeitig.',
  tun:'Aussprechen, was gerade gilt. Hier entstehen Missverständnisse aus Unausgesprochenem.'},
 koerper:{t:'Die Umstände sind unruhig und wechselhaft: viele kurze Wege, wechselnde Orte, '+
   'ein Nervensystem, das mehr abbekommt als der Körper.',
  tun:'Reize reduzieren statt Erholung dazulegen. Weniger Bildschirm bringt hier mehr als Sport.'},
 erfolg:{t:'Hilfe kommt über Information und Kontakte — jemand nennt dir einen Namen, schickt '+
   'dir etwas weiter, erwähnt dich im richtigen Moment.',
  tun:'Dich in Erinnerung bringen. Eine kurze Nachricht an zehn Leute, die dich kennen.'},
 druck:{t:'Der Druck besteht aus vielen Kleinigkeiten gleichzeitig, nicht aus einer großen '+
   'Sache. Erschöpfend wird es durch die Menge.',
  tun:'Zusammenfassen statt abarbeiten: drei Sachen streichen, nicht schneller erledigen.'}},

3:{n:'Krebs', herr:'Mond', bild:'versorgen und zu Hause sein',
 arbeit:{t:'Das längste Kapitel überhaupt, fünfundzwanzig Jahre. Arbeit und Privatleben lassen '+
   'sich hier nicht trennen: von zu Hause arbeiten, für die Familie, oder nach ihr richten.',
  tun:'Ernst nehmen, wie viel Sicherheit du brauchst — in Euro, nicht im Gefühl.'},
 liebe:{t:'Beziehung und Zuhause werden dasselbe Thema: zusammenziehen, Kinder, Pflege. Nähe '+
   'entsteht über Fürsorge, nicht über Worte, und alte Familienmuster melden sich deutlich.',
  tun:'Einmal benennen, was du aus deiner Herkunftsfamilie mitbringst. Hier wirkt es.'},
 koerper:{t:'Die Umstände drehen sich um Wohnen und Familie. Der Körper reagiert stark auf '+
   'Stimmung und auf das, was zu Hause los ist.',
  tun:'Die Wohnung in Ordnung bringen. Das ist in diesem Abschnitt keine Nebensache.'},
 erfolg:{t:'Hilfe kommt von Menschen, die dir nahe sind, nicht aus dem Netzwerk. Familie, '+
   'alte Freundschaften, Leute, die dich lange kennen.',
  tun:'Bei jemandem fragen, der dich seit zehn Jahren kennt.'},
 druck:{t:'Der Druck ist häuslich: Pflege, Familie, Wohnsituation. Er ist schwer abzugeben, '+
   'weil er persönlich ist — und weil niemand sonst ihn so selbstverständlich übernimmt.',
  tun:'Eine Aufgabe konkret an jemanden übergeben. Mit Namen und Termin.'}},

4:{n:'Löwe', herr:'Sonne', bild:'zeigen und gesehen werden',
 arbeit:{t:'Ein Kapitel der Sichtbarkeit. Hier tritt jemand nach vorn, mit eigenem Namen und '+
   'eigenem Gesicht. Aus einer Arbeit wird ein Ruf.',
  tun:'Etwas unter eigenem Namen machen. Nicht größer, sondern sichtbarer.'},
 liebe:{t:'Liebe ist hier etwas Gezeigtes: Begehrtwerden, Romantik im großen Format, oft auch '+
   'Kinder. Wer sich versteckt, fühlt sich ungeliebt, auch wenn es nicht stimmt.',
  tun:'Die Beziehung sichtbar machen — vorstellen, zusammen auftreten.'},
 koerper:{t:'Die Umstände werden großzügiger und auch teurer. Mehr Raum, mehr Ausgaben, mehr '+
   'Aufmerksamkeit. Herz und Rücken wollen Bewegung.',
  tun:'Einmal prüfen, ob der Lebensstandard zum Einkommen passt.'},
 erfolg:{t:'Hier kommt Rückenwind von Leuten mit Einfluss. Jemand stellt sich hin und sagt, '+
   'dass du gut bist — und das wirkt.',
  tun:'Dich jemandem zeigen, der etwas entscheiden kann.'},
 druck:{t:'Der Druck kommt über Erwartungen: Du sollst liefern, weil man dich kennt. Das '+
   'drückt anders als Arbeit, nämlich auf den Stolz.',
  tun:'Einmal etwas absagen, von dem alle annehmen, dass du es machst.'}},

5:{n:'Jungfrau', herr:'Merkur', bild:'verbessern und genau machen',
 arbeit:{t:'Ein langes Arbeitskapitel: Können, Handwerk, tägliche Routine, kein Glanz. Zwanzig '+
   'Jahre, in denen jemand gut wird — und oft denkt, es gehe nichts voran, weil der Fortschritt '+
   'in Details steckt.',
  tun:'Eine Fertigkeit wirklich zu Ende lernen. Das ist hier die beste Investition.'},
 liebe:{t:'Liebe findet im Alltäglichen statt: wer einkauft, wer sich kümmert, wie der Alltag '+
   'läuft. Beziehungen werden daran geprüft, ob sie im Werktag funktionieren.',
  tun:'Die Arbeitsteilung offen besprechen, bevor sie zum Vorwurf wird.'},
 koerper:{t:'Der Körper meldet sich in diesem Abschnitt deutlicher als sonst — nicht dramatisch, '+
   'sondern als Kleinkram, der nicht weggeht. Es ist die Zeit, Gewohnheiten umzustellen.',
  tun:'Eine Sache ärztlich abklären, die du seit Jahren mitschleppst.'},
 erfolg:{t:'Hilfe kommt für gute Arbeit, nicht für gute Auftritte. Wer hier unterstützt wird, '+
   'wurde vorher beobachtet — oft über Monate, ohne es zu merken.',
  tun:'Die eigene Arbeit sichtbar machen, ohne sie zu bewerben.'},
 druck:{t:'Der Druck ist Alltagsdruck: zu viele Aufgaben, zu wenig Zeit, und ein hoher eigener '+
   'Anspruch, der nichts leichter macht.',
  tun:'Eine Sache bewusst schlechter machen als möglich. Und es so lassen.'}},

6:{n:'Waage', herr:'Venus', bild:'abstimmen und zu zweit',
 arbeit:{t:'Ein kurzes Kapitel, in dem Partnerschaften zählen: Mitgründerinnen, Kundschaft, '+
   'Verträge. Allein geht wenig voran, zu zweit viel.',
  tun:'Die eine Verbindung suchen, die dich weiterbringt. Acht Jahre sind kurz.'},
 liebe:{t:'Das Beziehungskapitel im engeren Sinn. Partnerschaften werden eingegangen, '+
   'formalisiert oder beendet. Es geht um Augenhöhe und um Verbindlichkeit.',
  tun:'Aussprechen, was du willst — verbindlich oder offen. Hier entscheidet sich das.'},
 koerper:{t:'Die Umstände hängen an anderen Menschen: gemeinsame Wohnung, gemeinsames Geld, '+
   'Absprachen. Vieles ist angenehm und wenig allein entschieden.',
  tun:'Schriftlich festhalten, was gemeinsam ist und was nicht.'},
 erfolg:{t:'Rückenwind kommt durch eine einzelne Person, die sich für dich einsetzt. Nicht '+
   'durch viele, durch eine. Dafür trägt diese eine Verbindung weit.',
  tun:'Diese eine Person benennen — und sie fragen.'},
 druck:{t:'Der Druck kommt aus Rücksicht: Du machst Dinge, weil sonst jemand enttäuscht wäre. '+
   'Das summiert sich leise und fällt erst auf, wenn kaum noch eigene Zeit übrig ist.',
  tun:'Einmal nein sagen, ohne eine Begründung mitzuliefern.'}},

7:{n:'Skorpion', herr:'Mars', bild:'in die Tiefe gehen',
 arbeit:{t:'Ein Kapitel der Tiefe und der Krisen. Arbeit mit Dingen, über die sonst nicht '+
   'geredet wird, oder mit dem Geld anderer Leute: Beteiligungen, Kredite, Erbschaften.',
  tun:'Die Zahlen anderer Leute verstehen lernen. Hier hängt vieles daran.'},
 liebe:{t:'Eine intensive Zeit. Bindungen werden tiefer und verwickelter, oft auch abhängiger. '+
   'Es geht um Sexualität, um Gemeinsames und um Macht. Trennungen sind hier einschneidend.',
  tun:'Das aussprechen, was du am wenigsten aussprechen willst. Darum geht es hier.'},
 koerper:{t:'Die Umstände werden ernster und oft fremdbestimmt: Schulden, Erbschaften, Dinge, '+
   'die andere entscheiden. Der Körper reagiert auf das, was nicht gesagt wird.',
  tun:'Die unangenehmste finanzielle Zahl einmal ansehen. Nur ansehen.'},
 erfolg:{t:'Hilfe kommt über wenige, sehr enge Kontakte — und oft in Form von Geld oder Zugang, '+
   'nicht in Form von Zuspruch.',
  tun:'Eine Person wirklich einweihen, statt vielen die Hälfte zu erzählen.'},
 druck:{t:'Der Druck ist der schwerste der zwölf: Abhängigkeit, Geld, Dinge, die man nicht '+
   'allein lösen kann. Er wird selten ausgesprochen.',
  tun:'Hilfe holen, die etwas kostet. Beratung, Anwältin, Schuldnerberatung.'}},

8:{n:'Schütze', herr:'Jupiter', bild:'weiter weg, lernen, lehren',
 arbeit:{t:'Ein Kapitel der Weite. Ausbildung, Lehre, Ausland, Veröffentlichung — der Beruf '+
   'bekommt einen größeren Rahmen, und oft kommt eine Gelegenheit von weit her.',
  tun:'Etwas lernen oder lehren, das über deinen bisherigen Rahmen hinausgeht.'},
 liebe:{t:'Liebe hat mit Weite zu tun: Fernbeziehungen, andere Länder, andere Herkunft, '+
   'gemeinsames Reisen. Weniger Alltag, mehr die Frage, ob ihr in dieselbe Richtung schaut.',
  tun:'Gemeinsam etwas anfangen, das keine von euch allein gemacht hätte.'},
 koerper:{t:'Die Umstände werden weiter und großzügiger. Mehr Bewegungsfreiheit, mehr '+
   'Gelegenheiten — und leicht auch mehr, als gut tut.',
  tun:'Eine Gelegenheit annehmen, die räumlich unbequem ist.'},
 erfolg:{t:'Der günstigste Abschnitt für Rückenwind überhaupt. Es kommt Förderung, Zuspruch '+
   'und Zutrauen, oft von jemandem, der mehr Erfahrung hat.',
  tun:'Dir jemanden suchen, der weiter ist als du, und ihn um Begleitung bitten.'},
 druck:{t:'Der Druck kommt aus Überdehnung: zu viel zugesagt, zu weit ausgeholt. Nicht Enge, '+
   'sondern Weite ist hier das Problem.',
  tun:'Eine Zusage zurücknehmen, bevor sie fällig wird.'}},

9:{n:'Steinbock', herr:'Saturn', bild:'aufbauen und tragen',
 arbeit:{t:'Ein sehr langes und ernstes Kapitel, siebenundzwanzig Jahre. Aufbauen, Verantwortung '+
   'tragen, aushalten. Der Anfang ist zäh, das Ende trägt. Wer auf schnelle Erfolge wartet, '+
   'wartet die ganze Zeit.',
  tun:'In Jahren rechnen, nicht in Monaten. Und früh etwas bauen, das ohne dich läuft.'},
 liebe:{t:'Beziehungen bekommen Gewicht: Verbindlichkeit, Verantwortung, manchmal Pflege oder '+
   'Altersunterschied. Weniger Schwärmen, mehr Tragen. Was hier hält, hält wirklich.',
  tun:'Prüfen, ob du bleibst, weil du willst, oder weil du dich verpflichtet fühlst.'},
 koerper:{t:'Die Umstände sind eng und verlangen Disziplin. Knochen, Zähne, Haut und Gelenke '+
   'wollen Aufmerksamkeit. Es ist der Abschnitt, in dem Vernachlässigtes sich meldet.',
  tun:'Die eine Vorsorge machen, die du seit Jahren schiebst.'},
 erfolg:{t:'Unterstützung kommt spät und dafür verlässlich. Sie muss verdient werden und wird '+
   'dann nicht zurückgenommen. Wer hier zu früh aufgibt, verpasst sie knapp.',
  tun:'Dranbleiben, auch wenn drei Anfragen ins Leere laufen.'},
 druck:{t:'Der klassische Druckabschnitt: Verantwortung, die man nicht abgeben kann, und '+
   'wenig Spielraum. Er ist real und nicht eingebildet.',
  tun:'Eine Pflicht abgeben, die niemand verlangt hat außer dir selbst.'}},

10:{n:'Wassermann', herr:'Saturn', bild:'anders machen, in Gruppen',
 arbeit:{t:'Das längste Kapitel, dreißig Jahre. Gruppen, Netzwerke und etwas anders machen als '+
   'vorgesehen. Der Beruf läuft über Leute, nicht über Bewerbungen, und passt selten in eine '+
   'vorhandene Schublade.',
  tun:'In Gruppen gehen, in denen das schon gemacht wird, was du machen willst.'},
 liebe:{t:'Beziehungen nehmen eigene Formen an: Freundschaft und Liebe gehen ineinander über, '+
   'Abstand gehört dazu, und was andere für richtig halten, trifft hier nicht zu.',
  tun:'Die eigene Form aushandeln, statt eine zu übernehmen, die nicht passt.'},
 koerper:{t:'Die Umstände sind unkonventionell und wenig planbar. Wohnformen und Einkommen '+
   'sehen anders aus als bei den meisten, und das ist nicht das Problem, sondern die Anlage.',
  tun:'Aufhören, die eigene Lage mit der Norm zu vergleichen.'},
 erfolg:{t:'Hilfe kommt aus der Gruppe und oft von Fremden — jemand aus einem Netzwerk, der '+
   'dich kaum kennt, macht eine Tür auf.',
  tun:'An einem Ort auftauchen, an dem dich niemand kennt.'},
 druck:{t:'Der Druck kommt daraus, dass die üblichen Wege für dich nicht funktionieren und du '+
   'jeden selbst bauen musst. Das kostet Kraft, die andere für die Sache selbst haben.',
  tun:'Einen fertigen Weg ausprobieren, bevor du einen eigenen baust.'}},

11:{n:'Fische', herr:'Jupiter', bild:'auflösen und loslassen',
 arbeit:{t:'Ein Kapitel im Hintergrund. Oft unbezahlt, unsichtbar oder im Dienst einer Sache, '+
   'und die Richtung ist unscharf. Es ist der Abschnitt vor einem Neuanfang — und das merkt '+
   'man erst hinterher.',
  tun:'Nichts erzwingen. Festhalten, was von selbst wiederkommt, und das als Hinweis nehmen.'},
 liebe:{t:'Weiche Ränder. Verbindungen sind eher ungeklärt als eindeutig: Nähe ohne Festlegung, '+
   'Sehnsucht, manchmal auch Täuschung. Viel gefühlt, wenig geklärt.',
  tun:'Einmal konkret nachfragen, was gerade gilt. Sonst bleibt es offen.'},
 koerper:{t:'Die Umstände sind diffus und schwer zu greifen. Erschöpfung ohne klaren Grund, '+
   'Geld, das zerrinnt, Zuständigkeiten, die niemand hat.',
  tun:'Ein Konto und einen Kalender führen. Gerade hier, gerade jetzt.'},
 erfolg:{t:'Hilfe kommt, aber unauffällig und ohne dass jemand darüber redet. Oft merkst du '+
   'erst später, wer etwas für dich getan hat.',
  tun:'Dich bei jemandem bedanken, von dem du vermutest, dass er geholfen hat.'},
 druck:{t:'Der Druck ist nicht greifbar: Unklarheit, offene Enden, Dinge, die niemand entscheidet. '+
   'Das zehrt mehr als klare Last.',
  tun:'Eine offene Sache abschließen, egal wie. Abschließen ist hier wichtiger als richtig.'}}
};

/* ── Der große Schnitt ───────────────────────────────────────  */
var ZT_SCHNITT={
 n:'Der große Schnitt',
 klassisch:'Lösung der Bindung',
 was:'An dieser Stelle springt die Reihe aus ihrer Ordnung: Statt wie bisher weiterzuzählen, '+
   'setzt sie auf der gegenüberliegenden Seite neu an. In der Überlieferung ist das der größte '+
   'Einschnitt, den ein Kapitel kennt — etwas endet, das man für dauerhaft gehalten hat.',
 beispiele:{
  arbeit:'Branchenwechsel, Kündigung, Gründung, Aufhören mit etwas, das zehn Jahre lief.',
  liebe:'Eine Beziehung endet oder ändert sich grundlegend — das muss keine Trennung sein.',
  koerper:'Umzug, Wechsel der Lebensumstände, manchmal auch etwas Körperliches.',
  erfolg:'Die Leute, die dich bisher gestützt haben, sind nicht mehr dieselben.',
  druck:'Eine Verpflichtung fällt weg — und oft fehlt sie erst einmal.'},
 tun:'Solche Zeitpunkte lohnt es vorher zu kennen. Nicht um sie zu vermeiden, sondern um nicht '+
   'überrascht zu sein. Und: In so einem Jahr nichts aus Gewohnheit weiterlaufen lassen — was '+
   'bleiben soll, muss neu begründet werden.'
};

/* ── Die Jahresthemen (Profektion) ──────────────────────────  */
var ZT_PROFEKTION=[
 {h:1,  n:'Du selbst',    t:'Ein Jahr über dich: Auftreten, Körper, Richtung. Was du dieses Jahr anfängst, trägt deine Handschrift.'},
 {h:2,  n:'Geld und Wert',t:'Ein Jahr über Einkommen, Besitz und den eigenen Wert. Preise, Gehalt und Rücklagen sind dran.'},
 {h:3,  n:'Nahbereich',   t:'Ein Jahr über Geschwister, Nachbarschaft, kurze Wege und das Schreiben. Viel Bewegung, wenig Grundsätzliches.'},
 {h:4,  n:'Zuhause',      t:'Ein Jahr über Wohnung, Familie und Herkunft. Umzüge, Eltern, und die Frage, wo du hingehörst.'},
 {h:5,  n:'Ausdruck',     t:'Ein Jahr über das, was von dir ausgeht: Kinder, Kunst, Verliebtheit, Spiel. Mehr zeigen als zurückhalten.'},
 {h:6,  n:'Alltag',       t:'Ein Jahr über Arbeit, Routine und Körper. Unspektakulär und arbeitsreich — und gut, um Gewohnheiten umzustellen.'},
 {h:7,  n:'Die anderen',  t:'Ein Jahr über Partnerschaft, Kundschaft und Verträge. Was wichtig wird, kommt über andere Menschen.'},
 {h:8,  n:'Das Geteilte', t:'Ein Jahr über gemeinsames Geld, Abhängigkeit und Dinge, über die nicht geredet wird. Oft unbequem, selten folgenlos.'},
 {h:9,  n:'Weite',        t:'Ein Jahr über Lehre, Ausland, Veröffentlichung und Überzeugungen. Der Rahmen wird größer.'},
 {h:10, n:'Beruf',        t:'Ein Jahr über Position und Außenwirkung. Das sichtbarste von zwölf — hier wird bewertet, was du aufgebaut hast.'},
 {h:11, n:'Gruppen',      t:'Ein Jahr über Netzwerke, Freundeskreis und Zukunftspläne. Vieles kommt über Leute, die du kennst.'},
 {h:12, n:'Rückzug',      t:'Ein Jahr im Hintergrund: abschließen, loslassen, erholen. Das Jahr zum Aufräumen, bevor es von vorn losgeht.'}
];

/* ── Die Planetenabschnitte (Firdaria) ──────────────────────  */
var ZT_FIRDARIA={
 'Sonne':{t:'Zehn Jahre über Sichtbarkeit, Position und den eigenen Namen. Gute Zeit, nach vorn zu treten.'},
 'Mond':{t:'Neun Jahre mit viel Bewegung im Privaten: Zuhause, Familie, Stimmung, Gesundheit. Weniger planbar als andere Abschnitte.'},
 'Merkur':{t:'Dreizehn Jahre über Reden, Schreiben, Lernen und Handel. Der längste Abschnitt — viele Fäden, viel Austausch.'},
 'Venus':{t:'Acht Jahre über Beziehung, Geschmack und Geld. Oft die angenehmste Strecke, und die, in der sich etwas verbindet.'},
 'Mars':{t:'Sieben Jahre mit Reibung und Tempo. Konflikte, Durchsetzung, Trennungen und Neuanfänge aus eigener Kraft.'},
 'Jupiter':{t:'Zwölf Jahre mit Spielraum: Ausbildung, Weite, Gelegenheiten. Es wird mehr, und gelegentlich zu viel.'},
 'Saturn':{t:'Elf Jahre mit Gewicht: Verantwortung, Begrenzung, Aufbau. Zäh am Anfang, haltbar am Ende.'},
 'Aufsteigender Knoten':{t:'Drei Jahre, in denen etwas zunimmt und über das übliche Maß hinauswächst — im Guten wie im Anstrengenden.'},
 'Absteigender Knoten':{t:'Zwei Jahre, in denen etwas abnimmt und sich auflöst. Eine Zeit zum Abschließen, nicht zum Anfangen.'}
};
