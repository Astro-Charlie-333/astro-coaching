/* Astro-Charlie · Zeiten — die Seite
   Setzt die Rechnung aus zeit-rechner.js und die Texte aus
   zeit-daten.js zusammen. */
function ztEl(i){ return document.getElementById(i); }
function ztEsc(s){ return String(s===undefined||s===null?'':s).replace(/[<>&"]/g,function(c){
  return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }
var ZT_NSU='http://www.w3.org/2000/svg';
var ZT_MON=['Januar','Februar','März','April','Mai','Juni','Juli','August',
 'September','Oktober','November','Dezember'];

var ztPerson=null, ztVariante='paulus', ztStichtag=null, ztOffen=null, ztWelche='beruf';
var ztB=null, ztJD=0;

function ztProfile(){ try{ return AC_P.alle()||[]; }catch(e){ return []; } }
function ztAktiv(){
  var a=ztProfile();
  if(ztPerson) for(var i=0;i<a.length;i++) if(a[i].id===ztPerson) return a[i];
  try{ return AC_P.aktives()||AC_P.eigenes()||a[0]||null; }catch(e){ return a[0]||null; }
}
function ztName(p){ try{ return AC_P.anzeige(p, AC_P.zeigeNamen()); }catch(e){ return (p&&p.name)||'?'; } }

function ztJDVon(p){
  var ut=p.h+p.mi/60-p.tz, y=p.y, mo=p.mo, d=p.d;
  if(ut<0){ ut+=24; d-=1; } if(ut>=24){ ut-=24; d+=1; }
  return jdFromUT(y,mo,d,ut);
}
function ztDatumText(d){
  return d.getDate()+'. '+ZT_MON[d.getMonth()]+' '+d.getFullYear();
}
function ztKurz(d){
  return ('0'+d.getDate()).slice(-2)+'.'+('0'+(d.getMonth()+1)).slice(-2)+'.'+d.getFullYear();
}
function ztJahrMon(d){ return ZT_MON[d.getMonth()].slice(0,3)+' '+d.getFullYear(); }
function ztISO(d){
  return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2);
}
function ztTagVon(tage){ return AC_ZEIT.datum(ztJD, tage); }
function ztAlterBei(tage){ return (tage/365.2422); }

/* ── Kopfzeile ──────────────────────────────────────────────── */
function ztPersonenBauen(){
  var box=ztEl('ztpersonen'), a=ztProfile(), p=ztAktiv();
  if(!a.length){ box.innerHTML='<span class="zt-hint" style="flex:1 1 100%">Noch kein Profil '+
    'angelegt. <a href="profile.html">Hier anlegen</a> &mdash; f&uuml;r diese Seite braucht es '+
    'unbedingt die <b>Geburtszeit</b>, weil alle drei Lose am Aszendenten h&auml;ngen.</span>'; return; }
  box.innerHTML=a.map(function(x){
    return '<button type="button" class="zt-knopf'+((p&&x.id===p.id)?' ist':'')+
      '" data-p="'+ztEsc(x.id)+'">'+ztEsc(ztName(x))+(x.eigen?' (ich)':'')+'</button>'; }).join('');
  Array.prototype.forEach.call(box.querySelectorAll('button[data-p]'),function(b){
    b.addEventListener('click',function(){ ztPerson=b.getAttribute('data-p');
      ztOffen=null; ztAlles(); });
  });
}
function ztVarianteBauen(){
  var box=ztEl('ztvariante');
  box.innerHTML=[['paulus','Paulus / Olympiodor'],['alt','Die andere &Uuml;berlieferung']]
    .map(function(v){
      return '<button type="button" class="zt-knopf'+(v[0]===ztVariante?' ist':'')+
        '" data-v="'+v[0]+'">'+v[1]+'</button>'; }).join('');
  Array.prototype.forEach.call(box.querySelectorAll('button[data-v]'),function(b){
    b.addEventListener('click',function(){ ztVariante=b.getAttribute('data-v');
      ztOffen=null; ztAlles(); });
  });
}

/* ── Jetzt gerade ───────────────────────────────────────────── */
function ztSpurKarte(freilassung, welche, titel, lab){
  if(!freilassung) return '';
  var J=AC_ZEIT.jetzt(freilassung, ztB.tageSeitGeburt);
  if(!J.l1) return '<div class="zt-j"><div class="lab">'+lab+'</div>'+
    '<h3>Au&szlig;erhalb der Reihe</h3><p>F&uuml;r diesen Stichtag liegt kein Abschnitt vor. '+
    'Die Reihe wird ab Geburt &uuml;ber hundert Jahre gerechnet.</p></div>';
  var K=ZT_KAPITEL[J.l1.zeichen], S=ZT_STUFE[ztStufe(J.l1.vonGlueck)];
  var K2=J.l2?ZT_KAPITEL[J.l2.zeichen]:null, S2=J.l2?ZT_STUFE[ztStufe(J.l2.vonGlueck)]:null;
  var anteil=(ztB.tageSeitGeburt-J.l1.von)/(J.l1.bis-J.l1.von);
  var rest=(J.l1.bis-ztB.tageSeitGeburt)/360;
  return '<div class="zt-j" style="border-top-color:'+S.farbe+'">'+
    '<div class="lab">'+lab+'<span class="zt-stufe" style="background:'+S.farbe+'">'+
      S.n+'</span></div>'+
    '<h3>'+K.n+'</h3>'+
    '<div class="wann">'+ztJahrMon(ztTagVon(J.l1.von))+' &ndash; '+ztJahrMon(ztTagVon(J.l1.bis))+
      ' &middot; '+J.l1.jahre+' Jahre</div>'+
    '<p>'+K[welche].t+'</p>'+
    '<div class="zt-balken"><i style="width:'+Math.round(anteil*100)+'%"></i></div>'+
    '<div class="zt-rest">'+Math.round(anteil*100)+' Prozent durch &middot; noch '+
      ztKZ(rest)+' Jahre</div>'+
    (K2?'<div class="unter"><b>Darin gerade: '+K2.n+
      '<span class="zt-stufe" style="background:'+S2.farbe+';margin-left:7px">'+S2.kurz+'</span></b>'+
      '<p style="margin:0">'+K2[welche].t+'</p>'+
      '<div class="zt-rest" style="margin-top:6px">bis '+ztKurz(ztTagVon(J.l2.bis))+
      (J.l2.bindung?' &middot; <span style="color:#A05A3A">nach der L&ouml;sung der Bindung</span>':'')+
      '</div></div>':'')+
    '<div class="tun"><b>Dazu</b>'+(K2?K2[welche].tun:K[welche].tun)+'</div>'+
    '<p class="ac-tech" data-ab="3" style="margin:10px 0 0;font-size:12.5px;color:#6B6259">'+
      titel+': '+AC_ZEIT.ZEICHEN[freilassung.start]+' &middot; '+
      J.l1.vonGlueck+'. vom Los des Gl&uuml;cks'+
      (J.l2?' &middot; Unterperiode '+J.l2.vonGlueck+'.':'')+'</p>'+
    '</div>';
}
function ztKZ(x){
  var r=Math.round(x*10)/10;
  return (r%1===0) ? String(r) : r.toFixed(1).replace('.',',');
}

function ztJetztBauen(){
  var box=ztEl('ztjetzt');
  if(!ztB){ box.innerHTML='<div class="zt-leer">Ohne Profil mit Geburtszeit l&auml;sst sich '+
    'das nicht rechnen. <a href="profile.html">Profil anlegen</a>.</div>'; return; }
  var h='<div class="zt-jetzt">';
  h+=ztSpurKarte(ztB.beruf,'beruf','Los des Geistes','Arbeit');
  h+=ztSpurKarte(ztB.liebe,'liebe','Los des Eros','Liebe');

  /* Profektion */
  var P=ztB.profektion, PT=ZT_PROFEKTION[P.haus-1];
  h+='<div class="zt-j" style="border-top-color:#3D6B62">'+
    '<div class="lab">Das Jahr &middot; Profektion</div>'+
    '<h3>'+P.haus+'. Haus &mdash; '+PT.n+'</h3>'+
    '<div class="wann">Lebensjahr '+(P.alter+1)+' &middot; '+P.zeichenName+
      ' &middot; Jahresherr '+P.herr+'</div>'+
    '<p>'+PT.t+'</p>'+
    '<p style="font-size:13.8px;color:#6B6259;margin:0">Der Jahresherr <b>'+P.herr+'</b> f&uuml;hrt '+
      'dieses Jahr. Wo er in deinem Chart steht und wie es ihm dort geht, f&auml;rbt das ganze Jahr '+
      'ein &mdash; das ist der eigentliche Hinweis, nicht das Haus allein.</p>'+
    '</div>';

  /* Firdaria */
  var F=ztB.firdariaJetzt;
  h+='<div class="zt-j" style="border-top-color:#6A4A62">'+
    '<div class="lab">Firdaria</div>'+
    (F
      ? '<h3>'+F.haupt.herr+'</h3>'+
        '<div class="wann">Alter '+ztKZ(F.haupt.von)+' bis '+ztKZ(F.haupt.bis)+
          (F.unter?' &middot; Unterperiode '+F.unter.herr:'')+'</div>'+
        '<p>'+(ZT_FIRDARIA[F.haupt.herr]||{t:''}).t+'</p>'+
        (F.unter&&F.unter.herr!==F.haupt.herr
          ? '<div class="unter"><b>Darin: '+F.unter.herr+'</b><p style="margin:0">'+
            (ZT_FIRDARIA[F.unter.herr]||{t:''}).t+'</p></div>'
          : '')
      : '<h3>Reihe durchlaufen</h3><p>Die Firdaria decken 75 Jahre ab. Danach beginnt die '+
        'Reihe nach manchen Quellen von vorn, nach anderen endet sie &mdash; die Seite rechnet '+
        'sie nicht weiter, statt sich auf eine der beiden Lesarten festzulegen.</p>')+
    '<p class="ac-tech" data-ab="2" style="margin:10px 0 0;font-size:12.5px;color:#6B6259">'+
      'Reihenfolge nach '+(ztB.lose.tag?'Tag':'Nacht')+'geburt, Fassung nach Bonatti.</p>'+
    '</div>';
  h+='</div>';
  box.innerHTML=h;
}

/* ── Die Lebenslinie ────────────────────────────────────────── */
/* Der erste Satz, gekappt — ein Satz kann länger sein als die Zeile hergibt */
function ztSatz1(s, max){
  s=String(s||'').trim(); max=max||105;
  var p=s.indexOf('. ');
  if(p>0 && p<max) return s.slice(0,p+1);
  if(s.length<=max) return s;
  var i=s.lastIndexOf(' ', max);
  return s.slice(0, i>40?i:max).replace(/[,;:·\s]+$/,'')+'…';
}

/* U+FE0E: sonst stellt Chromium die Tierkreiszeichen als Farb-Emoji dar */
var ZT_GLYPHE=['♈︎','♉︎','♊︎','♋︎','♌︎','♍︎','♎︎','♏︎','♐︎','♑︎','♒︎','♓︎'];

function ztLinieBauen(){
  var box=ztEl('ztlinie');
  if(!ztB){ box.innerHTML='<div class="zt-leer">Keine Linie ohne Profil.</div>';
    ztEl('ztlinie-hint').textContent=''; return; }
  function N(t,a,txt){ var e=document.createElementNS(ZT_NSU,t);
    for(var k in a) e.setAttribute(k,a[k]);
    if(txt!==undefined) e.textContent=txt; return e; }

  var alterJetzt=ztB.tageSeitGeburt/360;
  var maxJ=Math.max(90, Math.ceil((alterJetzt+25)/10)*10);
  var W=1000, L=56, R=12, H=200;
  function x(tage){ return L + (tage/(maxJ*360))*(W-L-R); }

  var svg=N('svg',{viewBox:'0 0 '+W+' '+H, class:'zt-linie', role:'img',
    'aria-label':'Zeitstrahl der Lebensabschnitte für Arbeit und Liebe'});

  var spuren=[{f:ztB.beruf, lab:'Arbeit', welche:'beruf', y:26},
              {f:ztB.liebe, lab:'Liebe',  welche:'liebe', y:110}];

  spuren.forEach(function(S){
    if(!S.f) return;
    svg.appendChild(N('text',{x:'2', y:String(S.y-6), class:'zt-spur'}, S.lab));
    S.f.abschnitte.forEach(function(a){
      if(a.von > maxJ*360) return;
      var x0=x(a.von), x1=x(Math.min(a.bis, maxJ*360)), br=x1-x0;
      if(br<=0.4) return;
      var st=ZT_STUFE[ztStufe(a.vonGlueck)];
      var g=N('g',{class:'zt-band'+((ztOffen&&ztOffen.k===S.welche+a.von)?' ist':''),
        tabindex:'0', role:'button',
        'aria-label':S.lab+': '+AC_ZEIT.ZEICHEN[a.zeichen]+', '+st.n});
      g.setAttribute('data-spur',S.welche); g.setAttribute('data-von',String(a.von));
      g.appendChild(N('rect',{x:x0.toFixed(1), y:String(S.y), width:br.toFixed(1), height:'34',
        rx:'5', fill:st.farbe, class:'haupt'}));
      var nm=AC_ZEIT.ZEICHEN[a.zeichen];
      if(br>=95) g.appendChild(N('text',{x:(x0+8).toFixed(1), y:String(S.y+21),
        class:'zt-bt'+(st.rang===1?' dunkel':'')}, nm));
      else if(br>=14) g.appendChild(N('text',{x:(x0+br/2).toFixed(1), y:String(S.y+22),
        'text-anchor':'middle', class:'zt-bt zt-gly'+(st.rang===1?' dunkel':'')},
        ZT_GLYPHE[a.zeichen]));
      /* Der Streifen darunter zeigt nur die Hochphasen innerhalb des
         Kapitels. Alle drei Stufen einzufärben ergibt bei siebzig
         Abschnitten ein Muster, aus dem niemand etwas abliest.        */
      g.appendChild(N('rect',{x:x0.toFixed(1), y:String(S.y+36), width:br.toFixed(1),
        height:'11', fill:'#EBE1D2'}));
      a.unter.forEach(function(u){
        if(u.von > maxJ*360) return;
        var u0=x(u.von), u1=x(Math.min(u.bis, maxJ*360));
        if(u1-u0<=0.3) return;
        if(ztStufe(u.vonGlueck)==='winkel')
          g.appendChild(N('rect',{x:u0.toFixed(1), y:String(S.y+36),
            width:Math.max(0.8,u1-u0).toFixed(1), height:'11',
            fill:ZT_STUFE.winkel.farbe}));
        if(u.bindung)
          g.appendChild(N('path',{d:'M'+u0.toFixed(1)+','+(S.y+30)+' l5,6 l-5,6 l-5,-6 Z',
            fill:'#A05A3A'}));
      });
      svg.appendChild(g);
    });
  });

  /* Achse */
  var ay=176;
  svg.appendChild(N('line',{x1:String(L), y1:String(ay), x2:String(W-R), y2:String(ay),
    stroke:'#DDD0BC','stroke-width':'1'}));
  for(var j=0;j<=maxJ;j+=10){
    var px=x(j*360);
    svg.appendChild(N('line',{x1:px.toFixed(1), y1:String(ay), x2:px.toFixed(1),
      y2:String(ay+4), stroke:'#DDD0BC','stroke-width':'1'}));
    svg.appendChild(N('text',{x:px.toFixed(1), y:String(ay+16), 'text-anchor':'middle',
      class:'zt-achse'}, String(j)));
  }
  svg.appendChild(N('text',{x:'2', y:String(ay+16), class:'zt-achse'}, 'Alter'));

  /* Stichtag */
  if(alterJetzt<=maxJ){
    var hx=x(ztB.tageSeitGeburt);
    var gh=N('g',{class:'zt-heute'});
    gh.appendChild(N('line',{x1:hx.toFixed(1), y1:'20', x2:hx.toFixed(1), y2:String(ay)}));
    gh.appendChild(N('text',{x:(hx+4).toFixed(1), y:'15'},
      'Stichtag · ' + Math.floor(ztB.alter)));
    svg.appendChild(gh);
  }

  box.innerHTML=''; box.appendChild(svg);
  Array.prototype.forEach.call(svg.querySelectorAll('.zt-band'),function(g){
    function auf(){ ztOeffnen(g.getAttribute('data-spur'), +g.getAttribute('data-von')); }
    g.addEventListener('click',auf);
    g.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){ e.preventDefault(); auf(); } });
  });

  ztEl('ztlinie-hint').innerHTML='Ein Balken ist ein Kapitel, der Streifen darunter sind seine '+
    'Unterabschnitte. Tippe einen Balken an. Auf dem Telefon l&auml;sst sich die Linie seitlich schieben.';

  ztEl('ztlegende').innerHTML=['winkel','folgend','fallend'].map(function(k){
    return '<span><i style="background:'+ZT_STUFE[k].farbe+'"></i>'+ZT_STUFE[k].n+
      ' &mdash; '+ZT_STUFE[k].kurz+'</span>'; }).join('')+
    '<span><i style="background:#A05A3A;transform:rotate(45deg)"></i>'+
    'L&ouml;sung der Bindung</span>';
}

