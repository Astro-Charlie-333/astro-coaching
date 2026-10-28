/* Prüft bereich-rechner.js gegen von Hand nachvollziehbare Fälle.
   Läuft mit: node bereiche/_test-bereich.js
   Probedaten sind erfunden — nie echte Geburtsdaten hier hinein. */
'use strict';
const fs = require('fs'), path = require('path');
const wurzel = path.join(__dirname, '..');

function laden(dateien){
  const code = dateien.map(f => fs.readFileSync(path.join(wurzel, f), 'utf8')).join('\n;\n');
  const sandkasten = { window:{}, console:console, Math:Math, Date:Date, Intl:Intl };
  const f = new Function('window','console', code + '\n;return {window:window, lon:typeof lon!=="undefined"?lon:null, chartVon:typeof chartVon!=="undefined"?chartVon:null, haus:typeof haus!=="undefined"?haus:null, jdFromUT:typeof jdFromUT!=="undefined"?jdFromUT:null, datVon:typeof datVon!=="undefined"?datVon:null, rueck:typeof rueck!=="undefined"?rueck:null};');
  return f(sandkasten.window, console);
}

const U = laden(['rituale/engine.js', 'zeit/zeit-rechner.js',
                 'bereiche/lebensbereiche.js', 'bereiche/bereich-rechner.js',
                 'bereiche/bereich-daten.js', 'bereiche/tief-bauer.js']);
const AC = U.window.AC_BER;
const BD = U.window.AC_BDAT;
const TI = U.window.AC_TIEF;
const LB = U.window.AC_LB;
const AZ = U.window.AC_ZEIT;
const { lon, chartVon, haus, jdFromUT, datVon } = U;

let ok = 0, fehler = [];
function p(name, bed, info){
  if(bed) ok++; else fehler.push(name + (info ? '  →  ' + info : ''));
}
function nah(name, a, b, tol, info){
  p(name, Math.abs(a-b) <= tol, (info||'') + ' ist ' + a + ', erwartet ' + b + ' ±' + tol);
}

/* ── Probechart: erfundenes Datum ───────────────────────────── */
const PROBE = { y:1975, mo:8, d:4, h:14, mi:20, tz:1, lat:52.52, lon:13.405 };
const C = chartVon(PROBE);
const JETZT = jdFromUT(2026, 10, 15, 12);

/* ── 1. Grundrechnen ────────────────────────────────────────── */
p('nrm wickelt negativ', AC.nrm(-10) === 350, 'nrm(-10)=' + AC.nrm(-10));
p('nrm wickelt über 360', AC.nrm(370) === 10);
p('dist ist nie über 180', AC.dist(10, 200) === 170, 'dist(10,200)=' + AC.dist(10,200));
p('dist ist symmetrisch', AC.dist(350, 20) === AC.dist(20, 350));
p('dist über den Nullpunkt', AC.dist(355, 5) === 10);

/* ── 2. Aspekterkennung ─────────────────────────────────────── */
let A = AC.aspektVon(0, 0, 3);
p('0° ist Konjunktion', A && A.aspekt === 'konjunktion');
A = AC.aspektVon(0, 180, 3);
p('180° ist Opposition', A && A.aspekt === 'opposition');
A = AC.aspektVon(0, 90, 3);
p('90° ist Quadrat', A && A.aspekt === 'quadrat');
A = AC.aspektVon(0, 120, 3);
p('120° ist Trigon', A && A.aspekt === 'trigon');
A = AC.aspektVon(0, 60, 3);
p('60° ist Sextil', A && A.aspekt === 'sextil');
p('45° ist kein Aspekt', AC.aspektVon(0, 45, 3) === null);
p('ausserhalb Orb zaehlt nicht', AC.aspektVon(0, 94, 3) === null);
A = AC.aspektVon(0, 92, 3);
nah('Abweichung wird gemessen', A ? A.ab : -1, 2, 0.001);
A = AC.aspektVon(0, 358, 3);
p('Konjunktion ueber den Nullpunkt', A && A.aspekt === 'konjunktion', A ? A.aspekt : 'null');
nah('und ihre Abweichung', A ? A.ab : -1, 2, 0.001);

/* der engere Aspekt gewinnt, wenn zwei in Frage kommen */
A = AC.aspektVon(0, 61, 15);
p('engerer Aspekt gewinnt', A && A.aspekt === 'sextil', A ? A.aspekt : 'null');

/* Arten sind richtig zugeordnet */
p('Quadrat ist Spannung',   AC.aspektVon(0,90,1).art  === 'spannung');
p('Trigon ist leicht',      AC.aspektVon(0,120,1).art === 'leicht');
p('Opposition gegenueber',  AC.aspektVon(0,180,1).art === 'gegenueber');

/* ── 3. Fenster ─────────────────────────────────────────────── */
/* Ein Fenster gibt es nur, wenn der Aspekt jetzt auch steht. */
p('kein Fenster ohne Aspekt', AC.fenster('Saturn', AC.nrm(lon('Saturn', JETZT) + 47), 0, 3, JETZT) === null);

/* Saturn auf seinen eigenen Ort: Fenster muss den Stichtag enthalten */
const sl = lon('Saturn', JETZT);
let F = AC.fenster('Saturn', sl, 0, 3, JETZT);
p('Fenster existiert bei exaktem Stand', F !== null);
if(F){
  p('Fenster beginnt vor dem Stichtag', F.vonOffen || F.von <= JETZT + 0.6, 'von=' + F.von + ' jd=' + JETZT);
  p('Fenster endet nach dem Stichtag',  F.bisOffen || F.bis >= JETZT - 0.6, 'bis=' + F.bis);
  p('Tage noch ist nicht negativ', F.tageNoch === null || F.tageNoch >= 0, 'tageNoch=' + F.tageNoch);
  /* Saturn braucht für 3° Orb beidseitig grob 3–10 Monate, nie Jahre */
  if(F.bis !== null && F.von !== null){
    const laenge = F.bis - F.von;
    p('Saturnfenster plausibel lang', laenge > 20 && laenge < 1200, 'Laenge=' + Math.round(laenge) + ' Tage');
  }
}

/* An den Rändern des Fensters ist der Aspekt gerade noch bzw. nicht mehr da */
if(F && F.bis !== null){
  const drin  = Math.abs(AC.dist(lon('Saturn', F.bis - 2), sl) - 0);
  const draus = Math.abs(AC.dist(lon('Saturn', F.bis + 8), sl) - 0);
  p('innen ist im Orb',    drin  <= 3.05, 'innen=' + drin.toFixed(2));
  p('aussen ist raus',     draus >  2.95, 'aussen=' + draus.toFixed(2));
}

