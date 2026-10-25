/* Prüft Daten und Mechanik der Seite „Ereignisse lesen".
   Läuft ohne Browser: node _test-ereignis.js
   Alle Beispieldaten hier sind erfunden. */
'use strict';
var fs = require('fs'), path = require('path'), vm = require('vm');
var hier = path.dirname(path.resolve(__filename));

var fenster = { window:{}, document:{ readyState:'complete', addEventListener:function(){} } };
fenster.window.addEventListener = function(){};
var ctx = vm.createContext(fenster);
ctx.window = fenster.window;
['ereignis-daten.js','ereignis-rechner.js'].forEach(function(f){
  vm.runInContext(fs.readFileSync(path.join(hier,f),'utf8'), ctx, {filename:f});
});
var D = ctx.window.AC_EREIG, R = ctx.window.AC_EREIGR;

var fehler = [], geprueft = 0;
function ist(bed, text){ geprueft++; if(!bed) fehler.push(text); }

/* Zwei Register: ein Paar ['Alltag','Fach'] oder ein String für beides. */
function w(v, fach){ return Array.isArray(v) ? v[fach ? 1 : 0] : v; }
/* Fachsprache, die auf Stufe 0 nirgends stehen darf. */
var FACH0 = /\b(Sonne|Mond|Merkur|Venus|Mars|Jupiter|Saturn|Uranus|Neptun|Pluto|Chiron|Lilith|Widder|Stier|Zwillinge|Krebs|Löwe|Jungfrau|Waage|Skorpion|Schütze|Steinbock|Wassermann|Fische|Konjunktion|Sextil|Quadrat|Trigon|Opposition|Aszendent|Deszendent|Orbis|Haus|Häuser|Transit|Transite|Aspekt|Aspekte|Herrscher|Radix|Chart|Charts|Synastrie|Composite|Progression|IC|MC)\b|°/;
function sauber(v, wo){
  geprueft++;
  var t = w(v, false);
  if(Array.isArray(t)) t = t.join(' ');
  var m = FACH0.exec(t);
  if(m) fehler.push('Stufe 0 trägt Fachsprache („' + m[0] + '"): ' + wo);
}
/* Wo beide Register nebeneinander stehen, muss das Fachregister auch wirklich
   Fachsprache tragen — sonst ist das Paar nur doppelte Arbeit ohne Nutzen. */
function fachlich(v, wo){
  geprueft++;
  if(!Array.isArray(v)) return;              /* ein String gilt überall, das ist erlaubt */
  var t = w(v, true);
  if(Array.isArray(t)) t = t.join(' ');
  if(!FACH0.test(t)) fehler.push('Das Fachregister bringt nichts Neues: ' + wo);
}

/* ── 1 · Die Daten sind vollständig ────────────────────── */
ist(D && R, 'Daten oder Rechner nicht geladen');
ist(D.BAUSTEINE.length === 5, 'Es müssen genau fünf Bausteine sein');
['WAS','WIE','WO','WIE STARK','WANN'].forEach(function(f,i){
  ist(D.BAUSTEINE[i].frage === f, 'Baustein ' + (i+1) + ' muss die Frage ' + f + ' tragen');
});
D.BAUSTEINE.forEach(function(b,i){
  var wo = 'Baustein ' + (i+1);
  ist(b.titel.length === 2, wo + ' braucht zwei Titel (Alltag und Fach)');
  ist(b.liste.length >= 5, wo + ' braucht mindestens fünf Einträge');
  ist(w(b.text,false).length > 80, wo + ': Alltagstext zu kurz');
  ist(w(b.text,true).length > 80, wo + ': Fachtext zu kurz');
  sauber(b.titel, wo + ' · Titel');
  sauber(b.text,  wo + ' · Text');
  sauber(b.kurz,  wo + ' · Kurzzeile');
  b.liste.forEach(function(p){
    ist(p.length === 2 && p[1].length > 8, wo + ': Eintrag „' + p[0] + '" unvollständig');
    /* Die Beschreibung steht auf jeder Stufe — sie muss ohne Fachwort auskommen. */
    sauber(p[1], wo + ' · Beschreibung zu „' + p[0] + '"');
  });
});
ist(D.BAUSTEINE[2].liste.length === 12, 'Alle zwölf Häuser müssen genannt sein');
ist(D.BAUSTEINE[1].liste.length === 12, 'Alle zwölf Zeichen müssen genannt sein');

