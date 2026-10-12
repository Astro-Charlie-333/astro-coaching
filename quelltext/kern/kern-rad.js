/* Astro-Charlie · Das Rad als Bedienfläche
   ------------------------------------------------------------------
   Ein Objekt, zwei Zustände. Auf „Ich" groß: jedes Haus ist anklickbar
   und schaltet die Seite um. Auf „Heute" klein: ein äußerer Ring trägt
   die laufenden Planeten, die Häuser, die gerade besetzt sind, leuchten.

   Bewusst eigenständig neben rad.js: rad.js zeichnet Aspekte zum Lesen,
   dieses hier ist Navigation. Zwei Aufgaben, zwei Zeichnungen.          */
(function(){
'use strict';
var NSU='http://www.w3.org/2000/svg';
function nrm(x){x=x%360;return x<0?x+360:x;}
function N(t,a,kind){ var e=document.createElementNS(NSU,t);
  for(var k in a) e.setAttribute(k,a[k]);
  if(kind!==undefined) e.textContent=kind;
  return e; }

var ZGLY=['♈','♉','♊','♋','♌','♍',
          '♎','♏','♐','♑','♒','♓'];
var PGLY={Sonne:'☉',Mond:'☽',Merkur:'☿',Venus:'♀',Mars:'♂',
 Jupiter:'♃',Saturn:'♄',Uranus:'♅',Neptun:'♆',Pluto:'♇',
 Chiron:'⚷',Lilith:'⚸',ASC:'AC',MC:'MC'};
var PFOLGE=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];
/* Elementfarben wie im übrigen System */
var EFARBE=['#A05A3A','#3D6B62','#2E3A5C','#6A4A62'];

function haus(P,l){ return ((Math.floor(nrm(l)/30)-Math.floor(nrm(P.ASC)/30))%12+12)%12+1; }

/* Glyphen, die zu nah beieinander stünden, auseinanderschieben */
function spreizen(werte, mindest){
  var s=werte.map(function(w,i){ return {i:i, a:w, v:w}; });
  s.sort(function(x,y){ return x.a-y.a; });
  for(var runde=0; runde<120; runde++){
    var ruhig=true;
    for(var k=0;k<s.length;k++){
      var j=(k+1)%s.length;
      var d=nrm(s[j].v-s[k].v);
      if(d<mindest && s.length>1){
        var schub=(mindest-d)/2;
        s[k].v=nrm(s[k].v-schub); s[j].v=nrm(s[j].v+schub); ruhig=false;
      }
    }
    if(ruhig) break;
  }
  var raus=[]; s.forEach(function(x){ raus[x.i]=x.v; });
  return raus;
}

/* opt: {el, chart, transit, gross, aufHaus(n), aktiv} */
window.AC_KERNRAD=function(opt){
  var host=opt.el; if(!host||!opt.chart) return null;
  var P=opt.chart, T=opt.transit||null;
  var gross=opt.gross!==false;
  var aktiv=(opt.aktiv===undefined||opt.aktiv===null)?0:opt.aktiv;

  var C=310, SEITE=620;
  /* Außen die Transite, dann Zeichenband, dann Häuser, innen frei */
  var R_T    = gross?296:300;    /* Transitring            */
  var R_ZA   = gross?268:276;    /* Zeichenband außen      */
  var R_ZI   = gross?236:244;    /* Zeichenband innen      */
  var R_HA   = R_ZI;             /* Hausfeld außen         */
  var R_HI   = gross?150:168;    /* Hausfeld innen         */
  var R_PLT  = gross?198:208;    /* Radix-Glyphen          */

  var basis=Math.floor(nrm(P.ASC)/30)*30;
  function pos(l,r){ var w=(180+(nrm(l)-basis))*Math.PI/180;
    return [C+r*Math.cos(w), C-r*Math.sin(w)]; }
  function bogen(r,a1,a2,richtung){
    var p1=pos(a1,r), p2=pos(a2,r);
    return 'M'+p1[0].toFixed(1)+','+p1[1].toFixed(1)+
      ' A'+r+','+r+' 0 0 '+(richtung||0)+' '+p2[0].toFixed(1)+','+p2[1].toFixed(1);
  }
  function feld(rA,rI,a1,a2){
    var pA1=pos(a1,rA), pA2=pos(a2,rA), pI2=pos(a2,rI), pI1=pos(a1,rI);
    return 'M'+pA1[0].toFixed(1)+','+pA1[1].toFixed(1)+
      ' A'+rA+','+rA+' 0 0 0 '+pA2[0].toFixed(1)+','+pA2[1].toFixed(1)+
      ' L'+pI2[0].toFixed(1)+','+pI2[1].toFixed(1)+
      ' A'+rI+','+rI+' 0 0 1 '+pI1[0].toFixed(1)+','+pI1[1].toFixed(1)+' Z';
  }

  /* Welche Häuser sind gerade von laufenden Planeten besetzt */
  var heute={};
  if(T) PFOLGE.forEach(function(k){
    if(T[k]===undefined||T[k]===null) return;
    heute[haus(P,T[k])]=(heute[haus(P,T[k])]||0)+1;
  });

  var svg=null;
  function zeichnen(){
    if(!svg){
      svg=N('svg',{viewBox:'0 0 '+SEITE+' '+SEITE,role:'img',
        'aria-label':'Dein Chart als Rad'+(T?' mit den laufenden Planeten außen':'')});
      host.innerHTML=''; host.appendChild(svg);
    }
    svg.innerHTML='';
    var ascZ=Math.floor(nrm(P.ASC)/30);

    /* 1 — Hausfelder; sie sind die Bedienfläche */
    for(var i=0;i<12;i++){
      var hNr=i+1, a1=basis+i*30, a2=basis+(i+1)*30;
      var g=N('g',{class:'kr-haus'+(aktiv===hNr?' ist':'')+(heute[hNr]?' heut':''),
        'data-h':String(hNr)});
      g.appendChild(N('path',{d:feld(R_HA,R_HI,a1,a2),class:'kr-hf'}));
      var m=pos(a1+15,(R_HA+R_HI)/2);
      g.appendChild(N('text',{x:m[0].toFixed(1),y:(m[1]+6).toFixed(1),
        'text-anchor':'middle',class:'kr-hz'}, String(hNr)));
      if(opt.aufHaus){
        g.setAttribute('tabindex','0');
        g.setAttribute('role','button');
        g.setAttribute('aria-label',hNr+'. Haus');
        g.style.cursor='pointer';
        g.addEventListener('click',function(ev){
          var n=+ev.currentTarget.getAttribute('data-h'); setzen(n); opt.aufHaus(n); });
        g.addEventListener('keydown',function(ev){
          if(ev.key==='Enter'||ev.key===' '){ ev.preventDefault();
            var n=+ev.currentTarget.getAttribute('data-h'); setzen(n); opt.aufHaus(n); } });
      }
      svg.appendChild(g);
    }

    /* 2 — Zeichenband. Auf kleinem, dunklem Grund weggelassen: Es trägt dort
       nichts zur Frage bei, wo die Planeten relativ zu den Häusern stehen,
       und die Elementfarben sind für Creme gemischt. */
    if(opt.zeichenband!==false) for(var z=0;z<12;z++){
      var zi=(ascZ+z)%12, b1=basis+z*30, b2=basis+(z+1)*30;
      svg.appendChild(N('path',{d:feld(R_ZA,R_ZI,b1,b2),
        fill:EFARBE[zi%4],opacity:'.88'}));
      var zm=pos(b1+15,(R_ZA+R_ZI)/2);
      svg.appendChild(N('text',{x:zm[0].toFixed(1),y:(zm[1]+7).toFixed(1),
        'text-anchor':'middle',class:'kr-zg'}, ZGLY[zi]+'︎'));
    }

    /* 3 — Radix-Planeten */
    var vorhanden=PFOLGE.filter(function(k){ return P[k]!==undefined&&P[k]!==null; });
    var roh=vorhanden.map(function(k){ return nrm(P[k]); });
    var breit=spreizen(roh, gross?8:11);
    vorhanden.forEach(function(k,ix){
      var echt=nrm(P[k]), zeig=breit[ix];
      var a=pos(echt,R_HI), b=pos(zeig,R_PLT-13);
      svg.appendChild(N('line',{x1:a[0].toFixed(1),y1:a[1].toFixed(1),
        x2:b[0].toFixed(1),y2:b[1].toFixed(1),class:'kr-strich'}));
      var g=pos(zeig,R_PLT);
      svg.appendChild(N('text',{x:g[0].toFixed(1),y:(g[1]+7).toFixed(1),
        'text-anchor':'middle',class:'kr-pg'}, PGLY[k]));
    });

    /* 4 — Achsen */
    [['AC',P.ASC],['MC',P.MC]].forEach(function(x){
      if(x[1]===undefined) return;
      var i1=pos(x[1],R_HI), a1=pos(x[1],R_ZI);
      svg.appendChild(N('line',{x1:i1[0].toFixed(1),y1:i1[1].toFixed(1),
        x2:a1[0].toFixed(1),y2:a1[1].toFixed(1),class:'kr-achse'}));
      var l=pos(x[1],R_HI-16);
      svg.appendChild(N('text',{x:l[0].toFixed(1),y:(l[1]+4).toFixed(1),
        'text-anchor':'middle',class:'kr-al'}, x[0]));
    });

    /* 5 — Transitring außen */
    if(T){
      svg.appendChild(N('path',{d:bogen(R_T,basis+0.01,basis+180)+' '+
        bogen(R_T,basis+180,basis+359.99),class:'kr-tring'}));
      var th=PFOLGE.filter(function(k){ return T[k]!==undefined&&T[k]!==null; });
      var tb=spreizen(th.map(function(k){ return nrm(T[k]); }), 11);
      th.forEach(function(k,ix){
        var p=pos(tb[ix],R_T);
        svg.appendChild(N('circle',{cx:p[0].toFixed(1),cy:p[1].toFixed(1),r:'11',class:'kr-tk'}));
        svg.appendChild(N('text',{x:p[0].toFixed(1),y:(p[1]+5).toFixed(1),
          'text-anchor':'middle',class:'kr-tg'}, PGLY[k]));
      });
    }
  }

  function setzen(n){
    aktiv=n;
    if(!svg) return;
    Array.prototype.forEach.call(svg.querySelectorAll('.kr-haus'),function(g){
      g.classList.toggle('ist', +g.getAttribute('data-h')===n); });
  }

  zeichnen();
  return {setzen:setzen, neu:zeichnen, heute:heute,
    haus:function(l){ return haus(P,l); }};
};
})();
