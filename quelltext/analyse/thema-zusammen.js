/* Astro-Charlie · Thema „Zusammenarbeit"
   ==================================================================
   Zwei Charts, aber nicht privat: Team, Führung, Geschäftspartner,
   Übergabe. Dieselbe Haltung wie bei „Zwei Menschen" — gemeinsamer
   Nenner vor Reibung, und jede Reibung mit einem Ansatz, der für
   beide gilt, nicht mit einer Anleitung für eine Seite.

   Im Beruf liegt die Sache anders als privat: Es gibt Rollen, Geld
   und eine Aufgabe, die auch dann erledigt werden muss, wenn die
   Stimmung nicht stimmt. Deshalb zielen die Ansätze hier auf
   Vereinbarungen, nicht auf Verständnis.                            */

var T_ZUSAMMEN={
 schluessel:'zusammen',
 n:'Zusammenarbeit',
 modus:'paar',
 was:'Zwei Menschen, eine Aufgabe: wo es läuft, wo es knirscht, was vereinbart gehört.',
 formLabel:'Als',
 formen:[
  {k:'team',      n:'Team',             t:'auf Augenhöhe, geteilte Aufgabe'},
  {k:'fuehrung',  n:'Führung',          t:'eine führt, die andere arbeitet zu'},
  {k:'partner',   n:'Geschäftspartner', t:'gemeinsamer Besitz, gemeinsames Risiko'},
  {k:'uebergabe', n:'Übergabe',         t:'Einarbeitung, Nachfolge, Wissen weitergeben'}
 ],
 felder:{
  team:[6,11,3,10,1], fuehrung:[10,6,1,8,11],
  partner:[8,2,7,10,11], uebergabe:[6,3,10,4,9]
 },
 grenzen:{bild:3, nenner:6, reibung:6, aufgabe:4, beratung:4}
};

var ZU_HN=['Auftreten','Wert und Geld','Sprache','Zuhause','Ausdruck','Alltag und Handwerk',
 'Partnerschaft','Tiefe','Lehre und Ferne','Beruf','Gruppen','Rückzug'];

function zuFeld(N){ return (N&&N.felder&&N.felder.length)?N.felder:[6,11,3,10,1]; }
function zuForm(N){ return (N&&N.form)||'team'; }
/* „ihr" oder „Sie beide" — im Beruf wird seltener geduzt als privat,
   deshalb bleibt der Text bei den Namen statt bei der Anrede. */

