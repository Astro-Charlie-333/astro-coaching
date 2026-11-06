/* Mondseite: Rechnung und Anzeige.
   Gerechnet wird gegen rituale/engine.js (sunLon, moonLon, geo, angles,
   chartVon, nrm, jdFromUT). Hier steht keine eigene Himmelsrechnung;
   die drei alten Seiten hatten zusammen zwei.
   Die Termine kommen fertig aus mond-termine.js, die Texte aus mond-texte.js. */
(function(){
var el=function(id){return document.getElementById(id);};
var SVGNS='http://www.w3.org/2000/svg';
function moSvg(t,a){var e=document.createElementNS(SVGNS,t);for(var k in a)e.setAttribute(k,a[k]);return e;}
var ZN=['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische'];
var MON=['Jan.','Feb.','März','Apr.','Mai','Juni','Juli','Aug.','Sep.','Okt.','Nov.','Dez.'];
var WT=['So','Mo','Di','Mi','Do','Fr','Sa'];
var TYPNAME={NM:'Neumond',VM:'Vollmond'};

function moJdJetzt(){ return Date.now()/86400000+2440587.5; }
function moElong(jd){ var T=(jd-2451545)/36525; return nrm(moonLon(T)-sunLon(T)); }
function moPhase(w){ return MT_PHASEN[Math.floor(nrm(w)/45)%8]; }
function moGrad(g){ g=nrm(g); var z=Math.floor(g/30), r=g-z*30, d=Math.floor(r), m=Math.round((r-d)*60);
  if(m===60){d+=1;m=0;} return d+'° '+ZN[z]+' '+(m<10?'0':'')+m+"'"; }
function moDatum(t){ return new Date(t.d+'T'+t.z+':00'); }
function moKurzDatum(t){ var d=moDatum(t); return d.getDate()+'. '+MON[d.getMonth()]; }
function moArt(t){ if(!t.e) return TYPNAME[t.t]; return t.t==='NM'?'Sonnenfinsternis':'Mondfinsternis'; }
function moTyp(t){ var a=moArt(t); for(var i=0;i<MT_TYP.length;i++) if(MT_TYP[i].k===a) return MT_TYP[i]; return MT_TYP[0]; }

/* Der Mond als Bild. w = Abstand Mond–Sonne: 0 neu, 180 voll.
   Zunehmend ist rechts hell (Blick von der Nordhalbkugel). */
function moMondBild(svg,w,art){
  while(svg.firstChild) svg.removeChild(svg.firstChild);
  var cx=60,cy=60,r=46;
  svg.appendChild(moSvg('circle',{cx:cx,cy:cy,r:r,fill:'#1E2742',stroke:'#46557A','stroke-width':1}));
  if(art==='Sonnenfinsternis'){
    svg.appendChild(moSvg('circle',{cx:cx,cy:cy,r:r+6,fill:'none',stroke:'#E8C98D','stroke-width':3,opacity:.85}));
    return;
  }
  var k=Math.cos(nrm(w)*Math.PI/180), rechts=nrm(w)<180;
  if(Math.abs(nrm(w))<3||Math.abs(nrm(w)-360)<3) return;
  var d='M '+cx+' '+(cy-r)+' A '+r+' '+r+' 0 0 '+(rechts?1:0)+' '+cx+' '+(cy+r)+
        ' A '+(r*Math.abs(k)).toFixed(2)+' '+r+' 0 0 '+(rechts?(k>0?0:1):(k>0?1:0))+' '+cx+' '+(cy-r)+' Z';
  svg.appendChild(moSvg('path',{d:d,fill:art==='Mondfinsternis'?'#B5653A':'#F3EFE6'}));
}

/* Profil und Chart */
function moProfil(){ try{ var a=AC_P.alle(); return AC_P.aktives()||AC_P.eigenes()||a[0]||null; }catch(e){ return null; } }
function moChartJD(jd,lat,lon){
  var T=(jd-2451545)/36525, a=angles(jd,lat,lon);
  return {Sonne:sunLon(T),Mond:moonLon(T),Merkur:geo('Merkur',T),Venus:geo('Venus',T),Mars:geo('Mars',T),
    Jupiter:geo('Jupiter',T),Saturn:geo('Saturn',T),Uranus:geo('Uranus',T),Neptun:geo('Neptun',T),
    Pluto:geo('Pluto',T),ASC:a.asc,MC:a.mc};
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
function moTreffer(grad,C){
  var out=[];
  if(!C) return out;
  for(var k in C){
    var s=Math.abs(nrm(grad-C[k]+180)-180), orb=MT_ORB[k]||3, art=null, o=null;
    if(s<=orb){art='auf';o=s;}
    else if(Math.abs(s-180)<=orb){art='gegenüber';o=Math.abs(s-180);}
    if(art) out.push({p:k,a:art,o:o});
  }
  return out.sort(function(a,b){return a.o-b.o;});
}
function moHaus(ascGrad,g){ return ((Math.floor(nrm(g)/30)-Math.floor(nrm(ascGrad)/30))%12+12)%12; }

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
  el('mojetzttun').textContent='Was jetzt dran ist: '+ph.tun;
  var box=el('monaechste'); box.innerHTML='';
  var gesucht=[['NM','Nächster Neumond',false],['VM','Nächster Vollmond',false],['F','Nächste Finsternis',true]];
  gesucht.forEach(function(g){
    for(var i=0;i<MT_TERMINE.length;i++){
      var t=MT_TERMINE[i];
      if(moDatum(t)<jetzt) continue;
      if(g[2]?!t.e:t.t!==g[0]) continue;
      var tage=Math.round((moDatum(t)-jetzt)/86400000);
      var d=document.createElement('div');
      d.innerHTML='<span></span><b></b><span></span>';
      d.children[0].textContent=g[1];
      d.children[1].textContent=moKurzDatum(t)+(g[2]?' · '+moArt(t):'');
      d.children[2].textContent=tage===0?'heute':(tage===1?'morgen':'in '+tage+' Tagen');
      box.appendChild(d);
      break;
    }
  });
  var T=(jd-2451545)/36525;
  el('mojetzttech').textContent='Mond auf '+moGrad(moonLon(T))+' · Abstand zur Sonne '+
    w.toFixed(1).replace('.',',')+'° · Tag '+(w/360*29.53).toFixed(1).replace('.',',')+' des Zyklus';
}

/* ── 2 · Die acht Stationen ─────────────────────────────── */
var moWahl=Math.floor(moElong(moJdJetzt())/45)%8;
function moRad(){
  var s=el('morad'); while(s.firstChild) s.removeChild(s.firstChild);
  s.appendChild(moSvg('line',{x1:30,y1:78,x2:610,y2:78,stroke:'#EBE1D2','stroke-width':2}));
  MT_PHASEN.forEach(function(p,i){
    var x=30+i*(580/7);
    var g=moSvg('g',{role:'button',tabindex:0,'aria-label':p.n+', '+p.s,'aria-pressed':String(i===moWahl)});
    g.appendChild(moSvg('circle',{class:'ring',cx:x,cy:78,r:30,fill:i===moWahl?'#F5ECDD':'#FFFDFA',stroke:i===moWahl?'#9A7235':'#EBE1D2','stroke-width':i===moWahl?2:1}));
    var sub=moSvg('svg',{x:x-22,y:56,width:44,height:44,viewBox:'0 0 120 120'});
    moMondBild(sub,p.a+22.5);
    g.appendChild(sub);
    var t1=moSvg('text',{x:x,y:134,'text-anchor':'middle','font-size':13,fill:'#2E3A5C','font-family':'DM Sans, system-ui, sans-serif','font-weight':i===moWahl?600:400});
    t1.textContent=p.s; g.appendChild(t1);
    function waehle(){ moWahl=i; moZeigPhase(); moRad(); }
    g.addEventListener('click',waehle);
    g.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){e.preventDefault();waehle();
      var n=el('morad').querySelectorAll('g[role=button]')[i]; if(n) n.focus();} });
    s.appendChild(g);
  });
  var l1=moSvg('text',{x:30,y:178,'font-size':11,fill:'#9A7235','font-family':'JetBrains Mono, monospace'}); l1.textContent='ZUNEHMEND · AUFBAUEN'; s.appendChild(l1);
  var l2=moSvg('text',{x:610,y:178,'font-size':11,fill:'#9A7235','font-family':'JetBrains Mono, monospace','text-anchor':'end'}); l2.textContent='ABNEHMEND · ABBAUEN'; s.appendChild(l2);
}
function moZeigPhase(){
  var p=MT_PHASEN[moWahl];
  el('mophasename').textContent=p.n+': '+p.s;
  el('mophasemeta').textContent=p.a+'° bis '+(p.a+45)+'° Abstand zur Sonne · etwa Tag '+
    (p.a/360*29.53).toFixed(1).replace('.',',')+' bis '+((p.a+45)/360*29.53).toFixed(1).replace('.',',')+' des Zyklus';
  el('mophasetext').textContent=p.t;
  el('mophasetun').innerHTML='<b>Was jetzt dran ist:</b> ';
  el('mophasetun').appendChild(document.createTextNode(p.tun));
}

