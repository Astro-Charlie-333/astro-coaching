/* ── Zwei Charts nebeneinander ─────────────────────────── */
function nrm(x){x=x%360;return x<0?x+360:x;}
function el(i){ return document.getElementById(i); }
function esc(s){ return String(s===undefined||s===null?'':s).replace(/[<>&"]/g,function(c){
 return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }
function gross(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

var W=window.AC_WORT;
/* „Mandys", „Lukas'" — deutsche Besitzform */
function bes(n){ return /[sxzß]$/i.test(n) ? n+"'" : n+'s'; }
/* „dein Wesenskern" → „Wesenskern" */
function ohneDein(s){ return s.replace(/^(deine|dein|die|der|das)\s+/i,''); }
var ZN=W.ZEICHEN.map(function(z){return z.n;});
var PL=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];
var ASPW=[[0,'Konjunktion','w'],[60,'Sextil','w'],[90,'Quadrat','h'],[120,'Trigon','w'],[180,'Opposition','h']];
var RKEY='ac_rolle_profile';

var aId=null, bId=null, rolle='sonstige', thema='komplett';

/* ── Rollen je Profil ─────────────────────────────────── */
function rollen(){ try{ return JSON.parse(localStorage.getItem(RKEY)||'{}')||{}; }catch(e){ return {}; } }
function rolleVon(id){ var r=rollen(); return r[id]||null; }
function rolleSetzen(id,v){ var r=rollen(); if(v) r[id]=v; else delete r[id];
 try{ localStorage.setItem(RKEY,JSON.stringify(r)); }catch(e){} }

/* ── Charts ───────────────────────────────────────────── */
function hatZeit(p){ return !(p.h===undefined||p.h===null||p.ohneZeit); }
function chartVon(p){
  var ut=p.h+p.mi/60-p.tz,y=p.y,mo=p.mo,d=p.d;
  if(!hatZeit(p)){ ut=12-(p.tz||0); }
  if(ut<0){ut+=24;d-=1;} if(ut>=24){ut-=24;d+=1;}
  var jd=jdFromUT(y,mo,d,ut),T=(jd-2451545)/36525;
  var C={Sonne:sunLon(T),Mond:moonLon(T),Merkur:geo('Merkur',T),Venus:geo('Venus',T),
   Mars:geo('Mars',T),Jupiter:geo('Jupiter',T),Saturn:geo('Saturn',T),Uranus:geo('Uranus',T),
   Neptun:geo('Neptun',T),Pluto:geo('Pluto',T),_zeit:hatZeit(p)};
  if(hatZeit(p)){ var a=angles(jd,p.lat,p.lon); C.ASC=a.asc; C.MC=a.mc; }
  /* Ohne Zeit: wandert der Mond an diesem Tag über eine Zeichengrenze? */
  if(!hatZeit(p)){
    var j0=jdFromUT(p.y,p.mo,p.d,0-(p.tz||0)), j1=j0+1;
    var z0=Math.floor(nrm(moonLon((j0-2451545)/36525))/30);
    var z1=Math.floor(nrm(moonLon((j1-2451545)/36525))/30);
    C._mondUnsicher=(z0!==z1);
    C._mondZeichen=[z0,z1];
  }
  return C;
}
function haus(C,l){ return C.ASC===undefined?0:((Math.floor(l/30)-Math.floor(C.ASC/30))%12+12)%12+1; }
function zi(l){ return Math.floor(nrm(l)/30); }
function paarKey(a,b){ return [a,b].sort().join('|'); }

/* Kontakte zwischen zwei Charts */
function kontakte(A,B,R){
  var out=[];
  PL.forEach(function(ka){ PL.forEach(function(kb){
    var d=Math.abs(((A[ka]-B[kb]+540)%360)-180);
    ASPW.forEach(function(x){
      var max=(x[0]===0||x[0]===180)?7:5;
      var orb=Math.abs(d-x[0]);
      if(orb>max) return;
      var key=paarKey(ka,kb);
      var g=(R.gew&&R.gew[key])||0.6;
      out.push({a:ka,b:kb,typ:x[1],art:x[2],orb:orb,key:key,
                s:g*((max-orb)/max)*(x[2]==='h'?1.05:1)});
    });
  });});
  /* Je Planetenpaar nur den engsten Kontakt behalten */
  var best={};
  out.forEach(function(k){ var id=k.a+'>'+k.b;
    if(!best[id]||best[id].orb>k.orb) best[id]=k; });
  var l=Object.keys(best).map(function(k){return best[k];});
  l.sort(function(x,y){return y.s-x.s;});
  return l;
}
function kontaktText(k,R,nA,nB){
  var d=KONTAKT[k.key]; if(!d) return null;
  var weich=(k.art==='w');
  var t=null;
  if(R.romantisch) t=weich?(d.rw||d.w):(d.rh||d.h);
  if(!t) t=weich?d.w:d.h;
  return t;
}

/* ── Darstellung ──────────────────────────────────────── */
function alle(){ try{ return AC_P.alle()||[]; }catch(e){ return []; } }
function pName(p){ try{ return AC_P.anzeige(p,AC_P.zeigeNamen()); }catch(e){ return p.name||'?'; } }
function vorname(p){ return (p.name||'').trim().split(/\s+/)[0]||pName(p); }

function wahlBauen(){
  ['bzA','bzB'].forEach(function(id,i){
    var box=el(id), l=alle();
    box.innerHTML='<span class="lab">'+(i?'und':'Zwischen')+'</span>';
    l.forEach(function(p){
      var b=document.createElement('button'); b.type='button';
      b.textContent=pName(p)+(p.eigen?' (ich)':'');
      b.setAttribute('aria-pressed', (i?bId:aId)===p.id);
      b.addEventListener('click',function(){
        if(i){ bId=p.id; var r=rolleVon(p.id); if(r) rolle=r; }
        else aId=p.id;
        wahlBauen(); steuerBauen(); zeigen();
      });
      box.appendChild(b);
    });
  });
}
function steuerBauen(){
  var h='<div class="bz-zeile"><span class="lab">Beziehung</span><div class="chips">';
  Object.keys(ROLLE).forEach(function(k){
    h+='<button type="button" class="chip" data-r="'+k+'" aria-pressed="'+(rolle===k)+'">'+ROLLE[k].n+'</button>';
  });
  h+='</div></div><div class="bz-zeile"><span class="lab">Thema</span><div class="chips">';
  Object.keys(THEMA).forEach(function(k){
    h+='<button type="button" class="chip" data-t="'+k+'" aria-pressed="'+(thema===k)+'">'+THEMA[k].n+'</button>';
  });
  h+='</div></div>';
  el('bzsteuer').innerHTML=h;
  Array.prototype.forEach.call(el('bzsteuer').querySelectorAll('[data-r]'),function(b){
    b.addEventListener('click',function(){
      rolle=b.getAttribute('data-r');
      if(bId) rolleSetzen(bId, rolle);
      steuerBauen(); zeigen();
    });
  });
  Array.prototype.forEach.call(el('bzsteuer').querySelectorAll('[data-t]'),function(b){
    b.addEventListener('click',function(){ thema=b.getAttribute('data-t'); steuerBauen(); zeigen(); });
  });
}

function abschnitt(id, titel, inhalt, zeig){
  if(zeig.indexOf(id)<0 || !inhalt) return '';
  return '<section class="bz-ab"><h3>'+titel+'</h3>'+inhalt+'</section>';
}

function bauen(pa,pb){
  var A=chartVon(pa), B=chartVon(pb), R=ROLLE[rolle], Z=THEMA[thema].zeig;
  var nA=vorname(pa), nB=vorname(pb);
  var n=AC_NIV.stufe();
  var tier=!!R.tier;
  var h='';

  /* Kopf */
  h+='<div class="bz-kopf"><div class="bz-k">'+esc(R.n)+' · '+esc(THEMA[thema].n)+'</div>'+
    '<h2>'+esc(nA)+' und '+esc(nB)+'</h2>'+
    '<p class="bz-ein">Darum geht es hier: '+esc(R.was)+'. '+
    'Was hier steht, beschreibt eine Anlage — keine Schuld und keine Prognose.</p>'+
    (ROLLENSATZ[rolle]?'<p class="bz-rolle">'+ROLLENSATZ[rolle]+'</p>':'')+'</div>';

  if(!B._zeit || !A._zeit){
    var ohne=[]; if(!A._zeit) ohne.push(nA); if(!B._zeit) ohne.push(nB);
    h+='<div class="bz-hin"><b>Ohne Geburtszeit bei '+esc(ohne.join(' und '))+'.</b> '+
      'Die Zeichen der Planeten stimmen trotzdem — Häuser und Aszendent fehlen, '+
      'weil die sich stündlich ändern.'+
      ((B._mondUnsicher||A._mondUnsicher)?' Und der Mond wechselt an diesem Tag das Zeichen: '+
        'er steht entweder in '+ZN[(B._mondUnsicher?B:A)._mondZeichen[0]]+' oder in '+
        ZN[(B._mondUnsicher?B:A)._mondZeichen[1]]+'. Lies beide Fassungen und nimm die, die passt.':'')+
      '</div>';
  }

  /* Grundton */
  var ga=zi(A.Sonne), gb=zi(B.Sonne), ma=zi(A.Mond), mb=zi(B.Mond);
  var el4=['Feuer','Erde','Luft','Wasser'];
  var ea=el4[ga%4], eb=el4[gb%4];
  var grund='<div class="bz-paar">'+
    '<div class="bzp"><b>'+esc(nA)+'</b>'+(tier?'':'Sonne in '+ZN[ga]+' · ')+'Mond in '+ZN[ma]+
      (A.ASC!==undefined?' · '+ZN[zi(A.ASC)]+'-Aszendent':'')+'</div>'+
    '<div class="bzp"><b>'+esc(nB)+'</b>'+(tier?'':'Sonne in '+ZN[gb]+' · ')+'Mond in '+ZN[mb]+
      (B.ASC!==undefined?' · '+ZN[zi(B.ASC)]+'-Aszendent':'')+'</div></div>';
  grund+='<p>'+(ea===eb
    ? 'Ihr seid vom selben Schlag — beide '+ea+'. Das macht vieles selbstverständlich und sorgt dafür, dass euch dieselben Dinge fehlen.'
    : 'Du bist '+ea+', '+esc(nB)+' ist '+eb+'. Das ist der Grund für die meisten kleinen Missverständnisse zwischen euch — und auch dafür, dass ihr euch gegenseitig etwas beibringen könnt.')+'</p>';
  h+=abschnitt('grund','Der Grundton', grund, Z);

  /* Wie du sie erreichst */
  if(tier){
    h+=abschnitt('erreichen','Was für ein Typ '+esc(nB)+' ist',
      '<p>'+TIER_MOND[mb]+'</p>'+
      '<p class="bz-leise">Beim Tier ist der Mond das Interessanteste — Temperament, Rhythmus, '+
      'Reizschwelle. Sonne und Aszendent, die bei Menschen so viel tragen, sagen hier wenig.</p>', Z);
  } else {
    h+=abschnitt('erreichen','Wie du '+esc(nB)+' erreichst',
      '<p><b>Was ankommt:</b> '+ERREICHEN[mb][0]+'</p>'+
      '<p><b>Was danebengeht:</b> '+ERREICHEN[mb][1]+'</p>'+
      '<p class="bz-leise">Das liest sich am Mond ab — dem Teil, der zuerst reagiert, '+
      'bevor jemand nachdenkt.</p>', Z);
  }

  /* Reden */
  if(!tier){
    var rb=zi(B.Merkur), ra=zi(A.Merkur);
    h+=abschnitt('reden','Wie ihr miteinander redet',
      '<p><b>Bei '+esc(nB)+' funktioniert:</b> '+REDEN[rb][0]+' <b>Nicht:</b> '+REDEN[rb][1]+'</p>'+
      '<p><b>Du selbst redest so:</b> '+REDEN[ra][0].replace(/^./,function(c){return c.toLowerCase();})+
      ' — das ist genau dann ein Problem, wenn es nicht zu dem passt, was oben steht.</p>', Z);
  }

  /* Kontakte */
  var ks=kontakte(A,B,R).filter(function(k){ return KONTAKT[k.key]; });
  var gezeigt=[], gesehen={};
  ks.forEach(function(k){
    if(gesehen[k.key]) return; gesehen[k.key]=1;
    var t=kontaktText(k,R); if(!t) return;
    gezeigt.push({k:k,t:t});
  });
  if(thema==='reibung') gezeigt=gezeigt.filter(function(x){return x.k.art==='h';});
  if(thema==='naehe')   gezeigt=gezeigt.filter(function(x){return x.k.art==='w';});
  gezeigt=gezeigt.slice(0, n<=1?4:6);
  if(gezeigt.length){
    var kt=gezeigt.map(function(x){
      var kopf = n<=1
        ? esc(bes(nA))+' '+gross(ohneDein(W.PLANET[x.k.a].kurz(Math.min(n,1))))+' und '+
          esc(bes(nB))+' '+ohneDein(W.PLANET[x.k.b].kurz(Math.min(n,1)))
        : esc(bes(nA))+' '+x.k.a+' '+x.k.typ+' '+esc(bes(nB))+' '+x.k.b+
          (n>=3?' ('+x.k.orb.toFixed(1)+'°)':'');
      return '<div class="bz-kt '+(x.k.art==='h'?'hart':'weich')+'">'+
        '<div class="kt-kopf">'+kopf+'<span class="kt-m">'+
        (x.k.art==='h'?'Reibung':'leicht')+'</span></div><p>'+x.t+'</p></div>';
    }).join('');
    h+=abschnitt('kontakte', thema==='reibung'?'Wo es hakt':(thema==='naehe'?'Was leicht geht':'Die stärksten Verbindungen'), kt, Z);
  }

  /* Streit */
  if(!tier){
    var sb=zi(B.Mars);
    h+=abschnitt('streit','Wenn es Streit gibt',
      '<p><b>'+esc(nB)+' streitet so:</b> '+STREIT[sb][0]+'</p>'+
      '<p><b>Was hilft:</b> '+STREIT[sb][1]+'</p>'+
      (R.eltern?'<p class="bz-leise">Bei Eltern lohnt die Frage, wie alt dieses Muster ist. '+
        'Vieles davon war mit zwölf richtig und ist mit vierzig nur noch Gewohnheit.</p>':''), Z);
  }

  /* Helfen */
  if(!tier){
    h+=abschnitt('helfen','Wenn du helfen willst',
      '<p>'+HELFEN[mb]+'</p>'+
      '<p class="bz-leise">Und der unbequeme Teil: Die meisten Menschen helfen so, '+
      'wie sie selbst geholfen bekommen wollen. Deins wäre „'+HELFEN[ma]+'“ — '+
      (ma===mb?'hier passt das ausnahmsweise zusammen.':'das ist nicht dasselbe.')+'</p>', Z);
  }

  /* Planeten im Haus des anderen */
  if(B.ASC!==undefined){
    var ih=[];
    ['Sonne','Mond','Venus','Mars','Saturn'].forEach(function(k){
      var hs=haus(B,A[k]);
      if(hs) ih.push({k:k,h:hs});
    });
    if(ih.length){
      var iht='<p>Wo du bei '+esc(nB)+' landest — welchen Lebensbereich du bei ihr oder ihm '+
        'berührst, ob du willst oder nicht:</p><ul class="bz-liste">'+
        ih.slice(0,5).map(function(x){
          return '<li>'+(n<=1?gross(W.PLANET[x.k].kurz(Math.min(n,1))):'Dein '+x.k)+
            ' trifft '+INHAUS[x.h-1]+(n>=2?' ('+x.h+'. Haus)':'')+'.</li>';
        }).join('')+'</ul>';
      h+=abschnitt('haeuser','Wo du bei '+esc(nB)+' ankommst', iht, Z);
    }
  }

  /* Was gerade läuft */
  h+=abschnitt('jetzt','Was gerade zwischen euch läuft', jetztText(A,B,nA,nB,R,n), Z);

  h+='<div class="bz-fuss">Beziehungsbilder beschreiben, womit zwei Menschen ausgestattet sind — '+
    'nicht, was sie daraus machen. Ein harter Kontakt ist kein Urteil über eine Beziehung, '+
    'und ein weicher ist keine Garantie.</div>';
  return h;
}

/* Laufende Transite, die beide betreffen */
function jetztText(A,B,nA,nB,R,n){
  var d=new Date();
  var jd=jdFromUT(d.getUTCFullYear(),d.getUTCMonth()+1,d.getUTCDate(),
    d.getUTCHours()+d.getUTCMinutes()/60);
  var T=(jd-2451545)/36525;
  var TR={Jupiter:geo('Jupiter',T),Saturn:geo('Saturn',T),Uranus:geo('Uranus',T),
    Neptun:geo('Neptun',T),Pluto:geo('Pluto',T),Mars:geo('Mars',T),Venus:geo('Venus',T)};
  var treffer=[];
  Object.keys(TR).forEach(function(t){
    ['Sonne','Mond','Venus','Mars','Saturn'].forEach(function(k){
      [['A',A,nA],['B',B,nB]].forEach(function(seite){
        var dd=Math.abs(((TR[t]-seite[1][k]+540)%360)-180);
        ASPW.forEach(function(x){
          var orb=Math.abs(dd-x[0]);
          if(orb>2) return;
          treffer.push({t:t,k:k,typ:x[1],art:x[2],orb:orb,wen:seite[2]});
        });
      });
    });
  });
  treffer.sort(function(a,b){return a.orb-b.orb;});
  if(!treffer.length) return '<p>Gerade berührt kein langsamer Planet eure Charts eng genug, '+
    'um daraus etwas zu lesen. Das ist der Normalzustand und keine Lücke — '+
    'die meiste Zeit ist am Himmel nichts Besonderes los.</p>';
  var l=treffer.slice(0,3).map(function(x){
    var hart=(x.art==='h');
    return '<li><b>'+esc(x.wen)+':</b> '+
      (n<=1? gross(W.PLANET[x.t].kurz(1))+' berührt gerade '+W.PLANET[x.k].kurz(1)
           : x.t+' '+x.typ+' '+x.k+(n>=3?' ('+x.orb.toFixed(1)+'°)':''))+' — '+
      (hart?'das ist der Punkt, an dem es zwischen euch gerade schneller eng wird, als es müsste.'
           :'da geht gerade mehr als sonst, wenn ihr es nutzt.')+'</li>';
  }).join('');
  return '<p>Was im Moment von außen dazukommt, eng gerechnet:</p><ul class="bz-liste">'+l+'</ul>'+
    '<p class="bz-leise">Transite sind Wetter, kein Klima. Sie erklären, warum etwas '+
    '<i>gerade jetzt</i> hochkommt — nicht, warum es überhaupt da ist.</p>';
}

function zeigen(){
  var l=alle(), box=el('bzinhalt');
  if(l.length<2){
    box.innerHTML='<div class="bz-leer"><b>Dafür braucht es zwei Profile.</b><br><br>'+
      'Unter <a href="profile.html">Profile</a> einen zweiten Menschen — oder ein Tier — anlegen, '+
      'dann entsteht hier die Gegenüberstellung.</div>'; return;
  }
  if(!aId) aId=(l.filter(function(p){return p.eigen;})[0]||l[0]).id;
  if(!bId) bId=(l.filter(function(p){return p.id!==aId;})[0]||l[1]).id;
  if(aId===bId){ box.innerHTML='<div class="bz-leer">Bitte zwei verschiedene Profile wählen.</div>'; return; }
  var pa=l.filter(function(p){return p.id===aId;})[0];
  var pb=l.filter(function(p){return p.id===bId;})[0];
  if(!pa||!pb){ box.innerHTML=''; return; }
  box.innerHTML='<article class="bz">'+bauen(pa,pb)+'</article>';
}

function kopieren(){
  var a=document.querySelector('.bz'); if(!a) return;
  var t=a.innerText.replace(/\n{3,}/g,'\n\n').trim();
  var ta=document.createElement('textarea'); ta.value=t;
  ta.style.position='fixed'; ta.style.opacity='0';
  document.body.appendChild(ta); ta.select();
  try{ document.execCommand('copy'); }catch(e){}
  if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(t);
  ta.remove();
  var e=el('bzecho'); e.textContent='Kopiert.';
  setTimeout(function(){ if(e.textContent==='Kopiert.') e.textContent=''; },3500);
}

function start(){
  wahlBauen(); steuerBauen(); zeigen();
  el('bzkopie').addEventListener('click',kopieren);
  el('bzdruck').addEventListener('click',function(){ window.print(); });
  window.addEventListener('ac-niveau',zeigen);
}
start();
