/* Astro-Charlie · Format-Umschalter
   Kurz, Ausführlich, Visuell. Im visuellen Modus wird pro Facette eine Grafik gezeichnet:
   ein Häuserring mit den betroffenen Häusern, die beteiligten Planeten als Glyphen
   und die Aspekte als farbige Verbindungen. Die Wahl bleibt gespeichert. */
(function(){
var KEY='ac_format';
var SIGNS=['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische'];
var GLY={Sonne:'☉',Mond:'☽',Merkur:'☿',Venus:'♀',Mars:'♂',Jupiter:'♃',Saturn:'♄',
 Uranus:'♅',Neptun:'♆',Pluto:'♇',ASC:'AC',MC:'MC',Lilith:'⚸',Chiron:'⚷'};
var HK=['Person','Wert','Sprache','Zuhause','Ausdruck','Alltag','Partnerschaft','Tiefe','Sinn','Beruf','Gruppen','Rückzug'];
var AFARBE={Konjunktion:'#9A7235',Sextil:'#3E6B8A',Quadrat:'#A5462A',Trigon:'#3E6B8A',Opposition:'#A5462A'};

var CSS = `
.fm-leiste{display:flex;gap:9px;align-items:center;flex-wrap:wrap;background:var(--papier);
 border:1px solid var(--linie);border-radius:16px;padding:11px 14px;margin-bottom:14px;}
.fm-lab{font-family:var(--sans);font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:var(--messing);}
.fm-knopf{display:flex;gap:4px;}
.fm-knopf button{font-family:var(--sans);font-size:13.5px;padding:7px 14px;border:1px solid var(--linie);
 background:var(--bg);color:var(--tinte);border-radius:16px;cursor:pointer;}
.fm-knopf button:hover{border-color:var(--nacht);}
.fm-knopf button[aria-pressed="true"]{background:var(--nacht);border-color:var(--nacht);color:#fff;}
.fm-tipp{font-size:12.5px;color:var(--leise);margin-left:auto;max-width:44ch;line-height:1.45;}
.fm-tipp b{color:var(--tinte);}
@media(max-width:560px){.fm-tipp{margin-left:0;max-width:none;}}

/* ── Kurz ── */
body.fmt-kurz .fa-daten{display:none;}
body.fmt-kurz .fa-block p:not(:first-of-type){display:none;}
body.fmt-kurz .fa-coach,body.fmt-kurz .fa-vis{display:none;}
body.fmt-kurz .fa-wozu p:first-of-type{display:none;}
body.fmt-kurz .kt-details,body.fmt-kurz .rm-tuer p{display:none;}

/* ── Ausführlich ── */
body.fmt-lang .fa-vis{display:none;}

/* ── Visuell ── */
body.fmt-visuell .fa-vis{display:block;margin:4px 0 15px;}
body.fmt-visuell .fa-block p:not(:first-of-type){display:none;}
body.fmt-visuell .fa-daten{display:none;}
body.fmt-visuell .fa-coach{display:none;}
body.fmt-visuell .rm-bal .bar{height:17px;}
body.fmt-visuell .rm-tuer p{display:none;}
body.fmt-visuell .fa-frage{font-size:19px;}

.vis-karte{background:var(--bg);border:1px solid var(--linie);border-radius:15px;padding:14px 16px;}
.vis-oben{display:grid;grid-template-columns:132px 1fr;gap:16px;align-items:center;}
@media(max-width:520px){.vis-oben{grid-template-columns:1fr;justify-items:center;}}
.vis-oben svg{display:block;width:132px;height:132px;}
.vis-glyphen{display:flex;gap:7px;flex-wrap:wrap;}
.vis-g{display:flex;flex-direction:column;align-items:center;gap:1px;background:var(--papier);
 border:1px solid var(--linie);border-radius:12px;padding:7px 10px;min-width:52px;}
.vis-g .gl{font-size:20px;color:var(--nacht);line-height:1;}
.vis-g .hs{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--leise);}
.vis-g.stark{background:var(--nacht);border-color:var(--nacht);}
.vis-g.stark .gl{color:#fff;} .vis-g.stark .hs{color:#D3D9E6;}
.vis-asp{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px;}
.vis-a{display:flex;align-items:center;gap:6px;font-family:'JetBrains Mono',monospace;
 font-size:11px;background:var(--papier);border:1px solid var(--linie);border-radius:11px;padding:4px 9px;color:var(--leise);}
.vis-a i{display:block;width:16px;height:3px;border-radius:2px;}
.vis-leer{font-size:13.5px;color:var(--leise);}
`;

function lade(){ try{ return localStorage.getItem(KEY)||null; }catch(e){ return null; } }
function sichere(v){ try{ localStorage.setItem(KEY,v); }catch(e){} }
function NS(t,a){var e=document.createElementNS('http://www.w3.org/2000/svg',t);for(var k in a)e.setAttribute(k,a[k]);return e;}

/* Häuserring: betroffene Häuser hervorgehoben, Planeten als Punkte */
function ring(v){
  var s=NS('svg',{viewBox:'0 0 132 132',role:'img','aria-label':'Häuser dieser Facette'});
  var C=66, RA=58, RI=38;
  var belegt={};
  (v.planeten||[]).forEach(function(p){ belegt[p[1]]=(belegt[p[1]]||0)+1; });
  var anker={}; (v.haeuser||[]).forEach(function(h){ anker[h]=1; });

  for(var i=0;i<12;i++){
    var a0=(i*30-90)*Math.PI/180, a1=((i+1)*30-90)*Math.PI/180;
    var x1=C+RA*Math.cos(a0), y1=C+RA*Math.sin(a0);
    var x2=C+RA*Math.cos(a1), y2=C+RA*Math.sin(a1);
    var x3=C+RI*Math.cos(a1), y3=C+RI*Math.sin(a1);
    var x4=C+RI*Math.cos(a0), y4=C+RI*Math.sin(a0);
    var hn=i+1;
    var fill = anker[hn] ? '#2E3A5C' : (belegt[hn] ? '#E4DACB' : '#FFFDFA');
    if(anker[hn]&&belegt[hn]) fill='#1F2A47';
    s.appendChild(NS('path',{d:'M'+x1+','+y1+' A'+RA+','+RA+' 0 0 1 '+x2+','+y2+
      ' L'+x3+','+y3+' A'+RI+','+RI+' 0 0 0 '+x4+','+y4+' Z',
      fill:fill, stroke:'#D9CDBC','stroke-width':.8}));
    var am=(i*30+15-90)*Math.PI/180, rm=(RA+RI)/2;
    var t=NS('text',{x:C+rm*Math.cos(am), y:C+rm*Math.sin(am)+4,'text-anchor':'middle',
      'font-size':10.5, fill:(anker[hn]?'#fff':'#8B7E6C')});
    t.textContent=hn; s.appendChild(t);
  }
  /* Planetenpunkte innen */
  var pl=(v.planeten||[]).slice(0,8);
  pl.forEach(function(p,idx){
    var hn=p[1], am=((hn-1)*30+15-90)*Math.PI/180;
    var r=RI-9-(idx%2)*11;
    var t=NS('text',{x:C+r*Math.cos(am), y:C+r*Math.sin(am)+5,'text-anchor':'middle','font-size':14,fill:'#2E3A5C'});
    t.textContent=GLY[p[0]]||p[0]; s.appendChild(t);
  });
  /* Stärke als Ring außen */
  var u=2*Math.PI*62, anteil=Math.max(4,v.rel||0)/100;
  s.appendChild(NS('circle',{cx:C,cy:C,r:62,fill:'none',stroke:'#EBE1D2','stroke-width':3}));
  s.appendChild(NS('circle',{cx:C,cy:C,r:62,fill:'none',stroke:'#9A7235','stroke-width':3,
    'stroke-dasharray':(u*anteil)+' '+u,'stroke-linecap':'round',
    transform:'rotate(-90 '+C+' '+C+')'}));
  return s;
}

function zeichneVis(el){
  if(el.getAttribute('data-fertig')) return;
  var v;
  try{ v=JSON.parse(el.getAttribute('data-vis').replace(/&#39;/g,"'")); }catch(e){ return; }
  el.innerHTML='';
  var k=document.createElement('div'); k.className='vis-karte';
  var oben=document.createElement('div'); oben.className='vis-oben';
  oben.appendChild(ring(v));

  var rechts=document.createElement('div');
  var gl=document.createElement('div'); gl.className='vis-glyphen';
  var gezeigt={};
  (v.planeten||[]).forEach(function(p){
    if(gezeigt[p[0]]) return; gezeigt[p[0]]=1;
    var d=document.createElement('div'); d.className='vis-g stark';
    d.innerHTML='<span class="gl">'+(GLY[p[0]]||p[0])+'</span><span class="hs">'+p[1]+'. Haus</span>';
    gl.appendChild(d);
  });
  (v.herrscher||[]).forEach(function(x){
    if(gezeigt[x[1]]) return; gezeigt[x[1]]=1;
    var d=document.createElement('div'); d.className='vis-g';
    d.innerHTML='<span class="gl">'+(GLY[x[1]]||x[1])+'</span><span class="hs">→ '+x[2]+'. Haus</span>';
    gl.appendChild(d);
  });
  (v.achsnah||[]).forEach(function(x){
    var d=document.createElement('div'); d.className='vis-g stark';
    d.innerHTML='<span class="gl">'+(GLY[x[0]]||x[0])+'</span><span class="hs">auf '+(x[1]==='Aszendent'?'AC':'MC')+'</span>';
    gl.appendChild(d);
  });
  if(!gl.children.length){
    var leer=document.createElement('div'); leer.className='vis-leer';
    leer.textContent='Keine Planeten in den Ankerhäusern — diese Facette läuft bei dir über den Herrscher.';
    rechts.appendChild(leer);
  } else rechts.appendChild(gl);

  if((v.aspekte||[]).length){
    var as=document.createElement('div'); as.className='vis-asp';
    v.aspekte.forEach(function(a){
      var d=document.createElement('div'); d.className='vis-a';
      d.innerHTML='<i style="background:'+(AFARBE[a[1]]||'#9A7235')+'"></i>'+
        (GLY[a[0]]||a[0])+' '+(GLY[a[2]]||a[2])+' '+a[3]+'°';
      as.appendChild(d);
    });
    rechts.appendChild(as);
  }
  oben.appendChild(rechts);
  k.appendChild(oben);
  el.appendChild(k);
  el.setAttribute('data-fertig','1');
}

function alleZeichnen(){
  Array.prototype.forEach.call(document.querySelectorAll('.fa-vis'), zeichneVis);
}

function setzen(v){
  document.body.classList.remove('fmt-kurz','fmt-lang','fmt-visuell');
  document.body.classList.add('fmt-'+v);
  sichere(v);
  if(v==='visuell') setTimeout(alleZeichnen,30);
}

function merkurVorschlag(){
  try{
    if(!window.AC_P||typeof geo!=='function'||typeof jdFromUT!=='function') return null;
    var p=AC_P.aktives(); if(!p) return null;
    var ut=p.h+p.mi/60-p.tz,y=p.y,mo=p.mo,d=p.d;
    if(ut<0){ut+=24;d-=1;} if(ut>=24){ut-=24;d+=1;}
    var T=(jdFromUT(y,mo,d,ut)-2451545)/36525;
    var zi=Math.floor(geo('Merkur',T)/30), el=zi%4;
    if(el===1) return {v:'lang',   z:SIGNS[zi], grund:'Erde nimmt Konkretes und Ausführliches gut auf'};
    if(el===2) return {v:'kurz',   z:SIGNS[zi], grund:'Luft mag den Überblick und ermüdet an Länge'};
    if(el===3) return {v:'visuell',z:SIGNS[zi], grund:'Wasser denkt in Bildern statt in Listen'};
    return {v:'kurz', z:SIGNS[zi], grund:'Feuer will schnell zum Punkt'};
  }catch(e){ return null; }
}

window.AC_format=function(){
  if(document.getElementById('fmleiste')) return;
  var st=document.createElement('style'); st.textContent=CSS; document.head.appendChild(st);

  var gewaehlt=lade(), vorschlag=null, neu=false;
  if(!gewaehlt){ vorschlag=merkurVorschlag(); gewaehlt=vorschlag?vorschlag.v:'lang'; neu=true; }
  setzen(gewaehlt);

  var wrap=document.querySelector('.wrap'); if(!wrap) return;
  var bar=document.createElement('div');
  bar.className='fm-leiste'; bar.id='fmleiste';
  bar.innerHTML='<span class="fm-lab">Ansicht</span><div class="fm-knopf" id="fmk"></div><div class="fm-tipp" id="fmtipp"></div>';
  var tuer=wrap.querySelector('.rm-tuer')||wrap.querySelector('.lede');
  if(tuer&&tuer.nextSibling) tuer.parentNode.insertBefore(bar,tuer.nextSibling);
  else wrap.insertBefore(bar,wrap.firstChild);

  var kb=document.getElementById('fmk'), tipp=document.getElementById('fmtipp');
  function zeichne(){
    kb.innerHTML='';
    [['kurz','Kurz'],['lang','Ausführlich'],['visuell','Visuell']].forEach(function(o){
      var b=document.createElement('button'); b.type='button'; b.textContent=o[1];
      b.setAttribute('aria-pressed', gewaehlt===o[0]);
      b.addEventListener('click',function(){
        gewaehlt=o[0]; setzen(o[0]); zeichne();
        tipp.innerHTML=(o[0]==='visuell')
          ? 'Jede Facette bekommt einen H&auml;userring: dunkel sind die Ankerh&auml;user, die Glyphen zeigen die beteiligten Punkte.'
          : 'Gilt ab jetzt auf allen Seiten. Jederzeit umstellbar.';
      });
      kb.appendChild(b);
    });
    if(neu&&vorschlag){
      tipp.innerHTML='Vorgeschlagen, weil dein <b>Merkur in '+vorschlag.z+'</b> steht — '+vorschlag.grund+
        '. Wenn es nicht passt, einfach wechseln: du kennst dich besser als die Rechnung.';
    } else if(!tipp.innerHTML){
      tipp.innerHTML='Dieselben Inhalte, andere Darstellung. Deine Wahl bleibt gespeichert.';
    }
  }
  zeichne();

  /* Aufklappende Facetten nachzeichnen */
  document.addEventListener('toggle',function(e){
    if(document.body.classList.contains('fmt-visuell')) setTimeout(alleZeichnen,20);
  },true);
};

document.addEventListener('DOMContentLoaded',function(){
  try{ AC_format(); }catch(e){ console.error('Format:',e); }
});
})();
