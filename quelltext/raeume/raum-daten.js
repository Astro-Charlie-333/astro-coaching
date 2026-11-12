/* Die zwoelf Themenraeume als Daten.
   Je Raum: der Einleitungstext und die Definition (RAUM, WOZU).
   Vorher lag beides in der jeweiligen Handarbeitsseite. */

var R_RAEUME = {};

/* ── Alltag · Themenraum · Astro-Charlie ─────────────────────────────── */
R_RAEUME['alltag'] = {
  adler: true,
  zeitschiene: false,
  titel: "Alltag · Themenraum · Astro-Charlie",
  h1: "Alltag.",
  frage: "&bdquo;Wie kriege ich Struktur, die hält?&ldquo;",
  intro: "Die meisten Ratschläge zu Struktur scheitern daran, dass sie für alle dieselben sind. Dein Chart sagt aber ziemlich genau, welcher Rhythmus zu dir passt, welche Art von System bei dir hält und woran es zerfällt. Sechs Facetten: dein natürlicher Takt, tragfähige Struktur, Ordnung und Umgebung, Anfangen und Dranbleiben, Pausen — und woran du merkst, dass es zu viel wird.",
  weiter: "<div class=\"weiter\"><a href=\"raeume.html\"><span class=\"lbl\">&larr; Zur&uuml;ck</span><span class=\"ttl\">Alle R&auml;ume</span></a><a href=\"raum-versorgung.html\" class=\"nx\"><span class=\"lbl\">Konkreter &rarr;</span><span class=\"ttl\">Versorgung</span></a></div>",
  fuss: "Themenraum Alltag &middot; Gewichtung aus deinem Chart, im Browser gerechnet. Selbstarbeit und Coaching &mdash; keine Therapie.",
  def: (function(){ var RAUM = {
 name:'Alltag',
 slug:'alltag',
 sortierTitel:'Wo dein Alltag tatsächlich hakt',
 facetten:[
 {id:'rhythmus', worum:'Hier geht es darum, wann du am Tag überhaupt brauchbar bist. Merken tust du es daran, zu welcher Uhrzeit es regelmäßig kippt.', wozuSchutz:'Gegen den eigenen Takt zu arbeiten zeigt Fleiß. Ihn zu akzeptieren klingt nach Ausrede.', wozuFrage:'Wer würde es dir vorwerfen, wenn du deinen Tag nach dir richtest?', name:'Dein natürlicher Rhythmus',
  frage:'Wann bin ich eigentlich brauchbar?',
  anker:{haeuser:[6], punkte:['Mond','Mars','Sonne']},
  regeln:[
    function(f,P,H){
      if(P.Mond===undefined) return null;
      var zi=Math.floor(P.Mond/30), hn=H.haus(P.Mond)+1;
      var mod=['kardinal','fix','veränderlich'][zi%3];
      return 'Dein <b>Mond in '+H.SIGNS[zi]+', '+hn+'. Haus</b> ist dein innerer Takt — und der ist <b>'+mod+'</b>. '+
        (mod==='fix' ? 'Du brauchst Wiederholung. Der Aufbau einer Routine ist bei dir zäh, das Halten dagegen leicht. Plan mehr Zeit für den Anfang ein und weniger Sorge um das Durchhalten.'
         : mod==='kardinal' ? 'Du startest gut und verlierst schnell die Lust. Deine Routinen brauchen eingebaute Neustarts — Wochenanfänge, Monatsanfänge, neue Runden. Durchhalten ist bei dir das falsche Ziel.'
         : 'Du brauchst Abwechslung innerhalb der Struktur. Starre Pläne scheitern bei dir nicht an Disziplin, sondern an Langeweile. Bau Varianten ein, nicht mehr Willenskraft.');
    },
    function(f,P,H){
      if(P.Mars===undefined) return null;
      var hn=H.haus(P.Mars)+1, zi=Math.floor(P.Mars/30);
      var el=['Feuer','Erde','Luft','Wasser'][zi%4];
      return 'Dein <b>Mars in '+H.SIGNS[zi]+'</b> beschreibt, wie deine Energie ankommt. '+
        (el==='Feuer'?'Schnell und stoßweise — du bist sofort da und ebenso schnell wieder weg.':
         el==='Erde'?'Langsam und ausdauernd — du brauchst Anlauf und hältst dann lange durch.':
         el==='Luft'?'Sprunghaft und gedanklich — du brauchst geistigen Reiz, sonst startest du nicht.':
         'Wellenförmig und stimmungsabhängig — deine Energie folgt eher dem Gefühl als dem Plan.')+
        ' Der Schauplatz ist <b>'+H.HT[hn-1]+'</b>.';
    },
    function(f,P,H){
      var im6=f.planeten.filter(function(x){return x.haus===6;});
      if(!im6.length) return 'Dein 6. Haus ist unbesetzt. Alltag und Routine sind bei dir kein Dauerthema — '+
        'du hast weniger eingebaute Struktur, aber auch weniger eingebauten Zwang dazu.';
      return 'Im 6. Haus — Alltag, Arbeitsweise, Gesundheit — steht <b>'+im6.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Das beschreibt, wie dein Tag tickt: in welchem Tempo, mit welcher Gründlichkeit, mit welchem Verschleiß.';
    }],
  uebung:['Eine Woche Uhrzeiten sammeln',
   'Notier diese Woche jeden Tag zwei Uhrzeiten: wann du das erste Mal wach genug für Wichtiges bist, und wann es kippt. Nur zwei Zahlen. Danach kennst du dein Zeitfenster — und kannst aufhören, gegen es zu arbeiten.'],
  rueckfrage:'Kennst du dein Zeitfenster jetzt?',
  coach:{fragen:['Wann am Tag bist du am brauchbarsten?',
   'Was machst du in dieser Zeit — und ist das das Richtige?',
   'Welcher Tagesrhythmus wurde dir beigebracht und passt nicht?'],
   vorsicht:'Nicht zum Frühaufstehen überreden. Rhythmen sind weitgehend biologisch und nicht Charakterfrage.'}},

 {id:'struktur', worum:'Hier geht es darum, welche Art System bei dir hält. Merken tust du es daran, wie viele Systeme du schon aufgegeben hast.', wozuSchutz:'Kein System zu haben hält alles offen — man kann nichts falsch machen.', wozuFrage:'Was würde verbindlich, wenn eine Struktur tatsächlich hält?', name:'Struktur, die hält',
  frage:'Warum zerfallen meine Systeme nach zwei Wochen?',
  anker:{haeuser:[6,10], punkte:['Saturn','Merkur']},
  regeln:[
    function(f,P,H){
      if(P.Saturn===undefined) return null;
      var hn=H.haus(P.Saturn)+1;
      return 'Dein <b>Saturn im '+hn+'. Haus</b> ('+H.fmt(P.Saturn)+') zeigt, wo du Struktur bauen kannst, die trägt: '+
        'in <b>'+H.HT[hn-1]+'</b>. Systeme, die dort ansetzen, halten bei dir. Alle anderen zerfallen — '+
        'nicht aus Disziplinmangel, sondern weil sie am falschen Ende ansetzen.';
    },
    function(f,P,H){
      var h=f.herrscher.filter(function(x){return x.haus===6;})[0];
      if(!h) return null;
      return 'Dein 6. Haus steht in '+h.zeichen+', beherrscht von <b>'+h.p+'</b> im '+h.inHaus+'. Haus. '+
        '<b>Dein Alltag hängt an '+H.HT[h.inHaus-1]+'</b>. Wenn es dort nicht stimmt, hilft kein Kalender und keine App.';
    },
    function(f,P,H){
      if(P.Merkur===undefined) return null;
      var zi=Math.floor(P.Merkur/30);
      var el=['Feuer','Erde','Luft','Wasser'][zi%4];
      return 'Dein <b>Merkur in '+H.SIGNS[zi]+'</b> sagt, welches Format dir liegt. '+
        (el==='Erde'?'Listen und Konkretes funktionieren bei dir tatsächlich.':
         el==='Luft'?'Du brauchst Übersicht und Zusammenhänge — Listen ohne Struktur ermüden dich.':
         el==='Feuer'?'Du brauchst Ziele und Dringlichkeit, keine Ablaufpläne.':
         'Du brauchst Bilder und Stimmung — reine Aufzählungen rutschen bei dir durch.');
    }],
  uebung:['Anhängen statt neu planen',
   'Häng diese Woche eine einzige neue Gewohnheit an etwas, das du ohnehin täglich tust. Nach dem Zähneputzen, beim Wasserkocher, nach dem Rechner-Hochfahren. Nicht neu terminieren — anhängen. Das ist der einzige Mechanismus, der bei schwankender Energie zuverlässig funktioniert.'],
  rueckfrage:'Hast du etwas angehängt?',
  coach:{fragen:['Welche Routine hat bei dir mal wirklich gehalten — und was war daran anders?',
   'Was machst du jeden Tag, ohne darüber nachzudenken?',
   'Welche Systeme hast du übernommen, weil sie bei anderen funktionieren?'],
   vorsicht:'Wenn Scham über gescheiterte Systeme auftaucht, ist das der wichtigere Punkt als das nächste System.'}},

 {id:'ordnung', worum:'Hier geht es darum, warum du dich in deiner eigenen Wohnung nicht wohlfühlst. Merken tust du es daran, in welchem Raum du dich am liebsten aufhältst — und in welchem nie.', wozuSchutz:'Unordnung ist bequem und hält die Wohnung in Bewegung.', wozuFrage:'Was müsstest du anschauen, wenn die Fläche leer ist?', name:'Ordnung und Umgebung',
  frage:'Warum fühle ich mich in meinem eigenen Zuhause unwohl?',
  anker:{haeuser:[4,6], punkte:['Mond','Venus','Saturn']},
  regeln:[
    function(f,P,H){
      var im4=f.planeten.filter(function(x){return x.haus===4;});
      var h4=f.herrscher.filter(function(x){return x.haus===4;})[0];
      var t='';
      if(im4.length) t+='Im 4. Haus steht <b>'+im4.map(function(x){return x.p;}).join(', ')+'</b> — '+
        'dein Zuhause ist bei dir kein Nebenschauplatz.';
      if(h4) t+=(t?' ':'')+'Der Herrscher deines 4. Hauses ist <b>'+h4.p+'</b> im '+h4.inHaus+'. Haus: '+
        'Zuhause-Gefühl entsteht bei dir über <b>'+H.HT[h4.inHaus-1]+'</b>.';
      return t||null;
    },
    function(f,P,H){
      if(P.Venus===undefined) return null;
      var zi=Math.floor(P.Venus/30);
      return 'Deine <b>Venus in '+H.SIGNS[zi]+'</b> beschreibt, was dir gefällt — und das gilt auch für Räume. '+
        'Eine Wohnung, die deinem Geschmack widerspricht, kostet dich täglich Energie, ohne dass du es benennen kannst.';
    },
    function(f,P,H){
      if(P.Mond===undefined) return null;
      var zi=Math.floor(P.Mond/30);
      var el=['Feuer','Erde','Luft','Wasser'][zi%4];
      return 'Dein <b>Mond in '+H.SIGNS[zi]+'</b> sagt, was du brauchst, um zur Ruhe zu kommen: '+
        (el==='Feuer'?'Bewegungsfreiheit und Farbe. Zu aufgeräumt wirkt auf dich leblos.':
         el==='Erde'?'Ordnung und Haptik. Chaos kostet dich mehr als andere.':
         el==='Luft'?'Luft, Licht und Übersicht. Enge Räume machen dich unruhig.':
         'Rückzug und Weichheit. Du brauchst eine Ecke, in die niemand hineinsieht.');
    }],
  uebung:['Eine Fläche freiräumen',
   'Räum diese Woche eine einzige Fläche frei und halt sie frei — einen Tisch, ein Regalbrett, die Küchenarbeitsplatte. Nicht die ganze Wohnung. Eine Fläche. Der Unterschied ist erstaunlich, und er kostet zwanzig Minuten.'],
  rueckfrage:'Hast du eine Fläche freigeräumt?',
  coach:{fragen:['In welchem Raum deiner Wohnung fühlst du dich am wohlsten?',
   'Was stört dich zuhause täglich und du machst nichts?',
   'Wie sah Ordnung bei euch früher aus?'],
   vorsicht:'Unordnung ist bei vielen ein Symptom, nicht die Ursache. Nicht an der Oberfläche arbeiten, wenn darunter Erschöpfung liegt.'}},

 {id:'anfangen', worum:'Hier geht es darum, warum du nicht anfängst, obwohl du willst. Merken tust du es an dem, was seit Wochen auf deiner Liste steht und zehn Minuten dauern würde.', wozuSchutz:'Was nicht begonnen ist, kann nicht misslingen.', wozuFrage:'Was befürchtest du, wenn du anfängst — und wie schlimm wäre das wirklich?', name:'Anfangen und Dranbleiben',
  frage:'Warum fange ich nie an, obwohl ich will?',
  anker:{haeuser:[1,3], punkte:['Mars','Merkur','Uranus','Saturn']},
  regeln:[
    function(f,P,H){
      var ms=f.aspekte.filter(function(x){return ((x.a==='Mars'&&x.b==='Saturn')||(x.a==='Saturn'&&x.b==='Mars'));})[0];
      if(!ms) return null;
      return '<b>Mars '+ms.typ+' Saturn</b> mit '+ms.o.toFixed(1)+'°. '+
        (ms.art==='hart'
         ? 'Gas und Bremse gleichzeitig. Ein erheblicher Teil deiner Energie geht nicht ins Tun, sondern ins Selbstbremsen. Das ist der eigentliche Grund, warum Anfangen bei dir teurer ist als bei anderen — nicht Faulheit, sondern doppelte Arbeit.'
         : 'Antrieb und Ausdauer arbeiten zusammen. Du kannst dranbleiben, ohne dich zu zwingen — nutz das, es ist nicht selbstverständlich.');
    },
    function(f,P,H){
      if(P.Uranus===undefined) return null;
      var hn=H.haus(P.Uranus)+1;
      return 'Dein <b>Uranus im '+hn+'. Haus</b> sorgt für Unterbrechungen — dort reißt regelmäßig der Faden, '+
        'in <b>'+H.HT[hn-1]+'</b>. Nicht aus Unzuverlässigkeit: Gleichförmigkeit funktioniert dort für dich nicht.';
    },
    function(f,P,H){
      if(P.Mars===undefined) return null;
      var hn=H.haus(P.Mars)+1;
      return 'Dein <b>Mars im '+hn+'. Haus</b> zeigt, wo du am leichtesten ins Tun kommst: <b>'+H.HT[hn-1]+'</b>. '+
        'Wenn du eine Sache nicht anfängst, versuch sie über diesen Bereich anzubinden — dort ist die Schwelle niedriger.';
    }],
  uebung:['Die Fünf-Minuten-Version',
   'Nimm diese Woche eine Sache, die du aufschiebst, und mach fünf Minuten davon. Timer stellen, nach fünf Minuten aufhören dürfen. Die meisten hören nicht auf — aber die Erlaubnis ist der Grund, warum sie anfangen.'],
  rueckfrage:'Hast du fünf Minuten angefangen?',
  coach:{fragen:['Was schiebst du gerade auf, das eigentlich klein ist?',
   'Was passiert in dir, kurz bevor du es nicht tust?',
   'Was hat beim letzten Mal geholfen, dass du doch angefangen hast?'],
   vorsicht:'Aufschieben ist selten ein Zeitmanagement-Problem. Meistens steckt eine Befürchtung dahinter — die ist das Thema.'}},

 {id:'pausen', worum:'Hier geht es darum, ob deine Freizeit dich erholt. Merken tust du es daran, wie du dich nach einem freien Wochenende fühlst.', wozuSchutz:'Durchzuarbeiten ist anerkannt. Pausen muss man rechtfertigen.', wozuFrage:'Vor wem rechtfertigst du deine Pausen — und ist diese Person überhaupt anwesend?', name:'Pausen und Erholung',
  frage:'Warum erhole ich mich nicht in meiner Freizeit?',
  anker:{haeuser:[12,5], punkte:['Mond','Neptun','Venus']},
  regeln:[
    function(f,P,H){
      var h12=f.herrscher.filter(function(x){return x.haus===12;})[0];
      if(!h12) return null;
      return 'Der Herrscher deines 12. Hauses ist <b>'+h12.p+'</b> im '+h12.inHaus+'. Haus. '+
        '<b>Echte Erholung findest du über '+H.HT[h12.inHaus-1]+'</b> — nicht über das, was allgemein als Entspannung gilt.';
    },
    function(f,P,H){
      if(P.Mond===undefined) return null;
      var zi=Math.floor(P.Mond/30);
      var el=['Feuer','Erde','Luft','Wasser'][zi%4];
      return 'Dein Mond steht in einem <b>'+el+'zeichen</b>. '+
        (el==='Feuer'?'Du erholst dich über Bewegung, nicht über Stillsitzen. Ein Spaziergang bringt dir mehr als ein Sofa.':
         el==='Erde'?'Du erholst dich über Körperliches und Konkretes — etwas anfassen, etwas fertig machen, draußen sein.':
         el==='Luft'?'Du erholst dich über Austausch und Gedanken. Völlige Reizlosigkeit macht dich unruhiger statt ruhiger.':
         'Du erholst dich über Rückzug, Wasser und Alleinsein. Volle Räume kosten dich mehr als Arbeit.');
    },
    function(f,P,H){
      var im5=f.planeten.filter(function(x){return x.haus===5;});
      if(!im5.length) return 'Dein 5. Haus ist unbesetzt. Spiel und Zweckfreies passieren bei dir nicht von allein — '+
        'du musst dich aktiv dafür entscheiden, sonst geht es im Nützlichen unter.';
      return 'Im 5. Haus steht <b>'+im5.map(function(x){return x.p;}).join(', ')+'</b> — dort kommt Zweckfreies bei dir leichter heraus.';
    }],
  uebung:['Drei Pausenarten testen',
   'Probier diese Woche drei Arten von Pause: eine mit Bewegung, eine mit Menschen, eine allein und still. Je zwanzig Minuten. Notier danach eine Zahl von eins bis zehn. Die meisten erholen sich anders, als sie glauben.'],
  rueckfrage:'Weißt du jetzt, was dich auflädt?',
  coach:{fragen:['Was machst du zur Erholung, weil man das so macht?',
   'Wann warst du zuletzt wirklich ausgeruht?',
   'Was brauchst du nach einem vollen Tag als Erstes?'],
   vorsicht:'Wenn Erholung grundsätzlich nicht mehr wirkt, ist das ein Warnzeichen und keine Methodenfrage.'}},

 {id:'zuviel', worum:'Hier geht es um dein Frühwarnsystem. Merken tust du es daran, ob dein Körper sich meldet, bevor gar nichts mehr geht — oder erst danach.', wozuSchutz:'Grenzen nicht zu spüren erlaubt, weiterzumachen.', wozuFrage:'Was würdest du absagen müssen, wenn du deine Grenze ernst nimmst?', name:'Wenn es zu viel wird',
  frage:'Woran merke ich, dass ich über meiner Grenze bin?',
  anker:{haeuser:[6,12], punkte:['Saturn','Mond','Neptun','Chiron']},
  regeln:[
    function(f,P,H){
      if(P.Mond===undefined) return null;
      var hn=H.haus(P.Mond)+1;
      return 'Dein <b>Mond im '+hn+'. Haus</b> ist dein Frühwarnsystem. Wenn es bei dir zu viel wird, zeigt sich das zuerst '+
        'in <b>'+H.HT[hn-1]+'</b> — dort wird es unruhig, bevor du es merkst. Das ist die Stelle, auf die du achten solltest.';
    },
    function(f,P,H){
      var im12=f.planeten.filter(function(x){return x.haus===12;});
      if(!im12.length) return null;
      return 'Im 12. Haus steht <b>'+im12.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Ein Teil deiner Belastung läuft unsichtbar. Du merkst sie nicht als Gedanken, sondern als Müdigkeit — '+
        'und deshalb oft zu spät.';
    },
    function(f,P,H){
      if(P.Saturn===undefined) return null;
      var hn=H.haus(P.Saturn)+1;
      return 'Dein <b>Saturn im '+hn+'. Haus</b> ist die Stelle, an der du dich zusammenreißt. '+
        'Genau dort hörst du auf, Grenzen zu spüren — Zusammenreißen und Wahrnehmen schließen sich aus.';
    }],
  uebung:['Das körperliche Zeichen finden',
   'Achte diese Woche darauf, was dein Körper macht, wenn es zu viel wird. Kiefer, Schultern, Atem, Magen — bei den meisten ist es immer dieselbe Stelle. Wenn du deine kennst, hast du ein Frühwarnsystem, das früher reagiert als dein Kopf.'],
  rueckfrage:'Hast du dein körperliches Zeichen gefunden?',
  coach:{fragen:['Woran merkst du, dass es zu viel ist — körperlich, nicht gedanklich?',
   'Was machst du dann, und hilft es?',
   'Wer merkt es vor dir?'],
   vorsicht:'Wenn Überlastung dauerhaft ist oder körperliche Symptome anhalten, gehört das ärztlich abgeklärt, bevor man an Routinen arbeitet.'}}

 ]
}; var WOZU={"rhythmus": ["Gegen den eigenen Takt zu arbeiten hält dich anschlussfähig an eine Welt, die früh anfängt.", "Was müsstest du verhandeln, wenn du deinen Tag nach dir ausrichtest?"], "struktur": ["Das nächste System zu suchen hält die Hoffnung am Leben, dass es nur an der Methode lag.", "Was wäre, wenn nicht das System das Problem ist, sondern die Menge?"], "ordnung": ["Die Umgebung so zu lassen, wie sie ist, spart Auseinandersetzung — mit dir und mit denen, die mitwohnen.", "Was müsstest du durchsetzen, damit dein Zuhause dir passt?"], "anfangen": ["Nicht anzufangen schützt das Ergebnis. Was nie begonnen wurde, kann nicht misslingen.", "Was stünde zur Beurteilung, wenn du es machst?"], "pausen": ["Pausen zu überspringen hält das Tempo und das Bild von dir aufrecht. Auszuruhen hieße zuzugeben, dass du nicht durchhältst.", "Wer würde etwas merken, wenn du dir eine echte Pause nimmst?"], "zuviel": ["Die Grenze nicht zu spüren erlaubt dir weiterzumachen. Sie zu spüren würde bedeuten, etwas abzusagen.", "Was müsstest du absagen, wenn du ehrlich wärst, wie viel geht?"]};

    return {RAUM:RAUM, WOZU:(typeof WOZU!=='undefined')?WOZU:{}}; })()
};

/* ── Anders verdrahtet · Themenraum · Astro-Charlie ─────────────────────────────── */
R_RAEUME['anders-verdrahtet'] = {
  adler: true,
  zeitschiene: false,
  titel: "Anders verdrahtet · Themenraum · Astro-Charlie",
  h1: "Anders verdrahtet.",
  frage: "„Warum ist der Alltag für mich so anstrengend?\"",
  intro: "Manche Menschen verbrauchen für ganz normale Tage mehr Kraft als andere — und halten das lange für einen Charakterfehler. Dieser Raum schaut sich an, wie dein Kopf Informationen verarbeitet, was dich überlastet, wie deine Energie ankommt und was dich tatsächlich auflädt. Sieben Facetten, gewichtet nach deinem Chart.",
  weiter: "<div class=\"weiter\"><a href=\"raeume.html\"><span class=\"lbl\">&larr; Zur&uuml;ck</span><span class=\"ttl\">Alle R&auml;ume</span></a><a href=\"anders-verdrahtet.html#verstehen\" class=\"nx\"><span class=\"lbl\">Weiter &rarr;</span><span class=\"ttl\">ADHS, Autismus und beides</span></a></div>",
  fuss: "Themenraum Anders verdrahtet &middot; Gewichtung aus deinem Chart, im Browser gerechnet. Selbstarbeit und Coaching &mdash; keine Therapie und keine Diagnostik.",
  def: (function(){ var RAUM = {
 name:'Anders verdrahtet',
 slug:'anders-verdrahtet',
 sortierTitel:'Wo bei dir die Kraft verloren geht',
 facetten:[
 {id:'verarbeitung', worum:'Hier geht es darum, in welcher Form Informationen bei dir ankommen. Merken tust du es daran, dass du manches dreimal lesen musst und anderes sofort verstehst.', wozuSchutz:'Sich anzupassen erspart die Erklärung, warum man anders funktioniert.', wozuFrage:'Was müsstest du erklären oder einfordern, wenn du dein Format offen benennst?', name:'Wie dein Kopf arbeitet',
  frage:'Warum denke ich anders als andere?',
  anker:{haeuser:[3], punkte:['Merkur','Uranus']},
  regeln:[
    function(f,P,H){
      if(P.Merkur===undefined) return null;
      var hn=H.haus(P.Merkur)+1, zi=Math.floor(P.Merkur/30);
      return 'Dein <b>Merkur in '+H.SIGNS[zi]+', '+hn+'. Haus</b> ('+H.fmt(P.Merkur)+') beschreibt, wie du Informationen aufnimmst und sortierst. '+
        'Nicht wie klug du bist — in welchem Format. Bei dir läuft das über <b>'+H.HT[hn-1]+'</b>. '+
        'Alles, was in einem anderen Format kommt, kostet dich Übersetzungsarbeit, die andere nicht leisten müssen.';
    },
    function(f,P,H){
      var mu=f.aspekte.filter(function(x){return ((x.a==='Merkur'&&x.b==='Uranus')||(x.a==='Uranus'&&x.b==='Merkur'));})[0];
      if(!mu) return null;
      return '<b>Merkur '+mu.typ+' Uranus</b> mit '+mu.o.toFixed(1)+'°. Dein Denken springt und verknüpft über Ecken. '+
        'Das ist der Grund, warum dir Zusammenhänge auffallen, die andere übersehen — und warum lineares Zuhören anstrengend ist. '+
        'Du bist meistens schon drei Schritte weiter.';
    },
    function(f,P,H){
      var mn=f.aspekte.filter(function(x){return ((x.a==='Merkur'&&x.b==='Neptun')||(x.a==='Neptun'&&x.b==='Merkur'));})[0];
      if(!mn) return null;
      return '<b>Merkur '+mn.typ+' Neptun</b> mit '+mn.o.toFixed(1)+'°. Du denkst in Bildern und Stimmungen statt in Listen. '+
        'Klare Strukturen von außen helfen dir deshalb mehr als Motivation — nicht weil du unstrukturiert bist, '+
        'sondern weil dein Kopf in einem anderen Format läuft.';
    },
    function(f,P,H){
      var im3=f.planeten.filter(function(x){return x.haus===3;});
      if(!im3.length) return null;
      return 'Im 3. Haus — Reizaufnahme, Sprache, Nahbereich — steht <b>'+im3.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Das färbt, wie viel Input du gleichzeitig verträgst und wie du kommunizierst, wenn es zu viel wird.';
    }],
  uebung:['Dein Format herausfinden',
   'Nimm diese Woche eine Sache, die du verstehen musst, und probier sie in drei Formaten: lesen, jemandem erzählen, aufzeichnen. Merk dir, welches am wenigsten anstrengt. Das ist dein Format — und du darfst es ab jetzt einfordern, statt dich anzupassen.'],
  rueckfrage:'Weißt du jetzt, welches Format dir liegt?',
  coach:{fragen:['Wann fällt dir Verstehen leicht und wann zäh?',
   'Was musst du dir übersetzen, was andere direkt aufnehmen?',
   'Wie erklärst du selbst etwas, wenn du frei wählen darfst?'],
   vorsicht:'Ein Chart beschreibt einen Denkstil, keine Diagnose. Wenn jemand nach einer Einschätzung zu ADHS oder Autismus fragt: freundlich auf eine Fachperson verweisen und nichts andeuten.'}},

 {id:'reize', worum:'Hier geht es darum, was dich müde macht, obwohl es objektiv nichts war. Merken tust du es daran, dass ein normaler Tag dich mehr kostet als andere.', wozuSchutz:'Durchhalten verhindert, dass jemand merkt, wie viel es dich kostet.', wozuFrage:'Was befürchtest du, wenn du sagst, dass du eine Pause brauchst?', name:'Was dich überlastet',
  frage:'Warum bin ich nach normalen Tagen so fertig?',
  anker:{haeuser:[6,12], punkte:['Mond','Neptun','Merkur']},
  regeln:[
    function(f,P,H){
      var im12=f.planeten.filter(function(x){return x.haus===12;});
      if(!im12.length) return null;
      return 'Im 12. Haus — dem Haus der Durchlässigkeit — steht <b>'+im12.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Was dort steht, arbeitet im Hintergrund und unsichtbar. Du verbrauchst dort Energie, ohne es zu bemerken, '+
        'und merkst es erst, wenn nichts mehr geht.';
    },
    function(f,P,H){
      if(P.Mond===undefined) return null;
      var hn=H.haus(P.Mond)+1, zi=Math.floor(P.Mond/30);
      var wasser=(zi===3||zi===7||zi===11);
      return 'Dein <b>Mond in '+H.SIGNS[zi]+', '+hn+'. Haus</b> ist dein Reizfilter. '+
        (wasser
         ? 'In einem Wasserzeichen heißt das: durchlässig. Du nimmst Stimmungen auf, auch fremde, und hältst sie für deine eigenen.'
         : 'Du brauchst Sicherheit über '+H.HT[hn-1]+' — fehlt die, steigt dein Grundpegel, und alles andere wird anstrengender als nötig.');
    },
    function(f,P,H){
      var mn=f.aspekte.filter(function(x){return (x.a==='Mond'||x.b==='Mond')&&x.art==='hart'&&x.o<4;})[0];
      if(!mn) return null;
      var and=(mn.a==='Mond')?mn.b:mn.a;
      return '<b>Mond '+mn.typ+' '+and+'</b> mit '+mn.o.toFixed(1)+'°. Dein Grundpegel ist selten bei null — '+
        'ein Teil deiner Kapazität ist dauerhaft mit '+and+' beschäftigt. Was für andere ein normaler Tag ist, '+
        'ist bei dir ein normaler Tag plus diese Grundlast.';
    },
    function(f,P,H){
      var im6=f.planeten.filter(function(x){return x.haus===6;});
      if(!im6.length) return null;
      return 'Im 6. Haus steht <b>'+im6.map(function(x){return x.p;}).join(', ')+'</b>. Der Alltag selbst — nicht die großen Dinge — '+
        'ist bei dir der Ort, an dem sich Belastung ansammelt.';
    }],
  uebung:['Die Uhrzeit notieren',
   'Schreib diese Woche jeden Tag eine einzige Uhrzeit auf: den Moment, an dem es kippt. Kein Kommentar, keine Bewertung, nur die Zahl. Nach einer Woche siehst du, ob es ein Muster gibt — und ob es an der Uhrzeit liegt oder an dem, was vorher war.'],
  rueckfrage:'Hast du deine Kipp-Zeiten gesammelt?',
  coach:{fragen:['Was kostet dich mehr, als es sollte?',
   'Woran merkst du, dass du über deiner Grenze bist — körperlich?',
   'Was machst du, wenn es zu viel wird, und hilft das wirklich?'],
   vorsicht:'Anhaltende Erschöpfung ist keine Coaching-Frage. Wenn es über Wochen geht, gehört das ärztlich abgeklärt, bevor an Strukturen gearbeitet wird.'}},

 {id:'energie', worum:'Hier geht es darum, warum manchmal alles geht und dann tagelang nichts. Merken tust du es daran, dass du dich für unzuverlässig hältst, obwohl du es nicht bist.', wozuSchutz:'Wer sich nichts vornimmt, kann auch nichts nicht schaffen.', wozuFrage:'Wovor schützt dich das Aufschieben — und was wäre riskant am Anfangen?', name:'Dein Energiehaushalt',
  frage:'Warum geht mal alles und dann gar nichts?',
  anker:{haeuser:[1,6], punkte:['Mars','Saturn','Uranus']},
  regeln:[
    function(f,P,H){
      if(P.Mars===undefined) return null;
      var hn=H.haus(P.Mars)+1, zi=Math.floor(P.Mars/30);
      var fix=(zi===1||zi===4||zi===7||zi===10);
      return 'Dein <b>Mars in '+H.SIGNS[zi]+', '+hn+'. Haus</b> beschreibt, wie deine Energie ankommt. '+
        (fix ? 'In einem fixen Zeichen: langsam hoch, dann lange durch — und schwer zu stoppen, wenn du einmal drin bist.'
             : 'Sie kommt in Schüben. Anfangen ist leicht, Dranbleiben ist die Arbeit.')+
        ' Der Schauplatz ist <b>'+H.HT[hn-1]+'</b>.';
    },
    function(f,P,H){
      var ms=f.aspekte.filter(function(x){return ((x.a==='Mars'&&x.b==='Saturn')||(x.a==='Saturn'&&x.b==='Mars'));})[0];
      if(!ms) return null;
      return '<b>Mars '+ms.typ+' Saturn</b> mit '+ms.o.toFixed(1)+'°. '+
        (ms.art==='hart'
         ? 'Gas und Bremse gleichzeitig. Ein erheblicher Teil deiner Energie geht nicht ins Tun, sondern ins Selbstbremsen. Das ist der Grund, warum ein normaler Tag sich anfühlt wie anderthalb.'
         : 'Antrieb und Ausdauer arbeiten zusammen — du kannst dranbleiben, ohne dich zu zwingen.');
    },
    function(f,P,H){
      if(P.Uranus===undefined) return null;
      var hn=H.haus(P.Uranus)+1;
      return 'Dein <b>Uranus im '+hn+'. Haus</b> sorgt für Unterbrechungen — dort reißt dir regelmäßig der Faden, '+
        'in <b>'+H.HT[hn-1]+'</b>. Nicht aus Unzuverlässigkeit, sondern weil Gleichförmigkeit dort für dich nicht funktioniert.';
    }],
  uebung:['Die 20-Prozent-Regel',
   'Nimm diese Woche eine Sache, die du dir vorgenommen hast, und mach bewusst nur ein Fünftel davon. Fünf Minuten statt einer halben Stunde. Ziel ist nicht die Leistung, sondern die Erfahrung, dass angefangen wurde, ohne dass es teuer war.'],
  rueckfrage:'Hast du etwas in der kleinen Version gemacht?',
  coach:{fragen:['Woran merkst du, dass du gleich Energie hast — bevor du sie nutzt?',
   'Was bringt dich zuverlässig ins Tun?',
   'Was passiert, wenn du dir etwas vornimmst und nicht schaffst?'],
   vorsicht:'Nicht in Produktivitätscoaching kippen. Die Frage ist nicht, wie jemand mehr schafft, sondern wie jemand mit schwankender Kapazität gut leben kann.'}},

 {id:'struktur', worum:'Hier geht es darum, warum deine Systeme nach zwei Wochen zerfallen. Merken tust du es an der Zahl der Apps und Kalender, die du schon ausprobiert hast.', wozuSchutz:'Ein System, das scheitert, ist ein Beweis, dass es nicht an dir lag.', wozuFrage:'Was wäre, wenn eine Struktur tatsächlich hielte — was käme dann auf dich zu?', name:'Struktur, die trägt',
  frage:'Warum halten meine Systeme nie?',
  anker:{haeuser:[6,10], punkte:['Saturn','Mond','Merkur']},
  regeln:[
    function(f,P,H){
      if(P.Saturn===undefined) return null;
      var hn=H.haus(P.Saturn)+1;
      return 'Dein <b>Saturn im '+hn+'. Haus</b> ('+H.fmt(P.Saturn)+') zeigt, wo du Struktur bauen kannst, die hält — '+
        'in <b>'+H.HT[hn-1]+'</b>. Systeme, die dort ansetzen, halten bei dir. Alle anderen zerfallen nach zwei Wochen, '+
        'egal wie gut sie bei anderen funktionieren.';
    },
    function(f,P,H){
      var h=f.herrscher.filter(function(x){return x.haus===6;})[0];
      if(!h) return null;
      return 'Dein 6. Haus steht in '+h.zeichen+', beherrscht von <b>'+h.p+'</b> im '+h.inHaus+'. Haus. '+
        'Deine Alltagsstruktur hängt an <b>'+H.HT[h.inHaus-1]+'</b> — wenn es dort nicht stimmt, hilft kein Kalender.';
    },
    function(f,P,H){
      if(P.Mond===undefined) return null;
      var zi=Math.floor(P.Mond/30);
      var mod=['kardinal','fix','veränderlich'][zi%3];
      return 'Dein Mond ist <b>'+mod+'</b>. '+
        (mod==='fix'
         ? 'Du brauchst Wiederholung und Verlässlichkeit — einmal etabliert, hält eine Routine bei dir lange. Der Aufbau ist das Zähe, nicht das Halten.'
         : mod==='kardinal'
         ? 'Du startest gut und verlierst schnell die Lust. Routinen brauchen bei dir eingebaute Neustarts statt Durchhalten.'
         : 'Du brauchst Abwechslung innerhalb der Struktur. Starre Pläne scheitern bei dir nicht an Disziplin, sondern an Langeweile.');
    }],
  uebung:['Eine Routine an etwas hängen, das schon läuft',
   'Häng diese Woche eine einzige neue Gewohnheit an etwas, das du ohnehin täglich tust — nach dem Zähneputzen, beim Wasserkocher. Nicht neu terminieren, sondern anhängen. Das ist bei sprunghafter Energie der einzige Mechanismus, der zuverlässig funktioniert.'],
  rueckfrage:'Hast du etwas angehängt statt neu geplant?',
  coach:{fragen:['Welche Routine hat bei dir tatsächlich mal gehalten — und was war daran anders?',
   'Was machst du jeden Tag, ohne darüber nachzudenken?',
   'Welche Systeme hast du übernommen, weil sie bei anderen funktionieren?'],
   vorsicht:'Struktur ist bei manchen Menschen kein Willensproblem. Wenn Scham über gescheiterte Systeme auftaucht, ist das der wichtigere Punkt als das nächste System.'}},

 {id:'reizsuche', worum:'Hier geht es darum, warum du dich stundenlang vertiefen kannst und sonst gar nicht. Merken tust du es an der Zahl der angefangenen Projekte.', wozuSchutz:'Immer wieder neu anzufangen schützt davor, an einer Sache gemessen zu werden.', wozuFrage:'Was würde sichtbar, wenn du eine Sache wirklich zu Ende bringst?', name:'Reizsuche und Interesse',
  frage:'Warum kann ich mich stundenlang vertiefen — und sonst gar nicht?',
  anker:{haeuser:[5,9,11], punkte:['Uranus','Jupiter','Merkur']},
  regeln:[
    function(f,P,H){
      if(P.Jupiter===undefined) return null;
      var hn=H.haus(P.Jupiter)+1;
      return 'Dein <b>Jupiter im '+hn+'. Haus</b> zeigt, wo du dich verlierst — im guten Sinn. '+
        'In <b>'+H.HT[hn-1]+'</b> hast du keinen Motivationsmangel, sondern eher das gegenteilige Problem. '+
        'Das ist keine Disziplinfrage: Interesse ist bei dir der Schalter, nicht der Wille.';
    },
    function(f,P,H){
      var im5=f.planeten.filter(function(x){return x.haus===5;});
      var im9=f.planeten.filter(function(x){return x.haus===9;});
      var t=[];
      if(im5.length) t.push('Im 5. Haus steht <b>'+im5.map(function(x){return x.p;}).join(', ')+'</b> — dort kommt Eigenes leicht raus.');
      if(im9.length) t.push('Im 9. Haus steht <b>'+im9.map(function(x){return x.p;}).join(', ')+'</b> — dort zieht es dich in die Tiefe eines Themas.');
      return t.length?t.join(' '):null;
    },
    function(f,P,H){
      if(P.Uranus===undefined) return null;
      var ua=f.aspekte.filter(function(x){return (x.a==='Uranus'||x.b==='Uranus')&&x.o<4;})[0];
      if(!ua) return null;
      var and=(ua.a==='Uranus')?ua.b:ua.a;
      return '<b>Uranus '+ua.typ+' '+and+'</b> mit '+ua.o.toFixed(1)+'°. Neues zieht dich stark an — '+
        'und genau das ist die Falle: Der Reiz des Anfangs ist bei dir größer als die Befriedigung des Abschlusses.';
    }],
  uebung:['Eine Sache zu Ende bringen — die kleinste',
   'Such dir eine angefangene Sache, die fast fertig ist, und bring sie diese Woche zu Ende. Nicht die wichtigste — die kleinste. Es geht darum, den Abschluss einmal zu spüren, weil der bei dir seltener belohnt wird als der Anfang.'],
  rueckfrage:'Hast du etwas abgeschlossen?',
  coach:{fragen:['Wobei vergisst du die Zeit?',
   'Wie viele Dinge hast du gerade angefangen?',
   'Was war das Letzte, das du fertig gemacht hast — und wie hat sich das angefühlt?'],
   vorsicht:'Angefangene Projekte nicht als Charakterschwäche behandeln. Für viele ist das kein Fehler, sondern die Bauweise.'}},

 {id:'rueckzug', worum:'Hier geht es darum, was dich tatsächlich auflädt — nicht was als Entspannung gilt. Merken tust du es daran, ob du nach einem freien Abend erholt bist oder nicht.', wozuSchutz:'Wer keine Pause macht, muss nicht merken, wie erschöpft er ist.', wozuFrage:'Was käme hoch, wenn du wirklich zur Ruhe kommst?', name:'Rückzug und Erholung',
  frage:'Was lädt mich wirklich auf?',
  anker:{haeuser:[12,4], punkte:['Mond','Neptun','Saturn']},
  regeln:[
    function(f,P,H){
      var h=f.herrscher.filter(function(x){return x.haus===12;})[0];
      if(!h) return null;
      return 'Der Herrscher deines 12. Hauses ist <b>'+h.p+'</b> im '+h.inHaus+'. Haus. '+
        'Echte Erholung findest du über <b>'+H.HT[h.inHaus-1]+'</b> — nicht über das, was allgemein als Entspannung gilt.';
    },
    function(f,P,H){
      if(P.Mond===undefined) return null;
      var hn=H.haus(P.Mond)+1, zi=Math.floor(P.Mond/30);
      var el=['Feuer','Erde','Luft','Wasser'][zi%4];
      return 'Dein Mond steht in einem <b>'+el+'zeichen</b>, im '+hn+'. Haus. '+
        (el==='Feuer'?'Du erholst dich über Bewegung und Begeisterung, nicht über Stillsitzen.':
         el==='Erde'?'Du erholst dich über Körperlichkeit und Konkretes — etwas anfassen, etwas fertig machen.':
         el==='Luft'?'Du erholst dich über Austausch und Gedanken. Völlige Reizlosigkeit macht dich unruhiger, nicht ruhiger.':
         'Du erholst dich über Rückzug und Wasser. Volle Räume kosten dich mehr als Arbeit.');
    },
    function(f,P,H){
      var im4=f.planeten.filter(function(x){return x.haus===4;});
      if(!im4.length) return null;
      return 'Im 4. Haus steht <b>'+im4.map(function(x){return x.p;}).join(', ')+'</b>. Dein Zuhause ist bei dir kein Nebenschauplatz — '+
        'wenn es dort nicht stimmt, funktioniert Erholung nirgendwo.';
    }],
  uebung:['Drei Erholungsarten testen',
   'Probier diese Woche drei verschiedene Arten von Pause: eine mit Bewegung, eine mit Menschen, eine allein und still. Je 20 Minuten. Notier danach, wie es dir geht. Die meisten erholen sich anders, als sie glauben.'],
  rueckfrage:'Weißt du jetzt, was dich wirklich auflädt?',
  coach:{fragen:['Was machst du zur Erholung, weil man das so macht?',
   'Wann warst du zuletzt wirklich ausgeruht?',
   'Was brauchst du nach einem vollen Tag als Erstes?'],
   vorsicht:'Wenn Erholung grundsätzlich nicht mehr wirkt, ist das ein Warnzeichen und keine Frage der Methode.'}},

 {id:'maske', worum:'Hier geht es um die Schicht, die du aufsetzt, damit es leichter läuft. Merken tust du es an der Erschöpfung nach einem netten Abend.', wozuSchutz:'Die Anpassungsschicht sichert Zugehörigkeit — sie kostet nur.', wozuFrage:'Wen könntest du verlieren, wenn du sie weglässt? Und stimmt das wirklich?', name:'Anders sein unter Menschen',
  frage:'Warum ist Sozialsein so anstrengend?',
  anker:{haeuser:[11,1], punkte:['Uranus','Saturn','ASC']},
  regeln:[
    function(f,P,H){
      if(P.Uranus===undefined) return null;
      var hn=H.haus(P.Uranus)+1;
      return 'Dein <b>Uranus im '+hn+'. Haus</b> markiert, wo du anders bist als erwartet — in <b>'+H.HT[hn-1]+'</b>. '+
        'Dort spürst du am deutlichsten, dass du nicht ins Raster passt. Das ist gleichzeitig die Stelle, '+
        'an der du am wenigsten anpassen solltest, weil es dort am meisten kostet.';
    },
    function(f,P,H){
      var im11=f.planeten.filter(function(x){return x.haus===11;});
      if(!im11.length) return 'Dein 11. Haus ist unbesetzt. Gruppen sind bei dir kein Dauerthema — du brauchst sie weniger, '+
        'was es leichter macht, dich nicht zu verbiegen, und schwerer, Anschluss zu suchen, wenn du ihn brauchst.';
      return 'Im 11. Haus — Gruppen und Zugehörigkeit — steht <b>'+im11.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Gemeinschaft ist bei dir wichtig, und genau deshalb ist Anpassung dort eine echte Versuchung.';
    },
    function(f,P,H){
      var zi=Math.floor(P.ASC/30);
      return 'Dein <b>Aszendent in '+H.SIGNS[zi]+'</b> ist die Schicht, die Menschen zuerst sehen. '+
        'Wenn sich das stark von deinem Inneren unterscheidet, entsteht Übersetzungsarbeit: '+
        'Du wirkst anders, als du bist, und musst die Lücke selbst überbrücken. Das ist ein Teil der Erschöpfung, '+
        'die nach sozialen Situationen bleibt.';
    }],
  uebung:['Zehn Minuten unmaskiert',
   'Sei diese Woche in einer sicheren Situation zehn Minuten lang ohne die Anpassungsschicht: kein automatisches Lächeln, kein Nachfragen aus Höflichkeit, keine Energie fürs Passendsein. Schau, was tatsächlich passiert. Meistens weniger als befürchtet.'],
  rueckfrage:'Hattest du zehn Minuten ohne Maske?',
  coach:{fragen:['Bei wem musst du dich nicht zusammenreißen?',
   'Was tust du in Gesellschaft automatisch, ohne es zu wollen?',
   'Wie fühlst du dich direkt nach einem Treffen — und zwei Stunden später?'],
   vorsicht:'Maskieren ist ein ernsthaftes Thema mit realen Kosten. Es benennen ja, es analysieren nein — und keine Rückschlüsse auf eine Diagnose ziehen.'}}

 ]
}; var WOZU={"verarbeitung": ["Dich anzupassen an fremde Formate erspart Erklärungen. Um dein eigenes zu bitten, hieße zuzugeben, dass du eins brauchst.", "Was befürchtest du, wenn du sagst: So verstehe ich es besser?"], "reize": ["Durchzuhalten wirkt belastbar. Früher aufzuhören hieße einzugestehen, dass du weniger verträgst als andere.", "Was denkst du, würde man über dich denken, wenn du eher gehst?"], "energie": ["Dir viel vorzunehmen hält das Bild aufrecht, dass du es könntest, wenn du nur wolltest.", "Was müsstest du dir eingestehen, wenn du deine Liste halbierst?"], "struktur": ["Die Schuld bei dir zu suchen ist vertraut. Dass Strukturen für andere Köpfe gebaut sind, wäre eine unbequemere Erklärung.", "Was änderst du, wenn nicht du das Problem bist, sondern die Vorlage?"], "reizsuche": ["Immer Neues anzufangen hält die Begeisterung frisch. Etwas zu Ende zu bringen heißt, es an der Realität zu messen.", "Was riskierst du, wenn du eine Sache fertig machst und sie dann beurteilt wird?"], "rueckzug": ["Erst zusammenzubrechen statt früher zu pausieren hat einen Vorteil: Dann ist es legitim. Vorher wäre es Faulheit.", "Wozu brauchst du einen so guten Grund, um dir Ruhe zu erlauben?"], "maske": ["Die Maske sichert Zugehörigkeit. Sie abzunehmen hieße herauszufinden, ob man dich auch so will.", "Was fürchtest du, wenn Menschen dich ohne die Schicht erleben?"]};

    return {RAUM:RAUM, WOZU:(typeof WOZU!=='undefined')?WOZU:{}}; })()
};

/* ── Berufung · Themenraum · Astro-Charlie ─────────────────────────────── */
R_RAEUME['berufung'] = {
  adler: true,
  zeitschiene: false,
  titel: "Berufung · Themenraum · Astro-Charlie",
  h1: "Berufung.",
  frage: "„Wofür bin ich eigentlich hier?\"",
  intro: "Die Frage kommt fast nie als Berufsfrage — sie kommt als Unruhe. Berufung ist im Chart auch kein einzelner Punkt, sondern sieben Fäden: was dich antreibt, wofür du gesehen wirst, was du täglich tust, womit du Geld verdienst, wohin es dich zieht, was du schon kannst und wem das nützt. Bei den meisten Menschen stimmt es an drei Stellen und hakt an einer. Diese eine zu finden bringt mehr als jeder Berufstest.",
  weiter: "<div class=\"weiter\"><a href=\"raeume.html\"><span class=\"lbl\">&larr; Zur&uuml;ck</span><span class=\"ttl\">Alle R&auml;ume</span></a><a href=\"berufe.html\" class=\"nx\"><span class=\"lbl\">Nachschlagen &rarr;</span><span class=\"ttl\">Berufe im Chart</span></a></div>",
  fuss: "Themenraum Berufung &middot; Gewichtung aus deinem Chart, im Browser gerechnet. Selbstarbeit und Coaching &mdash; keine Therapie.",
  def: (function(){ var RAUM = {
 name:'Berufung',
 slug:'berufung',
 sortierTitel:'Wo deine Berufungsfrage tatsächlich hakt',
 facetten:[
 {id:'antrieb', worum:'Hier geht es darum, was dich tatsächlich in Bewegung bringt — nicht was auf dem Papier gut aussieht. Merken tust du es daran, wobei du nicht auf die Uhr schaust.', wozuSchutz:'Wer nichts Eigenes will, kann darin auch nicht scheitern.', wozuFrage:'Was würde von dir verlangt, wenn du zugibst, was du wirklich willst?', name:'Was dich antreibt',
  frage:'Wofür stehe ich morgens überhaupt auf?',
  anker:{haeuser:[1,5], punkte:['Sonne','Mars','Jupiter']},
  regeln:[
    function(f,P,H){
      if(P.Sonne===undefined) return null;
      var hn=H.haus(P.Sonne)+1, zi=Math.floor(P.Sonne/30);
      return 'Deine <b>Sonne in '+H.SIGNS[zi]+', '+hn+'. Haus</b> ('+H.fmt(P.Sonne)+'). '+
        'Das ist nicht dein Beruf, sondern dein Antrieb: Du willst wirksam sein in <b>'+H.HT[hn-1]+'</b>. '+
        'Jede Tätigkeit, die diesen Bereich ausspart, kostet dich auf Dauer mehr Kraft, als sie zurückgibt.';
    },
    function(f,P,H){
      if(P.Mars===undefined) return null;
      var hn=H.haus(P.Mars)+1;
      return 'Dein <b>Mars im '+hn+'. Haus</b> sagt, wo du tatsächlich ins Tun kommst — in <b>'+H.HT[hn-1]+'</b>. '+
        'Sonne und Mars zusammen: Die Sonne will, der Mars macht. Liegen beide weit auseinander, '+
        'arbeitest du oft an Dingen, die dich nicht nähren.';
    },
    function(f,P,H){
      var sm=f.aspekte.filter(function(x){return (x.a==='Sonne'&&x.b==='Mars')||(x.a==='Mars'&&x.b==='Sonne');})[0];
      if(!sm) return null;
      return '<b>Sonne '+sm.typ+' Mars</b> mit '+sm.o.toFixed(1)+'°. '+
        (sm.art==='weich'
          ? 'Wille und Umsetzung greifen ineinander — du machst, was du dir vornimmst, ohne dich zu überwinden.'
          : 'Wille und Umsetzung reiben. Du verbrauchst Kraft am eigenen Widerstand oder überziehst. Der Umweg gehört bei dir dazu.');
    },
    function(f,P,H){
      var im5=f.planeten.filter(function(x){return x.haus===5;});
      if(!im5.length) return 'Dein 5. Haus ist unbesetzt. Eigener Ausdruck läuft bei dir nicht automatisch — du musst dich aktiv dafür entscheiden, sonst geht er im Nützlichen unter.';
      return 'Im 5. Haus steht <b>'+im5.map(function(x){return x.p;}).join(', ')+'</b>. Dort kommt Eigenes am leichtesten heraus — das ist eine ernstzunehmende Spur für die Berufung, auch wenn es sich wie Hobby anfühlt.';
    }],
  uebung:['Zwei Stunden für das Unnütze',
   'Blockier diese Woche zwei Stunden für etwas, das dir Freude macht und niemandem nützt. Kein Projekt, kein Ergebnis, keine Dokumentation. Beobachte danach, wie dein Energielevel ist — das ist die eigentliche Messung.'],
  rueckfrage:'Hattest du diese Woche zwei Stunden für etwas Unnützes?',
  coach:{fragen:['Was hast du als Kind stundenlang gemacht, ohne dass es jemand verlangt hat?',
   'Wann arbeitest du und merkst nicht, dass Zeit vergeht?',
   'Wofür würdest du morgens aufstehen, wenn Geld keine Rolle spielte?'],
   vorsicht:'Nicht zur Leidenschaft drängen. Manche Menschen haben keine brennende Berufung und brauchen stattdessen einen erträglichen Alltag. Das ist kein Defizit.'}},

 {id:'sichtbarkeit', worum:'Hier geht es darum, als was dich Menschen kennen sollen. Merken tust du es daran, wie schwer es dir fällt, in einem Satz zu sagen, was du machst.', wozuSchutz:'Unsichtbar zu bleiben schützt vor Kritik und vor dem Vergleich.', wozuFrage:'Was könnte passieren, wenn Menschen genau wüssten, wofür du stehst?', name:'Wofür du gesehen wirst',
  frage:'Als was sollen mich Menschen kennen?',
  anker:{haeuser:[10], punkte:['MC','Saturn','Jupiter','Chiron']},
  regeln:[
    function(f,P,H){
      if(P.MC===undefined) return null;
      var zi=Math.floor(P.MC/30), hp=H.HERR[zi];
      var hin=(P[hp]!==undefined)?(H.haus(P[hp])+1):null;
      var t='Dein <b>MC steht in '+H.SIGNS[zi]+'</b> ('+H.fmt(P.MC)+') — so willst du öffentlich wirken. ';
      if(hin) t+='Beherrscht wird das von <b>'+hp+'</b>, und dein '+hp+' steht im <b>'+hin+'. Haus</b>. '+
        'Das ist der wichtigste Satz zur Berufung überhaupt: <b>Deine Sichtbarkeit läuft über '+H.HT[hin-1]+'</b>. '+
        'Dort entsteht sie, nicht im Bewerbungsschreiben.';
      return t;
    },
    function(f,P,H){
      var im10=f.planeten.filter(function(x){return x.haus===10;});
      if(!im10.length) return 'Dein 10. Haus ist unbesetzt. Karriere ist bei dir kein Selbstläufer und auch kein Dauerthema — die Berufung läuft über den MC-Herrscher, nicht über Planeten im Berufshaus.';
      return 'Im 10. Haus steht <b>'+im10.map(function(x){return x.p+' ('+H.fmt(x.pos)+')';}).join(', ')+'</b>. '+
        'Diese Funktionen werden öffentlich sichtbar, ob du willst oder nicht. Menschen verbinden dich damit.';
    },
    function(f,P,H){
      if(P.Chiron===undefined) return null;
      var hn=H.haus(P.Chiron)+1;
      if(hn!==10&&hn!==6) return null;
      return '<b>Chiron im '+hn+'. Haus</b> — der wunde Punkt sitzt im Berufsbereich. '+
        'Du kennst vermutlich das Gefühl, beruflich nicht genug zu sein, unabhängig davon, was stimmt. '+
        'Genau daraus entsteht aber dein Blick für andere in derselben Lage. Das ist keine Schwäche, sondern die Qualifikation.';
    },
    function(f,P,H){
      var a=f.achsnah.filter(function(x){return x.zu==='MC';});
      if(!a.length) return null;
      return '<b>'+a.map(function(x){return x.p;}).join(', ')+'</b> liegt fast auf deinem MC-Grad. '+
        'Solche Punkte prägen dein öffentliches Bild überproportional — auch wenn sie in einem unauffälligen Haus stehen.';
    }],
  uebung:['Einen Satz über dich schreiben',
   'Schreib einen Satz, der beschreibt, was du tust — ohne Jobtitel, ohne Firma, ohne „eigentlich". Zwölf Wörter reichen. Sag ihn diese Woche einmal laut zu einer Person.'],
  rueckfrage:'Hast du deinen Satz jemandem gesagt?',
  coach:{fragen:['Wofür kommen Menschen zu dir, ohne dass du dafür geworben hast?',
   'Was sollen Leute über dich sagen, wenn du nicht im Raum bist?',
   'Welchen Teil deiner Arbeit versteckst du?'],
   vorsicht:'Nicht mit Positionierungsberatung verwechseln. Die Frage ist nicht, wie man sich verkauft, sondern was tatsächlich stimmt.'}},

 {id:'alltag', worum:'Hier geht es nicht um deinen Beruf, sondern um deinen Dienstag. Merken tust du es daran, wie du dich abends fühlst — leer oder gefüllt.', wozuSchutz:'Ein voller Tag lässt keine Zeit für die Frage, ob es der richtige ist.', wozuFrage:'Was müsstest du dir anschauen, wenn dein Kalender leerer wäre?', name:'Was du täglich tust',
  frage:'Hält mein Arbeitsalltag mich aus — oder ich ihn?',
  anker:{haeuser:[6], punkte:['Merkur','Mars','Saturn','Mond']},
  regeln:[
    function(f,P,H){
      var im6=f.planeten.filter(function(x){return x.haus===6;});
      if(!im6.length) return null;
      return 'Im 6. Haus — Alltag, Arbeitsweise, Routine — steht <b>'+im6.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Das beschreibt nicht, was du arbeitest, sondern <b>wie</b>: in welchem Takt, mit welcher Gründlichkeit, mit welchem Verschleiß.';
    },
    function(f,P,H){
      var h=f.herrscher.filter(function(x){return x.haus===6;})[0];
      if(!h) return null;
      return 'Dein 6. Haus steht in '+h.zeichen+', Herrscher <b>'+h.p+'</b> im '+h.inHaus+'. Haus. '+
        'Dein Arbeitsalltag hängt also an <b>'+H.HT[h.inHaus-1]+'</b>. Wenn es dort klemmt, wird auch ein guter Job zäh.';
    },
    function(f,P,H){
      if(P.Merkur===undefined) return null;
      var hn=H.haus(P.Merkur)+1, zi=Math.floor(P.Merkur/30);
      return 'Dein <b>Merkur in '+H.SIGNS[zi]+'</b> beschreibt, wie du Informationen verarbeitest — '+
        'und damit, welche Art von Arbeit dich ermüdet und welche nicht. Er steht im '+hn+'. Haus, also in <b>'+H.HT[hn-1]+'</b>.';
    },
    function(f,P,H){
      var ms=f.aspekte.filter(function(x){return ((x.a==='Mars'&&x.b==='Saturn')||(x.a==='Saturn'&&x.b==='Mars'))&&x.art==='hart';})[0];
      if(!ms) return null;
      return '<b>Mars '+ms.typ+' Saturn</b> mit '+ms.o.toFixed(1)+'°. Gas und Bremse gleichzeitig. '+
        'Im Arbeitsalltag heißt das: Du verbrauchst einen Teil deiner Energie damit, dich selbst zu bremsen. '+
        'Das ist der Grund, warum acht Stunden bei dir sich anfühlen wie zwölf.';
    }],
  uebung:['Eine Woche mitschreiben, wann die Energie kippt',
   'Notier diese Woche jeden Tag eine Uhrzeit: den Moment, an dem es anstrengend wird. Nur die Uhrzeit, kein Kommentar. Am Ende der Woche siehst du ein Muster — und das ist die Information, mit der du deinen Tag umbauen kannst.'],
  rueckfrage:'Hast du dein Kipp-Muster gefunden?',
  coach:{fragen:['Welcher Teil deines Tages kostet dich am meisten — und wofür genau?',
   'Was in deiner Arbeit machst du, weil es sich gehört?',
   'Wie sähe ein Tag aus, nach dem du abends nicht leer bist?'],
   vorsicht:'Bei anhaltender Erschöpfung ist das keine Struktur-, sondern eine Gesundheitsfrage. Dann gehört es zur Ärztin.'}},

 {id:'verdienst', worum:'Hier geht es darum, wovon du lebst und ob das zu dir passt. Merken tust du es daran, ob du weißt, wie viel du im Monat tatsächlich brauchst.', wozuSchutz:'Solange du deine Zahl nicht kennst, musst du sie auch nicht einfordern.', wozuFrage:'Was würdest du ändern müssen, wenn du genau wüsstest, was du brauchst?', name:'Womit du Geld verdienst',
  frage:'Kann ich davon leben — und will ich das so?',
  anker:{haeuser:[2], punkte:['Venus','Jupiter','Saturn']},
  regeln:[
    function(f,P,H){
      var h=f.herrscher.filter(function(x){return x.haus===2;})[0];
      if(!h) return null;
      return 'Dein 2. Haus steht in '+h.zeichen+', Herrscher <b>'+h.p+'</b> im '+h.inHaus+'. Haus. '+
        '<b>Dein Einkommen läuft über '+H.HT[h.inHaus-1]+'</b> — dort entsteht es, dort solltest du ansetzen, '+
        'wenn sich finanziell etwas ändern soll.';
    },
    function(f,P,H){
      var im2=f.planeten.filter(function(x){return x.haus===2;});
      if(!im2.length) return null;
      return 'Im 2. Haus steht <b>'+im2.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Das beschreibt, womit du dich sicher fühlst — nicht unbedingt, was viel einbringt. Die beiden Dinge sind nicht dasselbe.';
    },
    function(f,P,H){
      var vj=f.aspekte.filter(function(x){return (x.a==='Venus'||x.b==='Venus')&&x.o<3;})[0];
      if(!vj) return null;
      var ander=(vj.a==='Venus')?vj.b:vj.a;
      return '<b>Venus '+vj.typ+' '+ander+'</b> mit '+vj.o.toFixed(1)+'°. Dein Wertgefühl hängt eng an '+ander+
        ' — das färbt, wie leicht oder schwer dir das Thema Geld fällt.';
    }],
  uebung:['Eine Zahl aufschreiben, die reicht',
   'Schreib auf, wie viel du im Monat brauchst, damit es dir gut geht. Nicht wie viel du gern hättest — wie viel reicht. Die meisten haben diese Zahl noch nie ausgerechnet und verhandeln deshalb im Nebel.'],
  rueckfrage:'Kennst du deine Zahl jetzt?',
  coach:{fragen:['Was müsstest du verdienen, damit du aufhörst, dir Sorgen zu machen?',
   'Wofür hast du zuletzt Geld bekommen, das sich nicht nach Arbeit anfühlte?',
   'Was würdest du tun, wenn Geld für ein Jahr gesichert wäre?'],
   vorsicht:'Keine Finanzberatung. Du arbeitest am Verhältnis zum Geld, nicht an Zahlen oder Anlagen.'}},

 {id:'richtung', worum:'Hier geht es darum, ob dein Weg noch deiner ist oder nur Gewohnheit. Merken tust du es daran, wovon du seit Jahren redest und es nie anfängst.', wozuSchutz:'Beim Bekannten zu bleiben kostet nichts und enttäuscht niemanden.', wozuFrage:'Was hättest du aufzugeben, wenn du die Richtung wechselst — und wer würde es merken?', name:'Wohin es dich zieht',
  frage:'Ist das noch mein Weg oder nur Gewohnheit?',
  anker:{haeuser:[9], punkte:['Jupiter','Neptun']},
  regeln:[
    function(f,P,H){
      if(P.Knoten===undefined&&P.NN===undefined) return null;
      var nn=(P.Knoten!==undefined)?P.Knoten:P.NN;
      var hn=H.haus(nn)+1, sn=H.haus((nn+180)%360)+1;
      return 'Dein <b>Nordknoten im '+hn+'. Haus</b> zeigt die Richtung: <b>'+H.HT[hn-1]+'</b>. '+
        'Gegenüber, im '+sn+'. Haus, liegt der Südknoten — das, was du schon kannst und worin du dich gern einrichtest. '+
        'Berufliche Entwicklung heißt bei dir: das Bekannte nutzen, aber nicht darin bleiben.';
    },
    function(f,P,H){
      if(P.Jupiter===undefined) return null;
      var hn=H.haus(P.Jupiter)+1;
      return 'Dein <b>Jupiter im '+hn+'. Haus</b> ('+H.fmt(P.Jupiter)+') zeigt, wo dir etwas zufällt und wo du dir etwas zutraust: '+
        'in <b>'+H.HT[hn-1]+'</b>. Chancen kommen bei dir aus dieser Richtung — dort lohnt es sich, sichtbar zu sein.';
    },
    function(f,P,H){
      var im9=f.planeten.filter(function(x){return x.haus===9;});
      if(!im9.length) return 'Dein 9. Haus ist unbesetzt. Große Sinnfragen treiben dich nicht ständig um — du findest Bedeutung eher im Konkreten als im Überbau.';
      return 'Im 9. Haus steht <b>'+im9.map(function(x){return x.p;}).join(', ')+'</b>. Lernen, Lehren, Weite und Überzeugung gehören bei dir zur Berufsfrage dazu.';
    }],
  uebung:['Ein Gespräch mit jemandem, der es schon macht',
   'Sprich diese Woche mit einer Person, die das tut, wovon du denkst, du könntest es auch wollen. Nicht um dich zu bewerben — um zu hören, wie ihr Dienstag aussieht. Der Alltag entscheidet, nicht die Idee.'],
  rueckfrage:'Hast du mit jemandem gesprochen?',
  coach:{fragen:['Was hast du vor fünf Jahren gemacht — und was davon ist noch dran?',
   'Wovon redest du seit Jahren, ohne es anzufangen?',
   'Was müsste wegfallen, damit Platz für das Neue wäre?'],
   vorsicht:'Vorsicht mit Aufbruchsromantik. Manchmal ist bleiben die reifere Entscheidung, und das darf im Gespräch vorkommen.'}},

 {id:'koennen', worum:'Hier geht es um das, was du kannst, ohne es für besonders zu halten. Merken tust du es daran, wofür Menschen sich bei dir bedanken, obwohl du nichts Besonderes getan hast.', wozuSchutz:'Wer seine Stärken für selbstverständlich hält, muss sie nicht verantworten.', wozuFrage:'Was käme auf dich zu, wenn du zugibst, dass du das wirklich gut kannst?', name:'Was du schon mitbringst',
  frage:'Was kann ich eigentlich, ohne es zu merken?',
  anker:{haeuser:[6,3], punkte:['Saturn','Merkur','Mars']},
  regeln:[
    function(f,P,H){
      if(P.Saturn===undefined) return null;
      var hn=H.haus(P.Saturn)+1;
      return 'Dein <b>Saturn im '+hn+'. Haus</b> ('+H.fmt(P.Saturn)+') ist deine unbeliebteste Stärke. '+
        'Dort hast du dich am längsten durchgearbeitet — in <b>'+H.HT[hn-1]+'</b>. '+
        'Was man sich hart erarbeitet hat, hält man selten für ein Talent. Genau deshalb ist es eins.';
    },
    function(f,P,H){
      var im3=f.planeten.filter(function(x){return x.haus===3;});
      if(!im3.length) return null;
      return 'Im 3. Haus steht <b>'+im3.map(function(x){return x.p;}).join(', ')+'</b> — Sprache, Vermitteln, Naheliegendes. '+
        'Solche Fähigkeiten hält man für selbstverständlich, weil sie leichtfallen. Andere zahlen dafür.';
    },
    function(f,P,H){
      var weich=f.aspekte.filter(function(x){return x.art==='weich'&&x.o<3;}).slice(0,2);
      if(!weich.length) return null;
      return 'Leicht läuft bei dir <b>'+weich.map(function(x){return x.a+' '+x.typ+' '+x.b;}).join('</b> und <b>')+
        '</b>. Weiche Aspekte beschreiben Begabungen, die man für normal hält — genau deshalb werden sie selten genutzt.';
    }],
  uebung:['Drei Menschen fragen',
   'Frag diese Woche drei Personen: „Was kann ich deiner Meinung nach gut?" Nicht nachhaken, nicht widersprechen, nur aufschreiben. Was zweimal vorkommt, ist vermutlich wahr — auch wenn du es nicht glaubst.'],
  rueckfrage:'Hast du drei Menschen gefragt?',
  coach:{fragen:['Was fällt dir so leicht, dass du denkst, jeder könnte das?',
   'Wofür bedanken sich Menschen bei dir?',
   'Was hast du dir mühsam beigebracht und inzwischen vergessen, dass es Mühe war?'],
   vorsicht:'Nicht in Lob kippen. Es geht um Beobachtung von außen, nicht um Aufmunterung.'}},

 {id:'beitrag', worum:'Hier geht es darum, wofür deine Arbeit am Ende gut sein soll. Merken tust du es daran, ob dir eine Person einfällt, der du konkret geholfen hast.', wozuSchutz:'Ohne benannten Zweck kann man auch nicht daran gemessen werden.', wozuFrage:'Was würde verbindlich, wenn du sagst, wofür deine Arbeit gut sein soll?', name:'Wem du damit nützt',
  frage:'Wofür soll das am Ende gut sein?',
  anker:{haeuser:[11,12], punkte:['Neptun','Jupiter','Pluto']},
  regeln:[
    function(f,P,H){
      var im11=f.planeten.filter(function(x){return x.haus===11;});
      if(!im11.length) return null;
      return 'Im 11. Haus — Gruppen, Gleichgesinnte, größere Ziele — steht <b>'+im11.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Deine Wirkung entfaltet sich über Menschen, nicht allein. Netzwerke sind bei dir kein Beiwerk, sondern der Weg.';
    },
    function(f,P,H){
      var h=f.herrscher.filter(function(x){return x.haus===11;})[0];
      if(!h) return null;
      return 'Der Herrscher deines 11. Hauses ist <b>'+h.p+'</b> im '+h.inHaus+'. Haus. '+
        'Zugang zu Gruppen bekommst du über <b>'+H.HT[h.inHaus-1]+'</b>.';
    },
    function(f,P,H){
      if(P.Neptun===undefined) return null;
      var hn=H.haus(P.Neptun)+1;
      return 'Dein <b>Neptun im '+hn+'. Haus</b> zeigt, wo du dich für etwas Größeres öffnest — in <b>'+H.HT[hn-1]+'</b>. '+
        'Das ist die Stelle, an der Arbeit für dich Sinn bekommt. Und gleichzeitig die, an der du dich am leichtesten verausgabst, '+
        'ohne es zu merken.';
    }],
  uebung:['Einen Namen aufschreiben',
   'Schreib den Namen einer einzigen Person auf, der deine Arbeit konkret geholfen hat. Nicht „Menschen" — eine Person, ein Name, eine Situation. Wenn dir keiner einfällt, ist das die eigentliche Information.'],
  rueckfrage:'Ist dir ein Name eingefallen?',
  coach:{fragen:['Wem hättest du mit 20 gern geholfen?',
   'Welches Problem kennst du so gut, weil du es selbst hattest?',
   'Was ärgert dich an deiner Branche so sehr, dass du es besser machen willst?'],
   vorsicht:'Nicht ins Missionarische drehen. Nicht jede Arbeit braucht einen höheren Sinn, um in Ordnung zu sein.'}}

 ]
}; var WOZU={"antrieb": ["Nützlich zu bleiben ist sicherer, als dem nachzugehen, was dich antreibt. Nützlichkeit wird immer gebraucht.", "Was verlierst du an Sicherheit, wenn du Zeit für etwas nimmst, das niemandem dient?"], "sichtbarkeit": ["Unsichtbar zu bleiben schützt vor Erwartungen. Wer nicht bekannt ist, muss nichts halten.", "Was müsstest du einlösen, wenn Menschen wüssten, wofür du stehst?"], "alltag": ["Den Alltag zu ertragen ist einfacher, als ihn umzubauen. Umbau bedeutet Streit mit Gewohnheiten und mit anderen.", "Was müsstest du ändern — und wem gegenüber durchsetzen —, wenn dein Tag dir passen soll?"], "verdienst": ["Nicht genau hinzusehen hält die Sache offen. Solange du die Zahl nicht kennst, musst du dich nicht entscheiden.", "Wozu müsstest du dich verhalten, wenn du genau wüsstest, was du brauchst?"], "richtung": ["Beim Bekannten zu bleiben ist berechenbar. Der neue Weg kostet Kompetenz, die du dir erarbeitet hast.", "Was gibst du auf, wenn du dorthin gehst, wo du nochmal Anfängerin bist?"], "koennen": ["Das eigene Können kleinzureden schützt vor Anspruch. Wer nichts kann, muss nichts abliefern.", "Was würde von dir erwartet, wenn du zugibst, was du tatsächlich kannst?"], "beitrag": ["Ohne klaren Adressaten zu arbeiten hält alles offen. Sich festzulegen heißt, andere Möglichkeiten zu streichen.", "Was schließt du aus, wenn du dich für eine bestimmte Gruppe entscheidest?"]};

    return {RAUM:RAUM, WOZU:(typeof WOZU!=='undefined')?WOZU:{}}; })()
};

/* ── Herkunft · Themenraum · Astro-Charlie ─────────────────────────────── */
R_RAEUME['herkunft'] = {
  adler: true,
  zeitschiene: false,
  titel: "Herkunft · Themenraum · Astro-Charlie",
  h1: "Herkunft.",
  frage: "„Was läuft aus meiner Familie noch mit?\"",
  intro: "Dieser Raum liegt unter vielen anderen. Was du über Geld glaubst, wie nah du Menschen kommst, wann du dich zusammenreißt — vieles davon wurde entschieden, bevor du mitreden konntest. Sieben Facetten: die Atmosphäre von damals, was dich genährt hat, welche Autorität du verinnerlicht hast, was nie ausgesprochen wurde, was du übernommen hast, welche Rolle du hattest — und was du daraus machst.",
  weiter: "<div class=\"weiter\"><a href=\"raeume.html\"><span class=\"lbl\">&larr; Zur&uuml;ck</span><span class=\"ttl\">Alle R&auml;ume</span></a><a href=\"erinnerung.html\" class=\"nx\"><span class=\"lbl\">Passt dazu &rarr;</span><span class=\"ttl\">Deine früheste Erinnerung</span></a></div>",
  fuss: "Themenraum Herkunft &middot; Gewichtung aus deinem Chart, im Browser gerechnet. Selbstarbeit und Coaching &mdash; keine Therapie.",
  def: (function(){ var RAUM = {
 name:'Herkunft',
 slug:'herkunft',
 sortierTitel:'Wo deine Herkunft heute noch wirkt',
 facetten:[
 {id:'atmosphaere', worum:'Hier geht es nicht um die Fakten deiner Kindheit, sondern um die Stimmung. Merken tust du es daran, wie sich dein Körper anfühlt, wenn du an das Zuhause von damals denkst.', wozuSchutz:'Das Unbenannte muss nicht verhandelt werden. Schweigen hält die Familie zusammen.', wozuFrage:'Was würde sich in deiner Familie verschieben, wenn du es aussprichst?', name:'Die Atmosphäre, in der du groß wurdest',
  frage:'Wie war die Stimmung, in der ich aufgewachsen bin?',
  anker:{haeuser:[4], punkte:['Mond','Pluto','Neptun','Saturn']},
  regeln:[
    function(f,P,H){
      var ic=(P.MC+180)%360, zi=Math.floor(ic/30), hp=H.HERR[zi];
      var hin=(P[hp]!==undefined)?(H.haus(P[hp])+1):null;
      var t='Dein <b>IC steht in '+H.SIGNS[zi]+'</b> ('+H.fmt(ic)+') — der tiefste Punkt deines Charts, '+
        'die Wurzel. Das beschreibt nicht die Fakten deiner Kindheit, sondern <b>die Atmosphäre</b>: '+
        'was in der Luft lag, auch wenn niemand darüber sprach. ';
      if(hin) t+='Beherrscht wird das von <b>'+hp+'</b> im '+hin+'. Haus — dein Herkunftsthema wirkt bis heute in <b>'+H.HT[hin-1]+'</b> hinein.';
      return t;
    },
    function(f,P,H){
      var im4=f.planeten.filter(function(x){return x.haus===4;});
      if(!im4.length) return 'Dein 4. Haus ist unbesetzt. Herkunft ist bei dir kein Dauerthema im Vordergrund — '+
        'was nicht heißt, dass nichts da ist, sondern dass es über den Herrscher läuft und leiser wirkt.';
      var t=[];
      im4.forEach(function(x){
        if(x.p==='Saturn') t.push('<b>Saturn im 4.</b> — es war eng, ernst oder karg. Wärme musste verdient werden oder kam spät.');
        else if(x.p==='Pluto') t.push('<b>Pluto im 4.</b> — Macht spielte eine Rolle, und vieles blieb unausgesprochen. Nicht unbedingt laut, oft eher das Gegenteil.');
        else if(x.p==='Uranus') t.push('<b>Uranus im 4.</b> — etwas war unberechenbar. Verlässlichkeit war nichts, worauf man bauen konnte.');
        else if(x.p==='Neptun') t.push('<b>Neptun im 4.</b> — Grenzen waren unklar, manches wurde beschönigt oder verschwieg sich von selbst.');
        else if(x.p==='Mond') t.push('<b>Mond im 4.</b> — Zuhause und Gefühl fallen bei dir zusammen. Du bist stark mit der Herkunft verbunden, im Guten wie im Schweren.');
        else t.push('<b>'+x.p+' im 4.</b> ('+H.fmt(x.pos)+') färbt die Grundstimmung deines Aufwachsens.');
      });
      return t.join(' ');
    },
    function(f,P,H){
      var ic=(P.MC+180)%360, nah=[];
      Object.keys(P).forEach(function(k){
        if(k==='_jd'||k==='MC'||k==='ASC'||P[k]===undefined) return;
        var d=Math.abs(((P[k]-ic+180)%360+360)%360-180);
        if(d<=4) nah.push(k+' ('+d.toFixed(1)+'°)');
      });
      if(!nah.length) return null;
      return '<b>'+nah.join(', ')+'</b> steht direkt auf deinem IC. Das ist der stärkste Hinweis auf ein Herkunftsthema, '+
        'das bis heute mitläuft — und meistens der Punkt, den man als Letztes bei sich selbst vermutet.';
    }],
  uebung:['Den Satz finden, der nie gesagt wurde',
   'Schreib einen Satz auf, der in deiner Familie allen klar war und nie ausgesprochen wurde. Einer reicht. Ihn hinzuschreiben verändert schon etwas — weil er dann außerhalb von dir existiert.'],
  rueckfrage:'Hast du den Satz gefunden?',
  coach:{fragen:['Was war bei euch allen klar und wurde nie benannt?',
   'Wie war die Stimmung, wenn alle zuhause waren?',
   'Woran hast du als Kind gemerkt, dass etwas nicht stimmt?'],
   vorsicht:'Das ist die Facette, die am schnellsten zu tief geht. Wenn Gewalt, Vernachlässigung oder anhaltende Scham auftauchen: benennen, würdigen, und an eine Therapeutin verweisen. Siehe <a href="grenzen.html">Wann du nicht deutest</a>.'}},

 {id:'naehrend', worum:'Hier geht es darum, ob du bekommen hast, was du gebraucht hast. Merken tust du es daran, wie schwer es dir fällt, heute um etwas zu bitten.', wozuSchutz:'Wer nichts braucht, kann nicht enttäuscht werden.', wozuFrage:'Was wäre das Risiko, wenn du um etwas bittest — und nichts kommt?', name:'Was dich genährt hat',
  frage:'Habe ich bekommen, was ich brauchte?',
  anker:{haeuser:[4], punkte:['Mond','Venus','Ceres']},
  regeln:[
    function(f,P,H){
      if(P.Mond===undefined) return null;
      var hn=H.haus(P.Mond)+1, zi=Math.floor(P.Mond/30);
      return 'Dein <b>Mond in '+H.SIGNS[zi]+', '+hn+'. Haus</b> ('+H.fmt(P.Mond)+') beschreibt zwei Dinge gleichzeitig: '+
        'was du an Fürsorge erlebt hast, und was du heute brauchst, um dich sicher zu fühlen. '+
        'Bei dir läuft beides über <b>'+H.HT[hn-1]+'</b>.';
    },
    function(f,P,H){
      var ms=f.aspekte.filter(function(x){return ((x.a==='Mond'&&x.b==='Saturn')||(x.a==='Saturn'&&x.b==='Mond'));})[0];
      if(!ms) return null;
      return '<b>Mond '+ms.typ+' Saturn</b> mit '+ms.o.toFixed(1)+'°. '+
        (ms.art==='hart'
         ? 'Der wichtigste Aspekt in diesem Raum. Bedürftig zu sein wurde früh als unpassend erlebt — vielleicht, weil kein Platz dafür war, vielleicht, weil jemand anderes mehr brauchte. Du hast gelernt, ohne auszukommen, und hältst das bis heute für Stärke. Es ist eher eine Gewohnheit.'
         : 'Fürsorge und Verlässlichkeit gehörten bei dir zusammen. Das ist eine gute Grundlage — du kannst Nähe aushalten, ohne dich bedroht zu fühlen.');
    },
    function(f,P,H){
      var mn=f.aspekte.filter(function(x){return ((x.a==='Mond'&&x.b==='Neptun')||(x.a==='Neptun'&&x.b==='Mond'));})[0];
      if(!mn) return null;
      return '<b>Mond '+mn.typ+' Neptun</b> mit '+mn.o.toFixed(1)+'°. Die Grenze zwischen deinen Gefühlen und denen anderer '+
        'war früh durchlässig. Du hast womöglich Stimmungen im Haus mitgetragen, die nicht deine waren — und tust es manchmal noch.';
    }],
  uebung:['Einmal versorgt werden',
   'Lass dir diese Woche einmal etwas geben, ohne Gegenleistung und ohne es später auszugleichen. Ein Essen, eine Hilfe, ein Gefallen. Sag danke und mehr nicht. Der Impuls, es zurückzuzahlen, ist die eigentliche Übung.'],
  rueckfrage:'Hast du etwas angenommen, ohne auszugleichen?',
  coach:{fragen:['Wer hat sich um dich gekümmert, als du klein warst?',
   'Was hast du gebraucht und nicht bekommen?',
   'Wen versorgst du heute — und wer versorgt dich?'],
   vorsicht:'Nicht die Eltern bewerten. Es geht um die Erfahrung der Person, nicht um ein Urteil über andere.'}},

 {id:'autoritaet', worum:'Hier geht es um die Stimme, die dich innerlich bewertet. Merken tust du es daran, was du zu dir sagst, wenn dir ein Fehler passiert.', wozuSchutz:'Die alte Stimme zu befolgen ist anstrengend, aber vertraut. Ohne sie fehlt der Maßstab.', wozuFrage:'Woran würdest du dich messen, wenn du diese Stimme nicht mehr befolgst?', name:'Autorität und Anspruch',
  frage:'Wessen Erwartungen trage ich noch mit?',
  anker:{haeuser:[10], punkte:['Saturn','Sonne','Pluto']},
  regeln:[
    function(f,P,H){
      if(P.Saturn===undefined) return null;
      var hn=H.haus(P.Saturn)+1, zi=Math.floor(P.Saturn/30);
      return 'Dein <b>Saturn in '+H.SIGNS[zi]+', '+hn+'. Haus</b> ('+H.fmt(P.Saturn)+') beschreibt die Autoritätsfigur deiner Kindheit — '+
        'und die innere Stimme, die daraus geworden ist. Sie meldet sich bei dir in <b>'+H.HT[hn-1]+'</b>. '+
        'Der Ton ist meistens nicht deiner, auch wenn er sich inzwischen so anfühlt.';
    },
    function(f,P,H){
      var ss=f.aspekte.filter(function(x){return ((x.a==='Sonne'&&x.b==='Saturn')||(x.a==='Saturn'&&x.b==='Sonne'));})[0];
      if(!ss) return null;
      return '<b>Sonne '+ss.typ+' Saturn</b> mit '+ss.o.toFixed(1)+'°. '+
        (ss.art==='hart'
         ? 'Anerkennung war an Bedingungen geknüpft. Du hast früh gelernt, dass du etwas leisten musst, um in Ordnung zu sein — und arbeitest bis heute gegen einen Maßstab, den niemand mehr überprüft.'
         : 'Du hast Struktur als etwas Tragendes erlebt, nicht als Last. Das ist eine seltene und sehr brauchbare Grundlage.');
    },
    function(f,P,H){
      var im10=f.planeten.filter(function(x){return x.haus===10;});
      if(!im10.length) return null;
      return 'Im 10. Haus steht <b>'+im10.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Das beschreibt auch, was von außen an dich herangetragen wurde: welche Rolle für dich vorgesehen war, '+
        'bevor du selbst mitreden konntest.';
    }],
  uebung:['Die Stimme identifizieren',
   'Wenn du dich diese Woche innerlich kritisierst, halt kurz inne und frag: <i>In wessen Stimme höre ich das gerade?</i> Nicht analysieren, nur bemerken. Wenn du eine Person erkennst, verliert der Satz einen Teil seiner Macht.'],
  rueckfrage:'Hast du eine Stimme erkannt?',
  coach:{fragen:['Wofür gab es bei euch Anerkennung?',
   'Was hättest du werden sollen?',
   'Welchen Satz hörst du innerlich, wenn du einen Fehler machst?'],
   vorsicht:'Wenn Autoritätserfahrungen in Richtung Übergriffigkeit gehen, ist das kein Coaching-Thema mehr.'}},

 {id:'unausgesprochen', worum:'Hier geht es um das, was alle wussten und niemand benannt hat. Merken tust du es daran, dass es Themen gibt, bei denen in deiner Familie alle gleichzeitig aufhören zu reden.', wozuSchutz:'Nicht zu fragen bewahrt alle davor, eine Antwort aushalten zu müssen.', wozuFrage:'Was fürchtest du zu hören — und was wäre schlimmer: es zu wissen oder es weiter zu ahnen?', name:'Was nie ausgesprochen wurde',
  frage:'Was läuft bei uns unter der Oberfläche?',
  anker:{haeuser:[8,12], punkte:['Pluto','Neptun']},
  regeln:[
    function(f,P,H){
      if(P.Pluto===undefined) return null;
      var hn=H.haus(P.Pluto)+1;
      var ic=(P.MC+180)%360;
      var dIC=Math.abs(((P.Pluto-ic+180)%360+360)%360-180);
      var t='Dein <b>Pluto im '+hn+'. Haus</b> ('+H.fmt(P.Pluto)+') zeigt, wo bei dir das Ungesagte sitzt: in <b>'+H.HT[hn-1]+'</b>. ';
      if(dIC<=5) t+='<b>Und er steht auf deinem IC</b> ('+dIC.toFixed(1)+'°) — das ist die deutlichste Variante: '+
        'In deiner Herkunft gab es ein Machtthema, über das nicht geredet wurde. Alle wussten es, niemand benannte es.';
      return t;
    },
    function(f,P,H){
      var im12=f.planeten.filter(function(x){return x.haus===12;});
      if(!im12.length) return null;
      return 'Im 12. Haus steht <b>'+im12.map(function(x){return x.p;}).join(', ')+'</b>. Das beschreibt Anteile, '+
        'die du selbst schlecht sehen kannst — oft solche, die in der Familie keinen Platz hatten und deshalb unsichtbar wurden.';
    },
    function(f,P,H){
      var im8=f.planeten.filter(function(x){return x.haus===8;});
      if(!im8.length) return null;
      return 'Im 8. Haus steht <b>'+im8.map(function(x){return x.p;}).join(', ')+'</b>. Geheimnisse, Geld, Abhängigkeit — '+
        'Themen, über die in Familien selten offen gesprochen wird und die trotzdem alles mitbestimmen.';
    }],
  uebung:['Eine Frage stellen, die du nie gestellt hast',
   'Wenn es möglich und sicher ist: Stell diese Woche einer Person aus deiner Familie eine Frage, die du nie gestellt hast. Wenn das nicht geht, schreib sie auf und beantworte sie, so gut du kannst, selbst. Beides bewegt etwas.'],
  rueckfrage:'Hast du die Frage gestellt oder aufgeschrieben?',
  coach:{fragen:['Worüber wurde bei euch nicht gesprochen?',
   'Was hast du als Kind gewusst, ohne dass es dir jemand gesagt hat?',
   'Gibt es in deiner Familie eine Geschichte, die alle kennen und niemand erzählt?'],
   vorsicht:'Familiengeheimnisse können Traumatisches enthalten. Nicht graben, nicht spekulieren, nichts andeuten. Wenn etwas aufbricht, gehört das begleitet.'}},

 {id:'uebernommen', worum:'Hier geht es um Überzeugungen, die sich wie deine anfühlen und es nicht sind. Merken tust du es daran, dass manche Sätze automatisch kommen, ohne dass du sie je geprüft hast.', wozuSchutz:'Geerbte Sätze fühlen sich wie Wahrheit an. Sie zu prüfen hieße, allein zu entscheiden.', wozuFrage:'Wem wärst du untreu, wenn du es anders siehst als deine Familie?', name:'Was du übernommen hast',
  frage:'Welche Muster gehören gar nicht mir?',
  anker:{haeuser:[2,4], punkte:['Saturn','Mond','Knoten']},
  regeln:[
    function(f,P,H){
      var nn=(P.Knoten!==undefined)?P.Knoten:null;
      if(nn===null) return null;
      var sn=(nn+180)%360, hs=H.haus(sn)+1, hn=H.haus(nn)+1;
      return 'Dein <b>Südknoten im '+hs+'. Haus</b> beschreibt das Vertraute — das, was du schon mitbringst und worin du dich '+
        'automatisch einrichtest: <b>'+H.HT[hs-1]+'</b>. Vieles davon ist nicht deine Entscheidung, sondern Erbe. '+
        'Der Nordknoten gegenüber, im '+hn+'. Haus, zeigt die Richtung, in die du dich davon wegbewegst.';
    },
    function(f,P,H){
      if(P.Saturn===undefined||P.Mond===undefined) return null;
      var hs=H.haus(P.Saturn)+1;
      return 'Saturn im '+hs+'. Haus ist die Stelle, an der du dich zusammenreißt. '+
        'Zusammenreißen ist fast immer etwas Erlerntes — es beschreibt, was in deiner Familie als richtig galt, '+
        'nicht was dir entspricht.';
    },
    function(f,P,H){
      var im2=f.planeten.filter(function(x){return x.haus===2;});
      if(!im2.length) return null;
      return 'Im 2. Haus steht <b>'+im2.map(function(x){return x.p;}).join(', ')+'</b>. Was Dinge wert sind, '+
        'lernt man zuhause, bevor man es selbst prüfen kann. Diese Sätze sitzen tief und werden selten hinterfragt.';
    }],
  uebung:['Drei Sätze prüfen',
   'Schreib drei Überzeugungen auf, die du über Geld, Arbeit oder Liebe hast. Frag bei jeder: <i>Habe ich das selbst herausgefunden oder mitbekommen?</i> Was mitgebracht ist, darf bleiben — aber als Wahl, nicht als Wahrheit.'],
  rueckfrage:'Hast du deine drei Sätze geprüft?',
  coach:{fragen:['Welchen Satz über Geld hast du von zuhause?',
   'Was war bei euch selbstverständlich, das du heute merkwürdig findest?',
   'Worin bist du deinen Eltern ähnlich, obwohl du es nicht wolltest?'],
   vorsicht:'Nicht zum Abgrenzen drängen. Manche Muster sind nützlich und dürfen behalten werden.'}},

 {id:'geschwister', worum:'Hier geht es um die Rolle, die du in deiner Familie hattest. Merken tust du es daran, dass du dieselbe Rolle heute bei Freundinnen oder im Team wiederfindest.', wozuSchutz:'Die alte Rolle sichert einen Platz. Ohne sie ist unklar, wo man hingehört.', wozuFrage:'Was wäre dein Platz, wenn du diese Rolle nicht mehr spielst?', name:'Geschwister und Nahbereich',
  frage:'Welche Rolle hatte ich in der Familie?',
  anker:{haeuser:[3], punkte:['Merkur','Mars']},
  regeln:[
    function(f,P,H){
      var im3=f.planeten.filter(function(x){return x.haus===3;});
      if(!im3.length) return 'Dein 3. Haus ist unbesetzt. Geschwister und das nahe Umfeld sind in deinem Chart kein großes Thema — '+
        'die prägenden Erfahrungen liegen woanders.';
      return 'Im 3. Haus — Geschwister, Nachbarschaft, das Nahe — steht <b>'+im3.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Hier entscheidet sich, welche Rolle du in der Konstellation hattest: die Vermittelnde, die Laute, die Unsichtbare.';
    },
    function(f,P,H){
      var h=f.herrscher.filter(function(x){return x.haus===3;})[0];
      if(!h) return null;
      return 'Der Herrscher deines 3. Hauses ist <b>'+h.p+'</b> im '+h.inHaus+'. Haus. '+
        'Deine Art zu sprechen und dich mitzuteilen hängt an <b>'+H.HT[h.inHaus-1]+'</b> — auch heute noch.';
    },
    function(f,P,H){
      if(P.Merkur===undefined) return null;
      var zi=Math.floor(P.Merkur/30);
      return 'Dein <b>Merkur in '+H.SIGNS[zi]+'</b> beschreibt, wie du damals gelernt hast, dich verständlich zu machen. '+
        'Kommunikationsmuster aus der Kindheit sind zäh — man merkt sie am ehesten daran, wie man in Stresssituationen redet.';
    }],
  uebung:['Deine Rolle benennen',
   'Beschreib in drei Wörtern, welche Rolle du in deiner Familie hattest. Die Vernünftige, die Vermittlerin, die Unauffällige. Dann frag dich: <i>Spiele ich die heute noch — bei der Arbeit, bei Freundinnen?</i>'],
  rueckfrage:'Hast du deine Rolle erkannt?',
  coach:{fragen:['Als was galtst du in deiner Familie?',
   'Wer hat bei euch geschlichtet?',
   'Welche Rolle hast du übernommen, weil sie frei war?'],
   vorsicht:'Rollen sind oft mit Loyalität verbunden. Nicht drängen, sie abzulegen — erst einmal reicht, sie zu sehen.'}},

 {id:'daraus', worum:'Hier geht es darum, wie du weitergehst, ohne alles abzulehnen. Merken tust du es daran, was du behalten willst und was nicht.', wozuSchutz:'Alles beim Alten zu lassen ist loyal und verlangt keine Rechtfertigung.', wozuFrage:'Was hättest du zu verlieren, wenn du es bewusst anders machst?', name:'Was du daraus machst',
  frage:'Wie komme ich da weiter, ohne alles abzulehnen?',
  anker:{haeuser:[10,9], punkte:['Knoten','MC','Jupiter']},
  regeln:[
    function(f,P,H){
      var nn=(P.Knoten!==undefined)?P.Knoten:null;
      if(nn===null) return null;
      var hn=H.haus(nn)+1;
      return 'Dein <b>Nordknoten im '+hn+'. Haus</b> zeigt die Richtung: <b>'+H.HT[hn-1]+'</b>. '+
        'Das ist nicht, was du gut kannst — es ist das, was sich ungewohnt anfühlt und trotzdem stimmt. '+
        'Entwicklung heißt hier nicht, die Herkunft abzulehnen, sondern sie zu nutzen und trotzdem woanders hinzugehen.';
    },
    function(f,P,H){
      if(P.MC===undefined) return null;
      var zi=Math.floor(P.MC/30);
      var ic=(P.MC+180)%360, zi2=Math.floor(ic/30);
      return 'Deine <b>MC-IC-Achse steht in '+H.SIGNS[zi]+' und '+H.SIGNS[zi2]+'</b>. '+
        'Das ist die Achse zwischen Herkunft und eigenem Weg. Beide Enden gehören zu dir — '+
        'die Frage ist nicht, welches gewinnt, sondern wie du zwischen ihnen hin und her gehst, ohne eins zu opfern.';
    },
    function(f,P,H){
      if(P.Jupiter===undefined) return null;
      var hn=H.haus(P.Jupiter)+1;
      return 'Dein <b>Jupiter im '+hn+'. Haus</b> ist die Ressource in diesem Raum: In <b>'+H.HT[hn-1]+'</b> '+
        'findest du leichter Zugang zu etwas Eigenem, das nicht aus deiner Herkunft stammt.';
    }],
  uebung:['Eine Sache bewusst anders machen',
   'Wähl eine einzige Sache, die in deiner Familie üblich war, und mach sie diese Woche bewusst anders. Klein reicht — wie man Konflikte anspricht, wie man Geschenke macht, wie man einen Sonntag verbringt. Es geht nicht ums Ablehnen, sondern darum, zu merken, dass es eine Wahl ist.'],
  rueckfrage:'Hast du eine Sache anders gemacht?',
  coach:{fragen:['Was möchtest du aus deiner Familie behalten?',
   'Was hast du bewusst anders gemacht — und hat es funktioniert?',
   'Was würdest du einem Kind weitergeben wollen?'],
   vorsicht:'Nicht zum Bruch raten. Abgrenzung und Kontaktabbruch sind sehr verschiedene Dinge, und Letzteres ist keine Coaching-Empfehlung.'}}

 ]
}; var WOZU={"atmosphaere": ["Nicht hinzusehen hält das Bild der Familie intakt. Zu benennen, wie es war, verändert die Geschichte.", "Was ginge verloren, wenn du aussprichst, wie es wirklich war?"], "naehrend": ["Keine Bedürfnisse zu haben macht unabhängig von Menschen, die sie nicht erfüllt haben.", "Was müsstest du erwarten dürfen, wenn du zugibst, dass du etwas brauchst?"], "autoritaet": ["Dem inneren Maßstab zu folgen ist vertraut und gibt Richtung. Ohne ihn müsstest du selbst entscheiden, was genug ist.", "Wer entscheidet, wann es reicht, wenn nicht diese Stimme?"], "unausgesprochen": ["Schweigen schützt alle Beteiligten. Sprechen bringt Bewegung in etwas, das mühsam stillgestellt wurde.", "Wen würdest du in Schwierigkeiten bringen, wenn du es ansprichst?"], "uebernommen": ["Die geerbten Sätze zu behalten bedeutet Zugehörigkeit. Sie zu prüfen heißt, sich zu unterscheiden.", "Was würde sich zwischen dir und deiner Familie ändern, wenn du anders denkst?"], "geschwister": ["Die alte Rolle weiterzuspielen macht dich berechenbar und gebraucht. Sie abzulegen heißt, deinen Platz neu zu verhandeln.", "Welchen Platz hättest du noch, wenn du diese Rolle nicht mehr ausfüllst?"], "daraus": ["Zwischen Herkunft und eigenem Weg zu schwanken vermeidet die Entscheidung. Beides halb zu leben tut niemandem weh.", "Wem gegenüber müsstest du dich erklären, wenn du dich klar entscheidest?"]};

    return {RAUM:RAUM, WOZU:(typeof WOZU!=='undefined')?WOZU:{}}; })()
};

/* ── Körper · Themenraum · Astro-Charlie ─────────────────────────────── */
R_RAEUME['koerper'] = {
  adler: true,
  zeitschiene: false,
  titel: "Körper · Themenraum · Astro-Charlie",
  h1: "Körper.",
  frage: "&bdquo;Was braucht mein Körper eigentlich von mir?&ldquo;",
  intro: "Der Körper kommt in Readings selten vor, und wenn, dann falsch. Dieser Raum macht keine Gesundheitsaussagen — er schaut sich an, wie du körperlich da bist, welche Bewegung zu dir passt, wo sich Anspannung sammelt, was dich schlafen lässt, ob du dir etwas gönnst und wie gut du deine eigenen Signale hörst.",
  weiter: "<div class=\"weiter\"><a href=\"raeume.html\"><span class=\"lbl\">&larr; Zur&uuml;ck</span><span class=\"ttl\">Alle R&auml;ume</span></a><a href=\"raum-alltag.html\" class=\"nx\"><span class=\"lbl\">Passt dazu &rarr;</span><span class=\"ttl\">Alltag</span></a></div>",
  fuss: "Themenraum Körper &middot; Gewichtung aus deinem Chart, im Browser gerechnet. Selbstarbeit und Coaching &mdash; keine Therapie.",
  def: (function(){ var RAUM = {
 name:'Körper',
 slug:'koerper',
 sortierTitel:'Wo dein Körperthema sitzt',
 facetten:[
 {id:'praesenz', worum:'Hier geht es darum, ob du in deinem Körper anwesend bist oder hauptsächlich im Kopf. Merken tust du es daran, wann du zuletzt bewusst gespürt hast, wie du sitzt.', wozuSchutz:'Im Kopf zu sein schützt davor, zu spüren, was der Körper meldet.', wozuFrage:'Was würdest du merken, wenn du ganz in dir wärst?', name:'Wie du im Körper bist',
  frage:'Bin ich eigentlich anwesend in mir?',
  anker:{haeuser:[1], punkte:['ASC','Mars','Mond']},
  regeln:[
    function(f,P,H){
      var zi=Math.floor(P.ASC/30);
      var el=['Feuer','Erde','Luft','Wasser'][zi%4];
      return 'Dein <b>Aszendent in '+H.SIGNS[zi]+'</b> ('+H.fmt(P.ASC)+') beschreibt, wie du dich bewegst und wie du wirkst, '+
        'bevor du etwas sagst. Als '+el+'zeichen heißt das: '+
        (el==='Feuer'?'schnell, direkt, raumgreifend. Du bist da, bevor du dich entschieden hast, da zu sein.':
         el==='Erde'?'ruhig, geerdet, körperlich präsent. Menschen empfinden dich als verlässlich anwesend.':
         el==='Luft'?'beweglich, wach, oft mehr im Kopf als im Körper. Präsenz ist bei dir eher geistig als leiblich.':
         'durchlässig, stimmungsabhängig, fein. Du spürst Räume, bevor du sie betrittst.');
    },
    function(f,P,H){
      var im1=f.planeten.filter(function(x){return x.haus===1;});
      if(!im1.length) return null;
      return 'Im 1. Haus — deinem Körperhaus — steht <b>'+im1.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Was dort steht, zeigt sich körperlich: in Haltung, Tempo, Ausdruck. Verbergen funktioniert hier schlecht.';
    },
    function(f,P,H){
      var h1=f.herrscher.filter(function(x){return x.haus===1;})[0];
      if(!h1) return null;
      return 'Dein <b>Chart-Herrscher '+h1.p+'</b> steht im '+h1.inHaus+'. Haus. Dein Körpergefühl hängt also an '+
        '<b>'+H.HT[h1.inHaus-1]+'</b> — wenn es dort nicht stimmt, fühlst du dich auch körperlich nicht wohl, '+
        'ohne dass etwas fehlt.';
    }],
  uebung:['Dreimal am Tag hinspüren',
   'Halt diese Woche dreimal täglich kurz inne und frag: <i>Wo bin ich gerade in meinem Körper?</i> Keine Bewertung, keine Übung, kein Atmen — nur hinspüren. Zehn Sekunden reichen. Bei vielen Menschen ist das die erste Rückmeldung seit Jahren.'],
  rueckfrage:'Hast du dreimal täglich hingespürt?',
  coach:{fragen:['Wann fühlst du dich körperlich am wohlsten?',
   'Wo in deinem Körper bist du selten?',
   'Was macht dein Körper, wenn du dich unwohl fühlst?'],
   vorsicht:'Körperwahrnehmung kann bei belastenden Erfahrungen überfordern. Wenn jemand dabei unruhig wird, abbrechen und nicht vertiefen.'}},

 {id:'energie', worum:'Hier geht es darum, welche Bewegung zu dir passt. Merken tust du es daran, welche Sportart du angefangen und wieder aufgegeben hast — und warum.', wozuSchutz:'Sich nicht zu bewegen erspart die Erfahrung, dass es anstrengend ist.', wozuFrage:'Wovor schützt dich das Nichtstun — und was wäre unangenehm am Anfangen?', name:'Deine Energie und Bewegung',
  frage:'Welche Art von Bewegung tut mir gut?',
  anker:{haeuser:[1,6], punkte:['Mars','Sonne','Jupiter']},
  regeln:[
    function(f,P,H){
      if(P.Mars===undefined) return null;
      var zi=Math.floor(P.Mars/30), hn=H.haus(P.Mars)+1;
      var el=['Feuer','Erde','Luft','Wasser'][zi%4];
      var mod=['kardinal','fix','veränderlich'][zi%3];
      return 'Dein <b>Mars in '+H.SIGNS[zi]+', '+hn+'. Haus</b> ('+H.fmt(P.Mars)+') ist dein Bewegungsmuster. '+
        (el==='Feuer'?'Kurz und intensiv — Intervalle, Sprints, alles mit Tempo. Lange gleichmäßige Einheiten langweilen dich.':
         el==='Erde'?'Ausdauernd und wiederholend — Kraft, Wandern, alles, wo man etwas spürt und aufbaut.':
         el==='Luft'?'Abwechslungsreich und sozial — Kurse, Sportarten mit Technik, Bewegung mit anderen.':
         'Fließend und weich — Schwimmen, Yoga, Tanzen. Harte Programme fühlen sich für dich fremd an.')+
        ' Und '+mod+': '+
        (mod==='fix'?'einmal drin, bleibst du dabei. Der Anfang ist das Problem, nicht das Durchhalten.':
         mod==='kardinal'?'du startest begeistert und brichst ab. Plan Neuanfänge ein statt Durchhaltevermögen.':
         'du brauchst Wechsel. Dieselbe Sache zwölf Wochen lang wird bei dir nichts.');
    },
    function(f,P,H){
      var ms=f.aspekte.filter(function(x){return ((x.a==='Mars'&&x.b==='Saturn')||(x.a==='Saturn'&&x.b==='Mars'))&&x.art==='hart';})[0];
      if(!ms) return null;
      return '<b>Mars '+ms.typ+' Saturn</b> mit '+ms.o.toFixed(1)+'°. Deine Energie ist nicht geringer als bei anderen — '+
        'ein Teil davon geht nur ins Bremsen. Bei Bewegung heißt das: Aufwärmen dauert bei dir länger, '+
        'und der Einstieg ist die eigentliche Hürde, nicht die Anstrengung.';
    },
    function(f,P,H){
      if(P.Jupiter===undefined) return null;
      var hn=H.haus(P.Jupiter)+1;
      return 'Dein <b>Jupiter im '+hn+'. Haus</b> — dort fällt dir Bewegung leicht, im übertragenen wie im wörtlichen Sinn. '+
        'Wenn du Sport mit '+H.HT[hn-1]+' verbindest, brauchst du keine Disziplin.';
    }],
  uebung:['Eine Bewegungsart testen, die zu dir passt',
   'Probier diese Woche einmal die Bewegungsart aus, die oben steht — auch wenn du sie bisher für nichts hieltest. Zwanzig Minuten reichen. Viele Menschen halten sich für unsportlich, weil sie die falsche Sportart probiert haben.'],
  rueckfrage:'Hast du es ausprobiert?',
  coach:{fragen:['Welche Bewegung hat dir als Kind Spaß gemacht?',
   'Was hast du zuletzt aufgegeben und warum?',
   'Bewegst du dich für dein Aussehen oder für dein Gefühl?'],
   vorsicht:'Keine Trainingspläne, keine Zahlen, keine Ziele. Wenn Gewicht oder Kontrolle ins Spiel kommen, ist das kein Coaching-Thema mehr.'}},

 {id:'stress', worum:'Hier geht es darum, wo sich Anspannung bei dir sammelt. Merken tust du es an der Körperstelle, die sich als Erstes meldet.', wozuSchutz:'Anspannung zu halten hält dich funktionsfähig.', wozuFrage:'Was würde nicht mehr funktionieren, wenn du loslässt?', name:'Wo Anspannung sich zeigt',
  frage:'Warum meldet sich mein Körper immer an derselben Stelle?',
  anker:{haeuser:[6,12], punkte:['Saturn','Mond','Mars','Chiron']},
  regeln:[
    function(f,P,H){
      if(P.Saturn===undefined) return null;
      var zi=Math.floor(P.Saturn/30), hn=H.haus(P.Saturn)+1;
      var ZONE=['Kopf und Kiefer','Nacken und Hals','Schultern, Arme, Atem','Brustkorb und Magen',
       'Rücken und Herzgegend','Verdauung und Bauch','Unterer Rücken und Nieren','Becken und Beckenboden',
       'Hüften und Oberschenkel','Knie, Gelenke, Haut','Unterschenkel und Kreislauf','Füße und Lymphe'];
      return 'Dein <b>Saturn in '+H.SIGNS[zi]+'</b> zeigt, wo du dich zusammenziehst. '+
        'In der klassischen Zuordnung entspricht '+H.SIGNS[zi]+' der Zone <b>'+ZONE[zi]+'</b>. '+
        'Das ist keine medizinische Aussage — aber viele Menschen erkennen darin genau die Stelle, '+
        'an der sich bei ihnen Anspannung sammelt.';
    },
    function(f,P,H){
      if(P.Mond===undefined) return null;
      var hn=H.haus(P.Mond)+1;
      return 'Dein <b>Mond im '+hn+'. Haus</b> ist dein Frühwarnsystem: Wenn in <b>'+H.HT[hn-1]+'</b> etwas nicht stimmt, '+
        'meldet sich das körperlich, bevor du es denkst. Der Körper ist bei dir schneller als der Kopf — '+
        'das ist eine Ressource, wenn du ihm zuhörst.';
    },
    function(f,P,H){
      var im6=f.planeten.filter(function(x){return x.haus===6;});
      if(!im6.length) return null;
      return 'Im 6. Haus steht <b>'+im6.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Belastung sammelt sich bei dir im Alltag an, nicht in großen Ereignissen — '+
        'in vielen kleinen Momenten, in denen du dich zusammennimmst.';
    }],
  uebung:['Die Stelle einmal am Tag prüfen',
   'Prüf diese Woche einmal täglich die Stelle, die oben genannt ist — oder die, die du selbst kennst. Nur hinspüren und einmal bewusst lockerlassen. Kein Programm. Der Punkt ist das Bemerken, nicht das Lösen.'],
  rueckfrage:'Hast du deine Stelle täglich geprüft?',
  coach:{fragen:['Wo sitzt bei dir Stress körperlich?',
   'Seit wann kennst du das?',
   'Was hat schon mal geholfen?'],
   vorsicht:'<b>Wichtig:</b> Körperzonen im Chart sind eine alte Zuordnung, keine Medizin. Ein Chart kann nichts diagnostizieren und keine Beschwerde erklären. Bei anhaltenden Symptomen gehört das zur Ärztin — immer, ohne Ausnahme.'}},

 {id:'schlaf', worum:'Hier geht es darum, warum du abends nicht runterkommst. Merken tust du es daran, was du tust, statt ins Bett zu gehen.', wozuSchutz:'Wachzubleiben verlängert den Tag, über den du selbst bestimmst.', wozuFrage:'Was holst du dir nachts, das dir tagsüber fehlt?', name:'Schlaf und Zur-Ruhe-Kommen',
  frage:'Warum komme ich abends nicht runter?',
  anker:{haeuser:[4,12], punkte:['Mond','Neptun','Merkur','Uranus']},
  regeln:[
    function(f,P,H){
      if(P.Mond===undefined) return null;
      var zi=Math.floor(P.Mond/30), hn=H.haus(P.Mond)+1;
      return 'Dein <b>Mond in '+H.SIGNS[zi]+', '+hn+'. Haus</b> bestimmt, was du zum Abschalten brauchst: '+
        '<b>'+H.HT[hn-1]+'</b> muss halbwegs in Ordnung sein, sonst findest du keine Ruhe. '+
        'Das ist der Grund, warum allgemeine Schlaftipps bei dir manchmal nicht greifen — sie setzen woanders an.';
    },
    function(f,P,H){
      var mu=f.aspekte.filter(function(x){return (x.a==='Mond'||x.b==='Mond')&&(x.a==='Uranus'||x.b==='Uranus');})[0];
      if(!mu) return null;
      return '<b>Mond '+mu.typ+' Uranus</b> mit '+mu.o.toFixed(1)+'°. Dein Nervensystem fährt spät herunter, '+
        'und es fährt sprunghaft hoch. Regelmäßige Zeiten helfen dir mehr als jedes Ritual — nicht weil du Disziplin brauchst, '+
        'sondern weil Vorhersehbarkeit dein System beruhigt.';
    },
    function(f,P,H){
      var mm=f.aspekte.filter(function(x){return (x.a==='Mond'||x.b==='Mond')&&(x.a==='Merkur'||x.b==='Merkur');})[0];
      if(!mm) return null;
      return '<b>Mond '+mm.typ+' Merkur</b> mit '+mm.o.toFixed(1)+'°. Bei dir hängt Abschalten am Denken. '+
        'Wenn etwas unsortiert ist, läuft es nachts weiter. Aufschreiben hilft dir mehr als Entspannungsübungen — '+
        'nicht als Technik, sondern weil es den Kopf entlastet.';
    },
    function(f,P,H){
      var im12=f.planeten.filter(function(x){return x.haus===12;});
      if(!im12.length) return null;
      return 'Im 12. Haus steht <b>'+im12.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Vieles arbeitet bei dir unbewusst weiter. Der Übergang in die Nacht braucht bei dir mehr Zeit als bei anderen — '+
        'nicht zehn Minuten, eher eine Stunde.';
    }],
  uebung:['Eine feste Uhrzeit, nicht ein Ritual',
   'Steh diese Woche jeden Tag zur selben Zeit auf — auch am Wochenende, auch nach schlechten Nächten. Die Aufstehzeit stabilisiert den Rhythmus zuverlässiger als jede Abendroutine. Das ist die am besten belegte Schlafmaßnahme überhaupt.'],
  rueckfrage:'Bist du eine Woche zur selben Zeit aufgestanden?',
  coach:{fragen:['Was geht dir abends durch den Kopf?',
   'Wie lange brauchst du vom Hinlegen bis zum Einschlafen?',
   'Was war in Phasen, in denen du gut geschlafen hast, anders?'],
   vorsicht:'Anhaltende Schlafstörungen sind medizinisch, nicht astrologisch. Nach ein paar Wochen gehört das abgeklärt.'}},

 {id:'genuss', worum:'Hier geht es darum, ob du dir etwas gönnst, ohne es dir zu verdienen. Merken tust du es daran, ob dir spontan etwas einfällt, das du zuletzt ohne Anlass getan hast.', wozuSchutz:'Sich nichts zu gönnen hält die Rechnung sauber — man schuldet niemandem etwas.', wozuFrage:'Was müsstest du dir zugestehen, wenn du dir ohne Anlass etwas gönnst?', name:'Genuss und Versorgung',
  frage:'Gönne ich mir eigentlich etwas?',
  anker:{haeuser:[2,5], punkte:['Venus','Jupiter','Mond']},
  regeln:[
    function(f,P,H){
      if(P.Venus===undefined) return null;
      var hn=H.haus(P.Venus)+1, zi=Math.floor(P.Venus/30);
      return 'Deine <b>Venus in '+H.SIGNS[zi]+', '+hn+'. Haus</b> beschreibt, worüber du genießt: über <b>'+H.HT[hn-1]+'</b>. '+
        'Genuss, der woanders stattfindet, erreicht dich nicht wirklich — auch wenn er allgemein als schön gilt.';
    },
    function(f,P,H){
      var vs=f.aspekte.filter(function(x){return ((x.a==='Venus'&&x.b==='Saturn')||(x.a==='Saturn'&&x.b==='Venus'))&&x.art==='hart';})[0];
      if(!vs) return null;
      return '<b>Venus '+vs.typ+' Saturn</b> mit '+vs.o.toFixed(1)+'°. Genuss ist bei dir mit Verdienen verknüpft. '+
        'Du gönnst dir etwas, wenn du geliefert hast — und deshalb selten und nie ganz. '+
        'Das ist die Stelle, an der Selbstfürsorge bei dir scheitert, nicht am Zeitmangel.';
    },
    function(f,P,H){
      var im2=f.planeten.filter(function(x){return x.haus===2;});
      if(!im2.length) return null;
      return 'Im 2. Haus steht <b>'+im2.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Was dir zusteht und was du dir nimmst, ist bei dir ein eigenes Thema — siehe auch der Raum '+
        '<a href="raum-selbstwert.html">Selbstwert</a>.';
    }],
  uebung:['Etwas Kleines ohne Anlass',
   'Gönn dir diese Woche eine Kleinigkeit ohne Grund und ohne dass du vorher etwas geleistet hast. Der Preis ist egal, der fehlende Anlass ist der Punkt. Wenn sich das falsch anfühlt, hast du die richtige Übung gefunden.'],
  rueckfrage:'Hast du dir etwas ohne Anlass gegönnt?',
  coach:{fragen:['Wann hast du dir zuletzt etwas gegönnt — und wofür war es die Belohnung?',
   'Was tut dir gut und machst du trotzdem nicht?',
   'Wer hat dir beigebracht, dass man sich etwas verdienen muss?'],
   vorsicht:'Bei Themen rund um Essen, Gewicht oder Kontrolle: nicht weiterarbeiten, sondern verweisen.'}},

 {id:'hoeren', worum:'Hier geht es darum, ob du merkst, was dein Körper will. Merken tust du es daran, wie oft du erst reagierst, wenn es schon wehtut.', wozuSchutz:'Signale zu überhören erlaubt, weiterzumachen wie geplant.', wozuFrage:'Was müsstest du absagen, wenn du auf deinen Körper hörst?', name:'Auf den Körper hören',
  frage:'Woher weiß ich, was mein Körper braucht?',
  anker:{haeuser:[6,12], punkte:['Mond','Neptun','Chiron']},
  regeln:[
    function(f,P,H){
      if(P.Neptun===undefined) return null;
      var hn=H.haus(P.Neptun)+1;
      return 'Dein <b>Neptun im '+hn+'. Haus</b> beschreibt, wo deine Wahrnehmung unscharf wird — in <b>'+H.HT[hn-1]+'</b>. '+
        'Dort überhörst du Signale am ehesten, weil sie sich nicht klar anfühlen, sondern diffus. '+
        'Genau deshalb hilft dir Konkretes: aufschreiben, messen, benennen.';
    },
    function(f,P,H){
      if(P.Chiron===undefined||P.Chiron===null) return null;
      var hn=H.haus(P.Chiron)+1;
      if(hn!==1&&hn!==6&&hn!==12) return null;
      return '<b>Chiron im '+hn+'. Haus</b> — der wunde Punkt liegt bei dir nah am Körperthema. '+
        'Oft heißt das: Es gab früh eine Erfahrung, in der dein Körper nicht in Ordnung war oder nicht gehört wurde. '+
        'Deshalb fällt das Hinhören bis heute schwerer als anderen.';
    },
    function(f,P,H){
      if(P.Mond===undefined) return null;
      var zi=Math.floor(P.Mond/30);
      var el=['Feuer','Erde','Luft','Wasser'][zi%4];
      return 'Dein Mond in einem <b>'+el+'zeichen</b>: '+
        (el==='Erde'?'Du hast einen guten Draht zum Körper — das ist eine Ressource, auf die du dich verlassen kannst.':
         el==='Wasser'?'Du spürst viel, kannst es aber schwer zuordnen. Zwischen Gefühl und Körpersignal zu unterscheiden ist bei dir die eigentliche Arbeit.':
         el==='Luft'?'Du bist eher im Kopf. Körpersignale erreichen dich spät und meistens erst, wenn sie laut werden.':
         'Du merkst erst, wenn es brennt. Dazwischen fühlt sich alles machbar an.');
    }],
  uebung:['Eine Woche zwei Zahlen',
   'Notier diese Woche jeden Abend zwei Zahlen von eins bis zehn: körperlich und stimmungsmäßig. Nur zwei Zahlen, kein Text. Nach sieben Tagen siehst du, ob die beiden zusammenhängen — und das beantwortet mehr Fragen als jedes Tagebuch.'],
  rueckfrage:'Hast du eine Woche Zahlen gesammelt?',
  coach:{fragen:['Woran merkst du, dass dein Körper etwas will?',
   'Wann hast du zuletzt ein Signal überhört?',
   'Was tust du, wenn du müde bist — wirklich?'],
   vorsicht:'Körpersignale sind keine Diagnosen. Ein Chart ersetzt keine Untersuchung, und bei Beschwerden gehört immer die Ärztin gefragt.'}}

 ]
}; var WOZU={"praesenz": ["Nicht ganz im Körper zu sein hält Unangenehmes auf Abstand. Was man nicht spürt, muss man nicht regeln.", "Was würdest du bemerken, wenn du wirklich anwesend bist?"], "energie": ["Unpassenden Sport durchzuhalten wirkt diszipliniert. Zuzugeben, dass eine Bewegungsart nicht zu dir passt, klingt nach Ausrede.", "Was müsstest du loslassen, wenn du dir erlaubst, es anders zu machen als vorgeschrieben?"], "stress": ["Die Anspannung zu ignorieren hält dich funktionsfähig. Sie ernst zu nehmen würde Konsequenzen verlangen.", "Was müsstest du ändern, wenn du dieses Signal jedes Mal ernst nimmst?"], "schlaf": ["Spät wach zu bleiben ist oft die einzige Zeit, die wirklich dir gehört. Früher ins Bett hieße, darauf zu verzichten.", "Was holst du dir abends, das tagsüber fehlt?"], "genuss": ["Sich nichts zu gönnen hält den eigenen Anspruch aufrecht und schützt vor dem Gefühl, es nicht verdient zu haben.", "Was müsstest du über dich glauben, damit dir etwas einfach so zusteht?"], "hoeren": ["Signale zu überhören erlaubt weiterzumachen. Sie zu bemerken hieße, den Plan zu ändern.", "Was würdest du absagen müssen, wenn du deinem Körper glaubst?"]};

    return {RAUM:RAUM, WOZU:(typeof WOZU!=='undefined')?WOZU:{}}; })()
};

/* ── Nähe · Themenraum · Astro-Charlie ─────────────────────────────── */
R_RAEUME['naehe'] = {
  adler: true,
  zeitschiene: false,
  titel: "Nähe · Themenraum · Astro-Charlie",
  h1: "Nähe.",
  frage: "„Warum wiederholt sich das immer?\"",
  intro: "Dating, Beziehung, Liebe — die Frage dahinter ist meistens dieselbe: Warum läuft es wieder so wie beim letzten Mal? Nähe ist im Chart kein einzelner Punkt, sondern sieben Fäden: was dich anzieht, was du im Gegenüber suchst, wie viel Nähe du aushältst, wie du streitest, was du begehrst, was sich wiederholt und was dich bleiben lässt. Bei den meisten Menschen ist einer davon deutlich lauter als die anderen — und genau der erklärt das Muster.",
  weiter: "<div class=\"weiter\"><a href=\"raeume.html\"><span class=\"lbl\">&larr; Zur&uuml;ck</span><span class=\"ttl\">Alle R&auml;ume</span></a><a href=\"raum-sicherheit.html\" class=\"nx\"><span class=\"lbl\">Passt dazu &rarr;</span><span class=\"ttl\">Sicherheit &amp; Fallenlassen</span></a></div>",
  fuss: "Themenraum Nähe &middot; Gewichtung aus deinem Chart, im Browser gerechnet. Selbstarbeit und Coaching &mdash; keine Therapie.",
  def: (function(){ var RAUM = {
 name:'Nähe',
 slug:'naehe',
 sortierTitel:'Wo deine Beziehungsfrage tatsächlich sitzt',
 facetten:[
 {id:'anziehung', worum:'Hier geht es darum, welche Art Mensch dich anzieht — und ob dir das guttut. Merken tust du es daran, was die letzten drei gemeinsam hatten.', wozuSchutz:'Menschen zu wählen, die nicht ganz verfügbar sind, hält das Risiko klein.', wozuFrage:'Wovor schützt dich die Unerreichbarkeit der anderen?', name:'Was dich anzieht',
  frage:'Warum immer wieder dieser Typ Mensch?',
  anker:{haeuser:[5], punkte:['Venus','Mars']},
  regeln:[
    function(f,P,H){
      if(P.Venus===undefined) return null;
      var hn=H.haus(P.Venus)+1, zi=Math.floor(P.Venus/30);
      return 'Deine <b>Venus in '+H.SIGNS[zi]+', '+hn+'. Haus</b> ('+H.fmt(P.Venus)+') beschreibt, wie du magst — '+
        'nicht wen. Zuneigung zeigt sich bei dir über <b>'+H.HT[hn-1]+'</b>. Dort machst du auf, dort merkst du, ob jemand ankommt.';
    },
    function(f,P,H){
      if(P.Mars===undefined) return null;
      var hn=H.haus(P.Mars)+1, zi=Math.floor(P.Mars/30);
      return 'Dein <b>Mars in '+H.SIGNS[zi]+', '+hn+'. Haus</b> sagt, was dich reizt und wie du auf jemanden zugehst. '+
        'Venus mag, Mars will — und die beiden ziehen nicht immer in dieselbe Richtung. '+
        'Genau dort entsteht das Muster, dass man sich zu Menschen hingezogen fühlt, die einem nicht guttun.';
    },
    function(f,P,H){
      var vm=f.aspekte.filter(function(x){return (x.a==='Venus'&&x.b==='Mars')||(x.a==='Mars'&&x.b==='Venus');})[0];
      if(!vm) return 'Venus und Mars bilden bei dir keinen Aspekt. Zuneigung und Begehren laufen getrennt — '+
        'das kann heißen, dass du Menschen magst, die du nicht willst, und willst, die du nicht magst. Beides aufzulösen ist Arbeit, kein Defekt.';
      return '<b>Venus '+vm.typ+' Mars</b> mit '+vm.o.toFixed(1)+'°. '+
        (vm.art==='weich'
         ? 'Mögen und Wollen gehören bei dir zusammen. Das ist seltener, als man denkt — du verliebst dich nicht gegen dich selbst.'
         : 'Mögen und Wollen reiben. Anziehung und Spannung hängen bei dir zusammen: Was ruhig ist, fühlt sich schnell nach nichts an.');
    },
    function(f,P,H){
      var im5=f.planeten.filter(function(x){return x.haus===5;});
      if(!im5.length) return null;
      return 'Im 5. Haus — Verliebtsein, Spiel, Romantik — steht <b>'+im5.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Das färbt die frühe Phase: wie du flirtest, wie schnell es geht, wie viel Show dabei ist.';
    }],
  uebung:['Die Liste der letzten Drei',
   'Schreib die letzten drei Menschen auf, in die du verliebt warst. Dann daneben: <i>Was hatten die gemeinsam?</i> Nicht Aussehen — Verhalten. Wie erreichbar waren sie? Wer hat mehr gewollt? Das Muster steht meistens nach drei Zeilen da.'],
  rueckfrage:'Hast du das Muster gefunden?',
  coach:{fragen:['Was zieht dich an, von dem du weißt, dass es dir nicht guttut?',
   'Wann fühlt sich etwas für dich spannend an — und wann langweilig?',
   'Was hatten die letzten drei gemeinsam?'],
   vorsicht:'Nicht bewerten, welcher Typ Mensch gut oder schlecht ist. Es geht darum, dass die Person ihr Muster sieht, nicht dass sie deins übernimmt.'}},

 {id:'gegenueber', worum:'Hier geht es darum, was du von einer Beziehung eigentlich erwartest. Merken tust du es daran, ob du drei Dinge nennen kannst, die für dich nicht verhandelbar sind.', wozuSchutz:'Ohne klare Bedingungen muss man nichts einfordern und wird nicht abgelehnt.', wozuFrage:'Was hättest du zu verlieren, wenn du sagst, was du brauchst?', name:'Was du im Gegenüber suchst',
  frage:'Was erwarte ich eigentlich von einer Beziehung?',
  anker:{haeuser:[7], punkte:['Saturn','Uranus','Juno']},
  regeln:[
    function(f,P,H){
      var dc=(P.ASC+180)%360, zi=Math.floor(dc/30), hp=H.HERR[zi];
      var hin=(P[hp]!==undefined)?(H.haus(P[hp])+1):null;
      var t='Dein <b>Deszendent steht in '+H.SIGNS[zi]+'</b> ('+H.fmt(dc)+'). Das beschreibt, was du im Gegenüber suchst — '+
        'oft genau das, was du dir selbst nicht zutraust. ';
      if(hin) t+='Der Herrscher <b>'+hp+'</b> steht im '+hin+'. Haus: <b>Beziehung läuft bei dir über '+H.HT[hin-1]+'</b>. '+
        'Dort entscheidet sich, ob es trägt.';
      return t;
    },
    function(f,P,H){
      var im7=f.planeten.filter(function(x){return x.haus===7;});
      if(!im7.length) return 'Dein 7. Haus ist unbesetzt. Partnerschaft ist bei dir kein Dauerthema im Hintergrund — '+
        'was heißt: Du bist in Beziehungen weniger getrieben als andere, aber auch weniger geübt darin, sie zum Thema zu machen.';
      return 'Im 7. Haus steht <b>'+im7.map(function(x){return x.p+' ('+H.fmt(x.pos)+')';}).join(', ')+'</b>. '+
        'Diese Funktionen erlebst du zuerst über andere — sie tauchen im Partner auf, bevor du sie bei dir findest.';
    },
    function(f,P,H){
      var s7=f.planeten.filter(function(x){return x.haus===7&&(x.p==='Saturn'||x.p==='Uranus'||x.p==='Pluto');});
      if(!s7.length) return null;
      var t=[];
      s7.forEach(function(x){
        if(x.p==='Saturn') t.push('<b>Saturn im 7.</b> — Beziehung fühlt sich nach Verantwortung an, manchmal nach Last. Du gehst spät rein und dann ganz.');
        if(x.p==='Uranus') t.push('<b>Uranus im 7.</b> — du brauchst Freiraum in der Nähe. Enge löst bei dir Fluchtimpulse aus, auch wo du bleiben willst.');
        if(x.p==='Pluto') t.push('<b>Pluto im 7.</b> — Beziehungen gehen bei dir tief oder gar nicht. Machtfragen gehören dazu, ob du willst oder nicht.');
      });
      return t.join(' ');
    }],
  uebung:['Drei Bedingungen aufschreiben',
   'Schreib drei Dinge auf, die für dich nicht verhandelbar sind. Nicht Wünsche — Bedingungen. Wenn du keine drei zusammenbekommst, ist das die Information: Du weißt noch nicht, was du brauchst, und verhandelst deshalb alles.'],
  rueckfrage:'Hast du deine drei Bedingungen?',
  coach:{fragen:['Was suchst du bei anderen, das du dir selbst nicht erlaubst?',
   'Was ist für dich nicht verhandelbar — und wann hast du es zuletzt trotzdem verhandelt?',
   'Was war in deiner letzten Beziehung gut? Nicht schlecht — gut.'],
   vorsicht:'Nicht zur Anforderungsliste machen. Bedingungen sind etwas anderes als Wunschzettel.'}},

 {id:'naehe', worum:'Hier geht es darum, wie viel Nähe du aushältst, bevor es eng wird. Merken tust du es an dem Moment, in dem etwas gut läuft und du plötzlich Abstand brauchst.', wozuSchutz:'Abstand zu halten verhindert, dass dich jemand wirklich enttäuschen kann.', wozuFrage:'Was genau wird eng, kurz bevor du dich zurückziehst — und was schützt der Rückzug?', name:'Wie viel Nähe du zulässt',
  frage:'Warum wird es eng, wenn es gut wird?',
  anker:{haeuser:[4,8], punkte:['Mond','Saturn','Uranus']},
  regeln:[
    function(f,P,H){
      if(P.Mond===undefined) return null;
      var hn=H.haus(P.Mond)+1, zi=Math.floor(P.Mond/30);
      return 'Dein <b>Mond in '+H.SIGNS[zi]+', '+hn+'. Haus</b> ('+H.fmt(P.Mond)+') ist dein Nähe-Thermostat. '+
        'Du fühlst dich sicher, wenn <b>'+H.HT[hn-1]+'</b> stimmt — und unsicher, sobald es dort wackelt. '+
        'Das hat mit dem Menschen gegenüber oft weniger zu tun, als es sich anfühlt.';
    },
    function(f,P,H){
      var ms=f.aspekte.filter(function(x){return ((x.a==='Mond'&&x.b==='Saturn')||(x.a==='Saturn'&&x.b==='Mond'));})[0];
      if(!ms) return null;
      return '<b>Mond '+ms.typ+' Saturn</b> mit '+ms.o.toFixed(1)+'°. '+
        (ms.art==='hart'
         ? 'Bedürftig zu sein empfindest du als Schwäche. Du sorgst lieber, als versorgt zu werden — und wunderst dich dann, dass niemand merkt, was du brauchst. Das ist der häufigste Grund, warum Nähe einseitig wird.'
         : 'Du kannst Gefühl und Verlässlichkeit verbinden. Nähe fühlt sich bei dir nicht bedrohlich an, sondern tragfähig.');
    },
    function(f,P,H){
      var mu=f.aspekte.filter(function(x){return ((x.a==='Mond'&&x.b==='Uranus')||(x.a==='Uranus'&&x.b==='Mond'));})[0];
      if(!mu) return null;
      return '<b>Mond '+mu.typ+' Uranus</b> mit '+mu.o.toFixed(1)+'°. Sobald es eng wird, gehst du auf Abstand — '+
        'auch bei Menschen, die dir wichtig sind. Das ist kein Desinteresse, sondern ein Schutzreflex. '+
        'Die nützliche Frage ist nicht „warum gehe ich", sondern „was genau wird eng, kurz bevor ich gehe".';
    },
    function(f,P,H){
      var im8=f.planeten.filter(function(x){return x.haus===8;});
      if(!im8.length) return null;
      return 'Im 8. Haus — echte Intimität, Abhängigkeit, das Ungesagte — steht <b>'+im8.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Du gehst mit Menschen in Bereiche, die andere meiden. Das ist eine Fähigkeit und eine Anfälligkeit zugleich.';
    }],
  uebung:['Einen Satz sagen, statt ihn zu erklären',
   'Sag diese Woche einer Person einmal, was du brauchst — in einem Satz, ohne Vorbau und ohne Begründung. „Ich brauche, dass du dich meldest." Punkt. Der Reflex, danach etwas hinterherzuschieben, ist die eigentliche Übung.'],
  rueckfrage:'Hast du gesagt, was du brauchst?',
  coach:{fragen:['Was passiert in dir, kurz bevor du dich zurückziehst?',
   'Wann hast du zuletzt um etwas gebeten?',
   'Woran merkst du, dass dir jemand zu nah kommt — körperlich, nicht gedanklich?'],
   vorsicht:'Rückzug kann Muster sein oder Selbstschutz nach echten Verletzungen. Diese beiden nicht verwechseln — und wenn Gewalt oder Angst im Spiel waren, gehört das begleitet.'}},

 {id:'streit', worum:'Hier geht es darum, was du tust, wenn es kracht. Merken tust du es daran, ob du hinterher den Inhalt bereust oder den Ton.', wozuSchutz:'Wer scharf wird, muss nicht zeigen, dass er verletzt ist.', wozuFrage:'Was wäre sichtbar, wenn du im Streit statt Ärger die Verletzung zeigst?', name:'Wie du streitest',
  frage:'Warum eskaliert es immer an derselben Stelle?',
  anker:{haeuser:[3,7], punkte:['Mars','Merkur']},
  regeln:[
    function(f,P,H){
      if(P.Merkur===undefined||P.Mars===undefined) return null;
      var hm=H.haus(P.Merkur)+1, ha=H.haus(P.Mars)+1;
      return 'Dein <b>Merkur im '+hm+'. Haus</b> und dein <b>Mars im '+ha+'. Haus</b>. '+
        'Merkur ist, wie du formulierst; Mars, wie du dich wehrst. Im Streit übernimmt fast immer der Mars — '+
        'und der arbeitet bei dir über <b>'+H.HT[ha-1]+'</b>.';
    },
    function(f,P,H){
      var mm=f.aspekte.filter(function(x){return ((x.a==='Merkur'&&x.b==='Mars')||(x.a==='Mars'&&x.b==='Merkur'));})[0];
      if(!mm) return null;
      return '<b>Merkur '+mm.typ+' Mars</b> mit '+mm.o.toFixed(1)+'°. '+
        (mm.art==='hart'
         ? 'Deine Worte werden scharf, bevor du es merkst. Du kannst streiten besser als klären — und bereust hinterher die Formulierung, nicht den Inhalt.'
         : 'Du kannst deutlich werden, ohne verletzend zu sein. Das ist im Konflikt ein echter Vorteil.');
    },
    function(f,P,H){
      var mo=f.aspekte.filter(function(x){return (x.a==='Mond'||x.b==='Mond')&&x.art==='hart'&&x.o<4;})[0];
      if(!mo) return null;
      var and=(mo.a==='Mond')?mo.b:mo.a;
      return '<b>Mond '+mo.typ+' '+and+'</b> mit '+mo.o.toFixed(1)+'°. Unter dem Ärger sitzt bei dir fast immer '+
        'etwas Verletztes. Die Frage im Streit lautet deshalb nicht „wer hat recht", sondern „was war eigentlich der Stich".';
    }],
  uebung:['Zwanzig Minuten warten',
   'Wenn dir diese Woche etwas hochkommt: schreib die Nachricht, aber schick sie nicht. Zwanzig Minuten warten, dann noch mal lesen. Meistens ändert sich nicht der Inhalt, sondern der Ton — und der entscheidet, ob es ein Gespräch wird oder ein Streit.'],
  rueckfrage:'Hast du einmal zwanzig Minuten gewartet?',
  coach:{fragen:['Woran merkst du, dass du gleich scharf wirst?',
   'Was war beim letzten Streit die eigentliche Verletzung?',
   'Streitest du, um recht zu haben oder um verstanden zu werden?'],
   vorsicht:'Streitmuster sind ein Coaching-Thema. Abwertung, Kontrolle oder Angst vor dem Partner sind es nicht.'}},

 {id:'begehren', worum:'Hier geht es darum, ob du zeigen kannst, dass du jemanden willst. Merken tust du es daran, wie oft du wartest, bis der andere anfängt.', wozuSchutz:'Nicht zuerst zu wollen bewahrt davor, nicht gewollt zu werden.', wozuFrage:'Was hättest du zu verlieren, wenn du jemandem zeigst, dass du ihn willst?', name:'Begehren und Körper',
  frage:'Darf ich wollen, was ich will?',
  anker:{haeuser:[8,5], punkte:['Mars','Venus','Lilith','Pluto']},
  regeln:[
    function(f,P,H){
      if(P.Lilith===undefined) return null;
      var hn=H.haus(P.Lilith)+1;
      return 'Deine <b>Lilith im '+hn+'. Haus</b> zeigt, was du dir nicht erlaubst — bei dir in <b>'+H.HT[hn-1]+'</b>. '+
        'In der Nähe ist das die Stelle, an der du dich zurücknimmst, obwohl du mehr willst. '+
        'Mehr dazu unter <a href="lilith-arbeit.html">Lilith-Arbeit</a>.';
    },
    function(f,P,H){
      if(P.Mars===undefined) return null;
      var zi=Math.floor(P.Mars/30);
      return 'Dein <b>Mars in '+H.SIGNS[zi]+'</b> beschreibt, wie du begehrst: '+
        'in welchem Tempo, mit wie viel Direktheit, wie viel Initiative du übernimmst. '+
        'Das passt nicht immer zu dem, was du für angemessen hältst — und genau diese Lücke ist das Thema dieser Facette.';
    },
    function(f,P,H){
      var vp=f.aspekte.filter(function(x){return ((x.a==='Venus'||x.b==='Venus')&&(x.a==='Pluto'||x.b==='Pluto'));})[0];
      if(!vp) return null;
      return '<b>Venus '+vp.typ+' Pluto</b> mit '+vp.o.toFixed(1)+'°. Deine Zuneigung geht in die Tiefe — '+
        'Oberflächliches interessiert dich nicht. Die Kehrseite: Besitz, Eifersucht und Verlustangst liegen dicht darunter.';
    }],
  uebung:['Einmal zuerst wollen',
   'Sag oder zeig diese Woche einmal, dass du jemanden willst — bevor du weißt, ob es erwidert wird. Klein reicht: eine Einladung, ein Satz, eine Berührung. Das Unangenehme daran ist nicht die Reaktion, sondern das Warten davor.'],
  rueckfrage:'Hast du zuerst gewollt?',
  coach:{fragen:['Was hältst du bei dir zurück, weil es zu viel sein könnte?',
   'Wann fühlst du dich begehrenswert — und hängt das von jemand anderem ab?',
   'Wofür schämst du dich, das vermutlich völlig normal ist?'],
   vorsicht:'Sexualität nur so weit ansprechen, wie die Person es öffnet. Nie nachfragen, nie ausdeuten. Bei Scham oder Erfahrungen von Übergriffen: sofort Grenze ziehen und verweisen.'}},

 {id:'wiederholung', worum:'Hier geht es um das Muster, das sich über verschiedene Menschen hinweg wiederholt. Merken tust du es daran, dass es meistens nach derselben Zeit oder an derselben Stelle kippt.', wozuSchutz:'Ein bekanntes Muster ist unangenehm, aber vorhersehbar. Neues wäre unberechenbar.', wozuFrage:'Was ist an der Wiederholung vertraut — und was wäre ungewiss, wenn es anders liefe?', name:'Was sich wiederholt',
  frage:'Warum endet es immer gleich?',
  anker:{haeuser:[7,12], punkte:['Saturn','Pluto','Chiron','Neptun']},
  regeln:[
    function(f,P,H){
      var schwer=[];
      ['Saturn','Pluto','Chiron','Neptun'].forEach(function(k){
        if(P[k]===undefined) return;
        var hn=H.haus(P[k])+1;
        if(hn===7||hn===5||hn===8) schwer.push({p:k,h:hn});
      });
      if(!schwer.length) return null;
      return '<b>'+schwer.map(function(x){return x.p+' im '+x.h+'. Haus';}).join(', ')+'</b> — '+
        'die langsamen Planeten stehen bei dir in Beziehungshäusern. Das beschreibt Themen, die sich über Jahre wiederholen, '+
        'nicht weil du etwas falsch machst, sondern weil sie zur Anlage gehören. Sie verändern sich durch Bewusstheit, nicht durch andere Partner.';
    },
    function(f,P,H){
      var hart=f.aspekte.filter(function(x){return x.art==='hart'&&x.o<3;}).slice(0,2);
      if(!hart.length) return null;
      return 'Die engsten Spannungen in diesem Bereich: <b>'+
        hart.map(function(x){return x.a+' '+x.typ+' '+x.b+' ('+x.o.toFixed(1)+'°)';}).join('</b> und <b>')+'</b>. '+
        'Solche Achsen lösen sich nicht auf — man lernt, beide Seiten abwechselnd zu bedienen statt eine zu gewinnen.';
    },
    function(f,P,H){
      if(P.Chiron===undefined) return null;
      var hn=H.haus(P.Chiron)+1;
      return 'Dein <b>Chiron im '+hn+'. Haus</b> ('+H.fmt(P.Chiron)+') markiert die Stelle, an der es zuverlässig wehtut — '+
        'in <b>'+H.HT[hn-1]+'</b>. In Beziehungen ist das der Punkt, an dem dich Kleinigkeiten härter treffen, als sie sollten.';
    }],
  uebung:['Den Abbruchpunkt benennen',
   'Denk an die letzten zwei Beziehungen oder Dates, die geendet haben. Schreib auf, <i>wann</i> es gekippt ist — nach welchem Ereignis, nach wie vielen Wochen. Wenn beide Male derselbe Punkt auftaucht, hast du dein Muster gefunden.'],
  rueckfrage:'Hast du deinen Abbruchpunkt gefunden?',
  coach:{fragen:['An welcher Stelle kippt es bei dir regelmäßig?',
   'Was sagst du dir selbst, wenn es zu Ende geht?',
   'Was wäre anders, wenn du an genau dieser Stelle einmal bleibst?'],
   vorsicht:'Wiederholung kann Muster sein oder Folge schlechter Erfahrungen. Nicht als Selbstverschulden framen — und wenn wiederholt Übergriffigkeit vorkam, ist das kein Muster der Person, sondern etwas, das begleitet gehört.'}},

 {id:'bleiben', worum:'Hier geht es darum, was aus Verliebtsein etwas Dauerhaftes macht. Merken tust du es daran, wie sich ein ganz normaler Dienstagabend mit dieser Person anfühlt.', wozuSchutz:'Wer nicht ganz bleibt, kann nicht ganz verlassen werden.', wozuFrage:'Was würdest du aufgeben, wenn du dich wirklich entscheidest?', name:'Was du brauchst, um zu bleiben',
  frage:'Was macht, dass es hält?',
  anker:{haeuser:[4,2], punkte:['Mond','Venus','Saturn','Juno']},
  regeln:[
    function(f,P,H){
      if(P.Juno!==undefined){
        var hn=H.haus(P.Juno)+1;
        return 'Deine <b>Juno im '+hn+'. Haus</b> beschreibt, worüber Verbindlichkeit bei dir entsteht: <b>'+H.HT[hn-1]+'</b>. '+
          'Nicht Verliebtsein — das Bleiben.';
      }
      return null;
    },
    function(f,P,H){
      var h=f.herrscher.filter(function(x){return x.haus===4;})[0];
      if(!h) return null;
      return 'Der Herrscher deines 4. Hauses ist <b>'+h.p+'</b> im '+h.inHaus+'. Haus. '+
        'Zuhause-Gefühl entsteht bei dir über <b>'+H.HT[h.inHaus-1]+'</b> — auch in einer Beziehung. '+
        'Wenn das fehlt, hilft alle Zuneigung nichts.';
    },
    function(f,P,H){
      if(P.Venus===undefined||P.Saturn===undefined) return null;
      var vs=f.aspekte.filter(function(x){return ((x.a==='Venus'&&x.b==='Saturn')||(x.a==='Saturn'&&x.b==='Venus'));})[0];
      if(!vs) return 'Venus und Saturn bilden bei dir keinen Aspekt — Verbindlichkeit ist bei dir weniger schwer besetzt als bei vielen. '+
        'Das macht es leichter, kann aber auch heißen, dass du Beständigkeit unterschätzt.';
      return '<b>Venus '+vs.typ+' Saturn</b> mit '+vs.o.toFixed(1)+'°. '+
        (vs.art==='hart'
         ? 'Du glaubst, Liebe verdienen zu müssen. Zuneigung ohne Gegenleistung macht dich misstrauisch — und du bleibst manchmal aus Pflichtgefühl, wo du längst gehen wolltest.'
         : 'Was du gibst, gilt. Deine Zuneigung ist verlässlich, und du hältst aus, was andere aufgeben.');
    }],
  uebung:['Das Dienstags-Kriterium',
   'Frag dich bei einem Menschen, der dir wichtig ist, nicht „liebe ich sie oder ihn". Frag: <i>Wie fühlt sich ein ganz normaler Dienstagabend mit dieser Person an?</i> Verliebtheit sagt wenig über das Bleiben. Dienstage sagen alles.'],
  rueckfrage:'Hast du dir den Dienstag vorgestellt?',
  coach:{fragen:['Woran merkst du, dass du irgendwo bleiben willst?',
   'Was war in deiner Familie das Zeichen für Verlässlichkeit?',
   'Was brauchst du, um dich sicher zu fühlen, ohne dich einzuengen?'],
   vorsicht:'Bleiben ist kein Wert an sich. Manche bleiben zu lange — das darf im Gespräch genauso vorkommen wie die Angst vor Bindung.'}}

 ]
}; var WOZU={"anziehung": ["Dasselbe Muster ist vertraut, und Vertrautes fühlt sich sicherer an als etwas Unbekanntes — selbst wenn es wehtut.", "Was wäre unheimlich an jemandem, der dir von Anfang an guttut?"], "gegenueber": ["Keine Bedingungen zu stellen hält dich in jeder Situation anschlussfähig. Bedingungen könnten jemanden vertreiben.", "Wen könntest du verlieren, wenn du sagst, was du wirklich brauchst?"], "naehe": ["Abstand zu halten schützt vor Enttäuschung. Was man nicht ganz reinlässt, kann einen nicht ganz treffen.", "Was müsstest du riskieren, wenn du jemanden wirklich nah heranlässt?"], "streit": ["Scharf zu werden beendet das Unangenehme schnell. Ruhig zu bleiben hieße, länger im Konflikt zu stehen.", "Was müsstest du aushalten, wenn du beim nächsten Mal nicht zurückschießt?"], "begehren": ["Nicht zuerst zu wollen schützt vor Zurückweisung. Wer nicht fragt, bekommt kein Nein.", "Was würde es mit dir machen, einmal zuerst gewollt zu haben — und nicht erwidert zu werden?"], "wiederholung": ["Das bekannte Ende ist berechenbar. Ein anderer Verlauf wäre neu, und neu heißt ungeschützt.", "Was wüsstest du nicht mehr, wenn es diesmal anders ausgeht?"], "bleiben": ["Nicht ganz anzukommen hält die Tür offen. Wer nie ganz da ist, muss nie ganz gehen.", "Was gibst du auf, wenn du dich entscheidest zu bleiben?"]};

    return {RAUM:RAUM, WOZU:(typeof WOZU!=='undefined')?WOZU:{}}; })()
};

/* ── Selbstwert · Themenraum · Astro-Charlie ─────────────────────────────── */
R_RAEUME['selbstwert'] = {
  adler: true,
  zeitschiene: false,
  titel: "Selbstwert · Themenraum · Astro-Charlie",
  h1: "Selbstwert.",
  frage: "„Warum nehme ich eigentlich zu wenig?\"",
  intro: "Die meisten kommen mit dieser Frage — und merken dann, dass es nicht ums Geld geht. Selbstwert sitzt an sieben Stellen gleichzeitig: im Körper, in der Leistung, in Grenzen, im Raum den man einnimmt, in dem was man teilt, und in Sätzen, die aus der Herkunft stammen. Der Preis ist nur die Stelle, an der es zuerst auffällt.",
  weiter: "<div class=\"weiter\"><a href=\"raeume.html\"><span class=\"lbl\">&larr; Zur&uuml;ck</span><span class=\"ttl\">Alle R&auml;ume</span></a><a href=\"lilith-arbeit.html\" class=\"nx\"><span class=\"lbl\">Passt dazu &rarr;</span><span class=\"ttl\">Die Lilith-Arbeit</span></a></div>",
  fuss: "Themenraum Selbstwert &middot; Gewichtung aus deinem Chart, im Browser gerechnet. Ein Chart beschreibt Muster und M&ouml;glichkeiten &mdash; es sagt nicht, wer du bist.",
  def: (function(){ var RAUM = {
 name:'Selbstwert',
 slug:'selbstwert',
 sortierTitel:'Wo dein Selbstwert tatsächlich sitzt',
 facetten:[

 {id:'geld', worum:'Hier geht es darum, ob du dir zutraust, für deine Arbeit oder deine Zeit einen Preis zu nennen — und ihn stehen zu lassen. Merken tust du es daran, dass du beim Aussprechen einer Zahl schon innerlich zurückruderst.', wozuSchutz:'Wenn du zu wenig verlangst, kann dich niemand für zu teuer halten und niemand kann ablehnen.', wozuFrage:'Was würdest du riskieren, wenn du deinen echten Preis nennst — und wovor bewahrt dich der niedrige?', name:'Geld und Preise',
  frage:'Was bin ich wert, in Zahlen ausgedrückt?',
  anker:{haeuser:[2], punkte:['Venus','Saturn','Jupiter']},
  regeln:[
    function(f,P,H){
      var im2=f.planeten.filter(function(x){return x.haus===2;});
      if(!im2.length) return null;
      return 'In deinem 2. Haus steht <b>'+im2.map(function(x){return x.p+' auf '+H.fmt(x.pos);}).join(', ')+
        '</b>. Das ist das Haus des eigenen Werts — nicht des Geldes an sich, sondern dessen, was du für dich beanspruchst.';
    },
    function(f,P,H){
      var h=f.herrscher.filter(function(x){return x.haus===2;})[0];
      if(!h) return null;
      return 'Dein 2. Haus steht in '+h.zeichen+', beherrscht von <b>'+h.p+'</b> — und dein '+h.p+
        ' steht im <b>'+h.inHaus+'. Haus</b>. Deine Wertfrage läuft also über <b>'+H.HT[h.inHaus-1]+'</b>. '+
        'Praktisch: Solange es dort nicht stimmt, hilft es wenig, an den Zahlen zu drehen.';
    },
    function(f,P,H){
      var sv=f.aspekte.filter(function(x){return (x.a==='Saturn'&&x.b==='Venus')||(x.a==='Venus'&&x.b==='Saturn');})[0];
      if(!sv) return null;
      return '<b>Venus '+sv.typ+' Saturn</b> mit '+sv.o.toFixed(1)+'°. Das ist die klassische Signatur für „Liebe und Wert müssen verdient werden". '+
        'Du glaubst nicht, dass dir etwas zusteht — du glaubst, dass du es dir erarbeiten musst.';
    },
    function(f,P,H){
      if(f.leer.indexOf(2)<0) return null;
      return 'Dein 2. Haus ist unbesetzt. Das heißt nicht „kein Thema" — es heißt, dass die Frage über den Herrscher läuft statt direkt. '+
        'Der Wertknoten sitzt bei dir woanders.';
    },
    function(f,P,H){
      if(P.Venus===undefined) return null;
      var hn=H.haus(P.Venus)+1;
      return 'Deine <b>Venus im '+hn+'. Haus</b> ('+H.fmt(P.Venus)+') sagt, worüber du Wert überhaupt empfindest: über <b>'+
        H.HT[hn-1]+'</b>. Anerkennung, die von dort kommt, zählt für dich; alles andere rauscht durch.';
    }],
  uebung:['Einen Preis aussprechen, ohne ihn zu begründen',
   'Diese Woche einmal eine Zahl nennen — für deine Arbeit, für eine Stunde, für irgendetwas — und dann den Mund halten. Keine Erklärung, keine Relativierung, kein „aber wir können auch reden". Nur die Zahl und Stille. Es wird sich falsch anfühlen. Das ist der Punkt.'],
  rueckfrage:'Hast du diese Woche eine Zahl genannt und stehen lassen?',
  coach:{fragen:['Was müsstest du geleistet haben, damit dir der Preis zusteht?',
   'Wer hat dir beigebracht, was Dinge wert sind?',
   'Was würdest du verlangen, wenn niemand es erfahren würde?'],
   vorsicht:'Nicht in Preisberatung kippen. Die Frage ist nicht, was marktüblich ist — die Frage ist, was die Person sich erlaubt.'}},

 {id:'koerper', worum:'Hier geht es darum, ob du dich zeigen magst, wie du aussiehst. Merken tust du es an dem Aufwand, den du treibst, bevor du das Haus verlässt — und daran, wie du dich fühlst, wenn er mal wegfällt.', wozuSchutz:'Solange du dich verhüllst, wirst du nicht danach beurteilt.', wozuFrage:'Wovor schützt dich die Schicht, die du jeden Morgen aufträgst?', name:'Körper und Erscheinung',
  frage:'Darf ich so aussehen, wie ich aussehe?',
  anker:{haeuser:[1], punkte:['Venus','Mars','ASC']},
  regeln:[
    function(f,P,H){
      var im1=f.planeten.filter(function(x){return x.haus===1;});
      if(!im1.length) return null;
      return 'Im 1. Haus — deinem Erscheinungshaus — steht <b>'+im1.map(function(x){return x.p;}).join(', ')+
        '</b>. Was dort steht, sehen Menschen zuerst, bevor du etwas sagst. Du kannst es nicht verbergen, und der Versuch kostet Kraft.';
    },
    function(f,P,H){
      var h=f.herrscher.filter(function(x){return x.haus===1;})[0];
      if(!h) return null;
      return 'Dein Aszendent steht in '+h.zeichen+', der Herrscher <b>'+h.p+'</b> im '+h.inHaus+'. Haus. '+
        'Wie du wirkst, hängt bei dir also an <b>'+H.HT[h.inHaus-1]+'</b> — dort entscheidet sich, ob du dich zeigen magst.';
    },
    function(f,P,H){
      var a=f.achsnah.filter(function(x){return x.zu==='Aszendent';});
      if(!a.length) return null;
      return '<b>'+a.map(function(x){return x.p;}).join(', ')+'</b> liegt fast auf deinem Aszendentengrad. '+
        'Solche Punkte prägen die äußere Wirkung überproportional — Menschen reagieren darauf, bevor sie dich kennen.';
    }],
  uebung:['Einmal ungeschminkt sichtbar sein',
   'Geh diese Woche einmal so unter Menschen, wie du morgens aussiehst — ohne die Schicht, die du sonst dazwischenlegst. Das kann Kleidung sein, Make-up, Haltung oder Tonfall. Beobachte, was tatsächlich passiert, statt was du befürchtest.'],
  rueckfrage:'Hast du dich diese Woche einmal ungefiltert gezeigt?',
  coach:{fragen:['Wofür wurdest du als Kind angeschaut — und wie?',
   'Was verbirgst du, das niemand bemerkt?',
   'Wann hast du dich zuletzt im Spiegel angesehen, ohne zu bewerten?'],
   vorsicht:'Körperbild ist heikel. Wenn Essen, Gewicht oder Kontrolle auftauchen, ist das kein Coaching-Thema mehr.'}},

 {id:'leistung', worum:'Hier geht es um die Frage, ob du auch ohne Leistung in Ordnung bist. Merken tust du es daran, dass du nach einem freien Tag ein schlechtes Gewissen hast.', wozuSchutz:'Wer immer mehr leistet, muss sich nie fragen, ob er auch ohne Leistung genügt.', wozuFrage:'Was müsstest du dir eingestehen, wenn du aufhörst, dich zu beweisen?', name:'Leistung und Genügen',
  frage:'Muss ich es mir erst verdienen?',
  anker:{haeuser:[10,6], punkte:['Saturn','Chiron','Sonne']},
  regeln:[
    function(f,P,H){
      if(P.Saturn===undefined) return null;
      var hn=H.haus(P.Saturn)+1;
      var t='<b>Saturn steht in deinem '+hn+'. Haus</b>, auf '+H.fmt(P.Saturn)+' — in <b>'+H.HT[hn-1]+'</b>. '+
        'Dort sitzt die Stelle, an der du dich beweisen zu müssen glaubst. Saturn nimmt nichts geschenkt: '+
        'Er verlangt, dass etwas erarbeitet wird, und merkt schlecht, wann es genug ist.';
      if(hn===10||hn===6) t+=' Bei dir steht er direkt im Leistungsbereich — das ist die deutlichste Variante.';
      else t+=' Bei dir liegt er nicht im klassischen Leistungshaus. Der Beweisdruck zeigt sich also nicht bei der Arbeit selbst, sondern in '+H.HT[hn-1]+'.';
      return t;
    },
    function(f,P,H){
      if(P.Sonne===undefined) return null;
      var hn=H.haus(P.Sonne)+1;
      var sn=f.aspekte.filter(function(x){return (x.a==='Sonne'||x.b==='Sonne')&&x.o<3;})[0];
      if(!sn) return null;
      var ander=(sn.a==='Sonne')?sn.b:sn.a;
      return '<b>Sonne '+sn.typ+' '+ander+'</b> mit '+sn.o.toFixed(1)+'°. Deine Identität hängt eng an '+ander+
        ' — was dort passiert, betrifft direkt dein Gefühl, zu genügen.';
    },
    function(f,P,H){
      var sa=f.aspekte.filter(function(x){return (x.a==='Saturn'||x.b==='Saturn')&&x.art==='hart'&&x.o<4;})[0];
      if(!sa) return null;
      var ander=(sa.a==='Saturn')?sa.b:sa.a;
      return '<b>Saturn '+sa.typ+' '+ander+'</b> mit '+sa.o.toFixed(1)+'°. Der strenge innere Ton trifft genau auf '+ander+
        ' — dort hörst du am lautesten, dass es noch nicht reicht. Der Satz stammt nicht von dir, auch wenn er sich so anfühlt.';
    },
    function(f,P,H){
      var h=f.herrscher.filter(function(x){return x.haus===10;})[0];
      if(!h) return null;
      return 'Dein 10. Haus wird von <b>'+h.p+'</b> beherrscht, der im '+h.inHaus+'. Haus steht. '+
        'Anerkennung kommt bei dir also über <b>'+H.HT[h.inHaus-1]+'</b> — nicht über mehr Arbeit.';
    }],
  uebung:['Etwas unfertig abgeben',
   'Gib diese Woche eine Sache ab, die du für nicht ganz fertig hältst. Eine Mail ohne dritte Überarbeitung, ein Entwurf mit einer offenen Stelle. Schau dir an, was zurückkommt — meistens nichts von dem, was du erwartet hast.'],
  rueckfrage:'Hast du etwas abgegeben, bevor es perfekt war?',
  coach:{fragen:['Wann war es zuletzt genug — und woran hast du das gemerkt?',
   'Wessen Stimme sagt dir, dass es nicht reicht?',
   'Was würde passieren, wenn du 80 Prozent gibst?'],
   vorsicht:'Nicht in Produktivitätsberatung abbiegen. Es geht nicht um bessere Methoden, sondern darum, wann jemand aufhören darf.'}},

 {id:'grenzen', worum:'Hier geht es darum, ob du Nein sagen kannst, ohne eine Erklärung hinterherzuschieben. Merken tust du es an dem Moment, in dem du zusagst und es im selben Atemzug bereust.', wozuSchutz:'Wer nie Nein sagt, wird nicht abgelehnt — und muss keinen Konflikt aushalten.', wozuFrage:'Was hättest du zu verlieren, wenn jemand sauer auf dich wäre?', name:'Grenzen und Nein sagen',
  frage:'Darf ich Nein sagen, ohne mich zu rechtfertigen?',
  anker:{haeuser:[1,7], punkte:['Mars','Saturn']},
  regeln:[
    function(f,P,H){
      var m=P.Mars;
      if(m===undefined) return null;
      var hn=H.haus(m)+1;
      return 'Dein <b>Mars steht im '+hn+'. Haus</b> ('+H.fmt(m)+'). Mars ist dein Grenzmuskel — dort setzt du dich durch, '+
        'und dort vermeidest du es auch. Bei dir spielt sich das in <b>'+H.HT[hn-1]+'</b> ab.';
    },
    function(f,P,H){
      var ms=f.aspekte.filter(function(x){return ((x.a==='Mars'&&x.b==='Saturn')||(x.a==='Saturn'&&x.b==='Mars'));})[0];
      if(!ms) return null;
      return '<b>Mars '+ms.typ+' Saturn</b> mit '+ms.o.toFixed(1)+'°. Gas und Bremse gleichzeitig. '+
        'Du willst etwas abwehren und hältst dich im selben Moment zurück — das ermüdet mehr als jeder Konflikt, den du geführt hättest.';
    },
    function(f,P,H){
      var im7=f.planeten.filter(function(x){return x.haus===7;});
      if(!im7.length) return null;
      return 'Im 7. Haus steht <b>'+im7.map(function(x){return x.p;}).join(', ')+'</b>. Deine Grenzfrage entscheidet sich im Gegenüber — '+
        'du merkst erst an anderen, wo deine Linie liegt.';
    },
    function(f,P,H){
      var h=f.herrscher.filter(function(x){return x.haus===7;})[0];
      if(!h) return null;
      return 'Der Herrscher deines 7. Hauses ist <b>'+h.p+'</b> im '+h.inHaus+'. Haus. Wenn es eng wird in einer Beziehung, '+
        'landet die Frage bei dir in <b>'+H.HT[h.inHaus-1]+'</b> — dort suchst du die Lösung, auch wenn sie woanders liegt.';
    }],
  uebung:['Ein Nein ohne Begründung',
   'Sag diese Woche einmal Nein, ohne einen Grund anzuhängen. Kein „weil ich gerade", kein Vorschlag als Ersatz. Nur: „Nein, das mache ich nicht." Zähl innerlich bis drei, bevor du etwas hinterherschiebst.'],
  rueckfrage:'Hast du ein Nein ohne Begründung stehen lassen?',
  coach:{fragen:['Was befürchtest du, das passiert, wenn du Nein sagst?',
   'Wann hast du zuletzt Ja gesagt und es bereut?',
   'Bei wem fällt es dir am schwersten — und warum ausgerechnet dort?'],
   vorsicht:'Wenn jemand grundsätzlich keine Grenzen setzen kann und dabei Angst auftaucht, gehört das begleitet, nicht trainiert.'}},

 {id:'raum', worum:'Hier geht es darum, wie viel Platz du dir nimmst — im Gespräch, im Raum, im eigenen Leben. Merken tust du es daran, dass du deine eigenen Erfolge kleinredest, bevor es jemand anderes tun kann.', wozuSchutz:'Wer klein bleibt, wird nicht beneidet und fällt nicht.', wozuFrage:'Wovor schützt dich das Kleinerwerden — und wer hätte etwas davon, wenn du groß wirst?', name:'Raum einnehmen',
  frage:'Darf ich groß sein und gesehen werden?',
  anker:{haeuser:[5,1], punkte:['Sonne','Lilith','Jupiter']},
  regeln:[
    function(f,P,H){
      if(P.Sonne===undefined) return null;
      var hn=H.haus(P.Sonne)+1;
      return 'Deine <b>Sonne steht im '+hn+'. Haus</b> ('+H.fmt(P.Sonne)+'). Dort willst du sichtbar sein — '+
        'in <b>'+H.HT[hn-1]+'</b>. Wenn du dich dort kleiner machst, fehlt dir Energie, nicht nur Anerkennung.';
    },
    function(f,P,H){
      if(P.Lilith===undefined) return null;
      var hn=H.haus(P.Lilith)+1;
      return 'Deine <b>Lilith im '+hn+'. Haus</b> zeigt, was du dir nicht erlaubst — bei dir in <b>'+H.HT[hn-1]+'</b>. '+
        'Genau dort liegt auch deine meiste ungenutzte Kraft. Siehe <a href="lilith-arbeit.html">Lilith-Arbeit</a>.';
    },
    function(f,P,H){
      var im5=f.planeten.filter(function(x){return x.haus===5;});
      if(!im5.length) return 'Dein 5. Haus ist unbesetzt. Selbstausdruck ist bei dir kein automatischer Antrieb — du musst dich aktiv dafür entscheiden.';
      return 'Im 5. Haus steht <b>'+im5.map(function(x){return x.p;}).join(', ')+'</b> — dort kommt dein Eigenes am leichtesten heraus.';
    }],
  uebung:['Eine Sache zeigen, die nicht fertig ist',
   'Zeig diese Woche jemandem etwas Eigenes — einen Text, eine Idee, eine Zeichnung, einen Plan — ohne den Satz „ist noch nichts Richtiges". Die Einleitung wegzulassen ist die eigentliche Übung.'],
  rueckfrage:'Hast du etwas Eigenes gezeigt, ohne es kleinzureden?',
  coach:{fragen:['Wofür bist du als Kind kritisiert worden, das eigentlich eine Stärke war?',
   'Was tust du nur, wenn niemand zusieht?',
   'Wann hast du dich zuletzt groß gefühlt — und was kam danach?'],
   vorsicht:'Nicht zum Auftritt drängen. Manche brauchen erst einen sicheren Ort, bevor sie einen sichtbaren wollen.'}},

 {id:'geteilt', worum:'Hier geht es um Geld und Abhängigkeit zwischen Menschen — was dir gehört, was geteilt wird, was offen ist. Merken tust du es daran, welche Zahl du seit Monaten nicht anschaust.', wozuSchutz:'Solange du nicht hinschaust, musst du nichts entscheiden.', wozuFrage:'Was würde sich ändern müssen, wenn du die Zahlen kennst?', name:'Geteiltes und Abhängigkeit',
  frage:'Was ist meins, was gehört dem anderen?',
  anker:{haeuser:[8], punkte:['Pluto','Venus','Saturn']},
  regeln:[
    function(f,P,H){
      var im8=f.planeten.filter(function(x){return x.haus===8;});
      if(!im8.length) return null;
      return 'Im 8. Haus — geteiltes Geld, Abhängigkeit, Macht in Beziehungen — steht <b>'+
        im8.map(function(x){return x.p;}).join(', ')+'</b>. Themen, über die man nicht spricht, laufen bei dir über diesen Bereich.';
    },
    function(f,P,H){
      var h=f.herrscher.filter(function(x){return x.haus===8;})[0];
      if(!h) return null;
      return 'Der Herrscher deines 8. Hauses ist <b>'+h.p+'</b> im '+h.inHaus+'. Haus. Wenn es um Geteiltes geht, '+
        'landet die Frage bei dir in <b>'+H.HT[h.inHaus-1]+'</b>.';
    },
    function(f,P,H){
      if(P.Pluto===undefined) return null;
      var hn=H.haus(P.Pluto)+1;
      return 'Dein <b>Pluto steht im '+hn+'. Haus</b> ('+H.fmt(P.Pluto)+'). Machtfragen — wer gibt nach, wer hält fest — '+
        'spielen sich bei dir in <b>'+H.HT[hn-1]+'</b> ab.';
    },
    function(f,P,H){
      if(f.leer.indexOf(8)<0) return null;
      return 'Dein 8. Haus ist unbesetzt — Abhängigkeit und Geteiltes sind bei dir kein Dauerthema. '+
        'Wenn es akut wird, dann anlassbezogen, nicht als Muster.';
    }],
  uebung:['Eine offene Zahl anschauen',
   'Schau dir diese Woche eine Zahl an, die du vermeidest: ein Kontostand, eine Schuld, eine offene Rechnung, ein Betrag, den dir jemand schuldet. Nur hinschauen und aufschreiben. Nichts entscheiden.'],
  rueckfrage:'Hast du hingeschaut, wo du sonst wegschaust?',
  coach:{fragen:['Wem schuldest du etwas, das nie ausgesprochen wurde?',
   'Was hast du aufgegeben, um eine Beziehung zu behalten?',
   'Wo hängst du finanziell an jemandem — und wie fühlt sich das an?'],
   vorsicht:'Hier tauchen häufig Abhängigkeitsverhältnisse auf. Wenn Kontrolle oder Angst im Spiel sind, ist das keine Coaching-Frage mehr.'}},

 {id:'herkunft', worum:'Hier geht es um die Sätze über Wert und Geld, die du mitbekommen hast, bevor du sie prüfen konntest. Merken tust du es daran, dass manche Überzeugungen sich wie Tatsachen anfühlen, obwohl sie von jemand anderem stammen.', wozuSchutz:'Solange der Satz von früher gilt, musst du ihn nicht überprüfen — und niemanden enttäuschen.', wozuFrage:'Wem gegenüber wärst du illoyal, wenn du es anders machst als zuhause?', name:'Sätze aus der Herkunft',
  frage:'Wessen Stimme ist das eigentlich?',
  anker:{haeuser:[4], punkte:['Mond','Saturn','Pluto','IC']},
  regeln:[
    function(f,P,H){
      var im4=f.planeten.filter(function(x){return x.haus===4;});
      if(!im4.length) return null;
      return 'Im 4. Haus — Herkunft und Wurzeln — steht <b>'+im4.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Was dort steht, beschreibt die Atmosphäre, in der du groß geworden bist, nicht die Fakten.';
    },
    function(f,P,H){
      var ms=f.aspekte.filter(function(x){return ((x.a==='Mond'&&x.b==='Saturn')||(x.a==='Saturn'&&x.b==='Mond'));})[0];
      if(!ms) return null;
      return '<b>Mond '+ms.typ+' Saturn</b> mit '+ms.o.toFixed(1)+'°. Der wichtigste Selbstwert-Aspekt überhaupt: '+
        'Bedürftig zu sein wurde früh als unpassend erlebt. Du sorgst seitdem lieber, als versorgt zu werden — '+
        'und hältst das für Charakterstärke.';
    },
    function(f,P,H){
      if(P.Mond===undefined) return null;
      var hn=H.haus(P.Mond)+1;
      return 'Dein <b>Mond im '+hn+'. Haus</b> ('+H.fmt(P.Mond)+') zeigt, wo du Sicherheit suchst: in <b>'+H.HT[hn-1]+'</b>. '+
        'Dort spürst du am schnellsten, ob du willkommen bist.';
    },
    function(f,P,H){
      var ic=(P.MC+180)%360, hn=H.haus(ic)+1;
      var nah=[];
      Object.keys(P).forEach(function(k){
        if(k==='_jd'||k==='MC'||P[k]===undefined) return;
        var d=Math.abs(((P[k]-ic+180)%360+360)%360-180);
        if(d<=4&&k!=='ASC') nah.push(k+' ('+d.toFixed(1)+'°)');
      });
      if(!nah.length) return null;
      return '<b>'+nah.join(', ')+'</b> steht auf deinem IC — dem tiefsten Punkt des Charts. '+
        'Das ist der stärkste Hinweis auf ein Herkunftsthema, das bis heute mitläuft.';
    }],
  uebung:['Einen Satz zurückgeben',
   'Schreib einen Satz auf, den du über dich glaubst und der nicht gut über dich spricht. Dann frag dich: In wessen Stimme höre ich den? Wenn du eine Person erkennst, sag innerlich: „Das ist deiner, nicht meiner." Mehr nicht. Es wirkt trotzdem.'],
  rueckfrage:'Hast du einen Satz erkannt, der nicht deiner ist?',
  coach:{fragen:['Was war in deiner Familie allen klar und wurde nie ausgesprochen?',
   'Wofür gab es bei euch Anerkennung?',
   'Welchen Satz über Geld oder Wert hast du von zuhause mitgenommen?'],
   vorsicht:'Das ist die Facette, die am schnellsten zu tief geht. Wenn Gewalt, Vernachlässigung oder anhaltende Scham auftauchen: benennen, würdigen, und an eine Therapeutin verweisen. Siehe <a href="grenzen.html">Wann du nicht deutest</a>.'}}

 ]
}; var WOZU={"geld": ["Wenig zu verlangen schützt dich davor, abgelehnt zu werden — ein niedriger Preis wird selten verhandelt.", "Was würdest du riskieren, wenn du beim ersten Angebot eine Zahl nennst, bei der du schlucken musst?"], "koerper": ["Dich unauffällig zu halten schützt vor Bewertung. Wer nicht auffällt, wird nicht gemessen.", "Was müsstest du aushalten, wenn Menschen dich wirklich anschauen?"], "leistung": ["Immer mehr zu leisten schützt vor der Frage, ob du auch ohne genügst. Solange du lieferst, muss sie niemand stellen.", "Was käme hoch, wenn du eine Woche lang nichts beweist?"], "grenzen": ["Ja zu sagen hält den Frieden und die Zugehörigkeit. Ein Nein ist ein Risiko, ein Ja nie.", "Wen könntest du verlieren, wenn du das nächste Mal Nein sagst — und stimmt das wirklich?"], "raum": ["Klein zu bleiben schützt vor Neid, Erwartung und Fallhöhe. Wer nicht oben steht, kann nicht fallen.", "Was müsstest du durchhalten, wenn du einmal wirklich Platz einnimmst?"], "geteilt": ["Nicht hinzuschauen hält die Beziehung angenehm. Zahlen und Abhängigkeiten anzusprechen macht sie ernst.", "Was würde sich zwischen euch ändern, wenn du es benennst?"], "herkunft": ["Den alten Sätzen zu folgen hält die Loyalität. Sie infrage zu stellen heißt, sich ein Stück zu entfernen.", "Wem gegenüber wärst du illoyal, wenn du es anders machst als zuhause?"]};

    return {RAUM:RAUM, WOZU:(typeof WOZU!=='undefined')?WOZU:{}}; })()
};

/* ── Sicherheit & Fallenlassen · Themenraum · Astro-Charlie ─────────────────────────────── */
R_RAEUME['sicherheit'] = {
  adler: false,
  zeitschiene: false,
  titel: "Sicherheit & Fallenlassen · Themenraum · Astro-Charlie",
  h1: "Sicherheit & Fallenlassen.",
  frage: "&bdquo;Was brauche ich, um mich fallen lassen zu können?&ldquo;",
  intro: "Die Frage wird meistens anders gestellt — nach Technik, nach Tipps, nach dem, was angeblich gut sein soll. Die nützlichere Frage ist eine andere: <b>Was brauchst du, um dich sicher zu fühlen?</b> Wer sich nicht sicher fühlt, kann sich nicht fallen lassen, und daran ändert keine Technik etwas. Zehn Facetten: was Sicherheit für dich bedeutet, ob du Nein sagen kannst, wie dein Begehren überhaupt anspringt, was dir gefällt, was dich zuverlässig bremst, warum Loslassen schwerfällt, wie du darüber sprichst, wie präsent du im Körper bist und was du hinterher brauchst.",
  weiter: "<div class=\"weiter\"><a href=\"raeume.html\"><span class=\"lbl\">&larr; Zur&uuml;ck</span><span class=\"ttl\">Alle R&auml;ume</span></a><a href=\"raum-naehe.html\" class=\"nx\"><span class=\"lbl\">Passt dazu &rarr;</span><span class=\"ttl\">Nähe</span></a></div>",
  fuss: "Themenraum Sicherheit & Fallenlassen &middot; Gewichtung aus deinem Chart, im Browser gerechnet. Selbstarbeit und Coaching &mdash; keine Therapie.",
  def: (function(){ var RAUM = {
 name:'Sicherheit & Fallenlassen',
 slug:'sicherheit',
 sortierTitel:'Wo es dir schwerfällt, dich sicher zu fühlen',
 facetten:[
 {id:'sicherheit', worum:'Hier geht es darum, was du brauchst, um dich wirklich sicher zu fühlen — nicht nur einverstanden. Merken tust du es daran, ob du dich in einem Moment der Nähe entspannen kannst oder aufmerksam bleibst.', wozuSchutz:'Wachsam zu bleiben hat dich schon einmal geschützt. Das Nervensystem vergisst das nicht.',
  wozuFrage:'Was müsste gegeben sein, damit Wachsamkeit heute nicht mehr nötig wäre?',
  name:'Was Sicherheit für dich bedeutet',
  frage:'Wann fühle ich mich wirklich sicher — nicht nur einverstanden?',
  anker:{haeuser:[4], punkte:['Mond','Saturn','Neptun']},
  regeln:[
    function(f,P,H){
      if(P.Mond===undefined) return null;
      var hn=H.haus(P.Mond)+1, zi=Math.floor(P.Mond/30);
      var el=['Feuer','Erde','Luft','Wasser'][zi%4];
      return 'Dein <b>Mond in '+H.SIGNS[zi]+', '+hn+'. Haus</b> ('+H.fmt(P.Mond)+') sagt, worüber bei dir Sicherheit entsteht: '+
        'über <b>'+H.HT[hn-1]+'</b>. Und als '+el+'zeichen: '+
        (el==='Feuer'?'du brauchst Lebendigkeit und Direktheit. Vorsichtiges Herantasten macht dich unruhiger, nicht ruhiger.'
         :el==='Erde'?'du brauchst Verlässlichkeit und Körperlichkeit. Worte allein beruhigen dich nicht, Beständigkeit schon.'
         :el==='Luft'?'du brauchst Verständigung. Solange etwas unausgesprochen ist, kommst du nicht an.'
         :'du brauchst emotionale Stimmigkeit. Du merkst sofort, wenn jemand nicht ganz da ist — und dann geht bei dir nichts.');
    },
    function(f,P,H){
      var im4=f.planeten.filter(function(x){return x.haus===4;});
      if(!im4.length) return null;
      return 'Im 4. Haus steht <b>'+im4.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Was dort steht, beschreibt dein Grundgefühl von Zuhause — und das ist der Maßstab, an dem sich für dich auch später misst, '+
        'ob ein Ort oder ein Mensch sicher ist.';
    },
    function(f,P,H){
      var ms=f.aspekte.filter(function(x){return ((x.a==='Mond'&&x.b==='Saturn')||(x.a==='Saturn'&&x.b==='Mond'));})[0];
      if(!ms) return null;
      return '<b>Mond '+ms.typ+' Saturn</b> mit '+ms.o.toFixed(1)+'°. '+
        (ms.art==='hart'
         ? 'Du hast früh gelernt, ohne auszukommen. Das heißt hier: Du meldest selten, was du brauchst — und wartest stattdessen, ob es von allein kommt. Meistens kommt es nicht, weil niemand es ahnt.'
         : 'Nähe und Verlässlichkeit gehören bei dir zusammen. Du kannst dich sicher fühlen, ohne dich klein zu machen.');
    }],
  uebung:['Die Bedingung aufschreiben',
   'Schreib eine einzige Bedingung auf, unter der du dich sicher fühlst. Nicht was du dir wünschst — was nötig ist. Ein Satz. Die meisten Menschen haben diesen Satz noch nie formuliert und wundern sich, dass ihn niemand erfüllt.'],
  rueckfrage:'Hast du deine Bedingung formuliert?',
  coach:{fragen:['Wann fühlst du dich bei jemandem sicher — woran merkst du das körperlich?',
   'Was muss da sein, damit du dich entspannen kannst?',
   'Wann hast du dich zuletzt wirklich fallen lassen?'],
   vorsicht:'Nicht nach Gründen fragen, warum Sicherheit fehlt. Wenn die Person von sich aus von belastenden Erfahrungen erzählt: zuhören, würdigen, und an eine Therapeutin verweisen. Nicht nachfragen, nicht deuten.'}},

 {id:'grenzen', worum:'Hier geht es darum, ob du mittendrin aufhören kannst. Merken tust du es daran, ob du schon mal weitergemacht hast, obwohl du nicht mehr wolltest.', wozuSchutz:'Wer nicht Nein sagt, riskiert keinen Konflikt und keine Enttäuschung des anderen.',
  wozuFrage:'Was fürchtest du zu verlieren, wenn du mittendrin stopp sagst?',
  name:'Nein sagen können',
  frage:'Traue ich mich, mittendrin aufzuhören?',
  anker:{haeuser:[1,7], punkte:['Mars','Saturn']},
  regeln:[
    function(f,P,H){
      if(P.Mars===undefined) return null;
      var hn=H.haus(P.Mars)+1, zi=Math.floor(P.Mars/30);
      return 'Dein <b>Mars in '+H.SIGNS[zi]+', '+hn+'. Haus</b> ist dein Grenzmuskel. '+
        'Bei dir arbeitet er über <b>'+H.HT[hn-1]+'</b> — dort merkst du am ehesten, wann etwas zu viel ist, '+
        'und dort fällt es dir am ehesten schwer, es auch zu sagen.';
    },
    function(f,P,H){
      var ms=f.aspekte.filter(function(x){return ((x.a==='Mars'&&x.b==='Saturn')||(x.a==='Saturn'&&x.b==='Mars'))&&x.art==='hart';})[0];
      if(!ms) return null;
      return '<b>Mars '+ms.typ+' Saturn</b> mit '+ms.o.toFixed(1)+'°. Du willst etwas abwehren und hältst dich im selben Moment zurück. '+
        'In der Nähe heißt das oft: Du merkst, dass es nicht stimmt, und machst trotzdem weiter — nicht aus Schwäche, '+
        'sondern weil beide Impulse gleichzeitig laufen.';
    },
    function(f,P,H){
      var im7=f.planeten.filter(function(x){return x.haus===7;});
      if(!im7.length) return null;
      return 'Im 7. Haus steht <b>'+im7.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Deine Grenze zeigt sich bei dir erst im Gegenüber — du merkst an anderen, wo deine Linie liegt, '+
        'was es schwerer macht, sie vorher zu kennen.';
    }],
  uebung:['Einen Satz vorbereiten',
   'Überleg dir einen Satz, mit dem du etwas unterbrichst, und sprich ihn einmal laut aus, wenn niemand da ist. „Stopp, kurz." oder „Ich will das gerade nicht." Ein Satz, der im Kopf schon einmal gesagt wurde, kommt in der Situation leichter heraus.'],
  rueckfrage:'Hast du deinen Satz einmal laut gesagt?',
  coach:{fragen:['Wie sagst du, dass du etwas nicht willst?',
   'Was passiert in dir, bevor du es sagst?',
   'Bei wem fällt es dir leichter — und was ist dort anders?'],
   vorsicht:'Wenn jemand berichtet, dass ein Nein nicht respektiert wurde, ist das kein Grenzthema der Person, sondern ein Übergriff. Das benennen, nicht bearbeiten, und an eine Fachstelle verweisen.'}},

 {id:'erlauben', worum:'Hier geht es um das, was du zurückhältst, weil es zu viel sein könnte. Merken tust du es daran, ob du jemals ausgesprochen hast, was du dir wünschst.', wozuSchutz:'Was man nicht ausspricht, kann nicht abgelehnt werden.',
  wozuFrage:'Was wäre das Schlimmste daran, wenn jemand wüsste, was du willst?',
  name:'Was du dir nicht erlaubst',
  frage:'Was halte ich zurück, weil es zu viel sein könnte?',
  anker:{haeuser:[8,5], punkte:['Lilith','Venus','Mars']},
  regeln:[
    function(f,P,H){
      if(P.Lilith===undefined||P.Lilith===null) return null;
      var hn=H.haus(P.Lilith)+1, zi=Math.floor(P.Lilith/30);
      return 'Deine <b>Lilith in '+H.SIGNS[zi]+', '+hn+'. Haus</b> markiert den Anteil, der nie gelernt hat, sich zu verkleinern — '+
        'bei dir in <b>'+H.HT[hn-1]+'</b>. In der Nähe ist das die Stelle, an der du dich zurücknimmst, obwohl mehr da wäre. '+
        'Nicht aus Unsicherheit, sondern weil du früh gelernt hast, dass dieser Teil nicht willkommen ist. '+
        'Mehr dazu unter <a href="raum-unerlaubte.html">Das Unerlaubte</a>.';
    },
    function(f,P,H){
      if(P.Venus===undefined) return null;
      var hn=H.haus(P.Venus)+1;
      return 'Deine <b>Venus im '+hn+'. Haus</b> sagt, worüber du überhaupt genießt: über <b>'+H.HT[hn-1]+'</b>. '+
        'Was woanders stattfindet, erreicht dich weniger — auch wenn es allgemein als schön gilt oder erwartet wird.';
    },
    function(f,P,H){
      var im8=f.planeten.filter(function(x){return x.haus===8;});
      if(!im8.length) return 'Dein 8. Haus ist unbesetzt. Das Tiefe und Ungesagte ist bei dir kein Dauerthema — '+
        'was es leichter machen kann und gleichzeitig heißt, dass du weniger Übung darin hast, dort hinzugehen.';
      return 'Im 8. Haus — dem Bereich für das, worüber man nicht spricht — steht <b>'+
        im8.map(function(x){return x.p;}).join(', ')+'</b>. Du gehst mit Menschen in Bereiche, die andere meiden. '+
        'Das ist eine Fähigkeit und eine Anfälligkeit zugleich.';
    }],
  uebung:['Einen Satz für dich aufschreiben',
   'Schreib einen Satz auf, den du nie gesagt hast, über etwas, das du magst oder brauchst. Nur für dich, nicht zum Zeigen. Papier reicht, danach kannst du ihn wegwerfen. Es geht darum, dass der Satz einmal außerhalb deines Kopfes existiert hat.'],
  rueckfrage:'Hast du den Satz aufgeschrieben?',
  coach:{fragen:['Was hältst du zurück, weil es zu viel sein könnte?',
   'Wofür schämst du dich, das vermutlich ganz normal ist?',
   'Was hast du noch nie ausgesprochen?'],
   vorsicht:'Nur so weit gehen, wie die Person von sich aus öffnet. Nicht nachfragen, nicht konkretisieren, nichts deuten. Wenn Scham stark wird: Thema wechseln und der Person sagen, dass sie nichts erklären muss.'}},

 {id:'loslassen', worum:'Hier geht es darum, warum Loslassen schwerfällt, obwohl du es willst. Merken tust du es daran, dass du im Kopf mitläufst, statt einfach da zu sein.', wozuSchutz:'Kontrolle zu behalten heißt, dass dich nichts überraschen kann.',
  wozuFrage:'Was könnte passieren, wenn du die Kontrolle für einen Moment abgibst — und wie wahrscheinlich ist das wirklich?',
  name:'Kontrolle und Loslassen',
  frage:'Warum kann ich mich nicht fallen lassen, obwohl ich will?',
  anker:{haeuser:[8,12], punkte:['Pluto','Saturn','Neptun','Uranus']},
  regeln:[
    function(f,P,H){
      if(P.Pluto===undefined) return null;
      var hn=H.haus(P.Pluto)+1;
      return 'Dein <b>Pluto im '+hn+'. Haus</b> ('+H.fmt(P.Pluto)+') zeigt, wo Kontrolle für dich zum Thema wird: '+
        'in <b>'+H.HT[hn-1]+'</b>. Dort gibst du ungern etwas aus der Hand — und genau dort wäre Loslassen am wirksamsten.';
    },
    function(f,P,H){
      if(P.Saturn===undefined) return null;
      var hn=H.haus(P.Saturn)+1;
      return 'Dein <b>Saturn im '+hn+'. Haus</b> ist die Stelle, an der du dich zusammenreißt. '+
        'Zusammenreißen und Fallenlassen schließen sich aus — solange du dort im Griff bist, geht das eine nicht. '+
        'Das ist keine Willensfrage, sondern eine Reihenfolge: erst muss die Anspannung runter, dann geht der Rest.';
    },
    function(f,P,H){
      if(P.Uranus===undefined) return null;
      var mu=f.aspekte.filter(function(x){return (x.a==='Uranus'||x.b==='Uranus')&&x.o<4;})[0];
      if(!mu) return null;
      var and=(mu.a==='Uranus')?mu.b:mu.a;
      return '<b>Uranus '+mu.typ+' '+and+'</b> mit '+mu.o.toFixed(1)+'°. Sobald es eng wird, geht bei dir ein Teil auf Abstand — '+
        'auch mitten in einer Situation, die du eigentlich willst. Das ist ein Schutzreflex, keine Ablehnung. '+
        'Hilfreich ist meistens nicht, dagegen anzugehen, sondern eine Möglichkeit zu haben, kurz rauszugehen und wiederzukommen.';
    }],
  uebung:['Eine Ausstiegsmöglichkeit vereinbaren',
   'Vereinbar mit einer Person, der du vertraust, dass du jederzeit unterbrechen darfst — ohne Begründung und ohne dass es etwas bedeutet. Paradoxerweise ist das, was Loslassen möglich macht: Wer weiß, dass er raus kann, muss sich nicht festhalten.'],
  rueckfrage:'Hast du so eine Möglichkeit vereinbart?',
  coach:{fragen:['Woran merkst du, dass du die Kontrolle nicht abgeben kannst?',
   'Was müsste gegeben sein, damit du sie abgeben könntest?',
   'Gibt es Situationen, in denen du dich fallen lässt — was ist dort anders?'],
   vorsicht:'Kontrollbedürfnis kann Persönlichkeit sein oder Folge von Erfahrungen. Nicht danach suchen, welches davon zutrifft. Wenn die Person es selbst benennt und es belastend ist, gehört es begleitet.'}},

 {id:'sprechen', worum:'Hier geht es darum, ob du sagen kannst, was du brauchst. Merken tust du es daran, ob du hoffst, dass es gespürt wird, statt es zu sagen.', wozuSchutz:'Solange nichts gesagt ist, muss man sich nicht festlegen und nichts aushalten.',
  wozuFrage:'Was wäre anders, wenn dein Gegenüber es wirklich wüsste?',
  name:'Darüber sprechen können',
  frage:'Warum sage ich nicht, was ich brauche?',
  anker:{haeuser:[3,7], punkte:['Merkur','Venus']},
  regeln:[
    function(f,P,H){
      if(P.Merkur===undefined) return null;
      var hn=H.haus(P.Merkur)+1, zi=Math.floor(P.Merkur/30);
      var el=['Feuer','Erde','Luft','Wasser'][zi%4];
      return 'Dein <b>Merkur in '+H.SIGNS[zi]+', '+hn+'. Haus</b> beschreibt, wie du dich mitteilst. Als '+el+': '+
        (el==='Feuer'?'direkt und schnell. Dir fällt das Sagen leichter als das Abwägen — nutz das.'
         :el==='Erde'?'konkret. Bei dir funktionieren einfache, benennbare Sätze besser als Andeutungen.'
         :el==='Luft'?'über Worte und Erklärungen. Du kannst reden — die Frage ist eher, ob du dabei bei dir bleibst.'
         :'indirekt und über Stimmung. Du hoffst, dass es gespürt wird, statt es zu sagen. Meistens wird es nicht gespürt.');
    },
    function(f,P,H){
      var im3=f.planeten.filter(function(x){return x.haus===3;});
      if(!im3.length) return null;
      return 'Im 3. Haus steht <b>'+im3.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Sprache ist bei dir stärker besetzt, als du vielleicht denkst — auch das Schweigen ist eine Botschaft.';
    },
    function(f,P,H){
      var vm=f.aspekte.filter(function(x){return (x.a==='Merkur'||x.b==='Merkur')&&x.art==='hart'&&x.o<4;})[0];
      if(!vm) return null;
      var and=(vm.a==='Merkur')?vm.b:vm.a;
      return '<b>Merkur '+vm.typ+' '+and+'</b> mit '+vm.o.toFixed(1)+'°. Zwischen dem, was du meinst, und dem, was ankommt, '+
        'liegt bei dir eine Lücke. Das ist ein guter Grund, Wichtiges lieber zu einfach zu sagen als zu genau.';
    }],
  uebung:['Vorher statt mittendrin',
   'Sag eine Sache, die dir wichtig ist, <i>vorher</i> — nicht in der Situation. Beim Kaffee, beim Spazieren, per Nachricht. Außerhalb des Moments ist es sehr viel leichter, und es nimmt der Situation selbst den Druck.'],
  rueckfrage:'Hast du etwas vorher angesprochen?',
  coach:{fragen:['Was sagst du nicht, weil es den Moment stören würde?',
   'Woher weiß dein Gegenüber, was du brauchst?',
   'Was wäre der leichteste Zeitpunkt, es zu sagen?'],
   vorsicht:'Kommunikationsübungen sind hier Coaching-Gebiet. Alles, was in Richtung konkreter Praktiken geht, ist es nicht.'}},

 {id:'koerper', worum:'Hier geht es darum, ob du währenddessen im Körper bist oder im Kopf. Merken tust du es daran, ob du dich dabei beobachtest.', wozuSchutz:'Im Kopf zu bleiben verhindert, dass du spürst, was gerade nicht stimmt.',
  wozuFrage:'Was würdest du merken, wenn du ganz in deinem Körper wärst?',
  name:'Im Körper sein',
  frage:'Warum bin ich so oft im Kopf statt da?',
  anker:{haeuser:[1,6], punkte:['ASC','Venus','Mars','Neptun']},
  regeln:[
    function(f,P,H){
      var zi=Math.floor(P.ASC/30);
      var el=['Feuer','Erde','Luft','Wasser'][zi%4];
      return 'Dein <b>Aszendent in '+H.SIGNS[zi]+'</b> beschreibt deine körperliche Art, da zu sein. Als '+el+': '+
        (el==='Feuer'?'raumgreifend und schnell. Du bist präsent, bevor du dich entschieden hast.'
         :el==='Erde'?'geerdet und körperlich anwesend. Das ist eine Ressource — du kommst leichter in den Körper als viele andere.'
         :el==='Luft'?'wach, aber oft mehr im Kopf als im Leib. Präsenz ist bei dir eher gedanklich, und das ist genau die Schwierigkeit in dieser Facette.'
         :'fein und durchlässig. Du spürst viel, auch fremde Stimmung — und verlierst darüber manchmal dich selbst.');
    },
    function(f,P,H){
      var im1=f.planeten.filter(function(x){return x.haus===1;});
      if(!im1.length) return null;
      return 'Im 1. Haus steht <b>'+im1.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Was dort steht, zeigt sich körperlich, ob du willst oder nicht. Verbergen kostet dich hier besonders viel Kraft.';
    },
    function(f,P,H){
      if(P.Neptun===undefined) return null;
      var hn=H.haus(P.Neptun)+1;
      return 'Dein <b>Neptun im '+hn+'. Haus</b> zeigt, wo deine Wahrnehmung unscharf wird — in <b>'+H.HT[hn-1]+'</b>. '+
        'Dort verlierst du am ehesten den Kontakt zu dir selbst, ohne es zu bemerken. '+
        'Ein guter Grund, gelegentlich bewusst zu prüfen: Bin ich gerade noch da?';
    }],
  uebung:['Ein Anker für zwischendurch',
   'Such dir ein körperliches Zeichen, an dem du merkst, ob du noch da bist — Füße auf dem Boden spüren, Hand auf dem Brustbein, einmal bewusst ausatmen. Übe es diese Woche in harmlosen Situationen. Ein Anker, den man kennt, funktioniert später auch dann, wenn es darauf ankommt.'],
  rueckfrage:'Hast du deinen Anker gefunden?',
  coach:{fragen:['Woran merkst du, dass du präsent bist?',
   'Wann gehst du in den Kopf — gibt es einen Auslöser?',
   'Was hilft dir zurück?'],
   vorsicht:'Wenn jemand beschreibt, regelmäßig neben sich zu stehen oder den Kontakt zum Körper zu verlieren, ist das kein Coaching-Thema. Freundlich benennen und an eine Therapeutin verweisen — das ist behandelbar und lohnt sich.'}}
,

 {id:'begehren', worum:'Hier geht es darum, wie deine Lust überhaupt entsteht. Merken tust du es daran, ob sie von allein kommt oder erst unterwegs — beides ist normal.', wozuSchutz:'Solange du glaubst, mit dir stimme etwas nicht, musst du nichts einfordern.',
  wozuFrage:'Was würde sich ändern, wenn du wüsstest, dass dein Begehren einfach anders anspringt — und nicht fehlt?',
  name:'Wie dein Begehren anspringt',
  frage:'Warum habe ich seltener Lust als andere — oder erst danach?',
  anker:{haeuser:[5,8], punkte:['Mars','Venus','Pluto']},
  regeln:[
    function(f,P,H){
      return '<b>Zuerst das, was nicht aus dem Chart kommt und trotzdem das Wichtigste ist:</b> Lust entsteht auf zwei Arten. '+
        'Die eine kommt <b>von selbst</b>, ohne Anlass — die kennt man aus Filmen und aus den ersten Monaten einer Verliebtheit. '+
        'Die andere entsteht erst als <b>Antwort</b> auf Berührung, Stimmung oder Zuwendung: Man beginnt ohne Lust und bekommt sie unterwegs. '+
        'Die zweite Variante ist bei Frauen die häufigere, und sie wird regelmäßig für einen Defekt gehalten. '+
        'Wenn du dich darin wiedererkennst, ist die Frage nicht „warum habe ich keine Lust", sondern <b>„was muss passieren, damit sie kommt"</b>.';
    },
    function(f,P,H){
      if(P.Mars===undefined) return null;
      var zi=Math.floor(P.Mars/30), hn=H.haus(P.Mars)+1;
      var M=['Dein Begehren ist <b>schnell und ungeduldig</b>. Du willst, wenn du willst, und Verzögerung kühlt dich ab statt dich anzuheizen. Verführung im Sinne von langem Hinarbeiten langweilt dich — Direktheit funktioniert bei dir besser als Andeutung.',
       'Dein Begehren kommt <b>über den Körper und über Zeit</b>. Du brauchst Berührung, die nirgendwohin will, bevor etwas anderes geht. Dafür hältst du lange durch und kommst nicht so leicht aus dem Takt. Hetze ist dein größter Feind.',
       'Dein Begehren beginnt <b>im Kopf</b>. Ein Satz, eine Vorstellung, eine Spannung im Gespräch — das wirkt bei dir stärker als jede Berührung ohne Worte. Stille Nähe lässt dich eher abdriften. Reden gehört bei dir mit dazu, nicht als Beiwerk.',
       'Dein Begehren hängt <b>an der Stimmung</b> und schwankt erheblich. Wenn emotional etwas offen ist, geht bei dir nichts, egal wie gut die Bedingungen sonst sind. Umgekehrt: Wenn du dich aufgehoben fühlst, kommt es fast von allein.',
       'Dein Begehren lebt davon, <b>gewollt zu werden</b> — sichtbar, deutlich und ohne Zweifel. Zurückhaltung beim Gegenüber liest du als Desinteresse, auch wenn sie nur Rücksicht ist. Du brauchst jemanden, der es zeigt.',
       'Dein Begehren ist <b>aufmerksam und zurückhaltend</b> zugleich. Du merkst jede Kleinigkeit, auch ob jemand wirklich da ist — und genau das kann dich aus dem Moment holen. Bei dir hilft Konkretes: Wissen, was kommt, statt es zu erraten.',
       'Dein Begehren braucht <b>Gegenseitigkeit</b>. Sobald es einseitig wird, kippt es bei dir, auch wenn du der begehrte Teil bist. Du willst kein Gefälle, sondern ein Miteinander — und du merkst sofort, wenn das nicht stimmt.',
       'Dein Begehren ist <b>intensiv und kompromisslos</b>. Halbe Sachen interessieren dich nicht. Du willst Tiefe, auch wenn sie unbequem ist, und langweilst dich bei allem, was gefällig bleibt. Kontrolle und Hingabe sind bei dir eng verwandt.',
       'Dein Begehren braucht <b>Freiheit und Humor</b>. Sobald etwas nach Verpflichtung riecht, geht bei dir die Luft raus. Du magst Leichtigkeit, Abenteuer und die Möglichkeit, dass es auch anders laufen könnte.',
       'Dein Begehren ist <b>verhalten und ausdauernd</b>. Es braucht Vertrauen und Zeit, kommt spät, und wenn es da ist, ist es verlässlich. Von außen wirkt das kühl — es ist aber eher eine lange Anlaufstrecke.',
       'Dein Begehren ist <b>eigenwillig</b> und folgt selten dem, was üblich ist. Erwartungen bremsen dich sofort. Du brauchst das Gefühl, dass nichts vorgeschrieben ist — dann bist du sehr wach.',
       'Dein Begehren ist <b>verschmelzend und ohne klare Kanten</b>. Du gibst dich leicht hin und verlierst dabei manchmal die Linie zwischen dem, was du willst, und dem, was der andere will. Das ist deine Gabe und dein wunder Punkt in einem.'];
      return M[zi]+' Der Schauplatz ist dein <b>'+hn+'. Haus</b> ('+H.HT[hn-1]+') — '+
        (hn===1?'du zeigst es körperlich, ob du willst oder nicht.'
         :hn===5?'Spiel und Ausdruck sind dabei wichtig, nicht nur Nähe.'
         :hn===7?'es entsteht im Gegenüber, kaum allein.'
         :hn===8?'es geht bei dir schnell in die Tiefe.'
         :hn===12?'vieles läuft bei dir verdeckt, auch vor dir selbst.'
         :'dort entscheidet sich, ob überhaupt etwas in Gang kommt.');
    },
    function(f,P,H){
      if(P.Mars===undefined) return null;
      var A=f.aspekte.filter(function(x){return (x.a==='Mars'||x.b==='Mars')&&x.o<4;});
      if(!A.length) return null;
      var t=[];
      A.slice(0,2).forEach(function(x){
        var and=(x.a==='Mars')?x.b:x.a;
        if(and==='Saturn') t.push('<b>Mars '+x.typ+' Saturn</b> ('+x.o.toFixed(1)+'°): Du bremst dich mitten im Wollen. Das fühlt sich an wie fehlende Lust, ist aber Gleichzeitigkeit — Gas und Bremse. Was hilft: nicht mehr Gas, sondern weniger Anlass zu bremsen.');
        else if(and==='Neptun') t.push('<b>Mars '+x.typ+' Neptun</b> ('+x.o.toFixed(1)+'°): Dein Wollen ist unscharf. Du merkst oft erst hinterher, ob du das wirklich wolltest. Deshalb lohnt es sich bei dir, vorher zu benennen statt im Moment zu entscheiden.');
        else if(and==='Pluto') t.push('<b>Mars '+x.typ+' Pluto</b> ('+x.o.toFixed(1)+'°): Dein Begehren hat Wucht. Macht, Kontrolle und Hingabe spielen mit, ob du willst oder nicht — das ist weder falsch noch gefährlich, solange es besprochen ist.');
        else if(and==='Uranus') t.push('<b>Mars '+x.typ+' Uranus</b> ('+x.o.toFixed(1)+'°): Dein Begehren kommt stoßweise und verschwindet ebenso. Routine tötet es zuverlässig — du brauchst Unvorhersehbares, und zwar mehr als andere.');
        else if(and==='Venus') return;
        else if(and==='Mond') t.push('<b>Mars '+x.typ+' Mond</b> ('+x.o.toFixed(1)+'°): Bei dir hängen Gefühl und Begehren direkt zusammen. Was emotional nicht stimmt, ist körperlich sofort spürbar.');
      });
      return t.length?t.join(' '):null;
    },
    function(f,P,H){
      if(P.Venus===undefined||P.Mars===undefined) return null;
      var vm=f.aspekte.filter(function(x){return (x.a==='Venus'&&x.b==='Mars')||(x.a==='Mars'&&x.b==='Venus');})[0];
      if(!vm) return '<b>Venus und Mars ohne Aspekt.</b> Zuneigung und Begehren laufen bei dir getrennt. '+
        'Du kannst jemanden sehr mögen und keine Lust haben — und umgekehrt. Das ist kein Mangel, sondern heißt: '+
        'Beide Seiten brauchen bei dir getrennte Aufmerksamkeit. Zärtlichkeit erzeugt bei dir nicht automatisch Lust, und Lust nicht automatisch Nähe.';
      return '<b>Venus '+vm.typ+' Mars</b> mit '+vm.o.toFixed(1)+'°. '+
        (vm.art==='weich'
         ? 'Mögen und Wollen greifen ineinander. Bei dir wächst Begehren aus Zuneigung, nicht gegen sie — das ist seltener, als man denkt, und macht langfristige Beziehungen für dich leichter als für viele andere.'
         : 'Mögen und Wollen reiben aneinander. Anziehung und Spannung hängen bei dir zusammen: Was ganz harmonisch und sicher ist, fühlt sich schnell nach nichts an. Das ist wichtig zu wissen, weil man es leicht für ein Beziehungsproblem hält — es ist aber deine Verdrahtung.');
    }],
  uebung:['Rückwärts denken',
   'Denk an eine Situation, in der es richtig gut war, und geh rückwärts: Wie war der Tag davor? Wie der Raum, dein Kopf, dein Körper, die Stunden vorher? Nicht was der andere gemacht hat — der <i>Kontext</i>. Bei den meisten Menschen entscheidet er mehr als alles andere, und die wenigsten haben ihn je bewusst angeschaut.'],
  rueckfrage:'Hast du deinen Kontext gefunden?',
  coach:{fragen:['Kommt deine Lust von allein oder als Antwort auf etwas?',
   'Was war beim letzten Mal anders, als es gut war?',
   'Was glaubst du über dein Begehren — und woher hast du diesen Glauben?'],
   vorsicht:'Wenn jemand grundsätzlich kein sexuelles Begehren empfindet und nicht darunter leidet: Asexualität ist eine Orientierung, keine Störung, und nichts, was bearbeitet werden muss. Wenn jemand leidet: Das kann körperliche, hormonelle oder medikamentöse Ursachen haben und gehört ärztlich abgeklärt, bevor man psychologisch arbeitet.'}},

 {id:'bremsen', worum:'Hier geht es darum, was dir zuverlässig die Lust nimmt. Merken tust du es daran, dass es manchmal von einer Sekunde auf die andere kippt, ohne dass etwas passiert ist.', wozuSchutz:'Eine Bremse hat einen Grund. Sie schützt vor etwas, das einmal nötig war.',
  wozuFrage:'Welche deiner Bremsen ist heute noch nötig — und welche läuft nur aus Gewohnheit mit?',
  name:'Deine Bremsen und Beschleuniger',
  frage:'Warum kippt es manchmal von einer Sekunde auf die andere?',
  anker:{haeuser:[6,12], punkte:['Saturn','Neptun','Mond','Uranus']},
  regeln:[
    function(f,P,H){
      return 'Ein Modell, das mehr erklärt als alles andere: Es arbeiten immer <b>zwei Systeme gleichzeitig</b> — '+
        'eines, das anregt, und eines, das hemmt. Wie viel Lust jemand empfindet, hängt weniger davon ab, wie stark das Gas ist, '+
        'als davon, <b>wie viele Bremsen gerade getreten sind</b>. Das ist der Grund, warum „mehr Erotik" selten hilft '+
        'und Aufräumen oft schon. Typische Bremsen: Zeitdruck, ein Raum, in dem noch Arbeit liegt, ein ungeklärter Streit, '+
        'Sorge um die eigene Wirkung, Müdigkeit, das Gefühl beobachtet zu werden, die Liste im Kopf.';
    },
    function(f,P,H){
      if(P.Saturn===undefined) return null;
      var zi=Math.floor(P.Saturn/30), hn=H.haus(P.Saturn)+1;
      var S=['der Gedanke, zu viel zu wollen oder zu fordernd zu sein',
       'die Sorge, nicht zu genügen — körperlich oder überhaupt',
       'alles Ungesagte. Solange ein Gespräch offen ist, bist du nicht da',
       'fehlende Geborgenheit. Wenn du dich nicht zuhause fühlst, geht bei dir nichts',
       'die Angst, nicht wirklich gewollt zu sein. Zurückhaltung liest du als Ablehnung',
       'Selbstbeobachtung. Du prüfst, statt zu spüren, und merkst es oft zu spät',
       'ein Ungleichgewicht zwischen euch, auch ein kleines',
       'Misstrauen. Solange du nicht sicher bist, wo du dran bist, gibst du nichts preis',
       'das Gefühl, eingeengt zu werden — auch durch Erwartung',
       'unerledigte Pflichten. Solange noch etwas offen ist, schaltest du nicht ab',
       'Vorgaben und Routine. Sobald es erwartbar wird, steigst du innerlich aus',
       'Unklarheit. Wenn du nicht weißt, was läuft, löst du dich innerlich auf'];
      return 'Dein <b>Saturn in '+H.SIGNS[zi]+', '+hn+'. Haus</b> ('+H.HT[hn-1]+') markiert deine stärkste Bremse: '+
        '<b>'+S[zi]+'</b>. Das ist keine Kleinigkeit und nicht wegzuatmen — aber es ist etwas, das man ansprechen '+
        'und teilweise wegräumen kann. Bei dir bringt das mehr als jede Technik.';
    },
    function(f,P,H){
      if(P.Mond===undefined) return null;
      var zi=Math.floor(P.Mond/30), hn=H.haus(P.Mond)+1;
      var B=['Lebendigkeit und Tempo. Zu viel Behutsamkeit langweilt dich — du willst spüren, dass jemand will',
       'Zeit, Wärme und Berührung ohne Ziel. Bei dir wirkt Langsamkeit, nicht Dringlichkeit',
       'Worte und Spannung im Kopf. Bei dir beginnt es im Gespräch, oft Stunden vorher',
       'ein geschützter Raum und das Gefühl, aufgehoben zu sein. Fremde Umgebung bremst dich',
       'Aufmerksamkeit, Bewunderung, das Gefühl gesehen zu werden — deutlich und ohne Zweifel',
       'Klarheit und Sauberkeit im Wortsinn. Ein aufgeräumter Raum wirkt bei dir mehr als jedes Kerzenlicht',
       'Gegenseitigkeit und Ästhetik. Du brauchst das Gefühl, dass es beiden gut geht',
       'Tiefe, Blickkontakt, Ernsthaftigkeit. Leichtes Geplänkel erreicht dich nicht',
       'Humor und Weite. Wenn ihr zusammen lacht, geht bei dir mehr als bei jeder Inszenierung',
       'Verlässlichkeit und genug Zeit ohne Unterbrechung. Gehetzt geht bei dir gar nichts',
       'Unerwartetes und Freiraum. Immer dasselbe schaltet dich ab',
       'Musik, Stimmung, Zärtlichkeit ohne klare Richtung. Bei dir wirkt Atmosphäre stärker als alles Konkrete'];
      return 'Dein <b>Mond in '+H.SIGNS[zi]+', '+hn+'. Haus</b> sagt, was bei dir als <b>Beschleuniger</b> wirkt: '+
        B[zi]+'. Das ist meistens die brauchbarere Information — Bremsen kennt man, Beschleuniger selten.';
    },
    function(f,P,H){
      var vs=f.aspekte.filter(function(x){return ((x.a==='Venus'&&x.b==='Saturn')||(x.a==='Saturn'&&x.b==='Venus'))&&x.art==='hart';})[0];
      if(vs) return '<b>Venus '+vs.typ+' Saturn</b> ('+vs.o.toFixed(1)+'°): Du glaubst, Zuwendung verdienen zu müssen. '+
        'Im Bett heißt das oft: Du gibst mehr, als du nimmst, und fragst nicht nach dem, was du willst. Das ist die Bremse, '+
        'die am schwersten auffällt, weil sie sich nach Großzügigkeit anfühlt.';
      var im12=f.planeten.filter(function(x){return x.haus===12;});
      if(!im12.length) return null;
      return 'Im <b>12. Haus</b> steht '+im12.map(function(x){return x.p;}).join(', ')+'. '+
        'Ein Teil deiner Bremsen arbeitet unbewusst — du merkst nicht, dass etwas dich hemmt, sondern nur, dass nichts passiert. '+
        'Deshalb lohnt es sich bei dir besonders, den Kontext aufzuschreiben statt ihn zu erspüren.';
    }],
  uebung:['Drei Bremsen, eine davon weg',
   'Schreib drei Dinge auf, die dir zuverlässig die Lust nehmen. Banal darf es sein: Wäsche auf dem Bett, ein offenes Gespräch, der Gedanke an morgen früh. Dann räum <b>eine</b> davon weg, bevor es das nächste Mal darauf ankommt. Nicht alle drei — eine.'],
  rueckfrage:'Hast du eine Bremse weggeräumt?',
  coach:{fragen:['Was nimmt dir zuverlässig die Lust?',
   'Was davon hat mit der Person zu tun und was mit dem Drumherum?',
   'Was davon könntest du morgen ändern?'],
   vorsicht:'Bremsen sind manchmal Schutz nach schlechten Erfahrungen. Nicht darauf hinarbeiten, sie abzustellen — nur sie sichtbar zu machen. Was damit geschieht, entscheidet die Person allein.'}},

 {id:'gefaellt', worum:'Hier geht es darum, was dir eigentlich gefällt. Merken tust du es daran, ob du es benennen könntest, wenn dich jemand fragt.', wozuSchutz:'Wer nicht weiß, was er mag, muss es nicht sagen — und kann nicht enttäuschen.',
  wozuFrage:'Was hättest du zu verlieren, wenn dein Gegenüber genau wüsste, was dir gefällt?',
  name:'Was dir gefällt',
  frage:'Was mag ich eigentlich — und woher soll ich das wissen?',
  anker:{haeuser:[5,8], punkte:['Venus','Mars','Lilith']},
  regeln:[
    function(f,P,H){
      if(P.Venus===undefined) return null;
      var zi=Math.floor(P.Venus/30), hn=H.haus(P.Venus)+1;
      var V=['<b>Direktheit.</b> Du magst, wenn jemand weiß, was er will, und es zeigt. Zögern liest du als Desinteresse. Und du willst selbst auch wollen dürfen, nicht nur begehrt werden.',
       '<b>Sinnlichkeit und Dauer.</b> Haut, Geruch, Wärme, Zeit. Bei dir ist der Weg wichtiger als das Ziel, und Unterbrechungen stören dich mehr als bei anderen.',
       '<b>Sprache und Leichtigkeit.</b> Du magst Reden dabei, Lachen, Abwechslung. Zu viel Ernst und Andacht macht dich verlegen. Neugier ist bei dir ein Teil der Lust.',
       '<b>Nähe und Halten.</b> Du magst es, gehalten zu werden und dich sicher zu fühlen. Zärtlichkeit ist bei dir kein Vorspiel, sondern die Hauptsache.',
       '<b>Gesehenwerden.</b> Du magst Aufmerksamkeit, Bewunderung, ein bisschen Inszenierung. Wenn jemand dir zeigt, dass er dich will, ist das bei dir der halbe Weg.',
       '<b>Aufmerksamkeit im Detail.</b> Du magst, wenn jemand genau ist und merkt, was wirkt. Grobheit oder Beiläufigkeit holen dich sofort raus.',
       '<b>Gegenseitigkeit.</b> Du magst, wenn es sich ausgleicht — nicht abwechselnd, sondern gemeinsam. Einseitigkeit, in welche Richtung auch immer, kippt es bei dir.',
       '<b>Intensität und Tiefe.</b> Du magst, wenn es ernst wird, wenn Blicke gehalten werden, wenn etwas auf dem Spiel steht. Gefälliges langweilt dich.',
       '<b>Freiheit und Übermut.</b> Du magst, wenn etwas nicht geplant ist, wenn gelacht werden darf, wenn es auch schiefgehen könnte.',
       '<b>Verlässlichkeit und Ernst.</b> Du magst, wenn Zeit da ist und niemand es eilig hat. Bei dir wächst es über Wiederholung, nicht über Neuheit.',
       '<b>Das Unübliche.</b> Du magst, was nicht im Drehbuch steht, und du magst Freiraum. Erwartung ist bei dir das Gegenteil von anziehend.',
       '<b>Hingabe und Atmosphäre.</b> Du magst, wenn Grenzen weich werden — Musik, Dunkelheit, Nähe ohne klare Richtung. Und du verlierst dabei leicht dich selbst.'];
      var HW=['du zeigst es offen und körperlich — Zurückhaltung passt nicht zu dir',
       'Besitz und Sicherheit spielen mit: Du magst, was dir gehört und bleibt',
       'Reden gehört dazu, auch währenddessen — Stille macht dich unruhig',
       'du brauchst dein eigenes Revier. Fremde Betten sind bei dir schwieriger',
       'Spiel, Flirt und Inszenierung gehören dazu, nicht nur Nähe',
       'Alltag und Körperlichkeit sind verbunden: Wenn der Alltag stimmt, stimmt auch das',
       'es entsteht bei dir im Gegenüber — allein oder nebenher funktioniert es weniger',
       'es geht bei dir schnell tief. Oberfläche hältst du nicht lange aus',
       'Weite und Abenteuer gehören dazu: unterwegs, an neuen Orten, mit Humor',
       'Anerkennung spielt mit. Du magst es, wenn jemand stolz auf dich ist oder dich begehrenswert findet — das klingt eitel und ist einfach deine Bauweise',
       'Freundschaft und Freiraum gehören dazu. Besitzansprüche nehmen dir die Lust',
       'es braucht Rückzug und geschützte Zeit. Unter Beobachtung geht bei dir nichts'];
      return 'Deine <b>Venus in '+H.SIGNS[zi]+'</b>: '+V[zi]+' Und im <b>'+hn+'. Haus</b> heißt das: '+HW[hn-1]+'.';
    },
    function(f,P,H){
      if(P.Lilith===undefined||P.Lilith===null) return null;
      var zi=Math.floor(P.Lilith/30), hn=H.haus(P.Lilith)+1;
      var L=['dass du selbst willst und es zeigst, statt zu warten',
       'dass du dir Genuss nimmst, ohne ihn zu rechtfertigen',
       'dass du aussprichst, was du dir vorstellst',
       'dass du Bedürftigkeit zeigst, ohne dich dafür zu schämen',
       'dass du im Mittelpunkt stehst und es genießt',
       'dass du unordentlich und unkontrolliert sein darfst',
       'dass du etwas forderst, statt es beiden recht zu machen',
       'dass du dich ganz hingibst oder ganz führst — ohne Mittelweg',
       'dass du ausprobierst, was nicht vorgesehen war',
       'dass du Macht ausübst und es dir gefällt',
       'dass du dich völlig aus der Rolle bewegst',
       'dass du dich verlierst, ohne Angst davor zu haben'];
      return 'Deine <b>Lilith in '+H.SIGNS[zi]+', '+hn+'. Haus</b> zeigt, was du dir nicht erlaubst: <b>'+L[zi]+'</b>. '+
        'Erfahrungsgemäß liegt genau dort etwas, das dir gefallen würde — es hat nur nie Erlaubnis bekommen. '+
        'Das ist kein Auftrag, sondern ein Hinweis, wo es sich lohnt hinzuschauen.';
    },
    function(f,P,H){
      var im5=f.planeten.filter(function(x){return x.haus===5;});
      var im8=f.planeten.filter(function(x){return x.haus===8;});
      var t=[];
      if(im5.length) t.push('Im <b>5. Haus</b> steht '+im5.map(function(x){return x.p;}).join(', ')+
        ' — Spiel, Leichtigkeit und Ausprobieren sind bei dir stark angelegt. Bei dir darf Sex auch einfach Spaß sein, ohne Bedeutung.');
      if(im8.length) t.push('Im <b>8. Haus</b> steht '+im8.map(function(x){return x.p;}).join(', ')+
        ' — es zieht dich in die Tiefe. Du willst, dass etwas passiert, nicht nur, dass es schön ist. Das macht es intensiver und auch anfälliger.');
      if(!t.length) return 'Weder 5. noch 8. Haus sind bei dir besetzt. Weder Verspieltheit noch Intensität sind vorgegeben — '+
        'du hast mehr Freiheit und musst dafür bewusster herausfinden, was dir liegt. Das dauert länger und ist dafür wirklich deins.';
      return t.join(' ');
    }],
  uebung:['Die stille Liste',
   'Schreib drei Dinge auf, die dir gefallen, und eine, bei der du dir nicht sicher bist. Für dich allein, niemand muss es sehen, danach darfst du es wegwerfen. Der Sinn ist nicht, es weiterzugeben — <b>man kann schlecht etwas einfordern, das man selbst nie benannt hat.</b>'],
  rueckfrage:'Hast du deine Liste geschrieben?',
  coach:{fragen:['Was gefällt dir — und woher weißt du das?',
   'Was hast du übernommen, weil es erwartet wurde?',
   'Was würdest du gern ausprobieren und traust dich nicht zu sagen?'],
   vorsicht:'Hier nie konkret nachfragen. Die Person benennt, du hörst zu und wertest nicht. Alles, was in Richtung konkreter Praktiken oder Beratung dazu geht, gehört in eine sexualtherapeutische Begleitung — nicht ins Coaching.'}},

 {id:'danach', worum:'Hier geht es um den Moment danach, über den kaum jemand spricht. Merken tust du es daran, wie du dich zehn Minuten später fühlst.', wozuSchutz:'Sofort weiterzumachen erspart dir den verletzlichsten Moment.',
  wozuFrage:'Was fürchtest du in dem Moment danach — und wer hat dir beigebracht, dass man da schnell weitermacht?',
  name:'Was du danach brauchst',
  frage:'Warum fühle ich mich hinterher manchmal seltsam?',
  anker:{haeuser:[4,12], punkte:['Mond','Neptun','Saturn']},
  regeln:[
    function(f,P,H){
      return 'Der Teil <b>danach</b> wird fast immer übersehen und entscheidet erstaunlich viel darüber, wie man das Ganze in Erinnerung behält. '+
        'Wenn die Anspannung abfällt, sind viele Menschen ungewohnt durchlässig: Da kommen manchmal Traurigkeit, Unruhe oder ein plötzlicher '+
        'Rückzugsimpuls hoch, <b>ganz ohne dass etwas schiefgelaufen wäre</b>. Das ist verbreitet, in der Fachliteratur beschrieben '+
        'und sagt nichts über die Beziehung aus. Wer das einmal weiß, erschrickt beim nächsten Mal nicht mehr darüber.';
    },
    function(f,P,H){
      if(P.Mond===undefined) return null;
      var zi=Math.floor(P.Mond/30);
      var D=['Bewegung und Leichtigkeit. Lange Stille wird dir unangenehm — steh ruhig auf, hol was zu trinken, red über irgendwas.',
       'Körperkontakt und Ruhe. Bleib liegen. Aufstehen und Weitermachen ist bei dir das Falsche und hinterlässt ein schales Gefühl.',
       'ein Gespräch. Bei dir schließt sich etwas erst mit Worten — auch banalen. Schweigen lässt bei dir eine Lücke.',
       'Nähe und Zeit. Wenn du danach allein bleibst, bleibt bei dir etwas offen, das du am nächsten Tag noch spürst.',
       'Bestätigung. Ein Satz reicht. Wenn nichts kommt, fängst du an zu zweifeln, auch ohne Grund.',
       'Ordnung und ein klarer Übergang. Du kommst schlecht aus dem Moment, wenn danach Chaos herrscht.',
       'Gemeinsamkeit. Du brauchst das Gefühl, dass es für beide gut war — Ungewissheit darüber beschäftigt dich lange.',
       'Zeit ohne Reden. Bei dir wirkt es nach, und du magst es nicht, wenn sofort zerredet wird.',
       'Leichtigkeit und Lachen. Zu viel Feierlichkeit danach macht dich unruhig.',
       'Ruhe und Verlässlichkeit. Bei dir ist wichtig, dass jemand bleibt — nicht was gesagt wird.',
       'Freiraum. Du brauchst manchmal Abstand, und das ist keine Ablehnung. Sag es vorher, dann wird es nicht falsch verstanden.',
       'Wärme und Atmosphäre. Bei dir zieht sich der Moment noch lange hin, und ein harter Schnitt tut weh.'];
      return 'Dein <b>Mond in '+H.SIGNS[zi]+'</b> sagt, was du danach brauchst: '+D[zi];
    },
    function(f,P,H){
      var ms=f.aspekte.filter(function(x){return ((x.a==='Mond'&&x.b==='Saturn')||(x.a==='Saturn'&&x.b==='Mond'))&&x.art==='hart';})[0];
      if(ms) return '<b>Mond '+ms.typ+' Saturn</b> ('+ms.o.toFixed(1)+'°): Ausgerechnet in diesem Moment fällt es dir schwer, '+
        'Zuwendung zu verlangen — obwohl du sie dann am dringendsten brauchst. Du wirst eher sachlich, stehst auf, machst etwas. '+
        'Das wirkt auf das Gegenüber oft wie Distanz. Wenn du das bei dir kennst, kannst du es vorher ansprechen statt hinterher erklären.';
      var mn=f.aspekte.filter(function(x){return ((x.a==='Mond'&&x.b==='Neptun')||(x.a==='Neptun'&&x.b==='Mond'));})[0];
      if(mn) return '<b>Mond '+mn.typ+' Neptun</b> ('+mn.o.toFixed(1)+'°): Die Grenze zwischen deinen Gefühlen und denen des anderen '+
        'ist danach besonders dünn. Du nimmst mit, was im Raum liegt, und hältst es für deins. Ein bisschen Abstand nach kurzer Zeit '+
        'hilft dir mehr, als du denkst.';
      return null;
    }],
  uebung:['Vorher sagen, was danach hilft',
   'Sag einer Person, mit der du Nähe teilst, einmal <i>vorher</i>, was du hinterher brauchst — Nähe, Reden, Ruhe, Wasser, eine Decke, kurz allein sein. Ein Satz genügt. Das ist unromantisch und funktioniert hervorragend, weil hinterher niemand gut formulieren kann.'],
  rueckfrage:'Hast du vorher gesagt, was du danach brauchst?',
  coach:{fragen:['Wie fühlst du dich direkt danach — und zwei Stunden später?',
   'Was brauchst du dann, und bekommst du es?',
   'Was machst du stattdessen?'],
   vorsicht:'Wenn regelmäßig starke Traurigkeit, Scham oder Panik danach auftreten, ist das kein Coaching-Thema. Das kann viele Ursachen haben, auch zurückliegende Erfahrungen, und gehört freundlich an eine Fachperson weitergegeben.'}}

 ]
}; 
    return {RAUM:RAUM, WOZU:(typeof WOZU!=='undefined')?WOZU:{}}; })()
};

/* ── Das Unerlaubte · Themenraum · Astro-Charlie ─────────────────────────────── */
R_RAEUME['unerlaubte'] = {
  adler: true,
  zeitschiene: false,
  titel: "Das Unerlaubte · Themenraum · Astro-Charlie",
  h1: "Das Unerlaubte.",
  frage: "„Was traue ich mir eigentlich nicht zu?\"",
  intro: "Es gibt in jedem Menschen einen Anteil, der nie gelernt hat, sich zu verkleinern — und dem man deshalb keinen Platz gibt. Im Chart heißt dieser Punkt Lilith. Sechs Facetten: was du dir versagst, wie du es verbirgst, wo es trotzdem rauskommt, was es dich kostet, wie andere darauf reagieren — und welche Kraft darin steckt. Die letzte Facette ist die eigentliche: Wo man sich etwas nicht erlaubt, liegt meistens die meiste ungenutzte Energie.",
  weiter: "<div class=\"weiter\"><a href=\"raeume.html\"><span class=\"lbl\">&larr; Zur&uuml;ck</span><span class=\"ttl\">Alle R&auml;ume</span></a><a href=\"lilith-arbeit.html\" class=\"nx\"><span class=\"lbl\">Passt dazu &rarr;</span><span class=\"ttl\">Die Lilith-Arbeit</span></a></div>",
  fuss: "Themenraum Das Unerlaubte &middot; Gewichtung aus deinem Chart, im Browser gerechnet. Selbstarbeit und Coaching &mdash; keine Therapie.",
  def: (function(){ var RAUM = {
 name:'Das Unerlaubte',
 slug:'unerlaubte',
 sortierTitel:'Wie dein unangepasster Anteil bei dir arbeitet',
 facetten:[
 {id:'was', worum:'Hier geht es um den Teil von dir, dem du keinen Platz gibst. Merken tust du es daran, wofür du dich regelmäßig entschuldigst, obwohl es nichts zu entschuldigen gibt.', wozuSchutz:'Das Verbot ist alt und hat dich einmal geschützt. Es gilt weiter, weil niemand es aufgehoben hat.', wozuFrage:'Wer hat es dir verboten — und wäre diese Person heute noch dagegen?', name:'Was du dir nicht erlaubst',
  frage:'Was traue ich mir eigentlich nicht zu?',
  anker:{haeuser:[], punkte:['Lilith','Sonne','ASC']},
  regeln:[
    function(f,P,H){
      if(P.Lilith===undefined||P.Lilith===null) return null;
      var hn=H.haus(P.Lilith)+1, zi=Math.floor(P.Lilith/30);
      var Z=['deine Wut und dein direktes Wollen','dein Genuss und dein Anspruch auf Eigenes',
       'deine ungefilterte Meinung','dein Bedürfnis nach Nähe','dein Wunsch, groß zu sein',
       'dein Chaos und dein Nicht-Funktionieren','deine Unfairness und dein Egoismus',
       'deine Intensität und dein Begehren','dein Freiheitsdrang','dein Ehrgeiz und dein Machtwunsch',
       'deine Fremdheit','deine Entgrenzung'];
      return 'Deine <b>Lilith in '+H.SIGNS[zi]+', '+hn+'. Haus</b> ('+H.fmt(P.Lilith)+'). '+
        'Was du dir nicht erlaubst, ist <b>'+Z[zi]+'</b> — und es spielt sich ab in <b>'+H.HT[hn-1]+'</b>. '+
        'Das ist keine Schwäche: Es ist der Teil, der nie gelernt hat, sich zu verkleinern, und dem du deshalb keinen Platz gibst.';
    },
    function(f,P,H){
      if(P.Lilith===undefined||P.Lilith===null) return null;
      var hn=H.haus(P.Lilith)+1;
      var H2=['Dein Unangepasstes ist sofort sichtbar. Menschen reagieren stark auf dich, bevor du etwas tust — und du hast früh gelernt, das zu dämpfen.',
       'Dir zu nehmen, was dir zusteht, ist der wunde Punkt. Geld, Preise, Ansprüche — hier bremst du dich, wo andere selbstverständlich fordern.',
       'Was du wirklich denkst, sprichst du nicht aus. Du hast früh gemerkt, dass deine ungeschminkte Version nicht willkommen war.',
       'Etwas in deiner Herkunft wurde nie ausgesprochen und wirkt bis heute. Oft ist es das, was alle wussten und niemand benannte.',
       'Deine Lust, deine Kreativität, dein Wunsch gesehen zu werden — das ist bei dir das Unerlaubte, und gleichzeitig deine größte Kraft.',
       'Funktionieren zu müssen unterdrückt etwas Wildes in dir. Dein Körper meldet sich, wenn es zu lange zu viel war.',
       'In Nähe kommt hervor, was du sonst wegsperrst. Beziehungen sind bei dir der Ort, an dem sich das zeigt.',
       'Hier ist Lilith stark. Intimität, Macht, Kontrolle, geteiltes Geld — alles, worüber man nicht spricht.',
       'Deine ketzerischen Gedanken behältst du für dich. Du glaubst etwas anderes, als du sagst.',
       'Ambition zu zeigen fühlt sich unanständig an. Du willst etwas gelten und traust dich nicht, es zuzugeben.',
       'Du bist die, die nicht mitmacht — und bezahlst dafür mit Zugehörigkeit. Anpassen oder alleine sein, so fühlt es sich an.',
       'Dein Unbändiges arbeitet unsichtbar, auch vor dir selbst. Andere sehen es manchmal früher als du.'];
      return H2[hn-1];
    },
    function(f,P,H){
      if(P.Lilith===undefined||P.Lilith===null) return null;
      var d=P.Lilith%30;
      var dA=Math.abs(((d-(P.ASC%30))+45)%30-15), dM=Math.abs(((d-(P.MC%30))+45)%30-15);
      var m=Math.min(dA,dM);
      if(m>2) return null;
      return '<b>Achsengrad:</b> Deine Lilith liegt nur '+m.toFixed(1)+'° vom Gradwert deines '+
        (dA<dM?'Aszendenten':'MC')+' entfernt. Das verstärkt sie erheblich — der unangepasste Anteil sitzt bei dir '+
        'direkt an der Stelle, an der du '+(dA<dM?'sichtbar wirst':'öffentlich stehst')+'. Verstecken kostet dich mehr als Zeigen.';
    }],
  uebung:['Den Satz aufschreiben',
   'Schreib in einem Satz auf, was du dir nicht erlaubst. Ohne „aber", ohne Begründung, ohne Entschuldigung. Nur der Satz. Mehr ist diese Woche nicht nötig — das Benennen allein verändert schon etwas.'],
  rueckfrage:'Hast du deinen Satz aufgeschrieben?',
  coach:{fragen:['Wofür bist du als Kind kritisiert worden, das eigentlich eine Stärke war?',
   'Was tust du nur, wenn niemand zusieht?',
   'Wofür entschuldigst du dich, das keine Entschuldigung braucht?'],
   vorsicht:'Lilith ist kein Defekt, der weg muss. Nicht auf Befreiung hinarbeiten — erst einmal reicht, dass der Anteil einen Namen bekommt.'}},

 {id:'verbergen', worum:'Hier geht es um die Art, wie du diesen Teil wegsteckst. Merken tust du es an dem Satz, mit dem du dir Dinge regelmäßig ausredest.', wozuSchutz:'Gute Gründe zu haben ist bequemer, als sich zu zeigen.', wozuFrage:'Welchen Satz benutzt du dafür regelmäßig — und wem würde er nicht standhalten?', name:'Wie du es verbirgst',
  frage:'Was mache ich stattdessen?',
  anker:{haeuser:[12], punkte:['Lilith','Saturn','Neptun']},
  regeln:[
    function(f,P,H){
      if(P.Lilith===undefined||P.Lilith===null||P.Saturn===undefined) return null;
      var ls=f.aspekte.filter(function(x){return ((x.a==='Lilith'&&x.b==='Saturn')||(x.a==='Saturn'&&x.b==='Lilith'));})[0];
      if(!ls) return null;
      return '<b>Lilith '+ls.typ+' Saturn</b> mit '+ls.o.toFixed(1)+'°. Das Verstecken ist bei dir gut organisiert. '+
        'Du hast Regeln, Gründe und Strukturen dafür, warum dieser Anteil gerade nicht dran ist — '+
        'und die Gründe klingen vernünftig. Genau das macht sie wirksam.';
    },
    function(f,P,H){
      var im12=f.planeten.filter(function(x){return x.haus===12;});
      if(!im12.length) return null;
      return 'Im 12. Haus steht <b>'+im12.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Was dort steht, arbeitet unsichtbar — auch vor dir. Verdrängtes sammelt sich hier an, '+
        'und du merkst es eher an Erschöpfung als an einem Gedanken.';
    },
    function(f,P,H){
      if(P.Lilith===undefined||P.Lilith===null) return null;
      var ln=f.aspekte.filter(function(x){return ((x.a==='Lilith'&&x.b==='Neptun')||(x.a==='Neptun'&&x.b==='Lilith'));})[0];
      if(!ln) return null;
      return '<b>Lilith '+ln.typ+' Neptun</b> mit '+ln.o.toFixed(1)+'°. Du verwischst das Thema, statt es zu unterdrücken. '+
        'Es wird unklar, statt verboten — und deshalb schwer zu greifen, auch für dich selbst.';
    }],
  uebung:['Die Begründung prüfen',
   'Wenn du dir diese Woche etwas versagst, hör dir deine eigene Begründung an. Dann frag: <i>Stimmt das — oder ist das der Satz, den ich immer sage?</i> Nicht ändern, nur bemerken.'],
  rueckfrage:'Hast du eine deiner Standardbegründungen erkannt?',
  coach:{fragen:['Mit welchem Satz verhinderst du es regelmäßig?',
   'Was sagst du anderen, wenn du absagst?',
   'Wann hast du zuletzt gedacht „jetzt ist nicht der richtige Zeitpunkt"?'],
   vorsicht:'Nicht bloßstellen. Begründungen sind Schutz, und den darf man sich nur freiwillig ansehen.'}},

 {id:'rauskommt', worum:'Hier geht es darum, wo das Unterdrückte doch hervorbricht. Merken tust du es daran, dass deine Reaktion manchmal deutlich größer ist als der Anlass.', wozuSchutz:'Ein Ausbruch entlädt, ohne dass man vorher etwas fordern musste.', wozuFrage:'Was hättest du sagen können, bevor es rausplatzte — und warum hast du es nicht?', name:'Wo es trotzdem rauskommt',
  frage:'Warum platzt es manchmal einfach raus?',
  anker:{haeuser:[1,8], punkte:['Lilith','Mars','Uranus','Pluto']},
  regeln:[
    function(f,P,H){
      if(P.Lilith===undefined||P.Lilith===null) return null;
      var eng=f.aspekte.filter(function(x){return (x.a==='Lilith'||x.b==='Lilith')&&x.o<4;});
      if(!eng.length) return 'Lilith bildet bei dir keinen engen Aspekt. Der Anteil ist weniger verdrahtet als bei anderen — '+
        'er meldet sich seltener, dafür unvermittelter, wenn es doch passiert.';
      return 'Lilith hängt bei dir an <b>'+eng.map(function(x){
        var and=(x.a==='Lilith')?x.b:x.a; return and+' ('+x.typ+', '+x.o.toFixed(1)+'°)';}).join(', ')+'</b>. '+
        'Über diese Funktionen kommt der unterdrückte Anteil raus — meistens plötzlich, meistens im falschen Moment, '+
        'und meistens stärker, als der Anlass hergibt.';
    },
    function(f,P,H){
      if(P.Mars===undefined) return null;
      var lm=f.aspekte.filter(function(x){return ((x.a==='Lilith'&&x.b==='Mars')||(x.a==='Mars'&&x.b==='Lilith'));})[0];
      if(!lm) return null;
      return '<b>Lilith '+lm.typ+' Mars</b>: Es kommt als Wut raus. Der Ärger passt dann nicht zur Situation, '+
        'weil er nicht der Situation gilt — er gilt allem, was du dir vorher verkniffen hast.';
    },
    function(f,P,H){
      if(P.Uranus===undefined) return null;
      var lu=f.aspekte.filter(function(x){return ((x.a==='Lilith'&&x.b==='Uranus')||(x.a==='Uranus'&&x.b==='Lilith'));})[0];
      if(!lu) return null;
      return '<b>Lilith '+lu.typ+' Uranus</b>: Es kommt als Abbruch raus. Du hältst lange aus und gehst dann von jetzt auf gleich — '+
        'für andere überraschend, für dich der einzige Ausweg, der noch offen schien.';
    }],
  uebung:['Den Moment davor finden',
   'Wenn es diese Woche einmal rausplatzt: Schreib danach auf, was zwei Stunden vorher war. Nicht der Auslöser — der Zustand davor. Dort liegt das eigentliche Thema, nicht im Ausbruch.'],
  rueckfrage:'Hast du den Moment davor gefunden?',
  coach:{fragen:['Wann bist du zuletzt lauter geworden, als es die Situation hergab?',
   'Was hattest du vorher wochenlang runtergeschluckt?',
   'Woran merkst du, dass sich etwas aufstaut?'],
   vorsicht:'Ausbrüche nicht als Charakterproblem behandeln. Sie sind fast immer ein Stauproblem.'}},

 {id:'kosten', worum:'Hier geht es um den Preis, den das Zurückhalten hat. Merken tust du es an der Müdigkeit, für die es keinen offensichtlichen Grund gibt.', wozuSchutz:'Den Preis nicht zu benennen erspart die Rechnung.', wozuFrage:'Was würdest du ändern müssen, wenn du den Preis genau kennst?', name:'Was es dich kostet',
  frage:'Was verliere ich dadurch?',
  anker:{haeuser:[2,6], punkte:['Lilith','Saturn','Mond']},
  regeln:[
    function(f,P,H){
      if(P.Lilith===undefined||P.Lilith===null) return null;
      var hn=H.haus(P.Lilith)+1;
      return 'Der Preis liegt bei dir in <b>'+H.HT[hn-1]+'</b>. Dort gibst du weniger von dir preis, als möglich wäre — '+
        'und bekommst entsprechend weniger zurück. Das fällt lange nicht auf, weil es sich nach Vernunft anfühlt.';
    },
    function(f,P,H){
      var im6=f.planeten.filter(function(x){return x.haus===6;});
      if(!im6.length) return null;
      return 'Im 6. Haus steht <b>'+im6.map(function(x){return x.p;}).join(', ')+'</b>. Unterdrückung kostet bei dir '+
        'im Alltag Energie — nicht in großen Momenten, sondern in vielen kleinen, an denen du dich zusammennimmst.';
    },
    function(f,P,H){
      if(P.Mond===undefined) return null;
      var ml=f.aspekte.filter(function(x){return ((x.a==='Lilith'&&x.b==='Mond')||(x.a==='Mond'&&x.b==='Lilith'));})[0];
      if(!ml) return null;
      return '<b>Lilith '+ml.typ+' Mond</b> mit '+ml.o.toFixed(1)+'°. Der Preis ist bei dir emotional spürbar: '+
        'Du fühlst dich nicht ganz, ohne sagen zu können warum. Das ist kein diffuses Unwohlsein, sondern ein konkreter Mangel.';
    }],
  uebung:['Den Preis konkret machen',
   'Schreib auf, was dich das Zurückhalten konkret gekostet hat. Nicht abstrakt — welche Beziehung, welche Chance, welche Jahre. Je konkreter, desto weniger lässt es sich wegargumentieren.'],
  rueckfrage:'Hast du den Preis konkret benannt?',
  coach:{fragen:['Was hättest du gehabt, wenn du dir das erlaubt hättest?',
   'Wofür entschuldigst du dich regelmäßig?',
   'Was kostet dich das Zusammenreißen — körperlich?'],
   vorsicht:'Nicht in Reue kippen. Der Blick auf den Preis soll Bewegung erzeugen, nicht Schuld.'}},

 {id:'reaktion', worum:'Hier geht es darum, warum Menschen auf dich stärker reagieren, als du erwartest. Merken tust du es daran, was dir Leute unterstellen, die dich kaum kennen.', wozuSchutz:'Wenn andere schuld an ihrer Reaktion sind, musst du nichts an dir ändern.', wozuFrage:'Was gehört wirklich zu dir an dem, worauf Menschen reagieren?', name:'Wie andere reagieren',
  frage:'Warum reagieren Menschen so stark auf mich?',
  anker:{haeuser:[7,11], punkte:['Lilith','ASC','Venus']},
  regeln:[
    function(f,P,H){
      if(P.Lilith===undefined||P.Lilith===null) return null;
      var hn=H.haus(P.Lilith)+1;
      if(hn===1||hn===7||hn===10||hn===11)
        return 'Deine Lilith steht in einem sichtbaren Haus ('+hn+'.). Das heißt: Andere sehen diesen Anteil, '+
          'auch wenn du ihn versteckst. Menschen reagieren darauf — manche fasziniert, manche irritiert, selten neutral. '+
          'Das liegt nicht an deinem Verhalten, sondern daran, dass etwas Unterdrücktes immer spürbar bleibt.';
      return 'Deine Lilith steht im '+hn+'. Haus — eher innen als außen. Andere merken den Anteil weniger direkt, '+
        'was es einfacher macht, ihn zu verbergen, und schwerer, Rückmeldung darüber zu bekommen.';
    },
    function(f,P,H){
      if(P.Lilith===undefined||P.Lilith===null) return null;
      var la=f.aspekte.filter(function(x){return ((x.a==='Lilith'&&(x.b==='ASC'||x.b==='MC'))||((x.a==='ASC'||x.a==='MC')&&x.b==='Lilith'));})[0];
      if(!la) return null;
      var and=(la.a==='Lilith')?la.b:la.a;
      return '<b>Lilith '+la.typ+' '+and+'</b> mit '+la.o.toFixed(1)+'°. Der Anteil sitzt direkt an deiner '+
        (and==='ASC'?'Erscheinung':'öffentlichen Rolle')+'. Menschen ordnen dich deshalb schnell und bestimmt ein — '+
        'und liegen dabei oft daneben, weil sie auf etwas reagieren, das du selbst nicht zeigst.';
    },
    function(f,P,H){
      var im7=f.planeten.filter(function(x){return x.haus===7;});
      if(!im7.length) return null;
      return 'Im 7. Haus steht <b>'+im7.map(function(x){return x.p;}).join(', ')+'</b>. In Beziehungen kommt hervor, '+
        'was du sonst wegsperrst — was Beziehungen zum wichtigsten Übungsfeld für dieses Thema macht.';
    }],
  uebung:['Eine Rückmeldung einholen',
   'Frag diese Woche eine Person, der du vertraust: <i>Wie wirke ich auf dich, wenn ich mich zurücknehme?</i> Nicht widersprechen, nur zuhören. Das ist die Außensicht, die dir selbst fehlt.'],
  rueckfrage:'Hast du jemanden gefragt?',
  coach:{fragen:['Wie reagieren Menschen auf dich, bevor sie dich kennen?',
   'Was unterstellt man dir regelmäßig?',
   'Bei wem bist du ganz du selbst — und was ist dort anders?'],
   vorsicht:'Starke Reaktionen anderer können auch Übergriffigkeit sein. Nicht jede Reaktion ist eine Information über die Person.'}},

 {id:'kraft', worum:'Hier geht es um die Energie, die in dem eingesperrten Teil steckt. Merken tust du es daran, wie lebendig du dich fühlst, wenn du dir dort einmal etwas erlaubst.', wozuSchutz:'Ungenutzte Kraft kann nicht falsch eingesetzt werden.', wozuFrage:'Wofür würdest du verantwortlich, wenn du diese Kraft benutzt?', name:'Deine ungenutzte Kraft',
  frage:'Was steckt da eigentlich drin?',
  anker:{haeuser:[8,5], punkte:['Lilith','Pluto','Mars','Sonne']},
  regeln:[
    function(f,P,H){
      if(P.Lilith===undefined||P.Lilith===null) return null;
      var hn=H.haus(P.Lilith)+1;
      return 'Das ist der Punkt, an dem Lilith kippt: <b>Wo du dir etwas nicht erlaubst, liegt deine meiste ungenutzte Kraft.</b> '+
        'Bei dir in <b>'+H.HT[hn-1]+'</b>. Nicht weil dort etwas fehlt — weil dort etwas eingesperrt ist, '+
        'das nie schwächer geworden ist.';
    },
    function(f,P,H){
      if(P.Pluto===undefined||P.Lilith===undefined||P.Lilith===null) return null;
      var lp=f.aspekte.filter(function(x){return ((x.a==='Lilith'&&x.b==='Pluto')||(x.a==='Pluto'&&x.b==='Lilith'));})[0];
      if(!lp) return null;
      return '<b>Lilith '+lp.typ+' Pluto</b> mit '+lp.o.toFixed(1)+'°. Die Kraft dahinter ist erheblich. '+
        'Das ist auch der Grund, warum du sie zurückhältst: Sie fühlt sich nach zu viel an. Ist sie aber nicht — '+
        'sie ist nur ungeübt.';
    },
    function(f,P,H){
      if(P.Sonne===undefined||P.Lilith===undefined||P.Lilith===null) return null;
      var d=Math.abs(((P.Sonne-P.Lilith+180)%360+360)%360-180);
      if(d>8) return null;
      return 'Sonne und Lilith stehen bei dir nur '+d.toFixed(1)+'° auseinander. Dein unangepasster Anteil und deine Identität '+
        'liegen nah beieinander — du kannst ihn schlecht abspalten, ohne dich selbst mit abzuspalten.';
    }],
  uebung:['Eine kleine Erlaubnis, mit Termin',
   'Nicht die große Version. Eine, die diese Woche machbar ist: einmal sagen was du denkst, einmal einen Preis nennen, einmal nicht zurücknehmen. Dann trag einen Termin dafür ein. <b>Ohne Termin passiert es nicht</b> — das ist bei diesem Thema die wichtigste Regel.'],
  rueckfrage:'Hast du deine kleine Erlaubnis eingelöst?',
  coach:{fragen:['Was würdest du tun, wenn es niemand mitbekommt?',
   'Was würdest du fordern, wenn du sicher wüsstest, dass es dir zusteht?',
   'Wann hast du dich zuletzt groß gefühlt?'],
   vorsicht:'Es wird sich falsch anfühlen — das gehört dazu und ist kein Zeichen, dass es falsch war. Das gehört ausgesprochen, sonst bricht die Person beim ersten Unbehagen ab. Ausführlicher unter <a href="lilith-arbeit.html">Lilith-Arbeit</a>.'}}

 ]
}; var WOZU={"was": ["Das Verbot hat dich einmal geschützt — vermutlich vor Ablehnung durch Menschen, auf die du angewiesen warst.", "Vor wessen Reaktion schützt dich das heute noch?"], "verbergen": ["Die guten Gründe funktionieren, weil sie stimmen. Deshalb musst du dich nie damit auseinandersetzen, dass sie auch etwas verhindern.", "Was könntest du nicht mehr aufschieben, wenn die Begründung wegfiele?"], "rauskommt": ["Der plötzliche Ausbruch entlädt den Druck, ohne dass du entscheiden musst. Es passiert einfach.", "Was müsstest du regelmäßig ansprechen, damit es nicht mehr platzt?"], "kosten": ["Den Preis nicht zu beziffern hält ihn erträglich. Genau zu wissen, was es gekostet hat, macht es dringend.", "Was müsstest du ändern, wenn du die Rechnung genau kennst?"], "reaktion": ["Nicht zu fragen, wie du wirkst, schützt vor einer Antwort, die wehtun könnte.", "Was wäre, wenn die Außensicht freundlicher ausfällt, als du denkst?"], "kraft": ["Die Kraft eingesperrt zu lassen ist sicher. Freigesetzt wäre sie nicht mehr kontrollierbar, und du wüsstest nicht, was passiert.", "Wovor hättest du mehr Angst: dass es schiefgeht oder dass es funktioniert?"]};

    return {RAUM:RAUM, WOZU:(typeof WOZU!=='undefined')?WOZU:{}}; })()
};

/* ── Versorgung · Themenraum · Astro-Charlie ─────────────────────────────── */
R_RAEUME['versorgung'] = {
  adler: false,
  zeitschiene: true,
  titel: "Versorgung · Themenraum · Astro-Charlie",
  h1: "Versorgung.",
  frage: "&bdquo;Warum kriege ich das Einfache nicht hin?&ldquo;",
  intro: "Essen, trinken, Papierkram, Haushalt, Schlaf — das Langweilige, das alles trägt und über das niemand spricht. Bei anders verdrahteten Menschen ist genau das oft das Schwerste, und der übliche Rat („einfach dranbleiben\") geht daran vorbei. Sechs Facetten, die nicht fragen, wie du dich besser motivierst, sondern <b>woran es mechanisch hakt</b> — und was dein Chart darüber sagt, wo Struktur bei dir tatsächlich hält.",
  weiter: "<div class=\"weiter\"><a href=\"raeume.html\"><span class=\"lbl\">&larr; Zur&uuml;ck</span><span class=\"ttl\">Alle R&auml;ume</span></a><a href=\"organizer.html\" class=\"nx\"><span class=\"lbl\">Werkzeug dazu &rarr;</span><span class=\"ttl\">Der Organizer</span></a></div>",
  fuss: "Themenraum Versorgung &middot; Mechanismen, keine Vorgaben. Keine Mengen, keine Zeiten, keine Ziele.",
  def: (function(){ var RAUM = {
 name:'Versorgung',
 slug:'versorgung',
 sortierTitel:'Wo dein Alltag tatsächlich klemmt',
 facetten:[
 {id:'essen', worum:'Hier geht es darum, warum regelmäßig essen so schwer ist. Merken tust du es daran, dass du manchmal erst merkst, dass du Hunger hast, wenn du schon gereizt bist.', wozuSchutz:'Sich zu überspringen spart im Moment Kraft — bis die Rechnung kommt.',
  wozuFrage:'Was machst du in der Zeit, in der du nicht isst — und ist es das wert?',
  name:'Essen und Versorgung',
  frage:'Warum kriege ich das nicht regelmäßig hin?',
  anker:{haeuser:[6,2], punkte:['Mond','Saturn','Venus']},
  regeln:[
    function(f,P,H){
      return '<b>Zuerst das, was nicht aus dem Chart kommt:</b> Bei vielen anders verdrahteten Menschen kommt das Hungersignal '+
        'spät, schwach oder gar nicht als Hunger an — sondern als Gereiztheit, Kopfschmerz oder plötzliche Erschöpfung. '+
        'Dazu ist Essen ein <b>vierstufiger Vorgang</b>: entscheiden, besorgen, zubereiten, aufräumen. '+
        'Vier Stellen, an denen man hängenbleiben kann. Wer das weiß, hört auf, es für Disziplinlosigkeit zu halten — '+
        'und fängt an, an der Stufe anzusetzen, die tatsächlich klemmt.';
    },
    function(f,P,H){
      if(P.Mond===undefined) return null;
      var zi=Math.floor(P.Mond/30), hn=H.haus(P.Mond)+1;
      var mod=['kardinal','fix','veränderlich'][zi%3];
      return 'Dein <b>Mond in '+H.SIGNS[zi]+', '+hn+'. Haus</b> beschreibt deinen Versorgungstakt, und der ist <b>'+mod+'</b>: '+
        (mod==='fix'?'Einmal etabliert, hält eine Essensroutine bei dir erstaunlich lange. Der Aufbau ist das Zähe. '+
          'Also: wenige feste Sachen, die immer gehen, statt Abwechslung.'
         :mod==='kardinal'?'Du startest gut und verlierst nach zwei Wochen die Lust. Plan bei dir keine Dauerlösung, '+
          'sondern etwas, das du alle paar Wochen neu aufsetzen darfst — das ist kein Scheitern, sondern dein Takt.'
         :'Du brauchst Abwechslung, sonst steigst du aus. Gleiche Struktur, wechselnder Inhalt funktioniert bei dir '+
          'besser als feste Wochenpläne.');
    },
    function(f,P,H){
      if(P.Saturn===undefined) return null;
      var hn=H.haus(P.Saturn)+1;
      return 'Dein <b>Saturn im '+hn+'. Haus</b> ('+H.HT[hn-1]+') zeigt, wo Struktur bei dir tatsächlich trägt. '+
        'Häng deine Versorgung an diesen Bereich an — was dort verankert ist, hält. Was woanders ansetzt, zerfällt, '+
        'egal wie gut das System ist.';
    },
    function(f,P,H){
      var im6=f.planeten.filter(function(x){return x.haus===6;});
      var h6=f.herrscher.filter(function(x){return x.haus===6;})[0];
      var t=[];
      if(im6.length) t.push('Im 6. Haus steht <b>'+im6.map(function(x){return x.p;}).join(', ')+'</b> — '+
        'der Alltag ist bei dir stärker besetzt, als dir lieb ist. Kleine Dinge kosten dort überdurchschnittlich.');
      if(h6) t.push('Der Herrscher deines 6. Hauses ist <b>'+h6.p+'</b> im '+h6.inHaus+'. Haus: '+
        'Dein Alltag hängt an <b>'+H.HT[h6.inHaus-1]+'</b>. Wenn es dort klemmt, klemmt auch das Essen — und umgekehrt.');
      return t.length?t.join(' '):null;
    }],
  uebung:['Eine Stufe senken, nicht alle vier',
   'Schau dir die vier Stufen an — entscheiden, besorgen, zubereiten, aufräumen — und such die eine, an der du am häufigsten hängenbleibst. '+
   'Dann senk <b>nur diese</b>. Wenn Entscheiden klemmt: drei feste Sachen festlegen, die immer gehen. Wenn Zubereiten klemmt: '+
   'etwas kaufen, das keins braucht. Nicht alles gleichzeitig.'],
  rueckfrage:'Hast du deine klemmende Stufe gefunden?',
  coach:{fragen:['An welcher Stelle bleibst du hängen — vor dem Kühlschrank oder vorher?',
   'Was isst du, wenn gar nichts geht?',
   'Woran merkst du, dass du Hunger hast — und wie spät ist es dann?'],
   vorsicht:'<b>Hier keine Mengen, Zeiten, Kalorien oder Pläne — niemals.</b> Sobald Essen mit Zahlen oder Zielen verknüpft wird, kann das bei manchen Menschen ernsthaften Schaden anrichten. Es geht ausschließlich um den Mechanismus. Wenn jemand von Kontrolle, Gewicht, Schuld oder Verzicht spricht, ist das Coaching sofort zu Ende und gehört an eine Fachperson. Und bei rein pflanzlicher Ernährung gehören die Nährstoffwerte ärztlich angeschaut — das ersetzt kein Chart.'}},

 {id:'trinken', worum:'Hier geht es darum, warum Trinken zuverlässig untergeht. Merken tust du es an dem vollen Glas, das seit Stunden neben dir steht.', wozuSchutz:'Nicht zu trinken spart Unterbrechungen und Wege.',
  wozuFrage:'Was unterbrichst du nicht gern — und was kostet dich das am Ende mehr?',
  name:'Trinken',
  frage:'Warum vergesse ich das dauernd?',
  anker:{haeuser:[6], punkte:['Mond','Neptun','Merkur']},
  regeln:[
    function(f,P,H){
      return 'Trinken ist die Sache, die am häufigsten untergeht, weil sie <b>kein eigenes Signal</b> hat, das laut genug wäre. '+
        'Durst wird spät gemeldet und leicht überhört, besonders im Hyperfokus. Und es ist eine Handlung ohne Belohnung — '+
        'nichts fühlt sich danach besser an, jedenfalls nicht sofort. '+
        'Deshalb funktionieren hier <b>Sichtbarkeit und Kopplung</b> besser als jeder Vorsatz.';
    },
    function(f,P,H){
      if(P.Neptun===undefined) return null;
      var hn=H.haus(P.Neptun)+1;
      return 'Dein <b>Neptun im '+hn+'. Haus</b> markiert, wo deine Wahrnehmung unscharf wird — in <b>'+H.HT[hn-1]+'</b>. '+
        'Dort überhörst du Körpersignale am ehesten. Wenn dein Tag viel in diesem Bereich stattfindet, brauchst du etwas Sichtbares, '+
        'nicht etwas Gefühltes.';
    },
    function(f,P,H){
      if(P.Merkur===undefined) return null;
      var zi=Math.floor(P.Merkur/30);
      var el=['Feuer','Erde','Luft','Wasser'][zi%4];
      return 'Dein <b>Merkur in '+H.SIGNS[zi]+'</b> sagt, welche Art von Erinnerung bei dir ankommt: '+
        (el==='Erde'?'etwas Gegenständliches. Die Flasche im Blickfeld wirkt bei dir besser als jede Erinnerung im Handy.'
         :el==='Luft'?'etwas Sichtbares im Umfeld. Mehrere Gläser an verschiedenen Orten funktionieren bei dir gut.'
         :el==='Feuer'?'etwas, das auffällt. Eine große Flasche, die du leer machen willst, ist bei dir eher ein Anreiz als ein Zwang.'
         :'etwas Angenehmes. Bei dir zählt, dass es schmeckt und schön aussieht — Pflichtwasser trinkst du nicht.');
    }],
  uebung:['An etwas hängen, das du ohnehin tust',
   'Koppel das Trinken an eine Handlung, die täglich mehrfach vorkommt: jedes Mal beim Aufstehen vom Schreibtisch, '+
   'bei jedem Gang in die Küche, nach jedem Telefonat. Nicht an eine Uhrzeit — an eine Handlung. '+
   'Das ist der einzige Mechanismus, der bei sprunghafter Aufmerksamkeit zuverlässig funktioniert.'],
  rueckfrage:'Hast du eine Kopplung gefunden?',
  coach:{fragen:['Wann trinkst du von allein?',
   'Was steht gerade in deinem Blickfeld?',
   'Was trinkst du gern — nicht, was du trinken solltest?'],
   vorsicht:'Keine Mengenangaben. Wie viel jemand braucht, hängt von zu vielem ab, und Zahlen erzeugen hier nur Druck.'}},

 {id:'papier', worum:'Hier geht es um den Stapel, der liegen bleibt. Merken tust du es daran, wie lange der ungeöffnete Brief schon da ist.', wozuSchutz:'Ungeöffnete Post enthält keine schlechten Nachrichten.',
  wozuFrage:'Was fürchtest du in dem Stapel — und wie viel davon ist tatsächlich drin?',
  name:'Papierkram und Behörden',
  frage:'Warum liegt das seit Wochen da?',
  anker:{haeuser:[6,3], punkte:['Merkur','Saturn']},
  regeln:[
    function(f,P,H){
      return 'Papierkram ist selten ein Zeitproblem. Er staut sich, weil drei Dinge zusammenkommen: '+
        '<b>keine Rückmeldung</b> (niemand lobt dich für eine bearbeitete Rechnung), <b>unklarer nächster Schritt</b> '+
        '(„Steuer machen" ist keine Handlung, sondern ein Projekt) und <b>Angst vor dem Inhalt</b>. '+
        'Gegen alle drei hilft dasselbe: den Stapel in einzelne, benennbare Handlungen zerlegen — und die kleinste zuerst.';
    },
    function(f,P,H){
      if(P.Saturn===undefined) return null;
      var hn=H.haus(P.Saturn)+1;
      return 'Dein <b>Saturn im '+hn+'. Haus</b> ist deine Verantwortungsstelle. Wenn Papierkram in diesem Bereich liegt, '+
        'ist der Druck besonders hoch — und die Vermeidung auch. Was hilft: nicht mehr Disziplin, sondern ein fester Ort '+
        'und ein fester Anlass, an dem es passiert.';
    },
    function(f,P,H){
      if(P.Merkur===undefined) return null;
      var hn=H.haus(P.Merkur)+1, zi=Math.floor(P.Merkur/30);
      return 'Dein <b>Merkur in '+H.SIGNS[zi]+', '+hn+'. Haus</b> beschreibt, wie du Informationen verarbeitest. '+
        (zi%4===1?'Mit Erde-Merkur kannst du das Konkrete gut — dein Problem ist eher das Anfangen als das Durchhalten.'
         :zi%4===2?'Mit Luft-Merkur brauchst du Übersicht, bevor du loslegst. Erst alles auf einen Tisch, dann sortieren.'
         :zi%4===0?'Mit Feuer-Merkur brauchst du Dringlichkeit. Ohne Frist passiert bei dir wenig — also setz dir künstliche.'
         :'Mit Wasser-Merkur rutschen Formulare bei dir durch. Was hilft: jemanden danebensetzen, der nichts tut außer da sein.');
    },
    function(f,P,H){
      var im3=f.planeten.filter(function(x){return x.haus===3;});
      if(!im3.length) return null;
      return 'Im 3. Haus steht <b>'+im3.map(function(x){return x.p;}).join(', ')+'</b> — Schriftliches und Alltagskram '+
        'sind bei dir stärker besetzt. Das kann heißen, dass du es gut kannst und trotzdem meidest.';
    }],
  uebung:['Die kleinste Handlung benennen',
   'Nimm die Sache, die am längsten liegt, und schreib die <b>allerkleinste nächste Handlung</b> auf. '+
   'Nicht „Steuer machen", sondern „Ordner aus dem Regal holen". Wenn die Handlung noch Angst macht, ist sie zu groß — '+
   'dann zerleg sie nochmal. Das klingt albern und ist der einzige Trick, der bei Vermeidung wirklich greift.'],
  rueckfrage:'Hast du eine kleinste Handlung gefunden?',
  coach:{fragen:['Was liegt am längsten?',
   'Was befürchtest du, wenn du es öffnest?',
   'Was wäre die kleinste Handlung, die dir keine Angst macht?'],
   vorsicht:'Bei ernsthaftem Behördenstau mit Fristen und Folgen reicht Coaching nicht. Dann sind Schuldner- oder Sozialberatung die richtige Adresse — die machen das hauptberuflich und kostenlos.'}},

 {id:'lernen', worum:'Hier geht es darum, warum du dich stundenlang vertiefen kannst und dann wochenlang nicht. Merken tust du es daran, wie oft du eine Stelle nicht wiederfindest.', wozuSchutz:'Solange du nicht anfängst, kannst du nicht merken, dass es schwerfällt.',
  wozuFrage:'Was würde es über dich sagen, wenn du es versuchst und es dauert länger als gedacht?',
  name:'Lernen und Dranbleiben',
  frage:'Warum kann ich mich stundenlang vertiefen — und dann wochenlang nicht?',
  anker:{haeuser:[3,9], punkte:['Merkur','Jupiter','Uranus']},
  regeln:[
    function(f,P,H){
      if(P.Merkur===undefined) return null;
      var zi=Math.floor(P.Merkur/30), hn=H.haus(P.Merkur)+1;
      var el=['Feuer','Erde','Luft','Wasser'][zi%4];
      return 'Dein <b>Merkur in '+H.SIGNS[zi]+', '+hn+'. Haus</b> ist dein Aufnahmeformat: '+
        (el==='Feuer'?'Du brauchst zu wissen, wofür es gut ist, bevor du zuhörst. Ohne Zweck rutscht alles durch.'
         :el==='Erde'?'Du brauchst Konkretes und Anfassbares. Abstraktes musst du dir erst übersetzen — das kostet doppelt.'
         :el==='Luft'?'Du brauchst erst das große Bild, dann die Details. Umgekehrt ermüdest du schnell.'
         :'Du lernst über Bilder und Geschichten. Listen und Aufzählungen bleiben bei dir nicht hängen, Zusammenhänge schon.')+
        ' Das ist keine Vorliebe, sondern eine Verarbeitungsart — alles andere kostet dich Übersetzungsarbeit, die andere nicht leisten müssen.';
    },
    function(f,P,H){
      if(P.Jupiter===undefined) return null;
      var hn=H.haus(P.Jupiter)+1;
      return 'Dein <b>Jupiter im '+hn+'. Haus</b> ('+H.HT[hn-1]+') zeigt, wo du dich verlierst — im guten Sinn. '+
        'Wenn du einen Stoff mit diesem Bereich verknüpfen kannst, brauchst du keine Disziplin. '+
        'Interesse ist bei dir der Schalter, nicht der Wille.';
    },
    function(f,P,H){
      if(P.Uranus===undefined) return null;
      var hn=H.haus(P.Uranus)+1;
      return 'Dein <b>Uranus im '+hn+'. Haus</b> sorgt für Unterbrechungen — dort reißt regelmäßig der Faden. '+
        'Rechne damit, statt dagegen zu arbeiten: Was bei dir hilft, sind kurze Einheiten mit Wiedereinstiegspunkten, '+
        'nicht lange Blöcke, die man einmal verpasst und dann nie wieder aufnimmt.';
    }],
  uebung:['Den Wiedereinstieg vorbereiten',
   'Wenn du das nächste Mal aufhörst zu lernen, schreib <b>einen Satz auf, wie es weitergeht</b>. '+
   'Nicht was du gelernt hast — was der nächste Schritt ist. Das Problem bei sprunghafter Aufmerksamkeit ist nie das Lernen, '+
   'sondern das Wiederfinden der Stelle. Wer die Stelle markiert, kommt zurück.'],
  rueckfrage:'Hast du einen Wiedereinstieg vorbereitet?',
  coach:{fragen:['Wobei vergisst du die Zeit?',
   'Was hast du dir selbst beigebracht, ohne dass es jemand verlangt hat?',
   'Woran scheitert es — am Anfangen oder am Wiederfinden?'],
   vorsicht:'Nicht auf Durchhalten hinarbeiten. Bei schwankender Kapazität ist Dranbleiben das falsche Ziel — Wiederaufnehmen ist das richtige.'}},

 {id:'haushalt', worum:'Hier geht es darum, warum sich alles aufstaut. Merken tust du es daran, dass Aufräumen sich nach mehr Entscheidungen anfühlt als nach Arbeit.', wozuSchutz:'Solange nichts aufgeräumt ist, muss auch nichts ordentlich bleiben.',
  wozuFrage:'Was müsstest du dir zutrauen, wenn deine Wohnung in Ordnung wäre?',
  name:'Haushalt und Wohnung',
  frage:'Warum staut sich das immer wieder auf?',
  anker:{haeuser:[4,6], punkte:['Mond','Venus','Saturn']},
  regeln:[
    function(f,P,H){
      return 'Unordnung ist bei anders verdrahteten Menschen fast nie Faulheit. Sie entsteht, weil Aufräumen '+
        '<b>viele kleine Entscheidungen</b> verlangt — und Entscheiden ist genau das, was knapp ist. '+
        'Dazu kommt, dass Dinge, die man nicht sieht, für manche Köpfe nicht existieren: Was im Schrank verschwindet, ist weg. '+
        'Deshalb funktionieren offene Ablagen bei vielen besser als perfekte Ordnungssysteme.';
    },
    function(f,P,H){
      if(P.Mond===undefined) return null;
      var zi=Math.floor(P.Mond/30);
      var el=['Feuer','Erde','Luft','Wasser'][zi%4];
      return 'Dein <b>Mond in '+H.SIGNS[zi]+'</b> sagt, was du zum Zurruhekommen brauchst: '+
        (el==='Feuer'?'Bewegungsfreiheit und Farbe. Zu aufgeräumt wirkt auf dich leblos — dir reicht ein freier Weg, nicht ein leerer Raum.'
         :el==='Erde'?'Ordnung und Haptik. Chaos kostet dich mehr Kraft als andere, und Aufräumen gibt dir tatsächlich etwas zurück.'
         :el==='Luft'?'Luft, Licht, Übersicht. Bei dir ist nicht die Menge das Problem, sondern die Unübersichtlichkeit.'
         :'einen Rückzugsort. Du brauchst nicht die ganze Wohnung ordentlich — du brauchst eine Ecke, die stimmt.');
    },
    function(f,P,H){
      var h4=f.herrscher.filter(function(x){return x.haus===4;})[0];
      if(!h4) return null;
      return 'Der Herrscher deines 4. Hauses ist <b>'+h4.p+'</b> im '+h4.inHaus+'. Haus. '+
        'Zuhause-Gefühl entsteht bei dir über <b>'+H.HT[h4.inHaus-1]+'</b> — wenn das fehlt, hilft auch eine aufgeräumte Wohnung nicht.';
    }],
  uebung:['Eine Fläche, nicht ein Zimmer',
   'Such dir eine einzige Fläche und halt nur diese frei — den Esstisch, die Küchenarbeitsplatte, ein Regalbrett. '+
   'Nicht mehr. Eine freie Fläche im Blickfeld verändert das Gefühl eines Raums erstaunlich stark, und sie kostet '+
   'ein Zehntel der Energie eines aufgeräumten Zimmers.'],
  rueckfrage:'Hast du eine Fläche freigehalten?',
  coach:{fragen:['In welchem Raum fühlst du dich am wohlsten?',
   'Was stört dich täglich und du machst nichts?',
   'Wie sah Ordnung bei euch früher aus — und wessen Maßstab benutzt du heute?'],
   vorsicht:'Wenn Unordnung so weit geht, dass sie Gesundheit oder Wohnung gefährdet, ist das kein Ordnungsthema mehr und gehört begleitet. Und Scham darüber ist fast immer größer als das Problem selbst.'}},

 {id:'schlaf', worum:'Hier geht es darum, warum du nicht ins Bett gehst, obwohl du müde bist. Merken tust du es daran, was du stattdessen machst.', wozuSchutz:'Die Stunden nach Mitternacht sind oft die einzigen, über die du wirklich selbst bestimmst.',
  wozuFrage:'Was holst du dir nachts, das dir tagsüber fehlt?',
  name:'Schlaf und Abschalten',
  frage:'Warum gehe ich nicht ins Bett, obwohl ich müde bin?',
  anker:{haeuser:[12,4], punkte:['Mond','Uranus','Merkur','Neptun']},
  regeln:[
    function(f,P,H){
      return 'Das Phänomen hat einen Namen: <b>aufgeschobene Nachtruhe aus Trotz</b>. Wer den ganzen Tag funktioniert hat, '+
        'holt sich abends die Zeit zurück, die ihm gehört — auch auf Kosten des Schlafs. Das ist keine Willensschwäche, '+
        'sondern eine nachvollziehbare Rechnung. Wer das erkennt, kann an der richtigen Stelle ansetzen: '+
        'nicht am Abend, sondern an dem, was im Tag fehlt.';
    },
    function(f,P,H){
      if(P.Mond===undefined) return null;
      var hn=H.haus(P.Mond)+1, zi=Math.floor(P.Mond/30);
      return 'Dein <b>Mond in '+H.SIGNS[zi]+', '+hn+'. Haus</b> sagt, was bei dir erfüllt sein muss, damit Ruhe möglich ist: '+
        '<b>'+H.HT[hn-1]+'</b>. Wenn es dort wackelt, findest du abends nicht runter — und keine Einschlafroutine der Welt ändert das.';
    },
    function(f,P,H){
      var mu=f.aspekte.filter(function(x){return (x.a==='Mond'||x.b==='Mond')&&(x.a==='Uranus'||x.b==='Uranus');})[0];
      if(mu) return '<b>Mond '+mu.typ+' Uranus</b> mit '+mu.o.toFixed(1)+'°. Dein Nervensystem fährt spät herunter und sprunghaft hoch. '+
        'Was dir mehr hilft als jedes Abendritual: eine <b>feste Aufstehzeit</b>. Sie stabilisiert den Rhythmus zuverlässiger '+
        'als alles, was man abends tut — und ist die am besten belegte Schlafmaßnahme überhaupt.';
      var mm=f.aspekte.filter(function(x){return (x.a==='Mond'||x.b==='Mond')&&(x.a==='Merkur'||x.b==='Merkur');})[0];
      if(mm) return '<b>Mond '+mm.typ+' Merkur</b> mit '+mm.o.toFixed(1)+'°. Bei dir hängt Abschalten am Denken. '+
        'Was unsortiert ist, läuft nachts weiter. Aufschreiben hilft dir mehr als Entspannungsübungen — nicht als Technik, '+
        'sondern weil es den Kopf entlastet.';
      return null;
    },
    function(f,P,H){
      var im12=f.planeten.filter(function(x){return x.haus===12;});
      if(!im12.length) return null;
      return 'Im 12. Haus steht <b>'+im12.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Der Übergang in die Nacht braucht bei dir länger als bei anderen — eher eine Stunde als zehn Minuten. '+
        'Das einzuplanen ist wirksamer, als es zu bekämpfen.';
    }],
  uebung:['Den Tag prüfen, nicht den Abend',
   'Frag dich eine Woche lang abends nur eins: <b>Hatte ich heute Zeit für mich?</b> Wenn die Antwort oft nein ist, '+
   'liegt dein Schlafproblem nicht am Abend. Dann ist die Aufgabe, tagsüber etwas zurückzuerobern — nicht, früher ins Bett zu gehen.'],
  rueckfrage:'Hast du eine Woche lang nachgefragt?',
  coach:{fragen:['Was machst du abends, wenn du eigentlich schlafen wolltest?',
   'Hattest du an dem Tag Zeit für dich?',
   'Was war in Phasen anders, in denen du gut geschlafen hast?'],
   vorsicht:'Anhaltende Schlafstörungen sind medizinisch, nicht astrologisch. Nach ein paar Wochen gehört das abgeklärt — es gibt dafür gute, gut untersuchte Behandlungen.'}}

 ]
}; 
    return {RAUM:RAUM, WOZU:(typeof WOZU!=='undefined')?WOZU:{}}; })()
};

/* ── Der wunde Punkt · Themenraum · Astro-Charlie ─────────────────────────────── */
R_RAEUME['wunder-punkt'] = {
  adler: true,
  zeitschiene: false,
  titel: "Der wunde Punkt · Themenraum · Astro-Charlie",
  h1: "Der wunde Punkt.",
  frage: "„Warum trifft mich das jedes Mal so?\"",
  intro: "Es gibt bei fast jedem Menschen eine Stelle, an der Kleinigkeiten unverhältnismäßig wehtun. Man kennt sie, man schämt sich ein bisschen dafür, und man erklärt sie sich mit Empfindlichkeit. Im Chart hat diese Stelle einen Ort — Chiron. Sechs Facetten: wo es sitzt, was du deshalb vermeidest, womit du es überdeckst, was tatsächlich hilft, warum andere dir ausgerechnet das glauben, und wann es zurückkommt.",
  weiter: "<div class=\"weiter\"><a href=\"raeume.html\"><span class=\"lbl\">&larr; Zur&uuml;ck</span><span class=\"ttl\">Alle R&auml;ume</span></a><a href=\"asteroiden.html\" class=\"nx\"><span class=\"lbl\">Passt dazu &rarr;</span><span class=\"ttl\">Die Asteroiden</span></a></div>",
  fuss: "Themenraum Der wunde Punkt &middot; Gewichtung aus deinem Chart, im Browser gerechnet. Selbstarbeit und Coaching &mdash; keine Therapie.",
  def: (function(){ var RAUM = {
 name:'Der wunde Punkt',
 slug:'wunder-punkt',
 sortierTitel:'Wie dein wunder Punkt bei dir arbeitet',
 facetten:[
 {id:'wunde', worum:'Hier geht es um die Stelle, an der dich Kleinigkeiten unverhältnismäßig treffen. Merken tust du es daran, dass du hinterher denkst: Warum hat mich das so mitgenommen?', wozuSchutz:'Empfindlich zu bleiben hält dich wachsam — du siehst die Gefahr, bevor sie da ist.', wozuFrage:'Wovor hat dich diese Empfindlichkeit schon bewahrt?', name:'Wo es zuverlässig wehtut',
  frage:'Warum trifft mich das jedes Mal so?',
  anker:{haeuser:[], punkte:['Chiron','Sonne','Mond','ASC']},
  regeln:[
    function(f,P,H){
      if(P.Chiron===undefined||P.Chiron===null) return null;
      var hn=H.haus(P.Chiron)+1, zi=Math.floor(P.Chiron/30);
      return 'Dein <b>Chiron in '+H.SIGNS[zi]+', '+hn+'. Haus</b> ('+H.fmt(P.Chiron)+'). '+
        'Das ist die Stelle, an der dich Kleinigkeiten härter treffen, als sie sollten — in <b>'+H.HT[hn-1]+'</b>. '+
        'Nicht weil du empfindlich bist, sondern weil dort früh etwas nicht gepasst hat und seitdem jeder Anstoß auf dieselbe Stelle geht.';
    },
    function(f,P,H){
      if(P.Chiron===undefined||P.Chiron===null) return null;
      var zi=Math.floor(P.Chiron/30);
      var T=['deine Durchsetzung — du wirktest zu viel oder zu wenig, nie richtig',
       'deinen Wert und deine Sicherheit — es fühlte sich an, als stünde dir weniger zu',
       'deine Stimme — was du sagtest, kam nicht an oder wurde falsch verstanden',
       'dein Bedürfnis nach Zuhause — Zugehörigkeit war nicht selbstverständlich',
       'dein Gesehenwerden — Aufmerksamkeit gab es nicht einfach so',
       'dein Genügen — du warst nicht ganz richtig, wie du warst',
       'dein Recht auf Zuwendung — du warst die, die sich anpasst',
       'deine Tiefe und dein Vertrauen — etwas wurde dir früh genommen',
       'deinen Glauben an Sinn — was tragen sollte, trug nicht',
       'deine Leistung — Anerkennung war an Bedingungen geknüpft',
       'deine Zugehörigkeit — du warst irgendwie außen',
       'deine Grenzen — du hast dich früh aufgelöst in dem, was andere brauchten'];
      return 'Im Zeichen '+H.SIGNS[zi]+' geht es dabei um <b>'+T[zi]+'</b>. '+
        'Das ist die Grundfarbe der Empfindlichkeit — sie taucht in ganz verschiedenen Situationen im selben Muster auf.';
    },
    function(f,P,H){
      if(P.Chiron===undefined||P.Chiron===null) return null;
      var eng=f.aspekte.filter(function(x){return (x.a==='Chiron'||x.b==='Chiron')&&x.o<4;});
      if(!eng.length) return 'Chiron bildet bei dir keinen engen Aspekt zu deinen persönlichen Punkten. '+
        'Das Thema ist vorhanden, aber nicht dauernd aktiv — es meldet sich eher anlassbezogen als im Hintergrund.';
      return 'Chiron hängt bei dir eng an <b>'+eng.map(function(x){
        var and=(x.a==='Chiron')?x.b:x.a; return and+' ('+x.typ+', '+x.o.toFixed(1)+'°)';}).join(', ')+'</b>. '+
        'Das heißt: Die wunde Stelle ist mit diesen Funktionen verdrahtet — sie meldet sich immer dann, wenn dort etwas passiert.';
    }],
  uebung:['Den Auslöser benennen, nicht die Reaktion',
   'Wenn dich diese Woche etwas unverhältnismäßig trifft, schreib nicht auf, wie du reagiert hast — sondern was genau der Auslöser war. Ein Satz, ein Blick, ein Ausbleiben. Je genauer der Auslöser, desto weniger Macht hat er beim nächsten Mal.'],
  rueckfrage:'Hast du einen Auslöser genau benennen können?',
  coach:{fragen:['Was trifft dich härter, als es objektiv sollte?',
   'Wann hast du dieses Gefühl zum ersten Mal gehabt?',
   'Was sagst du dir selbst, wenn es passiert?'],
   vorsicht:'Chiron beschreibt Empfindlichkeit, nicht Trauma. Wenn konkrete Gewalt- oder Missbrauchserfahrungen auftauchen, ist das kein Coaching-Thema mehr — benennen, würdigen, verweisen.'}},

 {id:'vermeidung', worum:'Hier geht es um das, worum du seit Jahren einen Bogen machst. Merken tust du es an den guten Gründen, die dir dafür immer sofort einfallen.', wozuSchutz:'Was man nicht anfasst, kann nicht wehtun.', wozuFrage:'Was ist dein bester Grund, es zu vermeiden — und stimmt er noch?', name:'Was du deshalb vermeidest',
  frage:'Wovor mache ich seit Jahren einen Bogen?',
  anker:{haeuser:[12], punkte:['Chiron','Saturn','Neptun']},
  regeln:[
    function(f,P,H){
      if(P.Chiron===undefined||P.Chiron===null) return null;
      var hn=H.haus(P.Chiron)+1;
      return 'Weil Chiron im '+hn+'. Haus steht, vermeidest du wahrscheinlich Situationen, in denen <b>'+H.HT[hn-1]+'</b> '+
        'auf dem Spiel steht. Nicht bewusst — du hast vermutlich gute Gründe parat, warum du gerade dort nicht hingehst. '+
        'Die Gründe stimmen meistens sogar. Sie sind nur nicht der Grund.';
    },
    function(f,P,H){
      var im12=f.planeten.filter(function(x){return x.haus===12;});
      if(!im12.length) return null;
      return 'Im 12. Haus steht <b>'+im12.map(function(x){return x.p;}).join(', ')+'</b> — Anteile, die du selbst schlecht siehst. '+
        'Vermeidung sitzt oft genau dort: Man merkt sie erst, wenn jemand anderes darauf zeigt.';
    },
    function(f,P,H){
      if(P.Saturn===undefined) return null;
      var sc=f.aspekte.filter(function(x){return ((x.a==='Saturn'&&x.b==='Chiron')||(x.a==='Chiron'&&x.b==='Saturn'));})[0];
      if(!sc) return null;
      return '<b>Saturn '+sc.typ+' Chiron</b> mit '+sc.o.toFixed(1)+'°. Die Vermeidung ist bei dir gut begründet und gut organisiert. '+
        'Du hast Strukturen gebaut, die verhindern, dass du an die Stelle kommst — und hältst sie für Vernunft.';
    }],
  uebung:['Eine kleine Annäherung',
   'Wähl eine Situation, um die du normalerweise einen Bogen machst, und geh diese Woche fünf Prozent näher heran. Nicht hinein — näher. Eine Nachricht statt eines Anrufs, ein Blick in die Akte statt sie zu öffnen. Der erste Schritt ist der ganze Punkt.'],
  rueckfrage:'Bist du einmal näher herangegangen?',
  coach:{fragen:['Was schiebst du seit Jahren auf?',
   'Welche Begründung benutzt du dafür — und stimmt sie?',
   'Was wäre das Schlimmste, wenn du es tätest?'],
   vorsicht:'Nicht zum Konfrontieren drängen. Vermeidung hat oft gute Gründe, und Tempo bestimmt die Person.'}},

 {id:'ueberkompensation', worum:'Hier geht es darum, wo du dich mehr anstrengst als nötig. Merken tust du es daran, dass Lob in diesem Bereich bei dir nicht ankommt.', wozuSchutz:'Übermäßig gut zu sein hält den Zweifel auf Abstand — und wird belohnt.', wozuFrage:'Was käme hoch, wenn du dort nur normal gut wärst?', name:'Womit du es überdeckst',
  frage:'Wo strenge ich mich zu sehr an?',
  anker:{haeuser:[10,6], punkte:['Chiron','Saturn','Sonne','Mars']},
  regeln:[
    function(f,P,H){
      if(P.Chiron===undefined||P.Chiron===null) return null;
      var hn=H.haus(P.Chiron)+1;
      return 'Die häufigste Reaktion auf eine wunde Stelle ist nicht Rückzug, sondern <b>Übertreibung in dieselbe Richtung</b>. '+
        'Bei Chiron im '+hn+'. Haus heißt das: In <b>'+H.HT[hn-1]+'</b> bist du wahrscheinlich besser als nötig — '+
        'gründlicher, verlässlicher, kompetenter. Und trotzdem reicht es dir nie.';
    },
    function(f,P,H){
      var cs=f.aspekte.filter(function(x){return (x.a==='Chiron'||x.b==='Chiron')&&(x.a==='Sonne'||x.b==='Sonne'||x.a==='Mars'||x.b==='Mars');})[0];
      if(!cs) return null;
      var and=(cs.a==='Chiron')?cs.b:cs.a;
      return '<b>Chiron '+cs.typ+' '+and+'</b> mit '+cs.o.toFixed(1)+'°. Deine '+
        (and==='Sonne'?'Identität':'Tatkraft')+' ist direkt mit der wunden Stelle verbunden. '+
        'Das ist der Grund, warum du dich dort so anstrengst: Es geht nicht um die Sache, es geht um dich.';
    },
    function(f,P,H){
      var im10=f.planeten.filter(function(x){return x.haus===10;});
      if(!im10.length) return null;
      return 'Im 10. Haus steht <b>'+im10.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Öffentliche Leistung ist bei dir ein möglicher Ort für Überkompensation — dort bekommt man sie auch belohnt, '+
        'was es schwerer macht, sie zu bemerken.';
    }],
  uebung:['Einmal nur 80 Prozent',
   'Mach diese Woche eine Sache bewusst nur zu 80 Prozent fertig — in genau dem Bereich, in dem du normalerweise übergründlich bist. Schau, ob es jemandem auffällt. Meistens nicht. Das ist die Information.'],
  rueckfrage:'Hast du einmal bei 80 Prozent aufgehört?',
  coach:{fragen:['Wo bist du besser, als du sein müsstest?',
   'Was passiert, wenn du dort einmal nachlässt?',
   'Für wen strengst du dich eigentlich an?'],
   vorsicht:'Überkompensation nicht als Fehler behandeln. Sie hat jemanden durch schwierige Jahre gebracht und verdient Respekt, bevor man sie hinterfragt.'}},

 {id:'heilsam', worum:'Hier geht es darum, was dir tatsächlich hilft, wenn es dich erwischt hat. Merken tust du es daran, was du in solchen Momenten stattdessen machst — und ob es hilft.', wozuSchutz:'Nichts anzunehmen schützt davor, sich abhängig zu fühlen.', wozuFrage:'Was hättest du zu verlieren, wenn jemand dich in diesem Zustand sieht?', name:'Was tatsächlich hilft',
  frage:'Was lindert das, ohne es wegzumachen?',
  anker:{haeuser:[], punkte:['Venus','Jupiter','Mond','Chiron']},
  regeln:[
    function(f,P,H){
      if(P.Chiron===undefined||P.Chiron===null) return null;
      var weich=f.aspekte.filter(function(x){return (x.a==='Chiron'||x.b==='Chiron')&&x.art==='weich'&&x.o<5;});
      if(!weich.length) return 'Chiron hat bei dir keinen weichen Aspekt. Es gibt also keinen eingebauten Ausweg — '+
        'Erleichterung entsteht bei dir über Beziehung und Zeit, nicht über eine Begabung, die das abfedert.';
      return 'Chiron bildet bei dir weiche Aspekte zu <b>'+weich.map(function(x){
        var and=(x.a==='Chiron')?x.b:x.a; return and+' ('+x.typ+')';}).join(', ')+'</b>. '+
        'Das ist der eingebaute Weg: Über diese Funktionen kommst du an die wunde Stelle heran, ohne dich zu überfordern. '+
        'Nicht über mehr Anstrengung — über das, was dort ohnehin leicht läuft.';
    },
    function(f,P,H){
      if(P.Jupiter===undefined) return null;
      var hn=H.haus(P.Jupiter)+1;
      return 'Dein <b>Jupiter im '+hn+'. Haus</b> ist die Ressource: In <b>'+H.HT[hn-1]+'</b> fällt dir etwas zu, '+
        'ohne dass du kämpfen musst. Das ist der Ort, an dem du auftanken kannst, wenn die wunde Stelle laut wird.';
    },
    function(f,P,H){
      if(P.Venus===undefined) return null;
      var hn=H.haus(P.Venus)+1;
      return 'Deine <b>Venus im '+hn+'. Haus</b> zeigt, worüber du dich trösten lässt: über <b>'+H.HT[hn-1]+'</b>. '+
        'Nicht über Argumente — Chiron reagiert nicht auf Argumente.';
    }],
  uebung:['Eine Sache tun, die guttut, während es wehtut',
   'Wenn dich diese Woche etwas trifft, mach danach bewusst eine Sache, die dir guttut — ohne das Gefühl zu bekämpfen oder zu erklären. Beides gleichzeitig. Es geht nicht ums Wegmachen, es geht darum, dass es nicht allein steht.'],
  rueckfrage:'Hast du beides gleichzeitig gemacht?',
  coach:{fragen:['Was hilft dir, wenn es dich erwischt hat?',
   'Wer kann bei dir bleiben, ohne es lösen zu wollen?',
   'Was brauchst du in so einem Moment — und sagst du es?'],
   vorsicht:'Nicht auf Heilung hinarbeiten. Chiron heilt nicht restlos aus. Das Ziel ist Umgang, nicht Verschwinden.'}},

 {id:'lehrerin', worum:'Hier geht es darum, warum Menschen mit genau diesem Thema zu dir kommen. Merken tust du es daran, wofür du gefragt wirst, ohne dafür geworben zu haben.', wozuSchutz:'Über andere zu sprechen ist leichter, als selbst betroffen zu sein.', wozuFrage:'Was ändert sich, wenn du zugibst, dass es auch deine Geschichte ist?', name:'Warum andere dir das glauben',
  frage:'Wieso kommen Menschen damit ausgerechnet zu mir?',
  anker:{haeuser:[11,9], punkte:['Chiron','Jupiter','Merkur']},
  regeln:[
    function(f,P,H){
      if(P.Chiron===undefined||P.Chiron===null) return null;
      var hn=H.haus(P.Chiron)+1;
      return 'Der zweite Teil von Chiron ist der brauchbarere: Wo du selbst verletzt bist, verstehst du andere ohne Erklärung. '+
        'Bei dir betrifft das <b>'+H.HT[hn-1]+'</b>. Menschen mit ähnlichen Themen spüren das und kommen zu dir — '+
        'meistens ohne dass du etwas dafür tust.';
    },
    function(f,P,H){
      var im11=f.planeten.filter(function(x){return x.haus===11;});
      var im9=f.planeten.filter(function(x){return x.haus===9;});
      var t=[];
      if(im11.length) t.push('Im 11. Haus steht <b>'+im11.map(function(x){return x.p;}).join(', ')+'</b> — deine Wirkung entfaltet sich über Gruppen und Gleichgesinnte.');
      if(im9.length) t.push('Im 9. Haus steht <b>'+im9.map(function(x){return x.p;}).join(', ')+'</b> — Lehren und Vermitteln liegen dir.');
      return t.length?t.join(' '):null;
    },
    function(f,P,H){
      if(P.Chiron===undefined||P.Chiron===null) return null;
      var cm=f.aspekte.filter(function(x){return ((x.a==='Chiron'&&x.b==='Merkur')||(x.a==='Merkur'&&x.b==='Chiron'));})[0];
      if(!cm) return null;
      return '<b>Chiron '+cm.typ+' Merkur</b> mit '+cm.o.toFixed(1)+'°. Du kannst das Thema in Worte fassen — '+
        'das ist die Voraussetzung dafür, aus einer wunden Stelle etwas zu machen, das anderen hilft.';
    }],
  uebung:['Einmal von der Stelle erzählen',
   'Erzähl diese Woche einer Person von genau dieser Stelle — nicht als Problem, sondern als Erfahrung. „Ich kenne das, weil…" Beobachte, was das mit dem Gespräch macht. Meistens wird es ehrlicher, nicht peinlicher.'],
  rueckfrage:'Hast du davon erzählt?',
  coach:{fragen:['Wofür kommen Menschen zu dir, ohne dass du geworben hast?',
   'Welches Problem kennst du so gut, weil du es selbst hattest?',
   'Was hättest du damals gebraucht, das du heute geben kannst?'],
   vorsicht:'Aus eigener Betroffenheit wird nur dann Kompetenz, wenn genug Abstand da ist. Wer mitten drin steckt, sollte nicht begleiten.'}},

 {id:'zyklus', worum:'Hier geht es darum, warum dasselbe Thema alle paar Jahre zurückkommt. Merken tust du es daran, dass ein altes Gefühl mit neuem Anlass auftaucht.', wozuSchutz:'Es als Schicksal zu sehen erspart die Frage, was man beim nächsten Mal anders macht.', wozuFrage:'Was könntest du beim nächsten Durchgang anders machen — und was hält dich davon ab?', name:'Wann es wieder aufbricht',
  frage:'Warum kommt das alle paar Jahre zurück?',
  anker:{haeuser:[], punkte:['Chiron','Saturn']},
  regeln:[
    function(f,P,H){
      return 'Chiron braucht rund <b>50 Jahre</b> für einen Umlauf und läuft dabei sehr ungleichmäßig. '+
        'Deshalb kommen die Berührungen nicht in festen Abständen, sondern in Schüben. '+
        'Die bekanntesten Stationen: das Quadrat um <b>Anfang 20</b>, die Opposition um <b>Ende 30 bis Anfang 40</b>, '+
        'und die <b>Chiron-Rückkehr mit etwa 50</b> — die letzte ist meistens die klärendste.';
    },
    function(f,P,H){
      if(P.Chiron===undefined||P.Chiron===null) return null;
      var hn=H.haus(P.Chiron)+1;
      return 'Wenn es bei dir aufbricht, betrifft es <b>'+H.HT[hn-1]+'</b>. '+
        'Du erkennst solche Phasen daran, dass ein altes Gefühl mit neuem Anlass zurückkommt — '+
        'die Situation ist neu, das Gefühl kennst du seit Jahrzehnten.';
    },
    function(f,P,H){
      if(P.Saturn===undefined) return null;
      return 'Parallel dazu läuft Saturn: erste Rückkehr um <b>29</b>, Opposition um <b>44</b>, zweite Rückkehr um <b>58</b>. '+
        'Wenn beide Zyklen zusammenfallen, wird eine Phase deutlich schwerer — und deutlich fruchtbarer. '+
        'Genaue Termine findest du unter <a href="planeten.html#zyklen">Planetenzyklen</a>.';
    }],
  uebung:['Rückwärts schauen',
   'Denk an das letzte Mal, als dieses Thema laut war. Wie alt warst du? Was war der Anlass? Und wie ist es damals abgeklungen — von allein, durch eine Entscheidung, durch einen Menschen? Was damals geholfen hat, hilft mit hoher Wahrscheinlichkeit wieder.'],
  rueckfrage:'Hast du die letzte Phase wiedergefunden?',
  coach:{fragen:['Wann war dieses Thema zuletzt laut?',
   'Was hat es damals beruhigt?',
   'Was ist seitdem anders geworden?'],
   vorsicht:'Zyklen nicht als Vorhersage verkaufen. Sie beschreiben Wiederkehr von Themen, nicht von Ereignissen.'}}

 ]
}; var WOZU={"wunde": ["Die Empfindlichkeit zu kennen hat einen Nutzen: Du siehst Gefahr früher als andere und kannst ausweichen, bevor es wehtut.", "Was würdest du übersehen, wenn diese Stelle nicht mehr so empfindlich wäre?"], "vermeidung": ["Der Bogen schützt zuverlässig — das ist kein Fehler, das ist Erfolg. Er kostet nur den Bereich, den er ausspart.", "Was hast du dadurch nie erlebt — und ist dieser Preis noch angemessen?"], "ueberkompensation": ["Die Überanstrengung bringt echte Ergebnisse. Sie ist der Grund, warum du in diesem Bereich gut bist.", "Was würdest du verlieren, wenn du dort nur noch normal gut wärst?"], "heilsam": ["Nicht nach Erleichterung zu suchen hält die Sache vertraut. Wer sich daran gewöhnt hat, muss nichts Neues lernen.", "Was müsstest du aufgeben, wenn es dir an dieser Stelle besser ginge?"], "lehrerin": ["Für andere da zu sein lenkt von der eigenen Stelle ab — und wird dabei noch geschätzt.", "Wo müsstest du selbst hinschauen, wenn du gerade niemanden begleitest?"], "zyklus": ["Die Wiederkehr als Schicksal zu sehen entlastet. Wenn es zyklisch kommt, muss man nichts tun.", "Was läge bei dir, wenn du die nächste Phase nicht nur abwartest?"]};

    return {RAUM:RAUM, WOZU:(typeof WOZU!=='undefined')?WOZU:{}}; })()
};

/* ── Zugehörigkeit · Themenraum · Astro-Charlie ─────────────────────────────── */
R_RAEUME['zugehoerigkeit'] = {
  adler: true,
  zeitschiene: false,
  titel: "Zugehörigkeit · Themenraum · Astro-Charlie",
  h1: "Zugehörigkeit.",
  frage: "&bdquo;Warum fühle ich mich überall ein bisschen außen?&ldquo;",
  intro: "Man kann viele Menschen kennen und trotzdem nirgends ganz dazugehören. Dieser Raum schaut sich an, wie du in Gruppen bist, was dich das Dazugehören kostet, wie deine Freundschaften funktionieren, welche Rolle dir zufällt, woher das Fremdheitsgefühl kommt — und wofür du tatsächlich gebraucht wirst. Sechs Facetten, gewichtet nach deinem Chart.",
  weiter: "<div class=\"weiter\"><a href=\"raeume.html\"><span class=\"lbl\">&larr; Zur&uuml;ck</span><span class=\"ttl\">Alle R&auml;ume</span></a><a href=\"raum-anders-verdrahtet.html\" class=\"nx\"><span class=\"lbl\">Passt dazu &rarr;</span><span class=\"ttl\">Anders verdrahtet</span></a></div>",
  fuss: "Themenraum Zugehörigkeit &middot; Gewichtung aus deinem Chart, im Browser gerechnet. Selbstarbeit und Coaching &mdash; keine Therapie.",
  def: (function(){ var RAUM = {
 name:'Zugehörigkeit',
 slug:'zugehoerigkeit',
 sortierTitel:'Wo deine Zugehörigkeitsfrage sitzt',
 facetten:[
 {id:'gruppe', worum:'Hier geht es darum, wie du dich in Gruppen verhältst. Merken tust du es daran, wie oft du etwas denkst und nicht sagst, weil alle nicken.', wozuSchutz:'Mitzumachen sichert den Platz. Widerspruch könnte ihn kosten.', wozuFrage:'Was fürchtest du zu verlieren, wenn du in einer Gruppe nicht mitgehst?', name:'Wie du in Gruppen bist',
  frage:'Warum bin ich dabei und trotzdem außen?',
  anker:{haeuser:[11], punkte:['Uranus','Saturn','Sonne']},
  regeln:[
    function(f,P,H){
      var im11=f.planeten.filter(function(x){return x.haus===11;});
      if(!im11.length) return 'Dein 11. Haus ist unbesetzt. Gruppen sind bei dir kein Dauerthema — '+
        'du brauchst sie weniger als andere. Das macht dich unabhängiger und lässt dich manchmal übersehen, '+
        'dass Anschluss auch eine Ressource ist.';
      return 'Im 11. Haus — Gruppen, Gleichgesinnte, gemeinsame Ziele — steht <b>'+
        im11.map(function(x){return x.p+' ('+H.fmt(x.pos)+')';}).join(', ')+'</b>. '+
        'Diese Funktionen zeigst du in Gemeinschaft zuerst. Sie sind auch der Grund, warum Gruppen dich stärker beschäftigen als andere.';
    },
    function(f,P,H){
      var h=f.herrscher.filter(function(x){return x.haus===11;})[0];
      if(!h) return null;
      return 'Der Herrscher deines 11. Hauses ist <b>'+h.p+'</b> im '+h.inHaus+'. Haus. '+
        '<b>Zugang zu Gruppen bekommst du über '+H.HT[h.inHaus-1]+'</b> — nicht über Geselligkeit, '+
        'sondern über diesen Bereich. Wo du dort auftauchst, findest du Anschluss.';
    },
    function(f,P,H){
      if(P.Uranus===undefined) return null;
      var hn=H.haus(P.Uranus)+1;
      if(hn!==11) return null;
      return '<b>Uranus im 11. Haus.</b> Du bist die, die nicht ganz mitmacht — und zahlst dafür mit Zugehörigkeit. '+
        'Das ist kein Charakterfehler: In Gruppen, die Abweichung aushalten, bist du wertvoll. In anderen bist du anstrengend. '+
        'Die Frage ist die Gruppe, nicht du.';
    },
    function(f,P,H){
      var su=f.aspekte.filter(function(x){return (x.a==='Sonne'||x.b==='Sonne')&&(x.a==='Uranus'||x.b==='Uranus');})[0];
      if(!su) return null;
      return '<b>Sonne '+su.typ+' Uranus</b> mit '+su.o.toFixed(1)+'°. Dazugehören und du selbst bleiben stehen bei dir '+
        (su.art==='hart'?'in Spannung. Du spürst früh, wann Anpassung zu teuer wird — manchmal früher, als nötig wäre.'
                        :'in gutem Verhältnis. Du kannst eigen sein und trotzdem dabei — das ist selten.');
    }],
  uebung:['Einmal widersprechen, während alle nicken',
   'Sag diese Woche in einer Gruppe einmal etwas, das nicht zur Stimmung passt. Nicht konfrontativ — nur ehrlich. Beobachte, was tatsächlich passiert. Meistens weniger, als du befürchtest, und oft ist jemand erleichtert.'],
  rueckfrage:'Hast du einmal widersprochen?',
  coach:{fragen:['In welcher Gruppe bist du am ehesten du selbst?',
   'Was tust du in Gruppen automatisch, ohne es zu wollen?',
   'Wann hast du zuletzt eine Gruppe verlassen — und warum wirklich?'],
   vorsicht:'Nicht auf mehr Geselligkeit hinarbeiten. Manche Menschen brauchen weniger Gruppe, nicht mehr, und das ist in Ordnung.'}},

 {id:'anpassen', worum:'Hier geht es um den Preis des Dazugehörens. Merken tust du es daran, wie leer du nach einem Treffen bist, das eigentlich schön war.', wozuSchutz:'Die angepasste Version wird gemocht. Die echte müsste es erst beweisen.', wozuFrage:'Wer würde bleiben, wenn du dich nicht anpasst — und woher weißt du das?', name:'Was dich das Dazugehören kostet',
  frage:'Wie viel von mir gebe ich dafür auf?',
  anker:{haeuser:[1,12], punkte:['Lilith','Saturn','Neptun','ASC']},
  regeln:[
    function(f,P,H){
      if(P.Lilith===undefined||P.Lilith===null) return null;
      var hn=H.haus(P.Lilith)+1;
      return 'Deine <b>Lilith im '+hn+'. Haus</b> zeigt, was du dir nicht erlaubst — in <b>'+H.HT[hn-1]+'</b>. '+
        'In Gruppen ist das genau der Teil, den du zurücknimmst, um dazuzugehören. '+
        'Der Preis fällt nicht sofort auf, sondern als Erschöpfung nach dem Treffen.';
    },
    function(f,P,H){
      var zi=Math.floor(P.ASC/30);
      return 'Dein <b>Aszendent in '+H.SIGNS[zi]+'</b> ist die Schicht, die Menschen zuerst sehen. '+
        'Wenn sie sich stark von deinem Inneren unterscheidet, entsteht Übersetzungsarbeit: '+
        'Du wirkst anders, als du bist, und musst die Lücke selbst überbrücken. '+
        'Genau das ist der unsichtbare Teil der Anstrengung.';
    },
    function(f,P,H){
      var im12=f.planeten.filter(function(x){return x.haus===12;});
      if(!im12.length) return null;
      return 'Im 12. Haus steht <b>'+im12.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Was dort steht, zeigst du nicht — auch nicht denen, die dir nahe sind. '+
        'Ein Teil deiner Anpassung läuft unbewusst und kostet trotzdem.';
    }],
  uebung:['Die Erschöpfung messen',
   'Notier diese Woche nach jedem sozialen Treffen eine Zahl von eins bis zehn: Wie leer bist du danach? Nur die Zahl. Nach fünf Treffen siehst du, welche dich nähren und welche dich kosten — und das ist eine Information, die man sich nicht erdenken kann.'],
  rueckfrage:'Hast du deine Zahlen gesammelt?',
  coach:{fragen:['Bei wem musst du dich nicht zusammenreißen?',
   'Was verschweigst du in deinem Freundeskreis?',
   'Wie fühlst du dich direkt nach einem Treffen — und zwei Stunden später?'],
   vorsicht:'Anpassung ist bei manchen Menschen Überlebensstrategie, nicht Gewohnheit. Nicht zum Ablegen drängen, bevor klar ist, was sie geschützt hat.'}},

 {id:'freunde', worum:'Hier geht es darum, warum viele Kontakte nicht dasselbe sind wie Nähe. Merken tust du es daran, wen du anrufen würdest, wenn etwas passiert.', wozuSchutz:'Viele lockere Kontakte schützen davor, dass ein Verlust wehtut.', wozuFrage:'Was wäre das Risiko, wenn eine Freundschaft dir wirklich wichtig wird?', name:'Deine Freundschaften',
  frage:'Warum habe ich viele Kontakte und wenig Nähe?',
  anker:{haeuser:[11,3], punkte:['Venus','Merkur','Mond']},
  regeln:[
    function(f,P,H){
      if(P.Venus===undefined) return null;
      var hn=H.haus(P.Venus)+1, zi=Math.floor(P.Venus/30);
      return 'Deine <b>Venus in '+H.SIGNS[zi]+', '+hn+'. Haus</b> beschreibt, wie du Zuneigung zeigst — '+
        'auch in Freundschaft, nicht nur in Liebe. Bei dir läuft das über <b>'+H.HT[hn-1]+'</b>. '+
        'Menschen, mit denen du das nicht teilen kannst, bleiben Bekanntschaften.';
    },
    function(f,P,H){
      var im3=f.planeten.filter(function(x){return x.haus===3;});
      if(!im3.length) return null;
      return 'Im 3. Haus — der Nahbereich, das Alltägliche — steht <b>'+im3.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Freundschaft entsteht bei dir über regelmäßigen, beiläufigen Kontakt, nicht über große Anlässe.';
    },
    function(f,P,H){
      if(P.Mond===undefined) return null;
      var hn=H.haus(P.Mond)+1;
      return 'Dein <b>Mond im '+hn+'. Haus</b> sagt, wo du dich sicher fühlst: <b>'+H.HT[hn-1]+'</b>. '+
        'Nähe in Freundschaft entsteht bei dir genau dort — wenn ihr das teilt, wird es tief. Wenn nicht, bleibt es nett.';
    }],
  uebung:['Eine Verabredung ohne Anlass',
   'Schreib diese Woche einer Person, die du magst und selten siehst — ohne Grund, ohne Anlass, ohne Geburtstag. Die meisten warten darauf, dass jemand anfängt. Sei diesmal die, die anfängt.'],
  rueckfrage:'Hast du dich ohne Anlass gemeldet?',
  coach:{fragen:['Wen würdest du anrufen, wenn etwas passiert?',
   'Welche Freundschaft hält, obwohl ihr euch selten seht?',
   'Wem hast du lange nicht gesagt, dass sie dir wichtig ist?'],
   vorsicht:'Wenig Freundschaften sind kein Defizit. Die Frage ist Qualität, nicht Anzahl.'}},

 {id:'rolle', worum:'Hier geht es um die Aufgabe, die dir in Gruppen automatisch zufällt. Merken tust du es daran, dass niemand mehr fragt, weil du es ohnehin machst.', wozuSchutz:'Die Rolle sichert Zugehörigkeit, ohne dass du darum bitten musst.', wozuFrage:'Wärst du noch dabei, wenn du die Aufgabe nicht übernimmst?', name:'Welche Rolle du übernimmst',
  frage:'Warum bin ich immer die, die das macht?',
  anker:{haeuser:[6,10], punkte:['Saturn','Mars','Sonne']},
  regeln:[
    function(f,P,H){
      if(P.Saturn===undefined) return null;
      var hn=H.haus(P.Saturn)+1;
      return 'Dein <b>Saturn im '+hn+'. Haus</b> zeigt, wo du Verantwortung übernimmst, auch ungefragt — '+
        'in <b>'+H.HT[hn-1]+'</b>. In Gruppen landet diese Aufgabe bei dir, weil du sie schneller siehst als andere. '+
        'Und weil du sie übernimmst, fragt bald niemand mehr.';
    },
    function(f,P,H){
      if(P.Sonne===undefined) return null;
      var hn=H.haus(P.Sonne)+1;
      if(hn!==11&&hn!==10) return null;
      return 'Deine <b>Sonne im '+hn+'. Haus</b> — du bist in Gemeinschaft sichtbar, ob du willst oder nicht. '+
        'Das bringt Rollen mit sich, auch solche, die du dir nicht ausgesucht hast.';
    },
    function(f,P,H){
      if(P.Mars===undefined) return null;
      var hn=H.haus(P.Mars)+1;
      return 'Dein <b>Mars im '+hn+'. Haus</b> ist dein Grenzmuskel. In Gruppen entscheidet sich an dieser Stelle, '+
        'ob du Aufgaben annimmst oder abgibst — bei dir in <b>'+H.HT[hn-1]+'</b>.';
    }],
  uebung:['Eine Aufgabe nicht übernehmen',
   'Wenn diese Woche in einer Gruppe etwas liegen bleibt, das sonst du machst: lass es liegen. Nicht kommentieren, nicht erklären. Schau, was passiert. Entweder macht es jemand anderes, oder es war nicht so wichtig, wie du dachtest.'],
  rueckfrage:'Hast du etwas liegen lassen?',
  coach:{fragen:['Welche Rolle hast du in deinem Freundeskreis?',
   'Hast du sie gewählt oder ist sie dir zugefallen?',
   'Was wäre, wenn du sie einmal nicht ausfüllst?'],
   vorsicht:'Rollen bringen auch Zugehörigkeit. Nicht zum Ablegen drängen, ohne zu klären, was danach bleibt.'}},

 {id:'aussen', worum:'Hier geht es um das Gefühl, überall ein bisschen fremd zu sein. Merken tust du es daran, dass es auch dann da ist, wenn dich alle mögen.', wozuSchutz:'Von außen zu bleiben schützt vor der Enttäuschung, drinnen doch nicht gemeint zu sein.', wozuFrage:'Was riskierst du, wenn du dich zugehörig fühlst und es dann doch nicht bist?', name:'Das Gefühl, nicht dazuzugehören',
  frage:'Warum fühle ich mich überall ein bisschen fremd?',
  anker:{haeuser:[12,11], punkte:['Uranus','Chiron','Neptun','Saturn']},
  regeln:[
    function(f,P,H){
      if(P.Chiron===undefined||P.Chiron===null) return null;
      var hn=H.haus(P.Chiron)+1;
      if(hn!==11&&hn!==12&&hn!==1&&hn!==3) return null;
      return '<b>Chiron im '+hn+'. Haus</b> — der wunde Punkt liegt bei dir nah am Thema Zugehörigkeit. '+
        'Das Gefühl, nicht ganz richtig zu sein, ist alt und meldet sich in Gruppen zuverlässig. '+
        'Es sagt allerdings mehr über eine frühe Erfahrung als über deine jetzige Lage.';
    },
    function(f,P,H){
      if(P.Uranus===undefined) return null;
      var hn=H.haus(P.Uranus)+1;
      return 'Dein <b>Uranus im '+hn+'. Haus</b> markiert, wo du anders bist als erwartet: <b>'+H.HT[hn-1]+'</b>. '+
        'Fremdheit entsteht bei dir nicht überall gleich — sie hängt an diesem Bereich. '+
        'In Zusammenhängen, in denen der keine Rolle spielt, fühlst du dich meistens wohl.';
    },
    function(f,P,H){
      var im12=f.planeten.filter(function(x){return x.haus===12;});
      if(!im12.length) return null;
      return 'Im 12. Haus steht <b>'+im12.map(function(x){return x.p;}).join(', ')+'</b>. '+
        'Ein Teil von dir bleibt grundsätzlich außen — auch bei Menschen, die dich mögen. '+
        'Das ist eher eine Bauweise als ein Problem, wird aber zum Problem, wenn man es für ein Urteil über sich hält.';
    }],
  uebung:['Den Ort finden, an dem es nicht so ist',
   'Denk an eine Situation, in der du dich zuletzt selbstverständlich zugehörig gefühlt hast. Was war dort anders? Meistens ist es ein bestimmtes Thema oder eine bestimmte Art zu reden — und davon brauchst du mehr, nicht mehr Anstrengung.'],
  rueckfrage:'Hast du so einen Ort gefunden?',
  coach:{fragen:['Wann hast du dich zuletzt völlig zugehörig gefühlt?',
   'Was war dort anders als sonst?',
   'Wem gegenüber musst du dich nicht erklären?'],
   vorsicht:'Anhaltendes Außenseitergefühl kann auch Teil einer depressiven Phase sein. Wenn es dauerhaft und schwer ist, gehört das abgeklärt.'}},

 {id:'beitrag', worum:'Hier geht es darum, was du einer Gemeinschaft tatsächlich gibst. Merken tust du es daran, ob du glaubst, auch ohne Leistung dazuzugehören.', wozuSchutz:'Gebraucht zu werden ist sicherer, als einfach gemocht zu werden.', wozuFrage:'Würdest du dazugehören, auch wenn du nichts beiträgst — und hältst du das für möglich?', name:'Wofür du gebraucht wirst',
  frage:'Was bringe ich einer Gemeinschaft eigentlich?',
  anker:{haeuser:[11,6], punkte:['Jupiter','Sonne','Merkur']},
  regeln:[
    function(f,P,H){
      if(P.Jupiter===undefined) return null;
      var hn=H.haus(P.Jupiter)+1;
      return 'Dein <b>Jupiter im '+hn+'. Haus</b> ist das, was du leicht gibst, ohne es zu bemerken: <b>'+H.HT[hn-1]+'</b>. '+
        'Genau deshalb hältst du es für selbstverständlich — und genau deshalb ist es dein Beitrag.';
    },
    function(f,P,H){
      var weich=f.aspekte.filter(function(x){return x.art==='weich'&&x.o<3;}).slice(0,2);
      if(!weich.length) return null;
      return 'Leicht läuft bei dir <b>'+weich.map(function(x){return x.a+' '+x.typ+' '+x.b;}).join('</b> und <b>')+'</b>. '+
        'Was einem leichtfällt, hält man für normal — und übersieht, dass andere dafür dankbar sind.';
    },
    function(f,P,H){
      if(P.Sonne===undefined) return null;
      var hn=H.haus(P.Sonne)+1;
      return 'Deine <b>Sonne im '+hn+'. Haus</b>: Dort bist du am meisten du selbst — in <b>'+H.HT[hn-1]+'</b>. '+
        'Eine Gemeinschaft, in der dieser Teil keinen Platz hat, wird dich auf Dauer nicht halten, '+
        'egal wie nett die Menschen sind.';
    }],
  uebung:['Einmal fragen, was fehlt',
   'Frag diese Woche in einem Zusammenhang, der dir wichtig ist: „Was fehlt euch gerade?" Und dann schau, ob etwas dabei ist, das dir leichtfällt. Zugehörigkeit entsteht über Nützlichsein häufiger als über Sympathie.'],
  rueckfrage:'Hast du gefragt, was fehlt?',
  coach:{fragen:['Wofür kommen Menschen zu dir?',
   'Was gibst du, ohne es zu merken?',
   'In welcher Gruppe würdest du fehlen, wenn du gingst?'],
   vorsicht:'Nicht auf Nützlichkeit reduzieren. Zugehörigkeit darf auch ohne Gegenleistung existieren.'}}

 ]
}; var WOZU={"gruppe": ["Nicht ganz dazuzugehören hält dich unabhängig. Wer außen steht, muss sich nicht an Regeln halten, die er nicht gemacht hat.", "Was gibst du an Freiheit auf, wenn du irgendwo wirklich dazugehörst?"], "anpassen": ["Die Anpassung sichert dir den Platz. Ohne sie müsstest du herausfinden, ob der Platz auch dir gilt oder nur der Rolle.", "Was würdest du erfahren, wenn du dich in einer Gruppe nicht mehr zusammennimmst?"], "freunde": ["Kontakte auf Abstand zu halten kostet wenig und enttäuscht nicht. Nähe wäre teurer.", "Was riskierst du, wenn du jemandem sagst, dass sie dir wichtig ist?"], "rolle": ["Die Rolle gibt dir einen sicheren Platz und macht dich unentbehrlich. Ohne sie wärst du einfach nur dabei.", "Was bliebe von deinem Platz, wenn du die Aufgabe nicht mehr übernimmst?"], "aussen": ["Das Gefühl, außen zu sein, kommt einem zuvor: Wer sich selbst nicht dazuzählt, kann nicht ausgeschlossen werden.", "Was müsstest du aushalten, wenn du dich zugehörig fühlst und es doch nicht bleibt?"], "beitrag": ["Nützlich zu sein ist ein sicherer Zugang zu Gruppen. Einfach dabei zu sein, ohne etwas beizutragen, wäre ungeschützt.", "Dürftest du bleiben, wenn du gerade nichts beiträgst?"]};

    return {RAUM:RAUM, WOZU:(typeof WOZU!=='undefined')?WOZU:{}}; })()
};
