![Kaplum Studio — ein Pinguin und eine gekrönte Turtle zeichnen leuchtende Geometrie auf Papier im gemütlichen Atelier](../images/kaplum-zeichenatelier-banner.png)

*KI-generierte Bannerillustration; [Bildherkunft und Geltungsbereich](../images/README.md).*

# Kaplum Studio

### Eine Zahl ändern. Eine Idee Gestalt annehmen sehen.

[**Studio öffnen →**](https://pengusto.github.io/kaplum-studio/) · [Befehlsreferenz](https://pengusto.github.io/kaplum-studio/docs/) · [English](../../README.md) · **Deutsch**

[![Lizenz: eigener Code MIT](https://img.shields.io/badge/project_code-MIT-blue)](#lizenz)
[![GitHub Pages](https://github.com/pengusto/kaplum-studio/actions/workflows/pages.yml/badge.svg)](https://github.com/pengusto/kaplum-studio/actions/workflows/pages.yml)
[![Status: frühe Entwicklung](https://img.shields.io/badge/status-early%20development-orange)](#projektstand)

Kaplum Studio ist ein visuelles JavaScript-Turtle-Studio für Programmieranfänger und die Menschen, die sie unterrichten. Wähle eine Zeichnung, sieh den Code neben dem Ergebnis und entdecke durch veränderte Parameter, was sie bewirken.

Es entstand aus Programmier-Anfängerkursen: Oft war die schwierige Frage, welche Zahl in `drawDino(80, "LimeGreen", 25)` eigentlich was verändert. Kaplum macht diesen Zusammenhang sichtbar.

![Figurenkatalog mit echten Turtle-Vorschauen, Beispielaufrufen und direkt bedienbaren Parametern](../images/kaplum-next-dark.png)

## Dein erstes Experiment

Ohne Installation oder Konto: [Öffne den Dinosaurier](https://pengusto.github.io/kaplum-studio/#figure/figur-dino).

1. Starte das Beispiel und öffne die Parametererklärungen.
2. Ändere Größe oder Farbe und starte es erneut. Die Zeichnung entsteht aus dem sichtbaren Code.
3. Probiere [Quadrat abspielen](https://pengusto.github.io/kaplum-studio/#course/square) für einzelne Zeichenschritte oder [Eigene Funktionen, Schritt für Schritt](https://pengusto.github.io/kaplum-studio/#course/functions) zur Untersuchung der Code-Ausführung.
4. Exportiere eine ZIP, entpacke sie und öffne `index.html`. Dein exaktes `program.js` und die Engine sind dabei; Server und Internet sind nicht nötig.

## Vom Bild zum Programm

| Entdecken | Verstehen | Selbst gestalten |
| --- | --- | --- |
| 32 Figuren, 77 Befehle und Helfer, 26 Animationen | Nummerierte Argumente, Parametererklärungen und bedienbare Katalogfelder | CodeMirror-Editor neben dem Canvas am Desktop; Panel-Tabs auf Mobilgeräten |
| Neun geführte Kursexperimente mit Lernziel und Änderungsaufgabe | Aufgezeichnete Zeichenschritte, Zeichen-Undo und aktuelle Turtle-Position/Richtung | Tastatur- und Mauseingaben, Stempel, Kreise und allgemeine Zeichenhelfer |
| Durchsuchbare Beispiele mit echten Engine-Vorschauen | Begrenzter Code-Debugger mit Zeilen-Haltepunkten, einfachen Variablen und Steppen in benannte Funktionen | Offline-ZIP mit unverändertem Quelltext |

Figuren- und Befehlskarten aktualisieren Zeichnung und Aufruf beim Ändern von Zahlen, Farben oder booleschen Werten. Ausdrücke bleiben schreibgeschützt; vorhandene Studio-Entwürfe bleiben erhalten. Vorschauen laufen nur im sichtbaren Bereich, bewusst gesetzte Pausen bleiben beim Katalogwechsel erhalten. Bei reduzierter Bewegung ist ein ausdrücklicher Start nötig.

Der Code der Lernenden läuft in einem Web Worker innerhalb eines abgeschotteten iframes. Stop, Navigation und ausgeblendete Tabs beenden ihn; die Tests prüfen, dass eine Endlosschleife die Oberfläche nicht einfriert.

Oberfläche und Canvas-Hintergrund lassen sich unabhängig einstellen; zehn Studio-Farbvarianten werden lokal gespeichert. Die App ist eine statische Website: kein Backend, keine Konten, kein Tracking und kein Cloud-Speicher.

## Zeichenschritte und Code-Schritte

**Zeichnungswiedergabe** zeichnet endliche synchrone Programme auf. Zurück/Vorwärts zeigt Zeichenstände; Zeichen-Undo verwirft spätere Zeichenschritte. JavaScript-Variablen werden dabei nicht zurückgesetzt. Frame-Animationen haben eigene Pause/Fortsetzen-Steuerungen; Timer- und Eingabeprogramme nutzen Start/Stop.

**Code untersuchen** pausiert vor unterstützten Anweisungen. Mit dem nächsten Code-Schritt oder Fortsetzen kannst du einfache Variablen und aktive Aufrufe betrachten und Zeilen-Haltepunkte setzen. Benannte eigene Funktionen mit einfachen Parametern und Rückgaben werden unterstützt. Der Prototyp deckt einen begrenzten JavaScript-Teilumfang ab; siehe [Syntax und Grenzen](../source-debugger.md).

![Kurs-Arbeitsbereich mit Lernziel, bearbeitbarem Code, Zeichnungswiedergabe und Turtle-Zustand](../images/kaplum-course.png)

Dies sind echte Studio-Screenshots aus dem Produktions-Screenshot-Test in [`tests/studio.spec.js`](../../tests/studio.spec.js), keine Mockups oder KI-Illustrationen. Sie zeigen Beispielinhalte; die Lizenzen der Fremdkomponenten gelten weiterhin (siehe [Lizenz](#lizenz)).

## Lokal starten

Benötigt [Bun](https://bun.sh) **1.4.2**, Git und einen aktuellen Chromium- oder Firefox-Browser. Safari ist noch nicht getestet.

```sh
git clone https://github.com/pengusto/kaplum-studio.git
cd kaplum-studio
bun install --frozen-lockfile
bun run dev
```

[localhost:4173](http://localhost:4173) öffnen. Ist der Port belegt, lasse den anderen Server laufen und nutze `bun run dev --port 4193`; öffne dann `http://localhost:4193`. Für einen Produktions-Build:

```sh
bun run build      # statischer Export in out/
bun run preview    # liefert out/ unter http://localhost:4173 aus
```

`out/` kann von einem statischen Webserver ausgeliefert werden. GitHub Pages benötigt den Basispfad `/kaplum-studio`:

```sh
NEXT_PUBLIC_BASE_PATH=/kaplum-studio bun run build
NEXT_PUBLIC_BASE_PATH=/kaplum-studio bunx playwright test tests/pages.spec.js tests/structured-data.spec.js
```

Installiere zuvor die Testbrowser wie unten beschrieben.

## Projektstand

**Frühe Entwicklung; die Abnahme im Unterricht steht aus.** Der [Statusbericht](../project-status.md) dokumentiert eine Entwicklungspause nach den Updates für Home, Programmieranfänger und strukturierte Daten. Beispielbibliothek, bedienbare Parameter, Kurs, Themes und Offline-Export sind implementiert; eine funktionierende Funktion belegt noch nicht, dass Anfänger sie ohne Hilfe verstehen.

Offen sind der [kurze Unterrichtstest](../classroom-trial.de.md), Safari/langsamere Geräte und die muttersprachliche Übersetzungsprüfung. Breitere Debugger-Unterstützung ([#6](https://github.com/pengusto/kaplum-studio/issues/6)) und unabhängige benannte Turtles ([#7](https://github.com/pengusto/kaplum-studio/issues/7)) bleiben offen; der optionale p5.js-Modus ist auf später verschoben.

**Sprachen:** Oberfläche und Unterrichtsinhalte sind auf Englisch, Deutsch, Japanisch, Türkisch und Armenisch verfügbar. Die Übersetzungen sind KI-gestützt; die muttersprachliche Prüfung steht aus. Der Code behält englische JavaScript-Namen; deutsche Unterrichtsbefehlsaliase sind verfügbar. Ein Sprachwechsel übersetzt keinen bearbeiteten Programmtext.

## Bauen, testen und beitragen

Technik: Next.js mit statischem Export, React 19, CodeMirror 6 und eine gepflegte Canvas-Turtle-Engine. Ausgewählte UI-Komponenten stammen von React Bits und Lucide.

Die Playwright-Tests prüfen Katalog/Suche, Animationssteuerung, Endlosschleifen-Isolation, Einstellungen, Tastaturbedienung, mobile Ansichten, quelltexttreue Änderungen und eine entpackte Offline-ZIP, die tatsächlich läuft.

```sh
bunx playwright install chromium firefox
bun run build
bun run test
PLAYWRIGHT_BROWSER=firefox bun run test
```

Direkte Testläufe aktualisieren Screenshots in `docs/images/`; mit `KAPLUM_SCREENSHOT_DIR` auf ein temporäres Verzeichnis bleiben sie außerhalb deines Diffs. [Contributing](../../CONTRIBUTING.md) beschreibt kleine Beiträge, Übersetzungsregeln und den Umgang mit Unterrichtsdaten.

Für Maintainer: Den versionierten Hook einmal pro Clone mit `bun run hooks:install` installieren. Vor jedem Push prüft `bun run verify:push` den Produktions-Build, die vollständigen Chromium-/Firefox-Suiten und den Pages-Build samt Tests unter dem Unterpfad. Der Pre-Push-Hook erzwingt diese Prüfungen und hält Screenshots temporär. Nach dem Commit auf `main` mit `bun run push:verified` pushen; der Befehl nutzt den Hook und wartet auf den Pages-Workflow für genau diesen Commit. Pull Requests durchlaufen CI; Pages wird erst nach erfolgreichem Build und erfolgreicher Prüfung veröffentlicht.

| Weiterlesen | Zweck |
| --- | --- |
| [Teaching API](../teaching-api.md) | Befehle, Koordinaten, Eingaben, Stempel und Exportverträge |
| [Architektur](../architecture.md) | Ausführungsmodell und Projektstruktur |
| [Code-Debugger](../source-debugger.md) | Unterstützte Syntax, Steppen und Grenzen |
| [Projektstatus](../project-status.md) | Datierte Prüfnachweise und offene Arbeit |

## Lizenz

Der eigene Code von Kaplum Studio steht unter der [MIT-Lizenz](../../LICENSE). Sie ersetzt keine Fremdlizenzen:

- `engine/library.js` ist ein neuer Canvas-Turtle-Kern unter MIT und ersetzt die frühere angepasste Unterrichts-Engine samt RGB-Parser. Die Zeichenhelfer in `engine/functions.js` wurden laut Erklärung des Autors von Enis Uysal mit Codex erstellt. Dieses öffentliche Repository beginnt mit dem aktuellen Quelltextstand und enthält nicht die frühere Unterrichts-Fork-Historie. Siehe [Engine-Herkunft](../engine-migration.md).
- Die eingebundenen [React-Bits-Komponenten](../../components/react-bits/README.md) behalten **MIT + Commons Clause** unter [ihrer Lizenz](../../components/react-bits/LICENSE.md); sie sind nicht in den ZIPs der Lernenden enthalten.
- Die Abhängigkeiten bleiben in [THIRD_PARTY_NOTICES.txt](../../THIRD_PARTY_NOTICES.txt) genannt. Beispielnamen oder Darstellungen gewähren keine Rechte an fremden Figuren oder Marken.
