export default {
  currentDirection: "aktuelle Turtle-Richtung",
  navCommands: "Grundbefehle",
  learningGuide: "Lernhilfe",
  defaultValue: "(Standard)",
  omittedValue: "nicht angegeben",
  defaultsPosition: "Standardwerte und Position",

  engineUnavailable:
    "Die Zeichenfunktionen konnten nicht geladen werden. Prüfe die Verbindung und versuche Start oder Abspielen erneut. Dein Code bleibt erhalten.",
  theme: "Darstellung",
  darkTheme: "Dunkel",
  lightTheme: "Hell",
  appTitle: "Turtle-Beispiele",
  intro: "Ändere den Code. Schau, was passiert!",
  language: "Sprache",
  codeLanguage: "Sprache der Befehle",
  englishCommands: "Englische Befehle",
  germanCommands: "Deutsche Befehle",
  gallery: "Beispiele",
  reference: "Befehlshilfe",
  editor: "Dein Code",
  preview: "Dein Ergebnis",
  run: "Starten",
  stop: "Stoppen",
  reset: "Beispiel zurücksetzen",
  downloadJS: "JavaScript herunterladen",
  downloadProject: "Ganzes Projekt herunterladen",
  storageNotice:
    "Dein Code wird in diesem Browser gespeichert. Lade ihn herunter, um ihn auch anderswo aufzubewahren.",
  storageUnavailable:
    "Dieser Browser kann deinen Code gerade nicht speichern. Lade ihn vor dem Verlassen herunter.",
  discardConfirm:
    "Deine Änderungen ersetzen? Lade deinen Code zuerst herunter, wenn du ihn behalten möchtest.",
  replace: "Code ersetzen",
  cancel: "Meinen Code behalten",
  loadSolution: "Lehrerlösung anzeigen",
  loadStarter: "Starter laden",
  goal: "Dein Ziel",
  steps: "Probiere diese Schritte",
  extension: "Zusatzaufgabe",
  concepts: "Das übst du",
  drawing: "Zeichnen",
  movement: "Bewegen",
  games: "Kleine Spiele",
  all: "Alle Beispiele",
  variables: "Variablen",
  functions: "Funktionen",
  conditions: "Bedingungen",
  forLoops: "For-Schleifen",
  arrays: "Arrays (Listen)",
  variablesHelp:
    "Eine Variable merkt sich einen Wert, etwa eine Größe oder Farbe.",
  functionsHelp:
    "Eine Funktion fasst Schritte unter einem Namen zusammen. Rufe sie auf, um die Schritte wieder zu nutzen.",
  conditionsHelp:
    "Eine if-Bedingung entscheidet, ob ein Schritt ausgeführt wird.",
  forLoopsHelp: "Eine For-Schleife wiederholt Schritte. Du bestimmst, wie oft.",
  arraysHelp:
    "Ein Array enthält mehrere Werte in einer Reihenfolge, etwa eine Liste von Farben.",
  ready: "Bereit zum Starten",
  running: "Läuft",
  stopped: "Gestoppt",
  syntaxError:
    "Etwas im Code ist nicht richtig geschrieben. Prüfe Klammern, Anführungszeichen und Kommas.",
  runtimeError:
    "Dein Programm ist auf ein Problem gestoßen. Prüfe den Befehl und seine Werte.",
  errorLine: "Zeile {line}",
  errorDetails: "Technische Angaben",
  parameters: "Werte, die du angeben kannst",
  default: "Standardwert",
  optional: "Optional",
  anchor: "Wo die Zeichnung beginnt",
  rotation: "Drehrichtung",
  example: "Beispiel",
  changeNumber: "Ändere eine Zahl. Starte den Code erneut und vergleiche.",
  changeColour: "Probiere eine andere Farbe.",
  chooseExample: "Wähle ein Beispiel",
  codeInputLabel: "JavaScript-Codeeditor",
  previewLabel: "Zeichenvorschau",
  filterLabel: "Beispiele nach Kategorie filtern",
  reviewStatus:
    "KI-gestützter Übersetzungsentwurf; muttersprachliche Prüfung steht aus.",
  activities: {
    circle: {
      title: "Ein bunter Kreis",
      goal: "Ändere Größe und Farbe deines Kreises.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere radius auf 100.",
        "Probiere eine andere Farbe.",
      ],
      extension: "Zeichne einen zweiten Kreis an einer anderen Stelle.",
    },
    "pacman-move": {
      title: "Pacman läuft über den Bildschirm",
      goal: "Lass Pacman schneller laufen und am Rand wieder erscheinen.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere speed von 3 auf 5.",
      ],
      extension: "Ändere Pacmans Farbe von Gold auf Red.",
    },
    "moving-star": {
      title: "Bewegen und drehen",
      goal: "Lass den Stern beim Drehen schneller laufen.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere x + 3 auf x + 6.",
      ],
      extension: "Ändere die Anzahl der Sternzacken von fünf auf acht.",
    },
    "bouncing-ball": {
      title: "Ein Ball prallt ab",
      goal: "Lass den Ball langsamer laufen und im Bild bleiben.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere speedX von 4 auf 2.",
      ],
      extension: "Probiere speedY = 0 und beobachte den Weg.",
    },
    "butterfly-garden": {
      title: "Flug über den Garten",
      goal: "Verlangsame den Flügelschlag über den Blumen.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere wingSpeed von 2 auf 1.",
      ],
      extension: "Ändere die Schmetterlingsfarbe auf coral.",
    },
    "day-night-garden": {
      title: "Tag und Nacht",
      goal: "Wähle einen dunkleren Himmel für die Nacht.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere nightSky von MediumBlue auf MidnightBlue.",
      ],
      extension: "Ändere die Sonnenbewegung von + 2 auf + 4.",
    },
    "pacman-route": {
      title: "An den Ecken drehen",
      goal: "Verlangsame Pacmans Mund beim Laufen um die Ecken.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere mouthSpeed von 2 auf 1.",
      ],
      extension: "Ändere Pacmans Farbe von gold auf coral.",
    },
    "walking-dino": {
      title: "Ein Dino läuft",
      goal: "Verlangsame die Schritte des Dinos.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere legSpeed von 2 auf 1.",
      ],
      extension: "Ändere die Dinogröße von 85 auf 100.",
    },
    "jumping-dino": {
      title: "Springen und landen",
      goal: "Lass den Dino höher springen und wieder landen.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere die Sprunghöhe von 120 auf 160.",
      ],
      extension: "Ändere die Sprungdauer von 36 auf 60.",
    },
    "butterfly-circle": {
      title: "Flug im Kreis",
      goal: "Verlangsame die Flügel beim Kreisflug.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere wingSpeed von 2 auf 1.",
      ],
      extension: "Ändere beide Kreisgrößen von 150 auf 100.",
    },
    "solar-system": {
      title: "Um die Sonne kreisen",
      goal: "Verlangsame die Planeten um die Sonne.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere rotation + 1 auf rotation + 0.5.",
      ],
      extension: "Ändere die Erdfarbe auf lime.",
    },
    "rainbow-cat": {
      title: "Eine Regenbogenkatze",
      goal: "Verlangsame die Katze und behalte ihren Regenbogen.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere speed von 3 auf 1.",
      ],
      extension: "Ändere eine Farbe im Array rainbow.",
    },
    "swaying-flowers": {
      title: "Blumen im Wind",
      goal: "Lass die Blumen schneller schwingen.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere swaySpeed von 0.25 auf 0.5.",
      ],
      extension: "Ergänze 260 im Array der Blumenpositionen.",
    },
    "bouncing-logo": {
      title: "Ein Logo prallt ab",
      goal: "Schreibe deinen eigenen Gruß auf das springende Logo.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere den Text DVD auf HALLO.",
      ],
      extension: "Ändere speedX von 3 auf 1.",
    },
    "rainbow-spiral": {
      title: "Eine Spirale dreht sich",
      goal: "Ändere die Form der bunten Spirale.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere den Spiralwinkel von 61 auf 60.",
      ],
      extension: "Ändere eine Farbe im Array colors.",
    },
    "star-ring": {
      title: "Ein Ring aus Sternen",
      goal: "Färbe den Sternenring goldgelb.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere hotpink auf gold.",
      ],
      extension: "Ändere den Ringradius von 155 auf 200.",
    },
    "garden-grid": {
      title: "Ein bewegtes Gartenraster",
      goal: "Verlangsame die Erbsen im Gartenraster.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere die Erbsenbewegung von + 5 auf + 2.",
      ],
      extension: "Ändere eine Farbe des Schachbrettmusters.",
    },
    "sailing-ship": {
      title: "Ein Schiff auf Wellen",
      goal: "Verlangsame das Schiff auf den Wellen.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere die Schiffsbewegung von + 2 auf + 1.",
      ],
      extension: "Ändere die Wellenhöhe von 12 auf 24.",
    },
    "jet-flight": {
      title: "Eine Cartoon-Jetszene",
      goal: "Verlangsame den Jet und beobachte seinen Cartoon-Abwurf.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere die Jetbewegung von + 3 auf + 1.",
      ],
      extension: "Ändere den Abwurfpunkt von -100 auf 0.",
    },
    "following-dog": {
      title: "Der Sonne folgen",
      goal: "Vergrößere den Hund, der der Sonne folgt.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere die Hundegröße von 90 auf 120.",
      ],
      extension: "Ändere das Verfolgungstempo von 2.5 auf 3.",
    },
    "ferris-wheel": {
      title: "Ein Riesenrad dreht sich",
      goal: "Lass das Riesenrad schneller drehen.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere rotation + 0.6 auf rotation + 1.2.",
      ],
      extension: "Ändere die Radgröße von 300 auf 240.",
    },
    underwater: {
      title: "Gemeinsam schwimmen",
      goal: "Gib den schwimmenden Fischen eine neue Farbe.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere die Fischfarbe von coral auf gold.",
      ],
      extension: "Ändere die Fischanzahl von vier auf sechs.",
    },
    "falling-bounce": {
      title: "Fallen und abprallen",
      goal: "Verringere die Schwerkraft für sanfteres Abprallen.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere gravity von 0.35 auf 0.2.",
      ],
      extension: "Ändere die erlaubten Sprünge von drei auf fünf.",
    },
    fireworks: {
      title: "Starten und funkeln",
      goal: "Gib dem Feuerwerk mehr Strahlen.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere die äußeren Strahlen von 24 auf 36.",
      ],
      extension: "Ändere die innere Feuerwerksfarbe von white auf coral.",
    },
    "rocket-flight": {
      title: "Eine Rakete fliegt",
      goal: "Lass die Rakete schneller fliegen.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere die Raketenbewegung von + 2 auf + 4.",
      ],
      extension: "Ändere ihre Farbe von coral auf lime.",
    },
    snowfall: {
      title: "Schnee bei Tag und Nacht",
      goal: "Erzeuge einen Schneesturm mit mehr Flocken.",
      steps: [
        "Starte den Code und beobachte, was sich ändert.",
        "Ändere die Flockenanzahl von 35 auf 50.",
      ],
      extension: "Ändere die Flockengröße von 7 auf 10.",
    },
  },
  badge: "BAUEN · ÄNDERN · ENTDECKEN",
  chooseActivity: "Wähle eine Aufgabe",
  categoryLabel: "Aufgabenkategorie",
  allActivities: "Alle Aufgaben",
  scenes: "Szenen",
  activitiesLabel: "Aufgaben",
  learningLabel: "Lernaufgabe",
  solutionTitle: "Lehrerlösung",
  solutionNotice: "Probiere zuerst die Schritte. Die Lösung ersetzt den Code.",
  preparing: "Dein Programm wird vorbereitet…",
  executing: "Programm gestartet — mit Stoppen hältst du es an.",
  checkCode: "Prüfe deinen Code",
  onLine: "in Zeile {line}",
  visualExample: "Befehl ausprobieren",
  referenceStop: "Hilfsvorschau stoppen",
  notReviewed:
    "Übersetzungen sind KI-Entwürfe; muttersprachliche Prüfung steht aus.",
  canvasEncouragement: "Weiter so!",
  canvasGreeting: "HALLO",
  exportJavaScript: "JavaScript herunterladen",
  exportProject: "Ganzes Projekt herunterladen",
  exportError:
    "Der Download konnte nicht erstellt werden. Dein Code ist noch hier.",
  exporting: "Dein Download wird vorbereitet…",
  navFunctions: "Figuren",
  navAnimations: "Animationen",
  navPlayground: "Playground",
  functionsTitle: "Figuren zum Zeichnen",
  functionsIntro:
    "Wähle ein Bild. Schau dir den Befehl an, ändere einen Wert und entdecke die Wirkung.",
  animationsTitle: "Beispiele in Bewegung",
  animationsIntro:
    "Wähle eine Animation oder eine kleine Zeichenaufgabe. Starte sie und entdecke ihren Code.",
  searchFunctions: "Figuren und Befehle suchen",
  searchAnimations: "Beispiele suchen",
  figureCategory: "Figurenkategorie",
  allFigures: "Alle Figuren",
  animals: "Tiere",
  shapes: "Formen",
  vehicles: "Fahrzeuge",
  backgrounds: "Hintergründe",
  tools: "Zeichenhilfen",
  completeCommands: "Alle Befehle",
  commandsIntro:
    "Hier findest du jeden Grundbefehl und jede Zeichenhilfe mit englischem und deutschem Namen.",
  backOverview: "Zurück zur Übersicht",
  editPlayground: "Im Playground bearbeiten",
  playDemo: "Beispiel starten",
  pauseDemo: "Beispiel pausieren",
  fullCode: "Vollständiger Code",
  codeExplanation: "So funktioniert der Code",
  snippetNotice:
    "Das sind Ausschnitte. Zum Starten brauchst du das vollständige Programm.",
  startingValues: "Anfangswerte",
  startingExplanation:
    "Diese Zeilen legen die Werte für das Programm fest. Ändere einmal eine Zahl.",
  drawingCode: "Zeichnen",
  drawingExplanation:
    "Diese Zeilen setzen die Figuren an ihren Ort und zeichnen die Szene. Farben stehen in Anführungszeichen.",
  changingValues: "Werte verändern",
  changingExplanation:
    "Diese Zeilen verändern Werte oder prüfen eine Bedingung. So bewegt sich die Szene oder reagiert.",
  repeatingCode: "Wiederholen",
  repeatingExplanation:
    "Diese Zeilen rufen das Zeichnen erneut auf. Jeder Animationsschritt erzeugt das nächste Bild.",
  customSource: "Dein gewählter Code",
  customExplanation:
    "Dieser Code stammt aus der Funktionshilfe. Du kannst ihn verändern; es ist keine andere Aufgabe zugeordnet.",
  noResults:
    "Keine Treffer. Suche ein anderes Wort oder wähle alle Kategorien.",
  detailUnavailable:
    "Dieses Beispiel wurde nicht gefunden. Wähle eines aus der Übersicht.",
  navigationLabel: "Hauptnavigation",
  closeUp:
    "Nahansicht. Der Code nutzt weiterhin die ursprünglichen Koordinaten.",
};
