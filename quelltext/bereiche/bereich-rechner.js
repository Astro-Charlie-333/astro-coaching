/* ───────────────────────────────────────────────────────────────
   bereich-rechner.js — Lebensbereiche: was läuft gerade, wie lange.
   Baut auf rituale/engine.js auf (lon, chartVon, haus, jdFromUT, datVon).
   Rechnet nichts Neues am Himmel, sondern sortiert das Vorhandene
   nach Lebensbereich und misst, wie lange es noch dauert.
   ─────────────────────────────────────────────────────────────── */
(function(){

  var TAG = 86400000;

  /* ── Bereiche ───────────────────────────────────────────────
     Die Liste der zehn Bereiche steht nicht hier, sondern in
     bereiche/lebensbereiche.js. Drei Seiten brauchen sie, und eine
     zweite Kopie würde genau so auseinanderlaufen wie früher die
     Himmelsrechnung. Fehlt die Datei, bleibt die Liste leer — dann
     zeigt die Seite keinen Bereich, und das fällt sofort auf,
     statt still falsch zu rechnen. */
  var B_BEREICHE = (window.AC_LB && window.AC_LB.BEREICHE) || [];

  /* ── Wanderer ───────────────────────────────────────────────
     g  = Gewicht: wie viel ein Durchgang dieses Planeten bedeutet.
     orb = Grad, bis zu dem ein Aspekt noch zählt.
     schritt = Tage pro Schritt bei der Fenstersuche (grob, dann feiner). */
  var WANDERER = [
    { k:'Pluto',   g:1.00, orb:2.5, schritt:30 },
    { k:'Neptun',  g:0.92, orb:2.5, schritt:30 },
    { k:'Uranus',  g:0.92, orb:2.5, schritt:20 },
    { k:'Saturn',  g:1.00, orb:3.0, schritt:10 },
    { k:'Jupiter', g:0.80, orb:3.0, schritt:5  },
    { k:'Mars',    g:0.55, orb:3.0, schritt:2  },
    { k:'Venus',   g:0.34, orb:2.0, schritt:1  },
    { k:'Merkur',  g:0.30, orb:2.0, schritt:1  },
    { k:'Sonne',   g:0.38, orb:2.0, schritt:1  }
  ];
  var WGEW = {}; (function(){ for(var i=0;i<WANDERER.length;i++) WGEW[WANDERER[i].k]=WANDERER[i]; })();

  /* ── Aspekte ────────────────────────────────────────────────
     art: 'zusammen' | 'leicht' | 'spannung' | 'gegenueber'
     g:   Gewicht des Aspekts */
  var ASPEKTE = [
    { w:0,   k:'konjunktion', art:'zusammen',   g:1.00 },
    { w:180, k:'opposition',  art:'gegenueber', g:0.90 },
    { w:90,  k:'quadrat',     art:'spannung',   g:0.85 },
    { w:120, k:'trigon',      art:'leicht',     g:0.62 },
    { w:60,  k:'sextil',      art:'leicht',     g:0.42 }
  ];

  /* Natale Punkte, die angesprochen werden können. */
  var ZIELE = ['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];

  function nrm(x){ x=x%360; return x<0?x+360:x; }

  /* Winkelabstand 0…180 */
  function dist(a,b){ var d=Math.abs(nrm(a-b)); return d>180?360-d:d; }

  /* Welcher Aspekt steht zwischen zwei Längen — und wie weit daneben?
     Gibt null, wenn kein Aspekt innerhalb von orb liegt. */
  function aspektVon(a, b, orb){
    var d = dist(a,b), beste=null;
    for(var i=0;i<ASPEKTE.length;i++){
      var ab = Math.abs(d - ASPEKTE[i].w);
      if(ab <= orb && (!beste || ab < beste.ab)) beste = { A:ASPEKTE[i], ab:ab };
    }
    if(!beste) return null;
    return { aspekt:beste.A.k, art:beste.A.art, grad:beste.A.w,
             ab:beste.ab, ag:beste.A.g };
  }

  /* Ist der Aspekt im Zulaufen oder im Weggehen?
     Zulaufend heißt: der Abstand wird kleiner. */
  function laufendZu(wk, natL, grad, jd){
    var d0 = Math.abs(dist(lon(wk, jd),   natL) - grad);
    var d1 = Math.abs(dist(lon(wk, jd+2), natL) - grad);
    return d1 < d0;
  }

  /* ── Fenster eines Aspekts ──────────────────────────────────
     Sucht vorwärts und rückwärts den Tag, an dem der Aspekt die
     Orb-Grenze verlässt. Erst grob in Schritten, dann auf den Tag
     genau durch Halbieren. Deckel bei 14 Jahren, damit Pluto die
     Suche nicht sprengt. */
  var DECKEL = 365.2422 * 14;

  function imOrb(wk, natL, grad, orb, jd){
    return Math.abs(dist(lon(wk, jd), natL) - grad) <= orb;
  }

  function kante(wk, natL, grad, orb, jd, richtung){
    var w = WGEW[wk], s = (w?w.schritt:5) * richtung, t = jd, letzte = jd, i = 0;
    /* grob laufen, bis der Orb verlassen ist */
    while(i++ < 4000){
      var n = t + s;
      if(Math.abs(n - jd) > DECKEL) return { jd:null, offen:true };
      if(!imOrb(wk, natL, grad, orb, n)){ letzte = t; t = n; break; }
      t = n;
      if(i === 4000) return { jd:null, offen:true };
    }
    /* fein halbieren zwischen letzte (drin) und t (draußen) */
    var a = letzte, b = t;
    for(var j=0;j<40;j++){
      var m = (a+b)/2;
      if(imOrb(wk, natL, grad, orb, m)) a = m; else b = m;
      if(Math.abs(b-a) < 0.5) break;
    }
    return { jd:a, offen:false };
  }

  /* Wann ist der Winkel genau getroffen? Das Fenster sagt von wann
     bis wann — der Höhepunkt darin stand nirgends. Genau der ist aber
     das Datum, das einen Menschen interessiert.

     Gesucht wird das Minimum des Abstands zum genauen Winkel. Weil ein
     Wanderer rückläufig werden kann, wird nicht halbiert, sondern in
     Schritten abgefahren und danach verfeinert. */
  function exaktAm(wk, natL, grad, von, bis, jd){
    var a = (von === null || von === undefined) ? jd - 400 : von;
    var b = (bis === null || bis === undefined) ? jd + 400 : bis;
    if(!(b > a)) return null;
    var schritt = Math.max(0.25, (b - a) / 260);
    var best = null, bo = 1e9, t;
    function ab(x){
      var d = nrm(lon(wk, x) - natL);
      if(d > 180) d = 360 - d;
      return Math.abs(d - grad);
    }
    for(t = a; t <= b; t += schritt){
      var o = ab(t);
      if(o < bo){ bo = o; best = t; }
    }
    if(best === null) return null;
    /* verfeinern */
    var u = best - schritt, v = best + schritt;
    for(var i = 0; i < 40; i++){
      var m1 = u + (v - u) / 3, m2 = v - (v - u) / 3;
      if(ab(m1) < ab(m2)) v = m2; else u = m1;
    }
    var e = (u + v) / 2;
    /* Nur melden, wenn der Winkel wirklich getroffen wird. Streift ein
       Wanderer nur und dreht vorher, gibt es keinen Höhepunkt. */
    return (ab(e) < 0.05) ? e : null;
  }

  function fenster(wk, natL, grad, orb, jd){
    if(!imOrb(wk, natL, grad, orb, jd)) return null;
    var v = kante(wk, natL, grad, orb, jd, -1);
    var n = kante(wk, natL, grad, orb, jd, +1);
    return { von:v.jd, bis:n.jd, vonOffen:v.offen, bisOffen:n.offen,
             tageNoch: (n.offen ? null : Math.round(n.jd - jd)),
             tageSchon:(v.offen ? null : Math.round(jd - v.jd)) };
  }

  /* ── Hausdurchgang ──────────────────────────────────────────
     Welches Haus läuft ein Planet gerade durch, und wie lange noch?
     Whole Sign: die Hausgrenze ist die Zeichengrenze. */
  function hausDurchgang(C, wk, jd){
    var l = lon(wk, jd), h = haus(C, l);
    var zEnde = (Math.floor(l/30)+1)*30;      /* nächste Zeichengrenze */
    var w = WGEW[wk], s = (w?w.schritt:5), t = jd, i=0;
    while(i++ < 4000){
      var n = t + s;
      if(n - jd > DECKEL) return { haus:h, bis:null, offen:true };
      if(haus(C, lon(wk, n)) !== h){ break; }
      t = n;
    }
    var a = t, b = t + s;
    for(var j=0;j<40;j++){
      var m=(a+b)/2;
      if(haus(C, lon(wk, m)) === h) a = m; else b = m;
      if(b-a < 0.5) break;
    }
    return { haus:h, bis:a, offen:false, rueck:rueck(wk, jd) };
  }

  /* ── Alles, was gerade läuft ────────────────────────────────
     Gibt eine flache Liste von Vorgängen. Jeder Vorgang weiß,
     welche Häuser er betrifft — darüber werden die Bereiche bedient. */
  function vorgaenge(C, jd){
    var out = [], i, j, k;

    /* 1) Aspekte auf natale Punkte */
    for(i=0;i<WANDERER.length;i++){
      var W = WANDERER[i], wl = lon(W.k, jd);
      for(j=0;j<ZIELE.length;j++){
        var zk = ZIELE[j], zl = C[zk];
        if(zl === undefined || zl === null) continue;
        /* ein Planet aspektiert sich selbst nicht sinnvoll bei 0° */
        var A = aspektVon(wl, zl, W.orb);
        if(!A) continue;
        if(W.k === zk && A.aspekt === 'konjunktion') continue;   /* Rückkehr, eigene Kategorie */
        var F = fenster(W.k, zl, A.grad, W.orb, jd);
        if(!F) continue;
        F.exakt = exaktAm(W.k, zl, A.grad, F.von, F.bis, jd);
        var naehe = 1 - (A.ab / W.orb);                          /* 0…1, 1 = exakt */
        out.push({
          form:'aspekt', wanderer:W.k, ziel:zk, zielArt:'planet',
          aspekt:A.aspekt, art:A.art, grad:A.grad, ab:A.ab,
          zu:laufendZu(W.k, zl, A.grad, jd),
          rueck:rueck(W.k, jd),
          haeuser:[ haus(C, zl) ],                               /* das Haus des berührten Punktes */
          gewicht: W.g * A.ag * (0.45 + 0.55*naehe),
          f:F
        });
      }
      /* 2) Aspekte auf die Achsen */
      var achsen = [['ASC',1],['MC',10]];
      for(k=0;k<achsen.length;k++){
        var ak = achsen[k][0], ah = achsen[k][1], al = C[ak];
        if(al === undefined || al === null) continue;
        var A2 = aspektVon(wl, al, W.orb);
        if(!A2) continue;
        var F2 = fenster(W.k, al, A2.grad, W.orb, jd);
        if(!F2) continue;
        F2.exakt = exaktAm(W.k, al, A2.grad, F2.von, F2.bis, jd);
        var n2 = 1 - (A2.ab / W.orb);
        out.push({
          form:'aspekt', wanderer:W.k, ziel:ak, zielArt:'achse',
          aspekt:A2.aspekt, art:A2.art, grad:A2.grad, ab:A2.ab,
          zu:laufendZu(W.k, al, A2.grad, jd),
          rueck:rueck(W.k, jd),
          haeuser:[ ah ],
          gewicht: W.g * A2.ag * (0.45 + 0.55*n2) * 1.1,         /* Achsen wiegen etwas mehr */
          f:F2
        });
      }
      /* 3) Hausdurchgang — nur die langsamen, sonst Rauschen */
      if(W.g >= 0.75){
        var D = hausDurchgang(C, W.k, jd);
        out.push({
          form:'durchgang', wanderer:W.k, haus:D.haus,
          haeuser:[ D.haus ], rueck:D.rueck,
          gewicht: W.g * 0.72,
          f:{ von:null, bis:D.bis, vonOffen:true, bisOffen:!!D.offen,
              tageNoch: (D.bis ? Math.round(D.bis - jd) : null), tageSchon:null }
        });
      }
    }
    return out;
  }

  /* ── Vorgänge je Bereich ────────────────────────────────────
     Ein Vorgang gehört zu einem Bereich, wenn er eines seiner
     Häuser berührt. Das Kernhaus (erstes) zählt doppelt. */
  function fuerBereich(V, B){
    var out = [];
    for(var i=0;i<V.length;i++){
      var v = V[i], best = -1;
      for(var j=0;j<v.haeuser.length;j++){
        var p = B.haeuser.indexOf(v.haeuser[j]);
        if(p >= 0 && (best < 0 || p < best)) best = p;
      }
      if(best < 0) continue;
      var faktor = (best === 0) ? 1.0 : (best === 1 ? 0.72 : 0.52);
      var c = {}; for(var s in v) if(v.hasOwnProperty(s)) c[s]=v[s];
      c.bGewicht = v.gewicht * faktor;
      c.kern = (best === 0);
      out.push(c);
    }
    out.sort(function(a,b){ return b.bGewicht - a.bGewicht; });
    /* Pro Bereich kommt jeder Wanderer nur einmal vor, mit seinem
       stärksten Auftritt. Sonst steht dieselbe Beschreibung zweimal
       untereinander — einmal als Durchgang, einmal als Aspekt. Die
       schwächeren Auftritte bleiben in blatt().alle erhalten. */
    var gesehen = {}, knapp = [];
    for(var n=0;n<out.length;n++){
      var wk = out[n].wanderer;
      if(gesehen[wk]){ out[n].verdeckt = true; continue; }
      gesehen[wk] = true;
      knapp.push(out[n]);
    }
    return knapp;
  }

  /* ── Lautstärke eines Bereichs ──────────────────────────────
     Summe der drei stärksten Vorgänge, in eine Stufe übersetzt.
     0 = still, 1 = leise, 2 = in Bewegung, 3 = viel los

     K ist das laufende Kapitel aus der Zeitenseite, falls bekannt.
     Es darf die Stufe anheben, aber nie senken: ein lautes Kapitel
     über zwanzig Jahre ist kein Grund, einen Bereich still zu nennen,
     nur weil diese Woche kein langsamer Planet daran rührt. */
  function lautstaerke(L, K){
    var s = 0;
    for(var i=0;i<Math.min(3,L.length);i++) s += L[i].bGewicht;
    /* Die Schwellen sind an der echten Verteilung geeicht — über vier
       Charts und zwanzig Jahre abgetastet — damit die vier Stufen
       auch wirklich vier verschiedene Dinge heißen und nicht die
       Hälfte aller Bereiche dasselbe sagt. Geprüft in _test-bereich.js. */
    var stufe = (s >= 1.72) ? 3 : (s >= 1.30) ? 2 : (s >= 0.68) ? 1 : 0;
    if(K && K.laut) stufe = Math.max(stufe, 2);
    return stufe;
  }

  /* ── Das laufende Kapitel eines Bereichs ────────────────────
     Z ist das Blatt von AC_ZEIT, tage die Tage seit der Geburt.
     Gibt null, wenn der Bereich kein Gegenstück dort hat oder die
     Zeitenseite nicht geladen ist. */
  function kapitel(Z, bk, tage){
    if(!Z || !Z.spuren) return null;
    var B = null;
    for(var i=0;i<B_BEREICHE.length;i++) if(B_BEREICHE[i].k === bk) B = B_BEREICHE[i];
    if(!B || !B.zrk) return null;
    var spur = Z.spuren[B.zrk];
    if(!spur || !spur.abschnitte) return null;
    var l1 = null, l2 = null;
    for(var j=0;j<spur.abschnitte.length;j++){
      var a = spur.abschnitte[j];
      if(tage >= a.von && tage < a.bis){
        l1 = a;
        for(var u=0;u<a.unter.length;u++){
          var x = a.unter[u];
          if(tage >= x.von && tage < x.bis) l2 = x;
        }
      }
    }
    if(!l1) return null;
    return { l1:l1, l2:l2, laut:!!l1.gipfel, lautJetzt:!!(l2 && l2.gipfel),
             anders: !!(l2 && (!!l1.gipfel !== !!l2.gipfel)) };
  }

  /* ── Natale Lage eines Bereichs ─────────────────────────────
     Welche natalen Planeten stehen in den Häusern des Bereichs,
     und wie voll ist er. Das ist das Dauerthema, nicht der Transit. */
  function natal(C, B){
    var drin = [], i, h;
    for(i=0;i<ZIELE.length;i++){
      var l = C[ZIELE[i]];
      if(l === undefined || l === null) continue;
      h = haus(C, l);
      if(B.haeuser.indexOf(h) >= 0) drin.push({ p:ZIELE[i], haus:h, kern:(h===B.haeuser[0]) });
    }
    drin.sort(function(a,b){ return (b.kern?1:0)-(a.kern?1:0); });
    /* Zeichen auf dem Kernhaus */
    var kh = B.haeuser[0];
    var kz = (Math.floor(C.ASC/30) + (kh-1)) % 12;
    return { planeten:drin, leer:(drin.length===0), kernHaus:kh, kernZeichen:kz };
  }


  /* ── Widersprüche in einem Bereich ──────────────────────────
     Ein Bereich zieht oft in zwei Richtungen gleichzeitig. Wer das
     verschweigt, baut einen Menschen widerspruchsfrei — und genau
     daran merkt er, dass die Seite ihn nicht meint.

     Drei Sorten, alle aus Gerechnetem. Keine wird erfunden:

       'anlage'   — zwei natale Punkte in den Feldern des Bereichs
                    stehen im harten Winkel zueinander. Das ist der
                    Widerspruch, der seit der Geburt da ist.
       'zugleich' — in diesem Bereich läuft gerade etwas Reibendes
                    und etwas Tragendes zur selben Zeit.
       'kapitel'  — das lange Kapitel und der Abschnitt darin sagen
                    Verschiedenes (kommt aus kapitel()).

     Gibt eine Liste von Befunden ohne jeden Satz; die Texte stehen
     in bereich-daten.js. Findet sich nichts, bleibt die Liste leer
     — dann sagt die Ausgabe das, statt einen Widerspruch zu
     behaupten, den die Rechnung nicht hergibt. */

  var REIBEND = { spannung:1, gegenueber:1 };
  var TRAGEND = { leicht:1 };
  var HART    = { quadrat:1, opposition:1 };
  var NAT_ORB = 6;        /* Orb für den Winkel zwischen zwei natalen Punkten */

  function widersprueche(C, B, L, K, N){
    var out = [], i, j;

    /* 1) Die Anlage selbst: zwei Punkte im Bereich, die sich
          gegenseitig im Weg stehen. Nur Paare, bei denen beide in
          den Feldern dieses Bereichs liegen — ein Winkel nach
          draußen ist kein Widerspruch dieses Bereichs. */
    var P = (N && N.planeten) || [];
    for(i=0;i<P.length;i++){
      for(j=i+1;j<P.length;j++){
        var la = C[P[i].p], lb = C[P[j].p];
        if(la === undefined || la === null || lb === undefined || lb === null) continue;
        var A = aspektVon(la, lb, NAT_ORB);
        if(!A || !HART[A.aspekt]) continue;
        out.push({ art:'anlage', aspekt:A.aspekt, ab:A.ab,
                   a:P[i], b:P[j],
                   kern:(P[i].kern || P[j].kern) });
      }
    }
    /* Der genaueste Winkel zuerst — er wiegt am meisten. */
    out.sort(function(x,y){ return x.ab - y.ab; });

    /* Zwei Paare, die zwischen denselben beiden Feldern stehen,
       sind ein Widerspruch und nicht zwei: der Satz darüber redet
       von den Stellen, nicht von den Punkten, und stünde sonst
       zweimal wörtlich gleich da. Der genaueste Winkel bleibt
       stehen und nimmt die übrigen Paare in auch mit — damit die
       Mechanik sie ab Stufe 2 trotzdem alle nennen kann. */
    var nach = [], gesehenPaar = {};
    for(i=0;i<out.length;i++){
      var pa = Math.min(out[i].a.haus, out[i].b.haus) + 'x' +
               Math.max(out[i].a.haus, out[i].b.haus);
      if(gesehenPaar[pa]){ gesehenPaar[pa].auch.push(out[i]); continue; }
      out[i].auch = [];
      gesehenPaar[pa] = out[i];
      nach.push(out[i]);
    }
    out = nach;

    /* 2) Reibend und tragend zur selben Zeit. Je Sorte der
          stärkste Vorgang; L ist schon nach Gewicht sortiert. */
    var reib = null, trag = null;
    for(i=0;i<L.length;i++){
      if(!reib && REIBEND[L[i].art]) reib = L[i];
      if(!trag && TRAGEND[L[i].art]) trag = L[i];
    }
    if(reib && trag && reib !== trag)
      out.push({ art:'zugleich', reibend:reib, tragend:trag });

    /* 3) Rahmen und Tonlage sagen Verschiedenes. */
    if(K && K.anders)
      out.push({ art:'kapitel', gipfel:!!K.laut, gipfelJetzt:!!K.lautJetzt });

    return out;
  }

  /* ── Facetten nach Geburtsbild gewichten ────────────────────
     Ein Bereich hat mehrere Seiten. Welche davon bei diesem
     Menschen vorn steht, entscheidet das Geburtsbild — nicht die
     Reihenfolge in der Textdatei.

     Gewichtet wird nur mit dem, was ohnehin schon gerechnet ist:
       · an welchem Feld des Bereichs die Facette hängt
         (Kernfeld schwerer als die beiden Nebenfelder),
       · welche der natalen Punkte, die zu dieser Facette gehören,
         im Feld der Facette stehen,
       · und welche von ihnen wenigstens irgendwo im Bereich stehen.
     Eine Facette ohne jede Besetzung behält ihr Grundgewicht; sie
     fällt also nach unten, verschwindet aber nicht. Deshalb hat
     jeder Bereich immer genug Facetten zum Anzeigen.

     facetten(N, B, liste) nimmt die schon gerechnete natale Lage
     (natal(C, B)) und gibt die Liste in neuer Reihenfolge zurück;
     jeder Eintrag bekommt g (Gewicht) und wo (an welchem Feld des
     Bereichs die Facette hängt) dazu. Texte kommen hier keine vor
     — die stehen in bereich-daten.js. */
  function facetten(N, B, liste){
    if(!liste || !liste.length || !N) return [];
    var imFeld = {}, imBereich = {}, i;
    for(i=0;i<N.planeten.length;i++){
      var x = N.planeten[i];
      imBereich[x.p] = true;
      (imFeld[x.haus] || (imFeld[x.haus] = {}))[x.p] = true;
    }
    var out = [];
    for(i=0;i<liste.length;i++){
      var F = liste[i], rang = B.haeuser.indexOf(F.haus);
      /* Kernfeld 3, zweites Feld 2, drittes Feld 1. Hängt eine
         Facette an einem Feld, das nicht zum Bereich gehört, wäre
         das ein Datenfehler — dann zählt sie als Nebenfeld. */
      var g = (rang === 0 ? 3 : rang === 1 ? 2 : 1);
      var treffer = [], auch = [];
      for(var j=0;j<(F.wer||[]).length;j++){
        var w = F.wer[j];
        if(imFeld[F.haus] && imFeld[F.haus][w]){ g += 2.5; treffer.push(w); }
        else if(imBereich[w]){ g += 1.2; auch.push(w); }
      }
      var besetzt = !!imFeld[F.haus];
      if(besetzt) g += 0.8;
      out.push({ f:F, g:Math.round(g*100)/100, wo:F.haus, besetzt:besetzt,
                 treffer:treffer, auch:auch, rang:i });
    }
    /* Gleiches Gewicht behält die Reihenfolge der Datei — damit
       dieselbe Person zweimal dasselbe Blatt sieht. */
    out.sort(function(a,b){ return (b.g - a.g) || (a.rang - b.rang); });
    return out;
  }

  /* ── Ein Blatt für alle Bereiche ──────────────────────────────
     Z und tage sind freiwillig: ohne sie rechnet die Seite nur mit
     Transiten, mit ihnen kommt das Kapitel dazu. */
  function blatt(C, jd, Z, tage){
    var V = vorgaenge(C, jd), out = [];
    for(var i=0;i<B_BEREICHE.length;i++){
      var B = B_BEREICHE[i], L = fuerBereich(V, B);
      var K = kapitel(Z, B.k, tage), N = natal(C, B);
      out.push({ k:B.k, name:B.name, haeuser:B.haeuser, zrk:B.zrk,
                 laeuft:L, kapitel:K, laut:lautstaerke(L, K),
                 nurKapitel: !!(K && K.laut && lautstaerke(L, null) < 2),
                 natal:N,
                 /* Die Widersprüche werden hier einmal gerechnet, damit
                    Überblick und Tiefgang nie verschiedene zeigen. */
                 wid:widersprueche(C, B, L, K, N) });
    }
    return { jd:jd, bereiche:out, alle:V };
  }

  window.AC_BER = {
    BEREICHE: B_BEREICHE,
    WANDERER: WANDERER,
    ASPEKTE: ASPEKTE,
    nrm: nrm, dist: dist, aspektVon: aspektVon,
    fenster: fenster, hausDurchgang: hausDurchgang,
    vorgaenge: vorgaenge, fuerBereich: fuerBereich,
    lautstaerke: lautstaerke, kapitel: kapitel, natal: natal,
    facetten: facetten, widersprueche: widersprueche, blatt: blatt
  };

})();
