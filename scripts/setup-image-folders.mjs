/**
 * Non-destructive image folder setup for JapanProTips.
 * Copies existing assets into the new structure and creates placeholder files.
 * Does NOT delete old folders or files.
 *
 * Run: node scripts/setup-image-folders.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const IMAGES = path.join(ROOT, "public", "images");

const DEFAULT_PLACEHOLDER = "hero/hero-train-platform.jpg";

const VISITOR_GUIDE_SLUGS = [
  "start-here-japan",
  "japan-tourist-mistakes",
  "japan-mistakes-first-time-visitors",
  "japan-money-mistakes",
  "japan-cultural-mistakes",
  "japan-escalator-rules",
  "japan-travel-insurance",
  "japan-itinerary",
  "japan-travel-fatigue",
  "japan-packing-list",
  "japan-laundry-guide",
  "how-to-use-japanese-toilets",
  "japan-restaurant-guide",
  "japan-food-allergy-guide",
  "japan-breakfast-cafe-guide",
  "japan-onsen-guide",
  "japan-nightlife-guide",
  "japan-weather-by-month",
  "japan-rainy-season-guide",
  "japan-airport-first-steps",
  "japan-jetlag-survival",
  "japan-airport-to-city",
  "japan-luggage-shipping",
  "japan-coin-lockers",
  "japan-post-office-guide",
  "narita-to-tokyo",
  "haneda-to-tokyo",
  "sim-card-japan",
  "japan-public-wifi",
  "japan-apps-guide",
  "using-google-maps-in-japan",
  "do-you-need-sim-japan",
  "esim-vs-pocket-wifi-japan",
  "airalo-vs-ubigi-japan",
  "getting-around-japan",
  "japan-trains",
  "jr-pass-worth-it",
  "shinkansen-guide",
  "japan-transportation",
  "japan-train-mistakes",
  "suica-vs-pasmo",
  "suica-pasmo-guide",
  "money-payments-japan",
  "japan-cash-vs-card",
  "japan-cash-withdrawal-guide",
  "japan-budget-breakdown",
  "japan-convenience-store-guide",
  "japan-familymart-lawson-7eleven-comparison",
  "japan-conbini-food-guide",
  "japan-vending-machines",
  "japan-drugstore-guide",
  "japan-tax-free-shopping",
  "japan-anime-shopping-guide",
  "where-to-stay-japan",
  "japan-hotel-room-size",
  "where-to-stay-tokyo",
  "where-to-stay-kyoto",
  "where-to-stay-osaka",
  "best-area-tokyo-first-time",
  "shinjuku-vs-shibuya",
  "mdx-pilot",
  "mdx-second-test",
];

const TOOL_SLUGS = [
  "japan-itinerary-planner",
  "can-i-bring-this-to-japan",
  "japan-packing-generator",
  "japan-trip-budget-calculator",
  "japan-monthly-cost-calculator",
  "japanese-address-formatter",
];

/** Per-slug hero/diagram source overrides (relative to public/images). */
const GUIDE_OVERRIDES = {
  "suica-pasmo-guide": {
    hero: "guides/guides-suica.webp",
    "main-photo": "hero/hero-suica-card.jpg",
  },
  "suica-vs-pasmo": {
    hero: "guides/guides-suica.webp",
    "main-photo": "suica/welcomesuica.jpg",
  },
  "sim-card-japan": { hero: "guides/guides-eSIM.jpg" },
  "do-you-need-sim-japan": { hero: "guides/guides-eSIM.jpg" },
  "esim-vs-pocket-wifi-japan": {
    hero: "guides/guides-eSIM.jpg",
    diagram: "diagrams/diagrams-esim.jpg",
  },
  "airalo-vs-ubigi-japan": { hero: "guides/guides-eSIM.jpg" },
  "using-google-maps-in-japan": { hero: "guides/guides-gogglemap.webp" },
  "japan-apps-guide": { hero: "guides/guides-gogglemap.webp" },
  "narita-to-tokyo": {
    hero: "hero/hero-airport.jpg",
    diagram: "diagrams/diagrams-airport-route.jpg",
  },
  "haneda-to-tokyo": {
    hero: "hero/hero-airport.jpg",
    diagram: "diagrams/diagrams-airport-route.jpg",
  },
  "japan-airport-to-city": { hero: "articles/articles-airport-guide.jpg" },
  "japan-airport-first-steps": { hero: "hero/hero-airport.jpg" },
  "shinkansen-guide": { hero: "hero/hero-shinkansen.jpg" },
  "japan-trains": { hero: "hero/hero-shinkansen.jpg" },
  "jr-pass-worth-it": { hero: "hero/hero-shinkansen.jpg" },
  "getting-around-japan": { hero: "hero/hero-train-platform.jpg" },
  "japan-transportation": { hero: "hero/hero-train-platform.jpg" },
  "japan-train-mistakes": { hero: "hero/hero-train-ticketing.jpg" },
  "money-payments-japan": { hero: "hero/hero-suica-card.jpg" },
  "japan-coin-lockers": { hero: "hero/hero-train-ticketing.jpg" },
  "start-here-japan": { hero: "diagrams/diagrams-japan-map.jpg" },
  "japan-itinerary": { hero: "diagrams/diagrams-japan-map.jpg" },
  "where-to-stay-japan": { hero: "diagrams/diagrams-japan-map.jpg" },
  "japan-convenience-store-guide": { hero: "hero/hero-train-platform.jpg" },
  "japan-cash-withdrawal-guide": { hero: "hero/hero-suica-card.jpg" },
};

