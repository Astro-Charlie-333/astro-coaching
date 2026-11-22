/* Astro-Charlie · Zahlen — die Seite
   Setzt die Rechnung aus zahlen-rechner.js, die Inhalte aus
   zahlen-daten.js und die Sätze aus zahlen-texte.js zusammen.

   Hier steht kein Satz. `zFuell` setzt in eine Vorlage aus Z_T ein,
   und „dein" vor einer eigenen Zahl bildet B_BEUGE aus
   kern/bahn-daten.js — die eine Stelle, die das Geschlecht kennt
   (Aufgabe 56). bau-zahlen.py bricht ab, sobald hier wieder eine
   Zeichenkette mit Sprache auftaucht. */
function zEl(i){ return document.getElementById(i); }
function zEsc(s){ return String(s===undefined||s===null?'':s).replace(/[<>&"]/g,function(c){
  return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }
function zPz(x,n){ return (100*x).toFixed(n===undefined?1:n).replace('.',','); }
var Z_NSU='http://www.w3.org/2000/svg';

/* Eine Lücke `{so}` je Schlüssel, in einem Durchgang. */
/* Gefüllt wird an einer Stelle: AC_FUELL in kern/fuellen.js.
   Ein fehlender Wert bricht dort ab, statt lautlos zu
   verschwinden (Aufgabe 94). */
function zFuell(form,werte){ return AC_FUELL(form,werte); }
/* „deine Lebenszahl", „dein Ausdruck" — gebeugt an einer Stelle.
   Vorher stand hier „deine "+Name, und damit „deine Ausdruck". */
function zDein(k){ var L=Z_LABEL[k]; return L ? B_BEUGE(L,'nom') : ''; }
function zWort(k){ var L=Z_LABEL[k]; return L ? L.wort : ''; }
function zGross(s){ return String(s||'').charAt(0).toUpperCase()+String(s||'').slice(1); }

var Z_NAMEKEY='ac_zahlen_name';
var zPerson=null, zSys='pyth', zOffen=null, zThema='beruf', zVerdeckt=false, zBlatt=null;

function zProfile(){ try{ return AC_P.alle()||[]; }catch(e){ return []; } }
function zAktiv(){
  var a=zProfile();
  if(zPerson) for(var i=0;i<a.length;i++) if(a[i].id===zPerson) return a[i];
  try{ return AC_P.aktives()||AC_P.eigenes()||a[0]||null; }catch(e){ return a[0]||null; }
}
function zAnzeige(p){ try{ return AC_P.anzeige(p, AC_P.zeigeNamen()); }
  catch(e){ return (p&&p.name)||Z_T.ohneName; } }

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
  if(!a.length){ box.innerHTML=Z_T.ohneProfil; return; }
  box.innerHTML = a.map(function(x){
    return zFuell(Z_T.personKnopf,{ist:((p&&x.id===p.id)?' ist':''),
      id:zEsc(x.id), name:zEsc(zAnzeige(x))}); }).join('');
  Array.prototype.forEach.call(box.querySelectorAll('button[data-p]'),function(b){
    b.addEventListener('click',function(){ zPerson=b.getAttribute('data-p');
      var np=zAktiv(); zEl('zname').value=zNameVon(np); zAlles(); });
  });
}
function zSystemBauen(){
  var box=zEl('zsystem');
  box.innerHTML = ['pyth','chald'].map(function(s){
    return zFuell(Z_T.sysKnopf,{ist:(s===zSys?' ist':''),k:s,name:Z_T.sysName[s]});
  }).join('');
  Array.prototype.forEach.call(box.querySelectorAll('button[data-s]'),function(b){
    b.addEventListener('click',function(){ zSys=b.getAttribute('data-s'); zAlles(); });
  });
  zEl('zsyshint').innerHTML = Z_T.sysHint[zSys];
}

/* ── 1 · Das Blatt ──────────────────────────────────────────── */
function zKartenBauen(){
  var B=zBlatt, box=zEl('zkarten');
  if(!B){ box.innerHTML=Z_T.blattLeer; return; }
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
    return zFuell(Z_T.karte,{
      leer:(leer?' leer':''),
      rand:(Z?zFuell(Z_T.karteRand,{farbe:Z.farbe}):''),
      name:K.n,
      wert:(leer?Z_T.ohneWert:w),
      titel:(Z?zFuell(Z_T.karteTitel,{titel:Z.titel}):''),
      roh:((!leer && roh!==null && roh!==undefined && roh!==w)
        ? zFuell(Z_T.karteRoh,{roh:roh}) : ''),
      wie:(leer?Z_T.karteLeerWie:K.w),
      knopf:(Z?zFuell(Z_T.karteKnopf,{z:w,name:Z.n}):'')});
  }).join('');
  box.insertAdjacentHTML('afterend', Z_T.kartenHinweis);
  Array.prototype.forEach.call(box.querySelectorAll('button[data-z]'),function(b){
    b.addEventListener('click',function(){ zZeigeZahl(+b.getAttribute('data-z'), true); });
  });
}

