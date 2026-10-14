/* Prüft die Zeitrechnung gegen die überlieferten Regeln und gegen
   Invarianten, die sich aus ihnen zwingend ergeben. */
global.window = {};
require('/home/claude/zeit/zeit-rechner.js');
var Z = global.window.AC_ZEIT;
var f = [], ok = 0;
function gl(was, ist, soll){
  if (JSON.stringify(ist) === JSON.stringify(soll)) ok++;
  else f.push(was + ': ' + JSON.stringify(ist) + ' statt ' + JSON.stringify(soll));
}
function wahr(was, b){ if (b) ok++; else f.push(was); }
function nah(was, ist, soll, tol){
  if (Math.abs(ist - soll) <= (tol === undefined ? 1e-9 : tol)) ok++;
  else f.push(was + ': ' + ist + ' statt ' + soll);
}

/* ── Die allgemeinen Jahre nach Valens ──────────────────────── */
gl('Jahre je Zeichen', Z.JAHRE, [15, 8, 20, 25, 19, 20, 8, 15, 12, 27, 30, 12]);
gl('Umlauf der zweiten Ebene', Z.UMLAUF, 211);
gl('Jahr hat 360 Tage', Z.TAG_JAHR, 360);
/* Die Jahre sind die kleinen Jahre der Zeichenherren */
var klein = {Mars:15, Venus:8, Merkur:20, Mond:25, Sonne:19, Jupiter:12};
Z.JAHRE.forEach(function(j, i){
  var h = Z.HERRSCHER[i];
  if (klein[h] !== undefined) gl('kleine Jahre ' + Z.ZEICHEN[i] + ' (' + h + ')', j, klein[h]);
});
gl('Steinbock 27', Z.JAHRE[9], 27);
gl('Wassermann 30', Z.JAHRE[10], 30);

/* ── Die Lose ───────────────────────────────────────────────── */
/* Tagchart: Sonne über dem Horizont, also Haus 7 bis 12 */
var tagC = {ASC: 0, Sonne: 200, Mond: 100, Venus: 230};     /* Sonne im 7. Haus */
var nachtC = {ASC: 0, Sonne: 40, Mond: 100, Venus: 70};     /* Sonne im 2. Haus */
var Lt = Z.lose(tagC), Ln = Z.lose(nachtC);
gl('Tag erkannt', Lt.tag, true);
gl('Nacht erkannt', Ln.tag, false);
/* Glück bei Tag: AC + Mond − Sonne */
nah('Glück Tag', Lt.glueck, Z.nrm(0 + 100 - 200));
nah('Geist Tag', Lt.geist, Z.nrm(0 + 200 - 100));
nah('Glück Nacht', Ln.glueck, Z.nrm(0 + 40 - 100));
nah('Geist Nacht', Ln.geist, Z.nrm(0 + 100 - 40));
/* Invariante: Glück und Geist spiegeln sich am Aszendenten */
nah('Glück + Geist = 2 × AC (Tag)', Z.nrm(Lt.glueck + Lt.geist), Z.nrm(2 * tagC.ASC), 1e-9);
nah('Glück + Geist = 2 × AC (Nacht)', Z.nrm(Ln.glueck + Ln.geist), Z.nrm(2 * nachtC.ASC), 1e-9);
/* Eros nach Paulus: bei Tag AC + Venus − Geist */
nah('Eros Tag', Lt.eros, Z.nrm(0 + 230 - Lt.geist));
nah('Eros Nacht', Ln.eros, Z.nrm(0 + Ln.geist - 70));
/* Die zweite Überlieferung ist die Spiegelung davon */
nah('Eros-Variante spiegelt am AC', Z.nrm(Lt.eros + Lt.erosAlt), Z.nrm(2 * tagC.ASC), 1e-9);
/* Ohne Venus kein Eros */
gl('kein Eros ohne Venus', Z.lose({ASC:0, Sonne:200, Mond:100}).eros, null);

