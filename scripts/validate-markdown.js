#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import YAML from 'yaml'

const outputDirectory = path.resolve(process.argv[2] || 'posts')
const requiredFields = [
  'title',
  'date',
  'published_at',
  'id',
  'slug',
  'permalink',
  'author',
  'format'
]
const forbiddenFields = ['datetime', 'url', 'meta', 'modified_at']
const errors = []
const ids = new Map()
const files = await findMarkdownFiles(outputDirectory)

for (const filePath of files) {
  const relativePath = path.relative(outputDirectory, filePath)
  const source = await fs.readFile(filePath, 'utf8')
  const match = source.match(/^---\n([\s\S]*?)\n---\n/)
  if (!match) {
    errors.push(`${relativePath}: missing frontmatter block`)
    continue
  }

  let frontmatter
  try {
    frontmatter = YAML.parse(match[1])
  } catch (error) {
    errors.push(`${relativePath}: invalid YAML (${error.message})`)
    continue
  }

  for (const field of requiredFields) {
    if (typeof frontmatter?.[field] !== 'string' || (field !== 'title' && frontmatter[field] === '')) {
      errors.push(`${relativePath}: ${field} must be a string${field === 'title' ? '' : ' and may not be empty'}`)
    }
  }
  for (const field of forbiddenFields) {
    if (field in frontmatter) errors.push(`${relativePath}: forbidden field ${field}`)
  }
  for (const [field, value] of Object.entries(frontmatter || {})) {
    const valid = typeof value === 'string' ||
      (Array.isArray(value) && value.every(item => typeof item === 'string'))
    if (!valid) errors.push(`${relativePath}: ${field} has a non-string value`)
  }

  if (ids.has(frontmatter.id)) {
    errors.push(`${relativePath}: duplicate ID ${frontmatter.id} (also in ${ids.get(frontmatter.id)})`)
  } else {
    ids.set(frontmatter.id, relativePath)
  }

  const expectedFilename = `${frontmatter.date}-${frontmatter.slug}.md`
  if (path.basename(filePath) !== expectedFilename) {
    errors.push(`${relativePath}: expected filename ${expectedFilename}`)
  }
  if (path.basename(path.dirname(filePath)) !== frontmatter.date.slice(0, 4)) {
    errors.push(`${relativePath}: year folder does not match date`)
  }
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(frontmatter.published_at)) {
    errors.push(`${relativePath}: published_at is not a UTC ISO timestamp`)
  }

  const body = source.slice(match[0].length)
  if (/<script\b/i.test(body)) errors.push(`${relativePath}: contains an executable script tag`)
  if (/<iframe\b/i.test(body)) errors.push(`${relativePath}: contains a raw iframe`)
  if (/\]\(javascript:/i.test(body)) errors.push(`${relativePath}: contains an executable JavaScript link`)
}

if (errors.length > 0) {
  console.error(`Markdown validation failed with ${errors.length} error(s):`)
  for (const error of errors.slice(0, 100)) console.error(`- ${error}`)
  if (errors.length > 100) console.error(`- ...and ${errors.length - 100} more`)
  process.exitCode = 1
} else {
  console.log(`Validated ${files.length} Markdown files with ${ids.size} unique post IDs.`)
}

async function findMarkdownFiles (directory) {
  const results = []
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) results.push(...await findMarkdownFiles(entryPath))
    else if (entry.isFile() && entry.name.endsWith('.md')) results.push(entryPath)
  }
  return results
}
