---
title: "archive.today is directing a DDOS attack against my blog"
date: "2026-02-23"
datetime: "2026-02-23 15:55:54"
id: "41326"
slug: "archive-today-is-directing-a-ddos-attack-against-my-blog"
url: "https://eay.cc/2026/archive-today-is-directing-a-ddos-attack-against-my-blog/"
author: "eay"
format: "link"
categories:
  - 0815
tags:
  - journalismus
  - netzkultur
  - paywall
  - urheberrecht
  - webservice
meta:
  - linked_list_url: "https://gyrovague.com/2026/02/01/archive-today-is-directing-a-ddos-attack-against-my-blog/"
  - geo_latitude: "50.973921"
  - geo_longitude: "6.682875"
  - geo_public: "1"
  - linked_list_og-title: "archive.today is directing a DDOS attack against my blog"
  - linked_list_og-description: "Around January 11, 2026, archive.today (aka archive.is, archive.md, etc) started using its users as proxies to conduct a distributed denial of service (DDOS) attack against Gyrovague, my personal b…"
  - linked_list_og-image: "https://eay.cc/wordpress/uploads/og-cache/0354422af629d2bb632afed73d82c6dc.webp"
  - yourls_shorturl: "https://eay.li/3zm"
  - _share_on_mastodon_url: "https://eay.social/@eay/116120551481116819"
  - content_copy: "https://bsky.app/profile/eay.social/post/3mfjwfjht5226"
---

Ich habe gerade [bei Thomas vom Fall archive.today gelesen](https://gigold.me/blog/fall-archive-today), dem offen­sicht­lich in einer Grauzone operierenden Archivierugs­dienst, den ich auch schon mal nutze und [hier erwähnt habe](https://eay.cc/?s=Archive.ph), um Paywalls zu umgehen.

Dieser wurde nun nämlich von Wikipedia verbannt, die auf immerhin 400.000 Seiten auf archive.today-Kopien verweist. Diese müssen nun manuell ausge­tauscht werden, [wie heise berichtet](https://www.heise.de/news/Hunderttausende-Links-Wikipedia-verbannt-Archive-today-nach-Cyberangriff-11185323.html):

> Die Dimension des Vorhabens ist gewaltig. […] Sie sollen nun sukzessive entfernt oder durch sicherere Alternativen wie Internet Archive (archive.org) oder Ghostarchive ersetzt werden. An die Editoren ging der Appell, Links manuell zu prüfen und – sofern die Originalquelle noch online ist – den Archivlink komplett zu löschen oder auf seriöse Anbieter umzustellen.

Die Ursache dafür – und jetzt wird es gleichermaßen interessant wie bizarr – ist [dieser zweieinhalb Jahre alte Blogeintrag](https://gyrovague.com/2023/08/05/archive-today-on-the-trail-of-the-mysterious-guerrilla-archivist-of-the-internet/) von [Jani Patokallio](https://www.patokallio.name/), in dem er die Hinter­gründe, Betreiber und Finanzierung von archive.today beleuchtet und dabei mit der Namens­nennung wohl auch voll ins Schwarze trifft. Ohne wirklich jemanden zu doxxen, listet Jani hier nämlich, die verschiedenen Aliasse von vermutlich einer Person auf, die wohl aus Russland kommt:

> While we may not have a face and a name, at this point we have a pretty good idea of how the site is run: it's a one-person labor of love, operated by a Russian of considerable talent and access to Europe.

Fraglich ist jedoch die Finanzierung, die zwischen den 10 TB und 300 Euro pro Monat in 2012 schon 2021 bei rund 1.000 TB und deutlich höheren Kosten liegen dürfte. Wie die Person das neben den nur einen Bruchteil abdeckenden Spenden stemmt: unklar.

Was jedoch klar ist: Die Service operiert bestenfalls in einer restlichen Grau­zone. Und was Personen, die urheber­rechtlich geschütztes Wissen kostenlos zugänglich machen möchten, für Repressalien fürchten müssen, wissen wir nicht erst seit [Aaron Swartz](https://en.wikipedia.org/wiki/Aaron_Swartz) oder [Alexandra Elbakyan](https://en.wikipedia.org/wiki/Alexandra_Elbakyan). Dass der/die Betreiber/in von archive.today also anonym bleiben möchte: ganz klar.

Wenn da eben nicht dieser besagte, zweieinhalb Jahre alte Blogeintrag wäre, der – das vermutet Joni in seinem oben verlinkten [neuen Blogeintrag](https://gyrovague.com/2026/02/01/archive-today-is-directing-a-ddos-attack-against-my-blog/) – nun der Grund für den Angriff auf sein Blog ist: Wie nämlich u.a. [Heise berichtete](https://www.heise.de/en/news/Archive-today-FBI-Demands-Data-from-Provider-Tucows-11066346.html), interessiert sich mittlerweile auch das FBI für die Person hinter archive.today. Heise und [ArsTechnica](https://arstechnica.com/tech-policy/2025/11/fbi-subpoena-tries-to-unmask-mysterious-founder-of-archive-today/) verlinkten in ihrer Berichterstattung dann auch gleich wieder auf Jonis Blogeintrag von 2023.

Das wiederum hat den/die anonyme/n Betreiber/in scheinbar dazu veranlasst, Kontakt zu Jani Patokallio aufzunehmen, mit der Bitte, den Blogpost temporär offline zu nehmen, und als dieser dem nicht folgte, eine Selfmade-DDOS-Attacke auf [dessen Blog "Gyrovague"](https://gyrovague.com/) zu starten. Und zwar wurde, während Nutzer das Captcha von archive.today ausfüllten, kontinuierlich ein JavaScript gefeuert, das die Suche des Blogs mit zufallsgenerierten und somit nicht cachebaren Suchanfragen aufruft und so zu Fall bringen sollte.

Verrückt. Dabei umschreibt Jani die technische Umsetzung und Idee von archive.today durchaus positiv und endet 2023 damit, dass er ihr oder ihm via buymeacoffee.com einen wohlverdienten Kaffee spendieren werde.
