/* Astro-Charlie · Die Karte — Rechnung und Darstellung
   Drei Zoomstufen auf einer Seite:
     1 Rad      Haus × Zeichen, rund, weil Häuser ein Kreis sind
     2 Matrix   Planet × Haus, rechteckig, weil es eine Zwei-Wege-Suche ist
     3 Detail   ausklappbar, aus beiden erreichbar

   Hier steht kein Satz. Alle Vorlagen stehen in `K_T` in
   `karte-daten.js`, und `kFuell` setzt die Lücken. Was in dieser
   Datei stünde, zöge beim Umzug in eine andere Umgebung nicht mit
   (PRODUKT.md Abschnitt 7); `bau-karte.py` bricht deshalb ab, sobald
   hier ein Satz oder ein „dein" auftaucht.                         */
function nrm(x){x=x%360;return x<0?x+360:x;}
function el(i){ return document.getElementById(i); }
function esc(s){ return String(s===undefined||s===null?'':s).replace(/[<>&"]/g,function(c){
 return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }
function zI(l){ return Math.floor(nrm(l)/30); }
function gradKurz(l){ l=nrm(l); var r=l-Math.floor(l/30)*30, g=Math.floor(r),
 m=Math.round((r-g)*60); if(m===60){g++;m=0;} return g+'°'+(m<10?'0':'')+m+'′'; }

/* Die eine Stelle, an der eine Vorlage aus K_T gefüllt wird. */
function kFuell(form, werte){
  var s=String(form||'');
  for(var k in werte) if(werte.hasOwnProperty(k))
    s=s.split('{'+k+'}').join(String(werte[k]===undefined||werte[k]===null?'':werte[k]));
  return s;
}

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
/* Das Zeichen hinter dem Grad, mit dem Rückläufigkeitszeichen. */
function rzeichen(k){ return rueck(k,P._jd)?K_T.rueck:''; }
function bewohner(h){
  if(!P) return [];
  return PN.filter(function(k){ return haus(P,P[k])===h; });
}
function artVon(h){
  for(var i=0;i<K_ART.length;i++) if(K_ART[i].h.indexOf(h)>=0) return K_ART[i];
  return K_ART[0];
}
/* Der Wirkungssatz des Zeichens, mit dem Bereich des Hauses darin.
   {B} ist die eine Lücke, die nicht kFuell füllt: sie steht im
   Datentext selbst und wird bei jedem Haus anders ersetzt. */
function wirkungVon(z,h){ return K_ZEICHEN[z].t.replace('{B}', K_BEREICH[h-1]); }

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
  var svg=N('svg',{viewBox:'0 0 620 620',role:'img','aria-label':K_T.radLabel});
  for(var i=0;i<12;i++){
    var h=i+1, z=P?zeichenDesHauses(P,h):i, a1=basis+i*30, a2=basis+(i+1)*30;
    var g=N('g',{class:'kk-hs'+(offen===h?' ist':''),'data-h':String(h),
      tabindex:'0',role:'button',
      'aria-label':kFuell(K_T.radFeld,{h:h,zeichen:K_ZEICHEN[z].n})});
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
    [['ASC',P.ASC],['MC',P.MC]].forEach(function(x){
      var i1=pos(x[1],R_HI), a1=pos(x[1],R_ZI);
      svg.appendChild(N('line',{x1:i1[0].toFixed(1),y1:i1[1].toFixed(1),
        x2:a1[0].toFixed(1),y2:a1[1].toFixed(1),class:'kk-achse'}));
      var l=pos(x[1],R_HI-14);
      svg.appendChild(N('text',{x:l[0].toFixed(1),y:(l[1]+4).toFixed(1),
        'text-anchor':'middle',class:'kk-al'}, K_T.radAchse[x[0]]));
    });
  }
  svg.appendChild(N('text',{x:'310',y:'300','text-anchor':'middle',class:'kk-mitte'},
    P?K_T.radMitte:K_T.radMitteOhne));
  svg.appendChild(N('text',{x:'310',y:'324','text-anchor':'middle',class:'kk-mitte2'},
    K_T.radMitte2));
  el('kkrad').innerHTML=''; el('kkrad').appendChild(svg);
}

/* ── 2 · Die Matrix ───────────────────────────────────────── */
function matrixBauen(){
  var koepfe='';
  for(var n=1;n<=12;n++)
    koepfe+=kFuell(K_T.mxKopf,{n:n,kurz:K_HAUS[n-1].k});
  var zeilen=PN.map(function(k){
    var meins=P?haus(P,P[k]):0, zellen='';
    for(var n=1;n<=12;n++){
      var ist=(meins===n);
      zellen+=kFuell(K_T.mxZelle,{
        ist:   ist?K_T.mxIst:'',
        planet:k, n:n,
        label: kFuell(ist?K_T.mxLabelMeins:K_T.mxLabel,{planet:k,n:n}),
        inhalt:ist?kFuell(K_T.mxPunkt,{gly:GLY[k]}):''});
    }
    return kFuell(K_T.mxZeile,{gly:GLY[k],planet:k,zellen:zellen});
  }).join('');
  el('kkmatrix').innerHTML=kFuell(K_T.mxRahmen,
    {ecke:K_T.mxEcke,koepfe:koepfe,zeilen:zeilen});
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
  el('kkzelle').innerHTML=kFuell(K_T.zelle,{
    meins: meins?K_T.zelleMeins:'',
    kopf:  kFuell(K_T.zelleKopf,{gly:GLY[pl],planet:esc(pl),h:h,
             marke:meins?K_T.zelleMarke:''}),
    was:   kFuell(K_T.zelleWas,{planet:esc(pl),was:esc(pd.was||''),
             kurz:esc(pd.kurz||''),h:h,
             haus:esc(K_HAUS[h-1].t.replace(/\.$/,''))}),
    text:  txt,
    deins: (meins&&P)?kFuell(K_T.zelleDeins,{planet:esc(pl),grad:gradKurz(P[pl]),
             zeichen:K_ZEICHEN[zI(P[pl])].n,rueck:rzeichen(pl)}):'',
    weiter:K_T.zelleWeiter});
  el('kkzelle').scrollIntoView({block:'nearest',
    behavior:(window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth')});
}

/* ── 3 · Das Hausdetail ───────────────────────────────────── */
function hausDetail(h){
  var z=P?zeichenDesHauses(P,h):(h-1);
  var Z=K_ZEICHEN[z], H=K_HAUS[h-1], A=artVon(h);
  var herr=K_HERR[z], hH=P?haus(P,P[herr]):null;
  var bew=bewohner(h), R=K_RESO[resoVon(z,h)];
  return kFuell(K_T.detail,{
    kopf:    kFuell(K_T.detailKopf,{h:h,kurz:esc(H.k),titel:esc(H.t),
               farbe:K_ELFARBE[z%4],gly:ZGLY[z],zeichen:esc(Z.n)}),
    lang:    kFuell(K_T.detailLang,{lang:esc(H.lang)}),
    frage:   kFuell(K_T.detailFrage,{frage:esc(H.frage)}),
    formel:  kFuell(K_T.detailFormel,{kurz:esc(H.k),zeichen:esc(Z.n),stil:esc(Z.stil)}),
    wirkung: kFuell(K_T.detailWirkung,{wirkung:wirkungVon(z,h)}),
    haken:   kFuell(K_T.detailHaken,{haken:esc(Z.haken)}),
    reso:    kFuell(K_T.detailReso,{name:esc(R.n),text:esc(R.t),folge:esc(R.folge)}),
    kette:   P?kFuell(K_T.detailKette,{zeichen:esc(Z.n),herr:esc(herr),
               grad:gradKurz(P[herr]),herrzeichen:K_ZEICHEN[zI(P[herr])].n,
               herrhaus:hH,herrkurz:esc(K_HAUS[hH-1].k),
               modern:K_MIT[Z.n]?kFuell(K_T.detailModern,{mit:K_MIT[Z.n]}):''}):'',
    bewohner:bew.length
               ? kFuell(K_T.detailBewohner,{liste:bew.map(function(k){
                   return kFuell(K_T.detailBewohnerEiner,{planet:k,
                     grad:gradKurz(P[k]),zeichen:K_ZEICHEN[zI(P[k])].n,
                     rueck:rzeichen(k),text:(D_PH[k]&&D_PH[k][h-1])||''});
                 }).join('')})
               : (P?kFuell(K_T.detailLeer,{herr:esc(herr),herrhaus:hH}):''),
    art:     kFuell(K_T.detailArt,{name:esc(A.n),text:esc(A.t)}),
    weiter:  kFuell(K_T.detailWeiter,{zwoelf:h===12?K_T.detailZwoelf:''})});
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
    return kFuell(K_T.vglZeichen,{ist:i===vglZ?K_T.vglIst:'',i:i,
      gly:ZGLY[i],name:esc(Z.n)}); }).join('');
  Array.prototype.forEach.call(zw.querySelectorAll('.vz'),function(b){
    b.addEventListener('click',function(){ vglZ=+b.getAttribute('data-z'); vergleichBauen(); }); });

  hw.innerHTML=K_T.vglHausLabel+
    [1,2,3,4,5,6,7,8,9,10,11,12].map(function(n){
      return kFuell(K_T.vglHaus,{n:n,
        marke:(n===vglA?K_T.vglA:'')+(n===vglB?K_T.vglB:'')}); }).join('');
  Array.prototype.forEach.call(hw.querySelectorAll('.vh'),function(b){
    b.addEventListener('click',function(){
      var n=+b.getAttribute('data-h');
      if(n===vglA||n===vglB) return;
      vglA=vglB; vglB=n;           /* der ältere rutscht raus */
      vergleichBauen();
    }); });

  function seite(h,marke){
    var R=K_RESO[resoVon(vglZ,h)];
    return kFuell(K_T.vglSeite,{marke:marke,h:h,kurz:esc(K_HAUS[h-1].k),
      reso:esc(R.n),wirkung:wirkungVon(vglZ,h),folge:esc(R.folge)});
  }
  el('kkvgl').innerHTML=kFuell(K_T.vglZeile,{a:seite(vglA,'a'),b:seite(vglB,'b'),
    gly:ZGLY[vglZ],stil:esc(K_ZEICHEN[vglZ].stil)});
  Array.prototype.forEach.call(el('kkvgl').querySelectorAll('.vs-mehr'),function(b){
    b.addEventListener('click',function(){ hausOeffnen(+b.getAttribute('data-h'),true); }); });
}

/* ── Start ───────────────────────────────────────────────── */
(function(){
  var p=profil();
  if(p){
    P=chartVon(p);
    el('kkwer').innerHTML=kFuell(K_T.wer,{name:esc(AC_P.anzeige(p,true)),
      zeichen:K_ZEICHEN[zI(P.ASC)].n});
  } else {
    el('kkwer').innerHTML=K_T.werOhne;
  }
  el('kkvglsub').innerHTML=K_VERGLEICH_TEXT;
  radBauen(); matrixBauen(); vergleichBauen();
  if(window.AC_NIV&&window.AC_NIV.anwenden) try{ window.AC_NIV.anwenden(); }catch(e){}
})();
