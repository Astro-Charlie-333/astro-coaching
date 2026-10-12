/* Astro-Charlie · Geistführung — Rechnung und Darstellung */
function nrm(x){x=x%360;return x<0?x+360:x;}
function el(i){ return document.getElementById(i); }
function esc(s){ return String(s===undefined||s===null?'':s).replace(/[<>&"]/g,function(c){
 return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }
function jetztJD(){var n=new Date();
 return jdFromUT(n.getUTCFullYear(),n.getUTCMonth()+1,n.getUTCDate(),
   n.getUTCHours()+n.getUTCMinutes()/60+n.getUTCSeconds()/3600);}
function datVon(jd){ return new Date((jd-2440587.5)*86400000); }
function uhr(jd){ return datVon(jd).toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'}); }
function tagUhr(jd){ var d=datVon(jd);
 return d.toLocaleDateString('de-DE',{weekday:'short',day:'2-digit',month:'2-digit'})+', '+uhr(jd); }
function datum(jd){ return datVon(jd).toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit',year:'numeric'}); }
function lonVon(k,jd){var T=(jd-2451545)/36525;
 return k==='Sonne'?sunLon(T):(k==='Mond'?moonLon(T):geo(k,T));}

var ZEI=['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion',
 'Schütze','Steinbock','Wassermann','Fische'];
var GLYPH=['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
var ELEMENTE=['Feuer','Erde','Luft','Wasser'];
function elemVon(zi){ return ELEMENTE[zi%4]; }
/* Klassische Herrscher */
var HERR=['Mars','Venus','Merkur','Mond','Sonne','Merkur','Venus','Mars',
 'Jupiter','Saturn','Saturn','Jupiter'];
/* Moderne Mitherrscher, nur als Hinweis */
var MITHERR={Skorpion:'Pluto',Wassermann:'Uranus',Fische:'Neptun'};
var DOMIZIL={Mars:[0,7],Venus:[1,6],Merkur:[2,5],Mond:[3],Sonne:[4],Jupiter:[8,11],Saturn:[9,10]};
var ERHOEHUNG={Sonne:0,Mond:1,Merkur:5,Venus:11,Mars:9,Jupiter:3,Saturn:6};
var WOTAG={Sonne:'Sonntag',Mond:'Montag',Mars:'Dienstag',Merkur:'Mittwoch',
 Jupiter:'Donnerstag',Venus:'Freitag',Saturn:'Samstag'};
var GEN={Sonne:'der Sonne',Mond:'des Mondes',Merkur:'des Merkur',Venus:'der Venus',
 Mars:'des Mars',Jupiter:'des Jupiter',Saturn:'des Saturn'};

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
var WNAME={domizil:'im eigenen Zeichen',erhoehung:'in Erhöhung',exil:'im Exil',
 fall:'im Fall',exilfall:'im Exil und im Fall','':'peregrin'};

/* Deutsches Dezimalkomma — 3.6° liest sich im Deutschen falsch */
function kz(x,n){ return x.toFixed(n===undefined?1:n).replace('.',','); }
/* Genus der Planeten, damit „Dass sie in Fische steht" richtig wird */
var PRON={Sonne:'sie',Mond:'er',Merkur:'er',Venus:'sie',Mars:'er',Jupiter:'er',Saturn:'er'};
var PRON2={Sonne:'ihr',Mond:'ihm',Merkur:'ihm',Venus:'ihr',Mars:'ihm',Jupiter:'ihm',Saturn:'ihm'};
function pron(s,pl){ return String(s).replace(/\{p\}/g, PRON[pl]||'er')
  .replace(/\{d\}/g, PRON2[pl]||'ihm'); }

function grad(l){ l=nrm(l); var r=l-Math.floor(l/30)*30, g=Math.floor(r),
 m=Math.round((r-g)*60); if(m===60){g++;m=0;} return g+'°'+(m<10?'0':'')+m+'′'; }
function stellung(l){ return grad(l)+' '+ZEI[Math.floor(nrm(l)/30)]; }

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
  var jd=jdFromUT(y,mo,d,ut),T=(jd-2451545)/36525,a=angles(jd,p.lat,p.lon);
  var C={Sonne:sunLon(T),Mond:moonLon(T),Merkur:geo('Merkur',T),Venus:geo('Venus',T),
   Mars:geo('Mars',T),Jupiter:geo('Jupiter',T),Saturn:geo('Saturn',T),
   Uranus:geo('Uranus',T),Neptun:geo('Neptun',T),Pluto:geo('Pluto',T),ASC:a.asc,MC:a.mc};
  C._jd=jd; C._T=T;
  if(window.chironLon) C.Chiron=nrm(window.chironLon(T));
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
function nameVon(){ var p=profil(); if(!p) return 'dir';
 try{ return AC_P.anzeige(p,AC_P.zeigeNamen()); }catch(e){ return 'dir'; } }

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
  var h12=zeichenDesHauses(C,12), hz=ZEI[h12], pl=HERR[h12];
  var pz=Math.floor(nrm(C[pl])/30), ph=hausVon(C,C[pl]), w=wuerde(pl,pz);
  var T=TUER[pl];
  var bew=bewohner(C,12);
  var h='<div class="g-gross"><div class="g-k">Die Tür</div>';
  h+=kopf(
    tz(GLYPH[h12]+' '+hz)+tf('ist dein 12. Haus · Herrscher')+tp(pl)+tf('steht in')+
    tz(stellung(C[pl]))+tf('im '+ph+'. Haus · '+WNAME[w]),
    tf('Der Bereich hinter dem Vorhang gehört bei dir')+tz(hz)+
    tf('und wird geführt von')+tp(pl));
  h+='<div class="g-stoff">Dein Stoff: <b>'+T.stoff+'</b></div>';
  h+='<p>'+T.tuer+'</p>';
  h+='<p class="g-bei">'+pron(TUERZEICHEN[ZEI[pz]]||'',pl)+'</p>';
  if(w==='erhoehung'||w==='domizil')
    h+='<p class="g-stark">Und '+pl+' steht <b>'+WNAME[w]+'</b> — '+PRON[pl]+' kann, was '+PRON[pl]+' soll. '+
       'Das ist die stärkste Aussage in diesem Abschnitt: Dein Zugang zum Unsichtbaren ist nicht beschädigt, '+
       'er ist nur vielleicht unbenutzt.</p>';
  if(w==='exil'||w==='fall')
    h+='<p class="g-schwach">'+pl+' steht <b>'+WNAME[w]+'</b> — '+PRON[pl]+' arbeitet gegen das Material. '+
       'Das heißt nicht, dass die Tür zu ist. Es heißt, dass du sie bewusst bauen musst, '+
       'statt darauf zu warten, dass sie von selbst aufgeht.</p>';
  if(ph>=10)
    h+='<p class="g-raus"><b>Und es gehört nach draußen.</b> Der Herrscher deines 12. Hauses steht im '+ph+'. Haus — '+
       'im sichtbaren Teil des Charts. Deine verborgene Arbeit ist nicht als Privatkeller angelegt, '+
       'sondern als etwas, das rauskommt.</p>';

  h+='<div class="g-reihe">';
  h+='<div class="gk"><b>So</b>'+T.wie+'</div>';
  h+='<div class="gk"><b>Womit</b>'+T.womit+'</div>';
  h+='<div class="gk warn"><b>Nicht</b>'+T.nicht+'</div>';
  h+='</div>';

  if(bew.length){
    h+='<div class="g-bew"><b>Im 12. Haus selbst steht '+(bew.length>1?'':'')+
       bew.join(' und ')+'.</b> ';
    h+='In der alten Lehre ist das Haus des Verborgenen kein freundlicher Ort für Planeten — '+
       'was dort steht, wirkt, ohne gesehen zu werden. '+
       (bew.length>1?'Diese Planeten sind':'Dieser Planet ist')+
       ' bei dir Teil der Praxis, aber nicht ihr Eingang. Der Eingang ist '+pl+'.</div>';
  } else {
    h+='<div class="g-bew">Dein 12. Haus ist <b>leer</b>. Das ist kein Mangel — es heißt, '+
       'dass dein Zugang ganz über '+pl+' läuft und über nichts sonst. Einfacher, aber enger: '+
       'Es gibt bei dir eine Tür, nicht drei.</div>';
  }
  h+='</div>';
  el('tuer').innerHTML=h;
}

function bauKanal(C){
  var asz=Math.floor(C.ASC/30), ch=HERR[asz];
  var mz=Math.floor(nrm(C.Merkur)/30), mh=hausVon(C,C.Merkur), mw=wuerde('Merkur',mz);
  var K=KANAL[ZEI[mz]];
  var h='<div class="g-gross"><div class="g-k">Der Kanal</div>';
  h+=kopf(
    tp('Merkur')+tf('in')+tz(stellung(C.Merkur))+tf('im '+mh+'. Haus · '+WNAME[mw]),
    tf('Dein Denken und Empfangen steht in')+tz(ZEI[mz]));
  h+='<p>Es kommt bei dir <b>'+K.wie+'</b>.</p>';
  h+='<div class="g-ueb"><b>Deine Übung</b>'+K.ueb+'</div>';
  h+='<p class="g-bei">'+KANALZUSTAND[mw]+'</p>';
  if(ch==='Merkur')
    h+='<p class="g-stark">Und Merkur ist bei dir zugleich <b>Chartherrscher</b> — Herrscher deines Aszendenten. '+
       'Das heißt: Dieser Kanal ist nicht eine Nebenfähigkeit, er ist die Art, wie du überhaupt in der Welt bist. '+
       'Was du empfängst, ist bei dir nie nur Information. Es ist Identität.</p>';
  else
    h+='<p class="g-bei">Dein Chartherrscher ist <b>'+ch+'</b> ('+stellung(C[ch])+', '+hausVon(C,C[ch])+'. Haus) — '+
       'der Planet, der dich insgesamt führt. Merkur ist der Empfang; '+ch+' ist die Richtung.</p>';

  var ns=[['Neptun','Neptun'],['Pluto','Pluto'],['Mond','Mond'],['Saturn','Saturn']];
  var li=[];
  ns.forEach(function(x){
    var a=aspekt(C,'Merkur',x[0],6);
    if(a) li.push('<li><span class="w '+a.art+'">'+(a.art==='flow'?'offen':'eng')+'</span>'+
      '<b>Merkur '+a.typ+' '+x[1]+'</b> ('+kz(a.orb)+'°) — '+
      ({Neptun:'die klassische Verbindung zum Unsichtbaren. '+(a.art==='flow'?'Sie ist bei dir offen: Eindrücke kommen leicht und oft.':'Sie ist bei dir unter Spannung: Es kommt viel, aber du traust es dir nicht zu. Das ist der Winkel, der nach Beleg verlangt.'),
        Pluto:'die Tiefe. '+(a.art==='flow'?'Du liest, was unter der Oberfläche liegt, ohne Mühe.':'Du liest es auch, aber es kostet dich etwas. Dosieren.'),
        Mond:'Gefühl und Wort liegen bei dir zusammen. '+(a.art==='flow'?'Du kannst sagen, was du spürst — das ist die halbe Arbeit.':'Du spürst früher, als du sagen kannst. Erst Körper, dann Worte.'),
        Saturn:'Struktur am Denken. '+(a.art==='flow'?'Du kannst ordnen, was kommt. Verlass dich darauf.':'Du prüfst zu hart und verwirfst zu früh. Schreib erst alles auf, urteile später.')})[x[0]]+'</li>');
  });
  if(li.length) h+='<ul class="g-li">'+li.join('')+'</ul>';
  h+='</div>';
  el('kanal').innerHTML=h;
}

function bauForm(C){
  var nz=Math.floor(nrm(C.Neptun)/30), nh=hausVon(C,C.Neptun);
  var h='<div class="g-gross"><div class="g-k">Wie viel Form du brauchst</div>';
  h+=kopf(
    tp('Neptun')+tf('in')+tz(stellung(C.Neptun))+tf('im '+nh+'. Haus'),
    tf('Dein Planet für alles Unscharfe steht in')+tz(ZEI[nz]));
  h+='<p>'+NEPTUN[elemVon(nz)]+'</p>';
  h+='<p>Er steht '+NEPTUNHAUS[nh]+'</p>';
  var sp=[];
  ['Sonne','Mond','Merkur','Jupiter'].forEach(function(k){
    var a=aspekt(C,'Neptun',k,6);
    if(a&&a.art==='spannung') sp.push({k:k,a:a});
  });
  if(sp.length){
    h+='<div class="g-ueb warn"><b>Das Gefäß ist Pflicht, nicht Kür</b>'+
      'Neptun steht bei dir in Spannung zu '+sp.map(function(x){return x.k+' ('+x.a.typ+', '+kz(x.a.orb)+'°)';}).join(' und ')+'. '+
      'Das ist die Stelle, an der es ohne Form kippt — entweder zu viel Glauben oder plötzlich gar keiner, '+
      (sp.filter(function(x){return x.k==='Sonne';}).length?'und mit der Sonne dabei auch das Gefühl, wer du eigentlich bist. ':'')+
      'Deshalb: feste Uhrzeit, festes Heft, feste Länge. Nicht aus Strenge — als Schutz.</div>';
  } else {
    h+='<div class="g-ueb"><b>Du hast Spielraum</b>Neptun steht bei dir frei von harten Winkeln zu den persönlichen Planeten. '+
      'Du kannst mit offenen Formen arbeiten, ohne dich zu verlieren. Die Form ist bei dir Komfort, nicht Notwehr.</div>';
  }
  h+='</div>';
  el('form').innerHTML=h;
}

function bauGlaube(C){
  var z9=zeichenDesHauses(C,9), pl=HERR[z9], ph=hausVon(C,C[pl]);
  var bew=bewohner(C,9);
  var h='<div class="g-gross"><div class="g-k">Woran du glaubst — und wo das gemacht wird</div>';
  h+=kopf(
    tz(GLYPH[z9]+' '+ZEI[z9])+tf('ist dein 9. Haus · Herrscher')+tp(pl)+tf('im '+ph+'. Haus'),
    tf('Dein Glaubensbereich gehört')+tz(ZEI[z9]));
  h+='<p>'+GLAUBE[ZEI[z9]]+'</p>';
  h+='<p><b>'+GLAUBEHAUS[ph]+'</b></p>';
  if(MITHERR[ZEI[z9]])
    h+='<p class="g-bei">Modern wird '+ZEI[z9]+' auch '+MITHERR[ZEI[z9]]+' zugeordnet ('+
       stellung(C[MITHERR[ZEI[z9]]])+', '+hausVon(C,C[MITHERR[ZEI[z9]]])+'. Haus). '+
       'Diese Seite rechnet klassisch, aber beides zusammen gelesen ergibt oft das vollständigere Bild.</p>';
  if(!bew.length)
    h+='<p class="g-bei">Dein 9. Haus ist leer. Das heißt nicht, dass du nicht glaubst — es heißt, '+
       'dass dein Glaube nicht an einem Ort sitzt, sondern dort gemacht wird, wo '+pl+' steht: im '+ph+'. Haus.</p>';
  else
    h+='<p class="g-bei">Im 9. Haus selbst steht '+bew.join(' und ')+' — '+
       'da arbeitet dein Glaube unmittelbar, nicht über einen Umweg.</p>';
  h+='</div>';
  el('glaube').innerHTML=h;
}

function bauSekte(C){
  var sh=hausVon(C,C.Sonne), tag=(sh>=7);
  var S=tag?SEKTE.tag:SEKTE.nacht;
  var mal=S.wer, mh=hausVon(C,C[mal]), mz=Math.floor(nrm(C[mal])/30), mw=wuerde(mal,mz);
  var h='<div class="g-gross"><div class="g-k">Deine Sekte</div>';
  h+=kopf(
    tp(S.titel)+tf('Sonne im '+sh+'. Haus, also '+(tag?'über':'unter')+' dem Horizont'),
    tp(S.titel)+tf('du bist '+(tag?'bei Tageslicht':'nach Sonnenuntergang')+' geboren'));
  h+='<p>'+S.licht+'</p><p>'+S.gut+'</p>';
  h+='<div class="g-ueb warn"><b>Die wacklige Stelle</b>'+S.warn+'<br><br>'+
     'Bei dir steht '+mal+' in '+stellung(C[mal])+', im '+mh+'. Haus'+(mw?', '+WNAME[mw]:'')+'. ';
  if(mh===12) h+='<b>Und zwar im 12. Haus selbst</b> — genau in dem Feld, um das es auf dieser Seite geht. '+
    'Das ist die klarste Warnung, die dein Chart hier ausspricht: Der Weg über '+
    (mal==='Mars'?'Kraft, Zwang und Durchhalten':'Strenge, Verzicht und Selbstdisziplin bis zur Härte')+
    ' ist bei dir nicht nur unergiebig, er ist die Stelle, an der es trüb wird.';
  else if(HERR[zeichenDesHauses(C,12)]===mal) h+='<b>Und er herrscht über dein 12. Haus</b> — '+
    'das heißt, du kommst nicht um ihn herum, sondern musst ihn mild halten: kurz, dosiert, mit Pause.';
  else h+='Er ist also nicht direkt am Verborgenen beteiligt. Gut — halte ihn da auch raus.';
  h+='</div></div>';
  el('sekte').innerHTML=h;
}

function bauRhythmus(C){
  var mz=Math.floor(nrm(C.Mond)/30), R=RHYTHMUS[elemVon(mz)];
  var a=aspekt(C,'Mond','Saturn',6);
  var art=a?a.art:'';
  var P=phaseBeiGeburt(C);
  var nm=neumondDavor(C._jd);
  var h='<div class="g-gross"><div class="g-k">Dein Rhythmus</div>';
  h+=kopf(
    tp('Mond')+tf('in')+tz(stellung(C.Mond))+tf('·')+tp(R.min),
    tf('Dein Mond steht in')+tz(ZEI[mz])+tf('· deine Länge:')+tp(R.min));
  h+='<p>'+R.t+'</p>';
  h+='<p>'+MONDSATURN[art]+(a?' <span class="g-orb">(Mond '+a.typ+' Saturn, '+kz(a.orb)+'°)</span>':'')+'</p>';
  h+='<div class="g-phase"><div class="g-k">Mondphase bei der Geburt · '+P.ph.n+'</div>'+
     '<div class="g-pw">'+kz(P.winkel)+'° zwischen Sonne und Mond — Phase '+(P.nr+1)+' von 8</div>'+
     '<p>'+P.ph.t+'</p>';
  if(nm!==null){
    var std=(C._jd-nm)*24;
    h+='<p class="g-bei">Der Neumond davor war am '+datum(nm)+' in '+ZEI[Math.floor(nrm(lonVon('Sonne',nm))/30)]+
       ' — '+(std<48?Math.round(std)+' Stunden':kz(std/24)+' Tage')+' vor deiner Geburt.</p>';
  }
  h+='</div></div>';
  el('rhythmus').innerHTML=h;
}

function bauTief(C){
  var z8=zeichenDesHauses(C,8), bew=bewohner(C,8);
  var h='<div class="g-gross"><div class="g-k">Die dünne Stelle</div>';
  h+=kopf(
    tz(GLYPH[z8]+' '+ZEI[z8])+tf('ist dein 8. Haus')+
      (bew.length?tf('·')+tp(bew.join(', ')):''),
    tf('Der Bereich der Übergänge gehört bei dir')+tz(ZEI[z8]));
  h+='<p>In der alten Lehre ist das 8. Haus das Haus dessen, was man nicht sieht und trotzdem erbt: '+
     'der Toten, des Übergangs, des Verschwiegenen. Wer mit Führung arbeitet, arbeitet hier.</p>';
  h+='<p>'+ACHT[elemVon(z8)]+'</p>';
  if(bew.length)
    h+='<p class="g-bei">Dass '+bew.join(' und ')+' dort '+(bew.length>1?'stehen':'steht')+', '+
       'macht diese Stelle bei dir aktiv — sie meldet sich, ob du willst oder nicht. '+
       'Das ist ein Argument für eine feste Form: nicht um es zu unterdrücken, '+
       'sondern damit es einen Platz hat.</p>';
  if(C.Chiron!==undefined){
    var cz=Math.floor(C.Chiron/30), chh=hausVon(C,C.Chiron);
    h+='<div class="g-chiron"><div class="g-k">Die Wunde am Empfangen · Chiron</div>'+
      '<div class="g-pw">'+stellung(C.Chiron)+' · '+chh+'. Haus</div><p>'+CHIRON[chh]+'</p>';
    var ca=aspekt(C,'Chiron','Saturn',7);
    if(ca&&ca.art==='spannung')
      h+='<p class="g-bei">Chiron steht dabei in Spannung zu Saturn ('+ca.typ+', '+kz(ca.orb)+'°) — '+
        'das ist typischerweise die Erfahrung, einmal gesagt bekommen zu haben, dass die eigene '+
        'Wahrnehmung nicht zählt. Von außen, von jemandem mit Autorität. Es ist nachvollziehbar, '+
        'dass du dir selbst zuerst nicht glaubst. Es ist aber nicht wahr.</p>';
    h+='</div>';
  }
  h+='</div>';
  el('tief').innerHTML=h;
}

/* ── Die Praxis, zusammengesetzt ────────────────────────── */
function bauPraxis(C){
  var h12=zeichenDesHauses(C,12), pl=HERR[h12], T=TUER[pl];
  var mz=Math.floor(nrm(C.Mond)/30), R=RHYTHMUS[elemVon(mz)];
  var kz=Math.floor(nrm(C.Merkur)/30);
  var asz=Math.floor(C.ASC/30), ch=HERR[asz];
  var tag=hausVon(C,C.Sonne)>=7;
  var schritte=[
   {k:'Rahmen',t:'<b>'+R.min+'</b>, immer zur gleichen Zeit, immer am gleichen Ort. '+
     (tag?'Am Tag, im Hellen.':'Abends oder nachts.')+' Nicht länger — Länge ist bei dir kein Qualitätsmerkmal.'},
   {k:'Öffnen',t:pron(T.wie,pl)},
   {k:'Anker',t:'Ein Gegenstand, der <b>immer derselbe</b> ist: '+T.anker+'. '+
     'Nicht wechseln. Der Gegenstand macht die Arbeit der Erinnerung, nicht dein Wille.'},
   {k:'Fragen',t:'Eine Frage, ausgeschrieben, oben auf die Seite. <b>Mit Datum.</b> '+
     'Offene Fragen („was braucht X") tragen weiter als Ja-Nein-Fragen.'},
   {k:'Empfangen',t:'Es kommt bei dir '+KANAL[ZEI[kz]].wie+'. Nimm das erste, nicht das dritte — '+
     'das dritte hast du gemacht.'},
   {k:'Schließen',t:'Danken und aufhören. Ein Satz reicht. Dann etwas Körperliches: '+
     'Hände waschen, etwas essen, rausgehen. Ohne Abschluss bleibt die Tür auf.'},
   {k:'Nachlesen',t:'Einmal im Monat, zum Neumond: Heft von vorn, mit Datum danebenlegen. '+
     'Was ist eingetroffen, was nicht. <b>Das ist der Teil, der aus Gefühl Erfahrung macht</b> — '+
     'und in der Tradition heißt er Unterscheidung der Geister, nicht Skepsis.'}
  ];
  var h='<ol class="g-schritte">';
  schritte.forEach(function(s){ h+='<li><b>'+s.k+'</b>'+s.t+'</li>'; });
  h+='</ol>';
  h+='<div class="g-ueb"><b>Und wenn du dafür einen Namen brauchst</b>'+
    'Ob du das, was antwortet, Führung nennst, Ahnen, höheres Selbst, '+ch+' oder einfach „das, was ich weiß, '+
    'wenn ich still bin" — die Tradition schreibt dir das nicht vor, und dein Chart auch nicht. '+
    'Was dein Chart vorschreibt, ist der <b>Stoff</b>: '+T.stoff+'. Daran musst du dich halten, '+
    'nicht an eine Bezeichnung.</div>';
  el('praxis').innerHTML=h;
}

/* ── Deine Zeiten, live ─────────────────────────────────── */
function bauZeiten(C){
  var jd=jetztJD(), O=ort();
  var asz=Math.floor(C.ASC/30), ch=HERR[asz];
  var h12=zeichenDesHauses(C,12), pl12=HERR[h12];
  var h='<div class="g-reihe g-zeiten">';
  var st=null;
  try{ st=AC_HIMMEL.planetenStunde(jd,O.lat,O.lon); }catch(e){}
  if(st&&!st.polar){
    h+='<div class="gk"><b>Jetzt</b>Stunde '+GEN[st.herr]+'<span>Tagesherr: '+st.tagesherr+
       ' · bis '+uhr(st.bis)+'</span></div>';
    /* nächste Stunde des Chartherrschers und des 12.-Haus-Herrschers */
    [[ch,'Chartherrscher'],[pl12,'Tür']].forEach(function(x){
      if(!GEN[x[0]]) return;
      var tab=null; try{ tab=AC_HIMMEL.stundenTabelle(jd,O.lat,O.lon); }catch(e){}
      var tr=null;
      if(tab&&tab.length) for(var i=0;i<tab.length;i++){ if(tab[i].herr===x[0]&&tab[i].bis>jd){ tr=tab[i]; break; } }
      h+='<div class="gk"><b>'+x[1]+' · '+x[0]+'</b>'+
        (tr?('Nächste Stunde '+(tr.von<=jd?'läuft jetzt':'ab '+uhr(tr.von))):'heute keine mehr')+
        '<span>Tag: '+WOTAG[x[0]]+'</span></div>';
    });
  } else {
    h+='<div class="gk"><b>Jetzt</b>Planetenstunden gibt es an diesem Ort gerade nicht — '+
       'die Sonne geht nicht auf oder nicht unter.</div>';
  }
  /* Nächster Neumond */
  var nm=neumondDanach(jd);
  if(nm!==null){
    var nz=Math.floor(nrm(lonVon('Sonne',nm))/30);
    var eigen=(nz===Math.floor(nrm(C.Sonne)/30))?' — in deinem Sonnenzeichen':
              (nz===Math.floor(nrm(C.Mond)/30))?' — in deinem Mondzeichen':
              (nz===h12)?' — in deinem 12. Haus':'';
    h+='<div class="gk'+(eigen?' warn':'')+'"><b>Nächster Neumond</b>'+datum(nm)+' in '+ZEI[nz]+
       '<span>'+(eigen?eigen.replace(' — ',''):'Rückblick-Termin')+'</span></div>';
  }
  /* Mond durch dein 12. Haus */
  var ml=lonVon('Mond',jd), mzi=Math.floor(nrm(ml)/30);
  if(mzi===h12){
    h+='<div class="gk warn"><b>Mond im 12.</b>jetzt — in '+ZEI[h12]+
       '<span>die stillste Zeit im Monat, zweieinhalb Tage lang</span></div>';
  } else {
    var dz=((h12-mzi)+12)%12;
    var tage=((dz*30)-(nrm(ml)-mzi*30))/13.18;
    h+='<div class="gk"><b>Mond im 12.</b>in etwa '+Math.max(0,Math.round(tage))+' Tagen'+
       '<span>'+ZEI[h12]+' · jeden Monat zweieinhalb Tage</span></div>';
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
    box.innerHTML='<p class="g-leer">Noch kein Profil angelegt. '+
      '<a href="profile.html">Hier legst du eins an</a> — ohne Geburtszeit und Geburtsort '+
      'kann diese Seite nichts rechnen, weil alles hier an den Häusern hängt.</p>';
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
