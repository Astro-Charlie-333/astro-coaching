/* ── Was dein Bild trifft, und wann genau ─────────────────────
   Mandy am 29.10.:

     „welche punkte werden heute und in den tagen konkret getroffen?
      Heute ist da angeblich nichts bei mir, aber das wage ich zu
      bezweifeln."

   Sie hatte recht, und der Fehler war klein und teuer: Der
   Treffer-Abschnitt verglich den Abstand zweier Längen gegen einen
   Orbis — das findet nur Konjunktionen. Opposition, Quadrat,
   Trigon und Sextil fielen durch. An dem Tag stand ihr laufender
   Mond 0,29° von der Opposition zu ihrem Saturn entfernt, Saturn
   0,47° auf ihrer Sonne und Pluto 0,35° auf ihrem MC. Die Seite
   sagte „heute nichts".

   Diese Datei rechnet zweierlei:

     treffer()    — was gerade innerhalb des Orbis steht, alle fünf
                    Winkel, alle Punkte des Geburtsbilds.
     exakteTage() — wann ein Winkel im gesuchten Zeitraum genau
                    aufgeht. Dafür wird die Zeit abgefahren und bei
                    jedem Vorzeichenwechsel verfeinert.

   Teuer wäre es, für jeden Punkt und jeden Winkel einzeln durch die
   Zeit zu laufen. Deshalb andersherum: einmal pro Schritt die Länge
   jedes Wanderers holen, dann alle Ziele und Winkel damit
   vergleichen. Aus 300 Zeitläufen wird einer. */
