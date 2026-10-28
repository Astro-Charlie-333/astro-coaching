#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Baut die App-Ansicht: Manifest, Symbole, Zwischenspeicher, Ohne-Netz-Seite.

Stufe 2 aus PRODUKT.md Abschnitt 7: Die Seite soll sich auf dem Telefon
installieren lassen und die zuletzt besuchten Seiten auch ohne Netz zeigen.
Kein Framework, kein Bauwerkzeug — die Symbole entstehen hier mit zlib,
damit der Bau auf jedem Rechner mit Python läuft.

Was hier entsteht, liegt oben:
    manifest.webmanifest   das Manifest
    symbol-*.png           die Symbole in den Markenfarben
    sw.js                  der Zwischenspeicher (Wort für Wort wie app/sw.js)
    app-start.js           die Anmeldung (Wort für Wort wie app/app-start.js)
    offline.html           die Seite, die erscheint, wenn gar nichts da ist

Die Zeile, mit der jede gebaute Seite das Manifest einbindet, steht in
app/app-kopf.html — an einer Stelle für alle Seiten. Dass keine Seite sie
vergisst, prüft pruefe-alles.py am Ergebnis, nicht an den Bauskripten.
"""
import pathlib, json, re, sys, struct, zlib, subprocess, socket, time, http.server, threading, functools

hier = pathlib.Path(__file__).parent
wiki = hier.parent / 'wiki'
rit  = hier.parent / 'rituale'

fehler, hinweise = [], []


def lies(p):
    return p.read_text(encoding='utf-8')


d       = json.loads(lies(hier / 'app-daten.json'))
kopf_ab = lies(hier / 'app-kopf.html')
ohne    = d.get('ohne_netz', {})

# ── Symbole ───────────────────────────────────────────────────
# Zwei Kreise, wie das Zeichen in der Leiste: aussen Messing, innen Nacht,
# auf Creme. Die Kanten werden rechnerisch geglättet, nicht überabgetastet —
# bei einem Kreis geht das genauer und schneller.

def farbe(hex_):
    hex_ = hex_.lstrip('#')
    return (int(hex_[0:2], 16), int(hex_[2:4], 16), int(hex_[4:6], 16))


def png(groesse, pixel):
    roh = bytearray()
    for y in range(groesse):
        roh.append(0)
        roh += pixel[y * groesse * 3:(y + 1) * groesse * 3]

    def block(typ, daten):
        return (struct.pack('>I', len(daten)) + typ + daten
                + struct.pack('>I', zlib.crc32(typ + daten) & 0xffffffff))

    return (b'\x89PNG\r\n\x1a\n'
            + block(b'IHDR', struct.pack('>IIBBBBB', groesse, groesse, 8, 2, 0, 0, 0))
            + block(b'IDAT', zlib.compress(bytes(roh), 9))
            + block(b'IEND', b''))


def symbol(groesse, maskierbar=False):
    flaeche, ring, kern = (farbe(d['farbe_flaeche']), farbe(d['farbe_ring']),
                           farbe(d['farbe_kern']))
    mitte = (groesse - 1) / 2.0
    # Verhältnisse aus dem Zeichen der Seite (viewBox 24, r 10,5 und 4, Strich 1).
    # Maskierbar heisst: alles bleibt im inneren Achtzigstel, damit kein
    # Betriebssystem die Ringe abschneidet.
    skala = 0.78 if maskierbar else 1.0
    r_aussen = groesse * (10.5 / 24.0) * skala
    r_innen  = groesse * (4.0 / 24.0) * skala
    halb     = max(groesse * (1.0 / 24.0) * skala, 1.0) / 2.0
    aus = bytearray()
    for y in range(groesse):
        dy = y - mitte
        for x in range(groesse):
            dx = x - mitte
            weite = (dx * dx + dy * dy) ** 0.5
            r_, g_, b_ = flaeche
            for radius, f in ((r_aussen, ring), (r_innen, kern)):
                deckung = halb + 0.5 - abs(weite - radius)
                if deckung > 0:
                    a = 1.0 if deckung >= 1.0 else deckung
                    r_ += (f[0] - r_) * a
                    g_ += (f[1] - g_) * a
                    b_ += (f[2] - b_) * a
            aus += bytes((int(r_ + 0.5), int(g_ + 0.5), int(b_ + 0.5)))
    return png(groesse, bytes(aus))


SYMBOLE = [('symbol-192.png', 192, False), ('symbol-512.png', 512, False),
           ('symbol-180.png', 180, False), ('symbol-maskierbar-512.png', 512, True)]
for name, groesse, maskierbar in SYMBOLE:
    (wiki / name).write_bytes(symbol(groesse, maskierbar))

# ── Manifest ──────────────────────────────────────────────────
manifest = {
    'name': d['name'],
    'short_name': d['kurzname'],
    'description': d['beschreibung'],
    'lang': 'de',
    'dir': 'ltr',
    'start_url': d['start'],
    'scope': './',
    'display': 'standalone',
    'background_color': d['farbe_flaeche'],
    'theme_color': d['farbe_flaeche'],
    'icons': [
        {'src': 'symbol-192.png', 'sizes': '192x192', 'type': 'image/png', 'purpose': 'any'},
        {'src': 'symbol-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'any'},
        {'src': 'symbol-maskierbar-512.png', 'sizes': '512x512', 'type': 'image/png',
         'purpose': 'maskable'},
    ],
}
(wiki / 'manifest.webmanifest').write_text(
    json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

# ── Zwischenspeicher und Anmeldung: Wort für Wort nach oben ───
for name in ('sw.js', 'app-start.js'):
    (wiki / name).write_bytes((hier / name).read_bytes())

# ── Die Seite, wenn gar nichts da ist ─────────────────────────
kopf = ('<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        '<title>' + ohne.get('titel', '') + ' &middot; ' + d['name'] + '</title>\n'
        '<link rel="preconnect" href="https://fonts.googleapis.com">'
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
        '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;'
        '9..40,500&family=Fraunces:opsz,wght@9..144,300;9..144,400&display=swap" rel="stylesheet">\n'
        '<style>\n')
html = (kopf + lies(rit / 'basis.css') + '\n' + lies(hier / 'offline-stil.css')
        + '</style>\n</head><body>\n'
        + lies(hier / 'offline-koerper.html')
        + '\n<script>\nwindow.AC_OHNE_NETZ = '
        + json.dumps(ohne, ensure_ascii=False) + ';\n'
        + lies(hier / 'offline-app.js')
        + '\n</script>\n</body></html>\n')
html = html.replace('<head>', '<head>' + kopf_ab, 1)
(wiki / 'offline.html').write_text(html, encoding='utf-8')

# ── Prüfungen ─────────────────────────────────────────────────

# 1 · Jeder Satz der Ohne-Netz-Seite kommt aus den Daten, ist da und
#     vollständig. Fehlerklasse: ein halber Text, der auf der Seite als
#     Lücke erscheint.
for schluessel in ('titel', 'ueberschrift', 'lage', 'was_geht', 'handgriff', 'grenze'):
    wert = ohne.get(schluessel, '')
    if not wert:
        fehler.append(f'Text fehlt in app-daten.json: ohne_netz.{schluessel}')
    elif schluessel in ('titel', 'ueberschrift'):
        if len(wert) < 8:            # Überschriften tragen keinen Punkt
            fehler.append(f'Überschrift zu kurz: ohne_netz.{schluessel}')
    elif len(wert) < 40 or not wert.rstrip().endswith('.'):
        fehler.append(f'Text zu kurz oder ohne Punkt: ohne_netz.{schluessel}')

# 2 · In offline-app.js steht kein Satz. Fehlerklasse wie bei monat-app.js:
#     ein Satz in der Anzeige, den niemand in den Daten sucht.
for s in re.findall(r"'([^'\n]{12,})'|\"([^\"\n]{12,})\"", lies(hier / 'offline-app.js')):
    text = s[0] or s[1]
    if ' ' in text:
        fehler.append('Satz in offline-app.js statt in app-daten.json: ' + text[:40])

# 3 · Die IDs, die das Skript sucht, gibt es im Körper.
koerper = lies(hier / 'offline-koerper.html')
ids = set(re.findall(r'\bid="([A-Za-z0-9_-]+)"', koerper))
gesucht = set(re.findall(r"""setz\(['"]([A-Za-z0-9_-]+)['"]""", lies(hier / 'offline-app.js')))
if gesucht - ids:
    fehler.append('Skript sucht IDs, die es nicht gibt: ' + ', '.join(sorted(gesucht - ids)))
