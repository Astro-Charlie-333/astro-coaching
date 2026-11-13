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
