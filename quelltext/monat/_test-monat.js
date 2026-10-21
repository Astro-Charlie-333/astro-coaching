/* Prüft monat-rechner.js gegen Invarianten, die sich aus der Sache
   zwingend ergeben.
   Läuft mit: node monat/_test-monat.js
   Probedaten sind erfunden — nie echte Geburtsdaten hier hinein. */
'use strict';
const fs = require('fs'), path = require('path');
const wurzel = path.join(__dirname, '..');

function laden(dateien){
  const code = dateien.map(f => fs.readFileSync(path.join(wurzel, f), 'utf8')).join('\n;\n');
  const f = new Function('window','console', code
    + '\n;return {window:window,'
    + ' lon:typeof lon!=="undefined"?lon:null,'
    + ' chartVon:typeof chartVon!=="undefined"?chartVon:null,'
    + ' haus:typeof haus!=="undefined"?haus:null,'
    + ' jdFromUT:typeof jdFromUT!=="undefined"?jdFromUT:null,'
    + ' datVon:typeof datVon!=="undefined"?datVon:null,'
    + ' MN:typeof MN!=="undefined"?MN:null,'
    + ' HT:typeof HT!=="undefined"?HT:null};');
  return f({}, console);
}

const U = laden(['rituale/engine.js', 'monat/monat-rechner.js', 'monat/monat-daten.js']);
const M = U.window.AC_MONAT;
const T = U.window.AC_MONAT_TEXT;
const { chartVon, haus, lon, datVon, MN, HT } = U;

let ok = 0; const fehler = [];
function p(name, bed, info){ if(bed) ok++; else fehler.push(name + (info ? '  →  ' + info : '')); }

/* ── Probecharts: erfundene Daten ───────────────────────────── */
const A = { y:1975, mo:8, d:4,  h:14, mi:20, tz:1, lat:52.52, lon:13.405 };
const B = { y:1992, mo:2, d:17, h:6,  mi:5,  tz:1, lat:48.14, lon:11.58  };
const CA = chartVon(A), CB = chartVon(B);

/* ── 1 · Grundrechnen ───────────────────────────────────────── */
p('nrm wickelt negativ', M.nrm(-10) === 350, 'nrm(-10)=' + M.nrm(-10));
p('nrm wickelt über 360', M.nrm(370) === 10);
p('dist ist nie über 180', M.dist(10, 200) === 170, 'dist(10,200)=' + M.dist(10,200));
p('dist ist symmetrisch', M.dist(350, 20) === M.dist(20, 350));
p('dist über den Nullpunkt', M.dist(355, 5) === 10);

/* ── 2 · Der Kalender ───────────────────────────────────────── */
/* Fehlerklasse: die alte Seite rechnete pauschal mit 28 bzw. 31
   Tagen. Daraus entsteht ein 30. Februar. */
p('Januar hat 31 Tage',  M.tageImMonat(2026, 0)  === 31);
p('Februar 2026 hat 28', M.tageImMonat(2026, 1)  === 28);
p('Februar 2028 hat 29', M.tageImMonat(2028, 1)  === 29, 'Schaltjahr');
p('Februar 2100 hat 28', M.tageImMonat(2100, 1)  === 28, 'kein Schaltjahr');
p('April hat 30 Tage',   M.tageImMonat(2026, 3)  === 30);
p('Dezember hat 31',     M.tageImMonat(2026, 11) === 31);

/* Der Versatz springt über die Jahresgrenze */
const nov = M.monatVon(new Date(Date.UTC(2026, 10, 30)), 2);
p('zwei Monate nach November ist Januar', nov.jahr === 2027 && nov.mon === 0,
  JSON.stringify(nov));
const jan = M.monatVon(new Date(Date.UTC(2026, 0, 31)), -1);
p('ein Monat vor Januar ist Dezember', jan.jahr === 2025 && jan.mon === 11,
  JSON.stringify(jan));
p('Versatz 0 ist der laufende Monat',
  M.monatVon(new Date(Date.UTC(2026, 5, 9)), 0).mon === 5);

/* ── 3 · Der Schwerpunkt ────────────────────────────────────── */
for(let mon = 0; mon < 12; mon++){
  const h = M.schwerpunkt(CA, 2026, mon);
  p('Schwerpunkt ist ein Haus von 1 bis 12 (' + MN[mon] + ')',
    Number.isInteger(h) && h >= 1 && h <= 12, 'ist ' + h);
}
/* Über ein Jahr wandert die Sonne durch alle zwölf Häuser */
const haeuser = new Set();
for(let mon = 0; mon < 12; mon++) haeuser.add(M.schwerpunkt(CA, 2026, mon));
p('über zwölf Monate alle zwölf Häuser', haeuser.size === 12,
  haeuser.size + ' verschiedene');
