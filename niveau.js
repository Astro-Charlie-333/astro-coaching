/* Astro-Charlie · Wissensstand
   Fünf Stufen. Die Wahl steuert, wie viel Fachsprache auf der Seite steht,
   welche technischen Angaben sichtbar sind und wie tief es geht.
   Für Readings kann je Profil eine eigene Stufe hinterlegt werden —
   damit ein Mensch den Text in SEINER Sprache bekommt, nicht in deiner. */
(function(){
'use strict';
var KEY='ac_niveau', PKEY='ac_niveau_profile';

var STUFEN=[
 {id:0, k:'neu',    n:'Neu',     lang:'Keine Ahnung von Astrologie',
  u:'Alles in Alltagssprache. Keine Fachbegriffe, keine Grade, keine Planetennamen — nur, worum es geht.'},
 {id:1, k:'wenig',  n:'Wenig',   lang:'Ich kenne mein Sternzeichen',
  u:'Fachbegriffe tauchen auf, werden aber jedes Mal mitübersetzt. Technische Angaben bleiben draußen.'},
 {id:2, k:'mittel', n:'Mittel',  lang:'Häuser und Aspekte sagen mir was',
  u:'Normale Fachsprache mit kurzen Einordnungen. Grade und Orbis nur, wo sie etwas ändern.'},
 {id:3, k:'viel',   n:'Viel',    lang:'Ich lese Charts',
  u:'Keine Erklärungen mehr. Volle Begriffe, Grade und Aspektdaten.'},
 {id:4, k:'pro',    n:'Pro',     lang:'Ich arbeite damit',
  u:'Alles. Orbis auf zwei Stellen, Herrscherketten, Sekte, Würden, Methodenhinweise.'}];

function lies(){
  try{ var v=parseInt(localStorage.getItem(KEY),10);
    if(v>=0&&v<=4) return v; }catch(e){}
  /* Noch nichts gewählt: aus dem Ankommen ableiten, sonst Mittel */
  try{ if(window.AC_SETUP){
    var e=AC_SETUP.erklaerung();
    if(e==='viel'||e==='immer') return 1;
    if(e==='nein') return 3;
  }}catch(e){}
  return 2;
}
function setze(n){
  n=Math.max(0,Math.min(4,n|0));
  try{ localStorage.setItem(KEY,String(n)); }catch(e){}
  anwenden();
  try{ window.dispatchEvent(new CustomEvent('ac-niveau',{detail:{stufe:n}})); }catch(e){}
}
/* Stufe eines bestimmten Menschen — für Readings, die an ihn gehen */
function profilKarte(){
  try{ return JSON.parse(localStorage.getItem(PKEY)||'{}')||{}; }catch(e){ return {}; }
}
function fuerProfil(id){
  if(!id) return lies();
  var k=profilKarte();
  return (k[id]!==undefined)?k[id]:2;
}
function profilSetzen(id,n){
  if(!id) return;
  var k=profilKarte(); k[id]=Math.max(0,Math.min(4,n|0));
  try{ localStorage.setItem(PKEY,JSON.stringify(k)); }catch(e){}
}

/* ── Was die Stufe auf einer Seite bewirkt ──────────── */
var CSS=`
.niv-leiste{display:flex;gap:10px;align-items:center;flex-wrap:wrap;background:var(--papier,#FFFDFA);
 border:1px solid var(--linie,#EBE1D2);border-radius:16px;padding:11px 14px;margin-bottom:14px;}
.niv-lab{font-family:var(--sans,system-ui);font-size:10px;letter-spacing:.13em;text-transform:uppercase;
 color:var(--messing,#9A7235);flex:none;}
.niv-knoepfe{display:flex;gap:4px;flex-wrap:wrap;}
.niv-knoepfe button{font-family:var(--sans,system-ui);font-size:13.5px;padding:7px 13px;
 border:1px solid var(--linie,#EBE1D2);background:var(--bg,#FCF7EF);color:var(--tinte,#231F1A);
 border-radius:16px;cursor:pointer;}
.niv-knoepfe button:hover{border-color:var(--nacht,#2E3A5C);}
.niv-knoepfe button[aria-pressed="true"]{background:var(--nacht,#2E3A5C);
 border-color:var(--nacht,#2E3A5C);color:#fff;}
.niv-tipp{font-size:12.5px;color:var(--leise,#6B6259);margin-left:auto;max-width:46ch;line-height:1.45;}
.niv-tipp b{color:var(--tinte,#231F1A);}
@media(max-width:620px){.niv-tipp{margin-left:0;max-width:none;}}

/* Sichtbarkeit nach Stufe: data-ab="2" erscheint ab Stufe 2, data-bis="1" nur bis Stufe 1 */
[data-ab]{display:none;}
body.niv-0 [data-ab="0"],
body.niv-1 [data-ab="0"],body.niv-1 [data-ab="1"],
body.niv-2 [data-ab="0"],body.niv-2 [data-ab="1"],body.niv-2 [data-ab="2"],
body.niv-3 [data-ab="0"],body.niv-3 [data-ab="1"],body.niv-3 [data-ab="2"],body.niv-3 [data-ab="3"],
body.niv-4 [data-ab]{display:revert;}
body.niv-2 [data-bis="1"],body.niv-2 [data-bis="0"],
body.niv-3 [data-bis="2"],body.niv-3 [data-bis="1"],body.niv-3 [data-bis="0"],
body.niv-4 [data-bis]{display:none;}
body.niv-1 [data-bis="0"]{display:none;}

/* Technische Angaben: Grade, Orbis, Rohdaten */
body.niv-0 .fa-daten,body.niv-1 .fa-daten{display:none;}
body.niv-0 .ac-tech,body.niv-1 .ac-tech{display:none;}
body.niv-0 .ac-grad,body.niv-1 .ac-grad{display:none;}
/* Coach-Material gehört niemandem unterhalb von „viel" */
body.niv-0 .fa-coach,body.niv-1 .fa-coach,body.niv-2 .fa-coach{display:none;}
/* Auf Stufe 0 bleibt auch die Begriffsverlinkung ruhig */
body.niv-0 .ac-begriff::after{content:'';}
`;

function stilEinhaengen(){
  if(document.getElementById('niv-stil')) return;
  var s=document.createElement('style'); s.id='niv-stil'; s.textContent=CSS;
  (document.head||document.documentElement).appendChild(s);
}

function anwenden(){
  var n=lies();
  var b=document.body; if(!b) return;
  for(var i=0;i<5;i++) b.classList.remove('niv-'+i);
  b.classList.add('niv-'+n);
  b.setAttribute('data-niveau', STUFEN[n].k);
  nachbearbeiten(n);
  /* alle Leisten auf der Seite mitziehen */
  Array.prototype.forEach.call(document.querySelectorAll('.niv-leiste'),function(l){
    Array.prototype.forEach.call(l.querySelectorAll('button[data-niv]'),function(bt){
      bt.setAttribute('aria-pressed', String(+bt.getAttribute('data-niv')===n));
    });
    var t=l.querySelector('.niv-tipp');
    if(t) t.innerHTML='<b>'+STUFEN[n].lang+'.</b> '+STUFEN[n].u;
  });
}

/* Bestehende Seiten anpassen, ohne sie umzuschreiben:
   Gradangaben verstecken und Aspektformeln in Alltagssprache übersetzen. */
var GRAD=/\b\d{1,2}\s*°\s*(Widder|Stier|Zwillinge|Krebs|Löwe|Jungfrau|Waage|Skorpion|Schütze|Steinbock|Wassermann|Fische)(\s*\d{1,2}['′])?/g;
var PLN='Sonne|Mond|Merkur|Venus|Mars|Jupiter|Saturn|Uranus|Neptun|Pluto|Chiron|Lilith';
var FORMEL=new RegExp('\\b('+PLN+')\\s+(Konjunktion|Sextil|Quadrat|Trigon|Opposition)\\s+('+PLN+')\\b','g');
var HAUSNR=/\b(\d{1,2})\.\s*Haus\b/g;

/* „Mars Quadrat Pluto" in der Sprache der Stufe — und zurück */
function formelText(a,typ,b,n){
  var W=window.AC_WORT;
  if(!W||n>=2) return a+' '+typ+' '+b;
  var A=W.PLANET[a], B=W.PLANET[b], T=W.ASPEKT[typ];
  if(!A||!B||!T) return a+' '+typ+' '+b;
  var gr=function(s){ return s.charAt(0).toUpperCase()+s.slice(1); };
  if(n===0) return gr(A.kurz(0))+' und '+B.kurz(0)+' '+T.kurz(0);
  return gr(A.kurz(1))+' und '+B.kurz(1)+' ('+typ+')';
}
function hausText(h,n){
  var W=window.AC_WORT;
  if(!W||n>=1||!W.HAUS[h-1]) return h+'. Haus';
  return 'der Bereich '+W.HAUS[h-1].kurz;
}

function nachbearbeiten(n){
  var wrap=document.querySelector('.wrap')||document.body;
  if(!wrap) return;
  /* Einmal pro Seite: Grade einpacken, damit CSS sie ein- und ausblenden kann */
  if(!wrap.getAttribute('data-niv-grade')){
    wrap.setAttribute('data-niv-grade','1');
    var lauf=document.createTreeWalker(wrap,NodeFilter.SHOW_TEXT,{
      acceptNode:function(t){
        if(!t.nodeValue||t.nodeValue.indexOf('°')<0) return NodeFilter.FILTER_REJECT;
        var p=t.parentNode;
        if(!p||/^(SCRIPT|STYLE|TEXTAREA|OPTION)$/.test(p.nodeName)) return NodeFilter.FILTER_REJECT;
        if(p.closest&&p.closest('.ac-grad,.niv-leiste,svg')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }});
    var treffer=[], t;
    while((t=lauf.nextNode())) if(GRAD.test(t.nodeValue)){ GRAD.lastIndex=0; treffer.push(t); }
    treffer.slice(0,400).forEach(function(k){
      var h=k.nodeValue.replace(GRAD,function(m){ return '<span class="ac-grad">'+m+'</span>'; });
      if(h===k.nodeValue) return;
      var s=document.createElement('span'); s.innerHTML=h;
      k.parentNode.replaceChild(s,k);
    });
  }
  /* Einmal pro Seite: Aspektformeln und Hausnummern einpacken, damit sie
     bei jedem Stufenwechsel neu formuliert werden können. */
  if(!wrap.getAttribute('data-niv-formeln')){
    wrap.setAttribute('data-niv-formeln','1');
    var lauf2=document.createTreeWalker(wrap,NodeFilter.SHOW_TEXT,{
      acceptNode:function(t){
        var v=t.nodeValue, p=t.parentNode;
        if(!v||!p) return NodeFilter.FILTER_REJECT;
        if(/^(SCRIPT|STYLE|TEXTAREA|OPTION|CODE)$/.test(p.nodeName)) return NodeFilter.FILTER_REJECT;
        if(p.closest&&p.closest('.ac-fw,.ac-hs,.niv-leiste,svg,.fa-daten')) return NodeFilter.FILTER_REJECT;
        FORMEL.lastIndex=0; HAUSNR.lastIndex=0;
        return (FORMEL.test(v)||HAUSNR.test(v))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
      }});
    var tr2=[], t2;
    while((t2=lauf2.nextNode())) tr2.push(t2);
    tr2.slice(0,500).forEach(function(k){
      FORMEL.lastIndex=0; HAUSNR.lastIndex=0;
      var h=k.nodeValue
        .replace(FORMEL,function(m,a,typ,b){
          return '<span class="ac-fw" data-a="'+a+'" data-t="'+typ+'" data-b="'+b+'">'+m+'</span>'; })
        .replace(HAUSNR,function(m,nr){
          return '<span class="ac-hs" data-h="'+nr+'">'+m+'</span>'; });
      if(h===k.nodeValue) return;
      var s=document.createElement('span'); s.innerHTML=h;
      k.parentNode.replaceChild(s,k);
    });
  }
  /* Bei jedem Wechsel neu formulieren */
  Array.prototype.forEach.call(document.querySelectorAll('.ac-fw'),function(e){
    e.textContent=formelText(e.getAttribute('data-a'),e.getAttribute('data-t'),e.getAttribute('data-b'),n);
  });
  Array.prototype.forEach.call(document.querySelectorAll('.ac-hs'),function(e){
    e.textContent=hausText(+e.getAttribute('data-h'),n);
  });
}

/* ── Umschaltleiste ─────────────────────────────────── */
function leiste(ziel, opt){
  opt=opt||{};
  var box=(typeof ziel==='string')?document.getElementById(ziel):ziel;
  if(!box) return null;
  var n=lies();
  var h='<span class="niv-lab">'+(opt.lab||'Wissensstand')+'</span><div class="niv-knoepfe">';
  STUFEN.forEach(function(s){
    h+='<button type="button" data-niv="'+s.id+'" aria-pressed="'+(s.id===n)+'" '+
       'title="'+s.lang+'">'+s.n+'</button>';
  });
  h+='</div><div class="niv-tipp"><b>'+STUFEN[n].lang+'.</b> '+STUFEN[n].u+'</div>';
  box.className='niv-leiste'; box.innerHTML=h;
  Array.prototype.forEach.call(box.querySelectorAll('button[data-niv]'),function(bt){
    bt.addEventListener('click',function(){
      setze(+bt.getAttribute('data-niv'));
      if(opt.beiWechsel) opt.beiWechsel(lies());
    });
  });
  return box;
}

/* Leiste von selbst einsetzen, wo ein Platzhalter steht oder wo eine
   Seite sie offensichtlich braucht (nach dem Einleitungsabsatz). */
function autoLeiste(){
  var vorh=document.getElementById('nivleiste');
  if(vorh){ leiste(vorh); return; }
  if(document.body.hasAttribute('data-niv-keine')) return;
  var wrap=document.querySelector('.wrap'); if(!wrap) return;
  var lede=wrap.querySelector('.lede')||wrap.querySelector('h1');
  if(!lede) return;
  var d=document.createElement('div'); d.id='nivleiste';
  lede.parentNode.insertBefore(d, lede.nextSibling);
  leiste(d);
}

function start(){
  stilEinhaengen();
  anwenden();
  autoLeiste();
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start);
else start();

window.AC_NIV={
  STUFEN:STUFEN,
  stufe:lies, setzen:setze, anwenden:anwenden, leiste:leiste,
  fuerProfil:fuerProfil, profilSetzen:profilSetzen, profilKarte:profilKarte,
  name:function(n){ return STUFEN[Math.max(0,Math.min(4,n|0))].n; },
  lang:function(n){ return STUFEN[Math.max(0,Math.min(4,n|0))].lang; },
  /* Textvariante nach Stufe wählen; kürzere Listen werden nach oben aufgefüllt */
  t:function(v,n){ if(n===undefined) n=lies(); return v[Math.min(n,v.length-1)]; }
};
})();
