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

/* H_SIGNS, H_HAUS, H_GEN, H_MONAT, H_WOKURZ und H_WOLANG stehen in
   heute-daten.js. Hier steht kein Text — auch keine Namensliste. */

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
  var std=n.getHours(), G=H_SEITE.gruss;
  var gruss=std<5?G.nacht:(std<11?G.morgen:(std<18?G.tag:G.abend));
  el('htgruss').innerHTML=tf(G.zeile,
    {gruss:esc(gruss), name:esc(AC_P.anzeige(p,true))});

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
  var satz=tf(H_SEITE.hintergrund,{thema:esc(B?B.name:H_HAUS[mh-1])});
  if(B&&window.AC_BDAT&&AC_BDAT.BER[B.k])
    satz+=' '+tf(H_SEITE.alsoDazu,{satz:esc(AC_BDAT.BER[B.k].worum)});
  if(ol&&ol.leer) satz+=' '+tf(H_SEITE.ohneLauf,{uhr:uhr(ol.bis)});
  el('htsatz').innerHTML=satz;
  el('httech').innerHTML='<div class="ac-tech ht-techzeile" data-ab="2">'+
    tf(H_SEITE.techMond,{zeichen:H_SIGNS[mz], grad:gradKurz(Q.Mond), haus:mh,
       name:H_HAUS[mh-1],
       nachsatz:(ol&&ol.leer?tf(H_SEITE.techOhneLauf,{uhr:uhr(ol.bis)}):'')})+
    '</div>';

  /* Die Kacheln sind der Maschinenraum. Sie stehen jetzt in der
     Einstellleiste unten statt im Kopf. */
  var f=[], K=H_SEITE.kachel;
  if(st&&!st.polar) f.push([K.stunde,st.herr,tf(K.bis,{uhr:uhr(st.bis)})]);
  if(st&&!st.polar) f.push([K.tag,st.tagesherr,n.toLocaleDateString('de-DE',{weekday:'long'})]);
  f.push([K.mond,H_SIGNS[mz],gradKurz(Q.Mond)]);
  f.push([K.haus,tf(H_SEITE.hausNr,{n:mh}),H_HAUS[mh-1]]);
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
  var t=tagesAbstand(jd), W=H_SEITE.wann;
  if(t<=0) return W.heute;
  if(t===1) return W.morgen;
  if(t===2) return W.uebermorgen;
  return tf(W.am, {tag:datVon(jd).toLocaleDateString('de-DE',
    {weekday:'long',day:'numeric',month:'long'})});
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
      (x.mit?'<div class="ht-auf-m"><b>'+esc(H_SEITE.mitVor)+'</b> '+esc(x.mit)+'</div>':'')+
      (x.tech?'<div class="ac-tech ht-auf-tech" data-ab="2">'+esc(x.tech)+'</div>':'')+
      '</div>';
    return;
  }
  /* Kein Termin in Sicht: dann der lauteste Bereich, auch mit Datum. */
  AUFMACHER=null;
  var B=lautesterBereich();
  if(!B){ z.innerHTML=''; return; }
  z.innerHTML='<div class="ht-auf-k ht-auf-ruhig">'+
    '<div class="ht-auf-w">'+esc(H_SEITE.aufRuhig)+'</div>'+
    '<h2 class="ht-auf-t">'+esc(B.name)+'</h2>'+
    '<p class="ht-auf-x">'+esc(B.satz)+'</p>'+
    (B.tun?'<div class="ht-auf-m"><b>'+esc(H_SEITE.tunVor)+'</b> '+esc(B.tun)+'</div>':'')+
    (B.bis?'<div class="ht-auf-bis">'+esc(tf(H_SEITE.bisVor,{bis:B.bis}))+'</div>':'')+
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
  if(st&&!st.polar) e.push({jd:st.bis, jetzt:true, wann:uhr(st.bis),
    tag:H_SEITE.heuteKlein, ab:2, rang:0,
    tt:tf(H_EREIGNIS.stunde.tt,{herr:(H_GEN[st.herr]||st.herr)}),
    tx:tf(H_EREIGNIS.stunde.tx,{planet:st.herr}),
    wo:H_EREIGNIS.stunde.wo});

  /* Mond wechselt das Zeichen und damit dein Haus */
  var zw=null; try{ zw=AC_HIMMEL.naechsterZeichenwechsel(jd); }catch(e2){}
  if(zw){
    var neuH=haus(P, zw.zeichen*30+1), nB=bereichZuHaus(neuH);
    e.push({jd:zw.jd, wann:uhr(zw.jd), tag:tagKurz(zw.jd), rang:1,
      tt:tf(H_EREIGNIS.mond.tt,{bereich:(nB?nB.name:H_HAUS[neuH-1])}),
      tx:H_EREIGNIS.mond.tx,
      tech:tf(H_EREIGNIS.mond.tech,{zeichen:H_SIGNS[zw.zeichen], haus:neuH,
                                    name:H_HAUS[neuH-1]}),
      wo:H_EREIGNIS.mond.wo});
  }

  /* Lunationen mit Ritualfenster */
  var lun=[]; try{ lun=AC_BOARD.lunationen(jd, jd+40)||[]; }catch(e2){}
  lun.slice(0,3).forEach(function(l){
    var ml=moonLon((l.jd-2451545)/36525);
    var h=haus(P,ml), lB=bereichZuHaus(h);
    var lN=lB?lB.name:H_HAUS[h-1];
    var A=H_LUN[l.art==='neu'?'neu':'voll'];
    e.push({jd:l.jd, wann:uhr(l.jd), tag:tagKurz(l.jd), rang:4,
      tt:tf(H_EREIGNIS.lunation.tt,{art:A.name, bereich:lN}),
      tech:tf(H_EREIGNIS.lunation.tech,{art:A.name, zeichen:H_SIGNS[zI(ml)],
                                        haus:h, name:H_HAUS[h-1]}),
      tx:A.tx, mit:A.mit,
      wo:H_EREIGNIS.lunation.wo});
  });

  /* Stationen: Planeten, die drehen */
  var stn=[]; try{ stn=AC_BOARD.stationen(jd, 21)||[]; }catch(e2){}
  stn.forEach(function(s2){
    var h=haus(P,s2.lon), sB=bereichZuHaus(h), sN=sB?sB.name:H_HAUS[h-1];
    /* Der Name zuerst. „Es wird zäher: Kommunikation" ist dieselbe
       Information wie „Merkur wird rückläufig" — nur dass niemand
       sie wiedererkennt. Mandy am 28.10.: „Das sind die themen die
       es spannend machen." Die Sätze stehen in heute-daten.js. */
    var S=H_EREIGNIS.station;
    e.push({jd:s2.jd, tag:tagKurz(s2.jd), rang:5,
      wann:tageBis(s2.jd)<=0?H_SEITE.heuteKlein:tf(S.inTagen,{n:tageBis(s2.jd)}),
      tt:tf(s2.direkt?S.ttDirekt:S.ttRueck,{planet:s2.planet, bereich:sN}),
      tech:tf(s2.direkt?S.techDirekt:S.techRueck,{planet:s2.planet, haus:h,
                                                 name:H_HAUS[h-1]}),
      tx:(s2.direkt?S.txDirekt:S.txRueck),
      wo:tf(S.wo,{k:(sB?sB.k:'')})});
  });

  /* Aspekte, die in diesem Zeitraum genau aufgehen.
     Mandy am 28.10.: „Was ist die Woche zB los und highlights der
     ganzen aspekte." Die Woche kannte bis dahin nur Mond, Lunation
     und Rückläufigkeit — also alles, was vom Himmel kommt, und
     nichts, was dein Geburtsbild trifft. Der Tag, an dem ein Winkel
     genau aufgeht, ist der datierte Termin schlechthin; seit
     exaktAm() im Bereichsrechner steht, lässt er sich auch nennen. */
  /* Höchstens ein Tag je Wanderer. Der Satz hängt am Wanderer und
     nicht am Ziel — ohne diese Sperre stehen zwei Tage in derselben
     Woche mit wortwörtlich demselben Text. Dieselbe Fehlerklasse,
     die „Was gerade läuft" schon einmal hatte. */
  var proW={};
  if(window.BL_ALLE) BL_ALLE.forEach(function(v){
    if(v.form!=='aspekt' || !v.f || !v.f.exakt) return;
    if(tagesAbstand(v.f.exakt)<0 || tagesAbstand(v.f.exakt)>40) return;
    if(!proW[v.wanderer] || v.gewicht>proW[v.wanderer].gewicht) proW[v.wanderer]=v;
  });
  /* Und höchstens ein Tag je Bereich. Die Sperre darüber hält einen Tag
     je Wanderer fest — der Titel hängt aber am Bereich, und zwei
     verschiedene Wanderer können denselben Bereich treffen. Am 1.11.
     hieß deshalb ein Jupitertag und ein Venustag beide „Beruf: der
     deutlichste Tag". Ein Superlativ, der zweimal vorkommt, ist keiner.
     Der schwerere Treffer gewinnt; der andere steht weiter im
     Zeitstrahl, wo alle Durchgänge stehen. Siehe REGELN.md 6f. */
  var kand=[];
  Object.keys(proW).forEach(function(k){
    var v=proW[k], satz=laufSatz(v); if(!satz) return;
    var B=bereichZuHaus(v.haeuser && v.haeuser[0]);
    kand.push({v:v, satz:satz, B:B,
      nm:B?B.name:H_HAUS[((v.haeuser&&v.haeuser[0])||1)-1]});
  });
  kand.sort(function(a,b){ return b.v.gewicht-a.v.gewicht; });
  var proB={};
  kand.forEach(function(c){
    if(proB[c.nm]) return;
    proB[c.nm]=true;
    var v=c.v;
    var X=H_EREIGNIS.exakt;
    e.push({jd:v.f.exakt, wann:X.wann, tag:tagKurz(v.f.exakt), rang:3,
      tt:tf(X.tt,{bereich:c.nm}),
      tx:tf(X.tx,{satz:c.satz}),
      tech:tf(X.tech,{wanderer:v.wanderer, aspekt:aspektName(v.aspekt),
                      ziel:v.ziel}),
      wo:tf(X.wo,{k:(c.B?c.B.k:'')})});
  });

  e.sort(function(a,b){ return a.jd-b.jd; });
  return e;
}

