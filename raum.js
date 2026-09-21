/* Astro-Charlie · Themenraum-Engine
   Nimmt ein Chart und eine Raum-Definition, gewichtet die Facetten und baut die Seite.
   Dieselbe Engine trägt alle Räume — pro Raum ändert sich nur die Definitionsdatei. */
(function(){
var SIGNS=['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische'];
var GLY={Sonne:'☉',Mond:'☽',Merkur:'☿',Venus:'♀',Mars:'♂',Jupiter:'♃',Saturn:'♄',Uranus:'♅',Neptun:'♆',Pluto:'♇',ASC:'AC',MC:'MC',Lilith:'⚸',Chiron:'⚷'};
var ORD=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];
var HERR={0:'Mars',1:'Venus',2:'Merkur',3:'Mond',4:'Sonne',5:'Merkur',6:'Venus',7:'Pluto',8:'Jupiter',9:'Saturn',10:'Uranus',11:'Neptun'};
var GEW={Sonne:3,Mond:3,ASC:3,MC:2.5,Merkur:2,Venus:2,Mars:2,Jupiter:1.5,Saturn:1.5,Uranus:1,Neptun:1,Pluto:1,Lilith:1.5,Chiron:1.5};
var ORB={Sonne:6,Mond:6,ASC:5,MC:5,Merkur:5,Venus:5,Mars:5,Jupiter:4,Saturn:4,Uranus:3,Neptun:3,Pluto:3,Lilith:2.5,Chiron:3};
var HT=['Person und Auftreten','Wert und Besitz','Sprache und Nahbereich','Zuhause und Wurzeln','Ausdruck und Romantik',
 'Alltag und Arbeit','Partnerschaft','Tiefe und Geteiltes','Sinn und Weite','Beruf und Sichtbarkeit','Gruppen und Ziele','Rückzug und Inneres'];
var HK=['Person','Wert','Sprache','Zuhause','Ausdruck','Alltag','Partnerschaft','Tiefe','Sinn','Beruf','Gruppen','Rückzug'];

function nrm(x){x=x%360;return x<0?x+360:x;}
function fmt(l){var s=Math.floor(l/30),d=l-30*s,m=Math.round((d-Math.floor(d))*60),dd=Math.floor(d);
 if(m===60){m=0;dd+=1;} return dd+'° '+SIGNS[s]+' '+('0'+m).slice(-2)+"'";}
function haus(P,l){return ((Math.floor(l/30)-Math.floor(P.ASC/30))%12+12)%12;}

/* Sammelt alles, was zu einer Facette gehört */
function befunde(P, anker){
  var haeuser=anker.haeuser||[], punkte=anker.punkte||[];
  var f={planeten:[], herrscher:[], aspekte:[], achsnah:[], leer:[], grade:[]};

  /* Planeten in den Ankerhäusern */
  haeuser.forEach(function(hn){
    var drin=[];
    Object.keys(P).forEach(function(k){
      if(k==='_jd'||k==='ASC'||k==='MC'||!GEW[k]) return;
      if(haus(P,P[k])===hn-1) drin.push(k);
    });
    if(drin.length) drin.forEach(function(k){ f.planeten.push({p:k,haus:hn,pos:P[k]}); });
    else f.leer.push(hn);
    /* Herrscher des Hauses */
    var zi=(Math.floor(P.ASC/30)+(hn-1))%12, hp=HERR[zi];
    if(P[hp]!==undefined) f.herrscher.push({haus:hn,zeichen:SIGNS[zi],p:hp,inHaus:haus(P,P[hp])+1,pos:P[hp]});
  });

  /* Aspekte zwischen den beteiligten Punkten */
  var beteiligt={};
  punkte.forEach(function(p){ beteiligt[p]=1; });
  f.planeten.forEach(function(x){ beteiligt[x.p]=1; });
  f.herrscher.forEach(function(x){ beteiligt[x.p]=1; });
  var liste=Object.keys(beteiligt).filter(function(k){return P[k]!==undefined;});
  for(var i=0;i<liste.length;i++)for(var j=i+1;j<liste.length;j++){
    var a=liste[i],b=liste[j];
    if(!ORB[a]||!ORB[b]) continue;
    var s=Math.abs(nrm(P[a]-P[b]+180)-180);
    [[0,'Konjunktion','hart'],[60,'Sextil','weich'],[90,'Quadrat','hart'],[120,'Trigon','weich'],[180,'Opposition','hart']].forEach(function(A){
      var o=Math.abs(s-A[0]), max=((ORB[a]+ORB[b])/2)*(A[0]===60?0.6:0.9);
      if(o<=max) f.aspekte.push({a:a,b:b,typ:A[1],art:A[2],o:o});
    });
  }
  f.aspekte.sort(function(x,y){return x.o-y.o;});

  /* Achsennähe und Randgrade */
  liste.forEach(function(k){
    if(k==='ASC'||k==='MC'||P[k]===undefined) return;
    var d=P[k]%30;
    var dA=Math.abs(((d-(P.ASC%30))+45)%30-15), dM=Math.abs(((d-(P.MC%30))+45)%30-15);
    if(Math.min(dA,dM)<=2) f.achsnah.push({p:k,zu:(dA<dM?'Aszendent':'MC'),o:Math.min(dA,dM)});
    if(d<1) f.grade.push({p:k,art:'frueh'});
    if(d>=29) f.grade.push({p:k,art:'spaet'});
  });
  return f;
}

/* Wie laut ist diese Facette in diesem Chart? */
function punkte(P, anker, f){
  var s=0;
  f.planeten.forEach(function(x){ s+=(GEW[x.p]||1)*1.6; });
  (anker.punkte||[]).forEach(function(p){
    if(P[p]===undefined) return;
    /* ein beteiligter Punkt zählt mit, wenn er eng an einem persönlichen Punkt hängt */
    ['Sonne','Mond','ASC','MC'].forEach(function(pp){
      if(P[pp]===undefined||pp===p) return;
      var d=Math.abs(nrm(P[p]-P[pp]+180)-180);
      [0,90,120,180,60].forEach(function(w){ if(Math.abs(d-w)<=3) s+=1.6; });
    });
  });
  f.herrscher.forEach(function(x){
    if((anker.haeuser||[]).indexOf(x.inHaus)>=0) s+=2.2;       /* Herrscher bleibt im Thema */
    if((anker.punkte||[]).indexOf(x.p)>=0) s+=1.2;
  });
  f.aspekte.forEach(function(x){ s+=(x.o<1?2.2:(x.o<3?1.4:0.6)); });
  f.achsnah.forEach(function(){ s+=2.4; });
  f.grade.forEach(function(){ s+=0.8; });
  return Math.round(s*10)/10;
}


/* Kleines Häuserrad pro Facette — zeigt, welche Häuser betroffen sind und wo die Planeten sitzen */
function miniRad(P, anker, f, prozent){
  var GLYM={Sonne:'☉',Mond:'☽',Merkur:'☿',Venus:'♀',Mars:'♂',Jupiter:'♃',Saturn:'♄',
   Uranus:'♅',Neptun:'♆',Pluto:'♇',Lilith:'⚸',Chiron:'⚷'};
  var W=230,C=115,R1=104,R2=74,R3=52;
  var haeuser=anker.haeuser||[];
  var o=['<svg viewBox="0 0 '+W+' '+W+'" class="mini-rad" role="img" aria-label="Betroffene Häuser">'];

  function pkt(h,r){ var a=(180+(h*30+15))*Math.PI/180; return [C+r*Math.cos(a), C-r*Math.sin(a)]; }
  function bogen(h,ri,ra){
    var a0=(180+h*30)*Math.PI/180, a1=(180+(h+1)*30)*Math.PI/180;
    var p1=[C+ra*Math.cos(a0),C-ra*Math.sin(a0)], p2=[C+ra*Math.cos(a1),C-ra*Math.sin(a1)];
    var p3=[C+ri*Math.cos(a1),C-ri*Math.sin(a1)], p4=[C+ri*Math.cos(a0),C-ri*Math.sin(a0)];
    return 'M'+p1[0].toFixed(1)+','+p1[1].toFixed(1)+
     ' A'+ra+','+ra+' 0 0 0 '+p2[0].toFixed(1)+','+p2[1].toFixed(1)+
     ' L'+p3[0].toFixed(1)+','+p3[1].toFixed(1)+
     ' A'+ri+','+ri+' 0 0 1 '+p4[0].toFixed(1)+','+p4[1].toFixed(1)+' Z';
  }
  /* Häusersektoren */
  for(var h=0;h<12;h++){
    var ist=(haeuser.indexOf(h+1)>=0);
    o.push('<path d="'+bogen(h,R2,R1)+'" fill="'+(ist?'#E9EDF4':'#FCF9F4')+
      '" stroke="'+(ist?'#2E3A5C':'#EBE1D2')+'" stroke-width="'+(ist?1.4:.7)+'"/>');
    var n=pkt(h,(R1+R2)/2);
    o.push('<text x="'+n[0].toFixed(1)+'" y="'+(n[1]+4).toFixed(1)+'" text-anchor="middle" font-size="11" fill="'+
      (ist?'#2E3A5C':'#B5A996')+'">'+(h+1)+'</text>');
  }
  /* Planeten der Facette in ihre Häuser setzen */
  var proHaus={};
  (f.planeten||[]).forEach(function(x){ (proHaus[x.haus]=proHaus[x.haus]||[]).push(x.p); });
  (f.herrscher||[]).forEach(function(x){ (proHaus[x.inHaus]=proHaus[x.inHaus]||[]).push(x.p); });
  Object.keys(proHaus).forEach(function(hn){
    var liste=[]; proHaus[hn].forEach(function(p){ if(liste.indexOf(p)<0) liste.push(p); });
    var p0=pkt(hn-1,R3+14);
    var txt=liste.map(function(p){return GLYM[p]||p.slice(0,2);}).join('');
    o.push('<text x="'+p0[0].toFixed(1)+'" y="'+(p0[1]+5).toFixed(1)+'" text-anchor="middle" font-size="14" fill="#2E3A5C">'+txt+'</text>');
  });
  /* Mitte: Stärke */
  o.push('<circle cx="'+C+'" cy="'+C+'" r="'+R3+'" fill="#FFFDFA" stroke="#EBE1D2"/>');
  var u=2*Math.PI*(R3-7), anteil=Math.max(0,Math.min(100,prozent))/100;
  o.push('<circle cx="'+C+'" cy="'+C+'" r="'+(R3-7)+'" fill="none" stroke="#EBE1D2" stroke-width="6"/>');
  o.push('<circle cx="'+C+'" cy="'+C+'" r="'+(R3-7)+'" fill="none" stroke="'+
    (prozent>=62?'#2E3A5C':(prozent<45?'#C9BCA8':'#9A7235'))+'" stroke-width="6" stroke-linecap="round" '+
    'stroke-dasharray="'+(u*anteil).toFixed(1)+' '+u.toFixed(1)+'" transform="rotate(-90 '+C+' '+C+')"/>');
  o.push('<text x="'+C+'" y="'+(C+2)+'" text-anchor="middle" font-size="21" fill="#2E3A5C" font-family="Fraunces,Georgia,serif">'+prozent+'</text>');
  o.push('<text x="'+C+'" y="'+(C+18)+'" text-anchor="middle" font-size="9" fill="#8B7E6C" letter-spacing="1.2">VON 100</text>');
  o.push('</svg>');
  return o.join('');
}

window.AC_RAUM={
  SIGNS:SIGNS, GLY:GLY, miniRad:miniRad, HT:HT, HK:HK, HERR:HERR, fmt:fmt, haus:haus,
  chart:function(p){
    var ut=p.h+p.mi/60-p.tz,y=p.y,mo=p.mo,d=p.d;
    if(ut<0){ut+=24;d-=1;} if(ut>=24){ut-=24;d+=1;}
    var jd=jdFromUT(y,mo,d,ut),T=(jd-2451545)/36525,a=angles(jd,p.lat,p.lon);
    var P={Sonne:sunLon(T),Mond:moonLon(T),Merkur:geo('Merkur',T),Venus:geo('Venus',T),Mars:geo('Mars',T),
     Jupiter:geo('Jupiter',T),Saturn:geo('Saturn',T),Uranus:geo('Uranus',T),Neptun:geo('Neptun',T),
     Pluto:geo('Pluto',T),ASC:a.asc,MC:a.mc,_jd:jd};
    if(typeof lilithLon==='function') P.Lilith=lilithLon(T);
    if(typeof chironLon==='function') P.Chiron=chironLon(T);
    return P;
  },
  auswerten:function(P, def){
    var res=def.facetten.map(function(fc){
      var f=befunde(P,fc.anker);
      return {fc:fc, f:f, s:punkte(P,fc.anker,f)};
    });
    res.sort(function(a,b){return b.s-a.s;});
    var max=res.length?res[0].s:1;
    res.forEach(function(r){ r.rel=max?Math.round(r.s/max*100):0; });
    return res;
  },
  /* Baut Sätze aus den Befunden — die Raum-Definition liefert die Regeln */
  text:function(r, P){
    var out=[];
    (r.fc.regeln||[]).forEach(function(reg){
      try{ var t=reg(r.f, P, {fmt:fmt, HT:HT, HK:HK, haus:function(l){return haus(P,l);}, SIGNS:SIGNS});
        if(t) out.push(t); }catch(e){}
    });
    return out;
  }
};
})();
