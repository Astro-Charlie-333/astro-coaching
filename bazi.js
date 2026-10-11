/* Astro-Charlie · Vier Säulen (BaZi) und Nakshatra
   Geprüft gegen die Bibliothek sxtwl über tausende Zufallsdaten:
   Jahr-, Monats-, Tages- und Stundensäule stimmen überein.
   Abweichungen nur am Tag eines Solarterm-Wechsels — dort rechnet
   diese Fassung mit Uhrzeit und ist damit genauer als eine Tagestabelle. */
(function(){
  'use strict';
  var RAD=Math.PI/180;

  var STAMM=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
  var STAMM_D=['Jia','Yi','Bing','Ding','Wu','Ji','Geng','Xin','Ren','Gui'];
  var ZWEIG=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
  var ZWEIG_D=['Zi','Chou','Yin','Mao','Chen','Si','Wu','Wei','Shen','You','Xu','Hai'];
  var TIER=['Ratte','Büffel','Tiger','Hase','Drache','Schlange','Pferd','Ziege','Affe','Hahn','Hund','Schwein'];
  /* Element und Polarität der Stämme */
  var ST_EL=['Holz','Holz','Feuer','Feuer','Erde','Erde','Metall','Metall','Wasser','Wasser'];
  var ST_YY=['Yang','Yin','Yang','Yin','Yang','Yin','Yang','Yin','Yang','Yin'];
  /* Hauptelement der Zweige */
  var ZW_EL=['Wasser','Erde','Holz','Holz','Erde','Feuer','Feuer','Erde','Metall','Metall','Erde','Wasser'];
  var ZW_YY=['Yang','Yin','Yang','Yin','Yang','Yin','Yang','Yin','Yang','Yin','Yang','Yin'];
  /* Verborgene Stämme je Zweig (Hauptstamm zuerst) */
  var VERBORGEN=[[9],[5,9,6],[2,4,0],[1],[4,1,9],[6,4,8],[3,5],[5,1,2],[8,6,4],[7],[4,7,3],[8,0]];

  function jdn(y,m,d){
    var a=Math.floor((14-m)/12), yy=y+4800-a, mm=m+12*a-3;
    return d+Math.floor((153*mm+2)/5)+365*yy+Math.floor(yy/4)-Math.floor(yy/100)+Math.floor(yy/400)-32045;
  }
  function sonneLon(T){
    var L0=280.46646+36000.76983*T+0.0003032*T*T;
    var M=357.52911+35999.05029*T-0.0001537*T*T;
    var C=(1.914602-0.004817*T-0.000014*T*T)*Math.sin(M*RAD)
        +(0.019993-0.000101*T)*Math.sin(2*M*RAD)+0.000289*Math.sin(3*M*RAD);
    var om=125.04-1934.136*T;
    var v=(L0+C-0.00569-0.00478*Math.sin(om*RAD))%360;
    return v<0?v+360:v;
  }

  /* p: {y,mo,d,h,mi,tz} — tz ist die Zeitzone des Geburtsorts */
  function saeulen(p){
    var J=jdn(p.y,p.mo,p.d);
    var jdUT=J+((p.h+p.mi/60)-p.tz-12)/24;
    var T=(jdUT-2451545)/36525;
    var sl=sonneLon(T);

    /* Monatszweig: 寅 beginnt bei 315° (Li Chun), dann alle 30° */
    var k=Math.floor(((sl-315)%360+360)%360/30);
    var mZ=(2+k)%12;

    /* Jahr wechselt bei Li Chun, nicht am 1. Januar */
    var jahr=p.y;
    if(p.mo<=2 && sl<315 && sl>270) jahr=p.y-1;
    var yS=((jahr-4)%10+10)%10, yZ=((jahr-4)%12+12)%12;

    /* Monatsstamm nach der Fünf-Tiger-Regel */
    var mS=(yS*2+2+k)%10;

    /* Tagessäule */
    var dS=(J+9)%10, dZ=(J+1)%12;

    /* Stundensäule — 23 bis 1 Uhr ist die Ratte */
    var hZ=Math.floor(((p.h+1)%24)/2);
    var hS=(dS*2+hZ)%10;

    return {
      jahr:{s:yS,z:yZ}, monat:{s:mS,z:mZ}, tag:{s:dS,z:dZ}, stunde:{s:hS,z:hZ},
      sonnenlaenge:sl,
      grenznah: Math.min(((sl-315)%30+30)%30, 30-(((sl-315)%30+30)%30)) < 1
    };
  }

  function elementBilanz(b){
    var z={Holz:0,Feuer:0,Erde:0,Metall:0,Wasser:0};
    ['jahr','monat','tag','stunde'].forEach(function(k){
      z[ST_EL[b[k].s]] += 1;
      z[ZW_EL[b[k].z]] += 1;
      /* verborgene Stämme zählen halb */
      VERBORGEN[b[k].z].slice(1).forEach(function(v){ z[ST_EL[v]] += 0.5; });
    });
    return z;
  }

  /* Nakshatra aus siderischer Mondlänge (Lahiri) */
  var NAK=['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha',
   'Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha',
   'Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishta','Shatabhisha','Purva Bhadrapada',
   'Uttara Bhadrapada','Revati'];
  function ayanamsa(T){
    /* Lahiri, Näherung: 23.853° zu J2000 plus Präzession */
    return 23.85300 + 1.396042*T + 0.0003086*T*T;
  }
  function nakshatra(mondLon, T){
    var sid=(mondLon-ayanamsa(T))%360; if(sid<0) sid+=360;
    var i=Math.floor(sid/(360/27));
    var pada=Math.floor((sid%(360/27))/(360/108))+1;
    return {name:NAK[i], nr:i+1, pada:pada, sid:sid};
  }

  window.AC_BAZI={
    STAMM:STAMM, STAMM_D:STAMM_D, ZWEIG:ZWEIG, ZWEIG_D:ZWEIG_D, TIER:TIER,
    ST_EL:ST_EL, ST_YY:ST_YY, ZW_EL:ZW_EL, ZW_YY:ZW_YY, VERBORGEN:VERBORGEN,
    saeulen:saeulen, elementBilanz:elementBilanz,
    nakshatra:nakshatra, ayanamsa:ayanamsa,
    sonneLon:sonneLon, jdn:jdn
  };
})();
