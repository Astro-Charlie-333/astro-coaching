/* ───────────────────────────────────────────────────────────────
   nd-daten.js — alle Sätze, die die Anzeige auf der Seite „Anders
   verdrahtet verstehen und leben" einsetzt.

   Fünf Seiten werden eine (Schritt 5 aus ENTWURF-NEUE-SEITE.md):
   audhs-verstehen, diagnose-weg, nd-leitfaden, neurodivergente-
   astrologie und neurodivergenz-vertiefung. Was fest dasteht, steht
   im Körper; hier steht nur, was aus dem Profil gerechnet oder aus
   Eingaben zusammengesetzt wird.

   Die sechs Bereiche kommen aus nd-leitfaden.html. Dort sagte jeder
   Satz „Saturn im 4. Haus", auch auf Stufe 0. Jetzt gibt es zwei
   Register: `laie` steht immer da und nennt keine Fachbegriffe,
   `tech` steht ab Stufe 2 daneben. Jeder eingesetzte Satz endet mit
   einer Folge (REGELN.md 6d).

   Lücken heißen {name} und werden nur gefüllt.
   ─────────────────────────────────────────────────────────────── */

var ND_MODUS = ['kardinal', 'fix', 'veränderlich'];
var ND_ELEMENT = ['Feuer', 'Erde', 'Luft', 'Wasser'];