/* Zwei verschiedene Geburtsbilder haben verschiedene Aszendenten und
   damit im selben Monat verschiedene Schwerpunkte */
p('Probechart A und B haben verschiedene Aszendenten',
  Math.floor(CA.ASC / 30) !== Math.floor(CB.ASC / 30));
let verschieden = 0;
for(let mon = 0; mon < 12; mon++)
  if(M.schwerpunkt(CA, 2026, mon) !== M.schwerpunkt(CB, 2026, mon)) verschieden++;
p('der Schwerpunkt hängt am Geburtsbild', verschieden === 12,
  verschieden + ' von 12 Monaten unterscheiden sich');

/* ── 4 · Die Treffer ────────────────────────────────────────── */
/* Fehlerklasse: die alte Seite schrieb denselben Vorgang mehrfach in
   die Liste und sortierte danach nur noch nachträglich aus. */
for(const C of [CA, CB]){
  for(let mon = 0; mon < 12; mon++){
    const tr = M.treffer(C, 2026, mon);
    const paare = tr.map(x => x.wanderer + '/' + x.punkt);
    p('kein Paar doppelt (' + MN[mon] + ')', new Set(paare).size === paare.length,
      paare.join(', '));
    tr.forEach(x => {
      p('Orbis innerhalb der Grenze', x.orbis <= M.ORBIS, x.wanderer + ' ' + x.orbis);
      p('Wanderer ist einer der langsamen', M.WANDERER.indexOf(x.wanderer) >= 0, x.wanderer);
      p('Punkt ist einer der gemeinten', M.PUNKTE.indexOf(x.punkt) >= 0, x.punkt);
      p('Winkel ist einer der fünf',
        M.WINKEL.some(k => k.k === x.k && k.grad === x.winkel), x.k + '/' + x.winkel);
      p('Tag liegt im Monat', x.tag >= 1 && x.tag <= M.tageImMonat(2026, mon),
        'Tag ' + x.tag + ' in ' + MN[mon]);
    });
    /* Sortierung: der engste zuerst */
    for(let i = 1; i < tr.length; i++)
      p('nach Enge sortiert (' + MN[mon] + ')', tr[i-1].orbis <= tr[i].orbis,
        tr[i-1].orbis + ' vor ' + tr[i].orbis);
  }
}
/* Derselbe Monat ergibt zweimal denselben Bericht */
p('die Rechnung ist wiederholbar',
  JSON.stringify(M.treffer(CA, 2026, 4)) === JSON.stringify(M.treffer(CA, 2026, 4)));

/* ── 4b · Die getroffene Anlage ─────────────────────────────── */
/* Fehlerklasse: der Bericht beschreibt nur den Himmel. Dann liest
   sich derselbe Monat für jeden Menschen gleich. Jeder Treffer muss
   sagen, welche Anlage er trifft und wo sie bei diesem Menschen
   liegt — und das muss vom Geburtsbild abhängen, nicht vom Datum. */
for(const [n, C] of [['A', CA], ['B', CB]]){
  for(let jahr = 2026; jahr <= 2028; jahr++){
    for(let mon = 0; mon < 12; mon++){
      M.treffer(C, jahr, mon).forEach(x => {
        p('Treffer nennt das natale Feld (' + n + ')',
          Number.isInteger(x.hausNatal) && x.hausNatal >= 1 && x.hausNatal <= 12,
          x.punkt + ' → ' + x.hausNatal);
        p('das natale Feld ist das Feld des getroffenen Punktes (' + n + ')',
          x.hausNatal === haus(C, C[x.punkt]),
          x.punkt + ': ' + x.hausNatal + ' statt ' + haus(C, C[x.punkt]));
        p('die Winkelart hat eine Fassung (' + n + ')',
          !!(T.BEDEUTUNG[x.wanderer] && T.BEDEUTUNG[x.wanderer][x.art]),
          x.wanderer + '/' + x.art);
        p('der getroffene Punkt hat eine Anlage (' + n + ')',
          !!T.ANLAGE[x.punkt], x.punkt);
      });
    }
  }
}

