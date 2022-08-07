# Static Archive of eay.cc

This is a static archive of [eay.cc](https://eay.cc/), the weblog of [Stefan Grund](https://stefangrund.eu/).

It consists of every blog post published between 2007-02-02 and 2022-08-07. The posts are saved as Markdown files with static site generator compatible front matters. These contain all meta data about each post (e.g. original URL, datetime, tags, geolocation, and so on).

#### Example post:

```yaml
---
title: "Kinostatistik 2019"
date: "2019-12-31"
datetime: "2019-12-31 12:15:07"
id: "36083"
slug: "kinostatistik-2019"
url: "https://eay.cc/2019/kinostatistik-2019/"
author: "eay"
format: "post"
categories:
  - 0815
tags:
  - 2019
  - filme
  - filmindustrie
  - kino
  - kinostatistik
  - konsum
  - kosten
  - quantified-self
  - statistik
meta:
  - geo_latitude: "55.652412490167"
  - geo_longitude: "12.540413807503"
  - geo_public: "1"
  - yourls_shorturl: "http://eay.li/3c6"
  - content_copy: "https://twitter.com/eay/status/1212000692497461254"
  - content_copy: "https://eay.social/@eay/103402603466779713"
---

Wie sich herausstellt, bleiben die Hobbies in dem Jahr, in dem man seinen Job kündigt und fast jede wache Minute in die Gründung der [eigenen Firma](https://hypercode.de/) steckt, schon mal auf der Strecke. Kein Wunder also...
```

The compatility with static site generators was tested with [Eleventy](https://github.com/11ty/eleventy), v0.10.0.

## About Stefan and eay.cc

[Stefan Grund](https://stefangrund.eu/), born in 1985, is an entrepreneur, developer and media scientist from Cologne, Germany. He is the CEO and co-founder of [Hypercode](https://hypercode.de/), a digital product studio, which focuses on creating high-quality web and mobile apps. Stefan, whose online alias is “eay“, started blogging on [eay.cc](https://eay.cc/) in 2003. In his mostly German blog he writes about media, pop culture, technology and their intersection.

## Setup

Dear future self,

I hope you are well! In order to update the static copy of your blog, you'll need to export your blog posts from WordPress and place the XML file it creates as `export.xml` in the root directory over here. After this you can run `npm run build` to generate all the Markdown files.

Best regards,
*Vergangenheitsstefan*

## Acknowledgements

To generate the Markdown files from WordPress' exported XML file, I'm using a custom fork of [Will Boyd](https://codersblock.com/)'s [WordPress export to Markdown](https://github.com/lonekorean/wordpress-export-to-markdown) script (located under `scripts/wordpress-export-to-markdown/`). If you want to do this, too, you should definitely use Will's script, not mine, which is highly customized to my personal blog setup.

## License

All posts are licensed under [Creative Commons](https://creativecommons.org/licenses/by-nc-nd/3.0/) (by-nc-nd).