function ztOeffnen(spur, von){
  var f=(spur==='beruf')?ztB.beruf:ztB.liebe;
  var a=null;
  f.abschnitte.forEach(function(x){ if(x.von===von) a=x; });
  if(!a) return;
  ztOffen={k:spur+von, spur:spur, a:a};
  ztLinieBauen(); ztDetailBauen();
  var d=ztEl('ztdetail');
  if(d&&d.scrollIntoView) d.scrollIntoView({behavior:'smooth', block:'nearest'});
}

function ztDetailBauen(){
  var box=ztEl('ztdetail');
  if(!ztOffen){ box.innerHTML=''; return; }
  var a=ztOffen.a, welche=ztOffen.spur, K=ZT_KAPITEL[a.zeichen];
  var S=ZT_STUFE[ztStufe(a.vonGlueck)];
  var laeuft=(ztB.tageSeitGeburt>=a.von && ztB.tageSeitGeburt<a.bis);
  var h='<div class="zt-detail" style="border-left-color:'+S.farbe+'">'+
    '<div class="zt-dkopf"><h3>'+K.n+'</h3>'+
    '<span class="zt-stufe" style="background:'+S.farbe+'">'+S.n+'</span>'+
    (laeuft?'<span class="zt-stufe" style="background:#A05A3A">l&auml;uft gerade</span>':'')+'</div>'+
    '<div class="wann">'+ztDatumText(ztTagVon(a.von))+' bis '+ztDatumText(ztTagVon(a.bis))+
      ' &middot; Alter '+Math.floor(ztAlterBei(a.von))+' bis '+Math.floor(ztAlterBei(a.bis))+
      ' &middot; '+a.jahre+' Jahre &middot; '+(welche==='beruf'?'Arbeit':'Liebe')+'</div>'+
    '<p>'+K[welche].t+'</p>'+
    '<p>'+S.was+'</p>'+
    '<div class="tun"><b>Dazu</b>'+K[welche].tun+'</div>';
  /* Unterperioden dieses Kapitels */
  h+='<div class="zt-tab" style="margin-top:15px"><table><thead><tr><th>Unterabschnitt</th>'+
     '<th>Von</th><th>Bis</th><th>Stufe</th></tr></thead><tbody>';
  a.unter.forEach(function(u){
    var us=ZT_STUFE[ztStufe(u.vonGlueck)];
    var jetzt=(ztB.tageSeitGeburt>=u.von && ztB.tageSeitGeburt<u.bis);
    h+='<tr class="'+(jetzt?'ist':'')+'"><td><span class="pz" style="background:'+us.farbe+
      '"></span>'+AC_ZEIT.ZEICHEN[u.zeichen]+
      (u.bindung?' <span class="bd">Einschnitt</span>':'')+'</td>'+
      '<td>'+ztKurz(ztTagVon(u.von))+'</td><td>'+ztKurz(ztTagVon(u.bis))+'</td>'+
      '<td>'+us.n+'</td></tr>';
  });
  h+='</tbody></table></div>';
  h+='<p class="ac-tech" data-ab="3" style="margin-top:12px;font-size:12.5px;color:#6B6259">'+
     'Zeichen '+AC_ZEIT.ZEICHEN[a.zeichen]+', '+a.jahre+' allgemeine Jahre, Herr '+a.herr+
     ' &middot; '+a.vonGlueck+'. Zeichen vom Los des Gl&uuml;cks aus.</p>';
  h+='</div>';
  box.innerHTML=h;
  try{ if(window.AC_NIV) AC_NIV.anwenden(); }catch(e){}
}

