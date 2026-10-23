/* ───────────────────────────────────────────────────────────────
   tief-bauer.js — der Tiefgang zu einem Lebensbereich, als Text.

   Die Seite zeigt den Überblick: was los ist, was du tun kannst,
   wie lange es läuft. Der Tiefgang ist dieselbe Rechnung, zu Ende
   geschrieben — dazu die natale Herkunft, alle Facetten, die
   Widersprüche und die Fragen zum Darübersprechen.

   Und er geht als Datei heraus, nicht als Teil der Seite.

   Der Grund steht in PRODUKT.md Abschnitt 4: Dies ist eine
   statische Seite ohne Server. Alles, was im Quelltext steht, kann
   jeder lesen. Ein Tiefgang hinter einem Schalter wäre deshalb
   nicht verkauft, sondern verschenkt — und der Schalter eine Lüge.
   Der Tiefgang entsteht stattdessen auf dem Gerät, aus den Daten,
   die dort liegen, und gehört dem Menschen, der ihn anfordert.

   Diese Datei steckt nur zusammen. Sie rechnet nichts (das tut
   bereich-rechner.js) und sie formuliert nichts (das steht in
   bereich-daten.js). Deshalb darf hier kein Satz stehen; der Bau
   prüft das. Die Sätze, die auch der Überblick braucht, stehen
   hier, damit sie nicht zweimal im Projekt liegen — der Überblick
   holt sie über AC_TIEF.

   Die Mechanik wandert nur in den Tiefgang, wenn der Wissensstand
   mindestens 2 ist. Auf Stufe 0 ist auch die Datei frei von
   Fachsprache: ein Versprechen, das die Seite hält und die Datei
   bricht, ist keines.
   ─────────────────────────────────────────────────────────────── */
