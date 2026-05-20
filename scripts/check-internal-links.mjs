import fs from "fs";
import path from "path";

const hrefRe = /href=["'](\/[^"'#?]+)["']/g;
const links = new Set();

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      walk(full);
    } else if (/\.(tsx|mdx|md)$/.test(entry.name)) {
      const text = fs.readFileSync(full, "utf8");
      let match;
      while ((match = hrefRe.exec(text))) links.add(match[1]);
    }
  }
}

for (const root of ["app", "content", "components"]) {
  if (fs.existsSync(root)) walk(root);
}

const routes = new Set();

function walkApp(dir, base = "") {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith("(") || entry.name === "api") continue;
      const segment = entry.name.startsWith("[") ? null : entry.name;
      walkApp(full, segment ? `${base}/${segment}` : base);
    } else if (entry.name === "page.tsx") {
      routes.add(base || "/");
    }
  }
}

walkApp("app");

const prefixes = ["/guides/", "/residents/", "/tourists", "/resources/"];
const internal = [...links].filter((href) =>
  prefixes.some((p) => href === p || href.startsWith(p)),
);

const broken = internal.filter((href) => {
  const normalized = href.replace(/\/$/, "") || "/";
  return !routes.has(normalized) && !routes.has(href);
});

console.log(`Checked ${internal.length} internal paths against ${routes.size} routes.`);
if (broken.length === 0) {
  console.log("No broken internal guide/resident links found.");
} else {
  console.log(`Broken (${broken.length}):`);
  broken.forEach((href) => console.log(`  ${href}`));
  process.exit(1);
}
