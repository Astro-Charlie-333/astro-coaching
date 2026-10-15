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

  /* Der eine Satz, der jetzt gilt — in Alltagssprache.
     Welcher Lebensbereich gerade dran ist, nicht welcher Planet
     wo steht. Die Mechanik steht darunter und erst ab Stufe 2. */
  var B=bereichZuHaus(mh);
  var satz='Die nächsten zwei Tage liegt deine Aufmerksamkeit vor allem bei einem Thema: <b>'+
    esc(B?B.name:H_HAUS[mh-1])+'</b>.';
  /* Kein toLowerCase: im Deutschen sind das Substantive und
     bleiben groß. Stattdessen ein Doppelpunkt davor. */
  if(B&&window.AC_BDAT&&AC_BDAT.BER[B.k])
    satz+=' Also: '+esc(AC_BDAT.BER[B.k].worum);
  if(ol&&ol.leer) satz+=' Dazu kommt: bis '+uhr(ol.bis)+
    ' lohnt sich nichts, was ein Ergebnis haben soll — Angefangenes bleibt heute eher liegen.';
  el('htsatz').innerHTML=satz;
  el('httech').innerHTML='<div class="ac-tech ht-techzeile" data-ab="2">Der Mond steht in '+
    H_SIGNS[mz]+' '+gradKurz(Q.Mond)+
    ' und läuft durch das '+mh+'. Haus — '+H_HAUS[mh-1]+
    (ol&&ol.leer?'. Mond ohne Lauf bis '+uhr(ol.bis):'')+'.</div>';

  /* Die Kacheln sind der Maschinenraum und bleiben bis Stufe 2 zu. */
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

/* Welcher Lebensbereich gehört zu einem Haus?
   Erst der, dessen Kernhaus es ist, sonst der erste, der es führt. */
function bereichZuHaus(h){
  if(!window.AC_BER) return null;
  var L=AC_BER.BEREICHE, i;
  for(i=0;i<L.length;i++) if(L[i].haeuser[0]===h) return L[i];
  for(i=0;i<L.length;i++) if(L[i].haeuser.indexOf(h)>=0) return L[i];
  return null;
}

