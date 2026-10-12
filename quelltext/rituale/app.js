/* ── Rituale: Rechnung und Darstellung ─────────────────── */
function nrm(x){x=x%360;return x<0?x+360:x;}
function heuteJD(){var n=new Date();
 return jdFromUT(n.getUTCFullYear(),n.getUTCMonth()+1,n.getUTCDate(),
   n.getUTCHours()+n.getUTCMinutes()/60);}
function datVon(jd){ return new Date((jd-2440587.5)*86400000); }
function lon(k,jd){var T=(jd-2451545)/36525;
 if(k==='Sonne') return sunLon(T); if(k==='Mond') return moonLon(T); return geo(k,T);}

/* Phasenwinkel: Mond minus Sonne, 0 = Neumond, 180 = Vollmond */
function phase(jd){ var T=(jd-2451545)/36525; return nrm(moonLon(T)-sunLon(T)); }
function phDiff(jd,ziel){ var d=nrm(phase(jd)-ziel); return d>180?d-360:d; }

/* Alle Neu- und Vollmonde in einem Zeitraum, exakt per Intervallhalbierung */
function lunationen(vonJD,bisJD){
  var out=[];
  [[0,'neu'],[180,'voll']].forEach(function(z){
    var a=vonJD, fa=phDiff(a,z[0]);
    while(a<bisJD){
      var b=a+0.5, fb=phDiff(b,z[0]);
      if(fa<0 && fb>=0){
        var lo=a, hi=b;
        for(var k=0;k<44;k++){ var m=(lo+hi)/2; if(phDiff(m,z[0])<0) lo=m; else hi=m; }
        out.push({jd:(lo+hi)/2, art:z[1]});
      }
      a=b; fa=fb;
    }
  });
  out.sort(function(x,y){ return x.jd-y.jd; });
  return out;
}

/* Mondsichel als SVG-Pfad. a = Phasenwinkel, Licht auf der Nordhalbkugel rechts beim Zunehmen. */
function mondPfad(cx,cy,r,a){
  a=nrm(a);
  var c=Math.cos(a*Math.PI/180);
  var rx=Math.abs(c)*r;
  var rechts = a<180;
  var limb = rechts?1:0;
  var term = (c>0) ? (rechts?0:1) : (rechts?1:0);
  return 'M '+cx+' '+(cy-r)+
    ' A '+r+' '+r+' 0 0 '+limb+' '+cx+' '+(cy+r)+
    ' A '+(rx||0.001)+' '+r+' 0 0 '+term+' '+cx+' '+(cy-r)+' Z';
}
function mondSvg(gr,a,hell,dunkel){
  var r=gr/2-1;
  return '<svg width="'+gr+'" height="'+gr+'" viewBox="0 0 '+gr+' '+gr+'" aria-hidden="true">'+
    '<circle cx="'+(gr/2)+'" cy="'+(gr/2)+'" r="'+r+'" fill="'+(dunkel||'rgba(255,255,255,.10)')+'"/>'+
    '<path d="'+mondPfad(gr/2,gr/2,r,a)+'" fill="'+(hell||'#E8C97A')+'"/>'+
    '<circle cx="'+(gr/2)+'" cy="'+(gr/2)+'" r="'+r+'" fill="none" stroke="rgba(154,114,53,.45)" stroke-width="1"/></svg>';
}
/* Achtteilung nach Rudhyar: jede Phase beginnt bei ihrem Namensgeber und
   dauert 45 Grad, also gut 3 1/2 Tage. Der Neumond-Abschnitt läuft damit
   von 0 bis 45 Grad — dieselben drei Tage, die auch das Ritualfenster hat. */
function phIndex(a){ return Math.floor(nrm(a)/45); }
function beleuchtung(a){ return (1-Math.cos(a*Math.PI/180))/2; }

