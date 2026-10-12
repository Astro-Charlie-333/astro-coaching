#!/usr/bin/env python3
"""Prüft himmel.js: Sonnenzeiten gegen PyEphem, Planetenstunden gegen die Regel,
   Mond ohne Lauf gegen eine unabhängige Nachrechnung mit PyEphem."""
import json, subprocess, pathlib, sys, math
import ephem

hier = pathlib.Path(__file__).parent
fehler = ok = 0
LAT, LON = 52.52, 13.405          # Berlin
DJD = 2415020.0                   # Dublin JD → JD


def pruefe(name, bed, info=''):
    global fehler, ok
    if bed:
        ok += 1
    else:
        fehler += 1
        print(f'  FEHLER  {name}' + (f'  →  {info}' if info else ''))


def js(code):
    skript = f'''
const fs=require('fs');
const ENG=fs.readFileSync('{hier}/engine.js','utf8');
const HIM=fs.readFileSync('{hier}/himmel.js','utf8');
global.window={{}};
(0,eval)(ENG);
(0,eval)(HIM);
const H=global.window.AC_HIMMEL;
{code}
'''
    r = subprocess.run(['node', '-e', skript], capture_output=True, text=True)
    if r.returncode:
        print(r.stderr)
        sys.exit(1)
    return json.loads(r.stdout)


# ── 1. Sonnenauf- und -untergang ─────────────────────────
print('Sonnenzeiten Berlin gegen PyEphem')
ort = ephem.Observer()
ort.lat, ort.lon, ort.elevation = str(LAT), str(LON), 0
ort.pressure = 0
# PyEphem zieht den Sonnenradius selbst ab (use_center=False), deshalb hier nur
# die Refraktion: -34' + 16' Radius = -50', dasselbe wie unsere -0,833 Grad.
ort.horizon = '-0:34'

tage = ['2026/01/15', '2026/03/21', '2026/06/21', '2026/09/23',
        '2026/10/11', '2026/12/21', '2027/05/02']
max_auf = max_unter = 0.0
for t in tage:
    d = ephem.Date(t + ' 12:00')
    jd = float(d) + DJD
    unser = js(f'console.log(JSON.stringify(H.sonnenZeiten({jd},{LAT},{LON})))')
    ort.date = ephem.Date(t + ' 00:00')
    auf = ort.next_rising(ephem.Sun())
    unter = ort.next_setting(ephem.Sun())
    d_auf = abs((unser['auf'] - DJD) - float(auf)) * 1440
    d_unt = abs((unser['unter'] - DJD) - float(unter)) * 1440
    max_auf = max(max_auf, d_auf)
    max_unter = max(max_unter, d_unt)
    pruefe(f'Sonnenaufgang {t}', d_auf < 2.5, f'{d_auf:.2f} min Abweichung')
    pruefe(f'Sonnenuntergang {t}', d_unt < 2.5, f'{d_unt:.2f} min Abweichung')
print(f'  größte Abweichung: Aufgang {max_auf:.2f} min, Untergang {max_unter:.2f} min')

# Polarfall
nord = js(f'console.log(JSON.stringify(H.sonnenZeiten({float(ephem.Date("2026/06/21 12:00"))+DJD},78.2,15.6)))')
pruefe('Spitzbergen im Juni: Polartag erkannt', nord.get('polar') == 'tag', json.dumps(nord))
nord2 = js(f'console.log(JSON.stringify(H.sonnenZeiten({float(ephem.Date("2026/12/21 12:00"))+DJD},78.2,15.6)))')
pruefe('Spitzbergen im Dezember: Polarnacht erkannt', nord2.get('polar') == 'nacht', json.dumps(nord2))

# ── 2. Planetenstunden ───────────────────────────────────
print('Planetenstunden')
CHALD = ['Saturn', 'Jupiter', 'Mars', 'Sonne', 'Venus', 'Merkur', 'Mond']
TAGSHERR = ['Sonne', 'Mond', 'Mars', 'Merkur', 'Jupiter', 'Venus', 'Saturn']

# Die erste Stunde nach Sonnenaufgang muss dem Tagesherrscher gehören,
# und das an jedem Wochentag.
for t in ['2026/10/11', '2026/10/12', '2026/10/13', '2026/10/14',
          '2026/10/15', '2026/10/16', '2026/10/17']:
    jd0 = float(ephem.Date(t + ' 12:00')) + DJD
    sz = js(f'console.log(JSON.stringify(H.sonnenZeiten({jd0},{LAT},{LON})))')
    kurz_nach = sz['auf'] + 1 / 1440
    p = js(f'console.log(JSON.stringify(H.planetenStunde({kurz_nach},{LAT},{LON})))')
    wt = ephem.Date(p['auf'] - DJD).datetime().weekday()      # Mo=0
    wt_so = (wt + 1) % 7                                      # So=0, wie in JS
    soll = TAGSHERR[wt_so]
    pruefe(f'{t}: erste Tagesstunde gehört {soll}',
           p['herr'] == soll and p['nr'] == 1 and not p['nacht'],
           f"bekam {p['herr']}, Nr. {p['nr']}, Nacht={p['nacht']}")

# Die Tabelle muss lückenlos sein und 24 Stunden abdecken
jd_jetzt = float(ephem.Date('2026/10/11 14:00')) + DJD
tab = js(f'console.log(JSON.stringify(H.stundenTabelle({jd_jetzt},{LAT},{LON})))')
pruefe('24 Stunden in der Tabelle', len(tab) == 24, str(len(tab)))
luecken = sum(1 for a, b in zip(tab, tab[1:]) if abs(a['bis'] - b['von']) > 1e-7)
pruefe('keine Lücken zwischen den Stunden', luecken == 0, f'{luecken} Sprünge')
pruefe('genau eine Stunde als „jetzt" markiert',
       sum(1 for x in tab if x['jetzt']) == 1,
       str(sum(1 for x in tab if x['jetzt'])))
