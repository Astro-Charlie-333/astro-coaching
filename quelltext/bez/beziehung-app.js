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
  var h='', teile={};

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

  /* Die Seelenebene, das Doppelrad, die Marker */
  var S=null, K=null;
  if(!tier){
    S=bzrSeele(pa,pb); K=bzrChina(pa,pb);
    var rk=R.eltern||R.kind||rolle==='geschwister'?'familie':(rolle==='freundschaft'||rolle==='kollegin'?rolle:null);
    if(Z.indexOf('seele')>=0) teile.seele=bzsSeele(S,nA,nB,n,R,rk);
    teile.rad=abschnitt('rad',BZS_T.radTitel, bzsRad(S,nA,nB), Z);
    teile.marker=abschnitt('marker',BZS_T.markerTitel, bzsMarker(S,nA,nB,n), Z);
  }

  /* Grundton */
  var ga=zi(A.Sonne), gb=zi(B.Sonne), ma=zi(A.Mond), mb=zi(B.Mond);
  var ea=BZ_T.elemente[ga%4], eb=BZ_T.elemente[gb%4];
  function grundZeile(name,C,sz,mz){
    if(n<=0) return '<div class="bzp"><b>'+esc(name)+'</b>'+
      BZ_FUELL(BZ_T.grund0,{ek:BZ_T.elemente[sz%4], em:BZ_T.elemente[mz%4]})+'</div>';
    return '<div class="bzp"><b>'+esc(name)+'</b>'+
      (tier?'':BZ_FUELL(BZ_T.grundSonne,{z:ZN[sz]}))+
      BZ_FUELL(BZ_T.grundMond,{z:ZN[mz]})+
      (C.ASC!==undefined?BZ_FUELL(BZ_T.grundAsc,{z:ZN[zi(C.ASC)]}):'')+'</div>';
  }
  var grund='<div class="bz-paar">'+grundZeile(nA,A,ga,ma)+grundZeile(nB,B,gb,mb)+'</div>';
  grund+='<p>'+(ea===eb
    ? esc(BZ_FUELL(BZ_T.grundGleich,{el:ea}))
    : BZ_FUELL(BZ_T.grundVerschieden,{ea:ea, b:esc(nB), eb:eb}))+'</p>';
  teile.grund=abschnitt('grund',BZ_T.grundTitel, grund, Z);

  /* Wie du sie erreichst */
  if(tier){
    teile.erreichen=abschnitt('erreichen',BZ_FUELL(BZ_T.tierTitel,{b:esc(nB)}),
      '<p>'+TIER_MOND[mb]+'</p><p class="bz-leise">'+BZ_T.tierHinweis+'</p>', Z);
  } else {
    teile.erreichen=abschnitt('erreichen',BZ_FUELL(BZ_T.erreichenTitel,{b:esc(nB)}),
      '<p>'+BZ_FUELL(BZ_T.erreichenJa,{t:ERREICHEN[mb][0]})+'</p>'+
      '<p>'+BZ_FUELL(BZ_T.erreichenNein,{t:ERREICHEN[mb][1]})+'</p>'+
      (n>=1?'<p class="bz-leise">'+BZ_T.erreichenHinweis+'</p>':''), Z);
  }

  /* Reden */
  if(!tier){
    var rb=zi(B.Merkur), ra=zi(A.Merkur);
    teile.reden=abschnitt('reden',BZ_T.redenTitel,
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
    teile.kontakte=abschnitt('kontakte', thema==='reibung'?BZ_T.kontakteTitelReibung
      :(thema==='naehe'?BZ_T.kontakteTitelNaehe:BZ_T.kontakteTitel), kt, Z);
  }

  /* Streit */
  if(!tier){
    var sb=zi(B.Mars);
    teile.streit=abschnitt('streit',BZ_T.streitTitel,
      '<p>'+BZ_FUELL(BZ_T.streitB,{b:esc(nB), t:STREIT[sb][0]})+'</p>'+
      '<p>'+BZ_FUELL(BZ_T.streitHilft,{t:STREIT[sb][1]})+'</p>'+
      (R.eltern?'<p class="bz-leise">'+BZ_T.streitEltern+'</p>':''), Z);
  }

  /* Helfen */
  if(!tier){
    teile.helfen=abschnitt('helfen',BZ_T.helfenTitel,
      '<p>'+HELFEN[mb]+'</p>'+
      '<p class="bz-leise">'+BZ_FUELL(BZ_T.helfenHinweis,
        {a:HELFEN[ma], folge:(ma===mb?BZ_T.helfenGleich:BZ_T.helfenAnders)})+'</p>', Z);
  }

  /* Wo ihr im Leben des anderen landet, in beide Richtungen */
  if(S) teile.haeuser=abschnitt('haeuser',BZS_T.haeuserTitel, bzsHaeuser(S,nA,nB,n), Z);

  /* Das gemeinsame Bild und die chinesische Ebene */
  if(S) teile.composite=abschnitt('composite',BZS_T.compTitel, bzsComposite(S,n), Z);
  if(K) teile.china=abschnitt('china',BZS_T.chinaTitel, bzsChina(K,S,nA,nB,R,n), Z);

  /* Was gerade läuft */
  teile.jetzt=abschnitt('jetzt',BZ_T.jetztTitel, jetztText(A,B,nA,nB,R,n), Z);
  if(S) teile.taugt=abschnitt('taugt',BZS_T.taugtTitel, bzsTaugt(), Z);

  Z.forEach(function(id){ if(teile[id]) h+=teile[id]; });
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
  if(!treffer.length) return '<p>'+(n<=0?BZ_T.jetztLeer0:BZ_T.jetztLeer)+'</p>';
  var l=treffer.slice(0,3).map(function(x){
    /* Der Besitz steht als Name da und nicht als „dein": die Zeile
       spricht über einen der beiden, nicht über die Leserin. */
    var was = n<=0
      ? BZ_FUELL(BZ_T.jetztWas0,{bs:esc(bes(x.wen)), punkt:bzWort(x.k,n)})
      : n<=1
      ? BZ_FUELL(BZ_T.jetztWas,{wander:x.t, bs:esc(bes(x.wen)), punkt:bzWort(x.k,n)})
      : BZ_FUELL(BZ_T.jetztWasTech,{wander:x.t, typ:x.typ, bs:esc(bes(x.wen)), punkt:x.k})+
        (n>=3?BZ_FUELL(BZ_T.ktOrb,{orb:x.orb.toFixed(1)}):'');
    return BZ_FUELL(BZ_T.jetztZeile,
      {was:was, folge:(x.art==='h'?BZ_T.jetztHart:BZ_T.jetztWeich)});
  }).join('');
  return '<p>'+BZ_T.jetztVor+'</p><ul class="bz-liste">'+l+'</ul>'+
    '<p class="bz-leise">'+(n<=0?BZ_T.jetztHinweis0:BZ_T.jetztHinweis)+'</p>';
}