/* Datum und Uhrzeit in der Zeitzone des Geräts */
function dtZeit(jd){
  var d=datVon(jd);
  return d.toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit',year:'numeric'})+', '+
         d.toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'})+' Uhr';
}
function dtKurz(jd){
  return datVon(jd).toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit'});
}
function dtTag(jd){
  return datVon(jd).toLocaleDateString('de-DE',{weekday:'short',day:'2-digit',month:'2-digit'});
}
function tageBis(jd){ return Math.round(jd-heuteJD()); }
function tageWort(n){
  if(n<=0) return 'heute';
  if(n===1) return 'morgen';
  return 'in '+n+' Tagen';
}

/* ── Profil ───────────────────────────────────────────── */
var gewaehlt=null, phWahl=null, wegWahl=null;
function chartVon(p){
  var ut=p.h+p.mi/60-p.tz,y=p.y,mo=p.mo,d=p.d;
  if(ut<0){ut+=24;d-=1;} if(ut>=24){ut-=24;d+=1;}
  var jd=jdFromUT(y,mo,d,ut),T=(jd-2451545)/36525,a=angles(jd,p.lat,p.lon);
  return {Sonne:sunLon(T),Mond:moonLon(T),Merkur:geo('Merkur',T),Venus:geo('Venus',T),Mars:geo('Mars',T),
   Jupiter:geo('Jupiter',T),Saturn:geo('Saturn',T),Uranus:geo('Uranus',T),Neptun:geo('Neptun',T),
   Pluto:geo('Pluto',T),ASC:a.asc,MC:a.mc};
}
function hausVon(P,l){ return ((Math.floor(l/30)-Math.floor(P.ASC/30))%12+12)%12+1; }
function aktivesChart(){
  var alle=[]; try{ alle=AC_P.alle()||[]; }catch(e){}
  if(!alle.length) return null;
  if(!gewaehlt){ var e=alle.filter(function(p){return p.eigen;})[0]||alle[0]; gewaehlt=e.id; }
  var p=alle.filter(function(x){return x.id===gewaehlt;})[0];
  return p?chartVon(p):null;
}

/* ── Jetzt-Kasten ─────────────────────────────────────── */
function jetztBauen(){
  var jd=heuteJD(), a=phase(jd), i=phIndex(a), ph=PHASEN[i];
  var b=Math.round(beleuchtung(a)*100);
  var kommend=lunationen(jd-1,jd+70);
  var nNeu=kommend.filter(function(x){return x.art==='neu'&&x.jd>jd;})[0];
  var nVoll=kommend.filter(function(x){return x.art==='voll'&&x.jd>jd;})[0];
  var letzte=lunationen(jd-40,jd).filter(function(x){return x.jd<=jd;}).pop();
  var P=aktivesChart();

  var h='<div class="jetzt"><div class="jetzt-kopf">'+mondSvg(74,a)+'<div>'+
    '<div class="k">Gerade</div>'+
    '<div class="gr" style="margin-bottom:4px;">'+ph.n+'</div>'+
    '<div style="font-size:14.3px;color:rgba(244,239,230,.75);">'+b+' % beleuchtet · '+
      ph.w+' · Mond in '+ZEI[Math.floor(nrm(lon('Mond',jd))/30)][0]+'</div></div></div>';

  /* Steht gerade ein Ritualfenster offen? */
  var offen=null;
  if(letzte){
    var seit=jd-letzte.jd;
    if(letzte.art==='neu' && seit<=3) offen={art:'neu',seit:seit,jd:letzte.jd};
    if(letzte.art==='voll' && seit<=1.5) offen={art:'voll',seit:seit,jd:letzte.jd};
  }
  if(offen && offen.art==='neu'){
    h+='<p><b>Das Neumondfenster ist offen.</b> Der Neumond war am '+dtZeit(offen.jd)+
      ', das sind '+(offen.seit<1?'noch keine 24 Stunden':Math.floor(offen.seit)+' Tage')+'. '+
      'Du hast noch bis '+dtZeit(offen.jd+3)+' — danach ist der Zyklus zu weit, dann wartest du auf den nächsten.</p>';
  } else if(offen && offen.art==='voll'){
    h+='<p><b>Vollmond — das Fenster ist offen.</b> Exakt war er am '+dtZeit(offen.jd)+
      '. Für das Vollmondritual hast du etwa einen Tag davor und danach.</p>';
  } else {
    h+='<p>'+ph.t[0]+'</p>';
  }
  /* Steht ein Fenster offen, gilt dessen Ritual — nicht das des Abschnitts,
     in den der Winkel gerade rutscht. Betrifft vor allem den Vollmond, dessen
     Fenster schon vor dem exakten Zeitpunkt aufgeht. */
  var ritPh = offen ? (offen.art==='neu'?PHASEN[0]:PHASEN[4]) : ph;
  h+='<div class="jz" style="margin-top:4px;"><b>Was jetzt dran ist</b>'+ritPh.tu+'</div>';

  function eintrag(l,titel){
    if(!l) return '';
    var zi=Math.floor(nrm(lon('Mond',l.jd))/30);
    var hz=P?(' · dein '+hausVon(P,lon('Mond',l.jd))+'. Haus'):'';
    return '<div class="jz"><b>'+titel+'</b>'+dtZeit(l.jd)+'<br>'+
      ZEI[zi][1]+' '+ZEI[zi][0]+hz+' · '+tageWort(tageBis(l.jd))+'</div>';
  }
  h+='<div class="jetzt-zahl">'+eintrag(nNeu,'Nächster Neumond')+eintrag(nVoll,'Nächster Vollmond')+'</div>';
  h+='</div>';
  document.getElementById('jetztbox').innerHTML=h;
  if(phWahl===null) phWahl=i;
}

