/* ── Beziehung · Rechner ─────────────────────────────────────
   Rechnet die Seelenebene zwischen zwei Profilen: Kontakte mit engen
   Orben, gegenseitige Häuser, das Composite und die chinesische Ebene.
   Schreibt keinen Satz. Die Namen der Marker und Ebenen sind Schlüssel;
   was sie bedeuten, steht in beziehung-daten.js.

   Gerechnet wird gegen engine.js (Planeten, Achsen, mittlerer Knoten),
   kleine-punkte.js (Chiron, mittlere Lilith), asteroiden.js (Juno) und
   bazi.js (Säulen nach Li Chun). Abweichung zur Schweizer Ephemeride
   geprüft in _test-bez.js: Planeten unter 0,12°, Achsen und Vertex
   unter 0,02°. */

var BZR_PL=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];
var BZR_WINKEL=[[0,'Konjunktion'],[60,'Sextil'],[90,'Quadrat'],[120,'Trigon'],[180,'Opposition']];
var BZR_HART={90:1,180:1};

function bzrNrm(x){ x=x%360; return x<0?x+360:x; }
function bzrAbstand(a,b){ return Math.abs(((a-b+540)%360)-180); }
/* Der engste Winkel unter den erlaubten. max: {0:8, 90:6, ...} */
function bzrWinkel(a,b,max){
  if(a===undefined||a===null||b===undefined||b===null) return null;
  var d=bzrAbstand(a,b), best=null;
  BZR_WINKEL.forEach(function(w){
    if(max[w[0]]===undefined) return;
    var orb=Math.abs(d-w[0]);
    if(orb<=max[w[0]] && (!best||orb<best.orb))
      best={w:w[0], typ:w[1], orb:orb, max:max[w[0]], hart:!!BZR_HART[w[0]]};
  });
  return best;
}

/* Der Vertex: Schnitt von Erstvertikal und Ekliptik im Westen. Die
   Formel des Aszendenten mit der Kobreite liefert eine der beiden
   Schnittstellen; genommen wird die, die näher am Deszendenten liegt.
   Gegen pyswisseph geprüft: unter 0,02° auf 300 Zufallsdaten. */
function bzrVertex(jd,lat,lon){
  var T=(jd-2451545)/36525, e=epsOf(T)*RAD, r=norm(gmst(jd)+lon+180)*RAD, phi=(90-lat)*RAD;
  var v=bzrNrm(Math.atan2(Math.cos(r),-(Math.sin(r)*Math.cos(e)+Math.tan(phi)*Math.sin(e)))/RAD);
  var dsc=bzrNrm(angles(jd,lat,lon).asc+180);
  return bzrAbstand(v,dsc)>90 ? bzrNrm(v+180) : v;
}

function bzrHatZeit(p){ return !(p.h===undefined||p.h===null||p.ohneZeit); }
function bzrJD(p){
  var ut=bzrHatZeit(p)?(p.h+p.mi/60-p.tz):(12-(p.tz||0)), y=p.y, mo=p.mo, d=p.d;
  if(ut<0){ut+=24;d-=1;} if(ut>=24){ut-=24;d+=1;}
  return jdFromUT(y,mo,d,ut);
}

/* Alle Punkte eines Menschen */
function bzrBild(p){
  var jd=bzrJD(p), T=(jd-2451545)/36525, C={_zeit:bzrHatZeit(p), _jd:jd};
  C.Sonne=sunLon(T); C.Mond=moonLon(T);
  ['Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'].forEach(function(k){ C[k]=geo(k,T); });
  C.Nordknoten=nodeLon(T); C.Suedknoten=bzrNrm(C.Nordknoten+180);
  if(window.chironLon){ var c=chironLon(T); if(c!==null) C.Chiron=c; }
  if(window.lilithLon) C.Lilith=lilithLon(T);
  if(window.junoLon){ var j=junoLon(T); if(j!==null) C.Juno=j; }
  if(C._zeit){
    var a=angles(jd,p.lat,p.lon);
    C.ASC=a.asc; C.MC=a.mc; C.DSC=bzrNrm(a.asc+180); C.IC=bzrNrm(a.mc+180);
    C.Vertex=bzrVertex(jd,p.lat,p.lon);
  }
  return C;
}
/* Ganze Zeichen als Häuser, wie im Rest der Seite */
function bzrHaus(C,l){
  if(C.ASC===undefined||l===undefined) return 0;
  return ((Math.floor(bzrNrm(l)/30)-Math.floor(C.ASC/30))%12+12)%12+1;
}

