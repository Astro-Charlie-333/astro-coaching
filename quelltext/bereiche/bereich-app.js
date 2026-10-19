/* ───────────────────────────────────────────────────────────────
   bereich-app.js — zeichnet die Bereichsseite.

   Reihenfolge auf der Seite: die lautesten Bereiche zuerst. Nicht
   alphabetisch, nicht nach Häusernummer — nach dem, was gerade
   wirklich dran ist. Innerhalb eines Bereichs immer dieselben fünf
   Blöcke, in dieser Reihenfolge:
     1. Was ist los
     2. Was du tun kannst
     3. Wie lange das läuft
     4. Wie du es nutzt
     5. Dein Dauerthema hier
   ─────────────────────────────────────────────────────────────── */
(function(){

  var D = null, BER = null;
  var MN = ['Januar','Februar','März','April','Mai','Juni','Juli',
            'August','September','Oktober','November','Dezember'];
  var ZN = ['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau',
            'Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische'];

  function bD(){ return window.AC_BDAT; }
  function bB(){ return window.AC_BER; }

  /* ── Hilfen ─────────────────────────────────────────────────── */
  function esc(s){
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;');
  }

  function profile(){ try{ return AC_P.alle() || []; }catch(e){ return []; } }
  function aktiv(){
    var a = profile();
    try{ return AC_P.aktives() || AC_P.eigenes() || a[0] || null; }catch(e){ return a[0] || null; }
  }
  function namen(p){
    try{ return AC_P.anzeige(p, AC_P.zeigeNamen()); }catch(e){ return (p && p.name) || '?'; }
  }
  function stufe(){ try{ return AC_NIV.stufe(); }catch(e){ return 0; } }

  /* Tage in Alltagssprache. Unter einem Jahr in Monaten oder Wochen,
     darüber in Jahren — nie "17 Monate" neben "1,5 Jahre". */
  function dauer(tage){
    if(tage === null || tage === undefined) return null;
    var t = Math.round(tage);
    if(t <= 0) return 'läuft aus';
    if(t < 14)  return t + (t === 1 ? ' Tag' : ' Tage');
    if(t < 70){ var w = Math.round(t/7);  return w + (w === 1 ? ' Woche' : ' Wochen'); }
    if(t < 365){ var m = Math.round(t/30.44); return m + (m === 1 ? ' Monat' : ' Monate'); }
    var j = t/365.2422;
    if(j < 1.9) return 'etwa ein Jahr';
    return 'etwa ' + Math.round(j) + ' Jahre';
  }

  function datum(jd){
    if(jd === null || jd === undefined) return null;
    var d = datVon(jd);
    return MN[d.getUTCMonth()] + ' ' + d.getUTCFullYear();
  }

  /* ── Ein laufender Vorgang als Satz ───────────────────────────
     gesehen sammelt die Arten, die in diesem Bereich schon erklärt
     wurden. Zwei Vorgänge derselben Art bekommen den Zusatz nur
     einmal — sonst steht zweimal wörtlich derselbe Satz da. */
  function vorgangSatz(v, B, gesehen){
    var W = bD().WAND[v.wanderer];
    if(!W) return null;
    if(v.form === 'durchgang'){
      /* Die Rahmenerklärung gehört einmal in den Bereich, nicht an
         jeden Durchgang. Was einen Durchgang vom anderen
         unterscheidet, ist der Vorgang selbst. */
      var rahmen = '';
      if(!gesehen || !gesehen.durchgang){
        rahmen = ' ' + bD().DURCH.einl;
        if(gesehen) gesehen.durchgang = true;
      }
      var rw = '';
      if(v.rueck && (!gesehen || !gesehen.rueck)){
        rw = ' ' + bD().DURCH.rueck;
        if(gesehen) gesehen.rueck = true;
      }
      return { was: W.was + rahmen + rw,
               tun: W.tun, nutzen: W.nutzen, tempo: W.tempo };
    }
    var A = bD().ART[v.art], zusatz = '';
    if(A && (!gesehen || !gesehen[v.art])){
      zusatz = ' ' + A.wie;
      if(gesehen) gesehen[v.art] = true;
    }
    return { was: W.was + zusatz,
             tun: W.tun, nutzen: W.nutzen, tempo: W.tempo };
  }

  /* Die Mechanik dazu — erst ab Stufe 2 sichtbar. */
  function vorgangTech(v){
    var W = bD().WAND[v.wanderer], t = W ? W.tech : v.wanderer;
    if(v.form === 'durchgang')
      return t + ' läuft durch das ' + v.haus + '. Haus' + (v.rueck ? ', rückläufig' : '');
    var A = bD().ART[v.art];
    return t + ' ' + (A ? A.tech : v.aspekt) + ' ' + v.ziel +
           ', ' + v.ab.toFixed(1).replace('.', ',') + '° vom exakten Stand' +
           (v.zu ? ', zulaufend' : ', weggehend') + (v.rueck ? ', rückläufig' : '');
  }

  /* ── Fensterzeile ───────────────────────────────────────────── */
  function fensterZeile(v){
    var f = v.f;
    if(!f) return '';
    if(f.bisOffen || f.bis === null)
      return 'Das läuft noch über Jahre hinaus — ein Ende ist in dieser Rechnung nicht in Sicht.';
    var noch = dauer(f.tageNoch);
    /* Unter sechs Wochen ist "noch zwei Wochen" genauer als ein
       Monatsname — der wäre oft der laufende Monat und sagt nichts. */
    var s = (f.tageNoch !== null && f.tageNoch < 42)
      ? 'Noch ' + noch + '.'
      : 'Noch ' + noch + ', bis etwa ' + datum(f.bis) + '.';
    if(f.tageSchon !== null && f.tageSchon > 20)
      s += ' Angefangen hat es vor ' + dauer(f.tageSchon) + '.';
    return s;
  }

  /* ── Ein Bereich ────────────────────────────────────────────── */
  function bereichBlock(b, offen){
    var T = bD().BER[b.k], L = bD().LAUT[b.laut], n = stufe();
    if(!T) return '';
    var h = [];

    h.push('<details class="b-ber" id="ber-' + b.k + '"' + (offen ? ' open' : '') + '>');
    h.push('<summary>');
    h.push('<span class="b-punkt" style="background:' + L.farbe + '"></span>');
    h.push('<span class="b-name">' + esc(b.name) + '</span>');
    h.push('<span class="b-laut" style="color:' + L.farbe + '">' + esc(L.n) + '</span>');
    h.push('<span class="b-satz">' + esc(T.lautSatz[b.laut]) + '</span>');
    h.push('</summary>');
    h.push('<div class="b-in">');

    /* worum es in diesem Bereich überhaupt geht */
    h.push('<p class="b-worum">' + esc(T.worum) + '</p>');

    var top = b.laeuft.slice(0, 3), gesehen = {};

    /* ── 1. Was ist los ─────────────────────────────────── */
    h.push('<div class="b-blk"><h4>1 &middot; Was ist los</h4>');
    if(b.kapitel){
      h.push('<p class="b-kap">' + esc(b.kapitel.laut ? bD().KAP.laut : bD().KAP.leise) + '</p>');
      if(b.nurKapitel) h.push('<p class="b-kap">' + esc(bD().KAP.nurKapitel) + '</p>');
      if(b.kapitel.anders) h.push('<p class="b-kap b-leise">' + esc(bD().KAP.widerspruch) + '</p>');
      if(n >= 2) h.push('<p class="ac-tech">' + esc(bD().KAP.tech) + ': ' +
        esc(ZN[b.kapitel.l1.zeichen]) + (b.kapitel.l1.gipfel ? ' (winkelhaft)' : '') +
        (b.kapitel.l2 ? ' &rarr; ' + esc(ZN[b.kapitel.l2.zeichen]) +
          (b.kapitel.l2.gipfel ? ' (winkelhaft)' : '') : '') + '</p>');
    }
    if(!top.length){
      h.push('<p>Zur Zeit rührt kein größerer Vorgang an diesem Bereich. ' +
             'Das ist der Normalfall und kein Mangel &mdash; es läuft nie überall gleichzeitig etwas.</p>');
    } else {
      for(var i=0;i<top.length;i++){
        var v = top[i], S = vorgangSatz(v, b, gesehen);
        if(!S) continue;
        h.push('<div class="b-vor' + (i === 0 ? ' b-haupt' : '') + '">');
        if(i === 0) h.push('<span class="b-marke">Das Stärkste gerade</span>');
        h.push('<p>' + esc(S.was) + '</p>');
        if(n >= 2) h.push('<p class="ac-tech">' + esc(vorgangTech(v)) + '</p>');
        h.push('</div>');
      }
    }
    h.push('</div>');

    /* ── 2. Was du tun kannst ───────────────────────────── */
    h.push('<div class="b-blk"><h4>2 &middot; Was du tun kannst</h4>');
    if(top.length){
      var S0 = vorgangSatz(top[0], b);
      h.push('<p class="b-tun">' + esc(S0 ? S0.tun : '') + '</p>');
      if(top.length > 1){
        var S1 = vorgangSatz(top[1], b);
        if(S1 && S1.tun !== (S0 && S0.tun)) h.push('<p>' + esc(S1.tun) + '</p>');
      }
    } else {
      h.push('<p>Nichts, was dringend wäre. Stille Bereiche sind die, in denen man ohne Gegenwind etwas aufbauen kann &mdash; ' +
             'wenn du hier etwas willst, musst du es selbst anfangen.</p>');
    }
    h.push('</div>');

    /* ── 3. Wie lange das läuft ─────────────────────────── */
    h.push('<div class="b-blk"><h4>3 &middot; Wie lange das läuft</h4>');
    if(top.length){
      h.push('<ul class="b-zeit">');
      for(var j=0;j<top.length;j++){
        var vj = top[j], Sj = vorgangSatz(vj, b);
        h.push('<li><b>' + esc(Sj ? Sj.tempo : '') + '</b> ' + esc(fensterZeile(vj)) + '</li>');
      }
      h.push('</ul>');
    } else {
      h.push('<p>Kein Fenster, das zuläuft oder abläuft.</p>');
    }
    if(b.kapitel){
      var kv = b.kapitel.l1;
      h.push('<p class="b-kapzeit">Das große Kapitel darüber läuft noch bis ' +
             esc(kapEnde(kv)) + '.</p>');
    }
    h.push('</div>');

    /* ── 4. Wie du es nutzt ─────────────────────────────── */
    h.push('<div class="b-blk"><h4>4 &middot; Wie du es nutzt</h4>');
    if(top.length){
      var Sn = vorgangSatz(top[0], b);
      h.push('<p>' + esc(Sn ? Sn.nutzen : '') + '</p>');
    } else {
      h.push('<p>In einer stillen Phase ist das Nützlichste, etwas vorzubereiten, ' +
             'das später Aufmerksamkeit braucht.</p>');
    }
    h.push('</div>');

    /* ── 5. Dein Dauerthema hier ────────────────────────── */
    h.push('<div class="b-blk b-dauer"><h4>5 &middot; Dein Dauerthema hier</h4>');
    h.push('<p>' + esc(T.meistern) + '</p>');
    /* Reihenfolge der Felder nach dem Geburtsbild, nicht nach der
       Reihenfolge, in der sie aufgeschrieben sind. */
    var folge = (b.natal.reihenfolge && b.natal.reihenfolge.length)
                  ? b.natal.reihenfolge : b.haeuser;
    if(b.natal.leer){
      h.push('<p class="b-leise">Dieser Bereich ist bei dir von Geburt an unbesetzt. ' +
             'Das heißt nicht, dass er leer bleibt &mdash; nur, dass du ihn selbst füllen musst, ' +
             'statt von einer Veranlagung hineingeschoben zu werden.</p>');
    } else {
      var kernH = folge[0], HH = bD().HAUS[kernH];
      h.push('<p>Dein Schwerpunkt liegt hier bei dem, was man so beschreiben kann: ' +
             esc(HH ? HH.kurz : '') + '. ' + esc(HH ? HH.meistern : '') + '</p>');
    }
    /* Die Facetten: jeder Bereich hat mehrere Seiten, und welche
       davon bei dieser Person oben steht, entscheidet das
       Geburtsbild — nicht die Reihenfolge in der Textdatei. */
    h.push('<div class="b-fac">');
    for(var fi=0; fi<folge.length; fi++){
      var fh = folge[fi], F = T.facetten ? T.facetten[fh] : null;
      if(!F) continue;
      h.push('<div class="b-fa' + (fi === 0 && !b.natal.leer ? ' b-fa1' : '') + '">');
      if(fi === 0 && !b.natal.leer)
        h.push('<span class="b-marke">Davon bei dir am meisten</span>');
      h.push('<h5>' + esc(F.t) + '</h5>');
      h.push('<p>' + esc(F.s) + '</p>');
      if(n >= 2){
        var dr = b.natal.planeten.filter(function(x){ return x.haus === fh; })
                  .map(function(x){ return x.p; });
        h.push('<p class="ac-tech">' + fh + '. Haus &mdash; ' +
               esc(dr.length ? dr.join(', ') : 'unbesetzt') + '</p>');
      }
      h.push('</div>');
    }
    h.push('</div>');
    if(n >= 2){
      var tp = b.natal.planeten.map(function(x){ return x.p + ' im ' + x.haus + '.'; }).join(', ');
      h.push('<p class="ac-tech">' + esc(T.techFeld) + '. ' +
             (tp ? 'Natal darin: ' + esc(tp) + ' Haus.' : 'Natal unbesetzt.') + '</p>');
    }
    h.push('</div>');

    h.push('</div></details>');
    return h.join('');
  }

  /* Ende eines Kapitels als Jahr — die Zeitenseite rechnet in
     Tagen seit der Geburt, hier wird daraus ein Datum. */
  var GEB_MS = null;
  function kapEnde(a){
    if(GEB_MS === null || !a) return 'auf Weiteres';
    var d = new Date(GEB_MS + a.bis * 86400000);
    return MN[d.getUTCMonth()] + ' ' + d.getUTCFullYear();
  }

  /* ── Überblick ──────────────────────────────────────────────── */
  function ueberblick(bs){
    var h = ['<div class="b-ueber">'];
    for(var i=0;i<bs.length;i++){
      var b = bs[i], L = bD().LAUT[b.laut];
      h.push('<a class="b-u" href="#ber-' + b.k + '" data-k="' + b.k + '">');
      h.push('<span class="b-ubalk"><i style="width:' + ((b.laut+1)*25) +
             '%;background:' + L.farbe + '"></i></span>');
      h.push('<span class="b-un">' + esc(b.name) + '</span>');
      h.push('<span class="b-ul" style="color:' + L.farbe + '">' + esc(L.n) + '</span>');
      h.push('</a>');
    }
    h.push('</div>');
    /* Die Skala einmal erklären, zugeklappt. */
    h.push('<details class="b-legende"><summary>Was heißen die vier Stufen?</summary><dl>');
    for(var j=0;j<bD().LAUT.length;j++){
      var S = bD().LAUT[j];
      h.push('<dt style="color:' + S.farbe + '">' + esc(S.n) + '</dt>');
      h.push('<dd>' + esc(S.satz) + '</dd>');
    }
    h.push('</dl></details>');
    return h.join('');
  }

  /* ── Alles zeichnen ─────────────────────────────────────────── */
  function alles(){
    var p = aktiv();
    var kopf = document.getElementById('bkopf');
    var ziel = document.getElementById('bliste');
    var ueb  = document.getElementById('bueber');
    if(!ziel) return;

    if(!p){
      if(kopf) kopf.innerHTML = '<p class="b-hinweis">Für diese Seite fehlt ein Profil. ' +
        'Leg eines unter <a href="profile.html">Profile</a> an &mdash; danach steht hier, ' +
        'was bei dir gerade in welchem Bereich los ist.</p>';
      ziel.innerHTML = ''; if(ueb) ueb.innerHTML = '';
      return;
    }

    /* Stichtag */
    var feld = document.getElementById('bdatum');
    var jetzt = new Date();
    if(feld && feld.value){
      var t = feld.value.split('-');
      jetzt = new Date(Date.UTC(+t[0], +t[1]-1, +t[2], 12, 0));
    }
    var jd = jetzt.getTime()/86400000 + 2440587.5;

    var C = chartVon(p);
    var jdGeb = jdFromUT(p.y, p.mo, p.d, p.h + p.mi/60 - p.tz);
    var gebDat = new Date(Date.UTC(p.y, p.mo-1, p.d, p.h - p.tz, p.mi));
    GEB_MS = gebDat.getTime();

    /* Stichtag vor der Geburt abfangen, bevor gerechnet wird */
    if(jd < jdGeb){
      if(kopf) kopf.innerHTML = '<p class="b-hinweis">Der Stichtag liegt vor der Geburt. ' +
        'Stell ihn auf ein Datum danach.</p>';
      ziel.innerHTML = ''; if(ueb) ueb.innerHTML = '';
      return;
    }

    /* Kapitel aus der Zeitenseite, falls geladen */
    var Z = null, tage = jd - jdGeb;
    try{
      if(window.AC_ZEIT) Z = AC_ZEIT.blatt(C, jdGeb, gebDat, jetzt);
    }catch(e){ Z = null; }

    var Bl = bB().blatt(C, jd, Z, tage);

    /* lauteste zuerst; bei gleicher Lautstärke die mit mehr Vorgängen */
    var bs = Bl.bereiche.slice().sort(function(a,b){
      if(b.laut !== a.laut) return b.laut - a.laut;
      return b.laeuft.length - a.laeuft.length;
    });

    /* Kopf */
    if(kopf){
      var lauteste = bs[0];
      var k = [];
      k.push('<p class="b-fuer">Gerechnet für <b>' + esc(namen(p)) + '</b>');
      if(feld && feld.value) k.push(' &middot; Stichtag ' + esc(feld.value.split('-').reverse().join('.')));
      k.push('</p>');
      k.push('<p class="b-oben">' + esc(bD().BER[lauteste.k].lautSatz[lauteste.laut]) + '</p>');
      /* Kein zweites Mal dasselbe sagen — stattdessen der Handgriff,
         der aus dem stärksten Vorgang dieses Bereichs folgt. */
      var sp = lauteste.laeuft.length ? vorgangSatz(lauteste.laeuft[0], lauteste) : null;
      if(sp) k.push('<p class="b-oben b-tat">' + esc(sp.tun) + '</p>');
      var stille = bs.filter(function(x){ return x.laut === 0; });
      if(stille.length)
        k.push('<p class="b-oben b-leise">Ruhig ist es gerade bei: ' +
               esc(stille.map(function(x){ return x.name; }).join(', ')) + '.</p>');
      kopf.innerHTML = k.join('');
    }

    if(ueb) ueb.innerHTML = ueberblick(bs);

    /* die drei lautesten offen, der Rest zugeklappt */
    var h = [];
    for(var i=0;i<bs.length;i++) h.push(bereichBlock(bs[i], i < 3));
    ziel.innerHTML = h.join('');

    try{ if(window.AC_NIV) AC_NIV.anwenden(); }catch(e){}
  }

  /* ── Bedienung ──────────────────────────────────────────────── */
  function personen(){
    var ziel = document.getElementById('bpersonen');
    if(!ziel) return;
    var a = profile(), akt = aktiv();
    if(a.length < 2){ ziel.innerHTML = ''; return; }
    var h = [];
    for(var i=0;i<a.length;i++){
      h.push('<button type="button" class="b-knopf' +
             (akt && a[i].id === akt.id ? ' ist' : '') +
             '" data-id="' + esc(a[i].id) + '">' + esc(namen(a[i])) + '</button>');
    }
    ziel.innerHTML = h.join('');
    ziel.onclick = function(e){
      var b = e.target.closest ? e.target.closest('button[data-id]') : null;
      if(!b) return;
      try{ AC_P.setzeAktiv(b.getAttribute('data-id')); }catch(err){}
      personen(); alles();
    };
  }

  function start(){
    D = document;
    if(!window.AC_BER || !window.AC_BDAT) return;

    var feld = D.getElementById('bdatum');
    if(feld){
      feld.onchange = alles;
      var h = D.getElementById('bheute');
      if(h) h.onclick = function(){ feld.value = ''; alles(); };
    }
    /* Der ehrliche Teil steht fest und wird einmal gezeichnet. */
    var eh = D.getElementById('behrlich');
    if(eh && window.AC_BDAT){
      var e = [];
      for(var i=0;i<bD().EHRLICH.length;i++){
        e.push('<h4>' + esc(bD().EHRLICH[i].f) + '</h4>');
        e.push('<p>' + esc(bD().EHRLICH[i].a) + '</p>');
      }
      eh.innerHTML = e.join('');
    }

    personen();
    alles();

    /* Überblick springt und klappt den Bereich auf */
    var ueb = D.getElementById('bueber');
    if(ueb) ueb.onclick = function(e){
      var a = e.target.closest ? e.target.closest('a[data-k]') : null;
      if(!a) return;
      var d = D.getElementById('ber-' + a.getAttribute('data-k'));
      if(d && !d.open) d.open = true;
    };

    try{ if(window.AC_NIV) AC_NIV.leiste(D.getElementById('nivleiste'), alles); }catch(err){}
  }

  if(D === null && document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', start);
  else start();

  window.AC_BAPP = { alles:alles, dauer:dauer, datum:datum };

})();
