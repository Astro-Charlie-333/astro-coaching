/* Häuserseite: Anzeige und „bei dir" aus dem aktiven Profil.
   Gerechnet wird gegen rituale/engine.js (chartVon, haus, SIGNS).

   Hier steht kein Satz. Was auf der Seite zu lesen ist, steht als
   Vorlage in haeuser-daten.js (HZ_T); diese Datei rechnet und setzt
   mit hzFuell ein (Aufgabe 57, PRODUKT.md Abschnitt 7). Farben und
   Schriften des Rads stehen in haeuser-stil.css, nicht hier. */
(function(){
var el=function(id){return document.getElementById(id);};
var NS='http://www.w3.org/2000/svg';
function hzSvg(t,a){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);return e;}
function hzFuell(form,werte){
  var s=String(form||'');
  for(var k in werte) if(werte.hasOwnProperty(k))
    s=s.split('{'+k+'}').join(String(werte[k]===undefined||werte[k]===null?'':werte[k]));
  return s;
}
var PL=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];

function hzProfil(){ try{ var a=AC_P.alle(); return AC_P.aktives()||AC_P.eigenes()||a[0]||null; }catch(e){ return null; } }
var P=hzProfil(), C=null;
if(P){ try{ C=chartVon(P); }catch(e){ C=null; } }

/* Pro Bereich (0–11): Zeichen und Planeten bei dir */
var BEI=[];
for(var i=0;i<12;i++) BEI.push({zeichen:null,pl:[]});
if(C){
  var asc=Math.floor(C.ASC/30);
  for(var j=0;j<12;j++) BEI[j].zeichen=SIGNS[(asc+j)%12];
  PL.forEach(function(k){ BEI[haus(C,C[k])-1].pl.push(k); });
}
var hzWahl=0;

function hzProfilZeile(){
  var b=el('hzprofil');
  if(!C){ b.innerHTML=HZ_T.profilLeer; return; }
  var name=HZ_T.profilOhneNamen; try{ name=AC_P.anzeige(P,AC_P.zeigeNamen()); }catch(e){}
  var voll=BEI.filter(function(x){return x.pl.length;}).length;
  b.innerHTML=hzFuell(HZ_T.profilZeile,{voll:voll});
  b.querySelector('b').textContent=name;
}

/* Das Rad: zwölf Felder, die belebten gefüllt */
function hzRad(){
  var s=el('hzrad'); while(s.firstChild) s.removeChild(s.firstChild);
  var cx=200,cy=200,R=180,r=78;
  for(var i=0;i<12;i++){
    /* Bereich 1 links (wo der Aszendent steht), dann gegen den Uhrzeigersinn
       nach unten: die 4 unten, die 7 rechts, die 10 oben. Wie im Geburtsbild. */
    var a0=(180-i*30)*Math.PI/180, a1=(180-(i+1)*30)*Math.PI/180;
    var p=function(a,rr){return [cx+rr*Math.cos(a), cy+rr*Math.sin(a)];};
    var A=p(a0,R),B=p(a1,R),Cc=p(a1,r),D=p(a0,r);
    var voll=BEI[i].pl.length>0, an=i===hzWahl;
    var g=hzSvg('g',{role:'button',tabindex:0,
      'class':'hz-feld'+(voll?' voll':'')+(an?' an':''),
      'aria-label':hzFuell(voll?HZ_T.radMarkeVoll:HZ_T.radMarke,{n:i+1,titel:HZ_HAUS[i].titel}),
      'aria-pressed':String(an)});
    g.appendChild(hzSvg('path',{d:'M'+A+' A'+R+' '+R+' 0 0 0 '+B+' L'+Cc+' A'+r+' '+r+' 0 0 1 '+D+' Z'}));
    var m=p((a0+a1)/2,(R+r)/2+20), n=p((a0+a1)/2,(R+r)/2-16);
    var t1=hzSvg('text',{'class':'hz-rad-nr',x:m[0],y:m[1]+5,'text-anchor':'middle'});
    t1.textContent=String(i+1); g.appendChild(t1);
    var t2=hzSvg('text',{'class':'hz-rad-nm',x:n[0],y:n[1]+4,'text-anchor':'middle'});
    t2.textContent=HZ_HAUS[i].name; g.appendChild(t2);
    if(voll){ for(var k=0;k<BEI[i].pl.length&&k<5;k++){
      var q=p((a0+a1)/2+(k-(Math.min(BEI[i].pl.length,5)-1)/2)*0.09,R-12);
      g.appendChild(hzSvg('circle',{cx:q[0],cy:q[1],r:3.5})); } }
    (function(i){ function w(){ hzWahl=i; hzRad(); var c=el('hzbuehnen').children[i]; if(c){ c.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'}); } }
      g.addEventListener('click',w);
      g.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); w(); var n2=el('hzrad').querySelectorAll('g[role=button]')[i]; if(n2) n2.focus(); } }); })(i);
    s.appendChild(g);
  }
  var mitte=hzSvg('text',{'class':'hz-rad-mitte',x:cx,y:cy+5,'text-anchor':'middle'});
  mitte.textContent=C?HZ_T.radMitte:HZ_T.radMitteLeer;
  s.appendChild(mitte);
  Array.prototype.forEach.call(el('hzbuehnen').children,function(c,i){ c.classList.toggle('an',i===hzWahl); });
}