/* ── Die Marker ────────────────────────────────────────────────
   Je Marker die Punktpaare und die erlaubten Winkel. Geprüft wird in
   beide Richtungen: Punkt x von A zu Punkt y von B und umgekehrt. */
var BZR_PERS=['Sonne','Mond','Venus','Mars'];
var BZR_MARKER=[
 {k:'lichter',  x:['Sonne'], y:['Mond'], max:{0:8,180:8,90:6,120:6,60:4}},
 {k:'spiegel',  x:['Sonne','Mond','ASC'], gleich:true, max:{0:8,180:8}, maxGleich:{Mond:{0:8},ASC:{0:5,180:5}}},
 {k:'nordknoten', x:['Nordknoten'], y:['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','ASC'], max:{0:4}, maxY:{ASC:{0:3}}},
 {k:'suedknoten', x:['Suedknoten'], y:['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','ASC'], max:{0:4}, maxY:{ASC:{0:3}}},
 {k:'venusmars',x:['Venus'], y:['Mars'], max:{0:7,180:7,90:6,120:6,60:4}},
 {k:'juno',     x:['Juno'], y:['Sonne','Mond','Venus','Mars','ASC','DSC'], max:{0:3,180:3,120:1.5}},
 {k:'juno',     haus:[7,8], y:['Juno']},
 {k:'vertex',   x:['Vertex'], y:['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','ASC','MC'], max:{0:2.5,180:2.5}},
 {k:'chiron',   x:['Chiron'], y:['Sonne','Mond','Venus','Mars','ASC'], max:{0:2.5,180:2.5,90:2,120:1.5,60:1.5}},
 {k:'saturn',   x:['Saturn'], y:['Sonne','Mond','Venus','ASC'], max:{0:3.5,180:3.5,90:3,120:2.5,60:2}},
 {k:'pluto',    x:['Pluto'], y:['Sonne','Mond','Venus','Mars','ASC'], max:{0:3,180:3,90:2.5,120:2}},
 {k:'reibung',  x:['Sonne','Mond','Venus'], y:['Sonne','Mond','Venus','Mars'], max:{90:4,180:5}},
 {k:'nahferne', x:['Uranus','Neptun'], y:['Sonne','Mond','Venus'], max:{0:3,90:2.5,180:3}},
 {k:'lilith',   x:['Lilith'], y:['Sonne','Mond','Venus','Mars','ASC'], max:{0:3,180:3}},
 {k:'vertraut', paare:[['Merkur','Merkur'],['Merkur','Mond'],['Jupiter','Sonne'],['Jupiter','Mond'],['Mond','Mond']], max:{0:5,120:4,60:3}},
 {k:'berufung', x:['MC'], y:['Sonne','Mond','Venus','Jupiter','Saturn'], max:{0:4}},
 {k:'verborgen', haus:[12], y:['Sonne','Mond','Venus']},
 {k:'verschmelzung', haus:[8], y:['Sonne','Mond','Venus']}
];

/* Paare eines Markers als Liste [x,y] */
function bzrPaare(m){
  if(m.paare) return m.paare;
  var out=[];
  if(m.gleich){ m.x.forEach(function(k){ out.push([k,k]); }); return out; }
  m.x.forEach(function(a){ m.y.forEach(function(b){ if(a!==b) out.push([a,b]); }); });
  return out;
}
function bzrMax(m,x,y){
  if(m.gleich && m.maxGleich && m.maxGleich[x]) return m.maxGleich[x];
  if(m.maxY && m.maxY[y]) return m.maxY[y];
  return m.max;
}

/* Treffer eines Markers. A und B sind Bilder; wer: 'A' heißt, der
   erste Punkt gehört A. */
