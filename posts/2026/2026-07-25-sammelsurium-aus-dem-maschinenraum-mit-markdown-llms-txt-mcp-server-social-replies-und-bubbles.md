---
title: "Sammelsurium aus dem Maschinenraum mit Markdown, llms.txt, MCP-Server, Social Replies und Bubbles"
date: "2026-07-25"
published_at: "2026-07-25T07:00:23Z"
id: "42470"
slug: "sammelsurium-aus-dem-maschinenraum-mit-markdown-llms-txt-mcp-server-social-replies-und-bubbles"
permalink: "https://eay.cc/2026/sammelsurium-aus-dem-maschinenraum-mit-markdown-llms-txt-mcp-server-social-replies-und-bubbles/"
author: "Stefan Grund"
format: "standard"
categories:
  - "08/15"
tags:
  - "blogging"
  - "changelog"
  - "eayz"
  - "in eigener sache"
  - "künstliche intelligenz"
  - "mcp"
  - "social web"
  - "urlaub"
short_url: "https://eay.li/44h"
content_copy:
  - "https://bsky.app/profile/eay.social/post/3mrhcdl4fqm2h"
  - "https://bubbles.town/entry/44754738"
  - "https://eay.social/@eay/116979324090607683"
geo_latitude: "53.930726"
geo_longitude: "11.381173"
---

