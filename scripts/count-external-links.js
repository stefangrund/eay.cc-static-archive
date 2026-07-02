#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE_DIR = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const POSTS_DIR = path.join(BASE_DIR, "posts");
const CURRENT_YEAR = new Date().getFullYear();
const INTERNAL_DOMAINS = ["eay.cc", "eayz.net"];

console.log(`Starting external link analysis of markdown files in ${POSTS_DIR}...`);

const files = [];

for (let year = 2007; year <= CURRENT_YEAR; year++) {
  const yearDir = path.join(POSTS_DIR, String(year));

  if (!fs.existsSync(yearDir) || !fs.statSync(yearDir).isDirectory()) {
    continue;
  }

  const yearFiles = fs
    .readdirSync(yearDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.join(yearDir, file));

  files.push(...yearFiles);
}

files.sort();

let postsWithExternalLinks = 0;
let externalLinks = 0;
const domainCounts = new Map();

for (const file of files) {
  const markdown = fs.readFileSync(file, "utf8");
  const { frontmatter, body } = splitFrontmatter(markdown);
  const urls = [
    ...extractLinkedListUrls(frontmatter),
    ...extractBodyLinks(body),
  ];
  const postDomains = new Set();

  for (const url of urls) {
    const domain = getExternalDomain(url);

    if (!domain) {
      continue;
    }

    externalLinks++;
    postDomains.add(domain);
    domainCounts.set(domain, (domainCounts.get(domain) ?? 0) + 1);
  }

  if (postDomains.size > 0) {
    postsWithExternalLinks++;
  }
}

console.log("External link stats:");
console.log(
  `- Posts with external links: ${postsWithExternalLinks} posts (${percentage(
    postsWithExternalLinks,
    files.length,
  )}%)`,
);
console.log(`- External links: ${externalLinks} links`);
console.log(`- Different external domains: ${domainCounts.size} domains`);
console.log("");
console.log("Top 20 external domains:");

const topDomains = [...domainCounts.entries()]
  .sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return a[0].localeCompare(b[0]);
  })
  .slice(0, 20);

topDomains.forEach(([domain, count], index) => {
  console.log(`${String(index + 1).padStart(2, " ")}. ${domain}: ${count} links`);
});

console.log("");
console.log("Report completed.");

function splitFrontmatter(markdown) {
  if (!markdown.startsWith("---")) {
    return { frontmatter: "", body: markdown };
  }

  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!match) {
    return { frontmatter: "", body: markdown };
  }

  return {
    frontmatter: match[1],
    body: markdown.slice(match[0].length),
  };
}

function extractLinkedListUrls(frontmatter) {
  const urls = [];
  const pattern =
    /^\s*-\s*linked_list_url:\s*(?:"([^"]+)"|'([^']+)'|([^#\r\n]+))/gm;

  for (const match of frontmatter.matchAll(pattern)) {
    urls.push((match[1] ?? match[2] ?? match[3]).trim());
  }

  return urls;
}

function extractBodyLinks(body) {
  const urls = [];
  const ranges = [];

  collectMatches(
    body,
    /(?<!!)\[[^\]\n]*\]\(\s*<?((?:https?:)?\/\/[^)\s>]+)[^)]*\)/gi,
    urls,
    ranges,
  );
  collectMatches(
    body,
    /<a\b[^>]*\bhref=(["'])((?:https?:)?\/\/.*?)\1[^>]*>/gi,
    urls,
    ranges,
    2,
  );
  collectMatches(body, /<((?:https?:)?\/\/[^>\s]+)>/gi, urls, ranges);
  maskMatches(body, /!\[[^\]\n]*\]\(\s*<?(?:https?:)?\/\/[^)]*\)/gi, ranges);
  maskMatches(body, /\b(?:src|poster)=(["'])(?:https?:)?\/\/.*?\1/gi, ranges);

  const maskedBody = maskRanges(body, ranges);
  const bareUrlPattern = /(?:https?:)?\/\/[^\s<>"'`]+/gi;

  for (const match of maskedBody.matchAll(bareUrlPattern)) {
    urls.push(match[0]);
  }

  return urls;
}

function collectMatches(text, pattern, urls, ranges, urlMatchIndex = 1) {
  for (const match of text.matchAll(pattern)) {
    urls.push(match[urlMatchIndex]);
    ranges.push([match.index, match.index + match[0].length]);
  }
}

function maskMatches(text, pattern, ranges) {
  for (const match of text.matchAll(pattern)) {
    ranges.push([match.index, match.index + match[0].length]);
  }
}

function maskRanges(text, ranges) {
  if (ranges.length === 0) {
    return text;
  }

  const chars = text.split("");

  for (const [start, end] of ranges) {
    for (let index = start; index < end; index++) {
      chars[index] = " ";
    }
  }

  return chars.join("");
}

function getExternalDomain(rawUrl) {
  const url = cleanUrl(rawUrl);

  if (!url) {
    return null;
  }

  try {
    const parsed = new URL(url.startsWith("//") ? `https:${url}` : url);
    const hostname = normalizeHostname(parsed.hostname);

    if (!hostname || isInternalDomain(hostname)) {
      return null;
    }

    return hostname;
  } catch {
    return null;
  }
}

function cleanUrl(rawUrl) {
  let url = rawUrl.trim().replaceAll("&amp;", "&");

  while (/[.,;:!?]+$/.test(url)) {
    url = url.slice(0, -1);
  }

  while (url.endsWith(")") && countCharacter(url, "(") < countCharacter(url, ")")) {
    url = url.slice(0, -1);
  }

  return url;
}

function normalizeHostname(hostname) {
  return hostname.toLowerCase().replace(/^www\./, "");
}

function isInternalDomain(hostname) {
  return INTERNAL_DOMAINS.some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
  );
}

function countCharacter(value, character) {
  return [...value].filter((item) => item === character).length;
}

function percentage(count, total) {
  if (total === 0) {
    return "0.00";
  }

  return ((count / total) * 100).toFixed(2);
}
