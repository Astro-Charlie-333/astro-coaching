/* ───────────────────────────────────────────────────────────────
   bk-daten.js — alle Sätze des Baukastens.

   Mandy am 13.11.: Themen, Checklisten und Routinen „so einbauen, dass
   ich sie Profilen individualisiert zuweisen kann … angepasst auf das
   Chart … erst mal nur meine Sichtweise … dann kann ich was anklicken,
   erstelle xyz, und dann wird es dem jeweiligen Profil zugewiesen".

   Jeder Baustein hat ein festes Gerüst, das für alle gilt, und Teile,
   die aus dem Geburtsbild gewählt werden. Gewählt wird nach dem Element
   (Feuer, Erde, Luft, Wasser) eines Punkts — vier Texte je Teil, mehr
   behauptet die Seite nicht. Die Fachzeile („Mond in Krebs") steht im
   Entwurf für Mandy und nur auf Wunsch in der Datei für die Klientin.

   Die Anzeige (bk-app.js) schreibt keinen Satz und kein „dein" selbst.
   ─────────────────────────────────────────────────────────────── */

var BK_ELEMENT = ['Feuer', 'Erde', 'Luft', 'Wasser'];

/* Die Bausteine. `chart: true` heißt: braucht ein Profil mit Geburtsbild. */
var BK_BAUSTEINE = [
 {k:'abend', chart:true, titel:'Abendroutine bei Angst', kurz:'Runterkommen, wenn der Kopf abends nicht aufhört. Ein Gerüst für alle, dazu, was diesen Menschen beruhigt.',
  datei:'Abendroutine'},
 {k:'morgen', chart:true, titel:'Morgenroutine bei Angst', kurz:'Gut in den Tag kommen, wenn die Angst schon beim Aufwachen da ist. Gerüst plus persönlicher Start.',
  datei:'Morgenroutine'},
 {k:'arzt', chart:false, titel:'Was beim Arztbesuch ansprechen', kurz:'ADHS und AuDHS: welche Werte man prüfen lassen kann, wenn ein Mangel vermutet wird, und welche Fragen helfen. Ohne Dosierungen.',
  datei:'Arztbesuch'}];

/* ── Abendroutine ─────────────────────────────────────────── */
var BK_ABEND = {
 titel:'Deine Abendroutine',
 lede:'Für Abende, an denen der Kopf nicht aufhören will. Oben das Gerüst, das bei fast allen hilft, darunter, was dich nach deinem Geburtsbild am ehesten beruhigt. Nimm, was passt, und lass den Rest weg.',
 geruestTitel:'Das Gerüst',
 geruest:[
  ['90 Minuten vorher', 'Licht runter, Bildschirme weg oder auf warmes Licht. Das Gehirn braucht das Signal, dass der Tag vorbei ist.'],
  ['60 Minuten vorher', 'Der Sorgenzettel: Schreib alles auf, was kreist, und zu jedem Punkt einen kleinen nächsten Schritt für morgen. Dann den Zettel zuklappen. Die Sorgen sind nicht weg, aber sie haben einen Platz.'],
  ['30 Minuten vorher', 'Dein persönliches Runterkommen, siehe unten.'],
  ['Im Bett', 'Zehnmal atmen: vier Zähler ein, sechs aus. Das längere Ausatmen sagt dem Nervensystem, dass es sicher ist.'],
  ['Wenn die Angst kommt', 'Fünf Dinge, die du siehst, vier, die du hörst, drei, die du spürst, zwei, die du riechst, eins, das du schmeckst. Das holt dich aus dem Kopf zurück in den Raum.']],
 teile:[
  {k:'mond', kopf:'Was dich beruhigt', punkt:'Mond', texte:{
    Feuer:'Du kommst über kurze, klare Rituale zur Ruhe, nicht über lange Abläufe. Eine Kerze, ein Satz, ein Lied: fertig. Je einfacher, desto eher machst du es wirklich.',
    Erde:'Du beruhigst dich über den Körper und über Wiederholung. Jeden Abend dieselbe Reihenfolge, etwas Warmes zu trinken, eine schwere Decke. Dein System liebt das Vorhersehbare.',
    Luft:'Dich beruhigt, wenn Gedanken eine Form bekommen. Aufschreiben, eine ruhige Stimme hören, ein Hörbuch, das du schon kennst. Leere Stille ist für dich eher laut.',
    Wasser:'Dich beruhigt, was weich ist und Gefühle fließen lässt. Warmes Wasser, leise Musik ohne Text, einmal weinen dürfen. Gefühle, die raus dürfen, halten dich nicht mehr wach.'}},
  {k:'mars', kopf:'Wohin mit der Energie', punkt:'Mars', texte:{
    Feuer:'Dein Körper braucht vorher einen kurzen, kräftigen Abschluss: zehn Minuten zügig gehen, Treppen, Kniebeugen. Danach sinkt der Pegel schneller.',
    Erde:'Deine Energie entlädt sich langsam. Dehnen, Füße massieren, etwas mit den Händen tun. Kein Sport kurz vor dem Schlafen, eher am frühen Abend.',
    Luft:'Bei dir sitzt die Unruhe im Kopf, nicht in den Beinen. Ein kurzer Spaziergang ohne Handy oder ein Gespräch, das den Tag abschließt, hilft mehr als Training.',
    Wasser:'Deine Energie hängt an der Stimmung. Wenn etwas dich aufgewühlt hat, schreib es auf oder sprich es aus, bevor du dich hinlegst. Sonst arbeitet es im Liegen weiter.'}},
  {k:'merkur', kopf:'Gegen das Gedankenkarussell', punkt:'Merkur', texte:{
    Feuer:'Gib deinen Gedanken ein Ziel: drei Punkte für morgen, mehr nicht. Ein Plan beruhigt dich mehr als Grübeln.',
    Erde:'Mach aus dem Kreisen eine Liste mit Häkchen. Was erledigt ist, wird abgehakt, was offen ist, bekommt einen Tag. Ordnung auf Papier macht Ordnung im Kopf.',
    Luft:'Sprich die Gedanken laut aus oder schreib sie ohne Pause auf, bis nichts mehr kommt. Bei dir hilft es, sie aus dem Kopf zu holen, nicht, sie wegzudrücken.',
    Wasser:'Frag bei jedem Gedanken: Ist das mein Gefühl oder das von jemand anderem? Vieles, was abends kreist, gehört gar nicht dir.'}}],
 rueckzug:'Dazu brauchst du wahrscheinlich mehr Rückzug, als du dir zugestehst. Eine halbe Stunde ganz allein, ohne Nachrichten, ist kein Luxus, sondern Pflege.',
 satzTitel:'Ein Satz für den Abend',
 saetze:{
  Feuer:'Ich habe heute genug getan. Morgen ist ein neuer Anfang.',
  Erde:'Ich bin sicher. Mein Körper darf jetzt schwer werden.',
  Luft:'Meine Gedanken dürfen bis morgen warten. Sie gehen nicht verloren.',
  Wasser:'Ich darf fühlen, was ich fühle. Und dann darf ich loslassen.'},
 schluss:'Eine Routine wirkt nicht beim ersten Mal. Gib ihr zwei Wochen, bevor du entscheidest, ob sie hilft. Und wenn die Angst über Wochen nicht besser wird, sprich mit deiner Hausärztin darüber.'};

