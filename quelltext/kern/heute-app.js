/* Astro-Charlie · Heute — nach Zeitdruck geordnet
   Drei Bänder: was diese Stunde gilt, was diese Woche ein Datum hat,
   und was monatelang läuft und nichts von dir will.                 */
function nrm(x){x=x%360;return x<0?x+360:x;}
function el(i){ return document.getElementById(i); }
function esc(s){ return String(s===undefined||s===null?'':s).replace(/[<>&"]/g,function(c){
 return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }
function zI(l){ return Math.floor(nrm(l)/30); }
function gradKurz(l){ l=nrm(l); var r=l-Math.floor(l/30)*30, g=Math.floor(r),
 m=Math.round((r-g)*60); if(m===60){g++;m=0;} return g+'°'+(m<10?'0':'')+m+'′'; }
function datVon(jd){ return new Date((jd-2440587.5)*86400000); }
function uhr(jd){ return datVon(jd).toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'}); }
function tagKurz(jd){ return datVon(jd).toLocaleDateString('de-DE',
 {weekday:'short',day:'2-digit',month:'2-digit'}); }
function jetztJD(){ var n=new Date();
 return jdFromUT(n.getUTCFullYear(),n.getUTCMonth()+1,n.getUTCDate(),
   n.getUTCHours()+n.getUTCMinutes()/60+n.getUTCSeconds()/3600); }
function tageBis(jd){ return Math.round(jd-jetztJD()); }

var H_SIGNS=['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion',
 'Schütze','Steinbock','Wassermann','Fische'];
var H_HAUS=['Person und Auftreten','Wert und Besitz','Sprache und Nahbereich','Zuhause und Herkunft',
 'Ausdruck und Lust','Alltag und Körper','Partnerschaft','Tiefe und Geteiltes','Sinn und Weite',
 'Beruf und Sichtbarkeit','Gruppen und Ziele','Rückzug und Inneres'];
var H_GEN={Sonne:'der Sonne',Mond:'des Mondes',Merkur:'des Merkur',Venus:'der Venus',
 Mars:'des Mars',Jupiter:'des Jupiter',Saturn:'des Saturn'};
var PN=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];

function chartVon(p){
  var ut=p.h+p.mi/60-p.tz,y=p.y,mo=p.mo,d=p.d;
  if(ut<0){ut+=24;d-=1;} if(ut>=24){ut-=24;d+=1;}
  var jd=jdFromUT(y,mo,d,ut),T=(jd-2451545)/36525,a=angles(jd,p.lat,p.lon);
  return {Sonne:sunLon(T),Mond:moonLon(T),Merkur:geo('Merkur',T),Venus:geo('Venus',T),
   Mars:geo('Mars',T),Jupiter:geo('Jupiter',T),Saturn:geo('Saturn',T),Uranus:geo('Uranus',T),
   Neptun:geo('Neptun',T),Pluto:geo('Pluto',T),ASC:a.asc,MC:a.mc,_jd:jd};
}
function chartZu(jd){
  var T=(jd-2451545)/36525;
  return {Sonne:sunLon(T),Mond:moonLon(T),Merkur:geo('Merkur',T),Venus:geo('Venus',T),
   Mars:geo('Mars',T),Jupiter:geo('Jupiter',T),Saturn:geo('Saturn',T),Uranus:geo('Uranus',T),
   Neptun:geo('Neptun',T),Pluto:geo('Pluto',T),_jd:jd};
}
function haus(P,l){ return ((Math.floor(nrm(l)/30)-Math.floor(nrm(P.ASC)/30))%12+12)%12+1; }

var P=null, Q=null, O=null;

function profil(){ try{ return AC_P.aktives()||AC_P.eigenes(); }catch(e){ return null; } }
function ort(){
  var p=profil();
  if(!p) return {lat:52.52,lon:13.405,name:'Berlin'};
  return {lat:(p.wlat!=null?p.wlat:p.lat), lon:(p.wlon!=null?p.wlon:p.lon),
          name:p.wort||p.ort||''};
}

/* ── Band 1 · Jetzt ───────────────────────────────────────── */
function jetztBauen(p){
  var jd=jetztJD(), n=new Date();
  el('httag').textContent=n.toLocaleDateString('de-DE',
    {weekday:'long',day:'numeric',month:'long',year:'numeric'});
  var std=n.getHours();
  var gruss=std<5?'Noch wach':(std<11?'Guten Morgen':(std<18?'Guten Tag':'Guten Abend'));
  el('htgruss').innerHTML=gruss+', <em>'+esc(AC_P.anzeige(p,true))+'</em>.';

  var st=null; try{ st=AC_HIMMEL.planetenStunde(jd,O.lat,O.lon); }catch(e){}
  var mz=zI(Q.Mond), mh=haus(P,Q.Mond);
  var ol=null; try{ ol=AC_HIMMEL.ohneLauf(jd); }catch(e){}

  /* Der Aufmacher ist das, was als Nächstes wirklich ansteht —
     mit Datum. Vorher stand hier immer der Mondstand; das ist das
     schwächste Signal, das die Seite hat, und es widersprach
     regelmäßig der Terminliste darunter. */
  aufmacherBauen(jd);

  /* Darunter der ruhige Hintergrundsatz: welcher Bereich getönt ist. */
  var B=bereichZuHaus(mh);
  var satz='Im Hintergrund liegt deine Aufmerksamkeit die nächsten zwei Tage bei einem Thema: <b>'+
    esc(B?B.name:H_HAUS[mh-1])+'</b>.';
  if(B&&window.AC_BDAT&&AC_BDAT.BER[B.k])
    satz+=' Also: '+esc(AC_BDAT.BER[B.k].worum);
  if(ol&&ol.leer) satz+=' Dazu kommt: bis '+uhr(ol.bis)+
    ' lohnt sich nichts, was ein Ergebnis haben soll — Angefangenes bleibt heute eher liegen.';
  el('htsatz').innerHTML=satz;
  el('httech').innerHTML='<div class="ac-tech ht-techzeile" data-ab="2">Der Mond steht in '+
    H_SIGNS[mz]+' '+gradKurz(Q.Mond)+
    ' und läuft durch das '+mh+'. Haus — '+H_HAUS[mh-1]+
    (ol&&ol.leer?'. Mond ohne Lauf bis '+uhr(ol.bis):'')+'.</div>';

  /* Die Kacheln sind der Maschinenraum. Sie stehen jetzt in der
     Einstellleiste unten statt im Kopf. */
  var f=[];
  if(st&&!st.polar) f.push(['Stunde',st.herr,'bis '+uhr(st.bis)]);
  if(st&&!st.polar) f.push(['Tag',st.tagesherr,n.toLocaleDateString('de-DE',{weekday:'long'})]);
  f.push(['Mond',H_SIGNS[mz],gradKurz(Q.Mond)]);
  f.push(['Dein Haus',mh+'. Haus',H_HAUS[mh-1]]);
  el('htfakten').innerHTML='<div class="ac-tech" data-ab="2"><div class="ht-fin">'+
    f.map(function(x){
      return '<div class="ht-f"><div class="l">'+x[0]+'</div><div class="v">'+esc(x[1])+
        '</div><div class="z">'+esc(x[2])+'</div></div>'; }).join('')+'</div></div>';
}

/* ── Der Aufmacher ────────────────────────────────────────────
   Nimmt denselben Ereignisstrom wie die Terminliste — keine zweite
   Himmelsrechnung — und hebt den stärksten Termin der nächsten vier
   Tage heraus. Ist keiner da, tritt der lauteste Lebensbereich an
   seine Stelle. Eines von beiden gibt es immer. */
/* Kalendertage, nicht Tagesdifferenz. Um 22:30 ist ein Termin um
   05:13 am nächsten Morgen „morgen" und nicht „heute", auch wenn
   rechnerisch nur sieben Stunden dazwischenliegen. */
function tagesAbstand(jd){
  var a=datVon(jd), b=new Date();
  a=new Date(a.getFullYear(),a.getMonth(),a.getDate());
  b=new Date(b.getFullYear(),b.getMonth(),b.getDate());
  return Math.round((a-b)/86400000);
}
function wann(jd){
  var t=tagesAbstand(jd);
  if(t<=0) return 'Heute';
  if(t===1) return 'Morgen';
  if(t===2) return 'Übermorgen';
  return 'Am ' + datVon(jd).toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long'});
}
var AUFMACHER=null;
function aufmacherBauen(jd){
  var z=el('htaufmacher'); if(!z) return;
  var e=ereignisse(jd).filter(function(x){
    return x.rang && x.jd>=jd-0.02 && x.jd<=jd+4; });
  e.sort(function(a,b){ return (b.rang-a.rang) || (a.jd-b.jd); });

  if(e.length){
    var x=e[0];
    AUFMACHER=x.jd;
    z.innerHTML='<div class="ht-auf-k">'+
      '<div class="ht-auf-w">'+esc(wann(x.jd))+', '+esc(uhr(x.jd))+'</div>'+
      '<h2 class="ht-auf-t">'+esc(x.tt)+'</h2>'+
      '<p class="ht-auf-x">'+x.tx+'</p>'+
      (x.mit?'<div class="ht-auf-m"><b>Dafür brauchst du</b> '+esc(x.mit)+'</div>':'')+
      (x.tech?'<div class="ac-tech ht-auf-tech" data-ab="2">'+esc(x.tech)+'</div>':'')+
      '</div>';
    return;
  }
  /* Kein Termin in Sicht: dann der lauteste Bereich, auch mit Datum. */
  AUFMACHER=null;
  var B=lautesterBereich();
  if(!B){ z.innerHTML=''; return; }
  z.innerHTML='<div class="ht-auf-k ht-auf-ruhig">'+
    '<div class="ht-auf-w">Kein fester Termin in den nächsten Tagen</div>'+
    '<h2 class="ht-auf-t">'+esc(B.name)+'</h2>'+
    '<p class="ht-auf-x">'+esc(B.satz)+'</p>'+
    (B.tun?'<div class="ht-auf-m"><b>Was du tun kannst</b> '+esc(B.tun)+'</div>':'')+
    (B.bis?'<div class="ht-auf-bis">Läuft noch bis '+esc(B.bis)+'</div>':'')+
    '</div>';
}

/* Welcher Lebensbereich gehört zu einem Haus?
   Erst der, dessen Kernhaus es ist, sonst der erste, der es führt. */
function bereichZuHaus(h){
  if(!window.AC_BER) return null;
  var L=AC_BER.BEREICHE, i;
  for(i=0;i<L.length;i++) if(L[i].haeuser[0]===h) return L[i];
  for(i=0;i<L.length;i++) if(L[i].haeuser.indexOf(h)>=0) return L[i];
  return null;
}

/* ── Der Ereignisstrom ────────────────────────────────────────
   Eine Quelle für den Aufmacher oben und die Terminliste darunter.
   `rang` sagt, wie schwer ein Termin wiegt, wenn einer herausgehoben
   werden muss: 0 heißt „taugt nicht als Aufmacher". */
function ereignisse(jd){
  var e=[];

  /* Planetenstunde endet — reine Mechanik, erst ab Stufe 2 */
  var st=null; try{ st=AC_HIMMEL.planetenStunde(jd,O.lat,O.lon); }catch(e2){}
  if(st&&!st.polar) e.push({jd:st.bis, jetzt:true, wann:uhr(st.bis), tag:'heute', ab:2, rang:0,
    tt:'Die Stunde '+(H_GEN[st.herr]||st.herr)+' endet',
    tx:'Planetenstunden sind der kleinste Taktgeber, den die Überlieferung kennt. '+
       'Wenn du etwas unter '+st.herr+' stellen willst, ist jetzt das Fenster.',
    wo:'zauber.html|Planetenstunden heute'});

  /* Mond wechselt das Zeichen und damit dein Haus */
  var zw=null; try{ zw=AC_HIMMEL.naechsterZeichenwechsel(jd); }catch(e2){}
  if(zw){
    var neuH=haus(P, zw.zeichen*30+1), nB=bereichZuHaus(neuH);
    e.push({jd:zw.jd, wann:uhr(zw.jd), tag:tagKurz(zw.jd), rang:1,
      tt:'Die Aufmerksamkeit wandert zu: '+(nB?nB.name:H_HAUS[neuH-1]),
      tx:'Für die nächsten zweieinhalb Tage ist das der Bereich, in dem du am ehesten '+
         'etwas merkst. Kein großer Einschnitt — eher eine Tönung.',
      tech:'Der Mond wechselt in '+H_SIGNS[zw.zeichen]+' und damit in dein '+
           neuH+'. Haus, '+H_HAUS[neuH-1]+'.',
      wo:'bereiche.html|Den Bereich ansehen'});
  }

  /* Lunationen mit Ritualfenster */
  var lun=[]; try{ lun=AC_BOARD.lunationen(jd, jd+40)||[]; }catch(e2){}
  lun.slice(0,3).forEach(function(l){
    var ml=moonLon((l.jd-2451545)/36525);
    var h=haus(P,ml), lB=bereichZuHaus(h);
    var lN=lB?lB.name:H_HAUS[h-1];
    e.push({jd:l.jd, wann:uhr(l.jd), tag:tagKurz(l.jd), rang:4,
      tt:(l.art==='neu'?'Neumond':'Vollmond')+' — bei dir im Bereich '+lN,
      tech:(l.art==='neu'?'Neumond':'Vollmond')+' in '+H_SIGNS[zI(ml)]+
           ', in deinem '+h+'. Haus — '+H_HAUS[h-1]+'.',
      tx:(l.art==='neu'
        ? 'Ein guter Zeitpunkt, in diesem Bereich etwas zu <b>beginnen</b> statt abzuschließen. '+
          'Was jetzt anfängt, hat bis zum Vollmond Zeit, sich zu zeigen.'
        : 'Hier wird sichtbar, was vor zwei Wochen angelegt wurde. Ein guter Zeitpunkt, '+
          'in diesem Bereich etwas <b>abzuschließen</b> statt Neues anzufangen.'),
      mit:(l.art==='neu'
        ? 'Kerze, Zettel und Stift. Einen Satz aufschreiben, was bis zum Vollmond passiert sein soll.'
        : 'Eine Kerze, und etwas, das weg darf. Nicht mehr.'),
      wo:'rituale.html|Das ganze Ritual'});
  });

  /* Stationen: Planeten, die drehen */
  var stn=[]; try{ stn=AC_BOARD.stationen(jd, 21)||[]; }catch(e2){}
  stn.forEach(function(s2){
    var h=haus(P,s2.lon), sB=bereichZuHaus(h), sN=sB?sB.name:H_HAUS[h-1];
    e.push({jd:s2.jd, wann:tageBis(s2.jd)<=0?'heute':'in '+tageBis(s2.jd)+' T.', tag:tagKurz(s2.jd),
      rang:5,
      tt:(s2.direkt?'Es geht wieder voran: ':'Es wird zäher: ')+sN,
      tech:s2.planet+(s2.direkt?' läuft wieder direkt':' wird rückläufig')+
           ', in deinem '+h+'. Haus — '+H_HAUS[h-1]+'.',
      tx:(s2.direkt
         ? 'Was in diesem Bereich seit Wochen zäh war, nimmt wieder Fahrt auf. '+
           'Nicht sofort, aber merklich.'
         : 'In diesem Bereich wird es für eine Weile mühsamer. Nichts Neues anfangen, '+
           'was dort ohnehin hängt — überarbeiten ja.'),
      wo:'bereiche.html#ber-'+(sB?sB.k:'')+'|Den Bereich ansehen'});
  });

  e.sort(function(a,b){ return a.jd-b.jd; });
  return e;
}

/* ── Band 2 · Was als Nächstes ansteht ────────────────────── */
function wocheBauen(){
  var jd=jetztJD();
  var e=ereignisse(jd).filter(function(x){ return x.jd>=jd-0.02 && x.jd<=jd+10; }).slice(0,7);
  if(!e.length){ el('htwoche').innerHTML='<p class="ht-nix">In den nächsten zehn Tagen '+
    'steht nichts Datiertes an. Das kommt vor und ist eine gute Nachricht.</p>'; return; }
  el('htwoche').innerHTML=e.map(function(x){
    /* Was oben schon ausführlich steht, wird hier nur noch
       eingereiht — damit die Reihenfolge stimmt, ohne dass
       derselbe Text zweimal auf der Seite steht. */
    if(AUFMACHER!==null && Math.abs(x.jd-AUFMACHER)<1e-6)
      return '<div class="we we-oben">'+
        '<div class="wann"><b>'+esc(x.wann)+'</b>'+esc(x.tag)+'</div>'+
        '<div class="tt">'+esc(x.tt)+'</div>'+
        '<div class="tx">Steht oben, ganz am Anfang der Seite.</div></div>';
    var wo='';
    if(x.wo){ var t=x.wo.split('|'); wo='<span class="wo"><a href="'+t[0]+'">'+t[1]+' →</a></span>'; }
    /* ab: ganze Einträge, die nur Mechanik sind, erscheinen erst
       ab der genannten Wissensstufe. tech: die Mechanik zu einem
       Eintrag, der auch ohne sie verständlich ist. */
    return '<div class="we'+(x.jetzt?' jetzt':'')+(x.ab?' ac-tech':'')+'"'+
      (x.ab?' data-ab="'+x.ab+'"':'')+'>'+
      '<div class="wann"><b>'+esc(x.wann)+'</b>'+esc(x.tag)+'</div>'+
      '<div class="tt">'+esc(x.tt)+'</div><div class="tx">'+x.tx+'</div>'+
      (x.tech?'<div class="ac-tech" data-ab="2">'+esc(x.tech)+'</div>':'')+
      (x.mit?'<div class="mit"><b>Dafür brauchst du</b>'+esc(x.mit)+'</div>':'')+wo+'</div>';
  }).join('');
}

/* ── Band 3 · Die lautesten Bereiche ──────────────────────────
   Dasselbe Wissen wie die alte Planetentabelle, nur als das, was
   es für einen Menschen bedeutet. Die Tiefe steht auf bereiche.html;
   hier stehen nur die drei lautesten und einer, der still ist. */
var BL_CACHE=null, BL_ALLE=null;

/* Wie lange läuft das noch? Nimmt das Fenster des stärksten laufenden
   Vorgangs. Ohne Datum ist eine laute Phase nur ein Gefühl — die
   Regel „mit Datum, nicht bald" gilt auch im Kurzblick. */
function bisWann(b, jd){
  if(!b.laeuft || !b.laeuft.length) return null;
  var v=b.laeuft[0], f=v.f;
  if(!f || !f.bis) return null;
  var t=Math.round(f.bis-jd);
  if(t<0) return null;
  var dat=datVon(f.bis).toLocaleDateString('de-DE',
    {day:'numeric',month:'long',year:'numeric'});
  /* Ein Datum trägt nur, solange man es sich merken kann. Weiter
     draußen sagt die Dauer mehr als der Tag. Und ab einem Jahr ist
     ein tagesgenaues Datum falsche Genauigkeit: Was so lange läuft,
     ist eine Welle und kein Fenster. (REGELN.md §4) */
  if(t>365) return 'läuft noch Jahre — eine lange Welle, kein Fenster';
  if(f.bisOffen) return 'mindestens bis ' + dat;
  if(t===0) return 'nur noch heute';
  if(t===1) return 'bis morgen';
  if(t<=28) return 'bis ' + dat + ', noch ' + t + ' Tage';
  if(t<=70) return 'noch etwa ' + Math.round(t/7) + ' Wochen, bis ' + dat;
  return 'noch etwa ' + Math.round(t/30) + ' Monate, bis ' + dat;
}

/* Der Handgriff eines Bereichs — nie zweimal derselbe in der Liste. */
function handgriff(b, schon){
  if(b.laut===0 || !b.laeuft.length)
    return 'Hier arbeitet gerade nichts gegen dich. Wenn du in diesem Bereich etwas '+
           'vorhast, ist jetzt der Moment, es selbst anzufangen.';
  for(var i=0;i<b.laeuft.length;i++){
    var W=AC_BDAT.WAND[b.laeuft[i].wanderer];
    if(W && !schon[W.tun]){ schon[W.tun]=true; return W.tun; }
  }
  return 'Was hier läuft, läuft wie in den Bereichen darüber — '+
         'auf der Bereichsseite steht, was es hier bedeutet.';
}

function lautesterBereich(){
  if(!BL_CACHE || !BL_CACHE.length) return null;
  var b=BL_CACHE[0], T=AC_BDAT.BER[b.k];
  if(!T) return null;
  return { name:b.name, satz:T.lautSatz[b.laut], tun:handgriff(b,{}),
           bis:bisWann(b, jetztJD()) };
}

function bereicheBauen(p){
  var ziel=el('htber');
  if(!ziel) return;
  if(!window.AC_BER||!window.AC_BDAT){ ziel.innerHTML=''; return; }

  var jd=jetztJD();
  var jdGeb=jdFromUT(p.y,p.mo,p.d,p.h+p.mi/60-p.tz);
  var gebDat=new Date(Date.UTC(p.y,p.mo-1,p.d,p.h-p.tz,p.mi));
  var Z=null;
  try{ if(window.AC_ZEIT) Z=AC_ZEIT.blatt(P,jdGeb,gebDat,new Date()); }catch(e){}

  var Bl=AC_BER.blatt(P,jd,Z,jd-jdGeb);
  var bs=Bl.bereiche.slice().sort(function(a,b){
    if(b.laut!==a.laut) return b.laut-a.laut;
    return b.laeuft.length-a.laeuft.length;
  });
  /* Nur die Bereiche, die dieser Mensch sehen will. Die Auswahl
     liegt in AC_P und gilt plattformweit; keine Auswahl heißt alle. */
  try{
    if(window.AC_WAHL){
      var gew=bs.filter(function(b){ return AC_WAHL.istGewaehlt(b.k); });
      if(gew.length) bs=gew;
    }
  }catch(e){}
  BL_CACHE=bs; BL_ALLE=Bl.alle;

  /* Wer Bereiche abwählt, soll nicht glauben, dort sei Ruhe.
     Gerechnet wird weiter alles — hier steht, dass ausgeblendet wird. */
  var hin=el('htbwhin');
  if(hin){
    var n=bs.length;
    if(n<Bl.bereiche.length){
      hin.textContent='Du siehst '+n+' von '+Bl.bereiche.length+' Bereichen. '+
        'Die übrigen sind ausgeblendet. Gerechnet werden sie weiter — dort kann also '+
        'einiges los sein, ohne dass du es hier siehst. '+
        'Unter „Seite einstellen\u201c kannst du das ändern.';
      hin.hidden=false;
    } else { hin.textContent=''; hin.hidden=true; }
  }

  var zeigen=bs.slice(0,3), schon={};
  /* Ein stiller Bereich am Ende: das ist die nützlichste Zeile
     der Liste, weil dort gerade nichts gegen einen arbeitet. */
  var still=bs[bs.length-1];
  if(still && zeigen.indexOf(still)<0 && still.laut<=1) zeigen.push(still);

  ziel.innerHTML=zeigen.map(function(b,i){
    var T=AC_BDAT.BER[b.k], L=AC_BDAT.LAUT[b.laut];
    if(!T) return '';
    var tun=handgriff(b, schon), bis=bisWann(b, jd);
    /* Der erste bekommt Gewicht. Eine Liste, in der alles gleich
       aussieht, sagt nicht, womit man anfangen soll. */
    var gross=(i===0);
    return '<a class="ht-b'+(gross?' ht-b-gross':'')+'" href="bereiche.html#ber-'+esc(b.k)+'">'+
      '<span class="ht-bp" style="background:'+L.farbe+'"></span>'+
      '<span class="ht-bn">'+esc(b.name)+'</span>'+
      '<span class="ht-bl" style="color:'+L.farbe+'">'+esc(L.n)+'</span>'+
      '<span class="ht-bs">'+esc(T.lautSatz[b.laut])+'</span>'+
      '<span class="ht-bz"><span class="ht-bz-l">Was du tun kannst</span>'+
      '<span class="ht-bt">'+esc(tun)+'</span></span>'+
      (bis?'<span class="ht-bbis"><span class="ht-bz-l">Wie lange</span>'+
           '<span class="ht-bbis-v">'+esc(bis)+'</span></span>':'')+
      '</a>';
  }).join('');
}

/* ── Band: Was gerade läuft ───────────────────────────────────
   Die stärksten Konstellationen über alle Lebensbereiche hinweg.
   Der Rechner liefert sie samt Gewicht und Fenster; bis zum 28.10.
   wurden sie nirgends gezeigt. Mandy: "Die Heute seite hat fast
   keine coolen Aspekte mehr."

   Die Regel "Inhalt statt Maschinenraum" heißt: nicht damit
   anfangen. Sie heißt nicht: weglassen. Ab Stufe 2 steht der
   Aspekt deshalb im Klartext darunter. */
var LAUF_ZEIGE = 5;

function monatTag(jd){
  return datVon(jd).toLocaleDateString('de-DE',{day:'numeric',month:'long'});
}
/* Wie weit ist das Fenster durch? Gibt null, wenn es keinen Anfang
   hat — dann ist der Balken eine Behauptung und bleibt weg. */
function fensterStand(f, jd){
  if(!f || f.von === null || f.von === undefined || !f.bis) return null;
  var ganz = f.bis - f.von;
  if(!(ganz > 0)) return null;
  return { anteil: Math.max(0, Math.min(1, (jd - f.von) / ganz)),
           exakt: (f.exakt && f.exakt >= f.von && f.exakt <= f.bis)
                  ? (f.exakt - f.von) / ganz : null };
}
function laufSatz(v){
  var W = AC_BDAT.WAND[v.wanderer];
  if(!W) return null;
  if(v.form === 'durchgang') return W.was;
  var A = AC_BDAT.ART[v.art];
  return A ? (W.was + ' ' + A.wie) : W.was;
}
/* Der Rechner schreibt die Aspekte klein. Im Deutschen sind das
   Substantive. Eine Liste statt einer Umschaltung: toLowerCase und
   Verwandte sind in diesem Projekt verboten, und zwar zu Recht. */
var ASP_NAME = { konjunktion:'Konjunktion', opposition:'Opposition',
  quadrat:'Quadrat', trigon:'Trigon', sextil:'Sextil' };
function aspektName(k){ return ASP_NAME[k] || k; }

function laufTech(v){
  if(v.form === 'durchgang')
    return v.wanderer + ' läuft durch das ' + v.haus + '. Haus' +
           (v.rueck ? ', rückläufig' : '');
  var t = v.wanderer + ' ' + aspektName(v.aspekt) + ' ' +
          (v.zielArt === 'achse' ? v.ziel : 'Radix-' + v.ziel);
  t += ', ' + v.ab.toFixed(1).replace('.', ',') + '° vom genauen Stand';
  t += v.zu ? ', zulaufend' : ', weggehend';
  if(v.rueck) t += ', rückläufig';
  return t;
}
function laufBauen(p){
  var ziel = el('htlauf');
  if(!ziel) return;
  if(!window.AC_BER || !window.AC_BDAT || !BL_ALLE){ ziel.innerHTML = ''; return; }
  var jd = jetztJD();

  /* Ein Aspekt ist ein Ereignis, ein Hausdurchgang ist Wetter.
     Dieser Abschnitt handelt von Ereignissen — sonst stehen hier
     fünf Zeilen "läuft durch das 7. Haus" ohne einen einzigen Tag.
     Durchgänge füllen nur auf, wenn es zu wenige Aspekte gibt. */
  var nachGewicht = function(a,b){ return b.gewicht - a.gewicht; };
  var asp = BL_ALLE.filter(function(v){ return v.form === 'aspekt'; }).sort(nachGewicht);
  var dur = BL_ALLE.filter(function(v){ return v.form !== 'aspekt'; }).sort(nachGewicht);

  /* Höchstens ein Eintrag je Wanderer. Sonst stehen drei Karten
     untereinander, die wortwörtlich denselben Satz sagen — der Text
     hängt am Wanderer, nicht am Ziel. Dieselbe Fehlerklasse, die auf
     der Bereichsseite schon abgefangen wird.
     Was ein Wanderer sonst noch berührt, steht als Zeile darunter. */
  var proWanderer = {}, vs = [];
  asp.forEach(function(v){
    var k = v.wanderer;
    if(proWanderer[k]){ proWanderer[k].weitere.push(v); return; }
    if(vs.length >= LAUF_ZEIGE) return;
    proWanderer[k] = { haupt:v, weitere:[] };
    vs.push(v);
  });
  if(vs.length < 3){
    dur.forEach(function(v){
      if(vs.length >= 3 || proWanderer[v.wanderer]) return;
      proWanderer[v.wanderer] = { haupt:v, weitere:[] };
      vs.push(v);
    });
  }
  if(!vs.length){
    ziel.innerHTML = '<p class="ht-nix">Gerade trifft nichts Größeres auf dein ' +
      'Geburtsbild. Das ist der Normalfall und kommt häufiger vor als das Gegenteil.</p>';
    return;
  }
  ziel.innerHTML = vs.map(function(v, i){
    var B = bereichZuHaus(v.haeuser && v.haeuser[0]);
    var satz = laufSatz(v);
    if(!satz) return '';
    var st = fensterStand(v.f, jd);
    var h = ['<a class="lf' + (i === 0 ? ' lf-haupt' : '') + '" href="bereiche.html#ber-' +
             esc(B ? B.k : '') + '">'];
    h.push('<div class="lf-kopf">');
    h.push('<span class="lf-ber">' + esc(B ? B.name : H_HAUS[(v.haeuser && v.haeuser[0] || 1)-1]) + '</span>');
    if(v.f && v.f.exakt){
      var t = tagesAbstand(v.f.exakt);
      h.push('<span class="lf-wann">' +
        (t === 0 ? 'heute genau' : t === 1 ? 'morgen genau'
         : t > 0 ? 'genau am ' + esc(monatTag(v.f.exakt))
         : 'genau war am ' + esc(monatTag(v.f.exakt))) + '</span>');
    } else if(v.f && v.f.bis){
      h.push('<span class="lf-wann">bis ' + esc(monatTag(v.f.bis)) + '</span>');
    }
    h.push('</div>');
    h.push('<p class="lf-was">' + esc(satz) + '</p>');
    if(st){
      h.push('<div class="lf-bahn"><i class="lf-jetzt" style="left:' +
             (st.anteil*100).toFixed(1) + '%"></i>' +
             (st.exakt !== null ? '<i class="lf-exakt" style="left:' +
                (st.exakt*100).toFixed(1) + '%"></i>' : '') + '</div>');
    }
    /* Was derselbe Wanderer sonst noch berührt — kurz, ohne den
       Satz zu wiederholen. */
    var w = proWanderer[v.wanderer] ? proWanderer[v.wanderer].weitere : [];
    if(w.length){
      var orte = [], eigener = B ? B.name : null;
      w.slice(0,4).forEach(function(x){
        var XB = bereichZuHaus(x.haeuser && x.haeuser[0]);
        var n = XB ? XB.name : null;
        /* Den Bereich, auf dem die Karte ohnehin steht, nicht noch
           einmal aufzählen. */
        if(n && n !== eigener && orte.indexOf(n) < 0) orte.push(n);
      });
      if(orte.length)
        h.push('<p class="lf-auch">Dasselbe wirkt gerade auch auf: ' +
               esc(orte.join(', ')) + '</p>');
    }
    h.push('<p class="lf-tech ac-tech" data-ab="2">' + esc(laufTech(v)) +
      (w.length ? ' · dazu ' + esc(String(w.length)) + ' weitere mit ' +
                  esc(v.wanderer) : '') + '</p>');
    h.push('</a>');
    return h.join('');
  }).join('');
}

/* ── Rad ──────────────────────────────────────────────────── */
function radBauen(){
  window.AC_KERNRAD({el:el('htrad'), chart:P, transit:Q, gross:false, zeichenband:false});
}

/* ── Kapazität ────────────────────────────────────────────── */
var KAP='ac_kap_heute';
function kapHeute(){
  try{ var d=JSON.parse(localStorage.getItem(KAP)||'null'), n=new Date();
    if(d&&d.d===n.getFullYear()+'-'+(n.getMonth()+1)+'-'+n.getDate()) return d.s;
  }catch(e){} return null;
}
function kapSetzen(s){
  try{ var n=new Date();
    localStorage.setItem(KAP,JSON.stringify({d:n.getFullYear()+'-'+(n.getMonth()+1)+'-'+n.getDate(),s:s}));
  }catch(e){}
  kapBauen(); anwenden(); stellBauen();
}
function kapBauen(){
  var a=kapHeute();
  el('htkapr').innerHTML=[['wenig','ein Satz'],['mittel','das Wichtigste'],['viel','alles']]
    .map(function(x){
      return '<button type="button" class="kb'+(a===x[0]?' ist':'')+'" data-k="'+x[0]+'">'+
        '<span class="n">'+x[0].charAt(0).toUpperCase()+x[0].slice(1)+'</span>'+
        '<span class="u">'+x[1]+'</span></button>'; }).join('');
  Array.prototype.forEach.call(el('htkapr').querySelectorAll('.kb'),function(b){
    b.addEventListener('click',function(){ kapSetzen(b.getAttribute('data-k')); });
  });
}
/* Bei „wenig" bleiben der Kopf und die Bereiche stehen —
   die Terminliste ist das, was sich am ehesten weglassen lässt. */
function anwenden(){
  var a=kapHeute(), knapp=(a==='wenig');
  ['htwocheteil'].forEach(function(i){
    var e=el(i); if(e) e.hidden=knapp; });
}

/* ── Die Einstellleiste sagt zu, was eingestellt ist ──────── */
function stellBauen(){
  var u=el('htstellu'); if(!u) return;
  var t=[];
  try{ if(window.AC_NIV) t.push(['Neu','Wenig','Mittel','Viel','Pro'][AC_NIV.stufe()]); }catch(e){}
  try{ if(window.AC_WAHL){ var g=AC_WAHL.gewaehlte&&AC_WAHL.gewaehlte();
    t.push(g&&g.length?g.length+' von zehn Bereichen':'alle zehn Bereiche'); } }catch(e){}
  var k=kapHeute(); if(k) t.push('heute: '+k);
  u.textContent=t.join(' · ');
}

/* ── Start ────────────────────────────────────────────────── */
(function(){
  var p=profil();
  if(!p){
    el('htinhalt').innerHTML='<div class="ht-leer">Noch kein Profil angelegt. '+
      '<a href="profile.html">Hier legst du eins an</a> — ohne Geburtszeit und Geburtsort '+
      'kann diese Seite den Himmel nicht auf dich beziehen.</div>';
    var j=el('htjetzt'); if(j) j.hidden=true;
    return;
  }
  P=chartVon(p); Q=chartZu(jetztJD()); O=ort();
  bereicheBauen(p); laufBauen(p); jetztBauen(p); radBauen(); wocheBauen();
  kapBauen(); anwenden(); stellBauen();
  try{ if(window.AC_NIV) AC_NIV.leiste(el('nivleiste'), function(){
    bereicheBauen(p); laufBauen(p); jetztBauen(p); wocheBauen(); stellBauen(); }); }catch(e){}
  /* Wählt jemand hier oder auf einer anderen Seite andere Bereiche,
     wird der Kurzblick neu gezeichnet. */
  try{ window.addEventListener('ac-bereiche',function(){
    bereicheBauen(p); laufBauen(p); jetztBauen(p); stellBauen(); }); }catch(e){}
  try{ if(window.AC_NIV) AC_NIV.anwenden(); }catch(e){}
  setInterval(function(){ Q=chartZu(jetztJD()); bereicheBauen(p); jetztBauen(p);
    try{ if(window.AC_NIV) AC_NIV.anwenden(); }catch(e){} }, 60000);
})();
