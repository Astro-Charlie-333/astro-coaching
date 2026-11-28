/* ── Werkstatt ────────────────────────────────────────────────
   Mandy am 2.11.: „Brauche da eine Übersicht oder sowas wo ich dann
   alles abrufen kann auf einem Blick zum jeweiligen klient*In."

   Die Teile gab es alle schon — Profile, Dossier, Begleitung, die
   Readings. Nur lagen sie auf fünf Seiten und in zwei Speichern. Diese
   Seite legt nichts Neues an, sie liest zusammen:

     ac_profile_v1   Menschen, Geburtsdaten, Readings  (profil.js)
     ac_begleit_v1   Notizen je Mensch und Sitzung     (begleitung)

   Dazu kommen zwei Felder, die es vorher nicht gab und die direkt am
   Menschen hängen, damit sie beim Aus- und Einlesen mitgehen:
     p.dok   Liste von {titel, url}
     p.merk  freie Notiz

   Nichts davon verlässt den Browser.

   Hier steht kein Satz. Jedes Wort, das auf der Seite landet, kommt
   aus `werkstatt-daten.js` und wird mit `AC_FUELL` eingesetzt; jede
   Zahl geht durch `AC_KOMMA` (Aufgabe 66). Was hier stünde, zöge beim
   Umzug in eine andere Umgebung nicht mit (`PRODUKT.md` Abschnitt 7),
   und `bau-werkstatt.py` bricht deshalb ab, sobald wieder einer
   dasteht. */
