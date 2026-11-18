/* Die Räume-Übersicht nach dem Chart sortiert (18.11.).
   Jeder Raum bekommt die Summe seiner zwei lautesten Facetten; der
   lauteste Raum ist 100. Dazu steht auf der Karte, welche Facette bei
   dir am lautesten ist. Texte stehen in RS_T, nicht im Ablauf. */
var RS_T={
  lautest:'Bei dir am lautesten: ',
  zuerst:'Für dich zuerst',
  kopf:'Sortiert nach deinem Bild',
  kopfZu:'Oben steht, was bei dir am meisten Gewicht hat. Unten, was du getrost später aufmachen kannst.',
  leise:'eher leise bei dir'
};
(function(){
  function los(){
    if(!window.AC_RAUM || !window.AC_P) return setTimeout(los, 30);
    var p=null; try{ p=AC_P.aktives(); }catch(e){}
    if(!p) return;
    var P; try{ P=AC_RAUM.chart(p); }catch(e){ return; }
    var werte=[];
    Object.keys(RS_ANKER).forEach(function(k){
      var def={facetten:RS_ANKER[k].f.map(function(f){ return {name:f.n, anker:f.a}; })};
      var res=[]; try{ res=AC_RAUM.auswerten(P, def); }catch(e){}
      if(!res.length) return;
      werte.push({k:k, s:res[0].s+(res[1]?res[1].s*0.6:0), top:res[0].fc.name});
    });
    if(!werte.length) return;
    werte.sort(function(a,b){ return b.s-a.s; });
    var max=werte[0].s||1;
    var gitter=document.querySelector('.rl-gitter'); if(!gitter) return;
    werte.forEach(function(w,i){
      var karte=document.querySelector('a.rk[href="raum-'+w.k+'.html"]'); if(!karte) return;
      var rel=Math.round(w.s/max*100);
      var alt=karte.querySelector('.rk-du'); if(alt) alt.remove();
      var du=document.createElement('div'); du.className='rk-du';
      var b=document.createElement('span'); b.className='rk-balken';
      var f=document.createElement('i'); f.style.width=Math.max(6,rel)+'%'; b.appendChild(f);
      var z=document.createElement('span'); z.className='rk-zeile';
      z.textContent=rel<45 ? RS_T.leise : RS_T.lautest+w.top;
      du.appendChild(b); du.appendChild(z);
      karte.appendChild(du);
      karte.classList.toggle('rk-zuerst', i<3);
      karte.classList.toggle('rk-leise', rel<45);
      var m=karte.querySelector('.rk-marke');
      if(m){ if(i<3){ m.textContent=RS_T.zuerst; m.hidden=false; } else m.hidden=true; }
      gitter.appendChild(karte);
    });
    var k=document.getElementById('rlkopf');
    if(k){ k.hidden=false;
      k.querySelector('b').textContent=RS_T.kopf;
      k.querySelector('span').textContent=RS_T.kopfZu; }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', los);
  else los();
})();