const GUIDE_SLOT_FILES = [
  "hero",
  "main-photo",
  "section-01",
  "section-02",
  "step-01",
  "step-02",
];

const RESIDENT_SLOT_FILES = [
  "hero",
  "main-photo",
  "section-01",
  "section-02",
  "step-01",
  "step-02",
];

const TOOL_SLOT_FILES = [
  "hero",
  "tool-preview",
  "screenshot-01",
  "screenshot-02",
];

const stats = {
  foldersCreated: 0,
  filesCopied: 0,
  inventory: [],
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    stats.foldersCreated++;
  }
}

function extOf(relPath) {
  return path.extname(relPath).toLowerCase() || ".jpg";
}

function copyAsset(srcRel, destAbs, { skipIfExists = true } = {}) {
  const srcAbs = path.join(IMAGES, srcRel);
  if (!fs.existsSync(srcAbs)) {
    console.warn(`  [skip] missing source: ${srcRel}`);
    return false;
  }
  if (skipIfExists && fs.existsSync(destAbs)) {
    return true;
  }
  ensureDir(path.dirname(destAbs));
  fs.copyFileSync(srcAbs, destAbs);
  stats.filesCopied++;
  return true;
}

function slotDest(baseDir, slotName, srcRel) {
  const ext = extOf(srcRel);
  return path.join(baseDir, `${slotName}${ext}`);
}

function populatePageFolder({
  category,
  slug,
  slotFiles,
  overrides = {},
  routePrefix,
}) {
  const folder = path.join(IMAGES, category, slug);
  ensureDir(folder);

  const defaultHero = overrides.hero ?? DEFAULT_PLACEHOLDER;
  const created = [];
  let hasRealHero = false;

  for (const slot of slotFiles) {
    const src =
      overrides[slot] ??
      (slot === "hero" ? defaultHero : DEFAULT_PLACEHOLDER);
    const dest = slotDest(folder, slot, src);
    const ok = copyAsset(src, dest);
    if (ok) {
      created.push(path.basename(dest));
      if (slot === "hero" && src !== DEFAULT_PLACEHOLDER) {
        hasRealHero = true;
      }
    }
  }

  if (overrides.diagram) {
    const dest = slotDest(folder, "diagram", overrides.diagram);
    if (copyAsset(overrides.diagram, dest)) {
      created.push(path.basename(dest));
    }
  }

  if (overrides.map) {
    const dest = slotDest(folder, "map", overrides.map);
    if (copyAsset(overrides.map, dest)) {
      created.push(path.basename(dest));
    }
  }

  const ogDir = path.join(IMAGES, "og", category);
  ensureDir(ogDir);
  const ogSrc = overrides.hero ?? defaultHero;
  const ogDest = slotDest(ogDir, slug, ogSrc);
  if (copyAsset(ogSrc, ogDest)) {
    created.push(`og/${category}/${path.basename(ogDest)}`);
  }

  stats.inventory.push({
    route: `${routePrefix}/${slug}`,
    folder: `public/images/${category}/${slug}/`,
    files: created.sort().join(", "),
    placeholder: hasRealHero ? "partial" : "all placeholders",
    notes: hasRealHero
      ? "Hero mapped from legacy asset"
      : "Default train-platform placeholder",
  });
}

