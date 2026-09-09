/* Astro-Charlie · Fortschritt und Beobachtungen
   Alles im Browser. Keine Streaks, keine Strafen — nur Zähler, die wachsen können. */
(function(){
  var KEY='ac_weg_v1';

  function leer(){ return {v:1, stufen:{}, beob:[], gesehen:{} }; }
  function lade(){
    try{ var d=JSON.parse(localStorage.getItem(KEY)||'null'); return (d&&d.beob)?d:leer(); }
    catch(e){ return leer(); }
  }
  function sichere(d){ try{ localStorage.setItem(KEY,JSON.stringify(d)); }catch(e){} }
  function heute(){ return new Date().toISOString().slice(0,10); }

  window.AC_WEG={
    lade:lade,
    /* ── Stufen ── */
    stufeFertig:function(n){ var d=lade(); return !!d.stufen[n]; },
    stufeSetzen:function(n){
      var d=lade();
      if(!d.stufen[n]) d.stufen[n]={datum:heute()};
      sichere(d); return d.stufen[n];
    },
    stufeOeffnen:function(n){ var d=lade(); delete d.stufen[n]; sichere(d); },
    hoechsteStufe:function(){
      var d=lade(), h=0;
      for(var i=1;i<=5;i++){ if(d.stufen[i]) h=i; }
      return h;
    },
    /* ── Beobachtungen ── */
    beobachtungen:function(){ return lade().beob; },
    heuteNotiert:function(schluessel){
      return lade().beob.some(function(b){ return b.datum===heute() && b.schluessel===schluessel; });
    },
    notieren:function(o){
      var d=lade();
      d.beob.push({
        id:'b'+Date.now().toString(36),
        datum:heute(),
        schluessel:o.schluessel||'',
        titel:o.titel||'',
        planet:o.planet||'',
        punkt:o.punkt||'',
        art:o.art||'',
        antwort:o.antwort||'',
        chips:o.chips||[],
        notiz:(o.notiz||'').slice(0,600)
      });
      sichere(d);
      return d.beob.length;
    },
    loeschen:function(id){
      var d=lade(); d.beob=d.beob.filter(function(b){return b.id!==id;}); sichere(d);
    },
    /* ── Auswertung: welche Planeten zeigen sich bei dir tatsächlich? ── */
    trefferquote:function(){
      var b=lade().beob.filter(function(x){return x.planet && x.antwort;});
      var m={};
      b.forEach(function(x){
        var e=m[x.planet]=m[x.planet]||{ja:0,teils:0,nein:0,unklar:0,n:0};
        e.n++;
        if(x.antwort==='ja') e.ja++;
        else if(x.antwort==='teils') e.teils++;
        else if(x.antwort==='nein') e.nein++;
        else e.unklar++;
      });
      return Object.keys(m).map(function(p){
        var e=m[p], gewertet=e.ja+e.teils+e.nein;
        return {planet:p, n:e.n, ja:e.ja, teils:e.teils, nein:e.nein, unklar:e.unklar,
                quote: gewertet? Math.round((e.ja+e.teils*0.5)/gewertet*100) : null};
      }).sort(function(a,b2){return b2.n-a.n;});
    },
    haeufigsteChips:function(){
      var z={};
      lade().beob.forEach(function(b){ (b.chips||[]).forEach(function(c){ z[c]=(z[c]||0)+1; }); });
      return Object.keys(z).map(function(c){return {chip:c,n:z[c]};}).sort(function(a,b2){return b2.n-a.n;});
    },
    /* ── Export ── */
    exportieren:function(){
      var d=lade();
      var blob=new Blob([JSON.stringify(d,null,2)],{type:'application/json'});
      var a=document.createElement('a');
      a.href=URL.createObjectURL(blob);
      a.download='astro-charlie-weg-'+heute()+'.json';
      document.body.appendChild(a); a.click();
      setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},200);
    }
  };

  /* ── Affirmationen, aus dem Chart abgeleitet ── */
  var AFF_HAUS=[
   'Du darfst Platz einnehmen, ohne dich zu erklären.',
   'Dir zu nehmen, was dir zusteht, ist nicht zu viel.',
   'Was du denkst, darf gesagt werden.',
   'Du darfst ankommen, auch wenn du es nicht gewohnt bist.',
   'Was aus dir herauswill, muss nicht gut sein, um zu zählen.',
   'Dein Körper meldet sich früh genug — du darfst hinhören.',
   'Nähe zu brauchen ist keine Schwäche.',
   'Du darfst tief gehen, ohne dich zu verlieren.',
   'Du darfst etwas glauben, ohne es zu beweisen.',
   'Du darfst wollen, dass man dich sieht.',
   'Du darfst dazugehören, ohne dich anzupassen.',
   'Du darfst dich zurückziehen, ohne dich zu rechtfertigen.'];
  var AFF_PLANET={
   Sonne:'Sichtbar zu sein kostet dich Kraft — und gibt dir welche zurück.',
   Mond:'Was du brauchst, ist nicht verhandelbar.',
   Merkur:'Du darfst denken, bevor du antwortest.',
   Venus:'Du darfst genießen, ohne es dir zu verdienen.',
   Mars:'Wütend sein heißt nicht, unfair zu sein.',
   Jupiter:'Es darf auch mal leicht gehen.',
   Saturn:'Langsam heißt bei dir nicht falsch.',
   Uranus:'Anders zu sein ist kein Fehler im System.',
   Neptun:'Nicht alles muss klar sein, um wahr zu sein.',
   Pluto:'Du überlebst mehr, als du dir zutraust.'};

  window.AC_affirmation=function(P, lilithHaus){
    var t=[];
    if(typeof lilithHaus==='number' && AFF_HAUS[lilithHaus]) t.push(AFF_HAUS[lilithHaus]);
    if(P){
      /* der Planet mit dem engsten harten Aspekt zu Sonne oder Mond */
      var ORB={Sonne:8,Mond:8,Merkur:6,Venus:6,Mars:6,Jupiter:5,Saturn:5,Uranus:4,Neptun:4,Pluto:4};
      var best=null;
      ['Sonne','Mond'].forEach(function(a){
        if(P[a]===undefined) return;
        Object.keys(P).forEach(function(b){
          if(b===a||!ORB[b]||b==='Sonne'||b==='Mond') return;
          var s=Math.abs(((P[a]-P[b]+180)%360+360)%360-180);
          [90,180].forEach(function(w){
            var o=Math.abs(s-w);
            if(o<=5 && (!best||o<best.o)) best={p:b,o:o};
          });
        });
      });
      if(best && AFF_PLANET[best.p]) t.push(AFF_PLANET[best.p]);
    }
    if(!t.length) t.push('Du musst heute nichts verstehen. Anschauen reicht.');
    return t[Math.floor(Math.random()*t.length)];
  };
})();
