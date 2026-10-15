/* Astro-Charlie · Zeiten — die Seite
   Antwort zuerst, Erklärung danach, Tiefe zuletzt. */
function ztEl(i){ return document.getElementById(i); }
function ztEsc(s){ return String(s===undefined||s===null?'':s).replace(/[<>&"]/g,function(c){
  return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }
var ZT_NSU='http://www.w3.org/2000/svg';
var ZT_MON=['Januar','Februar','März','April','Mai','Juni','Juli','August',
 'September','Oktober','November','Dezember'];
/* U+FE0E: sonst stellt Chromium die Tierkreiszeichen als Farb-Emoji dar */
var ZT_GLYPHE=['♈︎','♉︎','♊︎','♋︎','♌︎','♍︎','♎︎','♏︎','♐︎','♑︎','♒︎','♓︎'];

var ztPerson=null, ztVariante='paulus', ztStichtag=null, ztOffen=null;
var ztBereich='arbeit', ztB=null, ztJD=0, ztWortNr=0;

/* ── Kleinkram ──────────────────────────────────────────────── */
function ztKZ(x){ var r=Math.round(x*10)/10;
  return (r%1===0)?String(r):r.toFixed(1).replace('.',','); }
function ztDatumText(d){ return d.getDate()+'. '+ZT_MON[d.getMonth()]+' '+d.getFullYear(); }
function ztKurz(d){ return ('0'+d.getDate()).slice(-2)+'.'+('0'+(d.getMonth()+1)).slice(-2)+
  '.'+d.getFullYear(); }
function ztJahrMon(d){ return ZT_MON[d.getMonth()].slice(0,3)+' '+d.getFullYear(); }
function ztISO(d){ return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+
  ('0'+d.getDate()).slice(-2); }
function ztTagVon(tage){ return AC_ZEIT.datum(ztJD, tage); }
function ztAlterBei(tage){ return tage/365.2422; }
function ztSatz1(s, max){
  s=String(s||'').replace(/<[^>]+>/g,'').trim(); max=max||105;
  var p=s.indexOf('. ');
  if(p>0 && p<max) return s.slice(0,p+1);
  if(s.length<=max) return s;
  var i=s.lastIndexOf(' ', max);
  return s.slice(0, i>40?i:max).replace(/[,;:·\s]+$/,'')+'…';
}
/* Eine Dauer so ausdrücken, wie man sie sagen würde */
function ztDauer(jahre){
  if(jahre < 1/12) return Math.max(1, Math.round(jahre*360)) + ' Tagen';
  if(jahre < 1.5){
    var m=Math.round(jahre*12);
    return (m<=1?'einem Monat':m+' Monaten');
  }
  return ztKZ(jahre)+' Jahren';
}
function ztLang(jahre){ return ztDauer(jahre).replace(/n$/,'').replace(/einem Monat/,'einen Monat')
  .replace(/Tage$/,'Tage').replace(/Monate$/,'Monate').replace(/Jahre$/,'Jahre'); }
function ztBer(){ var o=null;
  ZT_BEREICH.forEach(function(b){ if(b.k===ztBereich) o=b; });
  return o||ZT_BEREICH[0]; }
function ztSpur(k){ return ztB ? ztB.spuren[k||ztBereich] : null; }

/* ── Wörter, die sich selbst erklären ───────────────────────── */
function ztW(wort, text){
  if(!ZT_WORT[wort]) return ztEsc(text||wort);
  var id='zw'+(++ztWortNr);
  return '<span class="zt-wp"><button type="button" class="zt-w" data-w="'+ztEsc(wort)+
    '" aria-expanded="false" aria-controls="'+id+'">'+ztEsc(text||wort)+'</button>'+
    '<span class="zt-we" id="'+id+'" hidden>'+ZT_WORT[wort]+'</span></span>';
}
/* Doppelte eckige Klammern im Text werden zu einem erklärbaren Wort */
function ztWorte(s){
  return String(s||'').replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, function(m,w,t){
    return ztW(w, t||w); });
}
function ztWortWirken(wo){
  Array.prototype.forEach.call((wo||document).querySelectorAll('.zt-w'),function(b){
    if(b.dataset.an) return; b.dataset.an='1';
    b.addEventListener('click',function(){
      var e=document.getElementById(b.getAttribute('aria-controls'));
      if(!e) return;
      var auf=e.hasAttribute('hidden');
      if(auf) e.removeAttribute('hidden'); else e.setAttribute('hidden','');
      b.setAttribute('aria-expanded', String(auf));
      b.classList.toggle('auf', auf);
    });
  });
}

/* ── Profile ────────────────────────────────────────────────── */
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
function ztPersonenBauen(){
  var box=ztEl('ztpersonen'), a=ztProfile(), p=ztAktiv();
  if(!a.length){ box.innerHTML='<span class="zt-hint" style="flex:1 1 100%">Noch kein Profil '+
    'angelegt. <a href="profile.html">Hier anlegen</a> &mdash; diese Seite braucht unbedingt '+
    'die <b>Geburtszeit</b>.</span>'; return; }
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
    .map(function(v){ return '<button type="button" class="zt-knopf'+
      (v[0]===ztVariante?' ist':'')+'" data-v="'+v[0]+'">'+v[1]+'</button>'; }).join('');
  Array.prototype.forEach.call(box.querySelectorAll('button[data-v]'),function(b){
    b.addEventListener('click',function(){ ztVariante=b.getAttribute('data-v');
      ztOffen=null; ztAlles(); });
  });
}

/* ── A · Die Antwort ────────────────────────────────────────── */
function ztLage(k){
  var f=ztSpur(k); if(!f) return null;
  var J=AC_ZEIT.jetzt(f, ztB.tageSeitGeburt);
  if(!J.l1) return null;
  var st=ztStufe(J.l2?J.l2.vonGlueck:J.l1.vonGlueck);
  return {l1:J.l1, l2:J.l2, stufe:st, S:ZT_STUFE[st],
          k1:ZT_KAPITEL[J.l1.zeichen], k2:J.l2?ZT_KAPITEL[J.l2.zeichen]:null};
}
function ztAntwortBauen(){
  var box=ztEl('ztantwort');
  if(!ztB){ box.innerHTML='<div class="zt-leer">Ohne Profil mit Geburtszeit l&auml;sst sich '+
    'nichts rechnen. <a href="profile.html">Profil anlegen</a> &mdash; danach steht hier deine '+
    'Antwort, und alles andere auf der Seite f&uuml;llt sich mit.</div>'; return; }
  var B=ztBer(), L=ztLage();
  if(ztB.tageSeitGeburt < 0){
    box.innerHTML='<div class="zt-leer"><b>Der Stichtag liegt vor der Geburt.</b> '+
      'Die Reihe f&auml;ngt mit dem ersten Lebenstag an &mdash; davor gibt es nichts zu '+
      'rechnen. Stell den Tag weiter nach hinten.</div>'; return; }
  if(!L){
    box.innerHTML='<div class="zt-leer">'+(ztSpur()
      ? '<b>Der Stichtag liegt zu weit in der Zukunft.</b> Die Seite rechnet hundert Jahre ab '+
        'Geburt. Stell den Tag weiter nach vorn.'
      : 'F&uuml;r diesen Bereich fehlt im Chart ein Planet, den die Rechnung braucht.')+
      '</div>'; return; }
  var f=ztSpur(), G=AC_ZEIT.naechsteGipfel(f, ztB.tageSeitGeburt, 4);
  var kommend=G.filter(function(g){ return !g.laeuft; })[0];
  var laufend=G.filter(function(g){ return g.laeuft; })[0];

  var h='<div class="zt-antwort" style="--farbe:'+L.S.farbe+'">'+
    '<div class="zt-ak">Jetzt gerade &middot; '+B.n+'</div>'+
    '<div class="zt-agross">'+L.S.n+'</div>'+
    '<p class="zt-asatz">'+L.S.satz+' '+ztWorte(L.S.was)+'</p>';

  h+='<p class="zt-awo">Du bist im Kapitel <b>'+L.k1.n+'</b> &mdash; '+L.k1.bild+' &mdash; '+
    'seit '+ztJahrMon(ztTagVon(L.l1.von))+', noch '+
    ztLang((L.l1.bis-ztB.tageSeitGeburt)/360)+'.'+
    (L.k2 && L.k2!==L.k1 ? ' Darin l&auml;uft gerade der Unterabschnitt <b>'+L.k2.n+'</b> '+
      'bis '+ztKurz(ztTagVon(L.l2.bis))+'.' : '')+'</p>';

  if(laufend){
    h+='<div class="zt-anext jetzt"><b>Du bist gerade mittendrin.</b> Diese Hochphase l&auml;uft '+
      'noch bis '+ztDatumText(ztTagVon(laufend.bis))+'.</div>';
  }
  if(kommend){
    var tage=kommend.von-ztB.tageSeitGeburt;
    h+='<div class="zt-anext"><b>Deine n&auml;chste Hochphase</b> beginnt am '+
      ztDatumText(ztTagVon(kommend.von))+' &mdash; in '+ztDauer(tage/365.2422)+' &mdash; '+
      'und dauert '+ztLang((kommend.bis-kommend.von)/360)+'. Es ist ein '+
      (kommend.ebene===1?'ganzes Kapitel':'Unterabschnitt')+' in <b>'+
      ZT_KAPITEL[kommend.zeichen].n+'</b>.</div>';
  } else {
    h+='<div class="zt-anext">In den n&auml;chsten Jahrzehnten kommt in diesem Bereich keine '+
      'weitere Hochphase.</div>';
  }

  /* Die vier anderen Bereiche in einer Zeile */
  h+='<div class="zt-amini">';
  ZT_BEREICH.forEach(function(x){
    var l=ztLage(x.k);
    h+='<button type="button" class="zt-m'+(x.k===ztBereich?' ist':'')+'" data-b="'+x.k+'">'+
      '<span class="mn">'+x.kurz+'</span>'+
      (l?'<span class="ms" style="background:'+l.S.farbe+'">'+l.S.kurz+'</span>'
        :'<span class="ms" style="background:#DDD0BC;color:#231F1A">–</span>')+'</button>';
  });
  h+='</div></div>';
  box.innerHTML=h;
  Array.prototype.forEach.call(box.querySelectorAll('button[data-b]'),function(b){
    b.addEventListener('click',function(){ ztBereich=b.getAttribute('data-b');
      ztOffen=null; ztAlles();
      var z=ztEl('antwort'); if(z&&z.scrollIntoView) z.scrollIntoView({block:'start'}); });
  });
  ztWortWirken(box);
}

/* ── B · Die vier Schritte ──────────────────────────────────── */
function ztN(t,a,txt){ var e=document.createElementNS(ZT_NSU,t);
  for(var k in a) e.setAttribute(k,a[k]);
  if(txt!==undefined) e.textContent=txt; return e; }

function ztBildKapitel(){        /* Schritt 1 */
  var f=ztSpur('arbeit'); if(!f) return '';
  var W=1000, H=58, maxJ=90, L=0;
  var svg=ztN('svg',{viewBox:'0 0 '+W+' '+H, class:'zt-mini-svg', role:'img',
    'aria-label':'Ein Lebensstrahl, in Kapitel geteilt'});
  f.abschnitte.forEach(function(a){
    if(a.von>maxJ*360) return;
    var x0=L+(a.von/(maxJ*360))*W, x1=L+(Math.min(a.bis,maxJ*360)/(maxJ*360))*W;
    svg.appendChild(ztN('rect',{x:x0.toFixed(1), y:'8', width:(x1-x0-2).toFixed(1),
      height:'30', rx:'4', fill:'#DDD0BC'}));
    if(x1-x0>86) svg.appendChild(ztN('text',{x:(x0+8).toFixed(1), y:'28',
      class:'zt-mini-t'}, ZT_KAPITEL[a.zeichen].n));
    svg.appendChild(ztN('text',{x:x0.toFixed(1), y:'52', class:'zt-mini-a'},
      String(Math.round(ztAlterBei(a.von)))));
  });
  return svg.outerHTML;
}
function ztBildLaengen(){        /* Schritt 2 */
  var W=1000, H=50, ges=0;
  AC_ZEIT.JAHRE.forEach(function(j){ ges+=j; });
  var svg=ztN('svg',{viewBox:'0 0 '+W+' '+H, class:'zt-mini-svg', role:'img',
    'aria-label':'Die festen Jahreszahlen der zwölf Zeichen'});
  var x=0;
  AC_ZEIT.JAHRE.forEach(function(j,i){
    var br=(j/ges)*W;
    svg.appendChild(ztN('rect',{x:x.toFixed(1), y:'6', width:(br-2).toFixed(1), height:'26',
      rx:'4', fill:(i%2?'#EBE1D2':'#DDD0BC')}));
    svg.appendChild(ztN('text',{x:(x+br/2-1).toFixed(1), y:'24', 'text-anchor':'middle',
      class:'zt-mini-g'}, ZT_GLYPHE[i]));
    svg.appendChild(ztN('text',{x:(x+br/2-1).toFixed(1), y:'45', 'text-anchor':'middle',
      class:'zt-mini-a'}, String(j)));
    x+=br;
  });
  return svg.outerHTML;
}
function ztBildPunkt(){          /* Schritt 3 */
  if(!ztB) return '';
  var gz=AC_ZEIT.zi(ztB.lose.glueck);
  var W=1000, H=66;
  var svg=ztN('svg',{viewBox:'0 0 '+W+' '+H, class:'zt-mini-svg', role:'img',
    'aria-label':'Die zwölf Zeichen, vier davon laut'});
  for(var i=0;i<12;i++){
    var v=AC_ZEIT.vonGlueck(i,gz), laut=(ztStufe(v)==='winkel');
    var br=W/12, x=i*br;
    svg.appendChild(ztN('rect',{x:(x+2).toFixed(1), y:'14', width:(br-4).toFixed(1),
      height:'30', rx:'5', fill:laut?ZT_STUFE.winkel.farbe:'#EBE1D2'}));
    svg.appendChild(ztN('text',{x:(x+br/2).toFixed(1), y:'35', 'text-anchor':'middle',
      class:'zt-mini-g'+(laut?' hell':'')}, ZT_GLYPHE[i]));
    if(i===gz) svg.appendChild(ztN('text',{x:(x+br/2).toFixed(1), y:'10',
      'text-anchor':'middle', class:'zt-mini-p'}, '▼ dein Punkt'));
    svg.appendChild(ztN('text',{x:(x+br/2).toFixed(1), y:'58', 'text-anchor':'middle',
      class:'zt-mini-a'}, laut?'laut':''));
  }
  return svg.outerHTML;
}
function ztBildFuenf(){          /* Schritt 4 */
  if(!ztB) return '';
  var W=1000, zeile=22, H=ZT_BEREICH.length*zeile+16, maxJ=90, L=120;
  var svg=ztN('svg',{viewBox:'0 0 '+W+' '+H, class:'zt-mini-svg', role:'img',
    'aria-label':'Fünf Bereiche mit verschiedenen lauten Zeiten'});
  ZT_BEREICH.forEach(function(B,n){
    var f=ztSpur(B.k), y=n*zeile+4;
    svg.appendChild(ztN('text',{x:'0', y:String(y+13), class:'zt-mini-t'}, B.kurz));
    if(!f) return;
    f.abschnitte.forEach(function(a){
      if(a.von>maxJ*360) return;
      var x0=L+(a.von/(maxJ*360))*(W-L), x1=L+(Math.min(a.bis,maxJ*360)/(maxJ*360))*(W-L);
      svg.appendChild(ztN('rect',{x:x0.toFixed(1), y:String(y), width:Math.max(1,x1-x0-1).toFixed(1),
        height:'15', rx:'3', fill:ZT_STUFE[ztStufe(a.vonGlueck)].farbe}));
    });
  });
  var alter=ztB.tageSeitGeburt/360;
  if(alter<=maxJ && alter>=0){
    var hx=L+(alter/maxJ)*(W-L);
    svg.appendChild(ztN('line',{x1:hx.toFixed(1), y1:'0', x2:hx.toFixed(1),
      y2:String(ZT_BEREICH.length*zeile), stroke:'#A05A3A','stroke-width':'2'}));
    svg.appendChild(ztN('text',{x:(hx+5).toFixed(1), y:String(ZT_BEREICH.length*zeile+9),
      class:'zt-mini-p'}, 'du bist hier'));
  }
  return svg.outerHTML;
}

function ztSchritteBauen(){
  var bilder=[ztBildKapitel(), ztBildLaengen(), ztBildPunkt(), ztBildFuenf()];
  var h='';
  ZT_SCHRITTE.forEach(function(S,i){
    h+='<div class="zt-schritt"><div class="zt-snr">'+(i+1)+'</div>'+
      '<div class="zt-sin"><h3>'+S.n+'</h3><p>'+ztWorte(S.t)+'</p>'+
      (bilder[i]?'<div class="zt-mini">'+bilder[i]+'</div>':'')+
      '<div class="zt-genau" data-ab="2"><b>Genauer</b>'+ztWorte(S.mehr)+'</div>'+
      '</div></div>';
  });
  ztEl('ztschritte').innerHTML=h;
  ztWortWirken(ztEl('ztschritte'));
}

/* ── C · Bereich wählen ─────────────────────────────────────── */
function ztBereicheBauen(){
  var box=ztEl('ztbereiche');
  box.innerHTML=ZT_BEREICH.map(function(B){
    var l=ztLage(B.k);
    return '<button type="button" class="zt-b'+(B.k===ztBereich?' ist':'')+'" data-b="'+B.k+'">'+
      '<b>'+B.n+'</b><span>'+B.worum+'</span>'+
      (l?'<i style="background:'+l.S.farbe+'">gerade '+l.S.kurz+'</i>':'')+'</button>'; }).join('');
  Array.prototype.forEach.call(box.querySelectorAll('button[data-b]'),function(b){
    b.addEventListener('click',function(){ ztBereich=b.getAttribute('data-b');
      ztOffen=null; ztAlles(); });
  });
  var B=ztBer();
  ztEl('ztbfrage').innerHTML='<div class="zt-bfrage"><b>'+B.frage+'</b>'+
    '<p data-ab="2">Startpunkt dieser Spur ist das <b>'+B.los+'</b>. '+B.losErkl+'</p></div>';
}

/* ── D · Die Lebenslinie ────────────────────────────────────── */
function ztLinieBauen(){
  var box=ztEl('ztlinie'), B=ztBer();
  ztEl('ztlinie-u').innerHTML='Die Kapitel deines Lebens f&uuml;r <b>'+B.n+'</b>. '+
    'Breite Balken sind die '+ztW('Kapitel')+', der Streifen darunter zeigt die '+
    ztW('Unterabschnitt','Unterabschnitte')+' &mdash; eingef&auml;rbt sind dort nur die lauten. '+
    'Die Rauten sind die gro&szlig;en Schnitte, die senkrechte Linie ist dein Stichtag.';
  var f=ztSpur();
  if(!ztB || !f){ box.innerHTML='<div class="zt-leer">Keine Linie ohne Profil.</div>';
    ztEl('ztlinie-hint').textContent=''; ztEl('ztlegende').innerHTML=''; return; }

  var alterJetzt=ztB.tageSeitGeburt/360;
  var maxJ=Math.max(90, Math.ceil((alterJetzt+25)/10)*10);
  var W=1000, L=12, R=12, oben=28, hBand=40, hStreif=13, ay=118, H=142;
  function x(tage){ return L+(tage/(maxJ*360))*(W-L-R); }
  var svg=ztN('svg',{viewBox:'0 0 '+W+' '+H, class:'zt-linie', role:'img',
    'aria-label':'Zeitstrahl der Lebensabschnitte für '+B.n});

  f.abschnitte.forEach(function(a){
    if(a.von>maxJ*360) return;
    var x0=x(a.von), x1=x(Math.min(a.bis,maxJ*360)), br=x1-x0;
    if(br<=0.4) return;
    var st=ZT_STUFE[ztStufe(a.vonGlueck)];
    var g=ztN('g',{class:'zt-band'+((ztOffen===a.von)?' ist':''), tabindex:'0', role:'button',
      'aria-label':ZT_KAPITEL[a.zeichen].n+', '+st.n+', ab Alter '+
        Math.round(ztAlterBei(a.von))});
    g.setAttribute('data-von', String(a.von));
    g.appendChild(ztN('rect',{x:x0.toFixed(1), y:String(oben), width:br.toFixed(1),
      height:String(hBand), rx:'5', fill:st.farbe, class:'haupt'}));
    var nm=ZT_KAPITEL[a.zeichen].n;
    if(br>=95){
      g.appendChild(ztN('text',{x:(x0+9).toFixed(1), y:String(oben+18), class:'zt-bt'}, nm));
      g.appendChild(ztN('text',{x:(x0+9).toFixed(1), y:String(oben+33), class:'zt-bt klein'},
        st.n));
    } else if(br>=14)
      g.appendChild(ztN('text',{x:(x0+br/2).toFixed(1), y:String(oben+26),
        'text-anchor':'middle', class:'zt-bt zt-gly'}, ZT_GLYPHE[a.zeichen]));
    /* Streifen: nur die lauten Unterabschnitte */
    g.appendChild(ztN('rect',{x:x0.toFixed(1), y:String(oben+hBand+3), width:br.toFixed(1),
      height:String(hStreif), rx:'2', fill:'#EBE1D2'}));
    a.unter.forEach(function(u){
      if(u.von>maxJ*360) return;
      var u0=x(u.von), u1=x(Math.min(u.bis,maxJ*360));
      if(u1-u0<=0.3) return;
      if(ztStufe(u.vonGlueck)==='winkel')
        g.appendChild(ztN('rect',{x:u0.toFixed(1), y:String(oben+hBand+3),
          width:Math.max(0.8,u1-u0).toFixed(1), height:String(hStreif),
          fill:ZT_STUFE.winkel.farbe}));
      if(u.bindung)
        g.appendChild(ztN('path',{d:'M'+u0.toFixed(1)+','+(oben+hBand-4)+
          ' l5,6 l-5,6 l-5,-6 Z', fill:'#A05A3A'}));
    });
    svg.appendChild(g);
  });

  svg.appendChild(ztN('line',{x1:String(L), y1:String(ay), x2:String(W-R), y2:String(ay),
    stroke:'#DDD0BC','stroke-width':'1'}));
  for(var j=0;j<=maxJ;j+=10){
    var px=x(j*360);
    svg.appendChild(ztN('line',{x1:px.toFixed(1), y1:String(ay), x2:px.toFixed(1),
      y2:String(ay+4), stroke:'#DDD0BC','stroke-width':'1'}));
    svg.appendChild(ztN('text',{x:px.toFixed(1), y:String(ay+17), 'text-anchor':'middle',
      class:'zt-achse'}, j===0?'Geburt':(j+' J.')));
  }
  if(alterJetzt<=maxJ){
    var hx=x(ztB.tageSeitGeburt);
    var gh=ztN('g',{class:'zt-heute'});
    gh.appendChild(ztN('line',{x1:hx.toFixed(1), y1:'20', x2:hx.toFixed(1), y2:String(ay)}));
    gh.appendChild(ztN('text',{x:(hx+5).toFixed(1), y:'15'},
      'du bist hier · '+Math.floor(ztB.alter)));
    svg.appendChild(gh);
  }
  box.innerHTML=''; box.appendChild(svg);
  Array.prototype.forEach.call(svg.querySelectorAll('.zt-band'),function(g){
    function auf(){ ztOeffnen(+g.getAttribute('data-von')); }
    g.addEventListener('click',auf);
    g.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){ e.preventDefault(); auf(); } });
  });

  ztEl('ztlegende').innerHTML=['winkel','folgend','fallend'].map(function(k){
    return '<span><i style="background:'+ZT_STUFE[k].farbe+'"></i><b>'+ZT_STUFE[k].n+
      '</b> &mdash; '+ZT_STUFE[k].satz+'</span>'; }).join('')+
    '<span><i class="raute"></i><b>Gro&szlig;er Schnitt</b></span>';
  ztEl('ztlinie-hint').innerHTML='Tippe einen Balken an, dann steht darunter, was dieses '+
    'Kapitel bedeutet. Auf dem Telefon l&auml;sst sich die Linie seitlich schieben.';
}