/* ── Die großen Themen ────────────────────────────────────────
   Merkur rückläufig, der nächste Vollmond, Kazimi. Die Rechnung
   wusste das alles schon; gezeigt wurde es nie, weil die Seite
   jedes Himmelsereignis in einen Bereichsnamen übersetzt hat.
   „Es wird zäher: Kommunikation" ist dieselbe Information wie
   „Merkur rückläufig, 24. Oktober bis 13. November" — nur dass
   niemand sie wiedererkennt. Siehe themen-daten.js. */

function tf(s, w){ return String(s).replace(/\{(\w+)\}/g, function(m,k){
  return (w && w[k]!==undefined) ? w[k] : m; }); }
function gr(l){ var g=nrm(l)%30; return Math.floor(g)+'°'+
  ('0'+Math.floor((g%1)*60)).slice(-2)+'′'; }
function wochentagDatum(jd){ return datVon(jd).toLocaleDateString('de-DE',
  {weekday:'long', day:'numeric', month:'long'}); }

/* Wo ein Punkt in deinem Geburtsbild landet — Haus und Bereich. */
function beiDir(lng){
  if(lng===null||lng===undefined||!P) return null;
  var h=haus(P,lng), B=bereichZuHaus(h);
  return {haus:h, bereich:B, name:(B?B.name:H_HAUS[h-1])};
}
function beiDirZeile(lng){
  var b=beiDir(lng); if(!b) return '';
  return '<div class="th-z"><b>'+esc(T_KOPF.beiDirVor)+'</b>'+
    (b.bereich
      ? '<a href="'+esc(H_SEITE.berZiel)+esc(b.bereich.k)+'">'+esc(b.name)+' →</a>'
      : esc(b.name))+'</div>';
}

/* Die Spanne einer Rückläufigkeit: von der Station, die sie
   eingeleitet hat, bis zu der, die sie beendet. Ohne beide Enden
   ist „rückläufig" eine Behauptung ohne Zeitraum — und der
   Zeitraum ist das, wonach gefragt wird. */
function rueckSpanne(k, jd){
  var st=[]; try{ st=AC_BOARD.stationen(jd-220, 440)||[]; }catch(e){ return null; }
  var meine=st.filter(function(s){ return s.planet===k; });
  var von=null, bis=null, i;
  for(i=0;i<meine.length;i++){
    if(meine[i].jd<=jd && !meine[i].direkt) von=meine[i];
    if(meine[i].jd>jd && meine[i].direkt){ bis=meine[i]; break; }
  }
  return (von&&bis) ? {von:von.jd, bis:bis.jd, lon:von.lon} : null;
}

/* Der Balken, der zeigt, wo im Zeitraum wir heute stehen. */
function spanneBalken(von, bis, jd){
  if(!(bis>von)) return '';
  var a=Math.max(0,Math.min(1,(jd-von)/(bis-von)));
  return '<div class="th-bahn"><i class="th-jetzt" style="left:'+(a*100).toFixed(1)+'%"></i></div>';
}
function nochWie(bis, jd){
  var t=tagesAbstand(bis);
  if(t<=0) return T_KOPF.nochEinTag;
  if(t===1) return T_KOPF.nochEinenTag;
  return tf(T_KOPF.nochTage,{n:t});
}

function themaKarte(o){
  var h=['<article class="th'+(o.gross?' th-gross':'')+'">'];
  h.push('<div class="th-kopf"><h3 class="th-n">'+esc(o.name)+'</h3>'+
         (o.marke?'<span class="th-marke">'+esc(o.marke)+'</span>':'')+'</div>');
  if(o.spanne) h.push('<div class="th-spanne">'+esc(o.spanne)+'</div>');
  if(o.bahn) h.push(o.bahn);
  if(o.was) h.push('<p class="th-was">'+esc(o.was)+'</p>');
  if(o.tut) h.push('<p class="th-tut">'+esc(o.tut)+'</p>');
  /* Die vier Ecken, an denen es klemmt. Eine Liste sagt hier mehr
     als ein Absatz: Mandy am 28.10. wollte genau diese Konkretheit
     — „wichtig dass technik kaputt gehen kann oder travel
     Schwierigkeiten". */
  if(o.felder && o.felder.length)
    h.push('<ul class="th-felder">'+o.felder.map(function(f){
      return '<li><b>'+esc(f[0])+'</b>'+esc(f[1])+'</li>'; }).join('')+'</ul>');
  if(o.beiDir) h.push(o.beiDir);
  if(o.auch) h.push('<div class="th-auch">'+esc(o.auch)+'</div>');
  if(o.schnitt) h.push('<div class="th-schnitt"><b>'+esc(o.schnitt.titel)+'</b>'+
    '<p>'+esc(o.schnitt.text)+'</p>'+
    '<p class="th-grenze">'+esc(T_SCHNITT.grenze)+'</p>'+
    '<details class="th-dazu"><summary>'+esc(T_SCHNITT.belegTitel)+
    '</summary><p>'+esc(T_SCHNITT.beleg)+'</p></details></div>');
  if(o.gut) h.push('<div class="th-z"><b>'+esc(T_KOPF.gutVor)+'</b>'+esc(o.gut)+'</div>');
  if(o.dazu) h.push('<details class="th-dazu"><summary>'+esc(T_KOPF.dazuVor)+
                    '</summary><p>'+esc(o.dazu)+'</p></details>');
  if(o.tech) h.push('<div class="th-tech ac-tech" data-ab="2">'+esc(o.tech)+'</div>');
  h.push('</article>');
  return h.join('');
}

