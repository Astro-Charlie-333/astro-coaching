/* Der Motor aller Themenraeume.
   Vorher stand dieser Code zwoelfmal da, einmal je Raumseite.
   Die Himmelsrechnung ist hier herausgenommen: sie kommt jetzt
   aus rituale/engine.js, wie auf jeder anderen Seite auch.
   Was bleibt, ist das Bauen der Seite. */
function bauen(){
  var box=document.getElementById('raum');
  var p=null;
  try{ p=window.AC_P?AC_P.aktives():null; }catch(e){}
  if(!p){
    box.innerHTML='<div class="rm-leer"><b>Noch kein Chart hinterlegt.</b><br><br>'+
      'Dieser Raum sortiert sich nach deinem Chart — welche Facetten bei dir laut sind und welche leise. '+
      'Dafür brauche ich einmal deine Geburtsdaten.<br><br><a class="wg-b" href="profile.html" style="display:inline-block;font-family:var(--sans);font-size:15px;border:1px solid var(--nacht);background:var(--nacht);color:#fff;padding:11px 22px;border-radius:22px;text-decoration:none;">Chart anlegen</a></div>';
    return;
  }
  var P=AC_RAUM.chart(p);
  var res=AC_RAUM.auswerten(P, RAUM);
  var voll=AC_P.zeigeNamen();
  
  var h='<div class="rm-sortierung"><h3>'+(RAUM.sortierTitel||'Wo dein Thema bei dir sitzt')+'</h3>'+
    '<div class="hint">'+res.length+' Facetten, gewichtet nach deinem Chart — nach Planeten in den Häusern, Herrscherlage, engen Aspekten und Achsennähe.</div>';
  res.forEach(function(r){
    h+='<div class="rm-bal"><div>'+r.fc.name+'</div>'+
      '<div class="bar"><i class="'+(r.rel<45?'leise':'')+'" style="width:'+Math.max(4,r.rel)+'%"></i></div>'+
      '<div class="pz">'+r.rel+'</div></div>';
  });
  var laut=res.filter(function(r){return r.rel>=62;});
  var leise=res.filter(function(r){return r.rel<45;});
  h+='<div class="rm-fazit"><b>Bei dir '+(laut.length===1?'ist eine Facette':'sind '+laut.length+' Facetten')+' deutlich lauter als der Rest';
  if(laut.length) h+=' — vor allem <b>'+laut[0].fc.name+'</b>';
  h+='.</b> ';
  if(leise.length) h+='Dagegen ist <b>'+leise[leise.length-1].fc.name+'</b> bei dir auffällig ruhig. '+
    'Das ist selbst eine Aussage: Dort liegt dein Thema nicht, auch wenn du dort zuerst gesucht hättest. ';
  h+='Fang oben an. Die unteren kannst du später aufklappen.</div></div>';
  
  res.forEach(function(r,i){
    var texte=AC_RAUM.text(r,P);
    var istLaut=r.rel>=62;
    h+='<details class="fa'+(istLaut?' laut':'')+'"'+(i<2?' open':'')+'>'+
      '<summary><span class="fa-rang">'+(i+1)+'</span><span class="fa-name">'+r.fc.name+'</span>'+
      '<span class="fa-marke '+(istLaut?'laut':'leise')+'">'+(istLaut?'laut bei dir':(r.rel<45?'leise':'mittel'))+'</span></summary>'+
      '<div class="fa-inhalt">'+
      '<div class="fa-frage">'+r.fc.frage+'</div>'+
      (r.fc.worum? '<div class="fa-worum">'+r.fc.worum+'</div>' : '');
    h+='<div class="fa-visuell">'+
      (window.AC_RAUM&&AC_RAUM.miniRad? AC_RAUM.miniRad(P,r.fc.anker,r.f,r.rel):'')+
      '<div class="fa-vtext"><b>'+r.fc.name+'</b><p>'+r.fc.frage+'</p>'+
      '<div class="fa-vchips">'+
        (r.f.planeten||[]).slice(0,5).map(function(x){return '<span class="vc">'+x.p+' im '+x.haus+'.</span>';}).join('')+
        (r.f.aspekte||[]).slice(0,2).map(function(x){return '<span class="vc '+(x.art==='hart'?'hart':'weich')+'">'+x.a+' '+x.typ+' '+x.b+'</span>';}).join('')+
        (r.f.achsnah||[]).map(function(x){return '<span class="vc achs">'+x.p+' auf '+x.zu+'</span>';}).join('')+
      '</div></div></div>'+
      '<div class="fa-block"><span class="lab">Und das steht bei dir im Chart</span>';
    if(texte.length) texte.forEach(function(t){ h+='<p>'+t+'</p>'; });
    else h+='<p>Zu dieser Facette findet sich in deinem Chart kein deutlicher Anker. Das heißt nicht, dass das Thema fehlt — nur dass es bei dir nicht strukturell angelegt ist. Wenn es sich trotzdem wichtig anfühlt, kommt es aus der Biografie, nicht aus dem Chart.</p>';
    h+='</div>';
    
    var d=[];
    r.f.planeten.forEach(function(x){ d.push(x.p+' im '+x.haus+'. Haus'); });
    r.f.herrscher.forEach(function(x){ d.push('Herrscher '+x.haus+'. Haus: '+x.p+' im '+x.inHaus+'.'); });
    r.f.aspekte.slice(0,3).forEach(function(x){ d.push(x.a+' '+x.typ+' '+x.b+' '+x.o.toFixed(1)+'°'); });
    r.f.achsnah.forEach(function(x){ d.push(x.p+' auf '+x.zu+'-Grad ('+x.o.toFixed(1)+'°)'); });
    
    var vis={rel:r.rel, haeuser:(r.fc.anker.haeuser||[]),
      planeten:r.f.planeten.map(function(x){return [x.p,x.haus];}),
      herrscher:r.f.herrscher.map(function(x){return [x.haus,x.p,x.inHaus];}),
      aspekte:r.f.aspekte.slice(0,4).map(function(x){return [x.a,x.typ,x.b,+x.o.toFixed(1),x.art];}),
      achsnah:r.f.achsnah.map(function(x){return [x.p,x.zu];})};
    h+='<div class="fa-vis" data-vis=\''+JSON.stringify(vis).replace(/'/g,'&#39;')+'\'></div>';
    if(d.length) h+='<div class="fa-block"><span class="lab">Zum Nachprüfen</span><div class="fa-daten">'+d.join('<br>')+'</div></div>';
    h+='<div class="fa-block"><span class="lab">Was du diese Woche tun kannst</span>'+
      '<div class="fa-ueb"><b>'+r.fc.uebung[0]+'</b><p>'+r.fc.uebung[1]+'</p></div></div>';
    if(r.fc.wozuFrage){
      h+='<div class="fa-wozu"><span class="lab">Und wozu ist das gut?</span>'+
        '<p>'+(r.fc.wozuSchutz||'')+'</p>'+
        '<p class="fa-wozu-f">'+r.fc.wozuFrage+'</p></div>';
    }
    h+=''+
      '<div class="fa-rueck"><div class="rf">'+r.fc.rueckfrage+'</div>'+
      '<div class="fa-wahl" data-f="'+r.fc.id+'"></div></div>';
    h+='<details class="fa-coach"><summary>Für die Arbeit mit anderen — Gesprächsleitfaden</summary>'+
      '<ul>'+r.fc.coach.fragen.map(function(q){return '<li>'+q+'</li>';}).join('')+'</ul>'+
      '<div class="warn"><b>Vorsicht:</b> '+r.fc.coach.vorsicht+'</div></details>';
    h+='</div></details>';
  });
  h+='<div class="tip" style="margin-top:20px;"><b>Wie du diesen Raum benutzt:</b> Nicht alles auf einmal. '+
    'Nimm die oberste Facette, mach die Übung, und komm in ein paar Tagen zur Rückfrage zurück. '+
    'Ein Raum ist kein Text zum Durchlesen, sondern eine Woche Arbeit.</div>';
  box.innerHTML=h;
  
  Array.prototype.forEach.call(box.querySelectorAll('.fa-wahl'),function(w){
    var fid=w.getAttribute('data-f');
    [['ja','Ja'],['teils','Ein bisschen'],['nein','Nein'],['spaeter','Später'] ].forEach(function(o){
      var b=document.createElement('button'); b.type='button'; b.textContent=o[1];
      b.setAttribute('aria-pressed','false');
      b.addEventListener('click',function(){
        Array.prototype.forEach.call(w.children,function(c){c.setAttribute('aria-pressed','false');});
        b.setAttribute('aria-pressed','true');
        try{
          if(window.AC_WEG) AC_WEG.notieren({schluessel:'raum-'+RAUM.slug+'-'+fid,
            titel:RAUM.name+' · '+fid, planet:'', punkt:'', art:'uebung', antwort:o[0], chips:[]});
        }catch(e){}
      });
      w.appendChild(b);
    });
  });
}
/* Kein Aufruf hier: bauen() startet die Seite, sobald RAUM und WOZU
   gesetzt sind und AC_RAUM bereitsteht. Vorher stand hier ein
   Aufruf — der lief los, bevor es einen Raum gab, warf, und brach
   damit den ganzen Block ab. */
/* Nur die Versorgungsseite bringt dieses Element mit; der Block
   prueft das selbst und tut sonst nichts. */
(function(){
  var box=document.getElementById('zeitschiene'); if(!box) return;
  var p=null; try{ p=window.AC_P?AC_P.aktives():null; }catch(e){}
  if(!p){ box.innerHTML='<div class="zs-box"><h3>Wann Struktur bei dir leichter fällt</h3>'+
    '<div class="sub4">Leg unter <a href="profile.html">Profile</a> ein Chart an — dann rechne ich hier aus, '+
    'welche Phasen dir in den nächsten zwölf Monaten entgegenkommen und welche nicht.</div></div>'; return; }
  var ut=p.h+p.mi/60-p.tz,y=p.y,mo=p.mo,d=p.d;
  if(ut<0){ut+=24;d-=1;} if(ut>=24){ut-=24;d+=1;}
  var jd0=jdFromUT(y,mo,d,ut), T0=(jd0-2451545)/36525, a=angles(jd0,p.lat,p.lon);
  var R={Sonne:sunLon(T0),Mond:moonLon(T0),Merkur:geo('Merkur',T0),Venus:geo('Venus',T0),Mars:geo('Mars',T0),
   Saturn:geo('Saturn',T0),ASC:a.asc,MC:a.mc};
  var asc6=(Math.floor(a.asc/30)+5)%12*30+15;   /* Mitte des 6. Hauses */
  function nrm2(x){x=x%360;return x<0?x+360:x;}
  function heute(){var n=new Date();
    return jdFromUT(n.getUTCFullYear(),n.getUTCMonth()+1,n.getUTCDate(),12);}
  function dtxt(j){var dd=new Date((j-2440587.5)*86400000);
    var M=['Jan','Feb','März','Apr','Mai','Juni','Juli','Aug','Sep','Okt','Nov','Dez'];
    return M[dd.getUTCMonth()]+' '+dd.getUTCFullYear();}

  var JN=heute(), funde=[];
  /* Jupiter und Saturn über 6. Haus / Radix-Saturn / Radix-Mond */
  [['Jupiter','leichter','Jupiter berührt deinen Alltagsbereich — Struktur aufzubauen kostet in dieser Phase weniger Überwindung als sonst. Gute Zeit, etwas zu etablieren, das danach von allein läuft.'],
   ['Saturn','schwerer','Saturn berührt deinen Alltagsbereich. Das fühlt sich zäh an und ist trotzdem die haltbarste Phase: Was du hier aufbaust, trägt lange. Erwarte nur keine Leichtigkeit dabei.'],
   ['Uranus','schwerer','Uranus berührt deinen Alltagsbereich — Routinen reißen häufiger ab als sonst. Setz in dieser Zeit auf Wiederaufnehmen statt auf Durchhalten.'],
   ['Neptun','schwerer','Neptun berührt deinen Alltagsbereich. Struktur verschwimmt, du überschätzt leicht, was du schaffst. Weniger vornehmen ist hier kein Rückschritt.']
  ].forEach(function(x){
    var k=x[0], vorher=null;
    for(var t=0;t<400;t+=4){
      var j=JN+t, l=geo(k,(j-2451545)/36525);
      var d1=Math.abs(nrm2(l-asc6+180)-180);
      var nah=(d1<9);
      if(nah&&!vorher) funde.push({jd:j, art:x[1], t:k+' im Alltagsbereich', p:x[2]});
      vorher=nah;
    }
  });
  /* Saturn-Kontakt zum Radix-Mond */
  (function(){
    var vorher=null;
    for(var t=0;t<400;t+=4){
      var j=JN+t, l=geo('Saturn',(j-2451545)/36525);
      var s=Math.abs(nrm2(l-R.Mond+180)-180);
      var nah=[0,90,180].some(function(w){return Math.abs(s-w)<3;});
      if(nah&&!vorher) funde.push({jd:j, art:'schwerer', t:'Saturn auf deinem Mond',
        p:'Eine Phase, in der Versorgung und Selbstfürsorge schwerer fallen und mehr Disziplin verlangen als sonst. Kein guter Zeitpunkt für neue Vorsätze — ein sehr guter, um Bestehendes zu vereinfachen.'});
      vorher=nah;
    }
  })();
  funde.sort(function(x,y){return x.jd-y.jd;});
  funde=funde.slice(0,5);

  var h='<div class="zs-box"><h3>Wann Struktur bei dir leichter fällt</h3>'+
    '<div class="sub4">Aus den kommenden zwölf Monaten. Der Sinn ist nicht Vorhersage, sondern Entlastung: '+
    'Es gibt Phasen, in denen es objektiv zäher läuft — und dann bist du nicht faul, sondern in einer zähen Phase.</div>';
  if(!funde.length) h+='<p style="margin:0;font-size:15px;line-height:1.65;">In den nächsten zwölf Monaten berührt '+
    'kein langsamer Planet deinen Alltagsbereich. Das heißt: keine besonderen Hürden, aber auch kein Rückenwind — '+
    'es liegt ganz bei dir und deinen Mechanismen.</p>';
  else funde.forEach(function(x){
    h+='<div class="zs-z '+x.art+'"><div class="zs-dat">ab '+dtxt(x.jd)+'<br><span style="color:var(--leise)">'+
      (x.art==='leichter'?'leichter':'zäher')+'</span></div><div><b>'+x.t+'</b><p>'+x.p+'</p></div></div>';
  });
  h+='<div class="zs-fuss">Das sind grobe Zeiträume, keine Termine — langsame Planeten wirken über Monate. '+
    'Und sie beschreiben Tendenzen, nicht Schicksal: In einer zähen Phase geht trotzdem etwas, es fühlt sich nur teurer an.</div></div>';
  box.innerHTML=h;
})();