/* ── Nächste Hochphasen ─────────────────────────────────────── */
function ztGipfelBauen(){
  var box=ztEl('ztgipfel');
  if(!ztB){ box.innerHTML='<div class="zt-leer">Ohne Profil keine Hochphasen.</div>'; return; }
  var h='';
  [['beruf','Arbeit',ztB.beruf],['liebe','Liebe',ztB.liebe]].forEach(function(S){
    if(!S[2]) return;
    var G=AC_ZEIT.naechsteGipfel(S[2], ztB.tageSeitGeburt, 5);
    h+='<h3 style="font-family:var(--serif);font-size:19px;font-weight:500;color:#2E3A5C;'+
       'margin:18px 0 10px">'+S[1]+'</h3>';
    if(!G.length){ h+='<div class="zt-leer">In den n&auml;chsten Jahrzehnten keine Hochphase '+
      'in dieser Spur.</div>'; return; }
    h+='<div class="zt-liste">';
    G.forEach(function(g){
      var K=ZT_KAPITEL[g.zeichen];
      h+='<div class="zt-g'+(g.laeuft?' laeuft':'')+'">'+
        '<span class="wann">'+ztKurz(ztTagVon(g.von))+' &ndash; '+ztKurz(ztTagVon(g.bis))+'</span>'+
        '<span class="was"><b>'+K.n+'</b><span>'+ztSatz1(K[S[0]].t)+'</span></span>'+
        '<span class="mk'+(g.laeuft?' jetzt':'')+'">'+
          (g.laeuft?'läuft':(g.ebene===1?'Kapitel':'Abschnitt'))+'</span>'+
        '</div>';
    });
    h+='</div>';
  });
  box.innerHTML=h;
}

