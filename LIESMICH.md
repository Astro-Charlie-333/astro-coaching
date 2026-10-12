# Astro-Charlie

Statische Seite. Kein Build, kein Server, keine Datenbank — alles rechnet im
Browser, auch die Planetenstellungen. Profile liegen im localStorage, also auf
dem Gerät und nirgends sonst.

120 Seiten, 19 Skripte. Stand 12.10.2026.

## Ansehen

`index.html` im Browser öffnen. Das reicht.

## Veröffentlichen

Der Inhalt dieses Ordners ist die Seite. `netlify.toml` liegt bereit und setzt
`publish = "."`, es ist also nichts einzustellen.

## Ändern

Die meisten Seiten sind von Hand geschrieben und direkt bearbeitbar. Fünf sind
zusammengesetzt und werden aus `quelltext/` gebaut:

| Seite | Quelle |
|---|---|
| `rituale.html`, `zauber.html` | `quelltext/rituale/bau.py`, `bau-zauber.py` |
| `reading.html` | `quelltext/niveau/bau-reading.py` |
| `beziehung.html` | `quelltext/bez/bau-bez.py` |
| `ophiuchus.html` | `quelltext/oph/bau-oph.py` |
| `geistfuehrung.html` | `quelltext/geist/bau-geist.py` |

`python3 bau-xyz.py` baut die Seite neu und legt sie oben ab. **Diese fünf nicht
oben bearbeiten** — die Änderung wäre beim nächsten Bau weg.

Die Bauskripte prüfen beim Bauen mit: tote Verweise, doppelte IDs, fehlende
Inhaltstafeln, Namenskollisionen im zusammengesetzten Skript.

## Die Rechenkerne

`quelltext/rituale/engine.js` — Planetenstellungen, Häuser, Aszendent.
`quelltext/rituale/himmel.js` — Sonnenzeiten, Planetenstunden, Mond ohne Lauf.
Beide werden in die fertigen Seiten eingebettet, nicht nachgeladen.

Gegen PyEphem geprüft: Sonne 0,4′, Mond 6′, Planeten unter 6′, Sonnenauf- und
-untergang unter 2,5 min, Lunationen im Mittel 4,6 min.

## Was hier nicht liegt

Alles mit Namen, Geburtsdaten oder Geld — Nikos Reading, die beiden privaten
Analysen, der Organizer mit den Finanzen und die Bauskripte dazu. Das liegt in
einem zweiten Paket und gehört nicht in dieses Repo. Die `.gitignore` fängt die
Dateinamen ab, falls doch mal eine hierher rutscht.
