/* Astro-Charlie · Aspekt-Deutungen
   Für alle 45 Planetenpaare: was aufeinandertrifft, wie es fließt, wie es reibt, und die Frage dazu.
   Schlüssel immer alphabetisch nach der festen Reihenfolge unten. */
(function(){
var R=['Sonne','Mond','Merkur','Venus','Mars','Jupiter','Saturn','Uranus','Neptun','Pluto'];

var P={
'Sonne|Mond':['Wer du sein willst trifft auf das, was du brauchst.',
 'Wollen und Brauchen ziehen in dieselbe Richtung. Du weißt meistens, was dir guttut, und tust es auch.',
 'Dein Anspruch an dich und dein Bedürfnis nach Sicherheit widersprechen sich. Oft übergehst du das Bedürfnis — und zahlst später.',
 'Was wolltest du diese Woche, und was hättest du gebraucht?'],
'Sonne|Merkur':['Wer du bist trifft auf die Art, wie du denkst.',
 'Denken und Wesen sind eins. Du sagst, was du meinst, und meinst, was du sagst.',
 '', 'Sprichst du gerade aus dir heraus oder über dich hinweg?'],
'Sonne|Venus':['Wer du bist trifft auf das, was dir gefällt.',
 'Dein Geschmack und dein Wesen decken sich. Du wirkst stimmig, oft ohne es zu wollen.',
 '', 'Wo hörst du auf, dir selbst zu gefallen?'],
'Sonne|Mars':['Wer du bist trifft auf deinen Antrieb.',
 'Wille und Tat greifen ineinander. Du setzt um, was du dir vornimmst, ohne dich zu überwinden.',
 'Dein Wollen und dein Handeln geraten sich in die Quere. Du machst dich müde am eigenen Widerstand oder überziehst.',
 'Wofür verbrauchst du Kraft, die du eigentlich woanders brauchst?'],
'Sonne|Jupiter':['Wer du bist trifft auf deinen Wunsch zu wachsen.',
 'Zuversicht ist bei dir eingebaut. Türen gehen leichter auf, und du gehst hindurch.',
 'Du nimmst dir mehr vor, als du halten kannst — und hältst das für Optimismus.',
 'Was hast du dir vorgenommen, obwohl du wusstest, dass es zu viel ist?'],
'Sonne|Saturn':['Wer du bist trifft auf deine Vorsicht.',
 'Du hast ein natürliches Maß. Was du aufbaust, hält, weil du es ernst nimmst.',
 'Du bremst dich, bevor jemand anderes es tut. Selbstvertrauen ist Arbeit, nicht Ausgangszustand.',
 'Welchen Satz über dich hast du geglaubt, bevor du ihn geprüft hast?'],
'Sonne|Uranus':['Wer du bist trifft auf dein Bedürfnis, frei zu sein.',
 'Eigenwilligkeit ist bei dir kein Widerstand, sondern Stil. Du machst es anders und kommst damit durch.',
 'Sobald etwas verbindlich wird, willst du raus. Auch aus Dingen, die du eigentlich willst.',
 'Wovon bist du zuletzt weggegangen, obwohl es gut war?'],
'Sonne|Neptun':['Wer du bist trifft auf das, wonach du dich sehnst.',
 'Du hast Zugang zu etwas Größerem und kannst es anderen zugänglich machen.',
 'Dein Selbstbild ist unscharf. Du verlierst dich in Rollen oder in Menschen und merkst es spät.',
 'Wo hörst du auf und fängt jemand anderes an?'],
'Sonne|Pluto':['Wer du bist trifft auf deine Tiefe.',
 'Du hast Substanz und Wirkung. Menschen nehmen dich ernst, ohne dass du laut wirst.',
 'Es geht bei dir schnell ums Ganze. Machtfragen, Kontrolle, alles oder nichts.',
 'Wo hältst du fest, obwohl du längst losgelassen hast?'],

'Mond|Merkur':['Was du fühlst trifft auf das, was du sagst.',
 'Du kannst benennen, was in dir vorgeht. Das ist seltener, als man denkt.',
 'Gefühl und Sprache kommen nicht zusammen. Entweder redest du dich weg oder du verstummst.',
 'Was fühlst du gerade, wofür du noch kein Wort hast?'],
'Mond|Venus':['Was du brauchst trifft auf das, was du liebst.',
 'Zuneigung und Bedürfnis passen zusammen. Nähe fühlt sich für dich nährend an, nicht anstrengend.',
 'Du gibst, was du selbst bräuchtest, und wunderst dich, dass es nicht zurückkommt.',
 'Wann hast du zuletzt bekommen, was du gegeben hast?'],
'Mond|Mars':['Was du brauchst trifft auf deinen Antrieb.',
 'Du handelst aus dem Gefühl heraus und liegst damit meistens richtig.',
 'Bedürfnis und Wut liegen dicht beieinander. Du wirst scharf, wenn du eigentlich verletzt bist.',
 'Wann war deine Wut zuletzt eigentlich Traurigkeit?'],
'Mond|Jupiter':['Was du brauchst trifft auf dein Wachstum.',
 'Du bist emotional großzügig und kommst nach Rückschlägen schnell wieder hoch.',
 'Du überschätzt, wie viel du tragen kannst — emotional wie praktisch.',
 'Wie viel hast du dir zugemutet, weil du dachtest, du schaffst das schon?'],
'Mond|Saturn':['Was du brauchst trifft auf deine Zurückhaltung.',
 'Du hältst viel aus und trägst zuverlässig. Andere verlassen sich zu Recht auf dich.',
 'Bedürftig zu sein empfindest du als Schwäche. Du sorgst lieber, als versorgt zu werden.',
 'Wen könntest du fragen, ohne dass es dich etwas kostet?'],
'Mond|Uranus':['Was du brauchst trifft auf dein Freiheitsbedürfnis.',
 'Du brauchst Nähe und Abstand und kannst zwischen beidem wechseln, ohne zu kippen.',
 'Sobald es eng wird, gehst du auf Distanz — auch bei Menschen, die dir wichtig sind.',
 'Was passiert in dir, kurz bevor du dich zurückziehst?'],
'Mond|Neptun':['Was du brauchst trifft auf deine Durchlässigkeit.',
 'Du spürst Stimmungen, bevor sie ausgesprochen sind. Das ist eine echte Gabe.',
 'Du nimmst auf, was gar nicht deins ist, und hältst es für dein eigenes Gefühl.',
 'Welches Gefühl von heute gehört dir wirklich?'],
'Mond|Pluto':['Was du brauchst trifft auf deine Tiefe.',
 'Deine Gefühle haben Gewicht. Du gehst mit Menschen in Bereiche, die andere meiden.',
 'Nähe ist bei dir existenziell. Verlust, Kontrolle und Eifersucht liegen dicht darunter.',
 'Wovor hast du Angst, wenn jemand dir wichtig wird?'],

'Merkur|Venus':['Wie du denkst trifft auf das, was dir gefällt.',
 'Du formulierst schön und angenehm. Menschen hören dir gern zu.',
 '', 'Sagst du gerade das Wahre oder das Angenehme?'],
'Merkur|Mars':['Wie du denkst trifft auf deinen Antrieb.',
 'Du denkst schnell und entscheidest zügig. Diskutieren macht dir Freude.',
 'Deine Worte werden scharf, bevor du es merkst. Streiten kannst du besser als klären.',
 'Wolltest du recht haben oder verstanden werden?'],
'Merkur|Jupiter':['Wie du denkst trifft auf deinen Horizont.',
 'Du erfasst große Zusammenhänge und kannst sie erklären. Gute Lehrerinnen-Kombination.',
 'Du übertreibst beim Erzählen und übersiehst Details, weil das Große spannender ist.',
 'Wo hast du zuletzt etwas behauptet, das du nicht geprüft hattest?'],
'Merkur|Saturn':['Wie du denkst trifft auf deine Vorsicht.',
 'Du denkst gründlich und sagst nichts, was nicht trägt. Auf deine Aussagen ist Verlass.',
 'Du zweifelst an deinem Denken. Sprechen war früh mit Kritik verbunden, das sitzt tief.',
 'Was hast du gedacht und nicht gesagt, weil es vielleicht nicht gut genug war?'],
'Merkur|Uranus':['Wie du denkst trifft auf deinen Eigensinn.',
 'Du denkst um Ecken und kommst auf Verknüpfungen, die anderen nicht einfallen.',
 'Dein Denken springt. Zuhören fällt schwer, weil du schon drei Schritte weiter bist.',
 'Wem hast du zuletzt wirklich zu Ende zugehört?'],
'Merkur|Neptun':['Wie du denkst trifft auf deine Vorstellungskraft.',
 'Du denkst in Bildern und kannst Unaussprechliches greifbar machen.',
 'Zwischen Ahnung und Tatsache unterscheidest du schlecht. Du hältst Gefühltes für Gewusstes.',
 'Woher weißt du das — oder fühlst du es nur?'],
'Merkur|Pluto':['Wie du denkst trifft auf deine Tiefe.',
 'Du durchschaust Dinge. Was andere überhören, hörst du.',
 'Dein Denken wird zwanghaft. Du gräbst weiter, wenn längst alles gesagt ist.',
 'Welchen Gedanken drehst du seit Tagen im Kreis?'],

'Venus|Mars':['Was du liebst trifft auf das, was du begehrst.',
 'Zuneigung und Begehren gehören bei dir zusammen. Das ist weniger selbstverständlich, als es klingt.',
 'Was du willst und was dir guttut, sind verschiedene Menschen. Anziehung und Streit hängen zusammen.',
 'Zieht dich das an — oder nur die Spannung darin?'],
'Venus|Jupiter':['Was du liebst trifft auf dein Wachstum.',
 'Du bist großzügig und leicht zu mögen. Freude fällt dir zu.',
 'Du willst mehr, als gut für dich ist — in Beziehung, im Genuss, beim Geld.',
 'Wo ist mehr gerade zu viel geworden?'],
'Venus|Saturn':['Was du liebst trifft auf deine Zurückhaltung.',
 'Deine Zuneigung ist verlässlich. Was du gibst, gilt.',
 'Du glaubst, Liebe verdienen zu müssen. Zuneigung ohne Gegenleistung macht dich misstrauisch.',
 'Was müsstest du leisten, damit du es dir erlaubst?'],
'Venus|Uranus':['Was du liebst trifft auf deine Freiheit.',
 'Du liebst unkonventionell und lässt anderen Raum, ohne dich zurückzuziehen.',
 'Du verliebst dich schnell und langweilst dich schnell. Nähe fühlt sich wie Enge an.',
 'Was genau wird eng, wenn es eng wird?'],
'Venus|Neptun':['Was du liebst trifft auf deine Sehnsucht.',
 'Du liebst hingebungsvoll und siehst das Beste im anderen. Manchmal zu Recht.',
 'Du verliebst dich in ein Bild und merkst es erst, wenn der Mensch dahinter auftaucht.',
 'Wen siehst du gerade — die Person oder deine Vorstellung von ihr?'],
'Venus|Pluto':['Was du liebst trifft auf deine Tiefe.',
 'Deine Zuneigung geht in die Tiefe. Oberflächliches interessiert dich nicht.',
 'Liebe wird existenziell. Besitz, Eifersucht und Verlustangst gehören dazu.',
 'Was fürchtest du zu verlieren, wenn du loslässt?'],

'Mars|Jupiter':['Dein Antrieb trifft auf dein Wachstum.',
 'Du gehst Dinge mit Schwung an und bringst sie durch. Gute Gründerinnen-Kombination.',
 'Du übernimmst dich. Der Anfang ist groß, die Kraft reicht nicht bis zum Ende.',
 'Wie viel davon schaffst du wirklich?'],
'Mars|Saturn':['Dein Antrieb trifft auf deine Struktur.',
 'Du arbeitest ausdauernd und diszipliniert. Was du anfängst, bringst du zu Ende.',
 'Du trittst gleichzeitig auf Gas und Bremse. Das ermüdet mehr als jede Anstrengung.',
 'Was willst du tun und erlaubst es dir nicht?'],
'Mars|Uranus':['Dein Antrieb trifft auf deinen Eigensinn.',
 'Du handelst schnell und unabhängig. In Krisen bist du sofort da.',
 'Du reagierst impulsiv und brichst ab, bevor du nachgedacht hast.',
 'Was hast du zuletzt beendet, ohne eine Nacht darüber zu schlafen?'],
'Mars|Neptun':['Dein Antrieb trifft auf deine Sehnsucht.',
 'Du handelst aus Intuition und triffst damit oft genau.',
 'Deine Kraft versickert. Du weißt nicht, wofür du kämpfst, und wirst müde davon.',
 'Wofür setzt du dich gerade ein — und willst du das überhaupt?'],
'Mars|Pluto':['Dein Antrieb trifft auf deine Tiefe.',
 'Du hast enorme Ausdauer und Belastbarkeit. Du gibst nicht auf.',
 'Dein Wille wird kompromisslos. Machtkämpfe, auch wo keine nötig wären.',
 'Muss das gewonnen werden, oder willst du nur nicht verlieren?'],

'Jupiter|Saturn':['Dein Wachstum trifft auf deine Struktur.',
 'Du kannst groß denken und trotzdem realistisch planen. Selten und wertvoll.',
 'Zwischen Aufbruch und Bremse hin und her. Entweder zu viel oder gar nichts.',
 'Was wäre die kleine Version davon?'],
'Jupiter|Uranus':['Dein Wachstum trifft auf deine Freiheit.',
 'Chancen kommen plötzlich, und du erkennst sie. Gutes Gespür für Zeitpunkte.',
 'Du springst auf alles Neue auf und lässt Angefangenes liegen.',
 'Was hast du liegen lassen, als das Nächste kam?'],
'Jupiter|Neptun':['Dein Wachstum trifft auf deine Sehnsucht.',
 'Du hast Vertrauen ins Leben und kannst andere daran teilhaben lassen.',
 'Du glaubst an Dinge, die nicht tragen, und merkst es zu spät.',
 'Worauf baust du gerade, ohne es geprüft zu haben?'],
'Jupiter|Pluto':['Dein Wachstum trifft auf deine Tiefe.',
 'Du kannst Großes bewegen und hast einen langen Atem.',
 'Alles oder nichts. Maßlosigkeit da, wo Maß nötig wäre.',
 'Was wäre genug?'],

'Saturn|Uranus':['Deine Struktur trifft auf deine Freiheit.',
 'Du kannst Neues in eine Form bringen, die hält. Genau daran scheitern die meisten.',
 'Sicherheit und Freiheit schließen sich für dich aus. Du hast entweder Halt oder Luft, nie beides.',
 'Welche Struktur würde dir Freiheit geben statt sie zu nehmen?'],
'Saturn|Neptun':['Deine Struktur trifft auf deine Sehnsucht.',
 'Du kannst Ideale konkret machen. Träume, die funktionieren.',
 'Zwischen Härte und Auflösung. Entweder alles kontrollieren oder alles laufen lassen.',
 'Was davon ist Angst und was ist Realismus?'],
'Saturn|Pluto':['Deine Struktur trifft auf deine Tiefe.',
 'Du hältst aus, was andere nicht aushalten, und baust danach neu.',
 'Schwere. Dinge dauern länger, kosten mehr und gehen tiefer als bei anderen.',
 'Was trägst du, das gar nicht mehr deins ist?'],

'Uranus|Neptun':['Deine Freiheit trifft auf deine Sehnsucht.',
 'Du denkst über das Bestehende hinaus und findest Bilder dafür.',
 'Unruhe ohne Richtung. Du willst weg, weißt aber nicht wohin.',
 'Wohin willst du eigentlich, wenn du weg willst?'],
'Uranus|Pluto':['Deine Freiheit trifft auf deine Tiefe.',
 'Du kannst radikal umbauen, wenn es nötig ist, ohne dabei zu zerbrechen.',
 'Alles muss weg. Umbrüche fallen bei dir größer aus als nötig.',
 'Muss wirklich alles gehen, oder reicht ein Teil?'],
'Neptun|Pluto':['Deine Sehnsucht trifft auf deine Tiefe.',
 'Zugang zu kollektiven Themen. Eine Generationenverbindung, persönlich nur mit engem Kontakt zu deinen Achsen.',
 'Diffuse Schwere, schwer zu greifen und schwer zu benennen.',
 'Ist das deins oder das der Zeit, in der du lebst?']
};

var ART={
 'Konjunktion':['verschmilzt','Die beiden Kräfte sind nicht zu trennen. Was die eine tut, tut die andere mit. Das ist die stärkste Verbindung überhaupt — und die am schwersten zu erkennen, weil man sie für sich selbst hält.','beide'],
 'Sextil':['bietet an','Eine Möglichkeit, kein Automatismus. Es funktioniert, wenn du es nutzt, und schläft ein, wenn nicht. Sextile sind die Aspekte, die man übersieht.','fliesst'],
 'Quadrat':['reibt','Die beiden wollen Verschiedenes und können nicht ausweichen. Das erzeugt Druck — und genau daraus entsteht Kompetenz. Quadrate machen Menschen gut in dem, was ihnen schwerfällt.','reibt'],
 'Trigon':['fließt','Es läuft von allein. Das ist angenehm und wird deshalb selten bewusst genutzt. Trigone sind Begabungen, die man für selbstverständlich hält.','fliesst'],
 'Opposition':['zieht gegeneinander','Zwei Pole, die sich gegenüberstehen. Man erlebt sie oft über andere Menschen: Was man selbst nicht lebt, taucht im Gegenüber auf. Auflösen kann man das nicht — abwechseln schon.','reibt']
};

function key(a,b){
  var ia=R.indexOf(a), ib=R.indexOf(b);
  if(ia<0||ib<0) return null;
  return (ia<ib)? a+'|'+b : b+'|'+a;
}
window.AC_ASP={
  reihe:R,
  arten:ART,
  /* Gibt es diesen Aspekt zwischen den beiden überhaupt? */
  moeglich:function(a,b,art){
    var s=[a,b].sort().join('|');
    if(s==='Merkur|Sonne') return art==='Konjunktion';
    if(s==='Sonne|Venus') return art==='Konjunktion';
    if(s==='Merkur|Venus') return art==='Konjunktion'||art==='Sextil';
    return true;
  },
  deutung:function(a,b,art){
    var k=key(a,b); if(!k||!P[k]) return null;
    var d=P[k], A=ART[art];
    if(!A) return null;
    var reibt=(A[2]==='reibt');
    var kern=d[1], gegen=d[2];
    var text;
    if(A[2]==='beide'){
      text = gegen ? (kern+' '+gegen) : kern;
    } else if(reibt){
      text = gegen || kern;
    } else {
      text = kern;
    }
    return {
      thema:d[0],
      art:A[0],
      artText:A[1],
      text:text,
      fliesst:d[1],
      reibt:d[2],
      frage:d[3],
      nurKonjunktion:(!d[2])
    };
  }
};
})();