pruefe('Tabelle deckt Sonnenaufgang bis Sonnenaufgang',
       abs((tab[-1]['bis'] - tab[0]['von']) - 1) < 0.02,
       f"{(tab[-1]['bis']-tab[0]['von'])*24:.2f} Stunden")
# Chaldäische Folge über alle 24 Stunden
folge_ok = all(tab[i]['herr'] == CHALD[(CHALD.index(tab[0]['herr']) + i) % 7] for i in range(24))
pruefe('chaldäische Reihenfolge über 24 Stunden', folge_ok,
       ' '.join(x['herr'][:3] for x in tab))
# Die 1. Nachtstunde muss dem 5. Planeten nach dem Tagesherrscher gehören
i12 = CHALD.index(tab[0]['herr'])
pruefe('erste Nachtstunde passt zur Folge',
       tab[12]['herr'] == CHALD[(i12 + 12) % 7], tab[12]['herr'])
# Vor Sonnenaufgang gehört man noch zur Nacht des Vortags
vor = js(f"console.log(JSON.stringify(H.planetenStunde({tab[0]['von']-0.02},{LAT},{LON})))")
pruefe('vor Sonnenaufgang: Nachtstunde', vor['nacht'] is True and vor['nr'] > 12,
       f"Nacht={vor['nacht']}, Nr. {vor['nr']}")

# ── 3. Mond ohne Lauf ────────────────────────────────────
print('Mond ohne Lauf')
jd = float(ephem.Date('2026/10/11 10:00')) + DJD
o = js(f'console.log(JSON.stringify(H.ohneLauf({jd})))')

# Zeichenwechsel unabhängig gegen PyEphem
m = ephem.Moon()
def mond_lon(j):
    d = ephem.Date(j - DJD)
    m.compute(d)
    return math.degrees(ephem.Ecliptic(m, epoch=d).lon) % 360
zeichen_jetzt = int(mond_lon(jd) // 30)
pruefe('Zeichen des Mondes stimmt', o['zeichenJetzt'] == zeichen_jetzt,
       f"unser {o['zeichenJetzt']}, PyEphem {zeichen_jetzt}")
# Wechselzeitpunkt: PyEphem-Länge dort muss ein Vielfaches von 30 sein
l = mond_lon(o['bis'])
abstand = min(l % 30, 30 - (l % 30))
pruefe('Zeichenwechsel trifft die 30-Grad-Grenze', abstand < 0.12,
       f'{abstand*60:.1f} Bogenminuten daneben')
pruefe('Zeichenwechsel liegt in der Zukunft', o['bis'] > jd)
pruefe('Wechsel binnen zweieinhalb Tagen', o['bis'] - jd < 2.6, f"{o['bis']-jd:.2f} Tage")

# Letzter Aspekt: bei PyEphem nachrechnen, dass der Winkel dort exakt stimmt
if o['letzter']:
    la = o['letzter']
    KOERPER = {'Sonne': ephem.Sun(), 'Merkur': ephem.Mercury(), 'Venus': ephem.Venus(),
               'Mars': ephem.Mars(), 'Jupiter': ephem.Jupiter(), 'Saturn': ephem.Saturn()}
    k = KOERPER[la['planet']]
    dk = ephem.Date(la['jd'] - DJD)
    k.compute(dk)
    pl = math.degrees(ephem.Ecliptic(k, epoch=dk).lon) % 360
    diff = (mond_lon(la['jd']) - pl - la['winkel'] + 540) % 360 - 180
    pruefe(f"letzter Aspekt ({la['name']} zu {la['planet']}) ist exakt",
           abs(diff) < 0.25, f'{abs(diff)*60:.1f} Bogenminuten daneben')
    pruefe('letzter Aspekt liegt vor dem Zeichenwechsel', la['jd'] <= o['bis'])
    # Danach darf kein weiterer Aspekt mehr kommen
    # letzterAspekt scannt intern 2,2 Tage zurück — also prüfen, dass nichts
    # ECHT später als der gemeldete Aspekt liegt, nicht dass gar nichts kommt.
    spaeter = js(f"console.log(JSON.stringify(H.letzterAspekt({la['jd']+0.02},{o['bis']})))")
    pruefe('kein späterer Aspekt bis zum Wechsel',
           spaeter is None or spaeter['jd'] <= la['jd'] + 1e-4, json.dumps(spaeter))
else:
    print('  (kein Aspekt im Fenster — ungewöhnlich, aber möglich)')

# Über 40 Zeitpunkte: Zustand muss stabil und widerspruchsfrei sein
print('Mond ohne Lauf über 40 Zeitpunkte')
schlimm = 0
for i in range(40):
    j = float(ephem.Date('2026/10/11 00:00')) + DJD + i * 0.37
    r = js(f'console.log(JSON.stringify(H.ohneLauf({j})))')
    if r['bis'] <= j:
        schlimm += 1
    if r['zeichenJetzt'] != int(mond_lon(j) // 30):
        schlimm += 10
    if r['leer'] and r['seit'] and r['seit'] > j:
        schlimm += 100
    ln = mond_lon(r['bis'])
    if min(ln % 30, 30 - ln % 30) > 0.12:
        schlimm += 1000
pruefe('40 Stichproben widerspruchsfrei', schlimm == 0, f'Punkte: {schlimm}')

print(f'\n{ok} bestanden, {fehler} fehlgeschlagen')
sys.exit(1 if fehler else 0)
