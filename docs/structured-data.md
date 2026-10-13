# Structured data

Kaplum publishes server-rendered JSON-LD in the static export. The Studio has a WebApplication and a WebPage linked by stable IDs; documentation has a WebPage describing the same application. Canonicals point to the public Pages URLs, independent of preview ports, interface language or hash routes. Hash activities are not presented as separately indexed pages.

The application describes verified existing features, the five languages, MIT license, repository, documentation and zero-cost access. Ratings, reviews, FAQ, breadcrumbs, course credentials and organization claims are omitted because the site does not provide their corresponding content.

Google software rich results require a real rating or review; this markup currently has neither and does not claim rich-result eligibility. WebSite site-name markup is omitted because Google does not support separate site names for subdirectories such as this Pages mount.

Tests parse the actual exported HTML before JavaScript runs, check page-specific URLs and graph relationships, prevent duplicate graphs after navigation, and verify script-safe serialization. Full browser suites and Pages subpath tests cover the markup before push and in CI. Automated tests do not establish Google indexing or rich-result acceptance; those remain external checks in the Rich Results Test, Schema.org Validator and Search Console.

Primary references:
- https://schema.org/WebApplication
- https://developers.google.com/search/docs/appearance/structured-data/software-app
- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
