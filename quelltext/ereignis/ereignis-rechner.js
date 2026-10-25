/* Astro-Charlie · Ereignisse lesen — die Mechanik.
   Setzt aus Bausteinen einen Satz zusammen, stufengerecht.
   Weiß nichts vom Himmel und nichts von der Anzeige. */
(function(){
'use strict';

var PLANETEN = ['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];
var ZEICHEN  = ['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion',
                'Schütze','Steinbock','Wassermann','Fische'];
var ASPEKTE  = ['Konjunktion','Sextil','Quadrat','Trigon','Opposition'];

/* Alltagssprache als eigene Quelle — damit die Seite auch dann
   ohne Fachwort auskommt, wenn wortwahl.js nicht geladen ist. */
var P0 = { Sonne:'dein Wesenskern', Mond:'dein Gefühl', Merkur:'dein Denken',
  Venus:'deine Zuneigung', Mars:'dein Antrieb', Jupiter:'dein Vertrauen',
  Saturn:'deine Struktur', Uranus:'dein Freiheitsdrang', Neptun:'deine Sehnsucht',
  Pluto:'deine Tiefe' };
var P1 = { Sonne:'deine Sonne', Mond:'dein Mond', Merkur:'dein Merkur', Venus:'deine Venus',
  Mars:'dein Mars', Jupiter:'dein Jupiter', Saturn:'dein Saturn', Uranus:'dein Uranus',
  Neptun:'dein Neptun', Pluto:'dein Pluto' };
var Z0 = ['direkt und ohne Umweg','langsam und beharrlich','beweglich und neugierig',
  'vorsichtig und schützend','sichtbar und großzügig','genau und prüfend',
  'abwägend, über das Gegenüber','tief und unbedingt','weit und meinungsstark',
  'ernst und geduldig','eigensinnig und quer','durchlässig und mitfühlend'];
var H0 = ['bei dir selbst und deinem Auftreten','bei Geld und Selbstwert',
  'bei Nachrichten und kurzen Wegen','zu Hause und bei der Herkunft',
  'in Romantik, Spiel und allem Kreativen','im Alltag, in der Arbeit und am Körper',
  'in festen Beziehungen','in der Tiefe und beim geteilten Geld',
  'in der Ferne und bei dem, was du glaubst','bei Berufung und Lebensrichtung',
  'bei Freundschaften und in Gruppen','im Verborgenen und im Rückzug'];
var A0 = ['verschmilzt damit','bietet sich dort an','reibt daran','fließt dort mit','steht dem gegenüber'];
var A1 = ['Konjunktion — verschmolzen','Sextil — angeboten','Quadrat — reibend',
  'Trigon — fließend','Opposition — gespiegelt'];

/* ── Lautstärke aus dem Orbis ──────────────────────────── */
var STUFEN_ORB = [
 { bis:0.5, k:3, n:'Volltreffer',  t:'Man merkt es, ohne nachzusehen.' },
 { bis:1.0, k:3, n:'sehr eng',     t:'Verlässlich. Hier darf man etwas sagen.' },
 { bis:2.0, k:2, n:'eng',          t:'Deutlich. Bei langsamen Planeten die übliche Grenze.' },
 { bis:3.0, k:1, n:'spürbar',      t:'Gilt für die schnellen Planeten. Bei langsamen schon dünn.' },
 { bis:99,  k:0, n:'Hintergrund',  t:'Nicht mehr als einzelne Aussage benutzen.' }
];
function laut(orbis){
  for(var i=0;i<STUFEN_ORB.length;i++) if(orbis<=STUFEN_ORB[i].bis) return STUFEN_ORB[i];
  return STUFEN_ORB[STUFEN_ORB.length-1];
}

/* ── Abgeleitete Häuser ────────────────────────────────── */
function abgeleitet(hausDerPerson, gesuchtesHaus){
  var h = ((hausDerPerson-1 + gesuchtesHaus-1) % 12) + 1;
  return h;
}

/* ── Zahl mit Komma, nie mit Punkt ─────────────────────── */
function komma(x, stellen){
  return Number(x).toFixed(stellen===undefined?1:stellen).replace('.', ',');
}

/* ── Der Satz ──────────────────────────────────────────── */
function satz(w, stufe){
  var pi = PLANETEN.indexOf(w.planet), zi = w.zeichen, hi = w.haus, ai = w.aspekt;
  var L = laut(w.orbis);
  if(pi < 0) pi = 0;

  if(stufe <= 0){
    return gross(P0[PLANETEN[pi]]) + ' geht gerade ' + Z0[zi] + ' vor, und zwar '
         + H0[hi] + '. Etwas anderes ' + A0[ai] + '. ' + L.t;
  }
  if(stufe === 1){
    return gross(P1[PLANETEN[pi]]) + ' steht ' + Z0[zi] + ' (' + ZEICHEN[zi] + ') '
         + H0[hi] + ' — im ' + (hi+1) + '. Haus. Die Verbindung: '
         + A1[ai] + '. ' + gross(L.n) + '.';
  }
  var g = (stufe >= 3) ? (', Orbis ' + komma(w.orbis, 1) + '°') : '';
  return PLANETEN[pi] + ' in ' + ZEICHEN[zi] + ', ' + (hi+1) + '. Haus — '
       + ASPEKTE[ai] + g + '. ' + gross(L.n) + ': ' + L.t;
}

/* Die Zerlegung in die fünf Bausteine, stufengerecht benannt */
function zerlegung(w, stufe){
  var L = laut(w.orbis);
  var fach = stufe >= 2;
  return [
   { nr:1, frage:'WAS',       wert: fach ? PLANETEN[PLANETEN.indexOf(w.planet)] : P0[w.planet] },
   { nr:2, frage:'WIE',       wert: fach ? ZEICHEN[w.zeichen] : Z0[w.zeichen] },
   { nr:3, frage:'WO',        wert: fach ? ((w.haus+1) + '. Haus') : H0[w.haus] },
   { nr:4, frage:'WIE STARK', wert: fach ? ASPEKTE[w.aspekt] : A0[w.aspekt] },
   { nr:5, frage:'WANN',      wert: fach ? ('Orbis ' + komma(w.orbis,1) + '° — ' + L.n) : L.n }
  ];
}

function gross(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

/* Die Werte des Reglers. Der Startwert MUSS einer davon sein, sonst zeigt
   die Auswahl etwas anderes an als der Satz sagt. Geprüft in _test-ereignis.js. */
var ORBWERTE = [0.2, 0.5, 1.0, 2.0, 3.0, 4.5];
var START = { planet:'Venus', zeichen:1, haus:4, aspekt:2, orbis:1.0 };

function zufall(){
  var r = function(n){ return Math.floor(Math.random()*n); };
  return { planet: PLANETEN[r(PLANETEN.length)], zeichen: r(12), haus: r(12),
           aspekt: r(5), orbis: ORBWERTE[r(ORBWERTE.length)] };
}

window.AC_EREIGR = {
  PLANETEN:PLANETEN, ZEICHEN:ZEICHEN, ASPEKTE:ASPEKTE,
  H0:H0, A1:A1, STUFEN_ORB:STUFEN_ORB, ORBWERTE:ORBWERTE, START:START,
  laut:laut, abgeleitet:abgeleitet, satz:satz, zerlegung:zerlegung,
  zufall:zufall, komma:komma
};
})();