/* ── Freilassung: Aufbau und Lückenlosigkeit ────────────────── */
function pruefeFreilassung(losLon, glueckLon, name){
  var F = Z.freilassung(losLon, glueckLon, 100 * 360);
  var startZ = Z.zi(losLon);
  gl(name + ': beginnt im Zeichen des Loses', F.abschnitte[0].zeichen, startZ);
  /* Erste Ebene: lückenlos, in Zeichenfolge, richtige Länge */
  for (var i = 0; i < F.abschnitte.length; i++){
    var a = F.abschnitte[i];
    if (i) {
      if (a.von !== F.abschnitte[i-1].bis) f.push(name + ': Lücke auf Ebene 1 bei ' + i);
      if (a.zeichen !== (F.abschnitte[i-1].zeichen + 1) % 12)
        f.push(name + ': Ebene 1 springt bei ' + i);
    }
    if (a.bis - a.von !== Z.JAHRE[a.zeichen] * 360)
      f.push(name + ': falsche Länge auf Ebene 1 bei ' + i);

    /* Zweite Ebene: lückenlos, füllt den Abschnitt genau aus */
    var u = a.unter;
    if (!u.length) { f.push(name + ': Abschnitt ohne Unterperioden'); continue; }
    if (u[0].von !== a.von) f.push(name + ': Ebene 2 beginnt nicht am Anfang');
    if (u[u.length-1].bis !== a.bis) f.push(name + ': Ebene 2 endet nicht am Ende');
    if (u[0].zeichen !== a.zeichen) f.push(name + ': Ebene 2 beginnt im falschen Zeichen');
    for (var k = 1; k < u.length; k++)
      if (u[k].von !== u[k-1].bis) f.push(name + ': Lücke auf Ebene 2');
    /* Monate statt Jahre */
    u.forEach(function(x){
      if (!x.gekappt && x.bis - x.von !== Z.JAHRE[x.zeichen] * 30)
        f.push(name + ': falsche Länge auf Ebene 2 in ' + Z.ZEICHEN[x.zeichen]);
    });
    /* Die Bindung löst sich genau dann, wenn der Abschnitt länger
       ist als ein voller Umlauf von 211 Monaten */
    var bindungen = u.filter(function(x){ return x.bindung; }).length;
    var langGenug = (a.bis - a.von) > 211 * 30;
    if (langGenug && bindungen !== 1)
      f.push(name + ': ' + Z.ZEICHEN[a.zeichen] + ' (' + a.jahre +
             ' Jahre) müsste genau eine Lösung der Bindung haben, hat ' + bindungen);
    if (!langGenug && bindungen !== 0)
      f.push(name + ': ' + Z.ZEICHEN[a.zeichen] + ' ist zu kurz für eine Bindung');
    /* Nach der Lösung steht das Gegenzeichen des Abschnitts */
    u.forEach(function(x){
      if (x.bindung && x.zeichen !== (a.zeichen + 6) % 12)
        f.push(name + ': Bindung springt nicht ins Gegenzeichen');
    });
  }
  return F;
}
var F1 = pruefeFreilassung(95, 10, 'Krebs-Start');     /* 95° = Krebs */
var F2 = pruefeFreilassung(310, 310, 'Wassermann');    /* 310° = Wassermann */
ok += 2;

/* Nur Zeichen über 17,58 Jahren können die Bindung lösen */
var langeZeichen = Z.JAHRE.map(function(j, i){ return j * 360 > 211 * 30 ? i : -1; })
                          .filter(function(i){ return i >= 0; });
gl('Zeichen, die lang genug für eine Bindung sind',
   langeZeichen.map(function(i){ return Z.ZEICHEN[i]; }),
   ['Zwillinge', 'Krebs', 'Löwe', 'Jungfrau', 'Steinbock', 'Wassermann']);

/* ── Hochphasen ─────────────────────────────────────────────── */
/* Winkelhaft zum Los des Glücks heißt 1., 4., 7. oder 10. davon */
gl('Glück selbst ist Gipfel', Z.istGipfel(3, 3), true);
gl('viertes vom Glück', Z.istGipfel(6, 3), true);
gl('siebtes vom Glück', Z.istGipfel(9, 3), true);
gl('zehntes vom Glück', Z.istGipfel(0, 3), true);
gl('zweites vom Glück ist kein Gipfel', Z.istGipfel(4, 3), false);
gl('drittes vom Glück ist kein Gipfel', Z.istGipfel(5, 3), false);
gl('Zählung vom Glück', Z.vonGlueck(0, 3), 10);
gl('Zählung Glück auf sich selbst', Z.vonGlueck(3, 3), 1);
/* Über alle Zeichen: genau vier sind winkelhaft */
var gipfelZahl = 0;
for (var z = 0; z < 12; z++) if (Z.istGipfel(z, 5)) gipfelZahl++;
gl('genau vier winkelhafte Zeichen', gipfelZahl, 4);

