/* Astro-Charlie · Thema „Berufung & Beruf"
   ==================================================================
   Auf dieselbe Tiefe gebaut wie „Zwei Menschen": Die Frage hat Formen,
   und die Form entscheidet mit, welche Häuser zählen und welche Regeln
   überhaupt laufen. „Wohin überhaupt" ist eine andere Frage als
   „warum geht gerade nichts", auch wenn das Chart dasselbe ist.

   Das Ergebnis läuft über zwei Achsen: ob die Kraft in dem Bereich
   liegt, um den es gerade geht, und ob dort mehr trägt als bremst. */

var T_BERUF={
 schluessel:'beruf',
 n:'Berufung & Beruf',
 modus:'solo',
 was:'Wofür jemand gemacht ist, was im Weg steht und was als Nächstes dran ist.',
 formLabel:'Die Frage',
 formen:[
  {k:'richtung', n:'Wohin überhaupt',       t:'Orientierung — es gibt keine Richtung oder zu viele'},
  {k:'selbst',   n:'Selbstständig',          t:'eigenes Angebot, Preis, Kundschaft'},
  {k:'wechsel',  n:'Wechseln oder bleiben',  t:'die Stelle, die Branche, der Schnitt'},
  {k:'sichtbar', n:'Sichtbar werden',        t:'Positionierung, Auftreten, gesehen werden'},
  {k:'klemmt',   n:'Warum es klemmt',        t:'Erschöpfung, Blockade, es geht gerade nicht'}
 ],
 /* Welche Häuser für welche Frage zählen */
 felder:{
  richtung:[10,2,6,9,1], selbst:[10,2,1,11,6], wechsel:[10,6,4,12,9],
  sichtbar:[10,1,5,11,3], klemmt:[6,12,8,10,4]
 },
 grenzen:{bild:3, staerke:6, reibung:6, aufgabe:4, beratung:4}
};

var BF_HN=['Auftreten','Wert und Geld','Sprache','Zuhause','Ausdruck','Alltag und Handwerk',
 'Partnerschaft','Tiefe','Lehre und Ferne','Beruf','Gruppen','Rückzug'];

/* Was ein Zeichen am MC nach außen will */
var BF_MC={Widder:'anfangen, gründen, vorangehen',
 Stier:'etwas Bleibendes aufbauen, mit Material arbeiten',
 Zwillinge:'vermitteln, erklären, schreiben',
 Krebs:'versorgen, halten, einen Ort schaffen',
 'Löwe':'gestalten und sichtbar sein',
 Jungfrau:'etwas genau machen, auf das Verlass ist',
 Waage:'zwischen Menschen vermitteln und gestalten',
 Skorpion:'in die Tiefe gehen, mit Krisen arbeiten',
 'Schütze':'lehren, erweitern, über Grenzen hinweg',
 Steinbock:'Verantwortung tragen und etwas leiten',
 Wassermann:'etwas anders machen als vorgesehen',
 Fische:'heilen, begleiten, gestalten'};

/* Wie gearbeitet wird — das 6. Haus */
var BF_WIE={Widder:'schnell und in Schüben', Stier:'langsam und gründlich',
 Zwillinge:'mehrgleisig und wechselnd', Krebs:'in Beziehung zu den Menschen drumherum',
 'Löwe':'mit Einsatz und sichtbar', Jungfrau:'genau und mit hohem eigenem Maßstab',
 Waage:'abgestimmt und zu zweit', Skorpion:'konzentriert, in Phasen hoher Intensität',
 'Schütze':'frei und mit Überblick', Steinbock:'strukturiert und auf lange Sicht',
 Wassermann:'eigenständig und nicht nach Vorgabe', Fische:'in Wellen und schwer planbar'};

function bfFeld(N){ return (N&&N.felder&&N.felder.length)?N.felder:[10,2,6,9,1]; }
function bfFrage(N){ return (N&&N.form)||'richtung'; }

