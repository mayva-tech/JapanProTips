import {
  formatAffiliateAuditReport,
  runAffiliateAudit,
} from "../lib/affiliate-audit";

const report = runAffiliateAudit();
console.log(formatAffiliateAuditReport(report));

const exitCode =
  report.summary.missingUrls > 0 ||
  report.summary.emptyUrls > 0 ||
  report.summary.unknownLinkIds > 0
    ? 1
    : 0;

process.exit(exitCode);