/* ── Die Seelenebene ──────────────────────────────────────────
   Rechnet nichts selbst: bzrSeele und bzrChina aus
   beziehung-rechner.js liefern alles, die Texte stehen in
   beziehung-seele-daten.js. */
var BZS_FE=String.fromCharCode(0xFE0E);
/* Ein Attribut. So beginnt kein Textstück mit einem Anführungszeichen
   und einer Klassenliste, die der Satzriegel für Sprache hält. */
function bzsAt(n,v){ return ' '+n+'="'+esc(v)+'"'; }
function bzsGl(k){ return BZS_GL[k] ? BZS_GL[k]+BZS_FE : ''; }

/* Ein Punkt als Wort, je nach Stufe */
function bzsWort(k,n){
  if(BZS_PKT[k]) return n>=BZS_PKT[k].ab ? BZS_PKT[k].n : BZS_PKT[k].w0;
  return bzWort(k,n);
}
function bzsPunkte(s){
  var h=''; for(var i=1;i<=5;i++) h+='<i class="'+(i<=s?'an':'')+'"></i>';
  return '<span class="bs-dots" aria-label="'+esc(BZ_FUELL(BZS_T.markerPunkte,{n:s}))+'">'+h+'</span>';
}
function bzsNamen(h,nA,nB){ return h.wer==='A' ? [nA,nB] : [nB,nA]; }

