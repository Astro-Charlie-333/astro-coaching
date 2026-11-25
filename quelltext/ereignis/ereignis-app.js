/* Astro-Charlie · Ereignisse lesen — die Anzeige.
   Rechnet nichts und formuliert nichts. Setzt nur zusammen,
   was Daten und Rechner liefern, und zieht bei Stufenwechsel nach.

   Seit dem 2026-11-25 steht hier kein Satz und keine Beschriftung
   mehr: alles davon in ereignis-daten.js als EG_T. Eingesetzt wird
   mit AC_FUELL aus kern/fuellen.js, „dein" bildet B_BEUGE aus
   kern/bahn-daten.js. bau-ereignis.py bricht ab, sobald eine der
   drei Formen zurückkommt (Aufgabe 63, aus 34 und 38). */
(function(){
'use strict';
var D = window.AC_EREIG, R = window.AC_EREIGR, T = D.T;
function el(id){ return document.getElementById(id); }
function esc(s){ return String(s).replace(/[&<>"]/g, function(c){
  return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]; }); }
/* Zwei Register: ein Paar ['Alltag','Fach'] oder ein String für beides. */
function w(v, fach){ return Array.isArray(v) ? v[fach ? 1 : 0] : v; }
function stufe(){
  try{ if(window.AC_NIV && AC_NIV.stufe) return AC_NIV.stufe(); }catch(e){}
  return 2;
}

/* ── 1 · Der Stapel: ein Hinweis, zwei, drei ───────────── */
function stapelBauen(){
  var z = el('egstapel'); if(!z) return;
  z.innerHTML = T.stapel.map(function(s, i){
    return '<div class="eg-st eg-st-' + i + '">'
         + '<div class="eg-st-zahl">' + esc(s.zahl) + '</div>'
         + '<div class="eg-st-name">' + esc(s.name) + '</div>'
         + '<div class="eg-st-text">' + esc(s.text) + '</div></div>';
  }).join('');
}

/* ── 2 · Die fünf Bausteinkarten ───────────────────────── */
function kartenBauen(){
  var z = el('egkarten'); if(!z) return;
  var n = stufe(), fach = n >= 1;
  z.innerHTML = D.BAUSTEINE.map(function(b){
    var titel = w(b.titel, fach);
    var liste = b.liste.map(function(p){
      var name = p[0];
      /* Auf Stufe 0 steht die Wirkung vorn und der Fachname gar nicht da. */
      if(!fach) return '<li><span class="eg-li-b">' + esc(grossErst(p[1])) + '</span></li>';
      return '<li><span class="eg-li-n">' + esc(name) + '</span> '
           + '<span class="eg-li-w">' + esc(p[1]) + '</span></li>';
    }).join('');
    return '<div class="eg-k">'
      + '<div class="eg-k-kopf"><span class="eg-k-nr">' + esc(b.nr) + '</span>'
      + '<span class="eg-k-frage">' + esc(b.frage) + '</span></div>'
      + '<h3>' + esc(titel) + '</h3>'
      + '<p class="eg-k-kurz">' + esc(b.kurz) + '</p>'
      + '<p>' + esc(w(b.text, fach)) + '</p>'
      + '<ul class="eg-k-liste">' + liste + '</ul>'
      + '</div>';
  }).join('');
}
function grossErst(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

/* ── 3 · Der Mischer ───────────────────────────────────── */
var wahl = { planet:R.START.planet, zeichen:R.START.zeichen, haus:R.START.haus,
             aspekt:R.START.aspekt, orbis:R.START.orbis };
var ORBWERTE = R.ORBWERTE;

/* Auf Stufe 0 trägt eine Rung des Lautstärkereglers nur den Namen
   der Klasse, und zwei Orbiswerte können in dieselbe Klasse fallen:
   0,2° und 0,5° sind beide „Volltreffer". Dann stand dort zweimal
   dasselbe Wort, und eine der beiden Rungen war eine Wahl ohne
   Unterschied (gefunden am 2026-11-25). Also eine Rung je Klasse.
   Sichtbar ändert das sonst nichts — auf Stufe 0 steht kein Grad
   auf der Seite, Satz und Zerlegung lesen allein die Lautstärke. */
function orbRungen(fach){
  if(fach) return ORBWERTE;
  var gesehen = {}, raus = [];
  ORBWERTE.forEach(function(o){
    var k = R.laut(o).n;
    if(gesehen[k]) return;
    gesehen[k] = true; raus.push(o);
  });
  return raus;
}
/* Wer von Stufe 1 herunterschaltet, hat vielleicht die Rung gewählt,
   die es auf Stufe 0 nicht gibt. Dann rückt die Wahl auf die Rung
   derselben Lautstärke — dieselbe Klasse, also derselbe Text. */
function orbAngleichen(rungen){
  if(rungen.indexOf(wahl.orbis) >= 0) return;
  var k = R.laut(wahl.orbis).n;
  for(var i = 0; i < rungen.length; i++)
    if(R.laut(rungen[i]).n === k){ wahl.orbis = rungen[i]; return; }
}

function reglerBauen(){
  var pl = el('egpl'), zc = el('egzc'), hs = el('eghs'), as = el('egas'), or = el('egor');
  if(!pl) return;
  var n = stufe(), fach = n >= 1;
  pl.innerHTML = R.PLANETEN.map(function(p){
    var t = fach ? p : grossErst(kraftWort(p));
    return '<option value="' + esc(p) + '"' + (p===wahl.planet?' selected':'') + '>' + esc(t) + '</option>';
  }).join('');
  zc.innerHTML = R.ZEICHEN.map(function(z, i){
    return '<option value="' + i + '"' + (i===wahl.zeichen?' selected':'') + '>'
         + esc(fach ? z : grossErst(T.stilZeichen[i])) + '</option>'; }).join('');
  hs.innerHTML = R.H0.map(function(h, i){
    return '<option value="' + i + '"' + (i===wahl.haus?' selected':'') + '>'
         + esc(fach ? AC_FUELL(T.wahlHaus, {n:(i+1), was:T.kurzHaus[i]}) : grossErst(h))
         + '</option>'; }).join('');
  as.innerHTML = R.ASPEKTE.map(function(a, i){
    return '<option value="' + i + '"' + (i===wahl.aspekt?' selected':'') + '>'
         + esc(fach ? a : T.stilWinkel[i]) + '</option>'; }).join('');
  var rungen = orbRungen(fach);
  orbAngleichen(rungen);
  or.innerHTML = rungen.map(function(o){
    var L = R.laut(o);
    var t = fach ? AC_FUELL(T.wahlOrbis, {grad:R.komma(o,1), laut:L.n}) : L.n;
    return '<option value="' + o + '"' + (o===wahl.orbis?' selected':'') + '>' + esc(t) + '</option>';
  }).join('');
}
/* „dein" steht an einer Stelle: B_BEUGE kennt das Geschlecht, das
   in EG_T.punkt am Wort hängt (kern/bahn-daten.js). */
function kraftWort(p){
  var k = T.punkt[p];
  return k ? B_BEUGE(k, 'nom') : p;
}

function mischerZeigen(){
  var s = el('egsatz'), zl = el('egzerlegt'); if(!s) return;
  var n = stufe();
  s.innerHTML = '<p>' + esc(R.satz(wahl, n)) + '</p>';
  zl.innerHTML = R.zerlegung(wahl, n).map(function(t){
    return '<div class="eg-z"><span class="eg-z-f">' + esc(t.frage) + '</span>'
         + '<span class="eg-z-w">' + esc(t.wert) + '</span></div>';
  }).join('');
}
function mischerBinden(){
  var ids = [['egpl','planet'],['egzc','zeichen'],['eghs','haus'],['egas','aspekt'],['egor','orbis']];
  ids.forEach(function(p){
    var e = el(p[0]); if(!e) return;
    e.addEventListener('change', function(){
      wahl[p[1]] = (p[1]==='planet') ? e.value : parseFloat(e.value);
      mischerZeigen();
    });
  });
  var wf = el('egwuerfel');
  if(wf) wf.addEventListener('click', function(){
    wahl = R.zufall(); reglerBauen(); mischerZeigen();
  });
}

/* ── 4 · Rezepte ───────────────────────────────────────── */
function rezepteBauen(){
  var z = el('egrezepte'); if(!z) return;
  z.innerHTML = D.REZEPTE.map(function(r){
    var formel = r.formel.map(function(f){ return '<span class="eg-f-t">' + esc(f) + '</span>'; })
                 .join('<span class="eg-f-p">+</span>');
    return '<div class="eg-r">'
      + '<h3>' + esc(r.name) + '</h3>'
      + '<div class="eg-formel">' + formel + '<span class="eg-f-g">=</span>'
      + '<span class="eg-f-e">' + esc(r.ergebnis) + '</span></div>'
      + '<ul>' + r.zutaten.map(function(t){ return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>'
      + '<p class="eg-ehrlich-klein"><b>' + esc(T.rEhrlich) + '</b> ' + esc(r.ehrlich) + '</p>'
      + '</div>';
  }).join('');
}

/* ── 5 · Menschen im Chart ─────────────────────────────── */
var mWahl = 'mutter';
function menschenBauen(){
  var z = el('egmwahl'); if(!z) return;
  z.innerHTML = D.MENSCHEN.map(function(m){
    return '<button type="button" class="eg-mb" data-m="' + esc(m.k) + '" '
         + 'aria-pressed="' + (m.k===mWahl) + '">'
         + '<span class="eg-mb-i" aria-hidden="true">' + esc(m.icon) + '</span>'
         + esc(m.name) + '</button>';
  }).join('');
  Array.prototype.forEach.call(z.querySelectorAll('button[data-m]'), function(b){
    b.addEventListener('click', function(){
      mWahl = b.getAttribute('data-m');
      Array.prototype.forEach.call(z.querySelectorAll('button[data-m]'), function(x){
        x.setAttribute('aria-pressed', String(x.getAttribute('data-m')===mWahl)); });
      personZeigen();
    });
  });
  personZeigen();
  tabelleBauen();
}
function personZeigen(){
  var z = el('egperson'); if(!z) return;
  var fach = stufe() >= 1, m = null;
  for(var i=0;i<D.MENSCHEN.length;i++) if(D.MENSCHEN[i].k===mWahl) m = D.MENSCHEN[i];
  if(!m) return;
  var asp = w(m.aspekte, fach);
  z.innerHTML = '<div class="eg-p">'
    + '<div class="eg-p-kopf"><span class="eg-p-i" aria-hidden="true">' + esc(m.icon) + '</span>'
    + '<h3>' + esc(m.name) + '</h3></div>'
    + '<div class="eg-p-zeilen">'
    + '<div><span class="eg-p-lab">' + esc(T.pWo) + '</span>'
    + '<span class="eg-p-wert">' + esc(w(m.wo, fach)) + '</span></div>'
    + '<div><span class="eg-p-lab">' + esc(T.pKraft) + '</span>'
    + '<span class="eg-p-wert">' + esc(w(m.kraft, fach)) + '</span></div>'
    + '</div>'
    + '<p>' + esc(w(m.text, fach)) + '</p>'
    + '<h4>' + esc(T.pAspekte) + '</h4>'
    + '<ul class="eg-p-asp">' + asp.map(function(a){ return '<li>' + esc(a) + '</li>'; }).join('') + '</ul>'
    + '<p class="eg-p-streit"><b>' + esc(T.pStreit) + '</b> ' + esc(w(m.streit, fach)) + '</p>'
    + '</div>';
}
function tabelleBauen(){
  var t = el('egmtab'); if(!t) return;
  var fach = stufe() >= 1;
  var sp = fach ? T.tabHaus : T.tabBereich;
  t.innerHTML = '<thead><tr><th>' + esc(T.tabVerbindung) + '</th><th>' + esc(sp)
    + '</th><th>' + esc(T.tabKraft) + '</th></tr></thead><tbody>'
    + D.MENSCHEN.map(function(m){
        return '<tr><td data-sp="' + esc(T.tabVerbindung) + '">' + esc(m.name) + '</td>'
             + '<td data-sp="' + esc(sp) + '">' + esc(w(m.wo, fach)) + '</td>'
             + '<td data-sp="' + esc(T.tabKraft) + '">' + esc(w(m.kraft, fach)) + '</td></tr>';
      }).join('')
    + '</tbody>';
}

/* ── 6 · Durchgerechnete Fälle ─────────────────────────── */
function faelleBauen(){
  var z = el('egfaelle'); if(!z) return;
  z.innerHTML = D.FAELLE.map(function(f){
    var schritte = f.schritte.map(function(s, i){
      var letzte = (i === f.schritte.length - 1);
      return '<div class="eg-s' + (letzte ? ' eg-s-summe' : '') + '">'
        + '<div class="eg-s-nr">' + esc(s[0]) + '</div>'
        + '<div class="eg-s-was">' + esc(s[1]) + '</div>'
        + '<div class="eg-s-text">' + esc(s[2]) + '</div></div>';
    }).join('');
    return '<div class="eg-fall">'
      + '<h3>' + esc(f.name) + '</h3>'
      + '<div class="eg-schritte">' + schritte + '</div>'
      + '<div class="eg-deutung"><b>' + esc(T.fDeutung) + '</b> ' + esc(f.deutung) + '</div>'
      + '<div class="eg-nicht">' + esc(f.nicht) + '</div>'
      + '</div>';
  }).join('');
}

/* ── 7 · Quiz ──────────────────────────────────────────── */
var qAntwort = {};
function quizBauen(){
  var z = el('egquiz'); if(!z) return;
  z.innerHTML = D.QUIZ.map(function(q, i){
    var opt = q.a.map(function(a, j){
      return '<button type="button" class="eg-q-opt" data-q="' + i + '" data-a="' + j + '">'
           + esc(a) + '</button>';
    }).join('');
    return '<div class="eg-q" data-qi="' + i + '">'
      + '<div class="eg-q-nr">'
      + esc(AC_FUELL(T.qNr, {i:(i+1), alle:D.QUIZ.length})) + '</div>'
      + '<p class="eg-q-f">' + esc(q.f) + '</p>'
      + '<div class="eg-q-opts">' + opt + '</div>'
      + '<div class="eg-q-echo" id="egqe' + i + '"></div></div>';
  }).join('');
  Array.prototype.forEach.call(z.querySelectorAll('.eg-q-opt'), function(b){
    b.addEventListener('click', function(){
      var qi = +b.getAttribute('data-q'), ai = +b.getAttribute('data-a');
      if(qAntwort[qi] !== undefined) return;
      qAntwort[qi] = ai;
      var q = D.QUIZ[qi], richtig = (ai === q.r);
      var box = z.querySelector('.eg-q[data-qi="' + qi + '"]');
      Array.prototype.forEach.call(box.querySelectorAll('.eg-q-opt'), function(x){
        var xi = +x.getAttribute('data-a');
        x.disabled = true;
        if(xi === q.r) x.classList.add('ist-richtig');
        else if(xi === ai) x.classList.add('ist-falsch');
      });
      el('egqe' + qi).innerHTML = '<b>' + esc(richtig ? T.qJa : T.qNein) + '</b> ' + esc(q.e);
      standZeigen();
    });
  });
  standZeigen();
}
function standZeigen(){
  var s = el('egquizstand'); if(!s) return;
  var alle = D.QUIZ.length, n = 0, r = 0;
  for(var k in qAntwort){ if(Object.prototype.hasOwnProperty.call(qAntwort,k)){
    n++; if(qAntwort[k] === D.QUIZ[k].r) r++; } }
  if(!n){ s.textContent = ''; return; }
  if(n < alle){
    s.innerHTML = esc(AC_FUELL(T.qOffen, {r:r, n:n, offen:(alle - n)}));
    return;
  }
  s.innerHTML = '<b>' + esc(AC_FUELL(T.qGanz, {r:r, alle:alle})) + '</b> '
    + esc(r === alle ? T.qAlles : r >= 3 ? T.qViel : T.qWenig);
}

/* ── Alles zusammen ────────────────────────────────────── */
function stufenAbhaengig(){
  kartenBauen();
  reglerBauen();
  mischerZeigen();
  personZeigen();
  tabelleBauen();
}
function start(){
  stapelBauen();
  stufenAbhaengig();
  mischerBinden();
  rezepteBauen();
  menschenBauen();
  faelleBauen();
  quizBauen();
  var neu = el('egquizneu');
  if(neu) neu.addEventListener('click', function(){ qAntwort = {}; quizBauen(); });
  window.addEventListener('ac-niveau', stufenAbhaengig);
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
else start();
})();
