/* Tastet Geburtsbilder ab und zählt, wie oft jeder Befund vorkommt. */
const fs=require('fs'), path=require('path');
const wurzel=process.argv[2], N=+process.argv[3]||10000;
const code=[path.join(wurzel,'rituale/engine.js'),
            path.join(wurzel,'kern/ich-rechner.js')]
  .map(f=>fs.readFileSync(f,'utf8')).join('\n;\n');
const w={};
const U=new Function('window','console',code+
  ';return {chartVon:chartVon, jdFromUT:jdFromUT, rueck:rueck};')(w,console);
const AC=w.AC_ICH;
const HERR=['Mars','Venus','Merkur','Mond','Sonne','Merkur','Venus','Mars',
            'Jupiter','Saturn','Saturn','Jupiter'];
/* Ein fester Startwert, damit zwei Bauläufe dieselbe Tabelle ergeben.
   Eine Häufigkeit, die bei jedem Bauen wackelt, ist keine Zahl. */
let s=20261023;
const z=()=>{ s=(s*1103515245+12345)&0x7fffffff; return s/0x7fffffff; };
const ORTE=[[52.52,13.405],[48.14,11.58],[53.55,9.99],[50.94,6.96],
            [48.78,9.18],[51.34,12.37],[47.37,8.54],[48.21,16.37]];
const zahl={}, tick=k=>{ if(k) zahl[k]=(zahl[k]||0)+1; };
let gebaut=0;
for(let i=0;i<N;i++){
  const y=1930+Math.floor(z()*81), mo=1+Math.floor(z()*12);
  const d=1+Math.floor(z()*28), h=Math.floor(z()*24), mi=Math.floor(z()*60);
  const o=ORTE[Math.floor(z()*ORTE.length)];
  const pd={y,mo,d,h,mi,tz:1,lat:o[0],lon:o[1]};
  let P; try{ P=U.chartVon(pd); }catch(e){ continue; }
  if(!P||P.ASC===undefined) continue;
  const jd=U.jdFromUT(y,mo,d,h+mi/60-1);
  gebaut++;
  const sp=AC.schwerpunkt(P); if(sp) tick(sp.schluessel);
  const ke=AC.kette(P,HERR,1); if(ke) tick(ke.schluessel);
  const wi=AC.engsterWinkel(AC.aspekte(P)); if(wi) tick(wi.schluessel);
  const ru=AC.rueckGeburt(P,jd); if(ru) tick(ru.schluessel);
}
const anteil={};
Object.keys(zahl).sort().forEach(k=>{ anteil[k]=Math.round(1e5*zahl[k]/gebaut)/1e5; });
console.log(JSON.stringify({n:gebaut, anteil}, null, 0));
