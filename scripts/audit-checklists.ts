import {
  formatChecklistAuditReport,
  runChecklistAudit,
} from "../lib/checklist-audit";

const report = runChecklistAudit();
console.log(formatChecklistAuditReport(report));

const hardFailures = report.issues.filter((issue) =>
  [
    "duplicate_id",
    "missing_file",
    "unknown_download_id",
    "pilot_missing_box",
    "pilot_wrong_id",
    "pilot_duplicate_box",
  ].includes(issue.kind),
);

process.exit(hardFailures.length > 0 ? 1 : 0);