function ztAlleBauen(){
  var box=ztEl('ztalle');
  if(!ztB){ box.innerHTML=''; return; }
  var maxJ=90, W=1000, L=132, zeile=34, H=ZT_BEREICH.length*zeile+26;
  var svg=ztN('svg',{viewBox:'0 0 '+W+' '+H, class:'zt-linie', role:'img',
    'aria-label':'Alle fünf Bereiche nebeneinander'});
  ZT_BEREICH.forEach(function(B,n){
    var f=ztSpur(B.k), y=n*zeile+4;
    var g=ztN('g',{class:'zt-zeile'+(B.k===ztBereich?' ist':''), tabindex:'0', role:'button',
      'aria-label':B.n});
    g.setAttribute('data-b', B.k);
    g.appendChild(ztN('rect',{x:'0', y:String(y-2), width:String(W), height:String(zeile-4),
      fill:(B.k===ztBereich?'#F7EFE1':'transparent'), rx:'4'}));
    g.appendChild(ztN('text',{x:'6', y:String(y+17), class:'zt-zt'}, B.kurz));
    if(f) f.abschnitte.forEach(function(a){
      if(a.von>maxJ*360) return;
      var x0=L+(a.von/(maxJ*360))*(W-L-10),
          x1=L+(Math.min(a.bis,maxJ*360)/(maxJ*360))*(W-L-10);
      g.appendChild(ztN('rect',{x:x0.toFixed(1), y:String(y+3), width:Math.max(1,x1-x0-1).toFixed(1),
        height:'20', rx:'3', fill:ZT_STUFE[ztStufe(a.vonGlueck)].farbe}));
      a.unter.forEach(function(u){
        if(u.bindung && u.von<=maxJ*360){
          var ux=L+(u.von/(maxJ*360))*(W-L-10);
          g.appendChild(ztN('path',{d:'M'+ux.toFixed(1)+','+(y+1)+' l4,5 l-4,5 l-4,-5 Z',
            fill:'#A05A3A'}));
        }
      });
    });
    svg.appendChild(g);
  });
  var ay=ZT_BEREICH.length*zeile+8;
  for(var j=0;j<=maxJ;j+=10){
    var px=L+(j/maxJ)*(W-L-10);
    svg.appendChild(ztN('text',{x:px.toFixed(1), y:String(ay+10), 'text-anchor':'middle',
      class:'zt-achse'}, j===0?'Geburt':(j+' J.')));
  }
  if(ztB.tageSeitGeburt/360<=maxJ){
    var hx=L+((ztB.tageSeitGeburt/360)/maxJ)*(W-L-10);
    svg.appendChild(ztN('line',{x1:hx.toFixed(1), y1:'2', x2:hx.toFixed(1),
      y2:String(ay-6), stroke:'#A05A3A','stroke-width':'2'}));
  }
  box.innerHTML=''; box.appendChild(svg);
  Array.prototype.forEach.call(svg.querySelectorAll('.zt-zeile'),function(g){
    function auf(){ ztBereich=g.getAttribute('data-b'); ztOffen=null; ztAlles(); }
    g.addEventListener('click',auf);
    g.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){ e.preventDefault(); auf(); } });
  });
}