/* ── 2 · Menschen ──────────────────────────────────────── */
var noetig = ['mutter','vater','geschwister','familie','freunde','haustier','kinder','partner'];
noetig.forEach(function(k){
  ist(D.MENSCHEN.some(function(m){ return m.k === k; }), 'Verbindung fehlt: ' + k);
});
var schluessel = {};
D.MENSCHEN.forEach(function(m){
  var wo = 'bei „' + m.name + '"';
  ist(!schluessel[m.k], 'Doppelter Schlüssel bei den Menschen: ' + m.k);
  schluessel[m.k] = 1;
  ist(/\d\./.test(w(m.wo,true)), wo + ' fehlt die Hausnummer im Fachregister');
  ist(w(m.kraft,true).length > 3, wo + ' fehlt die Kraft');
  ist(w(m.aspekte,false).length >= 3, wo + ' stehen zu wenige Hinweise (Alltag)');
  ist(w(m.aspekte,true).length >= 3,  wo + ' stehen zu wenige Hinweise (Fach)');
  ist(w(m.streit,false).length > 40, wo + ' fehlt die Einordnung der Überlieferung');
  ist(w(m.text,false).length > 80, wo + ' ist der Alltagstext zu kurz');
  ist(w(m.text,true).length > 80,  wo + ' ist der Fachtext zu kurz');
  ['wo','kraft','text','aspekte','streit'].forEach(function(f){
    sauber(m[f], wo + ' · ' + f);
  });
  fachlich(m.wo,    wo + ' · wo');
  fachlich(m.kraft, wo + ' · kraft');
});
/* Die beiden Zuordnungen, bei denen Schaden entsteht, müssen gebremst sein. */
var kind = D.MENSCHEN.filter(function(m){ return m.k === 'kinder'; })[0];
ist(kind && /nicht ablesen|lässt sich nicht|lässt sich hier nicht/.test(w(kind.streit,true)),
  'Beim 5. Haus muss stehen, dass sich Kinderwunsch nicht ablesen lässt');
var haustier = D.MENSCHEN.filter(function(m){ return m.k === 'haustier'; })[0];
ist(haustier && /6\./.test(w(haustier.wo,true)) && /12\./.test(w(haustier.wo,true)),
  'Beim Haustier müssen das 6. und das 12. Haus genannt sein');
ist(haustier && /5\./.test(w(haustier.streit,true)),
  'Beim Haustier muss die moderne Lesart (5. Haus) eingeordnet sein');
var mutter = D.MENSCHEN.filter(function(m){ return m.k === 'mutter'; })[0];
ist(mutter && /uneins|streit|Zuordnungen/i.test(w(mutter.streit,true)),
  'Bei Mutter und Vater muss stehen, dass die Überlieferung uneins ist');

/* ── 3 · Rezepte ───────────────────────────────────────── */
ist(D.REZEPTE.length >= 6, 'Zu wenige Rezepte');
D.REZEPTE.forEach(function(r){
  ist(r.zutaten.length >= 3, 'Rezept „' + r.name + '" braucht mindestens drei Zutaten');
  ist(r.ehrlich && r.ehrlich.length > 50, 'Rezept „' + r.name + '" ohne ehrliche Einschränkung');
  ist(r.formel.length >= 2, 'Rezept „' + r.name + '" braucht mindestens zwei Formelteile');
  ist(r.ergebnis && r.ergebnis !== r.name,
    'Rezept „' + r.name + '": das Ergebnis der Formel wiederholt nur den Titel');
  sauber(r.ergebnis, 'Rezept „' + r.name + '" · Ergebnis');
});

/* ── 4 · Quiz ──────────────────────────────────────────── */
ist(D.QUIZ.length === 5, 'Das Quiz hat fünf Fragen');
D.QUIZ.forEach(function(q,i){
  ist(q.a.length >= 3, 'Frage ' + (i+1) + ' braucht mindestens drei Antworten');
  ist(q.r >= 0 && q.r < q.a.length, 'Frage ' + (i+1) + ': richtige Antwort zeigt ins Leere');
  ist(q.e.length > 60, 'Frage ' + (i+1) + ': Erklärung zu kurz');
});

/* ── 5 · Fälle ─────────────────────────────────────────── */
ist(D.FAELLE.length === 2, 'Zwei durchgerechnete Fälle');
D.FAELLE.forEach(function(f){
  ist(f.schritte.length >= 4, 'Fall „' + f.name + '" braucht mindestens vier Schritte');
  ist(/NICHT/.test(f.nicht), 'Fall „' + f.name + '": es muss dastehen, was NICHT dasteht');
  f.schritte.forEach(function(s){ ist(s.length === 3, 'Schritt unvollständig in „' + f.name + '"'); });
});

