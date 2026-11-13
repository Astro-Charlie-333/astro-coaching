/* ───────────────────────────────────────────────────────────────
   bk-app.js — die Anzeige des Baukastens.

   Keine Sätze, keine Rechnung. Sätze aus bk-daten.js, Stellen aus
   bk-rechner.js, Profile und Zuweisungen über profil.js (AC_P).
   bau-baukasten.py bricht ab, sobald hier ein Satz oder ein „dein" von
   Hand auftaucht.

   Ein Baustein entsteht als ein Modell (Titel, Blöcke). Aus dem Modell
   wird ein eigenständiges HTML-Dokument; dasselbe Dokument steht in der
   Vorschau und geht als Datei an die Klientin. Was Mandy sieht, ist
   also genau das, was verschickt wird.
   ─────────────────────────────────────────────────────────────── */
(function(){
'use strict';
var T = BK_TEXT;
var el = function(id){ return document.getElementById(id); };
function bkEsc(s){ return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function bkFuell(v, w){ return String(v).replace(/\{([a-zA-Z]+)\}/g, function(_, k){ return (w && w[k] !== undefined) ? String(w[k]) : ''; }); }
function bkNeu(tag, klasse, text){ var e = document.createElement(tag); if(klasse) e.className = klasse; if(text !== undefined) e.textContent = text; return e; }
function bkDef(art){ for(var i = 0; i < BK_BAUSTEINE.length; i++) if(BK_BAUSTEINE[i].k === art) return BK_BAUSTEINE[i]; return null; }

var zustand = {pid:null, art:null};

function bkProfile(){ try{ return AC_P.alle() || []; }catch(e){ return []; } }
function bkProfil(){ var a = bkProfile(); for(var i = 0; i < a.length; i++) if(a[i].id === zustand.pid) return a[i]; return null; }
function bkVorname(p){ var n = String(p.name || p.alias || '').trim(); return n ? n.split(/\s+/)[0] : ''; }

/* ── Modell ─────────────────────────────────────────────── */
function bkFach(punkt, s, nachArt){ return bkFuell(T.fachzeile, {punkt:punkt, zeichen:SIGNS[s.z], element:nachArt ? BK_MODUS[s.z % 3] : BK_ELEMENT[s.el]}); }
function bkWahl(t, s){ return t.nach === 'modus' ? t.texte[BK_MODUS[s.z % 3]] : t.texte[BK_ELEMENT[s.el]]; }
var BK_ROUTINE = {abend:BK_ABEND, morgen:BK_MORGEN, halt:BK_HALT, woche:BK_WOCHE};
var BK_TERMINE = {termin:BK_TERMIN, termin2:BK_TERMIN2};

function bkRoutine(D, S){
  var b = [];
  if(D.stufen) b.push({typ:'werte', titel:D.stufenTitel, zeilen:D.stufen});
  b.push({typ:'zeiten', titel:D.geruestTitel, zeilen:D.geruest});
  D.teile.forEach(function(t){
    var s = S[t.punkt], text = bkWahl(t, s);
    if(D.rueckzug && t.k === 'mond' && S.h12) text = text + ' ' + D.rueckzug;
    b.push({typ:'teil', titel:t.kopf, text:text, fach:bkFach(t.punkt, s, t.nach === 'modus')});
  });
  if(D.fragen) b.push({typ:'liste', titel:D.fragenTitel, punkte:D.fragen, nummer:true});
  if(D.schleifen) b.push({typ:'werte', titel:D.schleifenTitel, zeilen:D.schleifen});
  var sp = D.punktSatz || 'Mond';
  b.push({typ:'satz', titel:D.satzTitel, text:D.saetze[BK_ELEMENT[S[sp].el]], fach:bkFach(sp, S[sp])});
  return {titel:D.titel, lede:D.lede, bloecke:b, schluss:D.schluss};
}

function bkArzt(){
  var D = BK_ARZT;
  return {titel:D.titel, lede:D.lede, schluss:D.schluss, bloecke:[
    {typ:'vorab', titel:D.vorabTitel, text:D.vorab},
    {typ:'werte', titel:D.werteTitel, zeilen:D.werte, nach:D.kosten},
    {typ:'text', titel:D.medikamentTitel, text:D.medikament},
    {typ:'liste', titel:D.fragenTitel, punkte:D.fragen, nummer:true},
    {typ:'liste', titel:D.mitTitel, punkte:D.mit},
    {typ:'quellen', titel:D.quellenTitel, links:D.quellen}]};
}

function bkTermin(D){
  return {titel:D.titel, lede:D.lede, schluss:D.schluss, bloecke:[
    {typ:'vorab', titel:D.vorabTitel, text:D.vorab},
    {typ:'vier', titel:D.vierTitel, zeilen:D.vier},
    {typ:'gruppen', titel:D.gruppenTitel, hinweis:D.gruppenHinweis, gruppen:D.gruppen, kind:D.kind},
    {typ:'skalen', titel:D.bereicheTitel, hinweis:D.bereicheHinweis, bereiche:D.bereiche, feld:D.beispiel},
    {typ:'anfaenge', titel:D.saetzeTitel, punkte:D.saetze},
    {typ:'liste', titel:D.fragenTitel, punkte:D.fragen, nummer:true},
    {typ:'liste', titel:D.mitTitel, punkte:D.mit}]};
}

function bkModell(art, p){
  if(art === 'arzt') return bkArzt();
  if(BK_TERMINE[art]) return bkTermin(BK_TERMINE[art]);
  if(!BK_ROUTINE[art] || !bkHatChart(p)) return null;
  return bkRoutine(BK_ROUTINE[art], bkStellen(p));
}

/* ── Aus dem Modell ein Dokument ────────────────────────── */
function bkBlock(b, fach){
  var h = '<section class="box">';
  if(b.typ === 'zeiten'){
    h += '<h2>' + bkEsc(b.titel) + '</h2>' + b.zeilen.map(function(z){ return '<div class="zeit"><b>' + bkEsc(z[0]) + '</b><p>' + bkEsc(z[1]) + '</p></div>'; }).join('');
  } else if(b.typ === 'teil'){
    h = '<section class="teil"><h3>' + bkEsc(b.titel) + '</h3><p>' + bkEsc(b.text) + '</p>' + (fach ? '<p class="fach">' + bkEsc(b.fach) + '</p>' : '');
  } else if(b.typ === 'satz'){
    h = '<section><h2>' + bkEsc(b.titel) + '</h2></section><section class="satz">' + bkEsc(b.text) + (fach ? '<p class="fach">' + bkEsc(b.fach) + '</p>' : '');
  } else if(b.typ === 'vorab'){
    h = '<section class="vorab"><p><b>' + bkEsc(b.titel) + '</b></p><p>' + bkEsc(b.text) + '</p>';
  } else if(b.typ === 'werte'){
    h += '<h2>' + bkEsc(b.titel) + '</h2>' + b.zeilen.map(function(z){ return '<div class="wert"><b>' + bkEsc(z[0]) + '</b><p>' + bkEsc(z[1]) + '</p></div>'; }).join('')
      + (b.nach ? '<p class="klein">' + bkEsc(b.nach) + '</p>' : '');
  } else if(b.typ === 'text'){
    h += '<h2>' + bkEsc(b.titel) + '</h2><p>' + bkEsc(b.text) + '</p>';
  } else if(b.typ === 'liste'){
    var t = b.nummer ? 'ol' : 'ul';
    h += '<h2>' + bkEsc(b.titel) + '</h2><' + t + '>' + b.punkte.map(function(x){ return '<li>' + bkEsc(x) + '</li>'; }).join('') + '</' + t + '>';
  } else if(b.typ === 'vier'){
    h += '<h2>' + bkEsc(b.titel) + '</h2><div class="vierer">' + b.zeilen.map(function(z){ return '<div><b>' + bkEsc(z[0]) + '</b><p>' + bkEsc(z[1]) + '</p></div>'; }).join('') + '</div>';
  } else if(b.typ === 'gruppen'){
    h = '<section><h2>' + bkEsc(b.titel) + '</h2><p class="klein">' + bkEsc(b.hinweis) + '</p></section>' + b.gruppen.map(function(g){
      return '<section class="gruppe"><h3>' + bkEsc(g.t) + '</h3>' + g.m.map(function(m){ return bkFuell(BK_FORM.kreuz, {a:bkEsc(m[0]), b:bkEsc(m[1])}); }).join('')
        + bkFuell(BK_FORM.kind, {a:bkEsc(b.kind)}) + '</section>'; }).join('') + '<section>';
  } else if(b.typ === 'skalen'){
    h += '<h2>' + bkEsc(b.titel) + '</h2><p class="klein">' + bkEsc(b.hinweis) + '</p>' + b.bereiche.map(function(x){
      return '<div class="wert"><b>' + bkEsc(x[1]) + '</b><div class="skala">' + BK_STUFEN.map(function(s){ return bkFuell(BK_FORM.stufe, {name:bkEsc('s-' + x[0]), a:bkEsc(s)}); }).join('')
        + '</div>' + bkFuell(BK_FORM.feld, {a:bkEsc(b.feld)}) + '</div>'; }).join('');
  } else if(b.typ === 'anfaenge'){
    h += '<h2>' + bkEsc(b.titel) + '</h2>' + b.punkte.map(function(x){ return '<p class="anfang">' + bkEsc(x) + '</p>'; }).join('');
  } else if(b.typ === 'quellen'){
    h += '<h2>' + bkEsc(b.titel) + '</h2><ul class="klein">' + b.links.map(function(q){ return '<li><a href="' + bkEsc(q[1]) + '">' + bkEsc(q[0]) + '</a></li>'; }).join('') + '</ul>';
  }
  return h + '</section>';
}

function bkDokument(m, p, fach){
  var fuer = p && bkVorname(p) ? bkFuell(T.fuer, {name:bkVorname(p)}) : '';
  return BK_DATEI_ANFANG
    + '<title>' + bkEsc(m.titel) + '</title><link rel="stylesheet" href="' + bkEsc(BK_DATEI_SCHRIFT) + '"><style>' + BK_DATEI_STIL + BK_DATEI_STIL_FORM + '</style></head><body><main>'
    + (fuer ? '<p class="ey">' + bkEsc(fuer) + '</p>' : '')
    + '<h1>' + bkEsc(m.titel) + '</h1><p class="lede">' + bkEsc(m.lede) + '</p>'
    + m.bloecke.map(function(b){ return bkBlock(b, fach); }).join('')
    + '<p>' + bkEsc(m.schluss) + '</p><footer>' + bkEsc(BK_FUSS) + '</footer></main></body></html>';
}

/* ── Oberfläche ─────────────────────────────────────────── */
function bkProfilwahl(){
  var a = bkProfile(), s = el('bkprofil');
  s.innerHTML = '';
  if(!a.length){ el('bkhinweis').innerHTML = T.keinProfil; el('bkhinweis').hidden = false; s.disabled = true; return; }
  var akt = null; try{ akt = AC_P.aktives(); }catch(e){}
  if(!zustand.pid) zustand.pid = (akt || a[0]).id;
  var voll = false; try{ voll = AC_P.zeigeNamen(); }catch(e){}
  a.forEach(function(p){ var o = bkNeu('option', '', AC_P.anzeige(p, voll)); o.value = p.id; o.selected = p.id === zustand.pid; s.appendChild(o); });
}

function bkKarten(){
  var box = el('bkkarten'); box.innerHTML = '';
  BK_BAUSTEINE.forEach(function(B){
    var b = bkNeu('button', 'bk-karte'); b.type = 'button'; b.setAttribute('aria-pressed', String(zustand.art === B.k)); b.setAttribute('data-art', B.k);
    b.appendChild(bkNeu('b', '', B.titel)); b.appendChild(bkNeu('span', '', B.kurz));
    b.addEventListener('click', function(){ zustand.art = B.k; bkZeigen(); });
    box.appendChild(b);
  });
}

function bkGrundlage(p){
  var box = el('bkgrund'); box.innerHTML = '';
  if(!BK_ROUTINE[zustand.art] || !bkHatChart(p)){ box.hidden = true; return; }
  var S = bkStellen(p), D = BK_ROUTINE[zustand.art];
  box.hidden = false;
  box.appendChild(bkNeu('span', 'bk-lab', T.aus));
  var ul = document.createElement('ul');
  D.teile.forEach(function(t){ ul.appendChild(bkNeu('li', '', t.kopf + ': ' + bkFach(t.punkt, S[t.punkt], t.nach === 'modus'))); });
  var sp = D.punktSatz || 'Mond';
  ul.appendChild(bkNeu('li', '', D.satzTitel + ': ' + bkFach(sp, S[sp])));
  box.appendChild(ul);
}

function bkZeigen(){
  Array.prototype.forEach.call(document.querySelectorAll('[data-art]'), function(b){ b.setAttribute('aria-pressed', String(b.getAttribute('data-art') === zustand.art)); });
  var p = bkProfil(), m = zustand.art ? bkModell(zustand.art, p) : null, fr = el('bkvorschau');
  el('bkstatus').textContent = '';
  el('bkleer').hidden = !!zustand.art;
  el('bkleer').textContent = T.waehle;
  el('bkchart').hidden = !(zustand.art && !m);
  el('bkchart').textContent = T.brauchtChart;
  el('bkwerk').hidden = !m;
  bkGrundlage(p);
  if(m){
    var hoehe = function(){ try{ var d = fr.contentDocument; if(d && d.documentElement) fr.style.height = (d.documentElement.scrollHeight + 4) + 'px'; }catch(e){} };
    fr.onload = hoehe;
    fr.srcdoc = bkDokument(m, p, el('bkfach').checked);
    setTimeout(hoehe, 400); setTimeout(hoehe, 1500);
  }
  bkListe();
}

function bkDatei(art, p, fach){
  var m = bkModell(art, p); if(!m) return;
  var B = bkDef(art), name = bkFuell(T.dateiName, {art:B.datei, name:bkVorname(p) || p.id}).replace(/[^A-Za-z0-9ÄÖÜäöüß_-]+/g, '-');
  var blob = new Blob([bkDokument(m, p, fach)], {type:'text/html'});
  var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name + '.html';
  document.body.appendChild(a); a.click();
  setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 300);
}

function bkListe(){
  var box = el('bkliste'); box.innerHTML = '';
  var p = bkProfil(); if(!p){ return; }
  var L = []; try{ L = AC_P.bausteine(p.id); }catch(e){}
  if(!L.length){ box.appendChild(bkNeu('p', 'bk-leise', T.listeLeer)); return; }
  L.slice().reverse().forEach(function(b){
    var B = bkDef(b.art); if(!B) return;
    var z = bkNeu('div', 'bk-zeile');
    var k = bkNeu('div', 'bk-zkopf');
    k.appendChild(bkNeu('b', '', B.titel));
    k.appendChild(bkNeu('span', 'bk-datum', b.datum));
    k.appendChild(bkNeu('span', b.frei ? 'bk-chip bk-chip-frei' : 'bk-chip', b.frei ? T.frei : T.entwurf));
    z.appendChild(k);
    var w = bkNeu('div', 'bk-zknoepfe');
    var knopf = function(text, f){ var x = bkNeu('button', '', text); x.type = 'button'; x.addEventListener('click', f); w.appendChild(x); return x; };
    knopf(T.oeffnen, function(){ zustand.art = b.art; bkZeigen(); el('bkwerk').scrollIntoView({block:'start'}); });
    knopf(T.datei, function(){ bkDatei(b.art, p, el('bkfach').checked); });
    knopf(b.frei ? T.zurueck : T.freigeben, function(){ AC_P.bausteinAendern(p.id, b.id, {frei:!b.frei}); bkListe(); });
    var weg = knopf(T.entfernen, function(){
      weg.hidden = true;
      var frage = bkNeu('span', 'bk-frage', T.sicher);
      var ja = bkNeu('button', '', T.ja); ja.type = 'button';
      var nein = bkNeu('button', '', T.nein); nein.type = 'button';
      ja.addEventListener('click', function(){ AC_P.bausteinLoeschen(p.id, b.id); bkListe(); });
      nein.addEventListener('click', function(){ bkListe(); });
      w.appendChild(frage); w.appendChild(ja); w.appendChild(nein);
    });
    z.appendChild(w); box.appendChild(z);
  });
}

function bkLos(){
  bkProfilwahl(); bkKarten();
  el('bkprofil').addEventListener('change', function(){ zustand.pid = el('bkprofil').value; bkZeigen(); });
  el('bkfach').addEventListener('change', bkZeigen);
  el('bkzuweisen').addEventListener('click', function(){
    var p = bkProfil(); if(!p || !zustand.art) return;
    AC_P.bausteinHinzu(p.id, zustand.art, '');
    el('bkstatus').textContent = T.zugewiesen; bkListe();
  });
  el('bkdatei').addEventListener('click', function(){ var p = bkProfil(); if(p && zustand.art) bkDatei(zustand.art, p, el('bkfach').checked); });
  el('bkzuweisen').textContent = T.zuweisen;
  el('bkdatei').textContent = T.datei;
  bkZeigen();
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bkLos); else bkLos();
})();
