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
    forward, color, goto, width, write, draw, drawIf,
    angle: (value) => { state.heading = finite(value, "Angle"); drawIf(); },
    right: (value) => { state.heading += finite(value, "Angle"); drawIf(); },
    left: (value) => { state.heading -= finite(value, "Angle"); drawIf(); },
    penup: () => { state.pen = false; },
    pendown: () => { state.pen = true; },
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
