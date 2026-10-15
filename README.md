# Astro-Charlie

Die fertigen Seiten liegen hier oben; GitHub Pages liefert sie von hier aus.
**Sie werden nicht von Hand bearbeitet** — sie entstehen aus `quelltext/`.

## Wo was steht

| Datei | wofür |
|---|---|
| `quelltext/REGELN.md` | wie die Plattform klingt und gebaut wird — bindend |
| `quelltext/AUFGABEN.md` | was als Nächstes dran ist, von oben abzuarbeiten |
| `quelltext/pruefe-alles.py` | baut alles neu und prüft alles, ein Kommando |
| `quelltext/<ordner>/bau-*.py` | baut je eine Seite und prüft sie |

## Etwas ändern

```
cd quelltext
python3 pruefe-alles.py
```

Läuft das durch, stehen die neuen Seiten oben und können committet werden.
Schlägt es fehl, wird nicht ausgeliefert — die Prüfung wird nie umgangen.
