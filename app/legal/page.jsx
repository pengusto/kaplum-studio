import { assetUrl } from "../../src/asset-url";
import { legalCopy } from "../../src/legal";
export const metadata = { title: "Legal notice & privacy — Kaplum Studio" };
export default function LegalPage() {
  return <main className="legal-page">
    <h1>Kaplum Studio</h1>
    <nav aria-label="Legal languages">{Object.entries(legalCopy).map(([locale, copy]) => <a key={locale} href={`#${locale}`} lang={locale}>{copy.language}</a>)}</nav>
    {Object.entries(legalCopy).map(([locale, copy]) => <section id={locale} lang={locale} key={locale}>
      <a href={assetUrl("/#figures")}>{copy.back}</a>
      <h2>{copy.notice}</h2><h3>{copy.contact}</h3>
      <address>Enis Uysal<br />Beisingstraße 39<br />45141 Essen<br /><a href="mailto:eniso.uysal@gmail.com">eniso.uysal@gmail.com</a></address>
      <h2 id={`privacy-${locale}`}>{copy.privacy}</h2>
      {copy.sections.map(([heading, text]) => <div key={heading}><h3>{heading}</h3><p>{text}</p></div>)}
      <p><a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub Privacy Statement</a> · <a href="https://www.ldi.nrw.de/">LDI NRW</a></p>
    </section>)}
  </main>;
}
