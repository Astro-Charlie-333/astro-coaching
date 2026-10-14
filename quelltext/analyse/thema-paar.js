/* Astro-Charlie · Thema „Zwei Menschen"
   ==================================================================
   Geschrieben für die Beratung von zwei Menschen gleichzeitig —
   nicht dafür, einer Person zu erklären, wie sie mit der anderen
   umgeht. Deshalb steht „gemeinsamer Nenner" vor „Reibung", und
   jede Reibung hat einen Ansatz, der für beide gilt.

   {A} und {B} werden durch die Namen ersetzt.                      */

var T_PAAR={
 schluessel:'paar',
 n:'Zwei Menschen',
 modus:'paar',
 was:'Wo ihr euch trefft, wo es reibt, und was beide tun können.',
 formen:[
  {k:'liebe',   n:'Paar',          t:'romantisch, zusammenlebend oder nicht'},
  {k:'eltern',  n:'Eltern & Kind', t:'erwachsen, mit altem Muster'},
  {k:'freund',  n:'Freundschaft',  t:'gewählt, auf Augenhöhe'},
  {k:'familie', n:'Geschwister',   t:'gemeinsam aufgewachsen'}
 ],
 /* Welche Häuser für diese Frage zählen — je Form anders */
 formLabel:'Als',
 felder:{
  liebe:  [7,8,5,4,1], eltern:[4,10,12,8,1],
  freund: [11,3,9,5,1], familie:[3,4,11,8,1]
 }
};

