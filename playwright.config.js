import { defineConfig } from "@playwright/test";
const port = Number(process.env.PLAYWRIGHT_PORT || 4187);
const browser = process.env.PLAYWRIGHT_BROWSER || "chromium";
export default defineConfig({
  testDir: "tests",
  // Firefox canvas tests contend for CPU when run together; keep every test,
  // but run that browser serially so animation stability checks can settle.
  workers: browser === "firefox" ? 1 : 2,
  use: { baseURL: `http://localhost:${port}` },
  webServer: {
    command: `PORT=${port} STATIC_DIR=${process.env.STATIC_DIR || "out"} bun server.js`,
    port,
    reuseExistingServer: false,
  },
  projects: [{ name: browser, use: { browserName: browser } }],
});