/* ── Einschnitte ────────────────────────────────────────────── */
function ztSchnitteBauen(){
  var box=ztEl('ztschnitte');
  if(!ztB){ box.innerHTML='<div class="zt-leer">Ohne Profil keine Einschnitte.</div>'; return; }
  var h='';
  [['beruf','Arbeit',ztB.beruf],['liebe','Liebe',ztB.liebe]].forEach(function(S){
    if(!S[2]) return;
    var BI=AC_ZEIT.bindungen(S[2]).filter(function(x){ return ztAlterBei(x.von)<=95; });
    h+='<h3 style="font-family:var(--serif);font-size:19px;font-weight:500;color:#2E3A5C;'+
       'margin:18px 0 10px">'+S[1]+'</h3>';
    if(!BI.length){ h+='<div class="zt-leer">In dieser Spur l&ouml;st sich die Bindung nicht &mdash; '+
      'das kommt vor, wenn alle Kapitel k&uuml;rzer sind als ein voller Umlauf.</div>'; return; }
    h+='<div class="zt-liste">';
    BI.forEach(function(b){
      var vorbei=(ztB.tageSeitGeburt>b.bis);
      h+='<div class="zt-g" style="border-left-color:#A05A3A">'+
        '<span class="wann">'+ztKurz(ztTagVon(b.von))+' &middot; Alter '+
          Math.floor(ztAlterBei(b.von))+'</span>'+
        '<span class="was"><b>'+ZT_BINDUNG[S[0]].n+' in '+AC_ZEIT.ZEICHEN[b.zeichen]+'</b>'+
        '<span>'+ZT_BINDUNG[S[0]].was+'</span></span>'+
        '<span class="mk'+(vorbei?'':' jetzt')+'">'+(vorbei?'war':'kommt')+'</span>'+
        '</div>';
    });
    h+='</div>';
  });
  h+='<div class="zt-detail" style="border-left-color:#A05A3A;margin-top:18px">'+
     '<p style="margin:0">'+ZT_BINDUNG.beruf.tun+'</p></div>';
  box.innerHTML=h;
}