/* ══ Die Regeln ═══════════════════════════════════════════════ */
var R_PAAR=[

/* ───────── Was die gewählte Form ändert ───────── */
{id:'bild-feld', modus:'paar', gewicht:9,
 wenn:function(A,B,H,N){ return !!(N&&N.felder&&N.felder.length); },
 dann:function(A,B,H,N){
   var hn=['Auftreten','Wert','Sprache','Zuhause','Ausdruck','Alltag','Partnerschaft',
     'Tiefe','Sinn','Beruf','Gruppen','Rückzug'];
   var f=N.felder, FA=H.feld(A,f), FB=H.feld(B,f);
   var da=FA.anteil/(f.length/12), db=FB.anteil/(f.length/12);
   var beide=(da>=1.05&&db>=1.05), keiner=(da<1&&db<1);
   return {art:'bild',
     titel: beide ? 'Für beide ist das ein Hauptschauplatz'
          : keiner ? 'Für beide läuft das nebenher'
          : 'Für eine wiegt das schwerer als für die andere',
     text:'Als <b>'+(N.formName||'Verbindung')+'</b> gelesen zählen die Häuser '+f.join(', ')+
       ' — '+f.map(function(h){ return hn[h-1]; }).join(', ')+'. '+
       (beide
         ? 'Beide haben dort überdurchschnittlich viel Gewicht. Deshalb geht es zwischen diesen '+
           'zweien schnell um etwas: Was hier passiert, trifft bei beiden einen besetzten Bereich.'
         : keiner
         ? 'Beide haben dort weniger Gewicht als im Schnitt zu erwarten wäre. Diese Verbindung '+
           'läuft für beide nebenher, und das ist keine schlechte Nachricht — es heißt nur, dass '+
           'Erwartungen an große Nähe hier an der Anlage vorbeigehen.'
         : 'Bei '+(da>=db?N.a:N.b)+' liegt dort deutlich mehr Gewicht als bei '+(da>=db?N.b:N.a)+
           '. Das ist der häufigste Grund für den Vorwurf, eine investiere mehr: Für die eine ist '+
           'das hier ein Hauptschauplatz, für die andere einer von mehreren. Beide haben recht.'),
     beleg:'Felddichte '+N.a+' '+H.kz(da,2)+' · '+N.b+' '+H.kz(db,2)};
 }},

{id:'aufg-feld', modus:'paar', gewicht:7,
 wenn:function(A,B,H,N){ return !!(N&&N.felder&&N.felder.length); },
 dann:function(A,B,H,N){
   var hn=['Auftreten','Wert','Sprache','Zuhause','Ausdruck','Alltag','Partnerschaft',
     'Tiefe','Sinn','Beruf','Gruppen','Rückzug'];
   var f=N.felder, best=-1, bh=f[0];
   f.forEach(function(h){
     var d=Math.abs(H.gewichtHaus(A,h)-H.gewichtHaus(B,h));
     if(d>best){ best=d; bh=h; } });
   var mehr=(H.gewichtHaus(A,bh)>=H.gewichtHaus(B,bh))?N.a:N.b;
   var weniger=(mehr===N.a)?N.b:N.a;
   var frage={1:'wie viel Raum jede für sich braucht',2:'was beiden etwas wert ist, auch in Geld',
     3:'wie viel geredet wird und worüber',4:'was Zuhause heißen soll',
     5:'wie viel Spiel und Zeigen dazugehört',6:'wer den Alltag trägt',
     7:'was eine Verbindung verbindlich macht',8:'was geteilt wird und was nicht',
     9:'wohin das Ganze auf lange Sicht soll',10:'welche Rolle jede nach außen hat',
     11:'wie viel andere Leute dazugehören',12:'wie viel Rückzug erlaubt ist'};
   return {art:'aufgabe', titel:'Der Punkt, an dem ihr am weitesten auseinanderliegt',
     text:'Von den Häusern, die für „'+(N.formName||'diese Verbindung')+'" zählen, ist das '+bh+
       '. ('+hn[bh-1]+') das mit dem größten Unterschied: '+mehr+' bringt dort deutlich mehr '+
       'Gewicht mit als '+weniger+'. Daraus entstehen Erwartungen, die nie ausgesprochen wurden, '+
       'weil sie für '+mehr+' selbstverständlich sind.',
     tun:'Setzt euch einmal zusammen und beantwortet beide getrennt dieselbe Frage: '+
       frage[bh]+'. Erst aufschreiben, dann vergleichen — nicht gleich besprechen.',
     beleg:bh+'. Haus: '+H.kz(H.gewichtHaus(A,bh))+' zu '+H.kz(H.gewichtHaus(B,bh))};
 }},

/* ───────── Das Bild: was für ein Fall das überhaupt ist ───────── */
{id:'bild-element', modus:'paar', gewicht:10,
 wenn:function(A,B,H){ return true; },
 dann:function(A,B,H,N){
   var a=H.bilanz(A), b=H.bilanz(B);
   var gleich=(a.stark===b.stark);
   var paare={'Feuer|Luft':1,'Luft|Feuer':1,'Erde|Wasser':1,'Wasser|Erde':1};
   var vertraegt=paare[a.stark+'|'+b.stark];
   return {art:'bild',
     titel: gleich ? 'Ihr seid aus demselben Stoff'
          : vertraegt ? 'Verschieden, aber verträglich'
          : 'Zwei verschiedene Betriebssysteme',
     text: gleich
       ? N.a+' und '+N.b+' haben beide den Schwerpunkt in <b>'+a.stark+'</b>. '+
         'Ihr versteht euch im Grundton ohne Übersetzung — und ihr habt dieselben blinden Flecken. '+
         'Was euch beiden fehlt, fehlt eben doppelt, und niemand im Raum merkt es.'
       : vertraegt
       ? N.a+' liegt auf <b>'+a.stark+'</b>, '+N.b+' auf <b>'+b.stark+'</b>. '+
         'Die beiden vertragen sich: Sie reiben nicht, sie ergänzen. Das ist die Mischung, '+
         'bei der jede von der anderen etwas lernen kann, ohne sich dafür verbiegen zu müssen.'
       : N.a+' liegt auf <b>'+a.stark+'</b>, '+N.b+' auf <b>'+b.stark+'</b>. '+
         'Diese beiden Elemente arbeiten verschieden — nicht gegeneinander, aber auch nicht '+
         'von selbst zusammen. Vieles zwischen euch ist Übersetzungsarbeit und wird mit '+
         'der Zeit leichter, aber nie ganz selbstverständlich.',
     beleg:N.a+': '+a.stark+' · '+N.b+': '+b.stark};
 }},

{id:'bild-modus', modus:'paar', gewicht:7,
 wenn:function(A,B,H){ return H.bilanz(A).modStark===H.bilanz(B).modStark; },
 dann:function(A,B,H,N){
   var m=H.bilanz(A).modStark;
   var t={kardinal:'Ihr fangt beide gern an. Das heißt auch: Ihr habt beide eine Meinung dazu, '+
      'wo es langgeht, und keine von euch folgt gern. Rechnet damit, dass Entscheidungen bei '+
      'euch länger dauern als sie müssten — nicht aus Uneinigkeit über das Ziel, sondern darüber, wer führt.',
    fix:'Ihr haltet beide. Was ihr aufbaut, bleibt, und ihr seid zusammen ausgesprochen belastbar. '+
      'Der Preis: Wenn ihr euch festgefahren habt, gibt keine von euch nach — und zwar monatelang nicht.',
    'veränderlich':'Ihr seid beide beweglich und stellt euch aufeinander ein. Das macht den Alltag '+
      'leicht. Es heißt aber auch, dass Entscheidungen bei euch offen bleiben, bis sie jemand '+
      'von außen trifft oder bis es zu spät ist.'};
   return {art:'bild', titel:'Beide '+m, text:t[m], beleg:'Schwerpunkt '+m+' bei beiden'};
 }},

{id:'bild-sonnemond', modus:'paar', gewicht:9,
 wenn:function(A,B,H){ return !!H.synBeide(A,B,'Sonne','Mond',7); },
 dann:function(A,B,H,N){
   var k1=H.syn(A,B,'Sonne','Mond',7), k2=H.syn(A,B,'Mond','Sonne',7);
   var k=k1||k2;
   var wer = k1 ? [N.a,N.b] : [N.b,N.a];
   return {art: k.art==='weich'?'nenner':'bild',
     titel:'Sonne und Mond berühren sich',
     text:'Der Antrieb von '+wer[0]+' trifft auf das Sicherheitsbedürfnis von '+wer[1]+
       '. Das ist die klassische Verbindung zwischen zwei Menschen und der Grund, warum man '+
       'sich bei jemandem zu Hause fühlt, ohne es begründen zu können.'+
       (k.art==='hart'
        ? ' Bei euch steht sie unter Spannung: Was '+wer[0]+' will, verunsichert '+wer[1]+
          ' regelmäßig. Das trennt euch nicht — es ist der Stoff, aus dem eure wiederkehrende Diskussion ist.'
        : ' Bei euch läuft sie glatt. Ihr müsst dafür nichts tun, und genau deshalb fällt sie '+
          'erst auf, wenn ihr sie mit anderen Beziehungen vergleicht.'),
     beleg:'Sonne '+k.typ+' Mond, '+H.kz(k.orb)+'°'};
 }},

/* ───────── Gemeinsame Nenner ───────── */
{id:'nenner-mond-element', modus:'paar', gewicht:9,
 wenn:function(A,B,H){ return H.elem(A.Mond)===H.elem(B.Mond); },
 dann:function(A,B,H,N){
   var e=H.elem(A.Mond);
   var wie={Feuer:'Bewegung und etwas zu tun', Erde:'etwas Handfestes und Ruhe',
     Luft:'reden dürfen', Wasser:'Nähe und Zeit'};
   return {art:'nenner', titel:'Ihr beruhigt euch auf dieselbe Art',
     text:'Beide Monde stehen in <b>'+e+'</b>. Was euch runterbringt, ist dasselbe: '+
       wie[e]+'. Das ist der verlässlichste gemeinsame Nenner, den zwei Menschen haben können — '+
       'denn an schlechten Tagen entscheidet nicht, was ihr gemeinsam gut findet, sondern '+
       'was euch beide beruhigt.',
     tun:'Legt eine Sache fest, die ihr an schlechten Tagen beide tut, ohne zu verhandeln. '+
       (e==='Feuer'?'Rausgehen und schnell laufen.':
        e==='Erde'?'Zusammen kochen oder aufräumen, ohne zu reden.':
        e==='Luft'?'Zwanzig Minuten reden, ohne dass eine etwas lösen muss.':
        'Nebeneinander sein, ohne Programm.'),
     beleg:'Mond in '+H.zeichen(A.Mond)+' und '+H.zeichen(B.Mond)};
 }},

{id:'nenner-merkur', modus:'paar', gewicht:8,
 wenn:function(A,B,H){
   var ea=H.elem(A.Merkur), eb=H.elem(B.Merkur);
   if(ea===eb) return true;
   var ok={'Feuer|Luft':1,'Luft|Feuer':1,'Erde|Wasser':1,'Wasser|Erde':1};
   return !!ok[ea+'|'+eb]; },
 dann:function(A,B,H,N){
   var gleich=H.elem(A.Merkur)===H.elem(B.Merkur);
   return {art:'nenner', titel:'Reden geht leicht',
     text: gleich
       ? 'Beide Merkure stehen in <b>'+H.elem(A.Merkur)+'</b> — ihr denkt im selben Tempo und '+
         'in derselben Art. Halbe Sätze reichen. Nutzt das: Was ihr besprecht, ist meistens geklärt, '+
         'auch wenn es kurz war.'
       : 'Eure Merkure stehen in Elementen, die sich vertragen ('+H.elem(A.Merkur)+' und '+
         H.elem(B.Merkur)+'). Ihr denkt verschieden, aber nicht gegeneinander — '+
         'die eine bringt, was der anderen fehlt.',
     tun:'Wichtiges mündlich klären, nicht schriftlich. Bei euch geht im Gespräch weniger verloren als im Text.',
     beleg:'Merkur in '+H.zeichen(A.Merkur)+' und '+H.zeichen(B.Merkur)};
 }},

{id:'nenner-venus', modus:'paar', ohneForm:['eltern','familie'], gewicht:7,
 wenn:function(A,B,H){ var k=H.synBeide(A,B,'Venus','Venus',6); return k&&k.art==='weich'; },
 dann:function(A,B,H,N){
   var k=H.synBeide(A,B,'Venus','Venus',6);
   return {art:'nenner', titel:'Ihr mögt Ähnliches',
     text:'Eure Venus-Stellungen stehen in gutem Winkel. Geschmack, Umgang mit Geld, '+
       'was ihr schön findet und was euch ein Abend wert ist — darüber müsst ihr nicht verhandeln. '+
       'Das klingt klein und ist im Alltag einer der größten Entlastungsfaktoren zwischen zwei Menschen.',
     tun:'Baut etwas daraus, das euch gehört: ein Ort, ein Essen, eine Gewohnheit. '+
       'Diese Stellung will etwas Gemeinsames, das keinen Zweck hat.',
     beleg:'Venus '+k.typ+' Venus, '+H.kz(k.orb)+'°'};
 }},

{id:'nenner-jupiter', modus:'paar', gewicht:7,
 wenn:function(A,B,H){
   return !!(H.synBeide(A,B,'Jupiter','Sonne',6)||H.synBeide(A,B,'Jupiter','Mond',6)); },
 dann:function(A,B,H,N){
   var k=H.synBeide(A,B,'Jupiter','Sonne',6)||H.synBeide(A,B,'Jupiter','Mond',6);
   return {art:'nenner', titel:'Zusammen traut ihr euch mehr',
     text:'Jupiter einer Person berührt die Lichter der anderen. Ihr macht euch gegenseitig größer — '+
       'ihr seht beieinander mehr Möglichkeiten als allein. Das ist der Kontakt, der Menschen dazu bringt, '+
       'gemeinsam Dinge anzufangen, die sie für sich nie angefangen hätten.',
     tun:'Nutzt es für genau eine Sache, die einer von euch allein nicht angehen würde. '+
       'Und schlaft vor jeder Zusage eine Nacht — bei diesem Kontakt ist die Begeisterung von beiden echt '+
       'und die Einschätzung von beiden zu optimistisch.',
     beleg:'Jupiter '+k.typ+', '+H.kz(k.orb)+'°'};
 }},

{id:'nenner-saturn-weich', modus:'paar', gewicht:8,
 wenn:function(A,B,H){
   var k=H.synBeide(A,B,'Saturn','Sonne',6)||H.synBeide(A,B,'Saturn','Mond',6);
   return k&&k.art==='weich'; },
 dann:function(A,B,H,N){
   return {art:'nenner', titel:'Ihr haltet',
     text:'Saturn einer Person liegt in gutem Winkel zu den Lichtern der anderen. '+
       'Das ist unspektakulär und das Wertvollste, was eine Verbindung haben kann: '+
       'Ihr bleibt, wenn es unangenehm wird. Verbindungen ohne diesen Kontakt sind oft heißer '+
       'und halten seltener.',
     tun:'Verlasst euch darauf, aber sprecht es aus. Verlässlichkeit, die nie benannt wird, '+
       'merkt man erst, wenn sie weg ist.',
     beleg:'Saturn in gutem Winkel zu den Lichtern'};
 }},

{id:'nenner-haus-ueberlagerung', modus:'paar', gewicht:8,
 wenn:function(A,B,H){
   var z=0;
   H.PERSOENLICH.forEach(function(k){ if(H.ueber(A,B,k)===H.ueber(B,A,k)) z++; });
   return z>=2; },
 dann:function(A,B,H,N){
   var treff=[];
   H.PERSOENLICH.forEach(function(k){
     var ha=H.ueber(A,B,k), hb=H.ueber(B,A,k);
     if(ha===hb&&ha) treff.push({p:k,h:ha}); });
   var hn=['Auftreten','Wert','Sprache','Zuhause','Ausdruck','Alltag','Partnerschaft',
     'Tiefe','Sinn','Beruf','Gruppen','Rückzug'];
   return {art:'nenner', titel:'Ihr trefft euch im selben Lebensbereich',
     text:'Mehrere Planeten fallen bei euch beiden in dasselbe Haus des anderen: '+
       treff.map(function(x){ return x.p+' ins '+x.h+'. ('+hn[x.h-1]+')'; }).join(', ')+'. '+
       'Das heißt praktisch: Ihr beschäftigt euch gegenseitig mit demselben Thema. '+
       'Was zwischen euch passiert, passiert immer wieder auf derselben Bühne.',
     tun:'Benennt diese Bühne. Wenn ihr wisst, dass es bei euch immer wieder um '+
       hn[treff[0].h-1]+' geht, streitet ihr darüber statt über den Anlass.',
     beleg:treff.map(function(x){return x.p+'→'+x.h+'.';}).join(' · ')};
 }},

{id:'nenner-ergaenzung', modus:'paar', gewicht:8,
 wenn:function(A,B,H){
   var a=H.bilanz(A), b=H.bilanz(B);
   return a.fehlt.length>0 && a.fehlt.indexOf(b.stark)>=0; },
 dann:function(A,B,H,N){
   var a=H.bilanz(A), b=H.bilanz(B);
   var was={Feuer:'Antrieb und Mut zum Anfangen', Erde:'Bodenhaftung und Umsetzung',
     Luft:'Überblick und Worte', Wasser:'Gespür und Tiefe'};
   return {art:'nenner', titel:N.b+' bringt, was '+N.a+' fehlt',
     text:'Bei '+N.a+' ist <b>'+b.stark+'</b> kaum vertreten — genau das ist bei '+N.b+
       ' am stärksten. '+N.b+' bringt also '+was[b.stark]+' mit, und zwar ohne Anstrengung. '+
       'Das ist der Grund, warum sich manche Verbindungen von außen unerklärlich anziehen.',
     tun:'Macht es ausdrücklich: In Fragen, die '+was[b.stark].split(' und ')[0]+
       ' brauchen, hat '+N.b+' das letzte Wort. Nicht aus Höflichkeit — weil es stimmt.',
     beleg:N.a+' ohne '+b.stark+', '+N.b+' stark in '+b.stark};
 }},

{id:'nenner-blinder-fleck', modus:'paar', gewicht:7,
 wenn:function(A,B,H){
   var a=H.bilanz(A), b=H.bilanz(B);
   return a.fehlt.length>0 && b.fehlt.length>0 &&
     a.fehlt.some(function(e){ return b.fehlt.indexOf(e)>=0; }); },
 dann:function(A,B,H,N){
   var a=H.bilanz(A), b=H.bilanz(B);
   var ge=a.fehlt.filter(function(e){ return b.fehlt.indexOf(e)>=0; })[0];
   var folge={Feuer:'Bei euch beiden wartet jemand darauf, dass die andere anfängt.',
     Erde:'Bei euch beiden bleibt das Praktische liegen — Papierkram, Termine, das Konkrete.',
     Luft:'Bei euch beiden wird zu wenig ausgesprochen und zu viel angenommen.',
     Wasser:'Bei euch beiden kommt das Gefühl zu spät zur Sprache, meist erst wenn es laut wird.'};
   return {art:'nenner', titel:'Euer gemeinsamer blinder Fleck: '+ge,
     text:'<b>'+ge+'</b> fehlt in beiden Charts. '+folge[ge]+' Das ist ein gemeinsamer Nenner — '+
       'nur ein unangenehmer. Und er ist wichtiger als die angenehmen, weil niemand von euch beiden '+
       'merkt, dass er fehlt.',
     tun:'Holt euch das von außen. Eine dritte Person, ein Termin, ein System. Nicht voneinander — '+
       'ihr habt es beide nicht.',
     beleg:ge+' bei beiden unter zehn Prozent'};
 }},

{id:'nenner-sekte', modus:'paar', gewicht:5,
 wenn:function(A,B,H){ return H.sekte(A)===H.sekte(B); },
 dann:function(A,B,H,N){
   var s=H.sekte(A);
   return {art:'nenner', titel:s==='tag'?'Beide Tagcharts':'Beide Nachtcharts',
     text: s==='tag'
       ? 'Ihr seid beide bei Tageslicht geboren. Ihr geht Dinge über Klarheit und Ansage an, '+
         'und ihr vertragt beide Direktheit besser als Andeutung.'
       : 'Ihr seid beide nach Sonnenuntergang geboren. Bei euch läuft mehr über Stimmung als über Ansage — '+
         'ihr merkt beide, wenn etwas nicht stimmt, lange bevor jemand es sagt.',
     tun: s==='tag' ? 'Sagt Dinge früher und direkter, als ihr es für nötig haltet. Bei euch kommt das an.'
          : 'Sprecht Stimmungen aus, bevor sie zum Thema werden. Ihr spürt sie ohnehin beide.',
     beleg:'Sonne '+(s==='tag'?'über':'unter')+' dem Horizont bei beiden'};
 }},

/* ───────── Reibung — jede mit Ansatz ───────── */
{id:'reib-mond-element', modus:'paar', gewicht:10,
 wenn:function(A,B,H){
   var p={'Feuer|Wasser':1,'Wasser|Feuer':1,'Erde|Luft':1,'Luft|Erde':1};
   return !!p[H.elem(A.Mond)+'|'+H.elem(B.Mond)]; },
 dann:function(A,B,H,N){
   var ea=H.elem(A.Mond), eb=H.elem(B.Mond);
   var br={Feuer:'Bewegung und sofortige Reaktion', Erde:'Ruhe und etwas Handfestes',
     Luft:'Reden und Abstand', Wasser:'Nähe und Zeit'};
   return {art:'reibung', titel:'Ihr beruhigt euch gegensätzlich',
     text:N.a+' braucht '+br[ea]+', '+N.b+' braucht '+br[eb]+' — und zwar genau im selben Moment. '+
       'Das ist der häufigste Dauerkonflikt zwischen zwei Menschen, und er hat nichts mit '+
       'gutem Willen zu tun: Was die eine beruhigt, reizt die andere.',
     ansatz:'Nicht gleichzeitig trösten. Wer zuerst dran ist, wird vorher ausgemacht, nicht im Moment '+
       'verhandelt. Zehn Minuten die eine Art, dann zehn Minuten die andere. Das klingt mechanisch '+
       'und ist bei dieser Konstellation das Einzige, was zuverlässig funktioniert.',
     beleg:'Mond '+ea+' gegen Mond '+eb};
 }},

{id:'reib-mond-saturn', modus:'paar', gewicht:9,
 wenn:function(A,B,H){ var k=H.synBeide(A,B,'Mond','Saturn',6); return k&&k.art==='hart'; },
 dann:function(A,B,H,N){
   var k1=H.syn(A,B,'Saturn','Mond',6);
   var wer = k1 ? [N.a,N.b] : [N.b,N.a];
   var k=H.synBeide(A,B,'Mond','Saturn',6);
   return {art:'reibung', titel:'Gefühl trifft auf Sachlichkeit',
     text:wer[0]+' reagiert auf Gefühle mit Einwänden, Lösungen oder Schweigen — '+
       'meist nicht abwertend gemeint, sondern aus Verlegenheit. '+wer[1]+' erlebt das als Kälte '+
       'und zeigt mit der Zeit weniger, was wiederum auf '+wer[0]+' unnahbar wirkt. '+
       'So verstärkt es sich von selbst.',
     ansatz:wer[0]+' sagt zuerst einen Satz, der nichts löst — „das klingt mies" reicht — und erst '+
       'danach das Praktische. '+wer[1]+' sagt im Gegenzug, was gerade gebraucht wird, statt es '+
       'erraten zu lassen. Beides ist unangenehm und beides wirkt sofort.',
     beleg:'Mond '+k.typ+' Saturn, '+H.kz(k.orb)+'°'};
 }},

{id:'reib-mars', modus:'paar', gewicht:9,
 wenn:function(A,B,H){ var k=H.synBeide(A,B,'Mars','Mars',6); return k&&k.art==='hart'; },
 dann:function(A,B,H,N){
   var k=H.synBeide(A,B,'Mars','Mars',6);
   return {art:'reibung', titel:'Ihr geht Dinge entgegengesetzt an',
     text:'Eure Mars-Stellungen stehen in hartem Winkel. Jede hält das Vorgehen der anderen '+
       'für den Fehler — nicht das Ziel, das Vorgehen. Deshalb wird aus einer Sachfrage bei euch '+
       'schnell ein Machtkampf, obwohl es um die Sache längst nicht mehr geht.',
     ansatz:'Aufteilen statt abstimmen. Zwei getrennte Zuständigkeiten funktionieren hier besser '+
       'als eine gemeinsame Entscheidung. Wo das nicht geht: Jede sagt zuerst, was sie am Vorgehen '+
       'der anderen <i>versteht</i>, bevor sie den Einwand bringt.',
     beleg:'Mars '+k.typ+' Mars, '+H.kz(k.orb)+'°'};
 }},

{id:'reib-merkur', modus:'paar', gewicht:8,
 wenn:function(A,B,H){
   var p={'Feuer|Erde':1,'Erde|Feuer':1,'Feuer|Wasser':1,'Wasser|Feuer':1,
     'Luft|Wasser':1,'Wasser|Luft':1,'Luft|Erde':1,'Erde|Luft':1};
   return !!p[H.elem(A.Merkur)+'|'+H.elem(B.Merkur)]; },
 dann:function(A,B,H,N){
   return {art:'reibung', titel:'Ihr denkt in verschiedenen Tempi',
     text:'Im Denken ist '+N.a+' <b>'+H.elem(A.Merkur)+'</b>, '+N.b+' <b>'+H.elem(B.Merkur)+
       '</b>. Missverständnisse entstehen bei euch nicht aus '+
       'Unwillen, sondern weil die eine schon weiter ist, während die andere noch sortiert — '+
       'oder weil die eine ein Gefühl meint und die andere ein Argument hört.',
     ansatz:'Wichtiges schriftlich. Im Geschriebenen verschwindet der Tempounterschied, und übrig '+
       'bleibt die Sache. Und: einmal wiederholen, was die andere gesagt hat, bevor geantwortet wird. '+
       'Bei dieser Kombination deckt das die Hälfte der Streits auf, bevor sie entstehen.',
     beleg:'Merkur in '+H.zeichen(A.Merkur)+' gegen '+H.zeichen(B.Merkur)};
 }},

{id:'reib-venus-mars', modus:'paar', nurForm:['liebe','freund'], gewicht:8,
 wenn:function(A,B,H){ var k=H.synBeide(A,B,'Venus','Mars',6); return k&&k.art==='hart'; },
 dann:function(A,B,H,N){
   var k1=H.syn(A,B,'Mars','Venus',6);
   var wer=k1?[N.a,N.b]:[N.b,N.a];
   var k=H.synBeide(A,B,'Venus','Mars',6);
   return {art:'reibung', titel:'Anziehung mit Widerhaken',
     text:wer[0]+' geht direkt auf '+wer[1]+' zu, '+wer[1]+' will Einvernehmen und zieht sich bei '+
       'Druck zurück — was '+wer[0]+' als Ablehnung liest und noch mehr drängen lässt. '+
       'Die Anziehung ist echt und bleibt. Sie übersetzt sich nur regelmäßig in Streit.',
     ansatz:wer[0]+' macht einen Schritt weniger, '+wer[1]+' sagt einen Satz mehr. '+
       'Beides fällt beiden schwer. Und: Prüft, ob bei euch jede Nähe über einen Konflikt läuft — '+
       'wenn ja, ist das ein Muster und kein Temperament, und daran kann man arbeiten.',
     beleg:'Venus '+k.typ+' Mars, '+H.kz(k.orb)+'°'};
 }},

{id:'reib-pluto', modus:'paar', gewicht:9,
 wenn:function(A,B,H){
   var k=H.synBeide(A,B,'Pluto','Venus',6)||H.synBeide(A,B,'Pluto','Mond',6);
   return k&&k.art==='hart'; },
 dann:function(A,B,H,N){
   var k1=H.syn(A,B,'Pluto','Venus',6)||H.syn(A,B,'Pluto','Mond',6);
   var wer=k1?[N.a,N.b]:[N.b,N.a];
   return {art:'reibung', titel:'Es geht hier um Kontrolle, nicht um den Anlass',
     text:wer[0]+'s Pluto berührt bei '+wer[1]+' etwas Empfindliches. Praktisch sieht das so aus: '+
       wer[0]+' will alles wissen und hält fest, '+wer[1]+' fängt an, Kleinigkeiten auszulassen — '+
       'nicht aus Falschheit, sondern um Luft zu haben. Was '+wer[0]+' wiederum bestätigt.',
     ansatz:wer[0]+' stellt eine Frage weniger und erträgt die Lücke. '+wer[1]+' erzählt eine Sache mehr, '+
       'unaufgefordert. Beides ist unangenehm und löst den Kreis. Wenn es sich zuspitzt, gehört das '+
       'in eine begleitete Beratung und nicht in ein Gespräch zu zweit.',
     beleg:'Pluto in hartem Winkel zu Venus oder Mond'};
 }},

{id:'reib-uranus', modus:'paar', gewicht:7,
 wenn:function(A,B,H){
   var k=H.synBeide(A,B,'Uranus','Sonne',6)||H.synBeide(A,B,'Uranus','Mond',6);
   return k&&k.art==='hart'; },
 dann:function(A,B,H,N){
   var k1=H.syn(A,B,'Uranus','Sonne',6)||H.syn(A,B,'Uranus','Mond',6);
   var wer=k1?[N.a,N.b]:[N.b,N.a];
   return {art:'reibung', titel:'Unberechenbarkeit gegen Verlässlichkeit',
     text:wer[0]+' ändert Pläne, sagt ab, taucht wieder auf — nie persönlich gemeint. '+
       wer[1]+' kann nicht einschätzen, woran er oder sie ist, und das untergräbt mehr als jeder Streit.',
     ansatz:'Verlässlichkeit an einer einzigen Stelle vereinbaren: ein fester Termin in der Woche, '+
       'der nicht verschoben wird. Der ganze Rest darf beweglich bleiben. Diese eine Insel reicht '+
       'erfahrungsgemäß aus.',
     beleg:'Uranus in hartem Winkel zu einem Licht'};
 }},

{id:'reib-fix', modus:'paar', gewicht:8,
 wenn:function(A,B,H){ return H.bilanz(A).modStark==='fix' && H.bilanz(B).modStark==='fix'; },
 dann:function(A,B,H,N){
   return {art:'reibung', titel:'Keine von euch gibt nach',
     text:'Beide Charts haben den Schwerpunkt auf <b>fix</b>. Ihr seid zusammen außerordentlich '+
       'belastbar — und wenn ihr euch festgefahren habt, bewegt sich monatelang nichts. '+
       'Nicht aus Bosheit: Nachgeben fühlt sich bei dieser Anlage wie Selbstaufgabe an.',
     ansatz:'Verabredet vorher eine Regel für den Fall. Zum Beispiel: Wer das Thema aufbringt, '+
       'bekommt beim ersten Mal recht; wer es zum zweiten Mal aufbringt, muss einen Vorschlag '+
       'mitbringen. Eine Regel, die vorher steht, ist bei euch wirksamer als jede Einsicht im Moment.',
     beleg:'fix bei beiden dominant'};
 }},

{id:'reib-kardinal', modus:'paar', gewicht:7,
 wenn:function(A,B,H){ return H.bilanz(A).modStark==='kardinal' && H.bilanz(B).modStark==='kardinal'; },
 dann:function(A,B,H,N){
   return {art:'reibung', titel:'Ihr wollt beide führen',
     text:'Beide Charts liegen auf <b>kardinal</b>. Ihr fangt gern an und habt beide eine Meinung '+
       'dazu, wo es langgeht. Der Konflikt bei euch dreht sich selten um das Ziel und fast immer '+
       'darum, wer entscheidet.',
     ansatz:'Gebiete aufteilen, dauerhaft und ohne Rückfrage. Eine entscheidet beim einen, '+
       'die andere beim anderen. Alles, was gemeinsam entschieden werden muss, wird bei euch '+
       'zum Dauerthema — also haltet diese Liste kurz.',
     beleg:'kardinal bei beiden dominant'};
 }},

{id:'reib-saturn-7', modus:'paar', gewicht:8,
 wenn:function(A,B,H){
   return H.ueber(A,B,'Saturn')===7 || H.ueber(B,A,'Saturn')===7 ||
          H.ueber(A,B,'Saturn')===4 || H.ueber(B,A,'Saturn')===4; },
 dann:function(A,B,H,N){
   var ab=(H.ueber(A,B,'Saturn')===7||H.ueber(A,B,'Saturn')===4);
   var wer=ab?[N.a,N.b]:[N.b,N.a];
   var h=ab?H.ueber(A,B,'Saturn'):H.ueber(B,A,'Saturn');
   return {art:'reibung', titel:'Es wird geprüft, bevor es getragen wird',
     text:wer[0]+'s Saturn fällt in '+wer[1]+'s '+h+'. Haus — '+(h===7?'Partnerschaft':'Zuhause')+'. '+
       'Dort wird '+wer[1]+' von '+wer[0]+' geprüft, meist ohne dass es jemandem auffällt: '+
       'Zusagen werden gewogen, Verlässlichkeit wird gemessen. Das fühlt sich für '+wer[1]+
       ' nach Misstrauen an und ist in Wahrheit die Art, wie '+wer[0]+' bindet.',
     ansatz:wer[0]+' sagt einmal ausdrücklich, woran '+wer[1]+' ist. Ein Satz. '+
       'Diese Prüfung hat ein Ende, aber sie dauert länger, als '+wer[1]+' es für nötig hält — '+
       'das zu wissen nimmt ihr die Schärfe.',
     beleg:'Saturn fällt ins '+h+'. Haus der anderen'};
 }},

/* ───────── Aufgaben für beide ───────── */
{id:'aufg-rhythmus', modus:'paar', gewicht:6,
 wenn:function(A,B,H){ return true; },
 dann:function(A,B,H,N){
   var ea=H.elem(A.Mond), eb=H.elem(B.Mond);
   var dauer={Feuer:'zehn Minuten', Erde:'zwanzig Minuten', Luft:'eine Viertelstunde', Wasser:'zwanzig Minuten'};
   var laenger = ['Feuer','Luft','Erde','Wasser'].indexOf(ea) > ['Feuer','Luft','Erde','Wasser'].indexOf(eb) ? ea : eb;
   return {art:'aufgabe', titel:'Ein fester Termin, kurz genug für beide',
     text:'Nehmt '+dauer[laenger]+' in der Woche, immer am selben Tag. Kein Problem lösen — '+
       'nur zwei Fragen: Was war gut, und was ist offen geblieben? '+
       'Die Länge richtet sich nach dem ungeduldigeren Mond von euch beiden, sonst hält es nicht.',
     tun:'Diese Woche einen Tag festlegen und ihn in beide Kalender eintragen.'};
 }},

{id:'aufg-uebersetzen', modus:'paar', gewicht:7,
 wenn:function(A,B,H){ return H.elem(A.Mond)!==H.elem(B.Mond); },
 dann:function(A,B,H,N){
   var br={Feuer:'in Bewegung', Erde:'mit etwas Handfestem', Luft:'im Reden', Wasser:'in Ruhe und Nähe'};
   return {art:'aufgabe', titel:'Die Übersetzung einmal aufschreiben',
     text:'Jede schreibt drei Sätze auf: „Es geht mir gut, wenn …", „Ich brauche dann …", '+
       '„Du merkst es daran, dass ich …". Dann tauscht ihr die Zettel. '+
       N.a+' beruhigt sich '+br[H.elem(A.Mond)]+', '+N.b+' '+br[H.elem(B.Mond)]+' — '+
       'das wisst ihr danach schwarz auf weiß und müsst es nicht mehr im Streit erraten.',
     tun:'Zettel aufheben. Beim nächsten Konflikt zuerst nachlesen, dann reden.'};
 }},

{id:'aufg-nenner-nutzen', modus:'paar', gewicht:6,
 wenn:function(A,B,H){ return H.bilanz(A).stark===H.bilanz(B).stark; },
 dann:function(A,B,H,N){
   var e=H.bilanz(A).stark;
   var vor={Feuer:'etwas Neues zusammen anfangen', Erde:'etwas Konkretes zusammen aufbauen',
     Luft:'etwas gemeinsam durchdenken oder planen', Wasser:'etwas gemeinsam durchstehen oder pflegen'};
   return {art:'aufgabe', titel:'Nehmt euch bewusst etwas vor, das zu euch beiden passt',
     text:'Euer gemeinsames Element ist <b>'+e+'</b>. Das heißt: '+vor[e]+' funktioniert bei euch '+
       'von selbst und gibt euch Boden für die Stellen, die schwer sind.',
     tun:'Ein Vorhaben für die nächsten drei Monate, das beide wollen. Klein genug, dass es klappt.'};
 }},

/* ───────── Für die Beratung ───────── */
{id:'ber-einstieg', modus:'paar', gewicht:9,
 wenn:function(A,B,H){ return true; },
 dann:function(A,B,H,N){
   var ea=H.elem(A.Mond), eb=H.elem(B.Mond);
   var gleich=(ea===eb);
   return {art:'beratung', titel:'Womit du anfängst',
     text: gleich
       ? 'Fang beim gemeinsamen Mond an. Dass beide sich auf dieselbe Art beruhigen, ist bei '+
         'diesem Paar der tragfähigste Boden — und ein guter Einstieg, weil beide sofort nicken.'
       : 'Fang nicht beim Konflikt an, sondern bei der Frage, wie sich jede von beiden beruhigt. '+
         'Bei verschiedenen Mondelementen ist das der Punkt, an dem beide sich zum ersten Mal '+
         'verstanden fühlen — und erst danach lässt sich über den Streit reden.',
     tun:'Frage an beide, einzeln beantworten lassen: „Woran merkt die andere, dass es dir schlecht geht?"'};
 }},

{id:'ber-wer-redet', modus:'paar', gewicht:7,
 wenn:function(A,B,H){ return H.elem(A.Merkur)!==H.elem(B.Merkur); },
 dann:function(A,B,H,N){
   var schnell = (H.elem(A.Merkur)==='Luft'||H.elem(A.Merkur)==='Feuer') ? N.a : N.b;
   var langsam = (schnell===N.a) ? N.b : N.a;
   return {art:'beratung', titel:'Wer in der Stunde mehr redet',
     text:schnell+' wird schneller antworten und damit mehr Raum nehmen — nicht aus Dominanz, '+
       'sondern weil '+langsam+' erst sortiert. Wenn du das laufen lässt, bekommst du am Ende '+
       'ein Bild von '+schnell+' und wenig von '+langsam+'.',
     tun:'Reihenfolge umdrehen: '+langsam+' zuerst, und zwar mit angekündigter Redezeit. '+
       'Oder schriftlich vorbereiten lassen.'};
 }},

{id:'ber-nicken', modus:'paar', gewicht:7,
 wenn:function(A,B,H){
   return H.zi(A.Mond)%4===2 || H.zi(B.Mond)%4===2 ||
          H.zi(A.Venus)===6 || H.zi(B.Venus)===6; },
 dann:function(A,B,H,N){
   var wer = (H.zi(A.Venus)===6||H.zi(A.Mond)%4===2) ? N.a : N.b;
   return {art:'beratung', titel:'Wer zustimmt, ohne es zu meinen',
     text:wer+' wird in der Stunde eher ausgleichen als widersprechen. Zustimmung von '+wer+
       ' ist deshalb kein verlässliches Signal — erst recht nicht, wenn die andere gerade '+
       'etwas Deutliches gesagt hat.',
     tun:'Nicht nach Einverständnis fragen, sondern nach Einwänden: „Was daran passt dir nicht?" '+
       'Und zwar bevor die andere Person antwortet.'};
 }},

{id:'ber-grenze', modus:'paar', gewicht:8,
 wenn:function(A,B,H){
   var k=H.synBeide(A,B,'Pluto','Mond',6)||H.synBeide(A,B,'Pluto','Venus',6);
   return !!(k&&k.art==='hart'); },
 dann:function(A,B,H,N){
   return {art:'beratung', titel:'Wo du nicht weitergehst',
     text:'Dieses Paar hat einen harten Pluto-Kontakt zu einem persönlichen Punkt. '+
       'Erwarte, dass unter dem Streitthema etwas Älteres liegt — bei einer von beiden, '+
       'oft bei beiden. Das kann in einer Coachingstunde auftauchen, und dann ist die Stunde zu Ende, '+
       'nicht erst das Thema.',
     tun:'Vorher sagen, wo deine Arbeit aufhört. Und eine Adresse parat haben, an die du abgeben kannst.'};
 }},

{id:'ber-aufteilung', modus:'paar', gewicht:6,
 wenn:function(A,B,H){
   var z=0; for(var h=1;h<=12;h++){ if(H.gewichtHaus(A,h)>=4&&H.gewichtHaus(B,h)>=4) z++; }
   return z===0; },
 dann:function(A,B,H,N){
   var hn=['Auftreten','Wert','Sprache','Zuhause','Ausdruck','Alltag','Partnerschaft',
     'Tiefe','Sinn','Beruf','Gruppen','Rückzug'];
   function schwer(C){ var b=0,bh=1;
     for(var h=1;h<=12;h++){ var w=H.gewichtHaus(C,h); if(w>b){b=w;bh=h;} } return bh; }
   var ha=schwer(A), hb=schwer(B);
   return {art:'beratung', titel:'Ihr Schwerpunkt liegt woanders',
     text:'Bei '+N.a+' liegt das meiste Gewicht im '+ha+'. Haus ('+hn[ha-1]+'), bei '+N.b+
       ' im '+hb+'. ('+hn[hb-1]+'). Kein gemeinsam stark besetztes Haus. Das heißt nicht, dass '+
       'es nicht passt — es heißt, dass die beiden an verschiedenen Fronten stehen und sich '+
       'gegenseitig schlecht einschätzen können, was die andere gerade kostet.',
     tun:'Lass beide beschreiben, womit die eigene Woche voll ist. Ohne Bewertung. '+
       'Oft ist das schon die halbe Beratung.'};
 }}
];

