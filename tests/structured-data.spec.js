import { test, expect } from "@playwright/test";
import { studioUrl, studioDescription, serializeStructuredData } from "../src/structured-data";
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
      expect(page.description).toBe(studioDescription);
      expect(studioDescription).toContain("for beginners");
      expect(studioDescription).not.toMatch(/children|kids/i);
      const description = html.match(/<meta name="description" content="([^"]*)"/);
      expect(description?.[1]).toBe(studioDescription);
      expect(app.applicationCategory).toBe("EducationalApplication");
      expect(app.offers).toMatchObject({ "@type": "Offer", price: 0, priceCurrency: "EUR" });
      expect(app.isAccessibleForFree).toBe(true);
      expect(app.license).toBe("https://github.com/pengusto/kaplum-studio/blob/main/LICENSE");
      expect(page.mainEntity["@id"]).toBe(app["@id"]);
      expect(app.softwareHelp.url).toBe(studioUrl + "docs/");
    } else expect(page.about["@id"]).toBe(studioUrl + "#application");
    expect(JSON.stringify(data)).not.toMatch(/aggregateRating|ratingValue|FAQPage|BreadcrumbList|localhost/);
  });
}

test('JSON-LD serialization cannot close the script element', () => {
  const value = { name: '</script><script>alert("x")</script>' };
  const serialized = serializeStructuredData(value);
  expect(serialized).not.toContain('<');
  expect(JSON.parse(serialized)).toEqual(value);
});

test('changing language and hash route retains one stable application graph', async ({ page }) => {
  await page.goto(`${base}/#figures`);
  const schema = page.locator('script[type="application/ld+json"]');
  const original = await schema.textContent();
  await page.locator('.language-picker select').selectOption('de');
  await page.goto(`${base}/#animation/circle`);
  await expect(schema).toHaveCount(1);
  expect(await schema.textContent()).toBe(original);
});
