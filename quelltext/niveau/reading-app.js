/* ── Das Reading anzeigen ─────────────────────────────────────
   Diese Datei setzt zusammen und formuliert nicht. Jedes Wort, das
   auf der Seite landet, kommt aus `RD_T` in `reading-daten.js`
   (Aufgabe 65, aus dem Zug von Aufgabe 34); jede Zahl geht durch
   `AC_KOMMA`, jeder Satzanfang durch `AC_GROSS`, und „dein" vor
   einem Punkt des Geburtsbilds bildet `B_BEUGE` — die eine Stelle,
   die das Geschlecht des Punktes kennt.

   Verriegelt ist das in `bau-reading.py`: Ein Satz oder ein „dein"
   von Hand bricht den Bau ab.

   Die Datei steht in einer eigenen Hülle. Vorher lagen `nrm`,
   `chartVon`, `haus` und `gewaehlt` im globalen Namensraum neben
   denen der Engine — vier Namen, die `engine.js` dort schon führt
   (`REGELN.md` 6f). Die Rechnung steht jetzt in
   `reading-rechner.js`. */
(function(){
'use strict';

var W = window.AC_WORT, R = window.AC_RDR;
var reg = RD_REG;

function el(i){ return document.getElementById(i); }
function esc(s){
  return String(s === undefined || s === null ? '' : s)
    .replace(/[<>&"]/g, function(c){
      return {'<':'&lt;', '>':'&gt;', '&':'&amp;', '"':'&quot;'}[c]; });
}

var gewaehlt = null, stufe = 2;

/* ── Wie ein Punkt des Geburtsbilds auf dieser Stufe heißt ────
   Auf Stufe 1 bildet `B_BEUGE` die Form: „deine Sonne", „dein
   Mond", „dein Aszendent" — mit dem Geschlecht aus `B_ZIEL` und
   nicht von Hand. Auf den übrigen Stufen steht das Wort des
   Registers in `wortwahl.js`: auf 0 die Aufgabe im Leben („dein
   Wesenskern"), auf 2 der Artikel („die Sonne"), darüber der
   nackte Name. */
function punkt(k, n){
  if(n === 1) return B_BEUGE(B_PUNKT(k, false), 'nom');
  return W.pName(k, n);
}
function kopfPunkt(k, n){ return AC_GROSS(punkt(k, n)); }

/* ── Ein Abschnitt ───────────────────────────────────────────── */
function abschnitt(titel, kern, technik, n){
  return '<section class="rd-ab"><h3>' + titel + '</h3><p>' + kern + '</p>'
    + ((technik && n >= 2) ? '<p class="rd-tech">' + technik + '</p>' : '')
    + '</section>';
}

function readingBauen(p, n){
  var P = chartVon(p);
  var vorname = (p.name || '').trim().split(/\s+/)[0] || RD_T.ohneName;
  var sz = R.zeichen(P.Sonne), mz = R.zeichen(P.Mond), az = R.zeichen(P.ASC);
  var ZN = W.ZEICHEN.map(function(z){ return z.n; });
  var h = '';

  /* Kopf */
  h += '<div class="rd-kopf"><div class="rd-k">'
    + AC_FUELL(RD_T.kopfFuer, {name: esc(vorname)}) + '</div>'
    + '<h2>' + reg(RD_T.titel, n) + '</h2>'
    + '<p class="rd-ein">' + reg(RD_T.einstieg, n) + '</p></div>';

  /* Die drei Grundlagen */
  var drei = [['Sonne', sz, R_SONNE[sz]], ['Mond', mz, R_MOND[mz]],
              ['ASC', az, R_ASC[az]]];
  var g = '';
  drei.forEach(function(x){
    g += (n === 0)
      ? AC_FUELL(RD_T.dreiZeileLaie,
                 {punkt: RD_T.dreiLaie[x[0]], text: x[2]})
      : AC_FUELL(RD_T.dreiZeile,
                 {punkt: kopfPunkt(x[0], n), zeichen: ZN[x[1]], text: x[2]});
  });
  var dreiTech = (n >= 3) ? AC_FUELL(RD_T.dreiTech, {
    sonne: W.grad(P.Sonne), mond: W.grad(P.Mond),
    asc: W.grad(P.ASC), mc: W.grad(P.MC)}) : null;
  h += '<section class="rd-ab rd-drei"><h3>' + reg(RD_T.dreiTitel, n) + '</h3>'
    + g + (dreiTech ? '<p class="rd-tech">' + dreiTech + '</p>' : '')
    + '</section>';

  /* Die einzelnen Funktionen */
  var SINN = {Merkur: R_MERKUR, Venus: R_VENUS, Mars: R_MARS};
  ['Merkur', 'Venus', 'Mars'].forEach(function(k){
    var z = R.zeichen(P[k]), hs = haus(P, P[k]), hw = W.HAUS[hs - 1];
    var titel = (n === 0) ? kopfPunkt(k, 0)
      : AC_FUELL(RD_T.funkTitel, {punkt: kopfPunkt(k, n), zeichen: ZN[z]});
    var ort = (n === 0)
      ? AC_FUELL(RD_T.ortLaie, {bereich: hw.kurz})
      : AC_FUELL(RD_T.ort, {haus: hs, lang: hw.lang});
    h += abschnitt(titel, SINN[k][z] + ort,
      (n >= 3) ? AC_FUELL(RD_T.funkTech,
        {punkt: k, grad: W.grad(P[k]), haus: hs}) : null, n);
  });

  /* Wo am meisten los ist */
  var hb = R.betont(P);
  if(hb.length){
    var b = hb[0], bw = W.HAUS[b.h - 1];
    var auf = (n === 0)
      ? AC_FUELL(RD_T.betontLaie, {bereich: bw.kurz})
      : AC_FUELL(b.n === 1 ? RD_T.betontEin : RD_T.betontViele,
                 {haus: b.h, lang: bw.lang, zahl: b.n});
    h += abschnitt(reg(RD_T.betontTitel, n), auf + RD_T.betontFolge,
      (n >= 3) ? AC_FUELL(RD_T.betontTech, {haus: b.h, zahl: b.n}) : null, n);
  }

  /* Die stärksten Verbindungen */
  var as = R.aspekte(P).slice(0, n <= 1 ? 3 : (n === 2 ? 5 : 7));
  if(as.length){
    var at = '';
    as.forEach(function(x){
      var deut = null;
      try{ deut = window.AC_ASP ? AC_ASP.deutung(x.a, x.b, x.art) : null; }
      catch(e){}
      if(deut && typeof deut !== 'string') deut = deut.text || deut.kern || '';
      /* Die Genauigkeit wächst mit der Stufe: eine Nachkommastelle
         für die Lesende, zwei für die Fachperson. Die Zahl wird hier
         zu Text und nicht im Wörterbuch (REGELN.md Abschnitt 4). */
      var orbText = (n >= 3) ? AC_KOMMA(x.orb, n >= 4 ? 2 : 1) : '';
      var zeile = AC_GROSS(W.aspekt(x.a, x.b, x.art, n, orbText));
      at += (deut && n >= 1)
        ? AC_FUELL(RD_T.aspMitDeutung, {zeile: zeile, deutung: deut})
        : AC_FUELL(RD_T.aspZeile, {zeile: zeile});
    });
    h += '<section class="rd-ab"><h3>' + reg(RD_T.aspTitel, n) + '</h3>'
      + (n === 0 ? '<p class="rd-vor">' + RD_T.aspVor + '</p>' : '')
      + at + '</section>';
  }

  /* Woraus jemand gemischt ist */
  var bi = R.bilanz(P);
  var stark = R.ELE.slice().sort(function(a, b){ return bi.e[b] - bi.e[a]; })[0];
  var fehlt = R.ELE.filter(function(k){ return bi.e[k] <= 1; });
  var mstark = R.MODUS.slice().sort(function(a, b){ return bi.m[b] - bi.m[a]; })[0];
  var bt = AC_FUELL(RD_T.mischZeile, {
    marke: (n === 0) ? RD_T.starkLaie
      : AC_FUELL(RD_T.stark, {was: R_ELEMENT[stark].n}),
    text: R_ELEMENT[stark].text});
  if(fehlt.length) bt += AC_FUELL(RD_T.mischZeile, {
    marke: (n === 0) ? RD_T.fehltLaie
      : AC_FUELL(RD_T.fehlt, {was: fehlt.map(function(k){
          return R_ELEMENT[k].n; }).join(RD_T.fehltUnd)}),
    text: R_ELEMENT_FEHLT[fehlt[0]]});
  bt += AC_FUELL(RD_T.mischZeile, {
    marke: (n === 0) ? RD_T.tempoLaie
      : AC_FUELL(RD_T.tempo, {was: R_MODUS[mstark].n}),
    text: R_MODUS[mstark].text});
  if(n >= 3){
    var waage = function(tafel, werte, namen){
      return tafel.map(function(k){
        return namen[k].n + RD_T.waageRaum + AC_KOMMA(werte[k], 1);
      }).join(RD_T.waageTrenn);
    };
    bt += '<p class="rd-tech">' + AC_FUELL(RD_T.waageZeile, {
      elemente: waage(R.ELE, bi.e, R_ELEMENT),
      modi: waage(R.MODUS, bi.m, R_MODUS)}) + '</p>';
  }
  h += '<section class="rd-ab"><h3>' + reg(RD_T.mischTitel, n) + '</h3>'
    + bt + '</section>';

  /* Wo es kippen kann — erst ab Stufe 2, und nur einer */
  if(n >= 2){
    var sp = null;
    try{
      R.HAUPT.forEach(function(k){
        if(sp || !window.AC_SCHATTEN || !AC_SCHATTEN.hat(k)) return;
        var hs = haus(P, P[k]), t = AC_SCHATTEN.haus(k, hs);
        if(t) sp = {k:k, h:hs, t:t};
      });
    }catch(e){}
    if(sp) h += abschnitt(RD_T.kippTitel, sp.t,
      (n >= 4) ? AC_FUELL(RD_T.kippTech, {punkt: sp.k, haus: sp.h}) : null, n);
  }

  /* Zum Schluss */
  h += '<section class="rd-ab rd-schluss"><h3>' + RD_T.schlussTitel + '</h3>'
    + '<p>' + reg(RD_T.schluss, n) + '</p></section>';
  return h;
}

/* ── Oberfläche ──────────────────────────────────────────────── */
function alle(){ try{ return AC_P.alle() || []; }catch(e){ return []; } }

function wahlBauen(){
  var box = el('rdwahl'), l = alle();
  box.innerHTML = '';
  if(!l.length) return;
  var lab = document.createElement('span');
  lab.className = 'lab'; lab.textContent = RD_T.wahlLabel;
  box.appendChild(lab);
  l.forEach(function(p){
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = AC_P.anzeige(p, AC_P.zeigeNamen())
      + (p.eigen ? RD_T.wahlEigen : '');
    b.setAttribute('aria-pressed', gewaehlt === p.id);
    b.addEventListener('click', function(){
      gewaehlt = p.id; stufe = AC_NIV.fuerProfil(p.id);
      wahlBauen(); stufeBauen(); zeigen();
    });
    box.appendChild(b);
  });
}

function stufeBauen(){
  var box = el('rdstufe');
  var h = '<span class="lab">' + RD_T.stufeLabel + '</span>'
        + '<div class="niv-knoepfe">';
  AC_NIV.STUFEN.forEach(function(s){
    h += '<button type="button" data-s="' + s.id + '" aria-pressed="'
      + (s.id === stufe) + '" title="' + esc(s.lang) + '">' + s.n + '</button>';
  });
  h += '</div><div class="rd-tipp">'
    + AC_FUELL(RD_T.stufeTipp,
               {lang: AC_NIV.lang(stufe), u: AC_NIV.STUFEN[stufe].u})
    + '</div>';
  box.innerHTML = h;
  Array.prototype.forEach.call(box.querySelectorAll('button[data-s]'),
    function(b){
      b.addEventListener('click', function(){
        stufe = +b.getAttribute('data-s');
        if(gewaehlt) AC_NIV.profilSetzen(gewaehlt, stufe);
        stufeBauen(); zeigen();
      });
    });
}

function zeigen(){
  var l = alle(), box = el('rdinhalt');
  if(!l.length){
    box.innerHTML = '<div class="rd-leer">' + RD_T.leer + '</div>';
    return;
  }
  if(!gewaehlt){
    gewaehlt = (l.filter(function(p){ return p.eigen; })[0] || l[0]).id;
    stufe = AC_NIV.fuerProfil(gewaehlt);
    wahlBauen(); stufeBauen();
  }
  var p = l.filter(function(x){ return x.id === gewaehlt; })[0];
  if(!p){ box.innerHTML = ''; return; }
  box.innerHTML = '<article class="rd niv-' + stufe + '">'
    + readingBauen(p, stufe) + '</article>';
}

/* ── Herausgeben: als Text, als Datei, auf Papier ───────────── */
function alsText(){
  var art = document.querySelector('.rd');
  return art ? art.innerText.replace(/\n{3,}/g, '\n\n').trim() : '';
}
function echo(s){
  var e = el('rdecho'); e.textContent = s;
  setTimeout(function(){ if(e.textContent === s) e.textContent = ''; }, 4000);
}
function kopieren(){
  var t = alsText(); if(!t) return;
  var ta = document.createElement('textarea');
  ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  var ok = false;
  try{ ok = document.execCommand('copy'); }catch(e){}
  var nicht = ok ? RD_T.echoKurz : RD_T.echoHand;
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(t).then(
      function(){ echo(RD_T.echoKopiert); },
      function(){ echo(nicht); });
  } else echo(nicht);
  ta.remove();
}
function datei(){
  var t = alsText(); if(!t) return;
  var p = alle().filter(function(x){ return x.id === gewaehlt; })[0];
  /* Der Name bleibt, wie er geschrieben wird. `toLowerCase` auf
     deutschem Text ist verboten (`REGELN.md` Abschnitt 4). */
  var nm = ((p && p.name) || '').trim().split(/\s+/)[0] || RD_T.dateiOhne;
  var b = new Blob([t], {type:'text/plain;charset=utf-8'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(b);
  a.download = AC_FUELL(RD_T.dateiName,
    {name: nm.replace(/[^A-Za-zÄÖÜäöüß0-9-]/g, '-'),
     stufe: AC_NIV.STUFEN[stufe].k});
  document.body.appendChild(a); a.click();
  setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 400);
}

wahlBauen(); stufeBauen(); zeigen();
el('rdkopie').addEventListener('click', kopieren);
el('rddatei').addEventListener('click', datei);
el('rddruck').addEventListener('click', function(){ window.print(); });
})();
