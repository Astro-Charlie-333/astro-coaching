/* ───────────────────────────────────────────────────────────────
   nd-app.js — die Anzeige der Seite „Anders verdrahtet verstehen
   und leben".

   Diese Datei enthält keinen Satz und keine Rechnung. Sätze aus
   nd-daten.js, Stellen aus nd-rechner.js, Lebensbereiche (HT) und
   Zeichen aus rituale/engine.js. bau-nd.py bricht ab, sobald hier
   ein Satz oder ein „dein" von Hand auftaucht.

   Was jemand in den Hyperfokus-Finder schreibt, wird nur als Text
   eingesetzt (textContent), nie als HTML, und nicht gespeichert.
   ─────────────────────────────────────────────────────────────── */
(function(){
'use strict';
var T = ND_TEXT;
var el = function(id){ return document.getElementById(id); };
function ndEsc(s){ return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function ndFuell(v, w){ return String(v).replace(/\{([a-zA-Z0-9]+)\}/g, function(_, k){ return (w && w[k] !== undefined) ? String(w[k]) : ''; }); }
function ndNeu(tag, klasse, text){ var e = document.createElement(tag); if(klasse) e.className = klasse; if(text !== undefined) e.textContent = text; return e; }

function ndProfil(){ try{ var a = AC_P.alle(); return AC_P.aktives() || AC_P.eigenes() || a[0] || null; }catch(e){ return null; } }
var P = ndProfil(), S = null;
if(P){ try{ S = ndStellen(P); }catch(e){ S = null; } }
var feld = function(h){ return HT[h - 1]; };

/* Was das Geburtsbild zu einem Bereich sagt: [Alltagssprache, Fachzeile]. */
function ndBild(B){
  var s = S, el4 = function(zi){ return ND_ELEMENT[zi % 4]; };
  if(B.k === 'struktur'){
    var m = ND_MODUS[s.mondModus];
    return [ndFuell(B.laie, {feld:feld(s.saturnHaus)}) + ' ' + B.modus[m], ndFuell(B.tech, {haus:s.saturnHaus, modus:m})];
  }
  if(B.k === 'lernen'){
    return [B.element[el4(s.merkurZ)], ndFuell(B.tech, {zeichen:SIGNS[s.merkurZ], haus:s.merkurHaus, element:el4(s.merkurZ)})];
  }
  if(B.k === 'emotionen'){
    var t = el4(s.mondZ) === ND_ELEMENT[3] ? B.wasser : ndFuell(B.sonst, {feld:feld(s.mondHaus)});
    return [t + (s.mondNeptun ? ' ' + B.kontakt : ''),
            ndFuell(B.tech, {zeichen:SIGNS[s.mondZ], haus:s.mondHaus}) + (s.mondNeptun ? B.techKontakt : '')];
  }
  if(B.k === 'kommunikation'){
    return [s.ascZ % 4 === s.merkurZ % 4 ? B.gleich : B.anders, ndFuell(B.tech, {asc:SIGNS[s.ascZ], merkur:SIGNS[s.merkurZ]})];
  }
  if(B.k === 'energie'){
    return [B.element[el4(s.marsZ)] + (s.marsSaturn ? ' ' + B.kontakt : ''),
            ndFuell(B.tech, {zeichen:SIGNS[s.marsZ], haus:s.marsHaus}) + (s.marsSaturn ? B.techKontakt : '')];
  }
  var teile = [];
  if(s.h12.length) teile.push(B.h12);
  if(s.h6.length) teile.push(B.h6);
  return [teile.length ? teile.join(' ') : B.keine,
          ndFuell(B.tech, {h12:s.h12.length ? s.h12.join(T.trenner) : B.leer, h6:s.h6.length ? s.h6.join(T.trenner) : B.leer})];
}

function ndZeile(lab, text, klasse){
  var d = ndNeu('div', klasse || 'nd-zeile');
  d.appendChild(ndNeu('span', 'nd-lab', lab));
  if(text !== undefined) d.appendChild(ndNeu('p', '', text));
  return d;
}

function ndBereiche(){
  var box = el('ndbereiche'); box.innerHTML = '';
  ND_BEREICH.forEach(function(B){
    var a = ndNeu('article', 'nd-bereich');
    var kopf = ndNeu('div', 'nd-bkopf');
    kopf.appendChild(ndNeu('span', 'nd-icon', B.icon)).setAttribute('aria-hidden', 'true');
    var tt = ndNeu('div');
    tt.appendChild(ndNeu('h3', '', B.titel)); tt.appendChild(ndNeu('p', 'nd-bfrage', B.frage));
    kopf.appendChild(tt); a.appendChild(kopf);
    var z = ndZeile(T.labBild);
    if(S){
      var b = ndBild(B);
      z.appendChild(ndNeu('p', '', b[0]));
      var t = ndNeu('p', 'nd-tech', b[1]); t.setAttribute('data-ab', '2'); z.appendChild(t);
    } else { z.appendChild(ndNeu('p', 'nd-leise', T.bereichOhne)); }
    a.appendChild(z);
    a.appendChild(ndZeile(T.labHaltung, B.adler));
    a.appendChild(ndZeile(T.labSache, B.tun, 'nd-zeile nd-sache'));
    box.appendChild(a);
  });
}

/* Hyperfokus-Finder */
var ndAnt = {}, ndChips = [];
function ndHfPruef(){
  var voll = ND_HF.some(function(q){ return (ndAnt[q.id] || '').trim().length > 1; });
  el('ndhfgo').disabled = !voll;
  el('ndhfhint').textContent = voll ? '' : T.hfFehlt;
}
function ndHf(){
  var box = el('ndhf'); box.innerHTML = '';
  ND_HF.forEach(function(q, i){
    var d = ndNeu('div', 'nd-hf-frage');
    var lab = ndNeu('label', 'nd-hf-t', q.t); lab.setAttribute('for', 'ndhf' + q.id);
    d.appendChild(lab);
    d.appendChild(ndNeu('p', 'nd-klein', q.h));
    var ta = document.createElement('textarea'); ta.id = 'ndhf' + q.id; ta.rows = 2; ta.placeholder = T.hfPlatz;
    ta.addEventListener('input', function(){ ndAnt[q.id] = ta.value; ndHfPruef(); });
    d.appendChild(ta); box.appendChild(d);
  });
  var cb = el('ndhfchips'); cb.innerHTML = '';
  cb.appendChild(ndNeu('p', 'nd-klein', T.hfChipsFrage));
  ND_HF_CHIPS.forEach(function(g){
    var b = ndNeu('button', '', g); b.type = 'button'; b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', function(){
      var i = ndChips.indexOf(g);
      if(i < 0) ndChips.push(g); else ndChips.splice(i, 1);
      b.setAttribute('aria-pressed', String(i < 0));
    });
    cb.appendChild(b);
  });
  ndHfPruef();
}
function ndHfAuswerten(){
  var box = el('ndhferg'); box.innerHTML = '';
  var e = ndNeu('div', 'nd-hf-erg');
  e.appendChild(ndNeu('h4', '', T.hfTitel));
  ND_HF.forEach(function(q){
    var a = (ndAnt[q.id] || '').trim(); if(!a) return;
    var p = ndNeu('p'); p.appendChild(ndNeu('b', '', q.lab));
    p.appendChild(document.createTextNode(' ' + ndFuell(T.hfZitat, {text:a}) + ' ' + q.folge));
    e.appendChild(p);
  });
  if(ndChips.length){
    var p = ndNeu('p'); p.appendChild(ndNeu('b', '', T.hfChipsLab));
    p.appendChild(document.createTextNode(' ' + ndFuell(T.hfChipsFolge, {liste:ndChips.join(T.trenner)})));
    e.appendChild(p);
  }
  if(S){
    var p = ndNeu('p'); p.appendChild(ndNeu('b', '', T.hfBildLab));
    p.appendChild(document.createTextNode(' ' + ndFuell(T.hfBild, {feldJ:feld(S.jupiterHaus), feldS:feld(S.sonneHaus)})));
    e.appendChild(p);
    var t = ndNeu('p', 'nd-tech', ndFuell(T.hfBildTech, {hj:S.jupiterHaus, hs:S.sonneHaus})); t.setAttribute('data-ab', '2'); e.appendChild(t);
  }
  e.appendChild(ndNeu('p', 'nd-leise', T.hfSchluss));
  box.appendChild(e);
  try{ if(window.AC_WEG) AC_WEG.notieren({schluessel:'hyperfokus', titel:'Hyperfokus-Finder', art:'werkzeug', antwort:'ja', chips:ndChips.slice(), notiz:(ndAnt.vergessen || '')}); }catch(x){}
}

/* Liste zum Abhaken */
function ndLade(){ try{ return JSON.parse(localStorage.getItem(ND_CHECK_SCHLUESSEL) || '{}') || {}; }catch(e){ return {}; } }
function ndSichere(s){ try{ localStorage.setItem(ND_CHECK_SCHLUESSEL, JSON.stringify(s)); }catch(e){} }
function ndCheck(){
  var s = ndLade(), box = el('ndcheck'); box.innerHTML = '';
  ND_CHECK.forEach(function(p){
    var l = ndNeu('label', 'nd-c'), i = document.createElement('input');
    i.type = 'checkbox'; i.id = 'ndc' + p[0]; i.checked = !!s[p[0]];
    i.addEventListener('change', function(){ var t = ndLade(); t[p[0]] = i.checked; ndSichere(t); });
    l.appendChild(i); l.appendChild(ndNeu('span', '', p[1])); box.appendChild(l);
  });
}

function ndLos(){
  var b = el('ndprofil');
  if(S){ var n = ''; try{ n = AC_P.anzeige(P, AC_P.zeigeNamen()); }catch(e){} b.innerHTML = ndFuell(T.profilMit, {name:'<b>' + ndEsc(n) + '</b>'}); }
  else b.innerHTML = T.profilOhne;
  ndBereiche(); ndHf(); ndCheck();
  el('ndhfgo').addEventListener('click', ndHfAuswerten);
  el('ndstufe').addEventListener('click', function(){ if(window.AC_NIV) AC_NIV.setzen(1); });
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ndLos); else ndLos();
})();
