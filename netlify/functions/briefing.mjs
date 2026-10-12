// netlify/functions/briefing.mjs
// Nimmt fertig berechnete Chartdaten entgegen und lässt daraus ein Briefing formulieren.
// Der API-Schlüssel liegt nur hier auf dem Server, nie im Browser.

const MODELL = 'claude-sonnet-5';   // guenstig und schnell; bei Bedarf tauschbar
const MAX_ANFRAGEN_PRO_STUNDE = 30; // einfache Bremse pro IP

const zaehler = new Map();
function limitUeberschritten(ip) {
  const jetzt = Date.now();
  const eintrag = zaehler.get(ip) || { n: 0, seit: jetzt };
  if (jetzt - eintrag.seit > 3600_000) { eintrag.n = 0; eintrag.seit = jetzt; }
  eintrag.n += 1;
  zaehler.set(ip, eintrag);
  return eintrag.n > MAX_ANFRAGEN_PRO_STUNDE;
}

const HALTUNG = `Du bereitest ein astrologisches Coaching-Gespräch vor. Du schreibst für die Coachin, nicht für die Klientin.

ABSOLUT VERBINDLICH:
- Alle Grade, Häuser, Orben und Aspekte im Datenpaket sind bereits exakt berechnet. Übernimm sie unverändert. Rechne nichts nach, ergänze keine Stellungen, erfinde keine Zahlen. Wenn etwas nicht im Paket steht, existiert es für dich nicht.
- Keine Vorhersagen. Nie "es wird passieren", sondern "diese Art von Bewegung ist angelegt".
- Keine Aussagen zu Gesundheit, Diagnosen, Recht oder Geldanlagen. Wenn das Anliegen dorthin zeigt, weise auf die zuständige Fachperson hin.
- Spannungsaspekte werden nicht aufgelöst, sondern abwechselnd bedient. Beide Pole haben recht.
- Gewichte nach dem Feld "gewicht" und nach Orbis. Was weit ist, ist Hintergrund. Nenne höchstens drei Hauptthemen.
- Deutsch, klar, ohne Esoterik-Floskeln, ohne Schmeichelei. Kurze Sätze.

FORMAT (Markdown, genau diese Abschnitte):
## Die drei Hauptthemen
## Was ich zuerst ansprechen würde
## Fragen für dieses Gespräch
## Wovon ich die Finger lassen würde
## Was gerade läuft`;

const ARTEN = {
  erstgespraech: 'Erstgespräch. Die Person kennst du noch nicht. Der Einstieg muss tragen, ohne zu überfordern.',
  folge: 'Folgetermin. Es geht darum, an einem bekannten Thema weiterzuarbeiten.',
  timing: 'Timing-Gespräch. Im Mittelpunkt steht, was gerade und in den nächsten Wochen ansteht.',
  selbst: 'Selbstreflexion. Die Coachin arbeitet mit dem eigenen Chart. Sprich sie direkt mit "du" an.'
};

export default async (request) => {
  if (request.method !== 'POST') {
    return new Response('Nur POST', { status: 405 });
  }
  const schluessel = process.env.ANTHROPIC_API_KEY;
  if (!schluessel) {
    return new Response('ANTHROPIC_API_KEY ist nicht gesetzt.', { status: 500 });
  }
  const ip = request.headers.get('x-nf-client-connection-ip') || 'unbekannt';
  if (limitUeberschritten(ip)) {
    return new Response('Zu viele Anfragen. Versuch es in einer Stunde nochmal.', { status: 429 });
  }

  let daten;
  try { daten = await request.json(); }
  catch { return new Response('Ungültige Anfrage', { status: 400 }); }

  const { chart, anliegen = '', art = 'erstgespraech' } = daten;
  if (!chart || !chart.stellungen) {
    return new Response('Keine Chartdaten', { status: 400 });
  }

  const nachricht = [
    ARTEN[art] || ARTEN.erstgespraech,
    '',
    'ANLIEGEN:',
    anliegen.trim() || '(nicht angegeben)',
    '',
    'BERECHNETE CHARTDATEN:',
    JSON.stringify(chart)
  ].join('\n');

  try {
    const antwort = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': schluessel,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: MODELL,
        max_tokens: 1600,
        system: HALTUNG,
        messages: [{ role: 'user', content: nachricht }]
      })
    });

    if (!antwort.ok) {
      const fehler = await antwort.text();
      return new Response('Schnittstelle antwortet nicht: ' + fehler.slice(0, 300), { status: 502 });
    }
    const ergebnis = await antwort.json();
    const text = (ergebnis.content || [])
      .filter((t) => t.type === 'text')
      .map((t) => t.text)
      .join('\n');

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    });
  } catch (e) {
    return new Response('Fehler: ' + String(e).slice(0, 200), { status: 500 });
  }
};