/* Eine Treffer-Zeile */
function bzsTreffer(h,nA,nB,n){
  var nm=bzsNamen(h,nA,nB);
  if(h.typ==='Haus'){
    return BZ_FUELL(BZS_T.markerHaus,{a:esc(bes(nm[0])), pa:bzsWort(h.x,n),
      bereich:INHAUS[h.haus-1], b:esc(nm[1])})+
      (n>=2?BZ_FUELL(BZS_T.markerHausTech,{h:h.haus}):'');
  }
  if(n<=1) return BZ_FUELL(BZS_T.markerTreffer,{a:esc(bes(nm[0])), pa:bzsWort(h.x,n),
    b:esc(bes(nm[1])), pb:bzsWort(h.y,n)});
  return BZ_FUELL(BZS_T.markerTrefferTech,{a:esc(bes(nm[0])), pa:bzsWort(h.x,n), typ:h.typ,
    b:esc(bes(nm[1])), pb:bzsWort(h.y,n)})+
    (n>=3?BZ_FUELL(BZS_T.markerOrb,{orb:h.orb.toFixed(1).replace('.',',')}):'');
}

/* Welche Marker tragen eine Ebene am stärksten */
var BZS_TEILMARKER={lichterEng:'lichter',lichterHart:'lichter',lichterWeich:'lichter',
  venusmarsWeich:'venusmars',venusmarsHart:'venusmars',saturnWeich:'saturn'};
function bzsTraeger(S,e){
  var g=BZR_EBENE[e], by={}, l=[];
  S.marker.forEach(function(m){ by[m.k]=m; });
  Object.keys(g).forEach(function(k){
    var mk=BZS_TEILMARKER[k]||k, m=by[mk];
    if(!m || !BZS_MARKER[mk]) return;
    var ex=l.filter(function(x){return x.k===mk;})[0], w=g[k]*m.staerke;
    if(ex){ ex.w=Math.max(ex.w,w); } else l.push({k:mk, w:w});
  });
  l.sort(function(a,b){return b.w-a.w;});
  return l.slice(0,4);
}

function bzsSeele(S,nA,nB,n,R,rollenKey){
  var haupt=S.rang[0], zweit=S.rang[1], E=BZS_EBENE[haupt];
  var ph=S.perz[haupt]||0, pz=S.perz[zweit]||0;
  var h='<div class="bs-k">'+BZS_T.seeleKicker+'</div>'+
    '<h3>'+BZS_T.seeleTitel+'</h3>'+
    '<p class="bs-vor">'+esc(BZ_FUELL(BZS_T.seeleVor,{a:nA,b:nB}))+'</p>'+
    '<div class="bs-haupt"><span class="bs-l">'+BZS_T.seeleHauptVor+'</span>'+
    '<b class="bs-name">'+E.name+'</b><span class="bs-kurz">'+E.kurz+'</span></div>';
  if(pz>=ph-8 && pz>=75)
    h+='<p class="bs-neben">'+BZ_FUELL(BZS_T.seeleNeben,{name:BZS_EBENE[zweit].name})+'</p>';
  h+='<div class="bs-balken">';
  S.rang.forEach(function(e){
    var p=S.perz[e]||0;
    h+='<div class="bs-zeile'+(e===haupt?' haupt':'')+'"><span class="bs-en">'+BZS_EBENE[e].name+'</span>'+
      '<span class="bs-bar"><i style="width:'+Math.max(3,p)+'%"></i></span>'+
      '<span class="bs-p">'+BZ_FUELL(BZS_T.seeleBalken,{p:p})+'</span></div>';
  });
  h+='</div><p class="bs-hin">'+BZS_T.seeleBalkenHinweis+'</p>';
  var dp=S.dichtePerz||0;
  h+='<p class="bs-dicht">'+BZ_FUELL(BZS_T.seeleDichte,{p:dp,
    folge:dp>=85?BZS_T.seeleDichteHoch:(dp>=35?BZS_T.seeleDichteMittel:BZS_T.seeleDichteNiedrig)})+'</p>';
  h+='<div class="bs-deut">'+
    [['labWesen','wesen'],['labZeichen','zeichen'],['labAufgabe','aufgabe'],['labSchatten','schatten']].map(function(x){
      return '<div class="bs-d"><span class="bs-dl">'+BZS_T[x[0]]+'</span><p>'+E[x[1]]+'</p></div>';
    }).join('')+
    '<div class="bs-frage"><span class="bs-dl">'+BZS_T.labFrage+'</span><p>'+E.frage+'</p></div></div>';
  var tr=bzsTraeger(S,haupt);
  if(tr.length){
    h+='<div class="bs-warum"><span class="bs-dl">'+BZS_T.seeleWarum+'</span><div class="bs-chips">'+
      tr.map(function(x){ return '<a class="bs-chip" href="#mk-'+x.k+'">'+
        (n>=1?BZS_MARKER[x.k].n:BZS_MARKER[x.k].n0)+'</a>'; }).join('')+'</div></div>';
  }
  if(rollenKey && BZS_ROLLE[rollenKey]) h+='<p class="bs-rolle">'+BZS_ROLLE[rollenKey]+'</p>';
  if(!S.zeit){
    var ohne=[]; if(!S.A._zeit) ohne.push(nA); if(!S.B._zeit) ohne.push(nB);
    h+='<p class="bs-hin">'+BZ_FUELL(BZS_T.seeleOhneZeit,{wer:esc(ohne.join(BZ_T.ohneZeitUnd))})+'</p>';
  }
  return '<section class="bz-seele" id="seele">'+h+'</section>';
}