/* ── 3 · Deine Termine ──────────────────────────────────── */
function moProfilZeile(){
  var b=el('moprofil');
  if(!NAT){
    b.innerHTML='Noch kein Profil aktiv. Lege unter <a href="profile.html">Profile</a> eines an, dann stehen hier nur die Termine, die dich betreffen. Bis dahin siehst du die nächsten Termine für alle.';
    return;
  }
  var name='das aktive Profil';
  try{ name=AC_P.anzeige(P,AC_P.zeigeNamen()); }catch(e){}
  b.innerHTML='Gerechnet für <b></b>. Wechseln unter <a href="profile.html">Profile</a>.';
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
      p.textContent='In den nächsten zwölf Monaten trifft kein Termin einen deiner Punkte genau. Das kommt vor. Dann ist jeder Neu- und Vollmond allgemeines Mondwetter für dich.';
      box.appendChild(p); return;
    }
  } else {
    zeigen=kommend.slice(0,4).map(function(t){ return {t:t,tr:[]}; });
  }
  var grenze=moAlleZeigen?zeigen.length:Math.min(zeigen.length,6);
  zeigen.slice(0,grenze).forEach(function(x){ box.appendChild(moKarte(x.t,x.tr)); });
  if(zeigen.length>grenze){
    var m=document.createElement('button'); m.type='button'; m.className='mo-mehr';
    m.textContent='Alle '+zeigen.length+' zeigen';
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
  var s=document.createElement('span'); s.textContent=WT[d.getDay()]+' · '+t.z; dat.appendChild(s);
  var inh=document.createElement('div'); inh.className='mo-tinhalt';
  var h=document.createElement('h3'); h.textContent=art+(t.e?' ('+t.e+')':''); inh.appendChild(h);
  var chips=document.createElement('div'); chips.className='mo-chips';
  function chip(txt,cls){ var c=document.createElement('span'); c.className='mo-chip'+(cls?' '+cls:''); c.textContent=txt; chips.appendChild(c); }
  if(t.e) chip('Halbjahresthema','fins');
  var p=document.createElement('p');
  if(NAT){
    var hh=moHaus(NAT.ASC,t.g), haupt=tr[0];
    chip('trifft '+MT_PUNKT[haupt.p][0],'treffer');
    tr.slice(1,3).forEach(function(x){ chip('und '+MT_PUNKT[x.p][0],'treffer'); });
    chip('Bereich: '+MT_HAUS[hh].kurz);
    p.textContent=MT_PRAX[haupt.p][t.t==='NM'?0:1];
  } else {
    p.textContent=typ.alltag;
  }
  inh.appendChild(chips); inh.appendChild(p);
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
  var s='<p><b>'+typ[0]+'.</b> '+typ[1]+' Bei dir fällt das in <b>'+H[hh].lang+'</b>.';
  if(!istNM) s+=' Weil ein Vollmond eine Achse ist, wird gleichzeitig das '+(geg+1)+'. Haus gefordert: <b>'+H[geg].lang+'</b>.';
  if(herrH!==null) s+=' '+ZN[zi]+' wird von <b>'+herr+'</b> beherrscht, und dein '+herr+' steht im '+(herrH+1)+
    '. Haus. Was im Bereich '+H[hh].kurz+' angestoßen wird, zeigt seine Folgen im Bereich '+H[herrH].kurz+'.';
  s+='</p>';
  if(!tr.length&&!tsr.length){
    return s+'<p><b>Kein Gradtreffer.</b> Diese Lunation beleuchtet nur den Bereich '+H[hh].kurz+
      ', ohne einen deiner Punkte eng zu berühren. Das ist der Normalfall: allgemeines Mondwetter.</p>';
  }
  tr.forEach(function(x){
    var p=MT_PUNKT[x.p], ph=(NAT[x.p]!==undefined&&x.p!=='ASC'&&x.p!=='MC')?moHaus(NAT.ASC,NAT[x.p]):null;
    var nah=x.o<1?'Sehr eng, das ist der Kern des Termins.':(x.o<2?'Eng genug, um im Alltag bemerkbar zu sein.':'Am Rand, eher eine Färbung.');
    var z='<p><b>Radix · '+x.a+' '+x.p+' · '+x.o.toFixed(1).replace('.',',')+'°.</b> '+nah+' Berührt wird '+p[0]+', also '+p[1]+'.';
    z+=x.a==='auf'?' Lunation und Punkt fallen zusammen: Der Punkt ist das Thema.'
                  :' Der Punkt steht gegenüber. Der Anstoß kommt eher von außen, über andere Menschen oder Umstände.';
    if(ph!==null) z+=ph===hh?' Dein '+x.p+' steht selbst im '+(ph+1)+'. Haus, genau dort, wo die Lunation stattfindet. Doppelte Betonung.'
                            :' Dein '+x.p+' steht im '+(ph+1)+'. Haus. Was im Bereich '+H[hh].kurz+' passiert, greift bei dir in '+H[ph].lang+' hinein.';
    s+=z+' '+MT_PRAX[x.p][istNM?0:1]+'</p>';
  });
  tsr.forEach(function(x){
    s+='<p><b>Solar Return · '+x.a+' Jahres-'+x.p+' · '+x.o.toFixed(1).replace('.',',')+'°.</b> Getroffen wird '+MT_PUNKT[x.p][0]+
      ' in deinem Jahreschart. Ein Thema dieses einen Jahres, nicht ein Dauerthema.</p>';
  });
  if(tr.length>1) s+='<p><b>Mehrere Punkte gleichzeitig.</b> Das ist selten und macht den Termin überdurchschnittlich wichtig.</p>';
  else if(tr.length&&tsr.length) s+='<p><b>Beide Ebenen zeigen auf denselben Termin.</b> Ein Dauerthema fällt mit einem Thema dieses Jahres zusammen. Das ist der stärkste Befund.</p>';
  if(t.e) s+='<p>Weil es eine Finsternis ist, läuft das Zeitfenster über rund sechs Monate. Erwarte nichts am Tag selbst.</p>';
  return s;
}
function moTabelle(){
  var tb=el('motab'), jetzt=new Date(), ab=new Date(jetzt.getTime()-31*86400000);
  var asc=NAT?NAT.ASC:moAscWahl();
  var kopf='<tr><th>Datum</th><th>Zeit</th><th>Art</th><th>Grad</th>'+(asc!==null?'<th>Haus</th>':'')+(NAT?'<th>Treffer</th>':'')+'</tr>';
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
    tr.slice(0,3).forEach(function(x){ zell+='<span class="mo-tref">'+x.a+' '+x.p+' '+x.o.toFixed(1).replace('.',',')+'°</span>'; });
    tsr.slice(0,2).forEach(function(x){ zell+='<span class="mo-tref sr">SR '+x.a+' '+x.p+'</span>'; });
    var dd=moDatum(t);
    z+='<tr data-i="'+i+'" class="'+(NAT?'klick':'')+(vorbei?' vorbei':'')+(moOffen===i?' offen':'')+'">'+
      '<td class="mono">'+('0'+dd.getDate()).slice(-2)+'.'+('0'+(dd.getMonth()+1)).slice(-2)+'.'+dd.getFullYear()+'</td>'+
      '<td class="mono">'+t.z+'</td><td>'+moArt(t)+(t.e?' <span class="mo-klein">'+t.e+'</span>':'')+'</td>'+
      '<td class="mono">'+moGrad(t.g)+'</td>'+
      (hh!==null?'<td>'+(hh+1)+'. · '+MT_HAUS[hh].kurz+'</td>':'')+
      (NAT?'<td>'+(zell||'<span class="mo-klein">–</span>')+'</td>':'')+'</tr>';
    if(NAT&&moOffen===i) z+='<tr class="detail"><td colspan="6"><div>'+moErklaerung(t,tr,tsr,hh)+'</div></td></tr>';
  });
  tb.innerHTML=kopf+z;
  if(NAT) Array.prototype.forEach.call(tb.querySelectorAll('tr.klick'),function(r){
    r.addEventListener('click',function(){ var i=+r.getAttribute('data-i'); moOffen=(moOffen===i)?-1:i; moTabelle(); });
  });
  el('motabkopf').textContent=(NAT?'Tippe eine Zeile an, dann steht dort, was der Termin bei dir berührt. ':'')+
    'Vergangene Termine des letzten Monats sind grau.';
}
function moFilterleiste(){
  var f=el('mofilter'); f.innerHTML='';
  var opt=[['alle','Alle'],['NM','Neumonde'],['VM','Vollmonde'],['fins','Finsternisse']];
  if(NAT) opt.splice(1,0,['treffer','Nur meine Treffer']);
  opt.forEach(function(o){
    var b=document.createElement('button'); b.type='button'; b.textContent=o[1];
    b.setAttribute('aria-pressed',String(moFilt===o[0]));
    b.addEventListener('click',function(){ moFilt=o[0]; moOffen=-1; moFilterleiste(); moTabelle(); });
    f.appendChild(b);
  });
}
function moAscBox(){
  if(NAT){ el('moascbox').hidden=true; return; }
  el('moascbox').hidden=false;
  var s=el('moasc'); s.innerHTML='<option value="">nicht gewählt</option>';
  ZN.forEach(function(z,i){ var o=document.createElement('option'); o.value=i; o.textContent=z; s.appendChild(o); });
  s.addEventListener('change',moTabelle);
}

