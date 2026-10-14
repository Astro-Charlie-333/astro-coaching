/* Astro-Charlie · Zahlen — die Seite
   Setzt die Rechnung aus zahlen-rechner.js und die Texte aus
   zahlen-daten.js zusammen. */
function zEl(i){ return document.getElementById(i); }
function zEsc(s){ return String(s===undefined||s===null?'':s).replace(/[<>&"]/g,function(c){
  return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }
function zPz(x,n){ return (100*x).toFixed(n===undefined?1:n).replace('.',','); }
var Z_NSU='http://www.w3.org/2000/svg';

var Z_NAMEKEY='ac_zahlen_name';
var zPerson=null, zSys='pyth', zOffen=null, zThema='beruf', zVerdeckt=false, zBlatt=null;

function zProfile(){ try{ return AC_P.alle()||[]; }catch(e){ return []; } }
function zAktiv(){
  var a=zProfile();
  if(zPerson) for(var i=0;i<a.length;i++) if(a[i].id===zPerson) return a[i];
  try{ return AC_P.aktives()||AC_P.eigenes()||a[0]||null; }catch(e){ return a[0]||null; }
}
function zAnzeige(p){ try{ return AC_P.anzeige(p, AC_P.zeigeNamen()); }catch(e){ return (p&&p.name)||'?'; } }

/* Der Name wird je Profil gemerkt — getrennt vom Profil selbst, damit das
   Profilsystem nichts von dieser Seite wissen muss. */
function zNamenKarte(){
  try{ return JSON.parse(localStorage.getItem(Z_NAMEKEY)||'{}')||{}; }catch(e){ return {}; }
}
function zNameVon(p){ if(!p) return ''; var k=zNamenKarte();
  return (k[p.id]!==undefined) ? k[p.id] : (p.name||''); }
function zNameSetzen(p,v){ if(!p) return; var k=zNamenKarte(); k[p.id]=v;
  try{ localStorage.setItem(Z_NAMEKEY, JSON.stringify(k)); }catch(e){} }

/* ── Kopfzeilen: wer, welche Tafel ──────────────────────────── */
function zPersonenBauen(){
  var box=zEl('zpersonen'), a=zProfile(), p=zAktiv();
  if(!a.length){ box.innerHTML='<span class="z-hint" style="flex:1 1 100%">Noch kein Profil angelegt. '+
    '<a href="profile.html">Hier anlegen</a> &mdash; danach rechnet die Seite mit deinem Datum. '+
    'Die Zahlen, der Ring und die Hausnummern funktionieren auch ohne.</span>'; return; }
  box.innerHTML = a.map(function(x){
    return '<button type="button" class="z-knopf'+((p&&x.id===p.id)?' ist':'')+'" data-p="'+zEsc(x.id)+'">'+
      zEsc(zAnzeige(x))+'</button>'; }).join('');
  Array.prototype.forEach.call(box.querySelectorAll('button[data-p]'),function(b){
    b.addEventListener('click',function(){ zPerson=b.getAttribute('data-p');
      var np=zAktiv(); zEl('zname').value=zNameVon(np); zAlles(); });
  });
}
var Z_SYSNAME={pyth:'Pythagor&auml;isch', chald:'Ch&auml;ld&auml;isch'};
function zSystemBauen(){
  var box=zEl('zsystem');
  box.innerHTML = ['pyth','chald'].map(function(s){
    return '<button type="button" class="z-knopf'+(s===zSys?' ist':'')+'" data-s="'+s+'">'+
      Z_SYSNAME[s]+'</button>'; }).join('');
  Array.prototype.forEach.call(box.querySelectorAll('button[data-s]'),function(b){
    b.addEventListener('click',function(){ zSys=b.getAttribute('data-s'); zAlles(); });
  });
  zEl('zsyshint').innerHTML = (zSys==='pyth')
    ? 'A bis Z laufen glatt durch 1 bis 9. Die verbreitete Tafel &mdash; wenn jemand eine Zahl nennt, ist meist diese gemeint.'
    : 'Nach Klanggruppen verteilt, die 9 bleibt unbesetzt. Diese Schule rechnet den Rufnamen, nicht den Namen auf der Urkunde.';
}

/* ── 1 · Dein Blatt ─────────────────────────────────────────── */
var Z_KARTEN=[
 {k:'lebenszahl', n:'Lebenszahl',   w:'Aus dem ganzen Geburtsdatum. Die Zahl, die gemeint ist, wenn jemand nach „deiner Zahl" fragt.'},
 {k:'geburtstag', n:'Geburtstagszahl', w:'Nur der Tag im Monat. Gilt als das, was dir ohne M&uuml;he zur Verf&uuml;gung steht.'},
 {k:'ausdruck',   n:'Ausdruckszahl', w:'Alle Buchstaben des Namens. Gilt als das, was andere von dir sehen und was du kannst.'},
 {k:'seele',      n:'Seelenzahl',    w:'Nur die Vokale. Gilt als das, was du willst, ohne es zu sagen.'},
 {k:'person',     n:'Pers&ouml;nlichkeit', w:'Nur die Konsonanten. Gilt als die Oberfl&auml;che, der erste Eindruck.'},
 {k:'reife',      n:'Reifezahl',     w:'Lebenszahl plus Ausdruckszahl. Gilt als das, worauf beides zul&auml;uft.'},
 {k:'jahr',       n:'Dein Jahr',     w:'Tag plus Monat plus laufendes Jahr. L&auml;uft in einem Neuner-Takt, jedes Jahr eine weiter.'},
 {k:'herausf',    n:'Herausforderung', w:'Die Differenz der Datumsteile. Gilt als die wiederkehrende Aufgabe. Eine 0 hei&szlig;t: keine dr&auml;ngt sich vor.'}
];
function zKartenBauen(){
  var B=zBlatt, box=zEl('zkarten');
  if(!B){ box.innerHTML='<div class="z-leer">Ohne Profil gibt es kein Blatt. '+
    '<a href="profile.html">Profil anlegen</a> &mdash; es braucht nur das Geburtsdatum, keine Uhrzeit.</div>'; return; }
  box.innerHTML = Z_KARTEN.map(function(K){
    var w=null, roh=null;
    if(K.k==='lebenszahl'){ w=B.lebenszahl; roh=B.lz.rohsumme; }
    else if(K.k==='geburtstag'){ w=B.geburtstag.zahl; roh=B.geburtstag.roh; }
    else if(K.k==='ausdruck'){ w=B.name&&B.name.ausdruck; roh=B.name&&B.name.ausdruckRoh; }
    else if(K.k==='seele'){ w=B.name&&B.name.seele; roh=B.name&&B.name.seeleRoh; }
    else if(K.k==='person'){ w=B.name&&B.name.person; roh=B.name&&B.name.personRoh; }
    else if(K.k==='reife'){ w=B.reife; }
    else if(K.k==='jahr'){ w=B.jahr.zahl; roh=B.jahr.roh; }
    else if(K.k==='herausf'){ w=B.herausforderung.haupt; }
    var leer=(w===null||w===undefined||w===false);
    var Z=(!leer && Z_ZAHL[w]) ? Z_ZAHL[w] : null;
    var farbe=Z?Z.farbe:'#DDD0BC';
    return '<div class="z-k'+(leer?' leer':'')+'" style="border-top-color:'+farbe+'">'+
      '<span class="lab">'+K.n+'</span>'+
      '<div class="wert"><span class="zif">'+(leer?'–':w)+'</span>'+
      (Z?'<span class="nm">'+Z.titel+'</span>':'')+
      ((!leer && roh!==null && roh!==undefined && roh!==w)
        ? '<span class="nm ac-tech" data-ab="2">aus '+roh+'</span>' : '')+'</div>'+
      '<p class="wie">'+(leer?'Daf&uuml;r braucht die Seite einen Namen im Feld oben.':K.w)+'</p>'+
      (Z?'<button type="button" data-z="'+w+'">Was die '+Z.n+' hei&szlig;t</button>':'')+
      '</div>';
  }).join('');
  box.insertAdjacentHTML('afterend',
    '<p class="z-hint" data-ab="1" style="margin:12px 0 0;max-width:68ch">Die ersten beiden '+
    'Zahlen kommen allein aus dem Datum und stehen deshalb fest. Ausdruck, Seele und '+
    'Pers&ouml;nlichkeit kommen aus dem Namen und &auml;ndern sich, wenn der Name sich '+
    '&auml;ndert &mdash; bei Heirat, K&uuml;nstlernamen oder Transition. Genau das ist der '+
    'Grund, warum manche Schulen nur mit dem Namen rechnen und andere nur mit dem Datum.</p>');
  Array.prototype.forEach.call(box.querySelectorAll('button[data-z]'),function(b){
    b.addEventListener('click',function(){ zZeigeZahl(+b.getAttribute('data-z'), true); });
  });
}

function zKetteBauen(){
  var B=zBlatt, box=zEl('zkette');
  if(!B){ box.innerHTML=''; return; }
  var d=B.datum, ziffern=String(d.d)+String(d.mo)+String(d.y);
  var h='<div class="z-kette"><span class="lab">So kommt die Lebenszahl zustande</span><div class="z-rechn">';
  ziffern.split('').forEach(function(c,i){
    if(i) h+='<span class="op">+</span>';
    h+='<span class="zf">'+c+'</span>';
  });
  h+='<span class="op">=</span>';
  B.lz.kette.forEach(function(w,i){
    if(i) h+='<span class="pf">&rarr;</span>';
    var letzte=(i===B.lz.kette.length-1);
    h+='<span class="zf'+(letzte?' end':'')+'">'+w+'</span>';
  });
  h+='</div><p>Jede Ziffer des Datums '+zEsc(zTag(d))+' einmal addiert, dann zusammengezogen.'+
     (AC_ZAHL.istMeister(B.lebenszahl)
       ? ' Bei '+B.lebenszahl+' wird angehalten: 11, 22 und 33 gelten als Meisterzahlen und werden nicht weiter reduziert.'
       : '')+'</p>';
  if(!B.lz.einig){
    h+='<p data-ab="2">Dieses Datum ist eines der strittigen. Zieht man Tag, Monat und Jahr '+
       'erst einzeln zusammen und addiert dann, kommt <b>'+B.lz.teile+'</b> heraus statt <b>'+
       B.lz.summe+'</b>. Auf die eine Ziffer laufen beide Wege gleich ('+B.lz.stelle+') &mdash; '+
       'der Streit geht nur um die Meisterzahl.</p>';
  }
  h+='<p data-ab="3">Die drei &uuml;blichen Wege im Vergleich &mdash; '+
     'Ziffernsumme <b>'+B.lz.summe+'</b>, blockweise (Tag '+B.lz.teilwerte.tag+
     ' + Monat '+B.lz.teilwerte.monat+' + Jahr '+B.lz.teilwerte.jahr+') <b>'+B.lz.teile+
     '</b>, streng reduziert (Tag '+B.lz.strengwerte.tag+' + Monat '+B.lz.strengwerte.monat+
     ' + Jahr '+B.lz.strengwerte.jahr+') <b>'+B.lz.streng+'</b>.</p>'+
     '<p data-ab="4">Alle vier Herausforderungszahlen: erste '+B.herausforderung.erste+
     ', zweite '+B.herausforderung.zweite+', Haupt '+B.herausforderung.haupt+
     ', vierte '+B.herausforderung.vierte+'. Geburtstagszahl unreduziert '+B.geburtstag.roh+
     ', Rohsumme des Datums '+B.lz.rohsumme+', Anteil dieser Lebenszahl an allen '+
     'Geburtstagen '+zPz(B.anteil)+'&nbsp;%.</p>';
  h+='</div>';
  box.innerHTML=h;
}
function zTag(d){ return ('0'+d.d).slice(-2)+'.'+('0'+d.mo).slice(-2)+'.'+d.y; }

function zGitterBauen(){
  var B=zBlatt, box=zEl('zgitter');
  if(!B||!B.name||!B.name.gitter.length){ box.innerHTML=''; return; }
  var h='<div class="z-gitter">';
  B.name.gitter.forEach(function(b){
    if(b.luecke){ h+='<span class="lk luecke"></span>'; return; }
    h+='<span class="lk '+b.art+'"><b>'+(zVerdeckt?'•':zEsc(b.c))+'</b><i>'+
       (b.ohne?'–':b.n)+'</i></span>';
  });
  h+='</div><div class="z-leg">'+
     '<span><i style="background:#F7EFE1;border-color:#9A7235"></i>Vokal &mdash; z&auml;hlt zur Seelenzahl</span>'+
     '<span><i style="background:#FFFDFA;border-color:#EBE1D2"></i>Konsonant &mdash; z&auml;hlt zur Pers&ouml;nlichkeit</span>'+
     (/Y/.test(AC_ZAHL.norm(zEl('zname').value||'', B.umlautArt))
       ? '<span><i style="background:#E9EDF4;border-color:#2E3A5C"></i>Y &mdash; je nach Schule beides</span>' : '')+
     '<span class="ac-tech" data-ab="2">'+B.name.buchstaben+' Buchstaben, Summe '+B.name.ausdruckRoh+'</span>'+
     '</div>';
  box.innerHTML=h;
}

function zStreitBauen(){
  var B=zBlatt, box=zEl('zstreit'), h='';
  if(!B){ box.innerHTML=''; return; }
  if(B.systemStreit){
    h+='<div class="z-streit"><span class="t">Die Tafeln sind uneins</span>'+
       'Derselbe Name gibt in der <b>'+Z_SYSNAME[zSys].replace(/&auml;/g,'ä')+'en</b> Tafel die Ausdruckszahl <b>'+
       B.name.ausdruck+'</b>, in der anderen <b>'+B.nameAnderesSystem.ausdruck+'</b>. '+
       'Beide Schulen unterrichten ihre Tafel als die richtige. Es gibt keinen Schiedsrichter &mdash; '+
       'du entscheidest, mit welcher du arbeitest, und bleibst dann dabei.</div>';
  }
  if(B.umlautStreit){
    h+='<div class="z-streit"><span class="t">Der Umlaut entscheidet mit</span>'+
       'In dem Namen steckt ein Umlaut, und daf&uuml;r hat niemand eine Regel festgelegt. '+
       'Z&auml;hlt das Ä wie ein A, kommt <b>'+B.name.ausdruck+'</b> heraus; schreibt man es als AE, '+
       '<b>'+B.nameAndereUmlaute.ausdruck+'</b>. Beide Varianten werden so unterrichtet.</div>';
  }
  if(B.name && B.name.yStoert){
    h+='<div class="z-streit"><span class="t">Das Y h&auml;ngt dazwischen</span>'+
       'Das Y gilt mancherorts als Vokal und mancherorts als Konsonant. Z&auml;hlt es als Konsonant, '+
       'ist deine Seelenzahl <b>'+B.name.seele+'</b>, als Vokal <b>'+B.name.seeleMitY+'</b>. '+
       'Die &uuml;bliche Faustregel: Vokal nur dort, wo das Y wie ein Vokal gesprochen wird.</div>';
  }
  if(B.name && B.nameAnderesSystem){
    var AN=B.nameAnderesSystem, and=(zSys==='pyth'?'Ch&auml;ld&auml;isch':'Pythagor&auml;isch');
    h+='<div class="z-streit" data-ab="4"><span class="t">Die andere Tafel, vollst&auml;ndig</span>'+
       and+': Ausdruck <b>'+AN.ausdruck+'</b> (aus '+AN.ausdruckRoh+'), Seele <b>'+AN.seele+
       '</b> (aus '+AN.seeleRoh+'), Pers&ouml;nlichkeit <b>'+AN.person+'</b> (aus '+AN.personRoh+
       ')'+(AN.fehlt.length?', fehlende Ziffern '+AN.fehlt.join(', '):', keine fehlenden Ziffern')+
       '.</div>';
  }
  if(B.name && B.name.fehlt.length){
    h+='<div class="z-streit" data-ab="2"><span class="t">Fehlende Ziffern im Namen</span>'+
       'Im Namen kommen die Ziffern <b>'+B.name.fehlt.join(', ')+'</b> nicht vor. In der '+
       'pythagor&auml;ischen Schule hei&szlig;t das „karmische Lektion": das, was nicht mitgeliefert '+
       'wird und deshalb gelernt werden muss. Was daran auff&auml;llt: Bei kurzen Namen fehlt '+
       'fast immer viel und bei langen fast nichts. Die Zahl sagt also auch etwas &uuml;ber die '+
       'L&auml;nge des Namens aus.</div>';
  }
  box.innerHTML=h;
}

/* ── 2 · Der Ring ───────────────────────────────────────────── */
function zEigeneZahlen(){
  var B=zBlatt; if(!B) return {};
  var m={};
  function setz(w,lab){ if(w===null||w===undefined||w===false) return;
    if(!m[w]) m[w]=[]; if(m[w].indexOf(lab)<0) m[w].push(lab); }
  setz(B.lebenszahl,'Lebenszahl'); setz(B.geburtstag.zahl,'Geburtstag');
  if(B.name){ setz(B.name.ausdruck,'Ausdruck'); setz(B.name.seele,'Seele');
              setz(B.name.person,'Pers&ouml;nlichkeit'); }
  setz(B.reife,'Reife'); setz(B.jahr.zahl,'Jahr');
  return m;
}
function zRingBauen(){
  var mein=zEigeneZahlen();
  function N(t,a,txt){ var e=document.createElementNS(Z_NSU,t);
    for(var k in a) e.setAttribute(k,a[k]);
    if(txt!==undefined) e.textContent=txt; return e; }
  var C=310, RA=300, RI=176;
  function pos(gr,r){ var w=(gr-90)*Math.PI/180; return [C+r*Math.cos(w), C+r*Math.sin(w)]; }
  function wedge(a1,a2){
    var p1=pos(a1,RA), p2=pos(a2,RA), p3=pos(a2,RI), p4=pos(a1,RI);
    return 'M'+p1[0].toFixed(1)+','+p1[1].toFixed(1)+' A'+RA+','+RA+' 0 0 1 '+
      p2[0].toFixed(1)+','+p2[1].toFixed(1)+' L'+p3[0].toFixed(1)+','+p3[1].toFixed(1)+
      ' A'+RI+','+RI+' 0 0 0 '+p4[0].toFixed(1)+','+p4[1].toFixed(1)+' Z';
  }
  var svg=N('svg',{viewBox:'0 0 620 620',class:'z-ring',role:'img',
    'aria-label':'Die Ziffern eins bis neun im Kreis, die drei Meisterzahlen in der Mitte'});

  var lz=zBlatt?zBlatt.lebenszahl:null;
  for(var i=0;i<9;i++){
    var n=i+1, a1=i*40-90+0.6, a2=(i+1)*40-90-0.6;
    var Z=Z_ZAHL[n], hat=(n===lz);
    var g=N('g',{class:'z-seg'+(zOffen===n?' ist':'')+((zOffen&&zOffen!==n)?' aus':''),
      'data-z':String(n), tabindex:'0', role:'button',
      'aria-label':n+' — '+Z.titel+(hat?', deine Lebenszahl':
        (mein[n]?', deine '+mein[n][0].replace(/&ouml;/g,'ö'):''))});
    g.appendChild(N('path',{d:wedge(a1,a2), fill:Z.farbe, class:'fl',
      opacity:(zOffen===n?'1':'.9')}));
    g.appendChild(N('path',{d:wedge(a1,a2), fill:'none', class:'rd',
      stroke:(hat?'#E8C97A':'none'), 'stroke-width':(hat?'3':'0')}));
    var m=pos(i*40+20-90,(RA+RI)/2);
    g.appendChild(N('text',{x:m[0].toFixed(1),y:(m[1]-2).toFixed(1),'text-anchor':'middle',
      class:'zif'}, String(n)));
    g.appendChild(N('text',{x:m[0].toFixed(1),y:(m[1]+21).toFixed(1),'text-anchor':'middle',
      class:'nm'}, Z.titel.replace(/^Der |^Die /,'')));
    svg.appendChild(g);
  }
  /* Die drei Meisterzahlen in der Mitte */
  var mz=[11,22,33];
  mz.forEach(function(n,k){
    var Z=Z_ZAHL[n];
    var w=(k*120-90)*Math.PI/180, cx=C+78*Math.cos(w), cy=C+78*Math.sin(w);
    var g=N('g',{class:'z-mz'+(zOffen===n?' ist':''),'data-z':String(n), tabindex:'0',
      role:'button','aria-label':'Meisterzahl '+n+(hat?', deine Zahl':'')});
    g.appendChild(N('circle',{cx:cx.toFixed(1),cy:cy.toFixed(1),r:'37',fill:Z.farbe,
      opacity:(zOffen===n?'1':'.9'),
      stroke:((lz===n)?'#E8C97A':'none'),'stroke-width':'3'}));
    g.appendChild(N('text',{x:cx.toFixed(1),y:(cy+9).toFixed(1),'text-anchor':'middle',
      class:'zif'}, String(n)));
    svg.appendChild(g);
  });
  svg.appendChild(N('text',{x:String(C),y:String(C+128),'text-anchor':'middle',
    class:'z-mitte'},'Meisterzahlen'));

  var box=zEl('zringbox'); box.innerHTML=''; box.appendChild(svg);
  Array.prototype.forEach.call(svg.querySelectorAll('[data-z]'),function(g){
    var n=+g.getAttribute('data-z');
    g.addEventListener('click',function(){ zZeigeZahl(n); });
    g.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){ e.preventDefault(); zZeigeZahl(n); } });
  });

  /* Legende */
  var leg=zEl('zringleg'), L=[];
  Z_NUM.forEach(function(q){ if(mein[q])
    L.push('<span><em style="background:'+Z_ZAHL[q].farbe+'">'+q+'</em>'+
      mein[q].join(' + ')+'</span>'); });
  leg.innerHTML = L.length
    ? L.join('')
    : '<span>Mit einem Profil werden hier deine eigenen Zahlen markiert.</span>';
}

