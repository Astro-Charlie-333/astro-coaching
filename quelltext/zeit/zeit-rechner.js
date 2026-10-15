/* Astro-Charlie · Zeiten — die Rechnung
   ==================================================================
   Wann kommen die Hochphasen? Drei Verfahren, die genau das
   beantworten, sauber getrennt von den Texten:

     Zodiakale Freilassung (Zodiacal Releasing, Valens)
       Lebensabschnitte aus dem Los des Geistes (Beruf) und dem
       Los des Eros (Liebe). Hochphasen sind die Abschnitte, deren
       Zeichen zum Los des Glücks im Winkel steht.

     Jahresprofektion
       Ein Haus je Lebensjahr, sein Herrscher führt das Jahr.

     Firdaria
       Mittelalterliche Planetenperioden, Tag- und Nachtreihenfolge.

   Alle Namen mit Z_ davor, damit nichts mit der astronomischen
   Engine kollidiert.                                               */
(function(){
'use strict';

function znrm(x){ x=x%360; return x<0?x+360:x; }
function zzi(l){ return Math.floor(znrm(l)/30); }

var Z_ZEICHEN=['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion',
 'Schütze','Steinbock','Wassermann','Fische'];
var Z_HERRSCHER=['Mars','Venus','Merkur','Mond','Sonne','Merkur','Venus','Mars',
 'Jupiter','Saturn','Saturn','Jupiter'];

/* ── Die Lose ────────────────────────────────────────────────
   Bei Tag und bei Nacht vertauscht, wie in der hellenistischen
   Überlieferung. Tag heißt: die Sonne stand über dem Horizont.   */
function zLose(C){
  var tag = (((Math.floor(znrm(C.Sonne)/30) - Math.floor(znrm(C.ASC)/30))%12+12)%12+1) >= 7;
  /* Bei Tag nimmt man den Bogen vom einen zum anderen Lichtpunkt, bei
     Nacht umgekehrt. Alle sieben Lose folgen diesem Muster.          */
  function los(a, b){ return tag ? znrm(C.ASC + a - b) : znrm(C.ASC + b - a); }

  var glueck = los(C.Mond, C.Sonne);
  var geist  = los(C.Sonne, C.Mond);
  var L={tag:tag, sekte:(tag?'Tag':'Nacht'), glueck:glueck, geist:geist};

  /* Paulus und Olympiodor: bei Tag AC + Venus − Geist.
     Eine zweite Überlieferung dreht das um; beide werden gerechnet. */
  L.eros    = (C.Venus!==undefined) ? los(C.Venus, geist) : null;
  L.erosAlt = (C.Venus!==undefined) ? los(geist, C.Venus) : null;
  /* Die übrigen der sieben hermetischen Lose */
  L.sieg    = (C.Jupiter!==undefined) ? los(C.Jupiter, geist) : null;
  L.not     = (C.Merkur!==undefined)  ? los(glueck, C.Merkur) : null;
  L.mut     = (C.Mars!==undefined)    ? los(glueck, C.Mars)   : null;
  L.nemesis = (C.Saturn!==undefined)  ? los(glueck, C.Saturn) : null;
  return L;
}

/* ── Zodiakale Freilassung ───────────────────────────────────
   Die allgemeinen Jahre je Zeichen nach Valens. Gerechnet wird in
   Jahren zu 360 Tagen und Monaten zu 30 Tagen.                   */
var Z_JAHRE=[15,8,20,25,19,20,8,15,12,27,30,12];
var Z_TAG_JAHR=360, Z_TAG_MONAT=30;
/* Ein voller Umlauf auf der zweiten Ebene: 211 Monate */
var Z_UMLAUF=Z_JAHRE.reduce(function(a,b){ return a+b; }, 0);

/* Stellung eines Zeichens zum Los des Glücks, als Haus 1 bis 12 */
function zVonGlueck(zeichen, glueckZeichen){
  return ((zeichen - glueckZeichen)%12+12)%12 + 1;
}
function zIstGipfel(zeichen, glueckZeichen){
  return [1,4,7,10].indexOf(zVonGlueck(zeichen, glueckZeichen))>=0;
}

/* Die erste Ebene: Lebensabschnitte ab Geburt.
   losLon  Länge des Loses, von dem freigelassen wird
   glueck  Länge des Loses des Glücks (für die Hochphasen)
   tage    wie weit gerechnet werden soll, in Tagen ab Geburt      */
function zFreilassung(losLon, glueckLon, tage){
  var startZ=zzi(losLon), gz=zzi(glueckLon);
  var l1=[], t=0, z=startZ, schutz=0;
  while(t < tage && schutz++ < 40){
    var laenge=Z_JAHRE[z]*Z_TAG_JAHR;
    var abschnitt={ebene:1, zeichen:z, von:t, bis:t+laenge,
      jahre:Z_JAHRE[z], herr:Z_HERRSCHER[z],
      vonGlueck:zVonGlueck(z,gz), gipfel:zIstGipfel(z,gz),
      unter:zUnterperioden(z, t, laenge, gz)};
    l1.push(abschnitt);
    t+=laenge; z=(z+1)%12;
  }
  return {start:startZ, glueckZeichen:gz, abschnitte:l1};
}

/* Die zweite Ebene innerhalb eines Abschnitts.
   Sie beginnt im selben Zeichen wie der Abschnitt und läuft in
   Zeichenfolge weiter, jedes Zeichen so viele Monate, wie es Jahre
   bekommt. Ist der Umlauf einmal herum, wird nicht wiederholt,
   sondern ins Gegenzeichen gesprungen — die Lösung der Bindung.   */
function zUnterperioden(startZ, t0, laenge, gz){
  var out=[], t=t0, z=startZ, ende=t0+laenge, schutz=0;
  var naechsteIstBindung=false, bindungGeschehen=false;
  while(t < ende && schutz++ < 40){
    var voll=Z_JAHRE[z]*Z_TAG_MONAT;
    var bis=Math.min(t+voll, ende);
    out.push({ebene:2, zeichen:z, von:t, bis:bis,
      monate:Z_JAHRE[z], gekappt:(bis < t+voll), herr:Z_HERRSCHER[z],
      vonGlueck:zVonGlueck(z,gz), gipfel:zIstGipfel(z,gz),
      bindung:naechsteIstBindung});
    naechsteIstBindung=false;
    t=bis;
    var naechstes=(z+1)%12;
    if(naechstes===startZ && !bindungGeschehen){
      /* Der Umlauf ist herum. Statt das Startzeichen zu wiederholen,
         springt die Reihe ins Gegenzeichen — die Lösung der Bindung.
         Das geschieht je Abschnitt nur einmal: Vom Gegenzeichen aus
         trifft die Reihe das Startzeichen schon nach sechs Schritten
         wieder, und das ist kein neuer Umlauf.                       */
      z=(startZ+6)%12;
      naechsteIstBindung=true;
      bindungGeschehen=true;
      out[out.length-1].bindungDanach=true;
    } else z=naechstes;
  }
  return out;
}

/* ── Jahresprofektion ────────────────────────────────────────
   Ein Haus je vollendetem Lebensjahr, beginnend beim ersten.     */
function zProfektion(C, alter){
  var h=((alter%12)+12)%12;                 /* 0 = erstes Haus */
  var z=(zzi(C.ASC)+h)%12;
  return {alter:alter, haus:h+1, zeichen:z, zeichenName:Z_ZEICHEN[z],
          herr:Z_HERRSCHER[z]};
}
/* Monatsprofektion: ein Zeichen je Monat ab dem Geburtstag */
function zProfektionMonat(C, alter, monatNr){
  var basis=(zzi(C.ASC)+(((alter%12)+12)%12))%12;
  var z=(basis+monatNr)%12;
  return {haus:((z - zzi(C.ASC))%12+12)%12+1, zeichen:z,
          zeichenName:Z_ZEICHEN[z], herr:Z_HERRSCHER[z]};
}

/* ── Firdaria ────────────────────────────────────────────────
   Reihenfolge nach Bonatti in der Fassung von Dykes. Die Längen
   sind bei Tag und Nacht gleich, nur die Reihenfolge wechselt.   */
var Z_FIRD_TAG=[['Sonne',10],['Venus',8],['Merkur',13],['Mond',9],['Saturn',11],
 ['Jupiter',12],['Mars',7],['Aufsteigender Knoten',3],['Absteigender Knoten',2]];
var Z_FIRD_NACHT=[['Mond',9],['Saturn',11],['Jupiter',12],['Mars',7],
 ['Aufsteigender Knoten',3],['Absteigender Knoten',2],['Sonne',10],['Venus',8],['Merkur',13]];
/* Chaldäische Reihenfolge für die Unterperioden */
var Z_CHALD=['Saturn','Jupiter','Mars','Sonne','Venus','Merkur','Mond'];

function zFirdaria(tag){
  var reihe=tag?Z_FIRD_TAG:Z_FIRD_NACHT, out=[], a=0;
  reihe.forEach(function(p){
    var name=p[0], jahre=p[1];
    var e={herr:name, von:a, bis:a+jahre, jahre:jahre, unter:[]};
    var i=Z_CHALD.indexOf(name);
    if(i>=0){
      var teil=jahre/7, b=a;
      for(var k=0;k<7;k++){
        var u=Z_CHALD[(i+k)%7];
        e.unter.push({herr:u, von:b, bis:b+teil, jahre:teil});
        b+=teil;
      }
    }
    out.push(e); a+=jahre;
  });
  return out;
}
function zFirdariaJetzt(liste, alter){
  for(var i=0;i<liste.length;i++){
    var p=liste[i];
    if(alter>=p.von && alter<p.bis){
      var u=null;
      p.unter.forEach(function(x){ if(alter>=x.von && alter<x.bis) u=x; });
      return {haupt:p, unter:u};
    }
  }
  return null;   /* über 75 Jahre beginnt die Reihe von vorn */
}

/* ── Zeitrechnung ────────────────────────────────────────────
   Die Freilassung zählt in Tagen ab Geburt. Umrechnung in echte
   Daten über das Julianische Datum.                              */
function zDatum(jdGeburt, tage){
  return new Date((jdGeburt + tage - 2440587.5)*86400000);
}
function zAlterJahre(jdGeburt, jdJetzt){
  return (jdJetzt - jdGeburt)/365.2422;
}
/* Vollendete Lebensjahre am Stichtag — maßgeblich für die Profektion */
function zAlterVollendet(geb, jetzt){
  var a=jetzt.getFullYear()-geb.y;
  var m=jetzt.getMonth()+1, d=jetzt.getDate();
  if(m<geb.mo || (m===geb.mo && d<geb.d)) a--;
  return a;
}

/* ── Alles zusammen ──────────────────────────────────────────  */
/* Welches Los zu welchem Lebensbereich gehört */
var Z_BEREICHE=[
 {k:'arbeit',  los:'geist'},
 {k:'liebe',   los:'eros'},
 {k:'koerper', los:'glueck'},
 {k:'erfolg',  los:'sieg'},
 {k:'druck',   los:'not'}
];

function zBlatt(C, jdGeburt, geb, jetzt, erosVariante){
  if(!C || C.ASC===undefined) return null;
  jetzt = jetzt || new Date();
  var L=zLose(C);
  if(erosVariante==='alt') L.eros=L.erosAlt;
  var bis = 100*Z_TAG_JAHR;                   /* hundert Jahre weit rechnen */

  var jdJetzt = jetzt.getTime()/86400000 + 2440587.5;
  var tageSeitGeburt = jdJetzt - jdGeburt;

  var spuren={};
  Z_BEREICHE.forEach(function(B){
    var lon=L[B.los];
    spuren[B.k] = (lon===null||lon===undefined) ? null : zFreilassung(lon, L.glueck, bis);
  });

  var alter = zAlterVollendet(geb, jetzt);
  var prof = zProfektion(C, alter);
  var fird = zFirdaria(L.tag);
  var firdJetzt = zFirdariaJetzt(fird, zAlterJahre(jdGeburt, jdJetzt));

  return {
    lose:L, spuren:spuren,
    /* die beiden Hauptspuren auch unter ihrem alten Namen */
    beruf:spuren.arbeit, liebe:spuren.liebe, erosLon:L.eros,
    profektion:prof, firdaria:fird, firdariaJetzt:firdJetzt,
    alter:alter, tageSeitGeburt:tageSeitGeburt, jdGeburt:jdGeburt,
    jetzt:jetzt
  };
}

/* Welcher Abschnitt läuft zu einem Zeitpunkt — erste und zweite Ebene */
function zJetzt(freilassung, tage){
  var out={l1:null, l2:null};
  freilassung.abschnitte.forEach(function(a){
    if(tage>=a.von && tage<a.bis){
      out.l1=a;
      a.unter.forEach(function(u){ if(tage>=u.von && tage<u.bis) out.l2=u; });
    }
  });
  return out;
}

/* Die nächsten Hochphasen ab einem Zeitpunkt — über beide Ebenen */
function zNaechsteGipfel(freilassung, abTagen, anzahl){
  var out=[];
  freilassung.abschnitte.forEach(function(a){
    if(a.gipfel && a.bis>abTagen)
      out.push({ebene:1, zeichen:a.zeichen, von:a.von, bis:a.bis,
                vonGlueck:a.vonGlueck, laeuft:(abTagen>=a.von)});
    a.unter.forEach(function(u){
      if(u.gipfel && u.bis>abTagen && !(a.gipfel && u.zeichen===a.zeichen))
        out.push({ebene:2, zeichen:u.zeichen, von:u.von, bis:u.bis,
                  vonGlueck:u.vonGlueck, laeuft:(abTagen>=u.von)});
    });
  });
  out.sort(function(x,y){ return x.von-y.von; });
  return anzahl?out.slice(0,anzahl):out;
}

/* Die Lösungen der Bindung — die großen Einschnitte */
function zBindungen(freilassung){
  var out=[];
  freilassung.abschnitte.forEach(function(a){
    a.unter.forEach(function(u){ if(u.bindung) out.push(u); });
  });
  return out;
}

window.AC_ZEIT={
  ZEICHEN:Z_ZEICHEN, HERRSCHER:Z_HERRSCHER, JAHRE:Z_JAHRE, BEREICHE:Z_BEREICHE,
  TAG_JAHR:Z_TAG_JAHR, TAG_MONAT:Z_TAG_MONAT, UMLAUF:Z_UMLAUF,
  zi:zzi, nrm:znrm,
  lose:zLose, freilassung:zFreilassung, vonGlueck:zVonGlueck, istGipfel:zIstGipfel,
  profektion:zProfektion, profektionMonat:zProfektionMonat,
  firdaria:zFirdaria, firdariaJetzt:zFirdariaJetzt,
  datum:zDatum, alterJahre:zAlterJahre, alterVollendet:zAlterVollendet,
  blatt:zBlatt, jetzt:zJetzt, naechsteGipfel:zNaechsteGipfel, bindungen:zBindungen
};
})();