(function(){
  'use strict';

  function el(i){ return document.getElementById(i); }
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;')
    .replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function zwei(n){ return ('0'+n).slice(-2); }

  var ZEICHEN = ['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau',
    'Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische'];
  /* Klassische Herrscher. Die modernen stehen daneben, wo es welche
     gibt — welcher gilt, entscheidet nicht diese Seite. */
  var HERR = {Widder:'Mars', Stier:'Venus', Zwillinge:'Merkur', Krebs:'Mond',
    'Löwe':'Sonne', Jungfrau:'Merkur', Waage:'Venus', Skorpion:'Mars',
    'Schütze':'Jupiter', Steinbock:'Saturn', Wassermann:'Saturn',
    Fische:'Jupiter'};
  var PLANETEN = ['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn',
    'Uranus','Neptun','Pluto'];

  function zeichen(l){ return ZEICHEN[Math.floor(((l%360)+360)%360/30)]; }
  function grad(l){
    return AC_FUELL(WK_T.grad, {g: AC_KOMMA(((l%360)+360)%360%30, 0)});
  }

  function alter(p){
    if(!p.y) return null;
    var h=new Date(), g=new Date(p.y, (p.mo||1)-1, p.d||1);
    var a=h.getFullYear()-g.getFullYear();
    var m=h.getMonth()-g.getMonth();
    if(m<0 || (m===0 && h.getDate()<g.getDate())) a--;
    return a;
  }

  function chart(p){
    if(!p || !p.y || p.lat===undefined || p.lat===null) return null;
    try{
      return chartVon({y:p.y, mo:p.mo, d:p.d, h:p.h||0, mi:p.mi||0,
        tz:p.tz||0, lat:p.lat, lon:p.lon});
    }catch(e){ return null; }
  }

  /* ── Begleitungsstand ────────────────────────────────────────
     Gelesen, nicht geschrieben. Geschrieben wird in begleitung.html —
     zwei Seiten, die denselben Speicher bearbeiten, überschreiben sich
     sonst gegenseitig. */
  function begleit(){
    try{ return JSON.parse(localStorage.getItem('ac_begleit_v1')||'{}')||{}; }
    catch(e){ return {}; }
  }
  function notizenVon(pid){
    var b=begleit(), raus=[];
    /* Die Begleitung legt je Mensch und Sitzung ab. Welche Form der
       Schlüssel genau hat, weiß diese Seite nicht sicher — deshalb wird
       gesucht statt angenommen. */
    Object.keys(b).forEach(function(k){
      if(k.indexOf(pid)===-1) return;
      var m=k.match(/(\d+)\s*$/);
      var t=b[k];
      if(t && typeof t==='object') t=t.text||t.notiz||'';
      if(typeof t!=='string' || !t.trim()) return;
      raus.push({nr:m?parseInt(m[1],10):0, text:t.trim()});
    });
    raus.sort(function(x,y){ return x.nr-y.nr; });
    return raus;
  }

  var GANZ = WK_T.sitzungen.length;

  /* Wie viele Sitzungen notiert sind, in Worten. Einzahl, Mehrzahl und
     „noch keine" sind drei Vorlagen und nicht ein Satz mit angeklebter
     Zahl (AN_T.waage, 23.11.). */
  function standText(tafel, p, n){
    if(p.eigen) return tafel.eigen;
    if(!n.length) return tafel.keine;
    return AC_FUELL(tafel.einige, {n:n.length, ganz:GANZ});
  }

  /* ── Die Liste ───────────────────────────────────────────────── */
  function zeichneListe(){
    var leute = AC_P.alle().filter(function(p){ return !p.eigen; });
    var eigene = AC_P.alle().filter(function(p){ return p.eigen; });
    /* Das eigene Profil steht mit in der Liste, aber hinten — es ist
       kein Klient, aber man will es trotzdem erreichen. */
    var alle = leute.concat(eigene);

    el('wkanzahl').textContent = leute.length === 0 ? WK_T.anzahl.keine
      : (leute.length === 1 ? WK_T.anzahl.eine
         : AC_FUELL(WK_T.anzahl.viele, {n: leute.length}));

    el('wkleer').hidden = alle.length > 0;

    el('wkkarten').innerHTML = alle.map(function(p){
      var c = chart(p), a = alter(p), n = notizenVon(p.id);
      var marke = [];
      if(c){
        marke.push(AC_FUELL(WK_T.marke.asc,   {z: zeichen(c.ASC)}));
        marke.push(AC_FUELL(WK_T.marke.sonne, {z: zeichen(c.Sonne)}));
        marke.push(AC_FUELL(WK_T.marke.mond,  {z: zeichen(c.Mond)}));
      } else { marke.push(WK_T.ohneBild); }
      if(a!==null) marke.push(AC_KOMMA(a, 0));

      var balken = '';
      if(!p.eigen){
        for(var i=1;i<=GANZ;i++){
          var hat = n.filter(function(x){ return x.nr===i; }).length > 0;
          balken += '<i class="' + (hat?'an':'') + '"></i>';
        }
      }

      return '<button class="wk-k" data-id="' + esc(p.id) + '">'
        + '<div class="wk-k-n">' + esc(AC_P.anzeige(p, true)) + '</div>'
        + '<div class="wk-k-m">' + esc(marke.join(' · ')) + '</div>'
        + '<div class="wk-k-s">' + esc(standText(WK_T.stand, p, n)) + '</div>'
        + (balken ? '<div class="wk-k-b">' + balken + '</div>' : '')
        + '</button>';
    }).join('');

    [].slice.call(document.querySelectorAll('.wk-k')).forEach(function(b){
      b.addEventListener('click', function(){ oeffne(b.getAttribute('data-id')); });
    });
  }

  /* ── Die Einzelansicht ───────────────────────────────────────── */
  var offen = null;

  function oeffne(pid){
    var p = AC_P.alle().filter(function(x){ return x.id===pid; })[0];
    if(!p) return;
    offen = p;
    el('wkliste').hidden = true;
    el('wkdetail').hidden = false;
    window.scrollTo(0,0);

    el('wkname').textContent = AC_P.anzeige(p, true);
    var a = alter(p);
    var geb = [];
    if(p.d && p.mo && p.y)
      geb.push(AC_FUELL(WK_T.datum, {tag:p.d, monat:p.mo, jahr:p.y}));
    if(p.h!==undefined && p.h!==null)
      geb.push(AC_FUELL(WK_T.uhr, {std:zwei(p.h), min:zwei(p.mi||0)}));
    if(p.ort) geb.push(p.ort);
    if(a!==null) geb.push(AC_FUELL(a===1 ? WK_T.jahre.eins : WK_T.jahre.viele,
                                   {n: AC_KOMMA(a, 0)}));
    el('wkgeb').textContent = geb.join(' · ') || WK_T.ohneGeburt;

    var n = notizenVon(p.id);
    el('wkstand').textContent = standText(WK_T.standLang, p, n);

    spruenge(p);
    blick(p);
    sitzungen(n);
    dokumente(p);
    readings(p);
    merk(p);
  }

  function spruenge(p){
    el('wkspruenge').innerHTML = WK_T.spruenge.map(function(w){
      return '<a class="wk-sp" data-ziel="' + esc(w.ziel) + '" href="'
        + esc(w.ziel) + '">' + esc(w.titel) + '</a>';
    }).join('');
    /* Erst das Profil aktiv setzen, dann springen — sonst steht drüben
       der falsche Mensch und man wundert sich über die Aussagen. */
    [].slice.call(el('wkspruenge').querySelectorAll('.wk-sp')).forEach(function(a){
      a.addEventListener('click', function(ev){
        ev.preventDefault();
        try{ AC_P.setzeAktiv(p.id); }catch(e){}
        location.href = a.getAttribute('data-ziel');
      });
    });
  }

  function blick(p){
    var c = chart(p), T = WK_T.blick;
    if(!c){
      el('wkblick').innerHTML = '<div class="wk-b1 weit"><div class="v">'
        + esc(T.ohne) + '</div><div class="z">' + esc(T.ohneZ)
        + '</div></div>';
      return;
    }
    var k = [];
    function kasten(l, v, z, weit){
      k.push('<div class="wk-b1' + (weit?' weit':'') + '">'
        + '<div class="l">' + esc(l) + '</div>'
        + '<div class="v">' + esc(v) + '</div>'
        + (z ? '<div class="z">' + esc(z) + '</div>' : '') + '</div>');
    }
    function stellung(vorlage, punkt){
      return AC_FUELL(vorlage, {z: zeichen(punkt), g: grad(punkt),
                                haus: haus(c, punkt)});
    }

    kasten(T.asc.l, AC_FUELL(WK_T.nurZeichen,
      {z: zeichen(c.ASC), g: grad(c.ASC)}), T.asc.z);
    kasten(T.sonne.l, stellung(WK_T.stellung, c.Sonne), T.sonne.z);
    kasten(T.mond.l,  stellung(WK_T.stellung, c.Mond),  T.mond.z);
    kasten(T.mc.l,    stellung(WK_T.stellungMC, c.MC),  T.mc.z);

    /* Häufung: ein Haus mit drei oder mehr Planeten ist das Thema, über
       das man zuerst spricht. */
    var proHaus = {};
    PLANETEN.forEach(function(x){
      if(c[x]===undefined) return;
      var h = haus(c, c[x]);
      (proHaus[h] = proHaus[h] || []).push(x);
    });
    var voll = Object.keys(proHaus).filter(function(h){
      return proHaus[h].length >= 3; });
    if(voll.length){
      voll.forEach(function(h){
        kasten(T.haeufung.l,
          AC_FUELL(T.haeufung.v, {n: AC_KOMMA(proHaus[h].length, 0), haus: h}),
          proHaus[h].join(', '), true);
      });
    }

    /* Der Herrscher des 1. Hauses und wo er steht — die Kette, die in
       der Praxis am meisten hergibt. */
    var z1 = zeichen(c.ASC), h1 = HERR[z1];
    if(h1 && c[h1]!==undefined){
      kasten(T.herr.l, AC_FUELL(T.herr.v,
        {p: h1, z: zeichen(c[h1]), haus: haus(c, c[h1])}), T.herr.z, true);
    }

    el('wkblick').innerHTML = k.join('');
  }

  function sitzungen(n){
    el('wkverlaufsub').textContent = n.length ? WK_T.verlauf.mit
                                              : WK_T.verlauf.ohne;
    var raus = [];
    for(var i=1;i<=GANZ;i++){
      var t = n.filter(function(x){ return x.nr===i; })[0];
      var kurz = t ? (t.text.length>400
                      ? AC_FUELL(WK_T.gekuerzt, {x: t.text.slice(0,400)})
                      : t.text)
                   : WK_T.ohneNotiz;
      raus.push('<div class="wk-s1' + (t?'':' leerzeile') + '">'
        + '<div class="n">' + AC_KOMMA(i, 0) + '</div><div>'
        + '<div class="t">' + esc(WK_T.sitzungen[i-1]) + '</div>'
        + '<div class="x">' + esc(kurz) + '</div>'
        + '</div></div>');
    }
    el('wksitzungen').innerHTML = raus.join('');
  }

  function wirt(u){
    try{ return new URL(u).hostname.replace(/^www\./,''); }
    catch(e){ return ''; }
  }

  function dokumente(p){
    var d = Array.isArray(p.dok) ? p.dok : [];
    /* Ein Tag wird nicht über zwei Zeichenketten zusammengeklebt: Die
       zweite Hälfte wäre dann für sich gelesen Sprache und nicht
       Markup, und der Satzriegel müsste sie melden. */
    el('wkdok').innerHTML = d.length ? d.map(function(x, i){
      return '<div class="wk-d1">'
        + '<a target="_blank" rel="noopener" href="' + esc(x.url) + '">'
        + esc(x.titel) + '</a>'
        + '<span class="wirt">' + esc(wirt(x.url)) + '</span>'
        + '<button type="button" aria-label="' + esc(WK_T.dok.weg)
        + '" data-i="' + i + '">×</button></div>';
    }).join('') : '<div class="wk-nichts">' + esc(WK_T.dok.leer) + '</div>';

    [].slice.call(el('wkdok').querySelectorAll('button')).forEach(function(b){
      b.addEventListener('click', function(){
        var i = parseInt(b.getAttribute('data-i'), 10);
        var liste = (p.dok||[]).slice();
        liste.splice(i,1);
        AC_P.aendere(p.id, {dok:liste});
        p.dok = liste;
        dokumente(p);
      });
    });
  }

  el('wkdokneu').addEventListener('submit', function(ev){
    ev.preventDefault();
    if(!offen) return;
    var t = el('wkdt').value.trim(), u = el('wkdu').value.trim();
    if(!u) return;
    if(!/^https?:\/\//i.test(u)) u = 'https://' + u;
    var liste = (offen.dok||[]).slice();
    liste.push({titel: t || wirt(u) || WK_T.dok.ohneTitel, url: u});
    AC_P.aendere(offen.id, {dok:liste});
    offen.dok = liste;
    el('wkdt').value = ''; el('wkdu').value = '';
    dokumente(offen);
  });

  /* Readings: ablegen, ansehen, als Datei, löschen. Die Beschriftungen
     der Knöpfe stehen am Element (data-…), die Vorlage der Datei als
     <template> im Körper — Markup gehört ins Markup. */
  function readings(p){
    var r = AC_P.readings(p.id), box = el('wkreadings'), d = box.dataset;
    el('wkreadingsteil').hidden = false;
    box.innerHTML = r.length ? r.map(function(x){
      return '<div class="wk-r1"><div class="t">' + esc(x.titel) + '</div>'
        + '<div class="d">' + esc(x.datum || '') + '</div>'
        + '<div class="wk-r-kn">'
        + '<button type="button" data-r="sehen" data-i="' + esc(x.id) + '">' + esc(d.ansehen) + '</button>'
        + '<button type="button" data-r="datei" data-i="' + esc(x.id) + '">' + esc(d.datei) + '</button>'
        + '<button type="button" class="weg" data-r="weg" data-i="' + esc(x.id) + '">' + esc(d.weg) + '</button>'
        + '</div></div>';
    }).join('') : '<div class="wk-nichts">' + esc(d.leer) + '</div>';
  }
  function readingSeite(p, x){
    var txt = x.text || '';
    var inhalt = /<[a-z][\s\S]*>/i.test(txt) ? txt
      : '<p>' + esc(txt).split(/\n\s*\n/).join('</p><p>').replace(/\n/g,'<br>') + '</p>';
    return el('wkrvorlage').innerHTML
      .split('{titel}').join(esc(x.titel)).split('{datum}').join(esc(x.datum || ''))
      .split('{fuss}').join(el('wkrfuss').innerHTML).replace('{text}', inhalt);
  }
  /* Der Dateiname behält die Schreibung des Titels. `toLowerCase` auf
     deutschem Text ist verboten (`REGELN.md` Abschnitt 4), und hier
     hat es wirklich zugeschlagen: Aus „Reading Müller" wurde
     „reading-müller". Verriegelt in bau-werkstatt.py. */
  function dateiname(titel){
    var s = String(titel||'').replace(/[^0-9A-Za-zÄÖÜäöüß]+/g,'-')
      .replace(/^-+|-+$/g,'');
    return (s || WK_T.reading.datei) + '.html';
  }
  el('wkreadings').addEventListener('click', function(ev){
    var b = ev.target.closest('button[data-r]'); if(!b || !offen) return;
    var art = b.getAttribute('data-r'), id = b.getAttribute('data-i');
    var x = AC_P.readings(offen.id).filter(function(z){ return z.id===id; })[0];
    if(!x) return;
    if(art === 'weg'){
      if(confirm(el('wkrfrage').dataset.frage)){ AC_P.readingLoeschen(offen.id, id); readings(offen); }
      return;
    }
    var html = readingSeite(offen, x);
    if(art === 'sehen'){
      var w = window.open('', '_blank');
      if(w){ w.document.write(html); w.document.close(); }
      return;
    }
    var blob = new Blob([html], {type:'text/html'}), a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = dateiname(x.titel);
    document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 200);
  });
  el('wkrneu').addEventListener('submit', function(ev){
    ev.preventDefault(); if(!offen) return;
    var t = el('wkrt').value.trim(), x = el('wkrx').value;
    if(!t && !x.trim()) return;
    AC_P.readingHinzu(offen.id, t || WK_T.reading.ohneTitel, x);
    el('wkrt').value = ''; el('wkrx').value = '';
    readings(offen);
  });

  var merkUhr = null;
  function merk(p){
    var f = el('wkmerk');
    f.value = p.merk || '';
    el('wkgesp').textContent = '';
    f.oninput = function(){
      clearTimeout(merkUhr);
      el('wkgesp').textContent = WK_T.merk.laeuft;
      merkUhr = setTimeout(function(){
        AC_P.aendere(p.id, {merk: f.value});
        p.merk = f.value;
        el('wkgesp').textContent = WK_T.merk.fertig;
      }, 600);
    };
  }

  el('wkzurueck').addEventListener('click', function(ev){
    ev.preventDefault();
    offen = null;
    el('wkdetail').hidden = true;
    el('wkliste').hidden = false;
    zeichneListe();
    window.scrollTo(0,0);
  });

  /* ── Anlegen, bearbeiten, löschen ──────────────────────────────
     Seit dem 18.11. legt die Praxis ihre Klient*innen selbst an. Das
     Formular ist dasselbe wie auf „Mein Profil" (profil-formular.js). */
  var form = el('wkform'), ausDetail = null;
  function formAuf(auf){
    form.hidden = !auf; el('wkneu').setAttribute('aria-expanded', auf ? 'true' : 'false');
  }
  AC_FORM.einbauen(form, {kuerzel:true, notiz:true, eigen:true, eigenVorgabe:false,
    titelNeu:form.dataset.titelNeu, titelBearb:form.dataset.titelBearb, knopf:form.dataset.knopf,
    nachSpeichern:function(p){
      formAuf(false); zeichneListe();
      if(ausDetail){ var z = ausDetail; ausDetail = null; oeffne(z); }
      else oeffne(p.id);
    }});
  el('wkneu').addEventListener('click', function(){
    ausDetail = null; AC_FORM.leeren(); formAuf(form.hidden);
    if(!form.hidden) el('pfname').focus();
  });
  el('pfabbrechen').addEventListener('click', function(){
    formAuf(false);
    if(ausDetail){ var z = ausDetail; ausDetail = null; oeffne(z); }
  });
  el('wkbearb').addEventListener('click', function(){
    if(!offen) return;
    ausDetail = offen.id;
    el('wkdetail').hidden = true; el('wkliste').hidden = false;
    formAuf(true); AC_FORM.laden(offen.id);
  });
  el('wkloeschen').addEventListener('click', function(){
    if(!offen || !confirm(el('wkloeschen').dataset.frage)) return;
    AC_P.loesche(offen.id); offen = null;
    el('wkdetail').hidden = true; el('wkliste').hidden = false;
    zeichneListe(); window.scrollTo(0,0);
  });

  /* Die Leiste springt zu Abschnitten der Liste. Steht gerade eine
     Einzelansicht offen, geht sie dafür zu. */
  function sprung(){
    var id = location.hash.slice(1);
    if(!id || !document.getElementById(id) || el('wkliste').contains(document.getElementById(id)) === false) return;
    if(!el('wkdetail').hidden){ offen = null; el('wkdetail').hidden = true; el('wkliste').hidden = false; zeichneListe(); }
    [].slice.call(document.querySelector('.sk-nav').querySelectorAll('a')).forEach(function(a){
      a.classList.toggle('ist', a.getAttribute('href').split('#')[1] === id); });
    setTimeout(function(){ document.getElementById(id).scrollIntoView({block:'start'}); }, 0);
  }
  window.addEventListener('hashchange', sprung);

  /* Sichern */
  el('wkexport').addEventListener('click', function(){ AC_P.exportieren(); });
  el('wkimportbtn').addEventListener('click', function(){ el('wkimportfile').click(); });
  el('wkimportfile').addEventListener('change', function(ev){
    var f = ev.target.files[0]; if(!f) return;
    var r = new FileReader();
    r.onload = function(){
      try{ var n = AC_P.importieren(r.result, false); el('wkiomeldung').textContent = '+' + AC_KOMMA(n, 0); zeichneListe(); }
      catch(e){ el('wkiomeldung').textContent = '×'; }
    };
    r.readAsText(f); ev.target.value = '';
  });

  zeichneListe();
  sprung();
})();
