import { defineConfig } from "@playwright/test";
const port = Number(process.env.PLAYWRIGHT_PORT || 4187);
const browser = process.env.PLAYWRIGHT_BROWSER || "chromium";
export default defineConfig({
  testDir: "tests",
  // Canvas workers and browser instances share CPU; keep the full suite bounded.
  workers: 2,
  use: { baseURL: `http://localhost:${port}` },
  webServer: {
    command: `PORT=${port} STATIC_DIR=${process.env.STATIC_DIR || "out"} bun server.js`,
    port,
    reuseExistingServer: false,
  },
  projects: [{ name: browser, use: { browserName: browser } }],
});
