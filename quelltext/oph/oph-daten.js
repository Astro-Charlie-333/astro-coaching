/* Astro-Charlie · Ophiuchus — die Texte.
   Hier stehen nur Worte. Nichts rechnet, nichts zeigt an.

   Bis zum 2026-11-26 standen diese fünfundsechzig Zeichenketten in
   `oph-app.js` zwischen den Schleifen, die sie zusammenkleben. Das
   war die letzte der Anzeigen aus Aufgabe 34, die noch so gebaut
   war. `PRODUKT.md` Abschnitt 7 verlangt, dass Texte nichts vom
   Himmel wissen und beim Umzug in eine andere Umgebung unverändert
   mitwandern; `bau-oph.py` hält das jetzt als Riegel.

   Eingesetzt wird mit `AC_FUELL` aus `kern/fuellen.js` — eine Lücke
   ohne Wert bricht dort ab statt zu verschwinden (Aufgabe 94).
   „dein" bildet `B_BEUGE` aus `kern/bahn-daten.js`, die eine Stelle,
   die das Geschlecht des Punktes kennt (Aufgabe 38). Eine Zahl wird
   zu Text über `AC_KOMMA` — deutsche Zahlen tragen ein Komma
   (`REGELN.md` Abschnitt 4).

   ── Die Zeichen stehen einmal ──────────────────────────────────
   Vorher standen die zwölf Zeichennamen zweimal von Hand in dieser
   Anzeige: als `ZN` und noch einmal in `Z13`, wo nur ein
   dreizehnter Name dazwischengeschoben ist. Zwölf der dreizehn
   Wörter waren Zeichen für Zeichen gleich — dieselbe Lage wie bei
   `mundart` und `P0` am 2026-11-25: Gedruckt hat die Seite beide
   Male dasselbe, und gemerkt hätte es niemand, sobald eine der
   beiden sich ändert.

   Deshalb steht die Reihe hier genau einmal, und die dreizehnte
   Einteilung entsteht daraus: `OP_DREIZEHN` sagt nur, welcher Name
   an welcher Stelle dazukommt. */
