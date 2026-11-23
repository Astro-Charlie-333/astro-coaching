/* ── Die Sätze der Analyse ─────────────────────────────────────
   Aufgabe 61, aus 34 und 38. Bis zum 2026-11-22 standen diese
   Zeichenketten in `analyse-app.js`, zwischen der Rechnung und dem
   Markup. Was in der Anzeige steht, zieht beim Umzug in eine andere
   Umgebung nicht mit (`PRODUKT.md` Abschnitt 7): Rechnen weiß nichts
   von Sätzen, und Sätze wissen nichts vom Himmel.

   Die Scheidelinie ist dieselbe wie in `dossier-texte.js`: Hier
   steht jedes Wort, das ein Mensch liest, samt dem Markup, das zu
   diesem Wort gehört — ein Verweis, eine Hervorhebung. In der
   Anzeige bleibt nur das Gerüst: Klassen, Tags, Zahlen aus der
   Rechnung.

   Die Lücken heißen `{so}` und werden von `anFuell` gefüllt, das
   `AC_FUELL` aus `kern/fuellen.js` aufruft — die eine Stelle, an der
   ein fehlender Wert abbricht statt lautlos zu verschwinden
   (Aufgabe 94). `bau-analyse.py` zählt nach, dass jede Lücke, die
   hier steht, auch gefüllt wird.

   Die Namen der Themen und die Befundtexte stehen weiterhin in den
   `thema-*.js` — das sind Datendateien, keine Anzeige. Hierher
   gehört, was die Seite um sie herum sagt. */
var AN_T = {

 /* ── Die Wahl ────────────────────────────────────────────── */

 /* Ein Thema, dessen Regelsatz noch dünn ist, sagt das selbst. */
 aufbau:'<i>im Aufbau</i>',

 /* Ohne Profil rechnet nichts. Der Verweis gehört zum Satz. */
 keinProfil:'Noch kein Profil angelegt. '+
   '<a href="profile.html">Hier legst du eins an</a>.',

 /* Die Beschriftung der Personenzeilen. „Zwischen … und …" bei
    zwei Menschen, „Person" bei einem. */
 werEins:'Person',
 werErste:'Zwischen',
 werZweite:'und',

 /* Hinter dem eigenen Profil steht, dass es das eigene ist. */
 ichMarke:' (ich)',

 /* Die Beschriftung der Formenzeile, wenn ein Thema keine eigene
    mitbringt. */
 formLabel:'Als',

 /* ── Die sechs Arten von Befund ──────────────────────────────
    Welche Arten es gibt und in welcher Reihenfolge sie stehen,
    weiß die Anzeige; wie sie heißen, steht hier. */
 art:{
  bild:    {n:'Das Bild',
            u:'Was für ein Fall das überhaupt ist'},
  nenner:  {n:'Gemeinsame Nenner',
            u:'Worauf ihr euch treffen könnt — hier fängt die Arbeit an'},
  staerke: {n:'Was trägt',
            u:'Die Stellen, auf die Verlass ist'},
  reibung: {n:'Wo es reibt',
            u:'Jede mit einem Ansatz, der für beide gilt'},
  aufgabe: {n:'Für beide etwas zu tun',
            u:'Konkret, klein genug, dass es passiert'},
  beratung:{n:'Für dich als Coachin',
            u:'Nicht zum Vorlesen — deine Vorbereitung'}
 },

 /* ── Das Ergebnis ────────────────────────────────────────── */

 /* Ein Paarthema braucht zwei Profile. Statt einer leeren Seite
    steht da, was fehlt und wo es herkommt. */
 zweiProfile:'Für dieses Thema brauchst du <b>zwei Profile</b>. '+
   '<a href="profile.html">Noch eins anlegen</a> — dann rechnet es.',

 ergebnisLabel:'Das Ergebnis',

 /* ── Die Waage ───────────────────────────────────────────────
    Hier saß der Fehler, der beim Umzug am 2026-11-22 aufgefallen
    ist. Die Beschriftung wurde an die Zahl geklebt:

        llab: erg.nenner + ' gemeinsame Nenner'   → „1 gemeinsame Nenner"
        llab: nt + ' trägt'                       → „4 trägt"

    Beides ist falsch, und zwar immer dann, wenn die Zahl die Form
    des Wortes bestimmt — dieselbe Klasse wie REGELN.md 6f: Was sich
    mit dem eingesetzten Wert ändert, braucht seine eigene Vorlage.
    Deshalb steht hier je Schlüssel die Einzahl und die Mehrzahl, und
    die Rechnung liefert nur den Schlüssel und die Zahl.

    Die Einzahl trägt keine Lücke — sie gilt genau für die Eins. Die
    Mehrzahl trägt `{n}` und deckt auch die Null ab („0 Befunde
    tragen" ist richtiges Deutsch). `bau-analyse.py` prüft beides. */
 waage:{
  traegt:{ein:'1 Befund trägt',       viele:'{n} Befunde tragen'},
  bremst:{ein:'1 Befund bremst',      viele:'{n} Befunde bremsen'},
  reibt: {ein:'1 Befund reibt',       viele:'{n} Befunde reiben'},
  nenner:{ein:'1 gemeinsamer Nenner', viele:'{n} gemeinsame Nenner'},
  punkte:{ein:'1 Reibungspunkt',      viele:'{n} Reibungspunkte'}
 },
 /* Was ein Mensch hört, der die Waage nicht sehen kann. */
 waageBild:'{pl} Prozent {llab}, {pr} Prozent {rlab}',

 /* ── Die Befunde ─────────────────────────────────────────── */

 ansatzLabel:'Ansatz',
 tunLabel:'Konkret',

 /* Greift keine Regel, sagt die Seite, warum — und behauptet
    nicht, es sei nichts da. */
 keineRegel:'Für diese Kombination hat keine Regel gegriffen. '+
   'Das kommt bei den Themen im Aufbau noch vor.',

 /* Eine Regel, die sich verrechnet, meldet sich in der Werkstatt-
    zeile am Fuß. Kein Satz für die Besucherin, aber ein Satz. */
 regelfehler:'Regelfehler: {liste}',
 regelTrenner:' | ',

 /* ── Der Bericht zum Mitnehmen ───────────────────────────── */

 berichtKopfZwei:'{thema} — {a} und {b}',
 berichtKopfEins:'{thema} — {a}',
 berichtForm:' · {form}',
 berichtErgebnis:'ERGEBNIS: {titel}',
 berichtTrenner:'── {n} ──',
 berichtAnsatz:'Ansatz: {text}',
 berichtTun:'Konkret: {text}',
 berichtBeleg:'({beleg})',
 berichtFuss:'— Astro-Charlie. Hypothesen aus einer Rechnung, '+
   'gültig nur soweit die Menschen sie bestätigen.',

 /* ── Was der Kopierknopf zurückmeldet ────────────────────── */

 kopiert:'Bericht kopiert.',
 kopieFehler:'Kopieren ging nicht — markier den Text und nimm Strg+C.',
 kopieNichts:'Dieser Browser kann nicht kopieren — markier den Text '+
   'und nimm Strg+C.'
};
