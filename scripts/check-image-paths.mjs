/**
 * Audit /images/ paths referenced in source against files under public/images/.
 * Resolves IMAGES.* alias usages to concrete paths from lib/images.ts.
 *
 * Run: node scripts/check-image-paths.mjs
 * Exit 1 if any referenced path is missing on disk.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC_IMAGES = path.join(ROOT, "public", "images");
const IMAGES_TS = path.join(ROOT, "lib", "images.ts");

const SCAN_DIRS = ["app", "components", "lib", "content"];
const SCAN_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mdx", ".css"]);

const IMAGE_PATH_RE = /\/images\/[a-zA-Z0-9_./-]+/g;
const IMAGES_ALIAS_RE = /IMAGES\.([a-zA-Z]+)\.([a-zA-Z]+)/g;

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === "node_modules" || ent.name === ".next") continue;
    const abs = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(abs, acc);
    else if (SCAN_EXT.has(path.extname(ent.name))) acc.push(abs);
  }
  return acc;
}

function normalizePath(p) {
  return p.split("?")[0].split("#")[0];
}

function existsOnDisk(imagePath) {
  const rel = normalizePath(imagePath).replace(/^\/images\//, "");
  return fs.existsSync(path.join(PUBLIC_IMAGES, rel));
}

function findSiblingExt(imagePath) {
  const norm = normalizePath(imagePath);
  const rel = norm.replace(/^\/images\//, "");
  const dirAbs = path.join(PUBLIC_IMAGES, path.dirname(rel));
  const base = path.basename(norm, path.extname(norm));
  if (!fs.existsSync(dirAbs)) return [];
  return fs
    .readdirSync(dirAbs)
    .filter((f) => path.parse(f).name === base)
    .map((f) => `/images/${path.dirname(rel)}/${f}`.replace(/\\/g, "/"));
}

/** Parse IMAGES constant string paths from lib/images.ts */
function parseImagesAliases() {
  const content = fs.readFileSync(IMAGES_TS, "utf8");
  const aliases = new Map();
  const block = content.match(/export const IMAGES = \{([\s\S]*?)\} as const;/);
  if (!block) return aliases;
  const re = /(\w+):\s*\{([^}]*)\}/g;
  let section;
  while ((section = re.exec(block[1])) !== null) {
    const group = section[1];
    const inner = section[2];
    const pathRe = /(\w+):\s*"(\/images\/[^"]+)"/g;
    let m;
    while ((m = pathRe.exec(inner)) !== null) {
      aliases.set(`${group}.${m[1]}`, m[2]);
    }
  }
  return aliases;
}

function extractPathsFromFile(filePath, content, aliasMap) {
  const relFile = path.relative(ROOT, filePath);
  const hits = [];

  for (const match of content.matchAll(IMAGE_PATH_RE)) {
    hits.push({
      path: normalizePath(match[0]),
      file: relFile,
      kind: "literal",
    });
  }

  if (relFile !== "lib/images.ts") {
    for (const match of content.matchAll(IMAGES_ALIAS_RE)) {
      const key = `${match[1]}.${match[2]}`;
      const resolved = aliasMap.get(key);
      if (resolved) {
        hits.push({
          path: normalizePath(resolved),
          file: relFile,
          kind: `alias IMAGES.${key}`,
        });
      } else {
        hits.push({
          path: null,
          file: relFile,
          kind: `alias IMAGES.${key}`,
          unknownAlias: key,
        });
      }
    }
  }

  return hits;
}

