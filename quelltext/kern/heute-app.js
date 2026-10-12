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

  /* Der eine Satz, der jetzt gilt */
  var satz='Der Mond steht in <b>'+H_SIGNS[mz]+'</b> und läuft damit durch dein <b>'+
    mh+'. Haus</b> — '+H_HAUS[mh-1]+'. Das ist für die nächsten zwei Tage der Bereich, '+
    'in dem du am ehesten etwas merkst.';
  if(ol&&ol.leer) satz+=' Der Mond ist gerade <b>ohne Lauf</b> — bis '+
    uhr(ol.bis)+' lohnt sich nichts, was ein Ergebnis haben soll.';
  el('htsatz').innerHTML=satz;

  var f=[];
  if(st&&!st.polar) f.push(['Stunde',st.herr,'bis '+uhr(st.bis)]);
  if(st&&!st.polar) f.push(['Tag',st.tagesherr,n.toLocaleDateString('de-DE',{weekday:'long'})]);
  f.push(['Mond',H_SIGNS[mz],gradKurz(Q.Mond)]);
  f.push(['Dein Haus',mh+'. Haus',H_HAUS[mh-1]]);
  el('htfakten').innerHTML=f.map(function(x){
    return '<div class="ht-f"><div class="l">'+x[0]+'</div><div class="v">'+esc(x[1])+
      '</div><div class="z">'+esc(x[2])+'</div></div>'; }).join('');
}

/* ── Band 2 · Diese Woche ─────────────────────────────────── */
function wocheBauen(){
  var jd=jetztJD(), e=[];

  /* Planetenstunde endet */
  var st=null; try{ st=AC_HIMMEL.planetenStunde(jd,O.lat,O.lon); }catch(e2){}
  if(st&&!st.polar) e.push({jd:st.bis, jetzt:true, wann:uhr(st.bis), tag:'heute',
    tt:'Die Stunde '+(H_GEN[st.herr]||st.herr)+' endet',
    tx:'Planetenstunden sind der kleinste Taktgeber, den die Überlieferung kennt. '+
       'Wenn du etwas unter '+st.herr+' stellen willst, ist jetzt das Fenster.',
    wo:'zauber.html|Planetenstunden heute'});

  /* Mond wechselt das Zeichen und damit dein Haus */
  var zw=null; try{ zw=AC_HIMMEL.naechsterZeichenwechsel(jd); }catch(e2){}
  if(zw){
    var neuH=haus(P, zw.zeichen*30+1);
    e.push({jd:zw.jd, wann:uhr(zw.jd), tag:tagKurz(zw.jd),
      tt:'Der Mond wechselt in '+H_SIGNS[zw.zeichen],
      tx:'Damit wandert er in dein <b>'+neuH+'. Haus</b> — '+H_HAUS[neuH-1]+'. '+
         'Zweieinhalb Tage lang liegt dort die Aufmerksamkeit.',
      wo:'uebersicht.html#h'+neuH+'|Das '+neuH+'. Haus ansehen'});
  }

  /* Lunationen mit Ritualfenster */
  var lun=[]; try{ lun=AC_BOARD.lunationen(jd, jd+40)||[]; }catch(e2){}
  lun.slice(0,3).forEach(function(l){
    /* Die Lunation steht dort, wo der Mond steht: beim Neumond = Sonne,
       beim Vollmond gegenüber. */
    var ml=moonLon((l.jd-2451545)/36525);
    var h=haus(P,ml);
    e.push({jd:l.jd, wann:uhr(l.jd), tag:tagKurz(l.jd),
      tt:(l.art==='neu'?'Neumond':'Vollmond')+' in '+H_SIGNS[zI(ml)],
      tx:(l.art==='neu'
        ? 'Der Anfang eines Zyklus, in deinem <b>'+h+'. Haus</b> — '+H_HAUS[h-1]+'. '+
          'Dort lohnt es, jetzt etwas zu beginnen statt abzuschließen.'
        : 'Hier wird sichtbar, was zum letzten Neumond angelegt wurde — in deinem <b>'+
          h+'. Haus</b>, '+H_HAUS[h-1]+'.'),
      mit:(l.art==='neu'
        ? 'Kerze, Zettel und Stift. Einen Satz aufschreiben, was bis zum Vollmond passiert sein soll.'
        : 'Eine Kerze, und etwas, das weg darf. Nicht mehr.'),
      wo:'rituale.html|Das ganze Ritual'});
  });

  /* Stationen: Planeten, die drehen */
  var stn=[]; try{ stn=AC_BOARD.stationen(jd, 21)||[]; }catch(e2){}
  stn.forEach(function(s){
    var h=haus(P,s.lon);
    e.push({jd:s.jd, wann:tageBis(s.jd)<=0?'heute':'in '+tageBis(s.jd)+' T.', tag:tagKurz(s.jd),
      tt:s.planet+(s.direkt?' läuft wieder direkt':' wird rückläufig'),
      tx:'In deinem <b>'+h+'. Haus</b> — '+H_HAUS[h-1]+'. '+
        (s.direkt
         ? 'Was dort seit Wochen zäh war, nimmt wieder Fahrt auf. Nicht sofort, aber merklich.'
         : 'Dort wird es für eine Weile zäher. Nichts Neues anfangen, was dort hängt — überarbeiten ja.'),
      wo:'uebersicht.html#h'+h+'|Das '+h+'. Haus ansehen'});
  });

  e.sort(function(a,b){ return a.jd-b.jd; });
  e=e.filter(function(x){ return x.jd>=jd-0.02 && x.jd<=jd+10; }).slice(0,7);
  if(!e.length){ el('htwoche').innerHTML='<p class="ht-nix">In den nächsten zehn Tagen '+
    'steht nichts Datiertes an. Das kommt vor und ist eine gute Nachricht.</p>'; return; }
  el('htwoche').innerHTML=e.map(function(x){
    var wo='';
    if(x.wo){ var t=x.wo.split('|'); wo='<span class="wo"><a href="'+t[0]+'">'+t[1]+' →</a></span>'; }
    return '<div class="we'+(x.jetzt?' jetzt':'')+'">'+
      '<div class="wann"><b>'+esc(x.wann)+'</b>'+esc(x.tag)+'</div>'+
      '<div class="tt">'+esc(x.tt)+'</div><div class="tx">'+x.tx+'</div>'+
      (x.mit?'<div class="mit"><b>Dafür brauchst du</b>'+esc(x.mit)+'</div>':'')+wo+'</div>';
  }).join('');
}

