import { studioUrl } from "../src/structured-data";

// Hash-based Studio views share one document; list only standalone public pages.
export const dynamic = "force-static";

export default function sitemap() {
  return [{ url: studioUrl }, { url: `${studioUrl}docs/` }];
}
