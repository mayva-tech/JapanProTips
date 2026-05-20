import fs from "fs";
import path from "path";
import {
  AFFILIATE_LINK_IDS,
  AFFILIATE_LINK_PLACEHOLDER,
  affiliateLinks,
  getAffiliateUrlOrNull,
  type AffiliateLinkId,
} from "@/lib/affiliate-links";
import {
  RECOMMENDATION_CATALOG,
  RECOMMENDATION_PLACEMENTS,
  RECOMMENDATION_PLACEMENT_ROUTES,
} from "@/lib/recommendations";
import { recommendedGearPresetItems } from "@/lib/recommended-gear-presets";
import { recommendedServicePresetItems } from "@/lib/recommended-service-presets";

export type AffiliateBoxKind = "gear" | "service" | "recommendation";

export type AffiliateUsage = {
  linkId: string;
  box: AffiliateBoxKind;
  route: string;
  itemName: string;
  source: "preset" | "inline" | "recommendation-catalog";
  file?: string;
};

export type AffiliateLinkAuditRow = {
  linkId: string;
  registered: boolean;
  url: string | null;
  status: "live" | "missing" | "empty";
  usageCount: number;
  routes: string[];
  usages: AffiliateUsage[];
};

export type AffiliateAuditReport = {
  generatedAt: string;
  summary: {
    registeredLinkIds: number;
    configuredUrls: number;
    missingUrls: number;
    emptyUrls: number;
    usedLinkIds: number;
    unusedRegistered: number;
    unknownLinkIds: number;
    totalUsages: number;
    affectedRoutes: number;
  };
  rows: AffiliateLinkAuditRow[];
  unusedRegistered: string[];
  unknownLinkIds: string[];
  routesByBox: { gear: string[]; service: string[]; recommendation: string[] };
  recommendationRows: RecommendationCatalogAuditRow[];
};

export type RecommendationCatalogAuditRow = {
  recommendationId: string;
  title: string;
  affiliateLinkId: string | null;
  url: string | null;
  status: AffiliateLinkAuditRow["status"];
  placements: string[];
  fallbackGuideHref: string | null;
};

const SCAN_ROOTS = [
  "app/guides",
  "content/guides",
  "app/residents",
  "app/tools",
  "app/resources",
] as const;

