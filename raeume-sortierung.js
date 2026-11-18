/* Gebaut von quelltext/raeume/bau-raeume.py — nicht von Hand ändern.
   Sortiert die Karten auf raeume.html nach dem aktiven Chart. */
var RAD=Math.PI/180;
function norm(x){x=x%360;return x<0?x+360:x;}
function jdFromUT(y,m,d,h){if(m<=2){y-=1;m+=12;}var A=Math.floor(y/100),B=2-A+Math.floor(A/4);
 return Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+d+B-1524.5+h/24;}
var ELEM={Merkur:[0.38709927,0.20563593,7.00497902,252.25032350,77.45779628,48.33076593,0.00000037,0.00001906,-0.00594749,149472.67411175,0.16047689,-0.12534081],
Venus:[0.72333566,0.00677672,3.39467605,181.97909950,131.60246718,76.67984255,0.00000390,-0.00004107,-0.00078890,58517.81538729,0.00268329,-0.27769418],
Erde:[1.00000261,0.01671123,-0.00001531,100.46457166,102.93768193,0.0,0.00000562,-0.00004392,-0.01294668,35999.37244981,0.32327364,0.0],
Mars:[1.52371034,0.09339410,1.84969142,-4.55343205,-23.94362959,49.55953891,0.00001847,0.00007882,-0.00813131,19140.30268499,0.44441088,-0.29257343],
Jupiter:[5.20288700,0.04838624,1.30439695,34.39644051,14.72847983,100.47390909,-0.00011607,-0.00013253,-0.00183714,3034.74612775,0.21252668,0.20469106],
Saturn:[9.53667594,0.05386179,2.48599187,49.95424423,92.59887831,113.66242448,-0.00125060,-0.00050991,0.00193609,1222.49362201,-0.41897216,-0.28867794],
Uranus:[19.18916464,0.04725744,0.77263783,313.23810451,170.95427630,74.01692503,-0.00196176,-0.00004397,-0.00242939,428.48202785,0.40805281,0.04240589],
Neptun:[30.06992276,0.00859048,1.77004347,-55.12002969,44.96476227,131.78422574,0.00026291,0.00005105,0.00035372,218.45945325,-0.32241464,-0.00508664],
Pluto:[39.48211675,0.24882730,17.14001206,238.92903833,224.06891629,110.30393684,-0.00031596,0.00005170,0.00004818,145.20780515,-0.04062942,-0.01183482]};
function helio(n,T){var e=ELEM[n];var a=e[0]+e[6]*T,ec=e[1]+e[7]*T,I=(e[2]+e[8]*T)*RAD,
 L=e[3]+e[9]*T,wb=e[4]+e[10]*T,Om=e[5]+e[11]*T;var M=((norm(L-wb)+180)%360)-180;
 var Mr=M*RAD,E=Mr+ec*Math.sin(Mr);
 for(var i=0;i<12;i++){var dE=(E-ec*Math.sin(E)-Mr)/(1-ec*Math.cos(E));E-=dE;if(Math.abs(dE)<1e-11)break;}
 var xp=a*(Math.cos(E)-ec),yp=a*Math.sqrt(1-ec*ec)*Math.sin(E),w=(wb-Om)*RAD,O=Om*RAD;
 var x=(Math.cos(w)*Math.cos(O)-Math.sin(w)*Math.sin(O)*Math.cos(I))*xp+(-Math.sin(w)*Math.cos(O)-Math.cos(w)*Math.sin(O)*Math.cos(I))*yp;
 var y=(Math.cos(w)*Math.sin(O)+Math.sin(w)*Math.cos(O)*Math.cos(I))*xp+(-Math.sin(w)*Math.sin(O)+Math.cos(w)*Math.cos(O)*Math.cos(I))*yp;
 return [x,y];}