function ztOeffnen(von){
  var f=ztSpur(); if(!f) return;
  var a=null; f.abschnitte.forEach(function(x){ if(x.von===von) a=x; });
  if(!a) return;
  ztOffen=(ztOffen===von)?null:von;
  ztLinieBauen(); ztDetailBauen();
  var d=ztEl('ztdetail');
  if(ztOffen && d && d.scrollIntoView) d.scrollIntoView({behavior:'smooth', block:'nearest'});
}
function ztDetailBauen(){
  var box=ztEl('ztdetail');
  if(ztOffen===null || !ztB){ box.innerHTML=''; return; }
  var f=ztSpur(), a=null;
  f.abschnitte.forEach(function(x){ if(x.von===ztOffen) a=x; });
  if(!a){ box.innerHTML=''; return; }
  var B=ztBer(), K=ZT_KAPITEL[a.zeichen], S=ZT_STUFE[ztStufe(a.vonGlueck)];
  var laeuft=(ztB.tageSeitGeburt>=a.von && ztB.tageSeitGeburt<a.bis);
  var h='<div class="zt-detail" style="border-left-color:'+S.farbe+'">'+
    '<div class="zt-dkopf"><h3>'+K.n+' &mdash; '+K.bild+'</h3>'+
    '<span class="zt-stufe" style="background:'+S.farbe+'">'+S.n+'</span>'+
    (laeuft?'<span class="zt-stufe" style="background:#A05A3A">l&auml;uft gerade</span>':'')+'</div>'+
    '<div class="wann">'+ztDatumText(ztTagVon(a.von))+' bis '+ztDatumText(ztTagVon(a.bis))+
      ' &middot; Alter '+Math.floor(ztAlterBei(a.von))+' bis '+Math.floor(ztAlterBei(a.bis))+
      ' &middot; '+a.jahre+' Jahre</div>'+
    '<p><b>F&uuml;r '+B.kurz+':</b> '+K[ztBereich].t+'</p>'+
    '<div class="tun"><b>Ein Handgriff</b>'+K[ztBereich].tun+'</div>'+
    '<p style="margin-top:12px">'+ztWorte(S.was)+'</p>'+
    '<p class="ac-tech" data-ab="2" style="font-size:13px;color:#6B6259">'+S.woher+'</p>';
  h+='<div class="zt-tab" style="margin-top:14px"><table><thead><tr>'+
     '<th>Unterabschnitt</th><th>Von</th><th>Bis</th><th>Lautst&auml;rke</th>'+
     '</tr></thead><tbody>';
  a.unter.forEach(function(u){
    var us=ZT_STUFE[ztStufe(u.vonGlueck)];
    var jetzt=(ztB.tageSeitGeburt>=u.von && ztB.tageSeitGeburt<u.bis);
    h+='<tr class="'+(jetzt?'ist':'')+'"><td><span class="pz" style="background:'+us.farbe+
      '"></span>'+ZT_KAPITEL[u.zeichen].n+
      (u.bindung?' <span class="bd">gro&szlig;er Schnitt</span>':'')+'</td>'+
      '<td>'+ztKurz(ztTagVon(u.von))+'</td><td>'+ztKurz(ztTagVon(u.bis))+'</td>'+
      '<td>'+us.n+'</td></tr>';
  });
  h+='</tbody></table></div>';
  h+='<p class="ac-tech" data-ab="3" style="margin-top:12px;font-size:12.5px;color:#6B6259">'+
     'Zeichen '+ZT_KAPITEL[a.zeichen].n+', '+a.jahre+' allgemeine Jahre, Herr '+a.herr+
     ' &middot; '+a.vonGlueck+'. Zeichen vom Gl&uuml;ckspunkt aus gez&auml;hlt.</p></div>';
  box.innerHTML=h;
  ztWortWirken(box);
  try{ if(window.AC_NIV) AC_NIV.anwenden(); }catch(e){}
}

