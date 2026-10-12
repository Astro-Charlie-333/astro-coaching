#!/usr/bin/env python3
import pathlib,re,sys
h=pathlib.Path(__file__).parent; w=h.parent/'wiki'
T=lambda n:(h/n).read_text(encoding='utf-8')
kopf='''<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Reading nach Wissensstand &middot; Astro-Charlie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="profil.js"></script>
<script src="niveau.js"></script>
<script src="wortwahl.js"></script>
<script src="aspekte-daten.js"></script>
<script src="schatten.js"></script>
<style>
'''
html=(kopf+T('basis.css')+"\n"+T('reading-stil.css')+"</style></head><body data-niv-keine>\n"
 +T('reading-koerper.html')+"\n<script>\n"+T('engine.js')+"\n"
 +T('reading-daten.js')+"\n"+T('reading-app.js')+"\n</script>\n</body></html>\n")
z=w/'reading.html'; z.write_text(html,encoding='utf-8')
k=T('reading-koerper.html'); a=T('reading-app.js')
ids=set(re.findall(r'\bid="([A-Za-z0-9_-]+)"',k))
ges=set(re.findall(r"""\bel\(['"]([A-Za-z0-9_-]+)['"]\)""",a))
f=[]
if ges-ids: f.append('fehlende IDs: '+', '.join(sorted(ges-ids)))
if len(re.findall(r'<div\b',k))!=len(re.findall(r'</div>',k)): f.append('div-Unwucht')
print(f'reading.html  {z.stat().st_size:,} Bytes')
for x in f: print('  FEHLER: '+x)
sys.exit(1 if f else 0)
