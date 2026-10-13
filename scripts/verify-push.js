import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const screenshots = mkdtempSync(join(tmpdir(), "kaplum-push-"));
const env = { ...process.env, STATIC_DIR: "out", NEXT_PUBLIC_BASE_PATH: "", PLAYWRIGHT_BROWSER: "chromium", KAPLUM_SCREENSHOT_DIR: screenshots };
function run(args, overrides = {}) {
  console.log(`\nPre-push: bun ${args.join(" ")}`);
  const result = spawnSync("bun", args, { stdio: "inherit", env: { ...env, ...overrides } });
  if (result.error || result.status !== 0) throw new Error(`Check failed: bun ${args.join(" ")}`);
}
let mounted = false;
let failed = false;
try {
  run(["run", "build"]);
  run(["run", "test"]);
  run(["run", "test"], { PLAYWRIGHT_BROWSER: "firefox" });
  mounted = true;
  run(["run", "build"], { NEXT_PUBLIC_BASE_PATH: "/kaplum-studio" });
  run(["x", "playwright", "test", "tests/pages.spec.js", "tests/structured-data.spec.js"], { NEXT_PUBLIC_BASE_PATH: "/kaplum-studio" });
} catch (error) {
  console.error(error.message);
  failed = true;
} finally {
  if (mounted) {
    try { run(["run", "build"]); } catch (error) { console.error(error.message); failed = true; }
  }
  rmSync(screenshots, { recursive: true, force: true });
}
if (failed) { console.error("Push blocked: fix the failing checks first."); process.exit(1); }
console.log("All pre-push checks passed.");