function bzrTreffer(m,A,B){
  var hits=[], schon={};
  if(m.haus){
    [[A,B,'A'],[B,A,'B']].forEach(function(s){
      if(s[1].ASC===undefined) return;
      m.y.forEach(function(k){
        var h=bzrHaus(s[1],s[0][k]);
        if(m.haus.indexOf(h)>=0) hits.push({wer:s[2], x:k, y:'Haus', haus:h, typ:'Haus', orb:0, max:1, hart:false});
      });
    });
    return hits;
  }
  bzrPaare(m).forEach(function(p){
    [[A,B,'A'],[B,A,'B']].forEach(function(s){
      if(p[0]===p[1] && s[2]==='B') return;            /* gleiche Punkte nur einmal */
      var w=bzrWinkel(s[0][p[0]], s[1][p[1]], bzrMax(m,p[0],p[1]));
      if(!w) return;
      /* Derselbe Kontakt kann über zwei Regeln kommen (A-Sonne zu
         B-Mond ist B-Mond zu A-Sonne). Gezählt wird er einmal. */
      var id=s[2]==='A' ? p[0]+'|'+p[1] : p[1]+'|'+p[0];
      if(schon[id]) return; schon[id]=1;
      hits.push({wer:s[2], x:p[0], y:p[1], typ:w.typ, w:w.w, orb:w.orb, max:w.max, hart:w.hart});
    });
  });
  hits.sort(function(a,b){ return (a.orb/a.max)-(b.orb/b.max); });
  return hits;
}

/* Stärke 0–5: die Enge des besten Treffers, dazu ein Punkt für
   einen zweiten Treffer. Ein Haustreffer zählt als mittel. */
function bzrStaerke(hits){
  if(!hits.length) return 0;
  var h=hits[0], t=h.typ==='Haus'?0.5:1-h.orb/h.max;
  var s=1+Math.round(3*t)+(hits.length>=2?1:0);
  return Math.min(5,s);
}

/* Das Composite: Mittelpunkte auf dem kürzeren Bogen */
function bzrMitte(a,b){
  var d=bzrNrm(b-a);
  return d<=180 ? bzrNrm(a+d/2) : bzrNrm(b+(360-d)/2);
}
function bzrComposite(A,B){
  var C={};
  BZR_PL.concat(['ASC','MC','Nordknoten']).forEach(function(k){
    if(A[k]!==undefined && B[k]!==undefined) C[k]=bzrMitte(A[k],B[k]);
  });
  return C;
}
var BZR_COMP=[
 {k:'band',    x:['Sonne'], y:['Mond'], max:{0:6,180:6,90:5,120:5,60:4}},
 {k:'liebe',   x:['Venus'], y:['Mars'], max:{0:6,180:6,90:5,120:5,60:4}},
 {k:'pruefung',x:['Saturn'], y:['Sonne','Venus','Mond'], max:{0:5,180:5,90:5}},
 {k:'halt',    x:['Saturn'], y:['Sonne','Venus','Mond'], max:{120:5,60:4}},
 {k:'tiefe',   x:['Pluto'], y:['Sonne','Mond','Venus'], max:{0:4,180:4,90:4,120:3,60:3}},
 {k:'freiheit',x:['Uranus'], y:['Sonne','Mond','Venus'], max:{0:4,180:4,90:4}},
 {k:'traum',   x:['Neptun'], y:['Sonne','Mond','Venus'], max:{0:4,180:4,90:4,120:3}},
 {k:'glueck',  x:['Jupiter'], y:['Sonne','Mond','Venus'], max:{0:5,120:5,60:4}}
];
function bzrCompositeKontakte(C){
  var out=[];
  BZR_COMP.forEach(function(m){
    m.y.forEach(function(y){
      var w=bzrWinkel(C[m.x[0]], C[y], m.max);
      if(w) out.push({k:m.k, x:m.x[0], y:y, typ:w.typ, orb:w.orb, max:w.max, hart:w.hart});
    });
  });
  out.sort(function(a,b){ return (a.orb/a.max)-(b.orb/b.max); });
  /* je Thema nur der engste */
  var seen={};
  return out.filter(function(o){ if(seen[o.k]) return false; seen[o.k]=1; return true; });
}