/* Die Sonne läuft 1°/Tag: ihr 2°-Fenster dauert rund 4 Tage. */
const sol = lon('Sonne', JETZT);
const FS = AC.fenster('Sonne', sol, 0, 2, JETZT);
p('Sonnenfenster existiert', FS !== null);
if(FS && FS.von !== null && FS.bis !== null){
  nah('Sonnenfenster ist rund 4 Tage', FS.bis - FS.von, 4, 1.2);
}

/* ── 4. Hausdurchgang ───────────────────────────────────────── */
const D = AC.hausDurchgang(C, 'Jupiter', JETZT);
p('Durchgang nennt ein Haus 1–12', D.haus >= 1 && D.haus <= 12, 'haus=' + D.haus);
p('Durchgangshaus stimmt mit haus() ueberein', D.haus === haus(C, lon('Jupiter', JETZT)));
if(D.bis){
  p('Durchgang endet in der Zukunft', D.bis > JETZT, 'bis=' + D.bis);
  p('einen Tag vor Ende noch im Haus',  haus(C, lon('Jupiter', D.bis - 1.5)) === D.haus);
  p('einen Tag nach Ende nicht mehr',   haus(C, lon('Jupiter', D.bis + 3))   !== D.haus);
  /* Jupiter bleibt rund ein Jahr in einem Zeichen */
  p('Jupiterdurchgang unter 2 Jahren', (D.bis - JETZT) < 760, 'Rest=' + Math.round(D.bis - JETZT));
}
const DP = AC.hausDurchgang(C, 'Pluto', JETZT);
p('Pluto hat auch ein Haus', DP.haus >= 1 && DP.haus <= 12);

/* ── 5. Vorgänge ────────────────────────────────────────────── */
const V = AC.vorgaenge(C, JETZT);
p('es gibt ueberhaupt Vorgaenge', V.length > 0, 'Anzahl=' + V.length);
p('nicht absurd viele Vorgaenge', V.length < 120, 'Anzahl=' + V.length);

let formen = {}, hausFehler = 0, gewFehler = 0, fensterFehler = 0;
V.forEach(v => {
  formen[v.form] = (formen[v.form]||0) + 1;
  if(!v.haeuser || !v.haeuser.length) hausFehler++;
  v.haeuser.forEach(h => { if(!(h>=1 && h<=12)) hausFehler++; });
  if(!(v.gewicht > 0 && v.gewicht <= 2)) gewFehler++;
  if(!v.f) fensterFehler++;
});
p('jeder Vorgang nennt ein gueltiges Haus', hausFehler === 0, hausFehler + ' Verstoesse');
p('jedes Gewicht ist positiv und gedeckelt', gewFehler === 0, gewFehler + ' Verstoesse');
p('jeder Vorgang hat ein Fenster', fensterFehler === 0, fensterFehler + ' ohne');
p('es gibt Hausdurchgaenge', (formen['durchgang']||0) > 0, JSON.stringify(formen));
p('nur langsame Planeten wandern durch Haeuser',
  V.filter(v => v.form==='durchgang').every(v => ['Pluto','Neptun','Uranus','Saturn','Jupiter'].indexOf(v.wanderer) >= 0),
  V.filter(v => v.form==='durchgang').map(v=>v.wanderer).join(','));
p('kein Planet aspektiert sich selbst konjunkt',
  V.every(v => !(v.form==='aspekt' && v.wanderer===v.ziel && v.aspekt==='konjunktion')));

/* jeder Aspektvorgang muss zum Stichtag wirklich im Orb stehen */
let orbFehler = [];
V.filter(v => v.form==='aspekt').forEach(v => {
  const zl = (v.zielArt==='achse') ? C[v.ziel] : C[v.ziel];
  const ab = Math.abs(AC.dist(lon(v.wanderer, JETZT), zl) - v.grad);
  const orb = AC.WANDERER.filter(w => w.k===v.wanderer)[0].orb;
  if(ab > orb + 0.01) orbFehler.push(v.wanderer+'→'+v.ziel+' ab='+ab.toFixed(2)+' orb='+orb);
});
p('jeder gemeldete Aspekt steht wirklich im Orb', orbFehler.length === 0, orbFehler.join(' | '));

/* ── 6. Bereiche ────────────────────────────────────────────── */
p('es gibt zehn Bereiche', AC.BEREICHE.length === 10, 'sind ' + AC.BEREICHE.length);
let schluessel = {}, hausSpanne = 0;
AC.BEREICHE.forEach(B => {
  if(schluessel[B.k]) hausSpanne++;
  schluessel[B.k] = 1;
  if(!B.name || !B.haeuser || B.haeuser.length < 2) hausSpanne++;
  B.haeuser.forEach(h => { if(!(h>=1 && h<=12)) hausSpanne++; });
});
p('Bereichsschluessel sind eindeutig und gueltig', hausSpanne === 0, hausSpanne + ' Verstoesse');

/* jedes Haus 1–12 kommt in mindestens einem Bereich vor —
   sonst fällt ein Teil des Charts stumm unter den Tisch */
let abgedeckt = {};
AC.BEREICHE.forEach(B => B.haeuser.forEach(h => abgedeckt[h] = 1));
let fehlende = [];
for(let h=1;h<=12;h++) if(!abgedeckt[h]) fehlende.push(h);
p('alle zwoelf Haeuser sind einem Bereich zugeordnet', fehlende.length === 0, 'fehlen: ' + fehlende.join(','));

/* jedes Kernhaus gehört nur einem Bereich — sonst doppelte Schwerpunkte */
let kerne = {}, kernDoppelt = [];
AC.BEREICHE.forEach(B => {
  if(kerne[B.haeuser[0]]) kernDoppelt.push(B.haeuser[0] + ': ' + kerne[B.haeuser[0]] + ' und ' + B.k);
  kerne[B.haeuser[0]] = B.k;
});
p('Kernhaeuser sind nicht doppelt belegt', kernDoppelt.length === 0, kernDoppelt.join(' | '));

/* ── 7. Zuordnung ───────────────────────────────────────────── */
const Bliebe = AC.BEREKEY ? null : AC.BEREICHE.filter(B => B.k==='liebe')[0];
const Lliebe = AC.fuerBereich(V, Bliebe);
p('Liebe bekommt nur passende Vorgaenge',
  Lliebe.every(v => v.haeuser.some(h => Bliebe.haeuser.indexOf(h) >= 0)),
  'Fremdlaeufer dabei');
