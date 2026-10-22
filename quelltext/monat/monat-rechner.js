/* ───────────────────────────────────────────────────────────────
   monat-rechner.js — der Monatsbericht: was in einem Monat läuft.

   Baut auf rituale/engine.js auf (jdFromUT, lon, haus). Es gibt
   genau eine Himmelsrechnung, und die steht dort. Hier wird
   nichts am Himmel neu gerechnet, sondern das Vorhandene auf
   einen Kalendermonat bezogen.

   Diese Datei kennt keinen einzigen Satz. Sie liefert Zahlen und
   Schlüssel; die Sätze stehen in monat-daten.js, die Anzeige in
   monat-app.js.

   Alle Namen mit m bzw. M_ davor, damit nichts mit der Engine
   kollidiert.
   ─────────────────────────────────────────────────────────────── */
(function(){
'use strict';

function mnrm(x){ x=x%360; return x<0?x+360:x; }
function mdist(a,b){ var d=Math.abs(mnrm(a-b)); return d>180?360-d:d; }

/* Die langsamen Bewegungen. Nur sie prägen einen ganzen Monat —
   was in drei Tagen vorbei ist, gehört auf die Bereichsseite. */
var M_WANDERER = ['Jupiter','Saturn','Uranus','Neptun','Pluto'];

/* Die natalen Punkte, die ein Monatsbericht überhaupt anfasst. */
var M_PUNKTE = ['Sonne','Mond','ASC','MC','Venus','Mars','Merkur'];

/* Die Winkel, in der Reihenfolge ihrer Deutlichkeit. */
var M_WINKEL = [
  { k:'trifft',     grad:0,   art:'hart'  },
  { k:'fordert',    grad:90,  art:'hart'  },
  { k:'gegenueber', grad:180, art:'hart'  },
  { k:'traegt',     grad:120, art:'weich' },
  { k:'hilft',      grad:60,  art:'weich' }
];

/* Enger Orbis: ein Monatsbericht soll wenig und Deutliches nennen. */
var M_ORBIS   = 1.5;
var M_SCHRITT = 2;        /* Tage je Abtastung */

/* ── Der Kalender ───────────────────────────────────────────── */

/* Tage im Monat. mon ist 0 bis 11, wie bei Date. Tag 0 des
   Folgemonats ist der letzte Tag dieses Monats. */
function mTageImMonat(jahr, mon){
  return new Date(Date.UTC(jahr, mon + 1, 0)).getUTCDate();
}

/* Julianisches Datum zur Mittagsstunde eines Tages im Monat. */
function mMonatJD(jahr, mon, tag){
  return jdFromUT(jahr, mon + 1, tag, 12);
}

/* Welcher Monat liegt um versatz Monate nach dem Stichtag. */
function mMonatVon(jetzt, versatz){
  var d = new Date(Date.UTC(jetzt.getUTCFullYear(),
                            jetzt.getUTCMonth() + versatz, 1));
  return { jahr:d.getUTCFullYear(), mon:d.getUTCMonth() };
}

/* ── Der Schwerpunkt ────────────────────────────────────────── */

/* Das natale Haus, durch das die Sonne in der Monatsmitte läuft.
   Ein Haus, nicht zwei: der Bericht nennt einen Schwerpunkt. */
function mSchwerpunkt(P, jahr, mon){
  var mitte = mMonatJD(jahr, mon, Math.ceil(mTageImMonat(jahr, mon) / 2));
  return haus(P, lon('Sonne', mitte));
}

/* Welche der natalen Punkte in einem bestimmten Haus stehen.
   Reihenfolge wie in M_PUNKTE, damit derselbe Mensch zweimal
   dieselbe Aufzählung bekommt. Das ist die Antwort auf die Frage,
   was bei DIESEM Menschen in dem Bereich liegt, auf den der Monat
   zeigt — bei den meisten liegt dort nichts, und auch das ist eine
   Aussage über ihn. */
function mBewohner(P, h){
  return M_PUNKTE.filter(function(r){
    return P[r] !== undefined && haus(P, P[r]) === h;
  });
}

/* ── Die Treffer ────────────────────────────────────────────── */

/* Höchstens ein Eintrag je Paar aus Wanderer und natalem Punkt:
   der engste Winkel, den das Paar im Monat erreicht. Dadurch kann
   derselbe Vorgang nicht mehrfach im Bericht stehen.
   Sortiert nach Enge — der deutlichste zuerst.

   Jeder Treffer trägt hausNatal: das natale Haus, in dem der
   getroffene Punkt steht. Erst damit kann der Bericht sagen, welche
   Anlage dieses Menschen getroffen ist und wo sie bei ihm liegt —
   ohne das ist jeder Monatsbericht für jeden derselbe. */
/* felder ist die Liste der natalen Häuser, die diesen Menschen
   interessieren — die Bereiche, die er gewählt hat, in Feldern
   ausgedrückt. Treffer darin stehen vorn; die anderen bleiben
   dahinter stehen, statt verschwiegen zu werden. Ohne felder
   bleibt die Reihenfolge die alte: der engste Winkel zuerst. */
function mInFeldern(x, felder){
  return !felder || !felder.length || felder.indexOf(x.hausNatal) >= 0;
}

function mTreffer(P, jahr, mon, felder){
  var tage = mTageImMonat(jahr, mon), jdA = mMonatJD(jahr, mon, 1), out = [];
  M_WANDERER.forEach(function(w){
    M_PUNKTE.forEach(function(r){
      if(P[r] === undefined) return;
      var best = null;
      for(var d = 0; d < tage; d += M_SCHRITT){
        var s = mdist(lon(w, jdA + d), P[r]);
        M_WINKEL.forEach(function(k){
          var o = Math.abs(s - k.grad);
          if(o <= M_ORBIS && (best === null || o < best.orbis))
            best = { wanderer:w, punkt:r, winkel:k.grad, k:k.k,
                     art:k.art, orbis:o, tag:d + 1,
                     hausNatal:haus(P, P[r]) };
        });
      }
      if(best) out.push(best);
    });
  });
  return out.sort(function(a,b){
    /* Erst die gewählten Bereiche, dann der Rest. Innerhalb beider
       Gruppen bleibt es bei der Enge des Winkels. */
    var fa = mInFeldern(a, felder), fb = mInFeldern(b, felder);
    if(fa !== fb) return fa ? -1 : 1;
    if(a.orbis !== b.orbis) return a.orbis - b.orbis;
    /* Gleich eng: feste Reihenfolge, damit derselbe Monat beim
       zweiten Aufruf denselben Bericht ergibt. */
    return (a.wanderer + a.punkt < b.wanderer + b.punkt) ? -1 : 1;
  });
}

/* ── Neu- und Vollmond ──────────────────────────────────────── */

/* Der Abstand zwischen Mond und Sonne, 0 bis 360 Grad. */
function mPhase(jd){ return mnrm(lon('Mond', jd) - lon('Sonne', jd)); }

/* Der Augenblick, in dem der Abstand genau durch ziel geht —
   zwischen zwei Mittagsstunden halbiert.

   Ohne diese Verfeinerung nennt der Bericht den Tag, an dem der
   Durchgang schon vorbei war: bis zu einen Tag zu spät. Ein Datum,
   das an einen Menschen geht, darf nicht um einen Tag danebenliegen. */
function mGenau(jdVor, jdNach, ziel){
  function f(jd){ return mnrm(mPhase(jd) - ziel + 180) - 180; }
  var a = jdVor, b = jdNach, fa = f(a);
  for(var i = 0; i < 40; i++){
    var m = (a + b) / 2, fm = f(m);
    if(fa * fm <= 0){ b = m; } else { a = m; fa = fm; }
  }
  return (a + b) / 2;
}

/* Neu- und Vollmonde im Monat, mit dem natalen Haus, in dem sie
   stehen. Zwei Dinge sind hier wichtig:

   · Die Schleife läuft über die wirklichen Tage des Monats und einen
     darüber hinaus — sonst fällt ein Durchgang am Abend des letzten
     Tages durch jedes Raster.
   · Gezählt wird der Tag des genauen Augenblicks, und nur, wenn er
     wirklich in diesem Monat liegt. */
function mLunationen(P, jahr, mon){
  var tage = mTageImMonat(jahr, mon), jdA = mMonatJD(jahr, mon, 1);
  var out = [], gesehen = {};
  for(var d = 0; d <= tage; d++){
    var jd = jdA + d, vor = mPhase(jd - 1), ph = mPhase(jd), art = null, ziel = 0;
    if(vor > 270 && ph < 90){ art = 'neumond'; ziel = 0; }
    else if(vor < 180 && ph >= 180){ art = 'vollmond'; ziel = 180; }
    if(!art) continue;
    var genau = mGenau(jd - 1, jd, ziel), dt = datVon(genau);
    if(dt.getUTCFullYear() !== jahr || dt.getUTCMonth() !== mon) continue;
    var k = art + dt.getUTCDate();
    if(gesehen[k]) continue;
    gesehen[k] = 1;
    out.push({ art:art, tag:dt.getUTCDate(), stunde:dt.getUTCHours(),
               haus:haus(P, lon('Mond', genau)) });
  }
  return out.sort(function(a, b){ return a.tag - b.tag; });
}

/* ── Der ganze Monat ────────────────────────────────────────── */

function mBericht(P, jahr, mon, felder){
  var schwer = mSchwerpunkt(P, jahr, mon);
  var tr = mTreffer(P, jahr, mon, felder);
  return {
    jahr: jahr,
    mon: mon,
    tage: mTageImMonat(jahr, mon),
    schwerpunkt: schwer,
    bewohner: mBewohner(P, schwer),
    treffer: tr,
    /* Wie viele der laufenden Vorgänge in den gewählten Bereichen
       liegen. Daran entscheidet der Brief, ob er sagt, dass er
       nach der Auswahl sortiert — oder dass darin nichts läuft. */
    inWahl: tr.filter(function(x){ return mInFeldern(x, felder); }).length,
    felder: (felder && felder.length) ? felder.slice() : [],
    lunationen: mLunationen(P, jahr, mon)
  };
}

window.AC_MONAT = {
  WANDERER:M_WANDERER, PUNKTE:M_PUNKTE, WINKEL:M_WINKEL,
  ORBIS:M_ORBIS, SCHRITT:M_SCHRITT,
  nrm:mnrm, dist:mdist,
  tageImMonat:mTageImMonat, monatJD:mMonatJD, monatVon:mMonatVon,
  phase:mPhase, genau:mGenau,
  schwerpunkt:mSchwerpunkt, bewohner:mBewohner, inFeldern:mInFeldern,
  treffer:mTreffer, lunationen:mLunationen,
  bericht:mBericht
};

})();
