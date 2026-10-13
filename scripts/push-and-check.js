import { execFileSync } from "node:child_process";
const repo = "pengusto/kaplum-studio";
const read = (command, args) => execFileSync(command, args, { encoding: "utf8" }).trim();
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
if (read("git", ["branch", "--show-current"]) !== "main") throw new Error("Pages publication requires main.");
if (read("git", ["status", "--porcelain"])) throw new Error("Commit or resolve working-tree changes before publishing.");
const sha = read("git", ["rev-parse", "HEAD"]);
execFileSync("git", ["push", "origin", "main"], { stdio: "inherit" });
let previous = "";
for (let attempt = 0; attempt < 60; attempt++) {
  const runs = JSON.parse(read("gh", ["run", "list", "--repo", repo, "--workflow", "pages.yml", "--commit", sha, "--limit", "1", "--json", "status,conclusion,url,headSha"]));
  const run = runs[0];
  const status = run ? `${run.status} ${run.conclusion || ""}`.trim() : "Waiting for Pages run";
  if (status !== previous) { console.log(`Pages: ${status}`); previous = status; }
  if (run?.status === "completed") {
    if (run.conclusion !== "success") throw new Error(`Pages failed: ${run.url}`);
    console.log(`Published ${sha}: ${run.url}`);
    process.exit(0);
  }
  await sleep(15000);
}
throw new Error(`Pages verification timed out for ${sha}; deployment is not confirmed.`);
