/* ── Die Sätze der Seite „Jetzt" ───────────────────────────────
   Aufgabe 48 (aus Aufgabe 34 und 38). Bis zum 2026-11-09 standen
   einhundertsechzig Zeichenketten in `heute-app.js` — der Anzeige
   der Seite, die ein Mensch am häufigsten vor sich hat. Ein Satz,
   der in einer Anzeige steht, wandert beim Umzug nach Stufe 3
   nicht mit, wird beim nächsten Umbau nebenbei geändert und von
   keiner Prüfung gelesen (PRODUKT.md Abschnitt 7).

   Hier stehen sie. Die Anzeige holt sie, setzt die gerechneten
   Werte ein und zeichnet; sie schreibt keinen eigenen.

   Zwei Regeln für jede Vorlage in dieser Datei:

     Die Lücken heißen nach dem, was hineinkommt — {zeichen},
     {haus}, {bereich} —, nicht nach ihrer Nummer. Wer die Vorlage
     liest, soll den fertigen Satz vor sich sehen.

     Die Beugung von „dein" steht hier nur, wo das Hauptwort
     feststeht („dein Saturn" in der Saturnrückkehr). Wo ein Punkt
     eingesetzt wird, dessen Geschlecht erst zur Laufzeit bekannt
     ist, bildet `B_BEUGE` aus `bahn-daten.js` das Wort — sonst
     steht hier wieder „dein Venus".                             */

/* Die Zeichen. Namen, keine Fachsprache (REGELN.md 2a). */
var H_SIGNS = ['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion',
 'Schütze','Steinbock','Wassermann','Fische'];

/* Die zwölf Häuser, benannt nach dem Leben und nicht nach der
   Hausnummer. Sie erscheinen nur, wo kein Lebensbereich greift. */
var H_HAUS = ['Person und Auftreten','Wert und Besitz','Sprache und Nahbereich','Zuhause und Herkunft',
 'Ausdruck und Lust','Alltag und Körper','Partnerschaft','Tiefe und Geteiltes','Sinn und Weite',
 'Beruf und Sichtbarkeit','Gruppen und Ziele','Rückzug und Inneres'];

/* Der zweite Fall der Planeten, für „Die Stunde des Merkur endet". */
var H_GEN = {Sonne:'der Sonne',Mond:'des Mondes',Merkur:'des Merkur',Venus:'der Venus',
 Mars:'des Mars',Jupiter:'des Jupiter',Saturn:'des Saturn'};

/* Monate und Wochentage. Hier statt im Code: eine Liste, eine Stelle. */
var H_MONAT = ['Januar','Februar','März','April','Mai','Juni','Juli',
               'August','September','Oktober','November','Dezember'];
var H_WOKURZ = ['So','Mo','Di','Mi','Do','Fr','Sa'];
var H_WOLANG = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];

/* Neumond und Vollmond. Die Namen, unter denen die halbe
   Zielgruppe das Thema kennt — und die Sätze zum Ritualfenster.
   Die ausführlichen Karten dazu stehen in themen-daten.js; hier
   steht nur, was in der Terminliste auftaucht. */
var H_LUN = {
 neu:{
  name:'Neumond',
  tx:'Ein guter Zeitpunkt, in diesem Bereich etwas zu <b>beginnen</b> statt abzuschließen. '+
     'Was jetzt anfängt, hat bis zum Vollmond Zeit, sich zu zeigen.',
  mit:'Kerze, Zettel und Stift. Einen Satz aufschreiben, was bis zum Vollmond passiert sein soll.'},
 voll:{
  name:'Vollmond',
  tx:'Hier wird sichtbar, was vor zwei Wochen angelegt wurde. Ein guter Zeitpunkt, '+
     'in diesem Bereich etwas <b>abzuschließen</b> statt Neues anzufangen.',
  mit:'Eine Kerze, und etwas, das weg darf. Nicht mehr.'}};