(function(){
'use strict';

var BAHN_ASPEKTE = [
  {grad:0,   name:'Konjunktion', art:'hart',  gewicht:1.00},
  {grad:180, name:'Opposition',  art:'hart',  gewicht:0.95},
  {grad:90,  name:'Quadrat',     art:'hart',  gewicht:0.90},
  {grad:120, name:'Trigon',      art:'weich', gewicht:0.70},
  {grad:60,  name:'Sextil',      art:'weich', gewicht:0.50}
];

/* Die Wanderer, nach Geschwindigkeit. Der Orbis richtet sich danach,
   wie lange ein Wanderer für ein Grad braucht: Beim Mond sind 6°
   ein halber Tag, bei Pluto zwei Jahre. */
var BAHN_WANDERER = {
  Mond:   {orb:6, tempo:'schnell', g:0.30},
  Merkur: {orb:3, tempo:'schnell', g:0.45},
  Venus:  {orb:3, tempo:'schnell', g:0.50},
  Sonne:  {orb:4, tempo:'schnell', g:0.65},
  Mars:   {orb:3, tempo:'mittel',  g:0.75},
  Jupiter:{orb:3, tempo:'langsam', g:0.85},
  Saturn: {orb:3, tempo:'langsam', g:1.00},
  Uranus: {orb:2, tempo:'langsam', g:0.95},
  Neptun: {orb:2, tempo:'langsam', g:0.90},
  Pluto:  {orb:2, tempo:'langsam', g:1.00}
};

var BAHN_ZIELE = ['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn',
                  'Uranus','Neptun','Pluto','ASC','MC'];

function b360(x){ x=x%360; return x<0?x+360:x; }
function bDiff(a,b){ return ((a-b+540)%360)-180; }

/* Die Länge eines Wanderers zu einem Zeitpunkt. lon() aus engine.js
   kennt alle; Sonne und Mond gehen dort eigene Wege. */
function bLon(k, jd){
  try{ return b360(lon(k, jd)); }catch(e){ return null; }
}

/* ── Was gerade innerhalb des Orbis steht ─────────────────────
   Alle fünf Winkel, alle Punkte. `naehe` ist 1 bei exakt und 0 am
   Rand des Orbis; daraus und aus dem Gewicht des Wanderers wird
   sortiert, damit Pluto auf dem MC vor dem Mond auf Merkur steht. */
function treffer(P, jd, opt){
  opt = opt || {};
  var nurLangsam = !!opt.nurLangsam, out = [];
  Object.keys(BAHN_WANDERER).forEach(function(w){
    var W = BAHN_WANDERER[w];
    if(nurLangsam && W.tempo === 'schnell') return;
    var wl = bLon(w, jd); if(wl === null) return;
    BAHN_ZIELE.forEach(function(z){
      if(P[z] === undefined || P[z] === null) return;
      /* Ein Wanderer auf seinem eigenen Geburtsort ist eine Rückkehr
         und hat anderswo ihren Platz — hier wäre sie eine Zeile wie
         jede andere und damit untertrieben. */
      BAHN_ASPEKTE.forEach(function(A){
        var ab = Math.abs(bDiff(wl, b360(P[z] + A.grad)));
        if(ab > W.orb) return;
        var naehe = 1 - (ab / W.orb);
        out.push({
          wanderer:w, ziel:z, aspekt:A.name, art:A.art, grad:A.grad,
          ab:ab, naehe:naehe, tempo:W.tempo,
          rueckwaerts:(function(){ try{ return rueck(w, jd); }catch(e){ return false; } })(),
          gewicht: W.g * A.gewicht * (0.4 + 0.6 * naehe),
          eigen:(w === z && A.grad === 0)
        });
      });
    });
  });
  out.sort(function(a,b){ return b.gewicht - a.gewicht; });
  return out;
}

/* ── Wann ein Winkel genau aufgeht ────────────────────────────
   Die Zeit wird in Schritten abgefahren; wo der Abstand das
   Vorzeichen wechselt, liegt ein exakter Tag dazwischen und wird
   durch Halbieren eingegrenzt.

   Ein rückläufiger Wanderer überquert dieselbe Stelle bis zu
   dreimal. Das ist kein Fehler, den man wegfiltert — es sind
   wirklich drei Termine, und der mittlere fühlt sich anders an als
   die äußeren. Sie werden deshalb alle zurückgegeben und als
   Durchgang gezählt. */
function exakteTage(P, vonJD, bisJD, opt){
  opt = opt || {};
  var schritt = opt.schritt || 2;
  var welche = opt.wanderer ||
    ['Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];
  var ziele = opt.ziele || BAHN_ZIELE;
  var out = [];

  welche.forEach(function(w){
    var W = BAHN_WANDERER[w]; if(!W) return;
    /* Je Schritt einmal die Länge holen, dann alle Ziele damit
       vergleichen — nicht andersherum. */
    var zeiten = [], laengen = [], t;
    for(t = vonJD; t <= bisJD + schritt; t += schritt){
      var l = bLon(w, t); if(l === null) return;
      zeiten.push(t); laengen.push(l);
    }
    ziele.forEach(function(z){
      if(P[z] === undefined || P[z] === null) return;
      BAHN_ASPEKTE.forEach(function(A){
        var ziel = b360(P[z] + A.grad), i;
        var vor = bDiff(laengen[0], ziel);
        for(i = 1; i < zeiten.length; i++){
          var jetzt = bDiff(laengen[i], ziel);
          /* Ein Sprung über 180° ist der Rundlauf, kein Treffer. */
          if((vor < 0) !== (jetzt < 0) && Math.abs(vor) < 90 && Math.abs(jetzt) < 90){
            var lo = zeiten[i-1], hi = zeiten[i], q;
            for(q = 0; q < 34; q++){
              var m = (lo + hi) / 2;
              if((bDiff(bLon(w, m), ziel) < 0) === (vor < 0)) lo = m; else hi = m;
            }
            var genau = (lo + hi) / 2;
            if(genau >= vonJD && genau <= bisJD)
              out.push({
                wanderer:w, ziel:z, aspekt:A.name, art:A.art, grad:A.grad,
                jd:genau, tempo:W.tempo,
                rueckwaerts:(function(){ try{ return rueck(w, genau); }catch(e){ return false; } })(),
                gewicht: W.g * A.gewicht,
                eigen:(w === z && A.grad === 0)
              });
          }
          vor = jetzt;
        }
      });
    });
  });

  out.sort(function(a,b){ return a.jd - b.jd; });

  /* Mehrfachdurchgänge zusammenzählen: Wer dreimal über dieselbe
     Stelle läuft, soll das auch dastehen sehen. */
  var zaehler = {};
  out.forEach(function(x){
    var k = x.wanderer + '|' + x.ziel + '|' + x.grad;
    zaehler[k] = (zaehler[k] || 0) + 1;
  });
  var lauf = {};
  out.forEach(function(x){
    var k = x.wanderer + '|' + x.ziel + '|' + x.grad;
    lauf[k] = (lauf[k] || 0) + 1;
    x.durchgang = lauf[k];
    x.durchgaenge = zaehler[k];
  });
  return out;
}

window.AC_BAHN = {
  ASPEKTE:BAHN_ASPEKTE, WANDERER:BAHN_WANDERER, ZIELE:BAHN_ZIELE,
  treffer:treffer, exakteTage:exakteTage
};
})();
