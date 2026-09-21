/* Astro-Charlie · Begriffe automatisch verlinken
   Verwandelt Fachbegriffe im Fließtext in Links zur passenden Erklärung.
   Jeder Link öffnet in einem neuen Tab, damit man nicht aus dem Lesefluss fällt.
   Verlinkt wird pro Seite nur das ERSTE Vorkommen eines Begriffs — sonst wird der Text unruhig. */
(function(){
  try{ var _ich=JSON.parse(localStorage.getItem('ac_ich')||'null');
    if(_ich&&_ich.erklaerung==='nein') return; }catch(e){}
  /* Begriff → Zielseite. Längere Begriffe zuerst, damit sie vor kürzeren greifen. */
  var ZIELE=[
    ['Whole Sign','haeusersysteme.html'],
    ['Placidus','haeusersysteme.html'],
    ['Häusersystem','haeusersysteme.html'],
    ['Solar Return','solar-return-light.html'],
    ['Jahreschart','solar-return-light.html'],
    ['Profektion','profektionen.html'],
    ['Synastrie','synastrie.html'],
    ['Astrokartographie','astrokartographie.html'],
    ['Mondknoten','mondknoten.html'],
    ['Nordknoten','mondknoten.html'],
    ['Südknoten','mondknoten.html'],
    ['Aszendent','achsen.html'],
    ['Deszendent','achsen.html'],
    ['Medium Coeli','achsen.html'],
    ['Imum Coeli','achsen.html'],
    ['Herrscher','herrscher.html'],
    ['Dispositor','herrscher.html'],
    ['Orbis','orbis-gewichtung.html'],
    ['Konjunktion','aspekte-lesen.html'],
    ['Opposition','aspekte-lesen.html'],
    ['Quadrat','aspekte-lesen.html'],
    ['Trigon','aspekte-lesen.html'],
    ['Sextil','aspekte-lesen.html'],
    ['Aspektmuster','aspekt-muster.html'],
    ['T-Quadrat','aspekt-muster.html'],
    ['Großes Trigon','aspekt-muster.html'],
    ['Stellium','aspekt-muster.html'],
    ['Aspekte','aspekte-lesen.html'],
    ['Aspekt','aspekte-lesen.html'],
    ['Finsternis','finsternisse.html'],
    ['Sonnenfinsternis','finsternisse.html'],
    ['Mondfinsternis','finsternisse.html'],
    ['Lunation','lunationen.html'],
    ['Neumond','lunationen.html'],
    ['Vollmond','lunationen.html'],
    ['rückläufig','retrograde.html'],
    ['Rückläufigkeit','retrograde.html'],
    ['stationär','retrograde.html'],
    ['Transit','timing.html'],
    ['Radix','chart-lesen.html'],
    ['Geburtschart','chart-lesen.html'],
    ['Chiron','kleine-punkte.html'],
    ['Lilith','lilith-arbeit.html'],
    ['Glückspunkt','kleine-punkte.html'],
    ['Vertex','kleine-punkte.html'],
    ['Juno','kleine-punkte.html'],
    ['Element','element-mix.html'],
    ['kardinal','zeichen.html'],
    ['veränderlich','zeichen.html'],
    ['Sonne','planet-sonne.html'],
    ['Mond','planet-mond.html'],
    ['Merkur','planet-merkur.html'],
    ['Venus','planet-venus.html'],
    ['Mars','planet-mars.html'],
    ['Jupiter','planet-jupiter.html'],
    ['Saturn','planet-saturn.html'],
    ['Uranus','planeten.html'],
    ['Neptun','planeten.html'],
    ['Pluto','planeten.html'],
    ['Häuser','haeuser.html'],
    ['Haus','haeuser.html'],
    ['Zeichen','zeichen.html'],
    ['Planeten','planeten.html']
  ];

  /* Elemente, in denen nicht verlinkt wird */
  var TABU={A:1,BUTTON:1,SELECT:1,OPTION:1,INPUT:1,TEXTAREA:1,LABEL:1,CODE:1,PRE:1,SCRIPT:1,STYLE:1,
            H1:1,SVG:1,TEXT:1,TH:1,SUMMARY:1};

  function seite(){
    var p=location.pathname.split('/').pop();
    return p||'index.html';
  }

  window.AC_begriffe=function(wurzelSelektor){
    var wurzel=document.querySelector(wurzelSelektor||'.wrap');
    if(!wurzel) return;
    var hier=seite();
    var offen={};   /* Begriff → schon verlinkt? */
    var liste=ZIELE.filter(function(z){ return z[1]!==hier; });
    if(!liste.length) return;

    var lauf=document.createTreeWalker(wurzel,NodeFilter.SHOW_TEXT,{
      acceptNode:function(n){
        if(!n.nodeValue||n.nodeValue.length<4) return NodeFilter.FILTER_REJECT;
        var e=n.parentNode;
        while(e&&e!==wurzel){
          if(TABU[e.nodeName]) return NodeFilter.FILTER_REJECT;
          if(e.classList&&(e.classList.contains('ac-leiste')||e.classList.contains('weiter')||
             e.classList.contains('ac-nav')||e.getAttribute&&e.getAttribute('data-nolink')!==null))
            return NodeFilter.FILTER_REJECT;
          e=e.parentNode;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var knoten=[],n;
    while((n=lauf.nextNode())) knoten.push(n);

    knoten.forEach(function(t){
      var txt=t.nodeValue, treffer=null, pos=-1, ziel=null;
      for(var i=0;i<liste.length;i++){
        var b=liste[i][0];
        if(offen[b]) continue;
        var re=new RegExp('(^|[^\\wäöüÄÖÜß-])('+b.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')(?![\\wäöüÄÖÜß-])');
        var m=re.exec(txt);
        if(m){
          var p=m.index+m[1].length;
          if(pos<0||p<pos){ pos=p; treffer=b; ziel=liste[i][1]; }
        }
      }
      if(!treffer) return;
      offen[treffer]=true;
      var vor=document.createTextNode(txt.slice(0,pos));
      var a=document.createElement('a');
      a.href=ziel; a.target='_blank'; a.rel='noopener';
      a.className='ac-begriff';
      a.title=treffer+' — Erklärung in neuem Tab öffnen';
      a.textContent=txt.substr(pos,treffer.length);
      var nach=document.createTextNode(txt.slice(pos+treffer.length));
      var p2=t.parentNode;
      p2.insertBefore(vor,t); p2.insertBefore(a,t); p2.insertBefore(nach,t);
      p2.removeChild(t);
    });
  };

  /* Alle bestehenden Links im Inhalt ebenfalls in neuem Tab öffnen —
     außer der Navigation und den Weiter-Knöpfen, wo Springen erwünscht ist. */
  window.AC_neueTabs=function(){
    var liste=document.querySelectorAll('.wrap a[href$=".html"]');
    Array.prototype.forEach.call(liste,function(a){
      if(a.closest('.ac-leiste')||a.closest('.weiter')||a.closest('.ac-nav')) return;
      if(a.getAttribute('target')) return;
      a.setAttribute('target','_blank');
      a.setAttribute('rel','noopener');
    });
  };

  document.addEventListener('DOMContentLoaded',function(){
    try{ AC_begriffe(); }catch(e){ console.error('Begriffe:',e); }
    try{ AC_neueTabs(); }catch(e){}
  });
})();