/* ── Rad der acht Phasen ──────────────────────────────── */
/* Das beleuchtete Stück ist hell, der Rest dunkel — sonst sieht ein Neumond
   aus wie ein Vollmond. Auf dem cremefarbenen Papier heißt das:
   Scheibe navy, Licht gold. */
var UNBELEUCHTET='#2E3A5C', BELEUCHTET='#E8C97A';

function radBauen(){
  var jd=heuteJD(), a=phase(jd), ist=phIndex(a);
  /* Schmal: Ziffern statt Namen, sonst wird die Schrift beim Skalieren unlesbar */
  var schmal = (typeof window!=='undefined' && window.innerWidth && window.innerWidth<640);
  var W = schmal?430:620, H=430, cx=W/2, cy=H/2;
  var R = schmal?142:140, mr = schmal?30:25;
  var s='<svg viewBox="0 0 '+W+' '+H+'" role="img" '+
    'aria-label="Die acht Mondphasen im Kreis, von Neumond oben im Uhrzeigersinn">';
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="none" stroke="#EBE1D2" stroke-width="1.5"/>';
  /* Der laufende Abschnitt als Bogen — jede Phase reicht von ihrem Mond bis zum nächsten */
  function pkt(g,rad){ return [cx+rad*Math.sin(g*Math.PI/180), cy-rad*Math.cos(g*Math.PI/180)]; }
  var b1=pkt(ist*45,R), b2=pkt(ist*45+45,R);
  s+='<path d="M '+b1[0].toFixed(1)+' '+b1[1].toFixed(1)+' A '+R+' '+R+' 0 0 1 '+
     b2[0].toFixed(1)+' '+b2[1].toFixed(1)+'" fill="none" stroke="#9A7235" stroke-width="4" '+
     'stroke-linecap="round" opacity=".38"/>';
  /* aktueller Stand auf der Bahn */
  var pp=pkt(a,R);
  s+='<circle cx="'+pp[0].toFixed(1)+'" cy="'+pp[1].toFixed(1)+'" r="4.5" fill="#9A7235"/>';
  /* Mitte */
  s+='<text x="'+cx+'" y="'+(cy-7)+'" text-anchor="middle" style="font-family:Fraunces,serif;'+
     'font-size:16px;fill:#6B6259;">29 1/2 Tage</text>';
  s+='<text x="'+cx+'" y="'+(cy+15)+'" text-anchor="middle" style="font-family:Fraunces,serif;'+
     'font-size:16px;fill:#6B6259;">ein Zyklus</text>';
  PHASEN.forEach(function(p,i){
    var q=pkt(p.a,R), x=q[0], y=q[1];
    var sin=Math.sin(p.a*Math.PI/180);
    s+='<g class="pf'+(phWahl===i?' an':'')+'" data-ph="'+i+'" role="button" tabindex="0" '+
       'aria-label="'+p.n+'">';
    s+='<circle class="treffer" cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(mr+14)+'"/>';
    s+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+(mr-1)+'" fill="'+UNBELEUCHTET+'"/>';
    s+='<path d="'+mondPfad(x,y,mr-1,p.a)+'" fill="'+BELEUCHTET+'"/>';
    s+='<circle class="ring" cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+mr+'" fill="none" '+
       'stroke="'+(i===ist?'#9A7235':'#DDD0BC')+'" stroke-width="'+(i===ist?2.5:1)+'"/>';
    if(schmal){
      /* Nummer direkt daneben, passend zu „Phase N von 8" im Text darunter */
      var n=pkt(p.a,R+mr+13);
      s+='<text class="zif" text-anchor="middle" x="'+n[0].toFixed(1)+'" y="'+(n[1]+4).toFixed(1)+'">'+(i+1)+'</text>';
    } else if(p.a===0 || p.a===180){
      var vy = (p.a===0) ? y-mr-11 : y+mr+19;
      s+='<text text-anchor="middle" x="'+x.toFixed(1)+'" y="'+vy.toFixed(1)+'">'+p.n+'</text>';
    } else {
      var rechts = sin>0;
      var lx = x + (rechts? (mr+9) : -(mr+9));
      s+='<text x="'+lx.toFixed(1)+'" y="'+(y+4).toFixed(1)+'" '+
         'text-anchor="'+(rechts?'start':'end')+'">'+p.n+'</text>';
    }
    s+='</g>';
  });
  s+='</svg>';
  document.getElementById('radsvg').innerHTML=s;
  [].slice.call(document.querySelectorAll('.pf')).forEach(function(g){
    function waehle(){ phWahl=+g.getAttribute('data-ph'); radBauen(); phTextBauen(); }
    g.addEventListener('click',waehle);
    g.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); waehle(); } });
  });
}
function phTextBauen(){
  var i=(phWahl===null?phIndex(phase(heuteJD())):phWahl), p=PHASEN[i];
  var ist=phIndex(phase(heuteJD()))===i;
  document.getElementById('phtext').innerHTML=
    '<div class="nr">Phase '+(i+1)+' von 8'+(ist?' · hier sind wir gerade':'')+'</div>'+
    '<h3>'+p.n+'</h3><div class="wort">'+p.w+'</div>'+
    p.t.map(function(x){return '<p>'+x+'</p>';}).join('')+
    '<div class="tu"><b>Das Ritual</b>'+p.tu+'</div>';
}

