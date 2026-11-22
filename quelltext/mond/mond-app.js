/* Mondseite: Rechnung und Anzeige.
   Gerechnet wird gegen rituale/engine.js (sunLon, moonLon, geo, angles,
   chartVon, nrm, jdFromUT). Hier steht keine eigene Himmelsrechnung;
   die drei alten Seiten hatten zusammen zwei.
   Die Termine kommen fertig aus mond-termine.js, die Texte aus mond-texte.js.

   Hier steht kein Satz. Die Vorlagen stehen in MT_T (mond-texte.js),
   `moFuell` setzt ein, und „dein" vor einem Punkt bildet B_BEUGE aus
   kern/bahn-daten.js — die eine Stelle, die das Geschlecht eines
   Punktes kennt (Aufgabe 55). bau-mond.py bricht ab, sobald hier
   wieder eine Zeichenkette mit Sprache auftaucht. */
(function(){
var el=function(id){return document.getElementById(id);};
var SVGNS='http://www.w3.org/2000/svg';
function moSvg(t,a){var e=document.createElementNS(SVGNS,t);for(var k in a)e.setAttribute(k,a[k]);return e;}
var T=MT_T;
/* Eine Lücke `{so}` je Schlüssel, in einem Durchgang. */
/* Gefüllt wird an einer Stelle: AC_FUELL in kern/fuellen.js.
   Ein fehlender Wert bricht dort ab, statt lautlos zu
   verschwinden (Aufgabe 94). */
function moFuell(form,werte){ return AC_FUELL(form,werte); }
function moGross(s){ return s.charAt(0).toUpperCase()+s.slice(1); }
/* „deine Venus", „dein Mond" — gebeugt an einer Stelle. */
function moDein(k){ return B_BEUGE(B_PUNKT(k,false),'nom'); }
/* Die Zeichennamen stehen einmal, in MT_ZEICHEN. bau-mond.py hält die
   Reihenfolge gegen die zwölf Zeichen ab Widder. */
var ZN=MT_ZEICHEN.map(function(z){return z.n;});

function moJdJetzt(){ return Date.now()/86400000+2440587.5; }
function moElong(jd){ var t=(jd-2451545)/36525; return nrm(moonLon(t)-sunLon(t)); }
function moPhase(w){ return MT_PHASEN[Math.floor(nrm(w)/45)%8]; }
function moGrad(g){ g=nrm(g); var z=Math.floor(g/30), r=g-z*30, d=Math.floor(r), m=Math.round((r-d)*60);
  if(m===60){d+=1;m=0;}
  return moFuell(T.grad,{grad:d,zeichen:ZN[z],min:(m<10?'0':'')+m}); }
function moDatum(t){ return new Date(t.d+'T'+t.z+':00'); }
function moKurzDatum(t){ var d=moDatum(t);
  return moFuell(T.datumKurz,{t:d.getDate(),monat:T.monKurz[d.getMonth()]}); }
function moArt(t){ return T.artName[t.t+(t.e?'e':'')]; }
function moTyp(t){ var a=moArt(t); for(var i=0;i<MT_TYP.length;i++) if(MT_TYP[i].k===a) return MT_TYP[i]; return MT_TYP[0]; }
/* Welcher Winkel getroffen ist, steht als Schlüssel in der Rechnung;
   das Wort dazu kommt aus bahn-daten.js und nicht hier noch einmal. */
function moWinkelWort(k){ return (B_WINKELWORT[k]||B_WINKELNOT).wort; }

/* Der Mond als Bild. w = Abstand Mond–Sonne: 0 neu, 180 voll.
   Zunehmend ist rechts hell (Blick von der Nordhalbkugel). */
function moMondBild(svg,w,art){
  while(svg.firstChild) svg.removeChild(svg.firstChild);
  var cx=60,cy=60,r=46;
  svg.appendChild(moSvg('circle',{cx:cx,cy:cy,r:r,fill:'#1E2742',stroke:'#46557A','stroke-width':1}));
  if(art===T.artName.NMe){
    svg.appendChild(moSvg('circle',{cx:cx,cy:cy,r:r+6,fill:'none',stroke:'#F2B33D','stroke-width':3,opacity:.85}));
    return;
  }
  var k=Math.cos(nrm(w)*Math.PI/180), rechts=nrm(w)<180;
  if(Math.abs(nrm(w))<3||Math.abs(nrm(w)-360)<3) return;
  var d='M '+cx+' '+(cy-r)+' A '+r+' '+r+' 0 0 '+(rechts?1:0)+' '+cx+' '+(cy+r)+
        ' A '+(r*Math.abs(k)).toFixed(2)+' '+r+' 0 0 '+(rechts?(k>0?0:1):(k>0?1:0))+' '+cx+' '+(cy-r)+' Z';
  svg.appendChild(moSvg('path',{d:d,fill:art===T.artName.VMe?'#B5653A':'#F3EFE6'}));
}

/* Profil und Chart */
function moProfil(){ try{ var a=AC_P.alle(); return AC_P.aktives()||AC_P.eigenes()||a[0]||null; }catch(e){ return null; } }
function moChartJD(jd,lat,lon){
  var t=(jd-2451545)/36525, a=angles(jd,lat,lon);
  return {Sonne:sunLon(t),Mond:moonLon(t),Merkur:geo('Merkur',t),Venus:geo('Venus',t),Mars:geo('Mars',t),
    Jupiter:geo('Jupiter',t),Saturn:geo('Saturn',t),Uranus:geo('Uranus',t),Neptun:geo('Neptun',t),
    Pluto:geo('Pluto',t),ASC:a.asc,MC:a.mc};
}
/* Solar Return: der Moment im Jahr, in dem die Sonne wieder auf dem Geburtsgrad steht. */
function moSolar(nat,jahr,lat,lon){
  var ziel=nat.Sonne, a=jdFromUT(jahr,1,1,0);
  function df(jd){ var v=nrm(sunLon((jd-2451545)/36525)-ziel); return v>180?v-360:v; }
  var prev=df(a);
  for(var jd=a+1;jd<a+367;jd+=1){
    var d=df(jd);
    if(prev<0&&d>=0&&Math.abs(prev)<10){
      var lo=jd-1,hi=jd; for(var i=0;i<45;i++){var m=(lo+hi)/2;(df(m)<0)?lo=m:hi=m;}
      return moChartJD((lo+hi)/2,lat,lon);
    }
    prev=d;
  }
  return null;
}
/* Trifft der Grad einen Punkt? `a` ist der Winkelschlüssel, kein Wort. */
function moTreffer(grad,C){
  var out=[];
  if(!C) return out;
  for(var k in C){
    var s=Math.abs(nrm(grad-C[k]+180)-180), orb=MT_ORB[k]||3, art=null, o=null;
    if(s<=orb){art='Konjunktion';o=s;}
    else if(Math.abs(s-180)<=orb){art='Opposition';o=Math.abs(s-180);}
    if(art) out.push({p:k,a:art,o:o});
  }
  return out.sort(function(a,b){return a.o-b.o;});
}
function moHaus(ascGrad,g){ return ((Math.floor(nrm(g)/30)-Math.floor(nrm(ascGrad)/30))%12+12)%12; }
function moKomma(x,n){ return x.toFixed(n).replace('.',','); }

var P=moProfil(), NAT=null, SR=null;
if(P){ try{ NAT=chartVon(P);
  var wl=(P.wlat!==undefined?P.wlat:P.lat), wo=(P.wlon!==undefined?P.wlon:P.lon);
  SR=moSolar(NAT,new Date().getFullYear(),wl,wo); }catch(e){ NAT=null; SR=null; } }

/* ── 1 · Gerade jetzt ───────────────────────────────────── */
function moJetzt(){
  var jd=moJdJetzt(), w=moElong(jd), ph=moPhase(w), jetzt=new Date();
  moMondBild(el('mojetztsvg'),w);
  el('mojetztname').textContent=ph.n;
  el('mojetzttext').textContent=ph.t;
  el('mojetzttun').textContent=moFuell(T.jetztTun,{tun:ph.tun});
  var box=el('monaechste'); box.innerHTML='';
  [['NM',false],['VM',false],['F',true]].forEach(function(g){
    for(var i=0;i<MT_TERMINE.length;i++){
      var t=MT_TERMINE[i];
      if(moDatum(t)<jetzt) continue;
      if(g[1]?!t.e:t.t!==g[0]) continue;
      var tage=Math.round((moDatum(t)-jetzt)/86400000);
      var d=document.createElement('div');
      d.innerHTML='<span></span><b></b><span></span>';
      d.children[0].textContent=T.naechsteTitel[g[0]];
      d.children[1].textContent=g[1]
        ? moFuell(T.naechsteArt,{datum:moKurzDatum(t),art:moArt(t)})
        : moKurzDatum(t);
      d.children[2].textContent=tage===0?T.inHeute
        :(tage===1?T.inMorgen:moFuell(T.inTagen,{n:tage}));
      box.appendChild(d);
      break;
    }
  });
  var tt=(jd-2451545)/36525;
  el('mojetzttech').textContent=moFuell(T.jetztTech,
    {grad:moGrad(moonLon(tt)), ab:moKomma(w,1), tag:moKomma(w/360*29.53,1)});
}

/* ── 2 · Die acht Stationen ─────────────────────────────── */
var moWahl=Math.floor(moElong(moJdJetzt())/45)%8;
function moRad(){
  var s=el('morad'); while(s.firstChild) s.removeChild(s.firstChild);
  s.appendChild(moSvg('line',{x1:30,y1:78,x2:610,y2:78,stroke:'#E6DECF','stroke-width':2}));
  MT_PHASEN.forEach(function(p,i){
    var x=30+i*(580/7);
    var g=moSvg('g',{role:'button',tabindex:0,
      'aria-label':moFuell(T.radMarke,{name:p.n,wort:p.s}),'aria-pressed':String(i===moWahl)});
    g.appendChild(moSvg('circle',{class:'ring',cx:x,cy:78,r:30,fill:i===moWahl?'#F5ECDD':'#FFFFFF',stroke:i===moWahl?'#C8441A':'#E6DECF','stroke-width':i===moWahl?2:1}));
    var sub=moSvg('svg',{x:x-22,y:56,width:44,height:44,viewBox:'0 0 120 120'});
    moMondBild(sub,p.a+22.5);
    g.appendChild(sub);
    /* Die Schrift steht in mond-stil.css, nicht hier: eine Anzeige
       setzt Klassen, keine Schriftnamen. */
    var t1=moSvg('text',{x:x,y:134,class:'mo-rad-lab','text-anchor':'middle','font-size':13,fill:'#1B1B1B','font-weight':i===moWahl?600:400});
    t1.textContent=p.s; g.appendChild(t1);
    function waehle(){ moWahl=i; moZeigPhase(); moRad(); }
    g.addEventListener('click',waehle);
    g.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){e.preventDefault();waehle();
      var n=el('morad').querySelectorAll('g[role=button]')[i]; if(n) n.focus();} });
    s.appendChild(g);
  });
  var l1=moSvg('text',{x:30,y:178,class:'mo-rad-rand','font-size':11,fill:'#C8441A'}); l1.textContent=T.radLinks; s.appendChild(l1);
  var l2=moSvg('text',{x:610,y:178,class:'mo-rad-rand','font-size':11,fill:'#C8441A','text-anchor':'end'}); l2.textContent=T.radRechts; s.appendChild(l2);
}
function moZeigPhase(){
  var p=MT_PHASEN[moWahl];
  el('mophasename').textContent=moFuell(T.phaseName,{name:p.n,wort:p.s});
  el('mophasemeta').textContent=moFuell(T.phaseMeta,{von:p.a, bis:p.a+45,
    tagVon:moKomma(p.a/360*29.53,1), tagBis:moKomma((p.a+45)/360*29.53,1)});
  el('mophasetext').textContent=p.t;
  el('mophasetun').innerHTML='<b></b> ';
  el('mophasetun').firstChild.textContent=T.phaseTun;
  el('mophasetun').appendChild(document.createTextNode(p.tun));
}

