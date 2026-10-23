import { cp, mkdir, rm } from "node:fs/promises";
// Only generated destinations are removed; source assets remain untouched.
for (const name of ["engine", "assets", "src", "THIRD_PARTY_NOTICES.txt", "LICENSE", "favicon.svg", "favicon.ico", "apple-touch-icon.png"])
  await rm(`public/${name}`, { recursive: true, force: true });
await mkdir("public/src", { recursive: true });
for (const name of ["engine", "assets", "THIRD_PARTY_NOTICES.txt", "LICENSE"])
  await cp(name, `public/${name}`, { recursive: true });
await cp("src/worker.js", "public/src/worker.js");

for (const name of ["favicon.svg", "favicon.ico", "apple-touch-icon.png"])
  await cp(`assets/branding/${name}`, `public/${name}`);
