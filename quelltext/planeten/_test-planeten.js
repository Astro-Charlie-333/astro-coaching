/* Prüfdatei für planeten-rechner.js. Erfundene Geburtsdaten.
   Aufruf: node _test-planeten.js <engine.js> <planeten-rechner.js> */
const fs = require('fs');
eval(fs.readFileSync(process.argv[2], 'utf8'));
eval(fs.readFileSync(process.argv[3], 'utf8'));
const f = [];
const probe = [
  {y:1975, mo:2, d:11, h:6, mi:40, tz:1, lat:48.14, lon:11.58},
  {y:1992, mo:10, d:3, h:21, mi:5, tz:1, lat:53.55, lon:9.99},
  {y:1960, mo:6, d:27, h:12, mi:0, tz:2, lat:50.11, lon:8.68}];
probe.forEach((p, i) => {
  const z = plZyklen(p), C = chartVon(p);
  const jup = z.filter(x => x.art === 'Jupiter'), sat = z.filter(x => /^Saturn/.test(x.art));
  const ura = z.filter(x => x.art === 'Uranus');
  if(jup.length < 6) f.push(i + ': nur ' + jup.length + ' Jupiter-Rückkehren bis 95');
  jup.forEach((x, j) => {
    if(Math.abs(plAbstand(lon('Jupiter', x.jd), C.Jupiter)) > 0.05) f.push(i + ': Jupiter ' + (j + 1) + ' trifft den Punkt nicht');
    const soll = (j + 1) * 11.86;
    if(Math.abs(x.alter + 0.5 - soll) > 1.2) f.push(i + ': Jupiter ' + (j + 1) + ' mit ' + x.alter + ' statt etwa ' + soll.toFixed(1));
  });
  if(sat.length !== 2) f.push(i + ': ' + sat.length + ' statt 2 Saturn-Rückkehren');
  else {
    if(sat[0].alter < 28 || sat[0].alter > 30) f.push(i + ': erste Saturn-Rückkehr mit ' + sat[0].alter);
    if(sat[1].alter < 57 || sat[1].alter > 60) f.push(i + ': zweite Saturn-Rückkehr mit ' + sat[1].alter);
    if(sat[0].art !== 'Saturn1' || sat[1].art !== 'Saturn2') f.push(i + ': Saturn-Rückkehren falsch benannt');
  }
  if(ura.length !== 1) f.push(i + ': ' + ura.length + ' Uranus-Oppositionen');
  else {
    if(ura[0].alter < 37 || ura[0].alter > 46) f.push(i + ': Uranus-Opposition mit ' + ura[0].alter);
    if(Math.abs(Math.abs(plAbstand(lon('Uranus', ura[0].jd), C.Uranus)) - 180) > 0.05) f.push(i + ': Uranus steht nicht gegenüber');
  }
  for(let j = 1; j < z.length; j++) if(z[j].jd < z[j - 1].jd) f.push(i + ': nicht nach Zeit sortiert');
});
console.log(JSON.stringify({fehler:f}));