function bzsMarker(S,nA,nB,n){
  var by={}; S.marker.forEach(function(m){ by[m.k]=m; });
  var H=(typeof BZR_HAEUFIG!=='undefined')?BZR_HAEUFIG:{};
  var h='<p>'+BZS_T.markerVor+'</p><div class="bs-marker">', fehlt=[];
  BZS_MARKER_FOLGE.forEach(function(k){
    var m=by[k], T=BZS_MARKER[k];
    if(!m){ fehlt.push(n>=1?T.n:T.n0); return; }
    var best=m.hits[0], hart=best.hart&&T.hart;
    var anteil=H[k]===undefined?null:Math.round(H[k]/10);
    h+='<div'+bzsAt('class','bs-mk '+(best.typ==='Haus'?'eng':(best.hart?'hart':(best.w===0?'eng':'weich'))))+bzsAt('id','mk-'+k)+'>'+
      '<div class="bs-mkopf">'+bzsPunkte(m.staerke)+
        '<div><b>'+(n>=1?T.n:T.n0)+'</b>'+(n>=1?'<span class="bs-n0">'+T.n0+'</span>':'')+'</div></div>'+
      '<p class="bs-was">'+T.was+'</p>'+
      '<p>'+(hart?T.hart:T.sinn)+'</p>'+
      '<ul class="bs-hits">'+m.hits.slice(0,3).map(function(x){
        return '<li class="'+(x.typ==='Haus'?'eng':(x.hart?'hart':'weich'))+'">'+bzsTreffer(x,nA,nB,n)+'</li>'; }).join('')+'</ul>'+
      (anteil!==null?'<p class="bs-oft">'+(anteil<2?BZS_T.markerSelten:BZ_FUELL(BZS_T.markerHaeufig,{n:anteil}))+'</p>':'')+
      '</div>';
  });
  h+='</div>';
  if(fehlt.length) h+='<p class="bz-leise">'+BZS_T.markerFehltVor+' '+esc(fehlt.join(' · '))+'</p>';
  return h;
}