p('Zuordnung ist nach Gewicht sortiert',
  Lliebe.every((v,i) => i===0 || Lliebe[i-1].bGewicht >= v.bGewicht));
p('jeder Wanderer kommt je Bereich nur einmal vor',
  new Set(Lliebe.map(v => v.wanderer)).size === Lliebe.length,
  Lliebe.map(v=>v.wanderer).join(','));
AC.BEREICHE.forEach(B => {
  const Lb = AC.fuerBereich(V, B);
  p('kein doppelter Wanderer bei ' + B.k,
    new Set(Lb.map(v => v.wanderer)).size === Lb.length,
    Lb.map(v=>v.wanderer).join(','));
  /* Verglichen wird mit dem Bereichsgewicht, nicht dem rohen:
     ein Vorgang im Nebenhaus wiegt hier weniger als im Kernhaus. */
  const bgew = v => {
    let best = -1;
    v.haeuser.forEach(h => {
      const pos = B.haeuser.indexOf(h);
      if(pos >= 0 && (best < 0 || pos < best)) best = pos;
    });
    if(best < 0) return null;
    return v.gewicht * (best === 0 ? 1.0 : best === 1 ? 0.72 : 0.52);
  };
  p('der staerkste Auftritt gewinnt bei ' + B.k,
    Lb.every(v => V.filter(x => x.wanderer === v.wanderer)
                   .every(x => { const g = bgew(x); return g === null || g <= v.bGewicht + 1e-9; })));
});
p('Kernhaus wiegt voll, Nebenhaus weniger',
  Lliebe.every(v => v.kern ? Math.abs(v.bGewicht - v.gewicht) < 1e-9 : v.bGewicht < v.gewicht + 1e-9));

/* ── 8. Lautstärke ──────────────────────────────────────────── */
p('leere Liste ist still', AC.lautstaerke([]) === 0);
p('ein starker Vorgang allein macht noch keine Bewegung',
  AC.lautstaerke([{bGewicht:1.1}]) === 1,
  'ein einzelner Transit traegt keinen ganzen Bereich — ist Stufe ' + AC.lautstaerke([{bGewicht:1.1}]));
p('ein sehr starker Vorgang schon', AC.lautstaerke([{bGewicht:1.4}]) >= 2);
p('drei starke Vorgaenge machen viel', AC.lautstaerke([{bGewicht:0.9},{bGewicht:0.8},{bGewicht:0.6}]) === 3);
p('nur der dritte zaehlt noch',
  AC.lautstaerke([{bGewicht:0.3},{bGewicht:0.3},{bGewicht:0.3},{bGewicht:9}]) === 1,
  'der vierte darf nicht mitzaehlen');
p('Lautstaerke steigt nie ueber 3', AC.lautstaerke([{bGewicht:9},{bGewicht:9},{bGewicht:9}]) === 3);

/* ── 9. Natale Lage ─────────────────────────────────────────── */
AC.BEREICHE.forEach(B => {
  const N = AC.natal(C, B);
  p('natal: Kernhaus von ' + B.k, N.kernHaus === B.haeuser[0]);
  p('natal: Kernzeichen 0–11 bei ' + B.k, N.kernZeichen >= 0 && N.kernZeichen <= 11, 'ist ' + N.kernZeichen);
  p('natal: leer stimmt mit Liste bei ' + B.k, N.leer === (N.planeten.length === 0));
  p('natal: alle Planeten liegen in Bereichshaeusern bei ' + B.k,
    N.planeten.every(x => B.haeuser.indexOf(x.haus) >= 0));
});
/* Alle zehn Planeten müssen über alle Bereiche hinweg irgendwo auftauchen */
let gesehen = {};
AC.BEREICHE.forEach(B => AC.natal(C, B).planeten.forEach(x => gesehen[x.p] = 1));
p('jeder natale Planet landet in mindestens einem Bereich',
  Object.keys(gesehen).length === 10, 'nur ' + Object.keys(gesehen).length + ': ' + Object.keys(gesehen).join(','));

/* Kernzeichen muss zum Whole-Sign-Haus passen */
const Bk = AC.BEREICHE[0];
const Nk = AC.natal(C, Bk);
p('Kernzeichen folgt dem Aszendenten',
  Nk.kernZeichen === (Math.floor(C.ASC/30) + (Bk.haeuser[0]-1)) % 12);

/* ── 10. Blatt ──────────────────────────────────────────────── */
const Bl = AC.blatt(C, JETZT);
p('Blatt nennt den Stichtag', Bl.jd === JETZT);
p('Blatt hat zehn Bereiche', Bl.bereiche.length === 10);
p('jeder Bereich im Blatt ist vollstaendig',
  Bl.bereiche.every(b => b.k && b.name && b.laeuft && b.natal && b.laut >= 0 && b.laut <= 3));
p('Blattreihenfolge entspricht der Definition',
  Bl.bereiche.every((b,i) => b.k === AC.BEREICHE[i].k));
/* Kein Bereich darf dauerhaft stumm sein: über ein Jahr verteilt
   muss jeder irgendwann etwas zu sagen haben. */
let stumm = {};
AC.BEREICHE.forEach(B => stumm[B.k] = 0);
for(let m=0;m<12;m++){
  const b2 = AC.blatt(C, JETZT + m*30.4);
  b2.bereiche.forEach(b => { if(b.laut > 0) stumm[b.k]++; });
}
const nieLaut = Object.keys(stumm).filter(k => stumm[k] === 0);
p('kein Bereich bleibt ein Jahr lang stumm', nieLaut.length === 0, 'stumm: ' + nieLaut.join(','));

/* Summe der Lautstärken ist nicht überall maximal — sonst sagt die Anzeige nichts */
const lauts = Bl.bereiche.map(b => b.laut);
p('Lautstaerken sind nicht alle gleich', new Set(lauts).size > 1, 'alle ' + lauts[0]);

/* ── 11. Stabilität ─────────────────────────────────────────── */
/* Dasselbe Datum zweimal muss dasselbe ergeben. */
const Bl2 = AC.blatt(C, JETZT);
p('Rechnung ist wiederholbar',
  JSON.stringify(Bl.bereiche.map(b=>[b.k,b.laut,b.laeuft.length])) ===
  JSON.stringify(Bl2.bereiche.map(b=>[b.k,b.laut,b.laeuft.length])));
