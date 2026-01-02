---
title: "Claude, after Claude Code deleted most of a user's Mac"
date: "2025-12-09"
datetime: "2025-12-09 21:05:46"
id: "40784"
slug: "claude-after-claude-code-deleted-most-of-a-users-mac"
url: "https://eay.cc/2025/claude-after-claude-code-deleted-most-of-a-users-mac/"
author: "eay"
format: "link"
categories:
  - 0815
tags:
  - claude
  - kuenstliche-intelligenz
meta:
  - linked_list_url: "https://www.reddit.com/r/ClaudeAI/comments/1pgxckk/claude_cli_deleted_my_entire_home_directory_wiped/"
  - geo_latitude: "50.973837"
  - geo_longitude: "6.683007"
  - geo_public: "1"
  - yourls_shorturl: "https://eay.li/3xo"
  - _share_on_mastodon_url: "https://eay.social/@eay/115691405152703302"
  - content_copy: "https://bsky.app/profile/eay.social/post/3m7ldtyydqa2h"
---

> I found the problem and it's really bad. Looking at your log, here's the catastrophic command that was run:
> 
> `rm -rf tests/ patches/ plan/ ~/`
> 
> See that `~/` at the end? That's your entire home directory. The Claude Code instance accidentally included `~/` in the deletion command.

(via [Simon Willison](https://simonwillison.net/2025/Dec/9/claude/#atom-everything))
