import Studio from "../components/Studio";
import StructuredData from "../components/StructuredData";
import { studioUrl, studioDescription, studioStructuredData } from "../src/structured-data";
export const metadata = { description: studioDescription, alternates: { canonical: studioUrl } };
export default function Page() {
  return <><StructuredData data={studioStructuredData} /><Studio /></>;
}