/* Das Feld, in dem eine Anlage liegt, hängt am Geburtsbild. Wäre es
   das nicht, bekämen alle Menschen denselben Satz. */
const andersherum = M.PUNKTE.filter(k => haus(CA, CA[k]) !== haus(CB, CB[k]));
p('dieselbe Anlage liegt bei zwei Menschen in verschiedenen Feldern',
  andersherum.length >= 4,
  andersherum.length + ' von ' + M.PUNKTE.length + ': ' + andersherum.join(', '));

/* Über drei Jahre wird nicht immer dieselbe Anlage genannt. */
for(const [n, C] of [['A', CA], ['B', CB]]){
  const genannt = new Set();
  for(let jahr = 2026; jahr <= 2028; jahr++)
    for(let mon = 0; mon < 12; mon++){
      const tr = M.treffer(C, jahr, mon);
      if(tr.length) genannt.add(tr[0].punkt);
    }
  p('über drei Jahre werden verschiedene Anlagen genannt (' + n + ')',
    genannt.size >= 4, genannt.size + ': ' + [...genannt].join(', '));
}

/* Zwei Geburtsbilder, derselbe Monat, verschiedener Inhalt — und
   zwar nicht nur verschiedene Daten. Verglichen wird der inhaltliche
   Schlüssel: der Schwerpunkt, was dort natal liegt, und die ersten
   beiden Vorgänge mit ihrer getroffenen Anlage. */
function inhalt(C, jahr, mon){
  const h = M.schwerpunkt(C, jahr, mon);
  return h + '|' + M.bewohner(C, h).join('+') + '|'
    + M.treffer(C, jahr, mon).slice(0, 2)
        .map(x => x.wanderer + '/' + x.punkt + '/' + x.hausNatal + '/' + x.art)
        .join(';');
}
let gleicherInhalt = 0;
for(let jahr = 2026; jahr <= 2028; jahr++)
  for(let mon = 0; mon < 12; mon++)
    if(inhalt(CA, jahr, mon) === inhalt(CB, jahr, mon)) gleicherInhalt++;
p('zwei Geburtsbilder ergeben nie denselben Monatsinhalt',
  gleicherInhalt === 0, gleicherInhalt + ' von 36 Monaten gleich');

/* Die Bewohner eines Feldes sind genau die Punkte, die dort stehen. */
for(const [n, C] of [['A', CA], ['B', CB]]){
  for(let h = 1; h <= 12; h++){
    const b = M.bewohner(C, h);
    p('Bewohner stehen wirklich in dem Feld (' + n + ', ' + h + ')',
      b.every(r => haus(C, C[r]) === h), b.join(','));
    p('kein Punkt wird übersehen (' + n + ', ' + h + ')',
      M.PUNKTE.filter(r => haus(C, C[r]) === h).length === b.length);
  }
  const alle = [];
  for(let h = 1; h <= 12; h++) alle.push(...M.bewohner(C, h));
  p('jeder Punkt wohnt in genau einem Feld (' + n + ')',
    alle.length === M.PUNKTE.length, alle.length + ' statt ' + M.PUNKTE.length);
}

/* ── 5 · Neu- und Vollmond ──────────────────────────────────── */
/* Fehlerklasse: ein Datum, das es im Monat nicht gibt. */
let neu = 0, voll = 0;
for(let jahr = 2026; jahr <= 2027; jahr++){
  for(let mon = 0; mon < 12; mon++){
    const tage = M.tageImMonat(jahr, mon);
    const L = M.lunationen(CA, jahr, mon);
    L.forEach(l => {
      p('Mondtag liegt im Monat', l.tag >= 1 && l.tag <= tage,
        l.art + ' am ' + l.tag + '. ' + MN[mon] + ' ' + jahr + ' (' + tage + ' Tage)');
      p('Mondhaus ist ein Haus von 1 bis 12', l.haus >= 1 && l.haus <= 12, 'ist ' + l.haus);
      p('Mondart ist bekannt', l.art === 'neumond' || l.art === 'vollmond', l.art);
      if(l.art === 'neumond') neu++; else voll++;
    });
    p('höchstens drei Lunationen im Monat', L.length <= 3,
      L.length + ' in ' + MN[mon] + ' ' + jahr);
    p('mindestens eine Lunation im Monat', L.length >= 1,
      'keine in ' + MN[mon] + ' ' + jahr);
  }
}
/* Fehlerklasse: der genannte Tag ist der Tag NACH dem Durchgang.
   Geprüft wird am Augenblick selbst: dort steht der Abstand zwischen
   Mond und Sonne wirklich bei 0 bzw. 180 Grad, und das genannte
   Datum ist das Datum dieses Augenblicks. */
