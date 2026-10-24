/* Der Zwischenspeicher. Liegt oben als sw.js, Wort für Wort gleich mit
   app/sw.js — pruefe-alles.py bricht ab, sobald die beiden auseinanderlaufen.

   Die Regel ist bewusst "erst das Netz, dann der Speicher":
   Solange Verbindung besteht, sieht man immer die frische Seite, und eine
   Kopie wandert nebenbei auf das Gerät. Erst wenn das Netz schweigt, kommt
   die Kopie zum Einsatz. Andersherum wäre schneller, würde aber alte Texte
   zeigen, und ein Werkzeug, das Veraltetes als Heutiges ausgibt, wäre an
   dieser Stelle genau falsch.

   Hier steht kein Satz für Menschen. Fehlt eine Seite ganz, wird
   offline.html gezeigt, und dessen Text liegt in app/app-daten.json. */
var SPEICHER = 'astro-charlie-seiten';
var OHNE_NETZ = 'offline.html';

/* Die erste Seite, die jemand öffnet, läuft noch an diesem Speicher vorbei:
   Er wird ja erst dabei angemeldet. Deshalb legt er die Startseite gleich
   beim Anmelden ab — sonst wäre nach dem ersten Besuch ausgerechnet die
   Seite nicht da, von der aus man weitergeht. Dazu die Seite für den Fall,
   dass gar nichts da ist. */
var VORRAT = [OHNE_NETZ, 'index.html'];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(SPEICHER).then(function (c) {
      return Promise.all(VORRAT.map(function (n) {
        return c.add(new Request(n, { cache: 'reload' })).catch(function () {});
      }));
    }).catch(function () {}).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (namen) {
      return Promise.all(namen.map(function (n) {
        return n === SPEICHER ? null : caches.delete(n);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var anfrage = e.request;
  if (anfrage.method !== 'GET') return;
  var schema = new URL(anfrage.url).protocol;
  if (schema !== 'http:' && schema !== 'https:') return;

  e.respondWith(
    fetch(anfrage).then(function (antwort) {
      if (antwort && (antwort.status === 200 || antwort.type === 'opaque')) {
        var kopie = antwort.clone();
        caches.open(SPEICHER)
          .then(function (c) { return c.put(anfrage, kopie); })
          .catch(function () {});
      }
      return antwort;
    }).catch(function () {
      return caches.match(anfrage).then(function (treffer) {
        if (treffer) return treffer;
        if (anfrage.mode === 'navigate') {
          return caches.match(OHNE_NETZ).then(function (ersatz) {
            return ersatz || Response.error();
          });
        }
        return Response.error();
      });
    })
  );
});