function hzBuehnen(){
  var box=el('hzbuehnen'); box.innerHTML='';
  HZ_HAUS.forEach(function(h,i){
    var k=document.createElement('article'); k.className='hz-buehne'+(BEI[i].pl.length?' voll':'');
    k.innerHTML='<div class="hz-nr"></div><div class="hz-inh"><h3></h3><p class="hz-tech ac-tech" data-ab="1"></p><p></p><p class="hz-stich"></p><p class="hz-frage"></p><p class="hz-bei"></p><p class="hz-bei-tech ac-tech" data-ab="1"></p></div>';
    k.querySelector('.hz-nr').textContent=String(i+1);
    k.querySelector('h3').textContent=h.titel;
    k.querySelector('.hz-tech').textContent=
      hzFuell(h.ecke?HZ_T.buehneTechEcke:HZ_T.buehneTech,{n:i+1,ecke:h.ecke});
    k.querySelectorAll('p')[1].textContent=h.was;
    k.querySelector('.hz-stich').textContent=h.stich;
    k.querySelector('.hz-frage').textContent=h.frage;
    var bei=k.querySelector('.hz-bei'), bt=k.querySelector('.hz-bei-tech');
    if(C){
      var anz=BEI[i].pl.length;
      bei.textContent=anz?(anz===1?HZ_T.beiEine:hzFuell(HZ_T.beiMehrere,{n:anz})):HZ_T.beiLeise;
      bt.textContent=hzFuell(anz?HZ_T.beiTech:HZ_T.beiTechLeer,
        {zeichen:BEI[i].zeichen, pl:BEI[i].pl.join(', ')});
    } else { bei.remove(); bt.remove(); }
    k.addEventListener('click',function(){ hzWahl=i; hzRad(); });
    box.appendChild(k);
  });
}

/* Eine Seite der Waage in Maschinensprache: „7. Haus Waage mit Venus" */
function hzSeiteTech(nr){
  var b=BEI[nr];
  return hzFuell(b.pl.length?HZ_T.achseTechSeite:HZ_T.achseTechSeiteLeer,
    {n:nr+1, zeichen:b.zeichen, pl:b.pl.join(', ')});
}

