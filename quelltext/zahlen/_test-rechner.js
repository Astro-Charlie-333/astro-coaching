/* Prüft die Rechnung gegen Werte, die von Hand nachgerechnet sind. */
global.window = {};
require(require('path').join(__dirname, 'zahlen-rechner.js'));
var Z = global.window.AC_ZAHL;
var f = [], ok = 0;
function gl(was, ist, soll){
  if (JSON.stringify(ist) === JSON.stringify(soll)) { ok++; }
  else f.push(was + ': ' + JSON.stringify(ist) + ' statt ' + JSON.stringify(soll));
}

/* ── Tafeln ─────────────────────────────────────────── */
gl('Pyth A', Z.PYTH.A, 1);
gl('Pyth I', Z.PYTH.I, 9);
gl('Pyth J', Z.PYTH.J, 1);
gl('Pyth R', Z.PYTH.R, 9);
gl('Pyth Z', Z.PYTH.Z, 8);
gl('Pyth S', Z.PYTH.S, 1);
gl('Chald hat keine 9', Object.keys(Z.CHALD).filter(function(k){return Z.CHALD[k]===9;}), []);
gl('Chald Tafel: alle 26 Buchstaben, nur keine 9', Object.keys(Z.CHALD).length, 26);
gl('Chald A', Z.CHALD.A, 1);
gl('Chald O', Z.CHALD.O, 7);
gl('Chald F', Z.CHALD.F, 8);

/* ── Reduzieren ─────────────────────────────────────── */
gl('red 31', Z.red(31, true), 4);
gl('red 29 mit Meister', Z.red(29, true), 11);
gl('red 29 ohne', Z.red(29, false), 2);
gl('red 38 mit', Z.red(38, true), 11);
gl('red 49 mit', Z.red(49, true), 4);
gl('red 58 mit', Z.red(58, true), 4);   /* 5+8=13 → 4 */
gl('red 4 mit', Z.red(4, true), 4);
gl('red 22 mit', Z.red(22, true), 22);
gl('red 22 ohne', Z.red(22, false), 4);
gl('red 33 mit', Z.red(33, true), 33);
gl('red 99 mit', Z.red(99, true), 9);   /* 9+9=18 → 9 */
gl('Kette 31', Z.kette(31, true), [31, 4]);
gl('Kette 199', Z.kette(199, true), [199, 19, 10, 1]);
gl('Kette 29 mit', Z.kette(29, true), [29, 11]);
gl('Kette 29 ohne', Z.kette(29, false), [29, 11, 2]);

/* ── Lebenszahl, von Hand nachgerechnet ─────────────── */
/* 04.08.1975 → 4+8+1+9+7+5 = 34 → 7 */
var a = Z.lebenszahl(4, 8, 1975);
gl('04.08.1975 Rohsumme', a.rohsumme, 34);
gl('04.08.1975 summe', a.summe, 7);
gl('04.08.1975 teile', a.teile, 7);     /* 4 + 8 + (1975→22, bleibt stehen) = 34 → 7 */
gl('04.08.1975 streng', a.streng, 7);   /* 4 + 8 + (22→4) = 16 → 7 */
gl('04.08.1975 einig', a.einig, true);

/* 02.09.1980 → summe: 2+9+1+9+8+0 = 29 → 11
   teile:  2 + 9 + (1980→18→9) = 20 → 2   ← weicht ab */
var b = Z.lebenszahl(2, 9, 1980);
gl('02.09.1980 summe', b.summe, 11);
gl('02.09.1980 teile', b.teile, 2);
gl('02.09.1980 einig', b.einig, false);
gl('02.09.1980 eine Stelle', b.stelle, 2);

/* 15.07.1980 → 1+5+7+1+9+8+0 = 31 → 4 */
gl('15.07.1980', Z.lebenszahl(15, 7, 1980).summe, 4);
/* 29.11.1991 → 2+9+1+1+1+9+9+1 = 33 → bleibt 33 */
gl('29.11.1991 summe', Z.lebenszahl(29, 11, 1991).summe, 33);
/* 11.11.1911 → 1+1+1+1+1+9+1+1 = 16 → 7 */
gl('11.11.1911', Z.lebenszahl(11, 11, 1911).summe, 7);

