/* Astro-Charlie · Profil-Formular
   Ein Formular für zwei Orte: „Mein Profil" (Nutzerinnen) und die
   Praxis (Mandys Klient*innen). Bis zum 18.11. stand es nur in
   profile.html; die Praxis musste dorthin verlinken, und damit stand
   die Klientinnenliste mitten im Werkzeug für alle.

   Braucht staedte.js (AC_ortSuche, AC_offset) und profil.js (AC_P).
   Speichert nur im Browser, wie alles andere auch.

   AC_FORM.einbauen(ziel, {
     kuerzel:  Feld „Kürzel für die Anzeige" zeigen      (Praxis)
     notiz:    Feld „Notiz" zeigen                         (Praxis)
     eigen:    Haken „Das bin ich selbst" zeigen
     eigenVorgabe: Haken vorab gesetzt
     titelNeu, titelBearb: Überschrift über dem Formular
     knopf:    Beschriftung des Speicherknopfs
     nachSpeichern(profil, warNeu)
   })
   AC_FORM.laden(pid)   — ein Profil zum Bearbeiten ins Formular
   AC_FORM.leeren()     — zurück auf „anlegen" */
(function(){
  function el(id){ return document.getElementById(id); }
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); }
  var ORT=null, ORT2=null, bearbeite=null, opt={};

  /* Eine Ortssuche an einem Feld. setze(o) bekommt den gewählten Ort. */
  function ortFeld(inputId, listId, setze){
    var inp=el(inputId), liste=el(listId);
    if(!inp||!liste) return;
    var treffer=[], aktiv=-1;
    function zu(){ liste.classList.remove('auf'); aktiv=-1; }
    function waehle(o){ inp.value=o.name+(o.alt?' ('+o.alt+')':'')+', '+o.land; setze(o); zu(); }
    function zeichne(){
      liste.innerHTML='';
      if(!treffer.length){ zu(); return; }
      treffer.forEach(function(o,i){
        var b=document.createElement('button'); b.type='button';
        b.innerHTML=esc(o.name)+(o.alt?' <span class="land">· '+esc(o.alt)+'</span>':'')+' <span class="land">· '+esc(o.land)+'</span>';
        if(i===aktiv) b.className='aktiv';
        b.addEventListener('mousedown',function(ev){ ev.preventDefault(); waehle(o); });
        liste.appendChild(b);
      });
      liste.classList.add('auf');
    }
    inp.addEventListener('input',function(){
      setze(null);
      treffer=window.AC_ortSuche(inp.value,8); aktiv=-1; zeichne();
    });
    inp.addEventListener('keydown',function(e){
      if(!treffer.length) return;
      if(e.key==='ArrowDown'){ e.preventDefault(); aktiv=Math.min(aktiv+1,treffer.length-1); zeichne(); }
      else if(e.key==='ArrowUp'){ e.preventDefault(); aktiv=Math.max(aktiv-1,0); zeichne(); }
      else if(e.key==='Enter'&&aktiv>=0){ e.preventDefault(); waehle(treffer[aktiv]); }
      else if(e.key==='Escape'){ zu(); }
    });
    inp.addEventListener('blur',function(){ setTimeout(zu,140); });
  }

  function html(o){
    return ''+
    '<h2 class="pf-titel" id="pftitel">'+esc(o.titelNeu||'Profil anlegen')+'</h2>'+
    '<div class="karte pf-karte">'+
     '<div class="felder">'+
      '<div><label for="pfname">Name'+(o.kuerzel?' (bleibt bei dir)':'')+'</label><input id="pfname" autocomplete="off" placeholder="Vorname reicht"></div>'+
      (o.kuerzel?'<div><label for="pfalias">Kürzel für die Anzeige</label><input id="pfalias" autocomplete="off" placeholder="z. B. Klientin 04"></div>':'<div></div>')+
      '<div><label for="pfdate">Geburtsdatum</label><input type="date" id="pfdate" value="1990-01-01"></div>'+
      '<div><label for="pftime">Uhrzeit</label><input type="time" id="pftime" value="12:00"></div>'+
      '<div class="pf-voll"><label for="pfort">Geburtsort</label>'+
        '<div class="ortfeld"><input id="pfort" placeholder="Stadt eintippen" autocomplete="off"><div class="ortliste" id="pfortliste"></div></div>'+
        '<div class="ortok" id="pfortok"></div></div>'+
      '<div class="pf-voll"><label for="pfwort">Wohnort <span class="pf-klein">— für das Jahreschart. Leer lassen, wenn es der Geburtsort ist.</span></label>'+
        '<div class="ortfeld"><input id="pfwort" placeholder="Stadt eintippen" autocomplete="off"><div class="ortliste" id="pfwortliste"></div></div>'+
        '<div class="ortok" id="pfwortok"></div></div>'+
      (o.notiz?'<div class="pf-voll"><label for="pfnotiz">Notiz (freiwillig)</label><textarea id="pfnotiz" placeholder="Anliegen, Kontext, worum es geht"></textarea></div>':'')+
     '</div>'+
     '<div class="reihe">'+
      '<button type="button" class="b" id="pfspeichern">'+esc(o.knopf||'Speichern')+'</button>'+
      '<button type="button" class="b leer" id="pfabbrechen" hidden>Abbrechen</button>'+
      (o.eigen?'<label class="pf-eigen"><input type="checkbox" id="pfeigen"'+(o.eigenVorgabe?' checked':'')+'> Das bin ich selbst</label>':'')+
      '<span class="pf-fehler" id="pffehler" role="alert"></span>'+
     '</div>'+
    '</div>';
  }

  function leeren(){
    bearbeite=null; ORT=null; ORT2=null;
    ['pfname','pfalias','pfnotiz','pfort','pfwort'].forEach(function(i){ if(el(i)) el(i).value=''; });
    el('pfdate').value='1990-01-01'; el('pftime').value='12:00';
    if(el('pfeigen')) el('pfeigen').checked=!!opt.eigenVorgabe;
    el('pfortok').textContent=''; el('pfwortok').textContent=''; el('pffehler').textContent='';
    el('pftitel').textContent=opt.titelNeu||'Profil anlegen';
    el('pfabbrechen').hidden=true;
  }
  function laden(pid){
    var p=AC_P.alle().filter(function(x){return x.id===pid;})[0];
    if(!p) return;
    bearbeite=pid; ORT=null; ORT2=null;
    el('pfname').value=p.name||''; if(el('pfalias')) el('pfalias').value=p.alias||'';
    el('pfdate').value=p.y+'-'+('0'+p.mo).slice(-2)+'-'+('0'+p.d).slice(-2);
    el('pftime').value=('0'+p.h).slice(-2)+':'+('0'+p.mi).slice(-2);
    if(el('pfnotiz')) el('pfnotiz').value=p.notiz||'';
    if(el('pfeigen')) el('pfeigen').checked=!!p.eigen;
    el('pfort').value=p.ort||'';
    el('pfortok').innerHTML=p.ort?('Gespeichert: <b>'+esc(p.ort)+'</b> — nur ändern, wenn du einen neuen Ort wählst.'):'';
    el('pfwort').value=(p.wort&&p.wort!==p.ort)?p.wort:'';
    el('pfwortok').innerHTML=(p.wort&&p.wort!==p.ort)?('Gespeichert: <b>'+esc(p.wort)+'</b>'):'';
    el('pftitel').textContent=opt.titelBearb||'Profil bearbeiten';
    el('pfabbrechen').hidden=false;
    el('pftitel').scrollIntoView({behavior:'smooth',block:'start'});
  }
  function speichern(){
    var f=el('pffehler'); f.textContent='';
    var dv=el('pfdate').value, tv=el('pftime').value;
    if(!dv||!tv){ f.textContent='Datum und Uhrzeit fehlen.'; return; }
    var p=dv.split('-').map(Number), t=tv.split(':').map(Number);
    var alt=bearbeite?AC_P.alle().filter(function(x){return x.id===bearbeite;})[0]:null;
    var daten={ name:el('pfname').value, y:p[0], mo:p[1], d:p[2], h:t[0], mi:t[1] };
    if(el('pfalias')) daten.alias=el('pfalias').value;
    if(el('pfnotiz')) daten.notiz=el('pfnotiz').value;
    if(el('pfeigen')) daten.eigen=el('pfeigen').checked;
    if(ORT){
      var off=window.AC_offset(ORT.tz,p[0],p[1],p[2],t[0],t[1]);
      if(off===null||isNaN(off)){ f.textContent='Für diesen Ort ließ sich die Zeitzone nicht bestimmen.'; return; }
      daten.lat=ORT.lat; daten.lon=ORT.lon; daten.tz=off; daten.ort=ORT.name+', '+ORT.land;
    } else if(alt){
      /* Ort unverändert; die Zeitzone neu, falls Datum oder Uhrzeit sich geändert haben */
      daten.lat=alt.lat; daten.lon=alt.lon; daten.ort=alt.ort; daten.tz=alt.tz;
    } else { f.textContent='Bitte einen Geburtsort aus der Liste wählen.'; return; }
    if(ORT2){ daten.wlat=ORT2.lat; daten.wlon=ORT2.lon; daten.wort=ORT2.name+', '+ORT2.land; daten.wtz=ORT2.tz; }
    else if(alt && alt.wort && el('pfwort').value){ daten.wlat=alt.wlat; daten.wlon=alt.wlon; daten.wort=alt.wort; daten.wtz=alt.wtz; }
    else { daten.wlat=daten.lat; daten.wlon=daten.lon; daten.wort=daten.ort; daten.wtz=''; }
    if(Math.abs(daten.lat)>66){ f.textContent='Für Orte nördlich des Polarkreises funktioniert die Häuserberechnung nicht.'; return; }
    var profil, neu=!bearbeite;
    if(bearbeite){
      AC_P.aendere(bearbeite,daten);
      if(daten.eigen) AC_P.alsEigenes(bearbeite);
      if(AC_P.lade().aktiv===bearbeite) AC_P.setzeAktiv(bearbeite);
      profil=AC_P.alle().filter(function(x){return x.id===bearbeite;})[0];
    } else {
      profil=AC_P.hinzu(daten);
      AC_P.setzeAktiv(profil.id);
    }
    leeren();
    if(opt.nachSpeichern) opt.nachSpeichern(profil,neu);
  }

  window.AC_FORM={
    einbauen:function(ziel,o){
      opt=o||{};
      ziel.innerHTML=html(opt);
      ortFeld('pfort','pfortliste',function(o){
        ORT=o;
        el('pfortok').innerHTML=o?('Gewählt: <b>'+esc(o.name)+', '+esc(o.land)+'</b> · Zeitzone '+esc(o.tz)+
          ' <span class="pf-klein">(Sommerzeit wird automatisch berücksichtigt)</span>'):'';
      });
      ortFeld('pfwort','pfwortliste',function(o){
        ORT2=o;
        el('pfwortok').innerHTML=o?('Wohnort: <b>'+esc(o.name)+', '+esc(o.land)+'</b>'):'';
      });
      el('pfspeichern').addEventListener('click',speichern);
      el('pfabbrechen').addEventListener('click',leeren);
    },
    laden:laden,
    leeren:leeren
  };
})();
