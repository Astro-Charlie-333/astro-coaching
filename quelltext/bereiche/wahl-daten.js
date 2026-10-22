/* ───────────────────────────────────────────────────────────────
   wahl-daten.js — alle Sätze der Bereichsauswahl.

   Hier steht jeder Satz vollständig. In wahl-app.js steht keiner:
   eine Lücke heißt {zahl} und wird gefüllt, nie erweitert. Das ist
   dieselbe Regel wie im Monatsbericht und sie wird beim Bauen
   geprüft.

   Kein Fachwort. Die Auswahl ist das Erste, was ein Mensch auf der
   Seite anfasst — sie muss auf Stufe 0 verständlich sein.
   ─────────────────────────────────────────────────────────────── */
(function(){
'use strict';

window.AC_WAHL_TEXT = {

  /* Die Leiste selbst */
  lab:   'Deine Bereiche',
  alleKnopf: 'Alle zehn',

  /* Was die Leiste über den eigenen Zustand sagt. Der zweite Satz
     ist der wichtige: eine ausgeblendete Sache sieht auf einer
     Seite genauso aus wie eine stille, und das wäre eine stille
     Übertreibung zugunsten der Seite. */
  alle: 'Du siehst alle zehn Lebensbereiche. Tipp einen an, wenn dich '
      + 'nur ein Teil davon interessiert — die Auswahl gilt dann '
      + 'überall, nicht nur hier.',

  auswahl: 'Du siehst {zahl} von zehn Bereichen. Die übrigen sind '
         + 'ausgeblendet, nicht ruhig — sie werden weiter gerechnet, '
         + 'nur nicht gezeigt.'
};

})();