/* ── 4 · Die vier Arten ─────────────────────────────────── */
function moArten(){
  var box=el('moarten'); box.innerHTML='';
  MT_TYP.forEach(function(t){
    var k=document.createElement('article'); k.className='mo-art';
    var svg=moSvg('svg',{viewBox:'0 0 120 120','aria-hidden':'true'});
    moMondBild(svg,(t.k==='Neumond'||t.k==='Sonnenfinsternis')?0:180,(t.k==='Sonnenfinsternis'||t.k==='Mondfinsternis')?t.k:null);
    var d=document.createElement('div');
    d.innerHTML='<h3></h3><p></p><p class="ac-tech" data-ab="2"></p><p class="mo-tun"></p><p class="fenster"></p><p class="zugross"></p>';
    d.children[0].textContent=t.k; var sm=document.createElement('small'); sm.textContent=t.wort; d.children[0].appendChild(sm);
    d.children[1].textContent=t.alltag;
    d.children[2].textContent=t.tech;
    d.children[3].innerHTML='<b>Was dran ist:</b> '; d.children[3].appendChild(document.createTextNode(t.tun));
    d.children[4].textContent=t.fenster;
    d.children[5].innerHTML='<b>Was oft zu groß erzählt wird:</b> '; d.children[5].appendChild(document.createTextNode(t.zugross));
    k.appendChild(svg); k.appendChild(d); box.appendChild(k);
  });
}

