---
title: "Claude Code Source Deep Dive"
date: "2026-04-04"
datetime: "2026-04-04 23:53:20"
id: "41723"
slug: "claude-code-source-deep-dive"
url: "https://eay.cc/2026/claude-code-source-deep-dive/"
author: "eay"
format: "link"
categories:
  - 0815
tags:
  - claude
  - kuenstliche-intelligenz
  - technologie
meta:
  - linked_list_url: "https://www.markdown.engineering/learn-claude-code/"
  - geo_latitude: "50.973898"
  - geo_longitude: "6.68292"
  - geo_public: "1"
  - yourls_shorturl: "https://eay.li/40v"
  - _share_on_mastodon_url: "https://eay.social/@eay/116348656204858770"
  - linked_list_og-title: "Claude Code Source Deep Dive — Markdown Engineering"
  - linked_list_og-description: "50-lesson architecture course built from 1,902 leaked Claude Code source files. Boot sequence to unreleased features, with Mermaid diagrams and real code."
  - linked_list_og-image: "https://eay.cc/wordpress/uploads/og-cache/e2ef35698d3de87698aaeeb5bf25e4aa_upload.webp"
  - content_copy: "https://bsky.app/profile/eay.social/post/3mipa5lfe6u2g"
---

Überaus interessante Analyse und Erklärung des Quellcode von Claude Code – [hier eine Kopie auf Github](https://github.com/codeaashu/claude-code) –, der diese Woche via npm [geleaked](https://x.com/Fried_rice/status/2038894956459290963) ist. Die Anwendung besteht demnach aus TypeScript und React, wenig überraschend [Bun](https://github.com/vadimdemedes/ink) als Bundler (das im Dezember [von Anthropic gekauft wurde](https://bun.sh/blog/bun-joins-anthropic)) und einem Haufen CLI-Erweiterungen, damit das alles in einem Terminal läuft. (via [@supergarv](https://phpc.social/@supergarv/116337014324570514))
