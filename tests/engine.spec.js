import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
const engine = await readFile(new URL("../engine/library.js", import.meta.url), "utf8");
const helpers = await readFile(new URL("../engine/functions.js", import.meta.url), "utf8");
async function load(page) {
  await page.goto("about:blank");
  await page.evaluate(() => {
    document.body.innerHTML = '<canvas id="imagecanvas" width="700" height="700"></canvas><canvas id="turtlecanvas" width="700" height="700"></canvas>';
  });
  await page.evaluate(engine);
}
test("movement, fractional coordinates, pen and clearing preserve the teaching state", async ({ page }) => {
  await load(page);
  const result = await page.evaluate(() => {
    wrap(false); hideTurtle(); color("red"); width(4); forward(100); right(90); forward(-50);
    const state = getTurtleState();
    const ctx = document.getElementById("imagecanvas").getContext("2d");
    const pixel = [...ctx.getImageData(350, 300, 1, 1).data];
    penup(); goto(12.5, 9.25); forward(10);
    const lifted = [...ctx.getImageData(370, 340, 1, 1).data];
    clear();
    return { state, fractional: getTurtleState(), pixel, lifted, blank: [...ctx.getImageData(350, 300, 1, 1).data] };
  });
  expect(result.state.x).toBeCloseTo(-50);
  expect(result.state.y).toBeCloseTo(100);
  expect(result.state.angleDeg).toBe(90);
  expect(result.fractional.x).toBeCloseTo(22.5);
  expect(result.fractional.y).toBeCloseTo(9.25);
  expect(result.pixel).toEqual([255, 0, 0, 255]);
  expect(result.lifted[3]).toBe(0);
  expect(result.blank[3]).toBe(0);
});
test("wrapping crosses edges, exact corners and multiple canvas widths", async ({ page }) => {
  await load(page);
  const states = await page.evaluate(() => {
    penup(); angle(90); forward(1600); const across = getTurtleState();
    goto(350, 350); angle(45); forward(Math.sqrt(2) * 10); const corner = getTurtleState();
    goto(0, 0); angle(0); forward(-800); const backwards = getTurtleState();
    return { across, corner, backwards };
  });
  expect(states.across.x).toBeCloseTo(200);
  expect(states.corner.x).toBeCloseTo(-340);
  expect(states.corner.y).toBeCloseTo(-340);
  expect(states.backwards.y).toBeCloseTo(-100);
});
test("CSS and RGB colours, aliases, fills and invalid input work in the new core", async ({ page }) => {
  await load(page);
  await page.evaluate(helpers);
  const result = await page.evaluate(() => {
    wrap(false); hideTurtle();
    const ctx = document.getElementById("imagecanvas").getContext("2d");
    const colours = [];
    for (const value of ["LimeGreen", "#abc", "ff0000", [0, 128, 255]]) { color(value); colours.push(ctx.strokeStyle); }
    beginFill("gold"); for (let i = 0; i < 4; i++) { forward(60); right(90); } endFill();
    const filled = [...ctx.getImageData(380, 320, 1, 1).data];
    geheZu(5, 10); setzeWinkel(90); vorwaerts(20);
    const state = liesTurtleZustand();
    const errors = [];
    for (const action of [() => forward(Infinity), () => angle(NaN), () => goto(5, NaN), () => width(0)]) {
      try { action(); } catch (error) { errors.push(error.message); }
    }
    return { colours, filled, state, errors };
  });
  expect(result.colours).toEqual(["#32cd32", "#aabbcc", "#ff0000", "#0080ff"]);
  expect(result.filled).toEqual([255, 215, 0, 255]);
  expect(result.state.x).toBeCloseTo(25);
  expect(result.state.y).toBeCloseTo(10);
  expect(result.state.angleDeg).toBe(90);
  expect(result.errors).toHaveLength(4);
});