/* ── Band 1 · Jetzt ──────────────────────────────────────────── */
var H_SEITE = {
 gruss:{nacht:'Noch wach', morgen:'Guten Morgen', tag:'Guten Tag', abend:'Guten Abend',
        zeile:'{gruss}, <em>{name}</em>.'},

 /* Wann etwas ansteht, in Kalendertagen. „Heute" und „Morgen"
    stehen groß, weil sie einen Satz anfangen; „heute" klein, weil
    es in einer Spalte steht. */
 wann:{heute:'Heute', morgen:'Morgen', uebermorgen:'Übermorgen', am:'Am {tag}'},
 heuteKlein:'heute',

 hintergrund:'Im Hintergrund liegt deine Aufmerksamkeit die nächsten zwei Tage '+
             'bei einem Thema: <b>{thema}</b>.',
 alsoDazu:'Also: {satz}',
 ohneLauf:'Dazu kommt: bis {uhr} lohnt sich nichts, was ein Ergebnis haben soll — '+
          'Angefangenes bleibt heute eher liegen.',
 techMond:'Der Mond steht in {zeichen} {grad} und läuft durch das {haus}. Haus — {name}{nachsatz}.',
 techOhneLauf:'. Mond ohne Lauf bis {uhr}',

 /* Die vier Kacheln des Maschinenraums. */
 kachel:{stunde:'Stunde', tag:'Tag', mond:'Mond', haus:'Dein Haus', bis:'bis {uhr}'},
 hausNr:'{n}. Haus',

 /* Der Aufmacher. */
 mitVor:'Dafür brauchst du',
 tunVor:'Was du tun kannst',
 langeVor:'Wie lange',
 aufRuhig:'Kein fester Termin in den nächsten Tagen',
 bisVor:'Läuft noch bis {bis}',

 /* Was oben schon ausführlich steht, wird in der Woche nur
    eingereiht. */
 stehtOben:'Steht oben, ganz am Anfang der Seite.',

 /* Der Weg zur Bereichsseite. Der Dateiname gehört zum Text und
    nicht in die Anzeige — dieselbe Regel wie in bereich-daten.js. */
 berZiel:'bereiche.html#ber-',

 /* Wer Bereiche abwählt, soll nicht glauben, dort sei Ruhe. */
 ausgeblendet:'Du siehst {zahl} von {alle} Bereichen. Die übrigen sind ausgeblendet. '+
              'Gerechnet werden sie weiter — dort kann also einiges los sein, ohne dass '+
              'du es hier siehst. Unter „Seite einstellen“ kannst du das ändern.',

 /* Ohne Profil zeigt die Seite nicht nichts, sondern den Weg dorthin. */
 ohneProfilVor:'Noch kein Profil angelegt.',
 ohneProfilLink:'Hier legst du eins an',
 ohneProfilDatei:'profile.html',
 ohneProfilNach:'— ohne Geburtszeit und Geburtsort kann diese Seite den Himmel '+
                'nicht auf dich beziehen.'};

/* ── Der Ereignisstrom ───────────────────────────────────────── */
var H_EREIGNIS = {
 stunde:{
  tt:'Die Stunde {herr} endet',
  tx:'Planetenstunden sind der kleinste Taktgeber, den die Überlieferung kennt. '+
     'Wenn du etwas unter {planet} stellen willst, ist jetzt das Fenster.',
  wo:'zauber.html|Planetenstunden heute'},

 mond:{
  tt:'Die Aufmerksamkeit wandert zu: {bereich}',
  tx:'Für die nächsten zweieinhalb Tage ist das der Bereich, in dem du am ehesten '+
     'etwas merkst. Kein großer Einschnitt — eher eine Tönung.',
  tech:'Der Mond wechselt in {zeichen} und damit in dein {haus}. Haus, {name}.',
  wo:'bereiche.html|Den Bereich ansehen'},

 lunation:{
  tt:'{art} — bei dir im Bereich {bereich}',
  tech:'{art} in {zeichen}, in deinem {haus}. Haus — {name}.',
  wo:'rituale.html|Das ganze Ritual'},

 station:{
  /* Der Name zuerst. „Es wird zäher: Kommunikation" ist dieselbe
     Information wie „Merkur wird rückläufig" — nur dass niemand
     sie wiedererkennt (REGELN.md 2a). */
  ttDirekt:'{planet} läuft wieder direkt — {bereich}',
  ttRueck:'{planet} wird rückläufig — {bereich}',
  techDirekt:'{planet} läuft wieder direkt, in deinem {haus}. Haus — {name}.',
  techRueck:'{planet} wird rückläufig, in deinem {haus}. Haus — {name}.',
  txDirekt:'Was in diesem Bereich seit Wochen zäh war, nimmt wieder Fahrt auf. '+
           'Nicht sofort, aber merklich.',
  txRueck:'In diesem Bereich wird es für eine Weile mühsamer. Nichts Neues anfangen, '+
          'was dort ohnehin hängt — überarbeiten ja.',
  inTagen:'in {n} T.',
  wo:'bereiche.html#ber-{k}|Den Bereich ansehen'},

 exakt:{
  wann:'genau',
  tt:'{bereich}: der deutlichste Tag',
  tx:'{satz} An diesem Tag steht der Winkel auf den Grad genau — davor baut '+
     'es sich auf, danach lässt es nach.',
  tech:'{wanderer} {aspekt} {ziel}, exakt',
  wo:'bereiche.html#ber-{k}|Den Bereich ansehen'}};

