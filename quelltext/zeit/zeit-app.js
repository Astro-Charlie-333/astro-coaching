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
  if(jahre < 1){
    var m=Math.max(1, Math.round(jahre*12));
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

/* ── Zeichnen ───────────────────────────────────────────────── */
function ztN(t,a,txt){ var e=document.createElementNS(ZT_NSU,t);
  for(var k in a) e.setAttribute(k,a[k]);
  if(txt!==undefined) e.textContent=txt; return e; }

/* ── Die vier Schritte, mit Bildern aus dem eigenen Chart ───── */
var ZT_JAHR=365.2422;
function ztBildKapitel(){
  var f=ztSpur('arbeit'); if(!f) return '';
  var W=1000, H=58, maxJ=90;
  var svg=ztN('svg',{viewBox:'0 0 '+W+' '+H, class:'zt-mini-svg', role:'img',
    'aria-label':'Ein Lebensstrahl, in Kapitel geteilt'});
  f.abschnitte.forEach(function(a){
    if(ztAlterBei(a.von)>maxJ) return;
    var x0=(ztAlterBei(a.von)/maxJ)*W, x1=(Math.min(ztAlterBei(a.bis),maxJ)/maxJ)*W;
    svg.appendChild(ztN('rect',{x:x0.toFixed(1), y:'8', width:Math.max(1,x1-x0-2).toFixed(1),
      height:'30', rx:'4', fill:'#DDD0BC'}));
    if(x1-x0>86) svg.appendChild(ztN('text',{x:(x0+8).toFixed(1), y:'28',
      class:'zt-mini-t'}, ZT_KAPITEL[a.zeichen].n));
    svg.appendChild(ztN('text',{x:x0.toFixed(1), y:'52', class:'zt-mini-a'},
      String(Math.round(ztAlterBei(a.von)))));
  });
  return svg.outerHTML;
}
function ztBildLaengen(){
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
function ztBildPunkt(){
  if(!ztB) return '';
  var gz=AC_ZEIT.zi(ztB.lose.glueck), W=1000, H=66;
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
function ztBildFuenf(){
  if(!ztB) return '';
  var W=1000, zeile=22, maxJ=90, L=120, H=ZT_BEREICH.length*zeile+16;
  var svg=ztN('svg',{viewBox:'0 0 '+W+' '+H, class:'zt-mini-svg', role:'img',
    'aria-label':'Fünf Bereiche mit verschiedenen lauten Zeiten'});
  ZT_BEREICH.forEach(function(B,n){
    var f=ztSpur(B.k), y=n*zeile+4;
    svg.appendChild(ztN('text',{x:'0', y:String(y+13), class:'zt-mini-t'}, B.kurz));
    if(!f) return;
    f.abschnitte.forEach(function(a){
      if(ztAlterBei(a.von)>maxJ) return;
      var x0=L+(ztAlterBei(a.von)/maxJ)*(W-L),
          x1=L+(Math.min(ztAlterBei(a.bis),maxJ)/maxJ)*(W-L);
      svg.appendChild(ztN('rect',{x:x0.toFixed(1), y:String(y),
        width:Math.max(1,x1-x0-1).toFixed(1), height:'15', rx:'3',
        fill:ZT_STUFE[ztStufe(a.vonGlueck)].farbe}));
    });
  });
  var alter=ztAlterBei(ztB.tageSeitGeburt);
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

/* ── A · Wo du gerade stehst ────────────────────────────────
   Das Kapitel steht vorn. Der Unterabschnitt darin kann eine andere
   Lautstärke haben — beides gilt, und beides wird gezeigt. Vorher
   stand hier nur der Unterabschnitt, und ein zwanzig Jahre langes
   lautes Kapitel fiel damit unter den Tisch.                       */
function ztLage(k){
  var f=ztSpur(k); if(!f) return null;
  if(!ztB || ztB.tageSeitGeburt<0) return null;
  var J=AC_ZEIT.jetzt(f, ztB.tageSeitGeburt);
  if(!J.l1) return null;
  var s1=ztStufe(J.l1.vonGlueck), s2=J.l2?ztStufe(J.l2.vonGlueck):s1;
  return {l1:J.l1, l2:J.l2, stufe:s1, S:ZT_STUFE[s1],
          stufe2:s2, S2:ZT_STUFE[s2], anders:(s1!==s2),
          k1:ZT_KAPITEL[J.l1.zeichen], k2:J.l2?ZT_KAPITEL[J.l2.zeichen]:null};
}

function ztJetztBauen(){
  var box=ztEl('ztjetzt');
  if(!ztB){ box.innerHTML='<div class="zt-leer">Ohne Profil mit Geburtszeit l&auml;sst sich '+
    'nichts rechnen. <a href="profile.html">Profil anlegen</a>.</div>'; return; }
  if(ztB.tageSeitGeburt < 0){
    box.innerHTML='<div class="zt-leer"><b>Der Stichtag liegt vor der Geburt.</b> '+
      'Die Reihe f&auml;ngt mit dem ersten Lebenstag an. Stell den Tag weiter nach hinten.</div>';
    return; }
  if(ztB.tageSeitGeburt > 100*360){
    box.innerHTML='<div class="zt-leer"><b>Der Stichtag liegt zu weit in der Zukunft.</b> '+
      'Die Seite rechnet hundert Jahre ab Geburt.</div>'; return; }

  var h='<div class="zt-tafel">';
  ZT_BEREICH.forEach(function(B){
    var L=ztLage(B.k);
    if(!L){ h+='<div class="zt-zl"><span class="zb">'+B.n+'</span>'+
      '<span class="zs" style="background:#DDD0BC;color:#231F1A">–</span>'+
      '<span class="zk">F&uuml;r diesen Bereich fehlt ein Planet im Chart.</span></div>'; return; }
    var offen=(ztOffen && ztOffen.b===B.k);
    h+='<button type="button" class="zt-zl'+(offen?' ist':'')+'" data-b="'+B.k+
      '" data-von="'+L.l1.von+'">'+
      '<span class="zb">'+B.n+'</span>'+
      '<span class="zs" style="background:'+L.S.farbe+'">'+L.S.kurz+'</span>'+
      '<span class="zk"><b>'+L.k1.n+'</b> &mdash; '+L.k1.bild+
        '<i>noch '+ztLang((L.l1.bis-ztB.tageSeitGeburt)/360)+
        ' &middot; bis '+ztJahrMon(ztTagVon(L.l1.bis))+'</i></span>'+
      (L.k2?'<span class="zu">darin gerade <b>'+L.k2.n+'</b>, '+
        '<em style="color:'+L.S2.farbe+'">'+L.S2.kurz+'</em>, bis '+
        ztJahrMon(ztTagVon(L.l2.bis))+

        '</span>':'')+
      '</button>';
  });
  h+='</div>';
  box.innerHTML=h;
  Array.prototype.forEach.call(box.querySelectorAll('button[data-b]'),function(b){
    b.addEventListener('click',function(){
      ztOeffnen(b.getAttribute('data-b'), +b.getAttribute('data-von')); });
  });
}

/* Womit gerechnet wird — damit ein falsches Profil auffällt */
function ztDatenBauen(){
  var box=ztEl('ztdaten'), p=ztAktiv();
  if(!p){ box.innerHTML=''; return; }
  var vz=(p.tz>=0?'+':'')+ztKZ(p.tz);
  var sommer=(p.mo>3 && p.mo<10) || (p.mo===3 && p.d>=25) || (p.mo===10 && p.d<=25);
  box.innerHTML='<span class="zt-daten">'+
    ('0'+p.d).slice(-2)+'.'+('0'+p.mo).slice(-2)+'.'+p.y+' &middot; '+
    ('0'+p.h).slice(-2)+':'+('0'+p.mi).slice(-2)+' Uhr &middot; '+
    ztEsc(p.ort||'Ort nicht hinterlegt')+' &middot; UTC'+vz+'</span>'+
    '<p class="zt-hint" style="margin-top:6px"><b>Stimmt das?</b> Die ganze Seite h&auml;ngt '+
    'daran. '+(sommer
      ? 'Dieses Datum liegt in der Sommerzeit &mdash; dann muss hier bei Mitteleuropa '+
        '<b>UTC+2</b> stehen, nicht +1. '
      : '')+
    'Wenn etwas nicht stimmt, &auml;nder es bei den <a href="profile.html">Profilen</a> &mdash; '+
    'eine Stunde Unterschied verschiebt alle Jahreszahlen hier erheblich.</p>';
}

/* ── B · Was als Nächstes kommt ─────────────────────────────
   Alle fünf Bereiche in einer Liste. Ein Ereignis ist: ein neues
   Kapitel, ein Wechsel der Lautstärke, oder ein großer Schnitt.   */
function ztEreignisse(abTagen, anzahl){
  var out=[];
  ZT_BEREICH.forEach(function(B){
    var f=ztB.spuren[B.k]; if(!f) return;
    var vor=null, kapitelAb={};
    f.abschnitte.forEach(function(a){
      if(ztAlterBei(a.von)>95) return;
      if(a.von>abTagen){
        kapitelAb[a.von]=true;
        out.push({t:a.von, b:B, art:'kapitel', zeichen:a.zeichen,
                  stufe:ztStufe(a.vonGlueck), abschnitt:a});
      }
      a.unter.forEach(function(u){
        var st=ztStufe(u.vonGlueck);
        if(u.von>abTagen && vor!==null && st!==vor && !kapitelAb[u.von])
          out.push({t:u.von, b:B, art:'wechsel', zeichen:u.zeichen, stufe:st,
                    vorher:vor, abschnitt:a, unter:u});
        vor=st;
        if(u.bindung && u.von>abTagen)
          out.push({t:u.von, b:B, art:'schnitt', zeichen:u.zeichen, stufe:st, abschnitt:a});
      });
    });
  });
  out.sort(function(x,y){ return x.t-y.t; });
  return anzahl?out.slice(0,anzahl):out;
}
function ztEreignisText(e){
  var S=ZT_STUFE[e.stufe], Z=ZT_KAPITEL[e.zeichen];
  if(e.art==='schnitt')
    return {t:'<b>Gro&szlig;er Schnitt bei '+e.b.kurz+'</b>',
            u:ZT_SCHNITT.beispiele[e.b.k], farbe:'#A05A3A'};
  if(e.art==='kapitel')
    return {t:'<b>'+e.b.kurz+':</b> neues Kapitel <b>'+Z.n+'</b> &mdash; '+
              (e.stufe==='winkel'?'und es wird <b>laut</b>':
               e.stufe==='folgend'?'mittlere Lautst&auml;rke':'und es wird <b>leise</b>'),
            u:'F&uuml;r die n&auml;chsten '+e.abschnitt.jahre+' Jahre. '+
              ztSatz1(Z[e.b.k].t, 120), farbe:S.farbe};
  var rauf=(ZT_STUFE[e.stufe].rang > ZT_STUFE[e.vorher].rang);
  var bis=e.unter?(' und h&auml;lt bis '+ztJahrMon(ztTagVon(e.unter.bis))):'';
  var folge={winkel:'Ab hier passiert hier wieder mehr',
             folgend:'Ab hier l&auml;uft es ruhiger weiter',
             fallend:'Ab hier wird es still'}[e.stufe];
  return {t:'<b>'+e.b.kurz+'</b> wird '+(rauf?'<b>lauter</b>':'<b>ruhiger</b>')+
            ' &mdash; dann '+S.kurz,
          u:folge+bis+'. Der Abschnitt tr&auml;gt das Zeichen '+Z.n+'.',
          farbe:S.farbe};
}
function ztNaechstBauen(){
  var box=ztEl('ztnaechst');
  if(!ztB || ztB.tageSeitGeburt<0){ box.innerHTML=
    '<div class="zt-leer">Erst ein Profil und ein Stichtag.</div>'; return; }
  var E=ztEreignisse(ztB.tageSeitGeburt, 9);
  if(!E.length){ box.innerHTML='<div class="zt-leer">In den n&auml;chsten Jahrzehnten '+
    '&auml;ndert sich in keinem Bereich etwas.</div>'; return; }
  var h='<ol class="zt-ereignisse">';
  E.forEach(function(e){
    var T=ztEreignisText(e), d=ztTagVon(e.t);
    h+='<li style="--farbe:'+T.farbe+'">'+
      '<span class="ed"><b>'+ztJahrMon(d)+'</b><i>in '+
        ztDauer((e.t-ztB.tageSeitGeburt)/365.2422)+'</i></span>'+
      '<span class="et">'+T.t+'<i>'+T.u+'</i></span></li>';
  });
  box.innerHTML=h+'</ol>';
}

/* ── C · Die Lebenslinie: alle fünf Bereiche in einem Bild ─── */
function ztLinieBauen(){
  var box=ztEl('ztlinie');
  if(!ztB){ box.innerHTML='<div class="zt-leer">Keine Linie ohne Profil.</div>';
    ztEl('ztlegende').innerHTML=''; return; }
  var JAHR=365.2422;
  var alterJetzt=Math.max(0, ztB.tageSeitGeburt/JAHR);
  var maxJ=Math.max(90, Math.ceil((alterJetzt+20)/10)*10);
  var W=1000, L=128, R=14, zeile=40, oben=22, ay=ZT_BEREICH.length*zeile+oben+8;
  var H=ay+24;
  /* Gezeichnet wird über echte Jahre, damit die Achse stimmt */
  function x(tage){ return L+((tage/JAHR)/maxJ)*(W-L-R); }
  var svg=ztN('svg',{viewBox:'0 0 '+W+' '+H, class:'zt-linie', role:'img',
    'aria-label':'Alle fünf Lebensbereiche über das ganze Leben'});

  ZT_BEREICH.forEach(function(B,n){
    var f=ztSpur(B.k), y=n*zeile+oben;
    svg.appendChild(ztN('text',{x:'4', y:String(y+19), class:'zt-zt'}, B.kurz));
    if(!f) return;
    f.abschnitte.forEach(function(a){
      if(ztAlterBei(a.von)>maxJ) return;
      var x0=x(a.von), x1=x(Math.min(a.bis, maxJ*JAHR)), br=x1-x0;
      if(br<=0.5) return;
      var st=ZT_STUFE[ztStufe(a.vonGlueck)];
      var g=ztN('g',{class:'zt-band'+((ztOffen&&ztOffen.b===B.k&&ztOffen.von===a.von)?' ist':''),
        tabindex:'0', role:'button',
        'aria-label':B.n+': '+ZT_KAPITEL[a.zeichen].n+', '+st.n});
      g.setAttribute('data-b', B.k); g.setAttribute('data-von', String(a.von));
      g.appendChild(ztN('rect',{x:x0.toFixed(1), y:String(y), width:br.toFixed(1),
        height:'26', rx:'4', fill:st.farbe, class:'haupt'}));
      if(br>=78) g.appendChild(ztN('text',{x:(x0+7).toFixed(1), y:String(y+18),
        class:'zt-bt'}, ZT_KAPITEL[a.zeichen].n));
      else if(br>=14) g.appendChild(ztN('text',{x:(x0+br/2).toFixed(1), y:String(y+19),
        'text-anchor':'middle', class:'zt-bt zt-gly'}, ZT_GLYPHE[a.zeichen]));
      /* laute Unterabschnitte als Streifen darunter */
      g.appendChild(ztN('rect',{x:x0.toFixed(1), y:String(y+27), width:br.toFixed(1),
        height:'6', rx:'2', fill:'#EBE1D2'}));
      a.unter.forEach(function(u){
        if(ztAlterBei(u.von)>maxJ) return;
        if(ztStufe(u.vonGlueck)==='winkel'){
          var u0=x(u.von), u1=x(Math.min(u.bis, maxJ*JAHR));
          g.appendChild(ztN('rect',{x:u0.toFixed(1), y:String(y+27),
            width:Math.max(0.8,u1-u0).toFixed(1), height:'6', fill:ZT_STUFE.winkel.farbe}));
        }
        if(u.bindung && ztAlterBei(u.von)<=maxJ)
          g.appendChild(ztN('path',{d:'M'+x(u.von).toFixed(1)+','+(y-3)+
            ' l4,5 l-4,5 l-4,-5 Z', fill:'#A05A3A'}));
      });
      svg.appendChild(g);
    });
  });

  /* Achse in echten Lebensjahren */
  svg.appendChild(ztN('line',{x1:String(L), y1:String(ay), x2:String(W-R), y2:String(ay),
    stroke:'#DDD0BC','stroke-width':'1'}));
  for(var j=0;j<=maxJ;j+=10){
    var px=x(j*JAHR);
    svg.appendChild(ztN('line',{x1:px.toFixed(1), y1:String(ay), x2:px.toFixed(1),
      y2:String(ay+4), stroke:'#DDD0BC','stroke-width':'1'}));
    svg.appendChild(ztN('text',{x:px.toFixed(1), y:String(ay+17), 'text-anchor':'middle',
      class:'zt-achse'}, j===0?'Geburt':String(j)));
  }
  svg.appendChild(ztN('text',{x:'4', y:String(ay+17), class:'zt-achse'}, 'Alter'));

  if(alterJetzt<=maxJ && ztB.tageSeitGeburt>=0){
    var hx=x(ztB.tageSeitGeburt);
    var gh=ztN('g',{class:'zt-heute'});
    gh.appendChild(ztN('line',{x1:hx.toFixed(1), y1:'14', x2:hx.toFixed(1), y2:String(ay)}));
    gh.appendChild(ztN('text',{x:(hx+5).toFixed(1), y:'10'},
      'du bist hier · ' + Math.floor(ztB.alter)));
    svg.appendChild(gh);
  }
  box.innerHTML=''; box.appendChild(svg);
  Array.prototype.forEach.call(svg.querySelectorAll('.zt-band'),function(g){
    function auf(){ ztOeffnen(g.getAttribute('data-b'), +g.getAttribute('data-von')); }
    g.addEventListener('click',auf);
    g.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){ e.preventDefault(); auf(); } });
  });
  ztEl('ztlegende').innerHTML=['winkel','folgend','fallend'].map(function(k){
    return '<span><i style="background:'+ZT_STUFE[k].farbe+'"></i><b>'+ZT_STUFE[k].n+
      '</b> &mdash; '+ZT_STUFE[k].satz+'</span>'; }).join('')+
    '<span><i class="raute"></i><b>Gro&szlig;er Schnitt</b></span>';
}

function ztOeffnen(bereich, von){
  if(ztOffen && ztOffen.b===bereich && ztOffen.von===von) ztOffen=null;
  else ztOffen={b:bereich, von:von};
  ztJetztBauen(); ztLinieBauen(); ztDetailBauen();
  var d=ztEl('ztdetail');
  if(ztOffen && d && d.scrollIntoView) d.scrollIntoView({behavior:'smooth', block:'nearest'});
}
function ztDetailBauen(){
  var box=ztEl('ztdetail');
  if(!ztOffen || !ztB){ box.innerHTML=''; return; }
  var f=ztB.spuren[ztOffen.b], a=null;
  if(f) f.abschnitte.forEach(function(x){ if(x.von===ztOffen.von) a=x; });
  if(!a){ box.innerHTML=''; return; }
  var B=null; ZT_BEREICH.forEach(function(x){ if(x.k===ztOffen.b) B=x; });
  var K=ZT_KAPITEL[a.zeichen], S=ZT_STUFE[ztStufe(a.vonGlueck)];
  var laeuft=(ztB.tageSeitGeburt>=a.von && ztB.tageSeitGeburt<a.bis);
  var h='<div class="zt-detail" style="border-left-color:'+S.farbe+'">'+
    '<div class="zt-dkopf"><h3>'+B.kurz+' &middot; '+K.n+'</h3>'+
    '<span class="zt-stufe" style="background:'+S.farbe+'">'+S.n+'</span>'+
    (laeuft?'<span class="zt-stufe" style="background:#A05A3A">l&auml;uft gerade</span>':'')+'</div>'+
    '<div class="wann">'+ztDatumText(ztTagVon(a.von))+' bis '+ztDatumText(ztTagVon(a.bis))+
      ' &middot; dein Alter '+Math.floor(ztAlterBei(a.von))+' bis '+
      Math.floor(ztAlterBei(a.bis))+' &middot; '+a.jahre+' Kapiteljahre</div>'+
    '<p>'+K[ztOffen.b].t+'</p>'+
    '<div class="tun"><b>Ein Handgriff</b>'+K[ztOffen.b].tun+'</div>'+
    '<p style="margin-top:12px">'+ztWorte(S.was)+'</p>'+
    '<p class="ac-tech" data-ab="2" style="font-size:13px;color:#6B6259">'+S.woher+'</p>'+
    '<div class="zt-tab" style="margin-top:14px"><table><thead><tr>'+
    '<th>Abschnitt darin</th><th>Von</th><th>Bis</th><th>Lautst&auml;rke</th>'+
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
  h+='</tbody></table></div>'+
     '<p class="ac-tech" data-ab="3" style="margin-top:12px;font-size:12.5px;color:#6B6259">'+
     'Zeichen '+K.n+', '+a.jahre+' allgemeine Jahre, Herr '+a.herr+' &middot; '+
     a.vonGlueck+'. Zeichen vom Gl&uuml;ckspunkt aus.</p></div>';
  box.innerHTML=h;
  ztWortWirken(box);
  try{ if(window.AC_NIV) AC_NIV.anwenden(); }catch(e){}
}

/* ── Mehr dazu: Tabelle je Bereich ──────────────────────────── */
function ztWelcheBauen(){
  var box=ztEl('ztwelche');
  box.innerHTML=ZT_BEREICH.map(function(B){
    return '<button type="button" class="zt-knopf'+(B.k===ztBereich?' ist':'')+
      '" data-w="'+B.k+'">'+B.kurz+'</button>'; }).join('');
  Array.prototype.forEach.call(box.querySelectorAll('button[data-w]'),function(b){
    b.addEventListener('click',function(){ ztBereich=b.getAttribute('data-w');
      ztWelcheBauen(); ztTabelleBauen(); });
  });
}
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
  ztEl('ztjetzt-u').innerHTML=ztWorte('Fünf Bereiche, fünf Zeilen. Jede zeigt dein '+
    'gerade laufendes [[Kapitel]] und darunter den [[Unterabschnitt]], der gerade darin '+
    'läuft. [[Hochphase|Laut]] heißt: Da passiert viel — nicht automatisch Gutes. '+
    'Tipp eine Zeile an für das Ganze.');
  ztEl('ztnaechst-u').innerHTML=ztWorte('Alle fünf Bereiche in einer Liste, nach Datum '+
    'sortiert. Das hier ist die Antwort auf „wann kommen die [[Hochphase|Hochphasen]]".');
  ztEl('ztlinie-u').innerHTML=ztWorte('Jede Zeile ein Bereich, jeder Balken ein [[Kapitel]]. '+
    '<b>Gold</b> ist laut, <b>grün</b> mittel, <b>grau</b> leise. Der schmale Streifen unter '+
    'jedem Balken zeigt die lauten [[Unterabschnitt|Unterabschnitte]] darin, die Rauten den '+
    '[[Der große Schnitt|großen Schnitt]]. Die senkrechte Linie bist du heute.');
  ztPersonenBauen(); ztVarianteBauen(); ztDatenBauen();
  ztJetztBauen(); ztDetailBauen(); ztNaechstBauen(); ztLinieBauen();
  ztSchritteBauen(); ztWelcheBauen(); ztTabelleBauen(); ztWeitereBauen();
  var w=ztEl('ztzeitwarnung');
  if(w && p){
    w.innerHTML='Alle Startpunkte h&auml;ngen am '+ztW('Aszendent','Aszendenten')+', und der '+
      'wandert in vier Minuten um ein Grad. Eine Stunde Unterschied verschiebt die Punkte um '+
      'bis zu ein halbes Zeichen &mdash; und damit die ganze Reihe. Was oben unter '+
      '„Gerechnet mit" steht, sollte stimmen.';
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
