/* Astro-Charlie · Dossier — Rechnung und Darstellung */
function nrm(x){x=x%360;return x<0?x+360:x;}
function el(i){ return document.getElementById(i); }
function esc(s){ return String(s===undefined||s===null?'':s).replace(/[<>&"]/g,function(c){
 return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]; }); }
function kz(x,n){ return x.toFixed(n===undefined?1:n).replace('.',','); }
function zi(l){ return Math.floor(nrm(l)/30); }
function fmt(l){ l=nrm(l); var r=l-Math.floor(l/30)*30, g=Math.floor(r), m=Math.round((r-g)*60);
 if(m===60){g++;m=0;} return g+'° '+SIGNS[zi(l)]+' '+(m<10?'0':'')+m+'′'; }
function elemVon(z){ return ELN[z%4]; }

/* Genus, damit „Venus … er" nicht passiert */
var PRON={Sonne:'sie',Mond:'er',Merkur:'er',Venus:'sie',Mars:'er',Jupiter:'er',
 Saturn:'er',Uranus:'er',Neptun:'er',Pluto:'er',Chiron:'er',Lilith:'sie'};

function wuerde(pl,z){
  var d=DOMIZIL[pl];
  if(d&&d.indexOf(z)>=0) return 'domizil';
  if(ERHOEHUNG[pl]===z) return 'erhoehung';
  var ex=!!(d&&d.indexOf((z+6)%12)>=0), fa=(ERHOEHUNG[pl]===((z+6)%12));
  if(ex&&fa) return 'exilfall';
  return ex?'exil':(fa?'fall':'');
}

/* ── Chart ────────────────────────────────────────────────── */
function chartVon(p){ return AC_RAUM.chart(p); }
function haus(P,l){ return ((Math.floor(nrm(l)/30)-Math.floor(nrm(P.ASC)/30))%12+12)%12+1; }
function zeichenDesHauses(P,h){ return (Math.floor(nrm(P.ASC)/30)+h-1)%12; }

var WINKEL=[[0,'Konjunktion','weich'],[180,'Opposition','hart'],[90,'Quadrat','hart'],
 [120,'Trigon','weich'],[60,'Sextil','weich']];
function aspekt(P,a,b,orb){
  if(P[a]===undefined||P[b]===undefined||P[a]===null||P[b]===null) return null;
  var d=Math.abs(nrm(P[a]-P[b])); if(d>180) d=360-d;
  for(var i=0;i<WINKEL.length;i++){
    var W=WINKEL[i], o=Math.abs(d-W[0]), max=(W[0]===60?Math.min(orb||6,5):(orb||6));
    if(o<=max) return {typ:W[1],art:W[2],o:o};
  }
  return null;
}

/* ── Zustand: Profil, Bezug ───────────────────────────────── */
var gewaehlt=null, bezug='klientin';
var SCHL='ac_dossier_bezug';           /* {profilId: bezugsschlüssel} */

function bezugLesen(){
  try{ return JSON.parse(localStorage.getItem(SCHL))||{}; }catch(e){ return {}; }
}
function bezugSchreiben(pid,b){
  try{ var d=bezugLesen(); d[pid]=b; localStorage.setItem(SCHL,JSON.stringify(d)); }catch(e){}
}
function profil(){
  var alle=[]; try{ alle=AC_P.alle()||[]; }catch(e){}
  if(!alle.length) return null;
  if(!gewaehlt){ var e=alle.filter(function(p){return p.eigen;})[0]||alle[0]; gewaehlt=e.id; }
  return alle.filter(function(x){return x.id===gewaehlt;})[0]||null;
}
/* Bezug: gespeicherte Wahl, sonst „du selbst" fürs eigene Profil,
   sonst die Rolle aus beziehung.html, sonst Klientin */
function bezugFuer(p){
  if(!p) return 'klientin';
  var d=bezugLesen();
  if(d[p.id] && BEZUG[d[p.id]]) return d[p.id];
  if(p.eigen) return 'selbst';
  try{
    var r=JSON.parse(localStorage.getItem('ac_rolle_profile')||'{}')[p.id];
    if(r && BEZUG[r]) return r;
    if(r==='freundschaft') return 'freundin';
    if(r==='kollegin') return 'kollegin';
  }catch(e){}
  return 'klientin';
}