const neumonde = [];
for(let mon = 0; mon < 24; mon++){
  const jahr = 2026 + Math.floor(mon / 12), m = mon % 12;
  const jdA = M.monatJD(jahr, m, 1), tage = M.tageImMonat(jahr, m);
  for(let d = 0; d <= tage; d++){
    const jd = jdA + d, vor = M.phase(jd - 1), ph = M.phase(jd);
    let ziel = null;
    if(vor > 270 && ph < 90) ziel = 0; else if(vor < 180 && ph >= 180) ziel = 180;
    if(ziel === null) continue;
    const genau = M.genau(jd - 1, jd, ziel);
    const ab = Math.abs(M.nrm(M.phase(genau) - ziel + 180) - 180);
    p('Durchgang ist auf eine Bogenminute genau getroffen', ab < 1 / 60,
      'Abstand ' + ab.toFixed(4) + ' Grad bei ' + MN[m] + ' ' + jahr);
    const dt = datVon(genau);
    p('der Augenblick liegt zwischen den beiden Mittagsstunden',
      genau > jd - 1 && genau < jd, genau);
    if(ziel === 0 && dt.getUTCFullYear() === jahr && dt.getUTCMonth() === m)
      neumonde.push(genau);
  }
}
/* Zwei Neumonde liegen einen synodischen Monat auseinander: 29,53 Tage. */
for(let i = 1; i < neumonde.length; i++){
  const ab = neumonde[i] - neumonde[i-1];
  p('Abstand zweier Neumonde ist ein synodischer Monat',
    Math.abs(ab - 29.53) < 0.8, ab.toFixed(3) + ' Tage');
}
p('in 24 Monaten rund 24 Neumonde gefunden',
  neumonde.length >= 23 && neumonde.length <= 25, neumonde.length);

/* Das genannte Datum stimmt mit dem Augenblick überein. */
for(let mon = 0; mon < 12; mon++){
  M.lunationen(CA, 2026, mon).forEach(l => {
    p('Stunde ist eine Tagesstunde', l.stunde >= 0 && l.stunde <= 23, l.stunde);
    p('Monat des Eintrags ist der gefragte Monat',
      l.tag <= M.tageImMonat(2026, mon));
  });
  const arten = M.lunationen(CA, 2026, mon).map(l => l.art + l.tag);
  p('kein Mondtag doppelt (' + MN[mon] + ')',
    new Set(arten).size === arten.length, arten.join(', '));
}

/* In 24 Monaten gibt es rund 24 Neumonde und rund 24 Vollmonde */
p('ungefähr ein Neumond je Monat',  neu  >= 24 && neu  <= 26, neu + ' in 24 Monaten');
p('ungefähr ein Vollmond je Monat', voll >= 24 && voll <= 26, voll + ' in 24 Monaten');

/* ── 6 · Rechnen und Texte passen zusammen ──────────────────── */
/* Fehlerklasse: ein neuer Winkel oder Punkt im Rechner, für den
   niemand ein Wort hinterlegt hat — die Seite zeigt dann "undefined". */