/* ── Das Doppelrad ─────────────────────────────────────── */
var BZS_RADPUNKTE=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto','Nordknoten','Juno','Chiron'];
function bzsSpreizen(C,keys,gap){
  var out={}; keys.forEach(function(k){ if(C[k]!==undefined) out[k]=C[k]; });
  var ks=Object.keys(out);
  for(var r=0;r<200;r++){
    ks.sort(function(a,b){return out[a]-out[b];}); var bewegt=false;
    for(var i=0;i<ks.length;i++){
      var a=ks[i], b=ks[(i+1)%ks.length], d=bzrNrm(out[b]-out[a]);
      if(ks.length>1 && d<gap){ out[a]-=(gap-d)/2+0.05; out[b]+=(gap-d)/2+0.05; bewegt=true; }
    }
    if(!bewegt) break;
  }
  return out;
}
function bzsRad(S,nA,nB){
  var A=S.A, B=S.B, c=170, links=(A.ASC!==undefined?A.ASC:0);
  function xy(l,r){ var w=(180+(l-links))*Math.PI/180; return [c+r*Math.cos(w), c-r*Math.sin(w)]; }
  function f(x){ return x.toFixed(1); }
  var s='<svg viewBox="0 0 340 340" class="bs-rad" role="img" aria-label="'+esc(BZS_T.radTitel)+'">';
  s+='<circle cx="170" cy="170" r="164" class="r-aussen"/><circle cx="170" cy="170" r="142" class="r-ring"/>'+
     '<circle cx="170" cy="170" r="112" class="r-mitte"/><circle cx="170" cy="170" r="84" class="r-innen"/>';
  for(var z=0;z<12;z++){
    var p1=xy(z*30,142), p2=xy(z*30,164), g=xy(z*30+15,153);
    s+='<line'+bzsAt('x1',f(p1[0]))+bzsAt('y1',f(p1[1]))+bzsAt('x2',f(p2[0]))+bzsAt('y2',f(p2[1]))+bzsAt('class','r-strich')+'/>'+
       '<text x="'+f(g[0])+'" y="'+f(g[1])+'" class="r-z">'+BZS_ZGL[z]+BZS_FE+'</text>';
  }
  if(A.ASC!==undefined){ var a1=xy(A.ASC,84), a2=xy(A.ASC,164);
    s+='<line'+bzsAt('x1',f(a1[0]))+bzsAt('y1',f(a1[1]))+bzsAt('x2',f(a2[0]))+bzsAt('y2',f(a2[1]))+bzsAt('class','r-achse')+'/>'; }
  /* Linien: der engste Treffer je Marker, wenn beide Punkte im Rad stehen */
  S.marker.forEach(function(m){
    var h=m.hits.filter(function(x){ return x.typ!=='Haus' &&
      BZS_RADPUNKTE.indexOf(x.x)>=0 && BZS_RADPUNKTE.indexOf(x.y)>=0; })[0];
    if(!h) return;
    var pa=h.wer==='A'?A[h.x]:A[h.y], pb=h.wer==='A'?B[h.y]:B[h.x];
    if(pa===undefined||pb===undefined) return;
    var q1=xy(pa,84), q2=xy(pb,84);
    s+='<line x1="'+f(q1[0])+'" y1="'+f(q1[1])+'" x2="'+f(q2[0])+'" y2="'+f(q2[1])+'" class="r-l '+
      (h.w===0?'eng':(h.hart?'hart':'weich'))+'"/>';
  });
  [[A,98,'innen'],[B,127,'aussen']].forEach(function(x){
    var C=x[0], sp=bzsSpreizen(C,BZS_RADPUNKTE,10);
    Object.keys(sp).forEach(function(k){
      var t=xy(C[k],x[1]===98?84:112), g=xy(sp[k],x[1]);
      s+='<circle'+bzsAt('cx',f(t[0]))+bzsAt('cy',f(t[1]))+bzsAt('r','2')+bzsAt('class','r-pkt '+x[2])+'/>'+
         '<text x="'+f(g[0])+'" y="'+f(g[1])+'" class="r-g '+x[2]+'">'+bzsGl(k)+'</text>';
    });
  });
  s+='</svg>';
  return '<div class="bs-radbox">'+s+'<div class="bs-leg">'+
    '<span><i class="pk innen"></i>'+esc(BZS_T.radInnen)+': '+esc(nA)+'</span>'+
    '<span><i class="pk aussen"></i>'+esc(BZS_T.radAussen)+': '+esc(nB)+'</span>'+
    '<span><i class="ln eng"></i>'+BZS_T.radLinieEng+'</span>'+
    '<span><i class="ln weich"></i>'+BZS_T.radLinieWeich+'</span>'+
    '<span><i class="ln hart"></i>'+BZS_T.radLinieHart+'</span></div>'+
    '<p class="bz-leise">'+BZS_T.radHinweis+'</p></div>';
}

