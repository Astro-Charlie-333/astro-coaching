/* ───────────────────────────────────────────────────────────────
   bereich-rechner.js — Lebensbereiche: was läuft gerade, wie lange.
   Baut auf rituale/engine.js auf (lon, chartVon, haus, jdFromUT, datVon).
   Rechnet nichts Neues am Himmel, sondern sortiert das Vorhandene
   nach Lebensbereich und misst, wie lange es noch dauert.
   ─────────────────────────────────────────────────────────────── */
(function(){

  var TAG = 86400000;

  /* ── Bereiche ───────────────────────────────────────────────
     haeuser: Whole-Sign-Häuser, die zu diesem Bereich gehören.
              Das erste ist das Kernhaus — es wiegt doppelt.
     Die Reihenfolge der Bereiche ist die Anzeigereihenfolge.
     zrk: der Bereich auf der Zeitenseite, der dasselbe Thema über
          Jahrzehnte beschreibt. Nur gesetzt, wo die Zuordnung ehrlich
          ist — sonst null, dann steht hier eben kein Kapitel. */
  var B_BEREICHE = [
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

  /* ── Ein Blatt für alle Bereiche ──────────────────────────────
     Z und tage sind freiwillig: ohne sie rechnet die Seite nur mit
     Transiten, mit ihnen kommt das Kapitel dazu. */
  function blatt(C, jd, Z, tage){
    var V = vorgaenge(C, jd), out = [];
    for(var i=0;i<B_BEREICHE.length;i++){
      var B = B_BEREICHE[i], L = fuerBereich(V, B);
      var K = kapitel(Z, B.k, tage);
      out.push({ k:B.k, name:B.name, haeuser:B.haeuser, zrk:B.zrk,
                 laeuft:L, kapitel:K, laut:lautstaerke(L, K),
                 nurKapitel: !!(K && K.laut && lautstaerke(L, null) < 2),
                 natal:natal(C, B) });
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
    lautstaerke: lautstaerke, kapitel: kapitel, natal: natal, blatt: blatt
  };

})();
