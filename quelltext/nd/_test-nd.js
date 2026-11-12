/* Prüfdatei für nd-rechner.js. Erfundene Geburtsdaten.
   Aufruf: node _test-nd.js <engine.js> <nd-rechner.js> */
const fs = require('fs');
eval(fs.readFileSync(process.argv[2], 'utf8'));
eval(fs.readFileSync(process.argv[3], 'utf8'));
const f = [];
/* Die Kontaktregel an festen Beispielen (REGELN.md 6e) */
[[10, 14, 5, true], [10, 17, 5, false], [0, 94, 5, true], [0, 96, 5, false], [0, 96, 6, true],
 [350, 172, 5, true], [0, 187, 5, false], [359, 3, 5, true]].forEach(([a, b, q, soll]) => {
  if(ndKontakt(a, b, q) !== soll) f.push('Kontakt ' + a + '/' + b + ' (quer ' + q + ') sollte ' + soll + ' sein');
});
if(ndAbstand(350, 10) !== 20 || ndAbstand(10, 350) !== 20) f.push('Abstand über 0 Grad falsch');
[{y:1975, mo:2, d:11, h:6, mi:40, tz:1, lat:48.14, lon:11.58},
 {y:1992, mo:10, d:3, h:21, mi:5, tz:1, lat:53.55, lon:9.99},
 {y:1960, mo:6, d:27, h:12, mi:0, tz:2, lat:50.11, lon:8.68}].forEach((p, i) => {
  const s = ndStellen(p), C = chartVon(p);
  if(s.mondZ !== Math.floor(C.Mond / 30) || s.mondModus !== s.mondZ % 3) f.push(i + ': Mond falsch');
  if(s.merkurHaus !== haus(C, C.Merkur) || s.saturnHaus !== haus(C, C.Saturn)) f.push(i + ': Häuser falsch');
  const alle = ['Sonne', 'Mond', 'Merkur', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptun', 'Pluto'];
  const h12 = alle.filter(k => haus(C, C[k]) === 12), h6 = alle.filter(k => haus(C, C[k]) === 6);
  if(s.h12.join() !== h12.join() || s.h6.join() !== h6.join()) f.push(i + ': 6. oder 12. Haus falsch');
  [s.saturnHaus, s.merkurHaus, s.mondHaus, s.marsHaus, s.jupiterHaus, s.sonneHaus].forEach(h => {
    if(!(h >= 1 && h <= 12)) f.push(i + ': Haus außerhalb 1 bis 12'); });
});
console.log(JSON.stringify({fehler:f}));
