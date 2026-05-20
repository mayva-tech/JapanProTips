import fs from "fs";
import path from "path";
import { nextStepGuidePresetItems } from "@/lib/next-step-guide-presets";

export const NEXT_STEP_BLOCKED_TARGET_ROUTES = [
  "/guides/mdx-pilot",
  "/guides/mdx-second-test",
] as const;

export const NEXT_STEP_HIGH_VALUE_TOURIST_ROUTES = [
  "/guides/japan-airport-first-steps",
  "/guides/japan-airport-to-city",
  "/guides/narita-to-tokyo",
  "/guides/haneda-to-tokyo",
  "/guides/sim-card-japan",
  "/guides/do-you-need-sim-japan",
  "/guides/esim-vs-pocket-wifi-japan",
  "/guides/airalo-vs-ubigi-japan",
  "/guides/japan-public-wifi",
  "/guides/japan-trains",
  "/guides/getting-around-japan",
  "/guides/suica-pasmo-guide",
  "/guides/suica-vs-pasmo",
  "/guides/shinkansen-guide",
  "/guides/jr-pass-worth-it",
  "/guides/using-google-maps-in-japan",
  "/guides/money-payments-japan",
  "/guides/japan-cash-vs-card",
  "/guides/japan-cash-withdrawal-guide",
  "/guides/japan-tax-free-shopping",
  "/guides/japan-packing-list",
  "/guides/japan-weather-by-month",
  "/guides/japan-rainy-season-guide",
  "/guides/japan-laundry-guide",
  "/guides/japan-travel-fatigue",
  "/guides/where-to-stay-japan",
  "/guides/where-to-stay-tokyo",
  "/guides/best-area-tokyo-first-time",
  "/guides/shinjuku-vs-shibuya",
  "/guides/where-to-stay-kyoto",
  "/guides/where-to-stay-osaka",
  "/guides/japan-hotel-room-size",
] as const;

export const NEXT_STEP_HIGH_VALUE_RESIDENT_ROUTES = [
  "/residents/renting-apartment-japan",
  "/residents/japan-residence-registration",
  "/residents/japan-bank-account",
  "/residents/japan-mobile-phone-plans",
  "/residents/japan-utilities-setup",
  "/residents/japan-apartment-internet",
  "/residents/japan-garbage-rules",
  "/residents/garbage-separation-japan",
  "/residents/japan-resident-tax",
] as const;

export const NEXT_STEP_HIGH_VALUE_ROUTES = [
  ...NEXT_STEP_HIGH_VALUE_TOURIST_ROUTES,
  ...NEXT_STEP_HIGH_VALUE_RESIDENT_ROUTES,
] as const;

const MIN_ITEMS = 3;
const MAX_ITEMS = 5;

const USAGE_SCAN_ROOTS = ["app", "content"] as const;

const NEXT_STEP_GUIDE_ID_RE =
  /<NextStepGuides[^>]*\sguideId=["']([^"']+)["']/g;

export type NextStepIssueKind =
  | "broken_link"
  | "self_link"
  | "duplicate_link"
  | "invalid_item_count"
  | "suspicious_href";

export type NextStepIssue = {
  kind: NextStepIssueKind;
  presetId: string;
  href?: string;
  message: string;
};

export type NextStepPresetRow = {
  presetId: string;
  sourceRoute: string;
  itemCount: number;
  targetRoutes: string[];
  usedInFiles: string[];
  isUsed: boolean;
};

export type NextStepAuditReport = {
  generatedAt: string;
  passed: boolean;
  summary: {
    totalPresets: number;
    totalLinksChecked: number;
    brokenLinks: number;
    selfLinks: number;
    duplicateLinks: number;
    invalidItemCounts: number;
    suspiciousHrefs: number;
    unusedPresets: number;
    presetsInUse: number;
    highValueMissing: number;
  };
  issues: NextStepIssue[];
  presets: NextStepPresetRow[];
  unusedPresets: string[];
  highValueMissing: string[];
  usageByPreset: { presetId: string; files: string[] }[];
};

function walkDir(dir: string, onFile: (filePath: string) => void): void {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full, onFile);
    } else {
      onFile(full);
    }
  }
}

