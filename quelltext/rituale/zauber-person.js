/* ── Wie ein Ritual bei DIR klingen muss ───────────────
   Je Planet zwölf Zeichenvarianten: ein Satz dazu, welche Form
   bei dieser Stellung trägt — und einer dazu, was nicht funktioniert. */

var GESCHMACK={
 Venus:[
  ['Direkt und schnell. Ein Liebesritual, das lange dauert, verlierst du unterwegs — nimm die Kurzform und mach sie dafür wirklich.','Alles, was nach Warten aussieht.'],
  ['Über den Körper und über Genuss. Das Bad, der Duft, das gute Essen — bei dir ist das kein Beiwerk, sondern der Hauptteil.','Rein gedankliche Formen ohne etwas zum Anfassen.'],
  ['Über Worte. Schreib es auf, sprich es aus, schick es los. Ein unausgesprochenes Ritual bleibt bei dir unfertig.','Schweigendes Daliegen.'],
  ['Zu Hause und mit etwas, das schon jemandem gehört hat. Eine alte Schale, ein geerbtes Tuch.','Alles, was in fremder Umgebung stattfindet.'],
  ['Mit Glanz und ohne Scham. Kerzen, Gold, ein schönes Kleid — bei dir darf ein Ritual aussehen wie ein Auftritt.','Kleinmachen, Verstecken, Abkürzen.'],
  ['Präzise und mit sauberer Vorbereitung. Zutaten abwägen, Platz aufräumen — die Ordnung ist bei dir Teil der Wirkung.','Chaotisches Improvisieren mit dem, was gerade da ist.'],
  ['Zu zweit oder zumindest mit einem Gegenüber im Blick. Schönheit und Gleichgewicht zählen — der Tisch darf gedeckt sein.','Hart, schmucklos, einsam.'],
  ['Tief, ernst und unter Ausschluss. Ein Ritual, das jemand sehen könnte, wirkt bei dir nicht.','Leichte, nette, unüberlegte Formen.'],
  ['Mit Weite. Draußen, unterwegs, oder mit etwas aus einem anderen Land. Dein Venusritual braucht Horizont.','Enge Räume und immer dasselbe Zimmer.'],
  ['Als Verpflichtung, nicht als Stimmung. Ein Datum, eine Regel, ein Gegenstand, der bleibt — dann trägt es.','Spontanes Herumprobieren.'],
  ['Eigenwillig. Bau es dir um, bis es nicht mehr aussieht wie eine Anleitung. Bei dir wirkt nur, was du selbst erfunden hast.','Wörtliches Nachmachen.'],
  ['Über Wasser, Musik und Dämmerung. Grenzen weich, Zeit egal — und bitte ohne Ziel formuliert.','Harte Zahlen und Fristen.']],

 Mond:[
  ['Kurz und sofort. Wenn du dich um dich kümmerst, dann heute, nicht als Programm.','Wochenpläne für Selbstfürsorge.'],
  ['Über Essen, Wärme und etwas Weiches. Dein Nervensystem glaubt dem Körper, nicht dem Vorsatz.','Fasten, Verzichten, Drüber-Nachdenken.'],
  ['Über Reden oder Schreiben. Was unsortiert bleibt, hält dich wach — drei Sätze auf Papier wirken bei dir wie eine Stunde Ruhe.','Still aushalten.'],
  ['Zu Hause, im eigenen Bett, mit den eigenen Sachen. Dein Mond braucht Boden, bevor er irgendetwas anderes kann.','Unterwegs, bei anderen, in fremden Betten.'],
  ['Mit etwas Schönem für dich allein. Nicht nützlich, nicht sinnvoll — schön.','Rein funktionale Erholung.'],
  ['Mit einer kleinen fertigen Aufgabe. Eine Schublade, ein Glas, eine Liste abgehakt — danach kannst du ruhen.','Ruhe anordnen, bevor etwas erledigt ist.'],
  ['Mit jemandem im Raum. Auch schweigend. Allein fühlt sich Erholung bei dir nach Übriggebliebensein an.','Erzwungener Rückzug.'],
  ['Allein und ungestört, mit abgeschlossener Tür. Bei dir braucht Erholung Sicherheit, nicht Gesellschaft.','Halböffentliche Entspannung.'],
  ['Mit Bewegung und Luft. Spazieren, draußen sein — dein Mond beruhigt sich im Gehen, nicht im Liegen.','Auf dem Sofa festgehalten werden.'],
  ['Mit Struktur. Gleiche Zeit, gleicher Ablauf. Dein Mond vertraut dem, was sich wiederholt.','Jedes Mal etwas anderes.'],
  ['Mit Abstand. Erst eine halbe Stunde, in der niemand etwas von dir will — dann geht alles andere.','Sofortige Nähe nach einem vollen Tag.'],
  ['Mit Wasser und ohne Plan. Bad, Dusche, See. Deine Erholung lässt sich nicht terminieren, nur zulassen.','Durchgetaktete Selbstfürsorge.']],

 Sonne:[
  ['Anfangen ist dein Teil. Ein Erfolgsritual, das mit Vorbereitung beginnt, stirbt bei dir in der Vorbereitung.','Lange Planung.'],
  ['Stetig und greifbar. Ein Gegenstand, der liegen bleibt, wirkt bei dir besser als ein starker Moment.','Einmalige große Gesten.'],
  ['Laut gesagt. Dein Vorhaben wird wahr, wenn es jemand gehört hat.','Heimliche Ziele.'],
  ['Von zu Hause aus. Dein Erfolg beginnt bei dir in der Wohnung, nicht in einem fremden Büro.','Unter fremder Regie.'],
  ['Sichtbar. Dein Ritual darf groß sein, und du darfst dabei gesehen werden — das ist kein Eitelkeitsproblem, sondern die Funktionsweise.','Bescheidenheit als Methode.'],
  ['Als sauber abgearbeiteter Schritt. Eine Sache fertig, dann die nächste.','Alles gleichzeitig.'],
  ['Mit einem Gegenüber. Dein Antrieb kommt über Resonanz — such dir jemanden, dem du es erzählst.','Völlig allein durchziehen.'],
  ['Unter Ausschluss und mit vollem Einsatz. Halbe Sachen spürst du als Verrat.','Unverbindliches Ausprobieren.'],
  ['Mit einem großen Rahmen. Wozu das Ganze — ohne diese Antwort fängst du gar nicht erst an.','Kleinteilige Zwischenziele ohne Horizont.'],
  ['Mit einem Datum und einer Konsequenz. Deine Sonne arbeitet für das, was verbindlich ist.','Wenn es sich ergibt.'],
  ['Auf deine eigene Art, auch wenn sie niemand versteht. Der Standardweg kostet dich mehr Kraft als der Umweg.','Vorgegebene Abläufe.'],
  ['Über ein Bild statt über einen Plan. Deine Sonne zielt auf etwas, das du spüren kannst.','Tabellen und Zahlen.']],

 Jupiter:[
  ['Glück kommt bei dir über Tempo. Wer zuerst zugreift, bekommt es — also greif zu.','Abwarten, ob es noch besser wird.'],
  ['Über Beharren. Dein Glück ist das, was liegen bleibt und wächst, nicht das, was blitzt.','Schnelle Gelegenheiten.'],
  ['Über Kontakte und Gespräche. Deine beste Glücksquelle ist jemand, der etwas erzählt.','Allein recherchieren.'],
  ['Über Familie, Herkunft und Zuhause. Erstaunlich oft kommt es von dort, wo du angefangen hast.','Weit weg suchen.'],
  ['Über Sichtbarkeit. Je mehr Menschen wissen, was du machst, desto mehr Glück — bei dir ist das fast wörtlich.','Im Stillen arbeiten.'],
  ['Über Zuverlässigkeit. Dein Glück kommt als Folgeauftrag, nicht als Treffer.','Auf den großen Wurf warten.'],
  ['Über andere Menschen. Partnerschaften, Kooperationen — allein bleibt dein Jupiter ruhig.','Alleingänge.'],
  ['Über das, was andere liegen lassen. Dein Glück liegt in Resten, Erbschaften, Übernahmen.','Der offensichtliche Weg.'],
  ['Über Weite — Reisen, Fremdsprachen, Lehre. Dein Jupiter ist hier zu Hause und braucht Raum.','Enge und Routine.'],
  ['Über Arbeit. Dein Glück ist verdient, nicht geschenkt — das ist unbequem und auch verlässlich.','Glücksspiel.'],
  ['Über Gruppen und über das Ungewöhnliche. Deine Chancen kommen seitlich herein, nicht durch die Vordertür.','Der klassische Weg.'],
  ['Über Großzügigkeit. Bei dir kommt zurück, was du gegeben hast — das ist in dieser Stellung die überlieferte Regel.','Festhalten.']],

 Mars:[
  ['Sofort. Du bist am stärksten in der ersten Minute — nutz sie.','Anlauf nehmen.'],
  ['Langsam und bis zum Ende. Deine Kraft ist Ausdauer, nicht Explosion.','Sprints.'],
  ['Über Worte. Dein Mars gewinnt Gespräche, nicht Kämpfe.','Körperlicher Kraftakt.'],
  ['Über Schutz. Du setzt dich durch, wenn es um jemanden geht, nicht um dich — das darfst du nutzen.','Kalte Eigeninteressen.'],
  ['Mit Stolz und offen. Verdeckt kämpfen kostet dich mehr als die Sache wert ist.','Taktieren.'],
  ['Über Genauigkeit. Du gewinnst mit dem besseren Detail.','Lautstärke.'],
  ['Über Fairness. Dein Mars braucht einen Grund, der standhält.','Reine Durchsetzung.'],
  ['Mit langem Atem und ohne Ankündigung. Dein Mars wirkt, bevor jemand merkt, dass er arbeitet.','Drohen.'],
  ['Mit Überzeugung. Du setzt dich durch, wenn du recht hast — und nur dann.','Zweckmäßige Positionen.'],
  ['Über Struktur und Geduld. Dein Mars ist hier stark: Er baut, statt zu kämpfen.','Ungeduld.'],
  ['Über den unerwarteten Zug. Frontal verlierst du, seitlich gewinnst du.','Der direkte Weg.'],
  ['Über Entzug. Dein stärkster Zug ist, nicht mehr da zu sein.','Konfrontation.']],

 Saturn:[
  ['Deine Grenze muss laut gesetzt werden, einmal und deutlich — dann hält sie.','Leise Andeutungen.'],
  ['Deine Grenze ist ein Gegenstand oder ein Ort. Etwas, das dir gehört und das niemand anfasst.','Reine Absprachen.'],
  ['Deine Grenze gehört aufgeschrieben. Gesagt vergisst du sie selbst.','Mündliches.'],
  ['Deine Grenze ist die Tür. Dein Zuhause ist der Ort, an dem du sie wirklich durchsetzt.','Grenzen draußen ziehen.'],
  ['Deine Grenze darf gesehen werden. Heimliche Abgrenzung erkennt niemand und du selbst auch nicht.','Stiller Rückzug.'],
  ['Deine Grenze ist eine Regel mit Uhrzeit. Konkret, prüfbar, wiederholbar.','Gefühlte Grenzen.'],
  ['Deine Grenze braucht ein Gegenüber, das sie bestätigt. Sag sie jemandem, der nicht betroffen ist.','Mit dir selbst ausmachen.'],
  ['Deine Grenze ist endgültig oder gar nicht. Zwischenstufen kosten dich nur Kraft.','Auf Probe.'],
  ['Deine Grenze braucht eine Begründung, die du selbst glaubst. Sonst weichst du auf.','Weil ich es sage.'],
  ['Deine Grenze ist dein stärkstes Werkzeug — Saturn ist hier zu Hause. Setz sie früher, als du denkst.','Warten, bis es nicht mehr geht.'],
  ['Deine Grenze darf unkonventionell sein. Sie muss nicht aussehen wie die der anderen.','Übliche Lösungen.'],
  ['Deine Grenze braucht Abstand, nicht Streit. Du grenzt dich ab, indem du weggehst.','Aussprachen.']]
};

/* Was ein Planet im durchlaufenen Haus gerade anfasst */
var HAUSFELD=['dein Auftreten und wie du wirkst','dein Geld, deinen Besitz und deinen Selbstwert',
 'dein Reden, Lernen und deine nähere Umgebung','dein Zuhause und deine Herkunft',
 'deinen Ausdruck, dein Spiel und dein Verliebtsein','deinen Alltag, deine Arbeit und deinen Körper',
 'dein Gegenüber und deine Verbindlichkeiten','Geteiltes, Tiefe und Loslassen',
 'Sinn, Ferne und Überzeugung','deinen Beruf und deine Sichtbarkeit',
 'Freundschaft, Gruppen und Zukunft','Rückzug, Unbewusstes und Ruhe'];

/* Herrscher der Zeichen — klassisch, für den Aszendentenherrscher */
var HERRSCHER=['Mars','Venus','Merkur','Mond','Sonne','Merkur',
               'Venus','Mars','Jupiter','Saturn','Saturn','Jupiter'];
