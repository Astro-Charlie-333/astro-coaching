/* Astro-Charlie · Weitere Themen
   Alltag und Kommunikation laufen mit demselben Kern wie „Zwei Menschen",
   haben aber noch deutlich weniger Regeln. Sie funktionieren und sind
   ausbaufähig: eine neue Regel ist ein Objekt mit wenn/dann, mehr
   braucht es nicht. Berufung steht in thema-beruf.js, Zusammenarbeit
   in thema-zusammen.js — beide auf der Tiefe von „Zwei Menschen".

   Am Ende dieser Datei steht die Liste aller Themen.                */

/* ═══ Alltag, Energie, anders verdrahtet ═════════════════════ */
var T_ALLTAG={
 schluessel:'alltag', n:'Alltag & Energie', modus:'solo',
 was:'Warum Systeme scheitern und was stattdessen trägt.',
 grenzen:{bild:2, staerke:4, reibung:5, aufgabe:4, beratung:2},
 regeln:[
  {id:'al-mond', gewicht:10, modus:'solo',
   wenn:function(A,B,H){ return true; },
   dann:function(A,B,H,N){
     var e=H.elem(A.Mond);
     var t={Feuer:'Kurze Einheiten, schnelle Wechsel. Lange gleichförmige Blöcke halten hier nicht — '+
       'das ist keine Disziplinfrage, das ist die Bauart.',
      Erde:'Lange Anlaufzeit, dann tragfähig. Die ersten fünf Minuten sind der schwere Teil, '+
       'nicht die Stunde danach.',
      Luft:'Wechsel und Austausch. Allein am Stück arbeiten ermüdet hier schneller als Unterbrechungen.',
      Wasser:'In Wellen. Gute und schlechte Tage schwanken hier stärker als bei anderen — '+
       'ein Plan, der jeden Tag dasselbe verlangt, scheitert zwangsläufig.'};
     return {art:'bild', titel:'Dein Takt: Mond in '+H.elem(A.Mond),
       text:t[e], beleg:'Mond '+H.stellung(A.Mond)};
   }},
  {id:'al-mars-saturn', gewicht:9, modus:'solo',
   wenn:function(A,B,H){ var k=H.asp(A,'Mars','Saturn',6); return k&&k.art==='hart'; },
   dann:function(A,B,H,N){
     var k=H.asp(A,'Mars','Saturn',6);
     return {art:'reibung', titel:'Gas und Bremse gleichzeitig',
       text:'Mars '+k.typ+' Saturn. Ein Teil der Energie geht ins Selbstbremsen — ein normaler Tag '+
         'kostet hier mehr als bei anderen. Das ist keine Faulheit und auch keine Einstellungsfrage.',
       ansatz:'Aufgaben halbieren und die Hälfte als ganze Leistung verbuchen. Und: zuerst anfangen, '+
         'dann entscheiden ob man weitermacht — nicht umgekehrt.',
       beleg:'Mars '+k.typ+' Saturn, '+H.kz(k.orb)+'°'};
   }},
  {id:'al-merkur-uranus', gewicht:8, modus:'solo',
   wenn:function(A,B,H){ return !!H.asp(A,'Merkur','Uranus',5); },
   dann:function(A,B,H,N){
     var k=H.asp(A,'Merkur','Uranus',5);
     return {art:'reibung', titel:'Sprunghaftes Denken',
       text:'Merkur '+k.typ+' Uranus. Verknüpft über Ecken, ist oft drei Schritte weiter, '+
         'ermüdet bei linearem Vorgehen. Listen in Reihenfolge funktionieren hier schlecht.',
       ansatz:'Mit Übersicht arbeiten statt mit Reihenfolge: alles auf eine Fläche, dann greifen, '+
         'was gerade geht. Reihenfolgen erzwingen kostet hier mehr, als sie einbringen.',
       beleg:'Merkur '+k.typ+' Uranus, '+H.kz(k.orb)+'°'};
   }},
  {id:'al-merkur-neptun', gewicht:7, modus:'solo',
   wenn:function(A,B,H){ return !!H.asp(A,'Merkur','Neptun',5); },
   dann:function(A,B,H,N){
     var k=H.asp(A,'Merkur','Neptun',5);
     return {art:'reibung', titel:'Denken in Bildern',
       text:'Merkur '+k.typ+' Neptun. Listen rutschen durch, Geschichten bleiben. '+
         'Was nicht sichtbar ist, existiert praktisch nicht.',
       ansatz:'Struktur von außen statt Motivation von innen: sichtbare Ablagen, Dinge offen liegen lassen, '+
         'Erinnerungen an Orte koppeln statt an Zeiten.',
       beleg:'Merkur '+k.typ+' Neptun, '+H.kz(k.orb)+'°'};
   }},
  {id:'al-12', gewicht:8, modus:'solo',
   wenn:function(A,B,H){ return H.drin(A,12).length>=2; },
   dann:function(A,B,H,N){
     var d=H.drin(A,12);
     return {art:'reibung', titel:'Vieles läuft verdeckt',
       text:'Im 12. Haus stehen '+d.join(', ')+'. Energie wird verbraucht, ohne dass man es bemerkt — '+
         'Erschöpfung kommt plötzlich statt angekündigt.',
       ansatz:'Nicht auf das Gefühl warten, sondern messen: eine Woche lang abends eine Zahl von '+
         'eins bis fünf notieren. Das Muster wird schneller sichtbar als die Erschöpfung.',
       beleg:d.join(', ')+' im 12. Haus'};
   }},
  {id:'al-mars', gewicht:8, modus:'solo',
   wenn:function(A,B,H){ return true; },
   dann:function(A,B,H,N){
     var wo=H.wo(A,'Mars'), z=H.zi(A.Mars);
     var hn=['dich selbst','Geld und Besitz','Reden und Nahbereich','Zuhause','Ausdruck',
       'Alltag und Arbeit','Partnerschaft','Tiefe','Lehre','Beruf','Gruppen','Rückzug'];
     var wie=['sofort und in Schüben','langsam, dann unaufhaltsam','in mehrere Richtungen gleichzeitig',
       'indirekt, über Umwege','mit vollem Einsatz','genau und in kleinen Schritten',
       'erst nach Abstimmung','konzentriert und ganz','groß und begeistert','geplant und ausdauernd',
       'ruckartig und eigenwillig','in Wellen, schwer steuerbar'];
     return {art:'staerke', titel:'Wohin die Kraft geht',
       text:'Mars steht im '+wo+'. Haus und arbeitet '+wie[z]+'. Was an Energie da ist, fließt '+
         'zuerst in '+hn[wo-1]+' — auch dann, wenn man sie woanders bräuchte.',
       beleg:'Mars '+H.stellung(A.Mars)+', '+wo+'. Haus'};
   }},
  {id:'al-saturn-haus', gewicht:7, modus:'solo',
   wenn:function(A,B,H){ return true; },
   dann:function(A,B,H,N){
     var wo=H.wo(A,'Saturn');
     var hn=['Auftreten','Geld und Wert','Reden','Zuhause','Ausdruck','Alltag','Partnerschaft',
       'Tiefe','Lehre','Beruf','Gruppen','Rückzug'];
     return {art:'reibung', titel:'Wo es sich zäh anfühlt',
       text:'Saturn im '+wo+'. Haus ('+hn[wo-1]+'). Dort braucht alles länger und fühlt sich nie '+
         'ausreichend an. Im Alltag heißt das: Aufgaben aus diesem Bereich werden aufgeschoben, '+
         'nicht weil sie schwer sind, sondern weil sie sich schwer anfühlen.',
       ansatz:'Die kleinste mögliche Einheit festlegen und die nie überschreiten. '+
         'Zwei Minuten täglich schlägt hier eine Stunde pro Woche, weil die Hürde das Problem ist, '+
         'nicht die Menge.',
       beleg:'Saturn '+H.stellung(A.Saturn)+', '+wo+'. Haus'};
   }},
  {id:'al-asc', gewicht:6, modus:'solo',
   wenn:function(A,B,H){ return A.ASC!==undefined; },
   dann:function(A,B,H,N){
     var z=H.zi(A.ASC), e=H.elem(A.ASC);
     var t={Feuer:'Du kommst schnell in Gang und verbrauchst dich ebenso schnell. Pausen vor der '+
       'Erschöpfung einplanen, nicht danach.',
      Erde:'Du brauchst eine Anlaufzeit und hältst dann lange. Der Tag sollte nicht mit Entscheidungen anfangen.',
      Luft:'Du bist schnell im Kopf und vergisst den Körper. Erinnerungen ans Essen und Trinken '+
       'sind hier keine Spielerei.',
      Wasser:'Du nimmst die Umgebung mit auf. Wo du arbeitest, entscheidet mehr als wie lange.'};
     return {art:'bild', titel:'Dein Grundtempo: '+H.ZEICHEN[z]+' am Aszendenten',
       text:t[e], beleg:'Aszendent '+H.stellung(A.ASC)};
   }},
  {id:'al-sechstes-zeichen', gewicht:7, modus:'solo',
   wenn:function(A,B,H){ return true; },
   dann:function(A,B,H,N){
     var z=H.hausZeichen(A,6);
     var t={Widder:'Struktur muss schnell gehen und darf nicht nach Struktur aussehen.',
      Stier:'Immer gleiche Abläufe, immer am gleichen Ort. Veränderung ankündigen.',
      Zwillinge:'Abwechslung einbauen, sonst hält nichts. Zwei Systeme parallel ist hier kein Fehler.',
      Krebs:'Der Ort entscheidet. Eine Ecke, die nur für eine Sache da ist.',
      "Löwe":'Es muss Spaß machen und sichtbar sein. Belohnung wirkt hier wirklich.',
      Jungfrau:'Hier funktionieren Systeme — die Gefahr ist, sie zu fein zu machen.',
      Waage:'Zu zweit. Gemeinsam anfangen wirkt hier mehr als jede Methode.',
      Skorpion:'In konzentrierten Blöcken, nicht verteilt. Dazwischen nichts.',
      "Schütze":'Der Sinn muss sichtbar sein, sonst bricht es ab. Wozu, nicht was.',
      Steinbock:'Lange Linien, feste Zeiten. Hier hält Struktur am besten.',
      Wassermann:'Eigenbau. Fremde Systeme funktionieren hier nie, selbst gute.',
      Fische:'Weich und mit Puffer. Jeder Plan braucht hier dreißig Prozent Luft.'};
     return {art:'aufgabe', titel:'Welche Struktur hier hält',
       text:'Das 6. Haus trägt '+H.ZEICHEN[z]+'. '+t[H.ZEICHEN[z]],
       tun:'Das eine System suchen, das schon mal gehalten hat. Was daran anders war, ist die Antwort.',
       beleg:'6. Haus in '+H.ZEICHEN[z]};
   }}
 ],
 ergebnis:function(treffer,A,B,H,N){
   var re=treffer.filter(function(t){return t.art==='reibung';}).length;
   return {stufe:re>=3?'viel':'wenig',
     titel: re>=3 ? 'Mehrere Stellen, an denen Kraft verlorengeht'
                  : 'Der Alltag ist astrologisch unauffällig',
     text: re>=3
       ? 'Es sind mehrere Konstellationen beteiligt. Nicht alles davon gleichzeitig angehen — '+
         'eine Sache, vier Wochen, dann die nächste. Alles auf einmal ist genau der Fehler, '+
         'der bei dieser Anlage am häufigsten passiert.'
       : 'Keine auffälligen Konstellationen. Wenn im Alltag trotzdem etwas klemmt, liegt es '+
         'wahrscheinlich nicht an der Anlage, sondern an den Umständen — und die ändert man anders.',
     zahl:{reibung:re}};
 }
};

