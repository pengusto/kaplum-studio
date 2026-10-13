import { serializeStructuredData } from "../src/structured-data";

export default function StructuredData({ data }) {
  return <script id="kaplum-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(data) }} />;
}