/* ── Die Behauptung prüfen: die eine Ziffer ist bei allen
      drei Wegen gleich, nur Meisterzahlen unterscheiden sich. */
var abw = 0, abwStelle = 0, gesamt = 0, bsp = null;
var tage = [31,28,31,30,31,30,31,31,30,31,30,31];
for (var y = 1900; y <= 2030; y++) {
  var sch = (y%4===0 && (y%100!==0 || y%400===0));
  for (var m = 1; m <= 12; m++) {
    var mx = tage[m-1] + ((m===2 && sch)?1:0);
    for (var d = 1; d <= mx; d++) {
      var r = Z.lebenszahl(d, m, y); gesamt++;
      if (!r.einig) { abw++; if(!bsp) bsp = d+'.'+m+'.'+y; }
      if (Z.red(r.summe,false) !== Z.red(r.teile,false) ||
          Z.red(r.teile,false) !== Z.red(r.streng,false)) abwStelle++;
    }
  }
}
gl('kein Weg ändert die eine Ziffer', abwStelle, 0);
if (abw === 0) f.push('die drei Wege weichen nie ab — dann ist die Aussage auf der Seite falsch');
else ok++;

/* ── Namenszahlen ───────────────────────────────────── */
/* "ADA": A=1 D=4 A=1 → 6 ; Vokale A,A = 2 ; Konsonant D = 4 */
var n1 = Z.namenszahlen('Ada', 'pyth', 'direkt');
gl('Ada ausdruck roh', n1.ausdruckRoh, 6);
gl('Ada seele', n1.seeleRoh, 2);
gl('Ada person', n1.personRoh, 4);
gl('Ada Buchstaben', n1.buchstaben, 3);
gl('Ada fehlt 2', n1.fehlt.indexOf(2) >= 0, true);
gl('Ada fehlt nicht 1', n1.fehlt.indexOf(1) >= 0, false);

/* "MARY LEE" pythagoräisch: M4 A1 R9 Y7 L3 E5 E5 = 34 → 7 */
var n2 = Z.namenszahlen('Mary Lee', 'pyth', 'direkt');
gl('Mary Lee roh', n2.ausdruckRoh, 34);
gl('Mary Lee ausdruck', n2.ausdruck, 7);
gl('Mary Lee Leerzeichen zählt nicht', n2.buchstaben, 7);
/* Vokale ohne Y: A1 E5 E5 = 11 ; mit Y: + 7 = 18 */
gl('Mary Lee Seele ohne Y', n2.seeleRoh, 11);
gl('Mary Lee Seele mit Y', n2.seeleMitYRoh, 18);
gl('Mary Lee Y macht Unterschied', n2.yStoert, true);

/* chaldäisch: M4 A1 R2 Y1 L3 E5 E5 = 21 → 3 */
var n3 = Z.namenszahlen('Mary Lee', 'chald', 'direkt');
gl('Mary Lee chald roh', n3.ausdruckRoh, 21);
gl('Mary Lee chald', n3.ausdruck, 3);

/* Umlaut: "Bär" direkt B2 A1 R9 = 12 → 3 ; umschrift B2 A1 E5 R9 = 17 → 8 */
gl('Bär direkt', Z.namenszahlen('Bär','pyth','direkt').ausdruckRoh, 12);
gl('Bär umschrift', Z.namenszahlen('Bär','pyth','umschrift').ausdruckRoh, 17);
gl('Umlaut erkannt', Z.hatUmlaut('Bär'), true);
gl('kein Umlaut', Z.hatUmlaut('Bar'), false);

/* ── Persönliches Jahr ──────────────────────────────── */
/* 30.03. in 2026: 3 + 3 + (2026→10→1) = 7 */
gl('persJahr 2026', Z.persJahr(30, 3, 2026).zahl, 7);
/* 30.03. in 2027: 3 + 3 + (2027→11→2) = 8 */
gl('persJahr 2027', Z.persJahr(30, 3, 2027).zahl, 8);
gl('persJahr läuft im Neunertakt', Z.persJahr(30,3,2035).zahl, Z.persJahr(30,3,2026).zahl);

