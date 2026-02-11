# Project AI Instructions

## Project Context
- Static archive of [eay.cc](https://eay.cc/), Stefan Grund’s weblog.
- Markdown posts live under `posts/YYYY/` with front matter (original URL, datetime, tags, etc.).
- WordPress export flow uses a Git ignored `export.xml` in the repo root and `npm run build` to generate Markdown posts.
- Monthly summaries live in `posts/YYYY/_summary.json`. The summaries are AI-generated. A guide on how to create them is in `docs/monthly-summaries-guide.md`.

## Tech Stack
- Language: Node.js (scripts), Markdown, JSON
- Runtime: Node >= 24 (see package.json)
- Static site compatibility tested with Eleventy v0.10.0

## Code Conventions
- Use ASCII hyphens (`-`) only in summaries and highlights
- Keep JSON pretty-printed with 2-space indentation
- Preserve existing file structure and naming

## Always Do
- Follow `docs/monthly-summaries-guide.md` for summaries
- Keep summaries within the specified character ranges
- Escape quotes in JSON strings
- Use German month names and correct ISO dates

## Ask First
- Changing scripts behavior or output formats
- Adding new dependencies
- Moving or renaming data files

## Never Do
- Commit secrets or API keys
- Modify generated outputs unless asked
- Introduce non-ASCII hyphens in summaries
