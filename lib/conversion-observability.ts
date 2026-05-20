import fs from "fs";
import path from "path";
import { runAffiliateAudit } from "@/lib/affiliate-audit";
import { runChecklistAudit } from "@/lib/checklist-audit";
import {
  checklistDownloadGtagLabel,
  checklistSubmitGtagLabel,
  checklistViewGtagLabel,
} from "@/lib/checklist-analytics";
import {
  CHECKLIST_PILOT_ROUTES,
  getDownloadableChecklist,
} from "@/lib/downloadable-checklists";
import {
  affiliateRecommendationGtagLabel,
  nextStepGuideGtagLabel,
} from "@/lib/gtag-events";
import {
  NEXT_STEP_HIGH_VALUE_RESIDENT_ROUTES,
  NEXT_STEP_HIGH_VALUE_TOURIST_ROUTES,
  runNextStepAudit,
} from "@/lib/next-step-audit";
import { nextStepGuidePresetItems } from "@/lib/next-step-guide-presets";
import { recommendedGearPresetItems } from "@/lib/recommended-gear-presets";
import { recommendedServicePresetItems } from "@/lib/recommended-service-presets";

export type ConversionAudience = "tourist" | "resident";

export type ConversionSystemKey =
  | "affiliate_gear"
  | "affiliate_service"
  | "next_step"
  | "checklist"
  | "guide_end_cta"
  | "field_note";

export type Ga4CatalogEntry = {
  system: ConversionSystemKey | "classic_cta";
  eventName: "click";
  labelPattern: string;
  firedWhen: string;
  implementation: string;
};

export type ConversionPageRow = {
  route: string;
  audience: ConversionAudience;
  sourceFile: string;
  gearPresetId?: string;
  servicePresetId?: string;
  hasInlineAffiliateGear: boolean;
  nextStepGuideId?: string;
  nextStepTargetCount: number;
  checklistDownloadId?: string;
  checklistEmailRequired?: boolean;
  hasGuideEndCta: boolean;
  systemsActive: ConversionSystemKey[];
  funnelDepth: number;
  expectedGa4Labels: string[];
  dropOffHints: string[];
  isHighValue: boolean;
  isChecklistPilot: boolean;
};

export type ConversionGapGroup = {
  id: string;
  title: string;
  description: string;
  routes: string[];
};

export type ConversionObservabilityReport = {
  generatedAt: string;
  ga4Catalog: Ga4CatalogEntry[];
  summary: {
    articleRoutes: number;
    affiliateGearRoutes: number;
    affiliateServiceRoutes: number;
    nextStepRoutes: number;
    checklistRoutes: number;
    guideEndCtaRoutes: number;
    fullFunnelRoutes: number;
    minimalRoutes: number;
    highValueRoutes: number;
    highValueWithoutAffiliate: number;
    highValueWithoutNextStep: number;
    checklistPilotRoutes: number;
  };
  health: {
    affiliateOk: boolean;
    nextStepOk: boolean;
    checklistOk: boolean;
  };
  pages: ConversionPageRow[];
  gapGroups: ConversionGapGroup[];
  topNextStepSources: { guideId: string; route: string; outboundTargets: number }[];
};

const SCAN_ROOTS = [
  { base: "app/guides", prefix: "/guides", kind: "tsx" as const },
  { base: "content/guides", prefix: "/guides", kind: "mdx" as const },
  { base: "app/residents", prefix: "/residents", kind: "tsx" as const },
  { base: "content/residents", prefix: "/residents", kind: "mdx" as const },
] as const;

const HIGH_VALUE_ROUTES = new Set<string>([
  ...NEXT_STEP_HIGH_VALUE_TOURIST_ROUTES,
  ...NEXT_STEP_HIGH_VALUE_RESIDENT_ROUTES,
]);

const GEAR_ID_RE = /<RecommendedGearBox[^>]*\sgearId=["']([^"']+)["']/g;
const SERVICE_ID_RE =
  /<RecommendedServicesBox[^>]*\sserviceId=["']([^"']+)["']/g;
const NEXT_STEP_RE = /<NextStepGuides[^>]*\sguideId=["']([^"']+)["']/g;
const CHECKLIST_RE = /<DownloadChecklistBox[^>]*\sdownloadId=["']([^"']+)["']/g;

