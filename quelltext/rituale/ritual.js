/* Astro-Charlie · Ritualboard für die Startseite
   Was als Nächstes ansteht, was man dafür da haben muss, und ein Fakt
   des Tages. Setzt die Ephemeriden der Seite und AC_HIMMEL voraus. */
(function(){
'use strict';
function n360(x){x=x%360;return x<0?x+360:x;}
function lon(k,jd){var T=(jd-2451545)/36525;
 return k==='Sonne'?sunLon(T):(k==='Mond'?moonLon(T):geo(k,T));}
function dat(jd){ return new Date((jd-2440587.5)*86400000); }
function uhr(jd){ return dat(jd).toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'}); }
function tagLang(jd){ return dat(jd).toLocaleDateString('de-DE',
 {weekday:'short',day:'2-digit',month:'2-digit'})+', '+uhr(jd); }
function tagKurz(jd){ return dat(jd).toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit'}); }
function esc(s){ return String(s===undefined||s===null?'':s).replace(/[<>&"]/g,function(c){
 return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }

var ZEI=[['Widder','♈'],['Stier','♉'],['Zwillinge','♊'],['Krebs','♋'],
 ['Löwe','♌'],['Jungfrau','♍'],['Waage','♎'],['Skorpion','♏'],
 ['Schütze','♐'],['Steinbock','♑'],['Wassermann','♒'],['Fische','♓']];
var HFELD=['Auftreten und Selbstbild','Geld, Besitz, Selbstwert','Reden, Lernen, Umgebung',
 'Zuhause und Herkunft','Ausdruck, Spiel, Verliebtsein','Alltag, Arbeit, Körper',
 'Gegenüber und Verbindlichkeit','Geteiltes, Tiefe, Loslassen','Sinn, Ferne, Überzeugung',
 'Beruf und Sichtbarkeit','Freundschaft und Zukunft','Rückzug, Unbewusstes, Ruhe'];

/* Was man je Zeichen dahaben sollte — zwei Dinge, mehr nicht */
var BESORGEN=[
 ['frischer Ingwer','ein roter Faden'],
 ['Honig','ein paar Rosenblüten'],
 ['Lavendel','Sternanis'],
 ['eine Schale für Wasser','Jasmin oder Jasmintee'],
 ['ein getrocknetes Lorbeerblatt','eine Orange'],
 ['ein Zweig Rosmarin','Kamille'],
 ['Rosenwasser oder Rosenblüten','Vanille'],
 ['Gewürznelken','Mohnsamen'],
 ['eine ganze Muskatnuss','Salbei'],
 ['grobes Meersalz','Mohnsamen'],
 ['Wacholderbeeren','Sternanis'],
 ['Beifuß oder Lavendel','eine Kerze extra']];
var IMMER=['eine Kerze','Zettel und Stift','Streichhölzer'];

/* ── Lunationen ─────────────────────────────────────── */
function ph(jd){ var T=(jd-2451545)/36525; return n360(moonLon(T)-sunLon(T)); }
function phDiff(jd,z){ var d=n360(ph(jd)-z); return d>180?d-360:d; }
function lunationen(von,bis){
  var out=[];
  [[0,'neu'],[180,'voll']].forEach(function(z){
    var a=von, fa=phDiff(a,z[0]);
    while(a<bis){
      var b=a+0.5, fb=phDiff(b,z[0]);
      if(fa<0&&fb>=0){
        var lo=a,hi=b;
        for(var k=0;k<42;k++){ var m=(lo+hi)/2; if(phDiff(m,z[0])<0) lo=m; else hi=m; }
        out.push({jd:(lo+hi)/2,art:z[1]});
      }
      a=b; fa=fb;
    }
  });
  out.sort(function(x,y){return x.jd-y.jd;});
  return out;
}

/* Offenes Ritualfenster: Neumond bis +3 Tage, Vollmond ±1,5 Tage */
function fenster(jd){
  var l=lunationen(jd-5,jd+2);
  for(var i=l.length-1;i>=0;i--){
    var d=jd-l[i].jd;
    if(l[i].art==='neu'  && d>=0 && d<=3)   return {art:'neu', jd:l[i].jd, bis:l[i].jd+3};
    if(l[i].art==='voll' && d>=-1.5 && d<=1.5) return {art:'voll', jd:l[i].jd, bis:l[i].jd+1.5};
  }
  /* Vollmondfenster beginnt schon vorher */
  var k=lunationen(jd,jd+2).filter(function(x){return x.art==='voll';})[0];
  if(k && k.jd-jd<=1.5) return {art:'voll', jd:k.jd, bis:k.jd+1.5, vorher:true};
  return null;
}

/* ── Fakt des Tages ─────────────────────────────────── */
var PLANETEN=['Merkur','Venus','Mars','Jupiter','Saturn'];
/* Wann verlässt ein Planet sein jetziges Zeichen — in BEIDE Richtungen.
   Rückläufige Planeten gehen rückwärts wieder heraus und kommen später
   noch einmal; das darf der Text nicht unterschlagen. */
function zeichenVerlassen(k,jd){
  var z0=Math.floor(n360(lon(k,jd))/30), a=jd;
  for(var i=0;i<900;i++){
    var b=a+1;
    if(Math.floor(n360(lon(k,b))/30)!==z0){
      var lo=a,hi=b;
      for(var q=0;q<32;q++){ var m=(lo+hi)/2;
        if(Math.floor(n360(lon(k,m))/30)===z0) lo=m; else hi=m; }
      var t=(lo+hi)/2, neu=Math.floor(n360(lon(k,t+0.02))/30);
      return {jd:t, neu:neu, rueckwaerts:((neu-z0+12)%12===11)};
    }
    a=b;
  }
  return null;
}
function ruecklaeufig(k,jd){
  var d=((lon(k,jd+1)-lon(k,jd)+540)%360)-180;
  return d<0;
}
function fakten(P,jd,st){
  var f=[];
  /* Der eine Fakt, der immer sitzt — und den die Seite selbst nachrechnet */
  if(st&&!st.polar){
    f.push('<b>Warum die Woche so heißt, wie sie heißt.</b> Zähl die Planetenstunden in der '+
      'chaldäischen Reihenfolge — Saturn, Jupiter, Mars, Sonne, Venus, Merkur, Mond — vierundzwanzig '+
      'Stunden weiter, und du landest beim übernächsten Planeten der Reihe. Aus Saturntag wird Sonntag, '+
      'aus Sonntag Montag, dann Mars (mardi), Merkur (mercredi), Jupiter (jeudi), Venus (vendredi). '+
      'Unsere Wochentage sind nichts anderes als dieser Abzählreim, seit rund zweitausend Jahren.');
  }
  var mz=Math.floor(n360(lon('Mond',jd))/30);
  f.push('<b>Der Mond steht in '+ZEI[mz][0]+'.</b> Er bleibt in jedem Zeichen rund zweieinhalb Tage '+
    'und ist damit der schnellste Zeiger am Himmel — was er anrührt, ist übermorgen vorbei. '+
    'Deshalb taugt er fürs Timing und nichts für Prognosen.');
  var p=ph(jd), bel=Math.round((1-Math.cos(p*Math.PI/180))/2*100);
  var tag=Math.round(p/360*29.53);
  f.push('<b>Tag '+tag+' von 29 im Mondzyklus</b>, '+bel+' % beleuchtet. Ein voller Zyklus dauert '+
    '29 Tage, 12 Stunden und 44 Minuten — deshalb wandert der Neumond jedes Jahr durch den Kalender '+
    'und fällt nie zweimal auf dasselbe Datum.');
  if(P){
    PLANETEN.forEach(function(k){
      var l=lon(k,jd), hs=((Math.floor(l/30)-Math.floor(P.ASC/30))%12+12)%12+1;
      var e=zeichenVerlassen(k,jd);
      if(!e||e.jd-jd<=2||e.jd-jd>=900) return;
      var dauer=(e.jd-jd>60? Math.round((e.jd-jd)/30.4)+' Monate' : Math.round(e.jd-jd)+' Tage');
      var rl=ruecklaeufig(k,jd);
      var kopf='<b>'+k+' läuft'+(rl?' rückläufig':'')+' durch dein '+hs+'. Haus</b> — '+HFELD[hs-1];
      if(e.rueckwaerts){
        f.push(kopf+'. Am '+tagKurz(e.jd)+' verlässt '+k+' das Haus wieder — aber '+
          '<b>rückwärts</b>, in dein '+(hs===1?12:hs-1)+'. Haus zurück. '+
          'Das Thema ist damit nicht durch: '+k+' dreht später wieder und kommt noch einmal her. '+
          'Was jetzt offenbleibt, kommt also wieder auf den Tisch.');
      } else {
        f.push(kopf+' — und bleibt dort noch bis zum '+tagKurz(e.jd)+' ('+dauer+'). '+
          'Danach ist dieses Thema für eine Weile durch.');
      }
    });
    var sz=Math.floor(n360(P.Sonne)/30), ascz=Math.floor(n360(P.ASC)/30);
    var gr=Math.round(n360(P.ASC)%30);
    f.push('<b>Dein Aszendent steht auf '+gr+' Grad '+ZEI[ascz][0]+'.</b> Der Aszendent wandert '+
      'rund ein Grad in vier Minuten — hättest du vier Minuten später angefangen zu atmen, '+
      'stünde er anders. Nichts in einem Chart hängt so genau an der Uhrzeit wie er.');
    /* Rückkehr der Sonne */
    var srjd=jd, zielL=P.Sonne;
    for(var i=0;i<400;i++){
      var d1=((lon('Sonne',srjd)-zielL+540)%360)-180, d2=((lon('Sonne',srjd+1)-zielL+540)%360)-180;
      if(d1<0&&d2>=0){ break; }
      srjd+=1;
    }
    var tage=Math.round(srjd-jd);
    if(tage>0&&tage<400){
      f.push('<b>Noch '+tage+' Tage bis zu deinem Solar Return.</b> Das ist der Moment, in dem die '+
        'Sonne wieder exakt auf ihrem Geburtsgrad steht — meist einen Tag neben dem Kalendergeburtstag '+
        'und zu einer krummen Uhrzeit. Das ist der eigentliche Jahreswechsel.');
    }
  }
  return f;
}

/* ── Richtungswechsel: wann wird ein Planet wieder direkt ──
   Eine Station ist der Punkt, an dem die Tagesbewegung das Vorzeichen
   wechselt. Davor steht der Planet scheinbar still. */
var LANGSAM=['Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];
function tempo(k,jd){ return ((lon(k,jd+0.5)-lon(k,jd-0.5)+540)%360)-180; }
function stationen(vonJD, tage){
  var out=[];
  LANGSAM.forEach(function(k){
    var a=vonJD, fa=tempo(k,a);
    for(var i=0;i<tage;i++){
      var b=a+1, fb=tempo(k,b);
      if((fa<0)!==(fb<0)){
        var lo=a, hi=b;
        for(var q=0;q<26;q++){ var m=(lo+hi)/2;
          if((tempo(k,m)<0)===(fa<0)) lo=m; else hi=m; }
        var t=(lo+hi)/2;
        out.push({planet:k, jd:t, direkt:(fb>=0), lon:lon(k,t)});
      }
      a=b; fa=fb;
    }
  });
  out.sort(function(x,y){ return x.jd-y.jd; });
  return out;
}
/* Welche Planeten laufen gerade rückwärts */
function jetztRueck(jd){
  return LANGSAM.filter(function(k){ return tempo(k,jd)<0; });
}
var STATIONSATZ={
 Merkur:['Absprachen, Technik und alles Schriftliche laufen wieder normal.',
         'Absprachen und Technik werden f\u00FCr drei Wochen z\u00E4her. Zweimal lesen hilft mehr als \u00E4rgern.'],
 Venus:['Was in Beziehungen und beim Geld h\u00E4ngen geblieben ist, kommt wieder in Bewegung.',
        'Beziehungen und Geldfragen gehen in die R\u00FCckschau. Jetzt nichts Gro\u00DFes entscheiden.'],
 Mars:['Die Kraft geht wieder nach au\u00DFen. Was monatelang liegen blieb, l\u00E4sst sich jetzt anfassen.',
       'Der Antrieb geht nach innen. Konfrontationen treffen in dieser Zeit daneben.'],
 Jupiter:['Wachstum zeigt sich wieder nach au\u00DFen statt nur innerlich.',
          'Die gro\u00DFen Pl\u00E4ne gehen in die Pr\u00FCfung. Nicht schlimm, nur langsamer.'],
 Saturn:['Was festgefahren war, bekommt wieder Richtung.',
         'Eine Struktur wird noch einmal auf Tragf\u00E4higkeit gepr\u00FCft.'],
 Uranus:['Eine Ver\u00E4nderung, die lange in der Luft lag, wird konkret.',
         'Der Ver\u00E4nderungsdruck wird innerlich, bevor er wieder sichtbar wird.'],
 Neptun:['Etwas kl\u00E4rt sich, das lange unklar war.',
         'Eine Illusion wird noch einmal von innen angeschaut.'],
 Pluto:['Ein langer Umbau nimmt wieder Fahrt auf.',
        'Ein Umbauprozess geht nach innen.']};

/* ── Das Board ──────────────────────────────────────── */
function board(P, O, knapp){
  var jd, n=new Date();
  jd=jdFromUT(n.getUTCFullYear(),n.getUTCMonth()+1,n.getUTCDate(),
     n.getUTCHours()+n.getUTCMinutes()/60);
  var st=null;
  try{ st=AC_HIMMEL.planetenStunde(jd,O.lat,O.lon); }catch(e){}
  var ol=null; try{ ol=AC_HIMMEL.ohneLauf(jd); }catch(e){}
  var offen=fenster(jd);
  var kommend=lunationen(jd,jd+70);
  var naechste=kommend[0];

  var h='<div class="rb">';

  if(offen){
    var zi=Math.floor(n360(lon('Mond',offen.jd))/30);
    var rest=Math.max(0,offen.bis-jd);
    h+='<div class="rb-k">Jetzt offen</div>'+
      '<div class="rb-gr">'+(offen.art==='neu'?'Neumond':'Vollmond')+' in '+ZEI[zi][0]+'</div>'+
      '<p>'+(offen.vorher?'Exakt ist er ':'Exakt war er ')+tagLang(offen.jd)+'. '+
      'Das Ritualfenster ist offen und schließt '+tagLang(offen.bis)+' — '+
      (rest<1? 'das sind noch '+Math.round(rest*24)+' Stunden.' : 'du hast noch '+Math.round(rest)+' Tage.')+'</p>'+
      '<div class="rb-tu"><b>Kurzform, falls heute wenig geht</b>'+
      (offen.art==='neu'
        ? 'Kerze an, einen Satz aufschreiben, was bis zum Vollmond passiert sein soll, Zettel an den Spiegel. Fertig.'
        : 'Den Neumondzettel rausholen, lesen, einen Satz drunter: was tatsächlich passiert ist. Fertig.')+
      '</div>'+
      '<a class="rb-link" href="rituale.html">Die lange Fassung →</a>';
    /* Auch bei offenem Fenster: was als Nächstes kommt und was dafür da sein muss */
    var naech=kommend.filter(function(x){return x.jd>offen.bis;})[0];
    if(naech&&!knapp){
      var nzi=Math.floor(n360(lon('Mond',naech.jd))/30);
      h+='<div class="rb-tu" style="margin-top:13px;"><b>Danach — '+
        (naech.art==='neu'?'Neumond':'Vollmond')+' in '+ZEI[nzi][0]+' am '+tagKurz(naech.jd)+'</b>'+
        IMMER.concat(BESORGEN[nzi]).join(' · ')+
        '<span>Das ist die Einkaufsliste dafür. Lieber jetzt als an dem Abend, an dem du es brauchst.</span></div>';
    }
  } else if(naechste){
    var nz=Math.floor(n360(lon('Mond',naechste.jd))/30);
    var tage=Math.max(0,Math.round(naechste.jd-jd));
    var hs=P?((Math.floor(lon('Mond',naechste.jd)/30)-Math.floor(P.ASC/30))%12+12)%12+1:0;
    h+='<div class="rb-k">Das steht an</div>'+
      '<div class="rb-gr">'+(naechste.art==='neu'?'Neumond':'Vollmond')+' in '+ZEI[nz][0]+'</div>'+
      '<p>'+tagLang(naechste.jd)+' — '+(tage===0?'heute':(tage===1?'morgen':'in '+tage+' Tagen'))+'.'+
      (P?' Bei dir im '+hs+'. Haus: '+HFELD[hs-1]+'.':'')+'</p>';
    if(!knapp){
      h+='<div class="rb-tu"><b>Bis dahin dahaben</b>'+
        IMMER.concat(BESORGEN[nz]).join(' · ')+
        '<span>Lieber jetzt besorgen als an dem Abend, an dem du es brauchst.</span></div>';
    }
    h+='<a class="rb-link" href="rituale.html">Was dann zu tun ist →</a>';
  }

  /* Zeile mit den Kurzwerten */
  var k=[];
  if(st&&!st.polar){
    k.push({l:'Stunde',w:st.herr,u:'bis '+uhr(st.bis)});
    k.push({l:'Tag',w:st.tagesherr,u:dat(jd).toLocaleDateString('de-DE',{weekday:'long'})});
  }
  var mz2=Math.floor(n360(lon('Mond',jd))/30);
  k.push({l:'Mond',w:ZEI[mz2][0],u:P?('dein '+(((Math.floor(lon('Mond',jd)/30)-Math.floor(P.ASC/30))%12+12)%12+1)+'. Haus'):''});
  if(ol&&ol.leer) k.push({l:'Mond ohne Lauf',w:'ja',u:'bis '+uhr(ol.bis),warn:true});
  if(k.length){
    h+='<div class="rb-reihe">'+k.map(function(x){
      return '<div class="rbk'+(x.warn?' warn':'')+'"><b>'+x.l+'</b>'+esc(x.w)+
        (x.u?'<span>'+esc(x.u)+'</span>':'')+'</div>';
    }).join('')+'</div>';
  }
  if(ol&&ol.leer&&!knapp){
    h+='<div class="rb-warn"><b>Der Mond läuft leer</b> — bis '+tagLang(ol.bis)+
      ' berührt er nichts mehr. Alte Regel: nichts Neues anfangen, Angefangenes gern zu Ende bringen.</div>';
  }
  h+='</div>';

  /* Richtungswechsel — was demnächst wieder direkt läuft */
  if(!knapp){
    var st2=stationen(jd, 150).slice(0,3);
    var rueck=jetztRueck(jd);
    if(st2.length||rueck.length){
      h+='<div class="rb-fakt"><div class="rb-k">Bewegung am Himmel</div>';
      if(rueck.length){
        h+='<p style="margin-bottom:10px;"><b>R\u00FCckl\u00E4ufig gerade:</b> '+rueck.join(', ')+'.</p>';
      }
      h+='<ul class="rb-st">'+st2.map(function(x){
        var tg=Math.round(x.jd-jd);
        var hs=P?((Math.floor(n360(x.lon)/30)-Math.floor(P.ASC/30))%12+12)%12+1:0;
        return '<li><span class="w'+(x.direkt?'':' rueck')+'">'+
          (x.direkt?'wieder direkt':'wird r\u00FCckl\u00E4ufig')+'</span> '+
          '<b>'+x.planet+'</b> am '+tagKurz(x.jd)+' ('+(tg<=0?'heute':'in '+tg+' Tagen')+')'+
          (P?' \u2014 in deinem '+hs+'. Haus: '+HFELD[hs-1]:'')+
          '<span class="s">'+STATIONSATZ[x.planet][x.direkt?0:1]+'</span></li>';
      }).join('')+'</ul></div>';
    }
  }

  /* Fakt des Tages — wechselt täglich */
  if(!knapp){
    var f=fakten(P,jd,st);
    if(f.length){
      var i=Math.floor(jd-0.5)%f.length;
      h+='<div class="rb-fakt"><div class="rb-k">Gut zu wissen</div><p>'+f[i]+'</p></div>';
    }
  }
  return h;
}

window.AC_BOARD={board:board, lunationen:lunationen, fenster:fenster, fakten:fakten,
  stationen:stationen, jetztRueck:jetztRueck};
})();
