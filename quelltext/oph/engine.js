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
var ELF=['#B5502E','#6B7C3F','#3E7C9A','#6A4A62'];
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