var R_ZUSAMMEN=[

/* ───────── Das Bild ───────── */
{id:'zu-bild-modus', modus:'paar', gewicht:10,
 wenn:function(A,B,H){ return A.ASC!==undefined&&B.ASC!==undefined; },
 dann:function(A,B,H,N){
   var ma=H.bilanz(A).modStark, mb=H.bilanz(B).modStark;
   if(ma===mb){
     var t={kardinal:'Beide fangen gern an und beide haben eine Meinung dazu, wo es langgeht. '+
        'Dieses Gespann ist schnell und bringt zu wenig zu Ende, weil immer schon das Nächste '+
        'ruft. Und wenn es hakt, hakt es an der Frage, wer entscheidet — nicht am Ziel.',
      fix:'Beide halten durch. Was dieses Gespann aufbaut, steht auch in fünf Jahren noch. '+
        'Der Preis: Wenn eine Richtung einmal eingeschlagen ist, korrigiert hier niemand mehr, '+
        'und zwar auch dann nicht, wenn beide längst sehen, dass sie nicht stimmt.',
      'veränderlich':'Beide stellen sich aufeinander ein, und das macht die Zusammenarbeit '+
        'angenehm. Es heißt auch: Es gibt niemanden, der einen Schlusspunkt setzt. Entscheidungen '+
        'bleiben offen, bis sie jemand von außen trifft oder bis sie sich erledigt haben.'};
     return {art:'bild', titel:'Beide '+ma+' — dasselbe Tempo, dieselbe Lücke',
       text:t[ma], beleg:'Schwerpunkt '+ma+' bei beiden'};
   }
   var r={kardinal:'drängt auf Entscheidung', fix:'hält die Richtung',
     'veränderlich':'hält die Lage offen'};
   return {art:'bild', titel:'Verschiedene Takte',
     text:N.a+' '+r[ma]+' ('+ma+'), '+N.b+' '+r[mb]+' ('+mb+'). Das ist für eine Aufgabe eine '+
       'brauchbare Mischung und im Alltag anstrengend: Was für die eine schon entschieden ist, '+
       'ist für die andere noch in Prüfung. Der häufigste Satz in so einem Gespann lautet '+
       '„ich dachte, das sei durch".',
     beleg:N.a+': '+ma+' · '+N.b+': '+mb};
 }},

{id:'zu-bild-feld', modus:'paar', gewicht:9,
 wenn:function(A,B,H,N){ return !!N; },
 dann:function(A,B,H,N){
   var f=zuFeld(N), FA=H.feld(A,f), FB=H.feld(B,f);
   var da=FA.anteil/(f.length/12), db=FB.anteil/(f.length/12);
   var beide=(da>=1.05&&db>=1.05), keiner=(da<1&&db<1);
   return {art:'bild',
     titel: beide ? 'Beide sind in dieser Sache zu Hause'
          : keiner ? 'Für beide ist das Nebengelände'
          : 'Eine ist hier zu Hause, die andere nicht',
     text:'Für „'+(N.formName||'Zusammenarbeit')+'" zählen die Häuser '+f.join(', ')+'. '+
       (beide
         ? 'Beide haben dort überdurchschnittlich viel Gewicht. Das ist der Grund, warum die Sache '+
           'beiden wichtig ist — und auch der Grund, warum es hier heftiger wird als bei anderen: '+
           'Es geht für beide um etwas.'
         : keiner
         ? 'Beide haben dort unterdurchschnittlich wenig Gewicht. Diese Zusammenarbeit läuft '+
           'nebenbei, und das ist keine schlechte Nachricht: Was hier schiefgeht, trifft keine '+
           'von beiden im Kern. Erwartet keine große Begeisterung, dann reicht es.'
         : 'Bei '+(da>=db?N.a:N.b)+' liegt dort deutlich mehr Gewicht als bei '+(da>=db?N.b:N.a)+'. '+
           'Das erklärt das wiederkehrende Missverständnis über Einsatz: Für die eine ist das hier '+
           'der Hauptschauplatz, für die andere eine Aufgabe unter mehreren. Beide haben recht.'),
     beleg:'Felddichte '+N.a+' '+H.kz(da,2)+' · '+N.b+' '+H.kz(db,2)};
 }},

{id:'zu-bild-element', modus:'paar', gewicht:8,
 wenn:function(A,B,H){ return true; },
 dann:function(A,B,H,N){
   var a=H.bilanz(A).stark, b=H.bilanz(B).stark;
   if(a===b) return {art:'nenner', titel:'Dasselbe Betriebssystem: '+a,
     text:'Beide liegen auf <b>'+a+'</b>. Absprachen gehen hier schnell, weil wenig übersetzt '+
       'werden muss. Der blinde Fleck ist aber auch derselbe, und in einem Zweiergespann merkt '+
       'ihn niemand: '+
       ({Feuer:'Beide überschätzen, was in der Zeit geht.',
         Erde:'Beide halten zu lange an etwas fest, das sich nicht mehr rechnet.',
         Luft:'Beide reden eine Sache durch und setzen sie nicht um.',
         Wasser:'Beide vermeiden die unangenehme Ansage, bis es keine mehr braucht.'})[a]+
       ' Holt euch für genau diesen Punkt jemanden von außen dazu.',
     beleg:'beide '+a};
   var passt={'Feuer|Luft':1,'Luft|Feuer':1,'Erde|Wasser':1,'Wasser|Erde':1};
   var gut=passt[a+'|'+b];
   return {art: gut?'nenner':'bild', titel:(gut?'Verschieden und verträglich':'Zwei verschiedene Betriebssysteme'),
     text:N.a+' liegt auf <b>'+a+'</b>, '+N.b+' auf <b>'+b+'</b>. '+
       (gut
         ? 'Diese Mischung arbeitet gut: Was die eine liefert, braucht die andere, ohne dass '+
           'jemand sich dafür verstellen muss. In der Aufgabenteilung ist das der leichteste Fall.'
         : 'Diese Mischung arbeitet nicht von selbst zusammen. Vieles zwischen den beiden ist '+
           'Übersetzung, und das kostet in jedem Projekt Zeit, die niemand einplant. Mit den '+
           'Jahren wird es leichter, selbstverständlich wird es nicht.'),
     beleg:N.a+': '+a+' · '+N.b+': '+b};
 }},

/* ───────── Gemeinsame Nenner ───────── */
{id:'zu-nenner-merkur', modus:'paar', gewicht:9,
 wenn:function(A,B,H){ return A.Merkur!==undefined&&B.Merkur!==undefined&&
   H.elem(A.Merkur)===H.elem(B.Merkur); },
 dann:function(A,B,H,N){
   var e=H.elem(A.Merkur);
   var t={Feuer:'Beide reden in Richtungen und Absichten, nicht in Details. Eine kurze Ansage '+
      'reicht, und beide meinen dasselbe damit.',
    Erde:'Beide reden in konkreten Dingen: wer, was, bis wann. Diese zwei brauchen für eine '+
      'Absprache weniger Worte als andere und halten sie zuverlässiger.',
    Luft:'Beide denken im Gespräch und nicht vorher. Was hier gesagt wird, ist ein Vorschlag, '+
      'keine Festlegung — und beide wissen das voneinander.',
    Wasser:'Beide hören mit, wie etwas gemeint ist, nicht nur was gesagt wird. Vieles muss '+
      'zwischen diesen zweien gar nicht ausgesprochen werden.'};
   return {art:'nenner', titel:'Dieselbe Art zu reden',
     text:'Beide Merkure stehen in <b>'+e+'</b>. '+t[e]+' Das ist in der Zusammenarbeit mehr wert '+
       'als Sympathie: Missverständnisse entstehen hier selten an der Form.',
     beleg:'Merkur '+N.a+' '+H.zeichen(A.Merkur)+' · '+N.b+' '+H.zeichen(B.Merkur)};
 }},

{id:'zu-nenner-saturn', modus:'paar', gewicht:9,
 wenn:function(A,B,H){
   var s=H.synBeide(A,B,'Saturn','Saturn',6), m=H.synBeide(A,B,'Saturn','Merkur',5);
   return (!!s&&s.art==='weich')||(!!m&&m.art==='weich'); },
 dann:function(A,B,H,N){
   var s=H.synBeide(A,B,'Saturn','Saturn',6);
   var weich=(s&&s.art==='weich');
   return {art:'nenner', titel:'Dasselbe Verständnis davon, was verbindlich ist',
     text: weich
       ? 'Die beiden Saturne stehen weich zueinander ('+s.typ+'). Das klingt unspektakulär und '+
         'ist in der Zusammenarbeit viel wert: '+N.a+' und '+N.b+' meinen ungefähr dasselbe, '+
         'wenn sie „zugesagt" sagen. Wo andere Gespanne über Zuverlässigkeit streiten, müssen '+
         'diese zwei das nicht erst klären.'
       : 'Saturn der einen steht weich zum Merkur der anderen. Absprachen zwischen diesen beiden '+
         'werden ernst genommen und halten. Der Nebeneffekt: Es wird hier auch streng zugehört — '+
         'was gesagt wurde, gilt, auch wenn es nur so dahingesagt war.',
     beleg: weich?('Saturn '+s.typ+' Saturn, Orbis '+H.kz(s.orb)+'°')
                 :'Saturn weich zu Merkur zwischen den Charts'};
 }},

{id:'zu-saturn-hart', modus:'paar', gewicht:8,
 wenn:function(A,B,H){ var s=H.synBeide(A,B,'Saturn','Saturn',6); return !!s&&s.art==='hart'; },
 dann:function(A,B,H,N){
   var s=H.synBeide(A,B,'Saturn','Saturn',6);
   return {art:'reibung', titel:'Saturn '+s.typ+' Saturn — verschiedene Vorstellungen von Pflicht',
     text:'Die beiden Saturne stehen hart zueinander. Weil Saturn rund neunundzwanzig Jahre für '+
       'einen Umlauf braucht, heißt das fast immer: zwischen '+N.a+' und '+N.b+' liegen etwa '+
       'sieben, vierzehn oder einundzwanzig Jahre. Die beiden haben in verschiedenen Zeiten '+
       'gelernt, was man schuldet, wann etwas fertig ist und was man von sich aus tut. Der Streit '+
       'wirkt wie ein Streit über Arbeitsmoral und ist einer über Prägung.',
     ansatz:'Nicht über Haltung reden, sondern über Standards: Was heißt „fertig" bei dieser '+
       'Aufgabe, bis wann, in welcher Form? Einmal schriftlich festhalten. Bei dieser Verbindung '+
       'ist jede Vereinbarung mehr wert als jedes gegenseitige Verständnis.',
     beleg:'Saturn '+s.typ+' Saturn, Orbis '+H.kz(s.orb)+'°'};
 }},

{id:'zu-nenner-mars', modus:'paar', gewicht:8,
 wenn:function(A,B,H){ var m=H.synBeide(A,B,'Mars','Mars',6); return !!m&&m.art==='weich'; },
 dann:function(A,B,H,N){
   var m=H.synBeide(A,B,'Mars','Mars',6);
   return {art:'nenner', titel:'Gleicher Gang beim Anpacken',
     text:'Die beiden Marse stehen weich zueinander ('+m.typ+'). Das heißt: Diese zwei legen im '+
       'selben Moment los und hören im selben Moment auf. Wer schon einmal mit jemandem gearbeitet '+
       'hat, der immer zu früh oder zu spät Gas gibt, weiß, was das wert ist.',
     beleg:'Mars '+m.typ+' Mars, Orbis '+H.kz(m.orb)+'°'};
 }},

{id:'zu-nenner-arbeit', modus:'paar', gewicht:8,
 wenn:function(A,B,H){ return H.gewichtHaus(A,6)>=3&&H.gewichtHaus(B,6)>=3; },
 dann:function(A,B,H,N){
   return {art:'nenner', titel:'Beide arbeiten wirklich gern',
     text:'Bei beiden ist das 6. Haus deutlich besetzt — der Bereich der täglichen Arbeit. '+
       'Diese zwei verbindet etwas, das in Teams selten ist: Sie finden die Arbeit selbst gut, '+
       'nicht nur das Ergebnis. Darauf lässt sich in schwierigen Phasen zurückgreifen, wenn sonst '+
       'nichts mehr trägt.',
     beleg:'6. Haus bei beiden besetzt'};
 }},

{id:'zu-nenner-jupiter', modus:'paar', gewicht:7,
 wenn:function(A,B,H,N){ var f=zuFeld(N);
   return f.indexOf(H.ueber(A,B,'Jupiter'))>=0 || f.indexOf(H.ueber(B,A,'Jupiter'))>=0; },
 dann:function(A,B,H,N){
   var ab=zuFeld(N).indexOf(H.ueber(A,B,'Jupiter'))>=0;
   var geber=ab?N.a:N.b, nehmer=ab?N.b:N.a, h=ab?H.ueber(A,B,'Jupiter'):H.ueber(B,A,'Jupiter');
   return {art:'nenner', titel:'Eine öffnet der anderen Türen',
     text:'Jupiter von '+geber+' fällt in das '+h+'. Haus von '+nehmer+' ('+ZU_HN[h-1]+') — '+
       'mitten in den Bereich, um den es bei dieser Zusammenarbeit geht. Das ist konkret: '+
       geber+' bringt '+nehmer+' dort weiter, oft ohne es zu merken, durch Kontakte, Zutrauen '+
       'oder einen Satz zur richtigen Zeit. In der Rollenverteilung gehört das benannt, '+
       'sonst wird es für selbstverständlich gehalten.',
     beleg:'Jupiter von '+geber+' im '+h+'. Haus von '+nehmer};
 }},

{id:'zu-nenner-mc', modus:'paar', gewicht:7,
 wenn:function(A,B,H){ return A.MC!==undefined&&B.MC!==undefined&&
   H.elem(A.MC)===H.elem(B.MC); },
 dann:function(A,B,H,N){
   return {art:'nenner', titel:'Dasselbe Bild von Erfolg',
     text:'Beide MC stehen in <b>'+H.elem(A.MC)+'</b>. Das heißt, dass diese zwei ungefähr '+
       'dasselbe für erstrebenswert halten — was nach außen zählt, was eine gute Arbeit ist, '+
       'was man zeigen kann. Streit über das Ziel ist hier unwahrscheinlich; wenn es knirscht, '+
       'geht es um den Weg.',
     beleg:'MC '+N.a+' '+H.zeichen(A.MC)+' · '+N.b+' '+H.zeichen(B.MC)};
 }},

/* ───────── Wo es reibt ───────── */
{id:'zu-tempo', modus:'paar', gewicht:9,
 wenn:function(A,B,H){
   var ma=H.bilanz(A).modStark, mb=H.bilanz(B).modStark;
   return (ma==='kardinal'&&mb!=='kardinal')||(mb==='kardinal'&&ma!=='kardinal'); },
 dann:function(A,B,H,N){
   var ma=H.bilanz(A).modStark;
   var schnell=(ma==='kardinal')?N.a:N.b, langsam=(ma==='kardinal')?N.b:N.a;
   return {art:'reibung', titel:'Verschiedene Vorstellungen davon, wann etwas entschieden ist',
     text:schnell+' hält eine Sache für entschieden, sobald die Richtung klar ist. '+langsam+
       ' hält sie für entschieden, wenn sie durchdacht beziehungsweise abgesichert ist. Beide '+
       'arbeiten danach los — nur eben an verschiedenen Ständen. Daraus entsteht der Eindruck, '+
       'die eine presche vor und die andere blockiere, und beides stimmt nicht.',
     ansatz:'Entscheidungen ausdrücklich markieren, statt sie entstehen zu lassen. Ein Satz am '+
       'Ende jeder Besprechung: „Das ist jetzt entschieden, das ist noch offen." Schriftlich, '+
       'zwei Zeilen. Das löst bei dieser Paarung mehr als jedes Gespräch über Arbeitsstile.',
     beleg:schnell+' kardinal · '+langsam+' '+(ma==='kardinal'?H.bilanz(B).modStark:ma)};
 }},

{id:'zu-detail', modus:'paar', gewicht:8,
 wenn:function(A,B,H){
   var a=H.bilanz(A), b=H.bilanz(B);
   return (a.stark==='Erde'&&b.stark!=='Erde')||(b.stark==='Erde'&&a.stark!=='Erde'); },
 dann:function(A,B,H,N){
   var aErde=(H.bilanz(A).stark==='Erde');
   var genau=aErde?N.a:N.b, gross=aErde?N.b:N.a;
   return {art:'reibung', titel:'Detail gegen Überblick',
     text:genau+' sieht zuerst, was konkret zu tun ist und was nicht stimmt. '+gross+' sieht '+
       'zuerst, wohin das Ganze soll. Beide halten ihre Sicht für die naheliegende, und beide '+
       'erleben die andere als anstrengend: die eine als kleinlich, die andere als vage. '+
       'In der Sache ergänzt sich das; im Gespräch nicht.',
     ansatz:'Die beiden Ebenen trennen und nacheinander behandeln, nicht in einem Gespräch. '+
       'Erst die Richtung festlegen, ohne über Umsetzung zu reden. Dann die Umsetzung, ohne '+
       'die Richtung wieder aufzumachen. Wer die Reihenfolge einhält, spart sich die Hälfte '+
       'der Diskussionen.',
     beleg:genau+' Erde-Schwerpunkt'};
 }},

{id:'zu-mars-hart', modus:'paar', gewicht:9,
 wenn:function(A,B,H){ var m=H.synBeide(A,B,'Mars','Mars',6); return !!m&&m.art==='hart'; },
 dann:function(A,B,H,N){
   var m=H.synBeide(A,B,'Mars','Mars',6);
   return {art:'reibung', titel:'Mars '+m.typ+' Mars — der Konflikt hat ein Muster',
     text:'Die beiden Marse stehen hart zueinander. In der Zusammenarbeit heißt das: Auseinander'+
       'setzungen zwischen '+N.a+' und '+N.b+' eskalieren schneller als mit anderen und drehen '+
       'sich dabei oft nicht um die Sache, sondern um Tempo und Ton. Beide erleben sich als die, '+
       'die sachlich bleibt.',
     ansatz:'Nicht an der Streitkultur arbeiten, sondern Reibungsflächen abbauen: klar getrennte '+
       'Zuständigkeiten, bei denen nicht beide mitentscheiden müssen. Wo beide entscheiden, '+
       'vorher festlegen, wer im Zweifel den Stich macht — das ist keine Hierarchie, das ist '+
       'eine Abkürzung.',
     beleg:'Mars '+m.typ+' Mars, Orbis '+H.kz(m.orb)+'°'};
 }},

{id:'zu-saturn-ueber', modus:'paar', gewicht:9,
 wenn:function(A,B,H,N){ var f=zuFeld(N);
   return f.indexOf(H.ueber(A,B,'Saturn'))>=0||f.indexOf(H.ueber(B,A,'Saturn'))>=0; },
 dann:function(A,B,H,N){
   var ab=zuFeld(N).indexOf(H.ueber(A,B,'Saturn'))>=0;
   var saturn=ab?N.a:N.b, traegt=ab?N.b:N.a, h=ab?H.ueber(A,B,'Saturn'):H.ueber(B,A,'Saturn');
   return {art:'reibung', titel:'Eine bremst die andere, ohne es zu wollen',
     text:'Saturn von '+saturn+' fällt in das '+h+'. Haus von '+traegt+' ('+ZU_HN[h-1]+') — genau '+
       'dort, wo diese Zusammenarbeit stattfindet. Das Muster ist regelmäßig dasselbe: '+traegt+
       ' fühlt sich in diesem Bereich geprüft und wird vorsichtiger, als nötig wäre. '+saturn+
       ' meint nichts davon persönlich und merkt es meistens nicht einmal — Saturn wirkt durch '+
       'Anwesenheit, nicht durch Absicht.',
     ansatz:'Rückmeldung in diesem Bereich ausdrücklich zweiteilen: erst was trägt, dann was '+
       'fehlt. Und eine Sache benennen, die '+traegt+' in diesem Bereich allein verantwortet, '+
       'ohne Freigabe. Ohne eigenen Bereich bleibt das Muster.',
     beleg:'Saturn von '+saturn+' im '+h+'. Haus von '+traegt};
 }},

{id:'zu-geld', modus:'paar', gewicht:9, nurForm:['partner'],
 wenn:function(A,B,H){ return true; },
 dann:function(A,B,H,N){
   var a2=H.gewichtHaus(A,2), b2=H.gewichtHaus(B,2), a8=H.gewichtHaus(A,8), b8=H.gewichtHaus(B,8);
   var ungleich=Math.abs(a2-b2)>=2.5||Math.abs(a8-b8)>=2.5;
   var mehr2=(a2>=b2)?N.a:N.b, mehr8=(a8>=b8)?N.a:N.b;
   return {art: ungleich?'reibung':'nenner',
     titel: ungleich?'Verschiedene Verhältnisse zu Geld und Besitz':'Ähnliches Verhältnis zu Geld',
     text: ungleich
       ? 'Das 2. Haus (das Eigene) und das 8. Haus (das Gemeinsame und das Geliehene) sind bei '+
         'den beiden unterschiedlich stark besetzt. '+mehr2+' denkt stärker in eigenem Besitz, '+
         mehr8+' stärker in gemeinsamem Risiko. In einer Geschäftspartnerschaft ist das die '+
         'Stelle, an der es später wirklich kracht — nicht bei der Aufgabenverteilung.'
       : 'Das 2. und das 8. Haus sind bei beiden ähnlich gewichtet. Diese zwei haben ein '+
         'vergleichbares Verhältnis zu Geld, Risiko und Besitz, und das ist für eine Partnerschaft '+
         'mehr wert als ein gemeinsames Ziel.',
     ansatz: ungleich?'Vor allem anderen schriftlich klären: Wem gehört was, wer haftet wofür, '+
       'und was passiert bei Trennung. Nicht weil Misstrauen angebracht wäre, sondern weil diese '+
       'beiden den Begriff „fair" unterschiedlich füllen und das erst im Ernstfall merken.':undefined,
     beleg:'2. Haus '+H.kz(a2)+'/'+H.kz(b2)+' · 8. Haus '+H.kz(a8)+'/'+H.kz(b8)};
 }},

{id:'zu-sichtbar', modus:'paar', gewicht:8, ohneForm:['uebergabe'],
 wenn:function(A,B,H){ return Math.abs(H.gewichtHaus(A,10)-H.gewichtHaus(B,10))>=2.5 ||
   Math.abs(H.oben(A)-H.oben(B))>=3; },
 dann:function(A,B,H,N){
   var a10=H.gewichtHaus(A,10), b10=H.gewichtHaus(B,10);
   var vorn=(a10>=b10)?N.a:N.b, hinten=(a10>=b10)?N.b:N.a;
   return {art:'reibung', titel:'Wer vorn steht und wer das trägt',
     text:vorn+' hat deutlich mehr Gewicht im Bereich der Außenwirkung als '+hinten+'. In der '+
       'Praxis heißt das: '+vorn+' wird nach außen für die Arbeit gesehen, auch für die Teile, '+
       'die '+hinten+' gemacht hat. Das geht lange gut und kippt irgendwann, meistens an einem '+
       'kleinen Anlass, der dann unverhältnismäßig wirkt.',
     ansatz:'Die Zuschreibung regeln, bevor sie zum Thema wird: Wer wird genannt, wo, und wie '+
       'wird die Arbeit der anderen sichtbar? Eine Zeile in jeder Veröffentlichung reicht. '+
       'Wichtig ist, dass '+vorn+' es anbietet und nicht '+hinten+' es einfordern muss.',
     beleg:'10. Haus '+H.kz(a10)+' zu '+H.kz(b10)};
 }},

{id:'zu-merkur-hart', modus:'paar', gewicht:7,
 wenn:function(A,B,H){ var m=H.synBeide(A,B,'Merkur','Merkur',5); return !!m&&m.art==='hart'; },
 dann:function(A,B,H,N){
   var m=H.synBeide(A,B,'Merkur','Merkur',5);
   return {art:'reibung', titel:'Merkur '+m.typ+' Merkur — schriftlich wird es schlimmer',
     text:'Die beiden Merkure stehen hart zueinander. Diese zwei lesen die Nachrichten der '+
       'jeweils anderen regelmäßig schärfer, als sie gemeint waren. Im Gespräch gleicht sich '+
       'das durch Ton und Gesicht aus, in Textnachrichten nicht — und moderne Zusammenarbeit '+
       'läuft überwiegend schriftlich.',
     ansatz:'Eine Regel, die klein klingt und viel ändert: Bei Unklarheit oder Ärger nicht '+
       'zurückschreiben, sondern anrufen. Und keine inhaltliche Auseinandersetzung in einem '+
       'Kanal führen, in dem andere mitlesen.',
     beleg:'Merkur '+m.typ+' Merkur, Orbis '+H.kz(m.orb)+'°'};
 }},

{id:'zu-fuehrung-last', modus:'paar', gewicht:8, nurForm:['fuehrung'],
 wenn:function(A,B,H){ return true; },
 dann:function(A,B,H,N){
   var a1=H.gewichtHaus(A,1)+H.gewichtHaus(A,10), b1=H.gewichtHaus(B,1)+H.gewichtHaus(B,10);
   var stark=(a1>=b1)?N.a:N.b, leiser=(a1>=b1)?N.b:N.a, knapp=Math.abs(a1-b1)<2;
   return {art: knapp?'reibung':'beratung',
     titel: knapp?'Zwei, die beide führen wollen':'Das Gefälle liegt, wo es liegen sollte',
     text: knapp
       ? N.a+' und '+N.b+' haben im Bereich von Auftreten und Außenwirkung fast gleich viel '+
         'Gewicht. Für ein Führungsverhältnis ist das die unbequemste Lage: Die formale Rolle '+
         'sagt das eine, die Charts geben beiden denselben Anspruch. Das zeigt sich nicht als '+
         'offener Streit, sondern als ständiges Nachverhandeln von Kleinigkeiten.'
       : stark+' bringt mehr Gewicht in Auftreten und Außenwirkung mit als '+leiser+'. Wenn das '+
         'der formalen Rolle entspricht, ist hier wenig zu klären. Wenn nicht, ist es die '+
         'eigentliche Baustelle — und dann hilft kein Gespräch über Zusammenarbeit, sondern nur '+
         'eine Änderung der Rolle.',
     ansatz: knapp?'Dem Gleichstand einen Ort geben, statt ihn wegzumoderieren: ein Bereich, in '+
       'dem '+leiser+' allein entscheidet und '+stark+' nicht hineinredet, auch nicht gut gemeint. '+
       'Ohne das sucht sich der Anspruch andere Wege.':undefined,
     beleg:'1.+10. Haus '+H.kz(a1)+' zu '+H.kz(b1)};
 }},

{id:'zu-uebergabe', modus:'paar', gewicht:8, nurForm:['uebergabe'],
 wenn:function(A,B,H){ return true; },
 dann:function(A,B,H,N){
   var ma=H.bilanz(A).modStark, mb=H.bilanz(B).modStark;
   var fix=(ma==='fix')?N.a:((mb==='fix')?N.b:null);
   return {art: fix?'reibung':'nenner',
     titel: fix?'Das Loslassen ist hier die eigentliche Arbeit':'Übergeben fällt hier leichter als sonst',
     text: fix
       ? fix+' hat einen fixen Schwerpunkt. Bei einer Übergabe ist das der kritische Punkt: '+
         'Was aufgebaut wurde, wird nicht gern aus der Hand gegeben, und zwar auch dann nicht, '+
         'wenn die Übergabe ausdrücklich gewollt ist. Es zeigt sich selten als Weigerung, '+
         'sondern als Nachbessern, Mitlesen und „ich schau nur kurz drüber".'
       : 'Keine der beiden hat einen überwiegend fixen Schwerpunkt. Das ist für eine Übergabe '+
         'günstig: Beide können eine Sache verändern lassen, ohne dass es als Verlust ankommt. '+
         'Der Preis ist, dass die Übergabe ohne festen Plan zerfasert.',
     ansatz: fix?'Ein Datum festlegen, ab dem nicht mehr gegengelesen wird, und es aufschreiben. '+
       'Bis dahin ausdrücklich mitlaufen, danach gar nicht mehr. Ein weicher Übergang ist bei '+
       'dieser Konstellation der schwierigere, nicht der leichtere Weg.'
       :'Die Übergabe in Schritte mit Daten gliedern und jeden Schritt abhaken. Ohne diese '+
        'Struktur wird sie nie wirklich beendet.',
     beleg:N.a+': '+ma+' · '+N.b+': '+mb};
 }},

/* ───────── Was zu tun ist ───────── */
{id:'zu-rollen', modus:'paar', gewicht:9,
 wenn:function(A,B,H,N){ return !!N; },
 dann:function(A,B,H,N){
   var f=zuFeld(N);
   function schwer(C){ var b=-1,bh=f[0];
     f.forEach(function(h){ var w=H.gewichtHaus(C,h); if(w>b){b=w;bh=h;} }); return bh; }
   var ha=schwer(A), hb=schwer(B);
   var rolle={1:'das Auftreten nach außen',2:'alles, was mit Wert und Preis zu tun hat',
     3:'die Kommunikation und das Schriftliche',4:'das Innenleben und die Basis',
     5:'das, was gezeigt und gestaltet wird',6:'den Ablauf und die tägliche Umsetzung',
     7:'die Kundschaft und die Verhandlungen',8:'die heiklen Themen, Geld und Risiko',
     9:'das Große, Lehre und alles Auswärtige',10:'die Außenwirkung und die Richtung',
     11:'die Kontakte und das Netzwerk',12:'die stille Vorarbeit'};
   if(ha===hb) return {art:'aufgabe', titel:'Beide ziehen zum selben Haus',
     text:'Bei beiden liegt das meiste Gewicht im '+ha+'. Haus ('+ZU_HN[ha-1]+'). Beide wollen '+
       'also '+rolle[ha]+' machen, und das wird derselbe Platz. Das ist keine Katastrophe, es '+
       'muss nur jemand den anderen Teil übernehmen, den gerade niemand will.',
     tun:'Ausdrücklich aufteilen, wer '+rolle[ha]+' macht — und für die übrigen Bereiche '+
       'benennen, wer sie notgedrungen nimmt. Ein Satz pro Bereich, aufgeschrieben.',
     beleg:'beide Schwerpunkt im '+ha+'. Haus'};
   return {art:'aufgabe', titel:'Die Aufteilung, die sich anbietet',
     text:'Im Feld dieser Frage liegt bei '+N.a+' das meiste Gewicht im '+ha+'. Haus ('+ZU_HN[ha-1]+
       '), bei '+N.b+' im '+hb+'. ('+ZU_HN[hb-1]+'). Daraus ergibt sich eine Aufteilung, die '+
       'beiden leichtfällt, statt gerecht zu wirken.',
     tun:N.a+' übernimmt '+rolle[ha]+', '+N.b+' übernimmt '+rolle[hb]+'. Einmal aussprechen, '+
       'einmal aufschreiben — und dann vier Wochen nicht hineinreden.',
     beleg:N.a+': '+ha+'. Haus · '+N.b+': '+hb+'. Haus'};
 }},

{id:'zu-takt', modus:'paar', gewicht:7,
 wenn:function(A,B,H){ return true; },
 dann:function(A,B,H,N){
   var ma=H.bilanz(A).modStark, mb=H.bilanz(B).modStark;
   var hatFix=(ma==='fix'||mb==='fix'), hatVer=(ma==='veränderlich'||mb==='veränderlich');
   return {art:'aufgabe', titel:'Der Takt, in dem ihr euch abstimmen solltet',
     text: hatVer
       ? 'Mindestens eine von beiden hat einen veränderlichen Schwerpunkt. Diese Zusammenarbeit '+
         'braucht häufigere, kürzere Abstimmung, sonst driftet sie auseinander, ohne dass es '+
         'jemand bemerkt.'
       : hatFix
       ? 'Mindestens eine von beiden hat einen fixen Schwerpunkt. Hier braucht es nicht mehr '+
         'Abstimmung, sondern bewusste Punkte, an denen etwas geändert werden darf — sonst läuft '+
         'eine Richtung weiter, die beide längst für falsch halten.'
       : 'Beide sind kardinal geprägt. Diese zwei brauchen keine Anschubtermine, sondern Termine, '+
         'an denen Begonnenes abgeschlossen wird.',
     tun: hatVer?'Wöchentlich fünfzehn Minuten, fester Termin, drei Fragen: Was ist fertig? '+
       'Was hakt? Was ist bis nächste Woche dran?'
       : hatFix?'Alle sechs Wochen eine halbe Stunde nur für die Frage: Was läuft hier weiter, '+
         'obwohl es nicht mehr stimmt?'
       : 'Alle zwei Wochen eine halbe Stunde nur für Begonnenes — nichts Neues auf die Liste.',
     beleg:N.a+': '+ma+' · '+N.b+': '+mb};
 }},

/* ───────── Für die Coachin ───────── */
{id:'zu-blind', modus:'paar', gewicht:7,
 wenn:function(A,B,H){
   var fa=H.bilanz(A).fehlt, fb=H.bilanz(B).fehlt;
   return fa.filter(function(x){ return fb.indexOf(x)>=0; }).length>0; },
 dann:function(A,B,H,N){
   var fa=H.bilanz(A).fehlt, fb=H.bilanz(B).fehlt;
   var f=fa.filter(function(x){ return fb.indexOf(x)>=0; })[0];
   var t={Feuer:'Niemand in diesem Gespann treibt an. Vorhaben bleiben liegen, ohne dass es '+
      'jemand entscheidet — sie verlaufen einfach.',
     Erde:'Niemand rechnet nach. Zeitpläne und Kosten werden hier systematisch zu optimistisch '+
      'angesetzt, und beide bestätigen sich gegenseitig darin.',
     Luft:'Niemand geht auf Abstand. Beide stecken in der Sache, und es fehlt der nüchterne Blick '+
      'von außen auf die eigene Lage.',
     Wasser:'Niemand merkt, wie es den Leuten drumherum geht. Stimmungen im Umfeld werden hier '+
      'erst wahrgenommen, wenn jemand kündigt oder abspringt.'};
   return {art:'beratung', titel:'Der gemeinsame blinde Fleck: '+f,
     text:'Beiden fehlt <b>'+f+'</b> in der Bilanz. '+t[f]+' Weil es beiden fehlt, wird es in '+
       'diesem Gespann nie auffallen — es gibt niemanden, der es vermisst.',
     tun:'Für genau diesen Punkt eine dritte Person vorsehen: jemanden, der gegenrechnet, '+
       'antreibt oder die Stimmung meldet. Nicht als Dauerlösung, sondern an festen Punkten.',
     beleg:'Element '+f+' bei beiden unter 10 Prozent'};
 }},

{id:'zu-struktur', modus:'paar', gewicht:8,
 wenn:function(A,B,H,N){
   var f=zuFeld(N);
   var ms=H.synBeide(A,B,'Mars','Saturn',5), mm=H.synBeide(A,B,'Mars','Mars',6);
   return (f.indexOf(H.ueber(A,B,'Saturn'))>=0&&f.indexOf(H.ueber(B,A,'Saturn'))>=0) ||
          (!!ms&&ms.art==='hart'&&!!mm&&mm.art==='hart'); },
 dann:function(A,B,H,N){
   return {art:'beratung', titel:'Hier ist Beratung vielleicht das falsche Werkzeug',
     text:'In diesem Gespann greifen mehrere hemmende Kontakte gleichzeitig und in beide '+
       'Richtungen. Wenn eine Zusammenarbeit über längere Zeit nicht läuft und die Lage so '+
       'aussieht, ist die Frage selten „wie verstehen wir uns besser". Häufiger ist die '+
       'Konstruktion falsch: zu viel gemeinsame Zuständigkeit, zu wenig getrennte Bereiche, '+
       'oder eine Rolle, die es so nicht geben sollte.',
     tun:'Einmal ausdrücklich die Frage stellen, ob die beiden in dieser Form überhaupt '+
       'zusammenarbeiten müssen. Oft ist die Antwort: nur an zwei Stellen — und die ließen sich '+
       'regeln. Das ist eine strukturelle Antwort, keine zwischenmenschliche.',
     beleg:'Saturn beidseitig im Feld oder Mars–Saturn über Kreuz'};
 }},

{id:'zu-vorsicht', modus:'paar', gewicht:6,
 wenn:function(A,B,H){ return true; },
 dann:function(A,B,H,N){
   var oa=H.oben(A), ob=H.oben(B);
   var still=(oa<=4)?N.a:((ob<=4)?N.b:null);
   return {art:'beratung', titel:'Womit du im Gespräch rechnen solltest',
     text: still
       ? still+' hat ein nach innen gewichtetes Chart und wird in einer gemeinsamen Sitzung '+
         'weniger sagen, als zu sagen wäre — nicht aus Zurückhaltung, sondern weil das Denken '+
         'hier später stattfindet. Was in der Sitzung nicht kam, kommt zwei Tage danach.'
       : 'Beide Charts sind nach außen gewichtet. In einer gemeinsamen Sitzung wird viel gesagt '+
         'und schnell zugestimmt. Prüf nach, ob die Zustimmung hält, bevor du sie als Ergebnis nimmst.',
     tun: still?'Nach der Sitzung eine schriftliche Runde: zwei Tage Zeit, dann eine Rückmeldung '+
       'von beiden. Erst danach gilt etwas als vereinbart.'
       :'Jede Vereinbarung am Ende der Sitzung in eigenen Worten wiederholen lassen — von beiden, '+
        'einzeln.',
     beleg:N.a+' '+oa+' oben · '+N.b+' '+ob+' oben'};
 }}
];

