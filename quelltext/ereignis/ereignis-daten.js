/* Astro-Charlie · Ereignisse lesen — die Texte.
   Hier stehen nur Sätze. Nichts rechnet, nichts zeigt an.

   Zwei Register: Wo ein Feld ein Paar ['Alltag','Fach'] ist, gilt der
   erste Eintrag auf Stufe 0 und der zweite ab Stufe 1. Ein einfacher
   String gilt überall — dann ist der Satz auf beiden Stufen derselbe
   und enthält kein Fachwort. Die Auswahl trifft w() in ereignis-app.js. */
(function(){
'use strict';

/* ── Die fünf Bausteine ────────────────────────────────── */
var BAUSTEINE = [
 { nr:'1', frage:'WAS',
   titel:['Welche Kraft','Der Planet'],
   kurz:'Welche Kraft gerade angesprochen ist.',
   text:['Jede Kraft hat ihr eigenes Thema. Zuneigung geht anders vor als Antrieb, '
       + 'und Struktur fühlt sich anders an als Wachstum. Der erste Schritt ist immer: '
       + 'Welche Kraft ist überhaupt beteiligt?',
         'Jeder Planet hat sein eigenes Thema. Venus geht anders vor als Mars, '
       + 'und Saturn fühlt sich anders an als Jupiter. Der erste Schritt ist immer: '
       + 'Welcher Planet ist überhaupt beteiligt?'],
   liste:[
    ['Sonne','Identität, Richtung, Fokus'],
    ['Mond','Gefühl, Bedürfnis, Zuhause'],
    ['Merkur','Denken, Reden, Nachrichten'],
    ['Venus','Zuneigung, Werte, Geschmack'],
    ['Mars','Antrieb, Ärger, Durchsetzung'],
    ['Jupiter','Wachstum, Vertrauen, Rückenwind'],
    ['Saturn','Struktur, Prüfung, Verbindlichkeit'],
    ['Uranus','Überraschung, Bruch, Befreiung'],
    ['Neptun','Sehnsucht, Nebel, Auflösung'],
    ['Pluto','Tiefe, Macht, Verwandlung']] },

 { nr:'2', frage:'WIE',
   titel:['Auf welche Art','Das Zeichen'],
   kurz:'In welchem Stil diese Kraft vorgeht.',
   text:['Dieselbe Kraft tritt verschieden auf. Sie kann direkt losgehen oder lange zögern, '
       + 'laut werden oder sich zurückziehen. Die Art ändert nicht das Thema — sie ändert die Umgangsform.',
         'Derselbe Planet tritt in jedem Zeichen anders auf. Er kann direkt losgehen oder lange zögern, '
       + 'laut werden oder sich zurückziehen. Das Zeichen ändert nicht das Thema — es ändert die Umgangsform.'],
   liste:[
    ['Widder','direkt, sofort, ohne Umweg'],
    ['Stier','langsam, sinnlich, beharrlich'],
    ['Zwillinge','beweglich, neugierig, in Worten'],
    ['Krebs','vorsichtig, schützend, nah'],
    ['Löwe','sichtbar, großzügig, mit Geste'],
    ['Jungfrau','genau, prüfend, im Detail'],
    ['Waage','abwägend, über das Gegenüber'],
    ['Skorpion','tief, unbedingt, verdeckt'],
    ['Schütze','weit, meinungsstark, hinaus'],
    ['Steinbock','ernst, geduldig, mit Plan'],
    ['Wassermann','eigensinnig, abstrakt, quer'],
    ['Fische','durchlässig, mitfühlend, unscharf']] },

 { nr:'3', frage:'WO',
   titel:['In welchem Lebensbereich','Das Haus'],
   kurz:'An welcher Stelle des Lebens es spürbar wird.',
   text:['Der Lebensbereich ist die Bühne. Er sagt nichts darüber, ob etwas gut ausgeht — '
       + 'nur, in welchem Teil des Lebens es sich abspielt. Dieselbe Spannung ist in der Arbeit '
       + 'etwas anderes als zu Hause.',
         'Das Haus ist die Bühne. Es sagt nichts darüber, ob etwas gut ausgeht — '
       + 'nur, in welchem Teil des Lebens es sich abspielt. Dieselbe Spannung ist im 10. Haus '
       + 'etwas anderes als im 4.'],
   liste:[
    ['1. Haus','du selbst, dein Auftreten, dein Körper'],
    ['2. Haus','Geld, Besitz, Selbstwert'],
    ['3. Haus','Nachrichten, kurze Wege, Geschwister, Nachbarn'],
    ['4. Haus','Zuhause, Herkunft, Familie, Wurzeln'],
    ['5. Haus','Romantik, Dating, Spiel, Kinder, Kreatives'],
    ['6. Haus','Alltag, Arbeit, Körperpflege, Haustiere'],
    ['7. Haus','Partnerschaft, das verbindliche Gegenüber'],
    ['8. Haus','Tiefe, Intimität, geteiltes Geld, Krisen'],
    ['9. Haus','Ferne, Studium, Überzeugung, Ausland'],
    ['10. Haus','Berufung, Lebensrichtung, Ansehen'],
    ['11. Haus','Freundschaften, Gruppen, Hoffnungen'],
    ['12. Haus','Verborgenes, Rückzug, das Unerledigte']] },

 { nr:'4', frage:'WIE STARK',
   titel:['Welche Art Verbindung','Der Aspekt'],
   kurz:'Ob zwei Kräfte zusammenarbeiten oder gegeneinander.',
   text:['Die Verbindung ist der Umgangston zwischen zwei Kräften. Sie entscheidet, ob etwas leicht geht, '
       + 'ob es Reibung gibt oder ob zwei Dinge einander im Weg stehen.',
         'Der Aspekt ist der Umgangston zwischen zwei Planeten. Er entscheidet, ob etwas leicht geht, '
       + 'ob es Reibung gibt oder ob zwei Dinge einander im Weg stehen.'],
   liste:[
    ['Konjunktion','verschmilzt — beides zugleich, nicht trennbar'],
    ['Sextil','bietet an — geht leicht, wenn man zugreift'],
    ['Quadrat','reibt — verlangt eine Handlung, erzwingt sie nicht'],
    ['Trigon','fließt — geht von allein, wird leicht übersehen'],
    ['Opposition','spiegelt — zwei Pole, die beide recht haben']] },

 { nr:'5', frage:'WANN',
   titel:['Zu welcher Zeit','Das Timing'],
   kurz:'Ab wann, bis wann, und wie nah dran.',
   text:['Ohne Zeitangabe ist eine Deutung wertlos. Erst das Fenster macht aus einer Beschreibung '
       + 'etwas, mit dem jemand etwas anfangen kann.',
         'Ohne Zeitangabe ist eine Deutung wertlos. Erst das Fenster macht aus einer Beschreibung '
       + 'etwas, mit dem jemand etwas anfangen kann.'],
   liste:[
    ['Transit','der heutige Himmel berührt das Geburtsbild'],
    ['Orbis','der Abstand zum genauen Winkel — je enger, desto lauter'],
    ['exakter Tag','der Höhepunkt, meist nicht der eindrücklichste'],
    ['Station','ein Planet dreht — die intensivsten Wochen'],
    ['Rückläufigkeit','Rückschau und Prüfung statt Neuanfang'],
    ['Progression','ein Tag nach der Geburt zählt ein Lebensjahr']] }
];

/* ── Rezepte (ab Stufe 1 sichtbar) ─────────────────────── */
var REZEPTE = [
 { k:'nachricht', ergebnis:'es klingelt', name:'Eine überraschende Nachricht',
   formel:['Überraschung','Kommunikation','Thema'],
   zutaten:[
    'Uranus — der Baustein für das Unerwartete',
    'Merkur, das 3. Haus oder Zwillinge — der Baustein für Nachrichten',
    'ein Thema-Baustein: Venus oder das 5. Haus für Liebe, das 10. Haus für Arbeit'],
   ehrlich:'Das Chart zeigt, DASS etwas ankommen kann — nicht, von wem. '
         + 'Wer daraus einen Namen macht, hat die Methode verlassen.' },

 { k:'naehe', ergebnis:'nah oder fern', name:'Persönlich oder über Entfernung',
   formel:['Ort','Entfernung','Kanal'],
   zutaten:[
    'Für persönlich: 3. Haus (kurze Wege), 7. Haus (das Gegenüber), 4. Haus (Zuhause)',
    'Für Distanz oder Indirektes: 9. Haus (Ferne), 12. Haus (Verborgenes), Neptun (unscharf)',
    'Merkur ohne Ortsangabe heißt meist: über ein Gerät, nicht von Angesicht zu Angesicht'],
   ehrlich:'Diese Unterscheidung ist die unsicherste auf der ganzen Seite. '
         + 'Sie stammt aus einer Zeit ohne Telefon. Behandle sie als Vermutung.' },

 { k:'liebe', ergebnis:'ein offenes Fenster', name:'Liebe und Dating',
   formel:['Zuneigung','Antrieb','Bühne'],
   zutaten:[
    'Venus — was angezogen wird, und wovon',
    'Mars — wer losgeht und wie',
    '5. Haus für Verliebtsein und Dating, 7. Haus für Verbindlichkeit, 8. Haus für Tiefe',
    'Aspekte auf Venus, Mars, den Aszendenten und den Mond'],
   ehrlich:'Ein offenes Fenster sagt nichts über die Qualität dessen, was hindurchkommt. '
         + 'Und nichts darüber, ob jemand bleibt.' },

 { k:'energie', ergebnis:'viel oder wenig Akku', name:'Energie und Antrieb',
   formel:['Kraft','Körper','Gegenwind'],
   zutaten:[
    'Mars — der Akku selbst',
    'Aszendent und Sonne — die Grundverfassung',
    'Neptun im Quadrat oder in Konjunktion: Erschöpfung, Nebel, diffuse Müdigkeit',
    'Saturn: Last, aber tragfähig. Jupiter: Rückenwind, manchmal zu viel davon'],
   ehrlich:'Anhaltende Erschöpfung gehört ärztlich abgeklärt, nicht astrologisch. '
         + 'Das Chart darf die Untersuchung nicht ersetzen.' },

 { k:'berufung', ergebnis:'die Richtung dreht sich', name:'Berufung und Lebensrichtung',
   formel:['Richtung','Reife','Zeit'],
   zutaten:[
    'MC und 10. Haus — wohin es öffentlich geht',
    'Sonne — was die Person im Kern ist',
    'Saturn — was Verbindlichkeit verlangt und wo Reife wächst',
    'Pluto auf dem MC: eine tiefe Neuerfindung der Richtung, über Jahre'],
   ehrlich:'Langsame Planeten brauchen Jahre. Wer hier auf einen Tag deutet, '
         + 'verkauft Dramatik statt Timing.' },

 { k:'phasen', ergebnis:'ein Lebensabschnitt', name:'Große Lebensphasen',
   formel:['langsamer Zyklus','Lebensalter'],
   zutaten:[
    'Saturn auf der Sonne — Reife, Grenzen, Ernsthaftigkeit (etwa alle 29 Jahre)',
    'Uranus am Aszendenten — Befreiung, neue Identität (einmal im Leben, falls überhaupt)',
    'Jupiterwiederkehr alle zwölf Jahre — Aufbruch, Weite',
    'Saturnwiederkehr um 29 und um 58 — die bekannteste Schwelle'],
   ehrlich:'Diese Phasen sind groß und langsam. Sie erklären ein Lebensjahr, '
         + 'nicht einen schlechten Dienstag.' }
];

/* ── Menschen im Chart (auf beiden Stufen sichtbar) ────── */
var MENSCHEN = [
 { k:'mutter', name:'Mutter', icon:'☽',
   wo:['Zuhause und Herkunft — manchmal auch die Lebensrichtung',
       '4. Haus — oft auch das 10.'],
   kraft:['dein Gefühl','Mond'],
   text:['Das Nährende, das Versorgende, das früh Erfahrene. Der Ort dafür ist das Zuhause, '
       + 'aus dem jemand kommt. In der heutigen Praxis wird die Mutter meist dort gesucht.',
         'Der Mond steht für das Nährende, das Versorgende, das früh Erfahrene. Das 4. Haus ist '
       + 'das Zuhause, aus dem jemand kommt. In der modernen Praxis wird die Mutter meist dort gesucht.'],
   aspekte:[
    ['was dein Gefühl von außen gerade berührt — Härte, Nebel oder Druck',
     'wer sonst noch in diesem Bereich wohnt — das färbt die ganze Herkunft',
     'wann der tiefste Punkt deines Bildes wieder angerührt wird'],
    ['Aspekte auf den Mond — besonders von Saturn (Härte), Neptun (Idealisierung), Pluto (Macht)',
     'Aspekte auf den Herrscher des 4. Hauses',
     'Planeten, die im 4. Haus stehen — sie färben die ganze Herkunft',
     'Transite über den IC zeigen, wann das Thema wieder lebendig wird']],
   streit:['Die Überlieferung ist sich uneins, welchem Elternteil dieser Ort gehört. Beide Zuordnungen '
         + 'sind in Gebrauch. Frag im Zweifel die Person, wer das Zuhause gemacht hat und wer den '
         + 'Maßstab gesetzt hat — das trifft es besser als jede Regel.',
           'In der hellenistischen Astrologie gilt das 4. Haus dem Vater, nicht der Mutter. Beide '
         + 'Zuordnungen sind in Gebrauch. Frag im Zweifel die Person, welcher Elternteil das Zuhause '
         + 'gemacht hat und welcher den Maßstab gesetzt hat — das trifft es besser als jede Regel.'] },

 { k:'vater', name:'Vater', icon:'♄',
   wo:['Berufung und Lebensrichtung — manchmal auch das Zuhause',
       '10. Haus — oft auch das 4.'],
   kraft:['deine Struktur, dazu dein Wesenskern','Saturn, bei Tagesgeburten auch die Sonne'],
   text:['Autorität, Maßstab und Grenze. Der Ort dafür ist die Richtung, in die jemand öffentlich geht — '
       + 'und damit oft die Stelle, an der ein Vater seine Spur hinterlassen hat.',
         'Saturn steht für Autorität, Maßstab und Grenze. Das 10. Haus ist die Richtung, in die jemand '
       + 'öffentlich geht — und damit oft die Stelle, an der ein Vater seine Spur hinterlassen hat.'],
   aspekte:[
    ['was deine Struktur und deinen Wesenskern von außen berührt',
     'wer sonst in deinem Bereich der Lebensrichtung wohnt',
     'wann der höchste Punkt deines Bildes angerührt wird'],
    ['Aspekte auf Saturn und auf die Sonne',
     'Aspekte auf den Herrscher des 10. Hauses',
     'Planeten im 10. Haus',
     'Transite über das MC — besonders von Saturn und Pluto']],
   streit:['Dieselbe Uneinigkeit wie bei der Mutter, nur umgekehrt. Nimm nicht die Regel, nimm die Person.',
           'Dieselbe Uneinigkeit wie bei der Mutter, nur umgekehrt. Nimm nicht die Regel, nimm die Person.'] },

 { k:'geschwister', name:'Geschwister', icon:'☿',
   wo:['Nachrichten, kurze Wege, nähere Umgebung','3. Haus'],
   kraft:['dein Denken','Merkur'],
   text:['Die nächste Umgebung: Geschwister, Cousins, Nachbarn, alle, mit denen man aufgewachsen ist, '
       + 'ohne sie gewählt zu haben. Es geht um den Austausch auf Augenhöhe.',
         'Das 3. Haus ist die nächste Umgebung: Geschwister, Cousins, Nachbarn, alle, mit denen man '
       + 'aufgewachsen ist, ohne sie gewählt zu haben. Merkur ist der Austausch auf Augenhöhe.'],
   aspekte:[
    ['was dein Denken gerade von außen berührt',
     'wer sonst in deiner näheren Umgebung wohnt — Antrieb dort heißt oft Rivalität, Struktur oft Abstand',
     'wann in dieser Ecke etwas in Bewegung kommt'],
    ['Aspekte auf Merkur',
     'Aspekte auf den Herrscher des 3. Hauses',
     'Planeten im 3. Haus — Mars dort heißt oft Rivalität, Saturn oft Abstand',
     'Transite durch das 3. Haus: wann in dieser Ecke etwas in Bewegung kommt']],
   streit:['Für einzelne Geschwister gibt es alte Abzählregeln. Sie sind unzuverlässig und hier bewusst weggelassen.',
           'Für einzelne Geschwister gibt es alte Abzählregeln. Sie sind unzuverlässig und hier bewusst weggelassen.'] },

 { k:'familie', name:'Familie und Herkunft', icon:'⌂',
   wo:['Zuhause und Wurzeln','4. Haus, dazu der IC'],
   kraft:['dein Gefühl','Mond'],
   text:['Der tiefste Punkt des Bildes ist die Wurzel. Alles, was von dort kommt, gehört dazu: '
       + 'Wohnung, Familie, das Gefühl von Woher.',
         'Der IC ist der tiefste Punkt des Charts — die Wurzel. Das 4. Haus ist alles, was von dort '
       + 'kommt: Wohnung, Familie, das Gefühl von Woher.'],
   aspekte:[
    ['was den tiefsten Punkt deines Bildes gerade berührt',
     'was dein Gefühl von außen berührt',
     'wohin die Herkunft führt — dafür sieht man, wo ihr Verwalter sitzt',
     'die langsamen Bewegungen über diesen Punkt: Umzüge und Neusortierungen über Jahre'],
    ['Aspekte auf den IC',
     'Aspekte auf den Mond',
     'der Herrscher des 4. Hauses und wo er steht — er sagt, wohin die Herkunft führt',
     'langsame Transite über den IC: Umzüge, Brüche, Neusortierungen über Jahre']],
   streit:['Dieser Ort beschreibt die Erfahrung, nicht die Familie. Zwei Geschwister mit derselben '
         + 'Kindheit haben hier Verschiedenes stehen — und beide haben recht.',
           'Das 4. Haus beschreibt die Erfahrung, nicht die Familie. Zwei Geschwister mit derselben '
         + 'Kindheit haben verschiedene vierte Häuser — und beide haben recht.'] },

 { k:'freunde', name:'Freundinnen und Freunde', icon:'✦',
   wo:['Freundschaften, Gruppen, Hoffnungen','11. Haus'],
   kraft:['deine Zuneigung für die Nähe, dein Vertrauen für die Förderer',
          'Venus für die Nähe, Jupiter für die Förderer'],
   text:['Die gewählten Menschen: Freundschaften, Gruppen, Szenen, Verbündete — und das, '
       + 'worauf man gemeinsam hofft.',
         'Das 11. Haus sind die gewählten Menschen: Freundschaften, Gruppen, Szenen, Verbündete — '
       + 'und das, worauf man gemeinsam hofft.'],
   aspekte:[
    ['wer in diesem Bereich wohnt — ein Freiheitsdrang dort heißt oft: viele, lose, wechselnd',
     'was deine Zuneigung berührt — das sagt etwas über die Qualität der Nähe',
     'Phasen, in denen sich der Kreis austauscht'],
    ['Aspekte auf den Herrscher des 11. Hauses',
     'Planeten im 11. Haus — Uranus dort heißt oft: viele, lose, wechselnd',
     'Aspekte auf Venus für die Qualität der Nähe',
     'Transite durch das 11. Haus: Phasen, in denen sich der Kreis austauscht']],
   streit:['In der Überlieferung ging es hier eher um Wohltäter als um Freundschaft im heutigen Sinn. '
         + 'Die moderne Lesart ist jünger, aber brauchbar.',
           'Das 11. Haus ist in der Überlieferung eher „gute Geister und Wohltäter" als „Freundschaft" '
         + 'im heutigen Sinn. Die moderne Lesart ist jünger, aber brauchbar.'] },

 { k:'partner', name:'Partnerin oder Partner', icon:'∞',
   wo:['feste Beziehungen — Verliebtsein davor, Tiefe danach',
       '7. Haus — Dating im 5., Tiefe im 8.'],
   kraft:['deine Zuneigung und dein Antrieb','Venus und Mars'],
   text:['Das verbindliche Gegenüber: Partnerschaft, aber auch feste Gegner. Davor liegt das '
       + 'Verliebtsein, danach die Tiefe.',
         'Das 7. Haus ist das verbindliche Gegenüber: Ehe, Partnerschaft, aber auch feste Gegner. '
       + 'Das 5. Haus ist das Verliebtsein davor, das 8. die Tiefe danach.'],
   aspekte:[
    ['wer deinen Bereich der festen Beziehungen verwaltet und was ihn berührt',
     'was deine Zuneigung, deinen Antrieb und dein Gefühl von außen berührt',
     'wann der Punkt gegenüber deinem Auftreten angerührt wird',
     'bei zwei Bildern: wessen Kräfte in deinem Bereich der festen Beziehungen landen'],
    ['Aspekte auf den Herrscher des 7. Hauses',
     'Aspekte auf Venus, Mars und den Mond',
     'Transite über den Deszendenten',
     'in zwei Charts: wessen Planeten im 7. Haus der anderen landen']],
   streit:['Dieser Ort beschreibt, was jemand im Gegenüber sucht — nicht, wen er bekommt.',
           'Das 7. Haus beschreibt, was jemand im Gegenüber sucht — nicht, wen er bekommt.'] },

 { k:'kinder', name:'Kinder', icon:'✧',
   wo:['Romantik, Spiel und alles Hervorgebrachte','5. Haus'],
   kraft:['dein Vertrauen, bei Nachtgeburten auch deine Zuneigung',
          'Jupiter, bei Nachtgeburten auch die Venus'],
   text:['Alles Hervorgebrachte: Kinder, Kreatives, Spiel, Freude. Derselbe Ort, dieselbe Bewegung — '
       + 'etwas entsteht und geht eigene Wege.',
         'Das 5. Haus ist alles Hervorgebrachte: Kinder, Kreatives, Spiel, Freude. Dasselbe Haus, '
       + 'dieselbe Bewegung — etwas entsteht und geht eigene Wege.'],
   aspekte:[
    ['wer diesen Bereich verwaltet und was ihn berührt',
     'wer sonst dort wohnt',
     'Phasen, in denen dieser Bereich in Bewegung kommt'],
    ['Aspekte auf den Herrscher des 5. Hauses',
     'Planeten im 5. Haus',
     'Transite durch das 5. Haus']],
   streit:['Ob jemand Kinder bekommt, lässt sich hier nicht ablesen. Wer das behauptet, richtet '
         + 'Schaden an. Das ist keine Vorsicht, das ist die Grenze der Methode.',
           'Aus dem 5. Haus lässt sich nicht ablesen, ob jemand Kinder bekommt. Wer das behauptet, '
         + 'richtet Schaden an. Das ist keine Vorsicht, das ist die Grenze der Methode.'] },

 { k:'haustier', name:'Haustiere', icon:'❀',
   wo:['Alltag und tägliche Versorgung — bei großen Tieren das Verborgene',
       '6. Haus — bei großen Tieren das 12.'],
   kraft:['dein Denken für kleine Tiere, dein Gefühl für die Bindung',
          'Merkur für kleine Tiere, Mond und Venus für die Bindung'],
   text:['In der Überlieferung gehören kleine Tiere zum Alltag und große Tiere — Pferde, Vieh — '
       + 'ins Verborgene. Der Alltagsbereich ist dabei vor allem die tägliche Versorgung: '
       + 'füttern, rausgehen, zum Tierarzt.',
         'In der Überlieferung gehören kleine Tiere ins 6. Haus und große Tiere — Pferde, Vieh — '
       + 'ins 12. Das 6. Haus ist dabei vor allem die tägliche Versorgung: füttern, Gassi, '
       + 'zum Tierarzt.'],
   aspekte:[
    ['wer in deinem Alltagsbereich wohnt und wer ihn verwaltet — das beschreibt die Art der Fürsorge',
     'was dein Gefühl berührt, für die Bindung',
     'Phasen, in denen Pflege und Alltag mehr Raum brauchen',
     'bei einem geliebten Tier zusätzlich den Bereich von Freude und Spiel ansehen'],
    ['Planeten im 6. Haus und sein Herrscher — sie beschreiben die Art der Fürsorge',
     'Aspekte auf den Mond für die Bindung',
     'Transite durch das 6. Haus: Phasen, in denen Pflege und Alltag mehr Raum brauchen',
     'bei einem geliebten Tier zusätzlich das 5. Haus ansehen']],
   streit:['Viele heutige Astrologinnen lesen ein geliebtes Haustier zusätzlich dort, wo Freude und '
         + 'Zugehörigkeit sitzen — nicht bei den Pflichten. Das ist eine moderne Erweiterung und '
         + 'keine alte Regel. Beides nebeneinander zu lesen, funktioniert gut.',
           'Viele heutige Astrologinnen lesen ein geliebtes Haustier zusätzlich im 5. Haus, weil es '
         + 'dort steht, wo Freude und Zugehörigkeit sitzen — nicht bei den Pflichten. Das ist eine '
         + 'moderne Erweiterung und keine alte Regel. Beides nebeneinander zu lesen, funktioniert gut.'] },

 { k:'kollegen', name:'Kolleginnen und Alltagsmenschen', icon:'⚒',
   wo:['Alltag und Arbeit','6. Haus'],
   kraft:['dein Denken','Merkur'],
   text:['Alle, mit denen man den Werktag teilt, ohne sie gewählt zu haben: Team, Dienstleister, '
       + 'die Leute im Laden um die Ecke.',
         'Alle, mit denen man den Werktag teilt, ohne sie gewählt zu haben: Team, Dienstleister, '
       + 'die Leute im Laden um die Ecke.'],
   aspekte:[
    ['wer in deinem Alltagsbereich wohnt und wer ihn verwaltet',
     'Phasen, in denen dort etwas in Bewegung kommt',
     'ein Antrieb dort: Reibung im Team, oft über Zuständigkeiten'],
    ['Planeten im 6. Haus und sein Herrscher',
     'Transite durch das 6. Haus',
     'Mars dort: Reibung im Team, oft über Zuständigkeiten']],
   streit:['Vorgesetzte gehören nicht hierher, sondern zur Lebensrichtung — der Unterschied ist die '
         + 'Macht, nicht die Nähe.',
           'Vorgesetzte gehören nicht hierher, sondern ins 10. Haus — der Unterschied ist die Macht, '
         + 'nicht die Nähe.'] },

 { k:'fremde', name:'Menschen aus der Ferne', icon:'➹',
   wo:['Ferne, Studium, Überzeugung','9. Haus'],
   kraft:['dein Vertrauen','Jupiter'],
   text:['Lehrerinnen, Menschen aus anderen Ländern, Mentorinnen, alles, was den eigenen Horizont '
       + 'von außen anstößt.',
         'Lehrerinnen, Menschen aus anderen Ländern, Mentorinnen, alles, was den eigenen Horizont '
       + 'von außen anstößt.'],
   aspekte:[
    ['wer in deinem Bereich der Ferne wohnt und wer ihn verwaltet',
     'was dein Vertrauen von außen berührt',
     'Zeiten, in denen Fremdes näher kommt'],
    ['Planeten im 9. Haus und sein Herrscher',
     'Aspekte auf Jupiter',
     'Transite durch das 9. Haus: Zeiten, in denen Fremdes näher kommt']],
   streit:['„Ferne" meinte ursprünglich mehr als ein paar Tagesreisen. Heute ist die Grenze unscharf.',
           '„Ferne" meinte ursprünglich mehr als ein paar Tagesreisen. Heute ist die Grenze unscharf.'] }
];

/* ── Durchgerechnete Beispiele (ab Stufe 1, erfundene Menschen) ── */
var FAELLE = [
 { name:'Beispiel A — der Abend, an dem etwas aufgeht',
   schritte:[
    ['Baustein 1','Uranus im Quadrat zur Venus, Orbis 0,4°',
     'Das Unerwartete reibt an der Zuneigung. Sehr eng — also laut.'],
    ['Baustein 2','Jupiter im 3. Haus, im Trigon zu Uranus, Orbis 0,3°',
     'Wachstum auf der Bühne der Nachrichten, fließend verbunden mit demselben Unerwarteten.'],
    ['Baustein 3','Der Mond läuft durch das 5. Haus',
     'Das Gefühl ist an diesem Tag in Romantik und Spiel unterwegs. Der Mond macht nichts Großes — er sagt, wo heute das Herz sitzt.'],
    ['Zusammen','Drei Bausteine, eine Richtung',
     'Überraschung, Nachricht und Zuneigung, alle gleichzeitig eng. Das ist genug für eine Aussage.']],
   deutung:'An diesem Abend ist der Bereich offen, in dem Zuneigung über Worte läuft. '
         + 'Es kann etwas hereinkommen, das du nicht geplant hast — eine Nachricht, ein Gespräch, '
         + 'eine Wendung. Was du tun kannst: erreichbar sein und antworten, statt zu warten.',
   nicht:'Was NICHT dasteht: von wem. Ob es eine bestimmte Person ist. Ob daraus etwas wird. '
       + 'Und ob überhaupt etwas passiert — das Fenster ist offen, mehr sagt die Methode nicht.' },

 { name:'Beispiel B — Herz offen, Akku leer',
   schritte:[
    ['Baustein 1','Neptun im Quadrat zum Mars, Orbis 0,0°',
     'Auflösung reibt genau am Antrieb. Exakt, also so laut wie es geht.'],
    ['Baustein 2','Venus läuft durch das 5. Haus',
     'Die Zuneigung ist wach und sucht. Der Wunsch ist da.'],
    ['Baustein 3','Kein Aspekt zwischen beiden',
     'Die zwei Bausteine reden nicht miteinander. Das ist der ganze Punkt.'],
    ['Zusammen','Zwei Bausteine, zwei Richtungen',
     'Das Wollen ist offen, die Kraft ist weg. Nicht ein Thema — zwei, die sich im Weg stehen.']],
   deutung:'Du willst, und du kannst gerade nicht. Das ist keine Charakterschwäche und kein Hinweis '
         + 'darauf, dass es nicht sein soll. Es ist eine Phase mit wenig Treibstoff. Was du tun kannst: '
         + 'das Fenster klein halten — ein Gespräch statt eines Abends, und erst danach entscheiden.',
   nicht:'Was NICHT dasteht: dass du nicht geliebt wirst, dass es die falsche Person ist, '
       + 'oder dass du warten sollst, bis es vorbei ist. Anhaltende Erschöpfung gehört ärztlich abgeklärt.' }
];

/* ── Quiz (ab Stufe 1) ─────────────────────────────────── */
var QUIZ = [
 { f:'Welches Haus steht für Nachrichten, kurze Wege und Geschwister?',
   a:['Das 3. Haus','Das 9. Haus','Das 11. Haus','Das 7. Haus'], r:0,
   e:'Das 3. Haus ist die nähere Umgebung: alles, was in Reichweite liegt — Nachrichten, Nachbarn, '
    + 'Geschwister, der Weg zum Bäcker. Das 9. ist das Gegenstück: die Ferne.' },

 { f:'Ein einzelner sehr enger Aspekt steht im Chart. Was folgt daraus?',
   a:['Dass das Ereignis sicher eintritt','Dass man noch mindestens einen zweiten Baustein braucht',
      'Dass man ihn ignorieren kann','Dass der Tag schlecht wird'], r:1,
   e:'Ein Baustein ist ein Wort, kein Satz. Erst wenn mehrere gleichzeitig dasselbe sagen, '
    + 'ist eine Aussage tragfähig. Enge allein reicht nicht.' },

 { f:'Wo sieht man in der Überlieferung zuerst nach, wenn es um ein Haustier geht?',
   a:['Im 5. Haus','Im 6. Haus','Im 12. Haus','Im 2. Haus'], r:1,
   e:'Kleine Tiere gehören traditionell ins 6. Haus, zusammen mit Alltag und täglicher Versorgung. '
    + 'Große Tiere ins 12. Viele moderne Astrologinnen lesen ein geliebtes Tier zusätzlich im 5. Haus — '
    + 'das ist eine Erweiterung, keine alte Regel.' },

 { f:'Eine Klientin fragt: „Meldet er sich diese Woche?" Was ist die saubere Antwort?',
   a:['Ein Datum nennen, wenn das Fenster eng genug ist',
      'Aus seinem Sternzeichen ableiten, wie er tickt',
      'Sagen, was in IHREM Chart offen ist — und dass sein Wille nicht darin steht',
      'Die Frage ablehnen'], r:2,
   e:'Das Chart der Klientin zeigt ihre Lage und ihre Bereitschaft. Über die Absicht eines anderen '
    + 'Menschen sagt es nichts. Die Frage ablehnen muss man nicht — man beantwortet sie nur ehrlich.' },

 { f:'Was bedeutet ein rückläufiger Planet für das Timing?',
   a:['Alles geht schief','Rückschau und Überprüfung statt Neustart',
      'Der Aspekt gilt nicht','Es geht doppelt so schnell'], r:1,
   e:'Rückläufigkeit ist kein Unglück. Sie verschiebt den Modus: zurückgehen, nachbessern, '
    + 'noch einmal ansehen. Was in dieser Zeit neu aufgesetzt wird, kommt oft noch einmal auf den Tisch.' }
];

window.AC_EREIG = { BAUSTEINE:BAUSTEINE, REZEPTE:REZEPTE,
                    MENSCHEN:MENSCHEN, FAELLE:FAELLE, QUIZ:QUIZ };
})();