function zKetteBauen(){
  var B=zBlatt, box=zEl('zkette');
  if(!B){ box.innerHTML=''; return; }
  var d=B.datum, ziffern=String(d.d)+String(d.mo)+String(d.y);
  var h=Z_T.ketteKopf;
  ziffern.split('').forEach(function(c,i){
    if(i) h+=Z_T.kettePlus;
    h+=zFuell(Z_T.ketteZiffer,{c:c});
  });
  h+=Z_T.ketteGleich;
  B.lz.kette.forEach(function(w,i){
    if(i) h+=Z_T.kettePfeil;
    h+=zFuell(Z_T.ketteWert,{end:((i===B.lz.kette.length-1)?' end':''),w:w});
  });
  h+=zFuell(Z_T.ketteSatz,{datum:zEsc(zTag(d)),
    meister:(AC_ZAHL.istMeister(B.lebenszahl)
      ? zFuell(Z_T.ketteMeister,{n:B.lebenszahl}) : '')});
  if(!B.lz.einig){
    h+=zFuell(Z_T.ketteStrittig,{teile:B.lz.teile,summe:B.lz.summe,stelle:B.lz.stelle});
  }
  h+=zFuell(Z_T.ketteWege,{summe:B.lz.summe,
    bTag:B.lz.teilwerte.tag, bMonat:B.lz.teilwerte.monat, bJahr:B.lz.teilwerte.jahr,
    teile:B.lz.teile,
    sTag:B.lz.strengwerte.tag, sMonat:B.lz.strengwerte.monat,
    sJahr:B.lz.strengwerte.jahr, streng:B.lz.streng});
  h+=zFuell(Z_T.ketteVier,{erste:B.herausforderung.erste,
    zweite:B.herausforderung.zweite, haupt:B.herausforderung.haupt,
    vierte:B.herausforderung.vierte, gebRoh:B.geburtstag.roh,
    rohsumme:B.lz.rohsumme, anteil:zPz(B.anteil)});
  h+=Z_T.ketteEnde;
  box.innerHTML=h;
}
function zTag(d){ return zFuell(Z_T.datum,{t:('0'+d.d).slice(-2),
  m:('0'+d.mo).slice(-2), j:d.y}); }

function zGitterBauen(){
  var B=zBlatt, box=zEl('zgitter');
  if(!B||!B.name||!B.name.gitter.length){ box.innerHTML=''; return; }
  var h=Z_T.gitterKopf;
  B.name.gitter.forEach(function(b){
    if(b.luecke){ h+=Z_T.gitterLuecke; return; }
    h+=zFuell(Z_T.gitterZeichen,{art:b.art,
      c:(zVerdeckt?Z_T.gitterVerdeckt:zEsc(b.c)),
      n:(b.ohne?Z_T.ohneWert:b.n)});
  });
  h+=zFuell(Z_T.gitterLeg,{
    y:(/Y/.test(AC_ZAHL.norm(zEl('zname').value||'', B.umlautArt)) ? Z_T.gitterY : ''),
    n:B.name.buchstaben, summe:B.name.ausdruckRoh});
  box.innerHTML=h;
}

