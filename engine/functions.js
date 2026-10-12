// Copyright (c) 2026 Enis Uysal. MIT License; see LICENSE.
// Created with Codex assistance; authorship confirmed by the owner.
// Maintained English helpers. German aliases share these implementations.
(function () {

function getRandomNumber(min = 1, max = 100) {
  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function getRandomColor() {
  const palette = [
    "MediumAquaMarine", "LightGreen", "Salmon", "Navy", "Teal",
    "Tomato", "SandyBrown", "HotPink", "Gold", "DeepSkyBlue",
    "OrangeRed", "LimeGreen"
  ];
  return palette[getRandomNumber(0, palette.length - 1)];
}


function setBackground(paintColor = "black") {
  const canvas = document.getElementById("imagecanvas");
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = paintColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  goto(0, 0);
  angle(0);
}


function setDualBackground(topColor = "skyblue", bottomColor = "green", horizonY = 0) {
  const canvas = document.getElementById("imagecanvas");
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  let horizonPixel = 350 - horizonY;
  ctx.fillStyle = topColor;
  ctx.fillRect(0, 0, canvas.width, horizonPixel);
  ctx.fillStyle = bottomColor;
  ctx.fillRect(0, horizonPixel, canvas.width, canvas.height - horizonPixel);
  ctx.restore();
  goto(0, 0);
  angle(0);
}


function setTiltedBackground(topColor = "SkyBlue", bottomColor = "DodgerBlue", rotation = 0) {
  if (!Number.isFinite(rotation)) throw new Error("Background rotation must be a finite number.");
  const canvas = document.getElementById("imagecanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = topColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rotation * Math.PI / 180);
  ctx.fillStyle = bottomColor;
  ctx.fillRect(-canvas.width * 2, 0, canvas.width * 4, canvas.height * 2);
  ctx.restore();
  goto(0, 0);
  angle(0);
}


function setTextColor(paintColor = "black") {
  const canvas = document.getElementById("imagecanvas");
  if (!canvas) return;
  canvas.getContext("2d").fillStyle = paintColor;
}


function setTextSize(size = 20) {
  setFont(size + "px Arial");
}


function writeText(text, size = 20, paintColor = "black") {
  setTextSize(size);
  setTextColor(paintColor);
  write(text);
}


function hideArrow() {
  penup();
  goto(1000, 1000);
}


function drawLine(x1, y1, x2, y2, paintColor = "black", thickness = 1) {
  penup();
  goto(x1, y1);
  pendown();
  color(paintColor);
  width(thickness);
  const ctx = document.getElementById("imagecanvas").getContext("2d");
  ctx.save();
  ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
  ctx.scale(1, -1);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
  goto(x2, y2);
}


function drawRect(widthValue = 50, height = 50, paintColor = "", filled = false) {
  const rectangleColor = paintColor || getRandomColor();
  if (filled) beginFill(rectangleColor);
  else color(rectangleColor);

  for (let i = 0; i < 2; i++) {
    forward(widthValue);
    right(90);
    forward(height);
    right(90);
  }

  if (filled) endFill();
}


function drawTriangle(size = 50, paintColor = "", filled = false) {
  const triangleColor = paintColor || getRandomColor();
  if (filled) beginFill(triangleColor);
  else color(triangleColor);

  for (let i = 0; i < 3; i++) {
    forward(size);
    right(120);
  }

  if (filled) endFill();
}


function drawArc(radius = 50, degrees = 180, paintColor = "", filled = false) {
  const arcColor = paintColor || getRandomColor();
  const segments = Math.max(6, Math.ceil(Math.abs(degrees) / 10));
  const stride = 2 * Math.PI * radius * Math.abs(degrees) / 360 / segments;
  const turn = degrees / segments;

  if (filled) beginFill(arcColor);
  else color(arcColor);

  for (let i = 0; i < segments; i++) {
    forward(stride);
    right(turn);
  }

  if (filled) endFill();
}


function drawCircle(radius = 50, paintColor = "", filled = false) {
  drawArc(radius, 360, paintColor, filled);
}


function drawHalfCircle(radius = 50, paintColor = "", filled = false) {
  drawArc(radius, 180, paintColor, filled);
}


function drawOvalArc(widthValue = 100, height = 50, degrees = 180, paintColor = "", filled = false) {
  const state = getTurtleState();
  const canvas = document.getElementById("imagecanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const ovalColor = paintColor || getRandomColor();

  ctx.save();
  ctx.translate(350, 350);
  ctx.transform(1, 0, 0, -1, 0, 0);
  ctx.beginPath();
  ctx.ellipse(state.x, state.y, widthValue / 2, height / 2, 0, 0, degrees * Math.PI / 180);
  if (filled) {
    ctx.lineTo(state.x, state.y);
    ctx.closePath();
    ctx.fillStyle = ovalColor;
    ctx.fill();
  }
  ctx.strokeStyle = ovalColor;
  ctx.stroke();
  ctx.restore();
  right(0);
}


function drawHalfOval(widthValue = 100, height = 50, paintColor = "", filled = false) {
  drawOvalArc(widthValue, height, 180, paintColor, filled);
}


function drawCloud(size = 60, paintColor = "white") {
  const start = getTurtleState();
  const points = [
    [-0.6, 0, 0.45],
    [-0.25, 0.2, 0.55],
    [0.2, 0.25, 0.65],
    [0.6, 0, 0.45],
  ];

  for (let i = 0; i < points.length; i++) {
    penup();
    goto(start.x + points[i][0] * size, start.y + points[i][1] * size);
    pendown();
    drawCircle(points[i][2] * size, paintColor, true);
  }

  penup();
  goto(start.x, start.y);
  pendown();
}


function drawDino(size = 70, paintColor = "LimeGreen", legAngle = 20) {
  const start = getTurtleState();
  const canvas = document.getElementById("imagecanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const legRotation = Math.max(-45, Math.min(legAngle, 45)) * Math.PI / 180;
  const footY = start.y - size * 0.8;

  ctx.save();
  ctx.translate(350, 350);
  ctx.transform(1, 0, 0, -1, 0, 0);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.fillStyle = paintColor;
  ctx.strokeStyle = paintColor;
  ctx.lineWidth = size * 0.12;

  ctx.beginPath();
  ctx.ellipse(start.x, start.y, size * 0.55, size * 0.32, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(start.x + size * 0.35, start.y + size * 0.15);
  ctx.lineTo(start.x + size * 0.75, start.y + size * 0.45);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(start.x + size * 0.9, start.y + size * 0.5, size * 0.22, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(start.x - size * 0.45, start.y + size * 0.05);
  ctx.lineTo(start.x - size * 0.9, start.y + size * 0.35);
  ctx.stroke();

  ctx.strokeStyle = "DarkGreen";
  ctx.beginPath();
  ctx.moveTo(start.x - size * 0.2, start.y - size * 0.25);
  ctx.lineTo(start.x - size * 0.2 - Math.sin(legRotation) * size * 0.35, footY + Math.max(0, -Math.sin(legRotation)) * size * 0.18);
  ctx.moveTo(start.x + size * 0.2, start.y - size * 0.25);
  ctx.lineTo(start.x + size * 0.2 + Math.sin(legRotation) * size * 0.35, footY + Math.max(0, Math.sin(legRotation)) * size * 0.18);
  ctx.stroke();

  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(start.x + size * 0.98, start.y + size * 0.58, size * 0.035, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  right(0);
}


function drawPacman(radius = 50, paintColor = "gold", mouth = 60, direction) {
  const start = getTurtleState();
  const directionDegrees = direction !== undefined ? direction : start.angleDeg;
  const mouthSize = Math.max(10, Math.min(mouth, 160));
  const canvas = document.getElementById("imagecanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  ctx.save();
  ctx.translate(350, 350);
  ctx.transform(1, 0, 0, -1, 0, 0);
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);

  const startAngle = (directionDegrees - mouthSize / 2) * Math.PI / 180;
  const endAngle = (directionDegrees + mouthSize / 2 - 360) * Math.PI / 180;
  for (let i = 0; i <= 40; i++) {
    const t = startAngle + (endAngle - startAngle) * i / 40;
    ctx.lineTo(start.x + Math.sin(t) * radius, start.y + Math.cos(t) * radius);
  }

  ctx.closePath();
  ctx.fillStyle = paintColor;
  ctx.strokeStyle = paintColor;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  right(0);
}


function drawStar(points = 5, size = 50, paintColor = "", filled = false) {
  if (points < 3) points = 3;
  const starColor = paintColor || getRandomColor();

  if (filled) beginFill(starColor);
  else color(starColor);


  let tipAngle = 180 / points;
  let valleyAngle = 540 / points;
  let turnRight = 180 - tipAngle;
  let turnLeft = 180 - valleyAngle;

  for (let i = 0; i < points; i++) {
    forward(size);
    right(turnRight);
    forward(size);
    left(turnLeft);
  }

  if (filled) endFill();
}


function drawFlower(petals = 6, size = 35, outerColor = "orchid", innerColor = "gold") {
  const start = getTurtleState();
  for (let i = 0; i < petals; i++) {
    const direction = (start.angleDeg + i * 360 / petals) * Math.PI / 180;
    goto(start.x + Math.sin(direction) * size * 1.65,
      start.y + Math.cos(direction) * size * 1.65);
    drawOvalArc(size * 2, size * 2, 360, outerColor, true);
  }
  goto(start.x, start.y);
  drawOvalArc(size * 1.7, size * 1.7, 360, innerColor, true);
  angle(start.angleDeg);
}


function jumpRandom() {
  penup();
  goto(getRandomNumber(-300, 300), getRandomNumber(-300, 300));
  pendown();
}


function drawSpiral(steps = 100, turn = 61, paintColor) {
  if (steps > 1000) steps = 1000;
  for (let i = 0; i < steps; i++) {
    const stepColor = Array.isArray(paintColor) && paintColor.length
      ? paintColor[i % paintColor.length] : paintColor || getRandomColor();
    color(stepColor);
    forward(i * 2);
    right(turn);
  }
}










(function () {
  const originalForward = window.forward;
  const originalGoto = window.goto;
  const originalRight = window.right;
  let currentPath = null, fillColor = "black";
  window.forward = function (distance) {
    originalForward(distance);
    if (currentPath) currentPath.push(getTurtleState());
  };
  window.goto = function (x, y) {
    originalGoto(x, y);
    if (currentPath) currentPath.push(getTurtleState());
  };
  window.beginFill = function (paintColor) {
    fillColor = paintColor || "black";
    if (paintColor) color(paintColor);
    currentPath = [getTurtleState()];
  };
  window.endFill = function (paintColor) {
    if (!currentPath) return;
    const ctx = document.getElementById("imagecanvas").getContext("2d");
    ctx.save(); ctx.translate(350,350); ctx.scale(1,-1);
    ctx.beginPath(); ctx.moveTo(currentPath[0].x,currentPath[0].y);
    for (const point of currentPath.slice(1)) ctx.lineTo(point.x,point.y);
    ctx.closePath(); ctx.fillStyle=paintColor || fillColor; ctx.fill(); ctx.stroke(); ctx.restore();
    currentPath=null; originalRight(0);
  };
})();


function drawButterfly(size = 60, paintColor = "royalblue", wingAngle = 35) {
  if (!Number.isFinite(wingAngle) || !Number.isFinite(size) || size <= 0) {
    throw new Error("Size must be positive; wingAngle must be a finite number.");
  }
  const start = getTurtleState();
  const rotation = Math.max(0, Math.min(90, wingAngle));
  const ctx = document.getElementById("imagecanvas").getContext("2d");
  const previousWidth = ctx.lineWidth;
  const previousColor = ctx.strokeStyle;
  penup();
  goto(start.x, start.y);
  angle(start.angleDeg);
  pendown();
  color("black");
  width(size * 8 / 60);
  forward(size * 2 / 3);


  const rad = start.angleDeg * Math.PI / 180;
  const centerX = start.x + Math.sin(rad) * size / 3;
  const centerY = start.y + Math.cos(rad) * size / 3;
  color(paintColor);
  width(size * 4 / 60);
  for (const side of [-1, 1]) {
    penup();
    goto(centerX, centerY);
    angle(start.angleDeg + side * rotation);
    pendown();
    beginFill(paintColor);
    for (let edge = 0; edge < 3; edge++) {
      forward(size);
      if (side === 1) right(120);
      else left(120);
    }
    endFill();
  }
  penup();
  goto(start.x, start.y);
  angle(start.angleDeg);
  width(previousWidth);
  color(previousColor);
  pendown();
}




function withFigureCanvas(size, paint) {
  if (!Number.isFinite(size) || size <= 0) throw new Error("Figure size must be a positive finite number.");
  const canvas = document.getElementById("imagecanvas");
  if (!canvas) return;
  const position = getTurtleState();
  const ctx = canvas.getContext("2d");
  ctx.save();
  ctx.translate(canvas.width / 2 + position.x, canvas.height / 2 - position.y);
  ctx.scale(size / 100, size / 100);
  try { paint(ctx); } finally { ctx.restore(); }
  // Refresh through the engine so redrawOnMove(false) still permits batched drawing.
  right(0);
}

function drawJet(size = 120) {
  withFigureCanvas(size, ctx => {
    ctx.fillStyle = "#647b93";
    ctx.beginPath();
    ctx.moveTo(-68, -9); ctx.lineTo(50, -9); ctx.lineTo(72, 0);
    ctx.lineTo(50, 9); ctx.lineTo(-68, 9); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#405b77";
    ctx.beginPath();
    ctx.moveTo(-20, -5); ctx.lineTo(-52, -40); ctx.lineTo(18, -5);
    ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-20, 5); ctx.lineTo(-52, 40); ctx.lineTo(18, 5);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#89d6ed";
    ctx.beginPath(); ctx.ellipse(25, -9, 20, 8, 0, Math.PI, 2 * Math.PI); ctx.fill();
    ctx.fillStyle = "#e37e45";
    ctx.beginPath(); ctx.moveTo(-69, -5); ctx.lineTo(-84, 0); ctx.lineTo(-69, 5); ctx.fill();
  });
}

function drawBomb(size = 50) {
  withFigureCanvas(size, ctx => {
    ctx.fillStyle = "#516275";
    ctx.beginPath(); ctx.ellipse(0, 0, 24, 36, 0, 0, 2 * Math.PI); ctx.fill();
    ctx.fillStyle = "#8fa3b5";
    ctx.beginPath(); ctx.moveTo(-24, -23); ctx.lineTo(-36, -48);
    ctx.lineTo(-9, -30); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(24, -23); ctx.lineTo(36, -48);
    ctx.lineTo(9, -30); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#30445a";
    ctx.beginPath(); ctx.moveTo(-17, 29); ctx.lineTo(0, 48);
    ctx.lineTo(17, 29); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#eab54c";
    ctx.beginPath(); ctx.arc(0, -5, 6, 0, 2 * Math.PI); ctx.fill();
  });
}

function drawFireball(size = 80) {
  withFigureCanvas(size, ctx => {
    for (const [radius, paintColor] of [[50, "#e84b35"], [34, "#ff923a"], [18, "#ffe665"]]) {
      ctx.fillStyle = paintColor;
      ctx.beginPath(); ctx.arc(0, 0, radius, 0, 2 * Math.PI); ctx.fill();
    }
  });
}

function drawDog(size = 90, facing = "right", tailAngle = 0, legAngle = 0) {
  if (facing !== "right" && facing !== "left") throw new Error('Facing must be right or left.');
  if (!Number.isFinite(tailAngle) || !Number.isFinite(legAngle)) throw new Error("Tail and leg angles must be finite numbers.");
  withFigureCanvas(size, ctx => {
    if (facing === "left") ctx.scale(-1, 1);
    const stride = Math.sin(legAngle * Math.PI / 180) * 13;
    ctx.strokeStyle = "#a86d3e";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    for (const [x, offset] of [[-27, stride], [-16, -stride], [19, -stride], [30, stride]]) {
      ctx.beginPath(); ctx.moveTo(x, -18); ctx.lineTo(x + offset, 0); ctx.stroke();
    }
    ctx.save();
    ctx.translate(-40, -38);
    ctx.rotate(tailAngle * Math.PI / 180);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-25, -22); ctx.stroke();
    ctx.restore();
    ctx.fillStyle = "#c88a50";
    ctx.beginPath(); ctx.ellipse(0, -35, 42, 24, 0, 0, 2 * Math.PI); ctx.fill();
    ctx.beginPath(); ctx.arc(36, -51, 23, 0, 2 * Math.PI); ctx.fill();
    ctx.fillStyle = "#895332";
    ctx.beginPath(); ctx.ellipse(24, -67, 10, 20, -0.3, 0, 2 * Math.PI); ctx.fill();
    ctx.fillStyle = "#e4ae72";
    ctx.beginPath(); ctx.ellipse(51, -44, 18, 11, 0, 0, 2 * Math.PI); ctx.fill();
    ctx.fillStyle = "#27313a";
    ctx.beginPath(); ctx.arc(41, -58, 3, 0, 2 * Math.PI); ctx.fill();
    ctx.beginPath(); ctx.arc(65, -46, 4, 0, 2 * Math.PI); ctx.fill();
  });
}

function drawFerrisWheel(size = 300, rotation = 0) {
  if (!Number.isFinite(rotation)) throw new Error("Rotation must be a finite number.");
  withFigureCanvas(size, ctx => {
    ctx.strokeStyle = "#65768a";
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-24, 77);
    ctx.moveTo(0, 0); ctx.lineTo(24, 77); ctx.stroke();
    ctx.strokeStyle = "#2c87b1";
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(0, 0, 50, 0, 2 * Math.PI); ctx.stroke();
    const turn = rotation * Math.PI / 180;
    for (let i = 0; i < 8; i++) {
      const rad = turn + i * Math.PI / 4;
      const x = Math.sin(rad) * 50;
      const y = Math.cos(rad) * 50;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(x, y); ctx.stroke();
      ctx.strokeStyle = "#65768a";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 9); ctx.stroke();
      ctx.fillStyle = ["#e96962", "#f2bd5c", "#69bea9", "#809fe0"][i % 4];
      ctx.fillRect(x - 8, y + 9, 16, 9);
      ctx.strokeStyle = "#2c87b1";
      ctx.lineWidth = 3;
    }
    ctx.fillStyle = "#40566f";
    ctx.beginPath(); ctx.arc(0, 0, 5, 0, 2 * Math.PI); ctx.fill();
  });
}



function drawFish(size = 90, paintColor = "orange", facing = "right", tailAngle = 0) {
  withFigureCanvas(size, ctx => {
    ctx.scale(facing === "left" ? -1 : 1, 1);
    ctx.fillStyle = paintColor;
    ctx.save(); ctx.translate(-30, 0); ctx.rotate(tailAngle * Math.PI / 180);
    ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(-25, -23); ctx.lineTo(-25, 23); ctx.closePath(); ctx.fill(); ctx.restore();
    ctx.beginPath(); ctx.ellipse(0, 0, 38, 22, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "white"; ctx.beginPath(); ctx.arc(22, -6, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#172638"; ctx.beginPath(); ctx.arc(24, -6, 3, 0, Math.PI * 2); ctx.fill();
  });
}


function drawSubmarine(size = 160, paintColor = "gold") {
  withFigureCanvas(size, ctx => {
    ctx.fillStyle = paintColor; ctx.fillRect(-10, -32, 22, 20); ctx.fillRect(-3, -48, 7, 20); ctx.fillRect(-3, -48, 20, 7);
    ctx.beginPath(); ctx.ellipse(0, 0, 45, 23, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillRect(-53, -15, 12, 30);
    ctx.fillStyle = "#a9eafa";
    for (let x of [-24, 0, 24]) { ctx.beginPath(); ctx.arc(x, 0, 8, 0, Math.PI * 2); ctx.fill(); }
  });
}


function drawRocket(size = 110, paintColor = "coral", rotation = 0) {
  withFigureCanvas(size, ctx => {
    ctx.rotate(rotation * Math.PI / 180);
    ctx.fillStyle = paintColor;
    ctx.beginPath(); ctx.moveTo(0, -50); ctx.lineTo(18, -20); ctx.lineTo(18, 32); ctx.lineTo(32, 48); ctx.lineTo(8, 40); ctx.lineTo(-8, 40); ctx.lineTo(-32, 48); ctx.lineTo(-18, 32); ctx.lineTo(-18, -20); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "white"; ctx.fillRect(-13, -18, 26, 45);
    ctx.fillStyle = "DeepSkyBlue"; ctx.beginPath(); ctx.arc(0, -3, 9, 0, Math.PI * 2); ctx.fill();
  });
}


function drawFirework(size = 120, paintColor = "gold", rotation = 0, rays = 24) {
  if (!Number.isInteger(rays) || rays < 3 || rays > 120) throw new Error("Use 3 to 120 integer rays.");
  withFigureCanvas(size, ctx => {
    ctx.rotate(rotation * Math.PI / 180); ctx.strokeStyle = paintColor; ctx.lineWidth = 2;
    for (let i = 0; i < rays; i++) {
      let a = i * Math.PI * 2 / rays;
      let length = i % 2 === 0 ? 50 : 37;
      ctx.beginPath(); ctx.moveTo(Math.cos(a) * length * 0.65, Math.sin(a) * length * 0.65);
      ctx.lineTo(Math.cos(a) * length, Math.sin(a) * length); ctx.stroke();
    }
  });
}


function jumpHeight(tick, height = 100, duration = 40) {
  if (tick < 0 || tick > duration || duration <= 0) return 0;
  return Math.sin(Math.PI * tick / duration) * height;
}
window.setBackground = setBackground;
window.setzeHintergrund = setBackground;
window.setDualBackground = setDualBackground;
window.setzeZweiFarbenHintergrund = setDualBackground;
window.setTiltedBackground = setTiltedBackground;
window.setzeGedrehtenHintergrund = setTiltedBackground;
window.setTextColor = setTextColor;
window.setzeSchriftFarbe = setTextColor;
window.setTextSize = setTextSize;
window.setzeSchriftGroesse = setTextSize;
window.writeText = writeText;
window.schreibeText = writeText;
window.drawCircle = drawCircle;
window.zeichneKreis = drawCircle;
window.drawHalfCircle = drawHalfCircle;
window.zeichneHalbkreis = drawHalfCircle;
window.drawOvalArc = drawOvalArc;
window.zeichneOvalBogen = drawOvalArc;
window.drawHalfOval = drawHalfOval;
window.zeichneHalbOval = drawHalfOval;
window.drawRect = drawRect;
window.zeichneRechteck = drawRect;
window.drawTriangle = drawTriangle;
window.zeichneDreieck = drawTriangle;
window.drawStar = drawStar;
window.zeichneStern = drawStar;
window.drawFlower = drawFlower;
window.zeichneBlume = drawFlower;
window.drawCloud = drawCloud;
window.zeichneWolke = drawCloud;
window.drawDino = drawDino;
window.zeichneDino = drawDino;
window.drawPacman = drawPacman;
window.zeichnePacman = drawPacman;
window.drawButterfly = drawButterfly;
window.zeichneSchmetterling = drawButterfly;
window.drawFish = drawFish;
window.zeichneFisch = (size=90,paintColor="orange",facing="rechts",tailAngle=0) => drawFish(size,paintColor,facing==="rechts"?"right":facing==="links"?"left":facing,tailAngle);
window.drawSubmarine = drawSubmarine;
window.zeichneUboot = drawSubmarine;
window.drawRocket = drawRocket;
window.zeichneRakete = drawRocket;
window.drawFirework = drawFirework;
window.zeichneFeuerwerk = drawFirework;
window.drawJet = drawJet;
window.zeichneJet = drawJet;
window.drawBomb = drawBomb;
window.zeichneSprengkoerper = drawBomb;
window.drawFireball = drawFireball;
window.zeichneFeuerball = drawFireball;
window.drawDog = drawDog;
window.zeichneHund = (size=90,facing="rechts",tailAngle=0,legAngle=0) => drawDog(size,facing==="rechts"?"right":facing==="links"?"left":facing,tailAngle,legAngle);
window.drawFerrisWheel = drawFerrisWheel;
window.zeichneRiesenrad = drawFerrisWheel;
window.drawLine = drawLine;
window.zeichneLinie = drawLine;
window.drawArc = drawArc;
window.zeichneBogen = drawArc;
window.drawSpiral = drawSpiral;
window.zeichneSpirale = drawSpiral;
window.jumpHeight = jumpHeight;
window.sprungHoehe = jumpHeight;
window.getRandomNumber = getRandomNumber;
window.zufallsZahl = getRandomNumber;
window.getRandomColor = getRandomColor;
window.zufallsFarbe = getRandomColor;
window.jumpRandom = jumpRandom;
window.springeZufaellig = jumpRandom;
window.hideArrow = hideArrow;
window.versteckePfeil = hideArrow;
window.geheZu = window.goto;
window.setzeWinkel = window.angle;
window.vorwaerts = window.forward;
window.rechts = window.right;
window.links = window.left;
window.stiftHoch = window.penup;
window.stiftRunter = window.pendown;
window.setzeFarbe = window.color;
window.setzeBreite = window.width;
window.beginneFuellung = window.beginFill;
window.beendeFuellung = window.endFill;
window.loesche = window.clear;
window.versteckeTurtle = window.hideTurtle;
window.zeichne = window.draw;
window.setzeRandUmbruch = window.wrap;
window.zeichneBeiBewegung = window.redrawOnMove;
window.liesTurtleZustand = window.getTurtleState;
window.schreibe = window.write;
window.setzeSchrift = window.setFont;
window.naechstesBild = window.requestAnimationFrame;
window.brecheBildAb = window.cancelAnimationFrame;
window.verzoegere = window.setTimeout;
window.beendeVerzoegerung = window.clearTimeout;
window.wiederholeZeitlich = window.setInterval;
window.beendeZeitlicheWiederholung = window.clearInterval;
window.radianInGrad = window.radToDeg;
window.gradInRadian = window.degToRad;
window.liesPosition = window.position;
window.liesRichtung = window.heading;
window.abstandZu = window.distanceTo;
window.richtungZu = window.directionTo;
window.rueckwaerts = window.backward;
window.zurMitte = window.home;
window.zeigeTurtle = window.showTurtle;
window.istSichtbar = window.isVisible;
window.istStiftUnten = window.isPenDown;
window.beiTaste = window.onKey;
window.beiKlick = window.onClick;
for (const obsolete of ["setSpeed","showGrid","strangeSquare","strangeGalaxy","strangeCircle","strangeLine","colour","randomColor_h","drawIf"]) delete window[obsolete];
})();