/* ── Alle Abschnitte ────────────────────────────────────────── */
function ztWelcheBauen(){
  var box=ztEl('ztwelche');
  box.innerHTML=[['beruf','Arbeit'],['liebe','Liebe']].map(function(w){
    return '<button type="button" class="zt-knopf'+(w[0]===ztWelche?' ist':'')+
      '" data-w="'+w[0]+'">'+w[1]+'</button>'; }).join('');
  Array.prototype.forEach.call(box.querySelectorAll('button[data-w]'),function(b){
    b.addEventListener('click',function(){ ztWelche=b.getAttribute('data-w');
      ztWelcheBauen(); ztTabelleBauen(); });
  });
}
function ztTabelleBauen(){
  var box=ztEl('zttabelle');
  if(!ztB){ box.innerHTML='<div class="zt-leer">Ohne Profil keine Tabelle.</div>'; return; }
  var f=(ztWelche==='beruf')?ztB.beruf:ztB.liebe;
  if(!f){ box.innerHTML='<div class="zt-leer">F&uuml;r diese Spur fehlt die Venus im Chart.</div>'; return; }
  var h='<table><thead><tr><th>Abschnitt</th><th>Von</th><th>Bis</th><th>Alter</th>'+
    '<th>Stufe</th></tr></thead><tbody>';
  f.abschnitte.forEach(function(a){
    if(ztAlterBei(a.von)>95) return;
    var st=ZT_STUFE[ztStufe(a.vonGlueck)];
    var jetzt=(ztB.tageSeitGeburt>=a.von && ztB.tageSeitGeburt<a.bis);
    h+='<tr class="'+(jetzt?'ist':'')+'"><td><span class="pz" style="background:'+st.farbe+
      '"></span><b>'+AC_ZEIT.ZEICHEN[a.zeichen]+'</b></td>'+
      '<td>'+ztKurz(ztTagVon(a.von))+'</td><td>'+ztKurz(ztTagVon(a.bis))+'</td>'+
      '<td>'+Math.floor(ztAlterBei(a.von))+'&ndash;'+Math.floor(ztAlterBei(a.bis))+'</td>'+
      '<td>'+st.n+'</td></tr>';
    a.unter.forEach(function(u){
      if(ztAlterBei(u.von)>95) return;
      var us=ZT_STUFE[ztStufe(u.vonGlueck)];
      var j2=(ztB.tageSeitGeburt>=u.von && ztB.tageSeitGeburt<u.bis);
      h+='<tr class="l2'+(j2?' ist':'')+'"><td><span class="pz" style="background:'+us.farbe+
        '"></span>'+AC_ZEIT.ZEICHEN[u.zeichen]+
        (u.bindung?' <span class="bd">Einschnitt</span>':'')+'</td>'+
        '<td>'+ztKurz(ztTagVon(u.von))+'</td><td>'+ztKurz(ztTagVon(u.bis))+'</td>'+
        '<td>'+Math.floor(ztAlterBei(u.von))+'</td><td>'+us.kurz+'</td></tr>';
    });
  });
  h+='</tbody></table>';
  box.innerHTML='<div class="zt-tab">'+h+'</div>';
}