/* ── 5 · Geburtsmondphase ───────────────────────────────── */
function moGeburt(){
  var w=null, quelle='';
  if(NAT){ w=nrm(NAT.Mond-NAT.Sonne); quelle='Aus dem Profil, das gerade aktiv ist.'; el('mogebform').hidden=true; }
  else {
    el('mogebform').hidden=false;
    var d=el('mogd').value, t=el('mogt').value||'12:00';
    if(d){
      var p=d.split('-').map(Number), u=t.split(':').map(Number);
      /* Ortszeit grob als Mitteleuropa angenommen: eine Stunde ab.
         Der Mond läuft rund ein halbes Grad pro Stunde, das ändert die
         Phase fast nie. */
      w=moElong(jdFromUT(p[0],p[1],p[2],u[0]+u[1]/60-1));
      quelle='Aus dem eingegebenen Datum gerechnet.';
    }
  }
  if(w===null){
    el('mogebquelle').textContent='Trag dein Geburtsdatum ein oder lege ein Profil an.';
    el('mogebname').textContent=''; el('mogebtext').textContent=''; el('mogebfrage').textContent=''; el('mogebtech').textContent='';
    moMondBild(el('mogebsvg'),90); return;
  }
  var ph=moPhase(w);
  moMondBild(el('mogebsvg'),w);
  el('mogebquelle').textContent=quelle;
  el('mogebname').textContent='Geboren bei '+ph.n+': '+ph.s;
  el('mogebtext').textContent=ph.geb;
  el('mogebfrage').innerHTML='<b>Deine Frage:</b> '; el('mogebfrage').appendChild(document.createTextNode(ph.frage));
  el('mogebtech').textContent='Abstand Sonne–Mond bei der Geburt: '+w.toFixed(1).replace('.',',')+'°';
}

