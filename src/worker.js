// Browser-only drawing adapter. It exposes no host DOM or storage.
self.window = self;
const canvases = {
  imagecanvas: new OffscreenCanvas(700, 700),
  turtlecanvas: new OffscreenCanvas(700, 700),
};
for (const canvas of Object.values(canvases))
  canvas.addEventListener = () => {};
self.HTMLCanvasElement = OffscreenCanvas;
self.document = {
  getElementById: (id) => canvases[id] || { innerHTML: "", className: "" },
};
function report(error) {
  // JavaScript can throw any value, including null and objects with unsafe getters.
  let message = "Unknown error";
  let stack = "";
  let kind = "runtime";
  try {
    message = String(error?.message || error);
  } catch {
    // An object without a printable value must not break the error handler.
  }
  try {
    stack = String(error?.stack || "");
    if (error?.name === "SyntaxError") kind = "syntax";
  } catch {
    // Keep the available message even when diagnostic properties cannot be read.
  }
  const match = stack.match(/playground-program\.js:(\d+):/);
  postMessage({
    type: "error",
    message,
    kind,
    line: match ? Number(match[1]) : null,
  });
}

self.addEventListener("error", (event) => {
  event.preventDefault();
  report(event.error || Error(event.message));
});
self.addEventListener("unhandledrejection", (event) => {
  event.preventDefault();
  report(event.reason);
});
onmessage = async (event) => {
  try {
    (0, eval)(event.data.engine);
    // Sequential snapshots never clear drawing state and cannot flood the host.
    let sending = false;
    const snapshot = async () => {
      if (sending) return;
      sending = true;
      try {
        const bitmap = await createImageBitmap(canvases.turtlecanvas);
        postMessage({ type: "frame", bitmap }, [bitmap]);
      } finally {
        sending = false;
      }
    };
    setInterval(snapshot, 33);
    postMessage({ type: "executing" });
    (0, eval)(
      '"use strict";' +
        event.data.code +
        "\n//# sourceURL=playground-program.js",
    );
    await snapshot();
  } catch (error) {
    report(error);
  }
};
