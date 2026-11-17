/* Astro-Charlie · Zahlen — die Texte
   Aufgabe 56, aus 34 und 38. Bis zum 2026-11-17 standen diese
   hundertvierundneunzig Zeichenketten in zahlen-app.js, also in der
   Anzeige. Beim Umzug in eine andere Umgebung (PRODUKT.md Abschnitt 7)
   wandern Rechnung, Texte und Prüfungen unverändert mit, die Anzeige
   wird neu gebaut — ein Satz in der Anzeige wäre dort verloren.

   Eine Lücke heißt {so} und wird von `zFuell` in zahlen-app.js
   gefüllt. Eine Lücke, die niemand füllt, bricht den Bau
   (pruefwerk.pruefe_vorlagenluecken).

   „dein" steht hier nicht von Hand vor einem Namen, dessen
   Geschlecht wechselt: Z_LABEL trägt das Geschlecht, B_BEUGE aus
   kern/bahn-daten.js bildet die Form. Vorher stand auf der Seite
   „deine Ausdruck", „deine Geburtstag" und „deine Jahr". */

/* Die acht Karten des Blattes. `w` sagt, wie die Zahl zustande kommt
   und was sie gilt — in Alltagssprache, ohne Fachwort. */
var Z_KARTEN = [
 {k:'lebenszahl', n:'Lebenszahl',
  w:'Aus dem ganzen Geburtsdatum. Die Zahl, die gemeint ist, wenn jemand nach „deiner Zahl" fragt.'},
 {k:'geburtstag', n:'Geburtstagszahl',
  w:'Nur der Tag im Monat. Gilt als das, was dir ohne Mühe zur Verfügung steht.'},
 {k:'ausdruck',   n:'Ausdruckszahl',
  w:'Alle Buchstaben des Namens. Gilt als das, was andere von dir sehen und was du kannst.'},
 {k:'seele',      n:'Seelenzahl',
  w:'Nur die Vokale. Gilt als das, was du willst, ohne es zu sagen.'},
 {k:'person',     n:'Persönlichkeit',
  w:'Nur die Konsonanten. Gilt als die Oberfläche, der erste Eindruck.'},
 {k:'reife',      n:'Reifezahl',
  w:'Lebenszahl plus Ausdruckszahl. Gilt als das, worauf beides zuläuft.'},
 {k:'jahr',       n:'Dein Jahr',
  w:'Tag plus Monat plus laufendes Jahr. Läuft in einem Neuner-Takt, jedes Jahr eine weiter.'},
 {k:'herausf',    n:'Herausforderung',
  w:'Die Differenz der Datumsteile. Gilt als die wiederkehrende Aufgabe. Eine 0 heißt: keine drängt sich vor.'}
];

/* Wie eine der eigenen Zahlen heißt, wenn „dein" davorsteht.
   `g` ist das grammatische Geschlecht für B_BEUGE, `wort` das
   Hauptwort ohne Besitzwort. Dieselbe Bauart wie B_ZIEL in
   kern/bahn-daten.js — und derselbe Grund: „dein Ausdruck" und
   „deine Seele" sind nicht dasselbe Wort mit einem anderen Anfang. */
var Z_LABEL = {
 lebenszahl:{g:'w', wort:'Lebenszahl'},
 geburtstag:{g:'m', wort:'Geburtstag'},
 ausdruck:  {g:'m', wort:'Ausdruck'},
 seele:     {g:'w', wort:'Seele'},
 person:    {g:'w', wort:'Persönlichkeit'},
 reife:     {g:'w', wort:'Reife'},
 jahr:      {g:'s', wort:'Jahr'}
};

