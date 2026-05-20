import fs from "fs";
import path from "path";
import {
  CHECKLIST_PILOT_ROUTES,
  downloadableChecklists,
  listDownloadableChecklistIds,
} from "@/lib/downloadable-checklists";

const USAGE_SCAN_ROOTS = ["app", "content"] as const;

const DOWNLOAD_CHECKLIST_RE =
  /<DownloadChecklistBox[^>]*\sdownloadId=["']([^"']+)["']/g;

export type ChecklistAuditIssue = {
  kind:
    | "duplicate_id"
    | "missing_file"
    | "unknown_download_id"
    | "pilot_missing_box"
    | "pilot_wrong_id"
    | "pilot_duplicate_box"
    | "orphan_reference";
  message: string;
  route?: string;
  downloadId?: string;
};

export type ChecklistAuditReport = {
  issues: ChecklistAuditIssue[];
  summary: {
    checklistCount: number;
    fileCount: number;
    pilotRoutes: number;
    pilotWithBox: number;
    references: number;
  };
};

function walkFiles(dir: string, acc: string[] = []): string[] {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      walkFiles(full, acc);
    } else if (/\.(tsx|ts|mdx|jsx|js)$/.test(entry.name)) {
      acc.push(full);
    }
  }
  return acc;
}

function scanDownloadChecklistUsage(root: string): Map<string, string[]> {
  const byRoute = new Map<string, string[]>();

  for (const scanRoot of USAGE_SCAN_ROOTS) {
    const base = path.join(root, scanRoot);
    for (const file of walkFiles(base)) {
      const text = fs.readFileSync(file, "utf8");
      const matches = [...text.matchAll(DOWNLOAD_CHECKLIST_RE)];
      if (matches.length === 0) continue;

      const route = filePathToRoute(root, file);
      const ids = matches.map((m) => m[1]);
      const existing = byRoute.get(route) ?? [];
      byRoute.set(route, [...existing, ...ids]);
    }
  }

  return byRoute;
}

function filePathToRoute(root: string, file: string): string {
  const rel = path.relative(root, file).replace(/\\/g, "/");

  if (rel.startsWith("app/guides/") && rel.endsWith("/page.tsx")) {
    const slug = rel.slice("app/guides/".length, -"/page.tsx".length);
    return `/guides/${slug}`;
  }

  if (rel.startsWith("app/residents/") && rel.endsWith("/page.tsx")) {
    const slug = rel.slice("app/residents/".length, -"/page.tsx".length);
    return `/residents/${slug}`;
  }

  if (rel.startsWith("content/guides/") && rel.endsWith(".mdx")) {
    const slug = rel.slice("content/guides/".length, -".mdx".length);
    return `/guides/${slug}`;
  }

  if (rel.startsWith("content/residents/") && rel.endsWith(".mdx")) {
    const slug = rel.slice("content/residents/".length, -".mdx".length);
    return `/residents/${slug}`;
  }

  return rel;
}

export function runChecklistAudit(root = process.cwd()): ChecklistAuditReport {
  const issues: ChecklistAuditIssue[] = [];
  const ids = listDownloadableChecklistIds();

  const idSet = new Set<string>();
  for (const id of ids) {
    if (idSet.has(id)) {
      issues.push({
        kind: "duplicate_id",
        downloadId: id,
        message: `Duplicate checklist id: ${id}`,
      });
    }
    idSet.add(id);
  }

  let fileCount = 0;
  for (const checklist of Object.values(downloadableChecklists)) {
    const diskPath = path.join(root, "public", checklist.filePath.replace(/^\//, ""));
    if (!fs.existsSync(diskPath)) {
      issues.push({
        kind: "missing_file",
        downloadId: checklist.id,
        message: `Missing file for ${checklist.id}: ${checklist.filePath}`,
      });
    } else {
      fileCount += 1;
    }
  }

  const usage = scanDownloadChecklistUsage(root);
  let references = 0;

  for (const [route, downloadIds] of usage) {
    references += downloadIds.length;

    for (const downloadId of downloadIds) {
      if (!downloadableChecklists[downloadId]) {
        issues.push({
          kind: "unknown_download_id",
          route,
          downloadId,
          message: `${route} references unknown downloadId "${downloadId}"`,
        });
      }
    }

    if (downloadIds.length > 1) {
      issues.push({
        kind: "pilot_duplicate_box",
        route,
        message: `${route} has ${downloadIds.length} DownloadChecklistBox components (max 1)`,
      });
    }
  }

  const pilotRoutes = Object.keys(CHECKLIST_PILOT_ROUTES);
  let pilotWithBox = 0;

  for (const route of pilotRoutes) {
    const expectedId = CHECKLIST_PILOT_ROUTES[route];
    const found = usage.get(route) ?? [];

    if (found.length === 0) {
      issues.push({
        kind: "pilot_missing_box",
        route,
        downloadId: expectedId,
        message: `Pilot route ${route} is missing DownloadChecklistBox (expected ${expectedId})`,
      });
      continue;
    }

    pilotWithBox += 1;
    if (found[0] !== expectedId) {
      issues.push({
        kind: "pilot_wrong_id",
        route,
        downloadId: found[0],
        message: `Pilot route ${route} uses "${found[0]}" but audit expects "${expectedId}"`,
      });
    }
  }

  for (const [route, downloadIds] of usage) {
    if (pilotRoutes.includes(route)) continue;
    issues.push({
      kind: "orphan_reference",
      route,
      downloadId: downloadIds[0],
      message: `Non-pilot route ${route} uses DownloadChecklistBox (pilot-only for now)`,
    });
  }

  return {
    issues,
    summary: {
      checklistCount: ids.length,
      fileCount,
      pilotRoutes: pilotRoutes.length,
      pilotWithBox,
      references,
    },
  };
}

export function formatChecklistAuditReport(report: ChecklistAuditReport): string {
  const lines: string[] = [
    "Checklist audit",
    "===============",
    `Checklists in registry: ${report.summary.checklistCount}`,
    `Files on disk: ${report.summary.fileCount}/${report.summary.checklistCount}`,
    `Pilot routes: ${report.summary.pilotRoutes} (${report.summary.pilotWithBox} with box)`,
    `Total DownloadChecklistBox references: ${report.summary.references}`,
    "",
  ];

  if (report.issues.length === 0) {
    lines.push("No issues found.");
    return lines.join("\n");
  }

  lines.push(`Issues (${report.issues.length}):`);
  for (const issue of report.issues) {
    lines.push(`  [${issue.kind}] ${issue.message}`);
  }

  return lines.join("\n");
}
