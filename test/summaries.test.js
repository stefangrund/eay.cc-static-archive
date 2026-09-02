import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { promisify } from "node:util";

const run = promisify(execFile);
const earlyInfo = "Im Februar 2026 durch OpenAI GPT-5.3 erstellt.";
const laterInfo = "Im Juli 2026 durch OpenAI GPT-5.5 erstellt.";

async function writeYear(root, data) {
  const directory = path.join(root, "posts", String(data.year));
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "_summary.json"), JSON.stringify(data, null, 2) + "\n");
}

for (const scriptName of ["combine-yearly-summaries.js", "export-yearly-summaries.js"]) {
  const script = path.resolve("scripts", scriptName);
  const outputName = scriptName === "combine-yearly-summaries.js" ? "all.json" : "2026.json";

  test(`${scriptName}: preserves each month's disclosure and content`, async (t) => {
    const root = await mkdtemp(path.join(os.tmpdir(), "eay-summaries-test-"));
    t.after(() => rm(root, { recursive: true, force: true }));
    const data = {
      year: 2026,
      months: [
        { month: 1, monthName: "Januar", monthISO: "2026-01", info: earlyInfo,
          postCount: 1, highlights: "First topic", summary: '<a href="https://eay.cc/2026/first/">First</a>' },
        { month: 6, monthName: "Juni", monthISO: "2026-06", info: laterInfo,
          postCount: 2, highlights: "Later topic", summary: "Later summary" },
      ],
    };
    await writeYear(root, data);
    await mkdir(path.join(root, "posts", "2025")); // No summary yet.
    await run(process.execPath, [script], { cwd: root });
    const raw = await readFile(path.join(root, "summaries", outputName), "utf8");
    const result = JSON.parse(raw);
    assert.equal(raw, JSON.stringify(result, null, 2) + "\n");
    if (outputName === "all.json") assert.deepEqual(result.data, [data]);
    else assert.deepEqual(result, data);
    assert.deepEqual(
      JSON.parse(await readFile(path.join(root, "posts", "2026", "_summary.json"), "utf8")),
      data,
    );
  });

  test(`${scriptName}: rejects shared, missing, or blank disclosures`, async (t) => {
    const root = await mkdtemp(path.join(os.tmpdir(), "eay-summaries-test-"));
    t.after(() => rm(root, { recursive: true, force: true }));
    const month = { monthISO: "2026-06" };
    for (const [data, message] of [
      [{ year: 2026, info: earlyInfo, months: [{ ...month, info: laterInfo }] }, /move the AI disclosure into each month/],
      [{ year: 2026, months: [month] }, /Missing AI disclosure for 2026-06/],
      [{ year: 2026, months: [{ ...month, info: "  " }] }, /Missing AI disclosure for 2026-06/],
    ]) {
      await writeYear(root, data);
      await assert.rejects(run(process.execPath, [script], { cwd: root }), (error) => {
        assert.match(error.stderr, message);
        return true;
      });
      await assert.rejects(readFile(path.join(root, "summaries", outputName)), { code: "ENOENT" });
    }
  });
}