auf, zu = len(re.findall(r'<div\b', koerper)), len(re.findall(r'</div>', koerper))
if auf != zu:
    fehler.append(f'div-Bilanz: {auf} auf, {zu} zu')

# 4 · Auf Stufe 0 keine Fachsprache. Die Ohne-Netz-Seite hat keine
#     Stufenleiste, also gilt für sie durchgehend Stufe 0.
JARGON = ['Planet', 'Haus', 'Aspekt', 'Transit', 'Konjunktion', 'Quadrat', 'Trigon',
          'Sextil', 'Orbis', 'Aszendent', 'Radix', 'Grad', 'Zeichen', 'rückläufig',
          'Merkur', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptun', 'Pluto',
          'Mond', 'Sonne']
sichtbar = ' '.join(ohne.get(k, '') for k in ohne) + ' ' + re.sub(r'<[^>]+>', ' ', koerper)
for wort in JARGON:
    if re.search(r'(?<![A-Za-zÄÖÜäöüß])' + wort + r'(?![A-Za-zÄÖÜäöüß])', sichtbar):
        fehler.append('Fachsprache auf Stufe 0: ' + wort)

# 5 · Der gemeinsame Kopf und das Manifest sagen dieselbe Farbe.
#     Fehlerklasse: zwei Orte für eine Farbe, die auseinanderlaufen.
m = re.search(r'name="theme-color" content="([^"]+)"', kopf_ab)
if not m:
    fehler.append('app-kopf.html nennt keine theme-color')