/* Ein Tag später darf sich nicht alles umwerfen. */
const Bl3 = AC.blatt(C, JETZT + 1);
let sprung = 0;
Bl.bereiche.forEach((b,i) => { if(Math.abs(b.laut - Bl3.bereiche[i].laut) > 1) sprung++; });
p('ein Tag veraendert die Lautstaerke hoechstens um eine Stufe', sprung === 0, sprung + ' Spruenge');

/* Ein weit entferntes Datum darf nicht abstuerzen. */
let abgestuerzt = null;
try{
  const weit = AC.blatt(C, jdFromUT(2065, 1, 1, 12));
  if(weit.bereiche.length !== 10) abgestuerzt = 'falsche Anzahl';
}catch(e){ abgestuerzt = e.message; }
p('ferne Zukunft stuerzt nicht ab', abgestuerzt === null, abgestuerzt);

let abgestuerzt2 = null;
try{
  const frueh = AC.blatt(C, jdFromUT(1910, 1, 1, 12));
  if(frueh.bereiche.length !== 10) abgestuerzt2 = 'falsche Anzahl';
}catch(e){ abgestuerzt2 = e.message; }
p('ferne Vergangenheit stuerzt nicht ab', abgestuerzt2 === null, abgestuerzt2);

/* ── 12. Das Kapitel aus der Zeitenseite ────────────────────── */
p('Zeitenrechner ist mitgeladen', !!AZ, 'AC_ZEIT fehlt');

const jdGeb = jdFromUT(PROBE.y, PROBE.mo, PROBE.d, PROBE.h + PROBE.mi/60 - PROBE.tz);
const gebDat = new Date(Date.UTC(PROBE.y, PROBE.mo-1, PROBE.d, PROBE.h - PROBE.tz, PROBE.mi));
const Z = AZ.blatt(C, jdGeb, gebDat, datVon(JETZT));
p('Zeitenblatt entsteht', !!Z && !!Z.spuren);
const tageSeit = Z.tageSeitGeburt;
p('Tage seit Geburt sind plausibel', tageSeit > 15000 && tageSeit < 22000, 'tage=' + Math.round(tageSeit));

/* Bereiche mit zrk bekommen ein Kapitel, die ohne nicht. */
AC.BEREICHE.forEach(B => {
  const K = AC.kapitel(Z, B.k, tageSeit);
  if(B.zrk) p('Kapitel vorhanden fuer ' + B.k, K !== null && !!K.l1, 'zrk=' + B.zrk);
  else      p('kein Kapitel fuer ' + B.k, K === null);
});
p('ohne Zeitenblatt gibt es kein Kapitel', AC.kapitel(null, 'liebe', tageSeit) === null);
p('unbekannter Bereich gibt kein Kapitel', AC.kapitel(Z, 'gibtsnicht', tageSeit) === null);

/* Das Kapitel muss den Stichtag wirklich enthalten. */
const Kl = AC.kapitel(Z, 'liebe', tageSeit);
if(Kl){
  p('Kapitel enthaelt den Stichtag', tageSeit >= Kl.l1.von && tageSeit < Kl.l1.bis);
  p('Unterabschnitt liegt im Kapitel',
    !Kl.l2 || (Kl.l2.von >= Kl.l1.von && Kl.l2.bis <= Kl.l1.bis));
  p('Unterabschnitt enthaelt den Stichtag',
    !Kl.l2 || (tageSeit >= Kl.l2.von && tageSeit < Kl.l2.bis));
  p('anders stimmt mit den beiden Ebenen',
    Kl.anders === !!(Kl.l2 && (!!Kl.l1.gipfel !== !!Kl.l2.gipfel)));
}

/* ── 12b. Die Regression: lautes Kapitel darf nicht still werden ──
   Genau der Fehler, der auf der Zeitenseite gemeldet wurde: ein
   Bereich wurde leise genannt, obwohl das Kapitel laut läuft. */
const schwach = [{bGewicht:0.20}, {bGewicht:0.10}];
p('schwache Transite allein sind still oder leise', AC.lautstaerke(schwach, null) <= 1);
p('lautes Kapitel hebt auf Bewegung',
  AC.lautstaerke(schwach, {laut:true}) >= 2,
  'ist ' + AC.lautstaerke(schwach, {laut:true}));
p('leises Kapitel hebt nichts an',
  AC.lautstaerke(schwach, {laut:false}) === AC.lautstaerke(schwach, null));
p('lautes Kapitel senkt starke Transite nicht',
  AC.lautstaerke([{bGewicht:0.9},{bGewicht:0.8},{bGewicht:0.6}], {laut:true}) === 3);
p('ohne Kapitel bleibt die Rechnung wie vorher',
  AC.lautstaerke(schwach) === AC.lautstaerke(schwach, null));

/* Im vollen Blatt muss derselbe Schutz greifen. */
const BlZ = AC.blatt(C, JETZT, Z, tageSeit);
let verletzt = [];
BlZ.bereiche.forEach(b => {
  if(b.kapitel && b.kapitel.laut && b.laut < 2) verletzt.push(b.k);
});
p('kein Bereich mit lautem Kapitel wird still gezeigt', verletzt.length === 0, verletzt.join(','));
p('nurKapitel ist gesetzt, wo das Kapitel allein traegt',
  BlZ.bereiche.every(b => b.nurKapitel === !!(b.kapitel && b.kapitel.laut && AC.lautstaerke(b.laeuft, null) < 2)));
p('Blatt ohne Zeiten hat keine Kapitel',
  AC.blatt(C, JETZT).bereiche.every(b => b.kapitel === null));
/* Mindestens ein Bereich muss ein Kapitel haben — sonst ist die
   Verknüpfung zwischen den beiden Seiten in Wahrheit tot. */
p('die Verknuepfung zur Zeitenseite traegt wirklich',
  BlZ.bereiche.filter(b => b.kapitel).length === 5,
  'nur ' + BlZ.bereiche.filter(b => b.kapitel).length + ' von 5');

/* ── 13. Eichung der Lautstärke ──────────────────────────────
   Vier Stufen taugen nur, wenn sie auch vier verschiedene Dinge
   sagen. Wenn eine Stufe die Hälfte aller Fälle einsammelt, sieht
   jeder Bereich gleich aus und die Anzeige sagt nichts mehr.
   Abgetastet über vier erfundene Charts und zwanzig Jahre. */
const EICH = [ {y:1975,mo:8,d:4,h:14,mi:20}, {y:1962,mo:1,d:17,h:3,mi:5},
               {y:1998,mo:11,d:23,h:19,mi:48}, {y:1984,mo:5,d:9,h:9,mi:0} ];