function normalizeHref(href: string): string {
  const trimmed = href.trim();
  if (!trimmed) {
    return "";
  }
  return trimmed.replace(/\/$/, "") || "/";
}

function slugFromRoute(route: string): string | null {
  const match = route.match(/^\/(?:guides|residents)\/([^/]+)$/);
  return match?.[1] ?? null;
}

function buildRedirectStubMap(): Map<string, string> {
  const map = new Map<string, string>();
  const cwd = process.cwd();
  const roots = [
    { base: "app/guides", prefix: "/guides" },
    { base: "app/residents", prefix: "/residents" },
  ] as const;

  for (const { base, prefix } of roots) {
    const absBase = path.join(cwd, base);
    if (!fs.existsSync(absBase)) {
      continue;
    }
    walkDir(absBase, (absPath) => {
      if (!absPath.endsWith(`${path.sep}page.tsx`)) {
        return;
      }
      const slug = path.basename(path.dirname(absPath));
      const content = fs.readFileSync(absPath, "utf8");
      const redirectMatch = content.match(
        /permanentRedirect\(\s*["']([^"']+)["']\s*\)/,
      );
      if (!redirectMatch) {
        return;
      }
      const from = `${prefix}/${slug}`;
      const to = normalizeHref(redirectMatch[1]);
      map.set(from, to);
    });
  }

  return map;
}

function routeHasPageFile(route: string): boolean {
  const slug = slugFromRoute(route);
  if (!slug) {
    return false;
  }
  const cwd = process.cwd();
  if (route.startsWith("/guides/")) {
    return (
      fs.existsSync(path.join(cwd, "app/guides", slug, "page.tsx")) ||
      fs.existsSync(path.join(cwd, "content/guides", `${slug}.mdx`))
    );
  }
  if (route.startsWith("/residents/")) {
    return (
      fs.existsSync(path.join(cwd, "app/residents", slug, "page.tsx")) ||
      fs.existsSync(path.join(cwd, "content/residents", `${slug}.mdx`))
    );
  }
  return false;
}

function sourceRouteForGuideId(guideId: string): string {
  const cwd = process.cwd();
  const residentApp = path.join(cwd, "app/residents", guideId, "page.tsx");
  const residentMdx = path.join(cwd, "content/residents", `${guideId}.mdx`);
  if (fs.existsSync(residentApp) || fs.existsSync(residentMdx)) {
    return `/residents/${guideId}`;
  }
  return `/guides/${guideId}`;
}

function classifyHref(
  href: string,
  redirectStubs: Map<string, string>,
): { broken: boolean; suspicious: boolean; reason?: string } {
  const normalized = normalizeHref(href);

  if (!normalized) {
    return { broken: false, suspicious: true, reason: "empty href" };
  }
  if (normalized.startsWith("#")) {
    return { broken: false, suspicious: true, reason: "hash link" };
  }
  if (/^https?:\/\//i.test(normalized)) {
    return { broken: false, suspicious: true, reason: "external URL" };
  }
  if (
    NEXT_STEP_BLOCKED_TARGET_ROUTES.includes(
      normalized as (typeof NEXT_STEP_BLOCKED_TARGET_ROUTES)[number],
    )
  ) {
    return { broken: true, suspicious: false, reason: "blocked test route" };
  }
  if (!normalized.startsWith("/guides/") && !normalized.startsWith("/residents/")) {
    return { broken: true, suspicious: false, reason: "not an internal guide route" };
  }
  if (!routeHasPageFile(normalized)) {
    return { broken: true, suspicious: false, reason: "no page file for route" };
  }
  const canonical = redirectStubs.get(normalized);
  if (canonical) {
    return {
      broken: false,
      suspicious: true,
      reason: `redirect stub (use ${canonical})`,
    };
  }
  return { broken: false, suspicious: false };
}

