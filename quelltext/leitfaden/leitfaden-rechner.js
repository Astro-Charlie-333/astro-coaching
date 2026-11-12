/* ───────────────────────────────────────────────────────────────
   leitfaden-rechner.js — die vier Stellen, die die Seite für ein
   Profil braucht. Gerechnet gegen rituale/engine.js (chartVon,
   nodeLon, jdFromUT). Keine eigene Himmelsrechnung, kein Satz.

   Der Südknoten ist der mittlere Knoten plus 180 Grad, wie überall
   auf der Plattform.
   ─────────────────────────────────────────────────────────────── */
function lfGeburtJD(p){
  var ut = p.h + p.mi / 60 - p.tz, d = p.d;
  if(ut < 0){ ut += 24; d -= 1; }
  if(ut >= 24){ ut -= 24; d += 1; }
  return jdFromUT(p.y, p.mo, d, ut);
}

/* Zeichen (0–11) von Mond, Merkur, Mars und Südknoten, dazu die
   Längen für die Fachzeile. */
function lfStellen(p){
  var C = chartVon(p), T = (lfGeburtJD(p) - 2451545) / 36525;
  var sk = ((nodeLon(T) + 180) % 360 + 360) % 360;
  var z = function(l){ return Math.floor(l / 30); };
  return {Mond:z(C.Mond), Merkur:z(C.Merkur), Mars:z(C.Mars), Suedknoten:z(sk), suedknotenLaenge:sk};
}