var Z_T = {

 /* ── Kopfzeilen: wer, welche Tafel ─────────────────────────── */
 ohneProfil:'<span class="z-hint">Noch kein Profil angelegt. '+
   '<a href="profile.html">Hier anlegen</a> &mdash; danach rechnet die Seite mit '+
   'deinem Datum. Die Zahlen, der Ring und die Hausnummern funktionieren auch ohne.</span>',
 personKnopf:'<button type="button" class="z-knopf{ist}" data-p="{id}">{name}</button>',
 sysKnopf:'<button type="button" class="z-knopf{ist}" data-s="{k}">{name}</button>',
 sysName:{pyth:'Pythagoräisch', chald:'Chaldäisch'},
 sysHint:{
  pyth:'A bis Z laufen glatt durch 1 bis 9. Die verbreitete Tafel &mdash; wenn jemand '+
    'eine Zahl nennt, ist meist diese gemeint.',
  chald:'Nach Klanggruppen verteilt, die 9 bleibt unbesetzt. Diese Schule rechnet den '+
    'Rufnamen, nicht den Namen auf der Urkunde.'},
 ohneName:'?',

 /* ── 1 · Das Blatt ─────────────────────────────────────────── */
 blattLeer:'<div class="z-leer">Ohne Profil gibt es kein Blatt. '+
   '<a href="profile.html">Profil anlegen</a> &mdash; es braucht nur das Geburtsdatum, '+
   'keine Uhrzeit.</div>',
 karte:'<div class="z-k{leer}"{rand}><span class="lab">{name}</span>'+
   '<div class="wert"><span class="zif">{wert}</span>{titel}{roh}</div>'+
   '<p class="wie">{wie}</p>{knopf}</div>',
 /* Die leere Karte bekommt keinen Rand aus den Daten; ihre Farbe
    steht in zahlen-stil.css. */
 karteRand:' style="border-top-color:{farbe}"',
 karteTitel:'<span class="nm">{titel}</span>',
 karteRoh:'<span class="nm ac-tech" data-ab="2">aus {roh}</span>',
 karteKnopf:'<button type="button" data-z="{z}">Was die {name} heißt</button>',
 karteLeerWie:'Dafür braucht die Seite einen Namen im Feld oben.',
 ohneWert:'&ndash;',
 kartenHinweis:'<p class="z-hint z-kartenhinweis" data-ab="1">Die ersten beiden '+
   'Zahlen kommen allein aus dem Datum und stehen deshalb fest. Ausdruck, Seele und '+
   'Persönlichkeit kommen aus dem Namen und ändern sich, wenn der Name sich '+
   'ändert &mdash; bei Heirat, Künstlernamen oder Transition. Genau das ist der '+
   'Grund, warum manche Schulen nur mit dem Namen rechnen und andere nur mit dem Datum.</p>',

 /* Die Rechenkette unter dem Blatt */
 datum:'{t}.{m}.{j}',
 ketteKopf:'<div class="z-kette"><span class="lab">So kommt die Lebenszahl zustande</span>'+
   '<div class="z-rechn">',
 kettePlus:'<span class="op">+</span>',
 ketteGleich:'<span class="op">=</span>',
 kettePfeil:'<span class="pf">&rarr;</span>',
 ketteZiffer:'<span class="zf">{c}</span>',
 ketteWert:'<span class="zf{end}">{w}</span>',
 ketteSatz:'</div><p>Jede Ziffer des Datums {datum} einmal addiert, dann '+
   'zusammengezogen.{meister}</p>',
 ketteMeister:' Bei {n} wird angehalten: 11, 22 und 33 gelten als Meisterzahlen und '+
   'werden nicht weiter reduziert.',
 ketteStrittig:'<p data-ab="2">Dieses Datum ist eines der strittigen. Zieht man Tag, '+
   'Monat und Jahr erst einzeln zusammen und addiert dann, kommt <b>{teile}</b> heraus '+
   'statt <b>{summe}</b>. Auf die eine Ziffer laufen beide Wege gleich ({stelle}) '+
   '&mdash; der Streit geht nur um die Meisterzahl.</p>',
 ketteWege:'<p data-ab="3">Die drei üblichen Wege im Vergleich &mdash; Ziffernsumme '+
   '<b>{summe}</b>, blockweise (Tag {bTag} + Monat {bMonat} + Jahr {bJahr}) '+
   '<b>{teile}</b>, streng reduziert (Tag {sTag} + Monat {sMonat} + Jahr {sJahr}) '+
   '<b>{streng}</b>.</p>',
 ketteVier:'<p data-ab="4">Alle vier Herausforderungszahlen: erste {erste}, zweite '+
   '{zweite}, Haupt {haupt}, vierte {vierte}. Geburtstagszahl unreduziert {gebRoh}, '+
   'Rohsumme des Datums {rohsumme}, Anteil dieser Lebenszahl an allen Geburtstagen '+
   '{anteil}&nbsp;%.</p>',
 ketteEnde:'</div>',

 /* Das Buchstabengitter */
 gitterKopf:'<div class="z-gitter">',
 gitterLuecke:'<span class="lk luecke"></span>',
 gitterZeichen:'<span class="lk {art}"><b>{c}</b><i>{n}</i></span>',
 gitterVerdeckt:'&bull;',
 gitterLeg:'</div><div class="z-leg">'+
   '<span><i class="z-pv"></i>Vokal &mdash; zählt zur Seelenzahl</span>'+
   '<span><i class="z-pk"></i>Konsonant &mdash; zählt zur Persönlichkeit</span>{y}'+
   '<span class="ac-tech" data-ab="2">{n} Buchstaben, Summe {summe}</span></div>',
 gitterY:'<span><i class="z-py"></i>Y &mdash; je nach Schule beides</span>',

 /* Wo die Schulen auseinandergehen */
 streitTafel:'<div class="z-streit"><span class="t">Die Tafeln sind uneins</span>'+
   'Derselbe Name gibt in der <b>{tafel}en</b> Tafel die Ausdruckszahl <b>{hier}</b>, '+
   'in der anderen <b>{dort}</b>. Beide Schulen unterrichten ihre Tafel als die '+
   'richtige. Es gibt keinen Schiedsrichter &mdash; du entscheidest, mit welcher du '+
   'arbeitest, und bleibst dann dabei.</div>',
 streitUmlaut:'<div class="z-streit"><span class="t">Der Umlaut entscheidet mit</span>'+
   'In dem Namen steckt ein Umlaut, und dafür hat niemand eine Regel festgelegt. '+
   'Zählt das Ä wie ein A, kommt <b>{hier}</b> heraus; schreibt man es als AE, '+
   '<b>{dort}</b>. Beide Varianten werden so unterrichtet.</div>',
 streitY:'<div class="z-streit"><span class="t">Das Y hängt dazwischen</span>'+
   'Das Y gilt mancherorts als Vokal und mancherorts als Konsonant. Zählt es als '+
   'Konsonant, ist deine Seelenzahl <b>{ohneY}</b>, als Vokal <b>{mitY}</b>. '+
   'Die übliche Faustregel: Vokal nur dort, wo das Y wie ein Vokal gesprochen wird.</div>',
 streitAndere:'<div class="z-streit" data-ab="4">'+
   '<span class="t">Die andere Tafel, vollständig</span>'+
   '{tafel}: Ausdruck <b>{ausdruck}</b> (aus {ausdruckRoh}), Seele <b>{seele}</b> '+
   '(aus {seeleRoh}), Persönlichkeit <b>{person}</b> (aus {personRoh}){fehlt}.</div>',
 andereFehlt:', fehlende Ziffern {liste}',
 andereKeine:', keine fehlenden Ziffern',
 streitFehlt:'<div class="z-streit" data-ab="2">'+
   '<span class="t">Fehlende Ziffern im Namen</span>'+
   'Im Namen kommen die Ziffern <b>{liste}</b> nicht vor. In der pythagoräischen '+
   'Schule heißt das „karmische Lektion": das, was nicht mitgeliefert wird und '+
   'deshalb gelernt werden muss. Was daran auffällt: Bei kurzen Namen fehlt fast '+
   'immer viel und bei langen fast nichts. Die Zahl sagt also auch etwas über die '+
   'Länge des Namens aus.</div>',

 /* ── 2 · Der Ring ──────────────────────────────────────────── */
 ringLabel:'Die Ziffern eins bis neun im Kreis, die drei Meisterzahlen in der Mitte',
 /* Die Vorlesefassung steht in einem Attribut, das als Text gesetzt
    wird: hier steht der Gedankenstrich selbst und keine Entität,
    sonst liest der Bildschirmleser „und-m-dash-Semikolon" vor. */
 segLabel:'{n} — {titel}{mein}',
 mzLabel:'Meisterzahl {n}{mein}',
 /* {dein} kommt aus B_BEUGE, nie von Hand. */
 segMein:', {dein}',
 ringMitte:'Meisterzahlen',
 legEintrag:'<span><em style="background:{farbe}">{n}</em>{labels}</span>',
 legLeer:'<span>Mit einem Profil werden hier deine eigenen Zahlen markiert.</span>',

 /* ── Das Detail einer Zahl ─────────────────────────────────── */
 detailLeer:'<div class="z-leer">Noch keine Zahl ausgewählt. Tippe im Ring eine an '+
   '&mdash; oder in der Tabelle weiter unten ein Feld.</div>',
 detail:'<div class="z-detail" style="border-left-color:{farbe}">'+
   '<div class="z-dkopf"><div class="z-dzif" style="color:{farbe}">{n}</div>'+
   '<div class="z-dtit"><h3>{name} &mdash; {titel}</h3>'+
   '<span class="kz">{kurz}</span><div class="z-dmeta">{meta}</div></div></div>'+
   '<p>{wesen}</p>{kasten}'+
   '<div class="z-zwei"><div class="z-sp gut"><b>Was sie kann</b>{stark}</div>'+
   '<div class="z-sp schat"><b>Wo sie kippt</b>{schatten}</div></div>'+
   '<div class="z-bereiche">{bereiche}</div></div>',
 metaMein:'<span class="z-mmein">{dein}</span>',
 /* Zwei eigene Zahlen auf derselben Ziffer: „Deine Lebenszahl & Seele".
    Das Besitzwort steht einmal, vor der ersten — die Beugung richtet
    sich nach ihr. */
 undZeichen:' &amp; {wort}',
 undWort:' und ',
 metaMeister:'<span>Meisterzahl &mdash; Grundzahl {grund}</span>',
 metaInd:'<span class="ac-tech" data-ab="2">indisch {planet}</span>',
 metaWest:'<span class="ac-tech" data-ab="2">westlich {planet}</span>',
 metaTag:'<span class="ac-tech" data-ab="3">Tag: {tag}</span>',
 kastenMeister:'<p data-ab="1" class="z-kasten gold">Die {n} ist eine '+
   '<b>Meisterzahl</b>. Das heißt nur: Sie wird beim Zusammenziehen nicht weiter '+
   'verkleinert, obwohl man es könnte. Wer damit nichts anfangen kann, rechnet '+
   'einfach mit der Grundzahl {grund} weiter &mdash; das ist keine schlechtere '+
   'Antwort, nur eine andere Schule.</p>',
 kastenMein:'<p data-ab="1" class="z-kasten blau">Bei dir kommt diese Zahl als '+
   '<b>{labels}</b> vor. Steht sie mehrfach, heißt das in jeder Schule dasselbe: '+
   'Das Thema wiederholt sich bei dir, statt sich auf mehrere zu verteilen.</p>',
 detailBereich:'<div class="z-b"><span class="bk">{name}</span><p>{text}</p>'+
   '<div class="tun"><b>Ein Handgriff</b>{tun}</div></div>',

 /* ── 3 · Die Matrix ───────────────────────────────────────── */
 themaKnopf:'<button type="button" class="z-knopf{ist}" data-t="{k}">{n}</button>',
 matrixKopf:'<table><thead><tr><th>Zahl</th>{spalten}</tr></thead><tbody>{zeilen}'+
   '</tbody></table>',
 matrixSpalte:'<th>{n}</th>',
 matrixZeile:'<tr class="{klasse}"><th>{n}<small>{titel}</small></th>{zellen}</tr>',
 matrixZelle:'<td class="z-zelle" data-z="{n}" data-t="{t}" tabindex="0">{text}</td>',
 gekuerzt:'{text}…',
 listeZeile:'<div class="zl{klasse}" data-z="{n}" data-t="{t}" tabindex="0" '+
   'style="border-left-color:{farbe}"><b>{n} &mdash; {titel}{mein}</b><p>{text}</p></div>',
 listeMein:' <i>{dein}</i>',

 /* ── 4 · Wohnen ───────────────────────────────────────────── */
 wohnKeine:'<div class="z-leer">Darin steckt keine Nummer. Tippe die Hausnummer ein, '+
   'zum Beispiel <b>47a</b> &mdash; Straßennamen zählen nicht mit.</div>',
 wohnLeer:'<div class="z-leer">Trag eine Nummer ein. Du bekommst dann, was diese '+
   'Nummer mit einem Zuhause macht, für wen sie taugt und &mdash; wenn ein Profil '+
   'aktiv ist &mdash; wie sie zu deiner eigenen Zahl steht.</div>',
 rolleHaus:'Hausnummer',
 rolleWohnung:'Wohnung oder Etage',
 rolleWeitere:'Weitere Nummer',
 rolleEine:'Die Nummer',
 wohnBlock:'<div class="z-wohnerg" style="border-left-color:{farbe}">'+
   '<div class="z-wk"><div class="z-wzif" style="color:{farbe}">{n}</div>'+
   '<div><span class="lab z-wrolle">{rolle} {text}</span>'+
   '<b class="z-wname">{name} &mdash; {titel}</b></div>{urteil}</div>'+
   '<p class="ac-tech" data-ab="2">{text}: {rechnung}</p><p>{tut}</p>'+
   '<div class="z-wpaar"><div class="z-sp gut"><b>Gut für</b>{gut}</div>'+
   '<div class="z-sp schat"><b>Schwer für</b>{schwer}</div></div>{dich}'+
   '<div class="z-wkniff"><b>Wenn du schon drin wohnst</b>{kniff}</div>'+
   '<h4>Wem diese Nummer gut täte</h4><div class="z-passt">{passt}</div>'+
   '<p class="z-hint z-wlegende">Grün: Die Nummer liefert, was dieser Lebenszahl '+
   'fehlt. Rot: Sie verdoppelt, wovon sie schon zu viel hat. Grau: kein besonderer '+
   'Zug.</p></div>',
 wohnUrteil:'<span class="z-wurteil" style="background:{farbe}">{n}</span>',
 wohnDich:'<h4>Und für dich?</h4><p>{satz} {folge}</p>',
 wohnPasstGut:'<b>{n}</b>',
 wohnPasstSchlecht:'<b class="r">{n}</b>',
 wohnPasstNeutral:'<b class="n">{n}</b>',
 wohnChina:'<div class="z-streit"><span class="t">Nebenbei, und keine Deutung</span>'+
   'In dieser Nummer steckt eine {zahl}. {vier}{acht}Das ist eine Tatsache über '+
   'Sprache und Immobilienmarkt, nicht über die Zahl. In Berlin hört niemand diesen '+
   'Gleichklang, also wirkt er hier auch nicht.</div>',
 chinaVier:'Im chinesischen Sprachraum klingt die Vier wie das Wort für sterben, und '+
   'deshalb werden in Hochhäusern dort Etagen mit 4 und 14 übersprungen. ',
 chinaAcht:'Die Acht klingt dort wie das Wort für reich werden, und Nummern mit '+
   'vielen Achten erzielen auf Auktionen reale Aufpreise. ',

 passtKopf:'<table><thead><tr><th>Lebenszahl</th><th>Trägt dich</th><th>Reibt</th>'+
   '<th>Hat selbst schon genug</th></tr></thead><tbody>{zeilen}</tbody></table>',
 passtZeile:'<tr class="{klasse}"><th>{n}<small>{titel}</small></th>'+
   '<td><b class="z-ptraegt">{gut}</b></td><td class="ab">{schlecht}</td>'+
   '<td>{satt}</td></tr>',
 passtHinweis:'<p class="z-hint z-plegende">Die letzte Spalte ist der Grund für die '+
   'beiden davor: Eine Nummer, die liefert, wovon die Zahl ohnehin genug hat, steht '+
   'unter „Reibt" &mdash; eine, die das Gegenstück liefert, unter „Trägt dich".</p>',

 /* ── 5 · Die Schulen ─────────────────────────────────────── */
 schule:'<details class="z-sys"{offen}><summary><b>{n}</b><span>{ruf}</span>{neu}'+
   '</summary><div class="z-sys-in"><dl>'+
   '<div><dt>Wie gerechnet wird</dt><dd>{wie}</dd></div>'+
   '<div><dt>Woher es kommt</dt><dd>{her}</dd></div>'+
   '<div><dt>Wofür es gut ist</dt><dd>{gut}</dd></div>'+
   '<div><dt>Was dagegen spricht</dt><dd class="warn">{vor}</dd></div>'+
   '</dl></div></details>',
 schuleNeu:'<i>jung</i>',

 /* ── 6 · Zahl und Chart ──────────────────────────────────── */
 zeichen:['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion',
          'Schütze','Steinbock','Wassermann','Fische'],
 planetKopf:'<table><thead><tr><th>Zahl</th><th>Indisch</th><th>Westlich</th>'+
   '<th>Wochentag</th></tr></thead><tbody>{zeilen}</tbody></table>',
 planetZeile:'<tr class="{klasse}"><td>{n}</td><td>{ind}</td>'+
   '<td class="{abKlasse}">{west}</td><td>{tag}</td></tr>',
 planetKeiner:'<span class="z-keiner">keiner</span>',
 bruecke:'<div class="z-streit z-bruecke"><span class="t">Woran die Zuordnung '+
   'hängt</span>Die 4 und die 7 sind die beiden Zahlen, bei denen die Schulen '+
   'auseinandergehen: indisch Rahu und Ketu, westlich Uranus und Neptun. Das sind '+
   'nicht nur andere Namen &mdash; Rahu und Ketu sind die Mondknoten, also '+
   'rechnerische Punkte, Uranus und Neptun sind Planeten. Es sind außerdem genau '+
   'die zwei Zahlen ohne klassischen Wochentag, weil es in der Siebentagewoche nur '+
   'sieben Planeten gibt. Wer mit Zahlen und Chart zusammen arbeitet, muss sich '+
   'hier entscheiden.</div>',
 brueckeMein:'<div class="z-streit z-bmein"><span class="t">Bei dir '+
   'nebeneinandergelegt</span>Deine Lebenszahl ist <b>{lz}</b>{grund}, und die '+
   'indische Zuordnung hängt sie an <b>{planet}</b>. In deinem Chart steht {planet} '+
   'in <b>{zeichen}</b>, im <b>{haus}. Haus</b>. Wenn du beides zusammen benutzen '+
   'willst, ist das der Anschluss: Die Zahl nennt das Thema, das Chart sagt, wo und '+
   'wie es bei dir vorkommt. Widersprechen sich die beiden, gilt das Chart &mdash; '+
   'es ist das feinere Werkzeug.</div>',
 brueckeGrund:' (Grundzahl {grund})',

 /* ── 7 · Ehrlichkeit mit Zahlen ──────────────────────────── */
 vertKopf:'<p class="z-balu">Anteil aller Geburtstage 1940 bis 2039</p>'+
   '<div class="z-bal">{balken}</div>{satz}',
 vertBalken:'<i class="{klasse}" style="flex:{anteil} 1 0" title="{n}: {pz}&nbsp;%">'+
   '{n}</i>',
 vertSatz:'<p>Jede Ziffer 1, 3, 5, 7, 8 und 9 hat genau {neuntel}&nbsp;%. Die 2 hat '+
   'nur {zwei}&nbsp;%, weil fast alles, was auf 2 hinausläuft, vorher auf der 11 '+
   'anhält &mdash; und 2&nbsp;+&nbsp;11 ergibt wieder {beide}&nbsp;%. Dasselbe gilt '+
   'für 4 und 22 und für 6 und 33.</p>',
 prozent:'{pz}&nbsp;%',

 /* ── Der Bericht zum Mitnehmen ───────────────────────────── */
 berKopf:'ZAHLEN — {wer}',
 berOhneProfil:'ohne Profil',
 berKeinBlatt:'Kein Profil aktiv, deshalb kein Blatt.',
 berDatum:'Geburtsdatum {datum} · Tafel {tafel}',
 berBlatt:'DAS BLATT',
 berZeile:'  {lab}: {wert}{titel}',
 berTitel:' — {titel}',
 berKette:'    {roh} → {kette}',
 berStrittig:'    strittig: der blockweise Weg gibt {teile}',
 berLeben:'Lebenszahl',
 berGeburtstag:'Geburtstagszahl',
 berAusdruck:'Ausdruckszahl',
 berSeele:'Seelenzahl',
 berPerson:'Persönlichkeit',
 berReife:'Reifezahl',
 berJahr:'Persönliches Jahr {jahr}',
 berHerausf:'  Herausforderung: {n}',
 berAndereTafel:'  Hinweis: andere Tafel gibt Ausdruckszahl {n}',
 berUmlaut:'  Hinweis: Umlaut als AE gibt Ausdruckszahl {n}',
 berZurLeben:'ZUR LEBENSZAHL {n} — {titel}',
 berKann:'  Was sie kann: {t}',
 berKippt:'  Wo sie kippt: {t}',
 berHandgriff:'  Handgriff: {t}',
 berNummer:'NUMMER {text} → {n}',
 berTut:'  {t}',
 berGut:'  Gut für: {t}',
 berSchwer:'  Schwer für: {t}',
 berFuerDich:'  Für dich: {urteil}. {satz} {folge}',
 berKniff:'  Kniff: {t}',
 berGrenzen:'GRENZEN',
 berGrenze1:'  Rund jeder neunte Mensch hat dieselbe Lebenszahl ({anteil} % aller '+
   'Geburtstage).',
 berGrenze2:'  Die Tafeln der Schulen widersprechen sich; es gibt keinen '+
   'Schiedsrichter.',
 berGrenze3:'  Dass diese Zahlen etwas vorhersagen, ist nicht belegt.',
 berGrenze4:'  Aus einem Geburtsdatum lässt sich kein Neurotyp und keine Diagnose '+
   'ablesen.',

 /* ── Bedienung ───────────────────────────────────────────── */
 zeigen:'Buchstaben zeigen',
 verdecken:'Buchstaben verdecken',
 kopiert:'Blatt kopiert, {n} Zeichen.'
};