export const CONVERSION_GA4_CATALOG: Ga4CatalogEntry[] = [
  {
    system: "affiliate_gear",
    eventName: "click",
    labelPattern: "affiliate_gear:{linkId}",
    firedWhen: "Outbound tap on a recommended gear item",
    implementation: "TrackedAffiliateRecommendationLink",
  },
  {
    system: "affiliate_service",
    eventName: "click",
    labelPattern: "affiliate_service:{linkId}",
    firedWhen: "Outbound tap on a recommended service item",
    implementation: "TrackedAffiliateRecommendationLink",
  },
  {
    system: "next_step",
    eventName: "click",
    labelPattern: "next_step:{currentGuideId}:{targetSlug}",
    firedWhen: "Internal next-step guide card tap",
    implementation: "TrackedNextStepGuideLink",
  },
  {
    system: "checklist",
    eventName: "click",
    labelPattern: "checklist_view:{downloadId}",
    firedWhen: "Download box mounted (impression proxy)",
    implementation: "ChecklistViewTracker",
  },
  {
    system: "checklist",
    eventName: "click",
    labelPattern: "checklist_submit:{downloadId}",
    firedWhen: "Email form submitted successfully",
    implementation: "EmailCaptureForm",
  },
  {
    system: "checklist",
    eventName: "click",
    labelPattern: "checklist_download:{downloadId}",
    firedWhen: "PDF download triggered (direct or post-email)",
    implementation: "ChecklistDirectDownload / EmailCaptureForm",
  },
  {
    system: "classic_cta",
    eventName: "click",
    labelPattern: "start_here | esim | hotel | transport | budget | resident_guides | newsletter",
    firedWhen: "Homepage, shell, and legacy CTA buttons",
    implementation: "Button / TrackedCtaLink / conversionLabelForHref",
  },
  {
    system: "field_note",
    eventName: "click",
    labelPattern:
      "field_note_view:{tone}:{slug} | field_note_visible:... | field_note_copy:... | field_note_link_click:... | field_note_expand:...",
    firedWhen:
      "Field note enters viewport, engaged visibility, copy, in-note link tap, or expand (expand reserved)",
    implementation: "FieldNote (GuideArticleShell / MDX)",
  },
];

function walkDir(dir: string, onFile: (filePath: string) => void): void {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full, onFile);
    } else {
      onFile(full);
    }
  }
}