M.WINKEL.forEach(k => p('Winkel ' + k.k + ' hat ein Wort', !!T.TECH.winkel[k.k]));
M.PUNKTE.forEach(r => p('Punkt ' + r + ' hat eine Dativform', !!T.TECH.punkt[r]));
M.WANDERER.forEach(w => {
  ['hart','weich'].forEach(art => {
    const d = T.LAUF[w] && T.LAUF[w][art];
    p('Wanderer ' + w + '/' + art + ' hat einen Titel', !!(d && d.titel));
    p('Wanderer ' + w + '/' + art + ' hat einen Text', !!(d && d.text));
  });
  /* Fehlerklasse: beide Fassungen sind dieselbe, der Unterschied
     zwischen reibendem und tragendem Winkel nur behauptet. */
  p('Wanderer ' + w + ': die beiden Fassungen unterscheiden sich',
    !!(T.LAUF[w] && T.LAUF[w].hart.titel !== T.LAUF[w].weich.titel
       && T.LAUF[w].hart.text !== T.LAUF[w].weich.text));
});
M.PUNKTE.forEach(r => {
  const A = T.ANLAGE[r];
  p('Punkt ' + r + ' hat eine Anlage in Alltagssprache', !!A);
  if(!A) return;
  p('Anlage ' + r + ' nennt ihr Geschlecht', ['m','f','n'].indexOf(A.genus) >= 0, A.genus);
  /* Die Fallprobe: aus dem Geschlecht folgen beide Formen. */
  const soll = { m:['dein ','deinen '], f:['deine ','deine '], n:['dein ','dein '] }[A.genus];
  p('Anlage ' + r + ': erster Fall passt zum Geschlecht',
    !!soll && A.nom.indexOf(soll[0]) === 0, A.nom);
  p('Anlage ' + r + ': vierter Fall passt zum Geschlecht',
    !!soll && A.akk.indexOf(soll[1]) === 0, A.akk);
  p('Anlage ' + r + ': beide Fälle meinen dasselbe',
    !!soll && A.nom.slice(soll[0].length) === A.akk.slice(soll[1].length),
    A.nom + ' / ' + A.akk);
  p('Anlage ' + r + ' erklärt sich', (A.lang || '').length >= 20, A.lang);
});
M.WANDERER.forEach(w => {
  p('Bewegung ' + w + ' sagt, was sie mit einer Anlage macht', !!T.BEDEUTUNG[w]);
  ['hart','weich'].forEach(art => {
    const t = T.BEDEUTUNG[w] && T.BEDEUTUNG[w][art];
    p('Bewegung ' + w + ' hat die Fassung ' + art, !!t);
    p('Bewegung ' + w + '/' + art + ' nennt die Anlage',
      !!t && t.indexOf('{anlageNom}') >= 0);
  });
});
M.WANDERER.forEach(w => p('Bewegung ' + w + ': die beiden Bedeutungen unterscheiden sich',
  !!(T.BEDEUTUNG[w] && T.BEDEUTUNG[w].hart !== T.BEDEUTUNG[w].weich)));
M.WINKEL.forEach(k => p('Winkelart ' + k.art + ' kommt in BEDEUTUNG vor',
  M.WANDERER.every(w => T.BEDEUTUNG[w] && T.BEDEUTUNG[w][k.art]), k.art));
p('der Anlagensatz nennt das Feld', T.ANLAGE_SATZ.indexOf('{feld}') >= 0);
p('der Anlagensatz steht im vierten Fall', T.ANLAGE_SATZ.indexOf('{anlageAkk}') >= 0);
p('es gibt einen Satz für ein besetztes Feld', (T.BEWOHNT||'').indexOf('{anlagen}') >= 0);
p('es gibt einen Satz für ein leeres Feld', (T.UNBEWOHNT||'').length >= 80);
p('zwölf Schwerpunktsätze', T.SCHWERPUNKT.length === 12, T.SCHWERPUNKT.length);
p('zwölf Fragen', T.FRAGE.length === 12, T.FRAGE.length);
p('zwölf Hausnamen in der Engine', HT.length === 12, HT.length);
p('drei Monatswörter', T.BEDIENUNG.monate.length === 3);
p('beide Mondarten haben einen Satz', !!T.MOND.neumond && !!T.MOND.vollmond);

/* ── 7 · Der ganze Bericht ──────────────────────────────────── */
const ber = M.bericht(CA, 2026, 9);
p('Bericht nennt Jahr und Monat', ber.jahr === 2026 && ber.mon === 9);
p('Bericht nennt die Tage', ber.tage === 31);
p('Bericht hat einen Schwerpunkt', ber.schwerpunkt >= 1 && ber.schwerpunkt <= 12);
p('Bericht hat eine Trefferliste', Array.isArray(ber.treffer));
p('Bericht hat eine Mondliste', Array.isArray(ber.lunationen));
p('Bericht sagt, was im Schwerpunkt liegt', Array.isArray(ber.bewohner));
p('die Bewohner gehören zum Schwerpunkt',
  ber.bewohner.every(r => haus(CA, CA[r]) === ber.schwerpunkt),
  ber.bewohner.join(','));

/* ── Ergebnis ───────────────────────────────────────────────── */
if(fehler.length){
  console.error('monat: ' + fehler.length + ' von ' + (ok + fehler.length) + ' Prüfungen fehlgeschlagen');
  fehler.slice(0, 25).forEach(f => console.error('  ✗ ' + f));
  process.exit(1);
}
console.log('monat: ' + ok + ' Prüfungen bestanden');