/* ══ Die Regeln ═══════════════════════════════════════════════ */
var R_BERUF=[

/* ───────── Das Bild ───────── */
{id:'bf-mc', modus:'solo', gewicht:10,
 wenn:function(A,B,H){ return A.MC!==undefined; },
 dann:function(A,B,H,N){
   var z=H.zi(A.MC), herr=H.HERRSCHER[z], wo=H.wo(A,herr), zn=H.ZEICHEN[z];
   return {art:'bild', titel:'Die Richtung: '+zn+' am MC',
     text:'Der höchste Punkt des Charts steht in <b>'+zn+'</b>. Dafür ist '+N.a+' nach außen '+
       'gebaut: '+BF_MC[zn]+'. Der Herrscher <b>'+herr+'</b> steht im '+wo+'. Haus ('+
       BF_HN[wo-1]+') — und <i>dort</i> wird die Berufung tatsächlich verhandelt, nicht im 10. '+
       'Wer im 10. Haus sucht und im '+wo+'. lebt, sucht an der falschen Stelle.',
     beleg:'MC '+H.stellung(A.MC)+' · '+herr+' im '+wo+'. Haus'};
 }},

{id:'bf-dichte', modus:'solo', gewicht:9,
 wenn:function(A,B,H,N){ return !!N; },
 dann:function(A,B,H,N){
   var f=bfFeld(N), F=H.feld(A,f), dichte=F.anteil/(f.length/12);
   var viel=dichte>=1.12, wenig=dichte<=0.88;
   return {art:'bild',
     titel: viel ? 'Für diese Frage ist viel da'
          : wenig ? 'Diese Frage trifft eine dünne Stelle'
          : 'Für diese Frage ist normal viel da',
     text:'Für „'+(N.formName||'diese Frage')+'" zählen die Häuser '+f.join(', ')+'. '+
       (F.leer
         ? 'In keinem davon steht ein Planet. Das ist kein Mangel, aber es heißt: Die Antwort '+
           'kommt hier nicht aus einer Besetzung, sondern über die Herrscher — und die stehen '+
           'woanders. Erwartet '+N.a+' ein deutliches Signal, wird es enttäuscht.'
         : 'Dort stehen '+F.planeten.join(', ')+'; das meiste Gewicht liegt im '+F.schwerstes+
           '. Haus ('+BF_HN[F.schwerstes-1]+'). ')+
       (viel ? 'Gemessen am Zufall liegt hier <b>mehr</b> Gewicht als zu erwarten wäre — die Frage '+
               'trifft einen besetzten Bereich, und das ist der Grund, warum sie sich so dringend anfühlt.'
        : wenig ? 'Gemessen am Zufall liegt hier <b>weniger</b> Gewicht als zu erwarten wäre. '+
               'Das ist oft die eigentliche Nachricht: Die Frage ist vielleicht gar nicht die, '+
               'an der sich gerade etwas entscheidet.'
        : 'Gemessen am Zufall liegt hier ungefähr so viel Gewicht wie zu erwarten wäre.'),
     beleg:'Felddichte '+H.kz(dichte,2)+' (1,00 = Durchschnitt)'};
 }},

{id:'bf-sekte', modus:'solo', gewicht:6,
 wenn:function(A,B,H){ return A.Sonne!==undefined&&A.ASC!==undefined; },
 dann:function(A,B,H,N){
   var s=H.sekte(A);
   return {art:'bild', titel: s==='tag'?'Taggeburt':'Nachtgeburt',
     text: s==='tag'
       ? 'Die Sonne stand über dem Horizont. In der klassischen Lesart heißt das: Der Weg nach '+
         'außen läuft über Sichtbarkeit, Position und das, was man vorzeigen kann. Saturn arbeitet '+
         'bei '+N.a+' eher mit als gegen — Struktur und Disziplin fühlen sich nicht wie Fremdkörper an.'
       : 'Die Sonne stand unter dem Horizont. Der Weg nach außen läuft hier eher über Beziehungen, '+
         'Resonanz und das, was sich richtig anfühlt, als über eine Position auf dem Papier. '+
         'Saturn ist bei Nachtgeburten der schwierigere Teil: Vorgaben von außen kosten mehr Kraft.',
     beleg:'Sonne im '+H.wo(A,'Sonne')+'. Haus'};
 }},

{id:'bf-oben', modus:'solo', gewicht:5,
 wenn:function(A,B,H){ return A.ASC!==undefined; },
 dann:function(A,B,H,N){
   var o=H.oben(A);
   if(o>=7) return {art:'bild', titel:'Das Leben spielt öffentlich',
     text:o+' von 10 Planeten stehen über dem Horizont. Das Berufsleben dieser Person findet '+
       'vor Leuten statt, ob sie will oder nicht. Eine Arbeit ganz im Stillen wird auf Dauer nicht halten.',
     beleg:o+' Planeten oberhalb'};
   if(o<=3) return {art:'bild', titel:'Das Leben spielt im Verborgenen',
     text:'Nur '+o+' von 10 Planeten stehen über dem Horizont. Das meiste passiert bei '+N.a+
       ' unterhalb der Wahrnehmungsschwelle anderer. Sichtbarkeit ist hier erlernbar, aber nie '+
       'der Motor — und Berufe, die von Selbstdarstellung leben, kosten dauerhaft Substanz.',
     beleg:o+' Planeten oberhalb'};
   return null;
 }},

/* ───────── Was trägt ───────── */
{id:'bf-zehntes', modus:'solo', gewicht:9,
 wenn:function(A,B,H){ return H.drin(A,10).length>0; },
 dann:function(A,B,H,N){
   var d=H.drin(A,10);
   var was={Sonne:'Sichtbarkeit ist kein Nebeneffekt, sondern Bedingung — ohne sie trocknet die Arbeit aus',
    Mond:'der Beruf muss sich sicher anfühlen, sonst hält er nicht, egal wie gut er ist',
    Merkur:'das Vermitteln ist der Kern und nicht die Verpackung',
    Venus:'es muss schön sein oder mit Menschen zu tun haben, sonst geht die Luft raus',
    Mars:'es braucht Widerstand und etwas zu erobern, sonst wird es fad',
    Jupiter:'hier kommt viel von selbst — und hier wird auch leicht überdehnt',
    Saturn:'der Aufbau dauert länger als bei anderen und hält dann länger. Der frühe Teil ist zäh',
    Uranus:'ein normaler Weg wird nicht funktionieren, und das ist keine Phase',
    Neptun:'die Richtung bleibt lange unscharf. Das ist hier normal und kein Mangel',
    Pluto:'es geht um Wirkung und Macht. Halbe Sachen hält diese Person im Beruf nicht aus'};
   return {art:'staerke', titel:'Im 10. Haus steht '+d.join(', '),
     text:d.map(function(k){ return '<b>'+k+':</b> '+was[k]; }).join(' — '),
     beleg:d.map(function(k){return k+' '+H.stellung(A[k]);}).join(' · ')};
 }},

{id:'bf-sechstes', modus:'solo', gewicht:7,
 wenn:function(A,B,H){ return A.ASC!==undefined; },
 dann:function(A,B,H,N){
   var z=H.hausZeichen(A,6), zn=H.ZEICHEN[z], herr=H.HERRSCHER[z], wo=H.wo(A,herr);
   return {art:'staerke', titel:'Wie gearbeitet wird',
     text:'Das 6. Haus — der Alltag der Arbeit — trägt <b>'+zn+'</b>. Nicht <i>was</i> jemand tut, '+
       'sondern wie: '+BF_WIE[zn]+'. Wer gegen diesen Takt arbeitet, wird müde, ohne dass die '+
       'Arbeit schwer wäre. Der Herrscher '+herr+' steht im '+wo+'. Haus — dort entscheidet sich, '+
       'ob der Alltag trägt.',
     beleg:'6. Haus in '+zn+' · '+herr+' im '+wo+'. Haus'};
 }},

{id:'bf-mcherr-wuerde', modus:'solo', gewicht:8,
 wenn:function(A,B,H){
   if(A.MC===undefined) return false;
   var herr=H.HERRSCHER[H.zi(A.MC)];
   return !!H.wuerde(herr, H.zi(A[herr])); },
 dann:function(A,B,H,N){
   var herr=H.HERRSCHER[H.zi(A.MC)], z=H.zi(A[herr]), w=H.wuerde(herr,z);
   var gut=(w==='domizil'||w==='erhoehung');
   var T={domizil:'steht in seinem eigenen Zeichen und kann hier alles, was er kann',
    erhoehung:'steht erhöht — er wirkt hier über seine Verhältnisse gut',
    exil:'steht im Gegenzeichen und arbeitet gegen den Strich',
    fall:'steht im Fall und bekommt wenig Rückenwind',
    exilfall:'steht gleichzeitig im Exil und im Fall — die ungünstigste Stellung, die es gibt'};
   return {art: gut?'staerke':'reibung',
     titel:'Der Herrscher des Berufs: '+herr+' '+(gut?'gut gestellt':'schwer gestellt'),
     text:'<b>'+herr+'</b> regiert bei '+N.a+' den Beruf und '+T[w]+' ('+H.ZEICHEN[z]+'). '+
       (gut
         ? 'Das ist der Hebel: Was über '+herr+' läuft, gelingt hier leichter als bei anderen. '+
           'Ein Weg, der diesen Planeten benutzt, trägt — einer, der ihn umgeht, kostet unnötig Kraft.'
         : 'Das heißt nicht, dass es nicht geht. Es heißt, dass der Beruf über einen Planeten läuft, '+
           'der selbst Gegenwind hat: Es wird länger dauern, mehr Übung brauchen und sich lange '+
           'wie Hochstapelei anfühlen, auch wenn es längst gut ist.'),
     ansatz: gut?undefined:'Nicht den Planeten reparieren wollen, sondern ihm Bedingungen bauen: '+
       'weniger gleichzeitig, längere Fristen, und jemanden, der von außen bestätigt, dass es stimmt.',
     beleg:herr+' in '+H.ZEICHEN[z]+' — '+w};
 }},

{id:'bf-zweites', modus:'solo', gewicht:7,
 nurForm:['selbst','richtung','wechsel'],
 wenn:function(A,B,H){ return A.ASC!==undefined; },
 dann:function(A,B,H,N){
   var z=H.hausZeichen(A,2), zn=H.ZEICHEN[z], d=H.drin(A,2);
   var wert={Widder:'Tempo und Mut — dass etwas überhaupt angefangen wird',
    Stier:'Beständigkeit und handfeste Qualität',
    Zwillinge:'Worte, Übersicht, das Erklären',
    Krebs:'Fürsorge und ein Gefühl von Sicherheit',
    'Löwe':'Ausstrahlung und das, was Mut macht',
    Jungfrau:'Genauigkeit und Verlässlichkeit im Detail',
    Waage:'Geschmack und das Vermitteln zwischen Leuten',
    Skorpion:'Tiefe und die Fähigkeit, Unangenehmes auszuhalten',
    'Schütze':'Überblick und Zuversicht',
    Steinbock:'Verantwortung und Durchhalten',
    Wassermann:'der eigene Blick, der Dinge anders sieht',
    Fische:'Einfühlung und Vorstellungskraft'};
   return {art:'staerke', titel:'Wofür Geld kommen kann',
     text:'Das 2. Haus — der eigene Wert — trägt <b>'+zn+'</b>'+
       (d.length?' und ist mit '+d.join(', ')+' besetzt':'')+'. Bezahlt wird '+N.a+' am ehesten '+
       'für <b>'+wert[zn]+'</b>. Das ist nicht unbedingt, worauf sie stolz ist — oft ist es '+
       'genau das, was ihr so leicht fällt, dass sie es nicht für eine Leistung hält.',
     beleg:'2. Haus in '+zn+(d.length?' · '+d.join(', '):'')};
 }},

{id:'bf-jupiter', modus:'solo', gewicht:6,
 wenn:function(A,B,H){ return A.Jupiter!==undefined; },
 dann:function(A,B,H,N){
   var wo=H.wo(A,'Jupiter'), z=H.zeichen(A.Jupiter), imFeld=bfFeld(N).indexOf(wo)>=0;
   return {art:'staerke', titel:'Wo es von selbst mehr wird',
     text:'Jupiter steht im <b>'+wo+'. Haus</b> ('+BF_HN[wo-1]+') in '+z+'. Dort kommt mehr zurück, '+
       'als hineingesteckt wird, und dort findet diese Person Leute, die ihr etwas zutrauen. '+
       (imFeld
         ? 'Das liegt mitten in dem Bereich, um den es gerade geht — das ist die Stelle, an der '+
           'man anfängt, wenn man es sich leicht machen will.'
         : 'Das liegt außerhalb des Bereichs, um den es gerade geht. Wenn es anderswo klemmt, '+
           'ist das hier die Tür, die trotzdem aufgeht.'),
     beleg:'Jupiter '+H.stellung(A.Jupiter)+' im '+wo+'. Haus'};
 }},

{id:'bf-elftes', modus:'solo', gewicht:6,
 nurForm:['selbst','sichtbar','richtung'],
 wenn:function(A,B,H){ return A.ASC!==undefined; },
 dann:function(A,B,H,N){
   var z=H.hausZeichen(A,11), zn=H.ZEICHEN[z], herr=H.HERRSCHER[z], wo=H.wo(A,herr),
       d=H.drin(A,11);
   return {art:'staerke', titel:'Wie die Arbeit zu ihr kommt',
     text:'Aufträge, Kundschaft und Gelegenheiten laufen über das 11. Haus, und das trägt hier '+
       '<b>'+zn+'</b>'+(d.length?' mit '+d.join(', ')+' darin':'')+'. Sein Herrscher '+herr+
       ' steht im '+wo+'. Haus ('+BF_HN[wo-1]+') — und das ist die konkrete Antwort auf die Frage, '+
       'wo diese Person ihre Leute findet: '+
       ({1:'indem sie selbst auftritt',2:'über das, was sie herstellt',3:'über Reden und Schreiben',
         4:'über persönliche Nähe, nicht über Reichweite',5:'über etwas, das sie zeigt',
         6:'über die tägliche Arbeit selbst',7:'über einzelne Menschen, einen nach dem anderen',
         8:'über wenige, sehr tiefe Kontakte',9:'über Lehre, Ausland oder Veröffentlichung',
         10:'über ihren Namen und ihre Position',11:'über Gruppen und Netzwerke',
         12:'über Empfehlung, ohne dass sie es mitbekommt'})[wo]+'.',
     beleg:'11. Haus in '+zn+' · '+herr+' im '+wo+'. Haus'};
 }},

{id:'bf-stellium', modus:'solo', gewicht:7,
 wenn:function(A,B,H){ return H.stellien(A).length>0; },
 dann:function(A,B,H,N){
   var s=H.stellien(A)[0], imFeld=bfFeld(N).indexOf(s.haus)>=0;
   return {art:'staerke', titel:'Ein Schwerpunkt im '+s.haus+'. Haus',
     text:s.planeten.join(', ')+' stehen zusammen im '+s.haus+'. Haus ('+BF_HN[s.haus-1]+'). '+
       'So viel an einer Stelle heißt: Dieser Bereich bekommt bei '+N.a+' überproportional viel '+
       'Lebenszeit, ob geplant oder nicht. '+
       (imFeld
         ? 'Er liegt genau in dem Bereich, um den es gerade geht — hier ist die Energie schon da, '+
           'sie muss nur eine Form bekommen.'
         : 'Er liegt außerhalb der jetzigen Frage, und das ist der Hinweis: Solange der '+s.haus+
           '. Bereich ungelöst ist, wird die Berufsfrage nicht in Ruhe gelassen.'),
     beleg:s.planeten.length+' Planeten im '+s.haus+'. Haus'};
 }},

{id:'bf-knoten', modus:'solo', gewicht:6,
 wenn:function(A,B,H){ return A.Knoten!==undefined; },
 dann:function(A,B,H,N){
   var wo=H.wo(A,'Knoten'), geg=((wo+5)%12)+1;
   return {art:'staerke', titel:'Die Wachstumsrichtung: '+wo+'. Haus',
     text:'Der aufsteigende Mondknoten steht im <b>'+wo+'. Haus</b> ('+BF_HN[wo-1]+'), der '+
       'absteigende im '+geg+'. ('+BF_HN[geg-1]+'). In der Lesart heißt das: Was im '+geg+
       '. Haus liegt, kann diese Person im Schlaf — und genau deshalb bleibt sie dort hängen. '+
       'Der Zuwachs liegt im '+wo+'. Haus, und er fühlt sich am Anfang nach Unvermögen an, '+
       'nicht nach Berufung.',
     beleg:'Knoten '+H.stellung(A.Knoten)};
 }},

/* ───────── Wo es reibt ───────── */
{id:'bf-saturn-feld', modus:'solo', gewicht:9,
 wenn:function(A,B,H,N){ return A.Saturn!==undefined && bfFeld(N).indexOf(H.wo(A,'Saturn'))>=0; },
 dann:function(A,B,H,N){
   var wo=H.wo(A,'Saturn'), z=H.zeichen(A.Saturn);
   return {art:'reibung', titel:'Saturn sitzt mitten in der Frage',
     text:'Saturn steht im <b>'+wo+'. Haus</b> ('+BF_HN[wo-1]+') in '+z+' — also genau in dem '+
       'Bereich, um den es bei „'+(N.formName||'dieser Frage')+'" geht. Das ist der Grund, warum '+
       'sich hier alles zäher anfühlt als bei anderen und warum Fortschritt nicht als Fortschritt '+
       'erlebt wird: Saturn gibt keine Rückmeldung, er gibt nur frei.',
     ansatz:'Nicht an der Motivation arbeiten, sondern an der Zeitrechnung. Was hier gebaut wird, '+
       'braucht Jahre statt Monate — und hält dann auch Jahre. Ein äußerer Termin hilft mehr als '+
       'jeder Vorsatz, weil Saturn auf Verbindlichkeit reagiert und nicht auf Begeisterung.',
     beleg:'Saturn '+H.stellung(A.Saturn)+' im '+wo+'. Haus'};
 }},

{id:'bf-neptun-richtung', modus:'solo', gewicht:8,
 wenn:function(A,B,H){
   if(A.Neptun===undefined||A.MC===undefined) return false;
   var herr=H.HERRSCHER[H.zi(A.MC)];
   return H.wo(A,'Neptun')===10 || !!H.asp(A,'Neptun','MC',6) ||
          !!H.asp(A,'Neptun',herr,5); },
 dann:function(A,B,H,N){
   var wie = H.wo(A,'Neptun')===10 ? 'steht im 10. Haus'
           : H.asp(A,'Neptun','MC',6) ? 'steht im Winkel zum MC' : 'rührt an den Herrscher des Berufs';
   return {art:'reibung', titel:'Die Richtung bleibt unscharf — und das ist die Anlage',
     text:'Neptun '+wie+'. Bei dieser Stellung ist die Berufsrichtung über lange Strecken nicht '+
       'klar erkennbar, und zwar nicht aus Unentschlossenheit. '+N.a+' sieht viele Möglichkeiten '+
       'gleichzeitig und keine davon scharf. Dazu gehört, dass andere diese Person leicht für '+
       'etwas halten, das sie nicht ist — und dass sie dem manchmal nachgibt.',
     ansatz:'Aufhören, auf Klarheit zu warten, und stattdessen in kurzen Versuchen arbeiten: '+
       'drei Monate etwas tun, dann ehrlich hinsehen, was davon getragen hat. Neptun klärt sich '+
       'nicht durch Nachdenken, sondern im Rückblick.',
     beleg:'Neptun '+H.stellung(A.Neptun)+' im '+H.wo(A,'Neptun')+'. Haus'};
 }},

{id:'bf-mcherr-versteckt', modus:'solo', gewicht:8,
 wenn:function(A,B,H){
   if(A.MC===undefined) return false;
   return [6,8,12].indexOf(H.wo(A,H.HERRSCHER[H.zi(A.MC)]))>=0; },
 dann:function(A,B,H,N){
   var herr=H.HERRSCHER[H.zi(A.MC)], wo=H.wo(A,herr);
   var t={6:'im 6. Haus — in der täglichen Arbeit selbst. Die Berufung sieht von außen nach '+
      'Handwerk aus und nicht nach Berufung, und genau deshalb wird sie unterschätzt, auch von ihr selbst',
     8:'im 8. Haus — dort, wo es um Krisen, fremdes Geld und Dinge geht, über die nicht geredet wird. '+
      'Der Beruf führt über Situationen, die andere meiden',
     12:'im 12. Haus — im Rückzug, hinter den Kulissen, oft unbezahlt angefangen. Diese Person '+
      'arbeitet lange im Verborgenen, bevor etwas sichtbar wird'};
   return {art:'reibung', titel:'Der Beruf läuft über eine versteckte Stelle',
     text:'Der Herrscher des 10. Hauses, <b>'+herr+'</b>, steht '+t[wo]+'. Daraus entsteht das '+
       'typische Missverständnis: '+N.a+' sucht die Berufung dort, wo man sie zeigen kann, und '+
       'sie liegt dort, wo man sie nicht sieht.',
     ansatz:'Nicht fragen „was will ich werden", sondern „wofür kommen die Leute schon jetzt zu mir". '+
       'Bei dieser Stellung ist die Antwort fast immer schon da und wird nur nicht gezählt.',
     beleg:herr+' im '+wo+'. Haus'};
 }},

{id:'bf-zwoelftes', modus:'solo', gewicht:7,
 wenn:function(A,B,H){ return H.drin(A,12).length>=2; },
 dann:function(A,B,H,N){
   var d=H.drin(A,12);
   return {art:'reibung', titel:'Viel im Rückzug: '+d.join(', ')+' im 12. Haus',
     text:'Mit '+d.length+' Planeten im 12. Haus braucht '+N.a+' mehr Zeit allein als die meisten '+
       'Arbeitsverhältnisse vorsehen. Das wird regelmäßig als mangelnde Belastbarkeit gelesen und '+
       'ist keine: Es ist der Ort, an dem bei dieser Person überhaupt etwas entsteht. Ohne ihn '+
       'kommt nichts, mit ihm kommt viel.',
     ansatz:'Nicht mehr Erholung dazulegen, sondern Reize wegnehmen. Eine feste, geschützte Zeit '+
       'ohne Erreichbarkeit — im Kalender, nicht als Vorsatz — bringt hier mehr als jede Methode.',
     beleg:d.join(', ')+' im 12. Haus'};
 }},

{id:'bf-sonne-saturn', modus:'solo', gewicht:8,
 wenn:function(A,B,H){ var a=H.asp(A,'Sonne','Saturn'); return !!a&&a.art==='hart'; },
 dann:function(A,B,H,N){
   var a=H.asp(A,'Sonne','Saturn');
   return {art:'reibung', titel:'Sonne '+a.typ+' Saturn — die Erlaubnis fehlt',
     text:'Diese Verbindung beschreibt jemanden, der sich die eigene Position erst verdienen zu '+
       'müssen glaubt, und zwar immer wieder von vorn. '+N.a+' arbeitet mehr als nötig, nimmt Lob '+
       'schlecht an und wartet auf eine Bestätigung von außen, die in dieser Form nie kommt. '+
       'Fachlich ist diese Stellung ein Vorteil: Sie macht gründlich und haltbar.',
     ansatz:'Eine Instanz benennen, die über „gut genug" entscheidet, und es nicht sie selbst sein '+
       'lassen — eine Kollegin, eine Supervision, ein festes Kriterium. Sonst verschiebt sich die '+
       'Latte bei jedem Erfolg nach oben.',
     beleg:'Sonne '+a.typ+' Saturn, Orbis '+H.kz(a.orb)+'°'};
 }},

{id:'bf-mars', modus:'solo', gewicht:7,
 nurForm:['klemmt','selbst','wechsel'],
 wenn:function(A,B,H){ return A.Mars!==undefined; },
 dann:function(A,B,H,N){
   var z=H.zi(A.Mars), w=H.wuerde('Mars',z), wo=H.wo(A,'Mars'), schwach=(w==='exil'||w==='fall'||w==='exilfall');
   if(!schwach && H.elem(A.Mars)!=='Wasser') return null;
   return {art:'reibung', titel:'Der Antrieb arbeitet indirekt',
     text:'Mars steht in <b>'+H.ZEICHEN[z]+'</b> im '+wo+'. Haus'+(schwach?' und ist dort geschwächt':'')+
       '. Das heißt nicht wenig Kraft, sondern: Diese Person kommt schlecht über die direkte '+
       'Konfrontation ans Ziel. Durchsetzen über Ansage funktioniert nicht, Ärger wird gestaut '+
       'statt ausgesprochen, und dann kommt er auf Umwegen heraus — meist zu spät und zu stark.',
     ansatz:'Keine Konfrontationstrainings. Besser: einen Weg bauen, auf dem Widerspruch früh und '+
       'schriftlich geäußert werden kann, bevor er sich aufgeladen hat. Bei dieser Stellung ist '+
       'eine E-Mail oft ehrlicher als ein Gespräch.',
     beleg:'Mars '+H.stellung(A.Mars)+(w?' — '+w:'')};
 }},

{id:'bf-fehlt', modus:'solo', gewicht:6,
 wenn:function(A,B,H){ return H.bilanz(A).fehlt.length>0; },
 dann:function(A,B,H,N){
   var f=H.bilanz(A).fehlt[0];
   var t={Feuer:{w:'Anlauf und Zuversicht',k:'Diese Person wartet auf ein Gefühl von Begeisterung, '+
      'das bei ihr so nicht kommt, und hält das Ausbleiben für ein Zeichen, dass es das Falsche ist.',
      a:'Nicht auf Begeisterung warten, sondern anfangen und schauen, ob sie nachkommt. '+
        'Bei fehlendem Feuer entsteht Motivation nach der Handlung, nicht davor.'},
    Erde:{w:'Boden und Machbarkeit',k:'Pläne bleiben groß und werden nicht klein genug, um zu starten. '+
      'Geld, Zeit und Material werden konsequent zu optimistisch geschätzt.',
      a:'Jeden Plan von jemandem mit viel Erde gegenrechnen lassen — und zwar die Zahlen, '+
        'nicht die Idee. Beim ersten eigenen Angebot den Preis nicht selbst festlegen.'},
    Luft:{w:'Abstand und Einordnung',k:'Alles wird persönlich genommen und sofort gefühlt. '+
      'Der Schritt zurück, von dem aus man die Lage nüchtern ansieht, fehlt.',
      a:'Entscheidungen nicht am selben Tag treffen, an dem das Gefühl dazu entstanden ist. '+
        'Aufschreiben hilft hier mehr als reden.'},
    Wasser:{w:'Gespür für Zwischentöne',k:'Diese Person übersieht, wie es anderen mit ihr geht, '+
      'und wundert sich über Reaktionen, die für alle anderen absehbar waren.',
      a:'Vor wichtigen Gesprächen jemanden fragen, der viel Wasser hat, wie das wohl ankommt. '+
        'Nicht als Schwäche, sondern als Arbeitsschritt.'}};
   var x=t[f];
   return {art:'reibung', titel:'Es fehlt '+f+' — also '+x.w,
     text:'In der gewichteten Bilanz kommt <b>'+f+'</b> kaum vor. Im Beruf macht sich das so '+
       'bemerkbar: '+x.k,
     ansatz:x.a,
     beleg:'Element '+f+' unter 10 Prozent'};
 }},

{id:'bf-uranus', modus:'solo', gewicht:7,
 wenn:function(A,B,H){
   if(A.Uranus===undefined||A.MC===undefined) return false;
   return H.wo(A,'Uranus')===10 || !!H.asp(A,'Uranus','MC',6) ||
          H.wo(A,'Uranus')===6; },
 dann:function(A,B,H,N){
   var wo=H.wo(A,'Uranus');
   return {art:'reibung', titel:'Der normale Weg wird nicht funktionieren',
     text:'Uranus steht im '+wo+'. Haus'+(H.asp(A,'Uranus','MC',6)?' und im Winkel zum MC':'')+
       '. Diese Person wird in einer gewöhnlichen Anstellung mit gewöhnlichem Ablauf unglücklich, '+
       'und zwar verlässlich, auch wenn die Stelle objektiv gut ist. Das sieht von außen nach '+
       'Sprunghaftigkeit aus und ist eine Anlage: Sie braucht Entscheidungsfreiheit über das Wie.',
     ansatz:'Nicht die nächste Stelle suchen, sondern die nächste Bedingung: Wie viel darf sie '+
       'selbst festlegen? Bei dieser Stellung ist Autonomie wichtiger als Inhalt, Gehalt oder Titel.',
     beleg:'Uranus '+H.stellung(A.Uranus)+' im '+wo+'. Haus'};
 }},

{id:'bf-preis', modus:'solo', gewicht:8, nurForm:['selbst'],
 wenn:function(A,B,H){
   if(A.Venus===undefined) return false;
   var v=H.asp(A,'Venus','Saturn'), n=H.asp(A,'Venus','Neptun');
   return (v&&v.art==='hart')||!!n||H.drin(A,2).length===0; },
 dann:function(A,B,H,N){
   var v=H.asp(A,'Venus','Saturn'), n=H.asp(A,'Venus','Neptun'), leer=(H.drin(A,2).length===0);
   var grund = (v&&v.art==='hart') ? 'Venus '+v.typ+' Saturn — Wert und Knappheit hängen hier zusammen, '+
       'und deshalb fühlt sich jeder Preis zu hoch an, sobald er ausgesprochen ist'
     : n ? 'Venus im Winkel zu Neptun — der eigene Wert ist hier nicht scharf zu sehen, und was '+
       'nicht scharf zu sehen ist, wird niedriger geschätzt'
     : 'ein unbesetztes 2. Haus — es gibt kein inneres Maß für den eigenen Wert, also wird das '+
       'Maß von außen übernommen, und von außen kommt immer zu wenig';
   return {art:'reibung', titel:'Der Preis wird zu niedrig angesetzt',
     text:'Für die Selbstständigkeit ist das die wichtigste Stelle im Chart: '+grund+'. Das führt '+
       'nicht zu einem einmaligen Fehler, sondern zu einem Muster — nachlassen, wenn jemand zögert, '+
       'Zusatzarbeit nicht berechnen, bei sympathischen Leuten weniger nehmen.',
     ansatz:'Den Preis vor dem Gespräch aufschreiben und genau diesen nennen, ohne Begründung. '+
       'Und: ihn an der Arbeit ausrichten, nicht an der Lage der Kundin. Wer bei dieser Stellung '+
       'im Gespräch rechnet, rechnet sich herunter.',
     beleg: v?('Venus '+v.typ+' Saturn'):(n?'Venus '+n.typ+' Neptun':'2. Haus unbesetzt')};
 }},

{id:'bf-sichtbar-hemmung', modus:'solo', gewicht:8, nurForm:['sichtbar'],
 wenn:function(A,B,H){ return A.ASC!==undefined; },
 dann:function(A,B,H,N){
   var z=H.hausZeichen(A,1), zn=H.ZEICHEN[z], d=H.drin(A,1), o=H.oben(A);
   var leise=(o<=4)||H.drin(A,12).length>=2;
   return {art: leise?'reibung':'staerke',
     titel: leise?'Sichtbarkeit kostet hier echte Kraft':'Sichtbarkeit ist hier kein Hindernis',
     text:'Der Aszendent steht in <b>'+zn+'</b>'+(d.length?', im 1. Haus '+d.join(', '):'')+
       '. So tritt '+N.a+' auf, bevor sie etwas sagt. '+
       (leise
         ? 'Dazu kommt, dass das Chart nach innen gewichtet ist. Sichtbarkeit ist hier erlernbar, '+
           'aber sie verbraucht etwas — nach einem Auftritt braucht diese Person länger zurück '+
           'als andere, und das ist keine Unsicherheit.'
         : 'Das Chart ist nach außen gewichtet: Gesehen zu werden kostet hier nichts Zusätzliches. '+
           'Wenn es trotzdem hakt, liegt es nicht an der Anlage, sondern an einer Erfahrung.'),
     ansatz: leise?'Nicht mehr auftreten, sondern seltener und länger: ein ausführlicher Beitrag '+
       'statt täglicher Präsenz. Und nach jedem Auftritt feste Erholung einplanen, bevor der '+
       'nächste Termin kommt.':undefined,
     beleg:'AC in '+zn+' · '+o+' Planeten oberhalb'};
 }},

/* ───────── Was zu tun ist ───────── */
{id:'bf-schritt', modus:'solo', gewicht:9,
 wenn:function(A,B,H,N){ return !!N; },
 dann:function(A,B,H,N){
   var f=bfFeld(N), F=H.feld(A,f), h=F.schwerstes||10;
   var schritt={1:'eine Woche lang aufschreiben, wofür Leute sie ansprechen — ungefiltert',
    2:'den eigenen Stundensatz oder Preis einmal aufschreiben und ihn drei Leuten zeigen',
    3:'das, was sie kann, in drei Sätzen aufschreiben, die eine Fremde versteht',
    4:'klären, wie viel Sicherheit sie wirklich braucht, in Euro pro Monat, nicht im Gefühl',
    5:'eine Sache öffentlich machen, die sie bisher nur für sich gemacht hat',
    6:'eine Woche lang die Arbeitszeit mitschreiben und ansehen, wohin sie wirklich geht',
    7:'eine Person fragen, die sie gut kennt, worin sie sie arbeiten sieht',
    8:'die eine Frage aufschreiben, die sie bei dem Thema vermeidet',
    9:'sich eine Fortbildung ansehen, nicht um sie zu buchen, sondern um die Reaktion zu beobachten',
    10:'drei Menschen benennen, deren Beruf sie beneidet, und notieren, was genau sie daran beneidet',
    11:'drei Leute ansprechen, die das schon machen, und nach dem Alltag fragen, nicht nach dem Weg',
    12:'zwei Wochen nichts entscheiden und stattdessen notieren, was von selbst wiederkommt'};
   return {art:'aufgabe', titel:'Der nächste Schritt',
     text:'Für „'+(N.formName||'diese Frage')+'" liegt das meiste Gewicht im <b>'+h+'. Haus</b> ('+
       BF_HN[h-1]+'). Daraus folgt ein Schritt, der klein genug ist, dass er diese Woche passiert.',
     tun:'Konkret: '+schritt[h]+'.',
     beleg:'schwerstes Feldhaus: '+h};
 }},

{id:'bf-rhythmus', modus:'solo', gewicht:6,
 wenn:function(A,B,H){ return A.ASC!==undefined; },
 dann:function(A,B,H,N){
   var m=H.bilanz(A).modStark;
   var t={kardinal:{w:'Anfangen fällt leicht, Fertigwerden nicht.',
      tun:'Nichts Neues anfangen, bevor eine begonnene Sache abgeschlossen ist. Eine Liste der '+
        'offenen Anfänge sichtbar aufhängen — nicht zur Motivation, sondern als Bremse.'},
    fix:{w:'Dranbleiben fällt leicht, Loslassen nicht.',
      tun:'Einmal im Quartal eine Sache bewusst beenden, die nur aus Gewohnheit weiterläuft. '+
        'Termin dafür vorher eintragen, sonst passiert es nicht.'},
    'veränderlich':{w:'Anpassen fällt leicht, Festlegen nicht.',
      tun:'Entscheidungen mit einem Datum versehen, an dem sie gefallen sein müssen, und jemandem '+
        'davon erzählen. Ohne äußeren Punkt bleibt hier alles offen.'}};
   var x=t[m];
   return {art:'aufgabe', titel:'Der Arbeitstakt: überwiegend '+m,
     text:x.w+' Das ist keine Charakterfrage, sondern der Takt, in dem diese Person arbeitet. '+
       'Ein Arbeitsmodell, das dagegen gebaut ist, kostet dauerhaft Kraft.',
     tun:x.tun,
     beleg:'Schwerpunkt '+m};
 }},

{id:'bf-grenze', modus:'solo', gewicht:6, nurForm:['klemmt','selbst','wechsel'],
 wenn:function(A,B,H){ return A.ASC!==undefined; },
 dann:function(A,B,H,N){
   var z=H.hausZeichen(A,6), zn=H.ZEICHEN[z], d12=H.drin(A,12).length;
   return {art:'aufgabe', titel:'Die Grenze, die hier fehlt',
     text:'Wer '+BF_WIE[zn]+' arbeitet, läuft in eine bestimmte Erschöpfung hinein — bei '+zn+
       ' am 6. Haus ist das '+
       ({Widder:'das Verheizen in Schüben, bis nichts mehr geht',Stier:'das Weitermachen, obwohl es längst nicht mehr trägt',
         Zwillinge:'die Zersplitterung in zu viele Fäden',Krebs:'das Mitnehmen der Stimmung aller anderen',
         'Löwe':'das Nicht-abgeben-Können',Jungfrau:'das Nachbessern, lange nachdem es gut war',
         Waage:'das Zurückstellen der eigenen Sache zugunsten der Abstimmung',
         Skorpion:'das Durchziehen bis zur völligen Entleerung',
         'Schütze':'das Zusagen von zu viel, weil es im Moment möglich scheint',
         Steinbock:'das Pflichtgefühl, das keine Pause zulässt',
         Wassermann:'das Alleinmachen, weil Abstimmen zu lange dauert',
         Fische:'das Verschwimmen von Arbeit und Rest des Lebens'})[zn]+'.'+
       (d12>=2?' Mit '+d12+' Planeten im 12. Haus kommt dazu, dass der Erschöpfungspunkt früher liegt als gedacht.':''),
     tun:'Eine einzige Grenze festlegen und sie überprüfbar machen: eine Uhrzeit, eine Anzahl, '+
       'ein Wochentag. Keine Haltung, sondern eine Zahl.',
     beleg:'6. Haus in '+zn};
 }},

/* ───────── Für die Coachin ───────── */
{id:'bf-frage', modus:'solo', gewicht:7,
 wenn:function(A,B,H,N){ return !!N; },
 dann:function(A,B,H,N){
   var q={richtung:'Was hast du zuletzt gemacht, bei dem du vergessen hast, auf die Uhr zu sehen?',
    selbst:'Was würdest du auch dann noch machen, wenn niemand dafür zahlt — und was auf keinen Fall?',
    wechsel:'Was genau willst du hinter dir lassen? Die Aufgabe, die Leute oder die Bedingungen?',
    sichtbar:'Vor wem genau willst du nicht gesehen werden? Die Antwort darauf ist meistens der Kern.',
    klemmt:'Seit wann genau geht es nicht mehr — und was war in dem Monat davor los?'};
   return {art:'beratung', titel:'Die Frage, mit der ich anfangen würde',
     text:'Für „'+(N.formName||'diese Frage')+'" ist das der Einstieg, der am meisten bringt: '+
       '<b>„'+q[bfFrage(N)]+'"</b> Nicht, weil das Chart sie vorgibt, sondern weil sie bei dieser '+
       'Fragestellung am schnellsten an das Konkrete kommt.',
     tun:'Die Antwort stehen lassen und nicht gleich einordnen. Die zweite Antwort auf dieselbe '+
       'Frage ist meistens die brauchbare.'};
 }},

{id:'bf-vorsicht', modus:'solo', gewicht:6,
 wenn:function(A,B,H){ return A.MC!==undefined; },
 dann:function(A,B,H,N){
   var herr=H.HERRSCHER[H.zi(A.MC)], wo=H.wo(A,herr), oben=H.oben(A);
   var risiko = (wo===12||wo===8) ? 'Dieses Chart wird dir weniger zeigen, als da ist. Die Person '+
       'wird ihre eigenen Fähigkeiten im Gespräch kleiner machen, als sie sind — nicht aus '+
       'Bescheidenheit, sondern weil sie sie nicht als Fähigkeiten zählt.'
     : oben>=7 ? 'Dieses Chart wirkt im Gespräch klarer, als die Lage ist. Viel Gewicht nach außen '+
       'heißt auch: eine gut eingeübte Außendarstellung. Frag zweimal nach, bevor du es für geklärt hältst.'
     : 'Keine auffällige Verzerrung zu erwarten. Was im Gespräch kommt, ist ungefähr die Lage.';
   return {art:'beratung', titel:'Womit du bei diesem Chart rechnen solltest',
     text:risiko,
     beleg:herr+' im '+wo+'. Haus · '+oben+' Planeten oberhalb'};
 }},

{id:'bf-tempo', modus:'solo', gewicht:5,
 wenn:function(A,B,H){ return A.ASC!==undefined; },
 dann:function(A,B,H,N){
   var b=H.bilanz(A), s=H.sekte(A);
   var schnell=(b.stark==='Feuer'||b.stark==='Luft');
   return {art:'beratung', titel:'Tempo und Dosis',
     text: schnell
       ? 'Schwerpunkt '+b.stark+': Diese Person verträgt Tempo und wird ungeduldig, wenn zu lange '+
         'sortiert wird. Gib ihr früh etwas zum Ausprobieren, auch wenn es noch nicht fertig durchdacht ist.'
       : 'Schwerpunkt '+b.stark+': Diese Person braucht Zeit zwischen den Sitzungen, und sie wird '+
         'im Termin selbst weniger zeigen, als danach passiert. Dräng nicht auf Entschlüsse im Raum.',
     tun:(s==='nacht'?'Nachtgeburt: Vorgaben und Pläne von außen greifen hier schlechter als '+
       'Vereinbarungen, die sie selbst formuliert hat. Lass sie den Satz sprechen, nicht dich.'
       :'Taggeburt: Klare Vorgaben und Termine helfen hier und werden nicht als Bevormundung erlebt.'),
     beleg:b.stark+' · '+s};
 }}
];