/* ── Kopf ─────────────────────────────────────────────────── */
function bauKopf(P,p,B){
  var nm=AC_P.anzeige(p,AC_P.zeigeNamen());
  var zS=zi(P.Sonne), zM=zi(P.Mond), zA=zi(P.ASC);
  var hp=HERR[zA], hpH=(P[hp]!==undefined)?haus(P,P[hp]):null;
  var h='<div class="do-kopf"><div class="lab">Bestandsbericht · '+esc(B.n)+'</div>'+
    '<h2>'+esc(nm)+'</h2>'+
    '<div class="dat">'+p.d+'.'+p.mo+'.'+p.y+' · '+('0'+p.h).slice(-2)+':'+('0'+p.mi).slice(-2)+
      ' · '+esc(p.ort||'')+'</div>'+
    '<div class="do-drei">'+
     '<div class="do-d"><div class="k">Sonne · Antrieb</div><div class="v">'+SIGNS[zS]+'</div>'+
       '<div class="z">'+haus(P,P.Sonne)+'. Haus · '+HK[haus(P,P.Sonne)-1]+'</div></div>'+
     '<div class="do-d"><div class="k">Mond · Bedürfnis</div><div class="v">'+SIGNS[zM]+'</div>'+
       '<div class="z">'+haus(P,P.Mond)+'. Haus · '+HK[haus(P,P.Mond)-1]+'</div></div>'+
     '<div class="do-d"><div class="k">Aszendent · Wirkung</div><div class="v">'+SIGNS[zA]+'</div>'+
       '<div class="z">Herrscher '+hp+(hpH?' im '+hpH+'.':'')+'</div></div>'+
    '</div></div>';
  return h;
}

/* ── 0 · Deine Stellung ───────────────────────────────────── */
function bauStellung(B){
  var S=STELLUNG[B.klasse];
  return '<div class="do-ab do-stellung"><h3>Deine Stellung</h3>'+
   '<div class="sub7">Bevor irgendetwas gedeutet wird: was dein Verhältnis zu dieser Person dir erlaubt — und wo es endet.</div>'+
   '<p class="bist">'+S.bist+'</p>'+
   '<div class="do-zwei">'+
    '<div class="dk gut"><b>Du darfst</b>'+S.darfst+'</div>'+
    '<div class="dk warn"><b>Du darfst nicht</b>'+S.nicht+'</div>'+
   '</div>'+
   '<div class="dk voll"><b>Die typische Entgleisung</b>'+S.gefahr+'</div></div>';
}