/* ── 3 · Deine Termine ──────────────────────────────────── */
function moProfilZeile(){
  var b=el('moprofil');
  if(!NAT){ b.innerHTML=T.profilOhne; return; }
  var name=T.profilName;
  try{ name=AC_P.anzeige(P,AC_P.zeigeNamen()); }catch(e){}
  b.innerHTML=T.profilMit;
  b.querySelector('b').textContent=name;
}
var moAlleZeigen=false;
function moListe(){
  var box=el('moliste'); box.innerHTML='';
  var jetzt=new Date(), bis=new Date(jetzt.getTime()+365*86400000);
  var kommend=MT_TERMINE.filter(function(t){ var d=moDatum(t); return d>=new Date(jetzt.getTime()-86400000) && d<=bis; });
  var zeigen;
  if(NAT){
    zeigen=kommend.map(function(t){ return {t:t,tr:moTreffer(t.g,NAT)}; }).filter(function(x){ return x.tr.length; });
    if(!zeigen.length){
      var p=document.createElement('p'); p.className='mo-leer';
      p.textContent=T.keinTreffer;
      box.appendChild(p); return;
    }
  } else {
    zeigen=kommend.slice(0,4).map(function(t){ return {t:t,tr:[]}; });
  }
  var grenze=moAlleZeigen?zeigen.length:Math.min(zeigen.length,6);
  zeigen.slice(0,grenze).forEach(function(x){ box.appendChild(moKarte(x.t,x.tr)); });
  if(zeigen.length>grenze){
    var m=document.createElement('button'); m.type='button'; m.className='mo-mehr';
    m.textContent=moFuell(T.mehrZeigen,{n:zeigen.length});
    m.addEventListener('click',function(){ moAlleZeigen=true; moListe(); });
    box.appendChild(m);
  }
}
function moKarte(t,tr){
  var art=moArt(t), typ=moTyp(t), d=moDatum(t);
  var k=document.createElement('article'); k.className='mo-termin'+(t.e?' fins':'');
  var dat=document.createElement('div'); dat.className='mo-datum';
  var svg=moSvg('svg',{viewBox:'0 0 120 120','aria-hidden':'true'}); moMondBild(svg,t.t==='NM'?0:180,t.e?art:null);
  dat.appendChild(svg);
  var b=document.createElement('b'); b.textContent=moKurzDatum(t); dat.appendChild(b);
  var s=document.createElement('span');
  s.textContent=moFuell(T.datumWoche,{tag:T.wochenKurz[d.getDay()],zeit:t.z}); dat.appendChild(s);
  var inh=document.createElement('div'); inh.className='mo-tinhalt';
  var h=document.createElement('h3');
  h.textContent=t.e?moFuell(T.artZusatz,{art:art,zusatz:t.e}):art; inh.appendChild(h);
  var chips=document.createElement('div'); chips.className='mo-chips';
  function chip(txt,cls){ var c=document.createElement('span'); c.className='mo-chip'+(cls?' '+cls:''); c.textContent=txt; chips.appendChild(c); }
  if(t.e) chip(T.chipFins,'fins');
  var p=document.createElement('p');
  if(NAT){
    var hh=moHaus(NAT.ASC,t.g), haupt=tr[0];
    chip(moFuell(T.chipTrifft,{was:MT_PUNKT[haupt.p][0]}),'treffer');
    tr.slice(1,3).forEach(function(x){ chip(moFuell(T.chipUnd,{was:MT_PUNKT[x.p][0]}),'treffer'); });
    chip(moFuell(T.chipBereich,{bereich:MT_HAUS[hh].kurz}));
    p.textContent=MT_PRAX[haupt.p][t.t==='NM'?0:1];
  } else {
    p.textContent=typ.alltag;
  }
  inh.appendChild(chips); inh.appendChild(p);
  if(NAT && window.MT_HAUS_TUN){
    var hb=moHaus(NAT.ASC,t.g), satz=(MT_HAUS_TUN[t.t==='NM'?'NM':'VM']||[])[hb];
    if(satz){ var q=document.createElement('p'); q.className='mo-bei';
      var qb=document.createElement('b'); qb.textContent=moFuell(MT_HAUS_TUN.vor,{bereich:MT_HAUS[hb].kurz});
      q.appendChild(qb); q.appendChild(document.createTextNode(satz)); inh.appendChild(q); }
  }
  var f=document.createElement('p'); f.className='mo-klein'; f.textContent=typ.fenster; inh.appendChild(f);
  k.appendChild(dat); k.appendChild(inh);
  return k;
}

