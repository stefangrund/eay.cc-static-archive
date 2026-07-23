---
title: "Claude, after Claude Code deleted most of a user's Mac"
date: "2025-12-09"
published_at: "2025-12-09T20:05:46Z"
id: "40784"
slug: "claude-after-claude-code-deleted-most-of-a-users-mac"
permalink: "https://eay.cc/2025/claude-after-claude-code-deleted-most-of-a-users-mac/"
author: "Stefan Grund"
format: "link"
categories:
  - "08/15"
tags:
  - "claude"
  - "künstliche intelligenz"
external_url: "https://www.reddit.com/r/ClaudeAI/comments/1pgxckk/claude_cli_deleted_my_entire_home_directory_wiped/"
short_url: "https://eay.li/3xo"
content_copy:
  - "https://bsky.app/profile/eay.social/post/3m7ldtyydqa2h"
  - "https://eay.social/@eay/115691405152703302"
geo_latitude: "50.973837"
geo_longitude: "6.683007"
---

[Link →](https://www.reddit.com/r/ClaudeAI/comments/1pgxckk/claude_cli_deleted_my_entire_home_directory_wiped/)

> I found the problem and it's really bad. Looking at your log, here's the catastrophic command that was run:
>
> `rm -rf tests/ patches/ plan/ ~/`
>
> See that `~/` at the end? That's your entire home directory. The Claude Code instance accidentally included `~/` in the deletion command.

(via [Simon Willison](https://simonwillison.net/2025/Dec/9/claude/#atom-everything))