/* ── 1 · Wie die Person gebaut ist ────────────────────────── */
function bauBau(P,B){
  var zS=zi(P.Sonne), zM=zi(P.Mond), zA=zi(P.ASC);
  var hp=HERR[zA], hpH=(P[hp]!==undefined)?haus(P,P[hp]):null;
  var hpZ=(P[hp]!==undefined)?zi(P[hp]):null, hpW=(hpZ!==null)?wuerde(hp,hpZ):'';

  var gew={Sonne:3,Mond:3,ASC:3,MC:2,Merkur:2,Venus:2,Mars:2,Jupiter:1.5,Saturn:1.5,
   Uranus:1,Neptun:1,Pluto:1};
  var e=[0,0,0,0], m=[0,0,0];
  Object.keys(gew).forEach(function(k){ if(P[k]===undefined||P[k]===null) return;
    var z=zi(P[k]); e[z%4]+=gew[k]; m[z%3]+=gew[k]; });
  var eMax=e.indexOf(Math.max.apply(null,e)), eMin=e.indexOf(Math.min.apply(null,e));
  var mMax=m.indexOf(Math.max.apply(null,m));

  /* Lage: eckig / folgend / fallend */
  var lz={eckig:0,folgend:0,fallend:0};
  ['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'].forEach(function(k){
    if(P[k]===undefined||P[k]===null) return;
    var hh=haus(P,P[k]);
    if([1,4,7,10].indexOf(hh)>=0) lz.eckig++;
    else if([2,5,8,11].indexOf(hh)>=0) lz.folgend++;
    else lz.fallend++;
  });
  var lMax=Object.keys(lz).sort(function(a,b){return lz[b]-lz[a];})[0];

  var ELT=['geht voran, braucht Tempo und verbraucht sich, wenn nichts passiert',
   'braucht Greifbares und Verlässlichkeit; Ideen ohne Umsetzung machen unruhig',
   'denkt und redet, bevor gefühlt wird — Austausch ist kein Luxus, sondern Bedarf',
   'nimmt auf, was im Raum ist, auch Unausgesprochenes'];
  var MOT=['startet gern und verliert schnell die Lust',
   'braucht lange zum Anfangen und ist dann kaum zu stoppen',
   'passt sich an und wechselt die Richtung, bevor es eng wird'];

  var h='<div class="do-ab"><h3>Wie diese Person gebaut ist</h3>'+
   '<div class="sub7">Die Grundanlage — als Einstieg, nicht als Urteil.</div>'+
   '<p><b>Grundton '+ELN[eMax]+', '+MON[mMax]+'.</b> Die Person '+ELT[eMax]+'. Und sie '+MOT[mMax]+'. '+
   'Am wenigsten ausgeprägt ist <b>'+ELN[eMin]+'</b> — die Qualität, die sie sich bewusst holen muss, '+
   'weil sie nicht von allein kommt.</p>'+
   '<p><b>Gewicht '+LAGE[lMax].n+'.</b> '+LAGE[lMax].t+'</p>';

  /* Chartherrscher, mit Würde */
  h+='<p><b>Chart-Herrscher '+hp+'</b>'+(hpH?' im '+hpH+'. Haus ('+HT[hpH-1]+')':'')+
   (hpW?', <span class="ac-tech">'+WNAME[hpW]+'</span>':'')+'. '+
   'Das ist der Steuermann: Alles läuft praktisch über '+(hpH?HK[hpH-1]:'diesen Punkt')+'. '+
   'Wenn du nicht weißt, wo du ansetzen sollst — dort.'+
   (hpW?' Und '+PRON[hp]+' '+WDEUT[hpW]+'.':'')+'</p>';

  /* Sonne, Mond, Aszendent im Klartext */
  h+='<div class="do-zeilen">'+
   '<div class="dz"><span class="p">Sonne in '+SIGNS[zS]+'</span><span class="t">Will: '+SONNE[zS]+'</span></div>'+
   '<div class="dz"><span class="p">Mond in '+SIGNS[zM]+'</span><span class="t">Braucht: '+MOND[zM]+'</span></div>'+
   '<div class="dz"><span class="p">Aszendent '+SIGNS[zA]+'</span><span class="t">Wirkt '+ASZ[zA]+'</span></div>'+
   '</div>';
  var ab=Math.abs(nrm(P.Sonne-P.ASC)); if(ab>180) ab=360-ab;
  if(ab>100) h+='<p class="do-hin">'+ASZ_SONNE+'</p>';

  /* Sekte */
  var tag=(haus(P,P.Sonne)>=7), S=tag?SEKTE.tag:SEKTE.nacht;
  var raus=S.raus, rH=(P[raus]!==undefined)?haus(P,P[raus]):null;
  h+='<p class="ac-tech"><b>'+S.n+'.</b> '+S.t+
   (rH?' Bei dieser Person steht '+raus+' im '+rH+'. Haus — '+HT[rH-1]+'.':'')+'</p>';

  /* Mondphase */
  var ph=PHASE[Math.floor(nrm(P.Mond-P.Sonne)/45)];
  h+='<p><b>Mondphase bei der Geburt: '+ph[0]+'.</b> Diese Person '+ph[1]+'</p>';
  h+='</div>';
  return h;
}

