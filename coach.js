/* Astro-Charlie · Coach-Schicht
   Blendet in Räumen und Übersichten die Arbeitsperspektive ein, wenn der
   Coach-Modus aktiv ist und ein Fall gewählt wurde. Ändert nichts an den
   Berechnungen — nur an Rahmen, Reihenfolge und Hilfestellungen. */
(function(){
  'use strict';

  function setup(){ try{ return JSON.parse(localStorage.getItem('ac_setup')||'{}'); }catch(e){ return {}; } }
  function setzeSetup(s){ try{ localStorage.setItem('ac_setup', JSON.stringify(s)); }catch(e){} }
  function modus(){ return setup().modus||'selbst'; }
  function fallId(){ return setup().fall||null; }
  function setzeFall(id){ var s=setup(); s.fall=id; setzeSetup(s); }

  function profile(){ try{ return (window.AC_P&&AC_P.alle())||[]; }catch(e){ return []; } }
  function nameVon(p){ try{ return AC_P.anzeige(p, AC_P.zeigeNamen()); }catch(e){ return (p&&p.name)||'die Person'; } }

  /* ── Stil ── */
  function stil(){
    if(document.getElementById('ac-coach-stil')) return;
    var c=document.createElement('style'); c.id='ac-coach-stil';
    c.textContent=
    '.cx-bar{background:var(--nacht);color:#F4EFE6;border-radius:20px;padding:17px 20px;margin-bottom:18px;}'+
    '.cx-bar .k{font-family:"JetBrains Mono",monospace;font-size:10px;letter-spacing:.14em;'+
      'text-transform:uppercase;color:#E8C97A;margin-bottom:7px;}'+
    '.cx-bar .z{font-family:var(--serif);font-size:19px;color:#fff;line-height:1.3;margin-bottom:4px;}'+
    '.cx-bar .u{font-size:13.6px;color:rgba(244,239,230,.72);line-height:1.55;}'+
    '.cx-w{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px;}'+
    '.cx-w button{font-family:var(--sans);font-size:13px;padding:7px 13px;border:1px solid rgba(255,255,255,.28);'+
      'background:rgba(255,255,255,.08);color:#F4EFE6;border-radius:15px;cursor:pointer;}'+
    '.cx-w button[aria-pressed="true"]{background:#E8C97A;border-color:#E8C97A;color:#2E3A5C;font-weight:500;}'+
    '.cx-w a{font-family:var(--sans);font-size:13px;padding:7px 13px;border:1px solid rgba(255,255,255,.28);'+
      'border-radius:15px;color:#F4EFE6;text-decoration:none;}'+
    '.cx-plan{background:var(--messing-bg);border:1px solid var(--linie);border-radius:20px;'+
      'padding:20px 22px;margin-bottom:18px;}'+
    '.cx-plan h3{font-family:var(--serif);font-size:19px;font-weight:400;color:var(--nacht);margin:0 0 4px;}'+
    '.cx-plan .s{font-size:13.5px;color:var(--leise);margin-bottom:14px;line-height:1.55;}'+
    '.cx-sch{display:grid;grid-template-columns:30px 1fr;gap:13px;background:var(--papier);'+
      'border-radius:14px;padding:13px 15px;margin-bottom:8px;align-items:start;}'+
    '.cx-sch .n{width:26px;height:26px;border-radius:9px;background:var(--nacht);color:#fff;'+
      'display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-size:14px;}'+
    '.cx-sch b{font-family:var(--serif);font-size:16.5px;font-weight:400;color:var(--nacht);}'+
    '.cx-sch p{margin:3px 0 0;font-size:14.4px;line-height:1.6;}'+
    '.cx-hin{background:#FBF0E8;border-left:3px solid #A05A3A;border-radius:13px;padding:13px 16px;'+
      'margin-top:12px;font-size:14.3px;line-height:1.6;}'+
    '.cx-hin b{color:#8A4326;}'+
    '.fa-coach{border-color:var(--nacht) !important;}'+
    '.cx-einstieg{background:var(--nacht-bg);border-radius:12px;padding:12px 14px;margin:9px 0 0;'+
      'font-size:14.4px;line-height:1.6;}'+
    '.cx-einstieg b{color:var(--nacht);}';
    document.head.appendChild(c);
  }

  /* ── Leiste oben: welcher Fall ── */
  function leiste(zusatz){
    var alle=profile(), fremde=alle.filter(function(p){ return !p.eigen; });
    var box=document.createElement('div'); box.className='cx-bar';
    var id=fallId(), p=alle.filter(function(x){return x.id===id;})[0];
    if(!p && fremde.length){ p=fremde[0]; setzeFall(p.id); id=p.id; }

    var h='<div class="k">Coach-Ansicht</div>';
    if(!p){
      h+='<div class="z">Noch kein Fall gewählt</div>'+
         '<div class="u">Leg unter Profile eine Person an, dann liest du diese Seite aus ihrer Perspektive — '+
         'mit Hinweisen für die Arbeit statt für dich selbst.</div>'+
         '<div class="cx-w"><a href="profile.html">Zu den Profilen</a></div>';
    } else {
      h+='<div class="z">Du arbeitest mit '+nameVon(p)+'</div>'+
         '<div class="u">'+(zusatz||'Alles auf dieser Seite ist für diese Person gerechnet. Die Texte sprechen sie direkt an — lies sie als das, was du ihr anbieten könntest, nicht als Befund.')+'</div>'+
         '<div class="cx-w"></div>';
    }
    box.innerHTML=h;
    var w=box.querySelector('.cx-w');
    if(p&&w){
      alle.forEach(function(x){
        var b=document.createElement('button'); b.type='button';
        b.textContent=nameVon(x)+(x.eigen?' (ich)':'');
        b.setAttribute('aria-pressed', x.id===id);
        b.addEventListener('click',function(){
          setzeFall(x.id);
          try{ AC_P.setzeAktiv(x.id); }catch(e){}
          location.reload();
        });
        w.appendChild(b);
      });
      var a=document.createElement('a'); a.href='dossier.html'; a.textContent='Dossier →'; w.appendChild(a);
      var a2=document.createElement('a'); a2.href='faden.html'; a2.textContent='Roter Faden →'; w.appendChild(a2);
    }
    return box;
  }

  /* ── Vorgehen im Raum ── */
  var VORGEHEN={
   'selbstwert':['Nicht über Einsicht arbeiten.','Selbstwert ändert sich über Erfahrung, nicht über Argumente. Lass die Person eine kleine Forderung stellen, die gelingt — eine Rechnung, eine Bitte, ein Nein. Das wirkt stärker als zehn gute Erkenntnisse.'],
   'berufung':['Nicht nach Leidenschaft fragen.','Die Frage „wofür brennst du?" blockiert die meisten. Frag stattdessen: Wobei vergisst du zu essen? Wofür wirst du gefragt, ohne dafür zu werben? Das sind beantwortbare Fragen.'],
   'naehe':['Nach dem Abbruchpunkt fragen, nicht nach dem Typ.','Nicht „welche Menschen ziehst du an", sondern: An welcher Stelle kippt es? Nach wie vielen Wochen? Nach welchem Ereignis? Das Muster liegt im Zeitpunkt, nicht in der Person.'],
   'herkunft':['Langsam, und nicht graben.','Hier gehört Tempo herausgenommen. Wenn mehr kommt als Erinnerung — wenn der Körper reagiert, die Person wegdriftet oder weint, ohne zu wissen warum — ist die Grenze erreicht. Dann stoppen und verweisen.'],
   'wunder-punkt':['Die Übertreibung würdigen, bevor du sie hinterfragst.','Was wie Überkompensation aussieht, hat jemanden durch schwierige Zeiten gebracht. Erst anerkennen, dass es funktioniert hat. Dann fragen, ob es noch nötig ist.'],
   'unerlaubte':['Erst benennen lassen, nicht befreien.','Und vorher ansagen, dass es sich falsch anfühlen wird. Ohne diese Vorwarnung bricht die Person beim ersten Unbehagen ab und hält das für ein Zeichen, dass es nicht stimmt.'],
   'zugehoerigkeit':['Nicht auf mehr Geselligkeit hinarbeiten.','Manche brauchen weniger Gruppe, nicht mehr. Die Frage ist nicht, wie jemand besser dazugehört, sondern wo er dazugehören will — und was ihn das kostet.'],
   'anders-verdrahtet':['Mechanismen statt Motivation.','Hier ist jeder Ratschlag, der mit „du musst dich mehr" anfängt, verloren. Arbeite an Hürden, Sichtbarkeit und Kopplung. Und sag ausdrücklich, dass das kein Willensproblem ist.'],
   'alltag':['Nach dem einen System fragen, das gehalten hat.','Jede Person hatte mal eine Routine, die funktionierte. Was daran anders war — Uhrzeit, Anlass, Begleitung, Sichtbarkeit — ist die Antwort auf alles Weitere.'],
   'koerper':['Keine Zahlen, keine Pläne.','Sobald es um Gewicht, Mengen oder Kontrolle geht, ist es kein Coaching-Thema mehr. Dann freundlich benennen und verweisen — das ist kein Versagen, sondern Sorgfalt.'],
   'sicherheit':['Nur so weit, wie die Person öffnet.','Nie nachfragen, nie konkretisieren, nie Details erfragen. Du hältst den Rahmen, die Person bestimmt die Tiefe. Bei Übergriffserfahrungen sofort an eine Fachperson verweisen.'],
   'versorgung':['An der klemmenden Stufe ansetzen.','Nicht am Vorsatz. Finde heraus, wo es hakt — entscheiden, besorgen, zubereiten, aufräumen — und senk genau dort die Hürde. Keine Mengen, keine Zeiten, keine Ziele.']
  };

  function raumSlug(){
    var m=location.pathname.match(/raum-([a-z\-]+)\.html/);
    return m?m[1]:null;
  }

  function planBlock(slug){
    if(!window.RAUM||!window.AC_RAUM) return null;
    var p=null;
    try{ p=AC_P.aktives(); }catch(e){}
    if(!p) return null;
    var box=document.createElement('div'); box.className='cx-plan';
    var v=VORGEHEN[slug];
    var h='<h3>So gehst du in diesem Raum vor</h3>'+
      '<div class="s">Aus der Gewichtung für diese Person abgeleitet. Die Reihenfolge ist ein Vorschlag, kein Protokoll.</div>';
    /* lauteste Facetten holen */
    var sorted=[];
    try{
      var tmp=document.createElement('div');
      /* RAUM.facetten ist auf der Seite vorhanden; Gewichtung über AC_RAUM */
      sorted=AC_RAUM.auswerten(AC_RAUM.chart(p), RAUM)||[];
    }catch(e){ sorted=[]; }
    if(!sorted.length){
      /* Fallback: die Seite hat bereits sortiert gerendert */
      var namen=[].slice.call(document.querySelectorAll('.fa-name')).slice(0,3)
        .map(function(x){return x.textContent.trim();});
      sorted=namen.map(function(n){ return {fc:{name:n}}; });
    }
    var drei=sorted.slice(0,3);
    drei.forEach(function(r,i){
      var txt=[ 'Hier liegt bei dieser Person das meiste Gewicht. Damit anfangen — nicht, weil es das schwerste ist, sondern weil es am ehesten resoniert.',
       'Der zweite Zugang. Oft derselbe Kern von einer anderen Seite — gut, wenn der erste nicht trägt.',
       'Für später. Erwähnen reicht fürs Erste; es wird von allein wiederkommen.'][i];
      h+='<div class="cx-sch"><div class="n">'+(i+1)+'</div><div><b>'+(r.fc?r.fc.name:'')+'</b><p>'+txt+'</p></div></div>';
    });
    if(v) h+='<div class="cx-hin"><b>'+v[0]+'</b> '+v[1]+'</div>';
    h+='<div class="cx-hin" style="background:var(--papier);border-left-color:var(--messing);">'+
      '<b>Und die Frage, die immer gestellt gehört:</b> „Was von dem, was ich gesagt habe, stimmt nicht?" '+
      'Sie gibt der Person die Möglichkeit zu widersprechen — und schützt dich davor, eine Deutung durchzuziehen, die nicht passt.</div>';
    box.innerHTML=h;
    return box;
  }

  /* ── Einbau ── */
  function los(){
    if(modus()!=='coach') return;
    stil();
    var wrap=document.querySelector('.wrap'); if(!wrap) return;
    var slug=raumSlug();
    var anker=wrap.querySelector('h1');
    var nach=anker?anker.nextElementSibling:null;

    if(slug){
      var l=leiste('Die Facetten sind für diese Person gewichtet. Die Coach-Leitfäden unten sind aufgeklappt.');
      wrap.insertBefore(l, wrap.firstChild);
      /* Coach-Schubladen öffnen */
      setTimeout(function(){
        [].slice.call(document.querySelectorAll('details.fa-coach')).forEach(function(d){ d.open=true; });
        var plan=planBlock(slug);
        if(plan){
          var ziel=document.getElementById('raum');
          if(ziel&&ziel.parentNode) ziel.parentNode.insertBefore(plan, ziel);
        }
      }, 60);
    } else if(/raeume\.html/.test(location.pathname)){
      var l2=leiste('Die Räume sind unten nach Gewicht für diese Person sortierbar. Der rote Faden schlägt eine Reihenfolge vor.');
      wrap.insertBefore(l2, wrap.firstChild);
    } else if(/uebersicht\.html|profil-ansicht\.html/.test(location.pathname)){
      var l3=leiste(null);
      wrap.insertBefore(l3, wrap.firstChild);
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', los);
  else los();
})();
