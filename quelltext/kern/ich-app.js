/* Astro-Charlie · Ich — Rechnung und Darstellung */
function nrm(x){x=x%360;return x<0?x+360:x;}
function el(i){ return document.getElementById(i); }
function esc(s){ return String(s===undefined||s===null?'':s).replace(/[<>&"]/g,function(c){
 return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }
function kz(x,n){ return x.toFixed(n===undefined?1:n).replace('.',','); }
function zI(l){ return Math.floor(nrm(l)/30); }
function gradKurz(l){ l=nrm(l); var r=l-Math.floor(l/30)*30, g=Math.floor(r),
 m=Math.round((r-g)*60); if(m===60){g++;m=0;} return g+'°'+(m<10?'0':'')+m+'′'; }
function stellung(l){ return gradKurz(l)+' '+I_SIGNS[zI(l)]; }

var PNAMEN=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];
var EXTRA=['Chiron','Lilith'];

function chartVon(p){
  var ut=p.h+p.mi/60-p.tz,y=p.y,mo=p.mo,d=p.d;
  if(ut<0){ut+=24;d-=1;} if(ut>=24){ut-=24;d+=1;}
  var jd=jdFromUT(y,mo,d,ut),T=(jd-2451545)/36525,a=angles(jd,p.lat,p.lon);
  var P={Sonne:sunLon(T),Mond:moonLon(T),Merkur:geo('Merkur',T),Venus:geo('Venus',T),
   Mars:geo('Mars',T),Jupiter:geo('Jupiter',T),Saturn:geo('Saturn',T),Uranus:geo('Uranus',T),
   Neptun:geo('Neptun',T),Pluto:geo('Pluto',T),ASC:a.asc,MC:a.mc,_jd:jd,_T:T};
  if(window.chironLon) P.Chiron=nrm(window.chironLon(T));
  if(window.lilithLon) P.Lilith=nrm(window.lilithLon(T));
  return P;
}
function jetztChart(){
  var n=new Date();
  var jd=jdFromUT(n.getUTCFullYear(),n.getUTCMonth()+1,n.getUTCDate(),
    n.getUTCHours()+n.getUTCMinutes()/60);
  var T=(jd-2451545)/36525;
  var Q={Sonne:sunLon(T),Mond:moonLon(T),Merkur:geo('Merkur',T),Venus:geo('Venus',T),
   Mars:geo('Mars',T),Jupiter:geo('Jupiter',T),Saturn:geo('Saturn',T),Uranus:geo('Uranus',T),
   Neptun:geo('Neptun',T),Pluto:geo('Pluto',T),_jd:jd};
  return Q;
}
function haus(P,l){ return ((Math.floor(nrm(l)/30)-Math.floor(nrm(P.ASC)/30))%12+12)%12+1; }
function zeichenDesHauses(P,h){ return (Math.floor(nrm(P.ASC)/30)+h-1)%12; }
function rueck(k,jd){
  if(k==='Sonne'||k==='Mond') return false;
  var a=(jd-1-2451545)/36525, b=(jd+1-2451545)/36525;
  return nrm(geo(k,b)-geo(k,a))>180;
}

/* Die Winkelrechnung steht in ich-rechner.js — eine Fassung,
   die auch die Häufigkeitsabtastung beim Bauen benutzt. */
function aspekte(P){ return window.AC_ICH.aspekte(P); }

/* ── Zustand ───────────────────────────────────────────────── */
var P=null, Q=null, rad=null, offen=0;

function profil(){
  try{ return AC_P.aktives()||AC_P.eigenes(); }catch(e){ return null; }
}

/* ── Kopf ──────────────────────────────────────────────────────
   Der Kopf führt mit einem Satz über diesen Menschen. Genommen
   wird der seltenste Befund — derselbe, der unten in „Was an dir
   auffällt" oben steht, nur kürzer. Ein Befund ohne eigene
   Kopfform sagt über diesen Menschen nichts (die zwei oder drei
   nach innen laufenden Anlagen sind der Normalfall) und rutscht
   nach hinten, statt den ersten Bildschirm zu belegen. */
function kopfForm(m){
  if(m.art==='schwerpunkt')
    return {form:(m.zahl>=3?I_KOPF.spViel:(m.zahl===2?I_KOPF.spZwei:I_KOPF.spEins)),
            werte:{bereich:bereichName(m.haus)}};
  if(m.art==='kette')
    return {form:(m.eigen?I_KOPF.ketteEigen:I_KOPF.kette),
            werte:{nach:bereichName(m.nachHaus)}};
  if(m.art==='winkel')
    return {form:(m.hart?I_KOPF.winkelHart:I_KOPF.winkelWeich),
            werte:{a:(I_ROLLE[m.a]||''), b:(I_ROLLE[m.b]||'')}};
  if(m.art==='rueck'){
    if(m.zahl>=4)  return {form:I_KOPF.rueckViel,  werte:{}};
    if(m.zahl===0) return {form:I_KOPF.rueckKeine, werte:{}};
    return null;
  }
  return null;
}
function kopfSatz(M){
  for(var i=0;i<M.length;i++){
    var f=kopfForm(M[i]);
    if(f&&f.form) return fuellen(f.form, f.werte);
  }
  return I_KOPF.ohne;
}

function kopfBauen(p, M){
  /* Eine Zeile, die man vorlesen kann. "21.6.1996 · 14:40 · Berlin"
     ist eine Datenzeile; hier steht ein Mensch. */
  var MON=['Januar','Februar','März','April','Mai','Juni','Juli','August',
           'September','Oktober','November','Dezember'];
  el('ichname').textContent = AC_P.anzeige(p,true) + ', geboren am ' +
    p.d + '. ' + MON[p.mo-1] + ' ' + p.y + ' um ' +
    ('0'+p.h).slice(-2) + ':' + ('0'+p.mi).slice(-2) +
    (p.ort ? ' in ' + p.ort : '') + '.';
  el('ichdat').textContent='';
  el('ichleit').textContent=kopfSatz(M);
  el('ichleitzu').textContent=I_KOPF.nach;
}

/* ── Die drei Stellen, die den Grundton setzen ──────────────────
   Erst, worum es im Leben geht, dann der Lebensbereich. Zeichen,
   Grad und Herrscher warten in ac-tech — vorher stand genau das
   hier zuerst. */
function dreiBauen(){
  el('ichdreih').textContent=I_DREI_TITEL;
  el('ichdreisub').textContent=I_DREI_SUB;
  el('ichdrei').innerHTML=I_DREI.map(function(d){
    var l=P[d.k];
    if(l===undefined||l===null) return '';
    var z=zI(l), bereich, tech;
    if(d.k==='ASC'){
      var herr=I_HERR[z], hH=haus(P,P[herr]);
      bereich=fuellen(I_DREI_WIRKUNG,{bereich:bereichName(hH)});
      tech=I_SIGNS[z]+' '+gradKurz(l)+' · Herrscher '+herr+' im '+hH+'. Haus';
    } else {
      var h=haus(P,l);
      bereich=fuellen(I_DREI_BEREICH,{bereich:bereichName(h)});
      tech=I_SIGNS[z]+' '+gradKurz(l)+' · '+h+'. Haus, '+I_HAUS[h-1].k;
    }
    return '<div><div class="rolle">'+esc(d.rolle)+'</div><div class="wert">'+
      esc(d.was)+'<span class="zu">'+esc(bereich)+'</span>'+
      '<span class="zu ac-tech" data-ab="2">'+esc(tech)+'</span></div></div>';
  }).join('');
}

/* ── Sprungmarken ──────────────────────────────────────────────
   Fünfzehn Bildschirme ohne Inhaltsverzeichnis liest niemand zu
   Ende. Die Marken entstehen aus den Abschnitten der Seite
   selbst — eine zweite Liste im Skript würde auseinanderlaufen,
   und bau-ich.py prüft am Ergebnis nach, dass jede Marke auf
   einen Abschnitt zeigt, den es gibt.
   Ein Sprung in eine geschlossene Klappe macht sie auf, sonst
   springt man ins Leere. */
function klappeAuf(ziel){
  var e=ziel;
  while(e&&e!==document.body){
    if(e.tagName==='DETAILS') e.open=true;
    e=e.parentNode;
  }
  /* Und die Klappe, die der Abschnitt selbst ist: Wer auf „Dein
     Bild" springt, will das Rad sehen, nicht die Aufschrift
     darüber. */
  if(ziel&&ziel.querySelectorAll)
    Array.prototype.forEach.call(ziel.querySelectorAll('details'),
      function(d){ d.open=true; });
}
function springen(ziel){
  if(!ziel) return;
  klappeAuf(ziel);
  ziel.scrollIntoView({block:'start',
    behavior:(window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth')});
}
/* Die obere Leiste bricht auf schmalen Schirmen um und ist dann
   doppelt so hoch. Eine feste Zahl im Stil ließe die Sprungzeile
   darunter verschwinden — deshalb wird gemessen. */
function leisteMessen(){
  var l=document.querySelector('.ac-leiste'), s=el('ichsprung');
  var oben=l?Math.round(l.getBoundingClientRect().height):0;
  var hoch=s?Math.round(s.getBoundingClientRect().height):0;
  var w=document.documentElement.style;
  w.setProperty('--ac-oben', oben+'px');
  w.setProperty('--ac-sprung', hoch+'px');
}

function sprungBauen(){
  var nav=el('ichsprung');
  if(!nav) return;
  var abs=document.querySelectorAll('.ich-ab[data-sprung]');
  if(!abs.length) return;
  var h=['<span class="sp-t">'+esc(I_SPRUNG_TITEL)+'</span>'], i;
  for(i=0;i<abs.length;i++)
    h.push('<a href="#'+esc(abs[i].id)+'">'+esc(abs[i].getAttribute('data-sprung'))+'</a>');
  nav.innerHTML=h.join('');
  Array.prototype.forEach.call(nav.querySelectorAll('a[href^="#"]'),function(a){
    a.addEventListener('click',function(ev){
      var ziel=document.getElementById(a.getAttribute('href').slice(1));
      if(!ziel) return;
      ev.preventDefault();
      springen(ziel);
    });
  });
  leisteMessen();
  window.addEventListener('resize', leisteMessen);
}

/* ── Die Brücke zu Heute ───────────────────────────────────── */
function heuteBauen(){
  var treffer={};
  PNAMEN.forEach(function(k){
    if(Q[k]===undefined) return;
    var h=haus(P,Q[k]);
    (treffer[h]=treffer[h]||[]).push(k);
  });
  var hs=Object.keys(treffer).map(Number).sort(function(a,b){
    return treffer[b].length-treffer[a].length; });
  var box=el('ichheute');
  if(!hs.length){ box.innerHTML='<p class="nix">Gerade steht nichts in deinen Häusern.</p>'; return; }
  var oben=hs.slice(0,3);
  box.innerHTML='<div class="k">Heute auf deinem Chart</div>'+
    '<p>'+oben.map(function(h){
      return '<a href="#h'+h+'" data-h="'+h+'">'+I_HAUS[h-1].k+'</a>'+
        '<span class="ac-tech" data-ab="2"> ('+h+'. Haus: '+treffer[h].join(', ')+')</span>';
    }).join(' · ')+'</p>'+
    '<p style="margin-bottom:0"><a href="index.html">Was das heute konkret heißt →</a></p>';
  Array.prototype.forEach.call(box.querySelectorAll('a[data-h]'),function(a){
    a.addEventListener('click',function(ev){
      ev.preventDefault();
      klappeAuf(el('ichhaeuser'));
      hausOeffnen(+a.getAttribute('data-h'), true); });
  });
}

/* ── Was an dir auffällt ───────────────────────────────────────
   Der Rechner sagt, welche Stellen bei diesem Menschen anders
   liegen; hier werden die Sätze dazu eingesetzt und die gerechnete
   Häufigkeit danebengestellt. Kein Satz entsteht hier — alle
   stehen in ich-daten.js. */
function fuellen(form, werte){
  var s=String(form||'');
  for(var k in werte) if(werte.hasOwnProperty(k))
    s=s.split('{'+k+'}').join(String(werte[k]));
  return s;
}
function bereichName(n){ return I_HAUS[n-1] ? I_HAUS[n-1].k : ''; }

/* Hundert Punkte, davon n hell. Man kann sie abzählen — genau das
   ist der Unterschied zwischen "selten" und einer Zahl. */
function punktfeld(m){
  var a = m.anteil;
  var h = ['<div class="au-zahl">'];
  if(a === null || a === undefined){
    h.push('<div class="au-ohne">bei jedem Menschen<br>woanders</div>');
    h.push('</div>');
    return h.join('');
  }
  var p = Math.round(a*100);
  var voll = Math.max(1, Math.min(100, p));          /* unter 1 % bleibt 1 Punkt */
  h.push('<svg class="au-feld" viewBox="0 0 104 104" aria-hidden="true">');
  for(var r=0;r<10;r++) for(var c=0;c<10;c++){
    var nr = r*10 + c;
    h.push('<circle cx="'+(6+c*10.8).toFixed(1)+'" cy="'+(6+r*10.8).toFixed(1)+'" r="3.1" class="'+
           (nr < voll ? 'an' : 'aus')+'"/>');
  }
  h.push('</svg>');
  h.push('<div class="au-z"><b>'+(p<1?'<1':p)+'</b><span>von 100 Menschen</span></div>');
  h.push('</div>');
  return h.join('');
}

function haeufigZeile(m){
  if(m.anteil===null||m.anteil===undefined) return I_AUF.haeufigOhne;
  var p=Math.round(m.anteil*100);
  if(p<1) return I_AUF.haeufigSelten;
  return fuellen(I_AUF.haeufigForm,{p:p});
}

/* Satz, Handgriff und Mechanik zu einem Befund. Die Mechanik
   wartet in ac-tech und erscheint erst ab Wissensstufe 2 —
   auf Stufe 0 kommt in diesem Abschnitt kein Fachwort vor. */
function merkmalText(m){
  if(m.art==='schwerpunkt'){
    var form=(m.zahl>=3)?I_AUF.spViel:(m.zahl===2?I_AUF.spZwei:I_AUF.spEins);
    return { satz:fuellen(form,{bereich:bereichName(m.haus),zahl:m.zahl}),
             zusatz:fuellen(I_AUF.spLeer,{zahl:m.leereFelder}),
             tun:(m.zahl===1?I_AUF.spTunEins:I_AUF.spTun),
             tech:m.haus+'. Haus, natal darin: '+m.punkte.join(', ') };
  }
  if(m.art==='kette'){
    return { satz:(m.eigen?I_AUF.ketteEigen
                          :fuellen(I_AUF.kette,{nach:bereichName(m.nachHaus)})),
             zusatz:'',
             tun:(m.eigen?I_AUF.ketteTunEigen:I_AUF.ketteTun),
             tech:'Herrscher des '+m.vonHaus+'. Hauses ist '+m.herr+
                  ', steht im '+m.nachHaus+'. Haus' };
  }
  if(m.art==='winkel'){
    return { satz:fuellen(m.hart?I_AUF.winkelHart:I_AUF.winkelWeich,
               {a:(I_ROLLE[m.a]||''), b:(I_ROLLE[m.b]||'')}),
             zusatz:(m.stufe==='eng'?I_AUF.winkelEng:''),
             tun:(m.hart?I_AUF.winkelHartTun:I_AUF.winkelWeichTun),
             tech:m.a+' '+m.typ+' '+m.b+', Orbis '+kz(m.orb,2)+'°' };
  }
  if(m.art==='rueck'){
    var f=(m.zahl===0)?I_AUF.rueckKeine:(m.zahl>=4?I_AUF.rueckViel:I_AUF.rueckWenig);
    return { satz:fuellen(f,{zahl:m.zahl}), zusatz:'',
             tun:(m.zahl===0?I_AUF.rueckTunKeine
                            :(m.zahl>=4?I_AUF.rueckTunViel:'')),
             tech:(m.welche.length?'Rückläufig bei Geburt: '+m.welche.join(', ')
                                  :'Kein Punkt rückläufig bei Geburt') };
  }
  return null;
}

function auffaelligBauen(){
  var H=window.I_HAEUFIG||null;
  var M=[];
  try{ M=AC_ICH.merkmale(P,P._jd,I_HERR,aspekte(P),H&&H.anteil)||[]; }catch(e){ M=[]; }
  el('ichaufh').textContent=I_AUF.titel;
  /* Tausender im Deutschen mit Punkt: 10.000, nicht 10000. */
  var zahlN=String((H&&H.n)||0).replace(/\B(?=(\d{3})+(?!\d))/g,'.');
  el('ichaufvor').textContent=fuellen(I_AUF.vor,{n:zahlN});
  var h=[];
  for(var i=0;i<M.length;i++){
    var T=merkmalText(M[i]);
    if(!T) continue;
    /* Die Seltenheit ist das Einzige, was diese Plattform hat und
       sonst niemand: abgezählt, nicht behauptet. Sie stand bis zum
       27.10. als 11-Pixel-Zeile unter einem Absatz. Jetzt ist sie
       das Bild — hundert Punkte, davon so viele hell, wie Menschen
       es haben. Der seltenste Befund steht zuerst und dunkel. */
    h.push('<article class="au' + (i === 0 ? ' au-haupt' : '') + '">');
    h.push(punktfeld(M[i]));
    h.push('<div class="au-text">');
    h.push('<p class="au-satz">'+esc(T.satz)+'</p>');
    if(T.zusatz) h.push('<p class="au-zu">'+esc(T.zusatz)+'</p>');
    if(T.tun) h.push('<p class="au-tun"><b>'+esc(I_AUF.tunVor)+'</b> '+esc(T.tun)+'</p>');
    h.push('<p class="ac-tech" data-ab="2">'+esc(T.tech)+'</p>');
    h.push('</div></article>');
  }
  el('ichauf').innerHTML=h.join('');
  /* Der ehrliche Teil gehört zu jeder rechnenden Ausgabe. */
  var g=['<h3>'+esc(I_AUF.grenzeTitel)+'</h3>'];
  for(var j=0;j<I_AUF.grenzen.length;j++)
    g.push('<p>'+esc(I_AUF.grenzen[j])+'</p>');
  el('ichaufgrenze').innerHTML=g.join('');
  return M;
}

/* ── Die zwölf Häuser ──────────────────────────────────────── */
function haeuserBauen(){
  var box=el('ichhaeuser'), h='';
  for(var n=1;n<=12;n++){
    var z=zeichenDesHauses(P,n), herr=I_HERR[z], hH=haus(P,P[herr]);
    var bew=PNAMEN.concat(EXTRA).filter(function(k){
      return P[k]!==undefined&&haus(P,P[k])===n; });
    var heut=PNAMEN.filter(function(k){
      return Q[k]!==undefined&&haus(P,Q[k])===n; });
    h+='<button type="button" class="hz'+(heut.length?' heut':'')+'" id="h'+n+'" data-h="'+n+'">'+
      '<span class="nr">'+n+'</span>'+
      '<span class="hz-inhalt">'+
        '<span class="was">'+(heut.length?'<span class="punkt"></span>':'')+
          I_HAUS[n-1].k+'</span>'+
        '<span class="ze ac-tech" data-ab="2"><b>'+I_SIGNS[z]+'</b>'+
          (bew.length?'<span class="bew">'+bew.join(', ')+'</span>':'')+'</span>'+
        '<span class="herr ac-tech" data-ab="2">Herrscher '+herr+
          ' steht im '+hH+'. Haus'+
          (heut.length?' · heute hier: '+heut.join(', '):'')+'</span>'+
      '</span>'+
      '</button><div class="hdetail" id="d'+n+'" hidden></div>';
  }
  box.innerHTML=h;
  Array.prototype.forEach.call(box.querySelectorAll('.hz'),function(b){
    b.addEventListener('click',function(){ hausOeffnen(+b.getAttribute('data-h')); });
  });
}

function detailBauen(n){
  var z=zeichenDesHauses(P,n), herr=I_HERR[z], hH=haus(P,P[herr]);
  var H=I_HAUS[n-1];
  var bew=PNAMEN.concat(EXTRA).filter(function(k){
    return P[k]!==undefined&&haus(P,P[k])===n; });
  var heut=PNAMEN.filter(function(k){ return Q[k]!==undefined&&haus(P,Q[k])===n; });

  var h='<h4>'+n+'. Haus — '+H.k+'</h4><p>'+H.t+'</p>';
  h+='<p><b>Die Frage, die es aufmacht:</b> '+H.f+'</p>';
  if(bew.length){
    h+='<div class="stell ac-tech" data-ab="2">'+bew.map(function(k){
      var rw=(PNAMEN.indexOf(k)>=0&&rueck(k,P._jd));
      return '<div class="st"><span><b>'+k+'</b> '+stellung(P[k])+(rw?' ℞':'')+'</span>'+
        '<span>'+(I_PLANET[k]||'')+'</span></div>';
    }).join('')+'</div>';
  } else {
    h+='<p class="ac-tech" data-ab="2">Kein Planet steht hier — das ist der Normalfall, es gibt zehn Planeten und zwölf Häuser. '+
      'Ein leeres Haus heißt nicht, dass das Thema fehlt. Es heißt, dass es anderswo entschieden wird:</p>';
  }
  h+='<p class="ac-tech" data-ab="2">'+I_KETTE.replace('{h}',herr)
      .replace('{hs}',herr+' ('+stellung(P[herr])+')')
      .replace('{n}',hH)+'</p>';
  if(I_MIT[I_SIGNS[z]])
    h+='<p class="ac-tech" data-ab="2">Modern wird '+I_SIGNS[z]+' auch '+I_MIT[I_SIGNS[z]]+' zugeordnet — '+
      stellung(P[I_MIT[I_SIGNS[z]]])+', '+haus(P,P[I_MIT[I_SIGNS[z]]])+'. Haus.</p>';
  if(heut.length)
    h+='<p class="ac-tech" data-ab="2"><b>Heute hier:</b> '+heut.map(function(k){
      return k+' '+stellung(Q[k]); }).join(', ')+'. '+
      '<a href="index.html">Was das heißt →</a></p>';

  var weiter=[];
  if(n===10||n===6) weiter.push(['raum-berufung.html','Berufung']);
  if(n===2||n===1) weiter.push(['raum-selbstwert.html','Selbstwert']);
  if(n===7||n===5||n===8) weiter.push(['raum-naehe.html','Nähe']);
  if(n===4||n===3) weiter.push(['raum-herkunft.html','Herkunft']);
  if(n===12) weiter.push(['geistfuehrung.html','Mit wem du arbeitest']);
  if(n===11) weiter.push(['raum-zugehoerigkeit.html','Zugehörigkeit']);
  if(n===9) weiter.push(['geistfuehrung.html','Glaube und Lehre']);
  weiter.push(['haeuser.html','Alle Häuser']);
  h+='<div class="hd-weiter">'+weiter.map(function(w){
    return '<a href="'+w[0]+'">'+w[1]+' →</a>'; }).join('')+'</div>';
  return h;
}

function hausOeffnen(n, scrollen){
  var vorher=offen;
  offen=(offen===n)?0:n;
  for(var i=1;i<=12;i++){
    var b=el('h'+i), d=el('d'+i);
    if(!b||!d) continue;
    var auf=(offen===i);
    b.classList.toggle('ist',auf);
    d.hidden=!auf;
    if(auf&&!d.innerHTML) d.innerHTML=detailBauen(i);
  }
  if(rad) rad.setzen(offen);
  if(scrollen&&offen){
    var ziel=el('h'+offen);
    if(ziel) ziel.scrollIntoView({block:'center',
      behavior:(window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth')});
  }
}

/* ── Aspekte ───────────────────────────────────────────────── */
function aspekteBauen(){
  var alle=aspekte(P), mit=[], i, d;
  for(i=0;i<alle.length;i++){
    d=null;
    try{ d=window.AC_ASP?AC_ASP.deutung(alle[i].a,alle[i].b,alle[i].typ):null; }catch(e){}
    if(d&&d.thema) mit.push({x:alle[i], d:d});
  }
  var zeig=mit.slice(0,12);
  el('ichasp').innerHTML=zeig.map(function(e){
    var x=e.x, d=e.d;
    return '<div class="ia '+x.art+'">'+
      '<div class="f">'+esc(d.thema)+'</div>'+
      (d.text?'<div class="d">'+esc(d.text)+'</div>':'')+
      '<div class="o ac-tech" data-ab="2">'+x.a+' '+x.typ+' '+x.b+
        ' · Orbis '+kz(x.o,2)+'° · '+(x.art==='hart'?'fordernd':'fließend')+'</div>'+
      '</div>';
  }).join('');
  el('ichaspsub').innerHTML=esc(fuellen(I_ASP_SUB,{zahl:zeig.length}))+
    ' <span class="ac-tech" data-ab="2">'+
    esc(fuellen(I_ASP_TECH,{gesamt:alle.length, zahl:zeig.length}))+'</span>';
}

/* ── Index ─────────────────────────────────────────────────── */
function indexBauen(){
  el('ichindex').innerHTML=I_INDEX.map(function(g){
    return '<div class="ich-gruppe">'+esc(g.g)+'</div><div class="ich-index">'+
      g.e.map(function(e){
        return '<a class="ix'+(e.neu?' neu':'')+'" href="'+e.s+'">'+
          '<div class="t">'+esc(e.t)+'</div><div class="w">'+esc(e.w)+'</div>'+
          (e.neu?'<div class="neu-m">neu</div>':'')+'</a>';
      }).join('')+'</div>';
  }).join('');
}

/* ── Start ─────────────────────────────────────────────────── */
(function(){
  var p=profil();
  if(!p){
    el('ichinhalt').innerHTML='<div class="ich-leer">Noch kein Profil angelegt. '+
      '<a href="profile.html">Hier legst du eins an</a> — mit Geburtsdatum, -zeit und -ort. '+
      'Ohne die Zeit gibt es keine Häuser, und ohne Häuser ist diese Seite leer.</div>';
    return;
  }
  P=chartVon(p); Q=jetztChart();
  var M=auffaelligBauen();
  kopfBauen(p, M);
  dreiBauen();
  haeuserBauen();
  heuteBauen();
  aspekteBauen();
  indexBauen();
  sprungBauen();
  rad=window.AC_KERNRAD({el:el('ichrad'), chart:P, transit:Q, gross:true,
    aufHaus:function(n){ klappeAuf(el('ichhaeuser')); hausOeffnen(n, true); }});
  /* Die Mechanik im neuen Abschnitt wartet in ac-tech. Ohne diesen
     Aufruf wäre sie von Anfang an sichtbar — und damit stünde auf
     Stufe 0 Fachsprache, was REGELN.md Abschnitt 2 ausschließt. */
  try{ if(window.AC_NIV) AC_NIV.anwenden(); }catch(e){}
})();
