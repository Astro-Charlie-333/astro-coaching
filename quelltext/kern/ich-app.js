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

/* ── Kopf ──────────────────────────────────────────────────── */
function kopfBauen(p){
  var nm=AC_P.anzeige(p,true);
  el('ichname').textContent=nm;
  el('ichdat').textContent=p.d+'.'+p.mo+'.'+p.y+' · '+('0'+p.h).slice(-2)+':'+
    ('0'+p.mi).slice(-2)+(p.ort?' · '+p.ort:'');

  var drei=[
   ['Antrieb','Sonne',P.Sonne,'Worauf du hinauswillst'],
   ['Bedürfnis','Mond',P.Mond,'Was dich beruhigt'],
   ['Wirkung','Aszendent',P.ASC,'Wie du ankommst']];
  el('ichdrei').innerHTML=drei.map(function(d){
    var h=haus(P,d[2]);
    return '<div><div class="rolle">'+d[0]+'</div><div class="wert">'+
      I_SIGNS[zI(d[2])]+' <em>'+gradKurz(d[2])+'</em>'+
      '<span class="zu">'+(d[1]==='Aszendent'?'Herrscher '+I_HERR[zI(d[2])]+
        ' im '+haus(P,P[I_HERR[zI(d[2])]])+'. Haus':
        d[3]+' · '+h+'. Haus, '+I_HAUS[h-1].k)+'</span></div></div>';
  }).join('');
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
      return '<a href="#h'+h+'" data-h="'+h+'">'+h+'. Haus</a> ('+
        I_HAUS[h-1].k+'): '+treffer[h].join(', ');
    }).join(' · ')+'</p>'+
    '<p style="margin-bottom:0"><a href="index.html">Was das heute konkret heißt →</a></p>';
  Array.prototype.forEach.call(box.querySelectorAll('a[data-h]'),function(a){
    a.addEventListener('click',function(ev){
      ev.preventDefault(); hausOeffnen(+a.getAttribute('data-h'), true); });
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
    h.push('<div class="au">');
    h.push('<p class="au-satz">'+esc(T.satz)+'</p>');
    if(T.zusatz) h.push('<p class="au-zu">'+esc(T.zusatz)+'</p>');
    h.push('<p class="au-h">'+esc(haeufigZeile(M[i]))+'</p>');
    if(T.tun) h.push('<p class="au-tun"><b>'+esc(I_AUF.tunVor)+'</b> '+esc(T.tun)+'</p>');
    h.push('<p class="ac-tech" data-ab="2">'+esc(T.tech)+'</p>');
    h.push('</div>');
  }
  el('ichauf').innerHTML=h.join('');
  /* Der ehrliche Teil gehört zu jeder rechnenden Ausgabe. */
  var g=['<h3>'+esc(I_AUF.grenzeTitel)+'</h3>'];
  for(var j=0;j<I_AUF.grenzen.length;j++)
    g.push('<p>'+esc(I_AUF.grenzen[j])+'</p>');
  el('ichaufgrenze').innerHTML=g.join('');
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
      '<span class="ze"><b>'+I_SIGNS[z]+'</b>'+
        (bew.length?'<span class="bew">'+bew.join(', ')+'</span>':'')+'</span>'+
      '<span class="herr">Herrscher '+herr+'<br>steht im '+hH+'. Haus</span>'+
      '<span class="was">'+(heut.length?'<span class="punkt"></span>':'')+
        I_HAUS[n-1].k+(heut.length?' — heute: '+heut.join(', '):'')+'</span>'+
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
    h+='<div class="stell">'+bew.map(function(k){
      var rw=(PNAMEN.indexOf(k)>=0&&rueck(k,P._jd));
      return '<div class="st"><span><b>'+k+'</b> '+stellung(P[k])+(rw?' ℞':'')+'</span>'+
        '<span>'+(I_PLANET[k]||'')+'</span></div>';
    }).join('')+'</div>';
  } else {
    h+='<p>Kein Planet steht hier — das ist der Normalfall, es gibt zehn Planeten und zwölf Häuser. '+
      'Ein leeres Haus heißt nicht, dass das Thema fehlt. Es heißt, dass es anderswo entschieden wird:</p>';
  }
  h+='<p>'+I_KETTE.replace('{h}',herr)
      .replace('{hs}',herr+' ('+stellung(P[herr])+')')
      .replace('{n}',hH)+'</p>';
  if(I_MIT[I_SIGNS[z]])
    h+='<p>Modern wird '+I_SIGNS[z]+' auch '+I_MIT[I_SIGNS[z]]+' zugeordnet — '+
      stellung(P[I_MIT[I_SIGNS[z]]])+', '+haus(P,P[I_MIT[I_SIGNS[z]]])+'. Haus.</p>';
  if(heut.length)
    h+='<p><b>Heute hier:</b> '+heut.map(function(k){
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
  var a=aspekte(P).slice(0,12);
  el('ichasp').innerHTML=a.map(function(x){
    var d=null;
    try{ d=window.AC_ASP?AC_ASP.deutung(x.a,x.b,x.typ):null; }catch(e){}
    return '<div class="ia '+x.art+'"><div class="f">'+x.a+' '+x.typ+' '+x.b+'</div>'+
      '<div class="o">Orbis '+kz(x.o,2)+'° · '+(x.art==='hart'?'fordernd':'fließend')+'</div>'+
      (d&&d.kurz?'<div class="d">'+esc(d.kurz)+'</div>':'')+'</div>';
  }).join('');
  el('ichaspzahl').textContent=aspekte(P).length;
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
  kopfBauen(p);
  auffaelligBauen();
  haeuserBauen();
  heuteBauen();
  aspekteBauen();
  indexBauen();
  rad=window.AC_KERNRAD({el:el('ichrad'), chart:P, transit:Q, gross:true,
    aufHaus:function(n){ hausOeffnen(n, true); }});
  /* Die Mechanik im neuen Abschnitt wartet in ac-tech. Ohne diesen
     Aufruf wäre sie von Anfang an sichtbar — und damit stünde auf
     Stufe 0 Fachsprache, was REGELN.md Abschnitt 2 ausschließt. */
  try{ if(window.AC_NIV) AC_NIV.anwenden(); }catch(e){}
})();
