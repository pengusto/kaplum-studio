import { resolve, sep } from "node:path";

// Local preview and test server for the static export in out/. Any static web server works in production.
const root = resolve(process.env.STATIC_DIR || "out");

Bun.serve({
  port: Number(process.env.PORT || 4173),
  async fetch(request) {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(request.url).pathname);
    } catch {
      return new Response("Bad request", { status: 400 });
    }
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    if (base) {
      if (pathname !== base && !pathname.startsWith(base + "/")) return new Response("Not found", { status: 404 });
      pathname = pathname.slice(base.length) || "/";
    }
    const path = resolve(
      root,
      "." + (pathname.endsWith("/") ? pathname + "index.html" : pathname),
    );
    if (!path.startsWith(root + sep)) {
      return new Response("Forbidden", { status: 403 });
    }
    const file = Bun.file(path);
    return (await file.exists())
      ? new Response(file)
      : new Response("Not found", { status: 404 });
  },
});
