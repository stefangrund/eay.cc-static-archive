import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "posts");
const OUTPUT_FILE = path.join(ROOT, "summaries", "all.json");

const yearDirPattern = /^\d{4}$/;

await mkdir(path.dirname(OUTPUT_FILE), { recursive: true });

const entries = await readdir(POSTS_DIR, { withFileTypes: true });
const yearDirs = entries
  .filter((entry) => entry.isDirectory() && yearDirPattern.test(entry.name))
  .map((entry) => entry.name);

const summaries = [];

for (const yearDir of yearDirs) {
  const summaryPath = path.join(POSTS_DIR, yearDir, "_summary.json");
  try {
    const raw = await readFile(summaryPath, "utf8");
    const data = JSON.parse(raw);
    summaries.push(data);
  } catch (error) {
    if (error?.code === "ENOENT") {
      continue;
    }
    throw new Error(`Failed to read ${summaryPath}: ${error.message}`);
  }
}

summaries.sort((a, b) => Number(a.year) - Number(b.year));

const output = {
  info: "Auto-generated from posts/YYYY/_summary.json files. Do not edit by hand.",
  data: summaries,
};

await writeFile(OUTPUT_FILE, JSON.stringify(output, null, 2) + "\n", "utf8");

console.log(`Wrote ${OUTPUT_FILE}`);
