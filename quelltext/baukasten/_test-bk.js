/* Prüfdatei für bk-rechner.js. Erfundene Geburtsdaten.
   Aufruf: node _test-bk.js <engine.js> <bk-rechner.js> */
const fs = require('fs');
eval(fs.readFileSync(process.argv[2], 'utf8'));
eval(fs.readFileSync(process.argv[3], 'utf8'));
const f = [];
if(bkHatChart(null) || bkHatChart({y:1980}) || bkHatChart({y:1980, mo:1, d:1, lat:null, lon:9})) f.push('unvollständige Profile gelten als vollständig');
if(!bkHatChart({y:1980, mo:1, d:1, lat:0, lon:0})) f.push('Breite 0 gilt fälschlich als fehlend');
[{y:1975, mo:2, d:11, h:6, mi:40, tz:1, lat:48.14, lon:11.58},
 {y:1992, mo:10, d:3, h:21, mi:5, tz:1, lat:53.55, lon:9.99}].forEach((p, i) => {
  const s = bkStellen(p), C = chartVon(p);
  [['Sonne', C.Sonne], ['Mond', C.Mond], ['Merkur', C.Merkur], ['Mars', C.Mars], ['Saturn', C.Saturn], ['Aszendent', C.ASC]].forEach(([k, l]) => {
    const z = Math.floor(l / 30);
    if(s[k].z !== z || s[k].el !== z % 4) f.push(i + ': ' + k + ' falsch');
  });
  const h12 = ['Sonne', 'Mond', 'Merkur', 'Venus', 'Mars'].some(k => haus(C, C[k]) === 12);
  if(s.h12 !== h12) f.push(i + ': 12. Haus falsch');
});
/* Profil ohne Uhrzeit: rechnet trotzdem, mit 0 Uhr */
try { bkStellen({y:1980, mo:5, d:5, lat:52.5, lon:13.4}); } catch(e){ f.push('ohne Uhrzeit bricht die Rechnung ab'); }
console.log(JSON.stringify({fehler:f}));
