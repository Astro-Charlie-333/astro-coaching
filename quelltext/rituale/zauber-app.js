/* ── Zauber: Rechnung und Darstellung ─────────────────── */
function nrm(x){x=x%360;return x<0?x+360:x;}
function jetztJD(){var n=new Date();
 return jdFromUT(n.getUTCFullYear(),n.getUTCMonth()+1,n.getUTCDate(),
   n.getUTCHours()+n.getUTCMinutes()/60+n.getUTCSeconds()/3600);}
function datVon(jd){ return new Date((jd-2440587.5)*86400000); }
function uhr(jd){ return datVon(jd).toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'}); }
function tagUhr(jd){ var d=datVon(jd);
 return d.toLocaleDateString('de-DE',{weekday:'short',day:'2-digit',month:'2-digit'})+', '+uhr(jd); }
function lonVon(k,jd){var T=(jd-2451545)/36525;
 return k==='Sonne'?sunLon(T):(k==='Mond'?moonLon(T):geo(k,T));}
/* Genitiv — „der Tag des Sonne" geht nicht */
var GEN={Sonne:'der Sonne',Mond:'des Mondes',Merkur:'des Merkur',Venus:'der Venus',
         Mars:'des Mars',Jupiter:'des Jupiter',Saturn:'des Saturn'};
/* Datum nur nennen, wenn es nicht heute ist */
function wannKurz(jd){
  var d=datVon(jd), n=new Date();
  var gleich=d.getFullYear()===n.getFullYear()&&d.getMonth()===n.getMonth()&&d.getDate()===n.getDate();
  return gleich? uhr(jd) : tagUhr(jd);
}
function esc(s){ return String(s===undefined||s===null?'':s).replace(/[<>&"]/g,function(c){
 return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }
function el(i){ return document.getElementById(i); }

var ZEI=[['Widder','♈'],['Stier','♉'],['Zwillinge','♊'],['Krebs','♋'],
 ['Löwe','♌'],['Jungfrau','♍'],['Waage','♎'],['Skorpion','♏'],
 ['Schütze','♐'],['Steinbock','♑'],['Wassermann','♒'],['Fische','♓']];

/* ── Profil ───────────────────────────────────────────── */
var gewaehlt=null, zielWahl='geld', planetWahl=null;
function chartVon(p){
  var ut=p.h+p.mi/60-p.tz,y=p.y,mo=p.mo,d=p.d;
  if(ut<0){ut+=24;d-=1;} if(ut>=24){ut-=24;d+=1;}
  var jd=jdFromUT(y,mo,d,ut),T=(jd-2451545)/36525,a=angles(jd,p.lat,p.lon);
  return {Sonne:sunLon(T),Mond:moonLon(T),Merkur:geo('Merkur',T),Venus:geo('Venus',T),
   Mars:geo('Mars',T),Jupiter:geo('Jupiter',T),Saturn:geo('Saturn',T),
   Uranus:geo('Uranus',T),Neptun:geo('Neptun',T),Pluto:geo('Pluto',T),ASC:a.asc,MC:a.mc};
}
function hausVon(P,l){ return ((Math.floor(l/30)-Math.floor(P.ASC/30))%12+12)%12+1; }
function profil(){
  var alle=[]; try{ alle=AC_P.alle()||[]; }catch(e){}
  if(!alle.length) return null;
  if(!gewaehlt){ var e=alle.filter(function(p){return p.eigen;})[0]||alle[0]; gewaehlt=e.id; }
  return alle.filter(function(x){return x.id===gewaehlt;})[0]||null;
}
function chart(){ var p=profil(); return p?chartVon(p):null; }
/* Ort für die Sonnenzeiten: Wohnort aus dem Profil, sonst Geburtsort, sonst Berlin */
function ort(){
  var p=profil();
  if(!p) return {lat:52.52,lon:13.405,name:'Berlin',geraten:true};
  var la=(p.wlat!==undefined&&p.wlat!==null)?p.wlat:p.lat;
  var lo=(p.wlon!==undefined&&p.wlon!==null)?p.wlon:p.lon;
  return {lat:la,lon:lo,name:p.wort||p.ort||'',geraten:false};
}

/* ── Jetzt: Planetentag, Planetenstunde, Mond ─────────── */
function jetztBauen(){
  var jd=jetztJD(), O=ort();
  var st=AC_HIMMEL.planetenStunde(jd,O.lat,O.lon);
  var ml=lonVon('Mond',jd), zi=Math.floor(nrm(ml)/30);
  var ol=AC_HIMMEL.ohneLauf(jd);
  var P=chart();

  var h='<div class="jz">';
  if(st.polar){
    h+='<div class="jz-k">Jetzt</div><div class="jz-gr">Planetenstunden gibt es hier gerade nicht</div>'+
      '<p>An diesem Ort geht die Sonne zurzeit nicht auf oder nicht unter. Planetenstunden teilen den '+
      'Tag zwischen Sonnenauf- und -untergang — ohne die beiden gibt es nichts zu teilen.</p></div>';
    el('jetztbox').innerHTML=h; return;
  }
  var pd=PLANET[st.tagesherr], ph=PLANET[st.herr];
  h+='<div class="jz-k">Jetzt gerade</div>'+
    '<div class="jz-gr"><span class="gl">'+ph.zchn+'</span> Stunde '+GEN[st.herr]+'</div>'+
    '<p>'+esc(ph.kurz)+'. Diese Stunde läuft noch bis <b>'+uhr(st.bis)+'</b>, dann übernimmt '+
    AC_HIMMEL.CHALD[(AC_HIMMEL.CHALD.indexOf(st.herr)+1)%7]+'.</p>'+
    '<p>Heute ist <b>'+pd.tag+'</b>, der Tag des '+st.tagesherr+' — das färbt alle 24 Stunden. '+
    'Es ist die '+st.nr+'. Stunde seit Sonnenaufgang'+(st.nacht?' (Nachtstunde)':'')+
    ', sie dauert '+Math.round(st.laengeMin)+' Minuten.</p>';

  h+='<div class="jz-gitter">';
  h+='<div class="jzk"><b>Mond</b>'+ZEI[zi][1]+' '+ZEI[zi][0]+
     (P?'<br>dein '+hausVon(P,ml)+'. Haus':'')+'</div>';
  h+='<div class="jzk"><b>Sonne</b>auf '+uhr(st.auf)+' · unter '+uhr(st.unter)+
     (O.name?'<br>'+esc(O.name):'')+'</div>';
  if(ol){
    h+='<div class="jzk'+(ol.leer?' warn':'')+'"><b>Mond ohne Lauf</b>'+
      (ol.leer?'ja, seit '+uhr(ol.seit)+'<br>bis '+wannKurz(ol.bis)
             :'nein<br>Wechsel '+wannKurz(ol.bis))+'</div>';
  }
  h+='</div>';
  if(ol&&ol.leer){
    h+='<div class="jz-warn"><b>Der Mond läuft gerade leer.</b> Seit seinem letzten Aspekt '+
      '('+ol.letzter.name+' zu '+ol.letzter.planet+' um '+uhr(ol.letzter.jd)+') berührt er bis zum '+
      'Zeichenwechsel nichts mehr. Die Überlieferung ist hier ungewöhnlich einhellig: '+
      '<b>nichts Neues anfangen</b>. Was jetzt beginnt, verläuft im Sand — was jetzt endet, endet gut. '+
      'Vorbei ist es '+wannKurz(ol.bis)+' Uhr, dann tritt der Mond in '+ZEI[ol.naechstesZeichen][0]+'.</div>';
  }
  h+='</div>';
  el('jetztbox').innerHTML=h;
}

/* ── Stundentafel ─────────────────────────────────────── */
function tafelBauen(){
  var jd=jetztJD(), O=ort();
  var t=AC_HIMMEL.stundenTabelle(jd,O.lat,O.lon);
  if(!t.length){ el('tafel').innerHTML='<div class="leerk">An diesem Ort geht die Sonne gerade nicht auf oder unter.</div>'; return; }
  el('tafel').innerHTML='<div class="taf">'+t.map(function(s){
    return '<div class="tz'+(s.jetzt?' jetzt':'')+(s.nacht?' nacht':'')+'">'+
      '<div class="o"><span class="nr">'+s.nr+'</span><span class="zt">'+uhr(s.von)+'</span></div>'+
      '<div class="u"><span class="gl">'+PLANET[s.herr].zchn+'</span>'+
      '<span class="nm">'+s.herr+'</span></div></div>';
  }).join('')+'</div>'+
  '<p class="sub" style="margin:12px 0 0;">Von Sonnenaufgang bis Sonnenaufgang. Die Stunden sind '+
  'ungleich lang — im Sommer dauert eine Tagstunde deutlich länger als eine Nachtstunde, im Winter '+
  'umgekehrt. Dunkel hinterlegt sind die Nachtstunden.</p>';
}

/* ── Planeten ─────────────────────────────────────────── */
function planetenBauen(){
  var jd=jetztJD(), P=chart();
  el('planeten').innerHTML=PL.map(function(k){
    var p=PL.indexOf(k), d=PLANET[k];
    var tl=lonVon(k,jd), tz=Math.floor(nrm(tl)/30);
    var zu=ZUTAT.filter(function(z){return z.p===k;}).map(function(z){return z.n;});
    var se=STEIN.filter(function(s){return s.p===k;}).map(function(s){return s.n;});
    var transit='Läuft gerade durch '+ZEI[tz][0]+
      (P?' — bei dir das '+hausVon(P,tl)+'. Haus: '+HAUSFELD[hausVon(P,tl)-1]:'');
    var natal='';
    if(P){ var nz=Math.floor(nrm(P[k])/30);
      natal='<div class="pl-dein"><b>Bei dir geboren in '+ZEI[nz][0]+'</b>, im '+
        hausVon(P,P[k])+'. Haus.'+
        (GESCHMACK[k]?' '+GESCHMACK[k][nz][0]+' <i>Was bei dir nicht trägt: '+
          GESCHMACK[k][nz][1].replace(/\.$/,'')+'.</i>':'')+'</div>'; }
    return '<details class="pk"><summary>'+
      '<span class="gl">'+d.zchn+'</span>'+
      '<span class="t">'+k+'</span>'+
      '<span class="w">'+d.tag+' · '+d.metall+'</span></summary>'+
      '<div class="in"><p><b>'+esc(d.kurz)+'.</b> '+esc(d.fuer)+'.</p>'+
      '<p class="pl-t">'+esc(transit)+'</p>'+natal+
      '<div class="pl-r"><div><b>Farben</b>'+esc(d.farben)+'</div>'+
      '<div><b>Zutaten</b>'+zu.join(', ')+'</div>'+
      '<div><b>Steine</b>'+se.join(', ')+'</div></div></div></details>';
  }).join('');
}

/* ── Ziele ────────────────────────────────────────────── */
function zieleBauen(){
  var w=el('zielwahl'); w.innerHTML='';
  ZIEL.forEach(function(z){
    var b=document.createElement('button'); b.type='button'; b.className='chip'; b.textContent=z.n;
    b.setAttribute('aria-pressed', zielWahl===z.id);
    b.addEventListener('click',function(){ zielWahl=z.id; zieleBauen(); });
    w.appendChild(b);
  });
  var z=ZIEL.filter(function(x){return x.id===zielWahl;})[0];
  var jd=jetztJD(), P=chart(), O=ort();
  var st=AC_HIMMEL.planetenStunde(jd,O.lat,O.lon);
  var h='';

  /* Persönlicher Anschluss: wo läuft der Hauptplanet gerade bei ihr */
  var haupt=z.pl[0];
  var tl=lonVon(haupt,jd), tz=Math.floor(nrm(tl)/30);
  h+='<div class="zbox">';
  h+='<div class="z-kopf"><span class="gl">'+PLANET[haupt].zchn+'</span>'+
     '<div><b>'+z.n+'</b><span>'+z.pl.join(' und ')+'</span></div></div>';
  h+='<p class="z-wann"><b>Wann:</b> '+esc(z.wann)+'</p>';
  if(st&&!st.polar&&z.pl.indexOf(st.herr)>=0){
    h+='<div class="z-jetzt">Es ist <b>gerade</b> '+st.herr+'stunde, noch bis '+uhr(st.bis)+
      '. Wenn du eins davon machen willst, dann jetzt.</div>';
  }
  if(P){
    var hs=hausVon(P,tl);
    h+='<div class="z-dein"><b>Bei dir gerade:</b> '+haupt+' läuft durch '+ZEI[tz][0]+
      ', dein '+hs+'. Haus — '+HAUSFELD[hs-1]+'. Dorthin gehört das Thema im Moment, '+
      'auch wenn du eigentlich an etwas anderes gedacht hast.';
    var nz=Math.floor(nrm(P[haupt])/30);
    if(GESCHMACK[haupt]) h+=' <br><br><b>Und wie es bei dir klingen muss:</b> '+GESCHMACK[haupt][nz][0];
    /* Hausherrscher des Zielhauses */
    var zh=(Math.floor(P.ASC/30)+z.haus-1)%12;
    var hr=HERRSCHER[zh];
    var hrz=Math.floor(nrm(P[hr])/30);
    h+='<br><br><b>Dein '+z.haus+'. Haus</b> steht in '+ZEI[zh][0]+', Herrscher ist '+hr+
      ' — bei dir in '+ZEI[hrz][0]+', im '+hausVon(P,P[hr])+'. Haus. '+
      'Das ist der Faden, an dem dieses Thema bei dir hängt.</div>';
  } else {
    h+='<div class="z-leer">Ohne Chart bleibt es allgemein. Unter <a href="profile.html">Profile</a> '+
      'deine Geburtsdaten anlegen — dann steht hier, durch welches deiner Häuser '+haupt+
      ' gerade läuft und wie ein Ritual bei dir klingen muss.</div>';
  }
  h+='<div class="z-zeug"><div><b>Zutaten</b>'+esc(z.ein)+'</div>'+
     '<div><b>Steine</b>'+esc(z.st)+'</div>'+
     '<div><b>Mond</b>'+esc(z.mond)+'</div></div>';
  h+='</div>';

  h+=z.rituale.map(function(r){
    return '<div class="rit"><div class="r-zeit">'+esc(r.zeit)+'</div>'+
      '<h3>'+esc(r.n)+'</h3>'+r.t+'</div>';
  }).join('');
  el('zielinhalt').innerHTML=h;
}

/* ── Zutaten und Steine ───────────────────────────────── */
var zutFilter='alle';
function zutatenBauen(){
  var f=el('zutfilter'); f.innerHTML='';
  ['alle'].concat(PL).forEach(function(k){
    var b=document.createElement('button'); b.type='button'; b.className='chip';
    b.innerHTML=(k==='alle'?'alle':PLANET[k].zchn+' '+k);
    b.setAttribute('aria-pressed', zutFilter===k);
    b.addEventListener('click',function(){ zutFilter=k; zutatenBauen(); });
    f.appendChild(b);
  });
  el('zutaten').innerHTML=ZUTAT.filter(function(z){return zutFilter==='alle'||z.p===zutFilter;})
    .map(function(z){
      return '<div class="zt-k"><div class="kopf"><b>'+esc(z.n)+'</b>'+
        '<span class="pl">'+PLANET[z.p].zchn+' '+z.p+'</span></div>'+
        '<div class="art">'+esc(z.art)+'</div><p>'+z.t+'</p></div>';
    }).join('');
}
var stFilter='alle';
function steineBauen(){
  var f=el('steinfilter'); f.innerHTML='';
  ['alle'].concat(PL).forEach(function(k){
    var b=document.createElement('button'); b.type='button'; b.className='chip';
    b.innerHTML=(k==='alle'?'alle':PLANET[k].zchn+' '+k);
    b.setAttribute('aria-pressed', stFilter===k);
    b.addEventListener('click',function(){ stFilter=k; steineBauen(); });
    f.appendChild(b);
  });
  el('steine').innerHTML=STEIN.filter(function(s){return stFilter==='alle'||s.p===stFilter;})
    .map(function(s){
      return '<div class="st-k"><div class="kopf"><b>'+esc(s.n)+'</b>'+
        '<span class="pl">'+PLANET[s.p].zchn+' '+s.p+'</span></div>'+
        '<p>'+s.t+'</p><div class="warn">'+
        (s.wasser?'<span class="ok">Wasser ja</span>':'<span class="nein">kein Wasser</span>')+
        (s.sonne?'<span class="ok">Sonne ja</span>':'<span class="nein">bleicht in der Sonne</span>')+
        '</div></div>';
    }).join('');
  el('pflege').innerHTML=
    '<div class="pf"><h4>Reinigen</h4>'+PFLEGE.reinigen+'</div>'+
    '<div class="pf"><h4>Aufladen</h4>'+PFLEGE.laden+'</div>'+
    '<div class="pf"><h4>Aussuchen</h4>'+PFLEGE.waehlen+'</div>';
}

/* ── Dein Draht: Aszendentenherrscher und stärkster Planet ── */
function drahtBauen(){
  var P=chart();
  if(!P){ el('draht').innerHTML='<div class="leerk"><b>Hier würde dein eigener Faden stehen.</b><br><br>'+
    'Welcher Planet dich regiert, welcher Stein deiner ist, in welcher Stunde du am stärksten arbeitest '+
    '— dafür brauche ich einmal deine Geburtsdaten. <a href="profile.html">Chart anlegen</a></div>'; return; }
  var ascZ=Math.floor(nrm(P.ASC)/30);
  var hr=HERRSCHER[ascZ];
  var hrZ=Math.floor(nrm(P[hr])/30), hrH=hausVon(P,P[hr]);
  var steine=STEIN.filter(function(s){return s.p===hr;});
  var zutaten=ZUTAT.filter(function(z){return z.p===hr;});
  var sonneH=hausVon(P,P.Sonne), mondH=hausVon(P,P.Mond);
  var h='<div class="draht">';
  h+='<div class="d-gr"><span class="gl">'+PLANET[hr].zchn+'</span>Dein Planet ist '+hr+'</div>';
  h+='<p>Dein Aszendent steht in '+ZEI[ascZ][0]+', und '+ZEI[ascZ][0]+' wird von '+hr+' regiert. '+
    'Damit ist '+hr+' dein <b>Chartherrscher</b> — der Planet, durch den bei dir alles andere läuft. '+
    'Bei dir steht er in '+ZEI[hrZ][0]+', im '+hrH+'. Haus.</p>';
  h+='<div class="d-gitter">'+
    '<div class="dk"><b>Dein Tag</b>'+PLANET[hr].tag+'<br><span>Was du an diesem Tag anfängst, '+
      'hat den kürzesten Weg.</span></div>'+
    '<div class="dk"><b>Dein Metall</b>'+PLANET[hr].metall+'</div>'+
    '<div class="dk"><b>Deine Farben</b>'+PLANET[hr].farben+'</div>'+
    '<div class="dk"><b>Deine Steine</b>'+steine.map(function(s){return s.n;}).join(', ')+'</div>'+
    '<div class="dk"><b>Deine Zutaten</b>'+zutaten.map(function(z){return z.n;}).join(', ')+'</div>'+
    '<div class="dk"><b>Sonne und Mond</b>Sonne im '+sonneH+'. Haus, Mond im '+mondH+'. Haus</div>'+
    '</div>';
  if(GESCHMACK[hr]) h+='<p class="d-satz">'+GESCHMACK[hr][hrZ][0]+'</p>';
  h+='<p class="d-fuss">Der erste Stein, den du dir zulegst, wenn du einen aussuchen willst statt '+
    'auf einen zu warten: <b>'+(steine[0]?steine[0].n:'Bergkristall')+'</b>. Nicht weil er der '+
    'stärkste wäre, sondern weil er zu dem Planeten gehört, der bei dir ohnehin alles '+
    'durchläuft.</p>';
  h+='</div>';
  el('draht').innerHTML=h;
}

/* ── Profilwahl ───────────────────────────────────────── */
function wahlBauen(){
  var box=el('zwahl'), alle=[];
  try{ alle=AC_P.alle()||[]; }catch(e){}
  box.innerHTML='';
  if(alle.length<2) return;
  var l=document.createElement('span'); l.className='lab'; l.textContent='Profil'; box.appendChild(l);
  alle.forEach(function(p){
    var b=document.createElement('button'); b.type='button';
    b.textContent=AC_P.anzeige(p,AC_P.zeigeNamen())+(p.eigen?' (ich)':'');
    b.setAttribute('aria-pressed', gewaehlt===p.id);
    b.addEventListener('click',function(){ gewaehlt=p.id; wahlBauen(); allesNeu(); });
    box.appendChild(b);
  });
}
function allesNeu(){ jetztBauen(); planetenBauen(); zieleBauen(); drahtBauen(); tafelBauen(); }

function start(){
  wahlBauen();
  allesNeu();
  zutatenBauen(); steineBauen();
  /* Die Planetenstunde wechselt — einmal pro Minute nachziehen */
  setInterval(function(){ jetztBauen(); tafelBauen(); }, 60000);
}
start();
