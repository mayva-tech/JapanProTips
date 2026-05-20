import {
  formatConversionObservabilityReport,
  runConversionObservability,
} from "../lib/conversion-observability";

const report = runConversionObservability();
console.log(formatConversionObservabilityReport(report));

process.exit(0);