function themenBauen(){
  var ziel=el('htthemen'); if(!ziel || !window.T_RUECK) return;
  var jd=jetztJD(), karten=[], langsam=[];
  el('htthemenh').textContent=T_KOPF.titel;
  el('htthemensub').textContent=T_KOPF.sub;

  /* 1 · Rückläufige Planeten, die schnellen zuerst und groß. */
  var rueck=[]; try{ rueck=AC_BOARD.jetztRueck(jd)||[]; }catch(e){}
  rueck.forEach(function(k){
    var D=T_RUECK[k]; if(!D) return;
    if(!D.schnell){ langsam.push(D.name.replace(' rückläufig','')); return; }
    var sp=rueckSpanne(k,jd);
    karten.push({gross:true, planet:k, name:D.name,
      marke:sp?nochWie(sp.bis,jd):T_KOPF.laeuft,
      spanne:sp?(monatTag(sp.von)+' – '+monatTag(sp.bis)):'',
      bahn:sp?spanneBalken(sp.von,sp.bis,jd):'',
      was:D.was, tut:D.tut, felder:D.felder, gut:D.gut, dazu:D.dazu,
      schnitt:(window.T_SCHNITT?T_SCHNITT[k]:null),
      beiDir:beiDirZeile(lon(k,jd)),
      tech:tf(T_KOPF.techRueck,{planet:k, zeichen:H_SIGNS[zI(lon(k,jd))],
        aus:(sp && zI(sp.lon)!==zI(lon(k,jd))
              ? tf(T_KOPF.techRueckAus,{zeichen:H_SIGNS[zI(sp.lon)]}) : '')})});
  });

  /* 2 · Der nächste Neumond und der nächste Vollmond — beide
     immer, auch wenn sie noch Wochen hin sind. „Wann ist der
     nächste Vollmond" muss jederzeit beantwortbar sein. */
  var lun=[]; try{ lun=AC_BOARD.lunationen(jd, jd+45)||[]; }catch(e){}
  ['neu','voll'].forEach(function(art){
    var l=lun.filter(function(x){ return x.art===art; })[0]; if(!l) return;
    var D=T_MOND[art], ml=moonLon((l.jd-2451545)/36525);
    var fi=null; try{ fi=AC_HIMMEL.finsternis(l.jd, art); }catch(e){}
    var nm=D.name, tut=D.tut, dazu='';
    if(fi){
      var F=T_FINSTERNIS[fi.art];
      nm=F.name+(fi.sicher?'':T_FINSTERNIS.moeglich);
      tut=F.tut+(fi.sicher?'':' '+T_FINSTERNIS.vielleicht);
      dazu=T_FINSTERNIS.dazu;
    }
    var t=tagesAbstand(l.jd);
    karten.push({gross:!!fi, name:nm,
      marke:(t<=0?T_KOPF.heute:t===1?T_KOPF.morgen:tf(T_KOPF.inTagen,{n:t})),
      spanne:tf(T_MOND.spanne,{tag:wochentagDatum(l.jd), uhr:uhr(l.jd),
        zeichen:tf(T_MOND.inZeichen,{zeichen:H_SIGNS[zI(ml)]})}),
      was:D.was, tut:tut, felder:D.felder, gut:D.gut, dazu:dazu,
      beiDir:beiDirZeile(ml),
      tech:tf(T_MOND.tech,{art:D.name, grad:gr(ml), zeichen:H_SIGNS[zI(ml)],
        knoten:(fi?tf(T_MOND.techKnoten,{ab:fi.knoten.toFixed(1)}):'')})});
  });

  /* 2b · Die Saturnrückkehr. Steht ganz oben, wenn sie läuft: Für
     die Zielgruppe ist das das größte Thema, das es gibt, und es
     kommt höchstens zweimal im Leben vor. Gerechnet wird der
     Abstand des laufenden Saturn zum Saturn der Geburt; das Fenster
     ist großzügig, weil Saturn in dieser Zeit zwei- bis dreimal
     über dieselbe Stelle läuft. */
  if(P && P.Saturn!==undefined && window.T_SATURN){
    var sg=P.Saturn, ab=Math.abs(((lon('Saturn',jd)-sg+540)%360)-180);
    if(ab<=8){
      var pr=profil(), gJD=pr?jdFromUT(pr.y,pr.mo,pr.d,pr.h+pr.mi/60-pr.tz):null;
      var alter=gJD?Math.floor((jd-gJD)/365.2422):null;
      var welche=(alter===null?T_SATURN.erste
                 :alter<45?T_SATURN.erste:(alter<75?T_SATURN.zweite:T_SATURN.dritte));
      karten.unshift({gross:true, name:T_SATURN.name, marke:T_SATURN.laeuft,
        spanne:(alter!==null?tf(T_SATURN.nummer,{welche:welche, alter:alter}):''),
        was:T_SATURN.was, tut:T_SATURN.tut, gut:T_SATURN.gut, dazu:T_SATURN.dazu,
        beiDir:beiDirZeile(sg),
        tech:tf(T_SATURN.tech,{grad:gr(lon('Saturn',jd)),
          zeichen:H_SIGNS[zI(lon('Saturn',jd))], gradN:gr(sg),
          zeichenN:H_SIGNS[zI(sg)], ab:ab.toFixed(1)})});
    }
  }

  /* 3 · Kazimi und Verbrennung. */
  var kz=null; try{ kz=AC_HIMMEL.naechstesKazimi(jd, 45); }catch(e){}
  if(kz){
    var tk=tagesAbstand(kz.jd);
    karten.push({planet:kz.planet, name:tf(T_SONNE.kazimi.name,{planet:kz.planet}),
      marke:(tk<=0?T_KOPF.heute:tk===1?T_KOPF.morgen:tf(T_KOPF.inTagen,{n:tk})),
      spanne:tf(T_SONNE.kazimi.spanne,{tag:wochentagDatum(kz.jd), uhr:uhr(kz.jd)}),
      was:tf(T_SONNE.kazimi.was,{planet:kz.planet}),
      tut:T_SONNE.kazimi.tut, gut:T_SONNE.kazimi.gut, dazu:T_SONNE.kazimi.dazu,
      beiDir:beiDirZeile(kz.lon),
      tech:tf(T_SONNE.kazimi.tech,{planet:kz.planet,
        min:(AC_HIMMEL.GRENZEN.kazimi*60).toFixed(0)})});
  }
  /* Sonnennähe gehört zum Planeten, nicht neben ihn. Ohne diese
     Zusammenlegung stünde Merkur dreimal untereinander: einmal
     rückläufig, einmal als Kazimi, einmal unter den Strahlen —
     dreimal derselbe Planet, dreimal fast derselbe Zeitraum. */
  var nah=[]; try{ nah=AC_HIMMEL.sonnennah(jd)||[]; }catch(e){}
  nah.forEach(function(s){
    if(s.art==='kazimi') return;            /* steht schon oben */
    var D=T_SONNE[s.art]; if(!D) return;
    /* Die erste Karte dieses Planeten, nicht die letzte: Bei Merkur
       stünde die Zeile sonst an der Kazimi-Karte statt an der
       großen Karte zur Rückläufigkeit. */
    var schon=null, i;
    for(i=0;i<karten.length;i++) if(karten[i].planet===s.planet){ schon=karten[i]; break; }
    if(schon){ schon.auch=tf(T_SONNE.auch,{name:tf(D.name,{planet:s.planet}),
                 was:tf(D.was,{planet:s.planet})}); return; }
    if(s.art==='strahlen') return;          /* zu fein für eine eigene Karte */
    karten.push({planet:s.planet, name:tf(D.name,{planet:s.planet}),
      marke:T_KOPF.laeuft,
      was:tf(D.was,{planet:s.planet}), tut:D.tut, gut:D.gut, dazu:D.dazu,
      beiDir:beiDirZeile(lon(s.planet,jd)),
      tech:tf(T_SONNE.techNah,{planet:s.planet, ab:s.ab.toFixed(1)})});
  });

  ziel.innerHTML = karten.length ? karten.map(themaKarte).join('')
                                 : '<p class="ht-nix">'+esc(T_KOPF.nix)+'</p>';
  var lz=el('htthlangsam');
  if(langsam.length){
    lz.innerHTML='<b>'+esc(T_RUECK_LANGSAM.vor)+'</b> '+esc(langsam.join(', '))+'. '+
      '<span class="th-leise">'+esc(T_RUECK_LANGSAM.nach)+'</span>';
    lz.hidden=false;
  }else{ lz.innerHTML=''; lz.hidden=true; }
}

