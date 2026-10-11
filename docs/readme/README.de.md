# Kaplum Studio

[![Lizenz: MIT](https://img.shields.io/badge/license-MIT-blue)](../../LICENSE)
[![CI: GitHub Actions](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)](../../.github/workflows/ci.yml)
[![Status: frühe Entwicklung](https://img.shields.io/badge/status-early%20development-orange)](#projektstand)

[English](../../README.md) · **Deutsch**

Kaplum Studio ist ein visuelles JavaScript-Turtle-Studio für Kinder, die gerade mit dem Programmieren anfangen. Sie wählen eine Zeichnung oder Animation, sehen den Code neben dem laufenden Ergebnis, verstehen, was jeder Parameter macht, ändern einen Wert und sehen sofort die Wirkung.

Es ist aus dem Unterricht in Programmier-Anfängerkursen entstanden. Dort war selten der Funktionsaufruf selbst das Schwierige, sondern die Frage, welche Zahl in `drawDino(80, "LimeGreen", 25)` eigentlich was bewirkt.

![Kaplum Studio: Beispielbibliothek, Code-Editor über dem Canvas und Parameterübersicht](../images/kaplum-next-dark.png)

## Was es kann

- **Beispielbibliothek.** 32 Figuren, 62 Grundbefehle und 26 Animationen, jeweils mit einer echten, von der Engine gezeichneten Vorschau.
- **Code und Ergebnis zusammen.** Ein CodeMirror-Editor steht über dem Canvas, Run, Restart und Stop direkt beim Ergebnis. Animationen starten automatisch, außer wenn reduzierte Bewegung eingestellt ist.
- **Sichtbare Parameter.** Jedes Argument im Code bekommt eine Nummer, die zu einer Zeile in der Übersicht passt: Parametername, aktueller Wert und eine verständliche Erklärung. Beim Dinosaurier lassen sich die Werte in beschrifteten Feldern ändern und gezielt übernehmen. Dabei wird nur dieser eine Aufruf geändert, der übrige Code bleibt unverändert.
- **Sichere Ausführung.** Der Code der Lernenden läuft in einem Web Worker innerhalb eines abgeschotteten iframes. Stop, Navigation und ausgeblendete Tabs beenden ihn, sodass eine Endlosschleife die Seite nicht einfriert.
- **Offline-Export.** Eine ZIP-Datei enthält `index.html`, das exakte `program.js` und die Engine. Entpacken, `index.html` öffnen, und das Programm läuft ohne Server und ohne Internet.
- **Augenschonend.** Dunkle Oberfläche und dunkler Canvas als Standard, beide unabhängig voneinander auf hell umstellbar. Die Einstellungen bleiben im Browser gespeichert.

## Schnellstart

Benötigt [Bun](https://bun.sh) 1.4.2 und einen aktuellen Chromium- oder Firefox-Browser. Safari ist noch nicht getestet.

```sh
bun install --frozen-lockfile
bun run dev
```

Dann http://localhost:4173 öffnen.

Statische Seite bauen und lokal ausliefern:

```sh
bun run build      # statischer Export in out/
bun run preview    # liefert out/ unter http://localhost:4173 aus
```

`out/` besteht nur aus statischen Dateien und läuft auf jedem Webserver. Es gibt kein Backend, keine Konten, kein Tracking und keinen Cloud-Speicher.

## Tests

Die Playwright-Tests laufen gegen den Produktions-Build und prüfen echtes Verhalten: den vollständigen Katalog und die Suche, Zeichnen und Stoppen von Animationen, das Abfangen von Endlosschleifen, Theme- und Canvas-Einstellungen, Tastaturbedienung, die mobile Ansicht, Parameteränderungen ohne Verlust des übrigen Codes und eine entpackte Offline-ZIP, die wirklich läuft.

```sh
bun run build
bun run test
PLAYWRIGHT_BROWSER=firefox bun run test
```

Beim ersten Mal: `bunx playwright install chromium firefox`. Die Tests aktualisieren dabei auch die Screenshots in `docs/images/`. Die CI baut die App und testet beide Browser bei jedem Push auf `main`.

## Technik

Next.js (App Router, statischer Export), React 19, CodeMirror 6 und Bun. Die Turtle-Engine ist eine gepflegte JavaScript-Bibliothek, die im Worker läuft. Für Details der Oberfläche werden ausgewählte [React-Bits](https://reactbits.dev)-Komponenten und [Lucide](https://lucide.dev)-Icons genutzt. Ausführungsmodell und Projektaufbau stehen in [docs/architecture.md](../architecture.md), die Zeichenbefehle in [docs/teaching-api.md](../teaching-api.md) (beide auf Englisch).

## Projektstand

Kaplum Studio ist in früher Entwicklung und wird im Unterricht eingesetzt. Fertig sind die Beispielbibliothek, das Studio, die Parametererklärungen, direkt bedienbare Parameter in Figuren- und Befehlskarten, Dark- und Light-Modus und der Offline-Export.

Als Nächstes geplant:

- mehrere benannte Projekte im Browser speichern, mit Import
- auswählen, welche Hilfsfunktionen ein Projekt nutzt
- ein geführter Kurs mit Zielbildern und einem per Code freischaltbaren Lösungs-Tresor
- vollständige Übersetzungen der Oberfläche

**Sprachen.** Die Studio-Oberfläche gibt es auf Englisch und Deutsch. Für Beispiele und Befehle existieren Entwürfe auf Japanisch, Türkisch und Armenisch; sie sind KI-gestützt und noch nicht von Muttersprachlern geprüft. Der Code der Lernenden nutzt immer englische JavaScript-Namen; für jeden Unterrichtsbefehl gibt es zusätzlich einen deutschen Alias.

## Lizenz

Der eigene Code von Kaplum Studio steht unter der [MIT-Lizenz](../../LICENSE).

Einige Teile stammen aus anderen Projekten und behalten ihre eigenen Lizenzen:

- `engine/library.js` ist ein neu implementierter Canvas-Turtle-Kern unter MIT. Er ersetzt den angepassten Unterrichts-Fork und dessen RGB-Parser. Für die Zeichenhelfer in `engine/functions.js` bleibt vor einer öffentlichen Veröffentlichung eine separate Herkunftsprüfung offen. Die ältere Git-Historie enthält den vorherigen Kern; dessen Hinweise bleiben in [THIRD_PARTY_NOTICES.txt](../../THIRD_PARTY_NOTICES.txt) erhalten.
- Die React-Bits-Komponenten in `components/react-bits/` stehen unter MIT + Commons Clause. Siehe [deren Lizenz](../../components/react-bits/LICENSE.md).
- Die npm-Abhängigkeiten sind in `THIRD_PARTY_NOTICES.txt` aufgeführt.

Die aktuelle Canvas-Engine und die vom Autor mit Codex erstellten Zeichenhelfer stehen unter MIT. Dieses Release-Repository enthält nur den aktuellen Stand und keine Historie der früheren Unterrichts-Engine. Die Lizenzen der Fremdkomponenten bleiben erhalten; React Bits hat zusätzliche Commons-Clause-Bedingungen.
