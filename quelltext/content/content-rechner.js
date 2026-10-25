/* ───────────────────────────────────────────────────────────────
   content-rechner.js — rechnet die Wochenlage für Beiträge.

   Läuft in node, nicht im Browser:  node content/content-rechner.js
   Gibt JSON auf die Standardausgabe. mach-content.py macht daraus
   die fertigen Entwürfe.

   Grundgedanke: Ein Beitrag darf nichts behaupten, was die Plattform
   nicht auch sagt. Deshalb kommen die Texte aus denselben Dateien —
   bereiche/bereich-daten.js — und die Rechnung aus derselben Engine.

   Ohne Geburtsdaten gibt es keine natalen Punkte. Was ohne sie geht,
   ist die Häuserlage nach Aszendent: Wer wann welchen Aszendenten
   hat, bei dem fällt ein Durchgang in ein anderes Lebensfeld. Genau
   das ist das Format „nach Aszendent" — und es ist ehrlich, weil es
   nichts über die Person behauptet, was man nicht ausrechnen kann.
   ─────────────────────────────────────────────────────────────── */
'use strict';
const fs = require('fs'), path = require('path');
const wurzel = path.join(__dirname, '..');

function laden(dateien){
  const code = dateien.map(f => fs.readFileSync(path.join(wurzel, f), 'utf8')).join('\n;\n');
  const f = new Function('window', 'console', 'document', code +
    '\n;return {window:window, lon:lon, jdFromUT:jdFromUT, datVon:datVon, rueck:rueck};');
  const fensterAttrappe = {};
  /* ritual.js und himmel.js fassen beim Laden nichts im Dokument an,
     brauchen aber ein Objekt, das es gibt. */
  const docAttrappe = { addEventListener(){}, getElementById(){ return null; },
                        querySelectorAll(){ return []; }, readyState:'complete' };
  return f(fensterAttrappe, console, docAttrappe);
}

/* lebensbereiche.js muss vor bereich-rechner.js stehen: der Rechner
   liest die Liste der Bereiche beim Laden aus window.AC_LB. Fehlt sie,
   ist AC_BER.BEREICHE leer, und jeder Bereich im Entwurf wird leer —
   ohne dass etwas abstürzt. Darum prüft `pflicht` unten nach. */
const U = laden(['rituale/engine.js', 'rituale/ritual.js',
                 'bereiche/lebensbereiche.js',
                 'bereiche/bereich-rechner.js', 'bereiche/bereich-daten.js']);
const AC   = U.window.AC_BER;
const DAT  = U.window.AC_BDAT;
const BOARD= U.window.AC_BOARD;
const { lon, jdFromUT, datVon, rueck } = U;

/* ── Pflichtvorrat ───────────────────────────────────────────
   Wenn eine der Quelldateien umgebaut wird und eine Liste
   anderswo landet, bleibt hier eine leere Liste übrig. Der
   Entwurf entsteht dann trotzdem — nur ohne Inhalt. Das ist die
   Fehlerklasse, die einmal durchgegangen ist. Also: früh und
   laut abbrechen, statt still leere Beiträge zu schreiben. */
function pflicht(name, liste){
  if(!Array.isArray(liste) || !liste.length){
    console.error(`content-rechner.js: ${name} ist leer. Wahrscheinlich ` +
      'lädt die Liste in `laden([...])` nicht mehr mit — prüfe, welche ' +
      'Datei window.AC_LB, window.AC_BER bzw. window.AC_BDAT setzt.');
    process.exit(1);
  }
}
pflicht('AC_BER.BEREICHE', AC && AC.BEREICHE);
pflicht('AC_BDAT.EHRLICH', DAT && DAT.EHRLICH);
if(DAT && AC) for(const B of AC.BEREICHE){
  const T = DAT.BER[B.k];
  if(!T || !T.frage || !T.worum || !T.meistern){
    console.error(`content-rechner.js: zum Bereich „${B.k}" fehlen Texte in AC_BDAT.BER.`);
    process.exit(1);
  }
}

const ZEICHEN = ['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau',
                 'Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische'];
const MONAT = ['Januar','Februar','März','April','Mai','Juni','Juli',
               'August','September','Oktober','November','Dezember'];

function nrm(x){ x=x%360; return x<0?x+360:x; }
function zeichenVon(l){ return Math.floor(nrm(l)/30); }

/* Welches Haus trifft eine Länge bei gegebenem Aszendenten-Zeichen?
   Whole Sign: das Zeichen des Aszendenten ist das erste Haus. */
function hausBei(ascZeichen, l){
  return ((zeichenVon(l) - ascZeichen) % 12 + 12) % 12 + 1;
}

/* Welcher Lebensbereich gehört zu einem Haus?
   Erst der, dessen Kernhaus es ist. Sonst der, bei dem das Haus am
   weitesten vorn in der eigenen Liste steht — denn diese Reihenfolge
   ist in lebensbereiche.js Absicht: das erste Feld ist das Kernfeld.
   Vorher wurde einfach der erste Bereich der Gesamtliste genommen,
   der das Haus irgendwo führt. Das ist aber die Reihenfolge der
   Datei, keine Aussage über das Haus: Haus 12 landete damit bei
   „Gesundheit" (dort an dritter Stelle) statt bei „Umbruch" (dort an
   zweiter) — nur weil Gesundheit in der Datei weiter oben steht. */
function bereichZuHaus(h){
  const L = AC.BEREICHE;
  for(const B of L) if(B.haeuser[0] === h) return B;
  let beste = null, besterRang = 99;
  for(const B of L){
    const i = B.haeuser.indexOf(h);
    if(i >= 0 && i < besterRang){ besterRang = i; beste = B; }
  }
  return beste;
}