elif m.group(1) != manifest['theme_color']:
    fehler.append(f'theme-color {m.group(1)} ≠ Manifest {manifest["theme_color"]}')
if 'rel="manifest"' not in kopf_ab or 'manifest.webmanifest' not in kopf_ab:
    fehler.append('app-kopf.html bindet das Manifest nicht ein')
if 'app-start.js' not in kopf_ab:
    fehler.append('app-kopf.html lädt die Anmeldung nicht')

# 6 · Jede Datei, auf die Kopf, Manifest oder Zwischenspeicher zeigen,
#     liegt wirklich oben. Fehlerklasse: ein Symbol, das es nicht gibt —
#     das Telefon zeigt dann stillschweigend ein leeres Viereck.
verwiesen = set(re.findall(r'(?:href|src)="([a-z0-9._-]+)"', kopf_ab))
verwiesen |= {i['src'] for i in manifest['icons']} | {manifest['start_url']}
verwiesen |= set(re.findall(r"""['"]([a-z0-9._-]+\.html)['"]""", lies(hier / 'sw.js')))
for datei in sorted(verwiesen):
    if not (wiki / datei).exists():
        fehler.append('Verweis ins Leere: ' + datei)

# 7 · Jedes Symbol ist ein echtes PNG in der Größe, die das Manifest
#     behauptet. Gelesen wird aus der Datei, nicht aus dem Dateinamen.
for eintrag in manifest['icons']:
    roh = (wiki / eintrag['src']).read_bytes()
    if roh[:8] != b'\x89PNG\r\n\x1a\n':
        fehler.append('kein PNG: ' + eintrag['src'])
        continue
    breite, hoehe = struct.unpack('>II', roh[16:24])
    if f'{breite}x{hoehe}' != eintrag['sizes']:
        fehler.append(f'{eintrag["src"]} ist {breite}x{hoehe}, '
                      f'das Manifest sagt {eintrag["sizes"]}')