/* ── Die Seelenebenen ─────────────────────────────────────────
   Gewichte je Marker. Was die Ebenen bedeuten, steht in den Daten;
   hier steht nur, welche Kontakte für welche Ebene sprechen. Die
   Gewichte folgen der verbreiteten spirituell-astrologischen Lesart
   und sind keine Messung. */
var BZR_EBENE={
 seelenverwandt:{lichterWeich:3, spiegel:1, venusmarsWeich:2, juno:1.5, vertraut:1.5, nordknoten:0.5, compBand:1.5, compHalt:1, compGlueck:1},
 dualseele:    {lichterEng:3, lichterHart:2, lichterWeich:1, spiegel:2.5, nordknoten:2, vertex:2, juno:1.5, chiron:1.5,
                reibung:1.5, nahferne:1.5, verborgen:1, verschmelzung:1, saturn:1, lilith:1, venusmarsHart:1.5, venusmarsWeich:0.5, compBand:1, compPruefung:1},
 karmisch:     {suedknoten:3, saturn:2.5, pluto:2, verborgen:2, verschmelzung:1, lilith:1.5, reibung:1, venusmarsHart:0.5, compPruefung:1.5, compTiefe:1.5},
 seelenfamilie:{vertraut:3, lichterWeich:1.5, spiegel:1, nordknoten:0.5, compGlueck:1.5, compBand:0.5},
 seelenlehrer: {saturnWeich:2, chiron:2, berufung:2.5, nordknoten:1.5, vertraut:0.5, compHalt:1}
};
var BZR_EBENEN=['seelenverwandt','dualseele','karmisch','seelenfamilie','seelenlehrer'];

/* Die Teilwerte, auf die sich die Gewichte beziehen */
function bzrTeile(M,comp){
  var s={}, by={};
  M.forEach(function(m){ by[m.k]=m; s[m.k]=m.staerke/5; });
  function teil(k,f){
    var m=by[k]; if(!m) return 0;
    var hs=m.hits.filter(f); return hs.length?bzrStaerke(hs)/5:0;
  }
  s.lichterEng =teil('lichter',function(h){return h.w===0||h.w===180;});
  s.lichterHart=teil('lichter',function(h){return h.w===90;});
  s.lichterWeich=teil('lichter',function(h){return h.w===60||h.w===120||h.w===0;});
  s.venusmarsWeich=teil('venusmars',function(h){return !h.hart;});
  s.venusmarsHart =teil('venusmars',function(h){return h.hart;});
  s.saturnWeich=teil('saturn',function(h){return !h.hart&&h.w!==0;});
  var c={}; (comp||[]).forEach(function(o){ c[o.k]=1-o.orb/o.max; });
  s.compBand=c.band||0; s.compPruefung=c.pruefung||0; s.compHalt=c.halt||0;
  s.compTiefe=c.tiefe||0; s.compGlueck=c.glueck||0;
  return s;
}
function bzrEbenen(M,comp){
  var s=bzrTeile(M,comp), out={};
  BZR_EBENEN.forEach(function(e){
    var g=BZR_EBENE[e], sum=0;
    for(var k in g) if(g.hasOwnProperty(k)) sum+=g[k]*(s[k]||0);
    out[e]=sum;
  });
  /* Eine Dualseele braucht beides: Resonanz und Reibung. Fehlt eins,
     ist es eine andere Verbindung, so viel Spiegel auch da ist. */
  var resonanz=Math.max(s.lichter||0,s.spiegel||0,s.venusmars||0,s.nordknoten||0);
  var reibung=Math.max(s.reibung||0,s.nahferne||0,s.lichterHart||0,s.venusmarsHart||0,
                       s.compPruefung||0, (s.saturn||0)-(s.saturnWeich||0));
  if(resonanz<0.4) out.dualseele*=0.5;
  if(reibung<0.4) out.dualseele*=0.5;
  if((s.reibung||0)>=0.8) out.seelenverwandt*=0.85;
  return out;
}

/* Perzentil einer Zahl in einer Verteilung aus 21 Stützstellen
   (0 %, 5 % … 100 %). Ergebnis 0–100. */