/* ══ Das Ergebnis ═════════════════════════════════════════════ */
function zusammenErgebnis(treffer, A, B, H, N){
  var n=0, r=0, gn=0, gr=0;
  treffer.forEach(function(t){
    if(t.art==='nenner'){ n++; gn+=t.gewicht; }
    if(t.art==='reibung'){ r++; gr+=t.gewicht; }
  });
  var ges=gn+gr||1, anteil=gn/ges;
  var stufe = anteil>=0.62 ? 'laeuft' : anteil>=0.45 ? 'klaert'
            : anteil>=0.3  ? 'reibt'  : 'knirscht';
  var T={
   laeuft:{t:'Das läuft, wenn niemand hineinregiert',
     x:'Die tragenden Verbindungen überwiegen deutlich. Bei so einer Paarung entsteht das Problem '+
       'selten zwischen den beiden, sondern durch Vorgaben von außen, unklare Zuständigkeiten oder '+
       'eine dritte Person. Prüft zuerst die Rahmenbedingungen, bevor ihr an der Zusammenarbeit arbeitet.'},
   klaert:{t:'Tragfähig, sobald zwei, drei Dinge vereinbart sind',
     x:'Tragendes und Reibendes halten sich ungefähr die Waage. Das ist der häufigste und der '+
       'dankbarste Fall: Die Reibungspunkte unten sind benennbar, und für jeden steht eine '+
       'Vereinbarung dabei. Im Beruf ist das wichtiger als gegenseitiges Verständnis — eine '+
       'Regel wirkt auch an schlechten Tagen.'},
   reibt:{t:'Es reibt mehr, als es trägt',
     x:'Die Reibungspunkte wiegen schwerer als die gemeinsamen Nenner. Diese Zusammenarbeit '+
       'funktioniert, aber nicht nebenbei: Sie braucht klar getrennte Zuständigkeiten statt '+
       'gemeinsamer, und schriftliche Absprachen an den Stellen, an denen andere sich einfach '+
       'einig sind. Als Dauerzustand in enger Abstimmung ist sie zu teuer.'},
   knirscht:{t:'In dieser Form teuer für beide',
     x:'Die Rechnung fällt deutlich zur Reibung aus. Das ist kein Urteil über die beiden Menschen '+
       'und auch keines über ihre Fähigkeiten — es heißt, dass diese Konstruktion viel Energie '+
       'verbraucht, die nicht in die Arbeit geht. Die nützlichste Frage ist hier meistens nicht, '+
       'wie man besser zusammenarbeitet, sondern wie viel gemeinsame Zuständigkeit es wirklich braucht.'}
  };
  return {stufe:stufe, titel:T[stufe].t, text:T[stufe].x,
    waage:{links:Math.round(gn), rechts:Math.round(gr),
           llab:n+' trägt', rlab:r+' reibt'}};
}

T_ZUSAMMEN.regeln=R_ZUSAMMEN;
T_ZUSAMMEN.ergebnis=zusammenErgebnis;