/* ── E · Hochphasen ─────────────────────────────────────────── */
function ztAusserhalb(){
  return ztB && (ztB.tageSeitGeburt<0 || ztB.tageSeitGeburt>100*360);
}
function ztGipfelBauen(){
  var box=ztEl('ztgipfel'), B=ztBer();
  ztEl('ztgipfel-u').innerHTML='Die lauten Zeiten in <b>'+B.n+'</b> &mdash; die kommenden '+
    'zuerst. Laut hei&szlig;t: Es passiert viel. Ob es gut wird, steht hier nicht.';
  var f=ztSpur();
  if(!ztB||!f){ box.innerHTML='<div class="zt-leer">Ohne Profil keine Hochphasen.</div>'; return; }
  var G=AC_ZEIT.naechsteGipfel(f, ztB.tageSeitGeburt, 6);
  if(!G.length){ box.innerHTML='<div class="zt-leer">In diesem Bereich kommt in den '+
    'n&auml;chsten Jahrzehnten keine Hochphase.</div>'; return; }
  var h='<div class="zt-liste">';
  G.forEach(function(g){
    var K=ZT_KAPITEL[g.zeichen];
    var inJahren=(g.von-ztB.tageSeitGeburt)/365.2422;
    h+='<div class="zt-g'+(g.laeuft?' laeuft':'')+'">'+
      '<span class="wann">'+ztKurz(ztTagVon(g.von))+'<br><i>bis '+ztKurz(ztTagVon(g.bis))+'</i></span>'+
      '<span class="was"><b>'+K.n+'</b><span>'+ztSatz1(K[ztBereich].t)+'</span></span>'+
      '<span class="mk'+(g.laeuft?' jetzt':'')+'">'+
        (g.laeuft?'läuft jetzt':('in '+ztDauer(inJahren)))+'</span></div>';
  });
  box.innerHTML=h+'</div>';
}