var ND_BEREICH = [
 {k:'struktur', icon:'⚙', titel:'Struktur', frage:'Welches System hält bei mir wirklich?',
  laie:'Struktur, die trägt, baust du am leichtesten im Bereich „{feld}“.',
  modus:{kardinal:'Du startest gut und verlierst die Lust. Bau Neustarts ein, statt auf Durchhalten zu setzen.',
         fix:'Der Aufbau ist bei dir zäh, das Halten dagegen leicht. Plan mehr Zeit für den Anfang ein.',
         'veränderlich':'Du brauchst Abwechslung innerhalb der Struktur. Starre Pläne scheitern bei dir an Langeweile, nicht an Disziplin.'},
  tech:'Saturn im {haus}. Haus · Mond {modus}',
  adler:'Ein gescheitertes System ist kein Charakterurteil. Frag stattdessen: Wozu war es gut, dass es nicht hielt? Oft schützt das Scheitern davor, sich festzulegen. Das ist eine Information, keine Schwäche.',
  tun:'Häng eine neue Gewohnheit an eine bestehende an, statt sie neu zu terminieren. Bei schwankender Energie ist das der Mechanismus, der am zuverlässigsten funktioniert.'},
 {k:'lernen', icon:'◈', titel:'Lernen', frage:'In welchem Format nehme ich überhaupt auf?',
  element:{Erde:'Du nimmst am besten auf, was konkret und greifbar ist, Schritt für Schritt. Abstraktes musst du dir erst übersetzen.',
           Luft:'Du brauchst erst das große Bild, dann die Details. Umgekehrt ermüdet es dich.',
           Feuer:'Du nimmst schnell und zielgerichtet auf. Bevor du zuhörst, musst du wissen, wofür etwas gut ist.',
           Wasser:'Du nimmst bildhaft und über Stimmung auf. Reine Aufzählungen rutschen durch, Geschichten bleiben.'},
  tech:'Merkur in {zeichen} · {haus}. Haus · {element}',
  adler:'Ein Format zu brauchen ist keine Sonderbehandlung. Wozu war die Anpassung gut? Meistens hat sie Konflikte vermieden und dabei jahrelang Kraft gekostet, die woanders gefehlt hat.',
  tun:'Probier eine Sache, die du verstehen musst, in drei Formaten: lesen, jemandem erzählen, aufzeichnen. Das Format, das am wenigsten anstrengt, darfst du ab jetzt einfordern.'},
 {k:'emotionen', icon:'◐', titel:'Emotionen', frage:'Warum trifft mich alles doppelt?',
  wasser:'Dein innerer Reizfilter ist durchlässig: Du nimmst Stimmungen auf, auch fremde, und hältst sie für deine.',
  sonst:'Du brauchst Sicherheit im Bereich „{feld}“. Fehlt die, steigt dein Grundpegel, und alles wird anstrengender als nötig.',
  kontakt:'Dazu ist die Grenze zwischen deinen Gefühlen und denen anderer besonders dünn, also lohnt es sich doppelt, zu fragen, wessen Gefühl gerade spricht.',
  tech:'Mond in {zeichen} · {haus}. Haus',
  techKontakt:' · enger Kontakt zu Neptun',
  adler:'Feinfühligkeit ist keine Störung, sondern ein Messinstrument mit hoher Auflösung. Wozu ist sie gut? Du merkst Dinge früh. Das Problem ist nicht das Merken, sondern dass dir niemand beigebracht hat, es zu sortieren.',
  tun:'Frag dich einmal täglich: Ist dieses Gefühl meins? Nicht analysieren, nur zuordnen. Bei vielen Menschen sinkt die Grundlast damit innerhalb von zwei Wochen spürbar.'},
 {k:'kommunikation', icon:'❋', titel:'Kommunikation', frage:'Warum werde ich so oft falsch verstanden?',
  gleich:'Wie du wirkst und wie du denkst, passt zusammen. Das erspart dir viel Übersetzungsarbeit.',
  anders:'Du wirkst anders, als du denkst. Diese Lücke überbrückst du im Gespräch selbst, und das ist ein guter Teil der Erschöpfung nach sozialen Situationen.',
  tech:'Aszendent in {asc} · Merkur in {merkur}',
  adler:'Missverstanden zu werden ist kein Beweis für Unzulänglichkeit. Wozu ist das Erklären gut? Es sichert Zugehörigkeit. Die Frage ist, bei wem du es nicht tun musst, und ob du davon genug hast.',
  tun:'Sag einmal in dieser Woche zuerst, was du brauchst, statt zu erklären, warum. Ein Satz, keine Begründung. Der Reflex, nachzuschieben, ist die eigentliche Übung.'},
 {k:'energie', icon:'▲', titel:'Energie', frage:'Warum geht mal alles und dann gar nichts?',
  element:{Feuer:'Deine Energie kommt schnell und stoßweise, also plan in Spurts statt in gleichmäßigen Blöcken.',
           Erde:'Deine Energie kommt langsam und hält dann lange, also gib dem Anlaufen mehr Zeit als dem Rest.',
           Luft:'Deine Energie hängt am geistigen Reiz, also startest du nicht, solange dich nichts interessiert.',
           Wasser:'Deine Energie folgt der Stimmung, nicht dem Plan, also hält ein Plan nur, wenn er die Stimmung mitdenkt.'},
  kontakt:'Dazu geht ein Teil deiner Kraft ins Bremsen statt ins Tun. Deshalb fühlt sich ein normaler Tag an wie anderthalb, und das ist keine Einbildung.',
  tech:'Mars in {zeichen} · {haus}. Haus',
  techKontakt:' · enger Kontakt zu Saturn',
  adler:'Schwankende Kapazität ist keine Unzuverlässigkeit. Wozu ist das Aufschieben gut? Was nicht angefangen ist, kann nicht misslingen. Das schützt, und es kostet die Erfahrung, dass es meistens gutgeht.',
  tun:'Nimm dir bewusst nur ein Fünftel vor. Fünf Minuten statt einer halben Stunde. Ziel ist nicht die Leistung, sondern die Erfahrung, dass Anfangen billig war.'},
 {k:'reize', icon:'◍', titel:'Reize', frage:'Was genau überlastet mich?',
  h12:'Ein Teil deiner Kräfte arbeitet unsichtbar: Du verbrauchst Kraft, ohne es zu bemerken, und merkst es erst, wenn nichts mehr geht.',
  h6:'Belastung sammelt sich bei dir im Alltag an, nicht in großen Ereignissen, also entlasten dich kleine Pausen mehr als ein freies Wochenende.',
  keine:'Überlastung entsteht bei dir eher aus der Situation als aus einem festen Muster. Das ist eine gute Nachricht, macht es aber schwerer vorherzusehen.',
  tech:'12. Haus: {h12} · 6. Haus: {h6}',
  leer:'leer',
  adler:'Über die Grenze zu gehen hat einen Zweck: Man muss nicht absagen und niemanden enttäuschen. Was würdest du absagen müssen, wenn du deine Grenze ernst nimmst?',
  tun:'Notier eine Woche lang jeden Tag eine Uhrzeit: den Moment, an dem es kippt. Nur die Zahl. Danach kennst du dein Muster, ohne darüber nachgedacht zu haben.'}];