/* ── Bericht ────────────────────────────────────────────────── */
function ztBericht(){
  if(!ztB) return 'Kein Profil aktiv.';
  var p=ztAktiv(), L=[];
  L.push('HOCHPHASEN — ' + ztName(p));
  L.push('Stichtag ' + ztKurz(ztB.jetzt) + ' · Alter ' + ztB.alter + ' · ' + ztB.lose.sekte + 'geburt');
  L.push('Lose: Glück ' + AC_ZEIT.ZEICHEN[AC_ZEIT.zi(ztB.lose.glueck)] +
         ', Geist ' + AC_ZEIT.ZEICHEN[AC_ZEIT.zi(ztB.lose.geist)] +
         (ztB.erosLon!==null?', Eros ' + AC_ZEIT.ZEICHEN[AC_ZEIT.zi(ztB.erosLon)]:''));
  L.push('');
  [['beruf','ARBEIT',ztB.beruf],['liebe','LIEBE',ztB.liebe]].forEach(function(S){
    if(!S[2]) return;
    var J=AC_ZEIT.jetzt(S[2], ztB.tageSeitGeburt);
    L.push(S[1]);
    if(J.l1){
      var K=ZT_KAPITEL[J.l1.zeichen], st=ZT_STUFE[ztStufe(J.l1.vonGlueck)];
      L.push('  Kapitel: ' + K.n + ' (' + st.n + '), ' +
             ztKurz(ztTagVon(J.l1.von)) + ' bis ' + ztKurz(ztTagVon(J.l1.bis)));
      L.push('  ' + K[S[0]].t);
      if(J.l2){
        var K2=ZT_KAPITEL[J.l2.zeichen], s2=ZT_STUFE[ztStufe(J.l2.vonGlueck)];
        L.push('  Darin: ' + K2.n + ' (' + s2.n + ') bis ' + ztKurz(ztTagVon(J.l2.bis)));
        L.push('  ' + K2[S[0]].t);
        L.push('  Dazu: ' + K2[S[0]].tun);
      }
    }
    L.push('');
    L.push('  Nächste Hochphasen:');
    AC_ZEIT.naechsteGipfel(S[2], ztB.tageSeitGeburt, 5).forEach(function(g){
      L.push('    ' + ztKurz(ztTagVon(g.von)) + ' – ' + ztKurz(ztTagVon(g.bis)) + '  ' +
             ZT_KAPITEL[g.zeichen].n + (g.laeuft?'  (läuft)':''));
    });
    var BI=AC_ZEIT.bindungen(S[2]).filter(function(x){ return ztAlterBei(x.von)<=95; });
    if(BI.length){
      L.push('  Einschnitte (Lösung der Bindung):');
      BI.forEach(function(b){
        L.push('    ' + ztKurz(ztTagVon(b.von)) + '  Alter ' + Math.floor(ztAlterBei(b.von)) +
               '  in ' + AC_ZEIT.ZEICHEN[b.zeichen]);
      });
    }
    L.push('');
  });
  var P=ztB.profektion, PT=ZT_PROFEKTION[P.haus-1];
  L.push('DAS JAHR (Profektion)');
  L.push('  ' + P.haus + '. Haus — ' + PT.n + ' · ' + P.zeichenName + ' · Jahresherr ' + P.herr);
  L.push('  ' + PT.t);
  L.push('');
  if(ztB.firdariaJetzt){
    L.push('FIRDARIA');
    L.push('  ' + ztB.firdariaJetzt.haupt.herr +
           (ztB.firdariaJetzt.unter?' / ' + ztB.firdariaJetzt.unter.herr:''));
    L.push('  ' + (ZT_FIRDARIA[ztB.firdariaJetzt.haupt.herr]||{t:''}).t);
    L.push('');
  }
  L.push('GRENZEN');
  L.push('  Eine Hochphase heißt: es passiert viel. Nicht: es wird gut.');
  L.push('  Ein Drittel aller Abschnitte ist rechnerisch eine Hochphase.');
  L.push('  Das Verfahren ist nicht überprüft. Prüf es rückwärts am eigenen Leben.');
  L.push('  Alle Lose hängen am Aszendenten — eine ungenaue Geburtszeit verschiebt alles.');
  return L.join('\n').replace(/<[^>]+>/g,'').replace(/&auml;/g,'ä').replace(/&ouml;/g,'ö')
          .replace(/&uuml;/g,'ü').replace(/&szlig;/g,'ß').replace(/&middot;/g,'·')
          .replace(/&ndash;/g,'–').replace(/&mdash;/g,'—').replace(/&nbsp;/g,' ');
}