/* Die Tabelle für die Arbeit mit Grad und Haus (ab Stufe 2) */
var moFilt='alle', moOffen=-1;
function moAscWahl(){ var v=el('moasc').value; return v===''?null:(+v*30+1); }
function moErklaerung(t,tr,tsr,hh){
  var key=t.t+(t.e?'e':''), typ=MT_DTYP[key], istNM=t.t==='NM', geg=(hh+6)%12;
  var zi=Math.floor(nrm(t.g)/30), herr=MT_HERR[zi];
  var herrH=(NAT&&NAT[herr]!==undefined)?moHaus(NAT.ASC,NAT[herr]):null;
  var H=MT_HAUS;
  var s=moFuell(T.dKopf,{titel:typ[0], text:typ[1], bereich:H[hh].lang});
  if(!istNM) s+=moFuell(T.dAchse,{n:geg+1, bereich:H[geg].lang});
  if(herrH!==null) s+=moFuell(T.dHerr,{zeichen:ZN[zi], herr:herr, deinHerr:moDein(herr),
    n:herrH+1, bereich:H[hh].kurz, folge:H[herrH].kurz});
  s+=T.dKopfEnde;
  if(!tr.length&&!tsr.length) return s+moFuell(T.dKeinTreffer,{bereich:H[hh].kurz});
  tr.forEach(function(x){
    var p=MT_PUNKT[x.p], ph=(NAT[x.p]!==undefined&&x.p!=='ASC'&&x.p!=='MC')?moHaus(NAT.ASC,NAT[x.p]):null;
    var nah=x.o<1?T.dNahEng:(x.o<2?T.dNahMittel:T.dNahRand);
    var z=moFuell(T.dRadix,{art:moWinkelWort(x.a), punkt:x.p, orb:moKomma(x.o,1),
      nah:nah, was:p[0], wie:p[1]});
    z+=x.a==='Konjunktion'?T.dZusammen:T.dGegenueber;
    if(ph!==null) z+=ph===hh
      ? moFuell(T.dPunktGleich,{deinPunkt:moGross(moDein(x.p)), n:ph+1})
      : moFuell(T.dPunktAnders,{deinPunkt:moGross(moDein(x.p)), n:ph+1,
          bereich:H[hh].kurz, wo:H[ph].lang});
    s+=z+moFuell(T.dRadixEnde,{praxis:MT_PRAX[x.p][istNM?0:1]});
  });
  tsr.forEach(function(x){
    s+=moFuell(T.dSR,{art:moWinkelWort(x.a), punkt:x.p, orb:moKomma(x.o,1),
      was:MT_PUNKT[x.p][0]});
  });
  if(tr.length>1) s+=T.dMehrere;
  else if(tr.length&&tsr.length) s+=T.dBeide;
  if(t.e) s+=T.dFins;
  return s;
}
function moTabelle(){
  var tb=el('motab'), jetzt=new Date(), ab=new Date(jetzt.getTime()-31*86400000);
  var asc=NAT?NAT.ASC:moAscWahl();
  var spalten=T.tabSpalten.slice();
  if(asc!==null) spalten.push(T.tabHaus);
  if(NAT) spalten.push(T.tabTreffer);
  var kopf='<tr>'+spalten.map(function(x){return '<th>'+x+'</th>';}).join('')+'</tr>';
  var z='';
  MT_TERMINE.forEach(function(t,i){
    if(moDatum(t)<ab) return;
    var tr=NAT?moTreffer(t.g,NAT):[], tsr=NAT&&SR?moTreffer(t.g,SR):[];
    if(moFilt==='treffer'&&!tr.length&&!tsr.length) return;
    if(moFilt==='fins'&&!t.e) return;
    if(moFilt==='NM'&&t.t!=='NM') return;
    if(moFilt==='VM'&&t.t!=='VM') return;
    var hh=asc!==null?moHaus(asc,t.g):null, vorbei=moDatum(t)<jetzt;
    var zell='';
    tr.slice(0,3).forEach(function(x){ zell+='<span class="mo-tref">'+
      moFuell(T.trefZelle,{art:moWinkelWort(x.a),punkt:x.p,orb:moKomma(x.o,1)})+'</span>'; });
    tsr.slice(0,2).forEach(function(x){ zell+='<span class="mo-tref sr">'+
      moFuell(T.trefZelleSR,{art:moWinkelWort(x.a),punkt:x.p})+'</span>'; });
    var dd=moDatum(t);
    z+='<tr data-i="'+i+'" class="'+(NAT?'klick':'')+(vorbei?' vorbei':'')+(moOffen===i?' offen':'')+'">'+
      '<td class="mono">'+moFuell(T.datumLang,{t:('0'+dd.getDate()).slice(-2),
        m:('0'+(dd.getMonth()+1)).slice(-2), j:dd.getFullYear()})+'</td>'+
      '<td class="mono">'+t.z+'</td><td>'+moArt(t)+(t.e?' <span class="mo-klein">'+t.e+'</span>':'')+'</td>'+
      '<td class="mono">'+moGrad(t.g)+'</td>'+
      (hh!==null?'<td>'+moFuell(T.tabHausZelle,{n:hh+1,bereich:MT_HAUS[hh].kurz})+'</td>':'')+
      (NAT?'<td>'+(zell||'<span class="mo-klein">'+T.tabLeer+'</span>')+'</td>':'')+'</tr>';
    if(NAT&&moOffen===i) z+='<tr class="detail"><td colspan="6"><div>'+moErklaerung(t,tr,tsr,hh)+'</div></td></tr>';
  });
  tb.innerHTML=kopf+z;
  if(NAT) Array.prototype.forEach.call(tb.querySelectorAll('tr.klick'),function(r){
    r.addEventListener('click',function(){ var i=+r.getAttribute('data-i'); moOffen=(moOffen===i)?-1:i; moTabelle(); });
  });
  el('motabkopf').textContent=(NAT?T.tabHinweisKlick:'')+T.tabHinweis;
}
function moFilterleiste(){
  var f=el('mofilter'); f.innerHTML='';
  var opt=['alle','NM','VM','fins'];
  if(NAT) opt.splice(1,0,'treffer');
  opt.forEach(function(o){
    var b=document.createElement('button'); b.type='button'; b.textContent=T.filterNamen[o];
    b.setAttribute('aria-pressed',String(moFilt===o));
    b.addEventListener('click',function(){ moFilt=o; moOffen=-1; moFilterleiste(); moTabelle(); });
    f.appendChild(b);
  });
}
function moAscBox(){
  if(NAT){ el('moascbox').hidden=true; return; }
  el('moascbox').hidden=false;
  var s=el('moasc'); s.innerHTML='';
  var leer=document.createElement('option'); leer.value=''; leer.textContent=T.ascLeer; s.appendChild(leer);
  ZN.forEach(function(z,i){ var o=document.createElement('option'); o.value=i; o.textContent=z; s.appendChild(o); });
  s.addEventListener('change',moTabelle);
}