/* ── F · Die großen Schnitte ────────────────────────────────── */
function ztSchnitteBauen(){
  var box=ztEl('ztschnitte'), B=ztBer();
  ztEl('ztschnitte-u').innerHTML=ztWorte('Ein [[Der große Schnitt|großer Schnitt]] ist die '+
    'Stelle, an der die Reihe aus ihrer Ordnung springt. ')+
    '<b>F&uuml;r '+B.kurz+' hei&szlig;t das:</b> '+ZT_SCHNITT.beispiele[ztBereich];
  var f=ztSpur();
  if(!ztB||!f){ box.innerHTML='<div class="zt-leer">Ohne Profil keine Schnitte.</div>'; return; }
  var BI=AC_ZEIT.bindungen(f).filter(function(x){ return ztAlterBei(x.von)<=95; });
  if(!BI.length){ box.innerHTML='<div class="zt-leer">In diesem Bereich gibt es keinen '+
    'gro&szlig;en Schnitt. Das kommt vor, wenn alle Kapitel kurz sind.</div>'; return; }
  var h='<div class="zt-liste">';
  BI.forEach(function(b){
    var vorbei=(ztB.tageSeitGeburt>b.bis);
    h+='<div class="zt-g" style="border-left-color:#A05A3A">'+
      '<span class="wann">'+ztKurz(ztTagVon(b.von))+'<br><i>Alter '+
        Math.floor(ztAlterBei(b.von))+'</i></span>'+
      '<span class="was"><b>in '+ZT_KAPITEL[b.zeichen].n+'</b>'+
      '<span>'+ZT_SCHNITT.beispiele[ztBereich]+'</span></span>'+
      '<span class="mk'+(vorbei?'':' jetzt')+'">'+(vorbei?'war':'kommt')+'</span></div>';
  });
  h+='</div><div class="zt-detail" style="border-left-color:#A05A3A;margin-top:14px">'+
     '<p style="margin:0">'+ZT_SCHNITT.was+'</p>'+
     '<div class="tun" style="margin-top:11px"><b>Dazu</b>'+ZT_SCHNITT.tun+'</div>'+
     '<p class="ac-tech" data-ab="2" style="margin:10px 0 0;font-size:13px;color:#6B6259">'+
     'Klassisch hei&szlig;t das die <i>'+ZT_SCHNITT.klassisch+'</i>.</p></div>';
  box.innerHTML=h;
}

