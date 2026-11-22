/* Astro-Charlie · Dossier — Rechnung und Darstellung
   ──────────────────────────────────────────────────────────────
   Hier steht kein Satz. Die Vorlagen stehen in DO_T
   (dossier-texte.js), `doFuell` setzt ein (Aufgabe 60, aus 34
   und 38). `bau-dossier.py` bricht ab, sobald hier wieder eine
   Zeichenkette mit Sprache auftaucht — und auch dann, wenn eine
   Form an eine Zahl oder einen Namen geklebt wird.

   Was in der Anzeige steht, zieht beim Umzug in eine andere
   Umgebung nicht mit (PRODUKT.md Abschnitt 7). Deshalb liegt hier
   nur das Gerüst: Klassen, Tags und die Zahlen aus der Rechnung. */
function nrm(x){x=x%360;return x<0?x+360:x;}
function el(i){ return document.getElementById(i); }
function esc(s){ return String(s===undefined||s===null?'':s).replace(/[<>&"]/g,function(c){
 return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }
function kz(x,n){ return x.toFixed(n===undefined?1:n).replace('.',','); }
function zi(l){ return Math.floor(nrm(l)/30); }
function fmt(l){ l=nrm(l); var r=l-Math.floor(l/30)*30, g=Math.floor(r), m=Math.round((r-g)*60);
 if(m===60){g++;m=0;} return g+'° '+SIGNS[zi(l)]+' '+(m<10?'0':'')+m+'′'; }
function elemVon(z){ return ELN[z%4]; }

/* ── Sätze einsetzen ──────────────────────────────────────── */
var DT=DO_T;
/* Eine Lücke `{so}` je Schlüssel, in einem Durchgang.

   Ein Wert, den es nicht gibt, bricht hier ab und wird nicht zu
   einer leeren Stelle. Beim Umzug ist genau das einmal passiert:
   Der Winkelname der Raum-Rechnung heißt „Sextil", nachgeschlagen
   wurde unter „sextil" — und aus „Saturn Sextil Sonne" wurde
   lautlos „Saturn  Sonne". Eine Tafel, die den Schlüssel nicht
   kennt, liefert `undefined`; wer das zu '' macht, verliert ein
   Wort, ohne dass etwas rot wird (dieselbe Klasse wie REGELN.md
   6f). Deshalb ist das hier ein Abbruch und kein Notbehelf. */
/* Gefüllt wird an einer Stelle: AC_FUELL in kern/fuellen.js.
   Ein fehlender Wert bricht dort ab, statt lautlos zu
   verschwinden (Aufgabe 94). */
function doFuell(form,werte){ return AC_FUELL(form,werte); }
/* „7. Haus" an einer Stelle: die Zahl rechnet, das Hauptwort steht
   in DO_T. Nichts davon wird hier zusammengeklebt. */
function doHaus(n){ return doFuell(DT.haus,{n:n}); }
/* Der Name des Winkels kommt aus der Sprachtafel, nicht aus der
   eigenen Rechnung — die kennt nur den Schlüssel. Was AC_RAUM in
   `f.aspekte` liefert, trägt seinen Namen schon mit und wird
   durchgereicht, nicht zweimal nachgeschlagen. */
function doWinkel(k){ return DT.winkel[k]; }

function wuerde(pl,z){
  var d=DOMIZIL[pl];
  if(d&&d.indexOf(z)>=0) return 'domizil';
  if(ERHOEHUNG[pl]===z) return 'erhoehung';
  var ex=!!(d&&d.indexOf((z+6)%12)>=0), fa=(ERHOEHUNG[pl]===((z+6)%12));
  if(ex&&fa) return 'exilfall';
  return ex?'exil':(fa?'fall':'');
}

/* ── Chart ────────────────────────────────────────────────── */
function chartVon(p){ return AC_RAUM.chart(p); }
function haus(P,l){ return ((Math.floor(nrm(l)/30)-Math.floor(nrm(P.ASC)/30))%12+12)%12+1; }
function zeichenDesHauses(P,h){ return (Math.floor(nrm(P.ASC)/30)+h-1)%12; }

/* Der Winkel rechnet und gibt einen Schlüssel zurück. Wie er heißt,
   entscheidet DO_T.winkel. */
var WINKEL=[[0,'konjunktion','weich'],[180,'opposition','hart'],[90,'quadrat','hart'],
 [120,'trigon','weich'],[60,'sextil','weich']];
function aspekt(P,a,b,orb){
  if(P[a]===undefined||P[b]===undefined||P[a]===null||P[b]===null) return null;
  var d=Math.abs(nrm(P[a]-P[b])); if(d>180) d=360-d;
  for(var i=0;i<WINKEL.length;i++){
    var W=WINKEL[i], o=Math.abs(d-W[0]), max=(W[0]===60?Math.min(orb||6,5):(orb||6));
    if(o<=max) return {typ:W[1],art:W[2],o:o};
  }
  return null;
}

/* ── Zustand: Profil, Bezug ───────────────────────────────── */
var gewaehlt=null, bezug='klientin';
var SCHL='ac_dossier_bezug';           /* {profilId: bezugsschlüssel} */

function bezugLesen(){
  try{ return JSON.parse(localStorage.getItem(SCHL))||{}; }catch(e){ return {}; }
}
function bezugSchreiben(pid,b){
  try{ var d=bezugLesen(); d[pid]=b; localStorage.setItem(SCHL,JSON.stringify(d)); }catch(e){}
}
function profil(){
  var alle=[]; try{ alle=AC_P.alle()||[]; }catch(e){}
  if(!alle.length) return null;
  if(!gewaehlt){ var e=alle.filter(function(p){return p.eigen;})[0]||alle[0]; gewaehlt=e.id; }
  return alle.filter(function(x){return x.id===gewaehlt;})[0]||null;
}
/* Bezug: gespeicherte Wahl, sonst „du selbst" fürs eigene Profil,
   sonst die Rolle aus beziehung.html, sonst Klientin */
function bezugFuer(p){
  if(!p) return 'klientin';
  var d=bezugLesen();
  if(d[p.id] && BEZUG[d[p.id]]) return d[p.id];
  if(p.eigen) return 'selbst';
  try{
    var r=JSON.parse(localStorage.getItem('ac_rolle_profile')||'{}')[p.id];
    if(r && BEZUG[r]) return r;
    if(r==='freundschaft') return 'freundin';
    if(r==='kollegin') return 'kollegin';
  }catch(e){}
  return 'klientin';
}

/* ── Kopf ─────────────────────────────────────────────────── */
function bauKopf(P,p,B){
  var nm=AC_P.anzeige(p,AC_P.zeigeNamen());
  var zS=zi(P.Sonne), zM=zi(P.Mond), zA=zi(P.ASC);
  var hp=HERR[zA], hpH=(P[hp]!==undefined)?haus(P,P[hp]):null;
  var h='<div class="do-kopf"><div class="lab">'+doFuell(DT.kopfLabel,{bezug:esc(B.n)})+'</div>'+
    '<h2>'+esc(nm)+'</h2>'+
    '<div class="dat">'+doFuell(DT.kopfDatum,{d:p.d,mo:p.mo,y:p.y,
      h:('0'+p.h).slice(-2),mi:('0'+p.mi).slice(-2),ort:esc(p.ort||'')})+'</div>'+
    '<div class="do-drei">'+
     '<div class="do-d"><div class="k">'+DT.kopfSonne+'</div><div class="v">'+SIGNS[zS]+'</div>'+
       '<div class="z">'+doFuell(DT.kopfHaus,{n:haus(P,P.Sonne),
         kurz:HK[haus(P,P.Sonne)-1]})+'</div></div>'+
     '<div class="do-d"><div class="k">'+DT.kopfMond+'</div><div class="v">'+SIGNS[zM]+'</div>'+
       '<div class="z">'+doFuell(DT.kopfHaus,{n:haus(P,P.Mond),
         kurz:HK[haus(P,P.Mond)-1]})+'</div></div>'+
     '<div class="do-d"><div class="k">'+DT.kopfAsz+'</div><div class="v">'+SIGNS[zA]+'</div>'+
       '<div class="z">'+(hpH?doFuell(DT.kopfHerrImHaus,{pl:hp,n:hpH})
                             :doFuell(DT.kopfHerr,{pl:hp}))+'</div></div>'+
    '</div></div>';
  return h;
}

/* ── 0 · Deine Stellung ───────────────────────────────────── */
function bauStellung(B){
  var S=STELLUNG[B.klasse];
  return '<div class="do-ab do-stellung"><h3>'+DT.stellungTitel+'</h3>'+
   '<div class="sub7">'+DT.stellungSub+'</div>'+
   '<p class="bist">'+S.bist+'</p>'+
   '<div class="do-zwei">'+
    '<div class="dk gut"><b>'+DT.stellungDarfst+'</b>'+S.darfst+'</div>'+
    '<div class="dk warn"><b>'+DT.stellungNicht+'</b>'+S.nicht+'</div>'+
   '</div>'+
   '<div class="dk voll"><b>'+DT.stellungGefahr+'</b>'+S.gefahr+'</div></div>';
}

/* ── 1 · Wie die Person gebaut ist ────────────────────────── */
function bauBau(P,B){
  var zS=zi(P.Sonne), zM=zi(P.Mond), zA=zi(P.ASC);
  var hp=HERR[zA], hpH=(P[hp]!==undefined)?haus(P,P[hp]):null;
  var hpZ=(P[hp]!==undefined)?zi(P[hp]):null, hpW=(hpZ!==null)?wuerde(hp,hpZ):'';

  var gew={Sonne:3,Mond:3,ASC:3,MC:2,Merkur:2,Venus:2,Mars:2,Jupiter:1.5,Saturn:1.5,
   Uranus:1,Neptun:1,Pluto:1};
  var e=[0,0,0,0], m=[0,0,0];
  Object.keys(gew).forEach(function(k){ if(P[k]===undefined||P[k]===null) return;
    var z=zi(P[k]); e[z%4]+=gew[k]; m[z%3]+=gew[k]; });
  var eMax=e.indexOf(Math.max.apply(null,e)), eMin=e.indexOf(Math.min.apply(null,e));
  var mMax=m.indexOf(Math.max.apply(null,m));

  /* Lage: eckig / folgend / fallend */
  var lz={eckig:0,folgend:0,fallend:0};
  ['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'].forEach(function(k){
    if(P[k]===undefined||P[k]===null) return;
    var hh=haus(P,P[k]);
    if([1,4,7,10].indexOf(hh)>=0) lz.eckig++;
    else if([2,5,8,11].indexOf(hh)>=0) lz.folgend++;
    else lz.fallend++;
  });
  var lMax=Object.keys(lz).sort(function(a,b){return lz[b]-lz[a];})[0];

  var h='<div class="do-ab"><h3>'+DT.bauTitel+'</h3>'+
   '<div class="sub7">'+DT.bauSub+'</div>'+
   '<p>'+doFuell(DT.bauGrundton,{element:ELN[eMax],motus:MON[mMax],
     tutElement:DT.bauElement[eMax],tutMotus:DT.bauMotus[mMax],
     wenigsten:ELN[eMin]})+'</p>'+
   '<p>'+doFuell(DT.bauGewicht,{lage:LAGE[lMax].n,text:LAGE[lMax].t})+'</p>';

  /* Chartherrscher, mit Würde */
  h+='<p>'+doFuell(DT.herrKopf,{pl:hp})+
   (hpH?doFuell(DT.herrImHaus,{n:hpH,titel:HT[hpH-1]}):'')+
   (hpW?doFuell(DT.herrWuerde,{wuerde:WNAME[hpW]}):'')+
   doFuell(DT.herrSteuer,{ueber:(hpH?HK[hpH-1]:DT.herrPunkt)})+
   (hpW?doFuell(DT.herrDeut,{pron:DT.pron[hp],deutung:WDEUT[hpW]}):'')+'</p>';

  /* Sonne, Mond, Aszendent im Klartext */
  h+='<div class="do-zeilen">'+
   '<div class="dz"><span class="p">'+doFuell(DT.zeileSonne,{zeichen:SIGNS[zS]})+
     '</span><span class="t">'+doFuell(DT.zeileSonneT,{text:SONNE[zS]})+'</span></div>'+
   '<div class="dz"><span class="p">'+doFuell(DT.zeileMond,{zeichen:SIGNS[zM]})+
     '</span><span class="t">'+doFuell(DT.zeileMondT,{text:MOND[zM]})+'</span></div>'+
   '<div class="dz"><span class="p">'+doFuell(DT.zeileAsz,{zeichen:SIGNS[zA]})+
     '</span><span class="t">'+doFuell(DT.zeileAszT,{text:ASZ[zA]})+'</span></div>'+
   '</div>';
  var ab=Math.abs(nrm(P.Sonne-P.ASC)); if(ab>180) ab=360-ab;
  if(ab>100) h+='<p class="do-hin">'+ASZ_SONNE+'</p>';

  /* Sekte */
  var tag=(haus(P,P.Sonne)>=7), S=tag?SEKTE.tag:SEKTE.nacht;
  var raus=S.raus, rH=(P[raus]!==undefined)?haus(P,P[raus]):null;
  h+='<p class="ac-tech">'+doFuell(DT.sekteKopf,{name:S.n,text:S.t})+
   (rH?doFuell(DT.sekteRaus,{pl:raus,n:rH,titel:HT[rH-1]}):'')+'</p>';

  /* Mondphase */
  var ph=PHASE[Math.floor(nrm(P.Mond-P.Sonne)/45)];
  h+='<p>'+doFuell(DT.phase,{name:ph[0],text:ph[1]})+'</p>';
  h+='</div>';
  return h;
}

/* ── 2 · Umgang: Merkur, Venus, Mars ──────────────────────── */
function bauUmgang(P,B){
  var TAFEL={Merkur:MERKUR,Venus:VENUS,Mars:MARS};
  var h='<div class="do-ab"><h3>'+DT.umgangTitel+'</h3>'+
   '<div class="sub7">'+DT.umgangSub+'</div><div class="do-zeilen">';
  ['Merkur','Venus','Mars'].forEach(function(pl){
    if(P[pl]===undefined) return;
    var z=zi(P[pl]), w=wuerde(pl,z);
    h+='<div class="dz"><span class="p">'+doFuell(DT.umgangZeile,{pl:pl,zeichen:SIGNS[z]})+
      (w?doFuell(DT.umgangWuerde,{wuerde:WNAME[w]}):'')+'</span>'+
      '<span class="t">'+doFuell(DT.umgangText,{lab:DT.umgangLab[pl],
        text:TAFEL[pl][z]})+'</span></div>';
  });
  h+='</div>';
  /* Mond, im Licht des Bezugs */
  var MB=MOND_BEZUG[B.klasse], MT=MOND_TUN[B.klasse][elemVon(zi(P.Mond))];
  h+='<div class="do-mond"><div class="k">'+doFuell(DT.mondKopf,{ist:MB.ist})+'</div>'+
   '<p>'+MB.t+'</p>'+
   '<p>'+doFuell(DT.mondStellung,{zeichen:SIGNS[zi(P.Mond)],n:haus(P,P.Mond),
     titel:HT[haus(P,P.Mond)-1],text:MOND[zi(P.Mond)]})+'</p>'+
   '<div class="tun"><b>'+DT.mondTun+'</b>'+MT+'</div></div>';
  h+='</div>';
  return h;
}

/* ── 3 · Kernthemen, nach Bezug gewichtet ─────────────────── */
function bauThemen(P,B){
  var G=GEWICHT[B.klasse];
  var def={facetten:THEMEN.map(function(t){ return {name:t.n, anker:t.anker}; })};
  var res=[];
  try{ res=AC_RAUM.auswerten(P, def); }catch(e){ return ''; }
  /* Umgewichten: Häuser und Planeten, die dieser Bezug trägt, zählen mehr */
  res.forEach(function(r){
    var t=THEMEN.filter(function(x){return x.n===r.fc.name;})[0];
    var f=1;
    (t.anker.haeuser||[]).forEach(function(hh){ if(G.haus[hh]) f=Math.max(f,G.haus[hh]); });
    (t.anker.punkte||[]).forEach(function(pt){ if(G.punkt[pt]) f=Math.max(f,G.punkt[pt]); });
    r.sB=r.s*f; r.faktor=f; r.t=t;
  });
  res.sort(function(a,b){ return b.sB-a.sB; });
  var max=res.length?res[0].sB:1;
  res.forEach(function(r){ r.relB=max?Math.round(r.sB/max*100):0; });

  var h='<div class="do-ab"><h3>'+DT.themenTitel+'</h3>'+
   '<div class="sub7">'+DT.themenSub+'</div>'+
   '<div class="do-warum">'+doFuell(DT.themenWarum,{bezug:esc(B.n),warum:G.warum})+'</div>';
  res.slice(0,7).forEach(function(r){
    h+='<div class="do-bal"><div>'+r.t.n+(r.faktor>1?DT.balkenHoch:'')+
      '</div>'+doFuell(DT.balken,{leise:(r.relB<45?'leise':''),
        breite:Math.max(4,r.relB)})+
      '<div class="pz">'+r.relB+'</div></div>';
  });
  h+='</div>';
  res.slice(0,3).forEach(function(r,i){
    var bel=[];
    (r.f.planeten||[]).slice(0,4).forEach(function(y){
      bel.push(doFuell(DT.belPlanet,{pl:y.p,n:y.haus})); });
    (r.f.aspekte||[]).slice(0,2).forEach(function(y){
      bel.push(doFuell(DT.belAspekt,{a:y.a,typ:y.typ,b:y.b,orb:kz(y.o)})); });
    (r.f.achsnah||[]).slice(0,2).forEach(function(y){
      bel.push(doFuell(DT.belAchse,{pl:y.p,zu:y.zu})); });
    h+='<div class="do-kern"><div class="nr">'+
      doFuell(DT.kernNr,{i:(i+1),g:r.relB})+(r.faktor>1?DT.kernHoch:'')+'</div>'+
      '<div class="tt">'+r.t.n+'</div><p>'+r.t.kern+'</p>'+
      '<p><b>'+(DT.hebel[B.klasse]||DT.hebelSonst)+'</b> '+r.t.hilfe+'</p>'+
      (bel.length?'<div class="bel ac-tech">'+bel.join(DT.punkte)+'</div>':'')+
      doFuell(DT.raumLink,{s:r.t.s})+'</div>';
  });
  return h;
}

/* ── 4 · Die Häuser, die euch verbinden ───────────────────── */
function bauHaeuser(P,B){
  var h='<div class="do-ab"><h3>'+DT.haeuserTitel+'</h3>'+
   '<div class="sub7">'+DT.haeuserSub+'</div><div class="do-haeuser">';
  B.haus.forEach(function(hh){
    var z=zeichenDesHauses(P,hh), hr=HERR[z], hrH=(P[hr]!==undefined)?haus(P,P[hr]):null;
    var drin=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto','Chiron','Lilith']
      .filter(function(k){ return P[k]!==undefined&&P[k]!==null&&haus(P,P[k])===hh; });
    h+='<div class="dh"><div class="nr">'+doHaus(hh)+'</div>'+
      '<div class="na">'+HT[hh-1]+'</div>'+
      '<div class="ze">'+(hrH?doFuell(DT.hausZeichenHaus,{glyphe:GLY[z],zeichen:SIGNS[z],pl:hr,n:hrH})
                             :doFuell(DT.hausZeichen,{glyphe:GLY[z],zeichen:SIGNS[z],pl:hr}))+'</div>'+
      '<div class="be">'+(drin.length?drin.join(DT.komma)
        :doFuell(DT.hausLeer,{pl:hr,n:(hrH||'?')}))+'</div>'+
      '</div>';
  });
  h+='</div>';
  /* Die Planeten, über die dieser Bezug läuft */
  var pz=[];
  B.punkte.forEach(function(k){
    if(P[k]===undefined||P[k]===null) return;
    var z=zi(P[k]), w=(k==='ASC')?'':wuerde(k,z);
    pz.push('<li>'+doFuell(DT.punktZeile,{pl:k,zeichen:SIGNS[z]})+
      (k!=='ASC'?doFuell(DT.punktHaus,{n:haus(P,P[k])}):'')+
      (w?doFuell(DT.punktWuerde,{wuerde:WNAME[w],pron:DT.pron[k],
        deutung:WDEUT[w]}):'')+'</li>');
  });
  if(pz.length) h+='<p style="margin-top:14px">'+
    doFuell(DT.punkteKopf,{bezug:esc(B.n)})+'</p><ul class="do-li">'+pz.join('')+'</ul>';
  h+='</div>';
  return h;
}

/* ── 5 · Wo es klemmt — Saturn und Chiron, je nach Bezug ──── */
function bauKlemmt(P,B){
  var hs=haus(P,P.Saturn), zs=zi(P.Saturn), ws=wuerde('Saturn',zs);
  var h='<div class="do-ab"><h3>'+DT.klemmtTitel+'</h3>'+
   '<div class="sub7">'+DT.klemmtSub+'</div>'+
   '<div class="do-stell"><span class="p">'+
     doFuell(DT.stellPl,{pl:'Saturn',zeichen:SIGNS[zs]})+'</span>'+
     '<span class="f">'+doFuell(DT.stellHaus,{n:hs,titel:HT[hs-1]})+'</span>'+
     (ws?'<span class="o ac-tech">'+WNAME[ws]+'</span>':'')+'</div>'+
   '<p>'+SATURN_BEZUG[B.klasse]+'</p>'+
   '<p class="ac-tech">'+doFuell(DT.saturnTech,{titel:HT[hs-1]})+'</p>';

  if(P.Chiron!==undefined&&P.Chiron!==null){
    var hc=haus(P,P.Chiron);
    h+='<div class="do-stell"><span class="p">'+
      doFuell(DT.stellPl,{pl:'Chiron',zeichen:SIGNS[zi(P.Chiron)]})+'</span>'+
      '<span class="f">'+doFuell(DT.stellHaus,{n:hc,titel:HT[hc-1]})+'</span></div>'+
      '<p>'+CHIRON_BEZUG[B.klasse]+'</p>';
  }
  var hart=[];
  ['Sonne','Mond','Merkur','Venus','Mars'].forEach(function(a){
    ['Saturn','Pluto','Uranus','Neptun'].forEach(function(b){
      var x=aspekt(P,a,b,6);
      if(x&&x.art==='hart'&&x.o<3.5) hart.push({a:a,b:b,x:x});
    });
  });
  hart.sort(function(u,v){return u.x.o-v.x.o;});
  if(hart.length){
    h+='<p>'+DT.spannKopf+hart.slice(0,3).map(function(y){
      return doFuell(DT.spannZeile,{a:y.a,typ:doWinkel(y.x.typ),b:y.b,
        orb:kz(y.x.o),deut:DT.hartDeut[y.b],a2:y.a});
    }).join(DT.spannTrenner)+DT.spannSchluss+'</p>';
  }
  h+='</div>';
  return h;
}

/* ── 6 · Belastungsmuster ─────────────────────────────────── */
function bauMuster(P){
  var tr=[];
  MUSTER.forEach(function(M){
    var x=aspekt(P,M.a,M.b,M.max);
    if(!x) return;
    if(M.hart && x.art!=='hart') return;
    tr.push('<li>'+doFuell(DT.musterZeile,{name:M.n,a:M.a,typ:doWinkel(x.typ),
      b:M.b,orb:kz(x.o),text:M.t})+'</li>');
  });
  var h12=['Sonne','Mond','Merkur','Venus','Mars','Saturn','Neptun','Pluto'].filter(function(k){
    return P[k]!==undefined&&P[k]!==null&&haus(P,P[k])===12; });
  if(h12.length>=2) tr.push('<li>'+doFuell(DT.musterVerdeckt,
    {wer:h12.join(DT.komma),n:12})+'</li>');
  if(!tr.length) return '';
  return '<div class="do-ab"><h3>'+DT.musterTitel+'</h3>'+
   '<div class="sub7">'+DT.musterSub+'</div>'+
   '<ul class="do-muster">'+tr.join('')+'</ul></div>';
}

/* ── 7 · Konflikt, Einstiege, Grenze ──────────────────────── */
function bauSchluss(P,B){
  var K=KONFLIKT[B.klasse];
  var h='<div class="do-ab"><h3>'+DT.schwierigTitel+'</h3>'+
   '<p>'+K.t+'</p><div class="dk voll"><b>'+DT.schwierigTun+'</b>'+K.tun+'</div></div>';
  h+='<div class="do-ab"><h3>'+DT.einstiegTitel+'</h3>'+
   '<div class="sub7">'+DT.einstiegSub+'</div>'+
   '<ul class="do-fragen">'+EINSTIEG[B.klasse].map(function(f){
     return '<li>'+f+'</li>'; }).join('')+'</ul></div>';
  h+='<div class="do-grenze"><div class="k">'+DT.grenzeTitel+'</div><p>'+
   GRENZE[B.klasse]+'</p></div>';
  return h;
}

/* ── Zusammensetzen ───────────────────────────────────────── */
function zeigen(){
  var p=profil();
  if(!p){ el('dossier').innerHTML=''; return; }
  var B=BEZUG[bezug]||BEZUG.klientin;
  var P;
  try{ P=chartVon(p); }catch(e){ el('dossier').innerHTML='<p>'+DT.rechenFehler+'</p>'; return; }
  el('dossier').innerHTML =
    bauKopf(P,p,B) + bauStellung(B) + bauBau(P,B) + bauUmgang(P,B) +
    bauThemen(P,B) + bauHaeuser(P,B) + bauKlemmt(P,B) + bauMuster(P) + bauSchluss(P,B);
  if(window.AC_NIV&&window.AC_NIV.anwenden) try{ window.AC_NIV.anwenden(); }catch(e){}
}

/* ── Wahl: Profil und Bezug ───────────────────────────────── */
function wahlZeichnen(){
  var box=el('dowahl'), alle=[];
  try{ alle=AC_P.alle()||[]; }catch(e){}
  box.innerHTML='';
  if(!alle.length){
    box.innerHTML='<p class="do-leer">'+DT.leer+'</p>';
    el('dobezug').innerHTML=''; el('dossier').innerHTML='';
    return;
  }
  if(!gewaehlt){ var e=alle.filter(function(x){return x.eigen;})[0]||alle[0]; gewaehlt=e.id; }
  var zn=false; try{ zn=AC_P.zeigeNamen(); }catch(e){}
  alle.forEach(function(x){
    var b=document.createElement('button');
    b.type='button'; b.className='dw'+(x.id===gewaehlt?' ist':'');
    b.textContent=AC_P.anzeige(x,zn);
    b.addEventListener('click',function(){
      gewaehlt=x.id; bezug=bezugFuer(x); wahlZeichnen(); bezugZeichnen(); zeigen(); });
    box.appendChild(b);
  });
}
function bezugZeichnen(){
  var box=el('dobezug'), p=profil();
  if(!p){ box.innerHTML=''; return; }
  var h='<div class="bz-k">'+DT.bezugFrage+'</div><div class="bz-reihe">';
  BEZUG_FOLGE.forEach(function(k){
    h+='<button type="button" class="bzb'+(k===bezug?' ist':'')+'" data-b="'+k+'">'+
      esc(BEZUG[k].n)+'</button>';
  });
  h+='</div><div class="bz-kurz">'+esc(BEZUG[bezug].kurz)+'</div>';
  box.innerHTML=h;
  Array.prototype.forEach.call(box.querySelectorAll('.bzb'),function(b){
    b.addEventListener('click',function(){
      bezug=b.getAttribute('data-b');
      var pp=profil(); if(pp) bezugSchreiben(pp.id,bezug);
      bezugZeichnen(); zeigen();
    });
  });
}

(function(){
  wahlZeichnen();
  var p=profil();
  if(p){ bezug=bezugFuer(p); bezugZeichnen(); zeigen(); }
  var d=el('drucken');
  if(d) d.addEventListener('click',function(){ window.print(); });
})();