/* ── 4 · Die vier Arten ─────────────────────────────────── */
function moArten(){
  var box=el('moarten'); box.innerHTML='';
  MT_TYP.forEach(function(t){
    var k=document.createElement('article'); k.className='mo-art';
    var svg=moSvg('svg',{viewBox:'0 0 120 120','aria-hidden':'true'});
    moMondBild(svg,(t.k===T.artName.NM||t.k===T.artName.NMe)?0:180,
      (t.k===T.artName.NMe||t.k===T.artName.VMe)?t.k:null);
    var d=document.createElement('div');
    d.innerHTML='<h3></h3><p></p><p class="ac-tech" data-ab="2"></p>'+
      '<p class="mo-tun"><b></b> </p><p class="fenster"></p><p class="zugross"><b></b> </p>';
    d.children[0].textContent=t.k; var sm=document.createElement('small'); sm.textContent=t.wort; d.children[0].appendChild(sm);
    d.children[1].textContent=t.alltag;
    d.children[2].textContent=t.tech;
    d.children[3].firstChild.textContent=T.artTunLabel;
    d.children[3].appendChild(document.createTextNode(t.tun));
    d.children[4].textContent=t.fenster;
    d.children[5].firstChild.textContent=T.artZugrossLabel;
    d.children[5].appendChild(document.createTextNode(t.zugross));
    k.appendChild(svg); k.appendChild(d); box.appendChild(k);
  });
}

