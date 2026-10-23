/* ───────────────────────────────────────────────────────────────
   ich-rechner.js — was an einem Geburtsbild überhaupt auffällt.

   Warum es diese Datei gibt: Die Seite „Ich" hat bis heute zwölf
   Haustexte und zwölf Planetensätze zusammengeklebt, die beide für
   jeden Menschen gleich wahr sind. Gemessen am 23.10.: 86 von 100
   Sätzen waren bei zwei völlig verschiedenen Geburtsbildern
   wortgleich, und was sich unterschied, waren Aufzählungen von
   Fachbegriffen, keine Sätze. Eine Seite, die über jeden dasselbe
   sagt, holt niemanden ab.

   Der Rechner sucht deshalb, was an diesem einen Bild besonders
   ist. Er gibt Befunde ohne jeden Satz — die Worte stehen in
   ich-daten.js, die Anzeige in ich-app.js.

   Jeder Befund nennt einen Schlüssel für die Häufigkeitstabelle.
   Die wird beim Bauen aus Tausenden erfundener Geburtsbilder
   abgetastet, nicht geschätzt: „Das haben etwa 7 von 100 Menschen"
   ist eine gerechnete Zahl oder sie steht nicht da.
   ─────────────────────────────────────────────────────────────── */
(function(){

  var PUNKTE = ['Sonne','Mond','Merkur','Venus','Mars',
                'Jupiter','Saturn','Uranus','Neptun','Pluto'];

  function nrm2(x){ x = x % 360; return x < 0 ? x + 360 : x; }
  function hausVon(P, l){
    return ((Math.floor(nrm2(l)/30) - Math.floor(nrm2(P.ASC)/30)) % 12 + 12) % 12 + 1;
  }
  function zeichenDesHauses(P, h){
    return (Math.floor(nrm2(P.ASC)/30) + h - 1) % 12;
  }

  /* ── Wie die Anlagen auf die Felder fallen ──────────────────
     Gibt je Feld die Punkte, die darin stehen. */
  function belegung(P){
    var b = {}, i;
    for(i=0;i<PUNKTE.length;i++){
      var l = P[PUNKTE[i]];
      if(l === undefined || l === null) continue;
      var h = hausVon(P, l);
      (b[h] || (b[h] = [])).push(PUNKTE[i]);
    }
    return b;
  }

  /* ── Der Schwerpunkt ────────────────────────────────────────
     Das vollste Feld. Zwei Punkte in einem Feld hat fast jeder,
     vier hat kaum jemand — deshalb entscheidet die Zahl, wie
     stark der Befund wiegt, und die Häufigkeitstabelle sagt
     hinterher, wie selten er wirklich ist. */
  function schwerpunkt(P){
    var b = belegung(P), bestH = 0, bestN = 0, h;
    for(h in b) if(b.hasOwnProperty(h)){
      if(b[h].length > bestN || (b[h].length === bestN && +h < bestH)){
        bestN = b[h].length; bestH = +h;
      }
    }
    if(!bestH) return null;
    var leere = 0;
    for(var n=1;n<=12;n++) if(!b[n]) leere++;
    return { art:'schwerpunkt', haus:bestH, zahl:bestN,
             punkte:b[bestH].slice(), leereFelder:leere,
             schluessel:'sp' + Math.min(bestN, 5) };
  }

  /* ── Die Kette ──────────────────────────────────────────────
     Das erste Feld gehört einem Zeichen, das Zeichen einem
     Herrscher, und der steht irgendwo. Praktisch heißt das:
     Wie dieser Mensch ankommt, entscheidet sich in einem anderen
     Lebensbereich. Das ist bei jedem anders und braucht keine
     Häufigkeit — außer im seltenen Fall, dass der Herrscher im
     eigenen Feld steht. */
  function kette(P, HERR, vonHaus){
    if(!HERR) return null;
    var h = vonHaus || 1;
    var z = zeichenDesHauses(P, h), herr = HERR[z];
    if(!herr || P[herr] === undefined || P[herr] === null) return null;
    var nach = hausVon(P, P[herr]);
    return { art:'kette', vonHaus:h, herr:herr, nachHaus:nach,
             eigen:(nach === h),
             schluessel:(nach === h) ? 'kette_eigen' : null };
  }

  /* ── Die Winkel des Bildes ──────────────────────────────────
     Stand bis heute in ich-app.js, also in der Anzeige. Hier ist
     sie richtig: Die Abtastung beim Bauen braucht dieselbe
     Rechnung, und zwei Fassungen davon wären genau die Doppelung,
     die auseinanderläuft. */
  var WINKEL_ARTEN = [[0,'Konjunktion','weich'],[180,'Opposition','hart'],
                      [90,'Quadrat','hart'],[120,'Trigon','weich'],[60,'Sextil','weich']];

  function aspekte(P){
    var pts = PUNKTE.concat(['ASC','MC']), raus = [], i, j, w;
    for(i=0;i<pts.length;i++) for(j=i+1;j<pts.length;j++){
      if(P[pts[i]] === undefined || P[pts[j]] === undefined) continue;
      var d = Math.abs(nrm2(P[pts[i]] - P[pts[j]])); if(d > 180) d = 360 - d;
      for(w=0;w<WINKEL_ARTEN.length;w++){
        var W = WINKEL_ARTEN[w], o = Math.abs(d - W[0]), max = (W[0] === 60 ? 4 : 6);
        if(o <= max){ raus.push({ a:pts[i], b:pts[j], typ:W[1], art:W[2], o:o }); break; }
      }
    }
    raus.sort(function(x,y){ return x.o - y.o; });
    return raus;
  }

  /* ── Der engste Winkel ──────────────────────────────────────
     Zwei Anlagen, die sich am stärksten ins Handwerk pfuschen
     oder am stärksten zusammenarbeiten. Je genauer der Winkel,
     desto deutlicher merkt man ihn — und desto seltener ist er.
     A ist die Liste der Aspekte, wie ich-app.js sie rechnet:
     {a, b, typ, art, o}. */
  var ROLLEN_PUNKTE = { Sonne:1, Mond:1, Merkur:1, Venus:1, Mars:1,
                        Jupiter:1, Saturn:1, Uranus:1, Neptun:1, Pluto:1 };

  function engsterWinkel(A){
    if(!A || !A.length) return null;
    /* Nur Winkel zwischen zwei Anlagen — ein Winkel auf einen
       Hauspunkt beschreibt keine zwei Antriebe, die sich
       begegnen, und ergäbe keinen Satz über zwei Seiten. */
    var W = null;
    for(var i=0;i<A.length;i++){
      if(ROLLEN_PUNKTE[A[i].a] && ROLLEN_PUNKTE[A[i].b]){ W = A[i]; break; }
    }
    if(!W) return null;
    /* Die Schwellen sind an der Abtastung geeicht, nicht geraten:
       der engste von 66 Winkeln liegt fast immer unter einem Grad,
       also wäre „unter einem Grad" keine Auffälligkeit, sondern der
       Normalfall. Gemessen am 23.10.: 60 von 100 Menschen hätten
       ihn. Erst ein Viertelgrad ist wirklich selten. */
    var stufe = (W.o < 0.25) ? 'eng' : (W.o < 1.5) ? 'mittel' : 'weit';
    return { art:'winkel', a:W.a, b:W.b, typ:W.typ, hart:(W.art === 'hart'),
             orb:W.o, stufe:stufe,
             schluessel:'winkel_' + (W.art === 'hart' ? 'hart' : 'weich') + '_' + stufe };
  }

  /* ── Rückläufige Anlagen bei Geburt ─────────────────────────
     Wer mit mehreren rückläufigen Planeten geboren ist, arbeitet
     messbar oft nach innen, bevor es nach außen geht. Wie selten
     das ist, sagt die Tabelle — behauptet wird hier nichts. */
  function rueckGeburt(P, jd){
    if(typeof rueck !== 'function') return null;
    var welche = [];
    for(var i=0;i<PUNKTE.length;i++){
      var k = PUNKTE[i];
      if(P[k] === undefined || P[k] === null) continue;
      if(k === 'Sonne' || k === 'Mond') continue;
      try{ if(rueck(k, jd)) welche.push(k); }catch(e){}
    }
    return { art:'rueck', zahl:welche.length, welche:welche,
             schluessel:'rueck' + Math.min(welche.length, 6) };
  }

  /* ── Alles zusammen, das Seltenste zuerst ───────────────────
     H ist die Häufigkeitstabelle (Anteil zwischen 0 und 1 je
     Schlüssel). Ohne sie bleibt die Reihenfolge wie gebaut —
     dann fehlt nur die Einordnung, nicht der Befund.

     Ein Befund ohne Schlüssel gilt als mittel häufig: er ist
     weder selten noch alltäglich, sondern bei jedem anders. */
  function merkmale(P, jd, HERR, A, H){
    var out = [], i;
    var kandidaten = [ schwerpunkt(P), kette(P, HERR, 1),
                       engsterWinkel(A), rueckGeburt(P, jd) ];
    for(i=0;i<kandidaten.length;i++) if(kandidaten[i]) out.push(kandidaten[i]);
    for(i=0;i<out.length;i++){
      var s = out[i].schluessel;
      out[i].anteil = (s && H && typeof H[s] === 'number') ? H[s] : null;
      /* Ohne Schlüssel in die Mitte, nicht nach vorn: was nicht
         gemessen ist, darf sich nicht als selten ausgeben. */
      out[i]._rang = (out[i].anteil === null) ? 0.5 : out[i].anteil;
    }
    out.sort(function(x,y){ return x._rang - y._rang; });
    return out;
  }

  window.AC_ICH = {
    PUNKTE: PUNKTE,
    aspekte: aspekte,
    belegung: belegung,
    schwerpunkt: schwerpunkt,
    kette: kette,
    engsterWinkel: engsterWinkel,
    rueckGeburt: rueckGeburt,
    merkmale: merkmale
  };

})();
