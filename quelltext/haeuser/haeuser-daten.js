/* Texte der Häuserseite. Zusammengelegt am 6.11.2026 aus haeuser.html,
   haeuser-lebensbuehnen.html, haus-achsen.html und haeusersysteme.html.

   Was hier NICHT mehr steht: haus-achsen.html hatte unter „Dein Chart"
   eine feste Deutung eines einzelnen Geburtsbilds, die jede Besucherin
   als ihre eigene las. „Bei dir" wird jetzt aus dem aktiven Profil
   gerechnet (haeuser-app.js), und hier stehen nur Prinzipien. */

/* Die zwölf Bereiche. name: kurz, wie in der Navigation · titel: die
   Bühne · was: wofür sie steht · stich: Stichworte · frage: zum
   Nachdenken und als Türöffner im Reading · ecke: Achsenpunkt am Anfang */
var HZ_HAUS = [
 {name:'Selbst', titel:'Selbst & Auftreten', was:'Wie du dich zeigst, dein Körper, dein erster Eindruck, dein Ich.',
  stich:'Auftreten, Körper, Temperament', frage:'Wie trittst du in einen Raum, und passt das zu dem, wer du innen bist?', ecke:'Aszendent'},
 {name:'Werte', titel:'Werte & Selbstwert', was:'Geld, Besitz, Ressourcen und tiefer: dein Selbstwert, was dir wirklich wichtig ist.',
  stich:'Geld, Besitz, Talente', frage:'Woran machst du deinen Wert fest, und stimmt das für dich?', ecke:''},
 {name:'Sprache', titel:'Kommunikation & Umfeld', was:'Denken, Reden, Lernen, Geschwister, dein nahes Alltagsumfeld.',
  stich:'Denken, Lernen, Geschwister, Nachbarschaft', frage:'Wie sprichst du mit der Welt, und wie mit dir selbst?', ecke:''},
 {name:'Zuhause', titel:'Wurzeln & Zuhause', was:'Familie, Herkunft, Heimat, dein innerstes Fundament.',
  stich:'Familie, Herkunft, Wohnen', frage:'Wo fühlst du dich zuhause, bei wem, an welchem Ort in dir?', ecke:'IC'},
 {name:'Ausdruck', titel:'Liebe & Kreativität', was:'Selbstausdruck, Romantik, Spiel, Freude, Kinder, alles Schöpferische.',
  stich:'Spiel, Romantik, Kinder, Kreativität', frage:'Wo darfst du spielen, strahlen und einfach Freude haben?', ecke:''},
 {name:'Alltag', titel:'Alltag & Gesundheit', was:'Arbeit, Routine, Körper, Dienst, das tägliche Kleine.',
  stich:'Routinen, Arbeitsalltag, Gesundheit', frage:'Dienen deine täglichen Routinen dir, oder dienst du ihnen?', ecke:''},
 {name:'Beziehung', titel:'Beziehung & das Du', was:'Partnerschaft, enge Bindungen, was du im Gegenüber suchst.',
  stich:'Partnerschaft, Verträge, offene Gegner', frage:'Was suchst du im anderen, und suchst du es vielleicht auch in dir?', ecke:'Deszendent'},
 {name:'Tiefe', titel:'Tiefe & Wandlung', was:'Intimität, Krisen, Wandlung, geteilte Ressourcen, das Verborgene.',
  stich:'Intimität, gemeinsames Geld, Krisen', frage:'Was in dir will sich wandeln, und wovor hast du dabei Angst?', ecke:''},
 {name:'Sinn', titel:'Sinn & Weite', was:'Philosophie, Reisen, Glaube, Studium, der große Horizont.',
  stich:'Reisen, Studium, Glaube, Weltbild', frage:'Was gibt deinem Leben Sinn und Weite?', ecke:''},
 {name:'Beruf', titel:'Berufung & Wirken', was:'Beruf, Ruf, öffentliches Wirken, dein Lebensweg nach außen.',
  stich:'Beruf, Ruf, Ziele', frage:'Wofür möchtest du gesehen werden, was ist dein Beitrag?', ecke:'MC'},
 {name:'Gruppen', titel:'Gemeinschaft & Vision', was:'Freunde, Netzwerke, Gruppen, Zukunft, deine Ideale.',
  stich:'Freundschaft, Netzwerke, Zukunftspläne', frage:'Zu welcher Gemeinschaft gehörst du, und welche Zukunft willst du mitgestalten?', ecke:''},
 {name:'Rückzug', titel:'Rückzug & Seele', was:'Unbewusstes, Spiritualität, Verborgenes, Rückzug, Auflösung.',
  stich:'Stille, Unbewusstes, Spiritualität', frage:'Was brauchst du an Stille und Rückzug, und gönnst du dir das?', ecke:''}
];

