/* ───────────────────────────────────────────────────────────────
   monat-app.js — die Anzeige des Monatsberichts.

   Diese Datei enthält keinen Satz und keine Rechnung. Sie holt
   Zahlen aus AC_MONAT, Sätze aus AC_MONAT_TEXT und setzt beides
   zusammen. Lücken in den Sätzen heißen {name} und werden
   gefüllt, nie erweitert — bau-monat.py bricht ab, sobald hier
   ein ganzer Satz auftaucht.

   Alle eigenen Namen mit mb bzw. MB_ davor, damit nichts mit der
   Engine kollidiert.
   ─────────────────────────────────────────────────────────────── */
(function(){
'use strict';

var T = window.AC_MONAT_TEXT, R = window.AC_MONAT;

var MB_profil = null, MB_versatz = 0;

function mbEl(id){ return document.getElementById(id); }

function mbEsc(s){
  return String(s === undefined || s === null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* Erst die Lücken füllen, dann maskieren, dann hervorheben.
   In dieser Reihenfolge kann kein Wert HTML einschmuggeln, und
   die Sternchen aus den Daten wirken trotzdem. */
function mbSatz(vorlage, werte){
  var t = String(vorlage).replace(/\{([a-zA-Z]+)\}/g, function(_, k){
    return (werte && werte[k] !== undefined) ? String(werte[k]) : '';
  });
  return mbEsc(t).replace(/\*([^*]+)\*/g, '<b>$1</b>');
}

function mbZahl(x){ return String(x.toFixed(1)).replace('.', ','); }

/* ── Der Brief ──────────────────────────────────────────────── */
function mbBrief(p, versatz){
  var P  = chartVon(p);
  var mv = R.monatVon(new Date(), versatz);
  var b  = R.bericht(P, mv.jahr, mv.mon);
  var monat = MN[b.mon];
  var name  = (p.name || AC_P.anzeige(p, true) || '').trim();

  var h = '<div class="mb-brief">';
  h += '<div class="anrede">'
     + mbSatz(T.ANREDE, { vorname: name.split(' ')[0] || T.DU }) + '</div>';
  h += '<div class="zeit">' + mbEsc(monat) + ' ' + mbEsc(b.jahr) + '</div>';
  h += '<p>' + mbSatz(T.EINL, { monat: monat }) + '</p>';

  h += '<h4>' + mbEsc(T.H.monat) + '</h4>';
  h += '<p>' + mbSatz(T.SCHWERPUNKT[b.schwerpunkt - 1]) + ' '
     + mbSatz(T.SCHWERPUNKT_NACH) + '</p>';

  if(b.treffer.length){
    var x = b.treffer[0], d = T.LAUF[x.wanderer];
    h += '<div class="kasten">';
    h += '<p><b>' + mbSatz(d.titel) + '</b></p>';
    h += '<p>' + mbSatz(d.text) + '</p>';
    h += '<p class="hintergrund ac-tech" data-ab="2">'
       + mbSatz(T.TECH.satz, { wanderer: x.wanderer,
                               winkel: T.TECH.winkel[x.k],
                               punkt: T.TECH.punkt[x.punkt],
                               orbis: mbZahl(x.orbis) }) + '</p>';
    h += '</div>';
    var zweit = b.treffer.filter(function(z){
      return z.wanderer !== x.wanderer; })[0];
    if(zweit)
      h += '<p><b>' + mbSatz(T.ZWEITES) + '</b> '
         + mbSatz(T.LAUF[zweit.wanderer].text) + '</p>';
  } else {
    h += '<div class="kasten">';
    h += '<p><b>' + mbSatz(T.RUHIG.titel) + '</b></p>';
    h += '<p>' + mbSatz(T.RUHIG.text) + '</p>';
    h += '</div>';
  }

  if(b.lunationen.length){
    h += '<h4>' + mbEsc(T.H.daten) + '</h4>';
    b.lunationen.slice(0, 2).forEach(function(l){
      h += '<p>' + mbSatz(T.MOND[l.art], { tag: l.tag, monat: monat,
                                           bereich: HT[l.haus - 1] }) + '</p>';
    });
  }

  h += '<h4>' + mbEsc(T.H.frage) + '</h4>';
  h += '<div class="frage">' + mbSatz(T.FRAGE[b.schwerpunkt - 1]) + '</div>';
  h += '<p>' + mbSatz(T.FRAGE_NACH) + '</p>';

  h += '<div class="gruss"><p>' + mbSatz(T.GRUSS.text) + '</p><p>'
     + mbEsc(T.GRUSS.formel) + '<br>' + mbEsc(T.GRUSS.name) + '</p></div>';

  h += '</div>';
  return h;
}

/* ── Zum Kopieren ───────────────────────────────────────────── */
function mbNurText(){
  return mbEl('mbbericht').innerHTML
    .replace(/<\/p>|<\/div>|<\/h4>/g, '\n')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/\n{3,}/g, '\n\n').trim();
}

/* ── Bedienung ──────────────────────────────────────────────── */
function mbSteuer(){
  var box = mbEl('mbsteuer'), alle = [];
  try { alle = AC_P.alle() || []; } catch(e){}
  if(!alle.length){ box.innerHTML = ''; return; }
  var marke = document.createElement('span');
  marke.className = 'lab';
  marke.textContent = T.BEDIENUNG.profil;
  box.innerHTML = '';
  box.appendChild(marke);
  alle.forEach(function(p){
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = AC_P.anzeige(p, AC_P.zeigeNamen())
                  + (p.eigen ? T.BEDIENUNG.ich : '');
    b.setAttribute('aria-pressed', MB_profil === p.id);
    b.addEventListener('click', function(){
      MB_profil = p.id; mbSteuer(); mbZeigen(); });
    box.appendChild(b);
  });
  var mk = document.createElement('span');
  mk.className = 'lab';
  mk.textContent = T.BEDIENUNG.monat;
  mk.style.marginLeft = '10px';
  box.appendChild(mk);
  T.BEDIENUNG.monate.forEach(function(wort, i){
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = wort;
    b.setAttribute('aria-pressed', MB_versatz === i);
    b.addEventListener('click', function(){
      MB_versatz = i; mbSteuer(); mbZeigen(); });
    box.appendChild(b);
  });
}

function mbZeigen(){
  var box = mbEl('mbbericht'), alle = [];
  try { alle = AC_P.alle() || []; } catch(e){}
  if(!alle.length){
    box.innerHTML = '<div class="mb-leer">'
      + mbSatz(T.BEDIENUNG.leer) + '<br><a href="profile.html">'
      + mbEsc(T.BEDIENUNG.profilseite) + '</a></div>';
    mbEl('mbknoepfe').style.display = 'none';
    return;
  }
  if(!MB_profil){ MB_profil = alle[0].id; mbSteuer(); }
  var p = alle.filter(function(x){ return x.id === MB_profil; })[0];
  if(!p) return;
  box.innerHTML = mbBrief(p, MB_versatz);
  mbEl('mbknoepfe').style.display = 'flex';
  if(window.AC_NIV && AC_NIV.anwenden) AC_NIV.anwenden();
}

function mbHinweis(text){
  var hin = mbEl('mbhinweis');
  hin.textContent = text;
  hin.className = 'an';
  setTimeout(function(){ hin.className = ''; }, 4000);
}

mbSteuer();
mbZeigen();

mbEl('mbkopie').addEventListener('click', function(){
  var t = mbNurText();
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(t).then(
      function(){ mbHinweis(T.BEDIENUNG.kopiert); },
      function(){ mbHinweis(T.BEDIENUNG.kopieFehler); });
  } else {
    var ta = mbEl('mbtext');
    ta.value = t; ta.className = 'mb-roh an'; ta.select();
    try { document.execCommand('copy'); mbHinweis(T.BEDIENUNG.kopiert); }
    catch(e){ mbHinweis(T.BEDIENUNG.kopieFehler); }
  }
});

mbEl('mbroh').addEventListener('click', function(){
  var ta = mbEl('mbtext');
  if(ta.className.indexOf('an') < 0){
    ta.value = mbNurText(); ta.className = 'mb-roh an';
  } else {
    ta.className = 'mb-roh';
  }
});

mbEl('mbdruck').addEventListener('click', function(){ window.print(); });

})();
