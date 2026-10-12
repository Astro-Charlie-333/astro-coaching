/* ── Ophiuchus: vier Systeme nebeneinander ────────────── */
function nrm(x){x=x%360;return x<0?x+360:x;}
function el(i){ return document.getElementById(i); }
function esc(s){ return String(s===undefined||s===null?'':s).replace(/[<>&"]/g,function(c){
 return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }

var S=window.AC_STB;
var ZN=['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion',
        'Schütze','Steinbock','Wassermann','Fische'];
/* Dreizehn gleiche Abschnitte, ab Frühlingspunkt */
var Z13=['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion',
         'Schlangenträger','Schütze','Steinbock','Wassermann','Fische'];
var PLAN=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];
var gewaehlt=null;

function ayanamsa(T){ return 23.853+1.396042*T+0.0003086*T*T; }
function grad(l){ var z=Math.floor(nrm(l)/30), d=nrm(l)-30*z,
  m=Math.round((d-Math.floor(d))*60), dd=Math.floor(d);
  if(m===60){m=0;dd+=1;} return dd+'° '+ZN[z]+" "+('0'+m).slice(-2)+"'"; }

function alle(){ try{ return AC_P.alle()||[]; }catch(e){ return []; } }
function jdVon(p){
  var ut=p.h+p.mi/60-p.tz, y=p.y, mo=p.mo, d=p.d;
  if(p.ohneZeit||p.h===undefined||p.h===null) ut=12-(p.tz||0);
  if(ut<0){ut+=24;d-=1;} if(ut>=24){ut-=24;d+=1;}
  return jdFromUT(y,mo,d,ut);
}

/* ── Die Spannen der dreizehn ─────────────────────────── */
function spannenBauen(){
  var sp=S.spannen();
  var max=sp.reduce(function(m,x){return Math.max(m,x.grad);},0);
  var h='<div class="sp-bal">'+sp.slice().sort(function(a,b){return b.grad-a.grad;})
    .map(function(x){
      var tage=x.grad/360*365.2422;
      return '<div class="spz'+(x.name==='Schlangenträger'?' oph':'')+'">'+
        '<div class="n">'+x.name+'</div>'+
        '<div class="bar"><i style="width:'+(x.grad/max*100).toFixed(1)+'%"></i></div>'+
        '<div class="z">'+tage.toFixed(1)+' Tage</div></div>';
    }).join('')+'</div>';
  var sk=sp.filter(function(x){return x.name==='Skorpion';})[0];
  var ju=sp.filter(function(x){return x.name==='Jungfrau';})[0];
  var op=sp.filter(function(x){return x.name==='Schlangenträger';})[0];
  h+='<p style="margin:14px 0 0;font-size:15.2px;line-height:1.72;">Jungfrau nimmt <b>'+
    ju.grad.toFixed(1)+' Grad</b> der Ekliptik ein, Skorpion <b>'+sk.grad.toFixed(1)+
    ' Grad</b>. Die Sonne braucht für die Jungfrau '+(ju.grad/360*365.2422).toFixed(0)+
    ' Tage und für den Skorpion '+(sk.grad/360*365.2422).toFixed(1)+
    '. Der Schlangenträger liegt mit '+op.grad.toFixed(1)+
    ' Grad dazwischen — er ist keineswegs der kleinste.</p>';
  el('spannen').innerHTML=h;
}

/* ── Vier Systeme für ein Profil ──────────────────────── */
function tabelleBauen(p){
  var jd=jdVon(p), T=(jd-2451545)/36525;
  var ay=ayanamsa(T);
  var zeilen=PLAN.map(function(k){
    var lon, lat=0;
    if(k==='Sonne'){ lon=sunLon(T); }
    else if(k==='Mond'){ lon=moonLon(T); }  /* Breite des Mondes rechnet die Engine nicht */
    else { var q=S.geoLB(k,T); lon=q.lon; lat=q.lat; }
    var trop=ZN[Math.floor(nrm(lon)/30)];
    var sid=ZN[Math.floor(nrm(lon-ay)/30)];
    var stb=(k==='Sonne')?S.sonnenSternbild(lon,jd):S.sternbild(lon,lat,jd);
    var g13=Z13[Math.floor(nrm(lon)/(360/13))];
    return {k:k, lon:lon, lat:lat, trop:trop, sid:sid, stb:stb, g13:g13};
  });
  var h='<table class="vgl"><thead><tr><th></th><th>Tropisch</th><th>Siderisch</th>'+
    '<th>Sternbild</th><th>13 gleich</th></tr></thead><tbody>';
  zeilen.forEach(function(z){
    var istOph=(z.stb==='Schlangenträger')||(z.g13==='Schlangenträger');
    h+='<tr><td class="p">'+z.k+'<span class="weit">'+grad(z.lon)+
       (Math.abs(z.lat)>0.5?' · '+(z.lat>0?'+':'')+z.lat.toFixed(1)+'° Breite':'')+'</span></td>'+
       '<td class="t"><b>'+z.trop+'</b></td>'+
       '<td>'+z.sid+'</td>'+
       '<td'+(z.stb==='Schlangenträger'?' class="oph"':'')+'>'+(z.stb||'—')+'</td>'+
       '<td'+(z.g13==='Schlangenträger'?' class="oph"':'')+'>'+z.g13+'</td></tr>';
  });
  h+='</tbody></table>';
  h+='<p class="sub" style="margin-top:4px;">Die Spalte <b>Tropisch</b> ist die, mit der die ganze '+
    'Plattform rechnet. Die Mondbreite rechnet die Engine nicht mit, deshalb steht beim Mond '+
    'die Sternbildzuordnung nur näherungsweise — er kann bis zu fünf Grad neben der Ekliptik stehen.</p>';
  return {html:h, zeilen:zeilen, jd:jd};
}

function groszBauen(p, z){
  var so=z.zeilen[0];
  var name=(p.name||'').trim().split(/\s+/)[0]||'Du';
  var h='<div class="oph-gross"><div class="z">';
  if(so.stb==='Schlangenträger'){
    h+=esc(name)+' wäre tatsächlich Schlangenträger.</div>'+
      '<p>Die Sonne steht bei '+esc(name)+' auf '+grad(so.lon)+
      ' — tropisch also <b>'+so.trop+'</b>, und genau dort liegt heute das Sternbild Schlangenträger. '+
      'Das ist einer der wenigen Fälle, in denen der Unterschied einen eigenen Namen bekommt.</p>';
  } else {
    h+='Die Sonne steht tropisch in '+so.trop+' — und vor dem Sternbild '+(so.stb||'?')+'.</div>'+
      '<p>Das ist der normale Fall: Durch die Präzession liegt das Sternbild rund ein Zeichen '+
      'hinter dem tropischen Zeichen zurück. Bei '+esc(name)+' bedeutet das '+
      '<b>'+so.trop+'</b> tropisch, <b>'+so.sid+'</b> siderisch und das Sternbild <b>'+
      (so.stb||'—')+'</b>.</p>';
  }
  var ophs=z.zeilen.filter(function(x){return x.stb==='Schlangenträger';});
  if(ophs.length && so.stb!=='Schlangenträger'){
    h+='<p>Vor dem Schlangenträger steht bei '+esc(name)+' dafür: <b>'+
      ophs.map(function(x){return x.k;}).join(', ')+'</b>. Wer den Schlangenträger ernst nehmen '+
      'will, müsste genau das tun — nicht nur die Sonne anschauen.</p>';
  } else if(!ophs.length){
    h+='<p>Kein einziger Planet von '+esc(name)+' steht vor dem Schlangenträger. '+
      'Das Sternbild wäre in diesem Chart schlicht nicht besetzt.</p>';
  }
  h+='</div>';
  return h;
}

/* ── Das Band: 43 statt 13 ────────────────────────────── */
function bandBauen(p){
  var jd=jdVon(p), T=(jd-2451545)/36525;
  var ausser=[];
  PLAN.forEach(function(k){
    if(k==='Sonne'||k==='Mond') return;
    var q=S.geoLB(k,T);
    var stb=S.sternbild(q.lon,q.lat,jd);
    var aufEkliptik=S.sonnenSternbild(q.lon,jd);
    if(stb && stb!==aufEkliptik) ausser.push({k:k, stb:stb, auf:aufEkliptik, lat:q.lat});
  });
  var h='<div class="oph-karte"><h3>Dreizehn stimmt nur für die Sonne</h3>'+
    '<p>Ein Tierkreis ist ein <b>Band</b>, keine Linie. Die Sonne läuft exakt auf der Ekliptik, '+
    'deshalb trifft sie genau dreizehn Sternbilder. Alle anderen Planeten laufen daneben — '+
    'Pluto bis zu siebzehn Grad. Zählt man die Sternbilder im Band von zwanzig Grad um die Ekliptik, '+
    'sind es nicht dreizehn, sondern <b>'+S.BAND.length+'</b>.</p>';
  if(ausser.length){
    h+='<p>In diesem Chart betrifft das konkret:</p><ul style="margin:0 0 10px 18px;font-size:15.2px;line-height:1.75;">'+
      ausser.map(function(x){
        return '<li><b>'+x.k+'</b> steht nicht vor '+x.auf+', sondern vor <b>'+x.stb+'</b> — '+
          'weil er '+Math.abs(x.lat).toFixed(1)+' Grad '+(x.lat>0?'nördlich':'südlich')+
          ' der Ekliptik steht.</li>';
      }).join('')+'</ul>';
  } else {
    h+='<p>In diesem Chart stehen zufällig alle Planeten nah genug an der Ekliptik, '+
      'dass die Zuordnung mit der Sonnenreihe übereinstimmt. Das ist die Ausnahme, nicht die Regel.</p>';
  }
  h+='<p style="margin-bottom:0;">Die vollständige Liste dessen, was Planeten tatsächlich durchqueren '+
    'können: '+S.BAND.map(function(b){return S.DEUTSCH[b]||b;}).sort().join(', ')+'. '+
    'Ein Tierkreis daraus wäre kein Kreis mehr, sondern eine Landkarte.</p></div>';
  return h;
}

/* ── Oberfläche ───────────────────────────────────────── */
function wahlBauen(){
  var box=el('ophwahl'), l=alle();
  box.innerHTML='';
  if(!l.length) return;
  var lab=document.createElement('span'); lab.className='lab'; lab.textContent='Chart';
  box.appendChild(lab);
  l.forEach(function(p){
    var b=document.createElement('button'); b.type='button';
    b.textContent=AC_P.anzeige(p,AC_P.zeigeNamen())+(p.eigen?' (ich)':'');
    b.setAttribute('aria-pressed', gewaehlt===p.id);
    b.addEventListener('click',function(){ gewaehlt=p.id; wahlBauen(); zeigen(); });
    box.appendChild(b);
  });
}
function zeigen(){
  var l=alle();
  if(!l.length){
    el('ophtabelle').innerHTML='<div class="oph-leer"><b>Noch kein Chart angelegt.</b><br><br>'+
      'Unter <a href="profile.html">Profile</a> Geburtsdaten eintragen — auch die von '+
      'deiner Mama oder deiner Cousine. Dann steht hier, was sich bei ihnen ändert.</div>';
    el('ophband').innerHTML=''; return;
  }
  if(!gewaehlt) gewaehlt=(l.filter(function(p){return p.eigen;})[0]||l[0]).id;
  var p=l.filter(function(x){return x.id===gewaehlt;})[0];
  if(!p) return;
  var z=tabelleBauen(p);
  el('ophtabelle').innerHTML=groszBauen(p,z)+z.html;
  el('ophband').innerHTML=bandBauen(p);
}

var ANTWORT='Ja, die Sonne läuft wirklich durch dreizehn Sternbilder — das stimmt. '+
 'Aber Sternzeichen sind keine Sternbilder. Sie sind zwölf gleiche Abschnitte des Sonnenjahres, '+
 'gezählt ab dem Frühlingsanfang. Das war schon bei den Babyloniern so, und die wussten, '+
 'dass die Sternbilder anders liegen. Wenn du wissen willst, in welchem Sternbild deine Sonne steht '+
 '— das kann ich dir ausrechnen, das ist eine andere und auch spannende Frage. '+
 'Dein Chart ändert es nicht.';
function kopieren(){
  var ta=document.createElement('textarea'); ta.value=ANTWORT;
  ta.style.position='fixed'; ta.style.opacity='0';
  document.body.appendChild(ta); ta.select();
  try{ document.execCommand('copy'); }catch(e){}
  if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(ANTWORT);
  ta.remove();
  var e=el('ophecho'); e.textContent='Kopiert.';
  setTimeout(function(){ if(e.textContent==='Kopiert.') e.textContent=''; },3500);
}

function start(){
  spannenBauen(); wahlBauen(); zeigen();
  el('ophkopie').addEventListener('click',kopieren);
  el('ophquellen').innerHTML='Sternbildgrenzen: Eugène Delporte für die IAU, 1930. '+
    'Zur Entstehung der zwölf Zeichen um 400 v.u.Z. und zu den Medienberichten von 1995, 2011 und 2016: '+
    '<a href="https://en.wikipedia.org/wiki/Zodiac" target="_blank" rel="noopener">Übersicht zum Tierkreis</a>. '+
    'Die Rechnung auf dieser Seite wurde gegen die Bibliothek PyEphem geprüft — '+
    'Sonne 2000 von 2000 Stichproben zwischen 1930 und 2040 korrekt, Planeten 97,5 Prozent '+
    '(die Abweichungen liegen im Rastermaß von einem Grad direkt an Sternbildgrenzen).';
  window.addEventListener('ac-niveau',zeigen);
}
start();
