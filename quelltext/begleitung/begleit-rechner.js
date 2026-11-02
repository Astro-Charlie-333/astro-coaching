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
   eindrucksvoll, eine nach dem Mond im vierten bringt mehr.

   Das ist die Vorannahme über die Frageart — und sie allein hat
   bis zum 2.11. die ganze Reihenfolge entschieden. Damit stand
   bei jedem Menschen dasselbe oben, egal was in seinem Bild
   steht, und wo zwei Zahlen gleich sind (Sonne und Mond je 1,00,
   Venus und Mars je 0,85, Uranus und Neptun je 0,55), entschied
   die Reihenfolge von BG_ANLAGEN. Die Coachin hält die oberste
   Anlage für die wichtigste dieses Menschen; dann muss sie aus
   seinem Bild kommen und nicht aus dieser Tabelle. Was die
   Tabelle noch tut, steht bei gewichte() darunter. */
var BG_GEWICHT = {
  Sonne:1.00, Mond:1.00, Merkur:0.80, Venus:0.85, Mars:0.85,
  Jupiter:0.60, Saturn:0.90, Uranus:0.55, Neptun:0.55, Pluto:0.60,
  Chiron:0.70, Lilith:0.50
};

/* Die klassische Zuordnung Widder bis Fische, wie in
   zeit/zeit-rechner.js und bereiche/bereich-rechner.js. Sie
   beantwortet eine Frage, die der Planetenname nicht beantwortet:
   Gehört dieses Feld der Anlage, die darin steht? */
var BG_HERRSCHER = ['Mars','Venus','Merkur','Mond','Sonne','Merkur',
                    'Venus','Mars','Jupiter','Saturn','Saturn','Jupiter'];

/* Die fünf Winkel, in Graden. Ohne Abschneiden: für die
   Verknüpfung zählt auch ein weiter Winkel noch ein wenig. */
var BG_WINKELGRAD = [0, 180, 90, 120, 60];

/* Reibende Winkel verlangen mehr und wiegen deshalb schwerer als
   tragende — dieselbe Gewichtung wie in bereich-rechner.js. */
var BG_REIBEND = {0:1.0, 180:1.2, 90:1.2, 120:0.8, 60:0.8};

function bgNrm(x){ x = x % 360; return x < 0 ? x + 360 : x; }

function bgHaus(P, l){ try{ return haus(P, l); }catch(e){ return null; } }

/* ── Die drei Gewichte einer Stellung ────────────────────────
   Nur das erste hat überhaupt mit dem Planetennamen zu tun, und
   auch dort entscheidet die natale Lage mit. Die anderen zwei
   kennen nur Längen.

     g  — das Grundgewicht: die Vorannahme über die Frageart,
          aufgerechnet mit dem, was die natale Lage dazu sagt.
     gv — wie dicht die Anlage im Bild mit allem anderen
          verknüpft ist. Eine Anlage, die nirgends anstößt, kommt
          im Leben leiser vor als eine, an der alles hängt.
     gs — wie weit vorn sie in ihrem Feld steht. Stetig, und
          deshalb der Platz, an dem sich zwei Anlagen zuletzt noch
          unterscheiden.

   Bleiben zwei auf allen drei gleich, unterscheidet die beiden im
   Bild nichts außer dem Namen — dann, und nur dann, entscheidet
   die natale Länge selbst. Aus der Reihenfolge von BG_ANLAGEN
   kommt die Sortierung in keinem Fall mehr. bau-begleitung.py
   prüft genau das über 1.200 erfundene Bilder. */
function gewichte(P, k, h){
  var l = P[k], zeichen = Math.floor(bgNrm(l) / 30);
  var g = BG_GEWICHT[k] || 0.5;

  /* 1) Ein Winkelfeld: was dort steht, sieht man dem Leben an.
        Person, Zuhause, feste Beziehungen, öffentliche Rolle. */
  if(h === 1 || h === 4 || h === 7 || h === 10) g += 0.35;

  /* 2) Das Feld gehört der Anlage selbst. Dann ist das Thema
        nicht zu Gast, sondern zu Hause. */
  var herr = BG_HERRSCHER[zeichen], eigen = (herr === k);
  if(eigen) g += 0.30;

  /* 3) Die Anlage herrscht über das Feld des Auftretens. Was sie
        angeht, geht den ganzen Menschen an. */
  var chartherr = (BG_HERRSCHER[Math.floor(bgNrm(P.ASC) / 30)] === k);
  if(chartherr) g += 0.40;

  /* 4) Der Herr des Feldes berührt sie im Winkel: dann hängt das
        Thema des Feldes wirklich an dieser Anlage. */
  var nahHerr = 0;
  if(!eigen && P[herr] !== undefined && P[herr] !== null){
    var ah = bgWinkelAb(l, P[herr]);
    if(ah.ab <= 6){ nahHerr = 0.25 * (1 - ah.ab / 6); g += nahHerr; }
  }

  /* gv — über alle anderen Anlagen, ohne Abschneiden. Je näher am
     Winkel, desto mehr; ein reibender Winkel wiegt schwerer. */
  var gv = 0, i;
  for(i = 0; i < BG_ANLAGEN.length; i++){
    var o = BG_ANLAGEN[i];
    if(o === k || P[o] === undefined || P[o] === null) continue;
    var A = bgWinkelAb(l, P[o]);
    gv += (BG_REIBEND[A.grad] || 1) / (1 + A.ab);
  }

  /* gs — der Grad innerhalb des Feldes. Vorn im Feld heißt: die
     Anlage gibt dem Feld den Ton, statt am Ende mitzulaufen. */
  var grad = bgNrm(l) - zeichen * 30;

  return {
    g: Math.round(g * 1e6) / 1e6,
    gv: Math.round(gv * 1e6) / 1e6,
    gs: Math.round(((30 - grad) / 30) * 1e6) / 1e6,
    grad: grad, herr: herr, eigenherr: eigen, chartherr: chartherr,
    winkelfeld: (h === 1 || h === 4 || h === 7 || h === 10),
    herrnah: nahHerr > 0
  };
}

/* Welcher der fünf Winkel liegt am nächsten, und wie weit daneben? */
function bgWinkelAb(a, b){
  var best = {grad:0, ab:180}, i;
  for(i = 0; i < BG_WINKELGRAD.length; i++){
    var W = BG_WINKELGRAD[i];
    var ab = Math.abs(((a - b - W + 540) % 360) - 180);
    if(ab < best.ab) best = {grad:W, ab:ab};
  }
  return best;
}

/* ── Welche Anlage steht in welchem Lebensfeld ──────────────── */
function stellungen(P){
  if(!P) return [];
  var out = [];
  BG_ANLAGEN.forEach(function(k){
    if(P[k] === undefined || P[k] === null) return;
    var V = C_FRAGE[k]; if(!V) return;
    var h = bgHaus(P, P[k]); if(!h) return;
    var feld = C_FELD[h-1]; if(!feld) return;
    var G = gewichte(P, k, h);
    out.push({
      anlage:k, haus:h, feld:feld, thema:V.thema,
      fragen:V.fragen.map(function(f){ return f.replace('{feld}', feld); }),
      gewicht:G.g, g:G.g, gv:G.gv, gs:G.gs, lon:bgNrm(P[k]),
      grad:G.grad, herr:G.herr, eigenherr:G.eigenherr,
      chartherr:G.chartherr, winkelfeld:G.winkelfeld, herrnah:G.herrnah
    });
  });
  out.sort(function(a,b){
    return (b.g - a.g) || (b.gv - a.gv) || (b.gs - a.gs) || (a.lon - b.lon);
  });
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
