/* ───────────────────────────────────────────────────────────────
   leitfaden-app.js — die Anzeige der Seite „Menschen ansprechen".

   Diese Datei enthält keinen Satz und keine Rechnung. Sätze aus
   leitfaden-daten.js, Stellen aus leitfaden-rechner.js, Zeichennamen
   aus rituale/engine.js. bau-leitfaden.py bricht ab, sobald hier ein
   Satz oder ein „dein" von Hand auftaucht.

   Eigene Namen mit lf bzw. LF davor.
   ─────────────────────────────────────────────────────────────── */
(function(){
'use strict';
var T = LF_TEXT;
var el = function(id){ return document.getElementById(id); };
function lfEsc(s){ return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function lfFuell(v, w){ return String(v).replace(/\{([a-zA-Z]+)\}/g, function(_, k){ return (w && w[k] !== undefined) ? String(w[k]) : ''; }); }
/* Hängt an ein Symbol das Zeichen für Textdarstellung (U+FE0E), sonst
   malen manche Systeme die Tierkreiszeichen als farbige Emoji. */
var LF_TEXTFORM = String.fromCharCode(0xFE0E);
function lfNeu(tag, klasse, text){ var e = document.createElement(tag); if(klasse) e.className = klasse; if(text !== undefined) e.textContent = text; return e; }

function lfProfil(){ try{ var a = AC_P.alle(); return AC_P.aktives() || AC_P.eigenes() || a[0] || null; }catch(e){ return null; } }
var P = lfProfil(), S = null;
if(P){ try{ S = lfStellen(P); }catch(e){ S = null; } }

/* Eine Liste aus Begriff und Text; `frage` setzt die Klasse für die Frage. */
function lfListe(paare){
  var dl = document.createElement('dl');
  paare.forEach(function(p){
    dl.appendChild(lfNeu('dt', '', p[0]));
    dl.appendChild(lfNeu('dd', p[2] || '', p[1]));
  });
  return dl;
}

function lfFelder(){
  var b = el('lfprofil'), box = el('lffelder'); box.innerHTML = '';
  if(!S){ b.innerHTML = T.profilOhne; return; }
  var name = ''; try{ name = AC_P.anzeige(P, AC_P.zeigeNamen()); }catch(e){}
  b.innerHTML = lfFuell(T.profilMit, {name:'<b>' + lfEsc(name) + '</b>'});
  ['Mond', 'Merkur', 'Mars'].forEach(function(k){
    var K = LF_KOMPASS[k], c = K.k[S[k]], f = lfNeu('article', 'lf-feld');
    f.appendChild(lfNeu('h3', 'lab', K.label));
    f.appendChild(lfNeu('p', 'um', K.um));
    var t = lfNeu('p', 'tech', lfFuell(T.tech, {punkt:k, zeichen:SIGNS[S[k]]})); t.setAttribute('data-ab', '2'); f.appendChild(t);
    f.appendChild(lfListe([[T.sprich, c.sprich], [T.frage, c.frage, 'frage'], [T.vermeide, c.vermeide]]));
    box.appendChild(f);
  });
  var s = LF_SK[S.Suedknoten], f = lfNeu('article', 'lf-feld');
  f.appendChild(lfNeu('h3', 'lab', LF_FUNDAMENT.label));
  f.appendChild(lfNeu('p', 'um', LF_FUNDAMENT.um));
  var t = lfNeu('p', 'tech', lfFuell(T.techSk, {zeichen:SIGNS[S.Suedknoten], gegen:SIGNS[(S.Suedknoten + 6) % 12]})); t.setAttribute('data-ab', '2'); f.appendChild(t);
  f.appendChild(lfListe([[T.bringtSchon, s.bringt], [T.waechst, s.waechst]]));
  box.appendChild(f);
}

function lfKopf(i, titel){
  var d = lfNeu('div', 'lf-k-kopf');
  d.appendChild(lfNeu('span', 'gl', GLZ[i] + LF_TEXTFORM)).setAttribute('aria-hidden', 'true');
  d.appendChild(lfNeu('b', '', titel));
  d.appendChild(lfNeu('span', 'lf-el ' + LF_ELEMENT[i % 4], LF_ELEMENTNAME[i % 4]));
  return d;
}

function lfKompasse(){
  Array.prototype.forEach.call(document.querySelectorAll('[data-k]'), function(box){
    var k = box.getAttribute('data-k'), K = LF_KOMPASS[k], low = box.parentNode.id;
    el('lfk' + low).textContent = K.kompass;
    box.parentNode.querySelector('h2').textContent = K.titel;
    box.innerHTML = '';
    box.appendChild(lfNeu('p', 'lf-text', K.kurz));
    box.appendChild(lfNeu('p', 'lf-warum', K.warum));
    var g = lfNeu('div', 'lf-karten');
    K.k.forEach(function(c, i){
      var a = lfNeu('article', 'lf-k ' + LF_ELEMENT[i % 4] + (S && S[k] === i ? ' lf-k-bei' : ''));
      var kopf = lfKopf(i, SIGNS[i]);
      if(S && S[k] === i) kopf.appendChild(lfNeu('span', 'lf-chip', T.bei));
      a.appendChild(kopf);
      a.appendChild(lfListe([[T.bringt, c.bringt], [T.sprich, c.sprich], [T.frage, c.frage, 'frage'], [T.vermeide, c.vermeide]]));
      g.appendChild(a);
    });
    box.appendChild(g);
  });
}

function lfSuedknoten(){
  var g = el('lfsk'); g.innerHTML = '';
  LF_SK.forEach(function(c, i){
    var a = lfNeu('article', 'lf-k ' + LF_ELEMENT[i % 4] + (S && S.Suedknoten === i ? ' lf-k-bei' : ''));
    var kopf = lfKopf(i, lfFuell(T.skTitel, {zeichen:SIGNS[i]}));
    if(S && S.Suedknoten === i) kopf.appendChild(lfNeu('span', 'lf-chip', T.bei));
    a.appendChild(kopf);
    a.appendChild(lfListe([[T.bringtSchon, c.bringt], [T.waechst, c.waechst]]));
    a.appendChild(lfNeu('p', 'nk', lfFuell(T.nk, {zeichen:c.nk})));
    g.appendChild(a);
  });
}

function lfLos(){
  lfFelder(); lfKompasse(); lfSuedknoten();
  el('lfstufe').addEventListener('click', function(){ if(window.AC_NIV) AC_NIV.setzen(1); });
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', lfLos); else lfLos();
})();
