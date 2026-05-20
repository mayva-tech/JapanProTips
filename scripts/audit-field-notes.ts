import {
  formatFieldNoteAuditReport,
  runFieldNoteAudit,
} from "../lib/field-note-audit";

const report = runFieldNoteAudit();
console.log(formatFieldNoteAuditReport(report));

const hardFailures = report.issues.filter((i) =>
  ["invalid_tone", "unknown_open_tag"].includes(i.kind),
);

process.exit(hardFailures.length > 0 ? 1 : 0);
