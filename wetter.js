/* Astro-Charlie · Himmelswetter
   Was gerade am Himmel los ist — für alle gleich, mit persönlichem Anschluss.
   Zeichenstände, Zeichenwechsel, Rückläufigkeiten, nächste Lunationen. */
(function(){
var SIGNS=['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische'];
var GLZ=['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
var GLY={Sonne:'☉',Mond:'☽',Merkur:'☿',Venus:'♀',Mars:'♂',Jupiter:'♃',Saturn:'♄',Uranus:'♅',Neptun:'♆',Pluto:'♇'};
var EL=['Feuer','Erde','Luft','Wasser'];
var ELF=['#B5502E','#6B7C3F','#3E7C9A','#6A4A62'];
var ELBG=['#F8EBE4','#EEF1E6','#EAF0F5','#EFEAF2'];
var HT=['Person und Auftreten','Wert und Besitz','Sprache und Nahbereich','Zuhause und Wurzeln','Ausdruck und Romantik',
 'Alltag und Arbeit','Partnerschaft','Tiefe und Geteiltes','Sinn und Weite','Beruf und Sichtbarkeit','Gruppen und Ziele','Rückzug und Inneres'];

/* Was ein Planet in einem Zeichen gesellschaftlich bedeutet — knapp und ohne Vorhersage */
var WETTER={
 Merkur:['Gespräche werden direkt und ungeduldig.','Gespräche werden langsam und konkret.','Alles redet, wenig wird entschieden.',
  'Gespräche werden persönlich und stimmungsgetragen.','Man redet großzügig und mit Geste.','Details treten hervor, Fehler fallen auf.',
  'Man sucht Ausgleich und vermeidet Klartext.','Es wird gegraben, Unausgesprochenes kommt hoch.','Der Blick geht ins Große und Grundsätzliche.',
  'Sachlich, knapp, auf Ergebnisse gerichtet.','Ungewöhnliche Ideen bekommen Raum.','Vieles bleibt unscharf — Gefühltes wird für Gewusstes gehalten.'],
 Venus:['Zuneigung wird direkt gezeigt und schnell erklärt.','Genuss, Beständigkeit, Körperlichkeit stehen im Vordergrund.','Leicht, gesprächig, unverbindlich.',
  'Nähe und Fürsorge zählen mehr als Auftritt.','Großzügig, warm, gern auch etwas theatralisch.','Zuwendung zeigt sich als Nützlichsein.',
  'Harmonie, Geschmack, Ästhetik haben Konjunktur.','Zuneigung wird intensiv und besitzergreifend — Oberflächliches langweilt.','Offen, weit, auf Freiheit bedacht.',
  'Verbindlich und zurückhaltend. Was gilt, gilt langfristig.','Unkonventionell, mit viel Freiraum.','Hingebungsvoll und leicht verklärt.'],
 Mars:['Volles Tempo, wenig Geduld, schnelle Konflikte.','Langsamer Anlauf, dafür Ausdauer.','Viel Bewegung, viel Reden, wenig Abschluss.',
  'Durchsetzung läuft über Gefühl statt Konfrontation.','Auftritt und Stolz spielen mit.','Kleinteilig und gründlich, manchmal verzettelt.',
  'Konflikte werden vermieden und stauen sich.','Zäh, tief, kompromisslos.','Begeistert und weit ausholend.','Zielstrebig, strukturiert, belastbar.',
  'Eigenwillig, gern gegen den Strom.','Diffus — Kraft versickert leicht.'],
 Sonne:['Anfang, Aufbruch, Tempo.','Beständigkeit und Substanz.','Austausch und Vielfalt.','Zuhause, Familie, Wurzeln.',
  'Sichtbarkeit und Ausdruck.','Ordnung, Alltag, Sorgfalt.','Beziehung und Ausgleich.','Tiefe und Klärung.',
  'Sinn und Weite.','Struktur und Verantwortung.','Gemeinschaft und Erneuerung.','Loslassen und Auflösen.']};

function nrm(x){x=x%360;return x<0?x+360:x;}
function heuteJD(){
  var n=new Date();
  return jdFromUT(n.getUTCFullYear(),n.getUTCMonth()+1,n.getUTCDate(),n.getUTCHours()+n.getUTCMinutes()/60);
}
function lon(k,jd){ var T=(jd-2451545)/36525;
  if(k==='Sonne') return sunLon(T);
  if(k==='Mond') return moonLon(T);
  return geo(k,T);
}
function dat(jd){
  var d=new Date((jd-2440587.5)*86400000);
  return ('0'+d.getUTCDate()).slice(-2)+'.'+('0'+(d.getUTCMonth()+1)).slice(-2)+'.';
}
/* Nächster Zeichenwechsel */
function naechsterWechsel(k,jd){
  var start=Math.floor(lon(k,jd)/30), schritt=(k==='Mond')?0.1:0.5;
  for(var t=jd+schritt;t<jd+420;t+=schritt){
    if(Math.floor(lon(k,t)/30)!==start){
      /* Randflackern ausschließen: der Wechsel muss halten */
      var halt=true, probe=(k==='Mond')?0.3:3;
      for(var p=t;p<t+probe;p+=schritt){ if(Math.floor(lon(k,p)/30)===start){ halt=false; break; } }
      if(!halt) continue;
      var lo=t-schritt, hi=t;
      for(var i=0;i<30;i++){ var m=(lo+hi)/2; (Math.floor(lon(k,m)/30)===start)?lo=m:hi=m; }
      return {jd:(lo+hi)/2, zeichen:Math.floor(nrm(lon(k,hi))/30)};
    }
  }
  return null;
}
function rueck(k,jd){
  if(k==='Sonne'||k==='Mond') return false;
  return nrm(lon(k,jd+1)-lon(k,jd-1))>180;
}
/* Nächste Lunationen */
function lunationen(jd,n){
  var out=[],pN=null,pV=null;
  for(var t=jd;t<jd+120&&out.length<n;t+=0.25){
    var T=(t-2451545)/36525, s=nrm(moonLon(T)-sunLon(T));
    var dn=(s>180?s-360:s), dv=s-180;
    if(pN!==null&&pN<0&&dn>=0){
      var lo=t-0.25,hi=t;
      for(var i=0;i<38;i++){var m=(lo+hi)/2,Tm=(m-2451545)/36525,sm=nrm(moonLon(Tm)-sunLon(Tm));
        ((sm>180?sm-360:sm)<0)?lo=m:hi=m;}
      var jm=(lo+hi)/2; out.push({t:'Neumond',jd:jm,g:sunLon((jm-2451545)/36525)});
    }
    if(pV!==null&&pV<0&&dv>=0){
      var lo2=t-0.25,hi2=t;
      for(var j=0;j<38;j++){var m2=(lo2+hi2)/2,T2=(m2-2451545)/36525;
        ((nrm(moonLon(T2)-sunLon(T2))-180)<0)?lo2=m2:hi2=m2;}
      var jv=(lo2+hi2)/2; out.push({t:'Vollmond',jd:jv,g:moonLon((jv-2451545)/36525)});
    }
    pN=dn; pV=dv;
  }
  out.sort(function(a,b){return a.jd-b.jd;});
  return out.slice(0,n);
}

window.AC_wetter=function(el){
  if(!el) return;
  var jd=heuteJD();
  var P={}; ['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'].forEach(function(k){ P[k]=lon(k,jd); });

  /* eigenes Chart für den persönlichen Anschluss */
  var eig=null, ascZ=null;
  try{
    var p=window.AC_P?AC_P.eigenes():null;
    if(p){
      var ut=p.h+p.mi/60-p.tz,y=p.y,mo=p.mo,d=p.d;
      if(ut<0){ut+=24;d-=1;} if(ut>=24){ut-=24;d+=1;}
      var a=angles(jdFromUT(y,mo,d,ut),p.lat,p.lon);
      ascZ=Math.floor(a.asc/30); eig=true;
    }
  }catch(e){}
  function meinHaus(g){ return (ascZ===null)?null:(((Math.floor(g/30)-ascZ)%12+12)%12)+1; }

  var h='';

  /* ── Die Bühne: Sonne und Mond groß ── */
  var sz=Math.floor(P.Sonne/30), mz=Math.floor(P.Mond/30);
  var w=nrm(P.Mond-P.Sonne);
  var phase=(w<15||w>345)?'Neumond':(w<75)?'zunehmende Sichel':(w<105)?'erstes Viertel':
    (w<165)?'zunehmend, fast voll':(w<195)?'Vollmond':(w<255)?'abnehmend':(w<285)?'letztes Viertel':'abnehmende Sichel';
  var fuellung=Math.round((1-Math.cos(w*Math.PI/180))/2*100);

  h+='<div class="hw-buehne">'+
    '<div class="hw-gross" style="background:'+ELBG[sz%4]+';border-color:'+ELF[sz%4]+'33">'+
      '<div class="hw-gl" style="color:'+ELF[sz%4]+'">☉</div>'+
      '<div><div class="hw-lab">Die Sonne steht in</div>'+
      '<div class="hw-name">'+GLZ[sz]+' '+SIGNS[sz]+'</div>'+
      '<div class="hw-txt">'+(WETTER.Sonne[sz]||'')+'</div>'+
      (meinHaus(P.Sonne)?'<div class="hw-mein">bei dir im '+meinHaus(P.Sonne)+'. Haus · '+HT[meinHaus(P.Sonne)-1]+'</div>':'')+
      '</div></div>'+
    '<div class="hw-gross" style="background:'+ELBG[mz%4]+';border-color:'+ELF[mz%4]+'33">'+
      '<div class="hw-gl" style="color:'+ELF[mz%4]+'">'+mondGlyph(fuellung,w)+'</div>'+
      '<div><div class="hw-lab">'+phase+'</div>'+
      '<div class="hw-name">'+GLZ[mz]+' '+SIGNS[mz]+'</div>'+
      '<div class="hw-txt">'+fuellung+'% beleuchtet</div>'+
      (meinHaus(P.Mond)?'<div class="hw-mein">bei dir im '+meinHaus(P.Mond)+'. Haus · '+HT[meinHaus(P.Mond)-1]+'</div>':'')+
      '</div></div></div>';

  /* ── Die persönlichen Planeten als Streifen ── */
  h+='<div class="hw-titel">Wo die schnellen Planeten stehen</div><div class="hw-streifen">';
  ['Merkur','Venus','Mars'].forEach(function(k){
    var zi=Math.floor(P[k]/30), r=rueck(k,jd), wch=naechsterWechsel(k,jd);
    h+='<div class="hw-kachel" style="border-color:'+ELF[zi%4]+'44">'+
      '<div class="hw-kgl" style="color:'+ELF[zi%4]+'">'+GLY[k]+'</div>'+
      '<div class="hw-kname">'+k+' in '+SIGNS[zi]+(r?' <span class="hw-r">℞</span>':'')+'</div>'+
      '<div class="hw-ktxt">'+(WETTER[k]?WETTER[k][zi]:'')+'</div>'+
      (wch?'<div class="hw-kwech">wechselt am '+dat(wch.jd)+' nach '+SIGNS[wch.zeichen]+'</div>':'')+
      (meinHaus(P[k])?'<div class="hw-kmein">dein '+meinHaus(P[k])+'. Haus</div>':'')+
      '</div>';
  });
  h+='</div>';

  /* ── Langsame Planeten kompakt ── */
  h+='<div class="hw-titel">Der langsame Hintergrund</div><div class="hw-lang">';
  ['Jupiter','Saturn','Uranus','Neptun','Pluto'].forEach(function(k){
    var zi=Math.floor(P[k]/30), r=rueck(k,jd);
    h+='<span class="hw-lp"'+(meinHaus(P[k])?' title="dein '+meinHaus(P[k])+'. Haus"':'')+'>'+
      '<b style="color:'+ELF[zi%4]+'">'+GLY[k]+'</b> '+k+' in '+SIGNS[zi]+(r?' ℞':'')+
      (meinHaus(P[k])?' <i>· '+meinHaus(P[k])+'. Haus</i>':'')+'</span>';
  });
  h+='</div>';

  /* ── Rückläufigkeiten als Warnstreifen ── */
  var rl=['Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'].filter(function(k){return rueck(k,jd);});
  if(rl.length){
    h+='<div class="hw-rl"><b>Rückläufig gerade:</b> '+rl.join(', ')+'. '+
      'Das heißt nicht, dass etwas schiefgeht — es heißt, dass diese Themen noch einmal durchlaufen werden. '+
      '<a href="retrograde.html">Was das genau bedeutet →</a></div>';
  }

  /* ── Nächste Lunationen ── */
  h+='<div class="hw-titel">Was als Nächstes kommt</div><div class="hw-lun">';
  lunationen(jd,3).forEach(function(x){
    var zi=Math.floor(x.g/30), mh=meinHaus(x.g);
    h+='<div class="hw-lk'+(x.t==='Vollmond'?' voll':'')+'">'+
      '<div class="hw-ldat">'+dat(x.jd)+'</div>'+
      '<div class="hw-lname">'+x.t+'</div>'+
      '<div class="hw-lzeichen">'+GLZ[zi]+' '+SIGNS[zi]+'</div>'+
      (mh?'<div class="hw-lmein">dein '+mh+'. Haus<br><span>'+HT[mh-1]+'</span></div>'
         :'<div class="hw-lmein" style="color:var(--leise)">Chart hinterlegen für dein Haus</div>')+
      '</div>';
  });
  h+='</div>';

  h+='<div class="hw-fuss">Das oben gilt für alle gleich — es ist das Wetter. '+
    (eig?'Was <b>dir</b> davon nahegeht, steht in <a href="uebersicht.html">deinem Bild</a>.'
        :'Wenn du dein Chart hinterlegst, siehst du zusätzlich, in welche deiner Häuser das fällt.')+'</div>';

  el.innerHTML=h;
};

function mondGlyph(f,w){
  if(f<6) return '●';
  if(f>94) return '○';
  return (w<180)?'◐':'◑';
}
})();