if {i['purpose'] for i in manifest['icons']} < {'any', 'maskable'}:
    fehler.append('es fehlt ein maskierbares Symbol')

# 8 · Das Manifest ist lesbares JSON und trägt, was ein Telefon braucht.
try:
    gelesen = json.loads(lies(wiki / 'manifest.webmanifest'))
except ValueError as e:
    gelesen = {}
    fehler.append('Manifest ist kein lesbares JSON: ' + str(e))
for schluessel in ('name', 'short_name', 'start_url', 'display', 'icons',
                   'background_color', 'theme_color'):
    if not gelesen.get(schluessel):
        fehler.append('Manifest ohne ' + schluessel)
if gelesen.get('display') != 'standalone':
    fehler.append('ohne display standalone bleibt die Browserleiste stehen')

# 9 · Oben und Quelle sind Wort für Wort gleich.
for name in ('sw.js', 'app-start.js'):
    if (wiki / name).read_bytes() != (hier / name).read_bytes():
        fehler.append(f'{name} oben weicht von app/{name} ab')

# 10 · Der Zwischenspeicher fragt erst das Netz. Fehlerklasse: eine Regel,
#      die zuerst in den Speicher greift und alte Texte als heutige ausgibt.
sw = lies(hier / 'sw.js')
if 'fetch(anfrage)' not in sw or 'caches.match' not in sw:
    fehler.append('der Zwischenspeicher fragt nicht erst das Netz und dann den Speicher')
if sw.index('fetch(anfrage)') > sw.index('caches.match'):
    fehler.append('im Zwischenspeicher kommt der Speicher vor dem Netz')

# 11 · Regeln, die plattformweit gelten.
#      Die beiden Muster werden zusammengesetzt, damit das echte Datum
#      nicht in dieser Datei steht und die Prüfung sich selbst meldet.
GEBURT = (r'\b' + '19' + '87' + r'\b', r'\b0?' + '8' + ':' + '58' + r'\b')
for q in sorted(hier.glob('*')):
    if q.suffix not in ('.js', '.py', '.html', '.css', '.json') or q.name.startswith('_probe-'):
        continue
    t = lies(q)
    if '.to' + 'LowerCase(' in t:
        fehler.append(f'{q.name}: toLowerCase verändert deutsche Großschreibung')
    for muster in GEBURT:
        if re.search(muster, t):
            fehler.append(f'{q.name}: echtes Geburtsdatum im Quelltext')

if fehler:
    for f in fehler:
        print('  ✗ ' + f)
    sys.exit(1)