/* ── Was dein Bild gerade trifft ──────────────────────────────
   Mandy am 29.10.: „welche punkte werden heute und in den tagen
   konkret getroffen? Heute ist da angeblich nichts bei mir, aber
   das wage ich zu bezweifeln."

   Sie hatte recht. An dem Tag standen vierzehn Berührungen auf
   ihrem Bild, darunter Saturn 0,47° auf ihrer Sonne und Pluto
   0,35° auf ihrem MC. Die Seite sagte „heute nichts", weil der
   einzige Abschnitt, der Treffer prüfte, nur Konjunktionen kannte.
   Siehe bahn-rechner.js. */
var TR_ZEIGE = 4, TR_ALLE = false;
/* Was oben schon als laufende Berührung steht, wird im Zeitstrahl
   nur eingereiht statt wortgleich wiederholt. Dieselbe Fehlerklasse
   wie beim Aufmacher und in der Woche — hier zum dritten Mal, also
   gehört sie auch zum dritten Mal in eine Prüfung. */
var TR_LAEUFT = {};
function laeuftSchluessel(x){ return x.wanderer + '|' + x.ziel + '|' + x.grad; }

function bahnSatz(t){
  var Z = B_ZIEL[t.ziel], W = B_WAND[t.wanderer];
  if(!Z || !W) return '';
  return t.wanderer + ' ' + W.tut + ', ' + Z.was + '. ' +
         (t.art === 'hart' ? W.hart : W.weich);
}
/* Zwei Register: Auf Stufe 0 und 1 „Saturn auf deiner Sonne", ab
   Stufe 2 „Saturn in Konjunktion zu deiner Sonne". Dieselbe
   Aussage, und die erste braucht keine Vorbildung.

   Gebeugt wird hier nichts. Die Anzeige holt den Fall bei der
   Formel und das Geschlecht beim Punkt und lässt `B_BEUGE` das
   Wort bilden — sonst steht in der nächsten Vorlage wieder ein
   festes „dein". */
function bahnTitel(t){
  var W = B_WINKELWORT[t.aspekt] || B_WINKELNOT;
  var laie = t.wanderer + ' ' + W.wort + ' ' +
             B_BEUGE(B_PUNKT(t.ziel, true), W.fall);
  var tech = t.wanderer + ' ' + B_WINKELTECH.vor + ' ' + t.aspekt + ' ' +
             B_WINKELTECH.nach + ' ' +
             B_BEUGE(B_PUNKT(t.ziel, false), B_WINKELTECH.fall);
  return '<span data-bis="1">' + esc(laie) + '</span>' +
         '<span class="ac-tech" data-ab="2">' + esc(tech) + '</span>';
}
/* Der Balken zeigt, wie nah der Winkel steht — nicht, wie wichtig
   er ist. Das sagt die Legende auch so. */
function naeheBalken(t){
  return '<div class="tr-bahn"><i style="width:' +
         (Math.max(3, t.naehe * 100)).toFixed(0) + '%"></i></div>';
}
function trefferKarte(t, gross){
  var B = beiDir(P[t.ziel]);
  var h = ['<article class="tr' + (gross ? ' tr-gross' : '') +
           (t.art === 'hart' ? ' tr-hart' : ' tr-weich') + '">'];
  h.push('<div class="tr-kopf"><h3 class="tr-n">' + bahnTitel(t) + '</h3>' +
         '<span class="tr-nah">' + t.ab.toFixed(1) + '°</span></div>');
  h.push(naeheBalken(t));
  h.push('<p class="tr-s">' + esc(bahnSatz(t)) + '</p>');
  var unten = [];
  if(B) unten.push('<a class="tr-ber" href="' + esc(H_SEITE.berZiel) +
                   esc(B.bereich ? B.bereich.k : '') + '">' + esc(B.name) + ' →</a>');
  if(gross && B_TEMPO[t.tempo])
    unten.push('<span class="tr-t">' + esc(B_TEMPO[t.tempo].satz) + '</span>');
  if(t.rueckwaerts) unten.push('<span class="tr-r">' + esc(B_KOPF.rueck) + '</span>');
  h.push('<div class="tr-unten">' + unten.join('') + '</div>');
  h.push('<div class="tr-tech ac-tech" data-ab="2">' +
         tf(B_KOPF.tech, {wanderer:esc(t.wanderer),
           grad:gr(lon(t.wanderer, jetztJD())),
           zeichen:H_SIGNS[zI(lon(t.wanderer, jetztJD()))],
           aspekt:esc(t.aspekt), ziel:esc(t.ziel), gradZ:gr(P[t.ziel]),
           zeichenZ:H_SIGNS[zI(P[t.ziel])], ab:t.ab.toFixed(2)}) + '</div>');
  h.push('</article>');
  return h.join('');
}

