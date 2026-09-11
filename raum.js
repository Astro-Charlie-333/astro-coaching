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

window.AC_RAUM={
  SIGNS:SIGNS, GLY:GLY, HT:HT, HK:HK, HERR:HERR, fmt:fmt, haus:haus,
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