function prec(T){return 1.3969712*T+0.0003086*T*T;}
function sunLon(T){var e=helio('Erde',T);return norm(Math.atan2(-e[1],-e[0])/RAD+prec(T));}
function geo(n,T){var p=helio(n,T),e=helio('Erde',T);return norm(Math.atan2(p[1]-e[1],p[0]-e[0])/RAD+prec(T));}
function moonLon(T){var Lp=218.3164477+481267.88123421*T-0.0015786*T*T,D=297.8501921+445267.1114034*T-0.0018819*T*T,
 M=357.5291092+35999.0502909*T,Mp=134.9633964+477198.8675055*T+0.0087414*T*T,F=93.2720950+483202.0175233*T-0.0036539*T*T,
 A1=(119.75+131.849*T)*RAD,A2=(53.09+479264.290*T)*RAD;
 D*=RAD;M*=RAD;Mp*=RAD;F*=RAD;var s=0,e1=1-0.002516*T;
 var t=[[6288774,0,0,1,0],[1274027,2,0,-1,0],[658314,2,0,0,0],[213618,0,0,2,0],[-185116,0,1,0,0],[-114332,0,0,0,2],
 [58793,2,-1,-1,0],[57066,2,-1,0,0],[53322,2,0,1,0],[45758,2,-1,1,0],[-40923,0,1,-1,0],[-34720,1,0,0,0],
 [-30383,0,1,1,0],[15327,2,0,-2,0],[-12528,0,0,1,2],[10980,0,0,1,-2],[10675,4,0,-1,0],[10034,0,0,3,0],
 [8548,4,0,-2,0],[-7888,2,1,-1,0],[-6766,2,1,0,0],[-5163,1,0,-1,0],[4987,1,1,0,0],[4036,2,-1,1,0],
 [3994,2,0,2,0],[3861,4,0,0,0],[3665,2,0,-3,0],[-2689,0,1,-2,0],[-2602,2,0,-1,2],[2390,2,-1,-2,0],
 [-2348,1,0,1,0],[2236,2,-2,0,0],[-2120,0,1,2,0],[-2069,0,2,0,0],[2048,2,-2,-1,0],[-1773,2,0,1,-2],
 [-1595,2,0,0,2],[1215,4,-1,-1,0],[-1110,0,0,2,2]];
 for(var i=0;i<t.length;i++){var f=t[i][0]*(Math.abs(t[i][2])===1?e1:(Math.abs(t[i][2])===2?e1*e1:1));
  s+=f*Math.sin(t[i][1]*D+t[i][2]*M+t[i][3]*Mp+t[i][4]*F);}
 s+=3958*Math.sin(A1)+1962*Math.sin(Lp*RAD-F)+318*Math.sin(A2);
 return norm(Lp+s/1000000);}
function nodeLon(T){return norm(125.0445479-1934.1362891*T+0.0020754*T*T);}
function epsOf(T){return 23.439291-0.0130042*T-1.64e-7*T*T;}
function gmst(jd){var T=(jd-2451545)/36525;return norm(280.46061837+360.98564736629*(jd-2451545)+0.000387933*T*T);}
function angles(jd,lat,lon){var T=(jd-2451545)/36525,e=epsOf(T)*RAD,phi=lat*RAD,ramc=norm(gmst(jd)+lon)*RAD;
 var mc=norm(Math.atan2(Math.sin(ramc),Math.cos(ramc)*Math.cos(e))/RAD);
 var asc=norm(Math.atan2(Math.cos(ramc),-(Math.sin(ramc)*Math.cos(e)+Math.tan(phi)*Math.sin(e)))/RAD);
 return {asc:asc,mc:mc,ramc:norm(ramc/RAD),eps:epsOf(T)};}
function placidus(ramc,epsd,lat){var e=epsd*RAD,phi=lat*RAD;
 function cusp(off,fac){var ra=norm(ramc+off);
  for(var i=0;i<30;i++){var dec=Math.atan(Math.tan(e)*Math.sin(ra*RAD));
   var s=Math.tan(phi)*Math.tan(dec); s=Math.max(-1,Math.min(1,s));
   var ad=Math.asin(s)/RAD, nra=norm(ramc+off+fac*ad);
   if(Math.abs(nra-ra)<1e-9)break; ra=nra;}
  return norm(Math.atan2(Math.sin(ra*RAD),Math.cos(ra*RAD)*Math.cos(e))/RAD);}
 return [cusp(30,1/3),cusp(60,2/3),cusp(120,2/3),cusp(150,1/3)];}


