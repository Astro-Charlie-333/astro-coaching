#!/usr/bin/env python3
"""Vergleicht die Mondrechnung der Seite gegen PyEphem."""
import json, subprocess, pathlib, sys
import ephem

hier = pathlib.Path(__file__).parent
fehler, ok = 0, 0


def pruefe(name, bedingung, info=''):
    global fehler, ok
    if bedingung:
        ok += 1
    else:
        fehler += 1
        print(f'  FEHLER  {name}' + (f'  →  {info}' if info else ''))


def js(*args):
    r = subprocess.run(['node', str(hier / 'pruefen.js'), *map(str, args)],
                       capture_output=True, text=True)
    if r.returncode:
        print(r.stderr)
        sys.exit(1)
    return json.loads(r.stdout)


# ── 1. Neu- und Vollmonde gegen PyEphem ─────────────────
print('Lunationen gegen PyEphem')
VON_D = ephem.Date('2026/01/01')
BIS_D = ephem.Date('2029/01/01')
von_jd, bis_jd = VON_D + 2415020.0, BIS_D + 2415020.0   # Dublin JD → JD

unsere = js('lunationen', von_jd, bis_jd)

# Referenz aufbauen
ref = []
d = VON_D
while d < BIS_D:
    n = ephem.next_new_moon(d)
    if n >= BIS_D:
        break
    ref.append(('neu', float(n) + 2415020.0))
    d = n + 0.5
d = VON_D
while d < BIS_D:
    n = ephem.next_full_moon(d)
    if n >= BIS_D:
        break
    ref.append(('voll', float(n) + 2415020.0))
    d = n + 0.5
ref.sort(key=lambda x: x[1])

pruefe('gleiche Anzahl Ereignisse', len(unsere) == len(ref),
       f'unsere {len(unsere)}, Referenz {len(ref)}')

if len(unsere) == len(ref):
    schlimm, summe, maxab, maxbei = 0, 0.0, 0.0, None
    for u, r in zip(unsere, ref):
        if u['art'] != r[0]:
            schlimm += 1
            continue
        ab = abs(u['jd'] - r[1]) * 24 * 60   # Minuten
        summe += ab
        if ab > maxab:
            maxab, maxbei = ab, (u['art'], ephem.Date(r[1] - 2415020.0))
    pruefe('Art stimmt überall', schlimm == 0, f'{schlimm} vertauscht')
    schnitt = summe / len(ref)
    print(f'  {len(ref)} Lunationen 2026–2028 · '
          f'mittlere Abweichung {schnitt:.1f} min · größte {maxab:.1f} min ({maxbei[0]} {maxbei[1]})')
    pruefe('mittlere Abweichung unter 10 Minuten', schnitt < 10, f'{schnitt:.1f} min')
    pruefe('größte Abweichung unter 45 Minuten', maxab < 45, f'{maxab:.1f} min')

# ── 2. Mondphase stimmt zur Referenz ────────────────────
print('Beleuchtungsgrad')
for datum in ['2026/10/11 12:00', '2026/03/03 12:00', '2027/07/18 12:00']:
    d = ephem.Date(datum)
    jd = float(d) + 2415020.0
    m = ephem.Moon(d)
    unser = js('lunationen', jd - 0.001, jd)   # nur um das Skript zu laden
    # Phase direkt über ein kleines Node-Schnipsel
    r = subprocess.run(['node', '-e', f'''
const fs=require('fs');const p=require('path');
const ENG=fs.readFileSync('{hier}/engine.js','utf8');
const APP=fs.readFileSync('{hier}/app.js','utf8');
function sch(q,n){{const i=q.indexOf('function '+n+'(');let t=0;
for(let k=q.indexOf('{{',i);k<q.length;k++){{if(q[k]==='{{')t++;else if(q[k]==='}}'){{t--;if(!t)return q.slice(i,k+1);}}}}}}
global.o={{}};
(0,eval)(ENG+sch(APP,'nrm')+sch(APP,'phase')+sch(APP,'beleuchtung')+
 'o.b=beleuchtung(phase({jd}));o.p=phase({jd});');
console.log(JSON.stringify(global.o));'''], capture_output=True, text=True)
    if r.returncode:
        print(r.stderr); sys.exit(1)
    o = json.loads(r.stdout)
    diff = abs(o['b'] * 100 - m.moon_phase * 100)
    pruefe(f'Beleuchtung {datum}', diff < 2.0,
           f"unser {o['b']*100:.1f} %, PyEphem {m.moon_phase*100:.1f} %")

# ── 3. Phaseneinteilung (Rudhyar: jede Phase beginnt bei ihrem Namensgeber) ─────────────────────────────────
print('Phaseneinteilung')
SOLL = {0: 0, 20: 0, 45: 1, 70: 1, 90: 2, 120: 2, 135: 3, 160: 3, 180: 4,
        200: 4, 225: 5, 250: 5, 270: 6, 300: 6, 315: 7, 340: 7, 359: 7}
for e in js('phasen'):
    pruefe(f"{e['a']}° → Phase {SOLL[e['a']]}", e['i'] == SOLL[e['a']], f"bekam {e['i']}")

print(f'\n{ok} bestanden, {fehler} fehlgeschlagen')
sys.exit(1 if fehler else 0)