function main() {
  const aliasMap = parseImagesAliases();
  const references = [];

  for (const dir of SCAN_DIRS) {
    for (const file of walk(path.join(ROOT, dir))) {
      const content = fs.readFileSync(file, "utf8");
      references.push(...extractPathsFromFile(file, content, aliasMap));
    }
  }

  const unknownAliases = references.filter((r) => r.unknownAlias);
  const resolvedRefs = references.filter((r) => r.path);

  const uniqueRefs = new Map();
  for (const ref of resolvedRefs) {
    const key = ref.path;
    if (!uniqueRefs.has(key)) uniqueRefs.set(key, []);
    uniqueRefs.get(key).push(`${ref.file} (${ref.kind})`);
  }

  const missing = [];
  const wrongExt = [];
  const ok = [];

  for (const [imagePath, sources] of uniqueRefs) {
    if (existsOnDisk(imagePath)) {
      ok.push({ path: imagePath, sources });
      continue;
    }
    const siblings = findSiblingExt(imagePath);
    if (siblings.length > 0) {
      wrongExt.push({ path: imagePath, sources, existsAs: siblings });
    } else {
      missing.push({ path: imagePath, sources });
    }
  }

  const usedAliases = new Set();
  for (const ref of resolvedRefs) {
    const m = ref.kind?.match(/^alias (IMAGES\.\w+\.\w+)$/);
    if (m) usedAliases.add(m[1].replace("IMAGES.", ""));
  }
  const unusedAliases = [];
  for (const [key, imagePath] of aliasMap) {
    if (!usedAliases.has(key)) {
      unusedAliases.push({ alias: `IMAGES.${key}`, path: imagePath });
    }
  }

  const legacyRoots = [
    "hero/",
    "guides/guides-",
    "articles/",
    "diagrams/diagrams-",
    "japanprotips-logo.png",
    "nav-search-icon.png",
    "suica/",
  ];

  console.log("=== Image path audit ===\n");
  console.log(`Reference occurrences: ${references.length}`);
  console.log(`Unique paths checked: ${uniqueRefs.size}`);
  console.log(`IMAGES aliases defined: ${aliasMap.size}`);
  console.log(`IMAGES aliases used in app code: ${usedAliases.size}`);
  console.log(`Existing on disk: ${ok.length}`);
  console.log(`Wrong extension: ${wrongExt.length}`);
  console.log(`Missing: ${missing.length}`);
  console.log(`Unknown IMAGES aliases: ${unknownAliases.length}\n`);

  if (wrongExt.length) {
    console.log("--- Wrong extension (sibling file exists) ---");
    for (const row of wrongExt) {
      console.log(`  ${row.path}`);
      console.log(`    use instead: ${row.existsAs.join(", ")}`);
      console.log(`    sources: ${[...new Set(row.sources)].join("; ")}`);
    }
    console.log();
  }

  if (missing.length) {
    console.log("--- Missing files ---");
    for (const row of missing) {
      console.log(`  ${row.path}`);
      console.log(`    sources: ${[...new Set(row.sources)].join("; ")}`);
    }
    console.log();
  }

  if (unknownAliases.length) {
    console.log("--- Unknown IMAGES alias references ---");
    for (const row of unknownAliases) {
      console.log(`  ${row.unknownAlias} in ${row.file}`);
    }
    console.log();
  }

  if (unusedAliases.length) {
    console.log("--- IMAGES aliases defined but not referenced in scanned code ---");
    for (const row of unusedAliases) {
      const exists = existsOnDisk(row.path) ? "ok" : "MISSING";
      console.log(`  ${row.alias} -> ${row.path} [${exists}]`);
    }
    console.log();
  }

  console.log("--- Legacy on-disk files not referenced (safe to delete later) ---");
  let legacyCount = 0;
  function walkPub(dir, prefix = "") {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const rel = prefix ? `${prefix}/${ent.name}` : ent.name;
      if (ent.isDirectory()) walkPub(path.join(dir, ent.name), rel);
      else {
        const pubPath = `/images/${rel.replace(/\\/g, "/")}`;
        if (!uniqueRefs.has(pubPath) && legacyRoots.some((r) => rel.includes(r) || rel === r.replace(/\/$/, ""))) {
          if (legacyCount < 15) console.log(`  ${pubPath}`);
          legacyCount++;
        }
      }
    }
  }
  if (fs.existsSync(PUBLIC_IMAGES)) walkPub(PUBLIC_IMAGES);
  if (legacyCount > 15) console.log(`  ... ${legacyCount - 15} more legacy files`);
  console.log();

  const fail = missing.length + wrongExt.length + unknownAliases.length > 0;
  process.exit(fail ? 1 : 0);
}

main();