/* ── Profektion ─────────────────────────────────────────────── */
var C = {ASC: 35};        /* 35° = Stier */
gl('Profektion mit 0 im ersten Haus', Z.profektion(C, 0).haus, 1);
gl('Profektion mit 0 im AC-Zeichen', Z.profektion(C, 0).zeichenName, 'Stier');
gl('Profektion mit 12 wieder erstes Haus', Z.profektion(C, 12).haus, 1);
gl('Profektion mit 1 im zweiten Haus', Z.profektion(C, 1).haus, 2);
gl('Profektion mit 1 in Zwillinge', Z.profektion(C, 1).zeichenName, 'Zwillinge');
gl('Profektion mit 6 im siebten Haus', Z.profektion(C, 6).haus, 7);
gl('Herr des siebten Hauses', Z.profektion(C, 6).herr, 'Mars');   /* Skorpion */
gl('Profektion mit 39', Z.profektion(C, 39).haus, 4);             /* 39 mod 12 = 3 */

/* ── Firdaria ───────────────────────────────────────────────── */
var ft = Z.firdaria(true), fn = Z.firdaria(false);
gl('neun Perioden am Tag', ft.length, 9);
gl('neun Perioden in der Nacht', fn.length, 9);
gl('Tag beginnt mit der Sonne', ft[0].herr, 'Sonne');
gl('Nacht beginnt mit dem Mond', fn[0].herr, 'Mond');
gl('Firdaria dauern 75 Jahre', ft[ft.length-1].bis, 75);
gl('Nachtreihe ebenso 75 Jahre', fn[fn.length-1].bis, 75);
var summeT = 0, summeN = 0;
ft.forEach(function(p){ summeT += p.jahre; });
fn.forEach(function(p){ summeN += p.jahre; });
gl('Summe Tag', summeT, 75);
gl('Summe Nacht', summeN, 75);
/* Dieselben Längen, nur andere Reihenfolge */
function laengen(l){ var o = {};
  l.slice().sort(function(a,b){ return a.herr<b.herr?-1:1; })
   .forEach(function(p){ o[p.herr] = p.jahre; });
  return o; }
gl('gleiche Längen in beiden Reihen', laengen(ft), laengen(fn));
gl('Sonne 10', laengen(ft)['Sonne'], 10);
gl('Merkur 13', laengen(ft)['Merkur'], 13);
gl('Mars 7', laengen(ft)['Mars'], 7);
/* Unterperioden: sieben, chaldäisch, beginnend beim eigenen Herrn */
var sonne = ft[0];
gl('sieben Unterperioden', sonne.unter.length, 7);
gl('Unterperiode beginnt beim eigenen Herrn', sonne.unter[0].herr, 'Sonne');
gl('chaldäische Folge ab Sonne',
   sonne.unter.map(function(u){ return u.herr; }),
   ['Sonne', 'Venus', 'Merkur', 'Mond', 'Saturn', 'Jupiter', 'Mars']);
nah('Unterperioden füllen die Periode', sonne.unter[6].bis, sonne.bis, 1e-9);
ft.forEach(function(p){
  if (/Knoten/.test(p.herr)) { if (p.unter.length) f.push('Knoten hat Unterperioden'); }
  else if (p.unter.length !== 7) f.push(p.herr + ' hat ' + p.unter.length + ' Unterperioden');
});
ok += 1;
gl('Knoten ohne Unterperioden', ft.filter(function(p){ return /Knoten/.test(p.herr); })
   .every(function(p){ return p.unter.length === 0; }), true);
/* Nachschlagen */
gl('mit 5 Jahren führt am Tag die Sonne', Z.firdariaJetzt(ft, 5).haupt.herr, 'Sonne');
gl('mit 35 Jahren führt am Tag der Mond', Z.firdariaJetzt(ft, 35).haupt.herr, 'Mond');
gl('mit 35 Jahren in der Nacht Mars', Z.firdariaJetzt(fn, 35).haupt.herr, 'Mars');
gl('über 75 ist die Reihe zu Ende', Z.firdariaJetzt(ft, 80), null);

