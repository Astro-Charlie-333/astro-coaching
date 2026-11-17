/* Erzeugt beziehung-verteilung.js: wie dicht zufällige Paare sind.
   Aufruf: node _verteilung-bez.js [anzahl] [samen]
   Ohne Ausgabeziel druckt es nur. Mit --schreiben ersetzt es die Datei.

   Zufallspaare: A geboren 1950–2005, B höchstens acht Jahre älter oder
   jünger (so sehen die meisten Paare aus; mit beliebigem Abstand wären
   die langsamen Planeten verzerrt). Uhrzeit gleichverteilt, Orte in
   Mitteleuropa. Beide mit Geburtszeit. */
const fs=require('fs'), path=require('path');
global.window=globalThis;
const lies=n=>fs.readFileSync(path.join(__dirname,n),'utf8');
eval(lies('engine.js')+lies('../../kleine-punkte.js')+lies('../../asteroiden.js')+lies('beziehung-rechner.js'));
const N=+(process.argv[2]||20000); let s=+(process.argv[3]||20261117);
function zz(){ s=(s*1103515245+12345)%2147483648; return s/2147483648; }
function mensch(jahr){
  const d=new Date(Date.UTC(jahr,0,1)+Math.floor(zz()*365)*86400000);
  return {y:d.getUTCFullYear(),mo:d.getUTCMonth()+1,d:d.getUTCDate(),h:Math.floor(zz()*24),mi:Math.floor(zz()*60),
          tz:1,lat:45+zz()*10,lon:5+zz()*15};
}
const werte={dichte:[]}; BZR_EBENEN.forEach(e=>werte[e]=[]);
const markerAnteil={};
for(let i=0;i<N;i++){
  const ja=1950+Math.floor(zz()*56), a=mensch(ja), b=mensch(ja+Math.floor(zz()*17)-8);
  const r=bzrSeele(a,b);
  werte.dichte.push(r.dichte);
  BZR_EBENEN.forEach(e=>werte[e].push(r.roh[e]));
  r.marker.forEach(m=>{ markerAnteil[m.k]=(markerAnteil[m.k]||0)+1; });
}
const q={};
for(const k in werte){ const v=werte[k].sort((x,y)=>x-y);
  q[k]=Array.from({length:21},(_,i)=>+v[Math.min(v.length-1,Math.floor(i/20*(v.length-1)))].toFixed(3)); }
const haeufig={}; for(const k in markerAnteil) haeufig[k]=Math.round(100*markerAnteil[k]/N);
const aus='/* Erzeugt von _verteilung-bez.js ('+N+' Zufallspaare). Nicht von Hand ändern.\n'+
  '   21 Stützstellen je Größe: 0 %, 5 % … 100 % der Zufallspaare.\n'+
  '   haeufig: bei wie viel Prozent der Zufallspaare der Marker überhaupt vorkommt. */\n'+
  'var BZR_VERTEILUNG='+JSON.stringify(q)+';\nvar BZR_HAEUFIG='+JSON.stringify(haeufig)+';\n';
if(process.argv.includes('--schreiben')) fs.writeFileSync(path.join(__dirname,'beziehung-verteilung.js'),aus);
console.log(JSON.stringify({q,haeufig}));