/* ── Häuser in beide Richtungen ─────────────────────────── */
var BZS_HPUNKTE=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Juno'];
function bzsHaeuser(S,nA,nB,n){
  var A=S.A, B=S.B;
  if(A.ASC===undefined||B.ASC===undefined){
    var ohne=[]; if(!A._zeit) ohne.push(nA); if(!B._zeit) ohne.push(nB);
    return '<p class="bz-leise">'+BZ_FUELL(BZS_T.haeuserOhneZeit,{wer:esc(ohne.join(BZ_T.ohneZeitUnd))})+'</p>';
  }
  function spalte(X,Y,nx,ny){
    return '<div class="bs-hsp"><div class="bs-hk">'+esc(BZ_FUELL(BZS_T.haeuserSpalte,{a:nx,b:ny}))+'</div><ul>'+
      BZS_HPUNKTE.filter(function(k){return X[k]!==undefined;}).map(function(k){
        var hs=bzrHaus(Y,X[k]);
        return '<li class="'+([7,8,12].indexOf(hs)>=0?'tief':'')+'">'+
          BZ_FUELL(BZS_T.haeuserZeile,{punkt:gross(bzsWort(k,n)), bereich:INHAUS[hs-1]})+
          (n>=2?BZ_FUELL(BZS_T.haeuserHausTech,{h:hs}):'')+'</li>';
      }).join('')+'</ul></div>';
  }
  var h='<p>'+BZS_T.haeuserVor+'</p><div class="bs-haus">'+spalte(A,B,nA,nB)+spalte(B,A,nB,nA)+'</div>'+
    '<p class="bz-leise">'+BZS_T.haeuserTiefHinweis+'</p>';
  if(A.Juno!==undefined&&B.Juno!==undefined&&[7,8].indexOf(bzrHaus(B,A.Juno))>=0&&[7,8].indexOf(bzrHaus(A,B.Juno))>=0)
    h+='<p class="bs-spiegel">'+BZS_T.haeuserJuno+'</p>';
  return h;
}

/* ── Das gemeinsame Bild ─────────────────────────────────── */
function bzsComposite(S,n){
  var C=S.composite, zs=zi(C.Sonne), zm=zi(C.Mond);
  var h='<p>'+BZS_T.compVor+'</p>'+
    '<p class="bs-comp">'+BZ_FUELL(BZS_T.compSonne,{t:BZS_COMP_SONNE[zs]})+'</p>'+
    '<p class="bs-comp">'+BZ_FUELL(BZS_T.compMond,{t:BZS_COMP_MOND[zm%4]})+'</p>';
  if(n>=2) h+='<p class="bz-leise">'+BZ_FUELL(BZS_T.compTech,{zs:ZN[zs], zm:ZN[zm],
    asc:(C.ASC!==undefined?BZ_FUELL(BZS_T.compTechAsc,{z:ZN[zi(C.ASC)]}):'')})+'</p>';
  var ks=S.compKontakte.slice(0,3).filter(function(o){ var d=BZS_COMP[o.k]; return d&&(o.hart?(d.h||d.w):(d.w||d.h)); });
  if(ks.length){
    h+='<p>'+BZS_T.compKontakteVor+'</p><div class="bs-cks">'+ks.map(function(o){
      var d=BZS_COMP[o.k], t=o.hart?(d.h||d.w):(d.w||d.h);
      return '<div class="bs-ck '+(o.hart?'hart':'weich')+'"><b>'+d.n0+'</b><p>'+t+'</p>'+
        (n>=2?'<span class="bs-tech">'+BZ_FUELL(BZS_T.compKontaktTech,{x:o.x, typ:o.typ, y:o.y,
          orb:(n>=3?BZ_FUELL(BZS_T.markerOrb,{orb:o.orb.toFixed(1).replace('.',',')}):'')})+'</span>':'')+'</div>';
    }).join('')+'</div>';
  }
  return h;
}