/* ── 5 · Geburtsmondphase ───────────────────────────────── */
function moGeburt(){
  var w=null, quelle='';
  if(NAT){ w=nrm(NAT.Mond-NAT.Sonne); quelle=T.gebAusProfil; el('mogebform').hidden=true; }
  else {
    el('mogebform').hidden=false;
    var d=el('mogd').value, t=el('mogt').value||'12:00';
    if(d){
      var p=d.split('-').map(Number), u=t.split(':').map(Number);
      /* Ortszeit grob als Mitteleuropa angenommen: eine Stunde ab.
         Der Mond läuft rund ein halbes Grad pro Stunde, das ändert die
         Phase fast nie. */
      w=moElong(jdFromUT(p[0],p[1],p[2],u[0]+u[1]/60-1));
      quelle=T.gebAusDatum;
    }
  }
  if(w===null){
    el('mogebquelle').textContent=T.gebOhne;
    el('mogebname').textContent=''; el('mogebtext').textContent=''; el('mogebfrage').textContent=''; el('mogebtech').textContent='';
    moMondBild(el('mogebsvg'),90); return;
  }
  var ph=moPhase(w);
  moMondBild(el('mogebsvg'),w);
  el('mogebquelle').textContent=quelle;
  el('mogebname').textContent=moFuell(T.gebName,{name:ph.n,wort:ph.s});
  el('mogebtext').textContent=ph.geb;
  el('mogebfrage').innerHTML='<b></b> ';
  el('mogebfrage').firstChild.textContent=T.gebFrageLabel;
  el('mogebfrage').appendChild(document.createTextNode(ph.frage));
  el('mogebtech').textContent=moFuell(T.gebTech,{ab:moKomma(w,1)});
}