function collectPresetUsagesInArticles(): Map<string, string[]> {
  const cwd = process.cwd();
  const byPreset = new Map<string, Set<string>>();

  for (const root of USAGE_SCAN_ROOTS) {
    const absRoot = path.join(cwd, root);
    walkDir(absRoot, (absPath) => {
      if (!/\.(tsx|mdx)$/.test(absPath)) {
        return;
      }
      const content = fs.readFileSync(absPath, "utf8");
      if (!content.includes("NextStepGuides")) {
        return;
      }
      const relative = path.relative(cwd, absPath).replace(/\\/g, "/");
      NEXT_STEP_GUIDE_ID_RE.lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = NEXT_STEP_GUIDE_ID_RE.exec(content)) !== null) {
        const presetId = match[1];
        const set = byPreset.get(presetId) ?? new Set<string>();
        set.add(relative);
        byPreset.set(presetId, set);
      }
    });
  }

  const out = new Map<string, string[]>();
  for (const [presetId, files] of byPreset) {
    out.set(presetId, [...files].sort());
  }
  return out;
}

function routeHasNextStepBlock(route: string): boolean {
  const slug = slugFromRoute(route);
  if (!slug) {
    return false;
  }
  const cwd = process.cwd();
  const candidates: string[] = [];
  if (route.startsWith("/guides/")) {
    candidates.push(path.join(cwd, "app/guides", slug, "page.tsx"));
    candidates.push(path.join(cwd, "content/guides", `${slug}.mdx`));
  } else {
    candidates.push(path.join(cwd, "app/residents", slug, "page.tsx"));
    candidates.push(path.join(cwd, "content/residents", `${slug}.mdx`));
  }

  for (const file of candidates) {
    if (!fs.existsSync(file)) {
      continue;
    }
    if (fs.readFileSync(file, "utf8").includes("NextStepGuides")) {
      return true;
    }
  }
  return false;
}

export function runNextStepAudit(): NextStepAuditReport {
  const redirectStubs = buildRedirectStubMap();
  const usageInArticles = collectPresetUsagesInArticles();
  const issues: NextStepIssue[] = [];
  const presets: NextStepPresetRow[] = [];

  let totalLinksChecked = 0;
  let brokenLinks = 0;
  let selfLinks = 0;
  let duplicateLinks = 0;
  let invalidItemCounts = 0;
  let suspiciousHrefs = 0;

  for (const [presetId, items] of Object.entries(nextStepGuidePresetItems)) {
    const sourceRoute = sourceRouteForGuideId(presetId);
    const usedInFiles = usageInArticles.get(presetId) ?? [];
    const isUsed = usedInFiles.length > 0;

    if (items.length < MIN_ITEMS || items.length > MAX_ITEMS) {
      invalidItemCounts += 1;
      issues.push({
        kind: "invalid_item_count",
        presetId,
        message: `expected ${MIN_ITEMS}-${MAX_ITEMS} items, found ${items.length}`,
      });
    }

    const hrefCounts = new Map<string, number>();
    const targetRoutes: string[] = [];

    for (const item of items) {
      totalLinksChecked += 1;
      const href = normalizeHref(item.href);
      targetRoutes.push(href);

      hrefCounts.set(href, (hrefCounts.get(href) ?? 0) + 1);

      if (href === sourceRoute) {
        selfLinks += 1;
        issues.push({
          kind: "self_link",
          presetId,
          href,
          message: `recommends its own route (${sourceRoute})`,
        });
      }

      const { broken, suspicious, reason } = classifyHref(
        item.href,
        redirectStubs,
      );
      if (broken) {
        brokenLinks += 1;
        issues.push({
          kind: "broken_link",
          presetId,
          href,
          message: reason ?? "broken link",
        });
      }
      if (suspicious) {
        suspiciousHrefs += 1;
        issues.push({
          kind: "suspicious_href",
          presetId,
          href,
          message: reason ?? "suspicious href",
        });
      }
    }

    for (const [href, count] of hrefCounts) {
      if (count > 1) {
        duplicateLinks += count - 1;
        issues.push({
          kind: "duplicate_link",
          presetId,
          href,
          message: `href appears ${count} times`,
        });
      }
    }

    presets.push({
      presetId,
      sourceRoute,
      itemCount: items.length,
      targetRoutes,
      usedInFiles,
      isUsed,
    });
  }

  presets.sort((a, b) => a.presetId.localeCompare(b.presetId));

  const presetIds = Object.keys(nextStepGuidePresetItems);
  const unusedPresets = presetIds
    .filter((id) => !(usageInArticles.get(id)?.length))
    .sort();

  const highValueMissing = NEXT_STEP_HIGH_VALUE_ROUTES.filter(
    (route) => !routeHasNextStepBlock(route),
  ).sort();

  const presetsInUse = presets.filter((p) => p.isUsed).length;

  const seriousIssueCount =
    brokenLinks + selfLinks + duplicateLinks + invalidItemCounts + suspiciousHrefs;

  return {
    generatedAt: new Date().toISOString(),
    passed: seriousIssueCount === 0,
    summary: {
      totalPresets: presetIds.length,
      totalLinksChecked,
      brokenLinks,
      selfLinks,
      duplicateLinks,
      invalidItemCounts,
      suspiciousHrefs,
      unusedPresets: unusedPresets.length,
      presetsInUse,
      highValueMissing: highValueMissing.length,
    },
    issues,
    presets,
    unusedPresets,
    highValueMissing: [...highValueMissing],
    usageByPreset: [...usageInArticles.entries()]
      .map(([presetId, files]) => ({ presetId, files }))
      .sort((a, b) => a.presetId.localeCompare(b.presetId)),
  };
}