/* ── Band 2 · Deine Woche ────────────────────────────────────── */
var H_WOCHE = {
 leer:'Diese Woche ist nichts mit festem Termin dabei. Das kommt vor — und es '+
      'heißt, die Reihenfolge bestimmst du selbst.',
 ruhig:'Diese Woche ist ruhig: {tage} steht etwas mit festem Termin an, und nichts '+
       'davon wiegt schwer.',
 ruhigEinTag:'an einem Tag',
 ruhigTage:'an {n} Tagen',
 verteilt:'Diese Woche verteilt sich: an {n} von sieben Tagen steht etwas '+
          'mit festem Termin an, und kein Tag sticht heraus.',
 vorn:'Das Gewicht der Woche liegt vorn: {tag}. Danach wird es ruhiger.',
 hinten:'Die Woche fängt ruhig an und wird nach hinten dichter. Der schwerste '+
        'Tag ist {tag}.',
 mitte:'Der schwerste Tag der Woche ist {tag}. Davor und danach ist Platz.',
 /* Was hinter der Woche liegt, wird nicht angehängt — es wird genannt. */
 danachVor:'Danach schon in Sicht:',
 danachEintrag:'{titel} am {datum}'};

/* ── Wie lange läuft das noch ────────────────────────────────── */
var H_FENSTER = {
 jahre:'läuft noch Jahre — eine lange Welle, kein Fenster',
 mindestens:'mindestens bis {datum}',
 heute:'nur noch heute',
 morgen:'bis morgen',
 tage:'bis {datum}, noch {n} Tage',
 wochen:'noch etwa {n} Wochen, bis {datum}',
 monate:'noch etwa {n} Monate, bis {datum}'};

/* ── Band: Was gerade läuft ──────────────────────────────────── */
var H_LAUF = {
 nix:'Gerade trifft nichts Größeres auf dein Geburtsbild. Das ist der Normalfall '+
     'und kommt häufiger vor als das Gegenteil.',
 heuteGenau:'heute genau',
 morgenGenau:'morgen genau',
 genauAm:'genau am {datum}',
 genauWar:'genau war am {datum}',
 bis:'bis {datum}',
 auch:'Dasselbe wirkt gerade auch auf: {liste}',
 techDurchgang:'{wanderer} läuft durch das {haus}. Haus{rueck}',
 techRadix:'Radix-{ziel}',
 techAspekt:'{wanderer} {aspekt} {ziel}, {ab}° vom genauen Stand{zu}{rueck}',
 techRueck:', rückläufig',
 techZu:', zulaufend',
 techWeg:', weggehend',
 techWeitere:' · dazu {n} weitere mit {wanderer}'};

/* ── Die Kapazität für heute ─────────────────────────────────── */
/* Drei Stufen, und jede sagt in zwei Worten, was sie bedeutet.
   Die Beschriftung steht hier und wird nicht aus dem Schlüssel
   gebaut: toUpperCase auf deutschem Text ist dieselbe Falle wie
   toLowerCase (REGELN.md Abschnitt 4). */
var H_KAP = [
 {k:'wenig',  n:'Wenig',  u:'ein Satz'},
 {k:'mittel', n:'Mittel', u:'das Wichtigste'},
 {k:'viel',   n:'Viel',   u:'alles'}];

/* ── Was die Einstellleiste zusagt ───────────────────────────── */
var H_STELL = {
 bereicheTeil:'{n} von zehn Bereichen',
 bereicheAlle:'alle zehn Bereiche',
 kapazitaet:'heute: {k}',
 trenner:' · '};

/* Der Rechner schreibt die Aspekte klein. Im Deutschen sind das
   Substantive. Eine Liste statt einer Umschaltung: toLowerCase und
   Verwandte sind in diesem Projekt verboten, und zwar zu Recht
   (REGELN.md Abschnitt 4). */
var H_ASP = {konjunktion:'Konjunktion', opposition:'Opposition',
 quadrat:'Quadrat', trigon:'Trigon', sextil:'Sextil'};
