/* Astro-Charlie · Wörterbuch in fünf Registern
   Jeder astrologische Begriff in der Sprache der jeweiligen Stufe.
   Index 0 = keine Ahnung, 1 = wenig, 2 = mittel, 3 = viel, 4 = pro.
   Kürzere Listen werden nach oben aufgefüllt: Was auf Stufe 2 steht,
   gilt auch für 3 und 4, solange dort nichts Eigenes steht. */
(function(){
'use strict';

function stufig(l){ return function(n){ return l[Math.min(n, l.length-1)]; }; }

/* ── Planeten ─────────────────────────────────────────
   kurz = wie der Planet in diesem Register heißt
   was  = ein Satz dazu, wofür er steht (nur unten gebraucht) */
var PLANET={
 Sonne:{kurz:stufig(['dein Wesenskern','deine Sonne','die Sonne','Sonne']),
   was:stufig(['das, was du im Grunde bist, wenn niemand etwas von dir will',
               'dein Wesenskern — Identität und Lebensrichtung',
               'Identität, Wille, Lebensrichtung'])},
 Mond:{kurz:stufig(['dein Gefühl','dein Mond','der Mond','Mond']),
   was:stufig(['was du brauchst, um dich sicher zu fühlen — und worauf du zuerst reagierst',
               'dein Gefühlsleben und dein Sicherheitsbedürfnis',
               'Bedürfnis, Reaktion, Sicherheitsgefühl'])},
 Merkur:{kurz:stufig(['dein Denken','dein Merkur','Merkur']),
   was:stufig(['wie du denkst, redest und Dinge sortierst',
               'dein Denken und deine Art zu sprechen',
               'Denken, Sprache, Wahrnehmung, Austausch'])},
 Venus:{kurz:stufig(['deine Zuneigung','deine Venus','Venus']),
   was:stufig(['was du schön findest, wen du magst und was du dir wert bist',
               'Zuneigung, Genuss und Selbstwert',
               'Zuneigung, Wert, Geschmack, Anziehung'])},
 Mars:{kurz:stufig(['dein Antrieb','dein Mars','Mars']),
   was:stufig(['wie du etwas anpackst und wie du wütend wirst',
               'dein Antrieb und deine Art, dich durchzusetzen',
               'Antrieb, Durchsetzung, Abgrenzung, Ärger'])},
 Jupiter:{kurz:stufig(['dein Vertrauen','dein Jupiter','Jupiter']),
   was:stufig(['wo du großzügig bist und wo dir Dinge leichter zufallen',
               'Wachstum, Sinn und wo du Glück hast',
               'Expansion, Sinn, Überzeugung, Gelegenheit'])},
 Saturn:{kurz:stufig(['deine Struktur','dein Saturn','Saturn']),
   was:stufig(['wo du dich zusammenreißt, wo du streng mit dir bist und wo Dinge dauern',
               'Struktur, Grenze und was Zeit braucht',
               'Begrenzung, Verantwortung, Reifung, Dauer'])},
 Uranus:{kurz:stufig(['dein Freiheitsdrang','dein Uranus','Uranus']),
   was:stufig(['wo du aus der Reihe tanzt und keine Vorschriften aushältst',
               'dein Freiheitsbedürfnis und wo es ruckelt',
               'Ablösung, Plötzlichkeit, Eigenart'])},
 Neptun:{kurz:stufig(['deine Sehnsucht','dein Neptun','Neptun']),
   was:stufig(['wo du dich verlierst, träumst oder dich täuschen lässt',
               'Sehnsucht, Auflösung und Hingabe',
               'Auflösung, Idealisierung, Durchlässigkeit'])},
 Pluto:{kurz:stufig(['deine Tiefe','dein Pluto','Pluto']),
   was:stufig(['wo es bei dir um alles oder nichts geht und wo du nicht loslassen kannst',
               'Tiefe, Macht und Verwandlung',
               'Macht, Zwang, Verwandlung, Kontrolle'])},
 Chiron:{kurz:stufig(['deine wunde Stelle','dein Chiron','Chiron']),
   was:stufig(['etwas, das weh tut und bei dem du anderen trotzdem helfen kannst',
               'die Stelle, die wund ist und zugleich dein Zugang zu anderen',
               'Verwundung und Heilkompetenz'])},
 Lilith:{kurz:stufig(['dein wilder Anteil','deine Lilith','Lilith']),
   was:stufig(['was du dir selbst nicht erlaubst',
               'was du dir nicht zugestehst und was ungezähmt bleibt',
               'das Unangepasste, das Nichtverhandelbare'])},
 ASC:{kurz:stufig(['dein Auftreten','dein Aszendent','der Aszendent','ASC']),
   was:stufig(['wie du auf andere wirkst, bevor sie dich kennen',
               'dein Auftreten und wie du anfängst',
               'Erscheinung, Ansatz, Körperlichkeit'])},
 MC:{kurz:stufig(['deine Rolle nach außen','dein MC','das MC','MC']),
   was:stufig(['wofür man dich kennt oder kennen soll',
               'deine Rolle in der Öffentlichkeit und dein Berufsweg',
               'Beruf, Ruf, Richtung nach außen'])}
};

/* ── Zeichen: Stil in einem Wort, dann der Name ──────── */
var ZEICHEN=[
 {n:'Widder',  stil:'schnell und direkt',        el:'Feuer'},
 {n:'Stier',   stil:'ruhig und beharrlich',      el:'Erde'},
 {n:'Zwillinge',stil:'beweglich und neugierig',  el:'Luft'},
 {n:'Krebs',   stil:'vorsichtig und zugewandt',  el:'Wasser'},
 {n:'Löwe',stil:'großzügig und sichtbar', el:'Feuer'},
 {n:'Jungfrau',stil:'genau und prüfend',     el:'Erde'},
 {n:'Waage',   stil:'abwägend und auf Ausgleich bedacht', el:'Luft'},
 {n:'Skorpion',stil:'intensiv und misstrauisch',  el:'Wasser'},
 {n:'Schütze',stil:'weit und überzeugt', el:'Feuer'},
 {n:'Steinbock',stil:'diszipliniert und auf Dauer angelegt', el:'Erde'},
 {n:'Wassermann',stil:'eigenwillig und distanziert', el:'Luft'},
 {n:'Fische',  stil:'durchlässig und mitfühlend', el:'Wasser'}];

/* ── Häuser ──────────────────────────────────────────── */
var HAUS=[
 {kurz:'wie du auftrittst',            lang:'Auftreten und Selbstbild'},
 {kurz:'Geld und Selbstwert',          lang:'Geld, Besitz und Selbstwert'},
 {kurz:'Reden und Lernen',             lang:'Reden, Lernen, nähere Umgebung'},
 {kurz:'Zuhause und Herkunft',         lang:'Zuhause, Familie, Herkunft'},
 {kurz:'Ausdruck und Verliebtsein',    lang:'Ausdruck, Spiel, Romantik, Kinder'},
 {kurz:'Alltag, Arbeit und Körper',lang:'Alltag, Arbeit, Gesundheit, Routinen'},
 {kurz:'feste Beziehungen',            lang:'Partnerschaft und verbindliches Gegenüber'},
 {kurz:'Tiefe und Loslassen',          lang:'Geteiltes, Krisen, Tiefe, Loslassen'},
 {kurz:'Sinn und Ferne',               lang:'Sinn, Überzeugung, Ferne, Lehre'},
 {kurz:'Beruf und Sichtbarkeit',       lang:'Beruf, Rolle, Sichtbarkeit'},
 {kurz:'Freundschaft und Zukunft',     lang:'Freundschaft, Gruppen, Zukunft'},
 {kurz:'Rückzug und Innenleben',   lang:'Rückzug, Unbewusstes, Ruhe'}];

/* ── Aspekte ─────────────────────────────────────────── */
var ASPEKT={
 Konjunktion:{w:0, art:'neutral',
  kurz:stufig(['sind bei dir eins','liegen zusammen','in Konjunktion','Konjunktion']),
  satz:stufig(['Die beiden lassen sich bei dir nicht trennen — wo das eine ist, ist das andere auch.',
               'Die beiden arbeiten bei dir als ein Stück. Das macht sie stark und schwer auseinanderzuhalten.',
               'Verschmelzung: beide Funktionen treten gemeinsam auf und färben einander.'])},
 Sextil:{w:60, art:'weich',
  kurz:stufig(['bieten sich gegenseitig an','stehen günstig','im Sextil','Sextil']),
  satz:stufig(['Die beiden können gut zusammen — aber nur, wenn du es anstößt. Von allein passiert es nicht.',
               'Ein Angebot: Es geht leicht, sobald du anfängst.',
               'Gelegenheitsaspekt — wirkt, wenn er bewusst genutzt wird.'])},
 Quadrat:{w:90, art:'hart',
  kurz:stufig(['reiben aneinander','stehen im Spannungswinkel','im Quadrat','Quadrat']),
  satz:stufig(['Die beiden ziehen in verschiedene Richtungen. Das ist anstrengend — und es ist auch der Grund, warum du in dem Bereich etwas kannst.',
               'Spannung, die Druck macht und dabei Fähigkeit erzeugt. Nichts, was sich auflöst, eher etwas, das man bedienen lernt.',
               'Reibung mit Entwicklungsdruck; der klassische Leistungsaspekt.'])},
 Trigon:{w:120, art:'weich',
  kurz:stufig(['laufen mühelos zusammen','stehen harmonisch','im Trigon','Trigon']),
  satz:stufig(['Das geht dir leicht von der Hand — so leicht, dass du es vielleicht gar nicht als Stärke bemerkst.',
               'Fließt von selbst. Der Haken: Was leicht geht, wird selten trainiert.',
               'Leichter Fluss, geringe Reibung, Tendenz zur Unterforderung.'])},
 Opposition:{w:180, art:'hart',
  kurz:stufig(['stehen sich gegenüber','stehen in Opposition','in Opposition','Opposition']),
  satz:stufig(['Du schwankst zwischen beiden hin und her — oder du siehst das eine immer bei anderen Menschen statt bei dir.',
               'Zwei Pole, die abwechseln. Häufig wird eine Seite nach außen verlagert und bei anderen bekämpft.',
               'Polarität mit Projektionsneigung; Integration über bewusstes Pendeln.'])}};

/* ── Die großen Begriffe, wenn sie doch fallen ───────── */
var BEGRIFF={
 Haus:stufig(['Lebensbereich','Lebensbereich (Haus)','Haus']),
 Aszendent:stufig(['dein Auftreten','der Aszendent — dein Auftreten','Aszendent','ASC']),
 Transit:stufig(['was gerade am Himmel steht','ein Transit — ein Planet, der gerade vorbeizieht','Transit']),
 Orbis:stufig(['wie genau es trifft','der Abstand, der noch zählt (Orbis)','Orbis']),
 Herrscher:stufig(['der zuständige Planet','der Herrscher — der zuständige Planet','Herrscher']),
 retrograd:stufig(['läuft gerade scheinbar rückwärts','ist rückläufig','rückläufig','retrograd']),
 Stellium:stufig(['mehrere Themen auf einem Haufen','ein Häufungspunkt (Stellium)','Stellium']),
 Lunation:stufig(['Neumond oder Vollmond','Neu- oder Vollmond','Lunation'])};

/* ── Sätze bauen ─────────────────────────────────────── */
function grad(l){
  var z=Math.floor(l/30), d=l-30*z, m=Math.round((d-Math.floor(d))*60), dd=Math.floor(d);
  if(m===60){m=0;dd+=1;}
  return dd+'° '+ZEICHEN[z].n+' '+('0'+m).slice(-2)+"'";
}
function pName(k,n){ return (PLANET[k]?PLANET[k].kurz(n):k); }
function hName(h,n){ return n<=1 ? HAUS[h-1].kurz : (h+'. Haus'); }

/* „Mars im 6. Haus in Jungfrau" in der Sprache der Stufe */
function stellung(k,h,zi,n,pos){
  var p=pName(k,n), z=ZEICHEN[zi];
  if(n===0) return p+' liegt bei dir im Bereich <b>'+HAUS[h-1].kurz+'</b>, und zwar '+z.stil;
  if(n===1) return p+' steht im Lebensbereich <b>'+HAUS[h-1].lang+'</b> (das '+h+'. Haus), in '+z.n;
  if(n===2) return p+' im <b>'+h+'. Haus</b> ('+HAUS[h-1].lang+') in '+z.n;
  if(n===3) return p+' in '+z.n+', '+h+'. Haus';
  return p+' '+(pos!==undefined?grad(pos):z.n)+', '+h+'. Haus';
}

/* Ein Aspekt zwischen zwei Punkten */
function aspekt(a,b,typ,n,orb){
  var A=PLANET[a], B=PLANET[b], T=ASPEKT[typ];
  if(!T) return '';
  if(n===0){
    return '<b>'+A.kurz(0)+'</b> und <b>'+B.kurz(0)+'</b> '+T.kurz(0)+'. '+T.satz(0);
  }
  if(n===1){
    return '<b>'+A.kurz(1)+'</b> und <b>'+B.kurz(1)+'</b> '+T.kurz(1)+' — '+typ+'. '+T.satz(1);
  }
  if(n===2){
    return '<b>'+a+' '+typ+' '+b+'</b>. '+T.satz(2);
  }
  if(n===3){
    return '<b>'+a+' '+typ+' '+b+'</b>'+(orb!==undefined?' ('+orb.toFixed(1)+'°)':'')+'. '+T.satz(2);
  }
  return '<b>'+a+' '+typ+' '+b+'</b>'+(orb!==undefined?', Orbis '+orb.toFixed(2)+'°':'')+
    ', '+T.art+'er Aspekt. '+T.satz(2);
}

/* Überschrift für einen Planeten in einem Reading */
function ueberschrift(k,n){
  if(n===0) return PLANET[k]?PLANET[k].kurz(0).replace(/^dein(e)? /,'Dein'+(PLANET[k].kurz(0).indexOf('deine')===0?'e':'')+' '):k;
  return pName(k,n);
}

window.AC_WORT={
 PLANET:PLANET, ZEICHEN:ZEICHEN, HAUS:HAUS, ASPEKT:ASPEKT, BEGRIFF:BEGRIFF,
 grad:grad, pName:pName, hName:hName, stellung:stellung, aspekt:aspekt,
 ueberschrift:ueberschrift,
 begriff:function(w,n){ return BEGRIFF[w]?BEGRIFF[w](n):w; },
 zeichen:function(zi,n){ return n===0?ZEICHEN[zi].stil:ZEICHEN[zi].n; }
};
})();