const LINK_ID_PATTERNS = [
  { re: /linkId:\s*["']([a-z0-9-]+)["']/g, box: "gear" as const },
  {
    re: /resolveAffiliateLink\(\s*["']([a-z0-9-]+)["']\s*\)/g,
    box: "gear" as const,
  },
];

function isRegisteredLinkId(linkId: string): linkId is AffiliateLinkId {
  return (AFFILIATE_LINK_IDS as readonly string[]).includes(linkId);
}

function linkStatus(linkId: string): AffiliateLinkAuditRow["status"] {
  if (!isRegisteredLinkId(linkId)) {
    return "missing";
  }
  if (getAffiliateUrlOrNull(linkId)) {
    return "live";
  }
  const raw = affiliateLinks[linkId];
  if (raw === "") {
    return "empty";
  }
  return "missing";
}

function resolvedUrl(linkId: string): string | null {
  if (!isRegisteredLinkId(linkId)) {
    return null;
  }
  return getAffiliateUrlOrNull(linkId);
}

function routeFromGuideFile(filePath: string): string | null {
  const normalized = filePath.replace(/\\/g, "/");
  const appMatch = normalized.match(/app\/guides\/([^/]+)\/page\.tsx$/);
  if (appMatch) {
    return `/guides/${appMatch[1]}`;
  }
  const residentMatch = normalized.match(/app\/residents\/([^/]+)\/page\.tsx$/);
  if (residentMatch) {
    return `/residents/${residentMatch[1]}`;
  }
  const toolMatch = normalized.match(/app\/tools\/([^/]+)\/page\.tsx$/);
  if (toolMatch) {
    return `/tools/${toolMatch[1]}`;
  }
  const resourceMatch = normalized.match(
    /app\/resources\/([^/]+)\/page\.tsx$/,
  );
  if (resourceMatch) {
    return `/resources/${resourceMatch[1]}`;
  }
  const mdxMatch = normalized.match(/content\/guides\/([^/]+)\.mdx$/);
  if (mdxMatch) {
    return `/guides/${mdxMatch[1]}`;
  }
  return null;
}

function walkGuideFiles(
  onFile: (relativePath: string, content: string) => void,
): void {
  const cwd = process.cwd();
  for (const root of SCAN_ROOTS) {
    const absRoot = path.join(cwd, root);
    if (!fs.existsSync(absRoot)) {
      continue;
    }
    walkDir(absRoot, (absPath) => {
      if (!/\.(tsx|mdx)$/.test(absPath)) {
        return;
      }
      const relative = path.relative(cwd, absPath).replace(/\\/g, "/");
      onFile(relative, fs.readFileSync(absPath, "utf8"));
    });
  }
}

function walkDir(dir: string, onFile: (filePath: string) => void): void {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full, onFile);
    } else {
      onFile(full);
    }
  }
}

function itemNameBeforeLinkId(content: string, linkIdIndex: number): string {
  const slice = content.slice(Math.max(0, linkIdIndex - 400), linkIdIndex);
  const nameMatch = slice.match(/name:\s*["']([^"']+)["']\s*,?\s*$/);
  return nameMatch?.[1] ?? "Unknown item";
}

function collectPresetUsages(): AffiliateUsage[] {
  const usages: AffiliateUsage[] = [];

  for (const [presetId, items] of Object.entries(recommendedGearPresetItems)) {
    const route = `/guides/${presetId}`;
    for (const item of items) {
      usages.push({
        linkId: item.linkId,
        box: "gear",
        route,
        itemName: item.name,
        source: "preset",
        file: "lib/recommended-gear-presets.ts",
      });
    }
  }

  for (const [presetId, items] of Object.entries(
    recommendedServicePresetItems,
  )) {
    const route = `/guides/${presetId}`;
    for (const item of items) {
      usages.push({
        linkId: item.linkId,
        box: "service",
        route,
        itemName: item.name,
        source: "preset",
        file: "lib/recommended-service-presets.ts",
      });
    }
  }

  return usages;
}

function collectRecommendationCatalogUsages(): AffiliateUsage[] {
  const usages: AffiliateUsage[] = [];
  const placementById = new Map<string, string[]>();

  for (const [placement, ids] of Object.entries(RECOMMENDATION_PLACEMENTS)) {
    for (const id of ids) {
      const list = placementById.get(id) ?? [];
      list.push(placement);
      placementById.set(id, list);
    }
  }

  for (const entry of Object.values(RECOMMENDATION_CATALOG)) {
    if (!entry.enabled || !entry.affiliateLinkId) {
      continue;
    }
    const placements = placementById.get(entry.id) ?? [];
    for (const placement of placements) {
      const route =
        RECOMMENDATION_PLACEMENT_ROUTES[
          placement as keyof typeof RECOMMENDATION_PLACEMENT_ROUTES
        ] ?? `/unknown/${placement}`;

      usages.push({
        linkId: entry.affiliateLinkId,
        box: "recommendation",
        route,
        itemName: entry.title,
        source: "recommendation-catalog",
        file: "lib/recommendations.ts",
      });
    }
  }

  return usages;
}

function buildRecommendationCatalogRows(): RecommendationCatalogAuditRow[] {
  const placementById = new Map<string, string[]>();
  for (const [placement, ids] of Object.entries(RECOMMENDATION_PLACEMENTS)) {
    for (const id of ids) {
      const list = placementById.get(id) ?? [];
      list.push(placement);
      placementById.set(id, list);
    }
  }

  return Object.values(RECOMMENDATION_CATALOG)
    .filter((e) => e.enabled)
    .map((entry) => {
      const linkId = entry.affiliateLinkId ?? null;
      const status = linkId ? linkStatus(linkId) : "missing";
      return {
        recommendationId: entry.id,
        title: entry.title,
        affiliateLinkId: linkId,
        url: linkId ? resolvedUrl(linkId) : null,
        status,
        placements: placementById.get(entry.id) ?? [],
        fallbackGuideHref: entry.fallbackGuideHref ?? null,
      };
    })
    .sort((a, b) => a.recommendationId.localeCompare(b.recommendationId));
}

function collectInlineUsages(): AffiliateUsage[] {
  const usages: AffiliateUsage[] = [];

  walkGuideFiles((file, content) => {
    const route = routeFromGuideFile(file);
    if (!route) {
      return;
    }

    for (const { re } of LINK_ID_PATTERNS) {
      re.lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = re.exec(content)) !== null) {
        const linkId = match[1];
        const index = match.index;
        usages.push({
          linkId,
          box: "gear",
          route,
          itemName: itemNameBeforeLinkId(content, index),
          source: "inline",
          file,
        });
      }
    }
  });

  return usages;
}

