import {pasteCode} from "./helpers/editor.js";
import { reference } from "../src/reference.js";
import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
const canvasColor = (page) =>
  page
    .locator(".canvas-surface")
    .evaluate((el) => getComputedStyle(el).backgroundColor);
const changeCanvas = async (page, name) => {
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name, exact: true })
    .click();
  await page.getByRole("button", { name: "Done", exact: true }).click();
};
test("React gallery keeps complete inventory, navigation, search and explanations", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator(".example-card")).toHaveCount(32);
  await expect(page.locator(".brand svg")).toBeVisible();
  await page.getByRole("searchbox").fill("drawDino");
  await expect(page.locator(".example-card")).toHaveCount(1);
  await expect(page.locator(".example-card")).toContainText("legAngle");
  await expect(page.getByRole("slider", { name: "legAngle slider", exact: true })).toBeVisible();
  await expect(page).toHaveURL(/#figures$|\/$/);
  await page.getByRole("link", { name: "Open in Studio", exact: true }).click();
  await expect(page.locator("h1")).toHaveText("Dinosaur");
  await expect(page.locator(".explanation-pane")).toContainText("legAngle");
  await page.getByRole("link", { name: "Basic commands", exact: true }).click();
  await expect(page.locator(".example-card")).toHaveCount(reference.length);
  await page.getByRole("link", { name: "Animations", exact: true }).click();
  await expect(page.locator(".example-card")).toHaveCount(26);
  expect(errors).toEqual([]);
});
test("canvas defaults dark; independent light setting persists without rewriting code", async ({
  page,
}) => {
  await page.goto("/#figure/figur-dino");
  await expect(page.locator("#status")).toHaveText("Running");
  const source = await page.locator("#code").innerText();
  expect(await canvasColor(page)).toBe("rgb(24, 32, 46)");
  await changeCanvas(page, "Light");
  expect(await canvasColor(page)).toBe("rgb(255, 255, 255)");
  expect(await page.locator("#code").innerText()).toBe(source);
  await page.getByRole("switch", { name: "Dark mode", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(await canvasColor(page)).toBe("rgb(255, 255, 255)");
  await changeCanvas(page, "Dark");
  expect(await canvasColor(page)).toBe("rgb(24, 32, 46)");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(await canvasColor(page)).toBe("rgb(24, 32, 46)");
  await expect(page.locator("#status")).toHaveText("Running");
});
test("live animation stops, English learner source survives language and route changes", async ({
  page,
}) => {
  await page.goto("/#animation/bouncing-ball");
  await expect(page.locator("#status")).toHaveText("Running");
  const pixels = () =>
    page.locator("#canvas").evaluate((c) => {
      const d = c.getContext("2d").getImageData(0, 0, 700, 700).data;
      let n = 0;
      for (let i = 0; i < d.length; i += 101) n = (n + d[i] * i) % 1000000007;
      return n;
    });
  const first = await pixels();
  await expect.poll(pixels).not.toBe(first);
  await page.getByRole("button", { name: "Stop", exact: true }).click();
  const stopped = await pixels();
  await expect(page.locator("#status")).toHaveText("Stopped");
  expect(await pixels()).toBe(stopped);
  await page
    .locator("#code")
    .fill('hideTurtle();\ngoto(0, 0);\ndrawCircle(60, "coral", true);');
  const code = await page.locator("#code").innerText();
  await page.getByLabel("Language", { exact: true }).selectOption("de");
  await expect(page.locator(".try-this")).toContainText("Probiere das");
  expect(await page.locator("#code").innerText()).toBe(code);
  await page.getByRole("link", { name: "Figuren", exact: true }).click();
  await page.getByRole("link", { name: "Animationen", exact: true }).click();
  await page.locator('a[href="#animation/bouncing-ball"]').last().click();
  expect(await page.locator("#code").innerText()).toBe(code);
});
test("settings keyboard close restores focus, flags and mobile theme do not overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#figure/figur-dino");
  await expect(page.getByLabel("Language")).toContainText("🇩🇪 Deutsch");
  const button = page.getByRole("button", { name: "Settings", exact: true });
  await button.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(button).toBeFocused();
  await page.getByRole("radio", { name: "Result", exact: true }).click();
  await expect(page.locator(".result-pane")).toBeVisible();
  await expect(page.locator(".code-pane")).not.toBeVisible();
  await page.getByRole("switch", { name: "Dark mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("runtime still isolates loops and background commands override fallback", async ({
  page,
}) => {
  await page.goto("/#personal");
  await pasteCode(page,'setBackground("tomato"); hideTurtle();');
  await page.getByRole("button", { name: "Run", exact: true }).click();
  await expect
    .poll(() =>
      page
        .locator("#canvas")
        .evaluate((c) =>
          Array.from(c.getContext("2d").getImageData(0, 0, 1, 1).data),
        ),
    )
    .toEqual([255, 99, 71, 255]);
  await changeCanvas(page, "Light");
  await expect
    .poll(() =>
      page
        .locator("#canvas")
        .evaluate((c) =>
          Array.from(c.getContext("2d").getImageData(0, 0, 1, 1).data),
        ),
    )
    .toEqual([255, 99, 71, 255]);
  await pasteCode(page,"while(true) {}");
  await page.getByRole("button", { name: "Run", exact: true }).click();
  await expect(page.locator("#status")).toHaveText("Running");
  await page.getByRole("button", { name: "Stop", exact: true }).click();
  await expect(page.locator("#status")).toHaveText("Stopped");
  await expect(page.locator("iframe")).toHaveCount(0);
});
test("offline ZIP retains exact source, fallback canvas, notices and real execution", async ({
  page,
  browser,
}) => {
  await page.goto("/#personal");
  const source = 'hideTurtle(); goto(0, 0); drawCircle(60, "coral", true);';
  // Exercise CodeMirror through real input; Firefox contenteditable fill can
  // append DOM text before its document observer has reconciled the buffer.
  await page.locator("#code").click();
  await page.keyboard.press('ControlOrMeta+A');
  await pasteCode(page,source);
  await expect(page.locator("#code")).toHaveText(source);
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
test("motion preference and failed engine loading preserve editable work", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#animation/bouncing-ball");
  await expect(page.locator("#status")).toHaveText("Ready");
  await page.route("**/engine/library.js", (route) => route.abort());
  const code = await page.locator("#code").innerText();
  await page.getByRole("button", { name: "Run", exact: true }).click();
  await expect(page.locator("#status")).toContainText(
    "The drawing engine could not load",
  );
  expect(await page.locator("#code").innerText()).toBe(code);
});
test("production screenshots for dark/light, settings and narrow review", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/#figures");
  await expect(page.locator(".catalogue-preview").first()).toHaveAttribute("data-drawn", "true");
  await expect(page.locator(".example-card").first()).toHaveCSS("opacity", "1");
  await page.screenshot({ path: "docs/images/kaplum-next-dark.png" });
  await page.goto("/#figure/figur-dino");
  await expect(page.locator("#status")).toHaveText("Running");
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  await page.screenshot({ path: "docs/images/kaplum-next-settings.png" });
  await page
    .getByRole("dialog")
    .getByRole("switch", { name: "Dark mode", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Light", exact: true })
    .click();
  await page.getByRole("button", { name: "Done", exact: true }).click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1400 });
  await page.screenshot({ path: "docs/images/kaplum-next-light.png" });
  // Capture the selected panel, rather than a moving selection thumb mid-transition.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("radio", { name: "Result", exact: true }).click();
  await expect
    .poll(() =>
      page.locator(".mobile-tabs .rubber-segment__thumb").evaluate((el) => {
        const left = el.style.clipPath.match(/inset\([^)]*? ([\d.]+)px round/);
        return left ? Number(left[1]) : 0;
      }),
    )
    .toBeGreaterThan(100);
  await page.screenshot({ path: "docs/images/kaplum-next-mobile.png" });
  await page.setViewportSize({ width: 1440, height: 1800 });
  await page.goto("/#course/state");
  await page.locator(".lesson-task > button").click();
  await expect(page.getByRole("group", { name: "Drawing playback" })).toBeVisible();
  await page.getByRole("button", { name: "Next drawing step", exact: true }).click();
  await expect(page.locator(".drawing-step")).toContainText("Position changed");
  await expect(page.locator(".turtle-state")).toContainText("35.0");
  await page.locator(".lesson-task").evaluate(el => el.scrollIntoView({block:"start"}));
  await page.screenshot({ path: "docs/images/kaplum-course.png" });
});

test("dark thumbnails match their labelled figure and all images decode", async ({
  page,
}) => {
  await page.goto("/#figure/figur-dino");
  await page
    .locator(".example-card img")
    .evaluateAll((imgs) => Promise.all(imgs.map((img) => img.decode())));
  const butterfly = page.locator(
    '.atlas-library img[src$="recipe-figur-schmetterling.png"]',
  );
  expect(
    await butterfly.evaluate((img) => {
      const c = document.createElement("canvas");
      c.width = c.height = 360;
      const x = c.getContext("2d");
      x.drawImage(img, 0, 0);
      const d = x.getImageData(0, 0, 360, 360).data;
      let n = 0;
      for (let i = 0; i < d.length; i += 4)
        if (
          d[i + 2] > 150 &&
          d[i + 2] > d[i] * 1.5 &&
          d[i + 2] > d[i + 1] * 1.2
        )
          n++;
      return n;
    }),
  ).toBeGreaterThan(1000);
  await changeCanvas(page, "Light");
  await expect(butterfly).toHaveAttribute(
    "src",
    "/assets/previews/recipe-figur-schmetterling.png",
  );
});

test("React Bits status and panel controls retain localized keyboard behaviour", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#animation/bouncing-ball");
  await expect(page.locator("#status .status-mark")).toHaveAttribute(
    "data-status",
    "running",
  );
  const code = page.getByRole("radio", { name: "Code", exact: true });
  await code.focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("radio", { name: "Result", exact: true }),
  ).toBeChecked();
  await expect(page.locator(".result-pane")).toBeVisible();
  await page.getByRole("button", { name: "Stop", exact: true }).click();
  await expect(page.locator("#status .status-mark")).toHaveAttribute(
    "data-status",
    "cancelled",
  );
  await page.getByLabel("Language", { exact: true }).selectOption("de");
  await expect(page.locator("#status")).toHaveText("Gestoppt");
  await expect(page.getByRole("radiogroup")).toHaveAccessibleName(
    "Studio-Ansicht",
  );
});
test("React Bits hints show on keyboard focus and dismiss without changing settings", async ({
  page,
}) => {
  await page.goto("/");
  const settings = page.getByRole("button", { name: "Settings", exact: true });
  await page.keyboard.press("Tab");
  await settings.focus();
  await expect(page.getByRole("tooltip")).toContainText(
    "Choose your canvas background",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("tooltip")).not.toBeVisible();
  await expect(settings).toBeFocused();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await settings.click();
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("Dock links keep deep links, active destination and drafts across navigation", async ({
  page,
}) => {
  await page.goto("/#figure/figur-dino");
  const dock = page.locator(".studio-dock");
  await expect(
    dock.getByRole("link", { name: "Figures", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await page.locator("#code").click();
  await page.keyboard.press("ControlOrMeta+A");
  await pasteCode(page,'hideTurtle(); drawDino(120, "coral", 30);');
  await expect(page.locator("#parameter-inspector")).toContainText("120");
  await expect(page.locator("#parameter-inspector")).toContainText('"coral"');
  await dock.getByRole("link", { name: "My projects", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#personal$/);
  await expect(
    dock.getByRole("link", { name: "My projects", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await page.goBack();
  await expect(page).toHaveURL(/#figure\/figur-dino$/);
  await expect(page.locator("#code")).toContainText("120");
  const toggle = page.getByRole("button", { name: "Parameters", exact: true });
  await toggle.click();
  await expect(page.locator("#parameter-inspector")).not.toBeVisible();
  await toggle.click();
  await expect(page.locator("#parameter-inspector")).toBeVisible();
});

test("Original Dock labels appear only on hover or focus with one active indicator", async ({ page }) => {
  for (const viewport of [{ width: 1280, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.goto("/#figures");
    const active = page.locator('.studio-dock a[aria-current="page"]');
    await expect(active).toHaveCount(1);
    const styles = await active.evaluate((link) => {
      const outer = getComputedStyle(link);
      const icon = getComputedStyle(link.querySelector("svg"));
      return { background: outer.backgroundColor, shadow: outer.boxShadow, padding: outer.padding, iconWidth: icon.width };
    });
    expect(styles).toEqual({ background: "rgba(0, 0, 0, 0)", shadow: "none", padding: "0px", iconWidth: "22px" });
    await expect(active.locator(".dock-face")).toBeVisible();
    await expect(page.locator(".studio-dock .dock-dot")).toHaveCount(1);
    await expect(active.locator(".dock-dot")).toBeVisible();
    const label = active.locator(".dock-label");
    await expect(page.locator(".studio-dock .dock-label")).toHaveCount(5);
    await page.mouse.move(0, 0);
    await expect(label).toHaveCSS("opacity", "0");
    const supportsHover = await page.evaluate(() => matchMedia("(hover: hover)").matches);
    console.log(`Dock hover capability at ${viewport.width}px: ${supportsHover}`);
    await active.hover();
    // The upstream CSS intentionally enables pointer labels only on hover-capable devices.
    await expect(label).toHaveCSS("opacity", supportsHover ? "1" : "0");
    await page.mouse.move(0, 0);
    await expect(label).toHaveCSS("opacity", "0");
    await active.focus();
    await expect(label).toHaveCSS("opacity", "1");
    await active.blur();
    const bounds = await page.locator(".atlas-layout").boundingBox();
    const dockBounds = await page.locator(".studio-dock").boundingBox();
    expect(bounds.y + bounds.height).toBeGreaterThan(dockBounds.y);
    await expect(page.locator(".studio-dock")).toHaveCSS("position", "fixed");
    const tile = await active.locator(".dock-face").evaluate(el => getComputedStyle(el).backgroundImage);
    expect(tile).toContain("linear-gradient");

  }
});
test("Touch layout leaves labelled Dock and playback reachable without overlap", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#animation/bouncing-ball");
  await page.getByRole("radio", { name: "Result", exact: true }).click();
  const stop = page.getByRole("button", { name: "Stop", exact: true });
  await stop.scrollIntoViewIfNeeded();
  await expect
    .poll(async () => {
      const action = await stop.boundingBox(),
        dock = await page.locator(".studio-dock").boundingBox();
      return !!action && !!dock && action.y + action.height <= dock.y;
    })
    .toBe(true);
  await stop.click();
  await expect(page.locator("#status")).toHaveText("Stopped");
  await expect(page.locator(".studio-dock").getByRole("link")).toHaveCount(5);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("Atlas gives the workspace full width with an optional library below", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1536, height: 1024 });
  await page.goto("/#figure/figur-dino");
  await expect(page.locator("h1")).toHaveText("Dinosaur");
  await expect(page.locator("#status")).toHaveText("Running");
  await expect(page.locator(".atlas-library")).toBeHidden();
  const code = await page.locator(".code-pane").boundingBox();
  const result = await page.locator(".result-pane").boundingBox();
  const inspector = await page.locator("#parameter-inspector").boundingBox();
  const dock = await page.locator(".studio-dock").boundingBox();
  expect(code.x).toBeLessThan(50);
  expect(code.y + code.height).toBeLessThanOrEqual(result.y + 1);
  expect(result.x + result.width).toBeLessThan(inspector.x);
  expect(result.y + result.height).toBeLessThanOrEqual(1024);
  expect(dock.width).toBeLessThan(400);
  expect(
    await page
      .locator(".studio-dock")
      .evaluate((el) => getComputedStyle(el).backgroundColor),
  ).toBe("rgba(0, 0, 0, 0)");
  await page.getByRole("button", {name:"Example library",exact:true}).click();
  const library = await page.locator(".atlas-library").boundingBox();
  expect(library.y).toBeGreaterThan(result.y);
  await page
    .locator(".atlas-library")
    .getByRole("link", { name: "Pacman", exact: true })
    .click();
  await expect(page.locator("h1")).toHaveText("Pacman");
  await expect(page.locator(".atlas-library .example-card")).toHaveCount(32);
});

test("Narrow Atlas library can be opened and examples stay editable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#figure/figur-dino");
  await expect(page.locator(".atlas-library")).not.toBeVisible();
  await page
    .getByRole("button", { name: "Example library", exact: true })
    .click();
  await page
    .locator(".studio-dock")
    .getByRole("link", { name: "Basic commands", exact: true })
    .click();
  await expect(page.locator(".catalogue-page .example-card")).toHaveCount(reference.length);
  await page.goto("/#command/forward");
  await page.getByRole("radio", { name: "Code", exact: true }).click();
  await expect(page.locator("#code")).toBeVisible();
});

test("Dino parameter fields change only the displayed call on explicit apply", async ({
  page,
}) => {
  await page.goto("/#figure/figur-dino");
  const original =
    'hideTurtle();\n// keep my notes\nforward(10);\ndrawDino(80, "LimeGreen", 25);\nright(90);';
  await pasteCode(page,original);
  await page.getByLabel("size", { exact: true }).fill("120");
  expect(await page.locator("#code").innerText()).toBe(original);
  await page.getByRole("button", { name: "Apply & run", exact: true }).click();
  await expect
    .poll(() => page.locator("#code").innerText())
    .toBe(original.replace("drawDino(80,", "drawDino(120,"));
  await expect(page.locator("#status")).toHaveText("Running");
  await page
    .locator("#code")
    .fill('let size = 80; drawDino(size, "LimeGreen", 25);');
  await expect(
    page.getByRole("button", { name: "Apply & run", exact: true }),
  ).toHaveCount(0);
  await expect(page.locator("#parameter-inspector")).toContainText(
    "Edit expressions or variable values",
  );
});

test("All ten colour designs coordinate Dock and controls, persist and preserve learner code", async ({ page }) => {
  await page.goto("/#figure/figur-dino");
  await expect(page.locator("#status")).toHaveText("Running");
  const source = await page.locator("#code").innerText();
  const canvas = await canvasColor(page);
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  const dialog = page.getByRole("dialog");
  const presets = dialog.getByRole("radio");
  await expect(presets).toHaveCount(10);
  const colours = new Set();
  for (let index = 0; index < 10; index++) {
    await presets.nth(index).check();
    await expect(presets.nth(index)).toBeChecked();
    const styles = await page.locator(".studio-dock .dock").evaluate(el => {
      const root = getComputedStyle(document.documentElement);
      const tile = getComputedStyle(el.querySelector(".dock-face"));
      return { accent: root.getPropertyValue("--accent").trim(), ink: tile.color,
        text: root.getPropertyValue("--text").trim(), gradient: tile.backgroundImage };
    });
    colours.add(styles.accent);
    expect(styles.gradient).toContain("linear-gradient");
    // The tile glyph uses the Studio text token rather than an upstream fixed colour.
    expect(styles.ink).toBe("rgb(237, 244, 255)");
  }
  expect(colours.size).toBe(10);
  await dialog.getByRole("switch", { name: "Dark mode", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await presets.nth(2).check();
  await dialog.getByRole("button", { name: "Done", exact: true }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-color-preset", "violet");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(await canvasColor(page)).toBe(canvas);
  expect(await page.locator("#code").innerText()).toBe(source);
  await expect(page.locator(".studio-dock .dock-face").first()).toHaveCSS("color", "rgb(22, 45, 71)");
});

test("Unknown saved colour design falls back without losing existing preferences", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("kaplum-settings-v1", JSON.stringify({ theme: "light", canvas: "dark", locale: "en", colorPreset: "unknown" })));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-color-preset", "ocean");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator("html")).toHaveAttribute("data-canvas", "dark");
});

test("Full catalogues explain parameters and live configurator renders angle and colour changes", async ({ page }) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/#figures");
  await expect(page.locator("h1")).toHaveText("Figures");
  await expect(page.locator(".catalogue-page .example-card")).toHaveCount(32);
  const dino = page.locator(".example-card").filter({ has: page.getByRole("link", { name: "Dinosaur", exact: true }) });
  await expect(dino.locator(".parameter-inputs")).toBeVisible();
  await expect(dino).toContainText("legAngle");
  const canvas = dino.locator("canvas");
  const pixels = () => canvas.evaluate(el => Array.from(el.getContext("2d").getImageData(0, 0, 700, 700).data).reduce((sum, value, index) => sum + value * (index % 17), 0));
  await expect.poll(pixels).toBeGreaterThan(0);
  const before = await pixels();
  await dino.getByRole("slider", { name: "legAngle slider", exact: true }).fill("-40");
  await expect(dino.locator(".example-call")).toContainText("-40");
  await canvas.scrollIntoViewIfNeeded();
  await expect.poll(pixels).not.toBe(before);
  await dino.locator('input[type="color"]').fill("#ff0000");
  await expect(dino.locator(".example-call")).toContainText('"#ff0000"');
  await canvas.scrollIntoViewIfNeeded();
  await expect.poll(() => canvas.evaluate(el => { const data = el.getContext("2d").getImageData(0, 0, 700, 700).data; let red = 0; for (let i = 0; i < data.length; i += 4) if (data[i] > 200 && data[i + 1] < 40 && data[i + 2] < 40) red++; return red; })).toBeGreaterThan(500);
  await expect(page).toHaveURL(/#figures$/);
  await dino.getByRole("link", { name: "Open in Studio", exact: true }).click();
  await expect(page.locator("#code")).toContainText('"#ff0000"');
  await expect(page.locator("#code")).toContainText("-40");
  await page.goto("/#inspect-figure/figur-dino");
  await page.getByRole("slider", { name: "legAngle slider", exact: true }).fill("30");
  await page.getByRole("link", { name: "Open in Studio", exact: true }).click();
  await expect(page.locator("#code")).toContainText("-40");
  await page.goto("/#commands");
  await expect(page.locator(".catalogue-page .example-card")).toHaveCount(reference.length);
  await page.goto("/#inspect-command/penup");
  await expect(page.locator(".configurator-controls")).toContainText("This command has no parameters");
  await expect.poll(() => page.locator(".configurator-preview canvas").evaluate(el => el.getContext("2d").getImageData(0, 0, 700, 700).data.some(v => v > 0))).toBe(true);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test("Inline parameter reset and explicit pause work without leaving the catalogue", async ({ page }) => {
  await page.goto("/#figures");
  const card = page.locator(".example-card").filter({ has: page.getByRole("link", { name: "Dinosaur", exact: true }) });
  const preview = card.locator(".catalogue-preview");
  await expect(preview).toHaveAttribute("data-drawn", "true");
  await preview.getByRole("button").click();
  await card.getByRole("slider", { name: "legAngle slider", exact: true }).fill("-30");
  await card.locator("canvas").scrollIntoViewIfNeeded();
  await expect(preview).toHaveAttribute("data-paused", "true");
  await expect(preview).toHaveAttribute("data-playing", "false");
  await card.getByRole("button", { name: "Reset example", exact: true }).click();
  await expect(card.locator(".example-call")).toContainText('drawDino(120, "LimeGreen", 25)');
  await expect(page).toHaveURL(/#figures$/);
});

test("Dock opens each full catalogue and cards keep readable borders in both themes", async ({ page }) => {
  for (const viewport of [{ width: 1280, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.goto("/#commands");
    const dock = page.locator(".studio-dock");
    await expect(dock.getByRole("link")).toHaveCount(5);
    for (const [label, heading, count] of [["Figures", "Figures", 32], ["Basic commands", "Basic commands", reference.length], ["Animations", "Animations", 26]]) {
      const link = dock.getByRole("link", { name: label, exact: true });
      await link.click();
      await expect(page.locator("h1")).toHaveText(heading);
      await expect(link).toHaveAttribute("aria-current", "page");
      await expect(dock.locator('[aria-current="page"]')).toHaveCount(1);
      await expect(page.locator(".catalogue-page .example-card")).toHaveCount(count);
      await expect(page.locator(".atlas-library")).not.toBeVisible();
    }
    for (let theme = 0; theme < 2; theme++) {
      const card = page.locator(".catalogue-page .example-card").first();
      await expect(card).toHaveCSS("border-top-width", "1px");
      await expect(card).toHaveCSS("border-top-style", "solid");
      const styles = await card.evaluate(el => { const css = getComputedStyle(el); return { border: css.borderTopColor, background: css.backgroundColor, padding: css.paddingTop }; });
      expect(styles.border).not.toBe(styles.background);
      expect(styles.padding).toBe("16px");
      await page.getByRole("switch", { name: "Dark mode", exact: true }).click();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("Kaplum branding and existing browser preferences survive the rename", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("kaplu-settings-v1", JSON.stringify({ theme: "light", canvas: "dark", locale: "en", colorPreset: "violet" })));
  await page.goto("/");
  await expect(page).toHaveTitle("Kaplum Studio");
  await expect(page.locator(".brand")).toHaveText("Kaplum Studio");
  await expect(page.locator("html")).toHaveAttribute("data-color-preset", "violet");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("switch", { name: "Dark mode", exact: true }).click();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("kaplum-settings-v1")).colorPreset)).toBe("violet");
});

test("Catalogue only runs visible previews and retains explicit pauses across navigation", async ({ page }) => {
  await page.goto("/#animations");
  const previews = page.locator(".catalogue-preview");
  await expect(previews).toHaveCount(26);
  const first = previews.first();
  await expect(first).toHaveAttribute("data-playing", "true");
  await expect(first).toHaveAttribute("data-drawn", "true");
  await expect(previews.last()).toHaveAttribute("data-playing", "false");
  await first.getByRole("button").click();
  await expect(first).toHaveAttribute("data-paused", "true");
  await previews.last().scrollIntoViewIfNeeded();
  await expect(first).toHaveAttribute("data-playing", "false");
  await expect(previews.last()).toHaveAttribute("data-playing", "true");
  await first.scrollIntoViewIfNeeded();
  await expect(first).toHaveAttribute("data-playing", "false");
  const dock = page.locator(".studio-dock");
  await dock.getByRole("link", { name: "Figures", exact: true }).click();
  await dock.getByRole("link", { name: "Animations", exact: true }).click();
  await expect(previews.first()).toHaveAttribute("data-paused", "true");
  await previews.first().getByRole("button").click();
  await previews.first().locator("canvas").scrollIntoViewIfNeeded();
  await expect(previews.first()).toHaveAttribute("data-playing", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(previews.first()).toHaveAttribute("data-playing", "false");
  await previews.first().getByRole("button").click();
  await previews.first().locator("canvas").scrollIntoViewIfNeeded();
  await expect(previews.first()).toHaveAttribute("data-playing", "true");
});

test("Favicon follows the chosen palette and appearance, preserving its crown", async ({ page }) => {
  await page.goto("/");
  const icon = () => page.locator('link[rel="icon"]').first().getAttribute("href");
  await expect.poll(icon).toContain("data:image/svg+xml,");
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  await page.getByRole("radio", { name: "Violet", exact: true }).check();
  await expect.poll(async () => decodeURIComponent(await icon())).toContain('fill="#c4b5fd"');
  expect(decodeURIComponent(await icon())).toContain('fill="#ffcf57"');
  await page.getByRole("dialog").getByRole("switch", { name: "Dark mode", exact: true }).click();
  await expect.poll(async () => decodeURIComponent(await icon())).toContain('fill="#7c3aed"');
  await page.reload();
  await expect.poll(async () => decodeURIComponent(await icon())).toContain('fill="#7c3aed"');
  const rendered = await page.locator('link[rel="icon"]').first().evaluate(async link => { const img = new Image(); img.src = link.href; await img.decode(); return img.naturalWidth > 0; });
  expect(rendered).toBe(true);
  // Late streamed metadata must not restore a competing static favicon.
  await page.evaluate(() => { const link = document.createElement("link"); link.rel = "icon"; link.href = "/favicon.ico"; document.head.append(link); });
  await expect.poll(() => page.locator('link[rel="icon"]').evaluateAll(links => links.every(link => link.href.startsWith("data:image/svg+xml,") && link.href === links[0].href))).toBe(true);
});

test("Figure catalogue uses three columns and fits small drawings without changing their code", async ({ page }) => {
  await page.setViewportSize({ width: 1900, height: 1100 });
  await page.goto("/#figures");
  const columns = () => page.locator(".catalogue-page .gallery-grid").evaluate(el => getComputedStyle(el).gridTemplateColumns.split(" ").length);
  expect(await columns()).toBe(3);
  const dino = page.locator(".example-card").filter({ has: page.getByRole("link", { name: "Dinosaur", exact: true }) });
  await expect(dino.locator(".catalogue-preview")).toHaveAttribute("data-drawn", "true");
  const drawingWidth = () => dino.locator("canvas").evaluate(el => { const pixels = el.getContext("2d").getImageData(0, 0, 700, 700).data; let left = 700, right = 0; for(let y=0;y<700;y++) for(let x=0;x<700;x++) if(pixels[(y*700+x)*4+3]>20) { left=Math.min(left,x);right=Math.max(right,x); } return right-left; });
  await expect.poll(drawingWidth).toBeGreaterThan(200);
  await expect(dino.locator(".example-call")).toContainText('drawDino(120, "LimeGreen", 25)');
  await page.setViewportSize({ width: 900, height: 900 });
  expect(await columns()).toBe(2);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await columns()).toBe(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("Every figure recipe presents real pixels without a manual draw command", async ({ page }) => {
  await page.goto("/#figures");
  const previews = page.locator(".catalogue-preview");
  await expect(previews).toHaveCount(32);
  for (let i = 0; i < 32; i++) {
    const preview = previews.nth(i);
    await preview.scrollIntoViewIfNeeded();
    await expect(preview).toHaveAttribute("data-playing", "true");
    await expect.poll(() => preview.locator("canvas").evaluate(el => { const d=el.getContext("2d").getImageData(0,0,700,700).data;let count=0;for(let j=3;j<d.length;j+=4)if(d[j]>20)count++;return count; }), { message: `Figure ${i} must be visibly rendered` }).toBeGreaterThan(0);
  }
});


test("Quiet catalogue cards and React Bits filters support keyboard, search and reduced motion", async ({ page }) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#figures");
  await expect(page.locator(".spotlight-card__light, .spotlight-card__edge")).toHaveCount(0);
  const cards = page.locator(".catalogue-page .example-card");
  await expect(cards).toHaveCount(32);
  await expect(cards.first()).toHaveCSS("opacity", "1");
  await expect(cards.first()).toHaveCSS("transform", "none");
  const categories = page.getByRole("radiogroup", { name: "Figures", exact: true });
  const all = categories.getByRole("radio", { name: "All", exact: true });
  await all.focus();
  await page.keyboard.press("ArrowRight");
  await expect(categories.getByRole("radio", { name: "Animals", exact: true })).toBeChecked();
  await expect(cards).toHaveCount(4);
  await categories.getByRole("radio", { name: "All", exact: true }).click();
  await page.getByRole("searchbox", { name: "Find an example", exact: true }).fill("Dinosaur");
  await expect(cards).toHaveCount(1);
  await page.getByRole("button", { name: "Clear search", exact: true }).click();
  await expect(cards).toHaveCount(32);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCSS("animation-name", "none");
  await expect(page.locator(".library-toggle")).not.toBeVisible();
  expect(errors).toEqual([]);
});

test("Retina catalogue renders sharp geometry and keeps size changes visible", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1900, height: 1100 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  try {
    await page.goto('/#figures');
    await page.getByRole('searchbox').fill('drawPacman');
    const card = page.locator('.example-card');
    const canvas = card.locator('canvas');
    await expect(card.locator('.catalogue-preview')).toHaveAttribute('data-drawn', 'true');
    const geometry = () => canvas.evaluate(c => {
      const { width, height } = c;
      const pixels = c.getContext('2d').getImageData(0, 0, width, height).data;
      let left = width, right = -1, top = height, bottom = -1;
      for (let y=0; y<height; y++) for (let x=0; x<width; x++) if(pixels[(y*width+x)*4+3]>20) {
        left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);
      }
      let partial=0, occupied=0;
      const y=Math.round(height*.44);
      for(let x=0;x<width;x++) {const alpha=pixels[(y*width+x)*4+3]; if(alpha>0) occupied++; if(alpha>0 && alpha<255)partial++;}
      return { width, css: c.getBoundingClientRect().width, left, right, top, bottom, partial, occupied };
    });
    let first=await geometry();
    expect(first.width).toBeGreaterThanOrEqual(Math.ceil(first.css*2));
    expect(first.partial).toBeLessThanOrEqual(6);
    expect(first.occupied).toBeGreaterThan(first.width*.15);
    const initialWidth = first.right - first.left;
    await card.getByRole('slider', {name:'radius slider', exact:true}).fill('150');
    await card.locator('canvas').scrollIntoViewIfNeeded();
    await expect(card.locator('.example-call')).toContainText('drawPacman(150,');
    await expect.poll(async () => { const next = await geometry(); return (next.right-next.left)/initialWidth; }).toBeGreaterThan(1.7);
    await card.getByRole('slider', {name:'radius slider', exact:true}).fill('25');
    await card.locator('canvas').scrollIntoViewIfNeeded();
    await expect.poll(async () => { const next = await geometry(); return (next.right-next.left)/initialWidth; }).toBeLessThan(.55);
    await card.getByRole('button', {name:'Reset example', exact:true}).click();
    await card.locator('canvas').scrollIntoViewIfNeeded();
    await expect.poll(async () => { const next = await geometry(); return Math.abs((next.right-next.left)-initialWidth); }).toBeLessThan(3);
  } finally { await context.close(); }
});


test("Dinosaur size visibly changes on a stable catalogue scale", async ({ page }) => {
  await page.goto('/#figures');
  await page.getByRole('searchbox').fill('drawDino');
  const card = page.locator('.example-card');
  await expect(card.locator('.catalogue-preview')).toHaveAttribute('data-drawn', 'true');
  const width = () => card.locator('canvas').evaluate(c => {
    const pixels = c.getContext('2d').getImageData(0,0,c.width,c.height).data;
    let left=c.width,right=-1;
    for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++)if(pixels[(y*c.width+x)*4+3]>20){left=Math.min(left,x);right=Math.max(right,x);}
    return right-left;
  });
  const initial = await width();
  await card.getByRole('slider', {name:'size slider', exact:true}).fill('40');
    await card.locator('canvas').scrollIntoViewIfNeeded();
  await expect.poll(async () => (await width())/initial).toBeLessThan(.6);
  await card.getByRole('slider', {name:'size slider', exact:true}).fill('160');
    await card.locator('canvas').scrollIntoViewIfNeeded();
  await expect.poll(async () => (await width())/initial).toBeGreaterThan(1.3);
});


test("Static catalogue shares engine loads and stops transferring unchanged frames", async ({ page }) => {
  const requests = [];
  page.on('request', r => { if (/\/(engine\/.*\.js|src\/worker\.js)$/.test(new URL(r.url()).pathname)) requests.push(new URL(r.url()).pathname); });
  await page.addInitScript(() => {
    window.previewFrames=0;
    addEventListener('message', e => { if(e.data?.type==='frame')window.previewFrames++; });
  });
  await page.goto('/#figures');
  await page.getByRole('searchbox').fill('drawDino');
  await expect(page.locator('.catalogue-preview')).toHaveAttribute('data-drawn','true');
  const frames = await page.evaluate(() => window.previewFrames);
  // Deliberate sampling window: a static picture must not stream 30 bitmaps/sec.
  await page.waitForTimeout(400);
  expect(await page.evaluate(() => window.previewFrames)-frames).toBeLessThanOrEqual(1);
  await page.getByRole('slider',{name:'size slider',exact:true}).fill('60');
  await page.locator('canvas').scrollIntoViewIfNeeded();
  await expect(page.locator('.example-call')).toContainText('drawDino(60,');
  await expect(page.locator('.catalogue-preview')).toHaveAttribute('data-drawn','true');
  for(const path of ['/engine/library.js','/engine/functions.js','/src/worker.js','/engine/teaching-clock.js']) expect(requests.filter(p=>p===path)).toHaveLength(1);
});


test("Catalogue ranges represent complete ovals and the default 24 firework rays", async ({ page }) => {
  await page.goto('/#figures');
  await page.getByRole('searchbox').fill('drawOvalArc');
  const oval = page.locator('.example-card').filter({ has: page.getByRole('heading', { name: 'Oval', exact: true }) });
  const degrees = oval.getByRole('slider', {name:'degrees slider', exact:true});
  await expect(degrees).toHaveValue('360');
  await degrees.fill('270');
  await expect(oval.locator('.example-call')).toContainText('270,');
  await oval.getByRole('button', {name:'Reset example', exact:true}).click();
  await expect(degrees).toHaveValue('360');
  await page.getByRole('searchbox').fill('Firework');
  const rays = page.getByRole('slider', {name:'rays slider', exact:true});
  await expect(rays).toHaveValue('24');
  await rays.fill('40');
  await expect(page.locator('.example-call')).toContainText('40)');
});

test("Catalogue performance sample records first drawing and warm slider latency", async ({ page }, testInfo) => {
  const start = Date.now();
  await page.goto('/#figures');
  await page.getByRole('searchbox').fill('drawDino');
  const preview = page.locator('.catalogue-preview');
  await expect(preview).toHaveAttribute('data-drawn', 'true');
  const firstDrawingMs = Date.now() - start;
  await page.evaluate(() => {
    window.lastFrameAt = 0;
    addEventListener('message', event => { if(event.data?.type === 'frame') window.lastFrameAt = performance.now(); });
  });
  const started = await page.evaluate(() => performance.now());
  await page.getByRole('slider', {name:'size slider', exact:true}).fill('100');
  await page.locator('canvas').scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => window.lastFrameAt)).toBeGreaterThan(started);
  const sliderMs = await page.evaluate(start => window.lastFrameAt - start, started);
  console.log('Preview sample:', JSON.stringify({firstDrawingMs, sliderMs, browser:testInfo.project.name}));
  await testInfo.attach('preview-performance.json', {body: JSON.stringify({ firstDrawingMs, sliderMs, viewport: page.viewportSize(), browser: testInfo.project.name }), contentType:'application/json'});
  // Generous regression ceiling, not a claim about the desired 150ms UX budget.
  expect(sliderMs).toBeLessThan(2000);
});


test("Static previews settle without an indeterminate spinner; animations keep running", async ({ page }) => {
  await page.goto('/#figures');
  await page.getByRole('searchbox').fill('drawDino');
  const preview = page.locator('.catalogue-preview');
  await expect(preview).toHaveAttribute('data-drawn', 'true');
  await expect(preview.getByRole('status')).toHaveText('Ready');
  await expect(preview.locator('.status-mark')).toHaveAttribute('data-status', 'done');
  await expect(preview.locator('.status-mark')).not.toHaveAttribute('data-indeterminate', '');
  await page.locator('.studio-dock').getByRole('link', {name:'Animations', exact:true}).click();
  await expect(page.locator('.catalogue-preview').first().getByRole('status')).toHaveText('Running');
});

test("Figure exploration extremes preserve a clear margin in the actual catalogue camera", async ({ page }) => {
  await page.goto('/#figures');
  const cases = [
    ['drawDino','size',160], ['drawButterfly','size',140], ['drawPacman','radius',180],
    ['drawCircle','radius',120], ['drawHalfCircle','radius',120],
    ['drawTriangle','size',170], ['drawStar','size',100], ['drawFlower','size',60],
    ['drawRect','widthValue',280], ['drawRect','height',280],
  ];
  for (const [name, parameter, max] of cases) {
    await page.getByRole('searchbox').fill(name);
    const card = page.locator('.example-card').filter({has:page.getByRole('slider',{name:`${parameter} slider`,exact:true})}).first();
    const slider = card.getByRole('slider',{name:`${parameter} slider`,exact:true});
    await expect(slider).toHaveAttribute('max',String(max));
    for (const value of [await slider.getAttribute('min'), String(max)]) {
      await slider.fill(value);
      await card.locator('canvas').scrollIntoViewIfNeeded();
      await expect(card.locator('.catalogue-preview')).toHaveAttribute('data-drawn','true');
      // A one-pixel margin detects cropping, independent of device pixel ratio.
      await expect.poll(() => card.locator('canvas').evaluate(c => {
        const pixels=c.getContext('2d').getImageData(0,0,c.width,c.height).data;
        let edge=0,occupied=0;
        for(let i=3;i<pixels.length;i+=4)if(pixels[i]>20)occupied++;
        for(let i=0;i<c.width;i++)for(const k of [i,(c.height-1)*c.width+i,i*c.width,i*c.width+c.width-1])if(pixels[k*4+3]>20)edge++;
        return occupied>0 && edge===0;
      })).toBe(true);
    }
  }
});