function trefferBauen(){
  var ziel = el('httreffer'); if(!ziel || !window.AC_BAHN || !P) return;
  el('httrefferh').textContent = B_KOPF.titel;
  el('httreffersub').textContent = B_KOPF.sub;
  var jd = jetztJD(), alle = AC_BAHN.treffer(P, jd);
  TR_LAEUFT = {};
  alle.forEach(function(t){ if(t.tempo !== 'schnell') TR_LAEUFT[laeuftSchluessel(t)] = true; });
  var lang = alle.filter(function(t){ return t.tempo !== 'schnell'; });
  var kurz = alle.filter(function(t){ return t.tempo === 'schnell'; });

  if(!lang.length && !kurz.length){
    ziel.innerHTML = '<p class="ht-nix">' + esc(B_KOPF.nix) + '</p>';
    el('httreffermehr').hidden = true;
    el('httrefferschnell').innerHTML = '';
    return;
  }
  var zeige = TR_ALLE ? lang : lang.slice(0, TR_ZEIGE);
  ziel.innerHTML = zeige.map(function(t, i){ return trefferKarte(t, i === 0); }).join('');

  var m = el('httreffermehr');
  if(lang.length > TR_ZEIGE){
    m.hidden = false;
    m.textContent = TR_ALLE ? B_KOPF.wenigerVor
                            : B_KOPF.mehrVor + ' (' + lang.length + ')';
    m.onclick = function(){ TR_ALLE = !TR_ALLE; trefferBauen(); anwenden(); };
  } else { m.hidden = true; }

  /* Die schnellen Wanderer getrennt und klein: Sie machen den Tag,
     nicht den Abschnitt — stünden sie dazwischen, würde Pluto auf
     dem MC neben dem Mond auf Merkur stehen. */
  var s = el('httrefferschnell');
  if(kurz.length){
    s.innerHTML = '<div class="trs-t">' + esc(B_KOPF.schnellTitel) + '</div>' +
      '<p class="trs-s">' + esc(B_KOPF.schnellSub) + '</p>' +
      '<ul class="trs-l">' + kurz.slice(0, 5).map(function(t){
        return '<li><b>' + bahnTitel(t) + '</b><span>' + t.ab.toFixed(1) + '°</span></li>';
      }).join('') + '</ul>';
  } else { s.innerHTML = ''; }
}

/* ── Der Zeitstrahl ───────────────────────────────────────────
   Mandy am 29.10.: „zeitstrahl dinge zum aufklappen und und und.
   Damit man etwas zum interagieren hat. Das ist alles so
   runtergerattert."

   Senkrecht, nicht waagerecht: Auf 390 Pixeln ist eine liegende
   Zeitachse unlesbar, eine stehende liest sich wie eine Liste mit
   Ordnung. Monate als Marken, jeder Eintrag aufklappbar. */
var ST_ZEIGE = 6, ST_ALLE = false;

function strahlBauen(){
  var ziel = el('htstrahl'); if(!ziel || !window.AC_BAHN || !P) return;
  el('htstrahlh').textContent = B_STRAHL.titel;
  el('htstrahlsub').textContent = B_STRAHL.sub;
  var jd = jetztJD(), e = [];
  try{ e = AC_BAHN.exakteTage(P, jd, jd + 365) || []; }catch(err){ e = []; }
  e = e.filter(function(x){ return x.gewicht >= 0.45; });

  if(!e.length){
    ziel.innerHTML = '<p class="ht-nix">' + esc(B_STRAHL.nix) + '</p>';
    el('htstrahlmehr').hidden = true;
    return;
  }
  var zeige = ST_ALLE ? e : e.slice(0, ST_ZEIGE);
  var h = ['<div class="st-jetzt"><i></i>' + esc(B_STRAHL.jetztMarke) + '</div>'], letzterMonat = null;

  zeige.forEach(function(x){
    var d = datVon(x.jd), mk = d.getFullYear() + '-' + d.getMonth();
    if(mk !== letzterMonat){
      letzterMonat = mk;
      h.push('<div class="st-m">' + esc(H_MONAT[d.getMonth()]) + ' ' + d.getFullYear() + '</div>');
    }
    var tage = tagesAbstand(x.jd);
    var B = beiDir(P[x.ziel]);
    var dg = (x.durchgaenge > 1 && B_DURCHGANG[x.durchgang])
      ? (B_DURCHGANG[x.durchgang][x.durchgaenge === 3 ? 'von3' : 'von2'] || '') : '';
    h.push('<details class="st-e' + (x.art === 'hart' ? ' st-hart' : ' st-weich') + '">');
    h.push('<summary><span class="st-d">' + d.getDate() + '.</span>' +
      '<span class="st-n">' + bahnTitel(x) + '</span>' +
      '<span class="st-w">' + esc(tage === 0 ? B_STRAHL.heute
        : tage < 31 ? tf(B_STRAHL.inTagen, {n:tage})
        : tf(B_STRAHL.inMonaten, {n:Math.round(tage / 30.44)})) +
      '</span></summary>');
    /* Ein rückläufiger Wanderer kreuzt dieselbe Stelle bis zu
       dreimal. Beim zweiten und dritten Mal denselben Absatz noch
       einmal hinzuschreiben, wäre Füllmaterial — dort zählt nur,
       der wievielte Durchgang es ist und was der bedeutet. */
    var schon = TR_LAEUFT[laeuftSchluessel(x)];
    h.push('<div class="st-i">');
    if(x.durchgang > 1) h.push('<p class="st-schon">' + esc(B_STRAHL.wieder) + '</p>');
    else if(schon)      h.push('<p class="st-schon">' + esc(B_STRAHL.steht) + '</p>');
    else                h.push('<p>' + esc(bahnSatz(x)) + '</p>');
    if(dg) h.push('<p class="st-dg">' + esc(dg) + '</p>');
    if(B) h.push('<a class="tr-ber" href="' + esc(H_SEITE.berZiel) +
                 esc(B.bereich ? B.bereich.k : '') + '">' + esc(B.name) + ' →</a>');
    h.push('<div class="tr-tech ac-tech" data-ab="2">' +
      tf(B_STRAHL.tech, {wanderer:esc(x.wanderer), aspekt:esc(x.aspekt),
        ziel:esc(x.ziel), datum:esc(datVon(x.jd).toLocaleDateString('de-DE')),
        rueck:(x.rueckwaerts ? B_STRAHL.techRueck : ''),
        durchgang:(x.durchgaenge > 1
          ? tf(B_STRAHL.techDurchgang, {n:x.durchgang, alle:x.durchgaenge}) : '')}) +
      '</div></div></details>');
  });
  h.push('<p class="st-legende">' + esc(B_STRAHL.legende) + '</p>');
  ziel.innerHTML = h.join('');

  var m = el('htstrahlmehr');
  if(e.length > ST_ZEIGE){
    m.hidden = false;
    m.textContent = ST_ALLE ? B_STRAHL.weniger
      : tf(B_STRAHL.mehr, {n:(e.length - ST_ZEIGE)});
    m.onclick = function(){ ST_ALLE = !ST_ALLE; strahlBauen(); anwenden(); };
  } else { m.hidden = true; }
}

/* ── Schlaf und Bewegung ──────────────────────────────────────
   Mandy am 28.10.: „mir fiel auf dass ich anhand des Mondes zB
   besser oder schlechter schlafe … bei mir stier mars 12 haus wenn
   da mond drin ist dann eher yoga als kraftsport."

   Hier treffen zwei Sorten Wissen aufeinander, und genau deshalb
   stehen sie getrennt: Der Zusammenhang zwischen Mondphase und
   Schlaf ist gemessen (klein, umstritten, mehrfach gefunden). Die
   Zuordnung von Element und Mondstellung zu Training ist
   Überlieferung. Beides steht da, beides beschriftet. Siehe
   themen-daten.js. */
var ELEMENT_VON = ['feuer','erde','luft','wasser'];
function elementVon(lng){ return ELEMENT_VON[zI(lng)%4]; }

/* Welche Punkte des Geburtsbilds der Mond heute berührt. Orbis 5°:
   Der Mond läuft gut 13° am Tag, das sind rund neun Stunden — eine
   Tagesaussage, keine Minutenaussage. */
