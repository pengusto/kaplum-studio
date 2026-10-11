import { cp, mkdir } from "node:fs/promises";
await mkdir("public/src", { recursive: true });
for (const name of ["engine", "assets", "THIRD_PARTY_NOTICES.txt"])
  await cp(name, `public/${name}`, { recursive: true });
await cp("src/worker.js", "public/src/worker.js");

for (const name of ["favicon.svg", "favicon.ico", "apple-touch-icon.png"])
  await cp(`assets/branding/${name}`, `public/${name}`);
