---
title: "JSON Feed: Version 1"
date: "2017-05-23"
datetime: "2017-05-23 23:30:22"
id: "32991"
slug: "json-feed-version-1"
url: "https://eay.cc/2017/json-feed-version-1/"
author: "eay"
format: "link"
categories:
  - 0815
tags:
  - blogging
  - changelog
  - json-feed
  - web-development
meta:
  - linked_list_url: "https://jsonfeed.org/version/1"
  - yourls_shorturl: "http://eay.li/2yy"
---

[Brent Simmons](http://inessential.com/) und [Manton Reece](http://manton.org/) haben einen neuen Feed-Standard spezifiziert, der die Arbeit mit diversen News-, Blog- und Whatever-Feeds erleichtern soll, indem auf JSON anstelle von XML gesetzt wird, das bei RSS und Atom zum Einsatz kommt.

Ich begrüße das sehr. Die Arbeit mit JSON ist mein täglich Brot, macht Spaß und ist einfach. Die definierten Standards machen Sinn, dennoch sind die Feeds aber wunderbar flexibel – unbekannte Keys werden einfach ignoriert. Selbstredend habe ich eay.cc soeben auch [mit einem eigenen JSON Feed ausgestattet](https://eay.cc/feed/json/), dessen Items ich direkt mit `_type` um den jeweiligen Post-Typ erweitert habe. Linkposts können – `external_url` sei Dank! – endlich sauber (und seitenübergreifend gleich) ausgegeben werden. Für die anderen Post-Typen passe ich die Ausgabe später noch weiter an.

Zusammen mit der generellen Feed-Funktionalität von WordPress ([vgl. hier](https://eay.cc/type/link/feed/json)) ein guter, weiterer Schritt zur einfacheren Weiter­verwurstelung von Bloginhalten.

**Update, 26.05.:** Ich habe den JSON Feed heute noch um Tags und Short-URLs erweitert. Außerdem bekommen die Status-Posts nun neben dem HTML einen zusätzlichen "Text only"-String, der das syndizieren zu diversen Microblogging-Diensten vereinfachen sollte. Das gehe ich als nächstes an.
