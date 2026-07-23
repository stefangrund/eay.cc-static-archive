import TurndownService from 'turndown'
import * as shared from './_shared.js'

export function initTurndownService ({ permalink, config = {} } = {}) {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced'
  })

  const defaultEscape = turndownService.escape.bind(turndownService)
  turndownService.escape = string => escapeLiteralMarkdown(defaultEscape(string))

  turndownService.addRule('table', {
    filter: 'table',
    replacement: (content, node) => convertTable(node, turndownService)
  })

  turndownService.addRule('fencedCodeBlock', {
    filter: 'pre',
    replacement: (content, node) => {
      const codeNode = node.firstElementChild?.nodeName === 'CODE'
        ? node.firstElementChild
        : node
      const language = codeNode.getAttribute?.('class')?.match(/(?:^|\s)language-([^\s]+)/)?.[1] || ''
      return createFencedBlock(codeNode.textContent, language)
    }
  })

  turndownService.addRule('safeLink', {
    filter: 'a',
    replacement: (content, node) => {
      const href = String(node.getAttribute('href') || '').trim()
      if (!href) return content

      if (/^javascript:/i.test(href)) {
        const source = decodeBookmarklet(href.slice(href.indexOf(':') + 1))
        return `${content}${createFencedBlock(source, 'javascript')}`
      }

      const resolved = resolveUrl(href, permalink)
      if (!resolved) return content
      const title = node.getAttribute('title')
      const titlePart = title ? ` "${title.replace(/"/g, '\\"')}"` : ''
      return `[${content}](${resolved}${titlePart})`
    }
  })

  turndownService.addRule('resolvedImage', {
    filter: 'img',
    replacement: (content, node) => {
      let source = resolveUrl(node.getAttribute('src'), permalink)
      if (!source) return ''

      if (config.saveScrapedImages && isDownloadableImage(source)) {
        source = `images/${shared.getFilenameFromUrl(new URL(source).pathname)}`
      }

      const alt = String(node.getAttribute('alt') || '').replace(/([\\\]])/g, '\\$1')
      const title = node.getAttribute('title')
      const titlePart = title ? ` "${title.replace(/"/g, '\\"')}"` : ''
      return `![${alt}](${source}${titlePart})`
    }
  })

  turndownService.addRule('media', {
    filter: ['video', 'audio'],
    replacement: (content, node) => convertMedia(node, permalink)
  })

  turndownService.addRule('iframe', {
    filter: 'iframe',
    replacement: (content, node) => {
      const source = getHttpUrl(node.getAttribute('src'), permalink)
      return source ? `\n\n[Embedded content](${source})\n\n` : ''
    }
  })

  turndownService.addRule('legacyObject', {
    filter: ['object', 'embed'],
    replacement: (content, node) => {
      const candidate = node.getAttribute('data') || node.getAttribute('src') ||
        node.querySelector?.('param[name="movie"]')?.getAttribute('value')
      const source = getHttpUrl(candidate, permalink)
      return source ? `\n\n[Embedded content](${source})\n\n` : content
    }
  })

  turndownService.addRule('script', {
    filter: 'script',
    replacement: (content, node) => {
      if (node.getAttribute('src')) return ''
      const source = String(node.textContent || '').trim()
      if (!source || isLoaderScript(source)) return ''
      return createFencedBlock(source, 'javascript')
    }
  })

  return turndownService
}

