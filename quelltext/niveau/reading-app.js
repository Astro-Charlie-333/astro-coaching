/* ── Reading in der Sprache der Empfängerin ──────────── */
function nrm(x){x=x%360;return x<0?x+360:x;}
function el(i){ return document.getElementById(i); }
function esc(s){ return String(s===undefined||s===null?'':s).replace(/[<>&"]/g,function(c){
 return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }
function gross(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

var W=window.AC_WORT;
var ZN=W.ZEICHEN.map(function(z){return z.n;});
var MODUS=['kardinal','fix','beweglich'];
var ELE=['Feuer','Erde','Luft','Wasser'];
var GEW={Sonne:3,Mond:3,Merkur:2,Venus:2,Mars:2,Jupiter:1.5,Saturn:1.5};
var HAUPT=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn'];
var SIGNS_TXT={Sonne:R_SONNE,Mond:R_MOND,Merkur:R_MERKUR,Venus:R_VENUS,Mars:R_MARS};

var gewaehlt=null, stufe=2;

function chartVon(p){
  var ut=p.h+p.mi/60-p.tz,y=p.y,mo=p.mo,d=p.d;
  if(ut<0){ut+=24;d-=1;} if(ut>=24){ut-=24;d+=1;}
  var jd=jdFromUT(y,mo,d,ut),T=(jd-2451545)/36525,a=angles(jd,p.lat,p.lon);
  return {Sonne:sunLon(T),Mond:moonLon(T),Merkur:geo('Merkur',T),Venus:geo('Venus',T),
   Mars:geo('Mars',T),Jupiter:geo('Jupiter',T),Saturn:geo('Saturn',T),Uranus:geo('Uranus',T),
   Neptun:geo('Neptun',T),Pluto:geo('Pluto',T),ASC:a.asc,MC:a.mc};
}
function haus(P,l){ return ((Math.floor(l/30)-Math.floor(P.ASC/30))%12+12)%12+1; }
function zi(l){ return Math.floor(nrm(l)/30); }

/* Die stärksten Aspekte im Chart */
var ASPW=[[0,'Konjunktion',8],[60,'Sextil',4],[90,'Quadrat',7],[120,'Trigon',6],[180,'Opposition',7]];
function aspekte(P){
  var out=[], k=HAUPT.concat(['Uranus','Neptun','Pluto']);
  for(var i=0;i<k.length;i++) for(var j=i+1;j<k.length;j++){
    var d=Math.abs(((P[k[i]]-P[k[j]]+540)%360)-180);
    ASPW.forEach(function(a){
      var orb=Math.abs(d-a[0]);
      var max=(a[0]===0||a[0]===180)?8:6;
      if(orb<=max){
        var stark=(max-orb)/max*a[2]*((GEW[k[i]]||1)+(GEW[k[j]]||1))/4;
        out.push({a:k[i],b:k[j],art:a[1],orb:orb,s:stark});
      }
    });
  }
  out.sort(function(x,y){return y.s-x.s;});
  return out;
}
function bilanz(P){
  var e={Feuer:0,Erde:0,Luft:0,Wasser:0}, m={kardinal:0,fix:0,beweglich:0}, g=0;
  HAUPT.concat(['ASC']).forEach(function(k){
    var w=(k==='ASC')?2:(GEW[k]||1), z=zi(P[k]);
    e[ELE[z%4]]+=w; m[MODUS[z%3]]+=w; g+=w;
  });
  return {e:e,m:m,g:g};
}
function haeuserBetont(P){
  var z={};
  HAUPT.forEach(function(k){ var h=haus(P,P[k]); z[h]=(z[h]||0)+1; });
  return Object.keys(z).filter(function(h){return z[h]>=3;})
    .map(function(h){return {h:+h,n:z[h]};}).sort(function(a,b){return b.n-a.n;});
}

/* ── Ein Abschnitt, in der Sprache der Stufe ─────────── */
function abschnitt(titel, kern, technik, n){
  var h='<section class="rd-ab"><h3>'+titel+'</h3>';
  h+='<p>'+kern+'</p>';
  if(technik && n>=2) h+='<p class="rd-tech">'+technik+'</p>';
  h+='</section>';
  return h;
}

function readingBauen(p, n){
  var P=chartVon(p);
  var name=(p.name||'').trim().split(/\s+/)[0]||'du';
  var sz=zi(P.Sonne), mz=zi(P.Mond), az=zi(P.ASC);
  var h='';

  /* Kopf */
  h+='<div class="rd-kopf"><div class="rd-k">Reading für '+esc(name)+'</div>';
  if(n===0){
    h+='<h2>Drei Dinge über dich</h2>'+
      '<p class="rd-ein">Was hier steht, kommt aus dem Himmelsbild von deinem Geburtstag. '+
      'Du musst nichts über Astrologie wissen, um es zu lesen — es steht alles in normalen Worten da. '+
      'Nimm mit, was dich trifft, und lass liegen, was nicht passt.</p>';
  } else if(n===1){
    h+='<h2>Dein Chart in Worten</h2>'+
      '<p class="rd-ein">Ein Geburtschart ist eine Momentaufnahme des Himmels zu deiner Geburt. '+
      'Jeder Planet steht für eine Grundfunktion — die Sonne für deinen Wesenskern, der Mond für dein '+
      'Gefühl, der Aszendent für dein Auftreten. Fachbegriffe stehen in Klammern dabei.</p>';
  } else if(n>=3){
    h+='<h2>'+(n===4?'Chartanalyse':'Dein Chart')+'</h2>'+
      '<p class="rd-ein">Whole Sign, tropisch. '+
      (n===4?'Orbis bis 8° für Konjunktion und Opposition, 6° sonst, nach Gewicht sortiert.':'')+'</p>';
  } else {
    h+='<h2>Dein Chart</h2>'+
      '<p class="rd-ein">Die drei Grundlagen zuerst, danach die einzelnen Funktionen, '+
      'die stärksten Verbindungen und die Gewichtung.</p>';
  }
  h+='</div>';

  /* Die drei Grundlagen */
  var g='';
  if(n===0){
    g='<p><b>'+gross(ZN[sz])+'-Anteil:</b> '+R_SONNE[sz]+'</p>'+
      '<p><b>Dein Gefühl:</b> '+R_MOND[mz]+'</p>'+
      '<p><b>Wie du auf andere wirkst:</b> '+R_ASC[az]+'</p>';
  } else {
    g='<p><b>'+W.pName('Sonne',n)+' in '+ZN[sz]+'</b> — '+R_SONNE[sz]+'</p>'+
      '<p><b>'+W.pName('Mond',n)+' in '+ZN[mz]+'</b> — '+R_MOND[mz]+'</p>'+
      '<p><b>'+W.pName('ASC',n)+' in '+ZN[az]+'</b> — '+R_ASC[az]+'</p>';
  }
  var tech3 = n>=3 ? ('Sonne '+W.grad(P.Sonne)+' · Mond '+W.grad(P.Mond)+' · ASC '+W.grad(P.ASC)+
    ' · MC '+W.grad(P.MC)) : null;
  h+='<section class="rd-ab rd-drei"><h3>'+
     (n<=1?'Die drei wichtigsten Sachen':'Die drei Grundlagen')+'</h3>'+g+
     (tech3?'<p class="rd-tech">'+tech3+'</p>':'')+'</section>';

  /* Die einzelnen Funktionen */
  ['Merkur','Venus','Mars'].forEach(function(k){
    var z=zi(P[k]), hs=haus(P,P[k]);
    var titel = n===0
      ? gross(W.PLANET[k].kurz(0))
      : gross(W.pName(k,n))+' in '+ZN[z];
    var kern=SIGNS_TXT[k][z];
    var ort = n===0
      ? ' Am stärksten zeigt sich das im Bereich <b>'+W.HAUS[hs-1].kurz+'</b>.'
      : ' — im '+hs+'. Haus ('+W.HAUS[hs-1].lang+').';
    h+=abschnitt(titel, kern+ort,
      n>=3?(k+' '+W.grad(P[k])+', '+hs+'. Haus'):null, n);
  });

  /* Was wo besonders betont ist */
  var hb=haeuserBetont(P);
  if(hb.length){
    var b=hb[0];
    h+=abschnitt(n<=1?'Wo bei dir am meisten los ist':'Betonter Lebensbereich',
      (n===0?'Besonders viel spielt sich bei dir im Bereich <b>'+W.HAUS[b.h-1].kurz+'</b> ab — '
            :'Im <b>'+b.h+'. Haus</b> ('+W.HAUS[b.h-1].lang+') stehen bei dir '+b.n+' Planeten — ')+
      'das ist der Teil deines Lebens, der am lautesten mitredet, ob du willst oder nicht.',
      n>=3?('Stellium im '+b.h+'. Haus, '+b.n+' Faktoren.'):null, n);
  }

  /* Die stärksten Verbindungen */
  var as=aspekte(P).slice(0, n<=1?3:(n===2?5:7));
  if(as.length){
    var at='';
    as.forEach(function(x){
      var deut=null;
      try{ deut=window.AC_ASP?AC_ASP.deutung(x.a,x.b,x.art):null; }catch(e){}
      at+='<p>'+W.aspekt(x.a,x.b,x.art,n,x.orb);
      if(deut&&n>=1) at+=' '+(typeof deut==='string'?deut:(deut.text||deut.kern||''));
      at+='</p>';
    });
    h+='<section class="rd-ab"><h3>'+
      (n===0?'Was bei dir zusammenhängt':(n<=2?'Die stärksten Verbindungen':'Aspekte, nach Gewicht'))+
      '</h3>'+
      (n===0?'<p class="rd-vor">Manche Anteile von dir arbeiten zusammen, andere reiben sich. Das sind die auffälligsten:</p>':'')+
      at+'</section>';
  }

  /* Element- und Modusmischung */
  var bi=bilanz(P);
  var stark=Object.keys(bi.e).sort(function(a,b){return bi.e[b]-bi.e[a];})[0];
  var fehlt=Object.keys(bi.e).filter(function(k){return bi.e[k]<=1;});
  var mstark=Object.keys(bi.m).sort(function(a,b){return bi.m[b]-bi.m[a];})[0];
  var bt='<p><b>'+(n===0?'Dein Grundton':'Betont: '+R_ELEMENT[stark][0])+'</b> — '+R_ELEMENT[stark][1]+'</p>';
  if(fehlt.length) bt+='<p><b>'+(n===0?'Was dir weniger liegt':'Schwach: '+fehlt.join(' und '))+'</b> — '+
    R_ELEMENT_FEHLT[fehlt[0]]+'</p>';
  bt+='<p><b>'+(n===0?'Dein Tempo':'Modus: '+mstark)+'</b> — '+R_MODUS[mstark][1]+'</p>';
  if(n>=3){
    bt+='<p class="rd-tech">'+ELE.map(function(k){return k+' '+bi.e[k].toFixed(1);}).join(' · ')+
      ' — '+MODUS.map(function(k){return k+' '+bi.m[k].toFixed(1);}).join(' · ')+'</p>';
  }
  h+='<section class="rd-ab"><h3>'+(n<=1?'Woraus du gemischt bist':'Element- und Modusbilanz')+'</h3>'+bt+'</section>';

  /* Schatten — erst ab Stufe 2, und nur einer */
  if(n>=2){
    var sp=null;
    try{
      for(var i=0;i<HAUPT.length&&!sp;i++){
        var k=HAUPT[i];
        if(window.AC_SCHATTEN&&AC_SCHATTEN.hat(k)){
          var t=AC_SCHATTEN.haus(k,haus(P,P[k]));
          if(t) sp={k:k,h:haus(P,P[k]),t:t};
        }
      }
    }catch(e){}
    if(sp) h+=abschnitt('Wo es kippen kann', sp.t,
      n>=4?(sp.k+' im '+sp.h+'. Haus — Schattenmechanik, nicht Diagnose.'):null, n);
  }

  /* Abschluss */
  h+='<section class="rd-ab rd-schluss"><h3>Zum Schluss</h3>'+
    '<p>'+(n===0
      ? 'Ein Chart sagt nicht, wie dein Leben ausgeht. Es beschreibt, womit du ausgestattet bist — '+
        'so ähnlich wie eine Beschreibung deiner Stärken und wunden Punkte. Was du damit machst, '+
        'steht nirgends geschrieben.'
      : 'Ein Chart beschreibt Anlagen, keine Ereignisse. Es sagt, womit du arbeitest — nicht, '+
        'was daraus wird. Alles, was hier steht, ist ein Angebot zum Abgleichen: '+
        'Was stimmt, erkennst du; was nicht stimmt, lass liegen.')+'</p></section>';
  return h;
}

/* ── Oberfläche ───────────────────────────────────────── */
function alle(){ try{ return AC_P.alle()||[]; }catch(e){ return []; } }
function wahlBauen(){
  var box=el('rdwahl'), l=alle();
  box.innerHTML='';
  if(!l.length) return;
  var lab=document.createElement('span'); lab.className='lab'; lab.textContent='Für wen';
  box.appendChild(lab);
  l.forEach(function(p){
    var b=document.createElement('button'); b.type='button';
    b.textContent=AC_P.anzeige(p,AC_P.zeigeNamen())+(p.eigen?' (ich)':'');
    b.setAttribute('aria-pressed', gewaehlt===p.id);
    b.addEventListener('click',function(){
      gewaehlt=p.id; stufe=AC_NIV.fuerProfil(p.id); wahlBauen(); stufeBauen(); zeigen();
    });
    box.appendChild(b);
  });
}
function stufeBauen(){
  var box=el('rdstufe');
  var h='<span class="lab">Wissensstand der Person</span><div class="niv-knoepfe">';
  AC_NIV.STUFEN.forEach(function(s){
    h+='<button type="button" data-s="'+s.id+'" aria-pressed="'+(s.id===stufe)+'" title="'+s.lang+'">'+s.n+'</button>';
  });
  h+='</div><div class="rd-tipp"><b>'+AC_NIV.lang(stufe)+'.</b> '+AC_NIV.STUFEN[stufe].u+'</div>';
  box.innerHTML=h;
  Array.prototype.forEach.call(box.querySelectorAll('button[data-s]'),function(b){
    b.addEventListener('click',function(){
      stufe=+b.getAttribute('data-s');
      if(gewaehlt) AC_NIV.profilSetzen(gewaehlt, stufe);
      stufeBauen(); zeigen();
    });
  });
}
function zeigen(){
  var l=alle(), box=el('rdinhalt');
  if(!l.length){
    box.innerHTML='<div class="rd-leer"><b>Noch kein Profil angelegt.</b><br><br>'+
      'Unter <a href="profile.html">Profile</a> einen Menschen mit Geburtsdaten anlegen — '+
      'dann entsteht hier das Reading.</div>'; return;
  }
  if(!gewaehlt){ gewaehlt=(l.filter(function(p){return p.eigen;})[0]||l[0]).id;
    stufe=AC_NIV.fuerProfil(gewaehlt); wahlBauen(); stufeBauen(); }
  var p=l.filter(function(x){return x.id===gewaehlt;})[0];
  if(!p){ box.innerHTML=''; return; }
  box.innerHTML='<article class="rd niv-'+stufe+'">'+readingBauen(p,stufe)+'</article>';
}

/* Als reiner Text zum Verschicken */
function alsText(){
  var art=document.querySelector('.rd'); if(!art) return '';
  var t=art.innerText.replace(/\n{3,}/g,'\n\n').trim();
  return t;
}
function kopieren(){
  var t=alsText(); if(!t) return;
  var ta=document.createElement('textarea'); ta.value=t;
  ta.style.position='fixed'; ta.style.opacity='0';
  document.body.appendChild(ta); ta.select();
  var ok=false; try{ ok=document.execCommand('copy'); }catch(e){}
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(t).then(function(){ echo('In die Zwischenablage kopiert.'); },
      function(){ echo(ok?'Kopiert.':'Kopieren ging nicht — markier den Text und nimm Strg+C.'); });
  } else echo(ok?'Kopiert.':'Kopieren ging nicht — markier den Text und nimm Strg+C.');
  ta.remove();
}
function echo(s){ var e=el('rdecho'); e.textContent=s;
  setTimeout(function(){ if(e.textContent===s) e.textContent=''; },4000); }
function datei(){
  var t=alsText(); if(!t) return;
  var p=alle().filter(function(x){return x.id===gewaehlt;})[0];
  var nm=((p&&p.name)||'reading').trim().split(/\s+/)[0].toLowerCase();
  var b=new Blob([t],{type:'text/plain;charset=utf-8'});
  var a=document.createElement('a'); a.href=URL.createObjectURL(b);
  a.download='reading-'+nm+'-'+AC_NIV.STUFEN[stufe].k+'.txt';
  document.body.appendChild(a); a.click();
  setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); },400);
}

function start(){
  wahlBauen(); stufeBauen(); zeigen();
  el('rdkopie').addEventListener('click',kopieren);
  el('rddatei').addEventListener('click',datei);
  el('rddruck').addEventListener('click',function(){ window.print(); });
}
start();