/* ── Detail einer Zahl ──────────────────────────────────────── */
function zZeigeZahl(n, springen){
  zOffen = (zOffen===n && !springen) ? null : n;
  zRingBauen(); zMatrixBauen(); zDetailBauen();
  if(zOffen && springen){
    var d=zEl('zdetail'); if(d && d.scrollIntoView) d.scrollIntoView({behavior:'smooth',block:'start'});
  }
}
function zDetailBauen(){
  var box=zEl('zdetail');
  if(!zOffen){ box.innerHTML='<div class="z-leer">Noch keine Zahl ausgew&auml;hlt. '+
    'Tippe im Ring eine an &mdash; oder in der Tabelle weiter unten ein Feld.</div>'; return; }
  var n=zOffen, Z=Z_ZAHL[n], T=Z_ZT[n], mein=zEigeneZahlen();
  var h='<div class="z-detail" style="border-left-color:'+Z.farbe+'">'+
    '<div class="z-dkopf"><div class="z-dzif" style="color:'+Z.farbe+'">'+n+'</div>'+
    '<div class="z-dtit"><h3>'+Z.n+' &mdash; '+Z.titel+'</h3>'+
    '<span class="kz">'+Z.kurz+'</span><div class="z-dmeta">'+
    (mein[n]?'<span style="background:#E9EDF4;color:#2E3A5C">Deine '+mein[n].join(' &amp; ')+'</span>':'')+
    (Z.meister?'<span>Meisterzahl &mdash; Grundzahl '+Z.meister+'</span>':'')+
    (Z.pInd!=='—'?'<span class="ac-tech" data-ab="2">indisch '+Z.pInd+'</span>':'')+
    (Z.pWest!=='—'&&Z.pWest!==Z.pInd?'<span class="ac-tech" data-ab="2">westlich '+Z.pWest+'</span>':'')+
    (Z.tag!=='—'?'<span class="ac-tech" data-ab="3">Tag: '+Z.tag+'</span>':'')+
    '</div></div></div>'+
    '<p>'+Z.wesen+'</p>'+
    (Z.meister
      ? '<p data-ab="1" style="background:#F7EFE1;border-radius:13px;padding:12px 15px;'+
        'font-size:14.6px">Die '+n+' ist eine <b>Meisterzahl</b>. Das hei&szlig;t nur: Sie wird '+
        'beim Zusammenziehen nicht weiter verkleinert, obwohl man es k&ouml;nnte. Wer damit '+
        'nichts anfangen kann, rechnet einfach mit der Grundzahl '+Z.meister+' weiter &mdash; '+
        'das ist keine schlechtere Antwort, nur eine andere Schule.</p>'
      : '')+
    (mein[n]
      ? '<p data-ab="1" style="background:#E9EDF4;border-radius:13px;padding:12px 15px;'+
        'font-size:14.6px">Bei dir kommt diese Zahl als <b>'+mein[n].join(' und ')+
        '</b> vor. Steht sie mehrfach, hei&szlig;t das in jeder Schule dasselbe: Das Thema '+
        'wiederholt sich bei dir, statt sich auf mehrere zu verteilen.</p>'
      : '')+
    '<div class="z-zwei"><div class="z-sp gut"><b>Was sie kann</b>'+Z.stark+'</div>'+
    '<div class="z-sp schat"><b>Wo sie kippt</b>'+Z.schatten+'</div></div>'+
    '<div class="z-bereiche">';
  Z_THEMA.forEach(function(TH){
    var c=T[TH.k]; if(!c) return;
    h+='<div class="z-b"><span class="bk">'+TH.n+'</span><p>'+c.t+'</p>'+
       '<div class="tun"><b>Ein Handgriff</b>'+c.tun+'</div></div>';
  });
  h+='</div></div>';
  box.innerHTML=h;
}

