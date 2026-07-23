import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import YAML from 'yaml'
import { parseFilePromise } from '../scripts/wordpress-export-to-markdown/_parser.js'
import {
  getPostPath,
  serializeMarkdownFile,
  writeFilesPromise
} from '../scripts/wordpress-export-to-markdown/_writer.js'

const fixturePath = path.resolve('test/fixtures/export.xml')
const parserConfig = {
  input: fixturePath,
  saveAttachedImages: false,
  saveScrapedImages: false
}

let posts

test.before(async () => {
  posts = await parseFilePromise(parserConfig)
})

test('normalizes the public frontmatter schema and preserves string types', () => {
  const standard = findPost('0001')

  assert.deepEqual(standard.frontmatter, {
    title: 'Quoted "title":\nsecond line',
    date: '2025-01-01',
    published_at: '2024-12-31T22:30:00Z',
    id: '0001',
    slug: 'standard-fixture',
    permalink: 'https://eay.cc/2025/standard-fixture/',
    author: 'Stefan Grund',
    format: 'standard',
    categories: ['08/15'],
    tags: ['quantified self'],
    short_url: 'https://eay.li/test',
    content_copy: [
      'https://social.example/1',
      'https://mastodon.example/2'
    ],
    geo_latitude: '50.94',
    geo_longitude: '6.95',
    geo_address: 'Köln "Innenstadt"'
  })

  const parsed = parseSerializedFrontmatter(standard)
  assertFrontmatterStringTypes(parsed)
  assert.equal(parsed.id, '0001')
  assert.equal(parsed.date, '2025-01-01')
  assert.equal(parsed.title, 'Quoted "title":\nsecond line')
  assert.equal('datetime' in parsed, false)
  assert.equal('url' in parsed, false)
  assert.equal('meta' in parsed, false)
  assert.equal('modified_at' in parsed, false)
})

test('serializes quotes, multiline text, and control characters as valid YAML strings', () => {
  const output = serializeMarkdownFile({
    frontmatter: {
      title: 'A "quote"\nwith a control character: \u0001',
      date: '2025-01-01',
      published_at: '2024-12-31T23:00:00Z',
      id: '0008',
      slug: 'yaml-fixture',
      permalink: 'https://eay.cc/2025/yaml-fixture/',
      author: 'Stefan Grund',
      format: 'standard',
      categories: ['08/15']
    },
    content: 'Body'
  })
  const parsed = YAML.parse(output.match(/^---\n([\s\S]*?)\n---/)[1])
  const emptyOutput = serializeMarkdownFile({ frontmatter: parsed, content: '' })

  assert.equal(parsed.title, 'A "quote"\nwith a control character: \u0001')
  assertFrontmatterStringTypes(parsed)
  assert.match(emptyOutput, /---\n$/)
  assert.doesNotMatch(emptyOutput, /\n\n$/)
})

test('normalizes authors, formats, link destinations, and GMT fallback', () => {
  assert.equal(posts.length, 7)
  assert.deepEqual(posts.map(post => post.frontmatter.format), [
    'standard', 'link', 'status', 'aside', 'image', 'quote', 'statusmitteilung'
  ])
  assert.equal(findPost('0002').frontmatter.author, 'Stefan Grund')
  assert.equal(findPost('0006').frontmatter.author, 'Limpi')
  assert.equal(findPost('0007').frontmatter.author, 'MoD')

  const link = findPost('0002')
  assert.equal(link.frontmatter.external_url, 'https://example.net/story')
  assert.ok(link.content.startsWith('[Link →](https://example.net/story)'))
  assert.doesNotMatch(link.content, /^# Link fixture/m)

  const fallback = findPost('0005')
  assert.equal(fallback.frontmatter.published_at, '2016-01-04T21:36:27Z')
  assert.equal('geo_latitude' in fallback.frontmatter, false)
})

test('produces portable Markdown for tables, footnotes, code, URLs, and media', () => {
  const body = findPost('0001').content

  assert.match(body, /^\| Head \\\| one \|  \| Head two \|$/m)
  assert.match(body, /^\| --- \| --- \| --- \|$/m)
  assert.match(body, /^\| Row \| One \| Two<br>lines \|$/m)
  assert.match(body, /^\|  \| Tail \|  \|$/m)
  assert.match(body, /- {3}Outer\n {4}- {3}Inner/)
  assert.match(body, /A note \[\^1\] follows\./)
  assert.match(body, /\[\^1\]: Footnote with \*\*formatting\*\* and a \[source\]\(https:\/\/eay\.cc\/source\)\./)
  assert.match(body, /````js\nconst fence = "```";[\s\S]*\n````/)

  assert.match(body, /\[Relative\]\(https:\/\/eay\.cc\/2025\/standard-fixture\/relative\/path\)/)
  assert.match(body, /\[Root\]\(https:\/\/eay\.cc\/root\/path\)/)
  assert.match(body, /\[Protocol\]\(https:\/\/cdn\.example\/image\)/)
  assert.match(body, /\[Fragment\]\(https:\/\/eay\.cc\/2025\/standard-fixture\/#part\)/)
  assert.match(body, /\[Mail\]\(mailto:test@example\.com\)/)
  assert.match(body, /```javascript\nwindow\.open/)

  assert.match(body, /!\[Video poster\]\(https:\/\/eay\.cc\/media\/poster\.jpg\)/)
  assert.match(body, /\[Video\]\(https:\/\/eay\.cc\/media\/movie\.mp4\)/)
  assert.match(body, /\[Embedded content\]\(https:\/\/player\.example\/embed\/1\)/)
  assert.match(body, /```javascript\nwindow\.alert\("Editorial example"\);/)

  assert.match(body, /Readable All-Time! AT&T #hashtag and 2 < 3\./)
  assert.match(body, /\[Inline\]\(https:\/\/eay\.cc\/inline\)-hyphen and \*\*bold\*\*#hashtag stay readable\./)
  assert.match(body, /Literal \\&copy; and \\<em>text\\<\/em>\./)
  assert.doesNotMatch(body, /<script\b|<iframe\b|\]\(javascript:/i)
})

test('writes new local-date paths before removing stale paths for the same ID', async () => {
  const output = await fs.mkdtemp(path.join(os.tmpdir(), 'eay-export-test-'))
  const config = {
    ...parserConfig,
    output,
    yearFolders: true,
    monthFolders: false,
    postFolders: false,
    prefixDate: true
  }
  const stalePath = path.join(output, '2024', '2024-12-31-standard-fixture.md')
  await fs.mkdir(path.dirname(stalePath), { recursive: true })
  await fs.writeFile(stalePath, '---\nid: "0001"\n---\n\nOld\n')

  try {
    await writeFilesPromise(posts, config)
    const expectedPath = getPostPath(findPost('0001'), config)
    const expected = await fs.readFile(expectedPath, 'utf8')
    assert.equal(await fileExists(stalePath), false)
    assert.equal(YAML.parse(expected.match(/^---\n([\s\S]*?)\n---/)[1]).date, '2025-01-01')
  } finally {
    await fs.rm(output, { recursive: true, force: true })
  }
})

function findPost (id) {
  return posts.find(post => post.frontmatter.id === id)
}

function parseSerializedFrontmatter (post) {
  const output = serializeMarkdownFile(post)
  return YAML.parse(output.match(/^---\n([\s\S]*?)\n---/)[1])
}

function assertFrontmatterStringTypes (frontmatter) {
  for (const value of Object.values(frontmatter)) {
    assert.ok(
      typeof value === 'string' ||
      (Array.isArray(value) && value.every(item => typeof item === 'string'))
    )
  }
}

async function fileExists (filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}