function mondTrifft(jd){
  if(!P || !window.T_MONDTREFFER) return [];
  var ml=lon('Mond',jd), mh=haus(P,ml), out=[];
  Object.keys(T_MONDTREFFER).forEach(function(k){
    if(P[k]===undefined || P[k]===null) return;
    /* Alle fünf Winkel, nicht nur die Konjunktion. Bis zum 29.10.
       stand hier nur der Längenabstand — damit fiel Mandys Mond in
       Opposition zu ihrem Saturn durch, 0,29° vom Exakten entfernt,
       und die Seite sagte „heute nichts". */
    var ab=null, nam=null;
    [[0,'Konjunktion'],[180,'Opposition'],[90,'Quadrat'],
     [120,'Trigon'],[60,'Sextil']].forEach(function(A){
      var d=Math.abs(((ml-P[k]-A[0]+540)%360)-180);
      if(d<=5 && (ab===null || d<ab)){ ab=d; nam=A[1]; }
    });
    if(ab!==null){ out.push({k:k, ab:ab, winkel:nam, genau:true, D:T_MONDTREFFER[k]}); return; }
    ab=Math.abs(((ml-P[k]+540)%360)-180);
    /* Sonst: dasselbe Haus. Das ist Mandys eigener Fall und dauert
       zwei bis drei Tage statt neun Stunden — die häufigere und
       damit brauchbarere Aussage von beiden. */
    if(window.T_MONDHAUS && T_MONDHAUS[k] && haus(P,P[k])===mh)
      out.push({k:k, ab:ab, genau:false, D:T_MONDHAUS[k]});
  });
  out.sort(function(a,b){ return (b.genau-a.genau) || (a.ab-b.ab); });
  return out;
}

/* Die Nächte vor dem Vollmond sind die, in denen gemessen kürzer
   geschlafen wird. Drei bis fünf Tage davor war der Tiefpunkt. */
function vorVollmond(jd){
  var l=[]; try{ l=AC_BOARD.lunationen(jd, jd+7)||[]; }catch(e){ return null; }
  var v=l.filter(function(x){ return x.art==='voll'; })[0];
  if(!v) return null;
  var t=tagesAbstand(v.jd);
  return (t>=0 && t<=5) ? {jd:v.jd, tage:t} : null;
}

function koerperBauen(){
  var ziel=el('htkoerper'); if(!ziel || !window.T_KOERPER) return;
  el('htkoerperh').textContent=T_KOERPER.titel;
  el('htkoerpersub').textContent=T_KOERPER.sub;
  var jd=jetztJD(), ml=lon('Mond',jd), E=T_ELEMENT[elementVon(ml)];
  var h=[], B=beiDir(ml), vv=vorVollmond(jd);

  h.push('<div class="kp-kopf"><span class="kp-vor">'+esc(T_KOERPER.heuteVor)+'</span>'+
    '<b>'+esc(E.name)+'mond</b>'+
    (B?'<span class="kp-ber">'+
       esc(tf(T_KOERPER.imBereich,{bereich:B.name}))+'</span>':'')+'</div>');

  h.push('<div class="kp-zwei">');
  h.push('<div class="kp-k"><div class="kp-t">'+esc(T_KOERPER.schlafVor)+'</div>'+
    '<p>'+esc(E.schlaf)+'</p>'+
    (vv?'<p class="kp-mess">'+esc(T_KOERPER.messVor)+' '+
        esc(vv.tage===0?T_KOERPER.messHeute
           :vv.tage===1?T_KOERPER.messEinTag
           :tf(T_KOERPER.messTage,{n:vv.tage}))+' '+
        esc(T_KOERPER.messNach)+'</p>':'')+'</div>');
  h.push('<div class="kp-k"><div class="kp-t">'+esc(T_KOERPER.bewegungVor)+'</div>'+
    '<p>'+esc(E.bewegung)+'</p></div>');
  h.push('</div>');

  var tr=mondTrifft(jd);
  if(tr.length){
    h.push('<div class="kp-treffer"><div class="kp-t">'+esc(T_KOERPER.trefferVor)+'</div>');
    tr.slice(0,2).forEach(function(t){
      h.push('<div class="kp-tr"><b>'+esc(t.D.was)+'</b>'+
        '<p>'+esc(t.D.tut)+'</p><p class="kp-rat">'+esc(t.D.rat)+'</p>'+
        '<div class="kp-tech ac-tech" data-ab="2">'+
        esc(tf(T_KOERPER.tech,{grad:gr(lon('Mond',jd)),
          zeichen:H_SIGNS[zI(lon('Mond',jd))],
          /* Nicht „dein Venus": das Geschlecht des Punktes steht in
             bahn-daten.js, und B_BEUGE bildet das Wort daraus. */
          dein:B_BEUGE(B_PUNKT(t.k,false),'nom'),
          gradN:gr(P[t.k]), zeichenN:H_SIGNS[zI(P[t.k])], haus:haus(P,P[t.k]),
          nachsatz:(t.genau
            ? tf(T_KOERPER.techWinkel,{winkel:(t.winkel||T_KOERPER.techWinkelNot),
                                       ab:t.ab.toFixed(1)})
            : tf(T_KOERPER.techHaus,{haus:haus(P,lon('Mond',jd))}))}))+
        '</div></div>');
    });
    h.push('</div>');
  }

  /* Die Trennung, auf die es hier ankommt. Ohne sie wäre der ganze
     Abschnitt eine Behauptung mit Studienanstrich. */
  h.push('<div class="kp-herkunft">');
  h.push('<details class="th-dazu"><summary>'+esc(T_KOERPER.gemessenTitel)+
         '</summary><p>'+esc(T_KOERPER.gemessen)+'</p></details>');
  h.push('<details class="th-dazu"><summary>'+esc(T_KOERPER.ueberliefertTitel)+
         '</summary><p>'+esc(T_KOERPER.ueberliefert)+'</p></details>');
  h.push('</div>');
  h.push('<div class="kp-selbst"><b>'+esc(T_KOERPER.selbstVor)+'</b>'+
         esc(T_KOERPER.selbst)+'</div>');

  ziel.innerHTML=h.join('');
}

/* ── Band 2 · Deine Woche ─────────────────────────────────────
   Bis zum 28.10. war das eine Liste: sieben Karten mit je eigenem
   Datum, aus zehn Tagen zusammengesucht. Eine Liste beantwortet
   „was kommt als Nächstes" — nicht „wie ist meine Woche".

   Jetzt ist der Zeitraum eine Woche, und sie wird als Woche
   gelesen: ein Satz über ihre Form, ein Band mit sieben Tagen,
   dann die Tage, an denen etwas steht. Was dahinter liegt, wird
   nicht angehängt, sondern in einer Zeile genannt.
   ENTWURF-JETZT.md Abschnitt 3. */
var WO_TAGE=7;

/* Kalendertage, über die Sommerzeit hinweg: nicht 86400000
   addieren, sondern den Tag im Konstruktor weiterzählen. */
function wocheGerippe(){
  var n=new Date(), t=[], i;
  for(i=0;i<WO_TAGE;i++){
    var d=new Date(n.getFullYear(), n.getMonth(), n.getDate()+i);
    t.push({d:d, id:'wt-'+d.getMonth()+'-'+d.getDate(),
            kurz:H_WOKURZ[d.getDay()], lang:H_WOLANG[d.getDay()],
            zahl:d.getDate(), ist:(i===0), posten:[], gewicht:0});
  }
  return t;
}