function bzrPerzentil(x,q){
  if(!q||!q.length) return null;
  if(x<=q[0]) return 0;
  if(x>=q[q.length-1]) return 100;
  for(var i=1;i<q.length;i++){
    if(x<=q[i]){
      var t=q[i]===q[i-1]?0.5:(x-q[i-1])/(q[i]-q[i-1]);
      return Math.round((i-1+t)*100/(q.length-1));
    }
  }
  return 100;
}

/* Alles zusammen */
function bzrSeele(pa,pb){
  var A=bzrBild(pa), B=bzrBild(pb), M=[];
  var je={};
  BZR_MARKER.forEach(function(m){
    var hits=bzrTreffer(m,A,B);
    if(!hits.length) return;
    /* zwei Regeln mit demselben Schlüssel sind ein Marker */
    if(je[m.k]){ je[m.k].hits=je[m.k].hits.concat(hits); je[m.k].staerke=bzrStaerke(je[m.k].hits); return; }
    je[m.k]={k:m.k, hits:hits, staerke:bzrStaerke(hits)}; M.push(je[m.k]);
  });
  var zeit=A._zeit&&B._zeit;
  var C=bzrComposite(A,B);
  var ck=bzrCompositeKontakte(C);
  var E=bzrEbenen(M,ck), V=(typeof BZR_VERTEILUNG!=='undefined')?BZR_VERTEILUNG:{}, P={};
  var dichte=M.reduce(function(s,m){return s+m.staerke;},0);
  BZR_EBENEN.forEach(function(e){ P[e]=bzrPerzentil(E[e],V[e]); });
  var rang=BZR_EBENEN.slice().sort(function(a,b){
    var d=(P[b]||0)-(P[a]||0); return d!==0?d:E[b]-E[a]; });
  return {A:A, B:B, marker:M, composite:C, compKontakte:ck, roh:E, perz:P, rang:rang,
          dichte:dichte, dichtePerz:bzrPerzentil(dichte,V.dichte), zeit:zeit};
}

/* ── Die chinesische Ebene ────────────────────────────────────
   Zwei Jahreswechsel: das Mondneujahr, nach dem im Alltag das Tier
   bestimmt wird, und Li Chun (Sonne auf 315°), nach dem BaZi rechnet.
   Das Mondneujahr ist der Beginn des zweiten Mondmonats nach dem
   Monat, in dem die Wintersonnenwende liegt, nach chinesischer Zeit
   (UTC+8). Einfach „der Neumond zwischen 21.1. und 20.2." stimmt
   nicht immer: 1985 lag ein Neumond am 21.1., Neujahr war der 20.2. */
var BZR_SANHE=[[0,4,8],[5,9,1],[2,6,10],[11,3,7]];        /* Wasser, Metall, Feuer, Holz */
var BZR_SANHE_EL=['Wasser','Metall','Feuer','Holz'];
var BZR_LIUHE=[[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]];
var BZR_HAI=[[0,7],[1,6],[2,5],[3,4],[8,11],[9,10]];
var BZR_EL=['Holz','Feuer','Erde','Metall','Wasser'];