/* ── Neumond- und Vollmondritual ──────────────────────── */
var NM=[
 ['Das Fenster abwarten','Innerhalb von drei Tagen nach dem exakten Neumond, nicht davor. Vorher läuft noch der alte Zyklus aus, und was du da formulierst, gehört zur letzten Runde.'],
 ['Den Tisch leer machen','Handy in einen anderen Raum. Eine Kerze, Stift, Papier — richtiges Papier, nicht das Telefon. Zwanzig Minuten reichen, und sie sollten auch nicht viel länger werden.'],
 ['Anzünden','Kerze an, Räucherwerk wenn du magst, Fenster auf Kipp. Das ist kein magischer Akt, sondern ein Signal: ab jetzt läuft etwas anderes als vorher. Ein Körper merkt sich so einen Bruch besser als ein Vorsatz.'],
 ['Zwei Minuten zurückschauen','Was ist im letzten Zyklus passiert? Nicht bewerten, nur durchgehen. Es sind vier Wochen, man erinnert sich an weniger, als man denkt.'],
 ['Eine Intention formulieren','<b>Eine.</b> Im Präsens, in der Ich-Form, und konkret genug, dass du in vier Wochen zweifelsfrei sagen kannst, ob sie eingetreten ist. Und erreichbar in einem Mondzyklus — 29 1/2 Tage, nicht ein Jahr.',
  '<div class="zitat"><b class="m">So nicht</b><br><span class="m">&bdquo;Ich will mehr Geld verdienen und endlich an mich glauben.&ldquo;</span><br>'+
  'Nicht überprüfbar, nicht in vier Wochen entscheidbar, und zwei Dinge in einem Satz.'+
  '<br><br><b class="g">So eher</b><br><span class="g">&bdquo;Ich habe bis zum Vollmond drei Reading-Anfragen beantwortet und meinen Preis genannt, ohne ihn zu senken.&ldquo;</span><br>'+
  'Präsens, konkret, abhakbar — und das Eigentliche steckt im Nebensatz.</div>'],
 ['Den ersten Schritt dazuschreiben','Bevor die Kerze ausgeht: eine Sache, die du in den nächsten 48 Stunden tust. Klein. Eine Mail, ein Anruf, ein Termin. Das ist der Teil, an dem sich entscheidet, ob der Zettel ein Plan war oder ein Wunsch.'],
 ['Falten und hinlegen','An einen Ort, an dem du ihn im Alltag siehst — Spiegel, Geldbeutel, Kühlschrank. Nicht in eine Schublade. Ein Zettel, den man nicht sieht, arbeitet nicht.'],
 ['Aufhören','Kerze aus, Fenster auf, fertig. Nicht ausdehnen. Ein Ritual, das jedes Mal eine Stunde dauert, findet beim dritten Mal nicht mehr statt — und darauf kommt es an, nicht auf die Tiefe eines einzelnen Abends.']
];
var VM=[
 ['Den Zettel rausholen','Den vom Neumond, ungelesen seit zwei Wochen. Erst jetzt lesen.'],
 ['Drei Fragen','Was ist passiert? Was hat mich aufgehalten? Was davon war ich selbst? Die dritte Frage ist die, um die es geht, und die einzige, bei der du etwas ändern kannst.'],
 ['Das Gelungene benennen','<b>Vor</b> dem Loslassen, nicht danach. Ein Satz darüber, was tatsächlich funktioniert hat — und wenn es nur war, dass du den Zettel geschrieben hast. Die meisten überspringen das und machen aus einem Monatsrückblick eine Mängelliste.'],
 ['Präzise loslassen','Zweites Blatt. Nicht &bdquo;Selbstzweifel&ldquo; — das ist zu groß und zu vage. Sondern der genaue Satz, den du dir selbst sagst, wenn es schwierig wird. Den aufschreiben. Erst wenn er dasteht, kannst du ihn loswerden.'],
 ['Verbrennen oder zerreißen','Metallschüssel oder Waschbecken, kleine Stücke, Fenster auf. Oder zerreißen und wegwerfen, oder unter den Wasserhahn halten. Verbrennen wirkt nicht besser — es fühlt sich endgültiger an, und das reicht als Grund.'],
 ['Den Neumondzettel aufheben','Den nicht verbrennen. Sammle sie in einem Umschlag. Nach einem Jahr hast du zwölf Stück und siehst etwas, das dir sonst niemand zeigen kann: wie oft dasselbe draufsteht.']
];
function schritteBauen(ziel,daten){
  document.getElementById(ziel).innerHTML=daten.map(function(s,i){
    return '<div class="sch"><div class="n">'+(i+1)+'</div><div><h4>'+s[0]+'</h4>'+
      '<p>'+s[1]+'</p>'+(s[2]||'')+'</div></div>';
  }).join('');
}
function fensterBauen(){
  var jd=heuteJD();
  var k=lunationen(jd-5,jd+45);
  var nNeu=k.filter(function(x){return x.art==='neu'&&x.jd>jd-3;})[0];
  var nVoll=k.filter(function(x){return x.art==='voll'&&x.jd>jd-1.5;})[0];
  if(nNeu){
    var auf=nNeu.jd<jd;
    document.getElementById('nmfenster').innerHTML='<div class="tip" style="margin-top:0;">'+
      (auf?'<b>Jetzt gerade möglich.</b> Der Neumond war am ':'<b>Das nächste Fenster:</b> Neumond am ')+
      dtZeit(nNeu.jd)+' — das Ritual passt bis '+dtZeit(nNeu.jd+3)+'.'+
      (auf?'':' Das ist '+tageWort(tageBis(nNeu.jd))+'.')+'</div>';
  }
  if(nVoll){
    var aufV=nVoll.jd<jd;
    document.getElementById('vmfenster').innerHTML='<div class="tip" style="margin-top:0;">'+
      (aufV?'<b>Jetzt gerade möglich.</b> Vollmond war am ':'<b>Das nächste Fenster:</b> Vollmond am ')+
      dtZeit(nVoll.jd)+' — einen Tag davor bis einen Tag danach.'+
      (aufV?'':' Das ist '+tageWort(tageBis(nVoll.jd))+'.')+'</div>';
  }
}

