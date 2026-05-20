import fs from "fs";
import path from "path";
import {
  FIELD_NOTE_TONE_ORDER,
  type FieldNoteTone,
  isFieldNoteTone,
} from "@/lib/field-notes";
import {
  NEXT_STEP_HIGH_VALUE_RESIDENT_ROUTES,
  NEXT_STEP_HIGH_VALUE_TOURIST_ROUTES,
} from "@/lib/next-step-audit";

/** High-value routes reused for editorial priority signals. */
export const FIELD_NOTE_HIGH_VALUE_ROUTES = new Set<string>([
  ...NEXT_STEP_HIGH_VALUE_TOURIST_ROUTES,
  ...NEXT_STEP_HIGH_VALUE_RESIDENT_ROUTES,
]);

/** Soft warning: many notes on one page dilute impact. */
export const FIELD_NOTE_OVERUSE_SOFT = 5;
/** Strong warning: likely noise or component misuse. */
export const FIELD_NOTE_OVERUSE_HARD = 8;
/** Site-wide: one tone exceeds this share of all notes → imbalance warning. */
export const FIELD_NOTE_TONE_DOMINANCE_RATIO = 0.42;

const SCAN_ROOTS = [
  "app/guides",
  "content/guides",
  "app/residents",
  "content/residents",
] as const;

const COMPONENT_TAG_TO_TONE: { tag: string; tone: FieldNoteTone }[] = [
  { tag: "ResidentLearnedNote", tone: "resident-learned" },
  { tag: "TouristMistakeNote", tone: "tourist-mistake" },
  { tag: "OperationalWarning", tone: "operational-warning" },
  { tag: "WhatPeopleMiss", tone: "what-people-miss" },
  { tag: "RealityCheck", tone: "reality-check" },
  { tag: "LocalTip", tone: "local-habit" },
  { tag: "SeasonalNote", tone: "seasonal" },
];

export type FieldNoteAuditIssue = {
  kind: "invalid_tone" | "unknown_open_tag";
  message: string;
  file?: string;
  route?: string;
};

export type FieldNotePerRoute = {
  route: string;
  slug: string;
  sourceFile: string;
  count: number;
  /** Unique tones present, stable sort. */
  tones: FieldNoteTone[];
  toneCounts: Record<FieldNoteTone, number>;
  overuse: "none" | "soft" | "hard";
  isHighValue: boolean;
  /** When count is 0, heuristic suggestion for first note to add. */
  recommendedTone?: FieldNoteTone;
};

export type FieldNoteAuditReport = {
  generatedAt: string;
  summary: {
    articleRoutes: number;
    routesWithNotes: number;
    routesWithZeroNotes: number;
    highValueRoutes: number;
    highValueWithZeroNotes: number;
    totalNotes: number;
    avgNotesPerArticle: string;
    /** Site-wide count per tone. */
    toneTotals: Record<FieldNoteTone, number>;
    overuseSoftRoutes: number;
    overuseHardRoutes: number;
  };
  imbalanceWarnings: string[];
  issues: FieldNoteAuditIssue[];
  routes: FieldNotePerRoute[];
};

function isRedirectOnlyGuidePage(content: string): boolean {
  return (
    /permanentRedirect\s*\(/.test(content) &&
    !/<(?:GuideArticleShell|NextStepGuides|MdxGuidePage|article\b)/.test(
      content,
    )
  );
}

function walkArticleFiles(root: string): string[] {
  const acc: string[] = [];
  for (const rel of SCAN_ROOTS) {
    const base = path.join(root, rel);
    if (!fs.existsSync(base)) continue;
    walkDir(base, (abs) => {
      if (rel.startsWith("app/") && !abs.endsWith(`${path.sep}page.tsx`)) return;
      if (rel.startsWith("content/") && !abs.endsWith(".mdx")) return;
      acc.push(abs);
    });
  }
  return acc;
}

function walkDir(dir: string, onFile: (p: string) => void): void {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(full, onFile);
    else onFile(full);
  }
}

