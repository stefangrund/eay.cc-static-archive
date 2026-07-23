---
title: "Bookmarklet: Save to Archive.org"
date: "2014-08-27"
published_at: "2014-08-27T18:57:50Z"
id: "26843"
slug: "bookmarklet-save-to-archive-org"
permalink: "https://eay.cc/2014/bookmarklet-save-to-archive-org/"
author: "Stefan Grund"
format: "standard"
categories:
  - "08/15"
  - "English"
tags:
  - "backup"
  - "bookmarklet"
  - "netzkultur"
  - "projekte"
short_url: "https://eay.li/2ig"
---

Here's a handy little bookmarklet I used while writing my bachelor thesis to save quoted web pages. It enables you to add a web page to the [Internet Archive](https://archive.org/)'s Wayback Machine without opening it's [frontpage](https://archive.org/web/), copying and pasting the URL. Just drag the following link to your browser's bookmark bar, hit it and it saves the current web page to Archive.org's index.

**Save to Archive.org**

```javascript
window.open('http://web.archive.org/save/'+location.href)
```

Et voilà : You can archive a lot of web pages with minimal effort.