/* ── 6 · Abgeleitete Häuser ────────────────────────────── */
ist(R.abgeleitet(3,7) === 9,  'Partnerin der Geschwister: 3 + 7 muss das 9. Haus sein');
ist(R.abgeleitet(4,2) === 5,  'Geld der Eltern: 4 + 2 muss das 5. Haus sein');
ist(R.abgeleitet(1,1) === 1,  'Das eigene 1. Haus bleibt das 1.');
ist(R.abgeleitet(11,4) === 2, 'Zuhause der Freundin: 11 + 4 muss das 2. Haus sein');
ist(R.abgeleitet(12,12) === 11, 'Umlauf über 12 hinaus muss stimmen');
for(var a=1;a<=12;a++) for(var b=1;b<=12;b++){
  var h = R.abgeleitet(a,b);
  ist(h >= 1 && h <= 12, 'Abgeleitetes Haus außerhalb von 1–12: ' + a + '+' + b);
}

/* ── 7 · Lautstärke aus dem Orbis ──────────────────────── */
ist(R.laut(0.1).k === 3, 'Ein Volltreffer muss die höchste Stufe sein');
ist(R.laut(5).k === 0,   'Über 3° muss Hintergrund sein');
var vorher = 4;
[0.1,0.7,1.5,2.5,6].forEach(function(o){
  var k = R.laut(o).k;
  ist(k <= vorher, 'Die Lautstärke darf mit wachsendem Orbis nicht steigen (bei ' + o + '°)');
  vorher = k;
});

/* ── 8 · Zahlen mit Komma, nie mit Punkt ───────────────── */
ist(R.komma(0.5) === '0,5', 'Zahlen müssen ein Komma tragen');
ist(R.komma(2.25,1).indexOf('.') < 0, 'In keiner Zahl darf ein Punkt stehen');

/* ── 9 · Die Kernregel: auf Stufe 0 kein Fachwort ──────── */
var FACH = /\b(Sonne|Mond|Merkur|Venus|Mars|Jupiter|Saturn|Uranus|Neptun|Pluto|Widder|Stier|Zwillinge|Krebs|Löwe|Jungfrau|Waage|Skorpion|Schütze|Steinbock|Wassermann|Fische|Konjunktion|Sextil|Quadrat|Trigon|Opposition|Aszendent|Orbis|Haus|Transit|Aspekt)\b|°/;
var proben = 0;
R.PLANETEN.forEach(function(p){
  for(var z=0; z<12; z++) for(var h=0; h<12; h++) for(var as=0; as<5; as++){
    [0.2,1.5,4].forEach(function(o){
      var s = R.satz({planet:p, zeichen:z, haus:h, aspekt:as, orbis:o}, 0);
      proben++;
      if(FACH.test(s)) fehler.push('Stufe 0 zeigt Fachsprache: „' + s + '"');
    });
  }
});
geprueft += proben;
ist(proben === 10*12*12*5*3, 'Es wurden nicht alle Mischungen geprüft');

/* Dieselbe Regel für die Zerlegung */
for(var zi=0; zi<12; zi++){
  var teile = R.zerlegung({planet:'Venus', zeichen:zi, haus:zi, aspekt:zi%5, orbis:0.9}, 0);
  geprueft++;
  teile.forEach(function(t){
    if(FACH.test(t.wert)) fehler.push('Stufe 0, Zerlegung zeigt Fachsprache: „' + t.wert + '"');
  });
}

/* Ab Stufe 2 MUSS die Fachsprache da sein — sonst lernt niemand etwas */
var s2 = R.satz({planet:'Venus', zeichen:1, haus:4, aspekt:2, orbis:0.8}, 2);
ist(/Venus/.test(s2) && /Stier/.test(s2) && /5\. Haus/.test(s2) && /Quadrat/.test(s2),
  'Ab Stufe 2 müssen Planet, Zeichen, Haus und Aspekt beim Namen genannt werden');
var s3 = R.satz({planet:'Venus', zeichen:1, haus:4, aspekt:2, orbis:0.8}, 3);
ist(/0,8°/.test(s3), 'Ab Stufe 3 muss der Orbis mit Komma dastehen');
ist(s3.indexOf(' ,') < 0 && s3.indexOf(',,') < 0, 'Kein verirrtes Komma im Satz');

