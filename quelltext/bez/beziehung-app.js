/* ── Zwei Charts nebeneinander ─────────────────────────────────
   Diese Datei rechnet und setzt zusammen. Sie schreibt keinen Satz:
   alle Texte stehen in `beziehung-daten.js` (`BZ_T`), und „dein"
   bildet `B_BEUGE` aus `kern/bahn-daten.js` — die eine Stelle, die
   das Geschlecht eines Punktes kennt (Aufgabe 52, aus 34 und 38).
   `bau-bez.py` bricht ab, sobald hier wieder ein Satz oder ein von
   Hand geschriebenes „dein" steht, in allen drei Anführungsarten. */
function bzNrm(x){x=x%360;return x<0?x+360:x;}
function el(i){ return document.getElementById(i); }
function esc(s){ return String(s===undefined||s===null?'':s).replace(/[<>&"]/g,function(c){
 return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }
function gross(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

var W=window.AC_WORT;
/* „Mandys", „Lukas'" — deutsche Besitzform */
function bes(n){ return /[sxzß]$/i.test(n) ? n+"'" : n+'s'; }

/* Setzt Werte in eine Vorlage aus BZ_T ein. Hier entsteht kein
   Text, nur die Einsetzung. */
function BZ_FUELL(form, werte){
  var s=String(form||'');
  for(var k in werte) if(werte.hasOwnProperty(k))
    s=s.split('{'+k+'}').join(String(werte[k]));
  return s;
}
/* Das Hauptwort eines Punktes ohne Besitzwort — davor steht ein
   Name. Auf Stufe 0 das Alltagswort, darüber der Planetenname. */
function bzWort(k,n){ return n<=0 ? (BZ_PUNKT[k]||B_PUNKT(k)).wort : B_PUNKT(k).wort; }
/* Derselbe Punkt, wenn die Seite von einem selbst spricht. */
function bzMein(k,n){ return B_BEUGE(n<=0?(BZ_PUNKT[k]||B_PUNKT(k)):B_PUNKT(k),'nom'); }

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
function bzChart(p){
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
    var z0=Math.floor(bzNrm(moonLon((j0-2451545)/36525))/30);
    var z1=Math.floor(bzNrm(moonLon((j1-2451545)/36525))/30);
    C._mondUnsicher=(z0!==z1);
    C._mondZeichen=[z0,z1];
  }
  return C;
}
function bzHaus(C,l){ return C.ASC===undefined?0:((Math.floor(l/30)-Math.floor(C.ASC/30))%12+12)%12+1; }
function zi(l){ return Math.floor(bzNrm(l)/30); }
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
/* Wer handelt, wer empfängt. k.a liegt in Chart A, k.b in Chart B —
   diese Richtung ist der Unterschied zwischen „du gibst groß" und
   „dir wird groß gegeben". */
function kontaktText(k,R,nA,nB){
  var d=KONTAKT[k.key]; if(!d) return null;
  var weich=(k.art==='w');
  var t=null;
  if(R.romantisch) t=weich?(d.rw||d.w):(d.rh||d.h);
  if(!t) t=weich?d.w:d.h;
  if(!t||!t.tut) return null;
  var tuer, empf;
  if(!d.akteur){ tuer=null; empf=null; }
  else if(k.a===d.akteur){ tuer=nA; empf=nB; }
  else { tuer=nB; empf=nA; }
  /* {A}s / {B}s zuerst — sonst entsteht „Alexs" statt „Alex'". */
  function fuell(x){
    var A=tuer||BZ_T.ktNiemand, B=empf||BZ_T.ktNiemand;
    return String(x)
      .replace(/\{A\}s/g, esc(bes(A))).replace(/\{B\}s/g, esc(bes(B)))
      .replace(/\{A\}/g, esc(A)).replace(/\{B\}/g, esc(B));
  }
  return {tut:fuell(t.tut), an:fuell(t.an), hilft:fuell(t.hilft),
          tuer:tuer, empf:empf};
}

/* ── Darstellung ──────────────────────────────────────── */
function alle(){ try{ return AC_P.alle()||[]; }catch(e){ return []; } }
function pName(p){ try{ return AC_P.anzeige(p,AC_P.zeigeNamen()); }catch(e){ return p.name||'?'; } }
function vorname(p){ return (p.name||'').trim().split(/\s+/)[0]||pName(p); }

function wahlBauen(){
  ['bzA','bzB'].forEach(function(id,i){
    var box=el(id), l=alle();
    box.innerHTML='<span class="lab">'+(i?BZ_T.wahlB:BZ_T.wahlA)+'</span>';
    l.forEach(function(p){
      var b=document.createElement('button'); b.type='button';
      b.textContent=pName(p)+(p.eigen?BZ_T.wahlEigen:'');
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
  var h='<div class="bz-zeile"><span class="lab">'+BZ_T.labRolle+'</span><div class="chips">';
  Object.keys(ROLLE).forEach(function(k){
    h+='<button type="button" class="chip" data-r="'+k+'" aria-pressed="'+(rolle===k)+'">'+ROLLE[k].n+'</button>';
  });
  h+='</div></div><div class="bz-zeile"><span class="lab">'+BZ_T.labThema+'</span><div class="chips">';
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
  var A=bzChart(pa), B=bzChart(pb), R=ROLLE[rolle], Z=THEMA[thema].zeig;
  var nA=vorname(pa), nB=vorname(pb);
  var n=AC_NIV.stufe();
  var tier=!!R.tier;
  var h='';

  /* Kopf */
  h+='<div class="bz-kopf"><div class="bz-k">'+
    esc(BZ_FUELL(BZ_T.kicker,{rolle:R.n, thema:THEMA[thema].n}))+'</div>'+
    '<h2>'+BZ_FUELL(BZ_T.paar,{a:esc(nA), b:esc(nB)})+'</h2>'+
    '<p class="bz-ein">'+esc(BZ_FUELL(BZ_T.einleitung,{was:R.was}))+'</p>'+
    (ROLLENSATZ[rolle]?'<p class="bz-rolle">'+ROLLENSATZ[rolle]+'</p>':'')+'</div>';

  if(!B._zeit || !A._zeit){
    var ohne=[]; if(!A._zeit) ohne.push(nA); if(!B._zeit) ohne.push(nB);
    var unsicher=(B._mondUnsicher?B:A);
    h+='<div class="bz-hin">'+
      BZ_FUELL(BZ_T.ohneZeit,{wer:esc(ohne.join(BZ_T.ohneZeitUnd))})+
      ((B._mondUnsicher||A._mondUnsicher)
        ? BZ_FUELL(BZ_T.mondOffen,{z1:ZN[unsicher._mondZeichen[0]],
                                   z2:ZN[unsicher._mondZeichen[1]]})
        : '')+
      '</div>';
  }

  /* Grundton */
  var ga=zi(A.Sonne), gb=zi(B.Sonne), ma=zi(A.Mond), mb=zi(B.Mond);
  var ea=BZ_T.elemente[ga%4], eb=BZ_T.elemente[gb%4];
  function grundZeile(name,C,sz,mz){
    return '<div class="bzp"><b>'+esc(name)+'</b>'+
      (tier?'':BZ_FUELL(BZ_T.grundSonne,{z:ZN[sz]}))+
      BZ_FUELL(BZ_T.grundMond,{z:ZN[mz]})+
      (C.ASC!==undefined?BZ_FUELL(BZ_T.grundAsc,{z:ZN[zi(C.ASC)]}):'')+'</div>';
  }
  var grund='<div class="bz-paar">'+grundZeile(nA,A,ga,ma)+grundZeile(nB,B,gb,mb)+'</div>';
  grund+='<p>'+(ea===eb
    ? esc(BZ_FUELL(BZ_T.grundGleich,{el:ea}))
    : BZ_FUELL(BZ_T.grundVerschieden,{ea:ea, b:esc(nB), eb:eb}))+'</p>';
  h+=abschnitt('grund',BZ_T.grundTitel, grund, Z);

  /* Wie du sie erreichst */
  if(tier){
    h+=abschnitt('erreichen',BZ_FUELL(BZ_T.tierTitel,{b:esc(nB)}),
      '<p>'+TIER_MOND[mb]+'</p><p class="bz-leise">'+BZ_T.tierHinweis+'</p>', Z);
  } else {
    h+=abschnitt('erreichen',BZ_FUELL(BZ_T.erreichenTitel,{b:esc(nB)}),
      '<p>'+BZ_FUELL(BZ_T.erreichenJa,{t:ERREICHEN[mb][0]})+'</p>'+
      '<p>'+BZ_FUELL(BZ_T.erreichenNein,{t:ERREICHEN[mb][1]})+'</p>'+
      '<p class="bz-leise">'+BZ_T.erreichenHinweis+'</p>', Z);
  }

  /* Reden */
  if(!tier){
    var rb=zi(B.Merkur), ra=zi(A.Merkur);
    h+=abschnitt('reden',BZ_T.redenTitel,
      '<p>'+BZ_FUELL(BZ_T.redenB,{b:esc(nB), ja:REDEN[rb][0], nein:REDEN[rb][1]})+'</p>'+
      '<p>'+BZ_FUELL(BZ_T.redenA,{a:REDEN[ra][0]})+'</p>', Z);
  }

  /* Kontakte */
  var ks=kontakte(A,B,R).filter(function(k){ return KONTAKT[k.key]; });
  var gezeigt=[], gesehen={};
  ks.forEach(function(k){
    if(gesehen[k.key]) return; gesehen[k.key]=1;
    var t=kontaktText(k,R,nA,nB); if(!t) return;
    gezeigt.push({k:k,t:t});
  });
  if(thema==='reibung') gezeigt=gezeigt.filter(function(x){return x.k.art==='h';});
  if(thema==='naehe')   gezeigt=gezeigt.filter(function(x){return x.k.art==='w';});
  gezeigt=gezeigt.slice(0, n<=1?4:6);
  if(gezeigt.length){
    var kt=gezeigt.map(function(x){
      var kopf = n<=1
        ? BZ_FUELL(BZ_T.ktKopf,{a:esc(bes(nA)), pa:gross(bzWort(x.k.a,n)),
                                b:esc(bes(nB)), pb:bzWort(x.k.b,n)})
        : BZ_FUELL(BZ_T.ktKopfTech,{a:esc(bes(nA)), pa:x.k.a, typ:x.k.typ,
                                    b:esc(bes(nB)), pb:x.k.b})+
          (n>=3?BZ_FUELL(BZ_T.ktOrb,{orb:x.k.orb.toFixed(1)}):'');
      return '<div class="bz-kt '+(x.k.art==='h'?'hart':'weich')+'">'+
        '<div class="kt-kopf">'+kopf+'<span class="kt-m">'+
        (x.k.art==='h'?BZ_T.ktHart:BZ_T.ktWeich)+'</span></div>'+
        '<div class="kt-drei">'+
          '<div class="kt-s"><span class="kt-l">'+BZ_T.ktWasPassiert+'</span>'+x.t.tut+'</div>'+
          '<div class="kt-s"><span class="kt-l">'+BZ_T.ktWasAnkommt+'</span>'+x.t.an+'</div>'+
          '<div class="kt-s hilft"><span class="kt-l">'+BZ_T.ktWasHilft+'</span>'+x.t.hilft+'</div>'+
        '</div></div>';
    }).join('');
    h+=abschnitt('kontakte', thema==='reibung'?BZ_T.kontakteTitelReibung
      :(thema==='naehe'?BZ_T.kontakteTitelNaehe:BZ_T.kontakteTitel), kt, Z);
  }

  /* Streit */
  if(!tier){
    var sb=zi(B.Mars);
    h+=abschnitt('streit',BZ_T.streitTitel,
      '<p>'+BZ_FUELL(BZ_T.streitB,{b:esc(nB), t:STREIT[sb][0]})+'</p>'+
      '<p>'+BZ_FUELL(BZ_T.streitHilft,{t:STREIT[sb][1]})+'</p>'+
      (R.eltern?'<p class="bz-leise">'+BZ_T.streitEltern+'</p>':''), Z);
  }

  /* Helfen */
  if(!tier){
    h+=abschnitt('helfen',BZ_T.helfenTitel,
      '<p>'+HELFEN[mb]+'</p>'+
      '<p class="bz-leise">'+BZ_FUELL(BZ_T.helfenHinweis,
        {a:HELFEN[ma], folge:(ma===mb?BZ_T.helfenGleich:BZ_T.helfenAnders)})+'</p>', Z);
  }

  /* Planeten im Haus des anderen */
  if(B.ASC!==undefined){
    var ih=[];
    ['Sonne','Mond','Venus','Mars','Saturn'].forEach(function(k){
      var hs=bzHaus(B,A[k]);
      if(hs) ih.push({k:k,h:hs});
    });
    if(ih.length){
      var iht='<p>'+BZ_FUELL(BZ_T.haeuserVor,{bs:esc(bes(nB)), b:esc(nB)})+'</p>'+
        '<ul class="bz-liste">'+
        ih.slice(0,5).map(function(x){
          return '<li>'+BZ_FUELL(BZ_T.haeuserZeile,
              {punkt:gross(bzMein(x.k,n)), bs:esc(bes(nB)), bereich:INHAUS[x.h-1]})+
            (n>=2?BZ_FUELL(BZ_T.haeuserHaus,{h:x.h}):'')+'.</li>';
        }).join('')+'</ul>'+
        '<p class="bz-leise">'+BZ_FUELL(BZ_T.haeuserHinweis,{b:esc(nB)})+'</p>';
      h+=abschnitt('haeuser',BZ_FUELL(BZ_T.haeuserTitel,{b:esc(nB)}), iht, Z);
    }
  }

  /* Was gerade läuft */
  h+=abschnitt('jetzt',BZ_T.jetztTitel, jetztText(A,B,nA,nB,R,n), Z);

  h+='<div class="bz-fuss">'+BZ_T.fuss+'</div>';
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
  if(!treffer.length) return '<p>'+BZ_T.jetztLeer+'</p>';
  var l=treffer.slice(0,3).map(function(x){
    /* Der Besitz steht als Name da und nicht als „dein": die Zeile
       spricht über einen der beiden, nicht über die Leserin. */
    var was = n<=1
      ? BZ_FUELL(BZ_T.jetztWas,{wander:x.t, bs:esc(bes(x.wen)), punkt:bzWort(x.k,n)})
      : BZ_FUELL(BZ_T.jetztWasTech,{wander:x.t, typ:x.typ, bs:esc(bes(x.wen)), punkt:x.k})+
        (n>=3?BZ_FUELL(BZ_T.ktOrb,{orb:x.orb.toFixed(1)}):'');
    return BZ_FUELL(BZ_T.jetztZeile,
      {was:was, folge:(x.art==='h'?BZ_T.jetztHart:BZ_T.jetztWeich)});
  }).join('');
  return '<p>'+BZ_T.jetztVor+'</p><ul class="bz-liste">'+l+'</ul>'+
    '<p class="bz-leise">'+BZ_T.jetztHinweis+'</p>';
}

function zeigen(){
  var l=alle(), box=el('bzinhalt');
  if(l.length<2){ box.innerHTML='<div class="bz-leer">'+BZ_T.leerZwei+'</div>'; return; }
  if(!aId) aId=(l.filter(function(p){return p.eigen;})[0]||l[0]).id;
  if(!bId) bId=(l.filter(function(p){return p.id!==aId;})[0]||l[1]).id;
  if(aId===bId){ box.innerHTML='<div class="bz-leer">'+BZ_T.leerGleich+'</div>'; return; }
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
  var e=el('bzecho'); e.textContent=BZ_T.kopiert;
  setTimeout(function(){ if(e.textContent===BZ_T.kopiert) e.textContent=''; },3500);
}

function start(){
  wahlBauen(); steuerBauen(); zeigen();
  el('bzkopie').addEventListener('click',kopieren);
  el('bzdruck').addEventListener('click',function(){ window.print(); });
  window.addEventListener('ac-niveau',zeigen);
}
start();