/* ── 2 · Umgang: Merkur, Venus, Mars ──────────────────────── */
function bauUmgang(P,B){
  var h='<div class="do-ab"><h3>Umgang</h3>'+
   '<div class="sub7">Drei Stellungen, die im Alltag mehr entscheiden als das Sonnenzeichen: '+
   'wie man redet, woran man Zuneigung erkennt, und wie Wut aussieht.</div><div class="do-zeilen">';
  [['Merkur','Reden',MERKUR],['Venus','Mag etwas',VENUS],['Mars','Wird wütend',MARS]].forEach(function(x){
    if(P[x[0]]===undefined) return;
    var z=zi(P[x[0]]), w=wuerde(x[0],z);
    h+='<div class="dz"><span class="p">'+x[0]+' in '+SIGNS[z]+
      (w?' <i class="ac-tech">'+WNAME[w]+'</i>':'')+'</span>'+
      '<span class="t"><b>'+x[1]+':</b> '+x[2][z]+'</span></div>';
  });
  h+='</div>';
  /* Mond, im Licht des Bezugs */
  var MB=MOND_BEZUG[B.klasse], MT=MOND_TUN[B.klasse][elemVon(zi(P.Mond))];
  h+='<div class="do-mond"><div class="k">Der Mond — in diesem Verhältnis '+MB.ist+'</div>'+
   '<p>'+MB.t+'</p>'+
   /* Nicht kleinschreiben — die Tafel beginnt mit Substantiven. */
   '<p><b>'+SIGNS[zi(P.Mond)]+', '+haus(P,P.Mond)+'. Haus ('+HT[haus(P,P.Mond)-1]+').</b> '+
   'Was hier Sicherheit schafft: '+MOND[zi(P.Mond)]+'</p>'+
   '<div class="tun"><b>Also konkret</b>'+MT+'</div></div>';
  h+='</div>';
  return h;
}

/* ── 3 · Kernthemen, nach Bezug gewichtet ─────────────────── */
function bauThemen(P,B){
  var G=GEWICHT[B.klasse];
  var def={facetten:THEMEN.map(function(t){ return {name:t.n, anker:t.anker}; })};
  var res=[];
  try{ res=AC_RAUM.auswerten(P, def); }catch(e){ return ''; }
  /* Umgewichten: Häuser und Planeten, die dieser Bezug trägt, zählen mehr */
  res.forEach(function(r){
    var t=THEMEN.filter(function(x){return x.n===r.fc.name;})[0];
    var f=1;
    (t.anker.haeuser||[]).forEach(function(hh){ if(G.haus[hh]) f=Math.max(f,G.haus[hh]); });
    (t.anker.punkte||[]).forEach(function(pt){ if(G.punkt[pt]) f=Math.max(f,G.punkt[pt]); });
    r.sB=r.s*f; r.faktor=f; r.t=t;
  });
  res.sort(function(a,b){ return b.sB-a.sB; });
  var max=res.length?res[0].sB:1;
  res.forEach(function(r){ r.relB=max?Math.round(r.sB/max*100):0; });

  var h='<div class="do-ab"><h3>Kernthemen</h3>'+
   '<div class="sub7">Gewichtet nach Planeten in den Häusern, Herrscherlage, engen Aspekten und Achsennähe — '+
   'und dann noch einmal danach, in welchem Verhältnis du zu dieser Person stehst.</div>'+
   '<div class="do-warum"><b>Umgewichtet für „'+esc(B.n)+'"</b>'+G.warum+'</div>';
  res.slice(0,7).forEach(function(r){
    h+='<div class="do-bal"><div>'+r.t.n+(r.faktor>1?' <i class="hoch" title="durch den Bezug höher gewichtet">↑</i>':'')+
      '</div><div class="bar"><i class="'+(r.relB<45?'leise':'')+'" style="width:'+Math.max(4,r.relB)+'%"></i></div>'+
      '<div class="pz">'+r.relB+'</div></div>';
  });
  h+='</div>';
  res.slice(0,3).forEach(function(r,i){
    var bel=[];
    (r.f.planeten||[]).slice(0,4).forEach(function(y){ bel.push(y.p+' im '+y.haus+'.'); });
    (r.f.aspekte||[]).slice(0,2).forEach(function(y){ bel.push(y.a+' '+y.typ+' '+y.b+' '+kz(y.o)+'°'); });
    (r.f.achsnah||[]).slice(0,2).forEach(function(y){ bel.push(y.p+' auf '+y.zu); });
    h+='<div class="do-kern"><div class="nr">Kernthema '+(i+1)+' · Gewicht '+r.relB+
      (r.faktor>1?' · durch den Bezug angehoben':'')+'</div>'+
      '<div class="tt">'+r.t.n+'</div><p>'+r.t.kern+'</p>'+
      /* Die Hinweise sind aus der Coaching-Praxis geschrieben. In privaten
         Bezügen bleiben sie brauchbar, aber sie heißen dann nicht „arbeiten". */
      '<p><b>'+({klientin:'Wie du hier arbeitest:',selbst:'Dein Hebel:'}[B.klasse]
        ||'Der Hebel — aus der Coaching-Praxis, auch privat brauchbar:')+'</b> '+r.t.hilfe+'</p>'+
      (bel.length?'<div class="bel ac-tech">'+bel.join(' · ')+'</div>':'')+
      ' <a href="'+r.t.s+'">Raum öffnen →</a></div>';
  });
  return h;
}

