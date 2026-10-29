/* ── Aus einem Chart werden Fragen ────────────────────────────
   Der Unterschied, um den es auf dieser ganzen Seite geht:

     Aussage: „Du hast Saturn im siebten Haus."
     Frage:   „Was hältst du in deinen verbindlichen Beziehungen
               aufrecht, das längst niemand mehr von dir verlangt?"

   Dieselbe Rechnung, aber die zweite Form ist ein Werkzeug und
   die erste eine Behauptung über einen Menschen. Diese Datei
   liefert nur die zweite.

   Drei Quellen, nach Brauchbarkeit im Gespräch sortiert:

     stellungen() — welche Anlage in welchem Lebensfeld steht.
                    Der Grundstock; davon gibt es immer welche.
     spannungen() — die engsten Winkel. Die interessantesten
                    Fragen, aber auch die, bei denen man am
                    ehesten danebenliegt.
     jetzt()      — was gerade läuft. Nicht, um es ihm zu sagen,
                    sondern um zu wissen, welche Frage diese
                    Woche leichter aufgeht.

   Keine davon gibt ein Ergebnis zurück, das man vorlesen könnte.
   Es sind Fragen. Was er nicht wiedererkennt, gilt nicht. */
(function(){
'use strict';

var BG_ANLAGEN = ['Sonne','Mond','Merkur','Venus','Mars','Jupiter',
                  'Saturn','Uranus','Neptun','Pluto','Chiron','Lilith'];

/* Wie schwer eine Stellung im Gespräch wiegt. Die persönlichen
   Anlagen zuerst: Eine Frage nach Pluto im achten Haus ist
   eindrucksvoll, eine nach dem Mond im vierten bringt mehr. */
var BG_GEWICHT = {
  Sonne:1.00, Mond:1.00, Merkur:0.80, Venus:0.85, Mars:0.85,
  Jupiter:0.60, Saturn:0.90, Uranus:0.55, Neptun:0.55, Pluto:0.60,
  Chiron:0.70, Lilith:0.50
};

function bgHaus(P, l){ try{ return haus(P, l); }catch(e){ return null; } }

/* ── Welche Anlage steht in welchem Lebensfeld ──────────────── */
function stellungen(P){
  if(!P) return [];
  var out = [];
  BG_ANLAGEN.forEach(function(k){
    if(P[k] === undefined || P[k] === null) return;
    var V = C_FRAGE[k]; if(!V) return;
    var h = bgHaus(P, P[k]); if(!h) return;
    var feld = C_FELD[h-1]; if(!feld) return;
    out.push({
      anlage:k, haus:h, feld:feld, thema:V.thema,
      fragen:V.fragen.map(function(f){ return f.replace('{feld}', feld); }),
      gewicht:BG_GEWICHT[k] || 0.5
    });
  });
  out.sort(function(a,b){ return b.gewicht - a.gewicht; });
  return out;
}

/* ── Die engsten Winkel ──────────────────────────────────────
   Nur die wirklich engen: Was über drei Grad hinausgeht, ist im
   Gespräch nicht mehr unterscheidbar von allem anderen. Und
   höchstens vier — mehr Spannungen als Sitzungen wäre eine
   Materialsammlung, keine Vorbereitung. */
function spannungen(P, hoechstens){
  if(!P || !window.C_WINKEL || !window.C_FRAGE) return [];
  var WINKEL = [{g:0,art:'weich'},{g:180,art:'hart'},{g:90,art:'hart'},
                {g:120,art:'weich'},{g:60,art:'weich'}];
  var out = [], i, j;
  for(i = 0; i < BG_ANLAGEN.length; i++){
    for(j = i+1; j < BG_ANLAGEN.length; j++){
      var a = BG_ANLAGEN[i], b = BG_ANLAGEN[j];
      if(P[a] === undefined || P[b] === undefined) continue;
      if(!C_FRAGE[a] || !C_FRAGE[b]) continue;
      WINKEL.forEach(function(W){
        var ab = Math.abs(((P[a] - P[b] - W.g + 540) % 360) - 180);
        if(ab > 3) return;
        /* Die Konjunktion ist weder hart noch weich; sie wird
           danach beurteilt, welche zwei Anlagen zusammenliegen.
           Hier reicht: Saturn oder Pluto dabei heißt hart. */
        var art = (W.g === 0)
          ? ((a === 'Saturn' || b === 'Saturn' || a === 'Pluto' || b === 'Pluto' ||
              a === 'Chiron' || b === 'Chiron') ? 'hart' : 'weich')
          : W.art;
        /* Die Du-Fassung, nicht die Überschrift: „womit er anfängt"
           in einer Frage, die ihm vorgelesen wird, wäre die falsche
           Person — und genau das stand hier am 29.10. */
        var fa = C_FRAGE[a].du, fb = C_FRAGE[b].du;
        if(!fa || !fb) return;
        out.push({
          a:a, b:b, ab:ab, art:art,
          fragen:C_WINKEL[art].map(function(f){
            return f.replace('{a}', fa).replace('{b}', fb); }),
          gewicht:(3 - ab) * ((BG_GEWICHT[a]||0.5) + (BG_GEWICHT[b]||0.5))
        });
      });
    }
  }
  out.sort(function(x,y){ return y.gewicht - x.gewicht; });
  return out.slice(0, hoechstens || 4);
}

/* ── Was gerade läuft ────────────────────────────────────────
   Nutzt denselben Rechner wie die Startseite. Hier aber nicht,
   um etwas anzukündigen, sondern um die Frage zu finden, die
   diese Woche am leichtesten aufgeht. */
function jetzt(P, jd, hoechstens){
  if(!P || !window.AC_BAHN) return [];
  var t = [];
  try{ t = AC_BAHN.treffer(P, jd, {nurLangsam:true}) || []; }catch(e){ return []; }
  /* Reihum eine andere Fassung, sonst steht dreimal dieselbe
     Frage mit drei verschiedenen Lebensfeldern darunter. */
  return t.slice(0, hoechstens || 3).map(function(x, i){
    var h = bgHaus(P, P[x.ziel]), feld = h ? C_FELD[h-1] : null;
    return {
      wanderer:x.wanderer, ziel:x.ziel, aspekt:x.aspekt, art:x.art, ab:x.ab,
      haus:h, feld:feld,
      frage: feld ? (function(){
        var v = C_JETZT.fragen[x.art];
        return (Array.isArray(v) ? v[i % v.length] : v).replace('{feld}', feld);
      })() : null
    };
  }).filter(function(x){ return !!x.frage; });
}

/* Eine Auswahl für eine einzelne Sitzung: zwei Stellungen und
   eine Spannung, wechselnd nach Sitzungsnummer, damit nicht in
   jeder Sitzung dieselben zwei Fragen oben stehen. */
function fuerSitzung(P, n){
  var st = stellungen(P), sp = spannungen(P, 4), raus = [];
  if(st.length){
    raus.push(st[(n * 2) % st.length]);
    if(st.length > 1) raus.push(st[(n * 2 + 1) % st.length]);
  }
  return {stellungen:raus, spannung:(sp.length ? sp[n % sp.length] : null)};
}

window.AC_BEGLEIT = {
  ANLAGEN:BG_ANLAGEN,
  stellungen:stellungen, spannungen:spannungen,
  jetzt:jetzt, fuerSitzung:fuerSitzung
};
})();
