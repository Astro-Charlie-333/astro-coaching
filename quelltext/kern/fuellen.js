/* ── Eine Lücke, ein Wert ─────────────────────────────────────
   Die eine Stelle, an der eine Vorlage gefüllt wird.

   Vorher stand diese Funktion in siebzehn Anzeigen einzeln, in
   drei Fassungen, die sich bei genau einem Fall unterschieden:
   Was passiert, wenn der Wert zu einer Lücke fehlt?

     dreizehn Anzeigen  machten daraus ''      — das Wort verschwand
     drei Anzeigen      machten daraus 'undefined' — es stand auf der Seite
     dossier-app.js     brach ab               — richtig, seit Aufgabe 60

   Die erste Art hat am 2026-11-21 wirklich zugeschlagen: Der
   Winkelname der Raum-Rechnung heißt „Sextil", nachgeschlagen wurde
   unter „sextil", und aus „Saturn Sextil Sonne" wurde lautlos
   „Saturn  Sonne". Eine Tafel, die den Schlüssel nicht kennt,
   liefert `undefined`; wer das zu '' macht, verliert ein Wort, ohne
   dass etwas rot wird.

   Das ist dieselbe Klasse wie REGELN.md 6f, und sie war in sechzehn
   Anzeigen nur noch nicht aufgefallen. Deshalb steht die Funktion
   jetzt hier und nicht dort: Eine Regel in siebzehn Dateien ist
   nach der ersten Verschärfung in sechzehn davon veraltet
   (REGELN.md 5).

   Verriegelt wird das von `pruefwerk.pruefe_fueller`: Eine Anzeige,
   die wieder selbst eine Lücke aus einem Schlüssel zusammensetzt,
   bringt ihren Bau zum Scheitern.

   Hier steht kein Satz und keine Rechnung — nur die Einsetzung.
   Deshalb zieht diese Datei beim Umzug in eine andere Umgebung
   unverändert mit (PRODUKT.md Abschnitt 7).

   Zwei Fälle, die auseinandergehalten werden müssen:

     fehlt      `undefined` oder `null` — ein Wert, den es nicht
                gibt. Das ist ein Fehler und bricht ab.
     leer       '' — eine Lücke, die absichtlich nichts einsetzt
                (ein Name, den niemand angegeben hat). Das geht
                durch, und 0 ebenso: `String(0)` ist „0".

   Eine Vorlage, die es nicht gibt, wird zu '' und bricht nicht ab.
   Das ist eine andere Fehlerklasse — ein fehlender Textschlüssel —,
   und die fangen in jedem Bau die Textprobe („die Texte sind
   vollständig") und `pruefwerk.pruefe_vorlagenluecken` ab, bevor die
   Seite überhaupt entsteht. */
function AC_FUELL(form, werte){
  var s = String(form === undefined || form === null ? '' : form), k;
  for(k in werte) if(Object.prototype.hasOwnProperty.call(werte, k)){
    if(werte[k] === undefined || werte[k] === null)
      throw new Error('AC_FUELL: Lücke ohne Wert: {' + k + '}');
    s = s.split('{' + k + '}').join(String(werte[k]));
  }
  return s;
}

/* ── Eine Zahl, ein Komma ─────────────────────────────────────
   Die eine Stelle, an der aus einer Zahl deutscher Text wird.

   `REGELN.md` Abschnitt 4 sagt es seit Monaten: Zahlen mit Komma,
   nicht mit Punkt. Auf `ophiuchus.html` stand am 2026-11-26 trotzdem
   „44.6 Tage", „6.7", „17.1 Grad" und „-4.9° Breite" — jede Zahl der
   Seite, zwanzig Stellen. Dieselbe Fehlerklasse wie auf der
   Begleitungsseite am 2026-11-24, nur zwei Tage später und
   vollständig: Dort gingen vier `toFixed(1)` ohne Umweg in den Text,
   hier alle.

   Die Lehre ist dieselbe wie bei `AC_FUELL` (Aufgabe 94): Vor dieser
   Zeile gab es die Umwandlung dreimal, unter drei Namen —
   `kommaZahl` in `begleit-app.js`, `komma` in `ereignis-rechner.js`,
   `komma` in `tief-bauer.js`. Drei Fassungen heißt: Wer eine davon
   verschärft, hat zwei veraltete. Und eine vierte Seite, die keine
   davon kennt, liefert einfach Punkte aus — genau das ist hier
   passiert.

   Deshalb steht sie hier, neben `AC_FUELL`: Beide machen aus einem
   Wert Text, beide brechen ab, wenn der Wert fehlt, und beide ziehen
   beim Umzug in eine andere Umgebung unverändert mit
   (`PRODUKT.md` Abschnitt 7).

   `stellen` ist die Zahl der Nachkommastellen. Ohne Angabe bleibt
   die Zahl, wie sie ist — nur der Punkt wird zum Komma.

   Was hier **nicht** durchgeht, und zwar mit Absicht:

     fehlt      `undefined`, `null` oder `NaN`. Eine Gradzahl, die
                die Rechnung nicht geliefert hat, soll abbrechen und
                nicht als „undefined° Breite" auf der Seite stehen —
                dieselbe Entscheidung wie bei AC_FUELL.
     unendlich  Eine Division durch Null bricht ab, statt „∞" zu
                drucken.

   Eine Zahl, die in ein Stilattribut geht (eine Balkenbreite in
   Prozent), gehört **nicht** hierher: CSS verlangt den Punkt. Diese
   Funktion ist für Text, und `pruefwerk.dezimalpunkte` prüft
   deshalb den sichtbaren Text der Seite und nicht den Quelltext. */
function AC_KOMMA(wert, stellen){
  var z = Number(wert);
  if(wert === undefined || wert === null || wert === '' || z !== z || !isFinite(z))
    throw new Error('AC_KOMMA: keine Zahl: ' + wert);
  var s = (stellen === undefined || stellen === null) ? String(z)
        : z.toFixed(stellen);
  return s.split('.').join(',');
}
