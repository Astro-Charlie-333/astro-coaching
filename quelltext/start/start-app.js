/* ── Start: setzt den Inhalt aus start-daten.js in die Seite ──
   Kein Rechnen, keine Profile, kein localStorage. Diese Seite ist die
   einzige, die ohne Geburtsdaten vollständig funktioniert — wer hier
   landet, hat noch nichts eingegeben und soll auch nichts müssen. */
(function(){
  'use strict';

  function el(i){ return document.getElementById(i); }
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function setz(i, t){ var e=el(i); if(e) e.textContent=t; }
  function html(i, t){ var e=el(i); if(e) e.innerHTML=t; }

  /* ── Kopf ────────────────────────────────────────────────── */
  setz('stwort', S_MARKE.wort + ' · ' + S_MARKE.zusatz);
  setz('stfrage', S_MARKE.frage);
  setz('stsatz', S_MARKE.satz);
  setz('strolle', S_MARKE.rolle);
  setz('stfussmarke', S_MARKE.wort + ' — ' + S_MARKE.zusatz);

  /* ── Die drei Linsen ─────────────────────────────────────── */
  html('stlinsen', S_LINSEN.map(function(l){
    return '<div class="st-li">'
      + '<div class="st-li-f">' + esc(l.frage) + '</div>'
      + '<div class="st-li-n">' + esc(l.n) + '</div>'
      + '<p class="st-li-d">' + esc(l.d) + '</p></div>';
  }).join(''));

  /* ── Die Angebote ────────────────────────────────────────── */
  html('stang', S_ANGEBOT.map(function(a){
    return '<div class="st-a">'
      + '<div class="st-a-n">' + esc(a.n) + '</div>'
      + '<div class="st-a-art">' + esc(a.art) + '</div>'
      + '<p class="st-a-f">' + esc(a.fuer) + '</p>'
      + '<ul class="st-a-l">' + a.dabei.map(function(d){
          return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>'
      + '<p class="st-a-nicht">' + esc(a.nicht) + '</p></div>';
  }).join(''));

  /* ── Der Ablauf ──────────────────────────────────────────── */
  setz('stabtitel', S_ABMACHEN.titel);
  html('stschritte', S_ABMACHEN.schritte.map(function(s){
    return '<li><div><div class="st-s-t">' + esc(s[0]) + '</div>'
      + '<p class="st-s-d">' + esc(s[1]) + '</p></div></li>';
  }).join(''));
  setz('stabnach', S_ABMACHEN.nachsatz);

  /* ── Die Tür, die nichts kostet ──────────────────────────── */
  setz('sttuertitel', S_TUER.titel);
  setz('sttuertext', S_TUER.text);
  html('stwege', S_TUER.wege.map(function(w){
    return '<a class="st-w" href="' + esc(w[0]) + '">'
      + '<div class="st-w-t">' + esc(w[1]) + '</div>'
      + '<div class="st-w-d">' + esc(w[2]) + '</div></a>';
  }).join(''));

  /* ── Wer ich bin ─────────────────────────────────────────── */
  setz('stichtitel', S_ICH.titel);
  html('stichtext', S_ICH.text.map(function(p){
    return '<p>' + esc(p) + '</p>'; }).join(''));

  /* ── Was das hier nicht ist ──────────────────────────────── */
  setz('stnichttitel', S_NICHT.titel);
  setz('stnichtsub', S_NICHT.sub);
  html('stnp', S_NICHT.punkte.map(function(p){
    return '<div class="st-n1"><b>' + esc(p[0]) + '</b>'
      + '<span>' + esc(p[1]) + '</span></div>';
  }).join(''));
  var k = S_NICHT.krise;
  html('stkrise', '<b>' + esc(k.titel) + '</b>'
    + '<p>' + esc(k.text) + '</p><dl>'
    + k.stellen.map(function(s){
        return '<dt>' + esc(s[0]) + '</dt><dd>' + esc(s[1]) + '</dd>';
      }).join('') + '</dl>');

  /* ── Kontakt ─────────────────────────────────────────────────
     Solange keine Adresse eingetragen ist, steht hier eine sichtbare
     Lücke. Keine erfundene Adresse, kein Formular ins Nichts. */
  if(S_KONTAKT.mail){
    html('stkbox', '<div class="st-k"><a class="st-k-a" href="mailto:'
      + esc(S_KONTAKT.mail) + '">' + esc(S_KONTAKT.mail) + '</a></div>');
  } else {
    html('stkbox', '<div class="st-luecke"><b>'
      + esc(S_KONTAKT.lueckeTitel) + '</b><p>'
      + esc(S_KONTAKT.luecke) + '</p></div>');
  }

  /* ── Ehrlichkeit ─────────────────────────────────────────── */
  setz('stehrtitel', S_EHRLICH.titel);
  html('stehr', '<ul class="st-ehr-l">' + S_EHRLICH.punkte.map(function(p){
    return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>');

})();