/* Der Hyperfokus-Finder, aus nd-leitfaden.html. */
var ND_HF = [
 {id:'vergessen', t:'Wobei vergisst du zu essen?',
  h:'Nicht, was Spaß macht, sondern wobei die Zeit tatsächlich verschwindet. Auch wenn es peinlich klingt.',
  lab:'Dein Hyperfokus',
  folge:'Das ist die verlässlichste Spur, die du hast, verlässlicher als jedes Interessensprofil, weil sie sich nicht erfragen, nur beobachten lässt.'},
 {id:'selbst', t:'Was hast du dir beigebracht, ohne dass es jemand verlangt hat?',
  h:'Das zeigt echtes Interesse, nicht anerzogenes.',
  lab:'Selbst beigebracht',
  folge:'Was man sich ohne Auftrag aneignet, ist echtes Interesse. Und es ist meistens die Fähigkeit, die man für selbstverständlich hält.'},
 {id:'aerger', t:'Was ärgert dich so sehr, dass du es besser machen willst?',
  h:'Bei vielen anders verdrahteten Menschen ist Gerechtigkeitssinn der stärkere Antrieb als Freude.',
  lab:'Dein Ärger',
  folge:'Ärger ist ein stärkerer Antrieb als Begeisterung, weil er nicht schwankt. Zeigen Hyperfokus und Ärger auf dasselbe, hast du eine ungewöhnlich klare Richtung.'}];
var ND_HF_CHIPS = ['allein', 'mit anderen', 'am Rechner', 'mit den Händen', 'draußen', 'im Gespräch', 'im Kopf', 'strukturiert', 'chaotisch'];

/* Die Liste zum Abhaken, aus diagnose-weg.html. Der Speicherschlüssel
   bleibt derselbe, damit Häkchen, die schon gesetzt sind, bleiben. */
var ND_CHECK_SCHLUESSEL = 'ac_diagnoseweg';
var ND_CHECK = [
 ['zeugnisse', 'Alte Zeugnisse herausgesucht'],
 ['befunde', 'Frühere Befunde und Arztberichte gesammelt'],
 ['person', 'Jemanden gefragt, der mich als Kind kannte'],
 ['tagebuch', 'Zwei bis vier Wochen Tagebuch geführt'],
 ['hausarzt', 'Termin bei der Hausärztin gemacht'],
 ['ueberweisung', 'Überweisung mit klarer Fragestellung erhalten'],
 ['liste', 'Liste möglicher Stellen erstellt'],
 ['parallel', 'Überall gleichzeitig angefragt'],
 ['protokoll', 'Anrufprotokoll angelegt'],
 ['kasse', 'Bei der Krankenkasse nach Kostenerstattung gefragt'],
 ['termin', 'Termin zur Abklärung steht']];

/* Alle übrigen Wörter der Anzeige. */
var ND_TEXT = {
 profilOhne:'Mit einem Profil unter <a href="profile.html">Profile</a> steht in den sechs Bereichen, was dein Geburtsbild dazu sagt.',
 profilMit:'Gerechnet für {name}. Wechseln unter <a href="profile.html">Profile</a>.',
 bereichOhne:'Mit einem Profil steht hier, was dein Geburtsbild zu diesem Bereich sagt.',
 labBild:'Was dein Geburtsbild dazu sagt',
 labHaltung:'Die Haltung dazu',
 labSache:'Eine Sache',
 hfPlatz:'Stichworte reichen',
 hfChipsFrage:'Wie sieht es dabei aus? Mehrfach antippen: Das beschreibt die Bedingungen, unter denen es funktioniert.',
 hfFehlt:'Mindestens eine Frage beantworten',
 hfTitel:'Was daraus folgt',
 hfZitat:'„{text}“.',
 hfChipsLab:'Die Bedingungen',
 hfChipsFolge:'{liste}. Das ist der praktisch wichtigste Teil: Dieselbe Tätigkeit unter falschen Bedingungen fühlt sich an wie eine andere Tätigkeit.',
 hfBildLab:'Dein Geburtsbild dazu',
 hfBild:'Leicht fällt dir etwas im Bereich „{feldJ}“. Wirksam sein willst du im Bereich „{feldS}“. Liegt dein Hyperfokus in einem davon, ist das ein starker Hinweis. Wenn nicht, gewinnt trotzdem der Hyperfokus: Er ist gelebte Erfahrung, das Geburtsbild nur eine Rechnung.',
 hfBildTech:'Jupiter im {hj}. Haus · Sonne im {hs}. Haus',
 hfSchluss:'Und die Frage, die jetzt dran ist: Muss das ein Beruf werden? Manchmal ist die bessere Antwort nein, siehe den Hinweis darunter.',
 trenner:', '};
