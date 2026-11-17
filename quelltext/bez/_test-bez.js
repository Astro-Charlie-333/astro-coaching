/* Prüfdatei für beziehung-rechner.js. Erfundene Menschen, keine
   echten Geburtsdaten. Die Sollwerte stammen aus der Schweizer
   Ephemeride (pyswisseph, Moshier), gerechnet am 17.11.2026.
   Gibt am Ende eine Zeile JSON aus: {"fehler":[...]} */
const fs=require('fs'), path=require('path');
global.window=globalThis;
const lies=n=>fs.readFileSync(path.join(__dirname,n),'utf8');
eval(lies('engine.js')+lies('../../kleine-punkte.js')+lies('../../asteroiden.js')+lies('../../bazi.js')+
     lies('beziehung-verteilung.js')+lies('beziehung-rechner.js'));
const f=[];
const ab=(a,b)=>Math.abs(((a-b+540)%360)-180);

/* 1 · Positionen gegen die Schweizer Ephemeride */
const SOLL=[
 {y:1985,mo:4,d:2,h:9,mi:40,tz:2,lat:52.52,lon:13.405,soll:{Sonne:12.515,Mond:148.346,Venus:15.097,Mars:43.045,Saturn:237.579,Pluto:213.943,Nordknoten:50.312,Chiron:64.745,Juno:183.258,Lilith:23.292,ASC:83.721,MC:316.546,Vertex:219.767}},
 {y:1990,mo:4,d:9,h:11,mi:5,tz:2,lat:48.14,lon:11.58,soll:{Sonne:19.255,Mond:190.826,Venus:333.095,Mars:321.368,Saturn:294.806,Pluto:227.141,Nordknoten:313.252,Chiron:101.042,Juno:233.025,Lilith:227.432,ASC:102.221,MC:343.916,Vertex:238.558}},
 {y:1972,mo:11,d:23,h:3,mi:15,tz:1,lat:-33.87,lon:151.21,soll:{Sonne:240.893,Mond:91.079,Venus:208.2,Mars:214.748,Saturn:78.386,Pluto:183.875,Nordknoten:289.313,Chiron:13.29,Juno:230.151,Lilith:240.531,ASC:340.729,MC:248.831,Vertex:122.997}},
 {y:2001,mo:1,d:17,h:22,mi:50,tz:1,lat:59.33,lon:18.07,soll:{Sonne:297.86,Mond:224.438,Venus:344.952,Mars:224.693,Saturn:54.107,Pluto:254.327,Nordknoten:104.79,Chiron:264.354,Juno:343.933,Lilith:305.873,ASC:188.148,MC:101.911,Vertex:18.798}}];
const TOL={Mond:0.2,Lilith:0.15,ASC:0.05,MC:0.05,Vertex:0.05,Chiron:0.05,Juno:0.05};
SOLL.forEach((p,i)=>{ const C=bzrBild(p);
  for(const k in p.soll){ const t=TOL[k]||0.15;
    if(C[k]===undefined) f.push(`Person ${i+1}: ${k} fehlt`);
    else if(ab(C[k],p.soll[k])>t) f.push(`Person ${i+1}: ${k} weicht um ${ab(C[k],p.soll[k]).toFixed(3)}° ab`); }});

/* 2 · Mondneujahr gegen bekannte Daten, mit dem Fall 1985 */
const NJ={1950:[2,17],1962:[2,5],1966:[1,21],1978:[2,7],1985:[2,20],1986:[2,9],1990:[1,27],1991:[2,15],
 1996:[2,19],2000:[2,5],2007:[2,18],2015:[2,19],2020:[1,25],2023:[1,22],2024:[2,10],1971:[1,27],1944:[1,25]};
for(const y in NJ){ const r=bzrMondneujahr(+y);
  if(!r||r.mo!==NJ[y][0]||r.d!==NJ[y][1]) f.push(`Mondneujahr ${y}: ${r?r.mo+'/'+r.d:'keins'} statt ${NJ[y].join('/')}`); }

/* 3 · Das Tier wechselt am Mondneujahr, nicht am 1. Januar */
const TIER=AC_BAZI.TIER;
[[1985,2,19,'Ratte'],[1985,2,21,'Büffel'],[1986,2,8,'Büffel'],[1986,2,10,'Tiger'],[2000,2,4,'Hase'],[2000,2,6,'Drache'],[1991,6,1,'Ziege']]
 .forEach(d=>{ const j=bzrTierJahr({y:d[0],mo:d[1],d:d[2],h:12,mi:0,tz:1}), t=TIER[((j-4)%12+12)%12];
   if(t!==d[3]) f.push(`Tier am ${d.slice(0,3).join('.')}: ${t} statt ${d[3]}`); });