/* ── G · Tabelle ────────────────────────────────────────────── */
function ztTabelleBauen(){
  var box=ztEl('zttabelle'), f=ztSpur();
  if(!ztB||!f){ box.innerHTML='<div class="zt-leer">Ohne Profil keine Tabelle.</div>'; return; }
  var h='<table><thead><tr><th>Abschnitt</th><th>Von</th><th>Bis</th><th>Alter</th>'+
    '<th>Lautst&auml;rke</th></tr></thead><tbody>';
  f.abschnitte.forEach(function(a){
    if(ztAlterBei(a.von)>95) return;
    var st=ZT_STUFE[ztStufe(a.vonGlueck)];
    var jetzt=(ztB.tageSeitGeburt>=a.von && ztB.tageSeitGeburt<a.bis);
    h+='<tr class="'+(jetzt?'ist':'')+'"><td><span class="pz" style="background:'+st.farbe+
      '"></span><b>'+ZT_KAPITEL[a.zeichen].n+'</b></td>'+
      '<td>'+ztKurz(ztTagVon(a.von))+'</td><td>'+ztKurz(ztTagVon(a.bis))+'</td>'+
      '<td>'+Math.floor(ztAlterBei(a.von))+'&ndash;'+Math.floor(ztAlterBei(a.bis))+'</td>'+
      '<td>'+st.n+'</td></tr>';
    a.unter.forEach(function(u){
      if(ztAlterBei(u.von)>95) return;
      var us=ZT_STUFE[ztStufe(u.vonGlueck)];
      var j2=(ztB.tageSeitGeburt>=u.von && ztB.tageSeitGeburt<u.bis);
      h+='<tr class="l2'+(j2?' ist':'')+'"><td><span class="pz" style="background:'+us.farbe+
        '"></span>'+ZT_KAPITEL[u.zeichen].n+
        (u.bindung?' <span class="bd">gro&szlig;er Schnitt</span>':'')+'</td>'+
        '<td>'+ztKurz(ztTagVon(u.von))+'</td><td>'+ztKurz(ztTagVon(u.bis))+'</td>'+
        '<td>'+Math.floor(ztAlterBei(u.von))+'</td><td>'+us.kurz+'</td></tr>';
    });
  });
  box.innerHTML='<div class="zt-tab">'+h+'</tbody></table></div>';
}