/* ── 3 · Die Matrix ────────────────────────────────────────── */
function zThemenBauen(){
  var box=zEl('zthemen');
  box.innerHTML = Z_THEMA.map(function(T){
    return '<button type="button" class="z-knopf'+(T.k===zThema?' ist':'')+'" data-t="'+T.k+'">'+
      T.n+'</button>'; }).join('');
  Array.prototype.forEach.call(box.querySelectorAll('button[data-t]'),function(b){
    b.addEventListener('click',function(){ zThema=b.getAttribute('data-t');
      zThemenBauen(); zMatrixBauen(); });
  });
}
function zKurz(s,max){
  s=String(s||''); if(s.length<=max) return s;
  var i=s.lastIndexOf(' ',max); return s.slice(0,i>40?i:max)+'…';
}
function zMatrixBauen(){
  var mein=zEigeneZahlen();
  /* breit: alle acht Bereiche */
  var h='<table><thead><tr><th>Zahl</th>';
  Z_THEMA.forEach(function(T){ h+='<th>'+T.n+'</th>'; });
  h+='</tr></thead><tbody>';
  Z_NUM.forEach(function(n){
    var Z=Z_ZAHL[n];
    h+='<tr class="'+(zOffen===n?'ist':'')+(mein[n]?' mein':'')+'"><th>'+n+
       '<small>'+Z.titel.replace(/^Der |^Die /,'')+'</small></th>';
    Z_THEMA.forEach(function(T){
      var c=Z_ZT[n][T.k];
      h+='<td class="z-zelle" data-z="'+n+'" data-t="'+T.k+'" tabindex="0">'+
         zEsc(zKurz(c?c.t:'', 118))+'</td>';
    });
    h+='</tr>';
  });
  h+='</tbody></table>';
  zEl('zmatrix').innerHTML=h;

  /* schmal: ein Bereich, zwölf Zeilen */
  var TH=null; Z_THEMA.forEach(function(T){ if(T.k===zThema) TH=T; });
  var l='';
  Z_NUM.forEach(function(n){
    var Z=Z_ZAHL[n], c=Z_ZT[n][zThema];
    l+='<div class="zl'+(zOffen===n?' ist':'')+(mein[n]?' mein':'')+'" data-z="'+n+'" data-t="'+zThema+
       '" tabindex="0" style="border-left-color:'+Z.farbe+'">'+
       '<b>'+n+' &mdash; '+Z.titel+(mein[n]?' <i>deine '+mein[n][0]+'</i>':'')+
       '</b><p>'+zEsc(c?c.t:'')+'</p></div>';
  });
  zEl('zmliste').innerHTML=l;

  Array.prototype.forEach.call(
    document.querySelectorAll('.z-zelle[data-z], .zl[data-z]'), function(c){
    var n=+c.getAttribute('data-z');
    c.addEventListener('click',function(){ zThema=c.getAttribute('data-t')||zThema;
      zThemenBauen(); zZeigeZahl(n, true); });
    c.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){ e.preventDefault();
        zThema=c.getAttribute('data-t')||zThema; zThemenBauen(); zZeigeZahl(n, true); } });
  });
}