/* ── 6 · Nachschlagen ───────────────────────────────────── */
function moKombi(){
  var a=el('mokart'), z=el('mokzeichen'), h=el('mokhaus');
  MT_TYP.forEach(function(t,i){ var o=document.createElement('option'); o.value=i; o.textContent=t.k; a.appendChild(o); });
  MT_ZEICHEN.forEach(function(t,i){ var o=document.createElement('option'); o.value=i; o.textContent=t.n; z.appendChild(o); });
  MT_HAUS.forEach(function(t,i){ var o=document.createElement('option'); o.value=i; o.textContent=(i+1)+'. Haus · '+t.kurz; h.appendChild(o); });
  function zeig(){
    var t=MT_TYP[+a.value], zz=MT_ZEICHEN[+z.value], hh=MT_HAUS[+h.value];
    var b=el('moktext'); b.innerHTML='';
    [[t.k+' in '+zz.n+' im '+hh.n+'. Haus',''],[t.tech,''],
     [zz.n+': '+zz.art[t.k],''],[hh.t+': '+hh.art[t.k],''],[hh.frage,'frage']].forEach(function(x,i){
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
  el('mostand').textContent='Termine gerechnet am '+MT_ERSTELLT.split('-').reverse().join('.')+
    ', sie reichen bis '+d.getDate()+'. '+MON[d.getMonth()]+' '+d.getFullYear()+'.';
}

function moLos(){
  moJetzt(); moRad(); moZeigPhase(); moProfilZeile(); moListe();
  moAscBox(); moFilterleiste(); moTabelle(); moArten(); moGeburt(); moKombi(); moStand();
  ['mogd','mogt'].forEach(function(id){ el(id).addEventListener('input',moGeburt); });
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',moLos); else moLos();
})();
