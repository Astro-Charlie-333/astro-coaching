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
  /* Was die Seite gerade zeigt — der Tiefgang gibt genau das aus,
     nie einen zweiten, frisch gerechneten Stand. */
  var STAND = null;
  function bD(){ return window.AC_BDAT; }
  function bB(){ return window.AC_BER; }
  /* Die Sätze, die Überblick und Tiefgang gemeinsam brauchen,
     stehen in tief-bauer.js — einmal, nicht zweimal. */
  function bT(){ return window.AC_TIEF; }
  function MN_(){ return bD().FORM.monate; }
  function ZN_(){ return bD().FORM.zeichen; }

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

  /* Die Bereiche, die dieser Mensch sehen will. Keine Auswahl heißt
     alle — die Entscheidung darüber liegt in lebensbereiche.js, hier
     wird sie nur angewendet. Gerechnet wird weiter alles: eine
     ausgeblendete Lautstärke bleibt richtig, sie wird nur nicht
     gezeigt, und die Leiste sagt das auch. */
  function gewaehlt(b){
    try{ return AC_WAHL.istGewaehlt(b.k); }catch(e){ return true; }
  }

  /* Zeitspannen, Daten, Vorgangssätze, Fensterzeilen und die
     Mechanik dazu: alles aus tief-bauer.js. Eine zweite Fassung
     hier wäre genau die Sorte Doppelung, die auseinanderläuft. */
  function dauer(tage){ return bT().dauer(tage); }
  function datum(jd){ return bT().datum(jd); }
  function vorgangSatz(v, B, gesehen){ return bT().vorgangSatz(v, gesehen); }
  function vorgangTech(v){ return bT().vorgangTech(v); }
  function fensterZeile(v){ return bT().fensterZeile(v); }
  function facTech(E){ return bT().facTech(E); }

  /* ── Facetten eines Bereichs ─────────────────────────────────
     Die Reihenfolge kommt aus dem Rechner, die Texte aus den
     Daten. Hier wird nur zusammengesteckt und gezeigt. Drei
     Facetten sind das Versprechen der Seite — weniger wäre keine
     Tiefe, mehr liest niemand. */
  var FAC_ZEIGE = 3;

  function fac(b){ return bT().facetten(b); }

  /* Der Maschinenraum eines Schritts, gesammelt an dessen Ende.
     Zwischen den Absätzen zerhackt er das Lesen; darunter wartet er. */
  function techBlock(zeilen){
    if(!zeilen || !zeilen.length) return '';
    return '<div class="ac-tech b-techblk" data-ab="2">' +
      '<span class="b-techlab">Woran das abgelesen ist</span>' +
      zeilen.map(function(z){ return '<span class="b-techz">' + esc(z) + '</span>'; }).join('') +
      '</div>';
  }

  /* ── Ein Bereich ────────────────────────────────────────────── */
  function bereichBlock(b, offen){
    var T = bD().BER[b.k], L = bD().LAUT[b.laut], n = stufe();
    if(!T) return '';
    var h = [];

    /* Ein Abschnitt, keine Klappe. Ein Sprungziel, das sich erst
       aufklappen muss, ist für den, der von außen darauf zeigt,
       kein Sprungziel — er landet auf einer geschlossenen Zeile. */
    h.push('<section class="b-ber" id="ber-' + b.k + '">');
    h.push('<div class="b-kopfz">');
    h.push('<span class="b-punkt" style="background:' + L.farbe + '"></span>');
    h.push('<h3 class="b-name">' + esc(b.name) + '</h3>');
    h.push('<span class="b-laut" style="color:' + L.farbe + '">' + esc(L.n) + '</span>');
    h.push('</div>');
    h.push('<p class="b-satz">' + esc(T.lautSatz[b.laut]) + '</p>');
    h.push('<div class="b-in">');

    /* worum es in diesem Bereich überhaupt geht */
    h.push('<p class="b-worum">' + esc(T.worum) + '</p>');

    var top = b.laeuft.slice(0, 3), gesehen = {};

    /* ── 1. Was ist los ─────────────────────────────────── */
    h.push('<div class="b-blk"><h4>1 &middot; Was ist los</h4>');
    var tech1 = [];
    if(b.kapitel){
      h.push('<p class="b-kap">' + esc(b.kapitel.laut ? bD().KAP.laut : bD().KAP.leise) + '</p>');
      if(b.nurKapitel) h.push('<p class="b-kap">' + esc(bD().KAP.nurKapitel) + '</p>');
      if(b.kapitel.anders) h.push('<p class="b-kap b-leise">' + esc(bD().KAP.widerspruch) + '</p>');
      if(n >= 2) tech1.push(bD().KAP.tech + ': ' +
        ZN_()[b.kapitel.l1.zeichen] + (b.kapitel.l1.gipfel ? ' (winkelhaft)' : '') +
        (b.kapitel.l2 ? ' \u2192 ' + ZN_()[b.kapitel.l2.zeichen] +
          (b.kapitel.l2.gipfel ? ' (winkelhaft)' : '') : ''));
    }
    if(!top.length){
      h.push('<p>' + esc(bD().LEER.keinVorgang) + '</p>');
    } else {
      for(var i=0;i<top.length;i++){
        var v = top[i], S = vorgangSatz(v, b, gesehen);
        if(!S) continue;
        h.push('<div class="b-vor' + (i === 0 ? ' b-haupt' : '') + '">');
        if(i === 0) h.push('<span class="b-marke">Das Stärkste gerade</span>');
        h.push('<p>' + esc(S.was) + '</p>');
        if(n >= 2) tech1.push(vorgangTech(v));
        h.push('</div>');
      }
    }
    h.push(techBlock(tech1));
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
      h.push('<p>' + esc(bD().LEER.tun) + '</p>');
    }
    h.push('</div>');

    /* ── 3. Wie lange das läuft ─────────────────────────── */
    h.push('<div class="b-blk"><h4>3 &middot; Wie lange das läuft</h4>');
    if(top.length){
      /* Vier Zeiträume untereinander beantworten die Frage nicht,
         sie stellen sie viermal. Der stärkste steht vorn, der Rest
         wartet hinter einer Klappe. */
      var S0z = vorgangSatz(top[0], b);
      h.push('<p class="b-zeit-haupt"><b>' + esc(S0z ? S0z.tempo : '') + '</b> ' +
             esc(fensterZeile(top[0])) + '</p>');
      if(top.length > 1){
        h.push('<details class="b-mehrzeit"><summary>Was sonst noch l\u00e4uft (' +
               (top.length - 1) + ')</summary><ul class="b-zeit">');
        for(var j=1;j<top.length;j++){
          var vj = top[j], Sj = vorgangSatz(vj, b);
          h.push('<li><b>' + esc(Sj ? Sj.tempo : '') + '</b> ' + esc(fensterZeile(vj)) + '</li>');
        }
        h.push('</ul></details>');
      }
    } else {
      h.push('<p>' + esc(bD().LEER.keinFenster) + '</p>');
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
      h.push('<p>' + esc(bD().LEER.nutzen) + '</p>');
    }
    h.push('</div>');

    /* ── 5. Dein Dauerthema hier ────────────────────────── */
    h.push('<div class="b-blk b-dauer"><h4>5 &middot; Dein Dauerthema hier</h4>');
    h.push('<p>' + esc(T.meistern) + '</p>');
    if(b.natal.leer){
      h.push('<p class="b-leise">' + esc(bD().LEER.natalLeer) + '</p>');
    } else {
      var kernH = b.natal.kernHaus, HH = bD().HAUS[kernH];
      h.push('<p>' + esc(bD().TIEF.herkunftVor) + ' ' +
             esc(HH ? HH.kurz : '') + '. ' + esc(HH ? HH.meistern : '') + '</p>');
    }
    /* Die Facetten. Ein Bereich hat mehrere Seiten; welche davon
       hier oben steht, entscheidet das Geburtsbild. Der Rechner
       sortiert, diese Stelle zeigt nur die vorderen drei. Die
       hinteren bleiben in den Daten — bei einem anderen Menschen
       stehen sie vorn. */
    var FA = fac(b);
    if(FA.length){
      h.push('<div class="b-facs">');
      h.push('<p class="b-facvor">Dieser Bereich hat bei dir drei Seiten. ' +
             'Die erste wiegt am meisten.</p>');
      for(var fi=0; fi<FAC_ZEIGE && fi<FA.length; fi++){
        var E = FA[fi], F = E.f;
        h.push('<div class="b-fac">');
        h.push('<h5>' + esc(F.titel) + '</h5>');
        h.push('<p>' + esc(F.was) + '</p>');
        h.push('<p class="b-facm">' + esc(F.meistern) + '</p>');
        if(n >= 2) h.push('<p class="ac-tech">' + esc(facTech(E)) + '</p>');
        h.push('</div>');
      }
      h.push('</div>');
    }
    if(n >= 2){
      var tp = b.natal.planeten.map(function(x){ return x.p + ' im ' + x.haus + '.'; }).join(', ');
      h.push('<p class="ac-tech">' + esc(T.techFeld) + '. ' +
             (tp ? 'Natal darin: ' + esc(tp) + ' Haus.' : 'Natal unbesetzt.') + '</p>');
    }
    h.push('</div>');

    /* Der Tiefgang zu diesem Bereich. Kein Schalter, der
       Freischalten vortäuscht: der Text ist nicht verborgen,
       sondern wird beim Antippen hier geschrieben und als Datei
       gespeichert. Siehe PRODUKT.md Abschnitt 4. */
    h.push('<div class="b-tiefzeile"><button type="button" class="b-knopf b-tiefknopf" ' +
           'data-tief="' + esc(b.k) + '">' + esc(bD().TIEF.knopfEiner) + '</button></div>');

    /* Zum Nachlesen: die langen Texte zu diesem Bereich. Sie standen
       bisher nur auf einer eigenen Übersicht — wer beim lautesten
       Bereich ankam und weiterlesen wollte, fand sie nicht. Welche
       Seite zu welchem Bereich gehört und was auf ihr steht, steht
       in bereich-daten.js; hier wird es nur gezeichnet. */
    var RM = bD().RAUM, rk = (RM.zu[b.k] || []);
    if(rk.length){
      h.push('<div class="b-nach"><h4>' + esc(RM.titel) + '</h4>');
      h.push('<p class="b-nachvor">' + esc(RM.vor) + '</p>');
      for(var ri=0; ri<rk.length; ri++){
        var R = RM.seiten[rk[ri]];
        if(!R) continue;
        h.push('<a class="b-nachl" href="' + esc(R.datei) + '" data-raum="' + esc(rk[ri]) + '">' +
               '<span class="b-nachn">' + esc(R.name) + '</span>' +
               '<span class="b-nachw">' + esc(R.was) + '</span></a>');
      }
      h.push('<p class="b-nachhin">' + esc(RM.hin) + '</p>');
      h.push('</div>');
    }

    h.push('</div></section>');
    return h.join('');
  }

  /* Ende eines Kapitels als Jahr — die Zeitenseite rechnet in
     Tagen seit der Geburt, hier wird daraus ein Datum. */
  var GEB_MS = null;
  function kapEnde(a){
    if(GEB_MS === null || !a) return 'auf Weiteres';
    var d = new Date(GEB_MS + a.bis * 86400000);
    return MN_()[d.getUTCMonth()] + ' ' + d.getUTCFullYear();
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

  /* ── Welcher Bereich ist gerade gezeigt? ─────────────────────
     Der Anker aus der Adresse gewinnt — damit ein Link von der
     Startseite wirklich bei dem Bereich ankommt, auf den er zeigt.
     Sonst der lauteste. */
  var GEWAEHLT = null;
  function ausHash(){
    var h = (location.hash || '').replace(/^#/, '');
    return (h.indexOf('ber-') === 0) ? h.slice(4) : null;
  }
  /* Wer getippt hat, hat entschieden. Der Anker zählt beim ersten
     Laden und wenn er sich ändert — danach nicht mehr. Sonst schlägt
     eine veraltete Adresse den Klick: Das Umschreiben der Adresse
     kann fehlschlagen (bei einer Datei im Browser tut es das immer),
     und die Auswahl springt stumm zurück. */
  function gewaehlterBereich(bs){
    var da = function(k){ for(var i=0;i<bs.length;i++) if(bs[i].k === k) return true; return false; };
    if(GEWAEHLT && da(GEWAEHLT)) return GEWAEHLT;
    var h = ausHash();
    if(h && da(h)){ GEWAEHLT = h; return h; }
    return bs.length ? bs[0].k : null;
  }
  function reiterLeiste(bs, k){
    var h = [];
    for(var i=0;i<bs.length;i++){
      var b = bs[i], L = bD().LAUT[b.laut], ist = (b.k === k);
      h.push('<button type="button" class="b-rt" role="tab" data-rt="' + esc(b.k) + '" ' +
             'aria-selected="' + ist + '">' +
             '<span class="b-rtp" style="background:' + L.farbe + '"></span>' +
             esc(b.name) + '</button>');
    }
    return h.join('');
  }
  /* Einen Bereich zeigen — ohne die Seite neu zu laden und ohne
     den Sprung des Browsers, der sonst am Kopf vorbeischießt. */
  function waehle(k, springen){
    GEWAEHLT = k;
    try{ history.replaceState(null, '', '#ber-' + k); }catch(e){}
    alles();
    if(springen){
      var z = document.getElementById('ber-' + k);
      if(z) z.scrollIntoView({behavior:'smooth', block:'start'});
    }
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
    }).filter(gewaehlt);
    if(!bs.length) bs = Bl.bereiche.slice();

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

    STAND = { bereiche:bs, wer:namen(p),
              stichtag:(feld && feld.value)
                ? feld.value.split('-').reverse().join('.') : '' };

    if(ueb) ueb.innerHTML = ueberblick(bs);

    /* Ein Bereich auf einmal. Zehn Kapitel untereinander waren
       achtzehn Bildschirme — da sieht niemand durch, und das
       Sprungziel von außen landete in einer zugeklappten Zeile. */
    var k = gewaehlterBereich(bs);
    var reiter = document.getElementById('breiter');
    if(reiter) reiter.innerHTML = reiterLeiste(bs, k);
    var zeig = null;
    for(var i=0;i<bs.length;i++) if(bs[i].k === k) zeig = bs[i];
    if(!zeig) zeig = bs[0];
    ziel.innerHTML = bereichBlock(zeig, true);

    try{ if(window.AC_NIV) AC_NIV.anwenden(); }catch(e){}
  }

  /* ── Der Tiefgang als Datei ───────────────────────────────────
     Der Text entsteht in tief-bauer.js, hier wird er nur zur Datei.
     Der Wissensstand entscheidet mit: steht er auf 0 oder 1, kommt
     die Datei ohne Fachsprache — dasselbe Versprechen wie auf der
     Seite, nur in einer Datei, die das Haus verlässt. */
  function echo(s){
    var e = D && D.getElementById('btiefecho');
    if(!e) return;
    e.textContent = s;
    setTimeout(function(){ if(e.textContent === s) e.textContent = ''; }, 6000);
  }

  function dateiname(teil){
    var d = new Date(), z = function(x){ return (x < 10 ? '0' : '') + x; };
    return 'tiefgang-' + teil + '-' + d.getFullYear() + '-' +
           z(d.getMonth()+1) + '-' + z(d.getDate()) + '.txt';
  }

  function tiefgang(bk){
    if(!STAND || !STAND.bereiche.length){ echo(bD().TIEF.echoOhne); return; }
    var bs = STAND.bereiche;
    if(bk) bs = bs.filter(function(x){ return x.k === bk; });
    if(!bs.length) return;
    var txt = bT().bauen(bs, { wer:STAND.wer, stichtag:STAND.stichtag }, stufe());
    var name = dateiname(bk || 'alle');
    try{
      var bl = new Blob([txt], { type:'text/plain;charset=utf-8' });
      var a = D.createElement('a');
      a.href = URL.createObjectURL(bl);
      a.download = name;
      D.body.appendChild(a); a.click();
      setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 400);
    }catch(e){ return; }
    echo(bD().TIEF.echoFertig.split('{n}').join(name));
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

    /* Der Abschnitt über den Tiefgang. Die Sätze stehen in den
       Daten, hier wird nur eingesetzt. */
    var tt = D.getElementById('btieftitel'), tv = D.getElementById('btiefvor'),
        ta = D.getElementById('btiefalle');
    if(tt) tt.textContent = bD().TIEF.seiteTitel;
    if(tv) tv.innerHTML = '<p class="u">' + esc(bD().TIEF.seiteVor) + '</p>' +
      '<p class="u">' + esc(bD().TIEF.seiteOffen) + '</p>' +
      '<p class="u">' + esc(bD().TIEF.seiteStufe) + '</p>';
    if(ta){ ta.textContent = bD().TIEF.knopfAlle;
            ta.onclick = function(){ tiefgang(null); }; }

    var liste = D.getElementById('bliste');
    if(liste) liste.addEventListener('click', function(e){
      var b = e.target.closest ? e.target.closest('button[data-tief]') : null;
      if(!b) return;
      tiefgang(b.getAttribute('data-tief'));
    });

    personen();
    alles();

    /* Der Überblick wählt aus, statt nur zu springen. */
    var ueb = D.getElementById('bueber');
    if(ueb) ueb.onclick = function(e){
      var a = e.target.closest ? e.target.closest('a[data-k]') : null;
      if(!a) return;
      e.preventDefault();
      waehle(a.getAttribute('data-k'), true);
    };
    /* Die Reiterleiste wechselt, ohne zu springen — sie steht
       ohnehin direkt über dem Bereich. */
    var rt = D.getElementById('breiter');
    if(rt) rt.onclick = function(e){
      var b = e.target.closest ? e.target.closest('button[data-rt]') : null;
      if(b) waehle(b.getAttribute('data-rt'), false);
    };
    /* Kommt jemand mit einem Anker von außen, oder geht er zurück. */
    try{ window.addEventListener('hashchange', function(){
      var k = ausHash();
      if(k && k !== GEWAEHLT) waehle(k, true); }); }catch(err){}

    try{ if(window.AC_NIV) AC_NIV.leiste(D.getElementById('nivleiste'), alles); }catch(err){}

    /* Die Auswahl der Bereiche gilt plattformweit. Ändert sie sich,
       wird die Seite neu gezeichnet — die Leiste selbst zeichnet
       wahl-app.js. */
    try{ window.addEventListener('ac-bereiche', alles); }catch(err){}
  }

  if(D === null && document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', start);
  else start();

  window.AC_BAPP = { alles:alles, dauer:dauer, datum:datum, tiefgang:tiefgang };

})();