function bzrMondneujahr(y){
  /* Mitternacht chinesischer Zeit für jeden Tag vom 15.11. des
     Vorjahres bis zum 15.3.: Neumonde und den Tag der Sonnenwende
     als Tagesnummer festhalten. */
  var start=jdFromUT(y-1,11,15,0)-8/24, neu=[], wende=null, vorEl=null, vorSo=null;
  for(var t=0;t<=121;t++){
    var T=(start+t-2451545)/36525, so=sunLon(T), el=bzrNrm(moonLon(T)-so);
    /* zwischen Mitternacht t-1 und t: der Tag ist t-1 */
    if(vorEl!==null && vorEl>300 && el<60) neu.push(t-1);
    if(vorSo!==null && wende===null && vorSo<270 && so>=270) wende=t-1;
    vorEl=el; vorSo=so;
  }
  if(wende===null) return null;
  var i11=-1;
  for(var i=0;i<neu.length;i++) if(neu[i]<=wende) i11=i;
  if(i11<0 || !neu[i11+2]) return null;
  var d=new Date(Date.UTC(y-1,10,15+neu[i11+2]));
  return {y:d.getUTCFullYear(), mo:d.getUTCMonth()+1, d:d.getUTCDate()};
}
function bzrChinaDatum(p){
  /* Geburtsmoment in chinesischer Zeit */
  var jd=bzrJD(p)+8/24, z=Math.floor(jd+0.5), f=jd+0.5-z, a=z;
  if(z>=2299161){ var al=Math.floor((z-1867216.25)/36524.25); a=z+1+al-Math.floor(al/4); }
  var b=a+1524, c=Math.floor((b-122.1)/365.25), d=Math.floor(365.25*c), e=Math.floor((b-d)/30.6001);
  var tag=b-d-Math.floor(30.6001*e), mo=e<14?e-1:e-13, jahr=mo>2?c-4716:c-4715;
  return {y:jahr, mo:mo, d:tag};
}
function bzrTierJahr(p){
  var c=bzrChinaDatum(p), ny=bzrMondneujahr(c.y), jahr=c.y;
  if(ny && (c.mo<ny.mo || (c.mo===ny.mo && c.d<ny.d))) jahr=c.y-1;
  return jahr;
}
function bzrBeziehungZweig(a,b){
  if(a===b) return 'gleich';
  function in_(l){ return l.some(function(x){ return (x[0]===a&&x[1]===b)||(x[0]===b&&x[1]===a); }); }
  if(in_(BZR_LIUHE)) return 'liuhe';
  for(var i=0;i<BZR_SANHE.length;i++) if(BZR_SANHE[i].indexOf(a)>=0&&BZR_SANHE[i].indexOf(b)>=0) return 'sanhe';
  if((a+6)%12===b) return 'chong';
  if(in_(BZR_HAI)) return 'hai';
  return 'neutral';
}
function bzrSanheGruppe(z){ for(var i=0;i<BZR_SANHE.length;i++) if(BZR_SANHE[i].indexOf(z)>=0) return i; return -1; }
/* Elemente: wer nährt, wer bremst. */
function bzrBeziehungElement(ea,eb){
  var ia=BZR_EL.indexOf(ea), ib=BZR_EL.indexOf(eb);
  if(ia===ib) return 'gleich';
  if((ia+1)%5===ib) return 'anaehrtb';
  if((ib+1)%5===ia) return 'bnaehrta';
  if((ia+2)%5===ib) return 'abremstb';
  return 'bbremsta';
}
function bzrChina(pa,pb){
  var B=window.AC_BAZI; if(!B) return null;
  function eins(p){
    var s=B.saeulen({y:p.y,mo:p.mo,d:p.d,h:bzrHatZeit(p)?p.h:12,mi:bzrHatZeit(p)?p.mi:0,tz:p.tz||0});
    var j=bzrTierJahr(p), z=((j-4)%12+12)%12, st=((j-4)%10+10)%10;
    var c=bzrChinaDatum(p);
    return {jahr:j, tier:z, stamm:st, element:B.ST_EL[st], yy:B.ST_YY[st],
            baziTier:s.jahr.z, abweichend:s.jahr.z!==z,
            grenznah:(c.mo===1&&c.d>=15)||(c.mo===2&&c.d<=25),
            tag:{s:s.tag.s, z:s.tag.z, el:B.ST_EL[s.tag.s], yy:B.ST_YY[s.tag.s]},
            tagUnsicher:!bzrHatZeit(p)};
  }
  var a=eins(pa), b=eins(pb);
  var tagStamm=((a.tag.s+5)%10===b.tag.s)?'wuhe':bzrBeziehungElement(a.tag.el,b.tag.el);
  return {a:a, b:b,
    tiere:bzrBeziehungZweig(a.tier,b.tier),
    sanhe:bzrSanheGruppe(a.tier)===bzrSanheGruppe(b.tier)?bzrSanheGruppe(a.tier):-1,
    jahrElement:bzrBeziehungElement(a.element,b.element),
    tagStamm:tagStamm,
    tagGleichPol:a.tag.el===b.tag.el && a.tag.yy===b.tag.yy,
    palast:bzrBeziehungZweig(a.tag.z,b.tag.z)};
}
