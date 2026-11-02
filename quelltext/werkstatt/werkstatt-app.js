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

   Nichts davon verlässt den Browser. */
(function(){
  'use strict';

  function el(i){ return document.getElementById(i); }
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;')
    .replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

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
  function grad(l){ return (((l%360)+360)%360%30).toFixed(0)+'°'; }

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

  var SITZUNGSNAMEN = ['Ankommen','Das Bild','Das Muster','Der Gewinn',
    'Die Landung','Abschluss'];

  /* ── Die Liste ───────────────────────────────────────────────── */
  function zeichneListe(){
    var leute = AC_P.alle().filter(function(p){ return !p.eigen; });
    var eigene = AC_P.alle().filter(function(p){ return p.eigen; });
    /* Das eigene Profil steht mit in der Liste, aber hinten — es ist
       kein Klient, aber man will es trotzdem erreichen. */
    var alle = leute.concat(eigene);

    el('wkanzahl').textContent = leute.length === 0
      ? 'Noch niemand, mit dem du arbeitest.'
      : (leute.length === 1 ? 'Ein Mensch, mit dem du arbeitest.'
         : leute.length + ' Menschen, mit denen du arbeitest.');

    el('wkleer').hidden = alle.length > 0;

    el('wkkarten').innerHTML = alle.map(function(p){
      var c = chart(p), a = alter(p), n = notizenVon(p.id);
      var marke = [];
      if(c){
        marke.push('AC ' + zeichen(c.ASC));
        marke.push('☉ ' + zeichen(c.Sonne));
        marke.push('☽ ' + zeichen(c.Mond));
      } else { marke.push('keine Geburtsdaten'); }

      var stand;
      if(p.eigen) stand = 'Dein eigenes Profil';
      else if(!n.length) stand = 'Noch keine Sitzungsnotizen';
      else stand = n.length + ' von 6 Sitzungen notiert';

      var balken = '';
      if(!p.eigen){
        for(var i=1;i<=6;i++){
          var hat = n.filter(function(x){ return x.nr===i; }).length > 0;
          balken += '<i class="' + (hat?'an':'') + '"></i>';
        }
      }

      return '<button class="wk-k" data-id="' + esc(p.id) + '">'
        + '<div class="wk-k-n">' + esc(AC_P.anzeige(p, true)) + '</div>'
        + '<div class="wk-k-m">' + esc(marke.join(' · '))
        + (a!==null ? ' · ' + a : '') + '</div>'
        + '<div class="wk-k-s">' + esc(stand) + '</div>'
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
    if(p.d && p.mo && p.y) geb.push(p.d + '.' + p.mo + '.' + p.y);
    if(p.h!==undefined && p.h!==null)
      geb.push(('0'+p.h).slice(-2) + ':' + ('0'+(p.mi||0)).slice(-2));
    if(p.ort) geb.push(p.ort);
    if(a!==null) geb.push(a + ' Jahre');
    el('wkgeb').textContent = geb.join(' · ') || 'Keine Geburtsdaten';

    var n = notizenVon(p.id);
    el('wkstand').textContent = p.eigen
      ? 'Dein eigenes Profil.'
      : (n.length ? 'Notizen zu ' + n.length + ' von 6 Sitzungen.'
                  : 'Noch keine Sitzungsnotizen.');

    spruenge(p);
    blick(p);
    sitzungen(n);
    dokumente(p);
    readings(p);
    merk(p);
  }

  function spruenge(p){
    var wege = [['dossier.html','Dossier'], ['begleitung.html','Begleitung'],
      ['uebersicht.html','Sein Bild'], ['index.html','Was gerade läuft'],
      ['bereiche.html','Lebensbereiche']];
    el('wkspruenge').innerHTML = wege.map(function(w){
      return '<a class="wk-sp" href="' + w[0] + '" data-ziel="' + w[0] + '">'
        + esc(w[1]) + '</a>';
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
    var c = chart(p);
    if(!c){
      el('wkblick').innerHTML = '<div class="wk-b1 weit"><div class="v">'
        + 'Ohne Geburtsdatum, Uhrzeit und Ort lässt sich hier nichts rechnen.'
        + '</div><div class="z">Zu ergänzen unter Profile.</div></div>';
      return;
    }
    var k = [];
    function kasten(l, v, z, weit){
      k.push('<div class="wk-b1' + (weit?' weit':'') + '">'
        + '<div class="l">' + esc(l) + '</div>'
        + '<div class="v">' + esc(v) + '</div>'
        + (z ? '<div class="z">' + esc(z) + '</div>' : '') + '</div>');
    }

    kasten('Aszendent', zeichen(c.ASC) + ' ' + grad(c.ASC),
      'Wie er auf andere wirkt');
    kasten('Sonne', zeichen(c.Sonne) + ' ' + grad(c.Sonne)
      + ' · ' + haus(c, c.Sonne) + '. Haus', 'Worauf er hinauswill');
    kasten('Mond', zeichen(c.Mond) + ' ' + grad(c.Mond)
      + ' · ' + haus(c, c.Mond) + '. Haus', 'Was er braucht');
    kasten('MC', zeichen(c.MC) + ' ' + grad(c.MC)
      + ' · fällt ins ' + haus(c, c.MC) + '. Haus', 'Seine öffentliche Richtung');

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
        kasten('Häufung', proHaus[h].length + ' Planeten im ' + h + '. Haus',
          proHaus[h].join(', '), true);
      });
    }

    /* Der Herrscher des 1. Hauses und wo er steht — die Kette, die in
       der Praxis am meisten hergibt. */
    var z1 = zeichen(c.ASC), h1 = HERR[z1];
    if(h1 && c[h1]!==undefined){
      kasten('Herrscher des 1. Hauses',
        h1 + ' in ' + zeichen(c[h1]) + ', ' + haus(c, c[h1]) + '. Haus',
        'Wo sein Leben hauptsächlich stattfindet', true);
    }

    el('wkblick').innerHTML = k.join('');
  }

  function sitzungen(n){
    el('wkverlaufsub').textContent = n.length
      ? 'Gelesen aus der Begleitung. Geschrieben wird dort, nicht hier.'
      : 'Sobald du in der Begleitung Notizen machst, stehen sie hier.';
    var raus = [];
    for(var i=1;i<=6;i++){
      var t = n.filter(function(x){ return x.nr===i; })[0];
      raus.push('<div class="wk-s1' + (t?'':' leerzeile') + '">'
        + '<div class="n">' + i + '</div><div>'
        + '<div class="t">' + esc(SITZUNGSNAMEN[i-1]) + '</div>'
        + (t ? '<div class="x">' + esc(t.text.slice(0,400))
               + (t.text.length>400?' …':'') + '</div>'
             : '<div class="x">—</div>')
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
    el('wkdok').innerHTML = d.length ? d.map(function(x, i){
      return '<div class="wk-d1">'
        + '<a href="' + esc(x.url) + '" target="_blank" rel="noopener">'
        + esc(x.titel) + '</a>'
        + '<span class="wirt">' + esc(wirt(x.url)) + '</span>'
        + '<button type="button" data-i="' + i + '" '
        + 'aria-label="Entfernen">×</button></div>';
    }).join('') : '<div class="wk-nichts">Noch nichts abgelegt.</div>';

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
    liste.push({titel: t || wirt(u) || 'Dokument', url: u});
    AC_P.aendere(offen.id, {dok:liste});
    offen.dok = liste;
    el('wkdt').value = ''; el('wkdu').value = '';
    dokumente(offen);
  });

  function readings(p){
    var r = AC_P.readings(p.id);
    el('wkreadingsteil').hidden = false;
    el('wkreadings').innerHTML = r.length ? r.map(function(x){
      return '<div class="wk-r1"><div class="t">' + esc(x.titel) + '</div>'
        + '<div class="d">' + esc(x.datum || '') + '</div></div>';
    }).join('') : '<div class="wk-nichts">Noch keine Readings abgelegt.</div>';
  }

  var merkUhr = null;
  function merk(p){
    var f = el('wkmerk');
    f.value = p.merk || '';
    el('wkgesp').textContent = '';
    f.oninput = function(){
      clearTimeout(merkUhr);
      el('wkgesp').textContent = '…';
      merkUhr = setTimeout(function(){
        AC_P.aendere(p.id, {merk: f.value});
        p.merk = f.value;
        el('wkgesp').textContent = 'gespeichert';
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

  zeichneListe();
})();