/* ── Zeichen ──────────────────────────────────────────── */
function zeichenBauen(){
  var jd=heuteJD();
  var naechste=lunationen(jd,jd+40)[0];
  var zIst=naechste?Math.floor(nrm(lon('Mond',naechste.jd))/30):-1;
  document.getElementById('zeichenraster').innerHTML=ZEI.map(function(z,i){
    var t=ZTEXT[i];
    return '<div class="zk '+z[2]+(i===zIst?' ist':'')+'">'+
      '<div class="kopf"><span class="gl">'+z[1]+'</span><span class="nm">'+z[0]+'</span></div>'+
      '<div class="th">'+t[0]+(i===zIst?' · als Nächstes':'')+'</div>'+
      '<p>'+t[1]+'</p><p class="satz">'+t[2]+'</p></div>';
  }).join('');
}

/* ── Ritualkalender ───────────────────────────────────── */
function kalenderBauen(){
  var jd=heuteJD(), P=aktivesChart();
  var l=lunationen(jd,jd+200);
  if(!l.length){ document.getElementById('kalender').innerHTML=''; return; }
  document.getElementById('kalender').innerHTML=l.slice(0,12).map(function(x,idx){
    var ml=lon('Mond',x.jd), zi=Math.floor(nrm(ml)/30), neu=(x.art==='neu');
    var t=ZTEXT[zi];
    var hs=P?hausVon(P,ml):0;
    var titel=(neu?'Neumond':'Vollmond')+' in '+ZEI[zi][0];
    var text;
    if(neu){
      text=t[1]+(P?' <b>Im '+hs+'. Haus:</b> '+HAUSTHEMA[hs-1]+'.':'');
    } else {
      /* Der Zettel stammt vom Neumond davor — und der stand in einem anderen
         Zeichen. Beides nennen, sonst stimmt der Rückbezug nicht. */
      var vorher=lunationen(x.jd-33,x.jd).filter(function(y){return y.art==='neu';}).pop();
      var vz=vorher?Math.floor(nrm(lon('Mond',vorher.jd))/30):-1;
      text='Was jetzt ans Licht kommt, gehört zum Thema <b>'+t[0]+'</b>. '+
        'Vollmonde fragen nicht, was du anfangen willst, sondern was du nicht länger trägst.'+
        (vorher?' Dazu gehört der Zettel vom Neumond in '+ZEI[vz][0]+' am '+dtKurz(vorher.jd):'')+
        (P?' <b>Im '+hs+'. Haus:</b> '+HAUSTHEMA[hs-1]+'.':'');
    }
    return '<div class="kz'+(idx===0?' naechste':'')+'">'+
      '<div class="mo">'+mondSvg(34,neu?0:180,BELEUCHTET,UNBELEUCHTET)+'</div>'+
      '<div class="dat"><b>'+dtTag(x.jd)+'</b>'+
        datVon(x.jd).toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'})+' Uhr</div>'+
      '<div class="txt"><b>'+titel+'</b>'+
        (P?'<span class="haus">'+hs+'. Haus</span>':'')+
        '<p>'+text+'</p></div></div>';
  }).join('');
}

