/* ───────────────────────────────────────────────────────────────
   wahl-app.js — die Leiste, mit der ein Mensch seine Bereiche
   wählt. Die Auswahl liegt in AC_P neben dem Profil und gilt
   deshalb für die ganze Plattform, nicht für eine Seite.

   In dieser Datei steht kein Satz: die Wörter kommen aus
   wahl-daten.js, die Bereiche aus lebensbereiche.js. Eine Seite
   erfährt von einer Änderung über das Ereignis "ac-bereiche" und
   zeichnet sich dann neu.

   Alle eigenen Namen mit bw bzw. BW_ davor, damit nichts mit der
   Rechen-Engine kollidiert.
   ─────────────────────────────────────────────────────────────── */
(function(){
'use strict';

function bwLB(){ return window.AC_LB; }
function bwText(){ return window.AC_WAHL_TEXT || {}; }

function bwEsc(s){
  return String(s === undefined || s === null ? '' : s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* Lücken füllen, dann maskieren. In dieser Reihenfolge kann kein
   Wert HTML einschmuggeln. */
function bwSatz(vorlage, werte){
  var t = String(vorlage || '').replace(/\{([a-zA-Z]+)\}/g, function(_, k){
    return (werte && werte[k] !== undefined) ? String(werte[k]) : '';
  });
  return bwEsc(t);
}

/* ── Zustand ────────────────────────────────────────────────── */

function bwGewaehlt(){
  var L = bwLB(); if(!L) return [];
  var roh = [];
  try{ roh = (window.AC_P && AC_P.bereiche()) || []; }catch(e){ roh = []; }
  return L.normieren(roh);
}

function bwSetzen(ks){
  var L = bwLB(); if(!L) return;
  var n = L.normieren(ks);
  /* Alle zehn gewählt heißt dasselbe wie keine Auswahl. Dann wird
     auch nichts gespeichert — sonst müsste jede Seite zwei Fälle
     unterscheiden, die dasselbe bedeuten. */
  if(n.length === L.ZAHL) n = [];
  try{ if(window.AC_P) AC_P.setzeBereiche(n); }catch(e){}
  bwLeisteZeichnen();
  try{ window.dispatchEvent(new CustomEvent('ac-bereiche', { detail:{ bereiche:n } })); }
  catch(e){}
}

function bwUmschalten(k){
  var L = bwLB(); if(!L) return;
  var n = bwGewaehlt();
  /* Ohne Auswahl ist alles gewählt. Der erste Griff auf einen
     Bereich bedeutet deshalb: nur dieser. */
  if(!n.length){ bwSetzen([k]); return; }
  var i = n.indexOf(k);
  if(i < 0) n = n.concat([k]);
  else n = n.slice(0, i).concat(n.slice(i + 1));
  /* Der letzte Bereich lässt sich nicht abwählen: eine leere Seite
     wäre keine Einstellung, sondern ein Defekt. */
  if(!n.length) return;
  bwSetzen(n);
}

/* ── Die Leiste ─────────────────────────────────────────────── */

function bwTipp(n){
  var T = bwText(), L = bwLB();
  if(!n.length || n.length === L.ZAHL) return bwSatz(T.alle);
  return bwSatz(T.auswahl, { zahl:n.length });
}

function bwLeisteZeichnen(){
  var L = bwLB(), T = bwText();
  var kaesten = document.querySelectorAll('#berwahl, .bw-leiste');
  if(!L || !kaesten.length) return;
  var n = bwGewaehlt(), alle = !n.length;
  var h = '<span class="bw-lab">' + bwEsc(T.lab) + '</span><div class="bw-knoepfe">';
  h += '<button type="button" class="bw-alle" data-bw="" aria-pressed="' +
       (alle ? 'true' : 'false') + '">' + bwEsc(T.alleKnopf) + '</button>';
  for(var i=0;i<L.BEREICHE.length;i++){
    var B = L.BEREICHE[i], an = alle ? false : (n.indexOf(B.k) >= 0);
    h += '<button type="button" data-bw="' + bwEsc(B.k) + '" aria-pressed="' +
         (an ? 'true' : 'false') + '">' + bwEsc(B.name) + '</button>';
  }
  h += '</div><p class="bw-tipp">' + bwTipp(n) + '</p>';
  Array.prototype.forEach.call(kaesten, function(box){
    box.className = 'bw-leiste';
    box.innerHTML = h;
    if(box.getAttribute('data-bw-an')) return;
    box.setAttribute('data-bw-an', '1');
    box.addEventListener('click', function(e){
      var b = e.target.closest ? e.target.closest('button[data-bw]') : null;
      if(!b) return;
      var k = b.getAttribute('data-bw');
      if(!k) bwSetzen([]); else bwUmschalten(k);
    });
  });
}

function bwStart(){ bwLeisteZeichnen(); }
if(document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', bwStart);
else bwStart();

window.AC_WAHL = {
  bereiche: bwGewaehlt,
  setzen: bwSetzen,
  alle: function(){ return !bwGewaehlt().length; },
  istGewaehlt: function(k){ return bwLB() ? bwLB().istGewaehlt(k, bwGewaehlt()) : true; },
  felder: function(){ return bwLB() ? bwLB().felder(bwGewaehlt()) : []; },
  leiste: bwLeisteZeichnen,
  satz: bwSatz
};

})();
