/* Astro-Charlie · Interaktives Chart-Rad mit anklickbaren Aspekten
   Zeichnet Radix, Transite oder Solar Return und legt die Aspektlinien darüber.
   Braucht aspekte-daten.js für die Deutungen. */
(function(){
var SIGNS=['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische'];
var GLZ=['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
var GLY={Sonne:'☉',Mond:'☽',Merkur:'☿',Venus:'♀',Mars:'♂',Jupiter:'♃',Saturn:'♄',
 Uranus:'♅',Neptun:'♆',Pluto:'♇',ASC:'AC',MC:'MC'};
var ORD=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];
var ORB={Sonne:8,Mond:8,ASC:6,MC:6,Merkur:6,Venus:6,Mars:6,Jupiter:5,Saturn:5,Uranus:4,Neptun:4,Pluto:4};
var PERS={Sonne:1,Mond:1,ASC:1,MC:1,Merkur:1,Venus:1,Mars:1};
var ASPEKTE=[
 {w:0,  n:'Konjunktion', f:'#9A7235', fak:1,   art:'neutral'},
 {w:60, n:'Sextil',      f:'#3E6B8A', fak:0.5, art:'weich'},
 {w:90, n:'Quadrat',     f:'#A5462A', fak:0.8, art:'hart'},
 {w:120,n:'Trigon',      f:'#3E6B8A', fak:0.8, art:'weich'},
 {w:180,n:'Opposition',  f:'#A5462A', fak:1,   art:'hart'}
];
function nrm(x){x=x%360;return x<0?x+360:x;}
function NS(t,a){var e=document.createElementNS('http://www.w3.org/2000/svg',t);for(var k in a)e.setAttribute(k,a[k]);return e;}
function grad(l){var s=Math.floor(l/30),d=l-30*s,m=Math.round((d-Math.floor(d))*60),dd=Math.floor(d);
 if(m===60){m=0;dd+=1;} return dd+'° '+SIGNS[s]+' '+('0'+m).slice(-2)+"'";}

function aspekte(A,B,zweiCharts){
  var out=[], ka=Object.keys(A).filter(function(k){return ORB[k] && !(zweiCharts && (k==='ASC'||k==='MC'));});
  var kb=Object.keys(B).filter(function(k){return ORB[k];});
  for(var i=0;i<ka.length;i++){
    for(var j=0;j<kb.length;j++){
      var a=ka[i], b=kb[j];
      if(!zweiCharts){
        if(j<=i) continue;
        if((a==='ASC'&&b==='MC')||(a==='MC'&&b==='ASC')) continue;
      }
      var sep=Math.abs(nrm(A[a]-B[b]+180)-180);
      for(var q=0;q<ASPEKTE.length;q++){
        var S=ASPEKTE[q], o=Math.abs(sep-S.w);
        var max=((ORB[a]+ORB[b])/2)*S.fak*(zweiCharts?0.6:1);
        if(o<=max){
          out.push({a:a,b:b,typ:S.n,farbe:S.f,art:S.art,orbis:o,max:max,
            staerke:(max-o)/max, gewicht:(max-o)/max*6+(PERS[a]?2:0)+(PERS[b]?2:0)});
        }
      }
    }
  }
  out.sort(function(x,y){return y.gewicht-x.gewicht;});
  return out;
}

window.AC_rad=function(opt){
  var host=opt.el; if(!host) return;
  var P=opt.chart, T=opt.transit||null;
  var zwei=!!T;
  var filter=opt.filter||'alle';
  var gewaehlt=-1;
  var asp=aspekte(zwei?T:P, P, zwei);

  function sichtbar(x){
    if(filter==='hart') return x.art==='hart';
    if(filter==='weich') return x.art==='weich';
    if(filter==='eng') return x.orbis<2;
    return true;
  }
  function zeichne(){
    var s=host.querySelector('svg');
    if(!s){ s=NS('svg',{viewBox:'0 0 460 460',role:'img','aria-label':'Chart mit Aspekten'}); host.appendChild(s); }
    s.innerHTML='';
    var C=230, basis=Math.floor(P.ASC/30)*30;
    function pos(l,r){var d=(180+(l-basis))*Math.PI/180;return [C+r*Math.cos(d),C-r*Math.sin(d)];}

    s.appendChild(NS('circle',{cx:C,cy:C,r:222,fill:'#FFFDFA',stroke:'#EBE1D2','stroke-width':1.5}));
    s.appendChild(NS('circle',{cx:C,cy:C,r:184,fill:'#FCF7EF',stroke:'#EBE1D2','stroke-width':1.5}));
    s.appendChild(NS('circle',{cx:C,cy:C,r:146,fill:'#FFFDFA',stroke:'#EBE1D2','stroke-width':1}));
    s.appendChild(NS('circle',{cx:C,cy:C,r:126,fill:'none',stroke:'#F3EADC','stroke-width':1}));

    for(var i=0;i<12;i++){
      var a=basis+i*30, p1=pos(a,184), p2=pos(a,222);
      s.appendChild(NS('line',{x1:p1[0],y1:p1[1],x2:p2[0],y2:p2[1],stroke:'#EBE1D2','stroke-width':1.2}));
      var m=pos(a+15,203), t=NS('text',{x:m[0],y:m[1]+6,'text-anchor':'middle','font-size':17,fill:'#9A7235'});
      t.textContent=GLZ[Math.floor(nrm(a)/30)]; s.appendChild(t);
      var q1=pos(a,146), q2=pos(a,184), haupt=(i%3===0);
      s.appendChild(NS('line',{x1:q1[0],y1:q1[1],x2:q2[0],y2:q2[1],stroke:haupt?'#2E3A5C':'#EBE1D2','stroke-width':haupt?1.8:1}));
      var hn=pos(a+15,163), ht=NS('text',{x:hn[0],y:hn[1]+4,'text-anchor':'middle','font-size':10,fill:'#6B6259'});
      ht.textContent=(i+1); s.appendChild(ht);
    }

    /* Aspektlinien */
    var gz=NS('g',{}); s.appendChild(gz);
    asp.forEach(function(x,idx){
      if(!sichtbar(x)) return;
      var qa=(zwei?T:P)[x.a], qb=P[x.b];
      if(qa===undefined||qb===undefined) return;
      var p1=pos(qa,126), p2=pos(qb,126);
      var aktiv=(gewaehlt===idx), blass=(gewaehlt>=0&&!aktiv);
      var dick=aktiv?4.2:Math.max(0.9,1+x.staerke*2.4);
      var l=NS('line',{x1:p1[0],y1:p1[1],x2:p2[0],y2:p2[1],stroke:x.farbe,
        'stroke-width':dick,'stroke-linecap':'round',
        'stroke-opacity':blass?0.1:(aktiv?1:0.34+x.staerke*0.42),
        'stroke-dasharray':(x.typ==='Sextil'?'5 4':'none'),
        style:'cursor:pointer;transition:stroke-width .18s,stroke-opacity .18s'});
      l.addEventListener('click',function(){ gewaehlt=(gewaehlt===idx)?-1:idx; zeichne(); text(); });
      gz.appendChild(l);
      /* unsichtbare, dickere Linie zum leichteren Treffen auf dem Handy */
      var hit=NS('line',{x1:p1[0],y1:p1[1],x2:p2[0],y2:p2[1],stroke:'transparent','stroke-width':14,style:'cursor:pointer'});
      hit.addEventListener('click',function(){ gewaehlt=(gewaehlt===idx)?-1:idx; zeichne(); text(); });
      gz.appendChild(hit);
    });

    /* Planeten */
    function punkte(Q,radius,farbe,praefix){
      var belegt=[];
      ORD.forEach(function(k){
        if(Q[k]===undefined) return;
        var l=Q[k], r=radius;
        while(belegt.some(function(b){return Math.abs(nrm(b.l-l+180)-180)<8 && Math.abs(b.r-r)<13;})) r+=17;
        belegt.push({l:l,r:r});
        var p=pos(l,r);
        var beteiligt = gewaehlt>=0 && ((praefix==='t'?asp[gewaehlt].a===k:false) || (praefix==='n'&&asp[gewaehlt].b===k) || (!zwei&&(asp[gewaehlt].a===k||asp[gewaehlt].b===k)));
        if(beteiligt) s.appendChild(NS('circle',{cx:p[0],cy:p[1],r:15,fill:'#F7EFE1',stroke:'#9A7235','stroke-width':1.5}));
        var t=NS('text',{x:p[0],y:p[1]+7,'text-anchor':'middle','font-size':19,fill:farbe,
          'fill-opacity':(gewaehlt>=0&&!beteiligt)?0.3:1});
        t.textContent=GLY[k]; s.appendChild(t);
      });
    }
    punkte(P,104,'#2E3A5C','n');
    if(zwei) punkte(T,205,'#A5462A','t');

    [['AC',P.ASC],['MC',P.MC]].forEach(function(x){
      if(x[1]===undefined) return;
      var p=pos(x[1],zwei?236:236);
      var t=NS('text',{x:p[0],y:p[1]+4,'text-anchor':'middle','font-size':11,fill:'#9A7235'});
      t.textContent=x[0]; s.appendChild(t);
    });
  }

  function text(){
    var box=opt.info; if(!box) return;
    if(gewaehlt<0){
      var h=(asp.filter(sichtbar).length)+' Aspekte' + (zwei?' zwischen Transit und Chart':'') +
        ' — tipp eine Linie an, um sie zu lesen.';
      box.innerHTML='<div class="rad-hinweis">'+h+'</div>';
      return;
    }
    var x=asp[gewaehlt];
    var d=(window.AC_ASP?AC_ASP.deutung(x.a,x.b,x.typ):null);
    var pa=(zwei?T:P)[x.a], pb=P[x.b];
    var nah = x.orbis<1?'sehr eng':(x.orbis<2?'eng':(x.orbis<3.5?'deutlich':'weit'));
    var h='<div class="rad-info">'+
      '<div class="rad-kopf"><span class="rad-punkt" style="color:'+x.farbe+'">'+
        (GLY[x.a]||x.a)+'</span>'+
        '<span class="rad-typ">'+(zwei?'Transit-':'')+x.a+' '+x.typ+' '+(zwei?'Radix-':'')+x.b+'</span>'+
        '<span class="rad-punkt" style="color:'+x.farbe+'">'+(GLY[x.b]||x.b)+'</span></div>'+
      '<div class="rad-orb">'+grad(pa)+'  ·  '+grad(pb)+'  ·  Orbis '+x.orbis.toFixed(2)+'° ('+nah+')</div>';
    if(d){
      h+='<div class="rad-thema">'+d.thema+'</div>'+
         '<p class="rad-text"><b>Was dieser Aspekt tut:</b> '+d.artText+'</p>'+
         '<p class="rad-text"><b>Bei diesem Paar:</b> '+d.text+'</p>'+
         '<p class="rad-frage">'+d.frage+'</p>'+
         '<p class="rad-mehr"><a href="aspekte-lesen.html">Alle Paare nachschlagen →</a></p>';
    } else {
      h+='<p class="rad-text">Für Achsen wie Aszendent und MC gibt es keine Paar-Deutung — hier zählt, welcher Planet die Achse berührt und in welchem Haus das liegt.</p>';
    }
    box.innerHTML=h+'</div>';
  }

  zeichne(); text();
  return {
    setFilter:function(f){ filter=f; gewaehlt=-1; zeichne(); text(); },
    aspekte:asp
  };
};
})();
