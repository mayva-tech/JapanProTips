import {
  formatNextStepAuditReport,
  nextStepAuditExitCode,
  runNextStepAudit,
} from "../lib/next-step-audit";

const report = runNextStepAudit();
console.log(formatNextStepAuditReport(report));
process.exit(nextStepAuditExitCode(report));