/* ── Morgenroutine ────────────────────────────────────────── */
var BK_MORGEN = {
 titel:'Deine Morgenroutine',
 lede:'Für Morgen, an denen die Angst schon beim Aufwachen da ist. Oben das Gerüst, das bei fast allen hilft, darunter, wie du nach deinem Geburtsbild am besten in den Tag kommst.',
 geruestTitel:'Das Gerüst',
 geruest:[
  ['Die ersten 20 Minuten', 'Kein Handy. Nachrichten und Mails bestimmen sonst, wie dein Tag sich anfühlt, bevor du selbst da bist.'],
  ['Licht', 'Vorhang auf oder kurz ans Fenster. Tageslicht hilft dem Körper, wach zu werden und abends wieder müde.'],
  ['Wasser', 'Ein Glas Wasser, bevor der Kaffee kommt.'],
  ['Der Körper', 'Zwei Minuten bewegen, siehe unten. Angst sitzt im Körper, und Bewegung baut sie ab.'],
  ['Die kleinste Aufgabe', 'Mach als Erstes etwas, das in fünf Minuten erledigt ist. Ein erledigter Punkt am Morgen nimmt der Angst die Größe.']],
 teile:[
  {k:'asc', kopf:'Wie du in den Tag startest', punkt:'Aszendent', texte:{
    Feuer:'Du kommst über einen schnellen, klaren Start in Gang. Aufstehen, kalt waschen, raus. Langes Liegenbleiben macht die Angst bei dir größer.',
    Erde:'Du brauchst einen langsamen, immer gleichen Start. Plane morgens zehn Minuten mehr ein, als du denkst. Hetze ist für dich der schnellste Weg in die Angst.',
    Luft:'Du startest gut mit etwas für den Kopf: drei Seiten schreiben, ein kurzer Podcast, ein Gedanke für den Tag. Dann erst die Pflichten.',
    Wasser:'Du wachst über Gefühl auf, nicht über Pläne. Nimm dir zwei Minuten, um zu spüren, wie es dir geht, bevor du in den Tag gehst. Ignorieren macht es bei dir lauter.'}},
  {k:'mars', kopf:'Bewegung, die passt', punkt:'Mars', texte:{
    Feuer:'Kurz und kräftig: ein paar Hampelmänner, eine Runde um den Block, schnelle Musik. Zwei Minuten reichen, Hauptsache intensiv.',
    Erde:'Langsam und körperlich: dehnen, Schultern kreisen, barfuß stehen. Ein Gefühl von Boden unter den Füßen.',
    Luft:'Bewegung mit frischer Luft: Fenster auf und tief atmen, ein kurzer Weg zum Bäcker. Luft im Raum ist für dich Luft im Kopf.',
    Wasser:'Sanft und fließend: ein paar ruhige Bewegungen, warmes Duschen, Musik, die zur Stimmung passt. Nichts, das sich wie Pflicht anfühlt.'}},
  {k:'mond', kopf:'Wenn du mit Angst aufwachst', punkt:'Mond', texte:{
    Feuer:'Steh auf, statt im Bett zu grübeln. Bewegung unterbricht die Schleife bei dir schneller als jedes Nachdenken.',
    Erde:'Leg eine Hand auf den Bauch und spür das Gewicht deines Körpers auf der Matratze. Sicherheit kommt bei dir über das Spüren.',
    Luft:'Schreib die Angst in einem Satz auf. Was auf dem Papier steht, verliert im Kopf an Größe.',
    Wasser:'Sag dir: Das ist ein Gefühl, keine Tatsache. Gefühle kommen und gehen, auch dieses.'}}],
 satzTitel:'Ein Satz für den Morgen',
 saetze:{
  Feuer:'Ich fange an. Der Rest kommt mit.',
  Erde:'Schritt für Schritt. Ich habe Zeit.',
  Luft:'Ich muss heute nicht alles wissen, nur den nächsten Schritt.',
  Wasser:'Ich bin hier, so wie ich bin, und das reicht.'},
 punktSatz:'Sonne',
 schluss:'Eine Routine wirkt nicht beim ersten Mal. Gib ihr zwei Wochen, bevor du entscheidest, ob sie hilft. Und wenn die Angst über Wochen nicht besser wird, sprich mit deiner Hausärztin darüber.'};

/* ── Arztbesuch ───────────────────────────────────────────── */
/* Stand 13.11.2026. Grundlage: die Labordiagnostik-Empfehlungen einer
   ärztlich geführten ADHS-Spezialambulanz (Mai 2026) und eine Studie
   zu Eisen, Magnesium, Vitamin D und Zink bei Kindern mit ADHS-Symptomen
   (2016). Bewusst keine Dosierungen und keine Grenzwerte: Die gehören in
   die Hand der Ärztin, die den Befund kennt. */
