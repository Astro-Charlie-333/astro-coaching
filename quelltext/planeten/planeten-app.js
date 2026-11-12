/* ───────────────────────────────────────────────────────────────
   planeten-app.js — die Anzeige der Planetenseite.

   Diese Datei enthält keinen Satz und keine Rechnung. Sie holt
   Sätze aus planeten-daten.js, Zyklen aus planeten-rechner.js, den
   Himmel aus rituale/engine.js und setzt zusammen. „dein" setzt
   B_BEUGE aus kern/bahn-daten.js — bau-planeten.py bricht ab, sobald
   hier ein Satz oder ein „dein" von Hand auftaucht.

   Eigene Namen mit pl bzw. PL davor, damit nichts mit der Engine
   kollidiert.
   ─────────────────────────────────────────────────────────────── */
(function(){
'use strict';
var T = PL_TEXT;
var el = function(id){ return document.getElementById(id); };
var NS = 'http://www.w3.org/2000/svg';
function plSvg(t, a){ var e = document.createElementNS(NS, t); for(var k in a) e.setAttribute(k, a[k]); return e; }
function plEsc(s){ return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function plFuell(v, w){ return String(v).replace(/\{([a-zA-Z]+)\}/g, function(_, k){ return (w && w[k] !== undefined) ? String(w[k]) : ''; }); }
var ruhig = function(){ return matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'; };

function plProfil(){ try{ var a = AC_P.alle(); return AC_P.aktives() || AC_P.eigenes() || a[0] || null; }catch(e){ return null; } }
var P = plProfil(), C = null, ZYK = [];
if(P){ try{ C = chartVon(P); ZYK = plZyklen(P); }catch(e){ C = null; ZYK = []; } }
function plName(){ var n = ''; try{ n = AC_P.anzeige(P, AC_P.zeigeNamen()); }catch(e){} return n; }

/* Reihenfolge der Bahnen: innen die schnellen, außen die langsamen. */
var BAHN = ['Mond', 'Merkur', 'Venus', 'Sonne', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptun', 'Pluto'];
var plWahl = 0, plZWahl = 'Sonne';
function plIndex(k){ for(var i = 0; i < PL_KRAFT.length; i++) if(PL_KRAFT[i].k === k) return i; return 0; }

function plProfilZeile(){
  var b = el('plprofil');
  b.innerHTML = C ? plFuell(T.profilMit, {name:'<b>' + plEsc(plName()) + '</b>'}) : T.profilOhne;
}

function plBahn(){
  var s = el('plbahn'); while(s.firstChild) s.removeChild(s.firstChild);
  var cx = 200, cy = 200, jd = heuteJD();
  s.appendChild(plSvg('circle', {cx:cx, cy:cy, r:5, 'class':'erde'}));
  BAHN.forEach(function(k, i){
    var r = 30 + i * 17;
    s.appendChild(plSvg('circle', {cx:cx, cy:cy, r:r, 'class':(k === 'Sonne' || k === 'Mond') ? 'pl-ring pl-ring-licht' : 'pl-ring'}));
  });
  BAHN.forEach(function(k, i){
    var r = 30 + i * 17, l = C ? C[k] : lon(k, jd), a = l * Math.PI / 180;
    var x = cx - r * Math.cos(a), y = cy + r * Math.sin(a), K = PL_KRAFT[plIndex(k)];
    var g = plSvg('g', {role:'button', tabindex:0, 'aria-label':k + ': ' + K.titel,
                        'aria-pressed':String(plIndex(k) === plWahl), 'class':plIndex(k) === plWahl ? 'an' : ''});
    g.appendChild(plSvg('circle', {cx:x, cy:y, r:12, 'class':'punkt'}));
    var t = plSvg('text', {x:x, y:y + 0.5, 'class':'glyph'}); t.textContent = K.gl; g.appendChild(t);
    var w = function(){ plWahl = plIndex(k); plMarkiere(true); };
    g.addEventListener('click', w);
    g.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); w(); } });
    s.appendChild(g);
  });
  el('plbahnwer').textContent = C ? T.bahnGeburt : T.bahnHeute;
}

function plMarkiere(springen){
  Array.prototype.forEach.call(el('plbahn').querySelectorAll('g[role=button]'), function(g){
    var an = g.getAttribute('aria-label').split(':')[0] === PL_KRAFT[plWahl].k;
    g.setAttribute('aria-pressed', String(an)); g.setAttribute('class', an ? 'an' : '');
  });
  Array.prototype.forEach.call(el('plkarten').children, function(c, i){ c.classList.toggle('an', i === plWahl); });
  if(springen){ var c = el('plkarten').children[plWahl]; if(c) c.scrollIntoView({behavior:ruhig(), block:'nearest'}); }
}

function plKarten(){
  var box = el('plkarten'); box.innerHTML = '';
  PL_KRAFT.forEach(function(K, i){
    var k = document.createElement('article'); k.className = 'pl-karte'; k.id = 'kraft-' + i;
    k.innerHTML = '<div class="pl-gl" aria-hidden="true"></div><div class="pl-inh"><h3></h3><p class="pl-name"></p>'
      + '<p class="pl-gruppe ac-tech" data-ab="1"></p><p class="pl-was"></p><p class="pl-frage"></p>'
      + '<div class="pl-bei"><p class="pl-bei-kopf"></p><p class="pl-bei-text"></p><p class="pl-bei-tech ac-tech" data-ab="1"></p></div></div>';
    k.querySelector('.pl-gl').textContent = K.gl;
    k.querySelector('h3').textContent = K.titel;
    k.querySelector('.pl-name').textContent = K.k;
    k.querySelector('.pl-gruppe').textContent = PL_GRUPPE[K.gruppe];
    k.querySelector('.pl-was').textContent = K.was;
    k.querySelector('.pl-frage').textContent = K.frage;
    var bei = k.querySelector('.pl-bei');
    if(C){
      var zi = Math.floor(C[K.k] / 30);
      bei.querySelector('.pl-bei-kopf').textContent = plFuell(T.beiKopf, {wer:B_BEUGE(B_PUNKT(K.k), 'nom')});
      bei.querySelector('.pl-bei-text').textContent = PL_ZEICHEN[K.k] ? PL_ZEICHEN[K.k].z[zi] : PL_AUSSEN;
      bei.querySelector('.pl-bei-tech').textContent = plFuell(T.beiTech, {planet:K.k, zeichen:SIGNS[zi], haus:haus(C, C[K.k])});
    } else { bei.remove(); }
    k.addEventListener('click', function(){ plWahl = i; plMarkiere(false); });
    box.appendChild(k);
  });
}

function plZeichen(){
  var Z = PL_ZEICHEN[plZWahl];
  Array.prototype.forEach.call(document.querySelectorAll('[data-k]'), function(b){
    b.setAttribute('aria-selected', String(b.getAttribute('data-k') === plZWahl));
  });
  el('plzkopf').innerHTML = '<p class="kurz"></p><p></p>';
  el('plzkopf').children[0].textContent = Z.kurz;
  el('plzkopf').children[1].textContent = Z.tip;
  var box = el('plzeichen'); box.innerHTML = '';
  var bei = C ? Math.floor(C[plZWahl] / 30) : -1;
  SIGNS.forEach(function(name, i){
    var d = document.createElement('article');
    d.className = 'pl-z ' + PL_ELEMENT[i % 4] + (i === bei ? ' pl-z-bei' : '');
    d.innerHTML = '<div class="pl-z-kopf"><span class="gl" aria-hidden="true"></span><b></b><span class="pl-el"></span></div><p></p>';
    d.querySelector('.gl').textContent = GLZ[i];
    d.querySelector('b').textContent = name;
    var e = d.querySelector('.pl-el'); e.textContent = PL_ZART[i]; e.classList.add(PL_ELEMENT[i % 4]);
    d.querySelector('p').textContent = Z.z[i];
    if(Z.wuerde[i]){ var w = document.createElement('p'); w.className = 'wuerde'; w.textContent = Z.wuerde[i]; d.appendChild(w); }
    if(i === bei){ var c = document.createElement('span'); c.className = 'pl-chip pl-chip-bei'; c.textContent = T.zeichenBei; d.querySelector('.pl-z-kopf').appendChild(c); }
    box.appendChild(d);
  });
}

function plZeile(tab, zellen, klasse){
  var tr = document.createElement('tr'); if(klasse) tr.className = klasse;
  zellen.forEach(function(z){ var td = document.createElement('td'); td.innerHTML = z; tr.appendChild(td); });
  tab.appendChild(tr);
}
function plKopfzeile(tab){
  var tr = document.createElement('tr');
  [T.spalteJahr, T.spalteAlter, T.spalteZyklus].forEach(function(s){ var th = document.createElement('th'); th.textContent = s; tr.appendChild(th); });
  tab.appendChild(tr);
}
function plMarke(an){ return an ? '<span class="pl-marke">' + plEsc(T.naechstes) + '</span>' : ''; }

function plZyklenAnzeige(){
  var tab = el('plzyklen'); tab.innerHTML = ''; plKopfzeile(tab);
  if(C){
    el('pljahrbox').hidden = true;
    el('plzyklenwer').textContent = plFuell(T.zyklenMit, {name:plName()});
    var jetzt = heuteJD(), naechst = -1;
    ZYK.forEach(function(z, i){ if(naechst < 0 && z.jd >= jetzt) naechst = i; });
    ZYK.forEach(function(z, i){
      var d = datVon(z.jd), Z = PL_ZYKLUS[z.art];
      plZeile(tab, ['<span class="mono">' + plEsc(MN[d.getMonth()] + ' ' + d.getFullYear()) + '</span>',
                    '<span class="mono">' + z.alter + '</span>',
                    '<b>' + plEsc(Z.titel) + '</b>' + plMarke(i === naechst) + ((z.art !== 'Jupiter' || i === naechst) ? '<span class="was">' + plEsc(Z.was) + '</span>' : '')],
              z.jd < jetzt ? 'vorbei' : (i === naechst ? 'naechstes' : ''));
    });
    return;
  }
  var y = parseInt(el('pljahr').value, 10), heute = new Date().getFullYear(), gut = y >= 1900 && y <= 2030;
  el('plzyklenwer').textContent = (el('pljahr').value && !gut) ? T.jahrFehler
    : (gut ? T.zyklenOhne + ' ' + plFuell(T.alterJetzt, {jahr:heute, alter:heute - y}) : T.zyklenOhne);
  var naechst = -1;
  if(gut) PL_MARKEN.forEach(function(m, i){ if(naechst < 0 && y + m.a >= heute) naechst = i; });
  PL_MARKEN.forEach(function(m, i){
    plZeile(tab, ['<span class="mono">' + (gut ? (y + m.a) : '&ndash;') + '</span>',
                  '<span class="mono">' + m.a + '</span>',
                  '<b>' + plEsc(m.t) + '</b>' + plMarke(i === naechst) + '<span class="was">' + plEsc(m.d) + '</span>'],
            gut && y + m.a < heute ? 'vorbei' : (i === naechst ? 'naechstes' : ''));
  });
}

function plQuiz(){
  var box = el('plquiz'); box.innerHTML = '';
  PL_QUIZ.forEach(function(it){
    var d = document.createElement('div'); d.className = 'pl-q';
    var p = document.createElement('p'); p.textContent = it.q; d.appendChild(p);
    var o = document.createElement('div'); o.className = 'pl-opts';
    var ex = document.createElement('p'); ex.className = 'pl-expl'; ex.textContent = it.e; ex.hidden = true;
    it.o.forEach(function(lab, j){
      var b = document.createElement('button'); b.type = 'button'; b.textContent = lab;
      b.addEventListener('click', function(){
        Array.prototype.forEach.call(o.children, function(x, i){ x.className = i === it.r ? 'richtig' : ''; x.setAttribute('aria-pressed', 'false'); });
        if(j !== it.r) b.className = 'falsch';
        b.setAttribute('aria-pressed', 'true'); ex.hidden = false;
      });
      o.appendChild(b);
    });
    d.appendChild(o); d.appendChild(ex); box.appendChild(d);
  });
}

/* Alte Adressen planet-*.html kommen mit #zeichen-<planet> an. */
function plAnker(){
  var h = (location.hash || '').slice(1), b = h ? document.getElementById(h) : null;
  if(b && b.getAttribute('data-k')){
    plZWahl = b.getAttribute('data-k'); plZeichen();
    var s = el('zeichen'); if(s && s.checkVisibility && s.checkVisibility()) s.scrollIntoView({behavior:'auto', block:'start'});
  }
}

function plLos(){
  plProfilZeile(); plKarten(); plBahn(); plMarkiere(false); plZeichen(); plZyklenAnzeige(); plQuiz();
  Array.prototype.forEach.call(document.querySelectorAll('[data-k]'), function(b){
    b.addEventListener('click', function(){ plZWahl = b.getAttribute('data-k'); plZeichen(); });
  });
  el('pljahr').addEventListener('input', plZyklenAnzeige);
  el('plstufe').addEventListener('click', function(){ if(window.AC_NIV) AC_NIV.setzen(1); plAnker(); });
  window.addEventListener('hashchange', plAnker);
  plAnker();
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', plLos); else plLos();
})();
