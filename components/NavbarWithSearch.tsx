import { buildGuideSearchIndex } from "@/lib/guide-search-index.server";
import { Navbar } from "@/components/Navbar";

/** Server wrapper: loads guide search index for the AoM-style nav search panel. */
export function NavbarWithSearch() {
  const searchEntries = buildGuideSearchIndex();
  return <Navbar searchEntries={searchEntries} />;
}