/* ── Zusammensetzen ─────────────────────────────────────────── */
function ztAlles(){
  var p=ztAktiv();
  ztB=null;
  if(p && p.h!==undefined && p.lat!==undefined){
    try{
      var C=chartVon(p);
      ztJD=ztJDVon(p);
      ztB=AC_ZEIT.blatt(C, ztJD, {y:p.y, mo:p.mo, d:p.d}, ztStichtag||new Date(),
                        ztVariante==='alt'?'alt':'paulus');
    }catch(e){ ztB=null; }
  }
  ztPersonenBauen(); ztVarianteBauen();
  ztJetztBauen(); ztLinieBauen(); ztDetailBauen();
  ztGipfelBauen(); ztSchnitteBauen(); ztWelcheBauen(); ztTabelleBauen();
  var w=ztEl('ztzeitwarnung');
  if(w && p){
    w.innerHTML='Alle drei Lose h&auml;ngen am Aszendenten, und der wandert in vier Minuten um '+
      'ein Grad. Eine ungenaue Geburtszeit verschiebt die Lose und damit die ganze Reihe &mdash; '+
      'bei einer Stunde Unsicherheit um bis zu ein halbes Zeichen. F&uuml;r dieses Profil ist '+
      ('0'+p.h).slice(-2)+':'+('0'+p.mi).slice(-2)+' hinterlegt. Wenn die Zeit gesch&auml;tzt ist, '+
      'lies die Jahreszahlen hier als ungef&auml;hr und pr&uuml;f sie an Ereignissen nach, die du kennst.';
  }
  try{ if(window.AC_NIV) AC_NIV.anwenden(); }catch(e){}
}

