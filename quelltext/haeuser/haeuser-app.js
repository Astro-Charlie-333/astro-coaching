/* Häuserseite: Anzeige und „bei dir" aus dem aktiven Profil.
   Gerechnet wird gegen rituale/engine.js (chartVon, haus, SIGNS). */
(function(){
var el=function(id){return document.getElementById(id);};
var NS='http://www.w3.org/2000/svg';
function hzSvg(t,a){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);return e;}
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
  if(!C){
    b.innerHTML='Noch kein Profil aktiv. Mit einem Profil unter <a href="profile.html">Profile</a> siehst du hier, auf welchen B&uuml;hnen bei dir viel los ist.';
    return;
  }
  var name='das aktive Profil'; try{ name=AC_P.anzeige(P,AC_P.zeigeNamen()); }catch(e){}
  var voll=BEI.filter(function(x){return x.pl.length;}).length;
  b.innerHTML='F&uuml;r <b></b>: Auf '+voll+' von zw&ouml;lf B&uuml;hnen ist bei dir etwas los. Wechseln unter <a href="profile.html">Profile</a>.';
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
    var g=hzSvg('g',{role:'button',tabindex:0,'aria-label':(i+1)+': '+HZ_HAUS[i].titel+(voll?', bei dir belebt':''),'aria-pressed':String(an)});
    g.appendChild(hzSvg('path',{d:'M'+A+' A'+R+' '+R+' 0 0 0 '+B+' L'+Cc+' A'+r+' '+r+' 0 0 1 '+D+' Z',
      fill:an?'#2E3A5C':(voll?'#F5ECDD':'#FFFDFA'),stroke:'#EBE1D2','stroke-width':1.5}));
    var m=p((a0+a1)/2,(R+r)/2+20), n=p((a0+a1)/2,(R+r)/2-16);
    var t1=hzSvg('text',{x:m[0],y:m[1]+5,'text-anchor':'middle','font-size':17,'font-family':'Fraunces, Georgia, serif',fill:an?'#FCF7EF':'#2E3A5C'});
    t1.textContent=String(i+1); g.appendChild(t1);
    var t2=hzSvg('text',{x:n[0],y:n[1]+4,'text-anchor':'middle','font-size':11.5,'font-family':'DM Sans, system-ui, sans-serif',fill:an?'#E8C98D':'#6B6259'});
    t2.textContent=HZ_HAUS[i].name; g.appendChild(t2);
    if(voll){ for(var k=0;k<BEI[i].pl.length&&k<5;k++){
      var q=p((a0+a1)/2+(k-(Math.min(BEI[i].pl.length,5)-1)/2)*0.09,R-12);
      g.appendChild(hzSvg('circle',{cx:q[0],cy:q[1],r:3.5,fill:an?'#E8C98D':'#9A7235'})); } }
    (function(i){ function w(){ hzWahl=i; hzRad(); var c=el('hzbuehnen').children[i]; if(c){ c.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'}); } }
      g.addEventListener('click',w);
      g.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); w(); var n2=el('hzrad').querySelectorAll('g[role=button]')[i]; if(n2) n2.focus(); } }); })(i);
    s.appendChild(g);
  }
  var mitte=hzSvg('text',{x:cx,y:cy+5,'text-anchor':'middle','font-size':13,'font-family':'DM Sans, system-ui, sans-serif',fill:'#6B6259'});
  mitte.textContent=C?'Punkte: bei dir belebt':'Tippe eine Bühne an';
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
    k.querySelector('.hz-tech').textContent=(i+1)+'. Haus'+(h.ecke?' · beginnt mit dem '+h.ecke:'');
    k.querySelectorAll('p')[1].textContent=h.was;
    k.querySelector('.hz-stich').textContent=h.stich;
    k.querySelector('.hz-frage').textContent=h.frage;
    var bei=k.querySelector('.hz-bei'), bt=k.querySelector('.hz-bei-tech');
    if(C){
      bei.textContent=BEI[i].pl.length?(BEI[i].pl.length===1?'Bei dir belebt: Hier steht eine Kraft.':'Bei dir belebt: Hier stehen '+BEI[i].pl.length+' Kräfte.'):'Bei dir eine leise Bühne.';
      bt.textContent='Zeichen: '+BEI[i].zeichen+(BEI[i].pl.length?' · Planeten: '+BEI[i].pl.join(', '):' · ohne Planeten');
    } else { bei.remove(); bt.remove(); }
    k.addEventListener('click',function(){ hzWahl=i; hzRad(); });
    box.appendChild(k);
  });
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
    sa.querySelector('span').textContent=(x.a+1)+''; sb.querySelector('span').textContent=(x.b+1)+'';
    k.querySelector('h3').textContent=x.name;
    var pr=k.querySelectorAll('.prinzip'); pr[0].textContent=x.zuvielA; pr[1].textContent=x.zuvielB;
    var bei=k.querySelector('.hz-bei'), bt=k.querySelector('.hz-bei-tech');
    if(C){
      if(na) sa.classList.add('voll'); if(nb) sb.classList.add('voll');
      var satz;
      if(!na&&!nb) satz='Bei dir sind beide Seiten leise. Dieses Paar läuft im Hintergrund.';
      else if(na&&nb) satz='Bei dir sind beide Seiten belebt. Ein lebendiges Spannungsfeld: Du pendelst zwischen '+A.titel+' und '+B.titel+'.';
      else { var voll=na?A:B, leer=na?B:A;
        satz='Bei dir liegt das Gewicht auf '+voll.titel+'. Wenn diese Seite überdreht, liegt der Ausgleich in '+leer.titel+'.'; }
      bei.textContent=satz;
      bt.textContent=(x.a+1)+'. Haus '+BEI[x.a].zeichen+(na?' mit '+BEI[x.a].pl.join(', '):', leer')+
        ' · '+(x.b+1)+'. Haus '+BEI[x.b].zeichen+(nb?' mit '+BEI[x.b].pl.join(', '):', leer');
      k.classList.add(na&&nb?'beide':(na||nb?'eine':'keine'));
    } else { bei.remove(); bt.remove(); }
    box.appendChild(k);
  });
}

function hzBeispiel(){
  var b=HZ_BEISPIEL, box=el('hzbeispiel');
  box.innerHTML='<p class="hz-klein"></p><div class="hz-zwei"><div><b>Whole Sign</b><p></p></div><div><b>Placidus</b><p></p></div></div><p></p>';
  var ps=box.querySelectorAll('p');
  ps[0].textContent='Ein erfundenes Geburtsbild: '+b.datum+', '+b.zeit+' Uhr, '+b.ort+'. Aszendent '+b.asc+', MC '+b.mc+', Sonne '+b.sonne+'.';
  ps[1].textContent='Waage ist ab Schütze das elfte Zeichen. Die Sonne steht im '+b.wsHaus+'. Haus: Gemeinschaft, Netzwerke, Zugehörigkeit. Das MC fällt hier ebenfalls ins 11. Haus.';
  ps[2].textContent='Die Sonne steht '+b.abstand+' Bogenminuten hinter dem MC, also im '+b.plHaus+'. Haus: Beruf, Wirken, Sichtbarkeit.';
  ps[3].textContent='Beides ist rechnerisch richtig, und beides beschreibt dieselbe Person: jemanden, dessen Beruf in Gruppen und Netzwerken stattfindet. Der Widerspruch verschwindet, sobald man aufhört, sich für eine Schublade zu entscheiden.';
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