Ich habe es [auf Mastodon](https://eay.social/@eay/116966015403614231) und [Bluesky](https://bsky.app/profile/did:plc:fqhyfvx3qc6dcfsz4xslmlua/post/3mrbf3nzego2g) [^1] die Tage schon mal erwähnt: Wir sind aktuell im Urlaub. Den Tag verbringe ich mit der Familie am Strand, auf Spielplätzen und mit der Duplo-Eisenbahn. Abends, nachdem der Zwerg ins Bett gebracht ist (und ich wieder aufgewacht bin 😅), habe ich beim YouTube-Schauen noch das ein oder andere Feature gecoded. In [Yonks](https://yonks.app/) und für diese Website. Zu Yonks später mehr, zu den hiesigen Changes im Folgenden mehr.

### Markdown-Format

[Natürlich bei Felix](https://wirres.net/articles/aus-dem-maschinenraum-06-06-2026) las ich vor ein paar Wochen, dass er seine Artikel nun auch im Markdown-Format samt Kopieren-Funktion bereitstellt, was sicherlich die ein oder andere LLM ebenso wie menschliche User erfreuen dürfte. Und weil ich hier sowieso schon jeden Blogpost im JSON- bzw. genauer gesagt [JSON Feed](https://www.jsonfeed.org/)-Format bereitstelle, dachte ich, das mach ich auch.

![](https://eay.cc/uploads/2026/markdown-format-in-postmeta.png "Screenshot der Post-Metadaten mit dem neuen Markdown-Format samt Kopieren-Funktion.")

Post-Metadaten mit dem neuen Markdown-Format samt Kopieren-Funktion.

An jeden Blogpost kann nun ein `/markdown` angehängt werden, um die Markdown-Version aufzurufen. Der Klick auf "Kopieren" im Post-Footer fetcht und kopiert genau diese Version direkt in die Zwischenablage.

Der [Jurassic-Park-Computer-Beitrag](https://eay.cc/2026/jurassic-park-computers-in-excruciating-detail/) sieht [im Markdown-Format z.B. so aus](https://eay.cc/2026/jurassic-park-computers-in-excruciating-detail/markdown/).

### Static Archive

Das [im ewigen Eis](https://eay.cc/2020/status-2020-07-19-2152/) gespeicherte [Static Archive dieses Blogs](https://eay.cc/2020/1017-jahre-eay-cc/) unterschied sich damit in seinen Markdown-Dateien etwas von der dynamischen `/markdown`-Route, weshalb ich das angeglichen habe. Tatsächlich habe ich die Gelegenheit genutzt, die Archiv- und Markdown-Generierung gleich an mehreren Stellen zu modernisieren und zu optimieren, wie [dieser Pull Request](https://github.com/stefangrund/eay.cc-static-archive/pull/16) offenbart. [^2]

### llms.txt

Für besagten LLM-Support bin ich nun auch der [llms.txt](https://llmstxt.org/)-Konvention gefolgt und habe eine solche [hier hinzugefügt](https://eay.cc/llms.txt). Mögen unsere neuen Maschinen-Overlords mir gnädig sein!

### MCP-Server

Wer Markdown und LLMs sagt, muss auch [MCP](https://modelcontextprotocol.io/docs/getting-started/intro) sagen, so will es das Gesetz. Daher habe ich KI-unterstützt ein WordPress-Plugin erstellt und getestet, das mir die Inhalte dieses Blogs als MCP-Server lesend zur Verfügung stellt. Konkret gibt es nun `search_posts`, `get_post`, `list_recent_posts`, `list_categories` und `list_tags` mit denen Agenten die hiesigen Inhalte durchsuchen und abrufen können. Die Antwort orientiert sich dabei wiederum an der oben beschriebenen Markdown-Ausgabe. Synergie!

![Screenshot aus der Quick-AI-View von Raycast, die den eay.cc MCP-Server aufruft.](https://eay.cc/uploads/2026/blog-mcp.png)

Quick-AI-View von Raycast, die den eay.cc MCP-Server aufruft.

Der MCP-Server lässt sich nun wunderbar in Claude, Codex ChatGPT, Raycast (siehe Screenshot) oder etwa [Open Minis](https://eay.cc/2026/open-minis-is-the-ios-agent-i-wish-siri-ai-could-be/) hinterlegen. In Open Minis habe ich dann auch GPT-5.5 gebeten, mir eine Zusammen­fassung des letzten Monats zu schreiben und die erwähnten Themen mit Links zu den Blogposts zu versehen. Das Ganze ist wenige Minuten gelaufen und hat [folgenden, wie ich finde, guten Output produziert](https://eay.paste.lol/mcp-powered_eay.cc_zusmmenfassung.md/markup). [^3]

Bisher habe ich Auswertungen und Analysen meiner Bloginhalte immer über das oben beschriebene, statische Archiv gefahren (das zuvor natürlich immer aktualisiert werden musste), nun sollte das auch dynamisch und up-to-date gehen. Der MCP-Server ist aktuell tokengeschützt nur für mich zugänglich, aber wenn jemand Bedarf hat, möge sie/er sich melden und dann würde ich das ggf. auch öffentlich machen – ist ja eh alles online.

### Social Reply

In "[Spaß mit Kommentaren](https://eay.cc/2026/spass-mit-kommentaren/)" hatte ich bereits einige Optimierungen an den Kommentaren vorgenommen, die, würde ich jetzt mal sagen, vor allem für mich selbst nützlich sind. Dies geht in die gleiche Richtung: Wird ein über eine Webmention (per [brid.gy](https://brid.gy/)) eingegangener Kommentar von Mastodon und Bluesky durch mich hier beantwortet, wird diese Antwort über meinen Mastodon-/Bluesky-Account auch gleich als Reply zur jeweiligen Plattform gesendet – und hier mit einem entsprechenden Icon+Link ausgestattet.

![Screenshot eines per Social-Reply-Plugins veröffentlichten Antwort mit Mastodon-Link/Crosspost.](https://eay.cc/uploads/2026/social-reply-antwort-blog.png)

[Reply auf einen Mastodon-Webmention-Kommentar](https://eay.cc/2026/apocalypse-early-warning-system/#comment-46809) mit Mastodon-Link/Crosspost.

![Screenshot eines per Social-Reply-Plugins veröffentlichten Antwort auf Mastodon.](https://eay.cc/uploads/2026/social-reply-antwort-mastodon.png)

Die gleiche Reply [nun auf Mastodon](https://eay.social/@eay/116735830283020749).

Hänge ich auf oberster Ebene einen Kommentar (≠ Kommentar-Reply) an einen Blogpost dran, um z.B. wie unten beim [Jurassic-Park-Computer-Beitrag](https://eay.cc/2026/jurassic-park-computers-in-excruciating-detail/) zu sehen, noch eine nicht direkt inhalt­liche Ergänzung hinzu­zufügen, wird das ebenfalls an meinen ent­sprechenden Mastodon- und/oder Bluesky-Post als Reply gehangen.

![Screenshot eines per Social-Reply-Plugins zu Mastodon und Bluesky gecrossposteten Kommentars.](https://eay.cc/uploads/2026/social-reply-comment.png)

Per Social-Reply-Funktion zu Mastodon und Bluesky [gecrossposteter Kommentar](https://eay.cc/2026/jurassic-park-computers-in-excruciating-detail/#comment-47161).

Über eine nur für mich sichtbare Checkbox habe ich allerdings die Möglichkeit, das zu verhindern:

![Screenshot der nur für den Autoren sichtbaren Social-Reply-Checkbox im Kommentarformular.](https://eay.cc/uploads/2026/social-reply-form.png)

Nur für mich sichtbare Social-Reply-Checkbox im Kommentarformular.

### Bubbles

[Vor einem Monat](https://eay.cc/2026/bubbles/) habe ich die neue, tolle Blog-Discovery-Plattform [Bubbles](https://bubbles.town/de/) an dieser Stelle empfohlen. Diese Empfehlung gilt weiterhin, meine RSS-Abos der [deutschsprachigen](https://bubbles.town/de/editions) und [englischsprachigen](https://bubbles.town/editions) Briefings möchte ich nicht mehr missen.

Die Einträge zu diesem Blog bei Bubbles werden jetzt jedenfalls auch in der Syndication-Liste als `bubbles.town` angezeigt und so gleichwertig mit den anderen Social-Plattformen behandelt:

![Screenshot der Post-Metadaten mit Bubbles-Link bei den Syndication-Links.](https://eay.cc/uploads/2026/bubbles-syndication.png)

Post-Metadaten mit Bubbles-Link bei den Syndication-Links.

Und da Bubbles sehr schön ins Fediverse integriert ist, prüfe ich auch auf Kommentare, die bei Bubbles zu hiesigen Blogposts hinterlassen werden, und synce diese dann auch hierher (siehe [Felix' Kommentar hier](https://eay.cc/2026/warum-w-social-mehr-kalter-kaffee-als-heisser-scheiss-ist/) bzw. [bei Bubbles](https://bubbles.town/entry/36880037)) – was aber ehrlicherweise noch nicht so häufig passiert ist. Aber das kann ja noch werden mit weiterer Bubbles-Verbreitung!

### Backlinks

Last but not least: [Die Backlinks-Übersichtsseite](https://eay.cc/backlinks/), siehe [Einführung der Backlinks hier](https://eay.cc/2026/neues-aus-dem-maschinenraum/) und [Nachtrag dazu](https://eay.cc/2026/backlinks-inhaltsverzeichnis/) mit Ergänzung besagter Seite, wird nun besser und regelmäßiger erzeugt und gecached, so dass sie beim "ersten" Aufruf so schnell wie der Rest hier laden sollte.

–

Und was macht ihr so im Urlaub? [^4]

[^1]: Gecrossposted mit [Indigo](https://anilineapps.com/indigo.html), dem im Mai veröffentlichten Client für Mastodon und Bluesky von Soapbox Software [Aniline Applications](https://anilineapps.com/), den Machern von [Croissant](https://anilineapps.com/croissant.html), für die Apple-Plattformen. Habe ich seitdem sehr in mein Social-Herz geschlossen und jahresweise abonniert. Auch ohne das Lesen & Bespielen beider Plattformen ist das eine sehr gute und sehr schöne Social-App.
[^2]: Kinder, niemals so große Commits machen, es sei denn, ihr wisst, was ihr tut.
[^3]: Keine Sorge, hier wird es – [bis auf die KI-Monats­zusammen­fassungen](https://eay.cc/2026/das-eigene-blogarchiv-lesen-oder-ki-zusammenfassungen-im-blogarchiv/) – weiterhin keine KI-generierten Texte geben, aber ich fand das als Test ganz brauchbar.
[^4]: Zumindest von Thomas wissen wir, [dass er es ähnlich gemacht hat](https://gigold.me/blog/blog-dinge-und-taten).