function hzAchsen(){
  var box=el('hzachsen'); box.innerHTML='';
  HZ_ACHSEN.forEach(function(x){
    var A=HZ_HAUS[x.a], B=HZ_HAUS[x.b], na=BEI[x.a].pl.length, nb=BEI[x.b].pl.length;
    var k=document.createElement('article'); k.className='hz-achse';
    k.innerHTML='<div class="hz-waage"><div class="s a"><b></b><span></span></div><div class="mitte" aria-hidden="true">&harr;</div><div class="s b"><b></b><span></span></div></div>'+
      '<h3></h3><p class="prinzip"></p><p class="prinzip"></p><p class="hz-bei"></p><p class="hz-bei-tech ac-tech" data-ab="1"></p>';
    var sa=k.querySelector('.s.a'), sb=k.querySelector('.s.b');
    sa.querySelector('b').textContent=A.titel; sb.querySelector('b').textContent=B.titel;
    sa.querySelector('span').textContent=String(x.a+1); sb.querySelector('span').textContent=String(x.b+1);
    k.querySelector('h3').textContent=x.name;
    var pr=k.querySelectorAll('.prinzip'); pr[0].textContent=x.zuvielA; pr[1].textContent=x.zuvielB;
    var bei=k.querySelector('.hz-bei'), bt=k.querySelector('.hz-bei-tech');
    if(C){
      if(na) sa.classList.add('voll'); if(nb) sb.classList.add('voll');
      var satz;
      if(!na&&!nb) satz=HZ_T.achseLeise;
      else if(na&&nb) satz=hzFuell(HZ_T.achseBeide,{links:A.titel, rechts:B.titel});
      else satz=hzFuell(HZ_T.achseEine,{links:(na?A:B).titel, rechts:(na?B:A).titel});
      bei.textContent=satz;
      bt.textContent=hzFuell(HZ_T.achseTech,{links:hzSeiteTech(x.a), rechts:hzSeiteTech(x.b)});
      k.classList.add(na&&nb?'beide':(na||nb?'eine':'keine'));
    } else { bei.remove(); bt.remove(); }
    box.appendChild(k);
  });
}

function hzBeispiel(){
  var b=HZ_BEISPIEL;
  el('hzbspkopf').textContent=hzFuell(HZ_T.bspKopf,
    {datum:b.datum, zeit:b.zeit, ort:b.ort, asc:b.asc, mc:b.mc, sonne:b.sonne});
  /* Die Bühnen beschreibt HZ_HAUS, und nur dort. Eine zweite,
     von Hand geschriebene Beschreibung lässt bau-haeuser.py scheitern. */
  el('hzbspws').textContent=hzFuell(HZ_T.bspWs,
    {sonneZ:b.sonneZ, ascZ:b.ascZ, ordnung:HZ_T.ordnung[b.wsHaus-1],
     wsHaus:b.wsHaus, mcHaus:b.mcHaus, stich:HZ_HAUS[b.wsHaus-1].stich});
  el('hzbsppl').textContent=hzFuell(HZ_T.bspPl,
    {abstand:b.abstand, plHaus:b.plHaus, stich:HZ_HAUS[b.plHaus-1].stich});
  el('hzbspfazit').textContent=HZ_T.bspFazit;
}

function hzQuiz(){
  var box=el('hzquiz'); box.innerHTML='';
  HZ_QUIZ.forEach(function(it){
    var d=document.createElement('div'); d.className='hz-q';
    var p=document.createElement('p'); p.textContent=it.q; d.appendChild(p);
    var o=document.createElement('div'); o.className='hz-opts';
    var ex=document.createElement('p'); ex.className='hz-expl'; ex.textContent=it.e; ex.hidden=true;
    it.o.forEach(function(lab,j){
      var b=document.createElement('button'); b.type='button'; b.textContent=lab;
      b.addEventListener('click',function(){
        Array.prototype.forEach.call(o.children,function(x,i){ x.className=i===it.r?'richtig':''; x.setAttribute('aria-pressed','false'); });
        if(j!==it.r) b.className='falsch';
        b.setAttribute('aria-pressed','true'); ex.hidden=false;
      });
      o.appendChild(b);
    });
    d.appendChild(o); d.appendChild(ex); box.appendChild(d);
  });
}

function hzLos(){ hzProfilZeile(); hzBuehnen(); hzRad(); hzAchsen(); hzBeispiel(); hzQuiz(); }
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',hzLos); else hzLos();
})();
