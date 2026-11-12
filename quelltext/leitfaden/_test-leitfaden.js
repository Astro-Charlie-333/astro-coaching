/* Prüfdatei für leitfaden-rechner.js. Erfundene Geburtsdaten, die
   Knotenwerte zum Vergleich aus der Swiss Ephemeris (mittlerer Knoten).
   Aufruf: node _test-leitfaden.js <engine.js> <leitfaden-rechner.js> */
const fs = require('fs');
eval(fs.readFileSync(process.argv[2], 'utf8'));
eval(fs.readFileSync(process.argv[3], 'utf8'));
const f = [];
[[{y:1975, mo:2, d:11, h:6, mi:40, tz:1, lat:48.14, lon:11.58}, 246.413],
 [{y:1992, mo:10, d:3, h:21, mi:5, tz:1, lat:53.55, lon:9.99}, 265.147],
 [{y:1960, mo:6, d:27, h:12, mi:0, tz:2, lat:50.11, lon:8.68}, 169.277]].forEach(([p, nk], i) => {
  const s = lfStellen(p), C = chartVon(p);
  const ab = Math.abs(((s.suedknotenLaenge - (nk + 180)) % 360 + 540) % 360 - 180);
  if(ab > 0.3) f.push(i + ': Südknoten ' + s.suedknotenLaenge.toFixed(2) + ' statt ' + ((nk + 180) % 360).toFixed(2));
  if(s.Suedknoten !== Math.floor(((nk + 180) % 360) / 30)) f.push(i + ': Zeichen des Südknotens falsch');
  ['Mond', 'Merkur', 'Mars'].forEach(k => { if(s[k] !== Math.floor(C[k] / 30)) f.push(i + ': ' + k + ' nicht aus chartVon'); });
});
console.log(JSON.stringify({fehler:f}));
