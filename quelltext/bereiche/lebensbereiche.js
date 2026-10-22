/* ───────────────────────────────────────────────────────────────
   lebensbereiche.js — die zehn Lebensbereiche, einmal.

   Struktur, kein Satz und keine Himmelsrechnung: Schlüssel, Name
   und die Felder, die zu einem Bereich gehören. Das erste Feld ist
   das Kernfeld; es wiegt beim Rechnen doppelt.

   Diese Liste stand bis heute allein in bereich-rechner.js. Drei
   Seiten brauchen sie aber: die Bereichsseite, die Startseite und
   der Monatsbericht — der Monatsbericht rechnet nichts von der
   Bereichsseite, muss aber wissen, welche Felder zu einem Bereich
   gehören, um die Auswahl eines Menschen zu beachten. Eine zweite
   Kopie der Liste wäre genau der Fehler, den die Plattform bei der
   Himmelsrechnung schon einmal hatte: solange die Kopien gleich
   sind, fällt nichts auf, und sobald eine gepflegt wird, zeigen
   zwei Seiten verschiedene Bereiche.

   Hier steht außerdem, was eine Auswahl von Bereichen bedeutet.
   Die Regel aus PRODUKT.md Abschnitt 4: Keine Auswahl heißt alle.
   ─────────────────────────────────────────────────────────────── */
(function(){
'use strict';

/* zrk: der Bereich auf der Zeitenseite, der dasselbe Thema über
        Jahrzehnte beschreibt. Nur gesetzt, wo die Zuordnung ehrlich
        ist — sonst null, dann steht eben kein Kapitel dabei. */
var LB_BEREICHE = [
  { k:'liebe',       name:'Liebe',              haeuser:[7,5,8],  zrk:'liebe'   },
  { k:'beruf',       name:'Beruf',              haeuser:[10,6,2], zrk:'arbeit'  },
  { k:'gesundheit',  name:'Gesundheit',         haeuser:[6,1,12], zrk:'koerper' },
  { k:'geld',        name:'Geld',               haeuser:[2,8,11], zrk:null      },
  { k:'familie',     name:'Zuhause und Familie',haeuser:[4,3,10], zrk:null      },
  { k:'freunde',     name:'Freunde',            haeuser:[11,7,3], zrk:null      },
  { k:'freude',      name:'Freude und Kreativität', haeuser:[5,11,9], zrk:null  },
  { k:'selbstwert',  name:'Selbstwert',         haeuser:[1,2,10], zrk:'erfolg'  },
  { k:'sinn',        name:'Sinn und Richtung',  haeuser:[9,5,12], zrk:null      },
  { k:'umbruch',     name:'Umbruch',            haeuser:[8,12,4], zrk:'druck'   }
];

var LB_KEY = {};
(function(){ for(var i=0;i<LB_BEREICHE.length;i++) LB_KEY[LB_BEREICHE[i].k]=LB_BEREICHE[i]; })();

/* Eine gespeicherte Auswahl auf das Mögliche zurückführen:
   Unbekanntes fliegt heraus, Doppeltes auch, und die Reihenfolge
   ist immer die der Liste oben. Damit kann ein alter oder
   verdorbener Speicherstand die Seite nicht leer machen — er
   bedeutet dann eben „alle". */
function lbNormieren(ks){
  if(!ks || !ks.length) return [];
  var out = [], gesehen = {};
  for(var i=0;i<LB_BEREICHE.length;i++){
    var k = LB_BEREICHE[i].k;
    for(var j=0;j<ks.length;j++){
      if(ks[j] === k && !gesehen[k]){ out.push(k); gesehen[k]=1; }
    }
  }
  return out;
}

/* Gehört dieser Bereich zur Auswahl? Keine Auswahl heißt alle. */
function lbIstGewaehlt(k, ks){
  var n = lbNormieren(ks);
  if(!n.length) return true;
  return n.indexOf(k) >= 0;
}

/* Die Felder einer Auswahl, aufsteigend. Keine Auswahl heißt alle
   zwölf — so kann eine Seite das Ergebnis ungeprüft weiterbenutzen. */
function lbFelder(ks){
  var n = lbNormieren(ks), drin = {}, out = [], i;
  if(!n.length){
    for(i=1;i<=12;i++) out.push(i);
    return out;
  }
  for(i=0;i<n.length;i++){
    var h = LB_KEY[n[i]].haeuser;
    for(var j=0;j<h.length;j++) drin[h[j]] = 1;
  }
  for(i=1;i<=12;i++) if(drin[i]) out.push(i);
  return out;
}

function lbName(k){ return LB_KEY[k] ? LB_KEY[k].name : ''; }

window.AC_LB = {
  BEREICHE: LB_BEREICHE,
  ZAHL: LB_BEREICHE.length,
  normieren: lbNormieren,
  istGewaehlt: lbIstGewaehlt,
  felder: lbFelder,
  name: lbName,
  von: function(k){ return LB_KEY[k] || null; }
};

})();
