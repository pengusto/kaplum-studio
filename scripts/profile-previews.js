import { chromium, firefox } from "@playwright/test";

// Sequential local samples. TaskDuration measures the main thread, not total CPU.
const result = {};
const baseUrl = process.env.PROFILE_URL || "http://localhost:4173";
for (const [name, type] of Object.entries({ chromium, firefox })) {
  const browser = await type.launch();
  const samples = [];
  try {
    for (let trial = 0; trial < 5; trial++) {
      const context = await browser.newContext({ viewport: { width: 1500, height: 1400 } });
      try {
        const page = await context.newPage();
        await page.addInitScript(() => {
          window.kaplumProfile = { frames: [], edits: [], lastInput: null };
          addEventListener("input", event => {
            if (event.target.type === "range") kaplumProfile.lastInput = performance.now();
          }, true);
          addEventListener("message", event => {
            if (event.data?.type !== "frame") return;
            kaplumProfile.frames.push(performance.now());
            if (kaplumProfile.lastInput !== null) {
              kaplumProfile.edits.push(performance.now() - kaplumProfile.lastInput);
              kaplumProfile.lastInput = null;
            }
          });
        });
        await page.goto(`${baseUrl}/#figures`);
        await page.getByRole("searchbox").fill("drawDino");
        await page.locator("[data-drawn=true]").waitFor();
        await page.waitForTimeout(200);
        for (const size of ["90", "100", "110", "120", "80"]) {
          const count = await page.evaluate(() => kaplumProfile.edits.length);
          await page.getByRole("slider", { name: "size slider", exact: true }).fill(size);
          await page.waitForFunction(count => kaplumProfile.edits.length > count, count);
        }
        const sample = await page.evaluate(() => ({
          firstFrameMs: kaplumProfile.frames[0], edits: kaplumProfile.edits,
        }));
        if (name === "chromium" && trial === 0) {
          const cdp = await context.newCDPSession(page);
          await cdp.send("Performance.enable");
          const metrics = async () => Object.fromEntries(
            (await cdp.send("Performance.getMetrics")).metrics.map(item => [item.name, item.value]),
          );
          const idleStart = await metrics();
          await page.waitForTimeout(1500);
          const idleEnd = await metrics();
          sample.idleMainThreadMs = (idleEnd.TaskDuration - idleStart.TaskDuration) * 1000;
          const scrollStart = await metrics();
          await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
          await page.waitForTimeout(1000);
          const scrollEnd = await metrics();
          sample.scrollMainThreadMs = (scrollEnd.TaskDuration - scrollStart.TaskDuration) * 1000;
        }
        samples.push(sample);
      } finally {
        await context.close();
      }
    }
    result[name] = samples;
  } finally {
    await browser.close();
  }
}
console.log(JSON.stringify(result, null, 2));
