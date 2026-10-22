import Studio from "../components/Studio";
import StructuredData from "../components/StructuredData";
import { studioUrl, homeDescription, studioStructuredData } from "../src/structured-data";
export const metadata = { description: homeDescription, alternates: { canonical: studioUrl } };
export default function Page() {
  return <><StructuredData data={studioStructuredData} /><Studio /></>;
}
