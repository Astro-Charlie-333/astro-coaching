#!/usr/bin/env python3
import pathlib,re,sys
h=pathlib.Path(__file__).parent; w=h.parent/'wiki'
T=lambda n:(h/n).read_text(encoding='utf-8')
kopf='''<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Zwischen euch beiden &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<script src="niveau.js"></script>
<script src="wortwahl.js"></script>
<style>
'''
html=(kopf+T('basis.css')+"\n"+T('beziehung-stil.css')+"</style></head><body>\n"
 +T('beziehung-koerper.html')+"\n<script>\n"+T('engine.js')+"\n"
 +T('beziehung-daten.js')+"\n"+T('beziehung-app.js')+"\n</script>\n</body></html>\n")
# Die App-Ansicht: Manifest, Symbol, Zwischenspeicher. Die Zeilen dafür
# stehen in app/app-kopf.html — an einer Stelle für alle Seiten.
html = html.replace('<head>', '<head>' + (h.parent / 'app' / 'app-kopf.html').read_text(encoding='utf-8'), 1)
z=w/'beziehung.html'; z.write_text(html,encoding='utf-8')
k=T('beziehung-koerper.html'); a=T('beziehung-app.js')
ids=set(re.findall(r'\bid="([A-Za-z0-9_-]+)"',k))
ges=set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""",a))
f=[]
if ges-ids: f.append('fehlende IDs: '+', '.join(sorted(ges-ids)))
if len(re.findall(r'<div\b',k))!=len(re.findall(r'</div>',k)): f.append('div-Unwucht')
# Kein Satz darf denselben Namen zweimal tragen — sonst entsteht
# „Mandy kann nicht einschätzen, woran Mandy ist". Ausnahme: der
# bewusste Kreuzsatz bei Mars|Saturn.
AUSNAHME = {'{B} erlebt {A} als Verhinderung, {A} erlebt {B} als rücksichtslos.'}
daten = T('beziehung-daten.js')
kt = daten[daten.find('var KONTAKT={'):]
kt = kt[:kt.find('\n};')]
for m in re.finditer(r"(tut|an|hilft):'([^']*)'", kt):
    for satz in re.split(r'(?<=[.!?]) ', m.group(2)):
        if satz in AUSNAHME:
            continue
        for ph in ('{A}', '{B}'):
            if len(re.findall(re.escape(ph) + r'(?!s)', satz)) > 1:
                f.append('Name doppelt im Satz: ' + satz[:70])
# Jedes Paar braucht die drei Schritte, und die Richtung muss stimmen
for m in re.finditer(r"^ '(\w+)\|(\w+)':\{([^\n]*)", kt, re.M):
    p1, p2, rest = m.group(1), m.group(2), m.group(3)
    sym = (p1 == p2)
    hat = 'akteur:' in rest
    if sym and hat:
        f.append(f'{p1}|{p2}: symmetrisch, braucht keinen akteur')
    if not sym and not hat:
        f.append(f'{p1}|{p2}: ohne akteur bleibt die Richtung unbestimmt')
    if hat:
        ak = re.search(r"akteur:'(\w+)'", rest).group(1)
        if ak not in (p1, p2):
            f.append(f'{p1}|{p2}: akteur {ak} gehört nicht zum Paar')

print(f'beziehung.html  {z.stat().st_size:,} Bytes')
for x in f: print('  FEHLER: '+x)
sys.exit(1 if f else 0)
