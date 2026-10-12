/* Misst die gezeichnete Mondsichel wirklich: im Browser rendern und Pixel zählen.
   Prüft nicht nur die Fläche, sondern auch, auf welcher Seite das Licht sitzt. */
'use strict';
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ENG = fs.readFileSync(path.join(__dirname, 'engine.js'), 'utf8');
const APP = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
function sch(q, n) {
  const i = q.indexOf('function ' + n + '(');
  let t = 0;
  for (let k = q.indexOf('{', i); k < q.length; k++) {
    if (q[k] === '{') t++; else if (q[k] === '}') { t--; if (!t) return q.slice(i, k + 1); }
  }
}
const QUELLE = ENG + sch(APP, 'nrm') + sch(APP, 'mondPfad') + sch(APP, 'beleuchtung');

(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext({ viewport: { width: 300, height: 300 } })).newPage();
  await p.setContent('<body style="margin:0;background:#000"><div id="z"></div></body>');
  await p.addScriptTag({ content: QUELLE });

  const ergebnis = await p.evaluate(() => {
    const R = 40, C = 50, G = 100;
    const lw = document.createElement('canvas'); lw.width = lw.height = G;
    const ctx = lw.getContext('2d');
    const out = [];
    for (let a = 0; a < 360; a += 10) {
      const d = mondPfad(C, C, R, a);
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + G + '" height="' + G + '">' +
        '<path d="' + d + '" fill="#fff"/></svg>';
      out.push({ a, svg, soll: beleuchtung(a) });
    }
    return out;
  });

  let fehler = 0, ok = 0;
  const zeile = (n, c, i) => { if (c) ok++; else { fehler++; console.log('  FEHLER  ' + n + (i ? '  →  ' + i : '')); } };

  for (const e of ergebnis) {
    const mass = await p.evaluate(async ({ svg }) => {
      const G = 100, R = 40, C = 50;
      const img = new Image();
      await new Promise(r => { img.onload = r; img.src = 'data:image/svg+xml;base64,' + btoa(svg); });
      const cv = document.createElement('canvas'); cv.width = cv.height = G;
      const cx = cv.getContext('2d'); cx.drawImage(img, 0, 0);
      const d = cx.getImageData(0, 0, G, G).data;
      let hell = 0, ges = 0, hellRechts = 0, hellLinks = 0;
      for (let y = 0; y < G; y++) for (let x = 0; x < G; x++) {
        if ((x + .5 - C) ** 2 + (y + .5 - C) ** 2 > R * R) continue;
        ges++;
        if (d[(y * G + x) * 4 + 3] > 128) { hell++; if (x >= C) hellRechts++; else hellLinks++; }
      }
      return { anteil: hell / ges, rechts: hellRechts, links: hellLinks };
    }, { svg: e.svg });

    zeile(`Fläche bei ${e.a}°`, Math.abs(mass.anteil - e.soll) < 0.035,
      `gezeichnet ${(mass.anteil * 100).toFixed(1)} %, erwartet ${(e.soll * 100).toFixed(1)} %`);

    /* Nordhalbkugel: beim Zunehmen sitzt das Licht rechts, beim Abnehmen links */
    if (e.a > 15 && e.a < 165) {
      zeile(`Licht rechts bei ${e.a}° (zunehmend)`, mass.rechts > mass.links,
        `rechts ${mass.rechts}, links ${mass.links}`);
    } else if (e.a > 195 && e.a < 345) {
      zeile(`Licht links bei ${e.a}° (abnehmend)`, mass.links > mass.rechts,
        `rechts ${mass.rechts}, links ${mass.links}`);
    }
  }
  await b.close();
  console.log(`\nSichelform: ${ok} bestanden, ${fehler} fehlgeschlagen`);
  process.exit(fehler ? 1 : 0);
})();