function zStreitBauen(){
  var B=zBlatt, box=zEl('zstreit'), h='';
  if(!B){ box.innerHTML=''; return; }
  if(B.systemStreit){
    h+=zFuell(Z_T.streitTafel,{tafel:Z_T.sysName[zSys],
      hier:B.name.ausdruck, dort:B.nameAnderesSystem.ausdruck});
  }
  if(B.umlautStreit){
    h+=zFuell(Z_T.streitUmlaut,{hier:B.name.ausdruck,
      dort:B.nameAndereUmlaute.ausdruck});
  }
  if(B.name && B.name.yStoert){
    h+=zFuell(Z_T.streitY,{ohneY:B.name.seele, mitY:B.name.seeleMitY});
  }
  if(B.name && B.nameAnderesSystem){
    var AN=B.nameAnderesSystem;
    h+=zFuell(Z_T.streitAndere,{
      tafel:Z_T.sysName[zSys==='pyth'?'chald':'pyth'],
      ausdruck:AN.ausdruck, ausdruckRoh:AN.ausdruckRoh,
      seele:AN.seele, seeleRoh:AN.seeleRoh,
      person:AN.person, personRoh:AN.personRoh,
      fehlt:(AN.fehlt.length
        ? zFuell(Z_T.andereFehlt,{liste:AN.fehlt.join(', ')})
        : Z_T.andereKeine)});
  }
  if(B.name && B.name.fehlt.length){
    h+=zFuell(Z_T.streitFehlt,{liste:B.name.fehlt.join(', ')});
  }
  box.innerHTML=h;
}

/* ── 2 · Der Ring ───────────────────────────────────────────── */
/* Welche der eigenen Zahlen auf welcher Ziffer liegt. Der Wert ist
   der Schlüssel aus Z_LABEL, nicht das fertige Wort: Anzeige und
   Beugung holen sich beides von dort, und damit kann die
   Vorlesefassung nicht anders heißen als die sichtbare. */
function zEigeneZahlen(){
  var B=zBlatt; if(!B) return {};
  var m={};
  function setz(w,k){ if(w===null||w===undefined||w===false) return;
    if(!m[w]) m[w]=[]; if(m[w].indexOf(k)<0) m[w].push(k); }
  setz(B.lebenszahl,'lebenszahl'); setz(B.geburtstag.zahl,'geburtstag');
  if(B.name){ setz(B.name.ausdruck,'ausdruck'); setz(B.name.seele,'seele');
              setz(B.name.person,'person'); }
  setz(B.reife,'reife'); setz(B.jahr.zahl,'jahr');
  return m;
}
/* Der Zusatz, den eine Ziffer im Ring vorgelesen bekommt. Eine
   Stelle für Segmente und Meisterzahlen: vorher hing der Zusatz der
   Meisterzahlen an einer Schleifenvariablen von weiter oben und
   nannte „deine Zahl" immer dann, wenn die Lebenszahl 9 war. */