/* ── 4 · Wohnen ────────────────────────────────────────────── */
function zWohnBauen(){
  var box=zEl('zwohnerg'), txt=zEl('zadr').value;
  var A=AC_ZAHL.adresse(txt, zSys);
  if(!A){ box.innerHTML = txt.trim()
    ? '<div class="z-leer">Darin steckt keine Nummer. Tippe die Hausnummer ein, zum Beispiel <b>47a</b> &mdash; Stra&szlig;ennamen z&auml;hlen nicht mit.</div>'
    : '<div class="z-leer">Trag eine Nummer ein. Du bekommst dann, was diese Nummer mit einem Zuhause macht, f&uuml;r wen sie taugt und &mdash; wenn ein Profil aktiv ist &mdash; wie sie zu deiner eigenen Zahl steht.</div>';
    return; }

  var B=zBlatt, lz=B?B.lebenszahl:null;
  var h='';
  A.teile.forEach(function(S,i){
    var n=S.zahl, W=Z_WOHN[n], Z=Z_ZAHL[n];
    var rolle = A.mehrteilig ? (i===0?'Hausnummer':(i===1?'Wohnung oder Etage':'Weitere Nummer')) : 'Die Nummer';
    var reso = lz ? zWohnReso(lz, n) : null;
    var R = reso ? Z_RESO[reso] : null;
    h+='<div class="z-wohnerg" style="border-left-color:'+Z.farbe+'">'+
      '<div class="z-wk"><div class="z-wzif" style="color:'+Z.farbe+'">'+n+'</div>'+
      '<div><span class="lab" style="font-family:var(--mono);font-size:9.5px;letter-spacing:.12em;'+
      'text-transform:uppercase;color:#9A7235;display:block;margin-bottom:3px">'+rolle+' '+
      zEsc(S.text)+'</span><b style="font-family:var(--serif);font-size:20px;font-weight:500;'+
      'color:#2E3A5C">'+Z.n+' &mdash; '+Z.titel+'</b></div>'+
      (R?'<span class="z-wurteil" style="background:'+R.farbe+'">'+R.n+'</span>':'')+'</div>'+
      '<p class="ac-tech" data-ab="2">'+zEsc(S.text)+': '+
        S.ziffern.join(' + ')+(S.buchstaben.length?(S.ziffern.length?' + ':'')+
        S.buchstaben.map(function(b){ return b.c+' ('+b.n+')'; }).join(' + '):'')+
        ' = '+S.summe+(S.kette.length>1?' &rarr; '+S.kette.slice(1).join(' &rarr; '):'')+'</p>'+
      '<p>'+W.tut+'</p>'+
      '<div class="z-wpaar"><div class="z-sp gut"><b>Gut f&uuml;r</b>'+W.gut+'</div>'+
      '<div class="z-sp schat"><b>Schwer f&uuml;r</b>'+W.schwer+'</div></div>';
    if(R){
      var L=Z_ZAHL[lz];
      h+='<h4>Und f&uuml;r dich?</h4><p>'+R.satz(L,Z)+' '+R.folge+'</p>';
    }
    h+='<div class="z-wkniff"><b>Wenn du schon drin wohnst</b>'+W.kniff+'</div>';
    h+='<h4>Wem diese Nummer gut t&auml;te</h4><div class="z-passt">'+zPasstZu(n)+'</div>'+
      '<p class="z-hint" style="margin-top:7px">Gr&uuml;n: Die Nummer liefert, was dieser Lebenszahl fehlt. '+
      'Rot: Sie verdoppelt, wovon sie schon zu viel hat. Grau: kein besonderer Zug.</p>';
    h+='</div>';
  });

  if(A.hatVier||A.hatAcht){
    h+='<div class="z-streit"><span class="t">Nebenbei, und keine Deutung</span>'+
      'In dieser Nummer steckt eine '+(A.hatVier?'4':'8')+'. '+
      (A.hatVier?'Im chinesischen Sprachraum klingt die Vier wie das Wort f&uuml;r sterben, und deshalb werden in Hochh&auml;usern dort Etagen mit 4 und 14 &uuml;bersprungen. ':'')+
      (A.hatAcht?'Die Acht klingt dort wie das Wort f&uuml;r reich werden, und Nummern mit vielen Achten erzielen auf Auktionen reale Aufpreise. ':'')+
      'Das ist eine Tatsache &uuml;ber Sprache und Immobilienmarkt, nicht &uuml;ber die Zahl. In Berlin h&ouml;rt niemand diesen Gleichklang, also wirkt er hier auch nicht.</div>';
  }
  box.innerHTML=h;
}
function zPasstZu(hz){
  var gut=[], schlecht=[], neutral=[];
  Z_NUM.forEach(function(lz){
    var r=zWohnReso(lz,hz);
    if(r==='traegt') gut.push(lz);
    else if(r==='reibt'||r==='doppelt') schlecht.push(lz);
    else neutral.push(lz);
  });
  return gut.map(function(x){ return '<b>'+x+'</b>'; }).join('')+
    schlecht.map(function(x){ return '<b class="r">'+x+'</b>'; }).join('')+
    neutral.map(function(x){ return '<b class="n">'+x+'</b>'; }).join('');
}
function zPasstTabelle(){
  var h='<table><thead><tr><th>Lebenszahl</th><th>Tr&auml;gt dich</th><th>Reibt</th>'+
    '<th>Hat selbst schon genug</th></tr></thead><tbody>';
  var mein=zBlatt?zBlatt.lebenszahl:null;
  Z_NUM.forEach(function(lz){
    var Z=Z_ZAHL[lz], gut=[], schlecht=[];
    Z_NUM.forEach(function(hz){
      var r=zWohnReso(lz,hz);
      if(r==='traegt') gut.push(hz);
      if(r==='reibt'||r==='doppelt') schlecht.push(hz);
    });
    h+='<tr'+(lz===mein?' class="ist"':'')+'><th style="font-family:var(--serif);font-size:18px;'+
      'font-weight:400;color:#2E3A5C;white-space:nowrap">'+lz+
      '<small style="display:block;font-family:var(--sans);font-size:11.5px;color:#6B6259">'+
      Z.titel.replace(/^Der |^Die /,'')+'</small></th>'+
      '<td><b style="color:#3F6B4A">'+gut.join(', ')+'</b></td>'+
      '<td class="ab">'+schlecht.join(', ')+'</td>'+
      '<td>'+Z.satt.charAt(0).toUpperCase()+Z.satt.slice(1)+'</td></tr>';
  });
  h+='</tbody></table>';
  zEl('zpasst').innerHTML=h+
    '<p class="z-hint" style="padding:11px 13px 1px">Die letzte Spalte ist der Grund f&uuml;r '+
    'die beiden davor: Eine Nummer, die liefert, wovon die Zahl ohnehin genug hat, steht '+
    'unter „Reibt" &mdash; eine, die das Gegenst&uuml;ck liefert, unter „Tr&auml;gt dich".</p>';
}