/* ── 4 · Die Häuser, die euch verbinden ───────────────────── */
function bauHaeuser(P,B){
  var h='<div class="do-ab"><h3>Die Häuser, die euer Verhältnis tragen</h3>'+
   '<div class="sub7">Nicht jedes Haus geht dich etwas an. Diese schon — sie sind es, '+
   'in denen sich ein Verhältnis dieser Art abspielt.</div><div class="do-haeuser">';
  B.haus.forEach(function(hh){
    var z=zeichenDesHauses(P,hh), hr=HERR[z], hrH=(P[hr]!==undefined)?haus(P,P[hr]):null;
    var drin=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto','Chiron','Lilith']
      .filter(function(k){ return P[k]!==undefined&&P[k]!==null&&haus(P,P[k])===hh; });
    h+='<div class="dh"><div class="nr">'+hh+'. Haus</div>'+
      '<div class="na">'+HT[hh-1]+'</div>'+
      '<div class="ze">'+GLY[z]+' '+SIGNS[z]+' · Herrscher '+hr+(hrH?' im '+hrH+'.':'')+'</div>'+
      '<div class="be">'+(drin.length?drin.join(', '):'<i>leer — läuft über '+hr+' im '+(hrH||'?')+'. Haus</i>')+'</div>'+
      '</div>';
  });
  h+='</div>';
  /* Die Planeten, über die dieser Bezug läuft */
  var pz=[];
  B.punkte.forEach(function(k){
    if(P[k]===undefined||P[k]===null) return;
    var z=zi(P[k]), w=(k==='ASC')?'':wuerde(k,z);
    pz.push('<li><b>'+k+' in '+SIGNS[z]+'</b>'+(k!=='ASC'?', '+haus(P,P[k])+'. Haus':'')+
      (w?' <span class="ac-tech">— '+WNAME[w]+', '+PRON[k]+' '+WDEUT[w]+'</span>':'')+'</li>');
  });
  if(pz.length) h+='<p style="margin-top:14px"><b>Über diese Stellungen läuft bei „'+esc(B.n)+
    '" das Verhältnis:</b></p><ul class="do-li">'+pz.join('')+'</ul>';
  h+='</div>';
  return h;
}