(function(){

  function bD(){ return window.AC_BDAT; }
  function F(){ return bD().FORM; }

  /* ── Hilfen ─────────────────────────────────────────────────── */
  function fuellen(form, werte){
    var s = String(form || '');
    for(var k in werte) if(werte.hasOwnProperty(k))
      s = s.split('{' + k + '}').join(String(werte[k]));
    return s;
  }
  function komma(x){ return String(x).replace('.', ','); }

  /* Eine Zeile unterstreichen, damit der Text ohne Auszeichnung
     eine Gliederung hat. */
  function strich(n){
    var s = '', i;
    for(i=0;i<n;i++) s += '─';
    return s;
  }
  function kapitel(t){ return '\n' + t + '\n' + strich(t.length); }

  /* ── Zeitspannen ─────────────────────────────────────────────
     Unter einem Jahr in Monaten oder Wochen, darüber in Jahren. */
  function dauer(tage){
    if(tage === null || tage === undefined) return null;
    var f = F(), t = Math.round(tage);
    if(t <= 0) return f.laeuftAus;
    if(t < 14)  return t + ' ' + (t === 1 ? f.tag : f.tage);
    if(t < 70){ var w = Math.round(t/7);  return w + ' ' + (w === 1 ? f.woche : f.wochen); }
    if(t < 365){ var m = Math.round(t/30.44); return m + ' ' + (m === 1 ? f.einMonat : f.vieleMonate); }
    var j = t/365.2422;
    if(j < 1.9) return f.einJahr;
    return fuellen(f.vieleJahre, { n:Math.round(j) });
  }

  function datum(jd){
    if(jd === null || jd === undefined) return null;
    var d = datVon(jd);
    return F().monate[d.getUTCMonth()] + ' ' + d.getUTCFullYear();
  }

  /* ── Ein laufender Vorgang als Satz ───────────────────────────
     gesehen sammelt die Arten, die in diesem Bereich schon erklärt
     wurden. Zwei Vorgänge derselben Art bekommen den Zusatz nur
     einmal — sonst steht zweimal wörtlich derselbe Satz da. */
  function vorgangSatz(v, gesehen){
    var W = bD().WAND[v.wanderer];
    if(!W) return null;
    if(v.form === 'durchgang'){
      /* Die Rahmenerklärung gehört einmal in den Bereich, nicht an
         jeden Durchgang. Was einen Durchgang vom anderen
         unterscheidet, ist der Vorgang selbst. */
      var rahmen = '';
      if(!gesehen || !gesehen.durchgang){
        rahmen = ' ' + bD().DURCH.einl;
        if(gesehen) gesehen.durchgang = true;
      }
      var rw = '';
      if(v.rueck && (!gesehen || !gesehen.rueck)){
        rw = ' ' + bD().DURCH.rueck;
        if(gesehen) gesehen.rueck = true;
      }
      return { was: W.was + rahmen + rw,
               tun: W.tun, nutzen: W.nutzen, tempo: W.tempo };
    }
    var A = bD().ART[v.art], zusatz = '';
    if(A && (!gesehen || !gesehen[v.art])){
      zusatz = ' ' + A.wie;
      if(gesehen) gesehen[v.art] = true;
    }
    return { was: W.was + zusatz,
             tun: W.tun, nutzen: W.nutzen, tempo: W.tempo };
  }

  /* Die Mechanik dazu — erst ab Stufe 2 sichtbar. */
  function vorgangTech(v){
    var f = F(), W = bD().WAND[v.wanderer], t = W ? W.tech : v.wanderer;
    if(v.form === 'durchgang')
      return fuellen(f.techDurchgang, { p:t, h:v.haus }) + (v.rueck ? f.techRueck : '');
    var A = bD().ART[v.art];
    return fuellen(f.techAspekt, { p:t, a:(A ? A.tech : v.aspekt), z:v.ziel,
                                   g:komma(v.ab.toFixed(1)) })
         + (v.zu ? f.techZu : f.techWeg) + (v.rueck ? f.techRueck : '');
  }

  /* ── Fensterzeile ───────────────────────────────────────────── */
  function fensterZeile(v){
    var f = F(), w = v.f;
    if(!w) return '';
    if(w.bisOffen || w.bis === null) return f.fensterOffen;
    var noch = dauer(w.tageNoch);
    /* Unter sechs Wochen ist "noch zwei Wochen" genauer als ein
       Monatsname — der wäre oft der laufende Monat und sagt nichts. */
    var s = (w.tageNoch !== null && w.tageNoch < 42)
      ? fuellen(f.fensterKurz, { d:noch })
      : fuellen(f.fensterBis, { d:noch, m:datum(w.bis) });
    if(w.tageSchon !== null && w.tageSchon > 20)
      s += ' ' + fuellen(f.fensterSeit, { d:dauer(w.tageSchon) });
    return s;
  }

  /* Die Mechanik einer Facette — erst ab Stufe 2 sichtbar. */
  function facTech(E){
    var f = F(), s = fuellen(f.techFeldNr, { h:E.wo });
    if(E.treffer && E.treffer.length) s += fuellen(f.techFacDrin, { p:E.treffer.join(', ') });
    else if(E.auch && E.auch.length)  s += fuellen(f.techFacBereich, { p:E.auch.join(', ') });
    else if(E.besetzt)                s += f.techFacBesetzt;
    else                              s += f.techFacLeer;
    return s + fuellen(f.techGewicht, { g:komma(E.g) });
  }

  /* Die Facetten eines Bereichs, vom Geburtsbild sortiert. */
  function facetten(b){
    var liste = (bD().FACET || {})[b.k];
    if(!liste || !liste.length) return [];
    try{ return window.AC_BER.facetten(b.natal, b, liste) || []; }catch(e){ return []; }
  }

  /* ── Ein Widerspruch als Satz ────────────────────────────────
     Der Rechner hat den Befund, hier kommen die Worte dazu. Was
     die Rechnung nicht hergibt, wird nicht erfunden: für jede
     Sorte gibt es genau eine Form, und eine leere Liste bekommt
     den Satz, dass hier kein Gegenzug zu finden war. */
  function widSatz(w){
    var W = bD().WID, H = bD().HAUS;
    if(w.art === 'anlage'){
      var ha = H[w.a.haus], hb = H[w.b.haus];
      var tech = fuellen(W.techAnlage, { x:w.a.p, y:w.b.p,
                   w:(W.techWinkel[w.aspekt] || w.aspekt),
                   g:komma(w.ab.toFixed(1)) });
      if(w.auch && w.auch.length)
        tech += fuellen(W.techAnlageAuch, { p:w.auch.map(function(x){
                  return x.a.p + '/' + x.b.p; }).join(', ') });
      if(w.a.haus === w.b.haus)
        return { satz: fuellen(W.anlageEins, { a:(ha ? ha.kurz : '') }),
                 tun: W.anlageTun, tech: tech };
      return { satz: fuellen(W.anlageZwei, { a:(ha ? ha.kurz : ''),
                                             b:(hb ? hb.kurz : '') }),
               tun: W.anlageTun, tech: tech };
    }
    if(w.art === 'zugleich')
      return { satz: W.zugleich, tun: W.zugleichTun, tech: W.techZugleich };
    if(w.art === 'kapitel')
      return { satz: W.kapitel, tun: W.kapitelTun, tech: W.techKapitel };
    return null;
  }

  /* ── Ein Bereich im Tiefgang ─────────────────────────────────
     stufe entscheidet, ob die Mechanik mitkommt. Auf 0 und 1
     bleibt die Datei frei von Fachsprache, genau wie die Seite. */
  function bereich(b, stufe){
    var T = bD().BER[b.k], L = bD().LAUT[b.laut];
    var TI = bD().TIEF, W = bD().WID, FR = (bD().FRAGEN || {})[b.k];
    var f = F(), tech = (stufe >= 2);
    if(!T) return '';
    var z = [], i;

    z.push(b.name + ' · ' + TI.titel);
    z.push(strich(b.name.length + 3 + TI.titel.length));
    z.push(L.n + ' — ' + T.lautSatz[b.laut]);
    z.push('');
    z.push(T.worum);

    /* ── Was gerade läuft ─────────────────────────────────── */
    var top = b.laeuft.slice(0, 3), gesehen = {};
    z.push(kapitel(TI.ueberblickTitel));
    if(b.kapitel){
      z.push(b.kapitel.laut ? bD().KAP.laut : bD().KAP.leise);
      if(b.nurKapitel) z.push(bD().KAP.nurKapitel);
    }
    if(!top.length){
      z.push(bD().LEER.keinVorgang);
      z.push(bD().LEER.tun);
      z.push(bD().LEER.nutzen);
    } else {
      for(i=0;i<top.length;i++){
        var S = vorgangSatz(top[i], gesehen);
        if(!S) continue;
        z.push('');
        z.push(S.tempo + ' — ' + fensterZeile(top[i]));
        z.push(S.was);
        if(tech) z.push('[ ' + vorgangTech(top[i]) + ' ]');
      }
      var S0 = vorgangSatz(top[0]);
      z.push('');
      z.push(TI.tunVor + ' ' + S0.tun);
      z.push(S0.nutzen);
    }

    /* ── Woher das bei dir kommt ──────────────────────────── */
    z.push(kapitel(TI.herkunftTitel));
    z.push(T.meistern);
    if(b.natal.leer){
      z.push(bD().LEER.natalLeer);
    } else {
      var HH = bD().HAUS[b.natal.kernHaus];
      z.push(TI.herkunftVor + ' ' + (HH ? HH.kurz : '') + '. ' + (HH ? HH.meistern : ''));
    }
    if(tech){
      var tp = b.natal.planeten.map(function(x){
        return fuellen(f.techFeldNr, { h:x.haus }) + ': ' + x.p; }).join(', ');
      z.push('[ ' + T.techFeld + '. ' +
             (tp ? fuellen(f.techNatal, { p:tp }) : f.techNatalLeer) + ' ]');
    }

    /* ── Die Seiten dieses Bereichs ───────────────────────── */
    var FA = facetten(b);
    z.push(kapitel(TI.facettenTitel));
    z.push(TI.facettenVor);
    for(i=0;i<FA.length;i++){
      var E = FA[i];
      z.push('');
      z.push((i+1) + '. ' + E.f.titel);
      z.push(E.f.was);
      z.push(TI.tunVor + ' ' + E.f.meistern);
      if(tech) z.push('[ ' + facTech(E) + ' ]');
    }

    /* ── Was sich hier widerspricht ───────────────────────── */
    z.push(kapitel(TI.widTitel));
    z.push(W.vor);
    var wl = b.wid || [];
    if(!wl.length){
      z.push('');
      z.push(W.keiner);
    } else {
      for(i=0;i<wl.length;i++){
        var V = widSatz(wl[i]);
        if(!V) continue;
        z.push('');
        z.push(V.satz);
        z.push(TI.tunVor + ' ' + V.tun);
        if(tech) z.push('[ ' + V.tech + ' ]');
      }
    }

    /* ── Zum Darübersprechen ──────────────────────────────── */
    z.push(kapitel(TI.fragenTitel));
    z.push(TI.fragenVor);
    z.push('');
    if(FR){
      for(i=0;i<FR.fragen.length;i++) z.push('— ' + FR.fragen[i]);
      z.push('');
      z.push(TI.grenzeVor + ' ' + FR.grenze);
    }

    return z.join('\n');
  }

  /* ── Der ganze Tiefgang ──────────────────────────────────────
     bs sind die Bereiche in der Reihenfolge, in der sie auf der
     Seite stehen — der lauteste zuerst. kopf trägt Name und
     Stichtag. Der ehrliche Teil steht einmal am Ende: er gilt für
     alles davor, und zehnmal dasselbe liest niemand. */
  function bauen(bs, kopf, stufe){
    var TI = bD().TIEF, EH = bD().EHRLICH, z = [], i;
    var st = (stufe === undefined || stufe === null) ? 0 : stufe;

    z.push(TI.titel.toUpperCase() + ' · ' + ((kopf && kopf.wer) || ''));
    if(kopf && kopf.stichtag) z.push(kopf.stichtag);
    z.push(strich(40));
    z.push('');
    z.push(TI.vor);

    for(i=0;i<bs.length;i++){
      z.push('');
      z.push('');
      z.push(bereich(bs[i], st));
    }

    z.push(kapitel(TI.ehrlichTitel));
    for(i=0;i<EH.length;i++){
      z.push('');
      z.push(EH[i].f);
      z.push(EH[i].a);
    }
    z.push('');
    z.push(strich(40));
    z.push(TI.fuss);
    z.push('');
    return z.join('\n');
  }

  window.AC_TIEF = {
    dauer:dauer, datum:datum,
    vorgangSatz:vorgangSatz, vorgangTech:vorgangTech,
    fensterZeile:fensterZeile, facTech:facTech, facetten:facetten,
    widSatz:widSatz, bereich:bereich, bauen:bauen
  };

})();