/* ── 6 · Nachschlagen ───────────────────────────────────── */
function moKombi(){
  var a=el('mokart'), z=el('mokzeichen'), h=el('mokhaus');
  MT_TYP.forEach(function(t,i){ var o=document.createElement('option'); o.value=i; o.textContent=t.k; a.appendChild(o); });
  MT_ZEICHEN.forEach(function(t,i){ var o=document.createElement('option'); o.value=i; o.textContent=t.n; z.appendChild(o); });
  MT_HAUS.forEach(function(t,i){ var o=document.createElement('option'); o.value=i;
    o.textContent=moFuell(T.kombiHausOpt,{n:i+1,bereich:t.kurz}); h.appendChild(o); });
  function zeig(){
    var t=MT_TYP[+a.value], zz=MT_ZEICHEN[+z.value], hh=MT_HAUS[+h.value];
    var b=el('moktext'); b.innerHTML='';
    [[moFuell(T.kombiTitel,{art:t.k,zeichen:zz.n,n:hh.n}),''],
     [t.tech,''],
     [moFuell(T.kombiZeile,{was:zz.n,text:zz.art[t.k]}),''],
     [moFuell(T.kombiZeile,{was:hh.t,text:hh.art[t.k]}),''],
     [hh.frage,'frage']].forEach(function(x,i){
      var p=document.createElement('p'); if(x[1]) p.className=x[1];
      if(i===0){ var bb=document.createElement('b'); bb.textContent=x[0]; p.appendChild(bb); } else p.textContent=x[0];
      b.appendChild(p);
    });
  }
  [a,z,h].forEach(function(s){ s.addEventListener('change',zeig); });
  zeig();
}

function moStand(){
  var l=MT_TERMINE[MT_TERMINE.length-1], d=moDatum(l);
  el('mostand').textContent=moFuell(T.stand,{
    am:MT_ERSTELLT.split('-').reverse().join('.'),
    bis:moFuell(T.standBis,{t:d.getDate(),monat:T.monKurz[d.getMonth()],jahr:d.getFullYear()})});
}

function moLos(){
  moJetzt(); moRad(); moZeigPhase(); moProfilZeile(); moListe();
  moAscBox(); moFilterleiste(); moTabelle(); moArten(); moGeburt(); moKombi(); moStand();
  ['mogd','mogt'].forEach(function(id){ el(id).addEventListener('input',moGeburt); });
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',moLos); else moLos();
})();
