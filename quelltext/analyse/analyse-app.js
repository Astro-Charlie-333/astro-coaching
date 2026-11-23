/* Astro-Charlie · Analyse — Oberfläche
   Thema wählen, Person(en) wählen, rechnen lassen, Bericht ziehen.

   Hier steht kein Satz. Die Vorlagen stehen in AN_T
   (analyse-texte.js), `anFuell` setzt ein (Aufgabe 61, aus 34
   und 38). Verriegelt ist das in `bau-analyse.py`. */
function nrm(x){x=x%360;return x<0?x+360:x;}
function el(i){ return document.getElementById(i); }
function esc(s){ return String(s===undefined||s===null?'':s).replace(/[<>&"]/g,function(c){
 return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }

var E=window.AC_ENGINE, H=E.H;
var AT=AN_T;
/* Eine Lücke füllt AC_FUELL aus kern/fuellen.js — die eine Stelle,
   an der ein fehlender Wert abbricht statt lautlos zu verschwinden
   (Aufgabe 94). Diese Anzeige baut sich keinen eigenen Füller. */
function anFuell(form,werte){ return AC_FUELL(form,werte); }
/* Eine Beschriftung, deren Form von der Zahl abhängt, wird nicht an
   die Zahl geklebt (REGELN.md 6f): Die Zahl entscheidet nur, welche
   der beiden Formen aus AT.waage genommen wird. */
function anZahl(k,n){
  var f=AT.waage[k];
  return n===1 ? f.ein : anFuell(f.viele,{n:n});
}

var themaK='paar', aId=null, bId=null, letzte=null;
/* Die gewählte Form wird je Thema gemerkt — wer bei Paaren „Geschwister"
   eingestellt hat, soll sie beim Zurückwechseln wiederfinden. */
var formen={};
function formVon(T){
  if(!T.formen||!T.formen.length) return null;
  var f=formen[T.schluessel];
  var gibts=T.formen.filter(function(x){ return x.k===f; }).length>0;
  if(!gibts){ f=T.formen[0].k; formen[T.schluessel]=f; }
  return f;
}

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
      (t.regeln.length<10?AT.aufbau:'')+'</button>'; }).join('');
  Array.prototype.forEach.call(el('anthema').querySelectorAll('.th'),function(b){
    b.addEventListener('click',function(){ themaK=b.getAttribute('data-t');
      themaBauen(); personenBauen(); rechnen(); });
  });
}

function personenBauen(){
  var T=thema(), l=alle(), zwei=(T.modus==='paar'||T.modus==='beides');
  if(!l.length){ el('antpersonen').innerHTML=
    '<p class="an-leer">'+AT.keinProfil+'</p>';
    return; }
  if(!aId) aId=(l.filter(function(p){return p.eigen;})[0]||l[0]).id;
  if(zwei && !bId){ var and=l.filter(function(p){return p.id!==aId;})[0]; bId=and?and.id:null; }
  if(!zwei) bId=null;

  function reihe(welche, akt, lab){
    return '<div class="an-zeile"><span class="lab">'+lab+'</span><div class="an-knoepfe">'+
      l.map(function(p){
        return '<button type="button" class="pb'+(p.id===akt?' ist':'')+'" data-w="'+welche+
          '" data-id="'+p.id+'">'+esc(nameVon(p))+(p.eigen?AT.ichMarke:'')+'</button>'; }).join('')+
      '</div></div>';
  }
  var h=reihe('a', aId, T.modus==='solo'?AT.werEins:AT.werErste);
  if(zwei) h+=reihe('b', bId, AT.werZweite);
  if(T.formen&&T.formen.length){
    var f0=formVon(T);
    h+='<div class="an-zeile"><span class="lab">'+esc(T.formLabel||AT.formLabel)+'</span>'+
      '<div class="an-knoepfe">'+
      T.formen.map(function(f){
        return '<button type="button" class="fb'+(f.k===f0?' ist':'')+'" data-f="'+f.k+
          '" title="'+esc(f.t)+'">'+esc(f.n)+'</button>'; }).join('')+'</div>'+
      '<p class="an-hint">'+esc((T.formen.filter(function(x){return x.k===f0;})[0]||{}).t||'')+
      '</p></div>';
  }
  el('antpersonen').innerHTML=h;
  Array.prototype.forEach.call(el('antpersonen').querySelectorAll('.pb'),function(b){
    b.addEventListener('click',function(){
      var w=b.getAttribute('data-w'), id=b.getAttribute('data-id');
      if(w==='a'){ if(id===bId) bId=aId; aId=id; } else { if(id===aId) aId=bId; bId=id; }
      personenBauen(); rechnen(); });
  });
  Array.prototype.forEach.call(el('antpersonen').querySelectorAll('.fb'),function(b){
    b.addEventListener('click',function(){ formen[themaK]=b.getAttribute('data-f');
      personenBauen(); rechnen(); });
  });
}

/* ── Rechnen ──────────────────────────────────────────────────
   Welche Arten von Befund es gibt und in welcher Reihenfolge sie
   stehen, ist Gerüst und steht hier. Wie sie heißen, steht in
   AT.art. */
var ARTEN=['bild','nenner','staerke','reibung','aufgabe','beratung'];