function zMeinZusatz(n, mein){
  return (mein && mein[n] && mein[n].length)
    ? zFuell(Z_T.segMein,{dein:zDein(mein[n][0])}) : '';
}
function zIstLeben(n){ return !!zBlatt && zBlatt.lebenszahl===n; }
var Z_MARKE='#E8C97A';

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
    'aria-label':Z_T.ringLabel});

  for(var i=0;i<9;i++){
    var n=i+1, a1=i*40-90+0.6, a2=(i+1)*40-90-0.6;
    var Z=Z_ZAHL[n], hat=zIstLeben(n);
    var g=N('g',{class:'z-seg'+(zOffen===n?' ist':'')+((zOffen&&zOffen!==n)?' aus':''),
      'data-z':String(n), tabindex:'0', role:'button',
      'aria-label':zFuell(Z_T.segLabel,{n:n, titel:Z.titel, mein:zMeinZusatz(n,mein)})});
    g.appendChild(N('path',{d:wedge(a1,a2), fill:Z.farbe, class:'fl',
      opacity:(zOffen===n?'1':'.9')}));
    g.appendChild(N('path',{d:wedge(a1,a2), fill:'none', class:'rd',
      stroke:(hat?Z_MARKE:'none'), 'stroke-width':(hat?'3':'0')}));
    var m=pos(i*40+20-90,(RA+RI)/2);
    g.appendChild(N('text',{x:m[0].toFixed(1),y:(m[1]-2).toFixed(1),'text-anchor':'middle',
      class:'zif'}, String(n)));
    g.appendChild(N('text',{x:m[0].toFixed(1),y:(m[1]+21).toFixed(1),'text-anchor':'middle',
      class:'nm'}, Z.titel.replace(/^Der |^Die /,'')));
    svg.appendChild(g);
  }
  /* Die drei Meisterzahlen in der Mitte */
  [11,22,33].forEach(function(n,k){
    var Z=Z_ZAHL[n], hat=zIstLeben(n);
    var w=(k*120-90)*Math.PI/180, cx=C+78*Math.cos(w), cy=C+78*Math.sin(w);
    var g=N('g',{class:'z-mz'+(zOffen===n?' ist':''),'data-z':String(n), tabindex:'0',
      role:'button','aria-label':zFuell(Z_T.mzLabel,{n:n, mein:zMeinZusatz(n,mein)})});
    g.appendChild(N('circle',{cx:cx.toFixed(1),cy:cy.toFixed(1),r:'37',fill:Z.farbe,
      opacity:(zOffen===n?'1':'.9'),
      stroke:(hat?Z_MARKE:'none'),'stroke-width':(hat?'3':'0')}));
    g.appendChild(N('text',{x:cx.toFixed(1),y:(cy+9).toFixed(1),'text-anchor':'middle',
      class:'zif'}, String(n)));
    svg.appendChild(g);
  });
  svg.appendChild(N('text',{x:String(C),y:String(C+128),'text-anchor':'middle',
    class:'z-mitte'},Z_T.ringMitte));

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
    L.push(zFuell(Z_T.legEintrag,{farbe:Z_ZAHL[q].farbe, n:q,
      labels:mein[q].map(zWort).join(' + ')})); });
  leg.innerHTML = L.length ? L.join('') : Z_T.legLeer;
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
  if(!zOffen){ box.innerHTML=Z_T.detailLeer; return; }
  var n=zOffen, Z=Z_ZAHL[n], T=Z_ZT[n], mein=zEigeneZahlen();
  var meta='';
  if(mein[n]) meta+=zFuell(Z_T.metaMein,{dein:zGross(zDein(mein[n][0]))+
    mein[n].slice(1).map(function(k){
      return zFuell(Z_T.undZeichen,{wort:zWort(k)}); }).join('')});
  if(Z.meister) meta+=zFuell(Z_T.metaMeister,{grund:Z.meister});
  if(Z.pInd!=='—') meta+=zFuell(Z_T.metaInd,{planet:Z.pInd});
  if(Z.pWest!=='—'&&Z.pWest!==Z.pInd) meta+=zFuell(Z_T.metaWest,{planet:Z.pWest});
  if(Z.tag!=='—') meta+=zFuell(Z_T.metaTag,{tag:Z.tag});

  var kasten='';
  if(Z.meister) kasten+=zFuell(Z_T.kastenMeister,{n:n, grund:Z.meister});
  if(mein[n]) kasten+=zFuell(Z_T.kastenMein,{
    labels:mein[n].map(zWort).join(Z_T.undWort)});

  var bereiche='';
  Z_THEMA.forEach(function(TH){
    var c=T[TH.k]; if(!c) return;
    bereiche+=zFuell(Z_T.detailBereich,{name:TH.n, text:c.t, tun:c.tun});
  });
  box.innerHTML=zFuell(Z_T.detail,{farbe:Z.farbe, n:n, name:Z.n, titel:Z.titel,
    kurz:Z.kurz, meta:meta, wesen:Z.wesen, kasten:kasten,
    stark:Z.stark, schatten:Z.schatten, bereiche:bereiche});
}

