/* ───────────────────────────────────────────────────────────────
   nd-rechner.js — die Stellen, die die sechs Bereiche und der
   Hyperfokus-Finder brauchen. Gerechnet gegen rituale/engine.js
   (chartVon, haus). Keine eigene Himmelsrechnung, kein Satz.

   Bis zum 12.11. trug nd-leitfaden.html eine eigene Kopie der
   ganzen Himmelsrechnung. Jetzt rechnet es gegen die eine.
   ─────────────────────────────────────────────────────────────── */

/* Winkelabstand zweier Längen, 0 bis 180 Grad. */
function ndAbstand(a, b){ return Math.abs(((a - b + 180) % 360 + 360) % 360 - 180); }

/* Enger Kontakt wie in der alten Seite: auf, quer oder gegenüber,
   mit 6 Grad Spielraum (quer beim Mond 5). */
function ndKontakt(a, b, querOrbis){
  var d = ndAbstand(a, b);
  return d <= 6 || Math.abs(d - 90) <= querOrbis || Math.abs(d - 180) <= 6;
}

function ndStellen(p){
  var C = chartVon(p), z = function(l){ return Math.floor(l / 30); };
  var PL = ['Sonne', 'Mond', 'Merkur', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptun', 'Pluto'];
  var h6 = [], h12 = [];
  PL.forEach(function(k){ var h = haus(C, C[k]); if(h === 12) h12.push(k); if(h === 6) h6.push(k); });
  return {
    saturnHaus:haus(C, C.Saturn), mondModus:z(C.Mond) % 3,
    merkurZ:z(C.Merkur), merkurHaus:haus(C, C.Merkur),
    mondZ:z(C.Mond), mondHaus:haus(C, C.Mond), mondNeptun:ndKontakt(C.Mond, C.Neptun, 5),
    ascZ:z(C.ASC),
    marsZ:z(C.Mars), marsHaus:haus(C, C.Mars), marsSaturn:ndKontakt(C.Mars, C.Saturn, 6),
    h6:h6, h12:h12,
    jupiterHaus:haus(C, C.Jupiter), sonneHaus:haus(C, C.Sonne)};
}
