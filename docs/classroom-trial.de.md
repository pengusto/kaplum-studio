# Kaplum Studio: kurzer Unterrichtstest

**Dauer:** ungefähr 15–20 Minuten. **Ziel:** beobachten, ob Kinder den Zusammenhang zwischen Code und Zeichnung ohne Erklärung finden. Das ist ein Test des Tools, keine benotete Prüfung der Kinder.

Öffne https://pengusto.github.io/kaplum-studio/ und stelle Deutsch ein. Für den ersten Durchlauf nutze Desktop oder Laptop. Pro Aufgabe zuerst nur den Auftrag vorlesen. Gib erst Hilfe, wenn das Kind sie braucht, und notiere die Stelle. Einen zweiten Durchlauf auf Handy oder Tablet getrennt dokumentieren; dort werden Code und Ergebnis über Tabs gezeigt.

## Vorbereiten

- Bestehende eigene Entwürfe zuerst als ZIP sichern. Für den Test ein frisches Browserprofil verwenden, damit alte Änderungen nicht das Beispiel ersetzen.
- Code und Zeichnung müssen gut sichtbar sein. Falls nötig, die Trennlinie oder den unteren Höhengriff ziehen.
- Nach jeder Aufgabe kurz fragen: „Was hast du geändert, und warum hat sich die Zeichnung verändert?“

## 1. Einen Dino verändern — etwa 3 Minuten

[Figuren öffnen](https://pengusto.github.io/kaplum-studio/#figures).

**Auftrag für das Kind:** „Finde den Dino. Mach ihn größer. Verändere seine Beine. Stell danach das Beispiel wieder zurück.“

**Darauf achtest du:** Findet es Größen- und Beinregler? Erkennt es die Änderung in der Zeichnung und den zugehörigen Wert im Code? Findet es Zurücksetzen?

**Erwartung:** Größe und Beinstellung ändern sich; Zurücksetzen stellt das Originalbeispiel wieder her. Falls es nicht klappt, Regler, Gerätebreite und beobachtetes Verhalten notieren.

## 2. Code verändert eine Zeichnung — etwa 3 Minuten

[Ein bunter Kreis öffnen](https://pengusto.github.io/kaplum-studio/#animation/circle).

**Auftrag:** „Such im Code den Radius. Ändere die 60 auf 90. Schau dir an, was sich verändert.“

**Darauf achtest du:** Findet es `const radius = 60;`? Kann es die Zahl bearbeiten? Weiß es, wie es die Zeichnung nach einer Änderung startet? Kann es erklären, warum der Kreis größer wird?

**Erwartung:** Der größere Radius ergibt einen größeren Kreis. Das Beispiel ist eine fertige Zeichnung, obwohl es in der Sammlung Animationen steht. Falls ein eigener Entwurf sichtbar ist, zuerst zum Original zurücksetzen.

## 3. Eine Schleife verstehen — etwa 5 Minuten

[Quadrat öffnen](https://pengusto.github.io/kaplum-studio/#course/square).

**Auftrag:** „Untersuche den Code. Geh Schritt für Schritt weiter. Sag vor jedem Schritt, was die Turtle als Nächstes macht. Warum hört die Schleife auf?“

**Darauf achtest du:** Findet es „Code untersuchen“ und „Nächster Schritt“? Versteht es, dass die markierte nächste Anweisung noch nicht ausgeführt wurde? Verbindet es `forward` und `right` mit Bewegung und Drehung? Versteht es die grüne und die abschließende rote Prüfung?

**Erwartung:** Vier Seiten bilden ein Quadrat. `i < 4` ist zunächst wahr und am Ende falsch. Rot bedeutet hier normales Schleifenende, keinen Programmfehler. Wenn das Kind das anders deutet, den genauen Wortlaut notieren.

## 4. Bewegung ohne Linie — etwa 3 Minuten

[Reise mit angehobenem Stift öffnen](https://pengusto.github.io/kaplum-studio/#course/pen-journey).

**Auftrag:** „Spiel das Beispiel ab. Warum gibt es zwischen den Linien eine Lücke? Ersetze `penup()` durch `pendown()` und probiere es noch einmal.“

**Darauf achtest du:** Erkennt es, dass Bewegung und Zeichnen zwei verschiedene Dinge sind? Findet es den Befehl und versteht es die Wirkung der Änderung?

**Erwartung:** Im Original gibt es zwei korallfarbene Linien mit einer Lücke. Mit abgesenktem Stift entsteht auch im Zwischenstück eine Linie. Für dieses Beispiel genügt normales Abspielen; Zeichnungsschritte und Code-Debugger sind unterschiedliche Ansichten.

## 5. Ein Projekt mitnehmen — etwa 3 Minuten

Bleibe beim geänderten Beispiel aus Aufgabe 4.

**Auftrag:** „Lade dein Projekt als ZIP herunter. Entpacke es. Öffne `index.html` und prüfe, ob deine Zeichnung da ist.“

**Darauf achtest du:** Unterscheidet es den einzelnen `.js`-Download vom ganzen Projekt? Sind die Download-Hinweise verständlich? Kann es das Ergebnis außerhalb des Studios wieder öffnen?

**Erwartung:** Das entpackte Projekt zeigt die eigene Änderung ohne zusätzliche Installation. Für einen echten Offline-Test nach dem Download die Netzwerkverbindung trennen. Bestehende Browsermeldungen oder eingeschränkte Schulgeräte notieren, nicht als Lernfehler zählen.

## Auswertung für dich

Pro Aufgabe eine Zeile, ohne Namen oder andere persönliche Angaben:

| Aufgabe | Ergebnis | Benötigte Hilfe / unklare Stelle | Gerät und Browser |
| --- | --- | --- | --- |
| Dino | selbstständig / mit Hilfe / nicht geschafft | | |
| Kreis | selbstständig / mit Hilfe / nicht geschafft | | |
| Schleife | selbstständig / mit Hilfe / nicht geschafft | | |
| Stift | selbstständig / mit Hilfe / nicht geschafft | | |
| Export | selbstständig / mit Hilfe / nicht geschafft | | |

Zum Schluss: „Was war am einfachsten? Wo wusstest du nicht weiter?“

Wenn mehrere Kinder an derselben Stelle Hilfe brauchen, daraus eine konkrete UI-Aufgabe machen: Seite, sichtbares Element, erwartete Handlung und tatsächliche Beobachtung. Noch keine Durchführung oder erfolgreiche Verständlichkeit behaupten: Dieses Blatt ist ein vorbereiteter Test.