function isRedirectOnlyPage(content: string): boolean {
  return (
    /permanentRedirect\s*\(/.test(content) &&
    !/<(?:GuideArticleShell|article|NextStepGuides|RecommendedGearBox)/.test(
      content,
    )
  );
}

function firstMatch(re: RegExp, content: string): string | undefined {
  re.lastIndex = 0;
  return re.exec(content)?.[1];
}

function countMatches(re: RegExp, content: string): number {
  re.lastIndex = 0;
  return [...content.matchAll(re)].length;
}

function audienceForRoute(route: string): ConversionAudience {
  return route.startsWith("/residents/") ? "resident" : "tourist";
}

function discoverArticleSources(
  root: string,
): Map<string, { file: string; audience: ConversionAudience }> {
  const byRoute = new Map<string, { file: string; audience: ConversionAudience }>();

  for (const scan of SCAN_ROOTS) {
    const absBase = path.join(root, scan.base);
    if (!fs.existsSync(absBase)) continue;

    if (scan.kind === "mdx") {
      for (const entry of fs.readdirSync(absBase, { withFileTypes: true })) {
        if (!entry.isFile() || !entry.name.endsWith(".mdx")) continue;
        const slug = entry.name.replace(/\.mdx$/, "");
        const route = `${scan.prefix}/${slug}`;
        byRoute.set(route, {
          file: path.join(scan.base, entry.name).replace(/\\/g, "/"),
          audience: audienceForRoute(route),
        });
      }
      continue;
    }

    walkDir(absBase, (absPath) => {
      if (!absPath.endsWith(`${path.sep}page.tsx`)) return;
      const slug = path.basename(path.dirname(absPath));
      const route = `${scan.prefix}/${slug}`;
      const rel = path.join(scan.base, slug, "page.tsx").replace(/\\/g, "/");
      if (!byRoute.has(route)) {
        byRoute.set(route, {
          file: rel,
          audience: audienceForRoute(route),
        });
      }
    });
  }

  return byRoute;
}

function buildDropOffHints(row: Omit<ConversionPageRow, "dropOffHints">): string[] {
  const hints: string[] = [];

  if (row.funnelDepth === 0) {
    hints.push("No instrumentation: add Next Step, checklist, or affiliate when ready.");
  }

  if (row.checklistDownloadId && !row.gearPresetId && !row.servicePresetId) {
    hints.push("Lead capture only: checklist without affiliate path on this page.");
  }

  if ((row.gearPresetId || row.servicePresetId) && !row.nextStepGuideId) {
    hints.push("Monetization without journey: affiliate box but no Next Step block.");
  }

  if (row.nextStepGuideId && !row.checklistDownloadId && row.isHighValue) {
    hints.push("Journey without lead magnet: Next Step on a high-value page, no checklist.");
  }

  if (row.checklistDownloadId && row.checklistEmailRequired === false) {
    hints.push("Direct download funnel: expect view → download, no submit event.");
  }

  if (row.checklistDownloadId && row.checklistEmailRequired === true) {
    hints.push("Email funnel: compare checklist_view vs submit vs download in GA4.");
  }

  if (row.isHighValue && row.funnelDepth <= 1) {
    hints.push("High-value page with thin stack: prioritize before scaling traffic.");
  }

  return hints;
}

function expectedLabelsForPage(row: {
  route: string;
  gearPresetId?: string;
  servicePresetId?: string;
  hasInlineAffiliateGear: boolean;
  nextStepGuideId?: string;
  checklistDownloadId?: string;
  checklistEmailRequired?: boolean;
}): string[] {
  const labels: string[] = [];

  if (row.gearPresetId) {
    const items = recommendedGearPresetItems[row.gearPresetId] ?? [];
    for (const item of items) {
      labels.push(affiliateRecommendationGtagLabel("gear", item.linkId, ""));
    }
  } else if (row.hasInlineAffiliateGear) {
    labels.push("affiliate_gear:{inline-linkId}");
  }

  if (row.servicePresetId) {
    const items = recommendedServicePresetItems[row.servicePresetId] ?? [];
    for (const item of items) {
      labels.push(affiliateRecommendationGtagLabel("service", item.linkId, ""));
    }
  }

  if (row.nextStepGuideId) {
    const items = nextStepGuidePresetItems[row.nextStepGuideId] ?? [];
    for (const item of items) {
      labels.push(nextStepGuideGtagLabel(row.nextStepGuideId, item.href));
    }
  }

  if (row.checklistDownloadId) {
    labels.push(checklistViewGtagLabel(row.checklistDownloadId));
    if (row.checklistEmailRequired) {
      labels.push(checklistSubmitGtagLabel(row.checklistDownloadId));
    }
    labels.push(checklistDownloadGtagLabel(row.checklistDownloadId));
  }

  return [...new Set(labels)];
}

function buildGapGroups(pages: ConversionPageRow[]): ConversionGapGroup[] {
  const noStack = pages.filter((p) => p.funnelDepth === 0).map((p) => p.route);
  const affiliateNoJourney = pages
    .filter(
      (p) =>
        (p.gearPresetId || p.servicePresetId || p.hasInlineAffiliateGear) &&
        !p.nextStepGuideId,
    )
    .map((p) => p.route);
  const journeyNoMonetization = pages
    .filter((p) => p.nextStepGuideId && !p.gearPresetId && !p.servicePresetId)
    .map((p) => p.route);
  const checklistNoAffiliate = pages
    .filter(
      (p) =>
        p.checklistDownloadId &&
        !p.gearPresetId &&
        !p.servicePresetId &&
        !p.hasInlineAffiliateGear,
    )
    .map((p) => p.route);
  const highValueThin = pages
    .filter((p) => p.isHighValue && p.funnelDepth <= 1)
    .map((p) => p.route);
  const hvNoNext = [...HIGH_VALUE_ROUTES].filter(
    (route) => !pages.find((p) => p.route === route)?.nextStepGuideId,
  );
  const hvNoAffiliate = [...HIGH_VALUE_ROUTES].filter((route) => {
    const p = pages.find((row) => row.route === route);
    if (!p) return true;
    return !p.gearPresetId && !p.servicePresetId && !p.hasInlineAffiliateGear;
  });

  return [
    {
      id: "no_stack",
      title: "No conversion stack",
      description:
        "Article has no affiliate box, Next Step, or checklist. Engagement is harder to attribute.",
      routes: noStack,
    },
    {
      id: "affiliate_no_journey",
      title: "Affiliate without Next Step",
      description:
        "Outbound clicks possible, but no curated internal journey. Watch for exit after monetization.",
      routes: affiliateNoJourney,
    },
    {
      id: "journey_no_monetization",
      title: "Next Step without affiliate",
      description:
        "Internal journey works, but no recommended gear or service block on this page.",
      routes: journeyNoMonetization,
    },
    {
      id: "checklist_no_affiliate",
      title: "Checklist without affiliate",
      description:
        "Download funnel only. Pair with gear or service on high-intent pages when scaling.",
      routes: checklistNoAffiliate,
    },
    {
      id: "high_value_thin",
      title: "High-value pages, thin stack",
      description:
        "Flagged high-value routes with at most one conversion system active.",
      routes: highValueThin,
    },
    {
      id: "hv_missing_next",
      title: "High-value missing Next Step",
      description: "Routes in the high-value list with no NextStepGuides block.",
      routes: hvNoNext,
    },
    {
      id: "hv_missing_affiliate",
      title: "High-value missing affiliate",
      description:
        "Routes in the high-value list with no gear or service recommendation box.",
      routes: hvNoAffiliate,
    },
  ].filter((g) => g.routes.length > 0);
}

export function runConversionObservability(
  root = process.cwd(),
): ConversionObservabilityReport {
  const sources = discoverArticleSources(root);
  const affiliateAudit = runAffiliateAudit();
  const nextStepAudit = runNextStepAudit();
  const checklistAudit = runChecklistAudit(root);

  const pages: ConversionPageRow[] = [];

  for (const [route, meta] of [...sources.entries()].sort(([a], [b]) =>
    a.localeCompare(b),
  )) {
    const absFile = path.join(root, meta.file);
    if (!fs.existsSync(absFile)) continue;

    const content = fs.readFileSync(absFile, "utf8");
    if (isRedirectOnlyPage(content)) {
      continue;
    }

    const gearPresetId = firstMatch(GEAR_ID_RE, content);
    const servicePresetId = firstMatch(SERVICE_ID_RE, content);
    const hasGearBox = /<RecommendedGearBox/.test(content);
    const hasInlineAffiliateGear =
      hasGearBox && !gearPresetId && countMatches(GEAR_ID_RE, content) === 0;
    const nextStepGuideId = firstMatch(NEXT_STEP_RE, content);
    const checklistDownloadId = firstMatch(CHECKLIST_RE, content);
    const checklist = checklistDownloadId
      ? getDownloadableChecklist(checklistDownloadId)
      : undefined;
    const hasGuideEndCta = /<GuideEndCta/.test(content);
    const hasFieldNotes =
      /<(?:OperationalWarning|RealityCheck|LocalTip|WhatPeopleMiss|SeasonalNote|TouristMistakeNote|ResidentLearnedNote|FieldNote)\b/.test(
        content,
      );

    const systemsActive: ConversionSystemKey[] = [];
    if (gearPresetId || hasInlineAffiliateGear || hasGearBox) {
      systemsActive.push("affiliate_gear");
    }
    if (servicePresetId || /<RecommendedServicesBox/.test(content)) {
      systemsActive.push("affiliate_service");
    }
    if (nextStepGuideId) systemsActive.push("next_step");
    if (checklistDownloadId) systemsActive.push("checklist");
    if (hasGuideEndCta) systemsActive.push("guide_end_cta");
    if (hasFieldNotes) systemsActive.push("field_note");

    const baseRow = {
      route,
      audience: meta.audience,
      sourceFile: meta.file,
      gearPresetId,
      servicePresetId,
      hasInlineAffiliateGear,
      nextStepGuideId,
      nextStepTargetCount: nextStepGuideId
        ? (nextStepGuidePresetItems[nextStepGuideId] ?? []).length
        : 0,
      checklistDownloadId,
      checklistEmailRequired: checklist?.emailRequired,
      hasGuideEndCta,
      systemsActive,
      funnelDepth: systemsActive.filter(
        (s) => s !== "guide_end_cta" && s !== "field_note",
      ).length,
      expectedGa4Labels: [] as string[],
      isHighValue: HIGH_VALUE_ROUTES.has(route),
      isChecklistPilot: route in CHECKLIST_PILOT_ROUTES,
    };

    const row: ConversionPageRow = {
      ...baseRow,
      expectedGa4Labels: expectedLabelsForPage(baseRow),
      dropOffHints: [],
    };
    row.dropOffHints = buildDropOffHints(row);
    pages.push(row);
  }

  const affiliateGearRoutes = new Set(affiliateAudit.routesByBox.gear);
  const affiliateServiceRoutes = new Set(affiliateAudit.routesByBox.service);

  const fullFunnelRoutes = pages.filter(
    (p) =>
      p.systemsActive.includes("next_step") &&
      (p.systemsActive.includes("affiliate_gear") ||
        p.systemsActive.includes("affiliate_service")),
  ).length;

  const minimalRoutes = pages.filter((p) => p.funnelDepth === 0).length;

  const highValueWithoutAffiliate = [...HIGH_VALUE_ROUTES].filter((route) => {
    const p = pages.find((row) => row.route === route);
    return (
      !p ||
      (!affiliateGearRoutes.has(route) && !affiliateServiceRoutes.has(route))
    );
  }).length;

  const highValueWithoutNextStep = [...HIGH_VALUE_ROUTES].filter((route) => {
    const p = pages.find((row) => row.route === route);
    return !p?.nextStepGuideId;
  }).length;

  const topNextStepSources = pages
    .filter((p) => p.nextStepGuideId && p.nextStepTargetCount > 0)
    .map((p) => ({
      guideId: p.nextStepGuideId!,
      route: p.route,
      outboundTargets: p.nextStepTargetCount,
    }))
    .sort((a, b) => b.outboundTargets - a.outboundTargets)
    .slice(0, 12);

  const affiliateHardFailures =
    affiliateAudit.summary.missingUrls > 0 ||
    affiliateAudit.summary.unknownLinkIds > 0;

  return {
    generatedAt: new Date().toISOString(),
    ga4Catalog: CONVERSION_GA4_CATALOG,
    summary: {
      articleRoutes: pages.length,
      affiliateGearRoutes: pages.filter((p) =>
        p.systemsActive.includes("affiliate_gear"),
      ).length,
      affiliateServiceRoutes: pages.filter((p) =>
        p.systemsActive.includes("affiliate_service"),
      ).length,
      nextStepRoutes: pages.filter((p) => p.systemsActive.includes("next_step"))
        .length,
      checklistRoutes: pages.filter((p) => p.systemsActive.includes("checklist"))
        .length,
      guideEndCtaRoutes: pages.filter((p) =>
        p.systemsActive.includes("guide_end_cta"),
      ).length,
      fullFunnelRoutes,
      minimalRoutes,
      highValueRoutes: HIGH_VALUE_ROUTES.size,
      highValueWithoutAffiliate,
      highValueWithoutNextStep,
      checklistPilotRoutes: Object.keys(CHECKLIST_PILOT_ROUTES).length,
    },
    health: {
      affiliateOk: !affiliateHardFailures,
      nextStepOk: nextStepAudit.passed,
      checklistOk: checklistAudit.issues.length === 0,
    },
    pages,
    gapGroups: buildGapGroups(pages),
    topNextStepSources,
  };
}

export function formatConversionObservabilityReport(
  report: ConversionObservabilityReport,
): string {
  const lines = [
    "Conversion observability",
    "=======================",
    `Generated: ${report.generatedAt}`,
    `Articles scanned: ${report.summary.articleRoutes}`,
    `Affiliate gear: ${report.summary.affiliateGearRoutes}`,
    `Affiliate service: ${report.summary.affiliateServiceRoutes}`,
    `Next Step: ${report.summary.nextStepRoutes}`,
    `Checklist: ${report.summary.checklistRoutes}`,
    `Full funnel (journey + affiliate): ${report.summary.fullFunnelRoutes}`,
    `Minimal (no stack): ${report.summary.minimalRoutes}`,
    "",
    "Gap groups:",
  ];

  for (const group of report.gapGroups) {
    lines.push(`  ${group.title}: ${group.routes.length} routes`);
  }

  return lines.join("\n");
}