/* ── 3 · Die Matrix ────────────────────────────────────────── */
function zThemenBauen(){
  var box=zEl('zthemen');
  box.innerHTML = Z_THEMA.map(function(T){
    return zFuell(Z_T.themaKnopf,{ist:(T.k===zThema?' ist':''),k:T.k,n:T.n});
  }).join('');
  Array.prototype.forEach.call(box.querySelectorAll('button[data-t]'),function(b){
    b.addEventListener('click',function(){ zThema=b.getAttribute('data-t');
      zThemenBauen(); zMatrixBauen(); });
  });
}
function zKurz(s,max){
  s=String(s||''); if(s.length<=max) return s;
  var i=s.lastIndexOf(' ',max);
  return zFuell(Z_T.gekuerzt,{text:s.slice(0,i>40?i:max)});
}
function zMatrixBauen(){
  var mein=zEigeneZahlen();
  /* breit: alle acht Bereiche */
  var zeilen='';
  Z_NUM.forEach(function(n){
    var Z=Z_ZAHL[n], zellen='';
    Z_THEMA.forEach(function(T){
      var c=Z_ZT[n][T.k];
      zellen+=zFuell(Z_T.matrixZelle,{n:n, t:T.k, text:zEsc(zKurz(c?c.t:'', 118))});
    });
    zeilen+=zFuell(Z_T.matrixZeile,{
      klasse:(zOffen===n?'ist':'')+(mein[n]?' mein':''),
      n:n, titel:Z.titel.replace(/^Der |^Die /,''), zellen:zellen});
  });
  zEl('zmatrix').innerHTML=zFuell(Z_T.matrixKopf,{
    spalten:Z_THEMA.map(function(T){ return zFuell(Z_T.matrixSpalte,{n:T.n}); }).join(''),
    zeilen:zeilen});

  /* schmal: ein Bereich, zwölf Zeilen */
  var l='';
  Z_NUM.forEach(function(n){
    var Z=Z_ZAHL[n], c=Z_ZT[n][zThema];
    l+=zFuell(Z_T.listeZeile,{
      klasse:(zOffen===n?' ist':'')+(mein[n]?' mein':''),
      n:n, t:zThema, farbe:Z.farbe, titel:Z.titel,
      mein:(mein[n]?zFuell(Z_T.listeMein,{dein:zDein(mein[n][0])}):''),
      text:zEsc(c?c.t:'')});
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
  if(!A){ box.innerHTML = txt.trim() ? Z_T.wohnKeine : Z_T.wohnLeer; return; }

  var B=zBlatt, lz=B?B.lebenszahl:null;
  var h='';
  A.teile.forEach(function(S,i){
    var n=S.zahl, W=Z_WOHN[n], Z=Z_ZAHL[n];
    var rolle = A.mehrteilig
      ? (i===0?Z_T.rolleHaus:(i===1?Z_T.rolleWohnung:Z_T.rolleWeitere))
      : Z_T.rolleEine;
    var reso = lz ? zWohnReso(lz, n) : null;
    var R = reso ? Z_RESO[reso] : null;
    var rechnung = S.ziffern.join(' + ')+
      (S.buchstaben.length?(S.ziffern.length?' + ':'')+
        S.buchstaben.map(function(b){ return b.c+' ('+b.n+')'; }).join(' + '):'')+
      ' = '+S.summe+(S.kette.length>1?' → '+S.kette.slice(1).join(' → '):'');
    h+=zFuell(Z_T.wohnBlock,{farbe:Z.farbe, n:n, rolle:rolle, text:zEsc(S.text),
      name:Z.n, titel:Z.titel,
      urteil:(R?zFuell(Z_T.wohnUrteil,{farbe:R.farbe,n:R.n}):''),
      rechnung:rechnung, tut:W.tut, gut:W.gut, schwer:W.schwer,
      dich:(R?zFuell(Z_T.wohnDich,{satz:R.satz(Z_ZAHL[lz],Z),folge:R.folge}):''),
      kniff:W.kniff, passt:zPasstZu(n)});
  });

  if(A.hatVier||A.hatAcht){
    h+=zFuell(Z_T.wohnChina,{zahl:(A.hatVier?'4':'8'),
      vier:(A.hatVier?Z_T.chinaVier:''), acht:(A.hatAcht?Z_T.chinaAcht:'')});
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
  return gut.map(function(x){ return zFuell(Z_T.wohnPasstGut,{n:x}); }).join('')+
    schlecht.map(function(x){ return zFuell(Z_T.wohnPasstSchlecht,{n:x}); }).join('')+
    neutral.map(function(x){ return zFuell(Z_T.wohnPasstNeutral,{n:x}); }).join('');
}
function zPasstTabelle(){
  var mein=zBlatt?zBlatt.lebenszahl:null, zeilen='';
  Z_NUM.forEach(function(lz){
    var Z=Z_ZAHL[lz], gut=[], schlecht=[];
    Z_NUM.forEach(function(hz){
      var r=zWohnReso(lz,hz);
      if(r==='traegt') gut.push(hz);
      if(r==='reibt'||r==='doppelt') schlecht.push(hz);
    });
    zeilen+=zFuell(Z_T.passtZeile,{klasse:(lz===mein?'ist':''), n:lz,
      titel:Z.titel.replace(/^Der |^Die /,''),
      gut:gut.join(', '), schlecht:schlecht.join(', '), satt:zGross(Z.satt)});
  });
  zEl('zpasst').innerHTML=zFuell(Z_T.passtKopf,{zeilen:zeilen})+Z_T.passtHinweis;
}

/* ── 5 · Die Schulen ───────────────────────────────────────── */
function zSchulenBauen(){
  zEl('zschulen').innerHTML = Z_SYSTEM.map(function(S,i){
    return zFuell(Z_T.schule,{offen:(i===0?' open':''), n:S.n, ruf:S.ruf,
      neu:(S.neu?Z_T.schuleNeu:''), wie:S.wie, her:S.her, gut:S.gut, vor:S.vor});
  }).join('');
}

/* ── 6 · Zahl und Chart ────────────────────────────────────── */
function zPlanetBauen(){
  var mein=zBlatt?zBlatt.lebenszahl:null, zeilen='';
  for(var n=1;n<=9;n++){
    var P=Z_PLANET[n], Z=Z_ZAHL[n];
    zeilen+=zFuell(Z_T.planetZeile,{
      klasse:((n===mein||(Z_ZAHL[mein]&&Z_ZAHL[mein].meister===n))?'ist':''),
      n:n, ind:P.ind, abKlasse:((P.ind!==P.west)?'ab':''), west:P.west,
      tag:(Z.tag==='—'?Z_T.planetKeiner:Z.tag)});
  }
  zEl('zplanet').innerHTML=zFuell(Z_T.planetKopf,{zeilen:zeilen});
}
function zBrueckeBauen(){
  var box=zEl('zbruecke'), p=zAktiv();
  var h=Z_T.bruecke;

  if(p && p.h!==undefined && p.lat!==undefined && typeof chartVon==='function'){
    try{
      var C=chartVon(p), B=zBlatt;
      var grund = B ? (Z_ZAHL[B.lebenszahl].meister || B.lebenszahl) : null;
      var pl = grund && grund<=9 ? Z_PLANET[grund] : null;
      if(pl && C[pl.ind]!==undefined){
        var lon=C[pl.ind], zi=Math.floor(((lon%360)+360)%360/30), hs=haus(C,lon);
        h+=zFuell(Z_T.brueckeMein,{lz:B.lebenszahl,
          grund:(B.lebenszahl!==grund?zFuell(Z_T.brueckeGrund,{grund:grund}):''),
          planet:pl.ind, zeichen:Z_T.zeichen[zi], haus:hs});
      }
    }catch(e){}
  }
  box.innerHTML=h;
}

/* ── 7 · Ehrlichkeit mit Zahlen ────────────────────────────── */
function zVerteilungBauen(){
  var V=AC_ZAHL.verteilung(), balken='';
  var ganz=[1,3,5,7,8,9];
  Z_NUM.forEach(function(n){
    var a=(V.zaehlung[n]||0)/V.gesamt;
    balken+=zFuell(Z_T.vertBalken,{klasse:(ganz.indexOf(n)>=0?'gr':''),
      anteil:a.toFixed(4), n:n, pz:zPz(a)});
  });
  zEl('zvert').innerHTML=zFuell(Z_T.vertKopf,{balken:balken,
    satz:zFuell(Z_T.vertSatz,{neuntel:zPz(1/9),
      zwei:zPz((V.zaehlung[2]||0)/V.gesamt),
      beide:zPz(((V.zaehlung[2]||0)+(V.zaehlung[11]||0))/V.gesamt)})});
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
  zEl('zabw').innerHTML = zFuell(Z_T.prozent,{pz:zPz(ab/n)});
}

/* ── Bericht ───────────────────────────────────────────────── */
function zBerichtText(){
  var B=zBlatt, p=zAktiv(), L=[];
  L.push(zFuell(Z_T.berKopf,{wer:(p?zAnzeige(p):Z_T.berOhneProfil)}));
  if(!B) return L.join('\n')+'\n'+Z_T.berKeinBlatt+'\n';
  L.push(zFuell(Z_T.berDatum,{datum:zTag(B.datum), tafel:Z_T.sysName[zSys]}));
  L.push('');
  L.push(Z_T.berBlatt);
  function z(lab,w){ if(w===null||w===undefined||w===false) return;
    var Z=Z_ZAHL[w];
    L.push(zFuell(Z_T.berZeile,{lab:lab, wert:w,
      titel:(Z?zFuell(Z_T.berTitel,{titel:Z.titel}):'')})); }
  z(Z_T.berLeben, B.lebenszahl);
  L.push(zFuell(Z_T.berKette,{roh:B.lz.rohsumme, kette:B.lz.kette.slice(1).join(' → ')}));
  if(!B.lz.einig) L.push(zFuell(Z_T.berStrittig,{teile:B.lz.teile}));
  z(Z_T.berGeburtstag, B.geburtstag.zahl);
  if(B.name){ z(Z_T.berAusdruck, B.name.ausdruck); z(Z_T.berSeele, B.name.seele);
              z(Z_T.berPerson, B.name.person); }
  z(Z_T.berReife, B.reife);
  z(zFuell(Z_T.berJahr,{jahr:B.jahr.jahr}), B.jahr.zahl);
  L.push(zFuell(Z_T.berHerausf,{n:B.herausforderung.haupt}));
  if(B.systemStreit)
    L.push(zFuell(Z_T.berAndereTafel,{n:B.nameAnderesSystem.ausdruck}));
  if(B.umlautStreit)
    L.push(zFuell(Z_T.berUmlaut,{n:B.nameAndereUmlaute.ausdruck}));

  var Z=Z_ZAHL[B.lebenszahl];
  L.push('');
  L.push(zFuell(Z_T.berZurLeben,{n:B.lebenszahl, titel:Z.titel.toUpperCase()}));
  L.push(Z.wesen);
  L.push('');
  L.push(zFuell(Z_T.berKann,{t:Z.stark}));
  L.push(zFuell(Z_T.berKippt,{t:Z.schatten}));
  L.push('');
  Z_THEMA.forEach(function(T){
    var c=Z_ZT[B.lebenszahl][T.k]; if(!c) return;
    L.push(T.n.toUpperCase());
    L.push(zFuell(Z_T.berTut,{t:c.t}));
    L.push(zFuell(Z_T.berHandgriff,{t:c.tun}));
    L.push('');
  });
  var A=AC_ZAHL.adresse(zEl('zadr').value, zSys);
  if(A){
    var hn=A.haupt.zahl, W=Z_WOHN[hn], R=Z_RESO[zWohnReso(B.lebenszahl,hn)];
    L.push(zFuell(Z_T.berNummer,{text:A.haupt.text, n:hn}));
    L.push(zFuell(Z_T.berTut,{t:W.tut}));
    L.push(zFuell(Z_T.berGut,{t:W.gut}));
    L.push(zFuell(Z_T.berSchwer,{t:W.schwer}));
    if(R) L.push(zFuell(Z_T.berFuerDich,{urteil:R.n,
      satz:R.satz(Z,Z_ZAHL[hn]).replace(/<[^>]+>/g,''), folge:R.folge}));
    L.push(zFuell(Z_T.berKniff,{t:W.kniff}));
    L.push('');
  }
  L.push(Z_T.berGrenzen);
  L.push(zFuell(Z_T.berGrenze1,{anteil:zPz(B.anteil)}));
  L.push(Z_T.berGrenze2);
  L.push(Z_T.berGrenze3);
  L.push(Z_T.berGrenze4);
  return L.join('\n').replace(/&shy;/g,'').replace(/&mdash;/g,'—')
          .replace(/&ndash;/g,'–').replace(/&bull;/g,'•')
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
  zEl('znamever').textContent = zVerdeckt ? Z_T.zeigen : Z_T.verdecken;
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
    zEl('znamever').textContent = zVerdeckt ? Z_T.zeigen : Z_T.verdecken;
    zEl('znamever').classList.toggle('ist', zVerdeckt);
    zGitterBauen();
  });
  var ta=null;
  zEl('zadr').addEventListener('input',function(){
    clearTimeout(ta); ta=setTimeout(function(){ zWohnBauen(); }, 230);
  });
  zEl('zkopie').addEventListener('click',function(){
    var s=zBerichtText();
    function fertig(){ zEl('zecho').textContent=zFuell(Z_T.kopiert,{n:s.length});
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