/* ── Herausforderung ────────────────────────────────── */
/* 04.08.1975: T=4 M=8 J=4 → erste |8-4|=4, zweite |4-4|=0, haupt |4-0|=4 */
var hf = Z.herausforderung(4, 8, 1975);
gl('Herausforderung erste', hf.erste, 4);
gl('Herausforderung zweite', hf.zweite, 0);
gl('Herausforderung haupt', hf.haupt, 4);

/* ── Reife ──────────────────────────────────────────── */
gl('Reife 4+7 ist 11', Z.reife(4, 7), 11);

/* ── Adressen ───────────────────────────────────────── */
var ad = Z.adresse('47a', 'pyth');
gl('47a Summe', ad.haupt.summe, 12);    /* 4+7+A1 */
gl('47a Zahl', ad.haupt.zahl, 3);
gl('47a kein Vierer-Flag', ad.hatVier, true);  /* enthält 4 */
var ad2 = Z.adresse('12/3', 'pyth');
gl('12/3 mehrteilig', ad2.mehrteilig, true);
gl('12/3 Haus', ad2.teile[0].zahl, 3);
gl('12/3 Wohnung', ad2.teile[1].zahl, 3);
gl('12/3 ganz', ad2.ganz.summe, 6);
var ad3 = Z.adresse('8', 'pyth');
gl('8 endet auf 8', ad3.endetAcht, true);
gl('8 hat keine 4', ad3.hatVier, false);
gl('leer gibt null', Z.adresse('', 'pyth'), null);
gl('Hausnummer aus Text', Z.adresse('Hauptstr. 29', 'pyth').haupt.zahl, 11);
gl('Straßenname zählt nicht mit', Z.adresse('Hauptstr. 29','pyth').haupt.summe, 11);
gl('Adresse mit Stock', Z.adresse('Hauptstraße 47a, 3. OG','pyth').teile.length, 2);
gl('Adresse mit Stock: Haus', Z.adresse('Hauptstraße 47a, 3. OG','pyth').teile[0].text, '47A');
gl('Adresse mit Stock: Wohnung', Z.adresse('Hauptstraße 47a, 3. OG','pyth').teile[1].text, '3');
gl('nur Buchstaben gibt null', Z.adresse('Hauptstraße','pyth'), null);

/* ── Verteilung ─────────────────────────────────────── */
var v = Z.verteilung();
var s = 0; Object.keys(v.zaehlung).forEach(function(k){ s += v.zaehlung[k]; });
gl('Verteilung vollständig', s, v.gesamt);
var anteile = {};
Object.keys(v.zaehlung).forEach(function(k){
  anteile[k] = +(100 * v.zaehlung[k] / v.gesamt).toFixed(1); });
console.log('Verteilung der Lebenszahlen in %:', anteile);
console.log('Erste Abweichung der drei Wege:', bsp, '— von', gesamt, 'Daten weichen', abw, 'ab',
            '(' + (100*abw/gesamt).toFixed(1) + '%)');

/* ── Blatt ──────────────────────────────────────────── */
var bl = Z.blatt({y:1980, mo:7, d:15}, 'Probe Person', 2026, 'pyth', 'direkt');
gl('Blatt Lebenszahl', bl.lebenszahl, 4);
gl('Blatt hat Name', !!bl.name, true);
gl('Blatt hat Reife', typeof bl.reife, 'number');
gl('Blatt Anteil plausibel', bl.anteil > 0.03 && bl.anteil < 0.3, true);
gl('Blatt ohne Name', !!Z.blatt({y:1980,mo:7,d:15}, '', 2026).name, false);
gl('Blatt ohne Profil', Z.blatt(null, 'x'), null);
console.log('Blatt Anteil Lebenszahl 4:', (100*bl.anteil).toFixed(1) + '%');

console.log('\n' + ok + ' Prüfungen bestanden.');
if (f.length) { f.forEach(function(x){ console.log('  FEHLER: ' + x); }); process.exit(1); }