let zaehler = [0,0,0,0], summe = 0;
EICH.forEach(e => {
  const Ce = chartVon(Object.assign({}, e, {tz:1, lat:52.52, lon:13.405}));
  for(let m=0;m<240;m+=6){
    const jdm = jdFromUT(2020,1,1,12) + m*30.44;
    const Vm = AC.vorgaenge(Ce, jdm);
    AC.BEREICHE.forEach(B => {
      zaehler[ AC.lautstaerke(AC.fuerBereich(Vm, B), null) ]++;
      summe++;
    });
  }
});
const anteil = zaehler.map(z => z/summe);
p('Eichprobe ist gross genug', summe > 1200, 'n=' + summe);
anteil.forEach((a,i) => {
  p('Stufe ' + i + ' kommt oft genug vor', a >= 0.07,
    (100*a).toFixed(1) + '% — unter 7 Prozent ist die Stufe praktisch tot');
  p('Stufe ' + i + ' frisst nicht alles', a <= 0.46,
    (100*a).toFixed(1) + '% — ueber 46 Prozent macht die Anzeige blind');
});
p('die Stufen sind monoton geordnet',
  AC.lautstaerke([{bGewicht:0.1}],null) <= AC.lautstaerke([{bGewicht:1.0}],null) &&
  AC.lautstaerke([{bGewicht:1.0}],null) <= AC.lautstaerke([{bGewicht:1.4}],null) &&
  AC.lautstaerke([{bGewicht:1.4}],null) <= AC.lautstaerke([{bGewicht:0.9},{bGewicht:0.9}],null));

/* Im echten Blatt dürfen nicht alle Bereiche dasselbe sagen. */
let gleich = 0, proben = 0;
EICH.forEach(e => {
  const Ce = chartVon(Object.assign({}, e, {tz:1, lat:52.52, lon:13.405}));
  for(let m=0;m<60;m+=12){
    const B2 = AC.blatt(Ce, jdFromUT(2024,1,1,12) + m*30.44);
    const s = new Set(B2.bereiche.map(b => b.laut));
    proben++;
    if(s.size < 2) gleich++;
  }
});
p('nie sagen alle Bereiche gleichzeitig dasselbe', gleich === 0,
  gleich + ' von ' + proben + ' Stichtagen ohne jede Unterscheidung');

/* ── 14. Die Auswahl der Bereiche ───────────────────────────── */
/* Fehlerklassen, die hier dauerhaft verbaut werden:
   · Ein alter oder verdorbener Speicherstand macht die Seite leer,
     statt "alle" zu bedeuten.
   · Die Felder einer Auswahl werden falsch zusammengelegt, und der
     Monatsbericht beachtet dann die falschen Bereiche.
   · Ein Feld gehört zu keinem Bereich — dann ist es über die
     Auswahl nicht erreichbar, egal was jemand anklickt. */
p('die Liste hat zehn Bereiche', LB && LB.ZAHL === 10, LB ? String(LB.ZAHL) : 'AC_LB fehlt');
p('der Rechner nimmt dieselbe Liste',
  AC.BEREICHE === LB.BEREICHE,
  'der Rechner führt eine eigene Kopie der Bereiche');
p('keine Auswahl heisst alle Felder', LB.felder([]).length === 12);
p('keine Auswahl heisst jeder Bereich ist gewaehlt',
  LB.BEREICHE.every(b => LB.istGewaehlt(b.k, [])));
p('eine Auswahl schliesst andere Bereiche aus',
  LB.istGewaehlt('liebe', ['liebe']) && !LB.istGewaehlt('geld', ['liebe']));
p('unbekannte Schluessel fliegen heraus',
  JSON.stringify(LB.normieren(['liebe', 'nichtdabei', 'geld'])) ===
  JSON.stringify(['liebe', 'geld']),
  JSON.stringify(LB.normieren(['liebe', 'nichtdabei', 'geld'])));
p('nur Unbekanntes bedeutet alle', LB.normieren(['nichtdabei']).length === 0);
p('Doppeltes zaehlt einmal', LB.normieren(['geld', 'geld']).length === 1);
p('die Reihenfolge ist immer die der Liste',
  JSON.stringify(LB.normieren(['umbruch', 'liebe'])) ===
  JSON.stringify(['liebe', 'umbruch']));
p('die Felder einer Auswahl sind die Vereinigung',
  JSON.stringify(LB.felder(['liebe'])) === JSON.stringify([5, 7, 8]),
  JSON.stringify(LB.felder(['liebe'])));
p('zwei Bereiche legen ihre Felder zusammen',
  JSON.stringify(LB.felder(['liebe', 'geld'])) === JSON.stringify([2, 5, 7, 8, 11]),
  JSON.stringify(LB.felder(['liebe', 'geld'])));
p('alle zehn ergeben alle zwoelf Felder',
  LB.felder(LB.BEREICHE.map(b => b.k)).length === 12);
let felderAlle = {};
LB.BEREICHE.forEach(b => {
  p('Bereich ' + b.k + ' hat drei Felder', b.haeuser.length === 3, String(b.haeuser.length));
  p('Bereich ' + b.k + ' hat einen Namen', !!b.name && b.name.length > 2);
  b.haeuser.forEach(h => {
    p('Feld ' + h + ' in ' + b.k + ' liegt zwischen 1 und 12', h >= 1 && h <= 12);
    felderAlle[h] = 1;
  });
  p('Bereich ' + b.k + ' nennt kein Feld zweimal',
    new Set(b.haeuser).size === b.haeuser.length);
});
for(let h = 1; h <= 12; h++)
  p('Feld ' + h + ' gehoert zu mindestens einem Bereich', !!felderAlle[h]);
p('keine zwei Bereiche heissen gleich',
  new Set(LB.BEREICHE.map(b => b.name)).size === 10);
p('keine zwei Bereiche haben denselben Schluessel',
  new Set(LB.BEREICHE.map(b => b.k)).size === 10);

/* ── 16. Widersprüche: gefunden, nicht erfunden ──────────────
   Ein Bereich zieht oft in zwei Richtungen; das gehört in den
   Tiefgang. Gefährlich ist dabei nur eines: ein Widerspruch, den
   die Rechnung nicht hergibt. Geprüft wird deshalb über mehrere
   erfundene Geburtsbilder hinweg, dass jeder Befund an etwas
   Gerechnetem hängt — und dass kein Satz zweimal dasteht. */
