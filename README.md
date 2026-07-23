# Static Archive of eay.cc

This is a static archive of [eay.cc](https://eay.cc/), the weblog of [Stefan Grund](https://stefangrund.eu/).

It consists of every blog post published between 2007-02-02 and 2026-07-02. The posts are saved as Markdown files with static site generator compatible front matters. These contain all meta data about each post (e.g. original URL, datetime, tags, geolocation, and so on).

#### Example post:

```yaml
---
title: "Kinostatistik 2019"
date: "2019-12-31"
published_at: "2019-12-31T10:15:07Z"
id: "36083"
slug: "kinostatistik-2019"
permalink: "https://eay.cc/2019/kinostatistik-2019/"
author: "Stefan Grund"
format: "standard"
categories:
  - "08/15"
tags:
  - "2019"
  - "filme"
  - "filmindustrie"
  - "kino"
  - "kinostatistik"
  - "konsum"
  - "kosten"
  - "quantified self"
  - "statistik"
short_url: "https://eay.li/3c6"
content_copy:
  - "https://twitter.com/eay/status/1212000692497461254"
  - "https://eay.social/@eay/103402603466779713"
geo_latitude: "55.652412490167"
geo_longitude: "12.540413807503"
---
Wie sich herausstellt, bleiben die Hobbies in dem Jahr, in dem man seinen Job kündigt und fast jede wache Minute in die Gründung der [eigenen Firma](https://hypercode.de/) steckt, schon mal auf der Strecke. Kein Wunder also...
```

The compatility with static site generators was tested with [Eleventy](https://github.com/11ty/eleventy), v0.10.0.

## About Stefan and eay.cc

[Stefan Grund](https://stefangrund.eu/), born in 1985, is an entrepreneur, developer and media scientist from Cologne, Germany. He is the CEO and co-founder of [Hypercode](https://hypercode.de/), a digital product studio, which focuses on creating high-quality web and mobile apps. Stefan, whose online alias is “eay“, started blogging on [eay.cc](https://eay.cc/) in 2003. In his mostly German blog he writes about media, pop culture, technology and their intersection.

## Setup

Dear future self,

I hope you are well! In order to update the static copy of your blog, you'll need to export your blog posts from WordPress and place the XML file it creates as `export.xml` in the root directory over here. After this you can run this to generate all the Markdown files:

```
npm run build
```

Run the fixture tests and validate the complete generated archive with:

```
npm test
npm run validate:posts
```

Best regards,
_Vergangenheitsstefan_

## Statistics

I've added a shell script to analyze the files and print out the numbers of posts, words and characters for each year:

```
npm run stats
```

## Summaries

There are AI-generated monthly summaries per year in `posts/YYYY/_summary.json`. They’re intended for archive pages and similar overviews. The process and rules to generate them live in this guide: `docs/guides/monthly-summaries-guide.md`.

To generate one combined summary file (→ `summaries/all.json`) and/or to export them for further usage (→ creates `summaries/YYYY.json` files), run:

```
npm run summaries
```

## Acknowledgements

To generate the Markdown files from WordPress' exported XML file, I'm using a custom fork of [Will Boyd](https://codersblock.com/)'s [WordPress export to Markdown](https://github.com/lonekorean/wordpress-export-to-markdown) script (located under `scripts/wordpress-export-to-markdown/`). If you want to do this, too, you should definitely use Will's script, not mine, which is highly customized to my personal blog setup.

## License

All posts are licensed under [Creative Commons](https://creativecommons.org/licenses/by-nc-nd/4.0/) (by-nc-nd).
