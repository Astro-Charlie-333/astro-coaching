/* Setzt die Sätze ein, die in app-daten.json stehen. Hier steht keiner. */
(function () {
  var t = (window.AC_OHNE_NETZ || {});
  function setz(id, wert) {
    var e = document.getElementById(id);
    if (e) e.textContent = wert || '';
  }
  setz('onh', t.ueberschrift);
  setz('onlage', t.lage);
  setz('onwas', t.was_geht);
  setz('onhand', t.handgriff);
  setz('ongrenze', t.grenze);
})();
