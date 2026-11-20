/* ── Geistführung: Rechnung und Darstellung ─────────────────
   Hier steht kein Satz. Die Vorlagen stehen in GT_T
   (geist-texte.js), `gFuell` setzt ein, und „dein" vor dem Haus
   bildet B_BEUGE aus kern/bahn-daten.js — die eine Stelle, die ein
   Geschlecht kennt (Aufgabe 59). bau-geist.py bricht ab, sobald
   hier wieder eine Zeichenkette mit Sprache auftaucht.

   Drei Fälle braucht diese Seite: „dein 12. Haus", „in deinem 12.
   Haus" und „der Herrscher deines 12. Hauses". Den Genitiv gab es
   in B_DEIN nicht; er steht jetzt dort, und die Form des Hauptworts
   („Hauses") in GT_T.haus.beugt. Nichts davon wird hier
   angeklebt. */
function nrm(x){x=x%360;return x<0?x+360:x;}
function el(i){ return document.getElementById(i); }
function jetztJD(){var n=new Date();
 return jdFromUT(n.getUTCFullYear(),n.getUTCMonth()+1,n.getUTCDate(),
   n.getUTCHours()+n.getUTCMinutes()/60+n.getUTCSeconds()/3600);}
function datVon(jd){ return new Date((jd-2440587.5)*86400000); }
function uhr(jd){ return datVon(jd).toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'}); }
function datum(jd){ return datVon(jd).toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit',year:'numeric'}); }
function lonVon(k,jd){var T=(jd-2451545)/36525;
 return k==='Sonne'?sunLon(T):(k==='Mond'?moonLon(T):geo(k,T));}

/* ── Sätze einsetzen ────────────────────────────────────── */
var T=GT_T;
/* Eine Lücke `{so}` je Schlüssel, in einem Durchgang. */
function gFuell(form,werte){
  var s=String(form||'');
  for(var k in werte) if(werte.hasOwnProperty(k))
    s=s.split('{'+k+'}').join(String(werte[k]===undefined||werte[k]===null?'':werte[k]));
  return s;
}
/* Nur der erste Buchstabe groß — deutscher Text wird nie
   kleingeschrieben (REGELN.md 4). */
function gGross(s){ return String(s).charAt(0).toUpperCase()+String(s).slice(1); }
/* Die Zeichen stehen einmal, in GT_ZEICHEN. */
function gZeichen(i){ return GT_ZEICHEN[i].n; }
function gGlyphe(i){ return GT_ZEICHEN[i].z; }
function elemVon(zi){ return GT_ELEMENTE[zi%4]; }
/* „12. Haus" an einer Stelle — und „dein/deinem/deines 12. Haus(es)"
   über B_BEUGE. Das Geschlecht und die Genitivform stehen in den
   Daten, der Fall in B_DEIN, nichts davon hier. */
function gHaus(n){ return gFuell(T.haus.wort,{n:n}); }
function gImHaus(n){ return gFuell(T.imHaus,{n:n}); }
function gDeinHaus(n,fall){
  return B_BEUGE({g:T.haus.g, wort:gHaus(n),
                  beugt:{gen:gFuell(T.haus.beugt.gen,{n:n})}}, fall||'nom');
}
/* Das Geschlecht des Planetennamens: {p} im Nominativ, {d} im
   Dativ. Die Tabellen stehen in GT_T, nicht hier. */
function pron(s,pl){ return String(s).replace(/\{p\}/g, T.pron[pl]||T.pron.Mond)
  .replace(/\{d\}/g, T.pron2[pl]||T.pron2.Mond); }

/* Klassische Herrscher */
var HERR=['Mars','Venus','Merkur','Mond','Sonne','Merkur','Venus','Mars',
 'Jupiter','Saturn','Saturn','Jupiter'];
/* Moderne Mitherrscher, nur als Hinweis */
var MITHERR={Skorpion:'Pluto',Wassermann:'Uranus',Fische:'Neptun'};
var DOMIZIL={Mars:[0,7],Venus:[1,6],Merkur:[2,5],Mond:[3],Sonne:[4],Jupiter:[8,11],Saturn:[9,10]};
var ERHOEHUNG={Sonne:0,Mond:1,Merkur:5,Venus:11,Mars:9,Jupiter:3,Saturn:6};

/* Merkur in Fische ist der einzige Fall, in dem Exil und Fall im gleichen
   Zeichen zusammenfallen — das gehört beides genannt. */
function wuerde(pl,zi){
  var d=DOMIZIL[pl];
  if(d&&d.indexOf(zi)>=0) return 'domizil';
  if(ERHOEHUNG[pl]===zi) return 'erhoehung';
  var exil=!!(d&&d.indexOf((zi+6)%12)>=0), fall=(ERHOEHUNG[pl]===((zi+6)%12));
  if(exil&&fall) return 'exilfall';
  if(exil) return 'exil';
  if(fall) return 'fall';
  return '';
}

/* Deutsches Dezimalkomma — 3.6° liest sich im Deutschen falsch */
function kz(x,n){ return x.toFixed(n===undefined?1:n).replace('.',','); }

function grad(l){ l=nrm(l); var r=l-Math.floor(l/30)*30, g=Math.floor(r),
 m=Math.round((r-g)*60); if(m===60){g++;m=0;} return g+'°'+(m<10?'0':'')+m+'′'; }
function stellung(l){ return grad(l)+' '+gZeichen(Math.floor(nrm(l)/30)); }

/* Kopfzeile eines Blocks: die technische Fassung und daneben eine in Worten.
   Welche sichtbar ist, entscheidet der Wissensstand (niveau.js). */
function kopf(voll, leicht){
  return '<div class="g-formel ac-tech">'+voll+'</div>'+
         '<div class="g-formel g-leicht" data-bis="1">'+leicht+'</div>';
}
function tf(s){ return '<span class="g-pf">'+s+'</span>'; }
function tp(s){ return '<span class="g-p">'+s+'</span>'; }
function tz(s){ return '<span class="g-z">'+s+'</span>'; }

/* ── Profil ───────────────────────────────────────────────── */
var gewaehlt=null;
function chartVon(p){
  var ut=p.h+p.mi/60-p.tz,y=p.y,mo=p.mo,d=p.d;
  if(ut<0){ut+=24;d-=1;} if(ut>=24){ut-=24;d+=1;}
  var jd=jdFromUT(y,mo,d,ut),T2=(jd-2451545)/36525,a=angles(jd,p.lat,p.lon);
  var C={Sonne:sunLon(T2),Mond:moonLon(T2),Merkur:geo('Merkur',T2),Venus:geo('Venus',T2),
   Mars:geo('Mars',T2),Jupiter:geo('Jupiter',T2),Saturn:geo('Saturn',T2),
   Uranus:geo('Uranus',T2),Neptun:geo('Neptun',T2),Pluto:geo('Pluto',T2),ASC:a.asc,MC:a.mc};
  C._jd=jd; C._T=T2;
  if(window.chironLon) C.Chiron=nrm(window.chironLon(T2));
  return C;
}
function profil(){
  var alle=[]; try{ alle=AC_P.alle()||[]; }catch(e){}
  if(!alle.length) return null;
  if(!gewaehlt){ var e=alle.filter(function(p){return p.eigen;})[0]||alle[0]; gewaehlt=e.id; }
  return alle.filter(function(x){return x.id===gewaehlt;})[0]||null;
}
function chart(){ var p=profil(); return p?chartVon(p):null; }
function ort(){
  var p=profil();
  if(!p) return {lat:52.52,lon:13.405,name:'Berlin',geraten:true};
  var la=(p.wlat!==undefined&&p.wlat!==null)?p.wlat:p.lat;
  var lo=(p.wlon!==undefined&&p.wlon!==null)?p.wlon:p.lon;
  return {lat:la,lon:lo,name:p.wort||p.ort||'',geraten:false};
}

/* ── Häuser, Aspekte ─────────────────────────────────────── */
function hausVon(C,l){ return ((Math.floor(nrm(l)/30)-Math.floor(C.ASC/30))%12+12)%12+1; }
function zeichenDesHauses(C,h){ return (Math.floor(C.ASC/30)+h-1)%12; }
function bewohner(C,h){
  var ks=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];
  return ks.filter(function(k){ return hausVon(C,C[k])===h; });
}
var WINKEL=[[0,'Konjunktion','flow'],[180,'Opposition','spannung'],
 [90,'Quadrat','spannung'],[120,'Trigon','flow'],[60,'Sextil','flow']];
function aspekt(C,a,b,orb){
  if(C[a]===undefined||C[b]===undefined) return null;
  var d=Math.abs(nrm(C[a]-C[b])); if(d>180) d=360-d;
  for(var i=0;i<WINKEL.length;i++){
    var A=WINKEL[i], o=Math.abs(d-A[0]), max=(A[0]===60?Math.min(orb,5):orb);
    if(o<=max) return {typ:A[1],art:A[2],orb:o};
  }
  return null;
}

/* ── Mondphase bei der Geburt ────────────────────────────── */
function phaseBeiGeburt(C){
  var a=nrm(C.Mond-C.Sonne);
  return {winkel:a, nr:Math.floor(a/45), ph:PHASEN[Math.floor(a/45)]};
}
function neumondDavor(jd){
  function ph(j){ var t=(j-2451545)/36525; return nrm(moonLon(t)-sunLon(t)); }
  var prev=null, nm=null;
  for(var j=jd-31;j<jd+0.0001;j+=1/48){ var v=ph(j); if(prev!==null&&v<prev) nm=j; prev=v; }
  if(nm===null) return null;
  var a=nm-1/48, b=nm;
  for(var i=0;i<40;i++){ var m=(a+b)/2; if(ph(m)>180) a=m; else b=m; }
  return (a+b)/2;
}
function neumondDanach(jd){
  function ph(j){ var t=(j-2451545)/36525; return nrm(moonLon(t)-sunLon(t)); }
  var prev=ph(jd), nm=null;
  for(var j=jd+1/48;j<jd+40;j+=1/48){ var v=ph(j); if(v<prev){ nm=j; break; } prev=v; }
  if(nm===null) return null;
  var a=nm-1/48, b=nm;
  for(var i=0;i<40;i++){ var m=(a+b)/2; if(ph(m)>180) a=m; else b=m; }
  return (a+b)/2;
}

/* ── Blöcke ──────────────────────────────────────────────── */
function bauTuer(C){
  var h12=zeichenDesHauses(C,12), hz=gZeichen(h12), pl=HERR[h12];
  var pz=Math.floor(nrm(C[pl])/30), ph=hausVon(C,C[pl]), w=wuerde(pl,pz);
  var D=TUER[pl];
  var bew=bewohner(C,12);
  var h='<div class="g-gross"><div class="g-k">'+T.tuerKopf+'</div>';
  h+=kopf(
    tz(gGlyphe(h12)+' '+hz)+tf(gFuell(T.tuerIst,{deinHaus:gDeinHaus(12)}))+tp(pl)+
      tf(T.tuerSteht)+tz(stellung(C[pl]))+
      tf(gFuell(T.tuerWuerde,{imHaus:gImHaus(ph),wuerde:T.wuerde[w]})),
    tf(T.tuerLeicht)+tz(hz)+tf(T.tuerVon)+tp(pl));
  h+='<div class="g-stoff">'+gFuell(T.tuerStoff,{stoff:D.stoff})+'</div>';
  h+='<p>'+D.tuer+'</p>';
  h+='<p class="g-bei">'+pron(TUERZEICHEN[gZeichen(pz)]||'',pl)+'</p>';
  if(w==='erhoehung'||w==='domizil')
    h+='<p class="g-stark">'+gFuell(T.tuerStark,
      {pl:pl,wuerde:T.wuerde[w],p:T.pron[pl]||T.pron.Mond})+'</p>';
  if(w==='exil'||w==='fall')
    h+='<p class="g-schwach">'+gFuell(T.tuerSchwach,
      {pl:pl,wuerde:T.wuerde[w],p:T.pron[pl]||T.pron.Mond})+'</p>';
  if(ph>=10)
    h+='<p class="g-raus">'+gFuell(T.tuerRaus,
      {deinHausGen:gDeinHaus(12,'gen'),imHaus:gImHaus(ph)})+'</p>';

  h+='<div class="g-reihe">';
  h+='<div class="gk"><b>'+T.tuerWie+'</b>'+D.wie+'</div>';
  h+='<div class="gk"><b>'+T.tuerWomit+'</b>'+D.womit+'</div>';
  h+='<div class="gk warn"><b>'+T.tuerNicht+'</b>'+D.nicht+'</div>';
  h+='</div>';

  if(bew.length)
    h+='<div class="g-bew">'+gFuell(T.tuerBew,{n:12,wer:bew.join(T.und),
      satz:(bew.length>1?T.tuerBewViele:T.tuerBewEiner),pl:pl})+'</div>';
  else
    h+='<div class="g-bew">'+gFuell(T.tuerLeer,
      {DeinHaus:gGross(gDeinHaus(12)),pl:pl})+'</div>';
  h+='</div>';
  el('tuer').innerHTML=h;
}

function bauKanal(C){
  var ch=HERR[Math.floor(C.ASC/30)];
  var mz=Math.floor(nrm(C.Merkur)/30), mh=hausVon(C,C.Merkur), mw=wuerde('Merkur',mz);
  var K=KANAL[gZeichen(mz)];
  var h='<div class="g-gross"><div class="g-k">'+T.kanalKopf+'</div>';
  h+=kopf(
    tp('Merkur')+tf(T.kanalIn)+tz(stellung(C.Merkur))+
      tf(gFuell(T.kanalWuerde,{imHaus:gImHaus(mh),wuerde:T.wuerde[mw]})),
    tf(T.kanalLeicht)+tz(gZeichen(mz)));
  h+='<p>'+gFuell(T.kanalWie,{wie:K.wie})+'</p>';
  h+='<div class="g-ueb"><b>'+T.kanalUebKopf+'</b>'+K.ueb+'</div>';
  h+='<p class="g-bei">'+KANALZUSTAND[mw]+'</p>';
  if(ch==='Merkur')
    h+='<p class="g-stark">'+T.kanalSelbst+'</p>';
  else
    h+='<p class="g-bei">'+gFuell(T.kanalHerr,{ch:ch,stellung:stellung(C[ch]),
      hausPunkt:gHaus(hausVon(C,C[ch]))})+'</p>';

  var li=[];
  ['Neptun','Pluto','Mond','Saturn'].forEach(function(k){
    var a=aspekt(C,'Merkur',k,6);
    if(!a) return;
    var A=T.kanalAspekt[k];
    li.push('<li><span class="w '+a.art+'">'+(a.art==='flow'?T.kanalOffen:T.kanalEng)+
      '</span>'+gFuell(T.kanalWinkel,{typ:a.typ,wer:k,orb:kz(a.orb),
        text:A.vor+' '+A[a.art]})+'</li>');
  });
  if(li.length) h+='<ul class="g-li">'+li.join('')+'</ul>';
  h+='</div>';
  el('kanal').innerHTML=h;
}

function bauForm(C){
  var nz=Math.floor(nrm(C.Neptun)/30), nh=hausVon(C,C.Neptun);
  var h='<div class="g-gross"><div class="g-k">'+T.formKopf+'</div>';
  h+=kopf(
    tp('Neptun')+tf(T.formIn)+tz(stellung(C.Neptun))+tf(gImHaus(nh)),
    tf(T.formLeicht)+tz(gZeichen(nz)));
  h+='<p>'+NEPTUN[elemVon(nz)]+'</p>';
  h+='<p>'+gFuell(T.formHaus,{t:NEPTUNHAUS[nh]})+'</p>';
  var sp=[];
  ['Sonne','Mond','Merkur','Jupiter'].forEach(function(k){
    var a=aspekt(C,'Neptun',k,6);
    if(a&&a.art==='spannung') sp.push({k:k,a:a});
  });
  if(sp.length)
    h+='<div class="g-ueb warn"><b>'+T.formGefaessKopf+'</b>'+
      gFuell(T.formGefaess,{
        wer:sp.map(function(x){ return gFuell(T.formPaar,
          {k:x.k,typ:x.a.typ,orb:kz(x.a.orb)}); }).join(T.und),
        sonne:(sp.filter(function(x){return x.k==='Sonne';}).length
               ? T.formGefaessSonne : '')})+'</div>';
  else
    h+='<div class="g-ueb"><b>'+T.formFreiKopf+'</b>'+T.formFrei+'</div>';
  h+='</div>';
  el('form').innerHTML=h;
}

function bauGlaube(C){
  var z9=zeichenDesHauses(C,9), pl=HERR[z9], ph=hausVon(C,C[pl]);
  var bew=bewohner(C,9), mit=MITHERR[gZeichen(z9)];
  var h='<div class="g-gross"><div class="g-k">'+T.glaubeKopf+'</div>';
  h+=kopf(
    tz(gGlyphe(z9)+' '+gZeichen(z9))+tf(gFuell(T.glaubeIst,{deinHaus:gDeinHaus(9)}))+
      tp(pl)+tf(gImHaus(ph)),
    tf(T.glaubeLeicht)+tz(gZeichen(z9)));
  h+='<p>'+GLAUBE[gZeichen(z9)]+'</p>';
  h+='<p><b>'+GLAUBEHAUS[ph]+'</b></p>';
  if(mit)
    h+='<p class="g-bei">'+gFuell(T.glaubeModern,{zeichen:gZeichen(z9),pl:mit,
      stellung:stellung(C[mit]),hausPunkt:gHaus(hausVon(C,C[mit]))})+'</p>';
  if(!bew.length)
    h+='<p class="g-bei">'+gFuell(T.glaubeLeer,{DeinHaus:gGross(gDeinHaus(9)),
      pl:pl,imHaus:gImHaus(ph)})+'</p>';
  else
    h+='<p class="g-bei">'+gFuell(T.glaubeBew,{n:9,wer:bew.join(T.und)})+'</p>';
  h+='</div>';
  el('glaube').innerHTML=h;
}

function bauSekte(C){
  var sh=hausVon(C,C.Sonne), tag=(sh>=7);
  var S=tag?SEKTE.tag:SEKTE.nacht;
  var mal=S.wer, mh=hausVon(C,C[mal]), mz=Math.floor(nrm(C[mal])/30), mw=wuerde(mal,mz);
  var h='<div class="g-gross"><div class="g-k">'+T.sekteKopf+'</div>';
  h+=kopf(
    tp(S.titel)+tf(gFuell(T.sekteTech,{imHaus:gImHaus(sh),
      wo:(tag?T.sekteUeber:T.sekteUnter)})),
    tp(S.titel)+tf(gFuell(T.sekteLeicht,{wann:(tag?T.sekteTag:T.sekteNacht)})));
  h+='<p>'+S.licht+'</p><p>'+S.gut+'</p>';
  h+='<div class="g-ueb warn"><b>'+T.sekteWarnKopf+'</b>'+S.warn+'<br><br>'+
     gFuell(T.sekteWo,{mal:mal,stellung:stellung(C[mal]),imHaus:gImHaus(mh),
       wuerde:(mw?gFuell(T.sekteWuerdeDazu,{w:T.wuerde[mw]}):'')});
  if(mh===12)
    h+=gFuell(T.sekteImZwoelften,{weg:T.sekteWeg[mal]||''});
  else if(HERR[zeichenDesHauses(C,12)]===mal)
    h+=gFuell(T.sekteHerrscht,{deinHaus:gDeinHaus(12)});
  else
    h+=T.sekteDraussen;
  h+='</div></div>';
  el('sekte').innerHTML=h;
}

function bauRhythmus(C){
  var mz=Math.floor(nrm(C.Mond)/30), R=RHYTHMUS[elemVon(mz)];
  var a=aspekt(C,'Mond','Saturn',6);
  var art=a?a.art:'';
  var P=phaseBeiGeburt(C);
  var nm=neumondDavor(C._jd);
  var h='<div class="g-gross"><div class="g-k">'+T.rhyKopf+'</div>';
  h+=kopf(
    tp('Mond')+tf(T.rhyIn)+tz(stellung(C.Mond))+tf(T.trenner)+tp(R.min),
    tf(T.rhyLeicht)+tz(gZeichen(mz))+tf(T.rhyLaenge)+tp(R.min));
  h+='<p>'+R.t+'</p>';
  h+='<p>'+MONDSATURN[art]+(a?' <span class="g-orb">'+
     gFuell(T.rhySaturn,{typ:a.typ,orb:kz(a.orb)})+'</span>':'')+'</p>';
  h+='<div class="g-phase"><div class="g-k">'+gFuell(T.rhyPhaseKopf,{n:P.ph.n})+'</div>'+
     '<div class="g-pw">'+gFuell(T.rhyPhaseWinkel,{grad:kz(P.winkel),nr:P.nr+1})+'</div>'+
     '<p>'+P.ph.t+'</p>';
  if(nm!==null){
    var std=(C._jd-nm)*24;
    h+='<p class="g-bei">'+gFuell(T.rhyNeumond,{datum:datum(nm),
      zeichen:gZeichen(Math.floor(nrm(lonVon('Sonne',nm))/30)),
      abstand:(std<48?gFuell(T.rhyStunden,{n:Math.round(std)})
                     :gFuell(T.rhyTage,{n:kz(std/24)}))})+'</p>';
  }
  h+='</div></div>';
  el('rhythmus').innerHTML=h;
}

function bauTief(C){
  var z8=zeichenDesHauses(C,8), bew=bewohner(C,8);
  var h='<div class="g-gross"><div class="g-k">'+T.tiefKopf+'</div>';
  h+=kopf(
    tz(gGlyphe(z8)+' '+gZeichen(z8))+tf(gFuell(T.tiefIst,{deinHaus:gDeinHaus(8)}))+
      (bew.length?tf(T.trenner)+tp(bew.join(T.undKomma)):''),
    tf(T.tiefLeicht)+tz(gZeichen(z8)));
  h+='<p>'+T.tiefAlt+'</p>';
  h+='<p>'+ACHT[elemVon(z8)]+'</p>';
  if(bew.length)
    h+='<p class="g-bei">'+gFuell(T.tiefBew,{wer:bew.join(T.und),
      verb:(bew.length>1?T.tiefStehen:T.tiefSteht)})+'</p>';
  if(C.Chiron!==undefined){
    var chh=hausVon(C,C.Chiron);
    h+='<div class="g-chiron"><div class="g-k">'+T.chironKopf+'</div>'+
      '<div class="g-pw">'+gFuell(T.chironStellung,{stellung:stellung(C.Chiron),
        hausPunkt:gHaus(chh)})+'</div><p>'+CHIRON[chh]+'</p>';
    var ca=aspekt(C,'Chiron','Saturn',7);
    if(ca&&ca.art==='spannung')
      h+='<p class="g-bei">'+gFuell(T.chironSaturn,{typ:ca.typ,orb:kz(ca.orb)})+'</p>';
    h+='</div>';
  }
  h+='</div>';
  el('tief').innerHTML=h;
}

/* ── Die Praxis, zusammengesetzt ────────────────────────── */
function bauPraxis(C){
  var h12=zeichenDesHauses(C,12), pl=HERR[h12], D=TUER[pl];
  var mondZ=Math.floor(nrm(C.Mond)/30), R=RHYTHMUS[elemVon(mondZ)];
  /* Hieß bis zum 2026-11-19 `kz` und hat damit die Zahlenformatierung
     überdeckt — ein Name, der im selben Geltungsbereich zweimal etwas
     anderes bedeutet. */
  var merkZ=Math.floor(nrm(C.Merkur)/30);
  var ch=HERR[Math.floor(C.ASC/30)];
  var tag=hausVon(C,C.Sonne)>=7;
  var schritte=[
   {k:T.prRahmen,    t:gFuell(T.prRahmenT,{min:R.min,wann:(tag?T.prTag:T.prNacht)})},
   {k:T.prOeffnen,   t:pron(D.wie,pl)},
   {k:T.prAnker,     t:gFuell(T.prAnkerT,{anker:D.anker})},
   {k:T.prFragen,    t:T.prFragenT},
   {k:T.prEmpfangen, t:gFuell(T.prEmpfangenT,{wie:KANAL[gZeichen(merkZ)].wie})},
   {k:T.prSchliessen,t:T.prSchliessenT},
   {k:T.prNachlesen, t:T.prNachlesenT}
  ];
  var h='<ol class="g-schritte">';
  schritte.forEach(function(s){ h+='<li><b>'+s.k+'</b>'+s.t+'</li>'; });
  h+='</ol>';
  h+='<div class="g-ueb"><b>'+T.prNameKopf+'</b>'+
    gFuell(T.prName,{ch:ch,stoff:D.stoff})+'</div>';
  el('praxis').innerHTML=h;
}

/* ── Deine Zeiten, live ─────────────────────────────────── */
function bauZeiten(C){
  var jd=jetztJD(), O=ort();
  var ch=HERR[Math.floor(C.ASC/30)];
  var h12=zeichenDesHauses(C,12), pl12=HERR[h12];
  var h='<div class="g-reihe g-zeiten">';
  var st=null;
  try{ st=AC_HIMMEL.planetenStunde(jd,O.lat,O.lon); }catch(e){}
  if(st&&!st.polar){
    h+='<div class="gk"><b>'+T.ztJetzt+'</b>'+gFuell(T.ztStunde,{gen:T.gen[st.herr]})+
       '<span>'+gFuell(T.ztTagesherr,{herr:st.tagesherr,bis:uhr(st.bis)})+'</span></div>';
    /* nächste Stunde des Chartherrschers und des 12.-Haus-Herrschers */
    [[ch,T.ztChartherrscher],[pl12,T.ztTuer]].forEach(function(x){
      if(!T.gen[x[0]]) return;
      var tab=null; try{ tab=AC_HIMMEL.stundenTabelle(jd,O.lat,O.lon); }catch(e){}
      var tr=null;
      if(tab&&tab.length) for(var i=0;i<tab.length;i++){ if(tab[i].herr===x[0]&&tab[i].bis>jd){ tr=tab[i]; break; } }
      h+='<div class="gk"><b>'+gFuell(T.ztRolle,{rolle:x[1],pl:x[0]})+'</b>'+
        (tr?(tr.von<=jd?T.ztLaeuft:gFuell(T.ztAb,{uhr:uhr(tr.von)})):T.ztKeine)+
        '<span>'+gFuell(T.ztTag,{wotag:T.wotag[x[0]]})+'</span></div>';
    });
  } else {
    h+='<div class="gk"><b>'+T.ztJetzt+'</b>'+T.ztPolar+'</div>';
  }
  /* Nächster Neumond */
  var nm=neumondDanach(jd);
  if(nm!==null){
    var nz=Math.floor(nrm(lonVon('Sonne',nm))/30);
    var eigen=(nz===Math.floor(nrm(C.Sonne)/30))?T.ztNeumondSonne:
              (nz===Math.floor(nrm(C.Mond)/30))?T.ztNeumondMond:
              (nz===h12)?gFuell(T.ztNeumondHaus,{deinHausDat:gDeinHaus(12,'dat')}):'';
    h+='<div class="gk'+(eigen?' warn':'')+'"><b>'+T.ztNeumondKopf+'</b>'+
       gFuell(T.ztNeumondWann,{datum:datum(nm),zeichen:gZeichen(nz)})+
       '<span>'+(eigen||T.ztRueckblick)+'</span></div>';
  }
  /* Mond durch dein 12. Haus */
  var ml=lonVon('Mond',jd), mzi=Math.floor(nrm(ml)/30);
  if(mzi===h12){
    h+='<div class="gk warn"><b>'+T.ztMondKopf+'</b>'+
       gFuell(T.ztMondJetzt,{zeichen:gZeichen(h12)})+
       '<span>'+T.ztMondJetztDazu+'</span></div>';
  } else {
    var dz=((h12-mzi)+12)%12;
    var tage=((dz*30)-(nrm(ml)-mzi*30))/13.18;
    h+='<div class="gk"><b>'+T.ztMondKopf+'</b>'+
       gFuell(T.ztMondBald,{n:Math.max(0,Math.round(tage))})+
       '<span>'+gFuell(T.ztMondBaldDazu,{zeichen:gZeichen(h12)})+'</span></div>';
  }
  h+='</div>';
  el('zeiten').innerHTML=h;
}

/* ── Profilwahl ─────────────────────────────────────────── */
function wahlBauen(){
  var box=el('gwahl'), alle=[];
  try{ alle=AC_P.alle()||[]; }catch(e){}
  box.innerHTML='';
  if(!alle.length){
    box.innerHTML='<p class="g-leer">'+T.leer+'</p>';
    return false;
  }
  if(!gewaehlt){ var e=alle.filter(function(p){return p.eigen;})[0]||alle[0]; gewaehlt=e.id; }
  var zn=false; try{ zn=AC_P.zeigeNamen(); }catch(e){}
  alle.forEach(function(p){
    var b=document.createElement('button');
    b.type='button';
    b.className='gw'+(p.id===gewaehlt?' ist':'');
    b.textContent=AC_P.anzeige(p,zn);
    b.addEventListener('click',function(){ gewaehlt=p.id; wahlBauen(); allesNeu(); });
    box.appendChild(b);
  });
  return true;
}

function allesNeu(){
  var C=chart();
  if(!C) return;
  el('gleer').style.display='none';
  el('ginhalt').style.display='';
  bauTuer(C); bauKanal(C); bauForm(C); bauGlaube(C);
  bauSekte(C); bauRhythmus(C); bauTief(C); bauPraxis(C); bauZeiten(C);
  /* Die Stufen-Nachbearbeitung über den neu gebauten Text noch einmal laufen lassen */
  if(window.AC_NIV&&window.AC_NIV.anwenden) try{ window.AC_NIV.anwenden(); }catch(e){}
}

(function(){
  if(!wahlBauen()){
    el('gleer').style.display='';
    el('ginhalt').style.display='none';
    return;
  }
  allesNeu();
  setInterval(function(){ var C=chart(); if(C) bauZeiten(C); }, 60000);
})();