var SIGNS=['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische'];
var GLZ=['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
var WD=['So','Mo','Di','Mi','Do','Fr','Sa'];
var MN=['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
var MK=['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
var ELF=['#B5502E','#6B7C3F','#3E7C9A','#1F4FD8'];
var HT=['Person und Auftreten','Wert und Besitz','Sprache und Nahbereich','Zuhause und Wurzeln','Ausdruck und Romantik',
 'Alltag und Arbeit','Partnerschaft','Tiefe und Geteiltes','Sinn und Weite','Beruf und Sichtbarkeit','Gruppen und Ziele','Rückzug und Inneres'];
var PGL={Sonne:'☉',Mond:'☽',Merkur:'☿',Venus:'♀',Mars:'♂',Jupiter:'♃',Saturn:'♄',Uranus:'♅',Neptun:'♆',Pluto:'♇'};
function nrm(x){x=x%360;return x<0?x+360:x;}
var gewaehlt=null, tagOffset=0;

function heuteJD(){var n=new Date();
 return jdFromUT(n.getUTCFullYear(),n.getUTCMonth()+1,n.getUTCDate(),12);}
function datVon(jd){ return new Date((jd-2440587.5)*86400000); }
function lon(k,jd){var T=(jd-2451545)/36525;
 if(k==='Sonne') return sunLon(T); if(k==='Mond') return moonLon(T); return geo(k,T);}
function rueck(k,jd){ if(k==='Sonne'||k==='Mond') return false; return nrm(lon(k,jd+1)-lon(k,jd-1))>180; }

function chartVon(p){
  var ut=p.h+p.mi/60-p.tz,y=p.y,mo=p.mo,d=p.d;
  if(ut<0){ut+=24;d-=1;} if(ut>=24){ut-=24;d+=1;}
  var jd=jdFromUT(y,mo,d,ut),T=(jd-2451545)/36525,a=angles(jd,p.lat,p.lon);
  return {Sonne:sunLon(T),Mond:moonLon(T),Merkur:geo('Merkur',T),Venus:geo('Venus',T),Mars:geo('Mars',T),
   Jupiter:geo('Jupiter',T),Saturn:geo('Saturn',T),Uranus:geo('Uranus',T),Neptun:geo('Neptun',T),
   Pluto:geo('Pluto',T),ASC:a.asc,MC:a.mc};
}
function haus(P,l){ return ((Math.floor(l/30)-Math.floor(P.ASC/30))%12+12)%12+1; }


var RS_ANKER={"alltag":{"n":"Alltag","f":[{"n":"Dein natürlicher Rhythmus","a":{"haeuser":[6],"punkte":["Mond","Mars","Sonne"]}},{"n":"Struktur, die hält","a":{"haeuser":[6,10],"punkte":["Saturn","Merkur"]}},{"n":"Ordnung und Umgebung","a":{"haeuser":[4,6],"punkte":["Mond","Venus","Saturn"]}},{"n":"Anfangen und Dranbleiben","a":{"haeuser":[1,3],"punkte":["Mars","Merkur","Uranus","Saturn"]}},{"n":"Pausen und Erholung","a":{"haeuser":[12,5],"punkte":["Mond","Neptun","Venus"]}},{"n":"Wenn es zu viel wird","a":{"haeuser":[6,12],"punkte":["Saturn","Mond","Neptun","Chiron"]}}]},"anders-verdrahtet":{"n":"Anders verdrahtet","f":[{"n":"Wie dein Kopf arbeitet","a":{"haeuser":[3],"punkte":["Merkur","Uranus"]}},{"n":"Was dich überlastet","a":{"haeuser":[6,12],"punkte":["Mond","Neptun","Merkur"]}},{"n":"Dein Energiehaushalt","a":{"haeuser":[1,6],"punkte":["Mars","Saturn","Uranus"]}},{"n":"Struktur, die trägt","a":{"haeuser":[6,10],"punkte":["Saturn","Mond","Merkur"]}},{"n":"Reizsuche und Interesse","a":{"haeuser":[5,9,11],"punkte":["Uranus","Jupiter","Merkur"]}},{"n":"Rückzug und Erholung","a":{"haeuser":[12,4],"punkte":["Mond","Neptun","Saturn"]}},{"n":"Anders sein unter Menschen","a":{"haeuser":[11,1],"punkte":["Uranus","Saturn","ASC"]}}]},"berufung":{"n":"Berufung","f":[{"n":"Was dich antreibt","a":{"haeuser":[1,5],"punkte":["Sonne","Mars","Jupiter"]}},{"n":"Wofür du gesehen wirst","a":{"haeuser":[10],"punkte":["MC","Saturn","Jupiter","Chiron"]}},{"n":"Was du täglich tust","a":{"haeuser":[6],"punkte":["Merkur","Mars","Saturn","Mond"]}},{"n":"Womit du Geld verdienst","a":{"haeuser":[2],"punkte":["Venus","Jupiter","Saturn"]}},{"n":"Wohin es dich zieht","a":{"haeuser":[9],"punkte":["Jupiter","Neptun"]}},{"n":"Was du schon mitbringst","a":{"haeuser":[6,3],"punkte":["Saturn","Merkur","Mars"]}},{"n":"Wem du damit nützt","a":{"haeuser":[11,12],"punkte":["Neptun","Jupiter","Pluto"]}}]},"herkunft":{"n":"Herkunft","f":[{"n":"Die Atmosphäre, in der du groß wurdest","a":{"haeuser":[4],"punkte":["Mond","Pluto","Neptun","Saturn"]}},{"n":"Was dich genährt hat","a":{"haeuser":[4],"punkte":["Mond","Venus","Ceres"]}},{"n":"Autorität und Anspruch","a":{"haeuser":[10],"punkte":["Saturn","Sonne","Pluto"]}},{"n":"Was nie ausgesprochen wurde","a":{"haeuser":[8,12],"punkte":["Pluto","Neptun"]}},{"n":"Was du übernommen hast","a":{"haeuser":[2,4],"punkte":["Saturn","Mond","Knoten"]}},{"n":"Geschwister und Nahbereich","a":{"haeuser":[3],"punkte":["Merkur","Mars"]}},{"n":"Was du daraus machst","a":{"haeuser":[10,9],"punkte":["Knoten","MC","Jupiter"]}}]},"koerper":{"n":"Körper","f":[{"n":"Wie du im Körper bist","a":{"haeuser":[1],"punkte":["ASC","Mars","Mond"]}},{"n":"Deine Energie und Bewegung","a":{"haeuser":[1,6],"punkte":["Mars","Sonne","Jupiter"]}},{"n":"Wo Anspannung sich zeigt","a":{"haeuser":[6,12],"punkte":["Saturn","Mond","Mars","Chiron"]}},{"n":"Schlaf und Zur-Ruhe-Kommen","a":{"haeuser":[4,12],"punkte":["Mond","Neptun","Merkur","Uranus"]}},{"n":"Genuss und Versorgung","a":{"haeuser":[2,5],"punkte":["Venus","Jupiter","Mond"]}},{"n":"Auf den Körper hören","a":{"haeuser":[6,12],"punkte":["Mond","Neptun","Chiron"]}}]},"naehe":{"n":"Nähe","f":[{"n":"Was dich anzieht","a":{"haeuser":[5],"punkte":["Venus","Mars"]}},{"n":"Was du im Gegenüber suchst","a":{"haeuser":[7],"punkte":["Saturn","Uranus","Juno"]}},{"n":"Wie viel Nähe du zulässt","a":{"haeuser":[4,8],"punkte":["Mond","Saturn","Uranus"]}},{"n":"Wie du streitest","a":{"haeuser":[3,7],"punkte":["Mars","Merkur"]}},{"n":"Begehren und Körper","a":{"haeuser":[8,5],"punkte":["Mars","Venus","Lilith","Pluto"]}},{"n":"Was sich wiederholt","a":{"haeuser":[7,12],"punkte":["Saturn","Pluto","Chiron","Neptun"]}},{"n":"Was du brauchst, um zu bleiben","a":{"haeuser":[4,2],"punkte":["Mond","Venus","Saturn","Juno"]}}]},"selbstwert":{"n":"Selbstwert","f":[{"n":"Geld und Preise","a":{"haeuser":[2],"punkte":["Venus","Saturn","Jupiter"]}},{"n":"Körper und Erscheinung","a":{"haeuser":[1],"punkte":["Venus","Mars","ASC"]}},{"n":"Leistung und Genügen","a":{"haeuser":[10,6],"punkte":["Saturn","Chiron","Sonne"]}},{"n":"Grenzen und Nein sagen","a":{"haeuser":[1,7],"punkte":["Mars","Saturn"]}},{"n":"Raum einnehmen","a":{"haeuser":[5,1],"punkte":["Sonne","Lilith","Jupiter"]}},{"n":"Geteiltes und Abhängigkeit","a":{"haeuser":[8],"punkte":["Pluto","Venus","Saturn"]}},{"n":"Sätze aus der Herkunft","a":{"haeuser":[4],"punkte":["Mond","Saturn","Pluto","IC"]}}]},"sicherheit":{"n":"Sicherheit & Fallenlassen","f":[{"n":"Was Sicherheit für dich bedeutet","a":{"haeuser":[4],"punkte":["Mond","Saturn","Neptun"]}},{"n":"Nein sagen können","a":{"haeuser":[1,7],"punkte":["Mars","Saturn"]}},{"n":"Was du dir nicht erlaubst","a":{"haeuser":[8,5],"punkte":["Lilith","Venus","Mars"]}},{"n":"Kontrolle und Loslassen","a":{"haeuser":[8,12],"punkte":["Pluto","Saturn","Neptun","Uranus"]}},{"n":"Darüber sprechen können","a":{"haeuser":[3,7],"punkte":["Merkur","Venus"]}},{"n":"Im Körper sein","a":{"haeuser":[1,6],"punkte":["ASC","Venus","Mars","Neptun"]}},{"n":"Wie dein Begehren anspringt","a":{"haeuser":[5,8],"punkte":["Mars","Venus","Pluto"]}},{"n":"Deine Bremsen und Beschleuniger","a":{"haeuser":[6,12],"punkte":["Saturn","Neptun","Mond","Uranus"]}},{"n":"Was dir gefällt","a":{"haeuser":[5,8],"punkte":["Venus","Mars","Lilith"]}},{"n":"Was du danach brauchst","a":{"haeuser":[4,12],"punkte":["Mond","Neptun","Saturn"]}}]},"unerlaubte":{"n":"Das Unerlaubte","f":[{"n":"Was du dir nicht erlaubst","a":{"haeuser":[],"punkte":["Lilith","Sonne","ASC"]}},{"n":"Wie du es verbirgst","a":{"haeuser":[12],"punkte":["Lilith","Saturn","Neptun"]}},{"n":"Wo es trotzdem rauskommt","a":{"haeuser":[1,8],"punkte":["Lilith","Mars","Uranus","Pluto"]}},{"n":"Was es dich kostet","a":{"haeuser":[2,6],"punkte":["Lilith","Saturn","Mond"]}},{"n":"Wie andere reagieren","a":{"haeuser":[7,11],"punkte":["Lilith","ASC","Venus"]}},{"n":"Deine ungenutzte Kraft","a":{"haeuser":[8,5],"punkte":["Lilith","Pluto","Mars","Sonne"]}}]},"versorgung":{"n":"Versorgung","f":[{"n":"Essen und Versorgung","a":{"haeuser":[6,2],"punkte":["Mond","Saturn","Venus"]}},{"n":"Trinken","a":{"haeuser":[6],"punkte":["Mond","Neptun","Merkur"]}},{"n":"Papierkram und Behörden","a":{"haeuser":[6,3],"punkte":["Merkur","Saturn"]}},{"n":"Lernen und Dranbleiben","a":{"haeuser":[3,9],"punkte":["Merkur","Jupiter","Uranus"]}},{"n":"Haushalt und Wohnung","a":{"haeuser":[4,6],"punkte":["Mond","Venus","Saturn"]}},{"n":"Schlaf und Abschalten","a":{"haeuser":[12,4],"punkte":["Mond","Uranus","Merkur","Neptun"]}}]},"wunder-punkt":{"n":"Der wunde Punkt","f":[{"n":"Wo es zuverlässig wehtut","a":{"haeuser":[],"punkte":["Chiron","Sonne","Mond","ASC"]}},{"n":"Was du deshalb vermeidest","a":{"haeuser":[12],"punkte":["Chiron","Saturn","Neptun"]}},{"n":"Womit du es überdeckst","a":{"haeuser":[10,6],"punkte":["Chiron","Saturn","Sonne","Mars"]}},{"n":"Was tatsächlich hilft","a":{"haeuser":[],"punkte":["Venus","Jupiter","Mond","Chiron"]}},{"n":"Warum andere dir das glauben","a":{"haeuser":[11,9],"punkte":["Chiron","Jupiter","Merkur"]}},{"n":"Wann es wieder aufbricht","a":{"haeuser":[],"punkte":["Chiron","Saturn"]}}]},"zugehoerigkeit":{"n":"Zugehörigkeit","f":[{"n":"Wie du in Gruppen bist","a":{"haeuser":[11],"punkte":["Uranus","Saturn","Sonne"]}},{"n":"Was dich das Dazugehören kostet","a":{"haeuser":[1,12],"punkte":["Lilith","Saturn","Neptun","ASC"]}},{"n":"Deine Freundschaften","a":{"haeuser":[11,3],"punkte":["Venus","Merkur","Mond"]}},{"n":"Welche Rolle du übernimmst","a":{"haeuser":[6,10],"punkte":["Saturn","Mars","Sonne"]}},{"n":"Das Gefühl, nicht dazuzugehören","a":{"haeuser":[12,11],"punkte":["Uranus","Chiron","Neptun","Saturn"]}},{"n":"Wofür du gebraucht wirst","a":{"haeuser":[11,6],"punkte":["Jupiter","Sonne","Merkur"]}}]}};
/* Die Räume-Übersicht nach dem Chart sortiert (18.11.).
   Jeder Raum bekommt die Summe seiner zwei lautesten Facetten; der
   lauteste Raum ist 100. Dazu steht auf der Karte, welche Facette bei
   dir am lautesten ist. Texte stehen in RS_T, nicht im Ablauf. */
var RS_T={
  lautest:'Bei dir am lautesten: ',
  zuerst:'Für dich zuerst',
  kopf:'Sortiert nach deinem Bild',
  kopfZu:'Oben steht, was bei dir am meisten Gewicht hat. Unten, was du getrost später aufmachen kannst.',
  leise:'eher leise bei dir'
};
(function(){
  function los(){
    if(!window.AC_RAUM || !window.AC_P) return setTimeout(los, 30);
    var p=null; try{ p=AC_P.aktives(); }catch(e){}
    if(!p) return;
    var P; try{ P=AC_RAUM.chart(p); }catch(e){ return; }
    var werte=[];
    Object.keys(RS_ANKER).forEach(function(k){
      var def={facetten:RS_ANKER[k].f.map(function(f){ return {name:f.n, anker:f.a}; })};
      var res=[]; try{ res=AC_RAUM.auswerten(P, def); }catch(e){}
      if(!res.length) return;
      werte.push({k:k, s:res[0].s+(res[1]?res[1].s*0.6:0), top:res[0].fc.name});
    });
    if(!werte.length) return;
    werte.sort(function(a,b){ return b.s-a.s; });
    var max=werte[0].s||1;
    var gitter=document.querySelector('.rl-gitter'); if(!gitter) return;
    werte.forEach(function(w,i){
      var karte=document.querySelector('a.rk[href="raum-'+w.k+'.html"]'); if(!karte) return;
      var rel=Math.round(w.s/max*100);
      var alt=karte.querySelector('.rk-du'); if(alt) alt.remove();
      var du=document.createElement('div'); du.className='rk-du';
      var b=document.createElement('span'); b.className='rk-balken';
      var f=document.createElement('i'); f.style.width=Math.max(6,rel)+'%'; b.appendChild(f);
      var z=document.createElement('span'); z.className='rk-zeile';
      z.textContent=rel<45 ? RS_T.leise : RS_T.lautest+w.top;
      du.appendChild(b); du.appendChild(z);
      karte.appendChild(du);
      karte.classList.toggle('rk-zuerst', i<3);
      karte.classList.toggle('rk-leise', rel<45);
      var m=karte.querySelector('.rk-marke');
      if(m){ if(i<3){ m.textContent=RS_T.zuerst; m.hidden=false; } else m.hidden=true; }
      gitter.appendChild(karte);
    });
    var k=document.getElementById('rlkopf');
    if(k){ k.hidden=false;
      k.querySelector('b').textContent=RS_T.kopf;
      k.querySelector('span').textContent=RS_T.kopfZu; }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', los);
  else los();
})();
