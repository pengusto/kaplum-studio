import Documentation from "../../components/Documentation";
import StructuredData from "../../components/StructuredData";
import { studioUrl, documentationStructuredData } from "../../src/structured-data";
export const metadata = { title: "Documentation — Kaplum Studio", description: documentationStructuredData.description, alternates: { canonical: `${studioUrl}docs/` } };
export default function DocsPage() { return <><StructuredData data={documentationStructuredData} /><Documentation /></>; }
