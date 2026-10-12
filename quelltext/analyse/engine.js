/* Astro-Charlie · Die Analyse-Engine
   ==================================================================
   Kein Nachschlagewerk, sondern eine Rechnung.

   Ein Thema sagt, welche Häuser, Planeten und Achsen für eine Frage
   zählen. Ein Regelsatz erkennt Kombinationen — nicht einzelne
   Stellungen, sondern ihr Zusammentreffen. Die Engine lässt alle
   Regeln laufen, gewichtet die Treffer und baut daraus ein Ergebnis.

   Regeln arbeiten über ein Chart (modus 'solo') oder über zwei
   (modus 'paar'). Jede Regel liefert einen Befund mit einer Art:

     bild      was für ein Fall das überhaupt ist
     nenner    worauf beide sich treffen können
     staerke   was trägt
     reibung   wo es hakt — immer mit einem Ansatz
     aufgabe   was konkret zu tun ist
     beratung  Hinweise für die Coachin, nicht für die Klientin

   Die Engine entscheidet nichts über Inhalte. Sie zählt, sortiert
   und stellt zusammen; alles Inhaltliche steht in den Themendateien. */
(function(){
'use strict';

function nrm(x){ x=x%360; return x<0?x+360:x; }

var ZEICHEN=['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion',
 'Schütze','Steinbock','Wassermann','Fische'];
var ELEMENT=['Feuer','Erde','Luft','Wasser'];
var MODUS=['kardinal','fix','veränderlich'];
var HERRSCHER=['Mars','Venus','Merkur','Mond','Sonne','Merkur','Venus','Mars',
 'Jupiter','Saturn','Saturn','Jupiter'];
var PLANETEN=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn',
 'Uranus','Neptun','Pluto'];
var PERSOENLICH=['Sonne','Mond','Merkur','Venus','Mars'];
var DOMIZIL={Mars:[0,7],Venus:[1,6],Merkur:[2,5],Mond:[3],Sonne:[4],Jupiter:[8,11],Saturn:[9,10]};
var ERHOEHUNG={Sonne:0,Mond:1,Merkur:5,Venus:11,Mars:9,Jupiter:3,Saturn:6};
var WINKEL=[[0,'Konjunktion','weich'],[60,'Sextil','weich'],[90,'Quadrat','hart'],
 [120,'Trigon','weich'],[180,'Opposition','hart']];

/* ── Hilfen, die jede Regel bekommt ──────────────────────────── */
var H={
  ZEICHEN:ZEICHEN, ELEMENT:ELEMENT, MODUS:MODUS, HERRSCHER:HERRSCHER,
  PLANETEN:PLANETEN, PERSOENLICH:PERSOENLICH,

  zi:function(l){ return Math.floor(nrm(l)/30); },
  zeichen:function(l){ return ZEICHEN[H.zi(l)]; },
  elem:function(l){ return ELEMENT[H.zi(l)%4]; },
  mod:function(l){ return MODUS[H.zi(l)%3]; },
  grad:function(l){ l=nrm(l); var r=l-Math.floor(l/30)*30, g=Math.floor(r),
    m=Math.round((r-g)*60); if(m===60){g++;m=0;} return g+'°'+(m<10?'0':'')+m+'′'; },
  stellung:function(l){ return H.grad(l)+' '+H.zeichen(l); },

  /* Whole Sign */
  haus:function(C,l){
    if(C.ASC===undefined) return 0;
    return ((Math.floor(nrm(l)/30)-Math.floor(nrm(C.ASC)/30))%12+12)%12+1; },
  wo:function(C,pl){ return (C[pl]===undefined)?0:H.haus(C,C[pl]); },
  hausZeichen:function(C,h){
    if(C.ASC===undefined) return -1;
    return (Math.floor(nrm(C.ASC)/30)+h-1)%12; },
  herrVon:function(C,h){ var z=H.hausZeichen(C,h); return z<0?null:HERRSCHER[z]; },
  /* Wo steht der Herrscher eines Hauses */
  herrIn:function(C,h){ var p=H.herrVon(C,h); return p?H.wo(C,p):0; },

  /* Wer steht in einem Haus */
  drin:function(C,h,liste){
    return (liste||PLANETEN).filter(function(k){
      return C[k]!==undefined && H.haus(C,C[k])===h; }); },

  /* Aspekt innerhalb eines Charts */
  asp:function(C,a,b,orb){
    if(C[a]===undefined||C[b]===undefined) return null;
    var d=Math.abs(nrm(C[a]-C[b])); if(d>180) d=360-d;
    for(var i=0;i<WINKEL.length;i++){
      var W=WINKEL[i], o=Math.abs(d-W[0]);
      var max=(orb===undefined)?((W[0]===0||W[0]===180)?7:5):orb;
      if(o<=max) return {typ:W[1], art:W[2], orb:o, naehe:1-(o/max)};
    }
    return null; },

  /* Aspekt zwischen zwei Charts — A[pa] zu B[pb] */
  syn:function(A,B,pa,pb,orb){
    if(A[pa]===undefined||B[pb]===undefined) return null;
    var d=Math.abs(nrm(A[pa]-B[pb])); if(d>180) d=360-d;
    for(var i=0;i<WINKEL.length;i++){
      var W=WINKEL[i], o=Math.abs(d-W[0]);
      var max=(orb===undefined)?((W[0]===0||W[0]===180)?7:5):orb;
      if(o<=max) return {typ:W[1], art:W[2], orb:o, naehe:1-(o/max)};
    }
    return null; },
  /* Derselbe Kontakt, egal in welcher Richtung er auftritt */
  synBeide:function(A,B,p1,p2,orb){
    return H.syn(A,B,p1,p2,orb) || H.syn(A,B,p2,p1,orb); },

  /* A's Planet fällt in B's Haus */
  ueber:function(A,B,pl){
    if(A[pl]===undefined||B.ASC===undefined) return 0;
    return H.haus(B,A[pl]); },

  /* Würde */
  wuerde:function(pl,z){
    var d=DOMIZIL[pl];
    if(d&&d.indexOf(z)>=0) return 'domizil';
    if(ERHOEHUNG[pl]===z) return 'erhoehung';
    var ex=!!(d&&d.indexOf((z+6)%12)>=0), fa=(ERHOEHUNG[pl]===((z+6)%12));
    if(ex&&fa) return 'exilfall';
    return ex?'exil':(fa?'fall':''); },

  /* Element- und Modusbilanz, gewichtet */
  bilanz:function(C){
    var g={Sonne:3,Mond:3,ASC:3,MC:2,Merkur:2,Venus:2,Mars:2,
           Jupiter:1.5,Saturn:1.5,Uranus:1,Neptun:1,Pluto:1};
    var e=[0,0,0,0], m=[0,0,0], ges=0;
    Object.keys(g).forEach(function(k){
      if(C[k]===undefined) return;
      var z=H.zi(C[k]); e[z%4]+=g[k]; m[z%3]+=g[k]; ges+=g[k]; });
    function anteil(a){ return a.map(function(x){ return ges?x/ges:0; }); }
    var ea=anteil(e), ma=anteil(m);
    return {elem:e, mod:m, elemAnteil:ea, modAnteil:ma,
      stark:ELEMENT[e.indexOf(Math.max.apply(null,e))],
      schwach:ELEMENT[e.indexOf(Math.min.apply(null,e))],
      modStark:MODUS[m.indexOf(Math.max.apply(null,m))],
      fehlt:ELEMENT.filter(function(n,i){ return ea[i]<0.1; })}; },

  /* Wie stark ist ein Haus besetzt — Planeten plus Herrscherlage */
  gewichtHaus:function(C,h){
    var w=0;
    H.drin(C,h).forEach(function(k){
      w += (PERSOENLICH.indexOf(k)>=0?2:1); });
    if(H.herrIn(C,h)===h) w+=1.5;      /* Herrscher im eigenen Haus */
    if([1,4,7,10].indexOf(h)>=0) w*=1.15;
    return w; },

  /* Stellium: drei oder mehr in einem Haus */
  stellien:function(C){
    var out=[];
    for(var h=1;h<=12;h++){
      var d=H.drin(C,h);
      if(d.length>=3) out.push({haus:h, planeten:d});
    }
    return out; },

  /* Wie viele Planeten über oder unter dem Horizont */
  oben:function(C){
    return PLANETEN.filter(function(k){
      return C[k]!==undefined && H.haus(C,C[k])>=7; }).length; },

  sekte:function(C){ return H.wo(C,'Sonne')>=7 ? 'tag' : 'nacht'; },

  /* Mondphase bei der Geburt, Rudhyar */
  mondphase:function(C){
    if(C.Sonne===undefined||C.Mond===undefined) return -1;
    return Math.floor(nrm(C.Mond-C.Sonne)/45); },

  prozent:function(x){ return Math.round(x*100); },
  kz:function(x,n){ return Number(x).toFixed(n===undefined?1:n).replace('.',','); }
};

/* ── Lauf ─────────────────────────────────────────────────────
   regeln: Array von {id, modus, gewicht, wenn, dann}
   Eine Regel darf null liefern — dann zählt sie nicht.             */
function lauf(regeln, A, B, namen, einstellung){
  var treffer=[], fehler=[];
  regeln.forEach(function(R){
    if(R.modus==='paar' && !B) return;
    if(R.modus==='solo' && B && R.nurOhnePartner) return;
    var passt=false;
    try{ passt=!!R.wenn(A,B,H,namen); }
    catch(e){ fehler.push(R.id+': wenn — '+e.message); return; }
    if(!passt) return;
    var erg=null;
    try{ erg=R.dann(A,B,H,namen); }
    catch(e){ fehler.push(R.id+': dann — '+e.message); return; }
    if(!erg) return;
    erg.id=R.id;
    erg.gewicht=(erg.gewicht!==undefined?erg.gewicht:(R.gewicht||1));
    erg.art=erg.art||'staerke';
    treffer.push(erg);
  });
  treffer.sort(function(x,y){ return y.gewicht-x.gewicht; });
  return {treffer:treffer, fehler:fehler};
}

/* Treffer nach Art gruppieren, je Gruppe gekappt */
function gruppen(treffer, grenzen){
  var g={};
  treffer.forEach(function(t){ (g[t.art]=g[t.art]||[]).push(t); });
  Object.keys(g).forEach(function(k){
    var max=(grenzen&&grenzen[k])||99;
    g[k]=g[k].slice(0,max);
  });
  return g;
}

window.AC_ENGINE={
  H:H, lauf:lauf, gruppen:gruppen,
  ZEICHEN:ZEICHEN, PLANETEN:PLANETEN, HERRSCHER:HERRSCHER
};
})();