/* ── H · Jahresthema und Planetenabschnitte ─────────────────── */
function ztWeitereBauen(){
  var box=ztEl('ztweitere');
  if(!ztB){ box.innerHTML='<div class="zt-leer">Ohne Profil nicht zu rechnen.</div>'; return; }
  var P=ztB.profektion, PT=ZT_PROFEKTION[P.haus-1], F=ztB.firdariaJetzt;
  var h='<div class="zt-jetzt">';
  h+='<div class="zt-j" style="border-top-color:#3D6B62">'+
    '<div class="lab">'+ztWorte('Das [[Jahresthema]]')+'</div>'+
    '<h3>'+PT.n+'</h3>'+
    '<div class="wann">Dein '+(P.alter+1)+'. Lebensjahr &middot; '+P.haus+'. Haus'+
      '<span class="ac-tech" data-ab="2"> &middot; '+P.zeichenName+' &middot; Jahresherr '+
      P.herr+'</span></div>'+
    '<p>'+PT.t+'</p>'+
    '<p class="ac-tech" data-ab="2" style="font-size:13.6px;color:#6B6259;margin:0">Der '+
      'Jahresherr <b>'+P.herr+'</b> f&uuml;hrt dieses Jahr. Wo er in deinem Chart steht und wie '+
      'es ihm dort geht, f&auml;rbt das ganze Jahr ein.</p></div>';
  h+='<div class="zt-j" style="border-top-color:#6A4A62">'+
    '<div class="lab">'+ztWorte('Dein [[Planetenabschnitt]]')+'</div>'+
    (F?'<h3>'+F.haupt.herr+'</h3>'+
       '<div class="wann">Alter '+ztKZ(F.haupt.von)+' bis '+ztKZ(F.haupt.bis)+
       (F.unter?' &middot; darin '+F.unter.herr:'')+'</div>'+
       '<p>'+(ZT_FIRDARIA[F.haupt.herr]||{t:''}).t+'</p>'+
       (F.unter&&F.unter.herr!==F.haupt.herr
         ? '<div class="unter"><b>Darin: '+F.unter.herr+'</b><p style="margin:0">'+
           (ZT_FIRDARIA[F.unter.herr]||{t:''}).t+'</p></div>' : '')
      :'<h3>Reihe durchlaufen</h3><p>Dieses Verfahren deckt 75 Jahre ab. Danach sind sich die '+
       'Quellen uneins, ob es von vorn beginnt oder endet &mdash; die Seite rechnet es nicht '+
       'weiter, statt sich auf eine Lesart festzulegen.</p>')+
    '<p class="ac-tech" data-ab="2" style="margin:10px 0 0;font-size:13px;color:#6B6259">'+
      'Klassisch: Firdaria, Reihenfolge nach '+(ztB.lose.tag?'Tag':'Nacht')+'geburt.</p></div>';
  box.innerHTML=h+'</div>';
  ztWortWirken(box);
}

