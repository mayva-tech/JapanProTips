/**
 * Field Note coverage audit CLI. Runs lib/field-note-audit.ts via npx tsx.
 */
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const scriptPath = path.join(root, "scripts", "audit-field-notes.ts");

try {
  execSync(`npx tsx "${scriptPath}"`, {
    stdio: "inherit",
    cwd: root,
    env: process.env,
  });
} catch {
  process.exit(1);
}