/* ── Band 2 · Diese Woche ─────────────────────────────────── */
function wocheBauen(){
  var jd=jetztJD(), e=[];

  /* Planetenstunde endet — reine Mechanik, erst ab Stufe 2 */
  var st=null; try{ st=AC_HIMMEL.planetenStunde(jd,O.lat,O.lon); }catch(e2){}
  if(st&&!st.polar) e.push({jd:st.bis, jetzt:true, wann:uhr(st.bis), tag:'heute', ab:2,
    tt:'Die Stunde '+(H_GEN[st.herr]||st.herr)+' endet',
    tx:'Planetenstunden sind der kleinste Taktgeber, den die Überlieferung kennt. '+
       'Wenn du etwas unter '+st.herr+' stellen willst, ist jetzt das Fenster.',
    wo:'zauber.html|Planetenstunden heute'});

  /* Mond wechselt das Zeichen und damit dein Haus */
  var zw=null; try{ zw=AC_HIMMEL.naechsterZeichenwechsel(jd); }catch(e2){}
  if(zw){
    var neuH=haus(P, zw.zeichen*30+1), nB=bereichZuHaus(neuH);
    e.push({jd:zw.jd, wann:uhr(zw.jd), tag:tagKurz(zw.jd),
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
    /* Die Lunation steht dort, wo der Mond steht: beim Neumond = Sonne,
       beim Vollmond gegenüber. */
    var ml=moonLon((l.jd-2451545)/36525);
    var h=haus(P,ml), lB=bereichZuHaus(h);
    var lN=lB?lB.name:H_HAUS[h-1];
    e.push({jd:l.jd, wann:uhr(l.jd), tag:tagKurz(l.jd),
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
  stn.forEach(function(s){
    var h=haus(P,s.lon), sB=bereichZuHaus(h), sN=sB?sB.name:H_HAUS[h-1];
    e.push({jd:s.jd, wann:tageBis(s.jd)<=0?'heute':'in '+tageBis(s.jd)+' T.', tag:tagKurz(s.jd),
      tt:(s.direkt?'Es geht wieder voran: ':'Es wird zäher: ')+sN,
      tech:s.planet+(s.direkt?' läuft wieder direkt':' wird rückläufig')+
           ', in deinem '+h+'. Haus — '+H_HAUS[h-1]+'.',
      tx:(s.direkt
         ? 'Was in diesem Bereich seit Wochen zäh war, nimmt wieder Fahrt auf. '+
           'Nicht sofort, aber merklich.'
         : 'In diesem Bereich wird es für eine Weile mühsamer. Nichts Neues anfangen, '+
           'was dort ohnehin hängt — überarbeiten ja.'),
      wo:'bereiche.html#ber-'+(sB?sB.k:'')+'|Den Bereich ansehen'});
  });

  e.sort(function(a,b){ return a.jd-b.jd; });
  e=e.filter(function(x){ return x.jd>=jd-0.02 && x.jd<=jd+10; }).slice(0,7);
  if(!e.length){ el('htwoche').innerHTML='<p class="ht-nix">In den nächsten zehn Tagen '+
    'steht nichts Datiertes an. Das kommt vor und ist eine gute Nachricht.</p>'; return; }
  el('htwoche').innerHTML=e.map(function(x){
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

  var zeigen=bs.slice(0,3), schon={};
  /* Ein stiller Bereich am Ende: das ist die nützlichste Zeile
     der Liste, weil dort gerade nichts gegen einen arbeitet. */
  var still=bs[bs.length-1];
  if(still && zeigen.indexOf(still)<0 && still.laut<=1) zeigen.push(still);

  ziel.innerHTML=zeigen.map(function(b){
    var T=AC_BDAT.BER[b.k], L=AC_BDAT.LAUT[b.laut];
    if(!T) return '';
    /* Bei einem stillen Bereich ist die Stille die Nachricht.
       Sonst der Handgriff des stärksten Vorgangs — aber keiner
       zweimal: drei gleiche Sätze untereinander sagen nichts. */
    var erst='';
    if(b.laut===0 || !b.laeuft.length){
      erst='Hier arbeitet gerade nichts gegen dich. Wenn du in diesem Bereich etwas '+
           'vorhast, ist jetzt der Moment, es selbst anzufangen.';
    } else {
      for(var i=0;i<b.laeuft.length && !erst;i++){
        var W=AC_BDAT.WAND[b.laeuft[i].wanderer];
        if(W && !schon[W.tun]){ erst=W.tun; schon[W.tun]=true; }
      }
      if(!erst) erst='Was hier läuft, läuft wie in den Bereichen darüber — '+
                     'auf der Bereichsseite steht, was es hier bedeutet.';
    }
    return '<a class="ht-b" href="bereiche.html#ber-'+esc(b.k)+'">'+
      '<span class="ht-bp" style="background:'+L.farbe+'"></span>'+
      '<span class="ht-bn">'+esc(b.name)+'</span>'+
      '<span class="ht-bl" style="color:'+L.farbe+'">'+esc(L.n)+'</span>'+
      '<span class="ht-bs">'+esc(T.lautSatz[b.laut])+'</span>'+
      '<span class="ht-bt">'+esc(erst)+'</span></a>';
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
  kapBauen(); anwenden();
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
  jetztBauen(p); radBauen(); bereicheBauen(p); wocheBauen(); kapBauen(); anwenden();
  try{ if(window.AC_NIV) AC_NIV.leiste(el('nivleiste'), function(){
    jetztBauen(p); bereicheBauen(p); wocheBauen(); }); }catch(e){}
  try{ if(window.AC_NIV) AC_NIV.anwenden(); }catch(e){}
  setInterval(function(){ Q=chartZu(jetztJD()); jetztBauen(p);
    try{ if(window.AC_NIV) AC_NIV.anwenden(); }catch(e){} }, 60000);
})();
