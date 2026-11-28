/* ── Die Worte der Praxis ─────────────────────────────────────
   Aufgabe 66, die letzte des Zuges, der am 7.11. mit
   `bereich-app.js` begann. Jeder Satz, den `praxis.html` zeigt,
   steht hier; `werkstatt-app.js` setzt ihn mit `AC_FUELL` ein und
   weiß nicht, was darin steht.

   Warum das eine Sperre ist und kein Vorsatz: Was in einer Anzeige
   steht, zieht beim Umzug in eine andere Umgebung nicht mit
   (`PRODUKT.md` Abschnitt 7). `bau-werkstatt.py` bricht ab, sobald
   `werkstatt-app.js` wieder einen Satz trägt.

   Zwei Dinge, die hier anders sind als auf den Seiten für alle:

   1. Diese Seite spricht die **Coachin** mit „du" an, nicht die
      Besucherin. „Dein eigenes Profil" ist deshalb ihr Profil und
      kein Punkt eines Geburtsbilds — `B_BEUGE` aus
      `kern/bahn-daten.js` beugt Punkte („deinem Mond") und hat hier
      nichts zu tun.

   2. Über den Menschen, mit dem sie arbeitet, steht hier **kein
      Geschlecht**. Bis zum 28.11. hieß es an sechs Stellen „Wie
      er auf andere wirkt", „Worauf er hinauswill", „Sein Bild" —
      für eine Zielgruppe, die die Seite selbst „Klient*innen" nennt
      und die überwiegend Frauen sind (`PRODUKT.md` Abschnitt 2).
      Die Seite kann das Geschlecht nicht wissen und behauptet es
      deshalb nicht. `pruefwerk.pruefe_ohne_geschlecht` hält das am
      gezeichneten Text fest. */

var WK_T = {

 /* ── Die Liste ──────────────────────────────────────────────
    Einzahl und Mehrzahl stehen als eigene Vorlagen da, nicht als
    ein Satz mit angeklebtem Wort: Eine Form, die von der Zahl
    abhängt, braucht ihre eigene Vorlage (AN_T.waage, 23.11.). */
 anzahl: {keine: 'Noch niemand, mit dem du arbeitest.',
          eine:  'Ein Mensch, mit dem du arbeitest.',
          viele: '{n} Menschen, mit denen du arbeitest.'},

 /* Die Marke einer Karte. Die Zeichen stehen hier, damit die
    Anzeige keines davon buchstabiert. */
 marke:   {asc: 'AC {z}', sonne: '☉ {z}', mond: '☽ {z}'},
 ohneBild: 'keine Geburtsdaten',
 jahre:   {eins: '{n} Jahr', viele: '{n} Jahre'},

 stand:   {eigen:  'Dein eigenes Profil',
           keine:  'Noch keine Sitzungsnotizen',
           einige: '{n} von {ganz} Sitzungen notiert'},

 /* ── Der Kopf der Einzelansicht ────────────────────────────── */
 datum:    '{tag}.{monat}.{jahr}',
 uhr:      '{std}:{min}',
 ohneGeburt: 'Keine Geburtsdaten',
 standLang: {eigen:  'Dein eigenes Profil.',
             keine:  'Noch keine Sitzungsnotizen.',
             einige: 'Notizen zu {n} von {ganz} Sitzungen.'},

 /* ── Die Sprünge ────────────────────────────────────────────
    Ziel und Beschriftung stehen zusammen, damit die Anzeige keine
    Liste von Beschriftungen mitbringt.
    Nicht `wort`: So heißt im Profil der Geburtsort, und `bau-werkstatt.py`
    sucht genau nach einem gefüllten `wort`-Feld im Quelltext. Ein
    Schlüssel, der anderswo Personendaten trägt, wird hier nicht für
    etwas anderes benutzt. */
 spruenge: [{ziel: 'dossier.html',         titel: 'Dossier'},
            {ziel: 'begleitung.html',      titel: 'Begleitung'},
            {ziel: 'uebersicht.html',      titel: 'Das Bild'},
            {ziel: 'index.html',           titel: 'Was gerade läuft'},
            {ziel: 'praxis-bereiche.html', titel: 'Lebensbereiche'}],

 /* ── Auf einen Blick ────────────────────────────────────────
    Gerechnet, nicht gedeutet: Die Zeile unter dem Wert sagt, wofür
    die Stellung im Gespräch gut ist, und nicht, was sie bedeutet. */
 blick: {
   ohne:  'Ohne Geburtsdatum, Uhrzeit und Ort lässt sich hier nichts rechnen.',
   ohneZ: 'Zu ergänzen unter Profile.',
   asc:   {l: 'Aszendent', z: 'Wie dieser Mensch auf andere wirkt'},
   sonne: {l: 'Sonne',     z: 'Worauf dieser Mensch hinauswill'},
   mond:  {l: 'Mond',      z: 'Was dieser Mensch braucht'},
   mc:    {l: 'MC',        z: 'Die öffentliche Richtung'},
   /* Eine Häufung fängt bei drei Planeten an, eine Einzahl gibt es
      hier also nicht. */
   haeufung: {l: 'Häufung', v: '{n} Planeten im {haus}. Haus'},
   herr:  {l: 'Herrscher des 1. Hauses', v: '{p} in {z}, {haus}. Haus',
           z: 'Wo das Leben hauptsächlich stattfindet'}},
 stellung:   '{z} {g} · {haus}. Haus',
 stellungMC: '{z} {g} · fällt ins {haus}. Haus',
 nurZeichen: '{z} {g}',
 grad:       '{g}°',

 /* ── Wo ihr steht ───────────────────────────────────────────
    Gelesen, nicht geschrieben: Zwei Seiten, die denselben Speicher
    bearbeiten, überschreiben sich. */
 verlauf: {mit:  'Gelesen aus der Begleitung. Geschrieben wird dort, nicht hier.',
           ohne: 'Sobald du in der Begleitung Notizen machst, stehen sie hier.'},
 sitzungen: ['Ankommen', 'Das Bild', 'Das Muster', 'Der Gewinn',
             'Die Landung', 'Abschluss'],
 ohneNotiz: '—',
 gekuerzt:  '{x} …',

 /* ── Dokumente ──────────────────────────────────────────────
    Alles, was zu einem Menschen gehört und woanders liegt. */
 dok: {leer: 'Noch nichts abgelegt.', weg: 'Entfernen',
       ohneTitel: 'Dokument'},

 /* ── Readings ───────────────────────────────────────────────
    Der Dateiname behält die Schreibung des Titels. `toLowerCase`
    auf deutschem Text ist verboten (`REGELN.md` Abschnitt 4) — bis
    zum 28.11. wurde aus „Reading Müller" hier „reading-müller". */
 reading: {ohneTitel: 'Reading', datei: 'Reading'},

 /* ── Notiz ─────────────────────────────────────────────────── */
 merk: {laeuft: '…', fertig: 'gespeichert'}
};