/* ── 5 · Die Schulen ───────────────────────────────────────── */
function zSchulenBauen(){
  zEl('zschulen').innerHTML = Z_SYSTEM.map(function(S,i){
    return '<details class="z-sys"'+(i===0?' open':'')+'><summary><b>'+S.n+'</b>'+
      '<span>'+S.ruf+'</span>'+(S.neu?'<i>jung</i>':'')+'</summary><div class="z-sys-in"><dl>'+
      '<div><dt>Wie gerechnet wird</dt><dd>'+S.wie+'</dd></div>'+
      '<div><dt>Woher es kommt</dt><dd>'+S.her+'</dd></div>'+
      '<div><dt>Wof&uuml;r es gut ist</dt><dd>'+S.gut+'</dd></div>'+
      '<div><dt>Was dagegen spricht</dt><dd class="warn">'+S.vor+'</dd></div>'+
      '</dl></div></details>';
  }).join('');
}

/* ── 6 · Zahl und Chart ────────────────────────────────────── */
function zPlanetBauen(){
  var mein=zBlatt?zBlatt.lebenszahl:null;
  var h='<table><thead><tr><th>Zahl</th><th>Indisch</th><th>Westlich</th>'+
    '<th>Wochentag</th></tr></thead><tbody>';
  for(var n=1;n<=9;n++){
    var P=Z_PLANET[n], Z=Z_ZAHL[n], ab=(P.ind!==P.west);
    h+='<tr'+((n===mein||(Z_ZAHL[mein]&&Z_ZAHL[mein].meister===n))?' class="ist"':'')+'>'+
      '<td>'+n+'</td><td>'+P.ind+'</td><td'+(ab?' class="ab"':'')+'>'+P.west+'</td>'+
      '<td>'+(Z.tag==='—'?'<span style="color:#A05A3A">keiner</span>':Z.tag)+'</td></tr>';
  }
  h+='</tbody></table>';
  zEl('zplanet').innerHTML=h;
}
function zBrueckeBauen(){
  var box=zEl('zbruecke'), p=zAktiv();
  var h='<div class="z-streit" style="margin-top:14px"><span class="t">Woran die Zuordnung h&auml;ngt</span>'+
    'Die 4 und die 7 sind die beiden Zahlen, bei denen die Schulen auseinandergehen: indisch '+
    'Rahu und Ketu, westlich Uranus und Neptun. Das sind nicht nur andere Namen &mdash; Rahu und Ketu '+
    'sind die Mondknoten, also rechnerische Punkte, Uranus und Neptun sind Planeten. '+
    'Es sind au&szlig;erdem genau die zwei Zahlen ohne klassischen Wochentag, weil es in der '+
    'Siebentagewoche nur sieben Planeten gibt. Wer mit Zahlen und Chart zusammen arbeitet, '+
    'muss sich hier entscheiden.</div>';

  if(p && p.h!==undefined && p.lat!==undefined && typeof chartVon==='function'){
    try{
      var C=chartVon(p), B=zBlatt;
      var grund = B ? (Z_ZAHL[B.lebenszahl].meister || B.lebenszahl) : null;
      var pl = grund && grund<=9 ? Z_PLANET[grund] : null;
      if(pl && C[pl.ind]!==undefined){
        var ZN=['Widder','Stier','Zwillinge','Krebs','L&ouml;we','Jungfrau','Waage','Skorpion',
                'Sch&uuml;tze','Steinbock','Wassermann','Fische'];
        var lon=C[pl.ind], zi=Math.floor(((lon%360)+360)%360/30), hs=haus(C,lon);
        h+='<div class="z-streit" style="border-color:#2E3A5C;background:#E9EDF4">'+
          '<span class="t" style="color:#2E3A5C">Bei dir nebeneinandergelegt</span>'+
          'Deine Lebenszahl ist <b>'+B.lebenszahl+'</b>'+
          (B.lebenszahl!==grund?' (Grundzahl '+grund+')':'')+
          ', und die indische Zuordnung h&auml;ngt sie an <b>'+pl.ind+'</b>. '+
          'In deinem Chart steht '+pl.ind+' in <b>'+ZN[zi]+'</b>, im <b>'+hs+'. Haus</b>. '+
          'Wenn du beides zusammen benutzen willst, ist das der Anschluss: Die Zahl nennt das '+
          'Thema, das Chart sagt, wo und wie es bei dir vorkommt. Widersprechen sich die beiden, '+
          'gilt das Chart &mdash; es ist das feinere Werkzeug.</div>';
      }
    }catch(e){}
  }
  box.innerHTML=h;
}

