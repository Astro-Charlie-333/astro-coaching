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