/* Ein Satz über die Form der Woche. Gerechnet, nicht behauptet:
   das Gewicht ist die Summe der Ränge an diesem Tag. */
function wocheForm(t){
  var mit=t.filter(function(x){ return x.posten.length; });
  if(!mit.length) return H_WOCHE.leer;
  var max=t[0], i;
  for(i=0;i<t.length;i++) if(t[i].gewicht>max.gewicht) max=t[i];
  /* Ein „schwerster Tag", der aus einer einzigen leisen Sache
     besteht, ist eine Behauptung. Unter dem Schwellenwert sagt die
     Woche lieber, dass wenig los ist. */
  if(max.gewicht<4)
    return tf(H_WOCHE.ruhig,{tage:(mit.length===1
      ? H_WOCHE.ruhigEinTag : tf(H_WOCHE.ruhigTage,{n:mit.length}))});
  var schwer=t.filter(function(x){ return x.gewicht===max.gewicht; });
  if(schwer.length>2) return tf(H_WOCHE.verteilt,{n:mit.length});
  var wort=(max.ist?H_SEITE.heuteKlein:max.lang), ix=t.indexOf(max);
  if(ix<=1) return tf(H_WOCHE.vorn,{tag:wort});
  if(ix>=5) return tf(H_WOCHE.hinten,{tag:wort});
  return tf(H_WOCHE.mitte,{tag:wort});
}

/* Das Band: sieben Tage auf einen Blick. Ein Tag mit Termin ist
   anklickbar und springt zu seiner Gruppe; ein leerer Tag bleibt
   stehen, damit die Woche ihre Länge behält. */
function wocheBand(t){
  return t.map(function(x){
    var n=Math.min(x.posten.length,3), p='', i;
    for(i=0;i<n;i++) p+='<i></i>';
    var inn='<span class="wt-k">'+esc(x.kurz)+'</span>'+
            '<span class="wt-z">'+x.zahl+'</span>'+
            '<span class="wt-p">'+p+'</span>';
    var kl='wt'+(x.ist?' ist':'')+(x.posten.length?'':' leer');
    return x.posten.length
      ? '<a class="'+kl+'" href="#'+x.id+'">'+inn+'</a>'
      : '<span class="'+kl+'">'+inn+'</span>';
  }).join('');
}

function postenHtml(x){
  /* Was oben schon ausführlich steht, wird hier nur noch
     eingereiht — damit die Reihenfolge stimmt, ohne dass
     derselbe Text zweimal auf der Seite steht. */
  if(AUFMACHER!==null && Math.abs(x.jd-AUFMACHER)<1e-6)
    return '<div class="we we-oben">'+
      '<div class="wann"><b>'+esc(x.wann)+'</b></div>'+
      '<div class="tt">'+esc(x.tt)+'</div>'+
      '<div class="tx">'+esc(H_SEITE.stehtOben)+'</div></div>';
  var wo='';
  if(x.wo){ var t=x.wo.split('|'); wo='<span class="wo"><a href="'+t[0]+'">'+t[1]+' →</a></span>'; }
  /* ab: ganze Einträge, die nur Mechanik sind, erscheinen erst
     ab der genannten Wissensstufe. tech: die Mechanik zu einem
     Eintrag, der auch ohne sie verständlich ist. */
  return '<div class="we'+(x.jetzt?' jetzt':'')+(x.ab?' ac-tech':'')+'"'+
    (x.ab?' data-ab="'+x.ab+'"':'')+'>'+
    '<div class="wann"><b>'+esc(x.wann)+'</b></div>'+
    '<div class="tt">'+esc(x.tt)+'</div><div class="tx">'+x.tx+'</div>'+
    (x.tech?'<div class="ac-tech" data-ab="2">'+esc(x.tech)+'</div>':'')+
    (x.mit?'<div class="mit"><b>'+esc(H_SEITE.mitVor)+'</b>'+esc(x.mit)+'</div>':'')+
    wo+'</div>';
}

function wocheBauen(){
  var jd=jetztJD(), t=wocheGerippe(), alle=ereignisse(jd), danach=[];

  alle.forEach(function(x){
    var ab=tagesAbstand(x.jd);
    if(ab<0) return;
    if(ab<WO_TAGE){ t[ab].posten.push(x); t[ab].gewicht+=(x.rang||0)+1; }
    else if(ab<=40) danach.push(x);
  });

  el('htwoform').textContent=wocheForm(t);
  el('htwoband').innerHTML=wocheBand(t);

  var mit=t.filter(function(x){ return x.posten.length; });
  el('htwoche').innerHTML = mit.length
    ? mit.map(function(x){
        var dat=x.d.toLocaleDateString('de-DE',{day:'numeric',month:'long'});
        return '<section class="wo-grp" id="'+x.id+'">'+
          '<h3 class="wo-gh"><b>'+esc(x.ist?H_SEITE.wann.heute:x.lang)+'</b>'+
          '<span>'+esc(dat)+'</span></h3>'+
          x.posten.map(postenHtml).join('')+'</section>';
      }).join('')
    : '';

  /* Was hinter der Woche liegt, wird nicht angehängt — sonst ist
     es wieder eine Liste. Es wird genannt. */
  var dz=el('htwodanach');
  if(danach.length){
    /* Erst die drei stärksten auswählen, dann wieder in die
       Reihenfolge bringen, in der sie kommen — sonst steht der
       13. November vor dem 9. */
    danach.sort(function(a,b){ return (b.rang-a.rang)||(a.jd-b.jd); });
    danach=danach.slice(0,3).sort(function(a,b){ return a.jd-b.jd; });
    dz.innerHTML='<b>'+esc(H_WOCHE.danachVor)+'</b> '+danach.map(function(x){
      return tf(H_WOCHE.danachEintrag,{titel:esc(x.tt),
        datum:esc(datVon(x.jd).toLocaleDateString('de-DE',
          {day:'numeric',month:'long'}))});
    }).join(' · ')+'.';
    dz.hidden=false;
  }else{ dz.innerHTML=''; dz.hidden=true; }
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
  if(t>365) return H_FENSTER.jahre;
  if(f.bisOffen) return tf(H_FENSTER.mindestens, {datum:dat});
  if(t===0) return H_FENSTER.heute;
  if(t===1) return H_FENSTER.morgen;
  if(t<=28) return tf(H_FENSTER.tage, {datum:dat, n:t});
  if(t<=70) return tf(H_FENSTER.wochen, {n:Math.round(t/7), datum:dat});
  return tf(H_FENSTER.monate, {n:Math.round(t/30), datum:dat});
}

/* Der Handgriff eines Bereichs — nie zweimal derselbe in der Liste. */
/* Kein Satz steht hier. Die Handgriffe liegen in bereich-daten.js —
   an einer Stelle für „Heute" und für die Bereichsseite. Wer einen
   Handgriff ändert, ändert ihn damit für beide Seiten auf einmal, und
   die gemeinsame Prüfung (rituale/pruefwerk.py) liest genau dort. */
