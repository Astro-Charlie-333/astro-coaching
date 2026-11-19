/* ── Zauber: Rechnung und Darstellung ───────────────────
   Hier steht kein Satz. Die Vorlagen stehen in ZT_T
   (zauber-texte.js), `zFuell` setzt ein, und „dein" vor etwas, das
   wechselt, bildet B_BEUGE aus kern/bahn-daten.js — die eine Stelle,
   die ein Geschlecht kennt (Aufgabe 58). bau-zauber.py bricht ab,
   sobald hier wieder eine Zeichenkette mit Sprache auftaucht.

   Und es wird hier nichts mehr angeklebt: „Sonne" plus „stunde" gab
   „Sonnestunde", der Name hinter „des" gab „der Tag des Sonne". Die
   fertigen Formen stehen in ZT_T.stunde und ZT_T.gen; bau-zauber.py
   lässt keinen Artikel und keine Endung mehr an eine Lücke heran. */
function jetztJD(){var n=new Date();
 return jdFromUT(n.getUTCFullYear(),n.getUTCMonth()+1,n.getUTCDate(),
   n.getUTCHours()+n.getUTCMinutes()/60+n.getUTCSeconds()/3600);}
function uhr(jd){ return datVon(jd).toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'}); }
function tagUhr(jd){ var d=datVon(jd);
 return d.toLocaleDateString('de-DE',{weekday:'short',day:'2-digit',month:'2-digit'})+', '+uhr(jd); }
/* Datum nur nennen, wenn es nicht heute ist */
function wannKurz(jd){
  var d=datVon(jd), n=new Date();
  var gleich=d.getFullYear()===n.getFullYear()&&d.getMonth()===n.getMonth()&&d.getDate()===n.getDate();
  return gleich? uhr(jd) : tagUhr(jd);
}
function esc(s){ return String(s===undefined||s===null?'':s).replace(/[<>&"]/g,function(c){
 return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }
function el(i){ return document.getElementById(i); }

/* ── Sätze einsetzen ──────────────────────────────────── */
var T=ZT_T;
/* Eine Lücke `{so}` je Schlüssel, in einem Durchgang. */
function zFuell(form,werte){
  var s=String(form||'');
  for(var k in werte) if(werte.hasOwnProperty(k))
    s=s.split('{'+k+'}').join(String(werte[k]===undefined||werte[k]===null?'':werte[k]));
  return s;
}
function zGross(s){ return s.charAt(0).toUpperCase()+s.slice(1); }
/* Die Zeichen stehen einmal, in ZT_ZEICHEN. */
function zZeichen(i){ return ZT_ZEICHEN[i].n; }
function zGlyphe(i){ return ZT_ZEICHEN[i].z; }
/* „5. Haus" an einer Stelle, und „dein 5. Haus" über B_BEUGE —
   das Geschlecht steht in den Daten, nicht hier. */
function zHaus(n){ return zFuell(T.haus.wort,{n:n}); }
function zDeinHaus(n){ return B_BEUGE({g:T.haus.g,wort:zHaus(n)},'nom'); }

/* ── Profil ─────────────────────────────────────────────
   `gewaehlt`, `chartVon`, `haus`, `lon`, `nrm` und `datVon` stehen in
   engine.js. Bis zum 2026-11-18 standen fünf davon hier ein zweites
   Mal, Wort für Wort gleich — eine zweite Himmelsrechnung, die
   REGELN.md Abschnitt 5 verbietet und die Namensprüfung unten jetzt
   nicht mehr durchlässt. */
var zielWahl='geld', planetWahl=null;
function profil(){
  var alle=[]; try{ alle=AC_P.alle()||[]; }catch(e){}
  if(!alle.length) return null;
  if(!gewaehlt){ var e=alle.filter(function(p){return p.eigen;})[0]||alle[0]; gewaehlt=e.id; }
  return alle.filter(function(x){return x.id===gewaehlt;})[0]||null;
}
function chart(){ var p=profil(); return p?chartVon(p):null; }
/* Ort für die Sonnenzeiten: Wohnort aus dem Profil, sonst Geburtsort, sonst Berlin */
function ort(){
  var p=profil();
  if(!p) return {lat:52.52,lon:13.405,name:'Berlin',geraten:true};
  var la=(p.wlat!==undefined&&p.wlat!==null)?p.wlat:p.lat;
  var lo=(p.wlon!==undefined&&p.wlon!==null)?p.wlon:p.lon;
  return {lat:la,lon:lo,name:p.wort||p.ort||'',geraten:false};
}

/* ── Jetzt: Planetentag, Planetenstunde, Mond ─────────── */
function jetztBauen(){
  var jd=jetztJD(), O=ort();
  var st=AC_HIMMEL.planetenStunde(jd,O.lat,O.lon);
  var ml=lon('Mond',jd), zi=Math.floor(nrm(ml)/30);
  var ol=AC_HIMMEL.ohneLauf(jd);
  var P=chart();

  var h='<div class="jz">';
  if(st.polar){
    h+='<div class="jz-k">'+T.jzKopf+'</div>'+
      '<div class="jz-gr">'+T.jzPolarGross+'</div>'+T.jzPolar+'</div>';
    el('jetztbox').innerHTML=h; return;
  }
  var pd=PLANET[st.tagesherr], ph=PLANET[st.herr];
  var naechster=AC_HIMMEL.CHALD[(AC_HIMMEL.CHALD.indexOf(st.herr)+1)%7];
  h+='<div class="jz-k">'+T.jzJetzt+'</div>'+
    '<div class="jz-gr"><span class="gl">'+ph.zchn+'</span> '+
    zFuell(T.jzStunde,{gen:T.gen[st.herr]})+'</div>'+
    zFuell(T.jzStundeSatz,{kurz:esc(ph.kurz),bis:uhr(st.bis),naechster:naechster})+
    zFuell(T.jzTagSatz,{tag:pd.tag,gen:T.gen[st.tagesherr],nr:st.nr,
      nacht:(st.nacht?T.jzNacht:''),min:Math.round(st.laengeMin)});

  h+='<div class="jz-gitter">';
  h+='<div class="jzk"><b>'+T.jzMond+'</b>'+
     zFuell(T.jzMondZeichen,{glyphe:zGlyphe(zi),zeichen:zZeichen(zi)})+
     (P?zFuell(T.jzMondHaus,{deinHaus:zDeinHaus(haus(P,ml))}):'')+'</div>';
  h+='<div class="jzk"><b>'+T.jzSonne+'</b>'+
     zFuell(T.jzSonneZeit,{auf:uhr(st.auf),unter:uhr(st.unter)})+
     (O.name?zFuell(T.jzOrt,{ort:esc(O.name)}):'')+'</div>';
  if(ol){
    h+='<div class="jzk'+(ol.leer?' warn':'')+'"><b>'+T.jzLauf+'</b>'+
      (ol.leer?zFuell(T.jzLaufJa,{seit:uhr(ol.seit),bis:wannKurz(ol.bis)})
             :zFuell(T.jzLaufNein,{bis:wannKurz(ol.bis)}))+'</div>';
  }
  h+='</div>';
  if(ol&&ol.leer){
    h+='<div class="jz-warn">'+zFuell(T.jzLeer,{winkel:ol.letzter.name,planet:ol.letzter.planet,
      zeit:uhr(ol.letzter.jd),bis:wannKurz(ol.bis),
      zeichen:zZeichen(ol.naechstesZeichen)})+'</div>';
  }
  h+='</div>';
  el('jetztbox').innerHTML=h;
}

/* ── Stundentafel ─────────────────────────────────────── */
function tafelBauen(){
  var jd=jetztJD(), O=ort();
  var t=AC_HIMMEL.stundenTabelle(jd,O.lat,O.lon);
  if(!t.length){ el('tafel').innerHTML='<div class="leerk">'+T.tfLeer+'</div>'; return; }
  el('tafel').innerHTML='<div class="taf">'+t.map(function(s){
    return '<div class="tz'+(s.jetzt?' jetzt':'')+(s.nacht?' nacht':'')+'">'+
      '<div class="o"><span class="nr">'+s.nr+'</span><span class="zt">'+uhr(s.von)+'</span></div>'+
      '<div class="u"><span class="gl">'+PLANET[s.herr].zchn+'</span>'+
      '<span class="nm">'+s.herr+'</span></div></div>';
  }).join('')+'</div>'+
  '<p class="sub taf-fuss">'+T.tfFuss+'</p>';
}

/* ── Planeten ─────────────────────────────────────────── */
function planetenBauen(){
  var jd=jetztJD(), P=chart();
  el('planeten').innerHTML=PL.map(function(k){
    var d=PLANET[k];
    var tl=lon(k,jd), tz=Math.floor(nrm(tl)/30);
    var zu=ZUTAT.filter(function(z){return z.p===k;}).map(function(z){return z.n;});
    var se=STEIN.filter(function(s){return s.p===k;}).map(function(s){return s.n;});
    var transit=P?zFuell(T.plTransitHaus,{zeichen:zZeichen(tz),haus:zHaus(haus(P,tl)),
                    feld:HAUSFELD[haus(P,tl)-1]})
                 :zFuell(T.plTransit,{zeichen:zZeichen(tz)});
    var natal='';
    if(P){ var nz=Math.floor(nrm(P[k])/30);
      natal=zFuell(T.plNatal,{zeichen:zZeichen(nz),
        haus:zHaus(haus(P,P[k])),
        schmack:(GESCHMACK[k]?zFuell(T.plSchmack,{satz:GESCHMACK[k][nz][0],
          nicht:GESCHMACK[k][nz][1].replace(/\.$/,'')}):'')}); }
    return '<details class="pk"><summary>'+
      '<span class="gl">'+d.zchn+'</span>'+
      '<span class="t">'+k+'</span>'+
      '<span class="w">'+zFuell(T.plMeta,{tag:d.tag,metall:d.metall})+'</span></summary>'+
      '<div class="in">'+zFuell(T.plKurz,{kurz:esc(d.kurz),fuer:esc(d.fuer)})+
      '<p class="pl-t">'+esc(transit)+'</p>'+natal+
      '<div class="pl-r"><div><b>'+T.plFarben+'</b>'+esc(d.farben)+'</div>'+
      '<div><b>'+T.plZutaten+'</b>'+zu.join(', ')+'</div>'+
      '<div><b>'+T.plSteine+'</b>'+se.join(', ')+'</div></div></div></details>';
  }).join('');
}

/* ── Ziele ────────────────────────────────────────────── */
function zieleBauen(){
  var w=el('zielwahl'); w.innerHTML='';
  ZIEL.forEach(function(z){
    var b=document.createElement('button'); b.type='button'; b.className='chip'; b.textContent=z.n;
    b.setAttribute('aria-pressed', zielWahl===z.id);
    b.addEventListener('click',function(){ zielWahl=z.id; zieleBauen(); });
    w.appendChild(b);
  });
  var z=ZIEL.filter(function(x){return x.id===zielWahl;})[0];
  var jd=jetztJD(), P=chart(), O=ort();
  var st=AC_HIMMEL.planetenStunde(jd,O.lat,O.lon);
  var h='';

  /* Persönlicher Anschluss: wo läuft der Hauptplanet gerade bei ihr */
  var haupt=z.pl[0];
  var tl=lon(haupt,jd), tz=Math.floor(nrm(tl)/30);
  h+='<div class="zbox">';
  h+='<div class="z-kopf"><span class="gl">'+PLANET[haupt].zchn+'</span>'+
     '<div><b>'+z.n+'</b><span>'+z.pl.join(T.zUnd)+'</span></div></div>';
  h+='<p class="z-wann">'+zFuell(T.zWann,{wann:esc(z.wann)})+'</p>';
  if(st&&!st.polar&&z.pl.indexOf(st.herr)>=0){
    h+='<div class="z-jetzt">'+zFuell(T.zJetzt,{stunde:T.stunde[st.herr],bis:uhr(st.bis)})+'</div>';
  }
  if(P){
    var hs=haus(P,tl);
    h+=zFuell(T.zDein,{planet:haupt,zeichen:zZeichen(tz),
      deinHaus:zDeinHaus(hs),feld:HAUSFELD[hs-1]});
    var nz=Math.floor(nrm(P[haupt])/30);
    if(GESCHMACK[haupt]) h+=zFuell(T.zKlang,{satz:GESCHMACK[haupt][nz][0]});
    /* Hausherrscher des Zielhauses */
    var zh=(Math.floor(P.ASC/30)+z.haus-1)%12;
    var hr=HERRSCHER[zh];
    var hrz=Math.floor(nrm(P[hr])/30);
    h+=zFuell(T.zFaden,{deinZielhaus:zGross(zDeinHaus(z.haus)),zeichen:zZeichen(zh),
      herr:hr,herrZeichen:zZeichen(hrz),herrHaus:zHaus(haus(P,P[hr]))})+'</div>';
  } else {
    h+='<div class="z-leer">'+zFuell(T.zLeer,{planet:haupt})+'</div>';
  }
  h+='<div class="z-zeug"><div><b>'+T.zZutaten+'</b>'+esc(z.ein)+'</div>'+
     '<div><b>'+T.zSteine+'</b>'+esc(z.st)+'</div>'+
     '<div><b>'+T.zMond+'</b>'+esc(z.mond)+'</div></div>';
  h+='</div>';

  h+=z.rituale.map(function(r){
    return '<div class="rit"><div class="r-zeit">'+esc(r.zeit)+'</div>'+
      '<h3>'+esc(r.n)+'</h3>'+r.t+'</div>';
  }).join('');
  el('zielinhalt').innerHTML=h;
}

/* ── Zutaten und Steine ───────────────────────────────── */
function zPlanetChip(k){ return zFuell(T.filterPlanet,{glyphe:PLANET[k].zchn,planet:k}); }
var zutFilter='alle';
function zutatenBauen(){
  var f=el('zutfilter'); f.innerHTML='';
  ['alle'].concat(PL).forEach(function(k){
    var b=document.createElement('button'); b.type='button'; b.className='chip';
    b.innerHTML=(k==='alle'?T.filterAlle:zPlanetChip(k));
    b.setAttribute('aria-pressed', zutFilter===k);
    b.addEventListener('click',function(){ zutFilter=k; zutatenBauen(); });
    f.appendChild(b);
  });
  el('zutaten').innerHTML=ZUTAT.filter(function(z){return zutFilter==='alle'||z.p===zutFilter;})
    .map(function(z){
      return '<div class="zt-k"><div class="kopf"><b>'+esc(z.n)+'</b>'+
        '<span class="pl">'+zPlanetChip(z.p)+'</span></div>'+
        '<div class="art">'+esc(z.art)+'</div><p>'+z.t+'</p></div>';
    }).join('');
}
var stFilter='alle';
function steineBauen(){
  var f=el('steinfilter'); f.innerHTML='';
  ['alle'].concat(PL).forEach(function(k){
    var b=document.createElement('button'); b.type='button'; b.className='chip';
    b.innerHTML=(k==='alle'?T.filterAlle:zPlanetChip(k));
    b.setAttribute('aria-pressed', stFilter===k);
    b.addEventListener('click',function(){ stFilter=k; steineBauen(); });
    f.appendChild(b);
  });
  el('steine').innerHTML=STEIN.filter(function(s){return stFilter==='alle'||s.p===stFilter;})
    .map(function(s){
      return '<div class="st-k"><div class="kopf"><b>'+esc(s.n)+'</b>'+
        '<span class="pl">'+zPlanetChip(s.p)+'</span></div>'+
        '<p>'+s.t+'</p><div class="warn">'+
        (s.wasser?'<span class="ok">'+T.stWasserJa+'</span>'
                 :'<span class="nein">'+T.stWasserNein+'</span>')+
        (s.sonne?'<span class="ok">'+T.stSonneJa+'</span>'
                :'<span class="nein">'+T.stSonneNein+'</span>')+
        '</div></div>';
    }).join('');
  el('pflege').innerHTML=
    '<div class="pf"><h4>'+T.pfReinigen+'</h4>'+PFLEGE.reinigen+'</div>'+
    '<div class="pf"><h4>'+T.pfLaden+'</h4>'+PFLEGE.laden+'</div>'+
    '<div class="pf"><h4>'+T.pfWaehlen+'</h4>'+PFLEGE.waehlen+'</div>';
}

/* ── Dein Draht: Aszendentenherrscher und stärkster Planet ── */
function drahtBauen(){
  var P=chart();
  if(!P){ el('draht').innerHTML='<div class="leerk">'+T.dtLeer+'</div>'; return; }
  var ascZ=Math.floor(nrm(P.ASC)/30);
  var hr=HERRSCHER[ascZ];
  var hrZ=Math.floor(nrm(P[hr])/30), hrH=haus(P,P[hr]);
  var steine=STEIN.filter(function(s){return s.p===hr;});
  var zutaten=ZUTAT.filter(function(z){return z.p===hr;});
  var sonneH=haus(P,P.Sonne), mondH=haus(P,P.Mond);
  var h='<div class="draht">';
  h+='<div class="d-gr"><span class="gl">'+PLANET[hr].zchn+'</span>'+
     zFuell(T.dtGross,{herr:hr})+'</div>';
  h+=zFuell(T.dtSatz,{zeichen:zZeichen(ascZ),herr:hr,herrZeichen:zZeichen(hrZ),
     herrHaus:zHaus(hrH)});
  h+='<div class="d-gitter">'+
    '<div class="dk"><b>'+T.dtTag+'</b>'+PLANET[hr].tag+'<br>'+T.dtTagSatz+'</div>'+
    '<div class="dk"><b>'+T.dtMetall+'</b>'+PLANET[hr].metall+'</div>'+
    '<div class="dk"><b>'+T.dtFarben+'</b>'+PLANET[hr].farben+'</div>'+
    '<div class="dk"><b>'+T.dtSteine+'</b>'+steine.map(function(s){return s.n;}).join(', ')+'</div>'+
    '<div class="dk"><b>'+T.dtZutaten+'</b>'+zutaten.map(function(z){return z.n;}).join(', ')+'</div>'+
    '<div class="dk"><b>'+T.dtLichter+'</b>'+
      zFuell(T.dtLichterSatz,{sonne:zHaus(sonneH),mond:zHaus(mondH)})+'</div>'+
    '</div>';
  if(GESCHMACK[hr]) h+='<p class="d-satz">'+GESCHMACK[hr][hrZ][0]+'</p>';
  h+='<p class="d-fuss">'+zFuell(T.dtFuss,{stein:(steine[0]?steine[0].n:T.dtKeinStein)})+'</p>';
  h+='</div>';
  el('draht').innerHTML=h;
}

/* ── Profilwahl ───────────────────────────────────────── */
function wahlBauen(){
  var box=el('zwahl'), alle=[];
  try{ alle=AC_P.alle()||[]; }catch(e){}
  box.innerHTML='';
  if(alle.length<2) return;
  var l=document.createElement('span'); l.className='lab'; l.textContent=T.pwLabel; box.appendChild(l);
  alle.forEach(function(p){
    var b=document.createElement('button'); b.type='button';
    b.textContent=AC_P.anzeige(p,AC_P.zeigeNamen())+(p.eigen?T.pwEigen:'');
    b.setAttribute('aria-pressed', gewaehlt===p.id);
    b.addEventListener('click',function(){ gewaehlt=p.id; wahlBauen(); allesNeu(); });
    box.appendChild(b);
  });
}
function allesNeu(){ jetztBauen(); planetenBauen(); zieleBauen(); drahtBauen(); tafelBauen(); }

function start(){
  wahlBauen();
  allesNeu();
  zutatenBauen(); steineBauen();
  /* Die Planetenstunde wechselt — einmal pro Minute nachziehen */
  setInterval(function(){ jetztBauen(); tafelBauen(); }, 60000);
}
start();
