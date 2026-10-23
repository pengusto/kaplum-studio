import { assetUrl } from "./asset-url.js";
import { storedZip } from "./zip.js";
export function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function setupExports(session) {
  document.getElementById("export-js").onclick = () => {
    download(
      new Blob([session.code], { type: "text/javascript;charset=utf-8" }),
      "turtle-program.js",
    );
  };
  const button = document.getElementById("export-project");
  const status = document.getElementById("export-status");
  button.onclick = async () => {
    const code = session.code;
    button.disabled = true;
    status.hidden = false;
    status.dataset.i18n = "exporting";
    status.textContent = session.text("exporting");
    try {
      download(storedZip(await projectFiles(code)), "turtle-project.zip");
      status.hidden = true;
    } catch {
      status.dataset.i18n = "exportError";
      status.textContent = session.text("exportError");
    } finally {
      button.disabled = false;
    }
  };
}

const entryPoint = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Turtle project</title>
  <style>
    body { margin:0; background:white; display:grid; place-items:center; min-height:100vh; }
    #turtlecanvas { width:min(100vw,700px); height:auto; }
  </style>
</head>
<body>
  <canvas id="imagecanvas" width="700" height="700" hidden></canvas>
  <canvas id="turtlecanvas" width="700" height="700" aria-label="Turtle drawing"></canvas>
  <span id="coords" hidden></span><span id="message" hidden></span>
  <!-- Keep these files together. Edit program.js to change your creation. -->
  <!-- This standalone program runs directly in this page, without editor isolation. -->
  <script src="teaching-clock.js"></script>
  <script src="library.js"></script>
  <script src="functions.js"></script>
  <script src="program.js"></script>
</body>
</html>
`;
export async function projectFiles(code, background = "white") {
  const assets = await Promise.all(
    [
      "/engine/library.js",
      "/engine/functions.js",
      "/THIRD_PARTY_NOTICES.txt",
      "/engine/teaching-clock.js",
      "/LICENSE",
    ].map(async (path) => {
      const response = await fetch(assetUrl(path));
      if (!response.ok) throw new Error(`Cannot load ${path}`);
      return response.text();
    }),
  );
  return {
    "index.html": entryPoint.replace(
      "background:white",
      `background:${background === "dark" ? "#18202e" : "white"}`,
    ),
    "library.js": assets[0],
    "functions.js": assets[1],
    "program.js": code,
    "THIRD_PARTY_NOTICES.txt": assets[2],
    "teaching-clock.js": assets[3],
    "LICENSE": assets[4],
  };
}
