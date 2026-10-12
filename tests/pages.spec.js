import { execFileSync } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { test, expect } from "@playwright/test";
import { copy } from "../components/messages";
import { locales } from "../src/i18n";
import { recipes, reference } from "../src/reference";
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
test("all five languages contain the complete UI and teaching content", () => {
  for (const id of ["en", "de", "ja", "tr", "hy"]) {
    for (const key of Object.keys(copy.en)) expect(copy[id][key], `${id}.${key}`).toBeTruthy();
    for (const key of Object.keys(locales.en)) expect(locales[id][key], `${id}.${key}`).toBeTruthy();
    for (const activity of Object.keys(locales.en.activities)) expect(locales[id].activities[activity], `${id}.${activity}`).toBeTruthy();
    for (const item of recipes) expect(item.title[id]).toBeTruthy();
    for (const item of reference) expect(item.text[id]).toBeTruthy();
  }
});
for (const id of ["en", "de", "ja", "tr", "hy"]) {
  test(`mounted deployment runs previews and preserves ${id} after reload`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`${base}/#figures`);
    await page.locator(".language-picker select").selectOption(id);
    await expect(page.locator("html")).toHaveAttribute("lang", id);
    await expect(page.locator(".collection-heading h2")).toHaveText(copy[id].figures);
    await page.getByRole("searchbox").fill("drawDino");
    await expect(page.locator(".example-card")).toHaveCount(1);
    await expect(page.locator(".catalogue-preview")).toHaveAttribute("data-drawn", "true");
    for (const path of ["/engine/library.js", "/engine/functions.js", "/src/worker.js", "/favicon.svg", "/THIRD_PARTY_NOTICES.txt"]) {
      expect((await page.request.get(base + path)).ok()).toBe(true);
    }
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", id);
    expect(errors).toEqual([]);
  });
}

test("mounted offline ZIP retains exact source, fallback canvas, notices and real execution", async ({
  page,
  browser,
}) => {
  await page.goto(`${base}/#personal`);
  const source = 'hideTurtle(); goto(0, 0); drawCircle(60, "coral", true);';
  await page.locator("#code").fill(source);
  const download = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Download project ZIP", exact: true })
    .click();
  const archive = await download;
  const dir = await mkdtemp(join(tmpdir(), "kaplum-export-test-"));
  try {
    await archive.saveAs(join(dir, "project.zip"));
    execFileSync("unzip", ["-q", join(dir, "project.zip"), "-d", dir]);
    expect(await readFile(join(dir, "program.js"), "utf8")).toBe(source);
    expect(await readFile(join(dir, "index.html"), "utf8")).toContain(
      "background:#18202e",
    );
    expect(
      await readFile(join(dir, "THIRD_PARTY_NOTICES.txt"), "utf8"),
    ).toContain("Turtle");
    const offline = await browser.newPage();
    await offline.goto(pathToFileURL(join(dir, "index.html")).href);
    await expect
      .poll(() =>
        offline.locator("#turtlecanvas").evaluate((c) => {
          const [r, g, b, a] = c
            .getContext("2d")
            .getImageData(350, 350, 1, 1).data;
          return (
            r > 250 && Math.abs(g - 127) < 3 && Math.abs(b - 80) < 3 && a > 240
          );
        }),
      )
      .toBe(true);
    await offline.close();
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});