export function getPostContent (post, options) {
  const { permalink, format, externalUrl, config = {} } = options
  const footnotes = extractLegacyFootnotes(String(post.encoded?.[0] || ''))
  let content = footnotes.html

  // Empty divs preserve intentional paragraph breaks without modifying code blocks.
  content = content.replace(/(\r?\n){2}/g, '\n<div></div>\n')

  const turndownService = initTurndownService({ permalink, config })
  content = turndownService.turndown(content)

  for (const footnote of footnotes.items) {
    content = content.replaceAll(footnote.marker, `[^${footnote.number}]`)
  }

  if (footnotes.items.length > 0) {
    const definitions = footnotes.items.map(footnote => {
      const markdown = turndownService.turndown(footnote.html).trim()
      return `[^${footnote.number}]: ${indentFootnote(markdown)}`
    })
    content = `${content.trim()}\n\n${definitions.join('\n')}`
  }

  if (format === 'link' && externalUrl) {
    content = `[Link →](${externalUrl})${content.trim() ? `\n\n${content.trim()}` : ''}`
  }

  return normalizeMarkdownWhitespace(removeFalseLineStartEscapes(content))
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function resolveUrl (value, baseUrl) {
  const source = String(value || '').trim()
  if (!source) return undefined
  try {
    return new URL(source, baseUrl).href
  } catch {
    return undefined
  }
}

function getHttpUrl (value, baseUrl) {
  const resolved = resolveUrl(value, baseUrl)
  if (!resolved) return undefined
  const protocol = new URL(resolved).protocol
  return protocol === 'http:' || protocol === 'https:' ? resolved : undefined
}

function isDownloadableImage (url) {
  try {
    return /\.(?:gif|jpe?g|png)$/i.test(new URL(url).pathname)
  } catch {
    return false
  }
}

function convertMedia (node, permalink) {
  const kind = node.nodeName.toLowerCase()
  const candidates = [
    node.getAttribute('src'),
    ...Array.from(node.querySelectorAll('source')).map(source => source.getAttribute('src'))
  ]
    .map(source => getHttpUrl(source, permalink))
    .filter(Boolean)

  const preferredExtension = kind === 'video' ? /\.mp4(?:$|[?#])/i : /\.mp3(?:$|[?#])/i
  const mediaUrl = candidates.find(source => preferredExtension.test(source)) || candidates[0]
  const output = []

  if (kind === 'video') {
    const poster = getHttpUrl(node.getAttribute('poster'), permalink)
    if (poster) {
      const alt = String(node.querySelector('img')?.getAttribute('alt') || 'Video poster')
        .replace(/([\\\]])/g, '\\$1')
      output.push(`![${alt}](${poster})`)
    }
  }

  if (mediaUrl) {
    output.push(`[${kind === 'video' ? 'Video' : 'Audio'}](${mediaUrl})`)
  }

  return output.length > 0 ? `\n\n${output.join('\n\n')}\n\n` : ''
}

function convertTable (table, turndownService) {
  const sourceRows = Array.from(table.querySelectorAll('tr'))
    .filter(row => getClosestTable(row) === table)
    .map(row => ({
      hasHeader: Array.from(row.children).some(cell => cell.nodeName === 'TH'),
      cells: Array.from(row.children).filter(cell => cell.nodeName === 'TH' || cell.nodeName === 'TD')
    }))

  if (sourceRows.length === 0) return ''

  const rows = expandTableSpans(sourceRows, cell => {
    return turndownService.turndown(cell.innerHTML)
      .trim()
      .replace(/\n\s*\n/g, '<br>')
      .replace(/\n/g, '<br>')
      .replace(/\s*<br>\s*/g, '<br>')
      .replace(/(?<!\\)\|/g, '\\|')
  })
  const columnCount = Math.max(...rows.map(row => row.cells.length))
  rows.forEach(row => {
    while (row.cells.length < columnCount) row.cells.push('')
  })

  const headerIndex = rows.findIndex(row => row.hasHeader)
  const selectedHeaderIndex = headerIndex === -1 ? 0 : headerIndex
  const header = rows[selectedHeaderIndex]
  const body = rows.filter((row, index) => index !== selectedHeaderIndex)
  const renderRow = row => `| ${row.cells.join(' | ')} |`
  const separator = `| ${Array(columnCount).fill('---').join(' | ')} |`

  return `\n\n${[renderRow(header), separator, ...body.map(renderRow)].join('\n')}\n\n`
}

function expandTableSpans (rows, convertCell) {
  const spans = new Map()
  return rows.map(row => {
    const cells = []
    const occupied = new Set()

    for (const [column, remaining] of spans) {
      cells[column] = ''
      occupied.add(column)
      if (remaining === 1) spans.delete(column)
      else spans.set(column, remaining - 1)
    }

    let column = 0
    for (const cell of row.cells) {
      while (occupied.has(column)) column++
      const colspan = getSpan(cell, 'colspan')
      const rowspan = getSpan(cell, 'rowspan')
      cells[column] = convertCell(cell)

      for (let offset = 1; offset < colspan; offset++) {
        cells[column + offset] = ''
      }
      if (rowspan > 1) {
        for (let offset = 0; offset < colspan; offset++) {
          spans.set(column + offset, rowspan - 1)
        }
      }
      column += colspan
    }

    return { cells: Array.from(cells, value => value || ''), hasHeader: row.hasHeader }
  })
}

function getSpan (cell, attribute) {
  const value = Number.parseInt(cell.getAttribute(attribute) || '1', 10)
  return Number.isInteger(value) && value > 0 ? value : 1
}

function getClosestTable (node) {
  let current = node.parentNode
  while (current) {
    if (current.nodeName === 'TABLE') return current
    current = current.parentNode
  }
  return undefined
}

function extractLegacyFootnotes (html) {
  const items = []
  let output = ''
  let cursor = 0

  while (cursor < html.length) {
    const start = html.indexOf('((', cursor)
    if (start === -1) {
      output += html.slice(cursor)
      break
    }

    if (isInsideHtmlTag(html, start) || isInsideProtectedElement(html, start)) {
      output += html.slice(cursor, start + 2)
      cursor = start + 2
      continue
    }

    const end = findFootnoteEnd(html, start + 2)
    if (end === -1) {
      output += html.slice(cursor)
      break
    }

    const number = items.length + 1
    const marker = `EAYARCHIVEFOOTNOTE${number}TOKEN`
    output += html.slice(cursor, start) + marker
    items.push({ number, marker, html: html.slice(start + 2, end) })
    cursor = end + 2
  }

  return { html: output, items }
}

function findFootnoteEnd (html, start) {
  let depth = 1
  for (let index = start; index < html.length - 1; index++) {
    const pair = html.slice(index, index + 2)
    if (pair === '((') {
      depth++
      index++
    } else if (pair === '))') {
      depth--
      if (depth === 0) return index
      index++
    }
  }
  return -1
}

function isInsideHtmlTag (html, index) {
  return html.lastIndexOf('<', index) > html.lastIndexOf('>', index)
}

function isInsideProtectedElement (html, index) {
  const prefix = html.slice(0, index).toLowerCase()
  return ['pre', 'code', 'script'].some(tag => {
    return prefix.lastIndexOf(`<${tag}`) > prefix.lastIndexOf(`</${tag}`)
  })
}

function indentFootnote (markdown) {
  return markdown.split('\n').map((line, index) => index === 0 ? line : `    ${line}`).join('\n')
}

function createFencedBlock (source, language = '') {
  const value = String(source || '').replace(/^\n|\n$/g, '')
  const longestRun = Math.max(0, ...(value.match(/`+/g) || []).map(run => run.length))
  const fence = '`'.repeat(Math.max(3, longestRun + 1))
  return `\n\n${fence}${language}\n${value}\n${fence}\n\n`
}

function decodeBookmarklet (source) {
  try {
    return decodeURIComponent(source)
  } catch {
    return source
  }
}

function isLoaderScript (source) {
  return /createElement\s*\(\s*["']script["']/i.test(source) ||
    /twitter-wjs|platform\.twitter\.com\/widgets/i.test(source) ||
    /getElementById[\s\S]+(?:flashvars|setAttribute)/i.test(source)
}

function escapeLiteralMarkdown (value) {
  return value
    .replace(/&(?=(?:#\d+|#x[0-9a-f]+|[a-z][a-z0-9]+);)/gi, '\\&')
    .replace(/<(?=\/?[A-Za-z][^>\n]*>|!--|!DOCTYPE|\?xml)/g, '\\<')
}

function removeFalseLineStartEscapes (markdown) {
  return markdown.split('\n').map(line => {
    return line.replace(/\\([#>\-=])/g, (match, character, offset) => {
      return isMarkdownContentStart(line.slice(0, offset)) ? match : character
    })
  }).join('\n')
}

function isMarkdownContentStart (prefix) {
  const structuralPrefix = /^(?:\s*(?:>\s*)?)*(?:(?:[-+*]|\d+\.)\s+)?/
  return prefix.replace(structuralPrefix, '') === ''
}

function normalizeMarkdownWhitespace (markdown) {
  let fence
  return markdown.split('\n').map(line => {
    const fenceMatch = line.match(/^(`{3,}|~{3,})/)
    if (fenceMatch) {
      if (!fence) fence = fenceMatch[1][0]
      else if (fence === fenceMatch[1][0]) fence = undefined
      return line
    }
    if (fence) return line
    if (/^[\t ]+$/.test(line)) return ''

    const trailing = line.match(/[\t ]+$/)?.[0]
    if (!trailing) return line
    const content = line.slice(0, -trailing.length)
    if (trailing.length < 2 || /^\s*>\s*$/.test(content)) return content
    return `${content}\\`
  }).join('\n')
}
