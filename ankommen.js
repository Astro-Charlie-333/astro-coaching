/* Astro-Charlie · Ankommen
   Vier Schritte beim ersten Besuch: wer du bist, wie du liest,
   wie viel Erklärung, warum du hier bist. Alles später änderbar. */
(function(){
var KEY='ac_setup';
var SIGNS=['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische'];

var RAEUME=[
 ['selbstwert','Selbstwert','Warum nehme ich zu wenig?'],
 ['berufung','Berufung','Wofür bin ich hier?'],
 ['naehe','Nähe','Warum wiederholt sich das?'],
 ['unerlaubte','Das Unerlaubte','Was traue ich mir nicht zu?'],
 ['wunder-punkt','Der wunde Punkt','Was tut immer wieder weh?'],
 ['herkunft','Herkunft','Was läuft aus der Familie mit?'],
 ['zugehoerigkeit','Zugehörigkeit','Warum fühle ich mich außen?'],
 ['anders-verdrahtet','Anders verdrahtet','Warum ist Alltag so anstrengend?'],
 ['alltag','Alltag','Struktur, die hält'],
 ['koerper','Körper','Was braucht mein Körper?']
];

function lade(){
  try{ return JSON.parse(localStorage.getItem(KEY)||'null'); }catch(e){ return null; }
}
function sichere(o){
  try{ localStorage.setItem(KEY, JSON.stringify(o)); }catch(e){}
}
window.AC_SETUP={
  lade:lade, sichere:sichere, RAEUME:RAEUME,
  fertig:function(){ var s=lade(); return !!(s&&s.fertig); },
  format:function(){ var s=lade(); return (s&&s.format)||'lang'; },
  erklaerung:function(){ var s=lade(); return (s&&s.erklaerung)||'mittel'; },
  themen:function(){ var s=lade(); return (s&&s.themen)||[]; },
  zuruecksetzen:function(){ try{ localStorage.removeItem(KEY); }catch(e){} }
};

var CSS = `
.an-huelle{max-width:620px;margin:0 auto;padding:36px 24px 60px;}
.an-fort{display:flex;gap:6px;margin-bottom:26px;}
.an-fort i{flex:1;height:5px;background:var(--linie);border-radius:4px;transition:background .2s;}
.an-fort i.voll{background:var(--nacht);}
.an-nr{font-family:'JetBrains Mono',monospace;font-size:11.5px;letter-spacing:.1em;
 text-transform:uppercase;color:var(--messing);margin-bottom:8px;}
.an-frage{font-family:var(--serif);font-size:clamp(24px,5vw,33px);font-weight:300;line-height:1.18;
 color:var(--tinte);letter-spacing:-.015em;margin:0 0 10px;}
.an-hilf{font-size:15px;line-height:1.65;color:var(--leise);margin-bottom:22px;max-width:52ch;}
.an-feld{margin-bottom:13px;}
.an-feld label{display:block;font-family:var(--sans);font-size:10px;letter-spacing:.13em;
 text-transform:uppercase;color:var(--messing);margin-bottom:5px;}
.an-feld input{width:100%;padding:13px 15px;border:1px solid var(--linie);border-radius:13px;
 background:var(--papier);font-family:var(--sans);font-size:16px;color:var(--tinte);}
.an-feld input:focus{outline:none;border-color:var(--nacht);}
.an-zwei{display:grid;grid-template-columns:1fr 1fr;gap:11px;}
.an-wahl{display:grid;gap:10px;}
.an-wahl button{text-align:left;font-family:var(--sans);font-size:16px;padding:16px 18px;
 border:1px solid var(--linie);background:var(--papier);color:var(--tinte);border-radius:15px;cursor:pointer;
 line-height:1.3;}
.an-wahl button:hover{border-color:var(--nacht);}
.an-wahl button span{display:block;font-size:13.5px;color:var(--leise);margin-top:4px;line-height:1.45;}
.an-wahl button[aria-pressed="true"]{background:var(--nacht);border-color:var(--nacht);color:#fff;}
.an-wahl button[aria-pressed="true"] span{color:rgba(255,255,255,.74);}
.an-vorschlag{background:var(--messing-bg);border-radius:13px;padding:12px 15px;margin-bottom:14px;
 font-size:14.2px;line-height:1.6;}
.an-themen{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
@media(max-width:560px){.an-themen{grid-template-columns:1fr;}.an-zwei{grid-template-columns:1fr;}}
.an-themen button{text-align:left;font-family:var(--sans);font-size:15px;padding:13px 15px;
 border:1px solid var(--linie);background:var(--papier);color:var(--tinte);border-radius:14px;cursor:pointer;line-height:1.25;}
.an-themen button span{display:block;font-size:12.5px;color:var(--leise);margin-top:3px;}
.an-themen button[aria-pressed="true"]{background:var(--nacht);border-color:var(--nacht);color:#fff;}
.an-themen button[aria-pressed="true"] span{color:rgba(255,255,255,.7);}
.an-fuss{display:flex;gap:11px;align-items:center;margin-top:24px;flex-wrap:wrap;}
.an-b{font-family:var(--sans);font-size:16px;border:1px solid var(--nacht);background:var(--nacht);color:#fff;
 padding:14px 28px;border-radius:26px;cursor:pointer;}
.an-b:hover{background:#3B4970;}
.an-b[disabled]{opacity:.4;cursor:default;}
.an-skip{font-family:var(--sans);font-size:14.5px;background:none;border:none;color:var(--leise);
 text-decoration:underline;cursor:pointer;padding:0;}
.an-skip:hover{color:var(--nacht);}
.an-zurueck{font-family:var(--sans);font-size:14.5px;background:none;border:none;color:var(--leise);cursor:pointer;padding:0;}
.an-ruhe{font-size:13px;color:var(--leise);margin-top:16px;line-height:1.6;}
.an-ortliste{position:relative;}
.an-treffer{position:absolute;left:0;right:0;top:100%;z-index:20;background:var(--papier);
 border:1px solid var(--linie);border-radius:13px;margin-top:4px;max-height:220px;overflow-y:auto;
 box-shadow:0 6px 20px rgba(0,0,0,.08);}
.an-treffer button{display:block;width:100%;text-align:left;font-family:var(--sans);font-size:15px;
 padding:11px 14px;border:none;background:none;cursor:pointer;color:var(--tinte);}
.an-treffer button:hover{background:var(--nacht-bg);}
`;

function etikett(o){ return o.name+(o.alt&&o.alt!==o.name?' ('+o.alt+')':'')+', '+o.land; }
function NSb(txt,cls){ var b=document.createElement('button'); b.type='button'; b.className=cls||''; b.innerHTML=txt; return b; }

window.AC_ankommen=function(ziel, fertigCb){
  var st=document.createElement('style'); st.textContent=CSS; document.head.appendChild(st);
  var daten=lade()||{schritt:0, format:null, erklaerung:null, themen:[], person:{}};
  var schritt=0, ortGewaehlt=null;

  function zeichne(){
    var h='<div class="an-huelle"><div class="an-fort">';
    for(var i=0;i<4;i++) h+='<i class="'+(i<=schritt?'voll':'')+'"></i>';
    h+='</div><div id="anbody"></div></div>';
    ziel.innerHTML=h;
    var b=document.getElementById('anbody');
    if(schritt===0) s0(b); else if(schritt===1) s1(b); else if(schritt===2) s2(b); else s3(b);
    window.scrollTo({top:0,behavior:'smooth'});
  }

  /* ── 1 · Wer du bist ── */
  function s0(b){
    var p=null;
    try{ p=window.AC_P?AC_P.eigenes():null; }catch(e){}
    b.innerHTML='<div class="an-nr">Schritt 1 von 4</div>'+
      '<h1 class="an-frage">Wer bist du?</h1>'+
      '<p class="an-hilf">Ohne Geburtsdaten kann hier nichts gerechnet werden — das ist der einzige Teil, '+
      'den ich wirklich brauche. Alles bleibt in deinem Browser und wird nirgendwo hingeschickt.</p>'+
      '<div class="an-feld"><label>Name oder Kürzel</label><input id="anname" placeholder="wie du angesprochen werden willst" value="'+((p&&p.name)||'')+'"></div>'+
      '<div class="an-zwei">'+
        '<div class="an-feld"><label>Geburtsdatum</label><input id="andat" type="date" value="'+
          (p?(p.y+'-'+('0'+p.mo).slice(-2)+'-'+('0'+p.d).slice(-2)):'')+'"></div>'+
        '<div class="an-feld"><label>Uhrzeit</label><input id="anzeit" type="time" value="'+
          (p?(('0'+p.h).slice(-2)+':'+('0'+p.mi).slice(-2)):'')+'"></div>'+
      '</div>'+
      '<div class="an-feld an-ortliste"><label>Geburtsort</label>'+
        '<input id="anort" placeholder="Stadt eingeben" autocomplete="off" value="'+((p&&p.ort)||'')+'">'+
        '<div id="antreffer"></div></div>'+
      '<p class="an-ruhe">Die Uhrzeit bestimmt Aszendent und Häuser. Wenn du sie nicht weißt, nimm 12:00 — '+
      'dann stimmen Zeichen und Aspekte, die Häuser aber nicht.</p>'+
      '<div class="an-fuss"><button class="an-b" id="anweiter" disabled>Weiter</button></div>';

    if(p) ortGewaehlt={ort:p.ort,lat:p.lat,lon:p.lon,tzKey:p.tzKey};
    ortFeld();
    ['anname','andat','anzeit'].forEach(function(id){
      document.getElementById(id).addEventListener('input',pruef);
    });
    document.getElementById('anweiter').addEventListener('click',function(){
      if(!speichern()) return;
      schritt=1; zeichne();
    });
    pruef();
  }
  function pruef(){
    var n=document.getElementById('anname'), d=document.getElementById('andat'), z=document.getElementById('anzeit');
    var ok = n&&n.value.trim() && d&&d.value && z&&z.value && ortGewaehlt;
    var w=document.getElementById('anweiter'); if(w) w.disabled=!ok;
  }
  function ortFeld(){
    var inp=document.getElementById('anort'), box=document.getElementById('antreffer');
    if(!inp) return;
    function schliessen(){ box.innerHTML=''; }
    inp.addEventListener('input',function(){
      var q=inp.value.trim().toLowerCase();
      ortGewaehlt=null; pruef();
      if(q.length<2){ schliessen(); return; }
      var tr=[];
      try{ if(window.AC_ortSuche) tr=AC_ortSuche(inp.value,8); }catch(e){}
      if(!tr.length){ schliessen(); return; }
      var h='<div class="an-treffer">';
      tr.forEach(function(o,i){ h+='<button type="button" data-i="'+i+'">'+etikett(o)+'</button>'; });
      box.innerHTML=h+'</div>';
      Array.prototype.forEach.call(box.querySelectorAll('button'),function(bt){
        bt.addEventListener('click',function(){
          var o=tr[+bt.getAttribute('data-i')];
          inp.value=etikett(o); ortGewaehlt=o; schliessen(); pruef();
        });
      });
    });
    inp.addEventListener('blur',function(){ setTimeout(schliessen,180); });
  }
  function speichern(){
    try{
      var n=document.getElementById('anname').value.trim();
      var d=document.getElementById('andat').value.split('-');
      var z=document.getElementById('anzeit').value.split(':');
      if(!window.AC_P||!ortGewaehlt) return false;
      var tz=1;
      try{ if(window.AC_offset) tz=AC_offset(ortGewaehlt.tz, +d[0], +d[1], +d[2], +z[0], +z[1]); }catch(e){}
      AC_P.hinzu({name:n, y:+d[0], mo:+d[1], d:+d[2], h:+z[0], mi:+z[1],
        tz:tz, lat:ortGewaehlt.lat, lon:ortGewaehlt.lon, ort:etikett(ortGewaehlt), tzKey:ortGewaehlt.tz, eigen:true});
      daten.person={name:n};
      sichere(daten);
      return true;
    }catch(e){ console.error('Ankommen:',e); return false; }
  }

  /* ── 2 · Wie du liest ── */
  function s1(b){
    var vor=merkurVorschlag();
    b.innerHTML='<div class="an-nr">Schritt 2 von 4</div>'+
      '<h1 class="an-frage">Wie liest du am liebsten?</h1>'+
      '<p class="an-hilf">Es sind überall dieselben Inhalte — nur unterschiedlich viel auf einmal. '+
      'Du kannst das jederzeit umstellen, auf jeder Seite oben.</p>'+
      (vor?'<div class="an-vorschlag"><b>Ein Vorschlag:</b> Dein Merkur steht in '+vor.z+' — '+vor.grund+
        '. Deshalb ist <b>'+vor.n+'</b> vorausgewählt. <b>Du weißt es besser als die Rechnung</b>, also wähl ruhig anders.</div>':'')+
      '<div class="an-wahl" id="anfmt"></div>'+
      '<div class="an-fuss"><button class="an-b" id="anweiter">Weiter</button>'+
      '<button class="an-zurueck" id="anback">Zurück</button></div>';
    var w=document.getElementById('anfmt');
    if(!daten.format) daten.format=vor?vor.v:'lang';
    [['kurz','Kurz','Nur das Wesentliche. Ein bis zwei Sätze pro Punkt, keine Nebenrechnungen.'],
     ['lang','Ausführlich','Alles mit Herleitung, Daten zum Nachprüfen und Zusatzerklärungen.'],
     ['visuell','Visuell','Mit Häuserrädern, Balken und farbigen Markierungen statt langer Absätze.']
    ].forEach(function(o){
      var bt=NSb(o[1]+'<span>'+o[2]+'</span>');
      bt.setAttribute('aria-pressed', daten.format===o[0]);
      bt.addEventListener('click',function(){ daten.format=o[0]; sichere(daten); s1(b); });
      w.appendChild(bt);
    });
    document.getElementById('anweiter').addEventListener('click',function(){ sichere(daten); schritt=2; zeichne(); });
    document.getElementById('anback').addEventListener('click',function(){ schritt=0; zeichne(); });
  }
  function merkurVorschlag(){
    try{
      if(!window.AC_P||typeof geo!=='function'||typeof jdFromUT!=='function') return null;
      var p=AC_P.eigenes(); if(!p) return null;
      var ut=p.h+p.mi/60-p.tz,y=p.y,mo=p.mo,d=p.d;
      if(ut<0){ut+=24;d-=1;} if(ut>=24){ut-=24;d+=1;}
      var m=geo('Merkur',(jdFromUT(y,mo,d,ut)-2451545)/36525), zi=Math.floor(m/30), el=zi%4;
      if(el===1) return {v:'lang',n:'Ausführlich',z:SIGNS[zi],grund:'Erde nimmt Konkretes und Schritt für Schritt gut auf'};
      if(el===2) return {v:'kurz',n:'Kurz',z:SIGNS[zi],grund:'Luft mag den Überblick und ermüdet an Länge'};
      if(el===3) return {v:'visuell',n:'Visuell',z:SIGNS[zi],grund:'Wasser denkt in Bildern statt in Listen'};
      return {v:'kurz',n:'Kurz',z:SIGNS[zi],grund:'Feuer will schnell zum Punkt'};
    }catch(e){ return null; }
  }

  /* ── 3 · Wie viel Erklärung ── */
  function s2(b){
    b.innerHTML='<div class="an-nr">Schritt 3 von 4</div>'+
      '<h1 class="an-frage">Wie viel soll erklärt werden?</h1>'+
      '<p class="an-hilf">Hier kommen Fachbegriffe vor — Aszendent, Herrscher, Orbis. '+
      'Manche wollen die erklärt bekommen, andere finden das störend.</p>'+
      '<div class="an-wahl" id="anerk"></div>'+
      '<div class="an-fuss"><button class="an-b" id="anweiter">Weiter</button>'+
      '<button class="an-zurueck" id="anback">Zurück</button></div>';
    var w=document.getElementById('anerk');
    if(!daten.erklaerung) daten.erklaerung='mittel';
    [['viel','Erklär mir alles','Fachbegriffe werden verlinkt und im Text kurz aufgelöst. Gut für den Anfang.'],
     ['mittel','Nur wo es nötig ist','Begriffe sind verlinkt, aber nicht zusätzlich erklärt.'],
     ['wenig','Ich kenne mich aus','Keine Verlinkung, kein Erklärtext. Nur die Aussage.']
    ].forEach(function(o){
      var bt=NSb(o[1]+'<span>'+o[2]+'</span>');
      bt.setAttribute('aria-pressed', daten.erklaerung===o[0]);
      bt.addEventListener('click',function(){ daten.erklaerung=o[0]; sichere(daten); s2(b); });
      w.appendChild(bt);
    });
    document.getElementById('anweiter').addEventListener('click',function(){ sichere(daten); schritt=3; zeichne(); });
    document.getElementById('anback').addEventListener('click',function(){ schritt=1; zeichne(); });
  }

  /* ── 4 · Warum du hier bist ── */
  function s3(b){
    b.innerHTML='<div class="an-nr">Schritt 4 von 4</div>'+
      '<h1 class="an-frage">Warum bist du hier?</h1>'+
      '<p class="an-hilf">Wähl aus, was dich gerade beschäftigt — auch mehreres. '+
      'Die Startseite zeigt dir danach genau diese Themen zuerst. Alles andere bleibt erreichbar, '+
      'es steht nur nicht im Weg. Wenn du nicht weißt, was: überspring das einfach.</p>'+
      '<div class="an-themen" id="anth"></div>'+
      '<div class="an-fuss"><button class="an-b" id="anfertig">Fertig</button>'+
      '<button class="an-skip" id="anskip">Weiß ich noch nicht</button>'+
      '<button class="an-zurueck" id="anback">Zurück</button></div>'+
      '<p class="an-ruhe">Alles davon lässt sich später ändern — auf der Startseite ganz unten.</p>';
    var w=document.getElementById('anth');
    RAEUME.forEach(function(r){
      var bt=NSb(r[1]+'<span>'+r[2]+'</span>');
      bt.setAttribute('aria-pressed', daten.themen.indexOf(r[0])>=0);
      bt.addEventListener('click',function(){
        var i=daten.themen.indexOf(r[0]);
        if(i<0) daten.themen.push(r[0]); else daten.themen.splice(i,1);
        sichere(daten); s3(b);
      });
      w.appendChild(bt);
    });
    function fertig(){ daten.fertig=true; sichere(daten); if(fertigCb) fertigCb(daten); }
    document.getElementById('anfertig').addEventListener('click',fertig);
    document.getElementById('anskip').addEventListener('click',function(){ daten.themen=[]; fertig(); });
    document.getElementById('anback').addEventListener('click',function(){ schritt=2; zeichne(); });
  }

  zeichne();
};
})();