function rechnen(){
  var T=thema(), pa=pVon(aId), pb=bId?pVon(bId):null;
  if(!pa){ el('anergebnis').innerHTML=''; el('anbefunde').innerHTML=''; return; }
  if((T.modus==='paar') && !pb){
    el('anergebnis').innerHTML='<div class="an-hinweis">'+AT.zweiProfile+'</div>';
    el('anbefunde').innerHTML=''; el('anwerk').hidden=true; return; }

  var A=chartVon(pa), B=pb?chartVon(pb):null;
  var f=formVon(T);
  var fObj=f?(T.formen.filter(function(x){return x.k===f;})[0]||null):null;
  var N={a:nameVon(pa), b:pb?nameVon(pb):'',
         form:f, formName:fObj?fObj.n:'', formText:fObj?fObj.t:'',
         felder:(T.felder&&f&&T.felder[f])||T.felder||[]};
  var r=E.lauf(T.regeln, A, B, N);
  var g=E.gruppen(r.treffer, T.grenzen||{});
  var erg=T.ergebnis?T.ergebnis(r.treffer, A, B, H, N):null;
  letzte={T:T, N:N, g:g, erg:erg, treffer:r.treffer, fehler:r.fehler};

  /* Ergebnis */
  var h='';
  if(erg){
    h='<div class="an-erg '+erg.stufe+'">'+
      '<div class="k">'+AT.ergebnisLabel+'</div>'+
      '<div class="gr">'+esc(erg.titel)+'</div>'+
      '<p>'+erg.text+'</p>';
    var W=erg.waage;
    if(W){
      var ges=W.links+W.rechts||1, pl=H.prozent(W.links/ges), pr=100-pl;
      /* Die Rechnung liefert den Schlüssel und die Zahl, die Sprache
         kommt aus AT.waage — nichts wird zusammengeklebt. */
      var llab=anZahl(W.lk, W.ln), rlab=anZahl(W.rk, W.rn);
      h+='<div class="an-waage" role="img" aria-label="'+
        esc(anFuell(AT.waageBild,{pl:pl, pr:pr, llab:llab, rlab:rlab}))+'">'+
        '<div class="w-bar"><i class="n" style="width:'+pl+'%"></i>'+
        '<i class="r" style="width:'+pr+'%"></i></div>'+
        '<div class="w-l"><span><b>'+esc(llab)+'</b></span>'+
        '<span><b>'+esc(rlab)+'</b></span></div></div>';
    }
    h+='</div>';
  }
  el('anergebnis').innerHTML=h;

  /* Befunde */
  var b='';
  ARTEN.forEach(function(k){
    var liste=g[k]; if(!liste||!liste.length) return;
    var a=AT.art[k];
    b+='<section class="an-gruppe '+k+'"><h2>'+esc(a.n)+'<span>'+esc(a.u)+'</span></h2>';
    liste.forEach(function(t){
      b+='<article class="an-b"><h3>'+esc(t.titel)+'</h3>'+
        '<p>'+t.text+'</p>'+
        (t.ansatz?'<div class="an-ansatz"><b>'+AT.ansatzLabel+'</b>'+t.ansatz+'</div>':'')+
        (t.tun?'<div class="an-tun"><b>'+AT.tunLabel+'</b>'+t.tun+'</div>':'')+
        (t.beleg?'<div class="an-beleg ac-tech">'+esc(t.beleg)+'</div>':'')+
        '</article>';
    });
    b+='</section>';
  });
  if(!b) b='<p class="an-leer">'+AT.keineRegel+'</p>';
  el('anbefunde').innerHTML=b;
  el('anwerk').hidden=false;
  el('anzahl').textContent=r.treffer.length;
  if(r.fehler.length) el('anfehler').textContent=
    anFuell(AT.regelfehler,{liste:r.fehler.join(AT.regelTrenner)});
  if(window.AC_NIV&&window.AC_NIV.anwenden) try{ window.AC_NIV.anwenden(); }catch(e){}
}

/* ── Bericht ──────────────────────────────────────────────── */
function berichtText(){
  if(!letzte) return '';
  var L=letzte, z=[];
  /* Der Themenname, wie ihn thema-*.js nennt. */
  var thn=L.T.n.toUpperCase();
  z.push((L.N.b ? anFuell(AT.berichtKopfZwei,{thema:thn, a:L.N.a, b:L.N.b})
                : anFuell(AT.berichtKopfEins,{thema:thn, a:L.N.a}))+
    (L.N.formName?anFuell(AT.berichtForm,{form:L.N.formName}):''));
  z.push(new Date().toLocaleDateString('de-DE',{day:'2-digit',month:'long',year:'numeric'}));
  z.push('');
  if(L.erg){ z.push(anFuell(AT.berichtErgebnis,{titel:L.erg.titel}));
    z.push(L.erg.text.replace(/<[^>]+>/g,'')); z.push(''); }
  ARTEN.forEach(function(k){
    var liste=L.g[k]; if(!liste||!liste.length) return;
    z.push(anFuell(AT.berichtTrenner,{n:AT.art[k].n.toUpperCase()}));
    liste.forEach(function(t){
      z.push('');
      z.push(t.titel);
      z.push(t.text.replace(/<[^>]+>/g,''));
      if(t.ansatz) z.push(anFuell(AT.berichtAnsatz,{text:t.ansatz.replace(/<[^>]+>/g,'')}));
      if(t.tun)    z.push(anFuell(AT.berichtTun,{text:t.tun.replace(/<[^>]+>/g,'')}));
      if(t.beleg)  z.push(anFuell(AT.berichtBeleg,{beleg:t.beleg}));
    });
    z.push('');
  });
  z.push(AT.berichtFuss);
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
      navigator.clipboard.writeText(t).then(function(){ echo(AT.kopiert); },
        function(){ echo(AT.kopieFehler); });
    } else echo(AT.kopieNichts);
  });
  el('andruck').addEventListener('click',function(){ window.print(); });
})();