/* ── 7 · Ehrlichkeit mit Zahlen ────────────────────────────── */
function zVerteilungBauen(){
  var V=AC_ZAHL.verteilung(), h='<p class="z-balu">Anteil aller Geburtstage 1940 bis 2039</p><div class="z-bal">';
  var ganz=[1,3,5,7,8,9];
  Z_NUM.forEach(function(n){
    var a=(V.zaehlung[n]||0)/V.gesamt;
    h+='<i class="'+(ganz.indexOf(n)>=0?'gr':'')+'" style="flex:'+a.toFixed(4)+
       ' 1 0" title="'+n+': '+zPz(a)+'&nbsp;%">'+n+'</i>';
  });
  h+='</div><p>Jede Ziffer 1, 3, 5, 7, 8 und 9 hat genau '+
     zPz(1/9)+'&nbsp;%. Die 2 hat nur '+zPz((V.zaehlung[2]||0)/V.gesamt)+
     '&nbsp;%, weil fast alles, was auf 2 hinausl&auml;uft, vorher auf der 11 anh&auml;lt &mdash; '+
     'und 2&nbsp;+&nbsp;11 ergibt wieder '+zPz(((V.zaehlung[2]||0)+(V.zaehlung[11]||0))/V.gesamt)+
     '&nbsp;%. Dasselbe gilt f&uuml;r 4 und 22 und f&uuml;r 6 und 33.</p>';
  zEl('zvert').innerHTML=h;
}
/* Wie oft die drei Rechenwege auseinandergehen — hier ausgerechnet,
   nicht abgeschrieben. */
