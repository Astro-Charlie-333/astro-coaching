/* Astro-Charlie · Die Karte — Rechnung und Darstellung
   Drei Zoomstufen auf einer Seite:
     1 Rad      Haus × Zeichen, rund, weil Häuser ein Kreis sind
     2 Matrix   Planet × Haus, rechteckig, weil es eine Zwei-Wege-Suche ist
     3 Detail   ausklappbar, aus beiden erreichbar                        */
function nrm(x){x=x%360;return x<0?x+360:x;}
function el(i){ return document.getElementById(i); }
function esc(s){ return String(s===undefined||s===null?'':s).replace(/[<>&"]/g,function(c){
 return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }
function zI(l){ return Math.floor(nrm(l)/30); }
function gradKurz(l){ l=nrm(l); var r=l-Math.floor(l/30)*30, g=Math.floor(r),
 m=Math.round((r-g)*60); if(m===60){g++;m=0;} return g+'°'+(m<10?'0':'')+m+'′'; }

var PN=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];
var GLY={Sonne:'☉',Mond:'☽',Merkur:'☿',Venus:'♀',Mars:'♂',Jupiter:'♃',Saturn:'♄',
 Uranus:'♅',Neptun:'♆',Pluto:'♇'};
/* U+FE0E: sonst stellt Chromium die Tierkreiszeichen als Farb-Emoji dar */
var ZGLY=['♈︎','♉︎','♊︎','♋︎','♌︎','♍︎','♎︎','♏︎','♐︎','♑︎','♒︎','♓︎'];

var P=null, offen=0, vglZ=1, vglA=2, vglB=11;

/* Haus 1 gehört natürlich Widder, Haus 2 Stier und so weiter.
   Der Winkel zwischen dem Zeichen auf dem Haus und diesem natürlichen
   Zeichen entscheidet, ob Stil und Bereich sich vertragen. */
function resoVon(z,h){
  var d=((z-(h-1))%12+12)%12;
  if(d===0) return 'doppelt';
  if(d===6) return 'achse';
  if(d===3||d===9) return 'spannung';
  if(d===4||d===8) return 'fliesst';
  if(d===2||d===10) return 'leicht';
  return 'neutral';
}

function chartVon(p){
  var ut=p.h+p.mi/60-p.tz,y=p.y,mo=p.mo,d=p.d;
  if(ut<0){ut+=24;d-=1;} if(ut>=24){ut-=24;d+=1;}
  var jd=jdFromUT(y,mo,d,ut),T=(jd-2451545)/36525,a=angles(jd,p.lat,p.lon);
  var C={Sonne:sunLon(T),Mond:moonLon(T),Merkur:geo('Merkur',T),Venus:geo('Venus',T),
   Mars:geo('Mars',T),Jupiter:geo('Jupiter',T),Saturn:geo('Saturn',T),Uranus:geo('Uranus',T),
   Neptun:geo('Neptun',T),Pluto:geo('Pluto',T),ASC:a.asc,MC:a.mc,_jd:jd};
  return C;
}
function haus(C,l){ return ((Math.floor(nrm(l)/30)-Math.floor(nrm(C.ASC)/30))%12+12)%12+1; }
function zeichenDesHauses(C,h){ return (Math.floor(nrm(C.ASC)/30)+h-1)%12; }
function profil(){ try{ return AC_P.aktives()||AC_P.eigenes(); }catch(e){ return null; } }
function rueck(k,jd){
  if(k==='Sonne'||k==='Mond') return false;
  return nrm(geo(k,(jd+1-2451545)/36525)-geo(k,(jd-1-2451545)/36525))>180;
}
function bewohner(h){
  if(!P) return [];
  return PN.filter(function(k){ return haus(P,P[k])===h; });
}
function artVon(h){
  for(var i=0;i<K_ART.length;i++) if(K_ART[i].h.indexOf(h)>=0) return K_ART[i];
  return K_ART[0];
}

/* ── 1 · Das Rad ──────────────────────────────────────────── */
function radBauen(){
  var NSU='http://www.w3.org/2000/svg';
  function N(t,a,txt){ var e=document.createElementNS(NSU,t);
    for(var k in a) e.setAttribute(k,a[k]);
    if(txt!==undefined) e.textContent=txt; return e; }
  var C=310, R_A=300, R_ZI=238, R_HI=152;
  var basis=P?Math.floor(nrm(P.ASC)/30)*30:0;
  function pos(l,r){ var w=(180+(nrm(l)-basis))*Math.PI/180;
    return [C+r*Math.cos(w), C-r*Math.sin(w)]; }
  function feld(rA,rI,a1,a2){
    var p1=pos(a1,rA), p2=pos(a2,rA), p3=pos(a2,rI), p4=pos(a1,rI);
    return 'M'+p1[0].toFixed(1)+','+p1[1].toFixed(1)+' A'+rA+','+rA+' 0 0 0 '+
      p2[0].toFixed(1)+','+p2[1].toFixed(1)+' L'+p3[0].toFixed(1)+','+p3[1].toFixed(1)+
      ' A'+rI+','+rI+' 0 0 1 '+p4[0].toFixed(1)+','+p4[1].toFixed(1)+' Z';
  }
  var svg=N('svg',{viewBox:'0 0 620 620',role:'img',
    'aria-label':'Deine zwölf Häuser mit den Zeichen, die darauf sitzen'});
  for(var i=0;i<12;i++){
    var h=i+1, z=P?zeichenDesHauses(P,h):i, a1=basis+i*30, a2=basis+(i+1)*30;
    var g=N('g',{class:'kk-hs'+(offen===h?' ist':''),'data-h':String(h),
      tabindex:'0',role:'button','aria-label':h+'. Haus, '+K_ZEICHEN[z].n});
    /* Zeichenband außen, nach Element gefärbt */
    g.appendChild(N('path',{d:feld(R_A,R_ZI,a1,a2),fill:K_ELFARBE[z%4],
      opacity:'.9',class:'kk-zb'}));
    var m1=pos(a1+15,(R_A+R_ZI)/2);
    g.appendChild(N('text',{x:m1[0].toFixed(1),y:(m1[1]-3).toFixed(1),
      'text-anchor':'middle',class:'kk-zg'}, ZGLY[z]));
    g.appendChild(N('text',{x:m1[0].toFixed(1),y:(m1[1]+15).toFixed(1),
      'text-anchor':'middle',class:'kk-zn'}, K_ZEICHEN[z].n));
    /* Hausfeld innen */
    g.appendChild(N('path',{d:feld(R_ZI,R_HI,a1,a2),class:'kk-hf'}));
    var m2=pos(a1+15,(R_ZI+R_HI)/2);
    g.appendChild(N('text',{x:m2[0].toFixed(1),y:(m2[1]-4).toFixed(1),
      'text-anchor':'middle',class:'kk-hn'}, String(h)));
    g.appendChild(N('text',{x:m2[0].toFixed(1),y:(m2[1]+13).toFixed(1),
      'text-anchor':'middle',class:'kk-hk'}, K_HAUS[i].k));
    /* Planeten in diesem Haus */
    var bew=bewohner(h);
    if(bew.length){
      var m3=pos(a1+15,R_HI-20);
      g.appendChild(N('text',{x:m3[0].toFixed(1),y:(m3[1]+6).toFixed(1),
        'text-anchor':'middle',class:'kk-pl'}, bew.map(function(k){return GLY[k];}).join('')));
    }
    g.addEventListener('click',function(ev){ hausOeffnen(+ev.currentTarget.getAttribute('data-h'),true); });
    g.addEventListener('keydown',function(ev){ if(ev.key==='Enter'||ev.key===' '){ ev.preventDefault();
      hausOeffnen(+ev.currentTarget.getAttribute('data-h'),true); } });
    svg.appendChild(g);
  }
  if(P){
    [['AC',P.ASC],['MC',P.MC]].forEach(function(x){
      var i1=pos(x[1],R_HI), a1=pos(x[1],R_ZI);
      svg.appendChild(N('line',{x1:i1[0].toFixed(1),y1:i1[1].toFixed(1),
        x2:a1[0].toFixed(1),y2:a1[1].toFixed(1),class:'kk-achse'}));
      var l=pos(x[1],R_HI-14);
      svg.appendChild(N('text',{x:l[0].toFixed(1),y:(l[1]+4).toFixed(1),
        'text-anchor':'middle',class:'kk-al'}, x[0]));
    });
  }
  svg.appendChild(N('text',{x:'310',y:'300','text-anchor':'middle',class:'kk-mitte'},
    P?'tipp ein Haus an':'Beispielchart'));
  svg.appendChild(N('text',{x:'310',y:'324','text-anchor':'middle',class:'kk-mitte2'},
    'außen der Stil, innen der Bereich'));
  el('kkrad').innerHTML=''; el('kkrad').appendChild(svg);
}

/* ── 2 · Die Matrix ───────────────────────────────────────── */
function matrixBauen(){
  var h='<table class="kk-mx"><thead><tr><th class="ecke"><span>Planet</span><span>Haus</span></th>';
  for(var n=1;n<=12;n++) h+='<th scope="col" data-h="'+n+'"><b>'+n+'</b><i>'+K_HAUS[n-1].k+'</i></th>';
  h+='</tr></thead><tbody>';
  PN.forEach(function(k){
    var meins=P?haus(P,P[k]):0;
    h+='<tr><th scope="row"><span class="g">'+GLY[k]+'</span>'+k+'</th>';
    for(var n=1;n<=12;n++){
      var ist=(meins===n);
      h+='<td'+(ist?' class="ist"':'')+'><button type="button" data-p="'+k+'" data-h="'+n+'"'+
        ' aria-label="'+k+' im '+n+'. Haus'+(ist?', deine Stellung':'')+'">'+
        (ist?'<span class="pkt">'+GLY[k]+'</span>':'')+'</button></td>';
    }
    h+='</tr>';
  });
  h+='</tbody></table>';
  el('kkmatrix').innerHTML=h;
  Array.prototype.forEach.call(el('kkmatrix').querySelectorAll('button'),function(b){
    b.addEventListener('click',function(){
      zelleOeffnen(b.getAttribute('data-p'), +b.getAttribute('data-h')); });
  });
  Array.prototype.forEach.call(el('kkmatrix').querySelectorAll('th[data-h]'),function(t){
    t.style.cursor='pointer';
    t.addEventListener('click',function(){ hausOeffnen(+t.getAttribute('data-h'),true); });
  });
}

function zelleOeffnen(pl,h){
  var txt=(D_PH[pl]&&D_PH[pl][h-1])||'';
  var meins=P&&haus(P,P[pl])===h;
  var pd=D_PLANET[pl]||{};
  el('kkzelle').innerHTML='<div class="kk-zelle'+(meins?' meins':'')+'">'+
    '<div class="kz-kopf"><span class="kz-g">'+GLY[pl]+'</span>'+
      '<span class="kz-t">'+esc(pl)+' im '+h+'. Haus</span>'+
      (meins?'<span class="kz-m">deine Stellung</span>':'')+'</div>'+
    '<p class="kz-was"><b>'+esc(pl)+'</b> ist '+esc(pd.was||'')+' — '+esc(pd.kurz||'')+
      '. Das <b>'+h+'. Haus</b> ist '+esc(K_HAUS[h-1].t.replace(/\.$/,''))+'.</p>'+
    '<p class="kz-text">'+txt+'</p>'+
    (meins&&P?'<p class="kz-deins">Bei dir: '+esc(pl)+' in '+gradKurz(P[pl])+' '+
      K_ZEICHEN[zI(P[pl])].n+(rueck(pl,P._jd)?' ℞':'')+'.</p>':'')+
    '<p class="kz-weiter"><a href="planeten-in-haeusern.html">Diese Stellung ganz lesen, '+
      'mit Zeichen und Blickwinkel →</a></p></div>';
  el('kkzelle').scrollIntoView({block:'nearest',
    behavior:(window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth')});
}

/* ── 3 · Das Hausdetail ───────────────────────────────────── */
function hausDetail(h){
  var z=P?zeichenDesHauses(P,h):(h-1);
  var Z=K_ZEICHEN[z], H=K_HAUS[h-1], A=artVon(h);
  var herr=K_HERR[z], hH=P?haus(P,P[herr]):null;
  var bew=bewohner(h);
  var hh='<div class="kk-detail"><div class="kd-kopf">'+
    '<span class="kd-n">'+h+'</span>'+
    '<span class="kd-t"><b>'+esc(H.k)+'</b>'+esc(H.t)+'</span>'+
    '<span class="kd-z" style="background:'+K_ELFARBE[z%4]+'">'+ZGLY[z]+' '+esc(Z.n)+'</span></div>';
  hh+='<p class="kd-lang">'+esc(H.lang)+'</p>';
  hh+='<p class="kd-frage"><b>Die Frage, die es aufmacht:</b> '+esc(H.frage)+'</p>';

  hh+='<div class="kd-formel"><span class="a">'+esc(H.k)+'</span>'+
      '<span class="x">im Stil von</span><span class="b">'+esc(Z.n)+'</span>'+
      '<span class="x">= '+esc(Z.stil)+'</span></div>';
  hh+='<p class="kd-wirkung">'+Z.t.replace('{B}', K_BEREICH[h-1])+'</p>';
  hh+='<p class="kd-haken"><b>Der Haken dabei:</b> '+esc(Z.haken)+'</p>';
  var R=K_RESO[resoVon(z,h)];
  hh+='<div class="kd-reso"><span class="l">'+esc(R.n)+' &middot; passt der Stil zum Bereich?</span>'+
    esc(R.t)+' <b>'+esc(R.folge)+'</b></div>';

  if(P){
    hh+='<div class="kd-kette"><span class="l">Wo es entschieden wird</span>'+
      esc(Z.n)+' gehört <b>'+esc(herr)+'</b> — und '+esc(herr)+' steht bei dir in '+
      gradKurz(P[herr])+' '+K_ZEICHEN[zI(P[herr])].n+', im <b>'+hH+'. Haus</b> ('+
      esc(K_HAUS[hH-1].k)+'). Dieses Thema wird also dort verhandelt.'+
      (K_MIT[Z.n]?' Modern kommt '+K_MIT[Z.n]+' dazu.':'')+'</div>';
  }
  if(bew.length){
    hh+='<div class="kd-bew"><span class="l">Hier steht etwas</span><ul>'+
      bew.map(function(k){
        return '<li><b>'+k+'</b> '+gradKurz(P[k])+' '+K_ZEICHEN[zI(P[k])].n+
          (rueck(k,P._jd)?' ℞':'')+' — '+((D_PH[k]&&D_PH[k][h-1])||'')+'</li>';
      }).join('')+'</ul></div>';
  } else if(P){
    hh+='<div class="kd-bew leer"><span class="l">Hier steht nichts</span>'+
      'Das ist der Normalfall — zehn Planeten auf zwölf Häuser. Ein leeres Haus heißt nicht, '+
      'dass das Thema fehlt; es heißt, dass es über '+esc(herr)+' im '+hH+'. Haus läuft.</div>';
  }
  hh+='<div class="kd-art"><b>'+esc(A.n)+'.</b> '+esc(A.t)+'</div>';
  hh+='<div class="kd-weiter">'+
    '<a href="planeten-in-haeusern.html">Jede Kombination durchspielen</a>'+
    '<a href="haeuser.html">Alle zwölf Häuser</a>'+
    '<a href="herrscher.html">Herrscher und Dispositoren</a>'+
    (h===12?'<a href="geistfuehrung.html">Das 12. Haus als Zugang</a>':'')+
    '</div></div>';
  return hh;
}

function hausOeffnen(h, scrollen){
  offen=(offen===h)?0:h;
  radBauen();
  var box=el('kkdetail');
  if(!offen){ box.innerHTML=''; box.hidden=true; return; }
  box.hidden=false;
  box.innerHTML=hausDetail(offen);
  if(scrollen) box.scrollIntoView({block:'nearest',
    behavior:(window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth')});
}

/* ── Der Vergleich: dasselbe Zeichen, zwei Häuser ─────────── */
function vergleichBauen(){
  var zw=el('kkvglz'), hw=el('kkvglh');
  zw.innerHTML=K_ZEICHEN.map(function(Z,i){
    return '<button type="button" class="vz'+(i===vglZ?' ist':'')+'" data-z="'+i+'">'+
      ZGLY[i]+' '+esc(Z.n)+'</button>'; }).join('');
  Array.prototype.forEach.call(zw.querySelectorAll('.vz'),function(b){
    b.addEventListener('click',function(){ vglZ=+b.getAttribute('data-z'); vergleichBauen(); }); });

  hw.innerHTML='<span class="vl">Auf Haus</span>'+
    [1,2,3,4,5,6,7,8,9,10,11,12].map(function(n){
      return '<button type="button" class="vh'+(n===vglA?' a':'')+(n===vglB?' b':'')+
        '" data-h="'+n+'">'+n+'</button>'; }).join('');
  Array.prototype.forEach.call(hw.querySelectorAll('.vh'),function(b){
    b.addEventListener('click',function(){
      var n=+b.getAttribute('data-h');
      if(n===vglA||n===vglB) return;
      vglA=vglB; vglB=n;           /* der ältere rutscht raus */
      vergleichBauen();
    }); });

  var Z=K_ZEICHEN[vglZ];
  function seite(h,marke){
    var R=K_RESO[resoVon(vglZ,h)];
    return '<div class="vs '+marke+'"><div class="vs-k"><span class="n">'+h+'</span>'+
      '<span class="t">'+esc(K_HAUS[h-1].k)+'</span>'+
      '<span class="vs-r">'+esc(R.n)+'</span></div>'+
      '<p class="vs-w">'+Z.t.replace('{B}', K_BEREICH[h-1])+'</p>'+
      '<p class="vs-u">'+esc(R.folge)+'</p>'+
      '<button type="button" class="vs-mehr" data-h="'+h+'">Ganz ansehen</button></div>';
  }
  el('kkvgl').innerHTML=
    '<div class="vs-zeile">'+seite(vglA,'a')+
    '<div class="vs-mitte"><span>'+ZGLY[vglZ]+'</span>'+esc(Z.stil)+'</div>'+
    seite(vglB,'b')+'</div>';
  Array.prototype.forEach.call(el('kkvgl').querySelectorAll('.vs-mehr'),function(b){
    b.addEventListener('click',function(){ hausOeffnen(+b.getAttribute('data-h'),true); }); });
}

/* ── Start ───────────────────────────────────────────────── */
(function(){
  var p=profil();
  if(p){
    P=chartVon(p);
    el('kkwer').innerHTML='Dein Chart: <b>'+esc(AC_P.anzeige(p,true))+'</b> · '+
      'Aszendent '+K_ZEICHEN[zI(P.ASC)].n+'. <a href="profile.html">wechseln</a>';
  } else {
    el('kkwer').innerHTML='Noch kein Profil — die Karte zeigt die Häuser allgemein. '+
      '<a href="profile.html">Profil anlegen</a>, dann steht dein eigenes Chart drin.';
  }
  el('kkvglsub').innerHTML=K_VERGLEICH_TEXT;
  radBauen(); matrixBauen(); vergleichBauen();
  if(window.AC_NIV&&window.AC_NIV.anwenden) try{ window.AC_NIV.anwenden(); }catch(e){}
})();
