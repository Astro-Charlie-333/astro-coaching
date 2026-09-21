/* Astro-Charlie · Chart-Rad
   Gradskala, Zeichenring mit Elementfarben, Häuserring, Planeten mit Gradangabe
   und Rückläufigkeit, anklickbare Aspektlinien. Radix, Solar Return und Transite. */
(function(){
var SIGNS=['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische'];
var GLZ=['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
var GLY={Sonne:'☉',Mond:'☽',Merkur:'☿',Venus:'♀',Mars:'♂',Jupiter:'♃',Saturn:'♄',
 Uranus:'♅',Neptun:'♆',Pluto:'♇',ASC:'AC',MC:'MC',Lilith:'⚸',Chiron:'⚷',Knoten:'☊'};
var ORD=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];
var EXTRA=['Chiron','Lilith'];
var ORB={Sonne:8,Mond:8,ASC:6,MC:6,Merkur:6,Venus:6,Mars:6,Jupiter:5,Saturn:5,Uranus:4,Neptun:4,Pluto:4};
var PERS={Sonne:1,Mond:1,ASC:1,MC:1,Merkur:1,Venus:1,Mars:1};
var ELFARBE=['#F6E6DE','#EDEFE3','#E9EEF3','#E9E6F0'];
var ELRAND =['#DCC3B6','#D3D8C2','#C8D6E2','#CFC8DC'];
var ASPEKTE=[
 {w:0,  n:'Konjunktion', f:'#9A7235', fak:1,   art:'neutral', strich:'none'},
 {w:60, n:'Sextil',      f:'#3E6B8A', fak:0.5, art:'weich',   strich:'5 4'},
 {w:90, n:'Quadrat',     f:'#A5462A', fak:0.8, art:'hart',    strich:'none'},
 {w:120,n:'Trigon',      f:'#3E6B8A', fak:0.8, art:'weich',   strich:'none'},
 {w:180,n:'Opposition',  f:'#A5462A', fak:1,   art:'hart',    strich:'none'}
];
function nrm(x){x=x%360;return x<0?x+360:x;}
function NS(t,a){var e=document.createElementNS('http://www.w3.org/2000/svg',t);for(var k in a)e.setAttribute(k,a[k]);return e;}
function grad(l){var s=Math.floor(l/30),d=l-30*s,m=Math.round((d-Math.floor(d))*60),dd=Math.floor(d);
 if(m===60){m=0;dd+=1;} return dd+'° '+SIGNS[s]+' '+('0'+m).slice(-2)+"'";}
function kurzGrad(l){var d=l%30,m=Math.round((d-Math.floor(d))*60),dd=Math.floor(d);
 if(m===60){m=0;dd+=1;} return dd+'°'+('0'+m).slice(-2);}

function rueck(k,jd){
  if(!jd||k==='Sonne'||k==='Mond'||k==='ASC'||k==='MC'||k==='Lilith') return false;
  try{
    var f=(k==='Chiron')?window.chironLon:function(T){return geo(k,T);};
    if(!f) return false;
    var a=f((jd-1-2451545)/36525), b=f((jd+1-2451545)/36525);
    if(a===null||b===null) return false;
    return nrm(b-a)>180;
  }catch(e){ return false; }
}

function aspekte(A,B,zwei){
  var out=[], ka=Object.keys(A).filter(function(k){return ORB[k]&&!(zwei&&(k==='ASC'||k==='MC'));});
  var kb=Object.keys(B).filter(function(k){return ORB[k];});
  for(var i=0;i<ka.length;i++)for(var j=0;j<kb.length;j++){
    var a=ka[i],b=kb[j];
    if(!zwei){ if(kb.indexOf(a)>=j) continue; if((a==='ASC'&&b==='MC')||(a==='MC'&&b==='ASC')) continue; }
    var sep=Math.abs(nrm(A[a]-B[b]+180)-180);
    for(var q=0;q<ASPEKTE.length;q++){
      var S=ASPEKTE[q], o=Math.abs(sep-S.w);
      var max=((ORB[a]+ORB[b])/2)*S.fak*(zwei?0.6:1);
      if(o<=max) out.push({a:a,b:b,typ:S.n,farbe:S.f,art:S.art,strich:S.strich,orbis:o,
        staerke:(max-o)/max, gewicht:(max-o)/max*6+(PERS[a]?2:0)+(PERS[b]?2:0)});
    }
  }
  out.sort(function(x,y){return y.gewicht-x.gewicht;});
  return out;
}

function verteilen(liste, minAbstand){
  var s=liste.slice().sort(function(a,b){return a.l-b.l;});
  for(var runde=0;runde<60;runde++){
    var kollision=false;
    for(var i=0;i<s.length;i++){
      var j=(i+1)%s.length;
      var d=nrm(s[j].z-s[i].z);
      if(d<minAbstand){
        kollision=true;
        var schub=(minAbstand-d)/2;
        s[i].z=nrm(s[i].z-schub); s[j].z=nrm(s[j].z+schub);
      }
    }
    if(!kollision) break;
  }
  return s;
}

window.AC_rad=function(opt){
  var host=opt.el; if(!host) return;
  var P=opt.chart, T=opt.transit||null, zwei=!!T;
  var filter=opt.filter||'alle', gewaehlt=-1;
  var asp=aspekte(zwei?T:P, P, zwei);
  var jd=P._jd||null;

  function sichtbar(x){
    if(filter==='hart') return x.art==='hart';
    if(filter==='weich') return x.art==='weich';
    if(filter==='eng') return x.orbis<2;
    if(filter==='keine') return false;
    return true;
  }

  function zeichne(){
    var s=host.querySelector('svg');
    if(!s){ s=NS('svg',{viewBox:'0 0 620 620',role:'img','aria-label':'Chart'}); host.appendChild(s); }
    s.innerHTML='';
    var C=310, basis=Math.floor(P.ASC/30)*30;
    function pos(l,r){var d=(180+(l-basis))*Math.PI/180;return [C+r*Math.cos(d),C-r*Math.sin(d)];}
    var R_AUS=272, R_ZEICH=236, R_TICK=226, R_HAUS=190, R_INNEN=162;
    var R_PL=178, R_PLT=256;

    s.appendChild(NS('circle',{cx:C,cy:C,r:R_AUS,fill:'#FFFDFA',stroke:'#D9CDBC','stroke-width':1.2}));
    s.appendChild(NS('circle',{cx:C,cy:C,r:R_ZEICH,fill:'none',stroke:'#D9CDBC','stroke-width':1.2}));
    s.appendChild(NS('circle',{cx:C,cy:C,r:R_TICK,fill:'none',stroke:'#EBE1D2','stroke-width':.8}));
    s.appendChild(NS('circle',{cx:C,cy:C,r:R_HAUS,fill:'none',stroke:'#D9CDBC','stroke-width':1.2}));
    s.appendChild(NS('circle',{cx:C,cy:C,r:R_INNEN,fill:'#FCF9F4',stroke:'#EBE1D2','stroke-width':1}));

    for(var i=0;i<12;i++){
      var a0=basis+i*30, a1=a0+30, zi=Math.floor(nrm(a0)/30);
      var p1=pos(a0,R_ZEICH), p2=pos(a0,R_AUS), p3=pos(a1,R_AUS), p4=pos(a1,R_ZEICH);
      var d='M'+p1[0]+','+p1[1]+' L'+p2[0]+','+p2[1]+
            ' A'+R_AUS+','+R_AUS+' 0 0 0 '+p3[0]+','+p3[1]+
            ' L'+p4[0]+','+p4[1]+' A'+R_ZEICH+','+R_ZEICH+' 0 0 1 '+p1[0]+','+p1[1]+' Z';
      s.appendChild(NS('path',{d:d,fill:ELFARBE[zi%4],stroke:ELRAND[zi%4],'stroke-width':.7}));
      var m=pos(a0+15,(R_ZEICH+R_AUS)/2);
      var t=NS('text',{x:m[0],y:m[1]+7,'text-anchor':'middle','font-size':20,fill:'#7A6A55'});
      t.textContent=GLZ[zi]; s.appendChild(t);
    }

    for(var g=0;g<360;g++){
      var lang=(g%10===0)?11:((g%5===0)?7:3.5);
      var q1=pos(basis+g,R_TICK), q2=pos(basis+g,R_TICK+lang);
      s.appendChild(NS('line',{x1:q1[0],y1:q1[1],x2:q2[0],y2:q2[1],
        stroke:(g%10===0?'#B9A78C':'#E0D4C2'),'stroke-width':(g%10===0?.9:.55)}));
    }

    for(var h=0;h<12;h++){
      var ah=basis+h*30;
      var r1=pos(ah,R_INNEN), r2=pos(ah,R_HAUS), haupt=(h%3===0);
      s.appendChild(NS('line',{x1:r1[0],y1:r1[1],x2:r2[0],y2:r2[1],
        stroke:haupt?'#2E3A5C':'#DDD0BC','stroke-width':haupt?1.6:.9}));
      var hm=pos(ah+15,(R_INNEN+R_HAUS)/2);
      var ht=NS('text',{x:hm[0],y:hm[1]+4,'text-anchor':'middle','font-size':11.5,fill:'#8B7E6C'});
      ht.textContent=(h+1); s.appendChild(ht);
    }

    [['ASC',P.ASC,'AC','DC'],['MC',P.MC,'MC','IC']].forEach(function(x){
      if(x[1]===undefined) return;
      var g1=pos(x[1],R_INNEN);
      s.appendChild(NS('line',{x1:C,y1:C,x2:g1[0],y2:g1[1],stroke:'#2E3A5C','stroke-width':1.2,'stroke-opacity':.28}));
      var ha=pos(x[1],R_HAUS), hb=pos(x[1],R_AUS+7);
      s.appendChild(NS('line',{x1:ha[0],y1:ha[1],x2:hb[0],y2:hb[1],stroke:'#2E3A5C','stroke-width':2}));
      var lp=pos(x[1],R_AUS+17);
      var lt=NS('text',{x:lp[0],y:lp[1]+4,'text-anchor':'middle','font-size':12,fill:'#2E3A5C','font-weight':'600'});
      lt.textContent=x[2]; s.appendChild(lt);
      var gp=pos(x[1],R_AUS+29);
      var gt=NS('text',{x:gp[0],y:gp[1]+3,'text-anchor':'middle','font-size':9.5,fill:'#8B7E6C'});
      gt.textContent=kurzGrad(x[1]); s.appendChild(gt);
      var geg=nrm(x[1]+180);
      var a2=pos(geg,R_HAUS), b2=pos(geg,R_AUS+7);
      s.appendChild(NS('line',{x1:a2[0],y1:a2[1],x2:b2[0],y2:b2[1],stroke:'#9A8B78','stroke-width':1.3}));
      var gp2=pos(geg,R_AUS+17);
      var gt2=NS('text',{x:gp2[0],y:gp2[1]+4,'text-anchor':'middle','font-size':11,fill:'#9A8B78'});
      gt2.textContent=x[3]; s.appendChild(gt2);
    });

    var gz=NS('g',{}); s.appendChild(gz);
    asp.forEach(function(x,idx){
      if(!sichtbar(x)) return;
      var qa=(zwei?T:P)[x.a], qb=P[x.b];
      if(qa===undefined||qb===undefined) return;
      var p1=pos(qa,R_INNEN-3), p2=pos(qb,R_INNEN-3);
      var aktiv=(gewaehlt===idx), blass=(gewaehlt>=0&&!aktiv);
      gz.appendChild(NS('line',{x1:p1[0],y1:p1[1],x2:p2[0],y2:p2[1],stroke:x.farbe,
        'stroke-width':aktiv?3.4:Math.max(.7,.7+x.staerke*1.8),
        'stroke-linecap':'round','stroke-dasharray':x.strich,
        'stroke-opacity':blass?.08:(aktiv?1:.22+x.staerke*.45)}));
      var hit=NS('line',{x1:p1[0],y1:p1[1],x2:p2[0],y2:p2[1],stroke:'transparent','stroke-width':14,style:'cursor:pointer'});
      hit.addEventListener('click',function(){ gewaehlt=(gewaehlt===idx)?-1:idx; zeichne(); text(); });
      gz.appendChild(hit);
    });

    function punkte(Q,radius,farbe,istTransit){
      var roh=[];
      ORD.concat(EXTRA).forEach(function(k){
        if(Q[k]===undefined||Q[k]===null) return;
        roh.push({k:k,l:Q[k],z:Q[k]});
      });
      var v=verteilen(roh,7.8);
      v.forEach(function(x){
        var pz=pos(x.z,radius);
        var pa=pos(x.l,radius+(istTransit?-12:12)), pb=pos(x.z,radius+(istTransit?-5:5));
        s.appendChild(NS('line',{x1:pa[0],y1:pa[1],x2:pb[0],y2:pb[1],stroke:'#C9BCA8','stroke-width':.7}));
        var beteiligt = gewaehlt>=0 && (asp[gewaehlt].a===x.k||asp[gewaehlt].b===x.k);
        if(beteiligt) s.appendChild(NS('circle',{cx:pz[0],cy:pz[1]-5,r:14,fill:'#F7EFE1',stroke:'#9A7235','stroke-width':1.4}));
        var t=NS('text',{x:pz[0],y:pz[1],'text-anchor':'middle','font-size':20,fill:farbe,
          'fill-opacity':(gewaehlt>=0&&!beteiligt)?.28:1});
        t.textContent=GLY[x.k]||x.k; s.appendChild(t);
        var gp=pos(x.z,radius+(istTransit?16:-17));
        var gt=NS('text',{x:gp[0],y:gp[1]+3,'text-anchor':'middle','font-size':9.5,fill:'#8B7E6C',
          'fill-opacity':(gewaehlt>=0&&!beteiligt)?.28:1});
        gt.textContent=kurzGrad(x.l)+(rueck(x.k,istTransit?null:jd)?' ℞':'');
        s.appendChild(gt);
      });
    }
    punkte(P,R_PL,'#2E3A5C',false);
    if(zwei) punkte(T,R_PLT,'#A5462A',true);
  }

  function text(){
    var box=opt.info; if(!box) return;
    if(gewaehlt<0){
      var n=asp.filter(sichtbar).length;
      box.innerHTML='<div class="rad-hinweis">'+n+' Aspekte'+(zwei?' zwischen Transit und Chart':'')+
        ' — tipp eine Linie an, um sie zu lesen.</div>';
      return;
    }
    var x=asp[gewaehlt];
    var d=(window.AC_ASP?AC_ASP.deutung(x.a,x.b,x.typ):null);
    var pa=(zwei?T:P)[x.a], pb=P[x.b];
    var nah=x.orbis<1?'sehr eng':(x.orbis<2?'eng':(x.orbis<3.5?'deutlich':'weit'));
    var h='<div class="rad-info"><div class="rad-kopf">'+
      '<span class="rad-punkt" style="color:'+x.farbe+'">'+(GLY[x.a]||x.a)+'</span>'+
      '<span class="rad-typ">'+(zwei?'Transit-':'')+x.a+' '+x.typ+' '+(zwei?'Radix-':'')+x.b+'</span>'+
      '<span class="rad-punkt" style="color:'+x.farbe+'">'+(GLY[x.b]||x.b)+'</span></div>'+
      '<div class="rad-orb">'+grad(pa)+' · '+grad(pb)+' · Orbis '+x.orbis.toFixed(2)+'° ('+nah+')</div>';
    if(d){
      h+='<div class="rad-thema">'+d.thema+'</div>'+
         '<p class="rad-text"><b>Was dieser Aspekt tut:</b> '+d.artText+'</p>'+
         '<p class="rad-text"><b>Bei diesem Paar:</b> '+d.text+'</p>'+
         '<p class="rad-frage">'+d.frage+'</p>'+
         '<p class="rad-mehr"><a href="aspekte-lesen.html" target="_blank" rel="noopener">Alle Paare nachschlagen →</a></p>';
    } else {
      h+='<p class="rad-text">Für Achsen und kleine Punkte gibt es keine Paar-Deutung — hier zählt, welcher Planet die Achse berührt und in welchem Haus das liegt.</p>';
    }
    box.innerHTML=h+'</div>';
  }

  zeichne(); text();
  return { setFilter:function(f){ filter=f; gewaehlt=-1; zeichne(); text(); }, aspekte:asp };
};
})();
