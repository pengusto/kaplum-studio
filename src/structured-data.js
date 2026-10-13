export const studioUrl = "https://pengusto.github.io/kaplum-studio/";
export const repositoryUrl = "https://github.com/pengusto/kaplum-studio";
export const studioDescription = "A free visual JavaScript Turtle studio for children: explore examples, adjust parameters, inspect code step by step and export offline projects.";
const applicationId = `${studioUrl}#application`;
const documentationId = `${studioUrl}docs/#webpage`;
const languages = ["en", "de", "ja", "tr", "hy"];

export const studioStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": applicationId,
      name: "Kaplum Studio",
      url: studioUrl,
      description: studioDescription,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript and a modern web browser.",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: 0, priceCurrency: "EUR", url: studioUrl },
      inLanguage: languages,
      license: `${repositoryUrl}/blob/main/LICENSE`,
      sameAs: repositoryUrl,
      softwareHelp: { "@type": "WebPage", "@id": documentationId, url: `${studioUrl}docs/`, name: "Kaplum Studio documentation" },
      featureList: ["Live Turtle drawing previews", "Adjustable example parameters", "Step-by-step code inspection", "Offline project export", "Five interface languages"],
    },
    {
      "@type": "WebPage",
      "@id": `${studioUrl}#webpage`,
      url: studioUrl,
      name: "Kaplum Studio",
      description: studioDescription,
      mainEntity: { "@id": applicationId },
      inLanguage: languages,
    },
  ],
};

export const documentationStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": documentationId,
  url: `${studioUrl}docs/`,
  name: "Documentation — Kaplum Studio",
  description: "Learn the Kaplum Studio Turtle commands, parameters and offline workflow.",
  about: { "@type": "WebApplication", "@id": applicationId, name: "Kaplum Studio", url: studioUrl },
  inLanguage: languages,
};

export function serializeStructuredData(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