# ── Rauchprobe: wirklich ohne Netz ────────────────────────────
# Ein Zwischenspeicher, der nur im Quelltext richtig aussieht, ist nichts
# wert. Deshalb läuft die Seite hier unter einem echten Netzprotokoll, das
# Netz wird abgeschaltet, und dann muss sie noch stehen.
if '--schnell' not in sys.argv:
    with socket.socket() as s_:
        s_.bind(('127.0.0.1', 0))
        port = s_.getsockname()[1]

    # Der Schalter, mit dem die Probe das Netz wirklich abstellt.
    # Nicht über den Browser: context.setOffline() wirkt je nach
    # Playwright-Fassung nur auf die Seite und nicht auf den
    # Zwischenspeicher — mit 1.47.2 lief die nie besuchte Seite trotz
    # „offline" ganz normal vom Server. Ein Server, der die Verbindung
    # zumacht, ist für beide dasselbe, in jeder Fassung.
    am_netz = threading.Event()
    am_netz.set()

    class Still(http.server.SimpleHTTPRequestHandler):
        # Ohne eigenen Eintrag liefert Python das Manifest als Text aus.
        extensions_map = dict(http.server.SimpleHTTPRequestHandler.extensions_map,
                              **{'.webmanifest': 'application/manifest+json'})

        def do_GET(self):
            if self.path.startswith('/__netz'):
                (am_netz.clear if 'aus=1' in self.path else am_netz.set)()
                self.send_response(200)
                self.send_header('Content-Length', '2')
                self.end_headers()
                self.wfile.write(b'ok')
                return
            if not am_netz.is_set():
                # Zumachen, ohne ein Byte zu schreiben: der Browser sieht
                # einen Verbindungsabbruch, und fetch() scheitert — genau
                # das, was ohne Netz passiert.
                self.close_connection = True
                try:
                    self.connection.close()
                except OSError:
                    pass
                return
            http.server.SimpleHTTPRequestHandler.do_GET(self)

        def end_headers(self):
            # Der Browser hat einen eigenen Zwischenspeicher. Der würde die
            # Seite ohne Netz auch ausliefern — und dann wäre diese Probe
            # grün, ohne dass der Speicher hier etwas getan hat. Genau so
            # war sie beim ersten Versuch grün und blind. Mit no-store
            # bleibt dem Browser nichts, und was ohne Netz noch steht,
            # steht wirklich wegen sw.js.
            self.send_header('Cache-Control', 'no-store')
            http.server.SimpleHTTPRequestHandler.end_headers(self)

        def log_message(self, *a):
            pass

    dienst = http.server.ThreadingHTTPServer(
        ('127.0.0.1', port),
        functools.partial(Still, directory=str(wiki.resolve())))
    threading.Thread(target=dienst.serve_forever, daemon=True).start()

    probe = hier / '_probe-app.js'
    probe.write_text(r"""
const {chromium}=(function(){const orte=[process.env.AC_PLAYWRIGHT,'playwright','/opt/npm-tools/node_modules/playwright'];for(const o of orte){if(!o)continue;try{return require(o);}catch(e){}}throw new Error('Playwright nicht gefunden. AC_PLAYWRIGHT setzen oder playwright installieren.');})();
const BASIS='http://127.0.0.1:PORT';
/* Der Schalter wird aus Node bedient, nicht aus der Seite: so geht die
   Anfrage am Browser und am Zwischenspeicher vorbei. */
const netz=async an=>{await fetch(BASIS+'/__netz?aus='+(an?0:1));};
(async()=>{
const b=await chromium.launch(); const f=[];
try{
const ctx=await b.newContext({viewport:{width:390,height:900}});
const p=await ctx.newPage();
p.on('pageerror',e=>f.push('Seitenfehler: '+String(e.message).slice(0,120)));
await p.goto(BASIS+'/index.html',{waitUntil:'load'});

/* Der Zwischenspeicher meldet sich an und übernimmt die Seite. */
let uebernommen=false;
try{ await p.waitForFunction(()=>navigator.serviceWorker&&navigator.serviceWorker.controller!==null,null,{timeout:20000}); uebernommen=true; }
catch(e){ f.push('der Zwischenspeicher übernimmt die Seite nicht'); }

/* Das Manifest ist erreichbar und lesbar. */
const man=await p.evaluate(async()=>{ try{ const r=await fetch('manifest.webmanifest');
  const t=await r.text(); JSON.parse(t); return {ok:r.ok,typ:r.headers.get('content-type')||''}; }
  catch(e){ return {ok:false,typ:String(e.message)}; } });
if(!man.ok) f.push('Manifest nicht erreichbar oder nicht lesbar: '+man.typ);

/* Die Seite bindet Manifest und Anmeldung wirklich ein. */
const kopf=await p.evaluate(()=>({
  manifest:!!document.querySelector('link[rel="manifest"]'),
  farbe:(document.querySelector('meta[name="theme-color"]')||{}).content||'',
  symbol:!!document.querySelector('link[rel="apple-touch-icon"]')}));
if(!kopf.manifest) f.push('die Startseite bindet das Manifest nicht ein');
if(!kopf.symbol) f.push('die Startseite nennt kein Symbol für den Startbildschirm');

if(uebernommen){
  /* Eine zweite Seite, diesmal durch den Speicher hindurch geladen. */
  await p.goto(BASIS+'/bereiche.html',{waitUntil:'load'});
  const titelBer=await p.evaluate(()=>document.title);
  const titelOhne='OHNETITEL';
  if(titelBer===titelOhne) f.push('schon mit Netz kommt die Ohne-Netz-Seite');
  await p.waitForTimeout(1200);          /* die Kopien in Ruhe ablegen */
  await netz(false);                     /* der Server macht zu */
  await ctx.setOffline(true);            /* und der Browser weiß es auch */

  /* 1 · Die besuchte Seite steht auch ohne Netz, mit Inhalt. */
  await p.reload({waitUntil:'load'});
  const nach=await p.evaluate(()=>({titel:document.title,
    lang:document.body.innerText.trim().length,
    leiste:!!document.querySelector('.ac-leiste')}));
  if(nach.titel!==titelBer) f.push('ohne Netz kommt eine andere Seite zurück: '+nach.titel);
  if(nach.lang<400||!nach.leiste) f.push('die besuchte Seite steht ohne Netz nicht mehr ('+nach.lang+' Zeichen)');

  /* 2 · Die Startseite auch — sie wird beim Anmelden abgelegt. */
  const st=await ctx.newPage();
  await st.goto(BASIS+'/index.html',{waitUntil:'load'}).catch(e=>f.push('die Startseite bricht ohne Netz ab'));
  const stt=await st.evaluate(()=>document.title).catch(()=>'');
  if(stt===titelOhne||!/Jetzt/.test(stt)) f.push('die Startseite steht ohne Netz nicht: '+stt);

  /* 3 · Eine nie besuchte Seite bekommt die Ohne-Netz-Seite, keinen Browserfehler. */
  const q=await ctx.newPage();
  await q.goto(BASIS+'/zeiten.html',{waitUntil:'load'}).catch(e=>f.push('ohne Netz bricht die Seite ab: '+String(e.message).slice(0,80)));
  const o=await q.evaluate(()=>document.body.innerText).catch(()=>'');
  if(!/MARKE/.test(o)) f.push('eine nie besuchte Seite zeigt ohne Netz nicht den Ohne-Netz-Text');

  /* 4 · Und mit Netz ist dieselbe Seite wieder die frische, nicht die Kopie.
         Sonst gäbe die Seite Veraltetes als Heutiges aus. */
  await ctx.setOffline(false);
  await netz(true);
  await q.goto(BASIS+'/zeiten.html',{waitUntil:'load'});
  const frisch=await q.evaluate(()=>({titel:document.title,text:document.body.innerText}));
  if(/MARKE/.test(frisch.text)||frisch.titel===titelOhne)
    f.push('mit Netz kommt weiter die Ohne-Netz-Seite: '+frisch.titel);
}
}catch(e){ f.push('Rauchprobe abgebrochen: '+String(e.message).slice(0,200)); }
await b.close();
if(f.length){ console.log('FEHLER'); f.forEach(x=>console.log('  '+x)); process.exit(1); }
console.log('ok');
})();
""".replace('PORT', str(port))
     .replace('MARKE', re.escape(ohne['ueberschrift']))
     .replace('OHNETITEL', ohne['titel'] + ' \u00b7 ' + d['name']),
        encoding='utf-8')
    r = subprocess.run(['node', str(probe)], capture_output=True, text=True, cwd=str(hier))
    dienst.shutdown()
    probe.unlink(missing_ok=True)
    if r.returncode != 0:
        print('  ✗ Rauchprobe fehlgeschlagen')
        for zeile in (r.stdout + r.stderr).strip().splitlines()[:14]:
            if zeile.strip() and zeile.strip() != 'FEHLER':
                # Mit Marke, sonst reicht pruefe-alles.py die Zeile nicht
                # weiter und der Pull Request bekommt den Grund nie zu sehen.
                print('      ✗ ' + zeile.strip())
        sys.exit(1)

print('  App-Ansicht: Manifest, 4 Symbole, Zwischenspeicher, Ohne-Netz-Seite')
for h in hinweise:
    print('  Hinweis: ' + h)
