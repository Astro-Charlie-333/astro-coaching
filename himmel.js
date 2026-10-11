/* Astro-Charlie · Himmelsrechnung für Ritualzeiten
   Sonnenauf- und -untergang, Planetentag und Planetenstunde nach der
   chaldäischen Ordnung, Mond ohne Lauf, Zeichenwechsel des Mondes.
   Setzt die Ephemeriden-Funktionen der Plattform voraus
   (jdFromUT, sunLon, moonLon, geo). */
(function(){
'use strict';
var RAD=Math.PI/180;
function n360(x){ x=x%360; return x<0?x+360:x; }

/* ── Sonnenauf- und -untergang (NOAA-Verfahren) ─────────
   lat/lon in Grad, lon östlich positiv. Liefert Julianische Tage in UT
   oder null bei Polartag und Polarnacht. */
var H0=-0.833;   /* Oberrand der Sonne am Horizont, mit mittlerer Refraktion */

function sonnenZeiten(jd, lat, lon){
  var lw=-lon;
  var n=Math.round(jd-2451545.0009-lw/360);
  var Js=2451545.0009+lw/360+n;

  function sonne(J){
    var M=n360(357.5291+0.98560028*(J-2451545));
    var C=1.9148*Math.sin(M*RAD)+0.0200*Math.sin(2*M*RAD)+0.0003*Math.sin(3*M*RAD);
    var lam=n360(M+102.9372+C+180);
    return {M:M, lam:lam, dek:Math.asin(Math.sin(lam*RAD)*Math.sin(23.4397*RAD))};
  }
  /* Wahrer Mittag, einmal nachgezogen */
  var s=sonne(Js);
  var Jt=Js+0.0053*Math.sin(s.M*RAD)-0.0069*Math.sin(2*s.lam*RAD);
  s=sonne(Jt);
  Jt=Js+0.0053*Math.sin(s.M*RAD)-0.0069*Math.sin(2*s.lam*RAD);

  /* Auf- und Untergang getrennt verfeinern: die Deklination gehört zum
     Zeitpunkt des Ereignisses, nicht zum Mittag dazwischen. */
  var polar=null;
  function ereignis(vz){
    var J=Jt+vz*0.25;
    for(var i=0;i<3;i++){
      var e=sonne(J);
      var co=(Math.sin(H0*RAD)-Math.sin(lat*RAD)*Math.sin(e.dek))/(Math.cos(lat*RAD)*Math.cos(e.dek));
      if(co>1){ polar='nacht'; return null; }
      if(co<-1){ polar='tag'; return null; }
      J=Jt+vz*(Math.acos(co)/RAD)/360;
    }
    return J;
  }
  var auf=ereignis(-1), unter=ereignis(1);
  return {auf:auf, unter:unter, mittag:Jt, polar:polar};
}

/* ── Planetentag und Planetenstunde ─────────────────────
   Chaldäische Reihenfolge, absteigend nach scheinbarer Umlaufzeit.
   Die erste Stunde nach Sonnenaufgang gehört dem Herrscher des
   Wochentags — der Tag beginnt also mit dem Sonnenaufgang,
   nicht um Mitternacht. */
var CHALD=['Saturn','Jupiter','Mars','Sonne','Venus','Merkur','Mond'];
/* Wochentag 0=Sonntag … 6=Samstag → Herrscher */
var TAGSHERR=['Sonne','Mond','Mars','Merkur','Jupiter','Venus','Saturn'];

function planetenStunde(jd, lat, lon){
  var heute=sonnenZeiten(jd,lat,lon);
  if(heute.polar) return {polar:heute.polar};
  var gestern=sonnenZeiten(jd-1,lat,lon), morgen=sonnenZeiten(jd+1,lat,lon);

  var aufJD, unterJD, naechsterAuf, istNacht;
  if(jd < heute.auf){
    /* noch vor Sonnenaufgang → Nachtstunden des Vortags */
    aufJD=gestern.auf; unterJD=gestern.unter; naechsterAuf=heute.auf; istNacht=true;
  } else if(jd < heute.unter){
    aufJD=heute.auf; unterJD=heute.unter; naechsterAuf=morgen.auf; istNacht=false;
  } else {
    aufJD=heute.auf; unterJD=heute.unter; naechsterAuf=morgen.auf; istNacht=true;
  }
  if(aufJD===null||unterJD===null||naechsterAuf===null) return {polar:'rand'};

  /* Der Wochentag richtet sich nach dem Sonnenaufgang, der diesen Tag eröffnet */
  var wt=new Date((aufJD-2440587.5)*86400000).getDay();
  var herrTag=TAGSHERR[wt];
  var start=CHALD.indexOf(herrTag);

  var nr, laenge, von;
  if(!istNacht){
    laenge=(unterJD-aufJD)/12;
    nr=Math.floor((jd-aufJD)/laenge);
    von=aufJD+nr*laenge;
  } else {
    laenge=(naechsterAuf-unterJD)/12;
    nr=12+Math.floor((jd-unterJD)/laenge);
    von=unterJD+(nr-12)*laenge;
  }
  nr=Math.max(0,Math.min(23,nr));
  return {
    tagesherr:herrTag, wochentag:wt,
    herr:CHALD[(start+nr)%7],
    nr:nr+1, nacht:istNacht,
    von:von, bis:von+laenge, laengeMin:laenge*1440,
    auf:aufJD, unter:unterJD, naechsterAuf:naechsterAuf
  };
}

/* Alle 24 Stunden eines Sonnentags, beginnend mit dem Sonnenaufgang */
function stundenTabelle(jd, lat, lon){
  var p=planetenStunde(jd,lat,lon);
  if(p.polar) return [];
  var start=CHALD.indexOf(p.tagesherr);
  var tagL=(p.unter-p.auf)/12, nachtL=(p.naechsterAuf-p.unter)/12;
  var out=[];
  for(var i=0;i<24;i++){
    var nacht=i>=12;
    var von=nacht? p.unter+(i-12)*nachtL : p.auf+i*tagL;
    var bis=nacht? von+nachtL : von+tagL;
    out.push({nr:i+1,herr:CHALD[(start+i)%7],nacht:nacht,von:von,bis:bis,
              jetzt:(jd>=von&&jd<bis)});
  }
  return out;
}

/* ── Mond ohne Lauf ─────────────────────────────────────
   Von seinem letzten klassischen Aspekt an einen der sieben Planeten
   bis zum Zeichenwechsel „läuft der Mond leer". */
var ASPEKTE=[0,60,90,120,180];
var ASP_NAME={0:'Konjunktion',60:'Sextil',90:'Quadrat',120:'Trigon',180:'Opposition'};
var KLASSISCH=['Sonne','Merkur','Venus','Mars','Jupiter','Saturn'];

function mondLon(jd){ return moonLon((jd-2451545)/36525); }
function pLon(k,jd){ var T=(jd-2451545)/36525;
  return k==='Sonne'?sunLon(T):(k==='Mond'?moonLon(T):geo(k,T)); }

/* Nächster Zeichenwechsel des Mondes nach jd */
function naechsterZeichenwechsel(jd){
  var ziel=(Math.floor(mondLon(jd)/30)+1)*30;
  var a=jd, fa=((mondLon(a)-ziel+540)%360)-180;
  for(var i=0;i<200;i++){
    var b=a+0.05, fb=((mondLon(b)-ziel+540)%360)-180;
    if(fa<0&&fb>=0){
      var lo=a,hi=b;
      for(var k=0;k<40;k++){ var m=(lo+hi)/2;
        if(((mondLon(m)-ziel+540)%360)-180<0) lo=m; else hi=m; }
      return {jd:(lo+hi)/2, zeichen:Math.floor(n360(ziel)/30)};
    }
    a=b; fa=fb;
  }
  return null;
}

/* Letzter exakter Aspekt des Mondes vor dem Zeichenwechsel */
function letzterAspekt(jd, bisJD){
  var best=null;
  KLASSISCH.forEach(function(k){
    ASPEKTE.forEach(function(w){
      var a=jd-2.2, fa=((mondLon(a)-pLon(k,a)-w+540)%360)-180;
      while(a<bisJD){
        var b=Math.min(a+0.04,bisJD), fb=((mondLon(b)-pLon(k,b)-w+540)%360)-180;
        if(fa<0&&fb>=0){
          var lo=a,hi=b;
          for(var i=0;i<34;i++){ var m=(lo+hi)/2;
            if(((mondLon(m)-pLon(k,m)-w+540)%360)-180<0) lo=m; else hi=m; }
          var t=(lo+hi)/2;
          if(t<=bisJD && (!best||t>best.jd)) best={jd:t,planet:k,winkel:w,name:ASP_NAME[w]};
        }
        a=b; fa=fb;
        if(b>=bisJD) break;
      }
    });
  });
  return best;
}

function ohneLauf(jd){
  var zw=naechsterZeichenwechsel(jd);
  if(!zw) return null;
  var la=letzterAspekt(jd,zw.jd);
  return {
    leer: !!(la && jd>la.jd),
    seit: la?la.jd:null,
    letzter: la,
    bis: zw.jd,
    naechstesZeichen: zw.zeichen,
    zeichenJetzt: Math.floor(mondLon(jd)/30)
  };
}

window.AC_HIMMEL={
  CHALD:CHALD, TAGSHERR:TAGSHERR,
  sonnenZeiten:sonnenZeiten,
  planetenStunde:planetenStunde,
  stundenTabelle:stundenTabelle,
  naechsterZeichenwechsel:naechsterZeichenwechsel,
  letzterAspekt:letzterAspekt,
  ohneLauf:ohneLauf
};
})();