function getResidentSlugs() {
  const base = path.join(ROOT, "app", "residents");
  return fs
    .readdirSync(base, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

function setupBrandAndUi() {
  copyAsset(
    "japanprotips-logo.png",
    path.join(IMAGES, "brand", "japanprotips-logo.png"),
    { skipIfExists: false },
  );
  copyAsset(
    "nav-search-icon.png",
    path.join(IMAGES, "ui", "nav-search-icon.png"),
    { skipIfExists: false },
  );
  copyAsset(
    DEFAULT_PLACEHOLDER,
    path.join(IMAGES, "ui", "placeholder.jpg"),
    { skipIfExists: false },
  );
}

function setupShared() {
  const shared = [
    ["guides/guides-suica.webp", "suica-card.webp"],
    ["hero/hero-train-ticketing.jpg", "train-ticket-gate.jpg"],
    ["hero/hero-train-platform.jpg", "train-platform.jpg"],
    ["hero/hero-train-platform.jpg", "convenience-store.jpg"],
    ["hero/hero-train-ticketing.jpg", "coin-locker.jpg"],
    ["hero/hero-suica-card.jpg", "seven-bank-atm.jpg"],
    ["hero/hero-shinkansen.jpg", "japan-street-crossing.jpg"],
    ["hero/hero-train-platform.jpg", "japan-trash-bins.jpg"],
  ];
  for (const [src, destName] of shared) {
    copyAsset(src, path.join(IMAGES, "shared", destName), {
      skipIfExists: false,
    });
  }
}

function setupDiagrams() {
  const diagrams = [
    ["diagrams/diagrams-airport-route.jpg", "airport-route.jpg"],
    ["diagrams/diagrams-esim.jpg", "esim.jpg"],
    ["diagrams/diagrams-japan-map.jpg", "japan-map.jpg"],
    ["diagrams/diagrams-jr-route.pdf", "jr-route.pdf"],
  ];
  for (const [src, destName] of diagrams) {
    copyAsset(src, path.join(IMAGES, "diagrams", destName), {
      skipIfExists: false,
    });
  }
  copyAsset(
    "diagrams/diagrams-airport-route.jpg",
    path.join(IMAGES, "diagrams", "narita-to-tokyo", "diagram.jpg"),
    { skipIfExists: false },
  );
}

function writeInventory() {
  const lines = [
    "# Image inventory",
    "",
    "Auto-generated by `node scripts/setup-image-folders.mjs`. Re-run after adding routes or placeholders.",
    "",
    "## Migration: old folders safe to delete later",
    "",
    "After verifying all pages load correctly, these legacy folders may be removed:",
    "",
    "- `public/images/hero/` (copied to `shared/` and per-guide folders)",
    "- `public/images/guides/` flat files (`guides-*.jpg/webp`)",
    "- `public/images/articles/` (`articles-airport-guide.jpg` moved to guide folder)",
    "- `public/images/suica/` (`welcomesuica.jpg` copied to suica guides)",
    "- Loose root files: `japanprotips-logo.png`, `nav-search-icon.png` (now under `brand/`, `ui/`)",
    "",
    "Keep `public/images/diagrams/diagrams-*` until diagram references are fully migrated.",
    "",
    "## Page inventory",
    "",
    "| Route | Expected folder | Files created | Placeholder status | Notes |",
    "| --- | --- | --- | --- | --- |",
  ];

  for (const row of stats.inventory) {
    lines.push(
      `| ${row.route} | \`${row.folder}\` | ${row.files || "N/A"} | ${row.placeholder} | ${row.notes} |`,
    );
  }

  lines.push("");
  lines.push("## Shared assets");
  lines.push("");
  lines.push("| File | Source | Status |");
  lines.push("| --- | --- | --- |");
  for (const name of fs.readdirSync(path.join(IMAGES, "shared")).sort()) {
    lines.push(`| \`shared/${name}\` | Legacy hero/guides | Placeholder until final art |`);
  }

  fs.writeFileSync(
    path.join(ROOT, "docs", "image-inventory.md"),
    lines.join("\n"),
    "utf8",
  );
}

function main() {
  console.log("Setting up image folder structure (non-destructive)...\n");

  setupBrandAndUi();
  setupShared();
  setupDiagrams();

  for (const slug of VISITOR_GUIDE_SLUGS) {
    populatePageFolder({
      category: "guides",
      slug,
      slotFiles: GUIDE_SLOT_FILES,
      overrides: GUIDE_OVERRIDES[slug] ?? {},
      routePrefix: "/guides",
    });
  }

  for (const slug of getResidentSlugs()) {
    populatePageFolder({
      category: "residents",
      slug,
      slotFiles: RESIDENT_SLOT_FILES,
      overrides: {},
      routePrefix: "/residents",
    });
  }

  for (const slug of TOOL_SLUGS) {
    populatePageFolder({
      category: "tools",
      slug,
      slotFiles: TOOL_SLOT_FILES,
      overrides: { hero: "hero/hero-train-ticketing.jpg" },
      routePrefix: "/tools",
    });
  }

  writeInventory();

  console.log(`Done. Folders created: ${stats.foldersCreated}`);
  console.log(`Files copied: ${stats.filesCopied}`);
  console.log(`Inventory: docs/image-inventory.md`);
}

main();