/* ── Alter ──────────────────────────────────────────────────── */
gl('Geburtstag noch nicht gewesen',
   Z.alterVollendet({y:1980, mo:7, d:15}, new Date(2026, 2, 1)), 45);
gl('Geburtstag schon gewesen',
   Z.alterVollendet({y:1980, mo:7, d:15}, new Date(2026, 8, 1)), 46);
gl('am Geburtstag selbst',
   Z.alterVollendet({y:1980, mo:7, d:15}, new Date(2026, 6, 15)), 46);

/* ── Blatt im Ganzen ────────────────────────────────────────── */
var chart = {ASC: 35, Sonne: 200, Mond: 100, Venus: 230, MC: 300};
var jdGeb = 2444436.0;        /* irgendein Datum 1980 */
var B = Z.blatt(chart, jdGeb, {y:1980, mo:7, d:15}, new Date(2026, 9, 14));
wahr('Blatt entsteht', !!B);
wahr('Beruf hat Abschnitte', B.beruf.abschnitte.length > 3);
wahr('Liebe hat Abschnitte', B.liebe.abschnitte.length > 3);
wahr('Firdaria jetzt gefunden', !!B.firdariaJetzt);
wahr('Profektion gefunden', B.profektion.haus >= 1 && B.profektion.haus <= 12);
gl('Blatt ohne Chart', Z.blatt(null, jdGeb, {y:1980,mo:7,d:15}), null);

/* Jetzt-Abfrage trifft genau einen Abschnitt je Ebene */
var J = Z.jetzt(B.beruf, B.tageSeitGeburt);
wahr('ein laufender Abschnitt auf Ebene 1', !!J.l1);
wahr('ein laufender Abschnitt auf Ebene 2', !!J.l2);
wahr('Ebene 2 liegt in Ebene 1', J.l2.von >= J.l1.von && J.l2.bis <= J.l1.bis);

/* Hochphasen kommen in der richtigen Reihenfolge und liegen in der Zukunft */
var G = Z.naechsteGipfel(B.beruf, B.tageSeitGeburt, 6);
wahr('Hochphasen gefunden', G.length > 0);
for (var i = 1; i < G.length; i++)
  if (G[i].von < G[i-1].von) f.push('Hochphasen nicht sortiert');
G.forEach(function(g){
  if (g.bis <= B.tageSeitGeburt) f.push('vergangene Hochphase in der Liste');
  if ([1,4,7,10].indexOf(g.vonGlueck) < 0) f.push('Hochphase ist nicht winkelhaft');
});
ok += 1;

var BI = Z.bindungen(B.beruf);
wahr('mindestens eine Lösung der Bindung im Leben', BI.length >= 1);

/* Datumsrechnung */
var d0 = Z.datum(jdGeb, 0), d1 = Z.datum(jdGeb, 360);
nah('360 Tage später', (d1 - d0) / 86400000, 360, 1e-6);

console.log('Sekte, Lose und Perioden für das Probechart:');
console.log('  ' + B.lose.sekte + ' · Glück ' + Z.ZEICHEN[Z.zi(B.lose.glueck)] +
            ' · Geist ' + Z.ZEICHEN[Z.zi(B.lose.geist)] +
            ' · Eros ' + Z.ZEICHEN[Z.zi(B.erosLon)]);
console.log('  Beruf jetzt: ' + Z.ZEICHEN[J.l1.zeichen] + ' / ' + Z.ZEICHEN[J.l2.zeichen] +
            (J.l2.gipfel ? '  ← Hochphase' : ''));
console.log('  nächste Hochphasen: ' + G.slice(0, 3).map(function(g){
  return Z.ZEICHEN[g.zeichen] + ' (Ebene ' + g.ebene + ') ab ' +
         Z.datum(jdGeb, g.von).toISOString().slice(0, 10); }).join(', '));
console.log('  Lösungen der Bindung: ' + BI.map(function(x){
  return Z.datum(jdGeb, x.von).toISOString().slice(0, 10); }).join(', '));

console.log('\n' + ok + ' Prüfungen bestanden.');
if (f.length) { f.forEach(function(x){ console.log('  FEHLER: ' + x); }); process.exit(1); }