/* ══ Das Ergebnis: eine Rechnung, kein Textbaustein ═══════════ */
function paarErgebnis(treffer, A, B, H, N){
  var n=0, r=0, gn=0, gr=0;
  treffer.forEach(function(t){
    if(t.art==='nenner'){ n++; gn+=t.gewicht; }
    if(t.art==='reibung'){ r++; gr+=t.gewicht; }
  });
  var ges=gn+gr||1;
  var anteil=gn/ges;
  var stufe = anteil>=0.66 ? 'traegt'
            : anteil>=0.45 ? 'arbeit'
            : anteil>=0.3  ? 'anstrengend' : 'schwer';
  var T={
   traegt:{t:'Diese Verbindung trägt von selbst',
     x:'Die gemeinsamen Nenner überwiegen deutlich. Das heißt nicht, dass es keine Themen gibt — '+
       'es heißt, dass genug Boden da ist, um sie zu bearbeiten. Bei so einem Paar ist die Gefahr '+
       'nicht der Konflikt, sondern dass das Selbstverständliche nicht gepflegt wird.'},
   arbeit:{t:'Tragfähig, mit zwei, drei echten Baustellen',
     x:'Nenner und Reibung halten sich ungefähr die Waage. Das ist der häufigste Fall und der, '+
       'bei dem Beratung am meisten bringt: Es gibt genug Gemeinsames, um daran zu arbeiten, '+
       'und genug Reibung, dass es sich lohnt.'},
   anstrengend:{t:'Anstrengender als es aussieht',
     x:'Die Reibungspunkte wiegen schwerer als die Nenner. Solche Verbindungen funktionieren — '+
       'aber nicht nebenbei. Sie brauchen ausdrückliche Absprachen an den Stellen, an denen '+
       'andere Paare sich einfach verstehen.'},
   schwer:{t:'Viel Reibung, wenige selbstverständliche Berührungspunkte',
     x:'Die Rechnung fällt deutlich zur Reibung aus. Das ist kein Urteil über die Beziehung — '+
       'Charts sagen nichts darüber, ob zwei Menschen zusammen glücklich werden. Es sagt nur: '+
       'Was hier gut läuft, läuft nicht von allein, sondern weil beide es tun.'}
  };
  return {stufe:stufe, titel:T[stufe].t, text:T[stufe].x,
    nenner:n, reibung:r, anteil:anteil,
    zahl:{nenner:Math.round(gn), reibung:Math.round(gr)}};
}

T_PAAR.regeln=R_PAAR;
T_PAAR.ergebnis=paarErgebnis;
T_PAAR.grenzen={bild:3, nenner:6, reibung:6, aufgabe:4, beratung:5};
