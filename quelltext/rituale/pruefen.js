/* Rechnet alle Neu- und Vollmonde eines Zeitraums und gibt sie als JSON aus,
   damit sie gegen PyEphem geprüft werden können. */
'use strict';
const fs = require('fs');
const path = require('path');

const ENG = fs.readFileSync(path.join(__dirname, 'engine.js'), 'utf8');
const APP = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

function schneide(quelle, name) {
  const i = quelle.indexOf('function ' + name + '(');
  if (i < 0) throw new Error('nicht gefunden: ' + name);
  let tiefe = 0;
  for (let k = quelle.indexOf('{', i); k < quelle.length; k++) {
    if (quelle[k] === '{') tiefe++;
    else if (quelle[k] === '}') { tiefe--; if (!tiefe) return quelle.slice(i, k + 1); }
  }
  throw new Error('unbalanciert: ' + name);
}

global.aus = {};
(0, eval)(ENG + '\n' +
  ['nrm', 'phase', 'phDiff', 'lunationen', 'mondPfad', 'phIndex', 'beleuchtung']
    .map(n => schneide(APP, n)).join('\n') + '\n' +
  'aus.lunationen = lunationen; aus.phase = phase; aus.mondPfad = mondPfad;' +
  'aus.phIndex = phIndex; aus.beleuchtung = beleuchtung;');

const modus = process.argv[2] || 'lunationen';

if (modus === 'lunationen') {
  const von = +process.argv[3], bis = +process.argv[4];
  console.log(JSON.stringify(global.aus.lunationen(von, bis)));
}

if (modus === 'pfade') {
  /* Geometrie der Mondsichel: Fläche messen statt nur den Pfad anschauen */
  const out = [];
  for (let a = 0; a < 360; a += 15) {
    const d = global.aus.mondPfad(50, 50, 40, a);
    out.push({ a, d, soll: global.aus.beleuchtung(a) });
  }
  console.log(JSON.stringify(out));
}

if (modus === 'phasen') {
  const out = [];
  [0, 20, 45, 70, 90, 120, 135, 160, 180, 200, 225, 250, 270, 300, 315, 340, 359]
    .forEach(a => out.push({ a, i: global.aus.phIndex(a) }));
  console.log(JSON.stringify(out));
}
