import fs from "node:fs";

const files = [
  "app/guides/esim-vs-pocket-wifi-japan/page.tsx",
  "app/guides/japan-airport-to-city/page.tsx",
  "app/guides/japan-budget-breakdown/page.tsx",
  "app/guides/japan-itinerary/page.tsx",
  "app/guides/japan-trains/page.tsx",
  "app/guides/sim-card-japan/page.tsx",
  "app/guides/suica-pasmo-guide/page.tsx",
  "app/guides/where-to-stay-japan/page.tsx",
  "app/guides/where-to-stay-tokyo/page.tsx",
  "app/residents/part-time-jobs-japan/page.tsx",
];

const importLine =
  'import { SiteBrandFooter } from "@/components/brand/SiteBrandFooter";\n';

for (const f of files) {
  let s = fs.readFileSync(f, "utf8");
  if (s.includes("brand/SiteBrandFooter")) continue;
  if (!s.includes("<SiteBrandFooter")) continue;
  const idx = s.indexOf("\n");
  s = s.slice(0, idx + 1) + importLine + s.slice(idx + 1);
  fs.writeFileSync(f, s);
  console.log("import", f);
}
