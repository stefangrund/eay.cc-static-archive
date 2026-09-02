import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { promisify } from 'node:util'

const run = promisify(execFile)

test('CLI exports the fixture using explicit options and legacy aliases', async (t) => {
  const output = await fs.mkdtemp(path.join(os.tmpdir(), 'eay-cli-test-'))
  t.after(() => fs.rm(output, { recursive: true, force: true }))

  const { stdout, stderr } = await run(process.execPath, [
    path.resolve('scripts/wordpress-export-to-markdown/index.js'),
    '--wizard=false',
    '--input', path.resolve('test/fixtures/export.xml'),
    '--output', output,
    '--yearfolders=true',
    '--month-folders=false',
    '--postfolders=false',
    '--prefixdate=true',
    '--saveimages=false',
    '--addcontentimages=false'
  ], { cwd: process.cwd() })

  assert.equal(stderr, '')
  assert.match(stdout, /Skipping wizard/)
  assert.match(stdout, /All done!/)
  assert.doesNotMatch(stdout, /\[FAILED\]|Something went wrong/)
  const files = (await fs.readdir(output, { recursive: true }))
    .filter(file => file.endsWith('.md'))
  assert.equal(files.length, 7)
  assert.ok(files.includes(path.join('2025', '2025-01-01-standard-fixture.md')))

  const { stdout: validation } = await run(process.execPath, [
    path.resolve('scripts/validate-markdown.js'), output
  ])
  assert.match(validation, /Validated 7 Markdown files with 7 unique post IDs/)
})