/* ── Wegweiser ────────────────────────────────────────── */
var WEGE=[['anfangen','Ich will etwas anfangen'],['fest','Ich komme nicht weiter'],
          ['beenden','Ich muss etwas beenden'],['leer','Ich habe keine Kraft']];
function wegBauen(){
  var f=document.getElementById('wegf'); f.innerHTML='';
  WEGE.forEach(function(w){
    var b=document.createElement('button'); b.type='button'; b.textContent=w[1];
    b.setAttribute('aria-pressed', wegWahl===w[0]);
    b.addEventListener('click',function(){ wegWahl=w[0]; wegBauen(); });
    f.appendChild(b);
  });
  var out=document.getElementById('wega');
  if(!wegWahl){ out.innerHTML=''; return; }
  var jd=heuteJD(), a=phase(jd), i=phIndex(a), zu=(a<180);
  var k=lunationen(jd,jd+45);
  var nNeu=k.filter(function(x){return x.art==='neu';})[0];
  var nVoll=k.filter(function(x){return x.art==='voll';})[0];
  var t='';
  if(wegWahl==='anfangen'){
    t = zu
      ? '<b>Guter Zeitpunkt.</b> Der Mond nimmt zu — das ist die Hälfte des Zyklus, in der Aufbauen mit dem Strom geht. '+
        'Du musst nicht bis zum nächsten Neumond warten. Nimm das Ritual der Phase, in der wir gerade sind: <b>'+
        PHASEN[i].n+' — '+PHASEN[i].w+'.</b> '+PHASEN[i].tu
      : '<b>Gegen den Strom, aber machbar.</b> Der Mond nimmt ab, und das ist die Hälfte, in der sich Abschließen leichter anfühlt als Anfangen. '+
        'Zwei Möglichkeiten: Du wartest bis zum Neumond am <b>'+(nNeu?dtZeit(nNeu.jd):'—')+'</b> ('+
        (nNeu?tageWort(tageBis(nNeu.jd)):'')+') und machst es mit Anlauf. Oder du fängst heute an und weißt, '+
        'dass der Schwung diesmal von dir kommen muss. Beides ist in Ordnung — nur nicht anfangen und dann dem Mond die Schuld geben.';
  } else if(wegWahl==='fest'){
    t = '<b>Das ist eine eigene Phase, und zwar eine normale.</b> Widerstand nach dem Anfangen ist kein Zeichen dafür, dass es die falsche Sache war. '+
      'Das Ritual dazu steht beim <b>Ersten Viertel — Entscheiden</b>: '+PHASEN[2].tu+
      '<br><br>Die Versuchung ist, die Sache umzuformulieren, bis sie wieder bequem ist. Das ist der Moment, in dem die meisten Vorhaben leise sterben — '+
      'nicht an einem Scheitern, sondern an einer Neuformulierung.';
  } else if(wegWahl==='beenden'){
    t = !zu
      ? '<b>Jetzt passt es.</b> Der Mond nimmt ab — die Hälfte des Zyklus, die dafür gemacht ist. Das Ritual steht beim '+
        '<b>Letzten Viertel — Abschneiden</b>: '+PHASEN[6].tu
      : '<b>Du kannst jederzeit beenden.</b> Wenn es dringend ist, mach es heute — kein Mondstand ist ein Grund, etwas Schädliches länger laufen zu lassen. '+
        'Wenn es Zeit hat: Der Vollmond am <b>'+(nVoll?dtZeit(nVoll.jd):'—')+'</b> ('+
        (nVoll?tageWort(tageBis(nVoll.jd)):'')+') leitet die abnehmende Hälfte ein. Danach fühlt sich Beenden weniger nach Verlust an und mehr nach Aufräumen.';
  } else if(wegWahl==='leer'){
    t = (i===7)
      ? '<b>Du bist in der balsamischen Phase.</b> Die letzten drei Tage vor dem Neumond — die Phase, in der wenig Kraft da ist, und zwar nach Plan. '+
        'Der Neumond ist am <b>'+(nNeu?dtZeit(nNeu.jd):'—')+'</b>. Bis dahin ist das Ritual: nichts. '+
        'Keine neuen Vorhaben, keine Termine, die dich kosten. Was du jetzt nicht tust, musst du nicht nachholen.'
      : '<b>Dann ist das jetzt die Lage, und der Mond ist nicht der Grund.</b> Wir sind in der Phase <b>'+PHASEN[i].n+'</b>, '+
        'die nächste ausdrückliche Ruhephase beginnt kurz vor dem Neumond am <b>'+(nNeu?dtZeit(nNeu.jd):'—')+'</b>.'+
        '<br><br>Das heißt nicht, dass du bis dahin durchhalten musst. Es heißt nur: Such die Ursache nicht im Himmel. '+
        'Wenn die Leere länger als ein paar Tage anhält oder sich jeden Monat wiederholt, gehört sie zu einem Menschen, nicht zu einem Chart.';
  }
  out.innerHTML=t;
}

