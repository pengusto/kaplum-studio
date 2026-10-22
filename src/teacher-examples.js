export const teacherExamples = [
  {
    id: "pacman-move",
    title: "Move Pacman across the screen",
    category: "movement",
    concepts: ["variables", "conditions"],
    goal: "Make Pacman move faster and return at the edge.",
    steps: ["Run the program and watch Pacman.", "Change speed from 3 to 5."],
    extension: "Change the Pacman colour from Gold to Red.",
    starter: `// Change speed to make Pacman move faster.
let x = -250;
let speed = 3;
function loop() {
  setBackground("SkyBlue");
  goto(x, 0);
  angle(90);
  drawPacman(40, "Gold", 60);
  x = x + speed;
  if (x > 400) x = -400;
  hideArrow();
  requestAnimationFrame(loop);
}
loop();
`,
    solution: `// Change speed to make Pacman move faster.
let x = -250;
let speed = 5;
function loop() {
  setBackground("SkyBlue");
  goto(x, 0);
  angle(90);
  drawPacman(40, "Gold", 60);
  x = x + speed;
  if (x > 400) x = -400;
  hideArrow();
  requestAnimationFrame(loop);
}
loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/startcode.js",
    disposition: "included",
  },
  {
    id: "moving-star",
    title: "Move and turn",
    category: "movement",
    concepts: ["variables", "conditions"],
    goal: "Make the star move faster while it turns.",
    steps: ["Run the code and watch what changes.", "Change the movement from x + 3 to x + 6."],
    extension: "Change the star from five points to eight.",
    starter: `// Change the movement from x + 3 to x + 6.
wrap(false);
let x = -250;
let turn = 0;

function loop() {
  setBackground("#eaf5ff");

  goto(0, 230);
  angle(0);
  writeText("Keep going!", 28);

  goto(x, 0);
  angle(turn);
  drawStar(5, 55, "#ec9640", true);

  x = x + 3;
  turn = turn + 2;
  if (x > 410) {
    x = -410;
  }
  hideArrow();
  requestAnimationFrame(loop);
}

loop();
`,
    solution: `// Teacher solution: Change the movement from x + 3 to x + 6.
let x = -250;
let turn = 0;

function loop() {
  setBackground("#eaf5ff");

  goto(0, 230);
  angle(0);
  writeText("Keep going!", 28);

  goto(x, 0);
  angle(turn);
  drawStar(5, 55, "#ec9640", true);

  x = x + 6;
  turn = turn + 2;
  if (x > 410) {
    x = -410;
  }
  hideArrow();
  requestAnimationFrame(loop);
}

loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/01-bewegung/demo.js",
    disposition: "included",
  },
  {
    id: "bouncing-ball",
    title: "Bounce a ball",
    category: "movement",
    concepts: ["variables", "conditions"],
    goal: "Make the ball move more slowly and stay inside the canvas.",
    steps: ["Run the code and watch what changes.", "Change speedX from 4 to 2."],
    extension: "Try speedY = 0 and watch the path.",
    starter: `// Change speedX from 4 to 2.
let x = 0;
let y = 0;
let speedX = 4;
let speedY = 3;
let radius = 35;
let ballColor = "tomato";

function loop() {
  setBackground("#182c40");
  goto(x, y);

  drawOvalArc(radius * 2, radius * 2, 360, ballColor, true);

  x = x + speedX;
  y = y + speedY;

  const edge = 350 - radius;
  if (x >= edge || x <= -edge) {
    x = Math.max(-edge, Math.min(edge, x));
    speedX = -speedX;
    ballColor = getRandomColor();
  }
  if (y >= edge || y <= -edge) {
    y = Math.max(-edge, Math.min(edge, y));
    speedY = -speedY;
    ballColor = getRandomColor();
  }
  hideArrow();
  requestAnimationFrame(loop);
}

loop();
`,
    solution: `// Teacher solution: Change speedX from 4 to 2.
let x = 0;
let y = 0;
let speedX = 2;
let speedY = 3;
let radius = 35;
let ballColor = "tomato";

function loop() {
  setBackground("#182c40");
  goto(x, y);

  drawOvalArc(radius * 2, radius * 2, 360, ballColor, true);

  x = x + speedX;
  y = y + speedY;

  const edge = 350 - radius;
  if (x >= edge || x <= -edge) {
    x = Math.max(-edge, Math.min(edge, x));
    speedX = -speedX;
    ballColor = getRandomColor();
  }
  if (y >= edge || y <= -edge) {
    y = Math.max(-edge, Math.min(edge, y));
    speedY = -speedY;
    ballColor = getRandomColor();
  }
  hideArrow();
  requestAnimationFrame(loop);
}

loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/02-abprallen/demo.js",
    disposition: "included",
  },
  {
    id: "butterfly-garden",
    title: "Fly over a garden",
    category: "scenes",
    concepts: ["variables", "for-loops", "conditions"],
    goal: "Slow down the butterfly’s flapping above the flowers.",
    steps: ["Run the code and watch what changes.", "Change wingSpeed from 2 to 1."],
    extension: "Change the butterfly colour to coral.",
    starter: `// Change wingSpeed from 2 to 1.
let flightAngle = 0;
let wings = 20;
let wingSpeed = 2;
let cloudX = 80;

function loop() {
  setDualBackground("#cbefff", "#8bc594", -180);

  goto(cloudX, 190);
  angle(0);
  drawCloud(55);

  for (let flowerX = -240; flowerX <= 240; flowerX = flowerX + 120) {
    goto(flowerX, -225);
    angle(0);
    color("#347452");
    width(4);
    forward(140);
    goto(flowerX - 14, -165);
    drawOvalArc(32, 12, 360, "#419766", true);
    goto(flowerX + 14, -155);
    drawOvalArc(32, 12, 360, "#419766", true);
    goto(flowerX, -85);
    drawFlower(6, 18, "#f08cad", "#ffd966");
  }

  let rad = flightAngle * Math.PI / 180;
  goto(Math.cos(rad) * 140, 50 + Math.sin(rad) * 140);
  angle(-flightAngle);
  drawButterfly(70, "royalblue", wings);

  flightAngle = (flightAngle + 1) % 360;

  wings = wings + wingSpeed;
  if (wings >= 74 || wings <= 20) {
    wingSpeed = -wingSpeed;
  }

  cloudX = cloudX - 0.5;
  if (cloudX < -420) cloudX = 420;
  hideArrow();
  requestAnimationFrame(loop);
}

loop();
`,
    solution: `// Teacher solution: Change wingSpeed from 2 to 1.
let flightAngle = 0;
let wings = 20;
let wingSpeed = 1;
let cloudX = 80;

function loop() {
  setDualBackground("#cbefff", "#8bc594", -180);

  goto(cloudX, 190);
  angle(0);
  drawCloud(55);

  for (let flowerX = -240; flowerX <= 240; flowerX = flowerX + 120) {
    goto(flowerX, -225);
    angle(0);
    color("#347452");
    width(4);
    forward(140);
    goto(flowerX - 14, -165);
    drawOvalArc(32, 12, 360, "#419766", true);
    goto(flowerX + 14, -155);
    drawOvalArc(32, 12, 360, "#419766", true);
    goto(flowerX, -85);
    drawFlower(6, 18, "#f08cad", "#ffd966");
  }

  let rad = flightAngle * Math.PI / 180;
  goto(Math.cos(rad) * 140, 50 + Math.sin(rad) * 140);
  angle(-flightAngle);
  drawButterfly(70, "royalblue", wings);

  flightAngle = (flightAngle + 1) % 360;

  wings = wings + wingSpeed;
  if (wings >= 74 || wings <= 20) {
    wingSpeed = -wingSpeed;
  }

  cloudX = cloudX - 0.5;
  if (cloudX < -420) cloudX = 420;
  hideArrow();
  requestAnimationFrame(loop);
}

loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/03-schmetterling/demo.js",
    disposition: "included",
  },
  {
    id: "day-night-garden",
    title: "Day and night",
    category: "scenes",
    concepts: ["functions", "conditions", "arrays"],
    goal: "Choose a darker sky for the night scene.",
    steps: ["Run the code and watch what changes.", "Change nightSky from MediumBlue to MidnightBlue."],
    extension: "Change the sun movement from + 2 to + 4.",
    starter: `// Change nightSky from MediumBlue to MidnightBlue.
let sunX = -280;
let isDay = true;
let cloudX = -280;
let rotation = -12;
let swaySpeed = 0.25;
let starAngle = 0;
let nightSky = "MediumBlue";

wrap(false);
hideTurtle();
redrawOnMove(false);

function drawSwayingFlower(x, paintColor) {
  penup();
  goto(x, -170);
  angle(rotation);
  pendown();
  color("#3c9d59");
  width(6);
  forward(35);
  penup();
  left(90);
  forward(18);
  drawOvalArc(38, 16, 360, "#4aaf6b", true);
  right(180);
  forward(36);
  drawOvalArc(38, 16, 360, "#4aaf6b", true);
  right(180);
  forward(18);
  right(90);
  pendown();
  forward(90);
  drawFlower(6, 20, paintColor, "#ffd65e");
}

function loop() {
  if (isDay) {
    setDualBackground("DeepSkyBlue", "GreenYellow", -150);
  } else {
    setDualBackground(nightSky, "DarkGreen", -150);
  }

  if (isDay) {
    goto(cloudX, 190);
    angle(0);
    drawCloud(55, "white");
  } else {
    for (let x of [-230, -40, 150]) {
      goto(x, 120);
      angle(starAngle);
      drawStar(5, 22, "Gold", true);
    }
  }

  goto(sunX, 210);
  if (isDay) {
    drawOvalArc(74, 74, 360, "Gold", true);
  } else {
    drawOvalArc(74, 74, 360, "#fff3ce", true);
    goto(sunX + 22, 218);
    drawOvalArc(68, 68, 360, nightSky, true);
  }

  drawSwayingFlower(-180, "#f78ab6");
  drawSwayingFlower(0, "#ffba65");
  drawSwayingFlower(180, "#a99cf1");

  sunX = sunX + 2;
  if (sunX > 280) {
    sunX = -280;
    isDay = !isDay;
  }
  cloudX = cloudX + 0.8;
  if (cloudX > 380) cloudX = -380;
  rotation = rotation + swaySpeed;
  if (rotation >= 12 || rotation <= -12) swaySpeed = -swaySpeed;
  starAngle = starAngle + 0.4;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    solution: `// Teacher solution: Change nightSky from MediumBlue to MidnightBlue.
let sunX = -280;
let isDay = true;
let cloudX = -280;
let rotation = -12;
let swaySpeed = 0.25;
let starAngle = 0;
let nightSky = "MidnightBlue";

wrap(false);
hideTurtle();
redrawOnMove(false);

function drawSwayingFlower(x, paintColor) {
  penup();
  goto(x, -170);
  angle(rotation);
  pendown();
  color("#3c9d59");
  width(6);
  forward(35);
  penup();
  left(90);
  forward(18);
  drawOvalArc(38, 16, 360, "#4aaf6b", true);
  right(180);
  forward(36);
  drawOvalArc(38, 16, 360, "#4aaf6b", true);
  right(180);
  forward(18);
  right(90);
  pendown();
  forward(90);
  drawFlower(6, 20, paintColor, "#ffd65e");
}

function loop() {
  if (isDay) {
    setDualBackground("DeepSkyBlue", "GreenYellow", -150);
  } else {
    setDualBackground(nightSky, "DarkGreen", -150);
  }

  if (isDay) {
    goto(cloudX, 190);
    angle(0);
    drawCloud(55, "white");
  } else {
    for (let x of [-230, -40, 150]) {
      goto(x, 120);
      angle(starAngle);
      drawStar(5, 22, "Gold", true);
    }
  }

  goto(sunX, 210);
  if (isDay) {
    drawOvalArc(74, 74, 360, "Gold", true);
  } else {
    drawOvalArc(74, 74, 360, "#fff3ce", true);
    goto(sunX + 22, 218);
    drawOvalArc(68, 68, 360, nightSky, true);
  }

  drawSwayingFlower(-180, "#f78ab6");
  drawSwayingFlower(0, "#ffba65");
  drawSwayingFlower(180, "#a99cf1");

  sunX = sunX + 2;
  if (sunX > 280) {
    sunX = -280;
    isDay = !isDay;
  }
  cloudX = cloudX + 0.8;
  if (cloudX > 380) cloudX = -380;
  rotation = rotation + swaySpeed;
  if (rotation >= 12 || rotation <= -12) swaySpeed = -swaySpeed;
  starAngle = starAngle + 0.4;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/04-tag-nacht/demo.js",
    disposition: "included",
  },
  {
    id: "pacman-route",
    title: "Turn at the corners",
    category: "movement",
    concepts: ["conditions", "variables"],
    goal: "Slow down the mouth while Pacman turns at the corners.",
    steps: ["Run the code and watch what changes.", "Change mouthSpeed from 2 to 1."],
    extension: "Change the Pacman colour from gold to coral.",
    starter: `// Change mouthSpeed from 2 to 1.
let x = -230;
let y = -170;
let direction = 90;
let mouth = 20;
let mouthSpeed = 2;

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setBackground("#eaf5ff");
  goto(x, y);
  drawPacman(45, "gold", mouth, direction);

  if (direction === 90) {
    x = x + 3;
    if (x >= 230) direction = 0;
  } else if (direction === 0) {
    y = y + 3;
    if (y >= 170) direction = 270;
  } else if (direction === 270) {
    x = x - 3;
    if (x <= -230) direction = 180;
  } else {
    y = y - 3;
    if (y <= -170) direction = 90;
  }
  mouth = mouth + mouthSpeed;
  if (mouth >= 80 || mouth <= 20) mouthSpeed = -mouthSpeed;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    solution: `// Teacher solution: Change mouthSpeed from 2 to 1.
let x = -230;
let y = -170;
let direction = 90;
let mouth = 20;
let mouthSpeed = 1;

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setBackground("#eaf5ff");
  goto(x, y);
  drawPacman(45, "gold", mouth, direction);

  if (direction === 90) {
    x = x + 3;
    if (x >= 230) direction = 0;
  } else if (direction === 0) {
    y = y + 3;
    if (y >= 170) direction = 270;
  } else if (direction === 270) {
    x = x - 3;
    if (x <= -230) direction = 180;
  } else {
    y = y - 3;
    if (y <= -170) direction = 90;
  }
  mouth = mouth + mouthSpeed;
  if (mouth >= 80 || mouth <= 20) mouthSpeed = -mouthSpeed;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/ideen/pacman.js",
    disposition: "included",
  },
  {
    id: "walking-dino",
    title: "Make a dinosaur walk",
    category: "movement",
    concepts: ["variables", "conditions"],
    goal: "Slow down the dinosaur’s footsteps.",
    steps: ["Run the code and watch what changes.", "Change legSpeed from 2 to 1."],
    extension: "Change the dinosaur size from 85 to 100.",
    starter: `// Change legSpeed from 2 to 1.
let x = -200;
let leg = -30;
let legSpeed = 2;

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setBackground("#eaf5ff");
  goto(x, 0);
  drawDino(85, "LimeGreen", leg);

  x = x + 2;
  if (x > 280) x = -280;

  leg = leg + legSpeed;
  if (leg >= 30 || leg <= -30) {
    legSpeed = -legSpeed;
  }

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    solution: `// Teacher solution: Change legSpeed from 2 to 1.
let x = -200;
let leg = -30;
let legSpeed = 1;

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setBackground("#eaf5ff");
  goto(x, 0);
  drawDino(85, "LimeGreen", leg);

  x = x + 2;
  if (x > 280) x = -280;

  leg = leg + legSpeed;
  if (leg >= 30 || leg <= -30) {
    legSpeed = -legSpeed;
  }

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/ideen/dino.js",
    disposition: "included",
  },
  {
    id: "jumping-dino",
    title: "Jump and land",
    category: "movement",
    concepts: ["variables", "functions", "conditions"],
    goal: "Make the dinosaur jump higher and land again.",
    steps: ["Run the code and watch what changes.", "Change the jump height from 120 to 160."],
    extension: "Change the jump duration from 36 to 60.",
    starter: `// Change the jump height from 120 to 160.
let tick = 0;

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setDualBackground("SkyBlue", "PaleGreen", -170);
  let shapeHeight = jumpHeight(tick, 120, 36);
  goto(0, -145 + shapeHeight);
  drawDino(85, "LimeGreen", 15);

  tick = tick + 1;
  if (tick >= 90) tick = 0;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    solution: `// Teacher solution: Change the jump height from 120 to 160.
let tick = 0;

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setDualBackground("SkyBlue", "PaleGreen", -170);
  let shapeHeight = jumpHeight(tick, 160, 36);
  goto(0, -145 + shapeHeight);
  drawDino(85, "LimeGreen", 15);

  tick = tick + 1;
  if (tick >= 90) tick = 0;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/ideen/sprung.js",
    disposition: "included",
  },
  {
    id: "butterfly-circle",
    title: "Fly in a circle",
    category: "movement",
    concepts: ["variables", "conditions"],
    goal: "Slow down the wings while the butterfly flies in a circle.",
    steps: ["Run the code and watch what changes.", "Change wingSpeed from 2 to 1."],
    extension: "Change both circle sizes from 150 to 100.",
    starter: `// Change wingSpeed from 2 to 1.
let flightAngle = 0;
let wings = 20;
let wingSpeed = 2;

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setBackground("#eaf5ff");

  let rad = flightAngle * Math.PI / 180;
  goto(Math.cos(rad) * 150, Math.sin(rad) * 150);
  angle(-flightAngle);
  drawButterfly(70, "royalblue", wings);

  flightAngle = (flightAngle + 1) % 360;
  wings = wings + wingSpeed;
  if (wings >= 74 || wings <= 20) {
    wingSpeed = -wingSpeed;
  }

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    solution: `// Teacher solution: Change wingSpeed from 2 to 1.
let flightAngle = 0;
let wings = 20;
let wingSpeed = 1;

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setBackground("#eaf5ff");

  let rad = flightAngle * Math.PI / 180;
  goto(Math.cos(rad) * 150, Math.sin(rad) * 150);
  angle(-flightAngle);
  drawButterfly(70, "royalblue", wings);

  flightAngle = (flightAngle + 1) % 360;
  wings = wings + wingSpeed;
  if (wings >= 74 || wings <= 20) {
    wingSpeed = -wingSpeed;
  }

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/ideen/schmetterling.js",
    disposition: "included",
  },
  {
    id: "solar-system",
    title: "Orbit the sun",
    category: "scenes",
    concepts: ["variables", "functions"],
    goal: "Slow down the planets around the sun.",
    steps: ["Run the code and watch what changes.", "Change rotation + 1 to rotation + 0.5."],
    extension: "Change the Earth colour to lime.",
    starter: `// Change rotation + 1 to rotation + 0.5.
let rotation = 0;

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setBackground("#101c38");
  goto(0, 0);
  drawOvalArc(340, 340, 360, "#55708c");
  drawOvalArc(510, 510, 360, "#55708c");
  drawOvalArc(70, 70, 360, "gold", true);

  let rad = rotation * Math.PI / 180;
  let earthX = Math.cos(rad) * 170;
  let earthY = Math.sin(rad) * 170;
  goto(earthX, earthY);
  drawOvalArc(32, 32, 360, "deepskyblue", true);
  goto(earthX + Math.cos(rad * 4) * 35,
       earthY + Math.sin(rad * 4) * 35);
  drawOvalArc(12, 12, 360, "white", true);
  goto(Math.cos(rad * 0.6) * 255,
       Math.sin(rad * 0.6) * 255);
  drawOvalArc(22, 22, 360, "tomato", true);

  rotation = rotation + 1;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    solution: `// Teacher solution: Change rotation + 1 to rotation + 0.5.
let rotation = 0;

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setBackground("#101c38");
  goto(0, 0);
  drawOvalArc(340, 340, 360, "#55708c");
  drawOvalArc(510, 510, 360, "#55708c");
  drawOvalArc(70, 70, 360, "gold", true);

  let rad = rotation * Math.PI / 180;
  let earthX = Math.cos(rad) * 170;
  let earthY = Math.sin(rad) * 170;
  goto(earthX, earthY);
  drawOvalArc(32, 32, 360, "deepskyblue", true);
  goto(earthX + Math.cos(rad * 4) * 35,
       earthY + Math.sin(rad * 4) * 35);
  drawOvalArc(12, 12, 360, "white", true);
  goto(Math.cos(rad * 0.6) * 255,
       Math.sin(rad * 0.6) * 255);
  drawOvalArc(22, 22, 360, "tomato", true);

  rotation = rotation + 0.5;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/ideen/sonnensystem.js",
    disposition: "included",
  },
  {
    id: "rainbow-cat",
    title: "A rainbow cat",
    category: "scenes",
    concepts: ["functions", "arrays", "for-loops"],
    goal: "Slow down the cat and keep its rainbow.",
    steps: ["Run the code and watch what changes.", "Change speed from 3 to 1."],
    extension: "Change a colour in the rainbow array.",
    starter: `// Change speed from 3 to 1.
let y = 0;
let speed = 3;

wrap(false);
hideTurtle();
redrawOnMove(false);

function block(x, y, shapeWidth, shapeHeight, paintColor, direction = 90) {
  penup();
  goto(x, y);
  angle(direction);
  pendown();
  drawRect(shapeWidth, shapeHeight, paintColor, true);
}

function drawRainbowCat(x, y, tilt) {
  let rainbow = ["red", "orange", "gold", "lime"];
  for (let i = 0; i < rainbow.length; i++) {

    block(x - 95, y + 27 - i * 22,
      205, 20, rainbow[i], 270 + tilt);
  }
  block(x - 75, y + 55, 165, 105, "#e5ccb2");
  goto(x + 68, y);
  drawOvalArc(90, 90, 360, "#7a8286", true);
}

function loop() {
  setBackground("#2d2e80");
  drawRainbowCat(70, y, y / 6);

  y = y + speed;
  if (y >= 180 || y <= -180) speed = -speed;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    solution: `// Teacher solution: Change speed from 3 to 1.
let y = 0;
let speed = 1;

wrap(false);
hideTurtle();
redrawOnMove(false);

function block(x, y, shapeWidth, shapeHeight, paintColor, direction = 90) {
  penup();
  goto(x, y);
  angle(direction);
  pendown();
  drawRect(shapeWidth, shapeHeight, paintColor, true);
}

function drawRainbowCat(x, y, tilt) {
  let rainbow = ["red", "orange", "gold", "lime"];
  for (let i = 0; i < rainbow.length; i++) {

    block(x - 95, y + 27 - i * 22,
      205, 20, rainbow[i], 270 + tilt);
  }
  block(x - 75, y + 55, 165, 105, "#e5ccb2");
  goto(x + 68, y);
  drawOvalArc(90, 90, 360, "#7a8286", true);
}

function loop() {
  setBackground("#2d2e80");
  drawRainbowCat(70, y, y / 6);

  y = y + speed;
  if (y >= 180 || y <= -180) speed = -speed;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/ideen/nyan-cat.js",
    disposition: "included",
  },
  {
    id: "swaying-flowers",
    title: "Flowers in the breeze",
    category: "scenes",
    concepts: ["arrays", "for-loops", "conditions"],
    goal: "Make the flowers sway faster.",
    steps: ["Run the code and watch what changes.", "Change swaySpeed from 0.25 to 0.5."],
    extension: "Add 260 to the flower-position array.",
    starter: `// Change swaySpeed from 0.25 to 0.5.
let rotation = -12;
let swaySpeed = 0.25;

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setDualBackground("skyblue", "palegreen", -150);
  for (let x of [-180, 0, 180]) {
    penup();
    goto(x, -170);
    angle(rotation);
    pendown();
    color("ForestGreen");
    width(5);
    forward(95);
    drawFlower(6, 18, "orchid");
  }

  rotation = rotation + swaySpeed;
  if (rotation >= 12 || rotation <= -12) {
    swaySpeed = -swaySpeed;
  }

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    solution: `// Teacher solution: Change swaySpeed from 0.25 to 0.5.
let rotation = -12;
let swaySpeed = 0.5;

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setDualBackground("skyblue", "palegreen", -150);
  for (let x of [-180, 0, 180]) {
    penup();
    goto(x, -170);
    angle(rotation);
    pendown();
    color("ForestGreen");
    width(5);
    forward(95);
    drawFlower(6, 18, "orchid");
  }

  rotation = rotation + swaySpeed;
  if (rotation >= 12 || rotation <= -12) {
    swaySpeed = -swaySpeed;
  }

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/ideen/blumen.js",
    disposition: "included",
  },
  {
    id: "bouncing-logo",
    title: "Bounce a logo",
    category: "movement",
    concepts: ["variables", "conditions"],
    goal: "Put your own greeting on the bouncing logo.",
    steps: ["Run the code and watch what changes.", "Change the text DVD to HELLO."],
    extension: "Change speedX from 3 to 1.",
    starter: `// Change the text DVD to HELLO.
let x = 0, y = 0;
let speedX = 3, speedY = 2;
let paintColor = "tomato";

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setBackground("black");
  goto(x, y);
  drawOvalArc(170, 170, 360, paintColor, true);
  writeText("DVD", 42, "black");

  x = x + speedX;
  y = y + speedY;
  if (x >= 260 || x <= -260) {
    speedX = -speedX;
    paintColor = getRandomColor();
  }
  if (y >= 260 || y <= -260) {
    speedY = -speedY;
    paintColor = getRandomColor();
  }

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    solution: `// Teacher solution: Change the text DVD to HELLO.
let x = 0, y = 0;
let speedX = 3, speedY = 2;
let paintColor = "tomato";

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setBackground("black");
  goto(x, y);
  drawOvalArc(170, 170, 360, paintColor, true);
  writeText("HELLO", 42, "black");

  x = x + speedX;
  y = y + speedY;
  if (x >= 260 || x <= -260) {
    speedX = -speedX;
    paintColor = getRandomColor();
  }
  if (y >= 260 || y <= -260) {
    speedY = -speedY;
    paintColor = getRandomColor();
  }

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/ideen/dvd.js",
    disposition: "included",
  },
  {
    id: "rainbow-spiral",
    title: "Spin a spiral",
    category: "scenes",
    concepts: ["arrays", "variables"],
    goal: "Change the shape of the colourful spiral.",
    steps: ["Run the code and watch what changes.", "Change the spiral turn from 61 to 60."],
    extension: "Change one colour in the colors array.",
    starter: `// Change the spiral turn from 61 to 60.
let rotation = 0;
let colors = ["red", "orange", "gold", "lime", "deepskyblue", "violet"];

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setBackground("#101c38");
  goto(0, 0);
  angle(rotation);
  drawSpiral(75, 61, colors);

  rotation = rotation + 2;
  if (rotation >= 360) rotation = 0;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    solution: `// Teacher solution: Change the spiral turn from 61 to 60.
let rotation = 0;
let colors = ["red", "orange", "gold", "lime", "deepskyblue", "violet"];

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setBackground("#101c38");
  goto(0, 0);
  angle(rotation);
  drawSpiral(75, 60, colors);

  rotation = rotation + 2;
  if (rotation >= 360) rotation = 0;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/ideen/spirale.js",
    disposition: "included",
  },
  {
    id: "star-ring",
    title: "A ring of stars",
    category: "scenes",
    concepts: ["for-loops", "variables"],
    goal: "Turn the ring of stars gold.",
    steps: ["Run the code and watch what changes.", "Change hotpink to gold."],
    extension: "Change the ring radius from 155 to 200.",
    starter: `// Change hotpink to gold.
let rotation = 0;

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setBackground("#101c38");
  for (let i = 0; i < 8; i++) {
    let rad = (rotation + i * 45) * Math.PI / 180;
    goto(Math.cos(rad) * 155, Math.sin(rad) * 155);
    angle(rotation);
    drawStar(5, 25, "hotpink", true);
  }

  rotation = rotation + 1;
  if (rotation >= 360) rotation = 0;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    solution: `// Teacher solution: Change hotpink to gold.
let rotation = 0;

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setBackground("#101c38");
  for (let i = 0; i < 8; i++) {
    let rad = (rotation + i * 45) * Math.PI / 180;
    goto(Math.cos(rad) * 155, Math.sin(rad) * 155);
    angle(rotation);
    drawStar(5, 25, "gold", true);
  }

  rotation = rotation + 1;
  if (rotation >= 360) rotation = 0;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/ideen/sternenkranz.js",
    disposition: "included",
  },
  {
    id: "garden-grid",
    title: "A moving garden grid",
    category: "scenes",
    concepts: ["functions", "nested for-loops", "conditions"],
    goal: "Slow down the moving peas across the garden grid.",
    steps: ["Run the code and watch what changes.", "Change the pea movement from + 5 to + 2."],
    extension: "Change one checkerboard colour.",
    starter: `// Change the pea movement from + 5 to + 2.
let peaX = -140;
let sunY = 100;

wrap(false);
hideTurtle();
redrawOnMove(false);

function drawBoard() {
  setDualBackground("SkyBlue", "Beige", 250);
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 7; column++) {
      goto(-350 + column * 100, -350 + row * 100);
      angle(0);
      let paintColor = (row + column) % 2 === 0 ? "#58b381" : "#3da12f";
      drawRect(100, 100, paintColor, true);
    }
  }
}

function drawPlant(y, paintColor) {
  drawLine(-200, y - 60, -200, y - 8, "DarkGreen", 10);
  goto(-200, y);
  drawOvalArc(48, 48, 360, paintColor, true);
  goto(-178, y + 10);
  angle(90);
  drawRect(30, 20, paintColor, true);
}

function drawSunflower() {
  drawLine(-200, 4, -200, 48, "DarkGreen", 9);
  goto(-200, 75);
  drawOvalArc(48, 48, 360, "#ffca45", true);
  goto(-211, 86);
  angle(90);
  drawRect(22, 22, "#774819", true);
}

function loop() {
  drawBoard();
  drawSunflower();
  goto(-200, sunY);
  drawOvalArc(22, 22, 360, "#fff4a6", true);
  drawPlant(-35, "#25b6f0");
  drawPlant(-135, "#31c759");
  goto(peaX, -135);
  drawOvalArc(24, 24, 360, "#31c759", true);
  goto(peaX + 120, -35);
  drawOvalArc(24, 24, 360, "#25b6f0", true);

  peaX = peaX + 5;
  if (peaX > 320) peaX = -140;
  sunY = sunY + 1;
  if (sunY > 300) sunY = 100;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    solution: `// Teacher solution: Change the pea movement from + 5 to + 2.
let peaX = -140;
let sunY = 100;

wrap(false);
hideTurtle();
redrawOnMove(false);

function drawBoard() {
  setDualBackground("SkyBlue", "Beige", 250);
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 7; column++) {
      goto(-350 + column * 100, -350 + row * 100);
      angle(0);
      let paintColor = (row + column) % 2 === 0 ? "#58b381" : "#3da12f";
      drawRect(100, 100, paintColor, true);
    }
  }
}

function drawPlant(y, paintColor) {
  drawLine(-200, y - 60, -200, y - 8, "DarkGreen", 10);
  goto(-200, y);
  drawOvalArc(48, 48, 360, paintColor, true);
  goto(-178, y + 10);
  angle(90);
  drawRect(30, 20, paintColor, true);
}

function drawSunflower() {
  drawLine(-200, 4, -200, 48, "DarkGreen", 9);
  goto(-200, 75);
  drawOvalArc(48, 48, 360, "#ffca45", true);
  goto(-211, 86);
  angle(90);
  drawRect(22, 22, "#774819", true);
}

function loop() {
  drawBoard();
  drawSunflower();
  goto(-200, sunY);
  drawOvalArc(22, 22, 360, "#fff4a6", true);
  drawPlant(-35, "#25b6f0");
  drawPlant(-135, "#31c759");
  goto(peaX, -135);
  drawOvalArc(24, 24, 360, "#31c759", true);
  goto(peaX + 120, -35);
  drawOvalArc(24, 24, 360, "#25b6f0", true);

  peaX = peaX + 2;
  if (peaX > 320) peaX = -140;
  sunY = sunY + 1;
  if (sunY > 300) sunY = 100;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/ideen/erbse.js",
    disposition: "included",
  },
  {
    id: "sailing-ship",
    title: "Sail on waves",
    category: "scenes",
    concepts: ["functions", "variables"],
    goal: "Slow down the ship while it sails over waves.",
    steps: ["Run the code and watch what changes.", "Change the ship movement from + 2 to + 1."],
    extension: "Change the wave height from 12 to 24.",
    starter: `// Change the ship movement from + 2 to + 1.
let x = -260;
let time = 0;

wrap(false);
hideTurtle();
redrawOnMove(false);

function drawShip(x, y, tilt) {
  const canvas = document.getElementById("imagecanvas");
  const ctx = canvas.getContext("2d");
  ctx.save();
  ctx.translate(canvas.width / 2 + x, canvas.height / 2 - y);
  ctx.rotate(-tilt * Math.PI / 180);

  ctx.fillStyle = "Sienna";
  ctx.beginPath();
  ctx.moveTo(-90, -8);
  ctx.lineTo(90, -8);
  ctx.lineTo(65, 30);
  ctx.lineTo(-65, 30);
  ctx.fill();

  ctx.strokeStyle = "SaddleBrown";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, -12);
  ctx.lineTo(0, -105);
  ctx.stroke();

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(5, -100);
  ctx.lineTo(75, -20);
  ctx.lineTo(5, -20);
  ctx.fill();
  ctx.restore();
}

function loop() {
  let tilt = Math.sin(time) * 7;
  setTiltedBackground(
    "SkyBlue", "DodgerBlue", tilt);
  drawShip(x, Math.sin(time) * 12, tilt);

  x = x + 2;
  if (x > 340) x = -340;
  time = time + 0.04;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    solution: `// Teacher solution: Change the ship movement from + 2 to + 1.
let x = -260;
let time = 0;

wrap(false);
hideTurtle();
redrawOnMove(false);

function drawShip(x, y, tilt) {
  const canvas = document.getElementById("imagecanvas");
  const ctx = canvas.getContext("2d");
  ctx.save();
  ctx.translate(canvas.width / 2 + x, canvas.height / 2 - y);
  ctx.rotate(-tilt * Math.PI / 180);

  ctx.fillStyle = "Sienna";
  ctx.beginPath();
  ctx.moveTo(-90, -8);
  ctx.lineTo(90, -8);
  ctx.lineTo(65, 30);
  ctx.lineTo(-65, 30);
  ctx.fill();

  ctx.strokeStyle = "SaddleBrown";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, -12);
  ctx.lineTo(0, -105);
  ctx.stroke();

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(5, -100);
  ctx.lineTo(75, -20);
  ctx.lineTo(5, -20);
  ctx.fill();
  ctx.restore();
}

function loop() {
  let tilt = Math.sin(time) * 7;
  setTiltedBackground(
    "SkyBlue", "DodgerBlue", tilt);
  drawShip(x, Math.sin(time) * 12, tilt);

  x = x + 1;
  if (x > 340) x = -340;
  time = time + 0.04;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/ideen/schiff.js",
    disposition: "included",
  },
  {
    id: "jet-flight",
    title: "A cartoon jet scene",
    category: "scenes",
    concepts: ["variables", "conditions"],
    goal: "Slow down the jet and watch its cartoon drop.",
    steps: ["Run the code and watch what changes.", "Change the jet movement from + 3 to + 1."],
    extension: "Change the drop point from -100 to 0.",
    starter: `// Change the jet movement from + 3 to + 1.
let jetX = -340;
let bombX = 0;
let bombY = 0;
let falling = false;
let dropped = false;
let fireTick = 0;

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setDualBackground("#bfe9ff", "#87bd74", -180);

  goto(jetX, 180);
  drawJet(125);

  if (falling) {
    goto(bombX, bombY);
    drawBomb(55);
    bombY = bombY - 5;
    if (bombY <= -150) {
      falling = false;
      fireTick = 20;
    }
  }

  if (fireTick > 0) {
    goto(bombX, -165);
    drawFireball(110 - fireTick * 3);
    fireTick = fireTick - 1;
  }

  if (jetX >= -100 && !dropped) {
    bombX = jetX;
    bombY = 150;
    falling = true;
    dropped = true;
  }
  jetX = jetX + 3;
  if (jetX > 350) {
    jetX = -340;
    dropped = false;
  }

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    solution: `// Teacher solution: Change the jet movement from + 3 to + 1.
let jetX = -340;
let bombX = 0;
let bombY = 0;
let falling = false;
let dropped = false;
let fireTick = 0;

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setDualBackground("#bfe9ff", "#87bd74", -180);

  goto(jetX, 180);
  drawJet(125);

  if (falling) {
    goto(bombX, bombY);
    drawBomb(55);
    bombY = bombY - 5;
    if (bombY <= -150) {
      falling = false;
      fireTick = 20;
    }
  }

  if (fireTick > 0) {
    goto(bombX, -165);
    drawFireball(110 - fireTick * 3);
    fireTick = fireTick - 1;
  }

  if (jetX >= -100 && !dropped) {
    bombX = jetX;
    bombY = 150;
    falling = true;
    dropped = true;
  }
  jetX = jetX + 1;
  if (jetX > 350) {
    jetX = -340;
    dropped = false;
  }

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/ideen/jet.js",
    disposition: "included",
  },
  {
    id: "following-dog",
    title: "Follow the sun",
    category: "scenes",
    concepts: ["variables", "conditions"],
    goal: "Make the dog bigger while it follows the sun.",
    steps: ["Run the code and watch what changes.", "Change the dog size from 90 to 120."],
    extension: "Change its chasing speed from 2.5 to 3.",
    starter: `// Change the dog size from 90 to 120.
let targetX = -280;
let dogX = -260;
let isDay = true;
let tick = 0;

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  let sky = isDay ? "#8dd2fa" : "#172951";
  setDualBackground(sky, "#8fc376", -175);

  goto(targetX, 145);
  drawOvalArc(70, 70, 360, isDay ? "Gold" : "#fff1c2", true);
  if (!isDay) {
    goto(targetX + 20, 153);
    drawOvalArc(65, 65, 360, sky, true);
  }

  let facing = targetX >= dogX ? "right" : "left";
  goto(dogX, -175);
  drawDog(90, facing, Math.sin(tick * 0.15) * 25, tick * 12);

  if (Math.abs(targetX - dogX) > 35) {
    dogX = dogX + (facing === "right" ? 2.5 : -2.5);
  }
  targetX = targetX + 2;
  if (targetX > 280) {
    targetX = -280;
    isDay = !isDay;
  }
  tick = tick + 1;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    solution: `// Teacher solution: Change the dog size from 90 to 120.
let targetX = -280;
let dogX = -260;
let isDay = true;
let tick = 0;

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  let sky = isDay ? "#8dd2fa" : "#172951";
  setDualBackground(sky, "#8fc376", -175);

  goto(targetX, 145);
  drawOvalArc(70, 70, 360, isDay ? "Gold" : "#fff1c2", true);
  if (!isDay) {
    goto(targetX + 20, 153);
    drawOvalArc(65, 65, 360, sky, true);
  }

  let facing = targetX >= dogX ? "right" : "left";
  goto(dogX, -175);
  drawDog(120, facing, Math.sin(tick * 0.15) * 25, tick * 12);

  if (Math.abs(targetX - dogX) > 35) {
    dogX = dogX + (facing === "right" ? 2.5 : -2.5);
  }
  targetX = targetX + 2;
  if (targetX > 280) {
    targetX = -280;
    isDay = !isDay;
  }
  tick = tick + 1;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/ideen/hund.js",
    disposition: "included",
  },
  {
    id: "ferris-wheel",
    title: "Turn a Ferris wheel",
    category: "movement",
    concepts: ["variables"],
    goal: "Make the Ferris wheel turn faster.",
    steps: ["Run the code and watch what changes.", "Change rotation + 0.6 to rotation + 1.2."],
    extension: "Change the wheel size from 300 to 240.",
    starter: `// Change rotation + 0.6 to rotation + 1.2.
let rotation = 0;

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setDualBackground("#c3e9ff", "#a5d98c", -180);
  goto(0, 60);
  drawFerrisWheel(300, rotation);

  rotation = (rotation + 0.6) % 360;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    solution: `// Teacher solution: Change rotation + 0.6 to rotation + 1.2.
let rotation = 0;

wrap(false);
hideTurtle();
redrawOnMove(false);

function loop() {
  setDualBackground("#c3e9ff", "#a5d98c", -180);
  goto(0, 60);
  drawFerrisWheel(300, rotation);

  rotation = (rotation + 1.2) % 360;

  draw();
  requestAnimationFrame(loop);
}

loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/ideen/riesenrad.js",
    disposition: "included",
  },
  {
    id: "underwater",
    title: "Swim together",
    category: "scenes",
    concepts: ["for-loops", "variables"],
    goal: "Give the swimming fish a new colour.",
    steps: ["Run the code and watch what changes.", "Change the fish colour from coral to gold."],
    extension: "Change the fish count from four to six.",
    starter: `// Change the fish colour from coral to gold.
let x = -260;
let time = 0;
wrap(false);
hideTurtle();
redrawOnMove(false);
function loop() {
  setTiltedBackground("SkyBlue", "DodgerBlue", Math.sin(time) * 3);
  goto(x, -110 + Math.sin(time) * 12);
  drawSubmarine(160, "gold");

  for (let i = 0; i < 4; i++) {
    let fischX = (time * 60 - i * 95 + 900) % 900 - 450;
    let fischY = -210 + Math.sin(time - i * 0.6) * 30;
    goto(fischX, fischY);
    drawFish(65, "coral", "right", Math.sin(time * 3 - i) * 15);
  }
  x = x + 1.5;
  if (x > 450) x = -450;
  time = time + 0.025;
  draw();
  requestAnimationFrame(loop);
}
loop();
`,
    solution: `// Teacher solution: Change the fish colour from coral to gold.
let x = -260;
let time = 0;
wrap(false);
hideTurtle();
redrawOnMove(false);
function loop() {
  setTiltedBackground("SkyBlue", "DodgerBlue", Math.sin(time) * 3);
  goto(x, -110 + Math.sin(time) * 12);
  drawSubmarine(160, "gold");

  for (let i = 0; i < 4; i++) {
    let fischX = (time * 60 - i * 95 + 900) % 900 - 450;
    let fischY = -210 + Math.sin(time - i * 0.6) * 30;
    goto(fischX, fischY);
    drawFish(65, "gold", "right", Math.sin(time * 3 - i) * 15);
  }
  x = x + 1.5;
  if (x > 450) x = -450;
  time = time + 0.025;
  draw();
  requestAnimationFrame(loop);
}
loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/ideen/unterwasser.js",
    disposition: "included",
  },
  {
    id: "falling-bounce",
    title: "Fall and bounce",
    category: "scenes",
    concepts: ["variables", "conditions"],
    goal: "Reduce gravity so the falling shape bounces more gently.",
    steps: ["Run the code and watch what changes.", "Change gravity from 0.35 to 0.2."],
    extension: "Change the allowed bounces from three to five.",
    starter: `// Change gravity from 0.35 to 0.2.
let y = 220;
let speedY = 0;
let bounces = 0;
let fireTick = 0;
wrap(false);
hideTurtle();
redrawOnMove(false);
function loop() {
  setDualBackground("SkyBlue", "ForestGreen", -220);
  if (bounces < 3) {
    speedY = speedY - 0.35;
    y = y + speedY;
    if (y < -195) {
      y = -195;
      speedY = -speedY * 0.6;
      bounces = bounces + 1;
    }
    goto(0, y);
    drawBomb(45);
  } else {
    fireTick = fireTick + 1;
    if (fireTick < 45) {
      goto(0, -185);
      drawFireball(20 + fireTick * 3);
    }
    if (fireTick > 100) {
      y = 220;
      speedY = 0;
      bounces = 0;
      fireTick = 0;
    }
  }
  draw();
  requestAnimationFrame(loop);
}
loop();
`,
    solution: `// Teacher solution: Change gravity from 0.35 to 0.2.
let y = 220;
let speedY = 0;
let bounces = 0;
let fireTick = 0;
wrap(false);
hideTurtle();
redrawOnMove(false);
function loop() {
  setDualBackground("SkyBlue", "ForestGreen", -220);
  if (bounces < 3) {
    speedY = speedY - 0.2;
    y = y + speedY;
    if (y < -195) {
      y = -195;
      speedY = -speedY * 0.6;
      bounces = bounces + 1;
    }
    goto(0, y);
    drawBomb(45);
  } else {
    fireTick = fireTick + 1;
    if (fireTick < 45) {
      goto(0, -185);
      drawFireball(20 + fireTick * 3);
    }
    if (fireTick > 100) {
      y = 220;
      speedY = 0;
      bounces = 0;
      fireTick = 0;
    }
  }
  draw();
  requestAnimationFrame(loop);
}
loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/ideen/abprallen.js",
    disposition: "included",
  },
  {
    id: "fireworks",
    title: "Launch and sparkle",
    category: "scenes",
    concepts: ["variables", "conditions"],
    goal: "Add more rays to the firework.",
    steps: ["Run the code and watch what changes.", "Change the outer firework from 24 rays to 36."],
    extension: "Change the inner firework colour from white to coral.",
    starter: `// Change the outer firework from 24 rays to 36.
let tick = 0;
let rotation = 0;
let paintColor = getRandomColor();
wrap(false);
hideTurtle();
redrawOnMove(false);
function loop() {
  setBackground("MidnightBlue");
  if (tick < 50) {
    goto(0, -280 + tick * 7);
    drawRocket(35, "white");
  } else if (tick < 120) {
    let age = tick - 50;
    let size = 30 + age * 5;
    let y = 70 - age * age * 0.025;
    goto(0, y);
    drawFirework(size, paintColor, rotation, 24);

    drawFirework(size * 0.55, "white", -rotation, 12);
    rotation = rotation + 0.8;
  }
  tick = tick + 1;
  if (tick > 155) {
    tick = 0;
    rotation = 0;
    paintColor = getRandomColor(); }
  draw();
  requestAnimationFrame(loop);
}
loop();
`,
    solution: `// Teacher solution: Change the outer firework from 24 rays to 36.
let tick = 0;
let rotation = 0;
let paintColor = getRandomColor();
wrap(false);
hideTurtle();
redrawOnMove(false);
function loop() {
  setBackground("MidnightBlue");
  if (tick < 50) {
    goto(0, -280 + tick * 7);
    drawRocket(35, "white");
  } else if (tick < 120) {
    let age = tick - 50;
    let size = 30 + age * 5;
    let y = 70 - age * age * 0.025;
    goto(0, y);
    drawFirework(size, paintColor, rotation, 36);

    drawFirework(size * 0.55, "white", -rotation, 12);
    rotation = rotation + 0.8;
  }
  tick = tick + 1;
  if (tick > 155) {
    tick = 0;
    rotation = 0;
    paintColor = getRandomColor(); }
  draw();
  requestAnimationFrame(loop);
}
loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/ideen/feuerwerk.js",
    disposition: "included",
  },
  {
    id: "rocket-flight",
    title: "Fly a rocket",
    category: "movement",
    concepts: ["variables", "conditions"],
    goal: "Make the rocket fly faster.",
    steps: ["Run the code and watch what changes.", "Change the rocket movement from + 2 to + 4."],
    extension: "Change its colour from coral to lime.",
    starter: `// Change the rocket movement from + 2 to + 4.
let y = -260;
let time = 0;
wrap(false);
hideTurtle();
redrawOnMove(false);
function loop() {
  setBackground("MidnightBlue");
  goto(0, y - 55);
  drawFireball(25 + Math.sin(time) * 5);
  goto(0, y);
  drawRocket(110, "coral", 0);
  y = y + 2;
  if (y > 420) y = -420;
  time = time + 0.3;
  draw();
  requestAnimationFrame(loop);
}
loop();
`,
    solution: `// Teacher solution: Change the rocket movement from + 2 to + 4.
let y = -260;
let time = 0;
wrap(false);
hideTurtle();
redrawOnMove(false);
function loop() {
  setBackground("MidnightBlue");
  goto(0, y - 55);
  drawFireball(25 + Math.sin(time) * 5);
  goto(0, y);
  drawRocket(110, "coral", 0);
  y = y + 4;
  if (y > 420) y = -420;
  time = time + 0.3;
  draw();
  requestAnimationFrame(loop);
}
loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/ideen/rakete.js",
    disposition: "included",
  },
  {
    id: "snowfall",
    title: "Snow through day and night",
    category: "scenes",
    concepts: ["arrays", "for-loops", "conditions"],
    goal: "Make a snowstorm with more snowflakes.",
    steps: ["Run the code and watch what changes.", "Change the number of flakes from 35 to 50."],
    extension: "Change the snowflake size from 7 to 10.",
    starter: `// Change the number of flakes from 35 to 50.
let tick = 0;

let flakes = [];
for (let i = 0; i < 35; i++) {
  flakes.push({x: getRandomNumber(-330, 330), y: getRandomNumber(-330, 330)});
}
wrap(false);
hideTurtle();
redrawOnMove(false);
function loop() {
  let day = tick % 800 < 400;
  let sky = day ? "SkyBlue" : "MidnightBlue";
  setDualBackground(sky, "AliceBlue", -230);
  goto(-170, 190);
  drawOvalArc(90, 90, 360, day ? "gold" : "white", true);
  if (!day) {
    goto(-150, 205);
    drawOvalArc(85, 85, 360, sky, true);
  }
  for (let flake of flakes) {
    goto(flake.x + Math.sin(tick * 0.02 + flake.y) * 8, flake.y);
    drawOvalArc(7, 7, 360, "white", true);
    flake.y = flake.y - 1;
    if (flake.y < -235) flake.y = 350;
  }
  tick = tick + 1;
  draw();
  requestAnimationFrame(loop);
}
loop();
`,
    solution: `// Teacher solution: Change the number of flakes from 35 to 50.
let tick = 0;

let flakes = [];
for (let i = 0; i < 50; i++) {
  flakes.push({x: getRandomNumber(-330, 330), y: getRandomNumber(-330, 330)});
}
wrap(false);
hideTurtle();
redrawOnMove(false);
function loop() {
  let day = tick % 800 < 400;
  let sky = day ? "SkyBlue" : "MidnightBlue";
  setDualBackground(sky, "AliceBlue", -230);
  goto(-170, 190);
  drawOvalArc(90, 90, 360, day ? "gold" : "white", true);
  if (!day) {
    goto(-150, 205);
    drawOvalArc(85, 85, 360, sky, true);
  }
  for (let flake of flakes) {
    goto(flake.x + Math.sin(tick * 0.02 + flake.y) * 8, flake.y);
    drawOvalArc(7, 7, 360, "white", true);
    flake.y = flake.y - 1;
    if (flake.y < -235) flake.y = 350;
  }
  tick = tick + 1;
  draw();
  requestAnimationFrame(loop);
}
loop();
`,
    source: "Turtle-Finalprojekt-Vorlage/beispiele/ideen/schnee.js",
    disposition: "included",
  },
];
