# Netlify einrichten — Schritt für Schritt

Diese Anleitung setzt **kein Vorwissen** voraus. Sie führt dich einmal komplett durch: von der GitHub-Seite, die du heute hast, zu einer Seite mit KI-Funktion.

**Zeitaufwand:** etwa 45 Minuten beim ersten Mal.
**Kosten:** Netlify kostet nichts. Für die KI-Funktion brauchst du Guthaben bei Anthropic — 5 € reichen für den Anfang locker.

---

## Was sich ändert und warum

Deine Seite liegt gerade auf **GitHub Pages**. Das kann nur fertige Dateien ausliefern — HTML, CSS, Bilder. Es kann keinen Code auf einem Server ausführen.

Für die KI-Funktion brauchst du aber genau das. Der Grund ist Sicherheit: Der API-Schlüssel darf niemals im Browser landen, sonst kann ihn jeder auslesen und auf deine Rechnung nutzen. Er muss auf einem Server bleiben, der die Anfrage stellvertretend stellt.

**Netlify kann beides** — Seiten ausliefern *und* kleine Serverfunktionen ausführen. Deshalb ziehst du komplett dorthin um.

Dein GitHub-Repository bleibt genau wie es ist. Netlify liest nur daraus.

---

## Schritt 1 · Die neuen Dateien ins Repository

Im ZIP sind drei neue Dinge:

```
briefing.html                    ← die neue Seite
netlify.toml                     ← sagt Netlify, wo was liegt
netlify/functions/briefing.mjs   ← die Serverfunktion
```

**Wichtig:** Der Ordner `netlify` mit dem Unterordner `functions` muss genau so heißen und im Hauptverzeichnis liegen — also neben `index.html`, nicht darin.

So lädst du sie hoch:

1. Geh auf dein Repository `astro-charlie-333/astro-coaching`
2. **Add file → Upload files**
3. Zieh alle Dateien aus dem ZIP hinein. Ordnerstruktur bleibt beim Ziehen erhalten — wenn nicht, lege den Ordner über **Create new file** an und tippe als Namen `netlify/functions/briefing.mjs`. Die Schrägstriche erzeugen die Ordner automatisch.
4. Unten **Commit changes**

---

## Schritt 2 · Netlify-Konto anlegen

1. Auf **netlify.com** gehen, **Sign up**
2. **Sign up with GitHub** wählen — das erspart dir später viel
3. GitHub fragt, ob Netlify auf deine Repositories zugreifen darf → **Authorize**

---

## Schritt 3 · Seite verbinden

1. In Netlify: **Add new site → Import an existing project**
2. **Deploy with GitHub**
3. Falls es dein Repository nicht anzeigt: **Configure the Netlify app on GitHub** → dein Repository auswählen → **Save**
4. `astro-coaching` anklicken
5. Bei den Einstellungen:
   - **Branch to deploy:** `main`
   - **Build command:** leer lassen
   - **Publish directory:** ein Punkt — also `.`
6. **Deploy site**

Nach ein bis zwei Minuten bekommst du eine Adresse wie `zufallsname-12345.netlify.app`. Die Seite läuft schon — nur die KI-Funktion noch nicht.

> **Namen ändern:** Site configuration → Change site name → zum Beispiel `astro-charlie`. Dann heißt sie `astro-charlie.netlify.app`.

---

## Schritt 4 · API-Schlüssel besorgen

1. Auf **console.anthropic.com** ein Konto anlegen
2. **Plans & Billing** → Guthaben aufladen. **5 € reichen für hunderte Briefings.**
3. Links **API Keys** → **Create Key** → Namen vergeben, etwa `astro-charlie`
4. **Den Schlüssel sofort kopieren** — er wird nur ein einziges Mal angezeigt. Er fängt mit `sk-ant-` an.

> Wenn du ihn verlierst: einfach löschen und einen neuen erstellen. Kein Drama.

**Diesen Schlüssel niemals** in eine Datei schreiben, die im Repository landet. Nur dort einfügen, wo Schritt 5 es sagt.

---

## Schritt 5 · Schlüssel bei Netlify hinterlegen

1. In Netlify: **Site configuration → Environment variables**
2. **Add a variable → Add a single variable**
3. **Key:** `ANTHROPIC_API_KEY` — exakt so, Großbuchstaben, mit Unterstrichen
4. **Value:** dein Schlüssel
5. **Scopes:** alle lassen
6. **Create variable**

