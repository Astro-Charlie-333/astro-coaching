/* ── Die Begleitung: Anzeige ──────────────────────────────────
   Eine Arbeitsseite, keine Leseseite. Die Notizen liegen im
   Browser dieser einen Person und gehen nirgendwohin — das steht
   auch oben auf der Seite, weil es um die Daten eines anderen
   Menschen geht und man das nicht aus einer Datenschutzerklärung
   erraten soll. */
(function(){
'use strict';
var D = document;
function el(i){ return D.getElementById(i); }
function esc(s){ return String(s === undefined || s === null ? '' : s)
  .replace(/[<>&"]/g, function(c){
    return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }

var P = null, PROFIL = null, SITZUNG = 1, GEWAEHLT = null;
var SPEICHER = 'ac_begleit_v1';

/* ── Notizen ──────────────────────────────────────────────────
   Je Person und Sitzung. Der Schlüssel ist die Profil-Id, damit
   zwei Begleitungen sich nicht in die Quere kommen. */
function alles(){
  try{ return JSON.parse(localStorage.getItem(SPEICHER) || '{}') || {}; }
  catch(e){ return {}; }
}
function holen(id, feld){
  var a = alles(); return (a[id] && a[id][feld]) || '';
}
function legen(id, feld, wert){
  try{
    var a = alles();
    if(!a[id]) a[id] = {};
    if(wert === '' || wert === false) delete a[id][feld]; else a[id][feld] = wert;
    localStorage.setItem(SPEICHER, JSON.stringify(a));
  }catch(e){}
}

/* Die Wahl hier ändert NICHT das aktive Profil der ganzen Seite.
   Wer eine Begleitung vorbereitet, will nicht, dass danach auf
   „Jetzt" das Chart der Klientin steht — dasselbe hält das
   Dossier so. */
function profil(){
  var alle = [];
  try{ alle = AC_P.alle() || []; }catch(e){ return null; }
  if(!alle.length) return null;
  /* Wen man begleitet, wechselt man nicht ständig. Die Wahl
     überlebt deshalb den Neustart — sonst steht nach jedem Laden
     wieder das eigene Profil da und die Notizen scheinen weg. */
  if(GEWAEHLT === null){
    try{ GEWAEHLT = localStorage.getItem(SPEICHER + '-wer') || null; }catch(e){}
  }
  var g = alle.filter(function(x){ return x.id === GEWAEHLT; })[0];
  if(g) return g;
  var e2 = alle.filter(function(x){ return x.eigen; })[0] || alle[0];
  GEWAEHLT = e2.id;
  return e2;
}

/* ── Wen begleitest du ────────────────────────────────────── */
function wenBauen(){
  el('bgtitel').textContent = C_KOPF.titel;
  el('bglede').textContent = C_KOPF.lede;
  el('bgwent').textContent = C_KOPF.wen;
  el('bgprivat').textContent = C_KOPF.warnung;
  el('bgdossier').textContent = C_KOPF.dossier;
  var box = el('bgwahl'), alle = [];
  try{ alle = AC_P.alle() || []; }catch(err){}
  if(!alle.length){
    box.innerHTML = '<p class="bg-leer">Noch kein Profil angelegt. ' +
      '<a href="profile.html">Hier legst du eins an</a> — ohne Geburtszeit und ' +
      'Geburtsort kann hier nichts gerechnet werden, weil alles an den Häusern hängt.</p>';
  } else {
    var zn = false; try{ zn = AC_P.zeigeNamen(); }catch(err){}
    box.innerHTML = '';
    alle.forEach(function(x){
      var b = D.createElement('button');
      b.type = 'button';
      b.className = 'bw' + (x.id === GEWAEHLT ? ' ist' : '');
      b.textContent = AC_P.anzeige(x, zn);
      b.addEventListener('click', function(){
        GEWAEHLT = x.id;
        try{ localStorage.setItem(SPEICHER + '-wer', x.id); }catch(err){}
        neu(); });
      box.appendChild(b);
    });
  }
  var e = el('bgeigen');
  /* Der häufigste Anfängerfehler mit dieser Seite: das eigene
     Profil aktiv lassen und sich über die Fragen wundern. */
  var eigen = false;
  try{ eigen = !!(PROFIL && PROFIL.eigen); }catch(err){}
  e.textContent = C_KOPF.eigen;
  e.hidden = !eigen;
}

/* ── Der Rahmen ──────────────────────────────────────────── */
function rahmenBauen(){
  el('bgrahmenh').textContent = C_RAHMEN.titel;
  el('bgrahmensub').textContent = C_RAHMEN.sub;
  el('bgrahmenhin').textContent = C_RAHMEN.hinweis;
  var id = PROFIL ? PROFIL.id : 'ohne';
  el('bgrahmen').innerHTML = C_RAHMEN.punkte.map(function(p){
    var an = holen(id, 'rahmen-' + p.k) ? ' checked' : '';
    return '<div class="rh' + (an ? ' rh-an' : '') + '" data-k="' + esc(p.k) + '">' +
      '<label class="rh-l"><input type="checkbox" data-rahmen="' + esc(p.k) + '"' + an + '>' +
      '<span class="rh-t">' + esc(p.t) + '</span></label>' +
      '<p class="rh-d">' + esc(p.d) + '</p>' +
      '<p class="rh-s">' + esc(p.satz) + '</p></div>';
  }).join('');
  Array.prototype.forEach.call(el('bgrahmen').querySelectorAll('[data-rahmen]'), function(b){
    b.addEventListener('change', function(){
      legen(id, 'rahmen-' + b.getAttribute('data-rahmen'), b.checked);
      b.closest('.rh').classList.toggle('rh-an', b.checked);
    });
  });
}

/* ── Der Bogen ───────────────────────────────────────────── */
function leisteBauen(){
  el('bgleiste').innerHTML = C_SITZUNGEN.map(function(s){
    var id = PROFIL ? PROFIL.id : 'ohne';
    var fertig = holen(id, 'fertig-' + s.n) ? ' sz-fertig' : '';
    return '<button type="button" class="sz' + (s.n === SITZUNG ? ' sz-ist' : '') +
      fertig + '" data-n="' + s.n + '">' +
      '<span class="sz-n">' + s.n + '</span>' +
      '<span class="sz-t">' + esc(s.titel) + '</span></button>';
  }).join('');
  Array.prototype.forEach.call(el('bgleiste').querySelectorAll('.sz'), function(b){
    b.addEventListener('click', function(){
      SITZUNG = parseInt(b.getAttribute('data-n'), 10);
      leisteBauen(); sitzungBauen();
      var z = el('bgsitzung');
      if(z) window.scrollTo({top:Math.max(0, z.getBoundingClientRect().top +
        window.pageYOffset - 90), behavior:'smooth'});
    });
  });
}

function fragenBlock(f){
  if(!f) return '';
  var h = ['<div class="sz-chart"><div class="sz-chart-t">Fragen aus seinem Bild</div>'];
  f.stellungen.forEach(function(s){
    h.push('<div class="cf"><div class="cf-th">' + esc(s.thema) + '</div><ul>' +
      s.fragen.map(function(q){ return '<li>' + esc(q) + '</li>'; }).join('') +
      '</ul><div class="cf-tech ac-tech" data-ab="2">' + esc(s.anlage) +
      ' im ' + s.haus + '. Haus</div></div>');
  });
  if(f.spannung){
    var sp = f.spannung;
    h.push('<div class="cf cf-sp"><div class="cf-th">Eine Spannung</div><ul>' +
      sp.fragen.map(function(q){ return '<li>' + esc(q) + '</li>'; }).join('') +
      '</ul><div class="cf-tech ac-tech" data-ab="2">' + esc(sp.a) + ' und ' +
      esc(sp.b) + ', ' + sp.ab.toFixed(1) + '° — ' + esc(sp.art) + '</div></div>');
  }
  h.push('</div>');
  return h.join('');
}

function sitzungBauen(){
  var s = C_SITZUNGEN[SITZUNG - 1]; if(!s) return;
  var id = PROFIL ? PROFIL.id : 'ohne';
  var f = (P && window.AC_BEGLEIT) ? AC_BEGLEIT.fuerSitzung(P, SITZUNG) : null;
  var h = [];

  h.push('<div class="sz-kopf"><div class="sz-nr">Sitzung ' + s.n + '</div>' +
    '<h3 class="sz-h">' + esc(s.titel) + '</h3>' +
    '<p class="sz-ziel"><b>Ziel</b>' + esc(s.ziel) + '</p></div>');

  h.push('<div class="sz-chartlage' + (s.chartZu ? ' sz-zu' : '') + '">' +
    '<b>' + (s.chartZu ? 'Das Chart bleibt zu' : 'Das Chart kommt dazu') + '</b>' +
    esc(s.chartSatz) + '</div>');

  h.push('<div class="sz-zwei">');
  h.push('<div class="sz-sp"><div class="sz-t">Ablauf</div><table class="sz-ablauf">' +
    s.ablauf.map(function(a){
      return '<tr><td>' + esc(a[0]) + '</td><td>' + esc(a[1]) + '</td></tr>'; }).join('') +
    '</table></div>');

  h.push('<div class="sz-sp"><div class="sz-t">Womit du anfängst</div>' +
    '<p class="sz-oeff">' + esc(s.oeffnung) + '</p>' +
    '<div class="sz-t">Dann</div><ul class="sz-kern">' +
    s.kern.map(function(q){ return '<li>' + esc(q) + '</li>'; }).join('') + '</ul></div>');
  h.push('</div>');

  if(!s.chartZu && f) h.push(fragenBlock(f));
  else if(s.chartZu) h.push('<div class="sz-chart sz-chart-zu">' +
    'Diese Sitzung ohne Chart. Die Fragen aus seinem Bild stehen ab Sitzung 2 hier.</div>');

  h.push('<div class="sz-haken"><div class="sz-t">Wenn es hakt</div>' +
    s.haken.map(function(x){
      return '<div class="hk"><b>' + esc(x[0]) + '</b><span>' + esc(x[1]) + '</span></div>';
    }).join('') + '</div>');

  h.push('<div class="sz-zwei">');
  h.push('<div class="sz-sp sz-auf"><div class="sz-t">Bis zum nächsten Mal</div><p>' +
    esc(s.aufgabe) + '</p></div>');
  h.push('<div class="sz-sp sz-no"><div class="sz-t">Was du dir notierst</div><p>' +
    esc(s.notiz) + '</p></div>');
  h.push('</div>');

  h.push('<div class="sz-notiz"><label class="sz-t" for="bgnotiz">' +
    esc(C_KOPF.notizVor) + ' <span class="sz-hin">' + esc(C_KOPF.notizHin) + '</span></label>' +
    '<textarea id="bgnotiz" rows="7" placeholder="…"></textarea></div>');

  h.push('<div class="sz-fuss">' +
    '<label class="sz-fertig"><input type="checkbox" id="bgfertig"> Sitzung ' + s.n + ' ' +
    esc(C_KOPF.erledigt) + '</label>' +
    '<button type="button" class="sz-druck" id="bgdruck">' + esc(C_KOPF.drucken) + '</button>' +
    '</div>');

  el('bgsitzung').innerHTML = h.join('');

  var t = el('bgnotiz');
  t.value = holen(id, 'notiz-' + s.n);
  t.addEventListener('input', function(){ legen(id, 'notiz-' + s.n, t.value); });

  var fx = el('bgfertig');
  fx.checked = !!holen(id, 'fertig-' + s.n);
  fx.addEventListener('change', function(){
    legen(id, 'fertig-' + s.n, fx.checked); leisteBauen();
  });
  el('bgdruck').addEventListener('click', function(){ window.print(); });

  try{ if(window.AC_NIV) AC_NIV.anwenden(); }catch(e){}
}

/* ── Was gerade läuft ────────────────────────────────────── */
function jetztBauen(){
  el('bgjetzth').textContent = C_JETZT.titel;
  el('bgjetztsub').textContent = C_JETZT.sub;
  el('bgjetztwarn').textContent = C_JETZT.warnung;
  var z = el('bgjetzt'); if(!P || !window.AC_BEGLEIT){ z.innerHTML = ''; return; }
  var jd; try{ jd = jdFromUT(new Date().getUTCFullYear(), new Date().getUTCMonth()+1,
    new Date().getUTCDate(), new Date().getUTCHours() + new Date().getUTCMinutes()/60);
  }catch(e){ z.innerHTML = ''; return; }
  var l = AC_BEGLEIT.jetzt(P, jd, 3);
  if(!l.length){ z.innerHTML = '<p class="bg-nix">Gerade trifft nichts Langsames sein ' +
    'Bild. Dann arbeitet ihr mit dem, was er mitbringt — so soll es ohnehin sein.</p>'; return; }
  z.innerHTML = l.map(function(x, i){
    return '<div class="jz"><div class="jz-k">' +
      '<span class="jz-f">' + (i === 0 ? esc(C_JETZT.frageVor) : '') + '</span>' +
      '<span class="jz-n">' + x.ab.toFixed(1) + '°</span></div>' +
      '<p class="jz-q">' + esc(x.frage) + '</p>' +
      '<div class="jz-tech ac-tech" data-ab="2">' + esc(x.wanderer) + ' ' +
      esc(x.aspekt) + ' ' + esc(x.ziel) + ', ' + x.ab.toFixed(2) + '°</div></div>';
  }).join('');
}

/* ── Der ganze Vorrat ───────────────────────────────────── */
function vorratBauen(){
  var z = el('bgfragen'); if(!P || !window.AC_BEGLEIT){ z.innerHTML = ''; return; }
  var st = AC_BEGLEIT.stellungen(P), sp = AC_BEGLEIT.spannungen(P, 4);
  var h = st.map(function(s){
    return '<details class="vf"><summary><span class="vf-t">' + esc(s.thema) + '</span>' +
      '<span class="vf-h ac-tech" data-ab="2">' + esc(s.anlage) + ' · ' + s.haus + '. Haus</span>' +
      '</summary><ul>' + s.fragen.map(function(q){
        return '<li>' + esc(q) + '</li>'; }).join('') + '</ul></details>';
  });
  sp.forEach(function(x){
    h.push('<details class="vf vf-sp"><summary><span class="vf-t">Spannung: ' +
      esc(x.a) + ' und ' + esc(x.b) + '</span>' +
      '<span class="vf-h ac-tech" data-ab="2">' + x.ab.toFixed(1) + '°</span></summary><ul>' +
      x.fragen.map(function(q){ return '<li>' + esc(q) + '</li>'; }).join('') +
      '</ul></details>');
  });
  z.innerHTML = h.join('');
  try{ if(window.AC_NIV) AC_NIV.anwenden(); }catch(e){}
}

/* ── Die festen Texte ───────────────────────────────────── */
function festBauen(){
  el('bgzwischenh').textContent = C_ZWISCHEN.titel;
  el('bgzwischen').innerHTML = C_ZWISCHEN.punkte.map(function(p){
    return '<div class="zw"><b>' + esc(p[0]) + '</b><span>' + esc(p[1]) + '</span></div>';
  }).join('');

  el('bgwennh').textContent = C_WENN.titel;
  el('bgwennsub').textContent = C_WENN.sub;
  el('bgwenn').innerHTML = C_WENN.paare.map(function(p){
    return '<div class="we2"><p class="we2-s">' + esc(p[0]) + '</p>' +
      '<p class="we2-a">' + esc(p[1]) + '</p></div>';
  }).join('');

  el('bggrenzenh').textContent = C_GRENZEN.titel;
  el('bggrenzensub').textContent = C_GRENZEN.sub;
  el('bghart').innerHTML = '<div class="gr-t">Die harten Grenzen</div>' +
    C_GRENZEN.hart.map(function(g){
      return '<div class="gr"><b>' + esc(g[0]) + '</b><span>' + esc(g[1]) + '</span></div>';
    }).join('');

  var K = C_GRENZEN.krise;
  el('bgkrise').innerHTML = '<div class="kr"><div class="kr-t">' + esc(K.titel) + '</div>' +
    '<p>' + esc(K.text) + '</p>' +
    '<p class="kr-s">' + esc(K.satz) + '</p>' +
    '<ul class="kr-l">' + K.stellen.map(function(s){
      return '<li><b>' + esc(s[0]) + '</b><span>' + esc(s[1]) + '</span></li>'; }).join('') +
    '</ul><p class="kr-d">' + esc(K.danach) + '</p></div>';

  el('bgweich').innerHTML = '<div class="gr-t">Die weichen Grenzen</div>' +
    C_GRENZEN.weich.map(function(g){
      return '<div class="gr gr-w"><b>' + esc(g[0]) + '</b><span>' + esc(g[1]) + '</span></div>';
    }).join('');

  el('bgdrei').innerHTML = '<div class="dr"><div class="dr-t">' + esc(C_GRENZEN.drei.titel) +
    '</div>' + C_GRENZEN.drei.saetze.map(function(s){
      return '<p>' + esc(s) + '</p>'; }).join('') + '</div>';
}

function sprungBauen(){
  var z = el('bgsprung'); if(!z) return;
  z.innerHTML = Array.prototype.map.call(D.querySelectorAll('.bg-ab[data-sprung]'),
    function(s){
      return '<a href="#' + s.id + '">' + esc(s.getAttribute('data-sprung')) + '</a>';
    }).join('');
}

function neu(){
  PROFIL = profil();
  if(!PROFIL){
    el('bgsitzung').innerHTML = '<p class="bg-nix">' + esc(C_KOPF.keinProfil) + '</p>';
    el('bgfragen').innerHTML = ''; el('bgjetzt').innerHTML = '';
    P = null;
    rahmenBauen(); leisteBauen(); festBauen();
    return;
  }
  try{ P = chartVon(PROFIL); }catch(e){ P = null; }
  var d = el('bgdossier');
  if(d) d.setAttribute('href', 'dossier.html');
  wenBauen(); rahmenBauen(); leisteBauen(); sitzungBauen();
  jetztBauen(); vorratBauen(); festBauen();
}

function start(){
  sprungBauen();
  neu();
  try{ if(window.AC_NIV) AC_NIV.leiste(el('bgniv'),
    function(){ sitzungBauen(); vorratBauen(); jetztBauen(); }); }catch(e){}
  try{ window.addEventListener('ac-profil', neu); }catch(e){}
}
if(D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start();
})();
