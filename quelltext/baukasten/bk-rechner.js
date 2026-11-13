/* ───────────────────────────────────────────────────────────────
   bk-rechner.js — die Punkte, nach denen der Baukasten wählt.
   Gerechnet gegen rituale/engine.js (chartVon, haus). Kein Satz.
   ─────────────────────────────────────────────────────────────── */

/* Hat das Profil, was ein Geburtsbild braucht? */
function bkHatChart(p){
  return !!(p && p.y && p.mo && p.d && p.lat !== undefined && p.lat !== null && p.lon !== undefined && p.lon !== null);
}

/* Zeichen (0–11) und Element (0–3, Feuer Erde Luft Wasser) der
   Punkte, dazu, ob im 12. Haus ein persönlicher Planet steht. */
function bkStellen(p){
  var C = chartVon({y:p.y, mo:p.mo, d:p.d, h:p.h || 0, mi:p.mi || 0, tz:p.tz || 0, lat:p.lat, lon:p.lon});
  var punkt = function(l){ var z = Math.floor((((l % 360) + 360) % 360) / 30); return {z:z, el:z % 4}; };
  var h12 = ['Sonne', 'Mond', 'Merkur', 'Venus', 'Mars'].some(function(k){ return haus(C, C[k]) === 12; });
  return {Sonne:punkt(C.Sonne), Mond:punkt(C.Mond), Merkur:punkt(C.Merkur), Mars:punkt(C.Mars),
          Aszendent:punkt(C.ASC), h12:h12};
}