/* Die sechs Achsen. a, b: Bereiche (0-basiert) · name: das Paar ·
   zuvielA: wenn die Seite a überdreht, wohin der Ausgleich geht ·
   zuvielB: umgekehrt */
var HZ_ACHSEN = [
 {a:0, b:6, name:'Ich & Du',
  zuvielA:'Wer zu sehr im eigenen Ich steckt, findet den Ausgleich im Du: den anderen einbeziehen, Verbindung statt Alleingang.',
  zuvielB:'Wer sich im Du verliert, kommt über das eigene Ich zurück: Was will ich, unabhängig von dir?'},
 {a:1, b:7, name:'Mein & Unser',
  zuvielA:'Wer zu sehr am Eigenen und an Sicherheit festhält, findet den Ausgleich im Teilen und Sich-Einlassen.',
  zuvielB:'Wer sich in Intensität und Verschmelzung verliert, findet Boden im Eigenen: dein Wert bleibt, auch wenn du dich öffnest.'},
 {a:2, b:8, name:'Nah & Weit',
  zuvielA:'Wer sich im Kleinklein und im Zerdenken verliert, findet den Ausgleich im großen Sinn und in der Weite.',
  zuvielB:'Wer abhebt in große Ideen, erdet sich über das Konkrete: ein Gespräch, ein Buch, der nächste Schritt.'},
 {a:3, b:9, name:'Innen & Außen',
  zuvielA:'Wer zu sehr im Nest und im Rückzug bleibt, findet den Ausgleich im Rausgehen und Sichtbarwerden.',
  zuvielB:'Wer sich im Außen verausgabt, heilt über das Zuhause: Wurzeln, Familie, ein Ort, an dem nichts geleistet werden muss.'},
 {a:4, b:10, name:'Ich-Freude & Wir-Vision',
  zuvielA:'Wer nur um das eigene Herz und das eigene Drama kreist, findet den Ausgleich im Größeren: Gemeinschaft und Vision.',
  zuvielB:'Wer sich in der Gruppe verliert, kommt über das eigene Herz zurück: Was macht mir Freude, ganz allein?'},
 {a:5, b:11, name:'Konkret & Diffus',
  zuvielA:'Wer sich im Alltag aufreibt, mit Perfektion und Kontrolle, findet Entlastung im Loslassen und in der Stille.',
  zuvielB:'Wer von Grübeln, Überwältigung und Auflösung geflutet wird, findet Halt im Konkreten: Körper, Routine, der nächste kleine Schritt.'}
];

/* Whole Sign oder Placidus: das Beispiel ist ein erfundenes Geburtsbild.
   Die Werte prüft bau-haeuser.py beim Bauen gegen engine.js. */
var HZ_BEISPIEL = {datum:'14.10.1994', zeit:'13:05', ort:'Hamburg',
  p:{y:1994, mo:10, d:14, h:13, mi:5, tz:2, lat:53.55, lon:9.99},
  asc:'15°46 Schütze', mc:'20°34 Waage', sonne:'20°52 Waage', wsHaus:11, plHaus:10, abstand:18};

var HZ_QUIZ = [
 {q:'Ein Planet steht nach Whole Sign im 10. und nach Placidus im 9. Haus. Was machst du im Reading?',
  o:['Ein System auswählen und dabei bleiben','Beide Bedeutungen ansprechen und nachfragen'], r:1,
  e:'Auf einer Hausgrenze gehört der Planet zu beiden Bereichen. Berufung und Sinnsuche liegen ohnehin nah beieinander. Die Person weiß meistens sofort, welche Beschreibung sie stärker erkennt. Für die eigene Systematik bleibst du trotzdem bei einem Standardsystem.'},
 {q:'Bei welchem Geburtsort weichen die Systeme am stärksten voneinander ab?',
  o:['Quito, Ecuador (0° Breite)','Stockholm (59° Breite)'], r:1,
  e:'Je weiter vom Äquator entfernt, desto ungleichmäßiger fallen die Placidus-Häuser aus. In hohen Breiten werden einzelne Häuser sehr groß. Am Äquator sind beide Systeme fast deckungsgleich.'}
];