const HART_ERLAUBT = { quadrat:1, opposition:1 };
const CHARTS = [
  { y:1954, mo:2,  d:17, h:6,  mi:5,  tz:1, lat:48.14, lon:11.58 },
  { y:1968, mo:11, d:3,  h:19, mi:42, tz:1, lat:53.55, lon:9.99  },
  { y:1975, mo:8,  d:4,  h:14, mi:20, tz:1, lat:52.52, lon:13.405 },
  { y:1981, mo:5,  d:28, h:2,  mi:11, tz:2, lat:50.11, lon:8.68  },
  { y:1993, mo:9,  d:9,  h:23, mi:55, tz:2, lat:51.34, lon:12.37 },
  { y:2001, mo:12, d:21, h:11, mi:30, tz:1, lat:48.78, lon:9.18  }
];
const TAGE = [ jdFromUT(2008, 3, 11, 9), jdFromUT(2026, 10, 23, 12),
               jdFromUT(2031, 7, 1, 20) ];

let widGesamt = 0, widLeer = 0, artenGesehen = {};
CHARTS.forEach((pd, ci) => {
  const Cx = chartVon(pd);
  const jdGeb = jdFromUT(pd.y, pd.mo, pd.d, pd.h + pd.mi/60 - pd.tz);
  const gebDat = new Date(Date.UTC(pd.y, pd.mo-1, pd.d, pd.h - pd.tz, pd.mi));
  TAGE.forEach((jdx, ti) => {
    if(jdx <= jdGeb) return;
    /* Mit den langen Kapiteln rechnen, nicht ohne: sonst bleibt der
       dritte Widerspruch ungeprüft, weil er nie entsteht. Genau so
       war diese Prüfung bis zur ersten absichtlichen Fehlerprobe
       blind. */
    const Zx = AZ.blatt(Cx, jdGeb, gebDat, datVon(jdx));
    const Bl = AC.blatt(Cx, jdx, Zx, jdx - jdGeb);
    Bl.bereiche.forEach(b => {
      const wo = 'Chart ' + (ci+1) + '/Tag ' + (ti+1) + '/' + b.k;
      const wl = b.wid;
      p(wo + ': wid ist eine Liste', Array.isArray(wl));
      if(!Array.isArray(wl)) return;
      widGesamt += wl.length;
      if(!wl.length) widLeer++;
      /* Kein Satz zweimal: zwei Befunde, die denselben Satz
         ergeben, sind für die Leserin ein Widerspruch, nicht zwei.
         Genau so stand bis heute zweimal derselbe Absatz da. */
      /* Und umgekehrt: gehen Rahmen und Abschnitt auseinander, darf
         der Befund nicht fehlen. Ein verschwiegener Widerspruch ist
         dieselbe Unehrlichkeit wie ein erfundener. */
      p(wo + ': ein auseinandergehendes Kapitel wird genannt',
        !!(b.kapitel && b.kapitel.anders) ===
        wl.some(x => x.art === 'kapitel'));
      const saetze = wl.map(x => { const v = TI.widSatz(x); return v ? v.satz : '?'; });
      p(wo + ': kein Widerspruch steht zweimal',
        new Set(saetze).size === saetze.length, saetze.join(' || ').slice(0, 120));
      wl.forEach(x => {
        artenGesehen[x.art] = (artenGesehen[x.art] || 0) + 1;
        const v = TI.widSatz(x);
        p(wo + ': ' + x.art + ' hat einen Satz', !!v && v.satz.length > 40);
        p(wo + ': ' + x.art + ' hat einen Handgriff', !!v && v.tun.length > 25);
        p(wo + ': ' + x.art + ' nennt seine Mechanik', !!v && v.tech.length > 10);
        p(wo + ': ' + x.art + ' lässt keine Lücke offen',
          !!v && !/\{\w+\}/.test(v.satz + v.tun + v.tech),
          v ? v.satz : '');
        if(x.art === 'anlage'){
          /* Beide Punkte müssen in den Feldern dieses Bereichs
             liegen, der Winkel muss hart und innerhalb des Orbs
             sein. Sonst behauptet der Befund etwas. */
          p(wo + ': Anlage liegt in den Feldern des Bereichs',
            b.haeuser.indexOf(x.a.haus) >= 0 && b.haeuser.indexOf(x.b.haus) >= 0,
            x.a.haus + '/' + x.b.haus + ' nicht in ' + b.haeuser);
          p(wo + ': Anlage ist ein harter Winkel', !!HART_ERLAUBT[x.aspekt], x.aspekt);
          p(wo + ': Anlage liegt im Orbis', x.ab <= 6.0001, String(x.ab));
          p(wo + ': Anlage nennt zwei verschiedene Punkte', x.a.p !== x.b.p);
          const d6 = AC.dist(Cx[x.a.p], Cx[x.b.p]);
          p(wo + ': der Winkel stimmt wirklich',
            Math.abs(d6 - (x.aspekt === 'quadrat' ? 90 : 180)) <= 6.0001,
            'Abstand ' + d6.toFixed(2));
        }
        if(x.art === 'kapitel'){
          /* Ein Kapitel-Widerspruch darf nur dastehen, wenn Rahmen
             und Abschnitt wirklich auseinandergehen. Sonst behauptet
             die Datei einen Widerspruch, den die Rechnung nicht hat. */
          p(wo + ': der Kapitel-Widerspruch hängt an der Rechnung',
            !!(b.kapitel && b.kapitel.anders));
        }
        if(x.art === 'zugleich'){
          p(wo + ': zugleich hat zwei verschiedene Vorgänge',
            x.reibend !== x.tragend);
          p(wo + ': der reibende Teil reibt wirklich',
            x.reibend.art === 'spannung' || x.reibend.art === 'gegenueber',
            x.reibend.art);
          p(wo + ': der tragende Teil trägt wirklich',
            x.tragend.art === 'leicht', x.tragend.art);
          p(wo + ': beide laufen in diesem Bereich',
            b.laeuft.indexOf(x.reibend) >= 0 && b.laeuft.indexOf(x.tragend) >= 0);
        }
      });
    });
  });
});
p('über alle Probebilder wird überhaupt ein Widerspruch gefunden',
  widGesamt > 20, String(widGesamt));
p('und es wird nicht überall einer gefunden', widLeer > 5, String(widLeer));
p('die Sorte "anlage" kommt vor', (artenGesehen.anlage || 0) > 0);
p('die Sorte "zugleich" kommt vor', (artenGesehen.zugleich || 0) > 0);
/* Fehlerklasse aus der heutigen Fehlerprobe: eine Prüfung, die nie
   an ihren Fall kommt, ist grün und blind. Die Probebilder müssen
   jede Sorte wirklich hervorbringen, sonst prüft hier niemand. */
