import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const line = readFileSync(join(here, "entry.txt"), "utf8").trim();
if (line.length < 1 || line.length > 240) {
  throw new Error(`entry.txt must be 1-240 characters, got ${line.length}`);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, line + "\n", "utf8");
// Confirm the entry actually landed before we exit.
const written = readFileSync(target, "utf8").trim();
if (written !== line) {
  throw new Error("entry.txt was not written correctly");
}