/* ── Transite und Material ────────────────────────────── */
function transiteBauen(){
  document.getElementById('transite').innerHTML=TRANSITE.map(function(x){
    return '<details class="tr"><summary><span class="t">'+x.t+'</span><span class="w">'+x.w+'</span></summary>'+
      '<div class="in">'+x.h+'</div></details>';
  }).join('');
}
function materialBauen(){
  document.getElementById('material').innerHTML=MATERIAL.map(function(m){
    return '<div class="mk"><span class="mark '+m.m[0]+'">'+m.m[1]+'</span>'+
      '<h4>'+m.n+'</h4>'+m.t.map(function(p){return '<p>'+p+'</p>';}).join('')+'</div>';
  }).join('');
  document.getElementById('quellen').innerHTML=QUELLEN;
}

/* ── Profilwahl ───────────────────────────────────────── */
function wahlBauen(){
  var box=document.getElementById('rtwahl'), alle=[];
  try{ alle=AC_P.alle()||[]; }catch(e){}
  box.innerHTML='';
  if(alle.length<2) return;
  var l=document.createElement('span'); l.className='lab'; l.textContent='Profil'; box.appendChild(l);
  alle.forEach(function(p){
    var b=document.createElement('button'); b.type='button';
    b.textContent=AC_P.anzeige(p,AC_P.zeigeNamen())+(p.eigen?' (ich)':'');
    b.setAttribute('aria-pressed', gewaehlt===p.id);
    b.addEventListener('click',function(){ gewaehlt=p.id; wahlBauen(); jetztBauen(); kalenderBauen(); });
    box.appendChild(b);
  });
}