function zAbweichung(){
  var ab=0, n=0, tage=[31,28,31,30,31,30,31,31,30,31,30,31];
  for(var y=1900;y<=2030;y++){
    var s=(y%4===0&&(y%100!==0||y%400===0));
    for(var m=1;m<=12;m++){
      var mx=tage[m-1]+((m===2&&s)?1:0);
      for(var d=1;d<=mx;d++){ n++; if(!AC_ZAHL.lebenszahl(d,m,y).einig) ab++; }
    }
  }
  zEl('zabw').innerHTML = zPz(ab/n) + '&nbsp;%';
}

/* ── Bericht ───────────────────────────────────────────────── */
function zBerichtText(){
  var B=zBlatt, p=zAktiv(), L=[];
  L.push('ZAHLEN — '+(p?zAnzeige(p):'ohne Profil'));
  if(!B) return L.join('\n')+'\nKein Profil aktiv, deshalb kein Blatt.\n';
  L.push('Geburtsdatum '+zTag(B.datum)+' · Tafel '+Z_SYSNAME[zSys].replace(/&auml;/g,'ä'));
  L.push('');
  L.push('DAS BLATT');
  function z(lab,w){ if(w===null||w===undefined||w===false) return;
    var Z=Z_ZAHL[w]; L.push('  '+lab+': '+w+(Z?' — '+Z.titel:'')); }
  z('Lebenszahl', B.lebenszahl);
  L.push('    '+B.lz.rohsumme+' → '+B.lz.kette.slice(1).join(' → '));
  if(!B.lz.einig) L.push('    strittig: der blockweise Weg gibt '+B.lz.teile);
  z('Geburtstagszahl', B.geburtstag.zahl);
  if(B.name){ z('Ausdruckszahl', B.name.ausdruck); z('Seelenzahl', B.name.seele);
              z('Persönlichkeit', B.name.person); }
  z('Reifezahl', B.reife);
  z('Persönliches Jahr '+B.jahr.jahr, B.jahr.zahl);
  L.push('  Herausforderung: '+B.herausforderung.haupt);
  if(B.systemStreit) L.push('  Hinweis: andere Tafel gibt Ausdruckszahl '+B.nameAnderesSystem.ausdruck);
  if(B.umlautStreit) L.push('  Hinweis: Umlaut als AE gibt Ausdruckszahl '+B.nameAndereUmlaute.ausdruck);

  var Z=Z_ZAHL[B.lebenszahl];
  L.push(''); L.push('ZUR LEBENSZAHL '+B.lebenszahl+' — '+Z.titel.toUpperCase());
  L.push(Z.wesen);
  L.push(''); L.push('  Was sie kann: '+Z.stark);
  L.push('  Wo sie kippt: '+Z.schatten);
  L.push('');
  Z_THEMA.forEach(function(T){
    var c=Z_ZT[B.lebenszahl][T.k]; if(!c) return;
    L.push(T.n.toUpperCase()); L.push('  '+c.t); L.push('  Handgriff: '+c.tun); L.push('');
  });
  var A=AC_ZAHL.adresse(zEl('zadr').value, zSys);
  if(A){
    var hn=A.haupt.zahl, W=Z_WOHN[hn], R=Z_RESO[zWohnReso(B.lebenszahl,hn)];
    L.push('NUMMER '+A.haupt.text+' → '+hn);
    L.push('  '+W.tut);
    L.push('  Gut für: '+W.gut);
    L.push('  Schwer für: '+W.schwer);
    if(R){ L.push('  Für dich: '+R.n+'. '+R.satz(Z,Z_ZAHL[hn]).replace(/<[^>]+>/g,'')+' '+R.folge); }
    L.push('  Kniff: '+W.kniff);
    L.push('');
  }
  L.push('GRENZEN');
  L.push('  Rund jeder neunte Mensch hat dieselbe Lebenszahl ('+zPz(B.anteil)+' % aller Geburtstage).');
  L.push('  Die Tafeln der Schulen widersprechen sich; es gibt keinen Schiedsrichter.');
  L.push('  Dass diese Zahlen etwas vorhersagen, ist nicht belegt.');
  L.push('  Aus einem Geburtsdatum lässt sich kein Neurotyp und keine Diagnose ablesen.');
  return L.join('\n').replace(/&auml;/g,'ä').replace(/&ouml;/g,'ö').replace(/&uuml;/g,'ü')
          .replace(/&szlig;/g,'ß').replace(/&shy;/g,'').replace(/&mdash;/g,'—')
          .replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/<[^>]+>/g,'');
}