function dedupeUsages(usages: AffiliateUsage[]): AffiliateUsage[] {
  const seen = new Set<string>();
  const out: AffiliateUsage[] = [];
  for (const u of usages) {
    const key = `${u.linkId}|${u.box}|${u.route}|${u.itemName}|${u.source}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    out.push(u);
  }
  return out;
}

export function runAffiliateAudit(): AffiliateAuditReport {
  const allUsages = dedupeUsages([
    ...collectPresetUsages(),
    ...collectInlineUsages(),
    ...collectRecommendationCatalogUsages(),
  ]);

  const byLinkId = new Map<string, AffiliateUsage[]>();
  for (const usage of allUsages) {
    const list = byLinkId.get(usage.linkId) ?? [];
    list.push(usage);
    byLinkId.set(usage.linkId, list);
  }

  const usedLinkIds = [...byLinkId.keys()].sort();
  const unknownLinkIds = usedLinkIds.filter((id) => !isRegisteredLinkId(id));

  const allRowIds = [
    ...new Set([...AFFILIATE_LINK_IDS, ...usedLinkIds]),
  ].sort();

  const rows: AffiliateLinkAuditRow[] = allRowIds.map((linkId) => {
    const usages = byLinkId.get(linkId) ?? [];
    const routes = [...new Set(usages.map((u) => u.route))].sort();
    const status = linkStatus(linkId);
    return {
      linkId,
      registered: isRegisteredLinkId(linkId),
      url: resolvedUrl(linkId),
      status,
      usageCount: usages.length,
      routes,
      usages,
    };
  });

  const unusedRegistered = AFFILIATE_LINK_IDS.filter(
    (id) => !byLinkId.has(id),
  );

  const missingInUse = rows.filter(
    (r) => r.usageCount > 0 && r.status === "missing",
  );
  const emptyInUse = rows.filter((r) => r.usageCount > 0 && r.status === "empty");
  const configuredUrls = rows.filter((r) => r.status === "live");

  const routesByBox = {
    gear: [...new Set(allUsages.filter((u) => u.box === "gear").map((u) => u.route))].sort(),
    service: [
      ...new Set(allUsages.filter((u) => u.box === "service").map((u) => u.route)),
    ].sort(),
    recommendation: [
      ...new Set(
        allUsages.filter((u) => u.box === "recommendation").map((u) => u.route),
      ),
    ].sort(),
  };

  return {
    generatedAt: new Date().toISOString(),
    summary: {
      registeredLinkIds: AFFILIATE_LINK_IDS.length,
      configuredUrls: configuredUrls.length,
      missingUrls: missingInUse.length,
      emptyUrls: emptyInUse.length,
      usedLinkIds: usedLinkIds.length,
      unusedRegistered: unusedRegistered.length,
      unknownLinkIds: unknownLinkIds.length,
      totalUsages: allUsages.length,
      affectedRoutes: new Set(allUsages.map((u) => u.route)).size,
    },
    rows,
    unusedRegistered: [...unusedRegistered],
    unknownLinkIds,
    routesByBox,
    recommendationRows: buildRecommendationCatalogRows(),
  };
}

export function formatAffiliateAuditReport(report: AffiliateAuditReport): string {
  const lines: string[] = [];
  const { summary } = report;

  lines.push("Affiliate link audit");
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push("");
  lines.push(
    `Registered keys: ${summary.registeredLinkIds} | Live URLs: ${summary.configuredUrls} | Missing (in use): ${summary.missingUrls} | Unused registered: ${summary.unusedRegistered}`,
  );
  lines.push(
    `Total usages: ${summary.totalUsages} across ${summary.affectedRoutes} routes`,
  );

  if (summary.unknownLinkIds > 0) {
    lines.push(`Unknown link IDs (not in AFFILIATE_LINK_IDS): ${summary.unknownLinkIds}`);
  }

  lines.push("");
  lines.push("Missing URLs (used on site):");
  const missingUsed = report.rows.filter(
    (r) => r.usageCount > 0 && r.status !== "live",
  );
  if (missingUsed.length === 0) {
    lines.push("  (none)");
  } else {
    for (const row of missingUsed) {
      lines.push(
        `  ${row.linkId} (${row.usageCount}x) -> ${row.routes.join(", ")}`,
      );
    }
  }

  lines.push("");
  lines.push("Usage by link ID:");
  const usedRows = report.rows
    .filter((r) => r.usageCount > 0)
    .sort((a, b) => b.usageCount - a.usageCount);
  for (const row of usedRows) {
    const urlLabel =
      row.status === "live" ? row.url : AFFILIATE_LINK_PLACEHOLDER;
    lines.push(
      `  ${row.linkId} [${row.status}] ${row.usageCount}x — ${urlLabel}`,
    );
    for (const route of row.routes) {
      lines.push(`    ${route}`);
    }
  }

  if (report.unusedRegistered.length > 0) {
    lines.push("");
    lines.push("Registered but unused:");
    for (const id of report.unusedRegistered) {
      lines.push(`  ${id}`);
    }
  }

  return lines.join("\n");
}
