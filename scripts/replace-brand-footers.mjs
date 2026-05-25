import fs from "node:fs";

const files = [
  "app/guides/esim-vs-pocket-wifi-japan/page.tsx",
  "app/guides/japan-airport-to-city/page.tsx",
  "app/guides/japan-budget-breakdown/page.tsx",
  "app/guides/japan-itinerary/page.tsx",
  "app/guides/japan-mistakes-first-time-visitors/page.tsx",
  "app/guides/japan-money-mistakes/page.tsx",
  "app/guides/japan-trains/page.tsx",
  "app/guides/sim-card-japan/page.tsx",
  "app/guides/suica-pasmo-guide/page.tsx",
  "app/guides/where-to-stay-japan/page.tsx",
  "app/guides/where-to-stay-tokyo/page.tsx",
  "app/residents/part-time-jobs-japan/page.tsx",
];

const re =
  /\s*<div className="border-t border-tan pt-8 mt-6">[\s\S]*?JapanProTips homepage[\s\S]*?<\/div>/g;
const replacement = "\n        <SiteBrandFooter />";
const importLine =
  'import { SiteBrandFooter } from "@/components/brand/SiteBrandFooter";\n';

for (const f of files) {
  let s = fs.readFileSync(f, "utf8");
  if (!re.test(s)) {
    console.log("skip", f);
    continue;
  }
  s = s.replace(re, replacement);
  if (!s.includes("SiteBrandFooter")) {
    const idx = s.indexOf("\n");
    s = s.slice(0, idx + 1) + importLine + s.slice(idx + 1);
  }
  fs.writeFileSync(f, s);
  console.log("ok", f);
}