/* ── 5 · Wo es klemmt — Saturn und Chiron, je nach Bezug ──── */
function bauKlemmt(P,B){
  var hs=haus(P,P.Saturn), zs=zi(P.Saturn), ws=wuerde('Saturn',zs);
  var h='<div class="do-ab"><h3>Wo es klemmt</h3>'+
   '<div class="sub7">Saturn, Chiron und die engsten harten Aspekte — gelesen für dein Verhältnis zu dieser Person.</div>'+
   '<div class="do-stell"><span class="p">Saturn in '+SIGNS[zs]+'</span>'+
     '<span class="f">'+hs+'. Haus · '+HT[hs-1]+'</span>'+
     (ws?'<span class="o ac-tech">'+WNAME[ws]+'</span>':'')+'</div>'+
   '<p>'+SATURN_BEZUG[B.klasse]+'</p>'+
   '<p class="ac-tech">Sachlich: Der Beweisdruck sitzt in '+HT[hs-1]+'. Was diese Person dort tut, '+
   'macht sie gründlich und selten mit dem Gefühl, dass es reicht.</p>';

  if(P.Chiron!==undefined&&P.Chiron!==null){
    var hc=haus(P,P.Chiron);
    h+='<div class="do-stell"><span class="p">Chiron in '+SIGNS[zi(P.Chiron)]+'</span>'+
      '<span class="f">'+hc+'. Haus · '+HT[hc-1]+'</span></div>'+
      '<p>'+CHIRON_BEZUG[B.klasse]+'</p>';
  }
  var hart=[];
  ['Sonne','Mond','Merkur','Venus','Mars'].forEach(function(a){
    ['Saturn','Pluto','Uranus','Neptun'].forEach(function(b){
      var x=aspekt(P,a,b,6);
      if(x&&x.art==='hart'&&x.o<3.5) hart.push({a:a,b:b,x:x});
    });
  });
  hart.sort(function(u,v){return u.x.o-v.x.o;});
  if(hart.length){
    var HD={Saturn:'Druck und Begrenzung',Pluto:'Macht und Intensität',
     Uranus:'Unruhe und Abbruch',Neptun:'Unschärfe und Auflösung'};
    h+='<p><b>Die engsten Spannungen:</b> '+hart.slice(0,3).map(function(y){
      return y.a+' '+y.x.typ+' '+y.b+' <span class="ac-grad">('+kz(y.x.o)+'°)</span> — '+HD[y.b]+' trifft auf '+y.a;
    }).join('; ')+'. Diese Achsen lösen sich nicht auf. Die Arbeit besteht darin, beide Seiten '+
    'abwechselnd zu bedienen, statt eine gewinnen zu lassen.</p>';
  }
  h+='</div>';
  return h;
}

/* ── 6 · Belastungsmuster ─────────────────────────────────── */
function bauMuster(P){
  var tr=[];
  MUSTER.forEach(function(M){
    var x=aspekt(P,M.a,M.b,M.max);
    if(!x) return;
    if(M.hart && x.art!=='hart') return;
    tr.push('<li><b>'+M.n+'</b><span class="q ac-tech">'+M.a+' '+x.typ+' '+M.b+
      ' <span class="ac-grad">'+kz(x.o)+'°</span></span>'+M.t+'</li>');
  });
  var h12=['Sonne','Mond','Merkur','Venus','Mars','Saturn','Neptun','Pluto'].filter(function(k){
    return P[k]!==undefined&&P[k]!==null&&haus(P,P[k])===12; });
  if(h12.length>=2) tr.push('<li><b>Vieles läuft verdeckt</b><span class="q ac-tech">'+
    h12.join(', ')+' im 12. Haus</span>Energie wird verbraucht, ohne dass die Person es bemerkt — '+
    'Erschöpfung kommt plötzlich statt angekündigt.</li>');
  if(!tr.length) return '';
  return '<div class="do-ab"><h3>Hinweise auf Belastungsmuster</h3>'+
   '<div class="sub7">Keine Diagnosen. Konstellationen, die erfahrungsgemäß mit bestimmten '+
   'Alltagsschwierigkeiten einhergehen — brauchbar als Frage, nicht als Befund.</div>'+
   '<ul class="do-muster">'+tr.join('')+'</ul></div>';
}