/* ── Band 3 · Läuft ───────────────────────────────────────── */
function laeuftBauen(){
  var jd=jetztJD(), zeilen=[];
  ['Jupiter','Saturn','Uranus','Neptun','Pluto'].forEach(function(k){
    if(Q[k]===undefined) return;
    var h=haus(P,Q[k]);
    var a=(jd-30-2451545)/36525, b=(jd+30-2451545)/36525;
    var rw=nrm(geo(k,b)-geo(k,a))>180;
    /* Wie lange bleibt er noch in diesem Zeichen — Neptun und Pluto
       brauchen mehr als zehn Jahre Vorlauf, deshalb der weite Rahmen. */
    var ende=null;
    for(var t=jd; t<jd+7300; t+=5){
      if(zI(geo(k,(t-2451545)/36525))!==zI(Q[k])){ ende=t; break; }
    }
    var mon=ende?Math.round((ende-jd)/30.44):null;
    var bleibt = mon===null ? 'noch über 20 Jahre'
      : mon<1  ? 'wechselt in Kürze'
      : mon<24 ? 'noch gut '+(mon<2?'einen Monat':mon+' Monate')
      : 'noch gut '+Math.round(mon/12)+' Jahre';
    zeilen.push('<div class="lf"><div class="p">'+k+(rw?' <i>℞</i>':'')+'</div>'+
      '<div class="w">'+H_SIGNS[zI(Q[k])]+' '+gradKurz(Q[k])+'<br>'+bleibt+
        (rw?', rückläufig':'')+'</div>'+
      '<div class="d"><a href="uebersicht.html#h'+h+'">'+h+'. Haus</a> — '+H_HAUS[h-1]+
        '.</div></div>');
  });
  el('htlaeuft').innerHTML=zeilen.join('');
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
/* Bei „wenig" bleibt nur das erste Band stehen */
function anwenden(){
  var a=kapHeute(), knapp=(a==='wenig');
  ['htwocheteil','htlaeuftteil'].forEach(function(i){
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
  jetztBauen(p); radBauen(); wocheBauen(); laeuftBauen(); kapBauen(); anwenden();
  setInterval(function(){ Q=chartZu(jetztJD()); jetztBauen(p); }, 60000);
})();