**Jetzt der Schritt, den fast alle vergessen:** Die Variable wirkt erst nach einem neuen Deploy.

→ **Deploys → Trigger deploy → Deploy site**

---

## Schritt 6 · Testen

Öffne deine Netlify-Adresse, geh auf **Profile**, setz ein Profil aktiv, dann auf **Briefing** und klick **Briefing erstellen**.

Nach 10 bis 30 Sekunden sollte Text erscheinen.

### Wenn nicht — die vier häufigsten Ursachen

| Fehlermeldung | Ursache | Lösung |
|---|---|---|
| `404` | Funktion nicht gefunden | Liegt `briefing.mjs` wirklich unter `netlify/functions/`? Ist `netlify.toml` im Hauptverzeichnis? |
| `ANTHROPIC_API_KEY ist nicht gesetzt` | Variable fehlt oder kein neues Deploy | Schritt 5 prüfen, dann **Trigger deploy** |
| `Schnittstelle antwortet nicht: ... credit balance` | Kein Guthaben | In der Anthropic Console aufladen |
| Nichts passiert | Seite läuft noch auf GitHub Pages | Du musst die **netlify.app**-Adresse benutzen, nicht die alte |

**Und der wichtigste Ort zum Nachschauen:** In Netlify unter **Logs → Functions** siehst du jede Anfrage und die genaue Fehlermeldung. Das beantwortet fast jede Frage.

---

## Schritt 7 · Ab jetzt automatisch

Jedes Mal, wenn du etwas in GitHub änderst, baut Netlify die Seite neu — automatisch, ohne dass du etwas tun musst. Du arbeitest weiter wie bisher.

---

## Was das kostet

| Posten | Preis |
|---|---|
| Netlify (Hosting, 100 GB Traffic, 125.000 Funktionsaufrufe im Monat) | 0 € |
| Ein Briefing über die Schnittstelle | etwa 1 bis 3 Cent |
| 100 Briefings | unter 3 € |
| Eigene Domain, falls du eine willst | 10 bis 15 € im Jahr |

Die Funktion hat eine eingebaute Bremse: **maximal 30 Anfragen pro Stunde und Person.** Das schützt dich davor, dass jemand deine Rechnung sprengt.

---

## Wenn du eine eigene Domain willst

1. Domain kaufen, etwa bei Namecheap, Cloudflare oder INWX
2. In Netlify: **Domain management → Add a domain**
3. Netlify zeigt dir zwei bis vier Nameserver-Adressen
4. Die beim Domain-Anbieter eintragen
5. Nach ein paar Stunden läuft es. HTTPS richtet Netlify selbst ein.

---

## Datenschutz — bevor Klientinnen es nutzen

Die Funktion überträgt **keinen Namen, kein Geburtsdatum, keinen Geburtsort.** Nur die fertig berechneten Positionen und deine Notiz. Das ist bewusst so gebaut und ein echter Vorteil.

Trotzdem ist es eine Verarbeitung durch einen Dritten. Du brauchst:

- Einen Absatz in deiner Datenschutzerklärung, dass für die Textgenerierung eine Schnittstelle von Anthropic genutzt wird
- Einen Auftragsverarbeitungsvertrag mit Anthropic — den gibt es in der Console unter **Settings**
- Für die Arbeit mit Klientinnen: eine Einwilligung, dass du ihre Daten astrologisch verarbeitest
- Impressum und Datenschutzerklärung überhaupt, sobald die Seite öffentlich ist

Solange nur du selbst es nutzt, reicht der erste Punkt.

---

## Wenn etwas schiefgeht

**Deploy schlägt fehl:** Unter **Deploys** auf den fehlgeschlagenen klicken — dort steht die Ursache im Klartext.

**Alte Version wird angezeigt:** Netlify hält Dateien kurz im Zwischenspeicher. Im Browser einmal hart neu laden (Strg+Shift+R beziehungsweise Cmd+Shift+R).

**Alles kaputt:** Unter **Deploys** kannst du jede frühere Version mit einem Klick wiederherstellen — **Publish deploy**. Nichts geht dauerhaft verloren.

---

## Und danach

Sobald das läuft, ist der Weg für alle weiteren Agenten frei — Nachbereitung, Newsletter, Deutungen für Nutzerinnen. Jeder ist dann nur noch eine weitere Datei in `netlify/functions/`, und der Schlüssel ist schon gesetzt.

Fang mit dem Briefing an. Wenn das steht, ist der Rest Fleißarbeit.