p('die Sorte "kapitel" kommt vor — sonst ist ihre Prüfung blind',
  (artenGesehen.kapitel || 0) > 0, JSON.stringify(artenGesehen));

/* ── 17. Der Tiefgang ────────────────────────────────────────
   Dieselbe Rechnung wie der Überblick, zu Ende geschrieben. Er
   muss alle vier zusätzlichen Teile tragen — natale Herkunft,
   Facetten, Widersprüche, Gesprächsfragen —, mehr Facetten zeigen
   als die Seite, und auf Stufe 0 ohne ein einziges Fachwort
   auskommen. Eine Datei, die das Versprechen der Seite bricht,
   wäre schlimmer als keine Datei. */
const JARGON = ['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn',
  'Uranus','Neptun','Pluto','Lilith','Chiron','Haus','Häuser','Hauses',
  'Aspekt','Aspekte','Konjunktion','Opposition','Quadrat','Trigon','Sextil',
  'Orbis','Orben','Transit','Transite','Aszendent','rückläufig','winkelhaft',
  'Radix','Ekliptik','Profektion','Widder','Stier','Zwillinge','Krebs','Löwe',
  'Jungfrau','Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische'];
function jargonIn(s){
  return JARGON.filter(w =>
    new RegExp('(?<![A-Za-zÄÖÜäöüß])' + w + '(?![A-Za-zÄÖÜäöüß])').test(s));
}
const T_TEILE = [BD.TIEF.ueberblickTitel, BD.TIEF.herkunftTitel,
                 BD.TIEF.facettenTitel, BD.TIEF.widTitel, BD.TIEF.fragenTitel];
const FAC_AUF_DER_SEITE = 3;

