/* Meldet den Zwischenspeicher an. Liegt oben als app-start.js und wird von
   jeder gebauten Seite geladen — die Zeile dafür steht in app/app-kopf.html,
   an einer Stelle für alle Seiten.

   Kein Text, keine Rechnung: nur die Anmeldung. Ohne Netzprotokoll (also
   beim Öffnen einer Datei vom Gerät) tut der Browser das nicht, und das ist
   kein Fehler — dann wird gar nichts angemeldet. */
(function () {
  if (!('serviceWorker' in navigator)) return;
  var ort = location.hostname;
  if (location.protocol !== 'https:' && ort !== 'localhost' && ort !== '127.0.0.1') return;
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  });
})();
