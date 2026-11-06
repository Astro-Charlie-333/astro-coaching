#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Erzeugt mond-termine.js: alle Neu- und Vollmonde 2026 bis 2030.

Läuft NICHT beim Bauen. Es braucht pyswisseph und die Ephemeridendatei
sepl_18.se1/semo_18.se1, und die gibt es auf dem Prüfrechner nicht.
Das Ergebnis ist eine feste Datei, die mit eingecheckt wird.

Warum überhaupt neu: Vorher standen zwei Listen auf zwei Seiten, und
sie widersprachen sich. lunationen.html hatte die Mondfinsternis am
28.08.2026 auf 4°54' Fische, mondzyklen.html auf 5°48'. Nachgerechnet
stimmt 4°54'. Ab jetzt gibt es eine Liste, aus einer Rechnung.

Aufruf:  python3 gen-termine.py /pfad/zu/ephe
"""
import sys, json, datetime, pathlib
import swisseph as swe

swe.set_ephe_path(sys.argv[1] if len(sys.argv) > 1 else '.')
VON, BIS = (2026, 1, 1), (2031, 1, 1)


def diff(a, b):
    return (a - b + 540) % 360 - 180


def elong(j):
    return diff(swe.calc_ut(j, swe.MOON)[0][0], swe.calc_ut(j, swe.SUN)[0][0])


def exakt(j0, ziel):
    f = lambda j: diff(elong(j), ziel)
    lo, hi = j0 - 0.6, j0 + 0.6
    for _ in range(60):
        m = (lo + hi) / 2
        if f(lo) * f(m) <= 0:
            hi = m
        else:
            lo = m
    return (lo + hi) / 2


def berlin(j):
    y, m, d, h = swe.revjul(j)
    u = datetime.datetime(y, m, d, tzinfo=datetime.timezone.utc) + datetime.timedelta(hours=h)
    # Mitteleuropäische Zeit mit Sommerzeit: letzter Sonntag im März
    # 01:00 UTC bis letzter Sonntag im Oktober 01:00 UTC.
    def letzter_sonntag(jahr, monat):
        t = datetime.datetime(jahr, monat + 1, 1, 1, tzinfo=datetime.timezone.utc) - datetime.timedelta(days=1)
        return t - datetime.timedelta(days=(t.weekday() + 1) % 7)
    sommer = letzter_sonntag(u.year, 3) <= u < letzter_sonntag(u.year, 10)
    return u + datetime.timedelta(hours=2 if sommer else 1)


# Finsternisse vorab einsammeln
fins = []
j = swe.julday(*VON, 0)
while j < swe.julday(*BIS, 0):
    r, t = swe.sol_eclipse_when_glob(j, swe.FLG_SWIEPH)
    if t[0] >= swe.julday(*BIS, 0):
        break
    art = ('total' if r & swe.ECL_TOTAL else 'ringförmig' if r & swe.ECL_ANNULAR
           else 'hybrid' if r & swe.ECL_ANNULAR_TOTAL else 'partiell')
    fins.append((t[0], 'NM', art))
    j = t[0] + 20
j = swe.julday(*VON, 0)
while j < swe.julday(*BIS, 0):
    r, t = swe.lun_eclipse_when(j, swe.FLG_SWIEPH)
    if t[0] >= swe.julday(*BIS, 0):
        break
    art = ('total' if r & swe.ECL_TOTAL else 'partiell' if r & swe.ECL_PARTIAL
           else 'Halbschatten')
    fins.append((t[0], 'VM', art))
    j = t[0] + 20

termine = []
j = swe.julday(*VON, 0)
ende = swe.julday(*BIS, 0)
prev = elong(j)
while j < ende:
    n = j + 0.25
    e = elong(n)
    for ziel, typ in ((0, 'NM'), (180, 'VM')):
        a, b = diff(prev, ziel), diff(e, ziel)
        if a < 0 <= b and abs(b - a) < 30:
            x = exakt(n, ziel)
            g = swe.calc_ut(x, swe.MOON)[0][0] if typ == 'NM' else swe.calc_ut(x, swe.MOON)[0][0]
            # Der Grad einer Lunation ist der Grad des Mondes; beim
            # Neumond steht die Sonne auf demselben Grad.
            lok = berlin(x)
            f = [k for k in fins if k[1] == typ and abs(k[0] - x) < 1]
            termine.append({'d': lok.strftime('%Y-%m-%d'), 'z': lok.strftime('%H:%M'),
                            't': typ, 'g': round(g % 360, 3),
                            'e': f[0][2] if f else ''})
    prev, j = e, n

kopf = ('/* Erzeugt von gen-termine.py mit der Swiss Ephemeris am '
        + datetime.date.today().isoformat() + '. Nicht von Hand ändern.\n'
        '   Datum und Uhrzeit in Berliner Ortszeit, g = Grad des Mondes\n'
        '   in der Ekliptik (0 = 0° Widder), e = Art der Finsternis. */\n')
ziel = pathlib.Path(__file__).parent / 'mond-termine.js'
ziel.write_text(kopf + 'var MT_ERSTELLT = "' + datetime.date.today().isoformat() + '";\n'
                + 'var MT_TERMINE = ' + json.dumps(termine, ensure_ascii=False)
                .replace('}, {', '},\n {') + ';\n', encoding='utf-8')
print(len(termine), 'Termine,', sum(1 for t in termine if t['e']), 'Finsternisse')
for t in termine:
    if t['e']:
        print(' ', t)
