/* ───────────────────────────────────────────────────────────────
   planeten-rechner.js — wann die großen Zyklen eines Menschen
   wiederkommen. Gerechnet gegen rituale/engine.js (chartVon, lon,
   jdFromUT). Keine eigene Himmelsrechnung, kein Satz.

   Eine Rückkehr ist der Moment, in dem der laufende Planet wieder
   über die Stelle geht, an der er bei der Geburt stand. Wegen der
   Rückläufigkeit passiert das oft dreimal in wenigen Monaten; gezählt
   wird der erste Übergang jeder solchen Gruppe.
   ─────────────────────────────────────────────────────────────── */
var PL_JAHR = 365.25;

/* Julianisches Datum der Geburt, mit derselben Tageskorrektur wie
   chartVon in engine.js. */
function plGeburtJD(p){
  var ut = p.h + p.mi / 60 - p.tz, d = p.d;
  if(ut < 0){ ut += 24; d -= 1; }
  if(ut >= 24){ ut -= 24; d += 1; }
  return jdFromUT(p.y, p.mo, d, ut);
}

function plAbstand(a, b){ return ((a - b) % 360 + 540) % 360 - 180; }

/* Alle ersten Übergänge von Planet k über den Punkt ziel zwischen
   von und bis. Ein neuer Übergang zählt erst, wenn seit dem letzten
   mindestens `pause` Tage vergangen sind. */
function plUebergaenge(k, ziel, von, bis, pause){
  var raus = [], schritt = 4, vor = plAbstand(lon(k, von), ziel), jd = von, letzt = -1e9;
  while(jd < bis){
    var nach = plAbstand(lon(k, jd + schritt), ziel);
    if(vor <= 0 && nach > 0 && Math.abs(nach - vor) < 90){
      var a = jd, b = jd + schritt;
      for(var i = 0; i < 30; i++){
        var m = (a + b) / 2;
        if(plAbstand(lon(k, m), ziel) <= 0) a = m; else b = m;
      }
      if(a - letzt > pause){ raus.push(a); }
      letzt = a;
    }
    vor = nach; jd += schritt;
  }
  return raus;
}

/* Die Zyklen eines Profils bis zum 95. Lebensjahr. */
function plZyklen(p){
  var C = chartVon(p), jb = plGeburtJD(p), ende = jb + 95 * PL_JAHR, raus = [];
  var alter = function(jd){ return Math.floor((jd - jb) / PL_JAHR); };
  plUebergaenge('Jupiter', C.Jupiter, jb + 300, ende, 2000).forEach(function(jd, i){
    raus.push({art:'Jupiter', n:i + 1, jd:jd, alter:alter(jd)});
  });
  plUebergaenge('Saturn', C.Saturn, jb + 3000, ende, 6000).slice(0, 2).forEach(function(jd, i){
    raus.push({art:'Saturn' + (i + 1), n:i + 1, jd:jd, alter:alter(jd)});
  });
  var opp = plUebergaenge('Uranus', (C.Uranus + 180) % 360, jb + 9000, ende, 3000)[0];
  if(opp) raus.push({art:'Uranus', n:1, jd:opp, alter:alter(opp)});
  raus.sort(function(x, y){ return x.jd - y.jd; });
  return raus;
}