/* ══ Das Ergebnis ═════════════════════════════════════════════
   Zwei Achsen statt einer: Liegt die Kraft überhaupt in dem Bereich,
   um den es gerade geht — und trägt dort mehr, als bremst?        */
function berufErgebnis(treffer, A, B, H, N){
  var gt=0, gb=0, nt=0, nb=0;
  treffer.forEach(function(t){
    if(t.art==='staerke'){ nt++; gt+=t.gewicht; }
    if(t.art==='reibung'){ nb++; gb+=t.gewicht; }
  });
  var f=bfFeld(N), F=H.feld(A,f), dichte=F.anteil/(f.length/12);
  var hier=(dichte>=1.05);
  var traegt=(gt>=gb);
  var stufe = hier ? (traegt?'klar':'blockiert') : (traegt?'anderswo':'offen');

  var T={
   klar:{t:'Die Richtung steht im Chart',
     x:'Das Gewicht liegt in genau dem Bereich, um den es gerade geht, und was dort steht, trägt '+
       'mehr, als es bremst. Bei dieser Lage ist die Aufgabe nicht, etwas zu finden, sondern das '+
       'Vorhandene zu benennen und anzufangen. Wenn es sich trotzdem unklar anfühlt, liegt das '+
       'meistens daran, dass die Antwort zu naheliegend ist, um ernst genommen zu werden.'},
   blockiert:{t:'Die Richtung steht — der Weg dorthin ist der Engpass',
     x:'Das Gewicht liegt im richtigen Bereich, aber dort steht mehr Widerstand als Rückenwind. '+
       'Das ist der Fall, bei dem Orientierungsarbeit nichts bringt: Die Richtung ist nicht das '+
       'Problem. Es geht um die Bedingungen — Tempo, Geld, Erlaubnis, Erschöpfung — und die '+
       'stehen unten einzeln mit einem Ansatz.'},
   anderswo:{t:'Die Kraft liegt nicht da, wo gerade gesucht wird',
     x:'In dem Bereich, um den es bei dieser Fragestellung geht, liegt weniger Gewicht als im '+
       'Schnitt zu erwarten wäre — anderswo im Chart steht deutlich mehr, und es trägt. Das ist '+
       'oft die nützlichste Auskunft überhaupt: Vielleicht ist die gestellte Frage nicht die, '+
       'an der sich gerade etwas entscheidet. Probier die Analyse einmal mit einer anderen Form.'},
   offen:{t:'Breit angelegt, ohne eine feste Spur',
     x:'Weder liegt das Gewicht in diesem Bereich, noch überwiegt dort das Tragende. Bei so einem '+
       'Chart ist die Berufsrichtung tatsächlich offen, und das ist eine Anlage und kein Versäumnis. '+
       'Solche Menschen entscheiden sich spät und oft mehrfach. Arbeitet nicht an der Richtung, '+
       'sondern an den Bedingungen, unter denen ausprobiert werden kann, ohne dass es teuer wird.'}
  };
  return {stufe:stufe, titel:T[stufe].t, text:T[stufe].x,
    dichte:dichte,
    waage:{links:Math.round(gt), rechts:Math.round(gb),
           llab:nt+' trägt', rlab:nb+' bremst'}};
}

T_BERUF.regeln=R_BERUF;
T_BERUF.ergebnis=berufErgebnis;
