/* ── Was im Chart steht ───────────────────────────────────────
   Die Rechnung der Reading-Seite. Sie weiß nichts von Sätzen und
   nichts von der Anzeige: Sie liefert Schlüssel und Zahlen, die
   Worte dazu stehen in `reading-daten.js`.

   Bis zum 2026-11-27 stand das hier mitsamt den Sätzen in
   `reading-app.js`, und dazu noch dreimal verdoppelt: `nrm`,
   `chartVon` und `haus` standen Zeichen für Zeichen so auch in
   `engine.js`. Weil die Anzeige nach der Engine geladen wird, hat
   die Seite die Kopien benutzt und nicht die Engine — und sobald
   eine der beiden Fassungen sich ändert, rechnet die Seite lautlos
   anders als der Rest der Plattform. Das war Glück und keine
   Prüfung (`REGELN.md` 6f); gerechnet wird gegen die Engine
   (`REGELN.md` Abschnitt 5).

   Diese Datei zieht beim Umzug in eine andere Umgebung unverändert
   mit (`PRODUKT.md` Abschnitt 7). */
(function(){
'use strict';

/* Die Reihenfolge der Elemente und Modi über die zwölf Zeichen.
   Das sind Schlüssel, keine Worte: Wie sie auf der Seite heißen,
   steht in `R_ELEMENT[k].n` und `R_MODUS[k].n`. `bau-reading.py`
   hält beide Tafeln aneinander, damit nicht zwei Listen dieselben
   Namen führen und auseinanderlaufen. */
var ELE   = ['Feuer', 'Erde', 'Luft', 'Wasser'];
var MODUS = ['kardinal', 'fix', 'beweglich'];

/* Wie schwer ein Punkt wiegt. Die Sonne und der Mond zählen dreifach,
   die persönlichen Planeten doppelt, die langsamen einfach. */
var GEW   = {Sonne:3, Mond:3, Merkur:2, Venus:2, Mars:2, Jupiter:1.5, Saturn:1.5};
var HAUPT = ['Sonne', 'Mond', 'Merkur', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
var ALLE  = HAUPT.concat(['Uranus', 'Neptun', 'Pluto']);

/* Winkel, Name und Gewicht. Konjunktion und Opposition tragen 8°
   Orbis, die übrigen 6°. */
var ASPW = [[0, 'Konjunktion', 8], [60, 'Sextil', 4], [90, 'Quadrat', 7],
            [120, 'Trigon', 6], [180, 'Opposition', 7]];

function zeichen(l){ return Math.floor(nrm(l) / 30); }

/* Die Aspekte des Charts, der stärkste zuerst. */
function aspekte(P){
  var out = [], i, j;
  for(i = 0; i < ALLE.length; i++) for(j = i + 1; j < ALLE.length; j++){
    (function(a, b){
      var d = Math.abs(((P[a] - P[b] + 540) % 360) - 180);
      ASPW.forEach(function(w){
        var max = (w[0] === 0 || w[0] === 180) ? 8 : 6;
        var orb = Math.abs(d - w[0]);
        if(orb > max) return;
        out.push({a:a, b:b, art:w[1], orb:orb,
                  s:(max - orb) / max * w[2]
                    * ((GEW[a] || 1) + (GEW[b] || 1)) / 4});
      });
    })(ALLE[i], ALLE[j]);
  }
  out.sort(function(x, y){ return y.s - x.s; });
  return out;
}

/* Wie viel Gewicht auf jedem Element und jedem Modus liegt. */
function bilanz(P){
  var e = {}, m = {}, g = 0;
  ELE.forEach(function(k){ e[k] = 0; });
  MODUS.forEach(function(k){ m[k] = 0; });
  HAUPT.concat(['ASC']).forEach(function(k){
    var w = (k === 'ASC') ? 2 : (GEW[k] || 1), z = zeichen(P[k]);
    e[ELE[z % 4]] += w; m[MODUS[z % 3]] += w; g += w;
  });
  return {e:e, m:m, g:g};
}

/* Welche Lebensbereiche mehrfach besetzt sind, der vollste zuerst.
   Die Schwelle liegt bei drei Punkten. */
var SCHWELLE = 3;
function betont(P){
  var z = {};
  HAUPT.forEach(function(k){ var h = haus(P, P[k]); z[h] = (z[h] || 0) + 1; });
  return Object.keys(z).filter(function(h){ return z[h] >= SCHWELLE; })
    .map(function(h){ return {h:+h, n:z[h]}; })
    .sort(function(a, b){ return b.n - a.n; });
}

window.AC_RDR = {
  ELE:ELE, MODUS:MODUS, HAUPT:HAUPT, SCHWELLE:SCHWELLE,
  zeichen:zeichen, aspekte:aspekte, bilanz:bilanz, betont:betont
};
})();
