/* Astro-Charlie · Profil-System
   Alle Daten bleiben im Browser (localStorage). Nichts wird übertragen. */
(function(){
  var KEY='ac_profile_v1', ALT='ac_geburt';

  function leer(){ return {v:1, eigen:null, aktiv:null, zeigeNamen:false, liste:[]}; }
  function lade(){
    var d;
    try{ d=JSON.parse(localStorage.getItem(KEY)||'null'); }catch(e){ d=null; }
    if(!d||!d.liste) d=leer();
    /* Einmalige Übernahme aus der alten Einzelspeicherung */
    if(!d.liste.length){
      try{
        var g=JSON.parse(localStorage.getItem(ALT)||'null');
        if(g && g.y){
          var p=neu({name:g.name||'Ich', y:g.y, mo:g.mo, d:g.d, h:g.h, mi:g.mi,
                     tz:g.tz, lat:g.lat, lon:g.lon, ort:g.ort||'', eigen:true});
          d.liste.push(p); d.eigen=p.id; d.aktiv=p.id;
        }
      }catch(e){}
    }
    return d;
  }
  function sichere(d){ try{ localStorage.setItem(KEY, JSON.stringify(d)); }catch(e){} }

  function id(){ return 'p'+Date.now().toString(36)+Math.random().toString(36).slice(2,6); }
  function neu(o){
    return {id:id(), name:(o.name||'').trim(), alias:(o.alias||'').trim(),
      y:o.y, mo:o.mo, d:o.d, h:o.h, mi:o.mi, tz:o.tz, tzName:o.tzName||'',
      lat:o.lat, lon:o.lon, ort:o.ort||'', notiz:o.notiz||'',
      eigen:!!o.eigen, angelegt:new Date().toISOString().slice(0,10)};
  }
  /* Anzeige-Name: Alias, sonst Initialen — der volle Name nur auf Wunsch */
  function anzeige(p, voll){
    if(voll) return p.name || p.alias || 'Ohne Namen';
    if(p.alias) return p.alias;
    var n=(p.name||'').trim();
    if(!n) return 'Ohne Namen';
    var t=n.split(/\s+/);
    if(t.length===1) return t[0].slice(0,1).toUpperCase()+'.';
    return t.map(function(x){return x.slice(0,1).toUpperCase()+'.';}).join(' ');
  }

  window.AC_P={
    lade:lade, sichere:sichere, neu:neu, anzeige:anzeige, leer:leer,

    alle:function(){ return lade().liste; },
    eigenes:function(){ var d=lade(); return d.liste.filter(function(p){return p.id===d.eigen;})[0]||null; },
    aktives:function(){ var d=lade(); return d.liste.filter(function(p){return p.id===d.aktiv;})[0]||this.eigenes(); },
    zeigeNamen:function(){ return !!lade().zeigeNamen; },

    setzeNamenSichtbar:function(b){ var d=lade(); d.zeigeNamen=!!b; sichere(d); },
    setzeAktiv:function(pid){
      var d=lade(); d.aktiv=pid; sichere(d);
      var p=d.liste.filter(function(x){return x.id===pid;})[0];
      /* Rückwärtskompatibel: die vorhandenen Werkzeuge lesen weiterhin ac_geburt */
      if(p){ try{ localStorage.setItem('ac_geburt', JSON.stringify({
        name:p.name, y:p.y, mo:p.mo, d:p.d, h:p.h, mi:p.mi, tz:p.tz, lat:p.lat, lon:p.lon, ort:p.ort
      })); }catch(e){} }
      return p||null;
    },
    hinzu:function(o){
      var d=lade(), p=neu(o);
      if(o.eigen){ d.liste.forEach(function(x){x.eigen=false;}); d.eigen=p.id; }
      d.liste.push(p);
      if(!d.aktiv) d.aktiv=p.id;
      sichere(d); return p;
    },
    aendere:function(pid,o){
      var d=lade();
      d.liste.forEach(function(p){ if(p.id===pid){ for(var k in o) p[k]=o[k]; } });
      sichere(d);
    },
    loesche:function(pid){
      var d=lade();
      d.liste=d.liste.filter(function(p){return p.id!==pid;});
      if(d.eigen===pid) d.eigen=null;
      if(d.aktiv===pid) d.aktiv=d.eigen||(d.liste[0]?d.liste[0].id:null);
      sichere(d);
    },
    alsEigenes:function(pid){
      var d=lade();
      d.liste.forEach(function(p){ p.eigen=(p.id===pid); });
      d.eigen=pid; sichere(d);
    },
    exportieren:function(){
      var d=lade();
      var blob=new Blob([JSON.stringify(d,null,2)],{type:'application/json'});
      var a=document.createElement('a');
      a.href=URL.createObjectURL(blob);
      a.download='astro-charlie-profile-'+new Date().toISOString().slice(0,10)+'.json';
      document.body.appendChild(a); a.click();
      setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); },200);
    },
    importieren:function(text, ersetzen){
      var neuD=JSON.parse(text);
      if(!neuD||!neuD.liste) throw new Error('Keine gültige Profildatei.');
      if(ersetzen){ sichere(neuD); return neuD.liste.length; }
      var d=lade(), vorhanden={};
      d.liste.forEach(function(p){ vorhanden[p.y+'|'+p.mo+'|'+p.d+'|'+p.h+'|'+p.mi+'|'+p.lat]=true; });
      var n=0;
      neuD.liste.forEach(function(p){
        var k=p.y+'|'+p.mo+'|'+p.d+'|'+p.h+'|'+p.mi+'|'+p.lat;
        if(!vorhanden[k]){ p.id=id(); p.eigen=false; d.liste.push(p); n++; }
      });
      sichere(d); return n;
    }
  };
})();

/* Kleine Leiste, die auf jeder Werkzeugseite zeigt, mit wessen Chart gearbeitet wird */
window.AC_profilLeiste=function(){
  if(!window.AC_P) return;
  var p=AC_P.aktives(); if(!p) return;
  var voll=AC_P.zeigeNamen();
  var wrap=document.querySelector('.wrap')||document.body;
  var bar=document.createElement('div');
  bar.className='ac-profilbar';
  bar.innerHTML='<span class="ac-pb-lab">Arbeitsfl&auml;che</span>'+
    '<b>'+AC_P.anzeige(p,voll)+'</b>'+
    (p.eigen?'<span class="ac-pb-eigen">dein Profil</span>':'')+
    '<a class="ac-pb-w" href="menschen.html">wechseln</a>';
  wrap.insertBefore(bar, wrap.firstChild);
};
