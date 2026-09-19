/* Astro-Charlie · Format-Umschalter
   Kurz, Ausführlich, Visuell. Die Wahl gilt für alle Seiten und bleibt gespeichert.
   Beim ersten Mal gibt es einen Vorschlag anhand des Merkurs — mit Begründung und Ausstieg. */
(function(){
var KEY='ac_format';
var SIGNS=['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische'];

var CSS = `
.fm-leiste{display:flex;gap:9px;align-items:center;flex-wrap:wrap;background:var(--papier);
 border:1px solid var(--linie);border-radius:16px;padding:11px 14px;margin-bottom:14px;}
.fm-lab{font-family:var(--sans);font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:var(--messing);}
.fm-knopf{display:flex;gap:4px;}
.fm-knopf button{font-family:var(--sans);font-size:13.5px;padding:7px 14px;border:1px solid var(--linie);
 background:var(--bg);color:var(--tinte);border-radius:16px;cursor:pointer;}
.fm-knopf button:hover{border-color:var(--nacht);}
.fm-knopf button[aria-pressed="true"]{background:var(--nacht);border-color:var(--nacht);color:#fff;}
.fm-tipp{font-size:12.5px;color:var(--leise);margin-left:auto;max-width:44ch;line-height:1.45;}
.fm-tipp b{color:var(--tinte);}

/* ── Kurzform ── */
body.fmt-kurz .fa-daten{display:none;}
body.fmt-kurz .fa-block p:not(:first-of-type){display:none;}
body.fmt-kurz .fa-coach{display:none;}
body.fmt-kurz .fa-wozu p:first-of-type{display:none;}
body.fmt-kurz .ub-box .hint{display:none;}
body.fmt-kurz .kt-details{display:none;}
body.fmt-kurz .rm-tuer p{display:none;}
body.fmt-kurz .lede{font-size:16px;}

/* ── Visuell ── */
body.fmt-visuell .rm-bal{grid-template-columns:150px 1fr 44px;}
body.fmt-visuell .rm-bal .bar{height:18px;}
body.fmt-visuell .fa-block p:not(:first-of-type){display:none;}
body.fmt-visuell .fa-daten{display:block;}
body.fmt-visuell .fa-coach{display:none;}
body.fmt-visuell .fa-inhalt{font-size:15.5px;}
body.fmt-visuell .fa summary{padding:19px 20px;}
body.fmt-visuell .fa-frage{font-size:19px;}
body.fmt-visuell .rm-tuer p{display:none;}
@media(max-width:560px){.fm-tipp{margin-left:0;max-width:none;}}
`;

function lade(){ try{ return localStorage.getItem(KEY)||null; }catch(e){ return null; } }
function sichere(v){ try{ localStorage.setItem(KEY,v); }catch(e){} }

function setzen(v){
  document.body.classList.remove('fmt-kurz','fmt-lang','fmt-visuell');
  document.body.classList.add('fmt-'+v);
  sichere(v);
}

/* Merkur auslesen, wenn die Seite eine Ephemeride hat */
function merkurVorschlag(){
  try{
    if(!window.AC_P||typeof geo!=='function'||typeof jdFromUT!=='function') return null;
    var p=AC_P.aktives(); if(!p) return null;
    var ut=p.h+p.mi/60-p.tz,y=p.y,mo=p.mo,d=p.d;
    if(ut<0){ut+=24;d-=1;} if(ut>=24){ut-=24;d+=1;}
    var T=(jdFromUT(y,mo,d,ut)-2451545)/36525;
    var m=geo('Merkur',T), zi=Math.floor(m/30);
    var el=zi%4;   /* 0 Feuer, 1 Erde, 2 Luft, 3 Wasser */
    if(el===1) return {v:'lang',  z:SIGNS[zi], grund:'Erde nimmt Konkretes und Ausführliches gut auf'};
    if(el===2) return {v:'kurz',  z:SIGNS[zi], grund:'Luft mag den Überblick und ermüdet an Länge'};
    if(el===3) return {v:'visuell',z:SIGNS[zi], grund:'Wasser denkt in Bildern und Stimmungen'};
    return {v:'kurz', z:SIGNS[zi], grund:'Feuer will schnell zum Punkt'};
  }catch(e){ return null; }
}

window.AC_format=function(){
  if(document.getElementById('fmleiste')) return;
  var st=document.createElement('style'); st.textContent=CSS; document.head.appendChild(st);

  var gewaehlt=lade(), vorschlag=null, neu=false;
  if(!gewaehlt){
    vorschlag=merkurVorschlag();
    gewaehlt=vorschlag?vorschlag.v:'lang';
    neu=true;
  }
  setzen(gewaehlt);

  var wrap=document.querySelector('.wrap'); if(!wrap) return;
  var bar=document.createElement('div');
  bar.className='fm-leiste'; bar.id='fmleiste';
  var kn='<span class="fm-lab">Ansicht</span><div class="fm-knopf" id="fmk"></div>';
  bar.innerHTML=kn+'<div class="fm-tipp" id="fmtipp"></div>';

  /* hinter die Tür einsetzen, sonst ganz oben */
  var tuer=wrap.querySelector('.rm-tuer')||wrap.querySelector('.lede');
  if(tuer&&tuer.nextSibling) tuer.parentNode.insertBefore(bar,tuer.nextSibling);
  else wrap.insertBefore(bar,wrap.firstChild);

  var kb=document.getElementById('fmk'), tipp=document.getElementById('fmtipp');
  function zeichne(){
    kb.innerHTML='';
    [['kurz','Kurz'],['lang','Ausführlich'],['visuell','Visuell']].forEach(function(o){
      var b=document.createElement('button'); b.type='button'; b.textContent=o[1];
      b.setAttribute('aria-pressed', gewaehlt===o[0]);
      b.addEventListener('click',function(){
        gewaehlt=o[0]; setzen(o[0]); zeichne();
        tipp.innerHTML='Gilt ab jetzt auf allen Seiten. Jederzeit umstellbar.';
      });
      kb.appendChild(b);
    });
    if(neu&&vorschlag){
      tipp.innerHTML='Vorgeschlagen, weil dein <b>Merkur in '+vorschlag.z+'</b> steht — '+
        vorschlag.grund+'. Wenn es nicht passt, einfach wechseln: du kennst dich besser als die Rechnung.';
    } else if(!tipp.innerHTML){
      tipp.innerHTML='Dieselben Inhalte, andere Ausführlichkeit. Deine Wahl bleibt gespeichert.';
    }
  }
  zeichne();
};

document.addEventListener('DOMContentLoaded',function(){
  try{ AC_format(); }catch(e){ console.error('Format:',e); }
});
})();