/* 4 · Die Beziehungen der Tiere und Elemente */
[[0,1,'liuhe'],[2,11,'liuhe'],[0,4,'sanhe'],[3,7,'sanhe'],[0,6,'chong'],[0,7,'hai'],[9,10,'hai'],[3,3,'gleich'],[0,2,'neutral']]
 .forEach(x=>{ const r=bzrBeziehungZweig(x[0],x[1]), r2=bzrBeziehungZweig(x[1],x[0]);
   if(r!==x[2]||r2!==x[2]) f.push(`Tiere ${TIER[x[0]]}/${TIER[x[1]]}: ${r}/${r2} statt ${x[2]}`); });
[['Holz','Feuer','anaehrtb'],['Feuer','Holz','bnaehrta'],['Holz','Erde','abremstb'],['Erde','Holz','bbremsta'],
 ['Wasser','Holz','anaehrtb'],['Metall','Holz','abremstb'],['Erde','Erde','gleich']]
 .forEach(x=>{ const r=bzrBeziehungElement(x[0],x[1]); if(r!==x[2]) f.push(`Elemente ${x[0]}/${x[1]}: ${r} statt ${x[2]}`); });

/* 5 · Dieselbe Rechnung in beide Richtungen */
for(let i=0;i<SOLL.length;i++) for(let j=i+1;j<SOLL.length;j++){
  const r1=bzrSeele(SOLL[i],SOLL[j]), r2=bzrSeele(SOLL[j],SOLL[i]);
  const s1=r1.marker.map(m=>m.k+m.staerke).sort().join(), s2=r2.marker.map(m=>m.k+m.staerke).sort().join();
  if(s1!==s2) f.push(`Paar ${i+1}/${j+1}: Marker hängen von der Reihenfolge ab`);
  BZR_EBENEN.forEach(e=>{ if(Math.abs(r1.roh[e]-r2.roh[e])>1e-9) f.push(`Paar ${i+1}/${j+1}: ${e} hängt von der Reihenfolge ab`); });
  const k1=bzrChina(SOLL[i],SOLL[j]), k2=bzrChina(SOLL[j],SOLL[i]);
  if(k1.tiere!==k2.tiere||k1.palast!==k2.palast) f.push(`Paar ${i+1}/${j+1}: chinesische Beziehung hängt von der Reihenfolge ab`);
}

/* 6 · Ohne Geburtszeit: keine Achsen, kein Vertex, keine Häuser */
const oz=Object.assign({},SOLL[0],{h:null,mi:null,ohneZeit:true});
const r0=bzrSeele(oz,SOLL[1]);
if(r0.zeit) f.push('ohne Geburtszeit gilt die Rechnung als vollständig');
if(r0.A.ASC!==undefined||r0.A.Vertex!==undefined) f.push('ohne Geburtszeit stehen Achsen oder Vertex da');
if(r0.marker.some(m=>m.k==='vertex'&&m.hits.some(h=>(h.wer==='A'&&h.x==='Vertex')||(h.wer==='B'&&h.y==='Vertex'))))
  f.push('ohne Geburtszeit wird der Vertex gezählt');
/* Außerhalb der Asteroidentabelle: Juno fehlt, die Rechnung läuft */
try{ const alt=bzrSeele({y:1925,mo:5,d:3,h:10,mi:0,tz:1,lat:50,lon:10},SOLL[0]);
  if(alt.A.Juno!==undefined) f.push('Juno steht 1925 da, obwohl die Tabelle erst 1930 beginnt'); }
catch(e){ f.push('1925 bricht die Rechnung ab: '+e.message); }

/* 7 · Die gespeicherte Verteilung passt zu einer frischen Stichprobe */
let s=424242; const zz=()=>{ s=(s*1103515245+12345)%2147483648; return s/2147483648; };
function mensch(jahr){ const d=new Date(Date.UTC(jahr,0,1)+Math.floor(zz()*365)*86400000);
  return {y:d.getUTCFullYear(),mo:d.getUTCMonth()+1,d:d.getUTCDate(),h:Math.floor(zz()*24),mi:Math.floor(zz()*60),tz:1,lat:45+zz()*10,lon:5+zz()*15}; }
const P={dichte:[]}; BZR_EBENEN.forEach(e=>P[e]=[]);
for(let i=0;i<1500;i++){ const j=1950+Math.floor(zz()*56), r=bzrSeele(mensch(j),mensch(j+Math.floor(zz()*17)-8));
  P.dichte.push(r.dichtePerz); BZR_EBENEN.forEach(e=>P[e].push(r.perz[e])); }
for(const k in P){ const v=P[k].sort((a,b)=>a-b), med=v[Math.floor(v.length/2)];
  if(med<35||med>65) f.push(`Verteilung ${k}: Median einer frischen Stichprobe bei ${med}, erwartet um 50 — beziehung-verteilung.js neu erzeugen`); }

/* 8 · Häufigkeiten stehen für jeden Marker da */
BZR_MARKER.forEach(m=>{ if(BZR_HAEUFIG[m.k]===undefined) f.push(`keine Häufigkeit für ${m.k}`); });

console.log(JSON.stringify({fehler:f}));