(function(){
'use strict';

/* Die zwölf Zeichen, in der Reihenfolge ab Frühlingspunkt.
   `bau-oph.py` hält diese Reihe gegen SIGNS in der Engine, die
   dieselben Namen führt — zwei Tafeln, die auseinanderlaufen
   können, sind kein Zustand, sondern ein Fund von morgen. */
var ZEICHEN = ['Widder', 'Stier', 'Zwillinge', 'Krebs', 'Löwe', 'Jungfrau',
               'Waage', 'Skorpion', 'Schütze', 'Steinbock', 'Wassermann',
               'Fische'];

/* Dreizehn gleiche Abschnitte: derselbe Kreis, ein Name mehr.
   `stelle` ist der Platz, an dem der Schlangenträger einsortiert
   wird — zwischen Skorpion und Schütze, dort läuft die Sonne
   tatsächlich durch ihn. */
var DREIZEHN = {name: 'Schlangenträger', stelle: 8};

var PUNKTE = ['Sonne', 'Mond', 'Merkur', 'Venus', 'Mars', 'Jupiter',
              'Saturn', 'Uranus', 'Neptun', 'Pluto'];

var OP_T = {

 /* ── Die Spannen der dreizehn ───────────────────────────── */
 spanneTage:  '{tage} Tage',
 /* Welche beiden Sternbilder der Satz vergleicht, steht neben dem
    Satz und nicht in der Anzeige. Vorher schlug die Anzeige
    „Jungfrau" und „Skorpion" nach, und der Satz nannte sie — zwei
    Stellen für eine Entscheidung (REGELN.md 6f). */
 spanneBezug: {gross: 'Jungfrau', klein: 'Skorpion'},
 spanneSatz:  'Jungfrau nimmt <b>{ju} Grad</b> der Ekliptik ein, Skorpion '
            + '<b>{sk} Grad</b>. Die Sonne braucht für die Jungfrau {jut} Tage '
            + 'und für den Skorpion {skt}. Der Schlangenträger liegt mit '
            + '{op} Grad dazwischen — er ist keineswegs der kleinste.',

 /* ── Die Tabelle der vier Systeme ───────────────────────── */
 spalten:     ['Tropisch', 'Siderisch', 'Sternbild', '13 gleich'],
 breite:      '{vz}{grad}° Breite',
 ohne:        '—',
 tabelleSatz: 'Die Spalte <b>Tropisch</b> ist die, mit der die ganze Plattform '
            + 'rechnet. Die Mondbreite rechnet die Engine nicht mit, deshalb '
            + 'steht beim Mond die Sternbildzuordnung nur näherungsweise — er '
            + 'kann bis zu fünf Grad neben der Ekliptik stehen.',

 /* ── Der Aufmacher über dem eigenen Chart ───────────────── */
 /* Ohne Namen im Profil steht hier die Anrede, nicht eine Lücke. */
 ohneName:    'Du',
 istOphKopf:  '{name} wäre tatsächlich Schlangenträger.',
 istOph:      'Die Sonne steht bei {name} auf {grad} — tropisch also '
            + '<b>{trop}</b>, und genau dort liegt heute das Sternbild '
            + 'Schlangenträger. Das ist einer der wenigen Fälle, in denen der '
            + 'Unterschied einen eigenen Namen bekommt.',
 normalKopf:  'Die Sonne steht tropisch in {trop} — und vor dem Sternbild {stb}.',
 normal:      'Das ist der normale Fall: Durch die Präzession liegt das '
            + 'Sternbild rund ein Zeichen hinter dem tropischen Zeichen '
            + 'zurück. Bei {name} bedeutet das <b>{trop}</b> tropisch, '
            + '<b>{sid}</b> siderisch und das Sternbild <b>{stb}</b>.',
 ophAnders:   'Vor dem Schlangenträger steht bei {name} dafür: <b>{liste}</b>. '
            + 'Wer den Schlangenträger ernst nehmen will, müsste genau das tun '
            + '— nicht nur die Sonne anschauen.',
 ophLeer:     'Kein einziger Planet von {name} steht vor dem Schlangenträger. '
            + 'Das Sternbild wäre in diesem Chart schlicht nicht besetzt.',

 /* ── Das Band: 43 statt 13 ──────────────────────────────── */
 bandKopf:    'Dreizehn stimmt nur für die Sonne',
 band:        'Ein Tierkreis ist ein <b>Band</b>, keine Linie. Die Sonne läuft '
            + 'exakt auf der Ekliptik, deshalb trifft sie genau dreizehn '
            + 'Sternbilder. Alle anderen Planeten laufen daneben — Pluto bis zu '
            + 'siebzehn Grad. Zählt man die Sternbilder im Band von zwanzig Grad '
            + 'um die Ekliptik, sind es nicht dreizehn, sondern <b>{anzahl}</b>.',
 bandAuf:     'In diesem Chart betrifft das konkret:',
 bandZeile:   '<b>{punkt}</b> steht nicht vor {auf}, sondern vor <b>{stb}</b> — '
            + 'weil er {grad} Grad {richtung} der Ekliptik steht.',
 nordlich:    'nördlich',
 suedlich:    'südlich',
 bandOhne:    'In diesem Chart stehen zufällig alle Planeten nah genug an der '
            + 'Ekliptik, dass die Zuordnung mit der Sonnenreihe übereinstimmt. '
            + 'Das ist die Ausnahme, nicht die Regel.',
 bandListe:   'Die vollständige Liste dessen, was Planeten tatsächlich '
            + 'durchqueren können: {liste}. Ein Tierkreis daraus wäre kein '
            + 'Kreis mehr, sondern eine Landkarte.',

 /* ── Die Oberfläche ─────────────────────────────────────── */
 wahlKopf:    'Chart',
 wahlEigen:   ' (ich)',
 leerKopf:    'Noch kein Chart angelegt.',
 /* „deiner Mama" steht hier und nicht in der Anzeige: ein Text
    gehört in die Texte, auch wenn kein Punktname dahinter steht,
    für den B_BEUGE zuständig wäre. */
 leer:        'Unter <a href="profile.html">Profile</a> Geburtsdaten eintragen '
            + '— auch die von deiner Mama oder deiner Cousine. Dann steht hier, '
            + 'was sich bei ihnen ändert.',

 /* ── Der Absatz zum Kopieren ────────────────────────────── */
 /* `{sonne}` setzt B_BEUGE ein: „deine Sonne" ist weiblich, und das
    weiß die Tabelle in kern/bahn-daten.js, nicht dieser Satz.

    „Dein Chart" bleibt dagegen ausgeschrieben, und das ist kein
    Versehen: B_BEUGE ist für „dein" vor einem Punkt des Geburtsbilds
    da, dessen Geschlecht die Tafel kennt. „Chart" ist keiner, und am
    Satzanfang steht es groß — wer die gebeugte Form hier
    hineinzwingt, braucht hinterher eine Ersetzung, die aus ihr
    wieder einen Satzanfang macht. Genau die steht in `wortwahl.js`
    und ist der Grund für Aufgabe 65. Ein Text in der Textdatei darf
    „dein" schreiben; nur die Anzeige darf es nicht. */
 antwort:     'Ja, die Sonne läuft wirklich durch dreizehn Sternbilder — das '
            + 'stimmt. Aber Sternzeichen sind keine Sternbilder. Sie sind zwölf '
            + 'gleiche Abschnitte des Sonnenjahres, gezählt ab dem '
            + 'Frühlingsanfang. Das war schon bei den Babyloniern so, und die '
            + 'wussten, dass die Sternbilder anders liegen. Wenn du wissen '
            + 'willst, in welchem {betont} {sonne} steht — das kann ich dir '
            + 'ausrechnen, das ist eine andere und auch spannende Frage. '
            + 'Dein Chart ändert es nicht.',
 /* Dasselbe Wort einmal: Auf der Seite steht es kursiv, in der
    Zwischenablage ohne Auszeichnung. Bis zum 2026-11-26 stand der
    ganze Absatz dafür zweimal — einmal im Körper, einmal als
    `ANTWORT` in der Anzeige. */
 betont:      'Sternbild',
 zitat:       '„{text}“',
 /* Das Hauptwort als Punkt, damit B_BEUGE die Form bildet. */
 punkt:       {sonne: {g: 'w', wort: 'Sonne'}},
 kopiert:     'Kopiert.',

 /* ── Die Quellen ────────────────────────────────────────── */
 quellen:     'Sternbildgrenzen: Eugène Delporte für die IAU, 1930. Zur '
            + 'Entstehung der zwölf Zeichen um 400 v.u.Z. und zu den '
            + 'Medienberichten von 1995, 2011 und 2016: '
            + '<a href="https://en.wikipedia.org/wiki/Zodiac" target="_blank" '
            + 'rel="noopener">Übersicht zum Tierkreis</a>. Die Rechnung auf '
            + 'dieser Seite wurde gegen die Bibliothek PyEphem geprüft — Sonne '
            + '2000 von 2000 Stichproben zwischen 1930 und 2040 korrekt, '
            + 'Planeten 97,5 Prozent (die Abweichungen liegen im Rastermaß von '
            + 'einem Grad direkt an Sternbildgrenzen).'
};

window.AC_OPHT = {
  T: OP_T,
  ZEICHEN: ZEICHEN,
  DREIZEHN: DREIZEHN,
  PUNKTE: PUNKTE,
  /* Die dreizehn Namen entstehen aus den zwölf — nicht daneben. */
  dreizehn: function(){
    var r = ZEICHEN.slice();
    r.splice(DREIZEHN.stelle, 0, DREIZEHN.name);
    return r;
  }
};
})();