/* ── Die chinesische Ebene ──────────────────────────────── */
function bzsChinaRad(K){
  var B=window.AC_BAZI, c=130, s='<svg viewBox="0 0 260 260" class="bs-crad" role="img" aria-label="'+esc(BZS_T.chinaTiereTitel)+'">';
  function xy(i,r){ var w=(90-i*30)*Math.PI/180; return [c+r*Math.cos(w), c-r*Math.sin(w)]; }
  function f(x){ return x.toFixed(1); }
  s+='<circle cx="130" cy="130" r="78" class="c-ring"/>';
  if(K.sanhe>=0){ var g=BZR_SANHE[K.sanhe].map(function(i){return xy(i,78);});
    s+='<polygon'+bzsAt('points',g.map(function(p){return f(p[0])+','+f(p[1]);}).join(' '))+bzsAt('class','c-drei')+'/>'; }
  var pa=xy(K.a.tier,78), pb=xy(K.b.tier,78), ton=BZS_TIERE[K.tiere].ton;
  if(K.a.tier!==K.b.tier) s+='<line x1="'+f(pa[0])+'" y1="'+f(pa[1])+'" x2="'+f(pb[0])+'" y2="'+f(pb[1])+'" class="c-l '+ton+'"/>';
  for(var i=0;i<12;i++){
    var p=xy(i,78), an=(i===K.a.tier||i===K.b.tier);
    s+='<circle'+bzsAt('cx',f(p[0]))+bzsAt('cy',f(p[1]))+bzsAt('r',an?15:11)+bzsAt('class',an?'c-pkt an':'c-pkt')+'/>'+
       '<text'+bzsAt('x',f(p[0]))+bzsAt('y',f(p[1]+1))+bzsAt('class',an?'c-zei an':'c-zei')+'>'+B.ZWEIG[i]+'</text>';
    var q=xy(i,104);
    s+='<text'+bzsAt('x',f(q[0]))+bzsAt('y',f(q[1]))+bzsAt('class',an?'c-name an':'c-name')+'>'+B.TIER[i]+'</text>';
  }
  return s+'</svg>';
}
function bzsChina(K,S,nA,nB,R,n){
  var B=window.AC_BAZI;
  function karte(x,name){
    return '<div class="bs-ckarte"><span class="bs-ctier">'+B.ZWEIG[x.tier]+'</span>'+
      '<b>'+esc(name)+'</b><span class="bs-cel">'+BZ_FUELL(BZS_T.chinaJahr,{yy:x.yy, el:x.element, tier:B.TIER[x.tier]})+'</span>'+
      '<p>'+BZ_FUELL(BZS_T.chinaTierZeile,{tier:B.TIER[x.tier], wesen:BZS_TIER[x.tier]})+'</p>'+
      '<p>'+BZ_FUELL(BZS_T.chinaElementZeile,{el:x.element, wesen:BZS_ELEMENT[x.element]})+'</p>'+
      (x.abweichend?'<p class="bz-leise">'+esc(BZ_FUELL(BZS_T.chinaAbw,{name:name, tier:B.TIER[x.baziTier]}))+'</p>':
        (x.grenznah?'<p class="bz-leise">'+esc(BZ_FUELL(BZS_T.chinaGrenz,{name:name}))+'</p>':''))+'</div>';
  }
  var T=BZS_TIERE[K.tiere];
  var h='<p>'+BZS_T.chinaVor+'</p><div class="bs-cpaar">'+karte(K.a,nA)+karte(K.b,nB)+'</div>'+
    '<div class="bs-cbez">'+bzsChinaRad(K)+'<div><span class="bs-dl">'+BZS_T.chinaTiereTitel+'</span>'+
    '<b class="bs-ctitel '+T.ton+'">'+T.n+'</b><p>'+BZ_FUELL(T.t,{gruppe:(K.sanhe>=0?BZS_SANHE[K.sanhe]:'')})+'</p></div></div>';
  /* Tagesmeister */
  var tg, D=BZS_TAG;
  if(K.tagStamm==='wuhe'||K.tagStamm==='gleich'){
    tg={n:D[K.tagStamm].n, ton:D[K.tagStamm].ton, t:BZ_FUELL(D[K.tagStamm].t,{el:K.a.tag.el})};
  } else {
    var aGibt=(K.tagStamm==='anaehrtb'||K.tagStamm==='abremstb'), art=(K.tagStamm.indexOf('naehrt')>=0)?'naehrt':'bremst';
    var g=aGibt?nA:nB, nn=aGibt?nB:nA, eg=aGibt?K.a.tag.el:K.b.tag.el, en=aGibt?K.b.tag.el:K.a.tag.el;
    var w={g:esc(g), n:esc(nn), gs:esc(bes(g)), ns:esc(bes(nn)), eg:eg, en:en};
    tg={n:BZ_FUELL(D[art].n,w), ton:D[art].ton, t:BZ_FUELL(D[art].t,w)};
  }
  h+='<div class="bs-cblock"><span class="bs-dl">'+BZS_T.chinaTagTitel+'</span><p class="bz-leise">'+BZS_T.chinaTagVor+'</p>'+
    '<p>'+BZ_FUELL(BZS_T.chinaTagZeile,{name:esc(nA), yy:K.a.tag.yy, el:K.a.tag.el})+' &middot; '+
    BZ_FUELL(BZS_T.chinaTagZeile,{name:esc(nB), yy:K.b.tag.yy, el:K.b.tag.el})+'</p>'+
    '<b class="bs-ctitel '+tg.ton+'">'+tg.n+'</b><p>'+tg.t+'</p>'+
    ((K.a.tagUnsicher||K.b.tagUnsicher)?'<p class="bz-leise">'+BZS_T.chinaTagOhneZeit+'</p>':'')+'</div>';
  /* Palast der Partnerschaft: nur, wo es um Partnerschaft gehen kann */
  if(R.romantisch||rolle==='sonstige'){
    h+='<div class="bs-cblock"><span class="bs-dl">'+BZS_T.chinaPalastTitel+'</span><p class="bz-leise">'+BZS_T.chinaPalastVor+'</p>'+
      '<p>'+BZ_FUELL(BZS_T.chinaPalastZeile,{name:esc(nA), tier:B.TIER[K.a.tag.z]})+' &middot; '+
      BZ_FUELL(BZS_T.chinaPalastZeile,{name:esc(nB), tier:B.TIER[K.b.tag.z]})+'</p>'+
      '<b class="bs-ctitel '+BZS_TIERE[K.palast].ton+'">'+BZS_TIERE[K.palast].n+'</b><p>'+BZS_PALAST[K.palast]+'</p></div>';
  }
  /* Beide Ebenen nebeneinander */
  var w0=S.rang[0], chHarm=(T.ton==='weich'||T.ton==='eng'||K.tagStamm==='wuhe'||K.tagStamm==='anaehrtb'||K.tagStamm==='bnaehrta');
  var chSpann=(T.ton==='hart'||K.tagStamm==='abremstb'||K.tagStamm==='bbremsta');
  var ek;
  if((w0==='seelenverwandt'||w0==='seelenfamilie')&&chHarm&&!chSpann) ek=BZS_T.chinaEinklangHarmonie;
  else if((w0==='dualseele'||w0==='karmisch')&&chSpann) ek=BZS_T.chinaEinklangSpannung;
  else if(w0==='dualseele'&&chHarm) ek=BZS_T.chinaEinklangGrund;
  else ek=BZS_T.chinaEinklangGemischt;
  h+='<p class="bs-spiegel">'+BZ_FUELL(BZS_T.chinaEinklang,{t:ek})+'</p>';
  return h;
}

function bzsTaugt(){
  return '<ul class="bs-taugt">'+BZS_T.taugt.map(function(t){return '<li>'+t+'</li>';}).join('')+'</ul>';
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
  /* Die alten Synastrie-Adressen springen auf eine Klappe: die geht auf */
  function klappe(){ var d=location.hash&&document.getElementById(location.hash.slice(1));
    if(d&&d.tagName==='DETAILS') d.open=true; }
  klappe(); window.addEventListener('hashchange',klappe);
  el('bzkopie').addEventListener('click',kopieren);
  el('bzdruck').addEventListener('click',function(){ window.print(); });
  window.addEventListener('ac-niveau',zeigen);
}
start();