/* ── Zusammensetzen ───────────────────────────────────────── */
function zAlles(){
  var p=zAktiv();
  var nm=zEl('zname').value;
  zBlatt = p ? AC_ZAHL.blatt(p, nm, new Date().getFullYear(), zSys, 'direkt') : null;
  zPersonenBauen(); zSystemBauen();
  zKartenBauen(); zKetteBauen(); zGitterBauen(); zStreitBauen();
  zRingBauen(); zDetailBauen();
  zMatrixBauen(); zWohnBauen(); zPasstTabelle();
  zPlanetBauen(); zBrueckeBauen();
  try{ if(window.AC_NIV) AC_NIV.anwenden(); }catch(e){}
}

function zStart(){
  var p=zAktiv();
  zEl('zname').value = zNameVon(p);
  try{ zVerdeckt = !AC_P.zeigeNamen(); }catch(e){ zVerdeckt=false; }
  zEl('znamever').textContent = zVerdeckt ? 'Buchstaben zeigen' : 'Buchstaben verdecken';
  zEl('znamever').classList.toggle('ist', zVerdeckt);

  zThemenBauen(); zSchulenBauen(); zVerteilungBauen(); zAbweichung();
  zAlles();

  var t=null;
  zEl('zname').addEventListener('input',function(){
    clearTimeout(t); t=setTimeout(function(){
      zNameSetzen(zAktiv(), zEl('zname').value); zAlles(); }, 260);
  });
  zEl('znamever').addEventListener('click',function(){
    zVerdeckt=!zVerdeckt;
    zEl('znamever').textContent = zVerdeckt ? 'Buchstaben zeigen' : 'Buchstaben verdecken';
    zEl('znamever').classList.toggle('ist', zVerdeckt);
    zGitterBauen();
  });
  var ta=null;
  zEl('zadr').addEventListener('input',function(){
    clearTimeout(ta); ta=setTimeout(function(){ zWohnBauen(); }, 230);
  });
  zEl('zkopie').addEventListener('click',function(){
    var s=zBerichtText();
    function fertig(){ zEl('zecho').textContent='Blatt kopiert, '+s.length+' Zeichen.';
      setTimeout(function(){ zEl('zecho').textContent=''; }, 3600); }
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(s).then(fertig,function(){ zNotfall(s); fertig(); });
    } else { zNotfall(s); fertig(); }
  });
  zEl('zdruck').addEventListener('click',function(){ window.print(); });
  window.addEventListener('ac-niveau',function(){ /* Stufe wirkt über CSS */ });
}
function zNotfall(s){
  var a=document.createElement('textarea'); a.value=s; document.body.appendChild(a);
  a.select(); try{ document.execCommand('copy'); }catch(e){} document.body.removeChild(a);
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', zStart);
else zStart();