function ztStart(){
  ztStichtag=new Date();
  ztEl('ztdatum').value=ztISO(ztStichtag);
  ztAlles();

  ztEl('ztdatum').addEventListener('change',function(){
    var v=ztEl('ztdatum').value;
    if(!v) return;
    var t=v.split('-');
    ztStichtag=new Date(+t[0], +t[1]-1, +t[2]);
    ztOffen=null; ztAlles();
  });
  ztEl('ztheute').addEventListener('click',function(){
    ztStichtag=new Date(); ztEl('ztdatum').value=ztISO(ztStichtag);
    ztOffen=null; ztAlles();
  });
  ztEl('ztkopie').addEventListener('click',function(){
    var s=ztBericht();
    function fertig(){ ztEl('ztecho').textContent='Zeitplan kopiert, '+s.length+' Zeichen.';
      setTimeout(function(){ ztEl('ztecho').textContent=''; }, 3400); }
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(s).then(fertig,function(){ ztNotfall(s); fertig(); });
    } else { ztNotfall(s); fertig(); }
  });
  ztEl('ztdruck').addEventListener('click',function(){ window.print(); });
}
function ztNotfall(s){
  var a=document.createElement('textarea'); a.value=s; document.body.appendChild(a);
  a.select(); try{ document.execCommand('copy'); }catch(e){} document.body.removeChild(a);
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', ztStart);
else ztStart();