CHARTS.forEach((pd, ci) => {
  const Cx = chartVon(pd);
  const Bl = AC.blatt(Cx, jdFromUT(2026, 10, 23, 12));
  const wo0 = 'Chart ' + (ci+1);
  [0, 1, 2, 3, 4].forEach(st => {
    const ganz = TI.bauen(Bl.bereiche, { wer:'Probe', stichtag:'' }, st);
    p(wo0 + '/Stufe ' + st + ': der Tiefgang ist nicht leer', ganz.length > 8000,
      String(ganz.length));
    p(wo0 + '/Stufe ' + st + ': keine offene Lücke im Tiefgang',
      !/\{\w+\}/.test(ganz), (ganz.match(/\{\w+\}/) || [''])[0]);
    p(wo0 + '/Stufe ' + st + ': kein undefined im Tiefgang',
      !/undefined|NaN|\[object|null/.test(ganz),
      (ganz.match(/undefined|NaN|\[object|null/) || [''])[0]);
    p(wo0 + '/Stufe ' + st + ': der ehrliche Teil ist dabei',
      ganz.indexOf(BD.TIEF.ehrlichTitel) >= 0 &&
      ganz.indexOf(BD.EHRLICH[0].a) >= 0);
    p(wo0 + '/Stufe ' + st + ': die Grenzen stehen im Fuß',
      ganz.indexOf(BD.TIEF.fuss) >= 0);
    if(st < 2)
      p(wo0 + '/Stufe ' + st + ': kein Fachwort im Tiefgang',
        jargonIn(ganz).length === 0, jargonIn(ganz).join(', '));
    else
      p(wo0 + '/Stufe ' + st + ': ab Stufe 2 steht die Mechanik drin',
        ganz.indexOf('[ ') >= 0);
  });
  Bl.bereiche.forEach(b => {
    const wo = wo0 + '/' + b.k;
    const t0 = TI.bereich(b, 0), t3 = TI.bereich(b, 3);
    T_TEILE.forEach(teil => {
      p(wo + ': Teil "' + teil + '" fehlt nicht', t0.indexOf(teil) >= 0);
    });
    /* Alle Facetten, nicht nur die drei von der Seite. */
    const FA = TI.facetten(b);
    p(wo + ': der Tiefgang zeigt mehr Facetten als die Seite',
      FA.length > FAC_AUF_DER_SEITE, FA.length + ' Facetten');
    FA.forEach(E => {
      p(wo + ': Facette "' + E.f.titel + '" steht im Tiefgang',
        t0.indexOf(E.f.titel) >= 0 && t0.indexOf(E.f.was) >= 0);
    });
    /* Die natale Herkunft: entweder der Schwerpunkt oder der Satz
       über einen unbesetzten Bereich — nie beides, nie keines. */
    const hatVor = t0.indexOf(BD.TIEF.herkunftVor) >= 0;
    const hatLeer = t0.indexOf(BD.LEER.natalLeer) >= 0;
    p(wo + ': die natale Herkunft steht genau einmal da',
      hatVor !== hatLeer, 'Schwerpunkt ' + hatVor + ', unbesetzt ' + hatLeer);
    p(wo + ': der unbesetzte Fall stimmt mit der Rechnung',
      hatLeer === b.natal.leer);
    /* Die Widersprüche: entweder Befunde oder der Satz, dass die
       Rechnung keinen findet. Kein Bereich bleibt stumm, und
       keiner erfindet etwas. */
    const hatKeiner = t0.indexOf(BD.WID.keiner) >= 0;
    p(wo + ': Widerspruch oder das Eingeständnis, keinen zu finden',
      hatKeiner === (b.wid.length === 0));
    /* Die Fragen und die Grenze. */
    const FR = BD.FRAGEN[b.k];
    p(wo + ': der Bereich hat Gesprächsfragen', !!FR);
    if(FR){
      FR.fragen.forEach(f => p(wo + ': Frage steht im Tiefgang', t0.indexOf(f) >= 0));
      p(wo + ': die Grenze steht im Tiefgang', t0.indexOf(FR.grenze) >= 0);
    }
    p(wo + ': auf Stufe 0 kein Fachwort im Bereich',
      jargonIn(t0).length === 0, jargonIn(t0).join(', '));
    p(wo + ': ab Stufe 2 ist der Bereich länger', t3.length > t0.length);
  });
});

/* ── 18. Die Gesprächsfragen ─────────────────────────────────
   Drei Fragen und eine Grenze je Bereich. Fragen, keine Deutungen,
   und nie eine Diagnose — PRODUKT.md Abschnitt 5. */
const DIAGNOSE = ['Diagnose','diagnos','Störung','Syndrom','krank','Krankheit',
  'Depression','depressiv','Trauma','traumat','ADHS','Autismus','autistisch',
  'Burnout','therapieren','behandeln','leidest','Patient','Befund'];
const FRBER = Object.keys(BD.BER || {});
FRBER.forEach(bk => {
  const FR = BD.FRAGEN[bk] || {fragen:[], grenze:''};
  p('Fragen ' + bk + ': vorhanden', !!BD.FRAGEN[bk]);
  p('Fragen ' + bk + ': genau drei', FR.fragen.length === 3, String(FR.fragen.length));
  p('Fragen ' + bk + ': keine zweimal', new Set(FR.fragen).size === 3);
  FR.fragen.forEach((f, i) => {
    p('Fragen ' + bk + '/' + i + ': ist eine Frage', /\?$/.test(f.trim()), f);
    p('Fragen ' + bk + '/' + i + ': lang genug', f.length >= 25, String(f.length));
    p('Fragen ' + bk + '/' + i + ': ohne Fachwort', jargonIn(f).length === 0);
    p('Fragen ' + bk + '/' + i + ': keine Diagnose',
      !DIAGNOSE.some(d => f.indexOf(d) >= 0), f);
  });
  p('Grenze ' + bk + ': vorhanden und lang genug', FR.grenze.length >= 60,
    String(FR.grenze.length));
  p('Grenze ' + bk + ': endet mit Punkt', /\.$/.test(FR.grenze.trim()));
  p('Grenze ' + bk + ': ohne Fachwort', jargonIn(FR.grenze).length === 0,
    jargonIn(FR.grenze).join(', '));
  p('Grenze ' + bk + ': keine Diagnose',
    !DIAGNOSE.some(d => FR.grenze.indexOf(d) >= 0));
});
p('alle zehn Bereiche haben Gesprächsfragen',
  FRBER.length === 10 && FRBER.every(k => !!BD.FRAGEN[k]), String(FRBER.length));
p('keine zwei Bereiche haben dieselbe Grenze',
  new Set(FRBER.map(k => (BD.FRAGEN[k] || {}).grenze)).size === 10);
let alleFragen = [];
FRBER.forEach(k => { alleFragen = alleFragen.concat((BD.FRAGEN[k] || {}).fragen || []); });
p('keine Frage kommt in zwei Bereichen vor',
  new Set(alleFragen).size === alleFragen.length);

/* Der Rahmen der Schublade auf der Seite. Er trägt die Überschrift
   und den Satz, der sagt, dass hier Fragen stehen und keine
   Antworten — ohne ihn liest sich die Schublade wie eine Deutung. */
const RH = BD.FRAGEN.rahmen || {};
p('die Schublade hat eine Überschrift', (RH.titel || '').length >= 20, RH.titel);
p('die Schublade sagt, wofür die Fragen da sind',
  (RH.vor || '').length >= 80, String((RH.vor || '').length));
p('die Schublade sagt, dass die Antworten nicht hier stehen',
  (RH.vor || '').indexOf('Antwort') >= 0);
p('die Schublade kündigt die Grenze an', (RH.grenzeVor || '').length >= 15, RH.grenzeVor);
['titel', 'vor', 'grenzeVor'].forEach(f => {
  p('Rahmen ' + f + ': ohne Fachwort', jargonIn(RH[f] || '').length === 0,
    jargonIn(RH[f] || '').join(', '));
  p('Rahmen ' + f + ': keine Diagnose',
    !DIAGNOSE.some(d => (RH[f] || '').indexOf(d) >= 0));
});

/* ── 19. Zeitspannen und Fenster ─────────────────────────────
   Unter einem Jahr in Monaten oder Wochen, darüber in Jahren —
   nie "17 Monate" neben "1,5 Jahre", und nie ein Dezimalpunkt. */
p('ein Tag', TI.dauer(1) === '1 Tag', TI.dauer(1));
p('drei Tage', TI.dauer(3) === '3 Tage', TI.dauer(3));
p('drei Wochen', TI.dauer(21) === '3 Wochen', TI.dauer(21));
p('vier Monate', /Monate$/.test(TI.dauer(120)), TI.dauer(120));
p('zwölf Monate', TI.dauer(360) === '12 Monate', TI.dauer(360));
p('ein Jahr', TI.dauer(400).indexOf('Jahr') > 0, TI.dauer(400));
p('zwölf Jahre', /Jahre$/.test(TI.dauer(4300)), TI.dauer(4300));
p('abgelaufen', TI.dauer(0) === BD.FORM.laeuftAus, TI.dauer(0));
p('nichts ergibt nichts', TI.dauer(null) === null);
[1, 3, 13, 21, 69, 120, 360, 700, 4300, 9000].forEach(x => {
  const s = TI.dauer(x);
  p('Dauer ' + x + ' Tage ohne Dezimalpunkt', !/\d\.\d/.test(s), s);
  p('Dauer ' + x + ' Tage ohne Lücke', !/\{\w+\}/.test(s), s);
  p('Dauer ' + x + ' Tage nennt nicht zwei Einheiten',
    [/Woche/, /Monat/, /Jahr/, /Tage?\b/].filter(r => r.test(s)).length === 1, s);
});

/* ── 20. tief-bauer.js formuliert nicht selbst ───────────────
   Dieselbe Fehlerklasse wie beim Monatsbericht: ein Satz im
   Bauwerk wird dort nebenbei geändert und von keiner Prüfung
   gelesen. Deshalb stehen alle Sätze in bereich-daten.js. */
const bauerQuelle = fs.readFileSync(path.join(wurzel, 'bereiche/tief-bauer.js'), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^\s*\/\/.*$/gm, ' ');
const satzImBauer = [];
(bauerQuelle.match(/'((?:[^'\\\n]|\\.)*)'/g) || []).forEach(lit => {
  const rein = lit.slice(1, -1).replace(/\\u[0-9a-f]{4}/gi, ' ');
  if((rein.match(/[A-Za-zÄÖÜäöüß]{3,}/g) || []).length >= 3) satzImBauer.push(lit);
});
p('kein Satz in tief-bauer.js', satzImBauer.length === 0,
  satzImBauer.slice(0, 3).join(' | '));

/* ── 15. Keine echten Geburtsdaten in dieser Datei ──────────── */
const selbst = fs.readFileSync(__filename, 'utf8');
p('keine echten Geburtsdaten in der Pruefdatei',
  !/\b1987\b/.test(selbst) && !/\b08:58\b/.test(selbst));

/* ── Ergebnis ───────────────────────────────────────────────── */
console.log('');
if(fehler.length){
  console.log('FEHLER (' + fehler.length + ' von ' + (ok+fehler.length) + '):');
  fehler.forEach(f => console.log('  ✗ ' + f));
  process.exit(1);
}
console.log('✓ ' + ok + ' Prüfungen bestanden.');
