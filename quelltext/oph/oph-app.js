/* Astro-Charlie · Ophiuchus — die Anzeige.
   Rechnet nichts und formuliert nichts. Setzt nur zusammen, was
   sternbild.js rechnet und oph-daten.js an Worten mitbringt.

   Seit dem 2026-11-26 steht hier kein Satz und keine Beschriftung
   mehr: alles davon in oph-daten.js als OP_T. Eingesetzt wird mit
   AC_FUELL aus kern/fuellen.js, eine Zahl wird mit AC_KOMMA zu Text,
   und „dein" bildet B_BEUGE aus kern/bahn-daten.js. bau-oph.py
   bricht ab, sobald eine der drei Formen zurückkommt (Aufgabe 64,
   aus 34 und 38).

   Das war die letzte Anzeige dieses Zuges. */
(function(){
'use strict';
var S = window.AC_STB;
var D = window.AC_OPHT, T = D.T;
var ZN = D.ZEICHEN;          /* die zwölf, einmal und in den Daten */
var Z13 = D.dreizehn();      /* die dreizehn entstehen daraus */
var PLAN = D.PUNKTE;
var gewaehlt = null;

function nrm(x){ x = x % 360; return x < 0 ? x + 360 : x; }
function el(i){ return document.getElementById(i); }
function esc(s){ return String(s === undefined || s === null ? '' : s)
  .replace(/[<>&"]/g, function(c){
    return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }

/* Die Zelle des Schlangenträgers wird ausgezeichnet, nicht
   beschriftet: eine Klasse ist Auszeichnung und kein Text. Das
   Leerzeichen davor steht im Zusammenbau und nicht in der
   Zeichenkette — mit ihm läse die Satzregel zwei Wörter und schlüge
   zu Recht an. */
var MARKE = 'class="oph"';

/* Eine Zahl wird an einer Stelle zu Text (AC_KOMMA in
   kern/fuellen.js). Nicht hier: Eine Balkenbreite in Prozent geht in
   ein Stilattribut, und dort verlangt CSS den Punkt. */
function zahl(x, stellen){ return AC_KOMMA(x, stellen); }

function ayanamsa(T2){ return 23.853 + 1.396042 * T2 + 0.0003086 * T2 * T2; }
function grad(l){ var z = Math.floor(nrm(l) / 30), d = nrm(l) - 30 * z,
  m = Math.round((d - Math.floor(d)) * 60), dd = Math.floor(d);
  if(m === 60){ m = 0; dd += 1; } return dd + '° ' + ZN[z] + " " + ('0' + m).slice(-2) + "'"; }

function alle(){ try{ return AC_P.alle() || []; }catch(e){ return []; } }
function jdVon(p){
  var ut = p.h + p.mi / 60 - p.tz, y = p.y, mo = p.mo, d = p.d;
  if(p.ohneZeit || p.h === undefined || p.h === null) ut = 12 - (p.tz || 0);
  if(ut < 0){ ut += 24; d -= 1; } if(ut >= 24){ ut -= 24; d += 1; }
  return jdFromUT(y, mo, d, ut);
}

/* ── Die Spannen der dreizehn ─────────────────────────── */
function spannenBauen(){
  var sp = S.spannen();
  var max = sp.reduce(function(m, x){ return Math.max(m, x.grad); }, 0);
  var h = '<div class="sp-bal">' + sp.slice().sort(function(a, b){ return b.grad - a.grad; })
    .map(function(x){
      var tage = x.grad / 360 * 365.2422;
      return '<div class="spz' + (x.name === D.DREIZEHN.name ? ' oph' : '') + '">' +
        '<div class="n">' + esc(x.name) + '</div>' +
        /* Die Breite ist keine Textzahl: CSS verlangt den Punkt. */
        '<div class="bar"><i style="width:' + (x.grad / max * 100).toFixed(1) + '%"></i></div>' +
        '<div class="z">' + esc(AC_FUELL(T.spanneTage, {tage: zahl(tage, 1)})) + '</div></div>';
    }).join('') + '</div>';
  var nach = function(n){ return sp.filter(function(x){ return x.name === n; })[0]; };
  var ju = nach(T.spanneBezug.gross), sk = nach(T.spanneBezug.klein),
      op = nach(D.DREIZEHN.name);
  h += '<p style="margin:14px 0 0;font-size:15.2px;line-height:1.72;">' +
    AC_FUELL(T.spanneSatz, {
      ju:  zahl(ju.grad, 1),
      sk:  zahl(sk.grad, 1),
      jut: zahl(ju.grad / 360 * 365.2422, 0),
      skt: zahl(sk.grad / 360 * 365.2422, 1),
      op:  zahl(op.grad, 1)}) + '</p>';
  el('spannen').innerHTML = h;
}

/* ── Vier Systeme für ein Profil ──────────────────────── */
function tabelleBauen(p){
  var jd = jdVon(p), T2 = (jd - 2451545) / 36525;
  var ay = ayanamsa(T2);
  var oph = D.DREIZEHN.name;
  var zeilen = PLAN.map(function(k){
    var lon, lat = 0;
    if(k === 'Sonne'){ lon = sunLon(T2); }
    else if(k === 'Mond'){ lon = moonLon(T2); }  /* Breite des Mondes rechnet die Engine nicht */
    else { var q = S.geoLB(k, T2); lon = q.lon; lat = q.lat; }
    var trop = ZN[Math.floor(nrm(lon) / 30)];
    var sid = ZN[Math.floor(nrm(lon - ay) / 30)];
    var stb = (k === 'Sonne') ? S.sonnenSternbild(lon, jd) : S.sternbild(lon, lat, jd);
    var g13 = Z13[Math.floor(nrm(lon) / (360 / 13))];
    return {k: k, lon: lon, lat: lat, trop: trop, sid: sid, stb: stb, g13: g13};
  });
  var h = '<table class="vgl"><thead><tr><th></th>' +
    T.spalten.map(function(s){ return '<th>' + esc(s) + '</th>'; }).join('') +
    '</tr></thead><tbody>';
  zeilen.forEach(function(z){
    var breit = Math.abs(z.lat) > 0.5
      ? ' · ' + AC_FUELL(T.breite, {vz: z.lat > 0 ? '+' : '-',
                                    grad: zahl(Math.abs(z.lat), 1)})
      : '';
    h += '<tr><td class="p">' + esc(z.k) + '<span class="weit">' + esc(grad(z.lon)) +
       esc(breit) + '</span></td>' +
       '<td class="t"><b>' + esc(z.trop) + '</b></td>' +
       '<td>' + esc(z.sid) + '</td>' +
       '<td' + (z.stb === oph ? ' ' + MARKE : '') + '>' + esc(z.stb || T.ohne) + '</td>' +
       '<td' + (z.g13 === oph ? ' ' + MARKE : '') + '>' + esc(z.g13) + '</td></tr>';
  });
  h += '</tbody></table>';
  h += '<p class="sub" style="margin-top:4px;">' + T.tabelleSatz + '</p>';
  return {html: h, zeilen: zeilen, jd: jd};
}

function groszBauen(p, z){
  var so = z.zeilen[0], oph = D.DREIZEHN.name;
  var name = (p.name || '').trim().split(/\s+/)[0] || T.ohneName;
  var h = '<div class="oph-gross"><div class="z">';
  if(so.stb === oph){
    h += AC_FUELL(T.istOphKopf, {name: esc(name)}) + '</div><p>' +
      AC_FUELL(T.istOph, {name: esc(name), grad: esc(grad(so.lon)),
                          trop: esc(so.trop)}) + '</p>';
  } else {
    h += AC_FUELL(T.normalKopf, {trop: esc(so.trop),
                                 stb: esc(so.stb || T.ohne)}) + '</div><p>' +
      AC_FUELL(T.normal, {name: esc(name), trop: esc(so.trop),
                          sid: esc(so.sid), stb: esc(so.stb || T.ohne)}) + '</p>';
  }
  var ophs = z.zeilen.filter(function(x){ return x.stb === oph; });
  if(ophs.length && so.stb !== oph){
    h += '<p>' + AC_FUELL(T.ophAnders, {name: esc(name),
      liste: esc(ophs.map(function(x){ return x.k; }).join(', '))}) + '</p>';
  } else if(!ophs.length){
    h += '<p>' + AC_FUELL(T.ophLeer, {name: esc(name)}) + '</p>';
  }
  h += '</div>';
  return h;
}

/* ── Das Band: 43 statt 13 ────────────────────────────── */
function bandBauen(p){
  var jd = jdVon(p), T2 = (jd - 2451545) / 36525;
  var ausser = [];
  PLAN.forEach(function(k){
    if(k === 'Sonne' || k === 'Mond') return;
    var q = S.geoLB(k, T2);
    var stb = S.sternbild(q.lon, q.lat, jd);
    var aufEkliptik = S.sonnenSternbild(q.lon, jd);
    if(stb && stb !== aufEkliptik) ausser.push({k: k, stb: stb, auf: aufEkliptik, lat: q.lat});
  });
  var h = '<div class="oph-karte"><h3>' + esc(T.bandKopf) + '</h3>' +
    '<p>' + AC_FUELL(T.band, {anzahl: S.BAND.length}) + '</p>';
  if(ausser.length){
    h += '<p>' + esc(T.bandAuf) + '</p>' +
      '<ul style="margin:0 0 10px 18px;font-size:15.2px;line-height:1.75;">' +
      ausser.map(function(x){
        return '<li>' + AC_FUELL(T.bandZeile, {
          punkt: esc(x.k), auf: esc(x.auf), stb: esc(x.stb),
          grad: zahl(Math.abs(x.lat), 1),
          richtung: x.lat > 0 ? T.nordlich : T.suedlich}) + '</li>';
      }).join('') + '</ul>';
  } else {
    h += '<p>' + esc(T.bandOhne) + '</p>';
  }
  h += '<p style="margin-bottom:0;">' + AC_FUELL(T.bandListe, {
    liste: esc(S.BAND.map(function(b){ return S.DEUTSCH[b] || b; }).sort().join(', '))
  }) + '</p></div>';
  return h;
}

/* ── Oberfläche ───────────────────────────────────────── */
function wahlBauen(){
  var box = el('ophwahl'), l = alle();
  box.innerHTML = '';
  if(!l.length) return;
  var lab = document.createElement('span'); lab.className = 'lab';
  lab.textContent = T.wahlKopf;
  box.appendChild(lab);
  l.forEach(function(p){
    var b = document.createElement('button'); b.type = 'button';
    b.textContent = AC_P.anzeige(p, AC_P.zeigeNamen()) + (p.eigen ? T.wahlEigen : '');
    b.setAttribute('aria-pressed', gewaehlt === p.id);
    b.addEventListener('click', function(){ gewaehlt = p.id; wahlBauen(); zeigen(); });
    box.appendChild(b);
  });
}
function zeigen(){
  var l = alle();
  if(!l.length){
    el('ophtabelle').innerHTML = '<div class="oph-leer"><b>' + esc(T.leerKopf) +
      '</b><br><br>' + T.leer + '</div>';
    el('ophband').innerHTML = ''; return;
  }
  if(!gewaehlt) gewaehlt = (l.filter(function(p){ return p.eigen; })[0] || l[0]).id;
  var p = l.filter(function(x){ return x.id === gewaehlt; })[0];
  if(!p) return;
  var z = tabelleBauen(p);
  el('ophtabelle').innerHTML = groszBauen(p, z) + z.html;
  el('ophband').innerHTML = bandBauen(p);
}

/* „dein" steht an einer Stelle: B_BEUGE kennt das Geschlecht, das in
   OP_T.punkt am Wort hängt (kern/bahn-daten.js).

   `betont` ist dasselbe Wort in zwei Ausgaben: auf der Seite kursiv,
   in der Zwischenablage ohne Auszeichnung. Der Absatz selbst steht
   einmal. */
function antwortText(kursiv){
  return AC_FUELL(T.antwort, {
    betont: kursiv ? '<i>' + T.betont + '</i>' : T.betont,
    sonne:  B_BEUGE(T.punkt.sonne, 'nom')});
}
function kopieren(){
  var text = antwortText(false);
  var ta = document.createElement('textarea'); ta.value = text;
  ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  try{ document.execCommand('copy'); }catch(e){}
  try{
    if(navigator.clipboard && navigator.clipboard.writeText)
      navigator.clipboard.writeText(text).catch(function(){});
  }catch(e){}
  ta.remove();
  var e = el('ophecho'); e.textContent = T.kopiert;
  setTimeout(function(){ if(e.textContent === T.kopiert) e.textContent = ''; }, 3500);
}

function start(){
  spannenBauen(); wahlBauen(); zeigen();
  el('ophantwort').innerHTML = AC_FUELL(T.zitat, {text: antwortText(true)});
  el('ophkopie').addEventListener('click', kopieren);
  el('ophquellen').innerHTML = T.quellen;
  window.addEventListener('ac-niveau', zeigen);
}
start();
})();