/* Jedes Haus muss bei einem Bereich landen — sonst steht im Karussell
   für einen Aszendenten nichts. */
for(let h = 1; h <= 12; h++){
  if(!bereichZuHaus(h)){
    console.error(`content-rechner.js: zu Haus ${h} gehört kein Lebensbereich.`);
    process.exit(1);
  }
}

function datum(jd){
  const d = datVon(jd);
  return { tag:d.getUTCDate(), monat:MONAT[d.getUTCMonth()], jahr:d.getUTCFullYear(),
           kurz:`${d.getUTCDate()}. ${MONAT[d.getUTCMonth()]}`,
           iso:d.toISOString().slice(0,10) };
}

/* ── Jetzt ──────────────────────────────────────────────────── */
const n = new Date();
const jd = jdFromUT(n.getUTCFullYear(), n.getUTCMonth()+1, n.getUTCDate(),
                    n.getUTCHours() + n.getUTCMinutes()/60);

/* ── 1 · Wo die langsamen Wanderer stehen ───────────────────── */
const LANGSAM = ['Jupiter','Saturn','Uranus','Neptun','Pluto'];
const stand = LANGSAM.map(k => {
  const l = lon(k, jd), z = zeichenVon(l);
  /* Wann verlässt er dieses Zeichen? */
  let ende = null;
  for(let t = jd; t < jd + 8000; t += 5){
    if(zeichenVon(lon(k, t)) !== z){ ende = t; break; }
  }
  return { planet:k, zeichen:z, zeichenName:ZEICHEN[z],
           rueck:rueck(k, jd),
           bis: ende ? datum(ende) : null,
           tageNoch: ende ? Math.round(ende - jd) : null };
});

/* ── 2 · Was diese Woche ein Datum hat ──────────────────────── */
const lunationen = (BOARD.lunationen(jd, jd + 16) || []).map(l => {
  const ml = lon('Mond', l.jd), z = zeichenVon(ml);
  return { art:l.art, jd:l.jd, zeichen:z, zeichenName:ZEICHEN[z], datum:datum(l.jd) };
});
const stationen = (BOARD.stationen(jd, 16) || []).map(s => {
  const z = zeichenVon(s.lon);
  return { planet:s.planet, direkt:s.direkt, jd:s.jd,
           zeichen:z, zeichenName:ZEICHEN[z], datum:datum(s.jd) };
});

/* ── 3 · Dasselbe, für jeden Aszendenten übersetzt ───────────
   Das ist der eigentliche Inhalt: zwölf Fassungen einer Lage. */
function nachAszendent(l){
  return ZEICHEN.map((asz, i) => {
    const h = hausBei(i, l), B = bereichZuHaus(h);
    const T = B ? DAT.BER[B.k] : null;
    return { aszendent:asz, haus:h,
             bereich: B ? B.name : null,
             bereichK: B ? B.k : null,
             worum: T ? T.worum : null,
             dauerthema: T ? T.meistern : null };
  });
}

/* Der stärkste Vorgang der Woche — nach dieser Rangfolge:
   ein Wendepunkt schlägt eine Lunation, eine Lunation schlägt
   den reinen Dauerstand. */
let aufhaenger = null;
if(stationen.length){
  const s = stationen[0];
  aufhaenger = {
    art:'station', planet:s.planet, datum:s.datum,
    zeichenName:s.zeichenName, direkt:s.direkt,
    was: DAT.WAND[s.planet] ? DAT.WAND[s.planet].was : '',
    tun: DAT.WAND[s.planet] ? DAT.WAND[s.planet].tun : '',
    nutzen: DAT.WAND[s.planet] ? DAT.WAND[s.planet].nutzen : '',
    proAszendent: nachAszendent(lon(s.planet, s.jd))
  };
} else if(lunationen.length){
  const l = lunationen[0];
  aufhaenger = {
    art:'lunation', mondart:l.art, datum:l.datum, zeichenName:l.zeichenName,
    proAszendent: nachAszendent(lon('Mond', l.jd))
  };
} else {
  const s = stand[0];
  aufhaenger = {
    art:'stand', planet:s.planet, zeichenName:s.zeichenName, bis:s.bis,
    was: DAT.WAND[s.planet] ? DAT.WAND[s.planet].was : '',
    tun: DAT.WAND[s.planet] ? DAT.WAND[s.planet].tun : '',
    nutzen: DAT.WAND[s.planet] ? DAT.WAND[s.planet].nutzen : '',
    proAszendent: nachAszendent(lon(s.planet, jd))
  };
}

/* ── 4 · Die Bereiche als Dauervorrat ────────────────────────
   Unabhängig von der Woche: zehn Themen, die immer gehen. */
const bereiche = AC.BEREICHE.map(B => {
  const T = DAT.BER[B.k];
  return { k:B.k, name:B.name, frage:T.frage, worum:T.worum,
           dauerthema:T.meistern, haeuser:B.haeuser };
});

/* ── 5 · Die ehrlichen Sätze ─────────────────────────────────
   Das Material, aus dem die stärksten Beiträge werden. */
const ehrlich = DAT.EHRLICH.map(e => ({ frage:e.f, antwort:e.a }));

const woche = (() => {
  const d = new Date(n.getTime());
  const start = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const nr = Math.ceil((((d - start) / 86400000) + start.getUTCDay() + 1) / 7);
  return `${d.getUTCFullYear()}-KW${String(nr).padStart(2, '0')}`;
})();

console.log(JSON.stringify({
  erzeugt: n.toISOString().slice(0, 16).replace('T', ' '),
  woche, stand, lunationen, stationen, aufhaenger, bereiche, ehrlich
}, null, 1));