export function formatNextStepAuditReport(report: NextStepAuditReport): string {
  const lines: string[] = [];
  const { summary } = report;

  lines.push("Next Step guides audit");
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push("");
  lines.push(report.passed ? "PASS" : "FAIL");
  lines.push("");
  lines.push(
    `Presets: ${summary.totalPresets} | Links checked: ${summary.totalLinksChecked} | In use: ${summary.presetsInUse}`,
  );
  lines.push(
    `Broken: ${summary.brokenLinks} | Self: ${summary.selfLinks} | Duplicate: ${summary.duplicateLinks} | Invalid counts: ${summary.invalidItemCounts} | Suspicious: ${summary.suspiciousHrefs}`,
  );
  lines.push(
    `Warnings — Unused presets: ${summary.unusedPresets} | High-value missing block: ${summary.highValueMissing}`,
  );

  const issueGroups: NextStepIssueKind[] = [
    "broken_link",
    "self_link",
    "duplicate_link",
    "invalid_item_count",
    "suspicious_href",
  ];

  for (const kind of issueGroups) {
    const group = report.issues.filter((i) => i.kind === kind);
    if (group.length === 0) {
      continue;
    }
    lines.push("");
    lines.push(`${kind.replace(/_/g, " ")}:`);
    for (const issue of group) {
      const hrefPart = issue.href ? ` ${issue.href}` : "";
      lines.push(`  ${issue.presetId}${hrefPart} — ${issue.message}`);
    }
  }

  if (report.unusedPresets.length > 0) {
    lines.push("");
    lines.push("Unused presets (warning):");
    for (const id of report.unusedPresets) {
      lines.push(`  ${id}`);
    }
  }

  if (report.highValueMissing.length > 0) {
    lines.push("");
    lines.push("High-value pages missing NextStepGuides (warning):");
    for (const route of report.highValueMissing) {
      lines.push(`  ${route}`);
    }
  }

  lines.push("");
  lines.push("Preset usage:");
  for (const row of report.presets) {
    const status = row.isUsed ? "in use" : "unused";
    const files =
      row.usedInFiles.length > 0 ? row.usedInFiles.join(", ") : "N/A";
    lines.push(
      `  ${row.presetId} (${row.itemCount} items, ${status}) <- ${row.sourceRoute}`,
    );
    lines.push(`    files: ${files}`);
    lines.push(`    targets: ${row.targetRoutes.join(", ")}`);
  }

  return lines.join("\n");
}

export function nextStepAuditExitCode(report: NextStepAuditReport): number {
  const { summary } = report;
  const serious =
    summary.brokenLinks > 0 ||
    summary.selfLinks > 0 ||
    summary.duplicateLinks > 0 ||
    summary.invalidItemCounts > 0 ||
    summary.suspiciousHrefs > 0;
  return serious ? 1 : 0;
}
