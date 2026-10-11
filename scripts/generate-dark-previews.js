// Render maintained figure programs with the real isolated engine. Original PNGs stay intact.
import { chromium } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { recipes } from "../src/reference.js";
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(process.env.PREVIEW_URL || "http://localhost:4316/#personal");
  await page.waitForSelector("#code");
  const manifest = JSON.parse(
    await readFile("assets/previews/manifest.json", "utf8"),
  );
  await mkdir("assets/previews-dark", { recursive: true });
  for (const recipe of recipes) {
    const source = recipe.code.replace(
      /^setBackground\("white"\);/,
      'setBackground("#18202e");',
    );
    const code = `let seed=12345;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};\nredrawOnMove(false);\n${source}\nredrawOnMove(true);draw();postMessage({type:"asset-ready",id:${JSON.stringify(recipe.id)}});`;
    await page.getByRole("button", { name: "Stop", exact: true }).click();
    await page.locator("#code").fill(code);
    await page.evaluate((id) => {
      window.assetReady = false;
      let marked = false;
      const receive = (event) => {
        if (event.source !== document.querySelector("iframe")?.contentWindow)
          return;
        if (event.data?.type === "error") throw Error(event.data.message);
        if (event.data?.type === "asset-ready" && event.data.id === id)
          marked = true;
        if (marked && event.data?.type === "frame") {
          window.assetReady = true;
          window.removeEventListener("message", receive);
        }
      };
      window.addEventListener("message", receive);
    }, recipe.id);
    await page.getByRole("button", { name: "Run", exact: true }).click();
    await page.waitForFunction(() => window.assetReady);
    const crop = manifest.images.find(
      (x) => x.id === recipe.id && x.kind === "recipe",
    ).crop;
    const data = await page.locator("#canvas").evaluate((c, box) => {
      const out = document.createElement("canvas");
      out.width = out.height = 360;
      const ctx = out.getContext("2d");
      ctx.fillStyle = "#18202e";
      ctx.fillRect(0, 0, 360, 360);
      const scale = 360 / Math.max(box.width, box.height);
      const w = box.width * scale,
        h = box.height * scale;
      ctx.drawImage(
        c,
        box.x,
        box.y,
        box.width,
        box.height,
        (360 - w) / 2,
        (360 - h) / 2,
        w,
        h,
      );
      return out.toDataURL("image/png").split(",")[1];
    }, crop);
    await writeFile(
      `assets/previews-dark/recipe-${recipe.id}.png`,
      Buffer.from(data, "base64"),
    );
  }
  await writeFile(
    "assets/previews-dark/README.md",
    "Real-engine dark figure previews. Generated with scripts/generate-dark-previews.js using maintained recipe programs, seed 12345 and crops from ../previews/manifest.json. Only the curated white rendering backdrop is changed to #18202e. Original previews are preserved. Animation scenes retain their programmed backgrounds.\n",
  );
  console.log(`Generated ${recipes.length} dark previews.`);
} finally {
  await browser.close();
}
