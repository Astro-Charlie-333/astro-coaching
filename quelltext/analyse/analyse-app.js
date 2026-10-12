/* Astro-Charlie · Analyse — Oberfläche
   Thema wählen, Person(en) wählen, rechnen lassen, Bericht ziehen. */
function nrm(x){x=x%360;return x<0?x+360:x;}
function el(i){ return document.getElementById(i); }
function esc(s){ return String(s===undefined||s===null?'':s).replace(/[<>&"]/g,function(c){
 return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }

var E=window.AC_ENGINE, H=E.H;
var themaK='paar', aId=null, bId=null, form='liebe', letzte=null;

function chartVon(p){
  var ut=p.h+p.mi/60-p.tz,y=p.y,mo=p.mo,d=p.d;
  if(ut<0){ut+=24;d-=1;} if(ut>=24){ut-=24;d+=1;}
  var jd=jdFromUT(y,mo,d,ut),T=(jd-2451545)/36525,a=angles(jd,p.lat,p.lon);
  var C={Sonne:sunLon(T),Mond:moonLon(T),Merkur:geo('Merkur',T),Venus:geo('Venus',T),
   Mars:geo('Mars',T),Jupiter:geo('Jupiter',T),Saturn:geo('Saturn',T),Uranus:geo('Uranus',T),
   Neptun:geo('Neptun',T),Pluto:geo('Pluto',T),ASC:a.asc,MC:a.mc,_jd:jd};
  if(typeof nodeLon==='function') C.Knoten=nrm(nodeLon(T));
  if(window.chironLon) C.Chiron=nrm(window.chironLon(T));
  return C;
}
function alle(){ try{ return AC_P.alle()||[]; }catch(e){ return []; } }
function pVon(id){ return alle().filter(function(x){return x.id===id;})[0]||null; }
function nameVon(p){ try{ return AC_P.anzeige(p,AC_P.zeigeNamen()); }catch(e){ return p.name||'?'; } }
function thema(){ return THEMEN.filter(function(t){return t.schluessel===themaK;})[0]; }

/* ── Wahl ─────────────────────────────────────────────────── */
function themaBauen(){
  el('anthema').innerHTML=THEMEN.map(function(t){
    return '<button type="button" class="th'+(t.schluessel===themaK?' ist':'')+
      '" data-t="'+t.schluessel+'"><b>'+esc(t.n)+'</b><span>'+esc(t.was)+'</span>'+
      (t.regeln.length<10?'<i>im Aufbau</i>':'')+'</button>'; }).join('');
  Array.prototype.forEach.call(el('anthema').querySelectorAll('.th'),function(b){
    b.addEventListener('click',function(){ themaK=b.getAttribute('data-t');
      themaBauen(); personenBauen(); rechnen(); });
  });
}

function personenBauen(){
  var T=thema(), l=alle(), zwei=(T.modus==='paar'||T.modus==='beides');
  if(!l.length){ el('antpersonen').innerHTML=
    '<p class="an-leer">Noch kein Profil angelegt. <a href="profile.html">Hier legst du eins an</a>.</p>';
    return; }
  if(!aId) aId=(l.filter(function(p){return p.eigen;})[0]||l[0]).id;
  if(zwei && !bId){ var and=l.filter(function(p){return p.id!==aId;})[0]; bId=and?and.id:null; }
  if(!zwei) bId=null;

  function reihe(welche, akt, lab){
    return '<div class="an-zeile"><span class="lab">'+lab+'</span><div class="an-knoepfe">'+
      l.map(function(p){
        return '<button type="button" class="pb'+(p.id===akt?' ist':'')+'" data-w="'+welche+
          '" data-id="'+p.id+'">'+esc(nameVon(p))+(p.eigen?' (ich)':'')+'</button>'; }).join('')+
      '</div></div>';
  }
  var h=reihe('a', aId, T.modus==='solo'?'Person':'Zwischen');
  if(zwei) h+=reihe('b', bId, 'und');
  if(themaK==='paar'){
    h+='<div class="an-zeile"><span class="lab">Als</span><div class="an-knoepfe">'+
      T.formen.map(function(f){
        return '<button type="button" class="fb'+(f.k===form?' ist':'')+'" data-f="'+f.k+
          '" title="'+esc(f.t)+'">'+esc(f.n)+'</button>'; }).join('')+'</div></div>';
  }
  el('antpersonen').innerHTML=h;
  Array.prototype.forEach.call(el('antpersonen').querySelectorAll('.pb'),function(b){
    b.addEventListener('click',function(){
      var w=b.getAttribute('data-w'), id=b.getAttribute('data-id');
      if(w==='a'){ if(id===bId) bId=aId; aId=id; } else { if(id===aId) aId=bId; bId=id; }
      personenBauen(); rechnen(); });
  });
  Array.prototype.forEach.call(el('antpersonen').querySelectorAll('.fb'),function(b){
    b.addEventListener('click',function(){ form=b.getAttribute('data-f'); personenBauen(); rechnen(); });
  });
}

/* ── Rechnen ──────────────────────────────────────────────── */
var ARTEN=[
 {k:'bild',     n:'Das Bild',          u:'Was für ein Fall das überhaupt ist'},
 {k:'nenner',   n:'Gemeinsame Nenner', u:'Worauf ihr euch treffen könnt — hier fängt die Arbeit an'},
 {k:'staerke',  n:'Was trägt',         u:'Die Stellen, auf die Verlass ist'},
 {k:'reibung',  n:'Wo es reibt',       u:'Jede mit einem Ansatz, der für beide gilt'},
 {k:'aufgabe',  n:'Für beide etwas zu tun', u:'Konkret, klein genug, dass es passiert'},
 {k:'beratung', n:'Für dich als Coachin', u:'Nicht zum Vorlesen — deine Vorbereitung'}
];

function rechnen(){
  var T=thema(), pa=pVon(aId), pb=bId?pVon(bId):null;
  if(!pa){ el('anergebnis').innerHTML=''; el('anbefunde').innerHTML=''; return; }
  if((T.modus==='paar') && !pb){
    el('anergebnis').innerHTML='<div class="an-hinweis">Für dieses Thema brauchst du '+
      '<b>zwei Profile</b>. <a href="profile.html">Noch eins anlegen</a> — dann rechnet es.</div>';
    el('anbefunde').innerHTML=''; el('anwerk').hidden=true; return; }

  var A=chartVon(pa), B=pb?chartVon(pb):null;
  var N={a:nameVon(pa), b:pb?nameVon(pb):''};
  var r=E.lauf(T.regeln, A, B, N);
  var g=E.gruppen(r.treffer, T.grenzen||{});
  var erg=T.ergebnis?T.ergebnis(r.treffer, A, B, H, N):null;
  letzte={T:T, N:N, g:g, erg:erg, treffer:r.treffer, fehler:r.fehler};

  /* Ergebnis */
  var h='';
  if(erg){
    h='<div class="an-erg '+erg.stufe+'">'+
      '<div class="k">Das Ergebnis</div>'+
      '<div class="gr">'+esc(erg.titel)+'</div>'+
      '<p>'+erg.text+'</p>';
    if(erg.zahl&&erg.zahl.nenner!==undefined){
      var ges=erg.zahl.nenner+erg.zahl.reibung||1;
      h+='<div class="an-waage" role="img" aria-label="'+
        H.prozent(erg.zahl.nenner/ges)+' Prozent gemeinsame Nenner, '+
        H.prozent(erg.zahl.reibung/ges)+' Prozent Reibung">'+
        '<div class="w-bar"><i class="n" style="width:'+H.prozent(erg.zahl.nenner/ges)+'%"></i>'+
        '<i class="r" style="width:'+H.prozent(erg.zahl.reibung/ges)+'%"></i></div>'+
        '<div class="w-l"><span><b>'+erg.nenner+'</b> gemeinsame Nenner</span>'+
        '<span><b>'+erg.reibung+'</b> Reibungspunkte</span></div></div>';
    }
    h+='</div>';
  }
  el('anergebnis').innerHTML=h;

  /* Befunde */
  var b='';
  ARTEN.forEach(function(a){
    var liste=g[a.k]; if(!liste||!liste.length) return;
    b+='<section class="an-gruppe '+a.k+'"><h2>'+esc(a.n)+'<span>'+esc(a.u)+'</span></h2>';
    liste.forEach(function(t){
      b+='<article class="an-b"><h3>'+esc(t.titel)+'</h3>'+
        '<p>'+t.text+'</p>'+
        (t.ansatz?'<div class="an-ansatz"><b>Ansatz</b>'+t.ansatz+'</div>':'')+
        (t.tun?'<div class="an-tun"><b>Konkret</b>'+t.tun+'</div>':'')+
        (t.beleg?'<div class="an-beleg ac-tech">'+esc(t.beleg)+'</div>':'')+
        '</article>';
    });
    b+='</section>';
  });
  if(!b) b='<p class="an-leer">Für diese Kombination hat keine Regel gegriffen. '+
    'Das kommt bei den Themen im Aufbau noch vor.</p>';
  el('anbefunde').innerHTML=b;
  el('anwerk').hidden=false;
  el('anzahl').textContent=r.treffer.length;
  if(r.fehler.length) el('anfehler').textContent='Regelfehler: '+r.fehler.join(' | ');
  if(window.AC_NIV&&window.AC_NIV.anwenden) try{ window.AC_NIV.anwenden(); }catch(e){}
}

/* ── Bericht ──────────────────────────────────────────────── */
function berichtText(){
  if(!letzte) return '';
  var L=letzte, z=[];
  z.push(L.T.n.toUpperCase()+(L.N.b?' — '+L.N.a+' und '+L.N.b:' — '+L.N.a));
  z.push(new Date().toLocaleDateString('de-DE',{day:'2-digit',month:'long',year:'numeric'}));
  z.push('');
  if(L.erg){ z.push('ERGEBNIS: '+L.erg.titel);
    z.push(L.erg.text.replace(/<[^>]+>/g,'')); z.push(''); }
  ARTEN.forEach(function(a){
    var liste=L.g[a.k]; if(!liste||!liste.length) return;
    z.push('── '+a.n.toUpperCase()+' ──');
    liste.forEach(function(t){
      z.push('');
      z.push(t.titel);
      z.push(t.text.replace(/<[^>]+>/g,''));
      if(t.ansatz) z.push('Ansatz: '+t.ansatz.replace(/<[^>]+>/g,''));
      if(t.tun)    z.push('Konkret: '+t.tun.replace(/<[^>]+>/g,''));
      if(t.beleg)  z.push('('+t.beleg+')');
    });
    z.push('');
  });
  z.push('— Astro-Charlie. Hypothesen aus einer Rechnung, gültig nur soweit die Menschen sie bestätigen.');
  return z.join('\n');
}

/* ── Start ────────────────────────────────────────────────── */
(function(){
  themaBauen(); personenBauen(); rechnen();
  el('ankopie').addEventListener('click',function(){
    var t=berichtText();
    function echo(s){ el('anecho').textContent=s;
      setTimeout(function(){ el('anecho').textContent=''; }, 2600); }
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(t).then(function(){ echo('Bericht kopiert.'); },
        function(){ echo('Kopieren ging nicht — markier den Text und nimm Strg+C.'); });
    } else echo('Dieser Browser kann nicht kopieren — markier den Text und nimm Strg+C.');
  });
  el('andruck').addEventListener('click',function(){ window.print(); });
})();
