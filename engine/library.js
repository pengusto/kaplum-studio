// Kaplum Studio Turtle core — Copyright (c) 2026 Enis Uysal, MIT.
// Canvas coordinates: origin in the centre, positive y upwards, 0° points up.
(function () {
  const image = document.getElementById("imagecanvas");
  const display = document.getElementById("turtlecanvas");
  const ink = image.getContext("2d");
  const screen = display.getContext("2d");
  const state = { x: 0, y: 0, heading: 0, pen: true, visible: true, wrap: true, redraw: true };
  const radians = (degrees) => degrees * Math.PI / 180;
  const finite = (value, label) => {
    const number = Number(value);
    if (!Number.isFinite(number)) throw new Error(`${label} must be a finite number.`);
    return number;
  };
  function centred(context) {
    context.translate(context.canvas.width / 2, context.canvas.height / 2);
    context.scale(1, -1);
  }
  function erase(context) {
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.restore();
  }
  function draw() {
    erase(screen);
    screen.save();
    screen.globalCompositeOperation = "source-over";
    screen.drawImage(image, 0, 0);
    if (state.visible) {
      centred(screen);
      screen.translate(state.x, state.y);
      screen.rotate(-radians(state.heading));
      screen.beginPath();
      screen.moveTo(-5, 0);
      screen.lineTo(5, 0);
      screen.lineTo(0, 15);
      screen.closePath();
      screen.fillStyle = "green";
      screen.fill();
    }
    screen.restore();
  }
  const drawIf = () => { if (state.redraw) draw(); };
  const keys = new Map(), clicks = new Set();
  function onKey(key, handler) {
    if (typeof key !== "string" || !key || key.length > 64 || typeof handler !== "function") throw Error("onKey needs a key and a function.");
    const handlers = keys.get(key) || new Set(); keys.set(key, handlers); handlers.add(handler); drawIf();
    return () => { handlers.delete(handler); if (!handlers.size) keys.delete(key); drawIf(); };
  }
  function onClick(handler) {
    if (typeof handler !== "function") throw Error("onClick needs a function.");
    clicks.add(handler); return () => clicks.delete(handler);
  }
  function input(event) {
    if (event?.kind === "key" && typeof event.key === "string") {
      for (const handler of [...(keys.get(event.key) || [])]) handler(event.key);
    } else if (event?.kind === "click" && Number.isFinite(event.x) && Number.isFinite(event.y)) {
      for (const handler of [...clicks]) handler({ x: event.x, y: event.y });
    }
  }
  // Worker adapter uses this internal entry; standalone projects use native events.
  window.__dispatchTurtleInput = input;
  window.__turtleInputKeys = () => [...keys.keys()];
  if (display instanceof HTMLCanvasElement && typeof display.focus === "function") {
    display.tabIndex = 0;
    display.addEventListener("keydown", event => {
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey || !keys.has(event.key)) return;
      event.preventDefault(); input({ kind: "key", key: event.key });
    });
    display.addEventListener("pointerdown", event => {
      if (event.button !== 0) return;
      display.focus(); const rect = display.getBoundingClientRect();
      input({kind: "click", x: (event.clientX - rect.left) * display.width / rect.width - display.width / 2,
        y: display.height / 2 - (event.clientY - rect.top) * display.height / rect.height});
    });
  }


  // Split a journey at the closest edge; start the next segment at the opposite edge.
  // This also handles negative distances and exact edge/corner crossings.
  function forward(value) {
    const distance = finite(value, "Distance");
    let remaining = Math.abs(distance);
    const direction = Math.sign(distance);
    const dx = Math.sin(radians(state.heading)) * direction;
    const dy = Math.cos(radians(state.heading)) * direction;
    const halfWidth = image.width / 2, halfHeight = image.height / 2;
    const tolerance = 1e-10;
    ink.save();
    centred(ink);
    ink.beginPath();
    if (state.wrap) {
      const fold = (position, half) => ((position + half) % (2 * half) + 2 * half) % (2 * half) - half;
      if (Math.abs(state.x) > halfWidth) state.x = fold(state.x, halfWidth);
      if (Math.abs(state.y) > halfHeight) state.y = fold(state.y, halfHeight);
    }
    while (remaining > tolerance) {
      ink.moveTo(state.x, state.y);
      const edgeX = Math.abs(dx) < tolerance ? Infinity : ((dx > 0 ? halfWidth : -halfWidth) - state.x) / dx;
      const edgeY = Math.abs(dy) < tolerance ? Infinity : ((dy > 0 ? halfHeight : -halfHeight) - state.y) / dy;
      const travel = state.wrap ? Math.max(0, Math.min(remaining, edgeX, edgeY)) : remaining;
      state.x += dx * travel;
      state.y += dy * travel;
      ink.lineTo(state.x, state.y);
      remaining -= travel;
      if (remaining <= tolerance) break;
      if (edgeX <= travel + tolerance) state.x = dx > 0 ? -halfWidth : halfWidth;
      if (edgeY <= travel + tolerance) state.y = dy > 0 ? -halfHeight : halfHeight;
    }
    if (state.pen) ink.stroke();
    ink.restore();
    drawIf();
  }
  function color(red, green, blue) {
    if (typeof red === "string") {
      // Let Canvas parse CSS names, hex and rgb; no bundled colour parser needed.
      ink.strokeStyle = /^[\da-f]{3}$|^[\da-f]{6}$/i.test(red) ? `#${red}` : red;
    } else {
      const channels = Array.isArray(red) ? red : [red, green, blue];
      const rgb = channels.map((value) => Math.max(0, Math.min(255, finite(value, "Colour channel"))));
      ink.strokeStyle = `rgb(${rgb.join(",")})`;
    }
  }
  function goto(x, y) {
    const nextX = finite(x, "X"), nextY = finite(y, "Y");
    state.x = nextX;
    state.y = nextY;
    drawIf();
  }
  function width(value) {
    const thickness = finite(value, "Width");
    if (thickness <= 0) throw new Error("Width must be positive.");
    ink.lineWidth = thickness;
  }
  function write(text) {
    ink.save();
    ink.translate(image.width / 2 + state.x, image.height / 2 - state.y);
    ink.fillText(String(text), 0, 0);
    ink.restore();
    drawIf();
  }
  Object.assign(window, {
    forward, color, goto, width, write, draw, drawIf, onKey, onClick,
    position: () => ({ x: state.x, y: state.y }),
    heading: () => state.heading,
    distanceTo: (x, y) => Math.hypot(finite(x, "X") - state.x, finite(y, "Y") - state.y),
    directionTo: (x, y) => {
      const dx = finite(x, "X") - state.x, dy = finite(y, "Y") - state.y;
      return dx === 0 && dy === 0 ? state.heading : (Math.atan2(dx, dy) * 180 / Math.PI + 360) % 360;
    },
    backward: (distance) => forward(-finite(distance, "Distance")),
    home: () => { state.x = 0; state.y = 0; state.heading = 0; drawIf(); },
    isVisible: () => state.visible,
    isPenDown: () => state.pen,
    angle: (value) => { state.heading = finite(value, "Angle"); drawIf(); },
    right: (value) => { state.heading += finite(value, "Angle"); drawIf(); },
    left: (value) => { state.heading -= finite(value, "Angle"); drawIf(); },
    penup: () => { state.pen = false; drawIf(); },
    pendown: () => { state.pen = true; drawIf(); },
    hideTurtle: () => { state.visible = false; drawIf(); },
    showTurtle: () => { state.visible = true; drawIf(); },
    wrap: (enabled) => { state.wrap = Boolean(enabled); },
    redrawOnMove: (enabled) => { state.redraw = Boolean(enabled); },
    clear: () => { erase(ink); drawIf(); },
    getTurtleState: () => ({ x: state.x, y: state.y, angleDeg: state.heading }),
    setFont: (font) => { ink.font = font; },
    degToRad: radians,
    radToDeg: (value) => value * 180 / Math.PI,
  });
  ink.lineWidth = 1;
  ink.strokeStyle = "black";
  ink.textAlign = "center";
  ink.textBaseline = "middle";
  draw();
})();