/* ── 7 · Konflikt, Einstiege, Grenze ──────────────────────── */
function bauSchluss(P,B){
  var K=KONFLIKT[B.klasse];
  var h='<div class="do-ab"><h3>Wenn es schwierig wird</h3>'+
   '<p>'+K.t+'</p><div class="dk voll"><b>Was hilft</b>'+K.tun+'</div></div>';
  h+='<div class="do-ab"><h3>Gesprächseinstiege</h3>'+
   '<div class="sub7">Drei Fragen, die zu diesem Verhältnis passen — nicht zu jedem.</div>'+
   '<ul class="do-fragen">'+EINSTIEG[B.klasse].map(function(f){
     return '<li>'+f+'</li>'; }).join('')+'</ul></div>';
  h+='<div class="do-grenze"><div class="k">Die Grenze</div><p>'+GRENZE[B.klasse]+'</p></div>';
  return h;
}

/* ── Zusammensetzen ───────────────────────────────────────── */
function zeigen(){
  var p=profil();
  if(!p){ el('dossier').innerHTML=''; return; }
  var B=BEZUG[bezug]||BEZUG.klientin;
  var P;
  try{ P=chartVon(p); }catch(e){ el('dossier').innerHTML='<p>Chart ließ sich nicht rechnen.</p>'; return; }
  el('dossier').innerHTML =
    bauKopf(P,p,B) + bauStellung(B) + bauBau(P,B) + bauUmgang(P,B) +
    bauThemen(P,B) + bauHaeuser(P,B) + bauKlemmt(P,B) + bauMuster(P) + bauSchluss(P,B);
  if(window.AC_NIV&&window.AC_NIV.anwenden) try{ window.AC_NIV.anwenden(); }catch(e){}
}

/* ── Wahl: Profil und Bezug ───────────────────────────────── */
function wahlZeichnen(){
  var box=el('dowahl'), alle=[];
  try{ alle=AC_P.alle()||[]; }catch(e){}
  box.innerHTML='';
  if(!alle.length){
    box.innerHTML='<p class="do-leer">Noch kein Profil angelegt. '+
      '<a href="profile.html">Hier legst du eins an</a> — ohne Geburtszeit und Geburtsort '+
      'kann das Dossier nichts rechnen, weil alles an den Häusern hängt.</p>';
    el('dobezug').innerHTML=''; el('dossier').innerHTML='';
    return;
  }
  if(!gewaehlt){ var e=alle.filter(function(x){return x.eigen;})[0]||alle[0]; gewaehlt=e.id; }
  var zn=false; try{ zn=AC_P.zeigeNamen(); }catch(e){}
  alle.forEach(function(x){
    var b=document.createElement('button');
    b.type='button'; b.className='dw'+(x.id===gewaehlt?' ist':'');
    b.textContent=AC_P.anzeige(x,zn);
    b.addEventListener('click',function(){
      gewaehlt=x.id; bezug=bezugFuer(x); wahlZeichnen(); bezugZeichnen(); zeigen(); });
    box.appendChild(b);
  });
}
function bezugZeichnen(){
  var box=el('dobezug'), p=profil();
  if(!p){ box.innerHTML=''; return; }
  var h='<div class="bz-k">In welchem Verhältnis stehst du zu dieser Person?</div><div class="bz-reihe">';
  BEZUG_FOLGE.forEach(function(k){
    h+='<button type="button" class="bzb'+(k===bezug?' ist':'')+'" data-b="'+k+'">'+
      esc(BEZUG[k].n)+'</button>';
  });
  h+='</div><div class="bz-kurz">'+esc(BEZUG[bezug].kurz)+'</div>';
  box.innerHTML=h;
  Array.prototype.forEach.call(box.querySelectorAll('.bzb'),function(b){
    b.addEventListener('click',function(){
      bezug=b.getAttribute('data-b');
      var pp=profil(); if(pp) bezugSchreiben(pp.id,bezug);
      bezugZeichnen(); zeigen();
    });
  });
}

(function(){
  wahlZeichnen();
  var p=profil();
  if(p){ bezug=bezugFuer(p); bezugZeichnen(); zeigen(); }
  var d=el('drucken');
  if(d) d.addEventListener('click',function(){ window.print(); });
})();
