import { test, expect } from "@playwright/test";
import { studioUrl, studioDescription, homeDescription, serializeStructuredData } from "../src/structured-data";
import { homeCopy } from "../src/home-copy";
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

for (const [path, type] of [["/", "studio"], ["/docs/", "documentation"]]) {
  test(`${type} publishes parseable JSON-LD and its canonical in static HTML`, async ({ request }) => {
    const response = await request.get(`${base}${path}`);
    expect(response.ok()).toBe(true);
    const html = await response.text();
    const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    expect(scripts).toHaveLength(1);
    const data = JSON.parse(scripts[0][1]);
    expect(data["@context"]).toBe("https://schema.org");
    const nodes = data["@graph"] || [data];
    const page = nodes.find(node => node["@type"] === "WebPage");
    expect(page.url).toBe(studioUrl + (type === "documentation" ? "docs/" : ""));
    expect(html).toContain(`rel="canonical" href="${page.url}"`);
    expect(page.inLanguage).toEqual(["en", "de", "ja", "tr", "hy"]);
    if (type === "studio") {
      const app = nodes.find(node => node["@type"] === "WebApplication");
      expect(app.description).toBe(studioDescription);
      expect(page.description).toBe(homeDescription);
      expect(page.headline).toBe(homeCopy.en.title);
      expect(html).toContain(homeDescription);
      expect(html).toContain(homeCopy.en.title);
      expect(app.audience).toEqual({ "@type": "Audience", audienceType: "Programming beginners and curious learners" });
      expect(homeDescription.toLowerCase()).toContain(app.audience.audienceType.toLowerCase());
      expect(JSON.stringify(data)).not.toMatch(/typicalAgeRange|suggestedMinAge|suggestedMaxAge|educationalRole/);
      expect(studioDescription).toContain("for beginners");
      expect(studioDescription).not.toMatch(/children|kids/i);
      const description = html.match(/<meta name="description" content="([^"]*)"/);
      expect(description?.[1]).toBe(homeDescription);
      expect(app.applicationCategory).toBe("EducationalApplication");
      expect(app.offers).toBeUndefined();
      expect(app.isAccessibleForFree).toBe(false);
      expect(studioDescription).not.toMatch(/\bfree\b/i);
      expect(app.license).toBe("https://github.com/pengusto/kaplum-studio/blob/main/LICENSE");
      expect(page.mainEntity["@id"]).toBe(app["@id"]);
      expect(app.softwareHelp.url).toBe(studioUrl + "docs/");
    } else expect(page.about["@id"]).toBe(studioUrl + "#application");
    expect(JSON.stringify(data)).not.toMatch(/aggregateRating|ratingValue|FAQPage|BreadcrumbList|localhost/);
  });
}

test('public sitemap includes the application and documentation, without hash routes', async ({ request }) => {
  const response = await request.get(`${base}/sitemap.xml`);
  expect(response.ok()).toBe(true);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  expect(urls).toEqual([studioUrl, `${studioUrl}docs/`]);
});

test('JSON-LD serialization cannot close the script element', () => {
  const value = { name: '</script><script>alert("x")</script>' };
  const serialized = serializeStructuredData(value);
  expect(serialized).not.toContain('<');
  expect(JSON.parse(serialized)).toEqual(value);
});

test('changing language and hash route retains one stable application graph', async ({ page }) => {
  await page.goto(`${base}/#home`);
  const schema = page.locator('script[type="application/ld+json"]');
  const original = await schema.textContent();
  await expect(page.locator(".home-page h1")).toHaveText(homeCopy.en.title);
  await expect(page.locator(".home-message")).toContainText(homeDescription);
  await page.locator('.language-picker select').selectOption('de');
  await page.goto(`${base}/#animation/circle`);
  await expect(schema).toHaveCount(1);
  expect(await schema.textContent()).toBe(original);
});