function start(){
  wahlBauen();
  jetztBauen(); radBauen(); phTextBauen();
  fensterBauen();
  schritteBauen('nmschritte',NM); schritteBauen('vmschritte',VM);
  zeichenBauen(); kalenderBauen(); wegBauen();
  transiteBauen(); materialBauen();
  var P=aktivesChart();
  if(!P){
    var k=document.getElementById('kalender');
    k.insertAdjacentHTML('afterend','<div class="leer-hinweis" style="margin-top:12px;">'+
      '<b>Ohne Profil fehlen die Häuser.</b><br><br>Die Termine oben stimmen — aber in welchem Lebensbereich '+
      'eine Lunation bei dir landet, braucht deine Geburtsdaten. Leg sie unter '+
      '<a href="profile.html">Profile</a> an, dann wird der Kalender persönlich.</div>');
  }
}
start();

/* Bei Breitenwechsel neu zeichnen — schmal bekommt Ziffern, breit die Namen */
var letzteBreite=(typeof window!=='undefined'?window.innerWidth:0), zeitgeber=null;
if(typeof window!=='undefined' && window.addEventListener){
  window.addEventListener('resize',function(){
    var schmalVorher=letzteBreite<640, schmalJetzt=window.innerWidth<640;
    letzteBreite=window.innerWidth;
    if(schmalVorher!==schmalJetzt){
      clearTimeout(zeitgeber);
      zeitgeber=setTimeout(function(){ radBauen(); },150);
    }
  });
}