function handgriff(b, schon){
  if(b.laut===0 || !b.laeuft.length) return AC_BDAT.LEER.tun;
  for(var i=0;i<b.laeuft.length;i++){
    var W=AC_BDAT.WAND[b.laeuft[i].wanderer];
    if(W && !schon[W.tun]){ schon[W.tun]=true; return W.tun; }
  }
  return AC_BDAT.LEER.tunWieOben;
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
      hin.textContent=tf(H_SEITE.ausgeblendet,
        {zahl:n, alle:Bl.bereiche.length});
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
    return '<a class="ht-b'+(gross?' ht-b-gross':'')+'" href="'+
      esc(H_SEITE.berZiel)+esc(b.k)+'">'+
      '<span class="ht-bp" style="background:'+L.farbe+'"></span>'+
      '<span class="ht-bn">'+esc(b.name)+'</span>'+
      '<span class="ht-bl" style="color:'+L.farbe+'">'+esc(L.n)+'</span>'+
      '<span class="ht-bs">'+esc(T.lautSatz[b.laut])+'</span>'+
      '<span class="ht-bz"><span class="ht-bz-l">'+esc(H_SEITE.tunVor)+'</span>'+
      '<span class="ht-bt">'+esc(tun)+'</span></span>'+
      (bis?'<span class="ht-bbis"><span class="ht-bz-l">'+esc(H_SEITE.langeVor)+'</span>'+
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
/* Die Liste der Aspektnamen steht in heute-daten.js — hier steht
   kein Text. Warum eine Liste und keine Umschaltung, steht dort. */
function aspektName(k){ return H_ASP[k] || k; }

function laufTech(v){
  if(v.form === 'durchgang')
    return tf(H_LAUF.techDurchgang,
      {wanderer:v.wanderer, haus:v.haus,
       rueck:(v.rueck ? H_LAUF.techRueck : '')});
  return tf(H_LAUF.techAspekt,
    {wanderer:v.wanderer, aspekt:aspektName(v.aspekt),
     ziel:(v.zielArt === 'achse' ? v.ziel
           : tf(H_LAUF.techRadix, {ziel:v.ziel})),
     ab:v.ab.toFixed(1).replace('.', ','),
     zu:(v.zu ? H_LAUF.techZu : H_LAUF.techWeg),
     rueck:(v.rueck ? H_LAUF.techRueck : '')});
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
    ziel.innerHTML = '<p class="ht-nix">' + esc(H_LAUF.nix) + '</p>';
    return;
  }
  ziel.innerHTML = vs.map(function(v, i){
    var B = bereichZuHaus(v.haeuser && v.haeuser[0]);
    var satz = laufSatz(v);
    if(!satz) return '';
    var st = fensterStand(v.f, jd);
    var h = ['<a class="lf' + (i === 0 ? ' lf-haupt' : '') + '" href="' +
             esc(H_SEITE.berZiel) + esc(B ? B.k : '') + '">'];
    h.push('<div class="lf-kopf">');
    h.push('<span class="lf-ber">' + esc(B ? B.name : H_HAUS[(v.haeuser && v.haeuser[0] || 1)-1]) + '</span>');
    if(v.f && v.f.exakt){
      var t = tagesAbstand(v.f.exakt);
      h.push('<span class="lf-wann">' +
        (t === 0 ? esc(H_LAUF.heuteGenau) : t === 1 ? esc(H_LAUF.morgenGenau)
         : tf(t > 0 ? H_LAUF.genauAm : H_LAUF.genauWar,
              {datum:esc(monatTag(v.f.exakt))})) + '</span>');
    } else if(v.f && v.f.bis){
      h.push('<span class="lf-wann">' +
        tf(H_LAUF.bis, {datum:esc(monatTag(v.f.bis))}) + '</span>');
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
        h.push('<p class="lf-auch">' +
               tf(H_LAUF.auch, {liste:esc(orte.join(', '))}) + '</p>');
    }
    h.push('<p class="lf-tech ac-tech" data-ab="2">' + esc(laufTech(v)) +
      (w.length ? tf(H_LAUF.techWeitere,
                     {n:esc(String(w.length)), wanderer:esc(v.wanderer)})
                : '') + '</p>');
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
  el('htkapr').innerHTML=H_KAP.map(function(x){
      return '<button type="button" class="kb'+(a===x.k?' ist':'')+
        '" data-k="'+esc(x.k)+'">'+
        '<span class="n">'+esc(x.n)+'</span>'+
        '<span class="u">'+esc(x.u)+'</span></button>'; }).join('');
  Array.prototype.forEach.call(el('htkapr').querySelectorAll('.kb'),function(b){
    b.addEventListener('click',function(){ kapSetzen(b.getAttribute('data-k')); });
  });
}
/* Bei „wenig" bleiben der Kopf und die Bereiche stehen.
   Weggelassen wird, was Zeit zum Lesen braucht: die Terminliste,
   die ausführlichen Themen und der Abschnitt zu Schlaf und
   Bewegung. „Was gerade läuft" bleibt — das ist der Kern.
   Wer wenig Kapazität angibt, hat sie nicht für eine längere
   Seite, sondern für eine kürzere. */
function anwenden(){
  var a=kapHeute(), knapp=(a==='wenig');
  ['htwocheteil','htthementeil','htkoerperteil','htstrahlteil'].forEach(function(i){
    var e=el(i); if(e) e.hidden=knapp; });
}

/* ── Die Einstellleiste sagt zu, was eingestellt ist ──────── */
function stellBauen(){
  var u=el('htstellu'); if(!u) return;
  var t=[];
  /* Die Namen der fünf Stufen stehen in niveau.js. Eine zweite
     Liste hier wäre dieselbe Angabe an zwei Stellen. */
  try{ if(window.AC_NIV) t.push(AC_NIV.name(AC_NIV.stufe())); }catch(e){}
  try{ if(window.AC_WAHL){ var g=AC_WAHL.gewaehlte&&AC_WAHL.gewaehlte();
    t.push(g&&g.length?tf(H_STELL.bereicheTeil,{n:g.length})
                      :H_STELL.bereicheAlle); } }catch(e){}
  var k=kapHeute(); if(k) t.push(tf(H_STELL.kapazitaet,{k:k}));
  u.textContent=t.join(H_STELL.trenner);
}

/* ── Start ────────────────────────────────────────────────── */
(function(){
  var p=profil();
  if(!p){
    el('htinhalt').innerHTML='<div class="ht-leer">'+esc(H_SEITE.ohneProfilVor)+' '+
      '<a href="'+esc(H_SEITE.ohneProfilDatei)+'">'+esc(H_SEITE.ohneProfilLink)+'</a> '+
      esc(H_SEITE.ohneProfilNach)+'</div>';
    var j=el('htjetzt'); if(j) j.hidden=true;
    return;
  }
  P=chartVon(p); Q=chartZu(jetztJD()); O=ort();
  bereicheBauen(p); laufBauen(p); jetztBauen(p); radBauen(); themenBauen(); trefferBauen(); strahlBauen(); koerperBauen(); wocheBauen();
  kapBauen(); anwenden(); stellBauen();
  try{ if(window.AC_NIV) AC_NIV.leiste(el('nivleiste'), function(){
    bereicheBauen(p); laufBauen(p); jetztBauen(p); themenBauen(); trefferBauen(); strahlBauen(); koerperBauen(); wocheBauen(); stellBauen(); }); }catch(e){}
  /* Wählt jemand hier oder auf einer anderen Seite andere Bereiche,
     wird der Kurzblick neu gezeichnet. */
  try{ window.addEventListener('ac-bereiche',function(){
    bereicheBauen(p); laufBauen(p); jetztBauen(p); stellBauen(); }); }catch(e){}
  try{ if(window.AC_NIV) AC_NIV.anwenden(); }catch(e){}
  setInterval(function(){ Q=chartZu(jetztJD()); bereicheBauen(p); jetztBauen(p);
    try{ if(window.AC_NIV) AC_NIV.anwenden(); }catch(e){} }, 60000);
})();