function fileToRoute(root: string, abs: string): string | null {
  const rel = path.relative(root, abs).replace(/\\/g, "/");
  if (rel.startsWith("app/guides/") && rel.endsWith("/page.tsx")) {
    const slug = rel.slice("app/guides/".length, -"/page.tsx".length);
    return `/guides/${slug}`;
  }
  if (rel.startsWith("content/guides/") && rel.endsWith(".mdx")) {
    const slug = rel.slice("content/guides/".length, -".mdx".length);
    return `/guides/${slug}`;
  }
  if (rel.startsWith("app/residents/") && rel.endsWith("/page.tsx")) {
    const slug = rel.slice("app/residents/".length, -"/page.tsx".length);
    return `/residents/${slug}`;
  }
  if (rel.startsWith("content/residents/") && rel.endsWith(".mdx")) {
    const slug = rel.slice("content/residents/".length, -".mdx".length);
    return `/residents/${slug}`;
  }
  return null;
}

function slugFromRoute(route: string): string {
  return route.replace(/^\/(guides|residents)\//, "");
}

/**
 * Heuristic when an article has zero Field Notes. Tuned for high-intent slugs.
 */
export function recommendedFieldNoteToneForRoute(
  route: string,
): FieldNoteTone {
  const slug = slugFromRoute(route).toLowerCase();
  const pathLower = route.toLowerCase();

  if (
    /train|shinkansen|suica|pasmo|narita|haneda|getting-around|jr-pass|maps/.test(
      slug,
    )
  ) {
    return "operational-warning";
  }
  if (/sim|esim|wifi|ubigi|airalo|pocket|public-wifi/.test(slug)) {
    return "reality-check";
  }
  if (/rain|weather|season|laundry/.test(slug)) {
    return "seasonal";
  }
  if (/mistake|fatigue|cultural|tourist/.test(slug)) {
    return "tourist-mistake";
  }
  if (
    pathLower.startsWith("/residents/") ||
    /bank|apartment|utilities|garbage|residence|internet|mobile-phone/.test(slug)
  ) {
    return "resident-learned";
  }
  if (
    /money|cash|card|tax-free|shopping|packing|stay|hotel|area|shinjuku|kyoto|osaka|airport|itinerary|locker|luggage/.test(
      slug,
    )
  ) {
    return "what-people-miss";
  }
  return "reality-check";
}

function countTag(content: string, tag: string): number {
  const re = new RegExp(`<${tag}(?=[\\s/>])`, "g");
  return [...content.matchAll(re)].length;
}

function extractFieldNoteTonesFromContent(
  content: string,
  file: string,
  route: string,
  issues: FieldNoteAuditIssue[],
): FieldNoteTone[] {
  const out: FieldNoteTone[] = [];

  for (const { tag, tone } of COMPONENT_TAG_TO_TONE) {
    const n = countTag(content, tag);
    for (let i = 0; i < n; i++) out.push(tone);
  }

  const reOpen = /<FieldNote\b/g;
  let m: RegExpExecArray | null;
  while ((m = reOpen.exec(content)) !== null) {
    const start = m.index;
    const gt = content.indexOf(">", start);
    if (gt === -1) {
      issues.push({
        kind: "unknown_open_tag",
        file,
        route,
        message: `Unclosed <FieldNote> in ${file}`,
      });
      break;
    }
    const openTag = content.slice(start, gt + 1);
    const toneMatch = openTag.match(/\stone=["']([^"']+)["']/);
    if (toneMatch) {
      const raw = toneMatch[1];
      if (isFieldNoteTone(raw)) {
        out.push(raw);
      } else {
        issues.push({
          kind: "invalid_tone",
          file,
          route,
          message: `Invalid FieldNote tone "${raw}" in ${file}`,
        });
      }
    } else {
      out.push("field");
    }
  }

  return out;
}

function toneCountsFromList(list: FieldNoteTone[]): Record<FieldNoteTone, number> {
  const counts = {} as Record<FieldNoteTone, number>;
  for (const t of FIELD_NOTE_TONE_ORDER) counts[t] = 0;
  for (const t of list) counts[t] += 1;
  return counts;
}

function overuseLevel(count: number): "none" | "soft" | "hard" {
  if (count >= FIELD_NOTE_OVERUSE_HARD) return "hard";
  if (count >= FIELD_NOTE_OVERUSE_SOFT) return "soft";
  return "none";
}

function computeImbalanceWarnings(
  toneTotals: Record<FieldNoteTone, number>,
  totalNotes: number,
): string[] {
  const warnings: string[] = [];
  if (totalNotes < 6) return warnings;

  for (const t of FIELD_NOTE_TONE_ORDER) {
    const c = toneTotals[t];
    const share = c / totalNotes;
    if (share >= FIELD_NOTE_TONE_DOMINANCE_RATIO) {
      warnings.push(
        `Tone "${t}" is ${(share * 100).toFixed(0)}% of all field notes site-wide. Consider diversifying kickers.`,
      );
    }
  }

  const unused = FIELD_NOTE_TONE_ORDER.filter((t) => toneTotals[t] === 0);
  if (unused.length >= 4 && totalNotes >= 15) {
    warnings.push(
      `Several tones are unused (${unused.slice(0, 5).join(", ")}${unused.length > 5 ? ", ..." : ""}) while total notes is high. Balance editorial mix when you add new blocks.`,
    );
  }

  return warnings;
}

export function runFieldNoteAudit(root = process.cwd()): FieldNoteAuditReport {
  const generatedAt = new Date().toISOString();
  const issues: FieldNoteAuditIssue[] = [];
  const files = walkArticleFiles(root);
  const byRoute = new Map<
    string,
    { sourceFile: string; tones: FieldNoteTone[] }
  >();

  for (const abs of files) {
    const route = fileToRoute(root, abs);
    if (!route) continue;
    const rel = path.relative(root, abs).replace(/\\/g, "/");
    const content = fs.readFileSync(abs, "utf8");
    if (isRedirectOnlyGuidePage(content)) continue;
    const tones = extractFieldNoteTonesFromContent(content, rel, route, issues);
    const existing = byRoute.get(route);
    if (existing) {
      existing.tones.push(...tones);
      if (existing.sourceFile !== rel) {
        existing.sourceFile = `${existing.sourceFile} + ${rel}`;
      }
    } else {
      byRoute.set(route, { sourceFile: rel, tones });
    }
  }

  const routes: FieldNotePerRoute[] = [...byRoute.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([route, data]) => {
      const toneCounts = toneCountsFromList(data.tones);
      const tones = FIELD_NOTE_TONE_ORDER.filter((t) => toneCounts[t] > 0);
      const count = data.tones.length;
      const isHighValue = FIELD_NOTE_HIGH_VALUE_ROUTES.has(route);
      return {
        route,
        slug: slugFromRoute(route),
        sourceFile: data.sourceFile,
        count,
        tones,
        toneCounts,
        overuse: overuseLevel(count),
        isHighValue,
        recommendedTone: count === 0 ? recommendedFieldNoteToneForRoute(route) : undefined,
      };
    });

  const toneTotalsAcc = toneCountsFromList([]);
  for (const r of routes) {
    for (const t of FIELD_NOTE_TONE_ORDER) {
      toneTotalsAcc[t] += r.toneCounts[t];
    }
  }

  const totalNotes = routes.reduce((s, r) => s + r.count, 0);
  const articleRoutes = routes.length;
  const routesWithNotes = routes.filter((r) => r.count > 0).length;
  const routesWithZeroNotes = articleRoutes - routesWithNotes;
  const highValueRoutes = FIELD_NOTE_HIGH_VALUE_ROUTES.size;
  const highValueWithZeroNotes = [...FIELD_NOTE_HIGH_VALUE_ROUTES].filter(
    (hr) => (routes.find((r) => r.route === hr)?.count ?? 0) === 0,
  ).length;
  const avgNotesPerArticle =
    articleRoutes > 0 ? (totalNotes / articleRoutes).toFixed(2) : "0";
  const overuseSoftRoutes = routes.filter((r) => r.overuse === "soft").length;
  const overuseHardRoutes = routes.filter((r) => r.overuse === "hard").length;

  const imbalanceWarnings = computeImbalanceWarnings(toneTotalsAcc, totalNotes);

  return {
    generatedAt,
    summary: {
      articleRoutes,
      routesWithNotes,
      routesWithZeroNotes,
      highValueRoutes,
      highValueWithZeroNotes,
      totalNotes,
      avgNotesPerArticle,
      toneTotals: toneTotalsAcc,
      overuseSoftRoutes,
      overuseHardRoutes,
    },
    imbalanceWarnings,
    issues,
    routes,
  };
}

export function formatFieldNotePerRouteBlock(r: FieldNotePerRoute): string {
  const lines: string[] = [`${r.slug}`, `- ${r.count} field note${r.count === 1 ? "" : "s"}`];
  if (r.tones.length === 0) {
    lines.push("- tones: (none)");
    if (r.recommendedTone) {
      lines.push(`- recommended: ${r.recommendedTone}`);
    }
  } else {
    lines.push("- tones:");
    for (const t of r.tones) {
      const n = r.toneCounts[t];
      lines.push(`  - ${t}${n > 1 ? ` (x${n})` : ""}`);
    }
  }
  if (r.overuse !== "none") {
    lines.push(
      `- overuse: ${r.overuse} (${r.count} notes, soft >= ${FIELD_NOTE_OVERUSE_SOFT}, hard >= ${FIELD_NOTE_OVERUSE_HARD})`,
    );
  }
  if (r.isHighValue && r.count === 0) {
    lines.push("- flag: high-value page with no field notes");
  }
  return lines.join("\n");
}

export function formatFieldNoteAuditReport(report: FieldNoteAuditReport): string {
  const lines: string[] = [
    "Field Note coverage audit",
    "===========================",
    `Generated: ${report.generatedAt}`,
    `Articles: ${report.summary.articleRoutes}`,
    `Routes with notes: ${report.summary.routesWithNotes}`,
    `Routes with zero notes: ${report.summary.routesWithZeroNotes}`,
    `High-value routes (catalog): ${report.summary.highValueRoutes}`,
    `High-value with zero notes: ${report.summary.highValueWithZeroNotes}`,
    `Total field notes: ${report.summary.totalNotes}`,
    `Avg notes per article: ${report.summary.avgNotesPerArticle}`,
    `Overuse soft (>=${FIELD_NOTE_OVERUSE_SOFT}): ${report.summary.overuseSoftRoutes} routes`,
    `Overuse hard (>=${FIELD_NOTE_OVERUSE_HARD}): ${report.summary.overuseHardRoutes} routes`,
    "",
    "Site-wide tone totals:",
  ];
  for (const t of FIELD_NOTE_TONE_ORDER) {
    lines.push(`  ${t}: ${report.summary.toneTotals[t]}`);
  }
  lines.push("");

  if (report.imbalanceWarnings.length) {
    lines.push("Balance warnings:");
    for (const w of report.imbalanceWarnings) lines.push(`  - ${w}`);
    lines.push("");
  }

  if (report.issues.length) {
    lines.push(`Issues (${report.issues.length}):`);
    for (const i of report.issues) {
      lines.push(`  [${i.kind}] ${i.message}`);
    }
    lines.push("");
  }

  lines.push("Per article (slug):");
  lines.push("");
  for (const r of report.routes) {
    lines.push(formatFieldNotePerRouteBlock(r));
    lines.push("");
  }

  return lines.join("\n");
}
