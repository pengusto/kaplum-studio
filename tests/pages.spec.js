import {pasteCode} from "./helpers/editor.js";
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
    for (const path of ["/engine/library.js", "/engine/functions.js", "/src/worker.js", "/favicon.svg", "/THIRD_PARTY_NOTICES.txt", "/LICENSE"]) {
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
  await page.locator("#code").click();
  await page.keyboard.press("ControlOrMeta+A");
  await pasteCode(page,source);
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
    expect(await readFile(join(dir, "LICENSE"), "utf8")).toBe(
      await readFile("LICENSE", "utf8"),
    );
    expect(await readFile(join(dir, "THIRD_PARTY_NOTICES.txt"), "utf8")).toBe(
      await readFile("THIRD_PARTY_NOTICES.txt", "utf8"),
    );
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
test("legal pages expose confirmed contact and privacy in all five languages", async ({ page }) => {
  await page.goto(`${base}/legal/`);
  for (const locale of ['en','de','ja','tr','hy']) {
    const section=page.locator(`section#${locale}`);
    await expect(section).toContainText('Enis Uysal');
    await expect(section.getByRole('link',{name:'hello@kikaio.de'})).toHaveAttribute('href','mailto:hello@kikaio.de');
    await expect(section.locator('h2')).toHaveCount(2);
    await expect(section.locator('p')).toHaveCount(5);
    await section.locator('address').scrollIntoViewIfNeeded();
    await expect(section.locator('address')).toBeInViewport();
  }
  await page.goto(`${base}/#figures`);
  await page.locator('.studio-legal-links').scrollIntoViewIfNeeded();
  await expect(page.locator('.studio-legal-links')).toBeInViewport();
  await expect(page.locator('.studio-legal-links a')).toHaveCount(2);
  await expect(page.locator('.studio-legal-links a').first()).toHaveAttribute('href',`${base}/legal/#en`);
});

test('exported keyboard and pointer controls work offline in logical coordinates', async ({page,browser})=>{
  await page.goto(`${base}/#personal`);
  const source='onKey("ArrowRight",()=>{angle(90);forward(25);}); onClick(({x,y})=>goto(x,y));';
  await page.locator('#code').click();await page.keyboard.press('ControlOrMeta+A');await pasteCode(page,source);
  const download=page.waitForEvent('download');await page.getByRole('button',{name:'Download project ZIP',exact:true}).click();
  const dir=await mkdtemp(join(tmpdir(),'kaplum-input-export-'));
  try{
    await (await download).saveAs(join(dir,'project.zip'));execFileSync('unzip',['-q',join(dir,'project.zip'),'-d',dir]);
    const offline=await browser.newPage();await offline.goto(pathToFileURL(join(dir,'index.html')).href);
    const canvas=offline.locator('#turtlecanvas');await canvas.focus();await offline.keyboard.press('ArrowRight');expect(await offline.evaluate(()=>position().x)).toBeCloseTo(25);
    const box=await canvas.boundingBox();await canvas.click({position:{x:box.width/2,y:box.height/2}});const position=await offline.evaluate(()=>window.position());expect(position.x).toBeCloseTo(0,0);expect(position.y).toBeCloseTo(0,0);
    await offline.close();
  }finally{await rm(dir,{recursive:true,force:true});}
});

test('exported stamps, path circle and bounded undo execute from file without network',async({page,browser})=>{
 await page.goto(`${base}/#personal`);
 const source='hideTurtle(); wrap(false); const h=recordDrawing(()=>{color("red");goto(-60,0);stamp();goto(60,0);const id=stamp();clearStamp(id);penup();circle(30,180);clear();});h.finish();undo();';
 await page.locator('#code').click();await page.keyboard.press('ControlOrMeta+A');await pasteCode(page,source);
 const pending=page.waitForEvent('download');await page.getByRole('button',{name:'Download project ZIP',exact:true}).click();const dir=await mkdtemp(join(tmpdir(),'kaplum-feature-export-'));
 try{
  await(await pending).saveAs(join(dir,'project.zip'));execFileSync('unzip',['-q',join(dir,'project.zip'),'-d',dir]);expect(await readFile(join(dir,'program.js'),'utf8')).toBe(source);
  const offline=await browser.newPage();const errors=[];offline.on('pageerror',e=>errors.push(e.message));await offline.goto(pathToFileURL(join(dir,'index.html')).href);
  await expect.poll(()=>offline.evaluate(()=>[...document.getElementById('turtlecanvas').getContext('2d').getImageData(290,350,1,1).data])).toEqual([255,0,0,255]);
  expect(await offline.evaluate(()=>position().x)).toBeCloseTo(0);expect(await offline.evaluate(()=>heading())).toBeCloseTo(-180);const detail=await offline.evaluate(()=>__displayTurtleState());expect(detail.penColor).toBe('#ff0000');expect(detail.stampCount).toBe(1);expect(errors).toEqual([]);await offline.close();
 }finally{await rm(dir,{recursive:true,force:true});}
});

test('mounted course lab and construction views load under Pages subpath',async({page})=>{
 await page.goto(`${base}/#course`);await expect(page.locator('.feature-lesson-grid article')).toHaveCount(9);await page.locator('.feature-lesson-grid article').first().getByRole('link').click();await expect(page).toHaveURL(/#course\/square$/);await page.getByRole('button',{name:'Record drawing',exact:true}).click();await expect(page.getByRole('group',{name:'Drawing playback'})).toBeVisible();
 await page.goto(`${base}/#course/functions`);await page.locator('.lesson-debug-start').click();await page.getByRole('button',{name:'Continue code',exact:true}).click();await expect(page.locator('.debug-command')).toContainText('Finished');await expect(page.locator('.debug-call-stack')).toHaveText('Active calls: main.js');await expect(page.locator('.source-debugger dl > div').filter({has:page.locator('dt',{hasText:/^perimeter$/})}).locator('dd')).toHaveText('400');
 await page.goto(`${base}/#figure/figur-pacman`);await page.locator('.inspector-toggle').click();await expect(page.locator('.explanation-pane')).toBeVisible();await page.locator('.example-construction summary').click();await expect(page.locator('.example-construction pre')).toContainText('function drawPacman(');
});

test("commercial license is served and documented in every UI language", async ({ page, request }) => {
  const response = await request.get(`${base}/LICENSE`);
  expect(response.ok()).toBe(true);
  expect(await response.text()).toBe(await readFile("LICENSE", "utf8"));
  for (const locale of ["en", "de", "ja", "tr", "hy"]) {
    await page.goto(`${base}/docs/?lang=${locale}`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("#about")).toContainText("Pengusto Commercial License 1.0");
    await expect(page.locator("#about").getByRole("link", { name: "Pengusto Commercial License 1.0", exact: true }))
      .toHaveAttribute("href", "https://github.com/pengusto/kaplum-studio/blob/main/LICENSE");
    await expect(page.locator("#about").getByRole("link", { name: "MIT", exact: true })).toHaveCount(0);
  }
});
