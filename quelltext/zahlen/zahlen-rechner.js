/* Astro-Charlie · Zahlen — die Rechnung
   Alles, was auf dieser Seite gerechnet wird, steht hier. Getrennt von den
   Texten, damit man es nachrechnen und prüfen kann.

   Zwei Buchstabentafeln (pythagoräisch und chaldäisch), drei Wege zur
   Lebenszahl, Namenszahlen, persönliches Jahr, Hausnummern.
   Namen mit Z_ davor, damit nichts mit der astronomischen Engine kollidiert. */
(function(){
'use strict';

/* ── Buchstabentafeln ────────────────────────────────────────
   Pythagoräisch: A–Z laufen glatt durch 1–9 und fangen wieder bei 1 an.
   Chaldäisch: nach Klanggruppen verteilt, die 9 bleibt frei — sie gilt
   in dieser Schule als heilig und wird keinem Buchstaben zugeordnet. */
var Z_PYTH = {};
'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function(c,i){ Z_PYTH[c]=(i%9)+1; });

var Z_CHALD = {A:1,I:1,J:1,Q:1,Y:1, B:2,K:2,R:2, C:3,G:3,L:3,S:3,
               D:4,M:4,T:4, E:5,H:5,N:5,X:5, U:6,V:6,W:6, O:7,Z:7, F:8,P:8};

var Z_VOKALE = 'AEIOU';

/* ── Umlaute: hier sind die Schulen sich nicht einig ─────────
   „direkt"  — Ä wird wie A gezählt (im deutschsprachigen Raum üblich)
   „umschrift" — Ä wird zu AE, also zwei Buchstaben, zwei Zahlen
   Beides wird gerechnet; die Seite zeigt, wenn es einen Unterschied macht. */
function zNorm(s, art){
  s = String(s||'').toUpperCase();
  if(art==='umschrift'){
    s = s.replace(/Ä/g,'AE').replace(/Ö/g,'OE').replace(/Ü/g,'UE').replace(/ß/g,'SS');
  }else{
    s = s.replace(/Ä/g,'A').replace(/Ö/g,'O').replace(/Ü/g,'U').replace(/ß/g,'S');
  }
  s = s.replace(/[ÀÁÂÃÅĀĂ]/g,'A').replace(/[ÈÉÊË]/g,'E').replace(/[ÌÍÎÏ]/g,'I')
       .replace(/[ÒÓÔÕØ]/g,'O').replace(/[ÙÚÛ]/g,'U').replace(/[ÝŸ]/g,'Y')
       .replace(/Ç/g,'C').replace(/Ñ/g,'N').replace(/Ł/g,'L').replace(/Đ/g,'D');
  return s.replace(/[^A-Z ]/g,'');
}
function zHatUmlaut(s){ return /[ÄÖÜäöüß]/.test(String(s||'')); }

/* ── Reduzieren ──────────────────────────────────────────────
   Auf eine Stelle zusammenziehen. Mit meister=true bleiben 11, 22 und 33
   stehen, statt weiter zu 2, 4 und 6 zu werden. */
function zRed(n, meister){
  n = Math.abs(Math.round(n||0));
  while(n > 9){
    if(meister && (n===11 || n===22 || n===33)) return n;
    n = zZiffernsumme(n);
  }
  return n;
}
function zZiffernsumme(n){
  var s=0; n=Math.abs(Math.round(n||0));
  while(n>0){ s += n%10; n = Math.floor(n/10); }
  return s;
}
/* Der ganze Weg, nicht nur das Ergebnis — für die Darstellung der Kette */
function zKette(n, meister){
  var k=[Math.abs(Math.round(n||0))], w=k[0], schutz=0;
  while(w > 9 && schutz++ < 12){
    if(meister && (w===11 || w===22 || w===33)) break;
    w = zZiffernsumme(w); k.push(w);
  }
  return k;
}
function zIstMeister(n){ return n===11 || n===22 || n===33; }

/* ── Lebenszahl: drei Wege ───────────────────────────────────
   summe  — alle Ziffern des Datums in einen Topf
   teile  — Tag, Monat, Jahr je einzeln zusammenziehen, dann addieren,
            Meisterzahlen in den Teilen bleiben stehen
   streng — wie teile, aber die Teile werden bis auf eine Stelle reduziert

   Das Ergebnis auf eine Stelle ist bei allen drei immer dasselbe: eine
   Ziffernsumme ändert den Wert modulo 9 nicht. Unterschiede gibt es nur
   dort, wo ein Weg auf 11, 22 oder 33 landet und ein anderer daran
   vorbeiläuft. zLebenszahl gibt deshalb alle drei zurück. */
function zLebenszahl(d, mo, y){
  var alle = zZiffernsumme(d) + zZiffernsumme(mo) + zZiffernsumme(y);
  var summe = zRed(alle, true);

  var tT = zRed(d, true), tM = zRed(mo, true), tJ = zRed(y, true);
  var teile = zRed(tT + tM + tJ, true);

  var sT = zRed(d, false), sM = zRed(mo, false), sJ = zRed(y, false);
  var streng = zRed(sT + sM + sJ, true);

  var werte = [summe, teile, streng];
  return {
    summe: summe, teile: teile, streng: streng,
    einig: (summe===teile && teile===streng),
    stelle: zRed(alle, false),          /* die eine Ziffer — immer eindeutig */
    kette: zKette(alle, true),
    rohsumme: alle,
    teilwerte: {tag:tT, monat:tM, jahr:tJ},
    strengwerte: {tag:sT, monat:sM, jahr:sJ},
    meisterGesehen: werte.filter(zIstMeister).length > 0
  };
}

/* ── Namenszahlen ────────────────────────────────────────────
   ausdruck       alle Buchstaben
   seele          nur die Vokale
   persoenlichkeit nur die Konsonanten
   Das Y zählt je nach Schule als Vokal oder als Konsonant. Beides wird
   gerechnet; wo es den Wert ändert, sagt die Seite es.                  */
function zTafel(sys){ return sys==='chald' ? Z_CHALD : Z_PYTH; }

function zBuchstaben(name, sys, art){
  var T = zTafel(sys), out = [];
  zNorm(name, art).split('').forEach(function(c){
    if(c===' '){ out.push({c:' ', n:0, luecke:true, art:'luecke'}); return; }
    var n = T[c];
    out.push({c:c, n:(n===undefined?0:n), ohne:(n===undefined),
              vokal: Z_VOKALE.indexOf(c)>=0, y:(c==='Y'),
              art: (Z_VOKALE.indexOf(c)>=0 ? 'vokal' : (c==='Y' ? 'y' : 'konsonant'))});
  });
  return out;
}

function zNamenszahlen(name, sys, art){
  var g = zBuchstaben(name, sys, art);
  function summe(filter){
    var s=0; g.forEach(function(b){ if(!b.luecke && filter(b)) s += b.n; }); return s;
  }
  var alles  = summe(function(){ return true; });
  var vok    = summe(function(b){ return b.vokal; });
  var vokY   = summe(function(b){ return b.vokal || b.y; });
  var kon    = summe(function(b){ return !b.vokal && !b.y; });
  var konY   = summe(function(b){ return !b.vokal; });

  /* welche Ziffern im Namen gar nicht auftauchen */
  var da = {};
  g.forEach(function(b){ if(!b.luecke && b.n) da[b.n]=(da[b.n]||0)+1; });
  var fehlt=[], viel=[], max=0;
  for(var i=1;i<=9;i++){ if(!da[i]) fehlt.push(i); if((da[i]||0)>max) max=da[i]||0; }
  if(max>=3) for(var j=1;j<=9;j++) if(da[j]===max) viel.push(j);

  return {
    gitter: g,
    buchstaben: g.filter(function(b){ return !b.luecke; }).length,
    ausdruck: zRed(alles, true), ausdruckRoh: alles, ausdruckKette: zKette(alles,true),
    seele: zRed(vok, true), seeleRoh: vok,
    seeleMitY: zRed(vokY, true), seeleMitYRoh: vokY,
    person: zRed(konY, true), personRoh: konY,
    personOhneY: zRed(kon, true), personOhneYRoh: kon,
    yStoert: (zRed(vok,true) !== zRed(vokY,true)) && /Y/.test(zNorm(name,art)),
    fehlt: fehlt, haeufig: viel, zaehlung: da
  };
}

/* ── Zeit: das persönliche Jahr ──────────────────────────────
   Tag + Monat + laufendes Jahr, auf eine Stelle. Meisterzahlen werden
   hier nicht geführt — ein Jahr läuft in einem Neuner-Takt.            */
function zPersJahr(d, mo, jahr){
  var roh = zRed(d,false) + zRed(mo,false) + zRed(jahr,false);
  return {zahl: zRed(roh,false), roh: roh, kette: zKette(roh,false), jahr: jahr};
}
function zPersMonat(d, mo, jahr, monat){
  var pj = zPersJahr(d, mo, jahr).zahl;
  return zRed(pj + zRed(monat,false), false);
}

/* ── Herausforderungszahlen ──────────────────────────────────
   Differenzen der Datumsteile. Die 0 ist hier ein eigener Wert und heißt:
   alle Zahlen stehen zur Verfügung, keine davon drängt sich vor.        */
function zHerausforderung(d, mo, y){
  var T=zRed(d,false), M=zRed(mo,false), J=zRed(y,false);
  var e=Math.abs(M-T), z=Math.abs(T-J), h=Math.abs(e-z), v=Math.abs(M-J);
  return {erste:e, zweite:z, haupt:h, vierte:v};
}

/* ── Reife ───────────────────────────────────────────────────
   Lebenszahl plus Ausdruckszahl. Gilt als das, worauf beides zuläuft. */
function zReife(lz, az){ return zRed((lz||0)+(az||0), true); }

/* ── Hausnummern und Wohnungsnummern ─────────────────────────
   „47a" → 4+7+1. Buchstaben zählen mit, nach derselben Tafel wie Namen.
   Ein Schrägstrich oder Bindestrich trennt Haus und Wohnung; ist beides
   da, wird beides einzeln ausgewiesen.                                  */
function zAdresse(text, sys){
  var roh = String(text||'').toUpperCase().replace(/[ÄÖÜ]/g,function(m){
    return {'Ä':'A','Ö':'O','Ü':'U'}[m]; });
  /* Nur die Nummer selbst zählt, nicht der Straßenname. Gezählt wird
     jede Ziffernfolge mit dem Buchstaben, der direkt dranhängt:
     aus „Hauptstraße 47a, 3. OG" wird also 47a und 3.                 */
  var teile = roh.match(/\d+\s*[A-Z]?(?![A-Z])/g) || [];
  teile = teile.map(function(t){ return t.replace(/\s+/g,''); });
  var T = zTafel(sys);

  function stueck(t){
    var s=0, ziffern=[], buchst=[];
    t.replace(/[^0-9A-Z]/g,'').split('').forEach(function(c){
      if(/[0-9]/.test(c)){ s += +c; ziffern.push(c); }
      else if(T[c]!==undefined){ s += T[c]; buchst.push({c:c, n:T[c]}); }
    });
    if(!ziffern.length && !buchst.length) return null;
    return {text:t, summe:s, zahl:zRed(s,true), stelle:zRed(s,false),
            kette:zKette(s,true), ziffern:ziffern, buchstaben:buchst};
  }

  var liste = teile.map(stueck).filter(Boolean);
  if(!liste.length) return null;
  var ganz = stueck(teile.join(''));

  /* Was an einer Nummer sonst noch hängt: die chinesische Homophonie ist
     keine Deutung, sondern eine Tatsache über Sprache und Immobilienmarkt. */
  var ziffernAlle = teile.join('').replace(/[^0-9]/g,'');
  return {
    teile: liste,
    haupt: liste[0],
    ganz: ganz,
    mehrteilig: liste.length > 1,
    hatVier: ziffernAlle.indexOf('4') >= 0,
    hatAcht: ziffernAlle.indexOf('8') >= 0,
    endetVier: /4$/.test(ziffernAlle),
    endetAcht: /8$/.test(ziffernAlle)
  };
}

/* ── Alles auf einmal ────────────────────────────────────────
   Nimmt ein Profil (y, mo, d) und optional einen Namen und liefert das
   vollständige Blatt in beiden Systemen.                               */
function zBlatt(p, name, jahr, sys, art){
  if(!p || !p.y) return null;
  sys = sys || 'pyth'; art = art || 'direkt';
  jahr = jahr || new Date().getFullYear();

  var lz = zLebenszahl(p.d, p.mo, p.y);
  var nz = name ? zNamenszahlen(name, sys, art) : null;
  var nzAnder = name ? zNamenszahlen(name, sys==='pyth'?'chald':'pyth', art) : null;
  var nzUml = (name && zHatUmlaut(name))
              ? zNamenszahlen(name, sys, art==='direkt'?'umschrift':'direkt') : null;

  var lebenszahl = lz.summe;
  return {
    datum: {d:p.d, mo:p.mo, y:p.y},
    system: sys, umlautArt: art,
    lebenszahl: lebenszahl,
    lz: lz,
    geburtstag: {zahl: zRed(p.d, true), roh: p.d, kette: zKette(p.d, true)},
    name: nz,
    nameAnderesSystem: nzAnder,
    nameAndereUmlaute: nzUml,
    systemStreit: !!(nz && nzAnder && nz.ausdruck !== nzAnder.ausdruck),
    umlautStreit: !!(nz && nzUml && nz.ausdruck !== nzUml.ausdruck),
    reife: nz ? zReife(lebenszahl, nz.ausdruck) : null,
    jahr: zPersJahr(p.d, p.mo, jahr),
    monat: zPersMonat(p.d, p.mo, jahr, new Date().getMonth()+1),
    herausforderung: zHerausforderung(p.d, p.mo, p.y),
    /* Wie viele Menschen dieselbe Lebenszahl haben — das Maß für die
       Körnung dieses Werkzeugs. Wird in zSeltenheit ausgerechnet. */
    anteil: zAnteil(lebenszahl)
  };
}

/* ── Wie fein ist das überhaupt? ─────────────────────────────
   Über alle Daten eines vollen Zyklus gerechnet, wie häufig jede
   Lebenszahl vorkommt. Steht auf der Seite, damit niemand die Zahl für
   eine persönliche Kennung hält.                                       */
var Z_VERTEILUNG = null;
function zVerteilung(){
  if(Z_VERTEILUNG) return Z_VERTEILUNG;
  var z={}, n=0, tage=[31,28,31,30,31,30,31,31,30,31,30,31];
  for(var y=1940; y<=2039; y++){
    var schalt = (y%4===0 && (y%100!==0 || y%400===0));
    for(var m=1; m<=12; m++){
      var max = tage[m-1] + ((m===2 && schalt)?1:0);
      for(var d=1; d<=max; d++){
        var k = zLebenszahl(d,m,y).summe;
        z[k]=(z[k]||0)+1; n++;
      }
    }
  }
  Z_VERTEILUNG={zaehlung:z, gesamt:n};
  return Z_VERTEILUNG;
}
function zAnteil(zahl){
  var v = zVerteilung();
  return (v.zaehlung[zahl]||0) / v.gesamt;
}

window.AC_ZAHL = {
  PYTH: Z_PYTH, CHALD: Z_CHALD, VOKALE: Z_VOKALE,
  norm: zNorm, hatUmlaut: zHatUmlaut,
  red: zRed, ziffernsumme: zZiffernsumme, kette: zKette, istMeister: zIstMeister,
  lebenszahl: zLebenszahl, buchstaben: zBuchstaben, namenszahlen: zNamenszahlen,
  persJahr: zPersJahr, persMonat: zPersMonat,
  herausforderung: zHerausforderung, reife: zReife,
  adresse: zAdresse, blatt: zBlatt,
  verteilung: zVerteilung, anteil: zAnteil
};
})();