/* ── 10 · Der Regler und der Satz dürfen nie auseinanderlaufen ── */
ist(R.ORBWERTE.indexOf(R.START.orbis) >= 0,
  'Der Startwert des Reglers steht nicht in seiner eigenen Liste — dann zeigt die '
  + 'Auswahl etwas anderes an, als der Satz sagt');
ist(R.PLANETEN.indexOf(R.START.planet) >= 0, 'Startplanet steht nicht in der Liste');
ist(R.START.zeichen >= 0 && R.START.zeichen < 12, 'Startzeichen außerhalb');
ist(R.START.haus >= 0 && R.START.haus < 12, 'Starthaus außerhalb');
ist(R.START.aspekt >= 0 && R.START.aspekt < 5, 'Startaspekt außerhalb');
R.ORBWERTE.forEach(function(o){
  ist(R.laut(o) !== undefined, 'Reglerwert ' + o + ' hat keine Lautstärke');
});

/* ── 11 · Kein Satzanfang in Kleinschreibung ───────────── */
var klein = /[.!?]\s+[a-zäöüß]/;
[0,1,2,3,4].forEach(function(n){
  R.PLANETEN.forEach(function(pl){
    [0,4,11].forEach(function(z){ [0,5,11].forEach(function(h){
      [0,2,4].forEach(function(as){ R.ORBWERTE.forEach(function(o){
        var s = R.satz({planet:pl, zeichen:z, haus:h, aspekt:as, orbis:o}, n);
        geprueft++;
        if(klein.test(s)) fehler.push('Stufe ' + n + ', Kleinschreibung nach Punkt: „' + s + '"');
      }); });
    }); });
  });
});

/* ── 12 · Jeder Satz endet sauber ──────────────────────── */
[0,1,2,3,4].forEach(function(n){
  var s = R.satz({planet:'Mars', zeichen:7, haus:9, aspekt:4, orbis:1.2}, n);
  ist(s.length > 30, 'Stufe ' + n + ': Satz zu kurz');
  ist(/[.!?]$/.test(s.trim()), 'Stufe ' + n + ': Satz endet ohne Punkt');
  ist(s.indexOf('undefined') < 0 && s.indexOf('NaN') < 0, 'Stufe ' + n + ': Lücke im Satz');
});

/* ── 13 · Der Zufall liefert nur Gültiges ──────────────── */
for(var i=0;i<400;i++){
  var w = R.zufall();
  geprueft++;
  if(R.PLANETEN.indexOf(w.planet) < 0) fehler.push('Zufall: unbekannter Planet ' + w.planet);
  if(!(w.zeichen>=0 && w.zeichen<12)) fehler.push('Zufall: Zeichen außerhalb');
  if(!(w.haus>=0 && w.haus<12)) fehler.push('Zufall: Haus außerhalb');
  if(!(w.aspekt>=0 && w.aspekt<5)) fehler.push('Zufall: Aspekt außerhalb');
  if(R.ORBWERTE.indexOf(w.orbis)<0) fehler.push('Zufall: Orbis nicht aus der Reglerliste');
}

/* ── 14 · Kein echtes Geburtsdatum in den Daten ────────── */
var roh = ['ereignis-daten.js','ereignis-rechner.js','ereignis-app.js','ereignis-koerper.html']
  .map(function(f){ return fs.readFileSync(path.join(hier,f),'utf8'); }).join('\n');
ist(!/\b1987\b/.test(roh), 'Echtes Geburtsjahr im Quelltext');
ist(!/\b08:58\b/.test(roh), 'Echte Geburtszeit im Quelltext');
ist(!/\.toLowerCase\(/.test(roh), 'toLowerCase auf deutschem Text ist verboten');
/* Zahlen mit Punkt in sichtbaren Gradangaben */
ist(!/\d\.\d\s*°/.test(roh), 'Gradangabe mit Punkt statt Komma');

/* ── Ergebnis ──────────────────────────────────────────── */
if(fehler.length){
  console.log('FEHLER (' + fehler.length + ' von ' + geprueft + ' Prüfungen):');
  fehler.slice(0,25).forEach(function(f){ console.log('  · ' + f); });
  if(fehler.length > 25) console.log('  … und ' + (fehler.length-25) + ' weitere');
  process.exit(1);
}
console.log('_test-ereignis.js  ' + geprueft + ' Prüfungen, alles grün');