var BK_ARZT = {
 titel:'Was du beim Arztbesuch ansprechen kannst',
 lede:'Bei ADHS und AuDHS wird oft geraten, Nahrungsergänzung zu nehmen. Sinnvoll ist das nur, wenn wirklich etwas fehlt, und das zeigt nur eine Blutuntersuchung. Hier steht, welche Werte du ansprechen kannst, warum, und welche Fragen helfen.',
 vorabTitel:'Vorab',
 vorab:'Das hier ist keine medizinische Beratung und kein Behandlungsplan. Nimm keine Nahrungsergänzung auf Verdacht und keine Mischpräparate, die versprechen, ADHS zu bessern. Für solche Mischungen gibt es ohne nachgewiesenen Mangel keinen Beleg. Dosierung und Dauer gehören in die Hand deiner Ärztin.',
 werteTitel:'Werte, nach denen du fragen kannst',
 werte:[
  ['Schilddrüse (TSH)', 'Eine Überfunktion kann Unruhe und Konzentrationsprobleme machen, die wie ADHS aussehen. Deshalb wird sie zur Abgrenzung geprüft, besonders vor Medikamenten.'],
  ['Eisenspeicher (Ferritin) mit Blutbild', 'Ein leerer Eisenspeicher macht müde und unkonzentriert. In Studien hatten Kinder mit ADHS-Symptomen häufiger niedrige Werte. Frag, ob dazu ein Entzündungswert (CRP) bestimmt wird, weil eine Entzündung das Ferritin höher aussehen lässt, als es ist.'],
  ['Vitamin D', 'Niedrige Werte sind in Deutschland im Winter häufig und können mit Müdigkeit und Stimmung zusammenhängen. Zusätzliches Vitamin D hilft nur, wenn wirklich ein Mangel besteht.'],
  ['Vitamin B12 und Folsäure', 'Ein Mangel macht erschöpft und unkonzentriert. Das Risiko ist höher bei veganer Ernährung, nach Magen-Operationen und bei manchen Medikamenten.'],
  ['Magnesium und Zink', 'In Studien bei Kindern mit ADHS-Symptomen teils niedriger. Der Blutwert zeigt bei Magnesium nur einen Teil des Speichers. Frag, ob eine Messung bei dir aussagekräftig ist.'],
  ['Omega-3-Fettsäuren', 'Werden nicht routinemäßig gemessen. Studien zeigen bei ADHS höchstens kleine Effekte. Frag, ob es für dich überhaupt sinnvoll ist, bevor du Geld dafür ausgibst.']],
 medikamentTitel:'Wenn Medikamente infrage kommen',
 medikament:'Vor Medikamenten gegen ADHS werden üblicherweise Blutdruck und Puls gemessen, je nach Vorgeschichte auch ein EKG geschrieben. Erwähne Herzprobleme in der Familie, Schlafprobleme und alles, was du sonst einnimmst, auch Nahrungsergänzung.',
 fragenTitel:'Fragen, die du stellen kannst',
 fragen:[
  'Welche dieser Werte sind bei mir sinnvoll, und warum?',
  'Zahlt das die Krankenkasse, oder entstehen Kosten für mich?',
  'Wenn ein Wert niedrig ist: Was ist die Ursache, und wie behandeln wir das?',
  'Wann kontrollieren wir den Wert wieder?',
  'Passt das zu dem, was ich sonst nehme?'],
 mitTitel:'Was du mitbringen kannst',
 mit:[
  'Eine Liste von allem, was du einnimmst, auch Nahrungsergänzung',
  'Frühere Blutwerte, wenn du welche hast',
  'Notizen über zwei bis vier Wochen: Müdigkeit, Schlaf, Konzentration, bei Frauen den Zyklus',
  'Wie du dich ernährst, zum Beispiel vegetarisch oder vegan'],
 kosten:'Manche Werte zahlt die Kasse nur bei begründetem Verdacht. Frag vorher, ob Kosten entstehen.',
 quellenTitel:'Grundlage',
 quellen:[
  ['ADHS-Spezialambulanz Hamburg: ADHS und Schilddrüse, Eisen, Vitamine (Mai 2026)', 'https://adhs-spezialambulanz.de/blog/adhs-schilddruese-eisen-vitamine'],
  ['Studie: Eisen-, Magnesium-, Vitamin-D- und Zinkmangel bei Kindern mit ADHS-Symptomen (2016)', 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4928738/']],
 schluss:'Nahrungsergänzung ersetzt keine Behandlung. Sie gleicht im besten Fall aus, was fehlt, und das ist schon viel.'};

/* Fußzeile jeder Datei, die an eine Klientin geht. */
var BK_FUSS = 'Erstellt für dich von Mandy Netta. Keine medizinische oder psychotherapeutische Beratung.';

/* Alle übrigen Wörter der Anzeige. */
var BK_TEXT = {
 keinProfil:'Noch kein Profil angelegt. Leg unter <a href="profile.html">Profile</a> einen Menschen mit Geburtsdaten an.',
 brauchtChart:'Dieser Baustein braucht ein Geburtsbild. Das gewählte Profil hat keine vollständigen Geburtsdaten.',
 fuer:'Für {name}',
 entwurf:'Entwurf',
 frei:'Freigegeben',
 aus:'Aus dem Geburtsbild',
 fachzeile:'{punkt} in {zeichen} · {element}',
 zuweisen:'Diesem Profil zuweisen',
 zugewiesen:'Zugewiesen. Steht unten in der Liste.',
 datei:'Als Datei herunterladen',
 kopiert:'Kopiert.',
 kopierenNicht:'Kopieren ging nicht. Markiere den Text in der Vorschau und kopiere ihn von Hand.',
 listeLeer:'Diesem Profil ist noch nichts zugewiesen.',
 oeffnen:'Öffnen',
 freigeben:'Freigeben',
 zurueck:'Zurück auf Entwurf',
 entfernen:'Entfernen',
 sicher:'Wirklich entfernen?',
 ja:'Ja',
 nein:'Nein',
 dateiName:'{art}-{name}',
 waehle:'Wähle oben einen Baustein.'};

/* Aussehen der Datei, die an eine Klientin geht: eigenständig, ohne
   Skript, in den Farben der Plattform. */
var BK_DATEI_STIL = "body{margin:0;background:#FCF7EF;color:#231F1A;font:16px/1.65 'DM Sans',system-ui,-apple-system,sans-serif;padding:32px max(18px,env(safe-area-inset-left,0px)) 56px}main{max-width:680px;margin:0 auto;display:grid;gap:22px}.ey{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#9A7235;margin:0}h1{font-family:'Fraunces',Georgia,serif;font-weight:300;font-size:clamp(32px,8vw,46px);line-height:1.08;color:#2E3A5C;margin:0}h2{font-family:'Fraunces',Georgia,serif;font-weight:400;font-size:24px;color:#2E3A5C;margin:8px 0 0}p{margin:0}.lede{font-size:17px}.box{background:#FFFDFA;border:1px solid #EBE1D2;border-radius:14px;padding:16px 18px;display:grid;gap:10px}.zeit{display:grid;grid-template-columns:minmax(0,9em) minmax(0,1fr);gap:4px 14px;padding:10px 0;border-top:1px solid #EBE1D2}.zeit:first-child{border-top:0}.zeit b{color:#9A7235;font-weight:600}.teil{background:#FFFDFA;border:1px solid #EBE1D2;border-left:3px solid #9A7235;border-radius:12px;padding:14px 16px;display:grid;gap:6px}.teil h3{font-family:'Fraunces',Georgia,serif;font-weight:500;font-size:19px;color:#2E3A5C;margin:0}.fach{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12px;color:#6B6259}.satz{font-family:'Fraunces',Georgia,serif;font-style:italic;font-weight:300;font-size:24px;line-height:1.35;color:#2E3A5C;background:#F7EFE1;border-radius:14px;padding:20px}.vorab{background:#F7EFE1;border-left:3px solid #9A7235;border-radius:10px;padding:14px 16px}ul,ol{margin:0;padding-left:1.2em;display:grid;gap:6px}.wert{display:grid;gap:4px;padding:10px 0;border-top:1px solid #EBE1D2}.wert:first-child{border-top:0}.wert b{color:#2E3A5C}.klein{font-size:13px;color:#6B6259}a{color:#2E3A5C}footer{margin-top:20px;border-top:1px solid #EBE1D2;padding-top:14px;font-size:13px;color:#6B6259}@media(max-width:480px){.zeit{grid-template-columns:1fr}}";

/* Schriften der Datei. Ohne Netz fällt sie auf Systemschriften zurück. */
var BK_DATEI_SCHRIFT = 'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,600&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300&family=JetBrains+Mono&display=swap';

/* Der Kopf jeder Datei. */
var BK_DATEI_ANFANG = '<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">';

/* ═══ Zweite Lieferung, 13.11.: Haltepunkte, Wochenstruktur und die
   beiden Termin-Vorbereitungen. ═══════════════════════════════════ */

BK_BAUSTEINE.push(
 {k:'halt', chart:true, titel:'Haltepunkte bei Gedankenschleifen', kurz:'Etwas zum Festhalten, wenn Angst um Arbeit, Selbstwert oder eine ausbleibende Nachricht im Kreis läuft.',
  datei:'Haltepunkte'},
 {k:'woche', chart:true, titel:'Wochenstruktur bei schwankender Energie', kurz:'Eine Woche, die mit guten und schlechten Tagen rechnet. Energiestufen, Puffer und ein persönlicher Rhythmus.',
  datei:'Wochenstruktur'},
 {k:'termin', chart:false, titel:'Termin-Vorbereitung ADHS', kurz:'Typische Merkmale ankreuzen, Leidensdruck einschätzen, Fragen für das Gespräch. Zum Ausfüllen auf dem Handy.',
  datei:'Termin-ADHS'},
 {k:'termin2', chart:false, titel:'Termin-Vorbereitung AuDHS', kurz:'Dasselbe für ADHS und Autismus gemeinsam, mit Maskieren, Reizen und Zyklus. Für Frauen geschrieben.',
  datei:'Termin-AuDHS'});

/* Die drei Arten, nach denen manche Teile wählen. Reihenfolge wie z % 3. */
var BK_MODUS = ['kardinal', 'fix', 'veränderlich'];

/* ── Haltepunkte ──────────────────────────────────────────── */
var BK_HALT = {
 titel:'Deine Haltepunkte',
 lede:'Für Momente, in denen ein Gedanke im Kreis läuft: Angst um Arbeit und Geld, das Gefühl, nicht genug zu sein, das Warten auf eine Nachricht. Du musst die Schleife nicht lösen. Es reicht, einen Haltepunkt zu finden.',
 geruestTitel:'Wenn die Schleife startet',
 geruest:[
  ['Benennen', 'Sag dir leise: Ich bin gerade in einer Schleife. Was man benennt, verliert einen Teil seiner Macht.'],
  ['Atmen', 'Vier Zähler ein, sechs aus, fünfmal. Das längere Ausatmen holt den Körper aus dem Alarm.'],
  ['Boden', 'Spür die Füße auf dem Boden und die Hände auf den Oberschenkeln. Du bist hier, nicht in der Zukunft, vor der du Angst hast.'],
  ['Fragen', 'Nimm eine der drei Fragen unten. Nur eine.'],
  ['Ein Schritt', 'Tu die kleinste Sache, die in deiner Hand liegt. Eine Mail, ein Glas Wasser, ein Spaziergang. Handeln unterbricht Kreisen.']],
 teile:[
  {k:'mond', kopf:'Was dich auffängt', punkt:'Mond', texte:{
    Feuer:'Dich fängt Bewegung auf, nicht Nachdenken. Steh auf, geh ein paar Schritte, mach etwas mit Schwung. Danach siehst du klarer.',
    Erde:'Dich fängt Verlässliches auf: eine warme Tasse, deine gewohnte Ecke, ein Ablauf, den du kennst. Sicherheit kommt bei dir über das Vertraute.',
    Luft:'Dich fängt ein Gespräch auf oder ein Satz auf Papier. Sobald der Gedanke draußen ist, wird er kleiner.',
    Wasser:'Dich fängt auf, wenn das Gefühl da sein darf. Leg eine Hand aufs Herz und sag dir: Das ist gerade schwer, und das darf so sein.'}},
  {k:'sonne', kopf:'Woran du dich erinnern kannst', punkt:'Sonne', texte:{
    Feuer:'Du hast schon oft angefangen, wo andere gezögert haben. Mut ist bei dir keine Laune, sondern ein Grundzug, auch wenn er sich heute leise anfühlt.',
    Erde:'Du hast schon vieles Stück für Stück aufgebaut. Was du anfasst, bekommt Bestand, auch wenn es langsamer geht, als du es dir wünschst.',
    Luft:'Du findest Lösungen, indem du Dinge verbindest: Menschen, Ideen, Wege. Das hat dich schon oft weitergebracht, und es wird es wieder tun.',
    Wasser:'Du spürst, was andere übersehen. Das macht dich verletzlich, und es ist zugleich deine größte Stärke.'}},
  {k:'saturn', kopf:'Was deine Angst schützen will', punkt:'Saturn', texte:{
    Feuer:'Deine Angst will verhindern, dass du dich blamierst, wenn du vorangehst. Sie meint es gut und übertreibt. Du darfst trotzdem gehen, einfach etwas langsamer.',
    Erde:'Deine Angst will verhindern, dass dir der Boden wegbricht: Geld, Sicherheit, Verlässlichkeit. Frag sie, was heute konkret fehlt, statt was irgendwann fehlen könnte.',
    Luft:'Deine Angst will verhindern, dass du falsch verstanden oder ausgeschlossen wirst. Frag dich: Wessen Urteil fürchte ich gerade, und ist das wirklich so wichtig?',
    Wasser:'Deine Angst will verhindern, dass du verlassen oder verletzt wirst. Sie erinnert dich an alte Wunden, nicht an das, was heute passiert.'}}],
 fragenTitel:'Drei Fragen',
 fragen:[
  'Wozu könnte das, was gerade passiert, gut sein?',
  'Was davon ist meine Aufgabe, und was ist die Aufgabe von jemand anderem?',
  'Was ist der kleinste Schritt, der jetzt in meiner Hand liegt?'],
 schleifenTitel:'Wenn es um diese Themen kreist',
 schleifen:[
  ['Angst um Arbeit und Geld', 'Schreib auf, was diese Woche konkret ansteht, nicht was in einem Jahr sein könnte. Die Angst lebt in der Zukunft, handeln kannst du nur heute.'],
  ['Ich bin nicht genug', 'Dein Wert hängt nicht an deiner Leistung von heute. Nenn drei Dinge, die du in letzter Zeit geschafft hast, auch kleine.'],
  ['Warten auf eine Nachricht', 'Was ein anderer Mensch tut oder nicht tut, liegt bei ihm. Leg das Handy für eine Stunde weg und tu etwas, das nur dir gehört.']],
 satzTitel:'Ein Satz zum Festhalten',
 saetze:{
  Feuer:'Ich muss nicht alles heute lösen. Ich gehe den nächsten Schritt.',
  Erde:'Ich habe Boden unter den Füßen. Das hier geht vorbei.',
  Luft:'Ein Gedanke ist ein Gedanke, keine Wahrheit.',
  Wasser:'Ich darf fühlen, was ich fühle, und trotzdem sicher sein.'},
 schluss:'Haltepunkte ersetzen keine Hilfe, wenn es dauerhaft schwer bleibt. Dann ist ein Gespräch mit deiner Hausärztin oder einer Therapeutin der nächste gute Schritt.'};

/* ── Wochenstruktur ───────────────────────────────────────── */
var BK_WOCHE = {
 titel:'Deine Woche',
 lede:'Eine Woche, die damit rechnet, dass nicht jeder Tag gleich ist. Statt eines starren Plans gibt es Aufgaben für jede Energiestufe, feste Anker und Puffer. Dazu, wie dein Rhythmus nach deinem Geburtsbild am ehesten funktioniert.',
 stufenTitel:'Drei Energiestufen',
 stufen:[
  ['Hoch', 'Aufgaben, die Anlauf brauchen: Neues anfangen, schwierige Gespräche, kreative Arbeit. Nicht verplanen, sondern nutzen, wenn es so weit ist.'],
  ['Mittel', 'Routine: Mails, Erledigungen, Dinge, die du kennst. Das meiste in einer Woche gehört hierher.'],
  ['Niedrig', 'Eine Liste mit Dingen, die auch müde gehen: sortieren, einkaufen, eine Rechnung bezahlen. So zählt auch ein schlechter Tag.']],
 geruestTitel:'Das Gerüst der Woche',
 geruest:[
  ['Nur 60 Prozent', 'Plane nur gut die Hälfte deiner Zeit fest ein. Der Rest fängt auf, was dazwischenkommt.'],
  ['Ein Puffertag', 'Ein Tag pro Woche ohne Termine. Er ist kein Faulenzen, sondern der Grund, warum der Rest hält.'],
  ['Feste Anker', 'Aufstehen, Essen, Licht aus jeden Tag ungefähr gleich. Anker halten die Woche zusammen, wenn die Energie schwankt.'],
  ['Am Sonntag', 'Drei Fragen: Was hat gut funktioniert? Was hat Kraft gekostet? Was lasse ich nächste Woche weg?']],
 teile:[
  {k:'mars', kopf:'Wie deine Energie kommt', punkt:'Mars', texte:{
    Feuer:'Deine Energie kommt in Schüben. Plane in kurzen Spurts mit Pausen dazwischen, statt in gleichmäßigen Blöcken.',
    Erde:'Deine Energie kommt langsam und hält dann lange. Gib Anfängen mehr Zeit und nutze die Tage, an denen es läuft, für das Große.',
    Luft:'Deine Energie hängt am Interesse. Wechsle zwischen Aufgaben, statt eine einzige den ganzen Tag zu machen.',
    Wasser:'Deine Energie folgt der Stimmung. Entscheide morgens, welche Stufe heute ist, und wähle die Aufgaben danach.'}},
  {k:'mond', kopf:'Wie viel Struktur dir guttut', punkt:'Mond', nach:'modus', texte:{
    kardinal:'Du startest gern und verlierst dann die Lust. Bau jede Woche einen kleinen Neustart ein, zum Beispiel am Mittwoch, statt auf Durchhalten zu setzen.',
    fix:'Du brauchst feste Abläufe, die sich nicht ständig ändern. Halte die Grundform der Woche gleich und ändere nur, was wirklich muss.',
    'veränderlich':'Du brauchst Abwechslung in der Struktur. Plane Themen pro Tag, nicht feste Uhrzeiten, und tausch Tage, wenn es passt.'}},
  {k:'merkur', kopf:'Wie du planst', punkt:'Merkur', texte:{
    Feuer:'Plane kurz: drei Ziele für die Woche, mehr nicht. Lange Listen bremsen dich aus.',
    Erde:'Plane schriftlich, mit Kalender und Liste zum Abhaken. Was auf Papier steht, gibt dir Ruhe.',
    Luft:'Plane locker, etwa als Notiz oder Skizze, und lass Raum für Ideen. Zu starre Pläne machst du ohnehin wieder neu.',
    Wasser:'Plane am Abend vorher für den nächsten Tag, nicht für die ganze Woche. So passt der Plan zu dem, wie es dir wirklich geht.'}}],
 satzTitel:'Ein Satz für die Woche',
 saetze:{
  Feuer:'Ein guter Tag zählt, ein schwacher Tag auch.',
  Erde:'Langsam ist auch eine Geschwindigkeit.',
  Luft:'Ich darf umplanen. Das ist kein Scheitern.',
  Wasser:'Ich höre auf meine Energie und nicht nur auf meinen Plan.'},
 punktSatz:'Sonne',
 schluss:'Keine Woche läuft nach Plan. Das Ziel ist nicht, den Plan zu erfüllen, sondern freundlicher mit den Schwankungen umzugehen.'};

/* ── Termin-Vorbereitungen ────────────────────────────────── */
/* Aus den beiden Seiten für Stefan vom 13.11., ohne Skript: Kästchen
   und Skalen funktionieren in der Datei von selbst, gespeichert wird
   nichts. Die Kriterien folgen den gängigen Diagnosekriterien für
   Erwachsene; seit 2013 dürfen ADHS und Autismus gemeinsam
   diagnostiziert werden. */
var BK_STUFEN = ['gar nicht', 'etwas', 'deutlich', 'stark', 'sehr stark'];

var BK_TERMIN = {
 titel:'Für deinen Termin',
 lede:'Im Gespräch selbst fällt einem oft nur die Hälfte ein. Kreuz vorher in Ruhe an, was du kennst, schätz ein, wie sehr es dich belastet, und nimm die Seite mit ins Gespräch.',
 vorabTitel:'Wichtig vorab',
 vorab:'Das hier ist kein Test und keine Diagnose. Fast jeder Mensch erkennt sich in einigen Punkten wieder. Die Seite hilft dir nur, deine Erfahrungen in Worte zu fassen. Ob es ADHS ist, klärt die Fachperson. Was du hier ankreuzt, wird nirgends gespeichert.',
 vierTitel:'Vier Fragen stehen hinter jeder Abklärung',
 vier:[
  ['Seit der Kindheit', 'Mehrere Merkmale gab es schon vor dem 12. Lebensjahr, auch wenn es damals niemand so genannt hat.'],
  ['Dauerhaft', 'Nicht nur in einer stressigen Phase, sondern seit mindestens einem halben Jahr und eigentlich schon immer.'],
  ['In mehreren Bereichen', 'Zum Beispiel bei der Arbeit und zuhause, nicht nur an einem Ort oder bei einer Person.'],
  ['Mit Leidensdruck', 'Es beeinträchtigt dich spürbar: im Beruf, in Beziehungen, im Alltag oder in deinem Selbstwert.']],
 gruppenTitel:'Was davon kennst du?',
 gruppenHinweis:'Kreuz nur an, was dich wirklich oft betrifft. Und unter jeder Gruppe, ob es schon in der Schulzeit so war.',
 kind:'War schon in der Schulzeit so',
 gruppen:[
  {t:'Aufmerksamkeit', m:[['Ich schweife ab', 'In Gesprächen, beim Lesen, in Meetings.'], ['Ich komme schwer ins Anfangen', 'Auch bei wichtigen Dingen, oft erst kurz vor der Frist.'], ['Ich bringe Dinge nicht zu Ende', 'Viele angefangene Projekte, der letzte Schritt fehlt.'], ['Ich verliere und vergesse Dinge', 'Schlüssel, Rückrufe, Termine.'], ['Ich mache Flüchtigkeitsfehler', 'Nicht aus Unwissen, sondern weil ein Detail durchrutscht.'], ['Ich bin leicht abzulenken', 'Geräusche, Benachrichtigungen, ein eigener Gedanke.']]},
  {t:'Hyperfokus und Interesse', m:[['Bei Interesse versinke ich', 'Stundenlang, ich vergesse Zeit, Essen und Pausen.'], ['Langweiliges geht kaum', 'Egal, wie wichtig es ist.'], ['Ich brauche Druck oder Neues', 'Erst kurz vor knapp komme ich in Gang.']]},
  {t:'Innere Unruhe', m:[['Mein Kopf ist nie still', 'Besonders abends beim Einschlafen.'], ['Ich fühle mich getrieben', 'Wie von einem Motor, auch wenn ich müde bin.'], ['Stillsitzen kostet mich viel', 'In Meetings, im Wartezimmer, im Kino.'], ['Ich rede viel oder unterbreche', 'Der Gedanke muss raus, bevor er weg ist.']]},
  {t:'Impulsivität', m:[['Ich entscheide vorschnell', 'Käufe, Zusagen, Projekte, und bereue es danach.'], ['Warten fällt mir schwer', 'In Schlangen, auf Antworten, auf Ergebnisse.'], ['Ich sage Dinge, bevor ich nachdenke', 'Und merke erst danach, wie es angekommen ist.']]},
  {t:'Gefühle', m:[['Meine Stimmung kippt schnell', 'Mehrmals am Tag, oft wegen Kleinigkeiten.'], ['Kritik und Zurückweisung treffen mich stark', 'Eine ausbleibende Nachricht beschäftigt mich stundenlang.'], ['Ich bin schnell überfordert', 'Wenn zu viel gleichzeitig kommt, geht nichts mehr.']]},
  {t:'Zeit und Alltag', m:[['Mein Zeitgefühl ist unzuverlässig', 'Ich unterschätze, wie lange etwas dauert.'], ['Briefe, Rechnungen, Fristen bleiben liegen', 'Obwohl ich weiß, dass es wichtig ist.'], ['Systeme halten bei mir nicht lange', 'Kalender, Apps, Listen: nach ein paar Wochen vergessen.'], ['Ich bin oft erschöpft vom Ausgleichen', 'Ich funktioniere nach außen, aber es kostet mich mehr als andere.']]}],
 bereicheTitel:'Wie sehr belastet es dich?',
 bereicheHinweis:'Ein Beispiel aus letzter Zeit hilft der Fachperson mehr als jede allgemeine Beschreibung.',
 bereiche:[['arbeit', 'Arbeit'], ['geld', 'Geld und Papierkram'], ['beziehung', 'Beziehungen'], ['alltag', 'Alltag und Haushalt'], ['schlaf', 'Schlaf und Erholung'], ['selbst', 'Selbstwert und Stimmung']],
 beispiel:'Ein Beispiel',
 saetzeTitel:'Sätze, mit denen du anfangen kannst',
 saetze:['Seit ich denken kann, fällt mir schwer, …', 'Am meisten kostet mich gerade …', 'Von außen sieht man das nicht, weil ich …', 'Ausprobiert habe ich schon …', 'Von heute wünsche ich mir …'],
 fragenTitel:'Fragen, die du stellen kannst',
 fragen:['Wie geht es nach heute weiter, und wie viele Termine braucht die Abklärung?', 'Welche Fragebögen kommen noch, und soll jemand dazukommen, der mich als Kind kannte?', 'Was könnte es außer ADHS noch sein, und wie wird das ausgeschlossen?', 'Welche Unterstützung gibt es, mit und ohne Diagnose?', 'Was kann ich bis zum nächsten Termin selbst tun?'],
 mitTitel:'Was du mitbringen kannst',
 mit:['Alte Schulzeugnisse, vor allem die Bemerkungen der Lehrkräfte', 'Frühere Befunde, Arztberichte, Medikamentenliste', 'Wenn möglich: jemand, der dich als Kind kannte', 'Diese Seite, ausgefüllt'],
 schluss:'Egal, was dabei herauskommt: Dass dich das Kraft kostet, ist echt.'};

var BK_TERMIN2 = {
 titel:'Wenn beides zusammenkommt',
 lede:'ADHS und Autismus gleichzeitig, bei Frauen oft erst spät erkannt, weil sich vieles nach innen zeigt und gut überspielt wird. Kreuz vor deinem Termin in Ruhe an, was du kennst, und nimm die Seite mit ins Gespräch.',
 vorabTitel:'Wichtig vorab',
 vorab:'Das hier ist kein Test und keine Diagnose. AuDHS ist auch keine eigene Diagnose, sondern ein Wort für zwei Diagnosen nebeneinander: ADHS und Autismus. Seit 2013 dürfen beide gleichzeitig gestellt werden. Was davon zutrifft, klärt die Fachperson. Was du hier ankreuzt, wird nirgends gespeichert.',
 vierTitel:'Vier Fragen stehen hinter jeder Abklärung',
 vier:[
  ['Seit der Kindheit', 'Vieles gab es schon in der Kindheit. Bei Autismus zählt ausdrücklich auch, was du damals schon überspielt hast.'],
  ['Dauerhaft', 'Nicht nur in einer stressigen Phase, sondern eigentlich schon immer.'],
  ['In mehreren Bereichen', 'Zum Beispiel bei der Arbeit und zuhause, nicht nur an einem Ort.'],
  ['Mit Leidensdruck', 'Auch wenn du nach außen funktionierst: Was es dich kostet, zählt.']],
 gruppenTitel:'Was davon kennst du?',
 gruppenHinweis:'Kreuz nur an, was dich wirklich oft betrifft. Und unter jeder Gruppe, ob es schon in der Schulzeit so war.',
 kind:'War schon in der Schulzeit so',
 gruppen:[
  {t:'Aufmerksamkeit und Antrieb', m:[['Ich schweife ab', 'In Gesprächen, beim Lesen, in Meetings.'], ['Ich komme schwer ins Anfangen', 'Oft erst kurz vor der Frist.'], ['Ich vergesse und verliere Dinge', 'Termine, Rückrufe, Schlüssel.'], ['Mein Zeitgefühl ist unzuverlässig', 'Ich unterschätze, wie lange etwas dauert.'], ['Mein Kopf ist nie still', 'Gedanken laufen parallel, besonders abends.'], ['Ich handle schnell aus dem Impuls', 'Zusagen, Käufe, Projekte.']]},
  {t:'Menschen und Gespräche', m:[['Soziale Regeln habe ich gelernt, nicht gespürt', 'Ich beobachte, wie andere es machen.'], ['Small Talk kostet mich viel', 'Tiefe Gespräche fallen mir leichter.'], ['Zwischentöne verunsichern mich', 'Ich frage mich hinterher, wie etwas gemeint war.'], ['Ich werde als zu direkt erlebt', 'Obwohl ich nur ehrlich sein wollte.'], ['Nach Treffen brauche ich lange Erholung', 'Auch nach schönen Abenden.']]},
  {t:'Routinen und Interessen', m:[['Planänderungen werfen mich um', 'Auch kleine, kurzfristige.'], ['Feste Abläufe geben mir Halt', 'Gleiche Wege, gleiche Reihenfolge.'], ['Ich habe tiefe, langjährige Interessen', 'Themen, über die ich sehr viel weiß.']]},
  {t:'Reize', m:[['Geräusche, Licht oder Gerüche sind schnell zu viel', 'Großraumbüro, Supermarkt, mehrere Gespräche.'], ['Kleidung oder Berührung stören mich stark', 'Etiketten, Nähte, unerwartete Berührung.'], ['Bei Überreizung geht plötzlich nichts mehr', 'Ich ziehe mich zurück oder werde reizbar.']]},
  {t:'Der innere Widerspruch', m:[['Ich brauche Routine und langweile mich darin', 'Ohne Struktur geht es nicht, mit Struktur werde ich unruhig.'], ['Ich suche Reize und halte sie nicht aus', 'Erst will ich raus, dann ist es sofort zu viel.'], ['Ich will spontan sein und hasse Planänderungen', 'Von mir aus ja, von anderen nein.']]},
  {t:'Maskieren und Erschöpfung', m:[['Ich bereite Gespräche vor', 'Ich lege mir Sätze zurecht und probe Telefonate.'], ['Ich passe mich an, bis ich nicht mehr weiß, wer ich bin', 'Je nach Gegenüber eine andere Version von mir.'], ['Nach außen funktioniere ich, zuhause breche ich ein', 'Andere sehen nur den ersten Teil.'], ['Ich hatte Phasen völliger Erschöpfung', 'Ohne dass es von außen erklärbar war.'], ['Ich habe früher andere Erklärungen bekommen', 'Zum Beispiel Angst, Depression oder „zu sensibel".'], ['Vor der Periode wird alles stärker', 'Konzentration, Reizempfindlichkeit, Stimmung.']]},
  {t:'Gefühle', m:[['Zurückweisung trifft mich sehr stark', 'Eine ausbleibende Antwort beschäftigt mich lange.'], ['Gefühle spüre ich stark, kann sie aber schwer benennen', 'Ich merke, dass etwas los ist, aber nicht genau was.'], ['Ungerechtigkeit lässt mich nicht los', 'Auch wenn es mich nicht selbst betrifft.']]}],
 bereicheTitel:'Wie sehr belastet es dich?',
 bereicheHinweis:'Ein Beispiel aus letzter Zeit hilft der Fachperson mehr als jede allgemeine Beschreibung.',
 bereiche:[['arbeit', 'Arbeit'], ['beziehung', 'Freundschaften und Beziehungen'], ['alltag', 'Alltag und Haushalt'], ['reize', 'Reize und Erholung'], ['koerper', 'Schlaf, Körper und Zyklus'], ['selbst', 'Selbstwert und Identität']],
 beispiel:'Ein Beispiel',
 saetzeTitel:'Sätze, mit denen du anfangen kannst',
 saetze:['Seit ich denken kann, fällt mir schwer, …', 'Von außen wirke ich …, innen ist es …', 'Nach sozialen Situationen brauche ich …', 'Ich bereite Gespräche vor, indem ich …', 'Von heute wünsche ich mir …'],
 fragenTitel:'Fragen, die du stellen kannst',
 fragen:['Werden beide Seiten abgeklärt, ADHS und Autismus, oder nur eine? Wo kann ich die andere abklären lassen?', 'Wie berücksichtigen Sie, dass Frauen oft maskieren, wenn die Tests unauffällig sind?', 'Wie geht es nach heute weiter, und wie viele Termine braucht die Abklärung?', 'Was könnte es sonst noch sein, und wie wird das unterschieden?', 'Welche Unterstützung gibt es, mit und ohne Diagnose?'],
 mitTitel:'Was du mitbringen kannst',
 mit:['Alte Schulzeugnisse, vor allem die Bemerkungen der Lehrkräfte', 'Frühere Befunde und Diagnosen, auch mit anderen Etiketten', 'Notizen über ein bis zwei Zyklen: wann es schwerer wird', 'Zwei, drei Beispiele, wo du maskierst und was es dich kostet', 'Diese Seite, ausgefüllt'],
 schluss:'Egal, was dabei herauskommt: Dass dich das Kraft kostet, ist echt.'};

/* Bausteine der Datei, die mehr sind als Text: Kästchen und Skalen.
   Sie funktionieren ohne Skript. {…} wird mit geschütztem Text gefüllt. */
var BK_FORM = {
 kreuz:'<label class="kreuz"><input type="checkbox"><span><b>{a}</b> {b}</span></label>',
 kind:'<label class="kreuz kind"><input type="checkbox"><span>{a}</span></label>',
 stufe:'<label class="stufe"><input type="radio" name="{name}"><span>{a}</span></label>',
 feld:'<textarea rows="2" aria-label="{a}" placeholder="{a}"></textarea>'};
var BK_DATEI_STIL_FORM = ".gruppe{background:#FFFDFA;border:1px solid #EBE1D2;border-radius:14px;overflow:hidden}.gruppe h3{font-family:'Fraunces',Georgia,serif;font-weight:500;font-size:19px;color:#2E3A5C;margin:0;padding:14px 16px 8px}.kreuz{display:flex;gap:12px;align-items:flex-start;padding:10px 16px;border-top:1px solid #EBE1D2;cursor:pointer}.kreuz input{width:20px;height:20px;margin:2px 0 0;accent-color:#2E3A5C;flex:none}.kreuz span{font-size:15px}.kreuz b{display:block}.kind{background:#FCF7EF;color:#6B6259;border-top-style:dashed}.skala{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:4px;margin:8px 0}.stufe{display:grid;place-items:center;text-align:center;font-size:12px;padding:9px 2px;border:1px solid #EBE1D2;border-radius:10px;background:#FCF7EF;cursor:pointer}.stufe input{position:absolute;opacity:0}.stufe:has(input:checked){background:#2E3A5C;color:#FCF7EF;border-color:#2E3A5C}textarea{font:inherit;font-size:15px;width:100%;box-sizing:border-box;border:1px solid #EBE1D2;border-radius:10px;padding:8px 10px;background:#FCF7EF}.vierer{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:10px}.vierer div{background:#FFFDFA;border:1px solid #EBE1D2;border-top:3px solid #9A7235;border-radius:12px;padding:12px 14px}.vierer b{display:block;font-family:'Fraunces',Georgia,serif;font-weight:400;font-size:18px;color:#2E3A5C}.anfang{font-family:'Fraunces',Georgia,serif;font-style:italic;font-weight:300;color:#2E3A5C;font-size:18px;background:#FFFDFA;border:1px solid #EBE1D2;border-left:3px solid #9A7235;border-radius:10px;padding:10px 14px}";
