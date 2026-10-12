// Browser-only drawing adapter. It exposes no host DOM or storage.
self.window = self;
let canvases;
let requestSnapshot = () => {};
// The teaching surface stays 700 units wide. A render camera changes only
// raster resolution and framing, never coordinates, sizes or wrapping.
function drawingCanvas(render) {
  const side = render?.side || 700;
  const size = Math.max(700, Math.min(1600, Math.round(render?.size || 700)));
  const x = render?.x || 0, y = render?.y || 0;
  const surface = new OffscreenCanvas(size, size);
  const context = surface.getContext("2d");
  const scale = size / side;
  const transform = (a, b, c, d, e, f) =>
    context.setTransform(a * scale, b * scale, c * scale, d * scale,
      (e - x) * scale, (f - y) * scale);
  transform(1, 0, 0, 1, 0, 0);
  const logical = {
    width: 700, height: 700, surface, revision: 0,
    addEventListener() {},
    getContext() { return adapted; },
  };
  const adapted = new Proxy(context, {
    get(target, property) {
      if (property === "canvas") return logical;
      if (property === "getTransform") return () => { const m=target.getTransform(); return {a:m.a/scale,b:m.b/scale,c:m.c/scale,d:m.d/scale,e:m.e/scale+x,f:m.f/scale+y}; };
      if (property === "setTransform") return transform;
      if (property === "resetTransform") return () => transform(1, 0, 0, 1, 0, 0);
      if (property === "drawImage") return (image, ...args) => {
        if (image?.surface && args.length === 2) {
          // The stored image already contains this camera's region.
          logical.revision++; requestSnapshot();
          target.drawImage(image.surface, args[0] + x, args[1] + y, side, side);
        } else { logical.revision++; requestSnapshot(); target.drawImage(image?.surface || image, ...args); }
      };
      if (["fill", "stroke", "clearRect", "fillRect", "strokeRect", "fillText", "strokeText", "putImageData"].includes(property)) {
        return (...args) => { logical.revision++; requestSnapshot(); return target[property](...args); };
      }
      const value = Reflect.get(target, property, target);
      return typeof value === "function" ? value.bind(target) : value;
    },
    set(target, property, value) { Reflect.set(target, property, value, target); return true; },
  });
  return logical;
}
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
    if (event.data?.input) {
      if (typeof self.__dispatchTurtleInput === "function") self.__dispatchTurtleInput(event.data.input);
      return;
    }
    canvases = { imagecanvas: drawingCanvas(event.data.render), turtlecanvas: drawingCanvas(event.data.render) };
    (0, eval)(event.data.engine);
    // Sequential snapshots never clear drawing state and cannot flood the host.
    let sending = false, sentRevision = -1;
    const snapshot = async () => {
      if (sending || sentRevision === canvases.turtlecanvas.revision) return;
      sending = true;
      sentRevision = canvases.turtlecanvas.revision;
      try {
        const bitmap = await createImageBitmap(canvases.turtlecanvas.surface);
        postMessage({ type: "frame", bitmap, keys: __turtleInputKeys(), state: { ...getTurtleState(), pen: isPenDown(), visible: isVisible() } }, [bitmap]);
      } finally {
        sending = false;
      }
    };
    let snapshotTimer = null;
    requestSnapshot = () => {
      if (snapshotTimer !== null) return;
      snapshotTimer = setTimeout(async () => {
        snapshotTimer = null;
        await snapshot();
        if (sentRevision !== canvases.turtlecanvas.revision) requestSnapshot();
      }, 33);
    };
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