/* ── Bericht ────────────────────────────────────────────────── */
function ztBericht(){
  if(!ztB) return 'Kein Profil aktiv.';
  var p=ztAktiv(), L=[];
  function roh(s){ return String(s).replace(/<[^>]+>/g,'').replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,
    function(m,w,t){ return t||w; }); }
  L.push('WANN BEI DIR WAS LOS IST — ' + ztName(p));
  L.push('Stichtag ' + ztKurz(ztB.jetzt) + ' · Alter ' + ztB.alter);
  L.push('');
  ZT_BEREICH.forEach(function(B){
    var f=ztB.spuren[B.k]; if(!f) return;
    var J=AC_ZEIT.jetzt(f, ztB.tageSeitGeburt);
    L.push(B.n.toUpperCase());
    if(J.l1){
      var K=ZT_KAPITEL[J.l1.zeichen], st=ZT_STUFE[ztStufe(J.l1.vonGlueck)];
      L.push('  Jetzt: ' + st.n + ' — ' + st.satz);
      L.push('  Kapitel ' + K.n + ' (' + K.bild + '), ' +
             ztKurz(ztTagVon(J.l1.von)) + ' bis ' + ztKurz(ztTagVon(J.l1.bis)));
      L.push('  ' + roh(K[B.k].t));
      L.push('  Handgriff: ' + roh(K[B.k].tun));
    }
    var G=AC_ZEIT.naechsteGipfel(f, ztB.tageSeitGeburt, 4);
    if(G.length){
      L.push('  Nächste laute Zeiten:');
      G.forEach(function(g){
        L.push('    ' + ztKurz(ztTagVon(g.von)) + ' – ' + ztKurz(ztTagVon(g.bis)) + '  ' +
               ZT_KAPITEL[g.zeichen].n + (g.laeuft?'  (läuft jetzt)':''));
      });
    }
    var BI=AC_ZEIT.bindungen(f).filter(function(x){ return ztAlterBei(x.von)<=95; });
    if(BI.length){
      L.push('  Große Schnitte:');
      BI.forEach(function(b){
        L.push('    ' + ztKurz(ztTagVon(b.von)) + '  Alter ' + Math.floor(ztAlterBei(b.von)));
      });
    }
    L.push('');
  });
  var P=ztB.profektion, PT=ZT_PROFEKTION[P.haus-1];
  L.push('JAHRESTHEMA');
  L.push('  ' + PT.n + ' (' + P.haus + '. Haus) · Jahresherr ' + P.herr);
  L.push('  ' + PT.t);
  L.push('');
  if(ztB.firdariaJetzt){
    L.push('PLANETENABSCHNITT');
    L.push('  ' + ztB.firdariaJetzt.haupt.herr +
           (ztB.firdariaJetzt.unter?' / ' + ztB.firdariaJetzt.unter.herr:''));
    L.push('  ' + (ZT_FIRDARIA[ztB.firdariaJetzt.haupt.herr]||{t:''}).t);
    L.push('');
  }
  L.push('GRENZEN');
  L.push('  Laut heißt: es passiert viel. Nicht: es wird gut.');
  L.push('  Ein Drittel aller Abschnitte ist rechnerisch laut.');
  L.push('  Das Verfahren ist nicht überprüft. Prüf es rückwärts am eigenen Leben.');
  L.push('  Alles hängt am Aszendenten — eine ungenaue Geburtszeit verschiebt alles.');
  return L.join('\n').replace(/&auml;/g,'ä').replace(/&ouml;/g,'ö').replace(/&uuml;/g,'ü')
          .replace(/&szlig;/g,'ß').replace(/&middot;/g,'·').replace(/&ndash;/g,'–')
          .replace(/&mdash;/g,'—').replace(/&nbsp;/g,' ').replace(/&shy;/g,'');
}

/* ── Zusammensetzen ─────────────────────────────────────────── */
function ztAlles(){
  var p=ztAktiv();
  ztB=null; ztWortNr=0;
  if(p && p.h!==undefined && p.lat!==undefined){
    try{
      var C=chartVon(p);
      ztJD=ztJDVon(p);
      ztB=AC_ZEIT.blatt(C, ztJD, {y:p.y, mo:p.mo, d:p.d}, ztStichtag||new Date(),
                        ztVariante==='alt'?'alt':'paulus');
    }catch(e){ ztB=null; }
  }
  ztPersonenBauen(); ztVarianteBauen();
  ztAntwortBauen(); ztSchritteBauen(); ztBereicheBauen();
  ztLinieBauen(); ztAlleBauen(); ztDetailBauen();
  ztGipfelBauen(); ztSchnitteBauen(); ztTabelleBauen(); ztWeitereBauen();
  var w=ztEl('ztzeitwarnung');
  if(w && p){
    w.innerHTML='Alle Startpunkte h&auml;ngen am '+ztW('Aszendent','Aszendenten')+', und der '+
      'wandert in vier Minuten um ein Grad. F&uuml;r dieses Profil ist '+
      ('0'+p.h).slice(-2)+':'+('0'+p.mi).slice(-2)+' hinterlegt. Ist die Zeit gesch&auml;tzt, '+
      'lies die Jahreszahlen als ungef&auml;hr und pr&uuml;f sie an Ereignissen nach, die du kennst.';
    ztWortWirken(w.parentNode);
  }
  /* Einmal am Ende über die ganze Seite — sonst wird ein Block vergessen */
  ztWortWirken(document);
  try{ if(window.AC_NIV) AC_NIV.anwenden(); }catch(e){}
}

function ztStart(){
  ztStichtag=new Date();
  ztEl('ztdatum').value=ztISO(ztStichtag);
  ztAlles();
  ztEl('ztdatum').addEventListener('change',function(){
    var v=ztEl('ztdatum').value; if(!v) return;
    var t=v.split('-');
    ztStichtag=new Date(+t[0], +t[1]-1, +t[2]); ztOffen=null; ztAlles();
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
