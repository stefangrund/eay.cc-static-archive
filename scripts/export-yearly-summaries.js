import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { validateSummaryInfo } from "./validate-summary-info.js";

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "posts");
const OUTPUT_DIR = path.join(ROOT, "summaries");

const yearDirPattern = /^\d{4}$/;

await mkdir(OUTPUT_DIR, { recursive: true });

const entries = await readdir(POSTS_DIR, { withFileTypes: true });
const yearDirs = entries
  .filter((entry) => entry.isDirectory() && yearDirPattern.test(entry.name))
  .map((entry) => entry.name);

for (const yearDir of yearDirs) {
  const summaryPath = path.join(POSTS_DIR, yearDir, "_summary.json");
  const outputPath = path.join(OUTPUT_DIR, `${yearDir}.json`);

  try {
    const raw = await readFile(summaryPath, "utf8");
    validateSummaryInfo(JSON.parse(raw));
    await writeFile(outputPath, raw.endsWith("\n") ? raw : raw + "\n", "utf8");
  } catch (error) {
    if (error?.code === "ENOENT") {
      continue;
    }
    throw new Error(`Failed to export ${summaryPath}: ${error.message}`);
  }
}

console.log(`Exported yearly summaries to ${OUTPUT_DIR}`);