/* ═══ Kommunikation & Zusammenarbeit ═════════════════════════ */
var T_KOMM={
 schluessel:'komm', n:'Kommunikation', modus:'beides',
 was:'Wie jemand redet und gehört werden will.',
 grenzen:{bild:2, staerke:4, reibung:4, aufgabe:3, beratung:3},
 regeln:[
  {id:'ko-merkur', gewicht:10, modus:'solo',
   wenn:function(A,B,H){ return true; },
   dann:function(A,B,H,N){
     var z=H.zi(A.Merkur), w=H.wuerde('Merkur',z), wo=H.wo(A,'Merkur');
     var t=['Direkt und kurz. Unterbricht und meint es nicht böse.',
      'Langsam und einmal. Nachfassen wirkt wie Drängeln.',
      'Schnell, assoziativ, mehrgleisig. Reihenfolge ist kein Qualitätsmerkmal.',
      'Über Beispiele und Erinnerungen. Abstraktes kommt nicht an.',
      'Mit Zuspitzung. Eine gut erzählte Sache schlägt eine gut begründete.',
      'Genau. Ungenauigkeit untergräbt alles danach Gesagte.',
      'Im Vergleich. Gib zwei Möglichkeiten statt einer Empfehlung.',
      'Knapp, und nicht alles. Merkt, wenn etwas zurückgehalten wird.',
      'Groß. Zusammenhang zuerst, Einzelheiten danach.',
      'Sachlich und ergebnisbezogen. Kein Smalltalk vorweg.',
      'Über Prinzipien. Erst das Muster, dann der Einzelfall.',
      'In Bildern. Listen rutschen durch, Szenen bleiben.'];
     return {art:'bild', titel:'So redet diese Person: Merkur in '+H.ZEICHEN[z],
       text:t[z]+' Merkur steht im '+wo+'. Haus'+(w?', '+({domizil:'im eigenen Zeichen',
         erhoehung:'erhöht',exil:'im Exil',fall:'im Fall',exilfall:'im Exil und im Fall'})[w]:'')+'.',
       beleg:'Merkur '+H.stellung(A.Merkur)};
   }},
  {id:'ko-merkur-saturn', gewicht:8, modus:'solo',
   wenn:function(A,B,H){ var k=H.asp(A,'Merkur','Saturn',6); return k&&k.art==='hart'; },
   dann:function(A,B,H,N){
     return {art:'reibung', titel:'Sagt spät, was gedacht wurde',
       text:'Merkur in hartem Winkel zu Saturn. Denkt gründlich und äußert spät. '+
         'Schweigen heißt hier nicht Ablehnung, sondern dass es noch nicht fertig ist.',
       ansatz:'Redezeit ankündigen und abwarten. Wer hier nachhakt, bekommt weniger, nicht mehr.',
       beleg:'Merkur hart zu Saturn'};
   }},
  {id:'ko-drittes', gewicht:7, modus:'solo',
   wenn:function(A,B,H){ return true; },
   dann:function(A,B,H,N){
     var z=H.hausZeichen(A,3), d=H.drin(A,3);
     return {art:'staerke', titel:'Der Nahbereich',
       text:'Das 3. Haus — Reden, Lernen, kurze Wege — trägt '+H.ZEICHEN[z]+
         (d.length?' und ist mit '+d.join(', ')+' besetzt. Das macht Austausch zu einem Hauptthema.'
          :' und ist leer. Reden ist hier kein Hauptthema, sondern Mittel zum Zweck.'),
       beleg:'3. Haus '+H.ZEICHEN[z]+(d.length?' · '+d.join(', '):'')};
   }},
  {id:'ko-merkur-mond', gewicht:8, modus:'solo',
   wenn:function(A,B,H){ return true; },
   dann:function(A,B,H,N){
     var k=H.asp(A,'Merkur','Mond',6);
     return {art: k&&k.art==='hart'?'reibung':'staerke',
       titel:'Zwischen Fühlen und Sagen',
       text: !k
        ? 'Merkur und Mond stehen in keinem Winkel zueinander. Denken und Fühlen laufen hier '+
          'getrennt — was praktisch heißt: Diese Person kann sachlich bleiben, wenn es emotional wird, '+
          'und merkt manchmal erst hinterher, dass sie etwas beschäftigt hat.'
        : k.art==='weich'
        ? 'Merkur '+k.typ+' Mond. Diese Person kann sagen, was sie fühlt — das ist seltener, '+
          'als man denkt, und im Gespräch die halbe Miete.'
        : 'Merkur '+k.typ+' Mond. Gefühl und Wort kommen hier nicht gleichzeitig: Erst ist das '+
          'Gefühl da, die Worte dafür deutlich später. Was im Moment gesagt wird, trifft es oft nicht.',
       ansatz: k&&k.art==='hart'
        ? 'Nicht im Moment klären. Eine Nacht, dann schriftlich, dann reden. In dieser Reihenfolge.' : null,
       beleg: k ? 'Merkur '+k.typ+' Mond, '+H.kz(k.orb)+'°' : 'Merkur ohne Winkel zum Mond'};
   }},
  {id:'ko-stimme', gewicht:6, modus:'solo',
   wenn:function(A,B,H){ return true; },
   dann:function(A,B,H,N){
     var wo=H.wo(A,'Merkur');
     var hn=['über das eigene Auftreten','über Werte und Konkretes','im Austausch, ständig',
       'im Privaten, nicht öffentlich','im Gestalten und Erzählen','über die Arbeit und das Praktische',
       'im Gegenüber, nie im Monolog','über das Unausgesprochene','über Sinn und große Linien',
       'in der Öffentlichkeit und im Beruf','in Gruppen und Netzwerken','im Rückzug und schriftlich'];
     return {art:'aufgabe', titel:'Wo diese Person am besten zu Wort kommt',
       text:'Merkur steht im '+wo+'. Haus. Diese Person denkt und spricht '+hn[wo-1]+'. '+
         'Ein Gespräch, das diesen Rahmen trifft, läuft von allein; eines daneben kostet Kraft.',
       tun:'Gespräche dorthin legen, statt die Person in ein fremdes Format zu zwingen.',
       beleg:'Merkur im '+wo+'. Haus'};
   }},
  {id:'ko-paar-merkur', gewicht:10, modus:'paar',
   wenn:function(A,B,H){ return true; },
   dann:function(A,B,H,N){
     var k=H.synBeide(A,B,'Merkur','Merkur',6);
     var gleich=H.elem(A.Merkur)===H.elem(B.Merkur);
     return {art: (k&&k.art==='weich')||gleich ? 'nenner':'reibung',
       titel:'Wie ihr miteinander redet',
       text:(k&&k.art==='weich')||gleich
        ? 'Eure Merkure vertragen sich. Halbe Sätze reichen, und was besprochen ist, ist meistens geklärt.'
        : 'Im Denken ist '+N.a+' <b>'+H.elem(A.Merkur)+'</b>, '+N.b+' <b>'+H.elem(B.Merkur)+
          '</b>. Die eine ist schon weiter, während die andere '+
          'noch sortiert — daher die meisten Missverständnisse.',
       ansatz:(k&&k.art==='weich')||gleich ? null
        : 'Wiederholen, was die andere gesagt hat, bevor geantwortet wird. Und Wichtiges schriftlich.',
       tun:(k&&k.art==='weich')||gleich
        ? 'Wichtiges trotzdem einmal ganz aussprechen — gerade weil ihr euch versteht, bleibt sonst '+
          'etwas unausgesprochen, das beide für geklärt halten.' : null,
       beleg:'Merkur '+H.zeichen(A.Merkur)+' und '+H.zeichen(B.Merkur)+(k?' · '+k.typ:'')};
   }},
  {id:'ko-paar-mars', gewicht:8, modus:'paar',
   wenn:function(A,B,H){ var k=H.synBeide(A,B,'Mars','Merkur',6); return k&&k.art==='hart'; },
   dann:function(A,B,H,N){
     return {art:'reibung', titel:'Im Gespräch wird es schnell scharf',
       text:'Mars der einen trifft hart auf Merkur der anderen. Was als Sachbeitrag gemeint ist, '+
         'kommt als Angriff an — und zwar zuverlässig, nicht nur an schlechten Tagen.',
       ansatz:'Tonfall vor Inhalt. Ein vereinbartes Wort, mit dem jede das Gespräch für zehn Minuten '+
         'anhalten darf, ohne es begründen zu müssen.',
       beleg:'Mars hart zu Merkur'};
   }}
 ],
 ergebnis:function(treffer,A,B,H,N){
   var r=treffer.filter(function(t){return t.art==='reibung';}).length;
   return {stufe:r?'themen':'glatt',
     titel: r ? 'Es gibt konkrete Stolperstellen' : 'Kommunikativ unauffällig',
     text: r ? 'Die gefundenen Stellen sind beschreibbar und damit bearbeitbar — '+
               'meistens reicht eine Vereinbarung über die Form, nicht über den Inhalt.'
             : 'Keine auffälligen Konstellationen. Wenn es trotzdem hakt, liegt es eher an der '+
               'Situation als an der Anlage.',
     zahl:{reibung:r}};
 }
};

var THEMEN=[T_PAAR, T_ZUSAMMEN, T_BERUF, T_ALLTAG, T_KOMM];
